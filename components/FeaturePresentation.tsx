
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, ArrowRight, ArrowLeft, BookOpen, BrainCircuit, PenTool, Wand2,
    Activity, Search, Flame, Key, Music, Sparkles, MessageSquare, Heart, Eye, Lock, MapPin
} from 'lucide-react';

const slideData = [
  {
    category: 'Introduction',
    title: 'Welcome to The Jasmine Knot Experience',
    subtitle: 'An Interactive Feature Presentation',
    Icon: BookOpen,
    color: 'text-primary'
  },
  {
    category: 'Narrative Insights',
    title: 'Go Beyond the Page',
    description: 'Use AI to unlock character secrets, visualize the novel\'s emotional arc, and find moments written just for you.',
    features: [
      { name: 'Unspoken Thoughts', Icon: BrainCircuit },
      { name: 'Tension Heatmap', Icon: Activity },
      { name: 'Trope Matchmaker', Icon: Search },
      { name: 'Text Decoder', Icon: Lock },
    ],
    color: 'text-primary'
  },
  {
    category: 'Interactive Fiction',
    title: 'Become the Co-Author',
    description: 'Take control of the narrative. Finish scenes, generate high-tension moments, and test your intuition on what happens next.',
    features: [
      { name: 'Co-Write Scene', Icon: PenTool },
      { name: 'Cliffhanger Engine', Icon: Flame },
      { name: 'Prediction Game', Icon: Key },
      { name: 'POV Shift', Icon: Eye },
    ],
    color: 'text-blush'
  },
  {
    category: 'Atmospheric & Fun',
    title: 'Immerse Your Senses',
    description: 'Feel the world of the novel. From custom soundtracks to direct conversations with the characters, experience the story like never before.',
    features: [
      { name: 'Mood Playlist', Icon: Music },
      { name: 'Destiny Match', Icon: Sparkles },
      { name: 'Character Connect', Icon: MessageSquare },
    ],
    color: 'text-yellow-300'
  },
  {
    category: 'Creative Tools',
    title: 'Channel the Muse',
    description: 'Unleash your inner writer with AI-powered tools that capture the author\'s unique voice and style.',
    features: [
      { name: 'Love Letter Muse', Icon: Heart },
      { name: 'Jasmine Translator', Icon: Wand2 },
      // FIX: Added missing MapPin import for this feature.
      { name: 'Date Planner', Icon: MapPin },
    ],
    color: 'text-purple-400'
  },
  {
    category: 'The End?',
    title: 'The Story is Yours',
    subtitle: 'You\'ve seen the tools. Now, enter the world and begin your journey.',
    Icon: Sparkles,
    color: 'text-primary'
  },
];

const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
};

interface FeaturePresentationProps {
    onClose: () => void;
}

const FeaturePresentation: React.FC<FeaturePresentationProps> = ({ onClose }) => {
    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const currentSlide = slideData[page % slideData.length];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
        >
            <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors" aria-label="Close Presentation">
                <X size={24} />
            </button>

            <div className="w-full max-w-4xl h-[70vh] max-h-[600px] relative flex items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                        className="absolute w-full h-full p-8 md:p-12 bg-black/50 border border-white/10 rounded-lg shadow-volumetric flex flex-col items-center justify-center text-center"
                    >
                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent ${currentSlide.color} opacity-50`}></div>
                        <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${currentSlide.color} mb-6`}>{currentSlide.category}</span>
                        <h2 className="font-display text-4xl md:text-6xl text-white mb-4 leading-tight">{currentSlide.title}</h2>
                        
                        {currentSlide.subtitle && <p className="font-body text-lg text-slate-300 max-w-xl mx-auto">{currentSlide.subtitle}</p>}
                        
                        {currentSlide.description && (
                            <p className="font-body text-slate-400 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">{currentSlide.description}</p>
                        )}

                        {currentSlide.features && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 w-full max-w-2xl">
                                {currentSlide.features.map(feature => (
                                    <div key={feature.name} className="flex flex-col items-center gap-2 text-center p-4 bg-white/5 rounded-md border border-white/5">
                                        <feature.Icon className={`${currentSlide.color} mb-2`} size={24} />
                                        <span className="text-xs text-slate-300 font-medium">{feature.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {page % slideData.length === slideData.length -1 && (
                            <button onClick={onClose} className="mt-12 px-8 py-3 bg-primary text-white text-sm font-bold tracking-widest uppercase rounded-sm shadow-glow hover:bg-primary-dark transition-colors">
                                Explore The Website
                            </button>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-12 z-50">
                <button
                    onClick={() => paginate(-1)}
                    disabled={page === 0}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-full disabled:opacity-30 transition-colors"
                    aria-label="Previous Slide"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-3">
                    {slideData.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === (page % slideData.length) ? 'bg-primary' : 'bg-slate-700'}`}></div>
                    ))}
                </div>
                <button
                    onClick={() => paginate(1)}
                    disabled={page === slideData.length -1}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-full disabled:opacity-30 transition-colors"
                    aria-label="Next Slide"
                >
                    <ArrowRight size={20} />
                </button>
            </div>
        </motion.div>
    );
};

export default FeaturePresentation;
