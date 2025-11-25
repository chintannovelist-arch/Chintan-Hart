
import React, { useState, useEffect } from 'react';
import { Feather, Menu, X, BookOpen, Image as ImageIcon, Camera, MessageSquare, Instagram, BookHeart, Zap, ChevronRight } from 'lucide-react';
import { AUTHOR_NAME } from '../constants';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Update URL for better UX without jumping
        window.history.pushState(null, '', href);
    }
  };

  // Enhanced "Tab" Style NavLink - Distinct Button Look
  const NavLink = ({ href, children, icon: Icon }: any) => (
    <a 
      href={href} 
      onClick={(e) => handleNavClick(e, href)}
      className="group relative flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 focus:outline-none shadow-sm hover:shadow-[0_0_15px_rgba(37,150,190,0.2)] pointer-events-auto"
    >
      {Icon && (
        <Icon 
          size={14} 
          className="text-slate-400 group-hover:text-primary transition-colors duration-300" 
        />
      )}
      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
        {children}
      </span>
      
      {/* Active Indicator - Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_8px_rgba(37,150,190,1)]"></div>
    </a>
  );

  // Mobile Specific Link Component
  const MobileNavLink = ({ href, children, icon: Icon, subtitle }: any) => (
    <a 
      href={href} 
      onClick={(e) => handleNavClick(e, href)}
      className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/30 transition-all group w-full pointer-events-auto"
    >
      <div className="flex items-center gap-4">
          <div className="p-2 bg-black/50 rounded-full text-slate-400 group-hover:text-primary transition-colors">
              {Icon && <Icon size={18} />}
          </div>
          <div className="text-left">
              <span className="block text-sm font-bold text-white uppercase tracking-widest group-hover:text-primary transition-colors">{children}</span>
              {subtitle && <span className="block text-[10px] text-slate-500 font-light mt-1">{subtitle}</span>}
          </div>
      </div>
      <ChevronRight size={16} className="text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </a>
  );

  return (
    <>
    <nav className="absolute top-0 left-0 w-full z-50 py-8 bg-transparent pointer-events-none" role="navigation" aria-label="Main Navigation">
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 font-display text-xl md:text-2xl text-white tracking-widest group cursor-pointer select-none pointer-events-auto" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
          <div className="p-2 border border-white/10 rounded-full group-hover:border-primary/50 transition-colors duration-500 bg-white/5 group-hover:shadow-[0_0_15px_rgba(37,150,190,0.3)]">
            <Feather size={18} className="text-primary group-hover:rotate-12 transition-transform duration-700" />
          </div>
          <span className="group-hover:text-primary transition-colors duration-500 group-hover:text-shadow-glow">{AUTHOR_NAME}</span>
        </div>
        
        {/* Desktop Menu - Tab Style Buttons */}
        <div className="hidden xl:flex items-center gap-3 p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-lg pointer-events-auto">
          <NavLink href="#books" icon={BookOpen}>Novels</NavLink>
          <NavLink href="#gallery" icon={ImageIcon}>Gallery</NavLink>
          <NavLink href="#visualizer" icon={Camera}>Your Desired Moment</NavLink>
          <NavLink href="#connect" icon={MessageSquare}>Character Connect</NavLink>
          <NavLink href="#experience" icon={Instagram}>Insta Reels</NavLink>
          
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          <div className="pointer-events-auto">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="xl:hidden flex items-center gap-4 pointer-events-auto">
            <ThemeToggle />
            <button 
              className="text-slate-300 hover:text-white transition-colors focus:outline-none p-2 border border-white/10 rounded-sm hover:bg-white/5" 
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
        </div>
      </div>
    </nav>

    {/* Full Screen Mobile Drawer */}
    {isOpen && (
        <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-2xl xl:hidden animate-fade-in flex flex-col pointer-events-auto">
            {/* Drawer Header */}
            <div className="p-6 flex justify-between items-center border-b border-white/10">
                <span className="font-display text-xl text-white tracking-widest flex items-center gap-3">
                    <Feather size={18} className="text-primary"/> {AUTHOR_NAME}
                </span>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full transition-colors"
                    aria-label="Close menu"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <div className="space-y-8 max-w-md mx-auto">
                    
                    {/* Section 1 */}
                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-4 pl-2 border-l-2 border-primary">The Narrative</h3>
                        <div className="space-y-3">
                            <MobileNavLink href="#books" icon={BookHeart} subtitle="The Jasmine Knot">Novels</MobileNavLink>
                            <MobileNavLink href="#gallery" icon={ImageIcon} subtitle="Visual Timeline">Gallery</MobileNavLink>
                            <MobileNavLink href="#visualizer" icon={Camera} subtitle="Generate Scenes">Your Desired Moment</MobileNavLink>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-4 pl-2 border-l-2 border-blush">Interactive Hub</h3>
                        <div className="space-y-3">
                            <MobileNavLink href="#connect" icon={MessageSquare} subtitle="Chat with Characters">Character Connect</MobileNavLink>
                            <MobileNavLink href="#experience" icon={Instagram} subtitle="Visual Aesthetics">Insta Reels</MobileNavLink>
                            <MobileNavLink href="#ai-hub" icon={Zap} subtitle="More Tools">AI Experience Hub</MobileNavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
    </>
  );
};

export default Navigation;
