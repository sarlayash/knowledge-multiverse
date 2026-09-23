import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { LEVELS_DATA } from '../../data/curriculumData';
import { PROJECTS_DATA } from '../../data/projectsData';
import { SIMULATIONS_DATA } from '../../data/simulationsData';
import { Search, X, BookOpen, Code2, HelpCircle, Briefcase, Cpu, ArrowRight } from 'lucide-react';

export default function GlobalSearchModal({ onClose }) {
  const { setActiveTab, openModal, playAudio } = useLearner();
  const [query, setQuery] = useState('');

  const cleanQuery = query.toLowerCase().trim();

  // Search Notes, Modules, Challenges, Questions, Projects, Simulations
  const searchResults = [];

  if (cleanQuery.length >= 2) {
    // Search Levels & Notes & Questions
    LEVELS_DATA.forEach(level => {
      // Check title or summary
      if (level.title.toLowerCase().includes(cleanQuery) || level.summary.toLowerCase().includes(cleanQuery)) {
        searchResults.push({
          type: 'level',
          title: `Level ${level.id}: ${level.title}`,
          desc: level.summary,
          icon: BookOpen,
          payload: level
        });
      }

      // Check Modules
      level.modules.forEach(m => {
        if (m.title.toLowerCase().includes(cleanQuery) || m.concepts.some(c => c.toLowerCase().includes(cleanQuery))) {
          searchResults.push({
            type: 'module',
            title: `Module: ${m.title} (Level ${level.id})`,
            desc: m.concepts.join(', '),
            icon: BookOpen,
            payload: level
          });
        }
      });

      // Check Questions
      level.assessments?.forEach(q => {
        if (q.question.toLowerCase().includes(cleanQuery)) {
          searchResults.push({
            type: 'question',
            title: `Assessment: ${q.question.slice(0, 50)}...`,
            desc: `Level ${level.id} • ${q.type.toUpperCase()}`,
            icon: HelpCircle,
            payload: level
          });
        }
      });

      // Check Coding Challenge
      if (level.codingChallenge && (level.codingChallenge.title.toLowerCase().includes(cleanQuery) || level.codingChallenge.description.toLowerCase().includes(cleanQuery))) {
        searchResults.push({
          type: 'challenge',
          title: `Coding Challenge: ${level.codingChallenge.title}`,
          desc: level.codingChallenge.description,
          icon: Code2,
          payload: level
        });
      }
    });

    // Search Projects
    PROJECTS_DATA.forEach(p => {
      if (p.title.toLowerCase().includes(cleanQuery) || p.description.toLowerCase().includes(cleanQuery)) {
        searchResults.push({
          type: 'project',
          title: `Project: ${p.title}`,
          desc: p.description,
          icon: Briefcase,
          payload: p
        });
      }
    });

    // Search Simulations
    SIMULATIONS_DATA.forEach(s => {
      if (s.title.toLowerCase().includes(cleanQuery) || s.brief.toLowerCase().includes(cleanQuery)) {
        searchResults.push({
          type: 'simulation',
          title: `Simulation: ${s.title}`,
          desc: s.brief,
          icon: Cpu,
          payload: s
        });
      }
    });
  }

  const handleResultClick = (res) => {
    onClose();
    playAudio('click');
    if (res.type === 'level' || res.type === 'module') {
      openModal('levelDetail', res.payload);
    } else if (res.type === 'challenge') {
      setActiveTab('practice');
    } else if (res.type === 'question') {
      openModal('assessment', res.payload);
    } else if (res.type === 'project' || res.type === 'simulation') {
      setActiveTab('practice');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0d1222] border border-[#212a45] rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
        {/* Search Bar */}
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 'C pointers', 'SQL JOIN', 'OS', 'Cloud'..."
            autoFocus
            className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-slate-500"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Suggested Quick Searches */}
        {cleanQuery.length === 0 && (
          <div className="space-y-2 py-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Popular Multiverse Searches:
            </span>
            <div className="flex flex-wrap gap-2">
              {['C pointers', 'SQL JOIN', 'Operating System', 'Cloud', 'AI', 'Agile', 'Networking', 'Blockchain'].map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 rounded-xl bg-[#141b31] border border-slate-800 hover:border-amber-400/50 text-slate-300 text-xs transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {cleanQuery.length >= 2 && searchResults.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No matching knowledge nodes found for "{query}".
            </div>
          )}

          {searchResults.map((res, idx) => {
            const Icon = res.icon;
            return (
              <div
                key={idx}
                onClick={() => handleResultClick(res)}
                className="p-3 rounded-2xl bg-[#12182c] border border-slate-800/80 hover:border-amber-400/50 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-800/80 text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs text-white group-hover:text-amber-300 transition-colors">
                      {res.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{res.desc}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
