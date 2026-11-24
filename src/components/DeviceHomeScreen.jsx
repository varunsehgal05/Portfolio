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
  Volume2,
  Lock,
  Moon,
  Clock,
  Trophy,
  Award,
  Copy,
  Check,
  ShieldCheck,
  Cpu,
  Code2,
  Terminal,
  Zap
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
  const [copiedId, setCopiedId] = useState(false);
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

  // Immediate Sleep & Lo-Fi Screensaver Trigger
  const handleSleepTrigger = (e) => {
    if (e) e.stopPropagation();
    window.dispatchEvent(new CustomEvent('varunos:sleep'));
  };

  const handleCopyCredential = (e) => {
    if (e) e.stopPropagation();
    const credId = 'd883bbf5-5d9f-43e9-a417-21a49009f4ff';
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(credId);
    }
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2400);
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
            <button
              className="ipad-status-sleep-btn"
              onClick={handleSleepTrigger}
              title="Put iPad to sleep (Lo-Fi Screensaver)"
              type="button"
            >
              <Moon size={12} className="sleep-icon" />
              <span>Lock</span>
            </button>
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
            <button
              className="ios-status-sleep-btn"
              onClick={handleSleepTrigger}
              title="Lock Screen & Lo-Fi"
              type="button"
            >
              <Moon size={12} />
            </button>
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
        {mode === 'tablet' ? (
          <>
            {/* Top Smart Widgets Deck: Profile + VibeCoder Live Telemetry */}
            <div className="ipad-top-deck">
              {/* Widget 1: Profile & Quick Actions */}
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
                  <button
                    className="ipad-quick-btn sleep"
                    onClick={handleSleepTrigger}
                    title="Lock Screen with Lo-Fi music"
                  >
                    <Moon size={13} />
                    <span>Sleep & Lo-Fi</span>
                  </button>
                </div>
              </div>

              {/* Widget 2: VibeCoder Engine & Live Clock Widget */}
              <div className="ipad-telemetry-widget">
                <div className="telemetry-widget-header">
                  <div className="telemetry-badge">
                    <Zap size={11} className="telemetry-zap" />
                    <span>VIBECODER LIVE ENGINE</span>
                  </div>
                  <span className="telemetry-fps">Canvas: 60 FPS</span>
                </div>

                <div className="telemetry-clock-display">
                  <span className="telemetry-time">{formatTime()}</span>
                  <span className="telemetry-sprint">Sprint 48 // Deep Focus</span>
                </div>

                <div className="telemetry-stats-row">
                  <div className="telemetry-chip">
                    <span className="chip-dot green" />
                    <span>AST 100% Synced</span>
                  </div>
                  <div className="telemetry-chip">
                    <span className="chip-dot blue" />
                    <span>WebGL 2.0</span>
                  </div>
                  <div className="telemetry-chip">
                    <span className="chip-dot purple" />
                    <span>Lo-Fi Audio</span>
                  </div>
                </div>
              </div>
            </div>

            {/* APP ICONS GRID */}
            <section className="device-app-grid grid-tablet" aria-label="Apps Grid">
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

            {/* Bottom Widgets Deck: Hackathon Win Milestone + Engineering Specs */}
            <div className="ipad-bottom-deck">
              {/* Widget A: Hackathon Win Card (Matching User Screenshot) */}
              <div className="ipad-milestone-widget">
                <div className="milestone-card-top">
                  <span className="milestone-date">Apr 2025</span>
                  <span className="milestone-win-badge">
                    <Trophy size={11} />
                    <span>Hackathon Win</span>
                  </span>
                </div>
                <h3 className="milestone-title">
                  HAcKeThor 1st Runner-Up (2nd Place) <span className="milestone-sub-text">awarded 2nd Place / 1st Runner-Up by Unstop</span>
                </h3>
                <p className="milestone-desc">
                  Awarded 1st runner-up (2nd place) in national competitive hackathon demonstrating rapid UX prototyping, interactive user testing, and AI tool integration under high pressure.
                </p>
                <div className="milestone-cred-bar">
                  <span className="cred-pill orange">
                    <Award size={12} />
                    <span>1st Runner-Up (2nd Place)</span>
                  </span>
                  <span className="cred-pill-id">
                    ID: d883bbf5-5d9f-43e9-a417-21a49009f4ff
                  </span>
                </div>
                <div className="milestone-actions">
                  <button
                    className="milestone-btn primary"
                    onClick={() => handleAppClick('finder')}
                    title="View Verified Hackathon Credential"
                  >
                    <ShieldCheck size={13} />
                    <span>Verify Credential</span>
                  </button>
                  <button
                    className={`milestone-btn ${copiedId ? 'copied' : ''}`}
                    onClick={handleCopyCredential}
                    title="Copy Credential ID"
                  >
                    {copiedId ? <Check size={13} color="#22c55e" /> : <Copy size={13} />}
                    <span>{copiedId ? 'Copied ID ✓' : 'Copy ID'}</span>
                  </button>
                </div>
              </div>

              {/* Widget B: Engineering & Design Tokens Architecture */}
              <div className="ipad-specs-widget">
                <div className="specs-card-top">
                  <span className="specs-tag-title">System Architecture</span>
                  <span className="specs-os-badge">iPadOS 18.2</span>
                </div>
                <h3 className="specs-title">Design Engineering & Vibe Stack</h3>
                <div className="specs-metrics-grid">
                  <div className="spec-metric-item">
                    <span className="metric-label">Design Tokens</span>
                    <span className="metric-value">Figma Variables + CSS</span>
                  </div>
                  <div className="spec-metric-item">
                    <span className="metric-label">Runtime</span>
                    <span className="metric-value">React 19 + Framer Motion</span>
                  </div>
                  <div className="spec-metric-item">
                    <span className="metric-label">Audio Synth</span>
                    <span className="metric-value">Procedural Lo-Fi (78 BPM)</span>
                  </div>
                  <div className="spec-metric-item">
                    <span className="metric-label">Agent Engine</span>
                    <span className="metric-value">Antigravity Swarm v2.4</span>
                  </div>
                </div>
                <div className="specs-footer">
                  <span className="specs-status-chip">
                    <span className="status-dot-pulse" />
                    <span>All 10 Apps Sandboxed & Verified</span>
                  </span>
                  <div className="specs-quick-actions">
                    <button
                      className="specs-pill-btn"
                      onClick={() => handleAppClick('terminal')}
                      title="Launch Shell"
                    >
                      <Terminal size={12} />
                      <span>Shell</span>
                    </button>
                    <button
                      className="specs-pill-btn"
                      onClick={() => handleAppClick('vscode')}
                      title="Open Code"
                    >
                      <Code2 size={12} />
                      <span>Code</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Mobile View */
          <>
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
              <button
                className="ios-sleep-quick-btn"
                onClick={handleSleepTrigger}
                title="Lock & Lo-Fi"
              >
                <Moon size={14} />
              </button>
            </div>

            {/* Mobile App Grid */}
            <section className="device-app-grid grid-mobile" aria-label="Apps Grid">
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

            {/* Mobile Hackathon Glance */}
            <div className="ios-hackathon-card" onClick={() => handleAppClick('finder')}>
              <div className="ios-hackathon-badge">
                <Trophy size={11} />
                <span>Hackathon 1st Runner-Up (2nd Place)</span>
              </div>
              <div className="ios-hackathon-sub">National UX & AI Prototyping Win by Unstop</div>
            </div>

            {/* iOS Search Pill */}
            <div className="ios-search-pill" onClick={() => handleAppClick('finder')} role="button" tabIndex={0}>
              <Search size={13} />
              <span>Search Portfolio</span>
            </div>
          </>
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
