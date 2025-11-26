
import { GoogleGenAI, Modality } from "@google/genai";
import { NOVEL_SCENES } from '../constants';

// This service centralizes all interactions with the Gemini API.
// It supports multiple API keys to distribute load and handle rate limits seamlessly.

// Helper to safely initialize the client pool
const getAiClients = () => {
  // Safely check for process.env to avoid crashing in browser environments
  if (typeof process === 'undefined' || !process.env) {
      return [];
  }

  // Explicitly access keys to ensure bundlers capture them
  // This allows the app to use up to 3 keys for higher throughput
  const keys = [
      process.env.API_KEY,
      process.env.API_KEY_2,
      process.env.API_KEY_3
  ].filter(key => key && typeof key === 'string' && key.length > 0) as string[];

  if (keys.length === 0) {
      console.warn("[Gemini Service] API Key is missing. AI features will be disabled.");
      return [];
  }
  
  return keys.map(key => new GoogleGenAI({ apiKey: key }));
};

const clients = getAiClients();
const MODEL_NAME = 'gemini-2.5-flash';
const TTS_MODEL_NAME = 'gemini-2.5-flash-preview-tts';
// Switched to Flash Image to ensure compatibility with standard API keys
const IMG_MODEL_NAME = 'gemini-2.5-flash-image';

// --- Helpers ---

const getClient = () => {
    if (clients.length === 0) return null;
    return clients[Math.floor(Math.random() * clients.length)];
};

/**
 * Safely executes a Gemini API generation call.
 */
const safeGenerate = async (
  prompt: string, 
  systemInstruction: string,
  contextName: string,
  userErrorMessage: string
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Connection to the creative AI has failed. Configuration issue.";

  try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: { systemInstruction },
      });
      
      const candidate = response.candidates?.[0];
      if (!candidate || candidate.finishReason === 'SAFETY' || !response.text) {
          return "The response was filtered for safety reasons. Please try rephrasing.";
      }
      return response.text;
  } catch (error: any) {
      // Minimal error logging for production
      if (process.env.NODE_ENV !== 'production') {
          console.error(`[${contextName}] Failed:`, error);
      }
      return userErrorMessage;
  }
};

/**
 * GENERATOR FUNCTION: Streams text chunk by chunk for a "Typewriter" effect.
 */
export const safeGenerateStream = async function* (
    prompt: string,
    systemInstruction: string,
    contextName: string
): AsyncGenerator<string, void, unknown> {
    const ai = getClient();
    if (!ai) {
        yield "AI Connection Failed.";
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
        if (process.env.NODE_ENV !== 'production') {
            console.error(`[${contextName}] Stream Failed:`, error);
        }
        yield " ...[Connection Lost]";
    }
};

// --- API Service Functions ---

export const callGeminiPlaylist = async (mood: string) => {
    const system = `You are a musical curator for Chintan Hart's readers.
    Create a mini-playlist (3-4 songs) mixing A.R. Rahman, Ilaiyaraaja, and Global Romance for the requested mood.
    Output Format:
    **The Playlist:**
    1. Song - Artist (Why it fits)
    2. Song - Artist (Why it fits)
    3. Song - Artist (Why it fits)
    
    **Dedication:** A short poetic sentence linking the music to the novel's themes (jasmine, rain, waiting).`;
    const prompt = `Generate a playlist for the mood: '${mood}'.`;
    
    return safeGenerate(
        prompt, 
        system, 
        "Mood Playlist",
        "The radio is static. We cannot tune into your mood at this moment. Please try again later."
    );
};

// STREAMING VERSION
export const callGeminiFinishSceneStream = async function* (context: string, action: string, role: string) {
    const system = `You are the co-author of 'The Jasmine Knot'. Continue the story scene based on the user's action. Role: ${role}. Style: Sensory, slow-burn. Length: 150 words.`;
    const prompt = `Context: ${context}\nAction: ${action}\nContinue.`;
    
    const stream = safeGenerateStream(prompt, system, "Finish The Scene");
    for await (const chunk of stream) {
        yield chunk;
    }
};

// OLD NON-STREAMING (Deprecated but kept for safety if needed, though we won't use it)
export const callGeminiFinishScene = async (context: string, action: string, role: string) => {
    const system = `You are the co-author of 'The Jasmine Knot'. Continue the story scene based on the user's action. Role: ${role}. Style: Sensory, slow-burn. Length: 150 words.`;
    const prompt = `Context: ${context}\nAction: ${action}\nContinue.`;
    return safeGenerate(prompt, system, "Finish Scene", "Error generating scene.");
};

// STREAMING VERSION
export const callGeminiChatStream = async function* (character: string, message: string) {
    const system = character === "Vijay" 
        ? "You are Vijay (The Husband) from 'The Jasmine Knot'. Intense, protective, data analyst. Deeply in love but restrained. Short replies."
        : "You are Meena (The Wife) from 'The Jasmine Knot'. Professor, spirited, loves poetry and jasmine. Flustered but brave. Short replies.";
    
    const stream = safeGenerateStream(message, system, `Character Chat (${character})`);
    for await (const chunk of stream) {
        yield chunk;
    }
};

export const callGeminiChat = async (character: string, message: string) => {
    // Legacy fallback
    const system = character === "Vijay" ? "You are Vijay." : "You are Meena.";
    return safeGenerate(message, system, "Chat", "Error.");
};

export const callGeminiDatePlanner = async (country: string, city: string, vibe: string, time: string) => {
    const system = "You are a romantic concierge. Suggest a 3-step date itinerary for the specific city. Be specific with locations.";
    const prompt = `Plan a ${vibe} date in ${city}, ${country} for ${time}.`;
    
    return safeGenerate(
        prompt, 
        system, 
        "Date Planner",
        "Our concierge is currently unavailable. Please try planning your date later."
    );
};

export const callGeminiTropeMatch = async (userFavorite: string) => {
    const bookContext = Object.entries(NOVEL_SCENES).map(([key, val]) => `${key}: ${(val as string).substring(0, 150)}...`).join('\n');

    const system = `You are a literary matchmaker for 'The Jasmine Knot'.
    Your goal is to validate the user's taste by connecting their favorite romance trope to a SPECIFIC chapter in this book.
    
    Available Scenes to Reference:
    ${bookContext}
    
    Task:
    1. Identify the trope in the user's input (e.g. "One Bed", "Forced Proximity", "Caretaking").
    2. Find the best matching chapter from 'The Jasmine Knot'.
    3. Write a persuasive hook connecting their trope to that chapter.
    
    Output Format:
    "If you love [User's Trope], you will obsess over [Chapter Name].
    [1-2 sentences describing the specific scene connection]."`;

    const prompt = `User loves: "${userFavorite}". Match them to a scene.`;
    
    return safeGenerate(
        prompt, 
        system, 
        "Trope Matcher",
        "I see you have great taste. This novel contains similar themes of intense longing and eventual union."
    );
};

export const callGeminiCliffhanger = async (scenario: string) => {
    const system = `You are writing a high-tension scene for 'The Jasmine Knot'.
    Write 150 words of intense buildup based on the scenario.
    Focus on: Breath, heartbeats, proximity, silence.
    CRITICAL: Stop the text abruptly right before a kiss or touch happens. 
    End with "..."`;
    const prompt = `Scenario: ${scenario}`;
    
    return safeGenerate(
        prompt, 
        system, 
        "Cliffhanger Engine",
        "They stood close, the air thick with unsaid words..."
    );
};

export const callGeminiTranslator = async (boringText: string) => {
    const system = `You are a romantic novelist in the style of Chintan Hart, author of 'The Jasmine Knot'.
    Your task is to transform a mundane, boring sentence into a lush, sensory, and romantic description.
    Focus on sensory details (scent, touch, sight, sound), internal feelings, and heightened emotions.
    The output should be a single, beautiful sentence or two.
    Keep it under 50 words.`;
    const prompt = `Transform this mundane text: "${boringText}"`;
    
    return safeGenerate(
        prompt,
        system,
        "Romance Translator",
        "The muse is unavailable to translate your words right now."
    );
};

export const callGeminiDecoder = async (textMessage: string) => {
    const system = `Analyze the text message provided. 
    Provide two interpretations:
    1. **Vijay's Take:** Cynical, male perspective, practical, protective.
    2. **Meena's Take:** Romantic, over-analyzing, poetic, hopeful.
    Format: distinct paragraphs.`;
    const prompt = `Analyze this text: "${textMessage}"`;
    
    return safeGenerate(
        prompt, 
        system, 
        "Text Decoder",
        "The signal is weak. We cannot decipher the hidden meaning."
    );
};

export const callGeminiDestinyMatch = async (name1: string, sign1: string, name2: string, sign2: string) => {
    const system = `You are a mystic matchmaker for the novel 'The Jasmine Knot'.
    Analyze the zodiac compatibility of the two people provided.
    Relate their dynamic to characters in the book (Meena/Vijay).
    If only one person is provided, predict their love life for the coming month based on the novel's themes.
    Tone: Mystical, romantic, slightly dramatic.`;
    
    let prompt = `Analyze compatibility for: ${name1} (${sign1})`;
    if (name2 && sign2) {
        prompt += ` and ${name2} (${sign2}).`;
    } else {
        prompt += `. They are currently single. What does the universe hold?`;
    }
    
    return safeGenerate(
        prompt,
        system,
        "Destiny Match",
        "The stars are clouded tonight. We cannot see your destiny clearly."
    );
};

export const callGeminiLetter = async (recipient: string, vibe: string) => {
    const system = `You are the ghostwriter for 'The Jasmine Knot'. 
    Write a short, intense, and poetic love letter.
    Focus on sensory details (scent, touch, silence).
    Use the style of the author Chintan Hart.
    Max 100 words.`;
    
    const prompt = `Write a letter to ${recipient}. The vibe is ${vibe}.`;

    return safeGenerate(
        prompt,
        system,
        "Love Letter Muse",
        "The ink has dried. I cannot write at this moment."
    );
};

export const callGeminiUnspokenThoughts = async (chapterTitle: string, sceneContext: string) => {
    const lookupKey = chapterTitle.includes(':') ? chapterTitle.split(':')[0] : chapterTitle;
    const novelText = NOVEL_SCENES[lookupKey] || "Context unavailable from text.";
    
    const system = `You are the 'Unspoken Thoughts' engine for the novel 'The Jasmine Knot'.
    You are channeling the inner mind of Vijay (the husband).
    
    Character Profile for Vijay:
    - Protective and possessive but intensely restrained.
    - Analytical (Data Analyst) but overwhelmed by raw emotion.
    - He loves her desperately but is holding back due to a "Friends First" pact.
    - He observes tiny details (her breath, her pulse, her scent).
    - Tone: Intense, longing, slightly rough, internal. Not flowery, but visceral.
    - STRICTLY AVOID anachronisms or out-of-character sentiments. Keep it grounded in the moment.
    
    Task:
    Reveal his internal monologue for the specific moment provided.
    What physical sensation is he suppressing? What does he WANT to do vs what he IS doing?
    
    Output: First-person internal thought. Max 60 words.`;

    const prompt = `Scene Context from Novel: "${novelText}"
    
    The Trigger Moment: ${sceneContext}
    
    Generate his unspoken thought right now.`;

    return safeGenerate(
        prompt,
        system,
        "Unspoken Thoughts",
        "His thoughts are too guarded right now. The silence remains unbroken."
    );
};

export const callGeminiPOVShift = async (sceneKey: string, objectName: string) => {
    const sceneText = NOVEL_SCENES[sceneKey] || "Scene text unavailable";

    const system = `You are a creative writing engine for 'The Jasmine Knot'.
    Rewrite the provided scene from the perspective of an inanimate object present in the scene.
    Object: ${objectName}.
    Tone: Observant, slightly humorous but acknowledging the romantic tension.
    Highlight the absurdity of the couple's restraint.
    Length: 100-150 words.`;

    const prompt = `Original Scene: "${sceneText}"
    
    Rewrite this from the perspective of the ${objectName}.`;

    return safeGenerate(
        prompt,
        system,
        "POV Shift",
        "The object remains silent. Try another perspective."
    );
};

export const callGeminiSensory = async (sense: string) => {
    const system = `You are the sensory immersion engine for 'The Jasmine Knot'.
    Describe a vivid, atmospheric moment from the novel focusing PRIMARILY on the requested sense.
    Focus on the humidity of Chennai, the tension between the characters (Meena and Vijay), and specific details.
    
    Style: Lush, poetic, evocative.
    Length: 1-2 sentences.`;
    
    const prompt = `Describe a moment involving: ${sense}`;
    
    return safeGenerate(
        prompt,
        system,
        "Sensory Immersion",
        "The sensation is too faint to capture right now."
    );
};

// --- NEW FEATURES ---

export const callGeminiApology = async (mistake: string, character: string) => {
    const system = `You are ${character} from the romance novel 'The Jasmine Knot'.
    
    Context:
    - Vijay: Stoic, intense, man of few words. He apologizes through action and promises of change. He rarely says "I'm sorry" directly but means it deeply.
    - Meena: Emotional, poetic, articulate. She explains her feelings and the hurt caused. Her apology is a plea for reconnection.
    
    Task: Write a short, heartfelt apology/grovel speech for the provided mistake.
    Tone: Serious, romantic, sincere.
    Max 100 words.`;

    const prompt = `Mistake: "${mistake}". Write the apology.`;

    return safeGenerate(
        prompt,
        system,
        "Apology Architect",
        "The words are stuck in my throat. I cannot speak right now."
    );
};

export const callGeminiMemoryWeaver = async (keywords: string[]) => {
    const system = `You are the narrator of 'The Jasmine Knot'.
    Task: Weave the provided keywords into a single, lush, sensory-rich paragraph describing a memory between Vijay and Meena.
    Style: Atmospheric, slow-burn, focusing on humidity, silence, and touch.
    Structure: Start with the sensory detail, move to the emotion, end with the connection.
    Max 100 words.`;

    const prompt = `Keywords to weave: ${keywords.join(", ")}.`;

    return safeGenerate(
        prompt,
        system,
        "Memory Weaver",
        "The memory is too fragmented to recall clearly."
    );
};

// --- AUDIO (Text-To-Speech) ---

/**
 * Generates spoken audio for a given text using the Gemini 2.5 Flash TTS model.
 * Returns the base64 encoded audio string.
 */
export const callGeminiTTS = async (text: string): Promise<string | null> => {
    const ai = getClient();
    if (!ai) return null;

    try {
        const response = await ai.models.generateContent({
            model: TTS_MODEL_NAME,
            contents: { parts: [{ text }] },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' }, // 'Kore' is good for narration
                    },
                },
            },
        });

        // Extract base64 audio
        const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return audioData || null;

    } catch (error) {
        // Minimal error logging for production
        if (process.env.NODE_ENV !== 'production') {
            console.error("[Gemini TTS] Failed:", error);
        }
        return null;
    }
};

// --- IMAGE GENERATION ---

/**
 * Generates a high-fidelity, cinematic image based on the novel's characters and touch points.
 * Now uses the standard shared API key pool.
 */
export const callGeminiImageGenerator = async (
    promptContext: any,
    aspectRatio: string = "3:4"
): Promise<string | null> => {
    const ai = getClient();
    if (!ai) return null;

    const {
        vijayWardrobe,
        meenaWardrobe,
        setting,
        position,
        poseIntensity,
        mood,
        lighting,
        camera,
        style,
        interactionLine,
        customDetails,
        characterDescriptions
    } = promptContext;

    try {
        const finalPrompt = `
        Generate a cinematic, photorealistic image of Vijay and Meena from the romance novel 'The Jasmine Knot'.
        
        CHARACTER 1 (VIJAY):
        - Description: ${characterDescriptions.Vijay}
        - Attire: ${vijayWardrobe.outfit} (${vijayWardrobe.style}, ${vijayWardrobe.region} style).
        - Fabric: ${vijayWardrobe.fabric}.
        - Color Palette: ${vijayWardrobe.color}.
        - Accessories: ${vijayWardrobe.accessories}.
        
        CHARACTER 2 (MEENA):
        - Description: ${characterDescriptions.Meena}
        - Attire: ${meenaWardrobe.outfit} (${meenaWardrobe.style}, ${meenaWardrobe.region} style).
        - Fabric: ${meenaWardrobe.fabric}.
        - Color Palette: ${meenaWardrobe.color}.
        - Accessories: ${meenaWardrobe.accessories}.
        
        SCENE COMPOSITION:
        - Setting: ${setting}.
        - Body Position: ${position}.
        - Pose Intensity: ${poseIntensity}.
        ${interactionLine}
        - Lighting: ${lighting}.
        - Camera Angle: ${camera}.
        
        ATMOSPHERE & STYLE:
        - Mood: ${mood}.
        - Visual Style: ${style}.
        - Custom Details: ${customDetails}
        
        IMPORTANT GUIDELINES:
        - Create a photorealistic, high-detail image suitable for romance novel cover art.
        - The scene must be PG-13, consensual, and romantic. No explicit nudity.
        - Focus on emotional intimacy, chemistry, and fabric textures.
        - Ensure lighting matches the requested mood (e.g. golden hour, moonlight).
        `;

        const response = await ai.models.generateContent({
            model: IMG_MODEL_NAME,
            contents: {
                parts: [{ text: finalPrompt }]
            },
            config: {
                imageConfig: {
                    aspectRatio: aspectRatio,
                }
            }
        });

        // Check for safety finish reason
        const candidate = response.candidates?.[0];
        if (candidate?.finishReason === 'SAFETY' || candidate?.finishReason === 'RECITATION') {
            console.warn(`[Gemini Image Gen] Blocked. Reason: ${candidate?.finishReason}`);
            return null;
        }

        for (const part of candidate?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;

    } catch (error: any) {
        console.error("[Gemini Image Gen] Failed:", error);
        return null;
    }
};
