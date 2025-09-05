import React from 'react';
import { Sparkles } from './Icons';

const Welcome: React.FC = () => {
    return (
        <div className="flex-grow glass-panel rounded-2xl flex flex-col items-center justify-center text-center p-8 h-full">
            <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-[var(--color-accent-primary-glow)] border border-[var(--color-accent-primary)]/20 rounded-full animate-pulse"></div>
              <Sparkles className="relative w-12 h-12 text-[var(--color-accent-primary)]" />
            </div>
            <h1 
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-text-secondary)] font-['Space_Grotesk']"
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 4s infinite linear'
                }}
            >
              Magic UI Elite
            </h1>
            <p className="text-[var(--color-text-secondary)] mt-2 max-w-md">
                Welcome to the future of UI creation. Describe the interface you envision in the console, and let our AI agents bring it to life.
            </p>
        </div>
    )
}

export default Welcome;