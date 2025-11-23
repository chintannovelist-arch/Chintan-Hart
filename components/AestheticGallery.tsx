
import React from 'react';
import { Instagram, ChevronRight, PlayCircle } from 'lucide-react';

const AestheticGallery: React.FC = () => (
    <section id="experience" className="py-28 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-16">
                <h2 className="font-serif text-4xl text-white mb-4">The Experience</h2>
                <p className="text-slate-400 text-lg font-light">Immerse yourself in the sensory world of the novel.</p>
            </div>
            
            <div className="w-full max-w-5xl mx-auto mt-8 relative group overflow-hidden rounded-2xl bg-surface flex items-center justify-center p-12 md:p-24 border border-white/5 shadow-2xl transition-all">
                {/* Background Overlay using Img tag for lazy loading */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <img 
                        src="assets/gallery-background.jpg" 
                        alt="Aesthetic gallery background" 
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay transition-transform duration-[10s] group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                
                <div className="relative z-10 text-center max-w-2xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-black/50 border border-white/10 rounded-full shadow-lg mb-8 text-primary group-hover:scale-110 transition-transform duration-500">
                        <PlayCircle size={32} fill="currentColor" className="text-primary stroke-primary" />
                    </div>
                    
                    <h4 className="text-primary uppercase tracking-[0.2em] text-sm mb-6 font-bold flex items-center justify-center gap-2">
                        <Instagram size={16}/> Official Visual Reel
                    </h4>
                    
                    <p className="text-white italic font-serif text-3xl md:text-4xl leading-snug mb-10 drop-shadow-lg">
                        "He knelt at her feet, the silver anklet cool against his warm palm..."
                    </p>
                    
                    <a href="https://www.instagram.com/chintannovelist/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-full hover:bg-primary-dark transition-all font-bold tracking-wide shadow-[0_0_20px_rgba(37,150,190,0.3)] hover:scale-105">
                        Watch on Reels <ChevronRight size={18} />
                    </a>
                </div>
            </div>
        </div>
    </section>
);

export default AestheticGallery;
