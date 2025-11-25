
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
    kindleUnlimitedLink: "https://www.amazon.in/kindle-dbs/hz/subscribe/ku?passThroughAsin=B0G3HND3FQ",
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
    title: "The Jasmine Knot: Exclusive Preview",
    content: `Chapter 1: The Scent of Jasmine\nThe noise had been relentless. It was a physical assault that had lasted for what felt like a lifetime rather than just two days. Meena felt as though she had been living inside the hollow belly of a giant drum. The deafening, rhythmic thumping of the thavil had become her heartbeat, replacing her own pulse with a frantic, heavy bass. The piercing, high-pitched shrill of the nadaswaram seemed to vibrate right through the marrow of her bones, leaving a low-level buzz in her ears that simply wouldn't go away.\nIt was a typical, grand Vellore wedding magnificent, chaotic, and utterly exhausting. Thousands of faces she barely recognized had flashed before her like a kaleidoscope on fast-forward. It was a blur of heavy Kanjeevaram silk sarees in blinding shades of parrot green and chili red, the glitter of antique temple jewelry that weighed down earlobes and necks, and the weight of curious, assessing eyes judging the new bride.\nIs she fair enough? Is she tall enough? Does she smile enough?\nThe blinding white flashes of the professional cameras had left permanent purple spots dancing in her peripheral vision. Her cheeks actually ached, a dull muscular throb from hours of forced, demure smiling at distant relatives who grabbed her hand too hard and pinched her cheeks with aggressive affection.\nBut now, that cacophony was finally fading into the distance. The guests were dispersing, the dining hall was being cleared, and the cars were driving away. The noise was being replaced by something far more terrifying, far heavier: silence.\nMeena stood alone in the long, dimly lit corridor of her ancestral home in Vellore. The heavy teak door of the nuptial chamber loomed in front of her, dark and imposing, like the entrance to a different world. Behind her, down the winding hallway, she could still hear the faint, muffled chatter of close relatives dissecting the feast arguing about whether the sambhar had enough salt or if the payasam was too sweet but here, in this shadow, she was isolated.\nHer heart hammered against her ribs like a frantic bird trapped in a cage, desperate for flight but finding no escape. She looked down at her hands; they were trembling uncontrollably. The intricate henna patterns, dark and rusty red on her skin, seemed to mock her nervousness with their beauty. She was twenty-six, a grown woman, an Assistant Professor who lectured classrooms full of unruly college students with effortless confidence. She could debate literature and politics without blinking. Yet, standing before this wooden door, clutching a tray of cut fruits and sweets she didn't want, she felt like a terrified child being sent to the principal's office for a crime she didn't commit.\n"Just breathe, Meena," she whispered to herself, her voice sounding thin and reedy in the quiet hallway. "It’s just Vijay. It’s just a room. It’s just... marriage."\nThat was the problem. She barely knew him. He was the "good match" her parents had found a Senior Data Analyst, well-settled, from a decent, respectable family. On paper, he was perfect. A horoscope match made in heaven. In reality, he was a stranger she was expected to sleep next to for the rest of her life, starting tonight. They had spoken twice over the phone stilted, polite conversations about hobbies and career goals and met once in a coffee shop with their parents hovering three tables away like hawk-eyed chaperones.\nShe reached out, her fingers brushing the cool, polished wood of the door. It felt solid, unyielding. Taking a deep, shuddering breath that filled her lungs with the scent of incense and fear, she pushed it open.\nThe air inside hit her like a physical wall heavy, humid, and cloying. It wasn't just the lack of ventilation in the old house; the room was drowning in the scent of flowers. It was suffocating. The four-poster bed, a massive heirloom piece of dark rosewood that dominated the room, was draped in thick, suffocating layers of jasmine and tuberose strings. They hung from the posts, lay across the pillows, and festooned the headboard. The scent was narcotic, sweet to the point of dizziness, a thick perfume that coated the back of her throat. It was the smell of a First Night unmistakable, overwhelming, and screaming of expectation.\nMeena stepped inside and softly closed the door behind her. The click of the latch sounded like a gunshot in the silence, sealing her fate.\nVijay was there.\nHe was sitting on the edge of the mattress, bathed in the warm, golden glow of a single bedside night lamp. The rest of the room was steeped in shadow, making the bed feel like a lit stage where a play she hadn't rehearsed for was about to begin. He had discarded the heavy, formal wedding turban that had made him look like a prince, and his dark hair was slightly messed up, as if he had run his fingers through it in frustration or sheer exhaustion.\nHe didn't look up immediately. Meena took a moment to just look at him really look at him without the buffer of a hundred guests and the noise of the wedding hall between them.\nHe was... substantial. That was the first word that came to her mind. In the matrimonial photos, he had looked fit, average. But in the flesh, sitting just a few feet away in the intimacy of a bedroom, the sheer visual impact of his masculinity hit her hard. He took up space. His silk shirt was unbuttoned at the top, the first two buttons undone to reveal the dark hollow of his throat and a hint of chest hair. His sleeves were rolled up to his elbows, exposing forearms that were veined and tensed, the muscles shifting under his skin as he leaned forward, resting his elbows on his knees.\nHe looked powerful, yes, but he also looked tired. There was a heaviness in the slope of his broad shoulders that mirrored her own exhaustion.\nSuddenly, he lifted his head. His eyes found hers.\nMeena’s breath hitched in her throat. His eyes were dark, intense, and completely unreadable. They weren't the polite, smiling eyes he had worn for the guests on the stage or the respectful gaze he offered her father. These were raw, stripped of social pretense. He looked at her, sweeping his gaze slowly from the hem of her heavy red Kanjeevaram saree, up over her waist, to her face. The air in the room seemed to thicken, charged with a sudden, spiking tension that made the fine hairs on her arms stand up.\nShe breathed in, noticing a new scent cutting through the overwhelming flowers. It was sharp, clean a mix of expensive musk aftershave and the natural, salty scent of a man who had been through a long, physical day. It was his scent. It fought for dominance against the jasmine, spellbound by the sensory overload of being alone with a man who was now her husband.\n"Hi," he said. His voice was deeper than she remembered, rough with the fatigue of the day, creating a low rumble in the quiet room.\n"Hi," Meena squeaked. She winced internally, cleared her throat, and tried to find her professor voice. "Hi."\nShe took a tentative step forward, the heavy silver anklets on her feet chiming softly. The sound was incredibly loud in the quiet room ching, ching a delicate, feminine announcement of her movement that seemed to draw attention to her ankles and feet.\nVijay shifted, sitting up straighter, the mattress groaning slightly under him. The movement drew her eyes to his hands large, broad-palmed, resting on his thighs. Hands that were now legally allowed to touch her. The realization made her knees weak.\n"You finally escaped the aunties? I saw them circling you like sharks," he said, a small, tired smile playing on his lips.\nMeena managed a weak, genuine smile in return. "I think my Chithi was planning to give me a two-hour lecture on 'duties of a wife' until dawn. I had to literally run away while she was drinking water."\nVijay chuckled, a low, warm sound that seemed to vibrate in the air and soften the edges of the tension. "My uncle cornered me about the stock market. During the reception. Right when we were cutting the cake. I thought I was going to pass out from boredom right there on the stage."\nThe small exchange of words loosened a tiny knot in Meena's chest, but the massive tension remained. It was the elephant in the room the flower-bedecked bed, the closed door, the societal expectations pressing down on them like the roof.\nMeena moved closer, placing the tray of fruits and sweets on the small table near the door. Her bangles clinked as she set it down. Vijay watched her, his gaze following her movements with a predator's focus. He wasn't leering, but there was an intensity in his eyes that made her skin prickle with heat. He looked at her like he was trying to solve a complex puzzle, or perhaps, like he was trying to restrain himself.\n"The room..." Meena started, gesturing vaguely at the flower-draped bed, needing to break the silence. "It's a bit... much, isn't it?"\nVijay looked at the bed, then back at her, a wry, dry smile playing on his lips. "It looks like a garden threw up in here. I’m honestly worried I might wake up with a bee in my ear or pollen up my nose."\nMeena laughed, a genuine sound this time. "I think my mother bought the entire flower market's stock. She takes these things very seriously."\nShe took another step towards the bed, and the reality of the situation crashed back down on her. There was nowhere else to sit. The only chair in the room was covered with his bag and clothes. There was just the bed, and him on it.\nVijay seemed to sense her hesitation. He shifted slightly, moving to the far left, creating a space for her. "Sit, Meena. You’ve been standing for six hours in those heels. Your feet must be killing you."\n"They are," she admitted, the ache in her arches suddenly sharp.\nShe sat down on the edge of the bed, maintaining a respectable, rigid distance of about two feet between them. The mattress dipped under her weight, tilting her slightly towards him. She stiffened, engaging her core to correct her balance, refusing to slide closer.\nSilence descended again, but it wasn't empty. It was heavy with the unspoken. Meena stared at her hands in her lap, twisting her wedding ring, acutely aware of his presence next to her. She could feel the heat radiating from his body a steady, warm hum that seemed to reach out and touch her bare arm even without physical contact.\nShe glanced at him sideways through her lashes. He was looking at her profile. His gaze dropped to her neck, where the heavy gold jewelry rested against her skin, then lower, to where the saree pallu draped over her chest. He looked away quickly, almost guiltily, scrubbing a hand over his face, his jaw tightening as he stared at the wall.\nHe’s nervous too, Meena realized with a sudden jolt of clarity. He’s a man, a stranger, in a room with a woman he’s legally allowed to... do anything with. And he’s holding back. He’s fighting something.\nThe thought was both terrifying and strangely thrilling. It made him human. It made the air in the room thick with potential, a heavy cloud waiting to burst.\nChapter 2: The Milk and the Tremor\nThe tradition was old, cliché, and frankly, extremely awkward. On the bedside table, right next to the lamp, sat a traditional silver tumbler filled with warm, saffron-infused milk. It was steaming slightly, the condensation beading on the intricate carvings of the silver. It was supposed to be for energy, or fertility, or whatever the old wives' tales said about stamina for the wedding night. Meena stared at it like it was a live grenade that was about to explode.\n"You should drink it," Vijay said softly, gesturing to the glass with a nod of his head. The silence in the room was so profound that his voice felt like a touch. "You didn't eat much at the reception. I was watching you. You pushed the rice around your plate, but you barely took three bites."\nMeena looked at him, surprised, her eyes widening. The heavy gold jhumkas in her ears swayed with the movement. "You noticed?"\n"I notice a lot of things," he said, his voice dropping to a lower register, intimate and observant. He wasn't looking at the milk; he was looking at her mouth. "You looked overwhelmed. Like you wanted to disappear. Go on. Drink it. It’ll help you sleep, if nothing else."\nMeena reached out and picked up the tumbler. The metal was warm against her palm, almost hot. But as she lifted it from the table, her nerves finally betrayed her completely. Her hand started to shake.\nIt wasn't just a little, imperceptible tremble; it was a visible, violent vibration that traveled from her wrist to her fingertips. The heavy silver rings on her fingers clattered against the metal tumbler tink, tink, tink a rapid, staccato rhythm that echoed loudly in the silence of the room. The golden liquid sloshed dangerously near the rim.\n"Oh god," she whispered, mortified.\nShe tried to steady it with her other hand, clutching the cup with both palms, but that only made it worse, highlighting her total loss of control. A single droplet of golden milk spilled over the rim and landed on her henna-stained knuckles, burning slightly. She felt humiliated, heat rising to her cheeks that had nothing to do with the temperature of the room. Here she was, a grown woman, shaking like a leaf in a storm just because a handsome man was sitting next to her.\nVijay tracked the movement with sharp, hawk-like eyes. He didn't mock her. He didn't laugh. He didn't look away to spare her embarrassment. His gaze traveled from her shaking hands to the rapid rise and fall of her heavy silk saree as her breathing hitched in panic. He saw the flush creeping up her neck, staining her skin red.\nHe didn't stay seated.\nIn one fluid, decisive motion, he stood up. The mattress shifted drastically, and suddenly he was looming over her. He took a step into her personal space, closing the gap between them, his height towering over her seated form. Meena froze, looking up at him, her eyes wide and fearful, the glass still rattling in her grip.\n"Here," he whispered, his voice rough but incredibly gentle. "Let me."\nHe reached out. His hand was large much larger than hers broad-palmed and long-fingered, with a light dusting of dark hair on the back. It was a rough hand, the hand of a man who lifted weights, who worked with his hands, calloused and firm. He covered her hand completely, his fingers wrapping around both her trembling fist and the cold metal tumbler, engulfing her in his grip.\nThe contact was electric.\nMeena gasped, a small, sharp intake of breath that sounded too loud. His skin was burning hot compared to her cold, clammy hands. It was a shock to her system, a contrast that was grounding and heavy. He didn't just hold the glass; he held her. His thumb pressed firmly against the back of her hand, applying just enough pressure to stabilize the tremors.\n"Easy," he murmured, bending his knees slightly so his face was closer to her level. "I've got you. I've got it. Just breathe."\nThe heat from his palm seemed to seep instantly into her skin, rushing up her arm, bypassing her brain, and settling deep in her chest. It startled her into stillness. For a second, the shaking stopped, replaced by a rigid, hyper-aware tension. This was the first time he had touched her like this skin on skin, without a crowd, without a ritual demanding it. It wasn't a handshake; it wasn't a blessing. It was intimate. It was raw. It was a touch that claimed control.\nThe air between them crackled, thick enough to cut with a knife. It was that static charge born of "stranger danger" colliding head-on with undeniable biology. They were two young, healthy people locked in a soundproof room, and the biology was screaming. His scent that musk and sweat was stronger now that he was this close, filling her nose. Meena could see the texture of his skin, the pores, the dark stubble on his jaw that was just starting to grow out, the pulse beating steadily in the hollow of his neck.\n"I... I'm sorry," she stammered, her voice barely a whisper, staring at the top button of his shirt. "I don't know why I'm... I'm just..."\n"Don't apologize," Vijay said firmly, cutting her off. His eyes were locked on hers, dark and intense, refusing to let her look away. "It's a weird situation, Meena. It's okay to be nervous. Hell, I'm nervous too."\nMeena looked up, surprised. "You don't look nervous," she countered, her voice shaky, looking at the steadiness of his hand over hers. "You look... solid. Like a rock."\nA corner of his mouth quirked up in a half-smile, self-deprecating and charming. "I'm good at hiding it. It's a professional hazard. But right now? My heart is beating just as fast as yours. Probably faster."\nHe gently, slowly pried the glass away from her rigid fingers. As he pulled it back to set it down, his fingers grazed the sensitive skin of her inner wrist. It was a light, accidental touch just the tips of his calloused fingers trailing over the soft, pale skin where her blue veins were visible.\nA jolt of electricity shot straight to Meena’s core, hot and sharp. It was physical, visceral. Her knees, even though she was sitting, felt like they turned to water. A shiver ran down her spine, making her shoulders twitch involuntarily.\nVijay noticed. Of course, he noticed. He missed nothing. His eyes darkened, the pupils dilating until his irises were almost entirely black. He paused, the glass hovering mid-air, his gaze dropping to her wrist where he had just touched her, watching the reaction of her skin, then snapping back up to her lips.\nFor a heartbeat, neither of them breathed. The sound of the air conditioner hummed in the background, but all Meena could hear was the blood rushing in her ears like a waterfall. He was so close. If he leaned in just six inches, he could kiss her. And looking at the way his gaze was fixed on her mouth, hungry and focused, she thought he might. She almost wanted him to.\nBut then, he stepped back.\nHe placed the milk on the bedside table with a soft clink. The distance between them opened up again, physically, but the air was still vibrating with the energy of that touch, leaving a ghost sensation on her wrist.\nMeena let out a breath she didn't know she was holding, her hand still tingling where he had held it. She clutched her hands together in her lap, trying to preserve that warmth, terrified and exhilarated all at once.\nChapter 3: The Pact and the Missed Kiss\nVijay turned away from her, running a hand through his thick hair, messing it up further. He looked like he was wrestling with something internally, a physical struggle against his own instincts. He didn't sit back down on the bed immediately. He paced a few steps away to the window, looked out at the dark street, then turned to face her, leaning his hip against the heavy wooden wardrobe, crossing his arms.\nThe distance helped Meena breathe, but only slightly. Her skin was still humming from his touch.\n"Meena," he started, his voice serious, almost business-like but with an undercurrent of softness that she was beginning to recognize. "We need to talk. Before... before we try to sleep. Before we try to figure out this bed situation."\nMeena nodded, her throat dry, her eyes wide. "Okay. Talk."\n"Look," he said, the muscles in his arms flexing as he squeezed his own biceps. The movement pulled the fabric of his silk shirt tight across his chest and shoulders, emphasizing his build. "I know what everyone expects. I know what this night is supposed to be. The flowers, the milk, the door locking... it's a setup. It's basically an orchestrated attempt to force two people into intimacy."\nMeena looked down at the intricate floral pattern on the bedsheet, tracing a vine with her finger. "I know. It's... a lot of pressure."\n"I don't want to rush this," Vijay continued, his voice softening as he pushed off the wardrobe and walked back towards the bed. He sat down again, but he was careful to keep a respectful distance, giving her space to breathe. "I don't want you to feel pressured just because we signed a paper and walked around a fire today. You looked terrified when you walked in here, Meena. Like you were walking to the gallows."\n"I was," Meena admitted honestly, looking up at him. "I still am, a little. I don't know what to expect. I don't know... you. We are married, but we are strangers."\n"Exactly. You shouldn't be scared. Not with me." He leaned forward, resting his elbows on his knees, catching her gaze and holding it. "So, here is what I’m proposing. A pact. Friends first."\nMeena blinked, confused. "Friends first?"\n"Yes. We live together. We get to know each other. We figure out how to be roommates, how to share a bathroom, how to make coffee for each other, before we try to be... lovers."\nHe said the word lovers with a slight hesitation, his voice dipping, and the sound of it made Meena’s stomach flip. It sounded dangerous and promising.\n"I promise you, Meena," he said, his eyes locking onto hers with a fierce intensity. "I won't touch you. Not intimately. Not until you want it. Not until you ask for it. Until you... beg for it."\nHe didn't mean to say the last part; she could tell by the way his eyes widened slightly in surprise at his own words. But the words hung in the air, heavy, smoky, and incredibly provocative. Until you beg for it.\nMeena felt a flush rise from her chest, burning up her neck to her hairline. The idea was scandalous, embarrassing, and deeply, deeply hot. The thought of begging him...\n"Okay," she whispered, her voice barely audible, forcing herself to focus on the "Friends" part and ignore the "Begging" part. "Friends first. I... I would like that. Thank you, Vijay. That means a lot. I really appreciate you giving me time."\nThe wave of relief that crashed over her was immense, washing away the immediate fear. Her rigid posture slumped against the carved wooden headboard. She hadn't realized how tight her muscles were until he said those words. He wasn't going to pounce on her. He respected her. He was safe.\n"Good," Vijay said, exhaling a long breath, his shoulders dropping. He looked relieved too, as if the pressure had been weighing on him just as heavily. "So, deal?"\n"Deal."\nTo seal this verbal contract, Vijay leaned in.\nMeena held her breath, her eyes widening. Was he going to shake her hand? Hug her? The distance between them shrank rapidly.\nHe moved closer, shifting his weight on the mattress. He raised a hand, not to touch her, but to brace himself on the headboard behind her neck, caging her slightly but not touching her. He leaned his face towards hers.\nMeena’s heart stopped. Is he going to kiss me? We just said friends! What is he doing?`
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

// --- PRESETS (QUICK SETS) ---
export const SCENE_PRESETS = [
    {
        id: "wedding",
        label: "The Wedding Night",
        desc: "High stakes, pillow wall, heavy silk.",
        config: {
            setting: "Bedroom (Night)",
            mood: "Tense",
            time: "Midnight (Dark)",
            weather: "Humid / Hazy",
            poseCat: "Sitting",
            position: "Side by Side",
            intensity: "Subtle",
            lighting: "Candlelight",
            style: "Cinematic (Film Look)",
            vijay: { outfit: "Kurta Pyjama (Silk)", color: "White", style: "Traditional (Grand)" },
            meena: { outfit: "Kanjeevaram Saree", color: "Red", style: "Traditional (Grand)" },
            char: "Vijay",
            touch: "v_hand_hold"
        }
    },
    {
        id: "monsoon",
        label: "Monsoon Argument",
        desc: "Drenched clothes, raw emotion.",
        config: {
            setting: "Rainy Balcony",
            mood: "Steamy",
            time: "Twilight (Purple)",
            weather: "Monsoon Rain (Heavy)",
            poseCat: "Standing",
            position: "Face to Face",
            intensity: "Intense",
            lighting: "Moonlight",
            style: "Photorealistic (Sharp)",
            vijay: { outfit: "Linen Shirt", color: "White", style: "Casual" },
            meena: { outfit: "Cotton Saree", color: "Blue", style: "Casual" },
            char: "Meena",
            touch: "m_waist_pull"
        }
    },
    {
        id: "kitchen",
        label: "Kitchen Midnight",
        desc: "Domestic intimacy, stolen glances.",
        config: {
            setting: "Kitchen Counter",
            mood: "Domestic",
            time: "Midnight (Dark)",
            weather: "Clear Sky",
            poseCat: "Standing",
            position: "Cornered",
            intensity: "Moderate",
            lighting: "Firelight",
            style: "Oil Painting (Classic)",
            vijay: { outfit: "Boxers & Tee", color: "Black", style: "Nightwear" },
            meena: { outfit: "Nightie", color: "Pastel Pink", style: "Nightwear" },
            char: "Vijay",
            touch: "v_neck_graze"
        }
    },
    {
        id: "bus",
        label: "The Crowded Bus",
        desc: "Public proximity, secret touch.",
        config: {
            setting: "Crowded Bus",
            mood: "Forbidden",
            time: "Morning (Soft)",
            weather: "Humid / Hazy",
            poseCat: "Standing",
            position: "Back to Chest",
            intensity: "Subtle",
            lighting: "Overcast (Soft)",
            style: "Cinematic (Film Look)",
            vijay: { outfit: "Formal Shirt & Trousers", color: "Blue", style: "Workwear" },
            meena: { outfit: "Cotton Saree", color: "Green", style: "Workwear" },
            char: "Meena",
            touch: "m_wrist_pulse"
        }
    },
    {
        id: "morning_coffee",
        label: "Morning Coffee",
        desc: "Soft light, quiet shared moment.",
        config: {
            setting: "Bedroom (Morning)",
            mood: "Domestic",
            time: "Morning (Soft)",
            weather: "Clear Sky",
            poseCat: "Sitting",
            position: "Side by Side",
            intensity: "Subtle",
            lighting: "Golden Hour",
            style: "Watercolor (Dreamy)",
            vijay: { outfit: "Lungis", color: "White", style: "Nightwear" },
            meena: { outfit: "Cotton Saree", color: "Gold", style: "Casual" },
            char: "Vijay",
            touch: "v_hand_hold"
        }
    },
    {
        id: "temple",
        label: "Temple Prayers",
        desc: "Peaceful devotion, arm in arm.",
        config: {
            setting: "Temple Corridor",
            mood: "Peaceful",
            time: "Dawn (Blue Hour)",
            weather: "Clear Sky",
            poseCat: "Standing",
            position: "Side by Side",
            intensity: "Subtle",
            lighting: "Golden Hour",
            style: "Oil Painting (Classic)",
            vijay: { outfit: "Dhoti & Angavastram", color: "White", style: "Traditional (Grand)" },
            meena: { outfit: "Kanjeevaram Saree", color: "Green", style: "Traditional (Grand)" },
            char: "Meena",
            touch: "v_arm_link"
        }
    },
    {
        id: "office_secret",
        label: "Office Secret",
        desc: "Stolen moment in a sterile world.",
        config: {
            setting: "Office Cubicle",
            mood: "Forbidden",
            time: "High Noon (Harsh)",
            weather: "Clear Sky",
            poseCat: "Standing",
            position: "Cornered",
            intensity: "Moderate",
            lighting: "Studio (High Key)",
            style: "Photorealistic (Sharp)",
            vijay: { outfit: "Formal Shirt & Trousers", color: "Blue", style: "Workwear" },
            meena: { outfit: "Silk Saree (Office)", color: "Black", style: "Formal" },
            char: "Vijay",
            touch: "v_waist_hold"
        }
    },
    {
        id: "beach_sunset",
        label: "Marina Beach",
        desc: "Windy evening, sand and sea.",
        config: {
            setting: "Beach at Sunset",
            mood: "Romantic",
            time: "Golden Hour (Sunset)",
            weather: "Windy",
            poseCat: "Dynamic",
            position: "Walking Away",
            intensity: "Subtle",
            lighting: "Golden Hour",
            style: "Cinematic (Film Look)",
            vijay: { outfit: "Short Kurta & Jeans", color: "Blue", style: "Casual" },
            meena: { outfit: "Salwar Kameez (Simple)", color: "Pastel Pink", style: "Casual" },
            char: "Meena",
            touch: "m_hand_kiss"
        }
    },
    {
        id: "rooftop",
        label: "Rooftop Breeze",
        desc: "City lights and quiet confessions.",
        config: {
            setting: "Rooftop Terrace",
            mood: "Nostalgic",
            time: "Twilight (Purple)",
            weather: "Windy",
            poseCat: "Standing",
            position: "Leaning against wall",
            intensity: "Subtle",
            lighting: "Moonlight",
            style: "Noir (B&W)",
            vijay: { outfit: "T-shirt & Jeans", color: "Black", style: "Casual" },
            meena: { outfit: "Kurti & Leggings", color: "White", style: "Casual" },
            char: "Vijay",
            touch: "v_shoulder_squeeze"
        }
    },
    {
        id: "auto_rain",
        label: "Auto Rain",
        desc: "Cozy ride in the monsoon downpour.",
        config: {
            setting: "Auto Rickshaw (Rain)",
            mood: "Cozy",
            time: "Evening",
            weather: "Monsoon Rain (Heavy)",
            poseCat: "Sitting",
            position: "Side by Side",
            intensity: "Moderate",
            lighting: "Streetlamps",
            style: "Digital Art (Modern)",
            vijay: { outfit: "Formal Shirt & Trousers", color: "White", style: "Workwear" },
            meena: { outfit: "Churidar", color: "Blue", style: "Workwear" },
            char: "Vijay",
            touch: "v_thigh_rest"
        }
    },
    {
        id: "fever_care",
        label: "Sick Day",
        desc: "Tender caretaking in the quiet.",
        config: {
            setting: "Bedroom (Night)",
            mood: "Melancholic",
            time: "Late Night",
            weather: "Clear Sky",
            poseCat: "Sitting",
            position: "On Lap (Away)",
            intensity: "Subtle",
            lighting: "Candlelight",
            style: "Watercolor (Dreamy)",
            vijay: { outfit: "T-shirt & Jeans", color: "Black", style: "Casual" },
            meena: { outfit: "Nightie", color: "Blue", style: "Nightwear" },
            char: "Vijay",
            touch: "v_forehead_lean"
        }
    },
    {
        id: "saree_pleats",
        label: "The Saree Pleats",
        desc: "Intimate assistance with dressing.",
        config: {
            setting: "Bedroom (Morning)",
            mood: "Steamy",
            time: "Morning (Soft)",
            weather: "Clear Sky",
            poseCat: "Standing",
            position: "Back to Chest",
            intensity: "Moderate",
            lighting: "Golden Hour",
            style: "Cinematic (Film Look)",
            vijay: { outfit: "Boxers & Tee", color: "Black", style: "Nightwear" },
            meena: { outfit: "Kanjeevaram Saree", color: "Red", style: "Traditional (Grand)" },
            char: "Meena",
            touch: "m_waist_pull"
        }
    },
    {
        id: "diwali_spark",
        label: "Diwali Spark",
        desc: "Festive lights and hidden heat.",
        config: {
            setting: "Rainy Balcony",
            mood: "Electric",
            time: "Midnight (Dark)",
            weather: "Clear Sky",
            poseCat: "Standing",
            position: "Face to Face",
            intensity: "Intense",
            lighting: "Firelight",
            style: "Photorealistic (Sharp)",
            vijay: { outfit: "Kurta Pyjama (Silk)", color: "Gold", style: "Traditional (Grand)" },
            meena: { outfit: "Lehenga Choli", color: "Green", style: "Traditional (Grand)" },
            char: "Vijay",
            touch: "v_chin_lift"
        }
    },
    {
        id: "library_silence",
        label: "Library Silence",
        desc: "Quiet brush of hands among books.",
        config: {
            setting: "Library Aisle",
            mood: "Playful",
            time: "Afternoon",
            weather: "Clear Sky",
            poseCat: "Standing",
            position: "Face to Face",
            intensity: "Subtle",
            lighting: "Overcast (Soft)",
            style: "Concept Art (Detailed)",
            vijay: { outfit: "Polo Shirt", color: "Green", style: "Casual" },
            meena: { outfit: "Sundress", color: "White", style: "Casual" },
            char: "Meena",
            touch: "m_fingertip_trace"
        }
    },
    {
        id: "waiting_room",
        label: "Hospital Wait",
        desc: "Anxiety shared in silence.",
        config: {
            setting: "Hospital Waiting Room",
            mood: "Tense",
            time: "Late Night",
            weather: "Stormy",
            poseCat: "Sitting",
            position: "Side by Side",
            intensity: "Moderate",
            lighting: "Neon",
            style: "Cinematic (Film Look)",
            vijay: { outfit: "Formal Shirt & Trousers", color: "White", style: "Workwear" },
            meena: { outfit: "Salwar Kameez (Simple)", color: "Pastel Pink", style: "Casual" },
            char: "Vijay",
            touch: "v_hand_hold"
        }
    },
    {
        id: "pani_puri",
        label: "Street Food Fun",
        desc: "Feeding each other amidst chaos.",
        config: {
            setting: "Street Food Stall",
            mood: "Playful",
            time: "Evening",
            weather: "Humid / Hazy",
            poseCat: "Standing",
            position: "Face to Face",
            intensity: "Subtle",
            lighting: "Streetlamps",
            style: "Digital Art (Modern)",
            vijay: { outfit: "Linen Shirt", color: "Blue", style: "Casual" },
            meena: { outfit: "Jeans & Top", color: "Black", style: "Casual" },
            char: "Meena",
            touch: "m_nose_boop"
        }
    },
    {
        id: "power_cut",
        label: "Power Cut",
        desc: "Darkness brings them closer.",
        config: {
            setting: "Living Room Sofa",
            mood: "Intimate",
            time: "Midnight (Dark)",
            weather: "Stormy",
            poseCat: "Sitting",
            position: "Legs Tangled",
            intensity: "Intense",
            lighting: "Candlelight",
            style: "Rembrandt (Dramatic)",
            vijay: { outfit: "Lungis", color: "White", style: "Nightwear" },
            meena: { outfit: "Loose Cotton Set", color: "Purple", style: "Nightwear" },
            char: "Vijay",
            touch: "v_knee_brush"
        }
    },
    {
        id: "cold_shoulder",
        label: "The Cold Shoulder",
        desc: "Distance in the same bed.",
        config: {
            setting: "Bedroom (Night)",
            mood: "Heartbroken",
            time: "Midnight (Dark)",
            weather: "Clear Sky",
            poseCat: "Lying",
            position: "Back to Back",
            intensity: "Subtle",
            lighting: "Moonlight",
            style: "Noir (B&W)",
            vijay: { outfit: "Loose Pyjamas", color: "Blue", style: "Nightwear" },
            meena: { outfit: "Nightie", color: "White", style: "Nightwear" },
            char: "Meena",
            touch: "m_sleep_watch"
        }
    },
    {
        id: "mirror_reflection",
        label: "Mirror Reflection",
        desc: "Caught admiring in the glass.",
        config: {
            setting: "Bedroom (Morning)",
            mood: "Admiring",
            time: "Morning (Soft)",
            weather: "Clear Sky",
            poseCat: "Standing",
            position: "Back to Chest",
            intensity: "Moderate",
            lighting: "Studio (High Key)",
            style: "Photorealistic (Sharp)",
            vijay: { outfit: "Boxers & Tee", color: "White", style: "Nightwear" },
            meena: { outfit: "Kanjeevaram Saree", color: "Gold", style: "Traditional (Grand)" },
            char: "Meena",
            touch: "m_neck_nuzzle"
        }
    },
    {
        id: "laptop_lullaby",
        label: "Laptop Lullaby",
        desc: "Working while she sleeps.",
        config: {
            setting: "Living Room Sofa",
            mood: "Domestic",
            time: "Late Night",
            weather: "Clear Sky",
            poseCat: "Sitting",
            position: "On Lap (Away)",
            intensity: "Subtle",
            lighting: "Neon",
            style: "Digital Art (Modern)",
            vijay: { outfit: "T-shirt & Jeans", color: "Black", style: "Casual" },
            meena: { outfit: "Loose Cotton Set", color: "Pastel Pink", style: "Nightwear" },
            char: "Vijay",
            touch: "v_hair_run"
        }
    },
    {
        id: "monsoon_dance",
        label: "Rain Dance",
        desc: "Joyful spin in the downpour.",
        config: {
            setting: "Rainy Balcony",
            mood: "Playful",
            time: "Evening",
            weather: "Monsoon Rain (Heavy)",
            poseCat: "Dynamic",
            position: "Spinning",
            intensity: "Moderate",
            lighting: "Overcast (Soft)",
            style: "Watercolor (Dreamy)",
            vijay: { outfit: "Cotton Kurta", color: "White", style: "Casual" },
            meena: { outfit: "Salwar Kameez (Simple)", color: "Blue", style: "Casual" },
            char: "Meena",
            touch: "m_rain_dance"
        }
    },
    {
        id: "cooking_together",
        label: "Cooking Together",
        desc: "Domestic harmony in the kitchen.",
        config: {
            setting: "Kitchen Counter",
            mood: "Domestic",
            time: "Evening",
            weather: "Clear Sky",
            poseCat: "Standing",
            position: "Side by Side",
            intensity: "Subtle",
            lighting: "Golden Hour",
            style: "Oil Painting (Classic)",
            vijay: { outfit: "T-shirt & Jeans", color: "Black", style: "Casual" },
            meena: { outfit: "Kurti & Leggings", color: "Red", style: "Casual" },
            char: "Meena",
            touch: "m_shoulder_lean"
        }
    },
    {
        id: "reception_party",
        label: "Reception Party",
        desc: "Public formality, hidden touch.",
        config: {
            setting: "Wedding Hall",
            mood: "Forbidden",
            time: "Evening",
            weather: "Clear Sky",
            poseCat: "Standing",
            position: "Side by Side",
            intensity: "Subtle",
            lighting: "Studio (High Key)",
            style: "Photorealistic (Sharp)",
            vijay: { outfit: "Three-Piece Suit", color: "Black", style: "Formal" },
            meena: { outfit: "Kanjeevaram Saree", color: "Purple", style: "Traditional (Grand)" },
            char: "Vijay",
            touch: "v_waist_hold"
        }
    },
    {
        id: "makeup_fix",
        label: "The Makeup Fix",
        desc: "Gentle intimacy before an event.",
        config: {
            setting: "Bedroom (Night)",
            mood: "Romantic",
            time: "Evening",
            weather: "Clear Sky",
            poseCat: "Standing",
            position: "Close Up",
            intensity: "Subtle",
            lighting: "Studio (High Key)",
            style: "Cinematic (Film Look)",
            vijay: { outfit: "Sherwani", color: "Gold", style: "Traditional (Grand)" },
            meena: { outfit: "Lehenga Choli", color: "Red", style: "Traditional (Grand)" },
            char: "Meena",
            touch: "m_cheek_caress"
        }
    },
    {
        id: "angry_silence",
        label: "Angry Silence",
        desc: "Tension in the car.",
        config: {
            setting: "Auto Rickshaw (Rain)",
            mood: "Tense",
            time: "Evening",
            weather: "Stormy",
            poseCat: "Sitting",
            position: "Looking Away",
            intensity: "Intense",
            lighting: "Streetlamps",
            style: "Noir (B&W)",
            vijay: { outfit: "Formal Shirt & Trousers", color: "White", style: "Workwear" },
            meena: { outfit: "Silk Saree (Office)", color: "Black", style: "Formal" },
            char: "Vijay",
            touch: "v_wrist_grip"
        }
    },
    {
        id: "reconciliation",
        label: "Reconciliation",
        desc: "Tearful hug after a fight.",
        config: {
            setting: "Living Room Sofa",
            mood: "Passionate",
            time: "Late Night",
            weather: "Stormy",
            poseCat: "Standing",
            position: "Face to Face",
            intensity: "Intense",
            lighting: "Firelight",
            style: "Cinematic (Film Look)",
            vijay: { outfit: "Linen Shirt", color: "White", style: "Casual" },
            meena: { outfit: "Cotton Saree", color: "Green", style: "Casual" },
            char: "Meena",
            touch: "m_tear_wipe"
        }
    },
    {
        id: "sunday_paper",
        label: "Sunday Paper",
        desc: "Lazy morning reading.",
        config: {
            setting: "Garden Bench",
            mood: "Peaceful",
            time: "Morning (Soft)",
            weather: "Clear Sky",
            poseCat: "Sitting",
            position: "Side by Side",
            intensity: "Subtle",
            lighting: "Golden Hour",
            style: "Watercolor (Dreamy)",
            vijay: { outfit: "Short Kurta & Jeans", color: "White", style: "Casual" },
            meena: { outfit: "Maxi Dress", color: "Pastel Pink", style: "Casual" },
            char: "Meena",
            touch: "m_leg_drape"
        }
    },
    {
        id: "oil_massage",
        label: "Oil Massage",
        desc: "Caretaking relaxation.",
        config: {
            setting: "Living Room Sofa",
            mood: "Domestic",
            time: "Evening",
            weather: "Clear Sky",
            poseCat: "Sitting",
            position: "On Lap (Away)",
            intensity: "Moderate",
            lighting: "Candlelight",
            style: "Oil Painting (Classic)",
            vijay: { outfit: "Lungis", color: "Blue", style: "Nightwear" },
            meena: { outfit: "Loose Cotton Set", color: "White", style: "Nightwear" },
            char: "Vijay",
            touch: "v_neck_graze"
        }
    },
    {
        id: "bike_ride",
        label: "Bike Ride",
        desc: "Thrilling ride on the highway.",
        config: {
            setting: "Street Food Stall",
            mood: "Electric",
            time: "Evening",
            weather: "Windy",
            poseCat: "Sitting",
            position: "Back to Chest",
            intensity: "Moderate",
            lighting: "Streetlamps",
            style: "Digital Art (Modern)",
            vijay: { outfit: "Hoodie", color: "Black", style: "Casual" },
            meena: { outfit: "Jeans & Top", color: "Blue", style: "Casual" },
            char: "Meena",
            touch: "m_waist_pull"
        }
    },
    {
        id: "jasmine_knot",
        label: "The Jasmine Knot",
        desc: "The symbolic union.",
        config: {
            setting: "Bedroom (Night)",
            mood: "Romantic",
            time: "Midnight (Dark)",
            weather: "Humid / Hazy",
            poseCat: "Sitting",
            position: "Face to Face",
            intensity: "Intense",
            lighting: "Candlelight",
            style: "Cinematic (Film Look)",
            vijay: { outfit: "Sherwani", color: "White", style: "Traditional (Grand)" },
            meena: { outfit: "Kanjeevaram Saree", color: "Gold", style: "Traditional (Grand)" },
            char: "Vijay",
            touch: "v_hand_hold"
        }
    }
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
