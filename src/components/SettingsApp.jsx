import React, { useState, useEffect } from 'react';
import { 
  Image, 
  Sparkles, 
  Terminal,
  Check,
  RotateCcw,
  Monitor,
  Sun,
  Moon,
  Palette
} from 'lucide-react';
import { desktopWallpapers, terminalWallpapers } from '../config/wallpapers';
import './SettingsApp.css';

const SettingsApp = ({ userName = 'Guest', onReplaySwarm }) => {
  const [activeTab, setActiveTab] = useState('appearance');
  const [wallpaperSection, setWallpaperSection] = useState('desktop'); // 'desktop' | 'terminal'

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

  // Accent Color & Window Vibrancy State
  const [activeAccent, setActiveAccent] = useState(() => {
    try {
      return localStorage.getItem('varunos_accent_color') || '#0d99ff';
    } catch {
      return '#0d99ff';
    }
  });

  const [windowVibrancy, setWindowVibrancy] = useState(() => {
    try {
      return localStorage.getItem('varunos_window_vibrancy') || 'high';
    } catch {
      return 'high';
    }
  });

  // Apply theme mode to documentElement
  const handleSelectTheme = (mode) => {
    setThemeMode(mode);
    try {
      localStorage.setItem('varunos_theme_mode', mode);
    } catch { }

    let effectiveTheme = mode;
    if (mode === 'auto') {
      const hours = new Date().getHours();
      effectiveTheme = hours >= 7 && hours < 19 ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    window.dispatchEvent(new CustomEvent('varunos-theme-change', { detail: { mode: effectiveTheme } }));
  };

  const handleSelectAccent = (color, id) => {
    setActiveAccent(color);
    try {
      localStorage.setItem('varunos_accent_color', color);
    } catch { }
    document.documentElement.style.setProperty('--accent', color);
    document.documentElement.style.setProperty('--system-accent', color);
    window.dispatchEvent(new CustomEvent('varunos-accent-change', { detail: { color, id } }));
  };

  const handleSelectVibrancy = (level) => {
    setWindowVibrancy(level);
    try {
      localStorage.setItem('varunos_window_vibrancy', level);
    } catch { }
    const blurVal = level === 'subtle' ? 'blur(8px)' : level === 'medium' ? 'blur(16px)' : 'blur(28px)';
    document.documentElement.style.setProperty('--blur', blurVal);
  };

  // Restore saved accent and vibrancy on mount
  useEffect(() => {
    try {
      const savedAccent = localStorage.getItem('varunos_accent_color');
      if (savedAccent) {
        document.documentElement.style.setProperty('--accent', savedAccent);
        document.documentElement.style.setProperty('--system-accent', savedAccent);
      }
      const savedVibrancy = localStorage.getItem('varunos_window_vibrancy');
      if (savedVibrancy) {
        const blurVal = savedVibrancy === 'subtle' ? 'blur(8px)' : savedVibrancy === 'medium' ? 'blur(16px)' : 'blur(28px)';
        document.documentElement.style.setProperty('--blur', blurVal);
      }
    } catch { }
  }, []);

  // Toggle Live Mouse Swarm
  const handleToggleSwarmFollow = () => {
    const nextState = !swarmFollowEnabled;
    setSwarmFollowEnabled(nextState);
    try {
      localStorage.setItem('varunos_swarm_follow_mouse', String(nextState));
    } catch { }
    window.dispatchEvent(new CustomEvent('varunos-toggle-swarm-follow', { detail: { enabled: nextState } }));
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
    } catch { }
    window.dispatchEvent(new CustomEvent('varunos-set-desktop-wallpaper', { detail: { id: wp.id } }));
  };

  const applyTerminalWallpaper = (wp) => {
    setActiveTerminalWallpaper(wp.id);
    try {
      localStorage.setItem('varunos_terminal_wallpaper', wp.id);
    } catch { }
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

        {/* Quick Theme Switcher in Sidebar */}
        <div className="settings-sidebar-theme-switch">
          <button
            type="button"
            className={`sidebar-theme-pill ${themeMode === 'light' ? 'active' : ''}`}
            onClick={() => handleSelectTheme('light')}
            title="Switch to Light Mode"
          >
            <Sun size={11} />
            <span>Light</span>
          </button>
          <button
            type="button"
            className={`sidebar-theme-pill ${themeMode === 'dark' ? 'active' : ''}`}
            onClick={() => handleSelectTheme('dark')}
            title="Switch to Dark Mode"
          >
            <Moon size={11} />
            <span>Dark</span>
          </button>
          <button
            type="button"
            className={`sidebar-theme-pill ${themeMode === 'auto' ? 'active' : ''}`}
            onClick={() => handleSelectTheme('auto')}
            title="Solar Daylight Schedule"
          >
            <span style={{ fontSize: '11px' }}>🌓</span>
            <span>Auto</span>
          </button>
        </div>

        <div className="settings-nav">
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
        {/* TAB 1: APPEARANCE (DARK / LIGHT / AUTO) */}
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

              {/* Midnight OLED Mode Card */}
              <div
                className={`theme-card ${themeMode === 'oled' ? 'active' : ''}`}
                onClick={() => handleSelectTheme('oled')}
              >
                <div className="theme-card-preview theme-oled-preview">
                  <div className="preview-mini-menubar oled">
                    <span className="mini-dot red" />
                    <span className="mini-dot yellow" />
                    <span className="mini-dot green" />
                  </div>
                  <div className="preview-mini-body oled">
                    <div className="preview-mini-sidebar oled" />
                    <div className="preview-mini-content oled" />
                  </div>
                </div>
                <div className="theme-card-footer">
                  <span className="theme-icon oled">🖤</span>
                  <span className="theme-name">Midnight OLED</span>
                  {themeMode === 'oled' && <Check size={13} className="theme-check-icon" />}
                </div>
              </div>
            </div>

            {/* Live Interactive OS Preview */}
            <div className="settings-group appearance-preview-box" style={{ marginTop: '20px' }}>
              <div className="preview-box-header">
                <span className="preview-header-title">Live Interface Simulation</span>
                <span className="preview-header-mode">
                  Mode: <strong>{themeMode.toUpperCase()}</strong> • Accent: <span style={{ color: activeAccent, fontWeight: 700 }}>{activeAccent}</span>
                </span>
              </div>
              <div className={`live-preview-window ${themeMode}`}>
                <div className="live-preview-titlebar">
                  <div className="live-traffic-lights">
                    <span className="live-traffic-dot red" />
                    <span className="live-traffic-dot yellow" />
                    <span className="live-traffic-dot green" />
                  </div>
                  <span className="live-window-title">VarunOS — Active Workspace</span>
                  <div style={{ width: 40 }} />
                </div>
                <div className="live-preview-body">
                  <div className="live-preview-sidebar">
                    <div className="live-sidebar-item active" style={{ backgroundColor: `${activeAccent}25`, color: activeAccent, borderLeft: `2px solid ${activeAccent}` }}>
                      Projects
                    </div>
                    <div className="live-sidebar-item">Components</div>
                    <div className="live-sidebar-item">Tokens</div>
                  </div>
                  <div className="live-preview-content">
                    <h4 className="live-content-headline">High-Contrast macOS Aesthetics</h4>
                    <p className="live-content-sub">Clean typography, frosted acrylic glass, and seamless light/dark mode transitions.</p>
                    <div className="live-content-actions">
                      <button type="button" className="live-accent-btn" style={{ backgroundColor: activeAccent }}>
                        Primary Action
                      </button>
                      <button type="button" className="live-secondary-btn">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Color Section */}
            <div className="settings-group" style={{ marginTop: '20px' }}>
              <div className="settings-row">
                <div className="settings-row-text">
                  <span className="row-title">Accent Color</span>
                  <span className="row-sub">System focus color for controls, buttons, active layers, and traffic highlights</span>
                </div>
                <div className="accent-color-row">
                  {[
                    { id: 'figma-blue', name: 'Electric Blue', color: '#0d99ff' },
                    { id: 'purple', name: 'Royal Purple', color: '#a855f7' },
                    { id: 'emerald', name: 'Emerald Mint', color: '#10b981' },
                    { id: 'amber', name: 'Sunset Amber', color: '#f59e0b' },
                    { id: 'rose', name: 'Coral Rose', color: '#f43f5e' },
                    { id: 'slate', name: 'Stealth Graphite', color: '#64748b' }
                  ].map((acc) => {
                    const isSelected = activeAccent.toLowerCase() === acc.color.toLowerCase();
                    return (
                      <button
                        key={acc.id}
                        type="button"
                        className={`accent-circle-btn ${isSelected ? 'active' : ''}`}
                        style={{ backgroundColor: acc.color }}
                        onClick={() => handleSelectAccent(acc.color, acc.id)}
                        title={`${acc.name} (${acc.color})`}
                      >
                        {isSelected && <Check size={11} color="#ffffff" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Window Vibrancy */}
              <div className="settings-row">
                <div className="settings-row-text">
                  <span className="row-title">Window Vibrancy & Glass Blur</span>
                  <span className="row-sub">Control backdrop blur intensity and translucent acrylic refraction</span>
                </div>
                <div className="vibrancy-pill-group">
                  {[
                    { id: 'subtle', label: 'Subtle (60%)' },
                    { id: 'medium', label: 'Balanced (80%)' },
                    { id: 'high', label: 'Crystal Glass (95%)' }
                  ].map((vib) => (
                    <button
                      key={vib.id}
                      type="button"
                      className={`vibrancy-pill-btn ${windowVibrancy === vib.id ? 'active' : ''}`}
                      onClick={() => handleSelectVibrancy(vib.id)}
                    >
                      {vib.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Daylight Schedule Info */}
              <div className="settings-row">
                <div className="settings-row-text">
                  <span className="row-title">Solar Schedule (Auto Mode)</span>
                  <span className="row-sub">Daylight hours (07:00 – 19:00): Light Mode • Night hours (19:00 – 07:00): Dark Mode</span>
                </div>
                <span className="settings-badge">
                  {new Date().getHours() >= 7 && new Date().getHours() < 19 ? '☀️ Currently Day (Light)' : '🌙 Currently Night (Dark)'}
                </span>
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
