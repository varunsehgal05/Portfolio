import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ZoomWidget } from "../components/ZoomWidget";

export const Route = createFileRoute('/skills')({
  head: () => ({
    meta: [
      { title: 'Skills Component Library - Varun Sehgal' },
      { name: "description", content: 'A component library of design and engineering skills, from research to prototyping.' },
      { property: "og:title", content: 'Skills Component Library - Varun Sehgal' },
      { property: "og:description", content: 'A component library of design and engineering skills, from research to prototyping.' },
    ],
  }),
  component: Skills,
});

function Skills() {
  const [currentScale, setCurrentScale] = useState(1);
  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md text-body-md">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-12 bg-surface dark:bg-surface-dim border-b border-outline-variant/10 backdrop-blur-3xl flat no shadows">
        <div className="flex items-center gap-6">
          <div className="font-headline-md text-headline-md font-bold text-on-surface dark:text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">design_services</span>
            StudioPro
          </div>

        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-variant/20 transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-variant/20 transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '\'FILL\' 1' }}>play_arrow</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-variant/20 transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">cloud_done</span>
          </button>
          <div className="w-7 h-7 rounded-full overflow-hidden ml-2 border border-outline-variant/30 bg-zinc-900">
            <img alt="Varun Sehgal avatar" className="w-full h-full object-cover object-top" src="/varun.jpg" onError={(e) => { (e.target as HTMLImageElement).src = '/varun.jpeg'; }} />
          </div>
        </div>
      </header>
      <div className="flex-1 flex pt-12 relative w-full h-[calc(100vh-48px)]">

        <aside className="fixed left-0 top-12 bottom-0 w-64 z-40 flex flex-col py-4 bg-surface-container-low/80 dark:bg-surface-container-low/80 border-r border-outline-variant/10 backdrop-blur-xl">
          <div className="px-4 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center border border-outline-variant/20">
              <span className="material-symbols-outlined text-tertiary text-[18px]">space_dashboard</span>
            </div>
            <div>
              <h2 className="font-label-md text-label-md font-bold text-on-surface">Creative Workspace</h2>
              <p className="font-caption text-caption text-on-surface-variant">V1.0.4 - Draft</p>
            </div>
          </div>
          <nav className="flex-1 flex flex-col gap-1 px-2">
            <a className="flex items-center gap-3 px-2 py-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all rounded" href="#">
              <span className="material-symbols-outlined text-[18px]">layers</span>
              Layers
            </a>
            <a className="flex items-center gap-3 py-2 font-label-md text-label-md text-tertiary font-bold border-l-2 border-tertiary pl-2 bg-surface-container-high/50 rounded-r translate-x-1 duration-200" href="#">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '\'FILL\' 1' }}>category</span>
              Assets
            </a>
            <a className="flex items-center gap-3 px-2 py-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all rounded" href="#">
              <span className="material-symbols-outlined text-[18px]">description</span>
              Pages
            </a>
            <a className="flex items-center gap-3 px-2 py-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all rounded" href="#">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </a>
          </nav>
          <div className="px-4 mt-auto">
            <button className="w-full py-2 bg-tertiary text-on-tertiary font-label-md text-label-md font-bold rounded hover:bg-tertiary-fixed-dim transition-colors">
              Publish
            </button>
          </div>
        </aside>

        <main className="flex-1 ml-64 mr-72 relative canvas-bg overflow-auto flex items-center justify-center p-8">

          <div
            className="relative bg-surface-dim border border-outline-variant/10 rounded-xl p-8 figma-selection w-full max-w-4xl shadow-2xl transition-transform duration-150 origin-center"
            style={{ transform: `scale(${currentScale})` }}
          >

            <div className="absolute -top-6 left-0 font-label-md text-label-md text-secondary flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">cloud_download</span>
              Skills Component Library
            </div>

            <div className="figma-handle -top-[4px] -left-[4px]"></div>
            <div className="figma-handle -top-[4px] left-1/2 -translate-x-1/2"></div>
            <div className="figma-handle -top-[4px] -right-[4px]"></div>
            <div className="figma-handle top-1/2 -translate-y-1/2 -right-[4px]"></div>
            <div className="figma-handle -bottom-[4px] -right-[4px]"></div>
            <div className="figma-handle -bottom-[4px] left-1/2 -translate-x-1/2"></div>
            <div className="figma-handle -bottom-[4px] -left-[4px]"></div>
            <div className="figma-handle top-1/2 -translate-y-1/2 -left-[4px]"></div>

            <header className="mb-8">
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Skill Arsenal</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">A library of technical proficiencies structured as deployable components.</p>
            </header>
            <div className="space-y-12">

              {/* UX Category */}
              <section>
                <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-2">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-widest text-sm">UX</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-panel p-4 rounded-xl border border-white/5 bg-surface-container/30 flex justify-between items-center group hover:bg-surface-container/50 transition-colors">
                    <div>
                      <h3 className="font-bold text-on-surface mb-1">Information Architecture</h3>
                      <p className="text-xs text-on-surface-variant font-medium">Mapped flow for 17+ screens</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">Expensify</span>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5 bg-surface-container/30 flex justify-between items-center group hover:bg-surface-container/50 transition-colors">
                    <div>
                      <h3 className="font-bold text-on-surface mb-1">User Flows</h3>
                      <p className="text-xs text-on-surface-variant font-medium">Reduced drop-off by 30%</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">EventFlow</span>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5 bg-surface-container/30 flex justify-between items-center group hover:bg-surface-container/50 transition-colors">
                    <div>
                      <h3 className="font-bold text-on-surface mb-1">User Research</h3>
                      <p className="text-xs text-on-surface-variant font-medium">Conducted contextual inquiries</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">SaaS MVP</span>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5 bg-surface-container/30 flex justify-between items-center group hover:bg-surface-container/50 transition-colors">
                    <div>
                      <h3 className="font-bold text-on-surface mb-1">Usability Testing</h3>
                      <p className="text-xs text-on-surface-variant font-medium">Achieved zero-friction adoption</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">AI Platform</span>
                  </div>
                </div>
              </section>

              {/* UI Category */}
              <section>
                <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-2">
                  <span className="material-symbols-outlined text-secondary">design_services</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-widest text-sm">UI</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-panel p-4 rounded-xl border border-secondary/20 bg-secondary/5 flex justify-between items-center group hover:bg-secondary/10 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
                    <div>
                      <h3 className="font-bold text-on-surface mb-1 pl-2">Design Systems</h3>
                      <p className="text-xs text-on-surface-variant font-medium pl-2">50+ components built & documented</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-1 rounded">EventFlow</span>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5 bg-surface-container/30 flex justify-between items-center group hover:bg-surface-container/50 transition-colors">
                    <div>
                      <h3 className="font-bold text-on-surface mb-1">Visual Design</h3>
                      <p className="text-xs text-on-surface-variant font-medium">Electric Neo-Brutalist Aesthetic</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-1 rounded">CodeSrijan</span>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5 bg-surface-container/30 flex justify-between items-center group hover:bg-surface-container/50 transition-colors">
                    <div>
                      <h3 className="font-bold text-on-surface mb-1">Interaction Design</h3>
                      <p className="text-xs text-on-surface-variant font-medium">Sub-5s Add Expense Action</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-1 rounded">Expensify</span>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5 bg-surface-container/30 flex justify-between items-center group hover:bg-surface-container/50 transition-colors">
                    <div>
                      <h3 className="font-bold text-on-surface mb-1">Responsive Design</h3>
                      <p className="text-xs text-on-surface-variant font-medium">Mobile-first approach</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-1 rounded">Web App</span>
                  </div>
                </div>
              </section>

              {/* PROTOTYPING Category */}
              <section>
                <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-2">
                  <span className="material-symbols-outlined text-tertiary">animation</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-widest text-sm">PROTOTYPING</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-panel p-4 rounded-xl border border-white/5 bg-surface-container/30">
                    <h3 className="font-bold text-on-surface mb-2">Wireframing</h3>
                    <div className="w-full h-1.5 bg-surface-variant rounded-full mt-2"><div className="w-[95%] h-full bg-tertiary rounded-full shadow-[0_0_8px_rgba(var(--tertiary-rgb),0.6)]"></div></div>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5 bg-surface-container/30">
                    <h3 className="font-bold text-on-surface mb-2">Rapid Prototyping</h3>
                    <div className="w-full h-1.5 bg-surface-variant rounded-full mt-2"><div className="w-[90%] h-full bg-tertiary rounded-full shadow-[0_0_8px_rgba(var(--tertiary-rgb),0.6)]"></div></div>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5 bg-surface-container/30">
                    <h3 className="font-bold text-on-surface mb-2">High-Fidelity</h3>
                    <div className="w-full h-1.5 bg-surface-variant rounded-full mt-2"><div className="w-[95%] h-full bg-tertiary rounded-full shadow-[0_0_8px_rgba(var(--tertiary-rgb),0.6)]"></div></div>
                  </div>
                </div>
              </section>

              {/* TOOLS & AI Category */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-2">
                    <span className="material-symbols-outlined text-on-surface">dashboard_customize</span>
                    <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-widest text-sm">TOOLS</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-on-surface">Figma</span>
                    <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-on-surface">Adobe XD</span>
                    <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-on-surface">Photoshop</span>
                    <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-on-surface">Illustrator</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-2">
                    <span className="material-symbols-outlined text-primary">smart_toy</span>
                    <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-widest text-sm">AI-AUGMENTED DESIGN</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-medium">Uizard</span>
                    <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-medium">Galileo AI</span>
                    <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-medium">Visily</span>
                    <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-medium">Figma Magician</span>
                    <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-medium">Figma Automator</span>
                    <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-medium">ChatGPT / Claude</span>
                  </div>
                </div>
              </section>
            </div>
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

        <aside className="fixed right-0 top-12 bottom-0 w-72 z-40 flex flex-col py-4 bg-surface-container-low/80 dark:bg-surface-container-low/80 border-l border-outline-variant/10 backdrop-blur-xl">

          <div className="flex border-b border-outline-variant/10 px-4 mb-4">
            <button className="flex-1 pb-2 font-label-md text-label-md text-secondary font-bold border-b-2 border-secondary scale-98 duration-100 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Design
            </button>
            <button className="flex-1 pb-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              Prototype
            </button>
            <button className="flex-1 pb-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px]">code</span>
              Inspect
            </button>
          </div>

          <div className="px-4 mb-6 pb-4 border-b border-outline-variant/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded border border-secondary/30 flex items-center justify-center bg-secondary/5">
                <span className="material-symbols-outlined text-secondary text-[18px]">cloud_download</span>
              </div>
              <div>
                <h2 className="font-label-md text-label-md font-bold text-on-surface">Properties</h2>
                <p className="font-caption text-caption text-secondary">Frame Selected</p>
              </div>
            </div>
          </div>

          <div className="px-4 flex-1 overflow-y-auto space-y-6">

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-label-md text-label-md text-on-surface-variant font-bold">Layout</h3>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">add</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-surface-container-high rounded p-2 flex items-center gap-2 border border-outline-variant/20 hover:border-secondary/50 cursor-text transition-colors">
                  <span className="font-caption text-caption text-on-surface-variant w-4">W</span>
                  <span className="font-label-md text-label-md text-on-surface">896</span>
                </div>
                <div className="bg-surface-container-high rounded p-2 flex items-center gap-2 border border-outline-variant/20 hover:border-secondary/50 cursor-text transition-colors">
                  <span className="font-caption text-caption text-on-surface-variant w-4">H</span>
                  <span className="font-label-md text-label-md text-on-surface">Mixed</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-label-md text-label-md text-on-surface-variant font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">view_agenda</span> Auto layout
                </h3>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">remove</span>
              </div>
              <div className="bg-surface-container-high rounded p-3 border border-outline-variant/20 space-y-3">
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <button className="w-6 h-6 rounded hover:bg-surface-variant flex items-center justify-center text-on-surface-variant"><span className="material-symbols-outlined text-[14px]">arrow_downward</span></button>
                    <button className="w-6 h-6 rounded bg-surface-variant flex items-center justify-center text-on-surface"><span className="material-symbols-outlined text-[14px]">arrow_forward</span></button>
                    <button className="w-6 h-6 rounded hover:bg-surface-variant flex items-center justify-center text-on-surface-variant"><span className="material-symbols-outlined text-[14px]">wrap_text</span></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-on-surface-variant">format_align_justify</span>
                    <span className="font-label-md text-label-md text-on-surface">48</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-on-surface-variant">padding</span>
                    <span className="font-label-md text-label-md text-on-surface">32</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-label-md text-label-md text-on-surface-variant font-bold">Fill</h3>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">add</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-outline-variant/30 bg-[#121414]"></div>
                <span className="font-label-md text-label-md text-on-surface uppercase flex-1">121414</span>
                <span className="font-label-md text-label-md text-on-surface-variant">100%</span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant hover:text-on-surface cursor-pointer">visibility</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-label-md text-label-md text-on-surface-variant font-bold">Stroke</h3>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">add</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 rounded border border-outline-variant/30 bg-[#5b4039]"></div>
                <span className="font-label-md text-label-md text-on-surface uppercase flex-1">5B4039</span>
                <span className="font-label-md text-label-md text-on-surface-variant">10%</span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant hover:text-on-surface cursor-pointer">visibility</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant">border_outer</span>
                <span className="font-label-md text-label-md text-on-surface">1</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

    </div>
  );
}
