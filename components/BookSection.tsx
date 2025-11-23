
import React, { useState } from 'react';
import { X, BookOpen, ShoppingBag, Share2, Twitter, Facebook, Mail, Heart, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { BOOKS, BOOK_SAMPLE, AUTHOR_NAME } from '../constants';

const SampleModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in" 
            onClick={onClose} 
            role="dialog" 
            aria-modal="true"
        >
            <div 
                className="bg-onyx w-full max-w-3xl max-h-[90vh] rounded-sm shadow-volumetric flex flex-col relative animate-fade-in-up border border-white/10 transform transition-transform duration-500 ease-cinematic scale-95 hover:scale-100" 
                onClick={e => e.stopPropagation()}
            >
                <div className="absolute top-4 right-4 z-10">
                    <button 
                        onClick={onClose}
                        className="p-2 bg-white/5 hover:bg-primary hover:text-white rounded-full text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary group"
                        aria-label="Close sample"
                    >
                        <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>
                
                <div className="p-10 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                    <h3 className="font-display text-3xl text-center text-white tracking-widest drop-shadow-lg">{BOOK_SAMPLE.title}</h3>
                    <div className="flex justify-center mt-4">
                        <div className="h-px w-20 bg-primary/50 shadow-glow"></div>
                    </div>
                </div>
                
                <div className="overflow-y-auto px-8 py-6 sm:px-12 sm:py-10 custom-scrollbar bg-onyx">
                    <div className="prose prose-lg prose-invert max-w-none font-body font-light leading-loose text-slate-300 text-justify selection:bg-primary/30 selection:text-white">
                        {BOOK_SAMPLE.content.split('\n').map((para, i) => (
                            <p key={i} className="mb-6">{para}</p>
                        ))}
                    </div>
                    
                    <div className="mt-16 pt-8 border-t border-white/5 text-center pb-8">
                        <p className="italic text-slate-500 mb-8 font-display text-xl">"The story is just beginning..."</p>
                        <a 
                            href={BOOKS[0].amazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-primary/20 border border-primary/50 text-white rounded-sm hover:bg-primary hover:border-primary transition-all duration-500 uppercase tracking-widest text-xs font-bold shadow-glow hover:scale-105"
                        >
                           <ShoppingBag size={16} /> Purchase Full Copy
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookSection: React.FC = () => {
    const [isSampleOpen, setIsSampleOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    
    // Carousel State
    const [currentCoverIndex, setCurrentCoverIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const book = BOOKS[0];
    const shareText = encodeURIComponent(`Check out "${book.title}" by ${AUTHOR_NAME}. ${book.subtitle}.`);
    const shareUrl = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
    const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleShare = () => {
        if (typeof navigator !== 'undefined' && navigator.share) {
             navigator.share({
                 title: book.title,
                 text: `Check out "${book.title}" by ${AUTHOR_NAME}`,
                 url: window.location.href
             }).catch(() => {});
        }
    };

    // Carousel Logic
    const nextCover = () => {
        setCurrentCoverIndex((prev) => (prev + 1) % book.coverImages.length);
    };

    const prevCover = () => {
        setCurrentCoverIndex((prev) => (prev - 1 + book.coverImages.length) % book.coverImages.length);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) nextCover();
        if (isRightSwipe) prevCover();

        setTouchStart(0);
        setTouchEnd(0);
    };
    
    return (
    <section id="books" className="py-32 bg-onyx relative overflow-hidden">
      {/* Atmospheric Lighting */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blush/5 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <SampleModal isOpen={isSampleOpen} onClose={() => setIsSampleOpen(false)} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-center">
          {/* Cinematic Image Display with Carousel */}
          <div className="relative w-full max-w-lg mx-auto lg:ml-auto group perspective-1000 select-none">
             <div className="relative transform transition-all duration-700 ease-cinematic group-hover:rotate-y-2">
                {/* Glow effect behind book */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
                
                <div 
                    className="relative aspect-[2/3] rounded-sm shadow-2xl overflow-hidden border border-white/10 bg-black"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                   {book.coverImages.map((img, index) => (
                       <div 
                            key={index}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentCoverIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                       >
                            <img 
                                src={img.src} 
                                srcSet={img.srcSet} 
                                sizes="(max-width: 768px) 100vw, 500px"
                                alt={img.alt} 
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                            />
                             {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
                       </div>
                   ))}

                   {/* Carousel Navigation Controls */}
                   {book.coverImages.length > 1 && (
                       <>
                            <button 
                                onClick={(e) => { e.preventDefault(); prevCover(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/40 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary border border-white/10 hover:border-primary hover:scale-110 focus:opacity-100"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button 
                                onClick={(e) => { e.preventDefault(); nextCover(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/40 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary border border-white/10 hover:border-primary hover:scale-110 focus:opacity-100"
                                aria-label="Next image"
                            >
                                <ChevronRight size={24} />
                            </button>
                            
                            {/* Dots Indicator */}
                            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-2 pointer-events-none">
                                {book.coverImages.map((_, idx) => (
                                    <div 
                                        key={idx}
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${idx === currentCoverIndex ? 'bg-primary w-4' : 'bg-white/50'}`}
                                    />
                                ))}
                            </div>
                       </>
                   )}
                </div>
             </div>
          </div>
          
          {/* Narrative Content */}
          <article className="space-y-10">
                <div className="space-y-6 animate-fade-in-up">
                    <div className="flex flex-wrap gap-3">
                        {book.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] font-bold text-primary uppercase tracking-[0.2em] backdrop-blur-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="font-display text-5xl md:text-7xl text-white leading-none drop-shadow-lg">{book.title}</h3>
                    <h4 className="text-lg text-blush font-body font-light tracking-[0.2em] uppercase border-l-2 border-primary pl-4 py-1">{book.subtitle}</h4>
                </div>
                
                <p className="text-slate-300 leading-loose text-lg font-body font-light opacity-90 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {book.description}
                </p>
                
                <div className="flex flex-wrap gap-6 pt-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <a 
                        href={book.amazonLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-12 py-5 bg-gradient-to-r from-primary to-[#186a8a] hover:from-[#186a8a] hover:to-primary text-white text-sm font-bold uppercase tracking-[0.25em] rounded-sm shadow-[0_0_25px_rgba(37,150,190,0.6)] transition-all duration-500 ease-snappy hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,150,190,0.8)] flex items-center justify-center gap-3 group"
                    >
                        <ShoppingBag size={18} className="group-hover:animate-bounce"/> Buy on Amazon
                    </a>
                    <button 
                        onClick={() => setIsSampleOpen(true)}
                        className="px-10 py-5 border border-white/20 hover:border-white bg-transparent hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-[0.25em] rounded-sm transition-all duration-500 ease-snappy flex items-center justify-center gap-3 hover:shadow-glass"
                    >
                        <BookOpen size={16}/> Read Sample
                    </button>
                </div>

                {/* Minimalist Social */}
                <div className="pt-8 border-t border-white/5 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center gap-6">
                        <button onClick={handleLike} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${isLiked ? 'text-blush' : 'text-slate-500 hover:text-blush'}`}>
                            <Heart size={16} className={isLiked ? "fill-blush" : ""} /> Like
                        </button>
                         <button onClick={handleShare} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-primary transition-colors">
                            <Share2 size={16} /> Share
                        </button>
                    </div>
                    
                    <div className="flex gap-6">
                        <a href={twitterUrl} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-white transition-colors transform hover:scale-110 duration-300" aria-label="Share on Twitter"><Twitter size={18} /></a>
                        <a href="https://instagram.com/chintannovelist" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-white transition-colors transform hover:scale-110 duration-300" aria-label="Visit Instagram"><Instagram size={18} /></a>
                        <button className="text-slate-600 hover:text-white transition-colors transform hover:scale-110 duration-300" aria-label="Share on Facebook"><Facebook size={18} /></button>
                        <button className="text-slate-600 hover:text-white transition-colors transform hover:scale-110 duration-300" aria-label="Share via Email"><Mail size={18} /></button>
                    </div>
                </div>
           </article>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
