import { useState, useEffect, useRef } from 'react';
import Desktop from './components/Desktop';
import ScreenSaver from './components/ScreenSaver';
import MacBootScreen from './components/MacBootScreen';
import SwarmRebuildOverlay from './components/SwarmRebuildOverlay';
import './index.css';

const IDLE_TIMEOUT = 180000; // 3 minutes

function App() {
  const [bootState, setBootState] = useState('booting'); // 'booting' | 'swarm' | 'ready'
  const [userName, setUserName] = useState(() => {
    try {
      return localStorage.getItem('varunos_user_name') || '';
    } catch {
      return '';
    }
  });

  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef(null);

  const handleBootComplete = (enteredName) => {
    setUserName(enteredName);
    setBootState('swarm');
  };

  const handleSwarmComplete = () => {
    setBootState('ready');
  };

  const handleReplaySwarm = () => {
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

    // Initial setup
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
      {/* 1. macOS Apple Boot Screen & Setup Assistant */}
      {bootState === 'booting' && (
        <MacBootScreen onComplete={handleBootComplete} />
      )}

      {/* 2. Interactive Desktop (mounted during swarm and ready phases) */}
      {bootState !== 'booting' && (
        <Desktop 
          isIdle={isIdle} 
          userName={userName}
          onReplaySwarm={handleReplaySwarm}
        />
      )}

      {/* 3. Swarm Rebuild Overlay Animation */}
      {bootState === 'swarm' && (
        <SwarmRebuildOverlay 
          userName={userName} 
          onComplete={handleSwarmComplete} 
        />
      )}

      {/* 4. Idle ScreenSaver */}
      <ScreenSaver isIdle={isIdle} onWake={() => setIsIdle(false)} />
    </div>
  );
}

export default App;
