import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { PROJECTS_DATA } from '../../data/projectsData';
import { Briefcase, CheckCircle2, Code2, ChevronDown, ChevronUp, Copy, Sparkles, FolderGit2 } from 'lucide-react';

export default function ProjectsHub() {
  const { completedProjects, completeProject, playAudio, triggerConfetti } = useLearner();
  const [expandedId, setExpandedId] = useState(PROJECTS_DATA[0].id);
  const [copiedId, setCopiedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId(prev => prev === id ? null : id);
    playAudio('click');
  };

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleComplete = (id) => {
    completeProject(id);
  };

  return (
    <div className="space-y-4">
      {/* Overview Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#0d1222] to-sky-500/10 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
            PORTFOLIO BUILDER
          </span>
          <h3 className="text-base font-extrabold text-white mt-0.5">
            Practical Project Accumulator
          </h3>
          <p className="text-xs text-slate-400">
            Build production-grade applications across all core domains
          </p>
        </div>
        <div className="text-right">
          <span className="text-base font-black text-amber-400 font-mono">
            {completedProjects.length} / {PROJECTS_DATA.length}
          </span>
          <span className="block text-[10px] text-slate-400 font-bold uppercase">
            Built
          </span>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {PROJECTS_DATA.map((proj) => {
          const isDone = completedProjects.includes(proj.id);
          const isExpanded = expandedId === proj.id;

          return (
            <div
              key={proj.id}
              className={`rounded-3xl border transition-all ${
                isDone
                  ? 'bg-[#0d1527] border-emerald-500/30'
                  : 'bg-[#0d1222] border-[#212942]'
              }`}
            >
              {/* Header Accordion Bar */}
              <div
                onClick={() => handleToggle(proj.id)}
                className="p-4 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{proj.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-amber-400">
                        {proj.language} • {proj.domain}
                      </span>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-slate-300">
                        {proj.difficulty}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-sm text-white mt-0.5">
                      {proj.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isDone && (
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/40 px-2 py-1 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> In Portfolio
                    </span>
                  )}
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Expanded Detail Body */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-3 text-xs">
                  <p className="text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Architecture Summary */}
                  <div className="p-3 rounded-2xl bg-[#12182c] border border-slate-800 text-slate-300">
                    <strong className="text-amber-400 font-bold block mb-1">
                      📐 Architectural Blueprint:
                    </strong>
                    {proj.architectureSummary}
                  </div>

                  {/* Milestones */}
                  <div className="space-y-1.5">
                    <strong className="text-slate-400 uppercase tracking-wider text-[10px] block">
                      Core Implementation Milestones:
                    </strong>
                    {proj.milestones.map((m, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-300">
                        <span className="w-4 h-4 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>

                  {/* Starter Code Snippet */}
                  <div className="relative rounded-2xl bg-[#070913] border border-slate-800 p-3 overflow-hidden">
                    <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        Starter Template ({proj.language})
                      </span>
                      <button
                        onClick={() => handleCopyCode(proj.id, proj.starterCode)}
                        className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedId === proj.id ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                    <pre className="font-mono text-[11px] text-emerald-400/90 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                      {proj.starterCode}
                    </pre>
                  </div>

                  {/* Portfolio Action */}
                  <div className="pt-2 flex justify-end">
                    {!isDone ? (
                      <button
                        onClick={() => handleComplete(proj.id)}
                        className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20"
                      >
                        <FolderGit2 className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Add To Learner Portfolio (+250 XP)</span>
                      </button>
                    ) : (
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Showcased in your verified developer portfolio</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
