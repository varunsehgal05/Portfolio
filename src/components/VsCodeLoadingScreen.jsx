import { useState, useEffect, useRef, useCallback } from 'react';
import './VsCodeLoadingScreen.css';

/**
 * Authentic Visual Studio Code App Loading Screen
 * Displays the iconic VS Code blue ribbon mark, glowing progress line,
 * and realistic LSP & extension initialization stages before fading into the IDE.
 * Guaranteed never to hang or get trapped in re-render loops.
 */
const VsCodeLoadingScreen = ({
  workspaceName = 'destop-portfolio',
  duration = 750,
  onLoaded
}) => {
  const [phase, setPhase] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  const onLoadedRef = useRef(onLoaded);
  useEffect(() => {
    onLoadedRef.current = onLoaded;
  });

  const hasEndedRef = useRef(false);

  const STATUS_STEPS = [
    'Initializing Visual Studio Code v1.94...',
    'Starting Language Server Protocol (TypeScript 5.4.2)...',
    'Loading workspace extensions & AST cache...',
    'Restoring editor splits & terminal sessions...',
    'Ready'
  ];

  const completeLoading = useCallback(() => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    setPhase(4);
    setIsFadingOut(true);

    if (typeof onLoadedRef.current === 'function') {
      try {
        onLoadedRef.current();
      } catch (err) {
        console.error('Error in VsCodeLoadingScreen onLoaded callback:', err);
      }
    }

    const unmountTimer = setTimeout(() => {
      setIsUnmounted(true);
    }, 280);

    return () => clearTimeout(unmountTimer);
  }, []);

  useEffect(() => {
    // Step transitions
    const step1 = setTimeout(() => setPhase(1), Math.min(180, duration * 0.25));
    const step2 = setTimeout(() => setPhase(2), Math.min(380, duration * 0.52));
    const step3 = setTimeout(() => setPhase(3), Math.min(560, duration * 0.78));
    const step4 = setTimeout(() => setPhase(4), Math.min(700, duration * 0.95));

    // Finish fade out
    const fadeTimer = setTimeout(() => {
      completeLoading();
    }, duration);

    // Hard fallback safety timer (unconditional reveal)
    const fallbackTimer = setTimeout(() => {
      completeLoading();
    }, duration + 600);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        completeLoading();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
      clearTimeout(fadeTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [duration, completeLoading]);

  if (isUnmounted) return null;

  return (
    <div
      className={`vscode-loading-overlay ${isFadingOut ? 'fade-out' : ''}`}
      onClick={completeLoading}
      title="Click anywhere to skip loading"
    >
      {/* Background Code Line Matrix */}
      <div className="vscode-loading-bg-grid" />

      {/* Atmospheric Electric Blue Glow */}
      <div className="vscode-loading-glow" />

      <div className="vscode-loading-content">
        {/* Official 3D Visual Studio Code Ribbon Brand Mark */}
        <div className="vscode-logo-wrap">
          <svg
            className="vscode-brand-logo-svg"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="vsBlueBase" x1="12%" y1="18%" x2="88%" y2="82%">
                <stop offset="0%" stopColor="#0065A9" />
                <stop offset="100%" stopColor="#004D80" />
              </linearGradient>
              <linearGradient id="vsBlueMid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1F8AD2" />
                <stop offset="100%" stopColor="#007ACC" />
              </linearGradient>
              <linearGradient id="vsBlueHighlight" x1="0%" y1="30%" x2="100%" y2="70%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#0098FF" />
                <stop offset="100%" stopColor="#007ACC" />
              </linearGradient>
            </defs>

            {/* Left Wing / Base */}
            <path
              d="M71 96L95 83.5C97.5 82.2 99 79.6 99 76.8V23.2C99 20.4 97.5 17.8 95 16.5L71 4C68.6 2.7 65.7 3 63.6 4.7L28.5 33.8L13.8 22.5C12 21.1 9.5 21 7.6 22.2L2.5 25.5C1.5 26.2.9 27.3 1 28.5C1.1 29.7 1.9 30.7 3 31.1L20.5 38.8L3 46.5C1.9 46.9 1.1 47.9 1 49.1C.9 50.3 1.5 51.4 2.5 52.1L7.6 55.4C9.5 56.6 12 56.5 13.8 55.1L28.5 43.8L63.6 72.9C65.7 74.6 68.6 74.9 71 73.6Z"
              fill="url(#vsBlueBase)"
            />

            {/* Folding Main Body */}
            <path
              d="M71 96C69.6 96 68.2 95.6 67 94.7L28.5 63.2L38.2 55.6L71 82.5V17.5L38.2 44.4L28.5 36.8L67 5.3C69.1 3.6 72 3.3 74.4 4.6L95 15.5C97.5 16.8 99 19.4 99 22.2V77.8C99 80.6 97.5 83.2 95 84.5L74.4 95.4C73.3 95.8 72.1 96 71 96Z"
              fill="url(#vsBlueMid)"
            />

            {/* Right Outer Ribbon Edge (Bright Highlight) */}
            <path
              d="M71 96L95 83.5C97.5 82.2 99 79.6 99 76.8V23.2C99 20.4 97.5 17.8 95 16.5L71 4V96Z"
              fill="url(#vsBlueHighlight)"
            />
          </svg>
        </div>

        {/* Workspace Title Header */}
        <div className="vscode-loading-header">
          <span className="vscode-workspace-name">{workspaceName}</span>
          <span className="vscode-workspace-badge">WORKSPACE</span>
        </div>

        {/* Animated Electric Blue Progress Bar */}
        <div className="vscode-loading-bar-wrap">
          <div className="vscode-loading-bar-fill" />
        </div>

        {/* Dynamic Status Text */}
        <div className="vscode-loading-status">
          {phase < 4 && <div className="vscode-status-spinner" />}
          <span>{STATUS_STEPS[phase]}</span>
        </div>
      </div>

      <div className="vscode-loading-meta">
        <span>Visual Studio Code · Microsoft Code OSS · V8 Engine</span>
        <span className="vscode-skip-hint">(click to skip)</span>
      </div>
    </div>
  );
};

export default VsCodeLoadingScreen;
