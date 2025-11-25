
import React, { useState } from 'react';
import { MessageSquareWarning, User, Send, HeartHandshake, RefreshCw } from 'lucide-react';
import { callGeminiApology } from '../services/geminiService';

const ApologyArchitect: React.FC = () => {
    const [mistake, setMistake] = useState("");
    const [character, setCharacter] = useState("Vijay");
    const [output, setOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!mistake.trim()) return;
        setIsLoading(true);
        setOutput("");
        const response = await callGeminiApology(mistake, character);
        setOutput(response);
        setIsLoading(false);
    };

    return (
        <section id="apology" className="py-32 bg-onyx border-b border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom,rgba(37,150,190,0.05),transparent)] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-primary text-xs tracking-[0.3em] uppercase font-bold mb-4">
                         <HeartHandshake size={12} /> <span>The Grovel Engine</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-6">Apology Architect</h2>
                    <p className="text-slate-400 font-body font-light text-lg max-w-2xl mx-auto leading-relaxed">
                        Messed up? Let the characters show you how to fix it. Generate a heartfelt, character-specific apology for any mistake.
                    </p>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-stretch">
                    {/* Input Side */}
                    <div className="md:col-span-5 bg-black/40 p-8 rounded-sm border border-white/10 shadow-lg flex flex-col gap-6">
                         
                         <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Who is apologizing?</label>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setCharacter("Vijay")}
                                    className={`flex-1 py-3 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${character === "Vijay" ? 'bg-primary/10 border-primary text-white' : 'bg-transparent border-white/10 text-slate-500 hover:text-slate-300'}`}
                                >
                                    <User size={14}/> Vijay
                                </button>
                                <button 
                                    onClick={() => setCharacter("Meena")}
                                    className={`flex-1 py-3 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${character === "Meena" ? 'bg-blush/10 border-blush text-blush' : 'bg-transparent border-white/10 text-slate-500 hover:text-slate-300'}`}
                                >
                                    <User size={14}/> Meena
                                </button>
                            </div>
                         </div>

                         <div className="flex-1 flex flex-col">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">The Mistake</label>
                            <textarea 
                                value={mistake}
                                onChange={(e) => setMistake(e.target.value)}
                                className="w-full flex-1 bg-[#121212] border border-white/10 p-4 rounded-sm text-white outline-none focus:border-primary transition-colors text-sm resize-none font-body placeholder:text-slate-700"
                                placeholder="e.g. Forgot the anniversary, Worked too late again, Was emotionally distant..."
                            />
                         </div>

                         <button 
                            onClick={handleGenerate}
                            disabled={isLoading || !mistake.trim()}
                            className="mt-auto w-full py-4 bg-white text-black hover:bg-slate-200 rounded-sm font-bold uppercase text-xs tracking-[0.25em] transition-all flex items-center justify-center gap-3 shadow-glow disabled:opacity-50"
                        >
                           {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <><Send size={16} /> Generate Apology</>}
                        </button>
                    </div>

                    {/* Output Side */}
                    <div className="md:col-span-7 relative min-h-[400px] bg-black/60 border border-white/10 rounded-sm p-10 flex flex-col items-center justify-center group">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-5"></div>
                         
                         {output ? (
                             <div className="animate-fade-in relative z-10 w-full">
                                 <div className="mb-8 text-center">
                                     <MessageSquareWarning size={32} className={`mx-auto mb-4 ${character === "Vijay" ? "text-primary" : "text-blush"}`} />
                                     <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">The {character} Method</span>
                                 </div>
                                 <p className={`font-serif text-xl md:text-2xl leading-loose text-center italic whitespace-pre-wrap ${character === "Vijay" ? "text-slate-200" : "text-slate-200"}`}>
                                     "{output}"
                                 </p>
                             </div>
                         ) : (
                             <div className="flex flex-col items-center justify-center text-slate-600 gap-4 opacity-50">
                                 <HeartHandshake size={48} strokeWidth={1} />
                                 <p className="font-body text-sm tracking-wider uppercase">Redemption awaits...</p>
                             </div>
                         )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApologyArchitect;
