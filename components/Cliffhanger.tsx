
import React, { useState } from 'react';
import { Flame, Lock, ArrowRight, Play } from 'lucide-react';
import { callGeminiCliffhanger } from '../services/geminiService';
import { BOOKS, CLIFFHANGER_SCENARIOS } from '../constants';

const Cliffhanger: React.FC = () => {
    const [scenario, setScenario] = useState(CLIFFHANGER_SCENARIOS[0]);
    const [story, setStory] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const generate = async () => {
        setIsLoading(true);
        setStory("");
        const res = await callGeminiCliffhanger(scenario);
        setStory(res);
        setIsLoading(false);
    };

    return (
        <section id="cliffhanger" className="py-32 bg-black relative overflow-hidden">
            {/* Dramatic lighting effect */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
            
            <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                <div className="mb-16 space-y-6">
                    <div className="inline-flex items-center gap-3 text-blush text-[10px] tracking-[0.4em] uppercase font-bold animate-pulse-slow">
                        <Flame size={12} /> <span>Voltage Level: Critical</span>
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl text-white">The Cliffhanger Engine</h2>
                    <p className="text-slate-500 font-body font-light tracking-wide text-lg">Select a high-tension moment. Experience the silence before the storm.</p>
                </div>
                
                <div className="bg-onyx/80 backdrop-blur-md border border-white/10 rounded-sm p-10 md:p-16 shadow-2xl relative min-h-[600px] flex flex-col transition-all duration-700 group">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                    
                    {!story && !isLoading && (
                        <div className="flex-1 flex flex-col items-center justify-center gap-12">
                            <div className="w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center text-primary bg-black/40 shadow-glow group-hover:scale-110 transition-transform duration-500">
                                <Play size={40} className="ml-1" />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                                {CLIFFHANGER_SCENARIOS.map(s => (
                                    <button 
                                        key={s} 
                                        onClick={() => { setScenario(s); generate(); }}
                                        className="px-4 py-4 bg-black/50 hover:bg-primary hover:text-white border border-white/10 hover:border-primary rounded-sm transition-all duration-300 transform hover:scale-105 font-body font-bold uppercase tracking-[0.1em] text-[10px] text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary flex items-center justify-center text-center h-full"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex-1 flex flex-col items-center justify-center gap-8">
                            {/* Custom Fuse Loading Animation */}
                            <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="absolute top-0 left-0 h-full w-1/2 bg-primary shadow-[0_0_15px_rgba(37,150,190,0.8)] animate-[loadingBar_1.5s_infinite_ease-in-out]"></div>
                            </div>
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary animate-pulse">Constructing Scene...</p>
                        </div>
                    )}

                    {story && (
                        <div className="text-left animate-fade-in flex-1 flex flex-col">
                            <div className="mb-8 border-b border-white/10 pb-4">
                                <span className="text-primary text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">Scenario</span>
                                <h3 className="text-white font-display text-2xl tracking-wide">{scenario}</h3>
                            </div>

                            <div className="font-body font-light text-lg md:text-xl leading-loose text-slate-200 mb-12 opacity-90 tracking-wide whitespace-pre-wrap">
                                {story}
                            </div>
                            
                            <div className="mt-auto relative p-8 bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary overflow-hidden group/lock cursor-pointer">
                                <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover/lock:translate-x-0 transition-transform duration-700"></div>
                                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-4 text-white">
                                        <div className="p-3 bg-primary/20 rounded-full"><Lock size={18} /></div>
                                        <div>
                                            <span className="block font-display text-xl tracking-wider">Tension Locked</span>
                                            <span className="text-[10px] text-primary uppercase tracking-[0.25em] font-bold">Read the Full Scene</span>
                                        </div>
                                    </div>
                                    <a 
                                        href={BOOKS[0].amazonLink} 
                                        className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white group-hover/lock:text-blush transition-colors"
                                    >
                                        Resolve on Kindle <ArrowRight size={16} className="group-hover/lock:translate-x-2 transition-transform" />
                                    </a>
                                </div>
                            </div>
                            
                            <button onClick={() => setStory("")} className="mx-auto mt-8 text-[10px] text-slate-600 hover:text-white uppercase tracking-[0.2em] transition-colors border-b border-transparent hover:border-slate-500 pb-1">
                                Reset Simulation
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Cliffhanger;
