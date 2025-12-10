'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage } from '@/lib/ai-config';
import { useLanguage } from '@/lib/language-context';
import { User, Bot, Copy, Check } from 'lucide-react';

interface MessageProps {
    message: ChatMessage;
    isLatest?: boolean;
}

export function Message({ message, isLatest }: MessageProps) {
    const { language } = useLanguage();
    const [copied, setCopied] = useState(false);
    const isUser = message.role === 'user';
    const isAssistant = message.role === 'assistant';

    const handleCopy = async () => {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className={`message-wrapper group flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} ${isLatest ? 'animate-fade-in' : ''}`}
        >
            {/* Avatar */}
            <div className={`avatar ${isUser ? 'avatar-user' : 'avatar-assistant'} ${isLatest && !isUser ? 'glow-effect' : ''}`}>
                {isUser ? (
                    <User className="w-4 h-4" />
                ) : (
                    <Bot className="w-4 h-4" />
                )}
            </div>

            {/* Message Bubble with Copy Button */}
            <div className="relative max-w-[80%] md:max-w-[70%]">
                <div
                    className={`${isUser
                        ? 'chat-bubble-user px-4 py-3'
                        : 'chat-bubble-assistant px-4 py-3 hover:shadow-md transition-shadow'
                        }`}
                >
                    {isAssistant ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    a: ({ href, children }) => (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 dark:text-blue-400 hover:underline font-medium"
                                        >
                                            {children}
                                        </a>
                                    ),
                                    p: ({ children }) => (
                                        <p className="leading-relaxed">{children}</p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="list-disc list-inside space-y-1">{children}</ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="list-decimal list-inside space-y-1">{children}</ol>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-bold text-blue-600 dark:text-blue-400">{children}</strong>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-lg font-bold mt-4 mb-2 text-gray-800 dark:text-white">{children}</h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-base font-semibold mt-3 mb-1 text-gray-700 dark:text-gray-200">{children}</h3>
                                    ),
                                    hr: () => (
                                        <hr className="my-3 border-gray-200 dark:border-gray-600" />
                                    ),
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-sm leading-relaxed">{message.content}</p>
                    )}
                </div>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className={`copy-btn absolute -bottom-2 ${isUser ? (language === 'ar' ? 'right-2' : 'left-2') : (language === 'ar' ? 'left-2' : 'right-2')} p-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm ${copied ? 'copied' : 'text-gray-500 hover:text-blue-500'}`}
                    title={copied ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'نسخ' : 'Copy')}
                >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
            </div>
        </div>
    );
}

export function TypingIndicator() {
    return (
        <div className="flex gap-3 animate-fade-in">
            <div className="avatar avatar-assistant">
                <Bot className="w-4 h-4" />
            </div>
            <div className="chat-bubble-assistant px-4 py-3">
                <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></span>
                </div>
            </div>
        </div>
    );
}
