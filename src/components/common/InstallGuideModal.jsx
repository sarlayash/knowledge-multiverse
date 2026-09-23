import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Share2, PlusSquare, CheckCircle2, X, Laptop, Sparkles } from 'lucide-react';

export default function InstallGuideModal({ onClose }) {
  const [platform, setPlatform] = useState('android');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect OS
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setPlatform('ios');
    } else if (/android/i.test(userAgent)) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    // Check if already in standalone display mode
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('To install, use the browser menu (⋮) -> "Add to Home screen" or "Install app".');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0d1222] border border-amber-400/50 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20 shrink-0">
            📲
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INSTALLATION GUIDE</span>
            </div>
            <h3 className="text-base font-extrabold text-white mt-0.5">
              Download & Install App
            </h3>
            <p className="text-[11px] text-slate-400">
              Install Knowledge Multiverse on Android, iPhone & Desktop
            </p>
          </div>
        </div>

        {/* Direct One-Click Install if supported */}
        {deferredPrompt && !isInstalled && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent border border-amber-400/60 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-black text-white">Instant 1-Click Install</h4>
              <p className="text-[11px] text-slate-300">Tap below to install directly on your device</p>
            </div>
            <button
              onClick={handleInstallClick}
              className="py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              Install Now
            </button>
          </div>
        )}

        {isInstalled && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Knowledge Multiverse is already running as an installed app!</span>
          </div>
        )}

        {/* Platform Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 bg-[#090d1a] p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setPlatform('android')}
            className={`py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
              platform === 'android' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🤖</span>
            <span>Android</span>
          </button>

          <button
            onClick={() => setPlatform('ios')}
            className={`py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
              platform === 'ios' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🍏</span>
            <span>iPhone / iOS</span>
          </button>

          <button
            onClick={() => setPlatform('desktop')}
            className={`py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
              platform === 'desktop' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>💻</span>
            <span>PC / Mac</span>
          </button>
        </div>

        {/* ANDROID INSTRUCTIONS */}
        {platform === 'android' && (
          <div className="space-y-3 pt-1 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#12182c] border border-slate-800 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <p className="font-bold text-white">Open in Google Chrome or Samsung Internet</p>
                  <p className="text-[11px] text-slate-400">Navigate to: <strong className="text-amber-300">https://sarlayash.github.io/knowledge-multiverse/</strong></p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <p className="font-bold text-white">Tap the 3-Dots Menu (⋮)</p>
                  <p className="text-[11px] text-slate-400">Located at the top-right corner of your browser screen.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <p className="font-bold text-white">Tap "Install App" or "Add to Home screen"</p>
                  <p className="text-[11px] text-slate-400">Confirm the prompt by tapping <strong>Install</strong>.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs">✓</span>
                <div>
                  <p className="font-bold text-emerald-300">Enjoy Fullscreen & Offline Access</p>
                  <p className="text-[11px] text-slate-400">The app icon is now on your home screen with zero browser bars!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* IPHONE / IOS INSTRUCTIONS */}
        {platform === 'ios' && (
          <div className="space-y-3 pt-1 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#12182c] border border-slate-800 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <p className="font-bold text-white">Open Safari on iPhone or iPad</p>
                  <p className="text-[11px] text-slate-400">Visit: <strong className="text-amber-300">https://sarlayash.github.io/knowledge-multiverse/</strong></p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <p className="font-bold text-white">Tap the Share Button (⎋)</p>
                  <p className="text-[11px] text-slate-400">The square icon with an upward arrow at the bottom of Safari.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <p className="font-bold text-white">Scroll down & Tap "Add to Home Screen" (⊞)</p>
                  <p className="text-[11px] text-slate-400">Tap <strong>"Add"</strong> in the top right corner.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs">✓</span>
                <div>
                  <p className="font-bold text-emerald-300">Installed on your iOS Home Screen!</p>
                  <p className="text-[11px] text-slate-400">Opens like an App Store app with native gestures and haptic sounds.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DESKTOP / PC INSTRUCTIONS */}
        {platform === 'desktop' && (
          <div className="space-y-3 pt-1 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#12182c] border border-slate-800 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <p className="font-bold text-white">Open in Chrome, Edge, or Brave</p>
                  <p className="text-[11px] text-slate-400">Visit <strong className="text-amber-300">https://sarlayash.github.io/knowledge-multiverse/</strong></p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <p className="font-bold text-white">Click the Install Icon (⊕) in the Address Bar</p>
                  <p className="text-[11px] text-slate-400">Located on the right side of the URL bar (near the bookmark star).</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs">✓</span>
                <div>
                  <p className="font-bold text-emerald-300">Dedicated Window & Taskbar Icon</p>
                  <p className="text-[11px] text-slate-400">Runs as a dedicated fast desktop app with keyboard shortcuts!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Card */}
        <div className="p-3.5 rounded-2xl bg-[#090d1a] border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <strong className="text-white block font-bold">✨ Why install as an app?</strong>
          <p>• Zero app store downloads or storage bloat (takes &lt; 2 MB)</p>
          <p>• Offline capability: study notes and test cases without internet</p>
          <p>• Fullscreen immersion: no browser address bars or navigation clutter</p>
          <p>• Automatic instantaneous background updates</p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-400/20 cursor-pointer"
        >
          Got It, Start Learning
        </button>
      </div>
    </div>
  );
}
