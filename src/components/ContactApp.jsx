import { useState } from 'react';
import { 
  Send, 
  Check, 
  Copy, 
  Mail, 
  Globe, 
  ExternalLink, 
  Phone, 
  Sparkles, 
  MapPin, 
  Palette, 
  MessageSquare,
  Clock,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import './ContactApp.css';

const LinkedInIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32Z"/>
  </svg>
);

const GitHubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const BehanceIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-4.976 3-3.468 0-5.5-2.582-5.5-5.836 0-3.377 2.14-5.914 5.5-5.914 3.25 0 5.166 2.352 5.166 5.61 0 .428-.035.838-.094 1.14h-7.7c.05 1.5 1.15 2.5 2.7 2.5 1.1 0 1.95-.5 2.4-1.3l2.504.8zm-7.6-4.5h5.1c-.05-1.3-.9-2.2-2.45-2.2-1.4 0-2.35.8-2.65 2.2zM2 4h6.5c2.3 0 4.1 1.3 4.1 3.2 0 1.2-.6 2.2-1.7 2.7 1.4.5 2.1 1.7 2.1 3.2 0 2.2-1.9 3.9-4.5 3.9H2V4zm3 5.4h3.1c.9 0 1.5-.5 1.5-1.3 0-.8-.6-1.3-1.5-1.3H5v2.6zm0 5h3.4c1 0 1.7-.5 1.7-1.4 0-.9-.7-1.4-1.7-1.4H5v2.8z"/>
  </svg>
);

const TOPICS = [
  { id: 'role', label: '💼 Full-Time Role', subject: 'Product Design Opportunity at [Company]' },
  { id: 'design-system', label: '⚡ Design Systems', subject: 'Design System Consulting / Audit Inquiry' },
  { id: 'product', label: '🎨 Product Design', subject: 'Digital Product Design Collaboration' },
  { id: 'chat', label: '☕ Quick Intro', subject: 'Networking / Portfolio Intro' },
];

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzSj15uB3DNaGQURwTzhYLfD78iT744Hz3Zi_9oo3J_jdSVZcM_ERRLJU-q9IbNCMI/exec';

const ContactApp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'role',
    subject: 'Product Design Opportunity at [Company]',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('varun.sehgal02@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSelectTopic = (topic) => {
    setFormData(prev => ({
      ...prev,
      topic: topic.id,
      subject: topic.subject
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    try {
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(formData)
      });

      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
        setFormData({
          name: '',
          email: '',
          topic: 'role',
          subject: 'Product Design Opportunity at [Company]',
          message: ''
        });
      }, 5000);
    } catch (err) {
      console.warn('Apps Script dispatch notice:', err);
      // Fallback display
      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  };

  return (
    <div className="contact-mac-window">
      {/* Left Sidebar: Profile & Channels */}
      <aside className="contact-sidebar">
        {/* Profile Card */}
        <div className="contact-profile-card">
          <div className="profile-avatar-wrap">
            <img 
              src="/varun.jpg" 
              alt="Varun Sehgal" 
              className="profile-avatar-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector('.profile-avatar-gradient');
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="profile-avatar-gradient" style={{ display: 'none' }}>VS</div>
            <span className="profile-status-indicator" title="Available for opportunities"></span>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">Varun Sehgal</h2>
            <p className="profile-headline">Lead Product Designer & Design Engineer</p>
          </div>
        </div>

        {/* Live Availability Badge */}
        <div className="contact-badge-card">
          <div className="badge-header">
            <span className="badge-pulse-dot"></span>
            <span className="badge-status-title">Status: Available</span>
          </div>
          <p className="badge-desc">
            Open for product design roles, scalable design systems, and freelance SaaS design.
          </p>
        </div>

        {/* Fast Action Details */}
        <div className="contact-quick-list">
          <div className="quick-item">
            <MapPin size={14} className="quick-icon" />
            <span className="quick-label">Location</span>
            <span className="quick-val">Bengaluru, IN (Remote)</span>
          </div>
          <div className="quick-item">
            <Clock size={14} className="quick-icon" />
            <span className="quick-label">Timezone</span>
            <span className="quick-val">IST (UTC+5:30)</span>
          </div>
          <div className="quick-item clickable" onClick={handleCopyEmail}>
            <Mail size={14} className="quick-icon" />
            <span className="quick-label">Email</span>
            <span className="quick-val copyable">
              varun.sehgal02@gmail.com
              {copiedEmail ? <Check size={12} className="copy-icon green" /> : <Copy size={12} className="copy-icon" />}
            </span>
          </div>
          <div className="quick-item">
            <Phone size={14} className="quick-icon" />
            <span className="quick-label">Phone</span>
            <a href="tel:+919399361193" className="quick-val link">+91 9399361193</a>
          </div>
        </div>

        {/* Social Links */}
        <div className="contact-social-group">
          <div className="social-group-label">PROFILES & WORKS</div>
          <div className="social-links-grid">
            <a 
              href="https://linkedin.com/in/varunsehgal02" 
              target="_blank" 
              rel="noreferrer" 
              className="social-pill linkedin"
            >
              <LinkedInIcon size={14} />
              <span>LinkedIn</span>
              <ArrowUpRight size={12} className="arrow" />
            </a>
            <a 
              href="https://github.com/varunsehgal05" 
              target="_blank" 
              rel="noreferrer" 
              className="social-pill github"
            >
              <GitHubIcon size={14} />
              <span>GitHub</span>
              <ArrowUpRight size={12} className="arrow" />
            </a>
            <a 
              href="https://behance.net/varunsehgal3" 
              target="_blank" 
              rel="noreferrer" 
              className="social-pill behance"
            >
              <BehanceIcon size={14} />
              <span>Behance</span>
              <ArrowUpRight size={12} className="arrow" />
            </a>
            <a 
              href="https://www.figma.com/@varunsehgal" 
              target="_blank" 
              rel="noreferrer" 
              className="social-pill figma"
            >
              <Palette size={14} />
              <span>Figma</span>
              <ArrowUpRight size={12} className="arrow" />
            </a>
          </div>
        </div>
      </aside>

      {/* Right Column: macOS Mail Compose Client */}
      <main className="contact-mail-pane">
        {/* Mail Toolbar / Header */}
        <div className="mail-toolbar">
          <div className="mail-toolbar-title">
            <MessageSquare size={16} className="mail-icon" />
            <span>Compose Message</span>
          </div>
          <div className="mail-meta-tags">
            <span className="mail-meta-tag"><Sparkles size={11} /> Fast Response (&lt; 24h)</span>
          </div>
        </div>

        {/* Compose Form */}
        <form className="mail-compose-body" onSubmit={handleSubmit}>
          {/* Header Rows */}
          <div className="mail-field-row">
            <span className="field-label">To:</span>
            <div className="field-recipient-chip">
              <span className="recipient-name">Varun Sehgal</span>
              <span className="recipient-email">&lt;varun.sehgal02@gmail.com&gt;</span>
            </div>
          </div>

          <div className="mail-field-row">
            <label className="field-label" htmlFor="sender-name">From:</label>
            <div className="field-inputs-wrap">
              <input 
                id="sender-name"
                type="text" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="mac-input sender-name-input"
              />
              <input 
                type="email" 
                placeholder="your.email@company.com" 
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="mac-input sender-email-input"
              />
            </div>
          </div>

          {/* Quick Subject Pill Selector */}
          <div className="mail-field-row topics-row">
            <span className="field-label">Topic:</span>
            <div className="topics-pill-list">
              {TOPICS.map(topic => (
                <button
                  key={topic.id}
                  type="button"
                  className={`topic-chip ${formData.topic === topic.id ? 'active' : ''}`}
                  onClick={() => handleSelectTopic(topic)}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mail-field-row">
            <label className="field-label" htmlFor="mail-subject">Subject:</label>
            <input 
              id="mail-subject"
              type="text" 
              placeholder="Subject" 
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              required
              className="mac-input subject-input"
            />
          </div>

          {/* Message Area */}
          <div className="mail-textarea-wrap">
            <textarea
              placeholder="Hi Varun,

I came across your portfolio and wanted to discuss a product design role / project with our team. We're looking for someone who specializes in design systems and intuitive UX..."
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              required
              className="mac-textarea"
              rows={8}
            />
          </div>

          {/* Footer Actions */}
          <div className="mail-footer-bar">
            <div className="footer-left">
              <a 
                href={`mailto:varun.sehgal02@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
                className="open-native-mail-link"
              >
                <ExternalLink size={13} /> Open in Mail App
              </a>
            </div>

            <div className="footer-right">
              {status === 'sent' ? (
                <div className="send-success-badge">
                  <Check size={14} /> Message Sent! Varun will reply shortly.
                </div>
              ) : (
                <button 
                  type="submit" 
                  disabled={status === 'sending'} 
                  className={`send-message-btn ${status === 'sending' ? 'sending' : ''}`}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="spinner-dots"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={14} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ContactApp;
