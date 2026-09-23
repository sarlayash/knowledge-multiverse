import React from 'react';
import { useLearner } from '../../context/LearnerContext';
import { Sparkles, Trophy, Award, Rocket, CheckCircle2, X, Download } from 'lucide-react';

export default function GrandCeremonyModal({ onClose }) {
  const { name, xp, setActiveTab, openModal, triggerConfetti, playAudio } = useLearner();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#18112c] via-[#0d1222] to-[#07080f] border-2 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Golden Trophy Icon with glow */}
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-yellow-400 via-amber-500 to-purple-600 p-1 shadow-2xl shadow-amber-500/40 animate-bounce">
          <div className="w-full h-full bg-[#07080f] rounded-3xl flex items-center justify-center text-4xl">
            🏆
          </div>
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ULTIMATE PINNACLE ACHIEVED</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            YOU HAVE TRAVELLED THE MULTIVERSE!
          </h2>
          <p className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Powered By Kapil
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#12182c]/80 border border-slate-800 text-left text-xs space-y-1.5 text-slate-300">
          <p>🌌 <strong>25 Levels</strong> Conquered from Zero to Expert</p>
          <p>💡 <strong>Hundreds of Concepts</strong> Mastered Across 6 Domains</p>
          <p>💻 <strong>Hands-on Challenges & Test Cases</strong> Executed</p>
          <p>🧪 <strong>Assessments & Timed Mocks</strong> Completed</p>
          <p>🏢 <strong>7 IT Industry Simulations</strong> Resolved</p>
          <p>💼 <strong>10+ Production Projects</strong> Accumulated in Portfolio</p>
          <p>🏅 <strong>11 Collectible Celestial Badges</strong> Unlocked</p>
          <p>🎓 <strong>Verifiable Cryptographic Credentials</strong> Awarded</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs font-bold">
          🎉 Highest Title Unlocked: <strong>KNOWLEDGE MULTIVERSE MASTER</strong>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <button
            onClick={() => {
              onClose();
              setActiveTab('achievements');
            }}
            className="py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-amber-400/25"
          >
            <Trophy className="w-4 h-4 fill-slate-950" />
            <span>Claim Master Certificate</span>
          </button>

          <button
            onClick={() => {
              triggerConfetti();
              playAudio('levelup');
              onClose();
            }}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            Celebrate 🎉
          </button>
        </div>
      </div>
    </div>
  );
}
