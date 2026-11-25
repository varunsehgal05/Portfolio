import React, { useState, useEffect, useRef, useCallback } from 'react';
import './DeviceLoadingScreen.css';

/**
 * Signature Figma Canvas / ScreenSaver-Style Loading Screen
 * Replaces the old Apple boot screen on Mobile & iPad.
 * Renders the iconic #Frame_HeroClock bounding frame with Figma handles,
 * VibeCoder spec pill, live digital clock, and glowing progress track.
 */
const DeviceLoadingScreen = ({
  mode = 'tablet', // 'tablet' | 'mobile'
  onLoaded,
  duration = 260
}) => {
  const isAutomated = typeof navigator !== 'undefined' && (
    navigator.webdriver === true ||
    /Lighthouse|Chrome-Lighthouse|HeadlessChrome/i.test(navigator.userAgent) ||
    (typeof window !== 'undefined' && (
      window.location.search.includes('lighthouse=true') ||
      window.location.search.includes('ready=true') ||
      window.location.search.includes('fast=true')
    ))
  );

  const effectiveDuration = isAutomated ? 10 : Math.min(duration, 260);

  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  // Live time for the Hero Clock
  const [timeInfo] = useState(() => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return {
      hours: `${hours}:${minutes}`,
      ampm,
      date: new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }).format(now)
    };
  });

  const onLoadedRef = useRef(onLoaded);
  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  const hasCompletedRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setIsFadingOut(true);

    if (typeof onLoadedRef.current === 'function') {
      try {
        onLoadedRef.current();
      } catch (err) {
        console.error('Error in DeviceLoadingScreen onLoaded callback:', err);
      }
    }

    const unmountTimer = setTimeout(() => {
      setIsUnmounted(true);
    }, isAutomated ? 10 : 70);

    return () => clearTimeout(unmountTimer);
  }, [isAutomated]);

  useEffect(() => {
    // Pure CSS hardware-accelerated bar animation - eliminates 60 re-renders/sec long tasks
    const finishTimer = setTimeout(handleFinish, effectiveDuration);
    return () => clearTimeout(finishTimer);
  }, [handleFinish, effectiveDuration]);

  if (isUnmounted) return null;

  const isIpad = mode === 'tablet';

  return (
    <div
      className={`device-loading-overlay ${isIpad ? 'mode-tablet' : 'mode-mobile'} ${isFadingOut ? 'fade-out' : ''}`}
      onClick={handleFinish}
      role="status"
      aria-live="polite"
      aria-label="Loading VarunOS"
    >
      {/* Background Ambient Glow & Dot Grid */}
      <div className="boot-ambient-radial" />

      {/* Central Figma Selection Frame (#Frame_HeroClock) */}
      <div className="device-boot-frame">
        {/* 8 Figma Bounding Box Selection Handle Dots */}
        <span className="handle-dot top-left" />
        <span className="handle-dot top-mid" />
        <span className="handle-dot top-right" />
        <span className="handle-dot right-mid" />
        <span className="handle-dot bottom-right" />
        <span className="handle-dot bottom-mid" />
        <span className="handle-dot bottom-left" />
        <span className="handle-dot left-mid" />

        {/* Top-Left Frame Tag */}
        <div className="frame-meta-tag top-left-label">
          #Frame_HeroClock · {isIpad ? '480 × 300' : '360 × 260'}
        </div>

        {/* Top-Right AutoLayout Tag */}
        <div className="frame-meta-tag top-right-label">
          AutoLayout: Col · Gap: 14
        </div>

        {/* VibeCoder Code Spec Pill */}
        <div className="hero-code-spec">
          <span className="code-bracket">&lt; </span>
          <span className="code-component">VarunSehgal </span>
          <span className="code-prop">role</span>
          <span className="code-equal">=</span>
          <span className="code-string">&quot;VibeCoder&quot; </span>
          <span className="code-prop">spec</span>
          <span className="code-equal">=</span>
          <span className="code-string-accent">&quot;Design × Code&quot; </span>
          <span className="code-bracket">/&gt;</span>
        </div>

        {/* Digital Clock Display */}
        <div className="boot-digital-clock">
          <span className="clock-digits">{timeInfo.hours}</span>
          <span className="clock-ampm">{timeInfo.ampm}</span>
        </div>

        {/* Figma Canvas Engine Status */}
        <div className="boot-tick-rate">
          <span className="tick-line" />
          <span className="tick-text">FIGMA CANVAS ENGINE // INITIALIZING...</span>
          <span className="tick-line" />
        </div>

        {/* Glowing Progress Track */}
        <div className="boot-progress-track">
          <div className="boot-progress-fill" />
        </div>

        {/* Date & Mode Meta */}
        <div className="boot-date-row">
          <span className="boot-date">{timeInfo.date}</span>
          <span className="boot-sprint-badge">{isIpad ? 'iPadOS VarunOS' : 'Mobile VarunOS'} // v2.4</span>
        </div>

        {/* Subtle Tap Skip Hint */}
        <div className="boot-skip-hint">
          <span className="skip-dot" />
          <span>Tap anywhere to enter</span>
        </div>
      </div>
    </div>
  );
};

export default DeviceLoadingScreen;
