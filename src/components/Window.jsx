import { Rnd } from 'react-rnd';
import { Folder } from 'lucide-react';
import './Window.css';
import { useState, useEffect, useRef } from 'react';
import ResumeApp from './ResumeApp';
import ContactApp from './ContactApp';
import FigmaApp from './FigmaApp';
import FinderApp from './FinderApp';
import SafariApp from './SafariApp';
import TerminalApp from './TerminalApp';
import SettingsApp from './SettingsApp';
import VsCodeApp from './VsCodeApp';

const Window = ({
  app,
  userName,
  isActive,
  isMinimized,
  isMaximized: controlledMaximized,
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
  onOpenApp,
  onReplaySwarm,
  defaultMaximized = false
}) => {
  const DOCK_CLEARANCE = 86;
  const MENUBAR_HEIGHT = 28;

  // Track window dimensions dynamically for responsive window snapping and bounds
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Default bounds and position based on app type
  const getDefaultSize = () => {
    if (typeof window === 'undefined') return { width: 800, height: 500 };
    const availableHeight = Math.max(300, window.innerHeight - MENUBAR_HEIGHT - DOCK_CLEARANCE);
    const availableWidth = Math.max(400, window.innerWidth);

    if (app.id === 'trash') return { width: 440, height: 320 };
    if (app.id === 'terminal') return { width: Math.min(availableWidth - 80, 720), height: Math.min(availableHeight - 40, 460) };
    if (app.id === 'settings') return { width: Math.min(availableWidth - 80, 680), height: Math.min(availableHeight - 30, 500) };
    if (app.id === 'safari') return { width: Math.min(availableWidth - 80, 960), height: Math.min(availableHeight - 20, 580) };
    if (app.id === 'finder') return { width: Math.min(availableWidth - 80, 920), height: Math.min(availableHeight - 20, 560) };
    if (app.id === 'figma') return { width: Math.min(availableWidth - 60, 1100), height: Math.min(availableHeight, 680) };
    if (app.id === 'vscode') return { width: Math.min(availableWidth - 80, 1000), height: Math.min(availableHeight, 620) };
    if (app.id === 'contact') return { width: Math.min(availableWidth - 80, 840), height: Math.min(availableHeight - 20, 560) };
    return { width: Math.min(availableWidth - 80, 800), height: Math.min(availableHeight, 500) };
  };

  const getInitialPosition = () => {
    if (typeof window === 'undefined') return { x: 40, y: 40 };
    const availableHeight = Math.max(300, window.innerHeight - MENUBAR_HEIGHT - DOCK_CLEARANCE);
    const size = getDefaultSize();
    const centerX = Math.max(20, (window.innerWidth - size.width) / 2);
    const centerY = Math.max(10, (availableHeight - size.height) / 2);
    if (app.id === 'finder' || app.id === 'figma' || app.id === 'vscode') {
      return { x: centerX, y: centerY };
    }
    return { x: Math.max(30, centerX + (Math.random() * 60 - 30)), y: Math.max(15, centerY + (Math.random() * 40 - 20)) };
  };

  const [position, setPosition] = useState(getInitialPosition());
  const [size, setSize] = useState(getDefaultSize());
  const [localMaximized, setLocalMaximized] = useState(defaultMaximized);
  const isMaximized = controlledMaximized !== undefined ? controlledMaximized : localMaximized;
  const [isInteracting, setIsInteracting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [animState, setAnimState] = useState(isMinimized ? 'hidden' : 'visible');
  const isInitialMount = useRef(true);
  const windowInnerRef = useRef(null);
  const preMaxRef = useRef({ size: getDefaultSize(), position: getInitialPosition() });

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 220); // 220ms smooth macOS dismiss animation
  };

  const handleMaximize = () => {
    setIsZooming(true);
    setTimeout(() => setIsZooming(false), 380);

    if (!isMaximized) {
      preMaxRef.current = { size, position };
    } else {
      if (preMaxRef.current) {
        setSize(preMaxRef.current.size);
        setPosition(preMaxRef.current.position);
      }
    }

    if (onToggleMaximize) {
      onToggleMaximize();
    } else {
      setLocalMaximized(prev => !prev);
    }
  };

  const updateGenieCoords = () => {
    if (!windowInnerRef.current) return;
    const winInner = windowInnerRef.current;
    const winEl = winInner.parentElement;
    if (!winEl) return;

    // Target matching dock icon if available, fallback to dock container
    const dockIcon =
      document.querySelector(`.dock-item[data-app-id="${app.id}"]`) ||
      document.querySelector('.dock');

    if (dockIcon) {
      const winRect = winEl.getBoundingClientRect();
      const dockRect = dockIcon.getBoundingClientRect();

      const winCenterX = winRect.left + winRect.width / 2;
      const winBottom = winRect.bottom;
      const dockCenterX = dockRect.left + dockRect.width / 2;
      const dockCenterY = dockRect.top + dockRect.height / 2;

      const deltaX = dockCenterX - winCenterX;
      const deltaY = dockCenterY - winBottom;

      winInner.style.setProperty('--genie-target-x', `${deltaX}px`);
      winInner.style.setProperty('--genie-target-y', `${deltaY}px`);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isMinimized) {
      updateGenieCoords();
      setAnimState('minimizing');
      const timer = setTimeout(() => {
        setAnimState('hidden');
      }, 360);
      return () => clearTimeout(timer);
    } else {
      setAnimState('restoring');
      requestAnimationFrame(() => {
        updateGenieCoords();
      });
      const timer = setTimeout(() => {
        setAnimState('visible');
      }, 340);
      return () => clearTimeout(timer);
    }
  }, [isMinimized]);

  useEffect(() => {
    updateGenieCoords();
  }, [position, size, isMaximized]);

  const getAnimClass = () => {
    if (isClosing) return 'closing';
    if (animState === 'minimizing') return 'minimizing';
    if (animState === 'hidden') return 'minimized';
    if (animState === 'restoring') return 'restoring';
    return '';
  };

  const renderContent = () => {
    switch (app.id) {
      case 'finder':
        return <FinderApp onOpenApp={onOpenApp} />;
      case 'safari':
        return <SafariApp />;
      case 'figma':
        return <FigmaApp isInteracting={isInteracting} userName={userName} onOpenApp={onOpenApp} />;
      case 'terminal':
        return <TerminalApp userName={userName} onOpenApp={onOpenApp} />;
      case 'settings':
        return <SettingsApp userName={userName} onReplaySwarm={onReplaySwarm} />;
      case 'vscode':
        return <VsCodeApp />;
      case 'resume':
        return <ResumeApp />;
      case 'contact':
        return <ContactApp />;
      case 'trash':
        return (
          <div className="window-content-inner trash-content">
            <p>Trash is empty.</p>
          </div>
        );
      default:
        return <div className="window-content-inner"><p>Loading...</p></div>;
    }
  };

  const maximizedHeight = Math.max(300, windowDimensions.height - MENUBAR_HEIGHT - 76);
  const maximizedWidth = windowDimensions.width;

  useEffect(() => {
    if (!isMaximized && preMaxRef.current) {
      setSize(preMaxRef.current.size);
      setPosition(preMaxRef.current.position);
    }
  }, [isMaximized]);

  return (
    <Rnd
      className={`app-window ${isActive ? 'active' : ''} ${isMaximized ? 'maximized' : ''} ${isZooming ? 'zooming' : ''} ${isInteracting ? 'interacting' : ''} ${getAnimClass()}`}
      size={isMaximized ? { width: maximizedWidth, height: maximizedHeight } : size}
      position={isMaximized ? { x: 0, y: 0 } : position}
      onDragStart={() => setIsInteracting(true)}
      onDragStop={(e, d) => {
        setIsInteracting(false);
        if (!isMaximized) setPosition({ x: d.x, y: d.y });
      }}
      onResizeStart={() => setIsInteracting(true)}
      onResizeStop={(e, direction, ref, delta, position) => {
        setIsInteracting(false);
        if (!isMaximized) {
          setSize({ width: ref.style.width, height: ref.style.height });
          setPosition(position);
        }
      }}
      onMouseDown={onFocus}
      dragHandleClassName="window-titlebar"
      cancel=".mac-traffic-lights, .mac-btn, button, a, input"
      disableDragging={isMaximized || animState !== 'visible'}
      enableResizing={!isMaximized && animState === 'visible'}
      minWidth={320}
      minHeight={220}
      bounds="parent"
      style={{ zIndex: isMaximized ? (isActive ? 300 : 150) : (isActive ? 100 : 10) }}
    >
      <div ref={windowInnerRef} className={`window-inner ${getAnimClass()}`}>
        {/* macOS Style Titlebar - double-click to toggle fullscreen */}
        <div
          className="window-titlebar"
          onDoubleClick={handleMaximize}
          title="Double-click to toggle full screen"
        >
          <div className="mac-traffic-lights">
            <button
              className="mac-btn close"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={handleClose}
              title="Close"
            >
              <span className="mac-symbol">×</span>
            </button>
            <button
              className="mac-btn minimize"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onMinimize?.();
              }}
              title="Minimize"
            >
              <span className="mac-symbol">–</span>
            </button>
            <button
              className="mac-btn maximize"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              title={isMaximized ? "Restore Window" : "Full Screen"}
            >
              <span className="mac-symbol">+</span>
            </button>
          </div>

          <div className="window-title">
            <Folder size={13} className="titlebar-folder-icon" />
            <span>{app.title || (app.id === 'finder' ? 'VarunOS — Portfolio & Projects' : app.name)}</span>
          </div>

          <div className="titlebar-right-spacer" />
        </div>

        <div className={`window-content ${app.id === 'resume' || app.id === 'contact' || app.id === 'figma' || app.id === 'finder' || app.id === 'safari' || app.id === 'settings' || app.id === 'vscode' || app.id === 'terminal' ? 'no-padding' : ''}`}>
          {renderContent()}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;