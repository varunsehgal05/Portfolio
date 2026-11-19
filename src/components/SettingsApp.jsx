import React, { useState, useEffect } from 'react';
import { 
  Image, 
  Sparkles, 
  Info, 
  Terminal,
  Check, 
  RotateCcw,
  Monitor,
  Sun,
  Moon,
  Palette,
  ExternalLink,
  Copy,
  FileText,
  Mail,
  MapPin,
  GraduationCap,
  Zap,
  Code2,
  Layers,
  Award,
  Flame,
  ArrowRight
} from 'lucide-react';
import { desktopWallpapers, terminalWallpapers } from '../config/wallpapers';
import './SettingsApp.css';

const DESIGN_FACTS = [
  "Varun bridges UI/UX design with autonomous AI vibecoding — turning complex architectures into intuitive, weightless products.",
  "Every sound in VarunOS is synthesized live in-browser using the Web Audio API — 0 pre-recorded audio files needed!",
  "The 48-agent Swarm Engine recreates Joel Califa's viral boid flocking simulation, following your mouse and scroll at 60fps.",
  "EventFlow's 4-step ticketing checkout redesign reduced participant drop-off by 30% via micro-interaction feedback.",
  "Varun architected the CodeSrijan Hackathon Portal, powering 800+ attendees and 50+ project submissions in 72 hours."
];

const TECH_DETAILS = {
  'React 18': 'Modular component hierarchy, custom hooks, and decoupled state management.',
  'Web Audio API': 'Procedurally synthesized mechanical clicks and chord chimes directly in audio buffers.',
  'Califa Swarm': '48 autonomous agents calculating boid cohesion, separation, and dashed SVG vector lines.',
  'Figma Tokens': 'System design tokens matching authentic Figma Electric Blue (#0d99ff) and dark canvas standards.',
  'Vibecoding': 'Full-stack AI-assisted rapid development from design conception to deployed production.'
};

const SettingsApp = ({ userName = 'Guest', onReplaySwarm }) => {
  const [activeTab, setActiveTab] = useState('about'); // Defaults to 'about' so user immediately sees the rich info!
  const [wallpaperSection, setWallpaperSection] = useState('desktop'); // 'desktop' | 'terminal'

  // Interactive Easter Egg & Fact states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeFactIdx, setActiveFactIdx] = useState(0);
  const [selectedTech, setSelectedTech] = useState('React 18');

  // Theme mode: 'dark' | 'light' | 'auto'
  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem('varunos_theme_mode') || 'dark';
    } catch {
      return 'dark';
    }
  });

  // Live Swarm Mouse Flocking: true | false
  const [swarmFollowEnabled, setSwarmFollowEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('varunos_swarm_follow_mouse');
      return saved === null ? true : saved === 'true';
    } catch {
      return true;
    }
  });

  const [activeWallpaper, setActiveWallpaper] = useState(() => {
    try {
      return localStorage.getItem('varunos_desktop_wallpaper') || 'roxy-calendar';
    } catch {
      return 'roxy-calendar';
    }
  });

  const [activeTerminalWallpaper, setActiveTerminalWallpaper] = useState(() => {
    try {
      return localStorage.getItem('varunos_terminal_wallpaper') || 'roxy-calendar';
    } catch {
      return 'roxy-calendar';
    }
  });

  // Apply theme mode to documentElement
  const handleSelectTheme = (mode) => {
    setThemeMode(mode);
    try {
      localStorage.setItem('varunos_theme_mode', mode);
    } catch {}

    let effectiveTheme = mode;
    if (mode === 'auto') {
      const hours = new Date().getHours();
      effectiveTheme = hours >= 7 && hours < 19 ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    window.dispatchEvent(new CustomEvent('varunos-theme-change', { detail: { mode: effectiveTheme } }));
  };

  // Toggle Live Mouse Swarm
  const handleToggleSwarmFollow = () => {
    const nextState = !swarmFollowEnabled;
    setSwarmFollowEnabled(nextState);
    try {
      localStorage.setItem('varunos_swarm_follow_mouse', String(nextState));
    } catch {}
    window.dispatchEvent(new CustomEvent('varunos-toggle-swarm-follow', { detail: { enabled: nextState } }));
  };

  const handleCopyEmail = () => {
    try {
      navigator.clipboard?.writeText('varun.sehgal02@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {}
  };

  const handleNextFact = () => {
    setActiveFactIdx((prev) => (prev + 1) % DESIGN_FACTS.length);
  };

  useEffect(() => {
    const handleDesktopSync = (e) => {
      if (e.detail?.id) setActiveWallpaper(e.detail.id);
    };
    const handleTerminalSync = (e) => {
      if (e.detail?.id) setActiveTerminalWallpaper(e.detail.id);
    };
    const handleSwarmToggleSync = (e) => {
      if (typeof e.detail?.enabled === 'boolean') {
        setSwarmFollowEnabled(e.detail.enabled);
      }
    };
    window.addEventListener('varunos-set-desktop-wallpaper', handleDesktopSync);
    window.addEventListener('varunos-set-terminal-wallpaper', handleTerminalSync);
    window.addEventListener('varunos-toggle-swarm-follow', handleSwarmToggleSync);
    return () => {
      window.removeEventListener('varunos-set-desktop-wallpaper', handleDesktopSync);
      window.removeEventListener('varunos-set-terminal-wallpaper', handleTerminalSync);
      window.removeEventListener('varunos-toggle-swarm-follow', handleSwarmToggleSync);
    };
  }, []);

  const applyWallpaper = (wp) => {
    setActiveWallpaper(wp.id);
    try {
      localStorage.setItem('varunos_desktop_wallpaper', wp.id);
    } catch {}
    window.dispatchEvent(new CustomEvent('varunos-set-desktop-wallpaper', { detail: { id: wp.id } }));
  };

  const applyTerminalWallpaper = (wp) => {
    setActiveTerminalWallpaper(wp.id);
    try {
      localStorage.setItem('varunos_terminal_wallpaper', wp.id);
    } catch {}
    window.dispatchEvent(new CustomEvent('varunos-set-terminal-wallpaper', { detail: { id: wp.id } }));
  };

  return (
    <div className="settings-container">
      {/* Sidebar */}
      <aside className="settings-sidebar">
        <div className="settings-user-card">
          <div className="settings-avatar">V</div>
          <div className="settings-user-info">
            <span className="settings-name">VarunOS</span>
            <span className="settings-sub">User: {userName}</span>
          </div>
        </div>

        <div className="settings-nav">
          <button 
            className={`settings-nav-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <Info size={15} />
            <span>About Varun & OS</span>
          </button>

          <button 
            className={`settings-nav-item ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            <Palette size={15} />
            <span>Appearance</span>
          </button>

          <button 
            className={`settings-nav-item ${activeTab === 'wallpaper' ? 'active' : ''}`}
            onClick={() => setActiveTab('wallpaper')}
          >
            <Image size={15} />
            <span>Wallpapers</span>
          </button>

          <button 
            className={`settings-nav-item ${activeTab === 'swarm' ? 'active' : ''}`}
            onClick={() => setActiveTab('swarm')}
          >
            <Sparkles size={15} />
            <span>Swarm Engine</span>
          </button>
        </div>
      </aside>

      {/* Main Settings Panel */}
      <main className="settings-main">
        {/* ====================================================================
            TAB 1: ABOUT VARUN SEHGAL & VARUNOS (FASCINATING & ENGAGING INFO)
            ==================================================================== */}
        {activeTab === 'about' && (
          <div className="settings-panel about-panel">
            {/* 1. ARCHITECT PROFILE HERO */}
            <div className="about-architect-card">
              <div className="architect-avatar-wrap">
                <img 
                  src="/varun.jpg" 
                  alt="Varun Sehgal" 
                  className="architect-avatar-img"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="architect-status-ring" title="Available for Roles & Projects" />
              </div>

              <div className="architect-info-col">
                <div className="architect-badge-row">
                  <span className="status-pill-green">🟢 Open to Full-Time Design Roles</span>
                  <span className="experience-tag">3+ Years Experience</span>
                </div>

                <h1 className="architect-name">Varun Sehgal</h1>
                <p className="architect-headline">
                  Lead UI/UX Designer & Vibecoded Product Engineer
                </p>

                <p className="architect-bio">
                  Architecting modern SaaS systems, design tokens, and AI-accelerated workflows. Passionate about turning intricate engineering problems into fluid, human-centric interfaces.
                </p>

                <div className="architect-meta-row">
                  <span className="meta-item">
                    <MapPin size={12} className="meta-icon" />
                    <span>Gwalior, MP, India (Remote)</span>
                  </span>
                  <span className="meta-item">
                    <GraduationCap size={12} className="meta-icon" />
                    <span>B.Tech in CSE @ Jaypee University (JUET)</span>
                  </span>
                </div>

                {/* Quick Action Buttons */}
                <div className="architect-actions-row">
                  <a 
                    href="/Varun_Sehgal_Resume_Updated.pdf" 
                    target="_blank" 
                    rel="noreferrer"
                    className="about-btn primary"
                  >
                    <FileText size={13} />
                    <span>View Resume PDF</span>
                  </a>

                  <button 
                    type="button"
                    className={`about-btn secondary ${copiedEmail ? 'copied' : ''}`}
                    onClick={handleCopyEmail}
                  >
                    {copiedEmail ? <Check size={13} color="#4ade80" /> : <Copy size={13} />}
                    <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
                  </button>

                  <a 
                    href="https://linkedin.com/in/varunsehgal02" 
                    target="_blank" 
                    rel="noreferrer"
                    className="about-btn icon-only"
                    title="LinkedIn Profile"
                  >
                    <ExternalLink size={13} />
                  </a>

                  <a 
                    href="https://github.com/varunsehgal05" 
                    target="_blank" 
                    rel="noreferrer"
                    className="about-btn icon-only"
                    title="GitHub Repositories"
                  >
                    <Code2 size={13} />
                  </a>
                </div>
              </div>
            </div>

            {/* 2. REAL SUPERPOWER METRICS (INTERESTING IMPACT STATS) */}
            <div className="about-stats-grid">
              <div className="about-stat-box">
                <div className="stat-icon-wrap amber">
                  <Zap size={16} />
                </div>
                <div className="stat-number">10×</div>
                <div className="stat-label">Vibecoded Speed</div>
                <div className="stat-sub">From concept & prompt to full production React code</div>
              </div>

              <div className="about-stat-box">
                <div className="stat-icon-wrap blue">
                  <Layers size={16} />
                </div>
                <div className="stat-number">50+</div>
                <div className="stat-label">Design Tokens</div>
                <div className="stat-sub">Modular Figma component system & atomic tokens</div>
              </div>

              <div className="about-stat-box">
                <div className="stat-icon-wrap emerald">
                  <Award size={16} />
                </div>
                <div className="stat-number">-30%</div>
                <div className="stat-label">Drop-off Reduction</div>
                <div className="stat-sub">EventFlow 4-step streamlined checkout flow</div>
              </div>

              <div className="about-stat-box">
                <div className="stat-icon-wrap purple">
                  <Flame size={16} />
                </div>
                <div className="stat-number">800+</div>
                <div className="stat-label">Developers Impacted</div>
                <div className="stat-sub">CodeSrijan Hackathon Portal ecosystem</div>
              </div>
            </div>

            {/* 3. UNDER THE HOOD: TECH ARSENAL EXPLORER */}
            <div className="about-section-card">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Sparkles size={15} className="text-sky-400" />
                  <h3 className="section-title">Under The Hood of VarunOS</h3>
                </div>
                <span className="section-badge">Interactive Tech Stack</span>
              </div>

              <p className="section-sub">
                Click any core technology below to see how VarunOS was built with zero fluff:
              </p>

              <div className="tech-chips-row">
                {Object.keys(TECH_DETAILS).map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    className={`tech-chip-btn ${selectedTech === tech ? 'active' : ''}`}
                    onClick={() => setSelectedTech(tech)}
                  >
                    <span>{tech}</span>
                  </button>
                ))}
              </div>

              <div className="tech-detail-banner">
                <div className="tech-detail-header">
                  <strong>{selectedTech}</strong>
                  <span className="tech-status-dot">● Active in this browser</span>
                </div>
                <p className="tech-detail-text">{TECH_DETAILS[selectedTech]}</p>
              </div>
            </div>

            {/* 4. DESIGN PHILOSOPHY & FACT SHUFFLER */}
            <div className="about-fact-card">
              <div className="fact-content">
                <div className="fact-tag">💡 INSIGHT & PHILOSOPHY</div>
                <p className="fact-text">"{DESIGN_FACTS[activeFactIdx]}"</p>
              </div>
              <button 
                type="button" 
                className="fact-next-btn"
                onClick={handleNextFact}
                title="Shuffle insight"
              >
                <span>Next Insight</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: APPEARANCE (DARK / LIGHT / AUTO) */}
        {activeTab === 'appearance' && (
          <div className="settings-panel">
            <h2 className="settings-panel-title">Appearance</h2>
            <p className="settings-panel-desc">Customize system color theme, light/dark mode, and interface accents.</p>

            <div className="appearance-theme-cards-grid">
              {/* Light Mode Card */}
              <div 
                className={`theme-card ${themeMode === 'light' ? 'active' : ''}`}
                onClick={() => handleSelectTheme('light')}
              >
                <div className="theme-card-preview theme-light-preview">
                  <div className="preview-mini-menubar light">
                    <span className="mini-dot red" />
                    <span className="mini-dot yellow" />
                    <span className="mini-dot green" />
                  </div>
                  <div className="preview-mini-body light">
                    <div className="preview-mini-sidebar light" />
                    <div className="preview-mini-content light" />
                  </div>
                </div>
                <div className="theme-card-footer">
                  <Sun size={13} className="theme-icon light" />
                  <span className="theme-name">Light</span>
                  {themeMode === 'light' && <Check size={13} className="theme-check-icon" />}
                </div>
              </div>

              {/* Dark Mode Card */}
              <div 
                className={`theme-card ${themeMode === 'dark' ? 'active' : ''}`}
                onClick={() => handleSelectTheme('dark')}
              >
                <div className="theme-card-preview theme-dark-preview">
                  <div className="preview-mini-menubar dark">
                    <span className="mini-dot red" />
                    <span className="mini-dot yellow" />
                    <span className="mini-dot green" />
                  </div>
                  <div className="preview-mini-body dark">
                    <div className="preview-mini-sidebar dark" />
                    <div className="preview-mini-content dark" />
                  </div>
                </div>
                <div className="theme-card-footer">
                  <Moon size={13} className="theme-icon dark" />
                  <span className="theme-name">Dark</span>
                  {themeMode === 'dark' && <Check size={13} className="theme-check-icon" />}
                </div>
              </div>

              {/* Auto Mode Card */}
              <div 
                className={`theme-card ${themeMode === 'auto' ? 'active' : ''}`}
                onClick={() => handleSelectTheme('auto')}
              >
                <div className="theme-card-preview theme-auto-preview">
                  <div className="preview-auto-split left light">
                    <div className="preview-mini-menubar light" />
                    <div className="preview-mini-body light" />
                  </div>
                  <div className="preview-auto-split right dark">
                    <div className="preview-mini-menubar dark" />
                    <div className="preview-mini-body dark" />
                  </div>
                </div>
                <div className="theme-card-footer">
                  <span className="theme-icon auto">🌓</span>
                  <span className="theme-name">Auto</span>
                  {themeMode === 'auto' && <Check size={13} className="theme-check-icon" />}
                </div>
              </div>
            </div>

            {/* Accent Color Section */}
            <div className="settings-group" style={{ marginTop: '24px' }}>
              <div className="settings-row">
                <div className="settings-row-text">
                  <span className="row-title">Accent Color</span>
                  <span className="row-sub">System focus color for controls, buttons, and traffic highlights</span>
                </div>
                <div className="accent-color-row">
                  {[
                    { id: 'blue', color: '#0284c7' },
                    { id: 'purple', color: '#9333ea' },
                    { id: 'pink', color: '#ec4899' },
                    { id: 'green', color: '#10b981' },
                    { id: 'orange', color: '#f97316' },
                    { id: 'slate', color: '#64748b' }
                  ].map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      className="accent-circle-btn"
                      style={{ backgroundColor: acc.color }}
                      title={acc.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WALLPAPERS */}
        {activeTab === 'wallpaper' && (
          <div className="settings-panel">
            <div className="settings-panel-header">
              <div>
                <h2 className="settings-panel-title">System Wallpapers</h2>
                <p className="settings-panel-desc">Customize desktop backgrounds and terminal backdrops.</p>
              </div>

              {/* Subtab Switcher */}
              <div className="wallpaper-subtab-group">
                <button
                  type="button"
                  className={`wallpaper-subtab-btn ${wallpaperSection === 'desktop' ? 'active' : ''}`}
                  onClick={() => setWallpaperSection('desktop')}
                >
                  <Monitor size={13} />
                  <span>Desktop ({desktopWallpapers.length})</span>
                </button>
                <button
                  type="button"
                  className={`wallpaper-subtab-btn ${wallpaperSection === 'terminal' ? 'active' : ''}`}
                  onClick={() => setWallpaperSection('terminal')}
                >
                  <Terminal size={13} />
                  <span>Terminal ({terminalWallpapers.length})</span>
                </button>
              </div>
            </div>

            {/* Desktop Wallpapers View */}
            {wallpaperSection === 'desktop' && (
              <>
                <div className="wallpaper-shortcut-banner">
                  <span>⚡ <strong>Quick Shortcut:</strong> Press <code>Alt + 1</code> through <code>Alt + 5</code> anytime to switch desktop wallpapers instantly!</span>
                </div>

                <div className="wallpaper-grid">
                  {desktopWallpapers.map((wp) => (
                    <div 
                      key={wp.id} 
                      className={`wallpaper-card ${activeWallpaper === wp.id ? 'active' : ''}`}
                      onClick={() => applyWallpaper(wp)}
                    >
                      <div className="wallpaper-preview" style={wp.style}>
                        {activeWallpaper === wp.id && (
                          <div className="wallpaper-check">
                            <Check size={14} color="#ffffff" />
                          </div>
                        )}
                        {wp.tag && <span className="wallpaper-tag-pill">{wp.tag}</span>}
                      </div>
                      <span className="wallpaper-name">{wp.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Terminal Wallpapers View */}
            {wallpaperSection === 'terminal' && (
              <>
                <div className="wallpaper-shortcut-banner terminal-banner">
                  <span>🖥️ <strong>Terminal Backdrops:</strong> Calibrated with high-contrast text overlays so commands and output stay 100% sharp.</span>
                </div>

                <div className="wallpaper-grid">
                  {terminalWallpapers.map((wp) => (
                    <div 
                      key={wp.id} 
                      className={`wallpaper-card ${activeTerminalWallpaper === wp.id ? 'active' : ''}`}
                      onClick={() => applyTerminalWallpaper(wp)}
                    >
                      <div className="wallpaper-preview" style={wp.bgStyle}>
                        {activeTerminalWallpaper === wp.id && (
                          <div className="wallpaper-check">
                            <Check size={14} color="#ffffff" />
                          </div>
                        )}
                        {wp.tag && <span className="wallpaper-tag-pill">{wp.tag}</span>}
                      </div>
                      <span className="wallpaper-name">{wp.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 4: SWARM ENGINE */}
        {activeTab === 'swarm' && (
          <div className="settings-panel">
            <h2 className="settings-panel-title">Swarm Engine</h2>
            <p className="settings-panel-desc">
              Multi-agent autonomous reconstruction and live flocking inspired by Joel Califa's Swarm (califa.github.io/swarm-site).
            </p>

            <div className="settings-group">
              {/* Option 1: Live Mouse Flocking */}
              <div className="settings-row">
                <div className="settings-row-text">
                  <span className="row-title">Live Mouse Flocking (Califa Swarm)</span>
                  <span className="row-sub">
                    48 autonomous agent cursors with boid flocking & dashed network lines follow your mouse and scroll across the desktop.
                  </span>
                </div>
                <button 
                  type="button"
                  className={`settings-toggle-btn ${swarmFollowEnabled ? 'active' : ''}`}
                  onClick={handleToggleSwarmFollow}
                  aria-pressed={swarmFollowEnabled}
                >
                  <span className="toggle-slider-knob" />
                </button>
              </div>

              {/* Option 2: Replay Reconstruction */}
              <div className="settings-row">
                <div className="settings-row-text">
                  <span className="row-title">Replay Swarm Reconstruction</span>
                  <span className="row-sub">Full 5-phase animation deconstructing and live-rebuilding the entire desktop</span>
                </div>
                <button 
                  className="settings-action-btn primary"
                  onClick={() => {
                    if (onReplaySwarm) onReplaySwarm();
                  }}
                >
                  <RotateCcw size={13} />
                  <span>Replay Now</span>
                </button>
              </div>

              <div className="settings-row">
                <div className="settings-row-text">
                  <span className="row-title">Engine Architecture</span>
                  <span className="row-sub">v3.5 • Autonomous Flocking Cursors & Web Audio Synthesizer</span>
                </div>
                <span className="settings-badge">Califa Swarm Active</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SettingsApp;
