import { comprehensiveRegulationsData, REGULATIONS_PDF_URL, gradingSystem } from './regulations-data';

export { REGULATIONS_PDF_URL, gradingSystem };

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export const getSystemPrompt = (language: 'ar' | 'en') => {
    const prompts = {
        en: `You are the FCI Menofia University regulations assistant.
IMPORTANT: Only answer FCI-related questions. Refuse off-topic questions politely.
Resources: [Official Regulations](${REGULATIONS_PDF_URL})
Topics: Departments (CS, IS, IT, AI, BI), credit hours, grading, GPA, attendance, warnings, exams, graduation, transfers.
Style: Professional, cite article numbers, use markdown, respond in user's language.`,

        ar: `أنت مساعد لوائح كلية الحاسبات والمعلومات - جامعة المنوفية.
مهم: أجب فقط على أسئلة الكلية. ارفض الأسئلة الخارجية بأدب.
الموارد: [اللائحة الرسمية](${REGULATIONS_PDF_URL})
المجالات: الأقسام، الساعات المعتمدة، التقديرات، المعدل، الحضور، الإنذارات، الامتحانات، التخرج.
الأسلوب: مهني، اذكر رقم المادة، استخدم markdown، رد بلغة المستخدم.`
    };
    return prompts[language];
};

export function calculateGPA(courses: { grade: string; creditHours: number }[]): number {
    if (!courses.length) return 0;
    
    let totalPoints = 0;
    let totalHours = 0;
    
    for (const { grade, creditHours } of courses) {
        const info = gradingSystem[grade as keyof typeof gradingSystem];
        if (info) {
            totalPoints += info.points * creditHours;
            totalHours += creditHours;
        }
    }
    
    return totalHours ? Math.round((totalPoints / totalHours) * 100) / 100 : 0;
}

export function percentageToGrade(pct: number): string {
    if (pct >= 97) return 'A+';
    if (pct >= 93) return 'A';
    if (pct >= 90) return 'A-';
    if (pct >= 85) return 'B+';
    if (pct >= 80) return 'B';
    if (pct >= 75) return 'B-';
    if (pct >= 70) return 'C+';
    if (pct >= 65) return 'C';
    if (pct >= 60) return 'C-';
    if (pct >= 55) return 'D+';
    if (pct >= 50) return 'D';
    return 'F';
}

export const regulationsData = comprehensiveRegulationsData;

export function findRelevantRegulations(query: string, language: 'ar' | 'en'): string {
    const regulations = regulationsData[language];
    const q = query.toLowerCase();

    const keywords: { [key: string]: string[] } = {
        gpa: ['gpa', 'معدل', 'تراكمي', 'grade', 'تقدير', 'نقاط', 'حساب'],
        graduation: ['تخرج', 'graduation', 'شروط', 'requirements', 'بكالوريوس'],
        registration: ['تسجيل', 'registration', 'مقررات', 'ساعات', 'hours', 'credit'],
        attendance: ['حضور', 'غياب', 'attendance', 'absence', 'محروم'],
        warning: ['إنذار', 'warning', 'فصل', 'dismissal'],
        exam: ['امتحان', 'exam', 'اختبار', 'درجات', 'تظلم'],
        departments: ['قسم', 'department', 'تخصص', 'cs', 'is', 'it', 'ai'],
        transfer: ['تحويل', 'transfer', 'معادلة'],
        project: ['مشروع', 'project'],
        retake: ['إعادة', 'retake', 'تحسين', 'راسب'],
    };

    const matchingTopics = Object.entries(keywords)
        .filter(([, kws]) => kws.some(kw => q.includes(kw)))
        .map(([topic]) => topic);

    const relevant = regulations.filter(reg => {
        const section = reg.section.toLowerCase();
        const content = reg.content.toLowerCase();
        const words = q.split(/\s+/).filter(w => w.length > 2);

        return words.some(w => section.includes(w) || content.includes(w)) ||
            matchingTopics.some(topic => 
                keywords[topic].some(kw => section.includes(kw) || content.includes(kw))
            );
    });

    if (!relevant.length) return regulations[0].content;

    return relevant.slice(0, 3)
        .map(r => `**${r.section}:**\n${r.content}`)
        .join('\n\n---\n\n');
}
