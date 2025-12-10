export type Language = 'ar' | 'en';

export interface Translations {
    appTitle: string;
    appSubtitle: string;
    newChat: string;
    chatHistory: string;
    messagePlaceholder: string;
    sendMessage: string;
    thinking: string;
    welcomeMessage: string;
    welcomeSubMessage: string;
    darkMode: string;
    lightMode: string;
    language: string;
    clear: string;
    delete: string;
    viewRegulations: string;
    regulationsDoc: string;
    errorOccurred: string;
    tryAgain: string;
}

export const translations: Record<Language, Translations> = {
    en: {
        appTitle: 'FCI Regulations Assistant',
        appSubtitle: 'Faculty of Computers & Information - Menofia University',
        newChat: 'New Chat',
        chatHistory: 'Chat History',
        messagePlaceholder: 'Ask about regulations...',
        sendMessage: 'Send',
        thinking: 'Thinking...',
        welcomeMessage: 'Welcome to FCI Regulations Assistant',
        welcomeSubMessage: 'Ask me anything about the Faculty of Computers & Information regulations at Menofia University.',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        language: 'Language',
        clear: 'Clear',
        delete: 'Delete',
        viewRegulations: 'View Regulations',
        regulationsDoc: 'Regulations Document',
        errorOccurred: 'An error occurred',
        tryAgain: 'Try Again',
    },
    ar: {
        appTitle: 'مساعد لوائح كلية الحاسبات',
        appSubtitle: 'كلية الحاسبات والمعلومات - جامعة المنوفية',
        newChat: 'محادثة جديدة',
        chatHistory: 'سجل المحادثات',
        messagePlaceholder: 'اسأل عن اللوائح...',
        sendMessage: 'إرسال',
        thinking: 'جاري التفكير...',
        welcomeMessage: 'مرحباً بك في مساعد لوائح كلية الحاسبات',
        welcomeSubMessage: 'اسألني أي شيء عن لوائح كلية الحاسبات والمعلومات بجامعة المنوفية.',
        darkMode: 'الوضع الداكن',
        lightMode: 'الوضع الفاتح',
        language: 'اللغة',
        clear: 'مسح',
        delete: 'حذف',
        viewRegulations: 'عرض اللوائح',
        regulationsDoc: 'وثيقة اللوائح',
        errorOccurred: 'حدث خطأ',
        tryAgain: 'حاول مرة أخرى',
    },
};
