
import React, { useState, useEffect, useRef } from 'react';
import { 
    Camera, Sparkles, Image as ImageIcon, Download, 
    User, Shuffle, History, Trash2, X, Palette, Scan, 
    ChevronDown, MapPin, Shirt, Move, CheckCircle2,
    Layers, Crown, Sun, Video,
    Watch, Gem, Signal, Type, Clapperboard, Focus,
    Terminal, LayoutTemplate, ChevronRight, Loader2,
    Maximize2, Grid, Circle, Film
} from 'lucide-react';
import { callGeminiImageGenerator } from '../services/geminiService';
import { 
    TOUCH_POINTS_DATA, CHARACTER_DESCRIPTIONS, 
    SCENE_SETTINGS, SCENE_MOODS, IMAGE_STYLES, ASPECT_RATIOS,
    POSITIONS_DB, WARDROBE_LOCATIONS, WARDROBE_STYLES, WARDROBE_DB,
    WARDROBE_FABRICS, WARDROBE_COLORS, WARDROBE_ACCESSORIES, POSE_INTENSITIES,
    LIGHTING_OPTIONS, CAMERA_ANGLES, TOUCH_POINT_CATEGORIES,
    LIGHTING_META, MOOD_META, WARDROBE_DESCRIPTIONS, FABRIC_META, SCENE_META,
    WARDROBE_FITS, TIMES_OF_DAY, WEATHER_CONDITIONS
} from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface GeneratedImage {
    id: string;
    url: string;
    character: string;
    mood: string;
    touchPoint: string;
    timestamp: number;
}

// --- VISUAL UI COMPONENTS ---

const VisualCard = ({ label, isActive, onClick, icon: Icon, subLabel, color, metaStyle }: any) => (
    <button
        onClick={onClick}
        className={`relative group flex flex-col items-center justify-center p-4 rounded-sm border transition-all duration-300 overflow-hidden ${isActive ? 'bg-white/10 border-primary shadow-[0_0_15px_rgba(37,150,190,0.3)]' : 'bg-[#151515] border-white/5 hover:border-white/20 hover:bg-[#1a1a1a]'}`}
    >
        {/* Optional Background Meta Style (e.g. gradient for Mood) */}
        {metaStyle && (
            <div className="absolute inset-0 opacity-10" style={metaStyle}></div>
        )}
        
        <div 
            className={`mb-3 p-3 rounded-full transition-colors relative z-10 ${isActive ? 'bg-primary text-white' : 'bg-white/5 text-slate-500 group-hover:text-slate-300'}`}
            style={color && isActive ? { backgroundColor: color, borderColor: color } : {}}
        >
            <Icon size={20} />
        </div>
        <span className={`text-[10px] uppercase font-bold tracking-widest text-center relative z-10 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
            {label}
        </span>
        {subLabel && <span className="text-[9px] text-slate-600 mt-1 font-mono relative z-10">{subLabel}</span>}
        
        {isActive && <div className="absolute top-2 right-2"><CheckCircle2 size={14} className="text-primary"/></div>}
    </button>
);

const ColorSwatch = ({ color, isActive, onClick }: any) => {
    // Map text colors to CSS values
    const colorMap: Record<string, string> = {
        "Red": "#ef4444", "Blue": "#3b82f6", "Gold": "#eab308",
        "Black": "#171717", "White": "#f5f5f5", "Green": "#22c55e",
        "Purple": "#a855f7", "Pastel Pink": "#f9a8d4"
    };
    
    return (
        <button
            onClick={onClick}
            className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center relative group ${isActive ? 'border-primary scale-110 shadow-glow' : 'border-transparent hover:scale-105'}`}
            title={color}
        >
            <div className="w-full h-full rounded-full border border-white/10" style={{ backgroundColor: colorMap[color] || '#333' }}></div>
            {isActive && <CheckCircle2 size={12} className="absolute text-white drop-shadow-md bg-black/50 rounded-full" />}
        </button>
    );
};

const TabButton = ({ isActive, onClick, children, icon: Icon, colorClass }: any) => (
    <button 
        onClick={onClick}
        className={`flex-1 py-4 px-6 rounded-sm text-xs font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 border ${isActive ? `bg-${colorClass}-500/10 border-${colorClass}-500/50 text-${colorClass}-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]` : 'bg-black/40 border-white/5 text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
    >
        {Icon && <Icon size={14} />} {children}
    </button>
);

// Enhanced Dropdown with Visual Previews and High Z-Index for Visibility
const UnifiedDropdown = ({ label, value, options, onChange, icon: Icon, placeholder = "Select...", getMeta }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Meta Helper
    const currentMeta = getMeta ? getMeta(value) : null;

    return (
        <div className={`relative w-full ${isOpen ? 'z-[100]' : 'z-10'}`} ref={dropdownRef}>
            {label && <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                {Icon && <Icon size={12} className="text-primary/70" />} {label}
            </label>}
            
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full text-left p-4 rounded-sm border transition-all flex items-center justify-between group relative ${isOpen ? 'bg-white/10 border-primary text-white shadow-lg ring-1 ring-primary/20' : 'bg-[#151515] border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/20'}`}
            >
                <div className="flex items-center gap-3 overflow-hidden flex-1">
                    {/* Visual Preview in Trigger */}
                    {currentMeta?.preview && (
                        <div 
                            className="w-4 h-4 rounded-full shadow-sm border border-white/20 shrink-0" 
                            style={currentMeta.previewStyle || {}}
                        >
                             {/* Text fallback if style is missing but text exists (e.g. icon) */}
                             {!currentMeta.previewStyle && currentMeta.preview} 
                        </div>
                    )}
                    <span className="text-sm font-medium truncate font-mono">{value || placeholder}</span>
                </div>
                <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-0 mt-1 w-full bg-[#0A0A0A] border border-white/20 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-80 overflow-y-auto custom-scrollbar ring-1 ring-white/5 z-[9999]"
                        style={{ minWidth: '100%' }}
                    >
                        {options.map((opt: string) => {
                            const meta = getMeta ? getMeta(opt) : null;
                            return (
                                <button
                                    key={opt}
                                    onClick={() => { onChange(opt); setIsOpen(false); }}
                                    className={`w-full text-left px-4 py-3 text-sm border-b border-white/5 last:border-0 hover:bg-primary/20 hover:text-white transition-colors flex items-center justify-between whitespace-normal group/opt ${value === opt ? 'text-primary font-bold bg-white/5' : 'text-slate-400'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Visual Preview in Option */}
                                        {meta?.preview && (
                                            <div 
                                                className="w-8 h-8 rounded-sm shadow-sm border border-white/10 flex items-center justify-center bg-black/20 shrink-0"
                                                style={meta.previewStyle || {}}
                                            >
                                                {!meta.previewStyle && <span className="text-lg">{meta.preview}</span>}
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <span className="leading-snug block">{opt}</span>
                                            {meta?.subtitle && (
                                                <span className="text-[10px] text-slate-500 group-hover/opt:text-white/70 block mt-0.5 font-light">{meta.subtitle}</span>
                                            )}
                                        </div>
                                    </div>
                                    {value === opt && <CheckCircle2 size={14} className="shrink-0 ml-4 text-primary" />}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- VISUAL PREVIEW BOX ---
const VisualPreviewBox = ({ type, value }: { type: 'lighting' | 'mood' | 'fabric', value: string }) => {
    let backgroundStyle = {};
    let icon = null;
    let label = "Preview";

    if (type === 'lighting') {
        backgroundStyle = { background: LIGHTING_META[value] || '#000' };
        label = "Light Temp";
        icon = <Sun size={12} className="text-white drop-shadow-md"/>;
    } else if (type === 'mood') {
        backgroundStyle = { backgroundColor: MOOD_META[value] || '#000' };
        label = "Atmosphere";
        icon = <Sparkles size={12} className="text-white drop-shadow-md"/>;
    } else if (type === 'fabric') {
         backgroundStyle = { background: FABRIC_META[value] || '#111' };
         label = "Texture";
         icon = <Layers size={12} className="text-white drop-shadow-md"/>;
    }

    return (
        <div className="w-full h-24 rounded-sm border border-white/10 relative overflow-hidden group shadow-inner">
             <div className="absolute inset-0 transition-all duration-500" style={backgroundStyle}></div>
             <div className="absolute inset-0 flex items-center justify-center">
                 {type === 'fabric' && <div className="w-12 h-12 bg-white/20 rounded-full blur-md"></div>}
             </div>
             <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-sm border border-white/5">
                 {icon}
                 <span className="text-[9px] uppercase font-bold text-white tracking-widest">{value}</span>
             </div>
        </div>
    );
};


const WardrobePanel = ({ character, settings, setSettings, color }: any) => {
    const update = (field: string, val: string) => {
        setSettings((prev: any) => {
            const newSettings = { ...prev, [field]: val };
            if (field === 'region' || field === 'style') {
                const region = newSettings.region || "India";
                const style = newSettings.style || "Traditional (Grand)";
                const regionData = WARDROBE_DB[region] || WARDROBE_DB["India"];
                const styleData = regionData[style] || regionData["Traditional (Grand)"];
                const outfits = styleData[character] || ["Standard Attire"];
                newSettings.outfit = outfits[0];
            }
            return newSettings;
        });
    };

    const safeRegion = settings.region && WARDROBE_DB[settings.region] ? settings.region : "India";
    const regionData = WARDROBE_DB[safeRegion];
    const safeStyle = settings.style && regionData[settings.style] ? settings.style : "Traditional (Grand)";
    const styleData = regionData[safeStyle];
    const outfitOptions = styleData && styleData[character] ? styleData[character] : ["Standard Attire"];
    const accessoryOptions = WARDROBE_ACCESSORIES[character as keyof typeof WARDROBE_ACCESSORIES] || ["None"];

    return (
        <div className="space-y-6 animate-fade-in relative z-0 p-1">
            <div className="grid md:grid-cols-2 gap-6">
                <UnifiedDropdown 
                    label="Region" 
                    value={settings.region} 
                    options={WARDROBE_LOCATIONS} 
                    onChange={(v: string) => update('region', v)}
                    icon={MapPin}
                />
                <UnifiedDropdown 
                    label="Style Category" 
                    value={settings.style} 
                    options={WARDROBE_STYLES} 
                    onChange={(v: string) => update('style', v)}
                    icon={Layers}
                />
            </div>
            
            <UnifiedDropdown 
                label="Specific Outfit" 
                value={settings.outfit} 
                options={outfitOptions} 
                onChange={(v: string) => update('outfit', v)}
                icon={Shirt}
                getMeta={(val: string) => ({ subtitle: WARDROBE_DESCRIPTIONS[val] || "Standard Attire" })}
            />
            
            <UnifiedDropdown 
                label="Silhouette / Fit" 
                value={settings.fit} 
                options={WARDROBE_FITS} 
                onChange={(v: string) => update('fit', v)}
                icon={Scan}
            />

            {/* Granular Detail Section - Ensure Z-Index allows dropdowns above to overflow */}
            <div className="p-6 bg-[#121212] border border-white/5 rounded-sm mt-6 relative z-0">
                <div className="flex justify-between items-center mb-4">
                    <h4 className={`text-[10px] font-bold uppercase tracking-widest ${color} opacity-80 flex items-center gap-2`}>
                        <Gem size={12} /> Fine Details
                    </h4>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Color Palette</label>
                        <div className="flex flex-wrap gap-3">
                            {WARDROBE_COLORS.map(c => (
                                <ColorSwatch key={c} color={c} isActive={settings.color === c} onClick={() => update('color', c)} />
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 items-end">
                        <div className="space-y-4">
                            <UnifiedDropdown 
                                label="Texture / Fabric" 
                                value={settings.fabric} 
                                options={WARDROBE_FABRICS} 
                                onChange={(v: string) => update('fabric', v)}
                                icon={Layers}
                            />
                        </div>
                        {/* Fabric Preview */}
                        <VisualPreviewBox type="fabric" value={settings.fabric} />
                    </div>

                    <UnifiedDropdown 
                        label="Accessory" 
                        value={settings.accessories} 
                        options={accessoryOptions} 
                        onChange={(v: string) => update('accessories', v)}
                        icon={Watch}
                    />
                </div>
            </div>
        </div>
    );
};

// --- LOADING COMPONENT ---

const TerminalLoader = () => {
    const [log, setLog] = useState<string[]>([]);
    const logs = [
        "Initializing creative matrix...",
        "Selecting lenses: 50mm Prime...",
        "Calculating ambient occlusion...",
        "Directing actors: 'Move closer'...",
        "Adjusting key lighting...",
        "Rendering textures: Silk & Skin...",
        "Applying cinematic color grading...",
        "Finalizing composition..."
    ];

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < logs.length) {
                setLog(prev => [...prev, logs[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 z-20 bg-black/95 flex flex-col items-center justify-center gap-8 backdrop-blur-xl font-mono">
            <div className="relative w-32 h-32">
                <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin duration-1000"></div>
                <div className="absolute inset-4 border-t-2 border-blush rounded-full animate-spin duration-[2s] direction-reverse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Camera size={32} className="text-white opacity-50 animate-pulse" />
                </div>
            </div>
            <div className="w-full max-w-md bg-[#0F0F0F] border border-white/10 p-6 rounded-sm shadow-2xl">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-4">
                    <Terminal size={14} className="text-primary" />
                    <span className="text-[10px] uppercase tracking-widest text-slate-500">AI Director Output</span>
                </div>
                <div className="space-y-2 h-32 overflow-hidden flex flex-col justify-end">
                    {log.map((line, idx) => (
                        <div key={idx} className="text-xs text-green-500 font-mono flex items-center gap-2 animate-fade-in">
                            <span className="opacity-50">{`>`}</span> {line}
                        </div>
                    ))}
                    <div className="w-2 h-4 bg-green-500 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

const YourDesiredMoment: React.FC = () => {
    // Helper to safely get initial outfit
    const getInitialOutfit = (char: string) => {
        try { return WARDROBE_DB["India"]["Traditional (Grand)"][char][0]; } catch (e) { return "Standard Attire"; }
    };

    // UI State
    const [activeTab, setActiveTab] = useState<"casting" | "choreography" | "cinematography">("casting");
    const [selectedCharacter, setSelectedCharacter] = useState<"Vijay" | "Meena">("Vijay");
    const [selectedTouchPoint, setSelectedTouchPoint] = useState("");

    const [activeWardrobeTab, setActiveWardrobeTab] = useState<"Vijay" | "Meena">("Vijay");
    const [vijayWardrobe, setVijayWardrobe] = useState({ 
        region: "India", style: "Traditional (Grand)", outfit: getInitialOutfit("Vijay"), fit: WARDROBE_FITS[0],
        fabric: WARDROBE_FABRICS[0], color: WARDROBE_COLORS[3], accessories: WARDROBE_ACCESSORIES.Vijay[0]
    });
    const [meenaWardrobe, setMeenaWardrobe] = useState({ 
        region: "India", style: "Traditional (Grand)", outfit: getInitialOutfit("Meena"), fit: WARDROBE_FITS[0],
        fabric: WARDROBE_FABRICS[0], color: WARDROBE_COLORS[0], accessories: WARDROBE_ACCESSORIES.Meena[0]
    });

    const [setting, setSetting] = useState(SCENE_SETTINGS[0]);
    const [mood, setMood] = useState(SCENE_MOODS[0]);
    const [time, setTime] = useState(TIMES_OF_DAY[0]);
    const [weather, setWeather] = useState(WEATHER_CONDITIONS[0]);
    const [activePoseTab, setActivePoseTab] = useState(POSITIONS_DB["Sensual Awakening"] ? "Sensual Awakening" : "Standing");
    const [position, setPosition] = useState(POSITIONS_DB["Standing"][0]);
    const [poseIntensity, setPoseIntensity] = useState(POSE_INTENSITIES[0]);
    const [lighting, setLighting] = useState(LIGHTING_OPTIONS[0]);
    const [camera, setCamera] = useState(CAMERA_ANGLES[0]);

    const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[1]); // Default 3:4 for cinematic cover
    const [style, setStyle] = useState(IMAGE_STYLES[0]);
    const [customDetails, setCustomDetails] = useState("");
    const [showWatermark, setShowWatermark] = useState(true);

    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<GeneratedImage[]>([]);
    const outputRef = useRef<HTMLDivElement>(null);

    // Initialize position when DB loads
    useEffect(() => {
        if (POSITIONS_DB[activePoseTab] && !POSITIONS_DB[activePoseTab].includes(position)) {
             setPosition(POSITIONS_DB[activePoseTab][0]);
        }
    }, [activePoseTab]);

    // Load History
    useEffect(() => {
        const savedHistory = localStorage.getItem('jasmine_knot_gallery');
        if (savedHistory) {
            try { setHistory(JSON.parse(savedHistory)); } catch (e) { console.error("Failed to parse history", e); }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('jasmine_knot_gallery', JSON.stringify(history));
    }, [history]);

    const handleGenerate = async () => {
        setIsLoading(true);

        // Scroll to output immediately
        setTimeout(() => {
             outputRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        let touchDesc = "";
        let touchLabel = "Scene";
        
        if (selectedTouchPoint) {
             const touchPointData = TOUCH_POINTS_DATA[selectedCharacter].find(t => t.id === selectedTouchPoint);
             touchDesc = touchPointData?.description || "";
             touchLabel = touchPointData?.label || "Scene";
        }

        const interactionLine = touchDesc 
            ? `- Primary Focal Interaction: ${touchDesc}. Ensure this specific physical contact is the emotional center of the image.` 
            : `- Interaction: Natural interaction suitable for the '${mood}' mood and '${position}' pose. Blend the characters' connection naturally into the scene.`;

        const promptContext = {
            vijayWardrobe,
            meenaWardrobe,
            setting,
            position,
            poseIntensity,
            mood,
            lighting,
            camera,
            style,
            interactionLine,
            customDetails,
            characterDescriptions: CHARACTER_DESCRIPTIONS,
            time, weather
        };

        const imageUrl = await callGeminiImageGenerator(promptContext, aspectRatio);
        
        if (imageUrl) {
            setGeneratedImage(imageUrl);
            const newItem: GeneratedImage = {
                id: Date.now().toString(),
                url: imageUrl,
                character: selectedCharacter,
                mood: mood,
                touchPoint: touchLabel,
                timestamp: Date.now()
            };
            setHistory(prev => [newItem, ...prev]);
        }
        setIsLoading(false);
    };

    const handleSurprise = () => {
        const randomChar = Math.random() > 0.5 ? "Vijay" : "Meena";
        const touchPoints = TOUCH_POINTS_DATA[randomChar];
        const randomTouch = Math.random() > 0.3 ? touchPoints[Math.floor(Math.random() * touchPoints.length)].id : "";
        
        setSelectedCharacter(randomChar);
        setSelectedTouchPoint(randomTouch);
        setSetting(SCENE_SETTINGS[Math.floor(Math.random() * SCENE_SETTINGS.length)]);
        setMood(SCENE_MOODS[Math.floor(Math.random() * SCENE_MOODS.length)]);
        setStyle(IMAGE_STYLES[Math.floor(Math.random() * IMAGE_STYLES.length)]);
        setTime(TIMES_OF_DAY[Math.floor(Math.random() * TIMES_OF_DAY.length)]);
        setWeather(WEATHER_CONDITIONS[Math.floor(Math.random() * WEATHER_CONDITIONS.length)]);
        
        const poseCats = Object.keys(POSITIONS_DB);
        const randomCat = poseCats[Math.floor(Math.random() * poseCats.length)];
        setActivePoseTab(randomCat);
        setPosition(POSITIONS_DB[randomCat][Math.floor(Math.random() * POSITIONS_DB[randomCat].length)]);
        setPoseIntensity(POSE_INTENSITIES[Math.floor(Math.random() * POSE_INTENSITIES.length)]);

        setLighting(LIGHTING_OPTIONS[Math.floor(Math.random() * LIGHTING_OPTIONS.length)]);
        setCamera(CAMERA_ANGLES[Math.floor(Math.random() * CAMERA_ANGLES.length)]);
    };

    const handleDownload = (url: string, filename: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const deleteHistoryItem = (id: string) => {
        setHistory(prev => prev.filter(item => item.id !== id));
        if (history.find(item => item.id === id)?.url === generatedImage) {
             const remaining = history.filter(item => item.id !== id);
             setGeneratedImage(remaining.length > 0 ? remaining[0].url : null);
        }
    };

    const handleClearGallery = () => {
        setHistory([]);
        setGeneratedImage(null);
        localStorage.removeItem('jasmine_knot_gallery');
    };

    const toggleTouchPoint = (id: string) => {
        setSelectedTouchPoint(selectedTouchPoint === id ? "" : id);
    };

    // --- SUB-UI ELEMENTS ---
    
    const StepNav = () => (
        <div className="flex border-b border-white/5 bg-[#0A0A0A]">
            {[
                { id: "casting", label: "I. Casting", icon: User },
                { id: "choreography", label: "II. Choreography", icon: Move },
                { id: "cinematography", label: "III. Cinematography", icon: Film },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-6 flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all relative ${activeTab === tab.id ? 'text-white bg-white/5' : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'}`}
                >
                    <tab.icon size={14} className={activeTab === tab.id ? "text-primary" : "opacity-50"} />
                    <span className="hidden md:inline">{tab.label}</span>
                    {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_rgba(37,150,190,0.5)]" />}
                </button>
            ))}
        </div>
    );

    return (
        <div id="visualizer" className="py-32 px-4 md:px-8 bg-[#050505] relative min-h-screen font-body border-b border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,150,190,0.15),transparent_70%)] pointer-events-none"></div>
            
            <div className="max-w-[1800px] mx-auto relative z-10 flex flex-col gap-12">
                 <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-slate-300 text-xs tracking-[0.3em] uppercase mb-8 font-bold shadow-sm backdrop-blur-md">
                        <Clapperboard size={14} className="text-primary" /> <span>Director's Studio</span>
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">Your Desired Moment</h2>
                    <p className="text-slate-400 font-light max-w-3xl mx-auto text-xl leading-relaxed mb-8">
                        Orchestrate the chemistry. Design every detail of Vijay and Meena's intimacy in our high-fidelity visual studio.
                    </p>
                    
                    {/* Randomize Only */}
                    <div className="flex justify-center mb-8">
                        <button onClick={handleSurprise} className="px-6 py-3 text-primary hover:text-white text-[10px] uppercase font-bold tracking-wider flex items-center gap-2 transition-colors border border-white/5 hover:border-white/10 rounded-sm bg-white/5 hover:bg-white/10">
                             <Shuffle size={12} /> Randomize Configuration
                        </button>
                    </div>
                </div>

                {/* --- STUDIO CONTROLS (WIZARD) --- */}
                <div className="bg-[#0c0c0c] border border-white/5 rounded-lg shadow-2xl relative min-h-[600px] flex flex-col max-w-[1600px] mx-auto w-full">
                    <StepNav />

                    <div className="p-8 md:p-12 flex-1 relative">
                        <AnimatePresence mode="wait">
                            {/* STEP 1: CASTING */}
                            {activeTab === "casting" && (
                                <motion.div 
                                    key="casting"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid xl:grid-cols-2 gap-16"
                                >
                                     {/* Left: Focal Point */}
                                     <div className="space-y-8">
                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 border-b border-white/5 pb-2">
                                            <Focus size={14} /> Subject Focus
                                        </h4>
                                        <div className="flex gap-4">
                                            <TabButton isActive={selectedCharacter === "Vijay"} onClick={() => { setSelectedCharacter("Vijay"); setSelectedTouchPoint(""); }} icon={User} colorClass="blue">Vijay</TabButton>
                                            <TabButton isActive={selectedCharacter === "Meena"} onClick={() => { setSelectedCharacter("Meena"); setSelectedTouchPoint(""); }} icon={User} colorClass="pink">Meena</TabButton>
                                        </div>

                                        <div className="relative">
                                            <div className="flex justify-between items-center mb-4">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Touch Point (Optional)</label>
                                                {selectedTouchPoint && (
                                                    <button onClick={() => setSelectedTouchPoint("")} className="text-[10px] uppercase text-red-400 hover:text-white flex items-center gap-1 transition-colors">
                                                        <X size={10} /> Clear
                                                    </button>
                                                )}
                                            </div>
                                            
                                            {/* Scrollable List for Touch Points */}
                                            <div className="bg-[#121212] border border-white/5 rounded-sm max-h-[450px] overflow-y-auto custom-scrollbar shadow-inner">
                                                {Object.entries(TOUCH_POINT_CATEGORIES).map(([catKey, catLabel]) => {
                                                    const points = TOUCH_POINTS_DATA[selectedCharacter].filter(p => p.category === catKey);
                                                    if (points.length === 0) return null;
                                                    return (
                                                        <div key={catKey}>
                                                            <div className="px-5 py-3 bg-[#181818] text-[9px] uppercase font-bold tracking-widest text-primary/70 sticky top-0 backdrop-blur-md border-b border-white/5 z-10">{catLabel}</div>
                                                            {points.map(tp => (
                                                                <button
                                                                    key={tp.id}
                                                                    onClick={() => toggleTouchPoint(tp.id)}
                                                                    className={`w-full text-left px-6 py-4 text-sm transition-all flex flex-col gap-1.5 border-b border-white/5 last:border-0 hover:bg-white/5 ${selectedTouchPoint === tp.id ? 'bg-primary/10 border-l-4 border-l-primary pl-5' : 'text-slate-400 border-l-4 border-transparent'}`}
                                                                >
                                                                    <div className="flex justify-between items-center">
                                                                        <span className={`font-bold tracking-wide ${selectedTouchPoint === tp.id ? 'text-white' : 'text-slate-300'}`}>{tp.label}</span>
                                                                        {selectedTouchPoint === tp.id && <CheckCircle2 size={14} className="text-primary"/>}
                                                                    </div>
                                                                    <span className="text-xs opacity-60 font-light tracking-wide">{tp.description}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                     </div>

                                     {/* Right: Wardrobe */}
                                     <div className="space-y-8 relative z-10">
                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 border-b border-white/5 pb-2">
                                            <Crown size={14} /> Wardrobe Department
                                        </h4>
                                        <div className="flex gap-4">
                                            <TabButton isActive={activeWardrobeTab === "Vijay"} onClick={() => setActiveWardrobeTab("Vijay")} icon={Shirt} colorClass="blue">Vijay</TabButton>
                                            <TabButton isActive={activeWardrobeTab === "Meena"} onClick={() => setActiveWardrobeTab("Meena")} icon={Shirt} colorClass="pink">Meena</TabButton>
                                        </div>
                                        <AnimatePresence mode="wait">
                                            <motion.div 
                                                key={activeWardrobeTab} 
                                                initial={{ opacity: 0, y: 10 }} 
                                                animate={{ opacity: 1, y: 0 }} 
                                                exit={{ opacity: 0, y: 10 }}
                                            >
                                                {activeWardrobeTab === "Vijay" ? (
                                                    <WardrobePanel character="Vijay" settings={vijayWardrobe} setSettings={setVijayWardrobe} color="text-blue-400"/>
                                                ) : (
                                                    <WardrobePanel character="Meena" settings={meenaWardrobe} setSettings={setMeenaWardrobe} color="text-pink-400"/>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                     </div>
                                </motion.div>
                            )}

                            {/* STEP 2: CHOREOGRAPHY */}
                            {activeTab === "choreography" && (
                                <motion.div 
                                    key="choreography"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid lg:grid-cols-12 gap-16"
                                >
                                     {/* Left Column: Posture */}
                                     <div className="lg:col-span-6 space-y-8 relative z-10">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] block flex items-center gap-2 border-b border-white/5 pb-2">
                                            <Move size={12}/> Intimate Position
                                        </label>
                                        {/* Category Tabs */}
                                        <div className="flex flex-wrap gap-2 bg-[#151515] p-2 rounded-sm border border-white/5 mb-4">
                                            {Object.keys(POSITIONS_DB).map(cat => (
                                                <button 
                                                    key={cat}
                                                    onClick={() => { setActivePoseTab(cat); setPosition(POSITIONS_DB[cat][0]); }}
                                                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap rounded-sm transition-colors border ${activePoseTab === cat ? 'bg-white/10 border-primary text-primary' : 'border-transparent text-slate-500 hover:text-white hover:border-white/10'}`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                        
                                        {/* Visual Grid for Poses (Replaces simple dropdown) */}
                                        <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar p-1">
                                            {POSITIONS_DB[activePoseTab].map(pose => (
                                                <VisualCard 
                                                    key={pose}
                                                    label={pose}
                                                    isActive={position === pose}
                                                    onClick={() => setPosition(pose)}
                                                    icon={User}
                                                />
                                            ))}
                                        </div>

                                        <UnifiedDropdown label="Pose Intensity" value={poseIntensity} options={POSE_INTENSITIES} onChange={setPoseIntensity} icon={Signal} />
                                    </div>

                                    {/* Right Column: Setting & Mood */}
                                    <div className="lg:col-span-6 space-y-8 relative z-0">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] block flex items-center gap-2 border-b border-white/5 pb-2">
                                            <LayoutTemplate size={12}/> Environment
                                        </label>
                                        
                                        {/* Visual Mood Selector */}
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Atmosphere & Mood</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {SCENE_MOODS.slice(0, 6).map(m => (
                                                    <VisualCard 
                                                        key={m} 
                                                        label={m} 
                                                        isActive={mood === m} 
                                                        onClick={() => setMood(m)} 
                                                        icon={Sparkles} 
                                                        color={MOOD_META[m]}
                                                        metaStyle={{ backgroundColor: MOOD_META[m] }}
                                                    />
                                                ))}
                                                {/* Fallback for others */}
                                                <div className="col-span-3">
                                                    <UnifiedDropdown 
                                                        value={mood} 
                                                        options={SCENE_MOODS} 
                                                        onChange={setMood} 
                                                        placeholder="More Moods..." 
                                                        getMeta={(val: string) => ({ preview: '', previewStyle: { backgroundColor: MOOD_META[val] } })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                             <UnifiedDropdown 
                                                 label="Location" 
                                                 value={setting} 
                                                 options={SCENE_SETTINGS} 
                                                 onChange={setSetting} 
                                                 icon={MapPin} 
                                                 getMeta={(val: string) => ({ preview: SCENE_META[val]?.icon, subtitle: SCENE_META[val]?.desc })}
                                             />
                                             
                                             <div className="space-y-4">
                                                 <UnifiedDropdown 
                                                     label="Lighting" 
                                                     value={lighting} 
                                                     options={LIGHTING_OPTIONS} 
                                                     onChange={setLighting} 
                                                     icon={Sun} 
                                                     getMeta={(val: string) => ({ preview: '', previewStyle: { background: LIGHTING_META[val] } })}
                                                 />
                                                 {/* Live Lighting Preview */}
                                                 <VisualPreviewBox type="lighting" value={lighting} />
                                             </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <UnifiedDropdown label="Time of Day" value={time} options={TIMES_OF_DAY} onChange={setTime} icon={Watch} />
                                            <UnifiedDropdown label="Weather" value={weather} options={WEATHER_CONDITIONS} onChange={setWeather} icon={Layers} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: CINEMATOGRAPHY */}
                            {activeTab === "cinematography" && (
                                <motion.div 
                                    key="cinematography"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid lg:grid-cols-3 gap-12"
                                >
                                    {/* Visual Style Selector */}
                                    <div className="space-y-6 relative z-10">
                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 border-b border-white/5 pb-2"><Palette size={14}/> Visual Style</h4>
                                        <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar p-1">
                                            {IMAGE_STYLES.map(s => (
                                                <VisualCard 
                                                    key={s} 
                                                    label={s.split(' ')[0]} 
                                                    subLabel={s.split(' ').slice(1).join(' ')}
                                                    isActive={style === s} 
                                                    onClick={() => setStyle(s)} 
                                                    icon={Palette} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-8 relative z-0">
                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 border-b border-white/5 pb-2"><Camera size={14}/> Camera Work</h4>
                                        
                                        <UnifiedDropdown label="Camera Shot" value={camera} options={CAMERA_ANGLES} onChange={setCamera} icon={Video} />
                                        
                                        {/* Visual Aspect Ratio */}
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block flex items-center gap-2"><Scan size={12} /> Aspect Ratio</label>
                                            <div className="flex flex-wrap gap-4">
                                                {ASPECT_RATIOS.map(r => (
                                                    <button 
                                                        key={r} 
                                                        onClick={() => setAspectRatio(r)} 
                                                        className={`flex-1 min-w-[80px] py-6 flex flex-col items-center justify-center rounded-sm border transition-colors ${aspectRatio === r ? 'bg-primary/20 border-primary text-white shadow-glow' : 'bg-[#151515] border-white/5 text-slate-500 hover:border-white/20'}`}
                                                    >
                                                        <div className={`border-2 mb-2 ${r === '1:1' ? 'w-6 h-6' : r === '16:9' ? 'w-8 h-4.5' : 'w-4.5 h-8'} ${aspectRatio === r ? 'border-primary bg-primary/20' : 'border-slate-600'}`}></div>
                                                        <span className="text-[10px] font-bold">{r}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-[#151515] border border-white/5 rounded-sm">
                                            <input 
                                                type="checkbox" 
                                                id="watermark-toggle"
                                                checked={showWatermark}
                                                onChange={(e) => setShowWatermark(e.target.checked)}
                                                className="w-4 h-4 bg-black border border-white/20 rounded accent-primary cursor-pointer"
                                            />
                                            <label htmlFor="watermark-toggle" className="text-xs text-slate-300 font-bold uppercase tracking-wider cursor-pointer select-none flex items-center gap-2">
                                                <Type size={12} /> Show Title Watermark
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 border-b border-white/5 pb-2 mb-4"><Clapperboard size={14}/> Director's Notes</h4>
                                        <textarea 
                                            value={customDetails} 
                                            onChange={(e) => setCustomDetails(e.target.value)} 
                                            placeholder="Add specific details like 'Red petals', 'Raining', 'Soft focus'..." 
                                            className="w-full bg-[#151515] border border-white/5 p-4 rounded-sm text-white outline-none focus:border-primary transition-colors text-sm resize-none h-48 placeholder:text-slate-600 font-body leading-relaxed"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* STICKY FOOTER / ACTION BAR - Adjusted Z-Index to prevent covering open dropdowns */}
                    <div className="bg-[#080808] border-t border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6 sticky bottom-0 z-40">
                        <div className="hidden md:flex flex-col gap-1 text-xs text-slate-500 font-mono">
                            <div><span className="text-primary uppercase tracking-widest font-bold">Config:</span> {activePoseTab} • {mood}</div>
                            <div><span className="text-primary uppercase tracking-widest font-bold">Focus:</span> {selectedCharacter} {selectedTouchPoint ? `• ${selectedTouchPoint}` : ''}</div>
                        </div>
                        
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            {activeTab !== "casting" && (
                                <button onClick={() => setActiveTab(prev => prev === "cinematography" ? "choreography" : "casting")} className="px-6 py-4 border border-white/10 hover:bg-white/5 text-slate-400 rounded-sm font-bold uppercase text-xs tracking-widest">Back</button>
                            )}
                            
                            {activeTab !== "cinematography" ? (
                                <button onClick={() => setActiveTab(prev => prev === "casting" ? "choreography" : "cinematography")} className="flex-1 md:flex-none px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-sm font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2">
                                    Next Step <ChevronRight size={14} />
                                </button>
                            ) : (
                                <button 
                                    onClick={handleGenerate} 
                                    disabled={isLoading} 
                                    className="flex-1 md:flex-none group relative px-16 py-4 bg-white text-black hover:bg-slate-200 rounded-sm font-bold uppercase text-sm tracking-[0.3em] transition-all flex items-center justify-center gap-4 shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-70 disabled:cursor-wait hover:-translate-y-1 hover:scale-105 overflow-hidden"
                                >
                                    {isLoading ? (
                                        <><Loader2 className="animate-spin" size={20} /> DEVELOPING...</>
                                    ) : (
                                        <>
                                            <Sparkles size={20} className="group-hover:rotate-12 transition-transform"/> VISUALIZE SCENE
                                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- OUTPUT THEATER (THE STAGE) --- */}
                <div ref={outputRef} className="scroll-mt-32 relative z-0">
                     <div className="bg-[#080808] border-t-8 border-b-8 border-x-[1px] border-x-white/5 border-y-black shadow-[0_0_100px_rgba(0,0,0,1)] rounded-sm p-4 md:p-12 flex items-center justify-center min-h-[600px] md:min-h-[800px] relative overflow-hidden group">
                         
                         {/* Cinema Screen Glow */}
                         <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-10 pointer-events-none"></div>
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md"></div>

                        {isLoading && <TerminalLoader />}

                        {generatedImage ? (
                            <div className="relative w-full h-full flex flex-col items-center justify-center animate-fade-in group/image z-0">
                                <div className="relative bg-black shadow-2xl">
                                    <img src={generatedImage} alt="Generated Moment" className="max-h-[85vh] w-auto object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)]" />
                                    {/* Watermark */}
                                    {showWatermark && (
                                        <div className="absolute bottom-6 right-6 opacity-60 text-[10px] uppercase tracking-[0.3em] text-white/70 font-bold drop-shadow-lg pointer-events-none font-display">The Jasmine Knot</div>
                                    )}
                                </div>
                                
                                <div className="absolute bottom-10 right-10 flex gap-4 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 z-30">
                                    <button onClick={() => handleDownload(generatedImage!, `JasmineKnot-${selectedCharacter}-${Date.now()}.png`)} className="p-4 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-primary hover:border-primary transition-all shadow-lg hover:scale-110 group/btn" title="Download">
                                        <Download size={24} className="group-hover/btn:animate-bounce" />
                                    </button>
                                    <button onClick={() => { const currentItem = history.find(item => item.url === generatedImage); if (currentItem) deleteHistoryItem(currentItem.id); }} className="p-4 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-lg hover:scale-110" title="Delete">
                                        <Trash2 size={24} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            !isLoading && (
                                <div className="flex flex-col items-center justify-center text-slate-700 gap-8 opacity-40 z-0">
                                    <div className="w-40 h-40 border border-white/5 flex items-center justify-center bg-black/40 rotate-3 rounded-sm"><ImageIcon size={64} strokeWidth={0.5} /></div>
                                    <div className="text-center">
                                        <p className="font-display text-4xl tracking-widest text-slate-600 mb-4">Screen Empty</p>
                                        <p className="text-sm font-light uppercase tracking-[0.3em]">Awaiting Director's Input</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    {/* FILM STRIP GALLERY */}
                    {history.length > 0 && (
                        <div className="bg-[#121212] border-t border-white/10 p-8 animate-fade-in-up">
                            <div className="flex justify-between items-center mb-6 text-slate-500">
                                <div className="flex items-center gap-3">
                                    <History size={16} />
                                    <span className="text-xs uppercase tracking-[0.25em] font-bold text-slate-400">Production Gallery</span>
                                </div>
                                <button onClick={handleClearGallery} className="text-[10px] uppercase tracking-widest hover:text-red-400 transition-colors flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-full border border-transparent hover:border-white/10">
                                    <X size={12} /> Clear Reels
                                </button>
                            </div>
                            <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
                                {history.map((item) => (
                                    <div key={item.id} className="relative group shrink-0 w-40 flex flex-col gap-2">
                                        <div className={`w-40 h-40 bg-black rounded-sm overflow-hidden border-2 cursor-pointer transition-all duration-300 ${generatedImage === item.url ? 'border-primary shadow-[0_0_20px_rgba(37,150,190,0.4)] scale-105' : 'border-white/10 hover:border-white/50 opacity-70 hover:opacity-100'}`} onClick={() => setGeneratedImage(item.url)}>
                                            <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-[9px] uppercase tracking-wider text-center text-slate-600 truncate">{item.mood}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YourDesiredMoment;
