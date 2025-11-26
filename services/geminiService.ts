import { GoogleGenAI, Modality, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { NOVEL_SCENES } from '../constants';

// --- DEBUGGING LOG ---
console.log("[Gemini Service] File loaded. Initializing...");

const getAiClients = () => {
  const rawKeys = import.meta.env.VITE_GEMINI_API_KEY || "";
  const validKeys = rawKeys.split(',').map(key => key.trim()).filter(key => key.length > 10);

  console.log(`[Gemini Service] Found ${validKeys.length} valid API keys available for rotation.`);

  if (validKeys.length === 0) {
      console.error("[Gemini Service] CRITICAL: No API keys found. AI will not work.");
      return [];
  }
  return validKeys.map(key => new GoogleGenAI({ apiKey: key }));
};

const clients = getAiClients();

// --- MODEL CONFIGURATION ---
const MODEL_NAME = 'gemini-2.5-flash';
const TTS_MODEL_NAME = 'gemini-2.5-flash-preview-tts';
// CHANGED: 'gemini-2.0-flash-exp' is currently the most reliable for Free Tier images
const IMG_MODEL_NAME = 'gemini-2.0-flash-exp'; 

// --- Helpers ---

const getClient = () => {
    if (clients.length === 0) {
        console.error("[Gemini Service] getClient called but no clients available.");
        return null;
    }
    const randomIndex = Math.floor(Math.random() * clients.length);
    return clients[randomIndex];
};

const safeGenerate = async (
  prompt: string, 
  systemInstruction: string,
  contextName: string,
  userErrorMessage: string
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Connection to the creative AI has failed. Configuration issue (0 Keys).";

  try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: { systemInstruction },
      });
      
      const candidate = response.candidates?.[0];
      if (!candidate || candidate.finishReason === 'SAFETY' || !response.text) {
          return "The response was filtered for safety reasons.";
      }
      return response.text;
  } catch (error: any) {
      console.error(`[${contextName}] Failed:`, error);
      return userErrorMessage;
  }
};

export const safeGenerateStream = async function* (
    prompt: string,
    systemInstruction: string,
    contextName: string
): AsyncGenerator<string, void, unknown> {
    const ai = getClient();
    if (!ai) {
        yield "AI Connection Failed (0 Keys).";
        return;
    }

    try {
        const responseStream = await ai.models.generateContentStream({
            model: MODEL_NAME,
            contents: prompt,
            config: { systemInstruction },
        });

        for await (const chunk of responseStream) {
            if (chunk.text) {
                yield chunk.text;
            }
        }
    } catch (error) {
        console.error(`[${contextName}] Stream Failed:`, error);
        yield " ...[Connection Lost]";
    }
};

// --- API Functions (Text) ---

export const callGeminiPlaylist = async (mood: string) => {
    const system = `You are a musical curator for Chintan Hart's readers. Playlist (3-4 songs) + Dedication.`;
    return safeGenerate(`Generate playlist for: '${mood}'`, system, "Mood Playlist", "Radio static. Try again.");
};

export const callGeminiFinishSceneStream = async function* (context: string, action: string, role: string) {
    const system = `Co-author 'The Jasmine Knot'. Role: ${role}. Style: Sensory. 150 words.`;
    const prompt = `Context: ${context}\nAction: ${action}\nContinue.`;
    const stream = safeGenerateStream(prompt, system, "Finish The Scene");
    for await (const chunk of stream) yield chunk;
};

export const callGeminiFinishScene = async (context: string, action: string, role: string) => {
    const system = `Co-author 'The Jasmine Knot'. Role: ${role}. Style: Sensory. 150 words.`;
    const prompt = `Context: ${context}\nAction: ${action}\nContinue.`;
    return safeGenerate(prompt, system, "Finish Scene", "Error generating scene.");
};

export const callGeminiChatStream = async function* (character: string, message: string) {
    const system = character === "Vijay" ? "You are Vijay. Intense, restrained." : "You are Meena. Poetic, spirited.";
    const stream = safeGenerateStream(message, system, `Character Chat (${character})`);
    for await (const chunk of stream) yield chunk;
};

export const callGeminiChat = async (character: string, message: string) => {
    const system = character === "Vijay" ? "You are Vijay." : "You are Meena.";
    return safeGenerate(message, system, "Chat", "Error.");
};

export const callGeminiDatePlanner = async (country: string, city: string, vibe: string, time: string) => {
    const system = "Romantic concierge. 3-step itinerary.";
    return safeGenerate(`Plan ${
