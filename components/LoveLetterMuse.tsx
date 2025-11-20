import React, { useState } from 'react';
import { PenTool, Heart, Send } from 'lucide-react';
import { callGeminiLetter } from '../services/geminiService';
import { AUTHOR_NAME } from '../constants';

const LoveLetterMuse: React.FC = () => {
    const [recipient, setRecipient] = useState("");
    const [vibe, setVibe] = useState("Yearning");
    const [letter, setLetter] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!recipient) return;
        setIsLoading(true);
        const result = await callGeminiLetter(recipient, vibe);
        setLetter(result);
        setIsLoading(false);
    };

    return (
        <section id="muse" className="py-28 bg-paper">
            <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-surface border border-primary/30 rounded-full text-primary text-xs tracking-widest uppercase font-bold shadow-sm">
                        <PenTool size={12} /> <span>AI Ghostwriter</span>
                    </div>
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Love Letter Muse</h2>
                        <p className="text-slate-400 text-lg font-light leading-relaxed">Struggling to find the words? Let Chintan's muse draft a short, poetic note for your beloved. Perfect for anniversaries or quiet confessions.</p>
                    </div>
                    
                    <div className="bg-surface p-8 rounded-2xl shadow-xl border border-white/5 space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">To Whom?</label>
                            <input type="text" placeholder="Recipient Name" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="w-full p-4 rounded-lg border border-white/10 focus:border-primary outline-none transition-all bg-muted text-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">The Vibe</label>
                            <div className="flex flex-wrap gap-3">
                                {['Yearning', 'Devotion', 'Playful', 'Apology'].map(v => (
                                    <button key={v} onClick={() => setVibe(v)} className={`px-5 py-2 text-sm rounded-full border transition-all font-medium ${vibe === v ? 'bg-primary text-white border-primary shadow-[0_0_10px_rgba(37,150,190,0.4)]' : 'bg-muted text-slate-400 border-white/10 hover:border-primary/50 hover:bg-white/5'}`}>
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleGenerate} disabled={isLoading || !recipient} className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark shadow-[0_0_15px_rgba(37,150,190,0.4)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            {isLoading ? " composing..." : <><Heart size={18} className="fill-white/20"/> Write Letter</>}
                        </button>
                    </div>
                </div>
                
                {/* Letter Output - Dark Elegant Card */}
                <div className="relative perspective-1000">
                    <div className="absolute inset-0 bg-primary/20 rounded-sm transform rotate-3 translate-y-2 translate-x-2 shadow-lg"></div>
                    <div className="relative bg-zinc-900 p-10 sm:p-12 rounded-sm shadow-2xl min-h-[500px] flex flex-col items-center justify-center border border-white/10">
                        {/* Subtle texture or glow */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(circle_at_center,white,transparent)] pointer-events-none"></div>
                        
                        {letter ? (
                            <div className="relative z-10 w-full animate-fade-in">
                                <div className="font-serif text-xl sm:text-2xl leading-loose text-slate-200 whitespace-pre-wrap italic text-center" style={{ fontFamily: '"Playfair Display", serif' }}>
                                    {letter}
                                </div>
                                <div className="mt-12 text-center">
                                    <div className="w-16 h-1 bg-primary/40 mx-auto rounded-full mb-2"></div>
                                    <span className="text-xs text-primary/70 uppercase tracking-widest font-bold">From the desk of {AUTHOR_NAME}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-slate-600 relative z-10 flex flex-col items-center gap-4">
                                <div className="w-20 h-20 rounded-full bg-black/30 flex items-center justify-center border border-white/5">
                                    <PenTool size={32} className="opacity-30" />
                                </div>
                                <span className="font-serif italic text-lg">Your letter will appear here...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoveLetterMuse;