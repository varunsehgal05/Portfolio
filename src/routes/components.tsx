import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ZoomWidget } from "../components/ZoomWidget";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
      { title: "Varun_Sehgal_Portfolio.fig - Component Library" },
      { name: "description", content: "Spectral UI Kit - atomic component library showcasing buttons, inputs, and chips." },
      { property: "og:title", content: "Varun_Sehgal_Portfolio.fig - Component Library" },
      { property: "og:description", content: "Spectral UI Kit - atomic component library showcasing buttons, inputs, and chips." },
    ],
  }),
  component: ComponentsPage,
});

function ComponentsPage() {
  const [currentScale, setCurrentScale] = useState(1);
  return (
    <div className="text-on-surface h-screen w-screen flex flex-col font-body-md text-body-md overflow-hidden bg-[#0A0A0A]">
      {/* Top Navigation Bar */}
      
      {/* Main Workspace */}
      <div className="flex flex-1 pt-16 h-full overflow-hidden">
        {/* Left SideNavBar (Layers/Assets) */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 z-40 flex flex-col p-4 bg-surface dark:bg-surface-container-low border-r border-outline-variant/10 backdrop-blur-2xl bg-surface/80">
          <div className="mb-6 flex items-center gap-3 p-2 bg-surface-container/50 rounded-xl border border-outline-variant/10">
            <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant/20">
              <span className="material-symbols-outlined text-primary" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>folder_special</span>
            </div>
            <div>
              <h3 className="font-label-md text-label-md text-primary truncate w-40">Project Alpha</h3>
              <p className="font-caption text-caption text-on-surface-variant truncate w-40">Creative Portfolio</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 flex-1 overflow-y-auto pr-2">
            <div className="text-primary font-bold bg-primary-container/10 rounded-lg p-2 flex items-center gap-3 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">layers</span>
              <span className="font-label-md text-sm">Layers</span>
            </div>
            <div className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded-lg p-2 flex items-center gap-3 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              <span className="font-label-md text-sm">Assets</span>
            </div>
            <div className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded-lg p-2 flex items-center gap-3 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">description</span>
              <span className="font-label-md text-sm">Pages</span>
            </div>
            <div className="mt-4 mb-2 px-2">
              <div className="h-[1px] w-full bg-outline-variant/20"></div>
            </div>
            {/* Expanded Layers List */}
            <div className="pl-2 space-y-1">
              <div className="flex items-center gap-2 p-1.5 hover:bg-surface-variant/10 rounded-md cursor-pointer text-on-surface-variant group">
                <span className="material-symbols-outlined text-[16px] group-hover:text-primary">arrow_drop_down</span>
                <span className="material-symbols-outlined text-[14px]">grid_on</span>
                <span className="font-caption text-sm truncate">Artboard 1 - UI Kit</span>
              </div>
              <div className="pl-6 space-y-1">
                <div className="flex items-center gap-2 p-1.5 hover:bg-surface-variant/10 rounded-md cursor-pointer text-on-surface-variant group">
                  <span className="material-symbols-outlined text-[14px]">tag</span>
                  <span className="font-caption text-sm truncate">Buttons</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 bg-surface-variant/20 rounded-md cursor-pointer text-on-surface group border border-outline-variant/10">
                  <span className="material-symbols-outlined text-[14px] text-primary">tag</span>
                  <span className="font-caption text-sm truncate text-primary">Inputs</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 hover:bg-surface-variant/10 rounded-md cursor-pointer text-on-surface-variant group">
                  <span className="material-symbols-outlined text-[14px]">tag</span>
                  <span className="font-caption text-sm truncate">Avatars</span>
                </div>
              </div>
            </div>
          </div>
          <button className="mt-4 w-full bg-surface-container border border-outline-variant/20 text-on-surface font-label-md py-2 rounded-lg hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Layer
          </button>
        </aside>
        {/* Center Canvas */}
        <main className="flex-1 ml-64 mr-72 relative canvas-bg overflow-auto flex items-center justify-center p-8">
          {/* Artboard */}
          <div
            className="bg-surface glass-panel w-full max-w-5xl rounded-xl p-12 shadow-2xl relative transform transition-transform duration-150 origin-center flex flex-col gap-12"
            style={{ transform: `scale(${currentScale})` }}
          >
            {/* Artboard Header */}
            <div className="flex justify-between items-end border-b border-outline-variant/20 pb-4">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Spectral UI Kit</h1>
                <p className="font-body-md text-on-surface-variant mt-2">Atomic Component Library • Version 1.2</p>
              </div>
              <div className="font-label-md text-on-surface-variant opacity-50">1440 x 1024</div>
            </div>
            {/* Bento Grid for Components */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Buttons Section */}
              <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
                <div className="font-label-md text-tertiary mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">smart_button</span> Buttons
                </div>
                <div className="space-y-6">
                  {/* Primary Button Row */}
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-on-surface-variant w-24">Primary</span>
                    <div className="flex gap-4 items-center">
                      <button className="bg-primary text-on-primary font-label-md px-6 py-2.5 rounded-lg opacity-80 cursor-not-allowed">Default</button>
                      <button className="bg-primary text-on-primary font-label-md px-6 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(255,181,161,0.3)] transition-all duration-300 scale-105">Hover</button>
                      <button className="bg-primary-container text-on-primary-container font-label-md px-6 py-2.5 rounded-lg scale-95 transition-transform ring-2 ring-primary ring-offset-2 ring-offset-surface">Active</button>
                    </div>
                  </div>
                  {/* Secondary Button Row */}
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-on-surface-variant w-24">Secondary</span>
                    <div className="flex gap-4 items-center">
                      <button className="bg-transparent border border-outline-variant text-on-surface font-label-md px-6 py-2.5 rounded-lg opacity-80 cursor-not-allowed">Default</button>
                      <button className="bg-transparent border border-primary text-primary font-label-md px-6 py-2.5 rounded-lg shadow-[0_0_15px_rgba(255,181,161,0.15)] transition-all duration-300">Hover</button>
                      <button className="bg-surface-variant border border-outline text-on-surface font-label-md px-6 py-2.5 rounded-lg scale-95 transition-transform">Active</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Inputs Section */}
              <div className="bg-surface-container-low rounded-xl p-6 border border-primary/30 relative overflow-hidden">
                {/* Selection Box Highlight */}
                <div className="absolute inset-0 border-2 border-primary/50 pointer-events-none rounded-xl">
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-surface border-2 border-primary rounded-sm"></div>
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-surface border-2 border-primary rounded-sm"></div>
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-surface border-2 border-primary rounded-sm"></div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-surface border-2 border-primary rounded-sm"></div>
                </div>
                <div className="font-label-md text-tertiary mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">input</span> Text Inputs
                </div>
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-caption text-on-surface-variant">Default State</label>
                    <input className="bg-[#121212] border border-outline-variant/30 text-on-surface px-4 py-3 rounded-lg text-sm font-body-md outline-none w-full opacity-70" placeholder="Enter text..." type="text" />
                  </div>
                  <div className="flex flex-col gap-2 relative">
                    <label className="font-caption text-primary flex justify-between">
                      Focus State
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Selected</span>
                    </label>
                    <input className="bg-[#121212] border border-secondary text-on-surface px-4 py-3 rounded-lg text-sm font-body-md outline-none w-full shadow-[0_0_15px_rgba(105,4,197,0.2)]" type="text" defaultValue="Spectral Design" />
                  </div>
                </div>
              </div>
              {/* Chips/Badges Section */}
              <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 lg:col-span-2">
                <div className="font-label-md text-tertiary mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">label</span> Chips &amp; Badges
                </div>
                <div className="flex flex-wrap gap-6 items-center">
                  {/* Status Badges */}
                  <div className="flex flex-col gap-3">
                    <span className="font-caption text-on-surface-variant">Status Colors</span>
                    <div className="flex gap-3">
                      <span className="font-label-md text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">Active</span>
                      <span className="font-label-md text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full border border-secondary/20">Pending</span>
                      <span className="font-label-md text-xs bg-tertiary/10 text-tertiary px-3 py-1 rounded-full border border-tertiary/20">Info</span>
                      <span className="font-label-md text-xs bg-error/10 text-error px-3 py-1 rounded-full border border-error/20">Error</span>
                    </div>
                  </div>
                  <div className="w-[1px] h-12 bg-outline-variant/20 mx-2"></div>
                  {/* Interactive Chips */}
                  <div className="flex flex-col gap-3">
                    <span className="font-caption text-on-surface-variant">Interactive Chips (Monospace)</span>
                    <div className="flex gap-3">
                      <button className="font-label-md text-xs bg-surface-variant/30 text-on-surface px-3 py-1.5 rounded-md border border-outline-variant/30 hover:bg-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">filter_list</span> Filter
                      </button>
                      <button className="font-label-md text-xs bg-primary/20 text-primary px-3 py-1.5 rounded-md border border-primary/50 shadow-[0_0_10px_rgba(255,181,161,0.1)] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check</span> Selected
                      </button>
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
        {/* Right SideNavBar (Properties) */}
        <aside className="fixed right-0 top-16 bottom-0 w-72 z-40 flex flex-col p-4 bg-surface dark:bg-surface-container-low border-l border-outline-variant/10 backdrop-blur-2xl bg-surface/80">
          {/* Properties Header Navigation */}
          <div className="flex border-b border-outline-variant/10 mb-4">
            <button className="flex-1 pb-2 font-label-md text-sm text-primary font-bold border-b-2 border-primary flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px]">edit</span> Design
            </button>
            <button className="flex-1 pb-2 font-label-md text-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px]">play_arrow</span> Prototype
            </button>
            <button className="flex-1 pb-2 font-label-md text-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px]">code</span> Inspect
            </button>
          </div>
          {/* Panel Content */}
          <div className="flex flex-col gap-6 flex-1 overflow-y-auto pr-2 pb-4">
            {/* Selection Context */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-on-surface-variant">web</span>
                <h3 className="font-label-md text-on-surface">Properties</h3>
              </div>
              <p className="font-caption text-on-surface-variant">Selection: <span className="text-primary font-mono bg-primary/10 px-1 rounded">Focus State Input</span></p>
            </div>
            {/* Layout Properties */}
            <div className="space-y-3">
              <h4 className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/10 pb-1">Layout</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 bg-surface-variant/20 p-2 rounded border border-outline-variant/10">
                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant">width</span>
                  <input className="bg-transparent border-none text-on-surface font-label-md text-sm w-full outline-none p-0 focus:ring-0" type="text" defaultValue="320" />
                </div>
                <div className="flex items-center gap-2 bg-surface-variant/20 p-2 rounded border border-outline-variant/10">
                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant">height</span>
                  <input className="bg-transparent border-none text-on-surface font-label-md text-sm w-full outline-none p-0 focus:ring-0" type="text" defaultValue="48" />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 bg-surface-variant/20 hover:bg-surface-variant rounded border border-outline-variant/10 text-on-surface-variant transition-colors" title="Align Left"><span className="material-symbols-outlined text-[16px]">format_align_left</span></button>
                <button className="p-1.5 bg-surface-variant/20 hover:bg-surface-variant rounded border border-outline-variant/10 text-on-surface-variant transition-colors" title="Align Center"><span className="material-symbols-outlined text-[16px]">format_align_center</span></button>
                <button className="p-1.5 bg-surface-variant/20 hover:bg-surface-variant rounded border border-outline-variant/10 text-on-surface-variant transition-colors" title="Align Right"><span className="material-symbols-outlined text-[16px]">format_align_right</span></button>
                <div className="w-[1px] bg-outline-variant/20 mx-1 my-1"></div>
                <button className="p-1.5 bg-surface-variant/20 hover:bg-surface-variant rounded border border-outline-variant/10 text-on-surface-variant transition-colors" title="Distribute"><span className="material-symbols-outlined text-[16px]">horizontal_distribute</span></button>
              </div>
            </div>
            {/* Appearance Properties */}
            <div className="space-y-3">
              <h4 className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/10 pb-1">Appearance</h4>
              {/* Fill */}
              <div className="flex items-center justify-between">
                <span className="font-caption text-on-surface">Fill</span>
                <div className="flex items-center gap-2 bg-surface-variant/20 p-1.5 rounded border border-outline-variant/10">
                  <div className="w-4 h-4 rounded-sm bg-[#121212] border border-outline-variant/50"></div>
                  <span className="font-label-md text-xs text-on-surface uppercase">#121212</span>
                  <span className="font-label-md text-xs text-on-surface-variant ml-2">100%</span>
                </div>
              </div>
              {/* Stroke */}
              <div className="flex items-center justify-between">
                <span className="font-caption text-on-surface">Stroke</span>
                <div className="flex items-center gap-2 bg-surface-variant/20 p-1.5 rounded border border-outline-variant/10">
                  <div className="w-4 h-4 rounded-sm bg-secondary border border-outline-variant/50"></div>
                  <span className="font-label-md text-xs text-on-surface uppercase">#6904C5</span>
                  <div className="flex items-center gap-1 ml-2 pl-2 border-l border-outline-variant/20">
                    <span className="material-symbols-outlined text-[14px] text-on-surface-variant">line_weight</span>
                    <span className="font-label-md text-xs text-on-surface">1px</span>
                  </div>
                </div>
              </div>
              {/* Effects (Glow) */}
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="font-caption text-on-surface">Effects</span>
                  <button className="text-primary hover:text-primary-container"><span className="material-symbols-outlined text-[16px]">add</span></button>
                </div>
                <div className="bg-surface-variant/10 p-2 rounded border border-outline-variant/10 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-tertiary mt-0.5">blur_on</span>
                  <div className="flex-1">
                    <p className="font-caption text-sm text-on-surface">Outer Glow</p>
                    <p className="font-label-md text-xs text-on-surface-variant mt-1">Blur: 15px, Spread: 0, 20%</p>
                  </div>
                  <button className="text-on-surface-variant hover:text-error"><span className="material-symbols-outlined text-[16px]">remove</span></button>
                </div>
              </div>
            </div>
            {/* Typography Properties */}
            <div className="space-y-3 opacity-50 pointer-events-none">
              <h4 className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/10 pb-1">Typography</h4>
              <div className="flex items-center justify-center p-4 border border-dashed border-outline-variant/20 rounded">
                <span className="font-caption text-on-surface-variant">No text selected</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
          
    </div>
  );
}
