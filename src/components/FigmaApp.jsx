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
  Search,
  Plus,
  Pin,
  Trash2,
  Download,
  Calendar,
  Award,
  ChevronRight,
  Code2,
  Palette,
  LayoutGrid
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
  { id: 'home', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: Layers },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'about', label: 'About', icon: User },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'process', label: 'Process', icon: Workflow },
];

const INITIAL_NOTES = [
  { id: 1, text: "Don't forget to polish micro-interactions!", color: 'yellow', x: 20, y: 30, pinned: true },
  { id: 2, text: "Sync design tokens with engineering team ⚡", color: 'blue', x: 260, y: 25, pinned: false },
  { id: 3, text: "Usability testing scheduled for Thursday ☕", color: 'pink', x: 490, y: 35, pinned: false },
];

const CREATIVE_NOTE_PROMPTS = [
  "Review accessibility contrast ratios (WCAG AA)",
  "Update typography scale in Figma tokens",
  "Ship interactive prototype v2 to stakeholders",
  "Design system component audit at 4 PM",
  "Prepare presentation deck for UniEvent release",
  "Draft new case study on AI interview scoring"
];

const ALL_PROJECTS = [
  {
    id: 'ai-interview',
    name: 'AI Interview Prep System',
    category: 'SaaS / Web',
    badge: 'AI SaaS • 40+ Components',
    metric: '40+ Components • Real-time Scoring',
    image: '/figma_AI_Interview.png',
    desc: 'Automated technical & behavioral interview platform with real-time AI scoring, candidate metrics dashboard, and grading module.',
    tags: ['Figma', 'SaaS', 'AI UX', 'Dark Mode'],
    link: 'https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842'
  },
  {
    id: 'movie-tickets',
    name: 'Movie Ticket Booking App',
    category: 'Mobile App',
    badge: 'Mobile App • 12+ Flows',
    metric: '3-Step Checkout • 12+ Flows',
    image: '/figma_Movie_Tickets.png',
    desc: 'High-fidelity cinema ticketing mobile app featuring fluid seat-map selection, schedule browsing, and frictionless checkout flow.',
    tags: ['Mobile UX', 'Seat Map', 'Micro-interactions'],
    link: 'https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86'
  },
  {
    id: 'expensify',
    name: 'Expensify - Budget Tracker',
    category: 'Mobile App',
    badge: 'FinTech • 17+ Screens',
    metric: 'Sub-5s Logging • 17+ Screens',
    image: '/figma_Expensify.png',
    desc: 'Personal finance dashboard and mobile app cutting transaction logging under 5 seconds with automated categorization.',
    tags: ['FinTech', 'Analytics', 'Dashboard', 'Figma'],
    link: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318'
  },
  {
    id: 'codesrijan',
    name: 'CodeSrijan Hackathon Portal',
    category: 'SaaS / Web',
    badge: 'Web App • 800+ Attendees',
    metric: '800+ Attendees • 50+ Teams',
    image: '/figma_CodeSrijan.png',
    desc: 'National hackathon portal facilitating registration, project submissions, live evaluation matrices, and real-time announcements.',
    tags: ['React', 'Event Platform', 'Design System'],
    link: 'https://github.com/varunsehgal05/codesrijan-portal'
  },
  {
    id: 'eventflow',
    name: 'EventFlow Experience Platform',
    category: 'Design Systems',
    badge: 'Design System • 50+ Tokens',
    metric: '50+ Modular Components • 30% Less Dropoff',
    image: '/figma_Movie_Tickets.png',
    desc: 'Modular event planning UI design system with reusable atomic components, flexible themes, and 4-step optimized checkout.',
    tags: ['Design System', 'Figma', 'Tokens'],
    link: 'https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2'
  },
  {
    id: 'neo-bank',
    name: 'Neo-Bank Design System',
    category: 'Design Systems',
    badge: 'Tokens • Multi-Brand',
    metric: 'Atomic Hierarchy • WCAG AA',
    image: '/figma_Expensify.png',
    desc: 'Comprehensive multi-brand fintech design system comprising typography scale, responsive grid layout, and stateful widgets.',
    tags: ['Design System', 'Figma Tokens', 'FinTech'],
    link: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318'
  }
];

const TIMELINE = [
  {
    role: 'Lead Product Designer',
    company: 'UniEvent',
    period: 'Oct 2024 — Present',
    type: 'Full-Time',
    desc: 'Leading product design for campus event ticketing platform, developing end-to-end design systems and reducing checkout friction by 30%.'
  },
  {
    role: 'UI/UX Design Intern',
    company: 'Assemble',
    period: 'Jul 2024 — Sep 2024',
    type: 'Internship',
    desc: 'Designed collaborative creator workspace tools and interaction prototypes in Figma, translating complex user workflows into clean UI.'
  },
  {
    role: 'UI/UX Intern',
    company: 'Knaptix Ventures',
    period: 'Jan 2024 — Jun 2024',
    type: 'Internship',
    desc: 'Created high-fidelity wireframes and design system components for B2B client applications and web dashboards.'
  },
  {
    role: 'Freelance UI/UX Designer',
    company: 'Independent',
    period: '2023 — Present',
    type: 'Freelance',
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

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discover & Empathize',
    subtitle: 'Research & User Alignment',
    desc: 'Deep-dive user interviews, stakeholder workshops, competitive audit, and journey mapping to identify core problem spaces.'
  },
  {
    num: '02',
    title: 'Define & Strategize',
    subtitle: 'Information Architecture',
    desc: 'Synthesizing insights into user personas, empathy maps, task flows, and low-fidelity structural wireframes.'
  },
  {
    num: '03',
    title: 'Design Systems & Tokens',
    subtitle: 'Scalable UI Foundations',
    desc: 'Defining color semantics, typography scales, spacing tokens, and atomic component libraries with auto-layout in Figma.'
  },
  {
    num: '04',
    title: 'Interactive Prototyping',
    subtitle: 'High-Fidelity Flows',
    desc: 'Connecting realistic micro-interactions, smart-animate transitions, and responsive artboards for stakeholder testing.'
  },
  {
    num: '05',
    title: 'Validation & Handoff',
    subtitle: 'Usability & Dev Specs',
    desc: 'Conducting usability testing, documenting token specs, and partnering closely with frontend engineers for pixel-perfect delivery.'
  }
];

const FigmaApp = ({ isInteracting = false, userName = 'Guest' }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [copied, setCopied] = useState(false);
  const [stickyNotes, setStickyNotes] = useState(INITIAL_NOTES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [experienceView, setExperienceView] = useState('timeline');
  const [aboutVariant, setAboutVariant] = useState('Product Designer');

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://www.figma.com/@varunsehgal');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddStickyNote = () => {
    if (stickyNotes.length >= 8) return;
    const colors = ['yellow', 'blue', 'pink', 'green'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomText = CREATIVE_NOTE_PROMPTS[Math.floor(Math.random() * CREATIVE_NOTE_PROMPTS.length)];
    const newNote = {
      id: Date.now(),
      text: randomText,
      color: randomColor,
      x: 30 + (stickyNotes.length * 40) % 300,
      y: 20 + (stickyNotes.length * 30) % 150,
      pinned: false
    };
    setStickyNotes(prev => [...prev, newNote]);
  };

  const handleDeleteNote = (id) => {
    setStickyNotes(prev => prev.filter(n => n.id !== id));
  };

  const filteredProjects = ALL_PROJECTS.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="figma-portfolio-app">
      {/* 1. Authentic Figma Toolbar */}
      <header className="figma-top-bar">
        <div className="figma-top-left">
          <div className="figma-logo-pill" title="Figma Portfolio">
            <FigmaLogo size={14} />
          </div>

          <div className="figma-title-group">
            <span className="figma-project-name">Varun Sehgal — Portfolio Workspace</span>
            <span className="figma-live-tag">Live App</span>
          </div>

          {/* 6 Authentic Portfolio Tabs */}
          <nav className="figma-tabs-nav">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`figma-tab-link ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  title={`View ${tab.label}`}
                >
                  <Icon size={12} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="figma-top-right">
          <div className="figma-multiplayer-badge">
            <div className="avatar-chip owner" title="Varun Sehgal (Owner)">VS</div>
            <div className="avatar-chip user" title={`${userName} (You)`}>
              {userName.substring(0, 2).toUpperCase()}
            </div>
            <span className="live-users-dot" title="2 designers active"></span>
          </div>

          <button 
            className="figma-action-btn share" 
            onClick={handleCopyLink}
            title="Share portfolio"
          >
            {copied ? <Check size={12} /> : <Share2 size={12} />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>

          <a 
            href="https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842" 
            target="_blank" 
            rel="noreferrer" 
            className="figma-action-btn present"
            title="Present Figma Prototype"
          >
            <Play size={11} fill="currentColor" />
          </a>
        </div>
      </header>

      {/* 2. Main Content Area per Tab */}
      <div className="figma-body-viewport">
        {/* =========================================================================
            TAB 1: HOME (Interactive Panning Canvas + Real Featured Projects + Notes)
            ========================================================================= */}
        {activeTab === 'home' && (
          <div className="figma-canvas-view">
            {/* Canvas Sub-header */}
            <div className="canvas-intro-bar">
              <div className="designer-headline">
                <span className="headline-sub">VARUN SEHGAL • PORTFOLIO CANVAS</span>
                <h1 className="headline-title">UI/UX & Product Designer</h1>
                <p className="headline-desc">
                  Designing scalable design systems, AI interfaces, and interactive digital products.
                </p>
              </div>

              <div className="canvas-quick-actions">
                <button className="canvas-tool-btn" onClick={handleAddStickyNote}>
                  <Plus size={13} /> Add Sticky Note
                </button>
                <a 
                  href="/Varun_Sehgal_Resume_Updated.pdf" 
                  download="Varun_Sehgal_Resume.pdf" 
                  className="canvas-tool-btn outline"
                >
                  <Download size={13} /> Resume PDF
                </a>
              </div>
            </div>

            {/* Draggable Sticky Notes Shelf */}
            <div className="figma-sticky-notes-shelf">
              <span className="shelf-label">Workspace Creative Notes:</span>
              <div className="sticky-notes-row">
                {stickyNotes.map(note => (
                  <div key={note.id} className={`sticky-note-card ${note.color}`}>
                    <div className="note-pin-header">
                      <Pin size={10} className="pin-icon" />
                      <button 
                        className="delete-note-btn" 
                        onClick={() => handleDeleteNote(note.id)}
                        title="Delete note"
                      >
                        ×
                      </button>
                    </div>
                    <p className="note-text">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Authentic Featured Projects Grid */}
            <div className="canvas-artboards-section">
              <div className="section-title-wrap">
                <h2 className="section-heading">Featured Design Systems & Prototypes</h2>
                <span className="section-caption">High-fidelity interactive projects created by Varun Sehgal</span>
              </div>

              <div className="canvas-cards-grid">
                {ALL_PROJECTS.slice(0, 4).map((proj) => (
                  <div key={proj.id} className="artboard-card">
                    <div className="artboard-img-wrap">
                      <img src={proj.image} alt={proj.name} className="artboard-img" />
                      <div className="artboard-overlay-badge">{proj.badge}</div>
                    </div>

                    <div className="artboard-info">
                      <div className="artboard-meta-row">
                        <span className="artboard-category">{proj.category}</span>
                        <span className="artboard-metric">{proj.metric}</span>
                      </div>

                      <h3 className="artboard-title">{proj.name}</h3>
                      <p className="artboard-desc">{proj.desc}</p>

                      <div className="artboard-tags">
                        {proj.tags.map((tag, i) => (
                          <span key={i} className="artboard-tag">{tag}</span>
                        ))}
                      </div>

                      <div className="artboard-card-footer">
                        <a 
                          href={proj.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="open-figma-btn"
                        >
                          Open in Figma <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: PROJECTS (Bento Grid with Categories & Real-time Filter)
            ========================================================================= */}
        {activeTab === 'projects' && (
          <div className="figma-projects-page">
            <div className="page-header">
              <div>
                <h2>Projects & Design Work</h2>
                <p>Complete showcase of production UX flows, design systems, and mobile applications.</p>
              </div>

              {/* Search & Category Filter */}
              <div className="filters-row">
                <div className="search-box">
                  <Search size={14} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search projects by name, tag, or domain..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="category-pills">
                  {['All', 'Mobile App', 'SaaS / Web', 'Design Systems'].map(cat => (
                    <button
                      key={cat}
                      className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="projects-bento-grid">
              {filteredProjects.map(proj => (
                <div key={proj.id} className="bento-project-card">
                  <div className="bento-img-container">
                    <img src={proj.image} alt={proj.name} className="bento-img" />
                    <span className="bento-badge">{proj.badge}</span>
                  </div>

                  <div className="bento-content">
                    <div className="bento-top">
                      <span className="bento-cat">{proj.category}</span>
                      <span className="bento-stat">{proj.metric}</span>
                    </div>

                    <h3>{proj.name}</h3>
                    <p>{proj.desc}</p>

                    <div className="bento-tags">
                      {proj.tags.map((t, idx) => (
                        <span key={idx} className="bento-tag">{t}</span>
                      ))}
                    </div>

                    <a 
                      href={proj.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="bento-action-link"
                    >
                      Explore Prototype <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: EXPERIENCE (Work History Timeline & Official Certifications)
            ========================================================================= */}
        {activeTab === 'experience' && (
          <div className="figma-experience-page">
            <div className="experience-header">
              <h2>Career & Experience</h2>
              <div className="exp-toggle-group">
                <button 
                  className={`exp-toggle-btn ${experienceView === 'timeline' ? 'active' : ''}`}
                  onClick={() => setExperienceView('timeline')}
                >
                  <Briefcase size={13} /> Work Timeline
                </button>
                <button 
                  className={`exp-toggle-btn ${experienceView === 'certs' ? 'active' : ''}`}
                  onClick={() => setExperienceView('certs')}
                >
                  <Award size={13} /> Certifications
                </button>
              </div>
            </div>

            {experienceView === 'timeline' ? (
              <div className="timeline-container">
                {TIMELINE.map((item, index) => (
                  <div key={index} className="timeline-card">
                    <div className="timeline-indicator">
                      <div className="timeline-dot"></div>
                      {index < TIMELINE.length - 1 && <div className="timeline-line"></div>}
                    </div>

                    <div className="timeline-card-content">
                      <div className="timeline-meta">
                        <span className="timeline-period"><Calendar size={12} /> {item.period}</span>
                        <span className="timeline-type-pill">{item.type}</span>
                      </div>

                      <h3 className="timeline-role">{item.role}</h3>
                      <h4 className="timeline-company">{item.company}</h4>
                      <p className="timeline-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="certs-grid">
                {CERTIFICATIONS.map(cert => (
                  <div key={cert.id} className="cert-card">
                    <div className="cert-top">
                      <Award size={18} className="cert-icon" />
                      <span className="cert-date">{cert.date}</span>
                    </div>
                    <h3>{cert.title}</h3>
                    <span className="cert-issuer">Issued by {cert.issuer}</span>
                    <p>{cert.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 4: ABOUT (Component Inspection Specs & Designer Profile)
            ========================================================================= */}
        {activeTab === 'about' && (
          <div className="figma-about-page">
            <div className="about-header">
              <h2>Master Component Specs: Varun Sehgal</h2>
              <div className="variant-switch">
                <span className="variant-label">Active Variant:</span>
                {['Product Designer', 'UI/UX Specialist', 'Design System Lead'].map(v => (
                  <button
                    key={v}
                    className={`variant-pill ${aboutVariant === v ? 'active' : ''}`}
                    onClick={() => setAboutVariant(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="about-components-layout">
              {/* Profile Master Card */}
              <div className="about-master-card">
                <div className="master-avatar-wrap">
                  <img src="/varun.jpg" alt="Varun Sehgal" className="master-avatar-img" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <div className="master-avatar-fallback">VS</div>
                </div>

                <div className="master-info">
                  <div className="master-tag">#Core Master Component</div>
                  <h3 className="master-name">Varun Sehgal</h3>
                  <div className="master-role-badge">{aboutVariant}</div>
                  <p className="master-bio">
                    Computer Science undergraduate at Jaypee University Of Engineering And Technology (2023–2027) 
                    combining visual UI/UX precision with frontend engineering. Passionate about AI interaction patterns 
                    and scalable multi-brand design systems.
                  </p>
                </div>
              </div>

              {/* Spec Cards */}
              <div className="about-specs-grid">
                <div className="spec-card">
                  <div className="spec-header">
                    <Palette size={14} className="spec-icon" />
                    <span>Design Tools</span>
                  </div>
                  <div className="spec-tags-list">
                    {['Figma', 'Figma AI', 'FigJam', 'Adobe XD', 'Photoshop', 'Illustrator'].map((s, i) => (
                      <span key={i} className="spec-pill">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="spec-card">
                  <div className="spec-header">
                    <Code2 size={14} className="spec-icon" />
                    <span>Engineering & Prototyping</span>
                  </div>
                  <div className="spec-tags-list">
                    {['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Git', 'KaTeX'].map((s, i) => (
                      <span key={i} className="spec-pill">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="spec-card">
                  <div className="spec-header">
                    <LayoutGrid size={14} className="spec-icon" />
                    <span>UI/UX Methods</span>
                  </div>
                  <div className="spec-tags-list">
                    {['Design Systems', 'Atomic Design', 'Wireframing', 'User Testing', 'WCAG AA', 'Design Tokens'].map((s, i) => (
                      <span key={i} className="spec-pill">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="spec-card">
                  <div className="spec-header">
                    <Sparkles size={14} className="spec-icon" />
                    <span>Focus & Availability</span>
                  </div>
                  <p className="spec-status-text">
                    🟢 Available for Summer 2025 / Q3 Full-Time & Freelance Design Systems Roles. Open to remote or relocation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: RESUME (ATS Overview & Verified PDF Download)
            ========================================================================= */}
        {activeTab === 'resume' && (
          <div className="figma-resume-page">
            <div className="resume-header">
              <div>
                <h2>Varun Sehgal — Resume</h2>
                <p>Verified credentials, educational background, and technical skillset.</p>
              </div>

              <a 
                href="/Varun_Sehgal_Resume_Updated.pdf" 
                download="Varun_Sehgal_Resume.pdf" 
                className="resume-download-btn"
              >
                <Download size={14} /> Download PDF
              </a>
            </div>

            <div className="resume-preview-sheet">
              <div className="resume-sheet-top">
                <div>
                  <h1 className="resume-sheet-name">VARUN SEHGAL</h1>
                  <p className="resume-sheet-title">UI/UX Designer • Product Designer</p>
                  <p className="resume-sheet-contact">Bengaluru, IN • varun.sehgal02@gmail.com • +91 9399361193</p>
                </div>
              </div>

              <div className="resume-sheet-section">
                <h3 className="section-title">EDUCATION</h3>
                <div className="resume-item">
                  <div className="item-header">
                    <strong>Jaypee University Of Engineering And Technology</strong>
                    <span>2023 — 2027</span>
                  </div>
                  <p className="item-sub">B.Tech in Computer Science & Engineering</p>
                </div>
              </div>

              <div className="resume-sheet-section">
                <h3 className="section-title">EXPERIENCE</h3>
                <div className="resume-item">
                  <div className="item-header">
                    <strong>UniEvent — Lead Product Designer</strong>
                    <span>Oct 2024 — Present</span>
                  </div>
                  <p className="item-sub">Engineered campus event management UI, cutting transaction drop-off by 30% through a 50+ component design system.</p>
                </div>

                <div className="resume-item">
                  <div className="item-header">
                    <strong>Assemble — UI/UX Design Intern</strong>
                    <span>Jul 2024 — Sep 2024</span>
                  </div>
                  <p className="item-sub">Designed interactive creator tooling and workflows in Figma with seamless handoff to engineering.</p>
                </div>
              </div>

              <div className="resume-sheet-section">
                <h3 className="section-title">SKILLS & COMPETENCIES</h3>
                <p className="resume-skills-line"><strong>Design:</strong> Figma, Figma AI, Adobe XD, Wireframing, Rapid Prototyping, Design Systems, Tokens, WCAG AA</p>
                <p className="resume-skills-line"><strong>Development:</strong> React.js, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3, Git</p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: PROCESS (5-Stage Product Design Methodology)
            ========================================================================= */}
        {activeTab === 'process' && (
          <div className="figma-process-page">
            <div className="process-header">
              <h2>Product Design Methodology</h2>
              <p>How Varun Sehgal transforms ambiguous problem statements into elegant, high-impact digital products.</p>
            </div>

            <div className="process-flow-grid">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className="process-step-card">
                  <div className="step-num-badge">{step.num}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <span className="step-subtitle">{step.subtitle}</span>
                  <p className="step-desc">{step.desc}</p>
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
