
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, initializeAuth } from './services/firebase';
import { AnimatePresence } from 'framer-motion';

// Eagerly load critical components
import FloatingMenu from './components/FloatingMenu'; 
import Hero from './components/Hero';
import BookSection from './components/BookSection';
import LazyLoad from './components/LazyLoad';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import FeaturePresentation from './components/FeaturePresentation'; // Eager load for quick access

// Lazily load below-the-fold components
const CharacterProfiles = lazy(() => import('./components/CharacterProfiles'));
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
const Author = lazy(() => import('./components/Author'));
const DatePlanner = lazy(() => import('./components/DatePlanner'));
const MoodPlaylist = lazy(() => import('./components/MoodPlaylist'));
const LoveLetterMuse = lazy(() => import('./components/LoveLetterMuse'));
const DestinyMatch = lazy(() => import('./components/DestinyMatch'));


const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [showPresentation, setShowPresentation] = useState(false);

  useEffect(() => {
    // --- START: Scroll-to-Top Fix ---
    // On every fresh load/refresh, force the browser to the top of the page.
    // This overrides the browser's default scroll restoration behavior.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    // --- END: Scroll-to-Top Fix ---

    initializeAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="bg-black min-h-screen text-slate-300 font-body selection:bg-primary/40 selection:text-white overflow-x-hidden">
        <AnimatePresence>
            {showPresentation && <FeaturePresentation onClose={() => setShowPresentation(false)} />}
        </AnimatePresence>
        
        <FloatingMenu />
        <Hero onStartPresentation={() => setShowPresentation(true)} />
        <BookSection />
        <div className="relative bg-black shadow-[0_-50px_100px_rgba(0,0,0,1)]">
          {/* The "Hook" Phase */}
          <LazyLoad><CharacterProfiles /></LazyLoad>
          <LazyLoad><VisualTimeline /></LazyLoad>
          <LazyLoad><UnspokenThoughts /></LazyLoad>
          <LazyLoad><Cliffhanger /> </LazyLoad>
          <LazyLoad><PredictionGame /></LazyLoad>
          
          {/* The "Immersion" Phase */}
          <LazyLoad><TensionHeatmap /></LazyLoad>
          <LazyLoad><AestheticGallery /></LazyLoad>
          <LazyLoad><MoodPlaylist /></LazyLoad>
          
          {/* The "Engagement" Phase */}
          <LazyLoad><TropeFinder /> </LazyLoad>
          <LazyLoad><FinishTheScene /></LazyLoad>
          <LazyLoad><ObjectPerspective /> </LazyLoad>
          <LazyLoad><LoveLetterMuse /></LazyLoad>
          <LazyLoad><DatePlanner /></LazyLoad>
          <LazyLoad><DestinyMatch /></LazyLoad>
          
          {/* The "Utility" Phase */}
          <LazyLoad><TextDecoder /></LazyLoad>
          <LazyLoad><CharacterConnect /></LazyLoad>
          
          <LazyLoad><Author /></LazyLoad>
          <LazyLoad><Newsletter user={user} /></LazyLoad>
          <LazyLoad><Footer /></LazyLoad>
        </div>
    </main>
  );
};

export default App;
