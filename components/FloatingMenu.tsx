
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { 
    Menu, X, BookOpen, PenTool, MessageSquare, PlayCircle, Zap
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

// --- Configuration ---
const SPRING_CONFIG = { damping: 20, stiffness: 100, mass: 1 }; 
const IRIS_EASE = [0.76, 0, 0.24, 1]; // Cinematic Ease

const MENU_LINKS = [
    { label: "The Novel", href: "#books", icon: BookOpen, desc: "Start the journey" },
    { label: "AI Experience Hub", href: "#ai-hub", icon: Zap, desc: "Interactive Tools" },
    { label: "The Characters", href: "#protagonists", icon: PlayCircle, desc: "Meet Vijay & Meena" },
    { label: "The Author", href: "#author", icon: PenTool, desc: "Meet Chintan" },
    { label: "Subscribe", href: "#newsletter", icon: MessageSquare, desc: "Join the circle" },
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
    const iconRotate = useTransform(springX, [-20, 20], [-10, 10]);

    // --- Device & Scroll Logic ---
    useEffect(() => {
        const handleResize = () => {
            const checkMobile = window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches;
            setIsMobile(checkMobile);
            if (checkMobile) setIsVisible(true);
        };

        const handleScroll = () => {
            const current = scrollY.get();
            const delta = current - lastScrollY.current;
            const isAtTop = current < 50;

            if (window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches) {
                setIsVisible(true);
            } else {
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

    // --- Magnetic Effect ---
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

    const handleNav = (href: string) => {
        setIsOpen(false);
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }, [isOpen]);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: `circle(0% at calc(100% - 3rem) calc(100% - 3rem))` }}
                        animate={{ clipPath: `circle(150% at calc(100% - 3rem) calc(100% - 3rem))` }}
                        exit={{ clipPath: `circle(0% at calc(100% - 3rem) calc(100% - 3rem))` }}
                        transition={{ duration: 0.7, ease: IRIS_EASE }}
                        className="fixed inset-0 z-[9998] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center overflow-hidden"
                    >
                         <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 md:hidden">
                             <span className="font-display text-primary tracking-widest text-xs uppercase">Menu</span>
                             <ThemeToggle />
                        </div>

                        <div className="w-full max-w-2xl px-8 flex flex-col justify-center items-center text-center space-y-10 relative z-10">
                            {MENU_LINKS.map((link, i) => (
                                <motion.button
                                    key={link.label}
                                    onClick={() => handleNav(link.href)}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="group flex flex-col items-center focus:outline-none"
                                >
                                    <span className="font-display text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500 group-hover:from-primary group-hover:to-blush transition-all duration-500">
                                        {link.label}
                                    </span>
                                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{link.desc}</span>
                                    </div>
                                </motion.button>
                            ))}
                            
                            <div className="hidden md:block pt-8">
                                <ThemeToggle />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999]"
                initial={false}
                animate={{
                    scale: isVisible ? 1 : 0,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
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
                                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                    <X size={28} />
                                </motion.div>
                            ) : (
                                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
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
