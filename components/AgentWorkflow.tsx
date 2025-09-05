import React from 'react';
import type { Agent, AgentStatus } from '../types';
import { AGENTS } from '../constants';
import { Checkmark, XMark, OrchestratorPreview, ArchitectPreview, CuratorPreview, GeneratorPreview, QAPreview } from './Icons';

interface AgentWorkflowProps {
  agentStatuses: Record<string, AgentStatus>;
  status: 'generating' | 'refining';
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
      ring: 'border-[var(--color-border)]',
      iconBg: 'bg-gray-100 text-[var(--color-text-secondary)]',
      opacity: 'opacity-40',
      statusIndicator: <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />,
      progressBg: 'bg-gray-200',
      progressFill: 'w-0',
      progressFillColor: 'bg-gray-400'
    },
    pending: {
      ring: 'border-gray-300',
      iconBg: 'bg-gray-100 text-[var(--color-text-secondary)]',
      opacity: 'opacity-60',
      statusIndicator: <div className="w-2.5 h-2.5 rounded-full bg-gray-400 animate-pulse" />,
      progressBg: 'bg-gray-200',
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
      ring: 'border-green-300',
      iconBg: 'bg-green-100 text-[var(--color-success)]',
      opacity: 'opacity-100',
      statusIndicator: <Checkmark className="w-5 h-5 text-[var(--color-success)]" />,
      progressBg: 'bg-green-100',
      progressFill: 'w-full',
      progressFillColor: 'bg-[var(--color-success)]'
    },
    error: {
      ring: 'border-red-300',
      iconBg: 'bg-red-100 text-[var(--color-error)]',
      opacity: 'opacity-100',
      statusIndicator: <XMark className="w-5 h-5 text-[var(--color-error)]" />,
      progressBg: 'bg-red-100',
      progressFill: 'w-full',
      progressFillColor: 'bg-[var(--color-error)]'
    }
  };
  
  const currentConfig = stateConfig[status];

  const agentPreviews: Record<string, React.ReactNode> = {
    orchestrator: <OrchestratorPreview className="w-full h-full" />,
    architect: <ArchitectPreview className="w-full h-full" />,
    curator: <CuratorPreview className="w-full h-full" />,
    generator: <GeneratorPreview className="w-full h-full" />,
    qa: <QAPreview className="w-full h-full" />
  };
  
  return (
    <div
      className={`relative w-full text-left p-4 rounded-2xl transition-all duration-300 border ${currentConfig.ring} bg-[var(--color-panel)] ${currentConfig.opacity}`}
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
      
      {/* The cinematic preview area */}
      <div className={`mt-3 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${status === 'working' ? 'h-24 opacity-100' : 'h-0 opacity-0'}`}>
        <div className="w-full h-full bg-gray-500/10 backdrop-blur-sm border border-gray-500/20 p-2 text-[var(--color-accent-primary)]">
          {agentPreviews[agent.id]}
        </div>
      </div>
      
      <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-xl overflow-hidden transition-colors duration-300 ${currentConfig.progressBg}`}>
          <div className={`h-full transition-all duration-700 ease-in-out ${currentConfig.progressFill} ${currentConfig.progressFillColor}`} />
      </div>
    </div>
  );
};

const AgentWorkflow: React.FC<AgentWorkflowProps> = ({ agentStatuses, status }) => {
  const title = status === 'refining' ? 'Refining Your Component' : 'The Crew is on the Job';
  const description = status === 'refining' ? 'The Code Generation agent is implementing your changes.' : 'Your request is being processed by our elite AI agents.';
  const agentsToShow = status === 'refining' ? AGENTS.filter(a => ['orchestrator', 'generator'].includes(a.id)) : AGENTS;

  return (
    <div className="flex-grow bg-[var(--color-bg)] rounded-2xl glowing-panel flex flex-col items-center justify-center p-8 transition-all duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]">
          {title}
        </h2>
        <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">{description}</p>
      </div>
      <div className="w-full max-w-md">
        <ul className="flex flex-col gap-3">
          {agentsToShow.map((agent, index) => {
              const currentStatus = agentStatuses[agent.id] || 'inactive';
              const prevAgent = agentsToShow[index - 1];
              const prevStatus = prevAgent ? (agentStatuses[prevAgent.id] || 'inactive') : 'completed';
              const isFlowActive = prevStatus === 'completed' || prevStatus === 'working';

              return (
                <li key={agent.id} className="relative list-none">
                  {index > 0 && (
                     <div className={`absolute left-[28px] -top-3 h-3 w-px transition-colors duration-500 ${isFlowActive ? 'bg-[var(--color-accent-primary)]' : 'bg-[var(--color-border)]'}`} />
                  )}
                  <AgentCard agent={agent} status={currentStatus} />
                </li>
              )
          })}
        </ul>
      </div>
    </div>
  );
};

export default AgentWorkflow;