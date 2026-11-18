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
  Sparkles,
  Download,
  Calendar,
  Award
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
    <path d="M0 9.5C0 4.25329 4.25329 0 9.5 0H19V19H9.5C4.25329 19 0 14.7467 0 9.5Z" fill="#F24E1E"/>
    <path d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262"/>
    <path d="M0 28.5C0 23.2533 4.25329 19 9.5 19H19V38H9.5C4.25329 38 0 33.7467 0 28.5Z" fill="#A259FF"/>
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
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

const EXPERIENCES = [
  {
    role: 'Lead UI/UX & Product Designer',
    company: 'CodeSrijan Hackathon Ecosystem',
    period: '2024 — Present',
    desc: 'Designed end-to-end participant portal, grading rubrics, and automated live evaluation telemetry for 200+ hackathon engineers.'
  },
  {
    role: 'Product Designer (Consultant & Freelance)',
    company: 'SaaS & Mobile Client Engagements',
    period: '2023 — 2024',
    desc: 'Delivered high-converting checkout flows, scalable Figma token systems, and mobile wireframes for fintech & event platforms.'
  },
  {
    role: 'UI Design Intern',
    company: 'Digital Product Studio',
    period: '2022 — 2023',
    desc: 'Conducted user interviews, audited accessibility compliance, and built interactive prototypes in Figma and FigJam.'
  }
];

const PROCESS_STEPS = [
  { num: '01', name: 'Discover', sub: 'User interviews & competitive audit' },
  { num: '02', name: 'Define', sub: 'Information architecture & user journeys' },
  { num: '03', name: 'Ideate', sub: 'Low-fidelity wireframing & rapid testing' },
  { num: '04', name: 'Prototype', sub: 'High-fidelity Figma tokens & micro-interactions' },
  { num: '05', name: 'Test', sub: 'Usability metrics & cross-device validation' }
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

  // Check connectivity to avoid Chrome rendering internal sad-page error
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 600);

      fetch('http://localhost:8080', { method: 'HEAD', mode: 'no-cors', signal: controller.signal })
        .then(() => {
          if (!isCancelled) {
            setHasError(false);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (!isCancelled) {
            setHasError(true);
            setIsLoading(false);
          }
        });

      return () => {
        isCancelled = true;
        controller.abort();
        clearTimeout(timeout);
      };
    } else {
      setIsLoading(false);
    }
  }, [currentPath]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    setCurrentPath(tab.path);
    setIsLoading(true);
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
          activeTab === 'home' ? (
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

                <div className="figma-action-buttons">
                  <button className="figma-retry-btn" onClick={handleReload}>
                    Retry Connection
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === 'projects' ? (
            <div className="figma-tab-view-container">
              <div className="figma-tab-card">
                <div className="figma-tab-header">
                  <div className="figma-tab-title">
                    <Layers size={16} />
                    <span>Featured Projects & Figma Files</span>
                  </div>
                  <span className="figma-tab-badge">4 Prototypes</span>
                </div>
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
              </div>
            </div>
          ) : activeTab === 'experience' ? (
            <div className="figma-tab-view-container">
              <div className="figma-tab-card">
                <div className="figma-tab-header">
                  <div className="figma-tab-title">
                    <Briefcase size={16} />
                    <span>Experience & Leadership</span>
                  </div>
                  <span className="figma-tab-badge">2022 — Present</span>
                </div>
                <div className="figma-timeline">
                  {EXPERIENCES.map((exp, idx) => (
                    <div key={idx} className="figma-timeline-item">
                      <div className="figma-timeline-role">{exp.role}</div>
                      <div className="figma-timeline-meta">{exp.company} • {exp.period}</div>
                      <div className="figma-timeline-desc">{exp.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === 'about' ? (
            <div className="figma-tab-view-container">
              <div className="figma-tab-card">
                <div className="figma-tab-header">
                  <div className="figma-tab-title">
                    <User size={16} />
                    <span>About Varun Sehgal</span>
                  </div>
                  <span className="figma-tab-badge">UI/UX Designer</span>
                </div>
                <p className="figma-fallback-desc" style={{ textAlign: 'left' }}>
                  Product Designer & Front-End Craftsman focused on high-density design systems, scalable SaaS web platforms, and intuitive UX micro-interactions.
                </p>
                <div className="figma-direct-links">
                  <div className="figma-direct-link-item">
                    <span><strong>Core Tools:</strong> Figma, FigJam, React, Tailwind CSS, TypeScript</span>
                    <Sparkles size={14} color="#0d99ff" />
                  </div>
                  <div className="figma-direct-link-item">
                    <span><strong>Specializations:</strong> Design Systems, Rapid Prototyping, Usability Testing</span>
                    <Award size={14} color="#0ACF83" />
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'resume' ? (
            <div className="figma-tab-view-container">
              <div className="figma-tab-card">
                <div className="figma-tab-header">
                  <div className="figma-tab-title">
                    <FileText size={16} />
                    <span>Varun Sehgal — Resume</span>
                  </div>
                  <span className="figma-tab-badge">ATS-Optimized</span>
                </div>
                <p className="figma-fallback-desc" style={{ textAlign: 'left' }}>
                  Explore the full verified resume including education, work history, leadership, and technical stack.
                </p>
                <div className="figma-direct-links">
                  <a 
                    href="/Varun_Sehgal_Resume.pdf" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="figma-direct-link-item"
                  >
                    <div>
                      <strong>Download Varun_Sehgal_Resume.pdf</strong>
                      <div style={{ fontSize: '11px', color: '#888' }}>Direct PDF Download (ATS Compliant)</div>
                    </div>
                    <Download size={14} />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="figma-tab-view-container">
              <div className="figma-tab-card">
                <div className="figma-tab-header">
                  <div className="figma-tab-title">
                    <Workflow size={16} />
                    <span>Design & Engineering Methodology</span>
                  </div>
                  <span className="figma-tab-badge">5 Stages</span>
                </div>
                <div className="figma-process-grid">
                  {PROCESS_STEPS.map((step, idx) => (
                    <div key={idx} className="figma-process-step">
                      <div className="figma-process-num">{step.num}</div>
                      <div className="figma-process-name">{step.name}</div>
                      <div className="figma-process-sub">{step.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
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
