import React from 'react';
import { Artboard } from './Artboard';

export function DesignSystem({ x, y }) {
  return (
    <Artboard id="design" x={x} y={y} width={800} height={800} title="Spectral Chroma - Design System">
      <div className="p-12 text-white">
        <h2 className="text-3xl font-bold mb-12">Design Tokens</h2>
        
        <div className="mb-12">
          <h3 className="text-sm opacity-50 mb-4 font-jetbrains">COLOR PALETTE</h3>
          <div className="flex gap-4">
             <div className="w-24 h-24 rounded-2xl bg-[#0e0e0e] border border-white/10 shadow-lg"></div>
             <div className="w-24 h-24 rounded-2xl bg-[#1a1c1c] border border-white/10 shadow-lg"></div>
             <div className="w-24 h-24 rounded-2xl bg-[#ffb5a1] shadow-lg shadow-[#ffb5a1]/20"></div>
             <div className="w-24 h-24 rounded-2xl bg-[#7fd0ff] shadow-lg shadow-[#7fd0ff]/20"></div>
          </div>
        </div>

        <div>
          <h3 className="text-sm opacity-50 mb-4 font-jetbrains">TYPOGRAPHY</h3>
          <div className="space-y-6">
             <div className="text-6xl font-bold tracking-tighter">Geist Sans</div>
             <div className="text-3xl font-medium">Inter (Body text)</div>
             <div className="text-xl font-jetbrains text-tertiary">JetBrains Mono (Code)</div>
          </div>
        </div>
      </div>
    </Artboard>
  );
}
