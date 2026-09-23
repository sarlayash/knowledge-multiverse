import React, { createContext, useContext, useState, useEffect } from 'react';
import { playSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { BADGES_DATA, CERTIFICATES_DATA } from '../data/badgesData';

const STORAGE_KEY = 'km_learner_state_v1';

const defaultDailyMission = {
  date: new Date().toISOString().slice(0, 10),
  readNotes: false,
  solveChallenge: false,
  takeAssessment: false,
  completeMock: false,
  claimedXp: false,
};

const defaultInitialState = {
  name: '',
  hasOnboarded: false,
  joinedAt: null,
  currentLevel: 1,
  currentModuleId: 'm1-1',
  completedLevels: [],
  completedModules: [],
  xp: 0,
  streak: 1,
  soundEnabled: true,
  bookmarkedNotes: [],
  assessmentScores: {}, // { [levelId]: { score, total, percentage } }
  codeSubmissions: {}, // { [levelId]: { passed, code } }
  mockAttempts: [], // array of test attempts
  completedSimulations: [],
  completedProjects: [],
  unlockedBadges: [],
  unlockedCertificates: [],
  knowledgeGaps: [], // [{ id, topic, levelId, reason, count }]
  dailyMission: defaultDailyMission,
  activeTab: 'home', // 'home' | 'journey' | 'learn' | 'practice' | 'achievements'
  activeModal: null, // 'search' | 'admin' | 'placement' | 'mock' | 'certificate' | 'levelDetail'
  modalPayload: null
};

const LearnerContext = createContext(null);

export function LearnerProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Refresh daily mission if date changed
        const today = new Date().toISOString().slice(0, 10);
        if (parsed.dailyMission?.date !== today) {
          parsed.dailyMission = { ...defaultDailyMission, date: today };
        }
        return { ...defaultInitialState, ...parsed };
      }
    } catch (e) {
      console.error('Failed to parse learner storage', e);
    }
    return defaultInitialState;
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to persist learner state', e);
    }
  }, [state]);

  const toggleSound = () => {
    setState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const playAudio = (type) => {
    if (state.soundEnabled) {
      playSound(type);
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#38bdf8', '#c084fc', '#10b981', '#ffffff']
      });
    } catch (e) {
      // safe fallback
    }
  };

  const setOnboarded = (name) => {
    const trimmed = name.trim() || 'Learner';
    setState(prev => ({
      ...prev,
      name: trimmed,
      hasOnboarded: true,
      joinedAt: new Date().toISOString(),
      xp: prev.xp + 50,
      unlockedBadges: [...new Set([...prev.unlockedBadges, 'first-step'])]
    }));
    playAudio('levelup');
    triggerConfetti();
  };

  const addXP = (amount) => {
    setState(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const completeLevel = (levelId) => {
    setState(prev => {
      const completed = new Set(prev.completedLevels);
      completed.add(levelId);
      const nextLevel = Math.min(25, Math.max(prev.currentLevel, levelId + 1));
      let newBadges = [...prev.unlockedBadges];
      let newCerts = [...prev.unlockedCertificates];

      // Check badges
      if (levelId === 1 && !newBadges.includes('first-step')) newBadges.push('first-step');
      if (levelId === 5 && !newBadges.includes('code-explorer')) newBadges.push('code-explorer');
      if (levelId === 6 && !newBadges.includes('database-explorer')) newBadges.push('database-explorer');
      if (levelId === 7 && !newBadges.includes('web-builder')) newBadges.push('web-builder');
      if (completed.size >= 10 && !newBadges.includes('knowledge-warrior')) newBadges.push('knowledge-warrior');
      if (levelId === 17 && !newBadges.includes('cloud-explorer')) newBadges.push('cloud-explorer');
      if (levelId === 18 && !newBadges.includes('security-mind')) newBadges.push('security-mind');
      if (levelId === 20 && !newBadges.includes('ai-explorer')) newBadges.push('ai-explorer');
      if (levelId === 21 && !newBadges.includes('genai-explorer')) newBadges.push('genai-explorer');
      if (levelId === 25 && !newBadges.includes('multiverse-master')) newBadges.push('multiverse-master');

      // Check certificates
      if ([1, 2, 3].every(id => completed.has(id)) && !newCerts.includes('cert-foundations')) {
        newCerts.push('cert-foundations');
      }
      if ([4, 5].every(id => completed.has(id)) && !newCerts.includes('cert-systems-code')) {
        newCerts.push('cert-systems-code');
      }
      if ([6, 7].every(id => completed.has(id)) && !newCerts.includes('cert-data-web')) {
        newCerts.push('cert-data-web');
      }
      if (levelId === 25 && !newCerts.includes('cert-multiverse-master')) {
        newCerts.push('cert-multiverse-master');
      }

      return {
        ...prev,
        completedLevels: Array.from(completed),
        currentLevel: nextLevel,
        xp: prev.xp + 150,
        unlockedBadges: newBadges,
        unlockedCertificates: newCerts
      };
    });
    playAudio('levelup');
    triggerConfetti();
  };

  const recordAssessment = (levelId, score, total, failedTopics = []) => {
    const percentage = Math.round((score / total) * 100);
    setState(prev => {
      const assessmentScores = {
        ...prev.assessmentScores,
        [levelId]: { score, total, percentage, timestamp: Date.now() }
      };

      // Record knowledge gaps if failed questions
      let knowledgeGaps = [...prev.knowledgeGaps];
      failedTopics.forEach(topic => {
        const existing = knowledgeGaps.find(g => g.topic === topic);
        if (existing) {
          existing.count += 1;
        } else {
          knowledgeGaps.push({
            id: 'gap-' + Date.now() + Math.random().toString(36).slice(2, 6),
            topic,
            levelId,
            reason: `Mistakes made during Level ${levelId} assessment on ${topic}.`,
            count: 1
          });
        }
      });

      const dailyMission = {
        ...prev.dailyMission,
        takeAssessment: true
      };

      return {
        ...prev,
        assessmentScores,
        knowledgeGaps,
        dailyMission,
        xp: prev.xp + (percentage >= 70 ? 80 : 30)
      };
    });

    if (percentage >= 70) {
      playAudio('correct');
      triggerConfetti();
    } else {
      playAudio('error');
    }
  };

  const recordCodeSubmission = (levelId, passed, code) => {
    setState(prev => ({
      ...prev,
      codeSubmissions: {
        ...prev.codeSubmissions,
        [levelId]: { passed, code, timestamp: Date.now() }
      },
      dailyMission: { ...prev.dailyMission, solveChallenge: true },
      xp: prev.xp + (passed ? 100 : 20)
    }));

    if (passed) {
      playAudio('correct');
      triggerConfetti();
    } else {
      playAudio('error');
    }
  };

  const recordMockAttempt = (attempt) => {
    setState(prev => {
      const mockAttempts = [attempt, ...prev.mockAttempts];
      let newBadges = [...prev.unlockedBadges];
      let newCerts = [...prev.unlockedCertificates];

      if (attempt.percentage >= 80 && !newBadges.includes('industry-ready')) {
        newBadges.push('industry-ready');
        newCerts.push('cert-placement');
      }

      return {
        ...prev,
        mockAttempts,
        dailyMission: { ...prev.dailyMission, completeMock: true },
        xp: prev.xp + Math.round(attempt.percentage * 1.5),
        unlockedBadges: newBadges,
        unlockedCertificates: newCerts
      };
    });
    playAudio('badge');
    triggerConfetti();
  };

  const completeSimulation = (simId) => {
    setState(prev => {
      if (prev.completedSimulations.includes(simId)) return prev;
      return {
        ...prev,
        completedSimulations: [...prev.completedSimulations, simId],
        xp: prev.xp + 120
      };
    });
    playAudio('correct');
    triggerConfetti();
  };

  const completeProject = (projId) => {
    setState(prev => {
      if (prev.completedProjects.includes(projId)) return prev;
      return {
        ...prev,
        completedProjects: [...prev.completedProjects, projId],
        xp: prev.xp + 250
      };
    });
    playAudio('levelup');
    triggerConfetti();
  };

  const toggleBookmark = (noteId) => {
    setState(prev => {
      const exists = prev.bookmarkedNotes.includes(noteId);
      return {
        ...prev,
        bookmarkedNotes: exists
          ? prev.bookmarkedNotes.filter(id => id !== noteId)
          : [...prev.bookmarkedNotes, noteId]
      };
    });
    playAudio('click');
  };

  const markNotesRead = (levelId) => {
    setState(prev => ({
      ...prev,
      dailyMission: { ...prev.dailyMission, readNotes: true },
      xp: prev.xp + 20
    }));
  };

  const clearKnowledgeGap = (gapId) => {
    setState(prev => ({
      ...prev,
      knowledgeGaps: prev.knowledgeGaps.filter(g => g.id !== gapId)
    }));
    playAudio('correct');
  };

  // Calculate evidence-based placement readiness percentage (0 - 100%)
  const calculatePlacementReadiness = () => {
    const levelWeight = (state.completedLevels.length / 25) * 35; // 35%
    const assessmentsCount = Object.keys(state.assessmentScores).length;
    const assessmentAvg = assessmentsCount > 0
      ? Object.values(state.assessmentScores).reduce((acc, curr) => acc + curr.percentage, 0) / assessmentsCount
      : 0;
    const assessmentWeight = (assessmentAvg / 100) * 25; // 25%

    const codeSolvedCount = Object.values(state.codeSubmissions).filter(s => s.passed).length;
    const codeWeight = Math.min(20, (codeSolvedCount / 10) * 20); // 20%

    const simWeight = Math.min(10, (state.completedSimulations.length / 7) * 10); // 10%
    const projWeight = Math.min(10, (state.completedProjects.length / 5) * 10); // 10%

    const total = Math.min(100, Math.round(levelWeight + assessmentWeight + codeWeight + simWeight + projWeight));
    return total;
  };

  const placementScore = calculatePlacementReadiness();

  const getPlacementStage = (score) => {
    if (score < 25) return { stage: 'FOUNDATION', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/30' };
    if (score < 50) return { stage: 'DEVELOPING', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30' };
    if (score < 70) return { stage: 'PRACTICE READY', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    if (score < 85) return { stage: 'INTERVIEW READY', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    return { stage: 'INDUSTRY READY', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' };
  };

  const setActiveTab = (tab) => {
    playAudio('click');
    setState(prev => ({ ...prev, activeTab: tab }));
  };

  const openModal = (modalName, payload = null) => {
    playAudio('click');
    setState(prev => ({ ...prev, activeModal: modalName, modalPayload: payload }));
  };

  const closeModal = () => {
    setState(prev => ({ ...prev, activeModal: null, modalPayload: null }));
  };

  const resetAllProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultInitialState);
  };

  return (
    <LearnerContext.Provider
      value={{
        ...state,
        placementScore,
        placementStage: getPlacementStage(placementScore),
        setOnboarded,
        addXP,
        completeLevel,
        recordAssessment,
        recordCodeSubmission,
        recordMockAttempt,
        completeSimulation,
        completeProject,
        toggleBookmark,
        markNotesRead,
        clearKnowledgeGap,
        toggleSound,
        playAudio,
        triggerConfetti,
        setActiveTab,
        openModal,
        closeModal,
        resetAllProgress,
      }}
    >
      {children}
    </LearnerContext.Provider>
  );
}

export function useLearner() {
  const context = useContext(LearnerContext);
  if (!context) {
    throw new Error('useLearner must be used within a LearnerProvider');
  }
  return context;
}
