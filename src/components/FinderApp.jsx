import { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import './FinderApp.css';

const FEATURED_PROJECTS = [
  {
    id: 'ai-interview',
    title: 'AI Interview & Prep Platform',
    desc: 'Architected AI-driven SaaS platform with dedicated Security & Grading modules automating candidate evaluation.',
    tags: ['Figma', 'SaaS', 'AI UX', 'Dark Mode'],
    link: 'https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842'
  },
  {
    id: 'eventflow',
    title: 'EventFlow: Event Ticketing SaaS',
    desc: '4-step checkout flow optimization cutting drop-off by 30% with a 50+ component modular design system.',
    tags: ['Design System', 'Figma', 'Checkout UX'],
    link: 'https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2'
  },
  {
    id: 'expensify',
    title: 'Expensify: Budget Tracker App',
    desc: '17+ mobile screens refined for rapid expense logging under 5 seconds with real-time financial telemetry.',
    tags: ['Mobile UX', 'Micro-interactions', 'Fintech'],
    link: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318'
  },
  {
    id: 'codesrijan',
    title: 'CodeSrijan Hackathon Ecosystem',
    desc: 'Complete branding, participant portals, and 72-hour evaluation platform for 200+ hackathon participants.',
    tags: ['Event Branding', 'UI Design', 'Design Tokens'],
    link: 'https://lnkd.in/p/dUXQYx92'
  }
];

const EXPERIENCE_ITEMS = [
  {
    id: 'unievent',
    title: 'UI/UX Designer Intern',
    company: 'UniEvent (Remote)',
    date: 'Jun 2026 – Nov 2026',
    desc: 'Designed user-focused digital experiences and translated complex business requirements into clear, consistent interfaces.'
  },
  {
    id: 'assemble',
    title: 'Assistant Head of Operations',
    company: 'Assemble (Remote)',
    date: 'Aug 2025 – Jan 2026',
    desc: 'Assisted in the planning and smooth execution of esports tournaments and gaming events.'
  },
  {
    id: 'knaptix',
    title: 'UI/UX Designer Intern',
    company: 'Knaptix Ventures (Remote)',
    date: 'Jun 2025 – Aug 2025',
    desc: 'Conceptualized 5+ high-fidelity UI/UX interfaces with 40% increase in user satisfaction and 45% faster turnaround.'
  },
  {
    id: 'freelance',
    title: 'Freelance UI/UX Designer',
    company: 'Self-Employed (Remote)',
    date: 'Jan 2024 – Present',
    desc: 'Executed 10+ end-to-end design projects with 95% client retention for tech startups.'
  }
];

const TECH_STACK = [
  { category: 'Design Tools', skills: ['Figma', 'Figma AI', 'Adobe XD', 'Photoshop', 'Illustrator', 'FigJam'] },
  { category: 'AI Prototyping', skills: ['Uizard', 'Galileo AI', 'Visily', 'Figma Magician', 'Figma Automator'] },
  { category: 'UI/UX Methods', skills: ['Wireframing', 'Rapid Prototyping', 'User Research', 'Design Systems', 'Usability Testing'] },
  { category: 'Frontend Prototyping', skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3', 'Git'] }
];

const FinderApp = ({ onOpenApp }) => {
  const [activeTab, setActiveTab] = useState('featured');

  const handleNavClick = (tabId) => {
    if (tabId === 'resume' && onOpenApp) {
      onOpenApp('resume');
      return;
    }
    if (tabId === 'github') {
      window.open('https://github.com/varunsehgal05', '_blank');
      return;
    }
    setActiveTab(tabId);
  };

  return (
    <div className="finder-container">
      {/* Sidebar */}
      <aside className="finder-sidebar">
        <div>
          <div className="finder-sidebar-section">
            <div className="finder-section-title">Favorite</div>
            <button 
              className={`finder-nav-item ${activeTab === 'featured' ? 'active' : ''}`}
              onClick={() => handleNavClick('featured')}
            >
              <span className="finder-nav-icon"><Hash size={13} /></span>
              <span>Featured Works</span>
            </button>
            <button 
              className={`finder-nav-item ${activeTab === 'tech' ? 'active' : ''}`}
              onClick={() => handleNavClick('tech')}
            >
              <span className="finder-nav-icon"><Code2 size={13} /></span>
              <span>Tech Stack</span>
            </button>
            <button 
              className={`finder-nav-item ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => handleNavClick('experience')}
            >
              <span className="finder-nav-icon"><Briefcase size={13} /></span>
              <span>Experience</span>
            </button>
          </div>

          <div className="finder-sidebar-section">
            <div className="finder-section-title">Location</div>
            <button 
              className={`finder-nav-item ${activeTab === 'github' ? 'active' : ''}`}
              onClick={() => handleNavClick('github')}
            >
              <span className="finder-nav-icon"><FolderGit2 size={13} /></span>
              <span>GitHub Repos</span>
            </button>
            <button 
              className={`finder-nav-item ${activeTab === 'resume' ? 'active' : ''}`}
              onClick={() => handleNavClick('resume')}
            >
              <span className="finder-nav-icon"><FileText size={13} /></span>
              <span>Resume PDF</span>
            </button>
          </div>
        </div>

        {/* User Card at bottom of sidebar */}
        <div className="finder-profile-card">
          <div className="finder-avatar">V</div>
          <div className="finder-profile-info">
            <span className="finder-profile-name">Varun Sehgal</span>
            <span className="finder-profile-role">UI/UX & Product Designer</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="finder-main">
        {/* Hero Card */}
        <div className="finder-hero-card">
          <div className="finder-status-badge">
            <span className="status-dot"></span>
            <span>Available for New Projects</span>
          </div>
          <h1 className="finder-hero-title">
            Designing intuitive web apps & modern interfaces
          </h1>
          <p className="finder-hero-desc">
            UI/UX & Product Designer with 3+ years delivering high-impact SaaS and AI product experiences. Skilled in user research, wireframing, rapid prototyping, and design systems.
          </p>
        </div>

        {activeTab === 'featured' && (
          <>
            <div className="finder-section-header">
              <span className="finder-content-heading">Selected Highlights</span>
              <span className="finder-item-count">{FEATURED_PROJECTS.length} items</span>
            </div>
            <div className="finder-cards-grid">
              {FEATURED_PROJECTS.map((proj) => (
                <a
                  key={proj.id}
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="finder-project-card"
                >
                  <div>
                    <div className="finder-card-top">
                      <span className="finder-card-title">{proj.title}</span>
                      <ExternalLink size={13} className="finder-card-icon" />
                    </div>
                    <p className="finder-card-desc">{proj.desc}</p>
                  </div>
                  <div className="finder-card-tags">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="finder-card-tag">{tag}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {activeTab === 'experience' && (
          <>
            <div className="finder-section-header">
              <span className="finder-content-heading">Professional Experience</span>
              <span className="finder-item-count">{EXPERIENCE_ITEMS.length} positions</span>
            </div>
            <div className="finder-cards-grid" style={{ gridTemplateColumns: '1fr' }}>
              {EXPERIENCE_ITEMS.map((exp) => (
                <div key={exp.id} className="finder-project-card" style={{ cursor: 'default' }}>
                  <div className="finder-card-top">
                    <span className="finder-card-title">{exp.title} • {exp.company}</span>
                    <span style={{ fontSize: '11px', color: '#71717a' }}>{exp.date}</span>
                  </div>
                  <p className="finder-card-desc">{exp.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'tech' && (
          <>
            <div className="finder-section-header">
              <span className="finder-content-heading">Skills & Tooling</span>
              <span className="finder-item-count">{TECH_STACK.length} categories</span>
            </div>
            <div className="finder-cards-grid">
              {TECH_STACK.map((cat, idx) => (
                <div key={idx} className="finder-project-card" style={{ cursor: 'default' }}>
                  <div className="finder-card-top">
                    <span className="finder-card-title">{cat.category}</span>
                  </div>
                  <div className="finder-card-tags" style={{ marginTop: '10px' }}>
                    {cat.skills.map((s, sIdx) => (
                      <span key={sIdx} className="finder-card-tag">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default FinderApp;
