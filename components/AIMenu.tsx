
import React from 'react';
import { motion } from 'framer-motion';
import { 
    BrainCircuit, Activity, PenTool, Search, Flame, Key, 
    Music, Sparkles, MessageSquare, Heart, Lock, MapPin, 
    Box, Wand2, ChevronRight, Zap, HeartHandshake, Gem,
    CloudRain
} from 'lucide-react';

interface AIMenuProps {
    onSelect: (featureId: string) => void;
}

const FEATURES = [
    { 
        id: 'connect', 
        label: 'Character Connect', 
        desc: 'Chat directly with Vijay & Meena.', 
        icon: MessageSquare, 
        color: 'text-green-400',
        category: 'Immersion'
    },
    { 
        id: 'unspoken', 
        label: 'Unspoken Thoughts', 
        desc: 'Unlock their internal monologues.', 
        icon: BrainCircuit, 
        color: 'text-blue-400',
        category: 'Narrative'
    },
    { 
        id: 'heatmap', 
        label: 'Tension Heatmap', 
        desc: 'Visualize the slow burn rise.', 
        icon: Activity, 
        color: 'text-rose-400',
        category: 'Narrative'
    },
    { 
        id: 'finishscene', 
        label: 'Co-Write Scene', 
        desc: 'Finish the story with AI.', 
        icon: PenTool, 
        color: 'text-emerald-400',
        category: 'Interactive'
    },
    { 
        id: 'sensory', 
        label: 'Sensory Immersion', 
        desc: 'Feel the atmosphere.', 
        icon: CloudRain, 
        color: 'text-teal-300',
        category: 'Immersion'
    },
    { 
        id: 'apology', 
        label: 'Apology Architect', 
        desc: 'Generate the perfect grovel.', 
        icon: HeartHandshake, 
        color: 'text-amber-400',
        category: 'Creative'
    },
    { 
        id: 'memory', 
        label: 'Memory Weaver', 
        desc: 'Weave sensory flashbacks.', 
        icon: Gem, 
        color: 'text-indigo-300',
        category: 'Creative'
    },
    { 
        id: 'muse', 
        label: 'Love Letter Muse', 
        desc: 'Draft a poetic confession.', 
        icon: Heart, 
        color: 'text-pink-400',
        category: 'Creative'
    },
    { 
        id: 'playlist', 
        label: 'Mood Playlist', 
        desc: 'Generate a custom soundtrack.', 
        icon: Music, 
        color: 'text-cyan-400',
        category: 'Immersion'
    },
    { 
        id: 'tropematcher', 
        label: 'Trope Matcher', 
        desc: 'Find your favorite tropes.', 
        icon: Search, 
        color: 'text-purple-400',
        category: 'Narrative'
    },
    { 
        id: 'prediction', 
        label: 'Prediction Game', 
        desc: 'Guess their reactions.', 
        icon: Key, 
        color: 'text-yellow-400',
        category: 'Interactive'
    },
    { 
        id: 'cliffhanger', 
        label: 'Cliffhanger Engine', 
        desc: 'Generate high tension.', 
        icon: Flame, 
        color: 'text-orange-400',
        category: 'Interactive'
    },
    { 
        id: 'destiny', 
        label: 'Destiny Match', 
        desc: 'Check zodiac compatibility.', 
        icon: Sparkles, 
        color: 'text-indigo-400',
        category: 'Fun'
    },
    { 
        id: 'decoder', 
        label: 'Text Decoder', 
        desc: 'Analyze subtext messages.', 
        icon: Lock, 
        color: 'text-slate-400',
        category: 'Utility'
    },
    { 
        id: 'translator', 
        label: 'Romance Translator', 
        desc: 'Romanticize your reality.', 
        icon: Wand2, 
        color: 'text-fuchsia-400',
        category: 'Creative'
    },
    { 
        id: 'dateplanner', 
        label: 'Date Planner', 
        desc: 'Curate a perfect evening.', 
        icon: MapPin, 
        color: 'text-teal-400',
        category: 'Utility'
    },
    { 
        id: 'povshift', 
        label: 'Object Perspective', 
        desc: 'See from a new angle.', 
        icon: Box, 
        color: 'text-amber-400',
        category: 'Creative'
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const AIMenu: React.FC<AIMenuProps> = ({ onSelect }) => {
    return (
        <section id="ai-hub" className="py-24 bg-secondary relative overflow-hidden min-h-screen">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="max-w-[1600px] mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-slate-300 text-xs tracking-widest uppercase mb-6 font-bold shadow-sm">
                        <Zap size={12} className="text-primary" /> <span>Interactive Features</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-6xl text-white mb-6">The Jasmine Knot's Experience Hub</h2>
                    <p className="text-slate-400 font-body font-light max-w-2xl mx-auto text-lg">
                        Select an experience below to unlock the deeper layers of <em>The Jasmine Knot</em>. 
                        Powered by Gemini AI.
                    </p>
                </div>

                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                >
                    {FEATURES.map((feature) => (
                        <motion.button
                            key={feature.id}
                            variants={item}
                            onClick={() => onSelect(feature.id)}
                            className="group relative bg-[#121212] hover:bg-[#1a1a1a] p-8 rounded-lg border border-white/5 hover:border-white/20 transition-all duration-300 text-left flex flex-col shadow-lg hover:shadow-[0_0_30px_rgba(37,150,190,0.15)] hover:-translate-y-1 overflow-hidden h-full"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors ${feature.color}`}>
                                    <feature.icon size={28} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-slate-400">
                                    {feature.category}
                                </span>
                            </div>

                            <h3 className="font-display text-2xl text-white mb-3 group-hover:text-primary transition-colors">
                                {feature.label}
                            </h3>
                            <p className="text-sm text-slate-500 group-hover:text-slate-400 font-body leading-relaxed flex-grow">
                                {feature.desc}
                            </p>

                            <div className="mt-8 flex items-center text-xs font-bold uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                                Launch <ChevronRight size={14} className="ml-1" />
                            </div>
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AIMenu;
