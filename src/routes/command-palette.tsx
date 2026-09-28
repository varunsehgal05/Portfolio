import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
export const Route = createFileRoute("/command-palette")({
  head: () => ({
    meta: [
      { title: "Spectral Chroma - Command Palette" },
      { name: "description", content: "Quickly search and run commands, plugins, and navigation actions in Spectral Chroma." },
      { property: "og:title", content: "Spectral Chroma - Command Palette" },
      { property: "og:description", content: "Quickly search and run commands, plugins, and navigation actions in Spectral Chroma." },
    ],
  }),
  component: CommandPalettePage,
});

function CommandPalettePage() {
  const [open, setOpen] = useState(true);
  const [blurred, setBlurred] = useState(true);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setBlurred(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-hidden selection:bg-primary-container/30 selection:text-primary">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-16 bg-surface border-b border-outline-variant/10 backdrop-blur-3xl bg-surface/60">
        <div className="flex items-center gap-6">
          <div className="font-headline-md text-headline-md font-bold text-primary tracking-tight">Spectral Chroma</div>
          
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1.5 rounded-lg font-label-md text-label-md transition-all duration-200 border border-primary/20">Share</button>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <button className="p-1.5 hover:bg-surface-variant/20 rounded-md transition-colors active:scale-[0.98]">
              <span className="material-symbols-outlined" data-icon="settings">settings</span>
            </button>
            <button className="p-1.5 hover:bg-surface-variant/20 rounded-md transition-colors active:scale-[0.98]">
              <span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
            </button>
          </div>
        </div>
      </header>
      {/* Main Workspace Background (Blurred out for modal context) */}
      <main className={`pt-16 w-full h-screen flex transition-all duration-300 pointer-events-none ${blurred ? "filter blur-[2px] opacity-50" : ""}`}>
        {/* Mock Canvas Background */}
        <div className="w-full h-full bg-[#0A0A0A] relative" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary-container/5 mix-blend-screen"></div>
        </div>
      </main>
      {/* Command Palette Overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[153px] px-4 bg-background/40 backdrop-blur-sm" id="commandPaletteOverlay">
          {/* Command Palette Modal */}
          <div className="w-full max-w-[640px] glass-panel rounded-xl shadow-2xl flex flex-col overflow-hidden modal-enter border border-white/10 glow-hover transition-shadow duration-300">
            {/* Search Input Area */}
            <div className="px-4 py-4 border-b border-white/5 flex items-center gap-3 bg-surface-container-low/50">
              <span className="material-symbols-outlined text-on-surface-variant" data-icon="search">search</span>
              <input autoFocus className="flex-1 bg-transparent border-none text-on-surface font-body-lg text-body-lg placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-0 p-0" placeholder="Type a command or search..." type="text" defaultValue="Create" />
              <span className="kbd-key">ESC</span>
            </div>
            {/* Command List Area */}
            <div className="flex-1 overflow-y-auto max-h-[400px] py-2">
              {/* Section: Recent */}
              <div className="px-4 py-2 font-label-md text-label-md text-on-surface-variant/60 uppercase tracking-wider text-[10px]">
                Recent Actions
              </div>
              <ul className="flex flex-col px-2">
                {/* Active Item */}
                <li>
                  <button className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20 group transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] opacity-90" data-icon="add_box">add_box</span>
                      <span className="font-body-md text-body-md font-medium">Create New Component</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="kbd-key border-primary/30 text-primary">↵</span>
                      <span className="text-[10px] font-label-md text-primary/70 ml-1">to Run</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-on-surface group transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant" data-icon="search">search</span>
                      <span className="font-body-md text-body-md">Search Layers</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="kbd-key">⌘</span><span className="kbd-key">F</span>
                    </div>
                  </button>
                </li>
              </ul>
              {/* Section: Plugins */}
              <div className="px-4 py-2 mt-2 font-label-md text-label-md text-on-surface-variant/60 uppercase tracking-wider text-[10px]">
                Plugins
              </div>
              <ul className="flex flex-col px-2">
                <li>
                  <button className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-on-surface group transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-secondary" data-icon="extension">extension</span>
                      <span className="font-body-md text-body-md">Run Plugin...</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="kbd-key">⌥</span><span className="kbd-key">⌘</span><span className="kbd-key">P</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-on-surface group transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-tertiary" data-icon="auto_awesome">auto_awesome</span>
                      <span className="font-body-md text-body-md">Generate Asset</span>
                    </div>
                    <span className="text-xs font-label-md text-on-surface-variant px-2 py-0.5 rounded bg-white/5">AI</span>
                  </button>
                </li>
              </ul>
              {/* Section: Navigation */}
              <div className="px-4 py-2 mt-2 font-label-md text-label-md text-on-surface-variant/60 uppercase tracking-wider text-[10px]">
                Navigation
              </div>
              <ul className="flex flex-col px-2 pb-2">
                <li>
                  <button className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-on-surface group transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant" data-icon="home">home</span>
                      <span className="font-body-md text-body-md">Go to Home</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="kbd-key">⇧</span><span className="kbd-key">H</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-on-surface group transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant" data-icon="settings">settings</span>
                      <span className="font-body-md text-body-md">Open Settings</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="kbd-key">⌘</span><span className="kbd-key">,</span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
            {/* Footer Toolbar */}
            <div className="px-4 py-3 bg-surface-container-lowest/50 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4 text-on-surface-variant/70 font-label-md text-label-md text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="kbd-key leading-none">↑</span><span className="kbd-key leading-none">↓</span>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="kbd-key leading-none">↵</span>
                  <span>Select</span>
                </div>
              </div>
              <div className="font-label-md text-label-md text-primary/50 text-[10px] tracking-wider uppercase">
                Spectral CLI
              </div>
            </div>
          </div>
        </div>
      )}
          
    </div>
  );
}
