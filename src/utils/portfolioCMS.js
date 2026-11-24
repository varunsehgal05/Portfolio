/**
 * VarunOS Portfolio CMS (Content Management System)
 * Central persistent store for profile, projects, experience, desktop/dock apps,
 * Render & Vercel deployment links/hooks, and system settings.
 * Updates in AdminPortal automatically dispatch 'varunos-cms-updated' to update the live site.
 */
import { portfolioApps, desktopIconIds as defaultDesktopIconIds } from '../config/apps';

const CMS_STORAGE_KEY = 'varunos_cms_data';

const DEFAULT_APPS_LIST = [
  {
    ...portfolioApps.finder,
    subtitle: 'Projects & Work',
    showOnDesktop: defaultDesktopIconIds.includes('finder'),
    showInDock: true,
    showOnDevice: true
  },
  {
    ...portfolioApps.figma,
    subtitle: 'Design Workspace',
    showOnDesktop: defaultDesktopIconIds.includes('figma'),
    showInDock: true,
    showOnDevice: true
  },
  {
    ...portfolioApps.vscode,
    subtitle: 'Web IDE & Code',
    showOnDesktop: defaultDesktopIconIds.includes('vscode'),
    showInDock: true,
    showOnDevice: true
  },
  {
    ...portfolioApps.terminal,
    subtitle: 'Zsh Shell',
    showOnDesktop: defaultDesktopIconIds.includes('terminal'),
    showInDock: true,
    showOnDevice: true
  },
  {
    ...portfolioApps.resume,
    subtitle: 'Interactive CV',
    showOnDesktop: defaultDesktopIconIds.includes('resume'),
    showInDock: true,
    showOnDevice: true
  },
  {
    ...portfolioApps.contact,
    subtitle: 'Get in Touch',
    showOnDesktop: defaultDesktopIconIds.includes('contact'),
    showInDock: true,
    showOnDevice: true
  },
  {
    ...portfolioApps.reviews,
    subtitle: 'Testimonials',
    showOnDesktop: defaultDesktopIconIds.includes('reviews'),
    showInDock: true,
    showOnDevice: true
  },
  {
    ...portfolioApps.coffee,
    subtitle: 'Support Varun',
    showOnDesktop: defaultDesktopIconIds.includes('coffee'),
    showInDock: true,
    showOnDevice: true
  },
  {
    ...portfolioApps.settings,
    subtitle: 'Customization',
    showOnDesktop: defaultDesktopIconIds.includes('settings'),
    showInDock: true,
    showOnDevice: true
  },
  {
    ...portfolioApps.trash,
    subtitle: 'Recycle Bin',
    showOnDesktop: defaultDesktopIconIds.includes('trash'),
    showInDock: true,
    showOnDevice: true
  }
];

export const DEFAULT_CMS_DATA = {
  profile: {
    name: 'Varun Sehgal',
    title: 'Lead UI/UX Designer & Product Designer',
    tagline: 'Designing intuitive web apps & modern interfaces that make complex things feel simple.',
    bio: 'UI/UX & Product Designer with 3+ years delivering high-impact SaaS and AI product experiences. Skilled in user research, wireframing, rapid prototyping, and design systems.',
    email: 'varun.sehgal02@gmail.com',
    phone: '+91 9399361193',
    location: 'Gwalior, Madhya Pradesh, India',
    github: 'https://github.com/varunsehgal05',
    linkedin: 'https://linkedin.com/in/varunsehgal02',
    behance: 'https://behance.net/varunsehgal3',
    portfolioUrl: 'https://varunsehgal.runs-on.dev',
    statusBadge: 'Available for New Product Roles & Projects'
  },
  projects: [
    {
      id: 'ai-interview',
      title: 'AI Interview & Prep Platform',
      category: 'Vibecoded • AI SaaS',
      desc: 'Architected AI-driven SaaS platform with dedicated Security & Grading modules automating candidate evaluation.',
      date: 'Nov 2026',
      size: '14.2 MB',
      tags: ['Figma', 'SaaS', 'AI UX', 'Dark Mode'],
      link: 'https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842',
      appId: 'figma'
    },
    {
      id: 'eventflow',
      title: 'EventFlow: Event Ticketing SaaS',
      category: 'Design System • Web SaaS',
      desc: '4-step checkout flow optimization cutting drop-off by 30% with a 50+ component modular design system.',
      date: 'Oct 2026',
      size: '8.7 MB',
      tags: ['Design System', 'Figma', 'Checkout UX'],
      link: 'https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2',
      appId: 'figma'
    },
    {
      id: 'expensify',
      title: 'Expensify: Budget Tracker App',
      category: 'Mobile UX • Fintech',
      desc: '17+ mobile screens refined for rapid expense logging under 5 seconds with real-time financial telemetry.',
      date: 'Sep 2026',
      size: '6.4 MB',
      tags: ['Mobile UX', 'Micro-interactions', 'Fintech'],
      link: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318',
      appId: 'figma'
    },
    {
      id: 'codesrijan',
      title: 'CodeSrijan Hackathon Platform',
      category: 'Vibecoded • Vercel Live',
      desc: 'National hackathon ecosystem vibecoded & engineered by Varun Sehgal for 200+ hackathon participants.',
      date: 'Aug 2026',
      size: '12.1 MB',
      tags: ['Vibecoded', 'Next.js', 'Vercel Live', 'Hackathon'],
      link: 'http://codesrijan-nine.vercel.app/',
      appId: 'vscode'
    }
  ],
  experiences: [
    {
      id: 'unievent',
      title: 'UI-UX Designer',
      company: 'UniEvent (Remote · Punjab, India)',
      date: 'Jul 2026 – Nov 2026',
      desc: 'Designed user-focused digital experiences and translated complex business requirements into clear, consistent interfaces for campus event ticketing platform (EventFlow).',
      tags: ['Figma', 'Canva', 'Design Systems', 'EventFlow']
    },
    {
      id: 'assemble',
      title: 'Assistant Head of CODM Esports Operations',
      company: 'Assemble (Remote · Bharatpur, Rajasthan)',
      date: 'Aug 2025 – Jan 2026',
      desc: 'Assisted in the planning and smooth execution of CODM tournaments and esports events. Designed collaborative creator workspace tools and interaction prototypes in Figma.',
      tags: ['CODM Esports', 'Operations', 'Event Management', 'Figma']
    },
    {
      id: 'knaptix',
      title: 'Operation internship',
      company: 'Knaptix Ventures Private Limited (Remote · Pune, Maharashtra)',
      date: 'Jun 2025 – Aug 2025',
      desc: 'Operations internship and UI/UX design. Delivered brand identities and conversion-focused SaaS landing pages for 10+ tech startups.',
      tags: ['Operations', 'Figma', 'UI UX Designer', 'High-Fidelity Wireframes']
    },
    {
      id: 'freelance',
      title: 'Freelance UI/UX Designer',
      company: 'Self-Employed (Remote)',
      date: 'Jan 2024 – Present',
      desc: '10+ projects shipped with 95% client retention. Delivered interactive Figma prototypes, design systems, and Webflow / React code.',
      tags: ['Figma', 'React', 'Freelance', 'High-Fidelity Wireframes']
    }
  ],
  apps: DEFAULT_APPS_LIST,
  deployments: {
    githubRepo: 'https://github.com/varunsehgal05/Portfolio',
    branch: 'main',
    vercelProjectName: 'portfolio-site',
    vercelProjectId: 'prj_e3VkjvJggGFUjGMuWXVHSIuVxiBJ',
    vercelUrl: 'https://portfolio-site-varunsehgal05.vercel.app',
    vercelDeployHook: '',
    lastVercelDeploy: '',
    renderServiceName: 'Portfolio (Static Site)',
    renderUrl: 'https://portfolio-varun.onrender.com',
    renderDeployHook: '',
    lastRenderDeploy: ''
  },
  system: {
    authorName: 'Varun Sehgal',
    themeMode: 'dark',
    defaultWallpaper: 'default',
    soundEnabled: true
  }
};

const mergeAppsList = (savedApps) => {
  if (!Array.isArray(savedApps) || savedApps.length === 0) {
    return DEFAULT_APPS_LIST.map((a) => ({ ...a }));
  }
  const byId = new Map(savedApps.map((a) => [a.id, a]));
  const merged = savedApps.map((saved) => {
    const def = DEFAULT_APPS_LIST.find((d) => d.id === saved.id) || {};
    return { ...def, ...saved };
  });
  for (const def of DEFAULT_APPS_LIST) {
    if (!byId.has(def.id)) merged.push({ ...def });
  }
  return merged;
};

/**
 * Retrieve current CMS data, merging saved values with defaults
 */
export const getCMSData = () => {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return DEFAULT_CMS_DATA;
    const parsed = JSON.parse(raw);
    return {
      profile: { ...DEFAULT_CMS_DATA.profile, ...(parsed.profile || {}) },
      projects: Array.isArray(parsed.projects) ? parsed.projects : DEFAULT_CMS_DATA.projects,
      experiences: Array.isArray(parsed.experiences) ? parsed.experiences : DEFAULT_CMS_DATA.experiences,
      apps: mergeAppsList(parsed.apps),
      deployments: { ...DEFAULT_CMS_DATA.deployments, ...(parsed.deployments || {}) },
      system: { ...DEFAULT_CMS_DATA.system, ...(parsed.system || {}) }
    };
  } catch (err) {
    console.error('Failed to load CMS data:', err);
    return DEFAULT_CMS_DATA;
  }
};

/**
 * Return merged portfolioApps dictionary & ordered desktop/dock lists from live CMS
 */
export const getLiveAppsConfig = () => {
  const { apps } = getCMSData();
  const appMap = { ...portfolioApps };
  const desktopIds = [];
  const dockIds = [];
  const deviceIds = [];

  for (const item of apps) {
    appMap[item.id] = { ...(portfolioApps[item.id] || {}), ...item };
    if (item.showOnDesktop) desktopIds.push(item.id);
    if (item.showInDock !== false) dockIds.push(item.id);
    if (item.showOnDevice !== false) deviceIds.push(item.id);
  }

  return { apps, appMap, desktopIds, dockIds, deviceIds };
};

/**
 * Save updated CMS data and dispatch live update event
 */
export const saveCMSData = (newData) => {
  try {
    const current = getCMSData();
    const updated = {
      ...current,
      ...newData,
      profile: { ...current.profile, ...(newData.profile || {}) },
      deployments: { ...current.deployments, ...(newData.deployments || {}) },
      system: { ...current.system, ...(newData.system || {}) }
    };
    if (newData.projects) updated.projects = newData.projects;
    if (newData.experiences) updated.experiences = newData.experiences;
    if (newData.apps) updated.apps = newData.apps;

    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('varunos-cms-updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Failed to save CMS data:', err);
    return null;
  }
};

/**
 * Reset CMS data back to original factory defaults
 */
export const resetCMSData = () => {
  try {
    localStorage.removeItem(CMS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('varunos-cms-updated', { detail: DEFAULT_CMS_DATA }));
    return DEFAULT_CMS_DATA;
  } catch (err) {
    console.error('Failed to reset CMS data:', err);
    return DEFAULT_CMS_DATA;
  }
};

/**
 * Export CMS data as downloadable formatted JSON string
 */
export const exportCMSConfigJSON = () => {
  return JSON.stringify(getCMSData(), null, 2);
};

/**
 * Import and apply CMS config from JSON string
 */
export const importCMSConfigJSON = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON format');
    return saveCMSData(parsed);
  } catch (err) {
    console.error('Failed to import CMS config:', err);
    return null;
  }
};
