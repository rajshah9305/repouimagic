import React from 'react';

interface PreviewPanelProps {
  previewCode: string;
  isLoading: boolean; // Retained for potential future use, but loading is now handled by AgentWorkflow overlay
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ previewCode, isLoading }) => {
  // Loading state is now a full-screen overlay (AgentWorkflow) handled by the parent Stage component.
  // This component can now focus solely on displaying the iframe.
  return (
    <div className="w-full h-full bg-[var(--color-bg-dark)]">
      <iframe
        srcDoc={previewCode}
        title="Live Preview"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
        style={{ animation: 'fade-in 0.5s' }}
      />
    </div>
  );
};

export default PreviewPanel;
