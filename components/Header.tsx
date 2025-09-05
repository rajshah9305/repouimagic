import React from 'react';
import { Sparkles, Refresh, Settings } from './Icons';

const Header: React.FC = () => {

  const handleRefresh = () => {
    window.location.reload();
  };
  
  return (
    <header className="flex-shrink-0 w-full bg-[var(--color-header-bg)] border-b border-[var(--color-border)]">
      <div className="flex items-center justify-between h-14 px-4 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-2">
          {/* Logo can be placed here */}
        </div>
        <div className="flex items-center gap-2">
           <button onClick={handleRefresh} className="p-2 rounded-md text-gray-500 hover:text-[var(--color-text-primary)] hover:bg-gray-100 transition-colors">
            <Refresh className="w-5 h-5" />
           </button>
           <button className="p-2 rounded-md text-gray-500 hover:text-[var(--color-text-primary)] hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5" />
           </button>
        </div>
      </div>
    </header>
  );
};

export default Header;