

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

// Refined "S-Curve" Data for better Slow Burn visualization
// Tension starts low and rises non-linearly.
// Pact Integrity starts high and crumbles inversely.
export const TENSION_DATA = [
    { chapter: 1, title: "The Agreement", snippet: "A handshake. A contract. A wall of pillows.", tension: 2, pactIntegrity: 98 },
    { chapter: 4, title: "The Pillow Wall", snippet: "Separate sides. The cotton barrier is absolute.", tension: 5, pactIntegrity: 95 },
    { chapter: 8, title: "The Lizard Rescue", snippet: "He chases it out. She grips his arm in fear.", tension: 8, pactIntegrity: 92 },
    { chapter: 12, title: "Lunch Touch", snippet: "Knees brush under the table. No one pulls away.", tension: 12, pactIntegrity: 88 },
    { chapter: 16, title: "The Saree Pleats", snippet: "His knuckles graze her bare waist.", tension: 15, pactIntegrity: 85 },
    { chapter: 20, title: "Morning Reflection", snippet: "Caught staring in the mirror. Eyes lock.", tension: 20, pactIntegrity: 80 },
    { chapter: 24, title: "The Jealousy", snippet: "A cousin flirts. Vijay's jaw tightens.", tension: 25, pactIntegrity: 75 },
    { chapter: 28, title: "The Salesman", snippet: "He steps between her and the stranger.", tension: 30, pactIntegrity: 70 },
    { chapter: 32, title: "Phone Call", snippet: "He ignores work for her. The shift begins.", tension: 35, pactIntegrity: 65 },
    { chapter: 36, title: "Powercut Collision", snippet: "Total darkness. Pressed against the wall.", tension: 42, pactIntegrity: 58 },
    { chapter: 40, title: "Car Ride Nap", snippet: "She sleeps on his shoulder. He drives one-handed.", tension: 48, pactIntegrity: 52 },
    { chapter: 44, title: "Temple Crowd", snippet: "He cages her with his body to shield her.", tension: 55, pactIntegrity: 45 },
    { chapter: 48, title: "The Umbrella", snippet: "One small umbrella. Hips flush together.", tension: 62, pactIntegrity: 38 },
    { chapter: 52, title: "The Fever", snippet: "She wipes his brow. He leans into her touch.", tension: 70, pactIntegrity: 30 },
    { chapter: 56, title: "The Slow Dance", snippet: "A waltz in the living room. Silence is loud.", tension: 78, pactIntegrity: 22 },
    { chapter: 60, title: "The Fight", snippet: "Passion explodes as anger. The distance breaks.", tension: 85, pactIntegrity: 15 },
    { chapter: 64, title: "Photo Album", snippet: "Tracing her face in the picture. 'Beautiful.'", tension: 88, pactIntegrity: 12 },
    { chapter: 68, title: "The Rain Rescue", snippet: "Soaked clothes. He pulls her from the storm.", tension: 92, pactIntegrity: 8 },
    { chapter: 72, title: "Balcony Night", snippet: "Stargazing. Whispers near the ear.", tension: 95, pactIntegrity: 5 },
    { chapter: 76, title: "Jasmine Gift", snippet: "Flowers for her hair. His hands shake.", tension: 98, pactIntegrity: 2 },
    { chapter: 80, title: "The Knot", snippet: "The wall comes down. The pact is broken.", tension: 100, pactIntegrity: 0 }
];

export const PREDICTION_QUESTIONS = [
    { 
        chapter: "Chapter 10", 
        context: "Meena drops a glass in the kitchen. It shatters loudly.", 
        options: [{id: "A", text: "He tells her to be careful."}, {id: "B", text: "He rushes to check her bare feet."}, {id: "C", text: "He calls the maid to clean it."}],
        correctOption: "B",
        answerExcerpt: "Before the shards had even settled, Vijay was there. He gripped her arms, lifting her bodily onto the counter. 'Don't move,' he ordered, his eyes scanning her bare feet for blood."
    },
    { 
        chapter: "Chapter 25", 
        context: "Meena wears a dress that is slightly shorter than usual for a family gathering. Her aunt stares.", 
        options: [{id: "A", text: "He asks her to change."}, {id: "B", text: "He stays close to her all night."}, {id: "C", text: "He makes a joke to defuse tension."}],
        correctOption: "B",
        answerExcerpt: "He didn't say a word about the hemline. He simply became her shadow. Whenever a gaze lingered too long, Vijay was there, a wall of broad shoulders and dark glares blocking the view."
    },
    { 
        chapter: "Chapter 60", 
        context: "They have their first big fight. Meena walks out to the balcony in the pouring rain.", 
        options: [{id: "A", text: "He locks the balcony door."}, {id: "B", text: "He waits inside for her to cool down."}, {id: "C", text: "He follows her instantly."}],
        correctOption: "C",
        answerExcerpt: "He didn't care about the rain or the neighbors. He followed her out, spinning her around. 'You don't get to walk away,' he shouted over the thunder. 'Not from this. Not from me.'"
    },
    {
        chapter: "Chapter 2",
        context: "It's their first morning. Meena is nervous about coffee.",
        options: [{id: "A", text: "He asks her to make it."}, {id: "B", text: "He makes it exactly how she likes it."}, {id: "C", text: "He leaves for work without speaking."}],
        correctOption: "B",
        answerExcerpt: "She walked into the kitchen to find a steaming cup waiting. 'Sugar, no milk,' he said without turning around. He had remembered."
    },
    {
        chapter: "Chapter 5",
        context: "Meena spills ink on Vijay's important work papers.",
        options: [{id: "A", text: "He yells in frustration."}, {id: "B", text: "He checks her hands for stains first."}, {id: "C", text: "He silently cleans the desk."}],
        correctOption: "B",
        answerExcerpt: "Meena froze, expecting anger. Instead, Vijay grabbed a tissue and wiped her fingers. 'Ink is hard to scrub off,' he murmured, ignoring the ruined contract."
    },
    {
        chapter: "Chapter 14",
        context: "The power goes out while they are eating dinner.",
        options: [{id: "A", text: "He fumbles for a flashlight."}, {id: "B", text: "He moves his chair closer in the dark."}, {id: "C", text: "He complains about the electricity board."}],
        correctOption: "B",
        answerExcerpt: "In the pitch black, she heard the scrape of wood on tile. His voice came from inches away. 'Don't be scared,' he whispered. 'I'm right here.'"
    },
    {
        chapter: "Chapter 18",
        context: "A cousin mentions Meena's old college crush at a party.",
        options: [{id: "A", text: "He asks details about him."}, {id: "B", text: "He grips his glass until his knuckles turn white."}, {id: "C", text: "He laughs it off."}],
        correctOption: "B",
        answerExcerpt: "Vijay's expression didn't change, but Meena heard the sharp 'clink' of his ring hitting the glass. His hold on the tumbler was lethal."
    },
    {
        chapter: "Chapter 22",
        context: "Vijay has a nightmare and wakes up shouting.",
        options: [{id: "A", text: "He turns away in shame."}, {id: "B", text: "He goes to the living room."}, {id: "C", text: "He lets Meena hold him."}],
        correctOption: "C",
        answerExcerpt: "For the first time, he didn't pull away. He collapsed against her chest, his breathing ragged, letting her fingers comb through his sweat-dampened hair."
    },
    {
        chapter: "Chapter 30",
        context: "A salesman touches Meena's shoulder to demonstrate a saree drape.",
        options: [{id: "A", text: "He pays and leaves."}, {id: "B", text: "He steps between them immediately."}, {id: "C", text: "He asks Meena if she likes the color."}],
        correctOption: "B",
        answerExcerpt: "Vijay moved faster than thought. He stepped between the man and his wife, taking the silk fabric into his own hands. 'I'll handle the pleats,' he said, his voice ice cold."
    },
    {
        chapter: "Chapter 33",
        context: "Vijay gets a work call at 2 AM while they are talking.",
        options: [{id: "A", text: "He takes it on the balcony."}, {id: "B", text: "He rejects it and pulls her closer."}, {id: "C", text: "He answers apologetically."}],
        correctOption: "B",
        answerExcerpt: "The phone lit up the dark room. Vijay reached out, silenced it, and tossed it onto the floor. 'Continue,' he said, his focus entirely on her lips."
    },
    {
        chapter: "Chapter 38",
        context: "Meena burns the sambar for lunch.",
        options: [{id: "A", text: "He orders pizza."}, {id: "B", text: "He eats it without complaint."}, {id: "C", text: "He teaches her how to cook."}],
        correctOption: "B",
        answerExcerpt: "It was acrid and smoky. Vijay took a second helping. 'It's distinct,' he said, catching her eye. 'I like distinct.'"
    },
    {
        chapter: "Chapter 45",
        context: "A stranger bumps into Meena roughly at the temple.",
        options: [{id: "A", text: "He yells at the stranger."}, {id: "B", text: "He pulls her into his chest to shield her."}, {id: "C", text: "He asks if she is okay."}],
        correctOption: "B",
        answerExcerpt: "Before she could stumble, she was buried in his shirt. His arms formed a cage around her, hard and unyielding against the crushing crowd."
    },
    {
        chapter: "Chapter 48",
        context: "They are walking in the rain with only one small umbrella.",
        options: [{id: "A", text: "He gives it to her."}, {id: "B", text: "He pulls her by the waist to keep her dry."}, {id: "C", text: "He hails an auto."}],
        correctOption: "B",
        answerExcerpt: "He didn't offer the umbrella. Instead, he hooked an arm around her waist and yanked her flush against his side. 'Stay close,' he muttered. 'Or you'll get wet.'"
    },
    {
        chapter: "Chapter 52",
        context: "She struggles with the clasp of her necklace.",
        options: [{id: "A", text: "He watches her struggle."}, {id: "B", text: "He brushes her hands away and does it himself."}, {id: "C", text: "He tells her to hurry up."}],
        correctOption: "B",
        answerExcerpt: "His fingers brushed hers aside. 'Stop fidgeting,' he breathed against her neck, his warm hands deft and sure against the delicate gold chain."
    },
    {
        chapter: "Chapter 55",
        context: "Meena is sick with a high fever.",
        options: [{id: "A", text: "He calls his mother."}, {id: "B", text: "He stays home to apply cool cloths."}, {id: "C", text: "He sleeps in the guest room."}],
        correctOption: "B",
        answerExcerpt: "The CEO of Hart Analytics took a sick day. He spent it dipping a cloth in ice water and pressing it to her forehead, his face lined with worry."
    },
    {
        chapter: "Chapter 58",
        context: "A female colleague flirts with Vijay at a party.",
        options: [{id: "A", text: "He introduces Meena immediately."}, {id: "B", text: "He ignores the colleague."}, {id: "C", text: "He smiles politely."}],
        correctOption: "A",
        answerExcerpt: "He didn't even smile. He reached out, grabbed Meena's hand, and interlaced their fingers. 'Have you met my wife?' he interrupted, his tone final."
    },
    {
        chapter: "Chapter 62",
        context: "They look at their awkward wedding photos from months ago.",
        options: [{id: "A", text: "He laughs at them."}, {id: "B", text: "He traces her face in the photo."}, {id: "C", text: "He closes the album."}],
        correctOption: "B",
        answerExcerpt: "His finger lingered on her image in the bridal silk. 'You looked terrified,' he noted softly. 'I wish I had known you then.'"
    },
    {
        chapter: "Chapter 67",
        context: "Stargazing on the roof. Meena shivers in the cold.",
        options: [{id: "A", text: "He says let's go inside."}, {id: "B", text: "He puts his jacket on her shoulders."}, {id: "C", text: "He rubs her arms."}],
        correctOption: "B",
        answerExcerpt: "He stripped off his suit jacket and draped it over her. It was heavy, warm, and smelled entirely of him. He didn't ask for it back."
    },
    {
        chapter: "Chapter 72",
        context: "Meena twists her ankle on the stairs.",
        options: [{id: "A", text: "He helps her walk."}, {id: "B", text: "He carries her bridal style."}, {id: "C", text: "He calls a doctor immediately."}],
        correctOption: "B",
        answerExcerpt: "He didn't let her take a single step. He scooped her up, ignoring her protests, carrying her up three flights of stairs as if she weighed nothing."
    },
    {
        chapter: "Chapter 75",
        context: "He buys her a random gift on a Tuesday.",
        options: [{id: "A", text: "A diamond necklace."}, {id: "B", text: "Fresh jasmine flowers."}, {id: "C", text: "A new book."}],
        correctOption: "B",
        answerExcerpt: "It wasn't gold. It was a string of fresh, dew-covered jasmine wrapped in newspaper. 'For your hair,' he said gruffly."
    },
    {
        chapter: "Chapter 78",
        context: "They are inches apart in the kitchen. The tension is breaking.",
        options: [{id: "A", text: "He backs away."}, {id: "B", text: "He leans in, waiting for a sign."}, {id: "C", text: "He kisses her immediately."}],
        correctOption: "B",
        answerExcerpt: "He didn't take. He offered. He leaned in until their breaths mingled, waiting, giving her the power to close the final inch."
    },
    {
        chapter: "Chapter 8",
        context: "A lizard on the wall scares Meena.",
        options: [{id: "A", text: "He laughs at her fear."}, {id: "B", text: "He chases it out gently."}, {id: "C", text: "He kills it."}],
        correctOption: "B",
        answerExcerpt: "He didn't mock her. He quietly guided the creature out with a broom. 'It's gone,' he assured her, checking the corners to make her feel safe."
    },
    {
        chapter: "Epilogue",
        context: "They are discussing having children.",
        options: [{id: "A", text: "He wants a boy."}, {id: "B", text: "He is terrified but wants a girl like her."}, {id: "C", text: "He says not yet."}],
        correctOption: "B",
        answerExcerpt: "'A daughter,' he whispered against her hair. 'I want a daughter. But only if she has your fire.'"
    }
];