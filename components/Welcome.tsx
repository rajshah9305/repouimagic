import React from 'react';
import { Sparkles } from './Icons';

const Welcome: React.FC = () => {
    return (
        <div className="flex-grow bg-[var(--color-bg)] rounded-2xl glowing-panel flex flex-col items-center justify-center text-center p-8">
            <Sparkles className="w-16 h-16 text-[var(--color-accent-primary)] mb-4" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] font-['Space_Grotesk']">
              Magic UI Elite
            </h1>
            <p className="text-[var(--color-text-secondary)] mt-2 max-w-md">
                Welcome to the future of UI creation. Describe the interface you envision in the console, and let our AI agents bring it to life.
            </p>
        </div>
    )
}

export default Welcome;
