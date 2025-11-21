

import React, { useState, useMemo, useCallback } from 'react';
import { Activity, Flame, Lock, Unlock } from 'lucide-react';
import { TENSION_DATA } from '../constants';

// --- Component Constants ---
const SVG_WIDTH = 800;
const SVG_HEIGHT = 300;
const PADDING = 40;
const MAX_Y_VALUE = 100;

/**
 * A memoized component for rendering individual data points on the graph.
 * This prevents the entire complex SVG chart from re-rendering when the user
 * simply hovers over a single point, significantly improving performance.
 */
const MemoizedGraphPoint = React.memo(({ d, i, isActive, getX, getY, onPointHover }: any) => (
    <g 
        onMouseEnter={() => onPointHover(d)} 
        onClick={() => onPointHover(d)}
        className="cursor-pointer group/point"
    >
        {/* Invisible larger touch target for easier hovering on mobile/desktop */}
        <circle cx={getX(i)} cy={getY(d.tension)} r="24" fill="transparent" />
        
        {/* Active Halo Effect */}
        <circle 
            cx={getX(i)} 
            cy={getY(d.tension)} 
            r={isActive ? "12" : "0"} 
            fill="rgba(244, 194, 194, 0.3)" 
            className="transition-all duration-300"
        />

        {/* Visible Point */}
        <circle 
            cx={getX(i)} 
            cy={getY(d.tension)} 
            r="6" 
            fill={isActive ? "#F4C2C2" : "#0F0F0F"} 
            stroke={d.tension > 80 ? "#F4C2C2" : "#2596be"} 
            strokeWidth="2" 
            className={`transition-all duration-300 ${isActive ? 'scale-125 stroke-white' : 'group-hover/point:scale-125 group-hover/point:fill-white'}`} 
        />
    </g>
));
MemoizedGraphPoint.displayName = 'MemoizedGraphPoint';

const TensionHeatmap: React.FC = () => {
    const [activePoint, setActivePoint] = useState<typeof TENSION_DATA[0] | null>(null);

    // useCallback ensures the function reference is stable, which is crucial for
    // passing it as a prop to the memoized child component `MemoizedGraphPoint`.
    const handlePointHover = useCallback((point: typeof TENSION_DATA[0]) => {
        setActivePoint(point);
    }, []);

    // useMemo prevents expensive SVG path calculations on every single render.
    // The path strings are calculated only once, or when dependencies change (which they don't).
    const { getX, getY, tensionLinePath, tensionAreaPath } = useMemo(() => {
        // Helper function to map a data point's index to an X-coordinate.
        const getX = (index: number) => PADDING + (index / (TENSION_DATA.length - 1)) * (SVG_WIDTH - 2 * PADDING);
        
        // Helper function to map a tension value to a Y-coordinate (inverted for SVG).
        const getY = (val: number) => SVG_HEIGHT - PADDING - (val / MAX_Y_VALUE) * (SVG_HEIGHT - 2 * PADDING);

        const svgPoints = TENSION_DATA.map((d, i) => `${getX(i)},${getY(d.tension)}`).join(" ");
        const svgAreaPoints = `${getX(0)},${SVG_HEIGHT} ${svgPoints} ${getX(TENSION_DATA.length - 1)},${SVG_HEIGHT}`;
        
        return { getX, getY, tensionLinePath: svgPoints, tensionAreaPath: svgAreaPoints };
    }, []);


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
                <div className="mb-12 max-w-2xl mx-auto bg-onyx p-6 rounded-sm border border-white/5 shadow-lg relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-2 opacity-10">
                         <Flame size={40} className="text-white" />
                     </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-4">
                        <span className="flex items-center gap-2"><Lock size={10}/> Pact Integrity</span>
                        <span className="text-blush flex items-center gap-2">Desire <Unlock size={10}/></span>
                    </div>
                    <div className="h-4 bg-black rounded-full overflow-hidden relative border border-white/10">
                         <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-blush w-full transform origin-left scale-x-0 animate-[loadMeter_2.5s_ease-out_forwards]"></div>
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20"></div>
                    </div>
                    <div className="flex justify-between mt-3 font-display text-xl text-white">
                        <span className="text-primary">Control: {activePoint ? activePoint.pactIntegrity : 100}%</span>
                        <span className="text-blush">{activePoint ? activePoint.tension : 0}% Tension</span>
                    </div>
                </div>

                {/* The Graph */}
                <div className="relative bg-onyx border border-white/10 rounded-sm p-8 md:p-12 shadow-2xl overflow-hidden group">
                    <div className="w-full overflow-x-auto custom-scrollbar pb-4">
                        <div className="min-w-[800px]">
                            <svg width="100%" height="100%" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="overflow-visible">
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

                                {[0, 25, 50, 75, 100].map(val => (
                                    <line key={val} x1={PADDING} y1={getY(val)} x2={SVG_WIDTH - PADDING} y2={getY(val)} stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
                                ))}

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
                        </div>
                    </div>

                    {/* Tooltip / Detail View */}
                    <div className="mt-8 min-h-[180px] bg-black/40 rounded-sm border border-white/5 p-8 flex flex-col items-center justify-center transition-all duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>
                        
                        {activePoint ? (
                            <div className="text-center animate-fade-in-up relative z-10 w-full max-w-3xl">
                                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                                     <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-300 border border-white/5">Chapter {activePoint.chapter}</span>
                                     <div className="hidden md:block h-px w-8 bg-white/20"></div>
                                     <span className={`text-[10px] font-bold uppercase tracking-widest ${activePoint.tension > 80 ? 'text-blush' : 'text-primary'}`}>
                                        {activePoint.tension > 80 ? "Spicy Level: High" : "Spicy Level: Simmering"}
                                     </span>
                                </div>
                                <h3 className="text-3xl text-white font-display mb-4 tracking-wide drop-shadow-lg">{activePoint.title}</h3>
                                <div className="bg-white/5 p-6 rounded-sm border-l-2 border-primary/50 mb-6">
                                    <p className="text-slate-300 font-serif italic text-lg leading-relaxed">
                                        "{activePoint.snippet}"
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-4">
                                    <div className="space-y-2">
                                        <div className="text-[9px] uppercase tracking-wider text-slate-500">Pact Integrity</div>
                                        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                                            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${activePoint.pactIntegrity}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-[9px] uppercase tracking-wider text-slate-500">Romantic Tension</div>
                                        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                                            <div className="h-full bg-blush transition-all duration-500" style={{ width: `${activePoint.tension}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative z-10 flex flex-col items-center opacity-50 gap-3">
                                <Activity size={40} className="text-slate-600" strokeWidth={1.5} />
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Hover over points to analyze moments</p>
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
