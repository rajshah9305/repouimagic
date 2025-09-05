import React from 'react';
import type { Agent, StyleDNA, AgentStatus } from '../types';
import { AGENTS } from '../constants';
import { Sparkles, Bookmark, Checkmark, XMark } from './Icons';

interface AgentPanelProps {
  agentStatuses: Record<string, AgentStatus>;
  styleDnaLibrary: StyleDNA[];
  activeStyleDna: StyleDNA | null;
  onSelectDna: (dna: StyleDNA | null) => void;
}

const AGENT_DESCRIPTIONS: Record<string, string> = {
  orchestrator: 'Coordinates the entire AI crew to fulfill your request.',
  architect: 'Structures the UI layout and component hierarchy.',
  curator: 'Designs unique color palettes, fonts, and styles.',
  generator: 'Writes the production-ready HTML and React code.',
  qa: 'Checks for bugs, responsiveness, and accessibility issues.'
}

const LoadingSpinner: React.FC = () => <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>;


const AgentCard: React.FC<{agent: Agent; status: AgentStatus}> = ({ agent, status }) => {
  const Icon = agent.icon;
  const description = AGENT_DESCRIPTIONS[agent.id] || "The specialist for this task.";

  const stateConfig: Record<AgentStatus, {
      ring: string;
      iconBg: string;
      opacity: string;
      statusIndicator: React.ReactNode;
      progressBg: string;
      progressFill: string;
      progressFillColor: string;
  }> = {
    inactive: {
      ring: 'border-[var(--color-border)] hover:border-[var(--color-accent-primary)]',
      iconBg: 'bg-white/5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent-primary)]',
      opacity: 'opacity-60 group-hover:opacity-100',
      statusIndicator: <div className="w-2.5 h-2.5 rounded-full bg-slate-600 group-hover:bg-slate-400" />,
      progressBg: 'bg-white/5',
      progressFill: 'w-0',
      progressFillColor: 'bg-slate-400'
    },
    pending: {
      ring: 'border-[var(--color-border)]',
      iconBg: 'bg-white/5 text-[var(--color-text-secondary)]',
      opacity: 'opacity-40',
      statusIndicator: <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />,
      progressBg: 'bg-white/5',
      progressFill: 'w-0',
      progressFillColor: 'bg-[var(--color-accent-primary)]'
    },
    working: {
      ring: 'border-transparent ring-2 ring-[var(--color-accent-primary)] shadow-[0_0_20px_var(--color-accent-primary-glow)]',
      iconBg: 'bg-[var(--color-accent-primary-glow)] text-[var(--color-accent-primary)]',
      opacity: 'opacity-100',
      statusIndicator: <LoadingSpinner />,
      progressBg: `bg-[var(--color-accent-primary-glow)]`,
      progressFill: 'w-full',
      progressFillColor: 'bg-[var(--color-accent-primary)]'
    },
    completed: {
      ring: 'border-[var(--color-success-border)]',
      iconBg: 'bg-[var(--color-success-bg)] text-[var(--color-success)]',
      opacity: 'opacity-100',
      statusIndicator: <Checkmark className="w-5 h-5 text-[var(--color-success)]" />,
      progressBg: 'bg-[var(--color-success-bg)]',
      progressFill: 'w-full',
      progressFillColor: 'bg-[var(--color-success)]'
    },
    error: {
      ring: 'border-[var(--color-error-border)]',
      iconBg: 'bg-[var(--color-error-bg)] text-[var(--color-error)]',
      opacity: 'opacity-100',
      statusIndicator: <XMark className="w-5 h-5 text-[var(--color-error)]" />,
      progressBg: 'bg-[var(--color-error-bg)]',
      progressFill: 'w-full',
      progressFillColor: 'bg-[var(--color-error)]'
    }
  };
  
  const currentConfig = stateConfig[status];
  
  return (
    <div
      className={`group relative w-full text-left p-4 rounded-xl transition-all duration-300 border ${currentConfig.ring} bg-[var(--color-panel)] ${currentConfig.opacity}`}
    >
      <div className="flex items-center">
        <div className={`absolute top-3.5 right-3.5 flex items-center justify-center w-5 h-5 text-[var(--color-accent-primary)] transition-all duration-300`}>
          {currentConfig.statusIndicator}
        </div>

        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-colors duration-300 ${currentConfig.iconBg}`}>
          <Icon className={`w-6 h-6`} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-sm text-[var(--color-text-primary)]">{agent.name}</h3>
          <p className="text-xs text-[var(--color-text-secondary)]">{description}</p>
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-xl overflow-hidden transition-colors duration-300 ${currentConfig.progressBg}`}>
          <div className={`h-full transition-all duration-700 ease-in-out ${currentConfig.progressFill} ${currentConfig.progressFillColor}`} />
      </div>
    </div>
  );
};


const DnaButton: React.FC<{dna: StyleDNA; isActive: boolean; onClick: () => void}> = ({ dna, isActive, onClick }) => {
  return (
    <div
      className={`flex items-center w-full text-left p-3 rounded-lg text-sm font-medium border ${
        isActive
          ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] bg-[var(--color-accent-primary-glow)]'
          : 'text-[var(--color-text-secondary)] bg-transparent border-transparent'
      }`}
    >
      <Bookmark className={`w-5 h-5 mr-3`} />
      <div className="flex-1 overflow-hidden">
        <span className="font-semibold block truncate text-[var(--color-text-primary)]">{dna.name}</span>
        <span className="text-xs opacity-70 block truncate">{dna.style}</span>
      </div>
    </div>
  );
};

const AgentPanel: React.FC<AgentPanelProps> = ({ agentStatuses, styleDnaLibrary, activeStyleDna, onSelectDna }) => {
  return (
    <aside className="col-span-12 lg:col-span-3 bg-transparent flex flex-col p-4">
       <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[var(--color-accent-primary)]" />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] font-['Space_Grotesk']">
              Magic UI Elite
            </h1>
          </div>
        </div>
      <h2 className="text-base font-['Space_Grotesk'] text-[var(--color-text-primary)] px-2 mt-2 mb-3 font-medium">Agent Crew</h2>
      <ul className="flex flex-col gap-3">
        {AGENTS.map((agent, index) => {
          const status = agentStatuses[agent.id] || 'inactive';
          const prevStatus = index > 0 ? (agentStatuses[AGENTS[index-1].id] || 'inactive') : 'completed';
          const isFlowActive = prevStatus === 'completed' || prevStatus === 'working';

          return (
            <li key={agent.id} className="relative list-none">
              {index > 0 && (
                <div className={`absolute left-[28px] -top-3 h-3 w-px transition-colors duration-500 ${isFlowActive ? 'bg-[var(--color-accent-primary)]' : 'bg-[var(--color-border)]'}`} />
              )}
              <AgentCard
                agent={agent}
                status={status}
              />
            </li>
          )
        })}
      </ul>
      <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
        <h2 className="text-base font-['Space_Grotesk'] text-[var(--color-text-primary)] px-2 mb-3 font-medium">Style DNA Library</h2>
        <div className="flex flex-col gap-2">
          {styleDnaLibrary.length > 0 ? (
            styleDnaLibrary.map((dna) => (
              <DnaButton
                key={dna.id}
                dna={dna}
                isActive={activeStyleDna?.id === dna.id}
                onClick={() => onSelectDna(dna)}
              />
            ))
          ) : (
            <div className="text-xs text-center text-[var(--color-text-secondary)] p-4 bg-[var(--color-panel)] border border-[var(--color-border)] rounded-xl">
              <p>Save styles from generated variants to create your library.</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AgentPanel;