import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Sparkles, Folder, Play, Check, Copy, Image } from 'lucide-react';
import { terminalWallpapers } from '../config/wallpapers';
import './TerminalApp.css';

const WELCOME_BANNER = [
  'Last login: ' + new Date().toLocaleString() + ' on ttys001',
  'VarunOS Sequoia Darwin 24.1.0 (arm64 Apple M3 Max) [inspired by macOS]',
  'Oh-My-Zsh configured with zsh-syntax-highlighting & pure prompt',
  '',
  'Type "help" or click any shortcut pill above to begin exploring.',
  'Tip: Type "wallpaper" to preview and change terminal backdrops.',
  ''
];

const NEOFETCH_LINES = [
  { text: '                    \'c.          varun@macbook-pro.local', color: '#38bdf8', bold: true },
  { text: '                 ,xNMM.          -----------------------', color: '#38bdf8' },
  { text: '               .OMMMMo           OS: VarunOS Sequoia 15.1 (24B83) arm64', color: '#facc15' },
  { text: '               OMMM0,            Host: MacBookPro18,1 (Apple M3 Max Architecture)', color: '#facc15' },
  { text: '     .;loddo:.  .olloddol;.      Kernel: Darwin 24.1.0', color: '#facc15' },
  { text: '   cKMMMMMMMMMMNWMMMMMMMMMM0:    Uptime: 4 days, 12 hours, 38 mins', color: '#4ade80' },
  { text: ' .KMMMMMMMMMMMMMMMMMMMMMMMWd.    Packages: 842 (brew), 24 (npm)', color: '#4ade80' },
  { text: ' XMMMMMMMMMMMMMMMMMMMMMMMX.      Shell: zsh 5.9 (x86_64-apple-darwin24.0)', color: '#4ade80' },
  { text: ';MMMMMMMMMMMMMMMMMMMMMMMM:       Resolution: 3024x1964 Retina Display', color: '#a78bfa' },
  { text: ':MMMMMMMMMMMMMMMMMMMMMMMM:       DE: Aqua / Quartz Compositor (inspired by macOS)', color: '#a78bfa' },
  { text: '.MMMMMMMMMMMMMMMMMMMMMMMMX.      WM: VarunOS Window Server', color: '#a78bfa' },
  { text: ' kMMMMMMMMMMMMMMMMMMMMMMMMWd.    Terminal: VarunOS Terminal.app (inspired by macOS)', color: '#ec4899' },
  { text: ' .XMMMMMMMMMMMMMMMMMMMMMMMMMMk   CPU: Apple M3 Max (16 cores @ 4.05GHz)', color: '#ec4899' },
  { text: '  .XMMMMMMMMMMMMMMMMMMMMMMMMK.   GPU: Apple M3 Max 40-Core GPU', color: '#ec4899' },
  { text: '    kMMMMMMMMMMMMMMMMMMMMMMd     Memory: 18432MiB / 65536MiB (28%)', color: '#38bdf8' },
  { text: '     ;KMMMMMMMWXXWMMMMMMMk.      Specialty: UI/UX & Vibecoded Product Engineering', color: '#38bdf8' },
  { text: '       .cooc,.    .,cooc.        ', color: '#38bdf8' },
  { text: '                                 [■■■■■■■■] [■■■■■■■■] [■■■■■■■■] [■■■■■■■■]', color: '#f43f5e' },
  { text: '', color: '#94a3b8' }
];

const HELP_COMMANDS = [
  { cmd: 'neofetch', desc: 'Display VarunOS system hardware & specs banner' },
  { cmd: 'wallpaper', desc: 'Change terminal wallpaper backdrop (roxy, cyber, dark)' },
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

  // Active terminal wallpaper state (persists in localStorage)
  const [activeWallpaperId, setActiveWallpaperId] = useState(() => {
    try {
      return localStorage.getItem('varunos_terminal_wallpaper') || 'roxy-calendar';
    } catch {
      return 'roxy-calendar';
    }
  });

  const setTerminalWallpaper = (id) => {
    const found = terminalWallpapers.find(w => w.id === id) || terminalWallpapers[0];
    setActiveWallpaperId(found.id);
    try {
      localStorage.setItem('varunos_terminal_wallpaper', found.id);
    } catch {}
    window.dispatchEvent(new CustomEvent('varunos-set-terminal-wallpaper', { detail: { id: found.id } }));
  };

  useEffect(() => {
    const handleSync = (e) => {
      if (e.detail?.id) {
        setActiveWallpaperId(e.detail.id);
      }
    };
    window.addEventListener('varunos-set-terminal-wallpaper', handleSync);
    return () => window.removeEventListener('varunos-set-terminal-wallpaper', handleSync);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    const newHistory = [...history, `➜  varunOS git:(main) ✗ ${rawCmd}`];
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    const parts = cmd.toLowerCase().split(' ');
    const mainCmd = parts[0];
    const arg = parts.slice(1).join(' ');

    switch (mainCmd) {
      case 'neofetch':
      case 'fastfetch':
        setHistory([...newHistory, ...NEOFETCH_LINES.map(l => l.text)]);
        break;

      case 'wallpaper':
      case 'theme':
        if (!arg) {
          const currentWp = terminalWallpapers.find(w => w.id === activeWallpaperId) || terminalWallpapers[0];
          setHistory([
            ...newHistory,
            '🖼️ VARUNOS TERMINAL WALLPAPERS:',
            '  • roxy      - Roxy Ifrita (Teal & Monochrome Anime Calendar)',
            '  • cyber     - Neon Crimson Cyberpunk',
            '  • monterey  - Monterey (inspired by macOS)',
            '  • dark      - Solid Dark (Clean Minimal)',
            '',
            `Current active backdrop: ${currentWp.name}`,
            'Usage: wallpaper <name> (e.g. "wallpaper roxy", "wallpaper cyber", "wallpaper dark")',
            ''
          ]);
        } else {
          const key = arg.toLowerCase().trim();
          let matched = null;
          if (key.includes('roxy') || key.includes('teal') || key.includes('anime')) matched = 'roxy-calendar';
          else if (key.includes('cyber') || key.includes('neon') || key.includes('red')) matched = 'neon-crimson-cyber';
          else if (key.includes('monterey') || key.includes('mac')) matched = 'monterey';
          else if (key.includes('dark') || key.includes('default') || key.includes('solid')) matched = 'default';

          if (matched) {
            setTerminalWallpaper(matched);
            const found = terminalWallpapers.find(w => w.id === matched);
            setHistory([
              ...newHistory,
              `✅ Terminal wallpaper switched to: ${found?.name || matched}`,
              ''
            ]);
          } else {
            setHistory([
              ...newHistory,
              `wallpaper: unknown theme "${arg}". Available: roxy, cyber, monterey, dark`,
              ''
            ]);
          }
        }
        break;

      case 'help':
        setHistory([
          ...newHistory,
          '┌─ VarunOS Interactive Terminal Commands ─────────────────────────────┐',
          ...HELP_COMMANDS.map(c => `│  ${c.cmd.padEnd(14)} - ${c.desc.padEnd(52)}│`),
          '└─────────────────────────────────────────────────────────────────────┘',
          ''
        ]);
        break;

      case 'about':
        setHistory([
          ...newHistory,
          '👤 Varun Sehgal',
          '• Role:       UI/UX Designer & Product Designer',
          '• Location:   Gwalior, Madhya Pradesh, India',
          '• Education:  B.Tech in CSE @ Jaypee University (JUET) [2023 - 2027]',
          '• Specialty:  High-impact SaaS, AI-driven workflows, Design Systems & Motion UX',
          '• Bio:        3+ years delivering SaaS interfaces, design tokens, and rapid prototyping.',
          ''
        ]);
        break;

      case 'skills':
        setHistory([
          ...newHistory,
          '🛠️ TECHNICAL & DESIGN STACK:',
          '  [Design Tools]    Figma, Figma AI, Adobe XD, Photoshop, Illustrator, FigJam',
          '  [AI Workflows]    Uizard, Galileo AI, Visily, Figma Magician, Figma Automator',
          '  [Core UX]         Wireframing, Rapid Prototyping, Usability Testing, Design Systems',
          '  [Frontend/Tech]   React.js, Next.js, TypeScript, Tailwind CSS, HTML5/CSS3, Git',
          ''
        ]);
        break;

      case 'projects':
        setHistory([
          ...newHistory,
          '🚀 FEATURED CASE STUDIES:',
          '  1. AI Interview & Prep Platform — Automated candidate evaluation & dark UI',
          '  2. EventFlow Ticketing SaaS    — 4-step checkout flow reducing drop-off by 30%',
          '  3. Expensify Budget Tracker    — 17+ mobile screens optimized for <5s logging',
          '  4. CodeSrijan Hackathon Portal — 72hr evaluation system for 200+ developers',
          '',
          '💡 Tip: Type "open figma" or "open vscode" to view them interactively.',
          ''
        ]);
        break;

      case 'vibecoding':
        setHistory([
          ...newHistory,
          '⚡ VIBECODED ECOSYSTEM:',
          '  • AI Interview Prep Platform (Autonomous evaluation & grading modules)',
          '  • Prompt-to-UI Prototyping Engine (Generative Agent AST Compiler)',
          '  • Interactive multiplayer Figma canvas integration',
          '  • Ollama local LLM microservice for instant offline generation',
          'Type "open vscode" to browse all vibecoded project code files!',
          ''
        ]);
        break;

      case 'experience':
        setHistory([
          ...newHistory,
          '💼 CAREER & PROFESSIONAL EXPERIENCE:',
          '  • UniEvent (Jun 2024 – Nov 2024):          UI/UX Designer Intern (Remote - Ended early Nov)',
          '  • Assemble (Aug 2024 – Jan 2025):          Assistant Head of Operations (Remote)',
          '  • Knaptix Ventures (Jun 2024 – Aug 2024):  UI/UX Designer Intern (Remote)',
          '  • Freelance UI/UX (Jan 2024 – Present):    10+ high-retention client projects',
          ''
        ]);
        break;

      case 'contact':
        setHistory([
          ...newHistory,
          '📬 CONTACT & CONNECT:',
          '  • Email:    varun.sehgal02@gmail.com',
          '  • Phone:    +91 9399361193',
          '  • GitHub:   https://github.com/varunsehgal05',
          '  • LinkedIn: https://linkedin.com/in/varunsehgal02',
          '  • Behance:  https://behance.net/varunsehgal3',
          '  • Website:  https://varunsehgal.runs-on.dev',
          ''
        ]);
        break;

      case 'whoami':
        setHistory([...newHistory, `user: ${userName || 'Guest'} (collaborator session @ ttys001)`, '']);
        break;

      case 'date':
        setHistory([...newHistory, new Date().toString(), '']);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'cat':
        if (arg.includes('resume')) {
          setHistory([
            ...newHistory,
            '📄 RESUME SUMMARY — VARUN SEHGAL',
            '=======================================',
            'Role: Lead UI/UX Designer & Product Designer',
            'Education: B.Tech in CSE (Jaypee University of Engg & Tech)',
            'Experience: 3+ years delivering SaaS platforms, design tokens, micro-interactions',
            'Download full PDF via desktop icon "Resume.pdf" or type "open resume"',
            ''
          ]);
        } else {
          setHistory([...newHistory, `cat: ${arg || 'file'}: No such file or directory`, '']);
        }
        break;

      case 'open':
        if (onOpenApp && arg) {
          const target = arg.toLowerCase().replace('.app', '').replace('.pdf', '');
          const validApps = ['finder', 'figma', 'vscode', 'resume', 'contact', 'safari', 'settings', 'trash'];
          if (validApps.includes(target)) {
            onOpenApp(target);
            setHistory([...newHistory, `🚀 Launching ${target}.app...`, '']);
          } else {
            setHistory([...newHistory, `open: application not found: ${arg}`, `Available: ${validApps.join(', ')}`, '']);
          }
        } else {
          setHistory([...newHistory, 'Usage: open <app_name> (e.g. open figma, open vscode, open safari)', '']);
        }
        break;

      case 'uname':
        setHistory([...newHistory, 'Darwin VarunOS-Sequoia 24.1.0 Darwin Kernel Version 24.1.0 arm64', '']);
        break;

      case 'sudo':
        setHistory([...newHistory, 'Password: ••••••••', 'varun is not in the sudoers file. This incident will be reported to system security.', '']);
        break;

      default:
        setHistory([...newHistory, `zsh: command not found: ${mainCmd}. Type "help" for available commands.`, '']);
        break;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-completion
      const available = ['help', 'neofetch', 'wallpaper', 'wallpaper roxy', 'wallpaper cyber', 'wallpaper dark', 'skills', 'projects', 'vibecoding', 'experience', 'contact', 'clear', 'cat resume', 'open figma', 'open vscode', 'open safari', 'open contact'];
      const match = available.find(c => c.startsWith(inputVal.toLowerCase().trim()));
      if (match) {
        setInputVal(match);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx < cmdHistory.length) {
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  const currentWp = terminalWallpapers.find(w => w.id === activeWallpaperId) || terminalWallpapers[0];

  return (
    <div 
      className="terminal-wrapper" 
      onClick={handleContainerClick}
      style={currentWp.bgStyle}
    >
      {/* Top Quick Command Bar */}
      <div className="terminal-quick-bar">
        <span className="quick-bar-label">Commands:</span>
        {['neofetch', 'skills', 'projects', 'vibecoding', 'experience', 'contact', 'clear'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            className="terminal-pill-btn"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(cmd);
            }}
          >
            {cmd}
          </button>
        ))}

        <div className="terminal-quick-divider" />

        <span className="quick-bar-label">Wallpaper:</span>
        <button
          type="button"
          className={`terminal-pill-btn terminal-wp-pill ${activeWallpaperId === 'roxy-calendar' ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setTerminalWallpaper('roxy-calendar');
          }}
          title="Roxy Ifrita (Teal Calendar)"
        >
          🖼️ Roxy
        </button>

        <button
          type="button"
          className={`terminal-pill-btn terminal-wp-pill ${activeWallpaperId === 'neon-crimson-cyber' ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setTerminalWallpaper('neon-crimson-cyber');
          }}
          title="Neon Crimson Cyberpunk"
        >
          🖼️ Cyber
        </button>

        <button
          type="button"
          className={`terminal-pill-btn terminal-wp-pill ${activeWallpaperId === 'monterey' ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setTerminalWallpaper('monterey');
          }}
          title="Monterey (inspired by macOS)"
        >
          🖼️ Monterey
        </button>

        <button
          type="button"
          className={`terminal-pill-btn terminal-wp-pill ${activeWallpaperId === 'default' ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setTerminalWallpaper('default');
          }}
          title="Solid Dark (Default)"
        >
          ⬛ Dark
        </button>
      </div>

      {/* Terminal Viewport */}
      <div className="terminal-container">
        <div className="terminal-output">
          {history.map((line, idx) => {
            const isPrompt = line.startsWith('➜');
            const isHeader = line.startsWith('┌') || line.startsWith('└') || line.startsWith('═') || line.startsWith('🚀') || line.startsWith('🛠️') || line.startsWith('💼') || line.startsWith('📬') || line.startsWith('⚡') || line.startsWith('👤') || line.startsWith('🖼️');
            const isSuccess = line.startsWith('✅');
            const isError = line.includes('command not found') || line.includes('No such file') || line.includes('unknown theme');
            
            return (
              <div 
                key={idx} 
                className={`terminal-line ${isPrompt ? 'prompt-line' : ''} ${isHeader ? 'header-line' : ''} ${isSuccess ? 'success-line' : ''} ${isError ? 'error-line' : ''}`}
              >
                {line}
              </div>
            );
          })}

          <div className="terminal-input-row">
            <span className="terminal-prompt">➜  varunOS git:(main) ✗</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default TerminalApp;
