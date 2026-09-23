import React from 'react';
import { useLearner } from '../../context/LearnerContext';
import { Home, Compass, BookOpen, Terminal, Trophy } from 'lucide-react';

export default function BottomNav() {
  const { activeTab, setActiveTab, unlockedBadges } = useLearner();

  const tabs = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'journey', label: 'JOURNEY', icon: Compass },
    { id: 'learn', label: 'LEARN', icon: BookOpen },
    { id: 'practice', label: 'PRACTICE', icon: Terminal },
    { id: 'achievements', label: 'ACHIEVE', icon: Trophy, badgeCount: unlockedBadges.length },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#07080f]/95 backdrop-blur-lg border-t border-[#1b2236] px-2 py-1.5 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-amber-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1.5 w-6 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-200 rounded-full shadow-[0_0_8px_#f59e0b]" />
              )}
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-amber-400' : ''}`} />
                {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                  <span className="absolute -top-1 -right-2 text-[9px] bg-amber-500 text-black font-extrabold px-1 rounded-full">
                    {tab.badgeCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-wide mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
