import React from 'react';

interface IconProps {
  className?: string;
}

export const PromptEngineeringIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15"/>
    <path d="M10 7L12 9L14 7L12 5L10 7Z" fill="currentColor"/>
    <path d="M7 10L9 12L7 14L5 12L7 10Z" fill="currentColor"/>
    <path d="M17 10L19 12L17 14L15 12L17 10Z" fill="currentColor"/>
    <path d="M10 17L12 19L14 17L12 15L10 17Z" fill="currentColor"/>
  </svg>
);

export const UIUXDesignerIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 3L21 12L12 21L3 12L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

export const CodeGenerationIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
  </svg>
);

export const DebuggingIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 8.5C6 7.11929 7.11929 6 8.5 6H15.5C16.8807 6 18 7.11929 18 8.5V15.5C18 16.8807 16.8807 18 15.5 18H8.5C7.11929 18 6 16.8807 6 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9.5 9.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14.5 9.5L9.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const Send: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" strokeWidth="1.5" className={className} viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"></path></svg>
);

export const Settings: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" strokeWidth="1.5" className={className} viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.962a48.507 48.507 0 0111.456 0c.55.045 1.02.42 1.11.962l.094.542c.065.374.028.756-.106 1.112a48.294 48.294 0 01-3.522 4.774.75.75 0 00-.217 1.055l.217.364a48.18 48.18 0 01-6.758 11.238.75.75 0 00-1.055-.217l-.364-.217a48.293 48.293 0 01-4.774-3.522.75.75 0 00-1.112-.106l-.542.094c-.542.09-.962.56-1.007 1.11a48.507 48.507 0 010 11.456c-.045.55-.42 1.02-.962 1.11l-.542.094c-.374.065-.756.028-1.112-.106a48.293 48.293 0 01-4.774-3.522.75.75 0 00-1.055.217l-.217.364a48.18 48.18 0 01-11.238-6.758.75.75 0 00.217-1.055l.217-.364a48.294 48.294 0 013.522-4.774.75.75 0 00.106-1.112l-.094-.542c-.09-.542-.56-1.007-1.11-.962a48.507 48.507 0 01-11.456 0c-.55-.045-1.02-.42-1.11-.962l-.094-.542c-.065-.374-.028-.756.106-1.112a48.294 48.294 0 013.522-4.774.75.75 0 00.217-1.055l-.217-.364a48.18 48.18 0 016.758-11.238.75.75 0 001.055.217l.364.217a48.293 48.293 0 014.774 3.522.75.75 0 001.112.106l.542-.094zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"></path></svg>
);

export const SlidersHorizontal: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Code: React.FC<IconProps> = ({ className }) => <svg fill="none" strokeWidth={1.5} className={className} viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>;
export const Download: React.FC<IconProps> = ({ className }) => <svg fill="none" strokeWidth={1.5} className={className} viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>;
export const Palette: React.FC<IconProps> = ({ className }) => <svg fill="none" strokeWidth={1.5} className={className} viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>;
export const Sparkles: React.FC<IconProps> = ({ className }) => <svg fill="none" strokeWidth={1.5} className={className} viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.672-2.672L11.25 18l1.938-.648a3.375 3.375 0 002.672-2.672L16.25 13.5l.648 1.938a3.375 3.375 0 002.672 2.672L21 18l-1.938.648a3.375 3.375 0 00-2.672 2.672z" /></svg>;
export const Eye: React.FC<IconProps> = ({ className }) => <svg fill="none" strokeWidth={1.5} className={className} viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
export const Copy: React.FC<IconProps> = ({ className }) => <svg fill="none" strokeWidth={1.5} className={className} viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>;
export const ExternalLink: React.FC<IconProps> = ({ className }) => <svg fill="none" strokeWidth={1.5} className={className} viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>;
export const Bookmark: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75v10.5l-5.25-3.375L6.75 20.25V9.75m10.5-6H6.75a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25z" /></svg>;
export const Refresh: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.696L19.015 5.98m-14.03 0l3.181 3.183A8.25 8.25 0 0018.817 15.421l3.181-3.183" /></svg>;
export const Shuffle: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.95 9.358c.234-.44.436-.902.6-1.383m-1.2 1.383c-.374.966-.824 1.88-1.36 2.733m1.36-2.733l-2.04 2.04m2.04-2.04l-2.04-2.04m-2.04 2.04c-.966.374-1.88.824-2.733 1.36m2.733-1.36l-2.04 2.04M4.05 14.642c-.234.44-.436.902-.6 1.383m1.2-1.383c.374-.966.824-1.88 1.36-2.733m-1.36 2.733l2.04-2.04m-2.04 2.04l2.04 2.04m2.04-2.04c.966-.374 1.88-.824 2.733-1.36m-2.733 1.36l2.04-2.04" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>;
export const Expand: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m4.5 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>;
export const ChevronUp: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>;
export const Checkmark: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>;
export const XMark: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;


/* Agent Previews */
export const OrchestratorPreview: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="20" cy="30" r="6" fill="currentColor" opacity="0.8"><animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/></circle>
    <circle cx="60" cy="30" r="6" fill="currentColor" opacity="0.8"><animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" begin="0.5s" repeatCount="indefinite"/></circle>
    <circle cx="100" cy="30" r="6" fill="currentColor" opacity="0.8"><animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" begin="1s" repeatCount="indefinite"/></circle>
    <path d="M 26 30 L 54 30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2"><animate attributeName="stroke-dashoffset" from="6" to="0" dur="1s" repeatCount="indefinite"/></path>
    <path d="M 66 30 L 94 30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2"><animate attributeName="stroke-dashoffset" from="6" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"/></path>
  </svg>
);
export const ArchitectPreview: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="10" y="10" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite"/></rect>
    <rect x="60" y="15" width="50" height="15" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2.5s" begin="0.5s" repeatCount="indefinite"/></rect>
    <rect x="60" y="35" width="25" height="10" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2.5s" begin="1s" repeatCount="indefinite"/></rect>
  </svg>
);
export const CuratorPreview: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="30" cy="30" r="12" fill="#2563EB"><animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite"/></circle>
      <circle cx="60" cy="30" r="12" fill="#7C3AED"><animate attributeName="opacity" values="1;0.2;1" dur="3s" begin="1s" repeatCount="indefinite"/></circle>
      <circle cx="90" cy="30" r="12" fill="#16A34A"><animate attributeName="opacity" values="1;0.2;1" dur="3s" begin="2s" repeatCount="indefinite"/></circle>
    </svg>
);
export const GeneratorPreview: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className={className} fontFamily="'JetBrains Mono', monospace" fontSize="12" fill="currentColor">
    <text x="10" y="25">{`<div className="...">`}</text>
    <text x="10" y="45">{`  <button>Submit</button>`}</text>
    <rect x="8" y="10" width="104" height="40" fill="var(--color-bg)" >
      <animate attributeName="width" from="104" to="0" dur="3s" repeatCount="indefinite"/>
    </rect>
    <path d="M 112 15 L 112 45" stroke="currentColor" strokeWidth="2">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
    </path>
  </svg>
);
export const QAPreview: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M30 25 L 35 30 L 45 20" stroke="#16A34A" strokeWidth="2" fill="none" />
    <path d="M30 40 L 35 45 L 45 35" stroke="#16A34A" strokeWidth="2" fill="none" />
    <g transform="translate(0, 0)">
      <animateTransform attributeName="transform" type="translate" values="50 0; 80 0; 50 0" dur="3s" repeatCount="indefinite" />
      <circle cx="20" cy="30" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M 26 36 L 32 42" stroke="currentColor" strokeWidth="1.5" />
    </g>
  </svg>
);