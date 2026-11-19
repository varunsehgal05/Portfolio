import { Rnd } from 'react-rnd';
import { Folder } from 'lucide-react';
import './Window.css';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ResumeApp from './ResumeApp';
import ContactApp from './ContactApp';
import FigmaApp from './FigmaApp';
import FinderApp from './FinderApp';
import SafariApp from './SafariApp';
import TerminalApp from './TerminalApp';
import SettingsApp from './SettingsApp';
import VsCodeApp from './VsCodeApp';
import TrashApp from './TrashApp';

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

    if (app.id === 'trash') return { width: Math.min(availableWidth - 80, 780), height: Math.min(availableHeight - 40, 500) };
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
    const curW = window.innerWidth;
    const curH = window.innerHeight;
    const availableHeight = Math.max(200, curH - MENUBAR_HEIGHT - DOCK_CLEARANCE);
    const size = getDefaultSize();
    const centerX = Math.max(10, Math.round((curW - size.width) / 2));
    const centerY = Math.max(MENUBAR_HEIGHT + 10, Math.round(MENUBAR_HEIGHT + (availableHeight - size.height) / 2));
    return { x: centerX, y: centerY };
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

  // Windows Aero Snap & Drag-to-Restore from Full Screen Engine
  const isDragRestoringRef = useRef(false);
  const isDraggingMaximized = useRef(false);
  const dragStartRef = useRef({ startClientX: 0, startClientY: 0, ratioX: 0.5, hasDetached: false });
  const [snapPreview, setSnapPreview] = useState(null); // 'maximize' | 'minimize' | null

  // Procedural Web Audio snap synthesizer
  const playSnapSound = (type = 'restore') => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (type === 'restore') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(360, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'maximize') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
        osc.start();
        osc.stop(ctx.currentTime + 0.14);
      }
    } catch {}
  };

  // Center on initial mount / reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const curW = window.innerWidth;
      const curH = window.innerHeight;
      const availableHeight = Math.max(200, curH - MENUBAR_HEIGHT - DOCK_CLEARANCE);
      const winSize = getDefaultSize();
      const centerX = Math.max(10, Math.round((curW - winSize.width) / 2));
      const centerY = Math.max(MENUBAR_HEIGHT + 10, Math.round(MENUBAR_HEIGHT + (availableHeight - winSize.height) / 2));
      setPosition({ x: centerX, y: centerY });
      setSize(winSize);
      preMaxRef.current = { size: winSize, position: { x: centerX, y: centerY } };
    }
  }, []);

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 220); // 220ms smooth macOS dismiss animation
  };

  const handleMinimizeClick = (e) => {
    if (e) e.stopPropagation();
    updateGenieCoords();
    onMinimize?.();
  };

  const handleMaximize = (e) => {
    if (e) e.stopPropagation();
    setIsZooming(true);
    setTimeout(() => setIsZooming(false), 380);

    if (!isMaximized) {
      preMaxRef.current = { size, position };
      playSnapSound('maximize');
    } else {
      if (preMaxRef.current) {
        setSize(preMaxRef.current.size);
        setPosition(preMaxRef.current.position);
      }
      playSnapSound('restore');
    }

    if (onToggleMaximize) {
      onToggleMaximize();
    } else {
      setLocalMaximized(prev => !prev);
    }
  };

  // Windows-style Full Screen Drag-from-Middle to Restore / Minimize
  const handleTitleBarPointerDown = (e) => {
    onFocus?.();
    if (e.button !== undefined && e.button !== 0) return; // Only primary mouse button or touch
    if (e.target.closest('.mac-traffic-lights, .mac-btn, button, a, input, [data-no-drag]')) return;

    if (!isMaximized) return; // Normal floating window is handled by Rnd

    // Initiate drag on full screen window
    const clickX = e.clientX;
    const clickY = e.clientY;
    const ratioX = Math.max(0.12, Math.min(0.88, clickX / windowDimensions.width));

    dragStartRef.current = {
      startClientX: clickX,
      startClientY: clickY,
      ratioX,
      hasDetached: false
    };
    isDraggingMaximized.current = true;

    const onPointerMove = (moveEvent) => {
      if (!isDraggingMaximized.current) return;
      const curX = moveEvent.clientX;
      const curY = moveEvent.clientY;
      const deltaX = curX - dragStartRef.current.startClientX;
      const deltaY = curY - dragStartRef.current.startClientY;
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Trigger restore once moved past 6px downwards or horizontally
      if (!dragStartRef.current.hasDetached && dist > 6) {
        dragStartRef.current.hasDetached = true;
        isDragRestoringRef.current = true;

        const restoredSize = preMaxRef.current?.size || getDefaultSize();
        const initialX = Math.round(curX - restoredSize.width * dragStartRef.current.ratioX);
        const initialY = Math.max(MENUBAR_HEIGHT, Math.round(curY - 18));

        const boundedX = Math.max(10, Math.min(windowDimensions.width - restoredSize.width - 10, initialX));
        const boundedY = Math.max(MENUBAR_HEIGHT, Math.min(windowDimensions.height - DOCK_CLEARANCE - 40, initialY));

        setSize(restoredSize);
        setPosition({ x: boundedX, y: boundedY });
        setIsInteracting(true);
        playSnapSound('restore');

        if (onToggleMaximize) {
          onToggleMaximize();
        } else {
          setLocalMaximized(false);
        }
      }

      if (dragStartRef.current.hasDetached) {
        const restoredSize = preMaxRef.current?.size || getDefaultSize();
        const curWindowX = Math.round(curX - restoredSize.width * dragStartRef.current.ratioX);
        const curWindowY = Math.round(curY - 18);

        const boundedX = Math.max(10, Math.min(windowDimensions.width - restoredSize.width - 10, curWindowX));
        const boundedY = Math.max(MENUBAR_HEIGHT, Math.min(windowDimensions.height - DOCK_CLEARANCE - 30, curWindowY));

        setPosition({ x: boundedX, y: boundedY });

        // Aero Snap preview zones
        if (curY <= MENUBAR_HEIGHT + 8) {
          setSnapPreview('maximize');
        } else if (curY >= windowDimensions.height - DOCK_CLEARANCE - 10) {
          setSnapPreview('minimize');
        } else {
          setSnapPreview(null);
        }
      }
    };

    const onPointerUp = (upEvent) => {
      if (!isDraggingMaximized.current) return;
      isDraggingMaximized.current = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      if (dragStartRef.current.hasDetached) {
        setIsInteracting(false);
        const finalY = upEvent.clientY;
        const finalX = upEvent.clientX;

        if (finalY <= MENUBAR_HEIGHT + 8) {
          setSnapPreview(null);
          isDragRestoringRef.current = false;
          handleMaximize();
        } else if (finalY >= windowDimensions.height - DOCK_CLEARANCE - 10) {
          setSnapPreview(null);
          isDragRestoringRef.current = false;
          handleMinimizeClick();
        } else {
          setSnapPreview(null);
          const restoredSize = preMaxRef.current?.size || getDefaultSize();
          const targetX = Math.max(10, Math.min(windowDimensions.width - restoredSize.width - 10, Math.round(finalX - restoredSize.width * dragStartRef.current.ratioX)));
          const targetY = Math.max(MENUBAR_HEIGHT, Math.min(windowDimensions.height - DOCK_CLEARANCE - 40, Math.round(finalY - 18)));
          setPosition({ x: targetX, y: targetY });
          preMaxRef.current = { size: restoredSize, position: { x: targetX, y: targetY } };
          isDragRestoringRef.current = false;
        }
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
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
        return <TrashApp />;
      default:
        return <div className="window-content-inner"><p>Loading...</p></div>;
    }
  };

  const maximizedHeight = Math.max(300, windowDimensions.height - MENUBAR_HEIGHT);
  const maximizedWidth = windowDimensions.width;

  useEffect(() => {
    if (!isMaximized && preMaxRef.current) {
      if (!isDragRestoringRef.current) {
        setSize(preMaxRef.current.size);
        setPosition(preMaxRef.current.position);
      }
    }
  }, [isMaximized]);

  return (
    <>
      <Rnd
        className={`app-window ${isActive ? 'active' : ''} ${isMaximized ? 'maximized' : ''} ${isZooming ? 'zooming' : ''} ${isInteracting ? 'interacting' : ''} ${getAnimClass()}`}
        size={isMaximized ? { width: maximizedWidth, height: maximizedHeight } : size}
        position={isMaximized ? { x: 0, y: 0 } : position}
        onDragStart={() => setIsInteracting(true)}
        onDrag={(e, d) => {
          if (d.y <= MENUBAR_HEIGHT + 6) {
            setSnapPreview('maximize');
          } else if (d.y >= windowDimensions.height - DOCK_CLEARANCE - 20) {
            setSnapPreview('minimize');
          } else {
            setSnapPreview(null);
          }
        }}
        onDragStop={(e, d) => {
          setIsInteracting(false);
          setSnapPreview(null);
          if (d.y <= MENUBAR_HEIGHT + 6) {
            handleMaximize();
          } else if (d.y >= windowDimensions.height - DOCK_CLEARANCE - 20) {
            handleMinimizeClick();
          } else {
            if (!isMaximized) {
              setPosition({ x: d.x, y: d.y });
              preMaxRef.current = { size, position: { x: d.x, y: d.y } };
            }
          }
        }}
        onResizeStart={() => setIsInteracting(true)}
        onResizeStop={(e, direction, ref, delta, position) => {
          setIsInteracting(false);
          if (!isMaximized) {
            setSize({ width: ref.style.width, height: ref.style.height });
            setPosition(position);
            preMaxRef.current = { size: { width: ref.style.width, height: ref.style.height }, position };
          }
        }}
        onMouseDown={onFocus}
        dragHandleClassName="window-titlebar"
        cancel=".mac-traffic-lights, .mac-btn, button, a, input, [data-no-drag]"
        disableDragging={isMaximized || animState !== 'visible'}
        enableResizing={!isMaximized && animState === 'visible'}
        minWidth={320}
        minHeight={220}
        bounds="parent"
        style={{ zIndex: isMaximized ? (isActive ? 300 : 150) : (isActive ? 100 : 10) }}
      >
        <div ref={windowInnerRef} className={`window-inner ${getAnimClass()}`}>
          {/* macOS Style Titlebar - double-click to toggle fullscreen, drag down to restore */}
          <div
            className={`window-titlebar ${isMaximized ? 'is-maximized-titlebar' : ''}`}
            onPointerDown={handleTitleBarPointerDown}
            onDoubleClick={handleMaximize}
            title={isMaximized ? "Drag down from the middle to restore or minimize (like in Windows)" : "Double-click to toggle full screen"}
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
                onClick={handleMinimizeClick}
                title="Minimize"
              >
                <span className="mac-symbol">–</span>
              </button>
              <button
                className="mac-btn maximize"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={handleMaximize}
                title={isMaximized ? "Exit Full Screen" : "Full Screen"}
              >
                <span className="mac-symbol">{isMaximized ? '⤢' : '+'}</span>
              </button>
            </div>

            <div className="window-title">
              <Folder size={13} className="titlebar-folder-icon" />
              <span>{app.title || (app.id === 'finder' ? 'VarunOS — Portfolio & Projects' : app.name)}</span>
            </div>

            {/* Windows-style Full Screen Drag-from-Middle Handle */}
            {isMaximized && (
              <div className="titlebar-fullscreen-pull-handle" title="Drag down from middle to restore or minimize (like in Windows)">
                <div className="pull-handle-bar" />
                <span className="pull-handle-hint">Drag down to restore</span>
              </div>
            )}

            <div className="titlebar-right-spacer" />
          </div>

          <div className={`window-content ${app.id === 'resume' || app.id === 'contact' || app.id === 'figma' || app.id === 'finder' || app.id === 'safari' || app.id === 'settings' || app.id === 'vscode' || app.id === 'terminal' || app.id === 'trash' ? 'no-padding' : ''}`}>
            {renderContent()}
          </div>
        </div>
      </Rnd>

      {/* Windows Aero Snap Glow Previews for Maximize & Minimize */}
      {snapPreview === 'maximize' && createPortal(
        <div className="window-snap-preview maximize-snap">
          <div className="snap-preview-box">
            <div className="snap-preview-content">
              <span className="snap-icon">⤢</span>
              <span className="snap-text">Release to Full Screen</span>
            </div>
          </div>
        </div>,
        document.body
      )}

      {snapPreview === 'minimize' && createPortal(
        <div className="window-snap-preview minimize-snap">
          <div className="snap-preview-dock-bar">
            <span className="snap-icon">–</span>
            <span className="snap-text">Release to Minimize to Dock</span>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Window;