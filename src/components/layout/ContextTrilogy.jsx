import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { LEVELS_DATA } from '../../data/curriculumData';
import { MapPin, CheckCircle2, ArrowRightCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function ContextTrilogy({ customWhere, customLearned, customNext }) {
  const { currentLevel, completedLevels, setActiveTab, openModal } = useLearner();
  const [expanded, setExpanded] = useState(false);

  const activeLevelData = LEVELS_DATA.find(l => l.id === currentLevel) || LEVELS_DATA[0];

  const whereText = customWhere || `Level ${activeLevelData.id} • ${activeLevelData.title} (${activeLevelData.domain})`;
  const learnedText = customLearned || (
    completedLevels.length === 0
      ? 'Welcome to the Multiverse! You are beginning Level 1: Digital Foundations.'
      : `Mastered ${completedLevels.length} of 25 Multiverse Levels across core computer science & modern technologies.`
  );
  const nextText = customNext || `Complete Level ${activeLevelData.id} modules and verify test cases to advance toward Level ${Math.min(25, currentLevel + 1)}.`;

  return (
    <div className="w-full bg-[#0d1222]/90 border border-[#212942] rounded-2xl p-3.5 mb-4 shadow-lg shadow-black/40 backdrop-blur-sm transition-all">
      <div 
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
            Navigation Guidance
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {whereText.split('•')[0]}
          </span>
        </div>
        <button 
          className="text-slate-400 hover:text-slate-200 p-1"
          aria-label={expanded ? "Collapse guidance" : "Expand guidance"}
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <div className={`space-y-2 mt-2.5 text-xs ${expanded ? 'block' : 'space-y-1.5'}`}>
        {/* WHERE AM I */}
        <div className="flex items-start gap-2 text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-[10px] text-amber-400 uppercase tracking-wide mr-1.5">
              WHERE AM I?
            </span>
            <span className="font-medium text-slate-200">{whereText}</span>
          </div>
        </div>

        {/* WHAT HAVE I LEARNED */}
        <div className={`flex items-start gap-2 text-slate-300 ${!expanded && 'line-clamp-1'}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-[10px] text-emerald-400 uppercase tracking-wide mr-1.5">
              WHAT HAVE I LEARNED?
            </span>
            <span className="text-slate-300">{learnedText}</span>
          </div>
        </div>

        {/* WHAT DO I DO NEXT */}
        <div className="flex items-start gap-2 text-slate-300">
          <ArrowRightCircle className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-[10px] text-sky-400 uppercase tracking-wide mr-1.5">
              WHAT DO I DO NEXT?
            </span>
            <span className="text-sky-200 font-semibold">{nextText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
