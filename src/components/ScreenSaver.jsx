import { useState, useEffect } from 'react';
import './ScreenSaver.css';

const ScreenSaver = ({ isIdle, onWake }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle any key or click to wake
  useEffect(() => {
    if (!isIdle) return; // Only listen for wake events when active

    const handleWake = () => {
      onWake();
    };
    
    // Slight delay to prevent immediate re-waking if triggered by the same click that caused idle (unlikely but safe)
    const timeout = setTimeout(() => {
      window.addEventListener('keydown', handleWake);
      window.addEventListener('mousemove', handleWake);
      window.addEventListener('click', handleWake);
    }, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('keydown', handleWake);
      window.removeEventListener('mousemove', handleWake);
      window.removeEventListener('click', handleWake);
    };
  }, [isIdle, onWake]);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className={`screensaver ${isIdle ? 'active' : ''}`}>
      <div className="screensaver-content">
        <h1 className="os-name">Varun Sehgal</h1>
        <div className="time-display">{formattedTime}</div>
        <div className="date-display">{formattedDate}</div>
        <div className="wake-badge">
          <span className="wake-icon">⌨</span> Press any key to wake up
        </div>
      </div>
    </div>
  );
};

export default ScreenSaver;
