import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/plugins")({
  head: () => ({
    meta: [
      { title: "Plugins Showcase - Spectral Chroma" },
      { name: "description", content: "Browse installed plugins that supercharge the Spectral Chroma creative workflow." },
      { property: "og:title", content: "Plugins Showcase - Spectral Chroma" },
      { property: "og:description", content: "Browse installed plugins that supercharge the Spectral Chroma creative workflow." },
    ],
  }),
  component: PluginsPage,
});

function PluginsPage() {
  return (
    <div className="antialiased min-h-screen flex flex-col selection:bg-primary selection:text-background">
      {/* TopNavBar */}
      
      {/* Main Workspace Layout */}
      <div className="flex flex-1 pt-16 h-screen w-full overflow-hidden relative bg-background">
        {/* Center Canvas (Plugins Showcase) */}
        <main className="flex-1 p-margin-desktop overflow-y-auto relative h-[calc(100vh-4rem)]">
          {/* Canvas Background subtle effect */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Page Header */}
            <header className="mb-12">
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2 tracking-tight">Plugins</h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                Supercharge your creative workflow with installed extensions. These tools seamlessly integrate into your workspace to automate tasks, source assets, and bridge development.
              </p>
            </header>

            {/* Plugins Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Plugin Card: Autoflow */}
              <a href="https://www.figma.com/community/plugin/733902567457592893" target="_blank" className="glass-panel p-6 rounded-xl hover-glow group cursor-pointer relative overflow-hidden flex flex-col h-full hover:no-underline text-on-surface">

                <div className="flex items-start mb-4 space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FF5722]/10 border border-[#FF5722]/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#FF5722] text-2xl">route</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface text-xl mb-1 group-hover:text-primary transition-colors">Autoflow</h3>
                    <div className="font-label-md text-label-md text-primary-container text-xs inline-flex items-center px-2 py-0.5 rounded bg-primary-container/10 border border-primary-container/20">
                      Productivity
                    </div>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-6 flex-grow">
                  Automatically draw flow arrows between frames. Select any two shapes or frames while holding shift, and a connector magically appears.
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="font-caption text-caption text-outline">v2.1.4</span>
                  <span className="bg-surface-variant text-on-surface hover:text-background hover:bg-primary font-label-md text-label-md px-4 py-1.5 rounded-full transition-all border border-outline-variant/20 hover:border-transparent flex items-center space-x-1">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    <span>Run</span>
                  </span>
                </div>
              </a>
              {/* Plugin Card: Figmotion */}
              <a href="https://www.figmotion.app/" target="_blank" className="glass-panel p-6 rounded-xl hover-glow group cursor-pointer relative overflow-hidden flex flex-col h-full hover:no-underline text-on-surface">

                <div className="flex items-start mb-4 space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-[#6904C5]/10 border border-[#6904C5]/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#D0ACFF] text-2xl">animation</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface text-xl mb-1 group-hover:text-primary transition-colors">Figmotion</h3>
                    <div className="font-label-md text-label-md text-secondary-fixed-dim text-xs inline-flex items-center px-2 py-0.5 rounded bg-secondary-container/20 border border-secondary-container/40">
                      Animation
                    </div>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-6 flex-grow">
                  An animation tool built right in. Manage timelines, keyframes, and export complex micro-interactions directly to CSS or JSON.
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="font-caption text-caption text-outline">v3.0.1</span>
                  <span className="bg-surface-variant text-on-surface hover:text-background hover:bg-primary font-label-md text-label-md px-4 py-1.5 rounded-full transition-all border border-outline-variant/20 hover:border-transparent flex items-center space-x-1">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    <span>Run</span>
                  </span>
                </div>
              </a>
              {/* Plugin Card: Unsplash */}
              <a href="https://unsplash.com/" target="_blank" className="glass-panel p-6 rounded-xl hover-glow group cursor-pointer relative overflow-hidden flex flex-col h-full hover:no-underline text-on-surface">

                <div className="flex items-start mb-4 space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-surface-bright border border-outline-variant/40 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <span className="material-symbols-outlined text-on-surface text-2xl">image</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface text-xl mb-1 group-hover:text-primary transition-colors">Unsplash</h3>
                    <div className="font-label-md text-label-md text-tertiary text-xs inline-flex items-center px-2 py-0.5 rounded bg-tertiary-container/20 border border-tertiary-container/40">
                      Assets
                    </div>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-6 flex-grow">
                  Insert beautiful, high-quality images directly into your designs. Search the entire library without leaving the canvas.
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="font-caption text-caption text-outline">v1.8.0</span>
                  <span className="bg-surface-variant text-on-surface hover:text-background hover:bg-primary font-label-md text-label-md px-4 py-1.5 rounded-full transition-all border border-outline-variant/20 hover:border-transparent flex items-center space-x-1">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    <span>Run</span>
                  </span>
                </div>
              </a>
              {/* Plugin Card: Iconify */}
              <a href="https://iconify.design/" target="_blank" className="glass-panel p-6 rounded-xl hover-glow group cursor-pointer relative overflow-hidden flex flex-col h-full hover:no-underline text-on-surface">

                <div className="flex items-start mb-4 space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-[#009BD3]/10 border border-[#009BD3]/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-tertiary text-2xl">sentiment_satisfied</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface text-xl mb-1 group-hover:text-primary transition-colors">Iconify</h3>
                    <div className="font-label-md text-label-md text-tertiary text-xs inline-flex items-center px-2 py-0.5 rounded bg-tertiary-container/20 border border-tertiary-container/40">
                      Assets
                    </div>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-6 flex-grow">
                  Import over 100,000 vector icons to your project. Includes Material Design, FontAwesome, Jam Icons, and more.
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="font-caption text-caption text-outline">v2.4.2</span>
                  <span className="bg-surface-variant text-on-surface hover:text-background hover:bg-primary font-label-md text-label-md px-4 py-1.5 rounded-full transition-all border border-outline-variant/20 hover:border-transparent flex items-center space-x-1">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    <span>Run</span>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </main>

      </div>
          
    </div>
  );
}
