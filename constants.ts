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
        { id: 10, title: "The High Shelf", context: "Meena reaches for a jar, exposing her midriff. You are standing right behind her.", prompt: "Do you help her or step back?" }
    ]
};

export const BOOK_SAMPLE = {
    title: "Chapter 1: The Arrangement",
    content: `The ceiling fan cut through the humid Chennai air with a rhythmic click-whir, click-whir, a metronome counting down the seconds of their silence.
    Meena lay on the very edge of the mattress, her back pressed against the cool wall, as if trying to merge with the plaster. The distance between them was measured in inches of cotton sheet, but it felt like an ocean.
    "Are you asleep?" Vijay's voice was low, rough with exhaustion.
    "No," she whispered, clutching the pillow tighter.
    "Good," he said, shifting. The mattress dipped. "Because neither am I."`
};

export const NOVEL_SCENES: Record<string, string> = {
    "Chapter 4": "The pillow wall stood between them, a ridiculous fortification of white cotton. He lay on his back, staring at the ceiling fan. She was curled on her side, facing away, but he could hear the soft hitch of her breath.",
    "Chapter 12": "Under the table, amidst the chatter of her cousins, his knee brushed against hers. It wasn't an accident. He didn't pull away. Neither did she. The contact was a burning point of heat in the air-conditioned room.",
    "Chapter 41": "The bus swayed violently, throwing her back against the metal pole. Before she could stumble, his arm shot out, caging her in. He didn't touch her, but his body was a shield, hard and unyielding against the crushing crowd.",
    "Chapter 54": "They sat on the living room floor, the blueprints of their future house spread out between them. The paper crinkled as she pointed to a room. 'The library,' she said. His hand covered hers on the page. 'Our library,' he corrected."
};

export const ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const MOODS = ["Monsoon Romance", "Late Night Longing", "Morning Coffee", "Playful Friction", "Quiet Intimacy", "Stormy Passion"];

export const COUNTRIES_DATA: Record<string, string[]> = {
    "India": ["Chennai", "Mumbai", "Jaipur", "Udaipur", "Kerala"],
    "France": ["Paris", "Lyon", "Nice", "Bordeaux"],
    "Italy": ["Rome", "Venice", "Florence", "Amalfi Coast"],
    "Japan": ["Tokyo", "Kyoto", "Osaka", "Hokkaido"],
    "UK": ["London", "Edinburgh", "Bath", "Cotswolds"]
};

export const UNSPOKEN_SCENES = [
    { id: "ch4", title: "Chapter 4: The Pillow Wall", context: "They lie in bed, separated by a wall of pillows. It's their first week.", trigger: "She sighs in her sleep." },
    { id: "ch12", title: "Chapter 12: Lunch Under Table", context: "A family lunch. His leg touches hers under the table.", trigger: "She doesn't pull away." },
    { id: "ch41", title: "Chapter 41: The Bus Pole", context: "He shields her from the crowd on the bus.", trigger: "The bus brakes suddenly." },
    { id: "ch54", title: "Chapter 54: The Blueprints", context: "Planning their house. Hands touch over the paper.", trigger: "She says 'My room'." }
];

export const TENSION_DATA = [
    { chapter: 1, title: "The Agreement", snippet: "A handshake. A contract. A wall of pillows.", tension: 10, pactIntegrity: 100 },
    { chapter: 15, title: "The Saree", snippet: "He helps her with the pleats. His knuckles graze her waist.", tension: 30, pactIntegrity: 90 },
    { chapter: 35, title: "The Powercut", snippet: "Total darkness. A collision in the hallway.", tension: 55, pactIntegrity: 70 },
    { chapter: 50, title: "The Fever", snippet: "She cares for him. He is vulnerable.", tension: 75, pactIntegrity: 50 },
    { chapter: 65, title: "The Rain", snippet: "Soaked clothes. He pulls her out of the storm.", tension: 90, pactIntegrity: 20 },
    { chapter: 80, title: "The Knot", snippet: "The wall comes down. The pact is broken.", tension: 100, pactIntegrity: 0 }
];

export const PREDICTION_QUESTIONS = [
    { 
        chapter: "Chapter 10", 
        context: "Meena drops a glass in the kitchen. It shatters.", 
        options: [{id: "A", text: "He tells her to be careful."}, {id: "B", text: "He rushes to check her feet."}, {id: "C", text: "He calls the maid."}],
        correctOption: "B",
        answerExcerpt: "Before the shards had even settled, Vijay was there. He gripped her arms, lifting her bodily onto the counter. 'Don't move,' he ordered, his eyes scanning her bare feet for blood."
    },
    { 
        chapter: "Chapter 25", 
        context: "Meena is wearing a dress that is slightly too short for a family gathering.", 
        options: [{id: "A", text: "He asks her to change."}, {id: "B", text: "He stays close to her all night."}, {id: "C", text: "He makes a joke about it."}],
        correctOption: "B",
        answerExcerpt: "He didn't say a word about the hemline. He simply became her shadow. Whenever a gaze lingered too long, Vijay was there, a wall of broad shoulders and dark glares blocking the view."
    },
    { 
        chapter: "Chapter 60", 
        context: "They have their first big fight. Meena walks out to the balcony in the rain.", 
        options: [{id: "A", text: "He locks the door."}, {id: "B", text: "He waits for her to cool down."}, {id: "C", text: "He follows her instantly."}],
        correctOption: "C",
        answerExcerpt: "He didn't care about the rain or the neighbors. He followed her out, spinning her around. 'You don't get to walk away,' he shouted over the thunder. 'Not from this. Not from me.'"
    }
];