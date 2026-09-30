import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Varun Sehgal - Portfolio" },
      { name: "description", content: "Varun Sehgal - UI/UX Designer portfolio workspace canvas." },
    ],
  }),
  component: Index,
});

const creativeNotes = [
  "Don't forget to redesign the logo!",
  "Meeting with the dev team at 4pm",
  "Buy more coffee ☕",
  "Fix that one CSS bug...",
  "Draft the new case study",
  "Update the typography scale",
  "Wireframe the new dashboard",
  "Send invoice to client"
];

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const artboardRef = useRef<HTMLDivElement>(null);

  const [currentScale, setCurrentScale] = useState(1);
  const [windowState, setWindowState] = useState('normal');
  const [floatingShapes, setFloatingShapes] = useState<{ id: number, x: number, y: number, color: string, text: string, isPinned: boolean }[]>([]);
  const [currentTime, setCurrentTime] = useState('');
  const [showAssets, setShowAssets] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [draggingNoteId, setDraggingNoteId] = useState<number | null>(null);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const handleReset = () => {
      setWindowState('normal');
      setCurrentScale(1);
      setPan({ x: 0, y: 0 });
      setFloatingShapes([]);
      document.documentElement.classList.remove('theme-cyberpunk', 'theme-ocean', 'theme-monochrome');
      toast("Workspace Reset!");
    };

    const handleMobileMenu = (e: Event) => {
      const customEvent = e as CustomEvent;
      setMobileMenuOpen(customEvent.detail);
    };

    window.addEventListener('reset-workspace', handleReset);
    window.addEventListener('mobile-menu-state', handleMobileMenu);
    return () => {
      clearInterval(interval);
      window.removeEventListener('reset-workspace', handleReset);
      window.removeEventListener('mobile-menu-state', handleMobileMenu);
    };
  }, []);

  const panRef = useRef({ x: 0, y: 0 });

  // Sync state to ref so mousedown can access latest without being in deps
  useEffect(() => {
    panRef.current = pan;
  }, [pan]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isPanning = false;
    let startX = 0;
    let startY = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.target === container || (e.target as HTMLElement).id === "canvas-wrapper") {
        isPanning = true;
        container.classList.add("cursor-grabbing");
        startX = e.pageX - panRef.current.x;
        startY = e.pageY - panRef.current.y;
      }
    };

    const onMouseUp = () => {
      if (isPanning) {
        isPanning = false;
        container.classList.remove("cursor-grabbing");
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isPanning) {
        e.preventDefault();
        setPan({
          x: e.pageX - startX,
          y: e.pageY - startY
        });
      }
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const addStickyNote = () => {
    if (floatingShapes.length >= 8) {
      toast.error("Maximum of 8 notes allowed!");
      return;
    }
    const colors = ['bg-yellow-200 text-black', 'bg-blue-200 text-black', 'bg-pink-200 text-black', 'bg-green-200 text-black'];
    const randomText = creativeNotes[Math.floor(Math.random() * creativeNotes.length)];

    // Spawn near the center relative to the pan
    const spawnX = -pan.x + (window.innerWidth / 2) + (Math.random() * 200 - 100);
    const spawnY = -pan.y + (window.innerHeight / 2) + (Math.random() * 200 - 100);

    setFloatingShapes(prev => [...prev, {
      id: Date.now(),
      x: spawnX,
      y: spawnY,
      color: String(colors[Math.floor(Math.random() * colors.length)] || colors[0]),
      text: String(randomText || ''),
      isPinned: false
    }]);
  };

  const updateStickyNote = (id: number, text: string) => {
    setFloatingShapes(prev => prev.map(s => s.id === id ? { ...s, text } : s));
  };

  const handleNotePointerDown = (e: React.PointerEvent, id: number, isPinned: boolean) => {
    e.stopPropagation();
    if (isPinned) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDraggingNoteId(id);
  };

  const togglePin = (id: number) => {
    setFloatingShapes(prev => prev.map(s => s.id === id ? { ...s, isPinned: !s.isPinned } : s));
  };

  const handleNotePointerMove = (e: React.PointerEvent, id: number) => {
    if (draggingNoteId === id) {
      e.stopPropagation();
      setFloatingShapes(prev => prev.map(s => {
        if (s.id === id) {
          return { ...s, x: s.x + e.movementX / currentScale, y: s.y + e.movementY / currentScale };
        }
        return s;
      }));
    }
  };

  const handleNotePointerUp = (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setDraggingNoteId(null);
  };

  const changeTheme = (theme: string) => {
    document.documentElement.classList.remove('theme-cyberpunk', 'theme-ocean', 'theme-monochrome');
    if (theme !== 'default') {
      document.documentElement.classList.add('theme-' + theme);
    }
    toast("Theme updated!");
  };

  return (
    <div className="text-on-background bg-background h-screen w-screen flex flex-col font-body-md overflow-hidden relative">


      <div className="flex flex-1 pt-16 h-full relative">
        <aside className={`fixed left-0 top-16 h-[calc(100vh-64px)] z-40 flex-col py-6 bg-surface/95 text-primary font-label-md text-label-md w-64 backdrop-blur-xl border-r border-white/10 no-shadows transition-transform duration-300 md:flex ${mobileMenuOpen ? 'translate-x-0 flex' : '-translate-x-full md:translate-x-0 hidden'}`}>
          <div className="px-6 mb-8">
            <h2 className="font-label-md text-label-md uppercase tracking-widest text-primary mb-1">Project Files</h2>
            <p className="text-caption text-on-surface-variant">V3 Final Render</p>
          </div>
          <nav className="flex-1 flex flex-col gap-2 px-2">

            <div onClick={() => setShowAssets(!showAssets)} className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer transition-colors ${showAssets ? 'text-primary font-bold border-l-2 border-primary pl-4 bg-surface-variant/20' : 'text-on-surface-variant pl-4 hover:text-on-surface hover:bg-surface-variant/30'}`}>
              <span className="material-symbols-outlined">grid_view</span>
              Assets
            </div>
          </nav>
        </aside>

        {showAssets && (
          <div className="fixed left-64 top-16 h-[calc(100vh-64px)] w-72 bg-surface border-r border-white/10 z-30 p-6 flex flex-col gap-8 animate-in slide-in-from-left shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-headline-sm text-primary">Design Assets</h3>
              <span className="material-symbols-outlined cursor-pointer hover:text-white" onClick={() => setShowAssets(false)}>close</span>
            </div>

            <div>
              <p className="font-label-sm text-on-surface-variant mb-3 uppercase tracking-wider">Customize Theme</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => changeTheme('default')} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left">
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full bg-white"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                  </div>
                  <span className="text-sm">Default (Dark)</span>
                </button>
                <button onClick={() => changeTheme('cyberpunk')} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left">
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full bg-[#0066ff]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#ff0099]"></div>
                  </div>
                  <span className="text-sm">Cyberpunk</span>
                </button>
                <button onClick={() => changeTheme('ocean')} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left">
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full bg-[#0de6e6]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#1ae699]"></div>
                  </div>
                  <span className="text-sm">Ocean Breeze</span>
                </button>
                <button onClick={() => changeTheme('monochrome')} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left">
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full bg-[#e6e6e6]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#b3b3b3]"></div>
                  </div>
                  <span className="text-sm">Monochrome</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="font-label-sm text-on-surface-variant mb-2 uppercase tracking-wider">Typography</p>
              <p className="font-display-sm text-on-surface">Space Grotesk</p>
              <p className="font-body-md text-on-surface-variant">Manrope</p>
            </div>
          </div>
        )}

        <main ref={containerRef} className="flex-1 md:ml-64 relative bg-[#0A0A0A] overflow-hidden cursor-default">
          {/* Background Grid - Translates and scales properly */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: `${24 * currentScale}px ${24 * currentScale}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`
          }}></div>

          <div id="canvas-wrapper" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${currentScale})`, transformOrigin: '0 0' }} className="absolute inset-0">
            {floatingShapes.map(shape => (
              <div
                key={shape.id}
                className={`absolute w-48 h-48 rounded shadow-2xl p-4 flex flex-col ${shape.isPinned ? 'cursor-default' : 'cursor-move hover:scale-105'} ${shape.color} transition-transform shadow-black/50`}
                style={{ top: shape.y, left: shape.x, zIndex: draggingNoteId === shape.id ? 100 : 50 }}
                onPointerDown={(e) => handleNotePointerDown(e, shape.id, shape.isPinned)}
                onPointerMove={(e) => handleNotePointerMove(e, shape.id)}
                onPointerUp={handleNotePointerUp}
              >
                <div className="w-full flex justify-between items-center border-b border-black/10 pb-2 mb-2">
                  <span className="text-xs font-bold opacity-50 uppercase tracking-widest pointer-events-none">Note</span>
                  <span
                    className={`material-symbols-outlined text-[16px] cursor-pointer hover:opacity-100 transition-opacity ${shape.isPinned ? 'opacity-100 text-black' : 'opacity-30'}`}
                    onPointerDown={(e) => { e.stopPropagation(); togglePin(shape.id); }}
                  >
                    push_pin
                  </span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={shape.text}
                    onChange={(e) => updateStickyNote(shape.id, e.target.value)}
                    className="w-full h-full bg-transparent resize-none outline-none font-body-sm text-black placeholder:text-black/30"
                    placeholder="Type here..."
                    onPointerDown={e => e.stopPropagation()}
                  />
                </div>
                <div
                  className="absolute -top-3 -right-3 w-8 h-8 bg-surface border border-white/20 rounded-full text-on-surface flex items-center justify-center cursor-pointer opacity-100 hover:scale-110 hover:bg-red-500 hover:text-white transition-all shadow-xl"
                  onClick={(e) => { e.stopPropagation(); setFloatingShapes(prev => prev.filter(s => s.id !== shape.id)); }}
                  title="Remove Note"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </div>
              </div>
            ))}

            {windowState === 'normal' && (
              <div ref={artboardRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[90%] max-w-[1400px] h-[95%] md:h-[90%] bg-surface-container/30 backdrop-blur-[40px] border border-white/10 rounded-2xl flex flex-col p-4 md:p-8 overflow-y-auto overflow-x-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,1)] transition-all duration-300 custom-scrollbar">

                {/* Frame Controls */}
                <div className="w-full flex justify-between items-center mb-8 border-b border-white/10 pb-4 bg-surface-container/0 backdrop-blur-sm -mt-4 pt-4 flex-shrink-0">
                  <div className="flex items-center gap-3">

                    <span className="font-label-md text-on-surface-variant font-medium text-sm ml-2">Varun_Sehgal_Portfolio.fig</span>
                  </div>
                  <div className="font-label-md text-caption text-on-surface-variant/50 bg-black/20 px-3 py-1 rounded-full">
                    Artboard view
                  </div>
                </div>

                <div className="w-full flex-1 flex flex-col gap-24 relative px-4 pb-20">
                  <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2 opacity-30"></div>
                    <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-secondary rounded-full blur-[160px] -translate-x-1/2 opacity-20"></div>
                  </div>

                  {/* HERO */}
                  <section className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                      <div className="flex items-center gap-3.5 flex-wrap">
                        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
                          <div className="w-7 h-7 rounded-full overflow-hidden border border-primary/50 shadow-md bg-zinc-900 shrink-0">
                            <img src="/varun.jpg" alt="Varun Sehgal" className="w-full h-full object-cover object-top" onError={(e) => { (e.target as HTMLImageElement).src = '/varun.jpeg'; }} />
                          </div>
                          <span className="text-xs font-mono font-bold text-white tracking-wide">Varun Sehgal</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="font-label-md text-label-lg font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
                            Product Designer
                          </span>
                        </div>
                      </div>
                      <h1 className="font-display-lg text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] tracking-tight text-on-background font-bold text-shadow-sm">
                        I design digital products<br />that make complex things feel <span className="italic text-primary/90 font-light">simple.</span>
                      </h1>
                      <p className="font-body-lg text-xl md:text-2xl text-on-surface-variant max-w-2xl mt-2 font-medium">
                        UI/UX · SaaS · AI Products · Design Systems
                      </p>
                      <div className="flex flex-wrap gap-4 mt-6">
                        <Link to="/projects" className="px-8 py-4 bg-primary text-on-primary font-bold rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2 glow-effect">
                          See My Work <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </Link>
                        <Link to="/about" className="px-8 py-4 bg-white/5 border border-white/10 text-on-surface font-bold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                          <span className="material-symbols-outlined text-[20px]">person</span> About Me
                        </Link>
                      </div>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-4">
                      {/* NOW PANEL */}
                      <div className="bg-surface/50 border border-white/10 rounded-xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-primary/30 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/60"></div>
                        <h3 className="font-label-lg uppercase tracking-widest text-on-surface-variant mb-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">update</span> Now
                        </h3>
                        <ul className="space-y-4 font-body-md text-on-surface">
                          <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">design_services</span>
                            <div className="flex gap-1 flex-wrap"><span className="font-bold">Designing</span><span className="text-on-surface-variant">AI-powered products</span></div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">science</span>
                            <div className="flex gap-1 flex-wrap"><span className="font-bold">Exploring</span><span className="text-on-surface-variant">AI × UX workflows</span></div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">view_quilt</span>
                            <div className="flex gap-1 flex-wrap"><span className="font-bold">Improving</span><span className="text-on-surface-variant">Product design systems</span></div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-white text-[20px] mt-0.5">rocket_launch</span>
                            <div className="flex gap-1 flex-wrap"><span className="font-bold">Building</span><span className="text-on-surface-variant">Better digital experiences</span></div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* IMPACT */}
                  <section className="relative z-10 bg-surface/30 border border-white/5 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                    <h3 className="font-label-lg uppercase tracking-widest text-primary mb-8 text-center sm:text-left">Selected Impact</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                      <div className="flex flex-col gap-1 border-l border-white/10 pl-4 hover:border-primary/50 transition-colors">
                        <span className="font-display-md text-3xl font-bold text-on-surface">45%</span>
                        <span className="font-body-sm text-on-surface-variant leading-tight">Faster early-stage design</span>
                      </div>
                      <div className="flex flex-col gap-1 border-l border-white/10 pl-4 hover:border-primary/50 transition-colors">
                        <span className="font-display-md text-3xl font-bold text-on-surface">30%</span>
                        <span className="font-body-sm text-on-surface-variant leading-tight">Reduction in user drop-off</span>
                      </div>
                      <div className="flex flex-col gap-1 border-l border-white/10 pl-4 hover:border-primary/50 transition-colors">
                        <span className="font-display-md text-3xl font-bold text-on-surface">40%</span>
                        <span className="font-body-sm text-on-surface-variant leading-tight">Increase in user satisfaction</span>
                      </div>
                      <div className="flex flex-col gap-1 border-l border-white/10 pl-4 hover:border-primary/50 transition-colors">
                        <span className="font-display-md text-3xl font-bold text-on-surface">50+</span>
                        <span className="font-body-sm text-on-surface-variant leading-tight">Design-system components</span>
                      </div>
                      <div className="flex flex-col gap-1 border-l border-white/10 pl-4 hover:border-primary/50 transition-colors">
                        <span className="font-display-md text-3xl font-bold text-on-surface">10+</span>
                        <span className="font-body-sm text-on-surface-variant leading-tight">End-to-end projects</span>
                      </div>
                    </div>
                  </section>

                  {/* SELECTED WORK */}
                  <section className="relative z-10 flex flex-col gap-8">
                    <div className="flex justify-between items-end border-b border-white/10 pb-4">
                      <h3 className="font-display-sm text-3xl font-bold text-on-background">Selected Work</h3>
                      <Link to="/projects" className="flex items-center gap-1 font-label-md text-primary hover:text-primary/80 transition-colors group">
                        View all <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-12">
                      {/* Project 1: CodeSrijan */}
                      <a href="https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2&t=vfPIBYY278lzphVq-1" target="_blank" rel="noreferrer" className="group rounded-2xl bg-surface/40 hover:bg-surface border border-white/5 hover:border-primary/50 hover:shadow-[0_0_50px_-20px_rgba(var(--primary-rgb),0.3)] transition-all overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-5/12 p-8 md:p-12 flex flex-col justify-center">
                          <p className="font-label-sm tracking-widest uppercase text-primary mb-2 flex flex-wrap gap-x-2 gap-y-1 items-center">
                            <span>April 2026</span>
                            <span className="w-1 h-1 rounded-full bg-primary/50"></span>
                            <span>Web</span>
                          </p>
                          <h4 className="font-display-sm text-2xl md:text-3xl font-bold text-on-surface mb-4 group-hover:text-primary transition-colors">CodeSrijan: Hackathon & Innovation Platform</h4>
                          <p className="font-body-md text-on-surface-variant mb-6 text-base md:text-lg">
                            A unified ecosystem designed to manage the complete hackathon experience — from discovering challenges and forming teams to mentoring, recruitment, and leaderboards.
                          </p>
                          <div className="flex flex-col gap-2 mb-8">
                            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Design Contribution</span>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-surface-variant/50 rounded text-xs text-on-surface">Co-Organizer</span>
                              <span className="px-3 py-1 bg-surface-variant/50 rounded text-xs text-on-surface">Lead Designer</span>
                            </div>
                          </div>
                          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-auto">
                            <span className="block text-xs uppercase tracking-widest text-primary mb-2 font-bold flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">insights</span> Key Outcome</span>
                            <span className="font-body-md text-on-surface font-medium block mb-4">A unified digital ecosystem for 200+ participants covering 10 interconnected workflows.</span>
                            <span className="font-label-md text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform w-max">
                              Open in Figma <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                            </span>
                          </div>
                        </div>
                        <div className="w-full md:w-7/12 min-h-[400px] relative bg-[#111] p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/5 overflow-hidden group-hover:bg-[#161616] transition-colors">
                          <div className="w-[120%] h-[120%] absolute -right-10 -bottom-10 bg-gradient-to-tr from-surface/50 to-transparent border-t border-l border-white/10 rounded-tl-[3rem] shadow-[-20px_-20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500 ease-out flex items-center justify-center">
                            <div className="flex flex-col items-center justify-center opacity-40">
                              <span className="material-symbols-outlined text-[80px] mb-4 text-primary">diversity_3</span>
                              <span className="font-label-lg font-medium tracking-widest uppercase">Ecosystem Architecture</span>
                            </div>
                          </div>
                        </div>
                      </a>

                      {/* Project 2: AI Interview Platform */}
                      <a href="https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1" target="_blank" rel="noreferrer" className="group rounded-2xl bg-surface/40 hover:bg-surface border border-white/5 hover:border-secondary/50 hover:shadow-[0_0_50px_-20px_rgba(var(--secondary-rgb),0.3)] transition-all overflow-hidden flex flex-col md:flex-row-reverse">
                        <div className="w-full md:w-5/12 p-8 md:p-12 flex flex-col justify-center">
                          <p className="font-label-sm tracking-widest uppercase text-secondary mb-2 flex flex-wrap gap-x-2 gap-y-1 items-center">
                            <span>Web</span>
                          </p>
                          <h4 className="font-display-sm text-2xl md:text-3xl font-bold text-on-surface mb-4 group-hover:text-secondary transition-colors">AI Interview & Preparation Platform</h4>
                          <p className="font-body-md text-on-surface-variant mb-6 text-base md:text-lg">
                            An AI-driven SaaS platform with Security and Grading modules, designed for scalable and intelligent candidate evaluation.
                          </p>
                          <div className="flex flex-col gap-2 mb-8">
                            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Design Contribution</span>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-surface-variant/50 rounded text-xs text-on-surface">Product Design</span>
                              <span className="px-3 py-1 bg-surface-variant/50 rounded text-xs text-on-surface">UI/UX</span>
                            </div>
                          </div>
                          <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-5 mt-auto">
                            <span className="block text-xs uppercase tracking-widest text-secondary mb-2 font-bold flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">insights</span> Key Outcome</span>
                            <span className="font-body-md text-on-surface font-medium block mb-4">25% improvement in dashboard scannability & task efficiency.</span>
                            <span className="font-label-md text-secondary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform w-max">
                              Open in Figma <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                            </span>
                          </div>
                        </div>
                        <div className="w-full md:w-7/12 min-h-[400px] relative bg-[#111] p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-r border-white/5 overflow-hidden group-hover:bg-[#161616] transition-colors">
                          <div className="w-[120%] h-[120%] absolute -left-10 -bottom-10 bg-gradient-to-tl from-surface/50 to-transparent border-t border-r border-white/10 rounded-tr-[3rem] shadow-[20px_-20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500 ease-out flex items-center justify-center">
                            <div className="flex flex-col items-center opacity-40">
                              <span className="material-symbols-outlined text-[80px] mb-4 text-secondary">smart_toy</span>
                              <span className="font-label-lg font-medium tracking-widest uppercase">Dashboard Wireframes & UI</span>
                            </div>
                          </div>
                        </div>
                      </a>

                      {/* Project 3: Movie Ticket Booking */}
                      <a href="https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1" target="_blank" rel="noreferrer" className="group rounded-2xl bg-surface/40 hover:bg-surface border border-white/5 hover:border-tertiary/50 hover:shadow-[0_0_50px_-20px_rgba(var(--tertiary-rgb),0.3)] transition-all overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-5/12 p-8 md:p-12 flex flex-col justify-center">
                          <p className="font-label-sm tracking-widest uppercase text-tertiary mb-2 flex flex-wrap gap-x-2 gap-y-1 items-center">
                            <span>Mobile</span>
                          </p>
                          <h4 className="font-display-sm text-2xl md:text-3xl font-bold text-on-surface mb-4 group-hover:text-tertiary transition-colors">Movie Ticket Booking App</h4>
                          <p className="font-body-md text-on-surface-variant mb-6 text-base md:text-lg">
                            An end-to-end event and movie ticketing application built with a frictionless booking pipeline.
                          </p>
                          <div className="flex flex-col gap-2 mb-8">
                            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Design Contribution</span>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-surface-variant/50 rounded text-xs text-on-surface">End-to-End Design</span>
                              <span className="px-3 py-1 bg-surface-variant/50 rounded text-xs text-on-surface">Component Library</span>
                            </div>
                          </div>
                          <div className="bg-tertiary/5 border border-tertiary/20 rounded-xl p-5 mt-auto">
                            <span className="block text-xs uppercase tracking-widest text-tertiary mb-2 font-bold flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">insights</span> Key Outcome</span>
                            <span className="font-body-md text-on-surface font-medium block mb-4">30% reduction in user drop-off via optimized booking workflow.</span>
                            <span className="font-label-md text-tertiary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform w-max">
                              Open in Figma <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                            </span>
                          </div>
                        </div>
                        <div className="w-full md:w-7/12 min-h-[400px] relative bg-[#111] p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/5 overflow-hidden group-hover:bg-[#161616] transition-colors">
                          <div className="w-[120%] h-[120%] absolute -right-10 -bottom-10 bg-gradient-to-tr from-surface/50 to-transparent border-t border-l border-white/10 rounded-tl-[3rem] shadow-[-20px_-20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500 ease-out flex items-center justify-center">
                            <div className="flex flex-col items-center opacity-40">
                              <span className="material-symbols-outlined text-[80px] mb-4 text-tertiary">confirmation_number</span>
                              <span className="font-label-lg font-medium tracking-widest uppercase">Booking Flow & UI Kit</span>
                            </div>
                          </div>
                        </div>
                      </a>

                      {/* Project 4: Expensify */}
                      <a href="https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1" target="_blank" rel="noreferrer" className="group rounded-2xl bg-surface/40 hover:bg-surface border border-white/5 hover:border-gray-400/50 hover:shadow-[0_0_50px_-20px_rgba(150,150,150,0.3)] transition-all overflow-hidden flex flex-col md:flex-row-reverse">
                        <div className="w-full md:w-5/12 p-8 md:p-12 flex flex-col justify-center">
                          <p className="font-label-sm tracking-widest uppercase text-gray-400 mb-2 flex flex-wrap gap-x-2 gap-y-1 items-center">
                            <span>Mobile</span>
                          </p>
                          <h4 className="font-display-sm text-2xl md:text-3xl font-bold text-on-surface mb-4 group-hover:text-gray-400 transition-colors">Expensify: Budget Tracker</h4>
                          <p className="font-body-md text-on-surface-variant mb-6 text-base md:text-lg">
                            A highly optimized consumer finance application prioritizing rapid data entry and clear analytics.
                          </p>
                          <div className="flex flex-col gap-2 mb-8">
                            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Design Contribution</span>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-surface-variant/50 rounded text-xs text-on-surface">UX Optimization</span>
                              <span className="px-3 py-1 bg-surface-variant/50 rounded text-xs text-on-surface">Rapid Prototyping</span>
                            </div>
                          </div>
                          <div className="bg-gray-400/5 border border-gray-400/20 rounded-xl p-5 mt-auto">
                            <span className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">insights</span> Key Outcome</span>
                            <span className="font-body-md text-on-surface font-medium block mb-4">17+ screens refined, bringing average "Add Expense" transaction below 5s.</span>
                            <span className="font-label-md text-gray-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform w-max">
                              Open in Figma <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                            </span>
                          </div>
                        </div>
                        <div className="w-full md:w-7/12 min-h-[400px] relative bg-[#111] p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-r border-white/5 overflow-hidden group-hover:bg-[#161616] transition-colors">
                          <div className="w-[120%] h-[120%] absolute -left-10 -bottom-10 bg-gradient-to-tl from-surface/50 to-transparent border-t border-r border-white/10 rounded-tr-[3rem] shadow-[20px_-20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500 ease-out flex items-center justify-center">
                            <div className="flex flex-col items-center opacity-40">
                              <span className="material-symbols-outlined text-[80px] mb-4 text-gray-400">account_balance_wallet</span>
                              <span className="font-label-lg font-medium tracking-widest uppercase">Analytics & Data Entry UI</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </section>

                </div>
              </div>
            )}

            {windowState === 'closed' && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] aspect-[16/9] flex flex-col items-center justify-center p-12">
                <h1 className="font-display-md text-display-md text-on-background mb-4">Oops, you closed the workspace!</h1>
                <button onClick={() => setWindowState('normal')} className="px-6 py-3 bg-surface-variant/50 hover:bg-surface-variant text-on-surface rounded-lg transition-colors">Re-open Workspace</button>
              </div>
            )}
          </div>

          {windowState === 'maximized' && (
            <div className="fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-center animate-in zoom-in-95">
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <div onClick={() => setWindowState('closed')} className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:scale-110 transition-transform" title="Close"></div>
                <div onClick={() => setWindowState('minimized')} className="w-3 h-3 rounded-full bg-yellow-400 cursor-pointer hover:scale-110 transition-transform" title="Minimize"></div>
                <div onClick={() => setWindowState('normal')} className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:scale-110 transition-transform" title="Restore"></div>
              </div>

              <div className="text-center flex flex-col items-center gap-6">
                <h1 className="font-display-lg text-display-lg text-on-background tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 m-0 leading-none">
                  VARUN SEHGAL
                </h1>
                <h2 className="font-headline-lg text-headline-lg text-on-surface-variant m-0 mt-2">
                  UI/UX DESIGNER
                </h2>
                <div className="mt-12">
                  <Link to="/about" className="group relative px-8 py-4 bg-primary text-on-primary font-label-md text-label-md rounded-lg overflow-hidden transition-transform hover:scale-[1.02] flex items-center gap-3">
                    <span className="relative z-10 font-semibold tracking-wider">Open Workspace</span>
                    <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {windowState === 'minimized' && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-4 animate-in slide-in-from-bottom">
              <div onClick={() => setWindowState('normal')} className="w-16 h-16 bg-surface-variant rounded-xl border border-white/20 shadow-2xl cursor-pointer hover:-translate-y-2 transition-transform flex items-center justify-center group">
                <span className="font-label-sm text-on-surface opacity-50 group-hover:opacity-100 transition-opacity">Restore</span>
              </div>
            </div>
          )}


        </main>
      </div>
    </div>
  );
}

