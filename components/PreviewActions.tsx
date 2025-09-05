import React, { useState } from 'react';
import type { Variant, ToastType } from '../types';
import { Download, Code, Copy, Bookmark, Checkmark } from './Icons';

interface PreviewActionsProps {
  variant: Variant;
  onSaveStyleDna: () => void;
  onCopyCode: () => void;
  onShowToast: (message: string, type?: ToastType) => void;
}

const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isBusy?: boolean;
}> = ({ icon, label, onClick, isBusy }) => (
  <button
    onClick={onClick}
    disabled={isBusy}
    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--color-text-secondary)] bg-white/5 rounded-lg border border-transparent hover:bg-white/10 hover:text-[var(--color-text-primary)] transition-all disabled:opacity-50 hover:transform hover:-translate-y-0.5 active:translate-y-0"
  >
    {icon}
    {label}
  </button>
);

const PreviewActions: React.FC<PreviewActionsProps> = ({ variant, onSaveStyleDna, onCopyCode, onShowToast }) => {
    const [isCodeVisible, setIsCodeVisible] = useState(false);
    const [justCopied, setJustCopied] = useState(false);

    const handleCopy = () => {
        onCopyCode();
        setJustCopied(true);
        setTimeout(() => setJustCopied(false), 2000);
    }
    
    return (
        <div className="flex-shrink-0 glass-panel rounded-2xl p-2 transition-all duration-300">
            <div className="flex items-center justify-between gap-2">
                <div className="flex-grow pl-3">
                    <h3 className="font-bold text-base text-[var(--color-text-primary)] font-['Space_Grotesk']">{variant.name}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">{variant.style}</p>
                </div>
                <div className="flex items-center gap-1 p-1 bg-black/10 rounded-xl border border-white/5">
                   <ActionButton icon={<Bookmark className="w-4 h-4" />} label="Save DNA" onClick={onSaveStyleDna} />
                   <ActionButton icon={<Download className="w-4 h-4" />} label="Export" onClick={() => onShowToast('Export functionality coming soon!', 'info')} />
                   <ActionButton icon={<Code className="w-4 h-4" />} label={isCodeVisible ? 'Hide Code' : 'View Code'} onClick={() => setIsCodeVisible(!isCodeVisible)} />
                   <ActionButton 
                        icon={justCopied ? <Checkmark className="w-4 h-4 text-[var(--color-success)]"/> : <Copy className="w-4 h-4" />} 
                        label={justCopied ? 'Copied!' : 'Copy Code'} 
                        onClick={handleCopy} 
                    />
                </div>
            </div>
            <div className={`transition-all duration-500 ease-in-out grid ${isCodeVisible ? 'grid-rows-[1fr] mt-2 pt-2 border-t border-[var(--color-border)]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <pre className="bg-black/50 p-4 text-sm text-[var(--color-accent-primary-text)] rounded-lg overflow-auto max-h-48 chat-scrollbar font-['JetBrains_Mono'] border border-[var(--color-border)]">
                    <code>{variant.code}</code>
                </pre>
              </div>
            </div>
        </div>
    );
}

export default PreviewActions;