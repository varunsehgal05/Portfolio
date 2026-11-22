import React, { useState, useEffect, useMemo } from 'react';
import { 
  Hash, 
  Layers, 
  Briefcase, 
  FolderGit2, 
  FileText, 
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Sparkles,
  Search,
  LayoutGrid,
  List,
  ChevronRight,
  HardDrive,
  Cloud,
  Tag,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import './FinderApp.css';

const FEATURED_PROJECTS = [
  {
    id: 'ai-interview',
    title: 'AI Interview & Prep Platform',
    category: 'Vibecoded • AI SaaS',
    desc: 'Architected AI-driven SaaS platform with dedicated Security & Grading modules automating candidate evaluation.',
    date: 'Nov 2026',
    size: '14.2 MB',
    tags: ['Figma', 'SaaS', 'AI UX', 'Dark Mode'],
    link: 'https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842',
    appId: 'figma'
  },
  {
    id: 'eventflow',
    title: 'EventFlow: Event Ticketing SaaS',
    category: 'Design System • Web SaaS',
    desc: '4-step checkout flow optimization cutting drop-off by 30% with a 50+ component modular design system.',
    date: 'Oct 2026',
    size: '8.7 MB',
    tags: ['Design System', 'Figma', 'Checkout UX'],
    link: 'https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2',
    appId: 'figma'
  },
  {
    id: 'expensify',
    title: 'Expensify: Budget Tracker App',
    category: 'Mobile UX • Fintech',
    desc: '17+ mobile screens refined for rapid expense logging under 5 seconds with real-time financial telemetry.',
    date: 'Sep 2026',
    size: '6.4 MB',
    tags: ['Mobile UX', 'Micro-interactions', 'Fintech'],
    link: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318',
    appId: 'figma'
  },
  {
    id: 'codesrijan',
    title: 'CodeSrijan Hackathon Platform',
    category: 'Vibecoded • Vercel Live',
    desc: 'National hackathon ecosystem vibecoded & engineered by Varun Sehgal for 200+ hackathon participants.',
    date: 'Aug 2026',
    size: '12.1 MB',
    tags: ['Vibecoded', 'Next.js', 'Vercel Live', 'Hackathon'],
    link: 'http://codesrijan-nine.vercel.app/',
    appId: 'vscode'
  }
];

const EXPERIENCE_ITEMS = [
  {
    id: 'unievent',
    title: 'UI-UX Designer',
    company: 'UniEvent (Remote · Punjab, India)',
    date: 'Jul 2026 – Nov 2026',
    desc: 'Designed user-focused digital experiences and translated complex business requirements into clear, consistent interfaces for campus event ticketing platform (EventFlow).',
    tags: ['Figma', 'Canva', 'Design Systems', 'EventFlow']
  },
  {
    id: 'assemble',
    title: 'Assistant Head of CODM Esports Operations',
    company: 'Assemble (Remote · Bharatpur, Rajasthan)',
    date: 'Aug 2025 – Jan 2026',
    desc: 'Assisted in the planning and smooth execution of CODM tournaments and esports events. Designed collaborative creator workspace tools and interaction prototypes in Figma.',
    tags: ['CODM Esports', 'Operations', 'Event Management', 'Figma']
  },
  {
    id: 'knaptix',
    title: 'Operation internship',
    company: 'Knaptix Ventures Private Limited (Remote · Pune, Maharashtra)',
    date: 'Jun 2025 – Aug 2025',
    desc: 'Operations internship and UI/UX design. Delivered brand identities and conversion-focused SaaS landing pages for 10+ tech startups.',
    tags: ['Operations', 'Figma', 'UI UX Designer', 'High-Fidelity Wireframes']
  },
  {
    id: 'freelance',
    title: 'Freelance UI/UX Designer',
    company: 'Self-Employed (Remote)',
    date: 'Jan 2024 – Present',
    desc: 'Executed 10+ end-to-end design projects with 95% client retention for tech startups.',
    tags: ['Client Delivery', 'Figma', 'Branding']
  }
];

const TECH_STACK = [
  { category: 'Design Tools', skills: ['Figma', 'Figma AI', 'Adobe XD', 'Photoshop', 'Illustrator', 'FigJam'], icon: '🎨' },
  { category: 'AI Prototyping', skills: ['Uizard', 'Galileo AI', 'Visily', 'Figma Magician', 'Figma Automator'], icon: '⚡' },
  { category: 'UI/UX Methods', skills: ['Wireframing', 'Rapid Prototyping', 'User Research', 'Design Systems', 'Usability Testing'], icon: '📐' },
  { category: 'Frontend Prototyping', skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3', 'Git'], icon: '💻' }
];

const FinderApp = ({ onOpenApp }) => {
  const [activeTab, setActiveTab] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchFilter, setSearchFilter] = useState('');

  // Staged reveal synchronized with Swarm Rebuild Phase 5
  const FULL_HERO_TITLE = "Designing intuitive web apps & modern interfaces";
  const [rebuildStep, setRebuildStep] = useState(() => {
    if (typeof window !== 'undefined') {
      const isDirect = Boolean(new URLSearchParams(window.location.search).get('app'));
      if (isDirect) return 7;
      return window.__varunos_finder_step !== undefined ? window.__varunos_finder_step : 0;
    }
    return 7;
  });
  const [sidebarStep, setSidebarStep] = useState(() => {
    if (typeof window !== 'undefined') {
      const isDirect = Boolean(new URLSearchParams(window.location.search).get('app'));
      if (isDirect) return 15;
      if ((window.__varunos_finder_step ?? 0) >= 2) return 15;
      return window.__varunos_sidebar_step !== undefined ? window.__varunos_sidebar_step : 0;
    }
    return 15;
  });
  const [typedTitle, setTypedTitle] = useState(() => (window.__varunos_finder_step ?? 0) >= 2 ? FULL_HERO_TITLE : '');
  const [toolbarStep, setToolbarStep] = useState(() => {
    if (typeof window !== 'undefined') {
      const isDirect = Boolean(new URLSearchParams(window.location.search).get('app'));
      if (isDirect) return 4;
      return (window.__varunos_finder_step ?? 0) >= 2 ? 4 : 0;
    }
    return 4;
  });
  const [typedPath, setTypedPath] = useState('');
  const [typedSearch, setTypedSearch] = useState('');
  const [heroBoxVisible, setHeroBoxVisible] = useState(false);
  const [cardBuildState, setCardBuildState] = useState({});

  useEffect(() => {
    const handleToolbar = (e) => {
      const { step, typedPath: tp, typedSearch: ts } = e.detail || {};
      if (typeof step === 'number') setToolbarStep(step);
      if (tp !== undefined) setTypedPath(tp);
      if (ts !== undefined) setTypedSearch(ts);
    };
    const handleHeroBox = (e) => {
      if (typeof e.detail?.visible === 'boolean') {
        setHeroBoxVisible(e.detail.visible);
      }
    };
    window.addEventListener('varunos-toolbar-step', handleToolbar);
    window.addEventListener('varunos-hero-box-visible', handleHeroBox);
    return () => {
      window.removeEventListener('varunos-toolbar-step', handleToolbar);
      window.removeEventListener('varunos-hero-box-visible', handleHeroBox);
    };
  }, []);

  const isToolbarItemVisible = (targetStep) => {
    if (rebuildStep >= 2) return true;
    return toolbarStep >= targetStep;
  };

  useEffect(() => {
    const handleSidebarStep = (e) => {
      if (typeof e.detail?.step === 'number') {
        if (typeof window !== 'undefined') {
          window.__varunos_sidebar_step = e.detail.step;
        }
        setSidebarStep(e.detail.step);
      }
    };
    window.addEventListener('varunos-sidebar-step', handleSidebarStep);
    return () => window.removeEventListener('varunos-sidebar-step', handleSidebarStep);
  }, []);

  useEffect(() => {
    if (rebuildStep >= 2) {
      setSidebarStep(15);
    } else if (rebuildStep === 0) {
      setSidebarStep(0);
    }
  }, [rebuildStep]);

  const isSidebarItemVisible = (targetStep) => {
    if (rebuildStep >= 2) return true;
    return sidebarStep >= targetStep;
  };

  useEffect(() => {
    if (rebuildStep >= 2) {
      setTypedTitle(FULL_HERO_TITLE);
      return;
    }
    const handleProgress = (e) => {
      const p = e.detail?.progress || 0;
      const count = Math.min(FULL_HERO_TITLE.length, Math.floor(p * FULL_HERO_TITLE.length * 1.15));
      setTypedTitle(FULL_HERO_TITLE.slice(0, count));
    };
    window.addEventListener('varunos-hero-type-progress', handleProgress);
    return () => window.removeEventListener('varunos-hero-type-progress', handleProgress);
  }, [rebuildStep]);

  useEffect(() => {
    const handleCardBuilding = (e) => {
      const { index, phase, progress, typedText } = e.detail || {};
      if (phase === 'reset' || index === -1) {
        setCardBuildState({});
        return;
      }
      if (typeof index !== 'number') return;
      const fullTitle = FEATURED_PROJECTS[index]?.title || '';
      const text = phase === 'type'
        ? (typedText !== undefined ? typedText : fullTitle.slice(0, Math.floor((progress || 0) * fullTitle.length * 1.15)))
        : '';
      setCardBuildState(prev => ({
        ...prev,
        [index]: {
          phase,
          typedText: text,
          isBuilding: phase !== 'complete'
        }
      }));
    };
    window.addEventListener('varunos-card-building', handleCardBuilding);
    return () => window.removeEventListener('varunos-card-building', handleCardBuilding);
  }, []);

  useEffect(() => {
    if (rebuildStep === 0) {
      setCardBuildState({});
      setToolbarStep(0);
      setTypedPath('');
      setTypedSearch('');
      setHeroBoxVisible(false);
      setTypedTitle('');
    }
  }, [rebuildStep]);

  useEffect(() => {
    const handleStep = (e) => {
      if (typeof e.detail?.step === 'number') {
        window.__varunos_finder_step = e.detail.step;
        setRebuildStep(e.detail.step);
      }
    };
    window.addEventListener('varunos-swarm-finder-step', handleStep);
    return () => window.removeEventListener('varunos-swarm-finder-step', handleStep);
  }, []);

  const handleNavClick = (tabId) => {
    if (tabId === 'resume' && onOpenApp) {
      onOpenApp('resume');
      return;
    }
    if (tabId === 'vscode' && onOpenApp) {
      onOpenApp('vscode');
      return;
    }
    if (tabId === 'github') {
      window.open('https://github.com/varunsehgal05', '_blank');
      return;
    }
    setActiveTab(tabId);
  };

  const filteredProjects = useMemo(() => {
    if (!searchFilter.trim()) return FEATURED_PROJECTS;
    const q = searchFilter.toLowerCase();
    return FEATURED_PROJECTS.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [searchFilter]);

  return (
    <div className="finder-container">
      {/* 1. Left Sidebar (assembled 1-by-1 by swarm) */}
      <aside 
        className="finder-sidebar"
        style={{
          opacity: (rebuildStep >= 1 || sidebarStep >= 1) ? 1 : 0,
          transform: 'none',
          transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: (rebuildStep >= 1 || sidebarStep >= 1) ? 'auto' : 'none'
        }}
      >
        <div className="finder-sidebar-content">
          {/* Section: Favorites */}
          <div className="finder-sidebar-section">
            <div className={`finder-section-title ${isSidebarItemVisible(2) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}>Favorites</div>
            <button 
              className={`finder-nav-item ${activeTab === 'featured' ? 'active' : ''} ${isSidebarItemVisible(3) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}
              onClick={() => handleNavClick('featured')}
            >
              <span className="finder-nav-icon"><Hash size={13} color="#38bdf8" /></span>
              <span>Featured Works</span>
            </button>
            <button 
              className={`finder-nav-item ${activeTab === 'tech' ? 'active' : ''} ${isSidebarItemVisible(4) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}
              onClick={() => handleNavClick('tech')}
            >
              <span className="finder-nav-icon"><Code2 size={13} color="#a78bfa" /></span>
              <span>Tech Stack</span>
            </button>
            <button 
              className={`finder-nav-item ${activeTab === 'experience' ? 'active' : ''} ${isSidebarItemVisible(5) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}
              onClick={() => handleNavClick('experience')}
            >
              <span className="finder-nav-icon"><Briefcase size={13} color="#facc15" /></span>
              <span>Experience</span>
            </button>
          </div>

          {/* Section: Locations */}
          <div className="finder-sidebar-section">
            <div className={`finder-section-title ${isSidebarItemVisible(6) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}>Locations</div>
            <button 
              className={`finder-nav-item ${activeTab === 'vscode' ? 'active' : ''} ${isSidebarItemVisible(7) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}
              onClick={() => handleNavClick('vscode')}
            >
              <span className="finder-nav-icon"><Cpu size={13} color="#38bdf8" /></span>
              <span>VS Code Projects</span>
            </button>
            <button 
              className={`finder-nav-item ${activeTab === 'github' ? 'active' : ''} ${isSidebarItemVisible(8) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}
              onClick={() => handleNavClick('github')}
            >
              <span className="finder-nav-icon"><FolderGit2 size={13} color="#4ade80" /></span>
              <span>GitHub Repos</span>
            </button>
            <button 
              className={`finder-nav-item ${activeTab === 'resume' ? 'active' : ''} ${isSidebarItemVisible(9) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}
              onClick={() => handleNavClick('resume')}
            >
              <span className="finder-nav-icon"><FileText size={13} color="#f97316" /></span>
              <span>Resume PDF</span>
            </button>
          </div>

          {/* Section: Tags */}
          <div className="finder-sidebar-section">
            <div className={`finder-section-title ${isSidebarItemVisible(10) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}>Tags</div>
            <div className={`finder-tag-row ${isSidebarItemVisible(11) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}><span className="tag-dot red"></span><span>Work</span></div>
            <div className={`finder-tag-row ${isSidebarItemVisible(12) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}><span className="tag-dot orange"></span><span>Design</span></div>
            <div className={`finder-tag-row ${isSidebarItemVisible(13) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}><span className="tag-dot purple"></span><span>AI & LLM</span></div>
            <div className={`finder-tag-row ${isSidebarItemVisible(14) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}><span className="tag-dot blue"></span><span>Personal</span></div>
          </div>
        </div>

        {/* User Profile Card at bottom */}
        <div className={`finder-profile-card ${isSidebarItemVisible(15) ? 'finder-sidebar-item-stamped' : 'finder-sidebar-item-hidden'}`}>
          <div className="finder-avatar-circle">
            <img src="/varun.jpg" alt="Varun Sehgal profile portrait" className="finder-avatar-img" width="34" height="34" />
          </div>
          <div className="finder-profile-info">
            <span className="finder-profile-name">Varun Sehgal</span>
            <span className="finder-profile-role">UI/UX & Product Designer</span>
          </div>
        </div>
      </aside>

      {/* 2. Main Content & Toolbar */}
      <main className="finder-main">
        {/* Finder Toolbar (assembled and typed by Swarm) */}
        <div className="finder-toolbar">
          <div className={`finder-toolbar-history ${isToolbarItemVisible(1) ? 'finder-toolbar-item-stamped' : 'finder-toolbar-item-hidden'}`}>
            <button className="finder-tb-btn" aria-label="Previous history folder" disabled><ArrowLeft size={13} /></button>
            <button className="finder-tb-btn" aria-label="Next history folder" disabled><ArrowRight size={13} /></button>
          </div>

          {/* Breadcrumbs (Typed by Varun Sehgal) */}
          <div className={`finder-path-pill ${isToolbarItemVisible(2) ? 'finder-toolbar-item-stamped' : 'finder-toolbar-item-hidden'}`}>
            <HardDrive size={12} className="finder-hd-icon" />
            {rebuildStep >= 2 ? (
              <>
                <span>Macintosh HD</span>
                <ChevronRight size={10} className="path-arrow" />
                <span>Users</span>
                <ChevronRight size={10} className="path-arrow" />
                <span>varun</span>
                <ChevronRight size={10} className="path-arrow" />
                <span className="current-path">{activeTab === 'featured' ? 'Featured Works' : activeTab === 'tech' ? 'Tech Stack' : 'Experience'}</span>
              </>
            ) : (
              <span>
                {typedPath || 'Macintosh HD'}
                <span className="typing-cursor" style={{ opacity: 0.85, color: '#38bdf8', marginLeft: '2px' }}>|</span>
              </span>
            )}
          </div>

          {/* View Mode Toggle Buttons (Stamped by Sarah Lin) */}
          <div className={`finder-view-modes ${isToolbarItemVisible(3) ? 'finder-toolbar-item-stamped' : 'finder-toolbar-item-hidden'}`}>
            <button 
              className={`finder-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              aria-label="Icons grid view"
              onClick={() => setViewMode('grid')}
              title="Icons Grid View"
            >
              <LayoutGrid size={13} />
            </button>
            <button 
              className={`finder-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              aria-label="Columns list view"
              onClick={() => setViewMode('list')}
              title="Columns List View"
            >
              <List size={13} />
            </button>
          </div>

          {/* Live Search Filter (Typed by Varun Sehgal) */}
          <div className={`finder-search-box ${isToolbarItemVisible(4) ? 'finder-toolbar-item-stamped' : 'finder-toolbar-item-hidden'}`} style={{ position: 'relative' }}>
            <Search size={12} className="finder-search-icon" />
            <input
              type="text"
              aria-label="Search in Finder"
              placeholder={rebuildStep >= 2 ? "Search in Finder..." : (typedSearch || "Search in Finder...")}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="finder-search-input"
            />
            {rebuildStep < 2 && isToolbarItemVisible(4) && !searchFilter && (
              <span className="typing-cursor" style={{ opacity: 0.8, color: '#38bdf8', position: 'absolute', right: '10px', top: '7px' }}>|</span>
            )}
          </div>
        </div>

        {/* Hero Card (Framed by Sarah Lin, Typed by Varun Sehgal) */}
        <div 
          className="finder-hero-card"
          style={{
            opacity: (rebuildStep >= 2 || heroBoxVisible) ? 1 : 0,
            transform: 'none',
            transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: rebuildStep >= 2 ? 'auto' : 'none'
          }}
        >
          <div className="finder-status-badge">
            <span className="status-dot"></span>
            <span>Available for New Product Roles & Projects</span>
          </div>
          <h1 className="finder-hero-title">
            {rebuildStep >= 2 ? (
              FULL_HERO_TITLE
            ) : (
              <>
                {typedTitle || '\u00A0'}
                {heroBoxVisible && <span className="typing-cursor" style={{ opacity: 0.85, color: '#A259FF', marginLeft: '2px' }}>|</span>}
              </>
            )}
          </h1>
          <p className="finder-hero-desc">
            UI/UX & Product Designer with 3+ years delivering high-impact SaaS and AI product experiences. Skilled in user research, wireframing, rapid prototyping, and design systems.
          </p>
        </div>

        {/* Content Section: Featured Works */}
        {activeTab === 'featured' && (
          <div className="finder-body-wrap">
            <div 
              className="finder-section-header"
              style={{
                opacity: rebuildStep >= 3 || Object.keys(cardBuildState).length > 0 ? 1 : 0,
                transition: 'opacity 0.35s ease'
              }}
            >
              <span className="finder-content-heading">Selected Highlights</span>
              <span className="finder-item-count">{filteredProjects.length} items</span>
            </div>

            {viewMode === 'grid' ? (
              <div className="finder-cards-grid">
                {filteredProjects.map((proj, pIdx) => {
                  const isCardCompleted = (rebuildStep >= 3 + pIdx && rebuildStep > 2) || cardBuildState[pIdx]?.phase === 'complete' || rebuildStep >= 7;
                  const isCardBuilding = Boolean(cardBuildState[pIdx]?.isBuilding) && !isCardCompleted;
                  const isCardVisible = isCardCompleted || isCardBuilding;
                  const cardPhase = cardBuildState[pIdx]?.phase;
                  const currentTypedTitle = isCardCompleted 
                    ? proj.title 
                    : (cardBuildState[pIdx]?.typedText ?? '');
                  const isTyping = isCardBuilding && cardPhase === 'type';

                  return (
                    <div 
                      key={proj.id} 
                      className={`finder-project-card ${isCardBuilding ? 'is-card-building' : ''} ${isCardCompleted ? 'is-card-completed' : ''}`}
                      style={{
                        opacity: isCardVisible ? 1 : 0,
                        transform: 'none',
                        transition: isCardBuilding ? 'none' : 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        pointerEvents: isCardCompleted ? 'auto' : 'none',
                        boxShadow: isCardBuilding ? '0 0 0 1.5px rgba(56, 189, 248, 0.35), 0 8px 24px rgba(0, 0, 0, 0.4)' : undefined
                      }}
                    >
                      <div>
                        <div className="finder-card-top">
                          <span className="finder-card-title">
                            {isCardCompleted ? proj.title : (currentTypedTitle || (isCardBuilding ? <span className="typing-cursor" style={{ opacity: 0.8, color: '#38bdf8' }}>|</span> : ''))}
                            {isTyping && currentTypedTitle && <span className="typing-cursor" style={{ opacity: 0.85, color: '#38bdf8', marginLeft: '2px' }}>|</span>}
                          </span>
                          <a href={proj.link} target="_blank" rel="noreferrer" title="Open Showcase" style={{ opacity: isCardCompleted ? 1 : 0, pointerEvents: isCardCompleted ? 'auto' : 'none' }}>
                            <ExternalLink size={13} className="finder-card-icon" />
                          </a>
                        </div>
                        <span className="finder-card-cat" style={{ opacity: isCardCompleted ? 1 : 0, transition: 'opacity 0.28s ease' }}>
                          {proj.category}
                        </span>
                        <p className="finder-card-desc" style={{ opacity: isCardCompleted ? 1 : 0, transition: 'opacity 0.28s ease' }}>
                          {proj.desc}
                        </p>
                      </div>
                      <div className="finder-card-tags" style={{ opacity: isCardCompleted ? 1 : 0, transition: 'opacity 0.28s ease' }}>
                        {proj.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="finder-card-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="finder-list-table">
                <div className="finder-table-head">
                  <span className="col-name">Name</span>
                  <span className="col-cat">Category</span>
                  <span className="col-date">Date Modified</span>
                  <span className="col-size">Size</span>
                  <span className="col-action">Action</span>
                </div>
                <div className="finder-table-body">
                  {filteredProjects.map((proj) => (
                    <div key={proj.id} className="finder-table-row">
                      <span className="col-name font-semibold text-white">📁 {proj.title}</span>
                      <span className="col-cat text-sky-400">{proj.category}</span>
                      <span className="col-date text-zinc-400">{proj.date}</span>
                      <span className="col-size text-zinc-400">{proj.size}</span>
                      <span className="col-action">
                        <a href={proj.link} target="_blank" rel="noreferrer" className="btn-table-open">
                          Open <ExternalLink size={10} />
                        </a>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Section: Experience */}
        {activeTab === 'experience' && (
          <div className="finder-body-wrap">
            <div className="finder-section-header">
              <span className="finder-content-heading">Professional Experience</span>
              <span className="finder-item-count">{EXPERIENCE_ITEMS.length} positions</span>
            </div>
            <div className="finder-cards-grid" style={{ gridTemplateColumns: '1fr' }}>
              {EXPERIENCE_ITEMS.map((exp) => (
                <div key={exp.id} className="finder-project-card" style={{ cursor: 'default' }}>
                  <div className="finder-card-top">
                    <span className="finder-card-title">{exp.title} • {exp.company}</span>
                    <span style={{ fontSize: '11px', color: '#a1a1aa' }}>{exp.date}</span>
                  </div>
                  <p className="finder-card-desc">{exp.desc}</p>
                  <div className="finder-card-tags">
                    {exp.tags.map((t, tIdx) => (
                      <span key={tIdx} className="finder-card-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Section: Tech Stack */}
        {activeTab === 'tech' && (
          <div className="finder-body-wrap">
            <div className="finder-section-header">
              <span className="finder-content-heading">Skills & Tooling</span>
              <span className="finder-item-count">{TECH_STACK.length} categories</span>
            </div>
            <div className="finder-cards-grid">
              {TECH_STACK.map((cat, idx) => (
                <div key={idx} className="finder-project-card" style={{ cursor: 'default' }}>
                  <div className="finder-card-top">
                    <span className="finder-card-title">{cat.icon} {cat.category}</span>
                  </div>
                  <div className="finder-card-tags" style={{ marginTop: '12px' }}>
                    {cat.skills.map((s, sIdx) => (
                      <span key={sIdx} className="finder-card-tag">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div className="finder-status-bar">
          <span>{filteredProjects.length} items</span>
          <span className="status-sep">•</span>
          <span>512 GB available on Macintosh HD</span>
        </div>
      </main>
    </div>
  );
};

export default FinderApp;