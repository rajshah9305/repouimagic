import React, { useState, useEffect, useRef } from 'react';
import { generateUIVariants, refineUIVariant } from './services/geminiService';
import type { Variant, ChatMessage, Agent, StyleDNA, ToastType, AgentStatus } from './types';
import { AgentRole } from './types';
import { AGENTS, INITIAL_CHAT_MESSAGES, INITIAL_PREVIEW_CONTENT } from './constants';
import Stage from './components/Stage';
import Console from './components/Console';
import Toast from './components/Toast';
import SettingsModal from './components/SettingsModal';
import Header from './components/Header';


type AppStatus = 'idle' | 'generating' | 'refining';
export type ConsoleTab = 'briefing' | 'chat' | 'dna';

const App: React.FC = () => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [status, setStatus] = useState<AppStatus>('idle');
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>('briefing');
  const [refiningVariantId, setRefiningVariantId] = useState<string | null>(null);
  const [agentStatuses, setAgentStatuses] = useState<Record<string, AgentStatus>>(
    AGENTS.reduce((acc, agent) => ({ ...acc, [agent.id]: 'inactive' }), {})
  );

  const [styleDnaLibrary, setStyleDnaLibrary] = useState<StyleDNA[]>([]);
  const [activeStyleDna, setActiveStyleDna] = useState<StyleDNA | null>(null);
  const [toast, setToast] = useState<{message: string; type: ToastType} | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // FIX: Use `ReturnType<typeof setInterval>` to correctly type the ref for interval IDs,
  // which can be `number` in browsers or `NodeJS.Timeout` in Node environments.
  const animationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, []);

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type });
  };

  const stopWorkflowAnimation = () => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
  };

  const runWorkflow = async (
    agentIds: string[],
    apiCall: () => Promise<any>,
    onSuccess: (result: any) => void,
    onError: (error: Error) => void
  ) => {
    let currentAgentIndex = 0;
    setAgentStatuses(() => {
        const statuses: Record<string, AgentStatus> = AGENTS.reduce((acc, agent) => ({ ...acc, [agent.id]: 'inactive' }), {});
        agentIds.forEach(id => statuses[id] = 'pending');
        if (agentIds.length > 0) {
            statuses[agentIds[0]] = 'working';
        }
        return statuses;
    });

    animationIntervalRef.current = setInterval(() => {
        const nextAgentIndex = (currentAgentIndex + 1);
        if (nextAgentIndex >= agentIds.length) {
          stopWorkflowAnimation();
          return;
        }

        setAgentStatuses(prev => {
            const nextStatuses = { ...prev };
            const currentAgentId = agentIds[currentAgentIndex];
            const nextAgentId = agentIds[nextAgentIndex];

            if (currentAgentId) nextStatuses[currentAgentId] = 'completed';
            if (nextAgentId) nextStatuses[nextAgentId] = 'working';
            
            return nextStatuses;
        });
        currentAgentIndex = nextAgentIndex;
    }, 2200); 

    try {
        const result = await apiCall();
        stopWorkflowAnimation();
        setAgentStatuses(prev => {
            const finalStatuses = { ...prev };
            agentIds.forEach(id => {
                finalStatuses[id] = 'completed';
            });
            return finalStatuses;
        });
        await new Promise(res => setTimeout(res, 500));
        onSuccess(result);
    } catch (error) {
        stopWorkflowAnimation();
        const err = error instanceof Error ? error : new Error("An unknown error occurred.");
        
        setAgentStatuses(prev => {
            const finalStatuses = { ...prev };
            const failedAgentId = agentIds[currentAgentIndex];
            for (let i = 0; i < currentAgentIndex; i++) {
                finalStatuses[agentIds[i]] = 'completed';
            }
            if (failedAgentId) {
                finalStatuses[failedAgentId] = 'error';
            }
            return finalStatuses;
        });
        await new Promise(res => setTimeout(res, 500));
        onError(err);
    }
  };

  const handleGenerate = async (prompt: string, moods: string[], appliedDna: StyleDNA | null) => {
    if (!prompt.trim() || status !== 'idle') return;
    
    setStatus('generating');
    setVariants([]);
    setSelectedVariant(null);
    const userMessage = { role: AgentRole.User, content: prompt };
    const systemMessage = { role: AgentRole.System, content: 'Analyzing your brief and coordinating the crew... This may take a moment.' };
    setChatMessages([userMessage, systemMessage]);
    
    let fullPrompt = `${prompt}`;
    if (moods.length > 0) {
      fullPrompt += `\n\n**Moods & Keywords:** ${moods.join(', ')}`;
    }
    if(appliedDna) {
      fullPrompt += `\n\n**Style DNA Reference:** Emulate the aesthetic of "${appliedDna.name}" which is described as: "${appliedDna.style}".`;
    }

    const agentOrder = AGENTS.map(a => a.id);

    await runWorkflow(
        agentOrder,
        () => generateUIVariants(fullPrompt),
        (newVariants: Variant[]) => {
            setVariants(newVariants);
            if (newVariants.length > 0) {
                setSelectedVariant(newVariants[0]);
                setChatMessages(prev => [...prev, { role: AgentRole.CodeGeneration, content: `Generated ${newVariants.length} unique UI variations! The preview is updated. Select a variant and use the chat to refine it.` }]);
                setConsoleTab('chat');
            } else {
                setChatMessages(prev => [...prev, { role: AgentRole.System, content: 'The AI returned an empty list of variants. Please try a different prompt.' }]);
                setConsoleTab('briefing');
            }
            setStatus('idle');
            setAgentStatuses(AGENTS.reduce((acc, agent) => ({ ...acc, [agent.id]: 'inactive' }), {}))
        },
        (error: Error) => {
            setChatMessages(prev => [...prev, { role: AgentRole.System, content: `Error: ${error.message}` }]);
            setStatus('idle');
            setConsoleTab('briefing');
        }
    );
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || status !== 'idle' || !selectedVariant) return;

    setChatMessages(prev => [...prev, { role: AgentRole.User, content: message }]);
    
    setStatus('refining');
    setRefiningVariantId(selectedVariant.id);
    setChatMessages(prev => [...prev, { 
      role: AgentRole.System, 
      content: `Refining "${selectedVariant.name}" based on your feedback...` 
    }]);
    
    const agentOrder = ['orchestrator', 'generator', 'qa'];

    await runWorkflow(
        agentOrder,
        () => refineUIVariant(message, selectedVariant),
        (refinedVariant: Variant) => {
            setVariants(prevVariants => 
              prevVariants.map(v => v.id === refinedVariant.id ? refinedVariant : v)
            );
            setSelectedVariant(refinedVariant);
            setChatMessages(prev => [...prev, { 
              role: AgentRole.CodeGeneration, 
              content: `I've updated the "${refinedVariant.name}" variant. The preview is now refreshed.` 
            }]);
            setStatus('idle');
            setRefiningVariantId(null);
            setAgentStatuses(AGENTS.reduce((acc, agent) => ({ ...acc, [agent.id]: 'inactive' }), {}))
        },
        (error: Error) => {
            setChatMessages(prev => [...prev, { role: AgentRole.System, content: `Error: ${error.message}` }]);
            setStatus('idle');
            setRefiningVariantId(null);
        }
    );
  };

  const handleSaveStyleDna = (variantToSave: Variant, callback: (isNew: boolean) => void) => {
    if (styleDnaLibrary.some(dna => dna.id === variantToSave.id)) {
      callback(false);
      return;
    }
    const newDna: StyleDNA = {
      id: variantToSave.id,
      name: variantToSave.name,
      style: variantToSave.style,
      preview: variantToSave.preview,
    };
    setStyleDnaLibrary(prev => [...prev, newDna]);
    callback(true);
  };

  const handleApplyDna = (dna: StyleDNA) => {
    setActiveStyleDna(dna);
    setConsoleTab('briefing');
    showToast(`Applied "${dna.name}" DNA to next generation.`, 'info');
  };
  
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast('React code copied to clipboard!', 'success');
  };

  const currentPreview = selectedVariant ? selectedVariant.preview : INITIAL_PREVIEW_CONTENT;

  return (
    <div className="h-screen w-full flex flex-col">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />
      <div className="flex-grow min-h-0 w-full max-w-[1920px] mx-auto grid grid-cols-12 gap-4 p-4">
        <div className="col-span-12 lg:col-span-8 h-full min-h-0">
            <Stage
              status={status}
              variants={variants}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
              previewCode={currentPreview}
              refiningVariantId={refiningVariantId}
              onSaveStyleDna={handleSaveStyleDna}
              onShowToast={showToast}
              onCopyCode={handleCopyCode}
              agentStatuses={agentStatuses}
            />
        </div>
        <div className="col-span-12 lg:col-span-4 h-full min-h-0">
            <Console
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              onGenerate={handleGenerate}
              isLoading={status !== 'idle'}
              hasVariants={variants.length > 0}
              selectedVariant={selectedVariant}
              activeTab={consoleTab}
              onTabChange={setConsoleTab}
              styleDnaLibrary={styleDnaLibrary}
              activeStyleDna={activeStyleDna}
              onApplyDna={handleApplyDna}
              onClearDna={() => setActiveStyleDna(null)}
            />
        </div>
      </div>
       {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
       {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
    </div>
  );
}

export default App;
