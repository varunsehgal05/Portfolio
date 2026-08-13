import React from 'react';
import { Artboard } from '../Artboard';
import { Loader2 } from 'lucide-react';

export function ScreenshotArtboard({ id, x, y, width = 1000, height = 800, title, imageSrc }) {
  const finalSrc = imageSrc || `/screens/${id}.png`;
  return (
    <Artboard id={id} x={x} y={y} width={width} height={height} title={title}>
       <div className="w-full h-full bg-[#1a1c1c] flex items-center justify-center overflow-hidden group relative">
          <img 
             src={`/screens/${id}.png`} 
             alt={title} 
             className="w-full h-full object-cover absolute inset-0 z-10" 
             onError={(e) => {
               e.target.style.display = 'none';
               e.target.nextElementSibling.classList.remove('hidden');
               e.target.nextElementSibling.classList.add('flex');
             }}
          />
          <div className="hidden w-full h-full flex-col items-center justify-center text-white z-0 absolute inset-0 bg-[#121212]">
             <Loader2 size={48} className="text-[#ffb5a1] opacity-50 animate-spin mb-6" />
             <h2 className="text-2xl font-bold font-inter mb-2">Figma Export Pending</h2>
             <p className="text-white/40 text-sm font-jetbrains uppercase tracking-widest">{id}.png</p>
          </div>
       </div>
    </Artboard>
  );
}
