
import React, { useState } from 'react';
import { Gem, Sparkles, Feather, X, Loader2 } from 'lucide-react';
import { callGeminiMemoryWeaver } from '../services/geminiService';

const KEYWORD_PRESETS = [
    "Jasmine", "Rain", "Silk", "Coffee", "Rust", "Gold", 
    "Whisper", "Traffic", "Moonlight", "Sweat", "Petrichor", 
    "Silence", "Temple", "Balcony", "Touch", "Shadow"
];

const MemoryWeaver: React.FC = () => {
    const [keywords, setKeywords] = useState<string[]>([]);
    const [output, setOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const toggleKeyword = (word: string) => {
        if (keywords.includes(word)) {
            setKeywords(prev => prev.filter(k => k !== word));
        } else {
            if (keywords.length < 3) {
                setKeywords(prev => [...prev, word]);
            }
        }
    };

    const handleWeave = async () => {
        if (keywords.length === 0) return;
        setIsLoading(true);
        setOutput("");
        const response = await callGeminiMemoryWeaver(keywords);
        setOutput(response);
        setIsLoading(false);
    };

    return (
        <section id="memory" className="py-32 bg-black border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,194,194,0.05),transparent_70%)] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-blush text-xs tracking-[0.3em] uppercase font-bold mb-4">
                         <Gem size={12} /> <span>Nostalgia Engine</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-6">Sensory Memory Weaver</h2>
                    <p className="text-slate-400 font-body font-light text-lg max-w-2xl mx-auto leading-relaxed">
                        Select three sensory fragments. The AI will weave them into a lost memory from Vijay and Meena's past.
                    </p>
                </div>

                <div className="bg-onyx/50 p-8 md:p-12 rounded-sm border border-white/10 shadow-2xl">
                    
                    {/* Keyword Selector */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {KEYWORD_PRESETS.map(word => {
                            const isSelected = keywords.includes(word);
                            return (
                                <button
                                    key={word}
                                    onClick={() => toggleKeyword(word)}
                                    disabled={!isSelected && keywords.length >= 3}
                                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${isSelected ? 'bg-white text-black border-white shadow-glow scale-105' : 'bg-transparent border-white/10 text-slate-500 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed'}`}
                                >
                                    {word}
                                </button>
                            )
                        })}
                    </div>

                    <div className="text-center mb-10 h-12">
                        {keywords.length > 0 ? (
                            <div className="flex items-center justify-center gap-4 animate-fade-in">
                                {keywords.map(k => (
                                    <span key={k} className="text-primary font-serif italic text-lg">{k}</span>
                                ))}
                            </div>
                        ) : (
                            <span className="text-slate-600 text-xs uppercase tracking-widest">Select up to 3 fragments</span>
                        )}
                    </div>

                    <div className="flex justify-center mb-12">
                        <button 
                            onClick={handleWeave}
                            disabled={isLoading || keywords.length === 0}
                            className="group relative px-10 py-4 bg-transparent border border-primary/50 text-primary hover:text-white hover:bg-primary/10 rounded-sm transition-all overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]">
                                {isLoading ? <Loader2 className="animate-spin" size={14} /> : <Feather size={14} />} 
                                {isLoading ? "Weaving..." : "Weave Memory"}
                            </span>
                            <div className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        </button>
                    </div>

                    {/* Output Area */}
                    <div className="relative min-h-[200px] flex items-center justify-center border-t border-white/5 pt-10">
                        {output ? (
                            <div className="animate-fade-in-up max-w-2xl text-center">
                                <Sparkles size={24} className="text-blush mx-auto mb-6 opacity-70" />
                                <p className="font-serif text-xl md:text-2xl leading-loose text-slate-200 italic">
                                    "{output}"
                                </p>
                            </div>
                        ) : (
                            !isLoading && <p className="text-slate-700 font-serif italic opacity-50">The past is waiting to be remembered...</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MemoryWeaver;
