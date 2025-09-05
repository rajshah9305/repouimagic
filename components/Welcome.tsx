import React from 'react';
import { Sparkles } from './Icons';

const Welcome: React.FC = () => {
    return (
        <div className="flex-grow glass-panel rounded-2xl flex flex-col items-center justify-center text-center p-8 h-full">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[var(--color-accent-primary-glow)] border border-[var(--color-accent-primary)]/20 mb-6">
                <Sparkles className="w-12 h-12 text-[var(--color-accent-primary)]" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 font-['Space_Grotesk']">
              Magic UI Elite
            </h1>
            <p className="text-[var(--color-text-secondary)] mt-2 max-w-md">
                Welcome to the future of UI creation. Describe the interface you envision in the console, and let our AI agents bring it to life.
            </p>
        </div>
    )
}

export default Welcome;