import { NextRequest, NextResponse } from 'next/server';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { getSystemPrompt, findRelevantRegulations } from '@/lib/ai-config';

const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.7, 'B': 3.3, 'B-': 3.0,
    'C+': 2.7, 'C': 2.3, 'C-': 2.0,
    'D+': 1.7, 'D': 1.3, 'F': 0.0,
    'أ+': 4.0, 'أ': 4.0, 'أ-': 3.7,
    'ب+': 3.7, 'ب': 3.3, 'ب-': 3.0,
    'ج+': 2.7, 'ج': 2.3, 'ج-': 2.0,
    'د+': 1.7, 'د': 1.3, 'ر': 0.0,
};

const gradeMap: { [key: string]: { english: string; points: number } } = {
    'أ+': { english: 'A+', points: 4.0 }, 'أ': { english: 'A', points: 4.0 }, 'أ-': { english: 'A-', points: 3.7 },
    'ب+': { english: 'B+', points: 3.7 }, 'ب': { english: 'B', points: 3.3 }, 'ب-': { english: 'B-', points: 3.0 },
    'ج+': { english: 'C+', points: 2.7 }, 'ج': { english: 'C', points: 2.3 }, 'ج-': { english: 'C-', points: 2.0 },
    'د+': { english: 'D+', points: 1.7 }, 'د': { english: 'D', points: 1.3 }, 'ر': { english: 'F', points: 0.0 },
    'a+': { english: 'A+', points: 4.0 }, 'a': { english: 'A', points: 4.0 }, 'a-': { english: 'A-', points: 3.7 },
    'b+': { english: 'B+', points: 3.7 }, 'b': { english: 'B', points: 3.3 }, 'b-': { english: 'B-', points: 3.0 },
    'c+': { english: 'C+', points: 2.7 }, 'c': { english: 'C', points: 2.3 }, 'c-': { english: 'C-', points: 2.0 },
    'd+': { english: 'D+', points: 1.7 }, 'd': { english: 'D', points: 1.3 }, 'f': { english: 'F', points: 0.0 },
};

function parseGPA(userMessage: string) {
    const message = userMessage.toLowerCase();
    const gpaKeywords = ['gpa', 'معدل', 'تراكمي', 'احسب', 'حساب', 'calc', 'calculate'];

    if (!gpaKeywords.some(kw => message.includes(kw))) {
        return null;
    }

    const tokens = userMessage.split(/[\s,،:]+/).filter(t => t.trim());
    const grades: { grade: string; points: number }[] = [];

    for (const token of tokens) {
        const info = gradeMap[token] || gradeMap[token.toLowerCase()];
        if (info) grades.push({ grade: info.english, points: info.points });
    }

    if (grades.length === 0) return null;

    const hoursMatch = userMessage.match(/(\d+)\s*(ساعات|ساعة|hours?|credit|hrs?)/i);
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 3;

    let totalPoints = 0;
    let totalHours = 0;

    grades.forEach(({ points }) => {
        totalPoints += points * hours;
        totalHours += hours;
    });

    const gpa = Math.round((totalPoints / totalHours) * 100) / 100;

    return { gpa, grades, hours, totalHours };
}

function formatGPAResponse(data: { gpa: number; grades: { grade: string; points: number }[]; hours: number; totalHours: number }) {
    const { gpa, grades, hours, totalHours } = data;

    const gradeCounts: { [key: string]: number } = {};
    grades.forEach(g => gradeCounts[g.grade] = (gradeCounts[g.grade] || 0) + 1);

    const breakdown = Object.entries(gradeCounts)
        .sort((a, b) => {
            const order = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];
            return order.indexOf(a[0]) - order.indexOf(b[0]);
        })
        .map(([grade, count]) => `• ${grade}: ${count} مقرر (${gradePoints[grade]} نقطة)`)
        .join('\n');

    let classification = '';
    if (gpa >= 3.5) classification = 'ممتاز 🌟';
    else if (gpa >= 3.0) classification = 'جيد جداً 👏';
    else if (gpa >= 2.5) classification = 'جيد 👍';
    else if (gpa >= 2.0) classification = 'مقبول ✓';
    else if (gpa >= 1.5) classification = 'ضعيف ⚠️';
    else classification = 'ضعيف جداً ⚠️';

    return `## 📊 نتيجة حساب المعدل التراكمي

### المعدل التراكمي: **${gpa.toFixed(2)}** - ${classification}

---

### 📋 تفاصيل التقديرات:
${breakdown}

---

### 📈 ملخص:
- **عدد المقررات:** ${grades.length} مقرر
- **إجمالي الساعات:** ${totalHours} ساعة
- **المعدل التراكمي:** ${gpa.toFixed(2)} من 4.0

---

### 📌 تقديرات التخرج (مادة 24):
- ممتاز: 3.5 فأكثر
- جيد جداً: 3.0 - 3.5
- جيد: 2.5 - 3.0
- مقبول: 2.0 - 2.5
- ضعيف: 1.5 - 2.0
- ضعيف جداً: أقل من 1.5`;
}

export async function POST(req: NextRequest) {
    try {
        const { messages, language } = await req.json();

        if (!messages?.length) {
            return NextResponse.json({ error: 'لا توجد رسائل' }, { status: 400 });
        }

        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.role !== 'user') {
            return NextResponse.json({ error: 'رسالة غير صالحة' }, { status: 400 });
        }

        const gpaData = parseGPA(lastMessage.content);
        if (gpaData) {
            return NextResponse.json({ response: formatGPAResponse(gpaData) });
        }

        const context = findRelevantRegulations(lastMessage.content, language);

        const apiKey = process.env.GOOGLE_API_KEY;

        // Debug: Check if API key exists
        const hasApiKey = !!apiKey;
        const apiKeyPreview = apiKey ? `${apiKey.substring(0, 8)}...` : 'NOT SET';

        if (apiKey) {
            try {
                const google = createGoogleGenerativeAI({ apiKey });
                const model = google('gemini-2.0-flash-exp');

                const systemPrompt = getSystemPrompt(language);
                const userPrompt = `
Context from FCI Regulations:
${context}

---

User Question: ${lastMessage.content}

Instructions:
- Answer based on the context above
- Be conversational and helpful
- Use markdown formatting
- If the user greets you, greet them back warmly
- If asked about GPA calculation, explain how it works
- If the question is not related to FCI regulations, politely decline and redirect
- Respond in ${language === 'ar' ? 'Arabic' : 'English'}
`;

                const result = await generateText({
                    model,
                    system: systemPrompt,
                    prompt: userPrompt,
                });

                if (result.text) {
                    return NextResponse.json({ response: result.text });
                }
            } catch (aiError: unknown) {
                const errorMessage = aiError instanceof Error ? aiError.message : 'Unknown error';
                console.error('AI Error:', errorMessage);
                // Return error info for debugging
                return NextResponse.json({
                    response: `⚠️ AI Error (API Key: ${apiKeyPreview}): ${errorMessage}\n\n---\n\nFallback response:\n${generateStaticResponse(lastMessage.content, context, language)}`
                });
            }
        }

        // No API key - return static response with debug info
        const response = generateStaticResponse(lastMessage.content, context, language);
        return NextResponse.json({
            response: hasApiKey ? response : `🔑 No API Key detected.\n\n${response}`
        });

    } catch (error) {
        console.error('Chat error:', error);
        return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
    }
}

function generateStaticResponse(userMessage: string, context: string, language: 'ar' | 'en'): string {
    const greetings = ['hello', 'hi', 'مرحبا', 'هلا', 'سلام', 'السلام', 'اهلا', 'hey'];
    const isGreeting = greetings.some(g => userMessage.toLowerCase().includes(g));

    if (isGreeting) {
        return language === 'ar'
            ? `أهلاً بك! 👋

أنا مساعد لوائح كلية الحاسبات والمعلومات بجامعة المنوفية.

يمكنك سؤالي عن:
- نظام التقديرات والمعدل التراكمي
- الساعات المعتمدة وقواعد التسجيل
- شروط التخرج والإنذارات
- أي شيء متعلق باللائحة

كيف يمكنني مساعدتك؟`
            : `Hello! 👋

I'm the FCI Regulations Assistant. I can help with:
- Grading system & GPA
- Credit hours & registration
- Graduation requirements
- Academic policies

How can I help you?`;
    }

    if (context) {
        return language === 'ar'
            ? `${context}

---
💡 للمزيد من التفاصيل، يمكنك تحميل [اللائحة الرسمية](http://mu.menofia.edu.eg/fci).`
            : `${context}

---
💡 For more details, check the [official regulations](http://mu.menofia.edu.eg/fci).`;
    }

    return language === 'ar'
        ? `عذراً، لم أجد معلومات محددة عن سؤالك. 

يمكنك سؤالي عن:
- التقديرات وحساب المعدل
- التسجيل والساعات المعتمدة
- شروط التخرج
- الإنذارات الأكاديمية

أو تحميل [اللائحة الرسمية](http://mu.menofia.edu.eg/fci) للاطلاع على التفاصيل.`
        : `Sorry, I couldn't find specific information about your question.

You can ask me about:
- Grades & GPA calculation
- Registration & credit hours
- Graduation requirements
- Academic warnings

Or download the [official regulations](http://mu.menofia.edu.eg/fci).`;
}
