import React, { useState, useEffect, useRef } from 'react';
import './KittuResume.css';

/**
 * KittuResumeApp
 * Interactive notebook-style Figma Resume with smooth viewport auto-scroll,
 * collaborative swarm cursors, fast realistic typing, and smooth Figma component pasting.
 */

const SECTION_HEADINGS = {
  workOn: 'What I work on',
  work: "Where I've worked",
  study: 'Study, and the rest',
  made: "Things I've made",
  contact: 'Say hello'
};

const HERO_LEDE_FULL =
  'I study and craft friction-free product experiences: how interaction models shape user psychology, and whether enterprise systems can be made fluid, beautiful, and tactile without losing execution speed.';
const HERO_NOW_FULL =
  'UI-UX Designer at UniEvent & Assistant Head of CODM Esports Operations at Assemble.';

const WORK_CARDS = [
  {
    title: 'Product Design & Systems',
    desc: 'I build coherent, accessible token hierarchies from zero. Defining spacing scales, color palettes in OKLCH, typography rules, and micro-interactions that scale across web and mobile.'
  },
  {
    title: 'Tactile Hi-Fi Prototyping',
    desc: 'Moving beyond static wireframes: crafting interactive state machines, physics-based springs, and clickable high-fidelity flows in Figma, Framer, and ProtoPie.'
  },
  {
    title: 'Design Engineering',
    desc: 'Zero-friction handoff: transforming Figma variables and layouts into executable React, Next.js, and Tailwind CSS components with 60fps animations.'
  }
];

const JOBS_DATA = [
  {
    head: 'UI-UX Designer, UniEvent',
    suffix: '',
    meta: 'Jul 2026 — Nov 2026 • 5 Mos, Punjab, India (Remote)',
    b1: 'Designed campus event ticketing platform (EventFlow) from initial wireframes to high-fidelity clickable prototype.',
    b2: 'Slashed transaction drop-off by 30% across a 4-step booking workflow across 50+ reusable component variants.'
  },
  {
    head: 'Assistant Head of CODM Esports Operations',
    suffix: ', Assemble',
    meta: 'Aug 2025 — Jan 2026 • 6 Mos, Bharatpur, Rajasthan, India (Remote)',
    b1: 'Assisted in the planning and smooth execution of CODM tournaments and esports events.',
    b2: 'Designed collaborative creator workspace tools and interaction prototypes in Figma.'
  },
  {
    head: 'Operation internship',
    suffix: ', Knaptix Ventures Private Limited',
    meta: 'Jun 2025 — Aug 2025 • 3 Mos, Pune District, Maharashtra, India (Remote)',
    b1: 'Operations support, brand identities, and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.',
    b2: ''
  }
];

const STUDY_TEXTS = {
  0: 'B.Tech in Computer Science & Engineering',
  '0_sub': 'Jaypee University of Engineering & Technology (JUET), Guna',
  1: 'Senior Secondary (Class XII)',
  2: '🥈 HACKeThor 1st Runner-Up (2nd Place)',
  '2_sub': 'Awarded 1st Runner-Up (2nd Place) in National Level Hackathon organized by Unstop out of 500+ participants.',
  3: 'CodeSrijan Organizer',
  '3_sub': 'Lead UI/UX Designer and Frontend architect for 200+ hackathon participants across 50+ universities.',
  4: 'Core Toolkit',
  '4_sub': 'Figma, Framer, FigJam, ProtoPie, Webflow, React, Next.js, Tailwind CSS, TypeScript.'
};

const PROJECT_ITEMS = [
  {
    title: 'CodeSrijan Hackathon Portal',
    desc: 'Full-stack live hackathon platform designed for Jaypee University with team matchmaking & rubric evaluation.'
  },
  {
    title: 'EventFlow Ticketing',
    desc: 'Campus event discovery & instant booking platform with 30% reduced drop-off.'
  },
  {
    title: 'AI Interview Studio',
    desc: 'Interactive question generator and audio mock-interview coach UI in Figma.'
  },
  {
    title: 'Expensify Budget',
    desc: 'Mobile personal finance app prototype with gesture-driven expense tagging.'
  },
  {
    title: 'Movie Tickets App',
    desc: 'Dynamic seat-selection matrix and trailer preview interaction flow.'
  },
  {
    title: 'SaaS Landing Pages',
    desc: 'High-converting responsive landing pages built for 10+ international tech startups.'
  }
];

const CONTACT_INTRO_TEXT = 'For product design roles, design systems, or collaboration, write to me:';
const CONTACT_EMAIL_TEXT = 'varun.sehgal02@gmail.com';

const renderHighlightedLede = (text) => {
  const prefix = 'I study and craft ';
  const phrase = 'friction-free product experiences';
  if (!text || text.length <= prefix.length) return text;
  const hiStart = prefix.length;
  const hiEnd = hiStart + phrase.length;
  const before = text.slice(0, hiStart);
  const highlighted = text.slice(hiStart, Math.min(text.length, hiEnd));
  const after = text.length > hiEnd ? text.slice(hiEnd) : '';
  return (
    <>
      {before}
      <span className="cv-hi">{highlighted}</span>
      {after}
    </>
  );
};

const renderFormattedNowLine = (text) => {
  if (!text) return '\u00A0';
  return text.split(/(UniEvent|Assemble)/g).map((part, idx) =>
    part === 'UniEvent' || part === 'Assemble' ? <strong key={idx}>{part}</strong> : part
  );
};

const KittuResumeApp = ({
  onBack,
  onScrollToTop,
  onFollowElement,
  isParentLoading = false,
  canvasZoom = 1,
  deviceMode = 'desktop'
}) => {
  const [copied, setCopied] = useState(false);
  const [isBuilding, setIsBuilding] = useState(true);
  const [buildStage, setBuildStage] = useState(0);

  const [typedName, setTypedName] = useState('');
  const [typedLede, setTypedLede] = useState('');
  const [typedNowLine, setTypedNowLine] = useState('');
  const [typedPolaroidCaption, setTypedPolaroidCaption] = useState('');
  const [typedStat1, setTypedStat1] = useState('');
  const [typedStat2, setTypedStat2] = useState('');
  const [typedStat3, setTypedStat3] = useState('');
  const [typedSections, setTypedSections] = useState({});
  const [typedWork, setTypedWork] = useState({});
  const [typedWorkDescs, setTypedWorkDescs] = useState({});
  const [typedJobs, setTypedJobs] = useState({});
  const [typedJobBullets, setTypedJobBullets] = useState({});
  const [typedJobBullets2, setTypedJobBullets2] = useState({});
  const [typedStudy, setTypedStudy] = useState({});
  const [typedProjects, setTypedProjects] = useState({});
  const [typedProjectDescs, setTypedProjectDescs] = useState({});
  const [typedContactIntro, setTypedContactIntro] = useState('');
  const [typedEmail, setTypedEmail] = useState('');

  const [activeCursors, setActiveCursors] = useState([]);
  const [activeSelection, setActiveSelection] = useState(null);
  const [activeGuides, setActiveGuides] = useState([]);

  const containerRef = useRef(null);
  const buildTimeoutRef = useRef([]);
  const buildRafRef = useRef(null);
  const buildRunIdRef = useRef(0);
  const onFollowElementRef = useRef(onFollowElement);
  const onScrollToTopRef = useRef(onScrollToTop);

  useEffect(() => {
    onFollowElementRef.current = onFollowElement;
  }, [onFollowElement]);

  useEffect(() => {
    onScrollToTopRef.current = onScrollToTop;
  }, [onScrollToTop]);

  const copyEmail = () => {
    navigator.clipboard?.writeText(CONTACT_EMAIL_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearTimeouts = () => {
    buildTimeoutRef.current.forEach((t) => clearTimeout(t));
    buildTimeoutRef.current = [];
    if (buildRafRef.current) {
      cancelAnimationFrame(buildRafRef.current);
      buildRafRef.current = null;
    }
  };

  const wait = (ms, runId) =>
    new Promise((resolve) => {
      // High-velocity swarm build: brisk, smooth typing & cursor animation
      const scaledMs = Math.max(12, Math.round(ms * 0.20));
      const id = setTimeout(() => {
        resolve(runId === buildRunIdRef.current);
      }, scaledMs);
      buildTimeoutRef.current.push(id);
    });

  // Dynamically measure real rendered box relative to .cv-container at current zoom
  const getBox = (selector, fallback) => {
    if (!containerRef.current) return fallback;
    const container = containerRef.current.querySelector('.cv-container') || containerRef.current;
    const el = container.querySelector(selector);
    if (!el) return fallback;
    const z = Number.isFinite(canvasZoom) && canvasZoom > 0 ? canvasZoom : 1;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    if (eRect.width < 10 || eRect.height < 10) return fallback;
    const x = Math.round((eRect.left - cRect.left) / z);
    const y = Math.round((eRect.top - cRect.top) / z);
    const w = Math.round(eRect.width / z);
    const h = Math.round(eRect.height / z);
    if (![x, y, w, h].every(Number.isFinite)) return fallback;
    return { x, y, w, h };
  };

  // Measure real-time DOM position of the active typing caret relative to .cv-container
  const getCaretPos = () => {
    if (!containerRef.current) return null;
    const container = containerRef.current.querySelector('.cv-container') || containerRef.current;
    const caret = container.querySelector('.cv-typing-caret');
    if (!caret) return null;
    const z = Number.isFinite(canvasZoom) && canvasZoom > 0 ? canvasZoom : 1;
    const cRect = container.getBoundingClientRect();
    const r = caret.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return null;
    return {
      x: Math.round((r.left - cRect.left) / z),
      y: Math.round((r.top - cRect.top) / z)
    };
  };

  // Smoothly pan the outer Figma viewport so the active card/line never builds off-screen
  const followSelector = async (selector, opts = {}, runId) => {
    if (runId !== buildRunIdRef.current || !containerRef.current) return false;
    const container = containerRef.current.querySelector('.cv-container') || containerRef.current;
    const el = container.querySelector(selector);
    if (el && onFollowElementRef.current) {
      const fastOpts = {
        ...opts,
        duration: Math.min(opts.duration || 180, 180),
        settleMs: Math.min(opts.settleMs || 45, 45)
      };
      onFollowElementRef.current(el, fastOpts);
      // Let viewport camera settle gently before typing/pasting begins
      const ok = await wait(fastOpts.settleMs, runId);
      return ok;
    }
    return true;
  };

  const normalizeCursor = (base, override = {}) => {
    const merged = { ...base, ...override };
    return {
      ...merged,
      x: Number.isFinite(merged.x) ? merged.x : 0,
      y: Number.isFinite(merged.y) ? merged.y : 0
    };
  };

  const set4Swarm = ({ varun = {}, elena = {}, sarah = {}, alex = {} }) => {
    setActiveCursors([
      normalizeCursor({ id: 'varun', name: 'Varun Sehgal', color: '#A259FF', role: 'Typing', transitionMs: 140, x: 0, y: 0 }, varun),
      normalizeCursor({ id: 'elena', name: 'Elena Rostova', color: '#F59E0B', role: 'Framing', transitionMs: 140, x: 0, y: 0 }, elena),
      normalizeCursor({ id: 'sarah', name: 'Sarah Lin', color: '#0ACF83', role: 'Pasting', transitionMs: 140, x: 0, y: 0 }, sarah),
      normalizeCursor({ id: 'alex', name: 'Alex Chen', color: '#1ABCFE', role: 'Layout', transitionMs: 140, x: 0, y: 0 }, alex)
    ]);
  };

  const set2Swarm = ({ elena = {}, varun = {}, sarah = null }) => {
    const list = [
      normalizeCursor({ id: 'elena', name: 'Elena Rostova', color: '#F59E0B', role: 'Framing', transitionMs: 140, x: 0, y: 0 }, elena),
      normalizeCursor({ id: 'varun', name: 'Varun Sehgal', color: '#A259FF', role: 'Typing', transitionMs: 130, x: 0, y: 0 }, varun)
    ];
    if (sarah) {
      list.push(
        normalizeCursor({ id: 'sarah', name: 'Sarah Lin', color: '#0ACF83', role: 'Pasting', transitionMs: 140, x: 0, y: 0 }, sarah)
      );
    }
    setActiveCursors(list);
  };

  // Time-exact 60fps fast-typing helper with fluid cursor tracking that follows the REAL typing caret
  const typeTextSmooth = (
    str,
    setter,
    {
      charMs = 6,
      cursorId = 'varun',
      cursorBaseX = null,
      cursorBaseY = null,
      maxCursorOffset = 340,
      maxDurationMs = 340,
      selectionSelector = null,
      runId
    }
  ) =>
    new Promise((resolve) => {
      if (runId !== buildRunIdRef.current) {
        resolve(false);
        return;
      }

      // Fast, snappy keystroke pacing (~4.5x faster, smooth animation)
      const effectiveCharMs = Math.min(charMs || 3.8, 3.8);
      const effectiveMaxDuration = Math.min(maxDurationMs || 240, 240);
      const duration = Math.min(effectiveMaxDuration, Math.max(30, str.length * effectiveCharMs));
      const startTime = performance.now();
      let lastCharCount = 0;
      let lastCursorTick = 0;

      const stepFrame = (now) => {
        if (runId !== buildRunIdRef.current) {
          buildRafRef.current = null;
          resolve(false);
          return;
        }

        const progress = Math.min(1, (now - startTime) / duration);
        // Slightly front-loaded curve for snappy, natural keystroke flow
        const eased = progress < 1 ? progress : 1;
        const charCount = Math.max(1, Math.min(str.length, Math.round(str.length * eased)));

        if (charCount !== lastCharCount) {
          lastCharCount = charCount;
          setter(str.slice(0, charCount));
        }

        if (cursorId && (now - lastCursorTick >= 25 || progress >= 1)) {
          lastCursorTick = now;

          // Query the exact real-time position of the typing caret in the DOM
          const caretPos = getCaretPos();
          if (caretPos) {
            setActiveCursors((prev) =>
              prev.map((c) =>
                c.id === cursorId
                  ? { ...c, x: caretPos.x + 2, y: caretPos.y + 2, transitionMs: 30 }
                  : c
              )
            );
          } else if (cursorBaseX !== null) {
            const offset = Math.round(Math.min(charCount * 9.5, maxCursorOffset) * (0.35 + 0.65 * progress));
            setActiveCursors((prev) =>
              prev.map((c) =>
                c.id === cursorId
                  ? { ...c, x: cursorBaseX + offset, y: cursorBaseY !== null ? cursorBaseY : c.y, transitionMs: 40 }
                  : c
              )
            );
          }

          // Continuously sync activeSelection if text causes card/box to expand in height
          if (selectionSelector && containerRef.current) {
            const updatedBox = getBox(selectionSelector, null);
            if (updatedBox) {
              setActiveSelection({ x: updatedBox.x, y: updatedBox.y, w: updatedBox.w, h: updatedBox.h });
              // Also keep framing cursor (Elena) anchored to the bottom right of the selection box!
              setActiveCursors((prev) =>
                prev.map((c) =>
                  c.id === 'elena' && c.role === 'Framing'
                    ? {
                        ...c,
                        x: updatedBox.x > 700 ? updatedBox.x + updatedBox.w - 24 : updatedBox.x + updatedBox.w - 12,
                        y: updatedBox.y + updatedBox.h - 12,
                        transitionMs: 35
                      }
                    : c
                )
              );
            }
          }
        }

        if (progress < 1) {
          buildRafRef.current = requestAnimationFrame(stepFrame);
        } else {
          buildRafRef.current = null;
          // Final sync of caret and selection upon completion
          const finalCaret = getCaretPos();
          if (finalCaret && cursorId) {
            setActiveCursors((prev) =>
              prev.map((c) =>
                c.id === cursorId
                  ? { ...c, x: finalCaret.x + 2, y: finalCaret.y + 2, transitionMs: 30 }
                  : c
              )
            );
          }
          if (selectionSelector && containerRef.current) {
            const finalBox = getBox(selectionSelector, null);
            if (finalBox) {
              setActiveSelection({ x: finalBox.x, y: finalBox.y, w: finalBox.w, h: finalBox.h });
            }
          }
          resolve(true);
        }
      };

      buildRafRef.current = requestAnimationFrame(stepFrame);
    });

  // Sequential Async Builder — strictly ordered, viewport-followed, un-rushed typing + Figma pasting
  const buildTopSection = async (initialWaitMs = 120) => {
    clearTimeouts();
    const runId = ++buildRunIdRef.current;

    setIsBuilding(true);
    setBuildStage(0);
    setTypedName('');
    setTypedLede('');
    setTypedNowLine('');
    setTypedPolaroidCaption('');
    setTypedStat1('');
    setTypedStat2('');
    setTypedStat3('');
    setTypedSections({});
    setTypedWork({});
    setTypedWorkDescs({});
    setTypedJobs({});
    setTypedJobBullets({});
    setTypedJobBullets2({});
    setTypedStudy({});
    setTypedProjects({});
    setTypedProjectDescs({});
    setTypedContactIntro('');
    setTypedEmail('');
    setActiveCursors([]);
    setActiveSelection(null);
    setActiveGuides([]);

    if (!(await wait(initialWaitMs, runId))) return;

    // =========================================================================
    // SECTION 1: HERO
    // =========================================================================
    const nameBox = getBox('.cv-name', { x: 28, y: 35, w: 460, h: 75 });
    const polBox0 = getBox('.cv-polaroid', { x: 730, y: 110, w: 260, h: 260 });
    set4Swarm({
      elena: { x: nameBox.x, y: nameBox.y, role: 'Framing' },
      alex: { x: nameBox.x + nameBox.w + 24, y: nameBox.y + 12, role: 'Layout' },
      sarah: { x: polBox0.x + 30, y: polBox0.y + 30, role: 'Ready' },
      varun: { x: nameBox.x + 32, y: nameBox.y + 20, role: 'Typing' }
    });
    setActiveSelection({ x: nameBox.x, y: nameBox.y, w: nameBox.w, h: nameBox.h });
    setActiveGuides([{ type: 'h', y: nameBox.y + nameBox.h, x1: nameBox.x, x2: nameBox.x + nameBox.w }]);
    if (!(await wait(240, runId))) return;

    // 0b. Type "Varun Sehgal"
    if (!(await typeTextSmooth('Varun Sehgal', setTypedName, { charMs: 28, cursorBaseX: nameBox.x + 32, cursorBaseY: nameBox.y + 20, selectionSelector: '.cv-name', maxCursorOffset: 240, runId }))) return;
    if (!(await wait(160, runId))) return;

    // 1. Lede paragraph fast & smooth typing
    setBuildStage(1);
    const ledeBox = getBox('.cv-lede', { x: 28, y: 125, w: 600, h: 120 });
    set4Swarm({
      elena: { x: ledeBox.x, y: ledeBox.y, role: 'Framing' },
      alex: { x: ledeBox.x + ledeBox.w + 18, y: ledeBox.y + 24, role: 'Layout' },
      sarah: { x: polBox0.x + 40, y: polBox0.y + 40, role: 'Prepping' },
      varun: { x: ledeBox.x + 20, y: ledeBox.y + 20, role: 'Typing' }
    });
    setActiveSelection({ x: ledeBox.x, y: ledeBox.y, w: ledeBox.w, h: ledeBox.h });
    setActiveGuides([{ type: 'v', x: ledeBox.x + ledeBox.w, y1: ledeBox.y, y2: ledeBox.y + ledeBox.h }]);
    if (!(await wait(200, runId))) return;
    if (!(await typeTextSmooth(HERO_LEDE_FULL, setTypedLede, { charMs: 11, stepChars: 2, cursorBaseX: ledeBox.x + 20, cursorBaseY: ledeBox.y + 20, selectionSelector: '.cv-lede', maxCursorOffset: 380, runId }))) return;
    if (!(await wait(160, runId))) return;

    // 2. Hero "Now" line — fast type
    setBuildStage(2);
    const nowBox = getBox('.cv-now-line', { x: 28, y: 245, w: 580, h: 36 });
    set4Swarm({
      elena: { x: nowBox.x, y: nowBox.y, role: 'Framing' },
      alex: { x: nowBox.x + nowBox.w, y: nowBox.y + 10, role: 'Layout' },
      sarah: { x: nowBox.x + 220, y: nowBox.y + 10, role: 'Styling' },
      varun: { x: nowBox.x + 24, y: nowBox.y + 12, role: 'Typing' }
    });
    setActiveSelection({ x: nowBox.x, y: nowBox.y, w: nowBox.w, h: nowBox.h });
    if (!(await wait(160, runId))) return;
    if (!(await typeTextSmooth(HERO_NOW_FULL, setTypedNowLine, { charMs: 12, stepChars: 2, cursorBaseX: nowBox.x + 24, cursorBaseY: nowBox.y + 12, selectionSelector: '.cv-now-line', maxCursorOffset: 340, runId }))) return;
    if (!(await wait(150, runId))) return;

    // 3. Social Links — Sarah smoothly pastes links strip
    setBuildStage(3);
    const linksBox = getBox('.cv-hero .cv-links', { x: 28, y: 295, w: 380, h: 36 });
    set4Swarm({
      elena: { x: linksBox.x, y: linksBox.y, role: 'Framing' },
      alex: { x: linksBox.x + linksBox.w, y: linksBox.y + 10, role: 'Layout' },
      sarah: { x: linksBox.x + 150, y: linksBox.y + 12, role: 'Pasting ⌘V' },
      varun: { x: linksBox.x + 24, y: linksBox.y + 12, role: 'Reviewing' }
    });
    setActiveSelection({ x: linksBox.x, y: linksBox.y, w: linksBox.w, h: linksBox.h });
    if (!(await wait(340, runId))) return;

    // 4. Polaroid Photo pasted + caption typed
    setBuildStage(4);
    const polBox = getBox('.cv-polaroid', { x: 730, y: 110, w: 260, h: 260 });
    set4Swarm({
      elena: { x: polBox.x, y: polBox.y, role: 'Framing' },
      alex: { x: polBox.x + polBox.w + 14, y: polBox.y + 40, role: 'Layout' },
      sarah: { x: polBox.x + polBox.w / 2, y: polBox.y + 85, role: 'Pasting ⌘V' },
      varun: { x: polBox.x + 26, y: polBox.y + polBox.h - 18, role: 'Typing' }
    });
    setActiveSelection({ x: polBox.x, y: polBox.y, w: polBox.w, h: polBox.h });
    setActiveGuides([]);
    if (!(await wait(240, runId))) return;
    if (!(await typeTextSmooth('Varun Sehgal, 2026 →', setTypedPolaroidCaption, { charMs: 22, cursorBaseX: polBox.x + 26, maxCursorOffset: 170, runId }))) return;
    if (!(await wait(200, runId))) return;

    // 5-7. Stat Pills (Smoothly follow stats bar, paste pill & type metric one by one)
    if (!(await followSelector('.cv-stats', { alignRatio: 0.45, duration: 680, settleMs: 240 }, runId))) return;
    const statsCfg = [
      { stage: 5, sel: '.cv-stats li:nth-child(1)', text: '6+', setter: setTypedStat1 },
      { stage: 6, sel: '.cv-stats li:nth-child(2)', text: '200+', setter: setTypedStat2 },
      { stage: 7, sel: '.cv-stats li:nth-child(3)', text: '🥈 1st Runner-Up', setter: setTypedStat3 }
    ];
    for (const s of statsCfg) {
      const sBox = getBox(s.sel, { x: 28, y: 460, w: 320, h: 85 });
      set4Swarm({
        elena: { x: sBox.x, y: sBox.y, role: 'Framing' },
        alex: { x: sBox.x + sBox.w + 8, y: sBox.y + 18, role: 'Layout' },
        sarah: { x: sBox.x + sBox.w / 2, y: sBox.y + 22, role: 'Pasting ⌘V' },
        varun: { x: sBox.x + 36, y: sBox.y + 24, role: 'Typing' }
      });
      setActiveSelection({ x: sBox.x, y: sBox.y, w: sBox.w, h: sBox.h });
      setBuildStage(s.stage);
      if (!(await wait(190, runId))) return;
      if (!(await typeTextSmooth(s.text, s.setter, { charMs: 24, cursorBaseX: sBox.x + 36, maxCursorOffset: 180, runId }))) return;
      if (!(await wait(160, runId))) return;
    }

    // =========================================================================
    // SECTION 2: WHAT I WORK ON (Auto-scroll into view, paste cards + fast-type titles & descriptions)
    // =========================================================================
    if (!(await followSelector('#cv-work-on', { alignRatio: 0.2, duration: 760, settleMs: 300 }, runId))) return;
    setBuildStage(8);
    const workHead = getBox('#cv-work-on', { x: 28, y: 650, w: 300, h: 42 });
    set2Swarm({
      elena: { x: workHead.x, y: workHead.y, role: 'Framing' },
      varun: { x: workHead.x + 28, y: workHead.y + 12, role: 'Typing' }
    });
    setActiveSelection({ x: workHead.x, y: workHead.y, w: workHead.w, h: workHead.h });
    setActiveGuides([{ type: 'h', y: workHead.y + workHead.h, x1: workHead.x, x2: workHead.x + 980 }]);
    if (!(await typeTextSmooth(SECTION_HEADINGS.workOn, (t) => setTypedSections((p) => ({ ...p, workOn: t })), { charMs: 22, cursorBaseX: workHead.x + 28, maxCursorOffset: 240, runId }))) return;
    if (!(await wait(200, runId))) return;

    const cardStages = [
      { cardStage: 9, descStage: 10, idx: 0, sel: '.cv-thread-0' },
      { cardStage: 11, descStage: 12, idx: 1, sel: '.cv-thread-1' },
      { cardStage: 13, descStage: 14, idx: 2, sel: '.cv-thread-2' }
    ];
    for (const c of cardStages) {
      setBuildStage(c.cardStage);
      await wait(35, runId);
      let cBox = getBox(c.sel, { x: 28 + c.idx * 348, y: 710, w: 326, h: 195 });
      set2Swarm({
        elena: { x: cBox.x, y: cBox.y, role: 'Framing' },
        sarah: { x: cBox.x + Math.round(cBox.w / 2), y: cBox.y + 36, role: 'Pasting ⌘V' },
        varun: { x: cBox.x + 24, y: cBox.y + 28, role: 'Typing' }
      });
      setActiveSelection({ x: cBox.x, y: cBox.y, w: cBox.w, h: cBox.h });
      setActiveGuides([]);
      if (!(await wait(180, runId))) return;
      if (!(await typeTextSmooth(WORK_CARDS[c.idx].title, (t) => setTypedWork((p) => ({ ...p, [c.idx]: t })), {
        charMs: 18,
        cursorBaseX: cBox.x + 24,
        cursorBaseY: cBox.y + 28,
        selectionSelector: c.sel,
        maxCursorOffset: 220,
        runId
      }))) return;
      if (!(await wait(100, runId))) return;

      setBuildStage(c.descStage);
      await wait(35, runId);
      cBox = getBox(c.sel, cBox);
      setActiveSelection({ x: cBox.x, y: cBox.y, w: cBox.w, h: cBox.h });
      set2Swarm({
        elena: {
          x: c.idx === 2 ? cBox.x + cBox.w - 24 : cBox.x + cBox.w - 12,
          y: cBox.y + cBox.h - 12,
          role: 'Framing'
        },
        varun: { x: cBox.x + 24, y: cBox.y + 76, role: 'Typing' }
      });
      if (!(await wait(120, runId))) return;
      if (!(await typeTextSmooth(WORK_CARDS[c.idx].desc, (t) => setTypedWorkDescs((p) => ({ ...p, [c.idx]: t })), {
        charMs: 10,
        stepChars: 2,
        cursorBaseX: cBox.x + 24,
        cursorBaseY: cBox.y + 76,
        selectionSelector: c.sel,
        maxCursorOffset: 260,
        runId
      }))) return;
      if (!(await wait(160, runId))) return;
    }

    // =========================================================================
    // SECTION 3: WHERE I'VE WORKED
    // =========================================================================
    if (!(await followSelector('#cv-work', { alignRatio: 0.2, duration: 780, settleMs: 300 }, runId))) return;
    setBuildStage(15);
    const expHead = getBox('#cv-work', { x: 28, y: 940, w: 320, h: 42 });
    set2Swarm({
      elena: { x: expHead.x, y: expHead.y, role: 'Framing' },
      varun: { x: expHead.x + 28, y: expHead.y + 12, role: 'Typing' }
    });
    setActiveSelection({ x: expHead.x, y: expHead.y, w: expHead.w, h: expHead.h });
    if (!(await typeTextSmooth(SECTION_HEADINGS.work, (t) => setTypedSections((p) => ({ ...p, work: t })), { charMs: 22, cursorBaseX: expHead.x + 28, maxCursorOffset: 260, runId }))) return;
    if (!(await wait(200, runId))) return;

    const jobStages = [
      { headStage: 16, metaStage: 17, b1Stage: 18, b2Stage: 19, idx: 0, sel: '.cv-job:nth-child(1)' },
      { headStage: 20, metaStage: 21, b1Stage: 22, b2Stage: 23, idx: 1, sel: '.cv-job:nth-child(2)' },
      { headStage: 24, metaStage: 25, b1Stage: 26, b2Stage: null, idx: 2, sel: '.cv-job:nth-child(3)' }
    ];

    for (const j of jobStages) {
      if (!(await followSelector(j.sel, { alignRatio: 0.25, duration: 720, settleMs: 240 }, runId))) return;
      const jBox = getBox(j.sel, { x: 28, y: 995 + j.idx * 125, w: 980, h: 105 });
      const data = JOBS_DATA[j.idx];

      // Job Title typed
      setBuildStage(j.headStage);
      set2Swarm({
        elena: { x: jBox.x, y: jBox.y + 8, role: 'Framing' },
        varun: { x: jBox.x + 28, y: jBox.y + 12, role: 'Typing' }
      });
      setActiveSelection({ x: jBox.x, y: jBox.y, w: jBox.w, h: jBox.h });
      if (!(await wait(160, runId))) return;
      if (!(await typeTextSmooth(data.head, (t) => setTypedJobs((p) => ({ ...p, [j.idx]: t })), { charMs: 16, cursorBaseX: jBox.x + 28, cursorBaseY: jBox.y + 12, selectionSelector: j.sel, maxCursorOffset: 320, runId }))) return;

      // Meta + Company pasted cleanly
      setBuildStage(j.metaStage);
      set2Swarm({
        elena: { x: jBox.x + jBox.w - 140, y: jBox.y + 12, role: 'Framing' },
        sarah: { x: jBox.x + 190, y: jBox.y + 38, role: 'Pasting ⌘V' },
        varun: { x: jBox.x + 30, y: jBox.y + 38, role: 'Ready' }
      });
      if (!(await wait(260, runId))) return;

      // Bullet 1 fast-typed
      setBuildStage(j.b1Stage);
      set2Swarm({
        elena: { x: jBox.x + 12, y: jBox.y + 60, role: 'Framing' },
        varun: { x: jBox.x + 40, y: jBox.y + 62, role: 'Typing' }
      });
      if (!(await wait(140, runId))) return;
      if (!(await typeTextSmooth(data.b1, (t) => setTypedJobBullets((p) => ({ ...p, [`${j.idx}_0`]: t })), { charMs: 10, stepChars: 2, cursorBaseX: jBox.x + 40, cursorBaseY: jBox.y + 62, selectionSelector: j.sel, maxCursorOffset: 420, runId }))) return;

      // Bullet 2 fast-typed (if present)
      if (j.b2Stage && data.b2) {
        await wait(110, runId);
        setBuildStage(j.b2Stage);
        set2Swarm({
          elena: { x: jBox.x + 12, y: jBox.y + 84, role: 'Framing' },
          varun: { x: jBox.x + 40, y: jBox.y + 86, role: 'Typing' }
        });
        if (!(await wait(130, runId))) return;
        if (!(await typeTextSmooth(data.b2, (t) => setTypedJobBullets2((p) => ({ ...p, [`${j.idx}_1`]: t })), { charMs: 10, stepChars: 2, cursorBaseX: jBox.x + 40, cursorBaseY: jBox.y + 86, selectionSelector: j.sel, maxCursorOffset: 420, runId }))) return;
      }

      if (!(await wait(220, runId))) return;
    }

    // =========================================================================
    // SECTION 4: STUDY, AND THE REST
    // =========================================================================
    if (!(await followSelector('#cv-study', { alignRatio: 0.22, duration: 760, settleMs: 280 }, runId))) return;
    setBuildStage(27);
    const studyHead = getBox('#cv-study', { x: 28, y: 1365, w: 320, h: 42 });
    set2Swarm({
      elena: { x: studyHead.x, y: studyHead.y, role: 'Framing' },
      varun: { x: studyHead.x + 28, y: studyHead.y + 12, role: 'Typing' }
    });
    setActiveSelection({ x: studyHead.x, y: studyHead.y, w: studyHead.w, h: studyHead.h });
    if (!(await typeTextSmooth(SECTION_HEADINGS.study, (t) => setTypedSections((p) => ({ ...p, study: t })), { charMs: 20, cursorBaseX: studyHead.x + 28, maxCursorOffset: 240, runId }))) return;
    if (!(await wait(180, runId))) return;

    // Left Column: B.Tech + JUET + Senior Secondary
    const col1Box = getBox('.cv-two > ul:nth-child(1)', { x: 28, y: 1420, w: 490, h: 150 });
    setBuildStage(28);
    set2Swarm({
      elena: { x: col1Box.x, y: col1Box.y, role: 'Framing' },
      varun: { x: col1Box.x + 24, y: col1Box.y + 16, role: 'Typing' }
    });
    setActiveSelection({ x: col1Box.x, y: col1Box.y, w: col1Box.w, h: 75 });
    if (!(await typeTextSmooth(STUDY_TEXTS[0], (t) => setTypedStudy((p) => ({ ...p, 0: t })), { charMs: 14, cursorBaseX: col1Box.x + 24, maxCursorOffset: 280, runId }))) return;

    setBuildStage(29);
    set2Swarm({
      elena: { x: col1Box.x, y: col1Box.y + 34, role: 'Framing' },
      sarah: { x: col1Box.x + 220, y: col1Box.y + 36, role: 'Pasting ⌘V' },
      varun: { x: col1Box.x + 24, y: col1Box.y + 36, role: 'Typing' }
    });
    if (!(await typeTextSmooth(STUDY_TEXTS['0_sub'], (t) => setTypedStudy((p) => ({ ...p, '0_sub': t })), { charMs: 10, stepChars: 2, cursorBaseX: col1Box.x + 24, maxCursorOffset: 290, runId }))) return;
    if (!(await wait(140, runId))) return;

    setBuildStage(30);
    set2Swarm({
      elena: { x: col1Box.x, y: col1Box.y + 82, role: 'Framing' },
      sarah: { x: col1Box.x + 190, y: col1Box.y + 94, role: 'Pasting ⌘V' },
      varun: { x: col1Box.x + 24, y: col1Box.y + 94, role: 'Typing' }
    });
    setActiveSelection({ x: col1Box.x, y: col1Box.y + 80, w: col1Box.w, h: 65 });
    if (!(await typeTextSmooth(STUDY_TEXTS[1], (t) => setTypedStudy((p) => ({ ...p, 1: t })), { charMs: 14, cursorBaseX: col1Box.x + 24, maxCursorOffset: 240, runId }))) return;
    if (!(await wait(200, runId))) return;

    // Right Column: HACKeThor + CodeSrijan Organizer + Core Toolkit
    const col2Box = getBox('.cv-two > ul:nth-child(2)', { x: 546, y: 1420, w: 490, h: 170 });
    setBuildStage(31);
    set2Swarm({
      elena: { x: col2Box.x, y: col2Box.y, role: 'Framing' },
      varun: { x: col2Box.x + 24, y: col2Box.y + 16, role: 'Typing' }
    });
    setActiveSelection({ x: col2Box.x, y: col2Box.y, w: col2Box.w, h: 65 });
    if (!(await typeTextSmooth(STUDY_TEXTS[2], (t) => setTypedStudy((p) => ({ ...p, 2: t })), { charMs: 14, cursorBaseX: col2Box.x + 24, maxCursorOffset: 280, runId }))) return;

    setBuildStage(32);
    if (!(await typeTextSmooth(STUDY_TEXTS['2_sub'], (t) => setTypedStudy((p) => ({ ...p, '2_sub': t })), { charMs: 9, stepChars: 2, cursorBaseX: col2Box.x + 24, maxCursorOffset: 300, runId }))) return;
    if (!(await wait(140, runId))) return;

    setBuildStage(33);
    set2Swarm({
      elena: { x: col2Box.x, y: col2Box.y + 72, role: 'Framing' },
      sarah: { x: col2Box.x + 240, y: col2Box.y + 82, role: 'Pasting ⌘V' },
      varun: { x: col2Box.x + 24, y: col2Box.y + 82, role: 'Typing' }
    });
    setActiveSelection({ x: col2Box.x, y: col2Box.y + 72, w: col2Box.w, h: 58 });
    if (!(await typeTextSmooth(STUDY_TEXTS[3], (t) => setTypedStudy((p) => ({ ...p, 3: t })), { charMs: 14, cursorBaseX: col2Box.x + 24, maxCursorOffset: 220, runId }))) return;
    if (!(await wait(180, runId))) return;

    setBuildStage(34);
    set2Swarm({
      elena: { x: col2Box.x, y: col2Box.y + 132, role: 'Framing' },
      sarah: { x: col2Box.x + 220, y: col2Box.y + 140, role: 'Pasting ⌘V' },
      varun: { x: col2Box.x + 24, y: col2Box.y + 140, role: 'Typing' }
    });
    if (!(await typeTextSmooth(STUDY_TEXTS['4_sub'], (t) => setTypedStudy((p) => ({ ...p, '4_sub': t })), { charMs: 10, stepChars: 2, cursorBaseX: col2Box.x + 24, maxCursorOffset: 280, runId }))) return;
    if (!(await wait(240, runId))) return;

    // =========================================================================
    // SECTION 5: THINGS I'VE MADE — Auto-scroll row-by-row, paste cards & type line-by-line
    // =========================================================================
    if (!(await followSelector('#cv-made', { alignRatio: 0.18, duration: 780, settleMs: 300 }, runId))) return;
    setBuildStage(35);
    const madeHead = getBox('#cv-made', { x: 28, y: 1620, w: 320, h: 42 });
    set2Swarm({
      elena: { x: madeHead.x, y: madeHead.y, role: 'Framing' },
      varun: { x: madeHead.x + 28, y: madeHead.y + 12, role: 'Typing' }
    });
    setActiveSelection({ x: madeHead.x, y: madeHead.y, w: madeHead.w, h: madeHead.h });
    if (!(await typeTextSmooth(SECTION_HEADINGS.made, (t) => setTypedSections((p) => ({ ...p, made: t })), { charMs: 22, cursorBaseX: madeHead.x + 28, maxCursorOffset: 240, runId }))) return;
    if (!(await wait(200, runId))) return;

    const projectConfigs = [
      { idx: 0, frameStage: 36, descStage: 37, actStage: 38, sel: '.cv-made > li:nth-child(1)', titleOffsetX: 360, titleOffsetY: 34, descOffsetY: 84, scrollBefore: true, alignRatio: 0.24 },
      { idx: 1, frameStage: 39, descStage: 40, actStage: 41, sel: '.cv-made > li:nth-child(2)', titleOffsetX: 22, titleOffsetY: 150, descOffsetY: 185, scrollBefore: true, alignRatio: 0.2 },
      { idx: 2, frameStage: 42, descStage: 43, actStage: 44, sel: '.cv-made > li:nth-child(3)', titleOffsetX: 22, titleOffsetY: 150, descOffsetY: 185, scrollBefore: false },
      { idx: 3, frameStage: 45, descStage: 46, actStage: 47, sel: '.cv-made > li:nth-child(4)', titleOffsetX: 22, titleOffsetY: 150, descOffsetY: 185, scrollBefore: false },
      { idx: 4, frameStage: 48, descStage: 49, actStage: 50, sel: '.cv-made > li:nth-child(5)', titleOffsetX: 22, titleOffsetY: 150, descOffsetY: 185, scrollBefore: true, alignRatio: 0.24 },
      { idx: 5, frameStage: 51, descStage: 52, actStage: 53, sel: '.cv-made > li:nth-child(6)', titleOffsetX: 22, titleOffsetY: 150, descOffsetY: 185, scrollBefore: false }
    ];

    for (const p of projectConfigs) {
      if (p.scrollBefore) {
        if (!(await followSelector(p.sel, { alignRatio: p.alignRatio || 0.22, duration: 760, settleMs: 260 }, runId))) return;
      }

      const cardSel = `${p.sel} .cv-made-card`;

      // 1. Reveal frame & thumbnail
      setBuildStage(p.frameStage);
      await wait(40, runId);
      let pBox = getBox(cardSel, getBox(p.sel, { x: 28, y: 1675, w: 320, h: 255 }));

      set2Swarm({
        elena: { x: pBox.x - 4, y: pBox.y - 4, role: 'Framing' },
        sarah: { x: pBox.x + Math.round(pBox.w * 0.45), y: pBox.y + 65, role: 'Pasting ⌘V' },
        varun: { x: pBox.x + p.titleOffsetX, y: pBox.y + p.titleOffsetY, role: 'Typing' }
      });
      setActiveSelection({ x: pBox.x, y: pBox.y, w: pBox.w, h: pBox.h });
      setActiveGuides([{ type: 'h', y: pBox.y, x1: pBox.x, x2: pBox.x + pBox.w }]);

      // Let card & thumbnail paste/settle smoothly before typing project title
      if (!(await wait(240, runId))) return;
      if (!(await typeTextSmooth(PROJECT_ITEMS[p.idx].title, (t) => setTypedProjects((prev) => ({ ...prev, [p.idx]: t })), { charMs: 16, cursorBaseX: pBox.x + p.titleOffsetX, cursorBaseY: pBox.y + p.titleOffsetY, selectionSelector: cardSel, maxCursorOffset: 220, runId }))) return;
      if (!(await wait(100, runId))) return;

      // 2. Fast-type description & dynamically adapt selection height
      setBuildStage(p.descStage);
      await wait(40, runId);
      pBox = getBox(cardSel, getBox(p.sel, pBox));
      setActiveSelection({ x: pBox.x, y: pBox.y, w: pBox.w, h: pBox.h });

      set2Swarm({
        elena: { x: pBox.x + pBox.w - 12, y: pBox.y + pBox.h - 12, role: 'Framing' },
        varun: { x: pBox.x + p.titleOffsetX, y: pBox.y + p.descOffsetY, role: 'Typing' }
      });
      if (!(await wait(110, runId))) return;
      if (!(await typeTextSmooth(PROJECT_ITEMS[p.idx].desc, (t) => setTypedProjectDescs((prev) => ({ ...prev, [p.idx]: t })), { charMs: 10, stepChars: 2, cursorBaseX: pBox.x + p.titleOffsetX, cursorBaseY: pBox.y + p.descOffsetY, selectionSelector: cardSel, maxCursorOffset: 240, runId }))) return;
      if (!(await wait(100, runId))) return;

      // 3. Sarah pastes Figma button & tags smoothly with full measured card height
      setBuildStage(p.actStage);
      await wait(50, runId);
      pBox = getBox(cardSel, getBox(p.sel, pBox));
      setActiveSelection({ x: pBox.x, y: pBox.y, w: pBox.w, h: pBox.h });
      setActiveGuides([]);

      const isBigCard = p.idx === 0;
      set2Swarm({
        elena: { x: pBox.x + pBox.w - 12, y: pBox.y + pBox.h - 12, role: 'Framing' },
        sarah: {
          x: isBigCard ? pBox.x + p.titleOffsetX + 160 : pBox.x + pBox.w - 32,
          y: pBox.y + pBox.h - 16,
          role: 'Pasting Tags'
        },
        varun: { x: pBox.x + p.titleOffsetX, y: pBox.y + p.titleOffsetY, role: 'Done ✓' }
      });
      if (!(await wait(280, runId))) return;
    }

    // =========================================================================
    // SECTION 6: SAY HELLO & FOOTER
    // =========================================================================
    if (!(await followSelector('.cv-contact', { alignRatio: 0.28, duration: 780, settleMs: 300 }, runId))) return;
    setBuildStage(54);
    const contactBox = getBox('.cv-contact', { x: 28, y: 2500, w: 980, h: 180 });
    set2Swarm({
      elena: { x: contactBox.x, y: contactBox.y, role: 'Framing' },
      varun: { x: contactBox.x + 28, y: contactBox.y + 14, role: 'Typing' }
    });
    setActiveSelection({ x: contactBox.x, y: contactBox.y, w: contactBox.w, h: contactBox.h });
    setActiveGuides([]);
    if (!(await typeTextSmooth(SECTION_HEADINGS.contact, (t) => setTypedSections((p) => ({ ...p, contact: t })), { charMs: 24, cursorBaseX: contactBox.x + 28, maxCursorOffset: 180, runId }))) return;
    if (!(await wait(160, runId))) return;

    // 55. Intro line fast-typed
    setBuildStage(55);
    set2Swarm({
      elena: { x: contactBox.x, y: contactBox.y + 44, role: 'Framing' },
      varun: { x: contactBox.x + 24, y: contactBox.y + 54, role: 'Typing' }
    });
    if (!(await wait(140, runId))) return;
    if (!(await typeTextSmooth(CONTACT_INTRO_TEXT, setTypedContactIntro, { charMs: 11, stepChars: 2, cursorBaseX: contactBox.x + 24, maxCursorOffset: 340, runId }))) return;
    if (!(await wait(140, runId))) return;

    // 56. Email fast-typed letter-by-letter
    setBuildStage(56);
    const emailBox = getBox('.cv-email-line', { x: 28, y: 2580, w: 500, h: 48 });
    set2Swarm({
      elena: { x: emailBox.x, y: emailBox.y, role: 'Framing' },
      varun: { x: emailBox.x + 24, y: emailBox.y + 18, role: 'Typing' }
    });
    if (!(await wait(140, runId))) return;
    if (!(await typeTextSmooth(CONTACT_EMAIL_TEXT, setTypedEmail, { charMs: 18, cursorBaseX: emailBox.x + 24, maxCursorOffset: 300, runId }))) return;
    if (!(await wait(150, runId))) return;

    // 57. Copy button pasted
    setBuildStage(57);
    set2Swarm({
      elena: { x: emailBox.x + 400, y: emailBox.y + 12, role: 'Framing' },
      sarah: { x: emailBox.x + 410, y: emailBox.y + 18, role: 'Pasting ⌘V' },
      varun: { x: emailBox.x + 330, y: emailBox.y + 18, role: 'Done' }
    });
    if (!(await wait(240, runId))) return;

    // 58. Social links pasted
    setBuildStage(58);
    const cLinksBox = getBox('.cv-contact .cv-links', { x: 28, y: 2635, w: 360, h: 32 });
    set2Swarm({
      elena: { x: cLinksBox.x, y: cLinksBox.y, role: 'Framing' },
      sarah: { x: cLinksBox.x + 110, y: cLinksBox.y + 10, role: 'Pasting ⌘V' },
      varun: { x: cLinksBox.x + 24, y: cLinksBox.y + 10, role: 'Reviewing' }
    });
    if (!(await wait(280, runId))) return;

    // 59. Footer & Calm Swarm Dismissal
    if (!(await followSelector('.cv-footer', { alignRatio: 0.38, duration: 280, settleMs: 120 }, runId))) return;
    setBuildStage(59);
    const footerBox = getBox('.cv-footer', { x: 28, y: 2700, w: 980, h: 64 });
    set4Swarm({
      elena: { x: footerBox.x + 120, y: footerBox.y + 18, role: 'Done ✓' },
      alex: { x: footerBox.x + 260, y: footerBox.y + 18, role: 'Done ✓' },
      sarah: { x: footerBox.x + 400, y: footerBox.y + 18, role: 'Done ✓' },
      varun: { x: footerBox.x + 540, y: footerBox.y + 18, role: 'Done ✓' }
    });
    setActiveSelection(null);
    setActiveGuides([]);
    if (!(await wait(320, runId))) return;

    // Smoothly glide & fade cursors out
    set4Swarm({
      elena: { x: footerBox.x + 120, y: footerBox.y + 42, role: 'Done ✓', opacity: 0 },
      alex: { x: footerBox.x + 260, y: footerBox.y + 42, role: 'Done ✓', opacity: 0 },
      sarah: { x: footerBox.x + 400, y: footerBox.y + 42, role: 'Done ✓', opacity: 0 },
      varun: { x: footerBox.x + 540, y: footerBox.y + 42, role: 'Done ✓', opacity: 0 }
    });
    if (!(await wait(240, runId))) return;

    setBuildStage(99);
    setIsBuilding(false);
    setActiveCursors([]);
    setActiveSelection(null);
    setActiveGuides([]);

    // When build completes: smoothly drop user back at top-mid of the notebook
    if (onScrollToTopRef.current) {
      onScrollToTopRef.current({ duration: 520 });
    } else if (onScrollToTop) {
      onScrollToTop({ duration: 520 });
    }
  };

  const replayBuild = () => {
    const isMobileOrTablet =
      deviceMode === 'tablet' ||
      deviceMode === 'mobile' ||
      (typeof window !== 'undefined' &&
        (window.innerWidth <= 1024 || /iPad|iPhone|iPod|Android/i.test(navigator.userAgent)));

    if (isMobileOrTablet) {
      skipBuild();
      return;
    }

    buildRunIdRef.current += 1;
    clearTimeouts();
    if (onScrollToTopRef.current) {
      onScrollToTopRef.current({ duration: 300 });
    } else if (onScrollToTop) {
      onScrollToTop();
    }
    // Wait until viewport finishes panning back to top before starting
    buildTopSection(onScrollToTop ? 220 : 40);
  };

  const skipBuild = () => {
    buildRunIdRef.current += 1;
    clearTimeouts();
    setIsBuilding(false);
    setBuildStage(99);
    setTypedName('Varun Sehgal');
    setTypedLede(HERO_LEDE_FULL);
    setTypedNowLine(HERO_NOW_FULL);
    setTypedPolaroidCaption('Varun Sehgal, 2026 →');
    setTypedStat1('6+');
    setTypedStat2('200+');
    setTypedStat3('🥈 1st Runner-Up');
    setTypedSections(SECTION_HEADINGS);
    setTypedWork({
      0: WORK_CARDS[0].title,
      1: WORK_CARDS[1].title,
      2: WORK_CARDS[2].title
    });
    setTypedWorkDescs({
      0: WORK_CARDS[0].desc,
      1: WORK_CARDS[1].desc,
      2: WORK_CARDS[2].desc
    });
    setTypedJobs({
      0: JOBS_DATA[0].head,
      1: JOBS_DATA[1].head,
      2: JOBS_DATA[2].head
    });
    setTypedJobBullets({
      '0_0': JOBS_DATA[0].b1,
      '1_0': JOBS_DATA[1].b1,
      '2_0': JOBS_DATA[2].b1
    });
    setTypedJobBullets2({
      '0_1': JOBS_DATA[0].b2,
      '1_1': JOBS_DATA[1].b2
    });
    setTypedStudy(STUDY_TEXTS);
    setTypedProjects({
      0: PROJECT_ITEMS[0].title,
      1: PROJECT_ITEMS[1].title,
      2: PROJECT_ITEMS[2].title,
      3: PROJECT_ITEMS[3].title,
      4: PROJECT_ITEMS[4].title,
      5: PROJECT_ITEMS[5].title
    });
    setTypedProjectDescs({
      0: PROJECT_ITEMS[0].desc,
      1: PROJECT_ITEMS[1].desc,
      2: PROJECT_ITEMS[2].desc,
      3: PROJECT_ITEMS[3].desc,
      4: PROJECT_ITEMS[4].desc,
      5: PROJECT_ITEMS[5].desc
    });
    setTypedContactIntro(CONTACT_INTRO_TEXT);
    setTypedEmail(CONTACT_EMAIL_TEXT);
    setActiveCursors([]);
    setActiveSelection(null);
    setActiveGuides([]);

    // Drop user at top mid
    if (onScrollToTopRef.current) {
      onScrollToTopRef.current({ duration: 200 });
    } else if (onScrollToTop) {
      onScrollToTop({ duration: 200 });
    }
  };

  useEffect(() => {
    if (isParentLoading) {
      buildRunIdRef.current += 1;
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
    const isMobileOrTablet =
      deviceMode === 'tablet' ||
      deviceMode === 'mobile' ||
      (typeof window !== 'undefined' &&
        (window.innerWidth <= 1024 || /iPad|iPhone|iPod|Android/i.test(navigator.userAgent)));

    if ((searchParams && (searchParams.get('skip') === 'true' || searchParams.get('ready') === 'true')) || isMobileOrTablet) {
      skipBuild();
      return;
    }

    buildTopSection(140);

    return () => {
      buildRunIdRef.current += 1;
      clearTimeouts();
    };
  }, [isParentLoading]);

  return (
    <div className="kittu-resume-artboard-box" ref={containerRef}>
      {/* Top Header / Nav */}
      <div className="cv-top-bar">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="cv-back-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
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
            title={isBuilding ? 'Skip the build and view full notebook' : 'Replay the collaborative crowd-of-cursors build animation'}
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
            {/* Active Selection Box */}
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
                  backgroundColor: 'rgba(26, 188, 254, 0.045)',
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
                    : { left: `${g.x1}px`, top: `${g.y}px`, height: '1px', width: `${g.x2 - g.x1}px`, borderTop: '1.5px dashed #EC4899' }),
                  opacity: 0.85
                }}
              />
            ))}

            {/* Active Collaborative Cursors */}
            {activeCursors.map((c) => {
              const isNearRightEdge = c.x > 880;
              return (
                <div
                  key={c.id}
                  className="cv-cursor"
                  style={{
                    position: 'absolute',
                    transform: `translate3d(${c.x}px, ${c.y}px, 0)`,
                    opacity: c.opacity !== undefined ? c.opacity : 1,
                    transition: `transform ${c.transitionMs || 140}ms ${
                      (c.transitionMs || 140) <= 200 ? 'linear' : 'cubic-bezier(0.22, 1, 0.36, 1)'
                    }, opacity 0.38s ease`,
                    zIndex: 120,
                    display: 'flex',
                    flexDirection: isNearRightEdge ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    pointerEvents: 'none'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                      fill={c.color}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span
                    style={{
                      background: c.color,
                      color: '#ffffff',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                      fontSize: '9.5px',
                      fontWeight: '600',
                      padding: '2px 7px',
                      borderRadius: '3px',
                      marginLeft: isNearRightEdge ? '0px' : '8px',
                      marginRight: isNearRightEdge ? '8px' : '0px',
                      marginTop: '-2px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.22)',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.2px'
                    }}
                  >
                    <span>{c.role || (c.id === 'varun' ? 'Typing' : c.id === 'sarah' ? 'Pasting' : c.id === 'alex' ? 'Layout' : 'Framing')}</span>
                  </span>
                </div>
              );
            })}
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
              <div className="cv-hero-body">
                <p className={`cv-lede ${isBuilding && !typedLede && buildStage < 1 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  {typedLede ? (
                    <>
                      {renderHighlightedLede(typedLede)}
                      {isBuilding && buildStage === 1 && <span className="cv-typing-caret">|</span>}
                    </>
                  ) : !isBuilding ? (
                    renderHighlightedLede(HERO_LEDE_FULL)
                  ) : (
                    '\u00A0'
                  )}
                </p>
                <p className={`cv-now-line ${isBuilding && buildStage < 2 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  {isBuilding ? (
                    <>
                      {renderFormattedNowLine(typedNowLine)}
                      {buildStage === 2 && typedNowLine && <span className="cv-typing-caret">|</span>}
                    </>
                  ) : (
                    renderFormattedNowLine(HERO_NOW_FULL)
                  )}
                </p>
                <p className={`cv-links ${isBuilding && buildStage < 3 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
                  <a href="mailto:varun.sehgal02@gmail.com">Email</a>
                  <a href="https://github.com/varunsehgal05" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://linkedin.com/in/varunsehgal02" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://varunsehgal.runs-on.dev" target="_blank" rel="noopener noreferrer">Portfolio</a>
                </p>
              </div>
            </div>

            {/* Right side: Polaroid photo */}
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

            {/* Stats Row */}
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

          {/* SECTION 2: WHAT I WORK ON */}
          <section className="cv-section" aria-labelledby="cv-work-on">
            <h2 id="cv-work-on" className={`cv-section-title ${isBuilding && buildStage < 8 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              {typedSections.workOn || (!isBuilding ? SECTION_HEADINGS.workOn : '\u00A0')}
              {isBuilding && buildStage === 8 && typedSections.workOn && <span className="cv-typing-caret">|</span>}
            </h2>
            <div className="cv-threads">
              {WORK_CARDS.map((card, idx) => {
                const cStage = 9 + idx * 2;
                const dStage = 10 + idx * 2;
                return (
                  <article key={card.title} className={`cv-thread cv-thread-${idx} ${isBuilding && buildStage < cStage ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
                    <h3>
                      {typedWork[idx] || (!isBuilding ? card.title : '\u00A0')}
                      {isBuilding && buildStage === cStage && typedWork[idx] && <span className="cv-typing-caret">|</span>}
                    </h3>
                    <p className={`${isBuilding && buildStage < dStage ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      {typedWorkDescs[idx] || (!isBuilding ? card.desc : '\u00A0')}
                      {isBuilding && buildStage === dStage && typedWorkDescs[idx] && <span className="cv-typing-caret">|</span>}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* SECTION 3: WHERE I'VE WORKED & SECTION 4: STUDY */}
          <div className="cv-timeline-wrap">
            <section className="cv-section" aria-labelledby="cv-work">
              <h2 id="cv-work" className={`cv-section-title ${isBuilding && buildStage < 15 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                {typedSections.work || (!isBuilding ? SECTION_HEADINGS.work : '\u00A0')}
                {isBuilding && buildStage === 15 && typedSections.work && <span className="cv-typing-caret">|</span>}
              </h2>
              <ol className="cv-timeline">
                {JOBS_DATA.map((job, idx) => {
                  const headStage = idx === 0 ? 16 : idx === 1 ? 20 : 24;
                  const metaStage = idx === 0 ? 17 : idx === 1 ? 21 : 25;
                  const b1Stage = idx === 0 ? 18 : idx === 1 ? 22 : 26;
                  const b2Stage = idx === 0 ? 19 : idx === 1 ? 23 : 99;
                  return (
                    <li key={job.head} className={`cv-job ${isBuilding && buildStage < headStage ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      <p className="cv-job-head">
                        <strong>
                          {typedJobs[idx] || (!isBuilding ? job.head : '\u00A0')}
                          {isBuilding && buildStage === headStage && typedJobs[idx] && <span className="cv-typing-caret">|</span>}
                        </strong>
                        {job.suffix && (!isBuilding || buildStage >= metaStage ? job.suffix : '')}
                      </p>
                      <p className={`cv-job-meta ${isBuilding && buildStage < metaStage ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                        {job.meta}
                      </p>
                      <ul className={`${isBuilding && buildStage < b1Stage ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                        <li className={`${isBuilding && buildStage < b1Stage ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                          {typedJobBullets[`${idx}_0`] || (!isBuilding ? job.b1 : '\u00A0')}
                          {isBuilding && buildStage === b1Stage && typedJobBullets[`${idx}_0`] && <span className="cv-typing-caret">|</span>}
                        </li>
                        {job.b2 && (
                          <li className={`${isBuilding && buildStage < b2Stage ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                            {typedJobBullets2[`${idx}_1`] || (!isBuilding ? job.b2 : '\u00A0')}
                            {isBuilding && buildStage === b2Stage && typedJobBullets2[`${idx}_1`] && <span className="cv-typing-caret">|</span>}
                          </li>
                        )}
                      </ul>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section className="cv-section" aria-labelledby="cv-study">
              <h2 id="cv-study" className={`cv-section-title ${isBuilding && buildStage < 27 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                {typedSections.study || (!isBuilding ? SECTION_HEADINGS.study : '\u00A0')}
                {isBuilding && buildStage === 27 && typedSections.study && <span className="cv-typing-caret">|</span>}
              </h2>
              <div className="cv-two">
                <ul className={`cv-plain ${isBuilding && buildStage < 28 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  <li className={`cv-entry ${isBuilding && buildStage < 28 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <strong>
                      {typedStudy[0] || (!isBuilding ? STUDY_TEXTS[0] : '\u00A0')}
                      {isBuilding && buildStage === 28 && typedStudy[0] && <span className="cv-typing-caret">|</span>}
                    </strong>
                    <span className={`${isBuilding && buildStage < 29 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      {typedStudy['0_sub'] || (!isBuilding ? STUDY_TEXTS['0_sub'] : '\u00A0')}
                      {isBuilding && buildStage === 29 && typedStudy['0_sub'] && <span className="cv-typing-caret">|</span>}
                    </span>
                    <span className={`cv-soft ${isBuilding && buildStage < 29 ? 'cv-item-hidden' : 'cv-item-visible'}`}>2023 — 2027</span>
                  </li>
                  <li className={`cv-entry ${isBuilding && buildStage < 30 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <strong>
                      {typedStudy[1] || (!isBuilding ? STUDY_TEXTS[1] : '\u00A0')}
                      {isBuilding && buildStage === 30 && typedStudy[1] && <span className="cv-typing-caret">|</span>}
                    </strong>
                    <span>Central Board of Secondary Education</span>
                    <span className="cv-soft">PCM &amp; Computer Science</span>
                  </li>
                </ul>

                <ul className={`cv-plain ${isBuilding && buildStage < 31 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                  <li className={`cv-entry ${isBuilding && buildStage < 31 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <strong>
                      {typedStudy[2] || (!isBuilding ? STUDY_TEXTS[2] : '\u00A0')}
                      {isBuilding && buildStage === 31 && typedStudy[2] && <span className="cv-typing-caret">|</span>}
                    </strong>
                    <span className={`${isBuilding && buildStage < 32 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      {typedStudy['2_sub'] || (!isBuilding ? STUDY_TEXTS['2_sub'] : '\u00A0')}
                      {isBuilding && buildStage === 32 && typedStudy['2_sub'] && <span className="cv-typing-caret">|</span>}
                    </span>
                  </li>
                  <li className={`cv-entry ${isBuilding && buildStage < 33 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <strong>
                      {typedStudy[3] || (!isBuilding ? STUDY_TEXTS[3] : '\u00A0')}
                      {isBuilding && buildStage === 33 && typedStudy[3] && <span className="cv-typing-caret">|</span>}
                    </strong>
                    <span>{STUDY_TEXTS['3_sub']}</span>
                  </li>
                  <li className={`cv-entry ${isBuilding && buildStage < 34 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    <strong>{STUDY_TEXTS[4]}</strong>
                    <span className="cv-soft">
                      {typedStudy['4_sub'] || (!isBuilding ? STUDY_TEXTS['4_sub'] : '\u00A0')}
                      {isBuilding && buildStage === 34 && typedStudy['4_sub'] && <span className="cv-typing-caret">|</span>}
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* SECTION 5: THINGS I'VE MADE */}
          <section className="cv-section" aria-labelledby="cv-made">
            <h2 id="cv-made" className={`cv-section-title ${isBuilding && buildStage < 35 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              {typedSections.made || (!isBuilding ? SECTION_HEADINGS.made : '\u00A0')}
              {isBuilding && buildStage === 35 && typedSections.made && <span className="cv-typing-caret">|</span>}
            </h2>
            <ul className="cv-made">
              {/* Big Featured Card: CodeSrijan */}
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
                        {typedProjects[0] || (!isBuilding ? PROJECT_ITEMS[0].title : '\u00A0')}
                        {isBuilding && buildStage === 36 && typedProjects[0] && <span className="cv-typing-caret">|</span>}
                      </strong>
                    </a>
                    <span className={`${isBuilding && buildStage < 37 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                      {typedProjectDescs[0] || (!isBuilding ? PROJECT_ITEMS[0].desc : '\u00A0')}
                      {isBuilding && buildStage === 37 && typedProjectDescs[0] && <span className="cv-typing-caret">|</span>}
                    </span>
                    <div className={`cv-card-actions ${isBuilding && buildStage < 38 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
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

              {/* Card 2: EventFlow */}
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
                      {typedProjects[1] || (!isBuilding ? PROJECT_ITEMS[1].title : '\u00A0')}
                      {isBuilding && buildStage === 39 && typedProjects[1] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && buildStage < 40 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[1] || (!isBuilding ? PROJECT_ITEMS[1].desc : '\u00A0')}
                    {isBuilding && buildStage === 40 && typedProjectDescs[1] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 41 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
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

              {/* Card 3: AI Interview */}
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
                      {typedProjects[2] || (!isBuilding ? PROJECT_ITEMS[2].title : '\u00A0')}
                      {isBuilding && buildStage === 42 && typedProjects[2] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && buildStage < 43 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[2] || (!isBuilding ? PROJECT_ITEMS[2].desc : '\u00A0')}
                    {isBuilding && buildStage === 43 && typedProjectDescs[2] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 44 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
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

              {/* Card 4: Expensify */}
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
                      {typedProjects[3] || (!isBuilding ? PROJECT_ITEMS[3].title : '\u00A0')}
                      {isBuilding && buildStage === 45 && typedProjects[3] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && buildStage < 46 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[3] || (!isBuilding ? PROJECT_ITEMS[3].desc : '\u00A0')}
                    {isBuilding && buildStage === 46 && typedProjectDescs[3] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 47 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
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

              {/* Card 5: Movie Tickets */}
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
                      {typedProjects[4] || (!isBuilding ? PROJECT_ITEMS[4].title : '\u00A0')}
                      {isBuilding && buildStage === 48 && typedProjects[4] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && buildStage < 49 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[4] || (!isBuilding ? PROJECT_ITEMS[4].desc : '\u00A0')}
                    {isBuilding && buildStage === 49 && typedProjectDescs[4] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 50 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
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

              {/* Card 6: SaaS Landing */}
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
                      {typedProjects[5] || (!isBuilding ? PROJECT_ITEMS[5].title : '\u00A0')}
                      {isBuilding && buildStage === 51 && typedProjects[5] && <span className="cv-typing-caret">|</span>}
                    </strong>
                  </a>
                  <span className={`${isBuilding && buildStage < 52 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                    {typedProjectDescs[5] || (!isBuilding ? PROJECT_ITEMS[5].desc : '\u00A0')}
                    {isBuilding && buildStage === 52 && typedProjectDescs[5] && <span className="cv-typing-caret">|</span>}
                  </span>
                  <div className={`cv-card-actions ${isBuilding && buildStage < 53 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
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

          {/* SECTION 6: SAY HELLO */}
          <section className={`cv-section cv-contact ${isBuilding && buildStage < 54 ? 'cv-item-hidden' : 'cv-item-visible'}`} aria-labelledby="cv-contact">
            <h2 id="cv-contact" className={`cv-section-title ${isBuilding && buildStage < 54 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              {typedSections.contact || (!isBuilding ? SECTION_HEADINGS.contact : '\u00A0')}
              {isBuilding && buildStage === 54 && typedSections.contact && <span className="cv-typing-caret">|</span>}
            </h2>
            <p className={`${isBuilding && buildStage < 55 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              {typedContactIntro || (!isBuilding ? CONTACT_INTRO_TEXT : '\u00A0')}
              {isBuilding && buildStage === 55 && typedContactIntro && <span className="cv-typing-caret">|</span>}
            </p>
            <p className={`cv-email-line ${isBuilding && buildStage < 56 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              <a className="cv-email" href="mailto:varun.sehgal02@gmail.com">
                {typedEmail || (!isBuilding ? CONTACT_EMAIL_TEXT : '\u00A0')}
                {isBuilding && buildStage === 56 && typedEmail && <span className="cv-typing-caret">|</span>}
              </a>
              <button type="button" className={`cv-copy-btn ${isBuilding && buildStage < 57 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`} onClick={copyEmail}>
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </p>
            <p className={`cv-links ${isBuilding && buildStage < 58 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
              <a href="https://github.com/varunsehgal05" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/varunsehgal02" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://varunsehgal.runs-on.dev" target="_blank" rel="noopener noreferrer">Portfolio Web</a>
            </p>
          </section>
        </main>

        {/* FOOTER */}
        <footer className={`cv-footer ${isBuilding && buildStage < 59 ? 'cv-item-hidden' : 'cv-item-visible cv-stamp-pop'}`}>
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
