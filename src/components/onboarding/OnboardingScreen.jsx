import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { PERSONAS } from '../../data/personaData';
import { 
  Rocket, Sparkles, Shield, Cpu, Download, Eye, 
  CheckCircle2, ArrowRight, ArrowLeft, X, Smartphone,
  BookOpen, Award, Target, HelpCircle, Check, Compass
} from 'lucide-react';
import InstallGuideModal from '../common/InstallGuideModal';

export default function OnboardingScreen() {
  const { setOnboarded } = useLearner();

  // Wizard state: 1 = Choose Persona, 2 = Name & Goal, 3 = Diagnostic Assessment
  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState('college'); // 'school' | 'college' | 'professional'
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');

  // Diagnostic Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qId]: selectedIndex }
  const [quizFinished, setQuizFinished] = useState(false);

  // Modals
  const [showFullPoster, setShowFullPoster] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  const activePersonaObj = PERSONAS[persona] || PERSONAS.college;

  // Step 1 -> Step 2
  const handleSelectPersona = (selectedId) => {
    setPersona(selectedId);
    // set default goal for this persona
    const defaultGoal = PERSONAS[selectedId].goals[0].id;
    setGoal(defaultGoal);
    setStep(2);
    setError('');
  };

  // Step 2 Validation
  const handleProceedFromStep2 = (shouldTakeDiagnostic) => {
    if (!name.trim()) {
      setError('Please enter your name to personalize your Multiverse track');
      return;
    }
    setError('');
    if (shouldTakeDiagnostic) {
      setQuizIndex(0);
      setAnswers({});
      setQuizFinished(false);
      setStep(3);
    } else {
      // Launch immediately
      setOnboarded(name.trim(), persona, goal, null);
    }
  };

  // Step 3 Quiz Handlers
  const handleSelectAnswer = (optionIdx) => {
    const currentQ = activePersonaObj.diagnosticQuiz[quizIndex];
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionIdx }));
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex < activePersonaObj.diagnosticQuiz.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const calculateQuizScore = () => {
    let score = 0;
    activePersonaObj.diagnosticQuiz.forEach(q => {
      if (answers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleFinishOnboardingWithQuiz = () => {
    const score = calculateQuizScore();
    const total = activePersonaObj.diagnosticQuiz.length;
    const percentage = Math.round((score / total) * 100);
    const diagnosticResult = {
      score,
      total,
      percentage,
      date: new Date().toISOString()
    };
    setOnboarded(name.trim(), persona, goal, diagnosticResult);
  };

  const domainBadges = [
    { title: 'Foundations', icon: '🌍' },
    { title: 'Programming', icon: '💻' },
    { title: 'Database', icon: '🗄️' },
    { title: 'Web Systems', icon: '🌐' },
    { title: 'Agile & DevOps', icon: '⚙️' },
    { title: 'Cloud & Security', icon: '☁️' },
    { title: 'AI & GenAI', icon: '🤖' },
    { title: 'Placements', icon: '🚀' }
  ];

  return (
    <div className="min-h-screen bg-deep-space text-slate-100 flex flex-col items-center justify-start p-4 pb-12 selection:bg-amber-400 selection:text-slate-950">
      {/* Background celestial glows */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-lg mx-auto space-y-4">
        {/* Top Tagline from Poster */}
        <div className="flex items-center justify-between pt-2 px-1">
          <div className="text-left">
            <span className="text-[11px] font-black text-amber-400 uppercase tracking-widest block">
              Same Mission • Bigger Impact
            </span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-semibold">
              Empowering Learners • Building Brighter Futures
            </span>
          </div>

          <button
            onClick={() => setShowInstallGuide(true)}
            className="py-1 px-3 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 text-[10px] font-extrabold uppercase flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Smartphone className="w-3 h-3 text-amber-400" />
            <span>Install App</span>
          </button>
        </div>

        {/* Featured Hero: Official Launch Poster Showcase */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/60 shadow-2xl shadow-amber-500/20 group">
          <div className="relative aspect-[3/4] w-full max-h-[420px] overflow-hidden bg-black">
            <img
              src="./poster.jpg"
              alt="Knowledge Multiverse — Powered By Kapil"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1222] via-transparent to-black/20" />

            <button
              onClick={() => setShowFullPoster(true)}
              className="absolute top-3 right-3 py-1.5 px-3 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-amber-400/50 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Poster</span>
            </button>
          </div>

          {/* Callout Header */}
          <div className="p-4 bg-[#0d1222] border-t border-amber-400/30 text-center space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 tracking-tight">
              KNOWLEDGE MULTIVERSE
            </h1>
            <div className="inline-block px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Powered By Kapil
            </div>
            <p className="text-xs text-slate-300 font-medium pt-0.5">
              ZERO TO EXPERT — LEVEL 1 TO LEVEL 25
            </p>
            <p className="text-[11px] text-sky-400 font-mono">
              Tailored For School • College • Working Professionals
            </p>
          </div>
        </div>

        {/* 8 Feature Domains matching the Poster */}
        <div className="grid grid-cols-4 gap-2 py-0.5">
          {domainBadges.map((b, i) => (
            <div
              key={i}
              className="p-2 rounded-xl bg-[#0d1222] border border-slate-800 text-center space-y-0.5"
            >
              <span className="text-base block">{b.icon}</span>
              <span className="text-[9px] font-bold text-slate-300 block line-clamp-1 leading-tight">
                {b.title}
              </span>
            </div>
          ))}
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2.5 rounded-2xl bg-[#12182c] border border-slate-800 text-center">
            <span className="text-base font-black text-amber-400 font-mono block">25</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase">LEVELS</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#12182c] border border-slate-800 text-center">
            <span className="text-base font-black text-sky-400 font-mono block">1000+</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase">CONCEPTS</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#12182c] border border-slate-800 text-center">
            <span className="text-base font-black text-emerald-400 font-mono block">FAANG</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase">PRACTICAL</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: ARE YOU IN SCHOOL, COLLEGE, OR A WORKING PROFESSIONAL?             */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="rounded-3xl bg-gradient-to-b from-[#11172e] via-[#0d1222] to-[#070913] border-2 border-amber-400/50 p-5 shadow-2xl space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black text-amber-400 tracking-widest uppercase">
                STEP 1 OF 3 • YOUR JOURNEY STARTS HERE
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Choose Your Current Path
              </h2>
              <p className="text-xs text-slate-400">
                All 25 modules adapt to your learning level & mindset
              </p>
            </div>

            <div className="space-y-3">
              {/* School Card */}
              <button
                type="button"
                onClick={() => handleSelectPersona('school')}
                className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between group ${
                  persona === 'school'
                    ? 'bg-sky-950/40 border-sky-400 ring-2 ring-sky-400/40'
                    : 'bg-[#0a0f1d] border-slate-800 hover:border-sky-500/50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                    🎒
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-sm text-white">School Student</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300">
                        Class 6 - 12
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">
                      Junior Tech Prodigy & Future Creator
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Learn computational logic, fun games & apps, and explore AI safely.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-sky-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* College Card */}
              <button
                type="button"
                onClick={() => handleSelectPersona('college')}
                className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between group ${
                  persona === 'college'
                    ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/40'
                    : 'bg-[#0a0f1d] border-slate-800 hover:border-amber-500/50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                    🎓
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-sm text-white">College Student</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                        Degree / B.Tech / BCA
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">
                      Campus to FAANG & Software Engineering
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Crack product placements, master CS fundamentals (OS/DBMS/CN), DSA & portfolio.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-amber-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Working Professional Card */}
              <button
                type="button"
                onClick={() => handleSelectPersona('professional')}
                className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between group ${
                  persona === 'professional'
                    ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-400/40'
                    : 'bg-[#0a0f1d] border-slate-800 hover:border-emerald-500/50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                    💼
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-sm text-white">Working Professional</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                        Upskilling / Transition
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">
                      Career Transition & Tech Architect Track
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Transition to high-paying engineering, Cloud, DevOps CI/CD, and enterprise GenAI.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-500">
              💡 You will have access to all 25 levels regardless of choice, with tailored recommendations.
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: ASK NAME & TARGET GOAL                                            */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div className="rounded-3xl bg-gradient-to-b from-[#11172e] via-[#0d1222] to-[#070913] border-2 border-amber-400/50 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Path</span>
              </button>
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r ${activePersonaObj.badgeGradient} text-slate-950 font-bold uppercase`}>
                {activePersonaObj.badgeText}
              </span>
            </div>

            <div className="text-center space-y-1">
              <span className="text-[10px] font-black text-amber-400 tracking-widest uppercase">
                STEP 2 OF 3 • YOUR PROFILE
              </span>
              <h2 className="text-lg font-black text-white">
                Personalize Your Multiverse
              </h2>
              <p className="text-xs text-slate-400">
                {activePersonaObj.mindset}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="learner-name-step2" className="block text-xs font-semibold text-slate-300 mb-1 ml-1">
                  What should we call you?
                </label>
                <input
                  id="learner-name-step2"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. Kapil Narula"
                  autoFocus
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#070913] border border-[#273150] text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm font-medium transition-all"
                />
                {error && <p className="text-xs text-rose-400 mt-1.5 ml-1">{error}</p>}
              </div>

              {/* Goal Selection Pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">
                  Select Your Primary Mindset / Focus:
                </label>
                <div className="space-y-2">
                  {activePersonaObj.goals.map((g) => {
                    const isSelected = goal === g.id;
                    return (
                      <div
                        key={g.id}
                        onClick={() => setGoal(g.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400/80 text-white'
                            : 'bg-[#090d1a] border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1.5">
                            <span className={isSelected ? 'text-amber-400' : 'text-slate-400'}>
                              {isSelected ? '★' : '•'}
                            </span>
                            <span>{g.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 ml-3">
                            {g.desc}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 ml-2" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions: Take Diagnostic OR Skip */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleProceedFromStep2(true)}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm tracking-wider shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer"
                >
                  <Target className="w-4 h-4" />
                  <span>TAKE 1-MIN DIAGNOSTIC QUIZ (RECOMMENDED) →</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleProceedFromStep2(false)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Rocket className="w-3.5 h-3.5 text-amber-400" />
                  <span>SKIP QUIZ & START LEVEL 1 DIRECTLY</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: 1-MINUTE DIAGNOSTIC ASSESSMENT                                    */}
        {/* ========================================================================= */}
        {step === 3 && (
          <div className="rounded-3xl bg-gradient-to-b from-[#11172e] via-[#0d1222] to-[#070913] border-2 border-amber-400/50 p-5 shadow-2xl space-y-4">
            {!quizFinished ? (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    <span>DIAGNOSTIC QUESTION {quizIndex + 1} OF {activePersonaObj.diagnosticQuiz.length}</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {activePersonaObj.title}
                  </span>
                </div>

                {/* Question */}
                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                    {activePersonaObj.diagnosticQuiz[quizIndex].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2">
                    {activePersonaObj.diagnosticQuiz[quizIndex].options.map((opt, oIdx) => {
                      const isSelected = answers[activePersonaObj.diagnosticQuiz[quizIndex].id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectAnswer(oIdx)}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                              : 'bg-[#090d1a] border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quiz Bottom Action */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleProceedFromStep2(false)}
                    className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
                  >
                    Skip to Level 1
                  </button>

                  <button
                    type="button"
                    disabled={answers[activePersonaObj.diagnosticQuiz[quizIndex].id] === undefined}
                    onClick={handleNextQuizQuestion}
                    className="py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <span>{quizIndex < activePersonaObj.diagnosticQuiz.length - 1 ? 'Next Question →' : 'See Diagnostic Result →'}</span>
                  </button>
                </div>
              </>
            ) : (
              /* Quiz Finished View */
              <div className="text-center space-y-4 py-2">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/15 border border-amber-400/50 flex items-center justify-center text-3xl shadow-xl shadow-amber-500/20">
                  🎯
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                    MINDSET CALIBRATION COMPLETE
                  </span>
                  <h3 className="text-xl font-black text-white">
                    Score: {calculateQuizScore()} / {activePersonaObj.diagnosticQuiz.length} Correct
                  </h3>
                  <p className="text-xs text-slate-300">
                    {calculateQuizScore() === activePersonaObj.diagnosticQuiz.length
                      ? 'Outstanding aptitude! You are calibrated for accelerated mastery.'
                      : 'Great effort! Your custom Multiverse roadmap is loaded with step-by-step clarity.'}
                  </p>
                </div>

                {/* Explanations summary */}
                <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-3 text-left space-y-2 max-h-48 overflow-y-auto">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Key Concept Takeaways:
                  </span>
                  {activePersonaObj.diagnosticQuiz.map((q, idx) => (
                    <div key={q.id} className="text-xs text-slate-300 border-b border-slate-800/80 pb-1.5 last:border-none">
                      <p className="font-semibold text-white">Q{idx + 1}: {q.options[q.correctIndex]}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{q.explanation}</p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleFinishOnboardingWithQuiz}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm tracking-wider shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer"
                >
                  <Rocket className="w-4 h-4 fill-slate-950" />
                  <span>LAUNCH MY TAILORED MULTIVERSE (+{calculateQuizScore() * 35 + 50} XP) →</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Download App Action Bar from Poster */}
        <button
          onClick={() => setShowInstallGuide(true)}
          className="w-full py-3 px-4 rounded-2xl bg-[#141c33] hover:bg-[#1a2544] border border-slate-700/80 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>DOWNLOAD APP NOW (OFFLINE STANDALONE PWA)</span>
        </button>

        {/* Footer */}
        <div className="pt-2 text-center space-y-1.5 text-xs text-slate-500">
          <div className="text-amber-400/90 font-bold text-[11px] tracking-wide">
            SarlaYash Learning Solutions LLP
          </div>
          <p className="text-[10px] text-slate-500">
            Legacy of Values. Future of Learning.
          </p>
          <div className="flex items-center justify-center gap-2 text-[9px] text-slate-600 font-mono uppercase tracking-widest pt-1">
            <span>Learn</span>
            <span>•</span>
            <span>Grow</span>
            <span>•</span>
            <span>Build</span>
            <span>•</span>
            <span>Get Hired</span>
          </div>
        </div>
      </div>

      {/* FULL POSTER MODAL VIEWER */}
      {showFullPoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/95 backdrop-blur-xl">
          <div className="relative max-w-md w-full max-h-[95vh] overflow-y-auto rounded-3xl border-2 border-amber-400/80 shadow-2xl bg-black">
            <button
              onClick={() => setShowFullPoster(false)}
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

      {/* INSTALL GUIDE MODAL */}
      {showInstallGuide && (
        <InstallGuideModal onClose={() => setShowInstallGuide(false)} />
      )}
    </div>
  );
}
