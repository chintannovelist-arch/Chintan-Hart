
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, initializeAuth } from './services/firebase';

// Components
import FloatingMenu from './components/FloatingMenu'; 
import Hero from './components/Hero';
import BookSection from './components/BookSection';
import AestheticGallery from './components/AestheticGallery';
import Cliffhanger from './components/Cliffhanger';
import TropeFinder from './components/TropeFinder'; // Corrected from TropeMatchmaker
import ObjectPerspective from './components/ObjectPerspective';
import FinishTheScene from './components/FinishTheScene';
import UnspokenThoughts from './components/UnspokenThoughts';
import TensionHeatmap from './components/TensionHeatmap';
import PredictionGame from './components/PredictionGame';
import CharacterConnect from './components/CharacterConnect';
import TextDecoder from './components/TextDecoder';
import Author from './components/Author';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import DatePlanner from './components/DatePlanner';
import MoodPlaylist from './components/MoodPlaylist';
import LoveLetterMuse from './components/LoveLetterMuse';
import SensoryImmersion from './components/SensoryImmersion';
import DestinyMatch from './components/DestinyMatch';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    initializeAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="bg-black min-h-screen text-slate-300 font-body selection:bg-primary/40 selection:text-white overflow-x-hidden">
        <FloatingMenu />
        <Hero />
        <BookSection />
        <div className="relative z-10 bg-black shadow-[0_-50px_100px_rgba(0,0,0,1)]">
          {/* The "Hook" Phase */}
          <UnspokenThoughts />
          <Cliffhanger /> 
          <PredictionGame />
          
          {/* The "Immersion" Phase */}
          <TensionHeatmap />
          <AestheticGallery />
          <SensoryImmersion />
          <MoodPlaylist />
          
          {/* The "Engagement" Phase */}
          <TropeFinder /> 
          <FinishTheScene />
          <ObjectPerspective /> 
          <LoveLetterMuse />
          <DatePlanner />
          <DestinyMatch />
          
          {/* The "Utility" Phase */}
          <TextDecoder />
          <CharacterConnect />
          
          <Author />
          <Newsletter user={user} />
          <Footer />
        </div>
    </main>
  );
};

export default App;
