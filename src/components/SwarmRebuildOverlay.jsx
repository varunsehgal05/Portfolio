import React, { useState, useEffect, useRef } from 'react';
import './SwarmRebuildOverlay.css';

// SVG Pointer Component in authentic Figma/Kittu.pro style with fluid particle trail
const SwarmCursor = React.memo(({
  x,
  y,
  color,
  label,
  toolKey,
  cursorMode = 'arrow',
  isClicking = false,
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
            width: `${Math.max(3, 6 - idx * 1.2)}px`,
            height: `${Math.max(3, 6 - idx * 1.2)}px`,
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
          <svg width="14" height="18" viewBox="0 0 16 20" fill="none" className="swarm-pointer-svg">
            <path d="M4 2H12M8 2V18M4 18H12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : cursorMode === 'grab' ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="swarm-pointer-svg">
            <path
              d="M10 5V12M14 6V12M6 8V14C6 17.3 8.7 20 12 20C15.3 20 18 17.3 18 14V8M18 11V8"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              fill="rgba(255,255,255,0.2)"
            />
          </svg>
        ) : cursorMode === 'resize' ? (
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="swarm-pointer-svg">
            <path
              d="M4 16L16 4M16 4H9M16 4V11M4 16H11M4 16V9"
              stroke={color}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="swarm-pointer-svg">
            <path
              d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
              fill={color}
              stroke="#ffffff"
              strokeWidth="1.2"
            />
          </svg>
        )}

        {/* Compact Figma-style name tag with tool pill */}
        <div className="swarm-cursor-tag" style={{ backgroundColor: color }}>
          <span className="swarm-cursor-name">{label}</span>
          {toolKey && (
            <span className="swarm-cursor-tool-tag">
              {toolKey.includes(' ') ? toolKey.split(' ')[0] : toolKey}
            </span>
          )}
        </div>

        {/* Optional Chat Bubble */}
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
  const heroBoxPlacedRef = useRef(false);
  const heroCtaSnappedRef = useRef(false);
  const card1PlacedRef = useRef(false);
  const card1BadgeSnappedRef = useRef(false);
  const card2PlacedRef = useRef(false);
  const card2BadgeSnappedRef = useRef(false);
  const card3PlacedRef = useRef(false);
  const card3BadgeSnappedRef = useRef(false);
  const card4PlacedRef = useRef(false);
  const card4BadgeSnappedRef = useRef(false);
  const dockSnappedRef = useRef(false);
  const lastTypedCharRef = useRef('');
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
    heroBoxPlacedRef.current = false;
    heroCtaSnappedRef.current = false;
    card1PlacedRef.current = false;
    card1BadgeSnappedRef.current = false;
    card2PlacedRef.current = false;
    card2BadgeSnappedRef.current = false;
    card3PlacedRef.current = false;
    card3BadgeSnappedRef.current = false;
    card4PlacedRef.current = false;
    card4BadgeSnappedRef.current = false;
    dockSnappedRef.current = false;
    lastTypedCharRef.current = '';
    lastStampedIndexRef.current = -1;

    // Reset desktop icon reveal count to 0 at start of rebuild
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('varunos-swarm-icon-stamped', { detail: { count: 0 } }));
    }

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

      // Exact target formulas matching Window.jsx (Finder window) and Dock.css
      const availableH = Math.max(300, h - 28 - 70);
      const winTargetW = Math.min(Math.max(400, w) - 80, 920);
      const winTargetH = Math.min(availableH - 20, 560);
      const winTargetX = Math.max(10, Math.round((w - winTargetW) / 2));
      const winTargetY = Math.max(38, Math.round(28 + (availableH - winTargetH) / 2));

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
      // Phase 2: Desktop App Icons Stamping via ⌥ Duplicate (3.2s - 7.6s) — 2 Cursors
      // =====================================================================
      else if (elapsed < 7.6) {
        setStatusMessage('[2/5] Stamping & Duplicating Desktop Apps...');
        const t = Math.min(1, Math.max(0, (elapsed - 3.2) / 4.4));

        if (t > 0.9) {
          updateStage(2, 740); // Reveal Desktop Icons
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('varunos-swarm-icon-stamped', { detail: { count: 6 } }));
          }
        }

        const iconNames = ['Figma', 'VS Code', 'Resume.pdf', 'Contact', 'Buy Me a Coffee', 'Trash'];
        const iconYPositions = [48, 126, 204, 282, 360, 438];
        
        // 6 icons stamped sequentially (~0.73s per icon)
        const totalIcons = 6;
        const iconFloat = t * totalIcons;
        const iconIndex = Math.min(5, Math.floor(iconFloat));
        const subProgress = iconFloat - iconIndex;

        // Curve movement between previous and next icon
        const prevY = iconIndex === 0 ? 48 : iconYPositions[iconIndex - 1];
        const nextY = iconYPositions[iconIndex];
        const sarahPos = interpolateArc(56, prevY, 56, nextY, subProgress, -16, 0.05);

        // Elena stays cleanly positioned to the right and slightly offset to prevent ANY cursor tag collision
        const elenaX = 142;
        const elenaY = sarahPos.y - 14;

        const isSarahClicking = subProgress > 0.72 && subProgress < 0.95;

        // Stamp audio & ripple trigger when landing on each icon + instant sequential 1-by-1 reveal
        if (lastStampedIndexRef.current !== iconIndex) {
          lastStampedIndexRef.current = iconIndex;
          soundSynth.playDropThump(220 + iconIndex * 28);
          triggerRipple(56, iconYPositions[iconIndex] + 20, '#FF7262');
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('varunos-swarm-icon-stamped', { detail: { count: iconIndex + 1 } }));
          }
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
              label: iconNames[iconIndex]
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

        const prevIconY = iconIndex > 0 ? iconYPositions[iconIndex - 1] : 48;
        const currentIconY = iconYPositions[iconIndex];
        const gapMidY = (prevIconY + currentIconY) / 2 + 35;

        setActiveGuides([
          { type: 'v', x1: 20, y1: 40, x2: 20, y2: 510, color: '#ec4899', dashed: true, label: 'X: 20px (Margin)' },
          {
            type: 'v',
            x1: 92,
            y1: 40,
            x2: 92,
            y2: 510,
            color: '#ec4899',
            dashed: true,
            label: 'X: 92px (Column)',
            pillText: iconIndex > 0 ? 'ΔY: 78px Equal Spacing' : null,
            pillX: 148,
            pillY: gapMidY
          }
        ]);
      }
      // =====================================================================
      // Phase 3: Box-by-Box Window Construction & Content Typing (7.6s - 22.0s)
      // Sequential, deliberate 2x2 grid choreography:
      // 3.1 (7.6s - 9.6s): Alex Chen extrudes outer Window Frame Box [F] smoothly (2.0s)
      // 3.2 (9.6s - 11.0s): Alex Chen draws Hero Bento Box [R] -> snap thump (1.4s)
      // 3.3 (11.0s - 12.8s): Varun Sehgal types headline & sub copy [T] -> snaps status badge (1.8s)
      // 3.4 (12.8s - 14.6s): Elena puts Card 01 Box [R] + Sarah types AI Interview content [T] (1.8s)
      // 3.5 (14.6s - 16.4s): Alex puts Card 02 Box [R] + Varun types EventFlow content [T] (1.8s)
      // 3.6 (16.4s - 18.2s): Elena puts Card 03 Box [R] + Sarah types Expensify content [T] (1.8s)
      // 3.7 (18.2s - 20.0s): Alex puts Card 04 Box [R] + Varun types CodeSrijan content [T] (1.8s)
      // 3.8 (20.0s - 22.0s): Elena & Alex check 2x2 Auto-Layout & reveal VarunOS workspace (2.0s)
      // =====================================================================
      else if (elapsed < 22.0) {
        const pElapsed = elapsed - 7.6;

        const curW = winTargetW;
        const curH = winTargetH;
        const curX = winTargetX;
        const curY = winTargetY;

        // Content layout bounds inside window
        const sidebarW = 175;
        const headerH = 38;
        const contentX = curX + sidebarW + 16;
        const contentY = curY + headerH + 12;
        const contentW = curW - sidebarW - 32;

        // 1. Hero Box Bounds
        const heroX = contentX;
        const heroY = contentY;
        const heroW = contentW;
        const heroH = 96;

        // 2. Cards 2x2 Grid Bounds (Compact, matching real Finder window)
        const cardsGap = 10;
        const cardsY = heroY + heroH + 10;
        const cardW = Math.floor((contentW - cardsGap) / 2);
        const cardH = 102;

        const card1X = contentX;
        const card1Y = cardsY;

        const card2X = contentX + cardW + cardsGap;
        const card2Y = cardsY;

        const card3X = contentX;
        const card3Y = cardsY + cardH + cardsGap;

        const card4X = contentX + cardW + cardsGap;
        const card4Y = cardsY + cardH + cardsGap;

        // Sub-phase 3.1: Alex Chen Extrudes Outer Window Frame Box (0.0s - 2.0s)
        if (pElapsed < 2.0) {
          setStatusMessage('[3/5] Alex Chen: [F] Extruding Window Frame Box...');
          const t1 = Math.min(1, pElapsed / 2.0);
          const drawnW = lerp(120, winTargetW, easeInOutCubic(t1));
          const drawnH = lerp(80, winTargetH, easeInOutCubic(t1));

          const alexFrameArc = interpolateArc(curX + 120, curY + 80, curX + drawnW, curY + drawnH, t1, 14, 0.03);

          agentTargets = {
            alex: {
              x: alexFrameArc.x,
              y: alexFrameArc.y,
              color: '#0ACF83',
              label: 'Alex Chen',
              toolKey: 'F Frame',
              cursorMode: 'resize',
              isDrawing: true,
              boxBounds: {
                x: curX,
                y: curY,
                w: drawnW,
                h: drawnH,
                label: `VarunOS Portfolio • ${Math.round(drawnW)} × ${Math.round(drawnH)}px`
              }
            },
            varun: { hidden: true, x: curX + 120, y: curY + 60 },
            user: { hidden: true, x: curX + drawnW, y: curY + drawnH },
            sarah: { hidden: true, x: curX + drawnW, y: curY + 40 },
            elena: { hidden: true, x: curX + drawnW / 2, y: curY + drawnH + 20 }
          };

          setWireframeData({
            type: 'window',
            x: curX,
            y: curY,
            w: drawnW,
            h: drawnH,
            heroBoxVisible: false,
            card1BoxVisible: false,
            card2BoxVisible: false,
            card3BoxVisible: false,
            card4BoxVisible: false,
            opacity: 1
          });

          setActiveGuides([
            {
              type: 'v',
              x1: curX + drawnW / 2,
              y1: curY - 16,
              x2: curX + drawnW / 2,
              y2: curY + drawnH + 16,
              color: '#ec4899',
              dashed: true,
              label: 'Center Alignment',
              pillText: `Center: ${Math.round(drawnW)}px`,
              pillX: curX + drawnW / 2,
              pillY: curY + drawnH + 16
            }
          ]);
        }

        // Sub-phase 3.2: Alex Chen Puts Hero Bento Box (2.0s - 3.4s)
        else if (pElapsed < 3.4) {
          setStatusMessage('[3/5] Alex Chen: [R] Putting Hero Bento Box...');
          const t2 = Math.min(1, (pElapsed - 2.0) / 1.4);
          const drawnHeroW = lerp(40, heroW, easeInOutCubic(t2));
          const drawnHeroH = lerp(20, heroH, easeInOutCubic(t2));

          const alexArc = interpolateArc(heroX + 40, heroY + 20, heroX + drawnHeroW, heroY + drawnHeroH, t2, 14, 0.04);

          if (t2 > 0.85 && !heroBoxPlacedRef.current) {
            heroBoxPlacedRef.current = true;
            soundSynth.playDropThump(220);
            triggerRipple(heroX + heroW / 2, heroY + heroH / 2, '#0ACF83');
          }

          agentTargets = {
            alex: {
              x: alexArc.x,
              y: alexArc.y,
              color: '#0ACF83',
              label: 'Alex Chen',
              toolKey: 'R Rectangle',
              cursorMode: 'cross',
              isDrawing: true,
              boxBounds: {
                x: heroX,
                y: heroY,
                w: drawnHeroW,
                h: drawnHeroH,
                label: `Alex Chen • [R] Hero Box (${Math.round(drawnHeroW)} × ${Math.round(drawnHeroH)}px)`
              }
            },
            varun: { hidden: true, x: heroX + 16, y: heroY + 36 },
            user: { hidden: true, x: curX + curW, y: curY + curH },
            sarah: { hidden: true, x: contentX + 40, y: cardsY + 40 },
            elena: { hidden: true, x: curX + curW / 2, y: curY + curH + 20 }
          };

          setWireframeData({
            type: 'window',
            x: curX,
            y: curY,
            w: curW,
            h: curH,
            heroBoxVisible: true,
            heroBoxActive: true,
            heroBoxPlaced: t2 > 0.85,
            heroTypedText: '',
            heroCaretVisible: false,
            card1BoxVisible: false,
            card2BoxVisible: false,
            card3BoxVisible: false,
            card4BoxVisible: false,
            opacity: 1
          });

          setActiveGuides([
            {
              type: 'h',
              x1: heroX,
              y1: heroY,
              x2: heroX + drawnHeroW,
              y2: heroY,
              color: '#38bdf8',
              dashed: true,
              label: 'Hero Top Alignment',
              pillText: `W: ${Math.round(drawnHeroW)}px`,
              pillX: heroX + drawnHeroW / 2,
              pillY: heroY - 14
            }
          ]);
        }

        // Sub-phase 3.3: Varun Sehgal Types Headline Copy into Hero Box (3.4s - 5.2s)
        else if (pElapsed < 5.2) {
          setStatusMessage('[3/5] Varun Sehgal: [T] Typing headline copy into box...');
          const t3 = Math.min(1, (pElapsed - 3.4) / 1.8);
          const headline = 'Designing intuitive web apps & modern interfaces';
          const charCount = Math.floor(t3 * headline.length);
          const currentTyped = headline.substring(0, charCount);

          if (charCount > 0 && currentTyped !== lastTypedCharRef.current && Date.now() - lastTypeTimeRef.current > 45) {
            lastTypedCharRef.current = currentTyped;
            lastTypeTimeRef.current = Date.now();
            soundSynth.playTypeClick(310 + Math.random() * 60);
          }

          const varunTypingX = heroX + 18 + Math.min(contentW - 140, charCount * 8.2);
          const varunTypingY = heroY + 40;

          const isCtaPlaced = t3 > 0.78;
          if (isCtaPlaced && !heroCtaSnappedRef.current) {
            heroCtaSnappedRef.current = true;
            soundSynth.playSnap(720);
            triggerRipple(heroX + heroW - 60, heroY + heroH - 22, '#A259FF');
          }

          agentTargets = {
            varun: {
              x: isCtaPlaced ? heroX + heroW - 60 : varunTypingX,
              y: isCtaPlaced ? heroY + heroH - 22 : varunTypingY,
              color: '#A259FF',
              label: 'Varun Sehgal',
              toolKey: isCtaPlaced ? 'V Move' : 'T Text',
              cursorMode: isCtaPlaced ? 'arrow' : 'text',
              isClicking: t3 > 0.78 && t3 < 0.88
            },
            alex: { hidden: true, x: card1X + 40, y: card1Y + 30 },
            user: { hidden: true, x: curX + curW, y: curY + curH },
            sarah: { hidden: true, x: card1X + 30, y: card1Y + 30 },
            elena: { hidden: true, x: curX + curW / 2, y: curY + curH + 20 }
          };

          setWireframeData({
            type: 'window',
            x: curX,
            y: curY,
            w: curW,
            h: curH,
            heroBoxVisible: true,
            heroBoxActive: false,
            heroBoxPlaced: true,
            heroTypedText: currentTyped,
            heroCaretVisible: t3 < 0.95,
            heroBadgeVisible: t3 > 0.15,
            ctaVisible: isCtaPlaced,
            card1BoxVisible: false,
            card2BoxVisible: false,
            card3BoxVisible: false,
            card4BoxVisible: false,
            opacity: 1
          });

          setActiveGuides([]);
        }

        // Sub-phase 3.4: Elena & Sarah Put Card 01 Box + Type AI Interview (5.2s - 7.0s)
        else if (pElapsed < 7.0) {
          const t4 = Math.min(1, (pElapsed - 5.2) / 1.8);
          setStatusMessage('[3/5] Elena & Sarah: [R] Box + [T] AI Interview Platform...');

          const isDrawing = t4 < 0.45;
          const drawProgress = Math.min(1, t4 / 0.45);
          const drawnCard1W = lerp(30, cardW, easeInOutCubic(drawProgress));
          const drawnCard1H = lerp(20, cardH, easeInOutCubic(drawProgress));

          if (drawProgress > 0.88 && !card1PlacedRef.current) {
            card1PlacedRef.current = true;
            soundSynth.playDropThump(240);
            triggerRipple(card1X + cardW / 2, card1Y + cardH / 2, '#F59E0B');
          }

          const typeProgress = Math.max(0, (t4 - 0.45) / 0.55);
          const card1Title = 'AI Interview & Prep Platform';
          const card1CharCount = Math.floor(typeProgress * card1Title.length);
          const card1Typed = card1Title.substring(0, card1CharCount);

          if (card1CharCount > 0 && card1Typed !== lastTypedCharRef.current && Date.now() - lastTypeTimeRef.current > 45) {
            lastTypedCharRef.current = card1Typed;
            lastTypeTimeRef.current = Date.now();
            soundSynth.playTypeClick(340 + Math.random() * 50);
          }

          if (typeProgress > 0.75 && !card1BadgeSnappedRef.current) {
            card1BadgeSnappedRef.current = true;
            soundSynth.playSnap(740);
          }

          const sarahTypeX = card1X + 12 + Math.min(cardW - 40, card1CharCount * 6.5);
          const sarahTypeY = card1Y + 34;

          agentTargets = {
            elena: {
              x: isDrawing ? card1X + drawnCard1W : card1X + cardW + 8,
              y: isDrawing ? card1Y + drawnCard1H : card1Y + 18,
              color: '#F59E0B',
              label: 'Elena Rostova',
              toolKey: isDrawing ? 'R Rectangle' : 'V Move',
              cursorMode: isDrawing ? 'cross' : 'arrow',
              isDrawing: isDrawing,
              boxBounds: isDrawing ? {
                x: card1X,
                y: card1Y,
                w: drawnCard1W,
                h: drawnCard1H,
                label: `Card 01 (${Math.round(drawnCard1W)} × ${Math.round(drawnCard1H)}px)`
              } : null
            },
            sarah: {
              hidden: isDrawing,
              x: sarahTypeX,
              y: sarahTypeY,
              color: '#FF7262',
              label: 'Sarah Lin',
              toolKey: 'T Text',
              cursorMode: 'text'
            },
            varun: { hidden: true, x: heroX + 220, y: heroY + 36 },
            alex: { hidden: true, x: card2X + 20, y: card2Y + 20 },
            user: { hidden: true, x: curX + curW, y: curY + curH }
          };

          setWireframeData({
            type: 'window',
            x: curX,
            y: curY,
            w: curW,
            h: curH,
            heroBoxVisible: true,
            heroTypedText: 'Designing intuitive web apps & modern interfaces',
            heroBadgeVisible: true,
            ctaVisible: true,
            card1BoxVisible: true,
            card1BoxActive: isDrawing,
            card1BoxPlaced: t4 > 0.4,
            card1TypedTitle: isDrawing ? '' : card1Typed,
            card1CaretVisible: !isDrawing && typeProgress < 0.95,
            card1TypedSub: typeProgress > 0.35 ? 'Architected AI SaaS with Security & Grading modules' : '',
            card1BadgesVisible: typeProgress > 0.75,
            card2BoxVisible: false,
            card3BoxVisible: false,
            card4BoxVisible: false,
            opacity: 1
          });

          setActiveGuides(isDrawing ? [
            {
              type: 'h',
              x1: card1X,
              y1: card1Y,
              x2: card1X + drawnCard1W,
              y2: card1Y,
              color: '#F59E0B',
              dashed: true,
              label: 'Card 01 Top',
              pillText: `W: ${Math.round(drawnCard1W)}px`,
              pillX: card1X + drawnCard1W / 2,
              pillY: card1Y - 12
            }
          ] : []);
        }

        // Sub-phase 3.5: Alex & Varun Put Card 02 Box + Type EventFlow (7.0s - 8.8s)
        else if (pElapsed < 8.8) {
          const t5 = Math.min(1, (pElapsed - 7.0) / 1.8);
          setStatusMessage('[3/5] Alex & Varun: [R] Box + [T] EventFlow SaaS...');

          const isDrawing = t5 < 0.45;
          const drawProgress = Math.min(1, t5 / 0.45);
          const drawnCard2W = lerp(30, cardW, easeInOutCubic(drawProgress));
          const drawnCard2H = lerp(20, cardH, easeInOutCubic(drawProgress));

          if (drawProgress > 0.88 && !card2PlacedRef.current) {
            card2PlacedRef.current = true;
            soundSynth.playDropThump(255);
            triggerRipple(card2X + cardW / 2, card2Y + cardH / 2, '#0ACF83');
          }

          const typeProgress = Math.max(0, (t5 - 0.45) / 0.55);
          const card2Title = 'EventFlow: Event Ticketing SaaS';
          const card2CharCount = Math.floor(typeProgress * card2Title.length);
          const card2Typed = card2Title.substring(0, card2CharCount);

          if (card2CharCount > 0 && card2Typed !== lastTypedCharRef.current && Date.now() - lastTypeTimeRef.current > 45) {
            lastTypedCharRef.current = card2Typed;
            lastTypeTimeRef.current = Date.now();
            soundSynth.playTypeClick(330 + Math.random() * 50);
          }

          if (typeProgress > 0.75 && !card2BadgeSnappedRef.current) {
            card2BadgeSnappedRef.current = true;
            soundSynth.playSnap(760);
          }

          const varunTypeX = card2X + 12 + Math.min(cardW - 40, card2CharCount * 6.5);
          const varunTypeY = card2Y + 34;

          agentTargets = {
            alex: {
              x: isDrawing ? card2X + drawnCard2W : card2X + cardW + 8,
              y: isDrawing ? card2Y + drawnCard2H : card2Y + 18,
              color: '#0ACF83',
              label: 'Alex Chen',
              toolKey: isDrawing ? 'R Rectangle' : 'V Move',
              cursorMode: isDrawing ? 'cross' : 'arrow',
              isDrawing: isDrawing,
              boxBounds: isDrawing ? {
                x: card2X,
                y: card2Y,
                w: drawnCard2W,
                h: drawnCard2H,
                label: `Card 02 (${Math.round(drawnCard2W)} × ${Math.round(drawnCard2H)}px)`
              } : null
            },
            varun: {
              hidden: isDrawing,
              x: varunTypeX,
              y: varunTypeY,
              color: '#A259FF',
              label: 'Varun Sehgal',
              toolKey: 'T Text',
              cursorMode: 'text'
            },
            sarah: { hidden: true, x: card1X + 40, y: card1Y + 30 },
            elena: { hidden: true, x: card1X + cardW + cardsGap / 2, y: card1Y + 20 },
            user: { hidden: true, x: curX + curW, y: curY + curH }
          };

          setWireframeData({
            type: 'window',
            x: curX,
            y: curY,
            w: curW,
            h: curH,
            heroBoxVisible: true,
            heroTypedText: 'Designing intuitive web apps & modern interfaces',
            heroBadgeVisible: true,
            ctaVisible: true,
            card1BoxVisible: true,
            card1BoxPlaced: true,
            card1TypedTitle: 'AI Interview & Prep Platform',
            card1TypedSub: 'Architected AI SaaS with Security & Grading modules',
            card1BadgesVisible: true,
            card2BoxVisible: true,
            card2BoxActive: isDrawing,
            card2BoxPlaced: t5 > 0.4,
            card2TypedTitle: isDrawing ? '' : card2Typed,
            card2CaretVisible: !isDrawing && typeProgress < 0.95,
            card2TypedSub: typeProgress > 0.35 ? '4-step checkout flow cutting drop-off by 30%' : '',
            card2BadgesVisible: typeProgress > 0.75,
            card3BoxVisible: false,
            card4BoxVisible: false,
            opacity: 1
          });

          setActiveGuides([
            {
              type: 'v',
              x1: card1X + cardW + cardsGap / 2,
              y1: cardsY,
              x2: card1X + cardW + cardsGap / 2,
              y2: cardsY + cardH,
              color: '#ec4899',
              dashed: true,
              label: 'ΔX: 10px',
              pillText: 'ΔX: 10px Equal Gap',
              pillX: card1X + cardW + cardsGap / 2,
              pillY: cardsY + cardH / 2
            }
          ]);
        }

        // Sub-phase 3.6: Elena & Sarah Put Card 03 Box + Type Expensify (8.8s - 10.6s)
        else if (pElapsed < 10.6) {
          const t6 = Math.min(1, (pElapsed - 8.8) / 1.8);
          setStatusMessage('[3/5] Elena & Sarah: [R] Box + [T] Expensify Budget App...');

          const isDrawing = t6 < 0.45;
          const drawProgress = Math.min(1, t6 / 0.45);
          const drawnCard3W = lerp(30, cardW, easeInOutCubic(drawProgress));
          const drawnCard3H = lerp(20, cardH, easeInOutCubic(drawProgress));

          if (drawProgress > 0.88 && !card3PlacedRef.current) {
            card3PlacedRef.current = true;
            soundSynth.playDropThump(270);
            triggerRipple(card3X + cardW / 2, card3Y + cardH / 2, '#F59E0B');
          }

          const typeProgress = Math.max(0, (t6 - 0.45) / 0.55);
          const card3Title = 'Expensify: Budget Tracker App';
          const card3CharCount = Math.floor(typeProgress * card3Title.length);
          const card3Typed = card3Title.substring(0, card3CharCount);

          if (card3CharCount > 0 && card3Typed !== lastTypedCharRef.current && Date.now() - lastTypeTimeRef.current > 45) {
            lastTypedCharRef.current = card3Typed;
            lastTypeTimeRef.current = Date.now();
            soundSynth.playTypeClick(340 + Math.random() * 50);
          }

          if (typeProgress > 0.75 && !card3BadgeSnappedRef.current) {
            card3BadgeSnappedRef.current = true;
            soundSynth.playSnap(780);
          }

          const sarahTypeX = card3X + 12 + Math.min(cardW - 40, card3CharCount * 6.5);
          const sarahTypeY = card3Y + 34;

          agentTargets = {
            elena: {
              x: isDrawing ? card3X + drawnCard3W : card3X + cardW + 8,
              y: isDrawing ? card3Y + drawnCard3H : card3Y + 18,
              color: '#F59E0B',
              label: 'Elena Rostova',
              toolKey: isDrawing ? 'R Rectangle' : 'V Move',
              cursorMode: isDrawing ? 'cross' : 'arrow',
              isDrawing: isDrawing,
              boxBounds: isDrawing ? {
                x: card3X,
                y: card3Y,
                w: drawnCard3W,
                h: drawnCard3H,
                label: `Card 03 (${Math.round(drawnCard3W)} × ${Math.round(drawnCard3H)}px)`
              } : null
            },
            sarah: {
              hidden: isDrawing,
              x: sarahTypeX,
              y: sarahTypeY,
              color: '#FF7262',
              label: 'Sarah Lin',
              toolKey: 'T Text',
              cursorMode: 'text'
            },
            varun: { hidden: true, x: card2X + 20, y: card2Y + 20 },
            alex: { hidden: true, x: card4X + 20, y: card4Y + 20 },
            user: { hidden: true, x: curX + curW, y: curY + curH }
          };

          setWireframeData({
            type: 'window',
            x: curX,
            y: curY,
            w: curW,
            h: curH,
            heroBoxVisible: true,
            heroTypedText: 'Designing intuitive web apps & modern interfaces',
            heroBadgeVisible: true,
            ctaVisible: true,
            card1BoxVisible: true,
            card1BoxPlaced: true,
            card1TypedTitle: 'AI Interview & Prep Platform',
            card1TypedSub: 'Architected AI SaaS with Security & Grading modules',
            card1BadgesVisible: true,
            card2BoxVisible: true,
            card2BoxPlaced: true,
            card2TypedTitle: 'EventFlow: Event Ticketing SaaS',
            card2TypedSub: '4-step checkout flow cutting drop-off by 30%',
            card2BadgesVisible: true,
            card3BoxVisible: true,
            card3BoxActive: isDrawing,
            card3BoxPlaced: t6 > 0.4,
            card3TypedTitle: isDrawing ? '' : card3Typed,
            card3CaretVisible: !isDrawing && typeProgress < 0.95,
            card3TypedSub: typeProgress > 0.35 ? '17+ mobile screens refined for rapid expense logging' : '',
            card3BadgesVisible: typeProgress > 0.75,
            card4BoxVisible: false,
            opacity: 1
          });

          setActiveGuides([
            {
              type: 'h',
              x1: card1X,
              y1: card1Y + cardH + cardsGap / 2,
              x2: card1X + cardW,
              y2: card1Y + cardH + cardsGap / 2,
              color: '#ec4899',
              dashed: true,
              label: 'ΔY: 10px',
              pillText: 'ΔY: 10px Equal Gap',
              pillX: card1X + cardW / 2,
              pillY: card1Y + cardH + cardsGap / 2
            }
          ]);
        }

        // Sub-phase 3.7: Alex & Varun Put Card 04 Box + Type CodeSrijan (10.6s - 12.4s)
        else if (pElapsed < 12.4) {
          const t7 = Math.min(1, (pElapsed - 10.6) / 1.8);
          setStatusMessage('[3/5] Alex & Varun: [R] Box + [T] CodeSrijan Hackathon...');

          const isDrawing = t7 < 0.45;
          const drawProgress = Math.min(1, t7 / 0.45);
          const drawnCard4W = lerp(30, cardW, easeInOutCubic(drawProgress));
          const drawnCard4H = lerp(20, cardH, easeInOutCubic(drawProgress));

          if (drawProgress > 0.88 && !card4PlacedRef.current) {
            card4PlacedRef.current = true;
            soundSynth.playDropThump(285);
            triggerRipple(card4X + cardW / 2, card4Y + cardH / 2, '#0ACF83');
          }

          const typeProgress = Math.max(0, (t7 - 0.45) / 0.55);
          const card4Title = 'CodeSrijan Hackathon Platform';
          const card4CharCount = Math.floor(typeProgress * card4Title.length);
          const card4Typed = card4Title.substring(0, card4CharCount);

          if (card4CharCount > 0 && card4Typed !== lastTypedCharRef.current && Date.now() - lastTypeTimeRef.current > 45) {
            lastTypedCharRef.current = card4Typed;
            lastTypeTimeRef.current = Date.now();
            soundSynth.playTypeClick(320 + Math.random() * 50);
          }

          if (typeProgress > 0.75 && !card4BadgeSnappedRef.current) {
            card4BadgeSnappedRef.current = true;
            soundSynth.playSnap(800);
          }

          const varunTypeX = card4X + 12 + Math.min(cardW - 40, card4CharCount * 6.5);
          const varunTypeY = card4Y + 34;

          agentTargets = {
            alex: {
              x: isDrawing ? card4X + drawnCard4W : card4X + cardW + 8,
              y: isDrawing ? card4Y + drawnCard4H : card4Y + 18,
              color: '#0ACF83',
              label: 'Alex Chen',
              toolKey: isDrawing ? 'R Rectangle' : 'V Move',
              cursorMode: isDrawing ? 'cross' : 'arrow',
              isDrawing: isDrawing,
              boxBounds: isDrawing ? {
                x: card4X,
                y: card4Y,
                w: drawnCard4W,
                h: drawnCard4H,
                label: `Card 04 (${Math.round(drawnCard4W)} × ${Math.round(drawnCard4H)}px)`
              } : null
            },
            varun: {
              hidden: isDrawing,
              x: varunTypeX,
              y: varunTypeY,
              color: '#A259FF',
              label: 'Varun Sehgal',
              toolKey: 'T Text',
              cursorMode: 'text'
            },
            sarah: { hidden: true, x: card3X + 40, y: card3Y + 30 },
            elena: { hidden: true, x: card3X + cardW + cardsGap / 2, y: card3Y + 20 },
            user: { hidden: true, x: curX + curW, y: curY + curH }
          };

          setWireframeData({
            type: 'window',
            x: curX,
            y: curY,
            w: curW,
            h: curH,
            heroBoxVisible: true,
            heroTypedText: 'Designing intuitive web apps & modern interfaces',
            heroBadgeVisible: true,
            ctaVisible: true,
            card1BoxVisible: true,
            card1BoxPlaced: true,
            card1TypedTitle: 'AI Interview & Prep Platform',
            card1TypedSub: 'Architected AI SaaS with Security & Grading modules',
            card1BadgesVisible: true,
            card2BoxVisible: true,
            card2BoxPlaced: true,
            card2TypedTitle: 'EventFlow: Event Ticketing SaaS',
            card2TypedSub: '4-step checkout flow cutting drop-off by 30%',
            card2BadgesVisible: true,
            card3BoxVisible: true,
            card3BoxPlaced: true,
            card3TypedTitle: 'Expensify: Budget Tracker App',
            card3TypedSub: '17+ mobile screens refined for rapid expense logging',
            card3BadgesVisible: true,
            card4BoxVisible: true,
            card4BoxActive: isDrawing,
            card4BoxPlaced: t7 > 0.4,
            card4TypedTitle: isDrawing ? '' : card4Typed,
            card4CaretVisible: !isDrawing && typeProgress < 0.95,
            card4TypedSub: typeProgress > 0.35 ? 'National hackathon ecosystem engineered for 200+ hackers' : '',
            card4BadgesVisible: typeProgress > 0.75,
            opacity: 1
          });

          setActiveGuides([
            {
              type: 'v',
              x1: card3X + cardW + cardsGap / 2,
              y1: card3Y,
              x2: card3X + cardW + cardsGap / 2,
              y2: card3Y + cardH,
              color: '#ec4899',
              dashed: true,
              label: 'ΔX: 10px',
              pillText: 'ΔX: 10px Equal Gap',
              pillX: card3X + cardW + cardsGap / 2,
              pillY: card3Y + cardH / 2
            }
          ]);
        }

        // Sub-phase 3.8: Elena & Alex Check 2x2 Auto-Layout & Reveal Real Workspace (12.4s - 14.4s)
        else {
          const t8 = Math.min(1, (pElapsed - 12.4) / 2.0);
          setStatusMessage('[3/5] Auto-Layout verified (2x2 Grid): revealing VarunOS workspace...');

          if (t8 > 0.35) {
            updateStage(3, 820); // Reveal real interactive window!
          }

          const wireframeOpacity = Math.max(0, 1 - t8 * 2.2);

          agentTargets = {
            elena: {
              x: card1X + cardW + cardsGap / 2,
              y: cardsY + cardH / 2,
              color: '#F59E0B',
              label: 'Elena Rostova',
              toolKey: 'V Move',
              cursorMode: 'arrow'
            },
            alex: {
              x: card3X + cardW + cardsGap / 2,
              y: card3Y + cardH / 2,
              color: '#0ACF83',
              label: 'Alex Chen',
              toolKey: 'V Move',
              cursorMode: 'arrow'
            },
            varun: { hidden: true, x: heroX + 220, y: heroY + 36 },
            sarah: { hidden: true, x: card1X + 40, y: card1Y + 40 },
            user: { hidden: true, x: curX + curW, y: curY + curH }
          };

          setWireframeData({
            type: 'window',
            x: curX,
            y: curY,
            w: curW,
            h: curH,
            heroBoxVisible: true,
            heroTypedText: 'Designing intuitive web apps & modern interfaces',
            heroBadgeVisible: true,
            ctaVisible: true,
            card1BoxVisible: true,
            card1BoxPlaced: true,
            card1TypedTitle: 'AI Interview & Prep Platform',
            card1TypedSub: 'Architected AI SaaS with Security & Grading modules',
            card1BadgesVisible: true,
            card2BoxVisible: true,
            card2BoxPlaced: true,
            card2TypedTitle: 'EventFlow: Event Ticketing SaaS',
            card2TypedSub: '4-step checkout flow cutting drop-off by 30%',
            card2BadgesVisible: true,
            card3BoxVisible: true,
            card3BoxPlaced: true,
            card3TypedTitle: 'Expensify: Budget Tracker App',
            card3TypedSub: '17+ mobile screens refined for rapid expense logging',
            card3BadgesVisible: true,
            card4BoxVisible: true,
            card4BoxPlaced: true,
            card4TypedTitle: 'CodeSrijan Hackathon Platform',
            card4TypedSub: 'National hackathon ecosystem engineered for 200+ hackers',
            card4BadgesVisible: true,
            opacity: wireframeOpacity
          });

          setActiveGuides([
            {
              type: 'v',
              x1: card1X + cardW + cardsGap / 2,
              y1: cardsY,
              x2: card1X + cardW + cardsGap / 2,
              y2: card3Y + cardH,
              color: '#ec4899',
              dashed: true,
              label: 'ΔX: 10px',
              pillText: 'ΔX: 10px Equal Gap',
              pillX: card1X + cardW + cardsGap / 2,
              pillY: cardsY + cardH + cardsGap / 2 - 16
            },
            {
              type: 'h',
              x1: card1X,
              y1: cardsY + cardH + cardsGap / 2,
              x2: card2X + cardW,
              y2: cardsY + cardH + cardsGap / 2,
              color: '#ec4899',
              dashed: true,
              label: 'ΔY: 10px',
              pillText: 'ΔY: 10px Equal Gap',
              pillX: card1X + cardW + cardsGap / 2,
              pillY: cardsY + cardH + cardsGap / 2 + 16
            }
          ]);
        }
      }
      // =====================================================================
      // Phase 4: Bottom macOS Dock Capsule (22.0s - 24.2s) — Alex & You
      // =====================================================================
      else if (elapsed < 24.2) {
        setStatusMessage('[4/5] Alex & You: [R] Framing Glass Dock Capsule...');
        const t = Math.min(1, Math.max(0, (elapsed - 22.0) / 2.2));
        const easedMove = easeInOutCubic(t);

        const dockSpan = lerp(80, dockTargetW, easedMove);
        const curLeft = (w - dockSpan) / 2;
        const curRight = (w + dockSpan) / 2;
        const curDockY = dockTargetY;

        // Reveal Dock smoothly right at the start of framing so it glides up into place
        if (t > 0.08) {
          updateStage(4, 880);
        }

        // Tactile snap sound when the dock capsule locks into place
        if (t > 0.55 && !dockSnappedRef.current) {
          dockSnappedRef.current = true;
          soundSynth.playSnap(680);
          triggerRipple(curLeft + 20, curDockY + 28, '#0ACF83');
          triggerRipple(curRight - 20, curDockY + 28, '#1ABCFE');
        }

        const alexArc = interpolateArc(w / 2 - 40, curDockY + 28, curLeft + 20, curDockY + 28, t, 16, 0.04);
        const userArc = interpolateArc(w / 2 + 40, curDockY + 28, curRight - 20, curDockY + 28, t, -16, 0.04);

        agentTargets = {
          alex: {
            x: alexArc.x,
            y: alexArc.y,
            color: '#0ACF83',
            label: 'Alex Chen',
            toolKey: t < 0.5 ? 'R Capsule' : null,
            cursorMode: 'cross',
            chatText: t < 0.65 ? 'framing glass dock capsule' : null,
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
            toolKey: t < 0.6 ? 'V Move' : null,
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
      // Phase 5: Built live, by a crowd of cursors! (24.2s - 26.2s) — Celebration
      // =====================================================================
      else if (elapsed < 26.2) {
        setStatusMessage('[5/5] Built live, by a crowd of cursors!');
        const t = Math.min(1, Math.max(0, (elapsed - 24.2) / 2.0));
        const centerX = w / 2;
        const centerY = h / 2;

        updateStage(5, 960); // Everything unlocked!

        agentTargets = {
          varun: {
            x: centerX - 90 + Math.sin(t * Math.PI * 2) * 20,
            y: centerY - 40,
            color: '#A259FF',
            label: 'Varun Sehgal',
            toolKey: 'V Move',
            cursorMode: 'arrow',
            chatText: '✨ Built live, by a crowd of cursors!'
          },
          user: {
            x: centerX + 90 - Math.sin(t * Math.PI * 2) * 20,
            y: centerY - 40,
            color: '#1ABCFE',
            label: userName || 'You',
            toolKey: 'V Move',
            cursorMode: 'arrow'
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
              <div className="wireframe-side-item active">
                <span className="wireframe-side-icon">❖</span>
                <span>Featured Works</span>
              </div>
              <div className="wireframe-side-item">
                <span className="wireframe-side-icon">⚡</span>
                <span>Tech Stack</span>
              </div>
              <div className="wireframe-side-item">
                <span className="wireframe-side-icon">💼</span>
                <span>Experience</span>
              </div>
              <div className="wireframe-side-item">
                <span className="wireframe-side-icon">📄</span>
                <span>Resume PDF</span>
              </div>
            </div>

            {/* Main Area Wireframe */}
            <div className="wireframe-content">
              {/* Hero Bento Box (Alex puts box, Varun types headline) */}
              {wireframeData.heroBoxVisible && (
                <div className={`wireframe-hero ${wireframeData.heroBoxActive ? 'is-active' : ''} ${wireframeData.heroBoxPlaced ? 'is-placed' : ''}`}>
                  <div className="wireframe-hero-header">
                    <span className="wireframe-role-badge">● AVAILABLE FOR NEW PRODUCT ROLES &amp; PROJECTS</span>
                    {wireframeData.heroBadgeVisible && (
                      <span className="wireframe-author-pill">Varun Sehgal</span>
                    )}
                  </div>
                  <div className="wireframe-heading">
                    {wireframeData.heroTypedText || ' '}
                    {wireframeData.heroCaretVisible && <span className="typing-cursor" />}
                  </div>
                  <div className="wireframe-hero-footer">
                    <span className="wireframe-tagline">
                      UI/UX &amp; Product Designer with 3+ years delivering high-impact SaaS &amp; AI
                    </span>
                    {wireframeData.ctaVisible && (
                      <span className="wireframe-cta-btn">Selected Highlights (4)</span>
                    )}
                  </div>
                </div>
              )}

              {/* Cards Grid */}
              <div className="wireframe-cards-grid">
                {/* Card 1: AI Interview (Elena puts box, Sarah types) */}
                {wireframeData.card1BoxVisible ? (
                  <div className={`wireframe-card ${wireframeData.card1BoxActive ? 'is-active' : ''} ${wireframeData.card1BoxPlaced ? 'is-placed' : ''}`}>
                    <div className="card-wireframe-header">
                      <span className="card-wireframe-tag">VIBECODED • AI SAAS</span>
                      <span className="card-wireframe-badge">AI Platform</span>
                    </div>
                    <div className="card-wireframe-title">
                      {wireframeData.card1TypedTitle || ' '}
                      {wireframeData.card1CaretVisible && <span className="typing-cursor" />}
                    </div>
                    <div className="card-wireframe-desc">
                      {wireframeData.card1TypedSub || ' '}
                    </div>
                    {wireframeData.card1BadgesVisible && (
                      <div className="card-wireframe-tags">
                        <span className="tag-pill">Figma</span>
                        <span className="tag-pill">SaaS</span>
                        <span className="tag-pill">AI UX</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="wireframe-card-placeholder" />
                )}

                {/* Card 2: EventFlow (Alex puts box, Varun types) */}
                {wireframeData.card2BoxVisible ? (
                  <div className={`wireframe-card ${wireframeData.card2BoxActive ? 'is-active' : ''} ${wireframeData.card2BoxPlaced ? 'is-placed' : ''}`}>
                    <div className="card-wireframe-header">
                      <span className="card-wireframe-tag highlight">DESIGN SYSTEM • WEB SAAS</span>
                      <span className="card-wireframe-badge">30% Less Dropoff</span>
                    </div>
                    <div className="card-wireframe-title">
                      {wireframeData.card2TypedTitle || ' '}
                      {wireframeData.card2CaretVisible && <span className="typing-cursor" />}
                    </div>
                    <div className="card-wireframe-desc">
                      {wireframeData.card2TypedSub || ' '}
                    </div>
                    {wireframeData.card2BadgesVisible && (
                      <div className="card-wireframe-tags">
                        <span className="tag-pill">Design System</span>
                        <span className="tag-pill">Figma</span>
                        <span className="tag-pill">Checkout UX</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="wireframe-card-placeholder" />
                )}

                {/* Card 3: Expensify (Elena puts box, Sarah types) */}
                {wireframeData.card3BoxVisible ? (
                  <div className={`wireframe-card ${wireframeData.card3BoxActive ? 'is-active' : ''} ${wireframeData.card3BoxPlaced ? 'is-placed' : ''}`}>
                    <div className="card-wireframe-header">
                      <span className="card-wireframe-tag">MOBILE UX • FINTECH</span>
                      <span className="card-wireframe-badge">Fintech</span>
                    </div>
                    <div className="card-wireframe-title">
                      {wireframeData.card3TypedTitle || ' '}
                      {wireframeData.card3CaretVisible && <span className="typing-cursor" />}
                    </div>
                    <div className="card-wireframe-desc">
                      {wireframeData.card3TypedSub || ' '}
                    </div>
                    {wireframeData.card3BadgesVisible && (
                      <div className="card-wireframe-tags">
                        <span className="tag-pill">Mobile UX</span>
                        <span className="tag-pill">Fintech</span>
                        <span className="tag-pill">Micro-interactions</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="wireframe-card-placeholder" />
                )}

                {/* Card 4: CodeSrijan (Alex puts box, Varun types) */}
                {wireframeData.card4BoxVisible ? (
                  <div className={`wireframe-card ${wireframeData.card4BoxActive ? 'is-active' : ''} ${wireframeData.card4BoxPlaced ? 'is-placed' : ''}`}>
                    <div className="card-wireframe-header">
                      <span className="card-wireframe-tag highlight">VIBECODED • VERCEL LIVE</span>
                      <span className="card-wireframe-badge">Next.js</span>
                    </div>
                    <div className="card-wireframe-title">
                      {wireframeData.card4TypedTitle || ' '}
                      {wireframeData.card4CaretVisible && <span className="typing-cursor" />}
                    </div>
                    <div className="card-wireframe-desc">
                      {wireframeData.card4TypedSub || ' '}
                    </div>
                    {wireframeData.card4BadgesVisible && (
                      <div className="card-wireframe-tags">
                        <span className="tag-pill">Vibecoded</span>
                        <span className="tag-pill">Next.js</span>
                        <span className="tag-pill">Vercel Live</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="wireframe-card-placeholder" />
                )}
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
            toolKey={cursor.toolKey}
            cursorMode={cursor.cursorMode}
            isClicking={cursor.isClicking}
            chatText={cursor.chatText}
            trail={cursor.trail}
          />
        );
      })}
    </div>
  );
};

export default SwarmRebuildOverlay;
