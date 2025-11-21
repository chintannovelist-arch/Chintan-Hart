
import React, { useState } from 'react';
import { Stars, Loader, Sparkles, Moon } from 'lucide-react';
import { ZODIAC_SIGNS } from '../constants';
import { callGeminiDestinyMatch } from '../services/geminiService';

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const DestinyMatch: React.FC = () => {
    const [personOneName, setPersonOneName] = useState("");
    const [personOneSign, setPersonOneSign] = useState("");
    const [personTwoName, setPersonTwoName] = useState("");
    const [personTwoSign, setPersonTwoSign] = useState("");
    const [prediction, setPrediction] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handlePredict = async () => {
        if (!personOneName || !personOneSign) return;
        setIsLoading(true);
        const result = await callGeminiDestinyMatch(personOneName, personOneSign, personTwoName, personTwoSign);
        setPrediction(result);
        setIsLoading(false);
    };

    return (
        <section id="destiny" className="py-28 bg-paper relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-secondary to-transparent"></div>
             
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 border border-primary/50 rounded-full text-primary text-xs tracking-widest uppercase mb-6 font-bold shadow-sm">
                        <Stars size={12} /> <span>Astrology</span>
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">The Destiny Match</h2>
                    <p className="text-slate-400 max-w-md mx-auto text-lg">Are you star-crossed lovers or a perfect match? Consult the oracle.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-stretch">
                    {/* Input Form */}
                    <div className="space-y-8 bg-surface p-8 rounded-2xl border border-white/5 shadow-xl">
                        <div className="space-y-5">
                            <h3 className="font-serif text-2xl text-primary flex items-center gap-2"><UserIcon /> You</h3>
                            <input type="text" placeholder="Your Name" value={personOneName} onChange={(e) => setPersonOneName(e.target.value)} className="w-full p-4 rounded-lg border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-muted text-white placeholder:text-slate-600" />
                            <select value={personOneSign} onChange={(e) => setPersonOneSign(e.target.value)} className="w-full p-4 rounded-lg border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-muted text-slate-300 cursor-pointer">
                                <option value="">Select Zodiac Sign</option>
                                {ZODIAC_SIGNS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="w-full h-px bg-white/5"></div>
                        <div className="space-y-5">
                            <h3 className="font-serif text-2xl text-slate-500 flex items-center gap-2"><UserIcon /> Partner (Optional)</h3>
                            <input type="text" placeholder="Partner's Name" value={personTwoName} onChange={(e) => setPersonTwoName(e.target.value)} className="w-full p-4 rounded-lg border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-muted text-white placeholder:text-slate-600" />
                            <select value={personTwoSign} onChange={(e) => setPersonTwoSign(e.target.value)} className="w-full p-4 rounded-lg border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-muted text-slate-300 cursor-pointer">
                                <option value="">Select Zodiac Sign</option>
                                {ZODIAC_SIGNS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <button onClick={handlePredict} disabled={isLoading || !personOneName || !personOneSign} className="w-full py-4 bg-primary text-white rounded-lg shadow-[0_0_15px_rgba(37,150,190,0.4)] hover:bg-primary-dark disabled:opacity-50 font-bold transition-all hover:-translate-y-0.5 tracking-wide flex items-center justify-center gap-2 mt-4">
                            {isLoading ? <Loader className="animate-spin" size={20} /> : <><Stars size={18}/> Reveal Destiny</>}
                        </button>
                    </div>

                    {/* Result Card */}
                    <div className="relative group">
                        {/* Changed gradient to blue-ish slate for dark theme consistency */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-slate-900 rounded-2xl transform rotate-2 transition-transform group-hover:rotate-1 opacity-70"></div>
                        <div className="relative bg-surface p-10 rounded-2xl border border-white/10 h-full flex flex-col justify-center items-center text-center shadow-2xl min-h-[400px]">
                             {/* Decorative corners */}
                             <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50"></div>
                             <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50"></div>
                             <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/50"></div>
                             <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50"></div>

                            {prediction ? (
                                <div className="prose prose-invert w-full animate-fade-in">
                                    <div className="text-primary mb-6 animate-pulse"><Sparkles size={40} className="mx-auto" /></div>
                                    <div className="font-serif text-xl leading-relaxed whitespace-pre-wrap text-slate-200 italic">{prediction}</div>
                                </div>
                            ) : (
                                <div className="text-slate-600 italic flex flex-col items-center gap-4">
                                    <Moon size={64} strokeWidth={1} className="opacity-30" />
                                    <p className="text-lg font-serif">The stars are waiting to align...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DestinyMatch;
