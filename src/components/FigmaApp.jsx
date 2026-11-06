import { useState, useRef, useEffect } from 'react';
import { 
  ExternalLink, 
  Play, 
  Share2, 
  Check, 
  Layers, 
  Home, 
  Briefcase, 
  User, 
  FileText, 
  Workflow,
  Sparkles
} from 'lucide-react';
import './FigmaApp.css';

const FigmaLogo = ({ size = 20 }) => (
  <svg 
    width={size} 
    height={size * 1.5} 
    viewBox="0 0 38 57" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);

const TABS = [
  { id: 'home', label: 'Home', path: '/', icon: Home },
  { id: 'projects', label: 'Projects', path: '/projects', icon: Layers },
  { id: 'experience', label: 'Experience', path: '/experience', icon: Briefcase },
  { id: 'about', label: 'About', path: '/about', icon: User },
  { id: 'resume', label: 'Resume', path: '/resume', icon: FileText },
  { id: 'process', label: 'Process', path: '/process', icon: Workflow },
];

const FIGMA_PROJECT_LINKS = [
  {
    name: 'AI Interview Prep System',
    url: 'https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1',
    desc: 'Interactive Figma design file with full component library'
  },
  {
    name: 'Movie Ticket Booking App',
    url: 'https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1',
    desc: 'High-fidelity mobile UX prototype & flows'
  },
  {
    name: 'Expensify - Budget Tracker',
    url: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1',
    desc: 'FinTech dashboard with micro-interactions'
  },
  {
    name: 'EventFlow Experience Platform',
    url: 'https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2&p=f&t=ucsh4jF84sBl50UA-0',
    desc: 'Event planning UI design system'
  }
];

const FigmaApp = ({ isInteracting = false }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentPath, setCurrentPath] = useState('/');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef(null);

  const baseUrl = (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
    ? 'https://varunsehgal.runs-on.dev'
    : 'http://localhost:8080';
  const iframeUrl = `${baseUrl}${currentPath}`;

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    setCurrentPath(tab.path);
    setIsLoading(true);
    setHasError(false);
  };

  const handleReload = () => {
    setIsLoading(true);
    setHasError(false);
    if (iframeRef.current) {
      iframeRef.current.src = `${baseUrl}${currentPath}?t=${Date.now()}`;
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(iframeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenExternal = () => {
    window.open(iframeUrl, '_blank');
  };

  return (
    <div className="figma-app-container">
      {/* Top Figma App Header / Navigation */}
      <div className="figma-toolbar">
        <div className="figma-toolbar-left">
          <div className="figma-logo-wrapper" title="Figma Workspace" onClick={() => handleTabClick(TABS[0])}>
            <FigmaLogo size={14} />
          </div>

          <div className="figma-file-info">
            <span className="figma-filename">Varun Sehgal — Portfolio Workspace</span>
            <span className="figma-status-badge">Live App</span>
          </div>

          {/* Quick Route Tabs inside Figma */}
          <div className="figma-tabs">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`figma-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleTabClick(tab)}
                  title={`Navigate to ${tab.label}`}
                >
                  <Icon size={13} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="figma-toolbar-right">
          <button 
            className="figma-share-btn" 
            title="Copy Project URL" 
            onClick={handleCopyLink}
          >
            {copied ? <Check size={13} /> : <Share2 size={13} />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>

          <button 
            className="figma-present-btn" 
            title="Present Prototype" 
            onClick={handleOpenExternal}
          >
            <Play size={12} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Main Viewport containing the portfolio web app */}
      <div className="figma-viewport">
        {isLoading && (
          <div className="figma-loading-overlay">
            <div className="figma-loading-logo">
              <FigmaLogo size={36} />
            </div>
            <div className="figma-loading-text">Opening Figma Portfolio Workspace...</div>
            <div className="figma-progress-bar">
              <div className="figma-progress-fill"></div>
            </div>
          </div>
        )}

        {hasError ? (
          <div className="figma-fallback-container">
            <div className="figma-fallback-card">
              <FigmaLogo size={32} />
              <div className="figma-fallback-title">Figma Portfolio Workspace</div>
              <p className="figma-fallback-desc">
                Local portfolio server at <code>http://localhost:8080</code> is offline or unreachable. 
                You can explore the direct Figma project files below:
              </p>

              <div className="figma-direct-links">
                {FIGMA_PROJECT_LINKS.map((proj, idx) => (
                  <a 
                    key={idx}
                    href={proj.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="figma-direct-link-item"
                  >
                    <div>
                      <strong>{proj.name}</strong>
                      <div style={{ fontSize: '11px', color: '#888' }}>{proj.desc}</div>
                    </div>
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>

              <button className="action-button" onClick={handleReload}>
                Retry Connection
              </button>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={iframeUrl}
            className="figma-iframe"
            title="Varun Sehgal Figma Portfolio"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            style={{
              pointerEvents: isInteracting ? 'none' : 'auto',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.25s ease'
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FigmaApp;
