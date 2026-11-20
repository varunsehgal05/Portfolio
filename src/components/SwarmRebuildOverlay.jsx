import React, { useState, useEffect, useRef } from 'react';
import './SwarmRebuildOverlay.css';

// SVG Pointer Component in authentic Figma/Swarm style with fluid particle trail (Memoized for 60fps)
const SwarmCursor = React.memo(({
  x,
  y,
  color,
  label,
  action,
  isDrawing,
  isCrosshair,
  caretText,
  dupBadge,
  trail = []
}) => {
  return (
    <>
      {/* Liquid glowing trail behind active cursor */}
      {trail && trail.slice(-3).map((t, idx) => (
        <div
          key={`trail-${idx}`}
          className="swarm-cursor-trail-dot"
          style={{
            transform: `translate3d(${t.x.toFixed(1)}px, ${t.y.toFixed(1)}px, 0)`,
            backgroundColor: color,
            color: color,
            opacity: t.opacity,
            width: `${Math.max(3, 7 - idx * 1.2)}px`,
            height: `${Math.max(3, 7 - idx * 1.2)}px`,
            marginLeft: '-3px',
            marginTop: '-3px'
          }}
        />
      ))}

      <div
        className="swarm-cursor-agent"
        style={{
          transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`,
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
    </>
  );
});

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
      // Pentatonic chord: C5, E5, G5, B5, D6
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

// C² continuous Ken Perlin smootherstep (zero acceleration jerk & kick at boundaries)
const smootherstep = (t) => {
  const c = Math.max(0, Math.min(1, t));
  return c * c * c * (c * (c * 6 - 15) + 10);
};

// 43 Distributed Swarm Replicas (Bringing total with 5 leads to 48 agents)
const REPLICA_WORKERS = [
  ...Array.from({ length: 12 }, (_, i) => ({ id: `rep-research-${i+1}`, label: `agent/research-${i+1}`, color: '#38bdf8', role: 'research' })),
  ...Array.from({ length: 4 }, (_, i) => ({ id: `rep-writer-${i+1}`, label: `agent/writer-${i+1}`, color: '#facc15', role: 'writer' })),
  ...Array.from({ length: 8 }, (_, i) => ({ id: `rep-designer-${i+1}`, label: `agent/designer-${i+1}`, color: '#ec4899', role: 'designer' })),
  ...Array.from({ length: 6 }, (_, i) => ({ id: `rep-review-${i+1}`, label: `agent/review-${i+1}`, color: '#10b981', role: 'review' })),
  ...Array.from({ length: 4 }, (_, i) => ({ id: `rep-deploy-${i+1}`, label: `agent/deploy-${i+1}`, color: '#f97316', role: 'deploy' })),
  ...Array.from({ length: 2 }, (_, i) => ({ id: `rep-optimizer-${i+1}`, label: `agent/optimizer-${i+1}`, color: '#8b5cf6', role: 'optimizer' })),
  ...Array.from({ length: 7 }, (_, i) => ({ id: `rep-eval-${i+1}`, label: `agent/eval-${i+1}`, color: '#06b6d4', role: 'eval' }))
];

const SwarmRebuildOverlay = ({ userName = 'Guest', onStageChange, onComplete }) => {
  const [statusMessage, setStatusMessage] = useState('Initializing swarm agents...');
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 1x or 2x
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completeBanner, setCompleteBanner] = useState(false);
  const [wireframeData, setWireframeData] = useState(null);
  const [activeGuides, setActiveGuides] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [replicas, setReplicas] = useState([]);
  const [networkPaths, setNetworkPaths] = useState([]);

  const animFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const isFinishedRef = useRef(false);
  const stageRef = useRef(-1);
  const dimsRef = useRef({ w: typeof window !== 'undefined' ? window.innerWidth : 1440, h: typeof window !== 'undefined' ? window.innerHeight : 900 });
  const isPausedRef = useRef(false);
  const speedMultiplierRef = useRef(1);
  const userNameRef = useRef(userName);
  const lastTypeTimeRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const lastStampedIndexRef = useRef(-1);
  const physicsRef = useRef(null);
  const replicasStateRef = useRef(REPLICA_WORKERS.map((w, idx) => ({
    ...w,
    x: 200 + ((idx * 67) % 800),
    y: 120 + ((idx * 47) % 550),
    vx: 0,
    vy: 0
  })));

  // Screen dimensions
  const [dims, setDims] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900
  });

  useEffect(() => {
    const handleResize = () => {
      const newDims = { w: window.innerWidth, h: window.innerHeight };
      setDims(newDims);
      dimsRef.current = newDims;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { speedMultiplierRef.current = speedMultiplier; }, [speedMultiplier]);
  useEffect(() => { userNameRef.current = userName; }, [userName]);

  // 5 Collaborative Multiplayer Cursors (Figma / Swarm Rebuild Style)
  const [cursors, setCursors] = useState({
    varun: { x: 40, y: 18, color: '#A259FF', label: 'Varun Sehgal', action: 'Lead Architect', isDrawing: false, boxBounds: null },
    user: { x: dims.w - 100, y: 18, color: '#1ABCFE', label: userName || 'You', action: 'Joining...', isDrawing: false, boxBounds: null },
    sarah: { x: 80, y: dims.h - 120, color: '#FF7262', label: 'Sarah Lin', action: 'UI Systems', isDrawing: false, boxBounds: null },
    alex: { x: dims.w - 120, y: dims.h - 80, color: '#0ACF83', label: 'Alex Chen', action: 'Systems & Dock', isDrawing: false, boxBounds: null },
    elena: { x: dims.w / 2, y: dims.h / 2, color: '#F59E0B', label: 'Elena Rostova', action: 'Design Systems', isDrawing: false, boxBounds: null }
  });

  const finishSwarm = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    soundSynth.playChime();
    setCompleteBanner(true);
    setStatusMessage('✓ VarunOS Workspace Assembled & Ready!');
    if (onStageChange) onStageChange(5);

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 650);
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

  // Trigger temporary ripple burst
  const triggerRipple = (x, y, color) => {
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-6), { id, x, y, color }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 550);
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
    isFinishedRef.current = false;
    startTimeRef.current = Date.now();
    soundSynth.init();
    updateStage(0);

    const loop = () => {
      if (isFinishedRef.current) return;

      if (isPausedRef.current) {
        lastTimeRef.current = Date.now();
        animFrameRef.current = requestAnimationFrame(loop);
        return;
      }

      const now = Date.now();
      const dt = Math.min(0.04, Math.max(0.005, (now - lastTimeRef.current) / 1000));
      lastTimeRef.current = now;

      const rawElapsed = (now - startTimeRef.current) / 1000;
      const elapsed = rawElapsed * (speedMultiplierRef.current || 1);
      const { w, h } = dimsRef.current || dims;

      // Initialize persistent physics if needed
      if (!physicsRef.current) {
        physicsRef.current = {
          varun: { x: 30, y: 18, trail: [] },
          user: { x: w - 80, y: 18, trail: [] },
          sarah: { x: 60, y: 60, trail: [] },
          alex: { x: w - 120, y: 180, trail: [] },
          elena: { x: w / 2, y: 28, trail: [] }
        };
      }

      // Exact target formulas matching Window.jsx and Dock.css
      const winTargetW = Math.min(w - 80, 920);
      const winTargetH = Math.min(h - 100, 560);
      const winTargetX = Math.max(20, (w - winTargetW) / 2);
      const winTargetY = Math.max(36, (h - winTargetH) / 2 - 15);

      const dockTargetW = Math.min(480, w - 40);
      const dockTargetX = (w - dockTargetW) / 2;
      const dockTargetY = h - 68;

      const microFloat = (phase) => Math.sin(now * 0.003 + phase) * 0.9;
      let agentTargets = {};

      // =====================================================================
      // Phase 1: Top MenuBar Drafting & Alignment (0.0s - 0.8s)
      // =====================================================================
      if (elapsed < 0.8) {
        setStatusMessage('[1/5] Drafting macOS MenuBar wireframe...');
        const t = Math.min(1, Math.max(0, elapsed / 0.8));
        const eased = smootherstep(t);

        const menuX = lerp(20, w - 20, eased);
        const userX = lerp(w - 40, w - 220, eased);

        if (t > 0.65) {
          updateStage(1, 680); // Reveal MenuBar
        }

        agentTargets = {
          varun: {
            x: menuX,
            y: 14,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Drafting MenuBar',
            isDrawing: true,
            isCrosshair: true,
            boxBounds: { x: 0, y: 0, w: menuX, h: 28, label: 'MenuBar 100vw × 28px • Blur(24px)' }
          },
          user: {
            x: userX,
            y: 14,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Aligning Status Tray',
            isDrawing: false
          },
          sarah: {
            x: lerp(40, 56, eased),
            y: lerp(200, 48, eased),
            color: '#FF7262',
            label: 'Sarah Lin',
            action: 'Grid Setup: 20px Margin'
          },
          alex: {
            x: lerp(w - 120, winTargetX, eased),
            y: lerp(h - 140, winTargetY, eased),
            color: '#0ACF83',
            label: 'Alex Chen',
            action: 'Snapping Window Origin'
          },
          elena: {
            x: lerp(w / 2 - 80, w / 2, eased),
            y: lerp(80, 28, eased),
            color: '#F59E0B',
            label: 'Elena Rostova',
            action: 'Smart Guide: Y: 28px'
          }
        };

        setWireframeData({
          type: 'menubar',
          w: menuX,
          h: 28,
          opacity: 1
        });

        setActiveGuides([
          {
            type: 'h',
            x1: 0,
            y1: 28,
            x2: menuX,
            y2: 28,
            color: '#ec4899',
            dashed: true,
            label: 'Y: 28px (Top Bar)',
            pillText: 'Y: 28px',
            pillX: menuX / 2,
            pillY: 28
          }
        ]);
      }
      // =====================================================================
      // Phase 2: Desktop App Icons Continuous Stamping (0.8s - 1.6s)
      // =====================================================================
      else if (elapsed < 1.6) {
        setStatusMessage('[2/5] Stamping & Duplicating Desktop Apps...');
        const t = Math.min(1, Math.max(0, (elapsed - 0.8) / 0.8));
        const eased = smootherstep(t);
        const arcOffset = Math.sin(t * Math.PI) * 45;

        if (t > 0.65) {
          updateStage(2, 740); // Reveal Desktop Icons
        }

        const iconNames = ['Figma', 'VS Code', 'Resume.pdf', 'Contact', 'Trash'];
        const iconYPositions = [48, 126, 204, 282, 360];
        const iconIndex = Math.min(4, Math.floor(t * 5));

        // Sarah glides down smoothly starting from exact Phase 1 position (56, 48) to (56, 360)
        const sarahY = lerp(48, 360, eased);
        const elenaX = lerp(w / 2, 92, eased);
        const elenaY = lerp(28, 360, eased);

        // Stamp audio & ripple trigger when reaching each icon
        if (lastStampedIndexRef.current !== iconIndex) {
          lastStampedIndexRef.current = iconIndex;
          soundSynth.playDropThump(220 + iconIndex * 40);
          triggerRipple(56, iconYPositions[iconIndex] + 20, '#FF7262');
        }

        agentTargets = {
          sarah: {
            x: 56,
            y: sarahY,
            color: '#FF7262',
            label: 'Sarah Lin',
            action: `Stamping: ${iconNames[iconIndex]}`,
            isDrawing: true,
            isCrosshair: true,
            dupBadge: `⌥ Duplicate +${iconIndex + 1}`,
            boxBounds: {
              x: 20,
              y: iconYPositions[iconIndex],
              w: 72,
              h: 70,
              label: `${iconNames[iconIndex]} (72 × 70px)`
            }
          },
          elena: {
            x: elenaX,
            y: elenaY,
            color: '#F59E0B',
            label: 'Elena Rostova',
            action: 'Smart Guides: 78px Gap',
            isDrawing: false
          },
          varun: {
            x: lerp(w - 20, winTargetX + 220, eased),
            y: lerp(14, winTargetY + 98, eased) + arcOffset,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Preparing Headline'
          },
          user: {
            x: lerp(w - 220, winTargetX + 80, eased),
            y: lerp(14, winTargetY + 60, eased) + arcOffset * 1.2,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Extrude Handle Ready'
          },
          alex: {
            x: winTargetX,
            y: winTargetY,
            color: '#0ACF83',
            label: 'Alex Chen',
            action: 'Holding Top-Left Pivot'
          }
        };

        setWireframeData(null);

        setActiveGuides([
          { type: 'v', x1: 20, y1: 40, x2: 20, y2: 440, color: '#ec4899', dashed: true, label: 'X: 20px (Margin)' },
          {
            type: 'v',
            x1: 92,
            y1: 40,
            x2: 92,
            y2: 440,
            color: '#ec4899',
            dashed: true,
            label: 'X: 92px (Column)',
            pillText: 'ΔY: 78px Equal Spacing',
            pillX: 132,
            pillY: sarahY + 35
          }
        ]);
      }
      // =====================================================================
      // Phase 3: Center Finder Window & Live Headline Typing (1.6s - 2.6s)
      // =====================================================================
      else if (elapsed < 2.6) {
        setStatusMessage('[3/5] Constructing Finder Window & Typing Content...');
        const t = Math.min(1, Math.max(0, (elapsed - 1.6) / 1.0));
        const eased = smootherstep(t);

        const curW = lerp(80, winTargetW, eased);
        const curH = lerp(60, winTargetH, eased);
        const curX = winTargetX;
        const curY = winTargetY;

        // Smoothly reveal the real window as it reaches 82% completion
        if (t > 0.82) {
          updateStage(3, 800);
        }

        // Live Headline Typing Simulation
        const headlineText = 'Designing intuitive web apps & modern interfaces';
        const typingProgress = Math.min(1, Math.max(0, (t - 0.15) / 0.65));
        const charCount = Math.floor(typingProgress * headlineText.length);
        const currentTyped = headlineText.substring(0, charCount);

        if (typingProgress > 0 && typingProgress < 1 && Date.now() - lastTypeTimeRef.current > 75) {
          soundSynth.playTypeClick(320 + Math.random() * 80);
          lastTypeTimeRef.current = Date.now();
        }

        const varunX = curX + 220 + typingProgress * 290;
        const varunY = curY + 98;

        agentTargets = {
          user: {
            x: curX + curW,
            y: curY + curH,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Extruding Window Frame',
            isDrawing: true,
            isCrosshair: true,
            boxBounds: {
              x: curX,
              y: curY,
              w: curW,
              h: curH,
              label: `VarunOS Portfolio — ${Math.round(curW)} × ${Math.round(curH)} px`
            }
          },
          varun: {
            x: varunX,
            y: varunY,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Typing Headline...',
            caretText: currentTyped
          },
          sarah: {
            x: lerp(56, curX + curW - 80, eased),
            y: lerp(360, curY + 50, eased) - Math.sin(t * Math.PI) * 40,
            color: '#FF7262',
            label: 'Sarah Lin',
            action: t > 0.5 ? '4 Projects Grid Auto-Layout' : 'Arranging Layout Grid',
            dupBadge: t > 0.5 ? 'Auto-Layout 2×2' : null
          },
          alex: {
            x: curX,
            y: curY,
            color: '#0ACF83',
            label: 'Alex Chen',
            action: 'Top-Left Pivot (0, 0)'
          },
          elena: {
            x: lerp(92, curX + curW / 2, eased),
            y: lerp(360, curY + curH + 24, eased),
            color: '#F59E0B',
            label: 'Elena Rostova',
            action: 'Smart Guide: Centered Alignment'
          }
        };

        const wireframeOpacity = t < 0.82 ? 1 : Math.max(0, 1 - (t - 0.82) / 0.18);
        setWireframeData({
          type: 'window',
          x: curX,
          y: curY,
          w: curW,
          h: curH,
          charCount,
          typedText: currentTyped,
          opacity: wireframeOpacity
        });

        setActiveGuides([
          {
            type: 'v',
            x1: curX + curW / 2,
            y1: curY - 20,
            x2: curX + curW / 2,
            y2: curY + curH + 24,
            color: '#ec4899',
            dashed: true,
            label: 'Center Alignment',
            pillText: `Center: ${Math.round(curW)}px`,
            pillX: curX + curW / 2,
            pillY: curY + curH + 24
          },
          {
            type: 'diag',
            x1: curX,
            y1: curY,
            x2: curX + curW,
            y2: curY + curH,
            color: '#ec4899',
            dashed: true,
            diamond: true,
            opacity: 0.65
          }
        ]);
      }
      // =====================================================================
      // Phase 4: Bottom macOS Dock Capsule (2.6s - 3.2s)
      // =====================================================================
      else if (elapsed < 3.2) {
        setStatusMessage('[4/5] Extruding Glass Dock Capsule...');
        const t = Math.min(1, Math.max(0, (elapsed - 2.6) / 0.6));
        const easedMove = smootherstep(t);

        const dockSpan = lerp(60, dockTargetW, easedMove);
        const curLeft = (w - dockSpan) / 2;
        const curRight = (w + dockSpan) / 2;
        const curDockY = dockTargetY;

        if (t > 0.45) {
          updateStage(4, 880); // Reveal Dock
        }

        agentTargets = {
          alex: {
            x: lerp(winTargetX, curRight, easedMove),
            y: lerp(winTargetY, curDockY + 28, easedMove),
            color: '#0ACF83',
            label: 'Alex Chen',
            action: 'Extruding Glass Capsule',
            isDrawing: true,
            isCrosshair: true,
            boxBounds: {
              x: curLeft,
              y: curDockY,
              w: dockSpan,
              h: 56,
              label: `macOS Glass Dock • ${Math.round(dockSpan)} × 56px`
            }
          },
          sarah: {
            x: lerp(winTargetX + winTargetW - 80, curLeft, easedMove),
            y: lerp(winTargetY + 50, curDockY + 28, easedMove),
            color: '#FF7262',
            label: 'Sarah Lin',
            action: 'Left Capsule Edge (r: 18px)'
          },
          user: {
            x: lerp(winTargetX + winTargetW, w / 2, easedMove),
            y: lerp(winTargetY + winTargetH, curDockY - 16, easedMove),
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Deploying Dock Apps'
          },
          varun: {
            x: lerp(winTargetX + 510, w - 75, easedMove),
            y: lerp(winTargetY + 98, h - 85, easedMove),
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Assistant Bot Setup'
          },
          elena: {
            x: lerp(winTargetX + winTargetW / 2, w / 2, easedMove),
            y: lerp(winTargetY + winTargetH + 24, curDockY, easedMove),
            color: '#F59E0B',
            label: 'Elena Rostova',
            action: 'Smart Guide: Dock Baseline'
          }
        };

        setWireframeData(null);

        setActiveGuides([
          {
            type: 'h',
            x1: curLeft - 30,
            y1: curDockY,
            x2: curRight + 30,
            y2: curDockY,
            color: '#ec4899',
            dashed: true,
            label: 'Y: Dock Baseline',
            pillText: `Y: ${Math.round(curDockY)}px Baseline`,
            pillX: w / 2,
            pillY: curDockY - 12
          }
        ]);
      }
      // =====================================================================
      // Phase 5: Assistant Bot & Grand Harmonic Convergence (3.2s - 3.8s)
      // =====================================================================
      else if (elapsed < 3.8) {
        setStatusMessage('[5/5] Deploying Assistant Bot & Convergence...');
        const t = Math.min(1, Math.max(0, (elapsed - 3.2) / 0.6));
        const eased = smootherstep(t);
        const centerX = w / 2;
        const centerY = h / 2;

        updateStage(5, 960); // Everything unlocked!

        const r = lerp(230, 115, eased);
        const angleBase = t * Math.PI * 0.9;
        const blend = smootherstep(Math.min(1, t * 1.6));

        // 5 agents smoothly spiral into a golden orbit with celebratory actions
        const getAgentSpiral = (angleOffset, startX, startY) => {
          const orbitX = centerX + Math.cos(angleBase + angleOffset) * r;
          const orbitY = centerY + Math.sin(angleBase + angleOffset) * r * 0.65;
          return {
            x: lerp(startX, orbitX, blend),
            y: lerp(startY, orbitY, blend)
          };
        };

        const varunPos = getAgentSpiral(0, w - 75, h - 85);
        const userPos = getAgentSpiral(1.256, w / 2, dockTargetY - 16);
        const sarahPos = getAgentSpiral(2.513, (w - dockTargetW) / 2, dockTargetY + 28);
        const alexPos = getAgentSpiral(3.769, (w + dockTargetW) / 2, dockTargetY + 28);
        const elenaPos = getAgentSpiral(5.026, w / 2, dockTargetY);

        agentTargets = {
          varun: {
            x: varunPos.x,
            y: varunPos.y,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'System Ready 🚀'
          },
          user: {
            x: userPos.x,
            y: userPos.y,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Approved ✓'
          },
          sarah: {
            x: sarahPos.x,
            y: sarahPos.y,
            color: '#FF7262',
            label: 'Sarah Lin',
            action: 'UI Verified ✨'
          },
          alex: {
            x: alexPos.x,
            y: alexPos.y,
            color: '#0ACF83',
            label: 'Alex Chen',
            action: '100% Operational ⚡'
          },
          elena: {
            x: elenaPos.x,
            y: elenaPos.y,
            color: '#F59E0B',
            label: 'Elena Rostova',
            action: 'Pixel Perfect 💎'
          }
        };

        setActiveGuides([]);
      }
      // Rebuild complete!
      else {
        finishSwarm();
        return;
      }

      // Silky-smooth organic physics dampening with fluid particle trails
      const updatedCursors = {};
      const smoothRate = 18.0; // natural fluid inertia
      const smoothingFactor = 1 - Math.exp(-smoothRate * dt);

      Object.entries(agentTargets).forEach(([key, target]) => {
        let p = physicsRef.current[key];
        if (!p) {
          p = { x: target.x, y: target.y, trail: [] };
          physicsRef.current[key] = p;
        }

        // Fluid spring interpolation ensures zero jump or stutter
        p.x += (target.x - p.x) * smoothingFactor;
        p.y += (target.y - p.y) * smoothingFactor;

        // Update fluid motion trail with distance check to avoid clustered dots
        if (!p.trail) p.trail = [];
        const lastPt = p.trail[0];
        const distSq = lastPt ? (p.x - lastPt.x) ** 2 + (p.y - lastPt.y) ** 2 : 999;
        if (distSq > 3) {
          p.trail.unshift({ x: p.x, y: p.y });
          if (p.trail.length > 8) p.trail.pop();
        }

        updatedCursors[key] = {
          ...target,
          x: p.x,
          y: p.y,
          trail: p.trail.map((pt, idx) => ({ ...pt, opacity: Math.max(0, (1 - idx / 8) * 0.5) }))
        };
      });

      // Update 43 replica workers around active stage centroid
      const agentValues = Object.values(agentTargets);
      const centroidX = agentValues.length > 0 ? agentValues.reduce((acc, c) => acc + (c.x || 0), 0) / agentValues.length : w / 2;
      const centroidY = agentValues.length > 0 ? agentValues.reduce((acc, c) => acc + (c.y || 0), 0) / agentValues.length : h / 2;

      const currentReps = replicasStateRef.current;
      const updatedReps = currentReps.map((rep, idx) => {
        const orbitAngle = (elapsed * 2.2 + (idx * Math.PI * 2) / currentReps.length);
        const orbitRadius = 110 + ((idx * 21) % 220);
        const targetX = centroidX + Math.cos(orbitAngle) * orbitRadius;
        const targetY = centroidY + Math.sin(orbitAngle) * (orbitRadius * 0.65);

        rep.x += (targetX - rep.x) * 0.08;
        rep.y += (targetY - rep.y) * 0.08;
        return rep;
      });

      // Compute dynamic SVG network paths between nearby replicas (< 130px)
      const netPaths = [];
      for (let i = 0; i < updatedReps.length; i += 3) {
        for (let j = i + 1; j < updatedReps.length; j += 4) {
          const a = updatedReps[i];
          const b = updatedReps[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 130) {
            netPaths.push({
              d: `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`,
              color: a.color,
              opacity: (1 - dist / 130) * 0.35
            });
            if (netPaths.length >= 18) break;
          }
        }
        if (netPaths.length >= 18) break;
      }

      setCursors(updatedCursors);
      setReplicas([...updatedReps]);
      setNetworkPaths(netPaths);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className={`swarm-overlay-container ${completeBanner ? 'fade-out-overlay' : ''}`}>
      {/* Blueprint Coordinates Indicator (Bottom-Left) */}
      <div className="swarm-blueprint-indicator">
        <div className="blueprint-header-row">
          <span className="blueprint-tag">⚡ SWARM REBUILD ENGINE v3.5</span>
          <button 
            type="button" 
            className="swarm-blueprint-skip-btn" 
            onClick={finishSwarm}
            title="Skip rebuild and open VarunOS immediately (Esc)"
          >
            Skip Rebuild (Esc) ⏭
          </button>
        </div>
        <span className="blueprint-coords">{statusMessage} • 48 AGENTS (18 tasks queued)</span>
      </div>

      {/* Viewport Info Readout (Bottom-Right) */}
      <div className="swarm-blueprint-viewport">
        <span>VIEWPORT: {dims.w} × {dims.h} px • 60 FPS</span>
      </div>

      {/* SVG Canvas for smart guide lines, measurements & dynamic swarm network paths */}
      <svg className="swarm-vector-canvas" width={dims.w} height={dims.h}>
        {/* Dynamic network connector lines between nearby swarm agents (califa swarm site style) */}
        {networkPaths.map((np, idx) => (
          <path
            key={`np-${idx}`}
            d={np.d}
            stroke={np.color || '#ec4899'}
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity={np.opacity || 0.25}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {activeGuides.map((g, idx) => (
          <g key={idx} className="swarm-guide-group">
            <line
              x1={g.x1}
              y1={g.y1}
              x2={g.x2}
              y2={g.y2}
              stroke={g.color || '#ec4899'}
              strokeDasharray={g.dashed ? '4 4' : undefined}
              strokeWidth={g.strokeWidth || 1.2}
              opacity={g.opacity !== undefined ? g.opacity : 0.85}
            />
            {g.diamond && (
              <>
                <rect
                  x={g.x1 - 3.5}
                  y={g.y1 - 3.5}
                  width="7"
                  height="7"
                  fill="#ffffff"
                  stroke={g.color || '#ec4899'}
                  strokeWidth="1.5"
                  className="swarm-pen-diamond"
                />
                <rect
                  x={g.x2 - 3.5}
                  y={g.y2 - 3.5}
                  width="7"
                  height="7"
                  fill="#ffffff"
                  stroke={g.color || '#ec4899'}
                  strokeWidth="1.5"
                  className="swarm-pen-diamond"
                />
              </>
            )}
            {g.label && !g.pillText && (
              <text
                x={g.x1 + 10}
                y={g.y1 - 6}
                fill={g.color || '#ec4899'}
                fontSize="9.5"
                fontFamily="-apple-system, BlinkMacSystemFont, monospace"
                fontWeight="600"
              >
                {g.label}
              </text>
            )}
          </g>
        ))}
      </svg>

      {/* Smart Guide Distance Measurement Pills (Figma / Swarm Style) */}
      {activeGuides.map((g, idx) => (
        g.pillText ? (
          <div
            key={`guide-pill-${idx}`}
            className="swarm-smart-guide-pill"
            style={{
              left: `${g.pillX !== undefined ? g.pillX : (g.x1 + g.x2) / 2}px`,
              top: `${g.pillY !== undefined ? g.pillY : (g.y1 + g.y2) / 2}px`,
              backgroundColor: g.pillColor || '#ec4899'
            }}
          >
            {g.pillText}
          </div>
        ) : null
      ))}

      {/* Click Ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="swarm-click-ripple"
          style={{
            left: `${r.x}px`,
            top: `${r.y}px`,
            borderColor: r.color
          }}
        />
      ))}

      {/* Structured Blueprint Wireframe for Window (Phase 3) */}
      {wireframeData && wireframeData.type === 'window' && (
        <div
          className="swarm-window-wireframe"
          style={{
            left: `${wireframeData.x}px`,
            top: `${wireframeData.y}px`,
            width: `${wireframeData.w}px`,
            height: `${wireframeData.h}px`,
            opacity: wireframeData.opacity !== undefined ? wireframeData.opacity : 1
          }}
        >
          {/* Titlebar Wireframe */}
          <div className="wireframe-titlebar">
            <div className="wireframe-lights">
              <span className="light red" />
              <span className="light yellow" />
              <span className="light green" />
            </div>
            <span className="wireframe-title">VarunOS — Portfolio & Projects</span>
          </div>

          <div className="wireframe-body">
            {/* Sidebar Wireframe */}
            <div className="wireframe-sidebar">
              <div className="wireframe-side-item" />
              <div className="wireframe-side-item active" />
              <div className="wireframe-side-item" />
              <div className="wireframe-side-item" />
            </div>

            {/* Main Area Wireframe */}
            <div className="wireframe-content">
              {/* Hero Card Outline */}
              <div className="wireframe-hero">
                <div className="wireframe-badge" />
                <div className="wireframe-heading">
                  {wireframeData.typedText || 'Designing intuitive web apps...'}
                  <span className="typing-cursor" />
                </div>
                <div className="wireframe-subline" />
              </div>

              {/* 4 Cards Grid Wireframe */}
              <div className="wireframe-cards-grid">
                <div className="wireframe-card" />
                <div className="wireframe-card" />
                <div className="wireframe-card" />
                <div className="wireframe-card" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Selection Bounding Boxes Layer */}
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

      {/* Active Multiplayer Cursors (5 Lead Agents) */}
      {Object.entries(cursors).map(([key, cursor]) => (
        <SwarmCursor
          key={key}
          x={cursor.x}
          y={cursor.y}
          color={cursor.color}
          label={cursor.label}
          action={cursor.action}
          isDrawing={cursor.isDrawing}
          isCrosshair={cursor.isCrosshair}
          caretText={cursor.caretText}
          dupBadge={cursor.dupBadge}
          trail={cursor.trail}
        />
      ))}

      {/* 43 Swarm Replica Workers (Califa Swarm Site Recreation) */}
      {replicas.map((rep) => (
        <div
          key={`rep-${rep.id}`}
          className="swarm-replica-agent"
          style={{
            transform: `translate3d(${rep.x.toFixed(1)}px, ${rep.y.toFixed(1)}px, 0)`
          }}
        >
          <svg className="swarm-replica-pointer" width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 1L6.5 14.5L9.2 8.8L15 6L1 1Z"
              fill={rep.color}
              stroke="#0a0a0c"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          <span className="swarm-replica-tag" style={{ backgroundColor: rep.color }}>
            {rep.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SwarmRebuildOverlay;