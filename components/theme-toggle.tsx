'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const { language } = useLanguage();

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            aria-label={language === 'ar' ? 'تبديل السمة' : 'Toggle theme'}
        >
            <Sun className="w-5 h-5 hidden dark:block" />
            <Moon className="w-5 h-5 block dark:hidden" />
        </button>
    );
}
