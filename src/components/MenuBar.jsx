import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { 
  Wifi, 
  Battery, 
  Sparkles, 
  User, 
  Power, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Calendar as CalendarIcon, 
  Check, 
  ExternalLink,
  Code2,
  FolderOpen,
  Eye,
  Info,
  Sun,
  Moon,
  Coffee,
  Shield,
  Laptop
} from 'lucide-react';
import './MenuBar.css';

const MenuBar = ({ userName = 'Guest', onReplaySwarm }) => {
  const [time, setTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState(null); // 'apple', 'file', 'edit', 'view', 'window', 'help', 'wifi', 'battery', 'sound', 'calendar'
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const menuBarRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    if (activeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenu]);

  const toggleMenu = (menuName) => {
    setActiveMenu(prev => (prev === menuName ? null : menuName));
  };

  const handleRestart = () => {
    setActiveMenu(null);
    window.location.reload();
  };

  const handleTriggerSwarm = () => {
    setActiveMenu(null);
    if (onReplaySwarm) {
      onReplaySwarm();
    }
  };

  // Swarm Follow Mouse State (defaults to true)
  const [isSwarmFollow, setIsSwarmFollow] = useState(() => {
    try {
      const saved = localStorage.getItem('varunos_swarm_follow_mouse');
      return saved === null ? true : saved === 'true';
    } catch {
      return true;
    }
  });

  // Current Theme (Light / Dark)
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      return localStorage.getItem('varunos_theme_mode') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const handleSwarmToggle = (e) => {
      if (typeof e.detail?.enabled === 'boolean') {
        setIsSwarmFollow(e.detail.enabled);
      }
    };
    const handleThemeChange = (e) => {
      if (e.detail?.mode) {
        setCurrentTheme(e.detail.mode);
      }
    };
    window.addEventListener('varunos-toggle-swarm-follow', handleSwarmToggle);
    window.addEventListener('varunos-theme-change', handleThemeChange);
    return () => {
      window.removeEventListener('varunos-toggle-swarm-follow', handleSwarmToggle);
      window.removeEventListener('varunos-theme-change', handleThemeChange);
    };
  }, []);

  const handleToggleSwarmFollow = () => {
    const nextState = !isSwarmFollow;
    setIsSwarmFollow(nextState);
    try {
      localStorage.setItem('varunos_swarm_follow_mouse', String(nextState));
    } catch {}
    window.dispatchEvent(new CustomEvent('varunos-toggle-swarm-follow', { detail: { enabled: nextState } }));
  };

  const handleToggleTheme = () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(nextTheme);
    try {
      localStorage.setItem('varunos_theme_mode', nextTheme);
    } catch {}
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.dispatchEvent(new CustomEvent('varunos-theme-change', { detail: { mode: nextTheme } }));
  };

  return (
    <div className="menu-bar" ref={menuBarRef}>
      <div className="menu-left">
        {/* Apple / VarunOS System Trigger */}
        <div className="menu-item-wrapper">
          <span 
            className={`menu-item bold menu-brand-trigger ${activeMenu === 'apple' ? 'active' : ''}`}
            onClick={() => toggleMenu('apple')}
            title="VarunOS System Menu"
          >
            VarunOS
          </span>

          {activeMenu === 'apple' && (
            <div className="apple-dropdown-menu">
              <div className="apple-dropdown-header">
                <span className="apple-dropdown-brand">VarunOS Sequoia 15.2</span>
                <span className="apple-dropdown-user">User: {userName}</span>
              </div>
              <div className="apple-dropdown-divider" />
              <button className="apple-dropdown-item primary-action" onClick={handleTriggerSwarm}>
                <Sparkles size={14} className="dropdown-icon sparkle-icon" />
                <span>Replay Swarm Rebuild</span>
                <span className="dropdown-shortcut">⌘R</span>
              </button>
              <div className="apple-dropdown-divider" />
              <button 
                className="apple-dropdown-item coffee-action-item" 
                onClick={() => {
                  setActiveMenu(null);
                  window.dispatchEvent(new CustomEvent('varunos-open-coffee-modal'));
                }}
              >
                <Coffee size={14} className="dropdown-icon coffee-gold" />
                <span>☕ Buy Varun a Coffee / Donate...</span>
                <span className="dropdown-shortcut">UPI QR</span>
              </button>
              <div className="apple-dropdown-divider" />
              <button className="apple-dropdown-item" onClick={() => window.open('https://github.com/varunsehgal05/Portfolio', '_blank')}>
                <Code2 size={14} className="dropdown-icon" />
                <span>Source Code on GitHub</span>
                <span className="dropdown-shortcut">↗</span>
              </button>
              <div className="apple-dropdown-divider" />
              <button className="apple-dropdown-item" onClick={handleRestart}>
                <Power size={14} className="dropdown-icon" />
                <span>Restart & Reboot Setup...</span>
              </button>
            </div>
          )}
        </div>

        {/* File Menu */}
        <div className="menu-item-wrapper">
          <span 
            className={`menu-item ${activeMenu === 'file' ? 'active' : ''}`}
            onClick={() => toggleMenu('file')}
          >
            File
          </span>
          {activeMenu === 'file' && (
            <div className="apple-dropdown-menu sub-menu">
              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); window.open('/Varun_Sehgal_Resume_Updated.pdf', '_blank'); }}>
                <FolderOpen size={14} className="dropdown-icon" />
                <span>Open Resume PDF</span>
                <span className="dropdown-shortcut">⌘O</span>
              </button>
              <div className="apple-dropdown-divider" />
              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); window.location.reload(); }}>
                <Power size={14} className="dropdown-icon" />
                <span>Refresh Desktop</span>
                <span className="dropdown-shortcut">F5</span>
              </button>
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div className="menu-item-wrapper">
          <span 
            className={`menu-item ${activeMenu === 'edit' ? 'active' : ''}`}
            onClick={() => toggleMenu('edit')}
          >
            Edit
          </span>
          {activeMenu === 'edit' && (
            <div className="apple-dropdown-menu sub-menu">
              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); navigator.clipboard.writeText('varunsehgal2005@gmail.com'); alert('Copied Varun\'s email to clipboard!'); }}>
                <Check size={14} className="dropdown-icon" />
                <span>Copy Varun's Email</span>
                <span className="dropdown-shortcut">⌘C</span>
              </button>
              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); navigator.clipboard.writeText('https://www.linkedin.com/in/varunsehgal02'); alert('Copied LinkedIn URL to clipboard!'); }}>
                <Check size={14} className="dropdown-icon" />
                <span>Copy LinkedIn Link</span>
              </button>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div className="menu-item-wrapper">
          <span 
            className={`menu-item ${activeMenu === 'view' ? 'active' : ''}`}
            onClick={() => toggleMenu('view')}
          >
            View
          </span>
          {activeMenu === 'view' && (
            <div className="apple-dropdown-menu sub-menu">
              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); document.fullscreenElement ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.(); }}>
                <Eye size={14} className="dropdown-icon" />
                <span>Toggle Browser Full Screen</span>
                <span className="dropdown-shortcut">^⌘F</span>
              </button>
              <div className="apple-dropdown-divider" />
              <button className="apple-dropdown-item" onClick={handleTriggerSwarm}>
                <Sparkles size={14} className="dropdown-icon sparkle-icon" />
                <span>Re-run Swarm Physics</span>
              </button>
            </div>
          )}
        </div>

        {/* Window Menu */}
        <div className="menu-item-wrapper">
          <span 
            className={`menu-item ${activeMenu === 'window' ? 'active' : ''}`}
            onClick={() => toggleMenu('window')}
          >
            Window
          </span>
          {activeMenu === 'window' && (
            <div className="apple-dropdown-menu sub-menu">
              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); window.dispatchEvent(new CustomEvent('varunos:minimize-all')); }}>
                <span>Minimize All Windows</span>
                <span className="dropdown-shortcut">⌘M</span>
              </button>
              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); window.dispatchEvent(new CustomEvent('varunos:restore-all')); }}>
                <span>Bring All to Front</span>
              </button>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="menu-item-wrapper">
          <span 
            className={`menu-item ${activeMenu === 'help' ? 'active' : ''}`}
            onClick={() => toggleMenu('help')}
          >
            Help
          </span>
          {activeMenu === 'help' && (
            <div className="apple-dropdown-menu sub-menu">
              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); window.open('https://www.linkedin.com/in/varunsehgal02', '_blank'); }}>
                <ExternalLink size={14} className="dropdown-icon" />
                <span>Contact Varun on LinkedIn</span>
              </button>
              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); window.open('mailto:varunsehgal2005@gmail.com'); }}>
                <Info size={14} className="dropdown-icon" />
                <span>Send Email to Varun</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="menu-right">
        {/* Active Collaborator / User Profile Dropdown (Option 1) */}
        <div className="menu-item-wrapper">
          <div 
            className={`menu-user-presence ${activeMenu === 'user' ? 'active' : ''}`}
            title={`Account: ${userName} (Lead Designer) — Click for Profile & Settings`}
            onClick={() => toggleMenu('user')}
          >
            <span className="presence-dot" />
            <User size={11} className="presence-icon" />
            <span className="presence-name">{userName}</span>
          </div>

          {activeMenu === 'user' && (
            <div className="apple-dropdown-menu right-aligned user-profile-dropdown">
              <div className="user-profile-header">
                <div className="user-avatar-badge">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="user-profile-info">
                  <div className="user-profile-name-row">
                    <span className="user-full-name">{userName === 'Designer' ? 'Varun Sehgal' : userName}</span>
                    <span className="user-verified-badge">PRO</span>
                  </div>
                  <span className="user-role-badge">Lead UI/UX & Product Designer</span>
                  <span className="user-session-meta">🟢 Active • macOS Sequoia M3 Max</span>
                </div>
              </div>

              <div className="dropdown-divider" />

              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); window.dispatchEvent(new CustomEvent('varunos-open-app', { detail: { appId: 'settings' } })); }}>
                <Sliders size={14} className="dropdown-icon" />
                <span>System Settings</span>
              </button>

              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); window.dispatchEvent(new CustomEvent('varunos-open-app', { detail: { appId: 'contact' } })); }}>
                <Info size={14} className="dropdown-icon" />
                <span>Varun Sehgal Contact Card</span>
              </button>

              <button className="apple-dropdown-item" onClick={() => { 
                setActiveMenu(null); 
                const newName = prompt('Enter collaborator name:', userName);
                if (newName && newName.trim()) {
                  localStorage.setItem('varunos_user_name', newName.trim());
                  window.location.reload();
                }
              }}>
                <User size={14} className="dropdown-icon" />
                <span>Switch User / Rename ({userName})</span>
              </button>

              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); window.dispatchEvent(new CustomEvent('varunos-open-coffee-modal')); }}>
                <Coffee size={14} className="dropdown-icon" />
                <span>Support via UPI QR / Coffee</span>
              </button>

              <div className="dropdown-divider" />

              <button className="apple-dropdown-item text-danger" onClick={() => { setActiveMenu(null); window.location.reload(); }}>
                <Power size={14} className="dropdown-icon" />
                <span>Lock / Reload Session</span>
              </button>
            </div>
          )}
        </div>

        <button 
          className="menu-swarm-replay-btn" 
          onClick={handleTriggerSwarm} 
          title="Replay Swarm Rebuild Animation"
        >
          <Sparkles size={12} />
          <span>Swarm Rebuild</span>
        </button>

        {/* Quick Califa Swarm Follow Toggle */}
        <button 
          className={`menu-swarm-follow-btn ${isSwarmFollow ? 'active' : ''}`}
          onClick={handleToggleSwarmFollow} 
          title={isSwarmFollow ? "Swarm Mouse Following: Active (Click to Disable)" : "Swarm Mouse Following: Inactive (Click to Enable)"}
        >
          <Sparkles size={11} />
          <span>{isSwarmFollow ? "Swarm Follow: ON" : "Swarm Follow"}</span>
        </button>


        {/* Quick Light/Dark Mode Switcher */}
        <button
          className="menu-icon-btn theme-toggle-btn"
          onClick={handleToggleTheme}
          title={currentTheme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {currentTheme === 'light' ? <Sun size={13} /> : <Moon size={13} />}
        </button>

        {/* Functional Sound / Volume */}
        <div className="menu-item-wrapper">
          <button 
            className={`menu-icon-btn ${activeMenu === 'sound' ? 'active' : ''}`}
            onClick={() => toggleMenu('sound')}
            title={`Sound: ${isMuted ? 'Muted' : `${volume}%`}`}
          >
            {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          {activeMenu === 'sound' && (
            <div className="apple-dropdown-menu right-aligned sound-popup">
              <div className="sound-popup-header">
                <span>Sound Output</span>
                <span className="sound-vol-label">{isMuted ? 'Muted' : `${volume}%`}</span>
              </div>
              <div className="sound-slider-row">
                <button 
                  className="sound-mute-toggle"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  className="sound-range-slider"
                />
              </div>
              <div className="sound-device-row">
                <span className="device-name">✓ MacBook Pro Speakers (Spatial Audio)</span>
              </div>
            </div>
          )}
        </div>

        {/* Functional Wi-Fi */}
        <div className="menu-item-wrapper">
          <button 
            className={`menu-icon-btn ${activeMenu === 'wifi' ? 'active' : ''}`}
            onClick={() => toggleMenu('wifi')}
            title="Wi-Fi: Connected to VarunOS-5G (Wi-Fi 6E)"
          >
            <Wifi size={13} className="menu-icon" />
          </button>
          {activeMenu === 'wifi' && (
            <div className="apple-dropdown-menu right-aligned wifi-popup">
              <div className="wifi-status-row">
                <div className="wifi-network-info">
                  <strong>VarunOS-5G</strong>
                  <span className="wifi-meta">Wi-Fi 6E • 866 Mbps • Signal: Excellent</span>
                </div>
                <span className="wifi-connected-pill">Connected</span>
              </div>
              <div className="apple-dropdown-divider" />
              <div className="wifi-details-item">
                <span className="text-zinc-400">IP Address:</span>
                <span>192.168.1.42</span>
              </div>
              <div className="wifi-details-item">
                <span className="text-zinc-400">Router:</span>
                <span>192.168.1.1 (WPA3 Enterprise)</span>
              </div>
            </div>
          )}
        </div>

        {/* Functional Battery */}
        <div className="menu-item-wrapper">
          <button 
            className={`menu-icon-btn ${activeMenu === 'battery' ? 'active' : ''}`}
            onClick={() => toggleMenu('battery')}
            title="Battery: 100% (Power Adapter Connected)"
          >
            <Battery size={15} className="menu-icon" />
          </button>
          {activeMenu === 'battery' && (
            <div className="apple-dropdown-menu right-aligned battery-popup">
              <div className="battery-header-row">
                <strong>Battery: 100%</strong>
                <span className="battery-charged-pill">Fully Charged</span>
              </div>
              <div className="apple-dropdown-divider" />
              <div className="battery-meta-item">
                <span>Power Source:</span>
                <strong className="text-emerald-400">Power Adapter (USB-C 96W)</strong>
              </div>
              <div className="battery-meta-item">
                <span>Health:</span>
                <span className="text-zinc-300">Normal (Cycle Count: 14)</span>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Clock & Calendar */}
        <div className="menu-item-wrapper">
          <span 
            className={`menu-time ${activeMenu === 'calendar' ? 'active' : ''}`}
            onClick={() => toggleMenu('calendar')}
            title="Click to view Date & Calendar"
          >
            {format(time, 'EEE MMM d  h:mm a')}
          </span>
          {activeMenu === 'calendar' && (
            <div className="apple-dropdown-menu right-aligned calendar-popup">
              <div className="calendar-popup-header">
                <CalendarIcon size={14} className="text-sky-400" />
                <strong>{format(time, 'MMMM yyyy')}</strong>
              </div>
              <div className="calendar-day-headline">
                {format(time, 'EEEE, MMMM d, yyyy')}
              </div>
              <div className="calendar-clock-digital">
                {format(time, 'h:mm:ss a')}
              </div>
              <div className="apple-dropdown-divider" />
              <div className="calendar-event-item">
                <span className="event-dot" />
                <span>VarunOS Portfolio Showcase • Active</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
