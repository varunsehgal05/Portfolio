import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { isMobileOrTabletDevice } from '../utils/deviceDetection';
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
  Laptop,
  HelpCircle,
  Keyboard,
  Monitor,
  X,
  Layers,
  Compass,
  Mail,
  Minimize2,
  Maximize2
} from 'lucide-react';
import './MenuBar.css';

const PORTFOLIO_ROLES = [
  {
    id: 'designer',
    name: 'Designer',
    title: 'Lead UI/UX Designer',
    desc: 'Figma case studies, UX psychology & design systems',
    icon: '🎨',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.12)',
    app: 'figma'
  },
  {
    id: 'developer',
    name: 'Developer',
    title: 'Frontend & Full-Stack',
    desc: 'Interactive VS Code IDE, live code runner & clean code',
    icon: '💻',
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.12)',
    app: 'vscode'
  },
  {
    id: 'architect',
    name: 'Architect',
    title: 'Core Systems Architect',
    desc: 'Design tokens pipelines, component APIs & swarm engine',
    icon: '⚡',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.12)',
    app: 'settings'
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    title: 'Hiring Manager & Talent',
    desc: 'ATS tactile resume, experience timeline & quick contact',
    icon: '💼',
    color: '#10b981',
    bg: 'rgba(168, 185, 129, 0.12)',
    app: 'resume'
  },
  {
    id: 'visitor',
    name: 'Visitor',
    title: 'Guest Explorer',
    desc: 'General portfolio showcase & desktop easter eggs',
    icon: '👀',
    color: '#ec4899',
    bg: 'rgba(236, 72, 153, 0.12)',
    app: 'finder'
  }
];

const MenuBar = ({
  userName = 'Guest',
  onReplaySwarm,
  openWindows = [],
  minimizedWindows = [],
  activeWindow = null,
  portfolioApps = {},
  onOpenApp,
  onCloseApp,
  onFocusApp,
  onMinimizeApp,
  onMinimizeActive,
  onToggleMaximize,
  onMinimizeAll,
  onRestoreAll,
  onCloseAll,
  deviceModeOverride = 'auto',
  effectiveDeviceMode = 'desktop',
  onSetDeviceMode
}) => {
  const [time, setTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState(null); // 'apple', 'file', 'edit', 'view', 'window', 'help', 'wifi', 'battery', 'sound', 'calendar', 'user'
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [currentRole, setCurrentRole] = useState(() => {
    try {
      return localStorage.getItem('varunos_user_name') || userName || 'Designer';
    } catch {
      return userName || 'Designer';
    }
  });

  // HUD Toast State for seamless macOS Notifications (replaces ugly browser alert)
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  // Modal dialog states for System & Help menus
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpActiveTab, setHelpActiveTab] = useState('tour'); // 'tour' | 'shortcuts' | 'easter_eggs' | 'contact'

  const showToast = (title, subtitle = '', icon = '✓') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ title, subtitle, icon });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 2500);
  };

  const copyToClipboard = (text, title, subtitle, icon = '✓') => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    } catch (e) {
      console.warn('Clipboard write fallback', e);
    }
    showToast(title, subtitle, icon);
  };

  const handleSelectRole = (role) => {
    setActiveMenu(null);
    setCurrentRole(role.name);
    try {
      localStorage.setItem('varunos_user_name', role.name);
      localStorage.setItem('varunos_user_role', role.id);
    } catch { }
    window.dispatchEvent(new CustomEvent('varunos-user-change', { detail: { userName: role.name, roleId: role.id } }));
    if (role.app) {
      if (onOpenApp) {
        onOpenApp(role.app);
      } else {
        window.dispatchEvent(new CustomEvent('varunos-open-app', { detail: { appId: role.app } }));
      }
    }
  };

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

  // Handle ESC key to dismiss menus & modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setShowAboutModal(false);
        setShowHelpModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // External toast event listener
  useEffect(() => {
    const handleExternalToast = (e) => {
      if (e.detail?.title) {
        showToast(e.detail.title, e.detail.subtitle || '', e.detail.icon || '✓');
      }
    };
    window.addEventListener('varunos-show-toast', handleExternalToast);
    return () => window.removeEventListener('varunos-show-toast', handleExternalToast);
  }, []);

  const toggleMenu = (menuName) => {
    setActiveMenu(prev => (prev === menuName ? null : menuName));
  };

  const handleRestart = () => {
    setActiveMenu(null);
    window.location.reload();
  };

  const handleTriggerSwarm = () => {
    setActiveMenu(null);
    if (isMobileOrTabletDevice() || effectiveDeviceMode !== 'desktop') return;
    if (onReplaySwarm) {
      onReplaySwarm();
    }
    showToast("Swarm Rebuild Started", "Agents assembling workspace live", "✨");
  };

  // Swarm Follow Mouse State (defaults to false until user clicks Swarm Follow)
  const [isSwarmFollow, setIsSwarmFollow] = useState(() => {
    try {
      const saved = localStorage.getItem('varunos_swarm_follow_mouse');
      return saved === 'true';
    } catch {
      return false;
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
    } catch { }
    window.dispatchEvent(new CustomEvent('varunos-toggle-swarm-follow', { detail: { enabled: nextState } }));
    showToast(nextState ? "Swarm Follow Enabled" : "Swarm Follow Paused", nextState ? "Agents flock to cursor" : "Agents stay stationed", "✨");
  };

  const handleToggleTheme = () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(nextTheme);
    try {
      localStorage.setItem('varunos_theme_mode', nextTheme);
    } catch { }
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.dispatchEvent(new CustomEvent('varunos-theme-change', { detail: { mode: nextTheme } }));
    showToast(nextTheme === 'light' ? "Light Mode Active" : "Dark Mode Active", "Theme updated", nextTheme === 'light' ? "☀️" : "🌙");
  };

  // Open / Focus app helper
  const handleOpenAppItem = (appId) => {
    setActiveMenu(null);
    if (onOpenApp) {
      onOpenApp(appId);
    } else {
      window.dispatchEvent(new CustomEvent('varunos-open-app', { detail: { appId } }));
    }
  };

  // Focus specific open window
  const handleFocusWindowItem = (appId) => {
    setActiveMenu(null);
    if (minimizedWindows.includes(appId) && onMinimizeApp) {
      onMinimizeApp(appId); // Unminimizes
    }
    if (onFocusApp) {
      onFocusApp(appId);
    }
  };

  return (
    <div className="menu-bar" ref={menuBarRef}>
      {/* Floating macOS HUD Toast Pill (Non-blocking, elegant feedback) */}
      {toast && (
        <div className="menubar-hud-toast" role="status" aria-live="polite">
          <span className="menubar-hud-icon">{toast.icon}</span>
          <div className="menubar-hud-content">
            <span className="menubar-hud-title">{toast.title}</span>
            {toast.subtitle && <span className="menubar-hud-sub">{toast.subtitle}</span>}
          </div>
        </div>
      )}

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
              <button
                className="apple-dropdown-item"
                onClick={() => {
                  setActiveMenu(null);
                  setShowAboutModal(true);
                }}
              >
                <Monitor size={14} className="dropdown-icon" />
                <span>About VarunOS Sequoia...</span>
              </button>
              <button
                className="apple-dropdown-item"
                onClick={() => handleOpenAppItem('settings')}
              >
                <Sliders size={14} className="dropdown-icon" />
                <span>System Settings...</span>
              </button>
              {effectiveDeviceMode === 'desktop' && !isMobileOrTabletDevice() && (
                <>
                  <div className="apple-dropdown-divider" />
                  <button className="apple-dropdown-item primary-action" onClick={handleTriggerSwarm}>
                    <Sparkles size={14} className="dropdown-icon sparkle-icon" />
                    <span>Replay Swarm Rebuild</span>
                    <span className="dropdown-shortcut">⌘R</span>
                  </button>
                </>
              )}
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
              <button
                className="apple-dropdown-item"
                onClick={() => {
                  setActiveMenu(null);
                  window.open('https://github.com/varunsehgal05/Portfolio', '_blank');
                }}
              >
                <Code2 size={14} className="dropdown-icon" />
                <span>Source Code on GitHub</span>
                <span className="dropdown-shortcut">↗</span>
              </button>
              <div className="apple-dropdown-divider" />
              <button 
                className="apple-dropdown-item" 
                onClick={(e) => {
                  if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                  setActiveMenu(null);
                  window.dispatchEvent(new CustomEvent('varunos:sleep'));
                }}
              >
                <Moon size={14} className="dropdown-icon" />
                <span>Sleep / Screensaver</span>
                <span className="dropdown-shortcut">⌥⌘S</span>
              </button>
              <button className="apple-dropdown-item" onClick={handleRestart}>
                <Power size={14} className="dropdown-icon" />
                <span>Restart & Reboot Workspace...</span>
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
              <button
                className="apple-dropdown-item"
                onClick={() => {
                  setActiveMenu(null);
                  window.open('/Varun_Sehgal_Resume_Updated.pdf', '_blank');
                  showToast("Opened PDF", "Varun_Sehgal_Resume_Updated.pdf", "📄");
                }}
              >
                <FolderOpen size={14} className="dropdown-icon" />
                <span>Open Resume PDF</span>
                <span className="dropdown-shortcut">⌘O</span>
              </button>
              <button
                className="apple-dropdown-item"
                onClick={() => handleOpenAppItem('terminal')}
              >
                <Laptop size={14} className="dropdown-icon" />
                <span>New Terminal Session</span>
                <span className="dropdown-shortcut">⌥T</span>
              </button>
              {activeWindow && (
                <button
                  className="apple-dropdown-item"
                  onClick={() => {
                    setActiveMenu(null);
                    if (onCloseApp) onCloseApp(activeWindow);
                  }}
                >
                  <X size={14} className="dropdown-icon" />
                  <span>Close Window</span>
                  <span className="dropdown-shortcut">⌘W</span>
                </button>
              )}
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
              <button
                className="apple-dropdown-item"
                onClick={() => {
                  setActiveMenu(null);
                  copyToClipboard('varunsehgal2005@gmail.com', "Copied Varun's Email", "varunsehgal2005@gmail.com", "📋");
                }}
              >
                <Check size={14} className="dropdown-icon text-emerald-400" />
                <span>Copy Varun's Email</span>
                <span className="dropdown-shortcut">⌘C</span>
              </button>
              <button
                className="apple-dropdown-item"
                onClick={() => {
                  setActiveMenu(null);
                  copyToClipboard('https://www.linkedin.com/in/varunsehgal02', "Copied LinkedIn Link", "linkedin.com/in/varunsehgal02", "🔗");
                }}
              >
                <Check size={14} className="dropdown-icon text-cyan-400" />
                <span>Copy LinkedIn Link</span>
              </button>
              <button
                className="apple-dropdown-item"
                onClick={() => {
                  setActiveMenu(null);
                  copyToClipboard(window.location.href, "Copied Portfolio URL", window.location.href, "🌐");
                }}
              >
                <Check size={14} className="dropdown-icon text-purple-400" />
                <span>Copy Portfolio URL</span>
              </button>
              <button
                className="apple-dropdown-item"
                onClick={() => {
                  setActiveMenu(null);
                  copyToClipboard('https://github.com/varunsehgal05/Portfolio', "Copied GitHub Repo URL", "github.com/varunsehgal05/Portfolio", "💻");
                }}
              >
                <Check size={14} className="dropdown-icon text-amber-400" />
                <span>Copy GitHub Profile</span>
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
                <span>Toggle Full Screen</span>
                <span className="dropdown-shortcut">^⌘F</span>
              </button>
              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); handleToggleTheme(); }}>
                {currentTheme === 'light' ? <Moon size={14} className="dropdown-icon" /> : <Sun size={14} className="dropdown-icon" />}
                <span>Toggle {currentTheme === 'light' ? 'Dark' : 'Light'} Mode</span>
              </button>
              {effectiveDeviceMode === 'desktop' && !isMobileOrTabletDevice() && (
                <>
                  <div className="apple-dropdown-divider" />
                  <button className="apple-dropdown-item" onClick={handleTriggerSwarm}>
                    <Sparkles size={14} className="dropdown-icon sparkle-icon" />
                    <span>Re-run Swarm Physics</span>
                    <span className="dropdown-shortcut">⌘R</span>
                  </button>
                </>
              )}
              <button className="apple-dropdown-item" onClick={() => { setActiveMenu(null); handleToggleSwarmFollow(); }}>
                <Sparkles size={14} className="dropdown-icon text-sky-400" />
                <span>{isSwarmFollow ? "Turn Off Swarm Follow" : "Turn On Swarm Follow"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Window Menu - Fully Functional with Active App Controls & Dynamic App Stacking List */}
        <div className="menu-item-wrapper">
          <span
            className={`menu-item ${activeMenu === 'window' ? 'active' : ''}`}
            onClick={() => toggleMenu('window')}
          >
            Window
          </span>
          {activeMenu === 'window' && (
            <div className="apple-dropdown-menu sub-menu window-dropdown-menu">
              {/* Active Window Minimize */}
              <button
                className={`apple-dropdown-item ${!activeWindow ? 'disabled' : ''}`}
                onClick={() => {
                  if (!activeWindow) return;
                  setActiveMenu(null);
                  if (onMinimizeActive) {
                    onMinimizeActive();
                  } else if (onMinimizeApp) {
                    onMinimizeApp(activeWindow);
                  }
                  showToast("Minimized Window", activeWindow, "🗕");
                }}
                disabled={!activeWindow}
              >
                <Minimize2 size={14} className="dropdown-icon" />
                <span>Minimize</span>
                <span className="dropdown-shortcut">⌘M</span>
              </button>

              {/* Active Window Zoom/Maximize */}
              <button
                className={`apple-dropdown-item ${!activeWindow ? 'disabled' : ''}`}
                onClick={() => {
                  if (!activeWindow) return;
                  setActiveMenu(null);
                  if (onToggleMaximize) {
                    onToggleMaximize(activeWindow);
                  }
                  showToast("Toggled Window Zoom", activeWindow, "🗖");
                }}
                disabled={!activeWindow}
              >
                <Maximize2 size={14} className="dropdown-icon" />
                <span>Zoom Window</span>
              </button>

              <div className="apple-dropdown-divider" />

              {/* Minimize All */}
              <button
                className={`apple-dropdown-item ${openWindows.length === 0 ? 'disabled' : ''}`}
                onClick={() => {
                  if (openWindows.length === 0) return;
                  setActiveMenu(null);
                  if (onMinimizeAll) onMinimizeAll();
                  showToast("All Windows Minimized", "Desktop cleared", "🗕");
                }}
                disabled={openWindows.length === 0}
              >
                <span>Minimize All Windows</span>
                <span className="dropdown-shortcut">⌥⌘M</span>
              </button>

              {/* Bring All to Front / Restore All */}
              <button
                className="apple-dropdown-item"
                onClick={() => {
                  setActiveMenu(null);
                  if (onRestoreAll) onRestoreAll();
                  showToast("All Windows Restored", "Brought to front", "📂");
                }}
              >
                <span>Bring All to Front</span>
              </button>

              {/* Close All Windows */}
              <button
                className={`apple-dropdown-item ${openWindows.length === 0 ? 'disabled' : ''}`}
                onClick={() => {
                  if (openWindows.length === 0) return;
                  setActiveMenu(null);
                  if (onCloseAll) onCloseAll();
                  showToast("All Windows Closed", "Workspace reset", "✕");
                }}
                disabled={openWindows.length === 0}
              >
                <span>Close All Windows</span>
                <span className="dropdown-shortcut">⌥⌘W</span>
              </button>

              <div className="apple-dropdown-divider" />

              {/* Dynamic Open Windows Header & List */}
              <div className="dropdown-section-label">
                <span>OPEN WINDOWS ({openWindows.length})</span>
              </div>

              {openWindows.length === 0 ? (
                <div className="apple-dropdown-empty-item">
                  <span>No active windows</span>
                </div>
              ) : (
                <div className="window-items-container">
                  {openWindows.map((appId) => {
                    const app = portfolioApps[appId] || { name: appId, icon: '📁' };
                    const isActive = activeWindow === appId && !minimizedWindows.includes(appId);
                    const isMin = minimizedWindows.includes(appId);
                    return (
                      <button
                        key={appId}
                        className={`apple-dropdown-item window-stack-item ${isActive ? 'active-app' : ''}`}
                        onClick={() => handleFocusWindowItem(appId)}
                      >
                        <span className="window-stack-check">{isActive ? '✓' : ''}</span>
                        <span className="window-stack-icon">{app.icon}</span>
                        <span className="window-stack-name">{app.name}</span>
                        {isMin && <span className="window-stack-tag">minimized</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Help Menu - Interactive Help Center & Shortcuts Tour */}
        <div className="menu-item-wrapper">
          <span
            className={`menu-item ${activeMenu === 'help' ? 'active' : ''}`}
            onClick={() => toggleMenu('help')}
          >
            Help
          </span>
          {activeMenu === 'help' && (
            <div className="apple-dropdown-menu sub-menu help-dropdown-menu">
              <button
                className="apple-dropdown-item primary-action"
                onClick={() => {
                  setActiveMenu(null);
                  setHelpActiveTab('tour');
                  setShowHelpModal(true);
                }}
              >
                <HelpCircle size={14} className="dropdown-icon text-cyan-400" />
                <span>VarunOS Help Center & Tour</span>
              </button>

              <button
                className="apple-dropdown-item"
                onClick={() => {
                  setActiveMenu(null);
                  setHelpActiveTab('shortcuts');
                  setShowHelpModal(true);
                }}
              >
                <Keyboard size={14} className="dropdown-icon text-purple-400" />
                <span>Keyboard Shortcuts Guide</span>
                <span className="dropdown-shortcut">⌘/</span>
              </button>

              <button
                className="apple-dropdown-item"
                onClick={() => {
                  setActiveMenu(null);
                  setHelpActiveTab('easter_eggs');
                  setShowHelpModal(true);
                }}
              >
                <Sparkles size={14} className="dropdown-icon text-amber-400" />
                <span>Portfolio Easter Eggs & Tips</span>
              </button>

              <div className="apple-dropdown-divider" />

              <button
                className="apple-dropdown-item"
                onClick={() => {
                  setActiveMenu(null);
                  setShowAboutModal(true);
                }}
              >
                <Monitor size={14} className="dropdown-icon text-blue-400" />
                <span>Hardware & System Specs</span>
              </button>

              {effectiveDeviceMode === 'desktop' && !isMobileOrTabletDevice() && (
                <button className="apple-dropdown-item" onClick={handleTriggerSwarm}>
                  <Sparkles size={14} className="dropdown-icon sparkle-icon" />
                  <span>Replay Swarm Rebuild</span>
                  <span className="dropdown-shortcut">⌘R</span>
                </button>
              )}

              <div className="apple-dropdown-divider" />

              <button
                className="apple-dropdown-item"
                onClick={() => {
                  setActiveMenu(null);
                  window.open('https://www.linkedin.com/in/varunsehgal02', '_blank');
                  showToast("Opening LinkedIn", "varunsehgal02", "↗");
                }}
              >
                <ExternalLink size={14} className="dropdown-icon text-blue-400" />
                <span>Contact Varun on LinkedIn</span>
                <span className="dropdown-shortcut">↗</span>
              </button>

              <button
                className="apple-dropdown-item"
                onClick={() => {
                  setActiveMenu(null);
                  window.open('mailto:varunsehgal2005@gmail.com');
                  showToast("Opening Mail Client", "varunsehgal2005@gmail.com", "✉");
                }}
              >
                <Mail size={14} className="dropdown-icon text-emerald-400" />
                <span>Send Email to Varun</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="menu-right">
        {/* Active Collaborator / Role Switcher Popover */}
        <div className="menu-item-wrapper">
          <div
            role="button"
            tabIndex={0}
            className={`menu-user-presence ${activeMenu === 'user' ? 'active' : ''}`}
            title={`Active Perspective: ${currentRole} — Click to Switch Role`}
            aria-label={currentRole}
            onClick={() => toggleMenu('user')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu('user'); } }}
          >
            <span className="presence-dot" />
            <User size={11} className="presence-icon" />
            <span className="presence-name">{currentRole}</span>
          </div>

          {activeMenu === 'user' && (
            <div className="apple-dropdown-menu right-aligned role-switcher-dropdown">
              <div className="role-switcher-header">
                <div className="role-switcher-title-row">
                  <span className="role-header-sparkle">✨</span>
                  <span className="role-switcher-title">Switch Portfolio Perspective</span>
                </div>
                <p className="role-switcher-sub">Select how you want to experience VarunOS</p>
              </div>

              <div className="apple-dropdown-divider" />

              <div className="role-options-list">
                {PORTFOLIO_ROLES.map((role) => {
                  const isSelected = (currentRole || 'Designer').toLowerCase() === role.name.toLowerCase();
                  return (
                    <button
                      key={role.id}
                      type="button"
                      className={`role-option-item ${isSelected ? 'active' : ''}`}
                      onClick={() => handleSelectRole(role)}
                    >
                      <span className="role-option-emoji">{role.icon}</span>
                      <div className="role-option-info">
                        <div className="role-option-top">
                          <span className="role-option-name">{role.name}</span>
                          <span
                            className="role-option-badge"
                            style={{ color: role.color, background: role.bg }}
                          >
                            {role.title}
                          </span>
                        </div>
                        <span className="role-option-desc">{role.desc}</span>
                      </div>
                      {isSelected && <Check size={14} className="role-option-check text-cyan-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Swarm Rebuild Trigger - STRICTLY Laptop/Desktop Only (Removed for mobile and iPad) */}
        {effectiveDeviceMode === 'desktop' && !isMobileOrTabletDevice() && (
          <button
            className="menu-swarm-replay-btn"
            aria-label="Swarm Rebuild"
            onClick={handleTriggerSwarm}
            title="Replay Swarm Rebuild Animation"
          >
            <Sparkles size={12} />
            <span>Swarm Rebuild</span>
          </button>
        )}

        {/* Quick Light/Dark Mode Switcher */}
        <button
          className="menu-icon-btn theme-toggle-btn"
          aria-label={currentTheme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
          onClick={handleToggleTheme}
          title={currentTheme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {currentTheme === 'light' ? <Sun size={13} /> : <Moon size={13} />}
        </button>

        {/* Functional Sound / Volume */}
        <div className="menu-item-wrapper">
          <button
            className={`menu-icon-btn ${activeMenu === 'sound' ? 'active' : ''}`}
            aria-label={`Sound Volume: ${isMuted ? 'Muted' : `${volume}%`}`}
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
                  aria-label="Toggle sound mute"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  aria-label="Volume level slider"
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
            aria-label="Wi-Fi Connection Settings"
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
            aria-label="Battery Status: 100% Fully Charged"
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
            role="button"
            tabIndex={0}
            aria-label={format(time, 'EEE MMM d  h:mm a')}
            onClick={() => toggleMenu('calendar')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleMenu('calendar'); }}
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

      {/* About VarunOS Modal Dialog (macOS Sequoia Style) */}
      {showAboutModal && (
        <div className="varunos-modal-backdrop" onClick={() => setShowAboutModal(false)}>
          <div className="varunos-about-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="about-window-traffic-lights">
              <span className="traffic-dot close-dot" onClick={() => setShowAboutModal(false)} />
              <span className="traffic-dot min-dot" />
              <span className="traffic-dot max-dot" />
            </div>

            <div className="about-dialog-body">
              <div className="about-os-icon-wrap">
                <div className="about-os-logo-halo" />
                <div className="about-os-logo"></div>
              </div>

              <div className="about-os-details">
                <h2 className="about-os-title">VarunOS Sequoia</h2>
                <div className="about-os-version">Version 15.2 (Build 24B83)</div>
                <div className="about-author-badge">Designed & Engineered by Varun Sehgal</div>

                <div className="about-specs-table">
                  <div className="about-spec-row">
                    <span className="about-spec-label">Designer</span>
                    <span className="about-spec-val">Varun Sehgal (Lead UI/UX & Product Designer)</span>
                  </div>
                  <div className="about-spec-row">
                    <span className="about-spec-label">Chip</span>
                    <span className="about-spec-val">Apple M3 Max (16-core CPU, 40-core GPU)</span>
                  </div>
                  <div className="about-spec-row">
                    <span className="about-spec-label">Swarm Engine</span>
                    <span className="about-spec-val">Califa Multi-Agent Physics (60 FPS Vector Math)</span>
                  </div>
                  <div className="about-spec-row">
                    <span className="about-spec-label">Memory</span>
                    <span className="about-spec-val">36 GB Unified LPDDR5</span>
                  </div>
                  <div className="about-spec-row">
                    <span className="about-spec-label">Stack</span>
                    <span className="about-spec-val">React 18 + Vite + Tailwind/OKLCH + Framer Motion</span>
                  </div>
                </div>

                <div className="about-actions-row">
                  <button
                    className="about-action-btn primary"
                    onClick={() => {
                      setShowAboutModal(false);
                      setShowHelpModal(true);
                      setHelpActiveTab('tour');
                    }}
                  >
                    System Tour & Help...
                  </button>
                  <button
                    className="about-action-btn"
                    onClick={() => {
                      setShowAboutModal(false);
                      window.open('https://www.linkedin.com/in/varunsehgal02', '_blank');
                    }}
                  >
                    Varun's LinkedIn ↗
                  </button>
                  <button
                    className="about-action-btn"
                    onClick={() => setShowAboutModal(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VarunOS Help Center Modal Dialog */}
      {showHelpModal && (
        <div className="varunos-modal-backdrop" onClick={() => setShowHelpModal(false)}>
          <div className="varunos-help-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="help-dialog-header">
              <div className="help-window-traffic-lights">
                <span className="traffic-dot close-dot" onClick={() => setShowHelpModal(false)} />
                <span className="traffic-dot min-dot" />
                <span className="traffic-dot max-dot" />
              </div>
              <div className="help-dialog-title">
                <HelpCircle size={15} className="text-cyan-400" />
                <span>VarunOS Help Center & Interactive Guide</span>
              </div>
              <button className="help-close-btn" onClick={() => setShowHelpModal(false)}>
                <X size={14} />
              </button>
            </div>

            <div className="help-dialog-nav">
              <button
                className={`help-nav-pill ${helpActiveTab === 'tour' ? 'active' : ''}`}
                onClick={() => setHelpActiveTab('tour')}
              >
                <Compass size={13} />
                <span>Desktop Tour</span>
              </button>
              <button
                className={`help-nav-pill ${helpActiveTab === 'shortcuts' ? 'active' : ''}`}
                onClick={() => setHelpActiveTab('shortcuts')}
              >
                <Keyboard size={13} />
                <span>Keyboard Shortcuts</span>
              </button>
              <button
                className={`help-nav-pill ${helpActiveTab === 'easter_eggs' ? 'active' : ''}`}
                onClick={() => setHelpActiveTab('easter_eggs')}
              >
                <Sparkles size={13} />
                <span>Features & Easter Eggs</span>
              </button>
              <button
                className={`help-nav-pill ${helpActiveTab === 'contact' ? 'active' : ''}`}
                onClick={() => setHelpActiveTab('contact')}
              >
                <Mail size={13} />
                <span>Contact & Connect</span>
              </button>
            </div>

            <div className="help-dialog-content">
              {helpActiveTab === 'tour' && (
                <div className="help-tab-pane">
                  <h3 className="help-section-title">Welcome to Varun Sehgal's Interactive macOS Portfolio</h3>
                  <p className="help-section-intro">
                    VarunOS transforms traditional static portfolio design into an interactive operating system with real multi-agent swarms, editable Figma prototypes, and live code environments.
                  </p>

                  <div className="help-cards-grid">
                    <div className="help-card" onClick={() => handleOpenAppItem('figma')}>
                      <div className="help-card-header">
                        <span className="help-card-icon">🎨</span>
                        <h4>Figma Case Studies & Systems</h4>
                      </div>
                      <p>Explore production UI/UX case studies: EventFlow campus ticketing, FigJam friction boards, interactive design system tokens, and auto-layout frames.</p>
                      <span className="help-card-link">Open Figma App →</span>
                    </div>

                    <div className="help-card" onClick={() => handleOpenAppItem('vscode')}>
                      <div className="help-card-header">
                        <span className="help-card-icon">💻</span>
                        <h4>VS Code IDE Studio</h4>
                      </div>
                      <p>Browse full source code for Varun's production projects, run live code snippets, and explore frontend architecture with monaco syntax highlighting.</p>
                      <span className="help-card-link">Open VS Code IDE →</span>
                    </div>

                    <div className="help-card" onClick={() => handleOpenAppItem('resume')}>
                      <div className="help-card-header">
                        <span className="help-card-icon">📄</span>
                        <h4>Tactile ATS Notebook Resume</h4>
                      </div>
                      <p>Interactive lined notebook resume with sticky notes, career milestones, live experience timeline, and downloadable ATS PDF.</p>
                      <span className="help-card-link">Open Resume App →</span>
                    </div>

                    <div className="help-card" onClick={() => handleOpenAppItem('terminal')}>
                      <div className="help-card-header">
                        <span className="help-card-icon">⌨️</span>
                        <h4>Unix zsh Terminal</h4>
                      </div>
                      <p>Fully functional command-line terminal with neofetch, skills, projects, contact, and custom wallpaper switching commands.</p>
                      <span className="help-card-link">Open Terminal →</span>
                    </div>

                    <div className="help-card" onClick={() => handleOpenAppItem('trash')}>
                      <div className="help-card-header">
                        <span className="help-card-icon">🗑️</span>
                        <h4>Trash & AI Sentinel</h4>
                      </div>
                      <p>Humorous design graveyard guarded by VarunOS AI Sentinel: node_modules black hole, imposter_syndrome.exe, and final_v2_FINAL.fig.</p>
                      <span className="help-card-link">Open Trash Can →</span>
                    </div>

                    <div className="help-card" onClick={handleTriggerSwarm}>
                      <div className="help-card-header">
                        <span className="help-card-icon">✨</span>
                        <h4>Swarm Rebuild Engine</h4>
                      </div>
                      <p>Watch 4 AI swarm agents (Alex, Varun, Elena, Sarah) collaborate in real-time: placing frames, typing copy letter-by-letter, and wiring tokens.</p>
                      <span className="help-card-link">Replay Swarm Rebuild →</span>
                    </div>
                  </div>
                </div>
              )}

              {helpActiveTab === 'shortcuts' && (
                <div className="help-tab-pane">
                  <h3 className="help-section-title">VarunOS Keyboard Shortcuts Cheat Sheet</h3>
                  <p className="help-section-intro">Use these macOS keyboard shortcuts for rapid navigation and productivity.</p>

                  <div className="shortcuts-table">
                    <div className="shortcut-row">
                      <div className="shortcut-keys">
                        <kbd>⌥</kbd> + <kbd>1</kbd> .. <kbd>5</kbd>
                      </div>
                      <div className="shortcut-desc">
                        <strong>Switch Desktop Wallpapers</strong>
                        <span>Instantly crossfade between Sequoia Dark, Minecraft Sunset, Cyberpunk, and Dynamic backdrops.</span>
                      </div>
                    </div>

                    <div className="shortcut-row">
                      <div className="shortcut-keys">
                        <kbd>⌘</kbd> + <kbd>M</kbd>
                      </div>
                      <div className="shortcut-desc">
                        <strong>Minimize Active Window</strong>
                        <span>Minimizes currently focused app window to dock.</span>
                      </div>
                    </div>

                    <div className="shortcut-row">
                      <div className="shortcut-keys">
                        <kbd>⌥</kbd> + <kbd>⌘</kbd> + <kbd>M</kbd>
                      </div>
                      <div className="shortcut-desc">
                        <strong>Minimize All Windows</strong>
                        <span>Minimizes all open workspace windows to reveal clean desktop.</span>
                      </div>
                    </div>

                    <div className="shortcut-row">
                      <div className="shortcut-keys">
                        <kbd>⌘</kbd> + <kbd>W</kbd>
                      </div>
                      <div className="shortcut-desc">
                        <strong>Close Active Window</strong>
                        <span>Closes the active app window cleanly.</span>
                      </div>
                    </div>

                    <div className="shortcut-row">
                      <div className="shortcut-keys">
                        <kbd>⌘</kbd> + <kbd>R</kbd>
                      </div>
                      <div className="shortcut-desc">
                        <strong>Replay Swarm Rebuild</strong>
                        <span>Triggers the collaborative multi-agent assembly animation.</span>
                      </div>
                    </div>

                    <div className="shortcut-row">
                      <div className="shortcut-keys">
                        <kbd>^</kbd> + <kbd>⌘</kbd> + <kbd>F</kbd>
                      </div>
                      <div className="shortcut-desc">
                        <strong>Toggle Full Screen</strong>
                        <span>Expands browser viewport to authentic native fullscreen mode.</span>
                      </div>
                    </div>

                    <div className="shortcut-row">
                      <div className="shortcut-keys">
                        <kbd>Esc</kbd>
                      </div>
                      <div className="shortcut-desc">
                        <strong>Dismiss Menus & Modals</strong>
                        <span>Instantly closes any open dropdowns or help modals.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {helpActiveTab === 'easter_eggs' && (
                <div className="help-tab-pane">
                  <h3 className="help-section-title">VarunOS Interactive Features & Easter Eggs</h3>

                  <div className="tips-list">
                    <div className="tip-item">
                      <span className="tip-badge">Perspective Switcher</span>
                      <p>Click on the role badge in the top-right menubar (Designer, Developer, Architect, Recruiter, Visitor) to tailor the experience to your exact needs.</p>
                    </div>

                    <div className="tip-item">
                      <span className="tip-badge">Live Sound & Spatial Audio</span>
                      <p>Open the volume control in the top-right menubar to adjust spatial audio volume or mute system sound effects.</p>
                    </div>

                    <div className="tip-item">
                      <span className="tip-badge">Battery & Wi-Fi Telemetry</span>
                      <p>Inspect the top-right Wi-Fi 6E network specs and 96W USB-C battery health monitor in real-time.</p>
                    </div>

                    <div className="tip-item">
                      <span className="tip-badge">Swarm Mouse Flocking</span>
                      <p>Notice the two AI swarm agents following your cursor around the desktop? Click the "Swarm Follow: ON" button in the menubar anytime to toggle mouse flocking.</p>
                    </div>

                    <div className="tip-item">
                      <span className="tip-badge">Clippy Smart Recommendations</span>
                      <p>Our friendly Microsoft Clippy assistant appears occasionally with contextual recommendations. Tips auto-dismiss after 3 seconds or when clicked.</p>
                    </div>
                  </div>
                </div>
              )}

              {helpActiveTab === 'contact' && (
                <div className="help-tab-pane">
                  <h3 className="help-section-title">Get In Touch with Varun Sehgal</h3>
                  <p className="help-section-intro">Looking for a product designer, UI/UX specialist, or design systems engineer? Let's connect!</p>

                  <div className="contact-methods-grid">
                    <div className="contact-channel-card">
                      <div className="contact-channel-header">
                        <span className="channel-icon">💼</span>
                        <div>
                          <h4>LinkedIn</h4>
                          <span className="channel-sub">Professional Network & Recommendations</span>
                        </div>
                      </div>
                      <div className="channel-action-row">
                        <button
                          className="channel-action-btn primary"
                          onClick={() => window.open('https://www.linkedin.com/in/varunsehgal02', '_blank')}
                        >
                          Visit LinkedIn Profile ↗
                        </button>
                        <button
                          className="channel-action-btn"
                          onClick={() => copyToClipboard('https://www.linkedin.com/in/varunsehgal02', "Copied LinkedIn Link", "linkedin.com/in/varunsehgal02", "🔗")}
                        >
                          Copy Link
                        </button>
                      </div>
                    </div>

                    <div className="contact-channel-card">
                      <div className="contact-channel-header">
                        <span className="channel-icon">✉️</span>
                        <div>
                          <h4>Email</h4>
                          <span className="channel-sub">varunsehgal2005@gmail.com</span>
                        </div>
                      </div>
                      <div className="channel-action-row">
                        <button
                          className="channel-action-btn primary"
                          onClick={() => window.open('mailto:varunsehgal2005@gmail.com')}
                        >
                          Send Email Direct ✉
                        </button>
                        <button
                          className="channel-action-btn"
                          onClick={() => copyToClipboard('varunsehgal2005@gmail.com', "Copied Email Address", "varunsehgal2005@gmail.com", "📋")}
                        >
                          Copy Email
                        </button>
                      </div>
                    </div>

                    <div className="contact-channel-card">
                      <div className="contact-channel-header">
                        <span className="channel-icon">💻</span>
                        <div>
                          <h4>GitHub</h4>
                          <span className="channel-sub">github.com/varunsehgal05</span>
                        </div>
                      </div>
                      <div className="channel-action-row">
                        <button
                          className="channel-action-btn primary"
                          onClick={() => window.open('https://github.com/varunsehgal05', '_blank')}
                        >
                          View GitHub Repos ↗
                        </button>
                        <button
                          className="channel-action-btn"
                          onClick={() => copyToClipboard('https://github.com/varunsehgal05', "Copied GitHub Profile", "github.com/varunsehgal05", "💻")}
                        >
                          Copy URL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="help-dialog-footer">
              <span className="help-footer-status">VarunOS Help Center • Sequoia 15.2 Active</span>
              <button className="help-footer-close" onClick={() => setShowHelpModal(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
