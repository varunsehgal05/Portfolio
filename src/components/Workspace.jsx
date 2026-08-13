import React from 'react';
import { InfiniteCanvas } from './InfiniteCanvas';
import { useStore } from '../store';
import { MousePointer2, Hand, MessageSquare, Menu, ChevronDown, MonitorPlay, Layers, LayoutGrid } from 'lucide-react';
// import { MiniMap } from './MiniMap';
import { LayersPanel } from './LayersPanel';
import { PropertiesPanel } from './PropertiesPanel';
import { MiniMap } from './MiniMap';
import { CommandPalette } from './CommandPalette';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { FakeCursors } from './FakeCursors';

export function Workspace() {
  const { isLeftPanelOpen, isRightPanelOpen, activeTool, setActiveTool, cursorPos, cameraPos } = useStore();

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#1e1e1e] text-white">
      <KeyboardShortcuts />
      <CommandPalette />
      
      {/* 1. The Canvas */}
      <div className="absolute inset-0 z-0">
         <InfiniteCanvas />
      </div>
      
      <FakeCursors />
      <MiniMap />

      {/* 2. Top Toolbar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-[#2c2c2c] border-b border-[#3c3c3c] flex items-center justify-between px-2 z-20 select-none">
        <div className="flex items-center gap-2">
           <div className="p-2 hover:bg-white/10 rounded cursor-pointer mr-2"><Menu size={16} /></div>
           <div className="flex bg-black/20 rounded p-0.5">
             <div onClick={() => setActiveTool('move')} className={`p-1.5 rounded cursor-pointer transition-colors ${activeTool === 'move' ? 'bg-[#ffb5a1] text-black' : 'hover:bg-white/10'}`}><MousePointer2 size={16} /></div>
             <div onClick={() => setActiveTool('hand')} className={`p-1.5 rounded cursor-pointer transition-colors ${activeTool === 'hand' ? 'bg-[#ffb5a1] text-black' : 'hover:bg-white/10'}`}><Hand size={16} /></div>
             <div onClick={() => setActiveTool('comment')} className={`p-1.5 rounded cursor-pointer transition-colors ${activeTool === 'comment' ? 'bg-[#ffb5a1] text-black' : 'hover:bg-white/10'}`}><MessageSquare size={16} /></div>
           </div>
        </div>
        
        <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 px-3 py-1 rounded">
           <span className="font-jetbrains text-xs font-bold text-white/80">Varun_Sehgal_Portfolio.fig</span>
           <ChevronDown size={14} className="text-white/40" />
        </div>
        
        <div className="flex items-center gap-3 pr-2">
           <div className="flex -space-x-2">
             <div className="w-7 h-7 rounded-full bg-[#ffb5a1] border-2 border-[#2c2c2c] flex items-center justify-center text-[10px] text-black font-bold font-jetbrains">VS</div>
             <div className="w-7 h-7 rounded-full bg-[#7fd0ff] border-2 border-[#2c2c2c] flex items-center justify-center text-[10px] text-black font-bold font-jetbrains">AT</div>
           </div>
           <button className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded font-jetbrains text-xs transition-colors">Share</button>
           <button className="p-1.5 hover:bg-white/10 rounded transition-colors"><MonitorPlay size={16} /></button>
        </div>
      </div>

      {/* 3. Left Panel (Layers) */}
      <div className={`absolute top-12 bottom-8 left-0 w-64 bg-[#2c2c2c] border-r border-[#3c3c3c] transition-transform duration-300 z-10 flex flex-col shadow-2xl ${isLeftPanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="h-10 border-b border-[#3c3c3c] flex items-center px-4 font-jetbrains text-[10px] uppercase tracking-widest font-bold text-white/50">
            <Layers size={14} className="mr-2" /> Layers
         </div>
         <div className="flex-1 overflow-y-auto p-2">
            <LayersPanel />
         </div>
      </div>

      {/* 4. Right Panel (Properties) */}
      <div className={`absolute top-12 bottom-8 right-0 w-64 bg-[#2c2c2c] border-l border-[#3c3c3c] transition-transform duration-300 z-10 flex flex-col shadow-2xl ${isRightPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <div className="h-10 border-b border-[#3c3c3c] flex items-center px-4 font-jetbrains text-[10px] uppercase tracking-widest font-bold text-white/50">
            Design
         </div>
         <div className="flex-1 overflow-y-auto p-4 font-inter text-sm">
            <PropertiesPanel />
         </div>
      </div>

      {/* 5. Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#222222] border-t border-[#3c3c3c] flex items-center justify-between px-4 z-20 text-[10px] font-jetbrains text-white/50">
         <div className="flex gap-4">
           <span>X: {Math.round((cursorPos.x - window.innerWidth/2 - cameraPos.x) / (cameraPos.zoom || 1))}</span>
           <span>Y: {Math.round((cursorPos.y - window.innerHeight/2 - cameraPos.y) / (cameraPos.zoom || 1))}</span>
         </div>
         <div className="flex items-center gap-4">
           <span className="text-[#ffb5a1]">All changes saved</span>
           <span>{Math.round((cameraPos.zoom || 0.15) * 100)}%</span>
         </div>
      </div>
      
    </div>
  );
}
