import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import MenuBar from './MenuBar';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Dock from './Dock';
import DeviceHomeScreen from './DeviceHomeScreen';
import { portfolioApps, desktopIconIds } from '../config/apps';
import { desktopWallpapers, getDeviceWallpaper } from '../config/wallpapers';
import { getLiveAppsConfig } from '../utils/portfolioCMS';
import LiveMouseSwarm from './LiveMouseSwarm';
import './Desktop.css';

const PixelAssistant = lazy(() => import('./PixelAssistant'));

const Desktop = ({ isIdle, userName = 'Guest', onReplaySwarm, swarmStage = 5, isRebuilding = false }) => {
  const [openWindows, setOpenWindows] = useState(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const app = p.get('app');
      if (app && portfolioApps[app]) return [app];
    } catch { }
    return ['finder'];
  });
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const app = p.get('app');
      if (app && portfolioApps[app]) return app;
    } catch { }
    return 'finder';
  });
  const [maximizedWindows, setMaximizedWindows] = useState(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const app = p.get('app');
      if (app && ['figma', 'vscode'].includes(app)) return [app];
    } catch { }
    return [];
  });
  // Window Stacking Order: most recently focused window is always at the end
  const [windowOrder, setWindowOrder] = useState(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const app = p.get('app');
      if (app && portfolioApps[app]) return [app];
    } catch { }
    return ['finder'];
  });

  const bringToFront = (appId) => {
    setWindowOrder(prev => {
      const next = prev.filter(id => id !== appId);
      next.push(appId);
      return next;
    });
    setActiveWindow(appId);
  };

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

  // Responsive Device Modes: 100% Automatic based on screen viewport
  const [windowWidth, setWindowWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatically switches to mobile (<=640px), tablet (<=1024px), or desktop (>1024px)
  const effectiveDeviceMode = windowWidth <= 640 ? 'mobile' : (windowWidth <= 1024 ? 'tablet' : 'desktop');

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

  // Open window detection: when any window is open and not minimized
  const hasOpenWindows = openWindows.filter(id => !minimizedWindows.includes(id)).length > 0;

  useEffect(() => {
    document.body.classList.toggle('has-open-window', hasOpenWindows);
    return () => {
      document.body.classList.remove('has-open-window');
    };
  }, [hasOpenWindows]);

  // Apps that should open in full screen by default
  const FULLSCREEN_APPS = ['figma', 'vscode'];
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

  // Live Califa Swarm Mouse Flocking State (defaults to false until user clicks Swarm Follow)
  const [isSwarmFollowEnabled, setIsSwarmFollowEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('varunos_swarm_follow_mouse');
      return saved === 'true';
    } catch {
      return false;
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

  // Track sequential desktop icon stamping during Swarm Rebuild (reveal 1-by-1 in Stage 3)
  const [stampedIconCount, setStampedIconCount] = useState(() => (!isRebuilding && swarmStage >= 5 ? 6 : 0));
  // Track sequential dock icon stamping during Swarm Rebuild (reveal 1-by-1 in Stage 4)
  const [stampedDockCount, setStampedDockCount] = useState(() => (!isRebuilding && swarmStage >= 5 ? 10 : 0));

  useEffect(() => {
    const handleIconStamped = (e) => {
      if (typeof e.detail?.count === 'number') {
        setStampedIconCount(e.detail.count);
      }
    };
    const handleDockStamped = (e) => {
      if (typeof e.detail?.count === 'number') {
        setStampedDockCount(e.detail.count);
      }
    };
    window.addEventListener('varunos-swarm-icon-stamped', handleIconStamped);
    window.addEventListener('varunos-swarm-dock-stamped', handleDockStamped);
    return () => {
      window.removeEventListener('varunos-swarm-icon-stamped', handleIconStamped);
      window.removeEventListener('varunos-swarm-dock-stamped', handleDockStamped);
    };
  }, []);

  useEffect(() => {
    if (!isRebuilding || swarmStage >= 5) {
      setStampedIconCount(6);
      setStampedDockCount(10);
    } else if (swarmStage >= 4) {
      // During dock framing & bottom bar assembly (Stage 4), left desktop icons must remain visible
      setStampedIconCount(6);
    } else if (swarmStage === 0) {
      setStampedIconCount(0);
      setStampedDockCount(0);
    }
  }, [isRebuilding, swarmStage]);

  const applyDesktopWallpaper = (id, showToast = false) => {
    const found = desktopWallpapers.find(w => w.id === id) || desktopWallpapers[0];
    if (found.id === activeWallpaperId && !isWpTransitioning) return;

    const currentWp = getDeviceWallpaper(activeWallpaperId, effectiveDeviceMode);

    if (wpTransitionTimerRef.current) {
      clearTimeout(wpTransitionTimerRef.current);
    }

    setPrevWallpaper(currentWp);
    setActiveWallpaperId(found.id);
    setIsWpTransitioning(true);

    try {
      localStorage.setItem('varunos_desktop_wallpaper', found.id);
    } catch { }

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

    const handleMinimizeAllEvent = () => minimizeAll();
    const handleRestoreAllEvent = () => restoreAll();
    const handleCloseAllEvent = () => closeAll();
    const handleMinimizeActiveEvent = () => minimizeActive();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('varunos-set-desktop-wallpaper', handleCustomWallpaperChange);
    window.addEventListener('varunos-open-app', handleGlobalOpenApp);
    window.addEventListener('varunos:minimize-all', handleMinimizeAllEvent);
    window.addEventListener('varunos-minimize-all', handleMinimizeAllEvent);
    window.addEventListener('varunos:restore-all', handleRestoreAllEvent);
    window.addEventListener('varunos-restore-all', handleRestoreAllEvent);
    window.addEventListener('varunos:close-all', handleCloseAllEvent);
    window.addEventListener('varunos-close-all', handleCloseAllEvent);
    window.addEventListener('varunos:minimize-active', handleMinimizeActiveEvent);
    window.addEventListener('varunos-minimize-active', handleMinimizeActiveEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('varunos-set-desktop-wallpaper', handleCustomWallpaperChange);
      window.removeEventListener('varunos-open-app', handleGlobalOpenApp);
      window.removeEventListener('varunos:minimize-all', handleMinimizeAllEvent);
      window.removeEventListener('varunos-minimize-all', handleMinimizeAllEvent);
      window.removeEventListener('varunos:restore-all', handleRestoreAllEvent);
      window.removeEventListener('varunos-restore-all', handleRestoreAllEvent);
      window.removeEventListener('varunos:close-all', handleCloseAllEvent);
      window.removeEventListener('varunos-close-all', handleCloseAllEvent);
      window.removeEventListener('varunos:minimize-active', handleMinimizeActiveEvent);
      window.removeEventListener('varunos-minimize-active', handleMinimizeActiveEvent);
    };
  }, [openWindows, activeWindow]);

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
    bringToFront(appId);
  };

  const closeApp = (appId) => {
    setOpenWindows(prev => prev.filter(id => id !== appId));
    setMinimizedWindows(prev => prev.filter(id => id !== appId));
    setMaximizedWindows(prev => prev.filter(id => id !== appId));
    setWindowOrder(prev => {
      const next = prev.filter(id => id !== appId);
      if (activeWindow === appId) {
        const remaining = next.filter(id => !minimizedWindows.includes(id));
        setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1] : null);
      }
      return next;
    });
  };

  const toggleMinimize = (appId) => {
    if (minimizedWindows.includes(appId)) {
      // Restore window
      setMinimizedWindows(prev => prev.filter(id => id !== appId));
      bringToFront(appId);
    } else {
      // Minimize window
      setMinimizedWindows(prev => [...prev, appId]);
      if (activeWindow === appId) {
        setWindowOrder(prev => {
          const remaining = prev.filter(id => id !== appId && !minimizedWindows.includes(id) && openWindows.includes(id));
          setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1] : null);
          return prev;
        });
      }
    }
  };

  const focusApp = (appId) => {
    bringToFront(appId);
  };

  const minimizeActive = () => {
    if (activeWindow && !minimizedWindows.includes(activeWindow)) {
      toggleMinimize(activeWindow);
    }
  };

  const minimizeAll = () => {
    setMinimizedWindows([...openWindows]);
    setActiveWindow(null);
  };

  const restoreAll = () => {
    setMinimizedWindows([]);
    if (openWindows.length > 0) {
      const last = openWindows[openWindows.length - 1];
      bringToFront(last);
    }
  };

  const closeAll = () => {
    setOpenWindows([]);
    setMinimizedWindows([]);
    setMaximizedWindows([]);
    setWindowOrder([]);
    setActiveWindow(null);
  };

  const handleDockClick = (appId) => {
    if (openWindows.includes(appId)) {
      if (minimizedWindows.includes(appId)) {
        // Restore window
        setMinimizedWindows(prev => prev.filter(id => id !== appId));
        bringToFront(appId);
      } else if (activeWindow === appId) {
        // Active window clicked in dock -> minimize it (macOS Dock toggle behavior)
        toggleMinimize(appId);
      } else {
        // App is open in background -> bring to front
        bringToFront(appId);
      }
    } else {
      openApp(appId);
    }
  };

  // Replay Swarm Rebuild handler guaranteeing clean workspace & Finder is open
  const handleInternalReplaySwarm = () => {
    if (typeof window !== 'undefined') {
      window.__varunos_finder_step = 0;
      window.__varunos_sidebar_step = 0;
      window.dispatchEvent(new CustomEvent('varunos-swarm-finder-step', { detail: { step: 0 } }));
      window.dispatchEvent(new CustomEvent('varunos-sidebar-step', { detail: { step: 0 } }));
      window.dispatchEvent(new CustomEvent('varunos-card-building', { detail: { index: -1, phase: 'reset' } }));
    }
    setOpenWindows(['finder']);
    setMinimizedWindows([]);
    setMaximizedWindows([]);
    setActiveWindow('finder');
    setWindowOrder(['finder']);
    if (onReplaySwarm) onReplaySwarm();
  };

  // Ensure Finder is cleanly prepared when entering rebuild mode, and fully restored when ready
  useEffect(() => {
    if (isRebuilding) {
      if (typeof window !== 'undefined') {
        window.__varunos_rebuild_active = true;
        if (swarmStage === 0) {
          window.__varunos_finder_step = 0;
          window.__varunos_sidebar_step = 0;
          window.dispatchEvent(new CustomEvent('varunos-swarm-finder-step', { detail: { step: 0 } }));
          window.dispatchEvent(new CustomEvent('varunos-sidebar-step', { detail: { step: 0 } }));
          window.dispatchEvent(new CustomEvent('varunos-card-building', { detail: { index: -1, phase: 'reset' } }));
        }
      }
      setOpenWindows(['finder']);
      setMinimizedWindows([]);
      setMaximizedWindows([]);
      setActiveWindow('finder');
      setWindowOrder(['finder']);
    } else {
      if (typeof window !== 'undefined') {
        window.__varunos_rebuild_active = false;
        window.__varunos_finder_step = 7;
        window.__varunos_sidebar_step = 15;
        window.dispatchEvent(new CustomEvent('varunos-swarm-finder-step', { detail: { step: 7 } }));
        window.dispatchEvent(new CustomEvent('varunos-sidebar-step', { detail: { step: 15 } }));
      }
    }
  }, [isRebuilding, swarmStage]);

  const [liveAppsConfig, setLiveAppsConfig] = useState(() => getLiveAppsConfig());
  useEffect(() => {
    const syncApps = () => setLiveAppsConfig(getLiveAppsConfig());
    window.addEventListener('varunos-cms-updated', syncApps);
    return () => window.removeEventListener('varunos-cms-updated', syncApps);
  }, []);

  const livePortfolioApps = liveAppsConfig.appMap || portfolioApps;
  const displayedIcons = liveAppsConfig.desktopIds.length > 0 ? liveAppsConfig.desktopIds : (desktopIconIds || ['figma', 'vscode', 'resume', 'contact', 'coffee', 'trash']);
  const activeWallpaper = getDeviceWallpaper(activeWallpaperId, effectiveDeviceMode);

  return (
    <div
      className={`desktop mode-${effectiveDeviceMode} ${swarmStage < 5 ? 'desktop-in-rebuild' : ''}`}
    >
      {/* Smooth Wallpaper Switching Animated Backdrop (macOS Sequoia Crossfade, revealed in Stage 1) */}
      <div className={`desktop-wallpaper-viewport ${swarmStage < 5 ? (swarmStage >= 1 ? 'stage-revealed' : 'stage-hidden') : ''}`} aria-hidden="true">
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

      {/* Toast notification when switching wallpaper */}
      {wallpaperToast && (
        <div className="desktop-wallpaper-toast">
          <span className="toast-icon">🖼️</span>
          <span>{wallpaperToast}</span>
        </div>
      )}

      {/* Collaborative Swarm Live Mouse Flocking (5 Elite Collaborative Agents on Desktop when enabled) */}
      {effectiveDeviceMode === 'desktop' && (
        <LiveMouseSwarm isEnabled={isSwarmFollowEnabled && !activeWindow && !isRebuilding} isRebuildActive={isRebuilding} agentCount={5} />
      )}

      {/* iPadOS / iOS Home Screen & Status Bar View */}
      {effectiveDeviceMode !== 'desktop' && (
        <DeviceHomeScreen
          mode={effectiveDeviceMode}
          openWindows={openWindows}
          activeWindow={activeWindow}
          onOpenApp={openApp}
          activeWallpaper={activeWallpaper}
        />
      )}

      {/* Top MenuBar wrapper (macOS Desktop mode only, revealed in Stage 2) */}
      {effectiveDeviceMode === 'desktop' && (
        <div className={`desktop-menubar-wrap ${swarmStage < 5 ? (swarmStage >= 2 ? 'stage-revealed' : 'stage-hidden') : ''}`}>
          <MenuBar
            userName={userName}
            onReplaySwarm={handleInternalReplaySwarm}
            openWindows={openWindows}
            minimizedWindows={minimizedWindows}
            activeWindow={activeWindow}
            portfolioApps={livePortfolioApps}
            onOpenApp={openApp}
            onCloseApp={closeApp}
            onFocusApp={focusApp}
            onMinimizeApp={toggleMinimize}
            onMinimizeActive={minimizeActive}
            onToggleMaximize={toggleMaximizeWindow}
            onMinimizeAll={minimizeAll}
            onRestoreAll={restoreAll}
            onCloseAll={closeAll}
            effectiveDeviceMode={effectiveDeviceMode}
          />
        </div>
      )}

      <div className="desktop-content">
        {/* Left Column Desktop Icons (macOS Desktop mode only, Revealed 1-by-1 in Stage 3) */}
        {effectiveDeviceMode === 'desktop' && (
          <div className={`desktop-icons ${isRebuilding ? (swarmStage >= 3 || stampedIconCount > 0 ? 'stage-revealed' : 'stage-hidden') : ''}`}>
            {displayedIcons.map((id, index) => {
              const app = livePortfolioApps[id];
              if (!app) return null;
              const isRevealed = !isRebuilding ? true : (swarmStage >= 4 ? true : index < stampedIconCount);
              return (
                <DesktopIcon
                  key={app.id}
                  app={app}
                  className={`desktop-icon-stagger-item ${isRevealed ? 'is-stamped-visible' : 'is-stamped-hidden'}`}
                  style={{
                    '--icon-delay': `${index * 0.08}s`,
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? 'none' : 'scale(0.5) translateY(-8px)',
                    pointerEvents: isRevealed ? 'auto' : 'none',
                    transition: 'opacity 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                  onClick={() => openApp(app.id)}
                  onDoubleClick={() => openApp(app.id)}
                />
              );
            })}
          </div>
        )}

        {/* Windows Layer (revealed in Stage 5 as real window is assembled & finalized) */}
        <div className={`desktop-windows-layer ${isRebuilding ? (swarmStage >= 5 ? 'stage-revealed' : 'stage-hidden') : ''}`}>
          {openWindows.map((appId) => {
            const app = livePortfolioApps[appId] || { id: appId, name: appId };
            // During desktop swarm rebuild (stages 0-4), do not mount window so there is never a black screen
            if (isRebuilding && swarmStage < 5) return null;
            const stackRank = windowOrder.indexOf(appId);
            const zIndex = activeWindow === appId
              ? 300 + (stackRank >= 0 ? stackRank : 0)
              : 20 + Math.max(0, stackRank) * 10;

            return (
              <Window
                key={appId}
                app={app}
                userName={userName}
                zIndex={zIndex}
                isActive={activeWindow === appId}
                isMinimized={minimizedWindows.includes(appId)}
                isMaximized={maximizedWindows.includes(appId)}
                onToggleMaximize={() => toggleMaximizeWindow(appId)}
                onClose={() => closeApp(appId)}
                onMinimize={() => toggleMinimize(appId)}
                onFocus={() => focusApp(appId)}
                onOpenApp={openApp}
                onReplaySwarm={handleInternalReplaySwarm}
                isRebuilding={isRebuilding}
                deviceMode={effectiveDeviceMode}
              />
            );
          })}
        </div>

        {/* PixelAssistant / Real Animated Clippy Agent - Desktop mode only */}
        {effectiveDeviceMode === 'desktop' && (
          <div className={`desktop-bot-wrap ${swarmStage < 5 ? (swarmStage >= 5 ? 'stage-revealed' : 'stage-hidden') : ''}`}>
            <Suspense fallback={null}>
              <PixelAssistant isIdle={isIdle} onOpenApp={openApp} hasOpenWindows={hasOpenWindows} />
            </Suspense>
          </div>
        )}

        {/* Bottom macOS Dock (Desktop macOS mode only, revealed in Stage 4) */}
        {effectiveDeviceMode === 'desktop' && (
          <div className={`desktop-dock-wrap ${swarmStage < 5 ? (swarmStage >= 4 ? 'stage-revealed' : 'stage-hidden') : ''}`}>
            <Dock
              openWindows={openWindows}
              minimizedWindows={minimizedWindows}
              activeWindow={activeWindow}
              bouncingAppProp={bouncingApp}
              isFullScreenActive={isFullScreenActive}
              onAppClick={handleDockClick}
              stampedDockCount={swarmStage >= 5 ? 10 : (swarmStage >= 4 ? stampedDockCount : 0)}
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default Desktop;
