import { Rnd } from 'react-rnd';
import { Folder, LayoutGrid, List } from 'lucide-react';
import './Window.css';
import { useState, useEffect, useRef } from 'react';
import ResumeApp from './ResumeApp';
import ContactApp from './ContactApp';
import FigmaApp from './FigmaApp';
import FinderApp from './FinderApp';

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
  defaultMaximized = (app.id !== 'finder')
}) => {
  const [localMaximized, setLocalMaximized] = useState(defaultMaximized);
  const isMaximized = controlledMaximized !== undefined ? controlledMaximized : localMaximized;
  const [isInteracting, setIsInteracting] = useState(false);
  const [animState, setAnimState] = useState(isMinimized ? 'hidden' : 'visible');
  const prevMinimized = useRef(isMinimized);
  const windowInnerRef = useRef(null);

  const handleMaximize = () => {
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
      (app.id === 'contact' ? document.querySelector(`.dock-item[data-app-id="settings"]`) : null) ||
      document.querySelector('.dock');

    if (dockIcon) {
      const winRect = winEl.getBoundingClientRect();
      const dockRect = dockIcon.getBoundingClientRect();

      const winCenterX = winRect.left + winRect.width / 2;
      const winCenterY = winRect.top + winRect.height / 2;
      const dockCenterX = dockRect.left + dockRect.width / 2;
      const dockCenterY = dockRect.top + dockRect.height / 2;

      const deltaX = dockCenterX - winCenterX;
      const deltaY = dockCenterY - winCenterY;

      winInner.style.setProperty('--genie-target-x', `${deltaX}px`);
      winInner.style.setProperty('--genie-target-y', `${deltaY}px`);
    }
  };

  useEffect(() => {
    if (prevMinimized.current !== isMinimized) {
      if (isMinimized) {
        updateGenieCoords();
        setAnimState('minimizing');
        const timer = setTimeout(() => {
          setAnimState('hidden');
        }, 460);
        return () => clearTimeout(timer);
      } else {
        setAnimState('restoring');
        requestAnimationFrame(() => {
          updateGenieCoords();
        });
        const timer = setTimeout(() => {
          setAnimState('visible');
        }, 420);
        return () => clearTimeout(timer);
      }
    }
    prevMinimized.current = isMinimized;
  }, [isMinimized]);

  // Default bounds and position based on app type
  const getDefaultSize = () => {
    if (app.id === 'trash') return { width: 400, height: 300 };
    if (app.id === 'finder') return { width: Math.min(window.innerWidth - 80, 920), height: Math.min(window.innerHeight - 100, 560) };
    if (app.id === 'figma') return { width: Math.min(window.innerWidth - 60, 1100), height: Math.min(window.innerHeight - 80, 720) };
    return { width: 800, height: 500 };
  };

  const getInitialPosition = () => {
    const size = getDefaultSize();
    const centerX = Math.max(20, (window.innerWidth - size.width) / 2);
    const centerY = Math.max(36, (window.innerHeight - size.height) / 2 - 15);
    if (app.id === 'finder' || app.id === 'figma') {
      return { x: centerX, y: centerY };
    }
    return { x: 100 + Math.random() * 40, y: 50 + Math.random() * 40 };
  };

  const [position, setPosition] = useState(getInitialPosition());
  const [size, setSize] = useState(getDefaultSize());

  useEffect(() => {
    updateGenieCoords();
  }, [position, size, isMaximized]);

  const getAnimClass = () => {
    if (animState === 'minimizing') return 'minimizing';
    if (animState === 'hidden') return 'minimized';
    if (animState === 'restoring') return 'restoring';
    return '';
  };

  const renderContent = () => {
    switch (app.id) {
      case 'finder':
        return <FinderApp onOpenApp={onOpenApp} />;
      case 'figma':
        return <FigmaApp isInteracting={isInteracting} userName={userName} />;
      case 'vscode':
        return (
          <div className="window-content-inner vscode-content">
            <div className="sidebar">
              <h3>EXPLORER</h3>
              <ul>
                <li>Portfolio</li>
                <li>Projects</li>
                <li>Experiments</li>
                <li>GitHub</li>
                <li className="active-file">README.md</li>
              </ul>
            </div>
            <div className="editor">
              <div className="editor-tab">README.md</div>
              <div className="editor-code">
                <pre>
                  <code>
                    {`# Varun Sehgal

UI/UX Designer & Software Engineer
Graphic Designer
Motion Graphics Artist

> Designing digital experiences...
`}
                  </code>
                </pre>
                <br />
                <a href={app.url} target="_blank" rel="noreferrer" className="action-button">
                  Open GitHub
                </a>
              </div>
            </div>
          </div>
        );
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

  return (
    <Rnd
      className={`app-window ${isActive ? 'active' : ''} ${isMaximized ? 'maximized' : ''} ${getAnimClass()}`}
      size={isMaximized ? { width: '100%', height: '100%' } : size}
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
      disableDragging={isMaximized || animState !== 'visible'}
      enableResizing={!isMaximized && animState === 'visible'}
      minWidth={320}
      minHeight={220}
      bounds="parent"
      style={{ zIndex: isMaximized ? (isActive ? 300 : 150) : (isActive ? 100 : 10) }}
    >
      <div ref={windowInnerRef} className={`window-inner glass-dark ${getAnimClass()}`}>
        {/* macOS Style Titlebar */}
        <div className="window-titlebar" onDoubleClick={handleMaximize}>
          <div className="mac-traffic-lights">
            <button
              className="mac-btn close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              title="Close"
            >
              <span className="mac-symbol">×</span>
            </button>
            <button
              className="mac-btn minimize"
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
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              title={isMaximized ? "Restore" : "Zoom"}
            >
              <span className="mac-symbol">+</span>
            </button>
          </div>

          <div className="window-title">
            <Folder size={13} className="titlebar-folder-icon" />
            <span>{app.title || (app.id === 'finder' ? 'VarunOS — Portfolio & Projects' : app.name)}</span>
          </div>

          <div className="titlebar-view-toggles">
            <div className="view-toggle-group">
              <button className="view-toggle-btn active" title="Grid View">
                <LayoutGrid size={12} />
              </button>
              <button className="view-toggle-btn" title="List View">
                <List size={12} />
              </button>
            </div>
          </div>
        </div>

        <div className={`window-content ${app.id === 'resume' || app.id === 'contact' || app.id === 'figma' || app.id === 'finder' ? 'no-padding' : ''}`}>
          {renderContent()}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;
