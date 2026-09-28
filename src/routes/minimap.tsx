import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ZoomWidget } from "../components/ZoomWidget";

export const Route = createFileRoute("/minimap")({
  head: () => ({
    meta: [
      { title: "Navigation Mini-map" },
      { name: "description", content: "Interact with the mini-map to navigate the canvas." },
      { property: "og:title", content: "Navigation Mini-map" },
      { property: "og:description", content: "Interact with the mini-map to navigate the canvas." },
    ],
  }),
  component: Minimap,
});

function Minimap() {
  const [currentScale, setCurrentScale] = useState(1);
  return (
    <div className="text-on-surface font-body-md min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop">
      {/* Main Workspace Area */}
      <div className="relative w-full max-w-container-max h-[800px] border border-outline-variant/20 rounded-xl overflow-hidden bg-surface-container-lowest flex items-center justify-center">
        {/* Simulated Infinite Canvas Content */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {/* Decorative canvas elements */}
          <div className="absolute top-[20%] left-[10%] w-[300px] h-[400px] border border-primary/30 rounded-lg"></div>
          <div className="absolute top-[10%] left-[50%] w-[500px] h-[300px] border border-tertiary/30 rounded-lg"></div>
          <div className="absolute top-[60%] left-[40%] w-[400px] h-[400px] border border-secondary/30 rounded-lg"></div>
        </div>
        <div className="text-center z-10">
          <h1 className="font-display-lg text-display-lg text-primary mb-unit">Navigation Mini-map</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Interact with the mini-map to navigate the canvas.</p>
        </div>
        {/* Mini-map Widget */}
        <div className="absolute bottom-gutter right-gutter w-64 glass-panel rounded-xl flex flex-col overflow-hidden nav-glow transition-all duration-300 hover:scale-[1.02]">
          {/* Mini-map Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-surface-container-low/50">
            <span className="font-label-md text-label-md text-primary">Mini-map</span>
            <button className="text-on-surface-variant hover:text-primary transition-colors duration-200">
              <span className="material-symbols-outlined text-[18px]">more_horiz</span>
            </button>
          </div>
          {/* Mini-map Canvas */}
          <div className="relative h-48 bg-background p-4 flex items-center justify-center">
            {/* Scaled down representation of artboards */}
            <div className="relative w-full h-full border border-white/5 bg-surface-container-lowest">
              {/* Artboard 1 */}
              <div className="absolute top-[20%] left-[10%] w-[30%] h-[40%] bg-surface-variant/50 border border-white/10 rounded"></div>
              {/* Artboard 2 */}
              <div className="absolute top-[10%] left-[50%] w-[40%] h-[30%] bg-surface-variant/50 border border-white/10 rounded"></div>
              {/* Artboard 3 */}
              <div className="absolute top-[60%] left-[40%] w-[35%] h-[35%] bg-surface-variant/50 border border-white/10 rounded"></div>
              {/* Viewport Indicator (The blue selection rectangle) */}
              <div className="absolute top-[25%] left-[30%] w-[40%] h-[50%] border-2 border-secondary bg-secondary/10 rounded-sm cursor-move shadow-[0_0_15px_rgba(216,185,255,0.3)]"></div>
            </div>
          </div>
          {/* Mini-map Controls */}
          <div className="flex items-center justify-between p-4 bg-surface-container-low/50">
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 bg-transparent text-on-surface hover:border-secondary hover:text-secondary spectral-glow transition-all duration-200" title="Zoom Out">
                <span className="material-symbols-outlined text-[16px]">remove</span>
              </button>
              <span className="font-label-md text-label-md text-on-surface-variant w-12 text-center">100%</span>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 bg-transparent text-on-surface hover:border-secondary hover:text-secondary spectral-glow transition-all duration-200" title="Zoom In">
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 bg-transparent text-on-surface hover:border-primary hover:text-primary spectral-glow transition-all duration-200" title="Back to Center">
              <span className="material-symbols-outlined text-[16px]">filter_center_focus</span>
            </button>
          </div>
        </div>
        <ZoomWidget
          scale={currentScale}
          onZoomIn={() => setCurrentScale(s => Math.min(Number((s + 0.1).toFixed(2)), 2))}
          onZoomOut={() => setCurrentScale(s => Math.max(Number((s - 0.1).toFixed(2)), 0.2))}
          onFitAll={() => setCurrentScale(1)}
          x={0}
          y={0}
          className="bottom-28 right-6 z-[110]"
        />
      </div>
          
    </div>
  );
}
