import React from 'react';
import { SNEAK_PEEKS } from '../constants';
import { BookOpen } from 'lucide-react';

const Snippets: React.FC = () => (
  <section id="sneakpeeks" className="py-28 bg-secondary border-y border-white/5">
    <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
            <h2 className="font-serif text-4xl text-white mb-4">Sneak Peeks</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-80"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {SNEAK_PEEKS.map((peek, index) => (
                <div key={index} className="group bg-surface p-8 rounded-xl border border-white/5 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(37,150,190,0.15)] transition-all duration-300 hover:-translate-y-1 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-colors duration-300"></div>
                    
                    <div className="mb-6 flex items-center gap-2 text-primary/60 group-hover:text-primary transition-colors">
                        <BookOpen size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">{peek.chapter}</span>
                    </div>
                    
                    <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-primary transition-colors font-bold leading-tight">{peek.title}</h3>
                    
                    <div className="flex-grow">
                        <p className="font-serif text-lg text-slate-400 italic leading-relaxed">"{peek.excerpt}"</p>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-white/5 text-right">
                        <span className="text-sm font-medium text-slate-500 group-hover:text-primary transition-colors">Read More &rarr;</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  </section>
);

export default Snippets;