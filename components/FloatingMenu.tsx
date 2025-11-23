
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { 
    Menu, X, BookOpen, Sparkles, BrainCircuit, Heart, Flame, 
    Key, MessageSquare, MapPin, PenTool, Activity, 
    Search, PlayCircle, Eye, Music, Wand2, Lock
} from 'lucide-react';

// --- Constants & Configuration ---
const HEAVY_SETTLE = [0.25, 0.46, 0.45, 0.94];

const NARRATIVE_LINKS = [
    { label: "The Novel", href: "#books", icon: BookOpen },
    { label: "The Experience", href: "#experience", icon: PlayCircle },
    { label: "The Author", href: "#author", icon: PenTool },
    { label: "Subscribe", href: "#newsletter", icon: MessageSquare },
];

const AI_TOOL_CATEGORIES = [
    {
        title: "Narrative Insights",
        tools: [
            { label: "Unspoken Thoughts", href: "#unspoken", icon: BrainCircuit },
            { label: "Tension Heatmap", href: "#heatmap", icon: Activity },
            { label: "Trope Matchmaker", href: "#tropematcher", icon: Search },
            { label: "Text Decoder", href: "#decoder", icon: Lock },
        ]
    },
    {
        title: "Interactive Fiction",
        tools: [
            { label: "Co-Write Scene", href: "#finishscene", icon: PenTool },
            { label: "Cliffhanger Engine", href: "#cliffhanger", icon: Flame },
            { label: "Prediction Game", href: "#prediction", icon: Key },
            { label: "POV Shift", href: "#povshift", icon: Eye },
        ]
    },
    {
        title: "Atmospheric & Fun",
        tools: [
            { label: "Mood Playlist", href: "#playlist", icon: Music },
            { label: "Destiny Match", href: "#destiny", icon: Sparkles },
            { label: "Character Connect", href: "#connect", icon: MessageSquare },
            { label: "Date Planner", href: "#dateplanner", icon: MapPin },
            { label: "Love Letter Muse", href: "#muse", icon: Heart },
        ]
    }
];

const ALL_LINKS = [...NARRATIVE_LINKS, ...AI_TOOL_CATEGORIES.flatMap(cat => cat.tools)];

const FloatingMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [activeSection, setActiveSection] = useState("#hero");
    
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
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
            if (dist < 120) {
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

    useEffect(() => {
        const updateScroll = () => {
            const current = scrollY.get();
            const delta = current - lastScrollY.current;
            if (current < 50) setIsVisible(true);
            else if (delta > 20) setIsVisible(false);
            else if (delta < -10) setIsVisible(true);
            lastScrollY.current = current;
        };
        const unsubscribe = scrollY.on("change", updateScroll);
        return () => unsubscribe();
    }, [scrollY]);

    // --- Active Link Highlighting ---
    useEffect(() => {
        const sections = ALL_LINKS.map(link => document.getElementById(link.href.substring(1))).filter(Boolean);
        if (sections.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                     if (entry.intersectionRatio > 0.5) {
                        setActiveSection(`#${entry.target.id}`);
                     }
                }
            });
        }, { rootMargin: "-50% 0px -50% 0px", threshold: [0, 0.5, 1] });

        sections.forEach(section => { if(section) observer.observe(section) });
        return () => sections.forEach(section => { if(section) observer.unobserve(section) });
    }, []);

    const handleMenuToggle = useCallback(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setButtonPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        }
        // FIX: Use functional update to prevent stale state issues with useCallback.
        // This was the root cause of the menu not closing.
        setIsOpen(prev => !prev);
    }, []);

    const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }, [isOpen]);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: `circle(0px at ${buttonPos.x}px ${buttonPos.y}px)` }}
                        animate={{ clipPath: `circle(150% at ${buttonPos.x}px ${buttonPos.y}px)` }}
                        exit={{ clipPath: `circle(0px at ${buttonPos.x}px ${buttonPos.y}px)`, transition: { duration: 0.6, ease: [0.55, 0.085, 0.68, 0.53] } }}
                        transition={{ duration: 0.8, ease: HEAVY_SETTLE }}
                        className="fixed inset-0 z-[9998] bg-[#0B1026]/95 backdrop-blur-xl flex flex-col lg:flex-row overflow-hidden will-change-[clip-path] spotlight-overlay"
                    >
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
                        <div className="w-full lg:w-5/12 h-full flex flex-col justify-center px-8 lg:px-24 relative z-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/20 lg:bg-transparent">
                            <div className="space-y-8 lg:space-y-12">
                                <span className="text-primary/50 text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">The Journal</span>
                                {NARRATIVE_LINKS.map((link, i) => {
                                    const isActive = activeSection === link.href;
                                    return (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            initial={{ y: 40, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 + (i * 0.1), duration: 0.8, ease: HEAVY_SETTLE }}
                                            className="block group"
                                        >
                                            <span className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wide transition-all duration-500 relative block" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>
                                                {link.label}
                                                <span className={`absolute inset-0 text-white transition-opacity duration-500 [text-shadow:0_0_30px_rgba(244,194,194,0.4)] ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} aria-hidden="true">
                                                    {link.label}
                                                </span>
                                            </span>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="w-full lg:w-7/12 h-full bg-black/20 overflow-y-auto custom-scrollbar p-6 lg:p-16 relative z-10">
                             <div className="max-w-4xl mx-auto pt-8 lg:pt-0">
                                {AI_TOOL_CATEGORIES.map((category, catIndex) => (
                                <motion.div key={category.title} className="mb-12"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + (catIndex * 0.1), duration: 0.6, ease: HEAVY_SETTLE }}
                                >
                                    <h3 className="text-primary/50 text-xs font-bold uppercase tracking-[0.3em] block mb-6 sticky top-0 bg-[#0B1026]/80 backdrop-blur-sm py-4 z-20 border-b border-primary/10">{category.title}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                        {category.tools.map((tool, i) => {
                                            const isActive = activeSection === tool.href;
                                            return (
                                                <motion.a
                                                    key={tool.label}
                                                    href={tool.href}
                                                    onClick={(e) => handleLinkClick(e, tool.href)}
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.4 + (i * 0.03), duration: 0.6, ease: HEAVY_SETTLE }}
                                                    whileHover={{ y: -3, scale: 1.02 }}
                                                    className={`group relative p-4 rounded-md border bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,150,190,0.15)] flex items-center gap-4 overflow-hidden ${isActive ? 'bg-primary/10 border-primary/50' : 'border-primary/20 hover:border-primary/50'}`}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                    <div className={`p-2 rounded-md bg-black/40 border transition-all duration-300 relative z-10 ${isActive ? 'text-white border-white/20' : 'text-primary border-white/10 group-hover:text-white group-hover:scale-110'}`}>
                                                        <tool.icon size={18} />
                                                    </div>
                                                    <div className="flex-1 relative z-10">
                                                        <h4 className={`font-body font-bold text-sm tracking-wide ${isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>{tool.label}</h4>
                                                    </div>
                                                </motion.a>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                                ))}
                             </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                ref={buttonRef}
                onClick={handleMenuToggle}
                style={{ x: springX, y: springY }}
                initial={{ scale: 0 }}
                animate={{
                    scale: isVisible ? 1 : 0.8,
                    opacity: isVisible ? 1 : 0.5,
                    boxShadow: isVisible
                        ? [
                            "0 0 10px rgba(37,150,190,0.4), 0 0 20px rgba(37,150,190,0.2)",
                            "0 0 20px rgba(37,150,190,0.6), 0 0 40px rgba(37,150,190,0.3)",
                            "0 0 10px rgba(37,150,190,0.4), 0 0 20px rgba(37,150,190,0.2)"
                          ]
                        : "0 0 10px rgba(37,150,190,0.4), 0 0 20px rgba(37,150,190,0.2)"
                }}
                transition={{
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    opacity: { duration: 0.3 },
                    boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.1 }}
                className="fixed z-[9999] flex items-center justify-center bottom-6 right-6 w-14 h-14 md:bottom-12 md:right-12 md:w-16 md:h-16 rounded-full backdrop-blur-md border border-white/10 text-white bg-[#0F0F0F]/80 transition-shadow duration-500 group outline-none"
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isOpen}
            >
                <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="relative z-10">
                    {isOpen ? <X size={24} className="text-blush" /> : <Menu size={24} strokeWidth={1.5} />}
                </motion.div>
            </motion.button>
        </>
    );
};

export default FloatingMenu;
