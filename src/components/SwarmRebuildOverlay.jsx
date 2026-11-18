import React, { useState, useEffect, useRef } from 'react';
import { FastForward, Check, Sparkles, Crosshair } from 'lucide-react';
import './SwarmRebuildOverlay.css';

// SVG Pointer Component in authentic Figma/Swarm style
const SwarmCursor = ({ x, y, color, label, action, isDrawing, boxBounds, isCrosshair, caretText }) => {
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

      {/* Simulated Typing Caret Bubble */}
      {caretText && (
        <div className="swarm-typing-bubble" style={{ borderColor: color }}>
          <span>{caretText}</span>
          <span className="typing-caret" />
        </div>
      )}

      {/* Dynamic selection bounding box while drawing */}
      {isDrawing && boxBounds && (
        <div
          className="swarm-active-box"
          style={{
            left: `${boxBounds.x}px`,
            top: `${boxBounds.y}px`,
            width: `${boxBounds.w}px`,
            height: `${boxBounds.h}px`,
            borderColor: color
          }}
        >
          <div className="box-handle top-left" style={{ borderColor: color }} />
          <div className="box-handle top-right" style={{ borderColor: color }} />
          <div className="box-handle bottom-left" style={{ borderColor: color }} />
          <div className="box-handle bottom-right" style={{ borderColor: color }} />
          <div className="box-dimension-label" style={{ backgroundColor: color }}>
            {boxBounds.label || `${Math.round(boxBounds.w)} × ${Math.round(boxBounds.h)}`}
          </div>
        </div>
      )}
    </div>
  );
};

// Web Audio API Synthesizer for tactile mechanical clicks and celebratory chord
class SwarmSoundSynthesizer {
  constructor() {
    this.ctx = null;
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

  isMuted() {
    if (typeof document !== 'undefined') {
      return document.body.classList.contains('sound-muted');
    }
    return false;
  }

  playSnap(freq = 640, duration = 0.04) {
    if (this.isMuted()) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playChime() {
    if (this.isMuted()) return;
    try {
      this.init();
      if (!this.ctx) return;
      // C5, E5, G5, B5, D6
      [523.25, 659.25, 783.99, 987.77, 1174.66].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.07);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.07 + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.07);
        osc.stop(this.ctx.currentTime + i * 0.07 + 0.45);
      });
    } catch (e) {}
  }
}

const soundSynth = new SwarmSoundSynthesizer();

// Smooth cubic bezier easing
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const lerp = (a, b, t) => a + (b - a) * t;

const SwarmRebuildOverlay = ({ userName = 'Guest', onStageChange, onComplete }) => {
  const [guides, setGuides] = useState([]);
  const [completeBanner, setCompleteBanner] = useState(false);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const isFinishedRef = useRef(false);
  const stageRef = useRef(0);

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
    sarah: { x: 80, y: dims.h - 120, color: '#FF7262', label: 'Sarah (UI)', action: 'Wireframing', isDrawing: false, boxBounds: null },
    alex: { x: dims.w - 120, y: dims.h - 80, color: '#0ACF83', label: 'Alex (Systems)', action: 'Building Dock', isDrawing: false, boxBounds: null }
  });

  const finishSwarm = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    soundSynth.playChime();
    setCompleteBanner(true);
    if (onStageChange) onStageChange(5);

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 420);
  };

  // Keyboard shortcut (Escape or Space to skip)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        finishSwarm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update parent stage smoothly
  const updateStage = (newStage) => {
    if (stageRef.current !== newStage) {
      stageRef.current = newStage;
      if (onStageChange) onStageChange(newStage);
      soundSynth.playSnap(580 + newStage * 60, 0.04);
    }
  };

  // Continuous loop with smooth physics
  useEffect(() => {
    startTimeRef.current = Date.now();
    soundSynth.init();
    updateStage(0);

    const loop = () => {
      if (isFinishedRef.current) return;

      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const { w, h } = dims;

      // =====================================================================
      // Phase 1: Top MenuBar Construction (0.0s - 0.75s)
      // =====================================================================
      if (elapsed < 0.75) {
        const t = elapsed / 0.75;
        const eased = easeInOutCubic(t);

        const menuX = lerp(40, w, eased);
        const userX = lerp(w - 80, w - 240, eased);
        const userY = lerp(40, 18, eased);

        if (t > 0.7) {
          updateStage(1); // Reveal real MenuBar
        }

        setCursors({
          varun: {
            x: menuX,
            y: 18,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Drafting MenuBar',
            isDrawing: true,
            isCrosshair: true,
            boxBounds: { x: 0, y: 0, w: menuX, h: 28, label: 'MenuBar 100vw × 28px' }
          },
          user: {
            x: userX,
            y: userY,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Aligning Status Icons',
            isDrawing: false
          },
          sarah: {
            x: lerp(60, 48, eased),
            y: lerp(200, 100, eased),
            color: '#FF7262',
            label: 'Sarah (UI)',
            action: 'Preparing Left Margin'
          },
          alex: {
            x: lerp(w - 140, w / 2, eased),
            y: lerp(h - 100, h - 80, eased),
            color: '#0ACF83',
            label: 'Alex (Systems)',
            action: 'Measuring Horizon'
          }
        });

        setGuides([
          { type: 'h', pos: 28, label: 'Y: 28px (Top Bar)' }
        ]);
      }
      // =====================================================================
      // Phase 2: Desktop Icons Column Stamping (0.75s - 1.55s)
      // =====================================================================
      else if (elapsed < 1.55) {
        const t = (elapsed - 0.75) / 0.8;
        const eased = easeOutCubic(t);

        if (t > 0.65) {
          updateStage(2); // Reveal desktop icons
        }

        const iconHeight = lerp(50, 360, eased);

        setCursors({
          sarah: {
            x: 48,
            y: 60 + iconHeight,
            color: '#FF7262',
            label: 'Sarah (UI)',
            action: 'Option-Dragging Icons',
            isDrawing: true,
            isCrosshair: true,
            boxBounds: { x: 20, y: 48, w: 76, h: iconHeight, label: 'Icons (Figma, VS Code, Resume, Contact, Trash)' }
          },
          varun: {
            x: lerp(w - 40, w / 2 - 120, eased),
            y: lerp(28, (h - 520) / 2, eased),
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Anchoring Window Frame'
          },
          user: {
            x: lerp(w - 240, w / 2 + 180, eased),
            y: lerp(28, (h - 520) / 2 + 60, eased),
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Inspecting Alignment'
          },
          alex: {
            x: lerp(w / 2, w / 2, eased),
            y: lerp(h - 80, h - 70, eased),
            color: '#0ACF83',
            label: 'Alex (Systems)',
            action: 'Grid Locked'
          }
        });

        setGuides([
          { type: 'v', pos: 20, label: 'X: 20px (Margin)' },
          { type: 'v', pos: 96, label: 'X: 96px (Column Right)' }
        ]);
      }
      // =====================================================================
      // Phase 3: Center Finder Window & Live Typing (1.55s - 2.55s)
      // =====================================================================
      else if (elapsed < 2.55) {
        const t = (elapsed - 1.55) / 1.0;
        const eased = easeInOutCubic(t);

        const targetW = Math.min(920, w - 80);
        const targetH = Math.min(560, h - 110);
        const winX = (w - targetW) / 2;
        const winY = (h - targetH) / 2 - 10;

        const currentW = lerp(320, targetW, eased);
        const currentH = lerp(200, targetH, eased);
        const curX = (w - currentW) / 2;
        const curY = (h - currentH) / 2 - 10;

        if (t > 0.6) {
          updateStage(3); // Reveal Center Finder Window
        }

        // Typing simulation text
        const fullText = 'Designing intuitive web apps & modern interfaces';
        const typedCount = Math.floor(Math.min(fullText.length, t * fullText.length * 1.5));
        const currentTypedText = fullText.substring(0, typedCount);

        setCursors({
          user: {
            x: curX + currentW,
            y: curY + currentH,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Expanding Bounds',
            isDrawing: true,
            isCrosshair: true,
            boxBounds: {
              x: curX,
              y: curY,
              w: currentW,
              h: currentH,
              label: `VarunOS Portfolio — ${Math.round(currentW)} × ${Math.round(currentH)}`
            }
          },
          varun: {
            x: curX + 220,
            y: curY + 90,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Typing Headline',
            caretText: currentTypedText
          },
          sarah: {
            x: curX,
            y: curY,
            color: '#FF7262',
            label: 'Sarah (UI)',
            action: 'Top-Left Origin'
          },
          alex: {
            x: curX,
            y: curY + currentH,
            color: '#0ACF83',
            label: 'Alex (Systems)',
            action: 'Bottom-Left Anchor'
          }
        });

        setGuides([
          { type: 'h', pos: winY, label: 'Y: Window Top' },
          { type: 'v', pos: winX, label: 'X: Left Snap' },
          { type: 'v', pos: winX + targetW, label: 'X: Right Snap' }
        ]);
      }
      // =====================================================================
      // Phase 4: Bottom macOS Dock Assembly (2.55s - 3.25s)
      // =====================================================================
      else if (elapsed < 3.25) {
        const t = (elapsed - 2.55) / 0.7;
        const eased = easeOutCubic(t);

        const dockTargetW = Math.min(480, w - 40);
        const currentDockW = lerp(120, dockTargetW, eased);
        const dockX = (w - currentDockW) / 2;
        const dockY = h - 68;

        if (t > 0.6) {
          updateStage(4); // Reveal Dock
        }

        setCursors({
          alex: {
            x: dockX + currentDockW,
            y: dockY + 22,
            color: '#0ACF83',
            label: 'Alex (Systems)',
            action: 'Drawing Glass Capsule',
            isDrawing: true,
            isCrosshair: true,
            boxBounds: { x: dockX, y: dockY - 8, w: currentDockW, h: 56, label: 'macOS Glass Dock' }
          },
          sarah: {
            x: dockX,
            y: dockY + 22,
            color: '#FF7262',
            label: 'Sarah (UI)',
            action: 'Capsule Anchor'
          },
          varun: {
            x: lerp(w / 2, w - 80, eased),
            y: lerp(h / 2, h - 80, eased),
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Placing Assistant Bot'
          },
          user: {
            x: lerp(w / 2 + 100, w / 2, eased),
            y: lerp(h / 2 + 100, h - 90, eased),
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Verifying Dock Icons'
          }
        });

        setGuides([
          { type: 'h', pos: dockY - 8, label: 'Y: Dock Baseline' }
        ]);
      }
      // =====================================================================
      // Phase 5: Convergence, Bot Activation & Celebration (3.25s - 3.75s)
      // =====================================================================
      else if (elapsed < 3.8) {
        const t = (elapsed - 3.25) / 0.55;
        const eased = easeInOutCubic(t);
        const centerX = w / 2;
        const centerY = h / 2;

        updateStage(5); // Everything unlocked!

        setCursors({
          user: {
            x: lerp(centerX, centerX - 50, eased),
            y: lerp(h - 90, centerY - 30, eased),
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Ready ✓'
          },
          varun: {
            x: lerp(w - 80, centerX + 50, eased),
            y: lerp(h - 80, centerY - 30, eased),
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Live 🚀'
          },
          sarah: {
            x: lerp(centerX - 100, centerX - 50, eased),
            y: lerp(h - 60, centerY + 40, eased),
            color: '#FF7262',
            label: 'Sarah (UI)',
            action: 'Complete ✨'
          },
          alex: {
            x: lerp(centerX + 100, centerX + 50, eased),
            y: lerp(h - 60, centerY + 40, eased),
            color: '#0ACF83',
            label: 'Alex (Systems)',
            action: '100% Synced'
          }
        });

        setGuides([]);
      }
      // Completed!
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
  }, [dims, userName]);

  return (
    <div className={`swarm-overlay-container ${completeBanner ? 'fade-out-overlay' : ''}`}>
      {/* Top Status HUD Badge */}
      <div className="swarm-hud-badge">
        <div className="swarm-hud-pulse" />
        <span className="swarm-hud-text">
          {completeBanner
            ? '✓ VarunOS Workspace Assembled & Ready!'
            : `⚡ Swarm Rebuild: Assembling VarunOS for ${userName || 'Guest'}...`}
        </span>
        <button className="swarm-skip-btn" onClick={finishSwarm} title="Skip animation (Esc)">
          <FastForward size={13} /> Skip
        </button>
      </div>

      {/* Blueprint Coordinates Indicator */}
      <div className="swarm-blueprint-indicator">
        <span className="blueprint-tag">SWARM BLUEPRINT v2.4</span>
        <span className="blueprint-coords">AUTONOMOUS MULTIPLAYER REBUILD</span>
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
                opacity="0.75"
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
                opacity="0.75"
              />
            )}
          </g>
        ))}
      </svg>

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
        />
      ))}
    </div>
  );
};

export default SwarmRebuildOverlay;
