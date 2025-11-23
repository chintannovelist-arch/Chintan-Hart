
import React from 'react';
import { BookOpen, ChevronRight, ChevronDown, Sparkles } from 'lucide-react';
import { TAGLINE } from '../constants';

interface HeroProps {
  onStartPresentation: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartPresentation }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLElement>, id: string) => {
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
        {/* Optimized Image for LCP (Largest Contentful Paint) */}
        <img 
            src="assets/hero-background.jpg" 
            alt="The Jasmine Knot Atmospheric Background" 
            className="w-full h-full object-cover animate-ken-burns"
            fetchPriority="high"
            loading="eager"
            decoding="async"
        />
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
        
        <div className="flex flex-col sm:flex-row gap-6 mt-12 w-full sm:w-auto animate-fade-in-up opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          <a 
            href="#books" 
            onClick={(e) => scrollToSection(e, 'books')}
            className="group relative px-8 py-4 bg-primary/20 backdrop-blur-sm overflow-hidden rounded-sm transition-all duration-500 border border-primary/30 hover:shadow-glow hover:border-primary"
          >
            <div className="absolute inset-0 w-0 bg-primary transition-all duration-[800ms] ease-out group-hover:w-full opacity-20"></div>
            <span className="relative z-10 flex items-center justify-center gap-3 text-white text-sm font-bold tracking-[0.2em] uppercase font-body">
              Start Reading <ChevronRight size={16} className="text-blush group-hover:translate-x-2 transition-transform duration-500"/>
            </span>
          </a>
          
          <button
            onClick={onStartPresentation}
            className="px-8 py-4 border border-white/10 hover:border-blush/50 text-slate-400 hover:text-white rounded-sm text-sm tracking-[0.2em] uppercase font-body font-medium transition-all duration-500 hover:bg-white/5 cursor-pointer flex items-center justify-center gap-3"
          >
             <Sparkles size={14} className="opacity-70"/> Feature Tour
          </button>
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
