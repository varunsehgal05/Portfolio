import { useState, useEffect } from 'react';
import MenuBar from './MenuBar';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Dock from './Dock';
import PixelAssistant from './PixelAssistant';
import { portfolioApps, desktopIconIds } from '../config/apps';
import './Desktop.css';

const Desktop = ({ isIdle, userName = 'Guest', onReplaySwarm, swarmStage = 5 }) => {
  const [openWindows, setOpenWindows] = useState(['finder']);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState('finder');
  const [maximizedWindows, setMaximizedWindows] = useState(['figma', 'vscode', 'resume', 'contact', 'trash']);

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

  const openApp = (appId) => {
    if (!openWindows.includes(appId)) {
      setOpenWindows(prev => [...prev, appId]);
    }
    // Unminimize if it was minimized
    setMinimizedWindows(prev => prev.filter(id => id !== appId));
    setActiveWindow(appId);
  };

  const closeApp = (appId) => {
    setOpenWindows(prev => prev.filter(id => id !== appId));
    setMinimizedWindows(prev => prev.filter(id => id !== appId));
    if (activeWindow === appId) {
      const remaining = openWindows.filter(id => id !== appId);
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
    if (appId === 'safari') {
      window.open('https://github.com/varunsehgal05', '_blank');
      return;
    }
    if (appId === 'terminal') {
      openApp('vscode');
      return;
    }
    if (appId === 'settings') {
      openApp('contact');
      return;
    }

    if (openWindows.includes(appId)) {
      if (minimizedWindows.includes(appId)) {
        toggleMinimize(appId);
      } else if (activeWindow === appId) {
        toggleMinimize(appId);
      } else {
        setActiveWindow(appId);
      }
    } else {
      openApp(appId);
    }
  };

  const displayedIcons = desktopIconIds || ['figma', 'vscode', 'resume', 'contact', 'trash'];

  return (
    <div className={`desktop ${swarmStage < 5 ? 'desktop-in-rebuild' : ''}`}>
      {/* Top MenuBar wrapper */}
      <div className={`desktop-menubar-wrap ${swarmStage < 5 ? (swarmStage >= 1 ? 'stage-revealed' : 'stage-hidden') : ''}`}>
        <MenuBar userName={userName} onReplaySwarm={onReplaySwarm} />
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
            onAppClick={handleDockClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Desktop;
