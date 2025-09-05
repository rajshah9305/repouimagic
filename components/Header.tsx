import React from 'react';
import { Sparkles, Settings } from './Icons';

interface HeaderProps {
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="flex-shrink-0 w-full bg-[var(--color-header-bg)] border-b border-[var(--color-border)] shadow-sm shadow-[var(--color-accent-primary-glow)]">
      <div className="flex items-center justify-between h-14 px-4 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[var(--color-accent-primary)]" />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] font-['Space_Grotesk']">
              Magic UI Elite
            </h1>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={onSettingsClick} className="p-2 rounded-md text-gray-500 hover:text-[var(--color-text-primary)] hover:bg-gray-100 transition-colors" aria-label="Open settings">
            <Settings className="w-5 h-5" />
           </button>
        </div>
      </div>
    </header>
  );
};

export default Header;