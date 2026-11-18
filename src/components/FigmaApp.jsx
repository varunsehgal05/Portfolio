import { useState, useRef, useEffect } from 'react';
import './FigmaApp.css';

const CREATIVE_NOTES = [
  "Don't forget to redesign the logo!",
  "Meeting with the dev team at 4pm",
  "Buy more coffee ☕",
  "Fix that one CSS bug...",
  "Draft the new case study",
  "Update the typography scale",
  "Wireframe the new dashboard",
  "Send invoice to client"
];

const INITIAL_SHAPES = [
  { id: 1, text: "Don't forget to redesign the logo!", color: 'bg-yellow-200 text-black', x: 40, y: 30, isPinned: true },
  { id: 2, text: "Meeting with the dev team at 4pm", color: 'bg-blue-200 text-black', x: 260, y: 25, isPinned: false },
  { id: 3, text: "Buy more coffee ☕", color: 'bg-pink-200 text-black', x: 480, y: 40, isPinned: false },
];

const ALL_PROJECTS = [
  {
    id: 'ai-interview',
    name: 'AI Interview Prep System',
    category: 'SaaS / Web',
    badge: '40+ Components',
    metric: '40+ Components • Real-time Scoring',
    image: '/figma_AI_Interview.png',
    desc: 'Automated technical & behavioral mock interview platform with real-time AI scoring, candidate evaluation, and grading matrix.',
    tags: ['Figma', 'SaaS', 'AI UX', 'Dark Mode'],
    link: 'https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1'
  },
  {
    id: 'movie-tickets',
    name: 'Movie Ticket Booking App',
    category: 'Mobile App',
    badge: '12+ User Flows',
    metric: '3-Step Checkout • 12+ Flows',
    image: '/figma_Movie_Tickets.png',
    desc: 'Cinema booking mobile UX prototype streamlining seat selection, theater schedules, and payment completion.',
    tags: ['Mobile UX', 'Seat Map', 'Micro-interactions'],
    link: 'https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1'
  },
  {
    id: 'expensify',
    name: 'Expensify - Budget Tracker',
    category: 'Mobile App',
    badge: '17+ Screens',
    metric: 'Sub-5s Logging • 17+ Screens',
    image: '/figma_Expensify.png',
    desc: 'Personal finance analytics app bringing average "Add Expense" transaction logging time below 5 seconds.',
    tags: ['FinTech', 'Analytics', 'Dashboard', 'Figma'],
    link: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1'
  },
  {
    id: 'codesrijan',
    name: 'CodeSrijan Hackathon Portal',
    category: 'SaaS / Web',
    badge: '800+ Attendees',
    metric: '800+ Attendees • 50+ Teams',
    image: '/figma_CodeSrijan.png',
    desc: 'National hackathon portal facilitating registration, project submissions, live evaluation matrices, and announcements.',
    tags: ['React', 'Event Platform', 'Design System'],
    link: 'https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2&t=vfPIBYY278lzphVq-1'
  },
  {
    id: 'eventflow',
    name: 'EventFlow Experience Platform',
    category: 'Design Systems',
    badge: '50+ Tokens',
    metric: '50+ Modular Components • 30% Less Dropoff',
    image: '/figma_Movie_Tickets.png',
    desc: 'Modular event planning UI design system with reusable atomic components, flexible themes, and 4-step optimized checkout.',
    tags: ['Design System', 'Figma', 'Tokens'],
    link: 'https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2&p=f&t=ucsh4jF84sBl50UA-0'
  },
  {
    id: 'landing-page',
    name: 'Conversion Landing Page',
    category: 'SaaS / Web',
    badge: 'High Conversion',
    metric: 'Responsive • Conversion Focused',
    image: '/figma_AI_Interview.png',
    desc: 'Modern SaaS marketing landing page engineered for maximum conversion velocity and crisp brand typography.',
    tags: ['SaaS', 'Marketing', 'Figma'],
    link: 'https://www.figma.com/design/WfUzGPYsE7UFYS9YaQp5v6/home-page?node-id=0-1&p=f&t=cA3tERTu8AuInovg-0'
  },
  {
    id: 'saas-dashboard',
    name: 'Enterprise SaaS Dashboard',
    category: 'SaaS / Web',
    badge: 'Enterprise UI',
    metric: 'Multi-tenant • Telemetry',
    image: '/figma_Expensify.png',
    desc: 'Complex data visualization telemetry suite with role-based access, dark mode analytics, and filtering.',
    tags: ['Dashboard', 'Analytics', 'Enterprise'],
    link: 'https://www.figma.com/design/PbO4QNnkgAyrPtkuyduZFE/sas?node-id=0-1&t=yHd7NxOZzn7AZUuw-0'
  }
];

const TIMELINE = [
  {
    role: 'Lead Product Designer',
    company: 'UniEvent',
    period: 'Oct 2024 — Present',
    desc: 'Leading product design for campus event ticketing platform, developing end-to-end design systems and reducing checkout friction by 30%.'
  },
  {
    role: 'UI/UX Design Intern',
    company: 'Assemble',
    period: 'Jul 2024 — Sep 2024',
    desc: 'Designed collaborative creator workspace tools and interaction prototypes in Figma, translating complex user workflows into clean UI.'
  },
  {
    role: 'UI/UX Intern',
    company: 'Knaptix Ventures',
    period: 'Jan 2024 — Jun 2024',
    desc: 'Created high-fidelity wireframes and design system components for B2B client applications and web dashboards.'
  },
  {
    role: 'Freelance UI/UX Designer',
    company: 'Independent',
    period: '2023 — Present',
    desc: 'Delivered brand identities, mobile interfaces, and conversion-focused landing pages for international startups and SaaS clients.'
  }
];

const CERTIFICATIONS = [
  { id: 'hackethor', title: 'HAckeThor Winner', issuer: 'Unstop', date: 'Apr 2025', desc: 'Participated in competitive hackathon demonstrating rapid UX prototyping.' },
  { id: 'udemyux', title: 'UX Design - Complete UI/UX Masterclass', issuer: 'Udemy', date: 'Jan 2025', desc: 'User research, mental models, accessibility, and modern app architecture.' },
  { id: 'udemyfigma', title: 'UI/UX Design with Figma', issuer: 'Udemy', date: 'Jan 2025', desc: 'Advanced auto-layout, component variants, and interactive design pipelines.' },
  { id: 'imagine', title: 'Imagine Hackathon Finalist', issuer: 'Unstop', date: 'Dec 2024', desc: 'Creative digital workflows and collaborative interface development.' },
  { id: 'python', title: 'Python (Basic)', issuer: 'HackerRank', date: 'Jun 2024', desc: 'Core programming logic, data structures, and automation scripting.' },
  { id: 'iosux', title: 'UI and UX for iOS', issuer: 'Infosys Springboard', date: 'Jun 2024', desc: 'Apple Human Interface Guidelines, iOS navigation patterns, and typography.' }
];

const PLUGINS = [
  { name: 'Autoflow', category: 'Diagramming', desc: 'Automate user flows and connector lines between artboards with 1 click.', link: 'https://www.figma.com/community/plugin/733902567457592893', icon: 'alt_route' },
  { name: 'Stark', category: 'Accessibility', desc: 'Contrast checker, color blindness simulator, and WCAG AA audit suite.', link: 'https://www.figma.com/community/plugin/732603254453395948', icon: 'visibility' },
  { name: 'Content Reel', category: 'Content', desc: 'Pull real names, text avatars, and dummy data into components instantly.', link: 'https://www.figma.com/community/plugin/731627003475729986', icon: 'dataset' },
  { name: 'Unsplash', category: 'Media', desc: 'Insert royalty-free high-res photography directly into shapes and layers.', link: 'https://www.figma.com/community/plugin/738454987945972471', icon: 'image' },
  { name: 'Iconify', category: 'Icons', desc: 'Access 100,000+ vector icons directly inside the canvas.', link: 'https://www.figma.com/community/plugin/735098326275342410', icon: 'interests' },
  { name: 'Similayer', category: 'Productivity', desc: 'Select layers with similar fill, stroke, text style, or auto-layout settings.', link: 'https://www.figma.com/community/plugin/736952773253018895', icon: 'filter_none' }
];

const FigmaApp = () => {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'projects' | 'experience' | 'about' | 'resume' | 'process' | 'plugins'
  const [showAssets, setShowAssets] = useState(false);
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [copiedToast, setCopiedToast] = useState(false);

  // Canvas pan & zoom state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const startPanRef = useRef({ x: 0, y: 0 });

  // Floating sticky notes
  const [floatingShapes, setFloatingShapes] = useState(INITIAL_SHAPES);
  const [draggingNoteId, setDraggingNoteId] = useState(null);

  // Projects filter state
  const [projectFilter, setProjectFilter] = useState('All');
  const [projectSearch, setProjectSearch] = useState('');

  // About variant state
  const [aboutVariant, setAboutVariant] = useState('Product Designer');

  const containerRef = useRef(null);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    setColorMenuOpen(false);
  };

  const resetWorkspace = () => {
    setPan({ x: 0, y: 0 });
    setFloatingShapes(INITIAL_SHAPES);
    setCurrentTheme('default');
    setColorMenuOpen(false);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  const addStickyNote = () => {
    if (floatingShapes.length >= 8) return;
    const colors = ['bg-yellow-200 text-black', 'bg-blue-200 text-black', 'bg-pink-200 text-black', 'bg-green-200 text-black'];
    const randomText = CREATIVE_NOTES[Math.floor(Math.random() * CREATIVE_NOTES.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newNote = {
      id: Date.now(),
      text: randomText,
      color: randomColor,
      x: -pan.x + 120 + (floatingShapes.length * 40) % 300,
      y: -pan.y + 40 + (floatingShapes.length * 30) % 200,
      isPinned: false
    };
    setFloatingShapes(prev => [...prev, newNote]);
  };

  const togglePin = (id) => {
    setFloatingShapes(prev => prev.map(s => s.id === id ? { ...s, isPinned: !s.isPinned } : s));
  };

  const updateStickyNote = (id, text) => {
    setFloatingShapes(prev => prev.map(s => s.id === id ? { ...s, text } : s));
  };

  const removeStickyNote = (id) => {
    setFloatingShapes(prev => prev.filter(s => s.id !== id));
  };

  // Canvas Mouse Down for Panning
  const handleCanvasMouseDown = (e) => {
    if (e.target.closest('.artboard-container') || e.target.closest('.sticky-note-element') || e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    setIsPanning(true);
    startPanRef.current = {
      x: e.pageX - pan.x,
      y: e.pageY - pan.y
    };
  };

  const handleCanvasMouseMove = (e) => {
    if (!isPanning) return;
    setPan({
      x: e.pageX - startPanRef.current.x,
      y: e.pageY - startPanRef.current.y
    });
  };

  const handleCanvasMouseUp = () => {
    setIsPanning(false);
  };

  const filteredProjects = ALL_PROJECTS.filter(p => {
    const matchesCat = projectFilter === 'All' || p.category === projectFilter;
    const matchesSearch = projectSearch.trim() === '' || 
      p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.desc.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(projectSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className={`lovable-figma-portfolio theme-${currentTheme}`}>
      {/* =========================================================================
          1. GlobalNav (Top Navbar matching backup/lovable-portfolio)
          ========================================================================= */}
      <nav className="lovable-global-nav">
        <div className="nav-left-section">
          {/* Varun Profile Link */}
          <div className="nav-profile-link" onClick={() => setActiveTab('home')}>
            <div className="nav-avatar-circle">
              <img 
                src="/varun.jpg" 
                alt="Varun Sehgal" 
                className="nav-avatar-img"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="nav-avatar-fallback">VS</span>
            </div>
            <span className="nav-brand-title">Varun Sehgal Portfolio</span>
          </div>

          {/* Color & Theme Dropdown */}
          <div className="theme-menu-container">
            <button 
              className="theme-menu-trigger" 
              onClick={() => setColorMenuOpen(!colorMenuOpen)}
            >
              Color <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>

            {colorMenuOpen && (
              <div className="theme-dropdown-menu">
                <div className="dropdown-label">THEME PRESETS</div>
                <button className={`dropdown-item ${currentTheme === 'default' ? 'active' : ''}`} onClick={() => changeTheme('default')}>
                  <span className="theme-dot default"></span> Default (Dark)
                </button>
                <button className={`dropdown-item ${currentTheme === 'cyberpunk' ? 'active' : ''}`} onClick={() => changeTheme('cyberpunk')}>
                  <span className="theme-dot cyberpunk"></span> Cyberpunk
                </button>
                <button className={`dropdown-item ${currentTheme === 'ocean' ? 'active' : ''}`} onClick={() => changeTheme('ocean')}>
                  <span className="theme-dot ocean"></span> Ocean Breeze
                </button>
                <button className={`dropdown-item ${currentTheme === 'monochrome' ? 'active' : ''}`} onClick={() => changeTheme('monochrome')}>
                  <span className="theme-dot monochrome"></span> Monochrome
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item reset" onClick={resetWorkspace}>
                  <span className="material-symbols-outlined text-[14px]">restart_alt</span> Reset Workspace
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="nav-right-section">
          <a 
            href="mailto:varun.sehgal02@gmail.com" 
            className="nav-email-btn"
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            <span>Email Me</span>
          </a>

          <button 
            className="nav-share-btn" 
            onClick={handleShare}
            title="Share portfolio link"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>

          <a 
            href="https://www.linkedin.com/in/varunsehgal02" 
            target="_blank" 
            rel="noreferrer" 
            className="nav-linkedin-link" 
            title="Varun Sehgal on LinkedIn"
          >
            <div className="nav-linkedin-avatar">
              <img src="/varun.jpg" alt="VS" className="nav-avatar-img" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <span className="nav-avatar-fallback">VS</span>
            </div>
          </a>
        </div>
      </nav>

      {/* Toast Notification */}
      {copiedToast && (
        <div className="lovable-toast-notification">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          Link copied to clipboard!
        </div>
      )}

      {/* =========================================================================
          2. Main Workspace Layout
          ========================================================================= */}
      <div className="lovable-workspace-layout">
        {/* Left Sidebar ("Project Files" & "Assets") */}
        <aside className="lovable-sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-heading">Project Files</h2>
            <p className="sidebar-sub">V3 Final Render</p>
          </div>

          <div className="sidebar-nav-list">
            <div 
              className={`sidebar-nav-item ${showAssets ? 'active' : ''}`}
              onClick={() => setShowAssets(!showAssets)}
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              <span>Assets</span>
            </div>

            <div className="sidebar-section-title">QUICK JUMP</div>
            <a 
              href="https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1" 
              target="_blank" 
              rel="noreferrer" 
              className="sidebar-file-link"
            >
              <span className="material-symbols-outlined text-[14px]">smart_toy</span>
              <span>AI Interview</span>
            </a>
            <a 
              href="https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1" 
              target="_blank" 
              rel="noreferrer" 
              className="sidebar-file-link"
            >
              <span className="material-symbols-outlined text-[14px]">confirmation_number</span>
              <span>Movie Tickets</span>
            </a>
            <a 
              href="https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1" 
              target="_blank" 
              rel="noreferrer" 
              className="sidebar-file-link"
            >
              <span className="material-symbols-outlined text-[14px]">account_balance_wallet</span>
              <span>Expensify</span>
            </a>
            <a 
              href="https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2&t=vfPIBYY278lzphVq-1" 
              target="_blank" 
              rel="noreferrer" 
              className="sidebar-file-link"
            >
              <span className="material-symbols-outlined text-[14px]">diversity_3</span>
              <span>CodeSrijan</span>
            </a>
          </div>

          <div className="sidebar-footer">
            <a 
              href="/Varun_Sehgal_Resume_Updated.pdf" 
              download="Varun_Sehgal_Resume.pdf"
              className="sidebar-download-btn"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download Resume</span>
            </a>
          </div>
        </aside>

        {/* Assets Slide-out Drawer */}
        {showAssets && (
          <div className="lovable-assets-drawer">
            <div className="drawer-header">
              <h3>Design Assets</h3>
              <span className="material-symbols-outlined close-btn" onClick={() => setShowAssets(false)}>close</span>
            </div>

            <div className="drawer-section">
              <span className="drawer-label">CUSTOMIZE THEME</span>
              <div className="drawer-theme-options">
                <button onClick={() => changeTheme('default')} className="drawer-theme-btn">
                  <div className="color-swatch-pair"><span className="swatch dark"></span><span className="swatch gray"></span></div>
                  <span>Default (Dark)</span>
                </button>
                <button onClick={() => changeTheme('cyberpunk')} className="drawer-theme-btn">
                  <div className="color-swatch-pair"><span className="swatch blue"></span><span className="swatch pink"></span></div>
                  <span>Cyberpunk</span>
                </button>
                <button onClick={() => changeTheme('ocean')} className="drawer-theme-btn">
                  <div className="color-swatch-pair"><span className="swatch cyan"></span><span className="swatch green"></span></div>
                  <span>Ocean Breeze</span>
                </button>
                <button onClick={() => changeTheme('monochrome')} className="drawer-theme-btn">
                  <div className="color-swatch-pair"><span className="swatch light"></span><span className="swatch mid"></span></div>
                  <span>Monochrome</span>
                </button>
              </div>
            </div>

            <div className="drawer-section">
              <span className="drawer-label">TYPOGRAPHY</span>
              <p className="drawer-font-sample main">Space Grotesk</p>
              <p className="drawer-font-sample sub">Inter / JetBrains Mono</p>
            </div>
          </div>
        )}

        {/* Center Main Stage */}
        <main 
          ref={containerRef}
          className={`lovable-canvas-stage ${isPanning ? 'panning' : ''}`}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
        >
          {/* Dot Grid Background */}
          <div 
            className="lovable-dot-grid" 
            style={{
              backgroundPosition: `${pan.x}px ${pan.y}px`
            }}
          ></div>

          {/* =========================================================================
              VIEW 1: HOME (Infinite Panning Canvas + Glass Artboard)
              ========================================================================= */}
          {activeTab === 'home' && (
            <div 
              className="lovable-canvas-world"
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`
              }}
            >
              {/* Sticky Notes */}
              <div className="sticky-notes-layer">
                {floatingShapes.map(shape => (
                  <div
                    key={shape.id}
                    className={`lovable-sticky-note ${shape.color} ${shape.isPinned ? 'pinned' : ''}`}
                    style={{ left: shape.x, top: shape.y }}
                  >
                    <div className="sticky-note-top">
                      <span className="note-label">NOTE</span>
                      <span 
                        className={`material-symbols-outlined pin-icon ${shape.isPinned ? 'active' : ''}`}
                        onClick={() => togglePin(shape.id)}
                        title="Toggle pin"
                      >
                        push_pin
                      </span>
                    </div>
                    <textarea
                      value={shape.text}
                      onChange={(e) => updateStickyNote(shape.id, e.target.value)}
                      className="sticky-note-textarea"
                      placeholder="Type here..."
                    />
                    <button 
                      className="sticky-note-close-btn" 
                      onClick={() => removeStickyNote(shape.id)}
                      title="Remove note"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Central Glass Artboard */}
              <div className="artboard-container">
                {/* Artboard Frame Header */}
                <div className="artboard-frame-header">
                  <div className="frame-header-left">
                    <span className="material-symbols-outlined text-[16px] text-[#ffb5a1]">layers</span>
                    <span className="frame-file-title">Varun_Sehgal_Portfolio.fig</span>
                  </div>
                  <div className="frame-view-badge">
                    Artboard view
                  </div>
                </div>

                {/* Ambient Radial Glows */}
                <div className="ambient-glow glow-top"></div>
                <div className="ambient-glow glow-bottom"></div>

                {/* Hero Section */}
                <section className="artboard-hero-grid">
                  <div className="hero-left-column">
                    <div className="hero-badge-row">
                      <div className="hero-author-pill">
                        <div className="author-thumb">
                          <img src="/varun.jpg" alt="Varun" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <span className="author-fallback">VS</span>
                        </div>
                        <span>Varun Sehgal</span>
                      </div>
                      <div className="hero-status-pill">
                        <span className="pulsing-green-dot"></span>
                        <span>Product Designer</span>
                      </div>
                    </div>

                    <h1 className="hero-main-title">
                      I design digital products<br />
                      that make complex things feel <span className="hero-italic-accent">simple.</span>
                    </h1>

                    <p className="hero-tagline">
                      UI/UX · SaaS · AI Products · Design Systems
                    </p>

                    <div className="hero-cta-group">
                      <button className="cta-btn primary" onClick={() => setActiveTab('projects')}>
                        See My Work <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>
                      <button className="cta-btn secondary" onClick={() => setActiveTab('about')}>
                        <span className="material-symbols-outlined text-[18px]">person</span> About Me
                      </button>
                      <button className="cta-btn sticky-add-btn" onClick={addStickyNote}>
                        <span className="material-symbols-outlined text-[18px]">edit_note</span> Add Note
                      </button>
                    </div>
                  </div>

                  {/* Right Column "Now" Panel */}
                  <div className="hero-right-column">
                    <div className="now-card-panel">
                      <div className="now-card-accent-line"></div>
                      <h3 className="now-card-header">
                        <span className="material-symbols-outlined text-[16px]">update</span> Now
                      </h3>
                      <ul className="now-card-list">
                        <li>
                          <span className="material-symbols-outlined icon">design_services</span>
                          <div><strong>Designing</strong> AI-powered SaaS interfaces</div>
                        </li>
                        <li>
                          <span className="material-symbols-outlined icon">token</span>
                          <div><strong>Building</strong> scalable design systems in Figma</div>
                        </li>
                        <li>
                          <span className="material-symbols-outlined icon">work</span>
                          <div><strong>Open</strong> for product design roles & freelance</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Featured Projects Bento Cards */}
                <section className="featured-projects-section">
                  <div className="section-title-header">
                    <h2>Featured Work</h2>
                    <p>Selected design systems and product prototypes.</p>
                  </div>

                  <div className="featured-cards-grid">
                    {ALL_PROJECTS.slice(0, 4).map((proj) => (
                      <div key={proj.id} className="featured-project-card">
                        <div className="project-preview-wrap">
                          <img src={proj.image} alt={proj.name} className="project-preview-img" />
                          <span className="project-badge-pill">{proj.badge}</span>
                        </div>

                        <div className="project-body">
                          <div className="project-meta-row">
                            <span className="project-cat">{proj.category}</span>
                            <span className="project-metric-stat">{proj.metric}</span>
                          </div>

                          <h3 className="project-name">{proj.name}</h3>
                          <p className="project-desc">{proj.desc}</p>

                          <div className="project-tags-row">
                            {proj.tags.map((tag, i) => (
                              <span key={i} className="project-tag-pill">{tag}</span>
                            ))}
                          </div>

                          <div className="project-card-actions">
                            <a 
                              href={proj.link} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="open-in-figma-link"
                            >
                              Open in Figma <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 2: WORK / PROJECTS (Full Bento Grid & Search)
              ========================================================================= */}
          {activeTab === 'projects' && (
            <div className="lovable-static-view">
              <div className="view-content-wrapper">
                <header className="view-page-header">
                  <h1 className="view-page-title">Work & Case Studies</h1>
                  <p className="view-page-desc">Complete showcase of production UX flows, design systems, and mobile applications.</p>
                </header>

                {/* Filter and Search Bar */}
                <div className="projects-filter-bar">
                  <div className="search-input-wrap">
                    <span className="material-symbols-outlined search-icon">search</span>
                    <input 
                      type="text" 
                      placeholder="Search projects by name, tags, domain..." 
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      className="search-field"
                    />
                  </div>

                  <div className="category-filter-pills">
                    {['All', 'Mobile App', 'SaaS / Web', 'Design Systems'].map(cat => (
                      <button 
                        key={cat} 
                        className={`cat-filter-btn ${projectFilter === cat ? 'active' : ''}`}
                        onClick={() => setProjectFilter(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full Bento Grid */}
                <div className="bento-grid-container">
                  {filteredProjects.map(proj => (
                    <div key={proj.id} className="bento-card">
                      <div className="bento-img-wrap">
                        <img src={proj.image} alt={proj.name} className="bento-img" />
                        <span className="bento-badge">{proj.badge}</span>
                      </div>
                      <div className="bento-body">
                        <span className="bento-cat">{proj.category}</span>
                        <h3 className="bento-title">{proj.name}</h3>
                        <p className="bento-desc">{proj.desc}</p>
                        <div className="bento-tags-list">
                          {proj.tags.map((t, idx) => (
                            <span key={idx} className="bento-tag">{t}</span>
                          ))}
                        </div>
                        <a href={proj.link} target="_blank" rel="noreferrer" className="bento-action-btn">
                          Open in Figma <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 3: EXPERIENCE (Career Nodes & Official Certifications)
              ========================================================================= */}
          {activeTab === 'experience' && (
            <div className="lovable-static-view">
              <div className="view-content-wrapper">
                <header className="view-page-header">
                  <h1 className="view-page-title">Experience & Certifications</h1>
                  <p className="view-page-desc">Professional journey, leadership roles, and validated technical credentials.</p>
                </header>

                <div className="experience-columns-grid">
                  {/* Timeline Column */}
                  <div className="timeline-section">
                    <h2 className="sub-section-title">Career Timeline</h2>
                    <div className="timeline-flow">
                      {TIMELINE.map((item, index) => (
                        <div key={index} className="timeline-flow-node">
                          <div className="flow-dot-col">
                            <span className="flow-dot"></span>
                            {index < TIMELINE.length - 1 && <span className="flow-stem"></span>}
                          </div>
                          <div className="flow-content-card">
                            <span className="flow-period">{item.period}</span>
                            <h3 className="flow-role">{item.role}</h3>
                            <h4 className="flow-company">{item.company}</h4>
                            <p className="flow-desc">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications Column */}
                  <div className="certs-section">
                    <h2 className="sub-section-title">Verified Certifications</h2>
                    <div className="certs-flow-grid">
                      {CERTIFICATIONS.map(cert => (
                        <div key={cert.id} className="cert-flow-card">
                          <div className="cert-card-top">
                            <span className="material-symbols-outlined text-[#ffb5a1] text-[20px]">verified</span>
                            <span className="cert-date">{cert.date}</span>
                          </div>
                          <h3 className="cert-title">{cert.title}</h3>
                          <span className="cert-issuer">Issued by {cert.issuer}</span>
                          <p className="cert-desc">{cert.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 4: ABOUT (Master Component Specs)
              ========================================================================= */}
          {activeTab === 'about' && (
            <div className="lovable-static-view">
              <div className="view-content-wrapper">
                <header className="view-page-header">
                  <div className="about-header-flex">
                    <div>
                      <h1 className="view-page-title">Master Component Specs</h1>
                      <p className="view-page-desc">Varun Sehgal — Design, identity, and engineering parameters.</p>
                    </div>

                    <div className="variant-switch-group">
                      <span className="variant-label">Variant:</span>
                      {['Product Designer', 'UI/UX Specialist', 'Design System Lead'].map(v => (
                        <button
                          key={v}
                          className={`variant-btn ${aboutVariant === v ? 'active' : ''}`}
                          onClick={() => setAboutVariant(v)}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </header>

                <div className="about-specs-layout">
                  {/* Master Card */}
                  <div className="about-profile-card">
                    <div className="profile-photo-circle">
                      <img src="/varun.jpg" alt="Varun Sehgal" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      <span className="photo-fallback">VS</span>
                    </div>

                    <div className="profile-card-details">
                      <span className="profile-tag">#Core Master Component</span>
                      <h2 className="profile-name">Varun Sehgal</h2>
                      <span className="profile-role-pill">{aboutVariant}</span>
                      <p className="profile-bio">
                        Undergraduate at Jaypee University Of Engineering And Technology (2023–2027) 
                        bridging visual design craft with scalable frontend systems.
                      </p>
                    </div>
                  </div>

                  {/* 4 Technical Specs */}
                  <div className="specs-quad-grid">
                    <div className="spec-tile">
                      <div className="tile-title-row">
                        <span className="material-symbols-outlined icon">palette</span>
                        <span>Design Tools</span>
                      </div>
                      <div className="tile-tags">
                        {['Figma', 'Figma AI', 'FigJam', 'Adobe XD', 'Photoshop', 'Illustrator'].map((s, i) => (
                          <span key={i} className="tile-pill">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div className="spec-tile">
                      <div className="tile-title-row">
                        <span className="material-symbols-outlined icon">code</span>
                        <span>Frontend Engineering</span>
                      </div>
                      <div className="tile-tags">
                        {['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Git', 'Vite'].map((s, i) => (
                          <span key={i} className="tile-pill">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div className="spec-tile">
                      <div className="tile-title-row">
                        <span className="material-symbols-outlined icon">architecture</span>
                        <span>UI/UX Methods</span>
                      </div>
                      <div className="tile-tags">
                        {['Design Systems', 'Atomic Tokens', 'Wireframing', 'User Testing', 'WCAG AA'].map((s, i) => (
                          <span key={i} className="tile-pill">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div className="spec-tile">
                      <div className="tile-title-row">
                        <span className="material-symbols-outlined icon">verified_user</span>
                        <span>Status & Availability</span>
                      </div>
                      <p className="spec-status-text">
                        🟢 Open for Summer 2025 Product Design Roles, Design Systems Audits, & SaaS Consulting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 5: RESUME (Document Viewer)
              ========================================================================= */}
          {activeTab === 'resume' && (
            <div className="lovable-static-view">
              <div className="view-content-wrapper">
                <header className="view-page-header">
                  <div className="resume-header-flex">
                    <div>
                      <h1 className="view-page-title">Resume & Qualifications</h1>
                      <p className="view-page-desc">Complete overview of professional experience and educational credentials.</p>
                    </div>

                    <a 
                      href="/Varun_Sehgal_Resume_Updated.pdf" 
                      download="Varun_Sehgal_Resume.pdf"
                      className="resume-download-action-btn"
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      Download Resume PDF
                    </a>
                  </div>
                </header>

                <div className="resume-sheet-card">
                  <div className="sheet-top-header">
                    <h2>VARUN SEHGAL</h2>
                    <p className="sheet-subtitle">UI/UX Designer • Product Designer</p>
                    <p className="sheet-contact-line">Bengaluru, IN • varun.sehgal02@gmail.com • +91 9399361193</p>
                  </div>

                  <div className="sheet-section">
                    <h3>EDUCATION</h3>
                    <div className="sheet-entry">
                      <div className="entry-header">
                        <strong>Jaypee University Of Engineering And Technology</strong>
                        <span>2023 — 2027</span>
                      </div>
                      <p className="entry-sub">B.Tech in Computer Science & Engineering</p>
                    </div>
                  </div>

                  <div className="sheet-section">
                    <h3>EXPERIENCE</h3>
                    <div className="sheet-entry">
                      <div className="entry-header">
                        <strong>UniEvent — Lead Product Designer</strong>
                        <span>Oct 2024 — Present</span>
                      </div>
                      <p className="entry-sub">Engineered campus event management UI, cutting transaction drop-off by 30% through a 50+ component design system.</p>
                    </div>

                    <div className="sheet-entry">
                      <div className="entry-header">
                        <strong>Assemble — UI/UX Design Intern</strong>
                        <span>Jul 2024 — Sep 2024</span>
                      </div>
                      <p className="entry-sub">Designed interactive creator tooling and workflows in Figma with seamless handoff to engineering.</p>
                    </div>
                  </div>

                  <div className="sheet-section">
                    <h3>SKILLS & COMPETENCIES</h3>
                    <p className="sheet-skills-text"><strong>Design:</strong> Figma, Figma AI, Adobe XD, Wireframing, Rapid Prototyping, Design Systems, Tokens, WCAG AA</p>
                    <p className="sheet-skills-text"><strong>Development:</strong> React.js, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3, Git</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 6: PROCESS (Product Design Methodology)
              ========================================================================= */}
          {activeTab === 'process' && (
            <div className="lovable-static-view">
              <div className="view-content-wrapper">
                <header className="view-page-header">
                  <h1 className="view-page-title">Process & Methodology</h1>
                  <p className="view-page-desc">How Varun Sehgal transforms ambiguous design requirements into polished, tested digital products.</p>
                </header>

                <div className="process-steps-grid">
                  <div className="process-card">
                    <span className="step-number">01</span>
                    <h3>Discover & Empathize</h3>
                    <span className="step-tag">Research & Strategy</span>
                    <p>Conducting user interviews, stakeholder workshops, competitive audits, and empathy mapping.</p>
                  </div>

                  <div className="process-card">
                    <span className="step-number">02</span>
                    <h3>Define & Architect</h3>
                    <span className="step-tag">Structure & Personas</span>
                    <p>Synthesizing insights into user personas, journey flows, and low-fidelity architectural wireframes.</p>
                  </div>

                  <div className="process-card">
                    <span className="step-number">03</span>
                    <h3>Design System & Tokens</h3>
                    <span className="step-tag">Scalable Foundations</span>
                    <p>Establishing color semantics, typography scales, spacing tokens, and atomic auto-layout components.</p>
                  </div>

                  <div className="process-card">
                    <span className="step-number">04</span>
                    <h3>High-Fidelity Prototyping</h3>
                    <span className="step-tag">Interactive Flows</span>
                    <p>Building responsive artboards with smart-animate micro-interactions for authentic stakeholder validation.</p>
                  </div>

                  <div className="process-card">
                    <span className="step-number">05</span>
                    <h3>Validation & Dev Handoff</h3>
                    <span className="step-tag">Production Alignment</span>
                    <p>Usability testing, design token documentation, and partnering closely with frontend engineers.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 7: PLUGINS (Creative Workflow Tools)
              ========================================================================= */}
          {activeTab === 'plugins' && (
            <div className="lovable-static-view">
              <div className="view-content-wrapper">
                <header className="view-page-header">
                  <h1 className="view-page-title">Figma Plugins & Extensions</h1>
                  <p className="view-page-desc">Installed plugins that supercharge the creative design workflow.</p>
                </header>

                <div className="plugins-grid-container">
                  {PLUGINS.map(plugin => (
                    <a key={plugin.name} href={plugin.link} target="_blank" rel="noreferrer" className="plugin-item-card">
                      <div className="plugin-icon-wrap">
                        <span className="material-symbols-outlined text-[24px] text-[#ffb5a1]">{plugin.icon}</span>
                      </div>
                      <div className="plugin-info">
                        <div className="plugin-top">
                          <h3 className="plugin-name">{plugin.name}</h3>
                          <span className="plugin-cat-badge">{plugin.category}</span>
                        </div>
                        <p className="plugin-desc">{plugin.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          3. WorkspaceNav (Floating Bottom Nav Bar from backup/lovable-portfolio)
          ========================================================================= */}
      <nav className="lovable-workspace-bottom-nav">
        <div className="nav-primary-group">
          <button 
            className={`bottom-nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span>Home</span>
          </button>

          <button 
            className={`bottom-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            <span>Work</span>
          </button>

          <button 
            className={`bottom-nav-item ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <span className="material-symbols-outlined text-[18px]">work</span>
            <span>Experience</span>
          </button>

          <button 
            className={`bottom-nav-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
            <span>About</span>
          </button>

          <button 
            className={`bottom-nav-item ${activeTab === 'resume' ? 'active' : ''}`}
            onClick={() => setActiveTab('resume')}
          >
            <span className="material-symbols-outlined text-[18px]">description</span>
            <span>Resume</span>
          </button>
        </div>

        <div className="nav-divider-stem"></div>

        <div className="nav-secondary-group">
          <button 
            className={`bottom-nav-item secondary ${activeTab === 'process' ? 'active' : ''}`}
            onClick={() => setActiveTab('process')}
          >
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            <span>Process</span>
          </button>

          <button 
            className={`bottom-nav-item secondary ${activeTab === 'plugins' ? 'active' : ''}`}
            onClick={() => setActiveTab('plugins')}
          >
            <span className="material-symbols-outlined text-[16px]">extension</span>
            <span>Plugins</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default FigmaApp;
