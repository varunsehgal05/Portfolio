import React, { useState } from 'react';
import { 
  Coffee, 
  Sparkles, 
  QrCode, 
  Copy, 
  Check, 
  ShieldCheck, 
  Heart, 
  ExternalLink 
} from 'lucide-react';
import './CoffeeApp.css';

const DONATION_PRESETS = [
  { amount: 100, label: '₹100', name: 'Espresso Sip', icon: '☕', desc: 'A quick dose of caffeine to spark new creative ideas.' },
  { amount: 250, label: '₹250', name: 'Artisan Beans', icon: '🧋', desc: 'Supports high-polish UI motion and design system maintenance.' },
  { amount: 500, label: '₹500', name: 'Architect Boost', icon: '⚡', desc: 'Fuels late-night full-stack hacking, AST parsers, and custom tools.' },
  { amount: 1000, label: '₹1000', name: 'Open Source Patron', icon: '🚀', desc: 'Direct patron sponsorship for high-impact open source design tools.' }
];

const CoffeeApp = () => {
  const [selectedPreset, setSelectedPreset] = useState(250);
  const [copied, setCopied] = useState(false);
  const upiId = 'varun.sehgal02@okicici';

  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      [587.33, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.12, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.2);
      });
    } catch {}
  };

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      playChime();
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = upiId;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      playChime();
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className="coffee-app-container">
      {/* App Content Body */}
      <div className="coffee-app-body">
        {/* Architect Profile Hero */}
        <div className="coffee-profile-card">
          <img 
            src="/varun.jpg" 
            alt="Varun Sehgal" 
            className="coffee-profile-avatar"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="coffee-profile-text">
            <div className="profile-name-row">
              <span className="coffee-profile-name">Varun Sehgal</span>
              <span className="coffee-verified-pill">
                <Sparkles size={11} /> Designer & Engineer
              </span>
            </div>
            <p className="coffee-profile-bio">
              Fueling late-night design system sprints, Figma micro-interactions, and vibecoded portfolio experiments.
            </p>
          </div>
        </div>

        {/* QR Code and Payment Details Container */}
        <div className="coffee-qr-section">
          <div className="coffee-qr-frame">
            <img 
              src="/varun_upi_qr.jpg" 
              alt="Varun Sehgal Google Pay UPI QR Code" 
              className="coffee-qr-img" 
            />
            <div className="coffee-qr-overlay-hint">
              <QrCode size={13} />
              <span>Scan with any UPI App</span>
            </div>
          </div>

          <div className="coffee-details-column">
            {/* UPI ID Pill & Copy Button */}
            <div className="coffee-field-group">
              <label className="coffee-field-label">UPI ID / VPA</label>
              <div className="coffee-upi-box" onClick={handleCopyUPI}>
                <div className="upi-text-wrap">
                  <span className="upi-id-value">{upiId}</span>
                  <span className="upi-app-hint">Google Pay • PhonePe • Paytm • CRED</span>
                </div>
                <button 
                  type="button" 
                  className={`coffee-copy-btn ${copied ? 'copied' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleCopyUPI(); }}
                  title="Copy UPI ID to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={13} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Preset Donation Chips */}
            <div className="coffee-field-group">
              <label className="coffee-field-label">Pick your treat</label>
              <div className="coffee-presets-grid">
                {DONATION_PRESETS.map((preset) => (
                  <button
                    key={preset.amount}
                    type="button"
                    className={`coffee-preset-chip ${selectedPreset === preset.amount ? 'active' : ''}`}
                    onClick={() => setSelectedPreset(preset.amount)}
                    title={preset.desc}
                  >
                    <span className="preset-icon">{preset.icon}</span>
                    <div className="preset-text">
                      <span className="preset-amount">{preset.label}</span>
                      <span className="preset-name">{preset.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="coffee-scan-tip-box">
              <Sparkles size={14} className="text-amber-400 flex-shrink-0" />
              <span>
                Open Google Pay, PhonePe, or Paytm on your phone and scan the QR code to send <strong>₹{selectedPreset}</strong>!
              </span>
            </div>
          </div>
        </div>

        {/* Trust Banner & Gratitude */}
        <div className="coffee-trust-footer">
          <div className="trust-item">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>100% Direct to Creator • Zero Commission</span>
          </div>
          <div className="trust-item">
            <Heart size={13} className="text-rose-400" />
            <span>Every cup keeps Varun creating high-polish tools</span>
          </div>
        </div>

        {/* Other sponsor links */}
        <div className="coffee-modal-footer">
          <div className="footer-other-links">
            <span className="footer-other-label">Also connect on:</span>
            <a 
              href="https://github.com/varunsehgal05" 
              target="_blank" 
              rel="noreferrer" 
              className="footer-link"
            >
              GitHub Sponsors ↗
            </a>
            <span className="footer-dot">•</span>
            <a 
              href="https://linkedin.com/in/varunsehgal02" 
              target="_blank" 
              rel="noreferrer" 
              className="footer-link"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeApp;
