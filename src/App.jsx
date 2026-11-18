import { useState, useEffect, useRef } from 'react';
import Desktop from './components/Desktop';
import ScreenSaver from './components/ScreenSaver';
import SwarmRebuildOverlay from './components/SwarmRebuildOverlay';
import './index.css';

const IDLE_TIMEOUT = 180000; // 3 minutes

function App() {
  const [bootState, setBootState] = useState('swarm'); // starts in swarm mode on reload
  const [swarmStage, setSwarmStage] = useState(0); // 0 (blank/blueprint) to 5 (complete)
  const [userName, setUserName] = useState(() => {
    try {
      return localStorage.getItem('varunos_user_name') || 'Varun';
    } catch {
      return 'Varun';
    }
  });

  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef(null);

  const handleSwarmComplete = () => {
    setSwarmStage(5);
    setBootState('ready');
  };

  const handleReplaySwarm = () => {
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
      />

      {/* 2. Swarm Rebuild Overlay Animation (when replayed) */}
      {bootState === 'swarm' && (
        <SwarmRebuildOverlay 
          userName={userName} 
          onStageChange={setSwarmStage}
          onComplete={handleSwarmComplete} 
        />
      )}

      {/* 3. Idle ScreenSaver */}
      <ScreenSaver isIdle={isIdle} onWake={() => setIsIdle(false)} />
    </div>
  );
}

export default App;
