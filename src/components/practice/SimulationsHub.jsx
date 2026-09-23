import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { SIMULATIONS_DATA } from '../../data/simulationsData';
import { 
  Building2, Globe, Database, Code, Cloud, ShieldAlert, 
  GitBranch, CheckCircle2, Play, Terminal, ArrowRight, RotateCcw, Sparkles 
} from 'lucide-react';

export default function SimulationsHub() {
  const { completedSimulations, completeSimulation, playAudio, triggerConfetti } = useLearner();
  const [activeSim, setActiveSim] = useState(SIMULATIONS_DATA[0]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [commandRun, setCommandRun] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [evaluated, setEvaluated] = useState(false);

  const step = activeSim.steps[currentStepIdx] || activeSim.steps[0];
  const isSimCompleted = completedSimulations.includes(activeSim.id);

  const handleSelectSim = (sim) => {
    setActiveSim(sim);
    setCurrentStepIdx(0);
    setCommandRun(false);
    setSelectedOption(null);
    setEvaluated(false);
    playAudio('click');
  };

  const handleRunCommand = () => {
    setCommandRun(true);
    playAudio('click');
  };

  const handleCheckAnswer = () => {
    setEvaluated(true);
    if (selectedOption === step.correctIndex) {
      playAudio('correct');
    } else {
      playAudio('error');
    }
  };

  const handleNextStep = () => {
    setCommandRun(false);
    setSelectedOption(null);
    setEvaluated(false);

    if (currentStepIdx + 1 < activeSim.steps.length) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      // Completed all steps of this simulation!
      completeSimulation(activeSim.id);
    }
  };

  const handleResetSimulation = () => {
    setCurrentStepIdx(0);
    setCommandRun(false);
    setSelectedOption(null);
    setEvaluated(false);
  };

  return (
    <div className="space-y-4">
      {/* Simulation Selector Horizontal Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {SIMULATIONS_DATA.map((sim) => {
          const isDone = completedSimulations.includes(sim.id);
          const isSelected = activeSim.id === sim.id;

          return (
            <button
              key={sim.id}
              onClick={() => handleSelectSim(sim)}
              className={`p-3 rounded-2xl border text-left shrink-0 w-36 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-[#0d1222] border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl">{sim.icon}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <p className="text-xs font-bold text-white truncate">{sim.title}</p>
              <span className="text-[10px] text-slate-400 block">{sim.domain}</span>
            </button>
          );
        })}
      </div>

      {/* Active Simulation Workbench */}
      <div className="bg-[#0d1222] border border-[#212942] rounded-3xl p-5 shadow-2xl space-y-4">
        {/* Sim Title & Progress */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{activeSim.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  INDUSTRY SIMULATION
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {activeSim.difficulty}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white mt-0.5">
                {activeSim.title}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-amber-400 font-bold">
              Step {currentStepIdx + 1} of {activeSim.steps.length}
            </span>
          </div>
        </div>

        {/* Brief */}
        <p className="text-xs text-slate-300 bg-[#12182c] border border-slate-800/80 p-3 rounded-xl leading-relaxed">
          💼 <strong>Incident Brief:</strong> {activeSim.brief}
        </p>

        {/* Step Prompt */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Objective: {step.prompt}
          </span>

          {/* Interactive Terminal */}
          <div className="bg-[#05070f] border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
            <div className="bg-[#0a0e1c] px-3.5 py-2 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono text-slate-400 ml-2">bash terminal</span>
              </div>

              {!commandRun ? (
                <button
                  onClick={handleRunCommand}
                  className="py-1 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Play className="w-3 h-3 fill-slate-950" />
                  <span>Execute Diagnostic</span>
                </button>
              ) : (
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Executed
                </span>
              )}
            </div>

            <div className="p-3.5 font-mono text-xs text-emerald-400/90 whitespace-pre-wrap leading-relaxed">
              <p className="text-slate-400">$ {step.commandToRun}</p>
              {commandRun ? (
                <div className="mt-2 text-slate-200">
                  {step.output}
                </div>
              ) : (
                <p className="text-slate-600 italic mt-1">
                  (Click "Execute Diagnostic" above to inspect system telemetry...)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Diagnostic Question once command runs */}
        {commandRun && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs sm:text-sm font-extrabold text-white">
              {step.question}
            </h4>

            <div className="space-y-2">
              {step.options.map((opt, idx) => {
                let btnStyle = 'bg-[#12182c] border-slate-800 text-slate-300 hover:border-slate-700';

                if (selectedOption === idx) {
                  btnStyle = 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold';
                }

                if (evaluated) {
                  if (idx === step.correctIndex) {
                    btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={evaluated}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {evaluated && (
              <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                selectedOption === step.correctIndex
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/20 border-rose-500/40 text-rose-300'
              }`}>
                <strong>{selectedOption === step.correctIndex ? '✅ Correct Solution:' : '⚠️ Root Cause Analysis:'}</strong> {step.explanation}
              </div>
            )}

            {/* Next / Submit */}
            <div className="pt-2 flex justify-end">
              {!evaluated ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleCheckAnswer}
                  className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs uppercase disabled:opacity-30 cursor-pointer"
                >
                  Verify Diagnosis
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-extrabold text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <span>{currentStepIdx + 1 < activeSim.steps.length ? 'Next Step' : 'Finish Simulation (+120 XP)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {isSimCompleted && (
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Simulation Incident Resolved & Verified</span>
            </span>
            <button
              onClick={handleResetSimulation}
              className="text-[11px] underline text-slate-400 hover:text-white cursor-pointer"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
