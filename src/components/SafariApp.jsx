import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Share2, 
  Lock, 
  ExternalLink, 
  Star, 
  GitFork, 
  FolderGit2, 
  Code2, 
  Plus, 
  X, 
  Search, 
  Globe, 
  Check, 
  BookOpen, 
  Sparkles,
  Layers,
  Compass
} from 'lucide-react';
import FigmaLoadingScreen from './FigmaLoadingScreen';
import SwarmSiteView from './SwarmSiteView';
import './SafariApp.css';

const BOOKMARKS = [
  { id: 'swarm', label: '⚡ Swarm Site', url: 'https://califa.github.io/swarm-site' },
  { id: 'figma', label: '🎨 Figma Web', url: 'https://figma.com/@varunsehgal' },
  { id: 'portfolio', label: '🌐 Portfolio Live', url: 'https://varunsehgal.runs-on.dev' },
  { id: 'github', label: '🐙 GitHub', url: 'https://github.com/varunsehgal05' },
  { id: 'linkedin', label: '💼 LinkedIn', url: 'https://linkedin.com/in/varunsehgal02' },
  { id: 'behance', label: '🎨 Behance', url: 'https://behance.net/varunsehgal3' },
  { id: 'google', label: '🔍 Google', url: 'https://www.google.com' }
];

const PINNED_REPOS = [
  {
    name: 'Portfolio',
    desc: 'Interactive macOS Sequoia portfolio with autonomous multiplayer cursor swarm engine & collaborative Figma canvas.',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    stars: 28,
    forks: 6,
    url: 'https://github.com/varunsehgal05/Portfolio'
  },
  {
    name: 'AI-Interview-Prep',
    desc: 'End-to-end AI candidate evaluation & grading platform with automated analytics and dark mode design system.',
    lang: 'TypeScript',
    langColor: '#3178c6',
    stars: 42,
    forks: 11,
    url: 'https://github.com/varunsehgal05'
  },
  {
    name: 'EventFlow-Ticketing',
    desc: '4-step checkout optimization platform with 50+ component modular design tokens.',
    lang: 'React.js',
    langColor: '#61dafb',
    stars: 34,
    forks: 8,
    url: 'https://github.com/varunsehgal05'
  },
  {
    name: 'Expensify-Tracker',
    desc: 'Rapid expense logging application refined for <5 second transactions and real-time financial telemetry.',
    lang: 'React Native',
    langColor: '#0ACF83',
    stars: 29,
    forks: 5,
    url: 'https://github.com/varunsehgal05'
  }
];

const BEHANCE_PROJECTS = [
  {
    title: 'AI Interview Prep & Autonomous Evaluator',
    category: 'Product Design • SaaS',
    views: '2.4k',
    likes: 380,
    coverBg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    url: 'https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842'
  },
  {
    title: 'EventFlow: Frictionless Event Ticketing',
    category: 'Design System • Checkout UX',
    views: '1.9k',
    likes: 295,
    coverBg: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)',
    url: 'https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2'
  },
  {
    title: 'Expensify: Under-5s Mobile Finance Tracker',
    category: 'Mobile UX • Micro-interactions',
    views: '1.5k',
    likes: 240,
    coverBg: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
    url: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318'
  }
];

const INITIAL_TABS = [
  { id: 'tab-swarm', title: 'Swarm — 48 Agents Orchestration', url: 'https://califa.github.io/swarm-site', type: 'swarm' },
  { id: 'tab-figma', title: 'Figma — Varun Sehgal Portfolio', url: 'https://figma.com/@varunsehgal', type: 'figma' },
  { id: 'tab-1', title: 'Varun Sehgal (varunsehgal05) · GitHub', url: 'https://github.com/varunsehgal05', type: 'github' }
];

const SafariApp = () => {
  const [tabs, setTabs] = useState(INITIAL_TABS);
  const [activeTabId, setActiveTabId] = useState('tab-swarm');
  const [urlInput, setUrlInput] = useState('https://califa.github.io/swarm-site');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [showFigmaLoading, setShowFigmaLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Varun Sehgal UI UX designer');

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const triggerPageLoad = () => {
    setPageLoading(true);
    setTimeout(() => setPageLoading(false), 650);
  };

  const handleSelectTab = (tab) => {
    setActiveTabId(tab.id);
    setUrlInput(tab.url);
    triggerPageLoad();
    if (tab.type === 'figma' || tab.url.includes('figma.com')) {
      setShowFigmaLoading(true);
    }
  };

  const handleAddTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab = {
      id: newId,
      title: 'Google Search',
      url: 'https://www.google.com',
      type: 'google'
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newId);
    setUrlInput(newTab.url);
    triggerPageLoad();
  };

  const handleCloseTab = (e, tabId) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const remaining = tabs.filter(t => t.id !== tabId);
    setTabs(remaining);
    if (activeTabId === tabId) {
      setActiveTabId(remaining[0].id);
      setUrlInput(remaining[0].url);
      triggerPageLoad();
    }
  };

  const navigateTo = (newUrl) => {
    let target = newUrl.trim();
    if (!target) return;

    triggerPageLoad();

    let targetType = 'web';
    let targetTitle = target;

    if (target.includes('swarm-site') || target.includes('califa.github.io')) {
      targetType = 'swarm';
      targetTitle = 'Swarm — 48 Agents Orchestration';
    } else if (target.includes('figma.com')) {
      targetType = 'figma';
      targetTitle = 'Figma — Varun Sehgal Portfolio';
      setShowFigmaLoading(true);
    } else if (target.includes('github.com')) {
      targetType = 'github';
      targetTitle = 'Varun Sehgal · GitHub';
    } else if (target.includes('runs-on.dev') || target.includes('portfolio')) {
      targetType = 'portfolio';
      targetTitle = 'Varun Sehgal — Live Portfolio';
    } else if (target.includes('behance.net')) {
      targetType = 'behance';
      targetTitle = 'Varun Sehgal on Behance';
    } else if (target.includes('google.com') || !target.includes('.')) {
      targetType = 'google';
      targetTitle = target.includes('.') ? 'Google Search' : `${target} - Google Search`;
      if (!target.includes('.')) {
        setSearchQuery(target);
        target = `https://www.google.com/search?q=${encodeURIComponent(target)}`;
      }
    } else if (target.includes('wikipedia.org')) {
      targetType = 'wikipedia';
      targetTitle = 'User experience design - Wikipedia';
    } else if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = `https://${target}`;
    }

    setUrlInput(target);
    setTabs(prev => prev.map(t => t.id === activeTabId ? {
      ...t,
      url: target,
      title: targetTitle,
      type: targetType
    } : t));
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    navigateTo(urlInput);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 450);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(activeTab.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="safari-root-window">
      {/* 1. Safari Tab Bar */}
      <div className="safari-tab-bar">
        <div className="safari-tabs-scroll">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                className={`safari-tab-item ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectTab(tab)}
              >
                <Globe size={12} className="safari-tab-favicon" />
                <span className="safari-tab-title">{tab.title}</span>
                {tabs.length > 1 && (
                  <button 
                    className="safari-tab-close" 
                    onClick={(e) => handleCloseTab(e, tab.id)}
                    title="Close Tab"
                  >
                    <X size={11} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button className="safari-add-tab-btn" onClick={handleAddTab} title="New Tab">
          <Plus size={14} />
        </button>
      </div>

      {/* 2. Safari Unified Navigation Bar */}
      <div className="safari-nav-bar">
        {pageLoading && <div className="safari-top-progress-bar" />}
        <div className="safari-history-buttons">
          <button className="safari-icon-btn" onClick={() => navigateTo('https://github.com/varunsehgal05')} title="Back">
            <ArrowLeft size={14} />
          </button>
          <button className="safari-icon-btn" onClick={() => navigateTo('https://varunsehgal.runs-on.dev')} title="Forward">
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Unified Search / URL Bar */}
        <form className="safari-address-box" onSubmit={handleUrlSubmit}>
          <Lock size={12} className="safari-lock-icon" />
          <input
            type="text"
            className="safari-address-input"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Search or enter website name..."
            spellCheck={false}
          />
          <button 
            type="button" 
            className={`safari-reload-btn ${isRefreshing ? 'spinning' : ''}`}
            onClick={handleRefresh}
            title="Reload this page"
          >
            <RotateCw size={12} />
          </button>
        </form>

        <div className="safari-right-actions">
          <button className="safari-icon-btn" onClick={handleShare} title={copiedLink ? "Link copied!" : "Share page"}>
            {copiedLink ? <Check size={14} color="#34d399" /> : <Share2 size={14} />}
          </button>
          <a 
            href={activeTab.url} 
            target="_blank" 
            rel="noreferrer" 
            className="safari-icon-btn"
            title="Open in real browser tab"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* 3. Safari Bookmarks Bar */}
      <div className="safari-bookmarks-bar">
        {BOOKMARKS.map((bm) => (
          <button 
            key={bm.id} 
            type="button" 
            className="safari-bookmark-item"
            onClick={() => navigateTo(bm.url)}
          >
            {bm.label}
          </button>
        ))}
      </div>

      {/* 4. Safari Main Viewport Area */}
      <div className="safari-viewport">
        {/* VIEW: CALIFA SWARM SITE (48 Agents Flocking Simulation) */}
        {activeTab.type === 'swarm' && (
          <SwarmSiteView />
        )}

        {/* VIEW: FIGMA WEB WORKSPACE WITH AUTHENTIC LOADING SCREEN */}
        {activeTab.type === 'figma' && (
          showFigmaLoading ? (
            <FigmaLoadingScreen
              fileName="Figma_Web_Varun_Portfolio.fig"
              duration={1300}
              onLoaded={() => setShowFigmaLoading(false)}
            />
          ) : (
            <div className="safari-figma-web-view">
              <div className="safari-figma-header">
                <div className="safari-figma-title-group">
                  <div className="safari-figma-logo-badge">
                    <svg width="18" height="27" viewBox="0 0 38 57" fill="none">
                      <path d="M19 0H9.5C4.25 0 0 4.25 0 9.5S4.25 19 9.5 19H19V0Z" fill="#F24E1E"/>
                      <path d="M19 0H28.5C33.75 0 38 4.25 38 9.5S33.75 19 28.5 19H19V0Z" fill="#FF7262"/>
                      <path d="M0 28.5C0 23.25 4.25 19 9.5 19H19V38H9.5C4.25 38 0 33.75 0 28.5Z" fill="#A259FF"/>
                      <circle cx="28.5" cy="28.5" r="9.5" fill="#1ABCFE"/>
                      <path d="M0 47.5C0 42.25 4.25 38 9.5 38H19V47.5C19 52.75 14.75 57 9.5 57S0 52.75 0 47.5Z" fill="#0ACF83"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="safari-figma-title">Varun Sehgal — Figma Web Workspace</h2>
                    <p className="safari-figma-desc">Interactive cloud artboards, case study frames & components</p>
                  </div>
                </div>
                <a href="https://figma.com/@varunsehgal" target="_blank" rel="noreferrer" className="btn-launch-external">
                  <span>Open in Figma App ↗</span>
                </a>
              </div>

              <div className="safari-figma-artboards-grid">
                <div className="safari-figma-artboard-card">
                  <div className="safari-figma-artboard-preview">
                    <img
                      src="/figma_CodeSrijan.png"
                      alt="CodeSrijan Hackathon Portal"
                      onError={(e) => { e.currentTarget.src = '/figma_LandingPage.png'; }}
                    />
                  </div>
                  <div className="safari-figma-artboard-info">
                    <h3 className="safari-figma-artboard-title">CodeSrijan Hackathon Portal</h3>
                    <p className="safari-figma-artboard-meta">800+ Attendees • National Hackathon</p>
                    <a href="https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2" target="_blank" rel="noreferrer" className="safari-figma-open-pill">
                      Open Frame ↗
                    </a>
                  </div>
                </div>

                <div className="safari-figma-artboard-card">
                  <div className="safari-figma-artboard-preview">
                    <img
                      src="/figma_EventFlow.png"
                      alt="EventFlow Experience Platform"
                      onError={(e) => { e.currentTarget.src = '/figma_LandingPage.png'; }}
                    />
                  </div>
                  <div className="safari-figma-artboard-info">
                    <h3 className="safari-figma-artboard-title">EventFlow Experience Platform</h3>
                    <p className="safari-figma-artboard-meta">30% Less Dropoff • Ticketing Flow</p>
                    <a href="https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2" target="_blank" rel="noreferrer" className="safari-figma-open-pill">
                      Open Frame ↗
                    </a>
                  </div>
                </div>

                <div className="safari-figma-artboard-card">
                  <div className="safari-figma-artboard-preview">
                    <img
                      src="/figma_LandingPage.png"
                      alt="Conversion Landing Page"
                      onError={(e) => { e.currentTarget.src = '/figma_SaasDashboard.png'; }}
                    />
                  </div>
                  <div className="safari-figma-artboard-info">
                    <h3 className="safari-figma-artboard-title">Conversion SaaS Landing Page</h3>
                    <p className="safari-figma-artboard-meta">High Conversion Velocity • Brand Typography</p>
                    <a href="https://www.figma.com/design/WfUzGPYsE7UFYS9YaQp5v6/home-page?node-id=0-1" target="_blank" rel="noreferrer" className="safari-figma-open-pill">
                      Open Frame ↗
                    </a>
                  </div>
                </div>

                <div className="safari-figma-artboard-card">
                  <div className="safari-figma-artboard-preview">
                    <img
                      src="/figma_SaasDashboard.png"
                      alt="Enterprise SaaS Dashboard"
                      onError={(e) => { e.currentTarget.src = '/figma_LandingPage.png'; }}
                    />
                  </div>
                  <div className="safari-figma-artboard-info">
                    <h3 className="safari-figma-artboard-title">Enterprise SaaS Dashboard</h3>
                    <p className="safari-figma-artboard-meta">Enterprise UI • Telemetry</p>
                    <a href="https://www.figma.com/design/PbO4QNnkgAyrPtkuyduZFE/sas?node-id=0-1" target="_blank" rel="noreferrer" className="safari-figma-open-pill">
                      Open Frame ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {/* VIEW: GITHUB PROFILE */}
        {activeTab.type === 'github' && (
          <div className="safari-github-view">
            <div className="github-profile-header">
              <div className="github-avatar-circle">
                <img src="/varun.jpg" alt="Varun Sehgal" className="github-avatar-img" />
              </div>
              <div className="github-profile-details">
                <h1 className="github-name">Varun Sehgal</h1>
                <p className="github-handle">varunsehgal05 • Full-Stack UI/UX Designer</p>
                <p className="github-bio">
                  UI/UX & Product Designer building autonomous AI tools, high-converting SaaS interfaces, and macOS web experiences.
                </p>
                <div className="github-stats-row">
                  <span>👥 <strong>128</strong> followers</span>
                  <span>⭐ <strong>140+</strong> repository stars</span>
                  <span>📍 Gwalior, India</span>
                </div>
              </div>
              <div className="github-header-actions">
                <a 
                  href="https://github.com/varunsehgal05" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="github-btn-follow"
                >
                  Follow on GitHub
                </a>
              </div>
            </div>

            <div className="github-content-tabs">
              <span className="github-tab active">Overview</span>
              <span className="github-tab">Repositories (14)</span>
              <span className="github-tab">Projects</span>
              <span className="github-tab">Packages</span>
            </div>

            <div className="github-repos-grid">
              {PINNED_REPOS.map((repo, idx) => (
                <div key={idx} className="github-repo-card">
                  <div className="repo-card-top">
                    <div className="repo-title-wrap">
                      <FolderGit2 size={14} className="repo-icon" />
                      <a href={repo.url} target="_blank" rel="noreferrer" className="repo-name">
                        {repo.name}
                      </a>
                    </div>
                    <span className="repo-public-badge">Public</span>
                  </div>
                  <p className="repo-desc">{repo.desc}</p>
                  <div className="repo-meta">
                    <span className="repo-lang">
                      <span className="lang-color-dot" style={{ backgroundColor: repo.langColor }}></span>
                      {repo.lang}
                    </span>
                    <span className="repo-stat"><Star size={12} /> {repo.stars}</span>
                    <span className="repo-stat"><GitFork size={12} /> {repo.forks}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: LIVE PORTFOLIO */}
        {activeTab.type === 'portfolio' && (
          <div className="safari-portfolio-view">
            <div className="portfolio-hero-banner">
              <span className="portfolio-tagline">✨ Official Live Portfolio Site</span>
              <h1 className="portfolio-headline">Varun Sehgal — Lead Product Designer</h1>
              <p className="portfolio-subtext">
                Crafting delightful digital products, design systems, and autonomous vibecoded workflows.
              </p>
              <div className="portfolio-cta-group">
                <a href="https://varunsehgal.runs-on.dev" target="_blank" rel="noreferrer" className="btn-external-hero">
                  <ExternalLink size={14} />
                  <span>Launch varunsehgal.runs-on.dev</span>
                </a>
                <button className="btn-secondary-hero" onClick={() => navigateTo('https://github.com/varunsehgal05')}>
                  View Source Code
                </button>
              </div>
            </div>

            <div className="portfolio-feature-grid">
              <div className="feature-block">
                <h3>⚡ Autonomous Swarm Engine</h3>
                <p>Collaborative multi-agent cursor swarm with real-time state synchronization.</p>
              </div>
              <div className="feature-block">
                <h3>🎨 Authentic Figma Integration</h3>
                <p>Complete project showcase featuring wireframes, design tokens, and live interactive prototype frames.</p>
              </div>
              <div className="feature-block">
                <h3>🖥️ macOS Sequoia OS</h3>
                <p>Authentic desktop interface with responsive genie animations, dock magnification, and native apps.</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: BEHANCE SHOWCASE */}
        {activeTab.type === 'behance' && (
          <div className="safari-behance-view">
            <div className="behance-header">
              <h2>Behance Showcase — Varun Sehgal</h2>
              <p>Curated UI/UX case studies and visual identity systems</p>
            </div>
            <div className="behance-grid">
              {BEHANCE_PROJECTS.map((proj, idx) => (
                <a key={idx} href={proj.url} target="_blank" rel="noreferrer" className="behance-card">
                  <div className="behance-cover" style={{ background: proj.coverBg }}>
                    <span className="behance-watermark">UI/UX</span>
                  </div>
                  <div className="behance-info">
                    <h3 className="behance-title">{proj.title}</h3>
                    <p className="behance-cat">{proj.category}</p>
                    <div className="behance-stats">
                      <span>👁️ {proj.views}</span>
                      <span>👍 {proj.likes}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: GOOGLE SEARCH */}
        {activeTab.type === 'google' && (
          <div className="safari-google-view">
            <div className="google-logo">
              <span style={{ color: '#4285F4' }}>G</span>
              <span style={{ color: '#EA4335' }}>o</span>
              <span style={{ color: '#FBBC05' }}>o</span>
              <span style={{ color: '#4285F4' }}>g</span>
              <span style={{ color: '#34A853' }}>l</span>
              <span style={{ color: '#EA4335' }}>e</span>
            </div>

            <form 
              className="google-search-bar"
              onSubmit={(e) => {
                e.preventDefault();
                navigateTo(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);
              }}
            >
              <Search size={16} className="google-search-icon" />
              <input
                type="text"
                className="google-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Google or type a URL"
              />
            </form>

            <div className="google-results-container">
              <div className="google-result-item">
                <span className="result-site">varunsehgal.runs-on.dev</span>
                <a href="https://varunsehgal.runs-on.dev" target="_blank" rel="noreferrer" className="result-title">
                  Varun Sehgal — UI/UX Designer & Product Designer Portfolio
                </a>
                <p className="result-snippet">
                  Varun Sehgal is a product designer with 3+ years experience delivering SaaS and AI product interfaces. Explore case studies including AI Interview Prep, EventFlow, and Expensify.
                </p>
              </div>

              <div className="google-result-item">
                <span className="result-site">github.com › varunsehgal05</span>
                <a href="https://github.com/varunsehgal05" target="_blank" rel="noreferrer" className="result-title">
                  varunsehgal05 (Varun Sehgal) · GitHub
                </a>
                <p className="result-snippet">
                  Repositories: Portfolio (macOS desktop operating system in React), AI-Interview-Prep, EventFlow, Expensify. Open source contributor and frontend engineer.
                </p>
              </div>

              <div className="google-result-item">
                <span className="result-site">linkedin.com › in › varunsehgal02</span>
                <a href="https://linkedin.com/in/varunsehgal02" target="_blank" rel="noreferrer" className="result-title">
                  Varun Sehgal - Jaypee University of Engineering and Technology
                </a>
                <p className="result-snippet">
                  Gwalior, Madhya Pradesh, India. UI/UX Designer Intern at UniEvent (Jun 2024 – Nov 2024, ended early Nov) and Knaptix Ventures. Specializing in Design Systems, User Research, and High-Fidelity Prototyping.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: WIKIPEDIA / GENERAL WEB */}
        {activeTab.type === 'wikipedia' && (
          <div className="safari-wiki-view">
            <div className="wiki-article-card">
              <h1 className="wiki-title">User experience design</h1>
              <p className="wiki-lead">
                <strong>User experience design (UX design, UXD, UED, or XD)</strong> is the process of defining the experience a user would go through when interacting with a digital product, service, or interface.
              </p>
              <div className="wiki-section">
                <h3>Core Methodologies Used by Varun Sehgal</h3>
                <ul>
                  <li><strong>Human-Centered Prototyping:</strong> Designing with rapid user feedback loops.</li>
                  <li><strong>Modular Design Tokens:</strong> Building scalable Figma to React components.</li>
                  <li><strong>Micro-Interactions:</strong> Delightful spring animations and tactile haptics.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: FALLBACK FOR OTHER URLS */}
        {activeTab.type === 'web' && (
          <div className="safari-web-fallback">
            <div className="fallback-card">
              <Globe size={42} className="fallback-icon" />
              <h2>{activeTab.title}</h2>
              <p className="fallback-url">{activeTab.url}</p>
              <p className="fallback-note">
                This external web origin cannot be rendered inside an embedded frame due to third-party <code>X-Frame-Options: SAMEORIGIN</code> security policies.
              </p>
              <a 
                href={activeTab.url} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-launch-external"
              >
                <ExternalLink size={15} />
                <span>Open in External Tab</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafariApp;