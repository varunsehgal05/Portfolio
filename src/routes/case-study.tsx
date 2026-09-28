import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ZoomWidget } from "../components/ZoomWidget";
export const Route = createFileRoute('/case-study')({
  head: () => ({
    meta: [
      { title: 'Case Study: Expense App - Varun Sehgal' },
      { name: "description", content: 'A deep dive into the design process behind a modern expense tracking app.' },
      { property: "og:title", content: 'Case Study: Expense App - Varun Sehgal' },
      { property: "og:description", content: 'A deep dive into the design process behind a modern expense tracking app.' },
    ],
  }),
  component: CaseStudy,
});

function CaseStudy() {
  const canvasAreaRef = useRef<HTMLElement | null>(null);
  const canvasContentRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startY: 0, translateX: 0, translateY: 0 });
  const [currentScale, setCurrentScale] = useState(0.6);

  const onMouseDown = (e: React.MouseEvent) => {
    // Only drag if clicking the background or the container
    setIsDragging(true);
    dragState.current.startX = e.clientX - dragState.current.translateX;
    dragState.current.startY = e.clientY - dragState.current.translateY;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    let translateX = e.clientX - dragState.current.startX;
    let translateY = e.clientY - dragState.current.startY;
    dragState.current.translateX = translateX;
    dragState.current.translateY = translateY;

    if (canvasContentRef.current) {
      canvasContentRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    }
  };

  const onMouseUp = () => setIsDragging(false);

  return (
    <div className="bg-background text-on-surface h-screen w-screen overflow-hidden font-body-md selection:bg-primary-container selection:text-on-primary-container">
      <header className="bg-surface dark:bg-surface-dim font-label-md text-label-md docked full-width top-0 border-b border-outline-variant/10 backdrop-blur-3xl flat no shadows fixed top-0 w-full z-50 flex justify-between items-center px-4 h-12">
        <div className="flex items-center gap-6">
          <span className="font-headline-md text-headline-md font-bold text-on-surface dark:text-on-surface">StudioPro</span>

        </div>
        <div className="flex items-center gap-4">
          <button className="text-primary dark:text-primary hover:bg-surface-variant/20 transition-colors Active: scale-95 duration-150 p-1 rounded">
            <span className="material-symbols-outlined text-lg">share</span>
          </button>
          <button className="text-primary dark:text-primary hover:bg-surface-variant/20 transition-colors Active: scale-95 duration-150 p-1 rounded">
            <span className="material-symbols-outlined text-lg">play_arrow</span>
          </button>
          <button className="text-primary dark:text-primary hover:bg-surface-variant/20 transition-colors Active: scale-95 duration-150 p-1 rounded">
            <span className="material-symbols-outlined text-lg">cloud_done</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-outline-variant/30 bg-zinc-900">
            <img alt="Varun Sehgal avatar" className="w-full h-full object-cover object-top" src="/varun.jpg" onError={(e) => { (e.target as HTMLImageElement).src = '/varun.jpeg'; }} />
          </div>
        </div>
      </header>

      <aside className="bg-surface-container-low/80 dark:bg-surface-container-low/80 font-label-md text-label-md docked left-0 h-full w-64 border-r border-outline-variant/10 backdrop-blur-xl flat no shadows fixed left-0 top-12 bottom-0 w-64 z-40 flex flex-col py-4">
        <div className="px-4 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-surface-variant flex items-center justify-center border border-outline-variant/20">
            <img alt="Project Icon" className="w-full h-full object-cover rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAPWCoP5dPrlGc0rC34_3TvfJ2U86_IR6XIFPQ4-65hKjB7dK5Mq-YfEEyKStlImiUIm65uGDio94FKOtPBSwZhqmpl9tjO4GzRD5FSG-l2JQmv0szrQazem0t6Qd6de3MLawM5gqZCLY_wtXEjabXeXmEEuR-kKMhAsV4w3020VYbpBn7b7pwU4hD4ImEoj9to1OVV4erfKslFrb3CW_x_KusVhg8Nkk-y3w7ksbdOAIeIwTFu2YA" />
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface text-sm">Creative Workspace</h2>
            <p className="text-on-surface-variant font-caption text-caption">V1.0.4 - Draft</p>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-1 px-2">
          <a className="flex items-center gap-3 py-2 text-tertiary font-bold border-l-2 border-tertiary pl-2 bg-surface-container-highest/20 hover:text-on-surface hover:bg-surface-container-high transition-all Active: translate-x-1 duration-200" href="#">
            <span className="material-symbols-outlined text-lg">layers</span>
            Layers
          </a>
          <a className="flex items-center gap-3 py-2 text-on-surface-variant px-2 hover:text-on-surface hover:bg-surface-container-high transition-all" href="#">
            <span className="material-symbols-outlined text-lg">category</span>
            Assets
          </a>
          <a className="flex items-center gap-3 py-2 text-on-surface-variant px-2 hover:text-on-surface hover:bg-surface-container-high transition-all" href="#">
            <span className="material-symbols-outlined text-lg">description</span>
            Pages
          </a>
          <a className="flex items-center gap-3 py-2 text-on-surface-variant px-2 hover:text-on-surface hover:bg-surface-container-high transition-all" href="#">
            <span className="material-symbols-outlined text-lg">settings</span>
            Settings
          </a>
        </nav>
        <div className="px-4 mt-auto">
          <button className="w-full bg-primary text-on-primary-container font-label-md text-label-md py-2 rounded hover:scale-[1.02] transition-transform duration-300 ease-out glow-hover">
            Publish
          </button>
        </div>
      </aside>

      <aside className="bg-surface-container-low/80 dark:bg-surface-container-low/80 font-label-md text-label-md docked right-0 h-full w-72 border-l border-outline-variant/10 backdrop-blur-xl flat no shadows fixed right-0 top-12 bottom-0 w-72 z-40 flex flex-col py-4">
        <div className="flex border-b border-outline-variant/10 px-2 mb-4">
          <button className="flex-1 py-2 text-secondary font-bold border-b-2 border-secondary pb-1 text-center hover:text-on-surface transition-colors Active: scale-98 duration-100">Design</button>
          <button className="flex-1 py-2 text-on-surface-variant text-center hover:text-on-surface transition-colors">Prototype</button>
          <button className="flex-1 py-2 text-on-surface-variant text-center hover:text-on-surface transition-colors">Inspect</button>
        </div>
        <div className="px-4 flex-1 overflow-y-auto custom-scrollbar">
          <div className="mb-6 pb-4 border-b border-outline-variant/10">
            <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider mb-2">Selection</p>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">web</span>
              <span className="font-body-md text-body-md">Case Study - Expense App</span>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">Layout</p>
              <span className="material-symbols-outlined text-on-surface-variant text-sm cursor-pointer hover:text-on-surface">add</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-surface-container p-2 rounded border border-outline-variant/20">
                <span className="font-caption text-caption text-on-surface-variant block mb-1">W</span>
                <input className="w-full bg-transparent border-none p-0 text-on-surface font-label-md focus:ring-0" type="text" defaultValue="3840" />
              </div>
              <div className="bg-surface-container p-2 rounded border border-outline-variant/20">
                <span className="font-caption text-caption text-on-surface-variant block mb-1">H</span>
                <input className="w-full bg-transparent border-none p-0 text-on-surface font-label-md focus:ring-0" type="text" defaultValue="2160" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">Background</p>
            </div>
            <div className="flex items-center gap-2 bg-surface-container p-2 rounded border border-outline-variant/20">
              <div className="w-4 h-4 rounded bg-[#121414] border border-outline-variant"></div>
              <input className="w-full bg-transparent border-none p-0 text-on-surface font-label-md focus:ring-0 uppercase" type="text" defaultValue="121414" />
              <span className="text-on-surface-variant font-caption">100%</span>
            </div>
          </div>
        </div>
      </aside>

      <main
        className="absolute inset-0 pt-12 pl-64 pr-72 overflow-hidden bg-background cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div ref={canvasAreaRef as any} className="w-full h-full pan-container canvas-grid flex items-center justify-center relative" id="canvas-pan-area">

          <div ref={canvasContentRef} className="relative transition-transform duration-75 flex justify-center items-start origin-top-left pt-24" id="artboard" style={{ transform: `translate(${dragState.current.translateX}px, ${dragState.current.translateY}px) scale(${currentScale})`, width: '4000px', height: 'auto', minHeight: '3000px' }}>

            {/* Main Case Study Frame */}
            <div className="w-[1440px] bg-[#0A0A0A] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col mb-40">

              {/* Header */}
              <div className="h-12 bg-surface-container/50 border-b border-white/10 flex items-center px-6 gap-2">
                <span className="material-symbols-outlined text-sm text-primary">view_quilt</span>
                <span className="font-label-md text-sm text-on-surface-variant font-medium">AI Interview Platform_CaseStudy.fig</span>
              </div>

              <div className="p-16 md:p-24 flex flex-col gap-32">

                {/* 1. Overview */}
                <section className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded w-max">
                    <span className="font-label-md text-xs uppercase tracking-widest">SaaS Product Design</span>
                  </div>
                  <h1 className="font-display-lg text-6xl text-on-surface font-bold tracking-tight">AI Interview & Preparation Platform</h1>
                  <p className="font-body-lg text-2xl text-on-surface-variant max-w-4xl leading-relaxed">
                    An end-to-end redesign of a high-complexity AI-driven hiring application, focusing on scalable dashboards, grading algorithms, and system security modules.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-surface-container/20 p-8 rounded-[24px] border border-white/5 mt-8">
                    <div className="flex flex-col gap-2">
                      <span className="font-label-md text-sm text-on-surface-variant uppercase tracking-widest">Role</span>
                      <span className="font-body-md text-on-surface font-medium">Lead Designer</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-label-md text-sm text-on-surface-variant uppercase tracking-widest">Duration</span>
                      <span className="font-body-md text-on-surface font-medium">Jan 2026 – Apr 2026</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-label-md text-sm text-on-surface-variant uppercase tracking-widest">Contribution</span>
                      <span className="font-body-md text-on-surface font-medium">UI/UX, Dashboards</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-label-md text-sm text-on-surface-variant uppercase tracking-widest">Tools</span>
                      <span className="font-body-md text-on-surface font-medium">Figma, AI Plugins</span>
                    </div>
                  </div>
                </section>

                {/* 2. The Problem */}
                <section className="flex flex-col md:flex-row gap-16 items-start">
                  <div className="w-full md:w-1/3">
                    <h2 className="font-headline-lg text-3xl text-on-surface font-bold">The Problem</h2>
                  </div>
                  <div className="w-full md:w-2/3 flex flex-col gap-6">
                    <p className="font-body-lg text-xl text-on-surface-variant leading-relaxed">
                      Recruiters were overwhelmed by the unstructured data generated from automated AI interviews. Identifying key candidate strengths was a manual, error-prone process, causing severe drop-offs in platform adoption among enterprise clients.
                    </p>
                    <div className="p-6 bg-error/10 border border-error/20 rounded-xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
                      <p className="font-body-md text-error-container text-lg font-medium italic">
                        "I have 40 AI interviews to review today, and the dashboard gives me no indication of who actually answered the technical questions correctly."
                      </p>
                    </div>
                  </div>
                </section>

                {/* 3. Context & 4. Research/Discovery */}
                <section className="flex flex-col md:flex-row gap-16 items-start border-t border-white/5 pt-16">
                  <div className="w-full md:w-1/3 flex flex-col gap-12">
                    <div>
                      <h2 className="font-headline-lg text-3xl text-on-surface font-bold mb-4">Context</h2>
                      <p className="font-body-md text-on-surface-variant text-lg">
                        The startup had launched its MVP, but the grading UX lacked any hierarchy. Recruiters needed scanning mechanisms.
                      </p>
                    </div>
                    <div>
                      <h2 className="font-headline-lg text-3xl text-on-surface font-bold mb-4">Research</h2>
                      <p className="font-body-md text-on-surface-variant text-lg bg-surface-container/30 p-4 rounded-lg border border-white/5">
                        Conducted 5 user interviews which revealed that video playback was rarely watched in full; instead, users jumped to "flagged" timestamps.
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="h-full min-h-[300px] border border-white/10 rounded-2xl bg-surface-container/50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                      <span className="material-symbols-outlined text-[64px] text-primary/50 mb-4">insights</span>
                      <span className="font-label-lg tracking-widest uppercase text-on-surface-variant">Affinity Mapping Map</span>
                    </div>
                  </div>
                </section>

                {/* 5. User Flows */}
                <section className="flex flex-col gap-8">
                  <h2 className="font-headline-lg text-3xl text-on-surface font-bold">User Flows & Architecture</h2>
                  <div className="h-[250px] border border-white/10 rounded-2xl bg-surface-container/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    <div className="flex flex-col gap-4 items-center opacity-40">
                      <span className="material-symbols-outlined text-[64px]">account_tree</span>
                      <span className="font-label-md uppercase tracking-widest text-on-surface-variant">Flow Mapping Visualization</span>
                    </div>
                  </div>
                </section>

                {/* 6. Exploration & Wireframes */}
                <section className="flex flex-col gap-12 border-t border-white/5 pt-16">
                  <div className="flex flex-col gap-4 max-w-3xl">
                    <h2 className="font-headline-lg text-3xl text-on-surface font-bold">Exploration</h2>
                    <p className="font-body-lg text-on-surface-variant">We iterated on 3 core dashboard concepts. The focus was minimizing data density while maximizing actionable insights.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="h-[300px] border border-white/10 rounded-2xl bg-surface-container/50 flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                      <span className="absolute bottom-4 font-label-md text-on-surface-variant group-hover:text-primary transition-colors">V1: Table Heavy</span>
                    </div>
                    <div className="h-[300px] border border-white/10 rounded-2xl bg-surface-container/50 flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                      <span className="absolute bottom-4 font-label-md text-on-surface-variant group-hover:text-primary transition-colors">V2: Scorecard Driven</span>
                    </div>
                  </div>
                </section>

                {/* 7. Final Experience */}
                <section className="flex flex-col gap-12 border-t border-white/5 pt-16">
                  <div className="flex flex-col gap-4">
                    <h2 className="font-headline-lg text-3xl text-on-surface font-bold">Final Experience</h2>
                    <p className="font-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                      The interface was streamlined into a two-column grading layout, ensuring the video playback always remains contextual to the AI-generated sentiment scores.
                    </p>
                  </div>
                  <div className="w-full aspect-video border border-white/10 rounded-[24px] bg-black/80 flex items-center justify-center relative overflow-hidden shadow-2xl">
                    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"></div>

                    {/* Decorative UI Mockup */}
                    <div className="w-[85%] h-[80%] bg-surface border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-2xl relative z-10 transition-transform duration-500 hover:scale-105">
                      <div className="h-10 bg-surface-container-high border-b border-white/5 flex items-center gap-2 px-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                      </div>
                      <div className="flex-1 flex">
                        <div className="w-[200px] border-r border-white/5 bg-surface-container-low p-4 flex flex-col gap-2">
                          <div className="h-6 w-full bg-white/10 rounded mb-4"></div>
                          <div className="h-4 w-3/4 bg-white/5 rounded"></div>
                          <div className="h-4 w-1/2 bg-white/5 rounded"></div>
                        </div>
                        <div className="flex-1 p-8 flex flex-col gap-6">
                          <div className="h-12 w-1/3 bg-white/10 rounded"></div>
                          <div className="flex gap-6 h-full">
                            <div className="flex-1 bg-black/50 border border-white/5 rounded-lg flex items-center justify-center relative group">
                              <span className="material-symbols-outlined text-[48px] text-white/20 group-hover:text-primary transition-colors">smart_display</span>
                              <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 rounded-lg transition-opacity"></div>
                            </div>
                            <div className="w-[300px] flex flex-col gap-4">
                              <div className="h-24 bg-primary/10 border border-primary/20 rounded-lg p-4 flex flex-col gap-2 justify-center">
                                <div className="h-3 w-1/2 bg-primary/50 rounded"></div>
                                <div className="h-6 w-1/4 bg-primary rounded"></div>
                              </div>
                              <div className="flex-1 border border-white/5 bg-surface-container-low rounded-lg p-4">
                                <div className="w-full h-8 bg-white/5 rounded mb-2"></div>
                                <div className="w-full h-8 bg-white/5 rounded mb-2"></div>
                                <div className="w-full h-8 bg-white/5 rounded"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Design Decisions Block (New) */}
                <section className="bg-surface-container/20 border-l-[3px] border-secondary/60 p-8 md:p-12 rounded-xl">
                  <h3 className="font-label-md text-secondary tracking-widest uppercase mb-4">Design Decision #04</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-2">
                      <span className="font-label-sm uppercase tracking-widest text-on-surface-variant">Problem</span>
                      <p className="font-body-md text-on-surface">Dense evaluation data was difficult to scan.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-label-sm uppercase tracking-widest text-on-surface-variant">Decision</span>
                      <p className="font-body-md text-on-surface">Grouped related information into modular sections.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-label-sm uppercase tracking-widest text-on-surface-variant">Reasoning</span>
                      <p className="font-body-md text-on-surface">Reduce cognitive load and improve hierarchy.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-label-sm uppercase tracking-widest text-on-surface-variant">Result</span>
                      <p className="font-body-md text-secondary font-medium">Improved dashboard scannability.</p>
                    </div>
                  </div>
                </section>

                {/* 8. Design System */}
                <section className="flex flex-col md:flex-row gap-12 pt-16">
                  <div className="w-full md:w-1/3">
                    <h2 className="font-headline-lg text-3xl text-on-surface font-bold">Design System</h2>
                  </div>
                  <div className="w-full md:w-2/3 border border-white/5 rounded-2xl bg-surface-container/30 p-8">
                    <p className="font-body-lg text-on-surface-variant mb-6">Established a strict design token hierarchy mapped precisely to the engineering team's Tailwind setup.</p>
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-full bg-blue-500 border-4 border-surface shadow-2xl"></div>
                      <div className="w-16 h-16 rounded-full bg-emerald-500 border-4 border-surface shadow-2xl -ml-6"></div>
                      <div className="w-16 h-16 rounded-full bg-violet-500 border-4 border-surface shadow-2xl -ml-6"></div>
                      <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-surface shadow-2xl -ml-6 flex items-center justify-center"><span className="text-xs font-bold">+12</span></div>
                    </div>
                  </div>
                </section>

                {/* 9. Outcome */}
                <section className="bg-gradient-to-br from-primary/10 to-surface border border-primary/20 p-12 rounded-[24px] mt-12 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
                  <h2 className="font-headline-lg text-3xl text-on-surface font-bold mb-8">Business Impact</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex gap-4 relative z-10">
                      <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">trending_up</span>
                      </div>
                      <div>
                        <h4 className="font-headline-md text-xl font-bold text-on-surface mb-2">25% Efficiency Increase</h4>
                        <p className="font-body-md text-on-surface-variant leading-relaxed">Recruiters shaved an average of 4 minutes off of each candidate evaluation session due to the new scannable scores.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 relative z-10">
                      <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">verified</span>
                      </div>
                      <div>
                        <h4 className="font-headline-md text-xl font-bold text-on-surface mb-2">Zero-Friction Adoption</h4>
                        <p className="font-body-md text-on-surface-variant leading-relaxed">The new interface required no retraining for existing clients, securing a 100% adoption rate within 2 weeks of rollout.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 10. Reflection */}
                <section className="flex flex-col gap-6 pt-12 pb-16 border-t border-white/5">
                  <h2 className="font-headline-lg text-3xl text-on-surface font-bold">Reflection</h2>
                  <p className="font-body-lg text-on-surface-variant max-w-4xl leading-relaxed">
                    This project reaffirmed the importance of building products that mold to the user's workflow rather than forcing them to adapt. Designing for complex AI outputs requires a massive reduction in cognitive load.
                  </p>
                </section>

              </div>
            </div>
          </div>
        </div>
        <ZoomWidget
          scale={currentScale}
          onZoomIn={() => setCurrentScale(s => Math.min(Number((s + 0.1).toFixed(2)), 2))}
          onZoomOut={() => setCurrentScale(s => Math.max(Number((s - 0.1).toFixed(2)), 0.2))}
          onFitAll={() => {
            setCurrentScale(0.6);
            dragState.current.translateX = 0;
            dragState.current.translateY = 0;
            if (canvasContentRef.current) {
              canvasContentRef.current.style.transform = `translate(0px, 0px) scale(0.6)`;
            }
          }}
          x={-dragState.current.translateX}
          y={-dragState.current.translateY}
          className="bottom-28 right-6 z-[110]"
        />
      </main>

    </div>
  );
}
