


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
            src: "https://images.unsplash.com/photo-1615875228545-9b3400a0e1ae?q=80&w=1000&auto=format&fit=crop", 
            srcSet: "https://images.unsplash.com/photo-1615875228545-9b3400a0e1ae?q=80&w=500&auto=format&fit=crop 500w, https://images.unsplash.com/photo-1615875228545-9b3400a0e1ae?q=80&w=1000&auto=format&fit=crop 1000w",
            alt: "The Jasmine Knot - A beautiful cover of a South Asian couple in a tender embrace."
        },
        {
            src: "https://images.unsplash.com/photo-1614246533105-51890d137541?q=80&w=1000&auto=format&fit=crop", 
            srcSet: "https://images.unsplash.com/photo-1614246533105-51890d137541?q=80&w=500&auto=format&fit=crop 500w, https://images.unsplash.com/photo-1614246533105-51890d137541?q=80&w=1000&auto=format&fit=crop 1000w",
            alt: "The Jasmine Knot - Romantic Tension"
        }
    ],
    amazonLink: "#",
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

// FIX: Add missing SNEAK_PEEKS export for the Snippets component.
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
        excerpt: "'Dance with me,' he repeated... He placed his left hand on her waist... 'Just sway,' he whispered. They began to move... The space between them evaporated."
    }
];

// Data for the "Finish The Scene" interactive component.
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
        { id: 1, title: "The Jasmine Scent", context: "Meena walks in wearing a red saree, smelling of jasmine. She looks terrified but breathtaking.", prompt: "What is your first move?" },
        { id: 2, title: "The Morning Tangle", context: "You wake up. Meena's leg is thrown over yours, her hand on your chest. She is fast asleep.", prompt: "Do you wake her or stay still?" },
        { id: 3, title: "The Car Ride", context: "Meena falls asleep on your shoulder while you drive. Her breath hits your neck.", prompt: "How do you drive?" },
        { id: 4, title: "The Kitchen Laugh", context: "Meena is laughing freely in the kitchen. She looks happy. You want to kiss her.", prompt: "What do you do?" },
        { id: 5, title: "The Mirror Reflection", context: "You watch her getting ready in the mirror. You walk up behind her, locking eyes in the glass.", prompt: "What do you say?" },
        { id: 6, title: "The Rain Run", context: "You run in from the rain. Meena's saree is soaked and clinging. She is shivering.", prompt: "How do you warm her up?" },
        { id: 7, title: "The Fever Touch", context: "You have a fever. Meena is rubbing Vicks on your chest. Her hands are cool and soft.", prompt: "How do you react?" },
        { id: 8, title: "The Balcony Hug", context: "Meena hugs you from behind on the balcony. Her arms wrap around your waist.", prompt: "Do you turn around?" },
        { id: 9, title: "The Slow Dance", context: "You pull her close to dance. Your hand splays on her waist. She looks up at you.", prompt: "What happens next?" },
        { id: 10, title: "The High Shelf", context: "Meena reaches for a jar, exposing her midriff. You stand behind her to help.", prompt: "Do you grab the jar or her?" }
    ]
};

export const COUNTRIES_DATA: Record<string, string[]> = {
  "India": ["Chennai", "Mumbai", "Delhi", "Bangalore", "Goa", "Jaipur", "Kolkata"],
  "USA": ["New York", "Los Angeles", "Chicago", "San Francisco", "Miami", "Seattle"],
  "UK": ["London", "Edinburgh", "Manchester", "Bath", "Oxford"],
  "France": ["Paris", "Nice", "Lyon", "Bordeaux", "Provence"],
  "Italy": ["Rome", "Venice", "Florence", "Milan", "Naples"],
  "Japan": ["Tokyo", "Kyoto", "Osaka", "Sapporo"],
  "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth"],
  "Canada": ["Toronto", "Vancouver", "Montreal"],
  "UAE": ["Dubai", "Abu Dhabi"]
};

export const ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const MOODS = [
    "Yearning (Separation)", "Playful (First Date)", "Comfort (Rainy Day)", 
    "Intense (Passion)", "Heartbroken (Angst)", "Devotion (Marriage)"
];

export const BOOK_SAMPLE = {
    title: "The Jasmine Knot: Chapters 1-3",
    content: `Chapter 1: The Scent of Jasmine... (Sample content here)`
};

// Provides authentic novel content to "ground" the AI, ensuring its responses
// are contextually accurate and stylistically consistent with the book.
export const NOVEL_SCENES: Record<string, string> = {
    "Chapter 4": `Chapter 4: The Pillow Wall. They awkwardly maneuvered into the bed... "Wait," Meena said, staring at the ceiling. "This feels... too close." Vijay sat up too. "Yeah. You're right. The gravity on this mattress is pulling us to the middle." He grabbed a couple of extra pillows from the headboard. "Let's build a fortress."`,
    "Chapter 8": `Chapter 8: The Saree Drape. He reached around her, his large hands taking the sheaf of pleats from her tired fingers. "Relax," he murmured near her ear. "Let go. I've got it."... He shook the pleats out... Then, he brought his hands to her waist to tuck them in. Meena stopped breathing. He had to tuck the fabric into the underskirt tied at her waist... His knuckles brushed against her bare skin.`,
    "Chapter 9": `Chapter 9: The Anklet Repair. "Wait, don't move," Vijay said... He knelt down immediately... He rested her foot on his knee... To fasten the hook, his fingers had to brush against her ankle bone. He traced the sensitive skin there, his touch lingering.`,
    "Chapter 12": `Chapter 12: Lunch Under the Table. Under the low, temporary rosewood table... a hand brushed hers... His pinky finger hooked around hers... Vijay's hand moved further. His large, warm palm slid over the back of her hand, covering it completely.`,
    "Chapter 20": `Chapter 20: Between the Legs. Vijay opened his legs slightly, creating a V-shape. Meena... slid into the space between his legs. She sat with her back to him... It was the "spooning" position, but vertical.`,
    "Chapter 41": `Chapter 41: The Bus Ride. Vijay had maneuvered himself directly behind her. He created a solid, human shield... Meena gasped as his broad chest pressed firmly against her back. She could feel the hard line of his shirt buttons pressing into her spine.`,
    "Chapter 43": `Chapter 43: The Aloe Gel. "Lie down," he instructed... "This might be cold," he warned. She heard him squeeze the gel onto his fingers. Then, he touched her... He applied it with agonizing slowness. His fingers moved in wide, rhythmic circles...`,
    "Chapter 54": `Chapter 54: The Slow Dance. "Dance with me," he repeated... He placed his left hand on her waist... "Just sway," he whispered. They began to move... The space between them evaporated.`,
    "Chapter 65": `Chapter 65: The Powercut Fall. "Gotcha," Vijay grunted. Strong, iron-hard hands clamped onto her upper arms. He hauled her forward... The momentum slammed her chest-to-chest against him.`,
    "Chapter 74": `Chapter 74: The Kerala Trip. His eyes were blown wide... "Room," he rasped. His voice was a growl. "We need to go to the room. Now."... He fumbled with the keycard... The door slammed shut.`,
    "Chapter 79": `Chapter 79: The Consent. "Are you sure?" he asked... She rose on her tiptoes... She kissed him. It wasn't a gentle, tentative peck. It was a collision... His arms wrapped around her waist, crushing her against him.`,
};

// Powers the "Tension Heatmap" data visualization.
export const TENSION_DATA = [
    { 
        chapter: 1, 
        tension: 10, 
        pactIntegrity: 100, 
        title: "The Wedding", 
        snippet: "Strangers in a flower-decked room, bound by duty. They sleep on the same bed, but are worlds apart, establishing the 'Friends First' pact." 
    },
    { 
        chapter: 4, 
        tension: 20, 
        pactIntegrity: 98, 
        title: "Pillow Wall", 
        snippet: "The 'Great Wall of Chennai' is built. A ridiculous, fluffy barrier of pillows is erected down the center of the mattress to keep them safe from gravity." 
    },
    { 
        chapter: 8, 
        tension: 30, 
        pactIntegrity: 95, 
        title: "Saree Drape", 
        snippet: "An accidental intimacy. Vijay helps with her pleats, his knuckles brushing against her bare waist, sending a shockwave through them both." 
    },
    { 
        chapter: 12, 
        tension: 35, 
        pactIntegrity: 90, 
        title: "Secret Handhold", 
        snippet: "Hidden beneath the dining table during a family lunch, he captures her hand. A secret, possessive claim amidst a crowded room." 
    },
    { 
        chapter: 17, 
        tension: 45, 
        pactIntegrity: 85, 
        title: "Tie Ritual", 
        snippet: "A new morning routine. Meena fixes his tie, standing deep in his personal space, her hands brushing his chest, inhaling his scent." 
    },
    { 
        chapter: 20, 
        tension: 60, 
        pactIntegrity: 80, 
        title: "Between Legs", 
        snippet: "Vertical spooning. Vijay sits behind her on the floor, his legs bracketing hers, creating a cage of warmth while they watch TV." 
    },
    { 
        chapter: 41, 
        tension: 70, 
        pactIntegrity: 70, 
        title: "Bus Ride", 
        snippet: "Forced proximity in a crowded bus. He shields her with his body, his chest pressed firmly against her back, protecting and possessing her." 
    },
    { 
        chapter: 54, 
        tension: 80, 
        pactIntegrity: 50, 
        title: "Slow Dance", 
        snippet: "A rainy Sunday. They dance in the living room. 'If I kiss you now,' he warns, 'I won't stop.' The pact hangs by a thread." 
    },
    { 
        chapter: 65, 
        tension: 88, 
        pactIntegrity: 30, 
        title: "Powercut", 
        snippet: "Darkness engulfs the apartment. Meena stumbles; Vijay catches her. In the void, he holds her tight, anonymity emboldening his desire." 
    },
    { 
        chapter: 74, 
        tension: 95, 
        pactIntegrity: 10, 
        title: "Kerala Trip", 
        snippet: "The peak of restraint. Drugged and desperate, Vijay locks himself in the bathroom to protect her from his own unravelling control." 
    },
    { 
        chapter: 79, 
        tension: 100, 
        pactIntegrity: 0, 
        title: "The Consent", 
        snippet: "The rain returns. The walls crumble. 'I don't want a friend,' she whispers. The door closes, and the pact is dissolved forever." 
    },
];

// Content for the interactive "Prediction Game" component.
export const PREDICTION_QUESTIONS = [
    {
        id: 1,
        chapter: "Chapter 43: The Aloe Gel",
        context: "Meena has a terrible sunburn on her back. Vijay offers to apply Aloe Vera gel.",
        options: [
            { id: 'A', text: "He applies it quickly and leaves the room." },
            { id: 'B', text: "He applies it with agonizing slowness, massaging her shoulders." },
            { id: 'C', text: "He hands her the tube and tells her to do it herself." }
        ],
        correctOption: 'B',
        answerExcerpt: "He didn't just slap it on. He applied it with agonizing slowness. His fingers moved in wide, rhythmic circles, gliding over the inflamed skin... 'Is that... better?' he asked, his voice dropping to a low, husky rumble."
    },
    {
        id: 2,
        chapter: "Chapter 65: The Powercut",
        context: "The lights go out. Meena stumbles in the dark hallway. Vijay catches her.",
        options: [
            { id: 'A', text: "He steadies her and immediately lets go." },
            { id: 'B', text: "He pulls her into his chest and holds her there in the dark." },
            { id: 'C', text: "He uses his phone torch to guide her to the sofa." }
        ],
        correctOption: 'B',
        answerExcerpt: "Strong, iron-hard hands clamped onto her upper arms. He hauled her forward... The momentum slammed her chest-to-chest against him. Meena gasped... They stood frozen in the black void."
    },
    {
        id: 3,
        chapter: "Chapter 20: Sunday Afternoon",
        context: "They are watching a movie on the laptop. Meena asks Vijay to make space on the floor.",
        options: [
            { id: 'A', text: "He moves to the sofa." },
            { id: 'B', text: "He opens his legs into a V-shape so she can sit between them." },
            { id: 'C', text: "He puts a cushion between them." }
        ],
        correctOption: 'B',
        answerExcerpt: "Vijay opened his legs slightly, creating a V-shape. Meena... slid into the space between his legs. She sat with her back to him... It was a position of extreme intimacy."
    }
];

// Powers the "Unspoken Thoughts" component, providing detailed prompts for the AI.
export const UNSPOKEN_SCENES = [
    {
        id: "ch8",
        title: "Chapter 8: The Saree Drape",
        context: "Vijay is standing behind Meena, helping her with the pleats. He has to tuck the silk into her underskirt.",
        trigger: "His knuckles brush against her bare waist.",
        promptContext: "Vijay's internal monologue. He is fighting the urge to linger. The skin contact shocks him. He realizes she is not just a wife on paper."
    },
    {
        id: "ch41",
        title: "Chapter 41: The Bus Ride",
        context: "The bus is packed. Vijay is shielding Meena from the crowd. A sudden brake throws them together.",
        trigger: "His chest is pressed firmly against her back.",
        promptContext: "Vijay's internal reaction. He is physically affected but must remain the 'protector'. He feels her softness against his hardness and hates the crowd for touching her."
    },
    {
        id: "ch54",
        title: "Chapter 54: The Slow Dance",
        context: "It's raining. They are swaying to old music in the living room. The distance has evaporated.",
        trigger: "He pulls her closer, his hand splaying on her lower back.",
        promptContext: "Vijay's thoughts right before he almost kisses her. The battle between his promise ('until you beg') and his overwhelming desire to claim her right now."
    },
    {
        id: "ch20",
        title: "Chapter 20: Between the Legs",
        context: "They are sitting on the floor watching a laptop. Meena is sitting between his legs, leaning back against him.",
        trigger: "She relaxes, her head resting on his chest.",
        promptContext: "Vijay's reaction to being used as a chair. The intimacy of being her 'safe space' while his body reacts to her proximity. He wants to wrap his arms around her but holds back."
    },
    {
        id: "ch72",
        title: "Chapter 72: The Toe Rings",
        context: "Meena's silver toe rings are stuck. Vijay is kneeling at her feet to remove them.",
        trigger: "He presses his lips to her ankle bone.",
        promptContext: "Vijay's thought process during this act of devotion. It feels like worship to him. He is telling her she belongs to him without saying a word."
    },
    {
        id: "ch67",
        title: "Chapter 67: The Collar Pull",
        context: "They are in the dark hallway during a powercut. Meena pulls him down by his collar.",
        trigger: "Her breath hits his face in the dark.",
        promptContext: "The anonymity of the dark makes him bold. He is on the verge of losing control. He realizes she wants him too."
    }
];

export const CHARACTER_BIOS = {
    "Vijay": {
        role: "The Husband",
        occupation: "Senior Data Analyst",
        traits: ["Protective", "Restrained", "Intense", "Observant"],
        description: "A man of few words but deep currents. Vijay is the anchor in the storm. He treats his marriage like a sacred duty, but his desire for Meena threatens to break his carefully constructed control. He notices everything—the way she breathes, the scent of her hair, the tremble in her hands.",
        motivation: "To win her love, not just her duty. To be her safe harbor."
    },
    "Meena": {
        role: "The Wife",
        occupation: "Assistant Professor (English Lit)",
        traits: ["Spirited", "Romantic", "Over-thinker", "Resilient"],
        description: "A lover of poetry and grand romances, Meena finds herself in an arranged marriage that feels terrifyingly real. She is vibrant, intelligent, and deeply affected by Vijay's quiet intensity. She oscillates between fear of the unknown and a growing, undeniable attraction.",
        motivation: "To find a love that matches the books she teaches. To bridge the gap between them."
    }
};