
import React, { useState } from 'react';
import { ChevronDown, Sparkles, BookOpen, Image as ImageIcon, Star } from 'lucide-react';

interface HeroProps {
  onStartPresentation: () => void;
  onOpenGallery: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartPresentation, onOpenGallery }) => {
  // Set the high-quality copy as the default state
  const [introText] = useState("Surrender to this realm where the jasmine's intoxicating perfume entwines with whispered secrets, binding hearts in a tapestry of exquisite longing.");

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Shared button style for "Same Attraction"
  const buttonClass = "group relative px-10 py-5 w-full md:w-auto min-w-[240px] rounded-sm bg-gradient-to-r from-primary to-[#186a8a] text-white text-xs font-bold uppercase tracking-[0.25em] shadow-[0_0_25px_rgba(37,150,190,0.4)] transition-all duration-500 hover:shadow-[0_0_50px_rgba(37,150,190,0.7)] hover:-translate-y-1 hover:scale-105 overflow-hidden border border-white/20 flex items-center justify-center gap-3";
  
  const shimmerEffect = (
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
  );

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden py-20">
      {/* Sentinel for Navigation scroll detection */}
      <div id="nav-scroll-sentinel" className="absolute top-[20px] h-px w-full" aria-hidden="true"></div>

      {/* Subtle Background Effects - Enhanced Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,150,190,0.1),transparent_60%)] pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none animate-pulse-slow"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-[100vw] mx-auto h-full justify-center">
        
        {/* Top Label - Significantly Lowered */}
        <div className="animate-fade-in-up opacity-0 mb-8 md:mb-12 mt-32 md:mt-40" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
             <div className="flex items-center gap-4 md:gap-6 text-primary/90 text-[10px] md:text-xs tracking-[0.6em] uppercase font-bold">
                <span className="text-blush opacity-80">•</span>
                <span className="opacity-90">Immersive Romance</span>
                <span className="text-blush opacity-80">•</span>
            </div>
        </div>

        {/* Main Title - Strictly 2 Lines with Staggered Reveal */}
        <div className="mb-10 md:mb-16 relative select-none p-4 w-full">
            <h1 className="font-display font-bold flex flex-col items-center justify-center w-full">
                {/* Line 1: THE JASMINE */}
                <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] xl:text-[9.5rem] text-[rgb(var(--c-white))] tracking-[0.15em] leading-[1.6] mb-2 md:mb-6 px-4 py-2 whitespace-nowrap opacity-0 animate-title-reveal drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]" style={{ animationDelay: '0.2s' }}>
                    THE JASMINE
                </span>
                {/* Line 2: KNOT */}
                <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[12rem] tracking-[0.05em] leading-[1.2] text-white drop-shadow-[0_0_50px_rgba(37,150,190,0.4)] px-4 pb-4 opacity-0 animate-title-reveal" style={{ animationDelay: '0.5s' }}>
                    KNOT
                </span>
            </h1>
        </div>
        
        {/* Subtitle */}
        <div className="animate-fade-in-up opacity-0 mb-8 md:mb-12" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
             <p className="font-display text-xs md:text-2xl text-slate-300 tracking-[0.4em] md:tracking-[0.5em] uppercase drop-shadow-md flex items-center gap-4 text-center">
                <span className="hidden md:block h-px w-8 bg-gradient-to-r from-transparent to-primary/50"></span>
                Bound by Desire
                <span className="hidden md:block h-px w-8 bg-gradient-to-l from-transparent to-primary/50"></span>
            </p>
        </div>

        {/* Highlighted Intro Text - Enhanced Visuals */}
        <div className="animate-fade-in-up opacity-0 mb-16 md:mb-20 px-6 max-w-5xl mx-auto relative group cursor-default" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
            <div className="relative p-8 md:p-12 transition-all duration-700">
                {/* Decorative Star */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/60 animate-pulse">
                    <Star size={16} fill="currentColor" />
                </div>
                
                {/* Main Text with Gradient and Glow */}
                <p className="font-serif text-xl md:text-3xl lg:text-4xl text-center leading-relaxed tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-50 to-slate-300 drop-shadow-[0_0_25px_rgba(37,150,190,0.5)] italic selection:bg-primary/30 selection:text-white">
                    “{introText}”
                </p>
                
                {/* Bottom Divider */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent group-hover:w-48 transition-all duration-700"></div>
            </div>
        </div>

        {/* Buttons - Unified "Same Attraction" Style */}
        <div className="flex flex-col lg:flex-row items-center gap-6 animate-fade-in-up opacity-0 z-30 mb-8" style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
            
            {/* Start Reading */}
            <a href="#books" onClick={(e) => scrollToSection(e, 'books')} className={buttonClass}>
                {shimmerEffect}
                <span className="relative flex items-center justify-center gap-3">
                    Start Reading <BookOpen size={18} className="group-hover:rotate-12 transition-transform"/>
                </span>
            </a>
            
            {/* Feature Tour */}
            <button onClick={onStartPresentation} className={buttonClass}>
                {shimmerEffect}
                <span className="relative flex items-center justify-center gap-3">
                   Feature Tour <Sparkles size={18} className="group-hover:scale-110 transition-transform" />
                </span>
            </button>

            {/* Visual Gallery */}
            <button onClick={onOpenGallery} className={buttonClass}>
                {shimmerEffect}
                <span className="relative flex items-center justify-center gap-3">
                   Visual Gallery <ImageIcon size={18} className="group-hover:scale-110 transition-transform" />
                </span>
            </button>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="relative mt-16 md:mt-24 animate-fade-in opacity-0 flex justify-center z-30" style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}>
            <a 
                href="#books" 
                onClick={(e) => scrollToSection(e, 'books')}
                className="flex flex-col items-center gap-3 text-slate-500 hover:text-primary transition-colors duration-500 group cursor-pointer p-4"
            >
                <span className="text-[9px] uppercase tracking-[0.4em] font-medium opacity-60 group-hover:opacity-100 transition-opacity">Begin</span>
                <ChevronDown size={24} className="opacity-40 group-hover:opacity-100 animate-bounce text-primary" />
            </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
