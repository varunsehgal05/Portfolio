import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ZoomWidget } from "../components/ZoomWidget";

function Testimonials() {
  const [currentScale, setCurrentScale] = useState(1);
  return (
    <div className="min-h-screen w-full flex flex-col antialiased">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-16 bg-surface border-b border-outline-variant/10 backdrop-blur-3xl bg-surface/60">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-xl">menu</span>
          <div className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>design_services</span>
            Spectral Chroma
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-surface-variant/30 rounded-full px-3 py-1.5 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-variant/50 transition-all">
            <span className="material-symbols-outlined text-on-surface-variant text-sm mr-2">search</span>
            <input className="bg-transparent border-none outline-none font-caption text-caption text-on-surface w-32 placeholder-on-surface-variant/50" placeholder="Search..." type="text" />
          </div>
          <button className="bg-primary text-on-primary font-label-md text-label-md px-4 py-1.5 rounded-full hover:bg-primary/90 transition-colors hidden sm:block">Share</button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>
      <div className="flex flex-1 pt-16 h-screen w-full relative">
        <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 z-40 flex-col p-4 bg-surface dark:bg-surface-container-low border-r border-outline-variant/10 backdrop-blur-2xl bg-surface/80">
          <div className="flex items-center gap-3 mb-8 p-2">
            <div className="w-10 h-10 rounded bg-primary-container flex items-center justify-center text-on-primary-container font-bold font-label-md">
              PA
            </div>
            <div>
              <h3 className="font-label-md text-label-md text-primary">Project Alpha</h3>
              <p className="font-caption text-caption text-on-surface-variant">Creative Portfolio</p>
            </div>
          </div>
          <nav className="flex-1 flex flex-col gap-2">
            <a className="flex items-center gap-3 p-2 rounded-lg text-primary font-bold bg-primary-container/10 font-label-md text-label-md hover:bg-surface-variant/10 transition-colors" href="#">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>layers</span>
              Layers
            </a>
            <a className="flex items-center gap-3 p-2 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md hover:bg-surface-variant/10 transition-colors" href="#">
              <span className="material-symbols-outlined text-lg">grid_view</span>
              Assets
            </a>
            <a className="flex items-center gap-3 p-2 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md hover:bg-surface-variant/10 transition-colors" href="#">
              <span className="material-symbols-outlined text-lg">description</span>
              Pages
            </a>
            <a className="flex items-center gap-3 p-2 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md hover:bg-surface-variant/10 transition-colors" href="#">
              <span className="material-symbols-outlined text-lg">history</span>
              History
            </a>
          </nav>
          <button className="mt-auto w-full py-2 flex items-center justify-center gap-2 border border-outline-variant/30 rounded-lg text-on-surface hover:bg-surface-variant/20 transition-colors font-label-md text-label-md">
            <span className="material-symbols-outlined text-sm">add</span>
            New Layer
          </button>
        </aside>
        <main className="flex-1 lg:ml-64 lg:mr-72 relative grid-bg flex items-center justify-center overflow-hidden">
          <div
            className="relative w-[800px] h-[600px] bg-surface rounded-xl border border-outline-variant/20 shadow-2xl flex flex-col items-center justify-center transition-transform duration-150 origin-center"
            style={{ transform: `scale(${currentScale})` }}
          >
            <div className="absolute -top-10 left-0 font-label-md text-label-md text-on-surface-variant opacity-70">
              # Varun_Sehgal_Portfolio.fig - Testimonials
            </div>
            <h1 className="font-display-lg text-display-lg text-primary mb-4 opacity-10">Testimonials</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant text-center max-w-md">
              This artboard is intentionally blank.<br />The focus is on the collaborative comments layered above it.
            </p>
            <div className="absolute top-20 left-10 comment-pin cursor-pointer group">
              <div className="relative">
                <div className="absolute -left-3 -top-3 w-8 h-8 bg-tertiary rounded-full border-2 border-background flex items-center justify-center z-10 shadow-md">
                  <span className="material-symbols-outlined text-on-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
                </div>
                <div className="bg-surface-container-high border border-outline-variant/30 rounded-lg p-4 shadow-lg w-64 backdrop-blur-xl bg-opacity-90">
                  <div className="flex items-start gap-3 mb-2">
                    <img className="w-6 h-6 rounded-full object-cover" alt="A small circular avatar showing a professional headshot of a female tech executive smiling warmly against a subtle dark background, lit softly to match a high-end dark mode UI." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSOAnNXiMjRYuI3mK4_uVPCaHSfpJenkQaoFrDfef7sJynilVm5TeU5UqjfB9jIXk9fE5b7NPngsn2hZDT2JjZGttev_lcWh9yzjpt4-JcbUa-UWiVpSwCHfXmWWTFQkXvnZADDuFAG0d3ZBB5b8ah_E7fddST86UlhK7rsdTXhGL1sBL6ub5b_EBo0J2FGk00Ei9uQJWKi5Nr8bQCACN5konqKWAOKJg--lIrUFG8fGhM0o2yG36r" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-label-md text-label-md text-on-surface">Sarah J.</span>
                        <span className="font-caption text-caption text-on-surface-variant opacity-50">2d ago</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm leading-tight">Amazing designer! The attention to detail in the typography is exceptional.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/3 right-10 comment-pin cursor-pointer group">
              <div className="relative">
                <div className="absolute -right-3 -top-3 w-8 h-8 bg-primary rounded-full border-2 border-background flex items-center justify-center z-10 shadow-md">
                  <span className="material-symbols-outlined text-on-primary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
                </div>
                <div className="bg-surface-container-high border border-outline-variant/30 rounded-lg p-4 shadow-lg w-72 backdrop-blur-xl bg-opacity-90">
                  <div className="flex items-start gap-3 mb-2">
                    <img className="w-6 h-6 rounded-full object-cover" alt="A small circular avatar showing a creative director with glasses, looking thoughtful in a moody, studio-lit environment suitable for a dark mode interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuADGUll26AU2MM4niIwn59A60Rsi1MSMh9spALjUC8FLW0cT6Sfb2nEZRfxC2QBGCfPh8EIdNjmo4Q-UaIq5uYnCHUWE_JiDOv7cv9oKQMmu3ZVCTd6KFLAtFiLlPvzGJSEwiJzVT9Rmd75j7mgwtdCdiJMP9WEV_aEXdFhisYAl0SHcna5t4KnsKQe57YPgEr-8ouKmwzsh_nhts6HZo28jWXvBRul0UNZTH91AYOrwp1GsXeMvfiR" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-label-md text-label-md text-on-surface">Mike R.</span>
                        <span className="font-caption text-caption text-on-surface-variant opacity-50">1w ago</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm leading-tight">Loved working together. Delivered the assets way ahead of schedule and nailed the dark mode aesthetic.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-24 left-1/4 comment-pin cursor-pointer group">
              <div className="relative">
                <div className="absolute -left-3 -top-3 w-8 h-8 bg-secondary rounded-full border-2 border-background flex items-center justify-center z-10 shadow-md">
                  <span className="material-symbols-outlined text-on-secondary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
                </div>
                <div className="bg-surface-container-high border border-outline-variant/30 rounded-lg p-4 shadow-lg w-56 backdrop-blur-xl bg-opacity-90">
                  <div className="flex items-start gap-3 mb-2">
                    <img className="w-6 h-6 rounded-full object-cover" alt="A small circular avatar of an abstract digital geometric shape, glowing softly in purple and blue tones, representing a team or bot account in a sleek UI." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJa21SoIQuNxX5PtVX2w8N6CsG_M_pOU8Nv-BTi2DP2g-m8ghzr06YOOcCmIBcoomHGUVQtv8ALVh2zlhtR7jhG4buSE7eP6lQgrZFGgD_979UWTJOLViFZEI4EhzgtjA4v77Ak6Fp7Wot4vraGmzvbQO3oAu3ON0jeRPLPqMhTetipzt2uxNOoJMQpFN9M6y74_5jL2o5CM_cYMWCnZSzSHFM6F9CH-8ziSsSe8HCzAfkCO9tx-pH" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-label-md text-label-md text-on-surface">Dev Team</span>
                        <span className="font-caption text-caption text-on-surface-variant opacity-50">3h ago</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm leading-tight">Very creative. The component structure was a breeze to implement.</p>
                    </div>
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
        <aside className="hidden lg:flex fixed right-0 top-16 bottom-0 w-72 z-40 flex-col p-4 bg-surface dark:bg-surface-container-low border-l border-outline-variant/10 backdrop-blur-2xl bg-surface/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-label-md text-label-md text-primary">Properties</h3>
              <p className="font-caption text-caption text-on-surface-variant">Selection context</p>
            </div>
            <div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">tune</span>
            </div>
          </div>
          <nav className="flex border-b border-outline-variant/20 mb-6">
            <a className="flex-1 text-center py-2 text-primary font-bold border-b-2 border-primary font-label-md text-label-md" href="#">
              Design
            </a>
            <a className="flex-1 text-center py-2 text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md" href="#">
              Prototype
            </a>
            <a className="flex-1 text-center py-2 text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md" href="#">
              Inspect
            </a>
          </nav>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-label-md text-label-md text-on-surface">Comment Settings</h4>
                <span className="material-symbols-outlined text-on-surface-variant text-sm">expand_more</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-body-md text-body-md text-on-surface-variant text-sm">Visibility</span>
                  <div className="bg-surface-container-highest rounded p-1 flex">
                    <button className="px-2 py-1 bg-surface-variant rounded text-on-surface text-xs font-label-md">All</button>
                    <button className="px-2 py-1 text-on-surface-variant hover:text-on-surface text-xs font-label-md transition-colors">Resolved</button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body-md text-body-md text-on-surface-variant text-sm">Sort by</span>
                  <select className="bg-surface-container-highest border border-outline-variant/30 text-on-surface text-xs font-label-md rounded p-1 outline-none">
                    <option>Date (Newest)</option>
                    <option>Date (Oldest)</option>
                    <option>Unread</option>
                  </select>
                </div>
              </div>
            </div>
            <hr className="border-outline-variant/20 mb-6" />
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-label-md text-label-md text-on-surface">Export</h4>
                <span className="material-symbols-outlined text-on-surface-variant text-sm">add</span>
              </div>
              <div className="bg-surface-container-highest p-3 rounded border border-outline-variant/20 flex justify-between items-center">
                <span className="font-label-md text-label-md text-on-surface text-xs">PDF</span>
                <span className="font-body-md text-body-md text-on-surface-variant text-xs">1x</span>
                <button className="text-primary hover:text-primary-container transition-colors">
                  <span className="material-symbols-outlined text-sm">download</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
          
    </div>
  );
}

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Varun_Sehgal_Portfolio.fig - Testimonials" },
      { name: "description", content: "Client testimonials and feedback pinned as collaborative comments in a Figma-style canvas." },
      { property: "og:title", content: "Varun_Sehgal_Portfolio.fig - Testimonials" },
      { property: "og:description", content: "Client testimonials and feedback pinned as collaborative comments in a Figma-style canvas." },
    ],
  }),
  component: Testimonials,
});
