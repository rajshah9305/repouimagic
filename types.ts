export enum AgentRole {
  System = "System",
  User = "User",
  Orchestrator = "Orchestrator",
  DesignArchitect = "Design Architect",
  StyleCurator = "Style Curator",
  CodeGeneration = "Code Generation",
  LivePreviewer = "Live Previewer",
  QA = "QA & A11y",
  ExportManager = "Export Manager",
}

export type AgentStatus = 'inactive' | 'pending' | 'working' | 'completed' | 'error';


export interface ChatMessage {
  role: AgentRole;
  content: string;
}

export interface Agent {
  id: string;
  name: AgentRole;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Variant {
  id: string;
  name:string;
  style: string;
  novelty: number;
  preview: string; // HTML for iframe
  code: string; // React component code as string
}

export interface StyleDNA {
  id: string;
  name: string;
  style: string;
  preview: string;
}

export type ToastType = 'success' | 'info';
