import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { LEVELS_DATA } from '../../data/curriculumData';
import { BADGES_DATA, CERTIFICATES_DATA } from '../../data/badgesData';
import { PERSONAS, generatePersonalizedStudyPack } from '../../data/personaData';
import ContextTrilogy from '../layout/ContextTrilogy';
import TodaysMission from './TodaysMission';
import { 
  Rocket, Award, CheckCircle2, AlertTriangle, ArrowRight, 
  Terminal, ShieldCheck, FileCheck, Target, Zap, Sparkles,
  Download, RefreshCw, Compass, Check, X
} from 'lucide-react';

export default function LearnerDashboard() {
  const { 
    name, currentLevel, completedLevels, xp, unlockedBadges, 
    unlockedCertificates, assessmentScores, codeSubmissions, 
    mockAttempts, placementScore, placementStage, setActiveTab, 
    openModal, knowledgeGaps, clearKnowledgeGap,
    persona, personaGoal, diagnosticScore, updatePersona
  } = useLearner();

  const [showSwitchTrackModal, setShowSwitchTrackModal] = useState(false);

  const activePersonaObj = PERSONAS[persona] || PERSONAS.college;
  const currentLevelObj = LEVELS_DATA.find(l => l.id === currentLevel) || LEVELS_DATA[0];
  const progressPercent = Math.round((completedLevels.length / 25) * 100);

  // Compute scores for performance panel
  const assessmentsCount = Object.keys(assessmentScores).length;
  const assessmentAvg = assessmentsCount > 0
    ? Math.round(Object.values(assessmentScores).reduce((acc, c) => acc + c.percentage, 0) / assessmentsCount)
    : 0;

  const solvedCodeCount = Object.values(codeSubmissions).filter(s => s.passed).length;
  const handsOnScore = Math.min(100, solvedCodeCount * 10);
  const knowledgeScore = Math.round((completedLevels.length / 25) * 100);
  const mockTestAvg = mockAttempts.length > 0
    ? Math.round(mockAttempts.reduce((acc, m) => acc + m.percentage, 0) / mockAttempts.length)
    : 0;

  const handleContinueLearning = () => {
    openModal('levelDetail', currentLevelObj);
  };

  const handleDownloadStudyPack = () => {
    const textContent = generatePersonalizedStudyPack(persona, name, LEVELS_DATA);
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Knowledge_Multiverse_${activePersonaObj.title.replace(/\s+/g, '_')}_StudyPack.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 pb-24 max-w-lg mx-auto px-4 pt-3">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#11162a] via-[#0d1222] to-[#070913] border border-[#212a45] p-5 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r ${activePersonaObj.badgeGradient} text-slate-950 font-bold uppercase tracking-wider`}>
                {activePersonaObj.badgeText}
              </span>
              <button
                onClick={() => setShowSwitchTrackModal(true)}
                className="text-[10px] text-slate-400 hover:text-amber-400 underline font-semibold cursor-pointer"
              >
                Switch Path
              </button>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">{name || 'Learner'}</span> 👋
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Knowledge Multiverse • Level {currentLevel} of 25
            </p>

            {diagnosticScore && (
              <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] text-emerald-300 font-bold">
                <span>🎯 Diagnostic: {diagnosticScore.score}/{diagnosticScore.total} Correct ({diagnosticScore.percentage}%)</span>
              </div>
            )}
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-amber-400 font-mono">{xp}</span>
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Total XP</span>
          </div>
        </div>

        {/* Level Progression Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
            <span className="text-slate-300">Level {currentLevel}: {currentLevelObj.title}</span>
            <span className="text-amber-400">{progressPercent}% Overall</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-sky-400 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* The Context Trilogy */}
      <ContextTrilogy />

      {/* Personalized Study Pack & Offline Syllabus CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-[#11172e] via-[#0d1222] to-[#171f38] border border-amber-400/40 p-4 shadow-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 text-xl shadow-md">
            📥
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black text-amber-400 tracking-wider uppercase">
                OFFLINE STUDY BUNDLE
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                {activePersonaObj.title}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-white">
              Download Tailored Syllabus & Notes
            </h4>
            <p className="text-[11px] text-slate-400 line-clamp-1">
              {activePersonaObj.studyPackTitle}
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadStudyPack}
          className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer shadow-lg shadow-amber-500/20 shrink-0"
        >
          <Download className="w-3.5 h-3.5 fill-slate-950" />
          <span>Get Pack</span>
        </button>
      </div>

      {/* Large CTA: CONTINUE LEARNING */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/30 shrink-0">
              {currentLevelObj.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                ACTIVE MULTIVERSE MISSION
              </span>
              <h2 className="text-base font-extrabold text-white">
                Level {currentLevelObj.id} — {currentLevelObj.title}
              </h2>
              <span className="text-xs text-slate-400">
                Stage: <strong className="text-slate-300">{currentLevelObj.stage}</strong> • {currentLevelObj.domain}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleContinueLearning}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm tracking-wider shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer"
        >
          <Rocket className="w-4 h-4 fill-slate-950" />
          <span>CONTINUE LEARNING</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Learning Intelligence: KNOWLEDGE GAP ALERT */}
      {knowledgeGaps.length > 0 && (
        <div className="rounded-2xl bg-rose-950/20 border border-rose-500/40 p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span className="uppercase tracking-wider">KNOWLEDGE GAP DETECTED</span>
          </div>
          <p className="text-xs text-slate-300">
            "You may want to revisit <strong>{knowledgeGaps[0].topic}</strong>. Repeated mistakes were detected in recent checks."
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setActiveTab('learn')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold"
            >
              📖 Review Notes
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-semibold"
            >
              💻 Practice IDE
            </button>
            <button
              onClick={() => openModal('mock')}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-semibold"
            >
              🎯 Retry Assessment
            </button>
            <button
              onClick={() => clearKnowledgeGap(knowledgeGaps[0].id)}
              className="px-2 py-1.5 text-[11px] text-slate-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Today's Mission Card */}
      <TodaysMission />

      {/* Performance & Placement Standard Center */}
      <div className="bg-[#0d1222] border border-[#212942] rounded-3xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm text-white tracking-wide">
              PERFORMANCE & READINESS
            </h3>
          </div>
          <button
            onClick={() => openModal('placement')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Placement Readiness Banner */}
        <div 
          onClick={() => openModal('placement')}
          className={`p-3.5 rounded-2xl border mb-4 cursor-pointer transition-all hover:border-amber-400/50 ${placementStage.bg}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300">
              Placement Readiness Meter
            </span>
            <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full bg-black/40 ${placementStage.color}`}>
              {placementStage.stage}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden mb-1.5">
            <div 
              className="h-full bg-gradient-to-r from-sky-400 via-amber-400 to-yellow-300 transition-all duration-500 rounded-full"
              style={{ width: `${placementScore}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Level: {placementStage.stage}</span>
            <span>{placementScore}/100 Verified Evidence</span>
          </div>
        </div>

        {/* 4 Score Tiles */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-[#12182c]/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Knowledge Score</span>
            <span className="text-lg font-black text-sky-400 font-mono">{knowledgeScore}%</span>
            <span className="text-[10px] text-slate-500 block">{completedLevels.length}/25 Levels</span>
          </div>

          <div className="p-3 rounded-xl bg-[#12182c]/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Hands-On Score</span>
            <span className="text-lg font-black text-emerald-400 font-mono">{handsOnScore}%</span>
            <span className="text-[10px] text-slate-500 block">{solvedCodeCount} Challenges Solved</span>
          </div>

          <div className="p-3 rounded-xl bg-[#12182c]/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Assessment Score</span>
            <span className="text-lg font-black text-amber-400 font-mono">{assessmentAvg}%</span>
            <span className="text-[10px] text-slate-500 block">{assessmentsCount} Tests Taken</span>
          </div>

          <div className="p-3 rounded-xl bg-[#12182c]/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Mock Test Score</span>
            <span className="text-lg font-black text-purple-400 font-mono">{mockTestAvg}%</span>
            <span className="text-[10px] text-slate-500 block">{mockAttempts.length} Mocks Done</span>
          </div>
        </div>
      </div>

      {/* Quick Launch Hub */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setActiveTab('practice')}
          className="p-4 rounded-2xl bg-[#0d1222] border border-slate-800 hover:border-amber-400/50 text-left transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Terminal className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-sm text-white">Live Browser IDE</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Write, run & test C, Python, SQL, JS</p>
        </button>

        <button
          onClick={() => openModal('mock')}
          className="p-4 rounded-2xl bg-[#0d1222] border border-slate-800 hover:border-sky-400/50 text-left transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-sm text-white">Mock Test Center</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Topic, Level, Domain & Grand Mocks</p>
        </button>
      </div>

      {/* Hard Level 100 MCQ Proctored Mock Challenge */}
      <div 
        onClick={() => openModal('mock', { type: 'hard100' })}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950/40 via-[#181124] to-amber-950/30 border-2 border-rose-500/50 p-4 shadow-xl cursor-pointer hover:border-rose-400 transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-2xl shadow-lg shadow-rose-500/30 shrink-0 group-hover:scale-105 transition-transform">
            🔥
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-slate-950 uppercase font-mono">
                STRICT PROCTOR
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 uppercase font-mono">
                2 HOURS • 100 MCQs
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-white mt-0.5">
              FAANG Hard Mock Assessment
            </h4>
            <p className="text-[11px] text-slate-300">
              Zero tolerance: Tab switch or screenshot triggers instant termination!
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-slate-950 transition-colors shrink-0">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Achievements & Certificates Previews */}
      <div className="bg-[#0d1222] border border-[#212942] rounded-3xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="font-extrabold text-sm text-white">
              BADGES & CERTIFICATES
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('achievements')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {BADGES_DATA.slice(0, 5).map((badge) => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                onClick={() => setActiveTab('achievements')}
                className={`p-3 rounded-2xl border text-center shrink-0 w-24 cursor-pointer transition-all ${
                  isUnlocked
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : 'bg-slate-900/50 border-slate-800 text-slate-600 opacity-60'
                }`}
              >
                <div className="text-2xl mb-1">{badge.icon}</div>
                <p className="text-[10px] font-bold truncate text-white">{badge.name}</p>
                <span className="text-[9px] block text-slate-400 font-mono">
                  {isUnlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Launch Poster Banner */}
      <div 
        onClick={() => openModal('poster')}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-600/15 border border-amber-500/30 p-4 shadow-xl cursor-pointer hover:border-amber-400/60 transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-amber-500/40 shadow-md shrink-0 bg-slate-900">
            <img 
              src="./poster.jpg" 
              alt="Knowledge Multiverse Official Poster" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>OFFICIAL LAUNCH POSTER</span>
            </div>
            <h4 className="text-sm font-extrabold text-white">
              Knowledge Multiverse • Powered by Kapil
            </h4>
            <p className="text-[11px] text-slate-400">Tap to inspect full 3D artwork & share</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Switch Path / Persona Modal */}
      {showSwitchTrackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0d1222] border border-amber-400/50 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <h3 className="font-extrabold text-sm text-white">
                  CHANGE LEARNING TRACK
                </h3>
              </div>
              <button
                onClick={() => setShowSwitchTrackModal(false)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Select your path to calibrate level recommendations, high-yield notes, and interview prep. Your progress will be preserved.
            </p>

            <div className="space-y-2.5">
              {Object.values(PERSONAS).map((p) => {
                const isSelected = (persona || 'college') === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      updatePersona(p.id);
                      setShowSwitchTrackModal(false);
                    }}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 text-white'
                        : 'bg-[#090d1a] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-xs text-white">{p.title}</h4>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                            {p.gradeScope}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {p.tagline}
                        </p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
