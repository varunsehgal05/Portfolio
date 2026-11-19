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
  Globe
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
  { id: 'codesrijan', label: '⚡ CodeSrijan (Live)', url: 'http://codesrijan-nine.vercel.app/' },
  { id: 'portfolio', label: '🌐 Portfolio Live', url: 'https://varunsehgal.runs-on.dev' },
  { id: 'github', label: '🐙 GitHub', url: 'https://github.com/varunsehgal05' },
  { id: 'linkedin', label: '💼 LinkedIn', url: 'https://linkedin.com/in/varunsehgal02' }
];

export const SafariApp = () => {
  const [url, setUrl] = useState('http://codesrijan-nine.vercel.app/');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="safari-root">
      <header className="safari-toolbar">
        <div className="nav-buttons">
          <ArrowLeft size={14} />
        </div>
      </header>
    </div>
  );
};`;

// Authentic full 211-line ATS LaTeX resume of Varun Sehgal
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
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage[T1]{fontenc}

\\definecolor{underlineColor}{rgb}{0,0,0}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.75in}
\\addtolength{\\textheight}{1.3in}

\\urlstyle{same}

\\raggedbottom
\\raggedright

\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-7pt}\\scshape\\raggedright\\large
}{}{0em}{} [\\color{black}\\titlerule \\vspace{-5pt}]

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-6pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small\\textbf{#1} & #2 \\\\
    \\end{tabular*}\\vspace{-6pt}
}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}\\vspace{-3pt}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\newcommand{\\myUnderline}[1]{%
  \\begingroup
  \\color{underlineColor}%
  \\underline{\\hypersetup{linkcolor=underlineColor}#1}%
  \\endgroup
}

%-------------------------------------------
\\begin{document}

%----------HEADING----------
\\begin{center}
    {\\Large \\textbf{VARUN SEHGAL}} \\\\ \\vspace{3pt}
    \\small UI/UX Designer \\textbar{} Product Designer \\\\ \\vspace{2pt}
    \\small Gwalior, Madhya Pradesh, India \\quad
    \\href{tel:+919399361193}{+91-9399361193} \\quad
    \\href{mailto:varun.sehgal02@gmail.com}{varun.sehgal02@gmail.com} \\\\ \\vspace{3pt}
    \\small
    \\myUnderline{\\href{https://varunsehgal.runs-on.dev}{Portfolio}} \\quad
    \\myUnderline{\\href{https://www.behance.net/varunsehgal3}{Behance}} \\quad
    \\myUnderline{\\href{https://www.linkedin.com/in/varunsehgal02}{LinkedIn}} \\quad
    \\myUnderline{\\href{https://github.com/varunsehgal05}{GitHub}}
\\end{center}

\\vspace{-6pt}

%-----------SUMMARY-----------
\\section{Professional Summary}
\\small{UI/UX \\& Product Designer with 3+ years of experience delivering high-impact SaaS and AI product experiences. Skilled in user research, wireframing, rapid prototyping, and design systems, with proven results including a 45\\% increase in user engagement and a 30\\% reduction in drop-off rates. Leverages modern design-engineering workflows and AI-augmented tools (Figma AI, Uizard, Galileo AI) to accelerate research synthesis and prototype delivery without sacrificing visual or UX precision.}

%-----------SKILLS-----------
\\section{Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
    \\textbf{UI/UX Design}{: Wireframing, Rapid Prototyping, User Research, Usability Testing, User Flows, Interaction Design, Design Systems, Information Architecture, Responsive Web Design} \\\\
    \\textbf{Design Tools}{: Figma, Figma AI, Adobe XD, Adobe Photoshop, Adobe Illustrator, FigJam} \\\\
    \\textbf{AI-Augmented Design}{: Uizard, Galileo AI, Visily, Figma Magician Plugin, Figma Automator, ChatGPT / Claude} \\\\
    \\textbf{Technical \\& Prototyping}{: React.js, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3, Design Tokens, Git}
  }}
\\end{itemize}

\\vspace{-4pt}

%-----------EXPERIENCE-----------
\\section{Professional Experience}
\\resumeSubHeadingListStart

  \\resumeSubheading
    {UI/UX Designer Intern}{Jun 2024 -- Nov 2024}
    {UniEvent}{Remote}
    \\resumeItemListStart
      \\resumeItem{\\textbf{Designed} user-focused digital experiences and translated complex business requirements into clear, consistent interfaces for campus event ticketing platform (EventFlow). Completed in early November 2024.}
      \\resumeItem{\\textbf{Architected} 4-step booking flow optimization, slashing transaction drop-off by 30\\% across 50+ modular components.}
    \\resumeItemListEnd

  \\resumeSubheading
    {Assistant Head of Operations}{Aug 2024 -- Jan 2025}
    {Assemble}{Remote}
    \\resumeItemListStart
      \\resumeItem{\\textbf{Assisted} in the planning and smooth execution of CODM tournaments and esports events, driving operational excellence and cross-functional coordination.}
    \\resumeItemListEnd

  \\resumeSubheading
    {UI/UX Designer Intern}{Jun 2024 -- Aug 2024}
    {Knaptix Ventures Private Limited}{Pune, India (Remote)}
    \\resumeItemListStart
      \\resumeItem{\\textbf{Conceptualized} 5+ high-fidelity UI/UX interfaces for web/mobile, achieving a 40\\% increase in user satisfaction scores during testing phases.}
      \\resumeItem{\\textbf{Accelerated} wireframe-to-prototype turnaround by leveraging AI-assisted Figma plugins (Magician, Automator), cutting early-stage design time by 45\\%.}
      \\resumeItem{\\textbf{Facilitated} design-to-engineering hand-offs, reducing implementation friction and technical errors by 15\\%.}
    \\resumeItemListEnd

  \\resumeSubheading
    {Freelance UI/UX Designer}{Jan 2024 -- Present}
    {Self-Employed}{Remote}
    \\resumeItemListStart
      \\resumeItem{\\textbf{Executed} 10+ end-to-end UI/UX design projects for tech startups, maintaining a 95\\% client retention rate through iterative, human-centered delivery.}
      \\resumeItem{\\textbf{Redesigned} product interfaces for 4 early-stage companies, using AI-assisted prototyping tools (Uizard, Galileo AI) to speed up concept iteration and improve usability.}
    \\resumeItemListEnd

\\resumeSubHeadingListEnd

%-----------PROJECTS-----------
\\section{Design Projects}
\\resumeSubHeadingListStart

  \\resumeProjectHeading
    {\\textbf{AI Interview \\& Preparation Platform} \\textbar{} \\myUnderline{\\href{https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842}{\\textit{Figma Link}}}}{Jan 2026 -- Apr 2026}
    \\resumeItemListStart
      \\resumeItem{\\textbf{Architected} an AI-driven SaaS platform, integrating specialized "Security" and "Grading" modules to automate candidate evaluation processes.}
      \\resumeItem{\\textbf{Streamlined} dense analytical data into a clean dark-themed UI, enhancing dashboard scannability and user task efficiency by 25\\%.}
    \\resumeItemListEnd

  \\resumeProjectHeading
    {\\textbf{EventFlow: Event Ticketing SaaS} \\textbar{} \\myUnderline{\\href{https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2}{\\textit{Figma Link}}}}{Oct 2025 -- Jan 2026}
    \\resumeItemListStart
      \\resumeItem{\\textbf{Spearheaded} a 4-step booking flow optimization that minimized user drop-off by 30\\% through simplified checkout psychology.}
      \\resumeItem{\\textbf{Constructed} a comprehensive design system with 50+ modular components to ensure cross-platform visual consistency.}
    \\resumeItemListEnd

  \\resumeProjectHeading
    {\\textbf{Expensify: Budget Tracker App} \\textbar{} \\myUnderline{\\href{https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318}{\\textit{Figma Link}}}}{May 2025 -- Aug 2025}
    \\resumeItemListStart
      \\resumeItem{\\textbf{Refined} 17+ screens for real-time analytics, reducing the average "Add Expense" transaction time to under 5 seconds.}
    \\resumeItemListEnd

\\resumeSubHeadingListEnd

%-----------HACKATHONS & LEADERSHIP-----------
\\section{Hackathons \\& Leadership}
\\resumeSubHeadingListStart

  \\resumeSubheading
    {Co-Organizer \\& Lead Designer \\textbar{} \\myUnderline{\\href{https://lnkd.in/p/dUXQYx92}{\\textit{LinkedIn Post}}}}{Apr 2024}
    {CodeSrijan Hackathon -- JUET}{Guna, India}
    \\resumeItemListStart
      \\resumeItem{\\textbf{Event Branding:} Directed complete visual identity and design system for a 72-hour hackathon with 200+ participants; designed official event merchandise, participant ID cards, certificates, and marketing creatives.}
      \\resumeItem{\\textbf{Ecosystem Design:} Architected the digital platform UI covering team formation, submission portals, and real-time mentor evaluation, successfully coordinating operations under 72h high-pressure conditions. Boosted registrations by 20\\% YoY.}
    \\resumeItemListEnd

  \\resumeSubheading
    {2nd Runner-up (Team Pixel\\_Codes) \\textbar{} \\myUnderline{\\href{https://www.linkedin.com/posts/pushkar-chaturvedi-a83778284_hackathon2025-codeconquerors-aiineducation-activity-7335535096017375236-DBk_}{\\textit{Post Link}}}}{Apr 2024}
    {Code Conquerors Hackathon -- JUET (Dept. of ECE)}{Guna, India}
    \\resumeItemListStart
      \\resumeItem{\\textbf{Frontend \\& Prototyping:} Led frontend development and UI design in a 12-hour offline hackathon (150+ participants), building an AI-powered quiz generator for educators using Next.js and Tailwind CSS.}
      \\resumeItem{\\textbf{LLM Integration:} Engineered interactive question builder workflows and dynamic answer-key verification interfaces consuming Ollama local LLM APIs, securing 2nd Runner-up among 40+ teams.}
    \\resumeItemListEnd

\\resumeSubHeadingListEnd

%-----------EDUCATION-----------
\\section{Education}
\\resumeSubHeadingListStart

  \\resumeSubheading
    {Bachelor of Technology in Computer Science and Engineering}{Aug 2023 -- May 2027}
    {Jaypee University of Engineering and Technology}{Guna, India}

\\resumeSubHeadingListEnd

\\end{document}
`;

const PORTFOLIO_CONFIG_CODE = `/**
 * Varun Sehgal — Portfolio Configuration & Personal Metadata
 * UI/UX Designer | Product Designer | Frontend Engineer
 * Gwalior, Madhya Pradesh, India • +91 9399361193 • varun.sehgal02@gmail.com
 */

export interface PortfolioProfile {
  name: string;
  role: string;
  location: string;
  contact: {
    phone: string;
    email: string;
    portfolioUrl: string;
    linkedin: string;
    behance: string;
    github: string;
  };
  summary: string;
}

export const PORTFOLIO_METADATA: PortfolioProfile = {
  name: "Varun Sehgal",
  role: "UI/UX & Product Designer | Frontend Engineer",
  location: "Gwalior, Madhya Pradesh, India",
  contact: {
    phone: "+91-9399361193",
    email: "varun.sehgal02@gmail.com",
    portfolioUrl: "https://varunsehgal.runs-on.dev",
    linkedin: "https://linkedin.com/in/varunsehgal02",
    behance: "https://behance.net/varunsehgal3",
    github: "https://github.com/varunsehgal05"
  },
  summary: "UI/UX & Product Designer with 3+ years of experience delivering high-impact SaaS and AI product experiences. Skilled in user research, wireframing, rapid prototyping, and design systems, with proven results including a 45% increase in user engagement and a 30% reduction in drop-off rates."
};

export const CORE_SKILLS = {
  design: [
    "Wireframing & User Flows",
    "Rapid High-Fidelity Prototyping",
    "Design Systems & Token Studios",
    "User Research & Usability Testing",
    "Information Architecture",
    "WCAG AA Accessibility"
  ],
  designTools: [
    "Figma", "Figma AI", "Adobe XD", "Adobe Photoshop", "Adobe Illustrator", "FigJam"
  ],
  aiAugmentedTools: [
    "Uizard", "Galileo AI", "Visily", "Figma Magician Plugin", "Figma Automator"
  ],
  frontendEngineering: [
    "React.js", "Next.js", "TypeScript", "Tailwind CSS", "CSS3 / HTML5", "Git & Vercel"
  ]
};

export const EDUCATION = {
  degree: "Bachelor of Technology in Computer Science and Engineering",
  institution: "Jaypee University of Engineering and Technology (JUET)",
  period: "Aug 2023 — May 2027",
  location: "Guna, Madhya Pradesh, India"
};

export const VIBECODED_PROJECT = {
  id: "codesrijan",
  name: "CodeSrijan Hackathon Ecosystem",
  liveDeploymentUrl: "http://codesrijan-nine.vercel.app/",
  role: "Co-Organizer & Lead UI/UX Designer",
  stats: {
    participants: "200+ Hackers & Builders",
    duration: "72-Hour Live Sprint",
    teams: "50+ Teams",
    prizePool: "$5,000+ Evaluation Matrix",
    growth: "+20% YoY Registrations"
  }
};`;

const EXPERIENCE_TS_CODE = `/**
 * Career Experience & Case Studies
 * Author: Varun Sehgal
 */

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
}

export const CAREER_TIMELINE: ExperienceItem[] = [
  {
    id: "unievent",
    role: "UI/UX Designer Intern",
    company: "UniEvent (Campus Ticketing Platform)",
    period: "Jun 2024 — Nov 2024",
    location: "Remote",
    achievements: [
      "Designed user-focused digital experiences and translated complex business requirements into clear, consistent interfaces for campus ticketing platform (EventFlow).",
      "Architected 4-step booking flow optimization, slashing transaction drop-off by 30% across 50+ modular components.",
      "Engineered comprehensive Figma token pipelines for seamless dark/light theme switching."
    ]
  },
  {
    id: "assemble",
    role: "Assistant Head of Operations / UI/UX Intern",
    company: "Assemble",
    period: "Aug 2024 — Jan 2025",
    location: "Remote",
    achievements: [
      "Assisted in the planning and smooth execution of CODM tournaments and esports events, driving operational excellence.",
      "Designed collaborative creator workspace tools and interaction prototypes in Figma."
    ]
  },
  {
    id: "knaptix",
    role: "UI/UX Designer Intern",
    company: "Knaptix Ventures Private Limited",
    period: "Jun 2024 — Aug 2024",
    location: "Pune, India (Remote)",
    achievements: [
      "Conceptualized 5+ high-fidelity UI/UX interfaces for web/mobile, achieving a 40% increase in user satisfaction scores during testing phases.",
      "Accelerated wireframe-to-prototype turnaround by leveraging AI-assisted Figma plugins (Magician, Automator), cutting early-stage design time by 45%.",
      "Facilitated design-to-engineering hand-offs, reducing implementation friction and technical errors by 15%."
    ]
  },
  {
    id: "freelance",
    role: "Freelance UI/UX Designer",
    company: "Self-Employed",
    period: "Jan 2024 — Present",
    location: "Remote",
    achievements: [
      "Executed 10+ end-to-end UI/UX design projects for tech startups, maintaining a 95% client retention rate through human-centered delivery.",
      "Redesigned product interfaces for 4 early-stage companies, utilizing AI-assisted prototyping tools (Uizard, Galileo AI) to speed up concept iteration."
    ]
  }
];`;

const CODESRIJAN_PAGE_CODE = `import React, { useState } from 'react';
import { Sparkles, Trophy, Users, Clock, Flame, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

/**
 * CodeSrijan Hackathon Portal
 * Live Production Deployment: http://codesrijan-nine.vercel.app/
 * Lead UI/UX & Identity: Varun Sehgal
 * Organization: Jaypee University of Engineering & Technology (JUET)
 */
export default function CodeSrijanHackathonPortal() {
  const [activeTrack, setActiveTrack] = useState('aiml');

  const TRACKS = [
    { id: 'aiml', title: 'AI & Machine Learning', icon: '🤖', desc: 'Autonomous multi-agent workflows, generative interfaces, and real-time inference tools.' },
    { id: 'web3', title: 'Web3 & FinTech', icon: '⚡', desc: 'Decentralized platforms, peer-to-peer protocols, and frictionless micro-transactions.' },
    { id: 'health', title: 'HealthTech & Bio', icon: '🩺', desc: 'Predictive health analytics, patient diagnostics, and accessible triage software.' },
    { id: 'open', title: 'Open Innovation / SaaS', icon: '🚀', desc: 'High-conversion developer tools, cloud telemetry suites, and enterprise workflows.' }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-white font-sans antialiased">
      {/* Vercel Live Deployment Header */}
      <header className="border-b border-cyan-500/20 bg-cyan-950/30 px-6 py-2.5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-cyan-400 font-semibold">LIVE PRODUCTION DEPLOYMENT:</span>
          <a href="http://codesrijan-nine.vercel.app/" target="_blank" rel="noreferrer" className="underline hover:text-white transition">
            http://codesrijan-nine.vercel.app/ ↗
          </a>
        </div>
        <div className="text-zinc-400">JUET ACM & CSI Chapter • Lead Designer: Varun Sehgal</div>
      </header>

      {/* Hero Section */}
      <section className="relative px-8 py-16 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 text-xs font-mono mb-6">
          <Sparkles size={13} className="text-purple-400" />
          <span>National Level Hackathon Ecosystem • 72-Hour Sprint</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent mb-6">
          Srijaning the Future: <br />
          <span className="text-cyan-400">Code.</span> <span className="text-purple-400">Innovate.</span> <span className="text-pink-400">Conquer.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-zinc-400 text-base leading-relaxed mb-8">
          Architected with high-fidelity design systems and rapid prototyping by Varun Sehgal. Empowering 200+ developers across 50+ teams to build transformative solutions in a high-intensity 72h arena.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="http://codesrijan-nine.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-black hover:opacity-95 shadow-lg shadow-cyan-500/25 flex items-center gap-2"
          >
            <span>Launch Live App</span>
            <ExternalLink size={16} />
          </a>
          <a
            href="https://lnkd.in/p/dUXQYx92"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-lg border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 font-semibold text-zinc-200 flex items-center gap-2"
          >
            <span>Official Post ↗</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-left">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur">
            <div className="text-3xl font-black text-cyan-400">200+</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Active Hackers</div>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur">
            <div className="text-3xl font-black text-purple-400">72 Hours</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Live Coding Sprint</div>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur">
            <div className="text-3xl font-black text-emerald-400">$5,000+</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Prize Pool Matrix</div>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur">
            <div className="text-3xl font-black text-pink-400">+20% YoY</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Registration Growth</div>
          </div>
        </div>
      </section>
    </div>
  );
}`;

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
    code: CODESRIJAN_PAGE_CODE
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
  'experience.ts': {
    name: 'experience.ts',
    path: 'src > data > 📄 experience.ts',
    icon: 'ts',
    lang: 'TypeScript',
    code: EXPERIENCE_TS_CODE
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
  'TerminalApp.jsx',
  'Live Preview: CodeSrijan',
  'codesrijan/page.tsx',
  'portfolio.config.ts',
  'Varun_Sehgal_Resume_Updated.tex',
  'experience.ts',
  'FinderApp.css',
  'SafariApp.jsx',
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
  const codeLines = currentFile.code ? currentFile.code.split('\n') : [];

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
    } else if (lower.startsWith('curl http://codesrijan') || lower.startsWith('curl https://codesrijan') || lower === 'curl codesrijan') {
      newHistory.push({ type: 'output', text: 'HTTP/2 200 OK' });
      newHistory.push({ type: 'output', text: 'content-type: text/html; charset=utf-8' });
      newHistory.push({ type: 'output', text: 'server: Vercel' });
      newHistory.push({ type: 'output', text: '<title>CodeSrijan — National Level Hackathon Ecosystem</title>' });
      newHistory.push({ type: 'output', text: '<body><h1>Srijaning the Future: Code, Innovate, Conquer</h1>' });
      newHistory.push({ type: 'output', text: '<p>Co-Organizer & Lead UI/UX Designer: Varun Sehgal</p></body>' });
    } else if (lower.startsWith('open http://codesrijan') || lower.startsWith('start http://codesrijan') || lower === 'codesrijan') {
      window.open('http://codesrijan-nine.vercel.app/', '_blank');
      newHistory.push({ type: 'output', text: 'Opening http://codesrijan-nine.vercel.app/ in default browser...' });
    } else if (lower === 'cat resume' || lower === 'cat varun_sehgal_resume_updated.tex') {
      newHistory.push({ type: 'output', text: 'VARUN SEHGAL — UI/UX Designer | Product Designer | Frontend Engineer' });
      newHistory.push({ type: 'output', text: 'Gwalior, MP, India | varun.sehgal02@gmail.com | +91 9399361193' });
      newHistory.push({ type: 'output', text: 'Experience: UniEvent (EventFlow), Assemble, Knaptix Ventures, Freelance' });
      newHistory.push({ type: 'output', text: 'Education: B.Tech CSE, Jaypee University of Eng. & Tech (2023 - 2027)' });
      newHistory.push({ type: 'output', text: 'Featured Project: CodeSrijan Hackathon Ecosystem (http://codesrijan-nine.vercel.app/)' });
    } else if (lower === 'whoami') {
      newHistory.push({ type: 'output', text: 'Varun Sehgal (UI/UX Designer | Product Designer | Frontend Engineer)' });
    } else if (lower === 'git status') {
      newHistory.push({ type: 'output', text: 'On branch main' });
      newHistory.push({ type: 'output', text: "Your branch is up to date with 'origin/main'." });
      newHistory.push({ type: 'output', text: 'nothing to commit, working tree clean' });
    } else if (lower === 'npm run dev' || lower === 'npm start') {
      newHistory.push({ type: 'output', text: '> destop-portflio@0.0.0 dev' });
      newHistory.push({ type: 'output', text: '> vite' });
      newHistory.push({ type: 'output', text: '  VITE v8.3.2  ready in 240 ms' });
      newHistory.push({ type: 'output', text: '  ➜  Local:   http://localhost:5173/' });
      newHistory.push({ type: 'output', text: '  ➜  Live:    http://codesrijan-nine.vercel.app/' });
    } else if (lower === 'ls' || lower === 'dir') {
      newHistory.push({ type: 'output', text: '    Directory: C:\\Users\\Varun\\Downloads\\destop-portflio' });
      newHistory.push({ type: 'output', text: 'Mode                 LastWriteTime         Length Name' });
      newHistory.push({ type: 'output', text: 'd-----        19-11-2026     02:30                codesrijan' });
      newHistory.push({ type: 'output', text: 'd-----        19-11-2026     02:30                src' });
      newHistory.push({ type: 'output', text: 'd-----        19-11-2026     02:30                public' });
      newHistory.push({ type: 'output', text: '-a----        19-11-2026     02:30           1420 package.json' });
      newHistory.push({ type: 'output', text: '-a----        19-11-2026     02:30           1080 vite.config.js' });
      newHistory.push({ type: 'output', text: '-a----        19-11-2026     02:30           8420 Varun_Sehgal_Resume_Updated.tex' });
    } else if (lower === 'node -v' || lower === 'node --version') {
      newHistory.push({ type: 'output', text: 'v20.18.0' });
    } else if (lower === 'help') {
      newHistory.push({ type: 'output', text: 'Available commands: codesrijan, curl http://codesrijan-nine.vercel.app/, cat resume, whoami, git status, npm run dev, ls, clear' });
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
    if (iconType === 'ts') {
      return <span className="tab-file-icon icon-ts text-[#38bdf8] font-bold text-[10.5px]">TS</span>;
    }
    if (iconType === 'tex') {
      return <span className="tab-file-icon icon-tex">T</span>;
    }
    if (iconType === 'globe') {
      return <span className="tab-file-icon icon-globe text-emerald-400">🌐</span>;
    }
    return <span className="tab-file-icon icon-default">📄</span>;
  };

  // Syntax highlighting parser with inline color preview swatches
  const renderSyntaxHighlightedLine = (line, lineNum) => {
    const hexMatch = line.match(/(#[0-9a-fA-F]{3,8})/);
    const hexColor = hexMatch ? hexMatch[1] : null;

    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('%')) {
      return <span className="token-comment">{line}</span>;
    }

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
    const parts = text.split(/('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^\`\\]|\\.)*`|\b(?:import|export|from|const|let|var|return|function|default|class|interface|type|async|await|new|if|else|switch|case|break)\b)/g);

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
          <div className="titlebar-app-icon" title="Antigravity IDE">
            <span className="antigravity-brand-a">A</span>
          </div>
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

        <div className="titlebar-center">
          <span className="titlebar-file-label">
            destop-portflio - Antigravity IDE - {activeFile}
          </span>
        </div>

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
              {/* Project 1: CodeSrijan (Vibecoded Hackathon Ecosystem) */}
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

              {/* Project 2: VarunOS Portfolio Workspace */}
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
                {/* File Items */}
                {Object.keys(PROJECT_FILES).filter(k => !k.includes('CodeSrijan') && !k.includes('codesrijan')).map((fileName) => {
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
            <span className="crumb-text">{currentFile.path ? currentFile.path.split(' > ')[0] : 'src'}</span>
            <span className="crumb-chevron">&gt;</span>
            <span className="crumb-text">{currentFile.path ? currentFile.path.split(' > ')[1] || 'components' : 'components'}</span>
            <span className="crumb-chevron">&gt;</span>
            <span className="crumb-icon">{renderTabIcon(currentFile.icon)}</span>
            <span className="crumb-text active-crumb">{currentFile.name}</span>
            <span className="crumb-chevron">&gt;</span>
            <span className="crumb-text muted">...</span>
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
                      <span>⚡ National Level Hackathon Ecosystem • 72-Hour Sprint</span>
                    </div>
                    <h2 className="interactive-title">Srijaning the Future: Code, Innovate, Conquer</h2>
                    <p className="interactive-desc">
                      Live hackathon platform designed by <strong>Varun Sehgal</strong> (Co-Organizer & Lead UI/UX Designer) for Jaypee University of Engineering & Technology. Powering registration, real-time rubric evaluation, and team matching for 200+ hackathon participants across 50+ universities.
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
                      <div className="stat-box">
                        <div className="stat-val">+20%</div>
                        <div className="stat-lbl">Registration Growth</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <a
                        href="http://codesrijan-nine.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="webview-external-btn"
                        style={{ padding: '8px 18px', fontSize: '13px' }}
                      >
                        <span>Visit codesrijan-nine.vercel.app</span>
                        <ExternalLink size={14} />
                      </a>
                      <a
                        href="https://lnkd.in/p/dUXQYx92"
                        target="_blank"
                        rel="noreferrer"
                        className="webview-external-btn"
                        style={{ padding: '8px 18px', fontSize: '13px', background: 'rgba(255,255,255,0.06)', color: '#ffffff' }}
                      >
                        <span>Official LinkedIn Post ↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
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
          )}

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

                <div className="terminal-actions-group">
                  <span className="terminal-badge-pill">
                    <span className="terminal-badge-icon">&gt;</span>
                    <span>powershell</span>
                  </span>
                  <button className="terminal-icon-btn" title="New Terminal">+</button>
                  <button className="terminal-icon-btn" title="Split Terminal">
                    <Split size={12} />
                  </button>
                  <button className="terminal-icon-btn" title="Kill Terminal">
                    <X size={12} />
                  </button>
                  <button className="terminal-icon-btn" title="More Terminal Actions">
                    <MoreHorizontal size={12} />
                  </button>
                </div>
              </div>

              {/* Terminal Body with Interactive Shell */}
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
                    className="terminal-text-input"
                    autoFocus={false}
                    spellCheck={false}
                  />
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
              <span className="status-item sync">
                <span>⟳</span>
              </span>
              <span className="status-item diagnostics">
                <span>⨂ 0</span>
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
