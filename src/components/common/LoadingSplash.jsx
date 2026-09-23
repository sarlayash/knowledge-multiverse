import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function LoadingSplash({ onFinished }) {
  const [progress, setProgress] = useState(15);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(55), 400);
    const timer2 = setTimeout(() => setProgress(90), 900);
    const timer3 = setTimeout(() => setProgress(100), 1300);
    const timer4 = setTimeout(() => setFade(true), 1500);
    const timer5 = setTimeout(() => {
      if (onFinished) onFinished();
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onFinished]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-deep-space transition-opacity duration-300 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Top Brand Banner */}
      <div className="pt-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>OFFICIAL LAUNCH EDITION</span>
        </div>
      </div>

      {/* Center Poster Artwork & Logo */}
      <div className="flex flex-col items-center text-center my-auto max-w-xs">
        <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-3xl overflow-hidden border-2 border-amber-400/70 shadow-[0_0_50px_rgba(245,158,11,0.35)] animate-float">
          <img
            src="./poster.jpg"
            alt="Knowledge Multiverse Official Poster"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080f] via-transparent to-transparent opacity-60" />
        </div>

        <div className="mt-5 space-y-1">
          <h1 className="text-xl sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
            KNOWLEDGE MULTIVERSE
          </h1>
          <p className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Powered By Kapil
          </p>
          <p className="text-[11px] text-slate-400 italic">
            "Same Mission. Bigger Impact."
          </p>
        </div>
      </div>

      {/* Bottom Loading Progress Bar */}
      <div className="w-full max-w-xs pb-4 space-y-2 text-center">
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-400 transition-all duration-300 rounded-full shadow-[0_0_10px_#f59e0b]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>INITIALIZING 25 LEVELS...</span>
          <span className="text-amber-400 font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
