
import React, { useRef, useState } from 'react';
import { Download, X, BookOpen, BrainCircuit, Flame, Activity, Star } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AUTHOR_NAME, BOOKS } from '../constants';

interface BrochureProps {
    onClose: () => void;
}

const Brochure: React.FC<BrochureProps> = ({ onClose }) => {
    const brochureRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = async () => {
        if (!brochureRef.current) return;
        setIsGenerating(true);

        try {
            const canvas = await html2canvas(brochureRef.current, {
                scale: 2, // Higher resolution
                useCORS: true,
                backgroundColor: '#0F0F0F', // Ensure dark theme capture
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            
            // Adjust to fill height or width
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 0;

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('The-Jasmine-Knot-Guide.pdf');
        } catch (error) {
            console.error("PDF Generation failed:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[10001] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl flex justify-between items-center mb-4 text-white">
                <h3 className="font-display text-xl tracking-widest">Exclusive Companion Guide</h3>
                <div className="flex gap-4">
                     <button 
                        onClick={generatePDF}
                        disabled={isGenerating}
                        className="px-6 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary-dark transition-all flex items-center gap-2 shadow-glow"
                    >
                        {isGenerating ? "Generating..." : <><Download size={16} /> Download PDF</>}
                    </button>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
                </div>
            </div>

            <div className="w-full h-full overflow-y-auto custom-scrollbar flex justify-center bg-black/50 p-8">
                {/* PDF CONTENT AREA - A4 Ratio Container */}
                <div 
                    ref={brochureRef} 
                    className="w-[794px] min-h-[1123px] bg-[#0F0F0F] text-white p-12 border border-white/5 shadow-2xl relative flex flex-col justify-between"
                    style={{ aspectRatio: '1/1.4142' }}
                >
                    {/* Watermark Texture */}
                    {/* Replaced external stardust image with CSS gradient pattern to prevent loading errors */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,150,190,0.05),transparent)] pointer-events-none"></div>

                    {/* HEADER */}
                    <header className="text-center border-b border-white/10 pb-8 mb-8">
                         <div className="flex items-center justify-center gap-2 text-primary text-xs uppercase tracking-[0.5em] mb-4">
                            <Star size={12} className="fill-primary" /> An Interactive Experience
                         </div>
                         <h1 className="font-display text-6xl text-white mb-2 leading-none">THE JASMINE<br/>KNOT</h1>
                         <p className="font-body text-slate-400 tracking-[0.4em] uppercase text-sm">Bound by Desire • A Novel by {AUTHOR_NAME}</p>
                    </header>

                    {/* BODY CONTENT */}
                    <div className="flex-1 space-y-12">
                        
                        {/* THE NOVEL SECTION */}
                        <section className="flex gap-8 items-start">
                             <div className="w-1/3">
                                <div className="aspect-[2/3] bg-black border border-white/10 shadow-lg relative overflow-hidden group">
                                     <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-60"></div>
                                     <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                                         <span className="font-display text-2xl text-white/50">Cover Art</span>
                                     </div>
                                </div>
                             </div>
                             <div className="w-2/3 space-y-4">
                                 <h2 className="font-display text-2xl text-white border-l-2 border-primary pl-4">Beyond the Pages</h2>
                                 <p className="font-body text-slate-300 text-sm leading-relaxed text-justify">
                                     In the humid heat of Chennai, a "Friends First" pact between Meena and Vijay slowly crumbles under the weight of unspoken desire. <em>The Jasmine Knot</em> is more than a romance; it is a sensory journey through arranged marriage, longing, and the breaking point of control.
                                 </p>
                                 <div className="bg-white/5 p-4 rounded-sm border border-white/5 mt-4">
                                     <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Available on Kindle</p>
                                     <p className="text-[10px] text-slate-400">Scan the QR code below to start reading immediately.</p>
                                 </div>
                             </div>
                        </section>

                        {/* AI FEATURES SECTION */}
                        <section>
                            <h2 className="font-display text-2xl text-white border-l-2 border-blush pl-4 mb-6">Immersive AI Features</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-black/40 p-4 border border-white/10 rounded-sm">
                                    <div className="flex items-center gap-2 text-primary mb-2">
                                        <Activity size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Tension Heatmap</span>
                                    </div>
                                    <p className="text-slate-400 text-xs">Don't just read the slow burn—visualize it. Track how the romantic tension rises chapter by chapter.</p>
                                </div>
                                <div className="bg-black/40 p-4 border border-white/10 rounded-sm">
                                    <div className="flex items-center gap-2 text-blush mb-2">
                                        <BrainCircuit size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Unspoken Thoughts</span>
                                    </div>
                                    <p className="text-slate-400 text-xs">Unlock Vijay’s internal monologue during key moments of silence. See what he <em>wanted</em> to say.</p>
                                </div>
                                <div className="bg-black/40 p-4 border border-white/10 rounded-sm">
                                    <div className="flex items-center gap-2 text-yellow-200 mb-2">
                                        <Flame size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Cliffhanger Engine</span>
                                    </div>
                                    <p className="text-slate-400 text-xs">Experience high-voltage "what if" scenarios generated by AI in the author's signature style.</p>
                                </div>
                                <div className="bg-black/40 p-4 border border-white/10 rounded-sm">
                                    <div className="flex items-center gap-2 text-purple-300 mb-2">
                                        <BookOpen size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Co-Write Scenes</span>
                                    </div>
                                    <p className="text-slate-400 text-xs">Take the pen. Finish a scene yourself and let the AI expand your narrative choices.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* FOOTER CTA */}
                    <footer className="mt-12 pt-8 border-t border-white/10 flex justify-between items-end">
                        <div>
                            <p className="font-display text-xl text-white mb-2">Get the Novel Today</p>
                            <p className="text-primary text-xs uppercase tracking-widest font-bold">Search "The Jasmine Knot" on Amazon</p>
                        </div>
                        <div className="text-right">
                            <div className="w-24 h-24 bg-white p-2 mb-2 ml-auto">
                                {/* Placeholder for QR Code */}
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(BOOKS[0].amazonLink)}`} alt="QR Code" className="w-full h-full" />
                            </div>
                            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Scan to Buy</p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Brochure;
