
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring } from 'framer-motion';
import { 
    Menu, X, BookOpen, Sparkles, BrainCircuit, Heart, Flame, 
    Key, MessageSquare, MapPin, PenTool, Activity, Lock, 
    Search, PlayCircle, Eye, Music, CloudRain, Wand2
} from 'lucide-react';

// --- Constants & Configuration ---

const HEAVY_SETTLE = [0.25, 0.46, 0.45, 0.94]; // The Cinematic Curve

const NARRATIVE_LINKS = [
    { label: "The Novel", href: "#books", icon: BookOpen },
    { label: "Experience", href: "#experience", icon: PlayCircle },
    { label: "The Author", href: "#author", icon: PenTool },
    { label: "Subscribe", href: "#newsletter", icon: MessageSquare },
];

const AI_TOOLS = [
    { label: "Unspoken Thoughts", href: "#unspoken", icon: BrainCircuit, badge: "AI" },
    { label: "Cliffhanger Engine", href: "#cliffhanger", icon: Flame, badge: "Beta" },
    { label: "Prediction Game", href: "#prediction", icon: Key, badge: "Game" },
    { label: "Tension Heatmap", href: "#heatmap", icon: Activity, badge: "Data" },
    { label: "Trope Matchmaker", href: "#tropematcher", icon: Search, badge: "Search" },
    { label: "Jasmine Translator", href: "#translator", icon: Wand2, badge: "Style" },
    { label: "Co-Write Scene", href: "#finishscene", icon: PenTool, badge: "GenAI" },
    { label: "POV Shift", href: "#povshift", icon: Eye, badge: "Rewrite" },
    { label: "Sensory Immersion", href: "#sensory", icon: CloudRain, badge: "Vibe" },
    { label: "Mood Playlist", href: "#playlist", icon: Music, badge: "Audio" },
    { label: "Date Planner", href: "#dateplanner", icon: MapPin, badge: "Travel" },
    { label: "Text Decoder", href: "#decoder", icon: Lock, badge: "Analyze" },
    { label: "Character Connect", href: "#connect", icon: MessageSquare, badge: "Chat" },
    { label: "Destiny Match", href: "#destiny", icon: Sparkles, badge: "Star" },
    { label: "Love Letter Muse", href: "#muse", icon: Heart, badge: "Poet" },
];

const FloatingMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);

    // -- Physics: Magnetic Pull --
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Spring config for the "Heavy" feel
    const springConfig = { damping: 25, stiffness: 400, mass: 1 }; 
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isOpen || !buttonRef.current || isMobile) return;

            const rect = buttonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

            if (dist < 120) { // Magnetic Field Radius
                // Elasticity factor (0.2 = moves 20% of distance)
                x.set((e.clientX - centerX) * 0.2);
                y.set((e.clientY - centerY) * 0.2);
            } else {
                x.set(0);
                y.set(0);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isOpen, x, y, isMobile]);

    // -- Logic: Scroll Awareness (Hysteresis) --
    useEffect(() => {
        const updateScroll = () => {
            const current = scrollY.get();
            const delta = current - lastScrollY.current;
            
            if (current < 50) {
                setIsVisible(true); // Always show at top
            } else if (delta > 20) {
                setIsVisible(false); // Hide on scroll down
            } else if (delta < -10) {
                setIsVisible(true); // Show on scroll up
            }
            
            lastScrollY.current = current;
        };

        const unsubscribe = scrollY.on("change", updateScroll);
        return () => unsubscribe();
    }, [scrollY]);

    // -- Logic: Capture Button Position for Iris Wipe --
    const handleClick = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setButtonPos({ 
                x: rect.left + rect.width / 2, 
                y: rect.top + rect.height / 2 
            });
        }
        setIsOpen(!isOpen);
    };

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <>
            {/* --- The Void Overlay --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ 
                            clipPath: `circle(0px at ${buttonPos.x}px ${buttonPos.y}px)` 
                        }}
                        animate={{ 
                            clipPath: `circle(150% at ${buttonPos.x}px ${buttonPos.y}px)` 
                        }}
                        exit={{ 
                            clipPath: `circle(0px at ${buttonPos.x}px ${buttonPos.y}px)`,
                            transition: { duration: 0.6, ease: [0.55, 0.085, 0.68, 0.53] } // Sharper exit
                        }}
                        transition={{ 
                            duration: 0.8, 
                            ease: HEAVY_SETTLE 
                        }}
                        className="fixed inset-0 z-[9998] bg-[#0B1026]/95 backdrop-blur-xl flex flex-col lg:flex-row overflow-hidden will-change-[clip-path]"
                    >
                        {/* Noise Texture for Film Grain */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>

                        {/* Left: The Journal (Narrative) */}
                        <div className="w-full lg:w-5/12 h-full flex flex-col justify-center px-8 lg:px-24 relative z-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/20 lg:bg-transparent">
                            <div className="space-y-8 lg:space-y-12">
                                <span className="text-primary/50 text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">The Journal</span>
                                {NARRATIVE_LINKS.map((link, i) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        initial={{ y: 40, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 + (i * 0.1), duration: 0.8, ease: HEAVY_SETTLE }}
                                        className="block group"
                                    >
                                        <span className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wide transition-all duration-500 relative block"
                                              style={{ 
                                                  WebkitTextStroke: '1px rgba(255,255,255,0.3)', 
                                                  color: 'transparent' 
                                              }}
                                        >
                                            {link.label}
                                            <span className="absolute inset-0 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 [text-shadow:0_0_30px_rgba(244,194,194,0.4)]" aria-hidden="true">
                                                {link.label}
                                            </span>
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Right: The Nexus (Intelligence) */}
                        <div className="w-full lg:w-7/12 h-full bg-black/20 overflow-y-auto custom-scrollbar p-6 lg:p-16 relative z-10">
                             <div className="max-w-4xl mx-auto pt-8 lg:pt-0">
                                <span className="text-primary/50 text-[10px] font-bold uppercase tracking-[0.4em] block mb-8 lg:mb-12 sticky top-0 bg-[#0B1026]/0 backdrop-blur-sm py-4 z-20">The Nexus</span>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
                                    {AI_TOOLS.map((tool, i) => (
                                        <motion.a
                                            key={tool.label}
                                            href={tool.href}
                                            onClick={() => setIsOpen(false)}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 + (i * 0.05), duration: 0.6, ease: HEAVY_SETTLE }}
                                            className="group relative p-5 rounded-sm border border-primary/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(37,150,190,0.15)] flex items-center gap-4 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <div className="p-3 rounded-full bg-black/40 border border-white/10 text-primary group-hover:text-white group-hover:scale-110 transition-all duration-300 relative z-10">
                                                <tool.icon size={18} />
                                            </div>
                                            <div className="flex-1 relative z-10">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-body font-bold text-sm text-slate-200 group-hover:text-white tracking-wide">{tool.label}</h4>
                                                    <span className="text-[9px] text-primary/80 border border-primary/30 px-2 py-0.5 rounded-full uppercase tracking-widest group-hover:bg-primary/20 transition-colors">{tool.badge}</span>
                                                </div>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                             </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- The Orb (Trigger) --- */}
            <motion.button
                ref={buttonRef}
                onClick={handleClick}
                style={{ x: springX, y: springY }}
                initial={{ scale: 0 }}
                animate={{ 
                    scale: isVisible ? 1 : 0.8, 
                    opacity: isVisible ? 1 : 0.5 
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`fixed z-[9999] flex items-center justify-center
                           bottom-6 right-6 w-14 h-14
                           md:bottom-12 md:right-12 md:w-16 md:h-16
                           rounded-full backdrop-blur-md border border-white/10
                           text-white bg-[#0F0F0F]/80
                           shadow-[0_0_10px_rgba(37,150,190,0.4),0_0_20px_rgba(37,150,190,0.2),0_0_40px_rgba(37,150,190,0.1)]
                           hover:shadow-[0_0_20px_rgba(37,150,190,0.6),0_0_40px_rgba(37,150,190,0.3),0_0_60px_rgba(37,150,190,0.2)]
                           transition-shadow duration-500 group outline-none`}
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isOpen}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative z-10"
                >
                    {isOpen ? <X size={24} className="text-blush" /> : <Menu size={24} strokeWidth={1.5} />}
                </motion.div>
            </motion.button>
        </>
    );
};

export default FloatingMenu;
