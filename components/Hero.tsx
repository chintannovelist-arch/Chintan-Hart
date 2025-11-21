

import React, { useRef } from 'react';
import { BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { TAGLINE } from '../constants';

const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Sentinel for Navigation scroll detection. More performant than scroll listeners. */}
      <div id="nav-scroll-sentinel" className="absolute top-[20px] h-px w-full" aria-hidden="true"></div>

      {/* Interactive Spotlight Layer */}
      <div className="absolute inset-0 pointer-events-none z-20 spotlight-overlay mix-blend-soft-light opacity-80"></div>

      {/* Background Layer with Ken Burns Effect */}
      <div className="absolute inset-0 opacity-40 z-0">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1615875228545-9b3400a0e1ae?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center animate-ken-burns"></div>
        {/* Heavy Vignette for Focus */}
        <div className="absolute inset-0 bg-vignette"></div>
      </div>
      
      {/* Content Layer */}
      <div className="relative z-30 max-w-6xl mx-auto px-6 text-center flex flex-col items-center gap-6 pt-20">
        
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
             <div className="inline-flex items-center gap-3 px-4 py-1 border-l border-r border-primary/30 bg-black/20 backdrop-blur-md text-primary text-[10px] tracking-[0.4em] uppercase mb-6">
                <span className="w-1 h-1 rounded-full bg-blush animate-pulse"></span>
                Immersive Romance
            </div>
        </div>
        
        <div className="space-y-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 leading-none drop-shadow-2xl tracking-wide [text-shadow:0_4px_20px_rgba(255,255,255,0.3)]">
            The Jasmine Knot
            </h1>
            <h2 className="font-display text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 drop-shadow-lg [text-shadow:0_2px_10px_rgba(255,255,255,0.2)] mt-4 tracking-wider font-light">
                {TAGLINE}
            </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-8 mt-12 w-full sm:w-auto animate-fade-in-up opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          <a 
            href="#books" 
            onClick={(e) => scrollToSection(e, 'books')}
            className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-sm transition-all duration-500"
          >
            <div className="absolute inset-0 w-full h-full bg-primary/20 backdrop-blur-sm group-hover:bg-primary/30 transition-all duration-500"></div>
            <div className="absolute inset-0 w-0 bg-primary transition-all duration-[800ms] ease-out group-hover:w-full opacity-20"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            
            <span className="relative z-10 flex items-center justify-center gap-3 text-white text-sm font-bold tracking-[0.2em] uppercase font-body">
              Start Reading <ChevronRight size={16} className="text-blush group-hover:translate-x-2 transition-transform duration-500"/>
            </span>
          </a>
          
          <a 
            href="#experience" 
            onClick={(e) => scrollToSection(e, 'experience')}
            className="px-10 py-4 border border-white/10 hover:border-blush/50 text-slate-400 hover:text-white rounded-sm text-sm tracking-[0.2em] uppercase font-body font-medium transition-all duration-500 hover:bg-white/5 cursor-pointer"
          >
             Enter World
          </a>
        </div>
      </div>
      
      <a href="#books" onClick={(e) => scrollToSection(e, 'books')} className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-600 hover:text-primary transition-colors duration-500 cursor-pointer group">
        <span className="text-[10px] uppercase tracking-[0.3em] font-body opacity-50 group-hover:opacity-100 transition-opacity">Begin</span>
        <ChevronDown size={20} className="animate-bounce opacity-50" />
      </a>
    </section>
  );
};

export default Hero;