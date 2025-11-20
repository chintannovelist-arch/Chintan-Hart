import React, { useState, useEffect } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { COUNTRIES_DATA } from '../constants';
import { callGeminiDatePlanner } from '../services/geminiService';

const DatePlanner: React.FC = () => {
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [vibe, setVibe] = useState("Monsoon Romance");
    const [time, setTime] = useState("Evening");
    const [itinerary, setItinerary] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const availableCities = country ? COUNTRIES_DATA[country] : [];

    const handlePlan = async () => {
        if (!country || !city) return;
        setIsLoading(true);
        const result = await callGeminiDatePlanner(country, city, vibe, time);
        setItinerary(result);
        setIsLoading(false);
    };

    useEffect(() => { setCity(""); }, [country]);

    return (
        <section id="dateplanner" className="py-28 bg-secondary">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-surface border border-primary/30 rounded-full text-primary text-xs tracking-widest uppercase mb-6 font-bold shadow-sm">
                        <MapPin size={12} /> <span>Concierge</span>
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Date Planner</h2>
                    <p className="text-slate-400 text-lg">Curate your perfect romantic evening with custom itineraries.</p>
                </div>
                
                <div className="bg-surface p-8 md:p-10 rounded-2xl shadow-xl border border-white/5">
                    <div className="grid md:grid-cols-4 gap-5 mb-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-primary uppercase tracking-wider ml-1">Destination</label>
                            <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full p-4 rounded-lg bg-muted border-transparent focus:border-primary outline-none shadow-sm text-white"><option value="">Select Country</option>{Object.keys(COUNTRIES_DATA).map(c => <option key={c}>{c}</option>)}</select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-primary uppercase tracking-wider ml-1">City</label>
                            <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!country} className="w-full p-4 rounded-lg bg-muted border-transparent focus:border-primary outline-none shadow-sm text-white disabled:opacity-50"><option value="">Select City</option>{availableCities.map(c => <option key={c}>{c}</option>)}</select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-primary uppercase tracking-wider ml-1">Mood</label>
                            <select value={vibe} onChange={(e) => setVibe(e.target.value)} className="w-full p-4 rounded-lg bg-muted border-transparent focus:border-primary outline-none shadow-sm text-white"><option>Monsoon Romance</option><option>Beachside</option><option>Coffee & Books</option><option>Luxury Dining</option></select>
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs font-bold text-primary uppercase tracking-wider ml-1">Time</label>
                            <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-4 rounded-lg bg-muted border-transparent focus:border-primary outline-none shadow-sm text-white"><option>Evening</option><option>Late Night</option><option>Lazy Afternoon</option></select>
                        </div>
                    </div>
                    
                    <button onClick={handlePlan} disabled={isLoading || !city} className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark disabled:opacity-70 shadow-[0_0_15px_rgba(37,150,190,0.4)] transition-all hover:-translate-y-0.5 tracking-wide text-lg flex items-center justify-center gap-2">
                        {isLoading ? "Designing Experience..." : "Plan My Date"}
                    </button>
                    
                    {itinerary && (
                        <div className="mt-10 bg-black/40 p-8 md:p-10 rounded-xl border-t-4 border-primary shadow-lg animate-fade-in relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Calendar size={100} className="text-white" />
                            </div>
                            <h3 className="font-serif text-2xl text-primary mb-6 font-bold">Your Itinerary</h3>
                            <div className="prose prose-lg prose-invert font-serif leading-relaxed text-slate-300 whitespace-pre-wrap relative z-10">
                                {itinerary}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DatePlanner;