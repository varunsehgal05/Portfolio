import React from 'react';
import { useStore } from '../store';
import { bespokePages } from '../gridConfig';
import { Code2, Layout, Hash } from 'lucide-react';

export function PropertiesPanel() {
  const selectedNode = useStore(state => state.selectedNode);
  const appMode = useStore(state => state.appMode);
  
  const codeSnippets = {
     'skill_arsenal': `<div className="grid grid-cols-4 gap-6">\n  {skills.map(skill => (\n    <div className="bg-[#151515] hover:bg-[#1a1a1a] rounded-2xl shadow-lg">\n      <Icon />\n      <h3>{skill.title}</h3>\n    </div>\n  ))}\n</div>`,
     'projects_overview': `<div className="grid grid-cols-2 gap-6">\n  {filtered.map(p => (\n    <div className="bg-[#1a1c1c] border-white/5 rounded-2xl overflow-hidden hover:scale-105">\n       <Thumbnail />\n       <Content />\n    </div>\n  ))}\n</div>`,
     'hero': `<h1 className="text-[120px] font-bold tracking-tighter leading-none text-white mix-blend-difference">\n  DESIGN\n  <br/>\n  ENGINEER\n</h1>`,
     'about': `<div className="rotate-3 shadow-xl bg-[#fff3e0] p-6 hover:-translate-y-2 transition-transform">\n   <p className="font-marker text-2xl text-black">\n     Who am I?\n   </p>\n</div>`,
     'case_study': `<section className="flex gap-8">\n   <ProblemColumn />\n   <WireframesColumn />\n   <FinalUIColumn />\n</section>`
  };

  const getSnippet = () => {
      if (!selectedNode) return `/* Select a frame to inspect its Tailwind DOM */\n\n.canvas-element {\n  display: flex;\n  flex-direction: column;\n}`;
      return codeSnippets[selectedNode] || `/* Auto-generated for ${selectedNode} */\n\n<div className="flex flex-col gap-4 p-8 bg-[#121212]">\n   <Content />\n</div>`;
  }
  
  if (appMode === 'dev') {
     return (
       <div className="space-y-6">
         <div>
           <div className="text-[10px] font-bold text-[#7fd0ff] uppercase tracking-widest mb-3 flex items-center gap-2"><Code2 size={12}/> Inspect</div>
           <div className="bg-[#161616] border border-[#3c3c3c] rounded-lg p-3 font-jetbrains text-[10px] text-[#7fd0ff] whitespace-pre-wrap leading-relaxed shadow-inner overflow-x-auto">
             {getSnippet()}
           </div>
         </div>
         <div>
           <div className="text-[10px] font-bold text-[#ffb5a1] uppercase tracking-widest mb-3 flex items-center gap-2"><Layout size={12}/> Layout</div>
           <div className="grid grid-cols-2 gap-3 text-xs font-jetbrains">
              <div className="flex justify-between border-b border-[#3c3c3c] pb-1">
                 <span className="text-white/40">Width</span>
                 <span>1200px</span>
              </div>
              <div className="flex justify-between border-b border-[#3c3c3c] pb-1">
                 <span className="text-white/40">Height</span>
                 <span>800px</span>
              </div>
           </div>
         </div>
       </div>
     )
  }

  if (!selectedNode) {
     return (
       <div className="text-white/40 text-xs text-center mt-12 font-inter flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-dashed border-[#3c3c3c] flex items-center justify-center">
             <Hash size={20} className="text-white/20"/>
          </div>
          Select a frame or layer to view properties.
       </div>
     );
  }

  const page = bespokePages.find(p => p.id === selectedNode);

  return (
    <div className="space-y-6 font-inter">
       <div>
         <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Frame</div>
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#1a1c1c] border border-[#3c3c3c] shadow-inner flex items-center justify-center text-white/50">#</div>
            <div className="font-semibold text-sm text-white/90 truncate flex-1">{page?.title || selectedNode}</div>
         </div>
       </div>
       
       <div className="border-t border-[#3c3c3c] pt-5">
         <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Component Metadata</div>
         <div className="space-y-4 text-xs font-medium">
            <div className="flex justify-between items-center group">
               <span className="text-white/40 group-hover:text-white/60 transition-colors">Platform</span>
               <span className="text-white/80 bg-white/5 px-2 py-1 rounded">Web / Responsive</span>
            </div>
            <div className="flex justify-between items-center group">
               <span className="text-white/40 group-hover:text-white/60 transition-colors">Status</span>
               <span className="text-[#ffb5a1] bg-[#ffb5a1]/10 px-2 py-1 rounded flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffb5a1] animate-pulse"></div>
                  Active
               </span>
            </div>
            <div className="flex justify-between items-center group">
               <span className="text-white/40 group-hover:text-white/60 transition-colors">Dimensions</span>
               <span className="text-[#7fd0ff] font-jetbrains">{page?.width || 1000} × {page?.height || 800}</span>
            </div>
         </div>
       </div>
    </div>
  );
}
