import React, { useState, useRef, useEffect } from 'react';
import {
  Settings,
  Trash2,
  FileText,
  Mail,
  Folder,
  Coffee
} from 'lucide-react';
import './Dock.css';

const FigmaLogo = () => (
  <svg width="18" height="27" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 9.5C0 4.25329 4.25329 0 9.5 0H19V19H9.5C4.25329 19 0 14.7467 0 9.5Z" fill="#F24E1E" />
    <path d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262" />
    <path d="M0 28.5C0 23.2533 4.25329 19 9.5 19H19V38H9.5C4.25329 38 0 33.7467 0 28.5Z" fill="#A259FF" />
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
  </svg>
);

const FinderIcon = () => (
  <div className="dock-icon-inner finder-bg">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="9.5" r="1.5" fill="#ffffff" />
      <circle cx="16" cy="9.5" r="1.5" fill="#ffffff" />
      <path d="M7 14.5C8.5 17 15.5 17 17 14.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

const VsCodeIcon = () => (
  <div className="dock-icon-inner vscode-bg">
    <span style={{ color: '#38bdf8', fontSize: '15px', fontWeight: '800', fontFamily: 'monospace' }}>
      &lt;/&gt;
    </span>
  </div>
);

const FigmaDockIcon = () => (
  <div className="dock-icon-inner figma-bg">
    <FigmaLogo />
  </div>
);

const TerminalIcon = () => (
  <div className="dock-icon-inner terminal-bg">
    <span style={{ color: '#4ade80', fontSize: '13px', fontWeight: '800', fontFamily: 'monospace' }}>
      &gt;_
    </span>
  </div>
);

const ResumeIcon = () => (
  <div className="dock-icon-inner resume-bg">
    <FileText size={22} color="#ffffff" />
  </div>
);

const ContactDockIcon = () => (
  <div className="dock-icon-inner contact-bg">
    <Mail size={22} color="#ffffff" />
  </div>
);

const SettingsIcon = () => (
  <div className="dock-icon-inner settings-bg">
    <Settings size={22} color="#e4e4e7" />
  </div>
);

const CoffeeDockIcon = () => (
  <div className="dock-icon-inner coffee-bg" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
    <Coffee size={21} color="#ffffff" />
  </div>
);

const TrashDockIcon = () => (
  <div className="dock-icon-inner trash-bg">
    <Trash2 size={21} color="#d4d4d8" />
  </div>
);

const DOCK_ITEMS = [
  { id: 'finder', name: 'Finder', icon: FinderIcon },
  { id: 'vscode', name: 'VS Code', icon: VsCodeIcon },
  { id: 'figma', name: 'Figma', icon: FigmaDockIcon },
  { id: 'terminal', name: 'Terminal', icon: TerminalIcon },
  { id: 'resume', name: 'Resume', icon: ResumeIcon },
  { id: 'contact', name: 'Contact', icon: ContactDockIcon },
  { id: 'settings', name: 'Settings', icon: SettingsIcon },
  { id: 'separator', isSeparator: true },
  { id: 'coffee', name: 'Buy Me a Coffee', icon: CoffeeDockIcon },
  { id: 'trash', name: 'Trash', icon: TrashDockIcon }
];

const Dock = ({
  openWindows = [],
  minimizedWindows = [],
  activeWindow,
  bouncingAppProp = null,
  isFullScreenActive = false,
  onAppClick,
  stampedDockCount = 10
}) => {
  const [mouseX, setMouseX] = useState(null);
  const [bouncingApp, setBouncingApp] = useState(null);
  // Dock is permanently visible unless an app is currently open in full screen
  const [isDockVisible, setIsDockVisible] = useState(!isFullScreenActive);
  const isHoveringRef = useRef(false);
  const hideTimerRef = useRef(null);
  const dockRef = useRef(null);

  // Sync dock visibility immediately when full-screen state changes
  useEffect(() => {
    if (!isFullScreenActive) {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      setIsDockVisible(true);
    } else {
      // In full-screen mode, dock hides unless currently hovered or bouncing
      if (!isHoveringRef.current && !bouncingApp && !bouncingAppProp) {
        setIsDockVisible(false);
      }
    }
  }, [isFullScreenActive, bouncingApp, bouncingAppProp]);

  // Global mouse tracking: ONLY auto-hides when an app is in full screen!
  useEffect(() => {
    // If NOT in full-screen mode, dock must NEVER hide!
    if (!isFullScreenActive) {
      setIsDockVisible(true);
      return;
    }

    const handleGlobalMouseMove = (e) => {
      const bottomThreshold = window.innerHeight - 14; // within 14px of bottom edge

      if (e.clientY >= bottomThreshold) {
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current);
          hideTimerRef.current = null;
        }
        setIsDockVisible(true);
      } else if (e.clientY < window.innerHeight - 80 && !isHoveringRef.current) {
        // Mouse moved well above the bottom bar while in full-screen
        if (!hideTimerRef.current && isDockVisible) {
          hideTimerRef.current = setTimeout(() => {
            if (!isHoveringRef.current && isFullScreenActive) {
              setIsDockVisible(false);
            }
          }, 350);
        }
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [isFullScreenActive, isDockVisible]);

  // Keep dock visible while an app is bouncing
  useEffect(() => {
    if (bouncingApp || bouncingAppProp) {
      setIsDockVisible(true);
    }
  }, [bouncingApp, bouncingAppProp]);

  const handleMouseEnterDock = () => {
    isHoveringRef.current = true;
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setIsDockVisible(true);
  };

  const handleMouseLeaveDock = () => {
    isHoveringRef.current = false;
    setMouseX(null);
    // NEVER hide dock on mouse leave unless an app is active in full screen!
    if (!isFullScreenActive) {
      return;
    }
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      if (!isHoveringRef.current && isFullScreenActive) {
        setIsDockVisible(false);
      }
    }, 400);
  };

  const handleMouseMove = (e) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
    }
  };

  const handleClick = (id) => {
    // Trigger macOS dock bounce animation on click
    setBouncingApp(id);
    setIsDockVisible(true);
    setTimeout(() => {
      setBouncingApp(null);
    }, 900);

    if (onAppClick) {
      onAppClick(id);
    }
  };

  return (
    <>
      {/* Invisible bottom edge sensor hotspot (active only in full-screen to reveal dock on mouse hover) */}
      {isFullScreenActive && (
        <div
          className="dock-edge-sensor"
          onMouseEnter={() => {
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            setIsDockVisible(true);
          }}
        />
      )}

      <div
        className={`dock-container ${isDockVisible ? 'dock-visible' : 'dock-hidden'}`}
        onMouseEnter={handleMouseEnterDock}
        onMouseLeave={handleMouseLeaveDock}
      >
        <div
          ref={dockRef}
          className="dock"
          onMouseMove={handleMouseMove}
        >
          {(() => {
            let appCounter = 0;
            return DOCK_ITEMS.map((item, idx) => {
              if (item.isSeparator) {
                const isSepRevealed = stampedDockCount >= 7;
                return (
                  <div
                    key={`sep-${idx}`}
                    className="dock-separator"
                    style={{
                      opacity: isSepRevealed ? 1 : 0,
                      transition: 'opacity 0.28s ease'
                    }}
                  />
                );
              }

              const currentAppIdx = appCounter;
              appCounter++;
              const isRevealed = stampedDockCount >= 9 || currentAppIdx < stampedDockCount;
              const IconComponent = item.icon;
              const isOpen = openWindows.includes(item.id);
              const isMin = minimizedWindows.includes(item.id);
              const isActive = activeWindow === item.id && !isMin;
              const isBouncing = bouncingApp === item.id || bouncingAppProp === item.id;

              // Geometric position of item center for accurate smooth cosine curve
              const ICON_SIZE = 44;
              const DOCK_GAP = 12;
              const DOCK_PAD_LEFT = 16;
              const SEPARATOR_SLOT = 17; // 1px separator + 8px margin each side

              const getExactItemCenter = (index) => {
                if (index < 8) {
                  return DOCK_PAD_LEFT + index * (ICON_SIZE + DOCK_GAP) + ICON_SIZE / 2;
                }
                const itemsBeforeSep = 8 * (ICON_SIZE + DOCK_GAP);
                return DOCK_PAD_LEFT + itemsBeforeSep + SEPARATOR_SLOT + DOCK_GAP + ICON_SIZE / 2;
              };

              // Compute magnification scale & dynamic horizontal expansion to prevent overlap
              let scale = 1;
              let translateY = 0;
              let marginX = 0;

              if (mouseX !== null && dockRef.current) {
                const itemCenter = getExactItemCenter(idx);
                const dist = Math.abs(mouseX - itemCenter);
                const maxDist = 100;

                if (dist < maxDist) {
                  const factor = Math.cos((dist / maxDist) * (Math.PI / 2));
                  scale = 1 + 0.28 * factor;
                  translateY = -8 * factor;
                  marginX = Math.max(0, (scale - 1) * 8);
                }
              }

              return (
                <div
                  key={item.id}
                  data-app-id={item.id}
                  className={`dock-item ${isMin ? 'minimized-app' : ''} ${isBouncing ? 'dock-bouncing' : ''}`}
                  onClick={() => handleClick(item.id)}
                  style={{
                    transform: isRevealed
                      ? `translate3d(0, ${translateY}px, 0) scale(${scale})`
                      : 'scale(0.4) translateY(18px)',
                    opacity: isRevealed ? 1 : 0,
                    margin: `0 ${marginX.toFixed(1)}px`,
                    zIndex: Math.round(scale * 50),
                    pointerEvents: isRevealed ? 'auto' : 'none',
                    transition: 'opacity 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <div className="dock-tooltip">{item.name}</div>
                  <div className="dock-icon-wrapper">
                    <IconComponent />
                  </div>
                  {isOpen && <div className={`dock-dot ${isActive ? 'active' : ''}`} />}
                </div>
              );
            });
          })()}
        </div>
      </div>
    </>
  );
};

export default Dock;