
import React, { useState, useEffect, useRef } from 'react';
import { 
    Camera, Sparkles, Image as ImageIcon, Download, 
    User, Shuffle, History, Trash2, X, Palette, Scan, 
    ChevronDown, MapPin, Shirt, Move, CheckCircle2,
    Layers, Sun, Video,
    Watch, Gem, Signal, Clapperboard, Focus,
    Terminal, LayoutTemplate, ChevronRight, Loader2,
    Maximize2, Film, Repeat,
    ChevronUp, AlertCircle
} from 'lucide-react';
import { callGeminiImageGenerator } from '../services/geminiService';
import { 
    TOUCH_POINTS_DATA, CHARACTER_DESCRIPTIONS, 
    SCENE_SETTINGS, SCENE_MOODS, IMAGE_STYLES, ASPECT_RATIOS,
    POSITIONS_DB, WARDROBE_LOCATIONS, WARDROBE_STYLES, WARDROBE_DB,
    WARDROBE_FABRICS, WARDROBE_COLORS, WARDROBE_ACCESSORIES, POSE_INTENSITIES,
    LIGHTING_OPTIONS, CAMERA_ANGLES, TOUCH_POINT_CATEGORIES,
    LIGHTING_META, MOOD_META, WARDROBE_DESCRIPTIONS, FABRIC_META, SCENE_META,
    WARDROBE_FITS, TIMES_OF_DAY, WEATHER_CONDITIONS, SCENE_PRESETS
} from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface GeneratedImage {
    id: string;
    url: string;
    character: string;
    mood: string;
    touchPoint: string;
    timestamp: number;
    config: {
        vijayWardrobe: any;
        meenaWardrobe: any;
        setting: string;
        position: string;
        poseIntensity: string;
        mood: string;
        lighting: string;
        camera: string;
        style: string;
        time: string;
        weather: string;
        selectedCharacter: string;
        selectedTouchPoint: string;
        activePoseTab: string;
    }; 
}

const PresetCard = ({ preset, onClick, isActive, isApplying }: any) => {
    const settingKey = preset.config.setting;
    const meta = SCENE_META[settingKey] || { icon: "🎬", desc: "" };
    
    return (
        <button
            onClick={onClick}
            disabled={isApplying}
            className={`group relative w-full h-full rounded-sm p-3 text-left flex flex-col gap-2 transition-all duration-300 hover:-translate-y-1 shadow-lg border overflow-hidden ${isActive ? 'bg-white/10 border-primary ring-1 ring-primary/50 shadow-[0_0_20px_rgba(37,150,190,0.2)]' : 'bg-[#151515] hover:bg-[#1a1a1a] border-white/5 hover:border-primary/40 hover:shadow-primary/10'}`}
        >
            {isApplying && (
                <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                    <Loader2 className="animate-spin text-primary" size={20} />
                </div>
            )}

            <div className="flex justify-between items-start w-full border-b border-white/5 pb-2 mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider truncate max-w-[80%] transition-colors ${isActive ? 'text-white' : 'text-primary group-hover:text-white'}`}>
                    {preset.label}
                </span>
                <span className={`text-lg transition-all filter ${isActive ? 'scale-110 grayscale-0 opacity-100' : 'opacity-50 group-hover:opacity-100 group-hover:scale-110 grayscale group-hover:grayscale-0'}`}>
                    {meta.icon}
                </span>
            </div>
            
            <p className={`text-[9px] leading-relaxed line-clamp-2 font-light h-7 ${isActive ? 'text-slate-200' : 'text-slate-500 group-hover:text-slate-400'}`}>
                {preset.desc}
            </p>
            
            {isActive && !isApplying && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(37,150,190,0.8)]"></div>
            )}
        </button>
    );
};

const VisualCard = ({ label, isActive, onClick, icon: Icon, subLabel, color, metaStyle }: any) => (
    <button
        onClick={onClick}
        className={`relative group flex flex-col items-center justify-center p-4 rounded-sm border transition-all duration-300 overflow-hidden ${isActive ? 'bg-white/10 border-primary shadow-[0_0_15px_rgba(37,150,190,0.3)]' : 'bg-[#151515] border-white/5 hover:border-white/20 hover:bg-[#1a1a1a]'}`}
    >
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
                    {currentMeta?.preview && (
                        <div 
                            className="w-4 h-4 rounded-full shadow-sm border border-white/20 shrink-0" 
                            style={currentMeta.previewStyle || {}}
                        >
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
                                    className={`w-full text-left px-4 py-3 text-sm border-b border-white/5 last:border-0 hover:bg-primary/20 hover:text-white transition-colors flex items-center justify-center whitespace-normal group/opt ${value === opt ? 'text-primary font-bold bg-white/5' : 'text-slate-400'}`}
                                >
                                    <div className="flex items-center gap-3 w-full">
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

const VisualPreviewBox = ({ type, value }: { type: 'lighting' | 'mood' | 'fabric', value: string }) => {
    let backgroundStyle = {};
    let icon = null;

    if (type === 'lighting') {
        backgroundStyle = { background: LIGHTING_META[value] || '#000' };
        icon = <Sun size={12} className="text-white drop-shadow-md"/>;
    } else if (type === 'mood') {
        backgroundStyle = { backgroundColor: MOOD_META[value] || '#000' };
        icon = <Sparkles size={12} className="text-white drop-shadow-md"/>;
    } else if (type === 'fabric') {
         backgroundStyle = { background: FABRIC_META[value] || '#111' };
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

const AtmosphericOverlay = ({ weather }: { weather: string }) => {
    if (!weather || weather === "Clear Sky") return null;

    const isRainy = weather.includes("Rain") || weather.includes("Drizzle") || weather === "Stormy";
    const isFoggy = weather.includes("Fog") || weather.includes("Hazy") || weather.includes("Humid");
    const isStormy = weather === "Stormy";

    return (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {isRainy && (
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4))',
                        backgroundSize: '1px 15px',
                        animation: 'rain 0.3s linear infinite'
                    }}
                />
            )}
            
            {isFoggy && (
                 <div className="absolute inset-0 bg-white/5 blur-xl"></div>
            )}

            {isStormy && (
                 <div className="absolute inset-0 bg-indigo-500/10 animate-pulse mix-blend-overlay"></div>
            )}
        </div>
    );
};

// --- MAIN COMPONENT ---

const YourDesiredMoment: React.FC = () => {
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

    const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[1]);
    const [style, setStyle] = useState(IMAGE_STYLES[0]);
    const [customDetails, setCustomDetails] = useState("");

    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [generationError, setGenerationError] = useState("");
    const [history, setHistory] = useState<GeneratedImage[]>([]);
    const outputRef = useRef<HTMLDivElement>(null);
    const visualizerBtnRef = useRef<HTMLButtonElement>(null);
    
    const [showAllPresets, setShowAllPresets] = useState(false);
    const [activePresetId, setActivePresetId] = useState<string | null>(null);
    const [applyingPresetId, setApplyingPresetId] = useState<string | null>(null);

    useEffect(() => {
        const savedHistory = localStorage.getItem('jasmine_knot_gallery');
        if (savedHistory) {
            try { 
                const parsed = JSON.parse(savedHistory);
                if (Array.isArray(parsed)) {
                    setHistory(parsed as GeneratedImage[]);
                }
            } catch (e) { console.error("Failed to parse history", e); }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('jasmine_knot_gallery', JSON.stringify(history));
    }, [history]);

    const handleGenerate = async () => {
        setIsLoading(true);
        setGenerationError("");

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
                timestamp: Date.now(),
                config: {
                    vijayWardrobe, meenaWardrobe, setting, position, poseIntensity,
                    mood, lighting, camera, style, time, weather,
                    selectedCharacter, selectedTouchPoint, activePoseTab
                }
            };
            setHistory(prev => [newItem, ...prev]);
        } else {
            setGenerationError("Failed to develop image. Please try again.");
        }
        setIsLoading(false);
    };

    const handleLoadConfig = (config: any) => {
        if (!config) return;
        setVijayWardrobe(config.vijayWardrobe);
        setMeenaWardrobe(config.meenaWardrobe);
        setSetting(config.setting);
        setPosition(config.position);
        setPoseIntensity(config.poseIntensity);
        setMood(config.mood);
        setLighting(config.lighting);
        setCamera(config.camera);
        setStyle(config.style);
        setTime(config.time);
        setWeather(config.weather);
        setSelectedCharacter(config.selectedCharacter);
        setSelectedTouchPoint(config.selectedTouchPoint);
        setActivePoseTab(config.activePoseTab);
        
        setActivePresetId(null); 
        
        const editor = document.getElementById('visualizer');
        editor?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleApplyPreset = (preset: any) => {
        setApplyingPresetId(preset.id);
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            const c = preset.config;
            setSetting(c.setting);
            setMood(c.mood);
            setTime(c.time);
            setWeather(c.weather);
            setActivePoseTab(c.poseCat);
            setPosition(c.position);
            setPoseIntensity(c.intensity);
            setLighting(c.lighting);
            setStyle(c.style);
            setVijayWardrobe(prev => ({ ...prev, outfit: c.vijay.outfit, color: c.vijay.color, style: c.vijay.style }));
            setMeenaWardrobe(prev => ({ ...prev, outfit: c.meena.outfit, color: c.meena.color, style: c.meena.style }));
            setSelectedCharacter(c.char);
            setSelectedTouchPoint(c.touch);
            
            setActivePresetId(preset.id);
            setApplyingPresetId(null);
            
            if (visualizerBtnRef.current) {
                visualizerBtnRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
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
        
        setActivePresetId(null); 
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
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes rain {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 100%; }
                }
            `}} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,150,190,0.15),transparent_70%)] pointer-events-none"></div>
            
            <div className="max-w-[1800px] mx-auto relative z-10 flex flex-col gap-8">
                 <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-slate-300 text-xs tracking-[0.3em] uppercase mb-8 font-bold shadow-sm backdrop-blur-md">
                        <Clapperboard size={14} className="text-primary" /> <span>Director's Studio</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-6xl text-white mb-4">Your Desired Moment</h2>
                    <p className="text-slate-400 font-light max-w-xl mx-auto text-lg">
                        Visualize the unwritten scenes. You are the director.
                    </p>
                </div>

                {/* Quick Sets (Presets) */}
                <div className="mb-8 relative group/presets">
                    <div className="flex justify-between items-end mb-4 px-2">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Scene Presets</h3>
                        <button onClick={() => setShowAllPresets(!showAllPresets)} className="text-[10px] uppercase tracking-widest text-primary hover:text-white transition-colors">
                            {showAllPresets ? "Show Less" : "View All"}
                        </button>
                    </div>
                    <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 transition-all duration-500 ${showAllPresets ? 'max-h-[1000px]' : 'max-h-[240px] overflow-hidden'}`}>
                        {SCENE_PRESETS.map((preset) => (
                            <PresetCard 
                                key={preset.id} 
                                preset={preset} 
                                isActive={activePresetId === preset.id}
                                isApplying={applyingPresetId === preset.id}
                                onClick={() => handleApplyPreset(preset)} 
                            />
                        ))}
                    </div>
                    {!showAllPresets && <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                    
                    {/* --- LEFT COLUMN: CONTROLS --- */}
                    <div className="xl:col-span-5 flex flex-col gap-0 bg-onyx border border-white/10 rounded-sm shadow-2xl overflow-hidden relative h-full min-h-[600px]">
                        <StepNav />
                        
                        <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar max-h-[800px] relative bg-[#0F0F0F]">
                            <AnimatePresence mode="wait">
                                {activeTab === "casting" && (
                                    <motion.div key="casting" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                                        {/* Wardrobe Toggle */}
                                        <div className="flex bg-black/40 p-1 rounded-sm border border-white/5">
                                            <button onClick={() => setActiveWardrobeTab("Vijay")} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${activeWardrobeTab === "Vijay" ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}>Vijay's Wardrobe</button>
                                            <button onClick={() => setActiveWardrobeTab("Meena")} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${activeWardrobeTab === "Meena" ? 'bg-blush text-black shadow-md' : 'text-slate-500 hover:text-slate-300'}`}>Meena's Wardrobe</button>
                                        </div>

                                        <WardrobePanel 
                                            character={activeWardrobeTab} 
                                            settings={activeWardrobeTab === "Vijay" ? vijayWardrobe : meenaWardrobe}
                                            setSettings={activeWardrobeTab === "Vijay" ? setVijayWardrobe : setMeenaWardrobe}
                                            color={activeWardrobeTab === "Vijay" ? "text-primary" : "text-blush"}
                                        />
                                    </motion.div>
                                )}

                                {activeTab === "choreography" && (
                                    <motion.div key="choreography" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                                        
                                        {/* Atmosphere Section */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <UnifiedDropdown label="Location" value={setting} options={SCENE_SETTINGS} onChange={setSetting} icon={MapPin} getMeta={(v: string) => ({ preview: SCENE_META[v]?.icon })} />
                                            <UnifiedDropdown label="Mood" value={mood} options={SCENE_MOODS} onChange={setMood} icon={Sparkles} getMeta={(v: string) => ({ previewStyle: { backgroundColor: MOOD_META[v] }})} />
                                            <UnifiedDropdown label="Time of Day" value={time} options={TIMES_OF_DAY} onChange={setTime} icon={Watch} />
                                            <UnifiedDropdown label="Weather" value={weather} options={WEATHER_CONDITIONS} onChange={setWeather} icon={Sun} />
                                        </div>

                                        {/* Posing Section */}
                                        <div className="border-t border-white/5 pt-6">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                <Move size={12} /> Body Language
                                            </label>
                                            
                                            {/* Pose Category Tabs */}
                                            <div className="flex overflow-x-auto custom-scrollbar gap-2 mb-4 pb-2">
                                                {Object.keys(POSITIONS_DB).map(cat => (
                                                    <button 
                                                        key={cat} 
                                                        onClick={() => { setActivePoseTab(cat); setPosition(POSITIONS_DB[cat][0]); }}
                                                        className={`px-4 py-2 whitespace-nowrap text-[10px] uppercase font-bold tracking-wider rounded-sm border transition-all ${activePoseTab === cat ? 'bg-white/10 border-primary text-white' : 'bg-black border-white/10 text-slate-500 hover:bg-white/5'}`}
                                                    >
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>

                                            <UnifiedDropdown value={position} options={POSITIONS_DB[activePoseTab] || []} onChange={setPosition} placeholder="Select Pose" />
                                            
                                            <div className="mt-4">
                                                <label className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2 block">Intimacy Level</label>
                                                <div className="flex gap-1 bg-black p-1 rounded-sm border border-white/5">
                                                    {POSE_INTENSITIES.map(intensity => (
                                                        <button 
                                                            key={intensity} 
                                                            onClick={() => setPoseIntensity(intensity)}
                                                            className={`flex-1 py-2 text-[9px] uppercase font-bold tracking-wider rounded-sm transition-all ${poseIntensity === intensity ? 'bg-white/10 text-white shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
                                                        >
                                                            {intensity.split(' ')[0]}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Touch Points */}
                                        <div className="border-t border-white/5 pt-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                                    <Focus size={12} /> Focal Point
                                                </label>
                                                <div className="flex bg-black rounded-sm border border-white/10 p-0.5">
                                                    <button onClick={() => setSelectedCharacter("Vijay")} className={`px-3 py-1 text-[9px] uppercase font-bold transition-colors ${selectedCharacter === "Vijay" ? 'bg-white/10 text-white' : 'text-slate-600'}`}>Vijay</button>
                                                    <button onClick={() => setSelectedCharacter("Meena")} className={`px-3 py-1 text-[9px] uppercase font-bold transition-colors ${selectedCharacter === "Meena" ? 'bg-white/10 text-white' : 'text-slate-600'}`}>Meena</button>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-3">
                                                {TOUCH_POINTS_DATA[selectedCharacter].slice(0, 6).map((tp) => (
                                                    <button
                                                        key={tp.id}
                                                        onClick={() => toggleTouchPoint(tp.id)}
                                                        className={`p-3 text-left rounded-sm border transition-all duration-300 flex items-center justify-between group ${selectedTouchPoint === tp.id ? 'bg-primary/20 border-primary text-white' : 'bg-black border-white/10 text-slate-400 hover:border-white/30'}`}
                                                    >
                                                        <span className="text-[10px] font-bold uppercase tracking-wider">{tp.label}</span>
                                                        {selectedTouchPoint === tp.id && <CheckCircle2 size={12} className="text-primary"/>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "cinematography" && (
                                    <motion.div key="cinematography" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                                        <UnifiedDropdown label="Lighting Setup" value={lighting} options={LIGHTING_OPTIONS} onChange={setLighting} icon={Sun} />
                                        <VisualPreviewBox type="lighting" value={lighting} />
                                        
                                        <div className="grid grid-cols-2 gap-6">
                                            <UnifiedDropdown label="Camera Angle" value={camera} options={CAMERA_ANGLES} onChange={setCamera} icon={Video} />
                                            <UnifiedDropdown label="Art Style" value={style} options={IMAGE_STYLES} onChange={setStyle} icon={Palette} />
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Aspect Ratio</label>
                                            <div className="flex gap-2">
                                                {ASPECT_RATIOS.map(ratio => (
                                                    <button 
                                                        key={ratio}
                                                        onClick={() => setAspectRatio(ratio)}
                                                        className={`flex-1 py-3 border rounded-sm text-[10px] font-bold transition-all ${aspectRatio === ratio ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-slate-500 hover:border-white/30'}`}
                                                    >
                                                        {ratio}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/5">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Director's Notes (Optional)</label>
                                            <textarea 
                                                value={customDetails}
                                                onChange={(e) => setCustomDetails(e.target.value)}
                                                placeholder="Add specific details... (e.g., 'Add a blue scarf', 'Make it rain harder')"
                                                className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-sm text-slate-300 outline-none focus:border-primary min-h-[80px] resize-none placeholder:text-slate-700"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Action Footer */}
                        <div className="p-6 bg-black border-t border-white/10 z-20 relative">
                            <div className="flex gap-4">
                                <button onClick={handleSurprise} className="px-4 py-4 bg-[#1a1a1a] hover:bg-[#252525] rounded-sm border border-white/10 text-slate-400 transition-colors" title="Randomize">
                                    <Shuffle size={18} />
                                </button>
                                <button 
                                    ref={visualizerBtnRef}
                                    onClick={handleGenerate}
                                    disabled={isLoading}
                                    className="flex-1 bg-gradient-to-r from-primary to-[#186a8a] hover:from-[#186a8a] hover:to-primary text-white font-bold uppercase tracking-[0.2em] text-xs rounded-sm transition-all shadow-glow flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {isLoading ? (
                                        <>Processing <Loader2 size={16} className="animate-spin"/></>
                                    ) : (
                                        <>Generate Scene <Sparkles size={16} className="group-hover:scale-125 transition-transform"/></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: STAGE / OUTPUT --- */}
                    <div className="xl:col-span-7 flex flex-col h-full gap-6">
                        {/* Output Stage */}
                        <div className="flex-1 bg-[#080808] border border-white/10 rounded-sm shadow-2xl relative overflow-hidden flex items-center justify-center min-h-[500px] group/stage" ref={outputRef}>
                            {/* Dynamic Weather Overlay */}
                            <AtmosphericOverlay weather={weather} />
                            
                            {isLoading && <TerminalLoader />}

                            {generatedImage ? (
                                <div className="relative w-full h-full flex items-center justify-center bg-black">
                                    <img 
                                        src={generatedImage} 
                                        alt="Generated Scene" 
                                        className="max-w-full max-h-full object-contain shadow-2xl transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover/stage:opacity-100 transition-opacity duration-300 flex justify-between items-end">
                                        <div>
                                            <h3 className="text-white font-display text-xl">{mood} {setting}</h3>
                                            <p className="text-slate-400 text-xs mt-1">{position}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <button onClick={() => handleDownload(generatedImage, `jasmine-knot-${Date.now()}.png`)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"><Download size={18}/></button>
                                            <button onClick={() => window.open(generatedImage, '_blank')} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"><Maximize2 size={18}/></button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center opacity-40 max-w-md p-8">
                                    <div className="w-24 h-24 border border-dashed border-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Camera size={40} className="text-slate-600" />
                                    </div>
                                    <h3 className="text-xl font-display text-slate-400 mb-2">The Stage is Empty</h3>
                                    <p className="text-sm text-slate-600 font-mono">Configure your scene parameters on the left and press Generate to visualize the moment.</p>
                                </div>
                            )}
                            
                            {generationError && (
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-red-900/90 text-white px-6 py-3 rounded-sm border border-red-500 flex items-center gap-3 shadow-xl z-30">
                                    <AlertCircle size={18} />
                                    <span className="text-xs font-bold uppercase tracking-wider">{generationError}</span>
                                    <button onClick={() => setGenerationError("")}><X size={14}/></button>
                                </div>
                            )}
                        </div>

                        {/* History Bar */}
                        {history.length > 0 && (
                            <div className="bg-[#121212] border border-white/5 rounded-sm p-4 overflow-x-auto custom-scrollbar">
                                <div className="flex items-center gap-4 min-w-max">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] vertical-rl rotate-180 h-20 text-center">Film Roll</span>
                                    {history.map((item) => (
                                        <div key={item.id} className="relative group w-20 h-20 flex-shrink-0 cursor-pointer border border-white/10 hover:border-primary transition-all" onClick={() => setGeneratedImage(item.url)}>
                                            <img src={item.url} alt="thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity">
                                                <button onClick={(e) => { e.stopPropagation(); handleLoadConfig(item.config); }} className="p-1 bg-primary/80 rounded-full text-white" title="Reuse Settings"><Repeat size={10} /></button>
                                                <button onClick={(e) => { e.stopPropagation(); deleteHistoryItem(item.id); }} className="p-1 bg-red-500/80 rounded-full text-white" title="Delete"><Trash2 size={10} /></button>
                                            </div>
                                            {generatedImage === item.url && <div className="absolute inset-0 border-2 border-primary pointer-events-none"></div>}
                                        </div>
                                    ))}
                                    <button onClick={handleClearGallery} className="px-4 py-2 text-[10px] text-red-400 hover:text-red-300 border border-red-900/30 hover:border-red-500/50 rounded-sm transition-colors uppercase tracking-wider ml-4">Clear All</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YourDesiredMoment;
