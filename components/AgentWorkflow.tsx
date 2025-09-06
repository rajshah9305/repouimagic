import React, { useState, useEffect, useRef } from 'react';
import type { Agent, AgentStatus } from '../types';
import { AGENTS } from '../constants';
// FIX: Import newly added preview icons
import { Checkmark, XMark, OrchestratorPreview, ArchitectPreview, CuratorPreview, GeneratorPreview, QAPreview } from './Icons';

interface AgentWorkflowProps {
  agentStatuses: Record<string, AgentStatus>;
  status: 'generating' | 'refining';
}

const LoadingSpinner: React.FC = () => <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>;

const AgentCard: React.FC<{agent: Agent; status: AgentStatus}> = ({ agent, status }) => {
  const Icon = agent.icon;

  const stateConfig: Record<AgentStatus, { ring: string; iconBg: string; statusIndicator: React.ReactNode; }> = {
    inactive: { ring: 'border-[var(--color-border)]', iconBg: 'bg-white/5 text-[var(--color-text-secondary)]', statusIndicator: <div className="w-2 h-2 rounded-full bg-slate-600" />, },
    pending: { ring: 'border-[var(--color-border)]', iconBg: 'bg-white/5 text-[var(--color-text-secondary)]', statusIndicator: <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />, },
    working: { ring: 'border-transparent', iconBg: 'bg-[var(--color-accent-primary-glow)] text-[var(--color-accent-primary)]', statusIndicator: <LoadingSpinner />, },
    completed: { ring: 'border-[var(--color-success-border)]', iconBg: 'bg-[var(--color-success-bg)] text-[var(--color-success)]', statusIndicator: <Checkmark className="w-4 h-4 text-[var(--color-success)]" />, },
    error: { ring: 'border-[var(--color-error-border)]', iconBg: 'bg-[var(--color-error-bg)] text-[var(--color-error)]', statusIndicator: <XMark className="w-4 h-4 text-[var(--color-error)]" />, }
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
    <div className={`w-56 text-left p-3 rounded-2xl transition-all duration-300 border glass-panel ${currentConfig.ring} ${status === 'working' ? 'chasing-border-card' : ''}`}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mr-3 transition-colors duration-300 ${currentConfig.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">{agent.name}</h3>
        </div>
        <div className="flex items-center justify-center w-5 h-5 text-[var(--color-accent-primary)] transition-all duration-300">
          {currentConfig.statusIndicator}
        </div>
      </div>
      
      <div className={`mt-2.5 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${status === 'working' ? 'h-16 opacity-100' : 'h-0 opacity-0'}`}>
        <div className="w-full h-full bg-black/20 backdrop-blur-sm border border-white/10 p-2 text-[var(--color-accent-primary)]">
          {agentPreviews[agent.id]}
        </div>
      </div>
    </div>
  );
};

const AgentWorkflow: React.FC<AgentWorkflowProps> = ({ agentStatuses, status }) => {
  const workflowRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(200);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isAssembled, setIsAssembled] = useState(false);

  useEffect(() => {
    const assemblyTimer = setTimeout(() => setIsAssembled(true), 100);
    
    const calculateLayout = () => {
      if (workflowRef.current) {
        const { width, height } = workflowRef.current.getBoundingClientRect();
        setSize({ width, height });
        const minDim = Math.min(width, height);
        const newRadius = Math.max(140, (minDim - 250) / 2);
        setRadius(newRadius);
      }
    };

    let timeoutId: number | null = null;
    const debouncedHandler = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(calculateLayout, 100);
    }

    calculateLayout();
    window.addEventListener('resize', debouncedHandler);
    
    return () => {
      clearTimeout(assemblyTimer);
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedHandler);
    };
  }, []);

  const title = status === 'refining' ? 'Refining Component' : 'Crew Assembling UI';
  const description = status === 'refining' ? 'Implementing your changes...' : 'AI agents are bringing your vision to life.';
  const agentsToShow = status === 'refining' ? AGENTS.filter(a => ['orchestrator', 'generator', 'qa'].includes(a.id)) : AGENTS;
  const workingAgentIndex = agentsToShow.findIndex(a => agentStatuses[a.id] === 'working');

  return (
    <div ref={workflowRef} className="flex-grow glass-panel rounded-2xl flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden h-full">
      <div className="relative w-full h-full flex items-center justify-center">
        
        <svg width="100%" height="100%" className="absolute top-0 left-0 transition-opacity duration-500" style={{ opacity: isAssembled ? 1 : 0 }}>
            <defs>
                <linearGradient id="line-gradient-active" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-accent-secondary)" />
                    <stop offset="100%" stopColor="var(--color-accent-primary)" />
                </linearGradient>
            </defs>
            <g transform={`translate(${size.width / 2}, ${size.height / 2})`}>
                {agentsToShow.map((agent, index) => {
                    const totalAgents = agentsToShow.length;
                    const angleDeg = (index / totalAgents) * 360 - 90;
                    const x = radius * Math.cos(angleDeg * Math.PI / 180);
                    const y = radius * Math.sin(angleDeg * Math.PI / 180);

                    const currentStatus = agentStatuses[agent.id] || 'inactive';
                    const isWorking = currentStatus === 'working';
                    const isDone = currentStatus === 'completed';

                    return (
                        <path
                            key={`line-${agent.id}`}
                            d={`M 0 0 L ${x} ${y}`}
                            stroke={isWorking ? 'url(#line-gradient-active)' : 'var(--color-border)'}
                            strokeWidth={isWorking ? 2 : 1}
                            fill="none"
                            strokeDasharray={isWorking ? "8 8" : "4 4"}
                            className={isWorking ? 'animate-energy-flow' : ''}
                             style={{
                                opacity: isAssembled ? (isWorking ? 1 : (isDone ? 0.4 : 0.2)) : 0,
                                transition: 'all 500ms ease-in-out',
                            }}
                        />
                    );
                })}
            </g>
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center nexus-pulse-container">
            <div className="absolute inset-0 bg-black/30 rounded-full border border-[var(--color-border)] shadow-2xl shadow-black/50"></div>
            <div className="relative z-10 p-4">
              <h2 className="text-lg md:text-xl font-bold font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-text-secondary)]">
                {title}
              </h2>
              <p className="text-xs md:text-sm text-[var(--color-text-secondary)] mt-1">{description}</p>
            </div>
          </div>
        </div>

        <div className="absolute w-full h-full">
          {agentsToShow.map((agent, index) => {
            const totalAgents = agentsToShow.length;
            const angleDeg = (index / totalAgents) * 360 - 90;
            const x = radius * Math.cos(angleDeg * Math.PI / 180);
            const y = radius * Math.sin(angleDeg * Math.PI / 180);
            const currentStatus = agentStatuses[agent.id] || 'inactive';
            const isDimmed = workingAgentIndex !== -1 && index !== workingAgentIndex;

            return (
              <div
                key={agent.id}
                className="absolute top-1/2 left-1/2"
                style={{
                  transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease-in-out, filter 500ms ease-in-out',
                  transitionDelay: `${100 + index * 100}ms`,
                  transform: isAssembled
                    ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${currentStatus === 'working' ? 1.05 : 1})`
                    : `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.5)`,
                  zIndex: currentStatus === 'working' ? 10 : 5,
                  opacity: isAssembled ? (isDimmed ? 0.3 : 1) : 0,
                  filter: isAssembled && isDimmed ? 'blur(2px)' : 'none',
                }}
              >
                <AgentCard agent={agent} status={currentStatus} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgentWorkflow;