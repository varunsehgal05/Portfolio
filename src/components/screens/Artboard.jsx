import React from 'react';
import { useStore } from '../../store';

export function Artboard({ id, x, y, width, height, title, children }) {
  const selectedNode = useStore(state => state.selectedNode);
  const setSelectedNode = useStore(state => state.setSelectedNode);
  const isSelected = selectedNode === id;

  return (
    <div 
      className="absolute"
      style={{ left: x, top: y, width, height }}
    >
      <div className={`absolute -top-8 left-0 text-sm font-medium flex items-center gap-2 transition-colors ${isSelected ? 'text-white' : 'text-white/40'}`}>
         {title}
      </div>
      
      <div 
        onClick={(e) => { e.stopPropagation(); setSelectedNode(id); }}
        className={`w-full h-full bg-[#121212] rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ${isSelected ? 'ring-2 ring-white shadow-[0_0_0_6px_rgba(255,255,255,0.1)]' : 'shadow-2xl hover:ring-1 hover:ring-white/30'}`}
      >
        <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-[#161616]">
           <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
           <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
           <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
        </div>
        <div className="flex-1 relative overflow-hidden bg-black/20">
           {children}
        </div>
      </div>
    </div>
  );
}
