import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ZoomWidget } from "../components/ZoomWidget";

function Process() {
  const mainRef = useRef<HTMLElement | null>(null);
  const [isDown, setIsDown] = useState(false);
  const [currentScale, setCurrentScale] = useState(1);
  const dragState = useRef({ startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    const el = mainRef.current;
    if (!el) return;
    setIsDown(true);
    dragState.current.startX = e.pageX - el.offsetLeft;
    dragState.current.startY = e.pageY - el.offsetTop;
    dragState.current.scrollLeft = el.scrollLeft;
    dragState.current.scrollTop = el.scrollTop;
  };

  const onMouseLeave = () => setIsDown(false);
  const onMouseUp = () => setIsDown(false);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = mainRef.current;
    if (!isDown || !el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const y = e.pageY - el.offsetTop;
    const walkX = (x - dragState.current.startX) * 1.5;
    const walkY = (y - dragState.current.startY) * 1.5;
    el.scrollLeft = dragState.current.scrollLeft - walkX;
    el.scrollTop = dragState.current.scrollTop - walkY;
  };

  return (
    <div className="bg-background text-on-background min-h-screen overflow-hidden flex font-body-md text-body-md selection:bg-primary/30 selection:text-primary">

      <aside className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] z-40 flex-col py-6 backdrop-blur-xl border-r border-white/10 bg-surface/80 w-64">
        <div className="px-6 mb-8 flex flex-col gap-1">
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary">Project Files</span>
          <span className="font-caption text-caption text-on-surface-variant">V3 Final Render</span>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <a className="flex items-center gap-3 py-3 text-primary font-bold border-l-2 border-primary pl-4 font-label-md text-label-md hover:bg-surface-variant/30 active:translate-x-1 transition-transform bg-surface-variant/20" href="#">
            <span className="material-symbols-outlined">layers</span>
            Layers
          </a>
          <a className="flex items-center gap-3 py-3 text-on-surface-variant pl-4 hover:text-on-surface font-label-md text-label-md hover:bg-surface-variant/30 active:translate-x-1 transition-transform" href="#">
            <span className="material-symbols-outlined">grid_view</span>
            Assets
          </a>
        </div>
        <div className="px-6 mt-auto">
          <button className="w-full py-3 border border-white/10 rounded-lg text-primary hover:bg-primary/10 transition-colors font-label-md text-label-md flex justify-center items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Layer
          </button>
        </div>
      </aside>
      <main
        ref={mainRef}
        className={`flex-1 mt-16 md:ml-64 relative overflow-auto figjam-grid w-full h-[calc(100vh-64px)] ${isDown ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <div
          className="relative w-[3600px] h-[2000px] p-24 transition-transform duration-150 origin-top-left"
          style={{ transform: `scale(${currentScale})` }}
        >

          <div className="absolute top-24 left-24 p-8 rounded-xl bg-surface/40 backdrop-blur-2xl border border-white/10 shadow-2xl z-10">
            <h1 className="font-display-lg text-display-lg text-primary mb-4 tracking-tight">End-to-End Product Design Pipeline</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">A rigorous six-step methodology driving projects from unstructured ambiguity to shipped, validated impact. This framework ensures scalable quality and measurable ROI.</p>
          </div>

          {/* SVG Connector Pipeline */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" viewBox="0 0 3600 2000">
            <path d="M 250 850 C 500 850, 450 850, 750 850" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeDasharray="12 12"></path>
            <path d="M 750 850 C 950 850, 950 500, 1150 500" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeDasharray="12 12"></path>
            <path d="M 1150 500 C 1350 500, 1350 1200, 1550 1200" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeDasharray="12 12"></path>
            <path d="M 1550 1200 C 1750 1200, 1750 850, 1950 850" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeDasharray="12 12"></path>
            <path d="M 1950 850 C 2200 850, 2200 850, 2450 850" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeDasharray="12 12"></path>
          </svg>

          {/* 01 DISCOVER */}
          <div className="absolute top-[650px] left-[100px] w-96 border border-white/10 rounded-3xl p-8 bg-surface-container-low/80 backdrop-blur-md shadow-2xl z-10 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center mb-6 text-primary font-bold text-lg group-hover:scale-110 transition-transform">01</div>
            <h2 className="font-headline-lg text-3xl text-on-surface mb-4 font-bold flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">search</span> Discover
            </h2>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">Diving into the problem space to understand user needs, business constraints, and market opportunities through active research.</p>
            <div className="flex flex-wrap gap-2">
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-variant/50 px-2 py-1 rounded">Heuristics</span>
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-variant/50 px-2 py-1 rounded">Contextual Inquiry</span>
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-variant/50 px-2 py-1 rounded">Competitor Audits</span>
            </div>
          </div>

          {/* 02 DEFINE */}
          <div className="absolute top-[650px] left-[600px] w-96 border border-white/10 rounded-3xl p-8 bg-surface-container-low/80 backdrop-blur-md shadow-2xl z-10 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center mb-6 text-secondary font-bold text-lg group-hover:scale-110 transition-transform">02</div>
            <h2 className="font-headline-lg text-3xl text-on-surface mb-4 font-bold flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">gps_fixed</span> Define
            </h2>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">Synthesizing research into clear problem statements, user journeys, and definitive product requirements.</p>
            <div className="flex flex-wrap gap-2">
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-variant/50 px-2 py-1 rounded">Journey Mapping</span>
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-variant/50 px-2 py-1 rounded">Personas</span>
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-variant/50 px-2 py-1 rounded">PRD Alignment</span>
            </div>
          </div>

          {/* 03 EXPLORE */}
          <div className="absolute top-[300px] left-[1000px] w-96 border border-white/10 rounded-3xl p-8 bg-surface-container-low/80 backdrop-blur-md shadow-2xl z-10 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center mb-6 text-tertiary font-bold text-lg group-hover:scale-110 transition-transform">03</div>
            <h2 className="font-headline-lg text-3xl text-on-surface mb-4 font-bold flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary">explore</span> Explore
            </h2>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">Generating multiple divergent concepts. Low-fidelity wireframes, information architecture mapping, and rapid layout testing.</p>
            <div className="flex flex-wrap gap-2">
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-variant/50 px-2 py-1 rounded">Wireframing</span>
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-variant/50 px-2 py-1 rounded">Information Arch</span>
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-variant/50 px-2 py-1 rounded">Crazy 8s</span>
            </div>

            {/* Visual Attachment for Explore */}
            <div className="absolute top-12 -right-48 w-40 p-4 bg-tertiary-container text-on-tertiary-container rounded-lg shadow-lg rotate-[4deg] z-10">
              <p className="font-body-md text-sm">IA mapping saves weeks of dev time in the long run.</p>
            </div>
          </div>

          {/* 04 DESIGN */}
          <div className="absolute top-[1000px] left-[1400px] w-96 border border-white/10 rounded-3xl p-8 bg-surface-container-low/80 backdrop-blur-md shadow-2xl z-10 hover:-translate-y-2 transition-transform duration-300 group border-primary/30 shadow-[0_0_40px_rgba(var(--primary-rgb),0.1)]">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-primary font-bold text-lg group-hover:scale-110 transition-transform">04</div>
            <h2 className="font-headline-lg text-3xl text-on-surface mb-4 font-bold flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">design_services</span> Design
            </h2>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">Converging on the strongest flow and executing high-fidelity interfaces. Establishing component libraries and robust design systems.</p>
            <div className="flex flex-wrap gap-2">
              <span className="font-label-md text-[10px] uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded">Hi-Fi UI</span>
              <span className="font-label-md text-[10px] uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded">Design Systems</span>
              <span className="font-label-md text-[10px] uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded">Prototyping</span>
            </div>
          </div>

          {/* 05 VALIDATE */}
          <div className="absolute top-[650px] left-[1800px] w-96 border border-white/10 rounded-3xl p-8 bg-surface-container-low/80 backdrop-blur-md shadow-2xl z-10 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center mb-6 text-secondary font-bold text-lg group-hover:scale-110 transition-transform">05</div>
            <h2 className="font-headline-lg text-3xl text-on-surface mb-4 font-bold flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">fact_check</span> Validate
            </h2>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">Testing high-fidelity interactive prototypes with real users. Identifying friction points and iterating before committing to code.</p>
            <div className="flex flex-wrap gap-2">
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-variant/50 px-2 py-1 rounded">User Testing</span>
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-variant/50 px-2 py-1 rounded">A/B Testing</span>
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-variant/50 px-2 py-1 rounded">Iteration</span>
            </div>

            {/* Visual Attachment for Validate */}
            <div className="absolute -bottom-16 -left-12 w-48 p-4 bg-error-container text-on-error-container rounded-lg shadow-lg rotate-[-5deg] z-10">
              <p className="font-body-md text-xs font-bold">CRITICAL:</p>
              <p className="font-body-md text-xs mt-1">Never assume. Let user data drive the final decisions.</p>
            </div>
          </div>

          {/* 06 SHIP */}
          <div className="absolute top-[650px] left-[2300px] w-96 border border-white/10 rounded-3xl p-8 bg-[#0A0A0A] backdrop-blur-md shadow-3xl z-10 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-primary via-secondary to-tertiary opacity-30 z-[-1] blur-[2px]"></div>
            <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center mb-6 text-on-surface font-bold text-lg group-hover:scale-110 transition-transform">06</div>
            <h2 className="font-headline-lg text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 font-bold flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">rocket_launch</span> Ship & Measure
            </h2>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">Pixel-perfect engineering handoff. Tracking product launch analytics and measuring business impact against intended goals.</p>
            <div className="flex flex-wrap gap-2">
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-container-high px-2 py-1 rounded border border-white/10">Dev Handoff</span>
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-container-high px-2 py-1 rounded border border-white/10">QA Review</span>
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface bg-surface-container-high px-2 py-1 rounded border border-white/10">Impact Tracking</span>
            </div>
          </div>

        </div>
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:ml-32 flex items-center gap-2 p-2 bg-surface-container-high/80 backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl z-50">
          <button className="p-3 rounded-full hover:bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-colors" title="Select">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>near_me</span>
          </button>
          <button className="p-3 rounded-full hover:bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-colors" title="Hand Tool">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>pan_tool</span>
          </button>
          <div className="w-px h-6 bg-white/10 mx-1"></div>
          <button className="p-3 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors" title="Sticky Note">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>sticky_note_2</span>
          </button>
          <button className="p-3 rounded-full hover:bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-colors" title="Shapes">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>category</span>
          </button>
          <button className="p-3 rounded-full hover:bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-colors" title="Text">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>title</span>
          </button>
          <button className="p-3 rounded-full hover:bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-colors" title="Connector">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>conversion_path</span>
          </button>
        </div>
        <ZoomWidget
          scale={currentScale}
          onZoomIn={() => setCurrentScale(s => Math.min(Number((s + 0.1).toFixed(2)), 2))}
          onZoomOut={() => setCurrentScale(s => Math.max(Number((s - 0.1).toFixed(2)), 0.2))}
          onFitAll={() => setCurrentScale(1)}
          x={0}
          y={0}
          className="bottom-28 right-6 z-[110]"
        />
      </main>

    </div>
  );
}

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Varun Sehgal Portfolio - FigJam Process" },
      { name: "description", content: "Design process, ideation, brainstorming, and user journey mapping shown on a pannable FigJam-style canvas." },
      { property: "og:title", content: "Varun Sehgal Portfolio - FigJam Process" },
      { property: "og:description", content: "Design process, ideation, brainstorming, and user journey mapping shown on a pannable FigJam-style canvas." },
    ],
  }),
  component: Process,
});
