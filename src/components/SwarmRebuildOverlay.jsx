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
  const lastStampedDockIndexRef = useRef(-1);
  const wallpaperSnappedRef = useRef(false);
  const menubarSnappedRef = useRef(false);
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

  const lastFinderStepRef = useRef(-1);
  const dispatchFinderStep = (step) => {
    if (lastFinderStepRef.current !== step) {
      lastFinderStepRef.current = step;
      if (typeof window !== 'undefined') {
        window.__varunos_finder_step = step;
        window.dispatchEvent(new CustomEvent('varunos-swarm-finder-step', { detail: { step } }));
      }
    }
  };

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
    dispatchFinderStep(7);
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
    wallpaperSnappedRef.current = false;
    menubarSnappedRef.current = false;
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
    lastStampedDockIndexRef.current = -1;
    lastFinderStepRef.current = -1;
    dispatchFinderStep(0);

    // Reset desktop icon & dock reveal counts to 0 at start of rebuild
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('varunos-swarm-icon-stamped', { detail: { count: 0 } }));
      window.dispatchEvent(new CustomEvent('varunos-swarm-dock-stamped', { detail: { count: 0 } }));
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
      const DOCK_CLEARANCE = 86;
      const MENUBAR_HEIGHT = 28;
      const availableH = Math.max(300, h - MENUBAR_HEIGHT - DOCK_CLEARANCE);
      const availableW = Math.max(400, w);
      const winTargetW = Math.min(availableW - 80, 920);
      const winTargetH = Math.min(availableH - 20, 560);
      const winTargetX = Math.max(10, Math.round((w - winTargetW) / 2));
      const winTargetY = Math.max(MENUBAR_HEIGHT + 10, Math.round(MENUBAR_HEIGHT + (availableH - winTargetH) / 2));

      const dockTargetW = Math.min(480, w - 40);
      const dockTargetX = (w - dockTargetW) / 2;
      const dockTargetY = h - 68;

      let agentTargets = {};

      // =====================================================================
      // Phase 1: Wallpaper Stamping & Backdrop Extrusion (0.0s - 3.4s) — Elena & Varun
      // =====================================================================
      if (elapsed < 3.4) {
        setStatusMessage('[1/5] Elena & Varun: Stamping Wallpaper Backdrop (100vw × 100vh)...');
        const t = Math.min(1, Math.max(0, elapsed / 3.4));

        if (t > 0.35) {
          updateStage(1, 580); // Reveal real wallpaper in Desktop.jsx
        }

        if (t > 0.65 && !wallpaperSnappedRef.current) {
          wallpaperSnappedRef.current = true;
          soundSynth.playSnap(580);
          triggerRipple(w / 2, h / 2, '#A259FF');
          triggerRipple(40, 40, '#0D99FF');
          triggerRipple(w - 40, h - 40, '#EC4899');
        }

        const drawnW = lerp(80, w, easeInOutCubic(t));
        const drawnH = lerp(60, h, easeInOutCubic(t));
        const elenaArc = interpolateArc(40, 40, drawnW - 20, drawnH - 20, t, 18, 0.03);
        const varunArc = interpolateArc(w / 2 - 60, h / 2 - 40, w / 2 + 60, h / 2 - 20, t, -16, 0.03);

        agentTargets = {
          elena: {
            x: elenaArc.x,
            y: elenaArc.y,
            color: '#0D99FF',
            label: 'Elena Rostova',
            action: 'Dragging Backdrop Canvas (100vw × 100vh)',
            toolKey: 'R Rectangle',
            cursorMode: 'cross',
            isDrawing: true,
            chatText: t > 0.25 && t < 0.85 ? 'stamping wallpaper canvas' : null,
            boxBounds: {
              x: 0,
              y: 0,
              w: drawnW,
              h: drawnH,
              label: `Desktop Canvas • ${Math.round(drawnW)} × ${Math.round(drawnH)}px`
            }
          },
          varun: {
            x: varunArc.x,
            y: varunArc.y,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Applying Wallpaper: Anime Room (Crystal HD)',
            toolKey: 'V Move',
            cursorMode: 'arrow',
            chatText: t > 0.4 && t < 0.95 ? 'applying wallpaper' : null
          },
          sarah: { hidden: true, x: 56, y: 48 },
          alex: { hidden: true, x: w / 2, y: 28 },
          user: { hidden: true, x: w - 80, y: 20 }
        };

        setWireframeData(null);

        setActiveGuides([
          {
            type: 'h',
            x1: 0,
            y1: drawnH,
            x2: w,
            y2: drawnH,
            color: '#ec4899',
            dashed: true,
            label: '100vh Baseline',
            pillText: `H: ${Math.round(drawnH)}px`,
            pillX: w / 2,
            pillY: drawnH - 12
          }
        ]);
      }
      // =====================================================================
      // Phase 2: Top MenuBar Extrusion & Apple Tray (3.4s - 6.6s) — Alex & Elena
      // =====================================================================
      else if (elapsed < 6.6) {
        setStatusMessage('[2/5] Alex & Elena: Extruding MenuBar Frame & Status Bar...');
        const t = Math.min(1, Math.max(0, (elapsed - 3.4) / 3.2));

        if (t > 0.35) {
          updateStage(2, 680); // Reveal MenuBar in Desktop.jsx
        }

        if (t > 0.65 && !menubarSnappedRef.current) {
          menubarSnappedRef.current = true;
          soundSynth.playSnap(680);
          triggerRipple(40, 14, '#10B981');
          triggerRipple(w - 120, 14, '#0D99FF');
        }

        const menuDrawnW = lerp(60, w, easeInOutCubic(t));
        const alexArc = interpolateArc(40, 14, menuDrawnW - 20, 14, t, 12, 0.03);
        const elenaArc = interpolateArc(w - 40, 20, w - 180, 14, Math.min(1, Math.max(0, (t - 0.2) / 0.8)), -10, 0.03);

        agentTargets = {
          alex: {
            x: alexArc.x,
            y: alexArc.y,
            color: '#10B981',
            label: 'Alex Chen',
            action: 'Extruding MenuBar Frame (100vw × 28px)',
            toolKey: 'F Frame',
            cursorMode: 'cross',
            isDrawing: true,
            chatText: t > 0.25 && t < 0.85 ? 'extruding top bar' : null,
            boxBounds: {
              x: 0,
              y: 0,
              w: menuDrawnW,
              h: 28,
              label: `MenuBar • ${Math.round(menuDrawnW)} × 28px • Blur(24px)`
            }
          },
          elena: {
            x: elenaArc.x,
            y: elenaArc.y,
            color: '#0D99FF',
            label: 'Elena Rostova',
            action: 'Mounting Traffic Lights & Apple Brand Menu',
            toolKey: 'V Move',
            cursorMode: 'arrow',
            chatText: t > 0.45 && t < 0.95 ? 'aligning status tray' : null
          },
          sarah: { hidden: true, x: 56, y: 48 },
          varun: { hidden: true, x: w / 2, y: h / 2 },
          user: { hidden: true, x: w - 80, y: 20 }
        };

        setWireframeData(null);

        setActiveGuides([
          {
            type: 'h',
            x1: 0,
            y1: 28,
            x2: menuDrawnW,
            y2: 28,
            color: '#ec4899',
            dashed: true,
            label: 'Y: 28px Baseline',
            pillText: 'Y: 28px Baseline',
            pillX: menuDrawnW / 2,
            pillY: 28
          }
        ]);
      }
      // =====================================================================
      // Phase 3: Desktop App Icons Stamping (6.6s - 12.2s) — Sarah Lin (NO EXTRA NAME!)
      // =====================================================================
      else if (elapsed < 12.2) {
        setStatusMessage('[3/5] Sarah Lin: Stamping Desktop App Icons (1-by-1)...');
        const t = Math.min(1, Math.max(0, (elapsed - 6.6) / 5.6));

        if (t > 0.05) {
          updateStage(3, 740); // Reveal Desktop Icons container in Desktop.jsx
        }

        const iconNames = ['Figma', 'VS Code', 'Resume.pdf', 'Contact', 'Buy Me a Coffee', 'Trash'];
        const iconYPositions = [48, 126, 204, 282, 360, 438];
        const totalIcons = 6;
        const iconFloat = t * totalIcons;
        const iconIndex = Math.min(5, Math.floor(iconFloat));
        const subProgress = iconFloat - iconIndex;

        const prevY = iconIndex === 0 ? 48 : iconYPositions[iconIndex - 1];
        const nextY = iconYPositions[iconIndex];
        const sarahPos = interpolateArc(56, prevY, 56, nextY, subProgress, -16, 0.05);

        const isSarahClicking = subProgress > 0.72 && subProgress < 0.95;

        if (lastStampedIndexRef.current !== iconIndex) {
          lastStampedIndexRef.current = iconIndex;
          soundSynth.playDropThump(220 + iconIndex * 28);
          triggerRipple(56, iconYPositions[iconIndex] + 20, '#FF7262');
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('varunos-swarm-icon-stamped', { detail: { count: iconIndex + 1 } }));
          }
        }

        // ONLY Sarah Lin is visible! (Elena is hidden -> removes extra name!)
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
            chatText: t < 0.85 ? 'stamping desktop apps (⌥ dup)' : null,
            dupBadge: `⌥ Duplicate +${iconIndex + 1}`,
            boxBounds: {
              x: 20,
              y: iconYPositions[iconIndex],
              w: 72,
              h: 70
              // NOTE: NO bottom label like "Trash" -> removes extra name clutter!
            }
          },
          elena: { hidden: true, x: 142, y: sarahPos.y - 14 },
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
          { type: 'v', x1: 92, y1: 40, x2: 92, y2: 510, color: '#ec4899', dashed: true, label: 'W: 72px' },
          ...(iconIndex > 0 ? [{
            type: 'v',
            x1: 142,
            y1: prevIconY + 70,
            x2: 142,
            y2: currentIconY,
            color: '#ec4899',
            dashed: false,
            label: 'ΔY: 78px',
            pillText: 'ΔY: 78px Equal Spacing',
            pillX: 142,
            pillY: gapMidY
          }] : [])
        ]);
      }
      // =====================================================================
      // Phase 4: Bottom Bar (Dock) & Dock Apps (12.2s - 19.5s)
      // 4A: Frame Glass Dock Capsule (12.2s - 15.0s) — Alex & Varun
      // 4B: Stamp Dock Apps 1-by-1 (15.0s - 19.5s) — Sarah Lin
      // =====================================================================
      else if (elapsed < 19.5) {
        const pDock = elapsed - 12.2;

        // Sub-phase 4A: The Bar of the Bottom (12.2s - 15.0s)
        if (pDock < 2.8) {
          setStatusMessage('[4/5] Alex & Varun: [R] Framing Glass Dock Capsule...');
          const tA = Math.min(1, Math.max(0, pDock / 2.8));
          const easedMove = easeInOutCubic(tA);

          const dockSpan = lerp(60, dockTargetW, easedMove);
          const curLeft = (w - dockSpan) / 2;
          const curRight = (w + dockSpan) / 2;
          const curDockY = dockTargetY;

          // Reveal Dock capsule smoothly so it glides up
          if (tA > 0.15) {
            updateStage(4, 680);
          }

          if (tA > 0.65 && !dockSnappedRef.current) {
            dockSnappedRef.current = true;
            soundSynth.playSnap(680);
            triggerRipple(curLeft + 20, curDockY + 28, '#0ACF83');
            triggerRipple(curRight - 20, curDockY + 28, '#A259FF');
          }

          const alexArc = interpolateArc(w / 2 - 40, curDockY + 28, curLeft + 20, curDockY + 28, tA, 16, 0.04);
          const varunArc = interpolateArc(w / 2 + 40, curDockY + 28, curRight - 20, curDockY + 28, tA, -16, 0.04);

          agentTargets = {
            alex: {
              x: alexArc.x,
              y: alexArc.y,
              color: '#0ACF83',
              label: 'Alex Chen',
              action: 'Extruding Glass Dock Capsule',
              toolKey: 'R Capsule',
              cursorMode: 'cross',
              chatText: tA < 0.7 ? 'framing glass dock capsule' : null,
              isDrawing: true,
              boxBounds: {
                x: curLeft,
                y: curDockY,
                w: dockSpan,
                h: 56,
                label: `macOS Glass Dock • ${Math.round(dockSpan)} × 56px`
              }
            },
            varun: {
              x: varunArc.x,
              y: varunArc.y,
              color: '#A259FF',
              label: 'Varun Sehgal',
              action: 'Applying Frosted Blur(24px) & Border Scrim',
              toolKey: 'V Move',
              cursorMode: 'arrow',
              chatText: tA > 0.35 && tA < 0.85 ? 'applying glass styling' : null
            },
            sarah: { hidden: true, x: curLeft, y: curDockY + 28 },
            user: { hidden: true, x: curRight, y: curDockY + 28 },
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
        // Sub-phase 4B: The Apps of the Bottom (15.0s - 19.5s) — Sarah Lin (4.5s for 9 apps)
        else {
          setStatusMessage('[4/5] Sarah Lin: Stamping Dock App Icons (1-by-1)...');
          const tB = Math.min(1, Math.max(0, (pDock - 2.8) / 4.5));

          const dockAppNames = ['Finder', 'VS Code', 'Figma', 'Terminal', 'Resume', 'Contact', 'Settings', 'Buy Me a Coffee', 'Trash'];
          const totalDockApps = 9;
          const dockFloat = tB * totalDockApps;
          const dockIndex = Math.min(8, Math.floor(dockFloat));
          const subProgress = dockFloat - dockIndex;

          const ICON_SIZE = 44;
          const DOCK_GAP = 12;
          const DOCK_PAD_LEFT = 16;
          const curDockLeft = (w - dockTargetW) / 2;
          const curDockY = dockTargetY;

          const getDockItemX = (idx) => {
            if (idx < 7) {
              return curDockLeft + DOCK_PAD_LEFT + idx * (ICON_SIZE + DOCK_GAP) + ICON_SIZE / 2;
            }
            return curDockLeft + DOCK_PAD_LEFT + idx * (ICON_SIZE + DOCK_GAP) + 17 + ICON_SIZE / 2;
          };

          const prevItemX = dockIndex === 0 ? getDockItemX(0) : getDockItemX(dockIndex - 1);
          const nextItemX = getDockItemX(dockIndex);
          const sarahPos = interpolateArc(prevItemX, curDockY + 28, nextItemX, curDockY + 28, subProgress, -18, 0.04);

          const isClicking = subProgress > 0.65 && subProgress < 0.95;

          if (lastStampedDockIndexRef.current !== dockIndex) {
            lastStampedDockIndexRef.current = dockIndex;
            soundSynth.playDropThump(280 + dockIndex * 22);
            triggerRipple(nextItemX, curDockY + 28, '#FF7262');
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('varunos-swarm-dock-stamped', { detail: { count: dockIndex + 1 } }));
            }
          }

          agentTargets = {
            sarah: {
              x: sarahPos.x,
              y: sarahPos.y,
              color: '#FF7262',
              label: 'Sarah Lin',
              action: `Stamping Dock App: ${dockAppNames[dockIndex]}`,
              toolKey: '⌥ Option',
              cursorMode: 'arrow',
              isClicking: isClicking,
              isDrawing: true,
              chatText: tB < 0.85 ? 'stamping dock apps' : null,
              boxBounds: {
                x: nextItemX - ICON_SIZE / 2,
                y: curDockY + 6,
                w: ICON_SIZE,
                h: ICON_SIZE
              }
            },
            alex: { hidden: true, x: curDockLeft, y: curDockY + 28 },
            varun: { hidden: true, x: curDockLeft + dockTargetW, y: curDockY + 28 },
            user: { hidden: true, x: w / 2, y: curDockY },
            elena: { hidden: true, x: w / 2, y: curDockY }
          };

          setWireframeData(null);

          setActiveGuides([
            {
              type: 'h',
              x1: curDockLeft,
              y1: curDockY + 28,
              x2: curDockLeft + dockTargetW,
              y2: curDockY + 28,
              color: '#ec4899',
              dashed: true,
              label: 'Dock Centerline',
              pillText: `${dockAppNames[dockIndex]} (${dockIndex + 1}/9)`,
              pillX: nextItemX,
              pillY: curDockY - 14
            }
          ]);
        }
      }
      // =====================================================================
      // Phase 5: Center Box (Finder Portfolio Window & 2x2 Project Grid) (19.5s - 40.5s)
      // Unhurried, deliberate assembly right over the real window:
      // 5.1 (19.5s - 22.5s): Alex Chen extrudes outer Window Frame Box (3.0s) -> step 0
      // 5.2 (22.5s - 25.5s): Elena Rostova drafts Sidebar Navigation (3.0s) -> step 1
      // 5.3 (25.5s - 28.5s): Varun Sehgal styles Hero Bento Banner (3.0s) -> step 2
      // 5.4 (28.5s - 31.0s): Sarah Lin crafts Card 01 - AI Interview (2.5s) -> step 3
      // 5.5 (31.0s - 33.5s): Alex Chen crafts Card 02 - EventFlow SaaS (2.5s) -> step 4
      // 5.6 (33.5s - 36.0s): Elena Rostova crafts Card 03 - Expensify Budget (2.5s) -> step 5
      // 5.7 (36.0s - 38.5s): Varun Sehgal crafts Card 04 - CodeSrijan Hackathon (2.5s) -> step 6
      // 5.8 (38.5s - 40.5s): Swarm Final Verification & Celebration (2.0s) -> step 7
      // =====================================================================
      else if (elapsed < 40.5) {
        const pWin = elapsed - 19.5;

        // Reveal the real Finder window outer layer directly in Stage 5 so the swarm builds ON TOP of the real window
        updateStage(5, 780);

        const curW = winTargetW;
        const curH = winTargetH;
        const curX = winTargetX;
        const curY = winTargetY;

        const sidebarW = 200; // Matches .finder-sidebar width: 200px
        const headerH = 38;
        const contentX = curX + sidebarW;
        const contentY = curY + headerH;
        const contentW = curW - sidebarW;

        const heroX = contentX + 16;
        const heroY = contentY + 16;
        const heroW = contentW - 32;
        const heroH = 110;

        const cardsGap = 14;
        const cardsY = heroY + heroH + 34; // Accounts for .finder-section-header
        const cardW = Math.floor((contentW - 32 - cardsGap) / 2);
        const cardH = 135;

        const card1X = contentX + 16;
        const card1Y = cardsY;
        const card2X = card1X + cardW + cardsGap;
        const card2Y = cardsY;
        const card3X = contentX + 16;
        const card3Y = cardsY + cardH + cardsGap;
        const card4X = card1X + cardW + cardsGap;
        const card4Y = cardsY + cardH + cardsGap;

        // 5.1: Alex Chen Extrudes Outer Window Frame Box (19.5s - 22.5s) -> Step 0
        if (pWin < 3.0) {
          dispatchFinderStep(0);
          setStatusMessage('[5/5] Alex Chen: [F] Extruding Window Frame Box (920 × 560px)...');
          const t1 = Math.min(1, pWin / 3.0);
          const drawnW = lerp(120, winTargetW, easeInOutCubic(t1));
          const drawnH = lerp(80, winTargetH, easeInOutCubic(t1));
          const alexArc = interpolateArc(curX + 120, curY + 80, curX + drawnW, curY + drawnH, t1, 14, 0.03);

          agentTargets = {
            alex: {
              x: alexArc.x,
              y: alexArc.y,
              color: '#0ACF83',
              label: 'Alex Chen',
              toolKey: 'F Frame',
              cursorMode: 'resize',
              isDrawing: true,
              chatText: t1 < 0.75 ? 'extruding window frame' : null,
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

          setWireframeData(null);

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
        // 5.2: Elena Rostova Drafts Sidebar Navigation (22.5s - 25.5s) -> Step 1
        else if (pWin < 6.0) {
          dispatchFinderStep(1);
          setStatusMessage('[5/5] Elena Rostova: Drafting Sidebar Navigation & Tags...');
          const t2 = Math.min(1, (pWin - 3.0) / 3.0);
          const drawnSideH = lerp(60, curH - headerH, easeInOutCubic(t2));
          const elenaArc = interpolateArc(curX + sidebarW, curY + headerH, curX + sidebarW, curY + headerH + drawnSideH, t2, 12, 0.03);

          if (t2 > 0.85 && !heroCtaSnappedRef.current) {
            heroCtaSnappedRef.current = true;
            soundSynth.playSnap(720);
            triggerRipple(curX + sidebarW / 2, curY + 120, '#0D99FF');
          }

          agentTargets = {
            elena: {
              x: elenaArc.x,
              y: elenaArc.y,
              color: '#0D99FF',
              label: 'Elena Rostova',
              toolKey: 'V Move',
              cursorMode: 'arrow',
              isDrawing: true,
              chatText: t2 < 0.8 ? 'drafting sidebar layout' : null,
              boxBounds: {
                x: curX,
                y: curY + headerH,
                w: sidebarW,
                h: drawnSideH,
                label: 'Sidebar Auto-Layout: 200px'
              }
            },
            varun: { hidden: true, x: heroX + 40, y: heroY + 30 },
            alex: { hidden: true, x: curX + curW, y: curY + curH },
            sarah: { hidden: true, x: card1X, y: card1Y },
            user: { hidden: true, x: curX + curW, y: curY + curH }
          };

          setWireframeData(null);

          setActiveGuides([
            {
              type: 'v',
              x1: curX + sidebarW,
              y1: curY + headerH,
              x2: curX + sidebarW,
              y2: curY + curH,
              color: '#ec4899',
              dashed: true,
              label: 'Sidebar 200px',
              pillText: 'Sidebar: 200px',
              pillX: curX + sidebarW,
              pillY: curY + 120
            }
          ]);
        }
        // 5.3: Varun Sehgal Styles Hero Bento Banner (25.5s - 28.5s) -> Step 2
        else if (pWin < 9.0) {
          dispatchFinderStep(2);
          setStatusMessage('[5/5] Varun Sehgal: [T] Styling Hero Headline & Badges...');
          const t3 = Math.min(1, (pWin - 6.0) / 3.0);
          const drawnHeroW = lerp(60, heroW, easeInOutCubic(t3));
          const varunArc = interpolateArc(heroX, heroY + 28, heroX + drawnHeroW, heroY + 28, t3, -12, 0.03);

          if (t3 > 0.85 && !heroBoxPlacedRef.current) {
            heroBoxPlacedRef.current = true;
            soundSynth.playDropThump(220);
            triggerRipple(heroX + heroW / 2, heroY + heroH / 2, '#A259FF');
          }

          agentTargets = {
            varun: {
              x: varunArc.x,
              y: varunArc.y,
              color: '#A259FF',
              label: 'Varun Sehgal',
              action: 'Styling Hero Bento Banner',
              toolKey: 'T Text',
              cursorMode: 'text',
              isDrawing: true,
              chatText: t3 < 0.85 ? 'styling hero headline & badges' : null,
              boxBounds: {
                x: heroX,
                y: heroY,
                w: drawnHeroW,
                h: heroH,
                label: 'Hero Bento Box • Headline & Role'
              }
            },
            elena: { hidden: true, x: curX + sidebarW, y: curY + 100 },
            alex: { hidden: true, x: card2X, y: card2Y },
            sarah: { hidden: true, x: card1X, y: card1Y },
            user: { hidden: true, x: curX + curW, y: curY + curH }
          };

          setWireframeData(null);

          setActiveGuides([
            {
              type: 'h',
              x1: heroX,
              y1: heroY + heroH,
              x2: heroX + heroW,
              y2: heroY + heroH,
              color: '#ec4899',
              dashed: true,
              label: 'Hero Bento Baseline',
              pillText: 'Hero: 110px',
              pillX: heroX + heroW / 2,
              pillY: heroY + heroH - 12
            }
          ]);
        }
        // 5.4: Sarah Lin Crafts Card 01 - AI Interview (28.5s - 31.0s) -> Step 3
        else if (pWin < 11.5) {
          dispatchFinderStep(3);
          setStatusMessage('[5/5] Sarah Lin: [R] Box + [T] AI Interview & Prep Platform...');
          const t4 = Math.min(1, (pWin - 9.0) / 2.5);
          const drawnW1 = lerp(40, cardW, easeInOutCubic(t4));
          const drawnH1 = lerp(30, cardH, easeInOutCubic(t4));
          const sarahArc = interpolateArc(card1X, card1Y, card1X + drawnW1, card1Y + drawnH1, t4, 14, 0.04);

          if (t4 > 0.85 && !card1PlacedRef.current) {
            card1PlacedRef.current = true;
            soundSynth.playDropThump(240);
            triggerRipple(card1X + cardW / 2, card1Y + cardH / 2, '#FF7262');
          }

          agentTargets = {
            sarah: {
              x: sarahArc.x,
              y: sarahArc.y,
              color: '#FF7262',
              label: 'Sarah Lin',
              action: 'Card 01: AI Interview & Prep',
              toolKey: 'R Rectangle',
              cursorMode: 'cross',
              isDrawing: true,
              chatText: t4 < 0.85 ? 'crafting Card 01 (AI Interview)' : null,
              boxBounds: {
                x: card1X,
                y: card1Y,
                w: drawnW1,
                h: drawnH1,
                label: `Card 01 (${Math.round(drawnW1)} × ${Math.round(drawnH1)}px)`
              }
            },
            alex: { hidden: true, x: card2X, y: card2Y },
            varun: { hidden: true, x: heroX, y: heroY },
            elena: { hidden: true, x: card3X, y: card3Y },
            user: { hidden: true, x: curX + curW, y: curY + curH }
          };

          setWireframeData(null);

          setActiveGuides([
            {
              type: 'h',
              x1: card1X,
              y1: card1Y,
              x2: card1X + drawnW1,
              y2: card1Y,
              color: '#FF7262',
              dashed: true,
              label: 'Card 01 Bounds',
              pillText: `Card 01: ${Math.round(drawnW1)} × ${Math.round(drawnH1)}px`,
              pillX: card1X + drawnW1 / 2,
              pillY: card1Y - 12
            }
          ]);
        }
        // 5.5: Alex Chen Crafts Card 02 - EventFlow SaaS (31.0s - 33.5s) -> Step 4
        else if (pWin < 14.0) {
          dispatchFinderStep(4);
          setStatusMessage('[5/5] Alex Chen: [R] Box + [T] EventFlow Ticketing SaaS...');
          const t5 = Math.min(1, (pWin - 11.5) / 2.5);
          const drawnW2 = lerp(40, cardW, easeInOutCubic(t5));
          const drawnH2 = lerp(30, cardH, easeInOutCubic(t5));
          const alexArc = interpolateArc(card2X, card2Y, card2X + drawnW2, card2Y + drawnH2, t5, 14, 0.04);

          if (t5 > 0.85 && !card2PlacedRef.current) {
            card2PlacedRef.current = true;
            soundSynth.playDropThump(260);
            triggerRipple(card2X + cardW / 2, card2Y + cardH / 2, '#0ACF83');
          }

          agentTargets = {
            alex: {
              x: alexArc.x,
              y: alexArc.y,
              color: '#0ACF83',
              label: 'Alex Chen',
              action: 'Card 02: EventFlow SaaS',
              toolKey: 'R Rectangle',
              cursorMode: 'cross',
              isDrawing: true,
              chatText: t5 < 0.85 ? 'crafting Card 02 (EventFlow)' : null,
              boxBounds: {
                x: card2X,
                y: card2Y,
                w: drawnW2,
                h: drawnH2,
                label: `Card 02 (${Math.round(drawnW2)} × ${Math.round(drawnH2)}px)`
              }
            },
            sarah: { hidden: true, x: card1X + cardW, y: card1Y },
            varun: { hidden: true, x: heroX, y: heroY },
            elena: { hidden: true, x: card3X, y: card3Y },
            user: { hidden: true, x: curX + curW, y: curY + curH }
          };

          setWireframeData(null);

          setActiveGuides([
            {
              type: 'v',
              x1: card1X + cardW + cardsGap / 2,
              y1: card1Y,
              x2: card1X + cardW + cardsGap / 2,
              y2: card1Y + cardH,
              color: '#ec4899',
              dashed: true,
              label: 'ΔX: 14px',
              pillText: 'ΔX: 14px Equal Gap',
              pillX: card1X + cardW + cardsGap / 2,
              pillY: card1Y + cardH / 2
            }
          ]);
        }
        // 5.6: Elena Rostova Crafts Card 03 - Expensify Budget (33.5s - 36.0s) -> Step 5
        else if (pWin < 16.5) {
          dispatchFinderStep(5);
          setStatusMessage('[5/5] Elena Rostova: [R] Box + [T] Expensify Budget App...');
          const t6 = Math.min(1, (pWin - 14.0) / 2.5);
          const drawnW3 = lerp(40, cardW, easeInOutCubic(t6));
          const drawnH3 = lerp(30, cardH, easeInOutCubic(t6));
          const elenaArc = interpolateArc(card3X, card3Y, card3X + drawnW3, card3Y + drawnH3, t6, 14, 0.04);

          if (t6 > 0.85 && !card3PlacedRef.current) {
            card3PlacedRef.current = true;
            soundSynth.playDropThump(275);
            triggerRipple(card3X + cardW / 2, card3Y + cardH / 2, '#0D99FF');
          }

          agentTargets = {
            elena: {
              x: elenaArc.x,
              y: elenaArc.y,
              color: '#0D99FF',
              label: 'Elena Rostova',
              action: 'Card 03: Expensify Budget',
              toolKey: 'R Rectangle',
              cursorMode: 'cross',
              isDrawing: true,
              chatText: t6 < 0.85 ? 'crafting Card 03 (Expensify)' : null,
              boxBounds: {
                x: card3X,
                y: card3Y,
                w: drawnW3,
                h: drawnH3,
                label: `Card 03 (${Math.round(drawnW3)} × ${Math.round(drawnH3)}px)`
              }
            },
            alex: { hidden: true, x: card4X, y: card4Y },
            varun: { hidden: true, x: heroX, y: heroY },
            sarah: { hidden: true, x: card1X, y: card1Y },
            user: { hidden: true, x: curX + curW, y: curY + curH }
          };

          setWireframeData(null);

          setActiveGuides([
            {
              type: 'h',
              x1: card1X,
              y1: card1Y + cardH + cardsGap / 2,
              x2: card1X + cardW,
              y2: card1Y + cardH + cardsGap / 2,
              color: '#ec4899',
              dashed: true,
              label: 'ΔY: 14px',
              pillText: 'ΔY: 14px Equal Gap',
              pillX: card1X + cardW / 2,
              pillY: card1Y + cardH + cardsGap / 2
            }
          ]);
        }
        // 5.7: Varun Sehgal Crafts Card 04 - CodeSrijan Hackathon (36.0s - 38.5s) -> Step 6
        else if (pWin < 19.0) {
          dispatchFinderStep(6);
          setStatusMessage('[5/5] Varun Sehgal: [R] Box + [T] CodeSrijan Hackathon...');
          const t7 = Math.min(1, (pWin - 16.5) / 2.5);
          const drawnW4 = lerp(40, cardW, easeInOutCubic(t7));
          const drawnH4 = lerp(30, cardH, easeInOutCubic(t7));
          const varunArc = interpolateArc(card4X, card4Y, card4X + drawnW4, card4Y + drawnH4, t7, 14, 0.04);

          if (t7 > 0.85 && !card4PlacedRef.current) {
            card4PlacedRef.current = true;
            soundSynth.playDropThump(295);
            triggerRipple(card4X + cardW / 2, card4Y + cardH / 2, '#A259FF');
          }

          agentTargets = {
            varun: {
              x: varunArc.x,
              y: varunArc.y,
              color: '#A259FF',
              label: 'Varun Sehgal',
              action: 'Card 04: CodeSrijan Hackathon',
              toolKey: 'R Rectangle',
              cursorMode: 'cross',
              isDrawing: true,
              chatText: t7 < 0.85 ? 'crafting Card 04 (CodeSrijan)' : null,
              boxBounds: {
                x: card4X,
                y: card4Y,
                w: drawnW4,
                h: drawnH4,
                label: `Card 04 (${Math.round(drawnW4)} × ${Math.round(drawnH4)}px)`
              }
            },
            alex: { hidden: true, x: card2X, y: card2Y },
            elena: { hidden: true, x: card3X, y: card3Y },
            sarah: { hidden: true, x: card1X, y: card1Y },
            user: { hidden: true, x: curX + curW, y: curY + curH }
          };

          setWireframeData(null);

          setActiveGuides([
            {
              type: 'v',
              x1: card3X + cardW + cardsGap / 2,
              y1: card3Y,
              x2: card3X + cardW + cardsGap / 2,
              y2: card3Y + cardH,
              color: '#ec4899',
              dashed: true,
              label: 'ΔX: 14px',
              pillText: 'ΔX: 14px Equal Gap',
              pillX: card3X + cardW + cardsGap / 2,
              pillY: card3Y + cardH / 2
            }
          ]);
        }
        // 5.8: Auto-Layout Verification & Celebration (38.5s - 40.5s) -> Step 7
        else {
          dispatchFinderStep(7);
          setStatusMessage('[5/5] Auto-Layout Verified ✓ 2×2 Project Grid Complete!');
          const t8 = Math.min(1, (pWin - 19.0) / 2.0);

          agentTargets = {
            elena: {
              x: card1X + cardW + cardsGap / 2,
              y: cardsY + cardH / 2,
              color: '#0D99FF',
              label: 'Elena Rostova',
              action: 'Auto-Layout Verified ✓',
              toolKey: 'V Move',
              cursorMode: 'arrow',
              chatText: '2x2 grid verified ✓'
            },
            alex: {
              x: card3X + cardW + cardsGap / 2,
              y: card3Y + cardH / 2,
              color: '#0ACF83',
              label: 'Alex Chen',
              action: '14px Gap Verified ✓',
              toolKey: 'V Move',
              cursorMode: 'arrow',
              chatText: 'equal spacing locked'
            },
            varun: {
              x: heroX + heroW / 2,
              y: heroY + heroH / 2,
              color: '#A259FF',
              label: 'Varun Sehgal',
              action: 'Lead Architect',
              cursorMode: 'arrow',
              chatText: '✨ Built live, by a crowd of cursors!'
            },
            sarah: {
              x: 56,
              y: 438,
              color: '#FF7262',
              label: 'Sarah Lin',
              cursorMode: 'arrow'
            },
            user: {
              x: (w + dockTargetW) / 2,
              y: dockTargetY + 28,
              color: '#1ABCFE',
              label: userName || 'You',
              cursorMode: 'arrow'
            }
          };

          setWireframeData(null);

          setActiveGuides([
            {
              type: 'v',
              x1: card1X + cardW + cardsGap / 2,
              y1: cardsY,
              x2: card1X + cardW + cardsGap / 2,
              y2: card3Y + cardH,
              color: '#ec4899',
              dashed: true,
              label: 'ΔX: 14px',
              pillText: 'ΔX: 14px Equal Gap',
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
              label: 'ΔY: 14px',
              pillText: 'ΔY: 14px Equal Gap',
              pillX: card1X + cardW / 2,
              pillY: cardsY + cardH + cardsGap / 2 + 16
            }
          ]);
        }
      }
      // Rebuild complete! (elapsed >= 40.5s)
      else {
        finishSwarm();
        return;
      }

      // Smooth dampening physics with fluid particle trails (smoothRate = 13.0 for silky flow)
      const updatedCursors = {};
      const smoothRate = 13.0;
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
