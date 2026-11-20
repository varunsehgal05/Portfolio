import React, { useState, useEffect, useRef } from 'react';
import './SwarmRebuildOverlay.css';

// SVG Pointer Component in authentic Figma/Kittu.pro style with fluid particle trail
const SwarmCursor = React.memo(({
  x,
  y,
  color,
  label,
  action,
  toolKey,
  cursorMode = 'arrow',
  isClicking = false,
  isDrawing = false,
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
        className={`swarm-cursor-agent ${isClicking ? 'is-clicking' : ''}`}
        style={{
          transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`,
          '--cursor-color': color
        }}
      >
        {/* Cursor Icon: Arrow, Crosshair, Text I-Beam, Grab Hand, or Resize */}
        {cursorMode === 'cross' ? (
          <div className="swarm-crosshair-icon" style={{ borderColor: color }}>
            <div className="ch-h" style={{ backgroundColor: color }} />
            <div className="ch-v" style={{ backgroundColor: color }} />
          </div>
        ) : cursorMode === 'text' ? (
          <svg width="18" height="22" viewBox="0 0 16 20" fill="none" className="swarm-pointer-svg">
            <path d="M4 2H12M8 2V18M4 18H12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : cursorMode === 'grab' ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="swarm-pointer-svg">
            <path
              d="M10 5V12M14 6V12M6 8V14C6 17.3 8.7 20 12 20C15.3 20 18 17.3 18 14V8M18 11V8"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              fill="rgba(255,255,255,0.2)"
            />
          </svg>
        ) : cursorMode === 'resize' ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="swarm-pointer-svg">
            <path
              d="M4 16L16 4M16 4H9M16 4V11M4 16H11M4 16V9"
              stroke={color}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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

        {/* Floating Tool Keyboard Shortcut Badge (Kittu.pro Style cv-key: T, F, R, V, ⌥) */}
        {toolKey && (
          <div className="swarm-tool-key-badge">
            <span>{toolKey}</span>
          </div>
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

        {/* Collaborative Chat Bubble (Kittu.pro Style cv-chat) */}
        {chatText && (
          <div className="swarm-chat-bubble" style={{ '--cursor-color': color }}>
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

// Kittu Pro Human Motion Easing and Arc Interpolation (from module 56877)
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

// Human Arc Path Generator (matching Kittu Pro's tr function)
// Produces natural wrist arc curves with perpendicular deviation and settle recoil
const interpolateArc = (x1, y1, x2, y2, progress, arcDeviation = 0, overshoot = 0) => {
  const p = Math.min(1, Math.max(0, progress));
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy) || 1;

  let eased = easeInOutCubic(p);
  if (overshoot > 0 && p > 0.62) {
    const settle = Math.sin(Math.PI * Math.min(1, (p - 0.62) / 0.38));
    eased += settle * overshoot;
  }

  const arcOffset = Math.sin(Math.PI * p) * arcDeviation;
  return {
    x: x1 + dx * eased - (dy / dist) * arcOffset,
    y: y1 + dy * eased + (dx / dist) * arcOffset
  };
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

  // 5 Collaborative Multiplayer Cursors
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

  // Human-calibrated 14-second organic animation loop (Kittu Pro Choreography)
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

      let agentTargets = {};

      // =====================================================================
      // Phase 1: Top MenuBar Drafting & Alignment (0.0s - 3.2s) — 2 Cursors
      // =====================================================================
      if (elapsed < 3.2) {
        setStatusMessage('[1/5] Drafting macOS MenuBar wireframe...');
        const t = Math.min(1, Math.max(0, elapsed / 3.2));

        // Varun curves to top-left and drags frame across top
        const varunStart = { x: 40, y: 18 };
        const varunEnd = { x: w - 24, y: 14 };
        const varunArc = interpolateArc(varunStart.x, varunStart.y, varunEnd.x, varunEnd.y, Math.min(1, t * 1.3), -28, 0.04);

        // User curves across to status tray
        const userStart = { x: w - 40, y: 24 };
        const userEnd = { x: w - 180, y: 14 };
        const userProgress = Math.min(1, Math.max(0, (t - 0.25) / 0.7));
        const userArc = interpolateArc(userStart.x, userStart.y, userEnd.x, userEnd.y, userProgress, 22, 0.03);

        const isVarunClicking = t > 0.16 && t < 0.24;
        const isUserClicking = t > 0.78 && t < 0.86;

        if (t > 0.8) {
          updateStage(1, 680); // Reveal MenuBar
        }

        const menuDrawnW = Math.max(20, varunArc.x);

        agentTargets = {
          varun: {
            x: varunArc.x,
            y: varunArc.y,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: t < 0.2 ? 'Selecting Frame' : 'Drafting MenuBar',
            toolKey: t < 0.22 ? 'F Frame' : null,
            cursorMode: t < 0.2 ? 'arrow' : 'cross',
            isClicking: isVarunClicking,
            isDrawing: true,
            chatText: t > 0.25 && t < 0.85 ? 'morning! drafting top bar' : null,
            boxBounds: { x: 0, y: 0, w: menuDrawnW, h: 28, label: 'MenuBar 100vw × 28px • Blur(24px)' }
          },
          user: {
            x: userArc.x,
            y: userArc.y,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Aligning Status Tray',
            toolKey: t > 0.25 && t < 0.45 ? 'V Move' : null,
            cursorMode: 'arrow',
            isClicking: isUserClicking,
            chatText: t > 0.45 && t < 0.95 ? 'on it, aligning tray' : null,
            isDrawing: false
          },
          sarah: { hidden: true, x: 56, y: 48 },
          alex: { hidden: true, x: winTargetX, y: winTargetY },
          elena: { hidden: true, x: w / 2, y: 28 }
        };

        setWireframeData({
          type: 'menubar',
          w: menuDrawnW,
          h: 28,
          opacity: 1
        });

        setActiveGuides([
          {
            type: 'h',
            x1: 0,
            y1: 28,
            x2: menuDrawnW,
            y2: 28,
            color: '#ec4899',
            dashed: true,
            label: 'Y: 28px (Top Bar)',
            pillText: 'Y: 28px',
            pillX: menuDrawnW / 2,
            pillY: 28
          }
        ]);
      }
      // =====================================================================
      // Phase 2: Desktop App Icons Stamping via ⌥ Duplicate (3.2s - 7.2s) — 2 Cursors
      // =====================================================================
      else if (elapsed < 7.2) {
        setStatusMessage('[2/5] Stamping & Duplicating Desktop Apps...');
        const t = Math.min(1, Math.max(0, (elapsed - 3.2) / 4.0));

        if (t > 0.85) {
          updateStage(2, 740); // Reveal Desktop Icons
        }

        const iconNames = ['Figma', 'VS Code', 'Resume.pdf', 'Contact', 'Trash'];
        const iconYPositions = [48, 126, 204, 282, 360];
        
        // 5 icons stamped sequentially (~0.75s per icon)
        const totalIcons = 5;
        const iconFloat = t * totalIcons;
        const iconIndex = Math.min(4, Math.floor(iconFloat));
        const subProgress = iconFloat - iconIndex;

        // Curve movement between previous and next icon
        const prevY = iconIndex === 0 ? 48 : iconYPositions[iconIndex - 1];
        const nextY = iconYPositions[iconIndex];
        const sarahPos = interpolateArc(56, prevY, 56, nextY, subProgress, -16, 0.05);

        const elenaX = 96;
        const elenaY = sarahPos.y;

        const isSarahClicking = subProgress > 0.72 && subProgress < 0.95;

        // Stamp audio & ripple trigger when landing on each icon
        if (lastStampedIndexRef.current !== iconIndex) {
          lastStampedIndexRef.current = iconIndex;
          soundSynth.playDropThump(220 + iconIndex * 35);
          triggerRipple(56, iconYPositions[iconIndex] + 20, '#FF7262');
        }

        agentTargets = {
          sarah: {
            x: sarahPos.x,
            y: sarahPos.y,
            color: '#FF7262',
            label: 'Sarah Lin',
            action: `Stamping: ${iconNames[iconIndex]}`,
            toolKey: '⌥ Option',
            cursorMode: subProgress < 0.65 ? 'grab' : 'arrow',
            isClicking: isSarahClicking,
            isDrawing: true,
            chatText: t < 0.75 ? 'stamping desktop apps (⌥ dup)' : null,
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
            cursorMode: 'arrow',
            chatText: t > 0.25 && t < 0.85 ? 'checking 78px spacing' : null,
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
            pillY: sarahPos.y + 35
          }
        ]);
      }
      // =====================================================================
      // Phase 3: Center Finder Window & Live Headline Typing (7.2s - 11.4s) — 2 Cursors
      // =====================================================================
      else if (elapsed < 11.4) {
        setStatusMessage('[3/5] Constructing Finder Window & Typing Content...');
        const t = Math.min(1, Math.max(0, (elapsed - 7.2) / 4.2));

        // 7.2s - 9.2s: Window frame extrusion
        const frameProgress = Math.min(1, t / 0.52);
        const curW = lerp(80, winTargetW, easeInOutCubic(frameProgress));
        const curH = lerp(60, winTargetH, easeInOutCubic(frameProgress));
        const curX = winTargetX;
        const curY = winTargetY;

        // Smoothly reveal real window when frame is drawn
        if (t > 0.52) {
          updateStage(3, 800);
        }

        // 9.2s - 11.4s: Authentic human typing cadence with pauses
        const headlineText = 'Designing intuitive web apps & modern interfaces';
        const typingTimeProgress = Math.min(1, Math.max(0, (t - 0.54) / 0.44));
        const charCount = Math.floor(typingTimeProgress * headlineText.length);
        const currentTyped = headlineText.substring(0, charCount);

        // Tactile typewriter clicks with space and punctuation pauses
        if (typingTimeProgress > 0 && typingTimeProgress < 1 && Date.now() - lastTypeTimeRef.current > 75) {
          soundSynth.playTypeClick(320 + Math.random() * 80);
          lastTypeTimeRef.current = Date.now();
        }

        // Alex holds pivot, User extrudes frame, then Varun types headline
        const userFrameArc = interpolateArc(curX + 80, curY + 60, curX + curW, curY + curH, frameProgress, 20, 0.04);
        const varunX = curX + 220 + typingTimeProgress * 290;
        const varunY = curY + 98;

        agentTargets = {
          alex: {
            hidden: t > 0.58,
            x: curX,
            y: curY,
            color: '#0ACF83',
            label: 'Alex Chen',
            action: 'Holding Pivot (0, 0)',
            toolKey: t < 0.25 ? 'F Frame' : null,
            cursorMode: 'arrow'
          },
          user: {
            hidden: t > 0.62,
            x: userFrameArc.x,
            y: userFrameArc.y,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Extruding Window Frame',
            toolKey: t < 0.3 ? 'V Move' : null,
            cursorMode: 'resize',
            isDrawing: true,
            chatText: t < 0.5 ? 'scaling frame to 920×560' : null,
            boxBounds: {
              x: curX,
              y: curY,
              w: curW,
              h: curH,
              label: `VarunOS Portfolio — ${Math.round(curW)} × ${Math.round(curH)} px`
            }
          },
          varun: {
            hidden: t < 0.48,
            x: varunX,
            y: varunY,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Typing Headline...',
            toolKey: t >= 0.48 && t < 0.6 ? 'T Text' : null,
            cursorMode: 'text',
            caretText: currentTyped,
            chatText: t >= 0.55 ? 'typing headlines & auto-layout' : null
          },
          sarah: { hidden: true, x: curX + curW - 80, y: curY + 50 },
          elena: { hidden: true, x: curX + curW / 2, y: curY + curH + 24 }
        };

        const wireframeOpacity = t < 0.52 ? 1 : Math.max(0, 1 - (t - 0.52) / 0.16);
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
      // Phase 4: Bottom macOS Dock Capsule (11.4s - 13.6s) — 2 Cursors
      // =====================================================================
      else if (elapsed < 13.6) {
        setStatusMessage('[4/5] Extruding Glass Dock Capsule...');
        const t = Math.min(1, Math.max(0, (elapsed - 11.4) / 2.2));
        const easedMove = easeInOutCubic(t);

        const dockSpan = lerp(60, dockTargetW, easedMove);
        const curLeft = (w - dockSpan) / 2;
        const curRight = (w + dockSpan) / 2;
        const curDockY = dockTargetY;

        if (t > 0.5) {
          updateStage(4, 880); // Reveal Dock
        }

        const alexArc = interpolateArc(w / 2, curDockY + 28, curRight, curDockY + 28, t, 18, 0.04);
        const userArc = interpolateArc(w / 2 - 120, curDockY + 14, curLeft + dockSpan * 0.45, curDockY + 12, t, -16, 0.04);

        agentTargets = {
          alex: {
            x: alexArc.x,
            y: alexArc.y,
            color: '#0ACF83',
            label: 'Alex Chen',
            action: 'Extruding Glass Capsule',
            toolKey: t < 0.28 ? 'R Rectangle' : null,
            cursorMode: 'cross',
            chatText: t < 0.75 ? 'extruding glass dock capsule' : null,
            isDrawing: true,
            boxBounds: {
              x: curLeft,
              y: curDockY,
              w: dockSpan,
              h: 56,
              label: `macOS Glass Dock • ${Math.round(dockSpan)} × 56px`
            }
          },
          user: {
            x: userArc.x,
            y: userArc.y,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Deploying Dock Apps',
            toolKey: t < 0.35 ? 'V Move' : null,
            cursorMode: 'arrow',
            chatText: t > 0.35 && t < 0.85 ? 'snapping dock apps' : null
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
      // Phase 5: Built live, by a crowd of cursors! (13.6s - 15.0s) — Celebration
      // =====================================================================
      else if (elapsed < 15.0) {
        setStatusMessage('[5/5] Built live, by a crowd of cursors!');
        const t = Math.min(1, Math.max(0, (elapsed - 13.6) / 1.4));
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
            toolKey: 'V Move',
            cursorMode: 'arrow',
            chatText: '✨ Built live, by a crowd of cursors!'
          },
          user: {
            x: centerX + 90 - Math.sin(t * Math.PI * 2) * 20,
            y: centerY - 40,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'VarunOS Ready',
            toolKey: 'V Move',
            cursorMode: 'arrow',
            chatText: 'Ready to explore! 🚀'
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

      // Smooth dampening physics with fluid particle trails
      const updatedCursors = {};
      const smoothRate = 18.0;
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

        p.x += (target.x - p.x) * smoothingFactor;
        p.y += (target.y - p.y) * smoothingFactor;

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

      // Compute dynamic SVG connector lines between active collaborative agents
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
      {/* Top Floating Rebuild HUD Controls */}
      <div className="swarm-hud-bar">
        <div className="swarm-hud-status">
          <span className="swarm-hud-pulse-dot" />
          <span className="swarm-hud-phase">{statusMessage}</span>
        </div>
        <div className="swarm-hud-controls">
          <button
            type="button"
            className="swarm-hud-btn"
            onClick={handleTogglePause}
            title="Pause / Resume (Space)"
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
          <button
            type="button"
            className="swarm-hud-btn"
            onClick={handleToggleSpeed}
            title="Toggle playback speed (1x / 2x)"
          >
            {speedMultiplier === 1 ? '1x Speed' : '2x Fast'}
          </button>
          <button
            type="button"
            className="swarm-hud-btn"
            onClick={handleToggleSound}
            title="Mute / Unmute sound effects (M)"
          >
            {isMuted ? '🔇 Muted' : '🔊 Sound'}
          </button>
          <button
            type="button"
            className="swarm-hud-skip-btn"
            onClick={finishSwarm}
            title="Skip rebuild and open VarunOS immediately (Esc)"
          >
            Skip Rebuild ⏭
          </button>
        </div>
      </div>

      {/* Blueprint Coordinates Indicator (Bottom-Left) */}
      <div className="swarm-blueprint-indicator">
        <div className="blueprint-header-row">
          <span className="blueprint-tag">⚡ SWARM REBUILD ENGINE v4.0</span>
          <button 
            type="button" 
            className="swarm-blueprint-skip-btn" 
            onClick={finishSwarm}
            title="Skip rebuild and open VarunOS immediately (Esc)"
          >
            Skip Rebuild (Esc) ⏭
          </button>
        </div>
        <span className="blueprint-coords">{statusMessage} • FIGMA MULTIPLAYER CANVAS</span>
      </div>

      {/* Viewport Info Readout (Bottom-Right) */}
      <div className="swarm-blueprint-viewport">
        <span>VIEWPORT: {dims.w} × {dims.h} px • 60 FPS</span>
      </div>

      {/* SVG Canvas for smart guide lines, measurements & dynamic swarm network paths */}
      <svg className="swarm-vector-canvas" width={dims.w} height={dims.h}>
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
            toolKey={cursor.toolKey}
            cursorMode={cursor.cursorMode}
            isClicking={cursor.isClicking}
            isDrawing={cursor.isDrawing}
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
