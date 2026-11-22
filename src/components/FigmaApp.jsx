import { useState, useRef, useEffect } from 'react';
import FirebaseImage from './FirebaseImage';
import FigmaLoadingScreen from './FigmaLoadingScreen';
import KittuResumeApp from './KittuResumeApp';
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
    id: 'varunos',
    name: 'VarunOS — Web Desktop Operating System',
    category: 'Vibecoded Site',
    badge: '⚡ 100% Vibecoded Web OS',
    metric: '⚡ Living Web OS • 60 FPS • Multi-App',
    image: '/wallpaper-sequoia.jpg',
    desc: 'Full macOS-inspired desktop operating system vibecoded from scratch with Antigravity AI. Features live VS Code runner, Figma vector workspace, Clippy assistant, and window manager.',
    tags: ['Vibecoded', 'React 19', 'Tailwind', 'Antigravity IDE', 'Web OS'],
    link: 'https://varunsehgal.runs-on.dev',
    liveUrl: 'https://varunsehgal.runs-on.dev',
    figmaLink: 'https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2',
    isVibecoded: true
  },
  {
    id: 'codesrijan',
    name: 'CodeSrijan Hackathon Portal',
    category: 'Vibecoded Site',
    badge: '⚡ Vibecoded Live Site',
    metric: '⚡ Vibecoded Live Site • 800+ Attendees',
    image: '/figma_CodeSrijan.png',
    desc: 'National hackathon portal vibecoded & engineered by Varun Sehgal for Jaypee University. Features registration, team matching, and live rubrics.',
    tags: ['Vibecoded', 'Next.js', 'Vercel Live', 'Hackathon'],
    link: 'http://codesrijan-nine.vercel.app/',
    liveUrl: 'http://codesrijan-nine.vercel.app/',
    figmaLink: 'https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2&t=vfPIBYY278lzphVq-1',
    isVibecoded: true
  },
  {
    id: 'eventflow',
    name: 'EventFlow Experience Platform',
    category: 'Figma Design',
    badge: '❖ Figma Design System',
    metric: '4-Step Checkout • 30% Less Dropoff',
    image: '/figma_EventFlow.png',
    desc: 'Campus event ticketing & management platform streamlining booking workflows with 30% reduced drop-off.',
    tags: ['SaaS', 'Figma', 'Event Platform'],
    link: 'https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2&p=f&t=ucsh4jF84sBl50UA-0',
    isFigmaLink: true
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
  },
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
  }
];

const TIMELINE = [
  {
    role: 'UI-UX Designer',
    company: 'UniEvent · Internship',
    period: 'Jul 2026 — Nov 2026 • 5 Mos',
    location: 'Punjab, India (Remote)',
    link: 'https://www.linkedin.com/in/varunsehgal02',
    desc: 'Designed campus event ticketing platform (EventFlow). Slashed transaction drop-off by 30% across 4-step booking workflow across 50+ components.'
  },
  {
    role: 'Assistant Head of CODM Esports Operations',
    company: 'Assemble · Part-time',
    period: 'Aug 2025 — Jan 2026 • 6 Mos',
    location: 'Bharatpur, Rajasthan, India (Remote)',
    link: 'https://www.linkedin.com/in/varunsehgal02',
    desc: 'Assisted in the planning and smooth execution of CODM tournaments and esports events. Designed collaborative creator workspace tools and interaction prototypes in Figma.'
  },
  {
    role: 'Operation internship',
    company: 'Knaptix Ventures Private Limited · Internship',
    period: 'Jun 2025 — Aug 2025 • 3 Mos',
    location: 'Pune District, Maharashtra, India (Remote)',
    link: 'https://www.linkedin.com/in/varunsehgal02',
    desc: 'Operations internship and UI/UX design. Delivered brand identities and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.'
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
    date: 'Apr 2024',
    credentialId: 'team-pixel-codes-2024',
    link: 'https://www.linkedin.com/posts/pushkar-chaturvedi-a83778284_hackathon2025-codeconquerors-aiineducation-activity-7335535096017375236-DBk_',
    desc: 'Led frontend engineering and design for Team Pixel_Codes in a 12-hour offline hackathon (150+ devs), delivering an AI quiz generator with Ollama local LLM APIs.'
  },
  {
    id: 'codesrijan',
    title: 'CodeSrijan Hackathon Lead Designer & Co-Organizer',
    issuer: 'JUET',
    date: 'Apr 2024',
    credentialId: 'codesrijan-lead-2024',
    link: 'https://lnkd.in/p/dUXQYx92',
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
    date: 'Apr 2024',
    award: '⚡ Organizing Lead & Identity Designer',
    link: 'https://lnkd.in/p/dUXQYx92',
    desc: 'Directed visual identity, participant portals, and 72-hour live evaluation leaderboard system for 200+ hackathon participants. Boosted event registrations by 20% YoY.'
  },
  {
    id: 'code-conquerors-runnerup',
    title: 'Code Conquerors Hackathon (2nd Runner-up)',
    issuer: 'JUET ACM & CSI',
    date: 'Apr 2024',
    award: '🥈 2nd Runner-up (Team Pixel_Codes)',
    link: 'https://www.linkedin.com/posts/pushkar-chaturvedi-a83778284_hackathon2025-codeconquerors-aiineducation-activity-7335535096017375236-DBk_',
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
    date: 'Jul 2026 — Nov 2026 • 5 Mos',
    icon: 'edit',
    highlight: 'UniEvent (Internship)',
    titleRest: 'completed UI-UX Designer Internship (EventFlow)',
    desc: 'Designed campus event ticketing platform (EventFlow). Slashed transaction drop-off by 30% across 4-step booking workflow across 50+ components.',
    quote: 'Spearheaded end-to-end design system with 50+ tokens, responsive checkout patterns, and real-time seat reservation micro-interactions.',
    location: 'Punjab, India (Remote)',
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
    date: 'Aug 2025 — Jan 2026 • 6 Mos',
    icon: 'terminal',
    highlight: 'Assemble (Part-time)',
    titleRest: 'appointed Assistant Head of CODM Esports Operations',
    desc: 'Assisted in the planning and smooth execution of CODM tournaments and esports events. Designed collaborative creator workspace tools and interaction prototypes in Figma.',
    location: 'Bharatpur, Rajasthan, India (Remote)',
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
    date: 'Apr 2024',
    icon: 'groups',
    highlight: 'CodeSrijan Hackathon',
    titleRest: 'directed by Varun as Lead Designer & Co-Organizer',
    desc: 'Directed visual identity, participant portals, and 72-hour live evaluation leaderboard system for 200+ hackathon participants. Boosted registrations by 20% YoY.',
    award: '⚡ Organizing Lead & Identity Designer',
    credentialId: 'codesrijan-lead-2024',
    link: 'https://lnkd.in/p/dUXQYx92',
    actionLabel: 'View on LinkedIn'
  },
  {
    id: 'act-code-conquerors',
    type: 'hackathons',
    category: 'Hackathon Award',
    date: 'Apr 2024',
    icon: 'military_tech',
    highlight: 'Code Conquerors',
    titleRest: 'awarded 2nd Runner-up (JUET ACM & CSI)',
    desc: 'Led frontend engineering and design for Team Pixel_Codes in a 12-hour offline hackathon (150+ devs), delivering an AI quiz generator with Next.js and Ollama local LLM APIs.',
    award: '🥈 2nd Runner-up (Team Pixel_Codes)',
    credentialId: 'team-pixel-codes-2024',
    link: 'https://www.linkedin.com/posts/pushkar-chaturvedi-a83778284_hackathon2025-codeconquerors-aiineducation-activity-7335535096017375236-DBk_',
    actionLabel: 'View on LinkedIn'
  },
  {
    id: 'act-knaptix',
    type: 'experience',
    category: 'Internship',
    date: 'Jun 2025 — Aug 2025 • 3 Mos',
    icon: 'layers',
    highlight: 'Knaptix Ventures Private Limited',
    titleRest: 'engaged Varun as Operation internship',
    desc: 'Operations support, brand identities, and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.',
    location: 'Pune District, Maharashtra, India (Remote)',
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

const COMMUNITY_PLUGINS = [
  {
    id: 'magician',
    name: 'Figma Magician (AI)',
    author: 'Diagram / Figma',
    category: 'AI & Automation',
    desc: 'Generate custom vector icons, UI micro-copy, and magic palette shifts directly inside the canvas powered by multimodal AI.',
    installs: '145k',
    rating: '4.9',
    badge: 'AI Powered',
    bannerGradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    icon: 'auto_awesome',
    link: 'https://www.figma.com/community/plugin/1151890004522028995',
    tags: ['AI Copy', 'Vector Icons', 'Generative']
  },
  {
    id: 'autoflow',
    name: 'Autoflow',
    author: 'Yousef El-Dardiry',
    category: 'Diagramming',
    desc: 'Automate user flows and smart bezier connector lines between artboards with 1 click. Zero manual path drawing.',
    installs: '320k',
    rating: '4.9',
    badge: 'Essential',
    bannerGradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    icon: 'alt_route',
    link: 'https://www.figma.com/community/plugin/733902567457592893',
    tags: ['User Flows', 'Connectors', 'Information Architecture']
  },
  {
    id: 'stark',
    name: 'Stark Accessibility Suite',
    author: 'Stark Lab',
    category: 'Accessibility',
    desc: 'Contrast checker, color blindness simulator, and WCAG AA / AAA compliance audit suite right in your workflow.',
    installs: '210k',
    rating: '5.0',
    badge: 'WCAG AA / AAA',
    bannerGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    icon: 'visibility',
    link: 'https://www.figma.com/community/plugin/732603254453395948',
    tags: ['Contrast', 'Color Blindness', 'Compliance']
  },
  {
    id: 'contentreel',
    name: 'Content Reel',
    author: 'Microsoft Design',
    category: 'Content',
    desc: 'Pull real names, text avatars, address tokens, and dummy financial data into components instantly.',
    installs: '490k',
    rating: '4.8',
    badge: 'Data Generator',
    bannerGradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    icon: 'dataset',
    link: 'https://www.figma.com/community/plugin/731627003475729986',
    tags: ['Personas', 'Text Data', 'Avatars']
  },
  {
    id: 'iconify',
    name: 'Iconify',
    author: 'Vjacheslav Trushkin',
    category: 'Assets & Icons',
    desc: 'Access 100,000+ vector icons (Lucide, Material, Phosphor, Carbon) directly inside the canvas without external SVG drag-and-drop.',
    installs: '850k',
    rating: '5.0',
    badge: '100k+ Vectors',
    bannerGradient: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
    icon: 'interests',
    link: 'https://www.figma.com/community/plugin/735098326275342410',
    tags: ['Lucide', 'Material', 'SVG Icons']
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    author: 'Unsplash Team',
    category: 'Media',
    desc: 'Insert royalty-free, high-resolution photography directly into shapes, cards, and avatar frames with instant keyword filtering.',
    installs: '1.2M',
    rating: '4.9',
    badge: 'High-Res Media',
    bannerGradient: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
    icon: 'image',
    link: 'https://www.figma.com/community/plugin/738454987945972471',
    tags: ['Photography', 'Placeholders', 'Avatars']
  },
  {
    id: 'similayer',
    name: 'Similayer',
    author: 'Dave Williames',
    category: 'Productivity',
    desc: 'Select layers with similar fill, stroke, text style, or auto-layout settings across complex nested frames.',
    installs: '180k',
    rating: '4.8',
    badge: 'Power Tool',
    bannerGradient: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
    icon: 'filter_none',
    link: 'https://www.figma.com/community/plugin/736952773253018895',
    tags: ['Batch Selection', 'Token Matching', 'Styles']
  },
  {
    id: 'automator',
    name: 'Automator',
    author: 'Diagram',
    category: 'Automation',
    desc: 'Build and run one-click custom automations for component re-indexing, token updates, and export pipelines.',
    installs: '130k',
    rating: '4.9',
    badge: 'Batch Workflows',
    bannerGradient: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
    icon: 'smart_toy',
    link: 'https://www.figma.com/community/plugin/876024456526148978',
    tags: ['Batch Rename', 'Token Sync', 'Scripts']
  }
];

const PAGE_LAYERS_MAP = {
  home: [
    { id: 'h-root', title: 'Varun_Sehgal_Portfolio (Frame)', type: 'frame', indent: 0, visible: true, locked: false },
    { id: 'h-hero', title: 'Hero_Section_Grid', type: 'frame', indent: 1, visible: true, locked: false },
    { id: 'h-badge', title: 'Author_Pill · Product Designer', type: 'component', indent: 2, visible: true, locked: true },
    { id: 'h-title', title: 'Headline: I design digital products...', type: 'text', indent: 2, visible: true, locked: false },
    { id: 'h-tag', title: 'Tagline: UI/UX · SaaS · Design Systems', type: 'text', indent: 2, visible: true, locked: false },
    { id: 'h-cta', title: 'CTA_Group: See My Work / About', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'h-now', title: 'Now_Panel (Live Availability)', type: 'frame', indent: 1, visible: true, locked: false },
    { id: 'h-bento', title: 'Featured_Bento_Grid (4 Projects)', type: 'frame', indent: 1, visible: true, locked: false },
    { id: 'h-notes', title: 'Sticky_Notes_Canvas_Layer', type: 'group', indent: 0, visible: true, locked: false }
  ],
  projects: [
    { id: 'w-root', title: 'Work_Case_Studies (Stage)', type: 'frame', indent: 0, visible: true, locked: false },
    { id: 'w-search', title: 'Search_Input & Category_Filters', type: 'component', indent: 1, visible: true, locked: false },
    { id: 'w-grid', title: 'Bento_Projects_Grid (7 Case Studies)', type: 'group', indent: 1, visible: true, locked: false },
    { id: 'w-p1', title: 'AI Interview Prep System (SaaS)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'w-p2', title: 'Movie Ticket Booking App (Mobile)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'w-p3', title: 'Expensify Budget Tracker (FinTech)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'w-p4', title: 'CodeSrijan Hackathon Portal', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'w-p5', title: 'EventFlow Experience Platform', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'w-p6', title: 'Conversion Landing Page', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'w-p7', title: 'Enterprise SaaS Dashboard', type: 'component', indent: 2, visible: true, locked: false }
  ],
  experience: [
    { id: 'e-root', title: 'Recent_Activity_Canvas (Frame)', type: 'frame', indent: 0, visible: true, locked: false },
    { id: 'e-header', title: 'Activity_Header & Filter_Pills', type: 'component', indent: 1, visible: true, locked: false },
    { id: 'e-spine', title: 'Center_Vertical_Spine (Path)', type: 'vector', indent: 1, visible: true, locked: true },
    { id: 'e-m1', title: 'Milestone: UniEvent (UI-UX Designer - Nov 2026)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'e-m2', title: 'Milestone: HAckeThor Winner (🏆 1st)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'e-m3', title: 'Milestone: Assemble (CODM Esports Operations)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'e-m4', title: 'Milestone: Udemy Masterclass Credential', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'e-m5', title: 'Milestone: CodeSrijan (Organizing Lead)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'e-m6', title: 'Milestone: Code Conquerors (🥈 2nd)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'e-m7', title: 'Milestone: Knaptix Ventures (Operation Intern)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'e-m8', title: 'Milestone: Freelance (10+ Startups)', type: 'component', indent: 2, visible: true, locked: false }
  ],
  about: [
    { id: 'a-root', title: 'About_Whiteboard (FigJam Canvas)', type: 'frame', indent: 0, visible: true, locked: false },
    { id: 'a-sec1', title: 'Phase 01: Ideation (Brainstorming Stickies)', type: 'group', indent: 1, visible: true, locked: false },
    { id: 'a-stk-blue', title: 'Sticky: Idea (How might we...)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'a-stk-orange', title: 'Sticky: Aesthetic (Dark Mode)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'a-stk-purple', title: 'Sticky: Typography (Crisp Monospace)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'a-svg1', title: 'Dashed_Bezier_Connector_1', type: 'vector', indent: 1, visible: true, locked: true },
    { id: 'a-sec2', title: 'Phase 02: Architecture & Systems Flow', type: 'component', indent: 1, visible: true, locked: false },
    { id: 'a-svg2', title: 'Dashed_Bezier_Connector_2', type: 'vector', indent: 1, visible: true, locked: true },
    { id: 'a-sec3', title: 'Phase 03: Execution & AI Velocity', type: 'group', indent: 1, visible: true, locked: false },
    { id: 'a-svg3', title: 'Dashed_Bezier_Connector_3', type: 'vector', indent: 1, visible: true, locked: true },
    { id: 'a-sec4', title: 'Phase 04: Availability & CTA Action Bar', type: 'component', indent: 1, visible: true, locked: false }
  ],
  resume: [
    { id: 'r-root', title: 'Varun_Sehgal_Resume.pdf (Document)', type: 'frame', indent: 0, visible: true, locked: false },
    { id: 'r-left', title: 'Sidebar: Contact, Education & Skills', type: 'frame', indent: 1, visible: true, locked: false },
    { id: 'r-main', title: 'Main: Header & Professional Summary', type: 'frame', indent: 1, visible: true, locked: false },
    { id: 'r-exp', title: 'Section: Work Experience (4 Roles)', type: 'group', indent: 2, visible: true, locked: false },
    { id: 'r-proj', title: 'Section: Design Projects (3 Apps)', type: 'group', indent: 2, visible: true, locked: false },
    { id: 'r-hack', title: 'Section: Hackathons & Leadership', type: 'group', indent: 2, visible: true, locked: false }
  ],
  process: [
    { id: 'p-root', title: 'Process_Methodology (FigJam Canvas)', type: 'frame', indent: 0, visible: true, locked: false },
    { id: 'p-sec1', title: 'Problem Discovery (Tilted Cards)', type: 'group', indent: 1, visible: true, locked: false },
    { id: 'p-svg1', title: 'Cyan_Dashed_Bezier_Connector_1', type: 'vector', indent: 1, visible: true, locked: true },
    { id: 'p-sec2', title: 'User Flow (Flowchart Frame)', type: 'component', indent: 1, visible: true, locked: false },
    { id: 'p-sec3', title: 'Design System & Tokens (Primitives)', type: 'group', indent: 1, visible: true, locked: false },
    { id: 'p-svg2', title: 'Purple_Dashed_Bezier_Connector_2', type: 'vector', indent: 1, visible: true, locked: true },
    { id: 'p-sec4', title: 'Validation & Prototype Impact (Metrics)', type: 'component', indent: 1, visible: true, locked: false }
  ],
  plugins: [
    { id: 'pl-root', title: 'Figma_Community_Plugins (Gallery)', type: 'frame', indent: 0, visible: true, locked: false },
    { id: 'pl-search', title: 'Search_Input & Category_Filters', type: 'component', indent: 1, visible: true, locked: false },
    { id: 'pl-banner', title: 'Creative_Hero_Banner', type: 'frame', indent: 1, visible: true, locked: false },
    { id: 'pl-grid', title: 'Plugins_Creative_Grid (8 Plugins)', type: 'group', indent: 1, visible: true, locked: false },
    { id: 'pl-sim', title: 'Plugin_Simulator_Modal (Interactive)', type: 'component', indent: 1, visible: true, locked: false }
  ]
};

const FigmaApp = ({ isInteracting, userName, onOpenApp }) => {
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const t = p.get('tab');
      if (t && ['home', 'projects', 'experience', 'about', 'resume', 'process', 'plugins'].includes(t)) return t;
    } catch {}
    return 'home';
  }); // 'home' | 'projects' | 'experience' | 'about' | 'resume' | 'process' | 'plugins'
  const [showAssets, setShowAssets] = useState(false);
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [copiedToast, setCopiedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Link copied to clipboard!');

  // Canvas pan & zoom state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showZoomMenu, setShowZoomMenu] = useState(false);
  const zoomMenuRef = useRef(null);
  const [isPanning, setIsPanning] = useState(false);
  const [isWireframeMode, setIsWireframeMode] = useState(false);
  const [activeTool, setActiveTool] = useState('select'); // 'select' | 'hand'
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const startPanRef = useRef({ x: 0, y: 0 });

  // Safety watchdog: ensure Figma loading screen NEVER hangs under any circumstance
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1600);
    return () => clearTimeout(safetyTimer);
  }, []);

  // FigJam Process Board state (Creative Whiteboard)
  const [sprintTime, setSprintTime] = useState(8 * 60 + 45);
  const [isSprintTimerRunning, setIsSprintTimerRunning] = useState(true);
  const [isLofiPlaying, setIsLofiPlaying] = useState(true);
  const [processAudioPlaying, setProcessAudioPlaying] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [figjamTool, setFigjamTool] = useState('select');
  const [painPointReactions, setPainPointReactions] = useState(12);
  const [isPlayingTape, setIsPlayingTape] = useState(false);
  const [isPlayingAudioNote, setIsPlayingAudioNote] = useState(false);
  const [processToolbarTool, setProcessToolbarTool] = useState('select');
  const [pluginFilter, setPluginFilter] = useState('all');
  const [tokenChroma, setTokenChroma] = useState(0.85);
  const [tokenRadius, setTokenRadius] = useState(0.75);
  const [isShaderProceduralOpen, setIsShaderProceduralOpen] = useState(false);
  const [isHotReloading, setIsHotReloading] = useState(false);

  // About Constellation state (Creative Constellation)
  const [kineticTension, setKineticTension] = useState(94);
  const [isAudioDispatchPlaying, setIsAudioDispatchPlaying] = useState(false);
  const [audioDispatchSec, setAudioDispatchSec] = useState(14);

  // Plugin Studio state (Creative Studio Lab)
  const [pluginHue, setPluginHue] = useState(28);
  const [pluginLuma, setPluginLuma] = useState(78);
  const [pluginRadiusVal, setPluginRadiusVal] = useState(16);
  const [pluginFilterTab, setPluginFilterTab] = useState('all');
  const [isSyncingCanvas, setIsSyncingCanvas] = useState(false);
  const [latencyStat, setLatencyStat] = useState('0.38 ms');
  const [consoleCmdInput, setConsoleCmdInput] = useState('');
  const [copyAstFeedback, setCopyAstFeedback] = useState('Copy JSON');
  const [consoleLogs, setConsoleLogs] = useState([
    { id: 1, text: '[16:42:01.002] <ws::client> Handshake verified: wss://figma-ipc.local:8080/session-vs', type: 'text-outline' },
    { id: 2, text: '[16:42:01.018] <wasm> Initialized spectral-ast-engine v2.5.0 (SIMD enabled)', type: 'text-tertiary' },
    { id: 3, text: '[16:42:01.240] [bridge] Document loaded: "Varun_Sehgal_Portfolio.fig" (4,119 nodes)', type: 'text-on-surface-variant' },
    { id: 4, text: '[16:42:02.890] [token-sync] OKLCH color matrix dynamically compiled: 14 variable sets', type: 'text-secondary' },
    { id: 5, text: '[16:42:03.110] [rpc] Heartbeat acknowledgement received (RTT: 0.42ms)', type: 'text-outline' }
  ]);

  // Sprint countdown timer
  useEffect(() => {
    if (!isSprintTimerRunning) return;
    const interval = setInterval(() => {
      setSprintTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSprintTimerRunning]);

  // About audio waveform player timer
  useEffect(() => {
    if (!isAudioDispatchPlaying) return;
    const interval = setInterval(() => {
      setAudioDispatchSec(prev => (prev < 42 ? prev + 1 : 14));
    }, 250);
    return () => clearInterval(interval);
  }, [isAudioDispatchPlaying]);

  const handleTriggerStamp = (emoji, e) => {
    const id = Date.now() + Math.random();
    const x = e?.clientX || (typeof window !== 'undefined' ? window.innerWidth / 2 : 600);
    const y = e?.clientY || (typeof window !== 'undefined' ? window.innerHeight / 2 : 400);
    setFloatingEmojis(prev => [...prev, { id, emoji, x, y }]);
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(item => item.id !== id));
    }, 700);
  };

  const handleExecuteConsoleCmd = (e) => {
    e?.preventDefault?.();
    const cmd = consoleCmdInput.trim();
    if (!cmd) return;
    const now = new Date();
    const timeStr = `[${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}]`;
    const userLog = { id: Date.now(), text: `${timeStr} > ${cmd}`, type: 'text-on-surface' };
    setConsoleLogs(prev => [...prev, userLog]);
    setConsoleCmdInput('');

    setTimeout(() => {
      let resp = '<eval> Command executed successfully. Return: OK';
      let rType = 'text-secondary';
      if (cmd.includes('selection')) {
        resp = '<eval> [FrameNode "AppContainer", VectorNode "TokenSwatchPreview"]';
        rType = 'text-tertiary';
      } else if (cmd.includes('root') || cmd.includes('version')) {
        resp = '<eval> Figma API Version: 1.0.0 (API v24)';
        rType = 'text-tertiary';
      }
      setConsoleLogs(prev => [...prev, { id: Date.now() + 1, text: `${timeStr} ${resp}`, type: rType }]);
    }, 200);
  };

  const handleZoomIn = () => {
    setZoom(z => {
      const next = Math.min(2.5, Number((z + 0.1).toFixed(2)));
      showToast(`Zoom: ${Math.round(next * 100)}%`);
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoom(z => {
      const next = Math.max(0.4, Number((z - 0.1).toFixed(2)));
      showToast(`Zoom: ${Math.round(next * 100)}%`);
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    centerCanvasView(activeTab);
    showToast('Zoom: 100% (Centered)');
  };

  // Close Zoom Menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (zoomMenuRef.current && !zoomMenuRef.current.contains(e.target)) {
        setShowZoomMenu(false);
      }
    };
    if (showZoomMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showZoomMenu]);

  // Dynamic Selected Node & Live Editable Properties
  const [selectedNodeId, setSelectedNodeId] = useState('root-canvas');
  const [selectedNodeLabel, setSelectedNodeLabel] = useState('Varun_Sehgal_Portfolio');
  const [selectedNodeType, setSelectedNodeType] = useState('Frame');
  const [nodeProps, setNodeProps] = useState({
    'root-canvas': { x: 0, y: 0, w: 1200, h: 850, radius: 16, fill: '#1e1e1e', fillOpacity: 100, stroke: '#383838', strokeWidth: 1, opacity: 100 },
    'work-artboard': { x: 0, y: 0, w: 1340, h: 960, radius: 16, fill: '#1e1e1e', stroke: '#383838', strokeWidth: 1, opacity: 100 },
    'exp-artboard': { x: 0, y: 0, w: 1200, h: 800, radius: 16, fill: '#1e1e1e', stroke: '#383838', strokeWidth: 1, opacity: 100 },
    'about-artboard': { x: 0, y: 0, w: 1280, h: 920, radius: 16, fill: '#1e1e1e', stroke: '#383838', strokeWidth: 1, opacity: 100 },
    'resume-artboard': { x: 0, y: 0, w: 1080, h: 2600, radius: 16, fill: 'transparent', stroke: 'transparent', strokeWidth: 0, opacity: 100 },
    'process-artboard': { x: 0, y: 0, w: 1400, h: 960, radius: 16, fill: '#141416', stroke: 'rgba(255, 255, 255, 0.12)', strokeWidth: 1, opacity: 100 },
    'plugins-artboard': { x: 0, y: 0, w: 1440, h: 1100, radius: 16, fill: '#141416', stroke: 'rgba(255, 255, 255, 0.12)', strokeWidth: 1, opacity: 100 },
    'work-codesrijan': { x: 0, y: 0, w: 360, h: 440, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'work-eventflow': { x: 0, y: 0, w: 360, h: 440, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'work-landing': { x: 0, y: 0, w: 360, h: 440, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'work-saas': { x: 0, y: 0, w: 360, h: 440, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'exp-imagine': { x: 0, y: 0, w: 420, h: 220, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'exp-knaptix': { x: 0, y: 0, w: 420, h: 220, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'exp-udemy': { x: 0, y: 0, w: 420, h: 220, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'exp-infosys': { x: 0, y: 0, w: 420, h: 220, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'about-avatar': { x: 0, y: 0, w: 220, h: 220, radius: 110, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 2, opacity: 100 },
    'about-strengths': { x: 0, y: 0, w: 360, h: 260, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'about-weaknesses': { x: 0, y: 0, w: 360, h: 260, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'about-philosophy': { x: 0, y: 0, w: 360, h: 260, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'about-toolkit': { x: 0, y: 0, w: 360, h: 260, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'about-education': { x: 0, y: 0, w: 360, h: 240, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'process-p1': { x: 0, y: 0, w: 380, h: 560, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'process-p2': { x: 0, y: 0, w: 380, h: 560, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'process-p3': { x: 0, y: 0, w: 380, h: 560, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'process-p4': { x: 0, y: 0, w: 380, h: 560, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'process-p5': { x: 0, y: 0, w: 380, h: 560, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'process-p6': { x: 0, y: 0, w: 380, h: 560, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 }
  });

  // Floating sticky notes
  const [floatingShapes, setFloatingShapes] = useState(INITIAL_SHAPES);
  const [draggingNoteId, setDraggingNoteId] = useState(null);

  // Projects filter state
  const [projectFilter, setProjectFilter] = useState('All');
  const [projectSearch, setProjectSearch] = useState('');

  // Dynamic Left Sidebar State (Pages, Layers, Assets)
  const [sidebarTab, setSidebarTab] = useState('layers'); // 'layers' | 'pages' | 'assets'
  const [selectedLayerId, setSelectedLayerId] = useState(null);
  const [layerVisibilityMap, setLayerVisibilityMap] = useState({});
  const [layerLockMap, setLayerLockMap] = useState({});

  // Creative Plugins & Simulator State
  const [activeSimulatorPlugin, setActiveSimulatorPlugin] = useState(null);
  const [pluginSearch, setPluginSearch] = useState('');
  const [pluginCategory, setPluginCategory] = useState('All');
  const [simulatorStep, setSimulatorStep] = useState(0);

  // About & Process Canvas View states
  const [aboutVariant, setAboutVariant] = useState('Product Designer');
  const [aboutViewMode, setAboutViewMode] = useState('canvas'); // 'canvas' | 'specs'
  const [processViewMode, setProcessViewMode] = useState('canvas'); // 'canvas' | 'grid'

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

  // Automatically select the active artboard when switching tabs so inspector always targets current view
  useEffect(() => {
    const tabArtboardMap = {
      home: { id: 'root-canvas', name: 'Varun_Sehgal_Portfolio (Home)', type: 'Frame' },
      projects: { id: 'work-artboard', name: 'Work & Case Studies Artboard', type: 'Frame' },
      experience: { id: 'exp-artboard', name: 'Experience & Timeline Artboard', type: 'Frame' },
      about: { id: 'about-artboard', name: 'Bio & Blueprint Artboard', type: 'Frame' },
      resume: { id: 'resume-artboard', name: 'Creative Tactile Resume Artboard', type: 'Frame' },
      process: { id: 'process-artboard', name: 'FigJam Process Artboard', type: 'Frame' },
      plugins: { id: 'plugins-artboard', name: 'Plugins & Labs Artboard', type: 'Frame' }
    };
    const target = tabArtboardMap[activeTab];
    if (target) {
      setSelectedNodeId(target.id);
      setSelectedLayerId(target.id);
      setSelectedNodeLabel(target.name);
      setSelectedNodeType(target.type);
    }
  }, [activeTab]);

  const handleSelectNode = (id, label, type) => {
    setSelectedNodeId(id);
    setSelectedLayerId(id);
    setSelectedNodeLabel(label);
    setSelectedNodeType(type);
    setNodeProps(prev => {
      if (prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          x: 0, y: 0,
          w: id.includes('artboard') ? 1340 : 360,
          h: id.includes('artboard') ? 960 : 440,
          radius: 16,
          fill: '#2c2c2c',
          stroke: '#0d99ff',
          strokeWidth: 1,
          opacity: 100
        }
      };
    });
    showToast(`Selected: ${label}`);
  };

  const selectedNode = nodeProps[selectedNodeId] || {
    x: frameX, y: frameY, w: frameW, h: frameH, radius: frameRadius, fill: fillColor, fillOpacity: fillOpacity, stroke: strokeColor, strokeWidth: strokeWidth, opacity: layerOpacity
  };

  const updateSelectedProp = (key, val) => {
    setNodeProps(prev => ({
      ...prev,
      [selectedNodeId]: {
        ...(prev[selectedNodeId] || selectedNode),
        [key]: val
      }
    }));
    if (selectedNodeId === 'root-canvas') {
      if (key === 'x') setFrameX(val);
      if (key === 'y') setFrameY(val);
      if (key === 'w') setFrameW(val);
      if (key === 'h') setFrameH(val);
      if (key === 'radius') setFrameRadius(val);
      if (key === 'fill') setFillColor(val);
      if (key === 'stroke') setStrokeColor(val);
      if (key === 'strokeWidth') setStrokeWidth(val);
      if (key === 'opacity') setLayerOpacity(val);
    }
  };

  const getNodeStyle = (id, fallbackW = 1200, fallbackH = 850) => {
    const p = nodeProps[id] || {};
    return {
      width: `${p.w || fallbackW}px`,
      maxWidth: `${p.w || fallbackW}px`,
      minHeight: `${p.h || fallbackH}px`,
      borderRadius: `${p.radius !== undefined ? p.radius : 16}px`,
      backgroundColor: p.fill || undefined,
      borderColor: p.stroke || undefined,
      borderWidth: p.strokeWidth !== undefined ? `${p.strokeWidth}px` : undefined,
      borderStyle: p.stroke ? 'solid' : undefined,
      opacity: p.opacity !== undefined ? p.opacity / 100 : undefined,
      transform: (p.x || p.y) ? `translate(${p.x || 0}px, ${p.y || 0}px)` : undefined,
      transition: 'width 0.15s ease, min-height 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, border-radius 0.15s ease'
    };
  };

  const handleExportFrame = () => {
    const format = exportFormat.toLowerCase();
    const filename = `Varun_Sehgal_Portfolio_${activeTab}.${format}`;

    try {
      if (format === 'svg') {
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${frameW}" height="${frameH}" viewBox="0 0 ${frameW} ${frameH}">
  <rect width="100%" height="100%" fill="${fillColor}" rx="${frameRadius}"/>
  <text x="60" y="80" fill="#0d99ff" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="32" font-weight="bold">Varun Sehgal Portfolio</text>
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
          ctx.fillStyle = '#0d99ff';
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

  // Centering dimensions per tab
  const getTabDimensions = (tab) => {
    switch (tab) {
      case 'home': return { width: 1240, height: 880 };
      case 'projects': return { width: 1340, height: 960 };
      case 'experience': return { width: 1240, height: 1360 };
      case 'about': return { width: 1380, height: 1220 };
      case 'resume': return { width: 1080, height: 2600 };
      case 'process': return { width: 1400, height: 960 };
      case 'plugins': return { width: 1440, height: 1100 };
      default: return { width: 1240, height: 880 };
    }
  };

  const centerCanvasView = (tab = activeTab) => {
    if (!containerRef.current) return;
    const stageW = containerRef.current.clientWidth || 900;
    const stageH = containerRef.current.clientHeight || 650;
    const dim = getTabDimensions(tab);
    const activeZoom = tab === 'projects' ? 0.9 : zoom;

    let targetX = Math.round((stageW - dim.width * activeZoom) / 2);
    let targetY = Math.round((stageH - dim.height * activeZoom) / 2);

    targetY = Math.max(20, targetY);
    targetX = Math.max(20, targetX);

    setPan({ x: targetX, y: targetY });
  };

  // Center on tab switch & initial mount with 90% auto-zoom for Work page
  useEffect(() => {
    if (activeTab === 'projects') {
      setZoom(0.9);
    } else if (activeTab === 'about') {
      setZoom(0.85);
    }
    const timer = setTimeout(() => {
      centerCanvasView(activeTab);
    }, 60);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Keyboard navigation: Spacebar for Hand/Pan, H for Hand tool, V for Move tool, Shift+1 for Center
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsSpacePressed(true);
      }
      if (e.key === 'h' || e.key === 'H') {
        setActiveTool('hand');
        showToast('Hand Tool (Pan active)');
      }
      if (e.key === 'v' || e.key === 'V') {
        setActiveTool('select');
        showToast('Move Tool (Select active)');
      }
      if (e.shiftKey && (e.key === '1' || e.key === '!')) {
        centerCanvasView(activeTab);
        showToast('Canvas Centered (100%)');
      }
      // Zoom shortcuts: Cmd/Ctrl + '+', '-', '0'
      if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        handleZoomIn();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '_')) {
        e.preventDefault();
        handleZoomOut();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        handleResetZoom();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeTab, zoom]);

  // Robust Canvas Mouse Down for Panning & Stage Selection
  const isDraggingCanvasRef = useRef(false);
  const dragStartRef = useRef({ pageX: 0, pageY: 0, panX: 0, panY: 0 });

  const handleCanvasMouseDown = (e) => {
    const isMiddleClick = e.button === 1;
    const isPanMode = isMiddleClick || isSpacePressed || activeTool === 'hand';

    // If clicking an interactive form input, button, or link, don't initiate pan unless Middle Click or Space
    if (!isPanMode) {
      if (
        e.target.closest('input') ||
        e.target.closest('textarea') ||
        e.target.closest('select') ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('.sticky-note-textarea') ||
        e.target.closest('.lovable-workspace-bottom-nav') ||
        e.target.closest('.lovable-sidebar') ||
        e.target.closest('.lovable-properties-sidebar')
      ) {
        return;
      }
    }

    if (isMiddleClick) {
      e.preventDefault();
    }

    isDraggingCanvasRef.current = false;
    dragStartRef.current = {
      pageX: e.pageX,
      pageY: e.pageY,
      panX: pan.x,
      panY: pan.y
    };

    setIsPanning(true);

    const targetNodeEl = e.target.closest('.figma-selectable-node');
    const targetNodeId = targetNodeEl ? targetNodeEl.getAttribute('data-node-id') : null;

    let rafId = null;
    const handleWindowMouseMove = (moveEvt) => {
      const dx = moveEvt.pageX - dragStartRef.current.pageX;
      const dy = moveEvt.pageY - dragStartRef.current.pageY;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        isDraggingCanvasRef.current = true;
      }

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setPan({
          x: Math.round(dragStartRef.current.panX + dx),
          y: Math.round(dragStartRef.current.panY + dy)
        });
        rafId = null;
      });
    };

    const handleWindowMouseUp = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
      setIsPanning(false);

      // If user did NOT drag (>3px), treat as selection click
      if (!isDraggingCanvasRef.current) {
        if (targetNodeId) {
          setSelectedNodeId(targetNodeId);
          setSelectedLayerId(targetNodeId);
          const nodeName = targetNodeEl?.getAttribute('data-node-name') || targetNodeId;
          setSelectedNodeLabel(nodeName);
          showToast(`Selected: ${nodeName}`);
        } else {
          setSelectedNodeId('root-canvas');
          setSelectedLayerId(null);
          setSelectedNodeLabel('Varun_Sehgal_Portfolio');
          setSelectedNodeType('Frame');
        }
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
  };

  const handleCanvasMouseMove = () => {
    // Handled dynamically via window mousemove in handleCanvasMouseDown
  };

  const handleCanvasMouseUp = () => {
    // Handled dynamically via window mouseup in handleCanvasMouseDown
  };

  const handleCanvasWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.05 : 0.95;
      setZoom(z => Math.min(2.5, Math.max(0.4, Number((z * factor).toFixed(2)))));
    } else {
      setPan(p => ({
        x: p.x - e.deltaX,
        y: p.y - e.deltaY
      }));
    }
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

  const filteredPlugins = COMMUNITY_PLUGINS.filter(plug => {
    const matchesCat = pluginCategory === 'All' || plug.category === pluginCategory;
    const matchesSearch = pluginSearch.trim() === '' ||
      plug.name.toLowerCase().includes(pluginSearch.toLowerCase()) ||
      plug.desc.toLowerCase().includes(pluginSearch.toLowerCase()) ||
      plug.tags.some(t => t.toLowerCase().includes(pluginSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const toggleLayerVisibility = (layerId, e) => {
    e.stopPropagation();
    setLayerVisibilityMap(prev => ({
      ...prev,
      [layerId]: prev[layerId] === false ? true : false
    }));
  };

  const toggleLayerLock = (layerId, e) => {
    e.stopPropagation();
    setLayerLockMap(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  const currentLayers = PAGE_LAYERS_MAP[activeTab] || [];
  const PAGES_LIST = [
    { id: 'home', num: '01', title: 'Home Artboard', icon: 'home' },
    { id: 'projects', num: '02', title: 'Work & Case Studies', icon: 'dashboard' },
    { id: 'experience', num: '03', title: 'Recent Activity & Timeline', icon: 'timeline' },
    { id: 'about', num: '04', title: 'About (Whiteboard Canvas)', icon: 'space_dashboard' },
    { id: 'resume', num: '05', title: 'Resume (ATS Sheet)', icon: 'description' },
    { id: 'process', num: '06', title: 'Process (FigJam Flow)', icon: 'schema' },
    { id: 'plugins', num: '07', title: 'Plugins (Community)', icon: 'extension' }
  ];

  return (
    <div className={`lovable-figma-portfolio theme-${currentTheme}`}>
      {/* Authentic Figma File Loading Screen */}
      {isAppLoading && (
        <FigmaLoadingScreen
          fileName="Varun_Sehgal_Portfolio.fig"
          duration={1300}
          onLoaded={() => {
            setIsAppLoading(false);
            centerCanvasView(activeTab);
          }}
        />
      )}

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

          {/* Tool Selector: Move (V) vs Hand (H) */}
          <div className="canvas-tool-pill">
            <button
              type="button"
              className={`canvas-tool-btn ${activeTool === 'select' ? 'active' : ''}`}
              onClick={() => { setActiveTool('select'); showToast('Move Tool (V) active'); }}
              title="Move Tool (V) - Click to select, drag to pan"
            >
              <span className="material-symbols-outlined text-[15px]">near_me</span>
            </button>
            <button
              type="button"
              className={`canvas-tool-btn ${activeTool === 'hand' ? 'active' : ''}`}
              onClick={() => { setActiveTool('hand'); showToast('Hand Tool (H) active - Drag anywhere'); }}
              title="Hand Tool (H) - Pan canvas"
            >
              <span className="material-symbols-outlined text-[15px]">pan_tool</span>
            </button>
          </div>

          {/* Wireframe View Mode Toggle */}
          <button
            type="button"
            className={`wireframe-toggle-btn ${isWireframeMode ? 'active' : ''}`}
            onClick={() => {
              setIsWireframeMode(!isWireframeMode);
              showToast(isWireframeMode ? 'Wireframe mode off' : 'Wireframe blueprint mode active');
            }}
            title="Toggle Figma Blueprint Wireframe View (Shift+O)"
          >
            <span className="material-symbols-outlined text-[15px]">grid_on</span>
            <span>Wireframe</span>
          </button>
        </div>

        <div className="nav-right-section">
          {/* Authentic Figma Top-Right Zoom Control with Dropdown Menu */}
          <div className="canvas-zoom-pill" ref={zoomMenuRef}>
            <button
              type="button"
              className="canvas-zoom-btn"
              onClick={handleZoomOut}
              title="Zoom out (Ctrl -)"
            >
              −
            </button>
            <button
              type="button"
              className="canvas-zoom-val-btn"
              onClick={() => setShowZoomMenu(!showZoomMenu)}
              title="Zoom Options & Presets"
            >
              <span>{Math.round(zoom * 100)}%</span>
              <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
            </button>
            <button
              type="button"
              className="canvas-zoom-btn"
              onClick={handleZoomIn}
              title="Zoom in (Ctrl +)"
            >
              +
            </button>
            <button
              type="button"
              className="canvas-center-btn"
              onClick={() => { centerCanvasView(activeTab); showToast('Canvas Centered (Shift+1)'); }}
              title="Center View (Shift+1)"
            >
              <span className="material-symbols-outlined text-[14px]">center_focus_strong</span>
            </button>

            {/* Dropdown Menu for Zoom presets */}
            {showZoomMenu && (
              <div className="figma-zoom-dropdown-menu">
                <button
                  type="button"
                  className="zoom-menu-item"
                  onClick={() => {
                    handleZoomIn();
                    setShowZoomMenu(false);
                  }}
                >
                  <span>Zoom In</span>
                  <span className="zoom-shortcut">Ctrl +</span>
                </button>
                <button
                  type="button"
                  className="zoom-menu-item"
                  onClick={() => {
                    handleZoomOut();
                    setShowZoomMenu(false);
                  }}
                >
                  <span>Zoom Out</span>
                  <span className="zoom-shortcut">Ctrl -</span>
                </button>
                <button
                  type="button"
                  className="zoom-menu-item"
                  onClick={() => {
                    handleResetZoom();
                    setShowZoomMenu(false);
                  }}
                >
                  <span>Zoom to 100%</span>
                  <span className="zoom-shortcut">Ctrl 0</span>
                </button>
                <button
                  type="button"
                  className="zoom-menu-item"
                  onClick={() => {
                    centerCanvasView(activeTab);
                    setShowZoomMenu(false);
                  }}
                >
                  <span>Zoom to Fit / Center</span>
                  <span className="zoom-shortcut">Shift 1</span>
                </button>
                <div className="zoom-menu-divider" />
                {[50, 75, 100, 125, 150, 200].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    className={`zoom-menu-item ${Math.round(zoom * 100) === pct ? 'active' : ''}`}
                    onClick={() => {
                      setZoom(pct / 100);
                      setShowZoomMenu(false);
                      showToast(`Zoom: ${pct}%`);
                    }}
                  >
                    <span>{pct}%</span>
                    {Math.round(zoom * 100) === pct && (
                      <span className="material-symbols-outlined text-[14px] text-[#38bdf8]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
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
        {/* Left Sidebar ("Layers", "Pages" & "Assets") */}
        <aside className="lovable-sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-heading">Varun_Sehgal_Portfolio</h2>
            <p className="sidebar-sub">PAGE: {activeTab.toUpperCase()}</p>
          </div>

          {/* Sidebar Mode Tabs */}
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
            {/* 1. PAGES TAB */}
            {sidebarTab === 'pages' && (
              <div className="sidebar-pages-list">
                {PAGES_LIST.map(p => (
                  <div
                    key={p.id}
                    className={`sidebar-page-item ${activeTab === p.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(p.id);
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

            {/* 2. LAYERS TAB (Dynamic to active page) */}
            {sidebarTab === 'layers' && (
              <div className="sidebar-layers-tree">
                {currentLayers.map(layer => {
                  const isVisible = layerVisibilityMap[layer.id] !== false;
                  const isLocked = !!layerLockMap[layer.id];
                  const isSelected = selectedLayerId === layer.id;

                  const getLayerIcon = (type) => {
                    switch (type) {
                      case 'frame': return 'crop_free';
                      case 'component': return 'widgets';
                      case 'text': return 'text_fields';
                      case 'image': return 'image';
                      case 'vector': return 'alt_route';
                      default: return 'layers';
                    }
                  };

                  return (
                    <div
                      key={layer.id}
                      className={`sidebar-layer-row layer-indent-${layer.indent} ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedLayerId(layer.id);
                        showToast(`Selected: ${layer.title}`);
                      }}
                    >
                      <span className="material-symbols-outlined layer-icon">
                        {getLayerIcon(layer.type)}
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

            {/* 3. ASSETS TAB */}
            {sidebarTab === 'assets' && (
              <div className="p-3 flex flex-col gap-3">
                <span className="text-[11px] font-bold text-zinc-400">DESIGN SYSTEM THEMES</span>
                <div className="flex flex-col gap-2">
                  <button onClick={() => changeTheme('default')} className="drawer-theme-btn">
                    <span className="theme-dot default"></span>
                    <span>Default Dark</span>
                  </button>
                  <button onClick={() => changeTheme('cyberpunk')} className="drawer-theme-btn">
                    <span className="theme-dot cyberpunk"></span>
                    <span>Cyberpunk</span>
                  </button>
                  <button onClick={() => changeTheme('ocean')} className="drawer-theme-btn">
                    <span className="theme-dot ocean"></span>
                    <span>Ocean Breeze</span>
                  </button>
                  <button onClick={() => changeTheme('monochrome')} className="drawer-theme-btn">
                    <span className="theme-dot monochrome"></span>
                    <span>Monochrome</span>
                  </button>
                </div>
              </div>
            )}

            <div className="sidebar-section-title">QUICK JUMP FIGMA FILES</div>
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
          className={`lovable-canvas-stage ${isPanning ? 'panning' : ''} ${activeTool === 'hand' || isSpacePressed ? 'tool-hand' : ''} ${isWireframeMode ? 'wireframe-mode-stage' : ''}`}
          onMouseDown={handleCanvasMouseDown}
          onWheel={handleCanvasWheel}
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
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                transformOrigin: '0 0'
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
              <div className="view-content-wrapper home-content-wrapper" style={{ padding: '30px 40px 140px', minWidth: '1280px', display: 'flex', justifyContent: 'center' }}>
                <div
                  className={`artboard-container figma-selectable-node ${selectedNodeId === 'root-canvas' ? 'is-selected' : ''}`}
                  data-node-id="root-canvas"
                  data-node-name="Varun_Sehgal_Portfolio"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('root-canvas', 'Varun_Sehgal_Portfolio (Home)', 'Frame');
                  }}
                  style={{
                    width: `${nodeProps['root-canvas']?.w || frameW}px`,
                    maxWidth: `${nodeProps['root-canvas']?.w || frameW}px`,
                    minHeight: `${nodeProps['root-canvas']?.h || frameH}px`,
                    borderRadius: `${nodeProps['root-canvas']?.radius !== undefined ? nodeProps['root-canvas'].radius : frameRadius}px`,
                    padding: `${padY}px ${padX}px`,
                    gap: `${autoLayoutGap}px`,
                    flexDirection: autoLayoutDir === 'vertical' ? 'column' : 'row',
                    backgroundColor: fillVisible ? (nodeProps['root-canvas']?.fill || fillColor) : 'transparent',
                    opacity: isFrameVisible ? (Number(nodeProps['root-canvas']?.opacity ?? layerOpacity) / 100) : 0.08,
                    border: strokeVisible ? `${nodeProps['root-canvas']?.strokeWidth ?? strokeWidth}px solid ${nodeProps['root-canvas']?.stroke || strokeColor}` : 'none',
                    backdropFilter: blurVisible ? `blur(${blurAmount}px)` : 'none',
                    WebkitBackdropFilter: blurVisible ? `blur(${blurAmount}px)` : 'none',
                    boxShadow: shadowVisible ? '0 30px 100px -20px rgba(0, 0, 0, 0.9)' : 'none',
                    overflow: clipContent ? 'hidden' : 'visible',
                    transform: (nodeProps['root-canvas']?.x || nodeProps['root-canvas']?.y) ? `translate(${nodeProps['root-canvas'].x || 0}px, ${nodeProps['root-canvas'].y || 0}px) rotate(${frameAngle}deg)` : `rotate(${frameAngle}deg)`,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {/* Artboard Frame Header */}
                  <div className="artboard-frame-header">
                    <div className="frame-header-left">
                      <span className="material-symbols-outlined text-[16px] text-[#0d99ff]">layers</span>
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
                            <img
                              src={proj.image}
                              alt={proj.name}
                              className="project-preview-img"
                              loading="lazy"
                              onError={(e) => {
                                if (!e.currentTarget.dataset.fallbackApplied) {
                                  e.currentTarget.dataset.fallbackApplied = 'true';
                                  e.currentTarget.src = '/figma_LandingPage.png';
                                }
                              }}
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
            </div>
          )}

          {/* =========================================================================
              VIEW 2: WORK / PROJECTS (Infinite Canvas Bento Grid & Selectable Nodes)
              ========================================================================= */}
          {activeTab === 'projects' && (
            <div
              className="lovable-canvas-world"
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                transformOrigin: '0 0'
              }}
            >
              <div className="view-content-wrapper" style={{ padding: '36px 40px 140px' }}>
                {/* Framed Artboard Box (Pixel-perfect match to user reference Image 1) */}
                <div
                  className={`figma-artboard-box work-artboard-box figma-selectable-node ${selectedNodeId === 'work-artboard' ? 'is-selected' : ''}`}
                  style={getNodeStyle('work-artboard', 1340, 960)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('work-artboard', 'Work & Case Studies Artboard', 'Frame');
                  }}
                >
                  <div className="figma-artboard-header-tag">
                    <span className="artboard-hash">#</span>
                    <span className="artboard-name">Work & Case Studies</span>
                    <span className="artboard-dims">[{nodeProps['work-artboard']?.w || 1340} × {nodeProps['work-artboard']?.h || 960}]</span>
                  </div>

                  {selectedNodeId === 'work-artboard' && (
                    <div className="figma-selection-overlay">
                      <div className="selection-tag">❖ Work & Case Studies [1340×960]</div>
                      <div className="selection-handle tl" /><div className="selection-handle tr" />
                      <div className="selection-handle bl" /><div className="selection-handle br" />
                    </div>
                  )}

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
                      {['All', 'Vibecoded Site', 'Mobile App', 'SaaS / Web'].map(cat => (
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

                  {/* Full Bento Grid with Selectable Cards */}
                  <div className="bento-grid-container">
                    {filteredProjects.map(proj => {
                      const nodeId = `work-${proj.id}`;
                      const isSelected = selectedNodeId === nodeId;
                      const props = nodeProps[nodeId] || {};
                      return (
                        <div
                          key={proj.id}
                          className={`bento-card figma-selectable-node ${isSelected ? 'is-selected' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectNode(nodeId, proj.name, 'Component');
                          }}
                          style={{
                            width: props.w ? `${props.w}px` : undefined,
                            minHeight: props.h ? `${props.h}px` : undefined,
                            borderRadius: props.radius !== undefined ? `${props.radius}px` : undefined,
                            backgroundColor: props.fill || undefined,
                            borderColor: props.stroke || undefined,
                            borderWidth: props.strokeWidth ? `${props.strokeWidth}px` : undefined,
                            borderStyle: props.stroke ? 'solid' : undefined,
                            opacity: props.opacity !== undefined ? props.opacity / 100 : undefined,
                            transform: (props.x || props.y) ? `translate(${props.x || 0}px, ${props.y || 0}px)` : undefined,
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {isSelected && (
                            <div className="figma-selection-overlay">
                              <div className="selection-tag">❖ {props.customText || proj.name} [{props.w || 360}×{props.h || 440}]</div>
                              <div className="selection-handle tl" />
                              <div className="selection-handle tr" />
                              <div className="selection-handle bl" />
                              <div className="selection-handle br" />
                            </div>
                          )}
                          <div className="bento-img-wrap">
                            <img
                              src={proj.image}
                              alt={proj.name}
                              className="bento-img"
                              onError={(e) => {
                                e.currentTarget.src = '/figma_LandingPage.png';
                              }}
                            />
                            <span className="bento-badge">{proj.badge}</span>
                          </div>
                          <div className="bento-body">
                            <span className="bento-cat">{proj.category}</span>
                            <h3
                              className="bento-title"
                              contentEditable="true"
                              suppressContentEditableWarning={true}
                              onBlur={(e) => updateSelectedProp('customText', e.currentTarget.innerText)}
                              title="Click or double click to edit title"
                            >
                              {props.customText || proj.name}
                            </h3>
                            <p
                              className="bento-desc"
                              contentEditable="true"
                              suppressContentEditableWarning={true}
                              title="Click to edit description"
                            >
                              {proj.desc}
                            </p>
                            <div className="bento-tags-list">
                              {proj.tags.map((t, idx) => (
                                <span key={idx} className="bento-tag">{t}</span>
                              ))}
                            </div>
                            {proj.isVibecoded ? (
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                                <a
                                  href={proj.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="bento-action-btn"
                                  style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', color: '#ffffff', fontWeight: 700 }}
                                >
                                  🚀 Open Live Site (Vercel) <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                </a>
                                {proj.figmaLink && (
                                  <a
                                    href={proj.figmaLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bento-action-btn"
                                    style={{ background: 'rgba(255, 255, 255, 0.08)' }}
                                  >
                                    ❖ Figma File
                                  </a>
                                )}
                              </div>
                            ) : (
                              <a href={proj.link} target="_blank" rel="noreferrer" className="bento-action-btn">
                                Open in Figma <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 3: EXPERIENCE (Infinite Canvas Alternating Timeline & Credentials)
              ========================================================================= */}
          {activeTab === 'experience' && (
            <div
              className="lovable-canvas-world"
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                transformOrigin: '0 0'
              }}
            >
              <div className="view-content-wrapper" style={{ padding: '36px 40px 140px' }}>
                {/* Framed Artboard Box for Experience */}
                <div
                  className={`figma-artboard-box experience-artboard-box figma-selectable-node ${selectedNodeId === 'exp-artboard' ? 'is-selected' : ''}`}
                  style={getNodeStyle('exp-artboard', 1240, 1360)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('exp-artboard', 'Recent Activity & Timeline Frame', 'Frame');
                  }}
                >
                  <div className="figma-artboard-header-tag">
                    <span className="artboard-hash">#</span>
                    <span className="artboard-name">Recent Activity &amp; Career Timeline</span>
                    <span className="artboard-dims">[{nodeProps['exp-artboard']?.w || 1240} × {nodeProps['exp-artboard']?.h || 1360}]</span>
                  </div>

                  {selectedNodeId === 'exp-artboard' && (
                    <div className="figma-selection-overlay">
                      <div className="selection-tag">❖ Recent Activity &amp; Career Timeline [1240×1360]</div>
                      <div className="selection-handle tl" /><div className="selection-handle tr" />
                      <div className="selection-handle bl" /><div className="selection-handle br" />
                    </div>
                  )}

                  <header className="view-page-header">
                    <div className="activity-header-top">
                      <div>
                        <h1 className="view-page-title">Recent Activity &amp; Career Timeline</h1>
                        <p className="view-page-desc">Production UX design milestones, hackathon achievements, and verified credentials.</p>
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

                  {/* Alternating Zigzag Timeline (Matching Recent Activity Mockup with Elevated Center Spine) */}
                  {experienceViewMode === 'zigzag' ? (
                    <div className="zigzag-timeline-wrapper">
                      <div className="zigzag-timeline-container">
                        {/* Luminous Top Milestone Beacon on Spine */}
                        <div className="zigzag-spine-beacon-top">
                          <div className="spine-beacon-pill">
                            <span className="beacon-pulse-dot" />
                            <span className="beacon-title">CAREER ODYSSEY &amp; TELEMETRY</span>
                            <span className="beacon-year-range">2024 — 2026</span>
                          </div>
                        </div>

                        {/* Center vertical glowing spine */}
                        <div className="zigzag-center-line">
                          <div className="zigzag-spine-glow-beam" />
                        </div>

                        {filteredActivity.map((item, index) => {
                          const isRight = index % 2 === 0;
                          const expNodeId = `exp-${item.id}`;
                          const isSelected = selectedNodeId === expNodeId;
                          const props = nodeProps[expNodeId] || {};
                          return (
                            <div
                              key={item.id}
                              className={`zigzag-timeline-row ${isRight ? 'align-right' : 'align-left'}`}
                            >
                              {/* Center Node Icon pinned on spine with halo */}
                              <div className={`zigzag-node-icon category-${item.category.toLowerCase().replace(/[^a-z0-9]/g, '')}`} title={item.category}>
                                <div className="zigzag-node-inner-halo" />
                                <span className="material-symbols-outlined text-[17px]">{item.icon}</span>
                              </div>

                              {/* Alternating Card */}
                              <div
                                className={`zigzag-card figma-selectable-node ${isSelected ? 'is-selected' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectNode(expNodeId, props.customText || item.highlight, 'Frame');
                                }}
                                style={{
                                  width: props.w ? `${props.w}px` : undefined,
                                  minHeight: props.h ? `${props.h}px` : undefined,
                                  borderRadius: props.radius !== undefined ? `${props.radius}px` : undefined,
                                  backgroundColor: props.fill || undefined,
                                  borderColor: props.stroke || undefined,
                                  borderWidth: props.strokeWidth ? `${props.strokeWidth}px` : undefined,
                                  borderStyle: props.stroke ? 'solid' : undefined,
                                  opacity: props.opacity !== undefined ? props.opacity / 100 : undefined,
                                  transform: (props.x || props.y) ? `translate(${props.x || 0}px, ${props.y || 0}px)` : undefined,
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                {isSelected && (
                                  <div className="figma-selection-overlay">
                                    <div className="selection-tag">❖ {props.customText || item.highlight} [{props.w || 420}×{props.h || 220}]</div>
                                    <div className="selection-handle tl" />
                                    <div className="selection-handle tr" />
                                    <div className="selection-handle bl" />
                                    <div className="selection-handle br" />
                                  </div>
                                )}
                                <div className="zigzag-card-header">
                                  <span className="zigzag-card-date">{item.date}</span>
                                  <span className="zigzag-card-badge">{item.category}</span>
                                </div>

                                <div className="zigzag-card-title-row">
                                  <h3
                                    className="zigzag-card-title"
                                    contentEditable="true"
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => updateSelectedProp('customText', e.currentTarget.innerText)}
                                    title="Click to edit title"
                                  >
                                    <span className="zigzag-highlight-name">{props.customText || item.highlight}</span> {item.titleRest}
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
                                <span className="material-symbols-outlined text-[#0d99ff] text-[20px]">verified</span>
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
            </div>
          )}

          {/* =========================================================================
              VIEW 4: ABOUT (Design Engineering Vision & Identity Blueprint - Image 2)
              ========================================================================= */}
          {activeTab === 'about' && (
            <div
              className="lovable-canvas-world"
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                transformOrigin: '0 0'
              }}
            >
              <div className="view-content-wrapper" style={{ padding: '36px 40px 140px' }}>
                {/* About Blueprint Canvas matching Image 2 */}
                <div
                  className={`figma-artboard-box about-blueprint-artboard figma-selectable-node ${selectedNodeId === 'about-artboard' ? 'is-selected' : ''}`}
                  style={getNodeStyle('about-artboard', 1380, 760)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('about-artboard', 'Varun_Sehgal_Identity Frame', 'Frame');
                  }}
                >
                  <div className="figma-artboard-header-tag">
                    <span className="artboard-hash">#</span>
                    <span className="artboard-name">Varun_Sehgal_Identity.fig — Lead Product Designer &amp; Design Technologist</span>
                    <span className="artboard-dims">[{nodeProps['about-artboard']?.w || 1380} × {nodeProps['about-artboard']?.h || 760}]</span>
                  </div>

                  {selectedNodeId === 'about-artboard' && (
                    <div className="figma-selection-overlay">
                      <div className="selection-tag">❖ Varun_Sehgal_Identity [1380×760]</div>
                      <div className="selection-handle tl" /><div className="selection-handle tr" />
                      <div className="selection-handle bl" /><div className="selection-handle br" />
                    </div>
                  )}

                  {/* Canvas Header & Breadcrumbs matching Image 2 */}
                  <div className="about-canvas-top-status">
                    <div className="top-status-left">
                      <span className="material-symbols-outlined text-[16px] text-sky-400">code</span>
                      <span className="top-doc-title">Varun_Sehgal_Portfolio.fig</span>
                      <span className="top-version-badge">v2.4</span>
                    </div>

                    <div className="top-status-right">
                      <div className="figma-cursor-tag cursor-elena-viewing">
                        <svg className="cursor-arrow-icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M0 0L6 14L8.5 8.5L14 6L0 0Z" fill="#a855f7" />
                        </svg>
                        <span className="cursor-author-name">Elena (Product Lead) [Live Viewing]</span>
                      </div>
                      <div className="top-zoom-badge">100%</div>
                      <button className="top-share-btn" onClick={() => showToast('Share Link Copied!')}>Share</button>
                    </div>
                  </div>

                  {/* 1. TOP ROW: Philosophy & Status (2 Wide Cards) */}
                  <div className="about-top-cards-row">
                    {/* Top-Left Card: PHILOSOPHY */}
                    <div className="about-wide-card philosophy-card">
                      <div className="card-top-tag tag-orange">
                        <span className="tag-text">PHILOSOPHY</span>
                        <span className="tag-ver">v2.4</span>
                      </div>
                      <h2 className="wide-card-title">Design Engineering Vision</h2>
                      <p className="wide-card-desc">
                        Bridging the deep chasm between Figma multiplayer ergonomics and production React 19/Tailwind codebases. I build interfaces where design tokens are executable contracts, not static documentation.
                      </p>
                      <div className="wide-card-badges-row">
                        <span className="spec-badge">Zero Handoff Friction</span>
                        <span className="spec-badge">Design Systems at Scale</span>
                      </div>
                    </div>

                    {/* Top-Right Card: STATUS */}
                    <div className="about-wide-card status-card">
                      <div className="card-top-tag tag-teal">
                        <span className="tag-dot-pulse" />
                        <span className="tag-text">STATUS</span>
                        <span className="tag-sub">Seeking gigs</span>
                      </div>
                      <h2 className="wide-card-title">Lead Product Designer</h2>
                      <p className="wide-card-desc">
                        Independent consultant partnering with Seed to Series-A venture-backed AI &amp; Developer-Tooling founders. Architecting zero-to-one product experiences, component architectures, and fluid desktop apps.
                      </p>
                      <div className="wide-card-badges-row">
                        <span className="spec-badge">San Francisco / Remote</span>
                        <span className="spec-badge status-active">Global Remote · Active</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. BOTTOM ROW: Audio Note & Connect Dossier */}
                  <div className="about-bottom-cards-row">
                    {/* Left Bottom Card: AUDIO NOTE */}
                    <div className="about-bottom-card audio-note-card">
                      <div className="card-top-tag tag-orange">
                        <span className="tag-text">AUDIO NOTE</span>
                        <span className="tag-sub">48kHz Spatial</span>
                      </div>
                      <h3 className="bottom-card-title">"Why I Design Directly in Code"</h3>
                      <p className="bottom-card-desc">
                        A quick audio memo on how thinking in ASTs and flexbox prevents unbuildable Figma dreams.
                      </p>

                      <div className="audio-player-widget">
                        <button
                          className="audio-play-round-btn"
                          onClick={() => {
                            setIsPlayingAudioNote(!isPlayingAudioNote);
                            showToast(isPlayingAudioNote ? 'Audio Paused' : 'Playing "Why I Design Directly in Code"');
                          }}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isPlayingAudioNote ? 'pause' : 'play_arrow'}
                          </span>
                        </button>

                        <div className={`audio-equalizer-bars ${isPlayingAudioNote ? 'active' : ''}`}>
                          {[40, 75, 95, 60, 30, 85, 100, 50, 70, 90, 45, 65, 80, 55, 95, 35, 75, 50].map((h, i) => (
                            <span
                              key={i}
                              className="eq-bar"
                              style={{
                                height: `${h}%`,
                                animationDelay: `${i * 0.08}s`
                              }}
                            />
                          ))}
                        </div>

                        <span className="audio-duration-meta">01:14 / 02:45</span>
                      </div>
                    </div>

                    {/* Right Bottom Card: CONNECT */}
                    <div className="about-bottom-card connect-action-card">
                      <div className="card-top-tag tag-teal">
                        <span className="tag-text">CONNECT</span>
                      </div>
                      <h3 className="bottom-card-title">Request Dossier &amp; Collaboration</h3>
                      <p className="bottom-card-desc">
                        Get immediate access to comprehensive resume, design system specs, and availability schedule.
                      </p>

                      <div className="connect-actions-row">
                        <button
                          className="connect-resume-primary-btn"
                          onClick={() => {
                            if (onOpenApp) onOpenApp('resume');
                            showToast('Opening Resume Application...');
                          }}
                        >
                          <span className="material-symbols-outlined text-[16px]">description</span>
                          <span>Resume (2.1 MB)</span>
                        </button>

                        <button
                          className="connect-icon-btn"
                          onClick={() => {
                            navigator.clipboard?.writeText('varun.sehgal02@gmail.com');
                            showToast('Email copied: varun.sehgal02@gmail.com');
                          }}
                          title="Copy Email"
                        >
                          <span className="material-symbols-outlined text-[16px]">mail</span>
                        </button>

                        <button
                          className="connect-icon-btn"
                          onClick={() => window.open('https://github.com/varunsehgal05', '_blank')}
                          title="GitHub Profile"
                        >
                          <span className="material-symbols-outlined text-[16px]">terminal</span>
                        </button>

                        <button
                          className="connect-icon-btn"
                          onClick={() => window.open('https://twitter.com', '_blank')}
                          title="Twitter / X"
                        >
                          <span className="material-symbols-outlined text-[16px]">share</span>
                        </button>

                        <button
                          className="connect-icon-btn"
                          onClick={() => {
                            navigator.clipboard?.writeText(window.location.href);
                            showToast('Portfolio Link Copied!');
                          }}
                          title="Copy Share Link"
                        >
                          <span className="material-symbols-outlined text-[16px]">link</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 5: RESUME (Infinite Canvas Creative Figma Artboard)
              ========================================================================= */}
          {activeTab === 'resume' && (
            <div
              className="lovable-canvas-world"
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                transformOrigin: '0 0'
              }}
            >
              <div className="view-content-wrapper" style={{ padding: '36px 40px 140px' }}>
                {/* Framed Artboard Box for Kittu.pro Resume */}
                <div
                  className={`figma-artboard-box resume-artboard-box figma-selectable-node ${selectedNodeId === 'resume-artboard' ? 'is-selected' : ''}`}
                  style={getNodeStyle('resume-artboard', 1080, 2600)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('resume-artboard', 'Notebook_Resume', 'Frame');
                  }}
                >
                  <div className="figma-artboard-header-tag">
                    <span className="artboard-hash">#</span>
                    <span className="artboard-name">Notebook Resume — Varun Sehgal</span>
                    <span className="artboard-dims">[{nodeProps['resume-artboard']?.w || 1080} × {nodeProps['resume-artboard']?.h || 2600}]</span>
                  </div>

                  {selectedNodeId === 'resume-artboard' && (
                    <div className="figma-selection-overlay">
                      <div className="selection-tag">❖ Notebook_Resume [1080×2600]</div>
                      <div className="selection-handle tl" /><div className="selection-handle tr" />
                      <div className="selection-handle bl" /><div className="selection-handle br" />
                    </div>
                  )}

                  {/* Pixel-perfect recreation of https://www.kittu.pro/resume with crowd-of-cursors engine */}
                  <KittuResumeApp
                    isParentLoading={isAppLoading}
                    onBack={() => setActiveTab('home')}
                    onScrollToTop={() => {
                      // Smoothly glide canvas pan back to top so user is dragged up to top of notebook
                      const stageW = containerRef.current?.clientWidth || 900;
                      const targetX = Math.max(20, Math.round((stageW - 1080 * zoom) / 2));
                      const targetY = 20;
                      const startX = pan.x;
                      const startY = pan.y;
                      const startTime = performance.now();
                      const duration = 650;
                      const animateScroll = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(1, elapsed / duration);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setPan({
                          x: startX + (targetX - startX) * eased,
                          y: startY + (targetY - startY) * eased
                        });
                        if (progress < 1) {
                          requestAnimationFrame(animateScroll);
                        }
                      };
                      requestAnimationFrame(animateScroll);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 6: PROCESS (FigJam Interactive Sprint Process Board - Image 1)
              ========================================================================= */}
          {activeTab === 'process' && (
            <div
              className="lovable-canvas-world"
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                transformOrigin: '0 0'
              }}
            >
              <div className="view-content-wrapper" style={{ padding: '36px 40px 140px' }}>
                {/* FigJam Process Board Canvas matching Image 1 */}
                <div
                  className={`figma-artboard-box figjam-process-artboard figma-selectable-node ${selectedNodeId === 'process-artboard' ? 'is-selected' : ''}`}
                  style={getNodeStyle('process-artboard', 1400, 600)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('process-artboard', 'FigJam Process Board', 'Frame');
                  }}
                >
                  <div className="figma-artboard-header-tag">
                    <span className="artboard-hash">#</span>
                    <span className="artboard-name">Varun_Sehgal_Portfolio.fig — FigJam Process Board (Interactive Sprint)</span>
                    <span className="artboard-dims">[{nodeProps['process-artboard']?.w || 1400} × {nodeProps['process-artboard']?.h || 600}]</span>
                  </div>

                  {selectedNodeId === 'process-artboard' && (
                    <div className="figma-selection-overlay">
                      <div className="selection-tag">❖ FigJam_Process_Sprint_04 [1400×600]</div>
                      <div className="selection-handle tl" /><div className="selection-handle tr" />
                      <div className="selection-handle bl" /><div className="selection-handle br" />
                    </div>
                  )}

                  {/* Top Canvas Bar matching Image 1 */}
                  <div className="figjam-canvas-topbar">
                    <div className="figjam-topbar-left">
                      <div className="figjam-sprint-badge">
                        <span className="sprint-status-dot" />
                        <span className="sprint-title-text">Sprint 04: Omni-Checkout Friction Analysis</span>
                        <span className="sprint-live-tag">Live Canvas</span>
                      </div>
                      <div className="sprint-subtext">Varun Sehgal / Staff Product Designer Canvas Room</div>
                    </div>

                    <div className="figjam-topbar-right">
                      <button className="figjam-pill-control" onClick={() => showToast('Focus: Deep Elements')}>
                        <span className="material-symbols-outlined text-[15px] text-sky-400">equalizer</span>
                        <span>Focus: Deep Elements</span>
                        <span className="inline-block w-2 h-2 rounded bg-sky-400/60 ml-0.5" />
                      </button>

                      <div className="figjam-pill-control timer">
                        <span className="material-symbols-outlined text-[15px] text-amber-400">schedule</span>
                        <span>12:18</span>
                      </div>

                      {/* Multiplayer Avatars */}
                      <div className="figjam-avatar-stack">
                        <div className="figjam-avatar av-1" title="Varun Sehgal">VS</div>
                        <div className="figjam-avatar av-2" title="Elena Rostova (PM)">ER</div>
                        <div className="figjam-avatar av-3" title="Marcus Vance">M1</div>
                        <div className="figjam-avatar-counter">+4</div>
                      </div>

                      <button
                        className="figjam-export-findings-btn"
                        onClick={() => {
                          handleExportFrame();
                          showToast('Exporting Sprint 04 Telemetry Findings...');
                        }}
                      >
                        <span className="material-symbols-outlined text-[15px]">file_upload</span>
                        <span>Export Findings</span>
                      </button>
                    </div>
                  </div>

                  {/* Center Hypothesis Frame Header */}
                  <div className="figjam-hypothesis-header">
                    <div className="hypothesis-tag-pill">
                      <span className="material-symbols-outlined text-[14px]">search</span>
                      <span>HYPOTHESIS FRAME 01</span>
                    </div>
                    <h1 className="hypothesis-main-title">
                      Enterprise Multi-Seat Checkout Telemetry
                    </h1>
                    <p className="hypothesis-subtitle">
                      Synthesizing 28 customer interviews, biometric engagement signals, and funnel analytics to diagnose a 34% terminal checkout bounce among SOC2 compliance officers.
                    </p>
                  </div>

                  {/* FigJam Interactive Whiteboard Canvas Stage (Center part removed) */}
                  <div className="figjam-canvas-stage">
                    {/* Bottom Floating FigJam Toolbar matching Image 1 */}
                    <div className="figjam-floating-toolbar">
                      <div className="toolbar-tools-group">
                        <button
                          className={`figjam-tool-btn ${processToolbarTool === 'select' ? 'active' : ''}`}
                          onClick={() => {
                            setProcessToolbarTool('select');
                            showToast('Move Tool Selected');
                          }}
                          title="Select Tool"
                        >
                          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M0 0L6 14L8.5 8.5L14 6L0 0Z" />
                          </svg>
                        </button>

                        <button
                          className={`figjam-tool-btn ${processToolbarTool === 'hand' ? 'active' : ''}`}
                          onClick={() => {
                            setProcessToolbarTool('hand');
                            showToast('Hand Pan Tool');
                          }}
                          title="Pan Hand Tool"
                        >
                          <span className="material-symbols-outlined text-[16px]">pan_tool</span>
                        </button>

                        <button
                          className={`figjam-tool-btn ${processToolbarTool === 'sticky' ? 'active' : ''}`}
                          onClick={() => {
                            setProcessToolbarTool('sticky');
                            showToast('Click anywhere to place Sticky Note');
                          }}
                          title="Sticky Note Tool"
                        >
                          <span className="material-symbols-outlined text-[16px]">sticky_note_2</span>
                        </button>

                        <button
                          className={`figjam-tool-btn ${processToolbarTool === 'connector' ? 'active' : ''}`}
                          onClick={() => {
                            setProcessToolbarTool('connector');
                            showToast('Connector Tool Active');
                          }}
                          title="Connector Tool"
                        >
                          <span className="material-symbols-outlined text-[16px]">timeline</span>
                        </button>
                      </div>

                      <div className="toolbar-divider" />

                      {/* Emoji Reactions */}
                      <div className="toolbar-reactions-group">
                        <button className="figjam-emoji-btn" onClick={() => showToast('❤️ Reaction Added')} title="Love">❤️</button>
                        <button className="figjam-emoji-btn" onClick={() => showToast('🔥 Reaction Added')} title="Fire">🔥</button>
                        <button className="figjam-emoji-btn" onClick={() => showToast('🚀 Sprint Velocity!')} title="Rocket">🚀</button>
                        <button className="figjam-emoji-btn" onClick={() => showToast('💬 Comment Stamp')} title="Comment">💬</button>
                      </div>

                      <div className="toolbar-divider" />

                      {/* Zoom Controls */}
                      <div className="toolbar-zoom-group">
                        <button className="zoom-adjust-btn" onClick={handleZoomOut} title="Zoom Out">−</button>
                        <span className="zoom-percentage-text">{Math.round(zoom * 100)}%</span>
                        <button className="zoom-adjust-btn" onClick={handleZoomIn} title="Zoom In">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 7: PLUGINS (Creative Figma Community Ecosystem & Dev Console - Image 3)
              ========================================================================= */}
          {activeTab === 'plugins' && (
            <div
              className="lovable-canvas-world"
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                transformOrigin: '0 0'
              }}
            >
              <div className="view-content-wrapper" style={{ padding: '36px 40px 140px' }}>
                {/* Plugins Ecosystem Canvas matching Image 3 */}
                <div
                  className={`figma-artboard-box plugins-ecosystem-artboard figma-selectable-node ${selectedNodeId === 'plugins-artboard' ? 'is-selected' : ''}`}
                  style={getNodeStyle('plugins-artboard', 1440, 480)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('plugins-artboard', 'Varuns_Plugin_Lab_Ecosystem', 'Frame');
                  }}
                >
                  <div className="figma-artboard-header-tag">
                    <span className="artboard-hash">#</span>
                    <span className="artboard-name">COMMUNITY + EXTENSIONS / Varun's Plugin Lab &amp; Ecosystem [Verified Creator]</span>
                    <span className="artboard-dims">[{nodeProps['plugins-artboard']?.w || 1440} × {nodeProps['plugins-artboard']?.h || 480}]</span>
                  </div>

                  {selectedNodeId === 'plugins-artboard' && (
                    <div className="figma-selection-overlay">
                      <div className="selection-tag">❖ Varuns_Plugin_Lab_Ecosystem [1440×480]</div>
                      <div className="selection-handle tl" /><div className="selection-handle tr" />
                      <div className="selection-handle bl" /><div className="selection-handle br" />
                    </div>
                  )}

                  {/* Top Header Banner matching Image 3 */}
                  <div className="plugins-top-banner-row">
                    <div className="banner-badge-group">
                      <span className="material-symbols-outlined text-orange-400 text-[18px]">extension</span>
                      <span className="banner-breadcrumb-text">
                        <strong>COMMUNITY + EXTENSIONS</strong> / Varun's Plugin Lab &amp; Ecosystem
                      </span>
                      <span className="verified-creator-pill">Verified Creator</span>
                    </div>

                    <div className="banner-status-group">
                      <div className="figjam-avatar-stack sm">
                        <div className="figjam-avatar av-1">VS</div>
                        <div className="figjam-avatar av-2">ER</div>
                        <div className="figjam-avatar-counter">+6</div>
                      </div>
                      <span className="realtime-active-indicator">
                        <span className="active-dot" />
                        <span>Realtime Active</span>
                      </span>
                    </div>
                  </div>

                  {/* Filter Tabs & Search Bar */}
                  <div className="plugins-filters-row">
                    <div className="filter-pills-group">
                      <button
                        className={`filter-pill ${pluginFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setPluginFilter('all')}
                      >
                        All Plugins (12)
                      </button>
                      <button
                        className={`filter-pill ${pluginFilter === 'featured' ? 'active' : ''}`}
                        onClick={() => setPluginFilter('featured')}
                      >
                        Featured &amp; Community Picks
                      </button>
                      <button
                        className={`filter-pill ${pluginFilter === 'published' ? 'active' : ''}`}
                        onClick={() => setPluginFilter('published')}
                      >
                        Published by Varun
                      </button>
                      <button
                        className={`filter-pill ${pluginFilter === 'dev' ? 'active' : ''}`}
                        onClick={() => setPluginFilter('dev')}
                      >
                        In Development
                      </button>
                    </div>

                    <div className="plugins-search-bar-wrap">
                      <span className="material-symbols-outlined text-[15px] text-zinc-400">search</span>
                      <input
                        type="text"
                        placeholder="Filter plugins, runtimes, APIs..."
                        value={pluginSearch}
                        onChange={(e) => setPluginSearch(e.target.value)}
                        className="plugins-search-input"
                      />
                      <div className="view-mode-icons">
                        <span className="material-symbols-outlined text-[16px] text-sky-400">grid_view</span>
                        <span className="material-symbols-outlined text-[16px] text-zinc-500">view_list</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floating Canvas Zoom & Viewport Navigation HUD */}
          <div className="figma-floating-zoom-hud" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="hud-zoom-btn"
              onClick={handleZoomOut}
              title="Zoom Out (Ctrl -)"
            >
              <span className="material-symbols-outlined text-[15px]">remove</span>
            </button>
            <button
              type="button"
              className="hud-zoom-label"
              onClick={handleResetZoom}
              title="Click to reset zoom to 100% and re-center"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              className="hud-zoom-btn"
              onClick={handleZoomIn}
              title="Zoom In (Ctrl +)"
            >
              <span className="material-symbols-outlined text-[15px]">add</span>
            </button>
            <div className="hud-divider" />
            <button
              type="button"
              className="hud-zoom-btn"
              onClick={() => { centerCanvasView(activeTab); showToast('Canvas Centered (Shift+1)'); }}
              title="Zoom to Fit / Center View (Shift+1)"
            >
              <span className="material-symbols-outlined text-[15px]">center_focus_strong</span>
            </button>
          </div>
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
                      <span className="material-symbols-outlined text-[15px]">
                        {selectedNodeType === 'Component' ? 'widgets' : 'crop_free'}
                      </span>
                    </div>
                    <div className="prop-target-name">
                      <input
                        type="text"
                        className="target-label-input"
                        value={selectedNodeLabel}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedNodeLabel(val);
                          updateSelectedProp('customText', val);
                        }}
                        title="Click to rename layer / component"
                      />
                      <span className="target-type">
                        {selectedNodeType} · {selectedNode.w || frameW} × {selectedNode.h || frameH}
                      </span>
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

                  {/* Text & Content Live Editor */}
                  <div className="prop-section">
                    <div className="prop-section-header">
                      <span className="prop-section-title">Text & Content (Live Edit)</span>
                      <span className="material-symbols-outlined text-[14px] text-zinc-400">title</span>
                    </div>
                    <div className="prop-content-edit-wrap">
                      <textarea
                        className="prop-content-textarea"
                        placeholder="Edit selected element headline or content..."
                        value={selectedNode.customText !== undefined ? selectedNode.customText : (selectedNodeLabel || '')}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedNodeLabel(val);
                          updateSelectedProp('customText', val);
                        }}
                        rows={2}
                      />
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
                    <div className="prop-section-title">Dimensions & Position (Live Editable)</div>
                    <div className="prop-grid-2x2">
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">X</span>
                        <input
                          type="number"
                          value={selectedNode.x !== undefined ? selectedNode.x : frameX}
                          onChange={(e) => updateSelectedProp('x', Number(e.target.value) || 0)}
                          className="prop-num-input"
                        />
                      </div>
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">Y</span>
                        <input
                          type="number"
                          value={selectedNode.y !== undefined ? selectedNode.y : frameY}
                          onChange={(e) => updateSelectedProp('y', Number(e.target.value) || 0)}
                          className="prop-num-input"
                        />
                      </div>
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">W</span>
                        <input
                          type="number"
                          value={selectedNode.w !== undefined ? selectedNode.w : frameW}
                          onChange={(e) => updateSelectedProp('w', Number(e.target.value) || 0)}
                          className="prop-num-input"
                        />
                      </div>
                      <div className="prop-input-wrap">
                        <span className="prop-input-label">H</span>
                        <input
                          type="number"
                          value={selectedNode.h !== undefined ? selectedNode.h : frameH}
                          onChange={(e) => updateSelectedProp('h', Number(e.target.value) || 0)}
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
                          value={selectedNode.radius !== undefined ? selectedNode.radius : frameRadius}
                          onChange={(e) => updateSelectedProp('radius', Number(e.target.value) || 0)}
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
                          value={selectedNode.opacity !== undefined ? selectedNode.opacity : layerOpacity}
                          onChange={(e) => updateSelectedProp('opacity', Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
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
                        value={(selectedNode.fill || fillColor).startsWith('#') && (selectedNode.fill || fillColor).length === 7 ? (selectedNode.fill || fillColor) : '#1E2020'}
                        onChange={(e) => updateSelectedProp('fill', e.target.value)}
                        className="color-picker-input-native"
                        title="Pick fill color"
                      />
                      <input
                        type="text"
                        value={(selectedNode.fill || fillColor).toUpperCase()}
                        onChange={(e) => updateSelectedProp('fill', e.target.value)}
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
                              updateSelectedProp('fill', hex);
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
                          updateSelectedProp('stroke', '#FFFFFF');
                          updateSelectedProp('strokeWidth', 1);
                        }}
                        title="Reset stroke"
                      >
                        <span className="material-symbols-outlined text-[14px]">refresh</span>
                      </button>
                    </div>
                    <div className="prop-color-row">
                      <input
                        type="color"
                        value={(selectedNode.stroke || strokeColor).startsWith('#') && (selectedNode.stroke || strokeColor).length === 7 ? (selectedNode.stroke || strokeColor) : '#FFFFFF'}
                        onChange={(e) => updateSelectedProp('stroke', e.target.value)}
                        className="color-picker-input-native"
                        title="Pick stroke color"
                      />
                      <input
                        type="text"
                        value={(selectedNode.stroke || strokeColor).toUpperCase()}
                        onChange={(e) => updateSelectedProp('stroke', e.target.value)}
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
                          value={selectedNode.strokeWidth !== undefined ? selectedNode.strokeWidth : strokeWidth}
                          onChange={(e) => updateSelectedProp('strokeWidth', Number(e.target.value) || 0)}
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
                      <span className="material-symbols-outlined text-[13px] text-[#0d99ff]">blur_on</span>
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
                      <span className="material-symbols-outlined text-[13px] text-[#0d99ff]">shadow</span>
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
