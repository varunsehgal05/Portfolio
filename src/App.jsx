import { useState, useEffect, useRef } from 'react';
import Desktop from './components/Desktop';
import ScreenSaver from './components/ScreenSaver';
import './index.css';

const IDLE_TIMEOUT = 180000; // 3 minutes

function App() {
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef(null);

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
      <Desktop isIdle={isIdle} />
      <ScreenSaver isIdle={isIdle} onWake={() => setIsIdle(false)} />
    </div>
  );
}

export default App;
