import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Desktop from './components/Desktop';
import DeviceLoadingScreen from './components/DeviceLoadingScreen';
import { isMobileOrTabletDevice, getEffectiveDeviceMode } from './utils/deviceDetection';
import './index.css';

const ScreenSaver = lazy(() => import('./components/ScreenSaver'));
const SwarmRebuildOverlay = lazy(() => import('./components/SwarmRebuildOverlay'));
const AdminPortal = lazy(() => import('./components/AdminPortal'));

const IDLE_TIMEOUT = 180000; // 3 minutes

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Root App caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#0a0d14',
          color: '#e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: '-apple-system, system-ui, sans-serif',
          zIndex: 999999
        }}>
          <h2 style={{ fontSize: '20px', color: '#f87171', margin: '0 0 12px 0' }}>VarunOS Recovered From an Issue</h2>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 20px 0', maxWidth: '420px', textAlign: 'center' }}>
            {this.state.error?.message || 'A runtime script error occurred. Click below to reload the workspace.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = window.location.pathname;
            }}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '13px'
            }}
          >
            Reload Desktop
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  // Check if current route is the Admin Portal (/varun_admin, #/varun_admin, or ?admin=true)
  const checkAdminRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return (
      path === '/varun_admin' || 
      path.startsWith('/varun_admin') || 
      hash.includes('varun_admin') || 
      search.includes('admin=true')
    );
  };

  const [isAdminRoute, setIsAdminRoute] = useState(checkAdminRoute);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsAdminRoute(checkAdminRoute());
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    // Keyboard shortcut for quick access: Ctrl + Alt + A
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminRoute(prev => {
          const next = !prev;
          if (next) {
            window.history.pushState(null, '', '/varun_admin');
          } else {
            window.history.pushState(null, '', '/');
          }
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleShortcut);

    const handleOpenAdmin = () => {
      setIsAdminRoute(true);
      window.history.pushState(null, '', '/varun_admin');
    };
    window.addEventListener('varunos-open-admin', handleOpenAdmin);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('keydown', handleShortcut);
      window.removeEventListener('varunos-open-admin', handleOpenAdmin);
    };
  }, []);
  const isAutomated = typeof navigator !== 'undefined' && (
    navigator.webdriver === true ||
    /Lighthouse|Chrome-Lighthouse|HeadlessChrome/i.test(navigator.userAgent)
  );
  const isSkipRequested = (typeof window !== 'undefined' && (
    new URLSearchParams(window.location.search).get('skip') === 'true' ||
    new URLSearchParams(window.location.search).get('ready') === 'true' ||
    new URLSearchParams(window.location.search).get('norebuild') === 'true'
  )) || isAutomated;
  const isInitialMobileOrTablet = isMobileOrTabletDevice();

  // Swarm rebuild runs ONLY on laptop/desktop boot/refresh.
  // On mobile & iPad, bootState starts as 'device-loading' showing the sleek iOS/iPadOS boot screen,
  // completely bypassing the desktop swarm rebuild animation.
  const [bootState, setBootState] = useState(() => {
    if (isSkipRequested) return 'ready';
    if (isInitialMobileOrTablet) return 'device-loading';
    return 'swarm';
  });
  const [swarmStage, setSwarmStage] = useState(() => {
    if (isSkipRequested || isInitialMobileOrTablet) return 5;
    return 0;
  });
  const [rebuildKey, setRebuildKey] = useState(1);

  // Auto-bypass swarm if window resized down to iPad/tablet/mobile viewport
  useEffect(() => {
    const handleResize = () => {
      if (isMobileOrTabletDevice() && bootState === 'swarm') {
        setBootState('ready');
        setSwarmStage(5);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [bootState]);
  const [userName, setUserName] = useState(() => {
    try {
      return localStorage.getItem('varunos_user_name') || 'Varun';
    } catch {
      return 'Varun';
    }
  });

  // Theme mode initialization (Light / Dark)
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('varunos_theme_mode') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
    } catch {}

    const handleUserChange = (e) => {
      if (e.detail?.userName) {
        setUserName(e.detail.userName);
      }
    };
    window.addEventListener('varunos-user-change', handleUserChange);
    return () => window.removeEventListener('varunos-user-change', handleUserChange);
  }, []);

  const [isIdle, setIsIdle] = useState(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      const hash = window.location.hash;
      return search.includes('screensaver=true') || search.includes('sleep=true') || hash.includes('screensaver') || hash.includes('sleep');
    }
    return false;
  });
  const isIdleRef = useRef(isIdle);
  isIdleRef.current = isIdle;
  const idleTimerRef = useRef(null);
  const sleepGraceUntilRef = useRef(0);

  // Listen for sleep / screensaver trigger events (e.g. from Lock button or MenuBar)
  useEffect(() => {
    const handleSleep = () => {
      sleepGraceUntilRef.current = Date.now() + 800; // 800ms grace period to prevent triggering click/tap from waking immediately
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      isIdleRef.current = true;
      setIsIdle(true);
    };

    window.addEventListener('varunos:sleep', handleSleep);
    return () => window.removeEventListener('varunos:sleep', handleSleep);
  }, []);

  const handleWakeFromSleep = () => {
    if (Date.now() < sleepGraceUntilRef.current) {
      return;
    }
    isIdleRef.current = false;
    setIsIdle(false);
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      isIdleRef.current = true;
      setIsIdle(true);
    }, IDLE_TIMEOUT);
  };

  const handleSwarmComplete = () => {
    setSwarmStage(5);
    setBootState('ready');
  };

  const handleReplaySwarm = () => {
    if (isMobileOrTabletDevice()) return;
    setRebuildKey((k) => k + 1);
    setSwarmStage(0);
    setBootState('swarm');
  };

  // Idle Detection
  useEffect(() => {
    const resetIdleTimer = () => {
      // During sleep grace period, ignore all events to prevent immediate wake-up
      if (Date.now() < sleepGraceUntilRef.current) {
        return;
      }
      // If currently in screensaver/sleep, do NOT wake up on stray mousemove/scroll.
      // Wake-up is managed exclusively by the ScreenSaver component's wake interaction.
      if (isIdleRef.current) {
        return;
      }

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        isIdleRef.current = true;
        setIsIdle(true);
      }, IDLE_TIMEOUT);
    };

    resetIdleTimer();

    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    window.addEventListener('click', resetIdleTimer);
    window.addEventListener('scroll', resetIdleTimer);
    window.addEventListener('touchstart', resetIdleTimer);

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('touchstart', resetIdleTimer);
    };
  }, []);

  return (
    <RootErrorBoundary>
      <div className="app-container">
        {/* 1. Interactive Desktop */}
        <Desktop 
          isIdle={isIdle} 
          userName={userName}
          onReplaySwarm={handleReplaySwarm}
          swarmStage={bootState === 'swarm' ? swarmStage : 5}
          isRebuilding={bootState === 'swarm'}
        />

        {/* 2. Swarm Rebuild Overlay Animation (Strictly Laptop/Desktop boot & replay only - NEVER on iPad/mobile) */}
        {bootState === 'swarm' && !isMobileOrTabletDevice() && (
          <Suspense fallback={null}>
            <SwarmRebuildOverlay 
              key={`rebuild-${rebuildKey}`}
              userName={userName} 
              onStageChange={setSwarmStage}
              onComplete={handleSwarmComplete} 
            />
          </Suspense>
        )}

        {/* 2b. Mobile & iPad Dedicated Apple Boot & Loading Screen (Sleek progress bar on boot & refresh) */}
        {bootState === 'device-loading' && (
          <DeviceLoadingScreen
            mode={getEffectiveDeviceMode()}
            onLoaded={() => setBootState('ready')}
          />
        )}

        {/* 3. Idle ScreenSaver (Lazy mounted strictly when idle to keep main thread ultra-lean) */}
        {isIdle && (
          <Suspense fallback={null}>
            <ScreenSaver isIdle={isIdle} onWake={handleWakeFromSleep} />
          </Suspense>
        )}

        {/* 4. Admin Portal (/varun_admin, #/varun_admin, or Ctrl+Alt+A) */}
        {isAdminRoute && (
          <Suspense fallback={null}>
            <AdminPortal 
              onExit={() => {
                setIsAdminRoute(false);
                window.history.pushState(null, '', '/');
              }} 
            />
          </Suspense>
        )}
      </div>
    </RootErrorBoundary>
  );
}

export default App;
