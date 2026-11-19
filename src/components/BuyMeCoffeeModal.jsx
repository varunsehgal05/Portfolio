import React, { useState, useEffect } from 'react';
import { 
  Coffee, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  Heart, 
  Sparkles, 
  QrCode, 
  Smartphone,
  ShieldCheck,
  Send
} from 'lucide-react';
import './BuyMeCoffeeModal.css';

const DONATION_PRESETS = [
  { amount: 50, label: '₹50', name: 'Espresso', icon: '☕', desc: 'Fuel 1 bug fix' },
  { amount: 150, label: '₹150', name: 'Cold Brew', icon: '🧋', desc: 'Fuel 1 component' },
  { amount: 300, label: '₹300', name: 'Artisan Beans', icon: '🫘', desc: 'Fuel weekend feature' },
  { amount: 500, label: '₹500', name: 'Architect Boost', icon: '⚡', desc: 'Huge gratitude & shoutout' }
];

const BuyMeCoffeeModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(150);
  const upiId = 'varun.sehgal02@okicici';

  // Procedural subtle coin chime sound on copy
  const playCoinSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.12); // E6

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  };

  const handleCopyUPI = () => {
    navigator.clipboard?.writeText(upiId);
    setCopied(true);
    playCoinSound();
    setTimeout(() => setCopied(false), 2400);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const upiDeepLink = `upi://pay?pa=${upiId}&pn=Varun%20Sehgal&am=${selectedPreset}&cu=INR&tn=Coffee%20for%20Varun`;

  return (
    <div className="coffee-modal-backdrop" onClick={onClose}>
      <div className="coffee-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="coffee-modal-header">
          <div className="coffee-modal-title-wrap">
            <div className="coffee-icon-badge">
              <Coffee size={18} className="coffee-cup-icon" />
            </div>
            <div>
              <h3 className="coffee-modal-title">Buy Varun a Coffee</h3>
              <p className="coffee-modal-sub">Support open-source design engineering & VarunOS</p>
            </div>
          </div>
          <button 
            type="button" 
            className="coffee-modal-close-btn"
            onClick={onClose}
            title="Close (Esc)"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="coffee-modal-body">
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

              <div className="coffee-scan-tip-box" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '8px', padding: '9px 12px', fontSize: '11.5px', color: '#fde68a' }}>
                <Sparkles size={13} className="text-amber-400 flex-shrink-0" />
                <span>Scan the QR code with GPay, PhonePe, or Paytm to send ₹{selectedPreset}!</span>
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
        </div>

        {/* Modal Footer */}
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

          <button 
            type="button" 
            className="coffee-modal-done-btn"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyMeCoffeeModal;
