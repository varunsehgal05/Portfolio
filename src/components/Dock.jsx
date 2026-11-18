import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, 
  Settings, 
  Trash2, 
  FileText,
  Mail,
  Folder
} from 'lucide-react';
import './Dock.css';

const FigmaLogo = () => (
  <svg width="18" height="27" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 9.5C0 4.25329 4.25329 0 9.5 0H19V19H9.5C4.25329 19 0 14.7467 0 9.5Z" fill="#F24E1E"/>
    <path d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262"/>
    <path d="M0 28.5C0 23.2533 4.25329 19 9.5 19H19V38H9.5C4.25329 38 0 33.7467 0 28.5Z" fill="#A259FF"/>
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
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

const SafariIcon = () => (
  <div className="dock-icon-inner safari-bg">
    <Compass size={24} color="#ffffff" />
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

const TrashDockIcon = () => (
  <div className="dock-icon-inner trash-bg">
    <Trash2 size={21} color="#d4d4d8" />
  </div>
);

const DOCK_ITEMS = [
  { id: 'finder', name: 'Finder', icon: FinderIcon },
  { id: 'safari', name: 'Safari', icon: SafariIcon },
  { id: 'vscode', name: 'VS Code', icon: VsCodeIcon },
  { id: 'figma', name: 'Figma', icon: FigmaDockIcon },
  { id: 'terminal', name: 'Terminal', icon: TerminalIcon },
  { id: 'resume', name: 'Resume', icon: ResumeIcon },
  { id: 'contact', name: 'Contact', icon: ContactDockIcon },
  { id: 'settings', name: 'Settings', icon: SettingsIcon },
  { id: 'separator', isSeparator: true },
  { id: 'trash', name: 'Trash', icon: TrashDockIcon }
];

const Dock = ({ openWindows = [], minimizedWindows = [], activeWindow, bouncingAppProp = null, onAppClick }) => {
  const [mouseX, setMouseX] = useState(null);
  const [bouncingApp, setBouncingApp] = useState(null);
  const [isDockVisible, setIsDockVisible] = useState(false);
  const isHoveringRef = useRef(false);
  const hideTimerRef = useRef(null);
  const dockRef = useRef(null);

  // Global mouse tracking: pops up when mouse touches bottom edge (like Windows / macOS auto-hide)
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const bottomThreshold = window.innerHeight - 24; // within 24px of bottom edge

      if (e.clientY >= bottomThreshold) {
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current);
          hideTimerRef.current = null;
        }
        setIsDockVisible(true);
      } else if (e.clientY < window.innerHeight - 85 && !isHoveringRef.current) {
        // Mouse moved well above the bottom bar
        if (!hideTimerRef.current && isDockVisible) {
          hideTimerRef.current = setTimeout(() => {
            if (!isHoveringRef.current) {
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
  }, [isDockVisible]);

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
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      if (!isHoveringRef.current) {
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
      {/* Invisible bottom edge sensor hotspot */}
      <div 
        className="dock-edge-sensor"
        onMouseEnter={() => {
          if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
          setIsDockVisible(true);
        }}
      />

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
        {DOCK_ITEMS.map((item, idx) => {
          if (item.isSeparator) {
            return <div key={`sep-${idx}`} className="dock-separator" />;
          }

          const IconComponent = item.icon;
          const isOpen = openWindows.includes(item.id);
          const isMin = minimizedWindows.includes(item.id);
          const isActive = activeWindow === item.id && !isMin;
          const isBouncing = bouncingApp === item.id || bouncingAppProp === item.id;

          // Compute magnification scale using smooth cosine curve
          let scale = 1;
          let translateY = 0;
          if (mouseX !== null && dockRef.current) {
            // Estimate icon center relative to dock
            const iconWidth = 50; // 42px icon + 8px gap
            const iconCenter = idx * iconWidth + iconWidth / 2;
            const dist = Math.abs(mouseX - iconCenter);
            const maxDist = 110;

            if (dist < maxDist) {
              const factor = Math.cos((dist / maxDist) * (Math.PI / 2));
              scale = 1 + 0.32 * factor;
              translateY = -10 * factor;
            }
          }

          return (
            <div 
              key={item.id} 
              data-app-id={item.id}
              className={`dock-item ${isMin ? 'minimized-app' : ''} ${isBouncing ? 'dock-bouncing' : ''}`}
              onClick={() => handleClick(item.id)}
              style={{
                transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`
              }}
            >
              <div className="dock-tooltip">{item.name}</div>
              <div className="dock-icon-wrapper">
                <IconComponent />
              </div>
              <div className="dock-dot-slot">
                {isOpen && <div className={`dock-dot ${isActive ? 'active' : ''}`} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Dock;