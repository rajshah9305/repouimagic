import React, { useState } from 'react';
import type { Variant, ToastType } from '../types';
import { Download, Code, Copy, Bookmark } from './Icons';

type AppStatus = 'idle' | 'generating' | 'refining';

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelectVariant: (variant: Variant) => void;
  status: AppStatus;
  refiningVariantId: string | null;
  onSaveStyleDna: (variant: Variant, callback: (isNew: boolean) => void) => void;
  onShowToast: (message: string, type?: ToastType) => void;
  onCopyCode: (code: string) => void;
}

const VariantCard: React.FC<{
  variant: Variant;
  isSelected: boolean;
  isRefining: boolean;
  onClick: () => void;
  onSaveStyle: () => void;
  onCopyCode: () => void;
  isCodeVisible: boolean;
  onToggleCode: () => void;
  isBusy: boolean;
}> = ({ variant, isSelected, isRefining, onClick, onSaveStyle, onCopyCode, isCodeVisible, onToggleCode, isBusy }) => {
  return (
    <div>
      <div
        onClick={onClick}
        className={`relative h-40 bg-gray-50 border rounded-t-2xl overflow-hidden cursor-pointer transition-all duration-300 group ${
          isSelected 
            ? 'border-transparent ring-2 ring-offset-2 ring-offset-[var(--color-panel)] ring-[var(--color-accent-primary)] shadow-[0_0_25px_-5px_var(--color-accent-primary-glow)]' 
            : 'border-[var(--color-border)] hover:border-gray-400'
        } ${isCodeVisible ? 'border-b-0 rounded-b-none' : 'rounded-b-2xl'}`}
      >
        <iframe
          srcDoc={variant.preview}
          title={variant.name}
          className="absolute inset-0 w-full h-full border-0 pointer-events-none transform scale-[1.02] group-hover:scale-[1.05] transition-transform duration-300"
          scrolling="no"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        
        {isRefining && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center transition-opacity duration-300">
             <div className="w-6 h-6 border-2 border-[var(--color-accent-primary-glow)] border-t-[var(--color-accent-primary)] rounded-full animate-spin"></div>
             <span className="text-xs mt-2 font-medium text-[var(--color-accent-primary)]">Refining...</span>
          </div>
        )}

        <div className={`relative z-10 flex flex-col justify-between h-full p-3 transition-opacity ${isRefining ? 'opacity-0' : 'opacity-100'}`}>
          <div className="self-end px-2 py-0.5 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-white/90 text-xs font-mono">
            {Math.round(variant.novelty * 100)}%
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm drop-shadow-sm">{variant.name}</h3>
            <p className="text-xs text-white/90 drop-shadow-sm">{variant.style}</p>
          </div>
        </div>
      </div>
      {/* Action Bar */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden transition-all bg-[var(--color-border)] ${isSelected ? `border-x border-b border-[var(--color-accent-primary)] ${isCodeVisible ? 'rounded-b-none' : 'rounded-b-2xl'}` : `border-x border-b border-[var(--color-border)] rounded-b-2xl`}`}>
         <button onClick={() => {}} disabled={isBusy} className="p-3 bg-[var(--color-panel)] hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] disabled:opacity-50 disabled:cursor-not-allowed"><Download className="w-4 h-4" />Export</button>
         <button onClick={onToggleCode} disabled={isBusy} className={`p-3 bg-[var(--color-panel)] hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed ${isCodeVisible ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}><Code className="w-4 h-4" />{isCodeVisible ? 'Hide' : 'Code'}</button>
         <button onClick={onCopyCode} disabled={!variant.code || isBusy} className="p-3 bg-[var(--color-panel)] hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] disabled:opacity-50 disabled:cursor-not-allowed"><Copy className="w-4 h-4" />Copy</button>
         <button onClick={onSaveStyle} disabled={isBusy} className="p-3 bg-[var(--color-panel)] hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] disabled:opacity-50 disabled:cursor-not-allowed"><Bookmark className="w-4 h-4" />Save</button>
      </div>
      {/* Code Viewer */}
      {isCodeVisible && isSelected && (
        <div className={`border-x border-b rounded-b-2xl overflow-hidden transition-all border-[var(--color-accent-primary)]`}>
          <pre className="bg-gray-900 p-4 text-xs text-sky-300 overflow-auto max-h-48 chat-scrollbar font-['JetBrains_Mono']">
            <code>{variant.code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

const VariantSelector: React.FC<VariantSelectorProps> = ({ variants, selectedVariant, onSelectVariant, status, refiningVariantId, onSaveStyleDna, onShowToast, onCopyCode }) => {
  const [codeVisibleVariantId, setCodeVisibleVariantId] = useState<string | null>(null);

  const toggleCodeVisibility = (variantId: string) => {
    setCodeVisibleVariantId(prevId => (prevId === variantId ? null : variantId));
  };
  
  const handleSaveDnaClick = (variant: Variant) => {
    onSaveStyleDna(variant, (isNew) => {
      if (isNew) {
        onShowToast(`"${variant.name}" saved to Style DNA`, 'success');
      } else {
        onShowToast(`"${variant.name}" is already in your library`, 'info');
      }
    });
  };
  
  const isBusy = status === 'generating' || status === 'refining';

  return (
    <div>
      <h3 className="text-md font-semibold mb-3 font-['Space_Grotesk'] text-[var(--color-text-primary)] px-1">Variants</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {variants.map(variant => (
          <VariantCard
            key={variant.id}
            variant={variant}
            isSelected={selectedVariant?.id === variant.id}
            isRefining={status === 'refining' && refiningVariantId === variant.id}
            onClick={() => onSelectVariant(variant)}
            onSaveStyle={() => handleSaveDnaClick(variant)}
            onCopyCode={() => onCopyCode(variant.code)}
            isCodeVisible={codeVisibleVariantId === variant.id}
            onToggleCode={() => toggleCodeVisibility(variant.id)}
            isBusy={isBusy}
          />
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;