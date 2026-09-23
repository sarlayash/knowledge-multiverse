import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { 
  Rocket, Sparkles, Shield, Cpu, Download, Eye, 
  CheckCircle2, ArrowRight, X, Smartphone 
} from 'lucide-react';
import InstallGuideModal from '../common/InstallGuideModal';

export default function OnboardingScreen() {
  const { setOnboarded } = useLearner();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showFullPoster, setShowFullPoster] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name to embark on your Multiverse journey');
      return;
    }
    setOnboarded(name.trim());
  };

  const domainBadges = [
    { title: 'IT Fundamentals', icon: '💻' },
    { title: 'Programming', icon: '⚙️' },
    { title: 'Database', icon: '🗄️' },
    { title: 'Web Development', icon: '🌐' },
    { title: 'Cloud & DevOps', icon: '☁️' },
    { title: 'Cybersecurity', icon: '🔐' },
    { title: 'AI & Emerging Tech', icon: '🤖' },
    { title: 'And Much More...', icon: '🚀' }
  ];

  return (
    <div className="min-h-screen bg-deep-space text-slate-100 flex flex-col items-center justify-start p-4 pb-12 selection:bg-amber-400 selection:text-slate-950">
      {/* Decorative celestial background glows */}
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
          <div className="relative aspect-[3/4] w-full max-h-[460px] overflow-hidden bg-black">
            <img
              src="./poster.jpg"
              alt="Knowledge Multiverse — Powered By Kapil"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
            />
            {/* Subtle bottom gradient to merge with form */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1222] via-transparent to-black/20" />

            {/* Quick action pill on poster */}
            <button
              onClick={() => setShowFullPoster(true)}
              className="absolute top-3 right-3 py-1.5 px-3 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-amber-400/50 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Poster</span>
            </button>
          </div>

          {/* Poster Callout Header */}
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
              Learn • Practice • Build • Test • Prove
            </p>
          </div>
        </div>

        {/* 8 Feature Domains matching the Poster */}
        <div className="grid grid-cols-4 gap-2 py-1">
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

        {/* 3 Metric Pills from Poster */}
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

        {/* Action Onboarding Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#11172e] via-[#0d1222] to-[#070913] border-2 border-amber-400/50 p-5 shadow-2xl space-y-4">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-black text-amber-400 tracking-widest uppercase">
              KNOWLEDGE HAS NO LIMITS
            </span>
            <h2 className="text-base sm:text-lg font-black text-white">
              YOUR FUTURE STARTS HERE
            </h2>
            <p className="text-xs text-slate-400">
              No mandatory registration. Enter your name only and begin.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="learner-name-input" className="block text-xs font-semibold text-slate-300 mb-1 ml-1">
                Enter Your Name
              </label>
              <input
                id="learner-name-input"
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

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm tracking-wider shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer"
            >
              <Rocket className="w-4 h-4 fill-slate-950" />
              <span>BEGIN MY JOURNEY →</span>
            </button>
          </form>

          {/* Download App Action Bar from Poster */}
          <button
            onClick={() => setShowInstallGuide(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-[#141c33] hover:bg-[#1a2544] border border-slate-700/80 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>DOWNLOAD APP NOW (OFFLINE PWA)</span>
          </button>
        </div>

        {/* Footer from Poster */}
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
