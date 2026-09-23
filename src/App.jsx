import React, { useState, useEffect } from 'react';
import { LearnerProvider, useLearner } from './context/LearnerContext';
import MobileHeader from './components/layout/MobileHeader';
import BottomNav from './components/layout/BottomNav';
import OnboardingScreen from './components/onboarding/OnboardingScreen';
import LearnerDashboard from './components/home/LearnerDashboard';
import MultiverseMap from './components/journey/MultiverseMap';
import NotesEngine from './components/learn/NotesEngine';
import PracticeView from './components/practice/PracticeView';
import AchievementsView from './components/achievements/AchievementsView';

// Modals & Splash
import LoadingSplash from './components/common/LoadingSplash';
import GlobalSearchModal from './components/search/GlobalSearchModal';
import AdminDashboard from './components/admin/AdminDashboard';
import PlacementCenter from './components/placement/PlacementCenter';
import MockTestCenter from './components/practice/MockTestCenter';
import LevelDetailModal from './components/journey/LevelDetailModal';
import AssessmentRunner from './components/practice/AssessmentRunner';
import GrandCeremonyModal from './components/journey/GrandCeremonyModal';
import InstallGuideModal from './components/common/InstallGuideModal';
import { X } from 'lucide-react';

function AppContent() {
  const { 
    hasOnboarded, activeTab, activeModal, modalPayload, 
    closeModal, completedLevels, openModal 
  } = useLearner();

  const [isLoading, setIsLoading] = useState(true);

  // Trigger Grand Ceremony when all 25 levels completed
  useEffect(() => {
    if (completedLevels.length >= 25 && activeModal !== 'grandCeremony') {
      openModal('grandCeremony');
    }
  }, [completedLevels.length]);

  if (isLoading) {
    return <LoadingSplash onFinished={() => setIsLoading(false)} />;
  }

  if (!hasOnboarded) {
    return <OnboardingScreen />;
  }

  return (
    <div className="min-h-screen bg-deep-space flex flex-col relative text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      {/* Top Mobile Status Header */}
      <MobileHeader />

      {/* Main Content View with mobile touch optimizations */}
      <main className="flex-1 w-full max-w-lg mx-auto overflow-x-hidden">
        {activeTab === 'home' && <LearnerDashboard />}
        {activeTab === 'journey' && <MultiverseMap />}
        {activeTab === 'learn' && <NotesEngine />}
        {activeTab === 'practice' && <PracticeView />}
        {activeTab === 'achievements' && <AchievementsView />}
      </main>

      {/* Bottom Sticky Mobile Navigation */}
      <BottomNav />

      {/* Modals Container */}
      {activeModal === 'search' && <GlobalSearchModal onClose={closeModal} />}
      {activeModal === 'admin' && <AdminDashboard onClose={closeModal} />}
      {activeModal === 'placement' && <PlacementCenter onClose={closeModal} />}
      {activeModal === 'mock' && <MockTestCenter initialConfig={modalPayload} onClose={closeModal} />}
      {activeModal === 'levelDetail' && <LevelDetailModal level={modalPayload} onClose={closeModal} />}
      {activeModal === 'assessment' && <AssessmentRunner level={modalPayload} onClose={closeModal} />}
      {activeModal === 'grandCeremony' && <GrandCeremonyModal onClose={closeModal} />}
      {activeModal === 'installGuide' && <InstallGuideModal onClose={closeModal} />}

      {/* Full Poster Modal View */}
      {activeModal === 'poster' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/95 backdrop-blur-xl">
          <div className="relative max-w-md w-full max-h-[95vh] overflow-y-auto rounded-3xl border-2 border-amber-400/80 shadow-2xl bg-black">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/80 text-amber-400 hover:text-white border border-amber-400/50 cursor-pointer shadow-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src="./poster.jpg"
              alt="Knowledge Multiverse Official Poster"
              className="w-full h-auto rounded-3xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LearnerProvider>
      <AppContent />
    </LearnerProvider>
  );
}
