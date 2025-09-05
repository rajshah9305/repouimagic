import React, { useState, useEffect, useRef } from 'react';
import { generateUIVariants, refineUIVariant } from './services/geminiService';
import type { Variant, ChatMessage, Agent, StyleDNA, ToastType, AgentStatus } from './types';
import { AgentRole } from './types';
import { AGENTS, INITIAL_CHAT_MESSAGES, INITIAL_PREVIEW_CONTENT } from './constants';
import Stage from './components/Stage';
import Console from './components/Console';
import Header from './components/Header';
import Toast from './components/Toast';

type AppStatus = 'idle' | 'generating' | 'refining';

const App: React.FC = () => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [status, setStatus] = useState<AppStatus>('idle');
  const [refiningVariantId, setRefiningVariantId] = useState<string | null>(null);
  
  // Agent workflow state
  const [agentStatuses, setAgentStatuses] = useState<Record<string, AgentStatus>>(
    AGENTS.reduce((acc, agent) => ({ ...acc, [agent.id]: 'inactive' }), {})
  );

  const [styleDnaLibrary, setStyleDnaLibrary] = useState<StyleDNA[]>([]);
  const [activeStyleDna, setActiveStyleDna] = useState<StyleDNA | null>(null);
  const [toast, setToast] = useState<{message: string; type: ToastType} | null>(null);

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type });
  };

  const runWorkflowAnimation = async (agentOrder: string[], isError: boolean = false) => {
    const initialStatuses = AGENTS.reduce((acc, agent) => ({
      ...acc,
      [agent.id]: agentOrder.includes(agent.id) ? 'pending' : 'inactive'
    }), {});
    setAgentStatuses(initialStatuses);
    await new Promise(resolve => setTimeout(resolve, 200));

    for (let i = 0; i < agentOrder.length; i++) {
      const currentAgentId = agentOrder[i];
      setAgentStatuses(prev => ({ ...prev, [currentAgentId]: 'working' }));
      
      await new Promise(resolve => setTimeout(resolve, 700));

      if (i < agentOrder.length - 1) {
        setAgentStatuses(prev => ({ ...prev, [currentAgentId]: 'completed' }));
      }
    }
  };

  const finalizeWorkflowAnimation = (agentOrder: string[], isError: boolean = false) => {
    const finalStatus = isError ? 'error' : 'completed';
    setAgentStatuses(prev => {
      const finalStatuses = { ...prev };
      agentOrder.forEach(id => {
        if(prev[id] === 'working' || prev[id] === 'pending') {
          finalStatuses[id] = finalStatus;
        }
      });
      return finalStatuses;
    });

    // Don't reset statuses immediately, let the user see the result
    // The view will change away from the workflow anyway.
  };
  
  const resetAgentStatuses = () => {
     setAgentStatuses(AGENTS.reduce((acc, agent) => ({ ...acc, [agent.id]: 'inactive' }), {}));
  }

  const handleGenerate = async (prompt: string, moods: string[]) => {
    if (!prompt.trim() || status !== 'idle') return;
    
    setStatus('generating');
    setVariants([]);
    setSelectedVariant(null);
    if(chatMessages.length === 1 && chatMessages[0].role === AgentRole.System) {
       setChatMessages([{ role: AgentRole.User, content: prompt }]);
    } else {
       setChatMessages(prev => [...prev, { role: AgentRole.User, content: prompt }]);
    }
    setChatMessages(prev => [...prev, { role: AgentRole.System, content: 'Analyzing your brief and coordinating the crew... This may take a moment.' }]);
    
    const agentOrder = AGENTS.map(a => a.id);
    runWorkflowAnimation(agentOrder);

    let fullPrompt = `${prompt}`;
    if (moods.length > 0) {
      fullPrompt += ` (moods: ${moods.join(', ')})`;
    }
    if (activeStyleDna) {
      fullPrompt += `\n\n**Style Preference:** Generate variants inspired by the "${activeStyleDna.name}" style (${activeStyleDna.style}). Prioritize a similar aesthetic.`;
    }

    try {
      const newVariants = await generateUIVariants(fullPrompt);
      setVariants(newVariants);
      if (newVariants.length > 0) {
        setSelectedVariant(newVariants[0]);
        setChatMessages(prev => [...prev, { role: AgentRole.CodeGeneration, content: `Generated ${newVariants.length} unique UI variations! The preview is updated. Select a variant and use the chat to refine it.` }]);
        finalizeWorkflowAnimation(agentOrder, false);
      } else {
         setChatMessages(prev => [...prev, { role: AgentRole.System, content: 'The AI returned an empty list of variants. Please try a different prompt.' }]);
         finalizeWorkflowAnimation(agentOrder, true);
      }
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred.";
      setChatMessages(prev => [...prev, { role: AgentRole.System, content: `Error: ${errorMessage}` }]);
      finalizeWorkflowAnimation(agentOrder, true);
    }
    setStatus('idle');
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
    
    const agentOrder = ['orchestrator', 'generator'];
    runWorkflowAnimation(agentOrder);

    try {
      const refinedVariant = await refineUIVariant(message, selectedVariant);
      
      setVariants(prevVariants => 
        prevVariants.map(v => v.id === refinedVariant.id ? refinedVariant : v)
      );

      setSelectedVariant(refinedVariant);

      setChatMessages(prev => [...prev, { 
        role: AgentRole.CodeGeneration, 
        content: `I've updated the "${refinedVariant.name}" variant. The preview is now refreshed.` 
      }]);
      finalizeWorkflowAnimation(agentOrder, false);
    } catch (error) {
       const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred during refinement.";
       setChatMessages(prev => [...prev, { role: AgentRole.System, content: `Error: ${errorMessage}` }]);
       finalizeWorkflowAnimation(agentOrder, true);
    }

    setStatus('idle');
    setRefiningVariantId(null);
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
    };
    setStyleDnaLibrary(prev => [...prev, newDna]);
    callback(true);
  };
  
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast('React code copied to clipboard!', 'success');
  };

  const handleDnaSelection = (dna: StyleDNA | null) => {
    if (activeStyleDna?.id === dna?.id) {
      setActiveStyleDna(null); // Toggle off if same is clicked
    } else {
      setActiveStyleDna(dna);
    }
  };
  
  useEffect(() => {
    if (status === 'idle' && variants.length === 0) {
      resetAgentStatuses();
    }
  }, [status, variants]);


  const currentPreview = selectedVariant ? selectedVariant.preview : INITIAL_PREVIEW_CONTENT;

  return (
    <>
      <Header />
      <div className="flex-grow min-h-0 w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 pb-4">
        <Stage
          status={status}
          agentStatuses={agentStatuses}
          variants={variants}
          selectedVariant={selectedVariant}
          onSelectVariant={setSelectedVariant}
          previewCode={currentPreview}
          refiningVariantId={refiningVariantId}
          onSaveStyleDna={handleSaveStyleDna}
          onShowToast={showToast}
          onCopyCode={handleCopyCode}
        />
        <Console
          messages={chatMessages}
          onSendMessage={handleSendMessage}
          onGenerate={handleGenerate}
          isLoading={status !== 'idle'}
          hasVariants={variants.length > 0}
          selectedVariant={selectedVariant}
          styleDnaLibrary={styleDnaLibrary}
          activeStyleDna={activeStyleDna}
          onSelectDna={handleDnaSelection}
        />
      </div>
       {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </>
  );
}

export default App;
