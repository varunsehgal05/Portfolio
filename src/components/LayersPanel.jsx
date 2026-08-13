import React, { useState } from 'react';
import { useStore } from '../store';
import { ChevronRight, ChevronDown, Frame, Type, Image } from 'lucide-react';
import { bespokePages } from '../gridConfig';

function TreeItem({ name, id, icon: Icon = Frame, children }) {
  const [isOpen, setIsOpen] = useState(true);
  const setTargetTransform = useStore(state => state.setTargetTransform);
  const setSelectedNode = useStore(state => state.setSelectedNode);
  const selectedNode = useStore(state => state.selectedNode);

  const isSelected = selectedNode === id;

  const handleClick = (e) => {
    e.stopPropagation();
    if (id) {
      setSelectedNode(id);
      const page = bespokePages.find(p => p.id === id);
      if (page) {
        // Fly camera to it
        setTargetTransform({ 
          x: -page.x * 0.8 + window.innerWidth/2 - (page.width || 1000) * 0.4, 
          y: -page.y * 0.8 + window.innerHeight/2 - (page.height || 800) * 0.4, 
          zoom: 0.8 
        });
      }
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center gap-1.5 py-1 px-2 cursor-pointer rounded ${isSelected ? 'bg-[#ffb5a1]/20 text-[#ffb5a1]' : 'hover:bg-white/5 text-white/80'}`}
        onClick={handleClick}
      >
        <div onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="w-4 flex items-center justify-center text-white/40 hover:text-white">
          {children && (isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
        </div>
        <Icon size={14} className={isSelected ? 'text-[#ffb5a1]' : 'text-white/40'} />
        <span className="font-inter text-xs font-medium truncate">{name}</span>
      </div>
      {isOpen && children && (
        <div className="pl-4 border-l border-[#3c3c3c] ml-2 mt-1 flex flex-col gap-0.5">
          {children}
        </div>
      )}
    </div>
  );
}

export function LayersPanel() {
  return (
    <div className="flex flex-col gap-1 select-none">
       <TreeItem name="Portfolio.fig" icon={Frame}>
          <TreeItem name="Home" id="hero" icon={Frame}>
             <TreeItem name="Quick Intro" id="hero" icon={Type} />
             <TreeItem name="CTA" id="hero" icon={Frame} />
          </TreeItem>
          <TreeItem name="About Me" id="about" icon={Frame}>
             <TreeItem name="Bio" id="about" icon={Type} />
             <TreeItem name="Journey" id="about" icon={Image} />
             <TreeItem name="Sticky Notes" id="about" icon={Frame} />
          </TreeItem>
          <TreeItem name="Projects" id="projects_overview" icon={Frame}>
             <TreeItem name="Expense App" id="projects_overview" icon={Frame} />
             <TreeItem name="ArenaX" id="projects_overview" icon={Image} />
          </TreeItem>
          <TreeItem name="Skills" id="skill_arsenal" icon={Frame}>
             <TreeItem name="UI/UX" id="skill_arsenal" icon={Type} />
             <TreeItem name="Motion" id="skill_arsenal" icon={Frame} />
          </TreeItem>
       </TreeItem>
    </div>
  );
}
