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
  const [typedStudy, setTypedStudy] = useState({});
  const [typedProjects, setTypedProjects] = useState({});
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
      const boxPol = getBox('.cv-polaroid', { x: 730, y: 240, w: 260, h: 260 });
      set4Swarm({
        elena: { x: box.x, y: box.y, tool: 'R', role: 'Framing' },
        alex: { x: box.x + box.w + 24, y: box.y + 12, tool: 'V', role: 'Layout' },
        sarah: { x: boxPol.x + 30, y: boxPol.y + 30, tool: '❖', role: 'Stamping' },
        varun: { x: box.x + 35, y: box.y + 18, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h, label: '❖ Title Frame • Elena [R]' });
      setActiveGuides([{ type: 'h', y: box.y + box.h, x1: box.x, x2: box.x + box.w, label: 'Title Baseline' }]);
    }, 100);

    // 2. Stage 1: Varun types "Varun Sehgal" with tracking cursor, Elena holds frame, Sarah pre-stages sticky, Alex measures
    schedule(() => {
      const box = getBox('.cv-name', { x: 28, y: 35, w: 460, h: 75 });
      const boxNote = getBox('.cv-note', { x: 690, y: 60, w: 340, h: 160 });
      set4Swarm({
        elena: { x: box.x + box.w - 10, y: box.y + box.h, tool: 'R', role: 'Framing' },
        alex: { x: box.x + box.w + 24, y: box.y + 12, tool: 'V', role: 'Layout' },
        sarah: { x: boxNote.x + 40, y: boxNote.y + 14, tool: '❖', role: 'Stamping' },
        varun: { x: box.x + 35, y: box.y + 18, tool: 'T', role: 'Typing' }
      });
      typeText('Varun Sehgal', setTypedName, 40, 32, 'varun', box.x + 35);
    }, 320);

    // 3. Stage 2: Value Prop / Lede (4 Swarm Coordinated Multitasking)
    schedule(() => {
      setBuildStage(1);
      const boxLede = getBox('.cv-lede', { x: 28, y: 125, w: 600, h: 160 });
      const boxNote = getBox('.cv-note', { x: 690, y: 60, w: 340, h: 160 });
      set4Swarm({
        elena: { x: boxLede.x, y: boxLede.y, tool: 'R', role: 'Framing' },
        alex: { x: boxLede.x + boxLede.w + 20, y: boxLede.y + 24, tool: 'V', role: 'Layout' },
        sarah: { x: boxNote.x + 40, y: boxNote.y + 14, tool: '❖', role: 'Stamping' },
        varun: { x: boxLede.x + 24, y: boxLede.y + 20, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: boxLede.x, y: boxLede.y, w: boxLede.w, h: boxLede.h, label: '❖ Value Prop • Elena [R]' });
      setActiveGuides([{ type: 'v', x: boxLede.x + boxLede.w, y1: boxLede.y, y2: boxLede.y + boxLede.h, label: 'W: 600px' }]);
      typeText('I study and craft friction-free product experiences: tactile, beautiful, and fast.', setTypedLede, 80, 16, 'varun', boxLede.x + 24);
    }, 850);

    // 4. Stage 3: Sticky Note (Tactile Stamp & Live Typing)
    schedule(() => {
      setBuildStage(2);
      const boxNote = getBox('.cv-note', { x: 690, y: 60, w: 340, h: 160 });
      const boxPol = getBox('.cv-polaroid', { x: 730, y: 240, w: 260, h: 260 });
      set4Swarm({
        elena: { x: boxNote.x, y: boxNote.y, tool: 'R', role: 'Framing' },
        alex: { x: boxNote.x + boxNote.w + 16, y: boxNote.y + 20, tool: 'V', role: 'Layout' },
        sarah: { x: boxPol.x + 40, y: boxPol.y + 40, tool: '❖', role: 'Stamping' },
        varun: { x: boxNote.x + 20, y: boxNote.y + 26, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: boxNote.x, y: boxNote.y, w: boxNote.w, h: boxNote.h, label: '❖ Sticky Note • Elena [R]' });
      setActiveGuides([{ type: 'v', x: boxNote.x, y1: boxNote.y - 20, y2: boxNote.y + 350, label: `Right Column (${boxNote.x}px)` }]);
      setBuildStage(3); // Pops with cv-stamp-pop!
      typeText('Now: AI Interview & EventFlow', setTypedNoteHead, 60, 20);
      typeText('Architecting multi-token design systems in Figma and translating them with sub-millisecond fidelity into Next.js & Tailwind components.', setTypedNoteBody, 500, 8);
    }, 2200);

    // 5. Stage 4: Polaroid Photo (Tactile Stamp & Caption Typing)
    schedule(() => {
      const boxPol = getBox('.cv-polaroid', { x: 730, y: 240, w: 260, h: 260 });
      const box1 = getBox('.cv-stats li:nth-child(1)', { x: 28, y: 520, w: 320, h: 85 });
      set4Swarm({
        elena: { x: box1.x, y: box1.y, tool: 'R', role: 'Framing' },
        alex: { x: boxPol.x + boxPol.w + 16, y: boxPol.y + 40, tool: 'V', role: 'Layout' },
        sarah: { x: boxPol.x + boxPol.w / 2, y: boxPol.y + 90, tool: '❖', role: 'Stamping' },
        varun: { x: boxPol.x + 28, y: boxPol.y + boxPol.h - 18, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: boxPol.x, y: boxPol.y, w: boxPol.w, h: boxPol.h, label: '❖ Polaroid Photo • Sarah [❖]' });
      setActiveGuides([]);
      setBuildStage(4); // Pops with cv-stamp-pop!
      typeText('Varun Sehgal, 2026 →', setTypedPolaroidCaption, 60, 20);
    }, 3500);

    // 6. Stage 5: Stat 1 (6+ Projects)
    schedule(() => {
      const box1 = getBox('.cv-stats li:nth-child(1)', { x: 28, y: 520, w: 320, h: 85 });
      const box2 = getBox('.cv-stats li:nth-child(2)', { x: 372, y: 520, w: 320, h: 85 });
      set4Swarm({
        elena: { x: box2.x, y: box2.y, tool: 'R', role: 'Framing' },
        alex: { x: box1.x + box1.w + 12, y: box1.y + 16, tool: 'V', role: 'Layout' },
        sarah: { x: box1.x + box1.w / 2, y: box1.y + 24, tool: '❖', role: 'Stamping' },
        varun: { x: box1.x + 36, y: box1.y + 22, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box1.x, y: box1.y, w: box1.w, h: box1.h, label: '❖ Stat 1 • 6+ Projects' });
      setBuildStage(5);
      typeText('6+', setTypedStat1, 40, 30);
    }, 4500);

    // 7. Stage 6: Stat 2 (200+ Hackers)
    schedule(() => {
      const box2 = getBox('.cv-stats li:nth-child(2)', { x: 372, y: 520, w: 320, h: 85 });
      const box3 = getBox('.cv-stats li:nth-child(3)', { x: 716, y: 520, w: 320, h: 85 });
      set4Swarm({
        elena: { x: box3.x, y: box3.y, tool: 'R', role: 'Framing' },
        alex: { x: box2.x + box2.w + 12, y: box2.y + 16, tool: 'V', role: 'Layout' },
        sarah: { x: box2.x + box2.w / 2, y: box2.y + 24, tool: '❖', role: 'Stamping' },
        varun: { x: box2.x + 36, y: box2.y + 22, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box2.x, y: box2.y, w: box2.w, h: box2.h, label: '❖ Stat 2 • 200+ Hackers' });
      setBuildStage(6);
      typeText('200+', setTypedStat2, 40, 30);
    }, 5300);

    // 8. Stage 7/8: Stat 3 (🥈 1st Runner-Up at HACKeThor)
    schedule(() => {
      const box3 = getBox('.cv-stats li:nth-child(3)', { x: 716, y: 520, w: 320, h: 85 });
      set4Swarm({
        elena: { x: box3.x, y: box3.y, tool: 'R', role: 'Framing' },
        alex: { x: box3.x + box3.w - 10, y: box3.y + 16, tool: 'V', role: 'Layout' },
        sarah: { x: box3.x + box3.w / 2, y: box3.y + 24, tool: '❖', role: 'Stamping' },
        varun: { x: box3.x + 36, y: box3.y + 22, tool: 'T', role: 'Typing' }
      });
      setActiveSelection({ x: box3.x, y: box3.y, w: box3.w, h: box3.h, label: '❖ Stat 3 • 🥈 1st Runner-Up' });
      setBuildStage(7);
      typeText('🥈 1st Runner-Up', setTypedStat3, 40, 25);
    }, 6100);

    // 9. Top section complete! All 4 Swarm members await scroll
    schedule(() => {
      setBuildStage(8);
      setActiveSelection(null);
      setActiveGuides([]);
      const statBox = getBox('.cv-stats li:nth-child(2)', { x: 372, y: 520, w: 320, h: 85 });
      set4Swarm({
        elena: { x: statBox.x - 60, y: statBox.y + statBox.h + 35, tool: '✓', role: 'Framing' },
        alex: { x: statBox.x + 50, y: statBox.y + statBox.h + 35, tool: 'V', role: 'Layout' },
        sarah: { x: statBox.x + 170, y: statBox.y + statBox.h + 35, tool: '❖', role: 'Stamping' },
        varun: { x: statBox.x + 290, y: statBox.y + statBox.h + 35, tool: '↓', role: 'Typing' }
      });
    }, 6900);
  };

  // Progressive section builders triggered dynamically on scroll
  const triggerSection = (sectionKey) => {
    if (sectionsTriggeredRef.current[sectionKey]) return;
    sectionsTriggeredRef.current[sectionKey] = true;
    setSectionsTriggered(prev => ({ ...prev, [sectionKey]: true }));

    if (sectionKey === 'workOn') {
      // Section: What I work on (Cards 1, 2, 3 - One by One)
      // Card 1: Product Design & Systems
      schedule(() => {
        const box0 = getBox('.cv-thread-0', { x: 28, y: 730, w: 320, h: 195 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box0.x,
            y: box0.y,
            tool: 'R',
            chat: 'framing sticky card 1 [320 × 195]',
            action: 'Framing Card 1'
          }
        ]);
        setActiveSelection({ x: box0.x, y: box0.y, w: box0.w, h: box0.h, label: '❖ Thread [1/3] • Design Systems' });
        setActiveGuides([]);
      }, 100);

      schedule(() => {
        const box0 = getBox('.cv-thread-0', { x: 28, y: 730, w: 320, h: 195 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box0.x + 30,
            y: box0.y + 24,
            tool: 'T',
            chat: 'typing Product Design & Systems...',
            action: 'Writing Thread 1'
          }
        ]);
      }, 900);

      typeText('Product Design & Systems', (t) => setTypedWork(prev => ({ ...prev, 0: t })), 1050, 40);

      schedule(() => {
        setBuildStage(s => Math.max(s, 9));
      }, 2100);

      // Card 2: Tactile Hi-Fi Prototyping
      schedule(() => {
        const box0 = getBox('.cv-thread-0', { x: 28, y: 730, w: 320, h: 195 });
        const box1 = getBox('.cv-thread-1', { x: 372, y: 730, w: 320, h: 195 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box1.x,
            y: box1.y,
            tool: 'R',
            chat: 'framing sticky card 2 [320 × 195]',
            action: 'Framing Card 2'
          }
        ]);
        setActiveSelection({ x: box1.x, y: box1.y, w: box1.w, h: box1.h, label: '❖ Thread [2/3] • Prototyping' });
        setActiveGuides([{ type: 'h', y: box1.y + 20, x1: box0.x + box0.w, x2: box1.x, label: 'ΔX: 24px Equal Gap' }]);
      }, 2400);

      schedule(() => {
        const box1 = getBox('.cv-thread-1', { x: 372, y: 730, w: 320, h: 195 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box1.x + 30,
            y: box1.y + 24,
            tool: 'T',
            chat: 'typing Tactile Hi-Fi Prototyping...',
            action: 'Writing Thread 2'
          }
        ]);
      }, 3200);

      typeText('Tactile Hi-Fi Prototyping', (t) => setTypedWork(prev => ({ ...prev, 1: t })), 3350, 40);

      schedule(() => {
        setBuildStage(s => Math.max(s, 10));
      }, 4400);

      // Card 3: Design Engineering
      schedule(() => {
        const box1 = getBox('.cv-thread-1', { x: 372, y: 730, w: 320, h: 195 });
        const box2 = getBox('.cv-thread-2', { x: 716, y: 730, w: 320, h: 195 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box2.x,
            y: box2.y,
            tool: 'R',
            chat: 'framing sticky card 3 [320 × 195]',
            action: 'Framing Card 3'
          }
        ]);
        setActiveSelection({ x: box2.x, y: box2.y, w: box2.w, h: box2.h, label: '❖ Thread [3/3] • Engineering' });
        setActiveGuides([{ type: 'h', y: box2.y + 20, x1: box1.x + box1.w, x2: box2.x, label: 'ΔX: 24px Equal Gap' }]);
      }, 4700);

      schedule(() => {
        const box2 = getBox('.cv-thread-2', { x: 716, y: 730, w: 320, h: 195 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box2.x + 30,
            y: box2.y + 24,
            tool: 'T',
            chat: 'typing Design Engineering handoff...',
            action: 'Writing Thread 3'
          }
        ]);
      }, 5500);

      typeText('Design Engineering', (t) => setTypedWork(prev => ({ ...prev, 2: t })), 5650, 40);

      schedule(() => {
        setBuildStage(s => Math.max(s, 11));
        setActiveSelection(null);
        setActiveGuides([]);
        const box2 = getBox('.cv-thread-2', { x: 716, y: 730, w: 320, h: 195 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box2.x - 200,
            y: box2.y + box2.h + 30,
            tool: '✓',
            chat: 'Threads complete! Scroll down to Where I\'ve worked',
            action: 'Ready'
          },
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box2.x + 30,
            y: box2.y + box2.h + 30,
            tool: '↓',
            chat: '👇 Keep scrolling for Experience',
            action: 'Waiting'
          }
        ]);
      }, 6700);
    }
    else if (sectionKey === 'timeline') {
      // Section: Where I've worked & Study (Job by Job, Section by Section)
      // Job 1: UniEvent (Stage 12)
      schedule(() => {
        const box0 = getBox('.cv-job:nth-child(1)', { x: 28, y: 990, w: 1032, h: 100 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box0.x,
            y: box0.y,
            tool: 'R',
            chat: 'framing UniEvent timeline node',
            action: 'Framing Job 1'
          },
          {
            id: 'alex',
            name: 'Alex Chen',
            color: '#1ABCFE',
            x: box0.x + box0.w + 16,
            y: box0.y + 12,
            tool: 'V',
            chat: 'measuring spine baseline',
            action: 'Ruling Spine'
          }
        ]);
        setActiveSelection({ x: box0.x, y: box0.y, w: box0.w, h: box0.h, label: '❖ Job [1/3] • UniEvent' });
        setActiveGuides([{ type: 'v', x: box0.x + 12, y1: box0.y - 10, y2: box0.y + 360, label: 'Spine Baseline' }]);
      }, 100);

      schedule(() => {
        const box0 = getBox('.cv-job:nth-child(1)', { x: 28, y: 990, w: 1032, h: 100 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box0.x + 180,
            y: box0.y + 24,
            tool: 'T',
            chat: 'typing UI-UX Designer, UniEvent...',
            action: 'Writing Job 1'
          },
          {
            id: 'sarah',
            name: 'Sarah Lin',
            color: '#0ACF83',
            x: box0.x + 440,
            y: box0.y + 24,
            tool: '❖',
            chat: 'stamping date tag: Jul 2026 — Nov 2026',
            action: 'Stamping Date'
          }
        ]);
      }, 900);

      typeText('UI-UX Designer, UniEvent', (t) => {
        setTypedJobs(prev => ({ ...prev, 0: t }));
        setTypedTimeline(t);
      }, 1050, 36);

      schedule(() => {
        setBuildStage(s => Math.max(s, 12));
      }, 2000);

      // Job 2: Assemble (Stage 13)
      schedule(() => {
        const box1 = getBox('.cv-job:nth-child(2)', { x: 28, y: 1110, w: 1032, h: 100 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box1.x,
            y: box1.y,
            tool: 'R',
            chat: 'framing Assemble Esports node',
            action: 'Framing Job 2'
          },
          {
            id: 'sarah',
            name: 'Sarah Lin',
            color: '#0ACF83',
            x: box1.x + 520,
            y: box1.y + 24,
            tool: '❖',
            chat: 'stamping CODM Operations badge',
            action: 'Stamping Badge'
          }
        ]);
        setActiveSelection({ x: box1.x, y: box1.y, w: box1.w, h: box1.h, label: '❖ Job [2/3] • Assemble Esports' });
        setActiveGuides([{ type: 'h', y: box1.y - 12, x1: box1.x, x2: box1.x + box1.w, label: 'ΔY: 20px Equal Gap' }]);
      }, 2300);

      schedule(() => {
        const box1 = getBox('.cv-job:nth-child(2)', { x: 28, y: 1110, w: 1032, h: 100 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box1.x + 180,
            y: box1.y + 24,
            tool: 'T',
            chat: 'typing Assistant Head of CODM Esports Operations...',
            action: 'Writing Job 2'
          }
        ]);
      }, 3100);

      typeText('Assistant Head of CODM Esports Operations', (t) => setTypedJobs(prev => ({ ...prev, 1: t })), 3250, 32);

      schedule(() => {
        setBuildStage(s => Math.max(s, 13));
      }, 4300);

      // Job 3: Knaptix (Stage 14)
      schedule(() => {
        const box2 = getBox('.cv-job:nth-child(3)', { x: 28, y: 1230, w: 1032, h: 100 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box2.x,
            y: box2.y,
            tool: 'R',
            chat: 'framing Knaptix Ventures node',
            action: 'Framing Job 3'
          },
          {
            id: 'sarah',
            name: 'Sarah Lin',
            color: '#0ACF83',
            x: box2.x + 480,
            y: box2.y + 24,
            tool: '❖',
            chat: 'stamping 10+ startups client badge',
            action: 'Stamping Badge'
          }
        ]);
        setActiveSelection({ x: box2.x, y: box2.y, w: box2.w, h: box2.h, label: '❖ Job [3/3] • Knaptix Ventures' });
        setActiveGuides([{ type: 'h', y: box2.y - 12, x1: box2.x, x2: box2.x + box2.w, label: 'ΔY: 20px Equal Gap' }]);
      }, 4600);

      schedule(() => {
        const box2 = getBox('.cv-job:nth-child(3)', { x: 28, y: 1230, w: 1032, h: 100 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box2.x + 180,
            y: box2.y + 24,
            tool: 'T',
            chat: 'typing Operation internship...',
            action: 'Writing Job 3'
          }
        ]);
      }, 5300);

      typeText('Operation internship', (t) => setTypedJobs(prev => ({ ...prev, 2: t })), 5450, 36);

      schedule(() => {
        setBuildStage(s => Math.max(s, 14));
      }, 6400);

      // Study Col 1: Education (Stage 15)
      schedule(() => {
        const boxCol1 = getBox('.cv-two > ul:nth-child(1)', { x: 28, y: 1380, w: 490, h: 150 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: boxCol1.x,
            y: boxCol1.y,
            tool: 'R',
            chat: 'framing Education column [490 × 150]',
            action: 'Framing Education'
          },
          {
            id: 'alex',
            name: 'Alex Chen',
            color: '#1ABCFE',
            x: boxCol1.x + boxCol1.w + 12,
            y: boxCol1.y + 20,
            tool: 'V',
            chat: 'holding 2-column grid guide',
            action: 'Column Grid'
          }
        ]);
        setActiveSelection({ x: boxCol1.x, y: boxCol1.y, w: boxCol1.w, h: boxCol1.h, label: '❖ Study • JUET B.Tech Degree' });
        setActiveGuides([]);
      }, 6700);

      schedule(() => {
        const boxCol1 = getBox('.cv-two > ul:nth-child(1)', { x: 28, y: 1380, w: 490, h: 150 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: boxCol1.x + 24,
            y: boxCol1.y + 20,
            tool: 'T',
            chat: 'typing B.Tech Computer Science...',
            action: 'Writing Degree'
          }
        ]);
      }, 7400);

      typeText('B.Tech in Computer Science & Engineering', (t) => setTypedStudy(prev => ({ ...prev, 0: t })), 7550, 34);

      schedule(() => {
        setBuildStage(s => Math.max(s, 15));
      }, 8700);

      // Study Col 2: Honors & Toolkit (Stage 16)
      schedule(() => {
        const boxCol2 = getBox('.cv-two > ul:nth-child(2)', { x: 546, y: 1380, w: 490, h: 150 });
        setActiveCursors([
          {
            id: 'sarah',
            name: 'Sarah Lin',
            color: '#0ACF83',
            x: boxCol2.x + 20,
            y: boxCol2.y + 16,
            tool: '❖',
            chat: 'stamping 🥈 HACKeThor 2nd Place medal & toolkit pills',
            action: 'Stamping Medal'
          },
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: boxCol2.x + boxCol2.w,
            y: boxCol2.y,
            tool: 'R',
            chat: 'framing honors column bounds',
            action: 'Framing Honors'
          }
        ]);
        setActiveSelection({ x: boxCol2.x, y: boxCol2.y, w: boxCol2.w, h: boxCol2.h, label: '❖ Honors • National Hackathon' });
        setActiveGuides([{ type: 'h', y: boxCol2.y + boxCol2.h, x1: 28, x2: 1060, label: 'Section Bottom' }]);
      }, 9000);

      schedule(() => {
        const boxCol2 = getBox('.cv-two > ul:nth-child(2)', { x: 546, y: 1380, w: 490, h: 150 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: boxCol2.x + 30,
            y: boxCol2.y + 20,
            tool: 'T',
            chat: 'typing 🥈 HACKeThor 1st Runner-Up (2nd Place)...',
            action: 'Writing Award'
          }
        ]);
      }, 9700);

      typeText('🥈 HACKeThor 1st Runner-Up (2nd Place)', (t) => setTypedStudy(prev => ({ ...prev, 1: t })), 9850, 34);

      schedule(() => {
        setBuildStage(s => Math.max(s, 16));
        setActiveSelection(null);
        setActiveGuides([]);
        const boxWrap = getBox('.cv-timeline-wrap', { x: 28, y: 990, w: 1032, h: 540 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: boxWrap.x + 250,
            y: boxWrap.y + boxWrap.h + 30,
            tool: '✓',
            chat: 'Experience & Study ready! Scroll down to Things I\'ve made',
            action: 'Ready'
          },
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: boxWrap.x + 500,
            y: boxWrap.y + boxWrap.h + 30,
            tool: '↓',
            chat: '👇 Keep scrolling for Projects',
            action: 'Waiting'
          }
        ]);
      }, 11000);
    }
    else if (sectionKey === 'projects') {
      // Section: Things I've made (6 Projects - One by One)
      // Project 1: CodeSrijan (Hero)
      schedule(() => {
        const box = getBox('.cv-made > li:nth-child(1)', { x: 28, y: 1510, w: 1032, h: 230 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box.x,
            y: box.y,
            tool: 'R',
            chat: 'framing CodeSrijan hero card [1032 × 230]',
            action: 'Hero Frame'
          }
        ]);
        setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h, label: '❖ Project [1/6] • CodeSrijan Portal' });
        setActiveGuides([]);
      }, 100);

      schedule(() => {
        const box = getBox('.cv-made > li:nth-child(1)', { x: 28, y: 1510, w: 1032, h: 230 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box.x + 360,
            y: box.y + 40,
            tool: 'T',
            chat: 'typing CodeSrijan Hackathon Portal...',
            action: 'Typing Title'
          }
        ]);
      }, 900);

      typeText('CodeSrijan Hackathon Portal', (t) => setTypedProjects(prev => ({ ...prev, 0: t })), 1050, 38);

      schedule(() => {
        setBuildStage(s => Math.max(s, 17));
      }, 2000);

      // Project 2: EventFlow
      schedule(() => {
        const box = getBox('.cv-made > li:nth-child(2)', { x: 28, y: 1770, w: 320, h: 240 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box.x,
            y: box.y,
            tool: 'R',
            chat: 'framing EventFlow card [320 × 240]',
            action: 'Card Frame'
          }
        ]);
        setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h, label: '❖ Project [2/6] • EventFlow' });
        setActiveGuides([]);
      }, 2300);

      schedule(() => {
        const box = getBox('.cv-made > li:nth-child(2)', { x: 28, y: 1770, w: 320, h: 240 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box.x + 30,
            y: box.y + 24,
            tool: 'T',
            chat: 'typing EventFlow Ticketing...',
            action: 'Typing Title'
          }
        ]);
      }, 3100);

      typeText('EventFlow Ticketing', (t) => setTypedProjects(prev => ({ ...prev, 1: t })), 3250, 38);

      schedule(() => {
        setBuildStage(s => Math.max(s, 18));
      }, 4200);

      // Project 3: AI Interview
      schedule(() => {
        const box2 = getBox('.cv-made > li:nth-child(2)', { x: 28, y: 1770, w: 320, h: 240 });
        const box3 = getBox('.cv-made > li:nth-child(3)', { x: 372, y: 1770, w: 320, h: 240 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box3.x,
            y: box3.y,
            tool: 'R',
            chat: 'framing AI Interview card [320 × 240]',
            action: 'Card Frame'
          }
        ]);
        setActiveSelection({ x: box3.x, y: box3.y, w: box3.w, h: box3.h, label: '❖ Project [3/6] • AI Interview' });
        setActiveGuides([{ type: 'h', y: box3.y + 20, x1: box2.x + box2.w, x2: box3.x, label: 'ΔX: 24px Equal Gap' }]);
      }, 4500);

      schedule(() => {
        const box3 = getBox('.cv-made > li:nth-child(3)', { x: 372, y: 1770, w: 320, h: 240 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box3.x + 30,
            y: box3.y + 24,
            tool: 'T',
            chat: 'typing AI Interview Studio...',
            action: 'Typing Title'
          }
        ]);
      }, 5300);

      typeText('AI Interview Studio', (t) => setTypedProjects(prev => ({ ...prev, 2: t })), 5450, 38);

      schedule(() => {
        setBuildStage(s => Math.max(s, 19));
      }, 6400);

      // Project 4: Expensify
      schedule(() => {
        const box3 = getBox('.cv-made > li:nth-child(3)', { x: 372, y: 1770, w: 320, h: 240 });
        const box4 = getBox('.cv-made > li:nth-child(4)', { x: 716, y: 1770, w: 320, h: 240 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box4.x,
            y: box4.y,
            tool: 'R',
            chat: 'framing Expensify card [320 × 240]',
            action: 'Card Frame'
          }
        ]);
        setActiveSelection({ x: box4.x, y: box4.y, w: box4.w, h: box4.h, label: '❖ Project [4/6] • Expensify' });
        setActiveGuides([{ type: 'h', y: box4.y + 20, x1: box3.x + box3.w, x2: box4.x, label: 'ΔX: 24px Equal Gap' }]);
      }, 6700);

      schedule(() => {
        const box4 = getBox('.cv-made > li:nth-child(4)', { x: 716, y: 1770, w: 320, h: 240 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box4.x + 30,
            y: box4.y + 24,
            tool: 'T',
            chat: 'typing Expensify Budget...',
            action: 'Typing Title'
          }
        ]);
      }, 7500);

      typeText('Expensify Budget', (t) => setTypedProjects(prev => ({ ...prev, 3: t })), 7650, 38);

      schedule(() => {
        setBuildStage(s => Math.max(s, 20));
      }, 8600);

      // Project 5: Movie Tickets
      schedule(() => {
        const box2 = getBox('.cv-made > li:nth-child(2)', { x: 28, y: 1770, w: 320, h: 240 });
        const box5 = getBox('.cv-made > li:nth-child(5)', { x: 28, y: 2035, w: 320, h: 240 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box5.x,
            y: box5.y,
            tool: 'R',
            chat: 'framing Movie card [320 × 240]',
            action: 'Card Frame'
          }
        ]);
        setActiveSelection({ x: box5.x, y: box5.y, w: box5.w, h: box5.h, label: '❖ Project [5/6] • Movie Tickets' });
        setActiveGuides([{ type: 'v', x: box5.x + 20, y1: box2.y + box2.h, y2: box5.y, label: 'ΔY: 25px Equal Gap' }]);
      }, 8900);

      schedule(() => {
        const box5 = getBox('.cv-made > li:nth-child(5)', { x: 28, y: 2035, w: 320, h: 240 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box5.x + 30,
            y: box5.y + 24,
            tool: 'T',
            chat: 'typing Movie Tickets App...',
            action: 'Typing Title'
          }
        ]);
      }, 9700);

      typeText('Movie Tickets App', (t) => setTypedProjects(prev => ({ ...prev, 4: t })), 9850, 38);

      schedule(() => {
        setBuildStage(s => Math.max(s, 21));
      }, 10800);

      // Project 6: SaaS Landing
      schedule(() => {
        const box5 = getBox('.cv-made > li:nth-child(5)', { x: 28, y: 2035, w: 320, h: 240 });
        const box6 = getBox('.cv-made > li:nth-child(6)', { x: 372, y: 2035, w: 320, h: 240 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box6.x,
            y: box6.y,
            tool: 'R',
            chat: 'framing SaaS landing card [320 × 240]',
            action: 'Card Frame'
          }
        ]);
        setActiveSelection({ x: box6.x, y: box6.y, w: box6.w, h: box6.h, label: '❖ Project [6/6] • SaaS Landing' });
        setActiveGuides([{ type: 'h', y: box6.y + 20, x1: box5.x + box5.w, x2: box6.x, label: 'ΔX: 24px Equal Gap' }]);
      }, 11100);

      schedule(() => {
        const box6 = getBox('.cv-made > li:nth-child(6)', { x: 372, y: 2035, w: 320, h: 240 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box6.x + 30,
            y: box6.y + 24,
            tool: 'T',
            chat: 'typing SaaS Landing Pages...',
            action: 'Typing Title'
          }
        ]);
      }, 11900);

      typeText('SaaS Landing Pages', (t) => setTypedProjects(prev => ({ ...prev, 5: t })), 12050, 38);

      schedule(() => {
        setBuildStage(s => Math.max(s, 22));
        setActiveSelection(null);
        setActiveGuides([]);
        const box6 = getBox('.cv-made > li:nth-child(6)', { x: 372, y: 2035, w: 320, h: 240 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box6.x + 50,
            y: box6.y + box6.h + 30,
            tool: '✓',
            chat: 'Projects crafted! Scroll down to Say Hello',
            action: 'Ready'
          },
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box6.x + 250,
            y: box6.y + box6.h + 30,
            tool: '↓',
            chat: '👇 Keep scrolling to Contact',
            action: 'Waiting'
          }
        ]);
      }, 13000);
    }
    else if (sectionKey === 'contact') {
      // Section: Say hello (One by One)
      schedule(() => {
        const box = getBox('.cv-contact', { x: 28, y: 2340, w: 1032, h: 180 });
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: box.x,
            y: box.y,
            tool: 'R',
            chat: 'holding contact frame',
            action: 'Contact Frame'
          }
        ]);
        setActiveSelection({ x: box.x, y: box.y, w: box.w, h: box.h, label: '❖ Say Hello • Contact' });
        setActiveGuides([]);
      }, 100);

      schedule(() => {
        const box = getBox('.cv-contact', { x: 28, y: 2340, w: 1032, h: 180 });
        setActiveCursors([
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: box.x + 220,
            y: box.y + 40,
            tool: 'T',
            chat: 'typing varun.sehgal02@gmail.com...',
            action: 'Writing Email'
          }
        ]);
      }, 1000);

      typeText('varun.sehgal02@gmail.com', setTypedEmail, 1150, 40);

      schedule(() => {
        const box = getBox('.cv-contact', { x: 28, y: 2340, w: 1032, h: 180 });
        setActiveCursors([
          {
            id: 'sarah',
            name: 'Sarah Lin',
            color: '#0ACF83',
            x: box.x + 450,
            y: box.y + 40,
            tool: '❖',
            chat: 'stamping mail button...',
            action: 'Placing CTA'
          }
        ]);
      }, 2400);

      schedule(() => {
        setBuildStage(s => Math.max(s, 23));
      }, 3200);

      // Stage 24: Celebration & Complete
      schedule(() => {
        setBuildStage(24);
        setActiveCursors([
          {
            id: 'elena',
            name: 'Elena Rostova',
            color: '#F59E0B',
            x: 420,
            y: 2420,
            tool: '✓',
            chat: '✨ All 18 components stamped!',
            action: 'Ready!'
          },
          {
            id: 'varun',
            name: 'Varun Sehgal',
            color: '#A259FF',
            x: 560,
            y: 2420,
            tool: '✓',
            chat: '🚀 Notebook live and interactive!',
            action: 'Complete!'
          }
        ]);
        setActiveSelection(null);
        setActiveGuides([]);
      }, 3600);

      // Stage 24: Done
      schedule(() => {
        setIsBuilding(false);
        setBuildStage(24);
        setActiveCursors([]);
        setActiveSelection(null);
        setActiveGuides([]);
      }, 5500);
    }
  };

  // Progressive scroll trigger with seamless cascade (never blocks or stalls scrolling)
  useEffect(() => {
    if (!isBuilding) return;

    const effectiveScroll = Math.max(0, -(canvasPan?.y || 0));

    // Check if element has entered the visible viewport or scrolled past threshold
    const checkInView = (selector, threshold) => {
      if (effectiveScroll > threshold) return true;
      if (!containerRef.current) return false;
      const el = containerRef.current.querySelector(selector);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight - 60 && rect.bottom > 60;
    };

    if (!sectionsTriggeredRef.current.workOn && checkInView('#cv-work-on, [aria-labelledby="cv-work-on"]', 240)) {
      triggerSection('workOn');
    }
    if (!sectionsTriggeredRef.current.timeline && checkInView('.cv-timeline, #cv-work', 580)) {
      if (!sectionsTriggeredRef.current.workOn) triggerSection('workOn');
      triggerSection('timeline');
    }
    if (!sectionsTriggeredRef.current.projects && checkInView('.cv-made, #cv-made', 1050)) {
      if (!sectionsTriggeredRef.current.timeline) triggerSection('timeline');
      triggerSection('projects');
    }
    if (!sectionsTriggeredRef.current.contact && checkInView('.cv-contact, #cv-contact', 1600)) {
      if (!sectionsTriggeredRef.current.projects) triggerSection('projects');
      triggerSection('contact');
    }
  }, [canvasPan?.y, isBuilding, buildStage]);

  const replayBuild = () => {
    buildTopSection();
    if (onScrollToTop) {
      onScrollToTop();
    }
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
                  transition: 'transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1)',
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

            {/* Right side: Sticky note (Stage 3) + Polaroid photo (Stage 4) */}
            <div className="cv-side">
              <aside
                className={`cv-note ${isBuilding && buildStage < 3 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}
                aria-label="What I'm working on now"
              >
                <p className="cv-note-head">
                  {typedNoteHead || (!isBuilding ? 'Now: AI Interview & EventFlow' : '\u00A0')}
                  {isBuilding && buildStage === 3 && typedNoteHead && <span className="cv-typing-caret">|</span>}
                </p>
                <p>
                  {typedNoteBody || (!isBuilding ? 'Architecting multi-token design systems in Figma and translating them with sub-millisecond fidelity into Next.js & Tailwind components.' : '\u00A0')}
                </p>
              </aside>

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
                  <ul className={`${isBuilding && buildStage < 12 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <li>Designed campus event ticketing platform (EventFlow) from initial wireframes to high-fidelity clickable prototype.</li>
                    <li>Slashed transaction drop-off by 30% across a 4-step booking workflow across 50+ reusable component variants.</li>
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
                  <ul className={`${isBuilding && buildStage < 13 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <li>Assisted in the planning and smooth execution of CODM tournaments and esports events.</li>
                    <li>Designed collaborative creator workspace tools and interaction prototypes in Figma.</li>
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
                  <ul className={`${isBuilding && buildStage < 14 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <li>Operations support, brand identities, and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.</li>
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
                    <span className={`${isBuilding && buildStage < 17 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      Full-stack live hackathon platform designed for Jaypee University. Features team matchmaking, rubric evaluation, and real-time announcements.
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
                  <span className={`${isBuilding && buildStage < 18 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    Campus event discovery &amp; instant booking platform with 30% reduced drop-off.
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
                  <span className={`${isBuilding && buildStage < 19 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    Interactive question generator and audio mock-interview coach UI in Figma.
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
                  <span className={`${isBuilding && buildStage < 20 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    Mobile personal finance app prototype with gesture-driven expense tagging.
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
                  <span className={`${isBuilding && buildStage < 21 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    Dynamic seat-selection matrix and trailer preview interaction flow.
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
                  <span className={`${isBuilding && buildStage < 22 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    High-converting responsive landing pages built for 10+ international tech startups.
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
          <section className={`cv-section cv-contact ${isBuilding && !typedEmail && buildStage < 23 ? 'cv-item-hidden' : 'cv-item-visible'}`} aria-labelledby="cv-contact">
            <h2 id="cv-contact" className="cv-section-title">Say hello</h2>
            <p>For product design roles, design systems, or collaboration, write to me:</p>
            <p className="cv-email-line">
              <a className="cv-email" href="mailto:varun.sehgal02@gmail.com">
                {typedEmail || (!isBuilding ? 'varun.sehgal02@gmail.com' : '\u00A0')}
                {isBuilding && buildStage < 23 && typedEmail && <span className="cv-typing-caret">|</span>}
              </a>
              <button type="button" className="cv-copy-btn" onClick={copyEmail}>
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </p>
            <p className="cv-links">
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
