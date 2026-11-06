import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Wifi, Battery, Search } from 'lucide-react';
import './MenuBar.css';

const AppleIcon = () => (
  <svg width="13" height="15" viewBox="0 0 170 170" fill="currentColor">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.97-14.42-6.53-9.97-11.53-21.2-15-33.7-3.48-12.5-5.22-24.1-5.22-34.8 0-14.58 3.7-26.65 11.1-36.2 7.4-9.56 16.94-14.46 28.62-14.7 4.7 0 10.05 1.25 16.06 3.75 6 2.5 10.06 3.8 12.18 3.9 1.62 0 5.68-1.32 12.18-3.96 6.5-2.65 11.83-3.88 15.99-3.7 11.1.6 20.35 4.8 27.75 12.6-9.87 5.98-14.7 14.18-14.5 24.6.2 8.1 3.23 14.9 9.1 20.4 5.86 5.5 12.87 8.7 21.03 9.6-2.24 6.8-5.06 13.7-8.47 20.7zM119.22 31.84c0-7.3 2.65-14.07 7.95-20.31 5.3-6.24 11.85-10.15 19.65-11.53.22 1.34.33 2.68.33 4.02 0 7.42-2.73 14.28-8.19 20.58-5.46 6.3-12.02 10.12-19.68 11.46-.04-1.42-.06-2.82-.06-4.22z"/>
  </svg>
);

const MenuBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="menu-bar">
      <div className="menu-left">
        <div className="menu-apple-logo">
          <AppleIcon />
        </div>
        <span className="menu-item bold">VarunOS</span>
        <span className="menu-item">File</span>
        <span className="menu-item">Edit</span>
        <span className="menu-item">View</span>
        <span className="menu-item">Window</span>
        <span className="menu-item">Help</span>
      </div>
      
      <div className="menu-right">
        <span className="menu-sound-icon">(s)</span>
        <Wifi size={13} className="menu-icon" />
        <Battery size={15} className="menu-icon" />
        <Search size={13} className="menu-icon" />
        <span className="menu-time">{format(time, 'EEE MMM d  h:mm a')}</span>
      </div>
    </div>
  );
};

export default MenuBar;
