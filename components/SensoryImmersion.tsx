
import React, { useState } from 'react';
import { CloudRain, Eye, Hand, Ear, Coffee } from 'lucide-react';
import { callGeminiSensory } from '../services/geminiService';

const SensoryImmersion: React.FC = () => {
    const [activeSense, setActiveSense] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const senses = [
        { id: "Smell", icon: Coffee, label: "Scent of Jasmine" },
        { id: "Touch", icon: Hand, label: "Silk & Skin" },
        { id: "Sound", icon: Ear, label: "Monsoon Rain" },
        { id: "Sight", icon: Eye, label: "Stolen Glances" },
    ];

    const handleSense = async (sense: string) => {
        setActiveSense(sense);
        setIsLoading(true);
        const res = await callGeminiSensory(sense);
        setDescription(res);
        setIsLoading(false);
    };

    return (
        <section id="sensory" className="py-24 bg-black border-t border-white/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h3 className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">Immersion Mode</h3>
                <h2 className="font-serif text-3xl text-white mb-10">Feel the Atmosphere</h2>
                
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    {senses.map(s => (
                        <button 
                            key={s.id}
                            onClick={() => handleSense(s.id)}
                            className={`flex flex-col items-center gap-3 group`}
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-500 ${activeSense === s.id ? 'bg-primary border-primary text-white shadow-[0_0_20px_rgba(37,150,190,0.5)]' : 'bg-surface border-white/10 text-slate-400 group-hover:border-primary group-hover:text-primary'}`}>
                                <s.icon size={24} />
                            </div>
                            <span className={`text-xs uppercase tracking-widest font-medium transition-colors ${activeSense === s.id ? 'text-primary' : 'text-slate-600'}`}>{s.label}</span>
                        </button>
                    ))}
                </div>

                <div className="min-h-[150px] flex items-center justify-center relative">
                    {isLoading && <div className="animate-pulse text-slate-500">Summoning memories...</div>}
                    {!isLoading && description && (
                        <div className="animate-fade-in max-w-2xl">
                            <p className="font-serif text-xl md:text-2xl leading-relaxed text-slate-200 italic">
                                "{description}"
                            </p>
                        </div>
                    )}
                     {!isLoading && !description && (
                        <p className="text-slate-700 italic font-serif">Select a sense to enter the world of The Jasmine Knot.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SensoryImmersion;
