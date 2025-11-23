
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, initializeAuth } from './services/firebase';
import { AnimatePresence } from 'framer-motion';

// Eagerly load critical components
import FloatingMenu from './components/FloatingMenu'; 
import Hero from './components/Hero';
import BookSection from './components/BookSection';
import LazyLoad from './components/LazyLoad';
import ScrollReveal from './components/ScrollReveal';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import FeaturePresentation from './components/FeaturePresentation';
import AIMenu from './components/AIMenu';
import FeatureModal from './components/FeatureModal';
import CharacterProfiles from './components/CharacterProfiles';

// Lazily load Features (now used inside Modal)
const VisualTimeline = lazy(() => import('./components/VisualTimeline'));
const AestheticGallery = lazy(() => import('./components/AestheticGallery'));
const Cliffhanger = lazy(() => import('./components/Cliffhanger'));
const TropeFinder = lazy(() => import('./components/TropeFinder'));
const ObjectPerspective = lazy(() => import('./components/ObjectPerspective'));
const FinishTheScene = lazy(() => import('./components/FinishTheScene'));
const UnspokenThoughts = lazy(() => import('./components/UnspokenThoughts'));
const TensionHeatmap = lazy(() => import('./components/TensionHeatmap'));
const PredictionGame = lazy(() => import('./components/PredictionGame'));
const CharacterConnect = lazy(() => import('./components/CharacterConnect'));
const TextDecoder = lazy(() => import('./components/TextDecoder'));
const RomanceTranslator = lazy(() => import('./components/RomanceTranslator'));
const Author = lazy(() => import('./components/Author'));
const DatePlanner = lazy(() => import('./components/DatePlanner'));
const MoodPlaylist = lazy(() => import('./components/MoodPlaylist'));
const LoveLetterMuse = lazy(() => import('./components/LoveLetterMuse'));
const DestinyMatch = lazy(() => import('./components/DestinyMatch'));

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [showPresentation, setShowPresentation] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    initializeAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Helper to render the correct component based on ID
  const renderFeature = (id: string) => {
      switch(id) {
          case 'unspoken': return <UnspokenThoughts />;
          case 'heatmap': return <TensionHeatmap />;
          case 'finishscene': return <FinishTheScene />;
          case 'connect': return <CharacterConnect />;
          case 'tropematcher': return <TropeFinder />;
          case 'cliffhanger': return <Cliffhanger />;
          case 'prediction': return <PredictionGame />;
          case 'playlist': return <MoodPlaylist />;
          case 'muse': return <LoveLetterMuse />;
          case 'destiny': return <DestinyMatch />;
          case 'decoder': return <TextDecoder />;
          case 'translator': return <RomanceTranslator />;
          case 'dateplanner': return <DatePlanner />;
          case 'povshift': return <ObjectPerspective />;
          default: return null;
      }
  };

  const getFeatureTitle = (id: string) => {
     // Simple mapping for modal title
     const titles: Record<string, string> = {
         'unspoken': 'Unspoken Thoughts',
         'heatmap': 'Tension Heatmap',
         'finishscene': 'Co-Write Scene',
         'connect': 'Character Connect',
         'tropematcher': 'Trope Matchmaker',
         'cliffhanger': 'Cliffhanger Engine',
         'prediction': 'Prediction Game',
         'playlist': 'Mood Playlist',
         'muse': 'Love Letter Muse',
         'destiny': 'Destiny Match',
         'decoder': 'Text Decoder',
         'translator': 'Romance Translator',
         'dateplanner': 'Date Planner',
         'povshift': 'Object Perspective'
     };
     return titles[id] || 'AI Feature';
  };

  return (
    <main className="bg-black min-h-screen text-slate-300 font-body selection:bg-primary/40 selection:text-white overflow-x-hidden">
        {/* Onboarding Presentation */}
        <AnimatePresence mode="wait">
            {showPresentation && <FeaturePresentation onClose={() => setShowPresentation(false)} />}
        </AnimatePresence>
        
        {/* Feature Modal Overlay */}
        <AnimatePresence>
            {activeFeature && (
                <FeatureModal 
                    onClose={() => setActiveFeature(null)} 
                    title={getFeatureTitle(activeFeature)}
                >
                    <Suspense fallback={<div className="h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                        {renderFeature(activeFeature)}
                    </Suspense>
                </FeatureModal>
            )}
        </AnimatePresence>
        
        <FloatingMenu />
        
        {/* Main Content Flow */}
        <Hero onStartPresentation={() => setShowPresentation(true)} />
        
        <ScrollReveal>
            <BookSection />
        </ScrollReveal>

        {/* Narrative Context */}
        <LazyLoad><CharacterProfiles /></LazyLoad>

        {/* The New AI Hub */}
        <AIMenu onSelect={setActiveFeature} />

        {/* Static Content / Footer */}
        <div className="relative bg-black shadow-[0_-50px_100px_rgba(0,0,0,1)] z-10">
             <LazyLoad><Author /></LazyLoad>
             <LazyLoad><Newsletter user={user} /></LazyLoad>
             <LazyLoad><Footer /></LazyLoad>
        </div>
    </main>
  );
};

export default App;
