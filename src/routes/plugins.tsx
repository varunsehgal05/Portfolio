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
        {/* Left SideNavBar (Layers/Assets) */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 z-40 flex flex-col p-4 bg-surface dark:bg-surface-container-low border-r border-outline-variant/10 backdrop-blur-2xl glass-panel h-[calc(100vh-4rem)]">
          {/* Header */}
          <div className="mb-8 flex items-center space-x-3 p-2">
            <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant/20">
              <img alt="Project Workspace" className="w-full h-full object-cover opacity-80 mix-blend-screen" data-alt="A macro shot of a glowing digital crystal prism reflecting spectral light in a dark void. Highly detailed, cinematic lighting, sleek tech aesthetic. 8k resolution, minimalist composition." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSC-P1S9vqujjobfp9E1KZ5MkXBL29BXV1-M1Ytb3RAvAlvTOKpGFmnJ0P4sT830FyfH459nYfJz9IYy3x0wF_xKcg849N1GrCHumd8J_GRed1i2BOu8hhJU4j0nGaTsdUCmvjcqHYhIWepC1vXThjub4LhaZ2Fy-eMgZUMyE2-mZCtrp2S_XL0_quZ367elOQGjZ0XPMqVf6uPF5oY4CVMWP6NiS3LLbTFHhu9vTg9MNwWxxwBdsG" />
            </div>
            <div>
              <h2 className="font-label-md text-label-md font-bold text-primary">Project Alpha</h2>
              <p className="font-caption text-caption text-on-surface-variant">Creative Portfolio</p>
            </div>
          </div>
          {/* Tabs Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto">
            <a className="flex items-center space-x-3 px-3 py-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded-lg group" data-icon="layers" href="#">
              <span className="material-symbols-outlined text-[20px] group-hover:text-primary">layers</span>
              <span>Layers</span>
            </a>
            <a className="flex items-center space-x-3 px-3 py-2 font-label-md text-label-md text-primary font-bold bg-primary-container/10 rounded-lg" data-icon="grid_view" href="#">
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>Assets</span>
            </a>
            <a className="flex items-center space-x-3 px-3 py-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded-lg group" data-icon="description" href="#">
              <span className="material-symbols-outlined text-[20px] group-hover:text-primary">description</span>
              <span>Pages</span>
            </a>
            <a className="flex items-center space-x-3 px-3 py-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded-lg group" data-icon="history" href="#">
              <span className="material-symbols-outlined text-[20px] group-hover:text-primary">history</span>
              <span>History</span>
            </a>
          </nav>
          {/* CTA */}
          <div className="mt-auto pt-4 border-t border-outline-variant/10">
            <button className="w-full py-2 flex justify-center items-center space-x-2 bg-surface-variant text-on-surface hover:bg-surface-bright font-label-md text-label-md rounded-lg transition-colors border border-outline-variant/20">
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>New Layer</span>
            </button>
          </div>
        </aside>
        {/* Center Canvas (Plugins Showcase) */}
        <main className="flex-1 ml-64 p-margin-desktop overflow-y-auto relative h-[calc(100vh-4rem)]">
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
            {/* Search/Filter Bar (Simulated) */}
            <div className="flex items-center justify-between mb-8">
              <div className="relative w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-full py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline" placeholder="Search plugins..." type="text" />
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary/20 text-primary font-label-md text-label-md flex items-center space-x-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Installed</span>
                </button>
                <button className="px-4 py-1.5 rounded-full bg-transparent border border-outline-variant/20 text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">
                  Discover
                </button>
              </div>
            </div>
            {/* Plugins Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Plugin Card: Autoflow */}
              <a href="https://www.figma.com/community/plugin/733902567457592893" target="_blank" className="glass-panel p-6 rounded-xl hover-glow group cursor-pointer relative overflow-hidden flex flex-col h-full hover:no-underline text-on-surface">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-on-surface-variant hover:text-error transition-colors" title="Uninstall">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
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
                  <button className="bg-surface-variant text-on-surface hover:text-background hover:bg-primary font-label-md text-label-md px-4 py-1.5 rounded-full transition-all border border-outline-variant/20 hover:border-transparent flex items-center space-x-1">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    <span>Run</span>
                  </button>
                </div>
              </a>
              {/* Plugin Card: Figmotion */}
              <a href="https://www.figmotion.app/" target="_blank" className="glass-panel p-6 rounded-xl hover-glow group cursor-pointer relative overflow-hidden flex flex-col h-full hover:no-underline text-on-surface">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-on-surface-variant hover:text-error transition-colors" title="Uninstall">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
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
                  <button className="bg-surface-variant text-on-surface hover:text-background hover:bg-primary font-label-md text-label-md px-4 py-1.5 rounded-full transition-all border border-outline-variant/20 hover:border-transparent flex items-center space-x-1">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    <span>Run</span>
                  </button>
                </div>
              </a>
              {/* Plugin Card: Unsplash */}
              <a href="https://unsplash.com/" target="_blank" className="glass-panel p-6 rounded-xl hover-glow group cursor-pointer relative overflow-hidden flex flex-col h-full hover:no-underline text-on-surface">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-on-surface-variant hover:text-error transition-colors" title="Uninstall">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
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
                  <button className="bg-surface-variant text-on-surface hover:text-background hover:bg-primary font-label-md text-label-md px-4 py-1.5 rounded-full transition-all border border-outline-variant/20 hover:border-transparent flex items-center space-x-1">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    <span>Run</span>
                  </button>
                </div>
              </a>
              {/* Plugin Card: Iconify */}
              <a href="https://iconify.design/" target="_blank" className="glass-panel p-6 rounded-xl hover-glow group cursor-pointer relative overflow-hidden flex flex-col h-full hover:no-underline text-on-surface">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-on-surface-variant hover:text-error transition-colors" title="Uninstall">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
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
                  <button className="bg-surface-variant text-on-surface hover:text-background hover:bg-primary font-label-md text-label-md px-4 py-1.5 rounded-full transition-all border border-outline-variant/20 hover:border-transparent flex items-center space-x-1">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    <span>Run</span>
                  </button>
                </div>
              </a>
            </div>
          </div>
        </main>

      </div>
          
    </div>
  );
}
