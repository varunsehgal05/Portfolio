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

    // 1. Smoothly scroll canvas/viewport back up to top ("drag me up")
    if (onScrollToTop) {
      onScrollToTop();
    }
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (containerRef.current) {
        let parent = containerRef.current.parentElement;
        while (parent) {
          if (parent.scrollTop > 0) {
            parent.scrollTo({ top: 0, behavior: 'smooth' });
          }
          parent = parent.parentElement;
        }
      }
    } catch (e) {
      // ignore
    }

    const schedule = (fn, delay) => {
      const id = setTimeout(fn, delay);
      buildTimeoutRef.current.push(id);
    };

    // Stage 0: Cursors enter at top of blank notebook (0ms - 500ms)
    schedule(() => {
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 60,
          y: 50,
          tool: 'R',
          chat: 'setting up notebook sheet...',
          action: 'Measuring Grid'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 180,
          y: 70,
          tool: 'T',
          chat: 'ready to draft header',
          action: 'Drafting Header'
        }
      ]);
      setActiveSelection({ x: 35, y: 70, w: 540, h: 90, label: '❖ Header • [Varun Sehgal]' });
    }, 60);

    // Stage 1: Reveal Name "Varun Sehgal" (500ms)
    schedule(() => {
      setBuildStage(1);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 35,
          y: 70,
          tool: 'R',
          chat: 'holding title bounds',
          action: 'Holding Frame'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 280,
          y: 85,
          tool: 'T',
          chat: 'typing Varun Sehgal',
          action: 'Typing Name'
        }
      ]);
      setActiveSelection({ x: 35, y: 70, w: 500, h: 80, label: '❖ Title • Varun Sehgal' });
    }, 500);

    // Stage 2: Reveal Lede & Links (1100ms)
    schedule(() => {
      setBuildStage(2);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 35,
          y: 160,
          tool: 'R',
          chat: 'expanding value prop frame',
          action: 'Holding Frame'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 420,
          y: 190,
          tool: 'T',
          chat: 'friction-free product experiences',
          action: 'Writing Lede'
        }
      ]);
      setActiveSelection({ x: 35, y: 160, w: 580, h: 140, label: '❖ Lede & Philosophy' });
    }, 1100);

    // Stage 3: Sticky Note "Now: AI Interview & EventFlow" (1700ms)
    schedule(() => {
      setBuildStage(3);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 740,
          y: 120,
          tool: 'R',
          chat: 'framing sticky note',
          action: 'Aligning Note'
        },
        {
          id: 'sarah',
          name: 'Sarah Lin',
          color: '#0ACF83',
          x: 840,
          y: 150,
          tool: '❖',
          chat: 'Now: AI Interview & EventFlow',
          action: 'Stamping Note'
        }
      ]);
      setActiveSelection({ x: 670, y: 110, w: 320, h: 140, label: '❖ Sticky Note • [Now]' });
      setActiveGuides([{ type: 'v', x: 670, y1: 80, y2: 480, label: 'Right Column (670px)' }]);
    }, 1700);

    // Stage 4: Polaroid Photo (2300ms)
    schedule(() => {
      setBuildStage(4);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 690,
          y: 310,
          tool: 'V',
          chat: 'photo drop shadow 12px',
          action: 'Holding Photo'
        },
        {
          id: 'sarah',
          name: 'Sarah Lin',
          color: '#0ACF83',
          x: 820,
          y: 440,
          tool: '❖',
          chat: 'Varun Sehgal, 2026 →',
          action: 'Stamping Polaroid'
        }
      ]);
      setActiveSelection({ x: 670, y: 270, w: 260, h: 260, label: '❖ Polaroid Photo' });
      setActiveGuides([]);
    }, 2300);

    // Stage 5: Stat 1 - "6+ SaaS Projects" (2900ms)
    schedule(() => {
      setBuildStage(5);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 50,
          y: 435,
          tool: 'R',
          chat: 'stamping stat 1 box',
          action: 'Stat Frame'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 140,
          y: 445,
          tool: 'T',
          chat: '6+ industry projects',
          action: 'Typing Stat 1'
        }
      ]);
      setActiveSelection({ x: 35, y: 425, w: 220, h: 80, label: '❖ Stat [1/4] • 6+ Projects' });
    }, 2900);

    // Stage 6: Stat 2 - "200+ Hackers" (3450ms)
    schedule(() => {
      setBuildStage(6);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 285,
          y: 435,
          tool: 'V',
          chat: 'measuring 16px gap',
          action: 'Gap Guide'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 380,
          y: 445,
          tool: 'T',
          chat: '200+ hackers',
          action: 'Typing Stat 2'
        }
      ]);
      setActiveSelection({ x: 275, y: 425, w: 220, h: 80, label: '❖ Stat [2/4] • 200+ Hackers' });
    }, 3450);

    // Stage 7: Stat 3 - "1st Winner" (4000ms)
    schedule(() => {
      setBuildStage(7);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 525,
          y: 435,
          tool: 'R',
          chat: 'stamping stat 3 box',
          action: 'Stat Frame'
        },
        {
          id: 'sarah',
          name: 'Sarah Lin',
          color: '#0ACF83',
          x: 610,
          y: 445,
          tool: '❖',
          chat: '🏆 1st at HACKeThor',
          action: 'Stamping Trophy'
        }
      ]);
      setActiveSelection({ x: 515, y: 425, w: 220, h: 80, label: '❖ Stat [3/4] • 🏆 1st Winner' });
    }, 4000);

    // Stage 8: Stat 4 - "8.5 CGPA" (4550ms)
    schedule(() => {
      setBuildStage(8);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 765,
          y: 435,
          tool: 'V',
          chat: 'aligning baseline',
          action: 'Baseline'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 850,
          y: 445,
          tool: 'T',
          chat: '8.5 CGPA JUET',
          action: 'Typing Stat 4'
        }
      ]);
      setActiveSelection({ x: 755, y: 425, w: 220, h: 80, label: '❖ Stat [4/4] • 8.5 CGPA' });
    }, 4550);

    // Stage 9: What I Work On - Card 1 (5150ms)
    schedule(() => {
      setBuildStage(9);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 80,
          y: 575,
          tool: 'R',
          chat: 'framing sticky card 1',
          action: 'Card Frame'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 200,
          y: 610,
          tool: 'T',
          chat: 'Product Design & Systems',
          action: 'Writing Thread 1'
        }
      ]);
      setActiveSelection({ x: 35, y: 550, w: 310, h: 170, label: '❖ Thread [1/3] • Design Systems' });
    }, 5150);

    // Stage 10: What I Work On - Card 2 (5750ms)
    schedule(() => {
      setBuildStage(10);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 390,
          y: 575,
          tool: 'R',
          chat: 'framing sticky card 2',
          action: 'Card Frame'
        },
        {
          id: 'sarah',
          name: 'Sarah Lin',
          color: '#0ACF83',
          x: 500,
          y: 610,
          tool: '❖',
          chat: 'Tactile Hi-Fi Prototyping',
          action: 'Dropping Note'
        }
      ]);
      setActiveSelection({ x: 360, y: 550, w: 310, h: 170, label: '❖ Thread [2/3] • Prototyping' });
    }, 5750);

    // Stage 11: What I Work On - Card 3 (6350ms)
    schedule(() => {
      setBuildStage(11);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 700,
          y: 575,
          tool: 'R',
          chat: 'framing sticky card 3',
          action: 'Card Frame'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 820,
          y: 610,
          tool: 'T',
          chat: 'Design Engineering handoff',
          action: 'Writing Thread 3'
        }
      ]);
      setActiveSelection({ x: 685, y: 550, w: 310, h: 170, label: '❖ Thread [3/3] • Engineering' });
    }, 6350);

    // Stage 12: Timeline & Education (7000ms)
    schedule(() => {
      setBuildStage(12);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 50,
          y: 880,
          tool: 'V',
          chat: 'ruling timeline spine',
          action: 'Spine Baseline'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 320,
          y: 920,
          tool: 'T',
          chat: 'UniEvent & Assemble synced',
          action: 'Syncing Roles'
        }
      ]);
      setActiveSelection({ x: 35, y: 850, w: 960, h: 360, label: '❖ Experience & Education' });
    }, 7000);

    // Stage 13: Project 1 - CodeSrijan (7650ms)
    schedule(() => {
      setBuildStage(13);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 100,
          y: 1390,
          tool: 'R',
          chat: 'framing hero card',
          action: 'Hero Frame'
        },
        {
          id: 'sarah',
          name: 'Sarah Lin',
          color: '#0ACF83',
          x: 480,
          y: 1450,
          tool: '❖',
          chat: 'tagging ⚡ Vibecoded',
          action: 'Dropping Tags'
        }
      ]);
      setActiveSelection({ x: 35, y: 1360, w: 960, h: 220, label: '❖ Project [1/6] • CodeSrijan' });
    }, 7650);

    // Stage 14: Project 2 - EventFlow (8250ms)
    schedule(() => {
      setBuildStage(14);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 80,
          y: 1640,
          tool: 'R',
          chat: 'framing EventFlow card',
          action: 'Card Frame'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 180,
          y: 1700,
          tool: 'T',
          chat: 'EventFlow Ticketing',
          action: 'Stamping Tags'
        }
      ]);
      setActiveSelection({ x: 35, y: 1620, w: 310, h: 220, label: '❖ Project [2/6] • EventFlow' });
    }, 8250);

    // Stage 15: Project 3 - AI Interview (8800ms)
    schedule(() => {
      setBuildStage(15);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 390,
          y: 1640,
          tool: 'R',
          chat: 'framing AI Interview card',
          action: 'Card Frame'
        },
        {
          id: 'sarah',
          name: 'Sarah Lin',
          color: '#0ACF83',
          x: 500,
          y: 1700,
          tool: '❖',
          chat: 'Audio Mock Coach UI',
          action: 'Stamping Tags'
        }
      ]);
      setActiveSelection({ x: 360, y: 1620, w: 310, h: 220, label: '❖ Project [3/6] • AI Interview' });
    }, 8800);

    // Stage 16: Project 4 - Expensify (9350ms)
    schedule(() => {
      setBuildStage(16);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 700,
          y: 1640,
          tool: 'R',
          chat: 'framing Expensify card',
          action: 'Card Frame'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 820,
          y: 1700,
          tool: 'T',
          chat: 'Expensify Budget',
          action: 'Stamping Tags'
        }
      ]);
      setActiveSelection({ x: 685, y: 1620, w: 310, h: 220, label: '❖ Project [4/6] • Expensify' });
    }, 9350);

    // Stage 17: Project 5 - Movie Tickets (9900ms)
    schedule(() => {
      setBuildStage(17);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 80,
          y: 1890,
          tool: 'R',
          chat: 'framing Movie card',
          action: 'Card Frame'
        },
        {
          id: 'sarah',
          name: 'Sarah Lin',
          color: '#0ACF83',
          x: 180,
          y: 1950,
          tool: '❖',
          chat: 'Seat Selection Matrix',
          action: 'Stamping Tags'
        }
      ]);
      setActiveSelection({ x: 35, y: 1870, w: 310, h: 220, label: '❖ Project [5/6] • Movie Tickets' });
    }, 9900);

    // Stage 18: Project 6 - SaaS Landing Pages (10450ms)
    schedule(() => {
      setBuildStage(18);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 390,
          y: 1890,
          tool: 'R',
          chat: 'framing SaaS Landing card',
          action: 'Card Frame'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 500,
          y: 1950,
          tool: 'T',
          chat: '10+ Startups Shipped',
          action: 'Stamping Tags'
        }
      ]);
      setActiveSelection({ x: 360, y: 1870, w: 310, h: 220, label: '❖ Project [6/6] • SaaS Landing' });
    }, 10450);

    // Stage 19: Say Hello & Contact (11000ms)
    schedule(() => {
      setBuildStage(19);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 80,
          y: 2150,
          tool: 'R',
          chat: 'holding contact frame',
          action: 'Contact Frame'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 320,
          y: 2200,
          tool: 'T',
          chat: 'varun.sehgal02@gmail.com',
          action: 'Writing Email'
        }
      ]);
      setActiveSelection({ x: 35, y: 2120, w: 960, h: 180, label: '❖ Say Hello • Contact' });
    }, 11000);

    // Stage 20: Celebration & Completion (11650ms)
    schedule(() => {
      setBuildStage(20);
      setActiveCursors([
        {
          id: 'elena',
          name: 'Elena Rostova',
          color: '#F59E0B',
          x: 420,
          y: 2320,
          tool: '✓',
          chat: '✨ All 18 components stamped!',
          action: 'Ready!'
        },
        {
          id: 'varun',
          name: 'Varun Sehgal',
          color: '#A259FF',
          x: 560,
          y: 2320,
          tool: '✓',
          chat: '🚀 Notebook live and interactive!',
          action: 'Complete!'
        }
      ]);
      setActiveSelection(null);
    }, 11650);

    // Stage 21: Done (12600ms)
    schedule(() => {
      setIsBuilding(false);
      setBuildStage(21);
      setActiveCursors([]);
      setActiveSelection(null);
      setActiveGuides([]);
    }, 12600);
  };

  const skipBuild = () => {
    clearTimeouts();
    setIsBuilding(false);
    setBuildStage(21);
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
            <div className="cv-hero-text">
              <h1 className={`cv-name ${isBuilding && buildStage < 1 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                Varun Sehgal
              </h1>
              <div className={`${isBuilding && buildStage < 2 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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
            </div>

            {/* Right side: Sticky note (Stage 3) + Polaroid photo (Stage 4) */}
            <div className="cv-side">
              <aside
                className={`cv-note ${isBuilding && buildStage < 3 ? 'cv-item-hidden' : 'cv-item-visible'}`}
                aria-label="What I'm working on now"
              >
                <p className="cv-note-head">Now: AI Interview &amp; EventFlow</p>
                <p>
                  Architecting multi-token design systems in Figma and translating them with sub-millisecond fidelity into Next.js &amp; Tailwind components.
                </p>
              </aside>

              <div className={`cv-polaroid ${isBuilding && buildStage < 4 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <img
                  src="/varun.jpg"
                  alt="Varun Sehgal"
                  onError={(e) => { e.currentTarget.src = '/profile/varun.jpg'; }}
                />
                <span>Varun Sehgal, 2026 →</span>
              </div>
            </div>

            {/* In Numbers Stats Row (4 Wob-Pills) - Sequentially stamped one by one (Stages 5, 6, 7, 8) */}
            <ul className="cv-stats" aria-label="In numbers">
              <li className={`cv-stat ${isBuilding && buildStage < 5 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <strong>6+</strong>
                <span>industry &amp; SaaS projects shipped</span>
              </li>
              <li className={`cv-stat ${isBuilding && buildStage < 6 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <strong>200+</strong>
                <span>hackers organized at CodeSrijan</span>
              </li>
              <li className={`cv-stat ${isBuilding && buildStage < 7 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <strong>🏆 1st</strong>
                <span>Place Winner at HACKeThor (Unstop)</span>
              </li>
              <li className={`cv-stat ${isBuilding && buildStage < 8 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <strong>8.5</strong>
                <span>CGPA in B.Tech CSE at JUET</span>
              </li>
            </ul>
          </section>

          {/* SECTION 2: WHAT I WORK ON (Stages 9, 10, 11) */}
          <section className="cv-section" aria-labelledby="cv-work-on">
            <h2 id="cv-work-on" className={`cv-section-title ${isBuilding && buildStage < 9 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              What I work on
            </h2>
            <div className="cv-threads">
              <article className={`cv-thread cv-thread-0 ${isBuilding && buildStage < 9 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <h3>Product Design &amp; Systems</h3>
                <p>
                  I build coherent, accessible token hierarchies from zero. Defining spacing scales, color palettes in OKLCH, typography rules, and micro-interactions that scale across web and mobile.
                </p>
              </article>
              <article className={`cv-thread cv-thread-1 ${isBuilding && buildStage < 10 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <h3>Tactile Hi-Fi Prototyping</h3>
                <p>
                  Moving beyond static wireframes: crafting interactive state machines, physics-based springs, and clickable high-fidelity flows in Figma, Framer, and ProtoPie.
                </p>
              </article>
              <article className={`cv-thread cv-thread-2 ${isBuilding && buildStage < 11 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
                <h3>Design Engineering</h3>
                <p>
                  Zero-friction handoff: transforming Figma variables and layouts into executable React, Next.js, and Tailwind CSS components with 60fps animations.
                </p>
              </article>
            </div>
          </section>

          {/* SECTION 3: WHERE I'VE WORKED & SECTION 4: STUDY (Stage 12) */}
          <div className={`cv-timeline-wrap ${isBuilding && buildStage < 12 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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

          {/* SECTION 5: THINGS I'VE MADE - Sequentially stamped one by one (Stages 13, 14, 15, 16, 17, 18) */}
          <section className="cv-section" aria-labelledby="cv-made">
            <h2 id="cv-made" className={`cv-section-title ${isBuilding && buildStage < 13 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
              Things I've made
            </h2>
            <ul className="cv-made">
              {/* Big Featured Card: CodeSrijan (Stage 13) */}
              <li className={`cv-made-big ${isBuilding && buildStage < 13 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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

              {/* Card 2: EventFlow (Stage 14) */}
              <li className={`${isBuilding && buildStage < 14 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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

              {/* Card 3: AI Interview (Stage 15) */}
              <li className={`${isBuilding && buildStage < 15 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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

              {/* Card 4: Expensify (Stage 16) */}
              <li className={`${isBuilding && buildStage < 16 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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

              {/* Card 5: Movie Tickets (Stage 17) */}
              <li className={`${isBuilding && buildStage < 17 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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

              {/* Card 6: SaaS Landing (Stage 18) */}
              <li className={`${isBuilding && buildStage < 18 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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

          {/* SECTION 6: SAY HELLO (Stage 19) */}
          <section className={`cv-section cv-contact ${isBuilding && buildStage < 19 ? 'cv-item-hidden' : 'cv-item-visible'}`} aria-labelledby="cv-contact">
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

        {/* FOOTER (Stage 20) */}
        <footer className={`cv-footer ${isBuilding && buildStage < 20 ? 'cv-item-hidden' : 'cv-item-visible'}`}>
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
