import React from 'react';
import type { Variant, ToastType, AgentStatus } from '../types';
import PreviewPanel from './PreviewPanel';
import VariantSelector from './VariantSelector';
import AgentWorkflow from './AgentWorkflow';
import Welcome from './Welcome';

type AppStatus = 'idle' | 'generating' | 'refining';

interface StageProps {
  status: AppStatus;
  agentStatuses: Record<string, AgentStatus>;
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelectVariant: (variant: Variant) => void;
  previewCode: string;
  refiningVariantId: string | null;
  onSaveStyleDna: (variant: Variant, callback: (isNew: boolean) => void) => void;
  onShowToast: (message: string, type?: ToastType) => void;
  onCopyCode: (code: string) => void;
}

const Stage: React.FC<StageProps> = ({
  status,
  agentStatuses,
  variants,
  selectedVariant,
  onSelectVariant,
  previewCode,
  refiningVariantId,
  onSaveStyleDna,
  onShowToast,
  onCopyCode,
}) => {
  const isGenerating = status === 'generating' || status === 'refining';
  const hasVariants = variants.length > 0;

  return (
    <main className="col-span-12 lg:col-span-8 h-full flex flex-col gap-4 min-h-0">
      {isGenerating ? (
        <AgentWorkflow agentStatuses={agentStatuses} status={status} />
      ) : hasVariants ? (
        <>
          <div className="flex-grow min-h-0">
            <PreviewPanel previewCode={previewCode} isLoading={false} />
          </div>
          <div className="flex-shrink-0 glowing-panel rounded-2xl p-4">
            <VariantSelector
              variants={variants}
              selectedVariant={selectedVariant}
              onSelectVariant={onSelectVariant}
              status={status}
              refiningVariantId={refiningVariantId}
              onSaveStyleDna={onSaveStyleDna}
              onShowToast={onShowToast}
              onCopyCode={onCopyCode}
            />
          </div>
        </>
      ) : (
        <Welcome />
      )}
    </main>
  );
};

export default Stage;
