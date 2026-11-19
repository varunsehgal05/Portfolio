import { useState, useEffect } from 'react';
import './FigmaLoadingScreen.css';

/**
 * Authentic Figma App Loading Screen
 * Displays the official 5-piece Figma vector logo, gradient progress bar,
 * and realistic file & token loading stages before fading into the workspace.
 */
const FigmaLoadingScreen = ({
  fileName = 'Varun_Sehgal_Portfolio.fig',
  duration = 1400,
  onLoaded
}) => {
  const [phase, setPhase] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  const STATUS_STEPS = [
    'Opening file ' + fileName + '...',
    'Fetching design tokens & typography scale...',
    'Rendering canvas layers & components...',
    'Ready'
  ];

  useEffect(() => {
    // Step transitions
    const step1 = setTimeout(() => setPhase(1), duration * 0.32);
    const step2 = setTimeout(() => setPhase(2), duration * 0.68);
    const step3 = setTimeout(() => setPhase(3), duration * 0.95);

    // Fade out
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
      if (onLoaded) onLoaded();
    }, duration);

    // Unmount from DOM after transition
    const unmountTimer = setTimeout(() => {
      setIsUnmounted(true);
    }, duration + 420);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [duration, onLoaded]);

  if (isUnmounted) return null;

  return (
    <div className={`figma-loading-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      {/* Background Dot Matrix */}
      <div className="figma-loading-bg-dots" />

      {/* Atmospheric Glow */}
      <div className="figma-loading-glow" />

      <div className="figma-loading-content">
        {/* Authentic 5-Piece Figma Vector Brand Mark */}
        <svg
          className="figma-brand-logo-svg"
          viewBox="0 0 38 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. Top-Left: Orange #F24E1E */}
          <path
            d="M19 0H9.5C4.25 0 0 4.25 0 9.5S4.25 19 9.5 19H19V0Z"
            fill="#F24E1E"
          />
          {/* 2. Top-Right: Red #FF7262 */}
          <path
            d="M19 0H28.5C33.75 0 38 4.25 38 9.5S33.75 19 28.5 19H19V0Z"
            fill="#FF7262"
          />
          {/* 3. Middle-Left: Purple #A259FF */}
          <path
            d="M0 28.5C0 23.25 4.25 19 9.5 19H19V38H9.5C4.25 38 0 33.75 0 28.5Z"
            fill="#A259FF"
          />
          {/* 4. Middle-Right: Cyan Circle #1ABCFE */}
          <circle cx="28.5" cy="28.5" r="9.5" fill="#1ABCFE" />
          {/* 5. Bottom-Left: Green #0ACF83 */}
          <path
            d="M0 47.5C0 42.25 4.25 38 9.5 38H19V47.5C19 52.75 14.75 57 9.5 57S0 52.75 0 47.5Z"
            fill="#0ACF83"
          />
        </svg>

        {/* File Name Header */}
        <div className="figma-loading-filename">
          <span>{fileName}</span>
          <span className="figma-file-badge">FIG</span>
        </div>

        {/* Animated Progress Bar */}
        <div className="figma-loading-bar-wrap">
          <div className="figma-loading-bar-fill" />
        </div>

        {/* Dynamic Status Text */}
        <div className="figma-loading-status">
          {phase < 3 && <div className="figma-status-spinner" />}
          <span>{STATUS_STEPS[phase]}</span>
        </div>
      </div>

      <div className="figma-loading-meta">
        <span>Figma Desktop · Multi-Agent Canvas Engine</span>
      </div>
    </div>
  );
};

export default FigmaLoadingScreen;
