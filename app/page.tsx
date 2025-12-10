'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { ChatInterface } from '@/components/chat-interface';
import { ChatMessage } from '@/lib/ai-config';
import { useLanguage } from '@/lib/language-context';

interface Chat {
  id: string;
  title: string;
  timestamp: Date;
  messages: ChatMessage[];
}

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const { language } = useLanguage();

  // Load chats from localStorage 
  useEffect(() => {
    const savedChats = localStorage.getItem('fci-chats');
    if (savedChats) {
      try {
        const parsed = JSON.parse(savedChats);
        setChats(parsed.map((c: Chat) => ({ ...c, timestamp: new Date(c.timestamp) })));
      } catch (e) {
        console.error('Failed to load chats:', e);
      }
    }
  }, []);

  // Save chats to localStorage when they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('fci-chats', JSON.stringify(chats));
    }
  }, [chats]);

  // Auto-save current chat 
  useEffect(() => {
    if (currentChatId && messages.length > 0) {
      setChats(prev => prev.map(chat =>
        chat.id === currentChatId
          ? { ...chat, messages: messages }
          : chat
      ));
    }
  }, [messages, currentChatId]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], language }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage: ChatMessage = { role: 'assistant', content: data.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: language === 'ar'
          ? 'عذراً، حدث خطأ. الرجاء المحاولة مرة أخرى.'
          : 'Sorry, an error occurred. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    // Save current chat if it has messages and is new
    if (messages.length > 0 && currentChatId === null) {
      const newChatId = Date.now().toString();
      const newChat: Chat = {
        id: newChatId,
        title: messages[0]?.content.slice(0, 50) || 'New Chat',
        timestamp: new Date(),
        messages: messages,
      };
      setChats((prev) => [newChat, ...prev]);
    }

    // Reset for new chat
    setMessages([]);
    setCurrentChatId(null);
    setIsSidebarOpen(false);
  };

  const handleChatSelect = (chatId: string) => {
    // Save current chat first if it has unsaved messages
    if (messages.length > 0 && currentChatId === null) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: messages[0]?.content.slice(0, 50) || 'New Chat',
        timestamp: new Date(),
        messages: messages,
      };
      setChats((prev) => [newChat, ...prev]);
    }

    // Load the selected chat
    const selectedChat = chats.find(c => c.id === chatId);
    if (selectedChat) {
      setMessages(selectedChat.messages || []);
      setCurrentChatId(chatId);
    }
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        chats={chats}
        currentChatId={currentChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
