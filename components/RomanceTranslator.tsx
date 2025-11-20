import React, { useState } from 'react';
import { Feather, RefreshCw, Copy, Sparkles, Wand2 } from 'lucide-react';
import { callGeminiTranslator } from '../services/geminiService';

const RomanceTranslator: React.FC = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleTranslate = async () => {
        if (!input) return;
        setIsLoading(true);
        setOutput(""); // Clear previous
        const response = await callGeminiTranslator(input);
        setOutput(response);
        setIsLoading(false);
    };

    return (
        <section id="translator" className="py-32 bg-black relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-primary text-xs tracking-[0.3em] uppercase font-bold mb-4">
                         <Feather size={12} /> <span>Style Transfer</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-6">The Jasmine Translator</h2>
                    <p className="text-slate-400 font-body font-light text-lg max-w-2xl mx-auto leading-relaxed">
                        Turn the mundane into the magnificent. Experience the lush, sensory writing style of <em>The Jasmine Knot</em> by transforming your own words.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* Input Side */}
                    <div className="bg-onyx p-1 rounded-sm border border-white/10 shadow-lg flex flex-col h-full group focus-within:border-white/20 transition-colors">
                        <div className="bg-black/40 p-6 flex-1 flex flex-col gap-4">
                            <label htmlFor="boring-text" className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Boring Reality</label>
                            <textarea 
                                id="boring-text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="e.g. I need to buy groceries."
                                className="w-full flex-1 bg-transparent outline-none text-slate-300 resize-none placeholder:text-slate-700 font-body leading-relaxed min-h-[200px] selection:bg-white/20 focus:bg-white/5 transition-colors p-2 rounded-sm"
                                aria-label="Enter text to translate"
                            />
                        </div>
                        <div className="p-4 bg-black/60 border-t border-white/5">
                             <button 
                                onClick={handleTranslate}
                                disabled={isLoading || !input}
                                className="w-full py-4 bg-white/5 hover:bg-primary text-white border border-white/10 hover:border-primary rounded-sm font-bold uppercase text-xs tracking-[0.25em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                               {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <><Sparkles size={16} /> Romanticize It</>}
                            </button>
                        </div>
                    </div>

                    {/* Output Side */}
                    <div className="relative bg-gradient-to-br from-primary/10 to-black p-1 rounded-sm border border-primary/20 shadow-[0_0_30px_rgba(37,150,190,0.1)] flex flex-col h-full">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50"></div>
                        
                        <div className="bg-black/20 backdrop-blur-sm p-8 flex-1 flex flex-col relative overflow-hidden">
                            <label className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6 block">The Novel Version</label>
                            
                            <div className="flex-1 flex items-center overflow-y-auto custom-scrollbar">
                                {isLoading ? (
                                    <div className="w-full space-y-4 animate-pulse">
                                        <div className="h-2 bg-primary/10 rounded-full w-full"></div>
                                        <div className="h-2 bg-primary/5 rounded-full w-11/12"></div>
                                        <div className="h-2 bg-primary/10 rounded-full w-4/5"></div>
                                        <div className="h-2 bg-primary/5 rounded-full w-full"></div>
                                    </div>
                                ) : output ? (
                                    <p className="font-serif text-xl leading-loose text-slate-100 italic animate-fade-in selection:bg-primary selection:text-white drop-shadow-md">
                                        "{output}"
                                    </p>
                                ) : (
                                    <div className="flex flex-col items-center justify-center w-full text-slate-600 opacity-40 gap-4">
                                        <Wand2 size={32} strokeWidth={1} />
                                        <p className="italic font-serif text-sm">The poetry awaits...</p>
                                    </div>
                                )}
                            </div>

                            {output && !isLoading && (
                                <button 
                                    onClick={() => navigator.clipboard.writeText(output)} 
                                    className="absolute top-6 right-6 text-slate-600 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                                    title="Copy Text"
                                    aria-label="Copy result"
                                >
                                    <Copy size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RomanceTranslator;