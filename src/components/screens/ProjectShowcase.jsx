import React from 'react';
import { Artboard } from './Artboard';

export function ProjectShowcase({ x, y }) {
  return (
    <Artboard id="projects" x={x} y={y} width={1200} height={800} title="Project Showcase (CTA Card)">
      <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
        
        {/* The Glassmorphic Project Card */}
        <div className="w-[440px] p-8 rounded-2xl bg-surface-variant backdrop-blur-2xl border border-tertiary/30 shadow-[0_0_64px_rgba(127,208,255,0.1)] transition-all hover:shadow-[0_0_80px_rgba(127,208,255,0.2)] hover:-translate-y-2">
           <div className="w-full aspect-video bg-black/50 rounded-xl mb-6 overflow-hidden border border-white/5 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-tertiary/20 to-transparent"></div>
           </div>
           <h3 className="text-2xl font-bold text-white mb-2">Neon Synth</h3>
           <p className="text-white/60 text-sm mb-6 leading-relaxed">
             A high-performance WebGL audio visualizer utilizing custom GLSL shaders and React Three Fiber.
           </p>
           <div className="flex gap-2 mb-8">
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80 font-jetbrains">WebGL</span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80 font-jetbrains">React</span>
           </div>
           <button className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200">
             View Case Study
           </button>
        </div>

      </div>
    </Artboard>
  );
}
