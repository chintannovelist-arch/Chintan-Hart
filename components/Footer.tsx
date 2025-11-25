
import React, { useState } from 'react';
import { ArrowUp, FileDown } from 'lucide-react';
import { AUTHOR_NAME } from '../constants';
import Brochure from './Brochure';

const Footer: React.FC = () => {
    const [showBrochure, setShowBrochure] = useState(false);
    
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const handlePlaceholder = (e: React.MouseEvent) => e.preventDefault();

    return (
        <footer className="bg-black py-12 text-white relative border-t border-white/5">
            <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="text-slate-500 text-sm flex flex-col md:flex-row items-center gap-4">
                    <span>&copy; 2025 {AUTHOR_NAME}. All rights reserved.</span>
                </div>
                 <div className="flex gap-6 text-sm font-light text-slate-400 items-center">
                    <button 
                        onClick={() => setShowBrochure(true)}
                        className="flex items-center gap-2 text-primary hover:text-white transition-colors uppercase text-[10px] tracking-widest font-bold"
                    >
                        <FileDown size={14} /> Download Guide
                    </button>
                    <a href="#" onClick={handlePlaceholder} className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" onClick={handlePlaceholder} className="hover:text-primary transition-colors">Contact</a>
                </div>
            </div>
             <button onClick={scrollToTop} className="absolute right-8 top-[-20px] bg-primary p-3 rounded-full shadow-lg hover:bg-primary-dark transition-all hover:-translate-y-1 group" aria-label="Scroll to top">
                 <ArrowUp size={20} color="white" className="group-hover:scale-110 transition-transform" />
             </button>
            {showBrochure && <Brochure onClose={() => setShowBrochure(false)} />}
        </footer>
    );
};

export default Footer;
