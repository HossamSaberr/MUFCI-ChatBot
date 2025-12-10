'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Message, TypingIndicator } from './message';
import { ChatMessage } from '@/lib/ai-config';
import { useLanguage } from '@/lib/language-context';
import { Send, GraduationCap, Calculator, BookOpen, ClipboardList, ChevronDown, X, Keyboard } from 'lucide-react';

interface ChatInterfaceProps {
    messages: ChatMessage[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

function Confetti() {
    return (
        <div className="confetti-container">
            {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="confetti" />
            ))}
        </div>
    );
}

// Keyboard Shortcuts
function ShortcutsModal({ onClose, language }: { onClose: () => void; language: string }) {
    const shortcuts = [
        { key: 'Enter', action: language === 'ar' ? 'إرسال الرسالة' : 'Send message' },
        { key: 'Shift + Enter', action: language === 'ar' ? 'سطر جديد' : 'New line' },
        { key: 'Ctrl + K', action: language === 'ar' ? 'فتح اختصارات لوحة المفاتيح' : 'Open shortcuts' },
        { key: 'Esc', action: language === 'ar' ? 'إغلاق النافذة' : 'Close modal' },
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Keyboard className="w-5 h-5" />
                        {language === 'ar' ? 'اختصارات لوحة المفاتيح' : 'Keyboard Shortcuts'}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div>
                    {shortcuts.map((shortcut, i) => (
                        <div key={i} className="shortcut-item">
                            <span>{shortcut.action}</span>
                            <span className="shortcut-key">{shortcut.key}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}



export function ChatInterface({ messages, onSendMessage, isLoading }: ChatInterfaceProps) {
    const [input, setInput] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [rainbowMode, setRainbowMode] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { t, language } = useLanguage();


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Check if we need to show scroll button
    const handleScroll = useCallback(() => {
        if (messagesContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
            setShowScrollBtn(!isNearBottom && messages.length > 0);
        }
    }, [messages.length]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Check for high gpa 
    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.role === 'assistant') {
                const gpaMatches = lastMessage.content.match(/(\d+\.\d+)/g);
                if (gpaMatches) {
                    for (const match of gpaMatches) {
                        const gpa = parseFloat(match);
                        // Check if it looks like a GPA (between 3.5 and 4.0)
                        if (gpa >= 3.5 && gpa <= 4.0) {
                            setShowConfetti(true);
                            setTimeout(() => setShowConfetti(false), 4000);
                            break;
                        }
                    }
                }
            }
        }
    }, [messages]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+K to open shortcuts
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setShowShortcuts(true);
            }
            // Escape to close modal
            if (e.key === 'Escape') {
                setShowShortcuts(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // flexing
    useEffect(() => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('hossam') || lowerInput.includes('homz') || lowerInput.includes('حسام')) {
            if (!rainbowMode) {
                setRainbowMode(true);
                setTimeout(() => setRainbowMode(false), 5000);
            }
        }
    }, [input, rainbowMode]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    };

    const quickActions = [
        {
            icon: GraduationCap,
            label: language === 'ar' ? 'متطلبات التخرج' : 'Graduation Requirements',
            query: language === 'ar' ? 'ما هي متطلبات التخرج؟' : 'What are the graduation requirements?'
        },
        {
            icon: Calculator,
            label: language === 'ar' ? 'حساب المعدل' : 'GPA Calculation',
            query: language === 'ar' ? 'كيف يتم حساب المعدل التراكمي؟' : 'How is GPA calculated?'
        },
        {
            icon: BookOpen,
            label: language === 'ar' ? 'الساعات المعتمدة' : 'Credit Hours',
            query: language === 'ar' ? 'كم عدد الساعات المعتمدة للتخرج؟' : 'How many credit hours for graduation?'
        },
        {
            icon: ClipboardList,
            label: language === 'ar' ? 'اللائحة الكاملة' : 'Full Regulations',
            query: language === 'ar' ? 'أريد اللائحة الكاملة' : 'I want the full regulations document'
        },
    ];

    return (
        <>
            {showConfetti && <Confetti />}

            {showShortcuts && <ShortcutsModal onClose={() => setShowShortcuts(false)} language={language} />}

            <div className={`flex-1 flex flex-col min-h-0 bg-pattern ${rainbowMode ? 'rainbow-mode' : ''}`}>
                {/* Messages Area */}
                <div ref={messagesContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-4 py-6">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.length === 0 ? (
                            // Enhanced Welcome Screen
                            <div className="relative flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in welcome-bg">
                                {/* Floating Particles */}
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="particle"></div>
                                    <div className="particle"></div>
                                    <div className="particle"></div>
                                    <div className="particle"></div>
                                    <div className="particle"></div>
                                    <div className="particle"></div>
                                    <div className="particle"></div>
                                    <div className="particle"></div>
                                </div>

                                {/* Hero Logo with */}
                                <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center mb-6 shadow-xl hero-logo">
                                    <GraduationCap className="w-12 h-12 text-white" />
                                </div>

                                {/* Welcome Title */}
                                <h2 className="text-3xl font-bold mb-3 shimmer-text">
                                    {t.welcomeMessage}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-lg text-lg">
                                    {t.welcomeSubMessage}
                                </p>

                                {/* Enhanced Quick Actions */}
                                <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
                                    {quickActions.map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={() => onSendMessage(action.query)}
                                            className={`quick-action-enhanced animate-fade-in stagger-${index + 1}`}
                                        >
                                            <action.icon className="w-5 h-5 text-blue-500 relative z-10" />
                                            <span className="relative z-10">{action.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Feature Badges */}
                                <div className="mt-12 flex items-center gap-6 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span>{language === 'ar' ? 'يدعم العربية والإنجليزية' : 'Arabic & English'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span>{language === 'ar' ? 'حاسب المعدل التراكمي' : 'GPA Calculator'}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Chat Messages
                            <>
                                {messages.map((message, index) => (
                                    <Message
                                        key={index}
                                        message={message}
                                        isLatest={index === messages.length - 1}
                                    />
                                ))}
                                {isLoading && <TypingIndicator />}
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Enhanced Input Area */}
                <div className="border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <div className="max-w-3xl mx-auto px-4 py-4">
                        <form onSubmit={handleSubmit} className="relative">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder={t.messagePlaceholder}
                                className="input-enhanced w-full resize-none min-h-[56px] max-h-[120px]"
                                rows={1}
                                disabled={isLoading}
                                maxLength={2000}
                            />

                            {/* Character Counter */}
                            {input.length > 100 && (
                                <span className={`absolute end-16 bottom-4 char-counter ${input.length > 1800 ? 'danger' : input.length > 1500 ? 'warning' : ''
                                    }`}>
                                    {input.length}/2000
                                </span>
                            )}

                            {/* Send Button */}
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className={`absolute end-3 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all ${input.trim() && !isLoading
                                    ? 'gradient-primary text-white shadow-md hover:shadow-lg send-pulse'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>

                        {/* Footer */}
                        <a
                            href="https://github.com/HossamSaberr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-center text-gray-400 hover:text-blue-500 transition-colors block mt-3"
                        >
                            {language === 'ar'
                                ? '🎓 مساعد كلية الحاسبات والمعلومات - جامعة المنوفية - صنع بواسطة حسام'
                                : '🎓 FCI Assistant - Menofia University - Made by Homz'}
                        </a>
                    </div>
                </div>

                {/* Scroll to Bottom Button */}
                <button
                    onClick={scrollToBottom}
                    className={`scroll-btn ${showScrollBtn ? 'visible' : ''}`}
                    title={language === 'ar' ? 'انتقل للأسفل' : 'Scroll to bottom'}
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
            </div>
        </>
    );
}
