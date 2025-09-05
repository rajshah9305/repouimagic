import React from 'react';

interface PreviewPanelProps {
  previewCode: string;
  isLoading: boolean;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ previewCode, isLoading }) => {
  return (
    <div className="flex-grow bg-[var(--color-bg)] rounded-2xl overflow-hidden relative glowing-panel">
      {isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-center text-[var(--color-text-secondary)]">
          <div className="w-8 h-8 border-4 border-[var(--color-accent-primary-glow)] border-t-[var(--color-accent-primary)] rounded-full animate-spin mb-4"></div>
          <p className="font-semibold text-[var(--color-text-primary)]">Crew is assembling your UI...</p>
          <p className="text-sm">This can take up to 30 seconds.</p>
        </div>
      ) : (
         <iframe
          srcDoc={previewCode}
          title="Live Preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
        />
      )}
    </div>
  );
};

export default PreviewPanel;