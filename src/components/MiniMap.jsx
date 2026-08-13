import React from 'react';
import { useStore } from '../store';
import { bespokePages } from '../gridConfig';

export function MiniMap() {
  const cameraPos = useStore(state => state.cameraPos);
  
  // A rough scale factor to map canvas coords to minimap coords
  const MAP_SCALE = 0.015;
  const MAP_WIDTH = 200;
  const MAP_HEIGHT = 140;
  
  // Offset to center the minimap around (0,0) of the canvas
  const offsetX = MAP_WIDTH / 2;
  const offsetY = MAP_HEIGHT / 2;

  // Calculate viewport box based on inverse camera transform
  const viewportWidth = (window.innerWidth * MAP_SCALE) / (cameraPos.zoom || 0.15);
  const viewportHeight = (window.innerHeight * MAP_SCALE) / (cameraPos.zoom || 0.15);
  const viewportX = offsetX - (cameraPos.x * MAP_SCALE) / (cameraPos.zoom || 0.15);
  const viewportY = offsetY - (cameraPos.y * MAP_SCALE) / (cameraPos.zoom || 0.15);

  return (
    <div className="absolute bottom-12 right-72 w-[200px] h-[140px] bg-[#1a1c1c]/90 backdrop-blur-md border border-[#3c3c3c] rounded-xl shadow-[0_16px_32px_rgba(0,0,0,0.5)] z-20 overflow-hidden hidden md:block">
       {/* Map nodes */}
       {bespokePages.map(page => (
         <div 
           key={page.id} 
           className={`absolute rounded-[1px] ${page.type === 'coded' ? 'bg-[#ffb5a1]/60' : 'bg-white/10'}`}
           style={{
              left: (page.x * MAP_SCALE) + offsetX,
              top: (page.y * MAP_SCALE) + offsetY,
              width: ((page.width || 1000) * MAP_SCALE),
              height: ((page.height || 800) * MAP_SCALE),
           }}
         />
       ))}
       {/* Viewport Box representing the camera */}
       <div 
         className="absolute border-2 border-[#7fd0ff] bg-[#7fd0ff]/10 shadow-[0_0_10px_rgba(127,208,255,0.2)]"
         style={{
            left: viewportX,
            top: viewportY,
            width: viewportWidth,
            height: viewportHeight,
            transition: 'all 0.1s ease-out'
         }}
       />
    </div>
  );
}
