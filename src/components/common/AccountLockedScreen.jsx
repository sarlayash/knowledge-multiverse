import React, { useState, useEffect } from 'react';
import { useLearner } from '../../context/LearnerContext';
import { getMailtoSecurityReport } from '../../utils/securityNotifier';
import { 
  ShieldAlert, Lock, Clock, Mail, AlertTriangle, KeyRound, 
  CheckCircle2, XCircle, ArrowRight, ShieldCheck 
} from 'lucide-react';

export default function AccountLockedScreen() {
  const { securityLock, unlockAccount, playAudio } = useLearner();
  const [timeLeftMs, setTimeLeftMs] = useState(
    Math.max(0, (securityLock?.lockedUntil || 0) - Date.now())
  );
  const [showAdminUnlock, setShowAdminUnlock] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminSuccess, setAdminSuccess] = useState(false);

  // Live countdown timer ticking every second
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, (securityLock?.lockedUntil || 0) - Date.now());
      setTimeLeftMs(remaining);

      // Auto-unlock when time reaches 0
      if (remaining <= 0 && securityLock?.isLocked) {
        unlockAccount();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [securityLock?.lockedUntil, securityLock?.isLocked]);

  const formatCountdown = (ms) => {
    const totalSecs = Math.floor(ms / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  };

  const handleAdminUnlock = (e) => {
    e.preventDefault();
    const cleanCode = adminPasscode.trim().toUpperCase();
    if (cleanCode === 'KAPIL2026' || cleanCode === 'MULTIVERSE24' || cleanCode === 'SARLAYASH') {
      setAdminSuccess(true);
      setAdminError('');
      playAudio('levelup');
      setTimeout(() => {
        unlockAccount();
      }, 1000);
    } else {
      setAdminError('Invalid Examiner Master Key. Access Denied.');
      playAudio('error');
    }
  };

  const mailtoUrl = getMailtoSecurityReport({
    incidentId: securityLock?.incidentId || 'INC-PENDING',
    learnerName: securityLock?.learnerName || 'Learner',
    violationReason: securityLock?.violationReason || 'Proctor security violation',
    lockedUntil: securityLock?.lockedUntil || Date.now() + 86400000
  });

  return (
    <div className="min-h-screen bg-[#07080f] text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-rose-500 selection:text-white">
      {/* Background threat glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-lg bg-[#0d1222] border-2 border-rose-500/80 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-center">
        {/* Animated Security Icon */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="w-full h-full rounded-3xl bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center text-4xl shadow-2xl shadow-rose-600/40 animate-pulse">
            <Lock className="w-10 h-10 text-rose-400" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-black shadow-md">
            !
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <span className="text-[10px] font-black tracking-widest uppercase text-rose-400 block font-mono">
            SECURITY PROTOCOL ENFORCED
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            ACCOUNT LOCKED FOR 24 HOURS
          </h1>
          <p className="text-xs text-rose-300 font-semibold">
            Academic Integrity Violation Detected in Hard Mock Assessment
          </p>
        </div>

        {/* Real-time Countdown Timer */}
        <div className="p-4 rounded-2xl bg-[#140b17] border border-rose-500/50 shadow-inner space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-rose-400" />
            <span>MANDATORY LOCKOUT EXPIRATION IN:</span>
          </span>
          <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono tracking-wider">
            {formatCountdown(timeLeftMs)}
          </div>
          <span className="text-[10px] text-slate-500 block font-mono">
            Unlocks at: {new Date(securityLock?.lockedUntil || Date.now() + 86400000).toLocaleString()}
          </span>
        </div>

        {/* Incident Forensic Log */}
        <div className="text-left bg-[#080d1a] border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span className="font-mono text-slate-400">Incident ID:</span>
            <span className="font-mono font-bold text-amber-300">{securityLock?.incidentId || 'INC-UNKNOWN'}</span>
          </div>

          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span className="font-mono text-slate-400">Learner Name:</span>
            <span className="font-bold text-white">{securityLock?.learnerName || 'Learner'}</span>
          </div>

          <div className="pb-1.5 border-b border-slate-800">
            <span className="font-mono text-slate-400 block mb-0.5">Violation Triggered:</span>
            <span className="font-semibold text-rose-300 leading-snug block">
              {securityLock?.violationReason || 'Tab switch or unauthorized screen capture detected'}
            </span>
          </div>

          <div className="pt-1">
            <span className="font-mono text-slate-400 block mb-1">Automated Security Dispatch:</span>
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Primary: <strong>kapilnarula27july@gmail.com</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Secondary: <strong>namaste@sarlayash.com</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Mailto Manual Verification Button */}
        <a
          href={mailtoUrl}
          className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all"
        >
          <Mail className="w-4 h-4 text-amber-400" />
          <span>View / Send Security Incident Report Email</span>
        </a>

        {/* Policy Explanation */}
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Knowledge Multiverse enforces zero-tolerance proctoring for FAANG qualification tests. All testing and learning modules remain suspended until the 24-hour lockout expires.
        </p>

        {/* Examiner / Admin Unlock Bypass */}
        <div className="pt-2 border-t border-slate-800/80">
          {!showAdminUnlock ? (
            <button
              onClick={() => setShowAdminUnlock(true)}
              className="text-[11px] text-slate-500 hover:text-amber-400 underline font-semibold flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <KeyRound className="w-3 h-3" />
              <span>Examiner / Admin Bypass Key</span>
            </button>
          ) : (
            <form onSubmit={handleAdminUnlock} className="space-y-2 pt-1 text-left">
              <label className="block text-[11px] font-bold text-slate-400">
                Enter Examiner Master Passcode (Kapil Narula):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="Enter master key..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="py-2 px-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase cursor-pointer hover:bg-amber-300"
                >
                  Unlock
                </button>
              </div>
              {adminError && <p className="text-[10px] text-rose-400 font-bold">{adminError}</p>}
              {adminSuccess && <p className="text-[10px] text-emerald-400 font-bold">Passcode Verified! Unlocking account...</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
