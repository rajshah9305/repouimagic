import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, Variant } from '../types';
import { AgentRole } from '../types';
import { Send, Sparkles } from './Icons';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onGenerate: (prompt: string, moods: string[]) => void;
  isLoading: boolean;
  hasVariants: boolean;
  selectedVariant: Variant | null;
}

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === AgentRole.User;
  const isSystem = message.role === AgentRole.System;
  
  if (isSystem) {
    return (
      <div className="w-full flex justify-center my-4">
        <div className="max-w-[85%] px-3 py-2 text-center text-xs text-[var(--color-text-tertiary)] bg-white/5 rounded-full">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] p-3 rounded-xl border ${isUser ? 'bg-blue-500/10 border-blue-500/20' : 'bg-white/5 border-white/10'}`}>
         {!isUser && <div className="text-xs font-semibold text-[var(--color-accent-primary)] mb-1">{message.role}</div>}
        <p className="text-sm whitespace-pre-wrap text-[var(--color-text-primary)] leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
};

const moods = ['Futuristic', 'Minimal', 'Playful', 'Professional', 'Dark', 'Cyberpunk', 'Glassmorphism', 'Brutalist'];

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, onGenerate, isLoading, hasVariants, selectedVariant }) => {
  const [input, setInput] = useState('');
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
     const container = messagesContainerRef.current;
      if (container) {
        const isScrolledToBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 50;
        if (isScrolledToBottom) {
           chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      if (hasVariants) {
        onSendMessage(input);
      } else {
        onGenerate(input, selectedMoods);
      }
      setInput('');
    }
  };

  const toggleMood = (mood: string) => {
    setSelectedMoods(prev =>
      prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
  };
  
  const isGenerationMode = !hasVariants;
  const placeholderText = isGenerationMode
    ? 'Describe your UI vision...'
    : selectedVariant
      ? `Refine "${selectedVariant.name}"...`
      : 'Select a variant to chat';
  
  const canSubmit = isGenerationMode 
    ? !isLoading && input.trim()
    : !isLoading && selectedVariant && input.trim();


  return (
    <aside className="col-span-12 lg:col-span-3 h-full glowing-panel rounded-2xl p-4 flex flex-col">
      <h2 className="text-lg font-['Space_Grotesk'] text-[var(--color-text-primary)] mb-4 p-2 flex-shrink-0">Agent Chat</h2>
      <div ref={messagesContainerRef} className="flex-grow overflow-y-auto space-y-4 pr-2 -mr-2 chat-scrollbar">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        {isLoading && messages[messages.length - 1]?.role !== AgentRole.System && (
           <div className="w-full flex justify-start">
             <div className="flex items-center space-x-2 p-3 rounded-lg">
                <div className="w-2 h-2 bg-[var(--color-accent-primary)] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[var(--color-accent-primary)] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-[var(--color-accent-primary)] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
             </div>
           </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="flex-shrink-0 mt-4 pt-4 border-t border-[var(--color-border)]">
        {isGenerationMode && (
          <div className="flex flex-wrap gap-2 mb-4">
              {moods.map(mood => (
                <button
                  key={mood}
                  onClick={() => toggleMood(mood)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    selectedMoods.includes(mood) 
                      ? 'bg-[var(--color-accent-primary-glow)] border-[var(--color-accent-primary)]/50 text-[var(--color-accent-primary)]' 
                      : 'bg-white/5 border-transparent hover:border-white/20 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {mood}
                </button>
              ))}
          </div>
        )}
        <form onSubmit={handleSend} className="flex items-center gap-3 p-1 rounded-2xl bg-black/20 border border-transparent transition-all duration-300 focus-within:border-[var(--color-border-heavy)] focus-within:shadow-[0_0_12px_0_var(--color-glow-ring)]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholderText}
            disabled={isLoading || (!isGenerationMode && !selectedVariant)}
            className="flex-grow bg-transparent border-none rounded-xl py-2.5 px-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:ring-0 focus:outline-none transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex-shrink-0 text-white bg-[var(--color-accent-primary)] rounded-xl p-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-[0_4px_14px_0_var(--color-accent-primary-glow)]"
          >
            {isGenerationMode ? <Sparkles className="w-5 h-5" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </aside>
  );
};

export default ChatPanel;