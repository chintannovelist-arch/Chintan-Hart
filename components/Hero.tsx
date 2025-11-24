
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Sparkles, BookOpen, Image as ImageIcon } from 'lucide-react';
import { callGeminiTranslator } from '../services/geminiService';

interface HeroProps {
  onStartPresentation: () => void;
  onOpenGallery: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartPresentation, onOpenGallery }) => {
  const [introText, setIntroText] = useState("");

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchIntro = async () => {
        // Reuse the translator service to generate a romantic intro from a boring seed text
        // as requested by the user ("using the geminiTranslator service").
        const text = await callGeminiTranslator("Welcome to the immersive world of The Jasmine Knot.");
        setIntroText(text);
    };
    fetchIntro();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden py-20">
      {/* Sentinel for Navigation scroll detection */}
      <div id="nav-scroll-sentinel" className="absolute top-[20px] h-px w-full" aria-hidden="true"></div>

      {/* Subtle Background Effects - Enhanced Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,150,190,0.1),transparent_60%)] pointer-events-none"></div>
      {/* Replaced external stardust image with CSS gradient pattern to prevent loading errors */}
      <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none animate-pulse-slow"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-[100vw] mx-auto h-full justify-center">
        
        {/* Top Label */}
        <div className="animate-fade-in-up opacity-0 mb-8 md:mb-12" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
             <div className="flex items-center gap-4 md:gap-6 text-primary/90 text-[10px] md:text-xs tracking-[0.6em] uppercase font-bold">
                <span className="text-blush opacity-80">•</span>
                <span className="opacity-90">Immersive Romance</span>
                <span className="text-blush opacity-80">•</span>
            </div>
        </div>

        {/* Main Title - Strictly 2 Lines */}
        <div className="animate-fade-in-up opacity-0 mb-10 md:mb-16 relative select-none p-4 w-full" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <h1 className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_0_35px_rgba(255,255,255,0.15)] flex flex-col items-center justify-center w-full">
                {/* Line 1: THE JASMINE */}
                <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] xl:text-[9.5rem] tracking-[0.15em] leading-[1.6] mb-2 md:mb-6 px-4 py-2 whitespace-nowrap">
                    THE JASMINE
                </span>
                {/* Line 2: KNOT */}
                <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[12rem] tracking-[0.05em] leading-[1.2] text-white drop-shadow-[0_0_50px_rgba(37,150,190,0.4)] px-4 pb-4">
                    KNOT
                </span>
            </h1>
        </div>
        
        {/* Subtitle */}
        <div className="animate-fade-in-up opacity-0 mb-8 md:mb-12" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
             <p className="font-display text-xs md:text-2xl text-slate-300 tracking-[0.4em] md:tracking-[0.5em] uppercase drop-shadow-md flex items-center gap-4 text-center">
                <span className="hidden md:block h-px w-8 bg-gradient-to-r from-transparent to-primary/50"></span>
                Bound by Desire
                <span className="hidden md:block h-px w-8 bg-gradient-to-l from-transparent to-primary/50"></span>
            </p>
        </div>

        {/* Dynamic AI Intro - Transparent, Visible, No Box */}
        {introText && (
            <div className="animate-fade-in-up opacity-0 mb-12 md:mb-16 min-h-[4rem] flex items-center justify-center px-6 max-w-screen-xl" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
                <p className="font-serif text-2xl md:text-4xl text-blue-100 italic tracking-wide leading-relaxed drop-shadow-[0_0_30px_rgba(37,150,190,0.9)] [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
                    "{introText}"
                </p>
            </div>
        )}

        {/* Buttons - Enhanced & More Impressive */}
        <div className="flex flex-col lg:flex-row items-center gap-6 animate-fade-in-up opacity-0 z-30 mb-8" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            
            {/* Primary Button: Start Reading */}
            <a 
                href="#books"
                onClick={(e) => scrollToSection(e, 'books')}
                className="group relative px-10 py-5 min-w-[240px] rounded-sm bg-gradient-to-r from-primary to-[#186a8a] text-white text-xs font-bold uppercase tracking-[0.25em] shadow-[0_0_30px_rgba(37,150,190,0.4)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(37,150,190,0.7)] hover:-translate-y-1 hover:scale-105 overflow-hidden border border-white/20"
            >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                <span className="relative flex items-center justify-center gap-3">
                    Start Reading <BookOpen size={16} className="group-hover:rotate-12 transition-transform"/>
                </span>
            </a>
            
            {/* Secondary Button: Feature Tour (Glassmorphism) */}
            <button 
                onClick={onStartPresentation}
                className="group relative px-10 py-5 min-w-[240px] rounded-sm bg-white/5 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-[0.25em] transition-all duration-500 hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:-translate-y-1 flex items-center justify-center gap-3"
            >
                <span className="relative flex items-center justify-center gap-3">
                   <Sparkles size={16} className="text-blush opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" /> Feature Tour
                </span>
            </button>

            {/* Tertiary Button: Visual Gallery */}
            <button
                onClick={onOpenGallery}
                className="group relative px-10 py-5 min-w-[240px] rounded-sm bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-[0.25em] transition-all duration-500 hover:bg-white/5 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(37,150,190,0.2)] hover:-translate-y-1 flex items-center justify-center gap-3"
            >
                <span className="relative flex items-center justify-center gap-3">
                   <ImageIcon size={16} className="text-primary opacity-70 group-hover:opacity-100 transition-all" /> Visual Gallery
                </span>
            </button>
        </div>

        {/* Bottom Scroll Indicator - Now relative to prevent overlap */}
        <div className="relative mt-16 md:mt-24 animate-fade-in opacity-0 flex justify-center z-30" style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
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
