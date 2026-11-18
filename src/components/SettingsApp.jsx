import React, { useState } from 'react';
import { 
  Image, 
  Sparkles, 
  Info, 
  Volume2, 
  VolumeX, 
  Monitor, 
  Check, 
  RotateCcw,
  Layers,
  Cpu
} from 'lucide-react';
import './SettingsApp.css';

const WALLPAPERS = [
  {
    id: 'default',
    name: 'Sequoia Midnight',
    style: {
      backgroundColor: '#0c0c10',
      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px), radial-gradient(circle at 50% 45%, #181820 0%, #0e0e14 60%, #07070a 100%)',
      backgroundSize: '24px 24px, 100% 100%'
    }
  },
  {
    id: 'cosmic',
    name: 'Deep Cosmic Purple',
    style: {
      backgroundColor: '#0a0614',
      backgroundImage: 'radial-gradient(rgba(168, 85, 247, 0.12) 1px, transparent 1px), radial-gradient(circle at 60% 40%, #2e1065 0%, #17082e 60%, #080312 100%)',
      backgroundSize: '28px 28px, 100% 100%'
    }
  },
  {
    id: 'aurora',
    name: 'Cyan Aurora Glow',
    style: {
      backgroundColor: '#03131e',
      backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.12) 1px, transparent 1px), radial-gradient(circle at 40% 60%, #0c4a6e 0%, #082f49 60%, #02111c 100%)',
      backgroundSize: '24px 24px, 100% 100%'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Slate',
    style: {
      backgroundColor: '#0f172a',
      backgroundImage: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)',
      backgroundSize: '100% 100%'
    }
  }
];

const SettingsApp = ({ userName = 'Guest', onReplaySwarm }) => {
  const [activeTab, setActiveTab] = useState('wallpaper');
  const [activeWallpaper, setActiveWallpaper] = useState('default');

  const applyWallpaper = (wp) => {
    setActiveWallpaper(wp.id);
    const desktopEl = document.querySelector('.desktop');
    if (desktopEl) {
      desktopEl.style.backgroundColor = wp.style.backgroundColor;
      desktopEl.style.backgroundImage = wp.style.backgroundImage;
      desktopEl.style.backgroundSize = wp.style.backgroundSize;
    }
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
            <span>Wallpaper</span>
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
            <h2 className="settings-panel-title">Desktop Wallpaper</h2>
            <p className="settings-panel-desc">Choose a visual theme for the desktop workspace.</p>

            <div className="wallpaper-grid">
              {WALLPAPERS.map((wp) => (
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
                  </div>
                  <span className="wallpaper-name">{wp.name}</span>
                </div>
              ))}
            </div>
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
            <p className="settings-panel-desc">Hardware telemetry & system specifications.</p>

            <div className="about-specs-card">
              <div className="about-apple-badge"></div>
              <h3 className="about-os-name">VarunOS Sequoia</h3>
              <span className="about-os-version">Version 15.0 (Build 24A348)</span>

              <div className="about-specs-list">
                <div className="about-spec-row">
                  <span className="spec-label">Mac Model</span>
                  <span className="spec-val">MacBook Pro 16-inch (2026)</span>
                </div>
                <div className="about-spec-row">
                  <span className="spec-label">Chip</span>
                  <span className="spec-val">Apple M3 Max (16-core CPU, 40-core GPU)</span>
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