import React, { useState, useEffect } from 'react';
import { CloseIcon } from './Icons';

export type ToastType = 'success' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onDismiss: () => void;
}

const toastConfig = {
  success: {
    bgColor: 'bg-[var(--color-success-glow)]',
    borderColor: 'border-[var(--color-success-border)]',
    textColor: 'text-[var(--color-success)]',
  },
  info: {
    bgColor: 'bg-sky-100',
    borderColor: 'border-sky-300',
    textColor: 'text-sky-700',
  }
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animate in
    setIsVisible(true);

    // Set timeout to animate out and then call dismiss
    const timer = setTimeout(() => {
       setIsVisible(false);
       setTimeout(onDismiss, 300); // Wait for animation to finish before removing
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onDismiss]);
  
  const config = toastConfig[type];

  return (
    <div
      className={`fixed bottom-5 right-5 max-w-sm w-full p-4 rounded-xl border ${config.borderColor} ${config.bgColor} shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <p className={`text-sm font-medium ${config.textColor}`}>
          {message}
        </p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onDismiss, 300);
          }}
          className={`ml-4 p-1 rounded-md ${config.textColor} opacity-70 hover:opacity-100 hover:bg-black/10 transition-colors`}
          aria-label="Dismiss"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;