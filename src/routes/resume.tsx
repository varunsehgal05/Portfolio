import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { ZoomWidget } from "../components/ZoomWidget";

export const Route = createFileRoute('/resume')({
  head: () => ({
    meta: [
      { title: 'Resume - Varun Sehgal' },
      { name: "description", content: 'Experience, education and craft of product designer Varun Sehgal, laid out as an infinite design canvas.' },
      { property: "og:title", content: 'Resume - Varun Sehgal' },
      { property: "og:description", content: 'Experience, education and craft of product designer Varun Sehgal, laid out as an infinite design canvas.' },
    ],
  }),
  component: Resume,
});

function Resume() {
  const canvasAreaRef = useRef<HTMLElement | null>(null);
  const canvasContentRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startY: 0, translateX: 0, translateY: 0 });
  const [currentScale, setCurrentScale] = useState(1);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/Varun_Sehgal_Resume.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Varun_Sehgal_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Failed to download resume:", err);
      window.open('/Varun_Sehgal_Resume.pdf', '_blank');
    }
  };

  // Mouse drag to pan
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragState.current.startX = e.clientX - dragState.current.translateX;
    dragState.current.startY = e.clientY - dragState.current.translateY;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const translateX = e.clientX - dragState.current.startX;
    const translateY = e.clientY - dragState.current.startY;
    dragState.current.translateX = translateX;
    dragState.current.translateY = translateY;
    setCoords({ x: Math.round(-translateX), y: Math.round(-translateY) });

    if (canvasContentRef.current) {
      canvasContentRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    }
    if (canvasAreaRef.current) {
      canvasAreaRef.current.style.backgroundPosition = `${translateX}px ${translateY}px`;
    }
  };

  const onMouseUp = () => setIsDragging(false);

  // Wheel to pan & Ctrl/Cmd+Wheel to zoom
  useEffect(() => {
    const el = canvasAreaRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        // Zoom
        const zoomDelta = e.deltaY < 0 ? 0.08 : -0.08;
        setCurrentScale(s => Math.min(Math.max(Number((s + zoomDelta).toFixed(2)), 0.2), 3));
      } else {
        // Pan
        const newX = dragState.current.translateX - e.deltaX;
        const newY = dragState.current.translateY - e.deltaY;
        dragState.current.translateX = newX;
        dragState.current.translateY = newY;
        setCoords({ x: Math.round(-newX), y: Math.round(-newY) });

        if (canvasContentRef.current) {
          canvasContentRef.current.style.transform = `translate(${newX}px, ${newY}px) scale(${currentScale})`;
        }
        if (canvasAreaRef.current) {
          canvasAreaRef.current.style.backgroundPosition = `${newX}px ${newY}px`;
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [currentScale]);

  // Sync transform when scale changes via buttons
  useEffect(() => {
    if (canvasContentRef.current) {
      canvasContentRef.current.style.transform = `translate(${dragState.current.translateX}px, ${dragState.current.translateY}px) scale(${currentScale})`;
    }
  }, [currentScale]);

  // Fit All / Reset view to origin
  const fitToOverview = (smooth = true) => {
    setCurrentScale(1);
    dragState.current.translateX = 0;
    dragState.current.translateY = 0;
    setCoords({ x: 0, y: 0 });

    if (canvasContentRef.current) {
      if (smooth) canvasContentRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
      canvasContentRef.current.style.transform = `translate(0px, 0px) scale(1)`;
      if (smooth) {
        setTimeout(() => {
          if (canvasContentRef.current) canvasContentRef.current.style.transition = 'none';
        }, 400);
      }
    }
    if (canvasAreaRef.current) {
      if (smooth) canvasAreaRef.current.style.transition = 'background-position 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
      canvasAreaRef.current.style.backgroundPosition = `0px 0px`;
      if (smooth) {
        setTimeout(() => {
          if (canvasAreaRef.current) canvasAreaRef.current.style.transition = 'none';
        }, 400);
      }
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen overflow-hidden antialiased selection:bg-primary selection:text-on-primary">

      {/* Left Workspace Navigation Sidebar */}
      <aside className="fixed top-14 left-0 h-[calc(100vh-56px)] w-64 z-40 flex flex-col py-4 bg-surface-container-low/80 dark:bg-surface-container-low/80 backdrop-blur-xl border-r border-white/5 flat no shadows hidden md:flex">
        <div className="px-6 mb-8 mt-2 flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Resume</h2>
            <span className="font-caption text-caption text-on-surface-variant">Document Viewer</span>
          </div>
        </div>

        <div className="px-6 mb-4 mt-auto">
          <button onClick={handleDownload} className="flex items-center justify-center gap-2 w-full py-2.5 rounded bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download Resume
          </button>
        </div>
      </aside>

      {/* Main Infinite Canvas */}
      <main
        ref={canvasAreaRef}
        className={`fixed inset-0 pt-14 md:pl-64 flex bg-[#0A0A0A] overflow-hidden select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Infinite Movable Plane */}
        <div
          ref={canvasContentRef}
          className="relative w-full h-full flex items-center justify-center pointer-events-auto"
          style={{
            transform: `translate(${dragState.current.translateX}px, ${dragState.current.translateY}px) scale(${currentScale})`,
          }}
        >
          {/* Resume PDF Viewer */}
          <div className="w-[850px] h-[1150px] bg-transparent rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col overflow-hidden pointer-events-auto" onMouseDown={(e) => e.stopPropagation()}>
            <iframe src="/Varun_Sehgal_Resume.pdf#toolbar=0&navpanes=0&view=FitH" className="w-full h-full border-none" title="Varun Sehgal Resume" />
          </div>
        </div>

        {/* Floating Figma Zoom Widget */}
        <ZoomWidget
          scale={currentScale}
          onZoomIn={() => setCurrentScale(s => Math.min(Number((s + 0.1).toFixed(2)), 3))}
          onZoomOut={() => setCurrentScale(s => Math.max(Number((s - 0.1).toFixed(2)), 0.2))}
          onFitAll={() => fitToOverview(true)}
          x={coords.x}
          y={coords.y}
          className="bottom-28 right-6 z-[110]"
        />
      </main>

    </div>
  );
}
