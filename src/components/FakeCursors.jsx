import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { MousePointer2 } from 'lucide-react';

export function FakeCursors() {
  const cameraPos = useStore(state => state.cameraPos);
  
  const [cursors, setCursors] = useState([
    { id: 1, name: 'Recruiter', color: '#ffb5a1', x: -1600, y: 1500, targetX: -1600, targetY: 1500 },
    { id: 2, name: 'Lead Designer', color: '#7fd0ff', x: 0, y: 3000, targetX: 0, targetY: 3000 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursors(prev => prev.map(c => {
        // 10% chance to pick a new target coordinate anywhere on the canvas
        if (Math.random() < 0.1) {
           return { ...c, targetX: c.x + (Math.random() * 4000 - 2000), targetY: c.y + (Math.random() * 4000 - 2000) };
        }
        // Smoothly interpolate towards target
        return {
           ...c,
           x: c.x + (c.targetX - c.x) * 0.05,
           y: c.y + (c.targetY - c.y) * 0.05
        };
      }));
    }, 50); // High frequency for smooth drifting
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {cursors.map(c => {
         const screenX = c.x * cameraPos.zoom + cameraPos.x;
         const screenY = c.y * cameraPos.zoom + cameraPos.y;
         
         return (
           <div 
             key={c.id} 
             className="absolute transition-all duration-75 ease-linear pointer-events-none"
             style={{ left: screenX, top: screenY }}
           >
             <MousePointer2 size={20} fill={c.color} color={c.color} className="transform -scale-x-100 rotate-12 drop-shadow-xl" />
             <div className="mt-1 ml-4 px-2 py-0.5 rounded text-[10px] font-bold text-black font-jetbrains shadow-lg w-max" style={{ backgroundColor: c.color }}>
               {c.name}
             </div>
           </div>
         );
      })}
    </div>
  );
}
