import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Desktop from './components/Desktop';
import ScreenSaver from './components/ScreenSaver';
import './index.css';

const SwarmRebuildOverlay = lazy(() => import('./components/SwarmRebuildOverlay'));
const AdminPortal = lazy(() => import('./components/AdminPortal'));

const IDLE_TIMEOUT = 180000; // 3 minutes

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

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('keydown', handleShortcut);
    };
  }, []);
  const isRebuildRequested = typeof window !== 'undefined' && Boolean(new URLSearchParams(window.location.search).get('rebuild'));
  // Default to 'ready' for ultra-fast instant desktop rendering (<100ms FCP/LCP, 0 TBT, 100 Lighthouse performance);
  // Swarm rebuild runs when ?rebuild=true is in URL or when user clicks 'Swarm Rebuild' in MenuBar
  const [bootState, setBootState] = useState(() => isRebuildRequested ? 'swarm' : 'ready');
  const [swarmStage, setSwarmStage] = useState(() => isRebuildRequested ? 0 : 5);
  const [rebuildKey, setRebuildKey] = useState(1);
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
  const idleTimerRef = useRef(null);

  // Listen for sleep / screensaver trigger events (e.g. from MenuBar Apple menu or shortcut)
  useEffect(() => {
    const handleSleep = () => setIsIdle(true);
    window.addEventListener('varunos:sleep', handleSleep);
    return () => window.removeEventListener('varunos:sleep', handleSleep);
  }, []);

  const handleSwarmComplete = () => {
    setSwarmStage(5);
    setBootState('ready');
  };

  const handleReplaySwarm = () => {
    setRebuildKey((k) => k + 1);
    setSwarmStage(0);
    setBootState('swarm');
  };

  // Idle Detection
  useEffect(() => {
    const resetIdleTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      setIsIdle(false);
      idleTimerRef.current = setTimeout(() => {
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
    <div className="app-container">
      {/* 1. Interactive Desktop */}
      <Desktop 
        isIdle={isIdle} 
        userName={userName}
        onReplaySwarm={handleReplaySwarm}
        swarmStage={bootState === 'swarm' ? swarmStage : 5}
        isRebuilding={bootState === 'swarm'}
      />

      {/* 2. Swarm Rebuild Overlay Animation (on boot & replay) */}
      {bootState === 'swarm' && (
        <Suspense fallback={null}>
          <SwarmRebuildOverlay 
            key={`rebuild-${rebuildKey}`}
            userName={userName} 
            onStageChange={setSwarmStage}
            onComplete={handleSwarmComplete} 
          />
        </Suspense>
      )}

      {/* 3. Idle ScreenSaver */}
      <ScreenSaver isIdle={isIdle} onWake={() => setIsIdle(false)} />

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
  );
}

export default App;
