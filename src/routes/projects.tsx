import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { ZoomWidget } from "../components/ZoomWidget";
export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects Overview - Varun Sehgal Portfolio" },
      { name: "description", content: "A bento-grid overview of Varun Sehgal's key design and engineering projects." },
      { property: "og:title", content: "Projects Overview - Varun Sehgal Portfolio" },
      { property: "og:description", content: "A bento-grid overview of Varun Sehgal's key design and engineering projects." },
    ],
  }),
  component: Projects,
});

function Projects() {
  const canvasAreaRef = useRef<HTMLElement | null>(null);
  const canvasContentRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startY: 0, translateX: 0, translateY: 0 });
  const [currentScale, setCurrentScale] = useState(0.8);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMoved, setHasMoved] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Add mobile detection for responsive scrolling
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isProjectVisible = (category: string, searchTerms: string) => {
    if (filter !== 'All' && filter !== category && category !== 'Any') return false;
    if (searchQuery.trim().length > 0) {
      if (!searchTerms.toLowerCase().includes(searchQuery.trim().toLowerCase())) return false;
    }
    return true;
  };

  const [projectStyles, setProjectStyles] = useState<Record<string, any>>({
    'CodeSrijan': { x: 0, y: 0, w: 0, h: 0, spacing: '32px', fill: '0%', hex: '#0a0a0a', blur: '0px', hasAutoLayout: true, hasFill: true, hasEffects: true },
    'AI Interview': { x: 0, y: 0, w: 0, h: 0, spacing: '24px', fill: '0%', hex: '#0a0a0a', blur: '0px', hasAutoLayout: true, hasFill: true, hasEffects: true },
    'Movie Tickets': { x: 0, y: 0, w: 0, h: 0, spacing: '16px', fill: '0%', hex: '#0a0a0a', blur: '0px', hasAutoLayout: true, hasFill: true, hasEffects: true },
    'Expensify': { x: 0, y: 0, w: 0, h: 0, spacing: '12px', fill: '0%', hex: '#0a0a0a', blur: '0px', hasAutoLayout: true, hasFill: true, hasEffects: true },
    'EventFlow': { x: 0, y: 0, w: 0, h: 0, spacing: '24px', fill: '0%', hex: '#0a0a0a', blur: '0px', hasAutoLayout: true, hasFill: true, hasEffects: true },
    'Landing Page': { x: 0, y: 0, w: 0, h: 0, spacing: '0px', fill: '0%', hex: '#0a0a0a', blur: '0px', hasAutoLayout: true, hasFill: true, hasEffects: true },
    'SaaS Dashboard': { x: 0, y: 0, w: 0, h: 0, spacing: '16px', fill: '0%', hex: '#0a0a0a', blur: '0px', hasAutoLayout: true, hasFill: true, hasEffects: true },
    'Neo-Bank Artboard': { x: 0, y: 0, w: 0, h: 0, spacing: '24px', fill: '0%', hex: '#0a0a0a', blur: '0px', hasAutoLayout: true, hasFill: true, hasEffects: true }
  });

  const getProjectStyle = (name: string) => {
    const styleData = projectStyles[name];
    if (!styleData) return {};
    let bg = undefined;
    if (styleData.hasFill) {
      const hex = styleData.hex || '#000000';
      const alphaPerc = parseInt(styleData.fill) || 0;
      if (alphaPerc > 0) {
        const alphaHex = Math.round((alphaPerc / 100) * 255).toString(16).padStart(2, '0');
        bg = `${hex}${alphaHex}`;
      }
    }
    return {
      backgroundColor: bg,
      filter: styleData.hasEffects ? (styleData.blur === '0px' ? 'none' : `blur(${styleData.blur})`) : 'none',
      gap: styleData.hasAutoLayout ? styleData.spacing : '0px',
      transform: (styleData.x > 0 || styleData.y > 0) ? `translate(${styleData.x || 0}px, ${styleData.y || 0}px)` : undefined,
      width: styleData.w > 0 ? `${styleData.w}px` : undefined,
      height: styleData.h > 0 ? `${styleData.h}px` : undefined,
    };
  };

  const [activeProjectName, setActiveProjectName] = useState('CodeSrijan');
  const activeProject = { name: activeProjectName, ...projectStyles[activeProjectName] };

  const updateProjectProperty = (key: string, val: any) => {
    setProjectStyles(prev => ({
      ...prev,
      [activeProjectName]: { ...prev[activeProjectName], [key]: val }
    }));
  };

  const resetCanvas = (newFilter = filter) => {
    setFilter(newFilter);
    dragState.current.translateX = 0;
    dragState.current.translateY = 0;
    if (canvasContentRef.current) {
      canvasContentRef.current.style.transform = `translate(0px, 0px) scale(${currentScale})`;
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasAreaRef.current || e.target === canvasContentRef.current) {
      setIsDragging(true);
      dragState.current.startX = e.clientX - dragState.current.translateX;
      dragState.current.startY = e.clientY - dragState.current.translateY;
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setHasMoved(true);
    let translateX = e.clientX - dragState.current.startX;
    let translateY = e.clientY - dragState.current.startY;
    const maxDragX = 2500;
    const maxY = 50;
    const minY = -3000;
    translateX = Math.max(-maxDragX, Math.min(maxDragX, translateX));
    translateY = Math.max(minY, Math.min(maxY, translateY));
    dragState.current.translateX = translateX;
    dragState.current.translateY = translateY;
    if (canvasContentRef.current) {
      canvasContentRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    }
    if (canvasAreaRef.current) {
      canvasAreaRef.current.style.backgroundPosition = `${translateX}px ${translateY}px`;
    }
  };

  const onMouseUp = () => setIsDragging(false);

  const navigateToProject = (projectName: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveProjectName(projectName);
    const safeId = projectName.replace(/\s+/g, '-');
    const el = document.getElementById(`project-${safeId}`);
    if (el && canvasAreaRef.current) {
      const containerRect = canvasAreaRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      const elCenterScreenY = elRect.top + elRect.height / 2;
      const elCenterScreenX = elRect.left + elRect.width / 2;

      const targetScreenY = containerRect.top + containerRect.height / 2;
      const targetScreenX = containerRect.left + containerRect.width / 2;

      let newTx = dragState.current.translateX + (targetScreenX - elCenterScreenX);
      let newTy = dragState.current.translateY + (targetScreenY - elCenterScreenY);

      newTx = Math.max(-2500, Math.min(2500, newTx));
      newTy = Math.max(-3000, Math.min(50, newTy));

      dragState.current.translateX = newTx;
      dragState.current.translateY = newTy;

      if (canvasContentRef.current) {
        canvasContentRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        canvasContentRef.current.style.transform = `translate(${newTx}px, ${newTy}px) scale(${currentScale})`;
        setTimeout(() => {
          if (canvasContentRef.current) {
            canvasContentRef.current.style.transition = 'transform 75ms ease-out';
          }
        }, 600);
      }

      if (canvasAreaRef.current) {
        canvasAreaRef.current.style.transition = 'background-position 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        canvasAreaRef.current.style.backgroundPosition = `${newTx}px ${newTy}px`;
        setTimeout(() => {
          if (canvasAreaRef.current) {
            canvasAreaRef.current.style.transition = 'none';
          }
        }, 600);
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col font-body-md text-body-md">

      <div className="flex h-screen pt-16">
        <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] z-40 hidden md:flex flex-col py-6 bg-surface/80 backdrop-blur-xl border-r border-white/10 flat no shadows docked w-64">
          <div className="px-4 mb-6">
            <h2 className="font-label-md text-label-md uppercase tracking-widest text-primary mb-1">Project Files</h2>
            <p className="font-caption text-caption text-on-surface-variant">Figma File Links</p>
          </div>
          <div className="flex-1 overflow-y-auto px-2">
            <div className="mb-4">
              <button onClick={(e) => navigateToProject('Work', e)} className="flex items-center w-full py-2 px-2 text-primary font-bold border-l-2 border-primary pl-4 bg-surface-variant/20 rounded-r-DEFAULT transition-all duration-150">
                <span className="material-symbols-outlined mr-2 text-sm">grid_view</span>
                <span className="font-label-md text-label-md">Work</span>
              </button>
              <div className="ml-6 mt-1 flex flex-col gap-1 border-l border-white/10 pl-2">
                <a href="https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2&t=vfPIBYY278lzphVq-1" target="_blank" rel="noreferrer" onClick={(e) => navigateToProject('CodeSrijan', e)} onMouseEnter={() => setActiveProjectName('CodeSrijan')} className="flex items-center w-full py-1.5 px-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 rounded-DEFAULT text-left group">
                  <span className="material-symbols-outlined mr-2 text-sm opacity-50 group-hover:opacity-100">diversity_3</span>
                  <span className="font-caption text-caption">CodeSrijan</span>
                </a>
                <a href="https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1" target="_blank" rel="noreferrer" onClick={(e) => navigateToProject('AI Interview', e)} onMouseEnter={() => setActiveProjectName('AI Interview')} className="flex items-center w-full py-1.5 px-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 rounded-DEFAULT text-left group">
                  <span className="material-symbols-outlined mr-2 text-sm opacity-50 group-hover:opacity-100">smart_toy</span>
                  <span className="font-caption text-caption">AI Interview</span>
                </a>
                <a href="https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1" target="_blank" rel="noreferrer" onClick={(e) => navigateToProject('Movie Tickets', e)} onMouseEnter={() => setActiveProjectName('Movie Tickets')} className="flex items-center w-full py-1.5 px-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 rounded-DEFAULT text-left group">
                  <span className="material-symbols-outlined mr-2 text-sm opacity-50 group-hover:opacity-100">confirmation_number</span>
                  <span className="font-caption text-caption">Movie Tickets</span>
                </a>
                <a href="https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1" target="_blank" rel="noreferrer" onClick={(e) => navigateToProject('Expensify', e)} onMouseEnter={() => setActiveProjectName('Expensify')} className="flex items-center w-full py-1.5 px-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 rounded-DEFAULT text-left group">
                  <span className="material-symbols-outlined mr-2 text-sm opacity-50 group-hover:opacity-100">account_balance_wallet</span>
                  <span className="font-caption text-caption">Expensify</span>
                </a>
              </div>
            </div>
            <div className="mb-4">
              <button onClick={(e) => navigateToProject('Client Work', e)} className="flex items-center w-full py-2 px-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 pl-4 transition-all duration-150">
                <span className="material-symbols-outlined mr-2 text-sm">folder_open</span>
                <span className="font-label-md text-label-md">Client Work (3)</span>
              </button>
              <div className="ml-6 mt-1 flex flex-col gap-1 border-l border-white/10 pl-2">
                <a href="https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2&p=f&t=ucsh4jF84sBl50UA-0" target="_blank" rel="noreferrer" onClick={(e) => navigateToProject('EventFlow', e)} onMouseEnter={() => setActiveProjectName('EventFlow')} className="flex items-center w-full py-1.5 px-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 rounded-DEFAULT text-left group">
                  <span className="material-symbols-outlined mr-2 text-sm opacity-50 group-hover:opacity-100">event</span>
                  <span className="font-caption text-caption">EventFlow</span>
                </a>
                <a href="https://www.figma.com/design/WfUzGPYsE7UFYS9YaQp5v6/home-page?node-id=0-1&p=f&t=cA3tERTu8AuInovg-0" target="_blank" rel="noreferrer" onClick={(e) => navigateToProject('Landing Page', e)} onMouseEnter={() => setActiveProjectName('Landing Page')} className="flex items-center w-full py-1.5 px-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 rounded-DEFAULT text-left group">
                  <span className="material-symbols-outlined mr-2 text-sm opacity-50 group-hover:opacity-100">web</span>
                  <span className="font-caption text-caption">Landing Page</span>
                </a>
                <a href="https://www.figma.com/design/PbO4QNnkgAyrPtkuyduZFE/sas?node-id=0-1&t=yHd7NxOZzn7AZUuw-0" target="_blank" rel="noreferrer" onClick={(e) => navigateToProject('SaaS Dashboard', e)} onMouseEnter={() => setActiveProjectName('SaaS Dashboard')} className="flex items-center w-full py-1.5 px-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 rounded-DEFAULT text-left group">
                  <span className="material-symbols-outlined mr-2 text-sm opacity-50 group-hover:opacity-100">dashboard</span>
                  <span className="font-caption text-caption">SaaS Dashboard</span>
                </a>
              </div>
            </div>
          </div>
          {/* Figma Interaction Floating Hint On Sidebar */}
          <div className={`absolute top-[480px] ml-[8rem] pb-12 w-[220px] transform -rotate-12 transition-all duration-[1500ms] pointer-events-none ease-in-out z-[999] ${hasMoved ? 'translate-y-[100vh] opacity-0 rotate-90 scale-90' : 'opacity-100'}`}>
            <div className="font-serif italic text-[22px] leading-tight text-primary/80 font-medium whitespace-nowrap">
              <span className="material-symbols-outlined absolute -top-8 -left-5 text-[36px] text-primary/60 rotate-[-15deg]">arrow_outward</span>
              Grab and move the<br />screen like you are<br />in Figma!
            </div>
          </div>
        </aside>
        <main
          ref={canvasAreaRef as any}
          className={`flex-1 md:ml-64 xl:mr-64 relative bg-[#0A0A0A] canvas-bg select-none ${isMobile ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden cursor-grab active:cursor-grabbing'}`}
          id="canvas-area"
          onMouseDown={isMobile ? undefined : onMouseDown}
          onMouseMove={isMobile ? undefined : onMouseMove}
          onMouseUp={isMobile ? undefined : onMouseUp}
          onMouseLeave={isMobile ? undefined : onMouseUp}
        >
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col md:flex-row items-center gap-2 md:gap-4 glass-panel px-4 py-2 md:rounded-full rounded-2xl shadow-lg w-[90vw] md:w-auto max-w-[700px]">
            <div className="relative w-full md:w-auto">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-surface-container/50 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all w-full md:w-64 text-on-surface placeholder:text-on-surface-variant/50 font-body-md text-body-md" placeholder="Search projects..." type="text" />
            </div>
            <div className="hidden md:block h-4 w-px bg-white/20"></div>
            <div className="flex flex-nowrap justify-center gap-2 font-label-md text-label-md w-full md:w-auto">
              <button onClick={() => resetCanvas('All')} className={`px-3 py-1 rounded-full transition-colors flex-1 md:flex-none ${filter === 'All' ? 'bg-primary/10 text-primary border border-primary/30' : 'hover:bg-surface-variant/50 text-on-surface-variant'}`}>All</button>
              <button onClick={() => resetCanvas('Web')} className={`px-3 py-1 rounded-full transition-colors flex-1 md:flex-none ${filter === 'Web' ? 'bg-primary/10 text-primary border border-primary/30' : 'hover:bg-surface-variant/50 text-on-surface-variant'}`}>Web</button>
              <button onClick={() => resetCanvas('Mobile')} className={`px-3 py-1 rounded-full transition-colors flex-1 md:flex-none ${filter === 'Mobile' ? 'bg-primary/10 text-primary border border-primary/30' : 'hover:bg-surface-variant/50 text-on-surface-variant'}`}>Mobile</button>
            </div>
          </div>
          <div ref={canvasContentRef} className={`${isMobile ? 'relative w-full pb-32 pt-40 px-4' : 'absolute top-0 left-0 w-full flex justify-center items-start pt-32 pb-32 transition-transform duration-75 origin-top'}`} id="canvas-content" style={isMobile ? { transform: 'none' } : { transform: `translate(${dragState.current.translateX}px, ${dragState.current.translateY}px) scale(${currentScale})` }}>
            <div className={`grid grid-cols-12 gap-8 w-full ${isMobile ? 'max-w-full' : 'max-w-[1240px]'}`}>

              <div id="project-Work" className="col-span-12 mb-4 relative">
                <h1 className="font-display-lg text-5xl font-bold text-on-background mb-8">WORK</h1>
                <h2 className="font-label-lg uppercase tracking-widest text-primary mb-2">Featured Projects</h2>
              </div>

              {/* Project 1: CodeSrijan */}
              {isProjectVisible('Web', 'CodeSrijan Hackathon & Innovation Platform ecosystem') && (
                <a id="project-CodeSrijan" href="https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2&t=vfPIBYY278lzphVq-1" target="_blank" rel="noreferrer" onMouseEnter={() => setActiveProjectName('CodeSrijan')} style={getProjectStyle('CodeSrijan')} className="col-span-12 glass-panel rounded-2xl p-0 glow-hover transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col md:flex-row border border-white/10 hover:border-primary/40">
                  <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <p className="font-label-md tracking-widest uppercase text-primary mb-2 flex items-center gap-2"><span>April 2026</span><span className="w-1 h-1 bg-primary/50 rounded-full"></span><span>Web</span></p>
                    <h3 className="font-display-sm text-4xl text-on-surface font-bold mb-4">CodeSrijan: Hackathon & Innovation Platform</h3>
                    <p className="font-body-lg text-on-surface-variant mb-6 leading-relaxed">
                      A unified ecosystem designed to manage the complete hackathon experience — from discovering challenges and forming teams to mentoring, recruitment, and leaderboards.
                    </p>
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-auto">
                      <span className="block text-sm uppercase tracking-widest text-primary/70 mb-2">Key Outcome</span>
                      <span className="font-medium text-on-surface text-lg block mb-4">A unified digital ecosystem for 200+ participants covering 10 interconnected workflows.</span>
                      <span className="font-label-md text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform w-max">
                        Open in Figma <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 relative min-h-[400px] border-l border-white/5 bg-black/60 overflow-hidden flex items-center justify-center p-8">
                    <div className="w-[120%] h-[120%] absolute -right-10 -bottom-10 bg-gradient-to-tr from-surface/80 to-transparent border-t border-l border-white/10 rounded-tl-[40px] shadow-2xl transform group-hover:scale-105 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-transform duration-500 flex flex-col items-center justify-center opacity-70 group-hover:opacity-100 overflow-hidden">
                      <img src="/figma_CodeSrijan.png?t=1" className="w-full h-full object-cover" alt="CodeSrijan Thumbnail" />
                    </div>
                  </div>
                </a>
              )}

              {/* Project 2: AI Interview */}
              {isProjectVisible('Web', 'AI Interview & Preperation SaaS Security Grading') && (
                <a id="project-AI-Interview" href="https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1" target="_blank" rel="noreferrer" onMouseEnter={() => setActiveProjectName('AI Interview')} style={getProjectStyle('AI Interview')} className="col-span-12 md:col-span-6 glass-panel rounded-2xl p-0 glow-hover transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col border border-white/10 hover:border-secondary/40">
                  <div className="p-8 flex flex-col flex-1">
                    <p className="font-label-md tracking-widest uppercase text-secondary mb-2">Web</p>
                    <h3 className="font-headline-lg text-3xl text-on-surface font-bold mb-3">AI Interview & Preperation</h3>
                    <p className="font-body-md text-on-surface-variant mb-6 text-lg">
                      An AI-driven SaaS platform with Security and Grading modules, designed for scalable candidate evaluation.
                    </p>
                    <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-4 mt-auto">
                      <span className="block text-xs uppercase tracking-widest text-secondary/70 mb-1">Impact</span>
                      <span className="font-medium text-on-surface mb-4 block">25% improvement in dashboard scannability & task efficiency.</span>
                      <span className="font-label-md text-secondary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform w-max">
                        Figma <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full relative h-[300px] border-t border-white/5 bg-black/60 overflow-hidden flex items-center justify-center">
                    <div className="w-[120%] h-[120%] absolute -bottom-10 bg-gradient-to-t from-surface/80 to-transparent border-t border-white/10 rounded-t-[40px] shadow-2xl transform group-hover:scale-105 group-hover:-translate-y-4 transition-transform duration-500 flex flex-col items-center justify-center opacity-70 group-hover:opacity-100 overflow-hidden">
                      <img src="/figma_AI_Interview.png?t=2" className="w-full h-full object-cover" alt="AI Interview Thumbnail" />
                    </div>
                  </div>
                </a>
              )}

              {/* Project 3: Movie Tickets */}
              {isProjectVisible('Mobile', 'Movie Ticket Booking event ticket frictionless') && (
                <a id="project-Movie-Tickets" href="https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1" target="_blank" rel="noreferrer" onMouseEnter={() => setActiveProjectName('Movie Tickets')} style={getProjectStyle('Movie Tickets')} className="col-span-12 md:col-span-6 glass-panel rounded-2xl p-0 glow-hover transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col border border-white/10 hover:border-tertiary/40">
                  <div className="p-8 flex flex-col flex-1">
                    <p className="font-label-md tracking-widest uppercase text-tertiary mb-2">Mobile</p>
                    <h3 className="font-headline-lg text-3xl text-on-surface font-bold mb-3">Movie Ticket Booking</h3>
                    <p className="font-body-md text-on-surface-variant mb-6 text-lg">
                      An end-to-end event and movie ticketing application built with a frictionless booking pipeline.
                    </p>
                    <div className="bg-tertiary/5 border border-tertiary/20 rounded-xl p-4 mt-auto">
                      <span className="block text-xs uppercase tracking-widest text-tertiary/70 mb-1">Impact</span>
                      <span className="font-medium text-on-surface mb-4 block">30% reduction in user drop-off via optimized booking workflow.</span>
                      <span className="font-label-md text-tertiary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform w-max">
                        Figma <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full relative h-[300px] border-t border-white/5 bg-black/60 overflow-hidden flex items-center justify-center">
                    <div className="w-[120%] h-[120%] absolute -bottom-10 bg-gradient-to-t from-surface/80 to-transparent border-t border-white/10 rounded-t-[40px] shadow-2xl transform group-hover:scale-105 group-hover:-translate-y-4 transition-transform duration-500 flex flex-col items-center justify-center opacity-70 group-hover:opacity-100 overflow-hidden">
                      <img src="/figma_Movie_Tickets.png?t=1" className="w-full h-full object-cover" alt="Movie Tickets Thumbnail" />
                    </div>
                  </div>
                </a>
              )}

              {/* Project 4: Expensify */}
              {isProjectVisible('Mobile', 'Expensify Tracker finance consumer analytics budget') && (
                <a id="project-Expensify" href="https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1" target="_blank" rel="noreferrer" onMouseEnter={() => setActiveProjectName('Expensify')} style={getProjectStyle('Expensify')} className="col-span-12 md:col-span-12 glass-panel rounded-2xl p-0 glow-hover transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col md:flex-row-reverse border border-white/10 hover:border-gray-400/40">
                  <div className="w-full md:w-5/12 p-8 flex flex-col flex-1 justify-center">
                    <p className="font-label-md tracking-widest uppercase text-gray-400 mb-2">Mobile</p>
                    <h3 className="font-headline-lg text-3xl text-on-surface font-bold mb-3">Expensify Tracker</h3>
                    <p className="font-body-md text-on-surface-variant mb-6 text-lg">
                      A highly optimized consumer finance application prioritizing rapid data entry and clear analytics over 17+ screens.
                    </p>
                    <div className="bg-gray-400/5 border border-gray-400/20 rounded-xl p-4 mt-auto">
                      <span className="block text-xs uppercase tracking-widest text-gray-400/70 mb-1">Impact</span>
                      <span className="font-medium text-on-surface block mb-4">Average Add Expense interaction brought below 5 seconds.</span>
                      <span className="font-label-md text-gray-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform w-max">
                        Figma <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full md:w-7/12 relative min-h-[300px] border-r border-white/5 bg-black/60 overflow-hidden flex items-center justify-center">
                    <div className="w-[120%] h-[120%] absolute -bottom-10 bg-gradient-to-t from-surface/80 to-transparent border-t border-white/10 rounded-t-[40px] shadow-2xl transform group-hover:scale-105 group-hover:-translate-y-4 transition-transform duration-500 flex flex-col items-center justify-center opacity-70 group-hover:opacity-100 overflow-hidden">
                      <img src="/figma_Expensify.png?t=1" className="w-full h-full object-cover" alt="Expensify Thumbnail" />
                    </div>
                  </div>
                </a>
              )}

              <div className="col-span-12 my-12 border-t border-white/10 relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#0A0A0A] px-4 font-label-md tracking-widest text-on-surface-variant">
                  MORE WORK
                </div>
              </div>

              <div id="project-Client-Work" className="col-span-12">
                <h2 className="font-label-lg uppercase tracking-widest text-on-surface mb-2">Client Work</h2>
                <p className="font-body-md text-on-surface-variant mb-8">Freelance Projects · 3 major projects representing end-to-end design solutions for early-stage companies.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 whitespace-nowrap gap-4">
                  {isProjectVisible('Any', 'EventFlow') && (
                    <a id="project-EventFlow" href="https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2&p=f&t=ucsh4jF84sBl50UA-0" target="_blank" rel="noreferrer" onMouseEnter={() => setActiveProjectName('EventFlow')} style={getProjectStyle('EventFlow')} className="bg-surface/30 flex flex-col border border-white/10 rounded-xl p-6 text-center hover:bg-surface transition-all duration-300 hover:border-primary/50 group cursor-pointer block">
                      <span className="material-symbols-outlined text-[32px] text-primary/70 group-hover:text-primary transition-colors">event</span>
                      <h4 className="font-bold text-on-surface">EventFlow</h4>
                    </a>
                  )}
                  {isProjectVisible('Any', 'Landing Page web') && (
                    <a id="project-Landing-Page" href="https://www.figma.com/design/WfUzGPYsE7UFYS9YaQp5v6/home-page?node-id=0-1&p=f&t=cA3tERTu8AuInovg-0" target="_blank" rel="noreferrer" onMouseEnter={() => setActiveProjectName('Landing Page')} style={getProjectStyle('Landing Page')} className="bg-surface/30 flex flex-col border border-white/10 rounded-xl p-6 text-center hover:bg-surface transition-all duration-300 hover:border-secondary/50 group cursor-pointer block">
                      <span className="material-symbols-outlined text-[32px] text-secondary/70 group-hover:text-secondary transition-colors">web</span>
                      <h4 className="font-bold text-on-surface">Landing Page</h4>
                    </a>
                  )}
                  {isProjectVisible('Any', 'SaaS Dashboard') && (
                    <a id="project-SaaS-Dashboard" href="https://www.figma.com/design/PbO4QNnkgAyrPtkuyduZFE/sas?node-id=0-1&t=yHd7NxOZzn7AZUuw-0" target="_blank" rel="noreferrer" onMouseEnter={() => setActiveProjectName('SaaS Dashboard')} style={getProjectStyle('SaaS Dashboard')} className="bg-surface/30 flex flex-col border border-white/10 rounded-xl p-6 text-center hover:bg-surface transition-all duration-300 hover:border-tertiary/50 group cursor-pointer block">
                      <span className="material-symbols-outlined text-[32px] text-tertiary/70 group-hover:text-tertiary transition-colors">dashboard</span>
                      <h4 className="font-bold text-on-surface">SaaS Dashboard</h4>
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
          <ZoomWidget
            scale={currentScale}
            onZoomIn={() => setCurrentScale(s => Math.min(Number((s + 0.1).toFixed(2)), 2))}
            onZoomOut={() => setCurrentScale(s => Math.max(Number((s - 0.1).toFixed(2)), 0.2))}
            onFitAll={() => {
              setCurrentScale(0.8);
              dragState.current.translateX = 0;
              dragState.current.translateY = 0;
              if (canvasContentRef.current) {
                canvasContentRef.current.style.transform = `translate(0px, 0px) scale(0.8)`;
              }
            }}
            x={-dragState.current.translateX}
            y={-dragState.current.translateY}
            className="bottom-28 right-6 z-[110]"
          />
        </main>
        {/* RIGHT SIDEBAR (FIGMA PROPERTIES PANEL PRECISE MATCH) */}
        <aside className="fixed right-0 top-16 h-[calc(100vh-64px)] z-40 w-[240px] flex-col bg-[#1A1A1A] border-l border-[#2E2E2E] font-mono text-[13px] select-none overflow-y-auto overflow-x-hidden hidden xl:flex">

          {/* Header */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#2E2E2E]">
            <span className="text-[#F2F2F2] font-bold text-sm tracking-wide">Design</span>
            <span className="text-[#FFB1A3]/80 text-[10px] uppercase font-bold tracking-wider">(fun tab)</span>
          </div>

          <div className="flex flex-col">

            {/* Component Header & Coordinates */}
            <div className="px-5 py-5 border-b border-[#2E2E2E]">
              <div className="flex items-center gap-3 mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FFB1A3]">
                  <path d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM14 14H16V16H14V14ZM16 16H18V18H16V16ZM18 14H20V16H18V14ZM14 18H16V20H14V18ZM18 18H20V20H18V18Z" fill="currentColor" />
                </svg>
                <span className="text-white font-bold text-[13px] tracking-wide truncate">{activeProject.name}</span>
              </div>

              {/* X, Y, W, H Grid */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                <div className="flex items-center bg-[#252525] rounded border border-transparent focus-within:border-[#3E3E3E] hover:border-[#3E3E3E] transition-colors h-7 px-2">
                  <span className="text-[#FFB1A3]/70 font-bold text-[11px] w-4 pointer-events-none">X</span>
                  <input type="number" min="0" max="4000" className="bg-transparent w-full text-white font-bold text-[11px] text-right focus:outline-none" value={activeProject.x} onChange={e => { let v = parseInt(e.target.value); if (isNaN(v)) v = 0; if (v < 0) v = 0; if (v > 4000) v = 4000; updateProjectProperty('x', v); }} />
                </div>
                <div className="flex items-center bg-[#252525] rounded border border-transparent focus-within:border-[#3E3E3E] hover:border-[#3E3E3E] transition-colors h-7 px-2">
                  <span className="text-[#FFB1A3]/70 font-bold text-[11px] w-4 pointer-events-none">Y</span>
                  <input type="number" min="0" max="4000" className="bg-transparent w-full text-white font-bold text-[11px] text-right focus:outline-none" value={activeProject.y} onChange={e => { let v = parseInt(e.target.value); if (isNaN(v)) v = 0; if (v < 0) v = 0; if (v > 4000) v = 4000; updateProjectProperty('y', v); }} />
                </div>
                <div className="flex items-center bg-[#252525] rounded border border-transparent focus-within:border-[#3E3E3E] hover:border-[#3E3E3E] transition-colors h-7 px-2 mt-1">
                  <span className="text-[#FFB1A3]/70 font-bold text-[11px] w-4 pointer-events-none">W</span>
                  <input type="number" min="0" max="4000" className="bg-transparent w-full text-white font-bold text-[11px] text-right focus:outline-none" value={activeProject.w} onChange={e => { let v = parseInt(e.target.value); if (isNaN(v)) v = 0; if (v < 0) v = 0; if (v > 4000) v = 4000; updateProjectProperty('w', v); }} />
                </div>
                <div className="flex items-center bg-[#252525] rounded border border-transparent focus-within:border-[#3E3E3E] hover:border-[#3E3E3E] transition-colors h-7 px-2 mt-1">
                  <span className="text-[#FFB1A3]/70 font-bold text-[11px] w-4 pointer-events-none">H</span>
                  <input type="number" min="0" max="4000" className="bg-transparent w-full text-white font-bold text-[11px] text-right focus:outline-none" value={activeProject.h} onChange={e => { let v = parseInt(e.target.value); if (isNaN(v)) v = 0; if (v < 0) v = 0; if (v > 4000) v = 4000; updateProjectProperty('h', v); }} />
                </div>
              </div>
            </div>

            {/* Auto Layout */}
            <div className="px-5 py-4 border-b border-[#2E2E2E] group">
              <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => updateProjectProperty('hasAutoLayout', !activeProject.hasAutoLayout)}>
                <span className="text-white font-bold text-[13px] tracking-wide">Auto Layout</span>
                <span className="text-[#FFB1A3] font-bold text-lg opacity-80 hover:opacity-100 transition-opacity">{activeProject.hasAutoLayout ? '—' : '+'}</span>
              </div>

              {activeProject.hasAutoLayout && (
                <div className="bg-[#252525] rounded p-2 flex items-center border border-[#303030]">
                  <div className="flex items-center justify-center w-6 text-[#FFB1A3]/90 mr-2">
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center relative h-[24px]">
                    <div className="flex justify-between items-center w-full relative z-10 text-[11px]">
                      <span className="text-[#FFB1A3] font-bold">Spacing</span>
                      <div className="flex gap-1 pr-1 bg-[#252525] focus-within:bg-[#1A1A1A]">
                        <input type="number" min="0" max="100" className="bg-transparent w-8 text-right font-bold text-white focus:outline-none" value={parseInt(activeProject.spacing) || 0} onChange={e => { let v = parseInt(e.target.value); if (isNaN(v)) v = 0; if (v < 0) v = 0; if (v > 100) v = 100; updateProjectProperty('spacing', v + 'px'); }} />
                        <span className="opacity-60 text-[10px] mt-[1px] text-white pointer-events-none">px</span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-[95%] h-[2px] bg-white/10 rounded-full cursor-pointer pointer-events-none">
                      <div className="absolute top-0 left-0 h-full bg-[#FFB1A3] rounded-full transition-all" style={{ width: `${Math.min(100, Math.max(0, parseInt(activeProject.spacing) || 0))}%` }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fill */}
            <div className="px-5 py-4 border-b border-[#2E2E2E] group">
              <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => updateProjectProperty('hasFill', !activeProject.hasFill)}>
                <span className="text-white font-bold text-[13px] tracking-wide">Fill</span>
                <span className="text-[#FFB1A3] font-bold text-lg opacity-80 hover:opacity-100 transition-opacity">{activeProject.hasFill ? '—' : '+'}</span>
              </div>

              {activeProject.hasFill && (
                <div className="flex items-center justify-between group/item">
                  <div className="flex items-center gap-3 relative">
                    <div className="w-4 h-4 border border-white/20 rounded-[2px] overflow-hidden relative">
                      <input type="color" className="absolute -top-2 -left-2 w-8 h-8 cursor-pointer opacity-0" value={/^#[0-9A-Fa-f]{6}$/.test(activeProject.hex) ? activeProject.hex : '#0a0a0a'} onChange={e => updateProjectProperty('hex', e.target.value)} />
                      <div className="w-full h-full pointer-events-none shadow-inner" style={{ backgroundColor: /^#[0-9A-Fa-f]{6}$/.test(activeProject.hex) ? activeProject.hex : '#0a0a0a' }}></div>
                    </div>
                    <input type="text" className="bg-transparent text-white font-bold tracking-widest text-[11px] focus:outline-none focus:text-[#FFB1A3] transition-colors w-20 uppercase" value={activeProject.hex} onChange={e => { let v = e.target.value.toUpperCase(); if (!v.startsWith('#')) v = '#' + v.replace(/#/g, ''); v = '#' + v.substring(1).replace(/[^0-9A-F]/g, ''); if (v.length > 9) v = v.substring(0, 9); updateProjectProperty('hex', v); }} />
                  </div>
                  <div className="flex gap-1 text-white opacity-80 text-[11px] focus-within:opacity-100 focus-within:text-[#FFB1A3]">
                    <input type="number" min="0" max="100" className="bg-transparent w-8 text-right font-bold text-current focus:outline-none" value={parseInt(activeProject.fill) || 0} onChange={e => { let v = parseInt(e.target.value); if (isNaN(v)) v = 0; if (v < 0) v = 0; if (v > 100) v = 100; updateProjectProperty('fill', v + '%') }} />
                    <span className="opacity-60 text-[10px] mt-[1px]">%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Effects */}
            <div className="px-5 py-4 border-b border-[#2E2E2E] group">
              <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => updateProjectProperty('hasEffects', !activeProject.hasEffects)}>
                <span className="text-white font-bold text-[13px] tracking-wide">Effects</span>
                <span className="text-[#FFB1A3] font-bold text-lg opacity-80 hover:opacity-100 transition-opacity">{activeProject.hasEffects ? '—' : '+'}</span>
              </div>

              {activeProject.hasEffects && (
                <div className="bg-[#252525] rounded px-3 py-2 flex border border-[#303030] items-center justify-between group/effect">
                  <div className="flex items-center gap-3">
                    <div className="text-[#5ABCB9]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                        <circle cx="12" cy="4" r="2.5" fill="currentColor" />
                        <circle cx="12" cy="20" r="2.5" fill="currentColor" />
                        <circle cx="4" cy="12" r="2.5" fill="currentColor" />
                        <circle cx="20" cy="12" r="2.5" fill="currentColor" />
                        <circle cx="6" cy="6" r="2" fill="currentColor" />
                        <circle cx="18" cy="18" r="2" fill="currentColor" />
                        <circle cx="6" cy="18" r="2" fill="currentColor" />
                        <circle cx="18" cy="6" r="2" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-[12px] tracking-wide">Layer Blur</span>
                      <div className="flex gap-1 text-white opacity-60 text-[10px] mt-0.5 focus-within:opacity-100">
                        <input type="number" min="0" max="100" className="bg-transparent w-6 text-right font-bold text-white focus:outline-none" value={parseInt(activeProject.blur) || 0} onChange={e => { let v = parseInt(e.target.value); if (isNaN(v)) v = 0; if (v < 0) v = 0; if (v > 100) v = 100; updateProjectProperty('blur', v + 'px'); }} />
                        <span className="pointer-events-none text-current">px</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => updateProjectProperty('hasEffects', false)} className="text-[#FFB1A3] font-bold text-lg opacity-80 hover:opacity-100 transition-opacity">—</button>
                </div>
              )}
            </div>

          </div>
        </aside>
      </div >

    </div >
  );
}
