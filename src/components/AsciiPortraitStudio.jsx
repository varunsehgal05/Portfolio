import React, { useState, useEffect, useRef } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  FileText, 
  Coffee, 
  ExternalLink, 
  Code2, 
  Sparkles, 
  Sliders,
  Eye,
  Terminal,
  Sun,
  Moon
} from 'lucide-react';
import { 
  VARUN_ASCII_STANDARD, 
  VARUN_ASCII_BINARY, 
  VARUN_ASCII_MATRIX 
} from '../config/varun_ascii_art';
import './AsciiPortraitStudio.css';

const COLOR_PRESETS = [
  { id: 'mono', label: 'Cyber Silver', color: '#f8fafc', bg: '#090a0f', glow: 'rgba(248, 250, 252, 0.25)' },
  { id: 'matrix', label: 'Matrix Green', color: '#10b981', bg: '#04130a', glow: 'rgba(16, 185, 129, 0.4)' },
  { id: 'cyan', label: 'Tokyo Cyan', color: '#38bdf8', bg: '#03131e', glow: 'rgba(56, 189, 248, 0.4)' },
  { id: 'purple', label: 'Figma Violet', color: '#c084fc', bg: '#130722', glow: 'rgba(192, 132, 252, 0.4)' },
  { id: 'amber', label: 'Retro Amber', color: '#f59e0b', bg: '#1c1003', glow: 'rgba(245, 158, 11, 0.4)' },
  { id: 'paper', label: 'Paper White (Img 2)', color: '#09090b', bg: '#ffffff', glow: 'rgba(0, 0, 0, 0.15)' }
];

const AsciiPortraitStudio = () => {
  const [viewMode, setViewMode] = useState('text'); // 'text' | 'image' | 'compare'
  const [charset, setCharset] = useState('standard'); // 'standard' | 'binary' | 'matrix'
  const [colorPreset, setColorPreset] = useState('mono');
  const [hasScanline, setHasScanline] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [streamingProgress, setStreamingProgress] = useState(1); // 0 to 1
  const [isStreaming, setIsStreaming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [compareSplit, setCompareSplit] = useState(50); // percentage for compare mode

  const activePreset = COLOR_PRESETS.find(p => p.id === colorPreset) || COLOR_PRESETS[0];

  const getActiveAsciiText = () => {
    switch (charset) {
      case 'binary':
        return VARUN_ASCII_BINARY;
      case 'matrix':
        return VARUN_ASCII_MATRIX;
      case 'standard':
      default:
        return VARUN_ASCII_STANDARD;
    }
  };

  const rawAscii = getActiveAsciiText();
  const asciiLines = rawAscii.split('\n');

  // Streaming typewriter effect
  const handleReStream = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    setStreamingProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.04;
      if (progress >= 1) {
        setStreamingProgress(1);
        setIsStreaming(false);
        clearInterval(interval);
      } else {
        setStreamingProgress(progress);
      }
    }, 28);
  };

  const handleCopyAscii = () => {
    navigator.clipboard.writeText(rawAscii);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([rawAscii], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'varun-sehgal-ascii-portrait.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('varun.sehgal02@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const visibleLineCount = Math.floor(asciiLines.length * streamingProgress);
  const displayedAscii = asciiLines.slice(0, visibleLineCount).join('\n');

  return (
    <div className="ascii-studio-container" data-color-preset={colorPreset}>
      {/* 1. TOP INTERACTIVE TOOLBAR */}
      <div className="ascii-studio-toolbar">
        <div className="toolbar-left">
          <div className="ascii-studio-badge">
            <span className="ascii-pulse-dot" />
            <span className="badge-title">WORKING ASCII PORTRAIT STUDIO</span>
            <span className="badge-sub">v2.4 • Varun Sehgal</span>
          </div>

          {/* Mode Switcher */}
          <div className="ascii-mode-pills">
            <button
              type="button"
              className={`mode-pill ${viewMode === 'text' ? 'active' : ''}`}
              onClick={() => setViewMode('text')}
              title="Interactive ASCII Monospace Text"
            >
              <Terminal size={12} />
              <span>ASCII Text</span>
            </button>
            <button
              type="button"
              className={`mode-pill ${viewMode === 'image' ? 'active' : ''}`}
              onClick={() => setViewMode('image')}
              title="High-Res Vector ASCII Image (Image 2)"
            >
              <Eye size={12} />
              <span>Image 2 Raster</span>
            </button>
            <button
              type="button"
              className={`mode-pill ${viewMode === 'compare' ? 'active' : ''}`}
              onClick={() => setViewMode('compare')}
              title="Split Comparison: ASCII vs Real Photo"
            >
              <Sliders size={12} />
              <span>Compare</span>
            </button>
          </div>
        </div>

        <div className="toolbar-right">
          {/* Quick Actions */}
          <button
            type="button"
            className={`toolbar-btn ${isCopied ? 'copied' : ''}`}
            onClick={handleCopyAscii}
            title="Copy raw ASCII string to clipboard"
          >
            {isCopied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
            <span>{isCopied ? 'Copied ASCII!' : 'Copy ASCII'}</span>
          </button>

          <button
            type="button"
            className="toolbar-btn"
            onClick={handleDownloadTxt}
            title="Download ASCII as .txt file"
          >
            <Download size={12} />
            <span>.txt</span>
          </button>

          <button
            type="button"
            className={`toolbar-btn ${isStreaming ? 'spinning' : ''}`}
            onClick={handleReStream}
            title="Re-stream ASCII typing animation"
          >
            <RefreshCw size={12} />
            <span>Re-stream</span>
          </button>
        </div>
      </div>

      {/* 2. SECONDARY CONTROLS: THEMES & CHARSETS */}
      <div className="ascii-controls-strip">
        <div className="controls-group">
          <span className="controls-label">Color Preset:</span>
          <div className="color-presets-row">
            {COLOR_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`color-chip ${colorPreset === p.id ? 'active' : ''}`}
                style={{ '--chip-color': p.color, '--chip-bg': p.bg }}
                onClick={() => setColorPreset(p.id)}
                title={p.label}
              >
                <span className="chip-color-dot" style={{ backgroundColor: p.color }} />
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'text' && (
          <div className="controls-group">
            <span className="controls-label">Character Set:</span>
            <div className="charset-pills">
              <button
                type="button"
                className={`charset-btn ${charset === 'standard' ? 'active' : ''}`}
                onClick={() => setCharset('standard')}
              >
                Standard (@%#*)
              </button>
              <button
                type="button"
                className={`charset-btn ${charset === 'binary' ? 'active' : ''}`}
                onClick={() => setCharset('binary')}
              >
                Binary (0101)
              </button>
              <button
                type="button"
                className={`charset-btn ${charset === 'matrix' ? 'active' : ''}`}
                onClick={() => setCharset('matrix')}
              >
                Matrix (ﾊﾐﾋｰ)
              </button>
            </div>
          </div>
        )}

        <div className="controls-group ml-auto">
          <button
            type="button"
            className={`toggle-option-btn ${hasScanline ? 'active' : ''}`}
            onClick={() => setHasScanline(!hasScanline)}
            title="Toggle CRT Laser Scanline Beam"
          >
            <Sparkles size={11} />
            <span>Scanline: {hasScanline ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN ASCII CANVAS DISPLAY */}
      <div 
        className={`ascii-viewport-frame ${colorPreset === 'paper' ? 'paper-mode' : ''}`}
        style={{
          backgroundColor: activePreset.bg,
          color: activePreset.color,
          '--glow-color': activePreset.glow
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: -100, y: -100 })}
      >
        {/* CRT Scanline Beam Animation */}
        {hasScanline && <div className="ascii-crt-scanline" />}

        {/* Mouse interactive spotlight glow */}
        <div 
          className="ascii-mouse-glow"
          style={{
            transform: `translate3d(${mousePos.x - 70}px, ${mousePos.y - 70}px, 0)`
          }}
        />

        {/* View Mode 1: Interactive Monospace ASCII Text */}
        {viewMode === 'text' && (
          <div className="ascii-text-wrapper">
            <pre className="ascii-pre-canvas">
              {displayedAscii}
            </pre>
          </div>
        )}

        {/* View Mode 2: Authentic Image 2 Raster Canvas */}
        {viewMode === 'image' && (
          <div className="ascii-image-wrapper">
            <img 
              src="/varun-ascii.png" 
              alt="Varun Sehgal ASCII Portrait" 
              className={`ascii-raster-img ${colorPreset !== 'paper' ? 'invert-raster' : ''}`}
            />
          </div>
        )}

        {/* View Mode 3: Interactive Split Compare */}
        {viewMode === 'compare' && (
          <div className="ascii-compare-wrapper">
            <div className="compare-container">
              {/* Photo on left side */}
              <div 
                className="compare-side photo-side" 
                style={{ width: `${compareSplit}%` }}
              >
                <img src="/varun.jpg" alt="Real Portrait" className="compare-img photo" />
                <span className="compare-label left">Original Photo</span>
              </div>

              {/* ASCII on right side */}
              <div 
                className="compare-side ascii-side" 
                style={{ width: `${100 - compareSplit}%` }}
              >
                <img src="/varun-ascii.png" alt="ASCII Art" className={`compare-img ascii ${colorPreset !== 'paper' ? 'invert-raster' : ''}`} />
                <span className="compare-label right">ASCII Matrix (Img 2)</span>
              </div>

              {/* Split Slider Handle */}
              <input 
                type="range" 
                min="10" 
                max="90" 
                value={compareSplit} 
                onChange={(e) => setCompareSplit(Number(e.target.value))}
                className="compare-range-slider"
                title="Drag to compare"
              />
            </div>
          </div>
        )}

        {/* Corner HUD Telemetry */}
        <div className="ascii-telemetry-overlay">
          <span className="telemetry-pill">72 × 58 MATRIX • UTF-8</span>
          <span className="telemetry-pill">RENDER: GPU 60 FPS</span>
        </div>
      </div>

      {/* 4. SLEEK CAREER & IDENTITY ACTION BAR */}
      <div className="ascii-identity-card">
        <div className="identity-left">
          <div className="identity-avatar-badge">VS</div>
          <div className="identity-meta">
            <div className="identity-name-row">
              <span className="identity-name">Varun Sehgal</span>
              <span className="identity-badge-pro">PRO ARCHITECT</span>
              <span className="identity-role-pill">Available for Roles & Consulting</span>
            </div>
            <p className="identity-sub">
              Lead UI/UX & Vibecoded Product Designer • Jaypee University CSE • Gwalior, MP (Remote)
            </p>
          </div>
        </div>

        <div className="identity-actions">
          <a
            href="/Varun_Sehgal_Resume_Updated.pdf"
            target="_blank"
            rel="noreferrer"
            className="identity-btn primary"
          >
            <FileText size={13} />
            <span>View Resume PDF</span>
          </a>

          <button
            type="button"
            className={`identity-btn secondary ${copiedEmail ? 'copied' : ''}`}
            onClick={handleCopyEmail}
          >
            {copiedEmail ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
            <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
          </button>

          <button
            type="button"
            className="identity-btn coffee"
            onClick={() => window.dispatchEvent(new CustomEvent('varunos-open-coffee-modal'))}
            title="Support via UPI QR / Coffee"
          >
            <Coffee size={13} className="text-amber-400" />
            <span>Buy Me a Coffee</span>
          </button>

          <a
            href="https://linkedin.com/in/varunsehgal02"
            target="_blank"
            rel="noreferrer"
            className="identity-btn icon-only"
            title="LinkedIn Profile"
          >
            <ExternalLink size={13} />
          </a>

          <a
            href="https://github.com/varunsehgal05"
            target="_blank"
            rel="noreferrer"
            className="identity-btn icon-only"
            title="GitHub Profile"
          >
            <Code2 size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AsciiPortraitStudio;
