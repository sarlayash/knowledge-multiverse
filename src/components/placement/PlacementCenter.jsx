import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { 
  Briefcase, CheckCircle2, Circle, AlertCircle, ArrowRight, 
  Award, FileText, Users, Code, Zap, X, ShieldCheck 
} from 'lucide-react';

export default function PlacementCenter({ onClose }) {
  const { 
    placementScore, placementStage, completedLevels, 
    assessmentScores, codeSubmissions, completedSimulations, 
    completedProjects, openModal, playAudio 
  } = useLearner();

  const [activeTab, setActiveTab] = useState('meter'); // 'meter' | 'checklist' | 'interview'

  // 15 Competency Dimensions Breakdown
  const competencies = [
    { name: 'Technical Fundamentals', score: Math.min(100, completedLevels.length * 4), weight: 'Core' },
    { name: 'Core Programming (C/JS/Py)', score: codeSubmissions[5]?.passed ? 100 : 40, weight: 'High' },
    { name: 'DSA Foundations & Logic', score: codeSubmissions[5]?.passed ? 90 : 30, weight: 'High' },
    { name: 'DBMS & Relational Algebra', score: assessmentScores[6]?.percentage || 25, weight: 'Core' },
    { name: 'Operating Systems & Concurrency', score: assessmentScores[4]?.percentage || 20, weight: 'High' },
    { name: 'Computer Networking (TCP/IP)', score: assessmentScores[15]?.percentage || 20, weight: 'Core' },
    { name: 'Web Architecture & APIs', score: assessmentScores[7]?.percentage || 30, weight: 'High' },
    { name: 'Cloud Fundamentals (IaaS/PaaS)', score: completedSimulations.includes('cloud-engineer') ? 95 : 20, weight: 'Core' },
    { name: 'Cybersecurity & OWASP', score: completedSimulations.includes('security') ? 100 : 20, weight: 'Core' },
    { name: 'Problem Solving Speed', score: Math.min(100, (Object.keys(codeSubmissions).length * 15)), weight: 'FAANG' },
    { name: 'Debugging & Code Inspection', score: completedSimulations.includes('software-developer') ? 100 : 30, weight: 'FAANG' },
    { name: 'SQL Query Optimization', score: completedSimulations.includes('database') ? 100 : 25, weight: 'Core' },
    { name: 'Quantitative & Logic Aptitude', score: Math.min(100, placementScore + 10), weight: 'Screener' },
    { name: 'Technical Communication & RFCs', score: Math.min(100, completedProjects.length * 25), weight: 'Leadership' },
    { name: 'Project & Portfolio Readiness', score: Math.min(100, completedProjects.length * 20), weight: 'Portfolio' }
  ];

  const resumeChecklist = [
    { id: 'r1', item: 'Clean single-page ATS-optimized resume format', desc: 'No complex tables or graphic columns that confuse ATS parsers' },
    { id: 'r2', item: 'Quantified impact metrics (X-Y-Z formula)', desc: 'Accomplished [X] as measured by [Y], by doing [Z]' },
    { id: 'r3', item: 'At least 3 practical portfolio projects linked', desc: 'Active GitHub repositories and deployed live demonstrations' },
    { id: 'r4', item: 'Core technical skills categorized clearly', desc: 'Languages, Databases, Cloud & DevOps, Frameworks' },
    { id: 'r5', item: 'Verified Knowledge Multiverse certificates attached', desc: 'Verifiable credential IDs and QR codes' }
  ];

  const interviewQAs = [
    {
      q: 'How does an Application Load Balancer differ from a Network Load Balancer?',
      a: 'An ALB operates at Layer 7 (Application Layer), inspecting HTTP headers, cookies, and path routing (`/api`). An NLB operates at Layer 4 (Transport Layer), processing raw TCP/UDP streams at ultra-low latency handling millions of requests per second.'
    },
    {
      q: 'Explain Database Indexing and why B-Trees are preferred over Hash Tables for relational databases.',
      a: 'B-Trees maintain sorted order, allowing fast range queries (`WHERE age BETWEEN 20 AND 30`) and orderings (`ORDER BY`) in O(log N) time. Hash Tables provide O(1) exact lookups but completely fail at range scans.'
    },
    {
      q: 'What is a Race Condition, and how do you prevent it in distributed systems?',
      a: 'A race condition occurs when concurrent threads or processes read and write shared data simultaneously without locking. In distributed systems, it is resolved using distributed locks (Redis Redlock), optimistic concurrency control with version tags, or message queues with single-consumer partitions.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0d1222] border border-[#212a45] rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
              <Briefcase className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm text-white">
                PLACEMENT READINESS CENTER
              </h3>
              <p className="text-[10px] text-slate-400">
                FAANG Standard Competency & Career Verification
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

        {/* Dynamic Placement Meter Hero */}
        <div className={`p-4 rounded-3xl border ${placementStage.bg} space-y-2.5`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              Placement Readiness Meter
            </span>
            <span className={`text-xs font-black px-2.5 py-0.5 rounded-full bg-black/50 ${placementStage.color}`}>
              {placementStage.stage}
            </span>
          </div>

          {/* Meter Bar with 5 Tiers */}
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-amber-400 to-yellow-300 rounded-full transition-all duration-700"
              style={{ width: `${placementScore}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>FOUNDATION (0%)</span>
            <span>PRACTICE (50%)</span>
            <span>INDUSTRY READY (85%+)</span>
          </div>

          <p className="text-[11px] text-slate-300">
            Current evidence score: <strong>{placementScore}/100</strong>. Verified through passed test cases, practical projects, simulation drills, and mock test scores.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 gap-1.5 bg-[#090d1a] p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('meter')}
            className={`py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              activeTab === 'meter' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            15 Dimensions
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              activeTab === 'checklist' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Resume Audit
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            className={`py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              activeTab === 'interview' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            FAANG Q&A
          </button>
        </div>

        {/* TAB 1: 15 COMPETENCY DIMENSIONS */}
        {activeTab === 'meter' && (
          <div className="space-y-2 pt-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              15 Industry Readiness Dimensions:
            </span>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {competencies.map((comp, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#12182c] border border-slate-800/80 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-200">{comp.name}</span>
                    <span className="font-mono font-bold text-amber-400">{comp.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-sky-400 rounded-full"
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: RESUME AUDIT CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="space-y-2 pt-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              FAANG Technical Resume Checklist:
            </span>
            <div className="space-y-2">
              {resumeChecklist.map((item) => (
                <div key={item.id} className="p-3 rounded-2xl bg-[#12182c] border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item.item}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 ml-6">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INTERVIEW PREPARATION */}
        {activeTab === 'interview' && (
          <div className="space-y-2.5 pt-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              High-Frequency FAANG Interview Questions:
            </span>
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {interviewQAs.map((qa, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-[#12182c] border border-slate-800 text-xs space-y-1.5">
                  <strong className="text-amber-300 font-bold block">
                    Q: {qa.q}
                  </strong>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {qa.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
