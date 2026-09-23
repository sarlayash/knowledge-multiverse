import React from 'react';
import { useLearner } from '../../context/LearnerContext';
import { X, BookOpen, Code2, HelpCircle, CheckCircle2, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function LevelDetailModal({ level, onClose }) {
  const { currentLevel, completedLevels, completeLevel, setActiveTab, openModal, playAudio } = useLearner();

  if (!level) return null;

  const isCompleted = completedLevels.includes(level.id);
  const isLocked = level.id > currentLevel && !isCompleted;
  const isCurrent = level.id === currentLevel;

  const handleLaunchNotes = () => {
    onClose();
    setActiveTab('learn');
  };

  const handleLaunchIDE = () => {
    onClose();
    setActiveTab('practice');
  };

  const handleLaunchAssessment = () => {
    onClose();
    openModal('assessment', level);
  };

  const handleLaunchMock = () => {
    onClose();
    openModal('mock', { type: 'level', levelId: level.id });
  };

  const handleMarkComplete = () => {
    completeLevel(level.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0d1222] border border-[#212a45] rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Level Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-3xl shadow-xl shadow-amber-500/25 shrink-0">
            {level.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                LEVEL {level.id} • {level.stage}
              </span>
              {isCompleted && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> COMPLETED
                </span>
              )}
              {isCurrent && !isCompleted && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  ACTIVE
                </span>
              )}
              {isLocked && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> LOCKED
                </span>
              )}
            </div>
            <h2 className="text-xl font-extrabold text-white mt-1">
              {level.title}
            </h2>
            <p className="text-xs text-slate-400">{level.domain}</p>
          </div>
        </div>

        {/* Summary */}
        <p className="text-xs text-slate-300 bg-[#12182c] border border-slate-800/80 p-3.5 rounded-2xl leading-relaxed mb-4">
          {level.summary}
        </p>

        {/* Modular Structure: LEARN -> PRACTICE -> TEST -> BUILD -> PROVE */}
        <div className="mb-5">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Module Progression (Learn → Practice → Test → Build → Prove)
          </h4>
          <div className="space-y-2">
            {level.modules.map((m, idx) => (
              <div
                key={m.id}
                className="p-3 rounded-xl bg-[#141b31]/70 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-200">
                    Module {idx + 1}: {m.title}
                  </span>
                  <span className="text-[10px] font-bold text-amber-400/90 font-mono">
                    {idx === 0 ? 'LEARN' : idx === 1 ? 'PRACTICE' : idx === 2 ? 'TEST' : idx === 3 ? 'BUILD' : 'PROVE'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {m.concepts.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] text-slate-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleLaunchNotes}
              className="py-3 px-3 rounded-xl bg-[#17203a] hover:bg-[#1f2b4e] border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Read Notes</span>
            </button>

            <button
              onClick={handleLaunchIDE}
              className="py-3 px-3 rounded-xl bg-[#17203a] hover:bg-[#1f2b4e] border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-sky-400" />
              <span>Live IDE</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleLaunchAssessment}
              className="py-3 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Assessment</span>
            </button>

            <button
              onClick={handleLaunchMock}
              className="py-3 px-3 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/40 text-sky-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Level Mock</span>
            </button>
          </div>

          {!isCompleted ? (
            <button
              onClick={handleMarkComplete}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 fill-slate-950" />
              <span>Mark Level {level.id} Complete (+150 XP)</span>
            </button>
          ) : (
            <div className="text-center py-2 text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Level Completed & Verified</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
