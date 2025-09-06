import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, Variant, StyleDNA } from '../types';
import type { ConsoleTab } from '../App';
import { AgentRole } from '../types';
import { Send, Sparkles, Settings, Code, Bookmark, Checkmark, XMark, Palette } from './Icons';

interface ConsoleProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onGenerate: (prompt: string, moods: string[], appliedDna: StyleDNA | null) => void;
  isLoading: boolean;
  hasVariants: boolean;
  selectedVariant: Variant | null;
  activeTab: ConsoleTab;
  onTabChange: (tab: ConsoleTab) => void;
  styleDnaLibrary: StyleDNA[];
  activeStyleDna: StyleDNA | null;
  onApplyDna: (dna: StyleDNA) => void;
  onClearDna: () => void;
}

const TabButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
        {icon}
        {label}
        {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent-primary)] rounded-full" style={{ animation: 'fade-in 0.3s' }} />}
    </button>
);


const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === AgentRole.User;
  const isSystem = message.role === AgentRole.System;
  
  if (isSystem) {
    return (
      <div className="w-full flex justify-center my-2" style={{ animation: 'fade-in 0.3s ease-out' }}>
        <div className="max-w-[90%] px-3 py-2 text-center text-xs text-[var(--color-text-tertiary)] bg-white/5 rounded-full">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`} style={{ animation: 'slide-in-from-bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <div className={`max-w-[85%] px-3.5 py-2.5 rounded-xl border ${isUser ? 'bg-[var(--color-accent-primary-glow)] border-[var(--color-accent-primary)]/30' : 'bg-white/5 border-white/10'}`}>
         {!isUser && <div className="text-xs font-semibold text-[var(--color-accent-primary)] mb-1">{message.role}</div>}
        <p className="text-sm whitespace-pre-wrap text-[var(--color-text-primary)] leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
};

const moods = ['Futuristic', 'Minimal', 'Playful', 'Professional', 'Dark', 'Cyberpunk', 'Glassmorphism', 'Brutalist'];

const BriefingView: React.FC<{
    onGenerate: (prompt: string, moods: string[], appliedDna: StyleDNA | null) => void;
    isLoading: boolean;
    activeStyleDna: StyleDNA | null;
    onClearDna: () => void;
}> = ({ onGenerate, isLoading, activeStyleDna, onClearDna }) => {
    const [input, setInput] = useState('');
    const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onGenerate(input, selectedMoods, activeStyleDna);
            setInput('');
        }
    };

    const toggleMood = (mood: string) => {
        setSelectedMoods(prev => prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]);
    };
    
    const canSubmit = !isLoading && input.trim();

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto pr-2 -mr-3 chat-scrollbar">
                <h3 className="text-base font-medium text-[var(--color-text-primary)] font-['Space_Grotesk'] px-1 mb-3">Briefing Document</h3>
                 <div className="flex flex-wrap gap-2 mb-4">
                    {moods.map(mood => (
                      <button type="button" key={mood} onClick={() => toggleMood(mood)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all duration-200 hover:transform hover:scale-105 active:scale-95 ${
                          selectedMoods.includes(mood) 
                            ? 'bg-[var(--color-accent-primary-glow)] border-[var(--color-accent-primary)]/50 text-[var(--color-accent-primary)]' 
                            : 'bg-white/5 border-transparent hover:border-white/20 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                        }`}
                      >{mood}</button>
                    ))}
                </div>
                {activeStyleDna && (
                     <div className="mb-4 p-2.5 rounded-lg border border-[var(--color-accent-secondary)]/30 bg-[var(--color-accent-secondary-glow)] text-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xs text-[var(--color-accent-secondary)] opacity-80">APPLIED DNA</span>
                                <p className="font-semibold text-[var(--color-text-primary)]">{activeStyleDna.name}</p>
                            </div>
                            <button onClick={onClearDna} className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10">
                                <XMark className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex-shrink-0 mt-3 pt-3 border-t border-[var(--color-border)]">
                <form onSubmit={handleSubmit} className="flex items-center gap-3 p-1 rounded-xl bg-black/20 border border-transparent transition-all duration-300 input-glow-ring">
                    <textarea
                        value={input} onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your UI vision..."
                        disabled={isLoading}
                        rows={3}
                        className="flex-grow bg-transparent border-none rounded-xl py-2.5 px-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:ring-0 focus:outline-none transition-all disabled:opacity-50 text-sm resize-none chat-scrollbar"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />
                    <button
                      type="submit" disabled={!canSubmit}
                      className="self-end flex-shrink-0 text-white bg-[var(--color-accent-primary)] rounded-lg p-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all shadow-[0_4px_14px_0_var(--color-accent-primary-glow)]"
                    >
                      <Sparkles className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

const ChatView: React.FC<{
    messages: ChatMessage[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    selectedVariant: Variant | null;
}> = ({ messages, onSendMessage, isLoading, selectedVariant }) => {
    const [input, setInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading && selectedVariant) {
            onSendMessage(input);
            setInput('');
        }
    };
    
    const placeholderText = selectedVariant ? `Refine "${selectedVariant.name}"...` : 'Select a variant to chat';
    const canSubmit = !isLoading && selectedVariant && input.trim();

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto space-y-4 pr-3 -mr-3 chat-scrollbar">
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
            <div className="flex-shrink-0 mt-3 pt-3 border-t border-[var(--color-border)]">
                <form onSubmit={handleSubmit} className="flex items-center gap-3 p-1 rounded-xl bg-black/20 border border-transparent transition-all duration-300 input-glow-ring">
                    <input
                        type="text" value={input} onChange={(e) => setInput(e.target.value)}
                        placeholder={placeholderText}
                        disabled={isLoading || !selectedVariant}
                        className="flex-grow bg-transparent border-none rounded-xl py-2.5 px-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:ring-0 focus:outline-none transition-all disabled:opacity-50 text-sm"
                    />
                    <button
                        type="submit" disabled={!canSubmit}
                        className="flex-shrink-0 text-white bg-[var(--color-accent-primary)] rounded-xl p-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all shadow-[0_4px_14px_0_var(--color-accent-primary-glow)]"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

const DnaView: React.FC<{ library: StyleDNA[]; onApplyDna: (dna: StyleDNA) => void; }> = ({ library, onApplyDna }) => {
    return (
        <div className="flex flex-col h-full">
            <h3 className="text-base font-medium text-[var(--color-text-primary)] font-['Space_Grotesk'] px-1 mb-3 flex-shrink-0">Style DNA Library</h3>
            <div className="flex-grow overflow-y-auto pr-2 -mr-3 space-y-2 chat-scrollbar">
                {library.length > 0 ? (
                    library.map(dna => (
                        <div key={dna.id} className="group relative bg-white/5 border border-transparent hover:border-[var(--color-border)] p-2.5 rounded-lg transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-12 rounded-md overflow-hidden flex-shrink-0 bg-black/20 border border-white/10">
                                     <iframe srcDoc={dna.preview} title={dna.name} scrolling="no" className="w-full h-full transform scale-[0.5] origin-top-left pointer-events-none" />
                                </div>
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-semibold text-sm truncate text-[var(--color-text-primary)]">{dna.name}</p>
                                    <p className="text-xs truncate text-[var(--color-text-secondary)]">{dna.style}</p>
                                </div>
                            </div>
                            <button onClick={() => onApplyDna(dna)} className="absolute top-2 right-2 px-2.5 py-1 text-xs font-semibold bg-[var(--color-accent-primary)] text-white rounded-md opacity-0 group-hover:opacity-100 hover:opacity-80 transition-opacity active:scale-95">
                                Apply
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-[var(--color-text-secondary)] p-4">
                        <Palette className="w-10 h-10 mb-3 opacity-50"/>
                        <p className="font-semibold text-sm text-white/90">Your library is empty</p>
                        <p className="text-xs">Save styles from generated variants to reuse them later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};


const Console: React.FC<ConsoleProps> = (props) => {
    const { onSendMessage, onGenerate, isLoading, messages, selectedVariant, hasVariants, activeTab, onTabChange } = props;
    
    useEffect(() => {
        if (hasVariants && activeTab === 'briefing') {
            onTabChange('chat');
        } else if (!hasVariants && activeTab === 'chat') {
            onTabChange('briefing');
        }
    }, [hasVariants, activeTab, onTabChange]);


    return (
        <div className="h-full glass-panel rounded-2xl p-4 flex flex-col min-h-0">
            <div className="flex-shrink-0 border-b border-[var(--color-border)] mb-3">
                <div className="flex items-center">
                    <TabButton icon={<Sparkles className="w-5 h-5"/>} label="Briefing" isActive={activeTab === 'briefing'} onClick={() => onTabChange('briefing')} />
                    <TabButton icon={<Code className="w-5 h-5"/>} label="Agent Chat" isActive={activeTab === 'chat'} onClick={() => onTabChange('chat')} />
                    <TabButton icon={<Bookmark className="w-5 h-5"/>} label="Style DNA" isActive={activeTab === 'dna'} onClick={() => onTabChange('dna')} />
                </div>
            </div>
            
            <div className="flex flex-col min-h-0 flex-grow">
                 {activeTab === 'briefing' && <BriefingView onGenerate={onGenerate} isLoading={isLoading} activeStyleDna={props.activeStyleDna} onClearDna={props.onClearDna} />}
                 {activeTab === 'chat' && <ChatView messages={messages} onSendMessage={onSendMessage} isLoading={isLoading} selectedVariant={selectedVariant} />}
                 {activeTab === 'dna' && <DnaView library={props.styleDnaLibrary} onApplyDna={props.onApplyDna} />}
            </div>
        </div>
    );
};

export default Console;
