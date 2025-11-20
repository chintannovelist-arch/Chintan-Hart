
import React from 'react';
import { PenTool, Mail, Twitter, Instagram } from 'lucide-react';
import { AUTHOR_NAME } from '../constants';

const Author: React.FC = () => (
  <section id="author" className="py-28 bg-paper border-b border-white/5">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 md:gap-24">
        <div className="w-full md:w-5/12 flex justify-center md:justify-end relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-primary/20 rounded-full transform translate-x-4 translate-y-4 blur-lg"></div>
                <div className="absolute inset-0 bg-surface rounded-full flex items-center justify-center border-4 border-surface shadow-2xl overflow-hidden z-10 group">
                    <PenTool size={80} className="text-primary opacity-50 group-hover:scale-110 transition-transform duration-700" />
                </div>
            </div>
        </div>
        
        <div className="w-full md:w-7/12 text-center md:text-left">
            <h2 className="font-serif text-5xl text-white mb-3">{AUTHOR_NAME}</h2>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
                <span className="h-px w-8 bg-primary"></span>
                <p className="text-primary tracking-widest text-xs uppercase font-bold">Novelist</p>
            </div>
            
            <p className="text-slate-400 text-xl mb-10 leading-relaxed font-serif font-light">
                Chintan Hart is a romance author who explores the delicate tension between tradition and modern desire. Chintan writes steamy, slow-burn stories that capture the heat, humidity, and heart of South India.
            </p>
            
            <div className="flex justify-center md:justify-start gap-4">
                <a href="mailto:chintannovelist@gmail.com" className="w-12 h-12 bg-surface border border-white/10 rounded-full text-primary hover:bg-primary hover:text-white hover:-translate-y-1 transition-all shadow-sm flex items-center justify-center"><Mail size={20} /></a>
                <a href="https://x.com/ChintanNov13153" className="w-12 h-12 bg-surface border border-white/10 rounded-full text-primary hover:bg-primary hover:text-white hover:-translate-y-1 transition-all shadow-sm flex items-center justify-center"><Twitter size={20} /></a>
                <a href="https://www.instagram.com/chintannovelist/" className="w-12 h-12 bg-surface border border-white/10 rounded-full text-primary hover:bg-primary hover:text-white hover:-translate-y-1 transition-all shadow-sm flex items-center justify-center"><Instagram size={20} /></a>
            </div>
        </div>
    </div>
  </section>
);

export default Author;
