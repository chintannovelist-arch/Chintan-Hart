
import React, { useState, useEffect } from 'react';
import { Feather, Key, Edit3, BookHeart, X, Menu } from 'lucide-react';
import { AUTHOR_NAME } from '../constants';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('nav-scroll-sentinel');
    if (!sentinel) return;

    // Use IntersectionObserver to detect when the sentinel is out of view
    // This is far more performant than a 'scroll' event listener
    const observer = new IntersectionObserver(
        ([entry]) => {
            // When the sentinel is no longer intersecting, it means we have scrolled down
            setScrolled(!entry.isIntersecting);
        },
        { threshold: 1.0 } // Trigger as soon as the element is fully out of view
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
      className="flex items-center gap-2 hover:text-blush transition-all duration-500 group font-body text-xs tracking-[0.15em] uppercase text-slate-300 focus:outline-none focus:text-blush"
    >
      {Icon && <Icon size={14} className="text-primary group-hover:text-blush transition-colors opacity-70" />}
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-blush transition-all duration-500 group-hover:w-full opacity-50"></span>
      </span>
    </a>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-8'}`} role="navigation" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 font-display text-2xl text-white tracking-widest group cursor-pointer select-none">
          <Feather size={20} className="text-primary group-hover:rotate-12 transition-transform duration-700" />
          <span className="group-hover:text-primary transition-colors duration-500">{AUTHOR_NAME}</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
          <NavLink href="#books">Novels</NavLink>
          <NavLink href="#cliffhanger" icon={Key}>Unlock</NavLink>
          <NavLink href="#tropematcher" icon={BookHeart}>Tropes</NavLink>
          <NavLink href="#finishscene" icon={Edit3}>Co-Write</NavLink>
          <a 
            href="#newsletter" 
            onClick={(e) => handleNavClick(e, '#newsletter')}
            className="ml-4 px-6 py-2 border border-primary/50 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 rounded-sm text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(37,150,190,0.1)] hover:shadow-[0_0_25px_rgba(37,150,190,0.4)] focus:outline-none focus:ring-1 focus:ring-primary"
          >
            Updates
          </a>
        </div>

        <button 
          className="lg:hidden text-white/80 hover:text-primary transition-colors focus:outline-none focus:text-primary" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-onyx/95 backdrop-blur-xl border-t border-white/5 p-8 flex flex-col gap-6 text-center shadow-2xl animate-fade-in">
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
