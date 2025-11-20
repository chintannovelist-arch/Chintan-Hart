
import React, { useState, useEffect } from 'react';
import { Lock, Unlock, BrainCircuit, ChevronRight, Shield } from 'lucide-react';
import { callGeminiUnspokenThoughts } from '../services/geminiService';
import { UNSPOKEN_SCENES } from '../constants';

const UnspokenThoughts: React.FC = () => {
    const [selectedSceneId, setSelectedSceneId] = useState(UNSPOKEN_SCENES[0].id);
    const [unlockedThoughts, setUnlockedThoughts] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [loadingMessage, setLoadingMessage] = useState("Deciphering Silence...");

    const currentScene = UNSPOKEN_SCENES.find(s => s.id === selectedSceneId) || UNSPOKEN_SCENES[0];
    const isCurrentUnlocked = !!unlockedThoughts[selectedSceneId];

    const loadingMessages = [
        "Deciphering silence...",
        "Reading between the lines...",
        "Unlocking guarded secrets...",
        "Analyzing Vijay's restraint...",
        "Translating the unspoken..."
    ];

    useEffect(() => {
        let interval: any;
        if (isLoading) {
            let i = 0;
            interval = setInterval(() => {
                i = (i + 1) % loadingMessages.length;
                setLoadingMessage(loadingMessages[i]);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleReveal = async () => {
        if (isCurrentUnlocked) return;
        
        setIsLoading(true);
        setError("");
        setLoadingMessage("Deciphering Silence...");
        
        try {
            const result = await callGeminiUnspokenThoughts(currentScene.title, currentScene.trigger);
            
            // Check for specific thematic error messages returned by the service
            if (result.includes("guarded") || result.includes("silence remains") || !result) {
                 setError("His thoughts are too guarded right now. The silence remains unbroken.");
            } else {
                setUnlockedThoughts(prev => ({...prev, [selectedSceneId]: result}));
            }
        } catch (e) {
            setError("His thoughts are too guarded right now. The silence remains unbroken.");
        }
        
        setIsLoading(false);
    };

    return (
        <section id="unspoken" className="py-32 bg-black relative border-b border-white/5">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-sm text-slate-300 text-xs tracking-widest uppercase mb-6 font-bold">
                        <BrainCircuit size={12} className="text-primary" /> <span>Narrative Expansion</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Unspoken Thoughts</h2>
                    <p className="text-slate-400 font-body font-light max-w-xl mx-auto">
                        The novel is written in limited perspective. Use AI to unlock Vijay's internal monologue during key moments of silence.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 bg-onyx border border-white/10 rounded-sm shadow-2xl overflow-hidden min-h-[600px]">
                    
                    {/* Sidebar Selector */}
                    <div className="lg:col-span-4 bg-black/40 border-r border-white/5 p-6 flex flex-col gap-2">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">Select a Moment</h3>
                        <div className="overflow-y-auto custom-scrollbar flex-1 pr-2 space-y-2">
                            {UNSPOKEN_SCENES.map((scene) => (
                                <button 
                                    key={scene.id}
                                    onClick={() => { setSelectedSceneId(scene.id); setError(""); }}
                                    className={`w-full text-left p-4 rounded-sm border-l-2 transition-all duration-300 group relative ${selectedSceneId === scene.id ? 'border-primary bg-white/5' : 'border-transparent hover:bg-white/5 hover:border-white/20'}`}
                                >
                                    <span className={`block font-bold text-xs uppercase tracking-wider mb-1 ${selectedSceneId === scene.id ? 'text-primary' : 'text-slate-500'}`}>{scene.title.split(':')[0]}</span>
                                    <span className={`block font-serif text-sm ${selectedSceneId === scene.id ? 'text-white' : 'text-slate-400'}`}>{scene.title.split(':')[1]}</span>
                                    {unlockedThoughts[scene.id] && <Unlock size={12} className="absolute top-4 right-4 text-blush" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-8 p-8 md:p-12 relative flex flex-col">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blush to-transparent opacity-50"></div>
                        
                        {/* Scene Context Header */}
                        <div className="mb-10 relative z-10">
                            <div className="flex items-center gap-3 text-slate-500 mb-4 text-xs font-bold uppercase tracking-[0.2em]">
                                <span>The Context</span>
                                <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                            <p className="font-serif text-lg text-slate-300 italic leading-relaxed border-l-2 border-white/10 pl-6">
                                "{currentScene.context}"
                            </p>
                            <div className="mt-6 bg-white/5 p-4 rounded-sm border border-white/5 inline-block">
                                <span className="text-primary text-[10px] font-bold uppercase tracking-widest block mb-1">Trigger Action</span>
                                <span className="text-white font-body text-sm">{currentScene.trigger}</span>
                            </div>
                        </div>

                        {/* Interaction Zone */}
                        <div className="flex-1 flex items-center justify-center relative bg-black/20 rounded-sm border border-white/5 p-8">
                            
                            {/* Locked State */}
                            {!isCurrentUnlocked && !isLoading && !error && (
                                <div className="text-center z-20">
                                    <div className="mb-6 relative inline-block">
                                        <Lock size={32} className="text-slate-500 relative z-10" />
                                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                                    </div>
                                    <p className="text-slate-400 font-serif italic mb-8 max-w-sm mx-auto">
                                        Vijay is silent. His face is unreadable. But his mind is racing.
                                    </p>
                                    <button 
                                        onClick={handleReveal}
                                        className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-sm transition-all hover:scale-105 focus:outline-none"
                                    >
                                        <div className="absolute inset-0 border border-primary/50 rounded-sm"></div>
                                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors"></div>
                                        <span className="relative flex items-center gap-3 text-primary font-bold uppercase text-xs tracking-[0.25em] group-hover:text-white transition-colors">
                                            Reveal His Thoughts <ChevronRight size={14} />
                                        </span>
                                        {/* Pulse Animation */}
                                        <span className="absolute -inset-1 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></span>
                                    </button>
                                </div>
                            )}

                            {/* Loading State */}
                            {isLoading && (
                                <div className="text-center z-20">
                                    <div className="relative w-16 h-16 mx-auto mb-6">
                                        <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
                                        <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
                                        <BrainCircuit size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/50" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 animate-pulse transition-all duration-500">{loadingMessage}</p>
                                    <p className="text-[10px] text-slate-600 mt-2 font-serif italic">Accessing subtext from {currentScene.title}...</p>
                                </div>
                            )}

                            {/* Error State - Thematic */}
                            {error && (
                                <div className="text-center z-20 animate-fade-in">
                                    <Shield size={32} className="text-slate-600 mx-auto mb-4 opacity-70" />
                                    <p className="text-slate-400 italic font-serif mb-6">{error}</p>
                                    <button 
                                        onClick={handleReveal} 
                                        className="text-xs uppercase tracking-widest text-primary border-b border-primary/30 hover:text-white hover:border-white transition-colors pb-1"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}

                            {/* Unlocked Content */}
                            {isCurrentUnlocked && (
                                <div className="w-full animate-fade-in-up">
                                    <div className="flex items-center gap-2 mb-6 justify-center">
                                        <Unlock size={14} className="text-blush" />
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-blush font-bold">Internal Monologue</span>
                                    </div>
                                    <div className="font-serif text-xl md:text-2xl leading-loose text-white text-center italic drop-shadow-lg">
                                        "{unlockedThoughts[selectedSceneId]}"
                                    </div>
                                </div>
                            )}
                            
                            {/* Background texture for the box */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10 pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UnspokenThoughts;
