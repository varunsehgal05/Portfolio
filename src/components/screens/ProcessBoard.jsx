import React from 'react';
import { Artboard } from './Artboard';

export function ProcessBoard({ x, y }) {
  return (
    <Artboard id="process" x={x} y={y} width={900} height={700} title="Phase 01: Ideation (FigJam)">
      <div className="w-full h-full bg-[#1e1e1e] p-12 relative" style={{ backgroundImage: 'radial-gradient(#ffffff22 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
         <h2 className="text-white/40 text-xl font-jetbrains mb-8">USER JOURNEY MAPPING</h2>
         
         <div className="absolute top-32 left-32 w-64 h-64 bg-[#ffd565] shadow-xl p-6 text-black font-medium rotate-[-2deg] flex flex-col">
            <span className="text-sm opacity-50 mb-2">Note 1</span>
            <p className="text-lg">User needs to feel like they are entering a dev workspace, not just a website.</p>
         </div>

         <div className="absolute top-48 left-[400px] w-64 h-64 bg-[#7fd0ff] shadow-xl p-6 text-black font-medium rotate-[3deg] flex flex-col">
            <span className="text-sm opacity-50 mb-2">Technical</span>
            <p className="text-lg">Use React Spring for the infinite canvas panning to match Figma's feel exactly.</p>
         </div>

         <div className="absolute top-80 left-24 w-64 h-64 bg-[#ffb5a1] shadow-xl p-6 text-black font-medium rotate-[1deg] flex flex-col">
            <span className="text-sm opacity-50 mb-2">Aesthetic</span>
            <p className="text-lg">Deep dark mode. Lots of glassmorphism. Avoid solid borders.</p>
         </div>
      </div>
    </Artboard>
  );
}
