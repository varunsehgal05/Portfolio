import React, { useState, useMemo } from 'react';
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
    title: 'UI/UX Designer Intern',
    company: 'UniEvent (Remote)',
    date: 'Jun 2024 – Nov 2024',
    desc: 'Designed user-focused digital experiences and translated complex business requirements into clear, consistent interfaces for campus event ticketing platform (EventFlow). Completed in early Nov 2024.',
    tags: ['Figma', 'Design Systems', 'User Research', 'EventFlow']
  },
  {
    id: 'assemble',
    title: 'Assistant Head of Operations',
    company: 'Assemble (Remote)',
    date: 'Aug 2024 – Jan 2025',
    desc: 'Assisted in the planning and smooth execution of esports tournaments and gaming events.',
    tags: ['Operations', 'Esports', 'Event Management']
  },
  {
    id: 'knaptix',
    title: 'UI/UX Designer Intern',
    company: 'Knaptix Ventures (Remote)',
    date: 'Jun 2024 – Aug 2024',
    desc: 'Conceptualized 5+ high-fidelity UI/UX interfaces with 40% increase in user satisfaction and 45% faster turnaround.',
    tags: ['Mobile UX', 'SaaS', 'High-Fidelity Wireframes']
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
      {/* 1. Left Sidebar */}
      <aside className="finder-sidebar">
        <div className="finder-sidebar-content">
          {/* Section: Favorites */}
          <div className="finder-sidebar-section">
            <div className="finder-section-title">Favorites</div>
            <button 
              className={`finder-nav-item ${activeTab === 'featured' ? 'active' : ''}`}
              onClick={() => handleNavClick('featured')}
            >
              <span className="finder-nav-icon"><Hash size={13} color="#38bdf8" /></span>
              <span>Featured Works</span>
            </button>
            <button 
              className={`finder-nav-item ${activeTab === 'tech' ? 'active' : ''}`}
              onClick={() => handleNavClick('tech')}
            >
              <span className="finder-nav-icon"><Code2 size={13} color="#a78bfa" /></span>
              <span>Tech Stack</span>
            </button>
            <button 
              className={`finder-nav-item ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => handleNavClick('experience')}
            >
              <span className="finder-nav-icon"><Briefcase size={13} color="#facc15" /></span>
              <span>Experience</span>
            </button>
          </div>

          {/* Section: Locations */}
          <div className="finder-sidebar-section">
            <div className="finder-section-title">Locations</div>
            <button 
              className={`finder-nav-item ${activeTab === 'vscode' ? 'active' : ''}`}
              onClick={() => handleNavClick('vscode')}
            >
              <span className="finder-nav-icon"><Cpu size={13} color="#38bdf8" /></span>
              <span>VS Code Projects</span>
            </button>
            <button 
              className={`finder-nav-item ${activeTab === 'github' ? 'active' : ''}`}
              onClick={() => handleNavClick('github')}
            >
              <span className="finder-nav-icon"><FolderGit2 size={13} color="#4ade80" /></span>
              <span>GitHub Repos</span>
            </button>
            <button 
              className={`finder-nav-item ${activeTab === 'resume' ? 'active' : ''}`}
              onClick={() => handleNavClick('resume')}
            >
              <span className="finder-nav-icon"><FileText size={13} color="#f97316" /></span>
              <span>Resume PDF</span>
            </button>
          </div>

          {/* Section: Tags */}
          <div className="finder-sidebar-section">
            <div className="finder-section-title">Tags</div>
            <div className="finder-tag-row"><span className="tag-dot red"></span><span>Work</span></div>
            <div className="finder-tag-row"><span className="tag-dot orange"></span><span>Design</span></div>
            <div className="finder-tag-row"><span className="tag-dot purple"></span><span>AI & LLM</span></div>
            <div className="finder-tag-row"><span className="tag-dot blue"></span><span>Personal</span></div>
          </div>
        </div>

        {/* User Profile Card at bottom */}
        <div className="finder-profile-card">
          <div className="finder-avatar-circle">
            <img src="/varun.jpg" alt="Varun" className="finder-avatar-img" />
          </div>
          <div className="finder-profile-info">
            <span className="finder-profile-name">Varun Sehgal</span>
            <span className="finder-profile-role">UI/UX & Product Designer</span>
          </div>
        </div>
      </aside>

      {/* 2. Main Content & Toolbar */}
      <main className="finder-main">
        {/* Finder Toolbar */}
        <div className="finder-toolbar">
          <div className="finder-toolbar-history">
            <button className="finder-tb-btn" disabled><ArrowLeft size={13} /></button>
            <button className="finder-tb-btn" disabled><ArrowRight size={13} /></button>
          </div>

          {/* Breadcrumbs */}
          <div className="finder-path-pill">
            <HardDrive size={12} className="finder-hd-icon" />
            <span>Macintosh HD</span>
            <ChevronRight size={10} className="path-arrow" />
            <span>Users</span>
            <ChevronRight size={10} className="path-arrow" />
            <span>varun</span>
            <ChevronRight size={10} className="path-arrow" />
            <span className="current-path">{activeTab === 'featured' ? 'Featured Works' : activeTab === 'tech' ? 'Tech Stack' : 'Experience'}</span>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="finder-view-modes">
            <button 
              className={`finder-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Icons Grid View"
            >
              <LayoutGrid size={13} />
            </button>
            <button 
              className={`finder-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Columns List View"
            >
              <List size={13} />
            </button>
          </div>

          {/* Live Search Filter */}
          <div className="finder-search-box">
            <Search size={12} className="finder-search-icon" />
            <input
              type="text"
              placeholder="Search in Finder..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="finder-search-input"
            />
          </div>
        </div>

        {/* Hero Card */}
        <div className="finder-hero-card">
          <div className="finder-status-badge">
            <span className="status-dot"></span>
            <span>Available for New Product Roles & Projects</span>
          </div>
          <h1 className="finder-hero-title">
            Designing intuitive web apps & modern interfaces
          </h1>
          <p className="finder-hero-desc">
            UI/UX & Product Designer with 3+ years delivering high-impact SaaS and AI product experiences. Skilled in user research, wireframing, rapid prototyping, and design systems.
          </p>
        </div>

        {/* Content Section: Featured Works */}
        {activeTab === 'featured' && (
          <div className="finder-body-wrap">
            <div className="finder-section-header">
              <span className="finder-content-heading">Selected Highlights</span>
              <span className="finder-item-count">{filteredProjects.length} items</span>
            </div>

            {viewMode === 'grid' ? (
              <div className="finder-cards-grid">
                {filteredProjects.map((proj) => (
                  <div key={proj.id} className="finder-project-card">
                    <div>
                      <div className="finder-card-top">
                        <span className="finder-card-title">{proj.title}</span>
                        <a href={proj.link} target="_blank" rel="noreferrer" title="Open Showcase">
                          <ExternalLink size={13} className="finder-card-icon" />
                        </a>
                      </div>
                      <span className="finder-card-cat">{proj.category}</span>
                      <p className="finder-card-desc">{proj.desc}</p>
                    </div>
                    <div className="finder-card-tags">
                      {proj.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="finder-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
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