import React from 'react';
import { useLearner } from '../../context/LearnerContext';
import { Target, CheckCircle2, Circle, BookOpen, Code2, HelpCircle, Trophy } from 'lucide-react';

export default function TodaysMission() {
  const { dailyMission, addXP, playAudio, triggerConfetti } = useLearner();

  const missions = [
    {
      id: 'readNotes',
      title: 'Read: Variables & Concepts',
      desc: 'Review 1 quick note or deep dive lesson',
      icon: BookOpen,
      done: dailyMission.readNotes,
      xp: 20
    },
    {
      id: 'solveChallenge',
      title: 'Code: Hands-On Challenge',
      desc: 'Run and pass tests in the Live IDE',
      icon: Code2,
      done: dailyMission.solveChallenge,
      xp: 50
    },
    {
      id: 'takeAssessment',
      title: 'Solve: Assessment Questions',
      desc: 'Answer conceptual & debugging checks',
      icon: HelpCircle,
      done: dailyMission.takeAssessment,
      xp: 40
    },
    {
      id: 'completeMock',
      title: 'Mock: Speed & Accuracy Test',
      desc: 'Complete 1 timed mock assessment',
      icon: Target,
      done: dailyMission.completeMock,
      xp: 50
    }
  ];

  const completedCount = missions.filter(m => m.done).length;
  const isAllCompleted = completedCount === missions.length;

  const handleClaimBonus = () => {
    if (isAllCompleted && !dailyMission.claimedXp) {
      addXP(100);
      playAudio('badge');
      triggerConfetti();
    }
  };

  return (
    <div className="w-full bg-[#0d1222] border border-[#212942] rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white tracking-wide flex items-center gap-1.5">
              TODAY'S MISSION
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300">
                {completedCount}/4 Completed
              </span>
            </h3>
          </div>
        </div>

        {/* Progress Pill */}
        <div className="text-xs font-bold text-amber-400">
          +160 XP Available
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full mb-3.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500 rounded-full"
          style={{ width: `${(completedCount / 4) * 100}%` }}
        />
      </div>

      {/* Tasks Grid */}
      <div className="space-y-2">
        {missions.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                m.done
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                  : 'bg-[#12182c]/60 border-slate-800/80 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {m.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <div>
                  <p className={`text-xs font-bold ${m.done ? 'line-through text-slate-400' : 'text-white'}`}>
                    {m.title}
                  </p>
                  <p className="text-[10px] text-slate-400">{m.desc}</p>
                </div>
              </div>
              <span className={`text-[11px] font-bold ${m.done ? 'text-emerald-400' : 'text-amber-400'}`}>
                +{m.xp} XP
              </span>
            </div>
          );
        })}
      </div>

      {isAllCompleted && (
        <button
          onClick={handleClaimBonus}
          className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <Trophy className="w-3.5 h-3.5 fill-slate-950" />
          <span>ALL DAILY MISSIONS COMPLETE! (+100 BONUS XP)</span>
        </button>
      )}
    </div>
  );
}
