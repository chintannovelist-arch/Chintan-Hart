
import React, { useState, useEffect } from 'react';
import { Edit3, User, Loader, PenTool, Sparkles, Feather, RefreshCw, Check, Zap, AlertCircle } from 'lucide-react';
import { SCENARIOS } from '../constants';
import { callGeminiFinishScene } from '../services/geminiService';

const FinishTheScene: React.FC = () => {
    const [selectedChar, setSelectedChar] = useState("Meena");
    const [selectedStarter, setSelectedStarter] = useState(SCENARIOS["Meena"][0]);
    const [userAction, setUserAction] = useState("");
    const [continuation, setContinuation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setSelectedStarter(SCENARIOS[selectedChar][0]);
        setContinuation("");
        setUserAction("");
        setError("");
    }, [selectedChar]);

    const handleFinish = async () => {
        if (!userAction) return;
        setIsLoading(true);
        setContinuation("");
        setError("");
        
        const result = await callGeminiFinishScene(selectedStarter.context, userAction, selectedChar);
        
        if (result.includes("run dry") || result.includes("filtered")) {
            setError(result);
        } else {
            setContinuation(result);
        }
        
        setIsLoading(false);
    };

    return (
        <section id="finishscene" className="py-32 bg-onyx border-y border-white/5 relative">
            {/* Subtle Background Texture */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-sm text-slate-300 text-xs tracking-widest uppercase mb-6 font-bold">
                        <Edit3 size={12} className="text-primary"/> <span>Interactive Fiction</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-6xl text-white mb-6">Finish The Scene</h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg font-light font-body leading-relaxed">
                        Take the pen. Choose a character, set the stage, and let AI co-write your destiny in the author's signature style.
                    </p>
                </div>
                
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Controls Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Character Selector */}
                        <div className="bg-black/40 p-6 rounded-sm border border-white/5">
                            <label className="block text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Perspective</label>
                            <div className="flex gap-4" role="group" aria-label="Select Character Perspective">
                                {["Meena", "Vijay"].map(char => (
                                    <button 
                                        key={char} 
                                        onClick={() => setSelectedChar(char)} 
                                        className={`flex-1 py-4 px-4 rounded-sm flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-wider transition-all border focus:outline-none focus:ring-1 focus:ring-primary ${selectedChar === char ? 'bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(37,150,190,0.2)]' : 'bg-transparent border-white/10 text-slate-500 hover:border-white/30 hover:text-slate-300'}`}
                                        aria-pressed={selectedChar === char}
                                    >
                                        <User size={14} /> {char}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Scenario List */}
                        <div className="bg-black/40 p-6 rounded-sm border border-white/5">
                            <label className="block text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Scenario</label>
                            <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar pr-2" role="listbox" aria-label="Select Scenario">
                                {SCENARIOS[selectedChar].map((starter) => (
                                    <button 
                                        key={starter.id} 
                                        onClick={() => {setSelectedStarter(starter); setContinuation(""); setUserAction(""); setError("");}} 
                                        className={`w-full text-left p-4 rounded-sm border-l-2 transition-all duration-300 text-sm group relative hover:pl-6 focus:outline-none focus:bg-white/5 ${selectedStarter.id === starter.id ? 'border-primary bg-white/5' : 'border-transparent hover:bg-white/5 hover:border-white/20'}`}
                                        role="option"
                                        aria-selected={selectedStarter.id === starter.id}
                                    >
                                        <span className={`font-display tracking-wide block mb-2 ${selectedStarter.id === starter.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{starter.title}</span>
                                        <span className="text-xs text-slate-500 line-clamp-1 font-body">{starter.context}</span>
                                        {selectedStarter.id === starter.id && <Check size={14} className="absolute top-4 right-4 text-primary"/>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Writing Editor */}
                    <div className="lg:col-span-8">
                         <div className="bg-black/60 rounded-sm shadow-2xl border border-white/10 min-h-[600px] flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blush to-transparent"></div>
                            
                            {/* Blocking Overlay for Loading */}
                            {isLoading && (
                                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
                                    <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin mb-6"></div>
                                    <p className="text-primary font-display text-xl tracking-widest animate-pulse">The Muse is Writing...</p>
                                    <p className="text-slate-500 text-xs uppercase tracking-[0.2em] mt-2">Crafting sensory details</p>
                                </div>
                            )}

                            {/* Context Header (Script Style) */}
                            <div className="bg-white/5 p-10 border-b border-white/5 relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/30"></div>
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] mb-4 opacity-70">Scene Setup</h4>
                                <p className="font-serif text-xl md:text-2xl text-slate-200 italic leading-relaxed pl-6 border-l-2 border-white/10">
                                    "{selectedStarter.context}"
                                </p>
                            </div>

                            {/* Content Area */}
                            <div className="p-10 flex-1 flex flex-col gap-8">
                                {/* User Input */}
                                <div className="relative group">
                                    <label htmlFor="userAction" className="block text-[10px] font-bold text-primary uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
                                        <PenTool size={12} /> Your Action
                                    </label>
                                    <textarea 
                                        id="userAction"
                                        value={userAction} 
                                        onChange={(e) => setUserAction(e.target.value)} 
                                        placeholder={selectedStarter.prompt} 
                                        className="w-full p-6 bg-black border border-white/10 rounded-sm focus:border-primary/50 outline-none text-slate-300 min-h-[140px] resize-none transition-all placeholder:text-slate-700 placeholder:italic font-body leading-relaxed focus:shadow-[0_0_30px_rgba(37,150,190,0.1)]" 
                                        aria-label="Write your action"
                                    />
                                    <div className="absolute bottom-4 right-4 z-10">
                                        <button 
                                            onClick={handleFinish} 
                                            disabled={isLoading || !userAction} 
                                            className="h-12 px-8 bg-primary text-white rounded-sm flex items-center justify-center hover:bg-primary-dark disabled:opacity-50 disabled:bg-slate-800 transition-all hover:-translate-y-1 text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-glow ease-snappy"
                                        >
                                             <span className="flex items-center gap-2">Generate <Zap size={14} className="fill-white"/></span>
                                        </button>
                                    </div>
                                </div>

                                {/* Error State */}
                                {error && (
                                    <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-sm text-red-200 text-sm flex items-center gap-3 animate-fade-in">
                                        <AlertCircle size={18} />
                                        <span>{error}</span>
                                        <button onClick={handleFinish} className="ml-auto text-xs uppercase underline font-bold hover:text-white">Retry</button>
                                    </div>
                                )}

                                {/* AI Output */}
                                <div className="flex-1 pt-8 border-t border-white/5 relative">
                                    {continuation ? (
                                        <div className="animate-fade-in-up">
                                            <h4 className="text-blush font-bold uppercase text-[10px] mb-6 tracking-[0.25em] flex items-center gap-2">
                                                <Sparkles size={12}/> The Narrative Unfolds
                                            </h4>
                                            <div className="font-serif text-lg leading-loose text-slate-300 whitespace-pre-wrap border-l-2 border-primary/30 pl-8 py-2 relative">
                                                <span className="absolute -left-1.5 top-0 text-4xl text-primary/20 font-serif">“</span>
                                                {continuation}
                                            </div>
                                            <div className="mt-10 flex justify-end">
                                                <button onClick={() => {setUserAction(""); setContinuation("");}} className="text-xs text-slate-500 hover:text-white flex items-center gap-2 transition-colors uppercase tracking-widest"><RefreshCw size={12}/> Write Another</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-700 gap-4 py-8 opacity-60">
                                            <Feather size={40} strokeWidth={1} className="opacity-50" />
                                            <p className="font-body text-xs font-light tracking-wide uppercase">Waiting for your input...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinishTheScene;
