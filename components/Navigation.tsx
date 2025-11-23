
import React, { useState, useEffect } from 'react';
import { Feather, Key, Edit3, BookHeart, X, Menu, Search, Lock } from 'lucide-react';
import { AUTHOR_NAME } from '../constants';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('nav-scroll-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            setScrolled(!entry.isIntersecting);
        },
        { threshold: 1.0 }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavLink = ({ href, children, icon: Icon }: any) => (
    <a 
      href={href} 
      onClick={(e) => handleNavClick(e, href)}
      className="flex items-center gap-2 hover:text-blush transition-all duration-500 group font-body text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 focus:outline-none focus:text-blush hover:shadow-[0_0_10px_rgba(244,194,194,0.2)]"
    >
      {Icon && <Icon size={14} className="text-primary/70 group-hover:text-blush transition-colors opacity-70 group-hover:opacity-100" />}
      <span className="relative">
        {children}
        <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-gradient-to-r from-primary to-blush transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
      </span>
    </a>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl' : 'bg-transparent py-8'}`} role="navigation" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 font-display text-xl md:text-2xl text-white tracking-widest group cursor-pointer select-none">
          <div className="p-2 border border-white/10 rounded-full group-hover:border-primary/50 transition-colors duration-500 bg-white/5 group-hover:shadow-[0_0_15px_rgba(37,150,190,0.3)]">
            <Feather size={18} className="text-primary group-hover:rotate-12 transition-transform duration-700" />
          </div>
          <span className="group-hover:text-primary transition-colors duration-500 group-hover:drop-shadow-[0_0_10px_rgba(37,150,190,0.5)]">{AUTHOR_NAME}</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
          <NavLink href="#books">Novels</NavLink>
          <NavLink href="#cliffhanger" icon={Key}>Unlock</NavLink>
          <NavLink href="#tropematcher" icon={BookHeart}>Tropes</NavLink>
          <NavLink href="#finishscene" icon={Edit3}>Co-Write</NavLink>
          
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          <ThemeToggle />
          
          <a 
            href="#newsletter" 
            onClick={(e) => handleNavClick(e, '#newsletter')}
            className="ml-4 px-6 py-2.5 border border-primary/30 text-primary bg-primary/5 hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 rounded-sm text-[10px] font-bold tracking-[0.25em] uppercase shadow-[0_0_15px_rgba(37,150,190,0.1)] hover:shadow-[0_0_30px_rgba(37,150,190,0.5)] focus:outline-none focus:ring-1 focus:ring-primary relative overflow-hidden group"
          >
            <span className="relative z-10">Updates</span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              className="text-slate-300 hover:text-white transition-colors focus:outline-none p-2" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0F0F0F]/95 backdrop-blur-xl border-t border-white/5 p-8 flex flex-col gap-6 text-center shadow-2xl animate-fade-in border-b border-white/5">
           <NavLink href="#books">Novels</NavLink>
           <NavLink href="#cliffhanger">Unlock Scene</NavLink>
           <NavLink href="#tropematcher">Find Your Trope</NavLink>
           <NavLink href="#translator">Jasmine Translator</NavLink>
           <NavLink href="#finishscene">Co-Write</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
