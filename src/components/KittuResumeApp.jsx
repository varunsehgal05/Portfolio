import React, { useState, useEffect, useRef } from 'react';
import './KittuResume.css';

/**
 * KittuResumeApp
 * Pixel-perfect recreation of https://www.kittu.pro/resume
 * Includes notebook paper styling, hand-drawn wobbly cards, custom fonts,
 * and the collaborative multiplayer cursor build animation ("one by one or 2 at a time").
 */

const KittuResumeApp = ({
  onBack,
  onTriggerSwarm,
  onScrollToTop,
  isParentLoading = false,
  canvasPan = { x: 0, y: 0 },
  canvasZoom = 1
}) => {
  const [copied, setCopied] = useState(false);
  const [isBuilding, setIsBuilding] = useState(true);
  const [buildStage, setBuildStage] = useState(0);
  const [typedName, setTypedName] = useState('');
  const [typedLede, setTypedLede] = useState('');
  const [typedNoteHead, setTypedNoteHead] = useState('');
  const [typedNoteBody, setTypedNoteBody] = useState('');
  const [typedPolaroidCaption, setTypedPolaroidCaption] = useState('');
  const [typedStat1, setTypedStat1] = useState('');
  const [typedStat2, setTypedStat2] = useState('');
  const [typedStat3, setTypedStat3] = useState('');
  const [typedWork, setTypedWork] = useState({});
  const [typedTimeline, setTypedTimeline] = useState('');
  const [typedJobs, setTypedJobs] = useState({});
  const [typedJobBullets, setTypedJobBullets] = useState({});
  const [typedStudy, setTypedStudy] = useState({});
  const [typedProjects, setTypedProjects] = useState({});
  const [typedProjectDescs, setTypedProjectDescs] = useState({});
  const [typedEmail, setTypedEmail] = useState('');
  const [activeCursors, setActiveCursors] = useState([]);
  const [activeSelection, setActiveSelection] = useState(null);
  const [activeGuides, setActiveGuides] = useState([]);
  const [sectionsTriggered, setSectionsTriggered] = useState({
    workOn: false,
    timeline: false,
    projects: false,
    contact: false
  });
  const containerRef = useRef(null);
  const buildTimeoutRef = useRef([]);
  const isReplayingRef = useRef(false);
  const sectionsTriggeredRef = useRef({
    workOn: false,
    timeline: false,
    projects: false,
    contact: false
  });

  const copyEmail = () => {
    navigator.clipboard?.writeText('varun.sehgal02@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearTimeouts = () => {
    buildTimeoutRef.current.forEach(t => clearTimeout(t));
    buildTimeoutRef.current = [];
  };

  const schedule = (fn, delay) => {
    const id = setTimeout(fn, delay);
    buildTimeoutRef.current.push(id);
    return id;
  };

  // Helper to coordinate all 4 Swarm agents simultaneously
  const set4Swarm = ({
    varun = {},
    elena = {},
    sarah = {},
    alex = {}
  }) => {
    setActiveCursors([
      {
        id: 'varun',
        name: 'Varun Sehgal',
        color: '#A259FF',
        tool: 'T',
        role: 'Typing',
        ...varun
      },
      {
        id: 'elena',
        name: 'Elena Rostova',
        color: '#F59E0B',
        tool: 'R',
        role: 'Framing',
        ...elena
      },
      {
        id: 'sarah',
        name: 'Sarah Lin',
        color: '#0ACF83',
        tool: '❖',
        role: 'Stamping',
        ...sarah
      },
      {
        id: 'alex',
        name: 'Alex Chen',
        color: '#1ABCFE',
        tool: 'V',
        role: 'Layout',
        ...alex
      }
    ]);
  };

  // Helper to coordinate 2 concurrent Swarm agents simultaneously
  const set2Swarm = ({
    elena = {},
    varun = {}
  }) => {
    setActiveCursors([
      {
        id: 'elena',
        name: 'Elena Rostova',
        color: '#F59E0B',
        tool: 'R',
        role: 'Framing',
        ...elena
      },
      {
        id: 'varun',
        name: 'Varun Sehgal',
        color: '#A259FF',
        tool: 'T',
        role: 'Typing',
        ...varun
      }
    ]);
  };

  // Human-calibrated letter-by-letter typing helper with cursor tracking
  const typeText = (str, setter, startDelay, interval = 28, cursorId = 'varun', cursorBaseX = null) => {
    for (let i = 1; i <= str.length; i++) {
      schedule(() => {
        setter(str.slice(0, i));
        if (cursorId && cursorBaseX !== null) {
          setActiveCursors(prev => prev.map(c => c.id === cursorId ? { ...c, x: cursorBaseX + i * 14 } : c));
        }
      }, startDelay + i * interval);
    }
  };

  // Helper to dynamically get real rendered bounding box relative to .cv-container, calibrated for canvas zoom
  const getBox = (selector, fallback) => {
    if (!containerRef.current) return fallback;
    const container = containerRef.current.querySelector('.cv-container') || containerRef.current;
    const el = container.querySelector(selector);
    if (!el) return fallback;
    const z = canvasZoom || 1;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    if (eRect.width < 10 || eRect.height < 10) return fallback;
    return {
      x: Math.round((eRect.left - cRect.left) / z),
      y: Math.round((eRect.top - cRect.top) / z),
      w: Math.round(eRect.width / z),
      h: Math.round(eRect.height / z)
    };
  };

  // Build Top Section: 4 Swarm Agents collaborating simultaneously
  // (Elena Frames Wireframe Bounds, Alex Measures Grid Tokens, Sarah Stamps Materials, Varun Types Content)
  const buildTopSection = () => {
    clearTimeouts();
    setIsBuilding(true);
    setBuildStage(0);
    setTypedName('');
    setTypedLede('');
    setTypedNoteHead('');
    setTypedNoteBody('');
    setTypedPolaroidCaption('');
    setTypedStat1('');
    setTypedStat2('');
    setTypedStat3('');
    setTypedWork({});
    setTypedTimeline('');
    setTypedProjects({});
    setTypedEmail('');
    setActiveCursors([]);
    setActiveSelection(null);
    setActiveGuides([]);
    sectionsTriggeredRef.current = {
      workOn: false,
      timeline: false,
      projects: false,
      contact: false
    };
    setSectionsTriggered({
      workOn: false,
      timeline: false,
      projects: false,
      contact: false
    });

    // 1. All 4 Swarm agents enter top of blank sheet together (multitasking start)
    schedule(() => {
      const box = getBox('.cv-name', { x: 28, y: 35, w: 460, h: 75 });
      const boxPol = getBox('.cv-polaroid', { x: 730, y: 110, w: 260, h: 260 });
      set4Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        alex: { x: box.x + box.w + 24, y: box.y + 12, tool: 'V', role: 'Layout' },
        sarah: { x: boxPol.x + 30, y: boxPol.y + 30, tool: '❖', role: 'Stamping' },
        varun: { x: box.x + 35, y: box.y + 18, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
      setActiveGuides([{ type: 'h', y: box.y + box.h, x1: box.x, x2: box.x + box.w }]);
    }, 100);

    // 2. Stage 1: Varun types "Varun Sehgal" with tracking cursor, Elena holds frame, Sarah pre-stages polaroid, Alex measures
    schedule(() => {
      const box = getBox('.cv-name', { x: 28, y: 35, w: 460, h: 75 });
      const boxPol = getBox('.cv-polaroid', { x: 730, y: 110, w: 260, h: 260 });
      set4Swarm({
        elena: { x: box.x + box.w - 10, y: box.y + box.h, tool: 'R', role: 'Framing' },
        alex: { x: box.x + box.w + 24, y: box.y + 12, tool: 'V', role: 'Layout' },
        sarah: { x: boxPol.x + 40, y: boxPol.y + 30, tool: '❖', role: 'Stamping' },
        varun: { x: box.x + 35, y: box.y + 18, tool: 'T', role: 'Typing' }
      });
      typeText('Varun Sehgal', setTypedName, 40, 32, 'varun', box.x + 35);
    }, 320);

    // 3. Stage 2: Value Prop / Lede (4 Swarm Coordinated Multitasking)
    schedule(() => {
      setBuildStage(1);
      const boxLede = getBox('.cv-lede', { x: 28, y: 125, w: 600, h: 160 });
      const boxPol = getBox('.cv-polaroid', { x: 730, y: 110, w: 260, h: 260 });
      set4Swarm({
        elena: { x: boxLede.x, y: boxLede.y, tool: 'R', role: 'Framing' },
        alex: { x: boxLede.x + boxLede.w + 20, y: boxLede.y + 24, tool: 'V', role: 'Layout' },
        sarah: { x: boxPol.x + 50, y: boxPol.y + 40, tool: '❖', role: 'Stamping' },
        varun: { x: boxLede.x + 24, y: boxLede.y + 20, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: boxLede.x, y: boxLede.y, w: boxLede.w, h: boxLede.h });
      setActiveGuides([{ type: 'v', x: boxLede.x + boxLede.w, y1: boxLede.y, y2: boxLede.y + boxLede.h }]);
      typeText('I study and craft friction-free product experiences: tactile, beautiful, and fast.', setTypedLede, 80, 16, 'varun', boxLede.x + 24);
    }, 850);

    // 4. Stage 3: Polaroid Photo (Tactile Stamp & Caption Typing)
    schedule(() => {
      setBuildStage(2);
      const boxPol = getBox('.cv-polaroid', { x: 730, y: 110, w: 260, h: 260 });
      set4Swarm({
        elena: { x: boxPol.x, y: boxPol.y, tool: 'R', role: 'Framing' },
        alex: { x: boxPol.x + boxPol.w + 16, y: boxPol.y + 40, tool: 'V', role: 'Layout' },
        sarah: { x: boxPol.x + boxPol.w / 2, y: boxPol.y + 90, tool: '❖', role: 'Stamping' },
        varun: { x: boxPol.x + 28, y: boxPol.y + boxPol.h - 18, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: boxPol.x, y: boxPol.y, w: boxPol.w, h: boxPol.h });
      setActiveGuides([]);
      setBuildStage(3); // Pops with cv-stamp-pop!
      typeText('Varun Sehgal, 2026 →', setTypedPolaroidCaption, 60, 20);
    }, 1900);

    // 5. Stage 4: Stat 1 (6+ Projects)
    schedule(() => {
      const box1 = getBox('.cv-stats li:nth-child(1)', { x: 28, y: 460, w: 320, h: 85 });
      const box2 = getBox('.cv-stats li:nth-child(2)', { x: 372, y: 460, w: 320, h: 85 });
      set4Swarm({
        elena: { x: box2.x, y: box2.y, tool: 'R', role: 'Framing' },
        alex: { x: box1.x + box1.w + 12, y: box1.y + 16, tool: 'V', role: 'Layout' },
        sarah: { x: box1.x + box1.w / 2, y: box1.y + 24, tool: '❖', role: 'Stamping' },
        varun: { x: box1.x + 36, y: box1.y + 22, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box1.x, y: box1.y, w: box1.w, h: box1.h });
      setBuildStage(4);
      typeText('6+', setTypedStat1, 40, 30);
    }, 2900);

    // 6. Stage 5: Stat 2 (200+ Hackers)
    schedule(() => {
      const box2 = getBox('.cv-stats li:nth-child(2)', { x: 372, y: 460, w: 320, h: 85 });
      const box3 = getBox('.cv-stats li:nth-child(3)', { x: 716, y: 460, w: 320, h: 85 });
      set4Swarm({
        elena: { x: box3.x, y: box3.y, tool: 'R', role: 'Framing' },
        alex: { x: box2.x + box2.w + 12, y: box2.y + 16, tool: 'V', role: 'Layout' },
        sarah: { x: box2.x + box2.w / 2, y: box2.y + 24, tool: '❖', role: 'Stamping' },
        varun: { x: box2.x + 36, y: box2.y + 22, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box2.x, y: box2.y, w: box2.w, h: box2.h });
      setBuildStage(5);
      typeText('200+', setTypedStat2, 40, 30);
    }, 3700);

    // 7. Stage 6: Stat 3 (🥈 1st Runner-Up at HACKeThor)
    schedule(() => {
      const box3 = getBox('.cv-stats li:nth-child(3)', { x: 716, y: 460, w: 320, h: 85 });
      set4Swarm({
        elena: { x: box3.x, y: box3.y, tool: 'R', role: 'Framing' },
        alex: { x: box3.x + box3.w - 10, y: box3.y + 16, tool: 'V', role: 'Layout' },
        sarah: { x: box3.x + box3.w / 2, y: box3.y + 24, tool: '❖', role: 'Stamping' },
        varun: { x: box3.x + 36, y: box3.y + 22, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box3.x, y: box3.y, w: box3.w, h: box3.h });
      setBuildStage(6);
      typeText('🥈 1st Runner-Up', setTypedStat3, 40, 25);
    }, 4500);

    // 8. Top section complete -> 4 Swarm agents smoothly finalize top frame
    schedule(() => {
      setBuildStage(7);
      setActiveSelection(null);
      setActiveGuides([]);
      const statBox = getBox('.cv-stats li:nth-child(2)', { x: 372, y: 460, w: 320, h: 85 });
      set4Swarm({
        elena: { x: statBox.x - 60, y: statBox.y + statBox.h + 20, tool: '✓', role: 'Framing' },
        alex: { x: statBox.x + 50, y: statBox.y + statBox.h + 20, tool: '✓', role: 'Layout' },
        sarah: { x: statBox.x + 170, y: statBox.y + statBox.h + 20, tool: '✓', role: 'Stamping' },
        varun: { x: statBox.x + 290, y: statBox.y + statBox.h + 20, tool: '✓', role: 'Typing' }
      });
    }, 5100);

    // 8b. Swarm smoothly glides down and fades out
    schedule(() => {
      const statBox = getBox('.cv-stats li:nth-child(2)', { x: 372, y: 460, w: 320, h: 85 });
      set4Swarm({
        elena: { x: statBox.x - 60, y: statBox.y + statBox.h + 40, tool: '✓', role: 'Framing', opacity: 0 },
        alex: { x: statBox.x + 50, y: statBox.y + statBox.h + 40, tool: '✓', role: 'Layout', opacity: 0 },
        sarah: { x: statBox.x + 170, y: statBox.y + statBox.h + 40, tool: '✓', role: 'Stamping', opacity: 0 },
        varun: { x: statBox.x + 290, y: statBox.y + statBox.h + 40, tool: '✓', role: 'Typing', opacity: 0 }
      });
    }, 5450);

    // 9. Seamlessly populate and smoothly reveal all sections: eliminates giant blank space, dismisses swarm cursors cleanly
    schedule(() => {
      setTypedWork({ 0: 'Product Design & Systems', 1: 'Tactile Hi-Fi Prototyping', 2: 'Design Engineering' });
      setTypedTimeline('UI-UX Designer, UniEvent');
      setTypedJobs({
        0: 'UI-UX Designer, UniEvent',
        1: 'Assistant Head of CODM Esports Operations',
        2: 'Operation internship'
      });
      setTypedJobBullets({
        '0_0': 'Designed campus event ticketing platform (EventFlow) from initial wireframes to high-fidelity clickable prototype.',
        '1_0': 'Assisted in the planning and smooth execution of CODM tournaments and esports events.',
        '2_0': 'Operations support, brand identities, and conversion-focused SaaS landing pages for 10+ tech startups.'
      });
      setTypedStudy({
        0: 'B.Tech in Computer Science & Engineering',
        1: '🥈 HACKeThor 1st Runner-Up (2nd Place)'
      });
      setTypedProjects({
        0: 'CodeSrijan Hackathon Portal',
        1: 'EventFlow Ticketing',
        2: 'AI Interview Studio',
        3: 'Expensify Budget',
        4: 'Movie Tickets App',
        5: 'SaaS Landing Pages'
      });
      setTypedProjectDescs({
        0: 'Full-stack live hackathon platform designed for Jaypee University with team matchmaking & rubric evaluation.',
        1: 'Campus event discovery & instant booking platform with 30% reduced drop-off.',
        2: 'AI-driven technical interviewing platform with speech synthesis & scoring.',
        3: 'Personal finance & expense manager with real-time analytics & graphs.',
        4: 'Cinema ticketing & seat reservation flow with micro-interactions.',
        5: 'High-converting responsive landing pages built for 10+ tech startups.'
      });
      setTypedEmail('varun.sehgal02@gmail.com');
      setSectionsTriggered({
        workOn: true,
        timeline: true,
        projects: true,
        contact: true
      });
      sectionsTriggeredRef.current = {
        workOn: true,
        timeline: true,
        projects: true,
        contact: true
      };
      setBuildStage(24);
      setIsBuilding(false);
      setActiveCursors([]); // Dismiss swarm cursors so they do not get stuck
      setActiveSelection(null);
      setActiveGuides([]);
    }, 5800);
  };

  // Progressive section builders triggered dynamically on scroll
  const triggerSection = (sectionKey) => {
    if (sectionsTriggeredRef.current[sectionKey]) return;
    sectionsTriggeredRef.current[sectionKey] = true;
    setSectionsTriggered(prev => ({ ...prev, [sectionKey]: true }));

    if (sectionKey === 'workOn') {
      // Section: What I work on (Cards 1, 2, 3 - 2 Swarm Collaborative Framing & Live Typing)
      // Card 1: Product Design & Systems
      schedule(() => {
        const box0 = getBox('.cv-thread-0', { x: 28, y: 730, w: 320, h: 195 });
        set2Swarm({
          elena: { x: box0.x, y: box0.y, tool: 'R', role: 'Framing' },
          varun: { x: box0.x + 30, y: box0.y + 24, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: box0.x, y: box0.y, w: box0.w, h: box0.h });
        setActiveGuides([]);
      }, 100);

      typeText('Product Design & Systems', (t) => setTypedWork(prev => ({ ...prev, 0: t })), 250, 30);

      schedule(() => {
        setBuildStage(s => Math.max(s, 9));
      }, 1100);

      // Card 2: Tactile Hi-Fi Prototyping
      schedule(() => {
        const box1 = getBox('.cv-thread-1', { x: 372, y: 730, w: 320, h: 195 });
        set2Swarm({
          elena: { x: box1.x, y: box1.y, tool: 'R', role: 'Framing' },
          varun: { x: box1.x + 30, y: box1.y + 24, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: box1.x, y: box1.y, w: box1.w, h: box1.h });
        setActiveGuides([]);
      }, 1250);

      typeText('Tactile Hi-Fi Prototyping', (t) => setTypedWork(prev => ({ ...prev, 1: t })), 1400, 30);

      schedule(() => {
        setBuildStage(s => Math.max(s, 10));
      }, 2250);

      // Card 3: Design Engineering
      schedule(() => {
        const box2 = getBox('.cv-thread-2', { x: 716, y: 730, w: 320, h: 195 });
        set2Swarm({
          elena: { x: box2.x, y: box2.y, tool: 'R', role: 'Framing' },
          varun: { x: box2.x + 30, y: box2.y + 24, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: box2.x, y: box2.y, w: box2.w, h: box2.h });
        setActiveGuides([]);
      }, 2400);

      typeText('Design Engineering', (t) => setTypedWork(prev => ({ ...prev, 2: t })), 2550, 30);

      schedule(() => {
        setBuildStage(s => Math.max(s, 11));
        setActiveSelection(null);
        setActiveGuides([]);
        const box2 = getBox('.cv-thread-2', { x: 716, y: 730, w: 320, h: 195 });
        set2Swarm({
          elena: { x: box2.x - 40, y: box2.y + box2.h + 24, role: 'Framing' },
          varun: { x: box2.x + 120, y: box2.y + box2.h + 24, role: 'Typing' }
        });
      }, 3400);
    }
    else if (sectionKey === 'timeline') {
      // Section: Where I've worked & Study (2 Swarms working at once: Elena frames & stamps, Varun types title AND bullets!)
      // Job 1: UniEvent (Stage 12)
      schedule(() => {
        const box0 = getBox('.cv-job:nth-child(1)', { x: 28, y: 990, w: 1032, h: 100 });
        set2Swarm({
          elena: { x: box0.x, y: box0.y + 12, tool: 'R', role: 'Framing' },
          varun: { x: box0.x + 180, y: box0.y + 14, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: box0.x, y: box0.y, w: box0.w, h: box0.h });
        setActiveGuides([]);
      }, 100);

      typeText('UI-UX Designer, UniEvent', (t) => {
        setTypedJobs(prev => ({ ...prev, 0: t }));
        setTypedTimeline(t);
      }, 200, 24);

      schedule(() => {
        const box0 = getBox('.cv-job:nth-child(1)', { x: 28, y: 990, w: 1032, h: 100 });
        set2Swarm({
          elena: { x: box0.x + box0.w - 180, y: box0.y + 16, tool: 'R', role: 'Framing' },
          varun: { x: box0.x + 180, y: box0.y + 42, tool: 'T', role: 'Typing' }
        });
      }, 850);

      typeText('Designed campus event ticketing platform (EventFlow) from initial wireframes to high-fidelity clickable prototype.', (t) => {
        setTypedJobBullets(prev => ({ ...prev, '0_0': t }));
      }, 950, 9);

      schedule(() => {
        setBuildStage(s => Math.max(s, 12));
      }, 1900);

      // Job 2: Assemble Esports (Stage 13)
      schedule(() => {
        const box1 = getBox('.cv-job:nth-child(2)', { x: 28, y: 1110, w: 1032, h: 100 });
        set2Swarm({
          elena: { x: box1.x, y: box1.y + 12, tool: 'R', role: 'Framing' },
          varun: { x: box1.x + 180, y: box1.y + 14, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: box1.x, y: box1.y, w: box1.w, h: box1.h });
        setActiveGuides([]);
      }, 2050);

      typeText('Assistant Head of CODM Esports Operations, Assemble', (t) => {
        setTypedJobs(prev => ({ ...prev, 1: t }));
      }, 2150, 22);

      schedule(() => {
        const box1 = getBox('.cv-job:nth-child(2)', { x: 28, y: 1110, w: 1032, h: 100 });
        set2Swarm({
          elena: { x: box1.x + box1.w - 180, y: box1.y + 16, tool: 'R', role: 'Framing' },
          varun: { x: box1.x + 180, y: box1.y + 42, tool: 'T', role: 'Typing' }
        });
      }, 2850);

      typeText('Assisted in the planning and smooth execution of CODM tournaments and esports events.', (t) => {
        setTypedJobBullets(prev => ({ ...prev, '1_0': t }));
      }, 2950, 10);

      schedule(() => {
        setBuildStage(s => Math.max(s, 13));
      }, 3800);

      // Job 3: Knaptix Ventures (Stage 14)
      schedule(() => {
        const box2 = getBox('.cv-job:nth-child(3)', { x: 28, y: 1230, w: 1032, h: 100 });
        set2Swarm({
          elena: { x: box2.x, y: box2.y + 12, tool: 'R', role: 'Framing' },
          varun: { x: box2.x + 180, y: box2.y + 14, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: box2.x, y: box2.y, w: box2.w, h: box2.h });
        setActiveGuides([]);
      }, 3950);

      typeText('Operation internship, Knaptix Ventures Private Limited', (t) => {
        setTypedJobs(prev => ({ ...prev, 2: t }));
      }, 4050, 22);

      schedule(() => {
        const box2 = getBox('.cv-job:nth-child(3)', { x: 28, y: 1230, w: 1032, h: 100 });
        set2Swarm({
          elena: { x: box2.x + box2.w - 180, y: box2.y + 16, tool: 'R', role: 'Framing' },
          varun: { x: box2.x + 180, y: box2.y + 42, tool: 'T', role: 'Typing' }
        });
      }, 4750);

      typeText('Operations support, brand identities, and conversion-focused SaaS landing pages for 10+ tech startups.', (t) => {
        setTypedJobBullets(prev => ({ ...prev, '2_0': t }));
      }, 4850, 10);

      schedule(() => {
        setBuildStage(s => Math.max(s, 14));
      }, 5700);

      // Study Col 1: Education (Stage 15)
      schedule(() => {
        const boxCol1 = getBox('.cv-two > ul:nth-child(1)', { x: 28, y: 1380, w: 490, h: 150 });
        set2Swarm({
          elena: { x: boxCol1.x, y: boxCol1.y, tool: 'R', role: 'Framing' },
          varun: { x: boxCol1.x + 24, y: boxCol1.y + 20, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: boxCol1.x, y: boxCol1.y, w: boxCol1.w, h: boxCol1.h });
        setActiveGuides([]);
      }, 5850);

      typeText('B.Tech in Computer Science & Engineering', (t) => {
        setTypedStudy(prev => ({ ...prev, 0: t }));
      }, 5950, 22);

      schedule(() => {
        setBuildStage(s => Math.max(s, 15));
      }, 6600);

      // Study Col 2: Honors & Toolkit (Stage 16)
      schedule(() => {
        const boxCol2 = getBox('.cv-two > ul:nth-child(2)', { x: 546, y: 1380, w: 490, h: 150 });
        set2Swarm({
          elena: { x: boxCol2.x + boxCol2.w - 20, y: boxCol2.y + 16, tool: 'R', role: 'Framing' },
          varun: { x: boxCol2.x + 24, y: boxCol2.y + 20, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: boxCol2.x, y: boxCol2.y, w: boxCol2.w, h: boxCol2.h });
        setActiveGuides([]);
      }, 6750);

      typeText('🥈 HACKeThor 1st Runner-Up (2nd Place)', (t) => {
        setTypedStudy(prev => ({ ...prev, 1: t }));
      }, 6850, 22);

      schedule(() => {
        setBuildStage(s => Math.max(s, 16));
        setActiveSelection(null);
        setActiveGuides([]);
      }, 7500);
    }
    else if (sectionKey === 'projects') {
      // Section: Things I've made (6 Projects - 2 Swarms framing boxes and typing titles & descriptions!)
      // Project 1: CodeSrijan (Hero Card)
      schedule(() => {
        const box = getBox('.cv-made > li:nth-child(1)', { x: 28, y: 1510, w: 1032, h: 230 });
        set2Swarm({
          elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
          varun: { x: box.x + 360, y: box.y + 36, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
        setActiveGuides([{ type: 'h', y: box.y, x1: box.x, x2: box.x + box.w }]);
      }, 100);

      typeText('CodeSrijan Hackathon Portal', (t) => {
        setTypedProjects(prev => ({ ...prev, 0: t }));
      }, 150, 20);

      typeText('Full-stack live hackathon platform designed for Jaypee University with team matchmaking & rubric evaluation.', (t) => {
        setTypedProjectDescs(prev => ({ ...prev, 0: t }));
      }, 700, 9);

      schedule(() => {
        setBuildStage(s => Math.max(s, 17));
      }, 1600);

      // Project 2: EventFlow
      schedule(() => {
        const box = getBox('.cv-made > li:nth-child(2)', { x: 28, y: 1770, w: 320, h: 240 });
        set2Swarm({
          elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
          varun: { x: box.x + 28, y: box.y + 24, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
        setActiveGuides([{ type: 'h', y: box.y, x1: box.x, x2: box.x + box.w }]);
      }, 1750);

      typeText('EventFlow Ticketing', (t) => {
        setTypedProjects(prev => ({ ...prev, 1: t }));
      }, 1800, 22);

      typeText('Campus event discovery & instant booking platform with 30% reduced drop-off.', (t) => {
        setTypedProjectDescs(prev => ({ ...prev, 1: t }));
      }, 2250, 10);

      schedule(() => {
        setBuildStage(s => Math.max(s, 18));
      }, 3000);

      // Project 3: AI Interview
      schedule(() => {
        const box = getBox('.cv-made > li:nth-child(3)', { x: 372, y: 1770, w: 320, h: 240 });
        set2Swarm({
          elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
          varun: { x: box.x + 28, y: box.y + 24, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
        setActiveGuides([{ type: 'h', y: box.y, x1: box.x, x2: box.x + box.w }]);
      }, 3150);

      typeText('AI Interview Studio', (t) => {
        setTypedProjects(prev => ({ ...prev, 2: t }));
      }, 3200, 22);

      typeText('AI-driven technical interviewing platform with speech synthesis & scoring.', (t) => {
        setTypedProjectDescs(prev => ({ ...prev, 2: t }));
      }, 3650, 10);

      schedule(() => {
        setBuildStage(s => Math.max(s, 19));
      }, 4400);

      // Project 4: Expensify
      schedule(() => {
        const box = getBox('.cv-made > li:nth-child(4)', { x: 716, y: 1770, w: 320, h: 240 });
        set2Swarm({
          elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
          varun: { x: box.x + 28, y: box.y + 24, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
        setActiveGuides([{ type: 'h', y: box.y, x1: box.x, x2: box.x + box.w }]);
      }, 4550);

      typeText('Expensify Budget', (t) => {
        setTypedProjects(prev => ({ ...prev, 3: t }));
      }, 4600, 22);

      typeText('Personal finance & expense manager with real-time analytics & graphs.', (t) => {
        setTypedProjectDescs(prev => ({ ...prev, 3: t }));
      }, 5050, 10);

      schedule(() => {
        setBuildStage(s => Math.max(s, 20));
      }, 5800);

      // Project 5: Movie Tickets
      schedule(() => {
        const box = getBox('.cv-made > li:nth-child(5)', { x: 28, y: 2035, w: 320, h: 240 });
        set2Swarm({
          elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
          varun: { x: box.x + 28, y: box.y + 24, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
        setActiveGuides([{ type: 'h', y: box.y, x1: box.x, x2: box.x + box.w }]);
      }, 5950);

      typeText('Movie Tickets App', (t) => {
        setTypedProjects(prev => ({ ...prev, 4: t }));
      }, 6000, 22);

      typeText('Cinema ticketing & seat reservation flow with micro-interactions.', (t) => {
        setTypedProjectDescs(prev => ({ ...prev, 4: t }));
      }, 6450, 10);

      schedule(() => {
        setBuildStage(s => Math.max(s, 21));
      }, 7200);

      // Project 6: SaaS Landing
      schedule(() => {
        const box = getBox('.cv-made > li:nth-child(6)', { x: 372, y: 2035, w: 320, h: 240 });
        set2Swarm({
          elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
          varun: { x: box.x + 28, y: box.y + 24, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
        setActiveGuides([{ type: 'h', y: box.y, x1: box.x, x2: box.x + box.w }]);
      }, 7350);

      typeText('SaaS Landing Pages', (t) => {
        setTypedProjects(prev => ({ ...prev, 5: t }));
      }, 7400, 22);

      typeText('High-converting responsive landing pages built for 10+ tech startups.', (t) => {
        setTypedProjectDescs(prev => ({ ...prev, 5: t }));
      }, 7850, 10);

      schedule(() => {
        setBuildStage(s => Math.max(s, 22));
        setActiveSelection(null);
        setActiveGuides([]);
        const box = getBox('.cv-made > li:nth-child(6)', { x: 372, y: 2035, w: 320, h: 240 });
        set2Swarm({
          elena: { x: box.x + 40, y: box.y + box.h + 24, role: 'Framing' },
          varun: { x: box.x + 200, y: box.y + box.h + 24, role: 'Typing' }
        });
      }, 8600);
    }
    else if (sectionKey === 'contact') {
      // Section: Say hello (2 Swarm live typing and framing)
      schedule(() => {
        const box = getBox('.cv-contact', { x: 28, y: 2340, w: 1032, h: 180 });
        set2Swarm({
          elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
          varun: { x: box.x + 220, y: box.y + 40, tool: 'T', role: 'Typing' }
        });
        setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
        setActiveGuides([]);
      }, 100);

      typeText('varun.sehgal02@gmail.com', setTypedEmail, 200, 28);

      schedule(() => {
        setBuildStage(s => Math.max(s, 23));
      }, 1200);

      // Stage 24: Celebration & Complete
      schedule(() => {
        setBuildStage(24);
        set2Swarm({
          elena: { x: 440, y: 2420, tool: '✓', role: 'Framing' },
          varun: { x: 580, y: 2420, tool: '✓', role: 'Typing' }
        });
        setActiveSelection(null);
        setActiveGuides([]);
      }, 1600);

      // Done: build complete
      schedule(() => {
        setIsBuilding(false);
        setBuildStage(24);
        setActiveCursors([]);
        setActiveSelection(null);
        setActiveGuides([]);
      }, 2800);
    }
  };

  // Progressive scroll trigger strictly tied to notebook paper coordinates
  // Only triggers when the user manually scrolls down to explore each section!
  useEffect(() => {
    if (!isBuilding || isReplayingRef.current) return;

    const notebookScroll = Math.max(0, (36 - (canvasPan?.y || 0)) / (canvasZoom || 1));

    if (!sectionsTriggeredRef.current.workOn && notebookScroll >= 220) {
      triggerSection('workOn');
    }
    if (!sectionsTriggeredRef.current.timeline && notebookScroll >= 620) {
      if (!sectionsTriggeredRef.current.workOn) triggerSection('workOn');
      triggerSection('timeline');
    }
    if (!sectionsTriggeredRef.current.projects && notebookScroll >= 1150) {
      if (!sectionsTriggeredRef.current.timeline) triggerSection('timeline');
      triggerSection('projects');
    }
    if (!sectionsTriggeredRef.current.contact && notebookScroll >= 1750) {
      if (!sectionsTriggeredRef.current.projects) triggerSection('projects');
      triggerSection('contact');
    }
  }, [canvasPan?.y, canvasZoom, isBuilding]);

  const replayBuild = () => {
    isReplayingRef.current = true;
    buildTopSection();
    if (onScrollToTop) {
      onScrollToTop();
    }
    setTimeout(() => {
      isReplayingRef.current = false;
    }, 750);
  };

  const skipBuild = () => {
    clearTimeouts();
    setIsBuilding(false);
    setBuildStage(24);
    setTypedName('Varun Sehgal');
    setTypedLede('I study and craft friction-free product experiences: tactile, beautiful, and fast.');
    setTypedWork({ 0: 'Product Design & Systems', 1: 'Tactile Hi-Fi Prototyping', 2: 'Design Engineering' });
    setTypedTimeline('UI-UX Designer, UniEvent');
    setTypedJobs({
      0: 'UI-UX Designer, UniEvent',
      1: 'Assistant Head of CODM Esports Operations',
      2: 'Operation internship'
    });
    setTypedJobBullets({
      '0_0': 'Designed campus event ticketing platform (EventFlow) from initial wireframes to high-fidelity clickable prototype.',
      '1_0': 'Assisted in the planning and smooth execution of CODM tournaments and esports events.',
      '2_0': 'Operations support, brand identities, and conversion-focused SaaS landing pages for 10+ tech startups.'
    });
    setTypedStudy({
      0: 'B.Tech in Computer Science & Engineering',
      1: '🥈 HACKeThor 1st Runner-Up (2nd Place)'
    });
    setTypedProjects({
      0: 'CodeSrijan Hackathon Portal',
      1: 'EventFlow Ticketing',
      2: 'AI Interview Studio',
      3: 'Expensify Budget',
      4: 'Movie Tickets App',
      5: 'SaaS Landing Pages'
    });
    setTypedProjectDescs({
      0: 'Full-stack live hackathon platform designed for Jaypee University with team matchmaking & rubric evaluation.',
      1: 'Campus event discovery & instant booking platform with 30% reduced drop-off.',
      2: 'AI-driven technical interviewing platform with speech synthesis & scoring.',
      3: 'Personal finance & expense manager with real-time analytics & graphs.',
      4: 'Cinema ticketing & seat reservation flow with micro-interactions.',
      5: 'High-converting responsive landing pages built for 10+ tech startups.'
    });
    setTypedEmail('varun.sehgal02@gmail.com');
    setActiveCursors([]);
    setActiveSelection(null);
    setActiveGuides([]);
    sectionsTriggeredRef.current = {
      workOn: true,
      timeline: true,
      projects: true,
      contact: true
    };
    setSectionsTriggered({
      workOn: true,
      timeline: true,
      projects: true,
      contact: true
    });
  };

  useEffect(() => {
    if (isParentLoading) {
      clearTimeouts();
      setIsBuilding(true);
      setBuildStage(0);
      setTypedName('');
      setActiveCursors([]);
      setActiveSelection(null);
      setActiveGuides([]);
      return;
    }

    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    if (searchParams && (searchParams.get('skip') === 'true' || searchParams.get('ready') === 'true')) {
      skipBuild();
      return;
    }

    // Always start collaborative swarm build when loaded/mounted
    const timer = setTimeout(() => {
      buildTopSection();
    }, 100);

    return () => {
      clearTimeout(timer);
      clearTimeouts();
    };
  }, [isParentLoading]);

  return (
    <div className="kittu-resume-artboard-box" ref={containerRef}>
      {/* Top Header / Nav */}
      <div className="cv-top-bar">
        {onBack ? (
          <button type="button" onClick={onBack} className="cv-back-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <span>←</span> Back to Workspace
          </button>
        ) : (
          <span className="cv-back-link">
            <span>←</span> VarunOS Desktop
          </span>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            className="cv-replay-btn"
            onClick={isBuilding ? skipBuild : replayBuild}
            title={isBuilding ? "Skip the build and view full notebook" : "Replay the collaborative crowd-of-cursors build animation"}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12a8 8 0 1 0 2.6-5.9M4 4v4.5h4.5" />
            </svg>
            {isBuilding ? '⏭ Skip the build' : 'Replay the build'}
          </button>
          <a
            href="/Varun_Sehgal_Resume_Updated.pdf"
            download="Varun_Sehgal_Resume.pdf"
            className="cv-copy-btn"
            style={{ textDecoration: 'none' }}
          >
            Download PDF
          </a>
        </div>
      </div>

      {/* Main Container */}
      <div className={`cv-container ${isBuilding ? 'is-building' : ''}`}>
        {/* Collaborative Cursors Overlay when build is running */}
        {isBuilding && (
          <div className="cv-cursors" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
            {/* Active Selection Box (Clean Figma vector frame, zero duplicate tags) */}
            {activeSelection && (
              <div
                className="cv-sel"
                style={{
                  position: 'absolute',
                  left: `${activeSelection.x}px`,
                  top: `${activeSelection.y}px`,
                  width: `${activeSelection.w}px`,
                  height: `${activeSelection.h}px`,
                  border: '1.5px solid #1ABCFE',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(26, 188, 254, 0.05)',
                  opacity: 1,
                  pointerEvents: 'none'
                }}
              >
                <span style={{ position: 'absolute', top: '-4px', left: '-4px', width: '8px', height: '8px', background: '#ffffff', border: '1.5px solid #1ABCFE' }} />
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', background: '#ffffff', border: '1.5px solid #1ABCFE' }} />
                <span style={{ position: 'absolute', bottom: '-4px', left: '-4px', width: '8px', height: '8px', background: '#ffffff', border: '1.5px solid #1ABCFE' }} />
                <span style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '8px', height: '8px', background: '#ffffff', border: '1.5px solid #1ABCFE' }} />
              </div>
            )}

            {/* Smart Guides */}
            {activeGuides.map((g, idx) => (
              <div
                key={`guide-${idx}`}
                style={{
                  position: 'absolute',
                  ...(g.type === 'v'
                    ? { left: `${g.x}px`, top: `${g.y1}px`, width: '1px', height: `${g.y2 - g.y1}px`, borderLeft: '1.5px dashed #EC4899' }
                    : { left: `${g.x1}px`, top: `${g.y}px`, height: '1px', width: `${g.x2 - g.x1}px`, borderTop: '1.5px dashed #EC4899' }
                  ),
                  opacity: 0.85
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '-18px',
                    left: '8px',
                    background: '#EC4899',
                    color: '#ffffff',
                    fontSize: '9.5px',
                    fontWeight: '700',
                    padding: '1px 5px',
                    borderRadius: '3px',
                    fontFamily: 'ui-monospace, monospace'
                  }}
                >
                  {g.label}
                </span>
              </div>
            ))}

            {/* Real-time Multiplayer Dashed Network Lines between the 4 Swarm Agents */}
            {activeCursors.length > 1 && (
              <svg
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 115
                }}
              >
                {activeCursors.map((c, i) => {
                  const nextC = activeCursors[(i + 1) % activeCursors.length];
                  return (
                    <line
                      key={`net-${c.id}-${nextC.id}`}
                      x1={c.x + 4}
                      y1={c.y + 4}
                      x2={nextC.x + 4}
                      y2={nextC.y + 4}
                      stroke="rgba(162, 89, 255, 0.22)"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                    />
                  );
                })}
              </svg>
            )}

            {/* Active Collaborative Cursors (4 Swarm at once) */}
            {activeCursors.map((c) => (
              <div
                key={c.id}
                className="cv-cursor"
                style={{
                  position: 'absolute',
                  transform: `translate3d(${c.x}px, ${c.y}px, 0)`,
                  opacity: c.opacity !== undefined ? c.opacity : 1,
                  transition: 'transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.35s ease',
                  zIndex: 120
                }}
              >
                {/* SVG Pointer Arrow */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                    fill={c.color}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Single Role Tag (Strictly ONE tag per swarm agent) */}
                <span
                  style={{
                    background: c.color,
                    color: '#ffffff',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                    fontSize: '9.5px',
                    fontWeight: '600',
                    padding: '2px 7px',
                    borderRadius: '3px',
                    marginLeft: '8px',
                    marginTop: '-2px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.22)',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.2px'
                  }}
                >
                  <span>{c.role || (c.id === 'varun' ? 'Typing' : c.id === 'sarah' ? 'Stamping' : c.id === 'alex' ? 'Layout' : 'Framing')}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        <main className="cv-main-content">
          {/* SECTION 1: HERO */}
          <section className="cv-section cv-hero" aria-label="Varun Sehgal">
            <div className="cv-hero-text">
              <h1 className={`cv-name ${isBuilding && !typedName && buildStage < 1 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                {typedName || (!isBuilding ? 'Varun Sehgal' : '\u00A0')}
                {isBuilding && buildStage < 1 && typedName && <span className="cv-typing-caret">|</span>}
              </h1>
              <div className={`${isBuilding && !typedLede && buildStage < 2 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <p className="cv-lede">
                  {typedLede ? (
                    <>
                      {typedLede}
                      {isBuilding && buildStage < 2 && <span className="cv-typing-caret">|</span>}
                    </>
                  ) : (!isBuilding ? (
                    <>
                      I study and craft <span className="cv-hi">friction-free product experiences</span>: 
                      how interaction models shape user psychology, and whether enterprise systems can be made fluid, beautiful, and tactile without losing execution speed.
                    </>
                  ) : '\u00A0')}
                </p>
                <p className="cv-now-line">
                  UI-UX Designer at <strong>UniEvent</strong> &amp; Assistant Head of CODM Esports Operations at <strong>Assemble</strong>.
                </p>
                <p className="cv-links">
                  <a href="mailto:varun.sehgal02@gmail.com">Email</a>
                  <a href="https://github.com/varunsehgal05" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://linkedin.com/in/varunsehgal02" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://varunsehgal.runs-on.dev" target="_blank" rel="noopener noreferrer">Portfolio</a>
                </p>
              </div>
            </div>

            {/* Right side: Polaroid photo (Stage 3) */}
            <div className="cv-side">
              <div className={`cv-polaroid ${isBuilding && buildStage < 3 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
                <img
                  src="/varun.jpg"
                  alt="Varun Sehgal"
                  onError={(e) => { e.currentTarget.src = '/profile/varun.jpg'; }}
                />
                <span>
                  {typedPolaroidCaption || (!isBuilding ? 'Varun Sehgal, 2026 →' : '\u00A0')}
                  {isBuilding && buildStage === 3 && typedPolaroidCaption && <span className="cv-typing-caret">|</span>}
                </span>
              </div>
            </div>

            {/* In Numbers Stats Row (3 Wob-Pills) - Sequentially stamped one by one (Stages 4, 5, 6) */}
            <ul className="cv-stats" aria-label="In numbers">
              <li className={`cv-stat ${isBuilding && buildStage < 4 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
                <strong>{typedStat1 || (!isBuilding ? '6+' : '\u00A0')}</strong>
                <span>industry &amp; SaaS projects shipped</span>
              </li>
              <li className={`cv-stat ${isBuilding && buildStage < 5 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
                <strong>{typedStat2 || (!isBuilding ? '200+' : '\u00A0')}</strong>
                <span>hackers organized at CodeSrijan</span>
              </li>
              <li className={`cv-stat ${isBuilding && buildStage < 6 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
                <strong>{typedStat3 || (!isBuilding ? '🥈 1st Runner-Up' : '\u00A0')}</strong>
                <span>(2nd Place) at HACKeThor (Unstop)</span>
              </li>
            </ul>
          </section>

          {/* SECTION 2: WHAT I WORK ON (Stages 9, 10, 11) */}
          <section className="cv-section" aria-labelledby="cv-work-on">
            <h2 id="cv-work-on" className={`cv-section-title ${isBuilding && !typedWork[0] && buildStage < 9 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              What I work on
            </h2>
            <div className="cv-threads">
              <article className={`cv-thread cv-thread-0 ${isBuilding && !typedWork[0] && buildStage < 9 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <h3>
                  {typedWork[0] || (!isBuilding ? 'Product Design & Systems' : '\u00A0')}
                  {isBuilding && buildStage < 9 && typedWork[0] && <span className="cv-typing-caret">|</span>}
                </h3>
                <p className={`${isBuilding && buildStage < 9 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  I build coherent, accessible token hierarchies from zero. Defining spacing scales, color palettes in OKLCH, typography rules, and micro-interactions that scale across web and mobile.
                </p>
              </article>
              <article className={`cv-thread cv-thread-1 ${isBuilding && !typedWork[1] && buildStage < 10 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <h3>
                  {typedWork[1] || (!isBuilding ? 'Tactile Hi-Fi Prototyping' : '\u00A0')}
                  {isBuilding && buildStage < 10 && typedWork[1] && <span className="cv-typing-caret">|</span>}
                </h3>
                <p className={`${isBuilding && buildStage < 10 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  Moving beyond static wireframes: crafting interactive state machines, physics-based springs, and clickable high-fidelity flows in Figma, Framer, and ProtoPie.
                </p>
              </article>
              <article className={`cv-thread cv-thread-2 ${isBuilding && !typedWork[2] && buildStage < 11 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <h3>
                  {typedWork[2] || (!isBuilding ? 'Design Engineering' : '\u00A0')}
                  {isBuilding && buildStage < 11 && typedWork[2] && <span className="cv-typing-caret">|</span>}
                </h3>
                <p className={`${isBuilding && buildStage < 11 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  Zero-friction handoff: transforming Figma variables and layouts into executable React, Next.js, and Tailwind CSS components with 60fps animations.
                </p>
              </article>
            </div>
          </section>

          {/* SECTION 3: WHERE I'VE WORKED & SECTION 4: STUDY (Stages 12, 13, 14, 15, 16) */}
          <div className="cv-timeline-wrap">
            <section className="cv-section" aria-labelledby="cv-work">
              <h2 id="cv-work" className={`cv-section-title ${isBuilding && !typedJobs[0] && buildStage < 12 ? 'cv-item-hidden' : 'cv-item-visible'}`}>Where I've worked</h2>
              <ol className="cv-timeline">
                <li className={`cv-job ${isBuilding && !typedJobs[0] && buildStage < 12 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  <p className="cv-job-head">
                    <strong>
                      {typedJobs[0] || typedTimeline || (!isBuilding ? 'UI-UX Designer, UniEvent' : '\u00A0')}
                      {isBuilding && buildStage < 12 && (typedJobs[0] || typedTimeline) && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </p>
                  <p className="cv-job-meta">Jul 2026 — Nov 2026 • 5 Mos, Punjab, India (Remote)</p>
                  <ul className={`${isBuilding && !typedJobBullets['0_0'] && buildStage < 12 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <li>
                      {typedJobBullets['0_0'] || (!isBuilding ? 'Designed campus event ticketing platform (EventFlow) from initial wireframes to high-fidelity clickable prototype.' : '\u00A0')}
                      {isBuilding && buildStage < 12 && typedJobBullets['0_0'] && <span className="cv-typing-caret">|</span>}
                    </li>
                    <li className={`${isBuilding && buildStage < 12 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      Slashed transaction drop-off by 30% across a 4-step booking workflow across 50+ reusable component variants.
                    </li>
                  </ul>
                </li>

                <li className={`cv-job ${isBuilding && !typedJobs[1] && buildStage < 13 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  <p className="cv-job-head">
                    <strong>
                      {typedJobs[1] || (!isBuilding ? 'Assistant Head of CODM Esports Operations' : '\u00A0')}
                      {isBuilding && buildStage < 13 && typedJobs[1] && <span className="cv-typing-caret">|</span>}
                    </strong>
                    {!isBuilding || buildStage >= 13 ? ', Assemble' : ''}
                  </p>
                  <p className="cv-job-meta">Aug 2025 — Jan 2026 • 6 Mos, Bharatpur, Rajasthan, India (Remote)</p>
                  <ul className={`${isBuilding && !typedJobBullets['1_0'] && buildStage < 13 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <li>
                      {typedJobBullets['1_0'] || (!isBuilding ? 'Assisted in the planning and smooth execution of CODM tournaments and esports events.' : '\u00A0')}
                      {isBuilding && buildStage < 13 && typedJobBullets['1_0'] && <span className="cv-typing-caret">|</span>}
                    </li>
                    <li className={`${isBuilding && buildStage < 13 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      Designed collaborative creator workspace tools and interaction prototypes in Figma.
                    </li>
                  </ul>
                </li>

                <li className={`cv-job ${isBuilding && !typedJobs[2] && buildStage < 14 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  <p className="cv-job-head">
                    <strong>
                      {typedJobs[2] || (!isBuilding ? 'Operation internship' : '\u00A0')}
                      {isBuilding && buildStage < 14 && typedJobs[2] && <span className="cv-typing-caret">|</span>}
                    </strong>
                    {!isBuilding || buildStage >= 14 ? ', Knaptix Ventures Private Limited' : ''}
                  </p>
                  <p className="cv-job-meta">Jun 2025 — Aug 2025 • 3 Mos, Pune District, Maharashtra, India (Remote)</p>
                  <ul className={`${isBuilding && !typedJobBullets['2_0'] && buildStage < 14 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <li>
                      {typedJobBullets['2_0'] || (!isBuilding ? 'Operations support, brand identities, and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.' : '\u00A0')}
                      {isBuilding && buildStage < 14 && typedJobBullets['2_0'] && <span className="cv-typing-caret">|</span>}
                    </li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="cv-section" aria-labelledby="cv-study">
              <h2 id="cv-study" className={`cv-section-title ${isBuilding && !typedStudy[0] && buildStage < 15 ? 'cv-item-hidden' : 'cv-item-visible'}`}>Study, and the rest</h2>
              <div className="cv-two">
                <ul className={`cv-plain ${isBuilding && !typedStudy[0] && buildStage < 15 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  <li className="cv-entry">
                    <strong>
                      {typedStudy[0] || (!isBuilding ? 'B.Tech in Computer Science & Engineering' : '\u00A0')}
                      {isBuilding && buildStage < 15 && typedStudy[0] && <span className="cv-typing-caret">|</span>}
                    </strong>
                    <span>Jaypee University of Engineering &amp; Technology (JUET), Guna</span>
                    <span className="cv-soft">2023 — 2027</span>
                  </li>
                  <li className="cv-entry">
                    <strong>Senior Secondary (Class XII)</strong>
                    <span>Central Board of Secondary Education</span>
                    <span className="cv-soft">PCM &amp; Computer Science</span>
                  </li>
                </ul>

                <ul className={`cv-plain ${isBuilding && !typedStudy[1] && buildStage < 16 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  <li className="cv-entry">
                    <strong>
                      {typedStudy[1] || (!isBuilding ? '🥈 HACKeThor 1st Runner-Up (2nd Place)' : '\u00A0')}
                      {isBuilding && buildStage < 16 && typedStudy[1] && <span className="cv-typing-caret">|</span>}
                    </strong>
                    <span>Awarded 1st Runner-Up (2nd Place) in National Level Hackathon organized by Unstop out of 500+ participants.</span>
                  </li>
                  <li className="cv-entry">
                    <strong>CodeSrijan Organizer</strong>
                    <span>Lead UI/UX Designer and Frontend architect for 200+ hackathon participants across 50+ universities.</span>
                  </li>
                  <li className="cv-entry">
                    <strong>Core Toolkit</strong>
                    <span className="cv-soft">Figma, Framer, FigJam, ProtoPie, Webflow, React, Next.js, Tailwind CSS, TypeScript.</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* SECTION 5: THINGS I'VE MADE - Sequentially stamped one by one (Stages 17, 18, 19, 20, 21, 22) */}
          <section className="cv-section" aria-labelledby="cv-made">
            <h2 id="cv-made" className={`cv-section-title ${isBuilding && !typedProjects[0] && buildStage < 17 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              Things I've made
            </h2>
            <ul className="cv-made">
              {/* Big Featured Card: CodeSrijan (Stage 17) */}
              <li className={`cv-made-big ${isBuilding && !typedProjects[0] && buildStage < 17 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <div className="cv-made-card">
                  <a
                    href="https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2&t=vfPIBYY278lzphVq-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-cover-box cv-cover-link"
                    style={{ background: '#090d16', border: '2px solid #2b2b2b' }}
                    title="Open CodeSrijan in Figma"
                  >
                    <div style={{ textAlign: 'center', padding: '24px' }}>
                      <span style={{ fontSize: '32px' }}>🚀</span>
                      <div style={{ color: '#67e8f9', fontWeight: '800', marginTop: '6px' }}>CodeSrijan Ecosystem</div>
                      <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px' }}>200+ Hackers • 72h Sprint • Live Evaluation</div>
                    </div>
                  </a>
                  <div>
                    <a
                      href="https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2&t=vfPIBYY278lzphVq-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-title-link"
                    >
                      <strong>
                        {typedProjects[0] || (!isBuilding ? 'CodeSrijan Hackathon Portal' : '\u00A0')}
                        {isBuilding && buildStage < 17 && typedProjects[0] && <span className="cv-typing-caret">|</span>}
                      </strong>
                    </a>
                    <span className={`${isBuilding && !typedProjectDescs[0] && buildStage < 17 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      {typedProjectDescs[0] || (!isBuilding ? 'Full-stack live hackathon platform designed for Jaypee University with team matchmaking & rubric evaluation.' : '\u00A0')}
                      {isBuilding && buildStage < 17 && typedProjectDescs[0] && <span className="cv-typing-caret">|</span>}
                    </span>
                    <div className={`cv-card-actions ${isBuilding && buildStage < 17 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      <a
                        href="https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2&t=vfPIBYY278lzphVq-1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-figma-link"
                      >
                        <svg width="11" height="16" viewBox="0 0 38 57" fill="none" aria-hidden="true">
                          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                        </svg>
                        <span>Figma Design ↗</span>
                      </a>
                      <a
                        href="https://codesrijan-nine.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-live-link"
                      >
                        <span>🚀</span>
                        <span>Live Site ↗</span>
                      </a>
                    </div>
                    <div className={`cv-project-tags ${isBuilding && buildStage < 17 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      <span className="cv-tag next">Next.js</span>
                      <span className="cv-tag live">Vercel Live</span>
                    </div>
                  </div>
                </div>
              </li>

              {/* Card 2: EventFlow (Stage 18) */}
              <li className={`${isBuilding && !typedProjects[1] && buildStage < 18 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <div className="cv-made-card">
                  <a
                    href="https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2&p=f&t=ucsh4jF84sBl50UA-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-cover-box cv-cover-link"
                    style={{ background: '#1c1917' }}
                    title="Open EventFlow in Figma"
                  >
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '24px' }}>🎟️</span>
                      <div style={{ color: '#f59e0b', fontSize: '11px', fontWeight: '800', marginTop: '4px' }}>EventFlow</div>
                    </div>
                  </a>
                  <a
                    href="https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2&p=f&t=ucsh4jF84sBl50UA-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-title-link"
                  >
                    <strong>
                      {typedProjects[1] || (!isBuilding ? 'EventFlow Ticketing' : '\u00A0')}
                      {isBuilding && buildStage < 18 && typedProjects[1] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && !typedProjectDescs[1] && buildStage < 18 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[1] || (!isBuilding ? 'Campus event discovery & instant booking platform with 30% reduced drop-off.' : '\u00A0')}
                    {isBuilding && buildStage < 18 && typedProjectDescs[1] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 18 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <a
                      href="https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2&p=f&t=ucsh4jF84sBl50UA-0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-figma-link"
                    >
                      <svg width="11" height="16" viewBox="0 0 38 57" fill="none" aria-hidden="true">
                        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                      </svg>
                      <span>Figma Design ↗</span>
                    </a>
                  </div>
                  <div className={`cv-project-tags ${isBuilding && buildStage < 18 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <span className="cv-tag saas">Design System</span>
                    <span className="cv-tag">SaaS Checkout</span>
                  </div>
                </div>
              </li>

              {/* Card 3: AI Interview (Stage 19) */}
              <li className={`${isBuilding && !typedProjects[2] && buildStage < 19 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <div className="cv-made-card">
                  <a
                    href="https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-cover-box cv-cover-link"
                    style={{ background: '#0b1329' }}
                    title="Open AI Interview in Figma"
                  >
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '24px' }}>🤖</span>
                      <div style={{ color: '#38bdf8', fontSize: '11px', fontWeight: '800', marginTop: '4px' }}>AI Interview</div>
                    </div>
                  </a>
                  <a
                    href="https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-title-link"
                  >
                    <strong>
                      {typedProjects[2] || (!isBuilding ? 'AI Interview Studio' : '\u00A0')}
                      {isBuilding && buildStage < 19 && typedProjects[2] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && !typedProjectDescs[2] && buildStage < 19 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[2] || (!isBuilding ? 'Interactive question generator and audio mock-interview coach UI in Figma.' : '\u00A0')}
                    {isBuilding && buildStage < 19 && typedProjectDescs[2] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 19 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <a
                      href="https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-figma-link"
                    >
                      <svg width="11" height="16" viewBox="0 0 38 57" fill="none" aria-hidden="true">
                        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                      </svg>
                      <span>Figma Design ↗</span>
                    </a>
                  </div>
                  <div className={`cv-project-tags ${isBuilding && buildStage < 19 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <span className="cv-tag ai">AI UX</span>
                  </div>
                </div>
              </li>

              {/* Card 4: Expensify (Stage 20) */}
              <li className={`${isBuilding && !typedProjects[3] && buildStage < 20 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <div className="cv-made-card">
                  <a
                    href="https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-cover-box cv-cover-link"
                    style={{ background: '#18181b' }}
                    title="Open Expensify in Figma"
                  >
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '24px' }}>💳</span>
                      <div style={{ color: '#10b981', fontSize: '11px', fontWeight: '800', marginTop: '4px' }}>Expensify</div>
                    </div>
                  </a>
                  <a
                    href="https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-title-link"
                  >
                    <strong>
                      {typedProjects[3] || (!isBuilding ? 'Expensify Budget' : '\u00A0')}
                      {isBuilding && buildStage < 20 && typedProjects[3] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && !typedProjectDescs[3] && buildStage < 20 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[3] || (!isBuilding ? 'Mobile personal finance app prototype with gesture-driven expense tagging.' : '\u00A0')}
                    {isBuilding && buildStage < 20 && typedProjectDescs[3] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 20 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <a
                      href="https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-figma-link"
                    >
                      <svg width="11" height="16" viewBox="0 0 38 57" fill="none" aria-hidden="true">
                        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                      </svg>
                      <span>Figma Design ↗</span>
                    </a>
                  </div>
                  <div className={`cv-project-tags ${isBuilding && buildStage < 20 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <span className="cv-tag fintech">Fintech</span>
                    <span className="cv-tag">Mobile UX</span>
                  </div>
                </div>
              </li>

              {/* Card 5: Movie Tickets (Stage 21) */}
              <li className={`${isBuilding && !typedProjects[4] && buildStage < 21 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <div className="cv-made-card">
                  <a
                    href="https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-cover-box cv-cover-link"
                    style={{ background: '#26122c' }}
                    title="Open Movie Tickets in Figma"
                  >
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '24px' }}>🎬</span>
                      <div style={{ color: '#f43f5e', fontSize: '11px', fontWeight: '800', marginTop: '4px' }}>Movie Booking</div>
                    </div>
                  </a>
                  <a
                    href="https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-title-link"
                  >
                    <strong>
                      {typedProjects[4] || (!isBuilding ? 'Movie Tickets App' : '\u00A0')}
                      {isBuilding && buildStage < 21 && typedProjects[4] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && !typedProjectDescs[4] && buildStage < 21 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[4] || (!isBuilding ? 'Dynamic seat-selection matrix and trailer preview interaction flow.' : '\u00A0')}
                    {isBuilding && buildStage < 21 && typedProjectDescs[4] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 21 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <a
                      href="https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-figma-link"
                    >
                      <svg width="11" height="16" viewBox="0 0 38 57" fill="none" aria-hidden="true">
                        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                      </svg>
                      <span>Figma Design ↗</span>
                    </a>
                  </div>
                  <div className={`cv-project-tags ${isBuilding && buildStage < 21 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <span className="cv-tag">Interactive Proto</span>
                  </div>
                </div>
              </li>

              {/* Card 6: SaaS Landing (Stage 22) */}
              <li className={`${isBuilding && !typedProjects[5] && buildStage < 22 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <div className="cv-made-card">
                  <a
                    href="https://www.figma.com/design/WfUzGPYsE7UFYS9YaQp5v6/home-page?node-id=0-1&p=f&t=cA3tERTu8AuInovg-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-cover-box cv-cover-link"
                    style={{ background: '#111827' }}
                    title="Open SaaS Landing Pages in Figma"
                  >
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '24px' }}>⚡</span>
                      <div style={{ color: '#a855f7', fontSize: '11px', fontWeight: '800', marginTop: '4px' }}>SaaS Conversion</div>
                    </div>
                  </a>
                  <a
                    href="https://www.figma.com/design/WfUzGPYsE7UFYS9YaQp5v6/home-page?node-id=0-1&p=f&t=cA3tERTu8AuInovg-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-title-link"
                  >
                    <strong>
                      {typedProjects[5] || (!isBuilding ? 'SaaS Landing Pages' : '\u00A0')}
                      {isBuilding && buildStage < 22 && typedProjects[5] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && !typedProjectDescs[5] && buildStage < 22 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[5] || (!isBuilding ? 'High-converting responsive landing pages built for 10+ international tech startups.' : '\u00A0')}
                    {isBuilding && buildStage < 22 && typedProjectDescs[5] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 22 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <a
                      href="https://www.figma.com/design/WfUzGPYsE7UFYS9YaQp5v6/home-page?node-id=0-1&p=f&t=cA3tERTu8AuInovg-0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-figma-link"
                    >
                      <svg width="11" height="16" viewBox="0 0 38 57" fill="none" aria-hidden="true">
                        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                      </svg>
                      <span>Figma Design ↗</span>
                    </a>
                  </div>
                  <div className={`cv-project-tags ${isBuilding && buildStage < 22 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <span className="cv-tag saas">Conversion</span>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          {/* SECTION 6: SAY HELLO (Stage 23) */}
          <section className={`cv-section cv-contact ${isBuilding && !sectionsTriggered.contact && buildStage < 23 ? 'cv-item-hidden' : 'cv-item-visible'}`} aria-labelledby="cv-contact">
            <h2 id="cv-contact" className={`cv-section-title ${isBuilding && !typedEmail && buildStage < 23 ? 'cv-item-hidden' : 'cv-item-visible'}`}>Say hello</h2>
            <p className={`${isBuilding && !typedEmail && buildStage < 23 ? 'cv-item-hidden' : 'cv-item-visible'}`}>For product design roles, design systems, or collaboration, write to me:</p>
            <p className={`cv-email-line ${isBuilding && !typedEmail && buildStage < 23 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              <a className="cv-email" href="mailto:varun.sehgal02@gmail.com">
                {typedEmail || (!isBuilding ? 'varun.sehgal02@gmail.com' : '\u00A0')}
                {isBuilding && buildStage < 23 && typedEmail && <span className="cv-typing-caret">|</span>}
              </a>
              <button type="button" className="cv-copy-btn" onClick={copyEmail}>
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </p>
            <p className={`cv-links ${isBuilding && !typedEmail && buildStage < 23 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              <a href="https://github.com/varunsehgal05" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/varunsehgal02" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://varunsehgal.runs-on.dev" target="_blank" rel="noopener noreferrer">Portfolio Web</a>
            </p>
          </section>
        </main>

        {/* FOOTER (Stage 24) */}
        <footer className={`cv-footer ${isBuilding && buildStage < 24 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
          <p>© 2026 Varun Sehgal. Built live, by a crowd of cursors.</p>
          <button type="button" className="cv-replay-btn cv-remake-btn" onClick={replayBuild} title="Remake the notebook from scratch">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12a8 8 0 1 0 2.6-5.9M4 4v4.5h4.5" />
            </svg>
            Remake the notebook 🚀
          </button>
        </footer>
      </div>
    </div>
  );
};

export default KittuResumeApp;
