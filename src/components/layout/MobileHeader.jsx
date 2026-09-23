import React from 'react';
import { useLearner } from '../../context/LearnerContext';
import { Sparkles, Flame, Volume2, VolumeX, Search, ShieldCheck, Briefcase, Smartphone } from 'lucide-react';

import { PERSONAS } from '../../data/personaData';

export default function MobileHeader() {
  const { xp, streak, soundEnabled, toggleSound, openModal, placementStage, persona } = useLearner();
  const activePersona = PERSONAS[persona] || PERSONAS.college;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#07080f]/90 backdrop-blur-md border-b border-[#1b2236] px-4 py-2.5 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-amber-400 to-sky-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <span className="text-base">{activePersona.icon || '🌌'}</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">
              MULTIVERSE
            </span>
            <span className={`text-[9px] uppercase font-bold tracking-tight px-1.5 py-0.5 rounded bg-gradient-to-r ${activePersona.badgeGradient} text-slate-950`}>
              {activePersona.title}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 leading-none">Powered by Kapil</p>
        </div>
      </div>

      {/* Stats & Actions */}
      <div className="flex items-center gap-2">
        {/* Streak */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 fill-orange-500 animate-pulse" />
          <span>{streak}d</span>
        </div>

        {/* XP */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{xp} XP</span>
        </div>

        {/* Placement Quick Button */}
        <button
          onClick={() => openModal('placement')}
          className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${placementStage.bg} ${placementStage.color}`}
          title="Placement Readiness Center"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">{placementStage.stage}</span>
        </button>

        {/* Install / Download App Guide */}
        <button
          onClick={() => openModal('installGuide')}
          className="p-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 transition-colors flex items-center gap-1"
          title="Install / Download App"
          aria-label="Install App"
        >
          <Smartphone className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="hidden sm:inline text-[11px] font-bold">Install</span>
        </button>

        {/* Search */}
        <button
          onClick={() => openModal('search')}
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Global Search"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          aria-label="Audio Toggle"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>

        {/* Admin Portal */}
        <button
          onClick={() => openModal('admin')}
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition-colors"
          title="Admin CMS"
          aria-label="Admin CMS"
        >
          <ShieldCheck className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
