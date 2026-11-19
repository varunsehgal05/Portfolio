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
  const [isPanning, setIsPanning] = useState(false);
  const [isWireframeMode, setIsWireframeMode] = useState(false);
  const [activeTool, setActiveTool] = useState('select'); // 'select' | 'hand'
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const startPanRef = useRef({ x: 0, y: 0 });

  // Dynamic Selected Node & Live Editable Properties
  const [selectedNodeId, setSelectedNodeId] = useState('root-canvas');
  const [selectedNodeLabel, setSelectedNodeLabel] = useState('Varun_Sehgal_Portfolio');
  const [selectedNodeType, setSelectedNodeType] = useState('Frame');
  const [nodeProps, setNodeProps] = useState({
    'root-canvas': { x: 0, y: 0, w: 1200, h: 850, radius: 16, fill: '#1E2020', fillOpacity: 35, stroke: '#FFFFFF', strokeWidth: 1, opacity: 100 },
    'work-codesrijan': { x: 40, y: 80, w: 360, h: 440, radius: 16, fill: '#181920', stroke: '#38bdf8', strokeWidth: 1, opacity: 100 },
    'work-eventflow': { x: 430, y: 80, w: 360, h: 440, radius: 16, fill: '#181920', stroke: '#818cf8', strokeWidth: 1, opacity: 100 },
    'work-landing': { x: 820, y: 80, w: 360, h: 440, radius: 16, fill: '#181920', stroke: '#34d399', strokeWidth: 1, opacity: 100 },
    'work-saas': { x: 40, y: 550, w: 360, h: 440, radius: 16, fill: '#181920', stroke: '#f59e0b', strokeWidth: 1, opacity: 100 },
    'exp-imagine': { x: 60, y: 80, w: 420, h: 220, radius: 16, fill: '#181920', stroke: '#38bdf8', strokeWidth: 1, opacity: 100 },
    'exp-knaptix': { x: 540, y: 30, w: 420, h: 220, radius: 16, fill: '#181920', stroke: '#818cf8', strokeWidth: 1, opacity: 100 },
    'exp-udemy': { x: 540, y: 280, w: 420, h: 220, radius: 16, fill: '#181920', stroke: '#34d399', strokeWidth: 1, opacity: 100 },
    'exp-infosys': { x: 60, y: 330, w: 420, h: 220, radius: 16, fill: '#181920', stroke: '#f59e0b', strokeWidth: 1, opacity: 100 },
    'about-avatar': { x: 510, y: 310, w: 220, h: 220, radius: 110, fill: '#181920', stroke: '#38bdf8', strokeWidth: 2, opacity: 100 },
    'about-strengths': { x: 40, y: 40, w: 360, h: 260, radius: 16, fill: '#181920', stroke: '#34d399', strokeWidth: 1, opacity: 100 },
    'about-weaknesses': { x: 840, y: 40, w: 360, h: 260, radius: 16, fill: '#181920', stroke: '#f59e0b', strokeWidth: 1, opacity: 100 },
    'about-philosophy': { x: 40, y: 440, w: 360, h: 260, radius: 16, fill: '#181920', stroke: '#818cf8', strokeWidth: 1, opacity: 100 },
    'about-toolkit': { x: 840, y: 440, w: 360, h: 260, radius: 16, fill: '#181920', stroke: '#38bdf8', strokeWidth: 1, opacity: 100 },
    'about-education': { x: 440, y: 600, w: 360, h: 240, radius: 16, fill: '#181920', stroke: '#ec4899', strokeWidth: 1, opacity: 100 },
    'process-p1': { x: 40, y: 80, w: 380, h: 560, radius: 16, fill: '#181920', stroke: '#38bdf8', strokeWidth: 1, opacity: 100 },
    'process-p2': { x: 480, y: 80, w: 380, h: 560, radius: 16, fill: '#181920', stroke: '#c084fc', strokeWidth: 1, opacity: 100 },
    'process-p3': { x: 920, y: 80, w: 380, h: 560, radius: 16, fill: '#181920', stroke: '#34d399', strokeWidth: 1, opacity: 100 },
    'process-p4': { x: 1360, y: 80, w: 380, h: 560, radius: 16, fill: '#181920', stroke: '#f59e0b', strokeWidth: 1, opacity: 100 },
    'process-p5': { x: 1800, y: 80, w: 380, h: 560, radius: 16, fill: '#181920', stroke: '#38bdf8', strokeWidth: 1, opacity: 100 },
    'process-p6': { x: 2240, y: 80, w: 380, h: 560, radius: 16, fill: '#181920', stroke: '#10b981', strokeWidth: 1, opacity: 100 },
    'resume-artboard': { x: 40, y: 40, w: 920, h: 1180, radius: 16, fill: '#181920', stroke: '#38bdf8', strokeWidth: 1, opacity: 100 }
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

  // Centering dimensions per tab
  const getTabDimensions = (tab) => {
    switch (tab) {
      case 'home': return { width: 1240, height: 880 };
      case 'projects': return { width: 1350, height: 950 };
      case 'experience': return { width: 1200, height: 950 };
      case 'about': return { width: 1350, height: 920 };
      case 'resume': return { width: 1160, height: 1100 };
      case 'process': return { width: 900, height: 850 };
      case 'plugins': return { width: 1200, height: 900 };
      default: return { width: 1200, height: 850 };
    }
  };

  const centerCanvasView = (tab = activeTab) => {
    if (!containerRef.current) return;
    const stageW = containerRef.current.clientWidth || 900;
    const stageH = containerRef.current.clientHeight || 650;
    const dim = getTabDimensions(tab);

    let targetX = Math.round((stageW - dim.width * zoom) / 2);
    let targetY = Math.round((stageH - dim.height * zoom) / 2);

    if (tab === 'process') {
      targetX = Math.max(40, Math.round((stageW - 900 * zoom) / 2));
      targetY = 24;
    } else {
      targetY = Math.max(16, targetY);
    }

    setPan({ x: targetX, y: targetY });
  };

  // Center on tab switch & initial mount
  useEffect(() => {
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

    const handleWindowMouseMove = (moveEvt) => {
      const dx = moveEvt.pageX - dragStartRef.current.pageX;
      const dy = moveEvt.pageY - dragStartRef.current.pageY;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        isDraggingCanvasRef.current = true;
      }

      setPan({
        x: Math.round(dragStartRef.current.panX + dx),
        y: Math.round(dragStartRef.current.panY + dy)
      });
    };

    const handleWindowMouseUp = () => {
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

          {/* Canvas Zoom & Center Controls */}
          <div className="canvas-zoom-pill">
            <button
              type="button"
              className="canvas-zoom-btn"
              onClick={() => setZoom(z => Math.max(0.4, Number((z - 0.1).toFixed(2))))}
              title="Zoom out"
            >
              −
            </button>
            <span
              className="canvas-zoom-val"
              onClick={() => { setZoom(1); centerCanvasView(activeTab); }}
              title="Reset Zoom to 100% and Center View"
            >
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              className="canvas-zoom-btn"
              onClick={() => setZoom(z => Math.min(2.5, Number((z + 0.1).toFixed(2))))}
              title="Zoom in"
            >
              +
            </button>
            <button
              type="button"
              className="canvas-center-btn"
              onClick={() => { centerCanvasView(activeTab); showToast('Canvas Centered'); }}
              title="Center View (Shift+1)"
            >
              <span className="material-symbols-outlined text-[14px]">center_focus_strong</span>
            </button>
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
              <div className="view-content-wrapper" style={{ padding: '30px 40px 140px', minWidth: '1350px' }}>
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
              <div className="view-content-wrapper" style={{ padding: '30px 40px 140px', minWidth: '1200px' }}>
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
                        const expNodeId = `exp-${item.id}`;
                        const isSelected = selectedNodeId === expNodeId;
                        const props = nodeProps[expNodeId] || {};
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
              <div className="view-content-wrapper" style={{ padding: '20px 30px 140px', minWidth: '1350px' }}>
                <header className="view-page-header">
                  <div className="about-header-flex">
                    <div>
                      <h1 className="view-page-title">About Varun Sehgal</h1>
                      <p className="view-page-desc">Design philosophy, superpowers, growth vectors, and architectural toolkit.</p>
                    </div>
                  </div>
                </header>

                <div className="about-radial-canvas-container">
                  {/* SVG Radiating Curved Dashed Connectors Layer (Matching Image 3) */}
                  <svg className="about-connector-svg-layer" viewBox="0 0 1240 860" fill="none">
                    {/* Path 1: Center Avatar -> Top Left (Core Strengths) */}
                    <path
                      d="M 520,380 C 440,380 400,280 400,200"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                    <circle cx="400" cy="200" r="4.5" fill="#38bdf8" />

                    {/* Path 2: Center Avatar -> Top Right (Weaknesses & Growth Vectors) */}
                    <path
                      d="M 720,380 C 800,380 840,280 840,200"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                    <circle cx="840" cy="200" r="4.5" fill="#38bdf8" />

                    {/* Path 3: Center Avatar -> Bottom Left (Design Philosophy) */}
                    <path
                      d="M 520,460 C 440,460 400,520 400,580"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                    <circle cx="400" cy="580" r="4.5" fill="#38bdf8" />

                    {/* Path 4: Center Avatar -> Bottom Right (Technical Stack) */}
                    <path
                      d="M 720,460 C 800,460 840,520 840,580"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                    <circle cx="840" cy="580" r="4.5" fill="#38bdf8" />

                    {/* Path 5: Center Avatar -> Bottom Center (Education & Hackathons) */}
                    <path
                      d="M 620,530 C 620,560 620,580 620,600"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                    <circle cx="620" cy="600" r="4.5" fill="#38bdf8" />
                  </svg>

                  {/* 1. Center Avatar of Varun */}
                  <div
                    className={`about-center-avatar-node figma-selectable-node ${selectedNodeId === 'about-avatar' ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode('about-avatar', 'Varun_Avatar_Core', 'Component');
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
                        <div className="selection-tag">❖ Varun_Avatar_Core [220×220]</div>
                        <div className="selection-handle tl" />
                        <div className="selection-handle tr" />
                        <div className="selection-handle bl" />
                        <div className="selection-handle br" />
                      </div>
                    )}
                    <div className="about-avatar-ring">
                      <img src="/varun.jpg" alt="Varun Sehgal" className="about-avatar-img" onError={(e) => { e.currentTarget.src = '/profile/varun.jpg'; }} />
                    </div>
                    <div className="about-avatar-name">Varun Sehgal</div>
                    <div className="about-avatar-role">Product Designer</div>
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
              <div className="view-content-wrapper" style={{ padding: '30px 40px 140px', minWidth: '1200px' }}>
                <header className="view-page-header">
                  <div className="resume-header-flex">
                    <div>
                      <h1 className="view-page-title">Resume & Qualifications</h1>
                      <p className="view-page-desc">Official ATS-optimized curriculum vitae — UI/UX Designer & Product Designer.</p>
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

                <div
                  className={`figma-resume-artboard-wrap figma-selectable-node ${selectedNodeId === 'resume-artboard' ? 'is-selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode('resume-artboard', 'Varun_Sehgal_Resume', 'Frame');
                  }}
                  style={{
                    borderRadius: nodeProps['resume-artboard']?.radius ? `${nodeProps['resume-artboard'].radius}px` : undefined,
                    backgroundColor: nodeProps['resume-artboard']?.fill || undefined,
                    borderColor: nodeProps['resume-artboard']?.stroke || undefined,
                    opacity: nodeProps['resume-artboard']?.opacity !== undefined ? nodeProps['resume-artboard'].opacity / 100 : undefined
                  }}
                >
                  <div className="figma-artboard-caliper-x">↕ 24px AUTO LAYOUT • ↔ 920px FRAME WIDTH</div>
                  <div className="figma-artboard-sticky-note">
                    <strong>Reviewer Note</strong>
                    <p style={{ marginTop: '4px', lineHeight: '1.4' }}>ATS Score 98/100. Clean 2-column Figma component structure. Verified UniEvent & Infosys credentials.</p>
                  </div>
                  {selectedNodeId === 'resume-artboard' && (
                    <div className="figma-selection-overlay">
                      <div className="selection-tag">❖ Varun_Sehgal_Resume.artboard [920×1180]</div>
                      <div className="selection-handle tl" />
                      <div className="selection-handle tr" />
                      <div className="selection-handle bl" />
                      <div className="selection-handle br" />
                    </div>
                  )}

                  <div className="figma-resume-sheet-container">
                    <div className="figma-resume-two-col">
                      {/* Left Column: Contact, Education, Skills */}
                      <aside className="figma-resume-sidebar">
                        {/* Contact */}
                        <div>
                          <h4 className="figma-resume-section-title">
                            <span className="text-[#ffb5a1]">#</span> CONTACT
                          </h4>
                          <ul className="figma-resume-contact-list">
                            <li>
                              <span className="material-symbols-outlined text-[14px]">call</span>
                              <span>+91 9399361193</span>
                            </li>
                            <li>
                              <span className="material-symbols-outlined text-[14px]">mail</span>
                              <a href="mailto:varun.sehgal02@gmail.com">varun.sehgal02@gmail.com</a>
                            </li>
                            <li>
                              <span className="material-symbols-outlined text-[14px]">location_on</span>
                              <span>Gwalior, MP, India</span>
                            </li>
                            <li>
                              <span className="material-symbols-outlined text-[14px]">language</span>
                              <a href="https://varunsehgal.runs-on.dev" target="_blank" rel="noreferrer">varunsehgal.runs-on.dev</a>
                            </li>
                            <li>
                              <span className="material-symbols-outlined text-[14px]">work</span>
                              <a href="https://linkedin.com/in/varunsehgal02" target="_blank" rel="noreferrer">linkedin.com/in/varunsehgal02</a>
                            </li>
                            <li>
                              <span className="material-symbols-outlined text-[14px]">palette</span>
                              <a href="https://behance.net/varunsehgal3" target="_blank" rel="noreferrer">behance.net/varunsehgal3</a>
                            </li>
                            <li>
                              <span className="material-symbols-outlined text-[14px]">code</span>
                              <a href="https://github.com/varunsehgal05" target="_blank" rel="noreferrer">github.com/varunsehgal05</a>
                            </li>
                          </ul>
                        </div>

                        {/* Education */}
                        <div>
                          <h4 className="figma-resume-section-title">
                            <span className="text-[#ffb5a1]">#</span> EDUCATION
                          </h4>
                          <div className="text-[12px] text-white font-semibold">Jaypee University of Eng. & Tech.</div>
                          <div className="text-[11px] text-[#ffb5a1]">B.Tech in Computer Science & Eng.</div>
                          <div className="text-[10.5px] text-zinc-500 mt-1 font-mono">Aug 2023 – May 2027 • Guna, India</div>
                        </div>

                        {/* Skills */}
                        <div>
                          <h4 className="figma-resume-section-title">
                            <span className="text-[#ffb5a1]">#</span> SKILLS ARSENAL
                          </h4>

                          <div className="mb-3">
                            <div className="text-[11px] font-bold text-zinc-300 mb-1">UI/UX Design:</div>
                            <div className="flex flex-wrap gap-1">
                              {['Wireframing', 'Prototyping', 'User Research', 'Usability Testing', 'Design Systems', 'Info Architecture'].map((s, i) => (
                                <span key={i} className="cert-id-badge">{s}</span>
                              ))}
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="text-[11px] font-bold text-zinc-300 mb-1">Design Tools:</div>
                            <div className="flex flex-wrap gap-1">
                              {['Figma', 'Figma AI', 'Adobe XD', 'Photoshop', 'Illustrator', 'FigJam'].map((s, i) => (
                                <span key={i} className="cert-id-badge">{s}</span>
                              ))}
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="text-[11px] font-bold text-zinc-300 mb-1">AI-Augmented Design:</div>
                            <div className="flex flex-wrap gap-1">
                              {['Uizard', 'Galileo AI', 'Visily', 'Figma Magician', 'Automator'].map((s, i) => (
                                <span key={i} className="cert-id-badge">{s}</span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="text-[11px] font-bold text-zinc-300 mb-1">Tech & Prototyping:</div>
                            <div className="flex flex-wrap gap-1">
                              {['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3', 'Git'].map((s, i) => (
                                <span key={i} className="cert-id-badge">{s}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </aside>

                      {/* Right Column: Main ATS Content */}
                      <main className="figma-resume-main">
                        {/* Candidate Header */}
                        <header>
                          <div className="flex items-center justify-between gap-3">
                            <h2 className="figma-resume-candidate-title">Varun Sehgal</h2>
                            <span className="cert-id-badge" style={{ background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                              ATS-Optimized
                            </span>
                          </div>
                          <p className="figma-resume-roles">UI/UX Designer • Product Designer • Frontend Engineer</p>
                          <p className="figma-resume-summary-text">
                            UI/UX & Product Designer with 3+ years of experience delivering high-impact SaaS and AI product experiences. Skilled in user research, wireframing, rapid prototyping, and design systems, with proven results including a 45% increase in user engagement and a 30% reduction in drop-off rates.
                          </p>
                        </header>

                        {/* Work Experience */}
                        <section>
                          <h4 className="figma-resume-section-title">
                            <span className="material-symbols-outlined text-[15px] text-[#ffb5a1]">work</span>
                            WORK EXPERIENCE
                          </h4>

                          <div className="figma-resume-item">
                            <div className="figma-resume-item-header">
                              <div><strong>UI/UX Designer Intern</strong> — UniEvent (Remote)</div>
                              <span className="figma-resume-item-date">Jun 2024 – Nov 2024</span>
                            </div>
                            <ul className="figma-resume-bullets">
                              <li>Designed user-focused digital experiences and translated complex business requirements into clear, consistent interfaces for campus ticketing platform (EventFlow). Completed internship in early November 2024.</li>
                              <li>Architected 4-step booking flow optimization, slashing transaction drop-off by 30% across 50+ modular components and checkout psychology.</li>
                            </ul>
                          </div>

                          <div className="figma-resume-item">
                            <div className="figma-resume-item-header">
                              <div><strong>Assistant Head of Operations / UX Intern</strong> — Assemble (Remote)</div>
                              <span className="figma-resume-item-date">Aug 2024 – Jan 2025</span>
                            </div>
                            <ul className="figma-resume-bullets">
                              <li>Assisted in the planning and smooth execution of esports competitions, driving cross-functional coordination.</li>
                              <li>Designed collaborative creator workspace tools and interaction prototypes in Figma.</li>
                            </ul>
                          </div>

                          <div className="figma-resume-item">
                            <div className="figma-resume-item-header">
                              <div><strong>UI/UX Designer Intern</strong> — Knaptix Ventures (Remote)</div>
                              <span className="figma-resume-item-date">Jan 2024 – Jun 2024</span>
                            </div>
                            <ul className="figma-resume-bullets">
                              <li>Conceptualized 5+ high-fidelity UI/UX interfaces for web/mobile, achieving a 40% increase in user satisfaction scores during testing phases.</li>
                              <li>Accelerated wireframe-to-prototype turnaround by leveraging AI-assisted Figma plugins (Magician, Automator), cutting early-stage design time by 45%.</li>
                              <li>Facilitated design-to-engineering hand-offs, reducing implementation friction and technical errors by 15%.</li>
                            </ul>
                          </div>

                          <div className="figma-resume-item">
                            <div className="figma-resume-item-header">
                              <div><strong>Freelance UI/UX Designer</strong> — Self-Employed (Remote)</div>
                              <span className="figma-resume-item-date">Jan 2024 – Present</span>
                            </div>
                            <ul className="figma-resume-bullets">
                              <li>Executed 10+ end-to-end UI/UX design projects for tech startups, maintaining a 95% client retention rate through human-centered delivery.</li>
                              <li>Redesigned product interfaces for 4 early-stage companies, utilizing AI-assisted prototyping tools to speed concept iteration.</li>
                            </ul>
                          </div>
                        </section>

                        {/* Design Projects */}
                        <section>
                          <h4 className="figma-resume-section-title">
                            <span className="material-symbols-outlined text-[15px] text-[#ffb5a1]">folder</span>
                            DESIGN PROJECTS
                          </h4>

                          <div className="figma-resume-item">
                            <div className="figma-resume-item-header">
                              <div><strong>AI Interview & Preparation Platform</strong></div>
                              <a href="https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842" target="_blank" rel="noreferrer" className="text-[#ffb5a1] text-[11px] font-semibold underline">
                                Figma Showcase ↗
                              </a>
                            </div>
                            <div className="text-[11px] text-zinc-400 font-mono mb-1">Stack: Figma, SaaS Design, AI Security & Grading UX</div>
                            <ul className="figma-resume-bullets">
                              <li>Architected an AI-driven SaaS platform, integrating specialized "Security" and "Grading" modules to automate candidate evaluation processes.</li>
                              <li>Streamlined dense analytical data into a clean dark-themed UI, enhancing dashboard scannability and user task efficiency by 25%.</li>
                            </ul>
                          </div>

                          <div className="figma-resume-item">
                            <div className="figma-resume-item-header">
                              <div><strong>EventFlow: Event Ticketing SaaS</strong></div>
                              <a href="https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2" target="_blank" rel="noreferrer" className="text-[#ffb5a1] text-[11px] font-semibold underline">
                                Figma Showcase ↗
                              </a>
                            </div>
                            <div className="text-[11px] text-zinc-400 font-mono mb-1">Stack: Figma, Design Systems, Modular Components</div>
                            <ul className="figma-resume-bullets">
                              <li>Spearheaded a 4-step booking flow optimization that minimized user drop-off by 30% through simplified checkout psychology.</li>
                              <li>Constructed a comprehensive design system with 50+ modular components to ensure cross-platform visual consistency.</li>
                            </ul>
                          </div>

                          <div className="figma-resume-item">
                            <div className="figma-resume-item-header">
                              <div><strong>Expensify: Budget Tracker App</strong></div>
                              <a href="https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318" target="_blank" rel="noreferrer" className="text-[#ffb5a1] text-[11px] font-semibold underline">
                                Figma Showcase ↗
                              </a>
                            </div>
                            <div className="text-[11px] text-zinc-400 font-mono mb-1">Stack: Mobile UX, Real-time Analytics, Micro-interactions</div>
                            <ul className="figma-resume-bullets">
                              <li>Refined 17+ screens for real-time analytics, reducing the average "Add Expense" transaction time to under 5 seconds.</li>
                            </ul>
                          </div>
                        </section>

                        {/* Hackathons & Leadership */}
                        <section>
                          <h4 className="figma-resume-section-title">
                            <span className="material-symbols-outlined text-[15px] text-[#ffb5a1]">emoji_events</span>
                            HACKATHONS & LEADERSHIP
                          </h4>

                          <div className="figma-resume-item">
                            <div className="figma-resume-item-header">
                              <div>
                                <strong>Co-Organizer & Lead Designer</strong> — CodeSrijan Hackathon (JUET)
                                <a href="https://lnkd.in/p/dUXQYx92" target="_blank" rel="noreferrer" className="text-[#ffb5a1] ml-2 text-[11px] font-semibold underline inline-flex items-center gap-0.5">
                                  LinkedIn Post ↗
                                </a>
                              </div>
                              <span className="figma-resume-item-date">Apr 2024</span>
                            </div>
                            <ul className="figma-resume-bullets">
                              <li>Directed complete visual identity and design system for a 72-hour hackathon with 200+ participants; designed official event merchandise, participant ID cards, certificates, and marketing creatives.</li>
                              <li>Architected the digital platform UI covering team formation, submission portals, and real-time mentor evaluation under 72h high-pressure conditions. Boosted registrations by 20% YoY.</li>
                            </ul>
                          </div>

                          <div className="figma-resume-item">
                            <div className="figma-resume-item-header">
                              <div>
                                <strong>2nd Runner-up (Team Pixel_Codes)</strong> — Code Conquerors Hackathon (JUET)
                                <a href="https://www.linkedin.com/posts/pushkar-chaturvedi-a83778284_hackathon2025-codeconquerors-aiineducation-activity-7335535096017375236-DBk_" target="_blank" rel="noreferrer" className="text-[#ffb5a1] ml-2 text-[11px] font-semibold underline inline-flex items-center gap-0.5">
                                  LinkedIn Post ↗
                                </a>
                              </div>
                              <span className="figma-resume-item-date">Apr 2024</span>
                            </div>
                            <ul className="figma-resume-bullets">
                              <li>Led frontend development and UI design in a 12-hour offline hackathon (150+ participants), building an AI-powered quiz generator using Next.js and Tailwind CSS.</li>
                              <li>Engineered interactive question builder workflows and dynamic answer-key verification interfaces consuming Ollama local LLM APIs, placing 3rd out of 50+ competing teams.</li>
                            </ul>
                          </div>

                          <div className="figma-resume-item">
                            <div className="figma-resume-item-header">
                              <div><strong>🏆 HAckeThor Winner (1st Place)</strong> — Unstop Hackathon</div>
                              <span className="figma-resume-item-date">Apr 2025</span>
                            </div>
                            <ul className="figma-resume-bullets">
                              <li>Awarded 1st place in national competitive hackathon demonstrating rapid UX prototyping, interactive user testing, and AI tool integration.</li>
                            </ul>
                          </div>
                        </section>
                      </main>
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
              <div className="view-content-wrapper" style={{ padding: '20px 40px 140px', minWidth: '2800px' }}>
                <header className="view-page-header">
                  <div className="about-header-flex">
                    <div>
                      <h1 className="view-page-title">Process & Methodology</h1>
                      <p className="view-page-desc">Sequential end-to-end UX workflow from raw ideation to verified production handoff (Left to Right).</p>
                    </div>
                  </div>
                </header>

                {/* Horizontal Left-to-Right Workflow with Image 3 Connectors */}
                <div className="process-horizontal-flow">
                  {/* Phase 01: Ideation (Matching user reference media_1795084261884_b468a887.jpg) */}
                  <div
                    className={`process-phase-box figma-selectable-node ${selectedNodeId === 'process-p1' ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode('process-p1', 'Phase 01: Ideation', 'Frame');
                    }}
                    style={{
                      borderRadius: nodeProps['process-p1']?.radius ? `${nodeProps['process-p1'].radius}px` : undefined,
                      backgroundColor: nodeProps['process-p1']?.fill || undefined,
                      borderColor: nodeProps['process-p1']?.stroke || undefined,
                      opacity: nodeProps['process-p1']?.opacity !== undefined ? nodeProps['process-p1'].opacity / 100 : undefined
                    }}
                  >
                    {selectedNodeId === 'process-p1' && (
                      <div className="figma-selection-overlay">
                        <div className="selection-tag">❖ Phase 01: Ideation [380×560]</div>
                        <div className="selection-handle tl" /><div className="selection-handle tr" />
                        <div className="selection-handle bl" /><div className="selection-handle br" />
                      </div>
                    )}
                    <div className="phase-header-block mb-3">
                      <h2 className="phase-title-large text-[#ffb5a1]">Phase 01: Ideation</h2>
                      <p className="phase-desc-muted">
                        Unstructured thoughts, user journey mapping, and early structural wireframes. Mapping the chaotic void before styling.
                      </p>
                      <div className="phase-subheading-pin mt-2">
                        <span className="material-symbols-outlined phase-pin-symbol">location_on</span>
                        <span>Brainstorming</span>
                      </div>
                    </div>

                    {/* Overlapping Colorful Sticky Notes (Matching Image 1) */}
                    <div className="phase-stickies-cluster">
                      {/* Blue Sticky */}
                      <div className="figjam-color-sticky sticky-blue">
                        <p className="sticky-body-text">
                          How might we make the portfolio feel like a high-end application rather than a static document?
                        </p>
                        <div className="sticky-footer-row">
                          <span>Idea</span>
                          <span className="material-symbols-outlined sticky-footer-icon">lightbulb</span>
                        </div>
                      </div>

                      {/* Orange Sticky (Overlapping) */}
                      <div className="figjam-color-sticky sticky-orange">
                        <p className="sticky-body-text">
                          Focus heavily on dark mode aesthetics. Deep blacks, atmospheric blurs, and spectral accent colors.
                        </p>
                        <div className="sticky-footer-row">
                          <span>Aesthetic</span>
                          <span className="material-symbols-outlined sticky-footer-icon">palette</span>
                        </div>
                      </div>

                      {/* Purple Sticky */}
                      <div className="figjam-color-sticky sticky-purple">
                        <p className="sticky-body-text">
                          Typography needs to be crisp. Use Monospace for technical details, Sans for body, Geist for headings.
                        </p>
                        <div className="sticky-footer-row">
                          <span>Typography</span>
                          <span className="material-symbols-outlined sticky-footer-icon">text_fields</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connector 1 */}
                  <div className="process-flow-connector">
                    <svg viewBox="0 0 60 60" fill="none">
                      <path d="M 5,30 C 25,30 35,30 55,30" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" />
                      <circle cx="55" cy="30" r="4.5" fill="#38bdf8" />
                    </svg>
                  </div>

                  {/* Phase 02: Architecture & Flows */}
                  <div
                    className={`process-phase-box figma-selectable-node ${selectedNodeId === 'process-p2' ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode('process-p2', 'Phase 02: Architecture', 'Frame');
                    }}
                    style={{
                      borderRadius: nodeProps['process-p2']?.radius ? `${nodeProps['process-p2'].radius}px` : undefined,
                      backgroundColor: nodeProps['process-p2']?.fill || undefined,
                      borderColor: nodeProps['process-p2']?.stroke || undefined,
                      opacity: nodeProps['process-p2']?.opacity !== undefined ? nodeProps['process-p2'].opacity / 100 : undefined
                    }}
                  >
                    {selectedNodeId === 'process-p2' && (
                      <div className="figma-selection-overlay">
                        <div className="selection-tag">❖ Phase 02: Architecture [380×560]</div>
                        <div className="selection-handle tl" /><div className="selection-handle tr" />
                        <div className="selection-handle bl" /><div className="selection-handle br" />
                      </div>
                    )}
                    <div className="phase-header-block mb-3">
                      <h2 className="phase-title-large text-[#c084fc]">Phase 02: Architecture</h2>
                      <p className="phase-desc-muted">
                        Synthesizing user journeys, sitemaps, task flows, cognitive models, and edge-case routing.
                      </p>
                      <div className="phase-subheading-pin mt-2">
                        <span className="material-symbols-outlined phase-pin-symbol" style={{ color: '#c084fc' }}>schema</span>
                        <span>Information Architecture</span>
                      </div>
                    </div>

                    <div className="figjam-flow-frame mt-3">
                      <div className="flow-step-node">Launch App / Discovery</div>
                      <div className="flow-stem-divider"></div>
                      <div className="flow-step-node active-node">Dashboard Overview</div>
                      <div className="flow-stem-divider"></div>
                      <div className="flow-branch-row">
                        <div className="flow-step-node">Add Transaction</div>
                        <div className="flow-step-node">View Analytics</div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 text-[11.5px] text-zinc-300">
                      <strong>Deliverables:</strong> User Journeys, Heuristic Maps, Sitemap Tree, Wireflow Blueprints.
                    </div>
                  </div>

                  {/* Connector 2 */}
                  <div className="process-flow-connector">
                    <svg viewBox="0 0 60 60" fill="none">
                      <path d="M 5,30 C 25,30 35,30 55,30" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" />
                      <circle cx="55" cy="30" r="4.5" fill="#38bdf8" />
                    </svg>
                  </div>

                  {/* Phase 03: Lo-Fi Wireframing */}
                  <div
                    className={`process-phase-box figma-selectable-node ${selectedNodeId === 'process-p3' ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode('process-p3', 'Phase 03: Wireframing', 'Frame');
                    }}
                    style={{
                      borderRadius: nodeProps['process-p3']?.radius ? `${nodeProps['process-p3'].radius}px` : undefined,
                      backgroundColor: nodeProps['process-p3']?.fill || undefined,
                      borderColor: nodeProps['process-p3']?.stroke || undefined,
                      opacity: nodeProps['process-p3']?.opacity !== undefined ? nodeProps['process-p3'].opacity / 100 : undefined
                    }}
                  >
                    {selectedNodeId === 'process-p3' && (
                      <div className="figma-selection-overlay">
                        <div className="selection-tag">❖ Phase 03: Wireframing [380×560]</div>
                        <div className="selection-handle tl" /><div className="selection-handle tr" />
                        <div className="selection-handle bl" /><div className="selection-handle br" />
                      </div>
                    )}
                    <div className="phase-header-block mb-3">
                      <h2 className="phase-title-large text-[#34d399]">Phase 03: Wireframing</h2>
                      <p className="phase-desc-muted">
                        Rapid grey-box structural prototyping and layout rhythm validation without color distractions.
                      </p>
                      <div className="phase-subheading-pin mt-2">
                        <span className="material-symbols-outlined phase-pin-symbol" style={{ color: '#34d399' }}>grid_view</span>
                        <span>Layout Blueprints & Cadence</span>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-900/80 rounded-lg border border-dashed border-[#38bdf8]/40 my-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-2">
                        <span>8pt Spatial Grid</span>
                        <span>Auto Layout 5.0</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                        <div className="h-16 bg-zinc-800/60 rounded border border-zinc-700/50 flex items-center justify-center text-[11px] text-zinc-500">
                          [ Wireframe Canvas Block ]
                        </div>
                        <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 text-[11.5px] text-zinc-300">
                      <strong>Deliverables:</strong> Low-Fidelity Frames, Clickable Lo-Fi Flow, Spatial Heuristics.
                    </div>
                  </div>

                  {/* Connector 3 */}
                  <div className="process-flow-connector">
                    <svg viewBox="0 0 60 60" fill="none">
                      <path d="M 5,30 C 25,30 35,30 55,30" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" />
                      <circle cx="55" cy="30" r="4.5" fill="#38bdf8" />
                    </svg>
                  </div>

                  {/* Phase 04: Design System & Tokens */}
                  <div
                    className={`process-phase-box figma-selectable-node ${selectedNodeId === 'process-p4' ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode('process-p4', 'Phase 04: Design System', 'Frame');
                    }}
                    style={{
                      borderRadius: nodeProps['process-p4']?.radius ? `${nodeProps['process-p4'].radius}px` : undefined,
                      backgroundColor: nodeProps['process-p4']?.fill || undefined,
                      borderColor: nodeProps['process-p4']?.stroke || undefined,
                      opacity: nodeProps['process-p4']?.opacity !== undefined ? nodeProps['process-p4'].opacity / 100 : undefined
                    }}
                  >
                    {selectedNodeId === 'process-p4' && (
                      <div className="figma-selection-overlay">
                        <div className="selection-tag">❖ Phase 04: Design System [380×560]</div>
                        <div className="selection-handle tl" /><div className="selection-handle tr" />
                        <div className="selection-handle bl" /><div className="selection-handle br" />
                      </div>
                    )}
                    <div className="phase-header-block mb-3">
                      <h2 className="phase-title-large text-[#f59e0b]">Phase 04: Design System</h2>
                      <p className="phase-desc-muted">
                        Scalable design token pipelines: semantic colors, fluid typography scales, and atomic components.
                      </p>
                      <div className="phase-subheading-pin mt-2">
                        <span className="material-symbols-outlined phase-pin-symbol" style={{ color: '#f59e0b' }}>token</span>
                        <span>Tokens Studio & Hierarchy</span>
                      </div>
                    </div>

                    <div className="figjam-tokens-row my-3">
                      <span className="figjam-token-pill" style={{ borderColor: '#38bdf8', color: '#38bdf8' }}>#38bdf8</span>
                      <span className="figjam-token-pill" style={{ borderColor: '#818cf8', color: '#818cf8' }}>#818cf8</span>
                      <span className="figjam-token-pill" style={{ borderColor: '#34d399', color: '#34d399' }}>#34d399</span>
                      <span className="figjam-token-pill" style={{ borderColor: '#f59e0b', color: '#f59e0b' }}>#f59e0b</span>
                    </div>
                    <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 text-[11.5px] text-zinc-300">
                      <strong>Deliverables:</strong> 50+ Nested Component Variants, Tokens Studio JSON, WCAG AA/AAA Ratio Rules.
                    </div>
                  </div>

                  {/* Connector 4 */}
                  <div className="process-flow-connector">
                    <svg viewBox="0 0 60 60" fill="none">
                      <path d="M 5,30 C 25,30 35,30 55,30" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" />
                      <circle cx="55" cy="30" r="4.5" fill="#38bdf8" />
                    </svg>
                  </div>

                  {/* Phase 05: Hi-Fi Prototyping */}
                  <div
                    className={`process-phase-box figma-selectable-node ${selectedNodeId === 'process-p5' ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode('process-p5', 'Phase 05: Hi-Fi Prototyping', 'Frame');
                    }}
                    style={{
                      borderRadius: nodeProps['process-p5']?.radius ? `${nodeProps['process-p5'].radius}px` : undefined,
                      backgroundColor: nodeProps['process-p5']?.fill || undefined,
                      borderColor: nodeProps['process-p5']?.stroke || undefined,
                      opacity: nodeProps['process-p5']?.opacity !== undefined ? nodeProps['process-p5'].opacity / 100 : undefined
                    }}
                  >
                    {selectedNodeId === 'process-p5' && (
                      <div className="figma-selection-overlay">
                        <div className="selection-tag">❖ Phase 05: Hi-Fi Prototyping [380×560]</div>
                        <div className="selection-handle tl" /><div className="selection-handle tr" />
                        <div className="selection-handle bl" /><div className="selection-handle br" />
                      </div>
                    )}
                    <div className="phase-header-block mb-3">
                      <h2 className="phase-title-large text-[#38bdf8]">Phase 05: Hi-Fi Prototyping</h2>
                      <p className="phase-desc-muted">
                        Visual craftsmanship, dark mode atmospheric blurs, haptic spring physics, and smart-animate easing.
                      </p>
                      <div className="phase-subheading-pin mt-2">
                        <span className="material-symbols-outlined phase-pin-symbol" style={{ color: '#38bdf8' }}>play_circle</span>
                        <span>Interactive Prototype Flow</span>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 my-3">
                      <div className="text-[11px] text-zinc-400 font-mono mb-2">Smart Animate Easing Curve</div>
                      <div className="h-10 bg-zinc-950 rounded flex items-center justify-between px-3 text-[11px] text-cyan-400 font-mono">
                        <span>cubic-bezier(0.16, 1, 0.3, 1)</span>
                        <span>300ms</span>
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 text-[11.5px] text-zinc-300">
                      <strong>Deliverables:</strong> Hi-Fi Interactive Prototypes, Micro-Interaction Specs, Video Walkthroughs.
                    </div>
                  </div>

                  {/* Connector 5 */}
                  <div className="process-flow-connector">
                    <svg viewBox="0 0 60 60" fill="none">
                      <path d="M 5,30 C 25,30 35,30 55,30" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" />
                      <circle cx="55" cy="30" r="4.5" fill="#38bdf8" />
                    </svg>
                  </div>

                  {/* Phase 06: Usability & Dev Handoff */}
                  <div
                    className={`process-phase-box figma-selectable-node ${selectedNodeId === 'process-p6' ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode('process-p6', 'Phase 06: Dev Handoff', 'Frame');
                    }}
                    style={{
                      borderRadius: nodeProps['process-p6']?.radius ? `${nodeProps['process-p6'].radius}px` : undefined,
                      backgroundColor: nodeProps['process-p6']?.fill || undefined,
                      borderColor: nodeProps['process-p6']?.stroke || undefined,
                      opacity: nodeProps['process-p6']?.opacity !== undefined ? nodeProps['process-p6'].opacity / 100 : undefined
                    }}
                  >
                    {selectedNodeId === 'process-p6' && (
                      <div className="figma-selection-overlay">
                        <div className="selection-tag">❖ Phase 06: Dev Handoff [380×560]</div>
                        <div className="selection-handle tl" /><div className="selection-handle tr" />
                        <div className="selection-handle bl" /><div className="selection-handle br" />
                      </div>
                    )}
                    <div className="phase-header-block mb-3">
                      <h2 className="phase-title-large text-[#10b981]">Phase 06: Dev Handoff</h2>
                      <p className="phase-desc-muted">
                        Figma Inspect redlines, tokenized CSS variables, React component parity, and rigorous usability testing.
                      </p>
                      <div className="phase-subheading-pin mt-2">
                        <span className="material-symbols-outlined phase-pin-symbol" style={{ color: '#10b981' }}>code</span>
                        <span>React / Tailwind Production Parity</span>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 font-mono text-[11px] text-emerald-400 my-3">
                      <code>export const Button = ({`{ variant, size }`}) =&gt; ...</code>
                    </div>
                    <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 text-[11.5px] text-zinc-300">
                      <strong>Deliverables:</strong> Inspect Mode Redlines, React/Tailwind Code Parity, Usability Report (30% less drop-off).
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
              <div className="view-content-wrapper" style={{ padding: '20px 30px 140px', minWidth: '1200px' }}>
                <div className="plugins-page-wrapper">
                  {/* Creative Hero Banner */}
                  <div className="plugins-hero-banner">
                    <div className="plugins-hero-text">
                      <h2>
                        <span className="material-symbols-outlined text-[24px] text-[#ffb5a1]">extension</span>
                        Figma Community & Creative Extensions
                      </h2>
                      <p>
                        Supercharge your product design workflows — from generative AI copy and vector generation to automated WCAG AA accessibility compliance audits.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={COMMUNITY_PLUGINS[0].link}
                        target="_blank"
                        rel="noreferrer"
                        className="cta-btn primary"
                        onClick={() => {
                          window.open(COMMUNITY_PLUGINS[0].link, '_blank');
                        }}
                      >
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        <span>Open Magician in Figma</span>
                      </a>
                    </div>
                  </div>

                  {/* Filter Toolbar & Search */}
                  <div className="plugins-filter-toolbar">
                    <div className="activity-filter-pills">
                      {['All', 'AI & Automation', 'Diagramming', 'Accessibility', 'Content', 'Assets & Icons', 'Media', 'Productivity', 'Automation'].map(cat => (
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

                  {/* Creative Plugins Grid */}
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
                        <span className="material-symbols-outlined text-[16px] text-[#ffb5a1]">
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
