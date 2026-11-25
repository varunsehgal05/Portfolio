import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Calendar, 
  Headphones, 
  Terminal,
  Layers,
  PenTool,
  Type,
  Square,
  MessageSquare
} from 'lucide-react';
import './ScreenSaver.css';

// =============================================================================
// PROCEDURAL LO-FI CHILL SYNTHESIZER & AUDIO ENGINE
// =============================================================================
// Infinite, zero-network-dependency, warm analog jazz chords, vinyl crackle,
// sub-bass, and soft lofi beats. Runs 100% locally on Web Audio API.
// =============================================================================
class LofiAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.tempo = 78; // Chill Lo-Fi tempo
    this.intervalId = null;
    this.step = 0;
    this.masterGain = null;
    this.filterNode = null;
    this.noiseNode = null;
    this.onStateChange = null;
    this.trackIndex = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      
      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.32, this.ctx.currentTime);

      // Warm Analog Low-Pass Filter (classic Lo-Fi muffled tape warmth)
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(1550, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.1, this.ctx.currentTime);

      this.filterNode.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn('Web Audio not supported or blocked:', e);
    }
  }

  start() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (this.isPlaying) return true;
    this.isPlaying = true;
    this.step = 0;

    // Reset gain smoothly
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.32, this.ctx.currentTime + 0.4);
    }

    // Start subtle vinyl crackle & tape saturation
    this.startVinylCrackle();

    // Start 16-step Lo-Fi sequencer (16th notes at chill tempo)
    const stepDuration = (60 / this.tempo) / 4;
    this.intervalId = setInterval(() => {
      this.playStep(this.step);
      this.step = (this.step + 1) % 64; // 4-bar loop
    }, stepDuration * 1000);

    if (this.onStateChange) this.onStateChange(true);
    return true;
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.noiseNode) {
      try { this.noiseNode.stop(); } catch (_) {}
      this.noiseNode = null;
    }
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.2);
      } catch (_) {}
    }
    if (this.onStateChange) this.onStateChange(false);
  }

  // Soft vinyl crackle & ambient tape texture
  startVinylCrackle() {
    if (!this.ctx || this.noiseNode) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut * 0.94) + (white * 0.06);
        const pop = Math.random() > 0.9994 ? (Math.random() * 0.25 - 0.12) : 0;
        data[i] = (lastOut * 0.05) + pop;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1100, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(0.9, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      this.noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      this.noiseNode.start();
    } catch (_) {}
  }

  // Soft Rhodes / Electric Piano chord
  playChord(notes, duration = 1.8) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      try {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Analog tape pitch flutter LFO
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.55 + idx * 0.08, now);
        lfoGain.gain.setValueAtTime(1.1, now);
        lfo.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + duration);

        // Soft ADSR envelope
        oscGain.gain.setValueAtTime(0.001, now);
        oscGain.gain.exponentialRampToValueAtTime(0.07 / notes.length, now + 0.07);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(oscGain);
        oscGain.connect(this.filterNode);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      } catch (_) {}
    });
  }

  // Soft low-passed Kick
  playKick() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(115, now);
      osc.frequency.exponentialRampToValueAtTime(36, now + 0.18);

      gain.gain.setValueAtTime(0.38, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.24);
    } catch (_) {}
  }

  // Soft Brush / Snare
  playSnare() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.1);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(950, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
    } catch (_) {}
  }

  // Swung Hi-hat
  playHiHat() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(6500, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(5000, now);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (_) {}
  }

  // Deep Sub Bass
  playBass(freq) {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.9);
    } catch (_) {}
  }

  // 4-Bar Lo-Fi Chord Progression: Dm9 -> G13 -> Cmaj9 -> Am7
  playStep(step) {
    if (step === 0) {
      this.playChord([146.83, 174.61, 220.00, 261.63, 329.63], 3.4); // Dm9
      this.playBass(73.42); // D2
    } else if (step === 16) {
      this.playChord([98.00, 174.61, 246.94, 329.63], 3.4); // G13
      this.playBass(98.00); // G2
    } else if (step === 32) {
      this.playChord([130.81, 164.81, 196.00, 246.94, 293.66], 3.4); // Cmaj9
      this.playBass(65.41); // C2
    } else if (step === 48) {
      this.playChord([110.00, 196.00, 261.63, 329.63], 3.4); // Am7
      this.playBass(55.00); // A1
    }

    const barStep = step % 16;
    // Kick on beat 1 and 3 (step 0, 8, and ghost on 11)
    if (barStep === 0 || barStep === 8 || barStep === 11) {
      this.playKick();
    }
    // Snare on beat 2 and 4 (step 4, 12)
    if (barStep === 4 || barStep === 12) {
      this.playSnare();
    }
    // Swung Hi-hats
    if (barStep % 2 === 0) {
      this.playHiHat();
    }
  }
}

// Global audio engine singleton
const lofiEngine = new LofiAudioEngine();

const LOFI_TRACKS = [
  { id: 'track-1', title: 'Lofi Coding Session #24 (128 BPM)', bpm: 128 },
  { id: 'track-2', title: 'Midnight Coffee Beats (78 BPM)', bpm: 78 },
  { id: 'track-3', title: 'Tokyo Rain & Analog Rhodes (72 BPM)', bpm: 72 },
  { id: 'track-4', title: 'Deep Focus Cyberpunk Chill (84 BPM)', bpm: 84 }
];

// =============================================================================
// MAIN COMPONENT: ScreenSaver
// =============================================================================
const ScreenSaver = ({ isIdle, onWake }) => {
  const [time, setTime] = useState(new Date());
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const containerRef = useRef(null);
  const hasAttemptedAutoplay = useRef(false);
  const enteredSleepTimeRef = useRef(0);

  // Clock Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Connect Audio Engine State
  useEffect(() => {
    lofiEngine.onStateChange = (playing) => {
      setIsPlayingMusic(playing);
    };
  }, []);

  // AUTO-PLAY LOFI MUSIC WHEN ENTERING SLEEP & STOP WHEN WAKING UP
  useEffect(() => {
    if (isIdle) {
      enteredSleepTimeRef.current = Date.now();
      // Attempt auto-play when entering sleep
      const timer = setTimeout(() => {
        try {
          const started = lofiEngine.start();
          if (started) {
            setIsPlayingMusic(true);
          }
        } catch (e) {
          console.warn('Autoplay audio policy deferred until user gesture:', e);
        }
      }, 350);

      hasAttemptedAutoplay.current = true;
      return () => clearTimeout(timer);
    } else {
      // Smoothly stop music when waking up
      lofiEngine.stop();
      setIsPlayingMusic(false);
      hasAttemptedAutoplay.current = false;
    }
  }, [isIdle]);

  // Handle Wake Events: Keys, Clicks, or Taps on the background
  const handleWake = useCallback((e) => {
    // Guard against immediate wake-up from the click/tap that triggered sleep (750ms debounce)
    if (Date.now() - enteredSleepTimeRef.current < 750) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      return;
    }
    lofiEngine.stop();
    setIsPlayingMusic(false);
    onWake();
  }, [onWake]);

  useEffect(() => {
    if (!isIdle) return;

    const handleKeyDown = (e) => {
      // Any key wakes up the screensaver
      handleWake(e);
    };

    // Delay slightly to prevent wake-up from the shortcut/key that triggered sleep
    const timeout = setTimeout(() => {
      window.addEventListener('keydown', handleKeyDown);
    }, 400);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isIdle, handleWake]);

  // Audio Play/Pause Toggle (Does NOT wake up screensaver)
  const toggleMusic = (e) => {
    if (e) e.stopPropagation();
    if (isPlayingMusic) {
      lofiEngine.stop();
      setIsPlayingMusic(false);
    } else {
      lofiEngine.start();
      setIsPlayingMusic(true);
    }
  };

  // Next Track Selector (Does NOT wake up screensaver)
  const nextTrack = (e) => {
    if (e) e.stopPropagation();
    const nextIdx = (currentTrackIndex + 1) % LOFI_TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    lofiEngine.tempo = LOFI_TRACKS[nextIdx].bpm === 128 ? 80 : LOFI_TRACKS[nextIdx].bpm;
  };

  // Date & Time formatting
  const timeHours = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).replace(/\s*(AM|PM)/i, '');

  const amPm = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true
  }).slice(-2).toUpperCase();

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const currentTrack = LOFI_TRACKS[currentTrackIndex];

  return (
    <div 
      ref={containerRef}
      className={`screensaver ${isIdle ? 'active' : ''}`}
      onClick={handleWake}
      onTouchEnd={handleWake}
      role="dialog"
      aria-modal="true"
      aria-label="Figma Screensaver Idle Mode"
    >
      {/* 1. TOP STATUS BAR (Header matching user screenshot) */}
      <header className="screensaver-top-bar" onClick={(e) => e.stopPropagation()}>
        <div className="top-bar-left">
          <span className="top-bar-hash">#</span>
          <span className="top-bar-title">Varun_Sehgal_OS</span>
          <span className="top-bar-divider">/</span>
          <span className="top-bar-sub">Screensaver_Idle_v4.2</span>
          <span className="top-bar-live-dot" title="Live Figma Canvas"></span>
        </div>

        {/* Top-Right Option Removed for Minimal Clean UI */}
      </header>

      {/* 2. BACKGROUND CANVAS CODE ANNOTATIONS & BEZIER VECTORS */}
      <div className="screensaver-canvas-stage">
        {/* Top-Left Floating Code Snippet */}
        <pre className="floating-code-annotation top-left hide-on-mobile">
          <code>
            {`figma.currentPage.selection = [frame_screensaver];\nconst vibeMode = "hyperfocus";\n// AutoLayout: H(Fill) V(Hug)`}
          </code>
        </pre>

        {/* Bottom-Right Floating Code Snippet */}
        <pre className="floating-code-annotation bottom-right hide-on-mobile">
          <code>
            {`import { motion, AnimatePresence } from 'framer-motion';\n<Canvas gl={{ antialias: true, dpr: 2 }} />\n/* token: var(--vibe-primary-600) */`}
          </code>
        </pre>

        {/* Ambient Dashed Curved Vector Paths */}
        <svg className="screensaver-ambient-vector-svg" viewBox="0 0 1440 900" fill="none">
          <path 
            d="M -100 240 C 200 120, 320 540, 600 420" 
            stroke="rgba(56, 189, 248, 0.16)" 
            strokeWidth="1.5" 
            strokeDasharray="6 6" 
          />
          <path 
            d="M 900 320 C 1100 220, 1300 480, 1600 380" 
            stroke="rgba(168, 85, 247, 0.16)" 
            strokeWidth="1.5" 
            strokeDasharray="6 6" 
          />
        </svg>

        {/* 3. CENTER HERO CLOCK FRAME (#Frame_HeroClock 820 x 440) */}
        <div 
          className="screensaver-hero-frame" 
          onClick={(e) => {
            // Clicking inside frame directly on wake badge or background wakes up
          }}
        >
          {/* Frame Selection Square Handles (8 Figma Bounding Box Handles) */}
          <span className="handle-dot top-left"></span>
          <span className="handle-dot top-mid"></span>
          <span className="handle-dot top-right"></span>
          <span className="handle-dot right-mid"></span>
          <span className="handle-dot bottom-right"></span>
          <span className="handle-dot bottom-mid"></span>
          <span className="handle-dot bottom-left"></span>
          <span className="handle-dot left-mid"></span>

          {/* Top-Left Frame Tag */}
          <div className="frame-meta-tag top-left-label">
            #Frame_HeroClock 820 x 440
          </div>

          {/* Top-Right AutoLayout Tag */}
          <div className="frame-meta-tag top-right-label">
            AutoLayout: Col · Gap: 24 · Center
          </div>

          {/* Inside Content: VibeCoder Code Spec Pill */}
          <div className="hero-code-spec">
            <span className="code-bracket">&lt; </span>
            <span className="code-component">VarunSehgal </span>
            <span className="code-prop">role </span>
            <span className="code-equal">= </span>
            <span className="code-string">&quot;VibeCoder&quot; </span>
            <span className="code-prop">spec </span>
            <span className="code-equal">= </span>
            <span className="code-string-accent">&quot;Design × Code&quot; </span>
            <span className="code-bracket">/&gt;</span>
          </div>

          {/* Large Digital Clock */}
          <div className="hero-digital-clock">
            <span className="clock-digits">{timeHours}</span>
            <span className="clock-ampm">{amPm}</span>
          </div>

          {/* Canvas Tick Rate Subtitle */}
          <div className="hero-tick-rate">
            <span className="tick-line"></span>
            <span className="tick-text">FIGMA CANVAS TICK RATE // 1000ms</span>
            <span className="tick-line"></span>
          </div>

          {/* Date & Sprint Row */}
          <div className="hero-date-row">
            <div className="hero-date">
              <Calendar size={14} className="date-icon" />
              <span>{formattedDate}</span>
            </div>
            <div className="hero-sprint-badge">
              <span>Sprint 48 // Deep Focus</span>
            </div>
          </div>

          {/* Wake Up Interactive CTA Pill */}
          <button 
            type="button" 
            className="hero-wake-cta"
            onClick={handleWake}
            title="Wake up and return to desktop"
          >
            <span className="wake-dot"></span>
            <span className="wake-label-desktop">Press any key or click to wake up</span>
            <span className="wake-label-mobile">Tap anywhere to wake up</span>
            <kbd className="wake-esc-badge">ESC</kbd>
          </button>
        </div>

        {/* 4. BELOW-FRAME MUSIC PILL (Cleaned per user request: only the music pill remains, no pause button) */}
        <div className="below-frame-container" onClick={(e) => e.stopPropagation()}>
          <div className="below-controls-row">
            {/* Ambient Lo-Fi Audio Pill */}
            <div 
              className="lofi-player-pill" 
              onClick={nextTrack}
              title="Click to cycle Lo-Fi track"
              style={{ cursor: 'pointer' }}
            >
              <Headphones size={13} className="lofi-headphone-icon" />
              
              {/* Visualizer Sound Wave Bars */}
              <div className="lofi-sound-bars">
                <span className={`sound-bar ${isPlayingMusic ? 'playing' : ''}`}></span>
                <span className={`sound-bar ${isPlayingMusic ? 'playing' : ''}`}></span>
                <span className={`sound-bar ${isPlayingMusic ? 'playing' : ''}`}></span>
                <span className={`sound-bar ${isPlayingMusic ? 'playing' : ''}`}></span>
              </div>

              <span className="lofi-track-title">
                Track: {currentTrack.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM TOOLBAR (Figma Canvas Dock matching screenshot) */}
      <footer className="screensaver-bottom-dock" onClick={(e) => e.stopPropagation()}>
        <div className="dock-left-tools">
          <button type="button" className="dock-tool-btn active" title="Select / Move">
            <Layers size={13} />
          </button>
          <button type="button" className="dock-tool-btn" title="Pen Tool">
            <PenTool size={13} />
          </button>
          <button type="button" className="dock-tool-btn" title="Text Tool">
            <Type size={13} />
          </button>
          <button type="button" className="dock-tool-btn" title="Rectangle Tool">
            <Square size={13} />
          </button>
          <button type="button" className="dock-tool-btn" title="Comment Tool">
            <MessageSquare size={13} />
          </button>
        </div>

        <div className="dock-right-status">
          <span className="runtime-dot"></span>
          <span className="runtime-label">VibeCoder Runtime: Active | v2.4.0-screensaver</span>
        </div>
      </footer>
    </div>
  );
};

export default ScreenSaver;
