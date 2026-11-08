import React, { useState, useEffect, useRef } from 'react';
import { FastForward, Check, Sparkles } from 'lucide-react';
import './SwarmRebuildOverlay.css';

// SVG Pointer Component in authentic Figma/Swarm style
const SwarmCursor = ({ x, y, color, label, action, isDrawing, boxBounds }) => {
  return (
    <div
      className="swarm-cursor-agent"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
        '--cursor-color': color
      }}
    >
      {/* Figma style pointer arrow */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="swarm-pointer-svg">
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
          stroke="#ffffff"
          strokeWidth="1.5"
        />
      </svg>

      {/* Floating user name tag */}
      <div className="swarm-cursor-tag" style={{ backgroundColor: color }}>
        <span className="swarm-cursor-name">{label}</span>
        {action && <span className="swarm-cursor-action">{action}</span>}
      </div>

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
          <div className="box-handle top-left" />
          <div className="box-handle top-right" />
          <div className="box-handle bottom-left" />
          <div className="box-handle bottom-right" />
          <div className="box-dimension-label" style={{ backgroundColor: color }}>
            {boxBounds.label || `${Math.round(boxBounds.w)} × ${Math.round(boxBounds.h)}`}
          </div>
        </div>
      )}
    </div>
  );
};

// Web Audio API Synthesizer for snappy sound effects
class SwarmSoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
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

  playSnap(freq = 600, duration = 0.05) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  playChime() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.08);
        osc.stop(this.ctx.currentTime + i * 0.08 + 0.35);
      });
    } catch (e) {
      // Audio policy fallback
    }
  }
}

const soundSynth = new SwarmSoundSynthesizer();

const SwarmRebuildOverlay = ({ userName = 'Guest', onComplete }) => {
  const [phase, setPhase] = useState(0); // 0 to 4
  const [guides, setGuides] = useState([]);
  const [completeBanner, setCompleteBanner] = useState(false);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const isFinishedRef = useRef(false);

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
    user: { x: -50, y: -50, color: '#1ABCFE', label: userName || 'You', action: 'Joining...', isDrawing: false, boxBounds: null },
    varun: { x: -50, y: -50, color: '#A259FF', label: 'Varun Sehgal', action: 'Lead Architect', isDrawing: false, boxBounds: null },
    sarah: { x: -50, y: -50, color: '#FF7262', label: 'Sarah (UI)', action: 'Wireframing', isDrawing: false, boxBounds: null },
    alex: { x: -50, y: -50, color: '#0ACF83', label: 'Alex (Systems)', action: 'Building Dock', isDrawing: false, boxBounds: null }
  });

  // Finish Swarm
  const finishSwarm = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    soundSynth.playChime();
    setCompleteBanner(true);

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 450);
  };

  // Keyboard shortcut (Escape to skip)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        finishSwarm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Physics & Choreography Timeline loop
  useEffect(() => {
    startTimeRef.current = Date.now();
    soundSynth.init();

    const loop = () => {
      if (isFinishedRef.current) return;

      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const { w, h } = dims;

      // Phase 1: MenuBar Assembly (0.0s - 0.9s)
      if (elapsed < 0.9) {
        setPhase(1);
        const t = elapsed / 0.9;
        const menuX = Math.min(w - 60, t * w);
        setCursors({
          varun: {
            x: menuX,
            y: 18,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Drawing MenuBar',
            isDrawing: true,
            boxBounds: { x: 0, y: 0, w: menuX, h: 36, label: 'MenuBar 100vw × 38px' }
          },
          user: {
            x: 80 + Math.sin(t * 5) * 40,
            y: 80 + t * 60,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Swarming in',
            isDrawing: false,
            boxBounds: null
          },
          sarah: {
            x: 120 + Math.cos(t * 4) * 30,
            y: 140 + t * 80,
            color: '#FF7262',
            label: 'Sarah (UI)',
            action: 'Aligning Grid',
            isDrawing: false,
            boxBounds: null
          },
          alex: {
            x: w - 160 + Math.sin(t * 3) * 30,
            y: h - 140 - t * 40,
            color: '#0ACF83',
            label: 'Alex (Systems)',
            action: 'Readying Dock',
            isDrawing: false,
            boxBounds: null
          }
        });

        if (Math.random() < 0.15) soundSynth.playSnap(480, 0.04);
      }
      // Phase 2: Desktop Icons & Center Finder Canvas (0.9s - 1.9s)
      else if (elapsed < 1.9) {
        setPhase(2);
        const t = (elapsed - 0.9) / 1.0;

        // Finder target center box
        const finderW = Math.min(920, w - 80);
        const finderH = Math.min(560, h - 110);
        const finderX = (w - finderW) / 2;
        const finderY = (h - finderH) / 2 - 10;

        const currentFinderW = finderW * Math.min(1, t * 1.2);
        const currentFinderH = finderH * Math.min(1, t * 1.2);

        setCursors({
          user: {
            x: finderX + currentFinderW,
            y: finderY + currentFinderH,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Drawing Finder Window',
            isDrawing: true,
            boxBounds: {
              x: finderX,
              y: finderY,
              w: currentFinderW,
              h: currentFinderH,
              label: 'VarunOS — Portfolio & Projects'
            }
          },
          varun: {
            x: finderX + 160,
            y: finderY + 40,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Placing Projects',
            isDrawing: false,
            boxBounds: null
          },
          sarah: {
            x: 45,
            y: 80 + t * 240,
            color: '#FF7262',
            label: 'Sarah (UI)',
            action: 'Snapping Icons',
            isDrawing: true,
            boxBounds: { x: 20, y: 70, w: 75, h: 80 + t * 240, label: 'Desktop Icons (5)' }
          },
          alex: {
            x: w / 2 + Math.sin(t * 6) * 120,
            y: h - 90,
            color: '#0ACF83',
            label: 'Alex (Systems)',
            action: 'Measuring Baseline',
            isDrawing: false,
            boxBounds: null
          }
        });

        // Add snap alignment guides
        setGuides([
          { type: 'h', pos: finderY, label: 'Y: Center Align' },
          { type: 'v', pos: finderX, label: 'X: Left Edge' },
          { type: 'v', pos: finderX + finderW, label: 'X: Right Edge' }
        ]);

        if (Math.random() < 0.2) soundSynth.playSnap(620, 0.04);
      }
      // Phase 3: Bottom macOS Dock Capsule (1.9s - 2.6s)
      else if (elapsed < 2.6) {
        setPhase(3);
        const t = (elapsed - 1.9) / 0.7;
        const dockW = Math.min(480, w - 40) * Math.min(1, t * 1.3);
        const dockX = (w - dockW) / 2;
        const dockY = h - 68;

        setCursors({
          alex: {
            x: dockX + dockW,
            y: dockY + 24,
            color: '#0ACF83',
            label: 'Alex (Systems)',
            action: 'Assembling Dock',
            isDrawing: true,
            boxBounds: { x: dockX, y: dockY - 10, w: dockW, h: 56, label: 'macOS Glass Dock' }
          },
          varun: {
            x: w / 2 - 60 + t * 120,
            y: dockY + 12,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Dropping App Icons',
            isDrawing: false,
            boxBounds: null
          },
          user: {
            x: w / 2 + Math.sin(t * 4) * 80,
            y: h / 2 - 40,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Inspecting Layout',
            isDrawing: false,
            boxBounds: null
          },
          sarah: {
            x: w - 80,
            y: h - 80,
            color: '#FF7262',
            label: 'Sarah (UI)',
            action: 'Final Polish',
            isDrawing: false,
            boxBounds: null
          }
        });

        setGuides([
          { type: 'h', pos: dockY - 10, label: 'Dock Horizon' }
        ]);

        if (Math.random() < 0.25) soundSynth.playSnap(720, 0.05);
      }
      // Phase 4: Swarm Convergence & Final Build (2.6s - 3.1s)
      else if (elapsed < 3.2) {
        setPhase(4);
        const t = (elapsed - 2.6) / 0.6;
        const centerX = w / 2;
        const centerY = h / 2;

        setCursors({
          user: {
            x: centerX - 40 * (1 - t),
            y: centerY - 40 * (1 - t),
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Ready!',
            isDrawing: false,
            boxBounds: null
          },
          varun: {
            x: centerX + 40 * (1 - t),
            y: centerY - 40 * (1 - t),
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Ready!',
            isDrawing: false,
            boxBounds: null
          },
          sarah: {
            x: centerX - 40 * (1 - t),
            y: centerY + 40 * (1 - t),
            color: '#FF7262',
            label: 'Sarah (UI)',
            action: 'Ready!',
            isDrawing: false,
            boxBounds: null
          },
          alex: {
            x: centerX + 40 * (1 - t),
            y: centerY + 40 * (1 - t),
            color: '#0ACF83',
            label: 'Alex (Systems)',
            action: 'Ready!',
            isDrawing: false,
            boxBounds: null
          }
        });
        setGuides([]);
      }
      // Finished!
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
          {completeBanner ? '✓ VarunOS Workspace Assembled!' : `⚡ Swarm Rebuild: Assembling VarunOS for ${userName || 'Guest'}...`}
        </span>
        <button className="swarm-skip-btn" onClick={finishSwarm} title="Skip animation (Esc)">
          <FastForward size={13} /> Skip
        </button>
      </div>

      {/* SVG Canvas for trailing paths & ruler alignment guides */}
      <svg className="swarm-vector-canvas" width={dims.w} height={dims.h}>
        {guides.map((g, idx) => (
          <g key={idx} className="swarm-guide-group">
            {g.type === 'h' ? (
              <line x1="0" y1={g.pos} x2={dims.w} y2={g.pos} stroke="#ec4899" strokeDasharray="4 4" strokeWidth="1" opacity="0.6" />
            ) : (
              <line x1={g.pos} y1="0" x2={g.pos} y2={dims.h} stroke="#ec4899" strokeDasharray="4 4" strokeWidth="1" opacity="0.6" />
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
        />
      ))}
    </div>
  );
};

export default SwarmRebuildOverlay;
