import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Sparkles, Folder, Play, Check, Copy, Image, Eye, EyeOff } from 'lucide-react';
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

  // Quick Bar Visibility & Wallpaper Tint Opacity State
  const [isQuickBarVisible, setIsQuickBarVisible] = useState(true);
  const [tintLevel, setTintLevel] = useState(() => {
    try {
      return localStorage.getItem('varunos_terminal_tint_val') || 'vivid';
    } catch {
      return 'vivid';
    }
  });

  const handleSelectTint = (level) => {
    setTintLevel(level);
    try {
      localStorage.setItem('varunos_terminal_tint_val', level);
    } catch {}
  };

  // Active terminal wallpaper state (persists in localStorage)
  const [activeWallpaperId, setActiveWallpaperId] = useState(() => {
    try {
      const saved = localStorage.getItem('varunos_terminal_wallpaper');
      if (saved && terminalWallpapers.some(w => w.id === saved)) {
        return saved;
      }
      return 'default';
    } catch {
      return 'default';
    }
  });

  const getWpStyle = (wpId, tint) => {
    const wp = terminalWallpapers.find(w => w.id === wpId) || terminalWallpapers[0];
    if (!wp.image) return wp.bgStyle || { backgroundColor: '#0d1117' };
    
    // Calibrated tint opacities:
    // vivid (0.42 / 0.54) - crystal clear artwork with dark contrast scrim so text is sharp & readable!
    // balanced (0.62 / 0.74) - deep contrast for intense coding
    const [topAlpha, bottomAlpha] = tint === 'vivid' 
      ? ['0.42', '0.54'] 
      : tint === 'balanced' 
      ? ['0.62', '0.74'] 
      : ['0.80', '0.88'];
      
    return {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, ${topAlpha}), rgba(0, 0, 0, ${bottomAlpha})), url(${wp.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'auto'
    };
  };

  const cycleWallpaper = (direction) => {
    const currentIdx = terminalWallpapers.findIndex(w => w.id === activeWallpaperId);
    let nextIdx = (currentIdx + direction) % terminalWallpapers.length;
    if (nextIdx < 0) nextIdx = terminalWallpapers.length - 1;
    setTerminalWallpaper(terminalWallpapers[nextIdx].id);
  };

  const [prevWpStyle, setPrevWpStyle] = useState(null);
  const [isWpTransitioning, setIsWpTransitioning] = useState(false);
  const wpTransitionTimerRef = useRef(null);
  const isFirstMountRef = useRef(true);
  const prevWpIdRef = useRef(activeWallpaperId);
  const prevTintRef = useRef(tintLevel);

  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }

    if (prevWpIdRef.current !== activeWallpaperId || prevTintRef.current !== tintLevel) {
      const oldStyle = getWpStyle(prevWpIdRef.current, prevTintRef.current);
      prevWpIdRef.current = activeWallpaperId;
      prevTintRef.current = tintLevel;

      if (wpTransitionTimerRef.current) {
        clearTimeout(wpTransitionTimerRef.current);
      }

      setPrevWpStyle(oldStyle);
      setIsWpTransitioning(true);

      wpTransitionTimerRef.current = setTimeout(() => {
        setPrevWpStyle(null);
        setIsWpTransitioning(false);
        wpTransitionTimerRef.current = null;
      }, 700);
    }
  }, [activeWallpaperId, tintLevel]);

  useEffect(() => {
    return () => {
      if (wpTransitionTimerRef.current) {
        clearTimeout(wpTransitionTimerRef.current);
      }
    };
  }, []);

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
            '  • roxy      - Roxy Ifrita (Teal Calendar)',
            '  • cyber     - Cyberpunk Neon Girl',
            '  • batman    - The Batman (Crimson)',
            '  • anime     - Anime Room Selfie',
            '  • cat       - Minecraft Cat Sunset',
            '  • monterey  - Monterey (macOS inspired)',
            '  • cosmic    - Deep Cosmic Purple',
            '  • aurora    - Cyan Aurora Glow',
            '  • dark      - Solid Dark (Clean Minimal)',
            '',
            `Current active backdrop: ${currentWp.name}`,
            'Usage: wallpaper <name> (e.g. "wallpaper roxy", "wallpaper cyber", "wallpaper batman", "wallpaper cat", "wallpaper dark")',
            ''
          ]);
        } else {
          const key = arg.toLowerCase().trim();
          let matched = null;
          if (key.includes('roxy') || key.includes('calendar') || key.includes('ifrita')) matched = 'roxy-calendar';
          else if (key.includes('cyber') || key.includes('neon')) matched = 'cyberpunk-girl';
          else if (key.includes('batman') || key.includes('crimson') || key.includes('knight')) matched = 'batman-red';
          else if (key.includes('anime') || key.includes('room') || key.includes('selfie')) matched = 'anime-room';
          else if (key.includes('cat') || key.includes('minecraft') || key.includes('sunset')) matched = 'minecraft-cat';
          else if (key.includes('monterey') || key.includes('mac')) matched = 'monterey';
          else if (key.includes('cosmic') || key.includes('purple')) matched = 'cosmic';
          else if (key.includes('aurora') || key.includes('cyan')) matched = 'aurora';
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
              `wallpaper: unknown theme "${arg}". Available: roxy, cyber, batman, anime, cat, dark, monterey, cosmic, aurora`,
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
          const validApps = ['finder', 'figma', 'vscode', 'resume', 'contact', 'settings', 'trash'];
          if (validApps.includes(target)) {
            onOpenApp(target);
            setHistory([...newHistory, `🚀 Launching ${target}.app...`, '']);
          } else {
            setHistory([...newHistory, `open: application not found: ${arg}`, `Available: ${validApps.join(', ')}`, '']);
          }
        } else {
          setHistory([...newHistory, 'Usage: open <app_name> (e.g. open figma, open vscode, open contact)', '']);
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
      const available = ['help', 'neofetch', 'wallpaper', 'wallpaper roxy', 'wallpaper cyber', 'wallpaper batman', 'wallpaper anime', 'wallpaper cat', 'wallpaper dark', 'wallpaper monterey', 'wallpaper cosmic', 'wallpaper aurora', 'skills', 'projects', 'vibecoding', 'experience', 'contact', 'clear', 'cat resume', 'open figma', 'open vscode', 'open contact'];
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

  const currentWpStyle = getWpStyle(activeWallpaperId, tintLevel);

  return (
    <div 
      className="terminal-wrapper" 
      onClick={handleContainerClick}
    >
      {/* Animated Terminal Wallpaper Backdrop Layers (macOS Sequoia Crossfade) */}
      <div className="terminal-wallpaper-viewport" aria-hidden="true">
        {prevWpStyle && (
          <div 
            key="terminal-wp-outgoing"
            className="terminal-backdrop-layer outgoing"
            style={prevWpStyle}
          />
        )}
        <div 
          key={`terminal-wp-${activeWallpaperId}-${tintLevel}`}
          className={`terminal-backdrop-layer ${isWpTransitioning ? 'incoming' : 'active'}`}
          style={currentWpStyle}
        />
      </div>

      {/* Top Quick Command Bar */}
      {isQuickBarVisible ? (
        <div className="terminal-quick-bar">
          <div className="quick-bar-cmds">
            <span className="quick-bar-label">⚡ Cmds:</span>
            {['neofetch', 'skills', 'projects', 'vibecoding', 'clear'].map((cmd) => (
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
          </div>

          <div className="terminal-quick-divider" />

          <div className="quick-bar-wallpapers">
            <span className="quick-bar-label">🖼️ Wallpaper:</span>
            <button
              type="button"
              className="terminal-cycle-btn"
              onClick={(e) => {
                e.stopPropagation();
                cycleWallpaper(-1);
              }}
              title="Previous Wallpaper (Cycle Left)"
            >
              ‹
            </button>
            <div className="terminal-wp-select-wrap">
              <select
                className="terminal-wp-select"
                value={activeWallpaperId}
                onChange={(e) => {
                  e.stopPropagation();
                  setTerminalWallpaper(e.target.value);
                }}
                title="Select Terminal Wallpaper"
              >
                {terminalWallpapers.map((wp) => (
                  <option key={wp.id} value={wp.id}>
                    {wp.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="terminal-cycle-btn"
              onClick={(e) => {
                e.stopPropagation();
                cycleWallpaper(1);
              }}
              title="Next Wallpaper (Cycle Right)"
            >
              ›
            </button>
          </div>

          <div className="terminal-quick-divider" />

          {/* Wallpaper Tint Controller */}
          <div className="quick-bar-tint">
            <span className="quick-bar-label">Tint:</span>
            <button
              type="button"
              className={`terminal-tint-btn ${tintLevel === 'vivid' ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); handleSelectTint('vivid'); }}
              title="Vivid Artwork with Enhanced Text Contrast"
            >
              Vivid
            </button>
            <button
              type="button"
              className={`terminal-tint-btn ${tintLevel === 'balanced' ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); handleSelectTint('balanced'); }}
              title="Balanced High-Contrast Scrim"
            >
              Norm
            </button>
          </div>

          {/* Hide Bar Button (lets user see full unblocked wallpaper) */}
          <button
            type="button"
            className="terminal-bar-toggle-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsQuickBarVisible(false);
            }}
            title="Hide top bar to view full unblocked wallpaper"
          >
            <EyeOff size={11} />
            <span>Hide Bar</span>
          </button>
        </div>
      ) : (
        /* Floating Unhide Pill Button */
        <button
          type="button"
          className="terminal-floating-show-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsQuickBarVisible(true);
          }}
          title="Show terminal shortcut bar"
        >
          <Eye size={12} />
          <span>Show Bar</span>
        </button>
      )}

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
