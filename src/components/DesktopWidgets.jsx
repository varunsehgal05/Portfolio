import './DesktopWidgets.css';
import { Terminal, Code, Activity, BookOpen, Coffee, GitPullRequest, Star } from 'lucide-react';

const DesktopWidgets = () => {
  return (
    <div className="desktop-widgets-sidebar">
      
      {/* System Info Widget */}
      <div className="widget-card">
        <div className="widget-header">
          <Terminal size={14} /> system_info.sys
        </div>
        <div className="widget-content neofetch">
          <div className="ascii-art">
            <pre>{`  /\\_/\\
 ( o.o )
  > ^ <`}</pre>
          </div>
          <div className="sys-info">
            <div className="info-row"><span className="key">OS:</span> <span className="val">VarunOS 3.1.4</span></div>
            <div className="info-row"><span className="key">Host:</span> <span className="val">Developer Station</span></div>
            <div className="info-row"><span className="key">Kernel:</span> <span className="val">Linux 6.8.0</span></div>
            <div className="info-row"><span className="key">Uptime:</span> <span className="val">8h 9m 31s</span></div>
            <div className="info-row"><span className="key">Shell:</span> <span className="val">zsh 5.9</span></div>
            <div className="info-row"><span className="key">Editor:</span> <span className="val">VS Code</span></div>
          </div>
        </div>
        <div className="color-blocks">
          <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>

      {/* Now Building Widget */}
      <div className="widget-card">
        <div className="widget-header">
          <Code size={14} /> now_building.md
        </div>
        <div className="widget-content list-content">
          <ul>
            <li>VarunOS v2.0</li>
            <li>Personal AI Assistant</li>
            <li>Interactive Portfolio</li>
            <li>Making Impact 🚀</li>
          </ul>
        </div>
      </div>

      {/* GitHub Stats Widget */}
      <div className="widget-card">
        <div className="widget-header">
          <Activity size={14} /> github_stats.json
        </div>
        <div className="widget-content stats-grid">
          <div className="stat-box">
            <div className="stat-val">34</div>
            <div className="stat-label">Repos</div>
          </div>
          <div className="stat-box">
            <div className="stat-val"><Star size={12}/> 5</div>
            <div className="stat-label">Stars</div>
          </div>
          <div className="stat-box">
            <div className="stat-val">—</div>
            <div className="stat-label">Streak</div>
          </div>
          <div className="stat-box">
            <div className="stat-val"><GitPullRequest size={12}/> 22</div>
            <div className="stat-label">PRs</div>
          </div>
        </div>
      </div>

      {/* Learning Log Widget */}
      <div className="widget-card">
        <div className="widget-header">
          <BookOpen size={14} /> learning.log
        </div>
        <div className="widget-content tag-content">
          <span className="skill-tag">LLM Fine-tuning</span>
          <span className="skill-tag">RAG Systems</span>
        </div>
      </div>

      {/* Coffee Widget */}
      <div className="widget-card">
        <div className="widget-header">
          <Coffee size={14} /> coffee.sh
        </div>
        <div className="widget-content coffee-content">
          <div className="coffee-count">
            <span className="big-num">2</span> ☕
          </div>
          <div className="coffee-label">cups today</div>
          <button className="brew-btn">+ brew</button>
        </div>
      </div>

    </div>
  );
};

export default DesktopWidgets;
