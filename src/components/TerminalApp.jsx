import React, { useState, useEffect, useRef } from 'react';
import './TerminalApp.css';

const WELCOME_BANNER = [
  'Last login: ' + new Date().toLocaleString() + ' on ttys001',
  'VarunOS Sequoia Darwin 24.1.0 (arm64)',
  '',
  'Welcome to Varun Sehgal\'s Interactive Terminal.',
  'Type "help" to see all available commands.',
  ''
];

const HELP_TEXT = [
  'Available Commands:',
  '  about        - View quick summary about Varun',
  '  skills       - Display UI/UX & technical toolset',
  '  projects     - List key case studies and platforms',
  '  experience   - Show career timeline & internships',
  '  contact      - Get email, phone, and social handles',
  '  whoami       - Display current active user session',
  '  date         - Print current system date & time',
  '  cat resume   - Read text summary of resume',
  '  open <app>   - Launch an app (finder, figma, resume, safari, etc.)',
  '  clear        - Clear terminal screen'
];

const TerminalApp = ({ userName = 'Guest', onOpenApp }) => {
  const [history, setHistory] = useState(WELCOME_BANNER);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    const newHistory = [...history, `varun@MacBook-Pro ~ % ${rawCmd}`];
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    const parts = cmd.toLowerCase().split(' ');
    const mainCmd = parts[0];
    const arg = parts.slice(1).join(' ');

    switch (mainCmd) {
      case 'help':
        setHistory([...newHistory, ...HELP_TEXT, '']);
        break;

      case 'about':
        setHistory([
          ...newHistory,
          'Varun Sehgal',
          'Role: UI/UX Designer & Product Designer',
          'Location: Gwalior, Madhya Pradesh, India',
          'Education: B.Tech in CSE @ JUET (2023 - 2027)',
          'Focus: High-impact SaaS, AI workflows, Design Systems & Motion UX',
          ''
        ]);
        break;

      case 'skills':
        setHistory([
          ...newHistory,
          '• Design Tools: Figma, Figma AI, Adobe XD, Photoshop, Illustrator, FigJam',
          '• AI Workflows: Uizard, Galileo AI, Visily, Figma Magician, Automator',
          '• Core UX: Wireframing, Rapid Prototyping, Usability Testing, Design Systems',
          '• Frontend: React.js, Next.js, TypeScript, Tailwind CSS, HTML5/CSS3, Git',
          ''
        ]);
        break;

      case 'projects':
        setHistory([
          ...newHistory,
          '1. AI Interview & Prep Platform — Automated candidate evaluation & dark UI',
          '2. EventFlow Ticketing SaaS — 4-step flow reducing drop-off by 30%',
          '3. Expensify Tracker App — 17+ screens optimized for <5s expense logging',
          '4. CodeSrijan Hackathon — 72hr evaluation system for 200+ developers',
          'Tip: Use "open figma" or "open finder" to see them interactively.',
          ''
        ]);
        break;

      case 'experience':
        setHistory([
          ...newHistory,
          '• UniEvent (Jun 2026 - Nov 2026): UI/UX Designer Intern',
          '• Assemble (Aug 2025 - Jan 2026): Assistant Head of Operations',
          '• Knaptix Ventures (Jun 2025 - Aug 2025): UI/UX Designer Intern',
          '• Freelance UI/UX (Jan 2024 - Present): 10+ projects with 95% retention',
          ''
        ]);
        break;

      case 'contact':
        setHistory([
          ...newHistory,
          '• Email:    varun.sehgal02@gmail.com',
          '• Phone:    +91 9399361193',
          '• GitHub:   github.com/varunsehgal05',
          '• LinkedIn: linkedin.com/in/varunsehgal02',
          '• Behance:  behance.net/varunsehgal3',
          ''
        ]);
        break;

      case 'whoami':
        setHistory([...newHistory, `user: ${userName || 'Guest'} (authenticated collaborator)`, '']);
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
            '=== RESUME SUMMARY ===',
            'Name: Varun Sehgal',
            'Education: B.Tech Computer Science (JUET)',
            'Specialization: UI/UX, Product Architecture, Figma Design Systems',
            'Download PDF: Available via Resume App on desktop',
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
            setHistory([...newHistory, `Opening ${target}...`, '']);
          } else {
            setHistory([...newHistory, `open: application not found: ${arg}`, `Available: ${validApps.join(', ')}`, '']);
          }
        } else {
          setHistory([...newHistory, 'Usage: open <app_name> (e.g. open figma)', '']);
        }
        break;

      case 'uname':
        setHistory([...newHistory, 'Darwin VarunOS-Sequoia 24.1.0 Darwin Kernel Version 24.1.0 arm64', '']);
        break;

      case 'sudo':
        setHistory([...newHistory, 'Password: ••••••••', 'varun is not in the sudoers file. This incident will be reported.', '']);
        break;

      default:
        setHistory([...newHistory, `zsh: command not found: ${mainCmd}. Type "help" for a list of commands.`, '']);
        break;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
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

  return (
    <div className="terminal-container" onClick={handleContainerClick}>
      <div className="terminal-output">
        {history.map((line, idx) => (
          <div key={idx} className="terminal-line">
            {line}
          </div>
        ))}

        <div className="terminal-input-row">
          <span className="terminal-prompt">varun@MacBook-Pro ~ %</span>
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
  );
};

export default TerminalApp;