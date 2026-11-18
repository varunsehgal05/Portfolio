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
  Send,
  Code2,
  Cpu,
  Layers3,
  Sliders,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Maximize2
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

const FigmaCursorPointer = ({ color = '#1ABCFE' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="figma-cursor-svg">
    <path
      d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
      fill={color}
      stroke="#ffffff"
      strokeWidth="1.5"
    />
  </svg>
);

const TABS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: Layers },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'about', label: 'About', icon: User },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'process', label: 'Process', icon: Workflow },
];

const FIGMA_PROJECT_LINKS = [
  {
    id: 'interview',
    name: 'AI Interview & Prep Platform',
    badge: 'UX Prototype',
    url: 'https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1',
    desc: 'Architected AI-driven SaaS candidate evaluation platform with dedicated grading modules and real-time audio waveform telemetry.',
    tags: ['Figma', 'SaaS', 'AI UX', 'Dark Mode']
  },
  {
    id: 'ticket',
    name: 'Movie Ticket Booking App',
    badge: 'Mobile App',
    url: 'https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1',
    desc: 'High-fidelity mobile UX prototype with interactive seat selection, cinema sound hall visualizer, and 3-step checkout flow.',
    tags: ['Mobile UX', 'Micro-interactions', 'Cinema', 'Prototyping']
  },
  {
    id: 'expensify',
    name: 'Expensify - Budget Tracker',
    badge: 'FinTech',
    url: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1',
    desc: '17+ mobile screens refined for rapid expense logging under 5 seconds with real-time financial charts and multi-currency support.',
    tags: ['FinTech', 'Data Viz', 'Mobile App', 'Design Tokens']
  },
  {
    id: 'eventflow',
    name: 'EventFlow Experience Platform',
    badge: 'Design System',
    url: 'https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2&p=f&t=ucsh4jF84sBl50UA-0',
    desc: '4-step checkout flow optimization cutting drop-off by 30% powered by a 50+ component modular Figma design system.',
    tags: ['Design System', 'Figma', 'Checkout UX', 'Modular UI']
  }
];

const EXPERIENCE_ITEMS = [
  {
    role: 'UI/UX Designer Intern',
    company: 'UniEvent (Remote)',
    period: 'Jun 2026 – Nov 2026',
    desc: 'Designed user-focused digital experiences and translated complex business requirements into clear, consistent interfaces for multi-tier student platforms.',
    tags: ['Figma', 'Wireframing', 'User Research', 'Design Systems']
  },
  {
    role: 'Assistant Head of Operations',
    company: 'Assemble (Remote)',
    period: 'Aug 2025 – Jan 2026',
    desc: 'Assisted in the planning and smooth execution of esports tournaments and gaming events; managed scheduling, communication, and participant coordination for 200+ participants.',
    tags: ['Operations', 'Team Leadership', 'Coordination', 'Esports']
  },
  {
    role: 'UI/UX Designer Intern',
    company: 'Knaptix Ventures (Remote)',
    period: 'Jun 2025 – Aug 2025',
    desc: 'Conceptualized 5+ high-fidelity UI/UX interfaces with 40% increase in user satisfaction and 45% faster design-to-development turnaround.',
    tags: ['Prototyping', 'Usability Testing', 'Component Libraries']
  },
  {
    role: 'Freelance UI/UX Designer',
    company: 'Self-Employed (Remote)',
    period: 'Jan 2024 – Present',
    desc: 'Executed 10+ end-to-end design projects with 95% client retention for tech startups, designing wireframes, responsive UI, design tokens, and developer handoffs.',
    tags: ['End-to-End UX', 'Client Relations', 'Design Systems']
  }
];

const DESIGN_PROCESS = [
  {
    step: '01',
    title: 'Discover & Research',
    desc: 'User interviews, competitive analysis, stakeholder mapping, and quantitative telemetry to define core problem spaces.'
  },
  {
    step: '02',
    title: 'Define & Information Architecture',
    desc: 'User journey flows, empathy maps, low-fidelity wireframing, and content hierarchy modeling.'
  },
  {
    step: '03',
    title: 'Design Systems & Tokens',
    desc: 'Building atomic UI components, color variables, typographic scales, and responsive auto-layout frames in Figma.'
  },
  {
    step: '04',
    title: 'Interactive Prototyping',
    desc: 'High-fidelity micro-interactions, smart animate transitions, and realistic prototype testing with target users.'
  },
  {
    step: '05',
    title: 'Handoff & Validation',
    desc: 'Detailed developer specifications, token documentation, usability test synthesis, and iterative design refinement.'
  }
];

const FigmaApp = ({ isInteracting = false, userName = 'Guest' }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedFrame, setSelectedFrame] = useState('frame-interview');
  const [copied, setCopied] = useState(false);
  const [activeUserChat, setActiveUserChat] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [localMouse, setLocalMouse] = useState({ x: -100, y: -100, isInside: false });
  const [varunCursor, setVarunCursor] = useState({
    x: 480,
    y: 190,
    chat: `Welcome ${userName}! Exploring Figma canvas 👋`
  });

  const canvasRef = useRef(null);

  // Autonomous movement for Varun Sehgal cursor on Canvas
  useEffect(() => {
    if (activeTab !== 'home') return;

    const interval = setInterval(() => {
      setVarunCursor((prev) => {
        const dx = (Math.random() - 0.5) * 80;
        const dy = (Math.random() - 0.5) * 60;
        const newX = Math.max(120, Math.min(850, prev.x + dx));
        const newY = Math.max(100, Math.min(480, prev.y + dy));
        return {
          ...prev,
          x: newX,
          y: newY
        };
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [activeTab]);

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setLocalMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isInside: true
    });
  };

  const handleMouseLeave = () => {
    setLocalMouse((prev) => ({ ...prev, isInside: false }));
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://github.com/varunsehgal05/Portfolio');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setActiveUserChat(chatInput);
    setChatInput('');
    setIsChatOpen(false);
    setTimeout(() => setActiveUserChat(''), 5000);
  };

  return (
    <div className="figma-app-container">
      {/* Top Figma App Header / Navigation */}
      <div className="figma-toolbar">
        <div className="figma-toolbar-left">
          <div className="figma-logo-wrapper" title="Figma Workspace" onClick={() => setActiveTab('home')}>
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
                  onClick={() => setActiveTab(tab.id)}
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
          {/* Active Collaborators Avatars */}
          <div className="figma-collaborators">
            <span className="collab-avatar user" title={`${userName} (You)`}>
              {(userName[0] || 'U').toUpperCase()}
            </span>
            <span className="collab-avatar owner" title="Varun Sehgal (Owner)">
              VS
            </span>
            <span className="collab-badge">2 live</span>
          </div>

          <button 
            className="figma-share-btn" 
            title="Copy Portfolio Link" 
            onClick={handleCopyLink}
          >
            {copied ? <Check size={13} /> : <Share2 size={13} />}
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>

          <button 
            className="figma-present-btn" 
            title="Present Prototype (Play)"
            onClick={() => setActiveTab('projects')}
          >
            <Play size={13} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Main Viewport Content based on active tab */}
      <div className="figma-viewport">
        {/* =========================================================
            TAB 1: HOME (Interactive Figma Canvas Workspace)
            ========================================================= */}
        {activeTab === 'home' && (
          <div 
            ref={canvasRef}
            className="figma-canvas-workspace"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Top Canvas Banner */}
            <div className="figma-canvas-banner">
              <span className="banner-pulse" />
              <span>⚡ Interactive Figma Canvas — Collaborating as <strong>{userName}</strong>. Click any artboard frame to inspect!</span>
              <button className="chat-trigger-pill" onClick={() => setIsChatOpen((prev) => !prev)}>
                💬 Chat with Cursor
              </button>
            </div>

            {/* Figma Frames Grid */}
            <div className="figma-frames-grid">
              {/* Frame 1: AI Interview Prep Prototype */}
              <div 
                className={`figma-frame ${selectedFrame === 'frame-interview' ? 'selected' : ''}`}
                onClick={() => setSelectedFrame('frame-interview')}
              >
                <div className="figma-frame-header">
                  <div className="frame-meta">
                    <span className="frame-icon">#</span>
                    <span className="frame-title">Frame 1: AI Interview Prep Prototype</span>
                  </div>
                  <span className="frame-coords">420 × 520 • Auto-layout</span>
                </div>
                <div className="figma-frame-content dark-card">
                  <div className="frame-inner-badge">Live AI Session</div>
                  <h4 className="frame-inner-headline">Design a low-latency real-time cursor broadcast pipeline</h4>
                  <p className="frame-inner-desc">How would you scale WebSocket connections to 100k concurrent designers?</p>

                  <div className="audio-visualizer-sim">
                    {[40, 75, 55, 90, 60, 80, 45, 95, 70, 85, 50, 65].map((h, i) => (
                      <div key={i} className="wave-bar" style={{ height: `${h}%` }} />
                    ))}
                  </div>

                  <div className="frame-stat-row">
                    <div>
                      <div className="stat-label">Architecture Score</div>
                      <div className="stat-val highlight">96%</div>
                    </div>
                    <div>
                      <div className="stat-label">Latency Metric</div>
                      <div className="stat-val">14.2 ms</div>
                    </div>
                  </div>

                  <div className="frame-action-btns">
                    <button className="btn-primary" onClick={(e) => { e.stopPropagation(); alert('Feedback accepted!'); }}>Accept Feedback</button>
                    <button className="btn-secondary" onClick={(e) => { e.stopPropagation(); alert('Loading next scenario...'); }}>Next Question →</button>
                  </div>
                </div>
              </div>

              {/* Frame 2: Nebula Cloud Architecture */}
              <div 
                className={`figma-frame ${selectedFrame === 'frame-nebula' ? 'selected' : ''}`}
                onClick={() => setSelectedFrame('frame-nebula')}
              >
                <div className="figma-frame-header">
                  <div className="frame-meta">
                    <span className="frame-icon">#</span>
                    <span className="frame-title">Frame 2: Nebula Cloud Architecture</span>
                  </div>
                  <span className="frame-coords">420 × 520 • Responsive</span>
                </div>
                <div className="figma-frame-content dark-card">
                  <div className="telemetry-grid">
                    <div className="telemetry-box">
                      <span className="telemetry-title">Global P99 Latency</span>
                      <span className="telemetry-num">14.2 ms</span>
                    </div>
                    <div className="telemetry-box">
                      <span className="telemetry-title">SLA Uptime</span>
                      <span className="telemetry-num green">99.99%</span>
                    </div>
                  </div>

                  <div className="cluster-status-box">
                    <div className="cluster-row">
                      <span className="cluster-dot online" />
                      <span>us-east-1 (Primary Gateway)</span>
                      <span className="cluster-tag">24 pods</span>
                    </div>
                    <div className="cluster-row">
                      <span className="cluster-dot online" />
                      <span>ap-south-1 (Multiplayer Mesh)</span>
                      <span className="cluster-tag">12 pods</span>
                    </div>
                  </div>

                  <div className="terminal-mini-stream">
                    <code>$ git push origin main → Automated canary deploy healthy.</code>
                  </div>
                </div>
              </div>

              {/* Frame 3: Design Tokens & System */}
              <div 
                className={`figma-frame ${selectedFrame === 'frame-tokens' ? 'selected' : ''}`}
                onClick={() => setSelectedFrame('frame-tokens')}
              >
                <div className="figma-frame-header">
                  <div className="frame-meta">
                    <span className="frame-icon">#</span>
                    <span className="frame-title">Frame 3: Design Tokens & System</span>
                  </div>
                  <span className="frame-coords">420 × 340 • Variables</span>
                </div>
                <div className="figma-frame-content dark-card">
                  <div className="tokens-swatches-grid">
                    <div className="color-swatch-box" style={{ background: '#1ABCFE' }}>
                      <span>#1ABCFE</span>
                      <span className="swatch-role">Primary Cyan</span>
                    </div>
                    <div className="color-swatch-box" style={{ background: '#A259FF' }}>
                      <span>#A259FF</span>
                      <span className="swatch-role">Figma Purple</span>
                    </div>
                    <div className="color-swatch-box" style={{ background: '#0ACF83' }}>
                      <span>#0ACF83</span>
                      <span className="swatch-role">Success Mint</span>
                    </div>
                    <div className="color-swatch-box" style={{ background: '#FF7262' }}>
                      <span>#FF7262</span>
                      <span className="swatch-role">Coral Alert</span>
                    </div>
                  </div>

                  <div className="tokens-pills-row">
                    <span className="component-pill active">Primary Action</span>
                    <span className="component-pill">Glass Pill</span>
                    <span className="component-pill outline">Outline Ghost</span>
                  </div>
                </div>
              </div>

              {/* Frame 4: Krypton Idempotent Webhooks */}
              <div 
                className={`figma-frame ${selectedFrame === 'frame-webhooks' ? 'selected' : ''}`}
                onClick={() => setSelectedFrame('frame-webhooks')}
              >
                <div className="figma-frame-header">
                  <div className="frame-meta">
                    <span className="frame-icon">#</span>
                    <span className="frame-title">Frame 4: Krypton Idempotent Webhooks</span>
                  </div>
                  <span className="frame-coords">420 × 340 • Backend</span>
                </div>
                <div className="figma-frame-content dark-card">
                  <pre className="code-block-preview">
                    <code>{`{
  "event": "payment.settled",
  "idempotency_key": "idemp_89231f8a",
  "status": "confirmed",
  "timestamp": 1731919200
}`}</code>
                  </pre>
                  <div className="telemetry-row-mini">
                    <span className="badge-green">✓ Verified Duplicate Safe</span>
                    <span className="badge-blue">Telemetry 200 OK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Multiplayer Cursors Layer */}
            <div className="figma-cursors-layer">
              {/* Local User Cursor */}
              {localMouse.isInside && (
                <div 
                  className="figma-live-cursor user-cursor"
                  style={{ transform: `translate3d(${localMouse.x}px, ${localMouse.y}px, 0)` }}
                >
                  <FigmaCursorPointer color="#1ABCFE" />
                  <div className="cursor-label-pill user-pill">
                    <span>{userName} (You)</span>
                  </div>
                  {activeUserChat && (
                    <div className="cursor-chat-bubble local">
                      <span>{activeUserChat}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Autonomous Peer Cursor (Varun Sehgal) */}
              <div 
                className="figma-live-cursor peer-cursor"
                style={{ transform: `translate3d(${varunCursor.x}px, ${varunCursor.y}px, 0)` }}
              >
                <FigmaCursorPointer color="#A259FF" />
                <div className="cursor-label-pill owner-pill">
                  <span>Varun Sehgal (Owner)</span>
                </div>
                {varunCursor.chat && (
                  <div className="cursor-chat-bubble owner">
                    <span>{varunCursor.chat}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Chat Input Box */}
            {isChatOpen && (
              <div className="figma-chat-float-box">
                <form onSubmit={handleSendChat} className="chat-form">
                  <input
                    type="text"
                    placeholder="Type message with your cursor... (Enter)"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    autoFocus
                  />
                  <button type="submit">
                    <Send size={12} />
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 2: PROJECTS (Figma Design Prototypes & File Links)
            ========================================================= */}
        {activeTab === 'projects' && (
          <div className="figma-subview-container projects-view">
            <div className="subview-header">
              <span className="subview-tag">Verified Figma Prototypes</span>
              <h2>Featured Design Files & Systems</h2>
              <p>Explore production UI design systems, interactive prototypes, and component libraries crafted in Figma by Varun Sehgal.</p>
            </div>

            <div className="figma-projects-grid">
              {FIGMA_PROJECT_LINKS.map((proj) => (
                <div key={proj.id} className="figma-project-card">
                  <div className="proj-card-top">
                    <span className="proj-badge">{proj.badge}</span>
                    <a href={proj.url} target="_blank" rel="noreferrer" className="proj-external-icon" title="Open in Figma">
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  <h3 className="proj-title">{proj.name}</h3>
                  <p className="proj-desc">{proj.desc}</p>

                  <div className="proj-tags-row">
                    {proj.tags.map((tag, idx) => (
                      <span key={idx} className="proj-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="proj-card-footer">
                    <a href={proj.url} target="_blank" rel="noreferrer" className="btn-open-figma">
                      <FigmaLogo size={12} />
                      <span>Open in Figma</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: EXPERIENCE (Professional Career Timeline)
            ========================================================= */}
        {activeTab === 'experience' && (
          <div className="figma-subview-container experience-view">
            <div className="subview-header">
              <span className="subview-tag">Design Career Journey</span>
              <h2>Professional Experience & Milestones</h2>
              <p>3+ years delivering impactful SaaS products, gaming platforms, and high-conversion design systems.</p>
            </div>

            <div className="experience-timeline">
              {EXPERIENCE_ITEMS.map((item, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <div>
                        <h3 className="timeline-role">{item.role}</h3>
                        <span className="timeline-company">{item.company}</span>
                      </div>
                      <span className="timeline-period">{item.period}</span>
                    </div>

                    <p className="timeline-desc">{item.desc}</p>

                    <div className="timeline-tags">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="timeline-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 4: ABOUT (Designer Profile & Philosophy)
            ========================================================= */}
        {activeTab === 'about' && (
          <div className="figma-subview-container about-view">
            <div className="about-hero-grid">
              <div className="about-profile-card">
                <div className="about-avatar-ring">
                  <div className="avatar-initials">VS</div>
                </div>
                <h3>Varun Sehgal</h3>
                <span className="about-subtitle">UI/UX & Product Designer</span>
                <div className="about-location">
                  <MapPin size={13} />
                  <span>Gwalior, Madhya Pradesh, India</span>
                </div>

                <div className="about-quick-stats">
                  <div className="qstat">
                    <span className="qnum">3+</span>
                    <span className="qlab">Years Exp.</span>
                  </div>
                  <div className="qstat">
                    <span className="qnum">15+</span>
                    <span className="qlab">Shipped UIs</span>
                  </div>
                  <div className="qstat">
                    <span className="qnum">95%</span>
                    <span className="qlab">Client Ret.</span>
                  </div>
                </div>
              </div>

              <div className="about-text-content">
                <span className="subview-tag">Designer Philosophy</span>
                <h2>Designing Intuitive Digital Experiences</h2>
                <p>
                  I bridge user empathy with mathematical system design. Every layout, typography scale, 
                  and interaction curve is engineered to reduce cognitive friction while delighting the end user.
                </p>

                <div className="about-strengths-grid">
                  <div className="strength-card">
                    <h4>Design Systems</h4>
                    <p>Modular component libraries with tokenized variables, responsive auto-layout, and state variants.</p>
                  </div>
                  <div className="strength-card">
                    <h4>SaaS & AI Prototyping</h4>
                    <p>Crafting conversational AI workflows, real-time telemetry dashboards, and multi-step complex funnels.</p>
                  </div>
                  <div className="strength-card">
                    <h4>Frontend Empathy</h4>
                    <p>Deep familiarity with React, CSS glassmorphism, and DOM mechanics ensuring seamless developer handoffs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 5: RESUME (ATS-Optimized Overview)
            ========================================================= */}
        {activeTab === 'resume' && (
          <div className="figma-subview-container resume-view">
            <div className="subview-header">
              <span className="subview-tag">Curriculum Vitae</span>
              <h2>Varun Sehgal — Resume Overview</h2>
              <p>ATS-friendly summary of core design competencies, track record, and educational background.</p>
            </div>

            <div className="resume-grid-cards">
              <div className="resume-card">
                <h3>Core Technical Skills</h3>
                <div className="skill-category">
                  <strong>Design & Systems:</strong> Figma, FigJam, Adobe XD, Adobe Photoshop, Illustrator, Design Tokens
                </div>
                <div className="skill-category">
                  <strong>UX Methods:</strong> Wireframing, User Journey Mapping, Heuristic Evaluation, Usability Testing
                </div>
                <div className="skill-category">
                  <strong>Frontend Bridge:</strong> React.js, Next.js, HTML5, CSS3, Tailwind CSS, TypeScript, Git
                </div>
              </div>

              <div className="resume-card highlight-card">
                <h3>Selected Achievements</h3>
                <ul className="achievements-list">
                  <li>Reduced onboarding drop-off by 30% through a 4-step streamlined checkout flow design in EventFlow.</li>
                  <li>Delivered 5+ production-grade interfaces at Knaptix Ventures boosting client turnaround by 45%.</li>
                  <li>Coordinated 200+ esports tournament participants with zero downtime operational workflows at Assemble.</li>
                </ul>

                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-download-resume">
                  <FileText size={14} />
                  <span>View Full Resume PDF</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 6: PROCESS (5-Stage UI/UX Methodology)
            ========================================================= */}
        {activeTab === 'process' && (
          <div className="figma-subview-container process-view">
            <div className="subview-header">
              <span className="subview-tag">Methodology</span>
              <h2>The 5-Stage Product Design Process</h2>
              <p>How raw ideas are transformed into polished, verified, and developer-ready interfaces.</p>
            </div>

            <div className="process-cards-flow">
              {DESIGN_PROCESS.map((p, idx) => (
                <div key={idx} className="process-flow-step">
                  <div className="process-step-num">{p.step}</div>
                  <h3 className="process-step-title">{p.title}</h3>
                  <p className="process-step-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FigmaApp;
