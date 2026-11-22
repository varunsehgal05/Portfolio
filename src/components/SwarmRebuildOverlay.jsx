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
  const [speedMultiplier, setSpeedMultiplier] = useState(1.35); // Calibrated brisk & smooth 1.35x default
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
  const speedMultiplierRef = useRef(1.35);
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

  const lastSidebarStepRef = useRef(-1);
  const dispatchSidebarStep = (step) => {
    if (lastSidebarStepRef.current !== step) {
      lastSidebarStepRef.current = step;
      if (typeof window !== 'undefined') {
        window.__varunos_sidebar_step = step;
        window.dispatchEvent(new CustomEvent('varunos-sidebar-step', { detail: { step } }));
      }
    }
  };

  const lastToolbarStepRef = useRef(-1);
  const dispatchToolbarStep = (detail) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('varunos-toolbar-step', { detail }));
    }
  };

  const heroBoxVisibleRef = useRef(false);
  const dispatchHeroBoxVisible = (visible) => {
    if (heroBoxVisibleRef.current !== visible) {
      heroBoxVisibleRef.current = visible;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('varunos-hero-box-visible', { detail: { visible } }));
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
    dispatchSidebarStep(15);
    dispatchToolbarStep({ step: 4, typedPath: 'Macintosh HD > Users > varun > Featured Works', typedSearch: 'Search in Finder...' });
    dispatchHeroBoxVisible(true);
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
    setSpeedMultiplier((prev) => (prev >= 1.8 ? 1.35 : 2));
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
    lastSidebarStepRef.current = -1;
    lastToolbarStepRef.current = -1;
    heroBoxVisibleRef.current = false;
    dispatchFinderStep(0);
    dispatchSidebarStep(0);
    dispatchToolbarStep({ step: 0, typedPath: '', typedSearch: '' });
    dispatchHeroBoxVisible(false);

    // Reset desktop icon & dock reveal counts to 0 at start of rebuild
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('varunos-swarm-icon-stamped', { detail: { count: 0 } }));
      window.dispatchEvent(new CustomEvent('varunos-swarm-dock-stamped', { detail: { count: 0 } }));
      window.dispatchEvent(new CustomEvent('varunos-card-building', { detail: { index: -1, phase: 'reset' } }));
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
      // Phase 1: Wallpaper Stamping & Backdrop Extrusion (0.0s - 2.0s) — Elena & Varun
      // =====================================================================
      if (elapsed < 2.0) {
        setStatusMessage('[1/5] Elena & Varun: Stamping Wallpaper Backdrop (100vw × 100vh)...');
        const t = Math.min(1, Math.max(0, elapsed / 2.0));

        if (t >= 0.85) {
          updateStage(1, 580); // Reveal real wallpaper only when swarm finishes stamping!
        }

        if (t > 0.60 && !wallpaperSnappedRef.current) {
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
          sarah: {
            x: 36,
            y: drawnH - 24,
            color: '#FF7262',
            label: 'Sarah Lin',
            action: 'Bottom-Left Canvas Anchor',
            toolKey: 'V Move',
            cursorMode: 'arrow'
          },
          alex: {
            x: drawnW - 36,
            y: drawnH - 24,
            color: '#0ACF83',
            label: 'Alex Chen',
            action: 'Bottom-Right Canvas Anchor',
            toolKey: 'V Move',
            cursorMode: 'arrow'
          },
          user: {
            x: drawnW - 40,
            y: 36,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Top-Right Canvas Anchor',
            toolKey: 'V Move',
            cursorMode: 'arrow'
          }
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
      // Phase 2: Top MenuBar Extrusion & Apple Tray (2.0s - 4.2s) — Alex & Elena
      // =====================================================================
      else if (elapsed < 4.2) {
        setStatusMessage('[2/5] Alex & Elena: Extruding MenuBar Frame & Status Bar...');
        const t = Math.min(1, Math.max(0, (elapsed - 2.0) / 2.2));

        if (t >= 0.85) {
          updateStage(2, 680); // Reveal MenuBar only when swarm finishes extruding!
        }

        if (t > 0.60 && !menubarSnappedRef.current) {
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
          varun: {
            x: w / 2,
            y: 14,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: 'Centering Apple Brand Menu',
            toolKey: 'V Move',
            cursorMode: 'arrow'
          },
          sarah: {
            x: Math.max(120, menuDrawnW - 120),
            y: 14,
            color: '#FF7262',
            label: 'Sarah Lin',
            action: 'Mounting Status Bar Items',
            toolKey: 'V Move',
            cursorMode: 'arrow'
          },
          user: {
            x: Math.max(80, menuDrawnW - 24),
            y: 14,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Reviewing Top Bar',
            toolKey: 'V Move',
            cursorMode: 'arrow'
          }
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
      // Phase 3: Desktop App Icons Stamping (4.2s - 8.2s) — 4 Swarm Collaborative
      // =====================================================================
      else if (elapsed < 8.2) {
        setStatusMessage('[3/5] Swarm Team: Stamping Left Desktop Apps (1-by-1)...');
        const t = Math.min(1, Math.max(0, (elapsed - 4.2) / 4.0));

        if (t > 0.05) {
          updateStage(3, 740); // Reveal Desktop Icons container in Desktop.jsx
        }

        const iconNames = ['Figma', 'VS Code', 'Resume.pdf', 'Contact', 'Buy Me a Coffee', 'Trash'];
        const domIcons = typeof document !== 'undefined' ? document.querySelectorAll('.desktop-icon-container') : null;
        let iconYPositions = [46, 138, 230, 322, 414, 506];
        let iconX = 20;
        let iconW = 72;
        let iconH = 76;
        if (domIcons && domIcons.length >= 6) {
          iconYPositions = Array.from(domIcons).map(el => Math.round(el.getBoundingClientRect().top));
          const r0 = domIcons[0].getBoundingClientRect();
          iconX = Math.round(r0.left) || 20;
          iconW = Math.round(r0.width) || 72;
          iconH = Math.round(r0.height) || 76;
        }

        const totalIcons = 6;
        const iconFloat = t * totalIcons;
        const iconIndex = Math.min(5, Math.floor(iconFloat));
        const subProgress = iconFloat - iconIndex;

        const prevY = iconIndex === 0 ? iconYPositions[0] : iconYPositions[iconIndex - 1];
        const nextY = iconYPositions[iconIndex];
        const sarahPos = interpolateArc(iconX + iconW / 2, prevY + 20, iconX + iconW / 2, nextY + 20, subProgress, -16, 0.05);

        const isSarahClicking = subProgress >= 0.65 && subProgress < 0.95;

        // Stamp exactly when Sarah reaches the icon and clicks down
        if (subProgress >= 0.65 && lastStampedIndexRef.current !== iconIndex) {
          lastStampedIndexRef.current = iconIndex;
          soundSynth.playDropThump(220 + iconIndex * 28);
          triggerRipple(iconX + iconW / 2, iconYPositions[iconIndex] + 20, '#FF7262');
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('varunos-swarm-icon-stamped', { detail: { count: iconIndex + 1 } }));
          }
        }

        // 4 Swarm Agents actively working simultaneously on the left desktop apps!
        agentTargets = {
          sarah: {
            x: sarahPos.x,
            y: sarahPos.y,
            color: '#FF7262',
            label: 'Sarah Lin',
            action: `Stamping: ${iconNames[iconIndex]}`,
            toolKey: '⌥ Stamp',
            cursorMode: subProgress < 0.65 ? 'grab' : 'arrow',
            isClicking: isSarahClicking,
            isDrawing: true,
            chatText: t < 0.85 ? 'stamping apps' : null,
            boxBounds: {
              x: iconX,
              y: iconYPositions[iconIndex],
              w: iconW,
              h: iconH
            }
          },
          elena: {
            x: iconX + iconW + 36,
            y: sarahPos.y,
            color: '#0D99FF',
            label: 'Elena Rostova',
            action: iconIndex > 0 ? 'Measuring ΔY: 16px Gap' : 'Aligning Left Grid',
            toolKey: 'V Move',
            cursorMode: 'arrow'
          },
          alex: {
            x: iconX - 6,
            y: sarahPos.y + 12,
            color: '#0ACF83',
            label: 'Alex Chen',
            action: 'Framing Column Layout [72×520]',
            toolKey: 'R Frame',
            cursorMode: 'arrow',
            boxBounds: {
              x: iconX - 8,
              y: iconYPositions[0] - 8,
              w: iconW + 16,
              h: (iconYPositions[5] - iconYPositions[0]) + iconH + 16,
              label: 'Auto-Layout Col • 72px'
            }
          },
          varun: {
            x: iconX + iconW / 2,
            y: iconYPositions[iconIndex] + iconH - 6,
            color: '#A259FF',
            label: 'Varun Sehgal',
            action: `Labeling: ${iconNames[iconIndex]}`,
            toolKey: 'T Type',
            cursorMode: 'arrow'
          },
          user: {
            x: w - 80,
            y: 48,
            color: '#1ABCFE',
            label: userName || 'You',
            action: 'Observing Assembly',
            toolKey: 'V Move',
            cursorMode: 'arrow'
          }
        };

        setWireframeData(null);

        const prevIconY = iconIndex > 0 ? iconYPositions[iconIndex - 1] : iconYPositions[0];
        const currentIconY = iconYPositions[iconIndex];
        const gapMidY = (prevIconY + currentIconY) / 2 + 35;

        setActiveGuides([
          { type: 'v', x1: iconX, y1: iconYPositions[0] - 6, x2: iconX, y2: iconYPositions[5] + iconH + 6, color: '#ec4899', dashed: true, label: `X: ${iconX}px` },
          { type: 'v', x1: iconX + iconW, y1: iconYPositions[0] - 6, x2: iconX + iconW, y2: iconYPositions[5] + iconH + 6, color: '#ec4899', dashed: true, label: `W: ${iconW}px` },
          ...(iconIndex > 0 ? [{
            type: 'v',
            x1: iconX + iconW + 40,
            y1: prevIconY + iconH,
            x2: iconX + iconW + 40,
            y2: currentIconY,
            color: '#ec4899',
            dashed: false,
            label: 'ΔY: 16px',
            pillText: 'ΔY: 16px Equal Spacing',
            pillX: iconX + iconW + 40,
            pillY: gapMidY
          }] : [])
        ]);
      }
      // =====================================================================
      // Phase 4: Bottom Bar (Dock) & Dock Apps (8.2s - 13.0s)
      // 4A: Frame Glass Dock Capsule (8.2s - 10.0s) — Alex & Varun
      // 4B: Stamp Dock Apps 1-by-1 (10.0s - 13.0s) — Sarah Lin
      // =====================================================================
      else if (elapsed < 13.0) {
        const pDock = elapsed - 8.2;

        // Sub-phase 4A: The Bar of the Bottom (8.2s - 10.0s)
        if (pDock < 1.8) {
          setStatusMessage('[4/5] Alex & Varun: [R] Framing Glass Dock Capsule...');
          const tA = Math.min(1, Math.max(0, pDock / 1.8));
          const easedMove = easeInOutCubic(tA);

          const dockSpan = lerp(60, dockTargetW, easedMove);
          const curLeft = (w - dockSpan) / 2;
          const curRight = (w + dockSpan) / 2;
          const curDockY = dockTargetY;

          // Reveal Dock capsule smoothly so it glides up
          if (tA > 0.15) {
            updateStage(4, 680);
          }

          if (tA > 0.60 && !dockSnappedRef.current) {
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
            sarah: {
              x: curLeft - 18,
              y: curDockY + 28,
              color: '#FF7262',
              label: 'Sarah Lin',
              action: 'Holding Left Margin',
              toolKey: 'V Move',
              cursorMode: 'arrow'
            },
            elena: {
              x: curRight + 18,
              y: curDockY + 28,
              color: '#0D99FF',
              label: 'Elena Rostova',
              action: 'Holding Right Margin',
              toolKey: 'V Move',
              cursorMode: 'arrow'
            },
            user: {
              x: w / 2,
              y: curDockY - 20,
              color: '#1ABCFE',
              label: userName || 'You',
              action: 'Reviewing Dock Geometry',
              toolKey: 'V Move',
              cursorMode: 'arrow'
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
        // Sub-phase 4B: The Apps of the Bottom (10.0s - 13.0s) — Sarah Lin (3.0s for 9 apps)
        else {
          setStatusMessage('[4/5] Sarah Lin: Stamping Dock App Icons (1-by-1)...');
          const tB = Math.min(1, Math.max(0, (pDock - 1.8) / 3.0));

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

          const isClicking = subProgress >= 0.65 && subProgress < 0.95;

          if (subProgress >= 0.65 && lastStampedDockIndexRef.current !== dockIndex) {
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
              toolKey: '⌥ Stamp',
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
            alex: {
              x: curDockLeft + 8,
              y: curDockY + 28,
              color: '#0ACF83',
              label: 'Alex Chen',
              action: 'Holding Dock Anchor',
              toolKey: 'V Move',
              cursorMode: 'arrow'
            },
            varun: {
              x: curDockLeft + dockTargetW - 8,
              y: curDockY + 28,
              color: '#A259FF',
              label: 'Varun Sehgal',
              action: 'Holding Dock End',
              toolKey: 'V Move',
              cursorMode: 'arrow'
            },
            elena: {
              x: w / 2,
              y: curDockY - 18,
              color: '#0D99FF',
              label: 'Elena Rostova',
              action: 'Inspecting Glass Blur',
              toolKey: 'V Move',
              cursorMode: 'arrow'
            },
            user: {
              x: w / 2 + 100,
              y: curDockY - 18,
              color: '#1ABCFE',
              label: userName || 'You',
              action: 'Reviewing Dock Items',
              toolKey: 'V Move',
              cursorMode: 'arrow'
            }
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
      // Phase 5: Center Box (Finder Portfolio Window & 2x2 Project Grid with Live Text Swarm) (13.0s - 24.5s)
      // Unhurried, deliberate assembly right over the real window:
      // 5.1 (13.0s - 14.4s): Alex Chen extrudes outer Window Frame Box (1.4s) -> step 0
      // 5.2 (14.4s - 16.6s): Elena Rostova stamps Sidebar Navigation 1-by-1 (2.2s) -> step 1
      // 5.3 (16.6s - 18.2s): Varun Sehgal styles Hero Bento Banner & Types Headline (1.6s) -> step 2
      // 5.4 (18.2s - 19.5s): Card 01 - AI Interview (Sarah Lin Frame + Varun Sehgal Text Swarm) (1.3s) -> step 3
      // 5.5 (19.5s - 20.8s): Card 02 - EventFlow SaaS (Alex Chen Frame + Varun Sehgal Text Swarm) (1.3s) -> step 4
      // 5.6 (20.8s - 22.1s): Card 03 - Expensify Budget (Elena Rostova Frame + Varun Sehgal Text Swarm) (1.3s) -> step 5
      // 5.7 (22.1s - 23.4s): Card 04 - CodeSrijan Hackathon (Sarah Lin Frame + Varun Sehgal Text Swarm) (1.3s) -> step 6
      // 5.8 (23.4s - 24.5s): Swarm Final Verification & Celebration (1.1s) -> step 7
      // =====================================================================
      else if (elapsed < 24.5) {
        const pWin = elapsed - 13.0;

        // Dynamic DOM Measuring helper guaranteeing pixel-perfect alignment to real rendered window & cards
        const getDomBox = (selector, fallback) => {
          if (typeof document !== 'undefined') {
            const el = document.querySelector(selector);
            if (el) {
              const r = el.getBoundingClientRect();
              if (r.width > 20 && r.height > 15) {
                return {
                  x: Math.round(r.left),
                  y: Math.round(r.top),
                  w: Math.round(r.width),
                  h: Math.round(r.height)
                };
              }
            }
          }
          return fallback;
        };

        const DOCK_CLEARANCE = 86;
        const MENUBAR_HEIGHT = 28;
        const availableHeight = Math.max(200, h - MENUBAR_HEIGHT - DOCK_CLEARANCE);
        const fallbackWinW = Math.min(w - 80, 920);
        const fallbackWinH = Math.min(availableHeight - 20, 560);
        const fallbackWinX = Math.max(10, Math.round((w - fallbackWinW) / 2));
        const fallbackWinY = Math.max(MENUBAR_HEIGHT + 10, Math.round(MENUBAR_HEIGHT + (availableHeight - fallbackWinH) / 2));

        const winBox = getDomBox('.window-inner', {
          x: fallbackWinX,
          y: fallbackWinY,
          w: fallbackWinW,
          h: fallbackWinH
        });

        const curX = winBox.x;
        const curY = winBox.y;
        const curW = winBox.w;
        const curH = winBox.h;

        const sidebarW = 200;
        const headerH = 38;
        const toolbarH = 42;

        // Sidebar box: strictly starts at curY + headerH (below titlebar) so it never covers red/yellow/green lights
        const sidebarBox = getDomBox('.finder-sidebar', {
          x: curX,
          y: curY + headerH,
          w: sidebarW,
          h: curH - headerH
        });

        const contentX = curX + sidebarW;
        const contentY = curY + headerH + toolbarH;
        const contentW = curW - sidebarW;

        const heroBox = getDomBox('.finder-hero-card', {
          x: contentX + 16,
          y: contentY + 16,
          w: contentW - 32,
          h: 118
        });

        const cardsGap = 14;
        const fallbackCardsY = heroBox.y + heroBox.h + 34;
        const fallbackCardW = Math.floor((contentW - 32 - cardsGap) / 2);
        const fallbackCardH = 135;

        const c1Box = getDomBox('.finder-cards-grid > .finder-project-card:nth-child(1)', {
          x: contentX + 16,
          y: fallbackCardsY,
          w: fallbackCardW,
          h: fallbackCardH
        });

        const c2Box = getDomBox('.finder-cards-grid > .finder-project-card:nth-child(2)', {
          x: c1Box.x + c1Box.w + cardsGap,
          y: c1Box.y,
          w: c1Box.w,
          h: c1Box.h
        });

        const c3Box = getDomBox('.finder-cards-grid > .finder-project-card:nth-child(3)', {
          x: c1Box.x,
          y: c1Box.y + c1Box.h + cardsGap,
          w: c1Box.w,
          h: c1Box.h
        });

        const c4Box = getDomBox('.finder-cards-grid > .finder-project-card:nth-child(4)', {
          x: c2Box.x,
          y: c3Box.y,
          w: c2Box.w,
          h: c3Box.h
        });

        const CARD_TITLES = [
          'AI Interview & Prep Platform',
          'EventFlow: Event Ticketing SaaS',
          'Expensify: Budget Tracker App',
          'CodeSrijan Hackathon Platform'
        ];

        // 15 Sidebar Items for deliberate, sequential 1-by-1 stamping by Elena Rostova
        const SIDEBAR_ITEMS = [
          { step: 1, label: 'Sidebar Frame', chat: 'extruding sidebar frame (200px)', yRel: 14, h: 28, isHeader: false },
          { step: 2, label: 'Favorites', chat: 'stamping Favorites section', yRel: 34, h: 20, isHeader: true },
          { step: 3, label: 'Featured Works', chat: 'stamping # Featured Works', yRel: 58, h: 26, isHeader: false },
          { step: 4, label: 'Tech Stack', chat: 'stamping </> Tech Stack', yRel: 86, h: 26, isHeader: false },
          { step: 5, label: 'Experience', chat: 'stamping [💼] Experience', yRel: 114, h: 26, isHeader: false },
          { step: 6, label: 'Locations', chat: 'stamping Locations section', yRel: 146, h: 20, isHeader: true },
          { step: 7, label: 'VS Code Projects', chat: 'stamping VS Code Projects', yRel: 170, h: 26, isHeader: false },
          { step: 8, label: 'GitHub Repos', chat: 'stamping GitHub Repos', yRel: 198, h: 26, isHeader: false },
          { step: 9, label: 'Resume PDF', chat: 'stamping Resume PDF', yRel: 226, h: 26, isHeader: false },
          { step: 10, label: 'Tags', chat: 'stamping Tags section', yRel: 258, h: 20, isHeader: true },
          { step: 11, label: 'Tag: Work', chat: 'stamping 🔴 Work tag', yRel: 280, h: 20, isHeader: false },
          { step: 12, label: 'Tag: Design', chat: 'stamping 🟠 Design tag', yRel: 300, h: 20, isHeader: false },
          { step: 13, label: 'Tag: AI & LLM', chat: 'stamping 🟣 AI & LLM tag', yRel: 320, h: 20, isHeader: false },
          { step: 14, label: 'Tag: Personal', chat: 'stamping 🔵 Personal tag', yRel: 340, h: 20, isHeader: false },
          { step: 15, label: 'Varun Profile Card', chat: 'mounting profile card', yRel: Math.max(380, sidebarBox.h - 52), h: 48, isHeader: false }
        ];

        // 5.1: Alex Chen Extrudes Outer Window Frame Box (13.0s - 14.4s) -> Step 0
        if (pWin < 1.4) {
          setStatusMessage('[5/5] Alex Chen: [F] Extruding Window Frame Box (920 × 560px)...');
          const t1 = Math.min(1, pWin / 1.4);
          if (t1 >= 0.85) {
            updateStage(5, 780); // Reveal real Window container only when Alex completes extruding!
            dispatchFinderStep(0);
          }
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
            varun: {
              x: curX + 120,
              y: curY + 60,
              color: '#A259FF',
              label: 'Varun Sehgal',
              action: 'Holding Window Pivot',
              toolKey: 'V Move',
              cursorMode: 'arrow',
              chatText: 'aligning window container'
            },
            sarah: {
              x: curX + 60,
              y: curY + drawnH - 30,
              color: '#FF7262',
              label: 'Sarah Lin',
              action: 'Holding Bottom-Left Anchor',
              toolKey: 'V Move',
              cursorMode: 'arrow'
            },
            elena: {
              x: curX + 220,
              y: curY + 40,
              color: '#0D99FF',
              label: 'Elena Rostova',
              action: 'Staging Sidebar Auto-Layout',
              toolKey: 'V Move',
              cursorMode: 'arrow'
            },
            user: {
              x: curX + drawnW - 40,
              y: curY + 28,
              color: '#1ABCFE',
              label: userName || 'You',
              action: 'Reviewing Window',
              toolKey: 'V Move',
              cursorMode: 'arrow'
            }
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
        // 5.2: True Concurrent Multitasking Assembly (14.2s - 18.2s, 4.0s) -> Step 1 & 2
        // Concurrently:
        // • Elena Rostova stamps 15 Sidebar items 1-by-1 from top to bottom with snap sounds & blue ripples
        // • Varun Sehgal types toolbar breadcrumbs, then search bar, then Hero Headline with caret
        // • Sarah Lin stamps toolbar navigation & view mode buttons, then frames Hero Bento Box & stamps badge
        // • Alex Chen holds auto-layout guide lines, baseline markers, and measures 200px / 704px geometry
        else if (pWin < 5.2) {
          const tMulti = Math.min(1, Math.max(0, (pWin - 1.2) / 4.0));

          // 1. Elena Rostova: 15 Sidebar Items 1-by-1
          const stepFloat = tMulti * 15;
          const itemIdx = Math.min(14, Math.floor(stepFloat));
          const subProg = stepFloat - itemIdx;
          const currentItem = SIDEBAR_ITEMS[itemIdx];

          if (lastSidebarStepRef.current !== currentItem.step) {
            lastSidebarStepRef.current = currentItem.step;
            soundSynth.playSnap(460 + itemIdx * 24, 0.035);
            triggerRipple(sidebarBox.x + 80, sidebarBox.y + currentItem.yRel + currentItem.h / 2, '#0D99FF');
            dispatchSidebarStep(currentItem.step);
          }

          if (tMulti >= 0.95) {
            dispatchFinderStep(1);
          }

          const prevItem = itemIdx === 0 ? currentItem : SIDEBAR_ITEMS[itemIdx - 1];
          const elenaPos = interpolateArc(
            sidebarBox.x + 50,
            sidebarBox.y + prevItem.yRel + prevItem.h / 2,
            sidebarBox.x + 50,
            sidebarBox.y + currentItem.yRel + currentItem.h / 2,
            subProg,
            -12,
            0.04
          );

          // 2. Varun Sehgal: Concurrently typing Toolbar Path -> Toolbar Search -> Hero Headline
          let varunPos = { x: curX + sidebarW + 100, y: curY + headerH + 20 };
          let varunAction = 'Typing Toolbar Breadcrumbs';
          let varunChat = 'typing path breadcrumb';
          let varunTool = 'T Text';
          let varunCursor = 'text';

          if (tMulti < 0.28) {
            // Varun types Toolbar Breadcrumbs path
            const subT = tMulti / 0.28;
            const fullBreadcrumb = "Macintosh HD > Users > varun > Featured Works";
            const typedCount = Math.min(fullBreadcrumb.length, Math.floor(subT * fullBreadcrumb.length * 1.2));
            const typedP = fullBreadcrumb.slice(0, typedCount);
            dispatchToolbarStep({ step: 2, typedPath: typedP });
            varunPos = { x: curX + sidebarW + 70 + typedCount * 5.2, y: curY + headerH + 21 };
            varunAction = `Typing Path: "${typedP.slice(-14)}"`;
            varunChat = `typing path: "${typedP.slice(-12)}"`;
          } else if (tMulti < 0.52) {
            // Varun types Search Input
            const subT = (tMulti - 0.28) / 0.24;
            const fullSearch = "Search in Finder...";
            const typedCount = Math.min(fullSearch.length, Math.floor(subT * fullSearch.length * 1.2));
            const typedS = fullSearch.slice(0, typedCount);
            dispatchToolbarStep({ step: 4, typedSearch: typedS });
            varunPos = { x: curX + curW - 140 + typedCount * 4.5, y: curY + headerH + 21 };
            varunAction = `Typing Search: "${typedS}"`;
            varunChat = `typing search: "${typedS}"`;
          } else {
            // Varun types Hero Headline
            const subT = (tMulti - 0.52) / 0.48;
            window.dispatchEvent(new CustomEvent('varunos-hero-type-progress', { detail: { progress: subT } }));
            if (subT >= 0.85) {
              dispatchFinderStep(2);
            }
            const heroText = "Designing intuitive web apps & modern interfaces";
            const charCount = Math.min(heroText.length, Math.floor(subT * heroText.length * 1.15));
            const currentTypingSlice = heroText.slice(0, charCount);
            const typeX = heroBox.x + 24 + Math.min(heroBox.w - 60, charCount * 8.2);
            varunPos = { x: typeX, y: heroBox.y + 54 };
            varunAction = `Typing Headline: "${currentTypingSlice.slice(-18)}"`;
            varunChat = subT < 0.95 ? `typing: "${currentTypingSlice.slice(-16)}"` : 'headline styled ✓';
          }

          // 3. Sarah Lin: Concurrently stamping Toolbar History < > -> View Modes -> Hero Box -> Status Badge
          let sarahPos = { x: curX + sidebarW + 28, y: curY + headerH + 21 };
          let sarahAction = 'Stamping History < >';
          let sarahChat = 'stamping history buttons';
          let sarahTool = '⌥ Stamp';
          let sarahCursor = 'arrow';
          let sarahBox = null;

          if (tMulti < 0.20) {
            // Stamping History < >
            dispatchToolbarStep({ step: 1 });
            sarahPos = { x: curX + sidebarW + 28, y: curY + headerH + 21 };
            sarahAction = 'Stamping: History Buttons < >';
            sarahChat = 'stamping < > history';
          } else if (tMulti < 0.38) {
            // Stamping View Mode Buttons [Grid] [List]
            dispatchToolbarStep({ step: 3 });
            sarahPos = { x: curX + curW - 180, y: curY + headerH + 21 };
            sarahAction = 'Stamping: Grid/List View Modes';
            sarahChat = 'stamping [Grid] [List]';
          } else if (tMulti < 0.75) {
            // Framing Hero Bento Box
            const subT = (tMulti - 0.38) / 0.37;
            const drawnHeroW = lerp(80, heroBox.w, easeInOutCubic(subT));
            sarahPos = { x: heroBox.x + drawnHeroW, y: heroBox.y + heroBox.h };
            sarahAction = `Framing: Hero Bento Box [${Math.round(drawnHeroW)}×${heroBox.h}]`;
            sarahChat = 'framing hero bento box';
            sarahTool = 'R Frame';
            sarahCursor = 'cross';
            sarahBox = {
              x: heroBox.x,
              y: heroBox.y,
              w: drawnHeroW,
              h: heroBox.h,
              label: `Hero Bento Box • ${Math.round(drawnHeroW)} × ${heroBox.h}px`
            };
            if (subT >= 0.50) {
              dispatchHeroBoxVisible(true);
            }
          } else {
            // Stamping Status Badge on Hero Banner
            dispatchHeroBoxVisible(true);
            sarahPos = { x: heroBox.x + 90, y: heroBox.y + 24 };
            sarahAction = 'Stamping: Available Status Badge';
            sarahChat = 'stamping status badge';
            sarahTool = '⌥ Stamp';
            sarahCursor = 'arrow';
          }

          // 4. Alex Chen: Concurrently holding auto-layout guides and measuring geometry
          let alexPos = { x: sidebarBox.x + sidebarBox.w, y: sidebarBox.y + 60 };
          let alexAction = 'Auto-Layout: 200px Sidebar';
          let alexChat = 'locking sidebar 200px';

          if (tMulti < 0.50) {
            alexPos = { x: sidebarBox.x + sidebarBox.w, y: sidebarBox.y + 60 + tMulti * 180 };
            alexAction = 'Auto-Layout: Sidebar Anchor';
            alexChat = 'sidebar auto-layout: 200px';
          } else {
            alexPos = { x: heroBox.x + heroBox.w - 12, y: heroBox.y + heroBox.h / 2 };
            alexAction = `Auto-Layout: Hero Width [${Math.round(heroBox.w)}px]`;
            alexChat = `measuring hero: ${Math.round(heroBox.w)}px`;
          }

          setStatusMessage(`[5/5] Multitasking Swarm: Elena (Sidebar ${itemIdx + 1}/15) • Varun (${varunAction}) • Sarah (${sarahAction})`);

          agentTargets = {
            elena: {
              x: elenaPos.x,
              y: elenaPos.y,
              color: '#0D99FF',
              label: 'Elena Rostova',
              toolKey: currentItem.isHeader ? 'T Text' : (itemIdx === 0 ? 'F Frame' : '⌥ Stamp'),
              cursorMode: currentItem.isHeader ? 'text' : 'arrow',
              isClicking: subProg > 0.65 && subProg < 0.95,
              isDrawing: true,
              chatText: currentItem.chat,
              boxBounds: {
                x: sidebarBox.x + 8,
                y: sidebarBox.y + currentItem.yRel,
                w: sidebarBox.w - 16,
                h: currentItem.h,
                label: currentItem.label
              }
            },
            varun: {
              x: varunPos.x,
              y: varunPos.y,
              color: '#A259FF',
              label: 'Varun Sehgal',
              action: varunAction,
              toolKey: varunTool,
              cursorMode: varunCursor,
              isDrawing: true,
              chatText: varunChat
            },
            sarah: {
              x: sarahPos.x,
              y: sarahPos.y,
              color: '#FF7262',
              label: 'Sarah Lin',
              action: sarahAction,
              toolKey: sarahTool,
              cursorMode: sarahCursor,
              isDrawing: Boolean(sarahBox),
              chatText: sarahChat,
              boxBounds: sarahBox
            },
            alex: {
              x: alexPos.x,
              y: alexPos.y,
              color: '#0ACF83',
              label: 'Alex Chen',
              action: alexAction,
              toolKey: 'F Frame',
              cursorMode: 'arrow',
              chatText: alexChat
            },
            user: {
              x: curX + curW - 80,
              y: curY + curH - 24,
              color: '#1ABCFE',
              label: userName || 'You',
              action: 'Reviewing Workspace',
              toolKey: 'V Move',
              cursorMode: 'arrow'
            }
          };

          setWireframeData(null);

          setActiveGuides([
            {
              type: 'v',
              x1: sidebarBox.x + sidebarBox.w,
              y1: sidebarBox.y,
              x2: sidebarBox.x + sidebarBox.w,
              y2: sidebarBox.y + sidebarBox.h,
              color: '#ec4899',
              dashed: true,
              label: 'Sidebar 200px',
              pillText: `Sidebar: 200px (${itemIdx + 1}/15 items)`,
              pillX: sidebarBox.x + sidebarBox.w,
              pillY: sidebarBox.y + currentItem.yRel + currentItem.h / 2
            },
            {
              type: 'h',
              x1: curX + sidebarW,
              y1: curY + headerH + toolbarH,
              x2: curX + curW,
              y2: curY + headerH + toolbarH,
              color: '#ec4899',
              dashed: true,
              label: 'Toolbar 42px',
              pillText: 'Toolbar: 42px Auto-Layout',
              pillX: curX + sidebarW + 160,
              pillY: curY + headerH + toolbarH
            }
          ]);
        }
        // 5.4: Card 01 - AI Interview Platform (18.2s - 19.5s) -> Step 3
        // Sarah Lin draws container box + Varun Sehgal Text Swarm types title
        else if (pWin < 6.5) {
          const t4 = Math.min(1, (pWin - 5.2) / 1.3);
          const cardTitle = CARD_TITLES[0];

          // Subphase A (0% - 28%): Sarah frames empty rectangle box
          if (t4 < 0.28) {
            const frameP = t4 / 0.28;
            const drawnW1 = lerp(40, c1Box.w, easeInOutCubic(frameP));
            const drawnH1 = lerp(30, c1Box.h, easeInOutCubic(frameP));
            const sarahArc = interpolateArc(c1Box.x, c1Box.y, c1Box.x + drawnW1, c1Box.y + drawnH1, frameP, 12, 0.04);

            window.dispatchEvent(new CustomEvent('varunos-card-building', {
              detail: { index: 0, phase: 'frame', progress: frameP }
            }));

            setStatusMessage('[5/5] Sarah Lin: [R] Framing Card 01 (Auto-Layout Frame)...');

            agentTargets = {
              sarah: {
                x: sarahArc.x,
                y: sarahArc.y,
                color: '#FF7262',
                label: 'Sarah Lin',
                action: 'Framing Card 01',
                toolKey: 'R Rectangle',
                cursorMode: 'cross',
                isDrawing: true,
                chatText: 'drawing card frame',
                boxBounds: {
                  x: c1Box.x,
                  y: c1Box.y,
                  w: drawnW1,
                  h: drawnH1,
                  label: `Card 01 (${Math.round(drawnW1)} × ${Math.round(drawnH1)}px)`
                }
              },
              varun: {
                x: c1Box.x + 20,
                y: c1Box.y + 26,
                color: '#A259FF',
                label: 'Varun Sehgal',
                action: 'Ready to Type',
                toolKey: 'T Text',
                cursorMode: 'text',
                isDrawing: false,
                chatText: 'ready to type'
              },
              alex: {
                x: c2Box.x + 30,
                y: c2Box.y + 20,
                color: '#0ACF83',
                label: 'Alex Chen',
                action: 'Staging Card 02 Frame',
                toolKey: 'R Rectangle',
                cursorMode: 'cross',
                chatText: 'staging Card 02'
              },
              elena: {
                x: c3Box.x + 30,
                y: c3Box.y + 20,
                color: '#0D99FF',
                label: 'Elena Rostova',
                action: 'Staging Card 03 Frame',
                toolKey: 'R Rectangle',
                cursorMode: 'cross',
                chatText: 'staging Card 03'
              },
              user: {
                x: curX + curW - 80,
                y: curY + curH - 24,
                color: '#1ABCFE',
                label: userName || 'You',
                action: 'Reviewing Card 01',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              }
            };
          }
          // Subphase B (28% - 88%): Varun Sehgal Text Swarm types title letter-by-letter
          else if (t4 < 0.88) {
            const typeP = (t4 - 0.28) / 0.60;
            const charCount = Math.min(cardTitle.length, Math.floor(typeP * cardTitle.length * 1.15));
            const typedSlice = cardTitle.slice(0, charCount);
            const typeX = c1Box.x + 18 + Math.min(c1Box.w - 45, charCount * 7.8);
            const typeY = c1Box.y + 26;

            window.dispatchEvent(new CustomEvent('varunos-card-building', {
              detail: { index: 0, phase: 'type', progress: typeP, typedText: typedSlice }
            }));

            setStatusMessage(`[5/5] Varun Sehgal: [T] Typing: "${typedSlice}" into Card 01...`);

            agentTargets = {
              varun: {
                x: typeX,
                y: typeY,
                color: '#A259FF',
                label: 'Varun Sehgal',
                action: `Typing: ${typedSlice}`,
                toolKey: 'T Text',
                cursorMode: 'text',
                isDrawing: true,
                chatText: typeP < 0.95 ? `typing: "${typedSlice.slice(-16)}"` : 'title typed ✓',
                boxBounds: {
                  x: c1Box.x,
                  y: c1Box.y,
                  w: c1Box.w,
                  h: c1Box.h,
                  label: `Card 01 • ${c1Box.w} × ${c1Box.h}px`
                }
              },
              sarah: {
                x: c1Box.x + c1Box.w - 14,
                y: c1Box.y + 14,
                color: '#FF7262',
                label: 'Sarah Lin',
                action: 'Auto-Layout Padding: 14px',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: 'padding: 14px'
              },
              alex: {
                x: c2Box.x + 30,
                y: c2Box.y + 20,
                color: '#0ACF83',
                label: 'Alex Chen',
                action: 'Staging Card 02',
                toolKey: 'R Rectangle',
                cursorMode: 'cross'
              },
              elena: {
                x: c3Box.x + 30,
                y: c3Box.y + 20,
                color: '#0D99FF',
                label: 'Elena Rostova',
                action: 'Staging Card 03',
                toolKey: 'R Rectangle',
                cursorMode: 'cross'
              },
              user: {
                x: curX + curW - 80,
                y: curY + curH - 24,
                color: '#1ABCFE',
                label: userName || 'You',
                action: 'Observing Card 01',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              }
            };
          }
          // Subphase C (88% - 100%): Card 01 Complete & Stamped
          else {
            if (!card1PlacedRef.current) {
              card1PlacedRef.current = true;
              soundSynth.playDropThump(240);
              triggerRipple(c1Box.x + c1Box.w / 2, c1Box.y + c1Box.h / 2, '#FF7262');
            }
            dispatchFinderStep(3);
            window.dispatchEvent(new CustomEvent('varunos-card-building', {
              detail: { index: 0, phase: 'complete' }
            }));

            setStatusMessage('[5/5] Card 01 Complete ✓ AI Interview & Prep Platform');

            agentTargets = {
              sarah: {
                x: c1Box.x + c1Box.w / 2,
                y: c1Box.y + c1Box.h / 2,
                color: '#FF7262',
                label: 'Sarah Lin',
                action: 'Card 01 Complete ✓',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: 'Card 01 verified ✓'
              },
              varun: {
                x: c2Box.x + 20,
                y: c2Box.y + 26,
                color: '#A259FF',
                label: 'Varun Sehgal',
                action: 'Moving to Card 02',
                toolKey: 'T Text',
                cursorMode: 'text'
              },
              alex: {
                x: c2Box.x + 10,
                y: c2Box.y + 10,
                color: '#0ACF83',
                label: 'Alex Chen',
                action: 'Preparing Card 02 Frame',
                toolKey: 'R Rectangle',
                cursorMode: 'cross'
              },
              elena: {
                x: c3Box.x + 30,
                y: c3Box.y + 20,
                color: '#0D99FF',
                label: 'Elena Rostova',
                action: 'Staging Card 03 Frame',
                toolKey: 'R Rectangle',
                cursorMode: 'cross'
              },
              user: {
                x: curX + curW - 80,
                y: curY + curH - 24,
                color: '#1ABCFE',
                label: userName || 'You',
                action: 'Observing Assembly',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              }
            };
          }

          setWireframeData(null);

          setActiveGuides([
            {
              type: 'h',
              x1: c1Box.x,
              y1: c1Box.y,
              x2: c1Box.x + c1Box.w,
              y2: c1Box.y,
              color: '#FF7262',
              dashed: true,
              label: 'Card 01 Bounds',
              pillText: `Card 01: ${c1Box.w} × ${c1Box.h}px`,
              pillX: c1Box.x + c1Box.w / 2,
              pillY: c1Box.y - 12
            }
          ]);
        }
        // 5.5: Card 02 - EventFlow SaaS (19.5s - 20.8s) -> Step 4
        // Alex Chen draws container box + Varun Sehgal Text Swarm types title
        else if (pWin < 7.8) {
          const t5 = Math.min(1, (pWin - 6.5) / 1.3);
          const cardTitle = CARD_TITLES[1];

          // Subphase A (0% - 28%): Alex frames empty rectangle box
          if (t5 < 0.28) {
            const frameP = t5 / 0.28;
            const drawnW2 = lerp(40, c2Box.w, easeInOutCubic(frameP));
            const drawnH2 = lerp(30, c2Box.h, easeInOutCubic(frameP));
            const alexArc = interpolateArc(c2Box.x, c2Box.y, c2Box.x + drawnW2, c2Box.y + drawnH2, frameP, 12, 0.04);

            window.dispatchEvent(new CustomEvent('varunos-card-building', {
              detail: { index: 1, phase: 'frame', progress: frameP }
            }));

            setStatusMessage('[5/5] Alex Chen: [R] Framing Card 02 (Auto-Layout Frame)...');

            agentTargets = {
              alex: {
                x: alexArc.x,
                y: alexArc.y,
                color: '#0ACF83',
                label: 'Alex Chen',
                action: 'Framing Card 02',
                toolKey: 'R Rectangle',
                cursorMode: 'cross',
                isDrawing: true,
                chatText: 'drawing card frame',
                boxBounds: {
                  x: c2Box.x,
                  y: c2Box.y,
                  w: drawnW2,
                  h: drawnH2,
                  label: `Card 02 (${Math.round(drawnW2)} × ${Math.round(drawnH2)}px)`
                }
              },
              varun: {
                x: c2Box.x + 20,
                y: c2Box.y + 26,
                color: '#A259FF',
                label: 'Varun Sehgal',
                action: 'Ready to Type',
                toolKey: 'T Text',
                cursorMode: 'text',
                isDrawing: false,
                chatText: 'ready to type'
              },
              sarah: {
                x: c1Box.x + c1Box.w / 2,
                y: c1Box.y + c1Box.h / 2,
                color: '#FF7262',
                label: 'Sarah Lin',
                action: 'Card 01 Verified',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              },
              elena: {
                x: c3Box.x + 30,
                y: c3Box.y + 20,
                color: '#0D99FF',
                label: 'Elena Rostova',
                action: 'Staging Card 03',
                toolKey: 'R Rectangle',
                cursorMode: 'cross'
              },
              user: {
                x: curX + curW - 80,
                y: curY + curH - 24,
                color: '#1ABCFE',
                label: userName || 'You',
                action: 'Observing Assembly',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              }
            };
          }
          // Subphase B (28% - 88%): Varun Sehgal Text Swarm types title letter-by-letter
          else if (t5 < 0.88) {
            const typeP = (t5 - 0.28) / 0.60;
            const charCount = Math.min(cardTitle.length, Math.floor(typeP * cardTitle.length * 1.15));
            const typedSlice = cardTitle.slice(0, charCount);
            const typeX = c2Box.x + 18 + Math.min(c2Box.w - 45, charCount * 7.8);
            const typeY = c2Box.y + 26;

            window.dispatchEvent(new CustomEvent('varunos-card-building', {
              detail: { index: 1, phase: 'type', progress: typeP, typedText: typedSlice }
            }));

            setStatusMessage(`[5/5] Varun Sehgal: [T] Typing: "${typedSlice}" into Card 02...`);

            agentTargets = {
              varun: {
                x: typeX,
                y: typeY,
                color: '#A259FF',
                label: 'Varun Sehgal',
                action: `Typing: ${typedSlice}`,
                toolKey: 'T Text',
                cursorMode: 'text',
                isDrawing: true,
                chatText: typeP < 0.95 ? `typing: "${typedSlice.slice(-16)}"` : 'title typed ✓',
                boxBounds: {
                  x: c2Box.x,
                  y: c2Box.y,
                  w: c2Box.w,
                  h: c2Box.h,
                  label: `Card 02 • ${c2Box.w} × ${c2Box.h}px`
                }
              },
              alex: {
                x: c2Box.x + c2Box.w - 14,
                y: c2Box.y + 14,
                color: '#0ACF83',
                label: 'Alex Chen',
                action: 'Auto-Layout Padding: 14px',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: 'padding: 14px'
              },
              sarah: {
                x: Math.round((c1Box.x + c1Box.w + c2Box.x) / 2),
                y: c1Box.y + c1Box.h / 2,
                color: '#FF7262',
                label: 'Sarah Lin',
                action: 'Holding ΔX: 14px Gap',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: 'gap: 14px locked'
              },
              elena: {
                x: c3Box.x + 30,
                y: c3Box.y + 20,
                color: '#0D99FF',
                label: 'Elena Rostova',
                action: 'Staging Card 03',
                toolKey: 'R Rectangle',
                cursorMode: 'cross'
              },
              user: {
                x: curX + curW - 80,
                y: curY + curH - 24,
                color: '#1ABCFE',
                label: userName || 'You',
                action: 'Observing Assembly',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              }
            };
          }
          // Subphase C (88% - 100%): Card 02 Complete & Stamped
          else {
            if (!card2PlacedRef.current) {
              card2PlacedRef.current = true;
              soundSynth.playDropThump(260);
              triggerRipple(c2Box.x + c2Box.w / 2, c2Box.y + c2Box.h / 2, '#0ACF83');
            }
            dispatchFinderStep(4);
            window.dispatchEvent(new CustomEvent('varunos-card-building', {
              detail: { index: 1, phase: 'complete' }
            }));

            setStatusMessage('[5/5] Card 02 Complete ✓ EventFlow: Event Ticketing SaaS');

            agentTargets = {
              alex: {
                x: c2Box.x + c2Box.w / 2,
                y: c2Box.y + c2Box.h / 2,
                color: '#0ACF83',
                label: 'Alex Chen',
                action: 'Card 02 Complete ✓',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: 'Card 02 verified ✓'
              },
              varun: {
                x: c3Box.x + 20,
                y: c3Box.y + 26,
                color: '#A259FF',
                label: 'Varun Sehgal',
                action: 'Moving to Card 03',
                toolKey: 'T Text',
                cursorMode: 'text'
              },
              elena: {
                x: c3Box.x + 10,
                y: c3Box.y + 10,
                color: '#0D99FF',
                label: 'Elena Rostova',
                action: 'Preparing Card 03 Frame',
                toolKey: 'R Rectangle',
                cursorMode: 'cross'
              },
              sarah: {
                x: c1Box.x + c1Box.w / 2,
                y: c1Box.y + c1Box.h / 2,
                color: '#FF7262',
                label: 'Sarah Lin',
                action: 'Card 01 Verified',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              },
              user: {
                x: curX + curW - 80,
                y: curY + curH - 24,
                color: '#1ABCFE',
                label: userName || 'You',
                action: 'Observing Assembly',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              }
            };
          }

          setWireframeData(null);

          const gapX = Math.round((c1Box.x + c1Box.w + c2Box.x) / 2);
          setActiveGuides([
            {
              type: 'v',
              x1: gapX,
              y1: c1Box.y,
              x2: gapX,
              y2: c1Box.y + c1Box.h,
              color: '#ec4899',
              dashed: true,
              label: 'ΔX: 14px',
              pillText: 'ΔX: 14px Equal Gap',
              pillX: gapX,
              pillY: c1Box.y + c1Box.h / 2
            }
          ]);
        }
        // 5.6: Card 03 - Expensify Budget (20.8s - 22.1s) -> Step 5
        // Elena Rostova draws container box + Varun Sehgal Text Swarm types title
        else if (pWin < 9.1) {
          const t6 = Math.min(1, (pWin - 7.8) / 1.3);
          const cardTitle = CARD_TITLES[2];

          // Subphase A (0% - 28%): Elena frames empty rectangle box
          if (t6 < 0.28) {
            const frameP = t6 / 0.28;
            const drawnW3 = lerp(40, c3Box.w, easeInOutCubic(frameP));
            const drawnH3 = lerp(30, c3Box.h, easeInOutCubic(frameP));
            const elenaArc = interpolateArc(c3Box.x, c3Box.y, c3Box.x + drawnW3, c3Box.y + drawnH3, frameP, 12, 0.04);

            window.dispatchEvent(new CustomEvent('varunos-card-building', {
              detail: { index: 2, phase: 'frame', progress: frameP }
            }));

            setStatusMessage('[5/5] Elena Rostova: [R] Framing Card 03 (Auto-Layout Frame)...');

            agentTargets = {
              elena: {
                x: elenaArc.x,
                y: elenaArc.y,
                color: '#0D99FF',
                label: 'Elena Rostova',
                action: 'Framing Card 03',
                toolKey: 'R Rectangle',
                cursorMode: 'cross',
                isDrawing: true,
                chatText: 'drawing card frame',
                boxBounds: {
                  x: c3Box.x,
                  y: c3Box.y,
                  w: drawnW3,
                  h: drawnH3,
                  label: `Card 03 (${Math.round(drawnW3)} × ${Math.round(drawnH3)}px)`
                }
              },
              varun: {
                x: c3Box.x + 20,
                y: c3Box.y + 26,
                color: '#A259FF',
                label: 'Varun Sehgal',
                action: 'Ready to Type',
                toolKey: 'T Text',
                cursorMode: 'text',
                isDrawing: false,
                chatText: 'ready to type'
              },
              alex: {
                x: c2Box.x + c2Box.w / 2,
                y: c2Box.y + c2Box.h / 2,
                color: '#0ACF83',
                label: 'Alex Chen',
                action: 'Card 02 Verified',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              },
              sarah: {
                x: c1Box.x + c1Box.w / 2,
                y: Math.round((c1Box.y + c1Box.h + c3Box.y) / 2),
                color: '#FF7262',
                label: 'Sarah Lin',
                action: 'Holding ΔY: 14px Gap',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: 'ΔY: 14px locked'
              },
              user: {
                x: curX + curW - 80,
                y: curY + curH - 24,
                color: '#1ABCFE',
                label: userName || 'You',
                action: 'Observing Assembly',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              }
            };
          }
          // Subphase B (28% - 88%): Varun Sehgal Text Swarm types title letter-by-letter
          else if (t6 < 0.88) {
            const typeP = (t6 - 0.28) / 0.60;
            const charCount = Math.min(cardTitle.length, Math.floor(typeP * cardTitle.length * 1.15));
            const typedSlice = cardTitle.slice(0, charCount);
            const typeX = c3Box.x + 18 + Math.min(c3Box.w - 45, charCount * 7.8);
            const typeY = c3Box.y + 26;

            window.dispatchEvent(new CustomEvent('varunos-card-building', {
              detail: { index: 2, phase: 'type', progress: typeP, typedText: typedSlice }
            }));

            setStatusMessage(`[5/5] Varun Sehgal: [T] Typing: "${typedSlice}" into Card 03...`);

            agentTargets = {
              varun: {
                x: typeX,
                y: typeY,
                color: '#A259FF',
                label: 'Varun Sehgal',
                action: `Typing: ${typedSlice}`,
                toolKey: 'T Text',
                cursorMode: 'text',
                isDrawing: true,
                chatText: typeP < 0.95 ? `typing: "${typedSlice.slice(-16)}"` : 'title typed ✓',
                boxBounds: {
                  x: c3Box.x,
                  y: c3Box.y,
                  w: c3Box.w,
                  h: c3Box.h,
                  label: `Card 03 • ${c3Box.w} × ${c3Box.h}px`
                }
              },
              elena: {
                x: c3Box.x + c3Box.w - 14,
                y: c3Box.y + 14,
                color: '#0D99FF',
                label: 'Elena Rostova',
                action: 'Auto-Layout Padding: 14px',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: 'padding: 14px'
              },
              sarah: {
                x: c1Box.x + c1Box.w / 2,
                y: Math.round((c1Box.y + c1Box.h + c3Box.y) / 2),
                color: '#FF7262',
                label: 'Sarah Lin',
                action: 'Holding ΔY: 14px Gap',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: 'ΔY: 14px locked'
              },
              alex: {
                x: c4Box.x + 20,
                y: c4Box.y + 20,
                color: '#0ACF83',
                label: 'Alex Chen',
                action: 'Staging Card 04 Frame',
                toolKey: 'R Rectangle',
                cursorMode: 'cross'
              },
              user: {
                x: curX + curW - 80,
                y: curY + curH - 24,
                color: '#1ABCFE',
                label: userName || 'You',
                action: 'Observing Assembly',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              }
            };
          }
          // Subphase C (88% - 100%): Card 03 Complete & Stamped
          else {
            if (!card3PlacedRef.current) {
              card3PlacedRef.current = true;
              soundSynth.playDropThump(275);
              triggerRipple(c3Box.x + c3Box.w / 2, c3Box.y + c3Box.h / 2, '#0D99FF');
            }
            dispatchFinderStep(5);
            window.dispatchEvent(new CustomEvent('varunos-card-building', {
              detail: { index: 2, phase: 'complete' }
            }));

            setStatusMessage('[5/5] Card 03 Complete ✓ Expensify: Budget Tracker App');

            agentTargets = {
              elena: {
                x: c3Box.x + c3Box.w / 2,
                y: c3Box.y + c3Box.h / 2,
                color: '#0D99FF',
                label: 'Elena Rostova',
                action: 'Card 03 Complete ✓',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: 'Card 03 verified ✓'
              },
              varun: {
                x: c4Box.x + 20,
                y: c4Box.y + 26,
                color: '#A259FF',
                label: 'Varun Sehgal',
                action: 'Moving to Card 04',
                toolKey: 'T Text',
                cursorMode: 'text'
              },
              sarah: {
                x: c4Box.x + 10,
                y: c4Box.y + 10,
                color: '#FF7262',
                label: 'Sarah Lin',
                action: 'Preparing Card 04 Frame',
                toolKey: 'R Rectangle',
                cursorMode: 'cross'
              },
              alex: {
                x: c2Box.x + c2Box.w / 2,
                y: c2Box.y + c2Box.h / 2,
                color: '#0ACF83',
                label: 'Alex Chen',
                action: 'Card 02 Verified',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              },
              user: {
                x: curX + curW - 80,
                y: curY + curH - 24,
                color: '#1ABCFE',
                label: userName || 'You',
                action: 'Observing Assembly',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              }
            };
          }

          setWireframeData(null);

          // Equal Y gap strictly in the empty gap between Card 1 and Card 3
          const gapY = Math.round((c1Box.y + c1Box.h + c3Box.y) / 2);
          setActiveGuides([
            {
              type: 'h',
              x1: c1Box.x,
              y1: gapY,
              x2: c1Box.x + c1Box.w,
              y2: gapY,
              color: '#ec4899',
              dashed: true,
              label: 'ΔY: 14px',
              pillText: 'ΔY: 14px Equal Gap',
              pillX: c1Box.x + c1Box.w / 2,
              pillY: gapY
            }
          ]);
        }
        // 5.7: Card 04 - CodeSrijan Hackathon (22.1s - 23.4s) -> Step 6
        // Sarah Lin draws container box + Varun Sehgal Text Swarm types title
        else if (pWin < 10.4) {
          const t7 = Math.min(1, (pWin - 9.1) / 1.3);
          const cardTitle = CARD_TITLES[3];

          // Subphase A (0% - 28%): Sarah frames empty rectangle box
          if (t7 < 0.28) {
            const frameP = t7 / 0.28;
            const drawnW4 = lerp(40, c4Box.w, easeInOutCubic(frameP));
            const drawnH4 = lerp(30, c4Box.h, easeInOutCubic(frameP));
            const sarahArc = interpolateArc(c4Box.x, c4Box.y, c4Box.x + drawnW4, c4Box.y + drawnH4, frameP, 12, 0.04);

            window.dispatchEvent(new CustomEvent('varunos-card-building', {
              detail: { index: 3, phase: 'frame', progress: frameP }
            }));

            setStatusMessage('[5/5] Sarah Lin: [R] Framing Card 04 (Auto-Layout Frame)...');

            agentTargets = {
              sarah: {
                x: sarahArc.x,
                y: sarahArc.y,
                color: '#FF7262',
                label: 'Sarah Lin',
                action: 'Framing Card 04',
                toolKey: 'R Rectangle',
                cursorMode: 'cross',
                isDrawing: true,
                chatText: 'drawing card frame',
                boxBounds: {
                  x: c4Box.x,
                  y: c4Box.y,
                  w: drawnW4,
                  h: drawnH4,
                  label: `Card 04 (${Math.round(drawnW4)} × ${Math.round(drawnH4)}px)`
                }
              },
              varun: {
                x: c4Box.x + 20,
                y: c4Box.y + 26,
                color: '#A259FF',
                label: 'Varun Sehgal',
                action: 'Ready to Type',
                toolKey: 'T Text',
                cursorMode: 'text',
                isDrawing: false,
                chatText: 'ready to type'
              },
              alex: {
                x: Math.round((c3Box.x + c3Box.w + c4Box.x) / 2),
                y: c3Box.y + c3Box.h / 2,
                color: '#0ACF83',
                label: 'Alex Chen',
                action: 'Holding Bottom Gap',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: 'bottom gap verified'
              },
              elena: {
                x: c2Box.x + c2Box.w / 2,
                y: Math.round((c2Box.y + c2Box.h + c4Box.y) / 2),
                color: '#0D99FF',
                label: 'Elena Rostova',
                action: 'Holding Right Gap',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: 'right gap verified'
              },
              user: {
                x: curX + curW - 80,
                y: curY + curH - 24,
                color: '#1ABCFE',
                label: userName || 'You',
                action: 'Reviewing 2×2 Grid',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              }
            };
          }
          // Subphase B (28% - 88%): Varun Sehgal Text Swarm types title letter-by-letter
          else if (t7 < 0.88) {
            const typeP = (t7 - 0.28) / 0.60;
            const charCount = Math.min(cardTitle.length, Math.floor(typeP * cardTitle.length * 1.15));
            const typedSlice = cardTitle.slice(0, charCount);
            const typeX = c4Box.x + 18 + Math.min(c4Box.w - 45, charCount * 7.8);
            const typeY = c4Box.y + 26;

            window.dispatchEvent(new CustomEvent('varunos-card-building', {
              detail: { index: 3, phase: 'type', progress: typeP, typedText: typedSlice }
            }));

            setStatusMessage(`[5/5] Varun Sehgal: [T] Typing: "${typedSlice}" into Card 04...`);

            agentTargets = {
              varun: {
                x: typeX,
                y: typeY,
                color: '#A259FF',
                label: 'Varun Sehgal',
                action: `Typing: ${typedSlice}`,
                toolKey: 'T Text',
                cursorMode: 'text',
                isDrawing: true,
                chatText: typeP < 0.95 ? `typing: "${typedSlice.slice(-16)}"` : 'title typed ✓',
                boxBounds: {
                  x: c4Box.x,
                  y: c4Box.y,
                  w: c4Box.w,
                  h: c4Box.h,
                  label: `Card 04 • ${c4Box.w} × ${c4Box.h}px`
                }
              },
              sarah: {
                x: c4Box.x + c4Box.w - 14,
                y: c4Box.y + 14,
                color: '#FF7262',
                label: 'Sarah Lin',
                action: 'Auto-Layout Padding: 14px',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: 'padding: 14px'
              },
              alex: {
                x: Math.round((c3Box.x + c3Box.w + c4Box.x) / 2),
                y: c3Box.y + c3Box.h / 2,
                color: '#0ACF83',
                label: 'Alex Chen',
                action: 'Holding Bottom Gap',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              },
              elena: {
                x: c2Box.x + c2Box.w / 2,
                y: Math.round((c2Box.y + c2Box.h + c4Box.y) / 2),
                color: '#0D99FF',
                label: 'Elena Rostova',
                action: 'Holding Right Gap',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              },
              user: {
                x: curX + curW - 80,
                y: curY + curH - 24,
                color: '#1ABCFE',
                label: userName || 'You',
                action: 'Reviewing 2×2 Grid',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              }
            };
          }
          // Subphase C (88% - 100%): Card 04 Complete & Stamped
          else {
            if (!card4PlacedRef.current) {
              card4PlacedRef.current = true;
              soundSynth.playDropThump(295);
              triggerRipple(c4Box.x + c4Box.w / 2, c4Box.y + c4Box.h / 2, '#A259FF');
            }
            dispatchFinderStep(6);
            window.dispatchEvent(new CustomEvent('varunos-card-building', {
              detail: { index: 3, phase: 'complete' }
            }));

            setStatusMessage('[5/5] Card 04 Complete ✓ CodeSrijan Hackathon Platform');

            agentTargets = {
              sarah: {
                x: c4Box.x + c4Box.w / 2,
                y: c4Box.y + c4Box.h / 2,
                color: '#FF7262',
                label: 'Sarah Lin',
                action: 'Card 04 Complete ✓',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: 'Card 04 verified ✓'
              },
              varun: {
                x: heroBox.x + heroBox.w / 2,
                y: heroBox.y + heroBox.h / 2,
                color: '#A259FF',
                label: 'Varun Sehgal',
                action: 'Final Verification',
                toolKey: 'V Move',
                cursorMode: 'arrow',
                chatText: '✨ Live assembly complete!'
              },
              alex: {
                x: c2Box.x + c2Box.w / 2,
                y: c2Box.y + c2Box.h / 2,
                color: '#0ACF83',
                label: 'Alex Chen',
                action: 'Card 02 Verified',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              },
              elena: {
                x: c3Box.x + c3Box.w / 2,
                y: c3Box.y + c3Box.h / 2,
                color: '#0D99FF',
                label: 'Elena Rostova',
                action: 'Card 03 Verified',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              },
              user: {
                x: curX + curW - 80,
                y: curY + curH - 24,
                color: '#1ABCFE',
                label: userName || 'You',
                action: 'Reviewing Final Grid',
                toolKey: 'V Move',
                cursorMode: 'arrow'
              }
            };
          }

          setWireframeData(null);

          const gapX = Math.round((c3Box.x + c3Box.w + c4Box.x) / 2);
          setActiveGuides([
            {
              type: 'v',
              x1: gapX,
              y1: c3Box.y,
              x2: gapX,
              y2: c3Box.y + c3Box.h,
              color: '#ec4899',
              dashed: true,
              label: 'ΔX: 14px',
              pillText: 'ΔX: 14px Equal Gap',
              pillX: gapX,
              pillY: c3Box.y + c3Box.h / 2
            }
          ]);
        }
        // 5.8: Auto-Layout Verification & Celebration (23.4s - 24.5s) -> Step 7
        else {
          dispatchFinderStep(7);
          setStatusMessage('[5/5] Auto-Layout Verified ✓ 2×2 Project Grid Complete!');

          const gapX = Math.round((c1Box.x + c1Box.w + c2Box.x) / 2);
          const gapY = Math.round((c1Box.y + c1Box.h + c3Box.y) / 2);

          agentTargets = {
            elena: {
              x: gapX,
              y: c1Box.y + c1Box.h / 2,
              color: '#0D99FF',
              label: 'Elena Rostova',
              action: 'Auto-Layout Verified ✓',
              toolKey: 'V Move',
              cursorMode: 'arrow',
              chatText: '2x2 grid verified ✓'
            },
            alex: {
              x: gapX,
              y: c3Box.y + c3Box.h / 2,
              color: '#0ACF83',
              label: 'Alex Chen',
              action: '14px Gap Verified ✓',
              toolKey: 'V Move',
              cursorMode: 'arrow',
              chatText: 'equal spacing locked'
            },
            varun: {
              x: heroBox.x + heroBox.w / 2,
              y: heroBox.y + heroBox.h / 2,
              color: '#A259FF',
              label: 'Varun Sehgal',
              action: 'Lead Architect',
              cursorMode: 'arrow',
              chatText: '✨ Built live, by a crowd of cursors!'
            },
            sarah: {
              x: c1Box.x + 20,
              y: c1Box.y - 14,
              color: '#FF7262',
              label: 'Sarah Lin',
              action: 'Grid 01-04 Verified ✓',
              toolKey: 'V Move',
              cursorMode: 'arrow',
              chatText: 'all 4 cards ready'
            },
            user: {
              x: c2Box.x + c2Box.w - 20,
              y: c4Box.y + c4Box.h + 20,
              color: '#1ABCFE',
              label: userName || 'You',
              action: 'Workspace Ready',
              toolKey: 'V Move',
              cursorMode: 'arrow',
              chatText: 'workspace assembled!'
            }
          };

          setWireframeData(null);

          setActiveGuides([
            {
              type: 'v',
              x1: gapX,
              y1: c1Box.y,
              x2: gapX,
              y2: c3Box.y + c3Box.h,
              color: '#ec4899',
              dashed: true,
              label: 'ΔX: 14px',
              pillText: 'ΔX: 14px Equal Gap',
              pillX: gapX,
              pillY: gapY - 18
            },
            {
              type: 'h',
              x1: c1Box.x,
              y1: gapY,
              x2: c2Box.x + c2Box.w,
              y2: gapY,
              color: '#ec4899',
              dashed: true,
              label: 'ΔY: 14px',
              pillText: 'ΔY: 14px Equal Gap',
              pillX: c1Box.x + c1Box.w / 2,
              pillY: gapY + 18
            }
          ]);
        }
      }
      // Rebuild complete! (elapsed >= 24.5s)
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
            className="swarm-blueprint-speed-btn" 
            onClick={handleToggleSpeed}
            title="Toggle playback speed (1.35x / 2.0x)"
          >
            ⚡ {speedMultiplier >= 1.8 ? '2.0x' : '1.35x'}
          </button>
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
