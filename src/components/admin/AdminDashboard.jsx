import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { LEVELS_DATA } from '../../data/curriculumData';
import { BADGES_DATA, CERTIFICATES_DATA } from '../../data/badgesData';
import { 
  ShieldCheck, BarChart3, Users, BookOpen, Database, 
  HelpCircle, Code2, Download, Upload, Plus, Trash2, X, CheckCircle2 
} from 'lucide-react';

export default function AdminDashboard({ onClose }) {
  const { 
    name, xp, completedLevels, unlockedBadges, 
    unlockedCertificates, resetAllProgress, playAudio 
  } = useLearner();

  const [activeAdminTab, setActiveAdminTab] = useState('analytics'); // 'analytics' | 'cms' | 'raw_json'
  const [newQuestionLevel, setNewQuestionLevel] = useState(1);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionOptions, setNewQuestionOptions] = useState(['', '', '', '']);
  const [newQuestionCorrect, setNewQuestionCorrect] = useState(0);
  const [newQuestionFeedback, setNewQuestionFeedback] = useState('');
  const [cmsSuccess, setCmsSuccess] = useState(false);

  // Simulated aggregate analytics (Page 26 Specification)
  const analyticsData = {
    totalLearners: '14,820',
    activeLearners: '2,940',
    avgCompletionRate: '34.2%',
    avgAssessmentScore: '78.5%',
    codingSuccessRate: '68.1%',
    mockPassRate: '72.4%',
    badgesIssued: '28,450',
    certificatesVerified: '4,120',
    mostDifficultQuestions: [
      { topic: 'C Pointers: Dereferencing Null/Dangling Pointers', failRate: '48.2%' },
      { topic: 'SQL 3NF Normalization & Transitive Dependencies', failRate: '41.6%' },
      { topic: 'OS Coffman Deadlock Conditions & Bankers Algorithm', failRate: '39.8%' },
      { topic: 'DevOps Canary Deployment vs Blue-Green Routing', failRate: '35.4%' }
    ]
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    // Add dynamically to curriculum
    const targetLvl = LEVELS_DATA.find(l => l.id === Number(newQuestionLevel));
    if (targetLvl) {
      if (!targetLvl.assessments) targetLvl.assessments = [];
      targetLvl.assessments.push({
        id: 'custom-q-' + Date.now(),
        type: 'mcq',
        difficulty: 'medium',
        question: newQuestionText,
        options: newQuestionOptions.filter(o => o.trim().length > 0),
        correctIndex: Number(newQuestionCorrect),
        whyWrong: newQuestionFeedback || 'Conceptual feedback explaining the answer.'
      });
      setCmsSuccess(true);
      playAudio('correct');
      setTimeout(() => setCmsSuccess(false), 3000);
      setNewQuestionText('');
      setNewQuestionFeedback('');
    }
  };

  const handleExportJSON = () => {
    const fullContentData = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      levels: LEVELS_DATA,
      badges: BADGES_DATA,
      certificates: CERTIFICATES_DATA
    };
    const blob = new Blob([JSON.stringify(fullContentData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KM_Content_Architecture_Export_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#0d1222] border border-[#212a45] rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm text-white">
                ADMINISTRATOR / CMS DASHBOARD
              </h3>
              <p className="text-[10px] text-slate-400">
                Scalable Content Architecture & Live Telemetry
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-3 gap-1.5 bg-[#090d1a] p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeAdminTab === 'analytics' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Telemetry & Analytics
          </button>
          <button
            onClick={() => setActiveAdminTab('cms')}
            className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeAdminTab === 'cms' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Content CMS Editor
          </button>
          <button
            onClick={() => setActiveAdminTab('raw_json')}
            className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeAdminTab === 'raw_json' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Architecture & Export
          </button>
        </div>

        {/* TAB 1: ANALYTICS TELEMETRY */}
        {activeAdminTab === 'analytics' && (
          <div className="space-y-4 pt-1">
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-[#12182c] border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Learners</span>
                <span className="text-lg font-black text-white font-mono">{analyticsData.totalLearners}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#12182c] border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Learners</span>
                <span className="text-lg font-black text-emerald-400 font-mono">{analyticsData.activeLearners}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#12182c] border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Avg Assessment</span>
                <span className="text-lg font-black text-amber-400 font-mono">{analyticsData.avgAssessmentScore}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#12182c] border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Coding Success</span>
                <span className="text-lg font-black text-sky-400 font-mono">{analyticsData.codingSuccessRate}</span>
              </div>
            </div>

            {/* Most Difficult Questions Ranking */}
            <div className="p-4 rounded-2xl bg-[#12182c] border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                Top Bottlenecks & Most Difficult Question Topics:
              </span>
              <div className="space-y-1.5">
                {analyticsData.mostDifficultQuestions.map((q, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/80 last:border-none">
                    <span className="text-slate-300">• {q.topic}</span>
                    <span className="text-rose-400 font-mono font-bold">{q.failRate} error</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Session Reset */}
            <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
              <span>Learner: <strong>{name || 'Learner'}</strong> ({completedLevels.length} levels)</span>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all local progress for testing?')) {
                    resetAllProgress();
                    onClose();
                  }
                }}
                className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Learner Profile</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: CONTENT CMS EDITOR */}
        {activeAdminTab === 'cms' && (
          <form onSubmit={handleAddQuestion} className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Add Dynamic Assessment Question (No Rebuild Needed)
              </span>
              {cmsSuccess && (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Question Added!
                </span>
              )}
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-semibold mb-1">Target Level:</label>
              <select
                value={newQuestionLevel}
                onChange={(e) => setNewQuestionLevel(e.target.value)}
                className="w-full bg-[#12182c] border border-slate-800 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-400"
              >
                {LEVELS_DATA.map(l => (
                  <option key={l.id} value={l.id}>Level {l.id}: {l.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-semibold mb-1">Question Prompt:</label>
              <input
                type="text"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="e.g. Which algorithm prevents cyclic dependencies in deadlock?"
                className="w-full bg-[#12182c] border border-slate-800 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] text-slate-300 font-semibold">Options (Select radio for correct answer):</label>
              {newQuestionOptions.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={newQuestionCorrect === idx}
                    onChange={() => setNewQuestionCorrect(idx)}
                    className="accent-amber-400 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const updated = [...newQuestionOptions];
                      updated[idx] = e.target.value;
                      setNewQuestionOptions(updated);
                    }}
                    placeholder={`Option ${idx + 1}`}
                    className="flex-1 bg-[#12182c] border border-slate-800 text-white rounded-xl p-2 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-semibold mb-1">Conceptual Feedback (Why was this wrong?):</label>
              <textarea
                value={newQuestionFeedback}
                onChange={(e) => setNewQuestionFeedback(e.target.value)}
                rows={2}
                placeholder="Explain the underlying architectural principle..."
                className="w-full bg-[#12182c] border border-slate-800 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-400/20"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Question to Content Repository</span>
            </button>
          </form>
        )}

        {/* TAB 3: CONTENT ARCHITECTURE HIERARCHY & EXPORT */}
        {activeAdminTab === 'raw_json' && (
          <div className="space-y-3 pt-1 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#12182c] border border-slate-800 space-y-1.5 text-slate-300">
              <strong className="text-amber-400 block font-bold">
                Scalable Content Architecture Specification:
              </strong>
              <code className="text-slate-400 text-[11px] block bg-black/40 p-2 rounded-lg font-mono">
                Level → Domain → Module → Topic → Lesson → Practice → Assessment → Challenge → Project → Certification
              </code>
              <p className="text-[11px] text-slate-400">
                Content is completely decoupled from UI components. New modules, questions, and projects can be imported or updated via JSON payloads dynamically.
              </p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={handleExportJSON}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-400/20"
              >
                <Download className="w-4 h-4" />
                <span>Export Full Curriculum JSON</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
