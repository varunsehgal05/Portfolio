import { useState, useRef, useEffect } from 'react';
import FirebaseImage from './FirebaseImage';
import FigmaLoadingScreen from './FigmaLoadingScreen';
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
    role: 'UI/UX Designer Intern',
    company: 'UniEvent',
    period: 'Jun 2024 — Nov 2024',
    location: 'Remote',
    link: 'https://www.linkedin.com/in/varunsehgal02',
    desc: 'Designed user-focused digital experiences and translated complex business requirements into clear, consistent interfaces for campus event ticketing platform (EventFlow). Architected 4-step booking flow optimization, slashing transaction drop-off by 30% across 50+ modular components. Completed in early November 2024.'
  },
  {
    role: 'Assistant Head of Operations / UI/UX Intern',
    company: 'Assemble',
    period: 'Aug 2024 — Jan 2025',
    location: 'Remote',
    link: 'https://www.linkedin.com/in/varunsehgal02',
    desc: 'Designed collaborative creator workspace tools and interaction prototypes in Figma. Coordinated platform operations for multi-team esports competitions.'
  },
  {
    role: 'UI/UX Designer Intern',
    company: 'Knaptix Ventures',
    period: 'Jun 2024 — Aug 2024',
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
    date: 'Jun 2024 — Nov 2024',
    icon: 'edit',
    highlight: 'UniEvent',
    titleRest: 'completed UI/UX Design Internship (EventFlow)',
    desc: 'Designed user-focused digital experiences and translated complex business requirements into clear, consistent interfaces for campus event ticketing platform (EventFlow). Completed internship in early November 2024.',
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
    date: 'Aug 2024 — Jan 2025',
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
    { id: 'e-m1', title: 'Milestone: UniEvent (UI/UX Intern - Nov 2024)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'e-m2', title: 'Milestone: HAckeThor Winner (🏆 1st)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'e-m3', title: 'Milestone: Assemble (Operations & UX)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'e-m4', title: 'Milestone: Udemy Masterclass Credential', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'e-m5', title: 'Milestone: CodeSrijan (Organizing Lead)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'e-m6', title: 'Milestone: Code Conquerors (🥈 2nd)', type: 'component', indent: 2, visible: true, locked: false },
    { id: 'e-m7', title: 'Milestone: Knaptix Ventures (Intern)', type: 'component', indent: 2, visible: true, locked: false },
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
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'projects' | 'experience' | 'about' | 'resume' | 'process' | 'plugins'
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
    'work-codesrijan': { x: 40, y: 80, w: 360, h: 440, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'work-eventflow': { x: 430, y: 80, w: 360, h: 440, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'work-landing': { x: 820, y: 80, w: 360, h: 440, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'work-saas': { x: 40, y: 550, w: 360, h: 440, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'exp-imagine': { x: 60, y: 80, w: 420, h: 220, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'exp-knaptix': { x: 540, y: 30, w: 420, h: 220, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'exp-udemy': { x: 540, y: 280, w: 420, h: 220, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'exp-infosys': { x: 60, y: 330, w: 420, h: 220, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'about-avatar': { x: 510, y: 310, w: 220, h: 220, radius: 110, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 2, opacity: 100 },
    'about-strengths': { x: 40, y: 40, w: 360, h: 260, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'about-weaknesses': { x: 840, y: 40, w: 360, h: 260, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'about-philosophy': { x: 40, y: 440, w: 360, h: 260, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'about-toolkit': { x: 840, y: 440, w: 360, h: 260, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'about-education': { x: 440, y: 600, w: 360, h: 240, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'process-p1': { x: 40, y: 80, w: 380, h: 560, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'process-p2': { x: 480, y: 80, w: 380, h: 560, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'process-p3': { x: 920, y: 80, w: 380, h: 560, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'process-p4': { x: 1360, y: 80, w: 380, h: 560, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'process-p5': { x: 1800, y: 80, w: 380, h: 560, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'process-p6': { x: 2240, y: 80, w: 380, h: 560, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 },
    'resume-artboard': { x: 40, y: 40, w: 920, h: 1180, radius: 16, fill: '#2c2c2c', stroke: '#0d99ff', strokeWidth: 1, opacity: 100 }
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

  const handleSelectNode = (id, label, type) => {
    setSelectedNodeId(id);
    setSelectedLayerId(id);
    setSelectedNodeLabel(label);
    setSelectedNodeType(type);
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
    if (key === 'x') setFrameX(val);
    if (key === 'y') setFrameY(val);
    if (key === 'w') setFrameW(val);
    if (key === 'h') setFrameH(val);
    if (key === 'radius') setFrameRadius(val);
    if (key === 'fill') setFillColor(val);
    if (key === 'stroke') setStrokeColor(val);
    if (key === 'strokeWidth') setStrokeWidth(val);
    if (key === 'opacity') setLayerOpacity(val);
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
      case 'about': return { width: 1340, height: 940 };
      case 'resume': return { width: 1100, height: 1420 };
      case 'process': return { width: 1360, height: 960 };
      case 'plugins': return { width: 1300, height: 980 };
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
                  style={{
                    width: `${frameW}px`,
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('work-artboard', 'Work & Case Studies Artboard', 'Frame');
                  }}
                >
                  <div className="figma-artboard-header-tag">
                    <span className="artboard-hash">#</span>
                    <span className="artboard-name">Work & Case Studies</span>
                    <span className="artboard-dims">[1340 × 960]</span>
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
                            borderRadius: props.radius ? `${props.radius}px` : undefined,
                            backgroundColor: props.fill || undefined,
                            borderColor: props.stroke || undefined,
                            borderWidth: props.strokeWidth ? `${props.strokeWidth}px` : undefined,
                            opacity: props.opacity !== undefined ? props.opacity / 100 : undefined
                          }}
                        >
                          {isSelected && (
                            <div className="figma-selection-overlay">
                              <div className="selection-tag">❖ {proj.name} [{props.w || 360}×{props.h || 440}]</div>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('exp-artboard', 'Recent Activity & Timeline Frame', 'Frame');
                  }}
                >
                  <div className="figma-artboard-header-tag">
                    <span className="artboard-hash">#</span>
                    <span className="artboard-name">Recent Activity &amp; Career Timeline</span>
                    <span className="artboard-dims">[1240 × 1360]</span>
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
                                handleSelectNode(expNodeId, item.highlight, 'Frame');
                              }}
                              style={{
                                borderRadius: props.radius ? `${props.radius}px` : undefined,
                                backgroundColor: props.fill || undefined,
                                borderColor: props.stroke || undefined,
                                borderWidth: props.strokeWidth ? `${props.strokeWidth}px` : undefined,
                                opacity: props.opacity !== undefined ? props.opacity / 100 : undefined
                              }}
                            >
                              {isSelected && (
                                <div className="figma-selection-overlay">
                                  <div className="selection-tag">❖ {item.highlight} [{props.w || 420}×{props.h || 220}]</div>
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
              VIEW 4: ABOUT (Infinite Canvas Radial Traits with Image 3 Connectors)
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
                {/* Framed Artboard Box for About */}
                <div
                  className={`figma-artboard-box about-artboard-box figma-selectable-node ${selectedNodeId === 'about-artboard' ? 'is-selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('about-artboard', 'About Varun Sehgal Frame', 'Frame');
                  }}
                >
                  <div className="figma-artboard-header-tag">
                    <span className="artboard-hash">#</span>
                    <span className="artboard-name">About Varun Sehgal</span>
                    <span className="artboard-dims">[1340 × 940]</span>
                  </div>

                  {selectedNodeId === 'about-artboard' && (
                    <div className="figma-selection-overlay">
                      <div className="selection-tag">❖ About Varun Sehgal [1340×940]</div>
                      <div className="selection-handle tl" /><div className="selection-handle tr" />
                      <div className="selection-handle bl" /><div className="selection-handle br" />
                    </div>
                  )}

                  <header className="view-page-header">
                    <div className="about-header-flex">
                      <div>
                        <h1 className="view-page-title">About Varun Sehgal</h1>
                        <p className="view-page-desc">Design philosophy, superpowers, growth vectors, and architectural toolkit.</p>
                      </div>
                    </div>
                  </header>

                  <div className="about-radial-canvas-container">
                    {/* SVG Radiating Curved Dashed Connectors Layer with Gradient Glow */}
                    <svg className="about-connector-svg-layer" viewBox="0 0 1240 860" fill="none">
                      <defs>
                        <linearGradient id="aboutGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                        <linearGradient id="aboutGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#fbbf24" />
                        </linearGradient>
                        <linearGradient id="aboutGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#818cf8" />
                        </linearGradient>
                        <linearGradient id="aboutGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                        <linearGradient id="aboutGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>

                      {/* Path 1: Center -> Top Left (Core Strengths) */}
                      <path
                        d="M 520,380 C 440,380 400,280 400,200"
                        stroke="url(#aboutGrad1)"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                      />
                      <circle cx="400" cy="200" r="5" fill="#34d399" />

                      {/* Path 2: Center -> Top Right (Weaknesses & Growth Vectors) */}
                      <path
                        d="M 720,380 C 800,380 840,280 840,200"
                        stroke="url(#aboutGrad2)"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                      />
                      <circle cx="840" cy="200" r="5" fill="#fbbf24" />

                      {/* Path 3: Center -> Bottom Left (Design Philosophy) */}
                      <path
                        d="M 520,460 C 440,460 400,520 400,580"
                        stroke="url(#aboutGrad3)"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                      />
                      <circle cx="400" cy="580" r="5" fill="#818cf8" />

                      {/* Path 4: Center -> Bottom Right (Technical Stack) */}
                      <path
                        d="M 720,460 C 800,460 840,520 840,580"
                        stroke="url(#aboutGrad4)"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                      />
                      <circle cx="840" cy="580" r="5" fill="#38bdf8" />

                      {/* Path 5: Center -> Bottom Center (Education & Hackathons) */}
                      <path
                        d="M 620,530 C 620,560 620,580 620,600"
                        stroke="url(#aboutGrad5)"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                      />
                      <circle cx="620" cy="600" r="5" fill="#ec4899" />
                    </svg>

                    {/* 1. Recreated Interactive Center Designer Cockpit / Hub */}
                    <div
                      className={`about-center-avatar-node recreated-center-hub figma-selectable-node ${selectedNodeId === 'about-avatar' ? 'is-selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectNode('about-avatar', 'Varun_Designer_Core_Hub', 'Component');
                      }}
                      style={{
                        borderRadius: nodeProps['about-avatar']?.radius ? `${nodeProps['about-avatar'].radius}px` : undefined,
                        backgroundColor: nodeProps['about-avatar']?.fill || undefined,
                        borderColor: nodeProps['about-avatar']?.stroke || undefined,
                        opacity: nodeProps['about-avatar']?.opacity !== undefined ? nodeProps['about-avatar'].opacity / 100 : undefined
                      }}
                    >
                      {selectedNodeId === 'about-avatar' && (
                        <div className="figma-selection-overlay">
                          <div className="selection-tag">❖ Varun_Designer_Core_Hub [280×300]</div>
                          <div className="selection-handle tl" /><div className="selection-handle tr" />
                          <div className="selection-handle bl" /><div className="selection-handle br" />
                        </div>
                      )}

                      {/* Dual Concentric Orbital Rings */}
                      <div className="about-orbital-ring ring-outer">
                        <div className="orbit-particle p1" />
                        <div className="orbit-particle p2" />
                      </div>
                      <div className="about-orbital-ring ring-inner">
                        <div className="orbit-particle p3" />
                      </div>

                      {/* Center Avatar Orb */}
                      <div className="about-avatar-orb-container">
                        <div className="about-avatar-glow-ring" />
                        <img
                          src="/varun.jpg"
                          alt="Varun Sehgal"
                          className="about-avatar-img-recreated"
                          onError={(e) => { e.currentTarget.src = '/profile/varun.jpg'; }}
                        />
                        <div className="avatar-live-status-pill">
                          <span className="status-live-beacon" />
                          <span>Online in VarunOS</span>
                        </div>
                      </div>

                      {/* Identity & Specs Info */}
                      <div className="about-avatar-info-panel">
                        <h3 className="about-avatar-name-bold">Varun Sehgal</h3>
                        <div className="about-avatar-role-pill">
                          <span className="material-symbols-outlined text-[13px]">verified</span>
                          <span>Lead UI/UX &amp; Product Designer</span>
                        </div>

                        <div className="about-avatar-specs-row">
                          <span className="spec-token">3+ Yrs Exp</span>
                          <span className="spec-sep">•</span>
                          <span className="spec-token">10+ Releases</span>
                          <span className="spec-sep">•</span>
                          <span className="spec-token text-amber-300">1st HackThor</span>
                        </div>

                        {/* Interactive Radar Quick Chips */}
                        <div className="about-avatar-chips-grid">
                          <span
                            className="radar-chip"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectNode('about-strengths', 'Core Strengths', 'Frame');
                            }}
                          >
                            ⚡ Design Systems
                          </span>
                          <span
                            className="radar-chip"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectNode('about-philosophy', 'Design Philosophy', 'Frame');
                            }}
                          >
                            🧠 UX Psychology
                          </span>
                          <span
                            className="radar-chip"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectNode('about-technical', 'Technical Stack', 'Frame');
                            }}
                          >
                            📱 Prototyping
                          </span>
                          <span
                            className="radar-chip"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectNode('about-education', 'Education', 'Frame');
                            }}
                          >
                            🏆 Hackathons
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Top-Left: Core Strengths & Superpowers */}
                  <div
                    className={`about-trait-card figma-selectable-node ${selectedNodeId === 'about-strengths' ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode('about-strengths', 'Core_Strengths & Superpowers', 'Frame');
                    }}
                    style={{
                      left: '40px',
                      top: '40px',
                      width: `${nodeProps['about-strengths']?.w || 360}px`,
                      borderRadius: nodeProps['about-strengths']?.radius ? `${nodeProps['about-strengths'].radius}px` : undefined,
                      backgroundColor: nodeProps['about-strengths']?.fill || undefined,
                      borderColor: nodeProps['about-strengths']?.stroke || undefined,
                      borderWidth: nodeProps['about-strengths']?.strokeWidth ? `${nodeProps['about-strengths'].strokeWidth}px` : undefined,
                      opacity: nodeProps['about-strengths']?.opacity !== undefined ? nodeProps['about-strengths'].opacity / 100 : undefined
                    }}
                  >
                    {selectedNodeId === 'about-strengths' && (
                      <div className="figma-selection-overlay">
                        <div className="selection-tag">❖ Core_Strengths [360×260]</div>
                        <div className="selection-handle tl" />
                        <div className="selection-handle tr" />
                        <div className="selection-handle bl" />
                        <div className="selection-handle br" />
                      </div>
                    )}
                    <div className="about-trait-title text-[#34d399]">
                      <span className="material-symbols-outlined text-[17px]">bolt</span>
                      <span>Core Strengths & Superpowers</span>
                    </div>
                    <ul className="about-trait-list">
                      <li>⚡ <strong>Design Systems & Tokens:</strong> Architect of token studio pipelines with nested components and dark/light modes.</li>
                      <li>🎯 <strong>Frictionless UX Flows:</strong> Slashed transaction drop-off by 30% via 4-step optimized booking psychology.</li>
                      <li>🔮 <strong>Micro-Interactions:</strong> Authentic haptic springs, fluid physics, and interactive prototyping.</li>
                      <li>💻 <strong>Frontend Empathy:</strong> Understands React, CSS flex/grid, and dev handoff realities.</li>
                    </ul>
                  </div>

                  {/* 3. Top-Right: Weaknesses & Growth Vectors */}
                  <div
                    className={`about-trait-card figma-selectable-node ${selectedNodeId === 'about-weaknesses' ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode('about-weaknesses', 'Weaknesses & Growth Vectors', 'Frame');
                    }}
                    style={{
                      left: '840px',
                      top: '40px',
                      width: `${nodeProps['about-weaknesses']?.w || 360}px`,
                      borderRadius: nodeProps['about-weaknesses']?.radius ? `${nodeProps['about-weaknesses'].radius}px` : undefined,
                      backgroundColor: nodeProps['about-weaknesses']?.fill || undefined,
                      borderColor: nodeProps['about-weaknesses']?.stroke || undefined,
                      borderWidth: nodeProps['about-weaknesses']?.strokeWidth ? `${nodeProps['about-weaknesses'].strokeWidth}px` : undefined,
                      opacity: nodeProps['about-weaknesses']?.opacity !== undefined ? nodeProps['about-weaknesses'].opacity / 100 : undefined
                    }}
                  >
                    {selectedNodeId === 'about-weaknesses' && (
                      <div className="figma-selection-overlay">
                        <div className="selection-tag">❖ Weaknesses_Vectors [360×260]</div>
                        <div className="selection-handle tl" />
                        <div className="selection-handle tr" />
                        <div className="selection-handle bl" />
                        <div className="selection-handle br" />
                      </div>
                    )}
                    <div className="about-trait-title text-[#f59e0b]">
                      <span className="material-symbols-outlined text-[17px]">adjust</span>
                      <span>Weaknesses & Growth Vectors</span>
                    </div>
                    <ul className="about-trait-list">
                      <li>🔍 <strong>Sub-Pixel Perfectionism:</strong> Spends extra time aligning 1px sub-pixel grids before publishing drafts.</li>
                      <li>🚀 <strong>Reluctance for Raw Roughs:</strong> Dislikes showing half-baked wireframes; prefers quick hi-fi prototypes before review.</li>
                      <li>🌐 <strong>Edge-Case Maximalism:</strong> Tendency to design 15+ edge states for simple MVP prototypes.</li>
                      <li>📈 <strong>Growth Action:</strong> Actively practicing timeboxed rapid paper sketch iterations and public builds.</li>
                    </ul>
                  </div>

                  {/* 4. Bottom-Left: Design Philosophy */}
                  <div
                    className={`about-trait-card figma-selectable-node ${selectedNodeId === 'about-philosophy' ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode('about-philosophy', 'Design_Philosophy & Heuristics', 'Frame');
                    }}
                    style={{
                      left: '40px',
                      top: '450px',
                      width: `${nodeProps['about-philosophy']?.w || 360}px`,
                      borderRadius: nodeProps['about-philosophy']?.radius ? `${nodeProps['about-philosophy'].radius}px` : undefined,
                      backgroundColor: nodeProps['about-philosophy']?.fill || undefined,
                      borderColor: nodeProps['about-philosophy']?.stroke || undefined,
                      borderWidth: nodeProps['about-philosophy']?.strokeWidth ? `${nodeProps['about-philosophy'].strokeWidth}px` : undefined,
                      opacity: nodeProps['about-philosophy']?.opacity !== undefined ? nodeProps['about-philosophy'].opacity / 100 : undefined
                    }}
                  >
                    {selectedNodeId === 'about-philosophy' && (
                      <div className="figma-selection-overlay">
                        <div className="selection-tag">❖ Design_Philosophy [360×260]</div>
                        <div className="selection-handle tl" />
                        <div className="selection-handle tr" />
                        <div className="selection-handle bl" />
                        <div className="selection-handle br" />
                      </div>
                    )}
                    <div className="about-trait-title text-[#818cf8]">
                      <span className="material-symbols-outlined text-[17px]">lightbulb</span>
                      <span>Design Philosophy & Heuristics</span>
                    </div>
                    <ul className="about-trait-list">
                      <li>📐 <strong>Form Follows Frictionlessness:</strong> Aesthetic delight serves functional comprehension.</li>
                      <li>🧠 <strong>Cognitive Load Minimization:</strong> Chunking complex data so users never pause or guess.</li>
                      <li>🔄 <strong>Atomic Consistency:</strong> Strict adherence to design tokens across web, mobile, and desktop.</li>
                      <li>🧪 <strong>Continuous Validation:</strong> Rapid qualitative user interviews and telemetry feedback loops.</li>
                    </ul>
                  </div>

                  {/* 5. Bottom-Right: Technical Stack & Toolkit */}
                  <div
                    className={`about-trait-card figma-selectable-node ${selectedNodeId === 'about-toolkit' ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode('about-toolkit', 'Technical_Stack & Toolkit', 'Frame');
                    }}
                    style={{
                      left: '840px',
                      top: '450px',
                      width: `${nodeProps['about-toolkit']?.w || 360}px`,
                      borderRadius: nodeProps['about-toolkit']?.radius ? `${nodeProps['about-toolkit'].radius}px` : undefined,
                      backgroundColor: nodeProps['about-toolkit']?.fill || undefined,
                      borderColor: nodeProps['about-toolkit']?.stroke || undefined,
                      borderWidth: nodeProps['about-toolkit']?.strokeWidth ? `${nodeProps['about-toolkit'].strokeWidth}px` : undefined,
                      opacity: nodeProps['about-toolkit']?.opacity !== undefined ? nodeProps['about-toolkit'].opacity / 100 : undefined
                    }}
                  >
                    {selectedNodeId === 'about-toolkit' && (
                      <div className="figma-selection-overlay">
                        <div className="selection-tag">❖ Technical_Stack [360×260]</div>
                        <div className="selection-handle tl" />
                        <div className="selection-handle tr" />
                        <div className="selection-handle bl" />
                        <div className="selection-handle br" />
                      </div>
                    )}
                    <div className="about-trait-title text-[#38bdf8]">
                      <span className="material-symbols-outlined text-[17px]">terminal</span>
                      <span>Technical & Creative Arsenal</span>
                    </div>
                    <ul className="about-trait-list">
                      <li>🎨 <strong>Design Tools:</strong> Figma, Tokens Studio, Framer, FigJam, Adobe Illustrator.</li>
                      <li>⚡ <strong>Frontend Engineering:</strong> React.js, Tailwind CSS, TypeScript, Vite, Next.js.</li>
                      <li>🤖 <strong>AI Prototyping:</strong> Cursor, Antigravity IDE, Claude, Ollama local LLMs.</li>
                      <li>📊 <strong>Handoff & Specs:</strong> Auto Layout 5.0, Git version control, Figma Inspect.</li>
                    </ul>
                  </div>

                  {/* 6. Bottom-Center: Education & Hackathons */}
                  <div
                    className={`about-trait-card figma-selectable-node ${selectedNodeId === 'about-education' ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode('about-education', 'Education & Hackathons', 'Frame');
                    }}
                    style={{
                      left: '440px',
                      top: '600px',
                      width: `${nodeProps['about-education']?.w || 360}px`,
                      borderRadius: nodeProps['about-education']?.radius ? `${nodeProps['about-education'].radius}px` : undefined,
                      backgroundColor: nodeProps['about-education']?.fill || undefined,
                      borderColor: nodeProps['about-education']?.stroke || undefined,
                      borderWidth: nodeProps['about-education']?.strokeWidth ? `${nodeProps['about-education'].strokeWidth}px` : undefined,
                      opacity: nodeProps['about-education']?.opacity !== undefined ? nodeProps['about-education'].opacity / 100 : undefined
                    }}
                  >
                    {selectedNodeId === 'about-education' && (
                      <div className="figma-selection-overlay">
                        <div className="selection-tag">❖ Education_Hackathons [360×240]</div>
                        <div className="selection-handle tl" />
                        <div className="selection-handle tr" />
                        <div className="selection-handle bl" />
                        <div className="selection-handle br" />
                      </div>
                    )}
                    <div className="about-trait-title text-[#ec4899]">
                      <span className="material-symbols-outlined text-[17px]">school</span>
                      <span>Education & Hackathon Honors</span>
                    </div>
                    <ul className="about-trait-list">
                      <li>🎓 <strong>JUET B.Tech CSE:</strong> Jaypee University of Eng. & Tech. (2023–2027).</li>
                      <li>🏆 <strong>HAckeThor Winner:</strong> 1st Place National Hackathon Winner by Unstop.</li>
                      <li>⚡ <strong>CodeSrijan Organizer:</strong> Led UI/UX & identity for 200+ participants.</li>
                      <li>🎖️ <strong>Imagine Hackathon:</strong> Top National Finalist for collaborative design.</li>
                    </ul>
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
                {/* Framed Artboard Box for Resume */}
                <div
                  className={`figma-artboard-box resume-artboard-box figma-selectable-node ${selectedNodeId === 'resume-artboard' ? 'is-selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('resume-artboard', 'Tactile_Creative_Resume', 'Frame');
                  }}
                >
                  <div className="figma-artboard-header-tag">
                    <span className="artboard-hash">#</span>
                    <span className="artboard-name">Creative Tactile Resume — Varun Sehgal</span>
                    <span className="artboard-dims">[1100 × 1420]</span>
                  </div>

                  {selectedNodeId === 'resume-artboard' && (
                    <div className="figma-selection-overlay">
                      <div className="selection-tag">❖ Creative_Tactile_Resume [1100×1420]</div>
                      <div className="selection-handle tl" /><div className="selection-handle tr" />
                      <div className="selection-handle bl" /><div className="selection-handle br" />
                    </div>
                  )}

                  {/* Tactile Grid Paper Canvas (Pixel-perfect match to user reference Image 3) */}
                  <div className="tactile-resume-paper-sheet">
                    {/* Metal binder clips at top edges */}
                    <div className="binder-clip-top-left" />
                    <div className="binder-clip-top-right" />

                    {/* TOP ROW: Pinned ID Badge + Handwritten Note */}
                    <div className="tactile-resume-top-row">
                      {/* 1. Left Pinned ID Card with Metal Paperclip */}
                      <div className="tactile-id-badge-card">
                        {/* SVG Metal Paperclip */}
                        <div className="metal-paperclip-graphic">
                          <svg viewBox="0 0 32 64" fill="none">
                            <path
                              d="M 16,4 C 24,4 28,10 28,20 L 28,48 C 28,56 22,60 16,60 C 10,60 4,56 4,48 L 4,16 C 4,10 8,6 14,6 C 20,6 22,10 22,16 L 22,46 C 22,50 18,52 16,52 C 14,52 10,50 10,46 L 10,20"
                              stroke="#a1a1aa"
                              strokeWidth="3.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>

                        {/* Yellow Photo Block */}
                        <div className="id-photo-yellow-block">
                          <img
                            src="/varun.jpg"
                            alt="Varun Sehgal"
                            className="id-photo-img"
                            onError={(e) => { e.currentTarget.src = '/profile/varun.jpg'; }}
                          />
                        </div>

                        {/* ID Card Details */}
                        <div className="id-card-details">
                          <h2 className="id-card-name">Varun Sehgal</h2>
                          <p className="id-card-tagline">
                            I craft friction-free product experiences from design systems to hi-fi interactive prototypes through user psychology and code.
                          </p>

                          <div className="id-card-meta-table">
                            <div className="meta-cell"><span className="meta-k">DOB:</span> <span className="meta-v">02.10.2003</span></div>
                            <div className="meta-cell"><span className="meta-k">LOC:</span> <span className="meta-v">Bengaluru / Remote</span></div>
                            <div className="meta-cell"><span className="meta-k">📞</span> <span className="meta-v">+91 9399361193</span></div>
                            <div className="meta-cell"><span className="meta-k">✉️</span> <a href="mailto:varun.sehgal02@gmail.com" className="meta-v">varun.sehgal02@gmail.com</a></div>
                            <div className="meta-cell full"><span className="meta-k">Portfolio:</span> <a href="https://varunsehgal.runs-on.dev" target="_blank" rel="noreferrer" className="meta-v">varunsehgal.runs-on.dev</a></div>
                            <div className="meta-cell full"><span className="meta-k">Lang:</span> <span className="meta-v">English (Fluent) • Hindi (Native)</span></div>
                          </div>
                        </div>

                        {/* QR Code with vertical label */}
                        <div className="id-card-qr-box">
                          <div className="qr-vertical-tag">portfolio</div>
                          <img src="/qr.png" alt="Portfolio QR" className="id-qr-img" onError={(e) => { e.currentTarget.src = '/qr.png'; }} />
                        </div>
                      </div>

                      {/* 2. Top-Right Playful Handwritten Note with Red Doodle Arrow */}
                      <div className="tactile-handwritten-note">
                        <p className="handwritten-script-text">
                          Please don't hesitate to <span className="handwritten-circle">reach me</span> if this resume doesn't provide enough clarification
                        </p>

                        {/* Hand-drawn doodle arrow SVG */}
                        <svg className="handwritten-doodle-arrow" viewBox="0 0 100 50" fill="none">
                          <path d="M 10,10 Q 50,45 85,25" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                          <path d="M 75,18 L 86,25 L 78,34" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>

                        <div className="handwritten-contact-links">
                          <div className="handwritten-item">
                            <span className="material-symbols-outlined text-[15px] text-red-500">call</span>
                            <span className="font-mono text-xs text-zinc-800 font-semibold">+91 9399361193</span>
                          </div>
                          <div className="handwritten-item underline-red">
                            <span className="text-red-500 font-bold font-mono text-xs">in</span>
                            <a href="https://linkedin.com/in/varunsehgal02" target="_blank" rel="noreferrer" className="text-xs font-mono text-zinc-800 font-semibold">
                              linkedin.com/in/varunsehgal02
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* MAIN 2-COLUMN GRID */}
                    <div className="tactile-resume-grid">
                      {/* LEFT COLUMN: Work Experiences & Education */}
                      <div className="tactile-column-left">
                        {/* SECTION 1: Work Experiences */}
                        <div className="tactile-section">
                          <h3 className="highlighter-heading yellow-marker">
                            <span className="highlighter-text">Work Experiences</span>
                          </h3>

                          <div className="tactile-timeline">
                            {/* Job 1 */}
                            <div className="tactile-timeline-item">
                              <div className="timeline-bullet-hollow" />
                              <div className="timeline-time-row">Sep 2024 — Nov 2024 • 6 mos</div>
                              <h4 className="timeline-job-role">UI/UX Designer Intern</h4>
                              <div className="timeline-company-row">
                                <span className="font-bold text-zinc-900">UniEvent (EventFlow)</span>
                                <span className="text-zinc-500">•</span>
                                <span className="highlighter-badge-green">Full-time</span>
                              </div>
                              <div className="timeline-loc-text">Bengaluru, Karnataka, India (Remote)</div>
                              <p className="timeline-bullet-desc">
                                Designed campus event ticketing platform (EventFlow). Slashed transaction drop-off by 30% across 4-step booking workflow across 50+ components.
                              </p>
                            </div>

                            {/* Job 2 */}
                            <div className="tactile-timeline-item">
                              <div className="timeline-bullet-hollow" />
                              <div className="timeline-time-row">Aug 2024 — Jan 2025 • 6 mos</div>
                              <h4 className="timeline-job-role">Assistant Head of Operations / UI/UX Intern</h4>
                              <div className="timeline-company-row">
                                <span className="font-bold text-zinc-900">Assemble</span>
                                <span className="text-zinc-500">•</span>
                                <span className="highlighter-badge-green">Full-time</span>
                              </div>
                              <div className="timeline-loc-text">Remote</div>
                              <p className="timeline-bullet-desc">
                                Designed collaborative creator workspace tools and interaction prototypes in Figma. Coordinated operations for multi-team competitions.
                              </p>
                            </div>

                            {/* Job 3 */}
                            <div className="tactile-timeline-item">
                              <div className="timeline-bullet-hollow" />
                              <div className="timeline-time-row">Jun 2024 — Aug 2024 • 3 mos</div>
                              <h4 className="timeline-job-role">UI/UX Designer Intern</h4>
                              <div className="timeline-company-row">
                                <span className="font-bold text-zinc-900">Knaptix Ventures</span>
                                <span className="text-zinc-500">•</span>
                                <span className="highlighter-badge-green">Internship</span>
                              </div>
                              <div className="timeline-loc-text">Remote</div>
                              <p className="timeline-bullet-desc">
                                Delivered brand identities and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* SECTION 2: Education */}
                        <div className="tactile-section mt-6">
                          <h3 className="highlighter-heading yellow-marker">
                            <span className="highlighter-text">Education</span>
                          </h3>

                          <div className="tactile-timeline">
                            <div className="tactile-timeline-item">
                              <div className="timeline-bullet-hollow" />
                              <div className="timeline-time-row">2023 — 2027</div>
                              <h4 className="timeline-job-role">Jaypee University of Engineering &amp; Technology</h4>
                              <div className="timeline-company-row">
                                <span className="font-bold text-zinc-900">B.Tech in Computer Science &amp; Engineering</span>
                                <span className="text-zinc-500">•</span>
                                <span className="highlighter-badge-green">CGPA 8.5</span>
                              </div>
                              <div className="timeline-loc-text">Guna, Madhya Pradesh, India</div>
                            </div>

                            <div className="tactile-timeline-item">
                              <div className="timeline-bullet-hollow" />
                              <div className="timeline-time-row">Hackathons &amp; Honors</div>
                              <h4 className="timeline-job-role">🏆 HACKeThor Winner (1st Place National Hackathon by Unstop)</h4>
                              <div className="timeline-company-row">
                                <span className="font-bold text-zinc-900">CodeSrijan Organizer (Lead UI/UX for 200+ hackers)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT COLUMN: Area of Expertise (Stickers) & Software Skills */}
                      <div className="tactile-column-right">
                        {/* SECTION 3: Area of Expertise (Tilted Stickers) */}
                        <div className="tactile-section">
                          <h3 className="highlighter-heading yellow-marker">
                            <span className="highlighter-text">Area of Expertise</span>
                          </h3>

                          <div className="stickers-cluster-box">
                            {/* Tape 1 */}
                            <div className="sticker-tape-kraft">
                              <span className="material-symbols-outlined text-[16px]">campaign</span>
                              <span>PROMOTIONAL DESIGN</span>
                            </div>

                            {/* Torn Paper 2 */}
                            <div className="sticker-torn-green">
                              <span>EDITORIAL &amp; DESIGN SYSTEMS</span>
                            </div>

                            {/* Red Triangle 3 */}
                            <div className="sticker-triangle-red">
                              <span className="triangle-inner-pill">UI DESIGN</span>
                            </div>

                            {/* Cyan Circle 4 */}
                            <div className="sticker-circle-cyan">
                              <div className="scribble-circle-lines" />
                              <span>MOTION GRAPHICS</span>
                            </div>

                            {/* Pill 5 */}
                            <div className="sticker-pill-indigo">
                              <span>⚡ AI UX &amp; PROTOTYPING</span>
                            </div>
                          </div>
                        </div>

                        {/* SECTION 4: Software Skills (Folders with Level Bars) */}
                        <div className="tactile-section mt-8">
                          <h3 className="highlighter-heading yellow-marker">
                            <span className="highlighter-text">Software Skills</span>
                          </h3>

                          <div className="software-skills-grid">
                            <div className="skill-folder-card">
                              <div className="skill-folder-tab" style={{ background: '#300060' }}>
                                <span className="font-bold text-xs text-purple-200">Ae</span>
                              </div>
                              <span className="skill-folder-name">After Effects</span>
                              <div className="skill-battery-bar">
                                <div className="battery-fill" style={{ width: '85%', background: '#9333ea' }} />
                              </div>
                            </div>

                            <div className="skill-folder-card">
                              <div className="skill-folder-tab" style={{ background: '#00005b' }}>
                                <span className="font-bold text-xs text-indigo-200">Pr</span>
                              </div>
                              <span className="skill-folder-name">Premiere Pro</span>
                              <div className="skill-battery-bar">
                                <div className="battery-fill" style={{ width: '80%', background: '#6366f1' }} />
                              </div>
                            </div>

                            <div className="skill-folder-card">
                              <div className="skill-folder-tab" style={{ background: '#001e36' }}>
                                <span className="font-bold text-xs text-sky-200">Ps</span>
                              </div>
                              <span className="skill-folder-name">Photoshop</span>
                              <div className="skill-battery-bar">
                                <div className="battery-fill" style={{ width: '92%', background: '#0284c7' }} />
                              </div>
                            </div>

                            <div className="skill-folder-card">
                              <div className="skill-folder-tab" style={{ background: '#330000' }}>
                                <span className="font-bold text-xs text-orange-200">Ai</span>
                              </div>
                              <span className="skill-folder-name">Illustrator</span>
                              <div className="skill-battery-bar">
                                <div className="battery-fill" style={{ width: '88%', background: '#ea580c' }} />
                              </div>
                            </div>

                            <div className="skill-folder-card">
                              <div className="skill-folder-tab" style={{ background: '#1e1e1e' }}>
                                <span className="font-bold text-xs text-emerald-300">❖</span>
                              </div>
                              <span className="skill-folder-name">Figma</span>
                              <div className="skill-battery-bar">
                                <div className="battery-fill" style={{ width: '98%', background: '#10b981' }} />
                              </div>
                            </div>

                            <div className="skill-folder-card">
                              <div className="skill-folder-tab" style={{ background: '#082f49' }}>
                                <span className="font-bold text-xs text-cyan-300">⚛</span>
                              </div>
                              <span className="skill-folder-name">React / Next</span>
                              <div className="skill-battery-bar">
                                <div className="battery-fill" style={{ width: '90%', background: '#06b6d4' }} />
                              </div>
                            </div>

                            <div className="skill-folder-card">
                              <div className="skill-folder-tab" style={{ background: '#0c4a6e' }}>
                                <span className="font-bold text-xs text-teal-300">≈</span>
                              </div>
                              <span className="skill-folder-name">Tailwind CSS</span>
                              <div className="skill-battery-bar">
                                <div className="battery-fill" style={{ width: '95%', background: '#14b8a6' }} />
                              </div>
                            </div>

                            <div className="skill-folder-card">
                              <div className="skill-folder-tab" style={{ background: '#172554' }}>
                                <span className="font-bold text-xs text-blue-300">TS</span>
                              </div>
                              <span className="skill-folder-name">TypeScript</span>
                              <div className="skill-battery-bar">
                                <div className="battery-fill" style={{ width: '85%', background: '#3b82f6' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 6: PROCESS (Infinite Canvas Left-to-Right Horizontal Flow)
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
                {/* Framed Artboard Box for Process */}
                <div
                  className={`figma-artboard-box process-artboard-box figma-selectable-node ${selectedNodeId === 'process-artboard' ? 'is-selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('process-artboard', 'Process & Methodology Frame', 'Frame');
                  }}
                >
                  <div className="figma-artboard-header-tag">
                    <span className="artboard-hash">#</span>
                    <span className="artboard-name">Process &amp; Design Methodology Flow</span>
                    <span className="artboard-dims">[1360 × 960]</span>
                  </div>

                  {selectedNodeId === 'process-artboard' && (
                    <div className="figma-selection-overlay">
                      <div className="selection-tag">❖ Process_Methodology_Flow [1360×960]</div>
                      <div className="selection-handle tl" /><div className="selection-handle tr" />
                      <div className="selection-handle bl" /><div className="selection-handle br" />
                    </div>
                  )}

                  <header className="view-page-header">
                    <div className="about-header-flex">
                      <div>
                        <h1 className="view-page-title">Process &amp; Methodology</h1>
                        <p className="view-page-desc">Dynamic non-linear UX workflow: from discovery, mental models, and design tokens to verified telemetry handoff.</p>
                      </div>
                    </div>
                  </header>

                  {/* 2-Tier S-Curve Flow (Non-straight, fits comfortably inside the Frame Box with Notes) */}
                  <div className="process-scurve-canvas">
                    {/* SVG Bezier Flow Pipeline between Phases */}
                    <svg className="process-flow-svg-overlay" viewBox="0 0 1260 760" fill="none">
                      <defs>
                        <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0d99ff" />
                          <stop offset="100%" stopColor="#c084fc" />
                        </linearGradient>
                        <linearGradient id="flowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#c084fc" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                        <linearGradient id="flowLoopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="50%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#fb923c" />
                        </linearGradient>
                        <linearGradient id="flowGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#fb923c" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                        <linearGradient id="flowGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>

                      {/* Path 1 -> 2 */}
                      <path d="M 370,180 C 410,180 430,180 470,180" stroke="url(#flowGrad1)" strokeWidth="3" strokeDasharray="6 6" />
                      <circle cx="470" cy="180" r="5" fill="#c084fc" />

                      {/* Path 2 -> 3 */}
                      <path d="M 830,180 C 870,180 890,180 930,180" stroke="url(#flowGrad2)" strokeWidth="3" strokeDasharray="6 6" />
                      <circle cx="930" cy="180" r="5" fill="#38bdf8" />

                      {/* S-Curve Loop Dropping from Row 1 to Row 2 */}
                      <path d="M 1120,240 C 1240,240 1240,460 1120,460" stroke="url(#flowLoopGrad)" strokeWidth="3.5" strokeDasharray="6 6" />
                      <circle cx="1120" cy="460" r="5" fill="#fb923c" />

                      {/* Path 4 -> 5 -> 6 */}
                      <path d="M 470,520 C 430,520 410,520 370,520" stroke="url(#flowGrad3)" strokeWidth="3" strokeDasharray="6 6" />
                      <circle cx="370" cy="520" r="5" fill="#fb923c" />

                      <path d="M 930,520 C 890,520 870,520 830,520" stroke="url(#flowGrad4)" strokeWidth="3" strokeDasharray="6 6" />
                      <circle cx="830" cy="520" r="5" fill="#10b981" />
                    </svg>

                    {/* TOP TIER: Discovery, Architecture, Wireframing */}
                    <div className="process-tier-row top-tier">
                      {/* Phase 01: Ideation & Framing */}
                      <div className="process-step-card phase-1">
                        <div className="phase-badge-pill text-[#0d99ff]">Phase 01</div>
                        <h3 className="step-title">Ideation &amp; Problem Framing</h3>
                        <p className="step-desc">Mapping the chaotic void. Conducting stakeholder interviews, user empathy maps, and competitive UX audits.</p>
                        <div className="step-deliverables-pill">
                          <span className="material-symbols-outlined text-[13px]">lightbulb</span>
                          <span>User Personas &amp; Journey Maps</span>
                        </div>

                        {/* Pinned Critique Sticky Note 1 */}
                        <div className="process-sticky-pinned sticky-yellow note-pos-1">
                          <div className="sticky-tape-stamp" />
                          <p>💡 <strong>Note:</strong> Start with raw low-fi roughs before jumping to hi-fi polish.</p>
                        </div>
                      </div>

                      {/* Phase 02: Information Architecture */}
                      <div className="process-step-card phase-2">
                        <div className="phase-badge-pill text-[#c084fc]">Phase 02</div>
                        <h3 className="step-title">Architecture &amp; User Flows</h3>
                        <p className="step-desc">Synthesizing mental models, edge-case routing, checkout pipelines, and sitemaps.</p>
                        <div className="step-deliverables-pill">
                          <span className="material-symbols-outlined text-[13px]">schema</span>
                          <span>Task Flows &amp; IA Trees</span>
                        </div>

                        {/* Pinned Critique Sticky Note 2 */}
                        <div className="process-sticky-pinned sticky-cyan note-pos-2">
                          <div className="sticky-tape-stamp" />
                          <p>📌 <strong>Heuristic:</strong> 4-step booking flow slashed drop-offs by 30%.</p>
                        </div>
                      </div>

                      {/* Phase 03: Wireframing */}
                      <div className="process-step-card phase-3">
                        <div className="phase-badge-pill text-[#38bdf8]">Phase 03</div>
                        <h3 className="step-title">Wireframing &amp; Structure</h3>
                        <p className="step-desc">Translating cognitive flows into layout scaffolds, visual hierarchy, and sub-pixel grid alignments.</p>
                        <div className="step-deliverables-pill">
                          <span className="material-symbols-outlined text-[13px]">grid_view</span>
                          <span>8pt Grid Layouts &amp; Roughs</span>
                        </div>

                        {/* Pinned Critique Sticky Note 3 */}
                        <div className="process-sticky-pinned sticky-pink note-pos-3">
                          <div className="sticky-tape-stamp" />
                          <p>⚡ <strong>Rule:</strong> Strict 8pt spatial rhythm across all viewports.</p>
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM TIER: Design Systems, Hi-Fi Prototyping, Production Handoff */}
                    <div className="process-tier-row bottom-tier">
                      {/* Phase 04: Design Systems & Tokens */}
                      <div className="process-step-card phase-4">
                        <div className="phase-badge-pill text-[#fb923c]">Phase 04</div>
                        <h3 className="step-title">Design System &amp; Tokens</h3>
                        <p className="step-desc">Building atomic component matrices, dark/light token palettes, typography ramps, and state variants in Tokens Studio.</p>
                        <div className="step-deliverables-pill">
                          <span className="material-symbols-outlined text-[13px]">layers</span>
                          <span>Tokens Studio &amp; Auto Layout 5.0</span>
                        </div>

                        {/* Pinned Critique Sticky Note 4 */}
                        <div className="process-sticky-pinned sticky-orange note-pos-4">
                          <div className="sticky-tape-stamp" />
                          <p>🎨 <strong>System:</strong> Nested components with dark/light mode token sync.</p>
                        </div>
                      </div>

                      {/* Phase 05: Prototyping */}
                      <div className="process-step-card phase-5">
                        <div className="phase-badge-pill text-[#a855f7]">Phase 05</div>
                        <h3 className="step-title">Hi-Fi Prototyping &amp; Springs</h3>
                        <p className="step-desc">Injecting authentic haptic feedback, fluid spring physics, interactive micro-states, and animated transitions.</p>
                        <div className="step-deliverables-pill">
                          <span className="material-symbols-outlined text-[13px]">animation</span>
                          <span>60fps Interactive Prototype</span>
                        </div>

                        {/* Pinned Critique Sticky Note 5 */}
                        <div className="process-sticky-pinned sticky-purple note-pos-5">
                          <div className="sticky-tape-stamp" />
                          <p>🎯 <strong>Testing:</strong> 200+ hackathon participants tested flow live.</p>
                        </div>
                      </div>

                      {/* Phase 06: Production Handoff */}
                      <div className="process-step-card phase-6">
                        <div className="phase-badge-pill text-[#10b981]">Phase 06</div>
                        <h3 className="step-title">Dev Handoff &amp; Telemetry</h3>
                        <p className="step-desc">Figma Inspect mode redlines, React/Tailwind component parity, zero layout shift, and live accessibility verification.</p>
                        <div className="step-deliverables-pill">
                          <span className="material-symbols-outlined text-[13px]">verified</span>
                          <span>React/Tailwind &amp; WCAG AA Pass</span>
                        </div>

                        {/* Pinned Critique Sticky Note 6 */}
                        <div className="process-sticky-pinned sticky-green note-pos-6">
                          <div className="sticky-tape-stamp" />
                          <p>🚀 <strong>Status:</strong> Zero layout shift &amp; 100% component parity.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 7: PLUGINS (Creative Figma Community Ecosystem & Direct Web Launch)
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
                {/* Framed Artboard Box for Plugins */}
                <div
                  className={`figma-artboard-box plugins-artboard-box figma-selectable-node ${selectedNodeId === 'plugins-artboard' ? 'is-selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('plugins-artboard', 'Figma Community Plugins Frame', 'Frame');
                  }}
                >
                  <div className="figma-artboard-header-tag">
                    <span className="artboard-hash">#</span>
                    <span className="artboard-name">Figma Community &amp; Creative Extensions Lab</span>
                    <span className="artboard-dims">[1300 × 980]</span>
                  </div>

                  {selectedNodeId === 'plugins-artboard' && (
                    <div className="figma-selection-overlay">
                      <div className="selection-tag">❖ Figma_Community_Plugins_Lab [1300×980]</div>
                      <div className="selection-handle tl" /><div className="selection-handle tr" />
                      <div className="selection-handle bl" /><div className="selection-handle br" />
                    </div>
                  )}

                  <header className="view-page-header">
                    <div className="about-header-flex">
                      <div>
                        <h1 className="view-page-title">Figma Community &amp; Creative Extensions</h1>
                        <p className="view-page-desc">Interactive testing bench and power-user toolkit for Tokens Studio, Stark, Magician AI, and AutoFlow.</p>
                      </div>
                    </div>
                  </header>

                  {/* CENTERPIECE: Interactive Creative Plugin Studio & Testing Lab */}
                  <div className="plugins-center-lab-container">
                    <div className="plugin-lab-header">
                      <div className="lab-title-group">
                        <span className="material-symbols-outlined text-sky-400 text-[20px]">science</span>
                        <h3 className="lab-title">Figma Plugin Testing Bench (Live Interactive Simulator)</h3>
                      </div>
                      <div className="lab-tabs-row">
                        <button
                          type="button"
                          className={`lab-tab-pill ${(!activeSimulatorPlugin || activeSimulatorPlugin.id === 'tokens') ? 'active' : ''}`}
                          onClick={() => setActiveSimulatorPlugin({ id: 'tokens', name: 'Tokens Studio for Figma' })}
                        >
                          <span className="material-symbols-outlined text-[14px]">palette</span>
                          <span>Tokens Studio</span>
                        </button>
                        <button
                          type="button"
                          className={`lab-tab-pill ${activeSimulatorPlugin?.id === 'magician' ? 'active' : ''}`}
                          onClick={() => setActiveSimulatorPlugin({ id: 'magician', name: 'Magician AI' })}
                        >
                          <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
                          <span>Magician AI</span>
                        </button>
                        <button
                          type="button"
                          className={`lab-tab-pill ${activeSimulatorPlugin?.id === 'stark' ? 'active' : ''}`}
                          onClick={() => setActiveSimulatorPlugin({ id: 'stark', name: 'Stark Accessibility' })}
                        >
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                          <span>Stark WCAG</span>
                        </button>
                        <button
                          type="button"
                          className={`lab-tab-pill ${activeSimulatorPlugin?.id === 'autoflow' ? 'active' : ''}`}
                          onClick={() => setActiveSimulatorPlugin({ id: 'autoflow', name: 'AutoFlow Diagrams' })}
                        >
                          <span className="material-symbols-outlined text-[14px]">schema</span>
                          <span>AutoFlow</span>
                        </button>
                      </div>
                    </div>

                    {/* Live Plugin Canvas Workbench */}
                    <div className="plugin-lab-workbench">
                      {/* 1. Tokens Studio Interactive Test Drive */}
                      {(!activeSimulatorPlugin || activeSimulatorPlugin.id === 'tokens') && (
                        <div className="lab-demo-pane tokens-demo">
                          <div className="demo-controls-sidebar">
                            <h4 className="demo-sidebar-heading">Active Design Tokens</h4>
                            <div className="token-control-group">
                              <label>Primary Brand Hue</label>
                              <div className="token-swatches-row">
                                {['#0d99ff', '#10b981', '#a855f7', '#f97316'].map(color => (
                                  <button
                                    key={color}
                                    type="button"
                                    className={`swatch-btn ${fillColor === color ? 'selected' : ''}`}
                                    style={{ background: color }}
                                    onClick={() => setFillColor(color)}
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="token-control-group">
                              <label>Corner Radius Scale</label>
                              <div className="token-pill-buttons">
                                {[4, 8, 16, 999].map(rad => (
                                  <button
                                    key={rad}
                                    type="button"
                                    className={`rad-btn ${frameRadius === rad ? 'selected' : ''}`}
                                    onClick={() => setFrameRadius(rad)}
                                  >
                                    {rad === 999 ? 'Pill' : `${rad}px`}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="demo-preview-stage">
                            <div
                              className="token-live-preview-card"
                              style={{
                                borderColor: fillColor,
                                borderRadius: `${frameRadius}px`,
                                boxShadow: `0 8px 32px ${fillColor}25`
                              }}
                            >
                              <div className="preview-badge" style={{ background: `${fillColor}20`, color: fillColor }}>
                                ❖ Auto-Synced Token
                              </div>
                              <h3 className="preview-card-title">Tokenized Component Matrix</h3>
                              <p className="preview-card-text">
                                When design tokens change in Tokens Studio, all nested Figma components and Tailwind classes update instantly with zero layout drift.
                              </p>
                              <button
                                type="button"
                                className="preview-action-btn"
                                style={{
                                  background: fillColor,
                                  borderRadius: `${frameRadius}px`
                                }}
                              >
                                Test-Drive Component
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. Magician AI Vector & Copy Lab */}
                      {activeSimulatorPlugin?.id === 'magician' && (
                        <div className="lab-demo-pane magician-demo">
                          <div className="magician-prompt-row">
                            <input
                              type="text"
                              defaultValue="High-conversion event booking badge"
                              className="magician-input-field"
                            />
                            <button
                              type="button"
                              className="magician-cast-btn"
                              onClick={() => showToast('✨ Magic Cast! Vector badge generated.')}
                            >
                              <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                              <span>Cast Magic</span>
                            </button>
                          </div>
                          <div className="magician-results-stage">
                            <div className="ai-result-badge">
                              <span className="material-symbols-outlined text-purple-400 text-[24px]">verified</span>
                              <div>
                                <h4 className="font-bold text-white text-sm">EventFlow Instant Access Pass</h4>
                                <p className="text-xs text-zinc-400">Zero drop-off guaranteed • Powered by Magician AI</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 3. Stark Accessibility Contrast Checker */}
                      {activeSimulatorPlugin?.id === 'stark' && (
                        <div className="lab-demo-pane stark-demo">
                          <div className="stark-telemetry-grid">
                            <div className="stark-metric-box">
                              <span className="stark-score-val text-emerald-400">16.4 : 1</span>
                              <span className="stark-score-lbl">Contrast Ratio (AAA Pass)</span>
                            </div>
                            <div className="stark-checks-list">
                              <div className="check-row">
                                <span className="text-emerald-400">✓</span>
                                <span>Normal Text (WCAG AAA)</span>
                              </div>
                              <div className="check-row">
                                <span className="text-emerald-400">✓</span>
                                <span>Large Text &amp; Icons (WCAG AAA)</span>
                              </div>
                              <div className="check-row">
                                <span className="text-emerald-400">✓</span>
                                <span>UI Components &amp; Graphical Objects (3.0:1 Pass)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 4. AutoFlow Diagram Connector */}
                      {activeSimulatorPlugin?.id === 'autoflow' && (
                        <div className="lab-demo-pane autoflow-demo">
                          <div className="autoflow-stage-preview">
                            <div className="flow-node node-a">Screen A: Event List</div>
                            <div className="flow-arrow-beam">
                              <span>➔ 4-Step Checkout ➔</span>
                            </div>
                            <div className="flow-node node-b">Screen B: QR Pass</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Filter Toolbar & Search */}
                  <div className="plugins-filter-toolbar mt-8">
                    <div className="activity-filter-pills">
                      {['All', 'AI & Automation', 'Diagramming', 'Accessibility', 'Content'].map(cat => (
                        <button
                          key={cat}
                          type="button"
                          className={`activity-filter-btn ${pluginCategory === cat ? 'active' : ''}`}
                          onClick={() => setPluginCategory(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="plugins-search-box">
                      <span className="material-symbols-outlined text-[16px] text-zinc-400">search</span>
                      <input
                        type="text"
                        placeholder="Search 8+ creative plugins..."
                        value={pluginSearch}
                        onChange={(e) => setPluginSearch(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Curated Community Plugins Grid */}
                  <div className="plugins-creative-grid">
                    {filteredPlugins.map(plugin => {
                      const pluginNodeId = `plugin-${plugin.id}`;
                      const isSelected = selectedNodeId === pluginNodeId;
                      return (
                        <div
                          key={plugin.id}
                          className={`plugin-creative-card figma-selectable-node ${isSelected ? 'is-selected' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectNode(pluginNodeId, plugin.name, 'Component');
                          }}
                        >
                          {isSelected && (
                            <div className="figma-selection-overlay">
                              <div className="selection-tag">❖ {plugin.name}</div>
                              <div className="selection-handle tl" /><div className="selection-handle tr" />
                              <div className="selection-handle bl" /><div className="selection-handle br" />
                            </div>
                          )}
                          <div
                            className="plugin-card-banner"
                            style={{ background: plugin.bannerGradient }}
                          >
                            <span className="plugin-banner-badge">{plugin.badge}</span>
                          </div>

                          <div className="plugin-card-body">
                            <div className="plugin-title-row">
                              <div className="plugin-icon-avatar">
                                <span className="material-symbols-outlined text-[20px]">{plugin.icon}</span>
                              </div>
                              <div className="plugin-names-wrap">
                                <h3 className="plugin-main-name">{plugin.name}</h3>
                                <p className="plugin-author-label">by {plugin.author}</p>
                              </div>
                            </div>

                            <p className="plugin-card-desc">{plugin.desc}</p>

                            <div className="flex flex-wrap gap-1 my-1">
                              {plugin.tags.map((t, idx) => (
                                <span key={idx} className="cert-id-badge">{t}</span>
                              ))}
                            </div>

                            <div className="plugin-stats-row">
                              <span>
                                <span className="material-symbols-outlined text-[13px] text-amber-400">star</span>
                                {plugin.rating}
                              </span>
                              <span>
                                <span className="material-symbols-outlined text-[13px]">download</span>
                                {plugin.installs} installs
                              </span>
                            </div>

                            <div className="plugin-card-actions">
                              <button
                                type="button"
                                className="plugin-test-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveSimulatorPlugin(plugin);
                                  showToast(`Testing ${plugin.name} in Lab!`);
                                }}
                              >
                                Test Drive Live
                              </button>
                              <a
                                href={plugin.link}
                                target="_blank"
                                rel="noreferrer"
                                className="plugin-run-btn"
                                onClick={() => {
                                  window.open(plugin.link, '_blank');
                                }}
                              >
                                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                <span>Open in Figma ↗</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Interactive Plugin Simulator Modal */}
              {activeSimulatorPlugin && (
                <div className="plugin-modal-overlay" onClick={() => setActiveSimulatorPlugin(null)}>
                  <div className="plugin-simulator-window" onClick={(e) => e.stopPropagation()}>
                    <div className="simulator-window-titlebar">
                      <div className="simulator-title-left">
                        <span className="material-symbols-outlined text-[16px] text-[#0d99ff]">
                          {activeSimulatorPlugin.icon}
                        </span>
                        <span>{activeSimulatorPlugin.name}</span>
                      </div>
                      <button
                        type="button"
                        className="simulator-close-btn"
                        onClick={() => setActiveSimulatorPlugin(null)}
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>

                    <div className="simulator-body">
                      {/* 1. STARK ACCESSIBILITY AUDIT */}
                      {activeSimulatorPlugin.id === 'stark' && (
                        <div>
                          <div className="text-[12px] font-semibold text-white mb-2">Live WCAG AA / AAA Contrast Checker</div>
                          <div className="simulator-result-box flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[12px] text-zinc-300">Background vs Text</span>
                              <span className="text-[15px] font-bold text-emerald-400">15.8 : 1 (AAA)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded border border-white/20" style={{ background: fillColor }}></div>
                              <span className="text-[11px] text-zinc-400 font-mono">Fill: {fillColor}</span>
                              <span className="text-zinc-600">/</span>
                              <div className="w-6 h-6 rounded bg-white border border-white/20"></div>
                              <span className="text-[11px] text-zinc-400 font-mono">Text: #FFFFFF</span>
                            </div>
                            <div className="flex gap-2 text-[10px] font-semibold">
                              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Normal Text: PASS AAA</span>
                              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Large Text: PASS AAA</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. FIGMA MAGICIAN AI */}
                      {activeSimulatorPlugin.id === 'magician' && (
                        <div>
                          <div className="text-[12px] font-semibold text-white mb-2">Multimodal Generative Copy & Icons</div>
                          <div className="simulator-result-box flex flex-col gap-2">
                            <span className="text-[11px] text-zinc-400">Prompt: "High-converting SaaS CTA"</span>
                            <div className="p-2 rounded bg-white/5 border border-white/10 text-[12px] text-white">
                              ⚡ "Experience Seamless Event Ticketing — Start in 30 Seconds"
                            </div>
                            <div className="flex gap-2 mt-1">
                              <span className="cert-id-badge cursor-pointer hover:border-white">Variant A: Claim Pass</span>
                              <span className="cert-id-badge cursor-pointer hover:border-white">Variant B: Reserve Now</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 3. CONTENT REEL */}
                      {activeSimulatorPlugin.id === 'contentreel' && (
                        <div>
                          <div className="text-[12px] font-semibold text-white mb-2">Persona & Dummy Data Injector</div>
                          <div className="simulator-result-box flex flex-col gap-2">
                            <div className="flex items-center gap-3 p-2 rounded bg-white/5">
                              <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center text-[12px] font-bold text-white">VS</div>
                              <div>
                                <div className="text-[12px] font-bold text-white">Varun Sehgal</div>
                                <div className="text-[10px] text-zinc-400">Lead Product Designer • Bangalore</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded bg-white/5">
                              <div className="w-8 h-8 rounded-full bg-pink-500/30 flex items-center justify-center text-[12px] font-bold text-white">AR</div>
                              <div>
                                <div className="text-[12px] font-bold text-white">Anya Rao</div>
                                <div className="text-[10px] text-zinc-400">Senior UX Researcher • San Francisco</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 4. AUTOFLOW */}
                      {activeSimulatorPlugin.id === 'autoflow' && (
                        <div>
                          <div className="text-[12px] font-semibold text-white mb-2">Smart Connector Engine</div>
                          <div className="simulator-result-box flex flex-col items-center gap-2 py-4">
                            <div className="flex items-center gap-4">
                              <span className="px-3 py-1.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-mono">Screen A</span>
                              <span className="text-[#38bdf8] font-mono font-bold">───▶</span>
                              <span className="px-3 py-1.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-mono">Screen B</span>
                            </div>
                            <span className="text-[10px] text-zinc-400 mt-1">Smart bezier collision avoidance enabled</span>
                          </div>
                        </div>
                      )}

                      {/* 5. DEFAULT / OTHER PLUGINS */}
                      {!['stark', 'magician', 'contentreel', 'autoflow'].includes(activeSimulatorPlugin.id) && (
                        <div>
                          <div className="text-[12px] font-semibold text-white mb-2">{activeSimulatorPlugin.name} In-Canvas Engine</div>
                          <div className="simulator-result-box flex flex-col gap-2">
                            <p className="text-[12px] text-zinc-300">{activeSimulatorPlugin.desc}</p>
                            <span className="text-[11px] text-emerald-400 font-mono">✓ Ready to inject into active canvas artboard</span>
                          </div>
                        </div>
                      )}

                      <div className="simulator-footer-actions">
                        <button
                          type="button"
                          className="cert-action-btn secondary"
                          onClick={() => setActiveSimulatorPlugin(null)}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="cert-action-btn primary"
                          onClick={() => {
                            showToast(`Applied ${activeSimulatorPlugin.name} changes to canvas!`);
                            setActiveSimulatorPlugin(null);
                          }}
                        >
                          <span>Apply to Canvas</span>
                          <span className="material-symbols-outlined text-[13px]">check</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                      <span className="material-symbols-outlined text-[15px]">
                        {selectedNodeType === 'Component' ? 'widgets' : 'crop_free'}
                      </span>
                    </div>
                    <div className="prop-target-name">
                      <span className="target-label">{selectedNodeLabel}</span>
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

              {propertiesTab === 'prototype' && (
                <>
                  <div className="prop-section">
                    <div className="prop-section-title">Prototype Flow</div>
                    <div className="prop-prototype-card">
                      <div className="flow-badge-row">
                        <span className="material-symbols-outlined text-[15px] text-[#0d99ff]">play_circle</span>
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
