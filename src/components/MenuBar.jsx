import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Wifi, Battery, Search, RefreshCw, Sparkles, User, Power, Check } from 'lucide-react';
import './MenuBar.css';

const MenuBar = ({ userName = 'Guest', onReplaySwarm }) => {
  const [time, setTime] = useState(new Date());
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsAppleMenuOpen(false);
      }
    };
    if (isAppleMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAppleMenuOpen]);

  const handleRestart = () => {
    setIsAppleMenuOpen(false);
    window.location.reload();
  };

  const handleTriggerSwarm = () => {
    setIsAppleMenuOpen(false);
    if (onReplaySwarm) {
      onReplaySwarm();
    }
  };

  return (
    <div className="menu-bar">
      <div className="menu-left" ref={menuRef}>
        <span 
          className={`menu-item bold menu-brand-trigger ${isAppleMenuOpen ? 'active' : ''}`}
          onClick={() => setIsAppleMenuOpen(!isAppleMenuOpen)}
          title="VarunOS System Menu"
        >
          VarunOS
        </span>

        {/* VarunOS Menu Dropdown */}
        {isAppleMenuOpen && (
          <div className="apple-dropdown-menu">
            <div className="apple-dropdown-header">
              <span className="apple-dropdown-brand">VarunOS Sequoia 15.0</span>
              <span className="apple-dropdown-user">User: {userName}</span>
            </div>
            <div className="apple-dropdown-divider" />
            <button className="apple-dropdown-item primary-action" onClick={handleTriggerSwarm}>
              <Sparkles size={14} className="dropdown-icon sparkle-icon" />
              <span>Replay Swarm Rebuild</span>
              <span className="dropdown-shortcut">⌘R</span>
            </button>
            <div className="apple-dropdown-divider" />
            <button className="apple-dropdown-item" onClick={handleRestart}>
              <Power size={14} className="dropdown-icon" />
              <span>Restart & Reboot Setup...</span>
            </button>
          </div>
        )}

        <span className="menu-item">File</span>
        <span className="menu-item">Edit</span>
        <span className="menu-item">View</span>
        <span className="menu-item">Window</span>
        <span className="menu-item">Help</span>
      </div>
      
      <div className="menu-right">
        {/* Active Collaborator Pill */}
        <div 
          className="menu-user-presence" 
          title={`Signed in as ${userName} — Collaborative mode active`}
          onClick={handleTriggerSwarm}
        >
          <span className="presence-dot" />
          <User size={11} className="presence-icon" />
          <span className="presence-name">{userName}</span>
        </div>

        <button 
          className="menu-swarm-replay-btn" 
          onClick={handleTriggerSwarm} 
          title="Replay Swarm Rebuild Animation"
        >
          <Sparkles size={12} />
          <span>Swarm Rebuild</span>
        </button>

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
