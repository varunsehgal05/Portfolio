import React, { useState, useEffect, useRef } from 'react';
import './KittuResume.css';

/**
 * KittuResumeApp
 * Pixel-perfect recreation of https://www.kittu.pro/resume
 * Includes notebook paper styling, hand-drawn wobbly cards, custom fonts,
 * and the collaborative multiplayer cursor build animation ("one by one or 2 at a time").
 */

const KittuResumeApp = ({ onBack, onTriggerSwarm, onScrollToTop }) => {
  const [copied, setCopied] = useState(false);
  const [isBuilding, setIsBuilding] = useState(true);
  const [buildStage, setBuildStage] = useState(0);
  const [activeCursors, setActiveCursors] = useState([]);
  const [activeSelection, setActiveSelection] = useState(null);
  const [activeGuides, setActiveGuides] = useState([]);
  const containerRef = useRef(null);
  const buildTimeoutRef = useRef([]);

  const copyEmail = () => {
    navigator.clipboard?.writeText('varun.sehgal02@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearTimeouts = () => {
    buildTimeoutRef.current.forEach(t => clearTimeout(t));
    buildTimeoutRef.current = [];
  };

  // Replay the build animation: drag user back up to the top, reset state, and swarm assemble
  const replayBuild = () => {
    clearTimeouts();
    setIsBuilding(true);
    setBuildStage(0);
    setActiveCursors([]);
    setActiveSelection(null);
    setActiveGuides([]);

    // 1. Smoothly scroll viewport / canvas back up to top ("drag me up")
    if (onScrollToTop) {
      onScrollToTop();
    }
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      let parent = containerRef.current.parentElement;
      while (parent) {
        if (parent.scrollTop > 0) {
          parent.scrollTo({ top: 0, behavior: 'smooth' });
        }
        parent = parent.parentElement;
      }
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const schedule = (fn, delay) => {
      const id = setTimeout(fn, delay);
      buildTimeoutRef.current.push(id);
    };

    // Step 0: Cursors enter at top of blank notebook (0s - 1.4s)
    schedule(() => {
      setActiveCursors([
        {
          id: 'type',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 200,
          y: 95,
          tool: 'T',
          chat: 'morning! drafting the notebook resume',
          action: 'Drafting Header'
        }
      ]);
      setActiveSelection({ x: 35, y: 70, w: 540, h: 95, label: '❖ Hero Title • [Varun Sehgal]' });
    }, 120);

    // Step 1: Reveal Hero name & lede text (1.4s - 3.2s)
    schedule(() => {
      setBuildStage(1);
      setActiveCursors([
        {
          id: 'type',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 480,
          y: 195,
          tool: 'T',
          chat: 'writing lede & philosophy',
          action: 'Writing Lede'
        }
      ]);
      setActiveSelection({ x: 35, y: 165, w: 600, h: 140, label: '❖ Lede & Value Prop' });
    }, 1400);

    // Step 2: Elena Rostova frames Sticky Note & Polaroid Photo (3.2s - 5.0s)
    schedule(() => {
      setBuildStage(2);
      setActiveCursors([
        {
          id: 'layout',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 780,
          y: 220,
          tool: 'R',
          chat: 'framing sticky note & polaroid',
          action: 'Aligning Photo'
        }
      ]);
      setActiveSelection({ x: 670, y: 140, w: 320, h: 320, label: '❖ Polaroid & Sticky Note' });
      setActiveGuides([
        { type: 'v', x: 670, y1: 80, y2: 480, label: 'X: Right Column (670px)' }
      ]);
    }, 3200);

    // Step 3: Reviewer 2 & Layout stamp 4 wob-pills stats row (5.0s - 6.8s)
    schedule(() => {
      setBuildStage(3);
      setActiveCursors([
        {
          id: 'reviewer',
          name: 'Reviewer 2',
          color: '#0ACF83',
          x: 280,
          y: 430,
          tool: '⌥',
          chat: 'stamping 4 wob-pills',
          action: 'Duplicating Stats'
        },
        {
          id: 'layout',
          name: 'Layout',
          color: '#FF7262',
          x: 620,
          y: 430,
          tool: 'V',
          chat: 'equal 16px gaps',
          action: 'Smart Guides'
        }
      ]);
      setActiveSelection({ x: 35, y: 390, w: 960, h: 80, label: '❖ Stats Row • [4 × 1fr]' });
      setActiveGuides([
        { type: 'h', x1: 35, x2: 1000, y: 390, label: 'Stats Baseline' }
      ]);
    }, 5000);

    // Step 4: Sarah Lin drops What I Work On cards (6.8s - 8.6s)
    schedule(() => {
      setBuildStage(4);
      setActiveCursors([
        {
          id: 'sarah',
          name: 'Sarah Lin',
          color: '#FF7262',
          x: 420,
          y: 620,
          tool: 'R',
          chat: 'dropping 3 sticky cards',
          action: 'Sticky Cards'
        }
      ]);
      setActiveSelection({ x: 35, y: 560, w: 960, h: 180, label: '❖ What I Work On • [3 × 1fr]' });
      setActiveGuides([]);
    }, 6800);

    // Step 5: Timeline & Study roles reveal (8.6s - 10.4s)
    schedule(() => {
      setBuildStage(5);
      setActiveCursors([
        {
          id: 'type',
          name: 'Type',
          color: '#1ABCFE',
          x: 320,
          y: 920,
          tool: 'T',
          chat: 'UniEvent, Assemble & JUET synced',
          action: 'Experience Roles'
        }
      ]);
      setActiveSelection({ x: 35, y: 860, w: 960, h: 360, label: '❖ Timeline & Education' });
      setActiveGuides([
        { type: 'v', x: 62, y1: 860, y2: 1220, label: 'Timeline Baseline' }
      ]);
    }, 8600);

    // Step 6: Things I've made projects with tags (10.4s - 12.2s)
    schedule(() => {
      setBuildStage(6);
      setActiveCursors([
        {
          id: 'alex',
          name: 'Alex Chen',
          color: '#0ACF83',
          x: 480,
          y: 1450,
          tool: 'R',
          chat: 'tagging CodeSrijan & EventFlow',
          action: 'Projects & Tags'
        }
      ]);
      setActiveSelection({ x: 35, y: 1380, w: 960, h: 520, label: '❖ Things I\'ve Made • 6 Projects' });
      setActiveGuides([]);
    }, 10400);

    // Step 7: Say hello & Final Celebration (12.2s - 13.8s)
    schedule(() => {
      setBuildStage(7);
      setActiveCursors([
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 520,
          y: 1950,
          tool: '✓',
          chat: '✨ Built live, by a crowd of cursors!',
          action: 'Ready!'
        }
      ]);
      setActiveSelection(null);
      setActiveGuides([]);
    }, 12200);

    // Step 8: Build complete (13.8s)
    schedule(() => {
      setIsBuilding(false);
      setBuildStage(8);
      setActiveCursors([]);
      setActiveSelection(null);
      setActiveGuides([]);
    }, 13800);
  };

  const skipBuild = () => {
    clearTimeouts();
    setIsBuilding(false);
    setBuildStage(8);
    setActiveCursors([]);
    setActiveSelection(null);
    setActiveGuides([]);
  };

  useEffect(() => {
    replayBuild();
    return () => clearTimeouts();
  }, []);

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
                  backgroundColor: 'rgba(26, 188, 254, 0.05)',
                  opacity: 1,
                  pointerEvents: 'none'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '-22px',
                    left: 0,
                    background: '#1ABCFE',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontFamily: 'ui-monospace, monospace',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {activeSelection.label}
                </span>
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

            {/* Active Collaborative Cursors (1 or 2 at a time) */}
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

                {/* Name Tag */}
                <span
                  style={{
                    background: c.color,
                    color: '#ffffff',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '1.5px 6px',
                    borderRadius: '4px',
                    marginLeft: '8px',
                    marginTop: '-4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>{c.name}</span>
                  {c.tool && <span style={{ opacity: 0.85, fontSize: '9px', background: 'rgba(0,0,0,0.25)', padding: '0 3px', borderRadius: '2px' }}>{c.tool}</span>}
                </span>

                {/* Chat Bubble */}
                {c.chat && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-32px',
                      left: '12px',
                      background: '#ffffff',
                      color: '#1c1917',
                      border: `1.5px solid ${c.color}`,
                      borderRadius: '5px',
                      padding: '2.5px 8px',
                      fontSize: '11px',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    💬 {c.chat}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <main className="cv-main-content">
          {/* SECTION 1: HERO */}
          <section className="cv-section cv-hero" aria-label="Varun Sehgal">
            <div className={`cv-hero-text ${isBuilding && buildStage < 1 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              <h1 className="cv-name">Varun Sehgal</h1>
              <p className="cv-lede">
                I study and craft <span className="cv-hi">friction-free product experiences</span>: 
                how interaction models shape user psychology, and whether enterprise systems can be made fluid, beautiful, and tactile without losing execution speed.
              </p>
              <p className="cv-now-line">
                UI/UX Designer Intern at <strong>UniEvent (EventFlow)</strong> &amp; Assistant Head of Operations at <strong>Assemble</strong>.
              </p>
              <p className="cv-links">
                <a href="mailto:varun.sehgal02@gmail.com">Email</a>
                <a href="https://github.com/varunsehgal05" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/varunsehgal02" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://varunsehgal.runs-on.dev" target="_blank" rel="noopener noreferrer">Portfolio</a>
              </p>
            </div>

            {/* Right side: Sticky note + Polaroid photo */}
            <div className={`cv-side ${isBuilding && buildStage < 2 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              <aside className="cv-note" aria-label="What I'm working on now">
                <p className="cv-note-head">Now: AI Interview &amp; EventFlow</p>
                <p>
                  Architecting multi-token design systems in Figma and translating them with sub-millisecond fidelity into Next.js &amp; Tailwind components.
                </p>
              </aside>

              <div className="cv-polaroid">
                <img
                  src="/varun.jpg"
                  alt="Varun Sehgal"
                  onError={(e) => { e.currentTarget.src = '/profile/varun.jpg'; }}
                />
                <span>Varun Sehgal, 2026 →</span>
              </div>
            </div>

            {/* In Numbers Stats Row (4 Wob-Pills) */}
            <ul className={`cv-stats ${isBuilding && buildStage < 3 ? 'cv-item-hidden' : 'cv-item-visible'}`} aria-label="In numbers">
              <li className="cv-stat">
                <strong>6+</strong>
                <span>industry &amp; SaaS projects shipped</span>
              </li>
              <li className="cv-stat">
                <strong>200+</strong>
                <span>hackers organized at CodeSrijan</span>
              </li>
              <li className="cv-stat">
                <strong>🏆 1st</strong>
                <span>Place Winner at HACKeThor (Unstop)</span>
              </li>
              <li className="cv-stat">
                <strong>8.5</strong>
                <span>CGPA in B.Tech CSE at JUET</span>
              </li>
            </ul>
          </section>

          {/* SECTION 2: WHAT I WORK ON */}
          <section className={`cv-section ${isBuilding && buildStage < 4 ? 'cv-item-hidden' : 'cv-item-visible'}`} aria-labelledby="cv-work-on">
            <h2 id="cv-work-on" className="cv-section-title">What I work on</h2>
            <div className="cv-threads">
              <article className="cv-thread cv-thread-0">
                <h3>Product Design &amp; Systems</h3>
                <p>
                  I build coherent, accessible token hierarchies from zero. Defining spacing scales, color palettes in OKLCH, typography rules, and micro-interactions that scale across web and mobile.
                </p>
              </article>
              <article className="cv-thread cv-thread-1">
                <h3>Tactile Hi-Fi Prototyping</h3>
                <p>
                  Moving beyond static wireframes: crafting interactive state machines, physics-based springs, and clickable high-fidelity flows in Figma, Framer, and ProtoPie.
                </p>
              </article>
              <article className="cv-thread cv-thread-2">
                <h3>Design Engineering</h3>
                <p>
                  Zero-friction handoff: transforming Figma variables and layouts into executable React, Next.js, and Tailwind CSS components with 60fps animations.
                </p>
              </article>
            </div>
          </section>

          {/* SECTION 3: WHERE I'VE WORKED (TIMELINE) & SECTION 4: STUDY */}
          <div className={`${isBuilding && buildStage < 5 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
            <section className="cv-section" aria-labelledby="cv-work">
              <h2 id="cv-work" className="cv-section-title">Where I've worked</h2>
              <ol className="cv-timeline">
                <li className="cv-job">
                  <p className="cv-job-head">
                    <strong>UI/UX Designer Intern</strong>, UniEvent (EventFlow)
                  </p>
                  <p className="cv-job-meta">Sep 2024 — Nov 2024 • 6 Mos, Bengaluru, Karnataka, India (Remote)</p>
                  <ul>
                    <li>Designed campus event ticketing platform (EventFlow) from initial wireframes to high-fidelity clickable prototype.</li>
                    <li>Slashed transaction drop-off by 30% across a 4-step booking workflow across 50+ reusable component variants.</li>
                  </ul>
                </li>

                <li className="cv-job">
                  <p className="cv-job-head">
                    <strong>Assistant Head of Operations / UI/UX Intern</strong>, Assemble
                  </p>
                  <p className="cv-job-meta">Aug 2024 — Jan 2025 • 6 Mos, Remote</p>
                  <ul>
                    <li>Designed collaborative creator workspace tools and interaction prototypes in Figma.</li>
                    <li>Coordinated sprint operations and interface evaluations for multi-team hackathon competitions.</li>
                  </ul>
                </li>

                <li className="cv-job">
                  <p className="cv-job-head">
                    <strong>UI/UX Designer Intern</strong>, Knaptix Ventures
                  </p>
                  <p className="cv-job-meta">Jun 2024 — Aug 2024 • 3 Mos, Remote</p>
                  <ul>
                    <li>Delivered brand identities and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="cv-section" aria-labelledby="cv-study">
              <h2 id="cv-study" className="cv-section-title">Study, and the rest</h2>
              <div className="cv-two">
                <ul className="cv-plain">
                  <li className="cv-entry">
                    <strong>B.Tech in Computer Science &amp; Engineering</strong>
                    <span>Jaypee University of Engineering &amp; Technology (JUET), Guna</span>
                    <span className="cv-soft">2023 — 2027 • CGPA 8.5</span>
                  </li>
                  <li className="cv-entry">
                    <strong>Senior Secondary (Class XII)</strong>
                    <span>Central Board of Secondary Education</span>
                    <span className="cv-soft">PCM &amp; Computer Science</span>
                  </li>
                </ul>

                <ul className="cv-plain">
                  <li className="cv-entry">
                    <strong>🏆 HACKeThor Winner</strong>
                    <span>1st Place in National Level Hackathon organized by Unstop out of 500+ participants.</span>
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

          {/* SECTION 5: THINGS I'VE MADE */}
          <section className={`cv-section ${isBuilding && buildStage < 6 ? 'cv-item-hidden' : 'cv-item-visible'}`} aria-labelledby="cv-made">
            <h2 id="cv-made" className="cv-section-title">Things I've made</h2>
            <ul className="cv-made">
              {/* Big Featured Card: CodeSrijan */}
              <li className="cv-made-big">
                <a href="https://codesrijan-nine.vercel.app/" target="_blank" rel="noopener noreferrer" className="cv-made-card">
                  <div className="cv-cover-box" style={{ background: '#090d16', border: '2px solid #2b2b2b' }}>
                    <div style={{ textAlign: 'center', padding: '24px' }}>
                      <span style={{ fontSize: '32px' }}>🚀</span>
                      <div style={{ color: '#67e8f9', fontWeight: '800', marginTop: '6px' }}>CodeSrijan Ecosystem</div>
                      <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px' }}>200+ Hackers • 72h Sprint • Live Evaluation</div>
                    </div>
                  </div>
                  <div>
                    <strong>CodeSrijan Hackathon Portal</strong>
                    <span>Full-stack live hackathon platform designed for Jaypee University. Features team matchmaking, rubric evaluation, and real-time announcements.</span>
                    <div className="cv-project-tags">
                      <span className="cv-tag vibecoded">⚡ Vibecoded</span>
                      <span className="cv-tag figma">❖ Figma</span>
                      <span className="cv-tag next">Next.js</span>
                      <span className="cv-tag live">Vercel Live</span>
                    </div>
                  </div>
                </a>
              </li>

              {/* Card 2: EventFlow */}
              <li>
                <div className="cv-made-card">
                  <div className="cv-cover-box" style={{ background: '#1c1917' }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '24px' }}>🎟️</span>
                      <div style={{ color: '#f59e0b', fontSize: '11px', fontWeight: '800', marginTop: '4px' }}>EventFlow</div>
                    </div>
                  </div>
                  <strong>EventFlow Ticketing</strong>
                  <span>Campus event discovery &amp; instant booking platform with 30% reduced drop-off.</span>
                  <div className="cv-project-tags">
                    <span className="cv-tag figma">❖ Figma</span>
                    <span className="cv-tag saas">Design System</span>
                    <span className="cv-tag">SaaS Checkout</span>
                  </div>
                </div>
              </li>

              {/* Card 3: AI Interview */}
              <li>
                <div className="cv-made-card">
                  <div className="cv-cover-box" style={{ background: '#0b1329' }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '24px' }}>🤖</span>
                      <div style={{ color: '#38bdf8', fontSize: '11px', fontWeight: '800', marginTop: '4px' }}>AI Interview</div>
                    </div>
                  </div>
                  <strong>AI Interview Studio</strong>
                  <span>Interactive question generator and audio mock-interview coach UI in Figma.</span>
                  <div className="cv-project-tags">
                    <span className="cv-tag vibecoded">⚡ Vibecoded</span>
                    <span className="cv-tag figma">❖ Figma</span>
                    <span className="cv-tag ai">AI UX</span>
                  </div>
                </div>
              </li>

              {/* Card 4: Expensify */}
              <li>
                <div className="cv-made-card">
                  <div className="cv-cover-box" style={{ background: '#18181b' }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '24px' }}>💳</span>
                      <div style={{ color: '#10b981', fontSize: '11px', fontWeight: '800', marginTop: '4px' }}>Expensify</div>
                    </div>
                  </div>
                  <strong>Expensify Budget</strong>
                  <span>Mobile personal finance app prototype with gesture-driven expense tagging.</span>
                  <div className="cv-project-tags">
                    <span className="cv-tag figma">❖ Figma</span>
                    <span className="cv-tag fintech">Fintech</span>
                    <span className="cv-tag">Mobile UX</span>
                  </div>
                </div>
              </li>

              {/* Card 5: Movie Tickets */}
              <li>
                <div className="cv-made-card">
                  <div className="cv-cover-box" style={{ background: '#26122c' }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '24px' }}>🎬</span>
                      <div style={{ color: '#f43f5e', fontSize: '11px', fontWeight: '800', marginTop: '4px' }}>Movie Booking</div>
                    </div>
                  </div>
                  <strong>Movie Tickets App</strong>
                  <span>Dynamic seat-selection matrix and trailer preview interaction flow.</span>
                  <div className="cv-project-tags">
                    <span className="cv-tag figma">❖ Figma</span>
                    <span className="cv-tag">Interactive Proto</span>
                  </div>
                </div>
              </li>

              {/* Card 6: SaaS Landing */}
              <li>
                <div className="cv-made-card">
                  <div className="cv-cover-box" style={{ background: '#111827' }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '24px' }}>⚡</span>
                      <div style={{ color: '#a855f7', fontSize: '11px', fontWeight: '800', marginTop: '4px' }}>SaaS Conversion</div>
                    </div>
                  </div>
                  <strong>SaaS Landing Pages</strong>
                  <span>High-converting responsive landing pages built for 10+ international tech startups.</span>
                  <div className="cv-project-tags">
                    <span className="cv-tag vibecoded">⚡ Vibecoded</span>
                    <span className="cv-tag figma">❖ Figma</span>
                    <span className="cv-tag saas">Conversion</span>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          {/* SECTION 6: SAY HELLO */}
          <section className={`cv-section cv-contact ${isBuilding && buildStage < 7 ? 'cv-item-hidden' : 'cv-item-visible'}`} aria-labelledby="cv-contact">
            <h2 id="cv-contact" className="cv-section-title">Say hello</h2>
            <p>For product design roles, design systems, or collaboration, write to me:</p>
            <p className="cv-email-line">
              <a className="cv-email" href="mailto:varun.sehgal02@gmail.com">varun.sehgal02@gmail.com</a>
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

        {/* FOOTER */}
        <footer className="cv-footer">
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
