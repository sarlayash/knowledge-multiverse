import React, { useState, useEffect } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { LEVELS_DATA } from '../../data/curriculumData';
import { Target, Clock, Award, CheckCircle2, AlertTriangle, ArrowRight, Play, RotateCcw, X, Sparkles } from 'lucide-react';

export default function MockTestCenter({ initialConfig, onClose }) {
  const { recordMockAttempt, playAudio, triggerConfetti } = useLearner();
  const [testState, setTestState] = useState('config'); // 'config' | 'in_progress' | 'result'
  const [mockType, setMockType] = useState(initialConfig?.type || 'placement');
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 mins in seconds
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [testQuestions, setTestQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [testResult, setTestResult] = useState(null);
  const [startTime, setStartTime] = useState(null);

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

  // Generate randomized questions based on mock mode
  const startMockTest = (type) => {
    let pool = [];
    if (type === 'topic') {
      const cLevel = LEVELS_DATA.find(l => l.id === 5) || LEVELS_DATA[0];
      pool = [...(cLevel.assessments || [])];
    } else if (type === 'level') {
      const lvl = LEVELS_DATA.find(l => l.id === (initialConfig?.levelId || 5)) || LEVELS_DATA[4];
      pool = [...(lvl.assessments || [])];
    } else if (type === 'domain') {
      // OS (4) + DBMS (6) + Networking (15)
      [4, 6, 15].forEach(id => {
        const l = LEVELS_DATA.find(lvl => lvl.id === id);
        if (l?.assessments) pool.push(...l.assessments);
      });
    } else {
      // Placement or Grand Mock: pool across all levels
      LEVELS_DATA.forEach(lvl => {
        if (lvl.assessments) pool.push(...lvl.assessments);
      });
    }

    // Shuffle and pick 5 to 8 questions
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
    setTestQuestions(shuffled);
    setUserAnswers({});
    setActiveQuestionIdx(0);
    setTimeRemaining(300); // 5 mins
    setStartTime(Date.now());
    setTestState('in_progress');
    playAudio('levelup');
  };

  const selectAnswer = (ansIdx) => {
    playAudio('click');
    setUserAnswers(prev => ({ ...prev, [activeQuestionIdx]: ansIdx }));
  };

  const finishMockTest = () => {
    const elapsedSeconds = Math.round((Date.now() - (startTime || Date.now())) / 1000);
    let correctCount = 0;
    const weakTopics = [];

    testQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      } else {
        weakTopics.push(q.question.slice(0, 40) + '...');
      }
    });

    const accuracy = Math.round((correctCount / testQuestions.length) * 100);
    const resultObj = {
      id: 'mock-' + Date.now(),
      type: mockType,
      score: correctCount,
      total: testQuestions.length,
      percentage: accuracy,
      timeSpent: `${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s`,
      weakAreas: weakTopics,
      recommendation: accuracy >= 80
        ? 'Excellent industry readiness! Ready for FAANG technical interviews.'
        : 'Recommended: Revisit core fundamentals and practice Live IDE test cases.',
      timestamp: Date.now()
    };

    setTestResult(resultObj);
    recordMockAttempt(resultObj);
    setTestState('result');

    if (accuracy >= 80) {
      triggerConfetti();
      playAudio('badge');
    } else {
      playAudio('error');
    }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0d1222] border border-[#212a45] rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
              <Target className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm text-white">
                MOCK ASSESSMENT CENTER
              </h3>
              <p className="text-[10px] text-slate-400">
                FAANG Standard Timed Evaluations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* MODE 1: CONFIGURATION */}
        {testState === 'config' && (
          <div className="py-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Select Assessment Mode:
            </h4>

            <div className="space-y-2.5">
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
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    mockType === m.id
                      ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/15'
                      : 'bg-[#12182c] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-white">{m.title}</h5>
                      <p className="text-[11px] text-slate-400">{m.desc}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-mono">
                    {m.badge}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
              <p>⏱️ <strong>Format:</strong> 5 Randomized Questions • 5 Minute Countdown Timer</p>
              <p>📊 <strong>Scoring:</strong> Automatic accuracy, time breakdown & weak area detection</p>
            </div>

            <button
              onClick={() => startMockTest(mockType)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>START TIMED MOCK ASSESSMENT</span>
            </button>
          </div>
        )}

        {/* MODE 2: IN PROGRESS */}
        {testState === 'in_progress' && testQuestions.length > 0 && (
          <div className="py-4 space-y-4">
            {/* Timer & Question Progress Bar */}
            <div className="flex items-center justify-between bg-[#12182c] p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Clock className="w-4 h-4 animate-pulse" />
                <span className="font-mono text-sm">{formatTimer(timeRemaining)}</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Q {activeQuestionIdx + 1} of {testQuestions.length}
              </span>
            </div>

            {/* Question prompt */}
            <div className="p-4 rounded-2xl bg-[#141b31]/70 border border-slate-800">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Question {activeQuestionIdx + 1}
              </span>
              <p className="text-sm font-bold text-white whitespace-pre-wrap">
                {testQuestions[activeQuestionIdx].question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {testQuestions[activeQuestionIdx].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => selectAnswer(idx)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                    userAnswers[activeQuestionIdx] === idx
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                      : 'bg-[#12182c] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Question Navigator */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={activeQuestionIdx === 0}
                onClick={() => setActiveQuestionIdx(prev => Math.max(0, prev - 1))}
                className="px-3 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 disabled:opacity-30 cursor-pointer"
              >
                Previous
              </button>

              {activeQuestionIdx + 1 < testQuestions.length ? (
                <button
                  onClick={() => setActiveQuestionIdx(prev => prev + 1)}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-extrabold cursor-pointer"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={finishMockTest}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-extrabold cursor-pointer"
                >
                  Submit Mock
                </button>
              )}
            </div>
          </div>
        )}

        {/* MODE 3: RESULT SCORECARD */}
        {testState === 'result' && testResult && (
          <div className="py-4 space-y-4">
            <div className="text-center p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-[#12182c] to-[#070913] border border-amber-500/30">
              <div className="text-3xl mb-1">🎯</div>
              <h4 className="text-lg font-black text-white">Assessment Complete!</h4>
              <div className="text-3xl font-black text-amber-400 font-mono my-2">
                {testResult.percentage}%
              </div>
              <p className="text-xs text-slate-300">
                Score: <strong>{testResult.score} / {testResult.total}</strong> • Time: {testResult.timeSpent}
              </p>
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

            {/* Retake */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setTestState('config')}
                className="py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Mock</span>
              </button>

              <button
                onClick={onClose}
                className="py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
