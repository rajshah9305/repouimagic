import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, Variant, StyleDNA } from '../types';
import { AgentRole } from '../types';
import { Send, Sparkles, Bookmark } from './Icons';

interface ConsoleProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onGenerate: (prompt: string, moods: string[]) => void;
  isLoading: boolean;
  hasVariants: boolean;
  selectedVariant: Variant | null;
  styleDnaLibrary: StyleDNA[];
  activeStyleDna: StyleDNA | null;
  onSelectDna: (dna: StyleDNA | null) => void;
}

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === AgentRole.User;
  const isSystem = message.role === AgentRole.System;
  
  if (isSystem) {
    return (
      <div className="w-full flex justify-center my-4">
        <div className="max-w-[85%] px-3 py-2 text-center text-sm text-[var(--color-text-secondary)]">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] p-3 rounded-xl border ${isUser ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
         {!isUser && <div className="text-xs font-semibold text-[var(--color-accent-primary)] mb-1">{message.role}</div>}
        <p className="text-sm whitespace-pre-wrap text-[var(--color-text-primary)] leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
};

const DnaButton: React.FC<{dna: StyleDNA; isActive: boolean; onClick: () => void}> = ({ dna, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full text-left p-3 rounded-lg text-sm font-medium border transition-all ${
        isActive
          ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] bg-[var(--color-accent-primary-glow)]'
          : 'text-[var(--color-text-secondary)] bg-transparent border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <Bookmark className={`w-5 h-5 mr-3 flex-shrink-0`} />
      <div className="flex-1 overflow-hidden">
        <span className="font-semibold block truncate text-[var(--color-text-primary)]">{dna.name}</span>
        <span className="text-xs opacity-70 block truncate">{dna.style}</span>
      </div>
    </button>
  );
};


const moods = ['Futuristic', 'Minimal', 'Playful', 'Professional', 'Dark', 'Cyberpunk', 'Glassmorphism', 'Brutalist'];

const Console: React.FC<ConsoleProps> = ({ messages, onSendMessage, onGenerate, isLoading, hasVariants, selectedVariant, styleDnaLibrary, activeStyleDna, onSelectDna }) => {
  const [input, setInput] = useState('');
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
     const container = messagesContainerRef.current;
      if (container) {
        // Simple scroll to bottom on new message
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    <aside className="col-span-12 lg:col-span-4 h-full glowing-panel rounded-2xl p-4 flex flex-col">
      <h2 className="text-lg font-['Space_Grotesk'] text-[var(--color-text-primary)] mb-4 p-2 flex-shrink-0">Console</h2>
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
         <div className="flex flex-col gap-2 mb-4">
            <h3 className="text-sm font-['Space_Grotesk'] text-[var(--color-text-primary)] px-2 mb-2 font-medium">Style DNA</h3>
            {styleDnaLibrary.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                    {styleDnaLibrary.map((dna) => (
                      <DnaButton
                        key={dna.id}
                        dna={dna}
                        isActive={activeStyleDna?.id === dna.id}
                        onClick={() => onSelectDna(dna)}
                      />
                    ))}
                </div>
            ) : (
                <div className="text-xs text-center text-[var(--color-text-secondary)] p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p>Save styles from generated variants to build your DNA library.</p>
                </div>
            )}
        </div>

        {isGenerationMode && (
          <div className="flex flex-wrap gap-2 mb-4">
              {moods.map(mood => (
                <button
                  key={mood}
                  onClick={() => toggleMood(mood)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    selectedMoods.includes(mood) 
                      ? 'bg-[var(--color-accent-primary-glow)] border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]' 
                      : 'bg-white border-[var(--color-border)] hover:border-gray-300 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {mood}
                </button>
              ))}
          </div>
        )}
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholderText}
            disabled={isLoading || (!isGenerationMode && !selectedVariant)}
            className="flex-grow bg-white border border-[var(--color-border)] rounded-xl py-2.5 px-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-all disabled:opacity-50"
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

export default Console;
