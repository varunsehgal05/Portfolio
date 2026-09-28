const fs = require('fs');
const content = `
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { TopNav } from "@/components/TopNav";
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

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const artboardRef = useRef<HTMLDivElement>(null);
  
  const [currentScale, setCurrentScale] = useState(1);
  const [windowState, setWindowState] = useState('normal'); // 'normal' | 'closed' | 'minimized' | 'maximized'
  const [floatingShapes, setFloatingShapes] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [showAssets, setShowAssets] = useState(false);
  
  const [pan, setPan] = useState({ x: 0, y: 0 });

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
    
    window.addEventListener('reset-workspace', handleReset);
    return () => {
      clearInterval(interval);
      window.removeEventListener('reset-workspace', handleReset);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let isDown = false;
    let startX = 0;
    let startY = 0;

    const onMouseDown = (e) => {
      // Only pan if clicking on the background
      if (e.target === container) {
        isDown = true;
        container.classList.add("cursor-grabbing");
        container.classList.remove("cursor-default");
        startX = e.pageX - pan.x;
        startY = e.pageY - pan.y;
      }
    };

    const onMouseUp = () => {
      isDown = false;
      container.classList.remove("cursor-grabbing");
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      setPan({
        x: e.pageX - startX,
        y: e.pageY - startY
      });
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseleave", onMouseUp);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseleave", onMouseUp);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, [pan]);

  const addStickyNote = () => {
    const colors = ['bg-yellow-200 text-black', 'bg-blue-200 text-black', 'bg-pink-200 text-black'];
    setFloatingShapes(prev => [...prev, {
      id: Date.now(),
      top: (Math.random() * 60 + 10) + '%',
      left: (Math.random() * 60 + 10) + '%',
      color: colors[Math.floor(Math.random() * colors.length)],
      text: 'Note ' + (prev.length + 1)
    }]);
  };

  const updateStickyNote = (id, text) => {
    setFloatingShapes(prev => prev.map(s => s.id === id ? { ...s, text } : s));
  };

  return (
    <div className="text-on-background bg-background h-screen w-screen flex flex-col font-body-md overflow-hidden relative">
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-16 bg-background/60 text-primary font-body-md text-body-md backdrop-blur-3xl border-b border-white/10 no-shadows">
        <div className="flex items-center gap-6">
          <span className="font-headline-md text-headline-md font-bold text-primary">Varun Sehgal Portfolio</span>
          <div className="hidden md:flex gap-4">
            <TopNav />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast("Link copied!"); }} className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1.5 rounded-full transition-colors glow-effect text-label-md font-label-md">Share</button>
          <a href="https://www.linkedin.com/in/varun-sehgal" target="_blank" className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors text-decoration-none">account_circle</a>
        </div>
      </nav>
      
      <div className="flex flex-1 pt-16 h-full relative">
        <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] z-40 flex flex-col py-6 bg-surface/80 text-primary font-label-md text-label-md w-64 backdrop-blur-xl border-r border-white/10 no-shadows hidden md:flex">
          <div className="px-6 mb-8">
            <h2 className="font-label-md text-label-md uppercase tracking-widest text-primary mb-1">Project Files</h2>
            <p className="text-caption text-on-surface-variant">V3 Final Render</p>
          </div>
          <nav className="flex-1 flex flex-col gap-2 px-2">
            <div className="flex items-center gap-3 px-4 py-2 rounded text-primary font-bold border-l-2 border-primary pl-4 bg-surface-variant/20 cursor-default">
              <span className="material-symbols-outlined">layers</span>
              Layers
            </div>
            <div onClick={() => setShowAssets(!showAssets)} className="flex items-center gap-3 px-4 py-2 rounded text-on-surface-variant pl-4 hover:text-on-surface hover:bg-surface-variant/30 transition-colors cursor-pointer">
              <span className="material-symbols-outlined">grid_view</span>
              Assets
            </div>
          </nav>
          <div className="px-6 mt-auto">
            <button onClick={addStickyNote} className="w-full py-2 border border-primary/30 rounded text-primary hover:bg-primary/10 transition-colors glow-effect flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Note
            </button>
          </div>
        </aside>

        {showAssets && (
          <div className="fixed left-64 top-16 h-[calc(100vh-64px)] w-64 bg-surface border-r border-white/10 z-30 p-6 flex flex-col gap-6 animate-in slide-in-from-left">
            <h3 className="font-headline-sm text-primary">Design Assets</h3>
            
            <div>
              <p className="font-label-sm text-on-surface-variant mb-2">Color Palette</p>
              <div className="flex gap-2 mb-2">
                <div className="w-8 h-8 rounded bg-primary border border-white/10"></div>
                <div className="w-8 h-8 rounded bg-secondary border border-white/10"></div>
                <div className="w-8 h-8 rounded bg-background border border-white/10"></div>
                <div className="w-8 h-8 rounded bg-surface border border-white/10"></div>
              </div>
            </div>

            <div>
              <p className="font-label-sm text-on-surface-variant mb-2">Typography</p>
              <p className="font-display-sm text-on-surface">Space Grotesk</p>
              <p className="font-body-md text-on-surface-variant">Manrope</p>
            </div>
          </div>
        )}
        
        <main ref={containerRef} className="flex-1 md:ml-64 relative bg-[#0A0A0A] overflow-hidden flex items-center justify-center cursor-default" id="canvas-container">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", 
            backgroundSize: "24px 24px",
            backgroundPosition: `${pan.x}px ${pan.y}px`
          }}></div>
          
          <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${currentScale})`, transformOrigin: 'center center' }} className="w-full h-full absolute inset-0 flex items-center justify-center transition-transform duration-75">
            {floatingShapes.map(shape => (
              <div key={shape.id} className={`absolute w-32 h-32 rounded shadow-lg p-2 flex flex-col cursor-move ${shape.color}`} style={{ top: shape.top, left: shape.left }}>
                <div className="flex-1">
                  <textarea 
                    value={shape.text} 
                    onChange={(e) => updateStickyNote(shape.id, e.target.value)}
                    className="w-full h-full bg-transparent resize-none outline-none font-body-sm" 
                  />
                </div>
              </div>
            ))}

            {windowState === 'normal' && (
              <div ref={artboardRef} className="relative w-[80vw] max-w-[1200px] aspect-[16/9] bg-surface-container/50 backdrop-blur-[20px] border border-white/10 rounded-xl flex flex-col items-center justify-center p-12 overflow-hidden shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"></div>
                  <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px]"></div>
                </div>
                <div className="z-10 text-center flex flex-col items-center gap-6">
                  <div title={"Local Time: " + currentTime} className="cursor-help px-4 py-1.5 rounded-full bg-surface-variant/30 border border-white/5 font-label-md text-label-md text-primary tracking-widest uppercase mb-4 inline-block">
                    Status: Online
                  </div>
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
                      <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                    </Link>
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <div onClick={() => setWindowState('closed')} className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:scale-110 transition-transform" title="Close"></div>
                  <div onClick={() => setWindowState('minimized')} className="w-3 h-3 rounded-full bg-yellow-400 cursor-pointer hover:scale-110 transition-transform" title="Minimize"></div>
                  <div onClick={() => setWindowState('maximized')} className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:scale-110 transition-transform" title="Maximize"></div>
                </div>
                <div className="absolute bottom-4 right-4 font-label-md text-caption text-on-surface-variant/50">
                  1920 × 1080
                </div>
              </div>
            )}

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

            {windowState === 'closed' && (
              <div className="relative w-[80vw] max-w-[800px] aspect-[16/9] flex flex-col items-center justify-center p-12">
                 <h1 className="font-display-md text-display-md text-on-background mb-4">Oops, you closed the workspace!</h1>
                 <button onClick={() => setWindowState('normal')} className="px-6 py-3 bg-surface-variant/50 hover:bg-surface-variant text-on-surface rounded-lg transition-colors">Re-open Workspace</button>
              </div>
            )}
          </div>
          
          {windowState === 'minimized' && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-4 animate-in slide-in-from-bottom">
              <div onClick={() => setWindowState('normal')} className="w-16 h-16 bg-surface-variant rounded-xl border border-white/20 shadow-2xl cursor-pointer hover:-translate-y-2 transition-transform flex items-center justify-center group">
                <span className="font-label-sm text-on-surface opacity-50 group-hover:opacity-100 transition-opacity">Restore</span>
              </div>
            </div>
          )}

          <div className="absolute bottom-8 right-8 flex gap-2 bg-surface-container/80 backdrop-blur-md border border-white/10 rounded-lg p-1 z-20">
            <button onClick={() => setCurrentScale(s => Math.max(s - 0.1, 0.2))} className="p-2 hover:bg-white/10 rounded text-on-surface-variant transition-colors" title="Zoom Out">
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>
            <div className="px-3 flex items-center font-label-md text-caption text-on-background border-l border-r border-white/10">
              {Math.round(currentScale * 100)}%
            </div>
            <button onClick={() => setCurrentScale(s => Math.min(s + 0.1, 2))} className="p-2 hover:bg-white/10 rounded text-on-surface-variant transition-colors" title="Zoom In">
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
`
fs.writeFileSync('src/routes/index.tsx', content, 'utf8');
