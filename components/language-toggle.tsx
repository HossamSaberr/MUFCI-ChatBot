'use client';

import { Languages } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-1.5"
            aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
        >
            <Languages className="w-5 h-5" />
            <span className="text-sm font-medium">
                {language === 'ar' ? 'EN' : 'ع'}
            </span>
        </button>
    );
}
