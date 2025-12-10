'use client';

import { X, Plus, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { formatDistanceToNow } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

interface Chat {
    id: string;
    title: string;
    timestamp: Date;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    chats: Chat[];
    currentChatId: string | null;
    onChatSelect: (chatId: string) => void;
    onNewChat: () => void;
}

export function Sidebar({
    isOpen,
    onClose,
    chats,
    currentChatId,
    onChatSelect,
    onNewChat,
}: SidebarProps) {
    const { t, language } = useLanguage();
    const locale = language === 'ar' ? ar : enUS;

    return (
        <>
            {/* Overlay when sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 start-0 z-50 w-72 
                    bg-white dark:bg-gray-900 border-e border-gray-200 dark:border-gray-700
                    transform transition-transform duration-300 ease-out flex flex-col
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    ${language === 'ar' && !isOpen ? 'translate-x-full' : ''}`}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-gray-800 dark:text-white">
                            {t.chatHistory}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <button
                        onClick={onNewChat}
                        className="w-full flex items-center justify-center gap-2 btn-primary"
                    >
                        <Plus className="w-5 h-5" />
                        <span>{t.newChat}</span>
                    </button>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {chats.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">
                                {language === 'ar' ? 'لا توجد محادثات سابقة' : 'No previous chats'}
                            </p>
                        </div>
                    ) : (
                        chats.map((chat, index) => (
                            <button
                                key={chat.id}
                                onClick={() => onChatSelect(chat.id)}
                                className={`w-full text-start sidebar-item animate-slide-in group ${currentChatId === chat.id ? 'active' : ''
                                    }`}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="flex items-start gap-3">
                                    <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0 text-gray-400" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate text-gray-800 dark:text-gray-200">
                                            {chat.title}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {formatDistanceToNow(new Date(chat.timestamp), {
                                                addSuffix: true,
                                                locale,
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-center text-gray-400">
                        {language === 'ar'
                            ? 'كلية الحاسبات والمعلومات'
                            : 'Faculty of Computers & Information'}
                    </p>
                </div>
            </aside>
        </>
    );
}
