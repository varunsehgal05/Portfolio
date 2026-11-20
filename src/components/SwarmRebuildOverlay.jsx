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
  chatText,
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

        {/* Collaborative Chat Bubble (Kittu.pro Style) */}
        {chatText && (
          <div className="swarm-chat-bubble" style={{ borderColor: color }}>
            <span>💬 {chatText}</span>
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

const SwarmRebuildOverlay = ({ userName = 'Guest', onStageChange, onComplete }) => {
  const [statusMessage, setStatusMessage] = useState('Initializing swarm agents...');
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 1x or 2x
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completeBanner, setCompleteBanner] = useState(false);
  const [wireframeData, setWireframeData] = useState(null);
  const [activeGuides, setActiveGuides] = useState([]);
  const [ripples, setRipples] = useState([]);
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
      // Phase 1: Top MenuBar Drafting & Alignment (0.0s - 1.2s) — 2 Cursors
      // =====================================================================
      if (elapsed < 1.2) {
        setStatusMessage('[1/5] Drafting macOS MenuBar wireframe...');
        const t = Math.min(1, Math.max(0, elapsed / 1.2));
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
            chatText: 'morning! drafting top bar',
            boxBounds: { x: 0, y: 0, w: menuX, h: 28, label: 'MenuBar 100vw × 28px • Blur(24px)' }
          },
          user: {
            x: userX,
            y: 14,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Aligning Status Tray',
            chatText: 'on it, aligning tray',
            isDrawing: false
          },
          sarah: { hidden: true, x: 56, y: 48 },
          alex: { hidden: true, x: winTargetX, y: winTargetY },
          elena: { hidden: true, x: w / 2, y: 28 }
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
      // Phase 2: Desktop App Icons Continuous Stamping (1.2s - 2.5s) — 2 Cursors
      // =====================================================================
      else if (elapsed < 2.5) {
        setStatusMessage('[2/5] Stamping & Duplicating Desktop Apps...');
        const t = Math.min(1, Math.max(0, (elapsed - 1.2) / 1.3));
        const eased = smootherstep(t);

        if (t > 0.65) {
          updateStage(2, 740); // Reveal Desktop Icons
        }

        const iconNames = ['Figma', 'VS Code', 'Resume.pdf', 'Contact', 'Trash'];
        const iconYPositions = [48, 126, 204, 282, 360];
        const iconIndex = Math.min(4, Math.floor(t * 5));

        const sarahY = lerp(48, 360, eased);
        const elenaX = 92;
        const elenaY = sarahY;

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
            chatText: 'stamping desktop apps (⌥ dup)',
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
            chatText: 'checking 78px spacing',
            isDrawing: false
          },
          varun: { hidden: true, x: winTargetX + 220, y: winTargetY + 98 },
          user: { hidden: true, x: winTargetX + 80, y: winTargetY + 60 },
          alex: { hidden: true, x: winTargetX, y: winTargetY }
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
      // Phase 3: Center Finder Window & Live Headline Typing (2.5s - 4.0s) — 2 Cursors
      // =====================================================================
      else if (elapsed < 4.0) {
        setStatusMessage('[3/5] Constructing Finder Window & Typing Content...');
        const t = Math.min(1, Math.max(0, (elapsed - 2.5) / 1.5));
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
            chatText: 'scaling frame to 920×560',
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
            caretText: currentTyped,
            chatText: 'typing headlines & auto-layout'
          },
          sarah: { hidden: true, x: curX + curW - 80, y: curY + 50 },
          alex: { hidden: true, x: curX, y: curY },
          elena: { hidden: true, x: curX + curW / 2, y: curY + curH + 24 }
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
      // Phase 4: Bottom macOS Dock Capsule (4.0s - 5.2s) — 2 Cursors
      // =====================================================================
      else if (elapsed < 5.2) {
        setStatusMessage('[4/5] Extruding Glass Dock Capsule...');
        const t = Math.min(1, Math.max(0, (elapsed - 4.0) / 1.2));
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
            x: curRight,
            y: curDockY + 28,
            color: '#0ACF83',
            label: 'Alex Chen',
            action: 'Extruding Glass Capsule',
            chatText: 'extruding glass dock capsule',
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
          user: {
            x: curLeft + dockSpan * 0.5,
            y: curDockY + 12,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Deploying Dock Apps',
            chatText: 'snapping dock apps'
          },
          sarah: { hidden: true, x: curLeft, y: curDockY + 28 },
          varun: { hidden: true, x: w - 75, y: h - 85 },
          elena: { hidden: true, x: w / 2, y: curDockY }
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
      // Phase 5: Built live, by a crowd of cursors! (5.2s - 6.2s) — 2 Cursors
      // =====================================================================
      else if (elapsed < 6.2) {
        setStatusMessage('[5/5] Built live, by a crowd of cursors!');
        const t = Math.min(1, Math.max(0, (elapsed - 5.2) / 1.0));
        const centerX = w / 2;
        const centerY = h / 2;

        updateStage(5, 960); // Everything unlocked!

        agentTargets = {
          varun: {
            x: centerX - 90 + Math.sin(t * Math.PI * 2) * 20,
            y: centerY - 40,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'System Ready 🚀',
            chatText: '✨ Built live, by a crowd of cursors!'
          },
          user: {
            x: centerX + 90 - Math.sin(t * Math.PI * 2) * 20,
            y: centerY - 40,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'VarunOS Ready',
            chatText: 'Ready to explore!'
          },
          sarah: { hidden: true, x: centerX - 120, y: centerY },
          alex: { hidden: true, x: centerX + 120, y: centerY },
          elena: { hidden: true, x: centerX, y: centerY + 60 }
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
          p = { x: target.x || 0, y: target.y || 0, trail: [] };
          physicsRef.current[key] = p;
        }

        if (target.hidden) {
          updatedCursors[key] = {
            ...target,
            x: target.x || p.x,
            y: target.y || p.y,
            trail: []
          };
          return;
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

      // Compute dynamic SVG network paths between the active collaborative agents (1-2 at a time)
      const leadList = Object.values(updatedCursors).filter((c) => !c.hidden);
      const netPaths = [];
      for (let i = 0; i < leadList.length; i++) {
        for (let j = i + 1; j < leadList.length; j++) {
          const a = leadList[i];
          const b = leadList[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 420) {
            netPaths.push({
              d: `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`,
              color: a.color,
              opacity: (1 - dist / 420) * 0.28
            });
          }
        }
      }

      setCursors(updatedCursors);
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
        <span className="blueprint-coords">{statusMessage} • 5 COLLABORATIVE ARCHITECTS (Active)</span>
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
        if (cursor.hidden || !cursor.isDrawing || !cursor.boxBounds) return null;
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

      {/* Active Multiplayer Cursors (1-2 Active at a time like kittu.pro) */}
      {Object.entries(cursors).map(([key, cursor]) => {
        if (cursor.hidden) return null;
        return (
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
            chatText={cursor.chatText}
            trail={cursor.trail}
          />
        );
      })}
    </div>
  );
};

export default SwarmRebuildOverlay;