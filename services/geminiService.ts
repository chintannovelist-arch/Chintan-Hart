
import { GoogleGenAI } from "@google/genai";
import { NOVEL_SCENES } from '../constants';

// Helper to safely initialize the client
const getAiClient = () => {
  // Safely check for process.env to avoid crashing in browser environments
  const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;
  if (!apiKey) {
      console.warn("[Gemini Service] API Key is missing. AI features will be disabled.");
      return null;
  }
  return new GoogleGenAI({ apiKey });
};

const ai = getAiClient();
const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Safely executes a Gemini API generation call with error handling and fallback messaging.
 */
const safeGenerate = async (
  prompt: string, 
  systemInstruction: string,
  contextName: string,
  userErrorMessage: string
): Promise<string> => {
  if (!ai) {
    console.error(`[${contextName}] Failed: Gemini API Client not initialized (Missing API Key).`);
    return userErrorMessage;
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    
    if (!response.text) {
        console.warn(`[${contextName}] Response was empty. It may have been blocked by safety settings.`);
        return userErrorMessage;
    }

    return response.text;
  } catch (error: any) {
    console.error(`[${contextName}] Gemini API Call Failed:`, {
        message: error.message,
        status: error.status,
        name: error.name,
        details: error
    });
    return userErrorMessage;
  }
};

// --- Existing Services ---

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

export const callGeminiFinishScene = async (context: string, action: string, role: string) => {
    const system = `You are the co-author of 'The Jasmine Knot'. Continue the story scene based on the user's action. Role: ${role}. Style: Sensory, slow-burn. Length: 150 words.`;
    const prompt = `Context: ${context}\nAction: ${action}\nContinue.`;
    
    return safeGenerate(
        prompt, 
        system, 
        "Finish The Scene",
        "The ink has run dry. The muse is resting, please try writing again later."
    );
};

export const callGeminiChat = async (character: string, message: string) => {
    const system = character === "Vijay" 
        ? "You are Vijay (The Husband) from 'The Jasmine Knot'. Intense, protective, data analyst. Deeply in love but restrained. Short replies."
        : "You are Meena (The Wife) from 'The Jasmine Knot'. Professor, spirited, loves poetry and jasmine. Flustered but brave. Short replies.";
    
    return safeGenerate(
        message, 
        system, 
        `Character Chat (${character})`,
        "I cannot find the words right now. (Connection Error)"
    );
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

// --- NEW MARKETING FEATURES ---

export const callGeminiTropeMatch = async (userFavorite: string) => {
    // Constructing a context string from available scenes to guide the AI
    const bookContext = Object.entries(NOVEL_SCENES).map(([key, val]) => `${key}: ${val.substring(0, 150)}...`).join('\n');

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

export const callGeminiTranslator = async (inputText: string) => {
    const system = `You are Chintan Hart, the author. Rewrite the user's boring text into the lush, sensory, over-the-top romantic prose of 'The Jasmine Knot'. 
    Use words like: longing, humidity, gaze, electricity, silk, jasmine.
    Make it sound like a dramatic excerpt from the book.`;
    const prompt = `Rewrite this text: "${inputText}"`;
    
    return safeGenerate(
        prompt, 
        system, 
        "Jasmine Translator",
        "The words refuse to flow. The ink is dry."
    );
};

export const callGeminiCliffhanger = async (scenario: string) => {
    const system = `You are writing a high-tension scene for 'The Jasmine Knot' between Meena and Vijay.
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

export const callGeminiSensory = async (sense: string) => {
    const system = `You are an immersive narrator for 'The Jasmine Knot'.
    Describe a vivid, sensory experience from the world of the novel focusing ONLY on the requested sense.
    Do not mention the sense by name explicitly if possible, just describe the sensation.
    Keep it under 50 words. Enchanting and atmospheric.`;

    const prompt = `Focus on the sense of: ${sense}`;

    return safeGenerate(
        prompt,
        system,
        "Sensory Immersion",
        "The senses are dulled. Try again later."
    );
};

export const callGeminiUnspokenThoughts = async (chapterTitle: string, sceneContext: string) => {
    // Extract key for lookup (e.g. "Chapter 8")
    const lookupKey = chapterTitle.includes(':') ? chapterTitle.split(':')[0] : chapterTitle;
    
    // Try to get exact text, otherwise fallback to description
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
