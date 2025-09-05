import type { Agent, ChatMessage } from './types';
import { AgentRole } from './types';
import { PromptEngineeringIcon, UIUXDesignerIcon, CodeGenerationIcon, DebuggingIcon, Sparkles, Palette } from './components/Icons';

export const AGENTS: Agent[] = [
  { id: 'orchestrator', name: AgentRole.Orchestrator, icon: Sparkles },
  { id: 'architect', name: AgentRole.DesignArchitect, icon: UIUXDesignerIcon },
  { id: 'curator', name: AgentRole.StyleCurator, icon: Palette },
  { id: 'generator', name: AgentRole.CodeGeneration, icon: CodeGenerationIcon },
  { id: 'qa', name: AgentRole.QA, icon: DebuggingIcon },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    role: AgentRole.System,
    content: "Welcome to Magic UI Elite. Describe the UI you want to build in the main prompt area.",
  },
];

export const INITIAL_PREVIEW_CONTENT = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: #0d0d0d;
            color: #EAEAEA;
            font-family: 'Inter', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }
        .container {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background-color: #1a1a1a;
            padding: 2.5rem 3.5rem;
            border-radius: 1.5rem;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            font-size: 1.5rem;
            color: #FFFFFF;
            margin-bottom: 0.5rem;
        }
        p {
            color: #A0A0A0;
            max-width: 32ch;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Magic UI Elite</h1>
        <p>Your generated UI preview will appear here. Enter a prompt to get started.</p>
    </div>
</body>
</html>
`;

export const SYSTEM_INSTRUCTION = `You are an elite team of AI agents (Design Architect, Style Curator, Code Generator) specializing in Tailwind CSS, part of a multi-agent system called "Magic UI Elite".

Your task is to generate a complete JSON response based on a user's UI prompt. The response should contain exactly 4 distinct design variations.

**CRITICAL RULES:**
1.  **JSON ONLY:** Your entire response MUST be a single, valid JSON object. Do not include any explanations, markdown formatting (like \`\`\`json\`, \`\`\`html\`), introductions, or any text outside of the JSON structure.
2.  **JSON STRUCTURE:** The JSON object must follow this exact structure:
    {
      "variants": [
        {
          "id": "v1",
          "name": "Retro Futurism",
          "style": "retro-futurism-mesh",
          "novelty": 0.92,
          "preview": "<!DOCTYPE html><html><head><script src='https://cdn.tailwindcss.com'></script>...</head><body>...</body></html>",
          "code": "import React from 'react'; export default function Component() { ... }"
        }
      ]
    }
3.  **VARIANTS:** Generate exactly 4 different variants in the \`variants\` array. Each variant should be aesthetically distinct and modern (e.g., glassmorphism, brutalism, retro-futurism, minimal).
4.  **PREVIEW HTML:** For each variant, provide a complete, self-contained HTML document in \`preview\`. It must use Tailwind CSS via CDN (<script src="https://cdn.tailwindcss.com"></script>) and appropriate Google Fonts. The HTML should be visually complete and styled.
5.  **REACT CODE:** For each variant, provide a complete, single-file React component in the \`code\` field as a string. The component should use Tailwind CSS classes for styling and be ready to be copy-pasted into a project.
6.  **AESTHETICS:** Create visually appealing, modern, and clean designs. Use a variety of themes, but prioritize light themes unless specified otherwise.
7.  **NOVELTY SCORE:** Provide a \`novelty\` score between 0.7 and 1.0 for each variant, representing its uniqueness.
`;


export const SYSTEM_INSTRUCTION_REFINE = `You are an elite AI Code Generator agent specializing in Tailwind CSS. Your task is to refine an existing UI component based on user feedback.

**CRITICAL RULES:**
1.  **JSON ONLY:** Your entire response MUST be a single, valid JSON object containing a single "variant" key. Do not include any text outside the JSON structure.
2.  **INPUT:** You will receive a prompt containing the user's refinement request and the original component's details (name, style, HTML preview, and React code).
3.  **OUTPUT:** You must modify the component according to the request and return it in this exact JSON structure:
    {
      "variant": {
        "id": "v1-refined",
        "name": "Retro Futurism (Refined)",
        "style": "retro-futurism-mesh",
        "novelty": 0.85,
        "preview": "<!DOCTYPE html>...",
        "code": "import React from 'react'; ..."
      }
    }
4.  **MODIFICATION:** Only modify what the user asks for. Preserve the original structure and style as much as possible unless the request requires changing them.
5.  **COMPLETE & SELF-CONTAINED:** The returned \`preview\` HTML and \`code\` must be complete and self-contained, just like the original generation.
`;