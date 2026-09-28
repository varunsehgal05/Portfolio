import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ZoomWidget } from "../components/ZoomWidget";
export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Varun_Sehgal_Portfolio.fig - Awards & Certificates" },
      { name: "description", content: "Recognition and credentials: certifications, hackathon victories, and professional milestones." },
      { property: "og:title", content: "Varun_Sehgal_Portfolio.fig - Awards & Certificates" },
      { property: "og:description", content: "Recognition and credentials: certifications, hackathon victories, and professional milestones." },
    ],
  }),
  component: Awards,
});

function Awards() {
  const [selected, setSelected] = useState<number | null>(null);
  const [currentScale, setCurrentScale] = useState(1);

  const cards = [0, 1, 2, 3];

  return (
    <div className="font-body-md h-screen w-screen flex flex-col">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-16 bg-surface dark:bg-surface border-b border-outline-variant/10 backdrop-blur-3xl bg-surface/60">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-[24px]">menu</span>
          <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary tracking-tight">Spectral Chroma</span>
          <div className="h-4 w-px bg-outline-variant/30 mx-2"></div>
          <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">folder</span>
            Varun_Sehgal_Portfolio.fig
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">settings</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">account_circle</span>
          </div>
          <button className="bg-primary-container text-on-primary-container font-label-md text-label-md px-4 py-2 rounded flex items-center gap-2 hover:bg-primary transition-colors">
            Share
          </button>
        </div>
      </header>
      <div className="flex flex-1 pt-16 overflow-hidden h-full">
        <aside className="fixed left-0 top-16 bottom-0 w-64 z-40 flex flex-col p-4 bg-surface dark:bg-surface-container-low border-r border-outline-variant/10 backdrop-blur-2xl bg-surface/80">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-label-md text-label-md text-primary">Project Alpha</h2>
              <p className="font-caption text-caption text-on-surface-variant mt-1">Creative Portfolio</p>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1">
              <li>
                <a className="flex items-center gap-3 px-3 py-2 text-primary font-bold bg-primary-container/10 rounded-lg" href="#">
                  <span className="material-symbols-outlined text-[18px]">layers</span>
                  <span className="font-label-md text-label-md font-body-md text-body-md">Layers</span>
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded-lg" href="#">
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  <span className="font-label-md text-label-md font-body-md text-body-md">Assets</span>
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded-lg" href="#">
                  <span className="material-symbols-outlined text-[18px]">description</span>
                  <span className="font-label-md text-label-md font-body-md text-body-md">Pages</span>
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded-lg" href="#">
                  <span className="material-symbols-outlined text-[18px]">history</span>
                  <span className="font-label-md text-label-md font-body-md text-body-md">History</span>
                </a>
              </li>
            </ul>
            <div className="mt-8 border-t border-outline-variant/20 pt-4">
              <p className="font-caption text-caption text-on-surface-variant mb-2 px-3 uppercase tracking-widest">Frames</p>
              <ul className="space-y-1">
                <li>
                  <a className="flex items-center gap-3 px-3 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded" href="#">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">crop_din</span>
                    <span className="font-body-md text-[14px]">Intro Splash</span>
                  </a>
                </li>
                <li>
                  <a className="flex items-center gap-3 px-3 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded" href="#">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">crop_din</span>
                    <span className="font-body-md text-[14px]">Projects Grid</span>
                  </a>
                </li>
                <li>
                  <a className="flex items-center gap-3 px-3 py-1.5 text-on-surface bg-surface-variant/30 rounded border border-outline-variant/30" href="#">
                    <span className="material-symbols-outlined text-[16px] text-primary">crop_din</span>
                    <span className="font-body-md text-[14px] font-medium">Awards & Certs</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="mt-auto pt-4">
            <button className="w-full border border-primary text-primary font-label-md text-label-md py-2 rounded flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Layer
            </button>
          </div>
        </aside>
        <main className="flex-1 ml-64 mr-72 bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center justify-center p-8">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundSize: "40px 40px", backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)" }}>
          </div>
          <div
            className="relative z-10 w-full max-w-[1000px] h-auto bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-2xl flex flex-col transition-transform duration-150 origin-center"
            style={{ transform: `scale(${currentScale})` }}
          >
            <div className="absolute -top-6 left-0 font-label-md text-caption text-primary"># Awards & Certificates</div>
            <div className="p-12 flex-1 overflow-y-auto">
              <header className="mb-12 border-b border-outline-variant/20 pb-6">
                <h1 className="font-headline-lg text-headline-lg text-on-surface">Recognition & Credentials</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">A curated collection of technical certifications, hackathon victories, and professional milestones.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="md:col-span-2 glass-panel rounded-xl p-8 card-glow group relative overflow-hidden flex flex-col justify-end min-h-[300px]"
                  style={selected === 0 ? { borderColor: "#ffb5a1" } : undefined}
                  onClick={() => setSelected(0)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-primary-container/20 rounded-lg flex items-center justify-center mb-6 border border-primary/30">
                      <span className="material-symbols-outlined text-[24px] text-primary">emoji_events</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-2">CodeSrijan (Co-Organizer)</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-md">Designed the end-to-end hackathon platform and branding, contributing to over 200+ successful participant registrations and a flawless technical execution.</p>
                    <div className="flex gap-2">
                      <span className="font-label-md text-caption bg-primary/10 text-primary px-3 py-1 rounded">Co-Organizer</span>
                      <span className="font-label-md text-caption bg-secondary/10 text-secondary px-3 py-1 rounded">April 2026</span>
                    </div>
                  </div>
                </div>
                <div
                  className="glass-panel rounded-xl p-6 card-glow flex flex-col"
                  style={selected === 1 ? { borderColor: "#ffb5a1" } : undefined}
                  onClick={() => setSelected(1)}
                >
                  <div className="w-10 h-10 bg-secondary-container/20 rounded-lg flex items-center justify-center mb-4 border border-secondary/30">
                    <span className="material-symbols-outlined text-[20px] text-secondary">workspace_premium</span>
                  </div>
                  <h3 className="font-body-lg text-body-lg font-medium text-on-surface mb-2">Code Conquerors (2nd Runner-up)</h3>
                  <p className="font-caption text-caption text-on-surface-variant flex-1">Secured podium finish out of 50+ competing teams by delivering a highly intuitive and technically complex UI prototype.</p>
                  <div className="mt-4 font-label-md text-caption text-outline">Issued: Apr 2025</div>
                </div>
                <div
                  className="glass-panel rounded-xl p-6 card-glow flex flex-col"
                  style={selected === 2 ? { borderColor: "#ffb5a1" } : undefined}
                  onClick={() => setSelected(2)}
                >
                  <div className="w-10 h-10 bg-tertiary-container/20 rounded-lg flex items-center justify-center mb-4 border border-tertiary/30">
                    <span className="material-symbols-outlined text-[20px] text-tertiary">brush</span>
                  </div>
                  <h3 className="font-body-lg text-body-lg font-medium text-on-surface mb-2">Design System Mastery</h3>
                  <p className="font-caption text-caption text-on-surface-variant flex-1">Crafted robust component libraries used across major platforms leading to 45% faster internal UI development.</p>
                  <div className="mt-4 font-label-md text-caption text-outline">Issued: Mar 2023</div>
                </div>
                <div
                  className="md:col-span-2 glass-panel rounded-xl p-6 card-glow flex items-center gap-6"
                  style={selected === 3 ? { borderColor: "#ffb5a1" } : undefined}
                  onClick={() => setSelected(3)}
                >
                  <div className="w-16 h-16 bg-surface-variant rounded-full flex items-center justify-center flex-shrink-0 border border-outline-variant/50">
                    <span className="material-symbols-outlined text-[32px] text-on-surface">workspace_premium</span>
                  </div>
                  <div>
                    <h3 className="font-body-lg text-body-lg font-medium text-on-surface mb-1">UI/UX Design Excellence Award</h3>
                    <p className="font-caption text-caption text-on-surface-variant">Recognized by the Awwwards jury for outstanding achievement in web design, creativity, and technical execution for the Spectral Chroma portfolio project.</p>
                  </div>
                </div>
              </div>
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
        <aside className="fixed right-0 top-16 bottom-0 w-72 z-40 flex flex-col p-4 bg-surface dark:bg-surface-container-low border-l border-outline-variant/10 backdrop-blur-2xl bg-surface/80">
          <div className="flex border-b border-outline-variant/20 mb-4">
            <button className="flex-1 py-2 text-primary font-bold border-b-2 border-primary flex items-center justify-center gap-2 hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[16px]">edit</span>
              <span className="font-label-md text-label-md">Design</span>
            </button>
            <button className="flex-1 py-2 text-on-surface-variant flex items-center justify-center gap-2 hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[16px]">play_arrow</span>
              <span className="font-label-md text-label-md">Prototype</span>
            </button>
            <button className="flex-1 py-2 text-on-surface-variant flex items-center justify-center gap-2 hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[16px]">code</span>
              <span className="font-label-md text-label-md">Inspect</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-label-md text-caption text-on-surface-variant font-medium">Layout</span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">more_horiz</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="flex items-center gap-2 bg-surface-dim p-1.5 rounded border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant">width</span>
                  <span className="font-label-md text-caption text-on-surface">1000</span>
                </div>
                <div className="flex items-center gap-2 bg-surface-dim p-1.5 rounded border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant">height</span>
                  <span className="font-label-md text-caption text-on-surface">800</span>
                </div>
              </div>
            </div>
            <div className="border-t border-outline-variant/20 pt-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-label-md text-caption text-on-surface-variant font-medium">Fill</span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">add</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-outline-variant/50 bg-[#0c0f0f]"></div>
                <span className="font-label-md text-caption text-on-surface">0C0F0F</span>
                <span className="font-label-md text-caption text-on-surface-variant ml-auto">100%</span>
              </div>
            </div>
            <div className="border-t border-outline-variant/20 pt-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-label-md text-caption text-on-surface-variant font-medium">Stroke</span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">add</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-outline-variant/50 bg-[#5b4039]"></div>
                <span className="font-label-md text-caption text-on-surface">5B4039</span>
                <span className="font-label-md text-caption text-on-surface-variant ml-auto">30%</span>
              </div>
            </div>
            <div className="border-t border-outline-variant/20 pt-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-label-md text-caption text-on-surface-variant font-medium">Effects</span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">add</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-primary">blur_on</span>
                    <span className="font-caption text-caption text-on-surface">Background Blur</span>
                  </div>
                  <span className="font-label-md text-caption text-on-surface-variant">20</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-on-surface-variant">light_mode</span>
                    <span className="font-caption text-caption text-on-surface">Drop Shadow</span>
                  </div>
                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant cursor-pointer">visibility_off</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

    </div>
  );
}
