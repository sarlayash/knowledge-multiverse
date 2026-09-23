import React, { useState } from 'react';
import LiveIDE from './LiveIDE';
import SimulationsHub from './SimulationsHub';
import ProjectsHub from './ProjectsHub';
import ContextTrilogy from '../layout/ContextTrilogy';
import { useLearner } from '../../context/LearnerContext';
import { Terminal, Cpu, FolderGit2, Target } from 'lucide-react';

export default function PracticeView() {
  const { openModal } = useLearner();
  const [subTab, setSubTab] = useState('ide'); // 'ide' | 'sims' | 'projects'

  return (
    <div className="space-y-4 pb-24 max-w-lg mx-auto px-4 pt-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>PRACTICE ECOSYSTEM</span>
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            Hands-On Arena
          </h1>
          <p className="text-xs text-slate-400">
            Write, simulate, build and prove your engineering skills
          </p>
        </div>

        {/* Launch Mock Test Center Button */}
        <button
          onClick={() => openModal('mock')}
          className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Target className="w-4 h-4" />
          <span className="hidden sm:inline">Mock Center</span>
        </button>
      </div>

      <ContextTrilogy />

      {/* Sub Tabs */}
      <div className="grid grid-cols-3 gap-1.5 bg-[#0d1222] p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setSubTab('ide')}
          className={`py-2 px-1 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            subTab === 'ide'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>LIVE IDE</span>
        </button>

        <button
          onClick={() => setSubTab('sims')}
          className={`py-2 px-1 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            subTab === 'sims'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>7 SIMULATIONS</span>
        </button>

        <button
          onClick={() => setSubTab('projects')}
          className={`py-2 px-1 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            subTab === 'projects'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>PROJECTS</span>
        </button>
      </div>

      {/* Tab Content */}
      {subTab === 'ide' && <LiveIDE />}
      {subTab === 'sims' && <SimulationsHub />}
      {subTab === 'projects' && <ProjectsHub />}
    </div>
  );
}
