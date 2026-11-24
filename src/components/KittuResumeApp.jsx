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
  canvasZoom = 1,
  deviceMode = 'desktop'
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
  const typeText = (str, setter, startDelay, interval = 28, cursorId = 'varun', cursorBaseX = null, maxCursorOffset = 340) => {
    for (let i = 1; i <= str.length; i++) {
      schedule(() => {
        setter(str.slice(0, i));
        if (cursorId && cursorBaseX !== null) {
          const offset = Math.min(i * 11, maxCursorOffset);
          setActiveCursors(prev => prev.map(c => c.id === cursorId ? { ...c, x: cursorBaseX + offset } : c));
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

  // Build Full Resume Strictly Line-by-Line & One-by-One from Top to Footer
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
    setTypedJobs({});
    setTypedJobBullets({});
    setTypedStudy({});
    setTypedProjects({});
    setTypedProjectDescs({});
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

    // =========================================================================
    // SECTION 1: HERO (Stages 0 - 7)
    // =========================================================================
    // 0a. All 4 Swarm agents enter top of blank sheet
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
    }, 80);

    // 0b. Type "Varun Sehgal"
    schedule(() => {
      const box = getBox('.cv-name', { x: 28, y: 35, w: 460, h: 75 });
      const boxPol = getBox('.cv-polaroid', { x: 730, y: 110, w: 260, h: 260 });
      set4Swarm({
        elena: { x: box.x + box.w - 10, y: box.y + box.h, tool: 'R', role: 'Framing' },
        alex: { x: box.x + box.w + 24, y: box.y + 12, tool: 'V', role: 'Layout' },
        sarah: { x: boxPol.x + 40, y: boxPol.y + 30, tool: '❖', role: 'Stamping' },
        varun: { x: box.x + 35, y: box.y + 18, tool: 'T', role: 'Typing' }
      });
      typeText('Varun Sehgal', setTypedName, 0, 26, 'varun', box.x + 35, 220);
    }, 240);

    // 1. Lede paragraph line
    schedule(() => {
      setBuildStage(1);
      const boxLede = getBox('.cv-lede', { x: 28, y: 125, w: 600, h: 120 });
      const boxPol = getBox('.cv-polaroid', { x: 730, y: 110, w: 260, h: 260 });
      set4Swarm({
        elena: { x: boxLede.x, y: boxLede.y, tool: 'R', role: 'Framing' },
        alex: { x: boxLede.x + boxLede.w + 20, y: boxLede.y + 24, tool: 'V', role: 'Layout' },
        sarah: { x: boxPol.x + 50, y: boxPol.y + 40, tool: '❖', role: 'Stamping' },
        varun: { x: boxLede.x + 24, y: boxLede.y + 20, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: boxLede.x, y: boxLede.y, w: boxLede.w, h: boxLede.h });
      setActiveGuides([{ type: 'v', x: boxLede.x + boxLede.w, y1: boxLede.y, y2: boxLede.y + boxLede.h }]);
      typeText('I study and craft friction-free product experiences: tactile, beautiful, and fast.', setTypedLede, 20, 12, 'varun', boxLede.x + 24, 380);
    }, 620);

    // 2. Hero "Now" role line
    schedule(() => {
      setBuildStage(2);
      const boxNow = getBox('.cv-now-line', { x: 28, y: 245, w: 580, h: 36 });
      set4Swarm({
        elena: { x: boxNow.x, y: boxNow.y, tool: 'R', role: 'Framing' },
        alex: { x: boxNow.x + boxNow.w, y: boxNow.y + 10, tool: 'V', role: 'Layout' },
        sarah: { x: boxNow.x + 200, y: boxNow.y + 10, tool: '❖', role: 'Stamping' },
        varun: { x: boxNow.x + 24, y: boxNow.y + 12, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: boxNow.x, y: boxNow.y, w: boxNow.w, h: boxNow.h });
    }, 1720);

    // 3. Hero social links line
    schedule(() => {
      setBuildStage(3);
      const boxLinks = getBox('.cv-hero .cv-links', { x: 28, y: 295, w: 380, h: 36 });
      set4Swarm({
        elena: { x: boxLinks.x, y: boxLinks.y, tool: 'R', role: 'Framing' },
        alex: { x: boxLinks.x + boxLinks.w, y: boxLinks.y + 10, tool: 'V', role: 'Layout' },
        sarah: { x: boxLinks.x + 160, y: boxLinks.y + 10, tool: '❖', role: 'Stamping' },
        varun: { x: boxLinks.x + 24, y: boxLinks.y + 12, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: boxLinks.x, y: boxLinks.y, w: boxLinks.w, h: boxLinks.h });
    }, 2020);

    // 4. Polaroid Photo & Caption
    schedule(() => {
      setBuildStage(4);
      const boxPol = getBox('.cv-polaroid', { x: 730, y: 110, w: 260, h: 260 });
      set4Swarm({
        elena: { x: boxPol.x, y: boxPol.y, tool: 'R', role: 'Framing' },
        alex: { x: boxPol.x + boxPol.w + 16, y: boxPol.y + 40, tool: 'V', role: 'Layout' },
        sarah: { x: boxPol.x + boxPol.w / 2, y: boxPol.y + 90, tool: '❖', role: 'Stamping' },
        varun: { x: boxPol.x + 28, y: boxPol.y + boxPol.h - 18, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: boxPol.x, y: boxPol.y, w: boxPol.w, h: boxPol.h });
      setActiveGuides([]);
      typeText('Varun Sehgal, 2026 →', setTypedPolaroidCaption, 30, 16, 'varun', boxPol.x + 28, 170);
    }, 2320);

    // 5. Stat 1 (6+)
    schedule(() => {
      const box1 = getBox('.cv-stats li:nth-child(1)', { x: 28, y: 460, w: 320, h: 85 });
      set4Swarm({
        elena: { x: box1.x, y: box1.y, tool: 'R', role: 'Framing' },
        alex: { x: box1.x + box1.w + 12, y: box1.y + 16, tool: 'V', role: 'Layout' },
        sarah: { x: box1.x + box1.w / 2, y: box1.y + 24, tool: '❖', role: 'Stamping' },
        varun: { x: box1.x + 36, y: box1.y + 22, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box1.x, y: box1.y, w: box1.w, h: box1.h });
      setBuildStage(5);
      typeText('6+', setTypedStat1, 20, 30);
    }, 2820);

    // 6. Stat 2 (200+)
    schedule(() => {
      const box2 = getBox('.cv-stats li:nth-child(2)', { x: 372, y: 460, w: 320, h: 85 });
      set4Swarm({
        elena: { x: box2.x, y: box2.y, tool: 'R', role: 'Framing' },
        alex: { x: box2.x + box2.w + 12, y: box2.y + 16, tool: 'V', role: 'Layout' },
        sarah: { x: box2.x + box2.w / 2, y: box2.y + 24, tool: '❖', role: 'Stamping' },
        varun: { x: box2.x + 36, y: box2.y + 22, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box2.x, y: box2.y, w: box2.w, h: box2.h });
      setBuildStage(6);
      typeText('200+', setTypedStat2, 20, 28);
    }, 3280);

    // 7. Stat 3 (1st Runner-Up)
    schedule(() => {
      const box3 = getBox('.cv-stats li:nth-child(3)', { x: 716, y: 460, w: 320, h: 85 });
      set4Swarm({
        elena: { x: box3.x, y: box3.y, tool: 'R', role: 'Framing' },
        alex: { x: box3.x + box3.w - 10, y: box3.y + 16, tool: 'V', role: 'Layout' },
        sarah: { x: box3.x + box3.w / 2, y: box3.y + 24, tool: '❖', role: 'Stamping' },
        varun: { x: box3.x + 36, y: box3.y + 22, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box3.x, y: box3.y, w: box3.w, h: box3.h });
      setBuildStage(7);
      typeText('🥈 1st Runner-Up', setTypedStat3, 20, 20);
    }, 3760);

    // =========================================================================
    // SECTION 2: WHAT I WORK ON (Stages 8 - 14) - Strictly Line-by-Line
    // =========================================================================
    // 8. Heading: What I work on
    schedule(() => {
      setBuildStage(8);
      setSectionsTriggered(prev => ({ ...prev, workOn: true }));
      const head = getBox('#cv-work-on', { x: 28, y: 650, w: 300, h: 42 });
      set2Swarm({
        elena: { x: head.x, y: head.y, tool: 'R', role: 'Framing' },
        varun: { x: head.x + 180, y: head.y + 12, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: head.x, y: head.y, w: head.w, h: head.h });
      setActiveGuides([{ type: 'h', y: head.y + head.h, x1: head.x, x2: head.x + 980 }]);
    }, 4300);

    // 9. Card 1 Frame + Title
    schedule(() => {
      setBuildStage(9);
      const box0 = getBox('.cv-thread-0', { x: 28, y: 710, w: 320, h: 195 });
      set2Swarm({
        elena: { x: box0.x, y: box0.y, tool: 'R', role: 'Framing' },
        varun: { x: box0.x + 24, y: box0.y + 22, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box0.x, y: box0.y, w: box0.w, h: box0.h });
      setActiveGuides([]);
      typeText('Product Design & Systems', (t) => setTypedWork(prev => ({ ...prev, 0: t })), 20, 18, 'varun', box0.x + 24, 220);
    }, 4520);

    // 10. Card 1 Description line
    schedule(() => {
      setBuildStage(10);
      const box0 = getBox('.cv-thread-0', { x: 28, y: 710, w: 320, h: 195 });
      set2Swarm({
        elena: { x: box0.x + box0.w - 16, y: box0.y + box0.h - 16, tool: 'R', role: 'Framing' },
        varun: { x: box0.x + 24, y: box0.y + 84, tool: 'T', role: 'Typing' }
      });
    }, 5040);

    // 11. Card 2 Frame + Title
    schedule(() => {
      setBuildStage(11);
      const box1 = getBox('.cv-thread-1', { x: 372, y: 710, w: 320, h: 195 });
      set2Swarm({
        elena: { x: box1.x, y: box1.y, tool: 'R', role: 'Framing' },
        varun: { x: box1.x + 24, y: box1.y + 22, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box1.x, y: box1.y, w: box1.w, h: box1.h });
      typeText('Tactile Hi-Fi Prototyping', (t) => setTypedWork(prev => ({ ...prev, 1: t })), 20, 18, 'varun', box1.x + 24, 220);
    }, 5300);

    // 12. Card 2 Description line
    schedule(() => {
      setBuildStage(12);
      const box1 = getBox('.cv-thread-1', { x: 372, y: 710, w: 320, h: 195 });
      set2Swarm({
        elena: { x: box1.x + box1.w - 16, y: box1.y + box1.h - 16, tool: 'R', role: 'Framing' },
        varun: { x: box1.x + 24, y: box1.y + 84, tool: 'T', role: 'Typing' }
      });
    }, 5840);

    // 13. Card 3 Frame + Title
    schedule(() => {
      setBuildStage(13);
      const box2 = getBox('.cv-thread-2', { x: 716, y: 710, w: 320, h: 195 });
      set2Swarm({
        elena: { x: box2.x, y: box2.y, tool: 'R', role: 'Framing' },
        varun: { x: box2.x + 24, y: box2.y + 22, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box2.x, y: box2.y, w: box2.w, h: box2.h });
      typeText('Design Engineering', (t) => setTypedWork(prev => ({ ...prev, 2: t })), 20, 18, 'varun', box2.x + 24, 200);
    }, 6100);

    // 14. Card 3 Description line
    schedule(() => {
      setBuildStage(14);
      const box2 = getBox('.cv-thread-2', { x: 716, y: 710, w: 320, h: 195 });
      set2Swarm({
        elena: { x: box2.x + box2.w - 16, y: box2.y + box2.h - 16, tool: 'R', role: 'Framing' },
        varun: { x: box2.x + 24, y: box2.y + 84, tool: 'T', role: 'Typing' }
      });
    }, 6520);

    // =========================================================================
    // SECTION 3: WHERE I'VE WORKED (Stages 15 - 26) - Strictly Line-by-Line
    // =========================================================================
    // 15. Heading: Where I've worked
    schedule(() => {
      setBuildStage(15);
      setSectionsTriggered(prev => ({ ...prev, timeline: true }));
      const head = getBox('#cv-work', { x: 28, y: 940, w: 320, h: 42 });
      set2Swarm({
        elena: { x: head.x, y: head.y, tool: 'R', role: 'Framing' },
        varun: { x: head.x + 190, y: head.y + 12, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: head.x, y: head.y, w: head.w, h: head.h });
    }, 6820);

    // 16. Job 1: Heading typed
    schedule(() => {
      setBuildStage(16);
      const box0 = getBox('.cv-job:nth-child(1)', { x: 28, y: 995, w: 980, h: 105 });
      set2Swarm({
        elena: { x: box0.x, y: box0.y + 8, tool: 'R', role: 'Framing' },
        varun: { x: box0.x + 30, y: box0.y + 12, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box0.x, y: box0.y, w: box0.w, h: box0.h });
      typeText('UI-UX Designer, UniEvent', (t) => {
        setTypedJobs(prev => ({ ...prev, 0: t }));
        setTypedTimeline(t);
      }, 10, 16, 'varun', box0.x + 30, 260);
    }, 7020);

    // 17. Job 1: Meta line
    schedule(() => {
      setBuildStage(17);
      const box0 = getBox('.cv-job:nth-child(1)', { x: 28, y: 995, w: 980, h: 105 });
      set2Swarm({
        elena: { x: box0.x + box0.w - 140, y: box0.y + 12, tool: 'R', role: 'Framing' },
        varun: { x: box0.x + 30, y: box0.y + 38, tool: 'T', role: 'Typing' }
      });
    }, 7460);

    // 18. Job 1: Bullet 1 typed
    schedule(() => {
      setBuildStage(18);
      const box0 = getBox('.cv-job:nth-child(1)', { x: 28, y: 995, w: 980, h: 105 });
      set2Swarm({
        elena: { x: box0.x + 12, y: box0.y + 60, tool: 'R', role: 'Framing' },
        varun: { x: box0.x + 40, y: box0.y + 62, tool: 'T', role: 'Typing' }
      });
      typeText('Designed campus event ticketing platform (EventFlow) from initial wireframes to high-fidelity clickable prototype.', (t) => {
        setTypedJobBullets(prev => ({ ...prev, '0_0': t }));
      }, 10, 6, 'varun', box0.x + 40, 420);
    }, 7660);

    // 19. Job 1: Bullet 2 line
    schedule(() => {
      setBuildStage(19);
      const box0 = getBox('.cv-job:nth-child(1)', { x: 28, y: 995, w: 980, h: 105 });
      set2Swarm({
        elena: { x: box0.x + 12, y: box0.y + 84, tool: 'R', role: 'Framing' },
        varun: { x: box0.x + 40, y: box0.y + 86, tool: 'T', role: 'Typing' }
      });
    }, 8420);

    // 20. Job 2: Heading typed
    schedule(() => {
      setBuildStage(20);
      const box1 = getBox('.cv-job:nth-child(2)', { x: 28, y: 1120, w: 980, h: 105 });
      set2Swarm({
        elena: { x: box1.x, y: box1.y + 8, tool: 'R', role: 'Framing' },
        varun: { x: box1.x + 30, y: box1.y + 12, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box1.x, y: box1.y, w: box1.w, h: box1.h });
      typeText('Assistant Head of CODM Esports Operations', (t) => {
        setTypedJobs(prev => ({ ...prev, 1: t }));
      }, 10, 13, 'varun', box1.x + 30, 320);
    }, 8700);

    // 21. Job 2: Assemble + Meta line
    schedule(() => {
      setBuildStage(21);
      const box1 = getBox('.cv-job:nth-child(2)', { x: 28, y: 1120, w: 980, h: 105 });
      set2Swarm({
        elena: { x: box1.x + box1.w - 140, y: box1.y + 12, tool: 'R', role: 'Framing' },
        varun: { x: box1.x + 30, y: box1.y + 38, tool: 'T', role: 'Typing' }
      });
    }, 9300);

    // 22. Job 2: Bullet 1 typed
    schedule(() => {
      setBuildStage(22);
      const box1 = getBox('.cv-job:nth-child(2)', { x: 28, y: 1120, w: 980, h: 105 });
      set2Swarm({
        elena: { x: box1.x + 12, y: box1.y + 60, tool: 'R', role: 'Framing' },
        varun: { x: box1.x + 40, y: box1.y + 62, tool: 'T', role: 'Typing' }
      });
      typeText('Assisted in the planning and smooth execution of CODM tournaments and esports events.', (t) => {
        setTypedJobBullets(prev => ({ ...prev, '1_0': t }));
      }, 10, 7, 'varun', box1.x + 40, 380);
    }, 9500);

    // 23. Job 2: Bullet 2 line
    schedule(() => {
      setBuildStage(23);
      const box1 = getBox('.cv-job:nth-child(2)', { x: 28, y: 1120, w: 980, h: 105 });
      set2Swarm({
        elena: { x: box1.x + 12, y: box1.y + 84, tool: 'R', role: 'Framing' },
        varun: { x: box1.x + 40, y: box1.y + 86, tool: 'T', role: 'Typing' }
      });
    }, 10180);

    // 24. Job 3: Heading typed
    schedule(() => {
      setBuildStage(24);
      const box2 = getBox('.cv-job:nth-child(3)', { x: 28, y: 1245, w: 980, h: 95 });
      set2Swarm({
        elena: { x: box2.x, y: box2.y + 8, tool: 'R', role: 'Framing' },
        varun: { x: box2.x + 30, y: box2.y + 12, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box2.x, y: box2.y, w: box2.w, h: box2.h });
      typeText('Operation internship', (t) => {
        setTypedJobs(prev => ({ ...prev, 2: t }));
      }, 10, 16, 'varun', box2.x + 30, 220);
    }, 10440);

    // 25. Job 3: Company + Meta line
    schedule(() => {
      setBuildStage(25);
      const box2 = getBox('.cv-job:nth-child(3)', { x: 28, y: 1245, w: 980, h: 95 });
      set2Swarm({
        elena: { x: box2.x + box2.w - 140, y: box2.y + 12, tool: 'R', role: 'Framing' },
        varun: { x: box2.x + 30, y: box2.y + 38, tool: 'T', role: 'Typing' }
      });
    }, 10820);

    // 26. Job 3: Bullet 1 typed
    schedule(() => {
      setBuildStage(26);
      const box2 = getBox('.cv-job:nth-child(3)', { x: 28, y: 1245, w: 980, h: 95 });
      set2Swarm({
        elena: { x: box2.x + 12, y: box2.y + 60, tool: 'R', role: 'Framing' },
        varun: { x: box2.x + 40, y: box2.y + 62, tool: 'T', role: 'Typing' }
      });
      typeText('Operations support, brand identities, and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.', (t) => {
        setTypedJobBullets(prev => ({ ...prev, '2_0': t }));
      }, 10, 6, 'varun', box2.x + 40, 440);
    }, 11020);

    // =========================================================================
    // SECTION 4: STUDY, AND THE REST (Stages 27 - 34) - Strictly One-by-One
    // =========================================================================
    // 27. Heading: Study, and the rest
    schedule(() => {
      setBuildStage(27);
      const head = getBox('#cv-study', { x: 28, y: 1365, w: 320, h: 42 });
      set2Swarm({
        elena: { x: head.x, y: head.y, tool: 'R', role: 'Framing' },
        varun: { x: head.x + 190, y: head.y + 12, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: head.x, y: head.y, w: head.w, h: head.h });
    }, 11920);

    // 28. Left Col Entry 1 (B.Tech)
    schedule(() => {
      setBuildStage(28);
      const boxCol1 = getBox('.cv-two > ul:nth-child(1)', { x: 28, y: 1420, w: 490, h: 150 });
      set2Swarm({
        elena: { x: boxCol1.x, y: boxCol1.y, tool: 'R', role: 'Framing' },
        varun: { x: boxCol1.x + 24, y: boxCol1.y + 16, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: boxCol1.x, y: boxCol1.y, w: boxCol1.w, h: 75 });
      typeText('B.Tech in Computer Science & Engineering', (t) => setTypedStudy(prev => ({ ...prev, 0: t })), 10, 12, 'varun', boxCol1.x + 24, 280);
    }, 12120);

    // 29. Left Col Entry 1 Subline (JUET)
    schedule(() => {
      setBuildStage(29);
    }, 12650);

    // 30. Left Col Entry 2 (Senior Secondary)
    schedule(() => {
      setBuildStage(30);
      const boxCol1 = getBox('.cv-two > ul:nth-child(1)', { x: 28, y: 1420, w: 490, h: 150 });
      set2Swarm({
        elena: { x: boxCol1.x, y: boxCol1.y + 82, tool: 'R', role: 'Framing' },
        varun: { x: boxCol1.x + 24, y: boxCol1.y + 94, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: boxCol1.x, y: boxCol1.y + 80, w: boxCol1.w, h: 65 });
    }, 12880);

    // 31. Right Col Entry 1 (HACKeThor)
    schedule(() => {
      setBuildStage(31);
      const boxCol2 = getBox('.cv-two > ul:nth-child(2)', { x: 546, y: 1420, w: 490, h: 170 });
      set2Swarm({
        elena: { x: boxCol2.x, y: boxCol2.y, tool: 'R', role: 'Framing' },
        varun: { x: boxCol2.x + 24, y: boxCol2.y + 16, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: boxCol2.x, y: boxCol2.y, w: boxCol2.w, h: 65 });
      typeText('🥈 HACKeThor 1st Runner-Up (2nd Place)', (t) => setTypedStudy(prev => ({ ...prev, 1: t })), 10, 12, 'varun', boxCol2.x + 24, 280);
    }, 13160);

    // 32. Right Col Entry 1 Subline
    schedule(() => {
      setBuildStage(32);
    }, 13680);

    // 33. Right Col Entry 2 (CodeSrijan Organizer)
    schedule(() => {
      setBuildStage(33);
      const boxCol2 = getBox('.cv-two > ul:nth-child(2)', { x: 546, y: 1420, w: 490, h: 170 });
      set2Swarm({
        elena: { x: boxCol2.x, y: boxCol2.y + 68, tool: 'R', role: 'Framing' },
        varun: { x: boxCol2.x + 24, y: boxCol2.y + 80, tool: 'T', role: 'Typing' }
      });
    }, 13900);

    // 34. Right Col Entry 3 (Core Toolkit)
    schedule(() => {
      setBuildStage(34);
      const boxCol2 = getBox('.cv-two > ul:nth-child(2)', { x: 546, y: 1420, w: 490, h: 170 });
      set2Swarm({
        elena: { x: boxCol2.x, y: boxCol2.y + 125, tool: 'R', role: 'Framing' },
        varun: { x: boxCol2.x + 24, y: boxCol2.y + 136, tool: 'T', role: 'Typing' }
      });
    }, 14160);

    // =========================================================================
    // SECTION 5: THINGS I'VE MADE (Stages 35 - 53) - STRICTLY 1 CARD AT A TIME
    // =========================================================================
    // 35. Heading: Things I've made
    schedule(() => {
      setBuildStage(35);
      setSectionsTriggered(prev => ({ ...prev, projects: true }));
      const head = getBox('#cv-made', { x: 28, y: 1620, w: 320, h: 42 });
      set2Swarm({
        elena: { x: head.x, y: head.y, tool: 'R', role: 'Framing' },
        varun: { x: head.x + 180, y: head.y + 12, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: head.x, y: head.y, w: head.w, h: head.h });
    }, 14450);

    // --- Card 1: CodeSrijan Hackathon Portal (Stages 36, 37, 38) ---
    schedule(() => {
      setBuildStage(36);
      const box = getBox('.cv-made > li:nth-child(1)', { x: 28, y: 1675, w: 980, h: 230 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 360, y: box.y + 34, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
      setActiveGuides([{ type: 'h', y: box.y, x1: box.x, x2: box.x + box.w }]);
      typeText('CodeSrijan Hackathon Portal', (t) => setTypedProjects(prev => ({ ...prev, 0: t })), 10, 14, 'varun', box.x + 360, 260);
    }, 14650);

    schedule(() => {
      setBuildStage(37);
      const box = getBox('.cv-made > li:nth-child(1)', { x: 28, y: 1675, w: 980, h: 230 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 360, y: box.y + 84, tool: 'T', role: 'Typing' }
      });
      typeText('Full-stack live hackathon platform designed for Jaypee University with team matchmaking & rubric evaluation.', (t) => setTypedProjectDescs(prev => ({ ...prev, 0: t })), 10, 6, 'varun', box.x + 360, 320);
    }, 15080);

    schedule(() => {
      setBuildStage(38); // Buttons & tags reveal strictly AFTER description finishes
    }, 15780);

    // --- Card 2: EventFlow Ticketing (Stages 39, 40, 41) ---
    schedule(() => {
      setBuildStage(39);
      const box = getBox('.cv-made > li:nth-child(2)', { x: 28, y: 1930, w: 315, h: 255 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 22, y: box.y + 150, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
      setActiveGuides([{ type: 'h', y: box.y, x1: box.x, x2: box.x + box.w }]);
      typeText('EventFlow Ticketing', (t) => setTypedProjects(prev => ({ ...prev, 1: t })), 10, 14, 'varun', box.x + 22, 200);
    }, 16020);

    schedule(() => {
      setBuildStage(40);
      const box = getBox('.cv-made > li:nth-child(2)', { x: 28, y: 1930, w: 315, h: 255 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 22, y: box.y + 185, tool: 'T', role: 'Typing' }
      });
      typeText('Campus event discovery & instant booking platform with 30% reduced drop-off.', (t) => setTypedProjectDescs(prev => ({ ...prev, 1: t })), 10, 7, 'varun', box.x + 22, 230);
    }, 16340);

    schedule(() => {
      setBuildStage(41);
    }, 16940);

    // --- Card 3: AI Interview Studio (Stages 42, 43, 44) ---
    schedule(() => {
      setBuildStage(42);
      const box = getBox('.cv-made > li:nth-child(3)', { x: 365, y: 1930, w: 315, h: 255 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 22, y: box.y + 150, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
      setActiveGuides([{ type: 'h', y: box.y, x1: box.x, x2: box.x + box.w }]);
      typeText('AI Interview Studio', (t) => setTypedProjects(prev => ({ ...prev, 2: t })), 10, 14, 'varun', box.x + 22, 200);
    }, 17180);

    schedule(() => {
      setBuildStage(43);
      const box = getBox('.cv-made > li:nth-child(3)', { x: 365, y: 1930, w: 315, h: 255 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 22, y: box.y + 185, tool: 'T', role: 'Typing' }
      });
      typeText('Interactive question generator and audio mock-interview coach UI in Figma.', (t) => setTypedProjectDescs(prev => ({ ...prev, 2: t })), 10, 7, 'varun', box.x + 22, 230);
    }, 17500);

    schedule(() => {
      setBuildStage(44);
    }, 18080);

    // --- Card 4: Expensify Budget (Stages 45, 46, 47) ---
    schedule(() => {
      setBuildStage(45);
      const box = getBox('.cv-made > li:nth-child(4)', { x: 702, y: 1930, w: 315, h: 255 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 22, y: box.y + 150, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
      setActiveGuides([{ type: 'h', y: box.y, x1: box.x, x2: box.x + box.w }]);
      typeText('Expensify Budget', (t) => setTypedProjects(prev => ({ ...prev, 3: t })), 10, 14, 'varun', box.x + 22, 200);
    }, 18320);

    schedule(() => {
      setBuildStage(46);
      const box = getBox('.cv-made > li:nth-child(4)', { x: 702, y: 1930, w: 315, h: 255 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 22, y: box.y + 185, tool: 'T', role: 'Typing' }
      });
      typeText('Mobile personal finance app prototype with gesture-driven expense tagging.', (t) => setTypedProjectDescs(prev => ({ ...prev, 3: t })), 10, 7, 'varun', box.x + 22, 230);
    }, 18600);

    schedule(() => {
      setBuildStage(47);
    }, 19180);

    // --- Card 5: Movie Tickets App (Stages 48, 49, 50) ---
    schedule(() => {
      setBuildStage(48);
      const box = getBox('.cv-made > li:nth-child(5)', { x: 28, y: 2210, w: 315, h: 255 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 22, y: box.y + 150, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
      setActiveGuides([{ type: 'h', y: box.y, x1: box.x, x2: box.x + box.w }]);
      typeText('Movie Tickets App', (t) => setTypedProjects(prev => ({ ...prev, 4: t })), 10, 14, 'varun', box.x + 22, 200);
    }, 19420);

    schedule(() => {
      setBuildStage(49);
      const box = getBox('.cv-made > li:nth-child(5)', { x: 28, y: 2210, w: 315, h: 255 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 22, y: box.y + 185, tool: 'T', role: 'Typing' }
      });
      typeText('Dynamic seat-selection matrix and trailer preview interaction flow.', (t) => setTypedProjectDescs(prev => ({ ...prev, 4: t })), 10, 7, 'varun', box.x + 22, 230);
    }, 19720);

    schedule(() => {
      setBuildStage(50);
    }, 20260);

    // --- Card 6: SaaS Landing Pages (Stages 51, 52, 53) ---
    schedule(() => {
      setBuildStage(51);
      const box = getBox('.cv-made > li:nth-child(6)', { x: 365, y: 2210, w: 315, h: 255 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 22, y: box.y + 150, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
      setActiveGuides([{ type: 'h', y: box.y, x1: box.x, x2: box.x + box.w }]);
      typeText('SaaS Landing Pages', (t) => setTypedProjects(prev => ({ ...prev, 5: t })), 10, 14, 'varun', box.x + 22, 200);
    }, 20500);

    schedule(() => {
      setBuildStage(52);
      const box = getBox('.cv-made > li:nth-child(6)', { x: 365, y: 2210, w: 315, h: 255 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 22, y: box.y + 185, tool: 'T', role: 'Typing' }
      });
      typeText('High-converting responsive landing pages built for 10+ international tech startups.', (t) => setTypedProjectDescs(prev => ({ ...prev, 5: t })), 10, 7, 'varun', box.x + 22, 230);
    }, 20800);

    schedule(() => {
      setBuildStage(53);
    }, 21440);

    // =========================================================================
    // SECTION 6: SAY HELLO (Stages 54 - 58) - Built Line-by-Line ONLY AFTER Cards!
    // =========================================================================
    // 54. Section + Heading: Say hello
    schedule(() => {
      setBuildStage(54);
      setSectionsTriggered(prev => ({ ...prev, contact: true }));
      const box = getBox('.cv-contact', { x: 28, y: 2500, w: 980, h: 180 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 160, y: box.y + 14, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h });
      setActiveGuides([]);
    }, 21740);

    // 55. Intro line
    schedule(() => {
      setBuildStage(55);
      const box = getBox('.cv-contact', { x: 28, y: 2500, w: 980, h: 180 });
      set2Swarm({
        elena: { x: box.x, y: box.y + 44, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 24, y: box.y + 52, tool: 'T', role: 'Typing' }
      });
    }, 21980);

    // 56. Email typed letter-by-letter
    schedule(() => {
      setBuildStage(56);
      const box = getBox('.cv-email-line', { x: 28, y: 2580, w: 500, h: 48 });
      set2Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        varun: { x: box.x + 24, y: box.y + 18, tool: 'T', role: 'Typing' }
      });
      typeText('varun.sehgal02@gmail.com', setTypedEmail, 10, 18, 'varun', box.x + 24, 300);
    }, 22220);

    // 57. Copy button stamps in
    schedule(() => {
      setBuildStage(57);
    }, 22720);

    // 58. Social links reveal
    schedule(() => {
      setBuildStage(58);
      const linksBox = getBox('.cv-contact .cv-links', { x: 28, y: 2635, w: 360, h: 32 });
      set2Swarm({
        elena: { x: linksBox.x, y: linksBox.y, tool: 'R', role: 'Framing' },
        varun: { x: linksBox.x + 120, y: linksBox.y + 10, tool: 'T', role: 'Typing' }
      });
    }, 22940);

    // =========================================================================
    // SECTION 7: FOOTER & SWARM DISMISSAL (Stage 59+)
    // =========================================================================
    schedule(() => {
      setBuildStage(59);
      const footerBox = getBox('.cv-footer', { x: 28, y: 2700, w: 980, h: 64 });
      set4Swarm({
        elena: { x: footerBox.x + 120, y: footerBox.y + 18, tool: '✓', role: 'Framing' },
        alex: { x: footerBox.x + 260, y: footerBox.y + 18, tool: '✓', role: 'Layout' },
        sarah: { x: footerBox.x + 400, y: footerBox.y + 18, tool: '✓', role: 'Stamping' },
        varun: { x: footerBox.x + 540, y: footerBox.y + 18, tool: '✓', role: 'Typing' }
      });
      setActiveSelection(null);
      setActiveGuides([]);
    }, 23200);

    // Smoothly glide & fade cursors out
    schedule(() => {
      const footerBox = getBox('.cv-footer', { x: 28, y: 2700, w: 980, h: 64 });
      set4Swarm({
        elena: { x: footerBox.x + 120, y: footerBox.y + 42, tool: '✓', role: 'Framing', opacity: 0 },
        alex: { x: footerBox.x + 260, y: footerBox.y + 42, tool: '✓', role: 'Layout', opacity: 0 },
        sarah: { x: footerBox.x + 400, y: footerBox.y + 42, tool: '✓', role: 'Stamping', opacity: 0 },
        varun: { x: footerBox.x + 540, y: footerBox.y + 42, tool: '✓', role: 'Typing', opacity: 0 }
      });
    }, 23600);

    // Final unmount of cursors & completion
    schedule(() => {
      setBuildStage(99);
      setIsBuilding(false);
      setActiveCursors([]);
      setActiveSelection(null);
      setActiveGuides([]);
    }, 24000);
  };

  // All sections are built strictly sequentially in buildTopSection() without out-of-order scroll triggers.

  const replayBuild = () => {
    const isMobileOrTablet = deviceMode === 'tablet' || deviceMode === 'mobile' || (typeof window !== 'undefined' && (
      window.innerWidth <= 1024 ||
      /iPad|iPhone|iPod|Android/i.test(navigator.userAgent)
    ));
    if (isMobileOrTablet) {
      skipBuild();
      return;
    }
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
    setBuildStage(99);
    setTypedName('Varun Sehgal');
    setTypedLede('I study and craft friction-free product experiences: tactile, beautiful, and fast.');
    setTypedPolaroidCaption('Varun Sehgal, 2026 →');
    setTypedStat1('6+');
    setTypedStat2('200+');
    setTypedStat3('🥈 1st Runner-Up');
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
      '2_0': 'Operations support, brand identities, and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.'
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
      2: 'Interactive question generator and audio mock-interview coach UI in Figma.',
      3: 'Mobile personal finance app prototype with gesture-driven expense tagging.',
      4: 'Dynamic seat-selection matrix and trailer preview interaction flow.',
      5: 'High-converting responsive landing pages built for 10+ international tech startups.'
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
    const isMobileOrTablet = deviceMode === 'tablet' || deviceMode === 'mobile' || (typeof window !== 'undefined' && (
      window.innerWidth <= 1024 ||
      /iPad|iPhone|iPod|Android/i.test(navigator.userAgent)
    ));
    if ((searchParams && (searchParams.get('skip') === 'true' || searchParams.get('ready') === 'true')) || isMobileOrTablet) {
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
          {/* SECTION 1: HERO (Stages 0 - 7) */}
          <section className="cv-section cv-hero" aria-label="Varun Sehgal">
            <div className="cv-hero-text">
              <h1 className={`cv-name ${isBuilding && !typedName && buildStage < 1 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                {typedName || (!isBuilding ? 'Varun Sehgal' : '\u00A0')}
                {isBuilding && buildStage < 1 && typedName && <span className="cv-typing-caret">|</span>}
              </h1>
              <div className="cv-hero-body">
                <p className={`cv-lede ${isBuilding && !typedLede && buildStage < 1 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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
                <p className={`cv-now-line ${isBuilding && buildStage < 2 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  UI-UX Designer at <strong>UniEvent</strong> &amp; Assistant Head of CODM Esports Operations at <strong>Assemble</strong>.
                </p>
                <p className={`cv-links ${isBuilding && buildStage < 3 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  <a href="mailto:varun.sehgal02@gmail.com">Email</a>
                  <a href="https://github.com/varunsehgal05" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://linkedin.com/in/varunsehgal02" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://varunsehgal.runs-on.dev" target="_blank" rel="noopener noreferrer">Portfolio</a>
                </p>
              </div>
            </div>

            {/* Right side: Polaroid photo (Stage 4) */}
            <div className="cv-side">
              <div className={`cv-polaroid ${isBuilding && buildStage < 4 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
                <img
                  src="/varun.jpg"
                  alt="Varun Sehgal"
                  onError={(e) => { e.currentTarget.src = '/profile/varun.jpg'; }}
                />
                <span>
                  {typedPolaroidCaption || (!isBuilding ? 'Varun Sehgal, 2026 →' : '\u00A0')}
                  {isBuilding && buildStage === 4 && typedPolaroidCaption && <span className="cv-typing-caret">|</span>}
                </span>
              </div>
            </div>

            {/* In Numbers Stats Row (3 Wob-Pills) - Sequentially stamped one by one (Stages 5, 6, 7) */}
            <ul className="cv-stats" aria-label="In numbers">
              <li className={`cv-stat ${isBuilding && buildStage < 5 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
                <strong>{typedStat1 || (!isBuilding ? '6+' : '\u00A0')}</strong>
                <span>industry &amp; SaaS projects shipped</span>
              </li>
              <li className={`cv-stat ${isBuilding && buildStage < 6 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
                <strong>{typedStat2 || (!isBuilding ? '200+' : '\u00A0')}</strong>
                <span>hackers organized at CodeSrijan</span>
              </li>
              <li className={`cv-stat ${isBuilding && buildStage < 7 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
                <strong>{typedStat3 || (!isBuilding ? '🥈 1st Runner-Up' : '\u00A0')}</strong>
                <span>(2nd Place) at HACKeThor (Unstop)</span>
              </li>
            </ul>
          </section>

          {/* SECTION 2: WHAT I WORK ON (Stages 8 - 14) */}
          <section className="cv-section" aria-labelledby="cv-work-on">
            <h2 id="cv-work-on" className={`cv-section-title ${isBuilding && buildStage < 8 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              What I work on
            </h2>
            <div className="cv-threads">
              <article className={`cv-thread cv-thread-0 ${isBuilding && buildStage < 9 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <h3>
                  {typedWork[0] || (!isBuilding ? 'Product Design & Systems' : '\u00A0')}
                  {isBuilding && buildStage === 9 && typedWork[0] && <span className="cv-typing-caret">|</span>}
                </h3>
                <p className={`${isBuilding && buildStage < 10 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  I build coherent, accessible token hierarchies from zero. Defining spacing scales, color palettes in OKLCH, typography rules, and micro-interactions that scale across web and mobile.
                </p>
              </article>
              <article className={`cv-thread cv-thread-1 ${isBuilding && buildStage < 11 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <h3>
                  {typedWork[1] || (!isBuilding ? 'Tactile Hi-Fi Prototyping' : '\u00A0')}
                  {isBuilding && buildStage === 11 && typedWork[1] && <span className="cv-typing-caret">|</span>}
                </h3>
                <p className={`${isBuilding && buildStage < 12 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  Moving beyond static wireframes: crafting interactive state machines, physics-based springs, and clickable high-fidelity flows in Figma, Framer, and ProtoPie.
                </p>
              </article>
              <article className={`cv-thread cv-thread-2 ${isBuilding && buildStage < 13 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <h3>
                  {typedWork[2] || (!isBuilding ? 'Design Engineering' : '\u00A0')}
                  {isBuilding && buildStage === 13 && typedWork[2] && <span className="cv-typing-caret">|</span>}
                </h3>
                <p className={`${isBuilding && buildStage < 14 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  Zero-friction handoff: transforming Figma variables and layouts into executable React, Next.js, and Tailwind CSS components with 60fps animations.
                </p>
              </article>
            </div>
          </section>

          {/* SECTION 3: WHERE I'VE WORKED & SECTION 4: STUDY (Stages 15 - 34) */}
          <div className="cv-timeline-wrap">
            <section className="cv-section" aria-labelledby="cv-work">
              <h2 id="cv-work" className={`cv-section-title ${isBuilding && buildStage < 15 ? 'cv-item-hidden' : 'cv-item-visible'}`}>Where I've worked</h2>
              <ol className="cv-timeline">
                <li className={`cv-job ${isBuilding && buildStage < 16 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  <p className="cv-job-head">
                    <strong>
                      {typedJobs[0] || typedTimeline || (!isBuilding ? 'UI-UX Designer, UniEvent' : '\u00A0')}
                      {isBuilding && buildStage === 16 && (typedJobs[0] || typedTimeline) && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </p>
                  <p className={`cv-job-meta ${isBuilding && buildStage < 17 ? 'cv-item-hidden' : 'cv-item-visible'}`}>Jul 2026 — Nov 2026 • 5 Mos, Punjab, India (Remote)</p>
                  <ul className={`${isBuilding && buildStage < 18 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <li className={`${isBuilding && buildStage < 18 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      {typedJobBullets['0_0'] || (!isBuilding ? 'Designed campus event ticketing platform (EventFlow) from initial wireframes to high-fidelity clickable prototype.' : '\u00A0')}
                      {isBuilding && buildStage === 18 && typedJobBullets['0_0'] && <span className="cv-typing-caret">|</span>}
                    </li>
                    <li className={`${isBuilding && buildStage < 19 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      Slashed transaction drop-off by 30% across a 4-step booking workflow across 50+ reusable component variants.
                    </li>
                  </ul>
                </li>

                <li className={`cv-job ${isBuilding && buildStage < 20 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  <p className="cv-job-head">
                    <strong>
                      {typedJobs[1] || (!isBuilding ? 'Assistant Head of CODM Esports Operations' : '\u00A0')}
                      {isBuilding && buildStage === 20 && typedJobs[1] && <span className="cv-typing-caret">|</span>}
                    </strong>
                    {!isBuilding || buildStage >= 21 ? ', Assemble' : ''}
                  </p>
                  <p className={`cv-job-meta ${isBuilding && buildStage < 21 ? 'cv-item-hidden' : 'cv-item-visible'}`}>Aug 2025 — Jan 2026 • 6 Mos, Bharatpur, Rajasthan, India (Remote)</p>
                  <ul className={`${isBuilding && buildStage < 22 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <li className={`${isBuilding && buildStage < 22 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      {typedJobBullets['1_0'] || (!isBuilding ? 'Assisted in the planning and smooth execution of CODM tournaments and esports events.' : '\u00A0')}
                      {isBuilding && buildStage === 22 && typedJobBullets['1_0'] && <span className="cv-typing-caret">|</span>}
                    </li>
                    <li className={`${isBuilding && buildStage < 23 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      Designed collaborative creator workspace tools and interaction prototypes in Figma.
                    </li>
                  </ul>
                </li>

                <li className={`cv-job ${isBuilding && buildStage < 24 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  <p className="cv-job-head">
                    <strong>
                      {typedJobs[2] || (!isBuilding ? 'Operation internship' : '\u00A0')}
                      {isBuilding && buildStage === 24 && typedJobs[2] && <span className="cv-typing-caret">|</span>}
                    </strong>
                    {!isBuilding || buildStage >= 25 ? ', Knaptix Ventures Private Limited' : ''}
                  </p>
                  <p className={`cv-job-meta ${isBuilding && buildStage < 25 ? 'cv-item-hidden' : 'cv-item-visible'}`}>Jun 2025 — Aug 2025 • 3 Mos, Pune District, Maharashtra, India (Remote)</p>
                  <ul className={`${isBuilding && buildStage < 26 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <li className={`${isBuilding && buildStage < 26 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      {typedJobBullets['2_0'] || (!isBuilding ? 'Operations support, brand identities, and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.' : '\u00A0')}
                      {isBuilding && buildStage === 26 && typedJobBullets['2_0'] && <span className="cv-typing-caret">|</span>}
                    </li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="cv-section" aria-labelledby="cv-study">
              <h2 id="cv-study" className={`cv-section-title ${isBuilding && buildStage < 27 ? 'cv-item-hidden' : 'cv-item-visible'}`}>Study, and the rest</h2>
              <div className="cv-two">
                <ul className={`cv-plain ${isBuilding && buildStage < 28 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  <li className={`cv-entry ${isBuilding && buildStage < 28 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <strong>
                      {typedStudy[0] || (!isBuilding ? 'B.Tech in Computer Science & Engineering' : '\u00A0')}
                      {isBuilding && buildStage === 28 && typedStudy[0] && <span className="cv-typing-caret">|</span>}
                    </strong>
                    <span className={`${isBuilding && buildStage < 29 ? 'cv-item-hidden' : 'cv-item-visible'}`}>Jaypee University of Engineering &amp; Technology (JUET), Guna</span>
                    <span className={`cv-soft ${isBuilding && buildStage < 29 ? 'cv-item-hidden' : 'cv-item-visible'}`}>2023 — 2027</span>
                  </li>
                  <li className={`cv-entry ${isBuilding && buildStage < 30 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <strong>Senior Secondary (Class XII)</strong>
                    <span>Central Board of Secondary Education</span>
                    <span className="cv-soft">PCM &amp; Computer Science</span>
                  </li>
                </ul>

                <ul className={`cv-plain ${isBuilding && buildStage < 31 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  <li className={`cv-entry ${isBuilding && buildStage < 31 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <strong>
                      {typedStudy[1] || (!isBuilding ? '🥈 HACKeThor 1st Runner-Up (2nd Place)' : '\u00A0')}
                      {isBuilding && buildStage === 31 && typedStudy[1] && <span className="cv-typing-caret">|</span>}
                    </strong>
                    <span className={`${isBuilding && buildStage < 32 ? 'cv-item-hidden' : 'cv-item-visible'}`}>Awarded 1st Runner-Up (2nd Place) in National Level Hackathon organized by Unstop out of 500+ participants.</span>
                  </li>
                  <li className={`cv-entry ${isBuilding && buildStage < 33 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <strong>CodeSrijan Organizer</strong>
                    <span>Lead UI/UX Designer and Frontend architect for 200+ hackathon participants across 50+ universities.</span>
                  </li>
                  <li className={`cv-entry ${isBuilding && buildStage < 34 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <strong>Core Toolkit</strong>
                    <span className="cv-soft">Figma, Framer, FigJam, ProtoPie, Webflow, React, Next.js, Tailwind CSS, TypeScript.</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* SECTION 5: THINGS I'VE MADE - Strictly 1 Card at a time, Line-by-Line (Stages 35 - 53) */}
          <section className="cv-section" aria-labelledby="cv-made">
            <h2 id="cv-made" className={`cv-section-title ${isBuilding && buildStage < 35 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              Things I've made
            </h2>
            <ul className="cv-made">
              {/* Big Featured Card: CodeSrijan (Stages 36, 37, 38) */}
              <li className={`cv-made-big ${isBuilding && buildStage < 36 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
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
                        {isBuilding && buildStage === 36 && typedProjects[0] && <span className="cv-typing-caret">|</span>}
                      </strong>
                    </a>
                    <span className={`${isBuilding && buildStage < 37 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      {typedProjectDescs[0] || (!isBuilding ? 'Full-stack live hackathon platform designed for Jaypee University with team matchmaking & rubric evaluation.' : '\u00A0')}
                      {isBuilding && buildStage === 37 && typedProjectDescs[0] && <span className="cv-typing-caret">|</span>}
                    </span>
                    <div className={`cv-card-actions ${isBuilding && buildStage < 38 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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
                    <div className={`cv-project-tags ${isBuilding && buildStage < 38 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      <span className="cv-tag next">Next.js</span>
                      <span className="cv-tag live">Vercel Live</span>
                    </div>
                  </div>
                </div>
              </li>

              {/* Card 2: EventFlow (Stages 39, 40, 41) */}
              <li className={`${isBuilding && buildStage < 39 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
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
                      {isBuilding && buildStage === 39 && typedProjects[1] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && buildStage < 40 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[1] || (!isBuilding ? 'Campus event discovery & instant booking platform with 30% reduced drop-off.' : '\u00A0')}
                    {isBuilding && buildStage === 40 && typedProjectDescs[1] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 41 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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
                  <div className={`cv-project-tags ${isBuilding && buildStage < 41 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <span className="cv-tag saas">Design System</span>
                    <span className="cv-tag">SaaS Checkout</span>
                  </div>
                </div>
              </li>

              {/* Card 3: AI Interview (Stages 42, 43, 44) */}
              <li className={`${isBuilding && buildStage < 42 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
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
                      {isBuilding && buildStage === 42 && typedProjects[2] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && buildStage < 43 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[2] || (!isBuilding ? 'Interactive question generator and audio mock-interview coach UI in Figma.' : '\u00A0')}
                    {isBuilding && buildStage === 43 && typedProjectDescs[2] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 44 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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
                  <div className={`cv-project-tags ${isBuilding && buildStage < 44 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <span className="cv-tag ai">AI UX</span>
                  </div>
                </div>
              </li>

              {/* Card 4: Expensify (Stages 45, 46, 47) */}
              <li className={`${isBuilding && buildStage < 45 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
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
                      {isBuilding && buildStage === 45 && typedProjects[3] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && buildStage < 46 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[3] || (!isBuilding ? 'Mobile personal finance app prototype with gesture-driven expense tagging.' : '\u00A0')}
                    {isBuilding && buildStage === 46 && typedProjectDescs[3] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 47 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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
                  <div className={`cv-project-tags ${isBuilding && buildStage < 47 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <span className="cv-tag fintech">Fintech</span>
                    <span className="cv-tag">Mobile UX</span>
                  </div>
                </div>
              </li>

              {/* Card 5: Movie Tickets (Stages 48, 49, 50) */}
              <li className={`${isBuilding && buildStage < 48 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
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
                      {isBuilding && buildStage === 48 && typedProjects[4] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && buildStage < 49 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[4] || (!isBuilding ? 'Dynamic seat-selection matrix and trailer preview interaction flow.' : '\u00A0')}
                    {isBuilding && buildStage === 49 && typedProjectDescs[4] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 50 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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
                  <div className={`cv-project-tags ${isBuilding && buildStage < 50 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <span className="cv-tag">Interactive Proto</span>
                  </div>
                </div>
              </li>

              {/* Card 6: SaaS Landing (Stages 51, 52, 53) */}
              <li className={`${isBuilding && buildStage < 51 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
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
                      {isBuilding && buildStage === 51 && typedProjects[5] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && buildStage < 52 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[5] || (!isBuilding ? 'High-converting responsive landing pages built for 10+ international tech startups.' : '\u00A0')}
                    {isBuilding && buildStage === 52 && typedProjectDescs[5] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 53 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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
                  <div className={`cv-project-tags ${isBuilding && buildStage < 53 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <span className="cv-tag saas">Conversion</span>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          {/* SECTION 6: SAY HELLO (Stages 54 - 58) - Built Line-by-Line */}
          <section className={`cv-section cv-contact ${isBuilding && buildStage < 54 ? 'cv-item-hidden' : 'cv-item-visible'}`} aria-labelledby="cv-contact">
            <h2 id="cv-contact" className={`cv-section-title ${isBuilding && buildStage < 54 ? 'cv-item-hidden' : 'cv-item-visible'}`}>Say hello</h2>
            <p className={`${isBuilding && buildStage < 55 ? 'cv-item-hidden' : 'cv-item-visible'}`}>For product design roles, design systems, or collaboration, write to me:</p>
            <p className={`cv-email-line ${isBuilding && buildStage < 56 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              <a className="cv-email" href="mailto:varun.sehgal02@gmail.com">
                {typedEmail || (!isBuilding ? 'varun.sehgal02@gmail.com' : '\u00A0')}
                {isBuilding && buildStage === 56 && typedEmail && <span className="cv-typing-caret">|</span>}
              </a>
              <button type="button" className={`cv-copy-btn ${isBuilding && buildStage < 57 ? 'cv-item-hidden' : 'cv-item-visible'}`} onClick={copyEmail}>
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </p>
            <p className={`cv-links ${isBuilding && buildStage < 58 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              <a href="https://github.com/varunsehgal05" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/varunsehgal02" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://varunsehgal.runs-on.dev" target="_blank" rel="noopener noreferrer">Portfolio Web</a>
            </p>
          </section>
        </main>

        {/* FOOTER (Stage 59) */}
        <footer className={`cv-footer ${isBuilding && buildStage < 59 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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
