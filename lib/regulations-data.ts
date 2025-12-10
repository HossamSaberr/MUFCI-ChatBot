// Complete FCI Regulations Data
// Based on the official bylaws document

export const REGULATIONS_PDF_URL = 'http://mu.menofia.edu.eg/PrtlFiles/Faculties/fci/Portal/Files/%D9%84%D8%A7%D8%A6%D8%AD%D8%A9%20%D8%AD%D8%A7%D8%B3%D8%A8%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%20%D8%A7%D9%84%D9%86%D8%B3%D8%AE%D8%A9%20%D8%A7%D9%84%D9%85%D8%B9%D8%AF%D9%84%D8%A9-1.pdf';

// Grading System according to FCI Regulations (مادة 23)
export const gradingSystem = {
    'A+': { points: 4.0, minPercentage: 97, maxPercentage: 100, descriptionAr: 'ممتاز مرتفع', descriptionEn: 'Excellent High' },
    'A': { points: 4.0, minPercentage: 93, maxPercentage: 97, descriptionAr: 'ممتاز', descriptionEn: 'Excellent' },
    'A-': { points: 3.7, minPercentage: 90, maxPercentage: 93, descriptionAr: 'ممتاز منخفض', descriptionEn: 'Excellent Low' },
    'B+': { points: 3.3, minPercentage: 85, maxPercentage: 90, descriptionAr: 'جيد جداً مرتفع', descriptionEn: 'Very Good High' },
    'B': { points: 3.0, minPercentage: 80, maxPercentage: 85, descriptionAr: 'جيد جداً', descriptionEn: 'Very Good' },
    'B-': { points: 2.7, minPercentage: 75, maxPercentage: 80, descriptionAr: 'جيد جداً منخفض', descriptionEn: 'Very Good Low' },
    'C+': { points: 2.3, minPercentage: 70, maxPercentage: 75, descriptionAr: 'جيد مرتفع', descriptionEn: 'Good High' },
    'C': { points: 2.0, minPercentage: 65, maxPercentage: 70, descriptionAr: 'جيد', descriptionEn: 'Good' },
    'C-': { points: 1.7, minPercentage: 60, maxPercentage: 65, descriptionAr: 'جيد منخفض', descriptionEn: 'Good Low' },
    'D+': { points: 1.3, minPercentage: 55, maxPercentage: 60, descriptionAr: 'مقبول مرتفع', descriptionEn: 'Acceptable High' },
    'D': { points: 1.0, minPercentage: 50, maxPercentage: 55, descriptionAr: 'مقبول', descriptionEn: 'Acceptable' },
    'F': { points: 0.0, minPercentage: 0, maxPercentage: 50, descriptionAr: 'راسب', descriptionEn: 'Fail' },
};

// Complete Regulations Data from Official FCI Bylaws
export const comprehensiveRegulationsData = {
    ar: [
        // اللائحة الرسمية
        {
            section: 'اللائحة الرسمية',
            content: `يمكنك تحميل اللائحة الرسمية الكاملة لكلية الحاسبات والمعلومات [من هنا](${REGULATIONS_PDF_URL}). هذا الملف يحتوي على جميع اللوائح والسياسات الأكاديمية وأنظمة التقديرات ومتطلبات الكلية.`,
        },

        // الأقسام العلمية (مادة 4)
        {
            section: 'الأقسام العلمية (مادة 4)',
            content: `تضم كلية الحاسبات والمعلومات الأقسام العلمية التالية:
• قسم علوم الحاسب (Computer Science - CS)
• قسم نظم المعلومات (Information Systems - IS)  
• قسم تكنولوجيا المعلومات (Information Technology - IT)
• قسم الذكاء الاصطناعي (Artificial Intelligence - AI)
• قسم المعلوماتية الحيوية (Bioinformatics - BI)

يتم التخصص في أحد هذه الأقسام بداية من المستوى الثالث بعد اجتياز المستوى الثاني بنجاح.`,
        },

        // نظام الساعات المعتمدة (مادة 5)
        {
            section: 'نظام الساعات المعتمدة (مادة 5)',
            content: `تعمل الكلية بنظام الساعات المعتمدة:
• الساعة المعتمدة = محاضرة نظرية أسبوعية مدتها ساعة أو درس عملي/تمارين مدته ساعتين
• إجمالي الساعات المطلوبة للتخرج: 144 ساعة معتمدة
• يجب أن يحقق الطالب المعدل التراكمي المطلوب للتخرج`,
        },

        // نظام الدراسة والفصول (مادة 6)
        {
            section: 'نظام الدراسة والفصول (مادة 6)',
            content: `العام الدراسي يتكون من فصلين دراسيين:
• الفصل الدراسي الأول (الخريف): 15 أسبوع دراسي
• الفصل الدراسي الثاني (الربيع): 15 أسبوع دراسي
• فصل صيفي اختياري: 8 أسابيع

كل فصل دراسي يتضمن فترة امتحانات نهائية.`,
        },

        // المستويات الدراسية (مادة 7)
        {
            section: 'المستويات الدراسية (مادة 7)',
            content: `مدة الدراسة بالكلية أربع سنوات (8 فصول دراسية):
• المستوى الأول: مقررات تأسيسية مشتركة لجميع الأقسام
• المستوى الثاني: مقررات تأسيسية مشتركة + بعض مقررات التخصص
• المستوى الثالث: يبدأ التخصص في أحد الأقسام
• المستوى الرابع: مقررات تخصصية + مشروع التخرج

يُحدد مستوى الطالب بناءً على عدد الساعات المعتمدة التي أتمها بنجاح.`,
        },

        // الحد الأدنى والأقصى للساعات (مادة 8)
        {
            section: 'الحد الأدنى والأقصى للتسجيل (مادة 8)',
            content: `حدود التسجيل في كل فصل دراسي:
• الحد الأدنى: 12 ساعة معتمدة
• الحد الأقصى: 21 ساعة معتمدة
• الفصل الصيفي: الحد الأقصى 9 ساعات معتمدة

استثناءات:
• الطالب في الفصل الأخير يمكنه التسجيل أقل من 12 ساعة إذا كانت ساعاته المتبقية أقل
• يمكن زيادة الحد الأقصى للطلاب المتفوقين (معدل تراكمي 3.5 فأعلى)`,
        },

        // تسجيل المقررات (مادة 9)
        {
            section: 'تسجيل المقررات (مادة 9)',
            content: `قواعد تسجيل المقررات:
• يتم التسجيل في المواعيد المحددة في بداية كل فصل دراسي
• يجب مراعاة المتطلبات السابقة لكل مقرر
• لا يجوز تسجيل مقرر دون اجتياز متطلبه السابق
• يمكن حذف أو إضافة مقررات خلال الأسبوع الأول من الفصل
• الانسحاب من مقرر بعد الأسبوع الأول يُسجل W (منسحب) في السجل`,
        },

        // المرشد الأكاديمي (مادة 10)
        {
            section: 'المرشد الأكاديمي (مادة 10)',
            content: `يُخصص لكل طالب مرشد أكاديمي من أعضاء هيئة التدريس:
• يساعد الطالب في اختيار المقررات المناسبة
• يتابع تقدم الطالب الأكاديمي
• يقدم المشورة في حالة المشاكل الأكاديمية
• يوافق على جدول الطالب قبل اعتماده`,
        },

        // الحضور والغياب (مادة 11)
        {
            section: 'الحضور والغياب (مادة 11)',
            content: `قواعد الحضور والغياب:
• الحضور إلزامي لجميع المحاضرات والدروس العملية
• نسبة الغياب المسموحة: 25% كحد أقصى من إجمالي ساعات المقرر
• عند تجاوز 25% غياب يُحرم الطالب من دخول الامتحان النهائي
• يُعطى الطالب تقدير (محروم - Denied) في المقرر
• الحالات المرضية الموثقة تُعرض على لجنة خاصة`,
        },

        // الإنذارات الأكاديمية (مادة 12)
        {
            section: 'الإنذارات الأكاديمية (مادة 12)',
            content: `نظام الإنذارات:
• إنذار أول: عند انخفاض المعدل التراكمي عن 2.0
• إنذار ثاني: استمرار المعدل أقل من 2.0 لفصلين متتاليين
• إنذار ثالث (نهائي): استمرار المعدل أقل من 2.0 لثلاثة فصول متتالية
• بعد الإنذار الثالث يُفصل الطالب من الكلية

الطالب تحت الإنذار:
• لا يُسمح له بتسجيل أكثر من 14 ساعة
• يجب عليه رفع معدله فوق 2.0`,
        },

        // نظام الامتحانات (مادة 13-22)
        {
            section: 'نظام الامتحانات (مادة 13-22)',
            content: `توزيع الدرجات:
• أعمال السنة (Coursework): 40-60% حسب المقرر
• الامتحان النهائي: 40-60% حسب المقرر
• يشمل عمل السنة: امتحانات دورية، مشاريع، واجبات، حضور

قواعد الامتحانات:
• لا يُسمح بدخول الامتحان بعد مرور 15 دقيقة من بدايته
• الغش يؤدي إلى إلغاء الامتحان وعقوبات تأديبية
• يحق للطالب التظلم من نتيجته خلال أسبوعين من الإعلان`,
        },

        // نظام التقديرات (مادة 23)
        {
            section: 'نظام التقديرات (مادة 23)',
            content: `نظام التقديرات في كلية الحاسبات والمعلومات:
• A+ (ممتاز مرتفع): 4.0 نقاط - من 97% فأكثر
• A (ممتاز): 4.0 نقاط - من 93% إلى أقل من 97%
• A- (ممتاز منخفض): 3.7 نقاط - من 90% إلى أقل من 93%
• B+ (جيد جداً مرتفع): 3.3 نقاط - من 85% إلى أقل من 90%
• B (جيد جداً): 3.0 نقاط - من 80% إلى أقل من 85%
• B- (جيد جداً منخفض): 2.7 نقاط - من 75% إلى أقل من 80%
• C+ (جيد مرتفع): 2.3 نقاط - من 70% إلى أقل من 75%
• C (جيد): 2.0 نقاط - من 65% إلى أقل من 70%
• C- (جيد منخفض): 1.7 نقاط - من 60% إلى أقل من 65%
• D+ (مقبول مرتفع): 1.3 نقاط - من 55% إلى أقل من 60%
• D (مقبول): 1.0 نقاط - من 50% إلى أقل من 55%
• F (راسب): 0.0 نقاط - أقل من 50%

رموز خاصة:
• W (منسحب): انسحاب بعد فترة الحذف والإضافة
• I (غير مكتمل): لم يستكمل متطلبات المقرر
• IP (قيد الدراسة): لمشروع التخرج الممتد لفصلين`,
        },

        // حساب المعدل التراكمي (مادة 24)
        {
            section: 'حساب المعدل التراكمي (مادة 24)',
            content: `طريقة حساب المعدل التراكمي GPA:

المعادلة: المعدل = مجموع (نقاط التقدير × الساعات المعتمدة) ÷ إجمالي الساعات المعتمدة

مثال عملي:
لو عندك المقررات التالية:
• مقرر 1: 3 ساعات - تقدير B (3.0 نقاط)
• مقرر 2: 4 ساعات - تقدير A (4.0 نقاط)  
• مقرر 3: 3 ساعات - تقدير C+ (2.3 نقاط)

الحساب:
(3×3.0 + 4×4.0 + 3×2.3) ÷ (3+4+3) = (9 + 16 + 6.9) ÷ 10 = 31.9 ÷ 10 = 3.19

المعدل التراكمي = 3.19`,
        },

        // تقدير التخرج (مادة 24)
        {
            section: 'تقدير التخرج (مادة 24)',
            content: `تقدير التخرج بناءً على المعدل التراكمي النهائي:
• ممتاز: معدل 3.5 فأكثر
• جيد جداً: معدل من 3.0 إلى أقل من 3.5
• جيد: معدل من 2.5 إلى أقل من 3.0
• مقبول: معدل من 2.0 إلى أقل من 2.5
• ضعيف: معدل من 1.5 إلى أقل من 2.0
• ضعيف جداً: معدل أقل من 1.5

شروط مرتبة الشرف: اجتياز جميع المستويات بتقدير لا يقل عن جيد جداً وعدم الرسوب في أي مقرر.`,
        },

        // إعادة المقررات (مادة 26)
        {
            section: 'إعادة المقررات (مادة 26)',
            content: `قواعد إعادة المقررات:
• المقرر الراسب (F): يجب إعادته حتى النجاح
• تحسين التقدير: يمكن إعادة مقرر حصل فيه على D أو D+ مرة واحدة
• عند الإعادة: يُحسب التقدير الأعلى في المعدل التراكمي
• المقررات المُعادة تظهر جميعها في السجل الأكاديمي`,
        },

        // شروط التخرج (مادة 27)
        {
            section: 'شروط التخرج (مادة 27)',
            content: `شروط الحصول على درجة البكالوريوس:
• إتمام 144 ساعة معتمدة بنجاح
• الحصول على معدل تراكمي لا يقل عن 2.0
• اجتياز جميع المقررات الإجبارية للقسم
• إتمام مشروع التخرج بنجاح
• قضاء 4 فصول دراسية على الأقل بالكلية (للمحولين)
• تسديد جميع الرسوم والالتزامات المالية`,
        },

        // التحويل بين الأقسام (مادة 28)
        {
            section: 'التحويل بين الأقسام (مادة 28)',
            content: `قواعد التحويل بين الأقسام:
• يُسمح بالتحويل مرة واحدة فقط خلال فترة الدراسة
• يجب تقديم طلب التحويل في المواعيد المحددة
• تُحسب المقررات المشتركة بين القسمين
• قد يُطلب من الطالب دراسة مقررات إضافية للقسم الجديد
• الموافقة تخضع للطاقة الاستيعابية للقسم`,
        },

        // مشروع التخرج (مادة 29)
        {
            section: 'مشروع التخرج (مادة 29)',
            content: `قواعد مشروع التخرج:
• يُسجل في الفصل الأخير أو الأخيرين حسب القسم
• يعمل الطالب ضمن فريق من 3-5 طلاب
• يُشرف على المشروع عضو هيئة تدريس
• يتضمن المشروع: توثيق كتابي + عرض تقديمي + برنامج تطبيقي
• يُقيّم من لجنة من 3 أعضاء هيئة تدريس على الأقل`,
        },

        // معادلة المقررات للمحولين (مادة 30)
        {
            section: 'معادلة المقررات للمحولين (مادة 30)',
            content: `قواعد معادلة المقررات للطلاب المحولين:
• تُشكل لجنة لدراسة طلبات المعادلة
• يُعادل المقرر إذا تطابق محتواه بنسبة 75% على الأقل
• التقدير المُعادل يكون P (ناجح) ولا يدخل في حساب المعدل
• الحد الأقصى للمعادلة: 50% من ساعات البرنامج
• يجب على المحول قضاء 4 فصول دراسية على الأقل بالكلية`,
        },

        // الانسحاب والتأجيل (مادة 31)
        {
            section: 'الانسحاب والتأجيل (مادة 31)',
            content: `قواعد الانسحاب والتأجيل:
• يحق للطالب تأجيل الدراسة لفصلين متتاليين كحد أقصى
• يجب تقديم طلب التأجيل قبل بداية الفصل
• الانسحاب بعد منتصف الفصل يُسجل F في جميع المقررات
• التأجيل لظروف قهرية يُعرض على لجنة خاصة
• الحد الأقصى للتأجيل خلال الدراسة: 4 فصول دراسية`,
        },

        // التظلمات (مادة 32)
        {
            section: 'التظلمات والشكاوى (مادة 32)',
            content: `نظام التظلمات:
• يحق للطالب التظلم من نتائج الامتحانات خلال أسبوعين
• يُقدم التظلم كتابياً لشؤون الطلاب
• تُشكل لجنة لمراجعة ورقة الإجابة
• يُبلغ الطالب بنتيجة التظلم خلال أسبوع
• قرار لجنة التظلمات نهائي`,
        },
    ],

    en: [
        // Official Regulations Document
        {
            section: 'Official Regulations Document',
            content: `You can download the official FCI regulations document [here](${REGULATIONS_PDF_URL}). This PDF contains all official bylaws, academic policies, grading systems, and requirements.`,
        },

        // Academic Departments (Article 4)
        {
            section: 'Academic Departments (Article 4)',
            content: `The Faculty of Computers & Information includes the following departments:
• Computer Science (CS)
• Information Systems (IS)
• Information Technology (IT)
• Artificial Intelligence (AI)
• Bioinformatics (BI)

Students specialize in one of these departments starting from Level 3 after successfully completing Level 2.`,
        },

        // Credit Hours System (Article 5)
        {
            section: 'Credit Hours System (Article 5)',
            content: `The faculty operates on a credit hours system:
• 1 credit hour = 1 hour weekly lecture OR 2 hours practical/tutorial
• Total hours required for graduation: 144 credit hours
• Students must achieve the required cumulative GPA to graduate`,
        },

        // Academic Calendar (Article 6)
        {
            section: 'Academic Calendar (Article 6)',
            content: `The academic year consists of two semesters:
• Fall Semester: 15 weeks of instruction
• Spring Semester: 15 weeks of instruction
• Optional Summer Semester: 8 weeks

Each semester includes a final examination period.`,
        },

        // Academic Levels (Article 7)
        {
            section: 'Academic Levels (Article 7)',
            content: `The program duration is 4 years (8 semesters):
• Level 1: Foundation courses common to all departments
• Level 2: Foundation courses + some specialization courses
• Level 3: Specialization begins in chosen department
• Level 4: Advanced specialization + graduation project

Student level is determined by successfully completed credit hours.`,
        },

        // Registration Limits (Article 8)
        {
            section: 'Registration Limits (Article 8)',
            content: `Registration limits per semester:
• Minimum: 12 credit hours
• Maximum: 21 credit hours
• Summer Semester: Maximum 9 credit hours

Exceptions:
• Final semester students may register fewer if needed
• High achievers (GPA ≥ 3.5) may register additional hours`,
        },

        // Course Registration (Article 9)
        {
            section: 'Course Registration (Article 9)',
            content: `Course registration rules:
• Registration occurs at designated times at semester start
• Prerequisites must be observed
• Cannot register for a course without passing its prerequisite
• Add/drop period: First week of semester
• Withdrawal after first week results in W (Withdrawn) on transcript`,
        },

        // Academic Advisor (Article 10)
        {
            section: 'Academic Advisor (Article 10)',
            content: `Each student is assigned a faculty academic advisor who:
• Helps select appropriate courses
• Monitors academic progress
• Provides guidance for academic problems
• Approves student schedule before finalization`,
        },

        // Attendance Policy (Article 11)
        {
            section: 'Attendance Policy (Article 11)',
            content: `Attendance and absence rules:
• Attendance is mandatory for all lectures and practicals
• Maximum allowed absence: 25% of total course hours
• Exceeding 25% absence: Student is barred from final exam
• Student receives "Denied" grade for the course
• Documented medical cases are reviewed by special committee`,
        },

        // Academic Warnings (Article 12)
        {
            section: 'Academic Warnings (Article 12)',
            content: `Warning system:
• First Warning: GPA drops below 2.0
• Second Warning: GPA remains below 2.0 for two consecutive semesters
• Third (Final) Warning: GPA below 2.0 for three consecutive semesters
• After third warning: Student is dismissed

Students on warning:
• Cannot register more than 14 credit hours
• Must raise GPA above 2.0`,
        },

        // Examination System (Articles 13-22)
        {
            section: 'Examination System (Articles 13-22)',
            content: `Grade distribution:
• Coursework: 40-60% depending on course
• Final Exam: 40-60% depending on course
• Coursework includes: midterms, projects, assignments, attendance

Examination rules:
• No entry after 15 minutes from exam start
• Cheating results in exam cancellation and disciplinary action
• Students may appeal grades within two weeks of announcement`,
        },

        // Grading System (Article 23)
        {
            section: 'Grading System (Article 23)',
            content: `FCI Grading Scale:
• A+ (Excellent High): 4.0 points - 97% and above
• A (Excellent): 4.0 points - 93% to less than 97%
• A- (Excellent Low): 3.7 points - 90% to less than 93%
• B+ (Very Good High): 3.3 points - 85% to less than 90%
• B (Very Good): 3.0 points - 80% to less than 85%
• B- (Very Good Low): 2.7 points - 75% to less than 80%
• C+ (Good High): 2.3 points - 70% to less than 75%
• C (Good): 2.0 points - 65% to less than 70%
• C- (Good Low): 1.7 points - 60% to less than 65%
• D+ (Acceptable High): 1.3 points - 55% to less than 60%
• D (Acceptable): 1.0 points - 50% to less than 55%
• F (Fail): 0.0 points - less than 50%

Special symbols:
• W (Withdrawn): Withdrawal after add/drop period
• I (Incomplete): Course requirements not completed
• IP (In Progress): For two-semester graduation projects`,
        },

        // GPA Calculation (Article 24)
        {
            section: 'GPA Calculation (Article 24)',
            content: `GPA Calculation Method:

Formula: GPA = Σ(Grade Points × Credit Hours) ÷ Σ(Credit Hours)

Example:
If you have these courses:
• Course 1: 3 hours - Grade B (3.0 points)
• Course 2: 4 hours - Grade A (4.0 points)
• Course 3: 3 hours - Grade C+ (2.3 points)

Calculation:
(3×3.0 + 4×4.0 + 3×2.3) ÷ (3+4+3) = (9 + 16 + 6.9) ÷ 10 = 31.9 ÷ 10 = 3.19

GPA = 3.19`,
        },

        // Graduation Classification (Article 24)
        {
            section: 'Graduation Classification (Article 24)',
            content: `Graduation classification based on final cumulative GPA:
• Excellent: GPA 3.5 or higher
• Very Good: GPA 3.0 to less than 3.5
• Good: GPA 2.5 to less than 3.0
• Acceptable: GPA 2.0 to less than 2.5
• Weak: GPA 1.5 to less than 2.0
• Very Weak: GPA less than 1.5

Honors requirement: Pass all levels with at least Very Good grade and no course failures.`,
        },

        // Course Retake (Article 26)
        {
            section: 'Course Retake (Article 26)',
            content: `Course retake rules:
• Failed course (F): Must be retaken until passed
• Grade improvement: May retake D or D+ courses once
• On retake: Higher grade counts toward GPA
• All attempts appear on academic transcript`,
        },

        // Graduation Requirements (Article 27)
        {
            section: 'Graduation Requirements (Article 27)',
            content: `Requirements for Bachelor's degree:
• Complete 144 credit hours successfully
• Achieve minimum cumulative GPA of 2.0
• Pass all required department courses
• Complete graduation project successfully
• Spend at least 4 semesters at the faculty (for transfers)
• Clear all financial obligations`,
        },

        // Department Transfer (Article 28)
        {
            section: 'Department Transfer (Article 28)',
            content: `Department transfer rules:
• Only one transfer allowed during studies
• Transfer application must be submitted by deadline
• Common courses are credited
• Additional courses may be required for new department
• Approval subject to department capacity`,
        },

        // Graduation Project (Article 29)
        {
            section: 'Graduation Project (Article 29)',
            content: `Graduation project rules:
• Registered in final semester(s) as per department
• Team of 3-5 students
• Supervised by faculty member
• Includes: documentation + presentation + application
• Evaluated by committee of at least 3 faculty members`,
        },

        // Course Equivalence for Transfers (Article 30)
        {
            section: 'Course Equivalence for Transfers (Article 30)',
            content: `Course equivalence rules for transfer students:
• Committee reviews equivalence requests
• Course is credited if content matches 75%+ 
• Equivalent grade is P (Pass), doesn't count in GPA
• Maximum equivalence: 50% of program hours
• Transfers must complete at least 4 semesters at FCI`,
        },

        // Withdrawal and Deferment (Article 31)
        {
            section: 'Withdrawal and Deferment (Article 31)',
            content: `Withdrawal and deferment rules:
• Students may defer for maximum 2 consecutive semesters
• Deferment request must be submitted before semester starts
• Withdrawal after mid-semester results in F for all courses
• Emergency deferment reviewed by special committee
• Maximum total deferment: 4 semesters`,
        },

        // Appeals (Article 32)
        {
            section: 'Appeals and Complaints (Article 32)',
            content: `Appeals system:
• Students may appeal exam results within two weeks
• Written appeal submitted to Student Affairs
• Committee reviews answer sheet
• Student notified of result within one week
• Appeals committee decision is final`,
        },
    ],
};
