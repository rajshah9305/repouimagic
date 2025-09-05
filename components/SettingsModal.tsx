import React from 'react';
import { CloseIcon } from './Icons';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div 
        className="glass-panel rounded-2xl w-full max-w-md m-4 p-6 text-[var(--color-text-primary)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="settings-title" className="text-xl font-bold font-['Space_Grotesk']">
            Settings
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-[var(--color-text-secondary)] hover:bg-white/10 hover:text-[var(--color-text-primary)]"
            aria-label="Close settings"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">API Key Configuration</h3>
          <div className="bg-white/5 border border-[var(--color-border)] rounded-lg p-4 text-sm">
            <p className="text-[var(--color-text-secondary)]">
              For security and to comply with platform guidelines, your Gemini API key is managed via an environment variable.
            </p>
            <p className="mt-3">
              Please configure your key as <code className="bg-black/30 text-slate-300 px-1.5 py-0.5 rounded-md text-xs font-['JetBrains_Mono']">process.env.API_KEY</code> in your deployment environment.
            </p>
            <p className="text-[var(--color-text-secondary)] mt-3">
              It cannot be changed through this user interface.
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-right">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-[var(--color-accent-primary)] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;