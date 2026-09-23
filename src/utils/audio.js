// Procedural Web Audio API sound synthesizer
// Zero external assets required, 100% offline-ready

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const playSound = (type = 'click') => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case 'click':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;

      case 'correct':
        // Pleasant rising major third
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
        break;

      case 'error':
        // Low minor tone
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(170, now + 0.18);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;

      case 'levelup':
      case 'badge':
        // Cosmic chord arpeggio
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const chordOsc = ctx.createOscillator();
          const chordGain = ctx.createGain();
          chordOsc.connect(chordGain);
          chordGain.connect(ctx.destination);

          chordOsc.type = 'sine';
          chordOsc.frequency.setValueAtTime(freq, now + i * 0.07);
          chordGain.gain.setValueAtTime(0, now + i * 0.07);
          chordGain.gain.linearRampToValueAtTime(0.12, now + i * 0.07 + 0.04);
          chordGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.35);
          chordOsc.start(now + i * 0.07);
          chordOsc.stop(now + i * 0.07 + 0.35);
        });
        break;

      default:
        break;
    }
  } catch (e) {
    // Audio context may be blocked by browser policy until user gesture
  }
};
