
import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Activity, Flame, Lock, Unlock, Zap } from 'lucide-react';
import { TENSION_DATA } from '../constants';

// --- Component Constants ---
const SVG_WIDTH = 800;
const SVG_HEIGHT = 350; // Increased height for labels
const PADDING = 40;
const BOTTOM_PADDING = 60; // Extra padding for X-axis labels
const MAX_Y_VALUE = 100;

/**
 * A memoized component for rendering individual data points on the graph.
 */
const MemoizedGraphPoint = React.memo(({ d, i, isActive, getX, getY, onPointHover }: any) => {
    const cx = getX(i);
    const cy = getY(d.tension);
    
    return (
        <g 
            onMouseEnter={() => onPointHover(d, cx, cy)} 
            onClick={() => onPointHover(d, cx, cy)}
            className="cursor-pointer group/point focus:outline-none"
            role="button"
            tabIndex={0}
            aria-label={`Chapter ${d.chapter}: ${d.title}, Tension ${d.tension}%`}
        >
             {/* Vertical Guide Line on Active */}
             {isActive && (
                <line 
                    x1={cx} y1={cy} x2={cx} y2={SVG_HEIGHT - BOTTOM_PADDING} 
                    stroke="rgba(255,255,255,0.2)" 
                    strokeWidth="1" 
                    strokeDasharray="4 4" 
                    className="animate-fade-in"
                />
            )}

            {/* Invisible larger touch target for easier hovering on mobile/desktop */}
            <circle cx={cx} cy={cy} r="24" fill="transparent" />
            
            {/* Active Halo Effect */}
            <circle 
                cx={cx} 
                cy={cy} 
                r={isActive ? "12" : "0"} 
                fill="rgba(244, 194, 194, 0.3)" 
                className="transition-all duration-300"
            />

            {/* Visible Point */}
            <circle 
                cx={cx} 
                cy={cy} 
                r="6" 
                fill={isActive ? "#F4C2C2" : "#0F0F0F"} 
                stroke={d.tension > 80 ? "#F4C2C2" : "#2596be"} 
                strokeWidth="2" 
                className={`transition-all duration-300 ${isActive ? 'scale-125 stroke-white' : 'group-hover/point:scale-125 group-hover/point:fill-white'}`} 
            />
        </g>
    );
});
MemoizedGraphPoint.displayName = 'MemoizedGraphPoint';

const TensionHeatmap: React.FC = () => {
    const [activePoint, setActivePoint] = useState<typeof TENSION_DATA[0] | null>(null);
    const [tooltipPos, setTooltipPos] = useState<{x: number, y: number} | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    // useCallback ensures the function reference is stable
    const handlePointHover = useCallback((point: typeof TENSION_DATA[0], x: number, y: number) => {
        setActivePoint(point);
        setTooltipPos({ x, y });
    }, []);

    const { getX, getY, tensionLinePath, tensionAreaPath } = useMemo(() => {
        const getX = (index: number) => PADDING + (index / (TENSION_DATA.length - 1)) * (SVG_WIDTH - 2 * PADDING);
        const getY = (val: number) => (SVG_HEIGHT - BOTTOM_PADDING) - (val / MAX_Y_VALUE) * (SVG_HEIGHT - BOTTOM_PADDING - PADDING);
        const svgPoints = TENSION_DATA.map((d, i) => `${getX(i)},${getY(d.tension)}`).join(" ");
        const svgAreaPoints = `${getX(0)},${SVG_HEIGHT - BOTTOM_PADDING} ${svgPoints} ${getX(TENSION_DATA.length - 1)},${SVG_HEIGHT - BOTTOM_PADDING}`;
        return { getX, getY, tensionLinePath: svgPoints, tensionAreaPath: svgAreaPoints };
    }, []);

    // Handle touch/move on the SVG to find nearest point
    const handleTouchMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
        if (!svgRef.current) return;
        
        const rect = svgRef.current.getBoundingClientRect();
        let clientX;
        
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
        } else {
            clientX = (e as React.MouseEvent).clientX;
        }

        // Calculate X relative to SVG coordinate system
        const relativeX = (clientX - rect.left) * (SVG_WIDTH / rect.width);
        
        // Find nearest index
        const totalPoints = TENSION_DATA.length;
        const widthPerPoint = (SVG_WIDTH - 2 * PADDING) / (totalPoints - 1);
        
        let nearestIndex = Math.round((relativeX - PADDING) / widthPerPoint);
        nearestIndex = Math.max(0, Math.min(nearestIndex, totalPoints - 1));
        
        const point = TENSION_DATA[nearestIndex];
        handlePointHover(point, getX(nearestIndex), getY(point.tension));
    }, [getX, getY, handlePointHover]);


    // Dynamic Tooltip Positioning Logic
    const tooltipStyles = useMemo(() => {
        if (!tooltipPos) return { container: '', arrow: '' };
        
        const { x, y } = tooltipPos;
        const width = SVG_WIDTH;
        const ttWidth = 240; // Approx tooltip width

        // 1. Vertical Logic: Flip below if too close to top
        const showBelow = y < 130; 
        
        // 2. Horizontal Logic: Shift if too close to edges
        let xTranslate = '-translate-x-1/2';
        let arrowLeft = 'left-1/2 -translate-x-1/2';

        if (x < ttWidth / 2) {
             xTranslate = '-translate-x-[15%]';
             arrowLeft = 'left-[15%]';
        } else if (x > width - ttWidth / 2) {
             xTranslate = '-translate-x-[85%]';
             arrowLeft = 'left-[85%]';
        }

        const containerClass = showBelow 
            ? `${xTranslate} translate-y-[20px]` 
            : `${xTranslate} -translate-y-full -mt-4`;

        const arrowBorder = showBelow
            ? `border-b-[6px] border-b-primary/40 border-t-0 top-[-6px] ${arrowLeft}`
            : `border-t-[6px] border-t-primary/40 border-b-0 bottom-[-6px] ${arrowLeft}`;

        return { container: containerClass, arrow: arrowBorder };
    }, [tooltipPos]);

    return (
        <section id="heatmap" className="py-32 bg-black border-b border-white/5">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-sm text-slate-300 text-xs tracking-widest uppercase mb-6 font-bold">
                        <Activity size={12} className="text-primary" /> <span>Emotional Analytics</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Spicy Tension Heatmap</h2>
                    <p className="text-slate-400 font-body font-light max-w-xl mx-auto">
                        Visualize the "Slow Burn". Track how the rising romantic tension correlates with the crumbling of their "Friends First" pact.
                    </p>
                </div>

                {/* Slow Burn Meter UI */}
                <div className="mb-12 max-w-2xl mx-auto bg-onyx p-6 rounded-sm border border-white/5 shadow-lg relative overflow-hidden spotlight-card">
                     <div className="absolute top-0 right-0 p-2 opacity-10">
                         <Flame size={40} className="text-white" />
                     </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-4">
                        <span className="flex items-center gap-2"><Lock size={10}/> Pact Integrity</span>
                        <span className="text-blush flex items-center gap-2">Desire <Unlock size={10}/></span>
                    </div>
                    <div className="h-4 bg-black rounded-full overflow-hidden relative border border-white/10">
                         <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-blush w-full transform origin-left transition-transform duration-700 ease-out"
                              style={{ transform: `scaleX(${activePoint ? activePoint.tension / 100 : 0})` }}></div>
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20"></div>
                    </div>
                    <div className="flex justify-between mt-3 font-display text-xl text-white">
                        <span className="text-primary">Control: {activePoint ? activePoint.pactIntegrity : 100}%</span>
                        <span className="text-blush">{activePoint ? activePoint.tension : 0}% Tension</span>
                    </div>
                </div>

                {/* The Graph */}
                <div className="relative bg-onyx border border-white/10 rounded-sm p-4 md:p-8 shadow-2xl group z-0 spotlight-card">
                    <div className="w-full overflow-x-auto custom-scrollbar pb-4 relative">
                        <div className="min-w-[800px] relative">
                            <svg 
                                ref={svgRef}
                                width="100%" 
                                height={SVG_HEIGHT} 
                                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} 
                                className="overflow-visible touch-none"
                                onTouchMove={handleTouchMove}
                            >
                                <defs>
                                    <linearGradient id="tensionGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#F4C2C2" stopOpacity="0.3"/>
                                        <stop offset="100%" stopColor="#F4C2C2" stopOpacity="0"/>
                                    </linearGradient>
                                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#2596be" />
                                        <stop offset="50%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#F4C2C2" />
                                    </linearGradient>
                                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Horizontal Grid Lines */}
                                {[0, 25, 50, 75, 100].map(val => (
                                    <g key={val}>
                                        <line x1={PADDING} y1={getY(val)} x2={SVG_WIDTH - PADDING} y2={getY(val)} stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
                                        {/* Y-Axis Labels */}
                                        <text x={PADDING - 10} y={getY(val) + 4} fill="#666" fontSize="10" textAnchor="end" className="font-mono">{val}%</text>
                                    </g>
                                ))}

                                {/* X-Axis Labels - Sparse rendering to avoid clutter */}
                                {TENSION_DATA.map((d, i) => {
                                    // Only show every 4th label or the last one to prevent crowding
                                    if (i % 4 !== 0 && i !== TENSION_DATA.length - 1) return null;
                                    
                                    return (
                                        <text 
                                            key={i} 
                                            x={getX(i)} 
                                            y={SVG_HEIGHT - BOTTOM_PADDING + 20} 
                                            fill={activePoint === d ? "#F4C2C2" : "#666"} 
                                            fontSize="10" 
                                            textAnchor="middle" 
                                            className={`font-mono transition-colors duration-300 ${activePoint === d ? 'font-bold' : ''}`}
                                        >
                                            Ch.{d.chapter}
                                        </text>
                                    );
                                })}

                                <path d={tensionAreaPath} fill="url(#tensionGradient)" className="opacity-40 transition-opacity duration-500" />
                                <path d={`M ${tensionLinePath}`} fill="none" stroke="url(#lineGradient)" strokeWidth="4" strokeLinecap="round" filter="url(#glow)" className="drop-shadow-lg" />

                                {TENSION_DATA.map((d, i) => (
                                    <MemoizedGraphPoint
                                        key={i}
                                        d={d}
                                        i={i}
                                        isActive={activePoint === d}
                                        getX={getX}
                                        getY={getY}
                                        onPointHover={handlePointHover}
                                    />
                                ))}
                            </svg>

                            {/* Floating Interactive Tooltip with Dynamic Positioning */}
                            {activePoint && tooltipPos && (
                                <div 
                                    className={`absolute z-50 transform transition-all duration-300 ease-out ${tooltipStyles.container}`}
                                    style={{ left: tooltipPos.x, top: tooltipPos.y }}
                                >
                                    <div className="bg-black/90 backdrop-blur-md border border-primary/40 p-4 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.8)] w-60 animate-fade-in-up">
                                        <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                                            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Chapter {activePoint.chapter}</span>
                                            <span className={`text-[9px] uppercase tracking-widest font-bold ${activePoint.tension > 80 ? 'text-blush' : 'text-primary'}`}>
                                                {activePoint.tension}% <Zap size={8} className="inline mb-0.5"/>
                                            </span>
                                        </div>
                                        <h4 className="font-display text-white text-lg leading-tight mb-1">{activePoint.title}</h4>
                                    </div>
                                    {/* Dynamic Tooltip Arrow */}
                                    <div className={`absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent ${tooltipStyles.arrow}`}></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Context Panel */}
                    <div className="mt-8 min-h-[140px] bg-black/40 rounded-sm border border-white/5 p-8 flex flex-col items-center justify-center transition-all duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>
                        
                        {activePoint ? (
                            <div className="text-center animate-fade-in-up relative z-10 w-full max-w-3xl">
                                <div className="bg-white/5 p-6 rounded-sm border-l-2 border-primary/50 relative">
                                    <span className="absolute -top-3 left-4 bg-onyx px-2 text-[9px] text-primary uppercase tracking-widest font-bold">Story Context</span>
                                    <p className="text-slate-300 font-serif italic text-lg leading-relaxed">
                                        "{activePoint.snippet}"
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="relative z-10 flex flex-col items-center opacity-50 gap-3">
                                <Activity size={40} className="text-slate-600" strokeWidth={1.5} />
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Hover or touch graph to reveal scenes</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes loadMeter {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
            `}} />
        </section>
    );
};

export default TensionHeatmap;
