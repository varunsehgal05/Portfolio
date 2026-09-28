import React from "react";

interface ZoomWidgetProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitAll: () => void;
  x?: number;
  y?: number;
  className?: string;
}

export function ZoomWidget({
  scale,
  onZoomIn,
  onZoomOut,
  onFitAll,
  x = 0,
  y = 0,
  className = "bottom-28 right-6 z-[110]",
}: ZoomWidgetProps) {
  return (
    <div
      className={`absolute ${className} bg-[#1A1A1A] flex flex-col rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-[#2E2E2E] font-mono select-none w-[110px] overflow-hidden`}
    >
      {/* Coordinates Bar */}
      <div className="px-3 py-1.5 text-center text-[10px] text-[#F2F2F2]/60 border-b border-[#2E2E2E] cursor-default bg-[#0A0A0A]/60 tracking-wider">
        X: {Math.round(x)} Y: {Math.round(y)}
      </div>

      {/* Zoom In (+) */}
      <button
        type="button"
        onClick={onZoomIn}
        title="Zoom In"
        className="py-2 hover:bg-white/10 text-[#F2F2F2] transition-colors border-b border-[#2E2E2E] flex justify-center items-center h-9 active:bg-white/20"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
      </button>

      {/* Percentage Display Pill */}
      <button
        type="button"
        onClick={onFitAll}
        title="Click to reset zoom"
        className="py-1.5 text-center text-[11px] text-white/90 bg-[#252525] border-b border-[#2E2E2E] cursor-pointer hover:text-primary transition-colors font-bold tracking-widest block w-full"
      >
        {Math.round(scale * 100)}%
      </button>

      {/* Zoom Out (-) */}
      <button
        type="button"
        onClick={onZoomOut}
        title="Zoom Out"
        className="py-2 hover:bg-white/10 text-[#F2F2F2] transition-colors border-b border-[#2E2E2E] flex justify-center items-center h-9 active:bg-white/20"
      >
        <span className="material-symbols-outlined text-[18px]">remove</span>
      </button>

      {/* Fit All */}
      <button
        type="button"
        onClick={onFitAll}
        title="Fit All"
        className="py-2 hover:bg-primary/20 text-xs text-[#FFB1A3] font-bold flex justify-center items-center gap-1.5 transition-colors cursor-pointer active:bg-primary/30"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-[#FFB1A3]"
        >
          <path d="M3 7V3h4M17 7V3h-4M3 13v4h4M17 13v4h-4" />
          <rect x="6.5" y="7.5" width="7" height="5" rx="1" />
        </svg>
        <span>Fit All</span>
      </button>
    </div>
  );
}
export default ZoomWidget;
