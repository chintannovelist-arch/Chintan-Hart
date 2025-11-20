
import React, { useState } from 'react';
import { Eye, RefreshCw, Copy, Sparkles, Box } from 'lucide-react';
import { callGeminiPOVShift } from '../services/geminiService';

const ObjectPerspective: React.FC = () => {
    const [scene, setScene] = useState("Chapter 4");
    const [objectName, setObjectName] = useState("The Pillow");
    const [output, setOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const scenes = [
        { id: "Chapter 4", label: "The Pillow Wall" },
        { id: "Chapter 12", label: "Lunch Under Table" },
        { id: "Chapter 41", label: "The Bus Pole" },
        { id: "Chapter 54", label: "The Living Room Floor" }
    ];

    const handleRewrite = async () => {
        setIsLoading(true);
        setOutput(""); 
        const response = await callGeminiPOVShift(scene, objectName);
        setOutput(response);
        setIsLoading(false);
    };

    return (
        <section id="povshift" className="py-32 bg-black relative overflow-hidden border-b border-white/5">
             {/* Background Effect */}
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,150,190,0.05),transparent)] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-primary text-xs tracking-[0.3em] uppercase font-bold mb-4">
                         <Box size={12} /> <span>Perspective Shift</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-6">Inanimate Witness</h2>
                    <p className="text-slate-400 font-body font-light text-lg max-w-2xl mx-auto leading-relaxed">
                        See the chemistry from the outside. Rewrite iconic scenes from the perspective of the objects that witnessed them.
                    </p>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-stretch">
                    {/* Controls */}
                    <div className="md:col-span-4 bg-onyx p-8 rounded-sm border border-white/10 shadow-lg flex flex-col gap-6">
                         <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Select Scene</label>
                            <div className="space-y-2">
                                {scenes.map((s) => (
                                    <button 
                                        key={s.id} 
                                        onClick={() => {setScene(s.id); setObjectName(s.id === "Chapter 4" ? "The Pillow" : "The Object");}}
                                        className={`w-full text-left px-4 py-3 rounded-sm text-sm transition-all border ${scene === s.id ? 'bg-primary/10 border-primary text-white' : 'bg-transparent border-transparent text-slate-400 hover:bg-white/5'}`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                         </div>

                         <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Witness Object</label>
                            <input 
                                type="text" 
                                value={objectName}
                                onChange={(e) => setObjectName(e.target.value)}
                                className="w-full bg-black border border-white/10 p-3 rounded-sm text-white outline-none focus:border-primary transition-colors text-sm font-body"
                                placeholder="e.g. The Table, The Raindrop"
                            />
                         </div>

                         <button 
                            onClick={handleRewrite}
                            disabled={isLoading}
                            className="mt-auto w-full py-4 bg-white text-black hover:bg-slate-200 rounded-sm font-bold uppercase text-xs tracking-[0.25em] transition-all flex items-center justify-center gap-3 shadow-glow"
                        >
                           {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <><Eye size={16} /> Rewrite Scene</>}
                        </button>
                    </div>

                    {/* Output */}
                    <div className="md:col-span-8 relative min-h-[400px] bg-black/40 border border-white/10 rounded-sm p-10 flex flex-col">
                         {output ? (
                             <div className="animate-fade-in h-full flex flex-col">
                                 <div className="flex items-center gap-3 mb-8 text-primary/60">
                                     <Sparkles size={16} />
                                     <span className="text-xs uppercase tracking-widest font-bold">POV: {objectName}</span>
                                 </div>
                                 <p className="font-serif text-lg leading-loose text-slate-200 italic flex-1 whitespace-pre-wrap">
                                     "{output}"
                                 </p>
                                 <div className="mt-6 pt-6 border-t border-white/5 flex justify-end">
                                     <button onClick={() => navigator.clipboard.writeText(output)} className="p-2 hover:bg-white/10 rounded-full text-slate-500 hover:text-white transition-colors"><Copy size={16}/></button>
                                 </div>
                             </div>
                         ) : (
                             <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-4 opacity-50">
                                 <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center">
                                     <Box size={32} strokeWidth={1} />
                                 </div>
                                 <p className="font-body text-sm tracking-wider uppercase">Select parameters to begin...</p>
                             </div>
                         )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ObjectPerspective;
