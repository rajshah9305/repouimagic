import React from 'react';
import { Sparkles, Settings } from './Icons';

interface HeaderProps {
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="flex-shrink-0 w-full bg-black/20 border-b border-[var(--color-border)]">
      <div className="flex items-center justify-between h-14 px-4 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-[var(--color-accent-primary)]" />
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-text-secondary)] font-['Space_Grotesk']">
              Magic UI Elite
            </h1>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={onSettingsClick} className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/10 transition-colors" aria-label="Open settings">
            <Settings className="w-5 h-5" />
           </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
