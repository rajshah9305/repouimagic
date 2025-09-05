// FIX: Import `Type` for defining the response schema.
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION, SYSTEM_INSTRUCTION_REFINE } from '../constants';
import type { Variant } from '../types';

// FIX: Per coding guidelines, the API key must be obtained from process.env.API_KEY
// and the UI must not prompt the user for it. Initialize the client once.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// FIX: Define a response schema to ensure the model returns valid JSON.
const responseSchema = {
    type: Type.OBJECT,
    properties: {
        variants: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    style: { type: Type.STRING },
                    novelty: { type: Type.NUMBER },
                    preview: { type: Type.STRING },
                    code: { type: Type.STRING },
                },
                // All fields are expected from the model.
                required: ['id', 'name', 'style', 'novelty', 'preview', 'code'],
            }
        }
    },
    required: ['variants'],
};

const refineResponseSchema = {
    type: Type.OBJECT,
    properties: {
        variant: {
            type: Type.OBJECT,
            properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                style: { type: Type.STRING },
                novelty: { type: Type.NUMBER },
                preview: { type: Type.STRING },
                code: { type: Type.STRING },
            },
            required: ['id', 'name', 'style', 'novelty', 'preview', 'code'],
        }
    },
    required: ['variant'],
};


// FIX: Removed API key management functions (getApiKey, setApiKey) and client re-initialization logic.
// The service now relies solely on environment variables.

export const generateUIVariants = async (prompt: string): Promise<Variant[]> => {
    // Check for API key at time of call to provide a user-facing error if it's not configured.
    if (!process.env.API_KEY) {
        throw new Error("Gemini API key is not configured in environment variables.");
    }
    
    try {
        // FIX: Switched from `chat.sendMessage` to `ai.models.generateContent` as per guidelines.
        const response: GenerateContentResponse = await ai.models.generateContent({
            // FIX: Per coding guidelines, use 'gemini-2.5-flash' for general text tasks.
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                // FIX: Per coding guidelines, use responseSchema for reliable JSON output.
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                // Added to enhance inference speed by reducing model thinking time.
                thinkingConfig: { thinkingBudget: 0 },
            },
        });

        // FIX: With responseSchema, the response text is guaranteed to be a valid JSON string.
        // No need to manually clean up markdown code blocks.
        const jsonString = response.text;
        
        try {
            const parsed = JSON.parse(jsonString);
            if (parsed.variants && Array.isArray(parsed.variants)) {
                // Ensure each variant has the required fields with fallbacks
                return parsed.variants.map((v: any, index: number) => ({
                  id: v.id || `v${index + 1}`,
                  name: v.name || 'Untitled Variant',
                  style: v.style || 'unknown-style',
                  novelty: v.novelty || 0.8,
                  preview: v.preview || '<div>Preview not available</div>',
                  code: v.code || '() => <div>Code not available</div>',
                }));
            } else {
                // This path is less likely with a responseSchema but good for robustness.
                throw new Error("Invalid JSON structure from API. Missing 'variants' array.");
            }
        } catch (e) {
            console.error("Failed to parse JSON response from Gemini:", e);
            console.log("Raw response:", jsonString);
            throw new Error("AI returned an invalid response. Could not parse variants.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
         if (error instanceof Error) {
            // Make error message more user-friendly.
            if (error.message.includes('API key not valid')) {
                 throw new Error("The configured Gemini API key is invalid. Please check your environment configuration.");
            }
        }
        throw error;
    }
};

export const refineUIVariant = async (refinementPrompt: string, originalVariant: Variant): Promise<Variant> => {
    if (!process.env.API_KEY) {
        throw new Error("Gemini API key is not configured in environment variables.");
    }
    
    const fullPrompt = `
      User Request: "${refinementPrompt}"

      Original Variant Details:
      - ID: ${originalVariant.id}
      - Name: ${originalVariant.name}
      - Style: ${originalVariant.style}
      - Original HTML Preview:
      \`\`\`html
      ${originalVariant.preview}
      \`\`\`
      - Original React Code:
      \`\`\`jsx
      ${originalVariant.code}
      \`\`\`
      
      Please refine the component based on the user's request and provide the updated version.
    `;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION_REFINE,
                responseMimeType: "application/json",
                responseSchema: refineResponseSchema,
                // Added to enhance inference speed by reducing model thinking time.
                thinkingConfig: { thinkingBudget: 0 },
            },
        });

        const jsonString = response.text;
        
        try {
            const parsed = JSON.parse(jsonString);
            if (parsed.variant) {
                // Return the single refined variant, ensuring we use the original ID
                // to correctly replace it in the application's state.
                return { ...parsed.variant, id: originalVariant.id };
            } else {
                throw new Error("Invalid JSON structure from refinement API. Missing 'variant' object.");
            }
        } catch (e) {
            console.error("Failed to parse JSON response from Gemini refinement:", e);
            console.log("Raw refinement response:", jsonString);
            throw new Error("AI returned an invalid response during refinement.");
        }

    } catch (error) {
        console.error("Error calling Gemini refinement API:", error);
         if (error instanceof Error) {
            if (error.message.includes('API key not valid')) {
                 throw new Error("The configured Gemini API key is invalid. Please check your environment configuration.");
            }
        }
        throw error;
    }
};