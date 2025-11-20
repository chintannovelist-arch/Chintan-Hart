
import React, { useState } from 'react';
import { MessageSquare, Shield, Heart, Unlock, ScanEye } from 'lucide-react';
import { callGeminiDecoder } from '../services/geminiService';

const TextDecoder: React.FC = () => {
    const [text, setText] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleDecode = async () => {
        if (!text.trim()) return;
        setIsLoading(true);
        setAnalysis(""); // Clear previous result
        const res = await callGeminiDecoder(text);
        setAnalysis(res);
        setIsLoading(false);
    };

    return (
        <section id="decoder" className="py-32 bg-secondary border-b border-white/5">
             <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-5 space-y-8">
                        <h2 className="font-display text-4xl md:text-5xl text-white">He Said / She Meant</h2>
                        <p className="text-slate-400 font-body font-light leading-relaxed">
                            Confused by a text message? Let <strong>Vijay</strong> (the cynic) and <strong>Meena</strong> (the romantic) analyze the subtext so you don't have to overthink it alone.
                        </p>
                        
                        <div className="bg-black/40 p-1 rounded-sm border border-white/10 shadow-lg">
                            <div className="bg-onyx p-6">
                                <label htmlFor="decoder-input" className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 block">Input Message</label>
                                <textarea 
                                    id="decoder-input"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Paste the confusing text here..."
                                    className="w-full h-40 bg-black border border-white/10 rounded-sm p-4 text-slate-300 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none mb-6 font-body leading-relaxed placeholder:text-slate-700"
                                    aria-label="Paste text message to decode"
                                />
                                <button 
                                    onClick={handleDecode}
                                    disabled={isLoading || !text.trim()}
                                    className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-sm transition-colors disabled:opacity-50 uppercase text-xs tracking-[0.25em] shadow-glow flex items-center justify-center gap-2"
                                >
                                    {isLoading ? <span className="flex items-center gap-2"><ScanEye size={14} className="animate-pulse"/> Decoding...</span> : "Decode Message"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="bg-onyx border border-white/10 rounded-sm p-10 min-h-[400px] relative shadow-2xl flex flex-col transition-all duration-500">
                             <div className="absolute top-0 right-0 p-6 opacity-10">
                                 <Unlock size={80} className="text-white" />
                             </div>

                             <h3 className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                                <MessageSquare size={14}/> Decoded Analysis
                             </h3>
                             
                             {isLoading ? (
                                 <div className="flex-1 flex flex-col items-center justify-center gap-8">
                                     <div className="relative w-20 h-20">
                                         <div className="absolute inset-0 border-4 border-white/5 rounded-full"></div>
                                         <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
                                         <div className="absolute inset-0 flex items-center justify-center">
                                            <Shield size={20} className="text-primary animate-pulse absolute opacity-50" />
                                            <Heart size={20} className="text-blush animate-pulse absolute opacity-50 delay-300" />
                                         </div>
                                     </div>
                                     <div className="text-xs uppercase tracking-[0.3em] text-slate-500 animate-pulse">Extracting Subtext...</div>
                                 </div>
                             ) : analysis ? (
                                 <div className="space-y-10 animate-fade-in relative z-10">
                                     <div className="prose prose-invert prose-lg text-slate-300 whitespace-pre-wrap font-serif leading-loose">
                                         {analysis}
                                     </div>
                                     
                                     <div className="flex flex-wrap gap-6 pt-8 border-t border-white/5">
                                         <div className="flex items-center gap-3 px-4 py-2 bg-black/40 rounded-full border border-white/5">
                                             <div className="p-1 bg-primary/20 rounded-full"><Shield size={12} className="text-primary" /></div>
                                             <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Vijay's Logic</span>
                                         </div>
                                         <div className="flex items-center gap-3 px-4 py-2 bg-black/40 rounded-full border border-white/5">
                                             <div className="p-1 bg-blush/20 rounded-full"><Heart size={12} className="text-blush" /></div>
                                             <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Meena's Heart</span>
                                         </div>
                                     </div>
                                 </div>
                             ) : (
                                 <div className="flex-1 flex flex-col items-center justify-center text-slate-600 gap-4 opacity-50">
                                     <div className="w-20 h-20 border border-dashed border-slate-700 rounded-full flex items-center justify-center">
                                         <MessageSquare size={32} />
                                     </div>
                                     <p className="font-body text-sm tracking-wider uppercase">Waiting for data signal...</p>
                                 </div>
                             )}
                        </div>
                    </div>
                </div>
             </div>
        </section>
    );
};

export default TextDecoder;