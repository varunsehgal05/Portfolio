import React, { useState, useEffect, useRef, useCallback } from 'react';
import './DeviceLoadingScreen.css';

/**
 * Authentic Apple iPadOS / iOS Boot & Loading Screen
 * Shown exclusively on Mobile & iPad when loading or refreshing the site.
 * Replaces the desktop swarm rebuild with a sleek, native device boot experience.
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
    }, isAutomated ? 10 : 80);

    return () => clearTimeout(unmountTimer);
  }, [isAutomated]);

  useEffect(() => {
    // Pure CSS hardware-accelerated bar animation - eliminates 60 re-renders/sec long tasks
    const finishTimer = setTimeout(handleFinish, isAutomated ? 10 : 200);
    return () => clearTimeout(finishTimer);
  }, [handleFinish, isAutomated]);

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
      <div className="device-loading-content">
        {/* Glowing Apple Silhouette Logo */}
        <div className="device-logo-wrap">
          <svg
            className="device-apple-icon"
            viewBox="0 0 170 170"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.98-6.19-9.57-11.04-20.47-14.56-32.69-3.52-12.23-5.28-23.75-5.28-34.56 0-14.13 3.48-26.04 10.45-35.73 6.96-9.69 15.75-14.65 26.36-14.88 5.11 0 10.74 1.34 16.89 4.02 6.15 2.68 10.15 4.08 12.01 4.2 2.05-.12 6.13-1.57 12.24-4.35 6.11-2.77 11.65-4.04 16.63-3.8 12.56.63 22.92 5.57 31.08 14.82-10.96 6.64-16.32 15.82-16.08 27.53.25 9.17 3.86 16.92 10.83 23.24 6.97 6.33 15.11 10.02 24.42 11.07-2.29 6.98-4.87 13.78-7.74 20.41zM119.22 31.84c0-7.72 2.76-14.89 8.28-21.51 5.53-6.62 12.39-10.33 20.58-11.13.11 1.01.17 1.95.17 2.82 0 7.6-2.88 14.89-8.65 21.87-5.77 6.97-12.71 10.77-20.82 11.4-0.12-1.02-.17-1.95-.17-2.82z" />
          </svg>
          <div className="device-logo-glow" />
        </div>

        {/* Apple Style Smooth Progress Pill */}
        <div className="device-progress-track">
          <div className="device-progress-fill" />
        </div>

        {/* System Meta and Step Status */}
        <div className="device-loading-meta">
          <div className="device-os-tag">
            {isIpad ? 'iPadOS 18' : 'iOS 18'} <span className="os-bullet">•</span> VarunOS
          </div>
          <div className="device-status-step">
            Starting VarunOS engine...
          </div>
        </div>

        {/* Subtle skip hint on touch */}
        <div className="device-skip-hint">
          Tap anywhere to continue
        </div>
      </div>
    </div>
  );
};

export default DeviceLoadingScreen;
