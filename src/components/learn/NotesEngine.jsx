import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { LEVELS_DATA } from '../../data/curriculumData';
import ContextTrilogy from '../layout/ContextTrilogy';
import { 
  BookOpen, Bookmark, Download, Sparkles, CheckCircle2, 
  HelpCircle, AlertCircle, ChevronLeft, ChevronRight, Share2 
} from 'lucide-react';

export default function NotesEngine() {
  const { currentLevel, bookmarkedNotes, toggleBookmark, markNotesRead } = useLearner();
  const [selectedLevelId, setSelectedLevelId] = useState(currentLevel);
  const [noteMode, setNoteMode] = useState('quick'); // 'quick' | 'deep'

  const activeLevel = LEVELS_DATA.find(l => l.id === selectedLevelId) || LEVELS_DATA[0];
  const isBookmarked = bookmarkedNotes.includes(`level-${activeLevel.id}`);

  const handleDownloadNotes = () => {
    const content = `================================================
KNOWLEDGE MULTIVERSE NOTES: LEVEL ${activeLevel.id} — ${activeLevel.title}
Powered By Kapil
Domain: ${activeLevel.domain} | Stage: ${activeLevel.stage}
================================================

SUMMARY:
${activeLevel.summary}

------------------------------------------------
QUICK NOTES & HIGH-YIELD TAKEAWAYS:
------------------------------------------------
${activeLevel.quickNotes}

------------------------------------------------
DEEP DIVE & CONCEPTUAL EXPLANATION:
------------------------------------------------
${activeLevel.deepDive}

================================================
Downloaded from Knowledge Multiverse PWA
================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KM_Level_${activeLevel.id}_${activeLevel.title.replace(/\s+/g, '_')}_Notes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    markNotesRead(activeLevel.id);
  };

  return (
    <div className="space-y-4 pb-24 max-w-lg mx-auto px-4 pt-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>NOTES ENGINE</span>
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            Level {activeLevel.id}: {activeLevel.title}
          </h1>
          <p className="text-xs text-slate-400">
            {activeLevel.domain} • Mobile-friendly syllabus
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => toggleBookmark(`level-${activeLevel.id}`)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                : 'bg-[#12182c] border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Bookmark this note"
            aria-label="Bookmark"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>

          <button
            onClick={handleDownloadNotes}
            className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 transition-all cursor-pointer"
            title="Download Notes"
            aria-label="Download Notes"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ContextTrilogy />

      {/* Level Selector Scroller */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {LEVELS_DATA.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => {
              setSelectedLevelId(lvl.id);
              markNotesRead(lvl.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedLevelId === lvl.id
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'bg-[#12182c] border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Lvl {lvl.id}
          </button>
        ))}
      </div>

      {/* Dual Tabs: Quick Notes vs Deep Dive */}
      <div className="grid grid-cols-2 gap-2 bg-[#0d1222] p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setNoteMode('quick')}
          className={`py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            noteMode === 'quick'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>📖</span>
          <span>QUICK NOTES</span>
        </button>

        <button
          onClick={() => setNoteMode('deep')}
          className={`py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            noteMode === 'deep'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>📚</span>
          <span>DEEP DIVE</span>
        </button>
      </div>

      {/* Notes Reader Surface */}
      <div className="bg-[#0d1222] border border-[#212942] rounded-3xl p-5 shadow-xl space-y-4">
        {/* Module Subtopics */}
        <div className="p-3 rounded-2xl bg-[#12182c]/80 border border-slate-800/80">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
            KEY MODULES COVERED
          </span>
          <div className="space-y-1">
            {activeLevel.modules.map((m, idx) => (
              <p key={m.id} className="text-xs text-slate-300 font-medium">
                • <strong>Module {idx + 1}:</strong> {m.title}
              </p>
            ))}
          </div>
        </div>

        {/* Content View */}
        {noteMode === 'quick' ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>HIGH-YIELD TAKEAWAYS</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-[#141b31]/50 p-4 rounded-2xl border border-slate-800/80 font-sans">
              {activeLevel.quickNotes}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
              <BookOpen className="w-4 h-4" />
              <span>IN-DEPTH ARCHITECTURAL BREAKDOWN</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-[#141b31]/50 p-4 rounded-2xl border border-slate-800/80 font-sans">
              {activeLevel.deepDive}
            </div>
          </div>
        )}

        {/* Level Navigation Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
          <button
            disabled={selectedLevelId <= 1}
            onClick={() => setSelectedLevelId(prev => Math.max(1, prev - 1))}
            className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev Level</span>
          </button>

          <span className="text-xs font-mono text-slate-500">
            {selectedLevelId} / 25
          </span>

          <button
            disabled={selectedLevelId >= 25}
            onClick={() => setSelectedLevelId(prev => Math.min(25, prev + 1))}
            className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 disabled:opacity-30 cursor-pointer"
          >
            <span>Next Level</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
