// Visual Studio Code / Antigravity IDE Emulation Engine
import React, { useState, useRef, useEffect } from 'react';
import {
  Files,
  Search,
  GitBranch,
  Play,
  Package,
  Settings,
  User,
  Sparkles,
  ChevronRight,
  ChevronDown,
  X,
  Split,
  Layout,
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
  ExternalLink,
  Globe,
  Terminal as TerminalIcon,
  Check,
  Plus,
  RotateCw,
  Trash2,
  Bug,
  Code,
  Copy,
  Maximize2,
  Minimize2,
  Folder,
  FolderPlus,
  FilePlus,
  Send,
  Info,
  AlertCircle,
  Filter,
  Layers
} from 'lucide-react';
import './VsCodeApp.css';

// Runnable starter script for instant execution
const DEFAULT_APP_JS = `// VarunOS Antigravity IDE — Live JavaScript Execution Engine
// Click "▶ Run Code" above (or press Ctrl+Enter) to execute!

function calculateProjectMetrics() {
  const projects = [
    { name: "CodeSrijan Hackathon", hackers: 200, rating: 4.9 },
    { name: "EventFlow Ticketing", users: 1250, rating: 4.8 },
    { name: "Expensify Budget App", logs: 4500, rating: 4.95 }
  ];

  console.log("🚀 Initializing VarunOS Developer Environment...");
  console.log("Timestamp:", new Date().toLocaleTimeString());
  console.log("--------------------------------------------------");

  let totalReach = 0;
  projects.forEach((proj, idx) => {
    const metric = proj.hackers || proj.users || proj.logs;
    totalReach += metric;
    console.log(\`[\${idx + 1}] \${proj.name} -> \${metric} active users (★ \${proj.rating})\`);
  });

  console.log("--------------------------------------------------");
  console.log("Total Impact Reach:", totalReach.toLocaleString(), "users");
  
  // Array sorting and transformation test
  const skills = ["UI/UX", "Next.js", "Design Systems", "TypeScript", "Tailwind CSS"];
  const formatted = skills.map(s => \`⚡ \${s}\`).join(" | ");
  console.log("Active Skill Matrix:", formatted);

  return { status: "success", code: 200, totalReach };
}

calculateProjectMetrics();
`;

// TerminalApp.jsx source code
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

const TerminalApp = ({ userName = 'Guest', onOpenApp }) => {
  const [history, setHistory] = useState(WELCOME_BANNER);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);

  return (
    <div className="terminal-container">
      {/* Interactive terminal output */}
    </div>
  );
};
export default TerminalApp;`;

// FinderApp.css source code matching screenshot
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

// SafariApp.jsx code
const SAFARI_APP_CODE = `import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Share2, Lock, ExternalLink, Globe } from 'lucide-react';
import './SafariApp.css';

export const SafariApp = () => {
  const [url, setUrl] = useState('http://codesrijan-nine.vercel.app/');
  return (
    <div className="safari-root">
      <header className="safari-toolbar">
        <div className="nav-buttons"><ArrowLeft size={14} /></div>
      </header>
    </div>
  );
};
export default SafariApp;`;

// Resume TeX code
const RESUME_TEX_CODE = `%-------------------------
% ATS-Optimized Resume
% Author: Varun Sehgal
% Role: UI/UX Designer | Product Designer
%-------------------------
\\documentclass[letterpaper,10.5pt]{article}
\\begin{document}
\\begin{center}
    {\\Large \\textbf{VARUN SEHGAL}} \\\\
    \\small UI/UX Designer \\textbar{} Product Designer \\\\
    \\small Gwalior, Madhya Pradesh, India \\quad +91-9399361193 \\quad varun.sehgal02@gmail.com
\\end{center}
\\section{Professional Summary}
UI/UX & Product Designer with 3+ years of experience delivering high-impact SaaS and AI product experiences.
\\end{document}
`;

// Portfolio config TS code
const PORTFOLIO_CONFIG_CODE = `export const PORTFOLIO_METADATA = {
  name: "Varun Sehgal",
  role: "UI/UX & Product Designer | Frontend Engineer",
  location: "Gwalior, Madhya Pradesh, India",
  contact: {
    phone: "+91-9399361193",
    email: "varun.sehgal02@gmail.com",
    portfolioUrl: "https://varunsehgal.runs-on.dev",
    github: "https://github.com/varunsehgal05"
  }
};
`;

// Initial files dictionary
const INITIAL_PROJECT_FILES = {
  'app.js': {
    name: 'app.js',
    path: 'src > app.js',
    icon: 'js',
    lang: 'JavaScript',
    code: DEFAULT_APP_JS
  },
  'TerminalApp.jsx': {
    name: 'TerminalApp.jsx',
    path: 'src > components > ⚛ TerminalApp.jsx',
    icon: 'jsx',
    lang: 'TypeScript React',
    code: TERMINAL_APP_CODE
  },
  'Live Preview: CodeSrijan': {
    name: 'Live Preview: CodeSrijan',
    path: 'codesrijan > 🌐 http://codesrijan-nine.vercel.app/',
    icon: 'globe',
    lang: 'Live Webview',
    isWebview: true,
    code: ''
  },
  'codesrijan/page.tsx': {
    name: 'codesrijan/page.tsx',
    path: 'codesrijan > app > ⚛ page.tsx',
    icon: 'jsx',
    lang: 'TypeScript React',
    code: `// CodeSrijan Hackathon Portal\nexport default function Page() {\n  return <div>CodeSrijan Hackathon 72h Sprint</div>;\n}`
  },
  'portfolio.config.ts': {
    name: 'portfolio.config.ts',
    path: 'src > config > 📄 portfolio.config.ts',
    icon: 'ts',
    lang: 'TypeScript',
    code: PORTFOLIO_CONFIG_CODE
  },
  'Varun_Sehgal_Resume_Updated.tex': {
    name: 'Varun_Sehgal_Resume_Updated.tex',
    path: 'root > Varun_Sehgal_Resume_Updated.tex',
    icon: 'tex',
    lang: 'LaTeX',
    code: RESUME_TEX_CODE
  },
  'FinderApp.css': {
    name: 'FinderApp.css',
    path: 'src > components > FinderApp.css',
    icon: 'css',
    lang: 'CSS',
    code: FINDER_CSS_CODE
  },
  'SafariApp.jsx': {
    name: 'SafariApp.jsx',
    path: 'src > components > ⚛ SafariApp.jsx',
    icon: 'jsx',
    lang: 'TypeScript React',
    code: SAFARI_APP_CODE
  }
};

const INITIAL_EXTENSIONS = [
  { id: 'prettier', name: 'Prettier - Code formatter', author: 'Esben Petersen', version: 'v10.4.0', installs: '42.8M', rating: '4.8', desc: 'Opinionated code formatter for JS, TS, HTML, CSS.', installed: true },
  { id: 'eslint', name: 'ESLint', author: 'Microsoft', version: 'v2.4.2', installs: '34.2M', rating: '4.7', desc: 'Integrates ESLint JavaScript into VS Code.', installed: true },
  { id: 'tailwind', name: 'Tailwind CSS IntelliSense', author: 'Tailwind Labs', version: 'v0.12.0', installs: '18.5M', rating: '4.9', desc: 'Intelligent Tailwind CSS tooling for VS Code.', installed: true },
  { id: 'python', name: 'Python', author: 'Microsoft', version: 'v2026.1.0', installs: '112M', rating: '4.7', desc: 'IntelliSense, linting, debugging, code formatting for Python.', installed: false },
  { id: 'snippets', name: 'JavaScript (ES6) code snippets', author: 'charalampos karypidis', version: 'v1.8.0', installs: '16.1M', rating: '4.6', desc: 'Code snippets for JavaScript in ES6 syntax.', installed: true },
  { id: 'tokyo', name: 'Tokyo Night', author: 'enkia', version: 'v1.0.8', installs: '1.4M', rating: '4.9', desc: 'A clean Visual Studio Code theme that celebrates dark aesthetics.', installed: false }
];

export const VsCodeApp = () => {
  // File System State
  const [projectFiles, setProjectFiles] = useState(INITIAL_PROJECT_FILES);
  const [activeFile, setActiveFile] = useState('FinderApp.css');
  const [openTabs, setOpenTabs] = useState([
    'TerminalApp.jsx',
    'Live Preview: CodeSrijan',
    'codesrijan/page.tsx',
    'portfolio.config.ts',
    'Varun_Sehgal_Resume_Updated.tex',
    'FinderApp.css',
    'SafariApp.jsx'
  ]);

  // Sidebar & Layout State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeActivity, setActiveActivity] = useState('explorer'); // 'explorer' | 'search' | 'git' | 'debug' | 'extensions' | 'agent'
  const [activeTopMenu, setActiveTopMenu] = useState(null); // 'file' | 'edit' | 'selection' | 'view' | 'go' | 'run' | 'terminal' | 'help'

  // Code Editor State
  const [cursorLine, setCursorLine] = useState(1);
  const [cursorCol, setCursorCol] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const editorTextareaRef = useRef(null);

  // Terminal & Output Dock State
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [terminalTab, setTerminalTab] = useState('terminal'); // 'problems' | 'output' | 'debug' | 'terminal' | 'ports' | 'comments'
  const [terminalHeight, setTerminalHeight] = useState(180);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: 'Microsoft Windows [Version 10.0.22631.4460]' },
    { type: 'output', text: '(c) Microsoft Corporation. All rights reserved.' },
    { type: 'output', text: '' }
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalInputRef = useRef(null);

  // Additional Panels State
  const [outputLogs, setOutputLogs] = useState('[Ready] Antigravity IDE Live Execution Environment Initialized.\n');
  const [debugLogs, setDebugLogs] = useState([
    { type: 'system', text: 'Debug Console connected to Node.js v20.18.0 / VarunOS Sandbox' }
  ]);
  const [debugInput, setDebugInput] = useState('');
  const [problems, setProblems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [gitCommitMsg, setGitCommitMsg] = useState('');
  const [gitStatus, setGitStatus] = useState({ staged: ['src/components/FinderApp.css'], modified: ['src/components/VsCodeApp.jsx'], branch: 'main' });
  const [extensions, setExtensions] = useState(INITIAL_EXTENSIONS);
  const [agentMessages, setAgentMessages] = useState([
    { sender: 'assistant', text: 'Hello Varun! I am your Antigravity AI Code Assistant. Ask me to write functions, explain code, or run test benchmarks.' }
  ]);
  const [agentInput, setAgentInput] = useState('');

  // Close top menu when clicking outside
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (!e.target.closest('.menu-dropdown-wrapper')) {
        setActiveTopMenu(null);
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const currentFile = projectFiles[activeFile] || projectFiles['FinderApp.css'] || {};
  const currentCode = currentFile.code || '';
  const codeLines = currentCode ? currentCode.split('\n') : [''];

  // Handle Code Changes in Active File
  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setProjectFiles(prev => ({
      ...prev,
      [activeFile]: {
        ...prev[activeFile],
        code: newCode
      }
    }));
  };

  // Close Tab
  const handleCloseTab = (e, fileName) => {
    e.stopPropagation();
    const remaining = openTabs.filter(t => t !== fileName);
    setOpenTabs(remaining);
    if (activeFile === fileName && remaining.length > 0) {
      setActiveFile(remaining[0]);
    }
  };

  // Create a New File
  const handleCreateNewFile = (customName) => {
    const fileName = customName || prompt('Enter file name (e.g. script.js, main.py, styles.css):', 'test.js');
    if (!fileName || !fileName.trim()) return;

    const trimmed = fileName.trim();
    const isJS = trimmed.endsWith('.js') || trimmed.endsWith('.ts');
    const isPy = trimmed.endsWith('.py');
    const defaultCode = isJS
      ? `// ${trimmed}\nconsole.log("Running ${trimmed} in VarunOS!");\nconst sum = [10, 20, 30].reduce((a, b) => a + b, 0);\nconsole.log("Sum:", sum);\n`
      : isPy
      ? `# ${trimmed}\nprint("Hello from Python 3.12 in VarunOS!")\nprint(f"Calculation: 2 ** 8 = {2 ** 8}")\n`
      : `/* ${trimmed} */\nbody {\n  margin: 0;\n}\n`;

    setProjectFiles(prev => ({
      ...prev,
      [trimmed]: {
        name: trimmed,
        path: `src > ${trimmed}`,
        icon: isJS ? 'js' : isPy ? 'py' : 'default',
        lang: isJS ? 'JavaScript' : isPy ? 'Python' : 'Plain Text',
        code: defaultCode
      }
    }));

    if (!openTabs.includes(trimmed)) {
      setOpenTabs([...openTabs, trimmed]);
    }
    setActiveFile(trimmed);
  };

  // =========================================================================
  // REAL CODE EXECUTION ENGINE
  // =========================================================================
  const executeCode = (codeToRun = currentCode, fileName = activeFile) => {
    setIsRunning(true);
    setTerminalOpen(true);
    setTerminalTab('output');

    const startTime = performance.now();
    const isJS = fileName.endsWith('.js') || fileName.endsWith('.jsx') || fileName.endsWith('.ts') || fileName.endsWith('.tsx');
    const isPy = fileName.endsWith('.py');

    const logs = [];
    logs.push(`[Running] ${isPy ? 'python -u' : 'node'} "${fileName}"`);
    logs.push('--------------------------------------------------');

    let hasError = false;

    if (isJS) {
      // Sandboxed execution capturing console outputs
      const capturedConsole = {
        log: (...args) => {
          logs.push(args.map(a => (typeof a === 'object' && a !== null ? JSON.stringify(a, null, 2) : String(a))).join(' '));
        },
        info: (...args) => {
          logs.push('[INFO] ' + args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
        },
        warn: (...args) => {
          logs.push('[WARN] ' + args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
        },
        error: (...args) => {
          logs.push('[ERROR] ' + args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
        }
      };

      try {
        let cleanCode = codeToRun;
        // Strip ES import/export syntax for clean dynamic evaluation
        cleanCode = cleanCode.replace(/import\s+.*from\s+['"].*['"];?/g, '// [import resolved]');
        cleanCode = cleanCode.replace(/export\s+default\s+/g, '');
        cleanCode = cleanCode.replace(/export\s+(const|let|var|function|class)\s+/g, '$1 ');

        // Execute inside Function constructor with console override
        const runFn = new Function('console', cleanCode);
        const retVal = runFn(capturedConsole);

        if (retVal !== undefined) {
          logs.push(`➜ Returned: ${typeof retVal === 'object' && retVal !== null ? JSON.stringify(retVal, null, 2) : String(retVal)}`);
        }
        setProblems([]);
      } catch (err) {
        hasError = true;
        logs.push(`[Runtime Error] ${err.toString()}`);
        setProblems([{
          file: fileName,
          message: err.toString(),
          line: cursorLine,
          severity: 'error'
        }]);
      }
    } else if (isPy) {
      // Python simulated runner parsing print statements & math
      logs.push('Python 3.12.2 (main, VarunOS Virtual Env)');
      const lines = codeToRun.split('\n');
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
          const inner = trimmed.substring(6, trimmed.length - 1);
          try {
            // Strip quotes if simple string
            if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
              logs.push(inner.slice(1, -1));
            } else {
              logs.push(inner);
            }
          } catch {
            logs.push(inner);
          }
        }
      });
      setProblems([]);
    } else {
      logs.push(`Compiled & verified "${fileName}": Syntax valid (0 diagnostics).`);
      setProblems([]);
    }

    const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
    logs.push('--------------------------------------------------');
    logs.push(`[Done] exited with code=${hasError ? 1 : 0} in ${elapsed}s\n`);

    const outputText = logs.join('\n');
    setOutputLogs(prev => prev + '\n' + outputText);

    // Also mirror to terminal history
    setTerminalHistory(prev => [
      ...prev,
      { type: 'command', text: `PS C:\\Users\\Varun\\Downloads\\destop-portflio> ${isPy ? 'python' : 'node'} ${fileName}` },
      ...logs.map(l => ({ type: l.startsWith('[Runtime Error]') ? 'error' : 'output', text: l }))
    ]);

    setTimeout(() => setIsRunning(false), 200);
  };

  // Keyboard shortcut: Ctrl+Enter or F5 to Run Code
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        executeCode();
      } else if (e.key === 'F5') {
        e.preventDefault();
        executeCode();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCode, activeFile]);

  // Terminal Shell Submission
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    setCmdHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    const newHistory = [
      ...terminalHistory,
      { type: 'command', text: `PS C:\\Users\\Varun\\Downloads\\destop-portflio> ${cmd}` }
    ];

    const lower = cmd.toLowerCase();
    if (lower === 'clear' || lower === 'cls') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (lower === 'run' || lower === 'node' || lower === `node ${activeFile.toLowerCase()}`) {
      executeCode();
      setTerminalInput('');
      return;
    } else if (lower.startsWith('node ')) {
      const targetFile = cmd.slice(5).trim();
      if (projectFiles[targetFile]) {
        executeCode(projectFiles[targetFile].code, targetFile);
      } else {
        newHistory.push({ type: 'output', text: `Error: Cannot find module 'C:\\Users\\Varun\\Downloads\\destop-portflio\\${targetFile}'` });
      }
    } else if (lower.startsWith('cat ') || lower.startsWith('type ')) {
      const targetFile = cmd.split(' ')[1]?.trim();
      if (targetFile && projectFiles[targetFile]) {
        newHistory.push({ type: 'output', text: projectFiles[targetFile].code });
      } else if (targetFile === 'resume') {
        newHistory.push({ type: 'output', text: RESUME_TEX_CODE });
      } else {
        newHistory.push({ type: 'output', text: `File not found: ${targetFile}` });
      }
    } else if (lower === 'ls' || lower === 'dir') {
      newHistory.push({ type: 'output', text: '    Directory: C:\\Users\\Varun\\Downloads\\destop-portflio' });
      newHistory.push({ type: 'output', text: 'Mode                 LastWriteTime         Length Name' });
      newHistory.push({ type: 'output', text: 'd-----        20-11-2026     00:45                src' });
      newHistory.push({ type: 'output', text: 'd-----        20-11-2026     00:45                codesrijan' });
      Object.keys(projectFiles).forEach(f => {
        newHistory.push({ type: 'output', text: `-a----        20-11-2026     00:45           ${projectFiles[f].code.length} ${f}` });
      });
    } else if (lower === 'whoami') {
      newHistory.push({ type: 'output', text: 'varunos\\varun.sehgal (Lead UI/UX & Product Designer)' });
    } else if (lower === 'git status') {
      newHistory.push({ type: 'output', text: 'On branch main' });
      newHistory.push({ type: 'output', text: "Your branch is up to date with 'origin/main'." });
      newHistory.push({ type: 'output', text: 'Changes to be committed: (all 15 modules synchronized)' });
    } else if (lower === 'git log') {
      newHistory.push({ type: 'output', text: 'commit 97f7cc6 (HEAD -> main, origin/main)' });
      newHistory.push({ type: 'output', text: 'Author: Varun Sehgal <varun.sehgal02@gmail.com>' });
      newHistory.push({ type: 'output', text: 'Date:   Thu Nov 20 00:30:40 2026 +0530' });
      newHistory.push({ type: 'output', text: '    feat: complete overhaul of 4 top-bar options (profile dropdown, snappy swarm rebuild)' });
    } else if (lower === 'npm run dev' || lower === 'npm start') {
      newHistory.push({ type: 'output', text: '> destop-portflio@0.0.0 dev' });
      newHistory.push({ type: 'output', text: '> vite' });
      newHistory.push({ type: 'output', text: '  VITE v8.3.2  ready in 180 ms' });
      newHistory.push({ type: 'output', text: '  ➜  Local:   http://localhost:5173/' });
      newHistory.push({ type: 'output', text: '  ➜  Network: http://192.168.1.15:5173/' });
    } else if (lower === 'help') {
      newHistory.push({ type: 'output', text: 'Available commands: run, node <file>, cat <file>, ls, git status, git log, npm run dev, whoami, clear' });
    } else {
      newHistory.push({ type: 'output', text: `${cmd} : The term '${cmd}' is not recognized as a cmdlet, function, script file, or operable program.` });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  // Debug Console Evaluator
  const handleDebugEval = (e) => {
    e.preventDefault();
    const expr = debugInput.trim();
    if (!expr) return;

    let res;
    try {
      res = (0, eval)(expr);
      setDebugLogs(prev => [
        ...prev,
        { type: 'input', text: `> ${expr}` },
        { type: 'output', text: typeof res === 'object' && res !== null ? JSON.stringify(res, null, 2) : String(res) }
      ]);
    } catch (err) {
      setDebugLogs(prev => [
        ...prev,
        { type: 'input', text: `> ${expr}` },
        { type: 'error', text: err.toString() }
      ]);
    }
    setDebugInput('');
  };

  // Render tab icons
  const renderTabIcon = (iconType) => {
    if (iconType === 'css') return <span className="tab-file-icon icon-css">{'{}'}</span>;
    if (iconType === 'jsx') return <span className="tab-file-icon icon-jsx">⚛</span>;
    if (iconType === 'ts') return <span className="tab-file-icon icon-ts text-[#38bdf8] font-bold text-[10.5px]">TS</span>;
    if (iconType === 'js') return <span className="tab-file-icon icon-js text-[#facc15] font-bold text-[10.5px]">JS</span>;
    if (iconType === 'py') return <span className="tab-file-icon icon-py text-[#38bdf8] font-bold text-[10.5px]">PY</span>;
    if (iconType === 'tex') return <span className="tab-file-icon icon-tex">T</span>;
    if (iconType === 'globe') return <span className="tab-file-icon icon-globe text-emerald-400">🌐</span>;
    return <span className="tab-file-icon icon-default">📄</span>;
  };

  return (
    <div className="vscode-window-shell">
      {/* 1. Top Menu Titlebar (Antigravity IDE - Reference Match) */}
      <header className="vscode-titlebar">
        <div className="titlebar-left">
          <div className="titlebar-app-icon" title="Antigravity IDE">
            <span className="antigravity-brand-a">A</span>
          </div>

          <nav className="titlebar-menu-items">
            {/* File Menu */}
            <div className="menu-dropdown-wrapper">
              <button 
                className={`menu-text-btn ${activeTopMenu === 'file' ? 'active' : ''}`}
                onClick={() => setActiveTopMenu(activeTopMenu === 'file' ? null : 'file')}
              >
                File
              </button>
              {activeTopMenu === 'file' && (
                <div className="vscode-dropdown-panel">
                  <div className="vscode-menu-item" onClick={() => { handleCreateNewFile(); setActiveTopMenu(null); }}>
                    <span>New File...</span> <span className="menu-shortcut">Ctrl+N</span>
                  </div>
                  <div className="vscode-menu-item" onClick={() => { handleCreateNewFile('app.js'); setActiveTopMenu(null); }}>
                    <span>New Scratch Script (app.js)</span> <span className="menu-shortcut">Alt+N</span>
                  </div>
                  <div className="vscode-menu-divider" />
                  <div className="vscode-menu-item" onClick={() => { setActiveTopMenu(null); }}>
                    <span>Save</span> <span className="menu-shortcut">Ctrl+S</span>
                  </div>
                  <div className="vscode-menu-item" onClick={() => { handleCloseTab({ stopPropagation: () => {} }, activeFile); setActiveTopMenu(null); }}>
                    <span>Close Editor</span> <span className="menu-shortcut">Ctrl+W</span>
                  </div>
                  <div className="vscode-menu-item" onClick={() => { setOpenTabs([]); setActiveTopMenu(null); }}>
                    <span>Close All Editors</span> <span className="menu-shortcut">Ctrl+K W</span>
                  </div>
                </div>
              )}
            </div>

            {/* Edit Menu */}
            <div className="menu-dropdown-wrapper">
              <button 
                className={`menu-text-btn ${activeTopMenu === 'edit' ? 'active' : ''}`}
                onClick={() => setActiveTopMenu(activeTopMenu === 'edit' ? null : 'edit')}
              >
                Edit
              </button>
              {activeTopMenu === 'edit' && (
                <div className="vscode-dropdown-panel">
                  <div className="vscode-menu-item" onClick={() => setActiveTopMenu(null)}>
                    <span>Undo</span> <span className="menu-shortcut">Ctrl+Z</span>
                  </div>
                  <div className="vscode-menu-item" onClick={() => setActiveTopMenu(null)}>
                    <span>Redo</span> <span className="menu-shortcut">Ctrl+Y</span>
                  </div>
                  <div className="vscode-menu-divider" />
                  <div className="vscode-menu-item" onClick={() => { setActiveActivity('search'); setSidebarOpen(true); setActiveTopMenu(null); }}>
                    <span>Find & Replace in Files</span> <span className="menu-shortcut">Ctrl+Shift+F</span>
                  </div>
                </div>
              )}
            </div>

            {/* Selection Menu */}
            <div className="menu-dropdown-wrapper">
              <button 
                className={`menu-text-btn ${activeTopMenu === 'selection' ? 'active' : ''}`}
                onClick={() => setActiveTopMenu(activeTopMenu === 'selection' ? null : 'selection')}
              >
                Selection
              </button>
              {activeTopMenu === 'selection' && (
                <div className="vscode-dropdown-panel">
                  <div className="vscode-menu-item" onClick={() => { editorTextareaRef.current?.select(); setActiveTopMenu(null); }}>
                    <span>Select All</span> <span className="menu-shortcut">Ctrl+A</span>
                  </div>
                </div>
              )}
            </div>

            {/* View Menu */}
            <div className="menu-dropdown-wrapper">
              <button 
                className={`menu-text-btn ${activeTopMenu === 'view' ? 'active' : ''}`}
                onClick={() => setActiveTopMenu(activeTopMenu === 'view' ? null : 'view')}
              >
                View
              </button>
              {activeTopMenu === 'view' && (
                <div className="vscode-dropdown-panel">
                  <div className="vscode-menu-item" onClick={() => { setActiveActivity('explorer'); setSidebarOpen(true); setActiveTopMenu(null); }}>
                    <span>Explorer</span> <span className="menu-shortcut">Ctrl+Shift+E</span>
                  </div>
                  <div className="vscode-menu-item" onClick={() => { setActiveActivity('search'); setSidebarOpen(true); setActiveTopMenu(null); }}>
                    <span>Search</span> <span className="menu-shortcut">Ctrl+Shift+F</span>
                  </div>
                  <div className="vscode-menu-item" onClick={() => { setActiveActivity('git'); setSidebarOpen(true); setActiveTopMenu(null); }}>
                    <span>Source Control</span> <span className="menu-shortcut">Ctrl+Shift+G</span>
                  </div>
                  <div className="vscode-menu-item" onClick={() => { setActiveActivity('debug'); setSidebarOpen(true); setActiveTopMenu(null); }}>
                    <span>Run and Debug</span> <span className="menu-shortcut">Ctrl+Shift+D</span>
                  </div>
                  <div className="vscode-menu-item" onClick={() => { setActiveActivity('extensions'); setSidebarOpen(true); setActiveTopMenu(null); }}>
                    <span>Extensions</span> <span className="menu-shortcut">Ctrl+Shift+X</span>
                  </div>
                  <div className="vscode-menu-divider" />
                  <div className="vscode-menu-item" onClick={() => { setTerminalOpen(!terminalOpen); setActiveTopMenu(null); }}>
                    <span>Toggle Terminal</span> <span className="menu-shortcut">Ctrl+`</span>
                  </div>
                </div>
              )}
            </div>

            {/* Go Menu */}
            <div className="menu-dropdown-wrapper">
              <button 
                className={`menu-text-btn ${activeTopMenu === 'go' ? 'active' : ''}`}
                onClick={() => setActiveTopMenu(activeTopMenu === 'go' ? null : 'go')}
              >
                Go
              </button>
              {activeTopMenu === 'go' && (
                <div className="vscode-dropdown-panel">
                  <div className="vscode-menu-item" onClick={() => { setActiveActivity('search'); setSidebarOpen(true); setActiveTopMenu(null); }}>
                    <span>Go to File...</span> <span className="menu-shortcut">Ctrl+P</span>
                  </div>
                </div>
              )}
            </div>

            {/* Run Menu */}
            <div className="menu-dropdown-wrapper">
              <button 
                className={`menu-text-btn ${activeTopMenu === 'run' ? 'active' : ''}`}
                onClick={() => setActiveTopMenu(activeTopMenu === 'run' ? null : 'run')}
              >
                Run
              </button>
              {activeTopMenu === 'run' && (
                <div className="vscode-dropdown-panel">
                  <div className="vscode-menu-item" onClick={() => { executeCode(); setActiveTopMenu(null); }}>
                    <span>▶ Run Without Debugging</span> <span className="menu-shortcut">Ctrl+Enter</span>
                  </div>
                  <div className="vscode-menu-item" onClick={() => { executeCode(); setActiveTopMenu(null); }}>
                    <span>Start Debugging</span> <span className="menu-shortcut">F5</span>
                  </div>
                  <div className="vscode-menu-divider" />
                  <div className="vscode-menu-item" onClick={() => { setOutputLogs(''); setActiveTopMenu(null); }}>
                    <span>Clear Output</span>
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Menu */}
            <div className="menu-dropdown-wrapper">
              <button 
                className={`menu-text-btn ${activeTopMenu === 'terminal' ? 'active' : ''}`}
                onClick={() => setActiveTopMenu(activeTopMenu === 'terminal' ? null : 'terminal')}
              >
                Terminal
              </button>
              {activeTopMenu === 'terminal' && (
                <div className="vscode-dropdown-panel">
                  <div className="vscode-menu-item" onClick={() => { setTerminalOpen(true); setTerminalTab('terminal'); setActiveTopMenu(null); }}>
                    <span>New Terminal</span> <span className="menu-shortcut">Ctrl+Shift+`</span>
                  </div>
                  <div className="vscode-menu-item" onClick={() => { setTerminalHistory([]); setActiveTopMenu(null); }}>
                    <span>Clear Terminal</span>
                  </div>
                  <div className="vscode-menu-item" onClick={() => { executeCode(); setActiveTopMenu(null); }}>
                    <span>Run Active File</span>
                  </div>
                </div>
              )}
            </div>

            {/* Help Menu */}
            <div className="menu-dropdown-wrapper">
              <button 
                className={`menu-text-btn ${activeTopMenu === 'help' ? 'active' : ''}`}
                onClick={() => setActiveTopMenu(activeTopMenu === 'help' ? null : 'help')}
              >
                Help
              </button>
              {activeTopMenu === 'help' && (
                <div className="vscode-dropdown-panel">
                  <div className="vscode-menu-item" onClick={() => { alert('Visual Studio Code — Antigravity IDE Emulation\nBuilt by Varun Sehgal\nVersion: 1.95.3 (Universal)\nOS: VarunOS Sequoia M3 Max'); setActiveTopMenu(null); }}>
                    <span>About Antigravity IDE</span>
                  </div>
                  <div className="vscode-menu-item" onClick={() => { window.open('https://github.com/varunsehgal05', '_blank'); setActiveTopMenu(null); }}>
                    <span>Varun Sehgal GitHub ↗</span>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="titlebar-center">
          <span className="titlebar-file-label">
            destop-portflio · Antigravity IDE · {activeFile}
          </span>
        </div>

        <div className="titlebar-right-controls">
          <button 
            className="titlebar-tool-btn" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle Primary Side Bar (Ctrl+B)"
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
                if (activeActivity === 'explorer') setSidebarOpen(!sidebarOpen);
                else { setActiveActivity('explorer'); setSidebarOpen(true); }
              }}
              title="Explorer (Ctrl+Shift+E)"
            >
              <Files size={18} />
            </button>
            <button 
              className={`activity-btn ${activeActivity === 'search' && sidebarOpen ? 'active' : ''}`}
              onClick={() => {
                if (activeActivity === 'search') setSidebarOpen(!sidebarOpen);
                else { setActiveActivity('search'); setSidebarOpen(true); }
              }}
              title="Search (Ctrl+Shift+F)"
            >
              <Search size={18} />
            </button>
            <button 
              className={`activity-btn ${activeActivity === 'git' && sidebarOpen ? 'active' : ''}`}
              onClick={() => {
                if (activeActivity === 'git') setSidebarOpen(!sidebarOpen);
                else { setActiveActivity('git'); setSidebarOpen(true); }
              }}
              title="Source Control"
            >
              <GitBranch size={18} />
              <span className="activity-dot-badge" />
            </button>
            <button 
              className={`activity-btn ${activeActivity === 'debug' && sidebarOpen ? 'active' : ''}`}
              onClick={() => {
                if (activeActivity === 'debug') setSidebarOpen(!sidebarOpen);
                else { setActiveActivity('debug'); setSidebarOpen(true); }
              }}
              title="Run and Debug (Ctrl+Shift+D)"
            >
              <Play size={18} />
            </button>
            <button 
              className={`activity-btn ${activeActivity === 'extensions' && sidebarOpen ? 'active' : ''}`}
              onClick={() => {
                if (activeActivity === 'extensions') setSidebarOpen(!sidebarOpen);
                else { setActiveActivity('extensions'); setSidebarOpen(true); }
              }}
              title="Extensions (Ctrl+Shift+X)"
            >
              <Package size={18} />
            </button>
            <button 
              className={`activity-btn agent-btn ${activeActivity === 'agent' && sidebarOpen ? 'active' : ''}`}
              onClick={() => {
                if (activeActivity === 'agent') setSidebarOpen(!sidebarOpen);
                else { setActiveActivity('agent'); setSidebarOpen(true); }
              }}
              title="Antigravity AI Code Assistant"
            >
              <Sparkles size={18} className="text-sky-400" />
            </button>
          </div>

          <div className="activity-group-bottom">
            <button 
              className="activity-btn" 
              title="Accounts: Varun Sehgal (GitHub @varunsehgal05)"
              onClick={() => alert('Signed in as Varun Sehgal\nGitHub: @varunsehgal05\nRole: Lead UI/UX & Product Designer')}
            >
              <User size={18} />
            </button>
            <button 
              className="activity-btn" 
              title="Manage Settings"
              onClick={() => { setActiveActivity('explorer'); setSidebarOpen(true); }}
            >
              <Settings size={18} />
            </button>
          </div>
        </aside>

        {/* Collapsible Primary Sidebar (Multi-Tab Sidebars) */}
        {sidebarOpen && (
          <aside className="vscode-primary-sidebar">
            {/* 1. EXPLORER SIDEBAR */}
            {activeActivity === 'explorer' && (
              <>
                <div className="sidebar-header-row">
                  <span className="sidebar-title">EXPLORER</span>
                  <div className="sidebar-header-actions">
                    <button className="sidebar-icon-btn" onClick={() => handleCreateNewFile()} title="New File">
                      <FilePlus size={13} />
                    </button>
                    <button className="sidebar-icon-btn" onClick={() => handleCreateNewFile('app.js')} title="New Scratch Script (app.js)">
                      <Plus size={13} />
                    </button>
                    <button className="sidebar-icon-btn" title="Refresh Explorer">
                      <RotateCw size={13} />
                    </button>
                  </div>
                </div>

                <div className="sidebar-tree-container">
                  {/* Project 1: CodeSrijan (Vercel Project) */}
                  <div className="tree-project-root text-cyan-400">
                    <ChevronDown size={14} />
                    <span>CODESRIJAN (VERCEL PROJECT)</span>
                  </div>
                  <div className="tree-branch-group mb-2">
                    <div 
                      className={`tree-item-file ${activeFile === 'Live Preview: CodeSrijan' ? 'active' : ''}`}
                      onClick={() => {
                        if (!openTabs.includes('Live Preview: CodeSrijan')) setOpenTabs([...openTabs, 'Live Preview: CodeSrijan']);
                        setActiveFile('Live Preview: CodeSrijan');
                      }}
                    >
                      <span className="tab-file-icon text-emerald-400">🌐</span>
                      <span className="tree-file-name text-emerald-400 font-semibold">Live Preview (Vercel)</span>
                    </div>
                    <div 
                      className={`tree-item-file ${activeFile === 'codesrijan/page.tsx' ? 'active' : ''}`}
                      onClick={() => {
                        if (!openTabs.includes('codesrijan/page.tsx')) setOpenTabs([...openTabs, 'codesrijan/page.tsx']);
                        setActiveFile('codesrijan/page.tsx');
                      }}
                    >
                      <span className="tab-file-icon icon-jsx">⚛</span>
                      <span className="tree-file-name">page.tsx</span>
                    </div>
                  </div>

                  {/* Project 2: Desktop Portfolio */}
                  <div className="tree-project-root">
                    <ChevronDown size={14} />
                    <span>DESTOP-PORTFLIO</span>
                  </div>
                  <div className="tree-branch-group">
                    <div className="tree-item-folder open">
                      <ChevronDown size={13} />
                      <span>src</span>
                    </div>
                    <div className="tree-item-folder sub open">
                      <ChevronDown size={13} />
                      <span>components</span>
                    </div>

                    {/* Files List */}
                    {Object.keys(projectFiles).filter(k => !k.includes('CodeSrijan') && !k.includes('codesrijan')).map((fileName) => {
                      const f = projectFiles[fileName];
                      const isActive = activeFile === fileName;
                      return (
                        <div
                          key={fileName}
                          className={`tree-item-file ${isActive ? 'active' : ''}`}
                          onClick={() => {
                            if (!openTabs.includes(fileName)) setOpenTabs([...openTabs, fileName]);
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
              </>
            )}

            {/* 2. SEARCH SIDEBAR */}
            {activeActivity === 'search' && (
              <div className="sidebar-search-panel">
                <div className="sidebar-header-row">
                  <span className="sidebar-title">SEARCH</span>
                </div>
                <div className="search-inputs-group">
                  <div className="search-input-wrap">
                    <input
                      type="text"
                      placeholder="Search across files..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="sidebar-search-field"
                    />
                  </div>
                </div>

                <div className="search-results-list">
                  {searchQuery.trim() ? (
                    Object.keys(projectFiles).filter(f => projectFiles[f].code.toLowerCase().includes(searchQuery.toLowerCase())).map(f => (
                      <div 
                        key={f} 
                        className="search-result-item"
                        onClick={() => {
                          if (!openTabs.includes(f)) setOpenTabs([...openTabs, f]);
                          setActiveFile(f);
                        }}
                      >
                        <div className="search-result-header">
                          {renderTabIcon(projectFiles[f].icon)}
                          <span className="search-file-name">{f}</span>
                        </div>
                        <div className="search-snippet">
                          Matches query "{searchQuery}"
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="sidebar-empty-state">
                      <span>Type a keyword to search through all code files in the portfolio workspace.</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. SOURCE CONTROL SIDEBAR */}
            {activeActivity === 'git' && (
              <div className="sidebar-git-panel">
                <div className="sidebar-header-row">
                  <span className="sidebar-title">SOURCE CONTROL</span>
                  <span className="sidebar-branch-tag">main*</span>
                </div>
                <div className="git-commit-box">
                  <textarea
                    placeholder="Commit message (Ctrl+Enter to commit)"
                    value={gitCommitMsg}
                    onChange={(e) => setGitCommitMsg(e.target.value)}
                    className="git-commit-textarea"
                  />
                  <button 
                    className="git-commit-btn"
                    onClick={() => {
                      if (!gitCommitMsg.trim()) return;
                      setTerminalHistory(prev => [
                        ...prev,
                        { type: 'command', text: `git commit -m "${gitCommitMsg}"` },
                        { type: 'output', text: `[main ${Math.random().toString(16).slice(2, 9)}] ${gitCommitMsg}` },
                        { type: 'output', text: ' 2 files changed, 45 insertions(+), 3 deletions(-)' }
                      ]);
                      setGitCommitMsg('');
                      alert('Commit created and synchronized with main!');
                    }}
                  >
                    <Check size={12} />
                    <span>Commit & Push</span>
                  </button>
                </div>

                <div className="git-changes-section">
                  <div className="git-section-title">
                    <ChevronDown size={12} />
                    <span>STAGED CHANGES ({gitStatus.staged.length})</span>
                  </div>
                  {gitStatus.staged.map(file => (
                    <div key={file} className="git-file-row">
                      <span className="git-file-path">{file}</span>
                      <span className="git-badge modified">M</span>
                    </div>
                  ))}

                  <div className="git-section-title mt-4">
                    <ChevronDown size={12} />
                    <span>CHANGES ({gitStatus.modified.length})</span>
                  </div>
                  {gitStatus.modified.map(file => (
                    <div key={file} className="git-file-row">
                      <span className="git-file-path">{file}</span>
                      <span className="git-badge modified">M</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. RUN AND DEBUG SIDEBAR */}
            {activeActivity === 'debug' && (
              <div className="sidebar-debug-panel">
                <div className="sidebar-header-row">
                  <span className="sidebar-title">RUN AND DEBUG</span>
                </div>
                <div className="debug-launch-box">
                  <button 
                    className="debug-run-primary-btn"
                    onClick={() => executeCode()}
                  >
                    <Play size={14} fill="#ffffff" />
                    <span>Run Code ({currentFile.lang || 'JS'})</span>
                  </button>

                  <button 
                    className="debug-run-script-btn"
                    onClick={() => {
                      if (!projectFiles['app.js']) handleCreateNewFile('app.js');
                      else {
                        setActiveFile('app.js');
                        executeCode(projectFiles['app.js'].code, 'app.js');
                      }
                    }}
                  >
                    <Code size={13} />
                    <span>Run Scratch Script (app.js)</span>
                  </button>
                </div>

                <div className="debug-section">
                  <div className="debug-section-header">
                    <ChevronDown size={12} />
                    <span>VARIABLES</span>
                  </div>
                  <div className="debug-item-row">
                    <span className="var-name">activeFile:</span>
                    <span className="var-val">"{activeFile}"</span>
                  </div>
                  <div className="debug-item-row">
                    <span className="var-name">lineCount:</span>
                    <span className="var-val">{codeLines.length}</span>
                  </div>
                  <div className="debug-item-row">
                    <span className="var-name">engine:</span>
                    <span className="var-val">"Node v20.18.0"</span>
                  </div>
                </div>

                <div className="debug-section">
                  <div className="debug-section-header">
                    <ChevronDown size={12} />
                    <span>WATCH</span>
                  </div>
                  <div className="debug-item-row">
                    <span className="var-name">status:</span>
                    <span className="var-val text-emerald-400">ready</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. EXTENSIONS SIDEBAR */}
            {activeActivity === 'extensions' && (
              <div className="sidebar-extensions-panel">
                <div className="sidebar-header-row">
                  <span className="sidebar-title">EXTENSIONS</span>
                </div>
                <div className="extensions-list">
                  {extensions.map(ext => (
                    <div key={ext.id} className="extension-card">
                      <div className="ext-icon-square">
                        <Package size={16} />
                      </div>
                      <div className="ext-info">
                        <div className="ext-title-row">
                          <span className="ext-name">{ext.name}</span>
                          <span className="ext-ver">{ext.version}</span>
                        </div>
                        <p className="ext-desc">{ext.desc}</p>
                        <div className="ext-footer">
                          <span className="ext-author">{ext.author}</span>
                          <button 
                            className={`ext-toggle-btn ${ext.installed ? 'installed' : ''}`}
                            onClick={() => {
                              setExtensions(prev => prev.map(item => item.id === ext.id ? { ...item, installed: !item.installed } : item));
                            }}
                          >
                            {ext.installed ? 'Installed' : 'Install'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. AI AGENT SIDEBAR */}
            {activeActivity === 'agent' && (
              <div className="sidebar-agent-panel">
                <div className="sidebar-header-row">
                  <span className="sidebar-title flex items-center gap-1.5 text-sky-400">
                    <Sparkles size={13} />
                    ANTIGRAVITY AI AGENT
                  </span>
                </div>
                <div className="agent-chat-history">
                  {agentMessages.map((msg, idx) => (
                    <div key={idx} className={`agent-bubble ${msg.sender}`}>
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div className="agent-quick-prompts">
                  <button 
                    className="agent-prompt-chip"
                    onClick={() => {
                      const snippet = `\n// AI Generated: Fibonacci Sequence\nfunction fibonacci(n) {\n  let [a, b] = [0, 1];\n  for (let i = 0; i < n; i++) [a, b] = [b, a + b];\n  return a;\n}\nconsole.log("Fib(10) =", fibonacci(10));\n`;
                      setProjectFiles(prev => ({
                        ...prev,
                        [activeFile]: { ...prev[activeFile], code: (prev[activeFile]?.code || '') + snippet }
                      }));
                      setAgentMessages(prev => [...prev, { sender: 'assistant', text: 'Appended Fibonacci function to ' + activeFile + '!' }]);
                    }}
                  >
                    + Insert Fibonacci
                  </button>
                  <button 
                    className="agent-prompt-chip"
                    onClick={() => executeCode()}
                  >
                    ▶ Run active file
                  </button>
                </div>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!agentInput.trim()) return;
                    setAgentMessages(prev => [
                      ...prev,
                      { sender: 'user', text: agentInput },
                      { sender: 'assistant', text: 'Generated code optimization for: ' + agentInput }
                    ]);
                    setAgentInput('');
                  }}
                  className="agent-input-row"
                >
                  <input
                    type="text"
                    placeholder="Ask Antigravity Copilot..."
                    value={agentInput}
                    onChange={(e) => setAgentInput(e.target.value)}
                    className="agent-text-input"
                  />
                  <button type="submit" className="agent-send-btn">
                    <Send size={12} />
                  </button>
                </form>
              </div>
            )}
          </aside>
        )}

        {/* Main Editor & Terminal Area */}
        <main className="vscode-editor-main">
          {/* Tabs Bar */}
          <div className="vscode-tabs-bar">
            <div className="tabs-list-scroll">
              {openTabs.map((fileName) => {
                const f = projectFiles[fileName] || {};
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

            {/* Top-Right Editor Tools featuring RUN CODE button */}
            <div className="tabs-right-tools">
              <button 
                className="editor-run-code-btn"
                onClick={() => executeCode()}
                title="Run Active File (Ctrl+Enter)"
              >
                <Play size={12} fill="#22c55e" color="#22c55e" />
                <span>Run Code</span>
              </button>

              <button className="tab-tool-btn" onClick={() => handleCreateNewFile('app.js')} title="New Scratch Script">
                <Plus size={13} />
              </button>
              <button className="tab-tool-btn" onClick={() => setTerminalOpen(!terminalOpen)} title="Toggle Terminal (Ctrl+`)">
                <TerminalIcon size={13} />
              </button>
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
            <span className="crumb-text">{currentFile.path ? currentFile.path.split(' > ')[0] : 'src'}</span>
            <span className="crumb-chevron">&gt;</span>
            <span className="crumb-text">{currentFile.path ? currentFile.path.split(' > ')[1] || 'components' : 'components'}</span>
            <span className="crumb-chevron">&gt;</span>
            <span className="crumb-icon">{renderTabIcon(currentFile.icon)}</span>
            <span className="crumb-text active-crumb">{currentFile.name}</span>
            <span className="crumb-chevron">&gt;</span>
            <span className="crumb-text muted">editable</span>
          </div>

          {/* Code Viewport with Gutter & Minimap OR Webview Preview */}
          {currentFile.isWebview ? (
            <div className="vscode-webview-container">
              <div className="webview-address-bar">
                <span className="webview-lock-icon">🔒</span>
                <span className="webview-url-text">http://codesrijan-nine.vercel.app/</span>
                <span className="webview-badge-tag">VERCEL PRODUCTION</span>
                <a
                  href="http://codesrijan-nine.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="webview-external-btn"
                >
                  <span>Open in Chrome ↗</span>
                </a>
              </div>
              <div className="webview-frame-body">
                <div className="webview-interactive-card">
                  <div className="interactive-card-hero">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono mb-4">
                      <span>⚡ National Level Hackathon Ecosystem · 72-Hour Sprint</span>
                    </div>
                    <h2 className="interactive-title">Srijaning the Future: Code, Innovate, Conquer</h2>
                    <p className="interactive-desc">
                      Live hackathon platform designed by <strong>Varun Sehgal</strong> for Jaypee University of Engineering & Technology. Powering registration, real-time rubric evaluation, and team matching for 200+ hackathon participants across 50+ universities.
                    </p>
                    <div className="interactive-stats-row">
                      <div className="stat-box">
                        <div className="stat-val">200+</div>
                        <div className="stat-lbl">Hackers Registered</div>
                      </div>
                      <div className="stat-box">
                        <div className="stat-val">72h</div>
                        <div className="stat-lbl">Live Sprint</div>
                      </div>
                      <div className="stat-box">
                        <div className="stat-val">$5,000+</div>
                        <div className="stat-lbl">Prize Matrix</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="vscode-code-viewport">
              {/* Interactive Code Editor with synchronized Line Gutter */}
              <div className="code-editor-scrollable">
                <div className="code-editor-container">
                  {/* Line Numbers Gutter */}
                  <div className="editor-gutter">
                    {codeLines.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`gutter-line-number ${idx + 1 === cursorLine ? 'active' : ''}`}
                      >
                        {idx + 1}
                      </div>
                    ))}
                  </div>

                  {/* Fully Editable Code Textarea */}
                  <div className="editor-textarea-wrap">
                    <textarea
                      ref={editorTextareaRef}
                      value={currentCode}
                      onChange={handleCodeChange}
                      onClick={(e) => {
                        const target = e.target;
                        const textBefore = target.value.substring(0, target.selectionStart);
                        const linesBefore = textBefore.split('\n');
                        setCursorLine(linesBefore.length);
                        setCursorCol(linesBefore[linesBefore.length - 1].length + 1);
                      }}
                      onKeyUp={(e) => {
                        const target = e.target;
                        const textBefore = target.value.substring(0, target.selectionStart);
                        const linesBefore = textBefore.split('\n');
                        setCursorLine(linesBefore.length);
                        setCursorCol(linesBefore[linesBefore.length - 1].length + 1);
                      }}
                      className="editor-code-textarea"
                      spellCheck={false}
                      autoCapitalize="off"
                      autoCorrect="off"
                    />
                  </div>
                </div>
              </div>

              {/* Code Minimap (Right side) */}
              <div className="vscode-minimap-pane">
                <div className="minimap-viewport-slider" />
                <div className="minimap-content">
                  {codeLines.slice(0, 80).map((l, idx) => (
                    <div
                      key={idx}
                      className="minimap-bar-line"
                      style={{
                        width: `${Math.min(95, Math.max(10, l.length * 1.4))}%`,
                        backgroundColor: l.includes('function') || l.includes('const') ? '#38bdf8' : l.includes('console') ? '#facc15' : 'rgba(255,255,255,0.18)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Integrated Terminal Panel */}
          {terminalOpen && (
            <div className="vscode-terminal-dock" style={{ height: `${terminalHeight}px` }}>
              {/* Terminal Header Tabs */}
              <div className="terminal-header-tabs">
                <div className="terminal-tab-group">
                  <button 
                    className={`terminal-tab-item ${terminalTab === 'problems' ? 'active' : ''}`}
                    onClick={() => setTerminalTab('problems')}
                  >
                    Problems {problems.length > 0 && <span className="tab-counter-badge">{problems.length}</span>}
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
                    Ports <span className="tab-counter-badge">2</span>
                  </button>
                  <button 
                    className={`terminal-tab-item ${terminalTab === 'comments' ? 'active' : ''}`}
                    onClick={() => setTerminalTab('comments')}
                  >
                    Comments
                  </button>
                </div>

                <div className="terminal-actions-group">
                  <span className="terminal-badge-pill">
                    <span className="terminal-badge-icon">&gt;</span>
                    <span>powershell</span>
                  </span>
                  <button 
                    className="terminal-icon-btn" 
                    onClick={() => setTerminalHistory(prev => [...prev, { type: 'output', text: '--- New Terminal Instance Initialized ---' }])}
                    title="New Terminal"
                  >
                    <Plus size={12} />
                  </button>
                  <button 
                    className="terminal-icon-btn" 
                    onClick={() => setTerminalHeight(terminalHeight === 180 ? 320 : 180)}
                    title={terminalHeight === 180 ? "Maximize Panel Size" : "Restore Panel Size"}
                  >
                    {terminalHeight === 180 ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
                  </button>
                  <button 
                    className="terminal-icon-btn" 
                    onClick={() => setTerminalOpen(false)}
                    title="Close Panel"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

              {/* 1. Terminal Shell Tab */}
              {terminalTab === 'terminal' && (
                <div className="terminal-content-area" onClick={() => terminalInputRef.current?.focus()}>
                  {terminalHistory.map((item, idx) => (
                    <div key={idx} className={`terminal-log-line ${item.type}`}>
                      {item.text}
                    </div>
                  ))}
                  <form onSubmit={handleTerminalSubmit} className="terminal-input-row">
                    <span className="terminal-prompt-prefix">PS C:\Users\Varun\Downloads\destop-portflio&gt;</span>
                    <input
                      ref={terminalInputRef}
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowUp' && cmdHistory.length > 0) {
                          e.preventDefault();
                          const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
                          setHistoryIndex(nextIdx);
                          setTerminalInput(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
                        } else if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          const nextIdx = historyIndex - 1 >= 0 ? historyIndex - 1 : -1;
                          setHistoryIndex(nextIdx);
                          setTerminalInput(nextIdx === -1 ? '' : cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
                        }
                      }}
                      className="terminal-text-input"
                      autoFocus={false}
                      spellCheck={false}
                    />
                  </form>
                </div>
              )}

              {/* 2. Output Tab */}
              {terminalTab === 'output' && (
                <div className="terminal-content-area output-area">
                  <pre className="output-raw-pre">{outputLogs}</pre>
                </div>
              )}

              {/* 3. Debug Console Tab */}
              {terminalTab === 'debug' && (
                <div className="terminal-content-area debug-console-area">
                  {debugLogs.map((item, idx) => (
                    <div key={idx} className={`debug-log-row ${item.type}`}>
                      {item.text}
                    </div>
                  ))}
                  <form onSubmit={handleDebugEval} className="debug-input-row">
                    <span className="debug-prompt-char">&gt;</span>
                    <input
                      type="text"
                      value={debugInput}
                      onChange={(e) => setDebugInput(e.target.value)}
                      placeholder="Evaluate JavaScript expression in debug context..."
                      className="debug-eval-input"
                    />
                  </form>
                </div>
              )}

              {/* 4. Problems Tab */}
              {terminalTab === 'problems' && (
                <div className="terminal-content-area problems-area">
                  {problems.length > 0 ? (
                    problems.map((p, idx) => (
                      <div key={idx} className="problem-item-row">
                        <AlertCircle size={14} className="text-red-400" />
                        <span className="problem-file">{p.file}</span>
                        <span className="problem-line">[{p.line}, 1]</span>
                        <span className="problem-msg">{p.message}</span>
                      </div>
                    ))
                  ) : (
                    <div className="problems-empty">
                      <span>✓ No problems have been detected in the workspace.</span>
                    </div>
                  )}
                </div>
              )}

              {/* 5. Ports Tab */}
              {terminalTab === 'ports' && (
                <div className="terminal-content-area ports-area">
                  <div className="ports-table-header">
                    <span>Port</span>
                    <span>Protocol</span>
                    <span>Forwarded Address</span>
                    <span>Process</span>
                    <span>Status</span>
                  </div>
                  <div className="ports-table-row">
                    <span className="port-num font-mono text-cyan-400">5173</span>
                    <span>http</span>
                    <span>
                      <a href="http://localhost:5173/" target="_blank" rel="noreferrer" className="text-sky-400 underline">
                        http://localhost:5173/ ↗
                      </a>
                    </span>
                    <span>vite (VarunOS Portfolio)</span>
                    <span className="port-badge active">● Listening</span>
                  </div>
                  <div className="ports-table-row">
                    <span className="port-num font-mono text-cyan-400">3000</span>
                    <span>https</span>
                    <span>
                      <a href="http://codesrijan-nine.vercel.app/" target="_blank" rel="noreferrer" className="text-sky-400 underline">
                        http://codesrijan-nine.vercel.app/ ↗
                      </a>
                    </span>
                    <span>next.js (CodeSrijan Production)</span>
                    <span className="port-badge active">● Online</span>
                  </div>
                </div>
              )}

              {/* 6. Comments Tab */}
              {terminalTab === 'comments' && (
                <div className="terminal-content-area comments-area">
                  <div className="comment-card">
                    <div className="comment-header">
                      <span className="comment-author">Varun Sehgal</span>
                      <span className="comment-time">Today at 12:45 AM</span>
                    </div>
                    <p className="comment-text">
                      "Engineered clean modular component architecture for VarunOS macOS emulation with full 60fps GPU acceleration."
                    </p>
                  </div>
                </div>
              )}
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
              <span className="status-item sync">
                <span>⟳</span>
              </span>
              <span className="status-item diagnostics">
                <span>⨂ {problems.length}</span>
                <span>⚠ 0</span>
              </span>
            </div>

            <div className="statusbar-right">
              <span className="status-item">Ln {cursorLine}, Col {cursorCol}</span>
              <span className="status-item">Spaces: 2</span>
              <span className="status-item">UTF-8</span>
              <span className="status-item">{currentFile.lang || 'TypeScript React'}</span>
              <span className="status-item prettier">Prettier: ✓</span>
              <span className="status-item notification">🔔</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default VsCodeApp;
