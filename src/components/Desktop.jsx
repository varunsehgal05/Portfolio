import { useState, useEffect, useRef } from 'react';
import MenuBar from './MenuBar';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Dock from './Dock';
import PixelAssistant from './PixelAssistant';
import { portfolioApps, desktopIconIds } from '../config/apps';
import { desktopWallpapers } from '../config/wallpapers';
import LiveMouseSwarm from './LiveMouseSwarm';
import './Desktop.css';

const Desktop = ({ isIdle, userName = 'Guest', onReplaySwarm, swarmStage = 5 }) => {
  const [openWindows, setOpenWindows] = useState(['finder']);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState('finder');
  const [maximizedWindows, setMaximizedWindows] = useState([]);

  const toggleMaximizeWindow = (appId) => {
    setMaximizedWindows(prev =>
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  // Full-screen window detection: when a full screen window is active and not minimized
  const isFullScreenActive = Boolean(
    activeWindow &&
    maximizedWindows.includes(activeWindow) &&
    !minimizedWindows.includes(activeWindow)
  );

  useEffect(() => {
    if (isFullScreenActive) {
      document.body.classList.add('has-fullscreen-window');
    } else {
      document.body.classList.remove('has-fullscreen-window');
    }
    return () => {
      document.body.classList.remove('has-fullscreen-window');
    };
  }, [isFullScreenActive]);

  // Apps that should open in full screen by default
  const FULLSCREEN_APPS = ['figma', 'vscode', 'safari'];
  const [bouncingApp, setBouncingApp] = useState(null);

  // Active desktop wallpaper state (persisted in localStorage, defaults to Sequoia Midnight)
  const [activeWallpaperId, setActiveWallpaperId] = useState(() => {
    try {
      const saved = localStorage.getItem('varunos_desktop_wallpaper');
      if (saved && desktopWallpapers.some(w => w.id === saved)) {
        return saved;
      }
      return 'default';
    } catch {
      return 'default';
    }
  });
  const [prevWallpaper, setPrevWallpaper] = useState(null);
  const [isWpTransitioning, setIsWpTransitioning] = useState(false);
  const wpTransitionTimerRef = useRef(null);
  const [wallpaperToast, setWallpaperToast] = useState(null);

  // Live Califa Swarm Mouse Flocking State (defaults to active so users immediately experience Califa swarm)
  const [isSwarmFollowEnabled, setIsSwarmFollowEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('varunos_swarm_follow_mouse');
      return saved === null ? true : saved === 'true';
    } catch {
      return true;
    }
  });

  // Global Buy Me a Coffee App Launcher (Opens windowed CoffeeApp)
  useEffect(() => {
    const handleOpenCoffee = () => openApp('coffee');
    window.addEventListener('varunos-open-coffee-modal', handleOpenCoffee);
    return () => {
      window.removeEventListener('varunos-open-coffee-modal', handleOpenCoffee);
    };
  }, [openWindows, minimizedWindows]);

  useEffect(() => {
    const handleSwarmFollowToggle = (e) => {
      if (typeof e.detail?.enabled === 'boolean') {
        setIsSwarmFollowEnabled(e.detail.enabled);
      }
    };
    window.addEventListener('varunos-toggle-swarm-follow', handleSwarmFollowToggle);
    return () => window.removeEventListener('varunos-toggle-swarm-follow', handleSwarmFollowToggle);
  }, []);

  const applyDesktopWallpaper = (id, showToast = false) => {
    const found = desktopWallpapers.find(w => w.id === id) || desktopWallpapers[0];
    if (found.id === activeWallpaperId && !isWpTransitioning) return;

    const currentWp = desktopWallpapers.find(w => w.id === activeWallpaperId) || desktopWallpapers[0];

    if (wpTransitionTimerRef.current) {
      clearTimeout(wpTransitionTimerRef.current);
    }

    setPrevWallpaper(currentWp);
    setActiveWallpaperId(found.id);
    setIsWpTransitioning(true);

    try {
      localStorage.setItem('varunos_desktop_wallpaper', found.id);
    } catch {}

    if (showToast) {
      setWallpaperToast(`Wallpaper: ${found.name}`);
      setTimeout(() => {
        setWallpaperToast(curr => (curr === `Wallpaper: ${found.name}` ? null : curr));
      }, 2200);
    }

    wpTransitionTimerRef.current = setTimeout(() => {
      setPrevWallpaper(null);
      setIsWpTransitioning(false);
      wpTransitionTimerRef.current = null;
    }, 750);
  };

  useEffect(() => {
    return () => {
      if (wpTransitionTimerRef.current) {
        clearTimeout(wpTransitionTimerRef.current);
      }
    };
  }, []);

  // Keyboard shortcut: Alt + 1, 2, 3, 4, 5 to quickly switch wallpapers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        const keyNum = parseInt(e.key, 10);
        if (keyNum >= 1 && keyNum <= desktopWallpapers.length) {
          e.preventDefault();
          const targetWp = desktopWallpapers[keyNum - 1];
          if (targetWp) {
            applyDesktopWallpaper(targetWp.id, true);
          }
        }
      }
    };

    const handleCustomWallpaperChange = (e) => {
      if (e.detail && e.detail.id) {
        applyDesktopWallpaper(e.detail.id, false);
      }
    };

    const handleGlobalOpenApp = (e) => {
      if (e.detail && e.detail.appId) {
        openApp(e.detail.appId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('varunos-set-desktop-wallpaper', handleCustomWallpaperChange);
    window.addEventListener('varunos-open-app', handleGlobalOpenApp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('varunos-set-desktop-wallpaper', handleCustomWallpaperChange);
      window.removeEventListener('varunos-open-app', handleGlobalOpenApp);
    };
  }, []);

  const triggerAppBounce = (appId) => {
    setBouncingApp(appId);
    setTimeout(() => {
      setBouncingApp((curr) => (curr === appId ? null : curr));
    }, 1100);
  };

  const openApp = (appId) => {
    triggerAppBounce(appId);
    if (!openWindows.includes(appId)) {
      setOpenWindows(prev => [...prev, appId]);
      if (FULLSCREEN_APPS.includes(appId)) {
        setMaximizedWindows(prev => prev.includes(appId) ? prev : [...prev, appId]);
      }
    }
    // Unminimize if it was minimized
    setMinimizedWindows(prev => prev.filter(id => id !== appId));
    setActiveWindow(appId);

    // Notify Swarm Agents to assemble this app window collaboratively
    const appInfo = portfolioApps[appId];
    window.dispatchEvent(new CustomEvent('varunos-app-assembling', {
      detail: {
        appId,
        appName: appInfo?.name || appId
      }
    }));
  };

  const closeApp = (appId) => {
    setOpenWindows(prev => prev.filter(id => id !== appId));
    setMinimizedWindows(prev => prev.filter(id => id !== appId));
    setMaximizedWindows(prev => prev.filter(id => id !== appId));
    if (activeWindow === appId) {
      const remaining = openWindows.filter(id => id !== appId && !minimizedWindows.includes(id));
      setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  const toggleMinimize = (appId) => {
    if (minimizedWindows.includes(appId)) {
      // Restore window
      setMinimizedWindows(prev => prev.filter(id => id !== appId));
      setActiveWindow(appId);
    } else {
      // Minimize window
      setMinimizedWindows(prev => [...prev, appId]);
      if (activeWindow === appId) {
        const remaining = openWindows.filter(id => id !== appId && !minimizedWindows.includes(id));
        setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1] : null);
      }
    }
  };

  const focusApp = (appId) => {
    setActiveWindow(appId);
  };

  const handleDockClick = (appId) => {
    if (openWindows.includes(appId)) {
      if (minimizedWindows.includes(appId)) {
        // Restore window
        setMinimizedWindows(prev => prev.filter(id => id !== appId));
        setActiveWindow(appId);
      } else if (activeWindow === appId) {
        // Active window clicked in dock -> minimize it (macOS Dock toggle behavior)
        toggleMinimize(appId);
      } else {
        // App is open in background -> bring to front
        setActiveWindow(appId);
      }
    } else {
      openApp(appId);
    }
  };

  // Replay Swarm Rebuild handler guaranteeing clean workspace & Finder is open
  const handleInternalReplaySwarm = () => {
    setOpenWindows(['finder']);
    setMinimizedWindows([]);
    setMaximizedWindows([]);
    setActiveWindow('finder');
    if (onReplaySwarm) onReplaySwarm();
  };

  // Ensure Finder is cleanly prepared when entering rebuild mode
  useEffect(() => {
    if (swarmStage < 5) {
      setOpenWindows(['finder']);
      setMinimizedWindows([]);
      setMaximizedWindows([]);
      setActiveWindow('finder');
    }
  }, [swarmStage]);

  const displayedIcons = desktopIconIds || ['figma', 'vscode', 'resume', 'contact', 'trash'];
  const activeWallpaper = desktopWallpapers.find(w => w.id === activeWallpaperId) || desktopWallpapers[0];

  return (
    <div 
      className={`desktop ${swarmStage < 5 ? 'desktop-in-rebuild' : ''}`}
    >
      {/* Smooth Wallpaper Switching Animated Backdrop (macOS Sequoia Crossfade) */}
      {swarmStage >= 5 && (
        <div className="desktop-wallpaper-viewport" aria-hidden="true">
          {prevWallpaper && (
            <div 
              key={`prev-wp-${prevWallpaper.id}`}
              className="desktop-wallpaper-layer outgoing"
              style={prevWallpaper.style}
            />
          )}
          <div 
            key={`curr-wp-${activeWallpaper.id}`}
            className={`desktop-wallpaper-layer ${isWpTransitioning ? 'incoming' : 'active'}`}
            style={activeWallpaper.style}
          />
        </div>
      )}

      {/* Toast notification when switching wallpaper */}
      {wallpaperToast && (
        <div className="desktop-wallpaper-toast">
          <span className="toast-icon">🖼️</span>
          <span>{wallpaperToast}</span>
        </div>
      )}

      {/* Collaborative Swarm Live Mouse Flocking & App Assembly Engine (Kittu style: 2 agents for silky 60fps & zero clutter) */}
      <LiveMouseSwarm isEnabled={isSwarmFollowEnabled && swarmStage >= 5} agentCount={2} />

      {/* Top MenuBar wrapper */}
      <div className={`desktop-menubar-wrap ${swarmStage < 5 ? (swarmStage >= 1 ? 'stage-revealed' : 'stage-hidden') : ''}`}>
        <MenuBar userName={userName} onReplaySwarm={handleInternalReplaySwarm} />
      </div>

      <div className="desktop-content">
        {/* Left Column Desktop Icons */}
        <div className={`desktop-icons ${swarmStage < 5 ? (swarmStage >= 2 ? 'stage-revealed' : 'stage-hidden') : ''}`}>
          {displayedIcons.map((id, index) => {
            const app = portfolioApps[id];
            if (!app) return null;
            return (
              <DesktopIcon
                key={app.id}
                app={app}
                className="desktop-icon-stagger-item"
                style={{ '--icon-delay': `${index * 0.08}s` }}
                onClick={() => openApp(app.id)}
                onDoubleClick={() => openApp(app.id)}
              />
            );
          })}
        </div>

        {/* Windows Layer */}
        <div className={`desktop-windows-layer ${swarmStage < 5 ? (swarmStage >= 3 ? 'stage-revealed' : 'stage-hidden') : ''}`}>
          {openWindows.map((appId) => {
            const app = portfolioApps[appId] || { id: appId, name: appId };
            return (
              <Window
                key={appId}
                app={app}
                userName={userName}
                isActive={activeWindow === appId}
                isMinimized={minimizedWindows.includes(appId)}
                isMaximized={maximizedWindows.includes(appId)}
                onToggleMaximize={() => toggleMaximizeWindow(appId)}
                onClose={() => closeApp(appId)}
                onMinimize={() => toggleMinimize(appId)}
                onFocus={() => focusApp(appId)}
                onOpenApp={openApp}
                onReplaySwarm={handleInternalReplaySwarm}
              />
            );
          })}
        </div>

        {/* PixelAssistant / Clippy bot remains untouched on the right/bottom */}
        <div className={`desktop-bot-wrap ${swarmStage < 5 ? (swarmStage >= 5 ? 'stage-revealed' : 'stage-hidden') : ''}`}>
          <PixelAssistant isIdle={isIdle} onOpenApp={openApp} />
        </div>

        {/* Bottom macOS Dock */}
        <div className={`desktop-dock-wrap ${swarmStage < 5 ? (swarmStage >= 4 ? 'stage-revealed' : 'stage-hidden') : ''}`}>
          <Dock
            openWindows={openWindows}
            minimizedWindows={minimizedWindows}
            activeWindow={activeWindow}
            bouncingAppProp={bouncingApp}
            isFullScreenActive={isFullScreenActive}
            onAppClick={handleDockClick}
          />
        </div>
      </div>

    </div>
  );
};

export default Desktop;
