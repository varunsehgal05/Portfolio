import React from 'react';
import { Artboard } from '../Artboard';

export function WireframeTemplate({ id, x, y, title }) {
  return (
    <Artboard id={id} x={x} y={y} width={1000} height={1200} title={title}>
      <div className="w-full h-full bg-[#121212] p-12 text-white font-inter flex flex-col gap-8">
         <h1 className="text-3xl font-bold text-white/30">{title} (Wireframe)</h1>
         
         <div className="w-full h-64 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-white/10 text-6xl">image</span>
         </div>

         <div className="grid grid-cols-3 gap-8">
            <div className="h-48 bg-white/5 rounded-2xl border border-white/10"></div>
            <div className="h-48 bg-white/5 rounded-2xl border border-white/10"></div>
            <div className="h-48 bg-white/5 rounded-2xl border border-white/10"></div>
         </div>

         <div className="space-y-4 flex-1">
            <div className="w-3/4 h-8 bg-white/5 rounded-lg"></div>
            <div className="w-full h-4 bg-white/5 rounded"></div>
            <div className="w-full h-4 bg-white/5 rounded"></div>
            <div className="w-5/6 h-4 bg-white/5 rounded"></div>
         </div>
      </div>
    </Artboard>
  );
}
