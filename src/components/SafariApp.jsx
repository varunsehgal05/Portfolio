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
  BookOpen,
  Users
} from 'lucide-react';
import './SafariApp.css';

const PINNED_REPOS = [
  {
    name: 'Portfolio',
    desc: 'Interactive macOS Sequoia portfolio with autonomous multiplayer cursor swarm engine & collaborative Figma canvas.',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    stars: 18,
    forks: 4,
    url: 'https://github.com/varunsehgal05/Portfolio'
  },
  {
    name: 'AI-Interview-Prep',
    desc: 'End-to-end AI candidate evaluation & grading platform with automated analytics and dark mode design system.',
    lang: 'Figma',
    langColor: '#1ABCFE',
    stars: 32,
    forks: 7,
    url: 'https://github.com/varunsehgal05'
  },
  {
    name: 'EventFlow-Ticketing',
    desc: '4-step checkout optimization platform with 50+ component modular design tokens.',
    lang: 'UI / UX',
    langColor: '#FF7262',
    stars: 24,
    forks: 5,
    url: 'https://github.com/varunsehgal05'
  },
  {
    name: 'Expensify-Tracker',
    desc: 'Rapid expense logging application refined for <5 second transactions and real-time financial telemetry.',
    lang: 'React Native',
    langColor: '#0ACF83',
    stars: 19,
    forks: 3,
    url: 'https://github.com/varunsehgal05'
  }
];

const SafariApp = () => {
  const [url, setUrl] = useState('https://github.com/varunsehgal05');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 450);
  };

  return (
    <div className="safari-container">
      {/* Safari Navigation Toolbar */}
      <div className="safari-toolbar">
        <div className="safari-nav-buttons">
          <button className="safari-btn" disabled><ArrowLeft size={14} /></button>
          <button className="safari-btn" disabled><ArrowRight size={14} /></button>
        </div>

        {/* URL Bar */}
        <div className="safari-url-bar">
          <Lock size={12} className="safari-lock-icon" />
          <span className="safari-url-domain">github.com</span>
          <span className="safari-url-path">/varunsehgal05</span>
          <button className={`safari-refresh-btn ${isRefreshing ? 'spin' : ''}`} onClick={handleRefresh}>
            <RotateCw size={12} />
          </button>
        </div>

        <div className="safari-actions">
          <a 
            href="https://github.com/varunsehgal05" 
            target="_blank" 
            rel="noreferrer" 
            className="safari-open-external"
            title="Open Live GitHub Profile"
          >
            <span>Open in Tab</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Safari Webpage View */}
      <div className="safari-viewport">
        {/* GitHub Header Banner */}
        <div className="gh-header">
          <div className="gh-avatar-wrap">
            <div className="gh-avatar">VS</div>
          </div>
          <div className="gh-user-info">
            <h1 className="gh-name">Varun Sehgal</h1>
            <span className="gh-username">varunsehgal05</span>
            <p className="gh-bio">
              UI/UX & Product Designer | Passionate about building seamless developer tools, SaaS interfaces, and motion experiences.
            </p>
            <div className="gh-stats">
              <span><Users size={13} /> <strong>140+</strong> followers</span>
              <span>•</span>
              <span><strong>12</strong> repositories</span>
              <span>•</span>
              <span>Gwalior, MP, India</span>
            </div>
          </div>
        </div>

        {/* Pinned Repositories Grid */}
        <div className="gh-pinned-section">
          <div className="gh-section-title">
            <BookOpen size={14} />
            <span>Pinned Repositories</span>
          </div>

          <div className="gh-repo-grid">
            {PINNED_REPOS.map((repo, idx) => (
              <a 
                key={idx} 
                href={repo.url} 
                target="_blank" 
                rel="noreferrer" 
                className="gh-repo-card"
              >
                <div className="gh-repo-header">
                  <FolderGit2 size={14} className="gh-repo-icon" />
                  <span className="gh-repo-name">{repo.name}</span>
                  <span className="gh-repo-public">Public</span>
                </div>
                <p className="gh-repo-desc">{repo.desc}</p>
                <div className="gh-repo-footer">
                  <span className="gh-lang">
                    <span className="lang-color" style={{ backgroundColor: repo.langColor }} />
                    {repo.lang}
                  </span>
                  <span className="gh-metric"><Star size={12} /> {repo.stars}</span>
                  <span className="gh-metric"><GitFork size={12} /> {repo.forks}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafariApp;