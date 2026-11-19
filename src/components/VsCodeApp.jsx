import React, { useState, useRef, useEffect } from 'react';
import {
  Files,
  Search,
  GitBranch,
  Play,
  Package,
  Settings,
  User,
  ChevronRight,
  ChevronDown,
  Terminal as TerminalIcon,
  X,
  Split,
  Maximize2,
  Minimize2,
  Bell,
  Sparkles,
  Layout,
  ArrowLeft,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react';
import './VsCodeApp.css';

// Exact TerminalApp.jsx source code matching the user's reference image
const TERMINAL_APP_CODE = `import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Sparkles, Folder, Play, Check, Copy } from 'lucide-react';
import './TerminalApp.css';

const WELCOME_BANNER = [
  'Last login: ' + new Date().toLocaleString() + ' on ttys001',
  'VarunOS Sequoia Darwin 24.1.0 (arm64 Apple M3 Max)',
  'Oh-My-Zsh configured with zsh-syntax-highlighting & pure prompt',
  '',
  'Type "help" or click any shortcut pill above to begin exploring.',
  ''
];

const NEOFETCH_LINES = [
  { text: '                    \\'.',          varun@macbook-pro.local', color: '#38bdf8', bold: true },
  { text: '                 ,xNMM.',          '-----------------------', color: '#38bdf8' },
  { text: '               .OMMMMo',           'OS: VarunOS Sequoia 15.1 (24B83) arm64', color: '#facc15' },
  { text: '               OMMM0,',            'Host: MacBookPro18,1 (Apple M3 Max)', color: '#facc15' },
  { text: '     .;loddo:.  .olloddol;.',      'Kernel: Darwin 24.1.0', color: '#facc15' },
  { text: '   cKMMMMMMMMMMNWMMMMMMMMMM0:',    'Uptime: 4 days, 12 hours, 38 mins', color: '#4ade80' },
  { text: ' .KMMMMMMMMMMMMMMMMMMMMMMMWd.',    'Packages: 842 (brew), 24 (npm)', color: '#4ade80' },
  { text: ' XMMMMMMMMMMMMMMMMMMMMMMMX.',      'Shell: zsh 5.9 (x86_64-apple-darwin24.0)', color: '#4ade80' },
  { text: ';MMMMMMMMMMMMMMMMMMMMMMMM:',       'Resolution: 3024x1964 Retina Display', color: '#a78bfa' },
  { text: ':MMMMMMMMMMMMMMMMMMMMMMMM:',       'DE: Aqua / Quartz Compositor', color: '#a78bfa' },
  { text: '.MMMMMMMMMMMMMMMMMMMMMMMMX.',      'WM: VarunOS Window Server', color: '#a78bfa' },
  { text: ' kMMMMMMMMMMMMMMMMMMMMMMMMWd.',    'Terminal: Apple Terminal.app (Sequoia)', color: '#ec4899' },
  { text: ' .XMMMMMMMMMMMMMMMMMMMMMMMMMMk',   'CPU: Apple M3 Max (16 cores @ 4.05GHz)', color: '#ec4899' },
  { text: '  .XMMMMMMMMMMMMMMMMMMMMMMMMK.',   'GPU: Apple M3 Max 40-Core GPU', color: '#ec4899' },
  { text: '    kMMMMMMMMMMMMMMMMMMMMMMd',     'Memory: 18432MiB / 65536MiB (28%)', color: '#38bdf8' },
  { text: '     ;KMMMMMMMWXXWMMMMMMMk.',      'Specialty: UI/UX & Vibecoded Product Engineering', color: '#38bdf8' },
  { text: '       .cooc,.    .,cooc.',        '', color: '#38bdf8' },
  { text: ' ', color: '#94a3b8' },
  { text: '                                 [■■■■■■■■] [■■■■■■■■] [■■■■■■■■] [■■■■■■■■]', color: '#f43f5e' },
  { text: '', color: '#94a3b8' }
];

const HELP_COMMANDS = [
  { cmd: 'neofetch', desc: 'Display VarunOS system hardware & specs banner' },
  { cmd: 'about', desc: 'Summary of Varun Sehgal and design philosophy' },
  { cmd: 'skills', desc: 'Display UI/UX, AI prototyping & frontend toolset' },
  { cmd: 'projects', desc: 'List featured SaaS and vibecoded platforms' },
  { cmd: 'vibecoding', desc: 'Explore autonomous AI code generation tools' },
  { cmd: 'experience', desc: 'Show career timeline & internship details' },
  { cmd: 'contact', desc: 'Print direct email, phone, and social handles' },
  { cmd: 'cat resume', desc: 'Read text preview of ATS-optimized resume' },
  { cmd: 'open <app>', desc: 'Launch desktop app (e.g. open figma, open vscode)' },
  { cmd: 'whoami', desc: 'Print active authenticated session user' },
  { cmd: 'date', desc: 'Print current system time and calendar timestamp' },
  { cmd: 'clear', desc: 'Clear the terminal view' }
];

const TerminalApp = ({ userName = 'Guest', onOpenApp }) => {
  const [history, setHistory] = useState(WELCOME_BANNER);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState(['neofetch']);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };`;

const FINDER_CSS_CODE = `/* ========================================================
   macOS Sequoia Finder Styling
   100% Solid Dark Glass Background (Zero bleed-through)
   ======================================================== */

.finder-container {
  display: flex;
  width: 100%;
  height: 100%;
  background: #16181e !important;
  color: #e4e4e7;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  overflow: hidden;
  user-select: none;
}

/* 1. Left Sidebar */
.finder-sidebar {
  width: 200px;
  background: rgba(22, 24, 30, 0.98) !important;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 10px;
  flex-shrink: 0;
}`;

const SAFARI_APP_CODE = `import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Share2, Lock, ExternalLink, Globe } from 'lucide-react';
import './SafariApp.css';

const BOOKMARKS = [
  { id: 'portfolio', label: '🌐 Portfolio Live', url: 'https://varunsehgal.runs-on.dev' },
  { id: 'github', label: '🐙 GitHub', url: 'https://github.com/varunsehgal05' },
  { id: 'linkedin', label: '💼 LinkedIn', url: 'https://linkedin.com/in/varunsehgal02' }
];

export const SafariApp = () => {
  const [url, setUrl] = useState('https://github.com/varunsehgal05/Portfolio');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="safari-root">
      <header className="safari-toolbar">
        <div className="nav-buttons">
          <ArrowLeft size={14} />
          <ArrowRight size={14} />
        </div>
      </header>
    </div>
  );
};`;

const RESUME_TEX_CODE = `%-------------------------
% ATS-Optimized Resume
% Author: Varun Sehgal
% Role: UI/UX Designer | Product Designer
%-------------------------

\\documentclass[letterpaper,10.5pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}

\\begin{document}
\\begin{center}
  \\textbf{\\Huge \\scshape Varun Sehgal} \\\\ \\vspace{1pt}
  \\small +91 9817349924 $|$ \\href{mailto:varunsehgal2005@gmail.com}{varunsehgal2005@gmail.com} $|$
  \\href{https://linkedin.com/in/varunsehgal02}{linkedin.com/in/varunsehgal02}
\\end{center}
\\end{document}`;

const RESUME_CSS_CODE = `/* macOS Preview — ATS Resume Viewer */
.resume-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f1f3f6;
  color: #1e293b;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
  overflow: hidden;
}

.resume-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}`;

const SETTINGS_APP_CODE = `import React, { useState } from 'react';
import { Image, Sparkles, Info, Volume2, Monitor } from 'lucide-react';
import './SettingsApp.css';

export const SettingsApp = () => {
  const [wallpaper, setWallpaper] = useState('Sequoia Midnight');

  return (
    <div className="settings-container">
      <h2>System Preferences</h2>
      <p>Theme: Dark Native Sequoia</p>
    </div>
  );
};`;

const VSCODE_APP_CODE = `// Antigravity IDE — VS Code Emulation Engine
import React, { useState } from 'react';
import './VsCodeApp.css';

export const VsCodeApp = () => {
  return (
    <div className="vscode-root-container">
      {/* Code Editor & Integrated Terminal */}
    </div>
  );
};
export default VsCodeApp;`;

const PROJECT_FILES = {
  'FinderApp.css': {
    name: 'FinderApp.css',
    path: 'src > components > FinderApp.css',
    icon: 'css',
    lang: 'CSS',
    code: FINDER_CSS_CODE
  },
  'TerminalApp.jsx': {
    name: 'TerminalApp.jsx',
    path: 'src > components > ⚛ TerminalApp.jsx',
    icon: 'jsx',
    lang: 'TypeScript React',
    code: TERMINAL_APP_CODE
  },
  'SafariApp.jsx': {
    name: 'SafariApp.jsx',
    path: 'src > components > ⚛ SafariApp.jsx',
    icon: 'jsx',
    lang: 'TypeScript React',
    code: SAFARI_APP_CODE
  },
  'Varun_Sehgal_Resume_Updated.tex': {
    name: 'Varun_Sehgal_Resume_Updated.tex',
    path: 'root > Varun_Sehgal_Resume_Updated.tex',
    icon: 'tex',
    lang: 'LaTeX',
    code: RESUME_TEX_CODE
  },
  'ResumeApp.css': {
    name: 'ResumeApp.css',
    path: 'src > components > ResumeApp.css',
    icon: 'css',
    lang: 'CSS',
    code: RESUME_CSS_CODE
  },
  'SettingsApp.jsx': {
    name: 'SettingsApp.jsx',
    path: 'src > components > ⚛ SettingsApp.jsx',
    icon: 'jsx',
    lang: 'TypeScript React',
    code: SETTINGS_APP_CODE
  },
  'VsCodeApp.jsx': {
    name: 'VsCodeApp.jsx',
    path: 'src > components > ⚛ VsCodeApp.jsx',
    icon: 'jsx',
    lang: 'TypeScript React',
    code: VSCODE_APP_CODE
  }
};

const TAB_ORDER = [
  'FinderApp.css',
  'TerminalApp.jsx',
  'SafariApp.jsx',
  'Varun_Sehgal_Resume_Updated.tex',
  'ResumeApp.css',
  'SettingsApp.jsx',
  'VsCodeApp.jsx'
];

export const VsCodeApp = () => {
  const [activeFile, setActiveFile] = useState('TerminalApp.jsx');
  const [openTabs, setOpenTabs] = useState(TAB_ORDER);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeActivity, setActiveActivity] = useState('explorer');
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [terminalTab, setTerminalTab] = useState('terminal');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: 'Microsoft Windows [Version 10.0.22631.4460]' },
    { type: 'output', text: '(c) Microsoft Corporation. All rights reserved.' },
    { type: 'output', text: '' }
  ]);
  const [cursorLine, setCursorLine] = useState(26);
  const [cursorCol, setCursorCol] = useState(1);
  const terminalInputRef = useRef(null);
  const editorScrollRef = useRef(null);

  const currentFile = PROJECT_FILES[activeFile] || PROJECT_FILES['TerminalApp.jsx'];
  const codeLines = currentFile.code.split('\n');

  const handleCloseTab = (e, fileName) => {
    e.stopPropagation();
    const remaining = openTabs.filter(t => t !== fileName);
    setOpenTabs(remaining);
    if (activeFile === fileName && remaining.length > 0) {
      setActiveFile(remaining[0]);
    }
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    const newHistory = [
      ...terminalHistory,
      { type: 'command', text: `PS C:\\Users\\Varun\\Downloads\\destop-portflio> ${cmd}` }
    ];

    const lower = cmd.toLowerCase();
    if (lower === 'clear' || lower === 'cls') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (lower === 'git status') {
      newHistory.push({ type: 'output', text: 'On branch main' });
      newHistory.push({ type: 'output', text: "Your branch is up to date with 'origin/main'." });
      newHistory.push({ type: 'output', text: 'nothing to commit, working tree clean' });
    } else if (lower === 'npm run dev' || lower === 'npm start') {
      newHistory.push({ type: 'output', text: '> destop-portflio@0.0.0 dev' });
      newHistory.push({ type: 'output', text: '> vite' });
      newHistory.push({ type: 'output', text: '  VITE v8.3.2  ready in 240 ms' });
      newHistory.push({ type: 'output', text: '  ➜  Local:   http://localhost:5173/' });
    } else if (lower === 'ls' || lower === 'dir') {
      newHistory.push({ type: 'output', text: '    Directory: C:\\Users\\Varun\\Downloads\\destop-portflio' });
      newHistory.push({ type: 'output', text: 'Mode                 LastWriteTime         Length Name' });
      newHistory.push({ type: 'output', text: 'd-----        19-11-2026     02:30                src' });
      newHistory.push({ type: 'output', text: 'd-----        19-11-2026     02:30                public' });
      newHistory.push({ type: 'output', text: '-a----        19-11-2026     02:30           1420 package.json' });
      newHistory.push({ type: 'output', text: '-a----        19-11-2026     02:30           1080 vite.config.js' });
    } else if (lower === 'node -v' || lower === 'node --version') {
      newHistory.push({ type: 'output', text: 'v20.18.0' });
    } else if (lower === 'whoami') {
      newHistory.push({ type: 'output', text: 'desktop-varun\\varun' });
    } else if (lower === 'help') {
      newHistory.push({ type: 'output', text: 'Available commands: git status, npm run dev, ls, dir, node -v, whoami, clear' });
    } else {
      newHistory.push({ type: 'output', text: `${cmd} : The term '${cmd}' is not recognized as a cmdlet, function, script file, or operable program.` });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  // Render file icon matching user screenshot
  const renderTabIcon = (iconType) => {
    if (iconType === 'css') {
      return <span className="tab-file-icon icon-css">{'{}'}</span>;
    }
    if (iconType === 'jsx') {
      return <span className="tab-file-icon icon-jsx">⚛</span>;
    }
    if (iconType === 'tex') {
      return <span className="tab-file-icon icon-tex">T</span>;
    }
    return <span className="tab-file-icon icon-default">📄</span>;
  };

  // Syntax highlighting parser with inline color preview swatches
  const renderSyntaxHighlightedLine = (line, lineNum) => {
    // Check if line contains a hex color code like '#38bdf8'
    const hexMatch = line.match(/(#[0-9a-fA-F]{3,8})/);
    const hexColor = hexMatch ? hexMatch[1] : null;

    // Check if line is a comment
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('%')) {
      return <span className="token-comment">{line}</span>;
    }

    // Split line into parts if it has inline hex color
    if (hexColor && (line.includes("color:") || line.includes("fill:"))) {
      const parts = line.split(hexColor);
      return (
        <span>
          {renderTokens(parts[0])}
          <span className="token-string">
            <span 
              className="inline-color-swatch" 
              style={{ backgroundColor: hexColor }} 
              title={`Color preview: ${hexColor}`}
            />
            {hexColor}
          </span>
          {parts.slice(1).map((part, pIdx) => (
            <React.Fragment key={pIdx}>
              {renderTokens(part)}
            </React.Fragment>
          ))}
        </span>
      );
    }

    return renderTokens(line);
  };

  const renderTokens = (text) => {
    const parts = text.split(/('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^`\\]|\\.)*`|\b(?:import|export|from|const|let|var|return|function|default|class|interface|type|async|await|new|if|else|switch|case|break)\b)/g);

    return parts.map((part, idx) => {
      if (!part) return null;
      if (part.startsWith("'") || part.startsWith('"') || part.startsWith('`')) {
        return <span key={idx} className="token-string">{part}</span>;
      }
      if (/^(import|export|from|const|let|var|return|function|default|class|interface|type|async|await|new|if|else|switch|case|break)$/.test(part)) {
        return <span key={idx} className="token-keyword">{part}</span>;
      }
      if (/^[0-9]+(\.[0-9]+)?$/.test(part)) {
        return <span key={idx} className="token-number">{part}</span>;
      }
      return <span key={idx} className="token-text">{part}</span>;
    });
  };

  return (
    <div className="vscode-window-shell">
      {/* 1. Top Menu Titlebar (Antigravity IDE - Reference Match) */}
      <header className="vscode-titlebar">
        <div className="titlebar-left">
          {/* Antigravity / IDE Logo Icon */}
          <div className="titlebar-app-icon" title="Antigravity IDE">
            <span className="antigravity-brand-a">A</span>
          </div>
          {/* Main Menus */}
          <nav className="titlebar-menu-items">
            <button className="menu-text-btn">File</button>
            <button className="menu-text-btn">Edit</button>
            <button className="menu-text-btn">Selection</button>
            <button className="menu-text-btn">View</button>
            <button className="menu-text-btn">Go</button>
            <button className="menu-text-btn">Run</button>
            <button className="menu-text-btn">Terminal</button>
            <button className="menu-text-btn">Help</button>
          </nav>
        </div>

        {/* Center File Title */}
        <div className="titlebar-center">
          <span className="titlebar-file-label">
            destop-portflio - Antigravity IDE - {activeFile}
          </span>
        </div>

        {/* Right Window & Layout Action Icons */}
        <div className="titlebar-right-controls">
          <button 
            className="titlebar-tool-btn" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle Primary Side Bar"
          >
            <Layout size={13} />
          </button>
          <button className="titlebar-tool-btn" title="Navigate Back">
            <ArrowLeft size={13} />
          </button>
          <button className="titlebar-tool-btn" title="Navigate Forward">
            <ArrowRight size={13} />
          </button>
          <button className="titlebar-tool-btn" title="More Actions">
            <MoreHorizontal size={13} />
          </button>
        </div>
      </header>

      {/* 2. Workspace Layout */}
      <div className="vscode-workspace-row">
        {/* Left Activity Bar */}
        <aside className="vscode-activity-bar">
          <div className="activity-group-top">
            <button 
              className={`activity-btn ${activeActivity === 'explorer' && sidebarOpen ? 'active' : ''}`}
              onClick={() => {
                if (activeActivity === 'explorer') {
                  setSidebarOpen(!sidebarOpen);
                } else {
                  setActiveActivity('explorer');
                  setSidebarOpen(true);
                }
              }}
              title="Explorer (Ctrl+Shift+E)"
            >
              <Files size={18} />
            </button>
            <button 
              className={`activity-btn ${activeActivity === 'search' && sidebarOpen ? 'active' : ''}`}
              onClick={() => {
                setActiveActivity('search');
                setSidebarOpen(true);
              }}
              title="Search (Ctrl+Shift+F)"
            >
              <Search size={18} />
            </button>
            <button 
              className={`activity-btn ${activeActivity === 'git' && sidebarOpen ? 'active' : ''}`}
              onClick={() => {
                setActiveActivity('git');
                setSidebarOpen(true);
              }}
              title="Source Control"
            >
              <GitBranch size={18} />
              <span className="activity-dot-badge" />
            </button>
            <button 
              className={`activity-btn ${activeActivity === 'debug' && sidebarOpen ? 'active' : ''}`}
              onClick={() => {
                setActiveActivity('debug');
                setSidebarOpen(true);
              }}
              title="Run and Debug"
            >
              <Play size={18} />
            </button>
            <button 
              className={`activity-btn ${activeActivity === 'extensions' && sidebarOpen ? 'active' : ''}`}
              onClick={() => {
                setActiveActivity('extensions');
                setSidebarOpen(true);
              }}
              title="Extensions"
            >
              <Package size={18} />
            </button>
            <button 
              className="activity-btn agent-btn"
              title="Antigravity AI Agent"
            >
              <Sparkles size={18} className="text-sky-400" />
            </button>
          </div>

          <div className="activity-group-bottom">
            <button className="activity-btn" title="Accounts">
              <User size={18} />
            </button>
            <button className="activity-btn" title="Manage Settings">
              <Settings size={18} />
            </button>
          </div>
        </aside>

        {/* Collapsible Primary Sidebar (Explorer) */}
        {sidebarOpen && (
          <aside className="vscode-primary-sidebar">
            <div className="sidebar-header-row">
              <span className="sidebar-title">EXPLORER</span>
              <span className="sidebar-more">•••</span>
            </div>
            <div className="sidebar-tree-container">
              <div className="tree-project-root">
                <ChevronDown size={14} />
                <span>DESTOP-PORTFLIO</span>
              </div>
              <div className="tree-branch-group">
                <div className="tree-item-folder">
                  <ChevronRight size={13} />
                  <span>.gemini</span>
                </div>
                <div className="tree-item-folder">
                  <ChevronRight size={13} />
                  <span>public</span>
                </div>
                <div className="tree-item-folder open">
                  <ChevronDown size={13} />
                  <span>src</span>
                </div>
                <div className="tree-item-folder sub open">
                  <ChevronDown size={13} />
                  <span>components</span>
                </div>
                {/* File Items */}
                {Object.keys(PROJECT_FILES).map((fileName) => {
                  const f = PROJECT_FILES[fileName];
                  const isActive = activeFile === fileName;
                  return (
                    <div
                      key={fileName}
                      className={`tree-item-file ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        if (!openTabs.includes(fileName)) {
                          setOpenTabs([...openTabs, fileName]);
                        }
                        setActiveFile(fileName);
                      }}
                    >
                      {renderTabIcon(f.icon)}
                      <span className="tree-file-name">{fileName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        {/* Main Editor & Terminal Area */}
        <main className="vscode-editor-main">
          {/* Tabs Bar */}
          <div className="vscode-tabs-bar">
            <div className="tabs-list-scroll">
              {openTabs.map((fileName) => {
                const f = PROJECT_FILES[fileName] || {};
                const isActive = activeFile === fileName;
                return (
                  <div
                    key={fileName}
                    className={`editor-tab-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveFile(fileName)}
                  >
                    {renderTabIcon(f.icon)}
                    <span className="tab-label">{fileName}</span>
                    <button
                      className="tab-close-icon"
                      onClick={(e) => handleCloseTab(e, fileName)}
                      title="Close"
                    >
                      <X size={11} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Right Tab Controls */}
            <div className="tabs-right-tools">
              <button className="tab-tool-btn" title="Split Editor Right">
                <Split size={13} />
              </button>
              <button className="tab-tool-btn" title="More Tab Actions">
                <MoreHorizontal size={13} />
              </button>
            </div>
          </div>

          {/* Breadcrumbs Row */}
          <div className="vscode-breadcrumbs-row">
            <span className="crumb-text">src</span>
            <span className="crumb-chevron">&gt;</span>
            <span className="crumb-text">components</span>
            <span className="crumb-chevron">&gt;</span>
            <span className="crumb-icon">{renderTabIcon(currentFile.icon)}</span>
            <span className="crumb-text active-crumb">{currentFile.name}</span>
            <span className="crumb-chevron">&gt;</span>
            <span className="crumb-text muted">...</span>
          </div>

          {/* Code Viewport with Gutter & Minimap */}
          <div className="vscode-code-viewport">
            <div className="code-editor-scrollable" ref={editorScrollRef}>
              <div className="code-lines-table">
                {codeLines.map((line, idx) => {
                  const lineNum = idx + 1;
                  const isCursor = lineNum === cursorLine;
                  return (
                    <div 
                      key={idx} 
                      className={`code-line-row ${isCursor ? 'cursor-active-line' : ''}`}
                      onClick={() => setCursorLine(lineNum)}
                    >
                      <div className="gutter-cell">
                        <span className="fold-icon">{line.includes('{') || line.includes('[') ? '⌄' : ''}</span>
                        <span className="line-num">{lineNum}</span>
                        <span className="git-status-gutter">{lineNum === 56 ? '+' : ''}</span>
                      </div>
                      <div className="code-text-cell">
                        {renderSyntaxHighlightedLine(line, lineNum)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Code Minimap (Right side) */}
            <div className="vscode-minimap-pane">
              <div className="minimap-viewport-slider" />
              <div className="minimap-content">
                {codeLines.slice(0, 75).map((l, idx) => (
                  <div
                    key={idx}
                    className="minimap-bar-line"
                    style={{
                      width: `${Math.min(95, Math.max(12, l.length * 1.5))}%`,
                      backgroundColor: l.includes('color:') ? '#38bdf8' : l.includes('const') ? '#c586c0' : 'rgba(255,255,255,0.18)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Integrated Terminal Panel */}
          {terminalOpen && (
            <div className="vscode-terminal-dock">
              {/* Terminal Header Tabs */}
              <div className="terminal-header-tabs">
                <div className="terminal-tab-group">
                  <button 
                    className={`terminal-tab-item ${terminalTab === 'problems' ? 'active' : ''}`}
                    onClick={() => setTerminalTab('problems')}
                  >
                    Problems
                  </button>
                  <button 
                    className={`terminal-tab-item ${terminalTab === 'output' ? 'active' : ''}`}
                    onClick={() => setTerminalTab('output')}
                  >
                    Output
                  </button>
                  <button 
                    className={`terminal-tab-item ${terminalTab === 'debug' ? 'active' : ''}`}
                    onClick={() => setTerminalTab('debug')}
                  >
                    Debug Console
                  </button>
                  <button 
                    className={`terminal-tab-item ${terminalTab === 'terminal' ? 'active' : ''}`}
                    onClick={() => setTerminalTab('terminal')}
                  >
                    Terminal
                  </button>
                  <button 
                    className={`terminal-tab-item ${terminalTab === 'ports' ? 'active' : ''}`}
                    onClick={() => setTerminalTab('ports')}
                  >
                    Ports
                  </button>
                  <button 
                    className={`terminal-tab-item ${terminalTab === 'comments' ? 'active' : ''}`}
                    onClick={() => setTerminalTab('comments')}
                  >
                    Comments
                  </button>
                </div>

                {/* Right Terminal Actions */}
                <div className="terminal-right-tools">
                  <div className="term-shell-pill">
                    <span className="shell-type-icon">powershell</span>
                    <ChevronDown size={11} />
                  </div>
                  <button className="term-ctrl-btn" title="New Terminal">+</button>
                  <button className="term-ctrl-btn" title="Split Terminal">
                    <Split size={12} />
                  </button>
                  <button className="term-ctrl-btn" title="Maximize Panel">
                    <Maximize2 size={12} />
                  </button>
                  <button 
                    className="term-ctrl-btn" 
                    onClick={() => setTerminalOpen(false)}
                    title="Close Terminal"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

              {/* Terminal Console Output */}
              <div 
                className="terminal-console-body"
                onClick={() => terminalInputRef.current?.focus()}
              >
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className={`term-msg-row ${item.type}`}>
                    <span>{item.text}</span>
                  </div>
                ))}

                {/* Interactive Prompt Line */}
                <form className="term-live-prompt" onSubmit={handleTerminalSubmit}>
                  <span className="term-circle-badge">o</span>
                  <span className="term-powershell-text">PS</span>
                  <span className="term-path-text">C:\\Users\\Varun\\Downloads\\destop-portflio&gt;</span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    className="term-cmd-input"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <span className="term-blinking-cursor">|</span>
                </form>
              </div>
            </div>
          )}

          {/* 4. Bottom Status Bar */}
          <footer className="vscode-statusbar">
            <div className="statusbar-left">
              <span className="status-badge remote" title="WSL / Remote Window">
                &gt;&lt;
              </span>
              <span className="status-item git-branch">
                <GitBranch size={11} />
                <span>main*</span>
              </span>
              <span className="status-item diagnostics">
                <span>⊗ 0</span>
                <span>⚠ 0</span>
              </span>
            </div>

            <div className="statusbar-right">
              <span className="status-item">Ln {cursorLine}, Col {cursorCol}</span>
              <span className="status-item">Spaces: 2</span>
              <span className="status-item">UTF-8</span>
              <span className="status-item lang-mode">{currentFile.lang}</span>
              <span className="status-item prettier">Prettier: ✓</span>
              <span className="status-item bell">
                <Bell size={11} />
              </span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default VsCodeApp;
