import React from 'react';
import type { Variant, ToastType } from '../types';
import PreviewPanel from './PreviewPanel';
import VariantSelector from './VariantSelector';
import PreviewActions from './PreviewActions';

type AppStatus = 'idle' | 'generating' | 'refining';

interface MainPanelProps {
  status: AppStatus;
  refiningVariantId: string | null;
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelectVariant: (variant: Variant) => void;
  previewCode: string;
  onSaveStyleDna: (variant: Variant, callback: (isNew: boolean) => void) => void;
  onShowToast: (message: string, type?: ToastType) => void;
  onCopyCode: (code: string) => void;
}

const MainPanel: React.FC<MainPanelProps> = ({
  status,
  refiningVariantId,
  variants,
  selectedVariant,
  onSelectVariant,
  previewCode,
  onSaveStyleDna,
  onShowToast,
  onCopyCode,
}) => {
  const isGenerating = status === 'generating';
  const hasVariants = variants.length > 0;

  return (
    <main className="col-span-12 lg:col-span-6 h-full flex flex-col gap-4 min-h-0">
      <div className="flex-grow min-h-0">
        <PreviewPanel previewCode={previewCode} isLoading={isGenerating} />
      </div>
      
      {hasVariants && (
        <>
          {/* FIX: Add PreviewActions to use the action-related props. */}
          {selectedVariant && (
            <PreviewActions
              variant={selectedVariant}
              onSaveStyleDna={() => onSaveStyleDna(selectedVariant, (isNew) => {
                if (isNew) {
                  onShowToast(`"${selectedVariant.name}" saved to Style DNA`, 'success');
                } else {
                  onShowToast(`"${selectedVariant.name}" is already in your library`, 'info');
                }
              })}
              onCopyCode={() => onCopyCode(selectedVariant.code)}
              onShowToast={onShowToast}
            />
          )}
          <div className="flex-shrink-0 glowing-panel rounded-2xl p-4">
            {/* FIX: Removed props not accepted by VariantSelector (onSaveStyleDna, onShowToast, onCopyCode). */}
            <VariantSelector
              variants={variants}
              selectedVariant={selectedVariant}
              onSelectVariant={onSelectVariant}
              status={status}
              refiningVariantId={refiningVariantId}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default MainPanel;
