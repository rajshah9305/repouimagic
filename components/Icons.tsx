import React from 'react';

interface IconProps {
  className?: string;
}

// Redesigned with a clean, unified line-art style

export const PromptEngineeringIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 3L12 5"/>
    <path d="M12 19L12 21"/>
    <path d="M3 12L5 12"/>
    <path d="M19 12L21 12"/>
    <path d="M5.63001 5.63001L7.04001 7.04001"/>
    <path d="M16.96 16.96L18.37 18.37"/>
    <path d="M5.63001 18.37L7.04001 16.96"/>
    <path d="M16.96 7.04001L18.37 5.63001"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

export const UIUXDesignerIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M3 9H21"/>
    <path d="M9 21V9"/>
  </svg>
);

export const CodeGenerationIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7 8L3 12L7 16"/>
    <path d="M17 8L21 12L17 16"/>
    <path d="M14 4L10 20"/>
  </svg>
);

export const DebuggingIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 9V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V17C4 18.1046 4.89543 19 6 19H9"/>
    <path d="M12 12H15C15.5523 12 16 11.5523 16 11V8C16 7.44772 15.5523 7 15 7H12C11.4477 7 11 7.44772 11 8V11C11 11.5523 11.4477 12 12 12Z"/>
    <path d="M12 15.5V13"/>
    <path d="M12 6V7"/>
    <path d="M8 10H11"/>
    <path d="M16 10H19"/>
    <path d="M14 19L16 21"/>
    <path d="M18 17L20 19"/>
    <path d="M18 21L20 19"/>
    <path d="M14 17L16 19"/>
  </svg>
);

export const Send: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M22 2L11 13"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
  </svg>
);

export const Settings: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12.2201 2.29002C12.0801 2.11002 11.9201 2.11002 11.7801 2.29002C10.7101 3.65002 9.07008 4.39002 7.39008 4.20002C6.44008 4.09002 5.56008 3.75002 4.78008 3.22002C4.57008 3.09002 4.34008 3.18002 4.22008 3.38002L2.38008 6.44002C2.26008 6.64002 2.34008 6.88002 2.54008 6.99002C3.26008 7.43002 4.06008 7.72002 4.89008 7.82002C6.71008 8.03002 8.42008 7.22002 9.42008 5.76002C9.56008 5.58002 9.72008 5.58002 9.86008 5.76002L11.7001 8.82002C11.5801 9.02002 11.5001 9.25002 11.6101 9.45002C11.1701 10.1701 10.8801 10.9701 10.7801 11.8001C10.6701 12.7501 11.0101 13.6301 11.5401 14.4101C11.6701 14.6201 11.5801 14.8501 11.3801 14.9701L8.32008 16.8101C8.12008 16.9301 7.88008 16.8501 7.78008 16.6501C7.34008 15.9301 6.71008 15.3001 5.96008 14.8201C5.76008 14.6901 5.52008 14.7801 5.40008 14.9801L2.24008 20.1201C2.12008 20.3201 2.21008 20.5501 2.41008 20.6701C3.67008 21.4901 5.15008 21.9401 6.67008 21.9401C9.25008 21.9401 11.6001 20.7601 13.1201 18.8101C13.3001 18.5701 13.3001 18.2301 13.1201 17.9901L10.0601 13.1301C9.86008 12.8701 9.92008 12.5301 10.1801 12.3301C10.7601 11.8701 11.2101 11.2301 11.4501 10.5101L14.2201 5.42002C14.3901 5.12002 14.2301 4.75002 13.9001 4.59002L12.2201 2.29002Z"/>
    <path d="M14.88 12.54C15.34 11.56 16.14 10.76 17.12 10.3C17.33 10.21 17.56 10.3 17.68 10.5L19.52 13.56C19.64 13.76 19.56 14 19.36 14.11C18.64 14.55 17.84 14.84 17.01 14.94C15.19 15.15 13.48 14.34 12.48 12.88C12.34 12.7 12.34 12.52 12.48 12.34L14.88 8.65999C14.78 8.87999 14.7 9.11999 14.81 9.31999C15.25 10.04 15.54 10.84 15.64 11.67C15.75 12.62 15.41 13.5 14.88 14.28"/>
    <path d="M19.79 5.21002C19.79 7.97002 17.76 10.21 15.29 10.21C14.08 10.21 13.01 9.68002 12.23 8.80002"/>
  </svg>
);

export const SlidersHorizontal: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3 6H21"/>
    <path d="M3 12H21"/>
    <path d="M3 18H21"/>
    <circle cx="8" cy="6" r="2" transform="rotate(90 8 6)" fill="currentColor" stroke="none"/>
    <circle cx="16" cy="12" r="2" transform="rotate(90 16 12)" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="18" r="2" transform="rotate(90 12 18)" fill="currentColor" stroke="none"/>
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 6L6 18"/>
    <path d="M6 6L18 18"/>
  </svg>
);

export const Code: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7 8L3 12L7 16"/>
    <path d="M17 8L21 12L17 16"/>
    <path d="M14 4L10 20"/>
  </svg>
);
export const Download: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"/>
    <path d="M7 10L12 15L17 10"/>
    <path d="M12 15V3"/>
  </svg>
);
export const Palette: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13.2,21.6c-0.6,0-1.2-0.2-1.6-0.6l-8-8c-0.9-0.9-0.9-2.3,0-3.2l4-4c0.9-0.9,2.3-0.9,3.2,0l8,8c0.9,0.9,0.9,2.3,0,3.2l-4,4 C14.4,21.4,13.8,21.6,13.2,21.6z"/>
    <path d="M12.9 5.8L18.2 11.1"/>
    <path d="M10.8 7.9L16.1 13.2"/>
    <path d="M8.7 10L14 15.3"/>
    <path d="M22 6.8L17.2 2"/>
    <path d="M16 1.2c-0.8-0.8-0.8-2-0.8-2"/>
  </svg>
);
export const Sparkles: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 3L9.65 9.65L3 12L9.65 14.35L12 21L14.35 14.35L21 12L14.35 9.65L12 3Z"/>
    <path d="M3 21L9.65 14.35"/>
    <path d="M21 3L14.35 9.65"/>
  </svg>
);
export const Eye: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
export const Copy: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"/>
  </svg>
);
export const ExternalLink: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"/>
    <path d="M15 3H21V9"/>
    <path d="M10 14L21 3"/>
  </svg>
);
export const Bookmark: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M19 21L12 17.5L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"/>
  </svg>
);
export const Refresh: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M23 4V10H17"/>
    <path d="M1 20V14H7"/>
    <path d="M3.51 9.49001C4.00133 7.40424 5.22152 5.57245 6.93657 4.3121C8.65162 3.05175 10.7495 2.44962 12.8988 2.62804C15.048 2.80645 17.0818 3.7543 18.6323 5.30481C20.1828 6.85532 21.1306 8.8891 21.309 11.0383C21.4875 13.1876 20.8853 15.2855 19.625 16.9996C18.3646 18.7136 16.5328 19.9338 14.447 20.4251C12.3613 20.9165 10.2307 20.6272 8.36001 19.64"/>
  </svg>
);
export const Shuffle: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 3H21V8"/>
    <path d="M4 20L21 3"/>
    <path d="M21 16V21H16"/>
    <path d="M15 15L21 21"/>
    <path d="M4 4L9 9"/>
  </svg>
);
export const Expand: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15 3H21V9"/>
    <path d="M9 21H3V15"/>
    <path d="M21 3L14 10"/>
    <path d="M3 21L10 14"/>
  </svg>
);
export const ChevronUp: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 15L12 9L6 15"/>
  </svg>
);
export const Checkmark: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 6L9 17L4 12"/>
  </svg>
);
export const XMark: React.FC<IconProps> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 6L6 18"/>
    <path d="M6 6L18 18"/>
  </svg>
);


/* Agent Previews - Redesigned for cleaner, more modern animations */
export const OrchestratorPreview: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className={className}>
    <style>{`
      .orb-orch { animation: orb-pulse 2s ease-in-out infinite; }
      @keyframes orb-pulse { 0%, 100% { r: 5; opacity: 1; } 50% { r: 7; opacity: 0.7; } }
      .line-orch { stroke-dasharray: 4 4; animation: line-flow-orch 1s linear infinite; }
      @keyframes line-flow-orch { to { stroke-dashoffset: -8; } }
    `}</style>
    <circle cx="20" cy="30" r="5" fill="currentColor" className="orb-orch" style={{ animationDelay: '0s' }} />
    <circle cx="60" cy="30" r="5" fill="currentColor" className="orb-orch" style={{ animationDelay: '0.3s' }} />
    <circle cx="100" cy="30" r="5" fill="currentColor" className="orb-orch" style={{ animationDelay: '0.6s' }} />
    <path d="M 25 30 L 55 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="line-orch" style={{ animationDelay: '0s' }} />
    <path d="M 65 30 L 95 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="line-orch" style={{ animationDelay: '0.3s' }} />
  </svg>
);

export const ArchitectPreview: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className={className}>
    <style>{`
      .box-arch { stroke-dasharray: 130; animation: draw-arch 3s ease-in-out infinite; }
      @keyframes draw-arch { 0%, 100% { stroke-dashoffset: 130; } 50% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 130; } }
      .line-arch-horiz, .line-arch-vert { stroke-dasharray: 80; animation: draw-line-arch 3s ease-in-out infinite; }
      @keyframes draw-line-arch { 0% { stroke-dashoffset: 80; } 50% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 80; } }
    `}</style>
    <rect x="20" y="10" width="80" height="40" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" className="box-arch" />
  </svg>
);

{/* FIX: Add missing agent preview icons */}
export const CuratorPreview: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className={className}>
    <style>{`
      .color-circle { animation: color-fade-in-out 3s ease-in-out infinite; }
      @keyframes color-fade-in-out { 0%, 100% { opacity: 0; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1); } }
    `}</style>
    <circle cx="30" cy="30" r="10" fill="#3B82F6" className="color-circle" style={{ animationDelay: '0s' }} />
    <circle cx="60" cy="30" r="10" fill="#10B981" className="color-circle" style={{ animationDelay: '0.5s' }} />
    <circle cx="90" cy="30" r="10" fill="#F59E0B" className="color-circle" style={{ animationDelay: '1s' }} />
  </svg>
);

export const GeneratorPreview: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className={className}>
    <style>{`
      .bracket { animation: bracket-pulse 1.5s ease-in-out infinite; }
      @keyframes bracket-pulse { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(1.2); } }
      .cursor { animation: blink 1s step-end infinite; }
      @keyframes blink { 50% { opacity: 0; } }
    `}</style>
    <text x="35" y="35" fontFamily="monospace" fontSize="16" fill="currentColor" className="bracket" style={{ transformOrigin: 'center' }}>{'<'}</text>
    <text x="80" y="35" fontFamily="monospace" fontSize="16" fill="currentColor" className="bracket" style={{ transformOrigin: 'center', animationDelay: '0.2s' }}>{'>'}</text>
    <rect x="58" y="22" width="2" height="16" fill="currentColor" className="cursor" />
  </svg>
);

export const QAPreview: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className={className}>
    <style>{`
      .check, .cross { stroke-dasharray: 20; animation: draw-qa 2.5s ease-in-out infinite; }
      @keyframes draw-qa { 0% { stroke-dashoffset: 20; } 40% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 0; } }
    `}</style>
    <path d="M 30 30 L 35 35 L 45 25" stroke="#10B981" strokeWidth="2" fill="none" className="check" style={{ animationDelay: '0s' }} />
    <path d="M 75 25 L 85 35 M 75 35 L 85 25" stroke="#EF4444" strokeWidth="2" fill="none" className="cross" style={{ animationDelay: '1s' }} />
  </svg>
);
