import React, { useState, useEffect } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { LEVELS_DATA } from '../../data/curriculumData';
import { HARD_MOCK_100_QUESTIONS } from '../../data/hardMockQuestions';
import { 
  Target, Clock, Award, CheckCircle2, AlertTriangle, ArrowRight, 
  Play, RotateCcw, X, Sparkles, ShieldAlert, ShieldCheck, Flame,
  Bookmark, Grid, Check, HelpCircle, AlertOctagon, Maximize2
} from 'lucide-react';

export default function MockTestCenter({ initialConfig, onClose }) {
  const { recordMockAttempt, playAudio, triggerConfetti } = useLearner();
  
  // States: 'config' | 'proctor_agreement' | 'in_progress' | 'terminated' | 'result'
  const [testState, setTestState] = useState('config');
  const [mockType, setMockType] = useState(initialConfig?.type || 'placement');
  const [timeRemaining, setTimeRemaining] = useState(300); // seconds
  const [totalAllocatedSeconds, setTotalAllocatedSeconds] = useState(300);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [testQuestions, setTestQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [testResult, setTestResult] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [terminationReason, setTerminationReason] = useState('');
  const [showGridModal, setShowGridModal] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);

  // Auto-launch if initialConfig specified hard100
  useEffect(() => {
    if (initialConfig?.type === 'hard100') {
      setMockType('hard100');
    }
  }, [initialConfig]);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (testState === 'in_progress' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            finishMockTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testState, timeRemaining]);

  // STRICT ANTI-CHEATING PROCTOR PROTOCOL (Active on 'hard100' in_progress)
  useEffect(() => {
    if (testState !== 'in_progress' || mockType !== 'hard100') return;

    const triggerTermination = (reason) => {
      playAudio('error');
      setTerminationReason(reason);
      setTestState('terminated');

      // Record disqualified attempt with 0% score
      const elapsedSeconds = Math.round((Date.now() - (startTime || Date.now())) / 1000);
      const resultObj = {
        id: 'mock-disqualified-' + Date.now(),
        type: 'hard100',
        score: 0,
        total: 100,
        percentage: 0,
        status: 'DISQUALIFIED / CANCELLED',
        timeSpent: `${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s`,
        weakAreas: ['Disqualified due to FAANG Anti-Cheat Proctor Protocol violation'],
        terminationReason: reason,
        recommendation: 'EXAM CANCELLED & TERMINATED: Zero-tolerance proctor violation detected. Tab switching, screen capture, and inspection are strictly prohibited.',
        timestamp: Date.now()
      };

      setTestResult(resultObj);
      recordMockAttempt(resultObj);
    };

    // 1. Tab switch or window minimization detection
    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        triggerTermination('Tab switch or browser minimization detected! Leaving the active exam environment violates the FAANG Zero-Tolerance Proctor Protocol.');
      }
    };

    // 2. Window focus loss detection
    const handleWindowBlur = () => {
      triggerTermination('Window focus lost! Switching to another application, desktop window, or opening external tools violates the FAANG Zero-Tolerance Proctor Protocol.');
    };

    // 3. Screenshot, DevTools & hotkey detection
    const handleKeyDown = (e) => {
      // PrintScreen key
      if (e.key === 'PrintScreen' || e.keyCode === 44 || e.code === 'PrintScreen') {
        e.preventDefault();
        e.stopPropagation();
        triggerTermination('Screenshot attempt detected (PrintScreen key pressed)! Capturing exam questions violates copyright and testing security.');
        return false;
      }

      // Windows Snipping Tool (Win+Shift+S / Ctrl+Shift+S)
      if ((e.key === 'S' || e.key === 's' || e.code === 'KeyS') && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        triggerTermination('Screen capture tool detected (Snipping Tool shortcut)! Capturing exam questions violates testing integrity.');
        return false;
      }

      // Mac Screenshot (Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5)
      if (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        triggerTermination('Mac screen capture shortcut detected (Cmd+Shift+3/4/5)! Capturing exam questions is strictly prohibited.');
        return false;
      }

      // F12 Developer Tools
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        triggerTermination('Developer inspection tools detected (F12 key pressed)! Inspecting application source is strictly prohibited.');
        return false;
      }

      // Ctrl+Shift+I / J / C (DevTools console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        triggerTermination('Developer console shortcut detected! Inspecting application state is strictly prohibited.');
        return false;
      }

      // Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        e.stopPropagation();
        triggerTermination('View source shortcut detected (Ctrl+U)!');
        return false;
      }

      // Ctrl+P (Print / PDF save)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        e.stopPropagation();
        triggerTermination('Print / PDF capture command detected (Ctrl+P)!');
        return false;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'PrintScreen' || e.keyCode === 44 || e.code === 'PrintScreen') {
        e.preventDefault();
        triggerTermination('Screenshot attempt detected (PrintScreen key released)!');
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleBeforePrint = (e) => {
      e.preventDefault();
      triggerTermination('Browser print command detected!');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('beforeprint', handleBeforePrint);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('beforeprint', handleBeforePrint);
    };
  }, [testState, mockType, startTime]);

  // Request fullscreen mode helper
  const tryEnterFullscreen = () => {
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch (e) {
      // safe fallback
    }
  };

  // Launch pre-agreement or standard start
  const handleInitiateMock = (type) => {
    if (type === 'hard100') {
      setMockType('hard100');
      setAgreementChecked(false);
      setTestState('proctor_agreement');
    } else {
      startMockTest(type);
    }
  };

  // Generate questions and start test
  const startMockTest = (type) => {
    let pool = [];
    let allocatedTime = 300; // 5 mins default

    if (type === 'hard100') {
      // 100 Hard-Level Questions across all domains
      pool = [...HARD_MOCK_100_QUESTIONS];
      allocatedTime = 7200; // 2 Hours (120 minutes)
      tryEnterFullscreen();
    } else if (type === 'topic') {
      const cLevel = LEVELS_DATA.find(l => l.id === 5) || LEVELS_DATA[0];
      pool = [...(cLevel.assessments || [])];
    } else if (type === 'level') {
      const lvl = LEVELS_DATA.find(l => l.id === (initialConfig?.levelId || 5)) || LEVELS_DATA[4];
      pool = [...(lvl.assessments || [])];
    } else if (type === 'domain') {
      [4, 6, 15].forEach(id => {
        const l = LEVELS_DATA.find(lvl => lvl.id === id);
        if (l?.assessments) pool.push(...l.assessments);
      });
    } else {
      // Placement or Grand Mock
      LEVELS_DATA.forEach(lvl => {
        if (lvl.assessments) pool.push(...lvl.assessments);
      });
    }

    // For standard tests, pick 5 to 8 questions; for hard100, use full 100 questions
    const finalQuestions = type === 'hard100'
      ? pool
      : [...pool].sort(() => Math.random() - 0.5).slice(0, 5);

    setTestQuestions(finalQuestions);
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setActiveQuestionIdx(0);
    setTimeRemaining(allocatedTime);
    setTotalAllocatedSeconds(allocatedTime);
    setStartTime(Date.now());
    setTerminationReason('');
    setShowGridModal(false);
    setShowSubmitConfirm(false);
    setTestState('in_progress');
    playAudio('levelup');
  };

  const selectAnswer = (ansIdx) => {
    playAudio('click');
    setUserAnswers(prev => ({ ...prev, [activeQuestionIdx]: ansIdx }));
  };

  const toggleFlagQuestion = (idx) => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const finishMockTest = () => {
    setShowSubmitConfirm(false);
    setShowGridModal(false);

    const elapsedSeconds = Math.round((Date.now() - (startTime || Date.now())) / 1000);
    let correctCount = 0;
    const weakTopics = [];

    testQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      } else {
        weakTopics.push(`Q${idx + 1} (${q.domain || 'Core'}): ${q.question.slice(0, 50)}...`);
      }
    });

    const accuracy = Math.round((correctCount / testQuestions.length) * 100);
    const resultObj = {
      id: 'mock-' + Date.now(),
      type: mockType,
      score: correctCount,
      total: testQuestions.length,
      percentage: accuracy,
      status: accuracy >= 70 ? 'PASSED' : 'NEEDS PRACTICE',
      timeSpent: `${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s`,
      weakAreas: weakTopics.slice(0, 8),
      recommendation: accuracy >= 80
        ? 'Elite FAANG standard achieved! You possess extraordinary mastery of systems, architecture, and engineering principles.'
        : accuracy >= 60
        ? 'Solid performance! Review weak domains and practice live coding challenges to push towards Tier-1 readiness.'
        : 'Recommended: Revisit core fundamentals in the Notes Engine and Live IDE before attempting again.',
      timestamp: Date.now()
    };

    setTestResult(resultObj);
    recordMockAttempt(resultObj);
    setTestState('result');

    if (accuracy >= 70) {
      triggerConfetti();
      playAudio('badge');
    } else {
      playAudio('error');
    }
  };

  const formatTimer = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = testQuestions.length - answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md select-none">
      <div className="relative w-full max-w-xl bg-[#0d1222] border border-[#212a45] rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className={`p-1.5 rounded-xl ${mockType === 'hard100' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>
              {mockType === 'hard100' ? <Flame className="w-5 h-5 text-rose-400" /> : <Target className="w-5 h-5" />}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm text-white">
                  MOCK ASSESSMENT CENTER
                </h3>
                {mockType === 'hard100' && testState === 'in_progress' && (
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
                    PROCTORED LIVE
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400">
                FAANG Standard Timed Evaluations • Powered by Kapil
              </p>
            </div>
          </div>

          {testState !== 'in_progress' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: MODE SELECTION CONFIGURATION                      */}
        {/* ========================================================= */}
        {testState === 'config' && (
          <div className="py-4 space-y-4">
            {/* FEATURED: HARD 100 MCQ 2-HOUR PROCTORED CHALLENGE */}
            <div 
              onClick={() => setMockType('hard100')}
              className={`relative overflow-hidden rounded-3xl p-4 border transition-all cursor-pointer ${
                mockType === 'hard100'
                  ? 'bg-gradient-to-r from-rose-950/40 via-[#181124] to-amber-950/30 border-rose-500 shadow-xl shadow-rose-500/15 ring-2 ring-rose-500/30'
                  : 'bg-gradient-to-r from-rose-950/20 via-[#0e1322] to-slate-900 border-rose-500/40 hover:border-rose-400'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-2xl shadow-lg shadow-rose-500/30 shrink-0">
                    🔥
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-slate-950 font-mono">
                        STRICT PROCTOR
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                        2 HOURS • 100 MCQs
                      </span>
                    </div>
                    <h4 className="font-black text-sm sm:text-base text-white mt-1">
                      HARD LEVEL PROCTORED MOCK
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      100 Hard MCQs across all 25 levels. Zero-tolerance tab switch and screenshot termination.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-rose-400 shrink-0" />
              </div>
            </div>

            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider pt-1">
              Or Choose Standard Timed Mocks (5 Mins):
            </h4>

            <div className="space-y-2">
              {[
                { id: 'placement', title: 'Placement Mock', desc: 'Industry-standard mixed technical assessment', icon: '💼', badge: 'FAANG STD' },
                { id: 'level', title: 'Level Mock', desc: 'Targeted test across current level competencies', icon: '🪐', badge: 'LEVEL TEST' },
                { id: 'domain', title: 'Domain Mock', desc: 'Systems: OS + Database + Computer Networking', icon: '🌐', badge: 'MULTI-SKILL' },
                { id: 'topic', title: 'Topic Mock', desc: 'Deep dive into C Programming & Pointers', icon: '💻', badge: 'FOCUS' },
                { id: 'grand', title: 'Grand Multiverse Mock', desc: 'Cross-cutting test across all 25 levels', icon: '🌌', badge: 'ULTIMATE' },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setMockType(m.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    mockType === m.id
                      ? 'bg-amber-500/15 border-amber-400 shadow-md shadow-amber-500/15'
                      : 'bg-[#12182c] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{m.icon}</span>
                    <div>
                      <h5 className="font-bold text-xs text-white">{m.title}</h5>
                      <p className="text-[11px] text-slate-400">{m.desc}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-mono">
                    {m.badge}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleInitiateMock(mockType)}
              className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
                mockType === 'hard100'
                  ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white shadow-rose-600/30 hover:brightness-110'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 shadow-amber-500/25'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>
                {mockType === 'hard100' ? 'PROCEED TO PROCTOR PROTOCOL (100 MCQs)' : 'START TIMED MOCK ASSESSMENT'}
              </span>
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: PROCTOR PROTOCOL AGREEMENT (HARD 100 MOCK ONLY)   */}
        {/* ========================================================= */}
        {testState === 'proctor_agreement' && (
          <div className="py-4 space-y-4">
            <div className="text-center space-y-1">
              <div className="w-14 h-14 mx-auto rounded-3xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-3xl shadow-xl shadow-rose-500/20">
                🛡️
              </div>
              <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block pt-2">
                FAANG ANTI-CHEAT PROCTORING AGREEMENT
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Zero-Tolerance Examination Protocol
              </h3>
              <p className="text-xs text-slate-400">
                100 Hard-Level MCQs • 2 Hours (120 Minutes) Total Duration
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-300 block">1. NO TAB SWITCHING OR WINDOW BLUR</strong>
                  <span className="text-[11px] text-slate-400">
                    Switching browser tabs, minimizing the window, or clicking outside will <strong>TERMINATE AND CANCEL</strong> the examination immediately.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-300 block">2. NO SCREENSHOTS OR SCREEN CAPTURES</strong>
                  <span className="text-[11px] text-slate-400">
                    Pressing <strong>PrintScreen</strong>, Windows Snipping Tool (<strong>Win+Shift+S</strong>), or Mac capture keys triggers instant disqualification.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-300 block">3. NO DEVTOOLS, RIGHT-CLICK OR PRINTING</strong>
                  <span className="text-[11px] text-slate-400">
                    F12, developer consoles, right-click context menus, and print shortcuts are blocked and logged.
                  </span>
                </div>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div 
              onClick={() => setAgreementChecked(!agreementChecked)}
              className="p-3.5 rounded-2xl bg-[#090d1a] border border-slate-800 flex items-center gap-3 cursor-pointer hover:border-slate-700 transition-colors"
            >
              <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                agreementChecked ? 'bg-rose-500 border-rose-400 text-white' : 'border-slate-700 bg-slate-900'
              }`}>
                {agreementChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs text-slate-200 font-semibold select-none">
                I understand that any tab switch or screenshot attempt will immediately terminate my exam.
              </span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setTestState('config')}
                className="py-3 px-4 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer hover:bg-slate-700"
              >
                Back
              </button>

              <button
                type="button"
                disabled={!agreementChecked}
                onClick={() => startMockTest('hard100')}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white font-black text-xs uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-rose-600/25 cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>START 2-HOUR HARD MOCK NOW</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: IN PROGRESS EXAMINATION                           */}
        {/* ========================================================= */}
        {testState === 'in_progress' && testQuestions.length > 0 && (
          <div className="py-3 space-y-3.5">
            {/* Top Examination HUD */}
            <div className="flex items-center justify-between bg-[#12182c] p-3 rounded-2xl border border-slate-800">
              {/* Timer */}
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${timeRemaining < 300 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
                <span className={`font-mono text-sm font-black ${timeRemaining < 300 ? 'text-rose-400' : 'text-white'}`}>
                  {formatTimer(timeRemaining)}
                </span>
                {mockType === 'hard100' && (
                  <span className="text-[9px] font-mono text-slate-400 hidden sm:inline">
                    / 02:00:00
                  </span>
                )}
              </div>

              {/* Center: Proctor Security Indicator */}
              {mockType === 'hard100' && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[10px] font-extrabold uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  <span>PROCTOR SECURED</span>
                </div>
              )}

              {/* Right: Question Counter & Grid Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-mono font-bold">
                  Q {activeQuestionIdx + 1} / {testQuestions.length}
                </span>

                {mockType === 'hard100' && (
                  <button
                    onClick={() => setShowGridModal(true)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors"
                    title="Open 100 Question Grid"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Question Card */}
            <div className="p-4 rounded-2xl bg-[#141b31]/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                    QUESTION {activeQuestionIdx + 1}
                  </span>
                  {testQuestions[activeQuestionIdx].domain && (
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {testQuestions[activeQuestionIdx].domain}
                    </span>
                  )}
                  {testQuestions[activeQuestionIdx].difficulty && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 uppercase">
                      HARD
                    </span>
                  )}
                </div>

                {/* Flag / Review Button */}
                <button
                  type="button"
                  onClick={() => toggleFlagQuestion(activeQuestionIdx)}
                  className={`text-[10px] font-bold px-2 py-1 rounded-lg border flex items-center gap-1 transition-all cursor-pointer ${
                    flaggedQuestions.has(activeQuestionIdx)
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Bookmark className={`w-3 h-3 ${flaggedQuestions.has(activeQuestionIdx) ? 'fill-purple-400 text-purple-400' : ''}`} />
                  <span>{flaggedQuestions.has(activeQuestionIdx) ? 'Flagged' : 'Flag'}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm font-bold text-white leading-relaxed whitespace-pre-wrap pt-1">
                {testQuestions[activeQuestionIdx].question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {testQuestions[activeQuestionIdx].options.map((opt, idx) => {
                const isSelected = userAnswers[activeQuestionIdx] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectAnswer(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-sm'
                        : 'bg-[#12182c] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={activeQuestionIdx === 0}
                onClick={() => setActiveQuestionIdx(prev => Math.max(0, prev - 1))}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 disabled:opacity-30 cursor-pointer hover:bg-slate-700"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-2">
                {mockType === 'hard100' && (
                  <button
                    onClick={() => setShowGridModal(true)}
                    className="px-3 py-2 rounded-xl bg-[#141b31] border border-slate-700 text-xs font-bold text-amber-300 cursor-pointer flex items-center gap-1"
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Palette</span>
                  </button>
                )}

                {activeQuestionIdx + 1 < testQuestions.length ? (
                  <button
                    onClick={() => setActiveQuestionIdx(prev => prev + 1)}
                    className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-extrabold cursor-pointer hover:bg-amber-300 shadow-md"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmitConfirm(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-black cursor-pointer shadow-md"
                  >
                    Submit Exam
                  </button>
                )}
              </div>
            </div>

            {/* Finish Early button for 100 MCQ test */}
            {mockType === 'hard100' && (
              <div className="pt-2 text-center">
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="text-xs text-slate-400 hover:text-amber-400 underline font-semibold cursor-pointer"
                >
                  Finished? Submit 100-Question Exam Early ({answeredCount}/100 Answered)
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: TERMINATED / CANCELLED (ANTI-CHEAT TRIGGERED)     */}
        {/* ========================================================= */}
        {testState === 'terminated' && (
          <div className="py-4 space-y-5 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center text-4xl shadow-2xl shadow-rose-600/30 animate-bounce">
              🚨
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-black text-rose-400 uppercase tracking-widest block">
                EXAM TERMINATED & CANCELLED
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                DISQUALIFIED (0% SCORE)
              </h3>
              <p className="text-xs text-rose-300 font-bold">
                FAANG Zero-Tolerance Anti-Cheating Protocol Triggered
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/60 text-left space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-rose-400">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span className="uppercase tracking-wider">VIOLATION REPORT:</span>
              </div>
              <p className="text-xs text-white leading-relaxed font-mono">
                {terminationReason || 'Suspicious window focus change or screen capture attempted.'}
              </p>
              <p className="text-[11px] text-slate-400 pt-1">
                The Hard-Level Assessment is strictly proctored. Opening other tabs, minimizing the browser, taking screenshots, or accessing developer tools immediately invalidates testing integrity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setTestState('config')}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Menu</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 5: RESULT SCORECARD                                  */}
        {/* ========================================================= */}
        {testState === 'result' && testResult && (
          <div className="py-4 space-y-4">
            <div className={`text-center p-5 rounded-3xl border ${
              testResult.percentage >= 70
                ? 'bg-gradient-to-br from-emerald-500/10 via-[#12182c] to-[#070913] border-emerald-500/40'
                : 'bg-gradient-to-br from-amber-500/10 via-[#12182c] to-[#070913] border-amber-500/30'
            }`}>
              <div className="text-3xl mb-1">{testResult.percentage >= 70 ? '🏆' : '🎯'}</div>
              <h4 className="text-lg font-black text-white">Assessment Complete!</h4>
              <div className={`text-3xl font-black font-mono my-2 ${
                testResult.percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {testResult.percentage}%
              </div>
              <p className="text-xs text-slate-300">
                Score: <strong>{testResult.score} / {testResult.total}</strong> • Time Taken: {testResult.timeSpent}
              </p>
              <span className={`inline-block mt-2 text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                testResult.percentage >= 70 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {testResult.status}
              </span>
            </div>

            {/* Recommendation */}
            <div className="p-3.5 rounded-2xl bg-[#12182c] border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                FAANG RECOMMENDATION:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {testResult.recommendation}
              </p>
            </div>

            {/* Weak Areas */}
            {testResult.weakAreas.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>IDENTIFIED WEAK AREAS:</span>
                </div>
                {testResult.weakAreas.map((w, idx) => (
                  <p key={idx} className="text-xs text-slate-400">
                    • {w}
                  </p>
                ))}
              </div>
            )}

            {/* Retake & Done */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setTestState('config')}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Mock</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 100 QUESTION PALETTE MODAL                                */}
      {/* ========================================================= */}
      {showGridModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0d1222] border border-amber-400/50 rounded-3xl p-5 shadow-2xl max-h-[85vh] flex flex-col space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4 text-amber-400" />
                <h4 className="font-extrabold text-sm text-white">
                  100 QUESTION PALETTE
                </h4>
              </div>
              <button
                onClick={() => setShowGridModal(false)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-around text-[10px] text-slate-400 pb-1">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Answered ({answeredCount})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-purple-500" /> Flagged ({flaggedQuestions.size})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-slate-800 border border-slate-700" /> Unanswered ({unansweredCount})
              </span>
            </div>

            {/* The 100 Buttons Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-10 gap-1.5 p-1">
              {testQuestions.map((_, idx) => {
                const isCurrent = activeQuestionIdx === idx;
                const isAnswered = userAnswers[idx] !== undefined;
                const isFlagged = flaggedQuestions.has(idx);

                let bgClass = 'bg-slate-900 border-slate-800 text-slate-400';
                if (isFlagged) {
                  bgClass = 'bg-purple-600/30 border-purple-400 text-purple-200';
                } else if (isAnswered) {
                  bgClass = 'bg-emerald-600/30 border-emerald-400 text-emerald-200';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveQuestionIdx(idx);
                      setShowGridModal(false);
                    }}
                    className={`h-8 rounded-lg border text-[11px] font-bold font-mono transition-transform hover:scale-105 cursor-pointer ${bgClass} ${
                      isCurrent ? 'ring-2 ring-amber-400 font-black' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowGridModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
            >
              Close Palette
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBMIT CONFIRMATION MODAL                                 */}
      {/* ========================================================= */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-sm bg-[#0d1222] border border-amber-400/60 rounded-3xl p-5 shadow-2xl space-y-3.5 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl">
              📝
            </div>
            <h4 className="text-base font-black text-white">Ready to Submit Exam?</h4>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <p>• Answered: <strong className="text-emerald-400">{answeredCount} / {testQuestions.length}</strong></p>
              <p>• Unanswered: <strong className="text-rose-400">{unansweredCount}</strong></p>
              <p>• Flagged for Review: <strong className="text-purple-400">{flaggedQuestions.size}</strong></p>
              <p>• Time Remaining: <strong className="text-amber-400">{formatTimer(timeRemaining)}</strong></p>
            </div>
            <p className="text-[11px] text-slate-400">
              Once submitted, your answers will be evaluated and your scorecard recorded.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
              >
                Keep Testing
              </button>
              <button
                type="button"
                onClick={finishMockTest}
                className="py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs uppercase"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
