import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookText, ImageOff } from 'lucide-react';

const timelineData = [
  {
    title: "Part I: The Agreement & The Wall",
    cue: "Cold Moonlight Blue",
    borderColor: "border-blue-400/50",
    textColor: "text-blue-300",
    description: "Bathed in the cool, desaturated light of a marriage arranged by duty, Vijay and Meena begin as strangers. The \"Friends First\" pact is their shield, but the \"Great Wall of Chennai\"—a ridiculous fortress of white pillows constructed nightly—is their reality. In the silence of the bedroom, separated by cotton and fear, they lie awake, acutely aware of the other’s breathing, waiting for a comfort they are too terrified to ask for.",
    chapters: "1–10",
  },
  {
    title: "Part II: Domestic Friction",
    cue: "Violet Silk & Warm Reflection",
    borderColor: "border-purple-400/50",
    textColor: "text-purple-300",
    description: "The walls begin to thin in the golden, humid intimacy of their Chennai apartment. The pact frays against the unavoidable friction of daily life. A violet Kanjeevaram saree becomes a landscape of longing as Vijay steps into her personal space to help, his hands hovering inches from her waist. In the safety of the mirror’s reflection, their eyes lock, confessing a desire that their words are not yet brave enough to speak.",
    chapters: "11–40",
  },
  {
    title: "Part III: The Storm & The Protector",
    cue: "Steel Grey Monsoon",
    borderColor: "border-slate-400/50",
    textColor: "text-slate-300",
    description: "The heavens open up, washing away the polite boundaries of friendship. Caught in a torrential monsoon, the world turns to steel grey rain and raw instinct. Drenched and stripped of their defenses, Vijay steps into the role of protector. The wet fabric clinging to their skin erases the distance between them, leaving them breathless and shivering—not from the cold, but from the scorching heat of a touch that is no longer accidental.",
    chapters: "41–70",
  },
  {
    title: "Part IV: The Union",
    cue: "Amber Candlelight",
    borderColor: "border-amber-400/50",
    textColor: "text-amber-300",
    description: "Under the soft, sacred amber glow of the bedroom, the wait ends. The pillow wall is dismantled, and the \"Friends First\" pact dissolves into the shadows. Meena stands before him, the scent of fresh jasmine in her hair serving as a silent invitation. In this final phase, restraint collapses into surrender, and two separate lives are finally, irrevocably bound by the Jasmine Knot.",
    chapters: "71–80",
  },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    },
};

const VisualTimeline: React.FC = () => {
    const imageUrl = "assets/visual-timeline.png";
    const [imgError, setImgError] = useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.getElementById('books');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="timeline" className="py-32 bg-onyx border-y border-white/5 overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-6">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="font-display text-4xl md:text-6xl text-white mb-6">The Journey of Us</h2>
                    <p className="text-slate-400 text-lg font-light font-body max-w-2xl mx-auto">
                        From the cold silence of a pillow wall to the warm surrender of a jasmine knot.
                    </p>
                </motion.div>

                <motion.div 
                    className="mb-16 shadow-2xl rounded-sm border border-white/10 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="overflow-x-auto custom-scrollbar">
                         {!imgError ? (
                             <img 
                                src={imageUrl} 
                                alt="A visual timeline of Vijay and Meena's relationship across four panels."
                                className="w-full min-w-[1200px] h-auto object-cover"
                                loading="lazy"
                                decoding="async"
                                width="1200"
                                height="600"
                                onError={() => setImgError(true)}
                             />
                         ) : (
                             // Visual Fallback for Timeline
                             <div className="w-full min-w-[1000px] h-[400px] bg-white/5 flex flex-col items-center justify-center text-slate-500 gap-4">
                                <ImageOff size={40} className="opacity-50"/>
                                <div className="text-center">
                                    <p className="font-display text-lg">Timeline Graphic Not Found</p>
                                    <p className="text-xs font-mono mt-1 opacity-70">Ensure 'assets/visual-timeline.png' exists.</p>
                                </div>
                             </div>
                         )}
                    </div>
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {timelineData.map((item, index) => (
                        <motion.div 
                            key={index}
                            variants={itemVariants}
                            className={`bg-black/40 border ${item.borderColor} rounded-sm p-10 flex flex-col h-full shadow-lg hover:shadow-primary/10 transition-shadow duration-500`}
                        >
                            <div className="flex-grow">
                                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${item.textColor} mb-4 block`}>
                                    {item.cue}
                                </span>
                                <h3 className="font-display text-2xl text-white mb-6 tracking-wide">{item.title}</h3>
                                <p className="font-body text-slate-400 text-sm leading-relaxed mb-6">
                                    {item.description}
                                </p>
                            </div>
                            <div className="mt-auto pt-6 border-t border-white/10 text-center">
                                <a 
                                    href="#books" 
                                    onClick={handleScroll}
                                    className={`text-xs font-bold uppercase tracking-widest ${item.textColor} hover:text-white transition-colors duration-300 flex items-center justify-center gap-2`}
                                >
                                    <BookText size={14}/> Read Chapters {item.chapters}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default VisualTimeline;