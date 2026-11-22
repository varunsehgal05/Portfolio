import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Desktop from './components/Desktop';
import ScreenSaver from './components/ScreenSaver';
import './index.css';

const SwarmRebuildOverlay = lazy(() => import('./components/SwarmRebuildOverlay'));

const IDLE_TIMEOUT = 180000; // 3 minutes

function App() {
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

  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef(null);

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

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
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
    </div>
  );
}

export default App;
