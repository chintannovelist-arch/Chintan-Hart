
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Image as ImageIcon, Quote, ChevronLeft, ChevronRight, ArrowDownCircle } from 'lucide-react';
import { GALLERY_IMAGES } from '../constants';

const NovelGallery: React.FC = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
    const [visibleCount, setVisibleCount] = useState(9);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const handleImageError = (id: number) => {
        setImgErrors(prev => ({ ...prev, [id]: true }));
    };

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev === null || prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
    }, [selectedImageIndex]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev === null || prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
    }, [selectedImageIndex]);

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 12, GALLERY_IMAGES.length));
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex === null) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setSelectedImageIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, handleNext, handlePrev]);

    const selectedImage = selectedImageIndex !== null ? GALLERY_IMAGES[selectedImageIndex] : null;
    const visibleImages = GALLERY_IMAGES.slice(0, visibleCount);

    const LightboxContent = (
        <AnimatePresence>
            {selectedImage && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10002] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
                    onClick={() => setSelectedImageIndex(null)}
                >
                    {/* Close Button */}
                    <button 
                        onClick={() => setSelectedImageIndex(null)}
                        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 group border border-white/10"
                        aria-label="Close Gallery"
                    >
                        <X size={24} className="group-hover:rotate-90 transition-transform"/>
                    </button>

                    {/* Navigation Buttons */}
                    <button 
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-primary/80 text-white rounded-full backdrop-blur-md transition-all z-50 group hidden md:block border border-white/10 hover:border-primary"
                        aria-label="Previous Image"
                    >
                        <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-primary/80 text-white rounded-full backdrop-blur-md transition-all z-50 group hidden md:block border border-white/10 hover:border-primary"
                        aria-label="Next Image"
                    >
                        <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <motion.div 
                        key={selectedImage.id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row bg-[#0F0F0F] rounded-sm overflow-hidden border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image Container - Constrained to Viewport */}
                        <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden h-[50vh] md:h-[85vh]">
                            {!imgErrors[selectedImage.id] ? (
                                <img 
                                    src={selectedImage.src} 
                                    alt={selectedImage.caption}
                                    className="max-w-full max-h-full object-contain shadow-2xl"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-500">
                                    <ImageIcon size={48} />
                                </div>
                            )}
                        </div>
                        
                        {/* Caption Side Panel */}
                        <div className="w-full md:w-96 bg-[#121212] p-8 md:p-10 flex flex-col justify-center border-l border-white/5 relative h-auto md:h-[85vh]">
                            <div className="mb-8 text-primary hidden md:block">
                                <Quote size={40} className="opacity-50" />
                            </div>
                            <div className="flex-1 flex items-center">
                                <p className="font-serif text-xl md:text-2xl text-white leading-relaxed italic drop-shadow-lg">
                                    {selectedImage.caption}
                                </p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">The Jasmine Knot</p>
                                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-mono">
                                    {selectedImageIndex !== null ? selectedImageIndex + 1 : 0} / {GALLERY_IMAGES.length}
                                </p>
                            </div>
                            
                            {/* Mobile Nav (Inside Card) */}
                            <div className="flex md:hidden justify-between mt-6 pt-4 border-t border-white/5">
                                <button onClick={handlePrev} className="p-2 text-slate-400 hover:text-white"><ChevronLeft/></button>
                                <button onClick={handleNext} className="p-2 text-slate-400 hover:text-white"><ChevronRight/></button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <section id="gallery" className="bg-black/20 relative min-h-screen w-full">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,150,190,0.08),transparent_60%)] pointer-events-none"></div>
            
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-24">
                <div className="text-center mb-16 pt-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-slate-300 text-[10px] tracking-widest uppercase mb-6 font-bold shadow-sm">
                        <ImageIcon size={12} className="text-primary" /> <span>The Visual Collection</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl text-white mb-4">Moments Captured</h2>
                    <p className="text-slate-400 font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                        Glimpses into the silent conversations, stolen touches, and cinematic atmosphere of <em>The Jasmine Knot</em>.
                    </p>
                </div>

                {/* 4:5 Aspect Ratio Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {visibleImages.map((image, index) => (
                        <motion.div 
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20px" }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <div 
                                className="group relative aspect-[4/5] rounded-sm overflow-hidden cursor-pointer bg-onyx border border-white/5 shadow-lg hover:shadow-[0_0_30px_rgba(37,150,190,0.2)] transition-all duration-500 hover:border-primary/30"
                                onClick={() => setSelectedImageIndex(index)}
                            >
                                {!imgErrors[image.id] ? (
                                    <img 
                                        src={image.src} 
                                        alt={image.caption}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                        loading="lazy"
                                        onError={() => handleImageError(image.id)}
                                    />
                                ) : (
                                    // Fallback placeholder
                                    <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center text-slate-600 p-8 text-center">
                                        <ImageIcon size={24} className="mb-4 opacity-50" />
                                        <p className="text-[10px] uppercase tracking-widest">Image {image.id}</p>
                                    </div>
                                )}
                                
                                {/* Cinematic Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                        <p className="text-white font-serif text-sm md:text-base leading-tight italic mb-3 drop-shadow-md line-clamp-3 border-l-2 border-primary pl-3">
                                            "{image.caption}"
                                        </p>
                                        <div className="flex items-center gap-2 text-[9px] text-primary uppercase tracking-widest font-bold">
                                            <ZoomIn size={12} /> Expand View
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button */}
                {visibleCount < GALLERY_IMAGES.length && (
                    <div className="mt-16 text-center">
                        <button 
                            onClick={handleLoadMore}
                            className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-slate-300 hover:text-white rounded-full transition-all duration-300 flex items-center gap-3 mx-auto uppercase text-xs font-bold tracking-widest shadow-lg"
                        >
                            <ArrowDownCircle size={16} className="group-hover:translate-y-1 transition-transform"/> Load More Moments
                        </button>
                    </div>
                )}
            </div>

            {/* Use Portal to ensure Lightbox breaks out of FeatureModal's z-index/transform constraints */}
            {mounted && createPortal(LightboxContent, document.body)}
        </section>
    );
};

export default NovelGallery;
