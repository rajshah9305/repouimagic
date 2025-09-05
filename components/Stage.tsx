import React from 'react';
import type { Variant, ToastType, AgentStatus } from '../types';
import PreviewPanel from './PreviewPanel';
import VariantSelector from './VariantSelector';
import Welcome from './Welcome';
import PreviewActions from './PreviewActions';
import AgentWorkflow from './AgentWorkflow';

type AppStatus = 'idle' | 'generating' | 'refining';

interface StageProps {
  status: AppStatus;
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelectVariant: (variant: Variant) => void;
  previewCode: string;
  refiningVariantId: string | null;
  onSaveStyleDna: (variant: Variant, callback: (isNew: boolean) => void) => void;
  onShowToast: (message: string, type?: ToastType) => void;
  onCopyCode: (code: string) => void;
  agentStatuses: Record<string, AgentStatus>;
}

const Stage: React.FC<StageProps> = ({
  status,
  variants,
  selectedVariant,
  onSelectVariant,
  previewCode,
  refiningVariantId,
  onSaveStyleDna,
  onShowToast,
  onCopyCode,
  agentStatuses
}) => {
  const isGenerating = status === 'generating' || status === 'refining';
  const hasVariants = variants.length > 0;

  const renderContent = () => {
    if (!hasVariants && !isGenerating) {
      return <Welcome />;
    }
  
    if (isGenerating) {
        return <AgentWorkflow agentStatuses={agentStatuses} status={status} />
    }
  
    return (
      <>
        <div className="flex-grow min-h-0 rounded-2xl overflow-hidden">
          <PreviewPanel previewCode={previewCode} isLoading={isGenerating} />
        </div>
        
        {hasVariants && (
          <>
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
  
            <div className="flex-shrink-0 glass-panel rounded-2xl p-3">
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
      </>
    );
  }

  return (
    <main 
      key={`${status}-${hasVariants}`}
      className="h-full flex flex-col gap-4 min-h-0"
      style={{ animation: 'fade-in-scale-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {renderContent()}
    </main>
  )
};

export default Stage;