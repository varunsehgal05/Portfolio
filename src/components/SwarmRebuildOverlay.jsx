import React, { useState, useEffect, useRef } from 'react';
import { FastForward, Volume2, VolumeX, Sparkles, Crosshair, Play, Pause } from 'lucide-react';
import './SwarmRebuildOverlay.css';

// SVG Pointer Component in authentic Figma/Swarm style
const SwarmCursor = ({
  x,
  y,
  color,
  label,
  action,
  isDrawing,
  boxBounds,
  isCrosshair,
  caretText,
  dupBadge
}) => {
  return (
    <div
      className="swarm-cursor-agent"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
        '--cursor-color': color
      }}
    >
      {/* Cursor Icon: Crosshair when drafting, Arrow when navigating */}
      {isCrosshair ? (
        <div className="swarm-crosshair-icon" style={{ borderColor: color }}>
          <div className="ch-h" style={{ backgroundColor: color }} />
          <div className="ch-v" style={{ backgroundColor: color }} />
        </div>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="swarm-pointer-svg">
          <path
            d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
            fill={color}
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        </svg>
      )}

      {/* Floating user name tag */}
      <div className="swarm-cursor-tag" style={{ backgroundColor: color }}>
        <span className="swarm-cursor-name">{label}</span>
        {action && <span className="swarm-cursor-action">{action}</span>}
      </div>

      {/* Option-drag duplicate badge (⌥ Duplicate) */}
      {dupBadge && (
        <div className="swarm-dup-badge" style={{ backgroundColor: color }}>
          <span>⌥ {dupBadge}</span>
        </div>
      )}

      {/* Simulated Typing Caret Bubble */}
      {caretText && (
        <div className="swarm-typing-bubble" style={{ borderColor: color }}>
          <span className="typing-text">{caretText}</span>
          <span className="typing-caret" />
        </div>
      )}
    </div>
  );
};

// Web Audio API Synthesizer with rich mechanical tactile clicks & chord chime
class SwarmSoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playTypeClick(freq = 340) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() * 60 - 30), this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  playSnap(freq = 680, duration = 0.04) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playDropThump(freq = 180) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playChime() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      // C5, E5, G5, B5, D6
      [523.25, 659.25, 783.99, 987.77, 1174.66].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.075);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime + i * 0.075);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.075 + 0.55);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.075);
        osc.stop(this.ctx.currentTime + i * 0.075 + 0.55);
      });
    } catch (e) {}
  }
}

const soundSynth = new SwarmSoundSynthesizer();

// Smooth easing formulas
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const lerp = (a, b, t) => a + (b - a) * t;

const SwarmRebuildOverlay = ({ userName = 'Guest', onStageChange, onComplete }) => {
  const [guides, setGuides] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Initializing swarm agents...');
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 1x or 2x
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completeBanner, setCompleteBanner] = useState(false);

  const animFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const pausedTimeRef = useRef(0);
  const isFinishedRef = useRef(false);
  const stageRef = useRef(0);
  const lastTypeTimeRef = useRef(0);

  // Screen dimensions
  const [dims, setDims] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900
  });

  useEffect(() => {
    const handleResize = () => {
      setDims({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 4 Cursors State
  const [cursors, setCursors] = useState({
    varun: { x: 40, y: 40, color: '#A259FF', label: 'Varun Sehgal', action: 'Lead Architect', isDrawing: false, boxBounds: null },
    user: { x: dims.w - 100, y: 60, color: '#1ABCFE', label: userName || 'You', action: 'Joining...', isDrawing: false, boxBounds: null },
    sarah: { x: 80, y: dims.h - 120, color: '#FF7262', label: 'Sarah Lin', action: 'UI Systems', isDrawing: false, boxBounds: null },
    alex: { x: dims.w - 120, y: dims.h - 80, color: '#0ACF83', label: 'Alex Chen', action: 'Systems & Dock', isDrawing: false, boxBounds: null }
  });

  const finishSwarm = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    soundSynth.playChime();
    setCompleteBanner(true);
    setStatusMessage('✓ VarunOS Workspace Assembled & Ready!');
    if (onStageChange) onStageChange(5);

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 450);
  };

  const handleToggleSound = () => {
    const nextMuted = soundSynth.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleToggleSpeed = () => {
    setSpeedMultiplier((prev) => (prev === 1 ? 2 : 1));
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Keyboard shortcuts (Escape = Skip, M = Mute, Space = Pause)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        finishSwarm();
      } else if (e.key.toLowerCase() === 'm') {
        handleToggleSound();
      } else if (e.key === ' ') {
        e.preventDefault();
        handleTogglePause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update parent stage smoothly
  const updateStage = (newStage, soundFreq = 640) => {
    if (stageRef.current !== newStage) {
      stageRef.current = newStage;
      if (onStageChange) onStageChange(newStage);
      soundSynth.playSnap(soundFreq, 0.045);
    }
  };

  // High-fidelity continuous animation loop
  useEffect(() => {
    startTimeRef.current = Date.now();
    soundSynth.init();
    updateStage(0);

    const loop = () => {
      if (isFinishedRef.current) return;

      if (isPaused) {
        animFrameRef.current = requestAnimationFrame(loop);
        return;
      }

      // Elapsed scaled by speedMultiplier
      const rawElapsed = (Date.now() - startTimeRef.current) / 1000;
      const elapsed = rawElapsed * speedMultiplier;
      const { w, h } = dims;

      // =====================================================================
      // Phase 1: Top MenuBar Drafting & Snapping (0.0s - 1.1s)
      // =====================================================================
      if (elapsed < 1.1) {
        setStatusMessage('[1/5] Drafting macOS MenuBar wireframe...');
        const t = Math.min(1, elapsed / 1.1);
        const eased = easeInOutCubic(t);

        const menuX = lerp(40, w, eased);
        const userX = lerp(w - 60, w - 240, eased);
        const userY = lerp(50, 18, eased);

        if (t > 0.75) {
          updateStage(1, 680); // Reveal MenuBar
        }

        setCursors({
          varun: {
            x: menuX,
            y: 18,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Drafting 100vw MenuBar',
            isDrawing: true,
            isCrosshair: true,
            boxBounds: { x: 0, y: 0, w: menuX, h: 28, label: 'MenuBar 100vw × 28px • Blur(24px)' }
          },
          user: {
            x: userX,
            y: userY,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Aligning Status Tray',
            isDrawing: false
          },
          sarah: {
            x: lerp(80, 56, eased),
            y: lerp(240, 90, eased),
            color: '#FF7262',
            label: 'Sarah Lin',
            action: 'Grid Setup: 20px Margin'
          },
          alex: {
            x: lerp(w - 120, w / 2, eased),
            y: lerp(h - 100, h - 80, eased),
            color: '#0ACF83',
            label: 'Alex Chen',
            action: 'Baseline Measuring'
          }
        });

        setGuides([
          { type: 'h', pos: 28, label: 'Y: 28px (Top Bar Snapped)' }
        ]);
      }
      // =====================================================================
      // Phase 2: Desktop App Icons Stamping & Stagger (1.1s - 2.2s)
      // =====================================================================
      else if (elapsed < 2.2) {
        setStatusMessage('[2/5] Stamping & Duplicating Desktop Apps...');
        const t = (elapsed - 1.1) / 1.1;
        const eased = easeOutBack(Math.min(1, t));

        if (t > 0.65) {
          updateStage(2, 740); // Reveal Desktop Icons
        }

        const iconYProgress = lerp(60, 420, Math.min(1, t * 1.1));
        const iconIndex = Math.min(4, Math.floor(t * 5));
        const iconNames = ['Figma', 'VS Code', 'Resume.pdf', 'Contact', 'Trash'];

        // Typing/Stamping sound trigger
        if (Date.now() - lastTypeTimeRef.current > 180 && t < 0.8) {
          soundSynth.playDropThump(220 + iconIndex * 40);
          lastTypeTimeRef.current = Date.now();
        }

        setCursors({
          sarah: {
            x: 56,
            y: iconYProgress,
            color: '#FF7262',
            label: 'Sarah Lin',
            action: `Stamping: ${iconNames[iconIndex]}`,
            isDrawing: true,
            isCrosshair: true,
            dupBadge: `Duplicate +${iconIndex + 1}`,
            boxBounds: {
              x: 20,
              y: iconYProgress - 35,
              w: 72,
              h: 70,
              label: `${iconNames[iconIndex]} (72 × 70px)`
            }
          },
          varun: {
            x: lerp(w - 80, w / 2 - 200, easeInOutCubic(t)),
            y: lerp(28, (h - 560) / 2 + 40, easeInOutCubic(t)),
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Targeting Finder Viewport'
          },
          user: {
            x: lerp(w - 240, w / 2 + 200, easeInOutCubic(t)),
            y: lerp(28, (h - 560) / 2 + 100, easeInOutCubic(t)),
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Verifying Vertical Spacing'
          },
          alex: {
            x: lerp(w / 2, w / 2, easeInOutCubic(t)),
            y: lerp(h - 80, h - 70, easeInOutCubic(t)),
            color: '#0ACF83',
            label: 'Alex Chen',
            action: 'Holding Anchor'
          }
        });

        setGuides([
          { type: 'v', pos: 20, label: 'X: 20px Margin' },
          { type: 'v', pos: 92, label: 'X: 92px Column' }
        ]);
      }
      // =====================================================================
      // Phase 3: Center Finder Window & Live Headline Typing (2.2s - 3.8s)
      // =====================================================================
      else if (elapsed < 3.8) {
        setStatusMessage('[3/5] Constructing Finder Window & Typing Content...');
        const t = (elapsed - 2.2) / 1.6;
        const eased = easeInOutCubic(Math.min(1, t));

        const targetW = Math.min(920, w - 80);
        const targetH = Math.min(560, h - 110);
        const winX = (w - targetW) / 2;
        const winY = (h - targetH) / 2 - 10;

        const currentW = lerp(340, targetW, Math.min(1, eased * 1.2));
        const currentH = lerp(220, targetH, Math.min(1, eased * 1.2));
        const curX = (w - currentW) / 2;
        const curY = (h - currentH) / 2 - 10;

        if (t > 0.45) {
          updateStage(3, 800); // Reveal Finder Window
        }

        // Live Headline Typing Simulation
        const headlineText = 'Designing intuitive web apps & modern interfaces';
        const typingProgress = Math.min(1, Math.max(0, (t - 0.4) / 0.55));
        const charCount = Math.floor(typingProgress * headlineText.length);
        const currentTyped = headlineText.substring(0, charCount);

        if (typingProgress > 0 && typingProgress < 1 && Date.now() - lastTypeTimeRef.current > 75) {
          soundSynth.playTypeClick(320 + Math.random() * 80);
          lastTypeTimeRef.current = Date.now();
        }

        setCursors({
          user: {
            x: curX + currentW,
            y: curY + currentH,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Bottom-Right Extrude',
            isDrawing: true,
            isCrosshair: true,
            boxBounds: {
              x: curX,
              y: curY,
              w: currentW,
              h: currentH,
              label: `VarunOS Portfolio — ${Math.round(currentW)} × ${Math.round(currentH)} px`
            }
          },
          varun: {
            x: curX + 210 + (charCount * 7.5),
            y: curY + 95,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Typing Headline...',
            caretText: currentTyped
          },
          sarah: {
            x: curX + 180 + (t > 0.6 ? 240 : 0),
            y: curY + 280,
            color: '#FF7262',
            label: 'Sarah Lin',
            action: t > 0.6 ? 'Duplicating Project Cards' : 'Top-Right Anchor',
            dupBadge: t > 0.6 ? '4 Projects Grid' : null
          },
          alex: {
            x: curX,
            y: curY + currentH,
            color: '#0ACF83',
            label: 'Alex Chen',
            action: 'Bottom-Left Anchor'
          }
        });

        setGuides([
          { type: 'h', pos: winY, label: 'Y: Window Top' },
          { type: 'h', pos: winY + targetH, label: 'Y: Window Bottom' },
          { type: 'v', pos: winX, label: 'X: Center Left Snap' },
          { type: 'v', pos: winX + targetW, label: 'X: Center Right Snap' }
        ]);
      }
      // =====================================================================
      // Phase 4: Bottom macOS Dock Capsule (3.8s - 4.7s)
      // =====================================================================
      else if (elapsed < 4.7) {
        setStatusMessage('[4/5] Extruding Glass Dock Capsule...');
        const t = (elapsed - 3.8) / 0.9;
        const eased = easeOutBack(Math.min(1, t));

        const dockTargetW = Math.min(480, w - 40);
        const currentDockW = lerp(140, dockTargetW, Math.min(1, eased));
        const dockX = (w - currentDockW) / 2;
        const dockY = h - 68;

        if (t > 0.5) {
          updateStage(4, 880); // Reveal Dock
        }

        setCursors({
          alex: {
            x: dockX + currentDockW,
            y: dockY + 24,
            color: '#0ACF83',
            label: 'Alex Chen',
            action: 'Extruding Glass Capsule',
            isDrawing: true,
            isCrosshair: true,
            boxBounds: {
              x: dockX,
              y: dockY - 8,
              w: currentDockW,
              h: 56,
              label: 'macOS Glass Dock • 480 × 58px'
            }
          },
          sarah: {
            x: dockX,
            y: dockY + 24,
            color: '#FF7262',
            label: 'Sarah Lin',
            action: 'Capsule Left Edge'
          },
          user: {
            x: lerp(w / 2 + 120, w / 2, easeInOutCubic(t)),
            y: lerp(h / 2 + 80, h - 90, easeInOutCubic(t)),
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Dropping Dock Icons'
          },
          varun: {
            x: lerp(w / 2 + 200, w - 75, easeInOutCubic(t)),
            y: lerp(h / 2, h - 75, easeInOutCubic(t)),
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Deploying Assistant Bot'
          }
        });

        setGuides([
          { type: 'h', pos: dockY - 8, label: 'Y: Dock Baseline Horizon' }
        ]);
      }
      // =====================================================================
      // Phase 5: Assistant Bot & Grand Convergence (4.7s - 5.5s)
      // =====================================================================
      else if (elapsed < 5.6) {
        setStatusMessage('[5/5] Deploying Assistant Bot & Convergence...');
        const t = (elapsed - 4.7) / 0.85;
        const eased = easeInOutCubic(Math.min(1, t));
        const centerX = w / 2;
        const centerY = h / 2;

        updateStage(5, 960); // Everything unlocked!

        setCursors({
          user: {
            x: lerp(centerX, centerX - 60, eased),
            y: lerp(h - 90, centerY - 40, eased),
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Approved ✓'
          },
          varun: {
            x: lerp(w - 75, centerX + 60, eased),
            y: lerp(h - 75, centerY - 40, eased),
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'System Ready 🚀'
          },
          sarah: {
            x: lerp(centerX - 120, centerX - 60, eased),
            y: lerp(h - 60, centerY + 50, eased),
            color: '#FF7262',
            label: 'Sarah Lin',
            action: 'UI Verified ✨'
          },
          alex: {
            x: lerp(centerX + 120, centerX + 60, eased),
            y: lerp(h - 60, centerY + 50, eased),
            color: '#0ACF83',
            label: 'Alex Chen',
            action: '100% Operational'
          }
        });

        setGuides([]);
      }
      // Rebuild complete!
      else {
        finishSwarm();
        return;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [dims, userName, speedMultiplier, isPaused]);

  return (
    <div className={`swarm-overlay-container ${completeBanner ? 'fade-out-overlay' : ''}`}>
      {/* Top Status & Controls HUD Badge */}
      <div className="swarm-hud-badge">
        <div className="swarm-hud-pulse" />
        
        <span className="swarm-hud-text">
          {completeBanner ? '✓ VarunOS Workspace Assembled & Ready!' : statusMessage}
        </span>

        {/* Speed Toggle (1x / 2x) */}
        <button
          className="swarm-control-btn"
          onClick={handleToggleSpeed}
          title="Toggle Rebuild Speed (1x / 2x)"
        >
          <span>{speedMultiplier}× Speed</span>
        </button>

        {/* Sound Toggle */}
        <button
          className={`swarm-control-btn ${isMuted ? 'muted' : ''}`}
          onClick={handleToggleSound}
          title={isMuted ? 'Unmute Synthesizer Audio (M)' : 'Mute Synthesizer Audio (M)'}
        >
          {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
        </button>

        {/* Pause/Play Toggle */}
        <button
          className="swarm-control-btn"
          onClick={handleTogglePause}
          title={isPaused ? 'Resume (Space)' : 'Pause (Space)'}
        >
          {isPaused ? <Play size={12} fill="currentColor" /> : <Pause size={12} fill="currentColor" />}
        </button>

        {/* Skip Button */}
        <button className="swarm-skip-btn" onClick={finishSwarm} title="Skip Rebuild Animation (Esc)">
          <FastForward size={13} /> Skip
        </button>
      </div>

      {/* Blueprint Coordinates Indicator (Bottom-Left) */}
      <div className="swarm-blueprint-indicator">
        <span className="blueprint-tag">⚡ SWARM REBUILD ENGINE v3.0</span>
        <span className="blueprint-coords">AUTONOMOUS MULTIPLAYER RECONSTRUCTION • 4 AGENTS</span>
      </div>

      {/* Viewport Info Readout (Bottom-Right) */}
      <div className="swarm-blueprint-viewport">
        <span>VIEWPORT: {dims.w} × {dims.h} px • 60 FPS</span>
      </div>

      {/* SVG Canvas for trailing paths & ruler alignment guides */}
      <svg className="swarm-vector-canvas" width={dims.w} height={dims.h}>
        {guides.map((g, idx) => (
          <g key={idx} className="swarm-guide-group">
            {g.type === 'h' ? (
              <line
                x1="0"
                y1={g.pos}
                x2={dims.w}
                y2={g.pos}
                stroke="#ec4899"
                strokeDasharray="4 4"
                strokeWidth="1.2"
                opacity="0.8"
              />
            ) : (
              <line
                x1={g.pos}
                y1="0"
                x2={g.pos}
                y2={dims.h}
                stroke="#ec4899"
                strokeDasharray="4 4"
                strokeWidth="1.2"
                opacity="0.8"
              />
            )}
          </g>
        ))}
      </svg>

      {/* Active Selection Bounding Boxes Layer (Anchored to Root Overlay Canvas) */}
      {Object.entries(cursors).map(([key, cursor]) => {
        if (!cursor.isDrawing || !cursor.boxBounds) return null;
        const b = cursor.boxBounds;
        return (
          <div
            key={`box-${key}`}
            className="swarm-active-box"
            style={{
              left: `${b.x}px`,
              top: `${b.y}px`,
              width: `${b.w}px`,
              height: `${b.h}px`,
              borderColor: cursor.color,
              '--cursor-color': cursor.color
            }}
          >
            <div className="box-handle top-left" style={{ borderColor: cursor.color }} />
            <div className="box-handle top-right" style={{ borderColor: cursor.color }} />
            <div className="box-handle bottom-left" style={{ borderColor: cursor.color }} />
            <div className="box-handle bottom-right" style={{ borderColor: cursor.color }} />
            <div className="box-dimension-label" style={{ backgroundColor: cursor.color }}>
              {b.label || `${Math.round(b.w)} × ${Math.round(b.h)}`}
            </div>
          </div>
        );
      })}

      {/* Active Multiplayer Cursors */}
      {Object.entries(cursors).map(([key, cursor]) => (
        <SwarmCursor
          key={key}
          x={cursor.x}
          y={cursor.y}
          color={cursor.color}
          label={cursor.label}
          action={cursor.action}
          isDrawing={cursor.isDrawing}
          boxBounds={cursor.boxBounds}
          isCrosshair={cursor.isCrosshair}
          caretText={cursor.caretText}
          dupBadge={cursor.dupBadge}
        />
      ))}
    </div>
  );
};

export default SwarmRebuildOverlay;
