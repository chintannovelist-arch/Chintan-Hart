import { GoogleGenAI, Modality } from "@google/genai";
import { NOVEL_SCENES } from '../constants';

// --- DEBUGGING LOG ---
console.log("[Gemini Service] File loaded. Initializing...");

const getAiClients = () => {
  // 1. Get the Raw String from Environment
  const rawKeys = import.meta.env.VITE_GEMINI_API_KEY || "";

  // 2. Split the string by commas to get individual keys
  // The .map(k => k.trim()) part removes accidental spaces if you copied them.
  const validKeys = rawKeys.split(',').map(key => key.trim()).filter(key => key.length > 10);

  console.log(`[Gemini Service] Found ${validKeys.length} valid API keys available for rotation.`);

  if (validKeys.length === 0) {
      console.error("[Gemini Service] CRITICAL: No API keys found. AI will not work.");
      return [];
  }
  
  // 3. Create a Client for EVERY key found
  return validKeys.map(key => new GoogleGenAI({ apiKey: key }));
};

const clients = getAiClients();
const MODEL_NAME = 'gemini-2.5-flash';
const TTS_MODEL_NAME = 'gemini-2.5-flash-preview-tts';
const IMG_MODEL_NAME = 'gemini-2.5-flash-image';

// --- Helpers ---

const getClient = () => {
    if (clients.length === 0) {
        console.error("[Gemini Service] getClient called but no clients available.");
        return null;
    }
    // Randomly select one of the 7 keys to distribute the workload
    const randomIndex = Math.floor(Math.random() * clients.length);
    return clients[randomIndex];
};

// ... (PASTE THE REST OF YOUR FUNCTIONS BELOW AS BEFORE) ...
// ... safeGenerate, safeGenerateStream, callGeminiPlaylist, etc. ...

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
    return safeGenerate(`Plan ${vibe} date in ${city}, ${country} for ${time}.`, system, "Date Planner", "Concierge unavailable.");
};

export const callGeminiTropeMatch = async (userFavorite: string) => {
    const bookContext = Object.entries(NOVEL_SCENES).map(([key, val]) => `${key}: ${(val as string).substring(0, 150)}...`).join('\n');
    const system = `Literary matchmaker. Connect user trope to specific chapter.\nAvailable Scenes:\n${bookContext}`;
    return safeGenerate(`User loves: "${userFavorite}". Match scene.`, system, "Trope Matcher", "I see you have great taste.");
};

export const callGeminiCliffhanger = async (scenario: string) => {
    const system = `High-tension scene builder. 150 words. Stop abruptly before kiss/touch.`;
    return safeGenerate(`Scenario: ${scenario}`, system, "Cliffhanger", "They stood close...");
};

export const callGeminiTranslator = async (boringText: string) => {
    const system = `Romantic novelist translator. Make it lush and sensory. Max 50 words.`;
    return safeGenerate(`Transform: "${boringText}"`, system, "Translator", "Muse unavailable.");
};

export const callGeminiDecoder = async (textMessage: string) => {
    const system = `Analyze text. 1. Vijay's Take (Cynical). 2. Meena's Take (Romantic).`;
    return safeGenerate(`Analyze: "${textMessage}"`, system, "Decoder", "Signal weak.");
};

export const callGeminiDestinyMatch = async (name1: string, sign1: string, name2: string, sign2: string) => {
    const system = `Mystic matchmaker. Zodiac compatibility.`;
    let prompt = `Analyze: ${name1} (${sign1})`;
    prompt += (name2 && sign2) ? ` and ${name2} (${sign2}).` : `. Single.`;
    return safeGenerate(prompt, system, "Destiny Match", "Stars clouded.");
};

export const callGeminiLetter = async (recipient: string, vibe: string) => {
    const system = `Ghostwriter. Short, intense love letter. Max 100 words.`;
    return safeGenerate(`Letter to ${recipient}. Vibe: ${vibe}.`, system, "Love Letter", "Ink dried.");
};

export const callGeminiUnspokenThoughts = async (chapterTitle: string, sceneContext: string) => {
    const lookupKey = chapterTitle.includes(':') ? chapterTitle.split(':')[0] : chapterTitle;
    const novelText = NOVEL_SCENES[lookupKey] || "Context unavailable.";
    const system = `Inner mind of Vijay (Husband). Protective, restrained. 60 words max.`;
    const prompt = `Scene: "${novelText}"\nTrigger: ${sceneContext}\nGenerate thought.`;
    return safeGenerate(prompt, system, "Unspoken Thoughts", "Thoughts guarded.");
};

export const callGeminiPOVShift = async (sceneKey: string, objectName: string) => {
    const sceneText = NOVEL_SCENES[sceneKey] || "Unavailable";
    const system = `Rewrite scene from perspective of object: ${objectName}. Observant. 150 words.`;
    return safeGenerate(`Original: "${sceneText}"\nRewrite as ${objectName}.`, system, "POV Shift", "Object silent.");
};

export const callGeminiSensory = async (sense: string) => {
    const system = `Sensory immersion engine. Describe moment involving requested sense. Lush.`;
    return safeGenerate(`Describe moment: ${sense}`, system, "Sensory", "Sensation faint.");
};

export const callGeminiApology = async (mistake: string, character: string) => {
    const system = `You are ${character}. Write heartfelt apology.`;
    return safeGenerate(`Mistake: "${mistake}"`, system, "Apology", "Words stuck.");
};

export const callGeminiMemoryWeaver = async (keywords: string[]) => {
    const system = `Weave keywords into lush memory. Max 100 words.`;
    return safeGenerate(`Keywords: ${keywords.join(", ")}.`, system, "Memory Weaver", "Memory fragmented.");
};

export const callGeminiTTS = async (text: string): Promise<string | null> => {
    const ai = getClient();
    if (!ai) return null;
    try {
        const response = await ai.models.generateContent({
            model: TTS_MODEL_NAME,
            contents: { parts: [{ text }] },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
            },
        });
        return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
    } catch (error) {
        console.error("[Gemini TTS] Failed:", error);
        return null;
    }
};

export const callGeminiImageGenerator = async (promptContext: any, aspectRatio: string = "3:4"): Promise<string | null> => {
    const ai = getClient();
    if (!ai) return null;
    
    // Deconstruct context to fail gracefully if missing
    const { vijayWardrobe, meenaWardrobe, setting, position, poseIntensity, mood, lighting, camera, style, interactionLine, customDetails, characterDescriptions } = promptContext || {};

    try {
        const finalPrompt = `Cinematic image of Vijay and Meena. 
        Vijay: ${characterDescriptions?.Vijay}, Wearing ${vijayWardrobe?.outfit}. 
        Meena: ${characterDescriptions?.Meena}, Wearing ${meenaWardrobe?.outfit}. 
        Setting: ${setting}. Position: ${position}. Mood: ${mood}. Lighting: ${lighting}. 
        Style: ${style}. Details: ${customDetails}. ${interactionLine}`;

        const response = await ai.models.generateContent({
            model: IMG_MODEL_NAME,
            contents: { parts: [{ text: finalPrompt }] },
            config: { imageConfig: { aspectRatio: aspectRatio } }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
        }
        return null;
    } catch (error: any) {
        console.error("[Gemini Image Gen] Failed:", JSON.stringify(error));
        return null;
    }
};
