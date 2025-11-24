
import React, { useState } from 'react';
import { Fingerprint, Info, MousePointer2, X, RefreshCw, User, ScanLine, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { callGeminiAnatomy } from '../services/geminiService';

// --- Data Configuration ---

const ZONES = {
    Vijay: [
        { id: 'v_ear', label: 'Ear', desc: 'Breath proximity.', top: '18%', left: '45%' },
        { id: 'v_jaw', label: 'Jaw', desc: 'Rough stubble.', top: '23%', left: '48%' },
        { id: 'v_nape', label: 'Nape', desc: 'Vulnerable point.', top: '21%', left: '55%' },
        { id: 'v_collar', label: 'Collar', desc: 'Hollow dip.', top: '30%', left: '50%' },
        { id: 'v_chest', label: 'Chest', desc: 'Hard muscle.', top: '40%', left: '50%' },
        { id: 'v_wrist', label: 'Wrist', desc: 'Rapid pulse.', top: '55%', left: '20%' },
        { id: 'v_hand', label: 'Hand', desc: 'Veined strength.', top: '65%', left: '15%' },
        { id: 'v_thigh', label: 'Thigh', desc: 'High friction.', top: '75%', left: '40%' }
    ],
    Meena: [
        { id: 'm_temple', label: 'Temple', desc: 'Eye flutter.', top: '15%', left: '48%' },
        { id: 'm_throat', label: 'Throat', desc: 'Voice catch.', top: '24%', left: '50%' },
        { id: 'm_neck', label: 'Neck', desc: 'Bare skin.', top: '22%', left: '55%' },
        { id: 'm_waist', label: 'Waist', desc: 'Soft curve.', top: '45%', left: '50%' },
        { id: 'm_palm', label: 'Palm', desc: 'Finger curl.', top: '60%', left: '20%' },
        { id: 'm_hip', label: 'Hip', desc: 'Yielding sway.', top: '52%', left: '65%' },
        { id: 'm_midriff', label: 'Midriff', desc: 'Saree gap.', top: '48%', left: '48%' }
    ]
};

const CHARACTER_IMAGES = {
    Vijay: "assets/anatomy-vijay.jpg",
    Meena: "assets/anatomy-meena.jpg"
};

// --- Components ---

const TouchPoint = ({ top, left, label, isActive, onClick }: any) => (
    <button
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className="absolute w-10 h-10 -ml-5 -mt-5 group focus:outline-none z-30 flex items-center justify-center"
        style={{ top, left }}
        aria-label={`Touch ${label}`}
    >
        {/* Outer Ripple */}
        <span className={`absolute inset-0 rounded-full border transition-all duration-1000 ${isActive ? 'border-white bg-white/20 scale-150 animate-pulse' : 'border-primary/30 bg-primary/5 group-hover:scale-125 group-hover:border-primary/60'}`}></span>
        
        {/* Inner Core */}
        <span className={`relative w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,1)] scale-125' : 'bg-primary/60 group-hover:bg-white'}`}></span>

        {/* Connecting Line & Label */}
        <div className={`absolute left-8 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${isActive ? 'opacity-100 left-10' : ''}`}>
             <div className="w-8 h-px bg-gradient-to-r from-white to-transparent"></div>
             <span className="bg-black/80 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm border-l-2 border-primary whitespace-nowrap shadow-lg">
                {label}
            </span>
        </div>
    </button>
);

// Organic, smooth silhouettes instead of robotic blocks
const Silhouette = ({ character }: { character: "Vijay" | "Meena" }) => (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-black opacity-90"></div>
        
        {/* Abstract Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]"></div>

        {character === "Vijay" ? (
             <svg viewBox="0 0 200 400" className="h-[95%] w-auto opacity-80 drop-shadow-[0_0_15px_rgba(37,150,190,0.2)]">
                <defs>
                    <linearGradient id="gradVijay" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} /> {/* Slate-800 */}
                        <stop offset="50%" style={{ stopColor: '#0f172a', stopOpacity: 1 }} /> {/* Slate-900 */}
                        <stop offset="100%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                {/* Broad shoulders, tapered waist, masculine stance */}
                <path d="M60,380 L65,280 Q60,240 50,200 Q40,180 40,150 Q35,120 50,110 L80,100 Q70,80 70,60 Q70,30 100,30 Q130,30 130,60 Q130,80 120,100 L150,110 Q165,120 160,150 Q160,180 150,200 Q140,240 135,280 L140,380 Z" fill="url(#gradVijay)" stroke="#2596be" strokeWidth="0.5" strokeOpacity="0.3" />
            </svg>
        ) : (
             <svg viewBox="0 0 200 400" className="h-[95%] w-auto opacity-80 drop-shadow-[0_0_15px_rgba(244,194,194,0.2)]">
                <defs>
                    <linearGradient id="gradMeena" x1="0%" y1="0%" x2="100%" y2="0%">
                         <stop offset="0%" style={{ stopColor: '#281218', stopOpacity: 1 }} /> {/* Dark Rose */}
                        <stop offset="50%" style={{ stopColor: '#1a0b0e', stopOpacity: 1 }} /> 
                        <stop offset="100%" style={{ stopColor: '#281218', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                {/* Saree drape suggestion, softer curves */}
                <path d="M70,380 L75,280 Q60,240 65,200 Q60,170 70,150 L60,120 Q55,110 75,100 L85,95 Q75,85 75,65 Q75,40 100,40 Q125,40 125,65 Q125,85 115,95 L125,100 Q145,110 140,120 L130,150 Q140,170 135,200 Q140,240 125,280 L130,380 Z" fill="url(#gradMeena)" stroke="#F4C2C2" strokeWidth="0.5" strokeOpacity="0.3" />
                {/* Saree drape line */}
                <path d="M75,110 Q100,140 130,150 Q140,250 125,380" fill="none" stroke="#F4C2C2" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 4"/>
            </svg>
        )}
    </div>
);

const AnatomyOfDesire: React.FC = () => {
    const [character, setCharacter] = useState<"Meena" | "Vijay">("Vijay");
    const [activeZone, setActiveZone] = useState<string | null>(null);
    const [sensation, setSensation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [imgError, setImgError] = useState<Record<string, boolean>>({});

    const handleZoneClick = async (zoneLabel: string) => {
        if (activeZone === zoneLabel) {
            handleReset();
            return;
        }

        setActiveZone(zoneLabel);
        setIsLoading(true);
        setSensation("");
        
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(30);

        const response = await callGeminiAnatomy(character === "Vijay" ? "Meena" : "Vijay", zoneLabel);
        setSensation(response);
        setIsLoading(false);
    };

    const handleReset = () => {
        setActiveZone(null);
        setSensation("");
    };

    const currentZoneData = ZONES[character].find(z => z.label === activeZone);

    return (
        <section id="anatomy" className="py-24 bg-[#050505] relative border-b border-white/5 overflow-hidden min-h-[800px] flex flex-col select-none">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,150,190,0.05),transparent_70%)] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex-1 flex flex-col justify-between">
                
                {/* Header HUD */}
                <div className="flex flex-col md:flex-row justify-between items-start pt-4 gap-6 mb-8 animate-fade-in">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-slate-300 text-[10px] tracking-widest uppercase font-bold mb-2 shadow-glass">
                            <Fingerprint size={12} className={character === "Vijay" ? "text-blue-400" : "text-pink-400"} /> 
                            <span>Sensory Map</span>
                        </div>
                        <h2 className="font-display text-4xl text-white drop-shadow-lg tracking-wide">Anatomy of Desire</h2>
                    </div>

                    {/* Character Switcher */}
                    <div className="flex bg-black/60 backdrop-blur-xl rounded-full p-1 border border-white/10 shadow-2xl">
                        <button 
                            onClick={() => { setCharacter("Vijay"); handleReset(); }}
                            className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${character === "Vijay" ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-500/30' : 'text-slate-500 hover:text-white'}`}
                        >
                            <User size={14}/> Vijay
                        </button>
                        <button 
                            onClick={() => { setCharacter("Meena"); handleReset(); }}
                            className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${character === "Meena" ? 'bg-pink-500/20 text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.3)] border border-pink-500/30' : 'text-slate-500 hover:text-white'}`}
                        >
                            <User size={14}/> Meena
                        </button>
                    </div>
                </div>

                {/* Main Interactive Area */}
                <div className="flex-1 grid md:grid-cols-2 gap-12 items-center justify-center relative">
                    
                    {/* Left: Interactive Model */}
                    <div className="relative h-[500px] md:h-[600px] w-full max-w-md mx-auto flex items-center justify-center group perspective-1000" onClick={handleReset}>
                         {/* Scanning Line Effect */}
                         <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-lg">
                             <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent absolute top-0 animate-[scan_4s_linear_infinite] opacity-30"></div>
                         </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={character}
                                initial={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
                                transition={{ duration: 0.6, ease: "circOut" }}
                                className="relative h-full w-full"
                            >
                                {/* Character Visual Container */}
                                <div className="relative h-full w-full rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black/50">
                                    
                                    {!imgError[character] ? (
                                        <div className="relative h-full w-full">
                                            <img 
                                                src={CHARACTER_IMAGES[character]} 
                                                alt={`${character} Anatomy`} 
                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700 mix-blend-lighten"
                                                onError={() => setImgError(prev => ({...prev, [character]: true}))}
                                            />
                                             {/* Overlay to unify image style */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none"></div>
                                            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none"></div>
                                        </div>
                                    ) : (
                                        <Silhouette character={character} />
                                    )}

                                    {/* Touch Points Layer */}
                                    <div className="absolute inset-0">
                                        {ZONES[character].map((zone) => (
                                            <TouchPoint 
                                                key={zone.id}
                                                {...zone}
                                                isActive={activeZone === zone.label}
                                                onClick={() => handleZoneClick(zone.label)}
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Scanning Grid Overlay */}
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right: Info & Response */}
                    <div className="flex flex-col h-full justify-center pointer-events-none">
                        <div className="pointer-events-auto space-y-6">
                             {/* Guide Panel */}
                            <div className="bg-black/40 backdrop-blur-md p-6 rounded-lg border border-white/5 flex items-center gap-4 text-slate-400 text-xs shadow-xl">
                                <ScanLine size={20} className="text-primary animate-pulse"/>
                                <span>Touch a glowing sensor to analyze the visceral reaction.</span>
                            </div>
                            
                             {/* Zone Chips (Quick Navigation) */}
                             <div className="flex flex-wrap gap-2">
                                {ZONES[character].map(z => (
                                    <button 
                                        key={z.id}
                                        onClick={() => handleZoneClick(z.label)}
                                        className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded-sm border backdrop-blur-sm transition-all duration-300 ${activeZone === z.label ? 'border-primary text-primary bg-primary/20 shadow-glow' : 'border-white/5 text-slate-500 bg-black/60 hover:bg-white/10 hover:text-white'}`}
                                    >
                                        {z.label}
                                    </button>
                                ))}
                            </div>

                            {/* Response Card */}
                            <AnimatePresence mode="wait">
                                {activeZone && (
                                    <motion.div 
                                        key="response"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                        className="w-full bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-xl shadow-[0_0_60px_rgba(37,150,190,0.1)] relative overflow-hidden mt-4"
                                    >
                                        {/* Decorative Bar */}
                                        <div className={`absolute top-0 left-0 w-1 h-full ${character === "Vijay" ? "bg-blue-500 shadow-[0_0_15px_#3b82f6]" : "bg-pink-500 shadow-[0_0_15px_#ec4899]"}`}></div>
                                        <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={80} className="text-white"/></div>
                                        
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className={`w-2 h-2 rounded-full ${character === "Vijay" ? "bg-blue-500 animate-pulse" : "bg-pink-500 animate-pulse"}`}></span>
                                                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Neural Feedback</span>
                                                    </div>
                                                    <h3 className="text-3xl font-display text-white">{activeZone}</h3>
                                                </div>
                                                <button onClick={handleReset} className="p-2 bg-white/5 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                                                    <X size={18} />
                                                </button>
                                            </div>

                                            {isLoading ? (
                                                <div className="py-8 flex flex-col items-center gap-4 border-t border-white/5">
                                                    <RefreshCw className="animate-spin text-primary" size={24} />
                                                    <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold animate-pulse">
                                                        Decoding sensation...
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="animate-fade-in pt-4 border-t border-white/5">
                                                    <p className="font-serif text-xl leading-relaxed text-slate-100 italic mb-6">
                                                        "{sensation}"
                                                    </p>
                                                    <div className="flex items-center gap-3 text-xs text-slate-400 uppercase tracking-widest font-bold bg-white/5 p-4 rounded-md border border-white/5">
                                                        <Info size={16} className="text-primary" />
                                                        <span>Context: {currentZoneData?.desc}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
            {/* CSS for Scanning Animation */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 0.5; }
                    90% { opacity: 0.5; }
                    100% { top: 100%; opacity: 0; }
                }
            `}} />
        </section>
    );
};

export default AnatomyOfDesire;
