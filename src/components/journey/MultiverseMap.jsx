import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { LEVELS_DATA, DOMAINS } from '../../data/curriculumData';
import { PERSONAS } from '../../data/personaData';
import { Lock, CheckCircle2, Sparkles, Compass, Filter, Target } from 'lucide-react';
import ContextTrilogy from '../layout/ContextTrilogy';

export default function MultiverseMap() {
  const { currentLevel, completedLevels, openModal, persona, trackViewMode, setTrackViewMode } = useLearner();
  const [selectedDomain, setSelectedDomain] = useState('all');

  const activePersonaObj = PERSONAS[persona] || PERSONAS.college;

  // Filter levels by track view mode AND domain
  const trackFilteredLevels = trackViewMode === 'tailored'
    ? LEVELS_DATA.filter(l => activePersonaObj.priorityLevels.includes(l.id))
    : LEVELS_DATA;

  const filteredLevels = selectedDomain === 'all'
    ? trackFilteredLevels
    : trackFilteredLevels.filter(l => {
        const dom = DOMAINS.find(d => d.id === selectedDomain);
        return dom ? dom.levels.includes(l.id) : true;
      });

  return (
    <div className="space-y-4 pb-24 max-w-lg mx-auto px-4 pt-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>KNOWLEDGE GALAXY</span>
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            25-Level Multiverse Map
          </h1>
          <p className="text-xs text-slate-400">
            Celestial progression from Zero to FAANG Industry Expert
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm font-black text-amber-400 font-mono">
            {completedLevels.length}/25
          </span>
          <span className="block text-[10px] text-slate-400 font-bold uppercase">
            Planets Conquered
          </span>
        </div>
      </div>

      {/* Track Mode Switcher (Tailored vs All) */}
      <div className="p-1 rounded-2xl bg-[#090d1a] border border-slate-800 flex items-center gap-1">
        <button
          onClick={() => setTrackViewMode('tailored')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            trackViewMode === 'tailored'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>{activePersonaObj.title} Track ({activePersonaObj.priorityLevels.length})</span>
        </button>
        <button
          onClick={() => setTrackViewMode('all')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            trackViewMode === 'all'
              ? 'bg-slate-800 text-amber-300 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>All 25 Levels</span>
        </button>
      </div>

      <ContextTrilogy />

      {/* Domain Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedDomain('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
            selectedDomain === 'all'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'bg-[#12182c] border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          All (25)
        </button>
        {DOMAINS.map((dom) => (
          <button
            key={dom.id}
            onClick={() => setSelectedDomain(dom.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
              selectedDomain === dom.id
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'bg-[#12182c] border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>{dom.icon}</span>
            <span>{dom.name}</span>
          </button>
        ))}
      </div>

      {/* Constellation Nodes Grid */}
      <div className="relative py-4 space-y-4">
        {filteredLevels.map((lvl, index) => {
          const isCompleted = completedLevels.includes(lvl.id);
          const isCurrent = lvl.id === currentLevel;
          const isLocked = lvl.id > currentLevel && !isCompleted;

          return (
            <div key={lvl.id} className="relative">
              {/* Connecting constellation beam */}
              {index < filteredLevels.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 -mb-4 bg-gradient-to-b from-amber-500/40 via-sky-500/20 to-transparent z-0" />
              )}

              <div
                onClick={() => openModal('levelDetail', lvl)}
                className={`relative z-10 p-4 rounded-3xl border transition-all cursor-pointer transform active:scale-98 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-500/15 via-[#131b31] to-[#0d1222] border-amber-400/60 shadow-xl shadow-amber-500/20 ring-1 ring-amber-400/40'
                    : isCompleted
                    ? 'bg-[#0d1425] border-emerald-500/30 hover:border-emerald-400/60'
                    : isLocked
                    ? 'bg-[#090c17]/80 border-slate-800/80 opacity-75 hover:opacity-95'
                    : 'bg-[#0d1222] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    {/* Planet Celestial Node */}
                    <div className="relative">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-transform ${
                          isCurrent
                            ? 'bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 text-slate-950 shadow-amber-400/40 scale-105'
                            : isCompleted
                            ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-emerald-500/30'
                            : 'bg-[#151c33] border border-slate-700 text-slate-300'
                        }`}
                      >
                        {lvl.icon}
                      </div>

                      {/* Pulse ring for current level */}
                      {isCurrent && (
                        <div className="absolute -inset-1 rounded-2xl border-2 border-amber-400 animate-pulse-ring pointer-events-none" />
                      )}

                      {/* Completed badge */}
                      {isCompleted && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-slate-950" />
                        </div>
                      )}

                      {/* Locked badge */}
                      {isLocked && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center">
                          <Lock className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    {/* Level Details */}
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          LEVEL {lvl.id}
                        </span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                          {lvl.stage}
                        </span>
                        {activePersonaObj.priorityLevels.includes(lvl.id) && (
                          <span className={`text-[9px] font-black px-1.5 py-0.2 rounded bg-gradient-to-r ${activePersonaObj.badgeGradient} text-slate-950 uppercase tracking-tight`}>
                            ★ {activePersonaObj.title} Pick
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-sm text-white mt-0.5">
                        {lvl.title}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {lvl.modules.length} Modules • {lvl.domain}
                      </p>
                    </div>
                  </div>

                  {/* Right Status */}
                  <div className="text-right">
                    {isCompleted ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Done</span>
                      </span>
                    ) : isCurrent ? (
                      <span className="text-xs font-extrabold text-amber-400 animate-pulse flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500">
                        +150 XP
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
