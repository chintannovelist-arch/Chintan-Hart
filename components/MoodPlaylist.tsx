import React, { useState } from 'react';
import { Music, Loader, Disc } from 'lucide-react';
import { MOODS } from '../constants';
import { callGeminiPlaylist } from '../services/geminiService';

const MoodPlaylist: React.FC = () => {
    const [mood, setMood] = useState("");
    const [playlist, setPlaylist] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!mood) return;
        setIsLoading(true);
        const result = await callGeminiPlaylist(mood);
        setPlaylist(result);
        setIsLoading(false);
    };

    return (
        <section id="playlist" className="py-24 bg-paper">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-primary/30 rounded-full text-primary text-sm tracking-widest uppercase mb-4 font-medium">
                        <Music size={14} /> <span>Soundtrack</span>
                    </div>
                    <h2 className="font-serif text-4xl text-white mb-4">The Mood Playlist</h2>
                    <p className="text-slate-400 max-w-md mx-auto">Set the scene. Let the music match the beat of your heart.</p>
                </div>

                <div className="bg-surface p-8 rounded-xl shadow-lg border border-white/5">
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {MOODS.map((m) => (
                            <button 
                                key={m}
                                onClick={() => setMood(m)}
                                className={`px-6 py-3 rounded-full border transition-all font-medium ${mood === m ? 'bg-primary text-white border-primary shadow-[0_0_10px_rgba(37,150,190,0.4)]' : 'bg-muted text-slate-400 border-transparent hover:border-primary/50 hover:bg-white/5'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                    <div className="text-center mb-8">
                        <button onClick={handleGenerate} disabled={isLoading || !mood} className="px-10 py-3.5 bg-white text-black rounded-full hover:bg-slate-200 disabled:opacity-50 transition-all shadow-lg font-bold tracking-wide">
                            {isLoading ? <Loader className="animate-spin inline" /> : "Tune In"}
                        </button>
                    </div>

                    {playlist && (
                        <div className="max-w-2xl mx-auto bg-black/30 p-8 rounded-xl border border-dashed border-primary/30 animate-fade-in relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-surface p-3 rounded-full border border-primary/30 shadow-lg">
                                <Disc className="animate-spin-slow text-primary" size={24} />
                            </div>
                            <div className="prose prose-invert font-serif text-lg text-slate-300 whitespace-pre-wrap text-center leading-relaxed">
                                {playlist}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MoodPlaylist;