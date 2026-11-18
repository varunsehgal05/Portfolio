import { useState, useRef, useEffect } from 'react';
import FirebaseImage from './FirebaseImage';
import './FigmaApp.css';

const CREATIVE_NOTES = [
  "Don't forget to redesign the logo!",
  "Meeting with the dev team at 4pm",
  "Buy more coffee ☕",
  "Fix that one CSS bug...",
  "Draft the new case study",
  "Update the typography scale",
  "Wireframe the new dashboard",
  "Send invoice to client"
];

const INITIAL_SHAPES = [];

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

const TIMELINE = [
  {
    role: 'Lead Product Designer',
    company: 'UniEvent',
    period: 'Oct 2024 — Present',
    location: 'Remote',
    link: 'https://www.linkedin.com/in/varunsehgal02',
    desc: 'Leading product design for campus event ticketing platform (EventFlow). Architected 4-step booking flow optimization, slashing transaction drop-off by 30% across 50+ modular components.'
  },
  {
    role: 'Assistant Head of Operations / UI/UX Intern',
    company: 'Assemble',
    period: 'Jul 2024 — Sep 2024',
    location: 'Remote',
    link: 'https://www.linkedin.com/in/varunsehgal02',
    desc: 'Designed collaborative creator workspace tools and interaction prototypes in Figma. Coordinated platform operations for multi-team esports competitions.'
  },
  {
    role: 'UI/UX Designer Intern',
    company: 'Knaptix Ventures',
    period: 'Jan 2024 — Jun 2024',
    location: 'Remote',
    link: 'https://www.linkedin.com/in/varunsehgal02',
    desc: 'Engineered high-fidelity wireframes and design system components for 5+ B2B client applications and web dashboards, boosting customer satisfaction scores by 40%.'
  },
  {
    role: 'Freelance UI/UX Designer',
    company: 'Self-Employed',
    period: 'Jan 2024 — Present',
    location: 'Remote',
    link: 'https://www.linkedin.com/in/varunsehgal02',
    desc: 'Delivered brand identities, mobile interfaces, and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.'
  }
];

const CERTIFICATIONS = [
  {
    id: 'hackethor',
    title: 'HAckeThor Winner',
    issuer: 'Unstop',
    date: 'Apr 2025',
    credentialId: 'd883bbf5-5d9f-43e9-a417-21a4f009f4ff',
    link: 'https://unstop.com/competitions/hackethor',
    desc: 'Awarded 1st place in national competitive hackathon for rapid UX prototyping, interactive user testing, and AI tool integration.'
  },
  {
    id: 'imagine',
    title: 'Imagine Hackathon Finalist',
    issuer: 'Unstop',
    date: 'Dec 2024',
    credentialId: 'imgn-finalist-2024',
    link: 'https://unstop.com/competitions/imagine-hackathon',
    desc: 'Selected among top national finalists for innovative collaborative workflow tools and human-centered design systems.'
  },
  {
    id: 'codeconquerors',
    title: 'Code Conquerors 2nd Runner-up',
    issuer: 'JUET ACM & CSI',
    date: 'Apr 2025',
    credentialId: 'team-pixel-codes-2025',
    link: 'https://github.com/varunsehgal05',
    desc: 'Led frontend engineering and design for Team Pixel_Codes in a 12-hour offline hackathon (150+ devs), delivering an AI quiz generator with Ollama local LLM APIs.'
  },
  {
    id: 'codesrijan',
    title: 'CodeSrijan Hackathon Lead Designer & Co-Organizer',
    issuer: 'JUET',
    date: 'Apr 2026',
    credentialId: 'codesrijan-lead-2026',
    link: 'https://github.com/varunsehgal05',
    desc: 'Directed visual identity, participant portals, and 72-hour live evaluation leaderboard system for 200+ hackathon participants.'
  },
  {
    id: 'udemyux',
    title: 'UX Design - Complete UI/UX Masterclass',
    issuer: 'Udemy',
    date: 'Jan 2025',
    credentialId: 'UC-uiux-varun-sehgal',
    link: 'https://www.udemy.com',
    desc: 'Comprehensive training in user research, mental models, WCAG AA accessibility, wireframing, and modern web application architecture.'
  },
  {
    id: 'udemyfigma',
    title: 'UI/UX Design with Figma',
    issuer: 'Udemy',
    date: 'Jan 2025',
    credentialId: 'UC-figma-varun-sehgal',
    link: 'https://www.udemy.com',
    desc: 'Mastery of advanced Figma design tokens, nested component variants, auto-layout algorithms, and interactive prototype pipelines.'
  },
  {
    id: 'python',
    title: 'Python (Basic) Certification',
    issuer: 'HackerRank',
    date: 'Jun 2024',
    credentialId: 'HR-PYTHON-VARUN',
    link: 'https://www.hackerrank.com/certificates',
    desc: 'Certified in core algorithmic problem solving, data structures, and automation scripting.'
  },
  {
    id: 'iosux',
    title: 'UI and UX for iOS',
    issuer: 'Infosys Springboard',
    date: 'Jun 2024',
    credentialId: 'INFY-IOS-UX-2024',
    link: 'https://infyspringboard.onwingspan.com',
    desc: 'Apple Human Interface Guidelines, fluid gestures, dynamic island layouts, and iOS mobile typography.'
  }
];

const HACKATHONS = [
  {
    id: 'hackethor-winner',
    title: 'HAckeThor Winner',
    issuer: 'Unstop',
    date: 'Apr 2025',
    award: '🏆 1st Place Winner',
    link: 'https://unstop.com/competitions/hackethor',
    desc: 'Awarded 1st place in national competitive hackathon for rapid UX prototyping, interactive user testing, and AI tool integration.'
  },
  {
    id: 'codesrijan-organizer',
    title: 'CodeSrijan Hackathon Lead Designer & Co-Organizer',
    issuer: 'Jaypee University of Engineering & Technology',
    date: 'Apr 2026',
    award: '⚡ Organizing Lead & Identity Designer',
    link: 'https://github.com/varunsehgal05',
    desc: 'Directed visual identity, participant portals, and 72-hour live evaluation leaderboard system for 200+ hackathon participants.'
  },
  {
    id: 'code-conquerors-runnerup',
    title: 'Code Conquerors Hackathon (2nd Runner-up)',
    issuer: 'JUET ACM & CSI',
    date: 'Apr 2025',
    award: '🥈 2nd Runner-up (Team Pixel_Codes)',
    link: 'https://github.com/varunsehgal05',
    desc: 'Led frontend engineering and design for a 12-hour offline hackathon (150+ devs), delivering an AI quiz generator with Next.js and Ollama local LLM APIs.'
  },
  {
    id: 'imagine-finalist',
    title: 'Imagine Hackathon Finalist',
    issuer: 'Unstop',
    date: 'Dec 2024',
    award: '🎖️ National Finalist',
    link: 'https://unstop.com/competitions/imagine-hackathon',
    desc: 'Selected among top national finalists for creative digital workflows, collaborative interface development, and user-centric problem solving.'
  }
];

const TIMELINE_ACTIVITY = [
  {
    id: 'act-unievent',
    type: 'experience',
    category: 'Product Design',
    date: 'Oct 2024 — Present',
    icon: 'edit',
    highlight: 'Varun S.',
    titleRest: 'led Product Design at UniEvent (EventFlow)',
    desc: 'Leading product design for campus event ticketing platform. Architected 4-step booking flow optimization, slashing transaction drop-off by 30% across 50+ modular components.',
    quote: 'Spearheaded end-to-end design system with 50+ tokens, responsive checkout patterns, and real-time seat reservation micro-interactions.',
    location: 'Remote',
    link: 'https://www.linkedin.com/in/varunsehgal02',
    actionLabel: 'View on LinkedIn'
  },
  {
    id: 'act-hackethor',
    type: 'hackathons',
    category: 'Hackathon Win',
    date: 'Apr 2025',
    icon: 'emoji_events',
    highlight: 'HAckeThor Winner',
    titleRest: 'awarded 1st Place by Unstop',
    desc: 'Awarded 1st place in national competitive hackathon demonstrating rapid UX prototyping, interactive user testing, and AI tool integration under high pressure.',
    award: '🏆 1st Place Winner',
    credentialId: 'd883bbf5-5d9f-43e9-a417-21a4f009f4ff',
    link: 'https://unstop.com/competitions/hackethor',
    actionLabel: 'Verify Credential'
  },
  {
    id: 'act-assemble',
    type: 'experience',
    category: 'Operations & UX',
    date: 'Jul 2024 — Sep 2024',
    icon: 'terminal',
    highlight: 'Assemble',
    titleRest: 'appointed Assistant Head of Operations / UI/UX Intern',
    desc: 'Designed collaborative creator workspace tools and interaction prototypes in Figma. Coordinated platform operations and stream workflows for multi-team esports competitions.',
    location: 'Remote',
    link: 'https://www.linkedin.com/in/varunsehgal02',
    actionLabel: 'View on LinkedIn'
  },
  {
    id: 'act-udemy-ux',
    type: 'certifications',
    category: 'Certification',
    date: 'Jan 2025',
    icon: 'workspace_premium',
    highlight: 'Udemy',
    titleRest: 'issued Complete UI/UX Masterclass Credential',
    desc: 'Comprehensive training covering user research, mental models, WCAG AA accessibility, wireframing, and modern web application architecture.',
    credentialId: 'UC-uiux-varun-sehgal',
    link: 'https://www.udemy.com',
    actionLabel: 'Verify Certificate'
  },
  {
    id: 'act-codesrijan',
    type: 'hackathons',
    category: 'Leadership',
    date: 'Apr 2026',
    icon: 'groups',
    highlight: 'CodeSrijan Hackathon',
    titleRest: 'directed by Varun as Lead Designer & Co-Organizer',
    desc: 'Directed visual identity, participant portals, and 72-hour live evaluation leaderboard system for 200+ hackathon participants.',
    award: '⚡ Organizing Lead & Identity Designer',
    credentialId: 'codesrijan-lead-2026',
    link: 'https://github.com/varunsehgal05',
    actionLabel: 'View Repository'
  },
  {
    id: 'act-code-conquerors',
    type: 'hackathons',
    category: 'Hackathon Award',
    date: 'Apr 2025',
    icon: 'military_tech',
    highlight: 'Code Conquerors',
    titleRest: 'awarded 2nd Runner-up (JUET ACM & CSI)',
    desc: 'Led frontend engineering and design for Team Pixel_Codes in a 12-hour offline hackathon (150+ devs), delivering an AI quiz generator with Next.js and Ollama local LLM APIs.',
    award: '🥈 2nd Runner-up (Team Pixel_Codes)',
    credentialId: 'team-pixel-codes-2025',
    link: 'https://github.com/varunsehgal05',
    actionLabel: 'View Project'
  },
  {
    id: 'act-knaptix',
    type: 'experience',
    category: 'Internship',
    date: 'Jan 2024 — Jun 2024',
    icon: 'layers',
    highlight: 'Knaptix Ventures',
    titleRest: 'engaged Varun as UI/UX Designer Intern',
    desc: 'Engineered high-fidelity wireframes and design system components for 5+ B2B client applications and web dashboards, boosting customer satisfaction scores by 40%.',
    location: 'Remote',
    link: 'https://www.linkedin.com/in/varunsehgal02',
    actionLabel: 'View on LinkedIn'
  },
  {
    id: 'act-imagine',
    type: 'hackathons',
    category: 'Hackathon Finalist',
    date: 'Dec 2024',
    icon: 'star',
    highlight: 'Imagine Hackathon',
    titleRest: 'selected as National Finalist on Unstop',
    desc: 'Selected among top national finalists for creative digital workflows, collaborative interface development, and user-centric problem solving.',
    award: '🎖️ National Finalist',
    credentialId: 'imgn-finalist-2024',
    link: 'https://unstop.com/competitions/imagine-hackathon',
    actionLabel: 'Verify Finalist'
  },
  {
    id: 'act-udemy-figma',
    type: 'certifications',
    category: 'Certification',
    date: 'Jan 2025',
    icon: 'palette',
    highlight: 'Udemy',
    titleRest: 'certified UI/UX Design with Figma',
    desc: 'Mastery of advanced Figma design tokens, nested component variants, auto-layout algorithms, and interactive prototype pipelines.',
    credentialId: 'UC-figma-varun-sehgal',
    link: 'https://www.udemy.com',
    actionLabel: 'Verify Certificate'
  },
  {
    id: 'act-ios-ux',
    type: 'certifications',
    category: 'Mobile UX',
    date: 'Jun 2024',
    icon: 'phone_iphone',
    highlight: 'Infosys Springboard',
    titleRest: 'awarded UI and UX for iOS Credential',
    desc: 'Apple Human Interface Guidelines, fluid gestures, dynamic island layouts, and iOS mobile typography standards.',
    credentialId: 'INFY-IOS-UX-2024',
    link: 'https://infyspringboard.onwingspan.com',
    actionLabel: 'Verify Credential'
  },
  {
    id: 'act-freelance',
    type: 'experience',
    category: 'Feedback',
    date: 'Jan 2024 — Present',
    icon: 'rate_review',
    highlight: 'Client Partners',
    titleRest: 'reviewed Freelance UI/UX Collaborations',
    quote: 'Delivered brand identities, mobile interfaces, and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.',
    desc: 'Executed end-to-end design sprint cycles, user research, wireframing, and design-to-code handoffs using React and Tailwind CSS.',
    location: 'Remote',
    link: 'https://www.linkedin.com/in/varunsehgal02',
    actionLabel: 'View Profile'
  },
  {
    id: 'act-python',
    type: 'certifications',
    category: 'Programming',
    date: 'Jun 2024',
    icon: 'code',
    highlight: 'HackerRank',
    titleRest: 'certified Python (Basic) Skills',
    desc: 'Certified in core algorithmic problem solving, data structures, and automation scripting logic.',
    credentialId: 'HR-PYTHON-VARUN',
    link: 'https://www.hackerrank.com/certificates',
    actionLabel: 'Verify Skill'
  }
];

const PLUGINS = [
  { name: 'Autoflow', category: 'Diagramming', desc: 'Automate user flows and connector lines between artboards with 1 click.', link: 'https://www.figma.com/community/plugin/733902567457592893', icon: 'alt_route' },
  { name: 'Stark', category: 'Accessibility', desc: 'Contrast checker, color blindness simulator, and WCAG AA audit suite.', link: 'https://www.figma.com/community/plugin/732603254453395948', icon: 'visibility' },
  { name: 'Content Reel', category: 'Content', desc: 'Pull real names, text avatars, and dummy data into components instantly.', link: 'https://www.figma.com/community/plugin/731627003475729986', icon: 'dataset' },
  { name: 'Unsplash', category: 'Media', desc: 'Insert royalty-free high-res photography directly into shapes and layers.', link: 'https://www.figma.com/community/plugin/738454987945972471', icon: 'image' },
  { name: 'Iconify', category: 'Icons', desc: 'Access 100,000+ vector icons directly inside the canvas.', link: 'https://www.figma.com/community/plugin/735098326275342410', icon: 'interests' },
  { name: 'Similayer', category: 'Productivity', desc: 'Select layers with similar fill, stroke, text style, or auto-layout settings.', link: 'https://www.figma.com/community/plugin/736952773253018895', icon: 'filter_none' }
];

const FigmaApp = ({ isInteracting, userName, onOpenApp }) => {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'projects' | 'experience' | 'about' | 'resume' | 'process' | 'plugins'
  const [showAssets, setShowAssets] = useState(false);
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [copiedToast, setCopiedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Link copied to clipboard!');

  // Canvas pan & zoom state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const startPanRef = useRef({ x: 0, y: 0 });

  // Floating sticky notes
  const [floatingShapes, setFloatingShapes] = useState(INITIAL_SHAPES);
  const [draggingNoteId, setDraggingNoteId] = useState(null);

  // Projects filter state
  const [projectFilter, setProjectFilter] = useState('All');
  const [projectSearch, setProjectSearch] = useState('');

  // About variant state
  const [aboutVariant, setAboutVariant] = useState('Product Designer');

  // Experience Activity timeline state
  const [activityFilter, setActiveFilter] = useState('All');
  const [experienceViewMode, setExperienceViewMode] = useState('zigzag'); // 'zigzag' | 'split'

  // Right sidebar properties panel state
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [propertiesTab, setPropertiesTab] = useState('design');
  const [inspectMode, setInspectMode] = useState('css');
  const [codeCopied, setCodeCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState('PNG');
  const [exportToast, setExportToast] = useState(false);

  // Interactive Frame & Alignment State
  const [selectedAlign, setSelectedAlign] = useState(null);
  const [frameX, setFrameX] = useState(0);
  const [frameY, setFrameY] = useState(0);
  const [frameW, setFrameW] = useState(1200);
  const [frameH, setFrameH] = useState(850);
  const [frameAngle, setFrameAngle] = useState(0);
  const [frameRadius, setFrameRadius] = useState(16);
  const [clipContent, setClipContent] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isFrameVisible, setIsFrameVisible] = useState(true);

  // Auto Layout State
  const [autoLayoutDir, setAutoLayoutDir] = useState('vertical'); // 'vertical' | 'horizontal'
  const [autoLayoutGap, setAutoLayoutGap] = useState(24);
  const [padX, setPadX] = useState(28);
  const [padY, setPadY] = useState(24);

  // Layer State
  const [blendMode, setBlendMode] = useState('Pass through');
  const [layerOpacity, setLayerOpacity] = useState(100);

  // Fill State
  const [fillColor, setFillColor] = useState('#1E2020');
  const [fillOpacity, setFillOpacity] = useState(35);
  const [fillVisible, setFillVisible] = useState(true);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Stroke State
  const [strokeColor, setStrokeColor] = useState('#FFFFFF');
  const [strokeOpacity, setStrokeOpacity] = useState(10);
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [strokeType, setStrokeType] = useState('Inside');
  const [strokeVisible, setStrokeVisible] = useState(true);

  // Effects State
  const [blurAmount, setBlurAmount] = useState(40);
  const [blurVisible, setBlurVisible] = useState(true);
  const [shadowVisible, setShadowVisible] = useState(true);

  // Prototype State
  const [selectedDevice, setSelectedDevice] = useState('MacBook Pro 16"');
  const [activeFlow, setActiveFlow] = useState('Flow 1');
  const [previewAnimation, setPreviewAnimation] = useState(false);

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

  const handleExportFrame = () => {
    const format = exportFormat.toLowerCase();
    const filename = `Varun_Sehgal_Portfolio_${activeTab}.${format}`;

    try {
      if (format === 'svg') {
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${frameW}" height="${frameH}" viewBox="0 0 ${frameW} ${frameH}">
  <rect width="100%" height="100%" fill="${fillColor}" rx="${frameRadius}"/>
  <text x="60" y="80" fill="#ffb5a1" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="32" font-weight="bold">Varun Sehgal Portfolio</text>
  <text x="60" y="120" fill="#9ca3af" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="18">UI/UX Designer | Product Designer</text>
  <text x="60" y="170" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="22" font-weight="600">Active View: ${activeTab.toUpperCase()}</text>
</svg>`;
        const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        const canvas = document.createElement('canvas');
        canvas.width = Number(frameW) || 1200;
        canvas.height = Number(frameH) || 850;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = fillColor || '#181920';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#ffb5a1';
          ctx.font = 'bold 36px sans-serif';
          ctx.fillText('Varun Sehgal Portfolio', 60, 100);
          ctx.fillStyle = '#9ca3af';
          ctx.font = '20px sans-serif';
          ctx.fillText('Lead UI/UX Designer & Product Designer', 60, 140);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText(`Exported Section: ${activeTab.toUpperCase()}`, 60, 200);
        }
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
        }, format === 'pdf' ? 'application/pdf' : 'image/png');
      }
    } catch (e) {
      console.warn('Export generated fallback', e);
    }

    setExportToast(true);
    setTimeout(() => setExportToast(false), 2400);
  };

  const handleCopyInspectCode = () => {
    const code = inspectMode === 'css'
      ? `/* Frame: Varun_Sehgal_Portfolio */
width: 100%;
max-width: ${frameW}px;
min-height: ${frameH}px;
background: ${fillVisible ? fillColor : 'transparent'};
border: ${strokeVisible ? `${strokeWidth}px solid ${strokeColor}` : 'none'};
border-radius: ${frameRadius}px;
padding: ${padY}px ${padX}px;
gap: ${autoLayoutGap}px;
backdrop-filter: ${blurVisible ? `blur(${blurAmount}px)` : 'none'};
box-shadow: ${shadowVisible ? '0 30px 100px -20px rgba(0, 0, 0, 0.9)' : 'none'};`
      : `<div className="w-full max-w-[${frameW}px] min-h-[${frameH}px]
  ${fillVisible ? `bg-[${fillColor}]` : 'bg-transparent'}
  ${strokeVisible ? `border border-[${strokeColor}]` : ''}
  rounded-[${frameRadius}px]
  p-[${padY}px_${padX}px] gap-[${autoLayoutGap}px]
  ${blurVisible ? `backdrop-blur-[${blurAmount}px]` : ''}
  ${shadowVisible ? 'shadow-2xl' : ''}">`;

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
    }
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const containerRef = useRef(null);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    setColorMenuOpen(false);
  };

  const resetWorkspace = () => {
    setPan({ x: 0, y: 0 });
    setFloatingShapes(INITIAL_SHAPES);
    setCurrentTheme('default');
    setColorMenuOpen(false);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  const addStickyNote = () => {
    if (floatingShapes.length >= 8) return;
    const colors = ['bg-yellow-200 text-black', 'bg-blue-200 text-black', 'bg-pink-200 text-black', 'bg-green-200 text-black'];
    const randomText = CREATIVE_NOTES[Math.floor(Math.random() * CREATIVE_NOTES.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newNote = {
      id: Date.now(),
      text: randomText,
      color: randomColor,
      x: -pan.x + 120 + (floatingShapes.length * 40) % 300,
      y: -pan.y + 40 + (floatingShapes.length * 30) % 200,
      isPinned: false
    };
    setFloatingShapes(prev => [...prev, newNote]);
  };

  const togglePin = (id) => {
    setFloatingShapes(prev => prev.map(s => s.id === id ? { ...s, isPinned: !s.isPinned } : s));
  };

  const updateStickyNote = (id, text) => {
    setFloatingShapes(prev => prev.map(s => s.id === id ? { ...s, text } : s));
  };

  const removeStickyNote = (id) => {
    setFloatingShapes(prev => prev.filter(s => s.id !== id));
  };

  // Canvas Mouse Down for Panning
  const handleCanvasMouseDown = (e) => {
    if (e.target.closest('.artboard-container') || e.target.closest('.sticky-note-element') || e.target.closest('button') || e.target.closest('a')) {
      return;
    }
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

  const filteredProjects = ALL_PROJECTS.filter(p => {
    const matchesCat = projectFilter === 'All' || p.category === projectFilter;
    const matchesSearch = projectSearch.trim() === '' ||
      p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.desc.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(projectSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const filteredActivity = TIMELINE_ACTIVITY.filter(item => {
    if (activityFilter === 'All') return true;
    if (activityFilter === 'Experience') return item.type === 'experience';
    if (activityFilter === 'Hackathons') return item.type === 'hackathons';
    if (activityFilter === 'Certifications') return item.type === 'certifications';
    return true;
  });

  return (
    <div className={`lovable-figma-portfolio theme-${currentTheme}`}>
      {/* =========================================================================
          1. GlobalNav (Top Navbar matching backup/lovable-portfolio)
          ========================================================================= */}
      <nav className="lovable-global-nav">
        <div className="nav-left-section">
          {/* Varun Profile Link */}
          <div className="nav-profile-link" onClick={() => setActiveTab('home')}>
            <div className="nav-avatar-circle">
              <FirebaseImage
                storagePath="profile/varun.jpg"
                fallbackSrc="/varun.jpg"
                alt="Varun Sehgal"
                className="nav-avatar-img"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="nav-avatar-fallback">VS</span>
            </div>
            <span className="nav-brand-title">Varun Sehgal Portfolio</span>
          </div>

          {/* Color & Theme Dropdown */}
          <div className="theme-menu-container">
            <button
              className="theme-menu-trigger"
              onClick={() => setColorMenuOpen(!colorMenuOpen)}
            >
              Color <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>

            {colorMenuOpen && (
              <div className="theme-dropdown-menu">
                <div className="dropdown-label">THEME PRESETS</div>
                <button className={`dropdown-item ${currentTheme === 'default' ? 'active' : ''}`} onClick={() => changeTheme('default')}>
                  <span className="theme-dot default"></span> Default (Dark)
                </button>
                <button className={`dropdown-item ${currentTheme === 'cyberpunk' ? 'active' : ''}`} onClick={() => changeTheme('cyberpunk')}>
                  <span className="theme-dot cyberpunk"></span> Cyberpunk
                </button>
                <button className={`dropdown-item ${currentTheme === 'ocean' ? 'active' : ''}`} onClick={() => changeTheme('ocean')}>
                  <span className="theme-dot ocean"></span> Ocean Breeze
                </button>
                <button className={`dropdown-item ${currentTheme === 'monochrome' ? 'active' : ''}`} onClick={() => changeTheme('monochrome')}>
                  <span className="theme-dot monochrome"></span> Monochrome
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item reset" onClick={resetWorkspace}>
                  <span className="material-symbols-outlined text-[14px]">restart_alt</span> Reset Workspace
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="nav-right-section">
          <button 
            type="button"
            className="nav-email-btn"
            onClick={() => {
              if (onOpenApp) {
                onOpenApp('contact');
              } else {
                window.location.href = 'mailto:varun.sehgal02@gmail.com';
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

      {exportToast && (
        <div className="lovable-toast-notification">
          <span className="material-symbols-outlined text-[16px]">file_download_done</span>
          Exported frame: Varun_Sehgal_Portfolio.{exportFormat.toLowerCase()}
        </div>
      )}

      {/* =========================================================================
          2. Main Workspace Layout
          ========================================================================= */}
      <div className="lovable-workspace-layout">
        {/* Left Sidebar ("Project Files" & "Assets") */}
        <aside className="lovable-sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-heading">Project Files</h2>
            <p className="sidebar-sub">V3 Final Render</p>
          </div>

          <div className="sidebar-nav-list">
            <div
              className={`sidebar-nav-item ${showAssets ? 'active' : ''}`}
              onClick={() => setShowAssets(!showAssets)}
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              <span>Assets</span>
            </div>

            <div className="sidebar-section-title">QUICK JUMP</div>
            <a
              href="https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1"
              target="_blank"
              rel="noreferrer"
              className="sidebar-file-link"
            >
              <span className="material-symbols-outlined text-[14px]">smart_toy</span>
              <span>AI Interview</span>
            </a>
            <a
              href="https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1"
              target="_blank"
              rel="noreferrer"
              className="sidebar-file-link"
            >
              <span className="material-symbols-outlined text-[14px]">confirmation_number</span>
              <span>Movie Tickets</span>
            </a>
            <a
              href="https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1"
              target="_blank"
              rel="noreferrer"
              className="sidebar-file-link"
            >
              <span className="material-symbols-outlined text-[14px]">account_balance_wallet</span>
              <span>Expensify</span>
            </a>
            <a
              href="https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2&t=vfPIBYY278lzphVq-1"
              target="_blank"
              rel="noreferrer"
              className="sidebar-file-link"
            >
              <span className="material-symbols-outlined text-[14px]">diversity_3</span>
              <span>CodeSrijan</span>
            </a>
          </div>

          <div className="sidebar-footer">
            <a
              href="/Varun_Sehgal_Resume_Updated.pdf"
              download="Varun_Sehgal_Resume.pdf"
              className="sidebar-download-btn"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download Resume</span>
            </a>
          </div>
        </aside>

        {/* Assets Slide-out Drawer */}
        {showAssets && (
          <div className="lovable-assets-drawer">
            <div className="drawer-header">
              <h3>Design Assets</h3>
              <span className="material-symbols-outlined close-btn" onClick={() => setShowAssets(false)}>close</span>
            </div>

            <div className="drawer-section">
              <span className="drawer-label">CUSTOMIZE THEME</span>
              <div className="drawer-theme-options">
                <button onClick={() => changeTheme('default')} className="drawer-theme-btn">
                  <div className="color-swatch-pair"><span className="swatch dark"></span><span className="swatch gray"></span></div>
                  <span>Default (Dark)</span>
                </button>
                <button onClick={() => changeTheme('cyberpunk')} className="drawer-theme-btn">
                  <div className="color-swatch-pair"><span className="swatch blue"></span><span className="swatch pink"></span></div>
                  <span>Cyberpunk</span>
                </button>
                <button onClick={() => changeTheme('ocean')} className="drawer-theme-btn">
                  <div className="color-swatch-pair"><span className="swatch cyan"></span><span className="swatch green"></span></div>
                  <span>Ocean Breeze</span>
                </button>
                <button onClick={() => changeTheme('monochrome')} className="drawer-theme-btn">
                  <div className="color-swatch-pair"><span className="swatch light"></span><span className="swatch mid"></span></div>
                  <span>Monochrome</span>
                </button>
              </div>
            </div>

            <div className="drawer-section">
              <span className="drawer-label">TYPOGRAPHY</span>
              <p className="drawer-font-sample main">Space Grotesk</p>
              <p className="drawer-font-sample sub">Inter / JetBrains Mono</p>
            </div>
          </div>
        )}

        {/* Center Main Stage */}
        <main
          ref={containerRef}
          className={`lovable-canvas-stage ${isPanning ? 'panning' : ''}`}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
        >
          {/* Dot Grid Background */}
          <div
            className="lovable-dot-grid"
            style={{
              backgroundPosition: `${pan.x}px ${pan.y}px`
            }}
          ></div>

          {/* =========================================================================
              VIEW 1: HOME (Infinite Panning Canvas + Glass Artboard)
              ========================================================================= */}
          {activeTab === 'home' && (
            <div
              className="lovable-canvas-world"
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`
              }}
            >
              {/* Sticky Notes */}
              <div className="sticky-notes-layer">
                {floatingShapes.map(shape => (
                  <div
                    key={shape.id}
                    className={`lovable-sticky-note ${shape.color} ${shape.isPinned ? 'pinned' : ''}`}
                    style={{ left: shape.x, top: shape.y }}
                  >
                    <div className="sticky-note-top">
                      <span className="note-label">NOTE</span>
                      <span
                        className={`material-symbols-outlined pin-icon ${shape.isPinned ? 'active' : ''}`}
                        onClick={() => togglePin(shape.id)}
                        title="Toggle pin"
                      >
                        push_pin
                      </span>
                    </div>
                    <textarea
                      value={shape.text}
                      onChange={(e) => updateStickyNote(shape.id, e.target.value)}
                      className="sticky-note-textarea"
                      placeholder="Type here..."
                    />
                    <button
                      className="sticky-note-close-btn"
                      onClick={() => removeStickyNote(shape.id)}
                      title="Remove note"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Central Glass Artboard */}
              <div 
                className="artboard-container"
                style={{
                  maxWidth: `${frameW}px`,
                  minHeight: `${frameH}px`,
                  borderRadius: `${frameRadius}px`,
                  padding: `${padY}px ${padX}px`,
                  gap: `${autoLayoutGap}px`,
                  flexDirection: autoLayoutDir === 'vertical' ? 'column' : 'row',
                  backgroundColor: fillVisible ? fillColor : 'transparent',
                  opacity: isFrameVisible ? (Number(layerOpacity) / 100) : 0.08,
                  border: strokeVisible ? `${strokeWidth}px solid ${strokeColor}` : 'none',
                  backdropFilter: blurVisible ? `blur(${blurAmount}px)` : 'none',
                  WebkitBackdropFilter: blurVisible ? `blur(${blurAmount}px)` : 'none',
                  boxShadow: shadowVisible ? '0 30px 100px -20px rgba(0, 0, 0, 0.9)' : 'none',
                  overflow: clipContent ? 'hidden' : 'visible',
                  transform: `rotate(${frameAngle}deg)`,
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Artboard Frame Header */}
                <div className="artboard-frame-header">
                  <div className="frame-header-left">
                    <span className="material-symbols-outlined text-[16px] text-[#ffb5a1]">layers</span>
                    <span className="frame-file-title">Varun_Sehgal_Portfolio.fig</span>
                  </div>
                  <div className="frame-view-badge">
                    Artboard view
                  </div>
                </div>

                {/* Ambient Radial Glows */}
                <div className="ambient-glow glow-top"></div>
                <div className="ambient-glow glow-bottom"></div>

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

                  {/* Right Column "Now" Panel */}
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

                {/* Featured Projects Bento Cards */}
                <section className="featured-projects-section">
                  <div className="section-title-header">
                    <h2>Featured Work</h2>
                    <p>Selected design systems and product prototypes.</p>
                  </div>

                  <div className="featured-cards-grid">
                    {ALL_PROJECTS.slice(0, 4).map((proj) => (
                      <div key={proj.id} className="featured-project-card">
                        <div className="project-preview-wrap">
                          <FirebaseImage
                            storagePath={`projects/${proj.id}.png`}
                            fallbackSrc={proj.image}
                            alt={proj.name}
                            className="project-preview-img"
                          />
                          <span className="project-badge-pill">{proj.badge}</span>
                        </div>

                        <div className="project-body">
                          <div className="project-meta-row">
                            <span className="project-cat">{proj.category}</span>
                            <span className="project-metric-stat">{proj.metric}</span>
                          </div>

                          <h3 className="project-name">{proj.name}</h3>
                          <p className="project-desc">{proj.desc}</p>

                          <div className="project-tags-row">
                            {proj.tags.map((tag, i) => (
                              <span key={i} className="project-tag-pill">{tag}</span>
                            ))}
                          </div>

                          <div className="project-card-actions">
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noreferrer"
                              className="open-in-figma-link"
                            >
                              Open in Figma <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 2: WORK / PROJECTS (Full Bento Grid & Search)
              ========================================================================= */}
          {activeTab === 'projects' && (
            <div className="lovable-static-view">
              <div className="view-content-wrapper">
                <header className="view-page-header">
                  <h1 className="view-page-title">Work & Case Studies</h1>
                  <p className="view-page-desc">Complete showcase of production UX flows, SaaS platforms, and mobile applications.</p>
                </header>

                {/* Filter and Search Bar */}
                <div className="projects-filter-bar">
                  <div className="search-input-wrap">
                    <span className="material-symbols-outlined search-icon">search</span>
                    <input
                      type="text"
                      placeholder="Search projects by name, tags, domain..."
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      className="search-field"
                    />
                  </div>

                  <div className="category-filter-pills">
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

                {/* Full Bento Grid */}
                <div className="bento-grid-container">
                  {filteredProjects.map(proj => (
                    <div key={proj.id} className="bento-card">
                      <div className="bento-img-wrap">
                        <FirebaseImage
                          storagePath={`projects/${proj.id}.png`}
                          fallbackSrc={proj.image}
                          alt={proj.name}
                          className="bento-img"
                        />
                        <span className="bento-badge">{proj.badge}</span>
                      </div>
                      <div className="bento-body">
                        <span className="bento-cat">{proj.category}</span>
                        <h3 className="bento-title">{proj.name}</h3>
                        <p className="bento-desc">{proj.desc}</p>
                        <div className="bento-tags-list">
                          {proj.tags.map((t, idx) => (
                            <span key={idx} className="bento-tag">{t}</span>
                          ))}
                        </div>
                        <a href={proj.link} target="_blank" rel="noreferrer" className="bento-action-btn">
                          Open in Figma <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 3: EXPERIENCE (Recent Activity, Zigzag Timeline & Credentials)
              ========================================================================= */}
          {activeTab === 'experience' && (
            <div className="lovable-static-view">
              <div className="view-content-wrapper">
                <header className="view-page-header">
                  <div className="activity-header-top">
                    <div>
                      <h1 className="view-page-title">Recent Activity</h1>
                      <p className="view-page-desc">Tracking changes across Varun_Sehgal_Portfolio.fig</p>
                    </div>

                    {/* Filter and View Controls */}
                    <div className="activity-controls-row">
                      <div className="activity-filter-pills">
                        {['All', 'Experience', 'Hackathons', 'Certifications'].map(filter => (
                          <button
                            key={filter}
                            type="button"
                            className={`activity-filter-btn ${activityFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>

                      <div className="activity-view-switcher">
                        <button
                          type="button"
                          className={`view-switch-btn ${experienceViewMode === 'zigzag' ? 'active' : ''}`}
                          onClick={() => setExperienceViewMode('zigzag')}
                          title="Alternating Timeline View"
                        >
                          <span className="material-symbols-outlined text-[15px]">timeline</span>
                          <span>Timeline</span>
                        </button>
                        <button
                          type="button"
                          className={`view-switch-btn ${experienceViewMode === 'split' ? 'active' : ''}`}
                          onClick={() => setExperienceViewMode('split')}
                          title="Split Column View"
                        >
                          <span className="material-symbols-outlined text-[15px]">view_column</span>
                          <span>Columns</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </header>

                {/* Alternating Zigzag Timeline (Matching Recent Activity Mockup) */}
                {experienceViewMode === 'zigzag' ? (
                  <div className="zigzag-timeline-wrapper">
                    <div className="zigzag-timeline-container">
                      <div className="zigzag-center-line"></div>

                      {filteredActivity.map((item, index) => {
                        const isRight = index % 2 === 0;
                        return (
                          <div 
                            key={item.id} 
                            className={`zigzag-timeline-row ${isRight ? 'align-right' : 'align-left'}`}
                          >
                            {/* Center Node Icon pinned on spine */}
                            <div className="zigzag-node-icon" title={item.category}>
                              <span className="material-symbols-outlined text-[17px]">{item.icon}</span>
                            </div>

                            {/* Alternating Card */}
                            <div className="zigzag-card">
                              <div className="zigzag-card-header">
                                <span className="zigzag-card-date">{item.date}</span>
                                <span className="zigzag-card-badge">{item.category}</span>
                              </div>

                              <div className="zigzag-card-title-row">
                                <h3 className="zigzag-card-title">
                                  <span className="zigzag-highlight-name">{item.highlight}</span> {item.titleRest}
                                </h3>
                              </div>

                              {item.quote && (
                                <blockquote className="zigzag-card-quote">
                                  "{item.quote}"
                                </blockquote>
                              )}

                              {item.desc && (
                                <p className="zigzag-card-desc">{item.desc}</p>
                              )}

                              <div className="zigzag-card-footer">
                                <div className="zigzag-badges-row">
                                  {item.award && (
                                    <span className="hackathon-award-badge">{item.award}</span>
                                  )}
                                  {item.credentialId && (
                                    <span className="cert-id-badge">ID: {item.credentialId}</span>
                                  )}
                                  {item.location && (
                                    <span className="timeline-location-pill">{item.location}</span>
                                  )}
                                </div>

                                {item.link && (
                                  <div className="zigzag-actions-row">
                                    <a 
                                      href={item.link} 
                                      target="_blank" 
                                      rel="noreferrer" 
                                      className="cert-action-btn primary"
                                      title="Open link in browser"
                                    >
                                      <span>{item.actionLabel || 'Verify'}</span>
                                      <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                                    </a>
                                    <button 
                                      type="button"
                                      className="cert-action-btn secondary"
                                      onClick={() => handleCopyLink(item.link, `${item.highlight} link`)}
                                      title="Copy link to clipboard"
                                    >
                                      <span className="material-symbols-outlined text-[13px]">content_copy</span>
                                      <span>Copy</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer matching user screenshot */}
                    <div className="activity-timeline-footer">
                      <span className="footer-brand">Spectral Chroma</span>
                      <div className="activity-footer-links">
                        <span onClick={() => onOpenApp ? onOpenApp('contact') : null}>Feedback</span>
                        <span>Shortcuts</span>
                        <span>System Status</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Alternate Split Columns View */
                  <div className="experience-columns-grid">
                    {/* Timeline Column */}
                    <div className="timeline-section">
                      <h2 className="sub-section-title">Career Timeline & Internships</h2>
                      <div className="timeline-flow">
                        {TIMELINE.map((item, index) => (
                          <div key={index} className="timeline-flow-node">
                            <div className="flow-dot-col">
                              <span className="flow-dot"></span>
                              {index < TIMELINE.length - 1 && <span className="flow-stem"></span>}
                            </div>
                            <div className="flow-content-card">
                              <span className="flow-period">{item.period}</span>
                              <h3 className="flow-role">{item.role}</h3>
                              <div className="timeline-meta-row">
                                <a 
                                  href={item.link} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="timeline-company-link"
                                >
                                  {item.company}
                                  <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                                </a>
                                {item.location && <span className="timeline-location-pill">{item.location}</span>}
                              </div>
                              <p className="flow-desc">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Hackathons Section */}
                      <div className="hackathons-section">
                        <h2 className="sub-section-title">Hackathon Wins & Leadership</h2>
                        <div className="timeline-flow">
                          {HACKATHONS.map((hack, index) => (
                            <div key={hack.id} className="timeline-flow-node">
                              <div className="flow-dot-col">
                                <span className="flow-dot" style={{ background: '#f59e0b' }}></span>
                                {index < HACKATHONS.length - 1 && <span className="flow-stem"></span>}
                              </div>
                              <div className="flow-content-card">
                                <span className="flow-period">{hack.date}</span>
                                <div className="hackathon-award-badge">
                                  <span>{hack.award}</span>
                                </div>
                                <h3 className="flow-role">{hack.title}</h3>
                                <div className="timeline-meta-row">
                                  <a 
                                    href={hack.link} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="timeline-company-link"
                                  >
                                    {hack.issuer}
                                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                                  </a>
                                </div>
                                <p className="flow-desc">{hack.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Certifications Column */}
                    <div className="certs-section">
                      <h2 className="sub-section-title">Verified Certifications</h2>
                      <div className="certs-flow-grid">
                        {CERTIFICATIONS.map(cert => (
                          <div key={cert.id} className="cert-flow-card">
                            <div className="cert-card-top">
                              <span className="material-symbols-outlined text-[#ffb5a1] text-[20px]">verified</span>
                              <span className="cert-date">{cert.date}</span>
                            </div>
                            <h3 className="cert-title">{cert.title}</h3>
                            <span className="cert-issuer">Issued by {cert.issuer}</span>
                            {cert.credentialId && (
                              <span className="cert-id-badge">ID: {cert.credentialId}</span>
                            )}
                            <p className="cert-desc">{cert.desc}</p>
                            
                            <div className="cert-actions-row">
                              <a 
                                href={cert.link} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="cert-action-btn primary"
                                title="Open verified credential in browser"
                              >
                                <span>Verify Credential</span>
                                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                              </a>
                              <button 
                                type="button"
                                className="cert-action-btn secondary"
                                onClick={() => handleCopyLink(cert.link, `${cert.title} link`)}
                                title="Copy certificate verification link"
                              >
                                <span className="material-symbols-outlined text-[13px]">content_copy</span>
                                <span>Copy Link</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 4: ABOUT (Master Component Specs)
              ========================================================================= */}
          {activeTab === 'about' && (
            <div className="lovable-static-view">
              <div className="view-content-wrapper">
                <header className="view-page-header">
                  <div className="about-header-flex">
                    <div>
                      <h1 className="view-page-title">Master Component Specs</h1>
                      <p className="view-page-desc">Varun Sehgal — Design, identity, and engineering parameters.</p>
                    </div>

                    <div className="variant-switch-group">
                      <span className="variant-label">Variant:</span>
                      {['Product Designer', 'UI/UX Specialist', 'Design System Lead'].map(v => (
                        <button
                          key={v}
                          className={`variant-btn ${aboutVariant === v ? 'active' : ''}`}
                          onClick={() => setAboutVariant(v)}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </header>

                <div className="about-specs-layout">
                  {/* Master Card */}
                  <div className="about-profile-card">
                    <div className="profile-photo-circle">
                      <FirebaseImage
                        storagePath="profile/varun.jpg"
                        fallbackSrc="/varun.jpg"
                        alt="Varun Sehgal"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <span className="photo-fallback">VS</span>
                    </div>

                    <div className="profile-card-details">
                      <span className="profile-tag">#Core Master Component</span>
                      <h2 className="profile-name">Varun Sehgal</h2>
                      <span className="profile-role-pill">{aboutVariant}</span>
                      <p className="profile-bio">
                        Undergraduate at Jaypee University Of Engineering And Technology (2023–2027)
                        bridging visual design craft with scalable frontend systems.
                      </p>
                    </div>
                  </div>

                  {/* 4 Technical Specs */}
                  <div className="specs-quad-grid">
                    <div className="spec-tile">
                      <div className="tile-title-row">
                        <span className="material-symbols-outlined icon">palette</span>
                        <span>Design Tools</span>
                      </div>
                      <div className="tile-tags">
                        {['Figma', 'Figma AI', 'FigJam', 'Adobe XD', 'Photoshop', 'Illustrator'].map((s, i) => (
                          <span key={i} className="tile-pill">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div className="spec-tile">
                      <div className="tile-title-row">
                        <span className="material-symbols-outlined icon">code</span>
                        <span>Frontend Engineering</span>
                      </div>
                      <div className="tile-tags">
                        {['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Git', 'Vite'].map((s, i) => (
                          <span key={i} className="tile-pill">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div className="spec-tile">
                      <div className="tile-title-row">
                        <span className="material-symbols-outlined icon">architecture</span>
                        <span>UI/UX Methods</span>
                      </div>
                      <div className="tile-tags">
                        {['Design Systems', 'Atomic Tokens', 'Wireframing', 'User Testing', 'WCAG AA'].map((s, i) => (
                          <span key={i} className="tile-pill">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div className="spec-tile">
                      <div className="tile-title-row">
                        <span className="material-symbols-outlined icon">verified_user</span>
                        <span>Status & Availability</span>
                      </div>
                      <p className="spec-status-text">
                        🟢 Open for Summer 2025 Product Design Roles, Design Systems Audits, & SaaS Consulting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 5: RESUME (Document Viewer)
              ========================================================================= */}
          {activeTab === 'resume' && (
            <div className="lovable-static-view">
              <div className="view-content-wrapper">
                <header className="view-page-header">
                  <div className="resume-header-flex">
                    <div>
                      <h1 className="view-page-title">Resume & Qualifications</h1>
                      <p className="view-page-desc">Complete overview of professional experience and educational credentials.</p>
                    </div>

                    <a
                      href="/Varun_Sehgal_Resume_Updated.pdf"
                      download="Varun_Sehgal_Resume.pdf"
                      className="resume-download-action-btn"
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      Download Resume PDF
                    </a>
                  </div>
                </header>

                <div className="resume-sheet-card">
                  <div className="sheet-top-header">
                    <h2>VARUN SEHGAL</h2>
                    <p className="sheet-subtitle">UI/UX Designer • Product Designer</p>
                    <p className="sheet-contact-line">Bengaluru, IN • varun.sehgal02@gmail.com • +91 9399361193</p>
                  </div>

                  <div className="sheet-section">
                    <h3>EDUCATION</h3>
                    <div className="sheet-entry">
                      <div className="entry-header">
                        <strong>Jaypee University Of Engineering And Technology</strong>
                        <span>2023 — 2027</span>
                      </div>
                      <p className="entry-sub">B.Tech in Computer Science & Engineering</p>
                    </div>
                  </div>

                  <div className="sheet-section">
                    <h3>EXPERIENCE</h3>
                    <div className="sheet-entry">
                      <div className="entry-header">
                        <strong>UniEvent — Lead Product Designer</strong>
                        <span>Oct 2024 — Present</span>
                      </div>
                      <p className="entry-sub">Engineered campus event management UI, cutting transaction drop-off by 30% through a 50+ component design system.</p>
                    </div>

                    <div className="sheet-entry">
                      <div className="entry-header">
                        <strong>Assemble — UI/UX Design Intern</strong>
                        <span>Jul 2024 — Sep 2024</span>
                      </div>
                      <p className="entry-sub">Designed interactive creator tooling and workflows in Figma with seamless handoff to engineering.</p>
                    </div>
                  </div>

                  <div className="sheet-section">
                    <h3>SKILLS & COMPETENCIES</h3>
                    <p className="sheet-skills-text"><strong>Design:</strong> Figma, Figma AI, Adobe XD, Wireframing, Rapid Prototyping, Design Systems, Tokens, WCAG AA</p>
                    <p className="sheet-skills-text"><strong>Development:</strong> React.js, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3, Git</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 6: PROCESS (Product Design Methodology)
              ========================================================================= */}
          {activeTab === 'process' && (
            <div className="lovable-static-view">
              <div className="view-content-wrapper">
                <header className="view-page-header">
                  <h1 className="view-page-title">Process & Methodology</h1>
                  <p className="view-page-desc">How Varun Sehgal transforms ambiguous design requirements into polished, tested digital products.</p>
                </header>

                <div className="process-steps-grid">
                  <div className="process-card">
                    <span className="step-number">01</span>
                    <h3>Discover & Empathize</h3>
                    <span className="step-tag">Research & Strategy</span>
                    <p>Conducting user interviews, stakeholder workshops, competitive audits, and empathy mapping.</p>
                  </div>

                  <div className="process-card">
                    <span className="step-number">02</span>
                    <h3>Define & Architect</h3>
                    <span className="step-tag">Structure & Personas</span>
                    <p>Synthesizing insights into user personas, journey flows, and low-fidelity architectural wireframes.</p>
                  </div>

                  <div className="process-card">
                    <span className="step-number">03</span>
                    <h3>Design System & Tokens</h3>
                    <span className="step-tag">Scalable Foundations</span>
                    <p>Establishing color semantics, typography scales, spacing tokens, and atomic auto-layout components.</p>
                  </div>

                  <div className="process-card">
                    <span className="step-number">04</span>
                    <h3>High-Fidelity Prototyping</h3>
                    <span className="step-tag">Interactive Flows</span>
                    <p>Building responsive artboards with smart-animate micro-interactions for authentic stakeholder validation.</p>
                  </div>

                  <div className="process-card">
                    <span className="step-number">05</span>
                    <h3>Validation & Dev Handoff</h3>
                    <span className="step-tag">Production Alignment</span>
                    <p>Usability testing, design token documentation, and partnering closely with frontend engineers.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 7: PLUGINS (Creative Workflow Tools)
              ========================================================================= */}
          {activeTab === 'plugins' && (
            <div className="lovable-static-view">
              <div className="view-content-wrapper">
                <header className="view-page-header">
                  <h1 className="view-page-title">Figma Plugins & Extensions</h1>
                  <p className="view-page-desc">Installed plugins that supercharge the creative design workflow.</p>
                </header>

                <div className="plugins-grid-container">
                  {PLUGINS.map(plugin => (
                    <a key={plugin.name} href={plugin.link} target="_blank" rel="noreferrer" className="plugin-item-card">
                      <div className="plugin-icon-wrap">
                        <span className="material-symbols-outlined text-[24px] text-[#ffb5a1]">{plugin.icon}</span>
                      </div>
                      <div className="plugin-info">
                        <div className="plugin-top">
                          <h3 className="plugin-name">{plugin.name}</h3>
                          <span className="plugin-cat-badge">{plugin.category}</span>
                        </div>
                        <p className="plugin-desc">{plugin.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Right Sidebar ("Design / Prototype / Inspect" Inspector Panel) */}
        {rightSidebarOpen && (
          <aside className="lovable-properties-sidebar">
            {/* Inspector Top Tabs */}
            <div className="properties-top-header">
              <div className="properties-tabs-row">
                <button
                  className={`prop-tab-btn ${propertiesTab === 'design' ? 'active' : ''}`}
                  onClick={() => setPropertiesTab('design')}
                >
                  Design
                </button>
                <button
                  className={`prop-tab-btn ${propertiesTab === 'prototype' ? 'active' : ''}`}
                  onClick={() => setPropertiesTab('prototype')}
                >
                  Prototype
                </button>
                <button
                  className={`prop-tab-btn ${propertiesTab === 'inspect' ? 'active' : ''}`}
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

            <div className="properties-body-scroll">
              {propertiesTab === 'design' && (
                <>
                  {/* Selected Object Header */}
                  <div className="prop-section prop-target-header">
                    <div className="prop-target-icon">
                      <span className="material-symbols-outlined text-[15px]">crop_free</span>
                    </div>
                    <div className="prop-target-name">
                      <span className="target-label">Varun_Sehgal_Portfolio</span>
                      <span className="target-type">Frame · {frameW} × {frameH}</span>
                    </div>
                    <div className="prop-target-controls">
                      <button 
                        type="button"
                        className={`prop-mini-icon-btn ${isLocked ? 'active' : 'inactive'}`}
                        onClick={() => {
                          setIsLocked(!isLocked);
                          showToast(isLocked ? 'Frame unlocked' : 'Frame locked');
                        }}
                        title={isLocked ? "Unlock Frame" : "Lock Frame"}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {isLocked ? 'lock' : 'lock_open'}
                        </span>
                      </button>
                      <button 
                        type="button"
                        className={`prop-mini-icon-btn ${isFrameVisible ? '' : 'inactive'}`}
                        onClick={() => setIsFrameVisible(!isFrameVisible)}
                        title={isFrameVisible ? "Hide Frame" : "Show Frame"}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {isFrameVisible ? 'visibility' : 'visibility_off'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Alignment Toolbar */}
                  <div className="prop-section prop-alignment-bar">
                    <button 
                      type="button"
                      className={`prop-align-btn ${selectedAlign === 'left' ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedAlign('left');
                        setPan(prev => ({ ...prev, x: 150 }));
                        showToast('Aligned Left');
                      }} 
                      title="Align Left"
                    >
                      <span className="material-symbols-outlined text-[15px]">align_horizontal_left</span>
                    </button>
                    <button 
                      type="button"
                      className={`prop-align-btn ${selectedAlign === 'hcenter' ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedAlign('hcenter');
                        setPan(prev => ({ ...prev, x: 0 }));
                        showToast('Aligned Horizontal Center');
                      }} 
                      title="Align Horizontal Center"
                    >
                      <span className="material-symbols-outlined text-[15px]">align_horizontal_center</span>
                    </button>
                    <button 
                      type="button"
                      className={`prop-align-btn ${selectedAlign === 'right' ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedAlign('right');
                        setPan(prev => ({ ...prev, x: -150 }));
                        showToast('Aligned Right');
                      }} 
                      title="Align Right"
                    >
                      <span className="material-symbols-outlined text-[15px]">align_horizontal_right</span>
                    </button>
                    <button 
                      type="button"
                      className={`prop-align-btn ${selectedAlign === 'top' ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedAlign('top');
                        setPan(prev => ({ ...prev, y: 100 }));
                        showToast('Aligned Top');
                      }} 
                      title="Align Top"
                    >
                      <span className="material-symbols-outlined text-[15px]">align_vertical_top</span>
                    </button>
                    <button 
                      type="button"
                      className={`prop-align-btn ${selectedAlign === 'vcenter' ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedAlign('vcenter');
                        setPan(prev => ({ ...prev, y: 0 }));
                        showToast('Aligned Vertical Center');
                      }} 
                      title="Align Vertical Center"
                    >
                      <span className="material-symbols-outlined text-[15px]">align_vertical_center</span>
                    </button>
                    <button 
                      type="button"
                      className={`prop-align-btn ${selectedAlign === 'bottom' ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedAlign('bottom');
                        setPan(prev => ({ ...prev, y: -100 }));
                        showToast('Aligned Bottom');
                      }} 
                      title="Align Bottom"
                    >
                      <span className="material-symbols-outlined text-[15px]">align_vertical_bottom</span>
                    </button>
                  </div>

                  {/* Frame Coordinates & Dimensions */}
                  <div className="prop-section">
                    <div className="prop-section-title">Frame</div>
                    <div className="prop-grid-2x2">
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">X</span>
                        <input 
                          type="number" 
                          value={frameX} 
                          onChange={(e) => setFrameX(Number(e.target.value) || 0)} 
                          className="prop-num-input" 
                        />
                      </div>
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">Y</span>
                        <input 
                          type="number" 
                          value={frameY} 
                          onChange={(e) => setFrameY(Number(e.target.value) || 0)} 
                          className="prop-num-input" 
                        />
                      </div>
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">W</span>
                        <input 
                          type="number" 
                          value={frameW} 
                          onChange={(e) => setFrameW(Number(e.target.value) || 0)} 
                          className="prop-num-input" 
                        />
                      </div>
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">H</span>
                        <input 
                          type="number" 
                          value={frameH} 
                          onChange={(e) => setFrameH(Number(e.target.value) || 0)} 
                          className="prop-num-input" 
                        />
                      </div>
                    </div>
                    <div className="prop-grid-2x2 mt-2">
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">∠</span>
                        <input 
                          type="number" 
                          value={frameAngle} 
                          onChange={(e) => setFrameAngle(Number(e.target.value) || 0)} 
                          className="prop-num-input" 
                        />
                      </div>
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">
                          <span className="material-symbols-outlined text-[13px]">rounded_corner</span>
                        </span>
                        <input 
                          type="number" 
                          value={frameRadius} 
                          onChange={(e) => setFrameRadius(Number(e.target.value) || 0)} 
                          className="prop-num-input" 
                        />
                      </div>
                    </div>
                    <div className="prop-checkbox-row">
                      <label className="prop-checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={clipContent} 
                          onChange={(e) => setClipContent(e.target.checked)} 
                          className="prop-checkbox cursor-pointer" 
                        />
                        <span>Clip content</span>
                      </label>
                    </div>
                  </div>

                  {/* Auto Layout */}
                  <div className="prop-section">
                    <div className="prop-section-header">
                      <span className="prop-section-title">Auto layout</span>
                      <button 
                        type="button"
                        className="prop-header-icon-btn"
                        onClick={() => {
                          setAutoLayoutGap(24);
                          setPadX(28);
                          setPadY(24);
                          showToast('Auto layout reset to defaults');
                        }}
                        title="Reset Layout Defaults"
                      >
                        <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                      </button>
                    </div>
                    <div className="prop-autolayout-controls">
                      <div className="autolayout-dir-group">
                        <button 
                          type="button"
                          className={`prop-icon-btn ${autoLayoutDir === 'vertical' ? 'active' : ''}`} 
                          onClick={() => setAutoLayoutDir('vertical')}
                          title="Vertical Direction"
                        >
                          <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                        </button>
                        <button 
                          type="button"
                          className={`prop-icon-btn ${autoLayoutDir === 'horizontal' ? 'active' : ''}`} 
                          onClick={() => setAutoLayoutDir('horizontal')}
                          title="Horizontal Direction"
                        >
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                      <div className="prop-input-wrap flex-1">
                        <span className="prop-input-label">Gap</span>
                        <input 
                          type="number" 
                          value={autoLayoutGap} 
                          onChange={(e) => setAutoLayoutGap(Number(e.target.value) || 0)} 
                          className="prop-num-input" 
                        />
                      </div>
                    </div>
                    <div className="prop-grid-2x2 mt-2">
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">Pad X</span>
                        <input 
                          type="number" 
                          value={padX} 
                          onChange={(e) => setPadX(Number(e.target.value) || 0)} 
                          className="prop-num-input" 
                        />
                      </div>
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">Pad Y</span>
                        <input 
                          type="number" 
                          value={padY} 
                          onChange={(e) => setPadY(Number(e.target.value) || 0)} 
                          className="prop-num-input" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Layer */}
                  <div className="prop-section">
                    <div className="prop-section-title">Layer</div>
                    <div className="prop-flex-row">
                      <select 
                        className="prop-select flex-1 cursor-pointer" 
                        value={blendMode} 
                        onChange={(e) => setBlendMode(e.target.value)}
                      >
                        <option>Pass through</option>
                        <option>Normal</option>
                        <option>Multiply</option>
                        <option>Screen</option>
                        <option>Overlay</option>
                        <option>Darken</option>
                        <option>Lighten</option>
                      </select>
                      <div className="prop-input-wrap w-16">
                        <input 
                          type="number" 
                          min="0" 
                          max="100" 
                          value={layerOpacity} 
                          onChange={(e) => setLayerOpacity(Math.min(100, Math.max(0, Number(e.target.value) || 0)))} 
                          className="prop-num-input text-right" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fill */}
                  <div className="prop-section">
                    <div className="prop-section-header">
                      <span className="prop-section-title">Fill</span>
                      <button 
                        type="button"
                        className="prop-header-icon-btn"
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        title="Color presets"
                      >
                        <span className="material-symbols-outlined text-[14px]">palette</span>
                      </button>
                    </div>
                    <div className="prop-color-row">
                      <input 
                        type="color" 
                        value={fillColor.startsWith('#') && fillColor.length === 7 ? fillColor : '#1E2020'} 
                        onChange={(e) => setFillColor(e.target.value)}
                        className="color-picker-input-native"
                        title="Pick fill color"
                      />
                      <input 
                        type="text" 
                        value={fillColor.toUpperCase()} 
                        onChange={(e) => setFillColor(e.target.value)}
                        className="color-hex-input"
                        title="Hex color code"
                      />
                      <span className="color-opacity-text">{fillOpacity}%</span>
                      <button 
                        type="button"
                        className="prop-eye-toggle-btn ml-auto"
                        onClick={() => setFillVisible(!fillVisible)}
                        title={fillVisible ? "Hide Fill" : "Show Fill"}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {fillVisible ? 'visibility' : 'visibility_off'}
                        </span>
                      </button>
                    </div>

                    {showColorPicker && (
                      <div className="color-presets-popover">
                        {['#1E2020', '#0a0a0c', '#1e1e2f', '#0f172a', '#241442', '#14201e'].map(hex => (
                          <div 
                            key={hex} 
                            className="color-preset-dot"
                            style={{ background: hex }}
                            onClick={() => {
                              setFillColor(hex);
                              setShowColorPicker(false);
                            }}
                            title={`Select ${hex}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Stroke */}
                  <div className="prop-section">
                    <div className="prop-section-header">
                      <span className="prop-section-title">Stroke</span>
                      <button 
                        type="button"
                        className="prop-header-icon-btn"
                        onClick={() => {
                          setStrokeColor('#FFFFFF');
                          setStrokeWidth(1);
                        }}
                        title="Reset stroke"
                      >
                        <span className="material-symbols-outlined text-[14px]">refresh</span>
                      </button>
                    </div>
                    <div className="prop-color-row">
                      <input 
                        type="color" 
                        value={strokeColor.startsWith('#') && strokeColor.length === 7 ? strokeColor : '#FFFFFF'} 
                        onChange={(e) => setStrokeColor(e.target.value)}
                        className="color-picker-input-native"
                        title="Pick stroke color"
                      />
                      <input 
                        type="text" 
                        value={strokeColor.toUpperCase()} 
                        onChange={(e) => setStrokeColor(e.target.value)}
                        className="color-hex-input"
                        title="Stroke hex color"
                      />
                      <span className="color-opacity-text">{strokeOpacity}%</span>
                      <button 
                        type="button"
                        className="prop-eye-toggle-btn ml-auto"
                        onClick={() => setStrokeVisible(!strokeVisible)}
                        title={strokeVisible ? "Hide Stroke" : "Show Stroke"}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {strokeVisible ? 'visibility' : 'visibility_off'}
                        </span>
                      </button>
                    </div>
                    <div className="prop-grid-2x2 mt-2">
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">Width</span>
                        <input 
                          type="number" 
                          min="0" 
                          max="20" 
                          value={strokeWidth} 
                          onChange={(e) => setStrokeWidth(Number(e.target.value) || 0)} 
                          className="prop-num-input" 
                        />
                      </div>
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">Type</span>
                        <select 
                          value={strokeType} 
                          onChange={(e) => setStrokeType(e.target.value)}
                          className="prop-select-transparent"
                        >
                          <option>Inside</option>
                          <option>Center</option>
                          <option>Outside</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Effects */}
                  <div className="prop-section">
                    <div className="prop-section-header">
                      <span className="prop-section-title">Effects</span>
                      <button 
                        type="button"
                        className="prop-header-icon-btn"
                        onClick={() => {
                          setBlurVisible(true);
                          setShadowVisible(true);
                          setBlurAmount(40);
                        }}
                        title="Reset effects"
                      >
                        <span className="material-symbols-outlined text-[14px]">refresh</span>
                      </button>
                    </div>
                    <div className="prop-effect-item">
                      <span className="material-symbols-outlined text-[13px] text-[#ffb5a1]">blur_on</span>
                      <span className="effect-name">Background Blur</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="100" 
                        value={blurAmount} 
                        onChange={(e) => setBlurAmount(Number(e.target.value) || 0)} 
                        className="effect-val-input" 
                      />
                      <span className="prop-unit-suffix">px</span>
                      <button 
                        type="button"
                        className="prop-eye-toggle-btn ml-auto"
                        onClick={() => setBlurVisible(!blurVisible)}
                        title={blurVisible ? "Hide Blur" : "Show Blur"}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {blurVisible ? 'visibility' : 'visibility_off'}
                        </span>
                      </button>
                    </div>
                    <div className="prop-effect-item mt-1">
                      <span className="material-symbols-outlined text-[13px] text-[#ffb5a1]">shadow</span>
                      <span className="effect-name">Drop Shadow</span>
                      <span className="effect-val">0 30px 100px</span>
                      <button 
                        type="button"
                        className="prop-eye-toggle-btn ml-auto"
                        onClick={() => setShadowVisible(!shadowVisible)}
                        title={shadowVisible ? "Hide Shadow" : "Show Shadow"}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {shadowVisible ? 'visibility' : 'visibility_off'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Export */}
                  <div className="prop-section">
                    <div className="prop-section-header">
                      <span className="prop-section-title">Export</span>
                      <div className="prop-export-presets">
                        {['PNG', 'SVG', 'PDF'].map(fmt => (
                          <button
                            key={fmt}
                            type="button"
                            className={`prop-fmt-pill ${exportFormat === fmt ? 'active' : ''}`}
                            onClick={() => setExportFormat(fmt)}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="prop-export-action-btn"
                      onClick={handleExportFrame}
                    >
                      <span className="material-symbols-outlined text-[16px]">file_download</span>
                      <span>Export Varun_Sehgal_Portfolio ({exportFormat})</span>
                    </button>
                  </div>
                </>
              )}

              {propertiesTab === 'prototype' && (
                <>
                  <div className="prop-section">
                    <div className="prop-section-title">Prototype Flow</div>
                    <div className="prop-prototype-card">
                      <div className="flow-badge-row">
                        <span className="material-symbols-outlined text-[15px] text-[#ffb5a1]">play_circle</span>
                        <span className="font-semibold text-white text-[12px]">{activeFlow}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1">
                        Starting point: Varun Sehgal Portfolio ({activeTab.toUpperCase()})
                      </p>
                    </div>
                  </div>

                  <div className="prop-section">
                    <div className="prop-section-title">Device</div>
                    <div className="prop-device-box">
                      <span className="material-symbols-outlined text-[18px] text-zinc-400">laptop_mac</span>
                      <div className="flex-1">
                        <select 
                          value={selectedDevice} 
                          onChange={(e) => {
                            setSelectedDevice(e.target.value);
                            showToast(`Device switched to ${e.target.value}`);
                          }}
                          className="prop-device-select"
                        >
                          <option>MacBook Pro 16"</option>
                          <option>iPhone 15 Pro</option>
                          <option>iPad Pro 12.9"</option>
                          <option>Desktop 1440px</option>
                        </select>
                        <div className="text-[10px] text-zinc-500 mt-0.5">Scaled to fit viewport</div>
                      </div>
                    </div>
                  </div>

                  <div className="prop-section">
                    <div className="prop-section-title">Interactive Triggers</div>
                    <div 
                      className="prop-interaction-item clickable"
                      onClick={() => {
                        setActiveTab('projects');
                        showToast('Navigated to Work');
                      }}
                      title="Click to trigger flow"
                    >
                      <span className="interaction-trigger">On Click</span>
                      <span className="interaction-arrow">→</span>
                      <span className="interaction-target">Navigate to Work</span>
                    </div>
                    <div 
                      className="prop-interaction-item clickable"
                      onClick={() => {
                        setActiveTab('experience');
                        showToast('Navigated to Experience');
                      }}
                      title="Click to trigger flow"
                    >
                      <span className="interaction-trigger">On Click</span>
                      <span className="interaction-arrow">→</span>
                      <span className="interaction-target">Navigate to Experience</span>
                    </div>
                    <div 
                      className="prop-interaction-item clickable"
                      onClick={() => {
                        setActiveTab('about');
                        showToast('Navigated to About');
                      }}
                      title="Click to trigger flow"
                    >
                      <span className="interaction-trigger">On Click</span>
                      <span className="interaction-arrow">→</span>
                      <span className="interaction-target">Navigate to About</span>
                    </div>
                    <div 
                      className="prop-interaction-item clickable"
                      onClick={() => {
                        setPreviewAnimation(true);
                        setTimeout(() => setPreviewAnimation(false), 600);
                        showToast('Smart Animate triggered (300ms)');
                      }}
                      title="Test animation"
                    >
                      <span className="interaction-trigger">On Hover</span>
                      <span className="interaction-arrow">→</span>
                      <span className="interaction-target">
                        Smart Animate {previewAnimation ? '⚡ Playing...' : '(300ms)'}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {propertiesTab === 'inspect' && (
                <>
                  <div className="prop-section">
                    <div className="prop-section-header">
                      <span className="prop-section-title">Code Inspection</span>
                      <div className="inspect-mode-switch">
                        <button
                          type="button"
                          className={`inspect-switch-btn ${inspectMode === 'css' ? 'active' : ''}`}
                          onClick={() => setInspectMode('css')}
                        >
                          CSS
                        </button>
                        <button
                          type="button"
                          className={`inspect-switch-btn ${inspectMode === 'tailwind' ? 'active' : ''}`}
                          onClick={() => setInspectMode('tailwind')}
                        >
                          Tailwind
                        </button>
                      </div>
                    </div>

                    <div className="inspect-code-block">
                      <pre>
                        {inspectMode === 'css' ? (
                          `/* Varun_Sehgal_Portfolio Frame */
width: 100%;
max-width: ${frameW}px;
min-height: ${frameH}px;
background: ${fillVisible ? fillColor : 'transparent'};
border: ${strokeVisible ? `${strokeWidth}px solid ${strokeColor}` : 'none'};
border-radius: ${frameRadius}px;
padding: ${padY}px ${padX}px;
gap: ${autoLayoutGap}px;
backdrop-filter: ${blurVisible ? `blur(${blurAmount}px)` : 'none'};
box-shadow: ${shadowVisible ? '0 30px 100px -20px rgba(0, 0, 0, 0.9)' : 'none'};`
                        ) : (
`<div className="w-full max-w-[${frameW}px] min-h-[${frameH}px]
  ${fillVisible ? `bg-[${fillColor}]` : 'bg-transparent'}
  ${strokeVisible ? `border border-[${strokeColor}]` : ''}
  rounded-[${frameRadius}px]
  p-[${padY}px_${padX}px] gap-[${autoLayoutGap}px]
  ${blurVisible ? `backdrop-blur-[${blurAmount}px]` : ''}
  ${shadowVisible ? 'shadow-2xl' : ''}">`
                        )}
                      </pre>
                    </div>

                    <button
                      type="button"
                      className="prop-copy-code-btn"
                      onClick={handleCopyInspectCode}
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        {codeCopied ? 'check' : 'content_copy'}
                      </span>
                      <span>{codeCopied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* =========================================================================
          3. WorkspaceNav (Floating Bottom Nav Bar from backup/lovable-portfolio)
          ========================================================================= */}
      <nav className="lovable-workspace-bottom-nav">
        <div className="nav-primary-group">
          <button
            className={`bottom-nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span>Home</span>
          </button>

          <button
            className={`bottom-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            <span>Work</span>
          </button>

          <button
            className={`bottom-nav-item ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <span className="material-symbols-outlined text-[18px]">work</span>
            <span>Experience</span>
          </button>

          <button
            className={`bottom-nav-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
            <span>About</span>
          </button>

          <button
            className={`bottom-nav-item ${activeTab === 'resume' ? 'active' : ''}`}
            onClick={() => setActiveTab('resume')}
          >
            <span className="material-symbols-outlined text-[18px]">description</span>
            <span>Resume</span>
          </button>
        </div>

        <div className="nav-divider-stem"></div>

        <div className="nav-secondary-group">
          <button
            className={`bottom-nav-item secondary ${activeTab === 'process' ? 'active' : ''}`}
            onClick={() => setActiveTab('process')}
          >
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            <span>Process</span>
          </button>

          <button
            className={`bottom-nav-item secondary ${activeTab === 'plugins' ? 'active' : ''}`}
            onClick={() => setActiveTab('plugins')}
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
