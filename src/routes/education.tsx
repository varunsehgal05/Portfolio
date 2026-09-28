import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ZoomWidget } from "../components/ZoomWidget";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Varun_Sehgal_Portfolio.fig - Education" },
      { name: "description", content: "Education artboard showing degree, subjects, and achievements." },
      { property: "og:title", content: "Varun_Sehgal_Portfolio.fig - Education" },
      { property: "og:description", content: "Education artboard showing degree, subjects, and achievements." },
    ],
  }),
  component: Education,
});

function Education() {
  const [currentScale, setCurrentScale] = useState(1);
  return (
    <div className="text-on-surface h-screen overflow-hidden flex flex-col font-body-md antialiased">
      {/* TopNavBar */}
      
      {/* Main Workspace Area */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Left SideNavBar (Layers) */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 z-40 flex flex-col p-4 bg-surface dark:bg-surface-container-low border-r border-outline-variant/10 backdrop-blur-2xl bg-surface/80">
          <div className="mb-6 px-2">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface truncate">Project Alpha</h2>
            <p className="font-caption text-caption text-on-surface-variant">Creative Portfolio</p>
          </div>
          <nav className="flex-1 overflow-y-auto pr-2 space-y-1">
            {/* Nav Tabs */}
            <div className="flex gap-1 mb-4 border-b border-outline-variant/20 pb-2">
              <button className="flex-1 flex flex-col items-center p-2 text-primary font-bold bg-primary-container/10 rounded-lg">
                <span className="material-symbols-outlined text-[20px] mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>layers</span>
                <span className="text-[10px] font-label-md">Layers</span>
              </button>
              <button className="flex-1 flex flex-col items-center p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded-lg">
                <span className="material-symbols-outlined text-[20px] mb-1">grid_view</span>
                <span className="text-[10px] font-label-md">Assets</span>
              </button>
              <button className="flex-1 flex flex-col items-center p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded-lg">
                <span className="material-symbols-outlined text-[20px] mb-1">description</span>
                <span className="text-[10px] font-label-md">Pages</span>
              </button>
            </div>
            {/* Layers Tree */}
            <div className="space-y-[2px] font-label-md text-label-md">
              <div className="flex items-center gap-2 p-1.5 hover:bg-surface-variant/20 rounded cursor-pointer group">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">arrow_drop_down</span>
                <span className="material-symbols-outlined text-[16px] text-[#f24e1e]">grid_goldenratio</span>
                <span className="truncate text-on-surface">Education_Artboard</span>
              </div>
              <div className="ml-4 space-y-[2px]">
                <div className="flex items-center gap-2 p-1.5 hover:bg-surface-variant/20 rounded cursor-pointer group bg-primary-container/5 border border-primary/20">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant invisible group-hover:visible">visibility</span>
                  <span className="material-symbols-outlined text-[16px] text-tertiary">tag</span>
                  <span className="truncate text-primary">University_Card</span>
                </div>
                <div className="ml-6 flex items-center gap-2 p-1.5 hover:bg-surface-variant/20 rounded cursor-pointer group">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant invisible group-hover:visible">visibility</span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">title</span>
                  <span className="truncate text-on-surface-variant">Degree_Title</span>
                </div>
                <div className="ml-6 flex items-center gap-2 p-1.5 hover:bg-surface-variant/20 rounded cursor-pointer group">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant invisible group-hover:visible">visibility</span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">format_list_bulleted</span>
                  <span className="truncate text-on-surface-variant">Subjects_List</span>
                </div>
              </div>
            </div>
          </nav>
          <div className="pt-4 border-t border-outline-variant/10 mt-auto">
            <button className="w-full bg-surface-variant/30 text-on-surface border border-outline-variant/30 py-2 rounded-lg font-label-md flex items-center justify-center gap-2 hover:bg-surface-variant/50 transition-colors">
              <span className="material-symbols-outlined text-[18px]">add</span> New Layer
            </button>
          </div>
        </aside>
        {/* Center Canvas */}
        <main className="flex-1 ml-64 mr-72 canvas-bg relative overflow-auto flex items-center justify-center cursor-crosshair">
          {/* Artboard */}
          <div className="relative bg-[#0A0A0A] w-[800px] h-[600px] shadow-2xl border border-outline-variant/20 overflow-hidden transition-transform duration-150 origin-center" style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)", transform: `scale(${currentScale})` }}>
            {/* Artboard Label */}
            <div className="absolute -top-6 left-0 text-primary font-label-md text-[12px] flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">grid_goldenratio</span> Education_Artboard
            </div>
            <div className="absolute inset-0 p-margin-desktop flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Education.</h1>
                <div className="w-16 h-1 bg-primary rounded-full"></div>
              </div>
              {/* Bento Grid Layout for Education */}
              <div className="grid grid-cols-12 gap-gutter">
                {/* Main Degree Card */}
                <div className="col-span-12 glass-panel p-8 rounded-xl relative overflow-hidden group hover:shadow-[0_0_40px_rgba(242,78,30,0.15)] transition-shadow duration-500">
                  {/* Selection Highlight (Figma style) */}
                  <div className="absolute inset-0 border-2 border-primary pointer-events-none opacity-100 z-10">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-primary"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-primary"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-primary"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-primary"></div>
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-1">B.Tech in Computer Science</h3>
                      <p className="font-body-lg text-body-lg text-tertiary">Tech University</p>
                    </div>
                    <div className="text-right">
                      <div className="font-label-md text-label-md text-primary bg-primary/10 px-3 py-1 rounded-full mb-2 inline-block">2014 — 2018</div>
                      <p className="font-body-md text-body-md text-on-surface-variant">CGPA 3.8/4.0</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 mt-8 border-t border-white/5 pt-8">
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface-variant mb-4 uppercase tracking-wider">Key Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="font-label-md text-caption bg-secondary-container/20 text-on-secondary-container px-3 py-1.5 rounded border border-secondary-container/30">Data Structures</span>
                        <span className="font-label-md text-caption bg-secondary-container/20 text-on-secondary-container px-3 py-1.5 rounded border border-secondary-container/30">Algorithms</span>
                        <span className="font-label-md text-caption bg-secondary-container/20 text-on-secondary-container px-3 py-1.5 rounded border border-secondary-container/30">HCI</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface-variant mb-4 uppercase tracking-wider">Achievements</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-on-surface font-body-md">
                          <span className="material-symbols-outlined text-primary text-[18px]">workspace_premium</span>
                          Dean's List (2016-2018)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Floating Zoom Controls */}
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
          {/* Nav Tabs */}
          <div className="flex gap-1 mb-6 border-b border-outline-variant/20 pb-2">
            <button className="flex-1 flex items-center justify-center gap-2 p-2 text-primary font-bold border-b-2 border-primary -mb-[10px]">
              <span className="material-symbols-outlined text-[18px]">edit</span>
              <span className="text-[12px] font-label-md">Design</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 p-2 text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              <span className="text-[12px] font-label-md">Prototype</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Alignment / Distribution */}
            <div className="flex justify-between border-b border-outline-variant/10 pb-4">
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-surface-variant/30 rounded text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">align_horizontal_left</span></button>
                <button className="p-1.5 hover:bg-surface-variant/30 rounded text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">align_horizontal_center</span></button>
                <button className="p-1.5 hover:bg-surface-variant/30 rounded text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">align_horizontal_right</span></button>
              </div>
            </div>
            {/* Position & Size */}
            <div className="space-y-3 pb-4 border-b border-outline-variant/10">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center bg-surface-variant/20 rounded px-2 py-1 border border-outline-variant/10">
                  <span className="text-on-surface-variant font-label-md text-[10px] w-4">X</span>
                  <input className="bg-transparent border-none w-full text-on-surface text-[12px] font-label-md text-right focus:ring-0 p-0" type="text" defaultValue="320" />
                </div>
                <div className="flex items-center bg-surface-variant/20 rounded px-2 py-1 border border-outline-variant/10">
                  <span className="text-on-surface-variant font-label-md text-[10px] w-4">Y</span>
                  <input className="bg-transparent border-none w-full text-on-surface text-[12px] font-label-md text-right focus:ring-0 p-0" type="text" defaultValue="145" />
                </div>
                <div className="flex items-center bg-surface-variant/20 rounded px-2 py-1 border border-outline-variant/10">
                  <span className="text-on-surface-variant font-label-md text-[10px] w-4">W</span>
                  <input className="bg-transparent border-none w-full text-on-surface text-[12px] font-label-md text-right focus:ring-0 p-0" type="text" defaultValue="800" />
                </div>
                <div className="flex items-center bg-surface-variant/20 rounded px-2 py-1 border border-outline-variant/10">
                  <span className="text-on-surface-variant font-label-md text-[10px] w-4">H</span>
                  <input className="bg-transparent border-none w-full text-on-surface text-[12px] font-label-md text-right focus:ring-0 p-0" type="text" defaultValue="600" />
                </div>
              </div>
            </div>
            {/* Typography (Contextual based on selection) */}
            <div className="space-y-3 pb-4 border-b border-outline-variant/10">
              <h3 className="font-label-md text-[11px] text-on-surface uppercase tracking-wider flex justify-between">Text <span className="material-symbols-outlined text-[14px]">more_horiz</span></h3>
              <div className="bg-surface-variant/20 rounded px-2 py-1.5 border border-outline-variant/10 flex justify-between items-center cursor-pointer">
                <span className="text-on-surface font-label-md text-[12px]">Geist</span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-surface-variant/20 rounded px-2 py-1.5 border border-outline-variant/10 flex justify-between items-center">
                  <span className="text-on-surface font-label-md text-[12px]">Bold</span>
                </div>
                <div className="flex items-center bg-surface-variant/20 rounded px-2 py-1 border border-outline-variant/10">
                  <span className="material-symbols-outlined text-on-surface-variant text-[14px] w-6">format_size</span>
                  <input className="bg-transparent border-none w-full text-on-surface text-[12px] font-label-md text-right focus:ring-0 p-0" type="text" defaultValue="24" />
                </div>
              </div>
            </div>
            {/* Fill */}
            <div className="space-y-3 pb-4 border-b border-outline-variant/10">
              <h3 className="font-label-md text-[11px] text-on-surface uppercase tracking-wider flex justify-between">Fill <span className="material-symbols-outlined text-[14px]">add</span></h3>
              <div className="flex items-center gap-2 group">
                <div className="w-6 h-6 rounded bg-[#121414] border border-white/20"></div>
                <div className="flex-1 bg-surface-variant/20 rounded px-2 py-1 border border-outline-variant/10 flex justify-between">
                  <span className="text-on-surface font-label-md text-[12px]">#121414</span>
                  <span className="text-on-surface-variant font-label-md text-[12px]">80%</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-on-surface-variant"><span className="material-symbols-outlined text-[16px]">remove</span></button>
              </div>
            </div>
            {/* Stroke */}
            <div className="space-y-3 pb-4 border-b border-outline-variant/10">
              <h3 className="font-label-md text-[11px] text-on-surface uppercase tracking-wider flex justify-between">Stroke <span className="material-symbols-outlined text-[14px]">add</span></h3>
              <div className="flex items-center gap-2 group">
                <div className="w-6 h-6 rounded bg-primary border border-white/20"></div>
                <div className="flex-1 bg-surface-variant/20 rounded px-2 py-1 border border-outline-variant/10 flex justify-between">
                  <span className="text-on-surface font-label-md text-[12px]">#FFB5A1</span>
                  <span className="text-on-surface-variant font-label-md text-[12px]">100%</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-on-surface-variant"><span className="material-symbols-outlined text-[16px]">remove</span></button>
              </div>
            </div>
            {/* Effects */}
            <div className="space-y-3 pb-4">
              <h3 className="font-label-md text-[11px] text-on-surface uppercase tracking-wider flex justify-between">Effects <span className="material-symbols-outlined text-[14px]">add</span></h3>
              <div className="flex items-center gap-2 group">
                <span className="material-symbols-outlined text-on-surface-variant text-[16px]">blur_on</span>
                <div className="flex-1 bg-surface-variant/20 rounded px-2 py-1 border border-outline-variant/10 flex justify-between items-center cursor-pointer">
                  <span className="text-on-surface font-label-md text-[12px]">Backdrop blur</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[14px]">light_mode</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
          
    </div>
  );
}
