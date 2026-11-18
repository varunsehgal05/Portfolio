import { useState, useRef, useEffect, useMemo } from 'react';
import FirebaseImage from './FirebaseImage';
import './FigmaApp.css';

// SVG Curved Dashed Connector matching Image 3 (media_1795031282009_9579b3a1.png)
const FigmaDashedConnector = ({ x1, y1, x2, y2, color = '#38bdf8' }) => {
  const dx = x2 - x1;
  const cx1 = x1 + dx * 0.5;
  const cy1 = y1;
  const cx2 = x1 + dx * 0.5;
  const cy2 = y2;
  const pathD = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

  return (
    <g className="figma-dashed-connector">
      {/* Outer ambient glow */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeOpacity="0.18"
      />
      {/* Cyan dashed curve */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />
      {/* Origin dot */}
      <circle cx={x1} cy={y1} r="4.5" fill={color} />
      {/* Terminal connection disc matching Image 3 */}
      <circle cx={x2} cy={y2} r="5.5" fill={color} />
    </g>
  );
};

// Signature Figma Blue Selection Box with 4 Corner Handles
const FigmaSelectionBox = ({ node }) => (
  <div className="figma-selection-box">
    <div className="figma-corner-handle top-left" />
    <div className="figma-corner-handle top-right" />
    <div className="figma-corner-handle bottom-left" />
    <div className="figma-corner-handle bottom-right" />
    <div className="figma-selection-badge">
      <span>❖ {node.name || 'Frame'}</span>
      <span style={{ opacity: 0.7 }}>[{node.width}×{node.height}]</span>
    </div>
  </div>
);

const CREATIVE_NOTES = [
  "Don't forget to inspect responsive breakpoints!",
  "Review design tokens with the dev team at 4pm",
  "Slashing checkout drop-off by 30% with 4-step flow 🚀",
  "800+ hackathon participants registered on CodeSrijan",
  "Check contrast ratio for dark mode palettes",
  "Token Studio sync complete with Tailwind variables"
];

const INITIAL_SHAPES = [
  { id: 'note-1', text: 'Ideation: Prioritize dark mode native ergonomics and high contrast glows.', color: 'bg-yellow-200', x: 80, y: 60, isPinned: false },
  { id: 'note-2', text: 'Token Architecture: Map all colors to CSS variables for instant theme switching.', color: 'bg-blue-200', x: 920, y: 70, isPinned: false },
  { id: 'note-3', text: 'Micro-interactions: Add spring physics to active window modals & dock.', color: 'bg-pink-200', x: 920, y: 520, isPinned: false }
];

const ALL_PROJECTS = [
  {
    id: 'ai-interview',
    name: 'AI Interview Prep System',
    category: 'SaaS / Web',
    badge: '40+ Components',
    metric: '40+ Components • Real-time Scoring',
    image: '/figma_AI_Interview.png',
    desc: 'Automated technical & behavioral mock interview platform with real-time AI scoring, candidate evaluation, and grading matrix.',
    tags: ['Figma', 'SaaS', 'AI UX', 'Dark Mode'],
    link: 'https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1'
  },
  {
    id: 'movie-tickets',
    name: 'Movie Ticket Booking App',
    category: 'Mobile App',
    badge: '12+ User Flows',
    metric: '3-Step Checkout • 12+ Flows',
    image: '/figma_Movie_Tickets.png',
    desc: 'Cinema booking mobile UX prototype streamlining seat selection, theater schedules, and payment completion.',
    tags: ['Mobile UX', 'Seat Map', 'Micro-interactions'],
    link: 'https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1'
  },
  {
    id: 'expensify',
    name: 'Expensify - Budget Tracker',
    category: 'Mobile App',
    badge: '17+ Screens',
    metric: 'Sub-5s Logging • 17+ Screens',
    image: '/figma_Expensify.png',
    desc: 'Personal finance analytics app bringing average "Add Expense" transaction logging time below 5 seconds.',
    tags: ['FinTech', 'Analytics', 'Dashboard', 'Figma'],
    link: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1'
  },
  {
    id: 'codesrijan',
    name: 'CodeSrijan Hackathon Portal',
    category: 'SaaS / Web',
    badge: '800+ Attendees',
    metric: '800+ Attendees • 50+ Teams',
    image: '/figma_CodeSrijan.png',
    desc: 'National hackathon portal facilitating registration, project submissions, live evaluation matrices, and announcements.',
    tags: ['React', 'Event Platform', 'Design System'],
    link: 'https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2&t=vfPIBYY278lzphVq-1'
  },
  {
    id: 'eventflow',
    name: 'EventFlow Experience Platform',
    category: 'SaaS / Web',
    badge: '30% Less Dropoff',
    metric: '4-Step Checkout • 30% Less Dropoff',
    image: '/figma_EventFlow.png',
    desc: 'Campus event ticketing & management platform streamlining booking workflows with 30% reduced drop-off.',
    tags: ['SaaS', 'Figma', 'Event Platform'],
    link: 'https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2&p=f&t=ucsh4jF84sBl50UA-0'
  },
  {
    id: 'landing-page',
    name: 'Conversion Landing Page',
    category: 'SaaS / Web',
    badge: 'High Conversion',
    metric: 'Responsive • Conversion Focused',
    image: '/figma_LandingPage.png',
    desc: 'Modern SaaS marketing landing page engineered for maximum conversion velocity and crisp brand typography.',
    tags: ['SaaS', 'Marketing', 'Figma'],
    link: 'https://www.figma.com/design/WfUzGPYsE7UFYS9YaQp5v6/home-page?node-id=0-1&p=f&t=cA3tERTu8AuInovg-0'
  },
  {
    id: 'saas-dashboard',
    name: 'Enterprise SaaS Dashboard',
    category: 'SaaS / Web',
    badge: 'Enterprise UI',
    metric: 'Multi-tenant • Telemetry',
    image: '/figma_SaasDashboard.png',
    desc: 'Complex data visualization telemetry suite with role-based access, dark mode analytics, and filtering.',
    tags: ['Dashboard', 'Analytics', 'Enterprise'],
    link: 'https://www.figma.com/design/PbO4QNnkgAyrPtkuyduZFE/sas?node-id=0-1&t=yHd7NxOZzn7AZUuw-0'
  }
];

const COMMUNITY_PLUGINS = [
  {
    id: 'autoflow',
    name: 'Autoflow',
    author: 'Yousef El-Dardiry',
    category: 'Diagramming',
    desc: 'Automate user flows and smart bezier connector lines between artboards with 1 click. Zero manual path drawing.',
    installs: '340k',
    rating: '4.9',
    icon: 'alt_route',
    link: 'https://www.figma.com/community/plugin/733902567457592893',
    tags: ['User Flows', 'Connectors', 'IA']
  },
  {
    id: 'magician',
    name: 'Figma Magician (AI)',
    author: 'Diagram / Figma',
    category: 'AI & Automation',
    desc: 'Harness the power of AI inside Figma. Generate copywriting, icons from text prompts, and imagery without leaving canvas.',
    installs: '480k',
    rating: '4.8',
    icon: 'auto_awesome',
    link: 'https://www.figma.com/community/plugin/1151890004522028995',
    tags: ['AI Copy', 'Vector Icons', 'Generative']
  },
  {
    id: 'stark',
    name: 'Stark Accessibility Suite',
    author: 'Stark Lab',
    category: 'Accessibility',
    desc: 'Contrast checker, color blind simulator, focus order audits, and WCAG 2.1 compliance tooling.',
    installs: '520k',
    rating: '4.9',
    icon: 'visibility',
    link: 'https://www.figma.com/community/plugin/732603254453395948',
    tags: ['Contrast', 'Color Blindness', 'WCAG']
  },
  {
    id: 'contentreel',
    name: 'Content Reel',
    author: 'Microsoft',
    category: 'Content & Data',
    desc: 'Pull realistic user names, avatars, address sets, and company titles into UI frames in one click.',
    installs: '610k',
    rating: '4.7',
    icon: 'dataset',
    link: 'https://www.figma.com/community/plugin/731627003475729986',
    tags: ['Personas', 'Text Data', 'Avatars']
  },
  {
    id: 'iconify',
    name: 'Iconify',
    author: 'Vjacheslav Trushkin',
    category: 'Assets & Icons',
    desc: 'Access 100,000+ vector icons (Lucide, Material, Phosphor, Carbon) directly inside the canvas.',
    installs: '890k',
    rating: '5.0',
    icon: 'interests',
    link: 'https://www.figma.com/community/plugin/735098326275342410',
    tags: ['Lucide', 'Material', 'SVG Icons']
  },
  {
    id: 'tokens-studio',
    name: 'Tokens Studio (Figma Tokens)',
    author: 'Tokens Studio',
    category: 'Design Systems',
    desc: 'Manage multi-brand design tokens (spacing, typography, color palettes) connected to GitHub, GitLab & JSON repositories.',
    installs: '430k',
    rating: '4.9',
    icon: 'token',
    link: 'https://www.figma.com/community/plugin/843461159747078978',
    tags: ['Tokens', 'Multi-Brand', 'Tailwind']
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    author: 'Unsplash',
    category: 'Assets',
    desc: 'Insert beautiful royalty-free editorial imagery directly into shapes, avatars, and hero cards.',
    installs: '950k',
    rating: '4.8',
    icon: 'image',
    link: 'https://www.figma.com/community/plugin/738454987945972471',
    tags: ['Photography', 'Placeholders', 'Avatars']
  },
  {
    id: 'similayer',
    name: 'Similayer',
    author: 'Dave Williames',
    category: 'Productivity',
    desc: 'Select multiple layers with identical properties (font, color, radius, stroke) across massive artboard canvases.',
    installs: '310k',
    rating: '4.9',
    icon: 'filter_none',
    link: 'https://www.figma.com/community/plugin/739483365733355835',
    tags: ['Selection', 'Batch Edit', 'Speed']
  }
];

const PAGES_LIST = [
  { id: 'home', title: '01. Home Canvas', icon: 'home', num: '01' },
  { id: 'projects', title: '02. Work & Case Studies', icon: 'dashboard', num: '02' },
  { id: 'experience', title: '03. Experience & Hackathons', icon: 'work', num: '03' },
  { id: 'about', title: '04. About & Mindset (Figma Web)', icon: 'person', num: '04' },
  { id: 'process', title: '05. Methodology (L-to-R Flow)', icon: 'account_tree', num: '05' },
  { id: 'resume', title: '06. Resume (ATS Artboard)', icon: 'description', num: '06' },
  { id: 'plugins', title: '07. Community Plugins', icon: 'extension', num: '07' }
];

// Initial Node Coordinate, Dimension & Style Registry
const DEFAULT_NODES_CONFIG = {
  // Home Artboard
  'home-artboard': { id: 'home-artboard', name: 'Varun_Sehgal_Portfolio.fig', x: 0, y: 0, width: 1140, height: 780, radius: 16, fill: '#14151b', strokeColor: '#ffffff', strokeWidth: 1, opacity: 100 },

  // Work Projects
  'project-ai-interview': { id: 'project-ai-interview', name: 'AI Interview Prep System', x: 40, y: 160, width: 400, height: 490, radius: 14, fill: '#14151b', strokeColor: '#ffffff', strokeWidth: 1, opacity: 100 },
  'project-movie-tickets': { id: 'project-movie-tickets', name: 'Movie Ticket Booking App', x: 470, y: 160, width: 400, height: 490, radius: 14, fill: '#14151b', strokeColor: '#ffffff', strokeWidth: 1, opacity: 100 },
  'project-expensify': { id: 'project-expensify', name: 'Expensify - Budget Tracker', x: 900, y: 160, width: 400, height: 490, radius: 14, fill: '#14151b', strokeColor: '#ffffff', strokeWidth: 1, opacity: 100 },
  'project-codesrijan': { id: 'project-codesrijan', name: 'CodeSrijan Hackathon Portal', x: 40, y: 680, width: 400, height: 490, radius: 14, fill: '#14151b', strokeColor: '#ffffff', strokeWidth: 1, opacity: 100 },
  'project-eventflow': { id: 'project-eventflow', name: 'EventFlow Experience Platform', x: 470, y: 680, width: 400, height: 490, radius: 14, fill: '#14151b', strokeColor: '#ffffff', strokeWidth: 1, opacity: 100 },
  'project-landing-page': { id: 'project-landing-page', name: 'Conversion Landing Page', x: 900, y: 680, width: 400, height: 490, radius: 14, fill: '#14151b', strokeColor: '#ffffff', strokeWidth: 1, opacity: 100 },
  'project-saas-dashboard': { id: 'project-saas-dashboard', name: 'Enterprise SaaS Dashboard', x: 470, y: 1200, width: 400, height: 490, radius: 14, fill: '#14151b', strokeColor: '#ffffff', strokeWidth: 1, opacity: 100 },

  // Experience Nodes
  'exp-unievent': { id: 'exp-unievent', name: 'Milestone: UniEvent (Jun-Nov 2024)', x: 60, y: 180, width: 440, height: 200, radius: 14, fill: '#14151b', strokeColor: '#ffffff', strokeWidth: 1, opacity: 100 },
  'exp-hackethor': { id: 'exp-hackethor', name: 'Milestone: HAckeThor (🏆 1st Winner)', x: 620, y: 260, width: 440, height: 180, radius: 14, fill: '#14151b', strokeColor: '#f59e0b', strokeWidth: 1, opacity: 100 },
  'exp-assemble': { id: 'exp-assemble', name: 'Milestone: Assemble (Aug 2024-Jan 2025)', x: 60, y: 460, width: 440, height: 180, radius: 14, fill: '#14151b', strokeColor: '#ffffff', strokeWidth: 1, opacity: 100 },
  'exp-imagine': { id: 'exp-imagine', name: 'Milestone: Imagine Hackathon (Finalist)', x: 620, y: 520, width: 440, height: 180, radius: 14, fill: '#14151b', strokeColor: '#ec4899', strokeWidth: 1, opacity: 100 },
  'exp-codesrijan': { id: 'exp-codesrijan', name: 'Milestone: CodeSrijan (Organizing Lead)', x: 60, y: 720, width: 440, height: 180, radius: 14, fill: '#14151b', strokeColor: '#38bdf8', strokeWidth: 1, opacity: 100 },
  'exp-conquerors': { id: 'exp-conquerors', name: 'Milestone: Code Conquerors (🥈 2nd)', x: 620, y: 780, width: 440, height: 180, radius: 14, fill: '#14151b', strokeColor: '#a855f7', strokeWidth: 1, opacity: 100 },
  'exp-knaptix': { id: 'exp-knaptix', name: 'Milestone: Knaptix Ventures (Jun-Aug 2024)', x: 60, y: 980, width: 440, height: 180, radius: 14, fill: '#14151b', strokeColor: '#ffffff', strokeWidth: 1, opacity: 100 },

  // About Nodes (Radiating outward from Center)
  'about-avatar-core': { id: 'about-avatar-core', name: 'Varun_Avatar_Core', x: 500, y: 320, width: 340, height: 260, radius: 16, fill: '#181920', strokeColor: '#38bdf8', strokeWidth: 2, opacity: 100 },
  'about-strengths': { id: 'about-strengths', name: 'Core_Strengths & Superpowers', x: 40, y: 40, width: 380, height: 250, radius: 14, fill: '#14151b', strokeColor: '#10b981', strokeWidth: 1.5, opacity: 100 },
  'about-weaknesses': { id: 'about-weaknesses', name: 'Weaknesses & Growth Vectors', x: 920, y: 40, width: 380, height: 250, radius: 14, fill: '#14151b', strokeColor: '#f59e0b', strokeWidth: 1.5, opacity: 100 },
  'about-philosophy': { id: 'about-philosophy', name: 'Design_Philosophy & Principles', x: 40, y: 480, width: 380, height: 250, radius: 14, fill: '#14151b', strokeColor: '#8b5cf6', strokeWidth: 1.5, opacity: 100 },
  'about-toolkit': { id: 'about-toolkit', name: 'Technical & Creative Toolkit', x: 920, y: 480, width: 380, height: 250, radius: 14, fill: '#14151b', strokeColor: '#06b6d4', strokeWidth: 1.5, opacity: 100 },
  'about-education': { id: 'about-education', name: 'Education & Hackathons', x: 480, y: 740, width: 380, height: 240, radius: 14, fill: '#14151b', strokeColor: '#ec4899', strokeWidth: 1.5, opacity: 100 },

  // Process Steps (Strictly Left to Right)
  'process-step-1': { id: 'process-step-1', name: 'Step 01: Discover & Research', x: 40, y: 160, width: 310, height: 430, radius: 14, fill: '#14151b', strokeColor: '#38bdf8', strokeWidth: 1, opacity: 100 },
  'process-step-2': { id: 'process-step-2', name: 'Step 02: IA & User Flows', x: 410, y: 160, width: 310, height: 430, radius: 14, fill: '#14151b', strokeColor: '#38bdf8', strokeWidth: 1, opacity: 100 },
  'process-step-3': { id: 'process-step-3', name: 'Step 03: Wireframing & Rapid Lo-Fi', x: 780, y: 160, width: 310, height: 430, radius: 14, fill: '#14151b', strokeColor: '#38bdf8', strokeWidth: 1, opacity: 100 },
  'process-step-4': { id: 'process-step-4', name: 'Step 04: Design System & Tokens', x: 1150, y: 160, width: 310, height: 430, radius: 14, fill: '#14151b', strokeColor: '#38bdf8', strokeWidth: 1, opacity: 100 },
  'process-step-5': { id: 'process-step-5', name: 'Step 05: Hi-Fi UI & Micro-Interactions', x: 1520, y: 160, width: 310, height: 430, radius: 14, fill: '#14151b', strokeColor: '#38bdf8', strokeWidth: 1, opacity: 100 },
  'process-step-6': { id: 'process-step-6', name: 'Step 06: Usability Testing & Handoff', x: 1890, y: 160, width: 310, height: 430, radius: 14, fill: '#14151b', strokeColor: '#38bdf8', strokeWidth: 1, opacity: 100 },

  // Resume Artboard
  'resume-artboard': { id: 'resume-artboard', name: 'Varun_Sehgal_Resume_v2', x: 60, y: 40, width: 1160, height: 1640, radius: 16, fill: '#14151b', strokeColor: '#ffffff', strokeWidth: 1, opacity: 100 }
};

const FigmaApp = ({ isInteracting, userName = 'Varun Sehgal', onOpenApp }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const startPanRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Selection & Node Config State
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodesConfig, setNodesConfig] = useState(DEFAULT_NODES_CONFIG);
  const [isWireframeMode, setIsWireframeMode] = useState(false);

  // Sticky notes on canvas
  const [floatingShapes, setFloatingShapes] = useState(INITIAL_SHAPES);

  // Left & Right Sidebars
  const [sidebarTab, setSidebarTab] = useState('layers'); // 'layers' | 'pages' | 'assets'
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [propertiesTab, setPropertiesTab] = useState('design');
  const [layerVisibilityMap, setLayerVisibilityMap] = useState({});
  const [layerLockMap, setLayerLockMap] = useState({});

  // Filter & Search
  const [projectFilter, setProjectFilter] = useState('All');
  const [projectSearch, setProjectSearch] = useState('');
  const [pluginSearch, setPluginSearch] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Link copied to clipboard!');

  // Color Menu
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');

  const showToast = (msg) => {
    setToastMessage(msg);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2400);
  };

  const handleCopyLink = (url, label = 'Link') => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url);
    }
    showToast(`${label} copied to clipboard!`);
  };

  // Keyboard shortcut Shift+O for Wireframe Mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && (e.key === 'O' || e.key === 'o')) {
        setIsWireframeMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update a node's properties live in nodesConfig
  const updateNode = (id, field, value) => {
    setNodesConfig(prev => {
      const curr = prev[id] || {};
      return {
        ...prev,
        [id]: {
          ...curr,
          [field]: value
        }
      };
    });
  };

  // Select node and smoothly pan to center it
  const selectNode = (id) => {
    setSelectedNodeId(id);
    const node = nodesConfig[id];
    if (node) {
      setPan({
        x: -node.x + 180,
        y: -node.y + 120
      });
      showToast(`Selected: ${node.name || id}`);
    }
  };

  // Canvas Mouse Down: Detect node click vs. empty space pan
  const handleCanvasMouseDown = (e) => {
    // If clicking an interactive button/link/input, let it handle naturally
    if (
      e.target.closest('button') || 
      e.target.closest('a') || 
      e.target.closest('input') || 
      e.target.closest('select') || 
      e.target.closest('textarea') ||
      e.target.closest('.lovable-workspace-bottom-nav') ||
      e.target.closest('.lovable-sidebar') ||
      e.target.closest('.lovable-properties-sidebar')
    ) {
      return;
    }

    const nodeEl = e.target.closest('[data-node-id]');
    if (nodeEl) {
      const id = nodeEl.getAttribute('data-node-id');
      if (layerLockMap[id]) {
        showToast('Node is locked');
        return;
      }
      setSelectedNodeId(id);
      return;
    }

    // Deselect and initiate canvas pan
    setSelectedNodeId(null);
    setIsPanning(true);
    startPanRef.current = {
      x: e.pageX - pan.x,
      y: e.pageY - pan.y
    };
  };

  const handleCanvasMouseMove = (e) => {
    if (!isPanning) return;
    setPan({
      x: e.pageX - startPanRef.current.x,
      y: e.pageY - startPanRef.current.y
    });
  };

  const handleCanvasMouseUp = () => {
    setIsPanning(false);
  };

  // Sticky notes helpers
  const addStickyNote = () => {
    if (floatingShapes.length >= 8) return;
    const colors = ['bg-yellow-200', 'bg-blue-200', 'bg-pink-200', 'bg-green-200'];
    const randomText = CREATIVE_NOTES[Math.floor(Math.random() * CREATIVE_NOTES.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newNote = {
      id: `note-${Date.now()}`,
      text: randomText,
      color: randomColor,
      x: -pan.x + 100 + (floatingShapes.length * 50) % 300,
      y: -pan.y + 80 + (floatingShapes.length * 40) % 200,
      isPinned: false
    };
    setFloatingShapes(prev => [...prev, newNote]);
    showToast('Added Sticky Note to Canvas');
  };

  const removeStickyNote = (id) => {
    setFloatingShapes(prev => prev.filter(s => s.id !== id));
  };

  const updateStickyNote = (id, text) => {
    setFloatingShapes(prev => prev.map(s => s.id === id ? { ...s, text } : s));
  };

  const toggleLayerVisibility = (id, e) => {
    e.stopPropagation();
    setLayerVisibilityMap(prev => ({
      ...prev,
      [id]: prev[id] === false ? true : false
    }));
  };

  const toggleLayerLock = (id, e) => {
    e.stopPropagation();
    setLayerLockMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Active selected node object for right sidebar
  const activeNode = selectedNodeId ? nodesConfig[selectedNodeId] : null;

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter(p => {
      const matchesCat = projectFilter === 'All' || p.category === projectFilter;
      const matchesSearch = projectSearch.trim() === '' ||
        p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.desc.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(projectSearch.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [projectFilter, projectSearch]);

  // Layers list for left sidebar corresponding to active page
  const currentLayers = useMemo(() => {
    switch (activeTab) {
      case 'projects':
        return [
          { id: 'project-ai-interview', title: 'AI Interview Prep System', type: 'frame' },
          { id: 'project-movie-tickets', title: 'Movie Ticket Booking App', type: 'frame' },
          { id: 'project-expensify', title: 'Expensify - Budget Tracker', type: 'frame' },
          { id: 'project-codesrijan', title: 'CodeSrijan Hackathon Portal', type: 'frame' },
          { id: 'project-eventflow', title: 'EventFlow Experience Platform', type: 'frame' },
          { id: 'project-landing-page', title: 'Conversion Landing Page', type: 'frame' },
          { id: 'project-saas-dashboard', title: 'Enterprise SaaS Dashboard', type: 'frame' }
        ];
      case 'experience':
        return [
          { id: 'exp-unievent', title: 'UniEvent (UI/UX Intern - Nov 2024)', type: 'component' },
          { id: 'exp-hackethor', title: 'HAckeThor Winner (🏆 1st Place)', type: 'component' },
          { id: 'exp-assemble', title: 'Assemble (Operations & UX)', type: 'component' },
          { id: 'exp-imagine', title: 'Imagine Hackathon Finalist', type: 'component' },
          { id: 'exp-codesrijan', title: 'CodeSrijan Hackathon Organizing Lead', type: 'component' },
          { id: 'exp-conquerors', title: 'Code Conquerors (🥈 2nd Runner-up)', type: 'component' },
          { id: 'exp-knaptix', title: 'Knaptix Ventures (Intern)', type: 'component' }
        ];
      case 'about':
        return [
          { id: 'about-avatar-core', title: 'Varun_Avatar_Core (Identity Frame)', type: 'frame' },
          { id: 'about-strengths', title: 'Core_Strengths & Superpowers', type: 'component' },
          { id: 'about-weaknesses', title: 'Weaknesses & Growth Vectors', type: 'component' },
          { id: 'about-philosophy', title: 'Design_Philosophy & Principles', type: 'component' },
          { id: 'about-toolkit', title: 'Technical & Creative Toolkit', type: 'component' },
          { id: 'about-education', title: 'Education & Hackathon Wins', type: 'component' }
        ];
      case 'process':
        return [
          { id: 'process-step-1', title: 'Step 01: Discover & Research', type: 'frame' },
          { id: 'process-step-2', title: 'Step 02: IA & User Flows', type: 'frame' },
          { id: 'process-step-3', title: 'Step 03: Wireframing & Rapid Lo-Fi', type: 'frame' },
          { id: 'process-step-4', title: 'Step 04: Design System & Tokens', type: 'frame' },
          { id: 'process-step-5', title: 'Step 05: Hi-Fi UI & Micro-Interactions', type: 'frame' },
          { id: 'process-step-6', title: 'Step 06: Usability Testing & Handoff', type: 'frame' }
        ];
      case 'resume':
        return [
          { id: 'resume-artboard', title: 'Varun_Sehgal_Resume_v2 (ATS Document)', type: 'frame' }
        ];
      case 'plugins':
        return COMMUNITY_PLUGINS.map(p => ({
          id: p.id,
          title: `${p.name} (${p.category})`,
          type: 'component'
        }));
      default:
        return [
          { id: 'home-artboard', title: 'Varun_Sehgal_Portfolio.fig', type: 'frame' },
          { id: 'note-1', title: 'Sticky: Ideation', type: 'component' },
          { id: 'note-2', title: 'Sticky: Tokens', type: 'component' },
          { id: 'note-3', title: 'Sticky: Micro-interactions', type: 'component' }
        ];
    }
  }, [activeTab]);

  return (
    <div className={`figma-app ${isWireframeMode ? 'wireframe-mode-active' : ''}`}>
      {/* =========================================================================
          1. Top Header Bar (Figma Toolbar with Wireframe & Zoom Controls)
          ========================================================================= */}
      <nav className="lovable-header">
        <div className="nav-left-group">
          <div className="nav-logo-mark">
            <span className="material-symbols-outlined text-[18px] text-[#ffb5a1]">token</span>
          </div>
          <span className="nav-brand-title">Varun Sehgal Portfolio</span>
          <span className="nav-view-pill">{activeTab.toUpperCase()}</span>

          {/* Theme Dropdown */}
          <div className="nav-theme-dropdown-container">
            <button
              className="nav-theme-btn"
              onClick={() => setColorMenuOpen(!colorMenuOpen)}
              title="Change Canvas Theme Accent"
            >
              <span>Theme</span>
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
            {colorMenuOpen && (
              <div className="nav-theme-menu">
                <button className="theme-opt" onClick={() => { setCurrentTheme('default'); setColorMenuOpen(false); }}>Coral Accent (Default)</button>
                <button className="theme-opt" onClick={() => { setCurrentTheme('blue'); setColorMenuOpen(false); }}>Cyan Blue</button>
                <button className="theme-opt" onClick={() => { setCurrentTheme('purple'); setColorMenuOpen(false); }}>Electric Violet</button>
                <button className="theme-opt" onClick={() => { setCurrentTheme('green'); setColorMenuOpen(false); }}>Emerald Green</button>
              </div>
            )}
          </div>
        </div>

        {/* Center Canvas Tools */}
        <div className="nav-center-group">
          <button
            type="button" 
            className="nav-tool-btn" 
            onClick={addStickyNote}
            title="Add Sticky Note to Canvas"
          >
            <span className="material-symbols-outlined text-[16px]">sticky_note_2</span>
            <span>+ Sticky</span>
          </button>

          {/* Wireframe View Toggle (Shift+O) */}
          <button
            type="button"
            className={`nav-wireframe-btn ${isWireframeMode ? 'active' : ''}`}
            onClick={() => {
              setIsWireframeMode(!isWireframeMode);
              showToast(isWireframeMode ? 'Wireframe Mode: OFF' : 'Wireframe Blueprint: ON (Shift+O)');
            }}
            title="Toggle Architectural Wireframe Blueprint View (Shift+O)"
          >
            <span className="material-symbols-outlined text-[16px]">grid_4x4</span>
            <span>Wireframe {isWireframeMode ? 'ON' : 'View'}</span>
          </button>

          {/* Zoom Controls */}
          <div className="nav-zoom-group">
            <button 
              type="button" 
              className="nav-zoom-btn" 
              onClick={() => setZoom(prev => Math.max(0.4, Number((prev - 0.1).toFixed(1))))}
              title="Zoom Out (-)"
            >
              <span className="material-symbols-outlined text-[15px]">remove</span>
            </button>
            <span 
              className="nav-zoom-val" 
              onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); showToast('Reset Canvas Pan & Zoom'); }}
              title="Click to reset Zoom (100%)"
            >
              {Math.round(zoom * 100)}%
            </span>
            <button 
              type="button" 
              className="nav-zoom-btn" 
              onClick={() => setZoom(prev => Math.min(2.2, Number((prev + 0.1).toFixed(1))))}
              title="Zoom In (+)"
            >
              <span className="material-symbols-outlined text-[15px]">add</span>
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="nav-right-group">
          <button
            type="button"
            className="nav-email-btn"
            onClick={() => {
              if (onOpenApp) {
                onOpenApp('contact');
              } else {
                window.location.href = 'mailto:varunsehgal2005@gmail.com';
              }
            }}
            title="Open Contact Form"
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            <span>Email Me</span>
          </button>

          <button
            className="nav-share-btn"
            onClick={() => handleCopyLink(window.location.origin, 'Portfolio link')}
            title="Share portfolio link"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>

          <button
            className={`nav-sidebar-toggle-btn ${rightSidebarOpen ? 'active' : ''}`}
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            title={rightSidebarOpen ? "Hide Properties Panel" : "Show Properties Panel"}
          >
            <span className="material-symbols-outlined text-[18px]">view_sidebar</span>
          </button>

          <a
            href="https://www.linkedin.com/in/varunsehgal02"
            target="_blank"
            rel="noreferrer"
            className="nav-linkedin-link"
            title="Varun Sehgal on LinkedIn"
          >
            <div className="nav-linkedin-avatar">
              <FirebaseImage
                storagePath="profile/varun.jpg"
                fallbackSrc="/varun.jpg"
                alt="VS"
                className="nav-avatar-img"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="nav-avatar-fallback">VS</span>
            </div>
          </a>
        </div>
      </nav>

      {/* Toast Notification */}
      {copiedToast && (
        <div className="lovable-toast-notification">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          {toastMessage}
        </div>
      )}

      {/* =========================================================================
          2. Main Workspace Layout: Left Sidebar + Infinite Canvas + Right Sidebar
          ========================================================================= */}
      <div className="lovable-workspace-layout">
        {/* Left Sidebar ("Layers", "Pages" & "Assets") */}
        <aside className="lovable-sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-heading">Varun_Sehgal_Portfolio</h2>
            <p className="sidebar-sub">PAGE: {activeTab.toUpperCase()}</p>
          </div>

          <div className="sidebar-tabs-row">
            <button
              type="button"
              className={`sidebar-tab-btn ${sidebarTab === 'layers' ? 'active' : ''}`}
              onClick={() => setSidebarTab('layers')}
              title="Page Layers Tree"
            >
              Layers
            </button>
            <button
              type="button"
              className={`sidebar-tab-btn ${sidebarTab === 'pages' ? 'active' : ''}`}
              onClick={() => setSidebarTab('pages')}
              title="All Pages in Portfolio"
            >
              Pages
            </button>
            <button
              type="button"
              className={`sidebar-tab-btn ${sidebarTab === 'assets' ? 'active' : ''}`}
              onClick={() => setSidebarTab('assets')}
              title="Design System Assets & Themes"
            >
              Assets
            </button>
          </div>

          <div className="sidebar-nav-list">
            {/* PAGES TAB */}
            {sidebarTab === 'pages' && (
              <div className="sidebar-pages-list">
                {PAGES_LIST.map(p => (
                  <div
                    key={p.id}
                    className={`sidebar-page-item ${activeTab === p.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(p.id);
                      setSelectedNodeId(null);
                      setPan({ x: 0, y: 0 });
                      showToast(`Navigated to ${p.title}`);
                    }}
                  >
                    <span className="sidebar-page-num">{p.num}</span>
                    <span className="material-symbols-outlined text-[15px]">{p.icon}</span>
                    <span>{p.title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* LAYERS TAB */}
            {sidebarTab === 'layers' && (
              <div className="sidebar-layers-tree">
                {currentLayers.map(layer => {
                  const isVisible = layerVisibilityMap[layer.id] !== false;
                  const isLocked = !!layerLockMap[layer.id];
                  const isSelected = selectedNodeId === layer.id;

                  return (
                    <div
                      key={layer.id}
                      className={`sidebar-layer-row ${isSelected ? 'selected' : ''}`}
                      onClick={() => selectNode(layer.id)}
                    >
                      <span className="material-symbols-outlined layer-icon">
                        {layer.type === 'frame' ? 'crop_free' : 'widgets'}
                      </span>
                      <span className="layer-title">{layer.title}</span>

                      <div className="layer-actions">
                        <button
                          type="button"
                          className="layer-mini-btn"
                          onClick={(e) => toggleLayerLock(layer.id, e)}
                          title={isLocked ? "Unlock Layer" : "Lock Layer"}
                        >
                          <span className="material-symbols-outlined text-[12px]">
                            {isLocked ? 'lock' : 'lock_open'}
                          </span>
                        </button>
                        <button
                          type="button"
                          className="layer-mini-btn"
                          onClick={(e) => toggleLayerVisibility(layer.id, e)}
                          title={isVisible ? "Hide Layer" : "Show Layer"}
                        >
                          <span className="material-symbols-outlined text-[12px]">
                            {isVisible ? 'visibility' : 'visibility_off'}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ASSETS TAB */}
            {sidebarTab === 'assets' && (
              <div className="sidebar-assets-panel">
                <div className="assets-section-title">Design Tokens</div>
                <div className="asset-token-pill">
                  <span className="color-swatch bg-[#f24e1e]" />
                  <span>Primary: #F24E1E</span>
                </div>
                <div className="asset-token-pill">
                  <span className="color-swatch bg-[#00aaff]" />
                  <span>Accent: #00AAFF</span>
                </div>
                <div className="asset-token-pill">
                  <span className="color-swatch bg-[#14151b]" />
                  <span>Surface: #14151B</span>
                </div>
                <div className="assets-section-title mt-3">Components</div>
                <div className="asset-component-item">❖ ProjectCard [Variant: 7]</div>
                <div className="asset-component-item">❖ TimelineSpine [Vertical]</div>
                <div className="asset-component-item">❖ TraitBox [5 Nodes]</div>
                <div className="asset-component-item">❖ DashedConnector [Image 3]</div>
              </div>
            )}
          </div>
        </aside>

        {/* Center Main Stage: 100% Infinite Pannable & Zoomable Canvas */}
        <main
          ref={containerRef}
          className={`lovable-canvas-stage ${isPanning ? 'panning' : ''}`}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
        >
          {/* Dot Matrix Background moving with Pan */}
          <div
            className="lovable-dot-matrix-bg"
            style={{
              backgroundPosition: `${pan.x}px ${pan.y}px`,
              transform: `scale(${zoom})`
            }}
          />

          {/* Unified Infinite Canvas World */}
          <div
            className="lovable-canvas-world"
            style={{
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
              transformOrigin: '0 0'
            }}
          >
            {/* VIEW 1: HOME */}
            {activeTab === 'home' && (
              <div className="canvas-view-home">
                {/* Floating Sticky Notes on Canvas */}
                <div className="sticky-notes-layer">
                  {floatingShapes.map(shape => (
                    <div
                      key={shape.id}
                      className={`lovable-sticky-note ${shape.color}`}
                      style={{ left: shape.x, top: shape.y }}
                      data-node-id={shape.id}
                    >
                      <div className="sticky-note-top">
                        <span className="note-label">NOTE</span>
                        <button
                          type="button"
                          className="sticky-note-close-btn"
                          onClick={() => removeStickyNote(shape.id)}
                          title="Remove note"
                        >
                          <span className="material-symbols-outlined text-[13px]">close</span>
                        </button>
                      </div>
                      <textarea
                        value={shape.text}
                        onChange={(e) => updateStickyNote(shape.id, e.target.value)}
                        className="sticky-note-textarea"
                        placeholder="Type here..."
                      />
                    </div>
                  ))}
                </div>

                {/* Central Glass Artboard */}
                {(() => {
                  const node = nodesConfig['home-artboard'];
                  const isVisible = layerVisibilityMap['home-artboard'] !== false;
                  if (!isVisible) return null;

                  return (
                    <div
                      data-node-id="home-artboard"
                      className="artboard-container figma-canvas-node"
                      style={{
                        position: 'absolute',
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: `${node.width}px`,
                        minHeight: `${node.height}px`,
                        borderRadius: `${node.radius}px`,
                        backgroundColor: node.fill || '#14151b',
                        border: selectedNodeId === 'home-artboard' ? '1.5px solid #00aaff' : `${node.strokeWidth}px solid ${node.strokeColor || 'rgba(255,255,255,0.1)'}`,
                        opacity: (node.opacity ?? 100) / 100
                      }}
                    >
                      {selectedNodeId === 'home-artboard' && <FigmaSelectionBox node={node} />}

                      {/* Artboard Frame Header */}
                      <div className="artboard-frame-header">
                        <div className="frame-header-left">
                          <span className="material-symbols-outlined text-[16px] text-[#ffb5a1]">layers</span>
                          <span className="frame-file-title">Varun_Sehgal_Portfolio.fig</span>
                        </div>
                        <div className="frame-view-badge">
                          Artboard View · 1140 × 780
                        </div>
                      </div>

                      {/* Hero Section */}
                      <section className="artboard-hero-grid">
                        <div className="hero-left-column">
                          <div className="hero-badge-row">
                            <div className="hero-author-pill">
                              <div className="author-thumb">
                                <FirebaseImage
                                  storagePath="profile/varun.jpg"
                                  fallbackSrc="/varun.jpg"
                                  alt="Varun"
                                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                                <span className="author-fallback">VS</span>
                              </div>
                              <span>Varun Sehgal</span>
                            </div>
                            <div className="hero-status-pill">
                              <span className="pulsing-green-dot"></span>
                              <span>Product Designer</span>
                            </div>
                          </div>

                          <h1 className="hero-main-title">
                            I design digital products<br />
                            that make complex things feel <span className="hero-italic-accent">simple.</span>
                          </h1>

                          <p className="hero-tagline">
                            UI/UX · SaaS · AI Products · Design Systems
                          </p>

                          <div className="hero-cta-group">
                            <button className="cta-btn primary" onClick={() => setActiveTab('projects')}>
                              See My Work <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                            <button className="cta-btn secondary" onClick={() => setActiveTab('about')}>
                              <span className="material-symbols-outlined text-[18px]">person</span> About Me
                            </button>
                          </div>
                        </div>

                        <div className="hero-right-column">
                          <div className="now-card-panel">
                            <div className="now-card-accent-line"></div>
                            <h3 className="now-card-header">
                              <span className="material-symbols-outlined text-[16px]">update</span> Now
                            </h3>
                            <ul className="now-card-list">
                              <li>
                                <span className="material-symbols-outlined icon">design_services</span>
                                <div><strong>Designing</strong> AI-powered SaaS interfaces</div>
                              </li>
                              <li>
                                <span className="material-symbols-outlined icon">token</span>
                                <div><strong>Building</strong> scalable design systems in Figma</div>
                              </li>
                              <li>
                                <span className="material-symbols-outlined icon">work</span>
                                <div><strong>Open</strong> for product design roles & freelance</div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </section>

                      {/* Featured Quick Preview */}
                      <section className="featured-projects-section mt-4">
                        <div className="section-title-header">
                          <h2>Featured Work</h2>
                          <p>Click any card to select & edit in Right Sidebar, or switch to Work Canvas.</p>
                        </div>
                        <div className="projects-grid">
                          {ALL_PROJECTS.slice(0, 3).map(proj => (
                            <div key={proj.id} className="project-card" onClick={() => setActiveTab('projects')}>
                              <div className="card-thumb-wrap">
                                <FirebaseImage storagePath={`projects/${proj.id}.png`} fallbackSrc={proj.image} alt={proj.name} className="card-thumb-img" />
                                <span className="thumb-badge">{proj.badge}</span>
                              </div>
                              <div className="card-body">
                                <span className="card-cat">{proj.category}</span>
                                <h3 className="card-title">{proj.name}</h3>
                                <p className="card-desc">{proj.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* VIEW 2: WORK / PROJECTS (Infinite Canvas Bento Grid with 4 Regenerated Images) */}
            {activeTab === 'projects' && (
              <div className="canvas-view-projects" style={{ width: '1440px', minHeight: '1800px', position: 'relative' }}>
                {/* Section Header Frame */}
                <div 
                  className="canvas-section-header"
                  style={{ position: 'absolute', left: '40px', top: '40px', width: '1300px' }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h1 className="text-[26px] font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#38bdf8]">dashboard</span>
                        Work & Case Studies
                      </h1>
                      <p className="text-[13px] text-zinc-400">
                        Production UX flows, design systems, and mobile applications on the infinite canvas.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {['All', 'Mobile App', 'SaaS / Web'].map(cat => (
                        <button
                          key={cat}
                          className={`cat-filter-btn ${projectFilter === cat ? 'active' : ''}`}
                          onClick={() => setProjectFilter(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grid of Project Frames */}
                {filteredProjects.map(proj => {
                  const nodeId = `project-${proj.id}`;
                  const node = nodesConfig[nodeId] || { x: 40, y: 160, width: 400, height: 490, radius: 14, fill: '#14151b' };
                  const isVisible = layerVisibilityMap[nodeId] !== false;
                  if (!isVisible) return null;

                  return (
                    <div
                      key={proj.id}
                      data-node-id={nodeId}
                      className="figma-canvas-node project-card"
                      style={{
                        position: 'absolute',
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: `${node.width}px`,
                        height: `${node.height}px`,
                        backgroundColor: node.fill || '#14151b',
                        borderRadius: `${node.radius}px`,
                        border: selectedNodeId === nodeId ? '1.5px solid #00aaff' : `${node.strokeWidth || 1}px solid ${node.strokeColor || 'rgba(255,255,255,0.1)'}`,
                        boxShadow: selectedNodeId === nodeId ? '0 0 0 1px #00aaff, 0 20px 40px rgba(0,0,0,0.7)' : '0 10px 30px rgba(0,0,0,0.5)',
                        opacity: (node.opacity ?? 100) / 100,
                        overflow: 'hidden'
                      }}
                    >
                      {selectedNodeId === nodeId && <FigmaSelectionBox node={node} />}

                      {isWireframeMode && (
                        <div className="wireframe-badge-indicator">
                          <span>📐 WIREFRAME FRAME · {node.width}×{node.height}</span>
                        </div>
                      )}

                      <div className="card-thumb-wrap" style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                        <FirebaseImage
                          storagePath={`projects/${proj.id}.png`}
                          fallbackSrc={proj.image}
                          alt={proj.name}
                          className="card-thumb-img"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <span className="thumb-badge">{proj.badge}</span>
                      </div>

                      <div className="card-body" style={{ padding: '16px 20px' }}>
                        <span className="card-cat">{proj.category}</span>
                        <h3 className="card-title text-[17px] font-bold text-white mb-1">{node.name || proj.name}</h3>
                        <p className="card-desc text-[12px] text-zinc-300 line-clamp-2 mb-3">{proj.desc}</p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {proj.tags.map(t => (
                            <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-400">
                              {t}
                            </span>
                          ))}
                        </div>

                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="open-figma-link inline-flex items-center gap-1.5 text-[#ffb5a1] hover:text-white font-semibold text-[12px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Open in Figma</span>
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* VIEW 3: EXPERIENCE (Zigzag Timeline on Infinite Canvas) */}
            {activeTab === 'experience' && (
              <div className="canvas-view-experience" style={{ width: '1200px', minHeight: '1300px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '60px', top: '40px', width: '1000px' }}>
                  <h1 className="text-[26px] font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#f59e0b]">history_edu</span>
                    Experience & Hackathon Finalist Timeline
                  </h1>
                  <p className="text-[13px] text-zinc-400">
                    Chronological career roadmap, internship contributions (UniEvent, Assemble, Knaptix), and competitive hackathon podiums.
                  </p>
                </div>

                {/* Center Timeline Spine */}
                <div 
                  className="timeline-center-spine" 
                  style={{
                    position: 'absolute',
                    left: '560px',
                    top: '160px',
                    bottom: '60px',
                    width: '2px',
                    background: 'linear-gradient(180deg, #38bdf8 0%, #8b5cf6 50%, #ec4899 100%)',
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)'
                  }}
                />

                {/* Milestone Cards */}
                {[
                  { id: 'exp-unievent', date: 'Jun 2024 — Nov 2024', role: 'UI/UX Design Intern', company: 'UniEvent (EventFlow)', badge: 'Completed Nov 2024', desc: 'Architected campus ticketing platform slashing booking drop-off by 30% with 50+ modular components and responsive checkout psychology.', link: 'https://www.linkedin.com/in/varunsehgal02' },
                  { id: 'exp-hackethor', date: 'Apr 2025', role: '🏆 1st Place Winner', company: 'HAckeThor National Hackathon (Unstop)', badge: 'Winner', desc: 'Awarded 1st place in national hackathon for rapid UX prototyping, interactive user testing, and AI tool integration.', link: 'https://unstop.com/competitions/hackethor' },
                  { id: 'exp-assemble', date: 'Aug 2024 — Jan 2025', role: 'Assistant Head of Operations / UI/UX', company: 'Assemble', badge: 'Leadership', desc: 'Streamlined design sprint operations and authored client-facing interactive design deliverables for 10+ technology initiatives.', link: 'https://www.linkedin.com/in/varunsehgal02' },
                  { id: 'exp-imagine', date: 'Dec 2024', role: '🎖️ National Finalist', company: 'Imagine Hackathon (Unstop)', badge: 'Finalist', desc: 'Selected among top national finalists for creative digital workflows, collaborative interface development, and user-centric problem solving.', link: 'https://unstop.com/competitions/imagine-hackathon' },
                  { id: 'exp-codesrijan', date: 'Apr 2024', role: 'Lead Designer & Co-Organizer', company: 'CodeSrijan Hackathon (JUET)', badge: 'Lead Organizer', desc: 'Directed complete event branding, participant portals, and 72-hour evaluation platform for 800+ attendees and 50+ teams.', link: 'https://lnkd.in/p/dUXQYx92' },
                  { id: 'exp-conquerors', date: 'Apr 2024', role: '🥈 2nd Runner-up', company: 'Code Conquerors Hackathon (JUET ACM)', badge: '2nd Place', desc: 'Led design and frontend for AI quiz platform using Next.js and Ollama local LLMs during 12-hour offline hackathon.', link: 'https://www.linkedin.com/posts/pushkar-chaturvedi-a83778284_hackathon2025-codeconquerors-aiineducation-activity-7335535096017375236-DBk_' },
                  { id: 'exp-knaptix', date: 'Jun 2024 — Aug 2024', role: 'UI/UX Designer Intern', company: 'Knaptix Ventures', badge: 'Internship', desc: 'Engineered high-fidelity wireframes and design system components for 5+ B2B client applications and web dashboards.', link: 'https://www.linkedin.com/in/varunsehgal02' }
                ].map(exp => {
                  const node = nodesConfig[exp.id] || { x: 60, y: 200, width: 440, height: 180, radius: 14, fill: '#14151b' };
                  const isVisible = layerVisibilityMap[exp.id] !== false;
                  if (!isVisible) return null;

                  return (
                    <div
                      key={exp.id}
                      data-node-id={exp.id}
                      className="figma-canvas-node p-5"
                      style={{
                        position: 'absolute',
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: `${node.width}px`,
                        minHeight: `${node.height}px`,
                        backgroundColor: node.fill || '#14151b',
                        borderRadius: `${node.radius}px`,
                        border: selectedNodeId === exp.id ? '1.5px solid #00aaff' : `${node.strokeWidth || 1}px solid ${node.strokeColor || 'rgba(255,255,255,0.1)'}`,
                        boxShadow: selectedNodeId === exp.id ? '0 0 0 1px #00aaff, 0 16px 36px rgba(0,0,0,0.6)' : '0 8px 24px rgba(0,0,0,0.4)',
                        opacity: (node.opacity ?? 100) / 100
                      }}
                    >
                      {selectedNodeId === exp.id && <FigmaSelectionBox node={node} />}

                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] font-mono text-[#ffb5a1]">{exp.date}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-300 font-semibold">{exp.badge}</span>
                      </div>
                      <h3 className="text-[16px] font-bold text-white mb-0.5">{node.name || exp.role}</h3>
                      <div className="text-[12px] text-sky-400 font-medium mb-2">{exp.company}</div>
                      <p className="text-[12px] text-zinc-300 leading-relaxed mb-3">{exp.desc}</p>
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#ffb5a1] hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Verify Credential / Post</span>
                        <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            )}

            {/* VIEW 4: ABOUT (Center Avatar with Radiating Trait Boxes connected by Image 3 Curved Arrows) */}
            {activeTab === 'about' && (
              <div className="canvas-view-about" style={{ width: '1360px', height: '1100px', position: 'relative' }}>
                {/* SVG Layer with Exact Image 3 Curved Dashed Connectors */}
                <svg
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                >
                  {/* From Center Avatar (cx: 670, cy: 450) to: */}
                  {/* 1. Strengths (Top-Left) */}
                  <FigmaDashedConnector x1={500} y1={400} x2={420} y2={180} color="#10b981" />
                  {/* 2. Weaknesses (Top-Right) */}
                  <FigmaDashedConnector x1={840} y1={400} x2={920} y2={180} color="#f59e0b" />
                  {/* 3. Philosophy (Bottom-Left) */}
                  <FigmaDashedConnector x1={500} y1={500} x2={420} y2={580} color="#8b5cf6" />
                  {/* 4. Toolkit (Bottom-Right) */}
                  <FigmaDashedConnector x1={840} y1={500} x2={920} y2={580} color="#06b6d4" />
                  {/* 5. Education (Bottom-Center) */}
                  <FigmaDashedConnector x1={670} y1={580} x2={670} y2={740} color="#ec4899" />
                </svg>

                {/* Center: Varun Avatar Core Node */}
                {(() => {
                  const node = nodesConfig['about-avatar-core'];
                  return (
                    <div
                      data-node-id="about-avatar-core"
                      className="figma-canvas-node text-center flex flex-col items-center justify-center p-6"
                      style={{
                        position: 'absolute',
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: `${node.width}px`,
                        height: `${node.height}px`,
                        backgroundColor: node.fill || '#181920',
                        borderRadius: `${node.radius}px`,
                        border: selectedNodeId === 'about-avatar-core' ? '2px solid #00aaff' : '2px solid #38bdf8',
                        boxShadow: '0 0 35px rgba(56, 189, 248, 0.25), 0 20px 40px rgba(0,0,0,0.8)',
                        zIndex: 10
                      }}
                    >
                      {selectedNodeId === 'about-avatar-core' && <FigmaSelectionBox node={node} />}

                      <div className="relative mb-3">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#38bdf8] p-0.5 shadow-lg shadow-sky-500/30">
                          <FirebaseImage
                            storagePath="profile/varun.jpg"
                            fallbackSrc="/varun.jpg"
                            alt="Varun Sehgal"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#181920]" />
                      </div>

                      <h2 className="text-[19px] font-bold text-white mb-0.5">{node.name || 'Varun Sehgal'}</h2>
                      <div className="text-[12px] font-semibold text-[#38bdf8] mb-1">Product Designer & UI/UX Specialist</div>
                      <p className="text-[11px] text-zinc-300 max-w-[280px] leading-relaxed">
                        Galgotias Univ (AIML '26) • National Hackathon Winner • Architect of systematic dark-mode design systems.
                      </p>
                    </div>
                  );
                })()}

                {/* Box 1: Core Strengths (Top-Left) */}
                {(() => {
                  const node = nodesConfig['about-strengths'];
                  return (
                    <div
                      data-node-id="about-strengths"
                      className="figma-canvas-node p-5"
                      style={{
                        position: 'absolute',
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: `${node.width}px`,
                        minHeight: `${node.height}px`,
                        backgroundColor: node.fill || '#14151b',
                        borderRadius: `${node.radius}px`,
                        border: selectedNodeId === 'about-strengths' ? '1.5px solid #00aaff' : '1.5px solid #10b981',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                        zIndex: 10
                      }}
                    >
                      {selectedNodeId === 'about-strengths' && <FigmaSelectionBox node={node} />}

                      <div className="flex items-center gap-2 mb-2 text-[#34d399] font-bold text-[14px]">
                        <span className="material-symbols-outlined text-[18px]">bolt</span>
                        <h3>{node.name || 'Core Strengths & Superpowers'}</h3>
                      </div>
                      <ul className="text-[11.5px] text-zinc-300 space-y-2 leading-relaxed">
                        <li><strong>⚡ Design Systems & Tokens:</strong> Architect of token studio pipelines with nested components and dark/light modes.</li>
                        <li><strong>🎯 Frictionless UX Flows:</strong> Slashed transaction drop-off by 30% via 4-step optimized booking psychology.</li>
                        <li><strong>🔮 Micro-Interactions:</strong> Authentic haptic springs, fluid physics, and interactive prototyping.</li>
                        <li><strong>💻 Frontend Empathy:</strong> Understands React, CSS flex/grid, and dev handoff realities.</li>
                      </ul>
                    </div>
                  );
                })()}

                {/* Box 2: Weaknesses & Growth Areas (Top-Right) */}
                {(() => {
                  const node = nodesConfig['about-weaknesses'];
                  return (
                    <div
                      data-node-id="about-weaknesses"
                      className="figma-canvas-node p-5"
                      style={{
                        position: 'absolute',
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: `${node.width}px`,
                        minHeight: `${node.height}px`,
                        backgroundColor: node.fill || '#14151b',
                        borderRadius: `${node.radius}px`,
                        border: selectedNodeId === 'about-weaknesses' ? '1.5px solid #00aaff' : '1.5px solid #f59e0b',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                        zIndex: 10
                      }}
                    >
                      {selectedNodeId === 'about-weaknesses' && <FigmaSelectionBox node={node} />}

                      <div className="flex items-center gap-2 mb-2 text-[#fbbf24] font-bold text-[14px]">
                        <span className="material-symbols-outlined text-[18px]">adjust</span>
                        <h3>{node.name || 'Weaknesses & Growth Vectors'}</h3>
                      </div>
                      <ul className="text-[11.5px] text-zinc-300 space-y-2 leading-relaxed">
                        <li><strong>🔍 Sub-Pixel Perfectionism:</strong> Spends extra hours aligning 1px sub-pixel grids before publishing drafts.</li>
                        <li><strong>🚀 Reluctance for Raw Roughs:</strong> Dislikes showing half-baked wireframes; prefers quick hi-fi polish before review.</li>
                        <li><strong>🧩 Edge-Case Maximalism:</strong> Tendency to design 15+ edge states for simple MVP prototypes.</li>
                        <li><strong>📈 Growth Action:</strong> Actively practicing timeboxed rapid paper sketch iterations and public builds.</li>
                      </ul>
                    </div>
                  );
                })()}

                {/* Box 3: Design Philosophy (Bottom-Left) */}
                {(() => {
                  const node = nodesConfig['about-philosophy'];
                  return (
                    <div
                      data-node-id="about-philosophy"
                      className="figma-canvas-node p-5"
                      style={{
                        position: 'absolute',
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: `${node.width}px`,
                        minHeight: `${node.height}px`,
                        backgroundColor: node.fill || '#14151b',
                        borderRadius: `${node.radius}px`,
                        border: selectedNodeId === 'about-philosophy' ? '1.5px solid #00aaff' : '1.5px solid #8b5cf6',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                        zIndex: 10
                      }}
                    >
                      {selectedNodeId === 'about-philosophy' && <FigmaSelectionBox node={node} />}

                      <div className="flex items-center gap-2 mb-2 text-[#c084fc] font-bold text-[14px]">
                        <span className="material-symbols-outlined text-[18px]">palette</span>
                        <h3>{node.name || 'Design Philosophy'}</h3>
                      </div>
                      <ul className="text-[11.5px] text-zinc-300 space-y-2 leading-relaxed">
                        <li><strong>📐 Form Follows Emotion & Utility:</strong> Aesthetics are meaningless without crystal-clear affordances.</li>
                        <li><strong>🌑 Dark Mode Native:</strong> Deep blacks, ergonomic luminance contrast, and spectral glow accents.</li>
                        <li><strong>⚡ Sub-100ms Perceived Speed:</strong> Eliminating visual lag through optimistic UI state rendering.</li>
                      </ul>
                    </div>
                  );
                })()}

                {/* Box 4: Toolkit & Stack (Bottom-Right) */}
                {(() => {
                  const node = nodesConfig['about-toolkit'];
                  return (
                    <div
                      data-node-id="about-toolkit"
                      className="figma-canvas-node p-5"
                      style={{
                        position: 'absolute',
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: `${node.width}px`,
                        minHeight: `${node.height}px`,
                        backgroundColor: node.fill || '#14151b',
                        borderRadius: `${node.radius}px`,
                        border: selectedNodeId === 'about-toolkit' ? '1.5px solid #00aaff' : '1.5px solid #06b6d4',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                        zIndex: 10
                      }}
                    >
                      {selectedNodeId === 'about-toolkit' && <FigmaSelectionBox node={node} />}

                      <div className="flex items-center gap-2 mb-2 text-[#22d3ee] font-bold text-[14px]">
                        <span className="material-symbols-outlined text-[18px]">terminal</span>
                        <h3>{node.name || 'Creative & Technical Toolkit'}</h3>
                      </div>
                      <ul className="text-[11.5px] text-zinc-300 space-y-2 leading-relaxed">
                        <li><strong>🎨 Design:</strong> Figma, FigJam, Token Studio, Framer, Adobe Creative Suite</li>
                        <li><strong>💻 Code:</strong> React.js, Tailwind CSS, TypeScript, Vite, KaTeX, HTML5/CSS3</li>
                        <li><strong>🤖 AI Acceleration:</strong> Cursor, Claude Code, Antigravity, LLM Prompts</li>
                        <li><strong>📊 Research:</strong> PostHog, Hotjar, UserTesting, Qualitative Interviews</li>
                      </ul>
                    </div>
                  );
                })()}

                {/* Box 5: Education & Hackathons (Bottom-Center) */}
                {(() => {
                  const node = nodesConfig['about-education'];
                  return (
                    <div
                      data-node-id="about-education"
                      className="figma-canvas-node p-5"
                      style={{
                        position: 'absolute',
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: `${node.width}px`,
                        minHeight: `${node.height}px`,
                        backgroundColor: node.fill || '#14151b',
                        borderRadius: `${node.radius}px`,
                        border: selectedNodeId === 'about-education' ? '1.5px solid #00aaff' : '1.5px solid #ec4899',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                        zIndex: 10
                      }}
                    >
                      {selectedNodeId === 'about-education' && <FigmaSelectionBox node={node} />}

                      <div className="flex items-center gap-2 mb-2 text-[#f472b6] font-bold text-[14px]">
                        <span className="material-symbols-outlined text-[18px]">military_tech</span>
                        <h3>{node.name || 'Education & Hackathons'}</h3>
                      </div>
                      <ul className="text-[11.5px] text-zinc-300 space-y-1.5 leading-relaxed">
                        <li>🎓 <strong>B.Tech CSE (AIML):</strong> Galgotias University, Greater Noida (2022–2026)</li>
                        <li>🏆 <strong>HAckeThor Winner (1st Place):</strong> National Hackathon by Unstop (Apr 2025)</li>
                        <li>🥈 <strong>Code Conquerors (2nd Place):</strong> Offline Hackathon by JUET ACM (Apr 2024)</li>
                        <li>🎖️ <strong>Imagine Hackathon Finalist:</strong> Top National Finalist (Dec 2024)</li>
                      </ul>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* VIEW 5: PROCESS (Left-to-Right Horizontal Workflow connected by Image 3 Curved Arrows) */}
            {activeTab === 'process' && (
              <div className="canvas-view-process" style={{ width: '2320px', height: '800px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '40px', top: '40px', width: '1200px' }}>
                  <h1 className="text-[26px] font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#38bdf8]">account_tree</span>
                    End-to-End Product Design Methodology
                  </h1>
                  <p className="text-[13px] text-zinc-400">
                    Horizontal workflow going strictly from <strong>Left to Right</strong>. Each box explains in detail what we do to design digital products.
                  </p>
                </div>

                {/* SVG Layer connecting Step 1 -> 2 -> 3 -> 4 -> 5 -> 6 with Image 3 Curved Dashed Arrows */}
                <svg
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                >
                  <FigmaDashedConnector x1={350} y1={370} x2={410} y2={370} color="#38bdf8" />
                  <FigmaDashedConnector x1={720} y1={370} x2={780} y2={370} color="#38bdf8" />
                  <FigmaDashedConnector x1={1090} y1={370} x2={1150} y2={370} color="#38bdf8" />
                  <FigmaDashedConnector x1={1460} y1={370} x2={1520} y2={370} color="#38bdf8" />
                  <FigmaDashedConnector x1={1830} y1={370} x2={1890} y2={370} color="#38bdf8" />
                </svg>

                {/* Step Boxes */}
                {[
                  {
                    id: 'process-step-1',
                    phase: 'PHASE 01',
                    title: 'Discover & Research',
                    icon: 'search',
                    color: '#38bdf8',
                    whatWeDo: [
                      'Conduct 1-on-1 stakeholder interviews and qualitative user discovery sessions.',
                      'Analyze competitor friction points to establish clear benchmark KPIs.',
                      'Synthesize user personas, jobs-to-be-done (JTBD), and problem statements.'
                    ],
                    deliverables: ['User Personas', 'Empathy Maps', 'Competitive Matrix']
                  },
                  {
                    id: 'process-step-2',
                    phase: 'PHASE 02',
                    title: 'IA & User Flows',
                    icon: 'schema',
                    color: '#818cf8',
                    whatWeDo: [
                      'Map out complete end-to-end user journeys and multi-step task flows.',
                      'Structure tree-based sitemaps and content hierarchy across screens.',
                      'Design edge-case error recovery states and fail-safes to prevent dead-ends.'
                    ],
                    deliverables: ['User Flowcharts', 'Tree Sitemaps', 'Task Schematics']
                  },
                  {
                    id: 'process-step-3',
                    phase: 'PHASE 03',
                    title: 'Wireframing & Lo-Fi',
                    icon: 'grid_4x4',
                    color: '#a78bfa',
                    whatWeDo: [
                      'Draft rapid low-fidelity wireframes exploring 3+ layout variations per screen.',
                      'Conduct quick clickable click-through sessions to validate navigational clarity.',
                      'Optimize thumb zones, typography scales, and content hierarchy.'
                    ],
                    deliverables: ['Lo-Fi Wireframe Decks', 'Clickable Prototypes', 'Redline Notes']
                  },
                  {
                    id: 'process-step-4',
                    phase: 'PHASE 04',
                    title: 'Design System & Tokens',
                    icon: 'token',
                    color: '#f472b6',
                    whatWeDo: [
                      'Define atomic design tokens for colors, typography scales, spacing, and radii.',
                      'Build resilient Figma component library with variants and auto-layout.',
                      'Audit WCAG 2.1 AA/AAA contrast ratios and keyboard focus rings.'
                    ],
                    deliverables: ['Figma Library', 'Token Studio JSON', 'WCAG AA Audit']
                  },
                  {
                    id: 'process-step-5',
                    phase: 'PHASE 05',
                    title: 'Hi-Fi UI & Prototype',
                    icon: 'palette',
                    color: '#fb923c',
                    whatWeDo: [
                      'Apply brand aesthetics, dark-mode glassmorphism, and atmospheric depth.',
                      'Prototype fluid micro-interactions with smart-animate spring curves.',
                      'Validate user task completion times under realistic interactive conditions.'
                    ],
                    deliverables: ['Production Frames', 'Interactive Prototypes', 'Motion Specs']
                  },
                  {
                    id: 'process-step-6',
                    phase: 'PHASE 06',
                    title: 'Testing & Handoff',
                    icon: 'code',
                    color: '#34d399',
                    whatWeDo: [
                      'Document redlines, responsive breakpoints (Desktop, Tablet, Mobile).',
                      'Inspect auto-layout and export production CSS / React token variables.',
                      'Collaborate with developers during staging implementation and QA audits.'
                    ],
                    deliverables: ['Handoff Specs', 'CSS Variables', 'Staging QA Sign-off']
                  }
                ].map(step => {
                  const node = nodesConfig[step.id] || { x: 40, y: 160, width: 310, height: 430, radius: 14, fill: '#14151b' };
                  const isVisible = layerVisibilityMap[step.id] !== false;
                  if (!isVisible) return null;

                  return (
                    <div
                      key={step.id}
                      data-node-id={step.id}
                      className="figma-canvas-node p-5 flex flex-col justify-between"
                      style={{
                        position: 'absolute',
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: `${node.width}px`,
                        height: `${node.height}px`,
                        backgroundColor: node.fill || '#14151b',
                        borderRadius: `${node.radius}px`,
                        border: selectedNodeId === step.id ? '1.5px solid #00aaff' : `${node.strokeWidth || 1}px solid ${step.color}`,
                        boxShadow: selectedNodeId === step.id ? '0 0 0 1px #00aaff, 0 16px 36px rgba(0,0,0,0.7)' : '0 10px 30px rgba(0,0,0,0.5)',
                        opacity: (node.opacity ?? 100) / 100,
                        zIndex: 10
                      }}
                    >
                      {selectedNodeId === step.id && <FigmaSelectionBox node={node} />}

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono tracking-wider font-bold" style={{ color: step.color }}>
                            {step.phase}
                          </span>
                          <span className="material-symbols-outlined text-[16px]" style={{ color: step.color }}>
                            {step.icon}
                          </span>
                        </div>
                        <h3 className="text-[16px] font-bold text-white mb-3">{node.name || step.title}</h3>

                        <div className="text-[11px] font-semibold text-zinc-400 mb-1">WHAT WE DO:</div>
                        <ul className="text-[11.5px] text-zinc-300 space-y-2 leading-relaxed mb-4">
                          {step.whatWeDo.map((w, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-[#38bdf8] font-bold">•</span>
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-white/10 pt-3">
                        <div className="text-[10px] font-semibold text-zinc-400 mb-1.5">DELIVERABLES:</div>
                        <div className="flex flex-wrap gap-1">
                          {step.deliverables.map(d => (
                            <span key={d} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9.5px] text-zinc-300 font-mono">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* VIEW 6: RESUME (Redesigned in Authentic Figma Style on Canvas) */}
            {activeTab === 'resume' && (
              <div className="canvas-view-resume" style={{ width: '1360px', height: '1800px', position: 'relative' }}>
                {/* Reviewer Sticky Notes pinned on Canvas */}
                <div 
                  className="lovable-sticky-note bg-yellow-200" 
                  style={{ position: 'absolute', left: '1240px', top: '80px', width: '200px', transform: 'rotate(2deg)', zIndex: 20 }}
                >
                  <div className="note-label">RECRUITER REVIEW</div>
                  <p className="text-[11px] text-zinc-900 mt-1 leading-snug">
                    "98% ATS compatibility score! Clear metrics (30% drop-off reduction, 800+ attendees) make this immediately stand out."
                  </p>
                </div>

                <div 
                  className="lovable-sticky-note bg-pink-200" 
                  style={{ position: 'absolute', left: '1240px', top: '380px', width: '200px', transform: 'rotate(-2deg)', zIndex: 20 }}
                >
                  <div className="note-label">DESIGN SYSTEM NOTE</div>
                  <p className="text-[11px] text-zinc-900 mt-1 leading-snug">
                    "Tokens properly mapped to Tailwind classes & KaTeX font metrics. Approved for senior UI/UX engineering."
                  </p>
                </div>

                {/* Master Resume Figma Artboard */}
                {(() => {
                  const node = nodesConfig['resume-artboard'];
                  return (
                    <div
                      data-node-id="resume-artboard"
                      className="figma-canvas-node p-8"
                      style={{
                        position: 'absolute',
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: `${node.width}px`,
                        minHeight: `${node.height}px`,
                        backgroundColor: node.fill || '#14151b',
                        borderRadius: `${node.radius}px`,
                        border: selectedNodeId === 'resume-artboard' ? '1.5px solid #00aaff' : `${node.strokeWidth || 1}px solid rgba(255,255,255,0.12)`,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                        zIndex: 10
                      }}
                    >
                      {selectedNodeId === 'resume-artboard' && <FigmaSelectionBox node={node} />}

                      {/* Figma Auto-Layout & Dimension Callouts */}
                      <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
                        <div className="flex items-center gap-3">
                          <span className="caliper-dimension-pill cyan">Auto Layout: Vertical (Gap: 24px, Pad: 32px)</span>
                          <span className="caliper-dimension-pill pink">Typography: Inter + SF Mono (ATS Validated)</span>
                        </div>
                        <button
                          type="button"
                          className="cta-btn primary"
                          onClick={() => window.open('/Varun_Sehgal_Resume_Updated.pdf', '_blank')}
                        >
                          <span className="material-symbols-outlined text-[16px]">download</span>
                          <span>Download Official PDF</span>
                        </button>
                      </div>

                      {/* Header Block */}
                      <div className="mb-6">
                        <h1 className="text-[28px] font-extrabold text-white">Varun Sehgal</h1>
                        <div className="text-[14px] text-sky-400 font-medium mb-2">
                          UI/UX Designer & Product Designer · Galgotias University (AIML '26)
                        </div>
                        <div className="flex flex-wrap gap-4 text-[12px] text-zinc-400 font-mono">
                          <span>📧 varunsehgal2005@gmail.com</span>
                          <span>📱 +91 9817349924</span>
                          <span>📍 Greater Noida / Remote</span>
                          <span>🔗 linkedin.com/in/varunsehgal02</span>
                        </div>
                      </div>

                      <div className="caliper-dimension-pill cyan my-2">↕ Gap 24px</div>

                      {/* Work Experience */}
                      <div className="mb-6">
                        <div className="text-[13px] font-mono font-bold text-[#ffb5a1] uppercase tracking-wider mb-3 pb-1 border-b border-white/10 flex items-center justify-between">
                          <span>❖ Work Experience</span>
                          <span className="text-[10px] text-zinc-500">MasterComponent / ExperienceBlock</span>
                        </div>

                        <div className="space-y-4">
                          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                            <div className="flex justify-between text-[13px] font-bold text-white mb-0.5">
                              <span>UI/UX Designer Intern — UniEvent (EventFlow)</span>
                              <span className="font-mono text-zinc-400 text-[12px]">Jun 2024 — Nov 2024 (Early Nov End)</span>
                            </div>
                            <p className="text-[12px] text-zinc-300 leading-relaxed">
                              Designed end-to-end digital experiences for campus event ticketing platform (EventFlow). Slashed booking drop-off by 30% through a 4-step optimized checkout flow across 50+ modular components and responsive seat map prototypes.
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                            <div className="flex justify-between text-[13px] font-bold text-white mb-0.5">
                              <span>Assistant Head of Operations / UI/UX Intern — Assemble</span>
                              <span className="font-mono text-zinc-400 text-[12px]">Aug 2024 — Jan 2025</span>
                            </div>
                            <p className="text-[12px] text-zinc-300 leading-relaxed">
                              Supervised sprint operations, user flow documentation, and client UX reviews for 10+ software projects, achieving 95% stakeholder satisfaction.
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                            <div className="flex justify-between text-[13px] font-bold text-white mb-0.5">
                              <span>UI/UX Designer Intern — Knaptix Ventures</span>
                              <span className="font-mono text-zinc-400 text-[12px]">Jun 2024 — Aug 2024</span>
                            </div>
                            <p className="text-[12px] text-zinc-300 leading-relaxed">
                              Engineered high-fidelity wireframes and design system components for 5+ B2B client applications and web dashboards, boosting customer satisfaction scores by 40%.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="caliper-dimension-pill pink my-2">↕ Gap 24px</div>

                      {/* Hackathons & Awards */}
                      <div className="mb-6">
                        <div className="text-[13px] font-mono font-bold text-[#ffb5a1] uppercase tracking-wider mb-3 pb-1 border-b border-white/10 flex items-center justify-between">
                          <span>❖ Hackathons & Leadership</span>
                          <span className="text-[10px] text-zinc-500">MasterComponent / AwardBlock</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                            <div className="text-[12.5px] font-bold text-amber-400">🏆 HAckeThor Winner (1st Place)</div>
                            <div className="text-[11px] text-zinc-400">National Hackathon on Unstop (Apr 2025)</div>
                          </div>
                          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                            <div className="text-[12.5px] font-bold text-sky-400">⚡ CodeSrijan Lead & Co-Organizer</div>
                            <div className="text-[11px] text-zinc-400">800+ Attendees, 50+ Teams (Apr 2024)</div>
                          </div>
                          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                            <div className="text-[12.5px] font-bold text-purple-400">🥈 Code Conquerors (2nd Runner-up)</div>
                            <div className="text-[11px] text-zinc-400">JUET ACM Offline Hackathon (Apr 2024)</div>
                          </div>
                          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                            <div className="text-[12.5px] font-bold text-pink-400">🎖️ Imagine Hackathon Finalist</div>
                            <div className="text-[11px] text-zinc-400">Top National Finalist on Unstop (Dec 2024)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* VIEW 7: PLUGINS (Community Gallery with Direct Chrome Links) */}
            {activeTab === 'plugins' && (
              <div className="canvas-view-plugins" style={{ width: '1360px', minHeight: '1200px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '40px', top: '40px', width: '1280px' }}>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h1 className="text-[26px] font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#ffb5a1]">extension</span>
                        Figma Community & Creative Extensions
                      </h1>
                      <p className="text-[13px] text-zinc-400">
                        Clicking any plugin opens its verified official page in Chrome / new browser tab.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="cta-btn primary"
                      onClick={() => window.open('https://www.figma.com/community', '_blank')}
                    >
                      <span className="material-symbols-outlined text-[16px]">open_in_browser</span>
                      <span>Browse Figma Community ↗</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {COMMUNITY_PLUGINS.map(pl => (
                      <div
                        key={pl.id}
                        data-node-id={pl.id}
                        className="figma-canvas-node p-5 flex flex-col justify-between"
                        style={{
                          backgroundColor: '#14151b',
                          borderRadius: '14px',
                          border: selectedNodeId === pl.id ? '1.5px solid #00aaff' : '1px solid rgba(255,255,255,0.1)',
                          minHeight: '230px',
                          boxShadow: selectedNodeId === pl.id ? '0 0 0 1px #00aaff, 0 16px 36px rgba(0,0,0,0.6)' : '0 8px 24px rgba(0,0,0,0.4)'
                        }}
                      >
                        {selectedNodeId === pl.id && <FigmaSelectionBox node={{ name: pl.name, width: 380, height: 230 }} />}

                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2.5">
                              <span className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between justify-center text-[#ffb5a1]">
                                <span className="material-symbols-outlined text-[20px]">{pl.icon}</span>
                              </span>
                              <div>
                                <h3 className="text-[15px] font-bold text-white">{pl.name}</h3>
                                <div className="text-[11px] text-zinc-400">by {pl.author}</div>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-300 font-mono">
                              ⭐ {pl.rating} · {pl.installs}
                            </span>
                          </div>
                          <p className="text-[12px] text-zinc-300 leading-relaxed mb-4">{pl.desc}</p>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-white/10">
                          <div className="flex gap-1">
                            {pl.tags.map(t => (
                              <span key={t} className="px-1.5 py-0.5 rounded bg-white/5 text-[9.5px] text-zinc-400">
                                {t}
                              </span>
                            ))}
                          </div>
                          <button
                            type="button"
                            className="cta-btn primary py-1.5 px-3 text-[11px]"
                            onClick={() => window.open(pl.link, '_blank')}
                          >
                            <span>Open in Figma ↗</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar: Live Editable Node & Canvas Properties Panel */}
        {rightSidebarOpen && (
          <aside className="lovable-properties-sidebar">
            <div className="properties-header">
              <div className="properties-tabs">
                <button
                  type="button"
                  className={`prop-tab ${propertiesTab === 'design' ? 'active' : ''}`}
                  onClick={() => setPropertiesTab('design')}
                >
                  Design
                </button>
                <button
                  type="button"
                  className={`prop-tab ${propertiesTab === 'prototype' ? 'active' : ''}`}
                  onClick={() => setPropertiesTab('prototype')}
                >
                  Prototype
                </button>
                <button
                  type="button"
                  className={`prop-tab ${propertiesTab === 'inspect' ? 'active' : ''}`}
                  onClick={() => setPropertiesTab('inspect')}
                >
                  Inspect
                </button>
              </div>
              <button
                className="prop-sidebar-close-btn"
                onClick={() => setRightSidebarOpen(false)}
                title="Collapse properties sidebar"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>

            <div className="properties-body-scroll p-3 space-y-4">
              {/* If an element on canvas is selected: show its live editable fields! */}
              {activeNode ? (
                <>
                  <div className="prop-section">
                    <div className="text-[10px] font-mono font-bold text-sky-400 mb-1">SELECTED LAYER (EDITABLE)</div>
                    <input
                      type="text"
                      value={activeNode.name || ''}
                      onChange={(e) => updateNode(activeNode.id, 'name', e.target.value)}
                      className="prop-name-input"
                    />
                    <div className="text-[10px] text-zinc-500 font-mono mt-1">
                      ID: {activeNode.id}
                    </div>
                  </div>

                  {/* Coordinates & Dimensions */}
                  <div className="prop-section">
                    <div className="prop-section-title">Dimensions & Position</div>
                    <div className="prop-grid-2x2">
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">X</span>
                        <input
                          type="number"
                          value={activeNode.x ?? 0}
                          onChange={(e) => updateNode(activeNode.id, 'x', Number(e.target.value) || 0)}
                          className="prop-num-input"
                        />
                      </div>
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">Y</span>
                        <input
                          type="number"
                          value={activeNode.y ?? 0}
                          onChange={(e) => updateNode(activeNode.id, 'y', Number(e.target.value) || 0)}
                          className="prop-num-input"
                        />
                      </div>
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">W</span>
                        <input
                          type="number"
                          value={activeNode.width ?? 400}
                          onChange={(e) => updateNode(activeNode.id, 'width', Number(e.target.value) || 0)}
                          className="prop-num-input"
                        />
                      </div>
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">H</span>
                        <input
                          type="number"
                          value={activeNode.height ?? 300}
                          onChange={(e) => updateNode(activeNode.id, 'height', Number(e.target.value) || 0)}
                          className="prop-num-input"
                        />
                      </div>
                    </div>

                    <div className="prop-grid-2x2 mt-2">
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">Radius</span>
                        <input
                          type="number"
                          value={activeNode.radius ?? 12}
                          onChange={(e) => updateNode(activeNode.id, 'radius', Number(e.target.value) || 0)}
                          className="prop-num-input"
                        />
                      </div>
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">Opacity</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={activeNode.opacity ?? 100}
                          onChange={(e) => updateNode(activeNode.id, 'opacity', Number(e.target.value) || 0)}
                          className="prop-num-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fill & Stroke */}
                  <div className="prop-section">
                    <div className="prop-section-title">Fill & Appearance</div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-5 rounded border border-white/20" style={{ backgroundColor: activeNode.fill || '#14151b' }} />
                      <input
                        type="text"
                        value={activeNode.fill || '#14151b'}
                        onChange={(e) => updateNode(activeNode.id, 'fill', e.target.value)}
                        className="prop-name-input flex-1 font-mono text-[11px]"
                      />
                    </div>

                    <div className="prop-section-title mt-3">Stroke (Border)</div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={activeNode.strokeWidth ?? 1}
                        onChange={(e) => updateNode(activeNode.id, 'strokeWidth', Number(e.target.value) || 0)}
                        className="prop-num-input w-16"
                      />
                      <input
                        type="text"
                        value={activeNode.strokeColor || '#ffffff'}
                        onChange={(e) => updateNode(activeNode.id, 'strokeColor', e.target.value)}
                        className="prop-name-input flex-1 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* No element selected: show Canvas Document settings! */
                <>
                  <div className="prop-section">
                    <div className="text-[10px] font-mono font-bold text-zinc-400 mb-1">CANVAS DOCUMENT</div>
                    <div className="text-[14px] font-bold text-white mb-0.5">
                      {activeTab.toUpperCase()} Canvas
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Click any element or card on the canvas to select it and edit its coordinates, dimensions, and fill live!
                    </p>
                  </div>

                  <div className="prop-section">
                    <div className="prop-section-title">Canvas Settings</div>
                    <div className="flex justify-between items-center text-[12px] text-zinc-300 py-1">
                      <span>Wireframe Blueprint</span>
                      <button
                        type="button"
                        className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${isWireframeMode ? 'bg-sky-500/20 text-sky-400 border border-sky-400' : 'bg-white/5 text-zinc-400 border border-white/10'}`}
                        onClick={() => setIsWireframeMode(!isWireframeMode)}
                      >
                        {isWireframeMode ? 'ENABLED' : 'OFF (Shift+O)'}
                      </button>
                    </div>
                    <div className="flex justify-between items-center text-[12px] text-zinc-300 py-1">
                      <span>Zoom Scale</span>
                      <span className="font-mono text-sky-400">{Math.round(zoom * 100)}%</span>
                    </div>
                    <div className="flex justify-between items-center text-[12px] text-zinc-300 py-1">
                      <span>Pan Offset</span>
                      <span className="font-mono text-zinc-400">X: {Math.round(pan.x)} · Y: {Math.round(pan.y)}</span>
                    </div>
                  </div>

                  <div className="prop-section">
                    <button
                      type="button"
                      className="cta-btn secondary w-full text-[11px] py-1.5"
                      onClick={() => { setPan({ x: 0, y: 0 }); setZoom(1); showToast('Canvas Pan & Zoom Reset'); }}
                    >
                      <span className="material-symbols-outlined text-[14px]">center_focus_strong</span>
                      <span>Center View (100%)</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* =========================================================================
          3. WorkspaceNav (Floating Bottom Nav Bar)
          ========================================================================= */}
      <nav className="lovable-workspace-bottom-nav">
        <div className="nav-primary-group">
          <button
            className={`bottom-nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => { setActiveTab('home'); setSelectedNodeId(null); setPan({ x: 0, y: 0 }); }}
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span>Home</span>
          </button>

          <button
            className={`bottom-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => { setActiveTab('projects'); setSelectedNodeId(null); setPan({ x: 0, y: 0 }); }}
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            <span>Work</span>
          </button>

          <button
            className={`bottom-nav-item ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => { setActiveTab('experience'); setSelectedNodeId(null); setPan({ x: 0, y: 0 }); }}
          >
            <span className="material-symbols-outlined text-[18px]">work</span>
            <span>Experience</span>
          </button>

          <button
            className={`bottom-nav-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => { setActiveTab('about'); setSelectedNodeId(null); setPan({ x: 0, y: 0 }); }}
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
            <span>About</span>
          </button>

          <button
            className={`bottom-nav-item ${activeTab === 'resume' ? 'active' : ''}`}
            onClick={() => { setActiveTab('resume'); setSelectedNodeId(null); setPan({ x: 0, y: 0 }); }}
          >
            <span className="material-symbols-outlined text-[18px]">description</span>
            <span>Resume</span>
          </button>
        </div>

        <div className="nav-divider-stem"></div>

        <div className="nav-secondary-group">
          <button
            className={`bottom-nav-item secondary ${activeTab === 'process' ? 'active' : ''}`}
            onClick={() => { setActiveTab('process'); setSelectedNodeId(null); setPan({ x: 0, y: 0 }); }}
          >
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            <span>Process</span>
          </button>

          <button
            className={`bottom-nav-item secondary ${activeTab === 'plugins' ? 'active' : ''}`}
            onClick={() => { setActiveTab('plugins'); setSelectedNodeId(null); setPan({ x: 0, y: 0 }); }}
          >
            <span className="material-symbols-outlined text-[16px]">extension</span>
            <span>Plugins</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default FigmaApp;
