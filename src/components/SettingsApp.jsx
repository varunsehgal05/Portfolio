import React, { useState, useEffect } from 'react';
import { 
  Image, 
  Sparkles, 
  Info, 
  Terminal,
  Check, 
  RotateCcw,
  Monitor
} from 'lucide-react';
import { desktopWallpapers, terminalWallpapers } from '../config/wallpapers';
import './SettingsApp.css';

const SettingsApp = ({ userName = 'Guest', onReplaySwarm }) => {
  const [activeTab, setActiveTab] = useState('wallpaper');
  const [wallpaperSection, setWallpaperSection] = useState('desktop'); // 'desktop' | 'terminal'

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

  useEffect(() => {
    const handleDesktopSync = (e) => {
      if (e.detail?.id) setActiveWallpaper(e.detail.id);
    };
    const handleTerminalSync = (e) => {
      if (e.detail?.id) setActiveTerminalWallpaper(e.detail.id);
    };
    window.addEventListener('varunos-set-desktop-wallpaper', handleDesktopSync);
    window.addEventListener('varunos-set-terminal-wallpaper', handleTerminalSync);
    return () => {
      window.removeEventListener('varunos-set-desktop-wallpaper', handleDesktopSync);
      window.removeEventListener('varunos-set-terminal-wallpaper', handleTerminalSync);
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

          <button 
            className={`settings-nav-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <Info size={15} />
            <span>About VarunOS</span>
          </button>
        </div>
      </aside>

      {/* Main Settings Panel */}
      <main className="settings-main">
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

        {activeTab === 'swarm' && (
          <div className="settings-panel">
            <h2 className="settings-panel-title">Swarm Rebuild Engine</h2>
            <p className="settings-panel-desc">
              Multi-agent autonomous reconstruction animation inspired by Joel Califa's Swarm & Dhvanil Patel's swarm-cursors.
            </p>

            <div className="settings-group">
              <div className="settings-row">
                <div className="settings-row-text">
                  <span className="row-title">Replay Swarm Reconstruction</span>
                  <span className="row-sub">Deconstructs and live-rebuilds the entire desktop UI</span>
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
                  <span className="row-title">Engine Version</span>
                  <span className="row-sub">v3.5 • Procedural Web Audio Synthesizer & Smart Guides</span>
                </div>
                <span className="settings-badge">Active</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="settings-panel">
            <h2 className="settings-panel-title">About VarunOS</h2>
            <p className="settings-panel-desc">System specifications and environment (inspired by macOS).</p>

            <div className="about-specs-card">
              <div className="about-apple-badge">⚡</div>
              <h3 className="about-os-name">VarunOS Sequoia</h3>
              <span className="about-os-version">Version 15.0 (inspired by macOS)</span>

              <div className="about-specs-list">
                <div className="about-spec-row">
                  <span className="spec-label">Environment</span>
                  <span className="spec-val">VarunOS Workstation (inspired by macOS)</span>
                </div>
                <div className="about-spec-row">
                  <span className="spec-label">System Architecture</span>
                  <span className="spec-val">Apple M3 Max Architecture (16-core CPU, 40-core GPU)</span>
                </div>
                <div className="about-spec-row">
                  <span className="spec-label">Memory</span>
                  <span className="spec-val">32 GB Unified LPDDR5</span>
                </div>
                <div className="about-spec-row">
                  <span className="spec-label">Architect & Designer</span>
                  <span className="spec-val">Varun Sehgal</span>
                </div>
                <div className="about-spec-row">
                  <span className="spec-label">Collaborator</span>
                  <span className="spec-val">{userName || 'Guest'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SettingsApp;
