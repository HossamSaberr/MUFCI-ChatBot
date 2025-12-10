'use client';

import { Menu, FileText, GraduationCap, PhoneOutgoing } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { LanguageToggle } from './language-toggle';
import { useLanguage } from '@/lib/language-context';

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    const { t, language } = useLanguage();

    return (
        <header className="header-gradient shadow-lg">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Left side - Menu & Title */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuClick}
                        className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3">
                        {/* Logo */}
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                            <GraduationCap className="w-5 h-5" />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold tracking-tight">
                                {t.appTitle}
                            </h1>
                            <p className="text-xs text-white/80 hidden sm:block">
                                {t.appSubtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-2">
                    <a
                        href="http://mu.menofia.edu.eg/PrtlFiles/Faculties/fci/Portal/Files/%D9%84%D8%A7%D8%A6%D8%AD%D8%A9%20%D8%AD%D8%A7%D8%B3%D8%A8%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9%20%D8%A7%D9%84%D9%86%D8%B3%D8%AE%D8%A9%20%D8%A7%D9%84%D9%85%D8%B9%D8%AF%D9%84%D8%A9-1.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
                    >
                        <FileText className="w-4 h-4" />
                        <span className="hidden md:inline">{t.regulationsDoc}</span>
                    </a>

                    {/* Developer Portfolio*/}
                    <a
                        href="https://github.com/https://hossam-portfolio-one.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                        title={language === 'ar' ? 'بورتفوليو المطور' : 'Developer Portfolio'}
                    >
                        <PhoneOutgoing className="w-5 h-5" />
                    </a>

                    <div className="flex items-center gap-1 p-1 rounded-xl bg-white/10">
                        <ThemeToggle />
                        <LanguageToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
