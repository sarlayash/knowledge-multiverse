import React, { useState } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle, Sparkles, X } from 'lucide-react';

export default function AssessmentRunner({ level, onComplete, onClose }) {
  const { recordAssessment, playAudio, triggerConfetti } = useLearner();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const questions = level?.assessments || [];
  const currentQ = questions[currentIdx];

  if (!currentQ) {
    return (
      <div className="p-6 text-center text-slate-300">
        <p>No assessment questions configured for this level yet.</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs">
          Close
        </button>
      </div>
    );
  }

  const selectedAnswer = selectedAnswers[currentIdx];
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect = isAnswered && selectedAnswer === currentQ.correctIndex;

  const handleSelectOption = (index) => {
    if (submitted) return;
    playAudio('click');
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: index }));
  };

  const handleSubmitQuestion = () => {
    setSubmitted(true);
    setShowExplanation(true);
    if (isCorrect) {
      playAudio('correct');
    } else {
      playAudio('error');
    }
  };

  const handleNext = () => {
    setSubmitted(false);
    setShowExplanation(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Finished all questions!
      evaluateOverallScore();
    }
  };

  const evaluateOverallScore = () => {
    let score = 0;
    const failedTopics = [];

    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      } else {
        failedTopics.push(level.title + ': ' + q.type.replace('_', ' ').toUpperCase());
      }
    });

    recordAssessment(level.id, score, questions.length, failedTopics);
    if (onComplete) {
      onComplete(score, questions.length);
    }
  };

  const difficultyColors = {
    easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    hard: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0d1222] border border-[#212a45] rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
              <HelpCircle className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm text-white">
                LEVEL {level.id} ASSESSMENT
              </h3>
              <p className="text-[10px] text-slate-400">
                Question {currentIdx + 1} of {questions.length} • Type: {currentQ.type.replace('_', ' ').toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${difficultyColors[currentQ.difficulty] || difficultyColors.medium}`}>
              {currentQ.difficulty}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="my-4">
          <h4 className="text-sm sm:text-base font-extrabold text-white leading-relaxed whitespace-pre-wrap">
            {currentQ.question}
          </h4>
        </div>

        {/* Options */}
        <div className="space-y-2.5 my-4">
          {currentQ.options.map((option, idx) => {
            let optionStyles = 'bg-[#12182c] border-slate-800 text-slate-200 hover:border-slate-700';

            if (selectedAnswer === idx) {
              optionStyles = 'bg-amber-500/15 border-amber-400 text-amber-200';
            }

            if (submitted) {
              if (idx === currentQ.correctIndex) {
                optionStyles = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
              } else if (selectedAnswer === idx && !isCorrect) {
                optionStyles = 'bg-rose-950/40 border-rose-500 text-rose-200';
              }
            }

            return (
              <button
                key={idx}
                disabled={submitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${optionStyles}`}
              >
                <span>{option}</span>
                {submitted && idx === currentQ.correctIndex && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                )}
                {submitted && selectedAnswer === idx && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* WHY WAS THIS WRONG? Conceptual Feedback (Pages 6-7 Specification) */}
        {showExplanation && (
          <div className={`p-4 rounded-2xl border my-4 ${
            isCorrect
              ? 'bg-emerald-950/20 border-emerald-500/30'
              : 'bg-amber-950/20 border-amber-500/40'
          }`}>
            <div className="flex items-center gap-2 mb-1.5 font-bold text-xs">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">CORRECT ANALYSIS! (+40 XP)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 uppercase tracking-wider">WHY WAS THIS WRONG?</span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {currentQ.whyWrong || currentQ.explanation}
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            Progress: {currentIdx + 1}/{questions.length}
          </div>

          {!submitted ? (
            <button
              disabled={!isAnswered}
              onClick={handleSubmitQuestion}
              className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider disabled:opacity-30 cursor-pointer shadow-md shadow-amber-400/20"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
            >
              <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'Complete Assessment'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
