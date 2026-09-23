import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { Rocket, Sparkles, Shield, Cpu, Compass } from 'lucide-react';

export default function OnboardingScreen() {
  const { setOnboarded } = useLearner();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name to embark on your Multiverse journey');
      return;
    }
    setOnboarded(name.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-space bg-black/90 backdrop-blur-xl overflow-y-auto">
      {/* Decorative celestial background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#0d1222]/95 border border-[#212942] rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
        {/* Emblem */}
        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-sky-400 p-0.5 shadow-xl shadow-amber-500/20 animate-float">
          <div className="w-full h-full bg-[#07080f] rounded-2xl flex items-center justify-center">
            <span className="text-3xl">🌌</span>
          </div>
        </div>

        {/* Title & Brand */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white m-0">
          KNOWLEDGE MULTIVERSE
        </h1>
        <div className="inline-block mt-1 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase">
          Powered By Kapil
        </div>

        <p className="text-slate-300 text-sm mt-3 font-medium">
          From Zero To Expert — One Level At A Time.
        </p>
        <p className="text-slate-400 text-xs mt-1">
          25 Structured Levels • FAANG Standard Curriculum • Hands-On IDE
        </p>

        {/* Philosophy Card */}
        <div className="my-5 p-3 rounded-2xl bg-[#12182c]/80 border border-slate-800 text-left space-y-1.5 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero-Friction Philosophy</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            No prior knowledge. No complicated registration. Enter your name only and immediately launch your learning journey.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label htmlFor="name-input" className="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">
              Enter Your Name
            </label>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Alex Rivera"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-[#090d1a] border border-[#273150] text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all"
            />
            {error && <p className="text-xs text-rose-400 mt-1.5 text-left ml-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Rocket className="w-4 h-4 fill-slate-950" />
            <span>BEGIN MY JOURNEY</span>
          </button>
        </form>

        <div className="mt-5 flex items-center justify-center gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>Progress Saved Locally</span>
          </div>
          <div className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-sky-400" />
            <span>Offline Capable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
