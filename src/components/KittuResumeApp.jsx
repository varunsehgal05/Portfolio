import React, { useState, useEffect, useRef } from 'react';
import './KittuResume.css';

// Sound synthesizer for tactile typing clicks, drop thumps, and completion chime
class ResumeSoundSynth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playType(freq = 360) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() * 40 - 20), this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
    } catch (e) {}
  }

  playThump(freq = 200) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch (e) {}
  }

  playSnap(freq = 680) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playChime() {
    try {
      this.init();
      if (!this.ctx) return;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.08 + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.08);
        osc.stop(this.ctx.currentTime + i * 0.08 + 0.45);
      });
    } catch (e) {}
  }
}

const resumeSound = new ResumeSoundSynth();

const KittuResumeApp = ({ onBack, onTriggerSwarm }) => {
  const [copied, setCopied] = useState(false);
  const [isBuilding, setIsBuilding] = useState(true);
  const [activeCursors, setActiveCursors] = useState([]);
  const [activeSelection, setActiveSelection] = useState(null);
  const [activeGuides, setActiveGuides] = useState([]);
  const [buildStep, setBuildStep] = useState(0); // 0 = start, 1 = hero, 2 = photo, 3 = stats, 4 = experience, 5 = ready
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

  // Replay the build animation: 1 or 2 cursors at a time at calm, deliberate speed (like kittu.pro)
  const replayBuild = () => {
    clearTimeouts();
    setIsBuilding(true);
    setBuildStep(0);
    setActiveCursors([]);
    setActiveSelection(null);
    setActiveGuides([]);

    const schedule = (fn, delay) => {
      const id = setTimeout(fn, delay);
      buildTimeoutRef.current.push(id);
    };

    // Step 1: Type cursor enters and types the title (0s - 1.8s)
    schedule(() => {
      setBuildStep(1);
      resumeSound.playType(380);
      setActiveCursors([
        {
          id: 'type',
          name: 'Type',
          color: '#1ABCFE',
          x: 240,
          y: 110,
          tool: 'T Text',
          chat: 'morning! drafting Varun\'s resume',
          isTyping: true,
          action: 'Typing Headline'
        }
      ]);
      setActiveSelection({ x: 30, y: 50, w: 560, h: 90, label: 'Hero Name • [clamp(3.8rem, 8vw)]' });
    }, 150);

    // Step 2: Layout joins in, framing Polaroid photo & sticky note (1.8s - 3.8s)
    schedule(() => {
      setBuildStep(2);
      resumeSound.playSnap(680);
      setActiveCursors([
        {
          id: 'type',
          name: 'Type',
          color: '#1ABCFE',
          x: 480,
          y: 200,
          tool: 'T Text',
          chat: 'headline looking clean',
          isTyping: true,
          action: 'Writing Lede'
        },
        {
          id: 'layout',
          name: 'Layout',
          color: '#FF7262',
          x: 780,
          y: 240,
          tool: 'R Rectangle',
          chat: 'on it! framing sticky note & photo',
          action: 'Aligning Polaroid'
        }
      ]);
      setActiveSelection({ x: 730, y: 130, w: 270, h: 320, label: 'Polaroid & Sticky Note' });
      setActiveGuides([
        { type: 'v', x: 730, y1: 70, y2: 480, label: 'X: Right Column (730px)' },
        { type: 'h', x1: 30, x2: 1010, y: 240, label: 'Center Alignment' }
      ]);
    }, 1800);

    // Step 3: Reviewer 2 stamps 4 stats via ⌥ Option Duplicate (3.8s - 6.0s)
    schedule(() => {
      setBuildStep(3);
      resumeSound.playThump(220);
      setActiveCursors([
        {
          id: 'reviewer',
          name: 'Reviewer 2',
          color: '#0ACF83',
          x: 280,
          y: 430,
          tool: '⌥ Duplicate',
          chat: 'stamping 4 wob-pills (⌥ dup)',
          action: 'Duplicating Stats'
        },
        {
          id: 'spacing',
          name: 'Spacing',
          color: '#5F9E1A',
          x: 640,
          y: 430,
          tool: 'V Move',
          chat: 'equal 16px gaps verified',
          action: 'Smart Guides'
        }
      ]);
      setActiveSelection({ x: 30, y: 390, w: 970, h: 80, label: 'Stats Row • [4 × 1fr]' });
      setActiveGuides([
        { type: 'h', x1: 30, x2: 1010, y: 390, label: 'Stats Baseline' }
      ]);
    }, 3800);

    // Step 4: Type cursor moves to Experience Timeline, QA verifies LinkedIn dates (6.0s - 8.2s)
    schedule(() => {
      setBuildStep(4);
      resumeSound.playThump(250);
      setActiveCursors([
        {
          id: 'type',
          name: 'Type',
          color: '#1ABCFE',
          x: 320,
          y: 720,
          tool: 'T Text',
          chat: 'UniEvent & Assemble synced with LinkedIn',
          action: 'Timeline Roles'
        },
        {
          id: 'qa',
          name: 'QA',
          color: '#EC4899',
          x: 740,
          y: 740,
          tool: 'V Move',
          chat: 'dates match LinkedIn 100%',
          action: 'Verification'
        }
      ]);
      setActiveSelection({ x: 30, y: 640, w: 740, h: 320, label: 'Experience Timeline' });
      setActiveGuides([
        { type: 'v', x: 62, y1: 640, y2: 960, label: 'Timeline Vertical Line' }
      ]);
    }, 6000);

    // Step 5: Final celebration & handover (8.2s - 9.8s)
    schedule(() => {
      setBuildStep(5);
      resumeSound.playChime();
      setActiveCursors([
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 520,
          y: 480,
          tool: '✓ Complete',
          chat: '✨ Built live, by a crowd of cursors!',
          action: 'Ready!'
        }
      ]);
      setActiveSelection(null);
      setActiveGuides([]);
    }, 8200);

    // End build animation
    schedule(() => {
      setIsBuilding(false);
      setActiveCursors([]);
      setActiveSelection(null);
      setActiveGuides([]);
    }, 9800);
  };

  // Automatically start build animation on mount (just like kittu.pro/resume)
  useEffect(() => {
    replayBuild();
    return () => clearTimeouts();
  }, []);

  return (
    <div className="kittu-resume-artboard-box" ref={containerRef}>
      {/* Main Container with progressive reveal */}
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
                    fontFamily: 'var(--nf-hand), cursive',
                    fontSize: '13px',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    marginLeft: '14px',
                    marginTop: '-8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>{c.name}</span>
                  {c.tool && <span style={{ opacity: 0.9, fontSize: '10.5px', background: 'rgba(0,0,0,0.25)', padding: '1px 5px', borderRadius: '3px' }}>{c.tool}</span>}
                </span>

                {/* Chat Bubble */}
                {c.chat && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-36px',
                      left: '14px',
                      background: c.color,
                      color: '#ffffff',
                      fontFamily: 'var(--nf-sketch), cursive',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 10px',
                      borderRadius: '2px 12px 12px 12px',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                      pointerEvents: 'none'
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
          {/* SECTION 1: HERO HEADER */}
          <section className="cv-hero" aria-labelledby="cv-name">
            <div>
              <p className="cv-lede">Hello, I'm</p>
              <h1 id="cv-name" className="cv-name">
                Varun Sehgal
              </h1>

              <p className="cv-lede">
                <strong>Product designer</strong>, systems thinker &amp; builder. UI/UX Designer Intern at <strong>UniEvent (EventFlow)</strong> &amp; Assistant Head of Operations at <strong>Assemble</strong>.
              </p>

              <div className="cv-links-row">
                <a href="mailto:varun.sehgal02@gmail.com" className="cv-link-pill">
                  <span>varun.sehgal02@gmail.com</span>
                </a>
                <button type="button" onClick={copyEmail} className="cv-copy-btn">
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
                <a href="https://www.linkedin.com/in/varunsehgal02" target="_blank" rel="noopener noreferrer" className="cv-link-pill">
                  LinkedIn ↗
                </a>
                <a href="https://github.com/varunsehgal05" target="_blank" rel="noopener noreferrer" className="cv-link-pill">
                  GitHub ↗
                </a>
                <button
                  type="button"
                  onClick={replayBuild}
                  className="cv-copy-btn"
                  style={{ background: 'rgba(162, 89, 255, 0.15)', color: '#7c3aed', border: '1px solid rgba(162, 89, 255, 0.3)' }}
                  title="Replay crowd of cursors build"
                >
                  ↺ Replay Build
                </button>
              </div>
            </div>

            {/* Hero Right Column: Polaroid & Sticky Note */}
            <div className="cv-hero-aside">
              <div className="cv-note">
                <p>
                  <strong>Hey, I'm Varun!</strong>
                  <br />
                  I bridge the gap between high-fidelity Figma components and clean, production-ready code.
                </p>
              </div>

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
            <ul className="cv-stats" aria-label="In numbers">
              <li className="cv-stat">
                <strong>3+</strong>
                <span>Years Product Design Experience</span>
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
                <strong>2</strong>
                <span>National Hackathons (Winner &amp; Organizer)</span>
              </li>
            </ul>
          </section>

          {/* SECTION 2: WHAT I WORK ON */}
          <section className="cv-section" aria-labelledby="cv-work-on">
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
                <h3>Design Engineering &amp; Vibecoding</h3>
                <p>
                  Zero-friction handoff: transforming Figma variables and layouts into executable React, Next.js, and Tailwind CSS components with 60fps animations.
                </p>
              </article>
            </div>
          </section>

          {/* SECTION 3: WHERE I'VE WORKED (TIMELINE) */}
          <section className="cv-section" aria-labelledby="cv-work">
            <h2 id="cv-work" className="cv-section-title">Where I've worked</h2>
            <ol className="cv-timeline">
              <li className="cv-job">
                <p className="cv-job-head">
                  <strong>UI/UX Designer Intern</strong>, UniEvent (EventFlow)
                </p>
                <p className="cv-job-meta">Jun 2024 — Nov 2024 • 6 Mos, Bengaluru, Karnataka, India (Remote - Ended early Nov)</p>
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

          {/* SECTION 4: STUDY, AND THE REST */}
          <section className="cv-section" aria-labelledby="cv-study">
            <h2 id="cv-study" className="cv-section-title">Study, and the rest</h2>
            <div className="cv-two">
              <ul className="cv-plain">
                <li className="cv-entry">
                  <strong>B.Tech in Computer Science &amp; Engineering</strong>
                  <span>Jaypee University of Engineering &amp; Technology (JUET), Guna</span>
                  <span className="cv-soft">2023 — 2027</span>
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
                  <strong>🚀 CodeSrijan Organizer</strong>
                  <span>Lead UI/UX Designer and Frontend architect for 200+ hackathon participants across 50+ universities.</span>
                </li>
                <li className="cv-entry">
                  <strong>Core Toolkit</strong>
                  <span className="cv-soft">Figma, Framer, FigJam, ProtoPie, Webflow, React, Next.js, Tailwind CSS, TypeScript.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 5: THINGS I'VE MADE */}
          <section className="cv-section" aria-labelledby="cv-made">
            <h2 id="cv-made" className="cv-section-title">Things I've made</h2>
            <ul className="cv-made">
              {/* Big Featured Card: CodeSrijan (Vibecoded Site) */}
              <li className="cv-made-big">
                <a href="http://codesrijan-nine.vercel.app/" target="_blank" rel="noopener noreferrer" className="cv-made-card">
                  <div className="cv-cover-box" style={{ background: '#090d16', border: '2px solid #2b2b2b' }}>
                    <div style={{ textAlign: 'center', padding: '24px' }}>
                      <span style={{ fontSize: '32px' }}>⚡</span>
                      <div style={{ color: '#67e8f9', fontWeight: '800', marginTop: '6px' }}>CodeSrijan Hackathon Portal</div>
                      <div style={{ color: '#a7f3d0', fontSize: '11px', marginTop: '4px', fontWeight: '700' }}>⚡ Vibecoded Live Site • 200+ Hackers</div>
                    </div>
                  </div>
                  <div>
                    <strong>CodeSrijan Hackathon Portal (Vibecoded Live Site)</strong>
                    <span>Full-stack live hackathon platform vibecoded &amp; engineered by Varun Sehgal for Jaypee University. Features team matchmaking, rubric evaluation, and real-time announcements.</span>
                  </div>
                </a>
              </li>

              {/* Card 2: EventFlow */}
              <li>
                <a href="https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2&p=f&t=ucsh4jF84sBl50UA-0" target="_blank" rel="noopener noreferrer" className="cv-made-card">
                  <div className="cv-cover-box" style={{ background: '#1c1917', border: '2px solid #2b2b2b' }}>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <span style={{ fontSize: '28px' }}>🎟️</span>
                      <div style={{ color: '#fdba74', fontWeight: '800', marginTop: '4px' }}>EventFlow</div>
                      <div style={{ color: '#a8a29e', fontSize: '10.5px' }}>❖ Figma Design System</div>
                    </div>
                  </div>
                  <div>
                    <strong>EventFlow Experience Platform</strong>
                    <span>Campus ticketing flow with a 50+ token design system reducing checkout abandonment by 30%.</span>
                  </div>
                </a>
              </li>

              {/* Card 3: AI Interview Prep */}
              <li>
                <a href="https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1" target="_blank" rel="noopener noreferrer" className="cv-made-card">
                  <div className="cv-cover-box" style={{ background: '#0f172a', border: '2px solid #2b2b2b' }}>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <span style={{ fontSize: '28px' }}>🤖</span>
                      <div style={{ color: '#38bdf8', fontWeight: '800', marginTop: '4px' }}>AI Interview</div>
                      <div style={{ color: '#94a3b8', fontSize: '10.5px' }}>❖ Figma AI SaaS</div>
                    </div>
                  </div>
                  <div>
                    <strong>AI Interview Prep System</strong>
                    <span>Technical mock interview evaluation platform with real-time AI scoring and grading matrix.</span>
                  </div>
                </a>
              </li>

              {/* Card 4: Expensify */}
              <li>
                <a href="https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1" target="_blank" rel="noopener noreferrer" className="cv-made-card">
                  <div className="cv-cover-box" style={{ background: '#022c22', border: '2px solid #2b2b2b' }}>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <span style={{ fontSize: '28px' }}>💳</span>
                      <div style={{ color: '#34d399', fontWeight: '800', marginTop: '4px' }}>Expensify</div>
                      <div style={{ color: '#6ee7b7', fontSize: '10.5px' }}>❖ Figma Mobile FinTech</div>
                    </div>
                  </div>
                  <div>
                    <strong>Expensify Budget Tracker</strong>
                    <span>17+ mobile screens refined for rapid expense logging under 5 seconds with micro-interactions.</span>
                  </div>
                </a>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default KittuResumeApp;
