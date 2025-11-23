

import React, { useState, useCallback } from 'react';
import { Heart, Search, BookOpen, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { callGeminiTropeMatch } from '../services/geminiService';
import { BOOKS } from '../constants';

// --- Sub-components for Performance Optimization ---

const TropeInputForm = React.memo(({ onMatch, isLoading }: { onMatch: (trope: string) => void; isLoading: boolean; }) => {
    const [input, setInput] = useState("");

    const handleMatchClick = () => {
        if (!input.trim()) return;
        onMatch(input);
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleMatchClick();
        }
    };

    return (
        <div className="relative group pt-4">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-blush/50 rounded-sm blur opacity-20 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative bg-black flex flex-col sm:flex-row items-stretch shadow-2xl">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. Slow burn, Enemies to lovers..." 
                    className="flex-1 bg-transparent px-6 py-5 outline-none text-white placeholder:text-slate-600 font-body tracking-wide border border-white/10 focus:border-primary/50 transition-colors focus:ring-1 focus:ring-primary/20"
                    aria-label="Enter your favorite trope"
                />
                <button 
                    onClick={handleMatchClick} 
                    disabled={isLoading || !input}
                    className="bg-white/5 hover:bg-primary text-white px-8 py-4 sm:py-0 border-l border-white/10 font-bold uppercase text-xs tracking-[0.2em] transition-all duration-300 disabled:opacity-30 flex items-center justify-center gap-2 group/btn min-w-[140px]"
                >
                    {isLoading ? <Loader2 size={16} className="animate-spin text-white" /> : <>Match <Sparkles size={14} className="group-hover/btn:text-yellow-200 transition-colors"/></>}
                </button>
            </div>
        </div>
    );
});
TropeInputForm.displayName = 'TropeInputForm';


const TropeResultDisplay = ({ result, isLoading }: { result: string; isLoading: boolean; }) => (
    <div className="relative min-h-[400px] perspective-1000 group">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-blush/5 rounded-sm blur-2xl transform rotate-3 opacity-60 transition-opacity group-hover:opacity-80"></div>
        <div className="relative bg-black/60 backdrop-blur-2xl border border-white/10 rounded-sm p-10 md:p-12 h-full flex flex-col justify-center shadow-glass transition-transform duration-700 border-t-white/20">
            {isLoading ? (
                <div className="animate-pulse space-y-6">
                    <div className="w-12 h-12 bg-white/10 rounded-full mx-auto"></div>
                    <div className="h-4 bg-white/10 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-white/5 rounded w-1/2 mx-auto"></div>
                    <div className="h-px w-full bg-white/5 my-8"></div>
                    <div className="h-3 bg-white/5 rounded w-1/4 mx-auto"></div>
                </div>
            ) : result ? (
                <div className="animate-fade-in">
                    <Heart className="text-primary mb-8 fill-primary/10" size={40} strokeWidth={1} />
                    <div className="font-body font-light text-lg md:text-xl text-slate-200 leading-relaxed mb-10 tracking-wide">
                        "{result}"
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Recommendation</span>
                        <a 
                            href={BOOKS[0].amazonLink} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 text-white font-bold uppercase text-[10px] tracking-[0.3em] hover:text-primary transition-colors group/link"
                        >
                            Read Now <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                        </a>
                    </div>
                </div>
            ) : (
                <div className="text-center text-slate-600 flex flex-col items-center gap-6 opacity-60">
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                        <BookOpen size={32} className="opacity-50" />
                    </div>
                    <p className="font-display text-2xl tracking-wide">Your trope awaits...</p>
                </div>
            )}
        </div>
    </div>
);


// --- Main Component ---

const TropeFinder: React.FC = () => {
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleMatch = useCallback(async (trope: string) => {
        if (!trope) return;
        setIsLoading(true);
        setResult(""); // Clear previous result
        const response = await callGeminiTropeMatch(trope);
        setResult(response);
        setIsLoading(false);
    }, []);

    return (
        <section id="tropematcher" className="py-32 bg-onyx border-b border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                         <div className="inline-flex items-center gap-3 px-4 py-1 bg-white/5 border border-white/10 rounded-sm text-primary text-[10px] tracking-[0.3em] uppercase">
                            <Search size={12} /> <span>Literary Algorithm</span>
                        </div>
                        <h2 className="font-display text-5xl md:text-6xl text-white leading-tight drop-shadow-lg">
                            Find Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Obsession</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-loose font-body font-light max-w-md">
                            Tell us your favorite romance motif—be it <em>"Pride & Prejudice"</em> or <em>"Grumpy x Sunshine."</em> We will identify the exact moments in <em>The Jasmine Knot</em> designed specifically for you.
                        </p>
                        <TropeInputForm onMatch={handleMatch} isLoading={isLoading} />
                    </div>
                    <TropeResultDisplay result={result} isLoading={isLoading} />
                </div>
            </div>
        </section>
    );
};

export default TropeFinder;
