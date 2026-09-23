import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { LEVELS_DATA } from '../../data/curriculumData';
import { PERSONAS, PERSONA_LEVEL_INSIGHTS, generatePersonalizedStudyPack } from '../../data/personaData';
import ContextTrilogy from '../layout/ContextTrilogy';
import { 
  BookOpen, Bookmark, Download, Sparkles, CheckCircle2, 
  HelpCircle, AlertCircle, ChevronLeft, ChevronRight, Share2,
  Target, FileText, Check
} from 'lucide-react';

export default function NotesEngine() {
  const { currentLevel, bookmarkedNotes, toggleBookmark, markNotesRead, persona, name } = useLearner();
  const [selectedLevelId, setSelectedLevelId] = useState(currentLevel);
  const [noteMode, setNoteMode] = useState('quick'); // 'quick' | 'deep' | 'persona'

  const activePersonaObj = PERSONAS[persona] || PERSONAS.college;
  const activeLevel = LEVELS_DATA.find(l => l.id === selectedLevelId) || LEVELS_DATA[0];
  const isBookmarked = bookmarkedNotes.includes(`level-${activeLevel.id}`);

  const personaInsight = PERSONA_LEVEL_INSIGHTS[persona]?.[activeLevel.id] || null;

  // Single Level Download
  const handleDownloadNotes = () => {
    const content = `================================================
KNOWLEDGE MULTIVERSE NOTES: LEVEL ${activeLevel.id} — ${activeLevel.title}
Powered By Kapil
Domain: ${activeLevel.domain} | Stage: ${activeLevel.stage}
Learner: ${name || 'Learner'} | Track: ${activePersonaObj.title}
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

${personaInsight ? `------------------------------------------------\n${activePersonaObj.title.toUpperCase()} FOCUS INSIGHT:\n------------------------------------------------\n${personaInsight}\n` : ''}
================================================
Downloaded from Knowledge Multiverse PWA
Offline Standalone PWA • https://sarlayash.github.io/knowledge-multiverse/
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

  // Full Persona Study Pack Download
  const handleDownloadFullStudyPack = () => {
    const textContent = generatePersonalizedStudyPack(persona, name, LEVELS_DATA);
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Knowledge_Multiverse_${activePersonaObj.title.replace(/\s+/g, '_')}_Complete_StudyPack.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 pb-24 max-w-lg mx-auto px-4 pt-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>NOTES ENGINE</span>
            </span>
            <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full bg-gradient-to-r ${activePersonaObj.badgeGradient} text-slate-950 uppercase`}>
              {activePersonaObj.title}
            </span>
          </div>

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
            title="Download Level Notes"
            aria-label="Download Level Notes"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Download Complete Study Pack CTA Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#11172e] via-[#0d1222] to-[#1a223d] border border-amber-400/40 p-3 flex items-center justify-between gap-2 shadow-lg">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">📚</span>
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
              OFFLINE STUDY PACK
            </span>
            <p className="text-xs font-bold text-white">
              Download Full {activePersonaObj.title} Syllabus
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadFullStudyPack}
          className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-[11px] flex items-center gap-1 transition-all cursor-pointer shrink-0 shadow-md"
        >
          <Download className="w-3 h-3 fill-slate-950" />
          <span>All Notes</span>
        </button>
      </div>

      <ContextTrilogy />

      {/* Level Selector Scroller */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {LEVELS_DATA.map((lvl) => {
          const isPrioritized = activePersonaObj.priorityLevels.includes(lvl.id);
          return (
            <button
              key={lvl.id}
              onClick={() => {
                setSelectedLevelId(lvl.id);
                markNotesRead(lvl.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                selectedLevelId === lvl.id
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : isPrioritized
                  ? 'bg-[#151d38] border border-amber-400/40 text-amber-200'
                  : 'bg-[#12182c] border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>Lvl {lvl.id}</span>
              {isPrioritized && <span className="text-[9px]">★</span>}
            </button>
          );
        })}
      </div>

      {/* Triple Tabs: Quick Notes vs Deep Dive vs Persona Lens */}
      <div className="grid grid-cols-3 gap-1.5 bg-[#0d1222] p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setNoteMode('quick')}
          className={`py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer ${
            noteMode === 'quick'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>📖</span>
          <span>QUICK</span>
        </button>

        <button
          onClick={() => setNoteMode('deep')}
          className={`py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer ${
            noteMode === 'deep'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>📚</span>
          <span>DEEP DIVE</span>
        </button>

        <button
          onClick={() => setNoteMode('persona')}
          className={`py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer ${
            noteMode === 'persona'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>🎯</span>
          <span>{activePersonaObj.title.toUpperCase()}</span>
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
        ) : noteMode === 'deep' ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
              <BookOpen className="w-4 h-4" />
              <span>IN-DEPTH ARCHITECTURAL BREAKDOWN</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-[#141b31]/50 p-4 rounded-2xl border border-slate-800/80 font-sans">
              {activeLevel.deepDive}
            </div>
          </div>
        ) : (
          /* Persona Specific Lens */
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Target className="w-4 h-4" />
              <span className="uppercase">{activePersonaObj.title} MINDSET & INTERVIEW FOCUS</span>
            </div>

            <div className="bg-[#141b31]/70 p-4 rounded-2xl border border-amber-400/40 space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="text-2xl">{activePersonaObj.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    Track: {activePersonaObj.tagline}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {activePersonaObj.mindset}
                  </p>
                </div>
              </div>

              {personaInsight ? (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/40 text-xs text-amber-200 leading-relaxed">
                  {personaInsight}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  💡 <strong>Mindset Tip:</strong> Master the core concepts of {activeLevel.title} and execute the coding challenge in the Live IDE.
                </div>
              )}

              <div className="pt-1 text-[11px] text-slate-400 space-y-1">
                <p>• <strong>Recommended Action:</strong> Complete Level {activeLevel.id} assessment with 80%+ accuracy.</p>
                <p>• <strong>Practical Challenge:</strong> {activeLevel.codingChallenge?.title || 'Interactive Challenge'}</p>
              </div>
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
