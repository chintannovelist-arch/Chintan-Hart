
import { Book, Scenario, SneakPeek } from './types';

export const AUTHOR_NAME = "Chintan Hart";
export const TAGLINE = "Bound by Desire";

export const BOOKS: Book[] = [
  {
    id: 1,
    title: "The Jasmine Knot",
    subtitle: "Bound by Desire",
    description: "In the humid heat of Chennai, Meena and Vijay are bound by a wedding knot, but separated by a wall of pillows. What starts as an arranged marriage governed by strict boundaries slowly unravels into a dangerous obsession as the scent of jasmine and the closeness of a small apartment break down their defenses. From the first tentative touch to the breaking of the storm, experience their journey of intimacy, high stakes, and passion.",
    coverImages: [
        {
            src: "assets/cover-jasmine-knot-main.jpg",
            alt: "The Jasmine Knot - A beautiful cover of a South Asian couple in a tender embrace."
        },
        {
            src: "assets/cover-jasmine-knot-alt.jpg",
            alt: "The Jasmine Knot - Romantic Tension"
        }
    ],
    amazonLink: "https://amzn.in/d/b4xx7hF",
    sampleLink: "#",
    status: "Available Now",
    tags: ["Arranged Marriage", "Slow Burn", "Chennai Romance", "Intimacy"]
  }
];

export const CLIFFHANGER_SCENARIOS = [
    "Rainy Night Powercut",
    "The Stuck Zipper",
    "Sharing a Bed",
    "The Morning Reflection",
    "The Car Ride Nap",
    "The Hallway Collision",
    "The Temple Crowd",
    "Gym Stretches",
    "The Balcony Wind",
    "The Towel Moment",
    "The Kitchen Tease",
    "The Cufflink Struggle"
];

export const SNEAK_PEEKS: SneakPeek[] = [
    {
        chapter: "Chapter 8",
        title: "The Saree Drape",
        excerpt: "He reached around her, his large hands taking the sheaf of pleats from her tired fingers. 'Relax,' he murmured near her ear. 'Let go. I've got it.'..."
    },
    {
        chapter: "Chapter 20",
        title: "Between the Legs",
        excerpt: "Vijay opened his legs slightly, creating a V-shape. Meena slid into the space between his legs, her back to him... a position of extreme intimacy."
    },
    {
        chapter: "Chapter 54",
        title: "The Slow Dance",
        excerpt: "'Dance with me,' he repeated... He placed his left hand on her waist... 'Just sway,' he whispered, his breath hot against her ear. They began to move... The space between them evaporated."
    }
];

export const SCENARIOS: Record<string, Scenario[]> = {
    Meena: [
        { id: 1, title: "The Shirt Swap", context: "You spilled coffee on your blouse and are wearing Vijay's crisp white shirt. It's huge on you. Vijay walks in unexpectedly.", prompt: "How do you react to his gaze?" },
        { id: 2, title: "The Hallway Collision", context: "The hallway is blocked. You stumble into Vijay. He catches your wrist, pinning you between his hard chest and the wall.", prompt: "What happens in the silence?" },
        { id: 3, title: "The Saree Drape", context: "Vijay steps behind you to help with your pleats. His knuckles graze your bare waist as he tucks it in.", prompt: "Do you lean back or pull away?" },
        { id: 4, title: "The Anklet Repair", context: "Your anklet breaks. Vijay drops to one knee, holding your heel in his warm palm to fix it.", prompt: "What do you say?" },
        { id: 5, title: "The Temple Crowd", context: "The crowd crushes you. Vijay stands behind you as a shield, his chest pressing against your back.", prompt: "How does your body react?" },
        { id: 6, title: "The Back Zip", context: "The zip of your blouse is stuck. Vijay pulls it up slowly, his fingers brushing your spine.", prompt: "What do you do?" },
        { id: 7, title: "The Laptop Whisper", context: "Working late. Vijay leans over your shoulder, trapping you in his arms. His breath hits your neck.", prompt: "How do you respond?" },
        { id: 8, title: "The Hair Drying", context: "Vijay takes the towel and dries your hair himself, massaging your scalp rhythmically.", prompt: "Do you let him continue?" },
        { id: 9, title: "The Towel Moment", context: "Vijay steps out of the bathroom shirtless. You are caught staring at a water droplet on his chest.", prompt: "What do you say?" },
        { id: 10, title: "The Powercut Fall", context: "Pitch dark. You crash into Vijay. He catches you, pulling you tight. You are pressed fully against him.", prompt: "What happens in the dark?" }
    ],
    Vijay: [
        { id: 11, title: "The Coffee Mug", context: "She hands you coffee, her fingers brushing yours. The contact lingers longer than necessary.", prompt: "Do you pull away or hold on?" },
        { id: 12, title: "The Rain", context: "You are driving. It's pouring. She is shivering in the passenger seat.", prompt: "What do you do?" }
    ]
};

// --- NEW EXPORTS ---

export const BOOK_SAMPLE = {
    title: "Chapter 1: The Arrangement",
    content: "The fan whirred overhead, a rhythmic slicing of the humid Chennai air that did little to cool the sweat prickling at Meena's hairline. She sat on the edge of the bed, the heavy silk of her wedding saree pooling around her like a crimson tide. The door clicked shut. \n\nVijay stood there. He looked different without the garland, without the crowd, without the noise of the nadaswaram filling the space between them. He looked... real. \n\n'I can sleep on the floor,' he said, his voice rough, uncertain. \n\nMeena looked up, meeting his eyes for the first time since the ceremony. They were dark, unreadable, but not unkind. 'No,' she whispered, surprising herself. 'The bed is big enough.' \n\nHe hesitated, then nodded, moving to the other side. He placed a pillow between them—a white, fluffy barrier. 'Friends first?' he asked, a ghost of a smile touching his lips. \n\n'Friends first,' she agreed, though as she lay down, listening to the steady rhythm of his breathing, she knew that friendship was a dangerous place to start when your heart was already racing."
};

export const NOVEL_SCENES: Record<string, string> = {
    "Chapter 4": "The pillow wall stood between them, a fortress of white cotton. Vijay lay on his side, watching the rise and fall of her breathing. He wanted to reach out, to brush a stray hair from her forehead, but the pact held him back.",
    "Chapter 12": "Under the table, their knees brushed. Meena froze, fork halfway to her mouth. Vijay didn't pull away. The contact was electric, a secret conversation in a crowded room.",
    "Chapter 41": "The bus lurched. Meena grabbed the pole, her hand landing directly on top of his. His skin was warm, rougher than hers. He didn't move his hand; instead, his fingers tightened slightly beneath hers.",
    "Chapter 54": "They sat on the living room floor, surrounded by papers. The exhaustion of the day had worn down their defenses. Vijay leaned back, stretching, and his arm brushed against her shoulder. The silence stretched, heavy and wanting."
};

export const ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const MOODS = ["Yearning", "Playful", "Angst", "Domestic", "Passion", "Melancholy"];

export const COUNTRIES_DATA: Record<string, string[]> = {
    "India": ["Chennai", "Mumbai", "Jaipur", "Kerala"],
    "France": ["Paris", "Lyon", "Nice"],
    "Italy": ["Rome", "Venice", "Florence"],
    "USA": ["New York", "San Francisco", "Chicago"]
};

export const UNSPOKEN_SCENES = [
    { id: "scene1", title: "Chapter 4: The Pillow Wall", context: "Vijay builds a wall of pillows on their wedding night.", trigger: "He places the last pillow." },
    { id: "scene2", title: "Chapter 15: The Saree Pleats", context: "He helps her pleat her saree for a function.", trigger: "His knuckles graze her waist." },
    { id: "scene3", title: "Chapter 41: The Bus Ride", context: "Crowded bus. He shields her from the crowd.", trigger: "She leans back against his chest." },
    { id: "scene4", title: "Chapter 60: The Fever", context: "She is sick. He is taking care of her.", trigger: "He places a cool cloth on her forehead." }
];

export const TENSION_DATA = [
    { chapter: 1, title: "The Arrangement", tension: 10, pactIntegrity: 100, snippet: "Strangers in a room." },
    { chapter: 10, title: "Domestic Friction", tension: 30, pactIntegrity: 90, snippet: "Living together creates sparks." },
    { chapter: 25, title: "The Accidental Touch", tension: 50, pactIntegrity: 75, snippet: "A brush of hands changes everything." },
    { chapter: 40, title: "The Monsoon", tension: 75, pactIntegrity: 50, snippet: "Trapped by the rain." },
    { chapter: 60, title: "The Jealousy", tension: 85, pactIntegrity: 30, snippet: "Seeing her with someone else." },
    { chapter: 75, title: "The Breaking Point", tension: 95, pactIntegrity: 10, snippet: "The wall crumbles." },
    { chapter: 80, title: "The Knot", tension: 100, pactIntegrity: 0, snippet: "Bound by desire." }
];

export const PREDICTION_QUESTIONS = [
    { 
        id: "q1", 
        chapter: "Chapter 12", 
        context: "Meena burns the dinner. The kitchen is filled with smoke. Vijay walks in.", 
        options: [
            { id: "A", text: "He gets angry and orders takeout." },
            { id: "B", text: "He laughs and helps her clean up." },
            { id: "C", text: "He silently opens the windows and ignores her." }
        ],
        correctOption: "B",
        answerExcerpt: "Vijay started laughing, a deep rumble that shook his chest. He grabbed a towel and started fanning the smoke alarm. 'Well,' he grinned, 'I guess we're ordering pizza.'" 
    },
    { 
        id: "q2", 
        chapter: "Chapter 35", 
        context: "They are at a wedding. A relative asks when they are having kids.", 
        options: [
            { id: "A", text: "Meena blushes and looks away." },
            { id: "B", text: "Vijay squeezes her hand and deflects." },
            { id: "C", text: "They both get into an argument." }
        ],
        correctOption: "B",
        answerExcerpt: "Vijay didn't miss a beat. His hand found the small of her back, a warm, reassuring weight. 'We're enjoying being newlyweds,' he said smoothly, steering her away."
    }
];

export const TOUCH_POINT_CATEGORIES = {
    "Hands": "Hands & Wrists",
    "Face": "Face & Neck",
    "Torso": "Torso & Waist",
    "Legs": "Legs & Feet"
};

export const TOUCH_POINTS_DATA: Record<string, { id: string, label: string, category: string, description: string }[]> = {
    Vijay: [
        { id: "v_hand_hold", label: "Hand Hold", category: "Hands", description: "Firm grip, interlocking fingers." },
        { id: "v_neck_graze", label: "Neck Graze", category: "Face", description: "Fingers brushing the nape." },
        { id: "v_waist_hold", label: "Waist Hold", category: "Torso", description: "Hand pressing into the small of the back." },
        { id: "v_chest_palm", label: "Chest Palm", category: "Torso", description: "Hand resting on the heartbeat." },
        { id: "v_thigh_rest", label: "Thigh Rest", category: "Legs", description: "Hand resting on knee while driving." },
        { id: "v_jaw_cup", label: "Jaw Cup", category: "Face", description: "Thumb stroking the jawline." },
        { id: "v_back_hug", label: "Back Hug", category: "Torso", description: "Arms wrapped from behind." },
        { id: "v_hair_run", label: "Hair Run", category: "Face", description: "Fingers tangling in hair." },
        { id: "v_wrist_grip", label: "Wrist Grip", category: "Hands", description: "Gentle restraint during tension." },
        { id: "v_shoulder_squeeze", label: "Shoulder Squeeze", category: "Torso", description: "Reassuring pressure." },
        { id: "v_forehead_lean", label: "Forehead Lean", category: "Face", description: "Shared breath, eyes closed." },
        { id: "v_ear_whisper", label: "Ear Whisper", category: "Face", description: "Lips grazing the earlobe." },
        { id: "v_palm_kiss", label: "Palm Kiss", category: "Hands", description: "Lips pressed to the center of palm." },
        { id: "v_knee_brush", label: "Knee Brush", category: "Legs", description: "Accidental contact under table." },
        { id: "v_collar_trace", label: "Collar Trace", category: "Face", description: "Tracing the collarbone line." },
        { id: "v_lap_sit", label: "Lap Sit", category: "Legs", description: "Intimate seating arrangement." },
        { id: "v_arm_link", label: "Arm Link", category: "Hands", description: "Walking arm in arm." },
        { id: "v_chin_lift", label: "Chin Lift", category: "Face", description: "Guiding gaze upwards." },
        { id: "v_rain_shield", label: "Rain Shield", category: "Torso", description: "Protecting with body from rain." },
        { id: "v_scar_trace", label: "Scar Trace", category: "Hands", description: "Tracing an old wound." }
    ],
    Meena: [
        { id: "m_cheek_caress", label: "Cheek Caress", category: "Face", description: "Palm cupping the cheek." },
        { id: "m_shoulder_lean", label: "Shoulder Lean", category: "Torso", description: "Head resting on the shoulder." },
        { id: "m_fingertip_trace", label: "Fingertip Trace", category: "Hands", description: "Tracing lines on the palm." },
        { id: "m_hair_tuck", label: "Hair Tuck", category: "Face", description: "Tucking strand behind ear." },
        { id: "m_waist_pull", label: "Waist Pull", category: "Torso", description: "Pulling closer by the saree waist." },
        { id: "m_nape_kiss", label: "Nape Kiss", category: "Face", description: "Lips on the back of the neck." },
        { id: "m_hand_kiss", label: "Hand Kiss", category: "Hands", description: "Gallant kiss on knuckles." },
        { id: "m_leg_drape", label: "Leg Drape", category: "Legs", description: "Legs tangled on the couch." },
        { id: "m_temple_kiss", label: "Temple Kiss", category: "Face", description: "Protective kiss on temple." },
        { id: "m_back_trace", label: "Back Trace", category: "Torso", description: "Tracing the spine through fabric." },
        { id: "m_foot_rub", label: "Foot Rub", category: "Legs", description: "Easing tiredness after work." },
        { id: "m_wrist_pulse", label: "Wrist Pulse", category: "Hands", description: "Thumb on the racing pulse." },
        { id: "m_hip_hold", label: "Hip Hold", category: "Torso", description: "Hand resting on the curve of hip." },
        { id: "m_rain_dance", label: "Rain Dance", category: "Legs", description: "Spinning in the rain." },
        { id: "m_tear_wipe", label: "Tear Wipe", category: "Face", description: "Thumbing away a tear." },
        { id: "m_nose_boop", label: "Nose Boop", category: "Face", description: "Playful tap on nose." },
        { id: "m_neck_nuzzle", label: "Neck Nuzzle", category: "Face", description: "Face buried in neck crook." },
        { id: "m_saree_pleat", label: "Saree Pleat", category: "Torso", description: "Helping fix the pleats." },
        { id: "m_bangle_fix", label: "Bangle Fix", category: "Hands", description: "Adjusting bracelets." },
        { id: "m_sleep_watch", label: "Sleep Watch", category: "Face", description: "Watching her sleep." }
    ]
};

export const CHARACTER_DESCRIPTIONS = {
    Vijay: "South Indian male, early 30s, tall, broad-shouldered, sharp jawline, stubble, intense dark eyes, wearing formal shirt or kurta.",
    Meena: "South Indian female, late 20s, expressive eyes, long dark hair, wearing a saree or salwar kameez, graceful.",
};

export const SCENE_SETTINGS = [
    "Bedroom (Night)", "Bedroom (Morning)", "Rainy Balcony", "Temple Corridor", 
    "Crowded Bus", "Living Room Sofa", "Kitchen Counter", "Office Cubicle",
    "Rooftop Terrace", "Beach at Sunset", "Auto Rickshaw (Rain)", "Wedding Hall",
    "Street Food Stall", "Library Aisle", "Hospital Waiting Room", "Garden Bench"
];

// Visual Metadata for Settings (Icons/Descriptions)
export const SCENE_META: Record<string, { icon: string, desc: string }> = {
    "Bedroom (Night)": { icon: "🛏️", desc: "Intimate, shadowy, private" },
    "Bedroom (Morning)": { icon: "☀️", desc: "Soft light, messy sheets" },
    "Rainy Balcony": { icon: "🌧️", desc: "Monsoon mood, wet railing" },
    "Temple Corridor": { icon: "🛕", desc: "Stone pillars, oil lamps" },
    "Crowded Bus": { icon: "🚌", desc: "Close proximity, humidity" },
    "Living Room Sofa": { icon: "🛋️", desc: "Domestic, relaxed" },
    "Kitchen Counter": { icon: "🍳", desc: "Midnight snack, tension" },
    "Office Cubicle": { icon: "💼", desc: "Forbidden, sterile light" },
    "Rooftop Terrace": { icon: "🌃", desc: "City lights, breeze" },
    "Beach at Sunset": { icon: "🌅", desc: "Golden waves, sand" },
    "Auto Rickshaw (Rain)": { icon: "🛺", desc: "Cozy, plastic shield" },
    "Wedding Hall": { icon: "🎊", desc: "Grand, jasmine garlands" },
    "Street Food Stall": { icon: "🍲", desc: "Steam, chaos, flavor" },
    "Library Aisle": { icon: "📚", desc: "Quiet, dust motes" },
    "Hospital Waiting Room": { icon: "🏥", desc: "Anxiety, sterile" },
    "Garden Bench": { icon: "🌳", desc: "Nature, secluded" }
};

export const SCENE_MOODS = [
    "Romantic", "Tense", "Playful", "Melancholic", "Steamy", "Cozy",
    "Forbidden", "Nostalgic", "Hopeful", "Heartbroken", "Electric", "Peaceful"
];

export const MOOD_META: Record<string, string> = {
    "Romantic": "#F4C2C2", // Blush
    "Tense": "#ef4444", // Red
    "Playful": "#fbbf24", // Amber
    "Melancholic": "#64748b", // Slate
    "Steamy": "#be185d", // Pink
    "Cozy": "#d97706", // Orange
    "Forbidden": "#581c87", // Purple
    "Nostalgic": "#78350f", // Sepia
    "Hopeful": "#10b981", // Emerald
    "Heartbroken": "#1e293b", // Dark Blue
    "Electric": "#3b82f6", // Blue
    "Peaceful": "#a7f3d0" // Mint
};

export const IMAGE_STYLES = [
    "Cinematic (Film Look)", "Oil Painting (Classic)", "Watercolor (Dreamy)", 
    "Photorealistic (Sharp)", "Noir (B&W)", "Vintage (Polaroid)", "Ethereal (Soft Glow)",
    "Digital Art (Modern)", "Concept Art (Detailed)", "Charcoal Sketch (Rough)"
];

export const ASPECT_RATIOS = ["1:1", "3:4", "4:3", "16:9", "9:16"];
export const POSE_INTENSITIES = ["Subtle", "Moderate", "Intense", "Erotic (Implied)"];

export const LIGHTING_OPTIONS = [
    "Golden Hour", "Moonlight", "Candlelight", "Neon", 
    "Overcast (Soft)", "Studio (High Key)", "Rembrandt (Dramatic)", "Silhouette",
    "Firelight", "Streetlamps"
];

// Visual Gradients for Lighting
export const LIGHTING_META: Record<string, string> = {
    "Golden Hour": "linear-gradient(135deg, #f59e0b, #d97706)",
    "Moonlight": "linear-gradient(135deg, #1e3a8a, #0f172a)",
    "Candlelight": "radial-gradient(circle, #fcd34d 0%, #78350f 100%)",
    "Neon": "linear-gradient(90deg, #ec4899, #8b5cf6)",
    "Overcast (Soft)": "linear-gradient(180deg, #e2e8f0, #94a3b8)",
    "Studio (High Key)": "linear-gradient(135deg, #ffffff, #e2e8f0)",
    "Rembrandt (Dramatic)": "linear-gradient(45deg, #000000 50%, #d97706 100%)",
    "Silhouette": "linear-gradient(180deg, #fb923c, #000000)",
    "Firelight": "linear-gradient(to top, #7f1d1d, #f97316)",
    "Streetlamps": "radial-gradient(circle at 50% 0, #fbbf24, #000000)"
};

export const CAMERA_ANGLES = ["Close Up", "Medium Shot", "Wide Shot", "Over the Shoulder", "Low Angle", "High Angle (Bird's Eye)"];

export const POSITIONS_DB: Record<string, string[]> = {
    "Standing": ["Face to Face", "Back to Chest", "Leaning against wall", "Forehead against Door", "Cornered"],
    "Sitting": ["Side by Side", "On Lap (Facing)", "On Lap (Away)", "Across Table", "Legs Tangled"],
    "Lying": ["Spooning", "Face to Face (Pillow)", "Head on Chest", "Entangled Limbs", "Back to Back"],
    "Dynamic": ["Walking Away", "Chasing", "Dancing (Dip)", "Spinning", "Falling Catch"],
    "Sensual Awakening": ["Forehead Touch", "Almost Kissing", "Hair Tuck", "Neck Graze", "Hand Clasp"]
};

export const WARDROBE_LOCATIONS = ["India", "Western"];
export const WARDROBE_STYLES = ["Traditional (Grand)", "Casual", "Formal", "Nightwear", "Workwear"];
export const WARDROBE_FITS = ["Tailored / Fitted", "Loose / Flowing", "Structured", "Draped"];
export const WARDROBE_FABRICS = ["Silk", "Cotton", "Linen", "Velvet", "Chiffon", "Denim", "Wool"];
export const WARDROBE_COLORS = ["Red", "Blue", "Gold", "Black", "White", "Green", "Purple", "Pastel Pink"];
export const WARDROBE_ACCESSORIES = {
    Vijay: ["Watch", "Cufflinks", "Gold Chain", "Spectacles", "None"],
    Meena: ["Jhumkas", "Bangles", "Necklace", "Anklets", "Nose Ring", "None"]
};

// Texture Hints for Fabrics (CSS Backgrounds)
export const FABRIC_META: Record<string, string> = {
    "Silk": "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)",
    "Cotton": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzjwq1ev/k8C8RnQhYAAAQA9Kw9zRg8h8QAAAABJRU5ErkJggg==')", // Simple noise
    "Linen": "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 3px)",
    "Velvet": "radial-gradient(circle, rgba(255,255,255,0.1), transparent)",
    "Chiffon": "linear-gradient(to right, rgba(255,255,255,0.1), transparent)",
    "Denim": "repeating-linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
    "Wool": "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)"
};

export const WARDROBE_DB: Record<string, any> = {
    "India": {
        "Traditional (Grand)": {
            Vijay: ["Sherwani", "Kurta Pyjama (Silk)", "Dhoti & Angavastram"],
            Meena: ["Kanjeevaram Saree", "Lehenga Choli", "Anarkali Suit"]
        },
        "Casual": {
            Vijay: ["Cotton Kurta", "Short Kurta & Jeans", "Linen Shirt"],
            Meena: ["Cotton Saree", "Salwar Kameez (Simple)", "Kurti & Leggings"]
        },
        "Formal": {
             Vijay: ["Nehru Jacket Set", "Bandhgala"],
             Meena: ["Silk Saree (Office)", "Formal Salwar"]
        },
        "Nightwear": {
            Vijay: ["Lungis", "Loose Pyjamas"],
            Meena: ["Nightie", "Loose Cotton Set"]
        },
        "Workwear": {
             Vijay: ["Formal Shirt & Trousers"],
             Meena: ["Cotton Saree", "Churidar"]
        }
    },
    "Western": {
        "Formal": {
            Vijay: ["Three-Piece Suit", "Tuxedo", "Blazer & Chinos"],
            Meena: ["Evening Gown", "Cocktail Dress", "Power Suit"]
        },
        "Casual": {
            Vijay: ["T-shirt & Jeans", "Polo Shirt", "Hoodie"],
            Meena: ["Jeans & Top", "Sundress", "Maxi Dress"]
        },
        "Nightwear": {
            Vijay: ["Boxers & Tee", "Sweatpants"],
            Meena: ["Silk Robe", "Pajama Set"]
        },
        "Workwear": {
            Vijay: ["Button Down Shirt"],
            Meena: ["Blouse & Skirt", "Trousers"]
        }
    }
};

export const WARDROBE_DESCRIPTIONS: Record<string, string> = {
    "Sherwani": "Long coat-like garment, regal & formal",
    "Kurta Pyjama (Silk)": "Flowing tunic, soft sheen",
    "Dhoti & Angavastram": "Traditional draped lower garment",
    "Kanjeevaram Saree": "Heavy silk with gold borders",
    "Lehenga Choli": "Voluminous skirt and cropped blouse",
    "Anarkali Suit": "Frock-style long top",
    "Nehru Jacket Set": "Sleeveless jacket over kurta",
    "Bandhgala": "Closed-neck formal suit",
    "Lungis": "Casual wrapped lower garment",
    "Three-Piece Suit": "Vest, jacket, trousers - sharp",
    "Evening Gown": "Floor-length elegance"
};

// --- TIMES & WEATHER ---
export const TIMES_OF_DAY = [
    "Dawn (Blue Hour)", "Morning (Soft)", "High Noon (Harsh)", 
    "Golden Hour (Sunset)", "Twilight (Purple)", "Midnight (Dark)"
];

export const WEATHER_CONDITIONS = [
    "Clear Sky", "Monsoon Rain (Heavy)", "Light Drizzle", 
    "Foggy / Misty", "Windy", "Stormy", "Humid / Hazy"
];

export const GALLERY_IMAGES = [
    { id: 1, src: "assets/gallery-1.jpg", caption: "She was his safe place. He was her fortress." },
    { id: 2, src: "assets/gallery-2.jpg", caption: "Above the table, they were strangers. Below, he owned her." },
    { id: 3, src: "assets/gallery-3.jpg", caption: "A king on his knees for his queen." },
    { id: 4, src: "assets/gallery-4.jpg", caption: "It was just a zipper. So why did it feel like he was touching her soul?" },
    { id: 5, src: "assets/gallery-5.jpg", caption: "Tangled by the wind. Bound by something stronger." },
    { id: 6, src: "assets/gallery-6.jpg", caption: "He became her pillow, her shield, her home." },
    { id: 7, src: "assets/gallery-7.jpg", caption: "He stopped the argument with one touch." },
    { id: 8, src: "assets/gallery-8.jpg", caption: "The best ingredient was always him." },
    { id: 9, src: "assets/gallery-9.jpg", caption: "One song, two heartbeats. The world faded away." },
    { id: 10, src: "assets/gallery-10.jpg", caption: "He wasn't just checking her form. He was memorizing her curves." },
    { id: 11, src: "assets/gallery-11.jpg", caption: "He didn't just dry her hair. He untangled her soul." },
    { id: 12, src: "assets/gallery-12.jpg", caption: "Pinned between the wall and his gaze." },
    { id: 13, src: "assets/gallery-13.jpg", caption: "A polite smile for the camera. A possessive grip for her." },
    { id: 14, src: "assets/gallery-14.jpg", caption: "No more waiting. Tonight, the walls come down." },
    { id: 15, src: "assets/gallery-15.jpg", caption: "Trusting him with her eyes... and her heart." },
    { id: 16, src: "assets/gallery-16.jpg", caption: "The spices weren't the only thing burning in the kitchen." },
    { id: 17, src: "assets/gallery-17.jpg", caption: "He marked her as his. She accepted it as her destiny." },
    { id: 18, src: "assets/gallery-18.jpg", caption: "His breath on her skin was the only breeze she needed." },
    { id: 19, src: "assets/gallery-19.jpg", caption: "The First Touch: When Silence Speaks Louder Than Rituals." },
    { id: 20, src: "assets/gallery-20.jpg", caption: "The storm outside was nothing compared to the one between them." },
    { id: 21, src: "assets/gallery-21.jpg", caption: "He fixed the pleats. He unraveled her restraint." },
    { id: 22, src: "assets/gallery-22.jpg", caption: "She touched him without thinking. He felt it in his soul." },
    { id: 23, src: "assets/gallery-23.jpg", caption: "She wore his shirt better than he ever did." },
    { id: 24, src: "assets/gallery-24.jpg", caption: "Asleep, they told the truth their waking hearts were afraid to say." },
    { id: 25, src: "assets/gallery-25.jpg", caption: "If I kiss you now, I'm not going to stop." },
    { id: 26, src: "assets/gallery-26.jpg", caption: "In high definition, the only thing he saw was her." },
    { id: 27, src: "assets/gallery-27.jpg", caption: "In the chaos of the crowd, he built a wall of silence around her." },
    { id: 28, src: "assets/gallery-28.jpg", caption: "She thought she was just fixing his tie. He knew she was tightening the leash." },
    { id: 29, src: "assets/gallery-29.jpg", caption: "She tried to look away. She failed." },
    { id: 30, src: "assets/gallery-30.jpg", caption: "He didn't use a napkin. He used his thumb. And then..." }
];
