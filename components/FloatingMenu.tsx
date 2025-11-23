import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { 
    Menu, X, BookOpen, Sparkles, BrainCircuit, PenTool, 
    Activity, Search, Flame, Key, Music, MessageSquare, Heart, Eye, Lock, MapPin, PlayCircle, Wand2, ChevronRight
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

// --- Configuration ---
// Modified for a "Gentle Snap" effect as requested (Lower stiffness, higher damping)
const SPRING_CONFIG = { damping: 20, stiffness: 100, mass: 1 }; 
const IRIS_EASE = [0.76, 0, 0.24, 1]; // Cinematic Ease

const NARRATIVE_LINKS = [
    { label: "The Novel", href: "#books", icon: BookOpen, desc: "Start the journey" },
    { label: "The Experience", href: "#experience", icon: PlayCircle, desc: "Visuals & Audio" },
    { label: "The Author", href: "#author", icon: PenTool, desc: "Meet Chintan" },
    { label: "Subscribe", href: "#newsletter", icon: MessageSquare, desc: "Join the circle" },
];

const TOOLS = [
    { label: "Unspoken Thoughts", href: "#unspoken", icon: BrainCircuit, color: "text-blue-400" },
    { label: "Tension Heatmap", href: "#heatmap", icon: Activity, color: "text-rose-400" },
    { label: "Co-Write Scene", href: "#finishscene", icon: PenTool, color: "text-emerald-400" },
    { label: "Trope Matcher", href: "#tropematcher", icon: Search, color: "text-purple-400" },
    { label: "Cliffhanger", href: "#cliffhanger", icon: Flame, color: "text-orange-400" },
    { label: "Prediction Game", href: "#prediction", icon: Key, color: "text-yellow-400" },
    { label: "Mood Playlist", href: "#playlist", icon: Music, color: "text-cyan-400" },
    { label: "Destiny Match", href: "#destiny", icon: Sparkles, color: "text-indigo-400" },
    { label: "Character Chat", href: "#connect", icon: MessageSquare, color: "text-green-400" },
    { label: "Love Letter", href: "#muse", icon: Heart, color: "text-pink-400" },
    { label: "Translator", href: "#translator", icon: Wand2, color: "text-fuchsia-400" },
    { label: "Date Planner", href: "#dateplanner", icon: MapPin, color: "text-teal-400" },
];

const FloatingMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    
    // Mouse tracking for magnetic effect
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);
    
    // Magnetic Motion Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, SPRING_CONFIG);
    const springY = useSpring(y, SPRING_CONFIG);
    
    // Icon Rotation
    const iconRotate = useTransform(springX, [-20, 20], [-10, 10]);

    // --- Menu Parallax Logic ---
    const menuX = useMotionValue(0);
    const menuY = useMotionValue(0);
    // Smooth springs for background gradients
    const bgX = useSpring(menuX, { stiffness: 30, damping: 30 });
    const bgY = useSpring(menuY, { stiffness: 30, damping: 30 });
    // Invert movement for secondary layer to create depth
    const bgXInv = useTransform(bgX, (val) => -val);
    const bgYInv = useTransform(bgY, (val) => -val);

    const handleMenuMouseMove = (e: React.MouseEvent) => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        // Calculate offset from center, scaled down for subtlety
        const offsetX = (e.clientX - width / 2) / 30; 
        const offsetY = (e.clientY - height / 2) / 30;
        
        menuX.set(offsetX);
        menuY.set(offsetY);
    };

    // --- Device & Scroll Logic ---
    useEffect(() => {
        const handleResize = () => {
            // Robust check: Width < 1024 OR Touch capability
            const checkMobile = window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches;
            setIsMobile(checkMobile);
            
            // If mobile, FORCE visible. If desktop, reset.
            if (checkMobile) setIsVisible(true);
        };

        // Scroll Logic for Desktop only
        const handleScroll = () => {
            const current = scrollY.get();
            const delta = current - lastScrollY.current;
            const isAtTop = current < 50;

            // On Mobile/Tablet: ALWAYS VISIBLE. No exceptions.
            if (window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches) {
                setIsVisible(true);
            } else {
                // Desktop: Hide on scroll down, Show on scroll up
                if (isAtTop) setIsVisible(true);
                else if (delta > 20 && !isOpen) setIsVisible(false);
                else if (delta < -10) setIsVisible(true);
            }
            lastScrollY.current = current;
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        const unsubscribeScroll = scrollY.on("change", handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            unsubscribeScroll();
        };
    }, [scrollY, isOpen]);

    // --- Magnetic Effect (Desktop Only) ---
    const handleMouseMove = (e: React.MouseEvent) => {
        if (isMobile || isOpen) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

        if (distance < 100) {
            x.set((e.clientX - centerX) * 0.3);
            y.set((e.clientY - centerY) * 0.3);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // --- Navigation Logic ---
    const handleNav = (href: string) => {
        setIsOpen(false);
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
            // Small delay to allow menu to close cinematically first
            setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    };

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    return (
        <>
            {/* --- THE IMMERSIVE OVERLAY --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: `circle(0% at calc(100% - 3rem) calc(100% - 3rem))` }}
                        animate={{ clipPath: `circle(150% at calc(100% - 3rem) calc(100% - 3rem))` }}
                        exit={{ clipPath: `circle(0% at calc(100% - 3rem) calc(100% - 3rem))` }}
                        transition={{ duration: 0.7, ease: IRIS_EASE }}
                        className="fixed inset-0 z-[9998] bg-[#050505]/95 backdrop-blur-xl flex flex-col md:flex-row overflow-hidden"
                        onMouseMove={handleMenuMouseMove}
                    >
                         {/* Parallax Background Blobs */}
                        <motion.div 
                            style={{ x: bgX, y: bgY }}
                            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none opacity-60 z-0"
                        />
                        <motion.div 
                            style={{ x: bgXInv, y: bgYInv }}
                            className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blush/5 rounded-full blur-[150px] pointer-events-none opacity-60 z-0"
                        />

                        {/* Background Noise Texture */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" />

                        {/* Top Bar for Mobile (Close & Theme) */}
                        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 md:hidden">
                             <span className="font-display text-primary tracking-widest text-xs uppercase">Menu</span>
                             <ThemeToggle />
                        </div>

                        {/* --- LEFT PANEL: NARRATIVE (Main Links) --- */}
                        <div className="w-full md:w-5/12 h-[40vh] md:h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 border-b md:border-b-0 md:border-r border-white/10 relative z-10 pt-20 md:pt-0">
                            <div className="space-y-6 md:space-y-10">
                                {NARRATIVE_LINKS.map((link, i) => (
                                    <motion.button
                                        key={link.label}
                                        onClick={() => handleNav(link.href)}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                        className="group flex flex-col text-left focus:outline-none"
                                    >
                                        <span className="font-display text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500 group-hover:from-primary group-hover:to-blush transition-all duration-500">
                                            {link.label}
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-4 group-hover:translate-x-0">
                                            <span className="h-px w-8 bg-primary"></span>
                                            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{link.desc}</span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                            
                            {/* Desktop Theme Toggle Position */}
                            <div className="hidden md:block absolute bottom-12 left-16 lg:left-24">
                                <ThemeToggle />
                            </div>
                        </div>

                        {/* --- RIGHT PANEL: TOOLS (Grid) --- */}
                        <div className="w-full md:w-7/12 h-[60vh] md:h-full bg-white/[0.02] overflow-y-auto custom-scrollbar p-6 md:p-16 lg:p-20 relative z-10">
                            <div className="max-w-4xl mx-auto h-full flex flex-col">
                                <motion.h3 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    transition={{ delay: 0.5 }}
                                    className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-8 sticky top-0 bg-[#0c0c0c]/90 backdrop-blur-md py-4 z-20 w-full"
                                >
                                    Interactive Experience
                                </motion.h3>
                                
                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pb-20">
                                    {TOOLS.map((tool, i) => (
                                        <motion.button
                                            key={tool.label}
                                            onClick={() => handleNav(tool.href)}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 + (i * 0.05) }}
                                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex flex-col items-center justify-center p-4 md:p-6 rounded-sm border border-white/5 bg-black/20 hover:border-primary/30 transition-all duration-300 group text-center gap-3 aspect-square sm:aspect-auto sm:h-32"
                                        >
                                            <tool.icon size={24} className={`mb-1 transition-transform group-hover:scale-110 duration-300 ${tool.color}`} />
                                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">
                                                {tool.label}
                                            </span>
                                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-primary transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- THE FLOATING TRIGGER BUTTON --- */}
            <motion.div
                className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999]"
                initial={false}
                animate={{
                    scale: isVisible ? 1 : 0,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Pulse Ring (Optimistic UI) */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75 duration-[3s]"></div>
                
                <motion.button
                    ref={buttonRef}
                    onClick={() => setIsOpen(!isOpen)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ x: springX, y: springY }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                        relative w-14 h-14 md:w-16 md:h-16 rounded-full 
                        flex items-center justify-center 
                        shadow-[0_0_30px_rgba(37,150,190,0.4)]
                        border border-white/10
                        transition-colors duration-300
                        ${isOpen ? 'bg-white text-black' : 'bg-[#0F0F0F] text-white hover:bg-black'}
                    `}
                    aria-label="Toggle Menu"
                >
                    <motion.div style={{ rotate: iconRotate }} className="relative z-10">
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={28} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={28} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.button>
            </motion.div>
        </>
    );
};

export default FloatingMenu;