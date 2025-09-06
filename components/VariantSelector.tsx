import React from 'react';
import type { Variant } from '../types';

type AppStatus = 'idle' | 'generating' | 'refining';

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelectVariant: (variant: Variant) => void;
  status: AppStatus;
  refiningVariantId: string | null;
}

const VariantCard: React.FC<{
  variant: Variant;
  isSelected: boolean;
  isRefining: boolean;
  onClick: () => void;
}> = ({ variant, isSelected, isRefining, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative h-32 bg-[var(--color-panel-solid)] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group ${
        isSelected 
          ? 'border-transparent shadow-2xl shadow-[var(--color-accent-primary-glow)] chasing-border-card' 
          : 'border-[var(--color-border)] hover:border-[var(--color-border-heavy)] hover:transform hover:-translate-y-1 hover:shadow-lg'
      }`}
    >
      <iframe
        srcDoc={variant.preview}
        title={variant.name}
        className="absolute inset-0 w-full h-full border-0 pointer-events-none transform scale-[1.01] group-hover:scale-[1.05] transition-transform duration-300"
        scrolling="no"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
      
      {isRefining && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center transition-opacity duration-300">
           <div className="w-6 h-6 border-2 border-[var(--color-accent-primary-glow)] border-t-[var(--color-accent-primary)] rounded-full animate-spin"></div>
        </div>
      )}

      <div className={`absolute bottom-0 left-0 right-0 p-2 transition-opacity ${isRefining ? 'opacity-0' : 'opacity-100'}`}>
        <h3 className="font-semibold text-white text-xs truncate drop-shadow">{variant.name}</h3>
      </div>
    </div>
  );
};

const VariantSelector: React.FC<VariantSelectorProps> = ({ variants, selectedVariant, onSelectVariant, status, refiningVariantId }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {variants.map(variant => (
        <VariantCard
          key={variant.id}
          variant={variant}
          isSelected={selectedVariant?.id === variant.id}
          isRefining={status === 'refining' && refiningVariantId === variant.id}
          onClick={() => onSelectVariant(variant)}
        />
      ))}
    </div>
  );
};

export default VariantSelector;
