import React, { useState, useEffect } from 'react';
import {
  Wifi,
  Battery,
  Smartphone,
  Tablet,
  Laptop,
  Compass,
  Search,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Star,
  FileText,
  Mail,
  Settings,
  Coffee,
  Trash2,
  Folder,
  Volume2
} from 'lucide-react';
import './DeviceHomeScreen.css';

// Authentic App Icons for iPad & iOS Home Screens
const FigmaAppIcon = () => (
  <div className="device-app-icon-inner figma-bg">
    <svg width="22" height="33" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 9.5C0 4.25329 4.25329 0 9.5 0H19V19H9.5C4.25329 19 0 14.7467 0 9.5Z" fill="#F24E1E" />
      <path d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262" />
      <path d="M0 28.5C0 23.2533 4.25329 19 9.5 19H19V38H9.5C4.25329 38 0 33.7467 0 28.5Z" fill="#A259FF" />
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
    </svg>
  </div>
);

const FinderAppIcon = () => (
  <div className="device-app-icon-inner finder-bg">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="9.5" r="1.5" fill="#ffffff" />
      <circle cx="16" cy="9.5" r="1.5" fill="#ffffff" />
      <path d="M7 14.5C8.5 17 15.5 17 17 14.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

const VsCodeAppIcon = () => (
  <div className="device-app-icon-inner vscode-bg">
    <span style={{ color: '#38bdf8', fontSize: '18px', fontWeight: '800', fontFamily: 'monospace' }}>
      &lt;/&gt;
    </span>
  </div>
);

const TerminalAppIcon = () => (
  <div className="device-app-icon-inner terminal-bg">
    <span style={{ color: '#4ade80', fontSize: '16px', fontWeight: '800', fontFamily: 'monospace' }}>
      &gt;_
    </span>
  </div>
);

const ResumeAppIcon = () => (
  <div className="device-app-icon-inner resume-bg">
    <FileText size={24} color="#ffffff" />
  </div>
);

const ContactAppIcon = () => (
  <div className="device-app-icon-inner contact-bg">
    <Mail size={24} color="#ffffff" />
  </div>
);

const ReviewsAppIcon = () => (
  <div className="device-app-icon-inner reviews-bg">
    <Star size={24} color="#ffffff" fill="#ffffff" />
  </div>
);

const SettingsAppIcon = () => (
  <div className="device-app-icon-inner settings-bg">
    <Settings size={24} color="#e4e4e7" />
  </div>
);

const CoffeeAppIcon = () => (
  <div className="device-app-icon-inner coffee-bg">
    <Coffee size={24} color="#ffffff" />
  </div>
);

const TrashAppIcon = () => (
  <div className="device-app-icon-inner trash-bg">
    <Trash2 size={24} color="#d4d4d8" />
  </div>
);

const DEVICE_APPS = [
  { id: 'finder', name: 'Portfolio', subtitle: 'Projects & Work', icon: FinderAppIcon },
  { id: 'figma', name: 'Figma', subtitle: 'Design Workspace', icon: FigmaAppIcon },
  { id: 'vscode', name: 'VS Code', subtitle: 'Web IDE & Code', icon: VsCodeAppIcon },
  { id: 'terminal', name: 'Terminal', subtitle: 'Zsh Shell', icon: TerminalAppIcon },
  { id: 'resume', name: 'Resume', subtitle: 'Interactive CV', icon: ResumeAppIcon },
  { id: 'contact', name: 'Contact', subtitle: 'Get in Touch', icon: ContactAppIcon },
  { id: 'reviews', name: 'Reviews', subtitle: 'Testimonials', icon: ReviewsAppIcon },
  { id: 'settings', name: 'Settings', subtitle: 'Customization', icon: SettingsAppIcon },
  { id: 'coffee', name: 'Buy Coffee', subtitle: 'Support Varun', icon: CoffeeAppIcon },
  { id: 'trash', name: 'Trash', subtitle: 'Recycle Bin', icon: TrashAppIcon }
];

const DOCK_APP_IDS = {
  mobile: ['finder', 'figma', 'resume', 'contact'],
  tablet: ['finder', 'figma', 'vscode', 'terminal', 'resume', 'contact', 'reviews', 'settings']
};

const DeviceHomeScreen = ({
  mode = 'tablet', // 'tablet' | 'mobile'
  openWindows = [],
  activeWindow = null,
  onOpenApp,
  deviceModeOverride = 'auto',
  onSetDeviceMode
}) => {
  const [time, setTime] = useState(new Date());
  const [showDeviceMenu, setShowDeviceMenu] = useState(false);
  const [dynamicIslandExpanded, setDynamicIslandExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    return time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const formatDate = () => {
    return time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleAppClick = (appId) => {
    if (onOpenApp) {
      onOpenApp(appId);
    }
  };

  const dockApps = mode === 'mobile' ? DOCK_APP_IDS.mobile : DOCK_APP_IDS.tablet;

  return (
    <div className={`device-home-container mode-${mode}`}>
      {/* 1. TOP STATUS BAR */}
      {mode === 'tablet' ? (
        // ================= iPadOS STATUS BAR =================
        <header className="ipados-status-bar" data-no-drag>
          <div className="ipad-status-left">
            <span className="ipad-status-time">{formatTime()}</span>
            <span className="ipad-status-date">{formatDate()}</span>
          </div>

          <div className="ipad-status-center">
            <div className="ipad-camera-lens" title="FaceTime HD Camera Sensor" />
          </div>

          <div className="ipad-status-right">
            <Wifi size={14} className="ipad-status-icon" />
            <div className="ipad-battery-pill" title="Battery: 98%">
              <span className="ipad-battery-text">98%</span>
              <div className="ipad-battery-outline">
                <div className="ipad-battery-fill" style={{ width: '98%' }} />
              </div>
            </div>
          </div>
        </header>
      ) : (
        // ================= iOS DYNAMIC ISLAND STATUS BAR =================
        <header className="ios-status-bar" data-no-drag>
          <div className="ios-status-left">
            <span className="ios-status-time">{formatTime()}</span>
          </div>

          {/* Dynamic Island Capsule */}
          <div
            className={`ios-dynamic-island ${dynamicIslandExpanded ? 'expanded' : ''}`}
            onClick={() => setDynamicIslandExpanded(prev => !prev)}
            title="Dynamic Island"
          >
            <div className="island-lens-left" />
            <div className="island-center-content">
              {activeWindow ? (
                <span className="island-app-badge">
                  <span className="island-pulse" />
                  {activeWindow.toUpperCase()}
                </span>
              ) : (
                <span className="island-brand">VarunOS</span>
              )}
            </div>
            <div className="island-wave-right">
              <span className="wave-bar b1" />
              <span className="wave-bar b2" />
              <span className="wave-bar b3" />
            </div>
          </div>

          <div className="ios-status-right">
            {/* Cellular Signal Bars */}
            <div className="ios-signal-bars" title="5G Cellular: Full Signal">
              <span className="bar bar1" />
              <span className="bar bar2" />
              <span className="bar bar3" />
              <span className="bar bar4" />
            </div>
            <span className="ios-5g-badge">5G</span>
            <Wifi size={13} className="ios-status-icon" />
            <div className="ios-battery-pill" title="Battery: 96%">
              <div className="ios-battery-fill" style={{ width: '96%' }} />
            </div>
          </div>
        </header>
      )}

      {/* 2. HOME SCREEN BODY */}
      <main className="device-home-body">
        {/* Profile Glance Card (iPad & iOS Widget) */}
        {mode === 'tablet' ? (
          <div className="ipad-today-widget">
            <div className="ipad-widget-profile">
              <div className="ipad-widget-avatar-wrap">
                <picture>
                  <source srcSet="/varun-avatar.webp" type="image/webp" />
                  <img
                    src="/varun-avatar.jpg"
                    alt="Varun Sehgal avatar"
                    className="ipad-widget-avatar"
                    width="54"
                    height="54"
                  />
                </picture>
                <span className="ipad-online-dot" />
              </div>
              <div className="ipad-widget-info">
                <div className="ipad-widget-title-row">
                  <h1 className="ipad-widget-name">Varun Sehgal</h1>
                  <span className="ipad-role-pill">Lead UI/UX Designer</span>
                </div>
                <p className="ipad-widget-desc">
                  Architecting AI-powered SaaS interfaces, high-conversion design systems & multi-app ecosystems.
                </p>
                <div className="ipad-widget-tags">
                  <span className="widget-tag">Figma Systems</span>
                  <span className="widget-tag">Next.js & React</span>
                  <span className="widget-tag">National Hackathon Winner</span>
                </div>
              </div>
            </div>
            <div className="ipad-widget-actions">
              <button
                className="ipad-quick-btn primary"
                onClick={() => handleAppClick('figma')}
              >
                <Sparkles size={13} />
                <span>Open Figma</span>
              </button>
              <button
                className="ipad-quick-btn"
                onClick={() => handleAppClick('resume')}
              >
                <FileText size={13} />
                <span>Resume</span>
              </button>
              <button
                className="ipad-quick-btn"
                onClick={() => handleAppClick('reviews')}
              >
                <Star size={13} />
                <span>Reviews</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="ios-glance-widget">
            <div className="ios-widget-avatar-wrap">
              <picture>
                <source srcSet="/varun-avatar.webp" type="image/webp" />
                <img
                  src="/varun-avatar.jpg"
                  alt="Varun Sehgal avatar"
                  className="ios-widget-avatar"
                  width="44"
                  height="44"
                />
              </picture>
              <span className="ios-online-dot" />
            </div>
            <div className="ios-widget-info">
              <div className="ios-widget-name">Varun Sehgal</div>
              <div className="ios-widget-sub">UI/UX & Product Engineer</div>
              <div className="ios-status-tag">🟢 Open for roles & freelance</div>
            </div>
          </div>
        )}

        {/* APP ICONS GRID */}
        <section className={`device-app-grid grid-${mode}`} aria-label="Apps Grid">
          {DEVICE_APPS.map((app) => {
            const Icon = app.icon;
            const isOpen = openWindows.includes(app.id);
            const isActive = activeWindow === app.id;

            return (
              <button
                key={app.id}
                className={`device-app-item ${isOpen ? 'is-open' : ''} ${isActive ? 'is-active' : ''}`}
                onClick={() => handleAppClick(app.id)}
                title={`Open ${app.name}`}
              >
                <div className="device-app-icon-squircle">
                  <Icon />
                  {isOpen && <span className="app-running-dot" />}
                </div>
                <span className="device-app-label">{app.name}</span>
              </button>
            );
          })}
        </section>

        {/* iOS Search Pill */}
        {mode === 'mobile' && (
          <div className="ios-search-pill" onClick={() => handleAppClick('finder')} role="button" tabIndex={0}>
            <Search size={13} />
            <span>Search Portfolio</span>
          </div>
        )}
      </main>

      {/* 3. BOTTOM FLOATING DOCK */}
      <footer className={`device-bottom-dock dock-${mode}`} data-no-drag>
        <div className="device-dock-inner">
          {dockApps.map((id) => {
            const app = DEVICE_APPS.find(a => a.id === id);
            if (!app) return null;
            const Icon = app.icon;
            const isOpen = openWindows.includes(app.id);

            return (
              <button
                key={id}
                className={`device-dock-item ${isOpen ? 'is-open' : ''}`}
                onClick={() => handleAppClick(id)}
                title={app.name}
              >
                <div className="device-dock-icon-squircle">
                  <Icon />
                </div>
                {isOpen && <span className="dock-running-dot" />}
              </button>
            );
          })}
        </div>
      </footer>

      {/* 4. iOS HOME INDICATOR BAR */}
      {mode === 'mobile' && (
        <div className="ios-home-indicator" />
      )}
    </div>
  );
};

export default DeviceHomeScreen;
