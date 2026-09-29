import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute('/design-system')({
  head: () => ({
    meta: [
      { title: 'Design System - Varun Sehgal' },
      { name: "description", content: 'Color, type and component foundations of the Aether design system.' },
      { property: "og:title", content: 'Design System - Varun Sehgal' },
      { property: "og:description", content: 'Color, type and component foundations of the Aether design system.' },
    ],
  }),
  component: DesignSystem,
});

function DesignSystem() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md overflow-x-hidden selection:bg-tertiary selection:text-on-tertiary">
      <header className="bg-surface dark:bg-surface-dim font-label-md text-label-md docked full-width border-b border-outline-variant/10 backdrop-blur-3xl flat no-shadows fixed top-0 w-full z-50 flex justify-between items-center px-4 h-12">
        <div className="flex items-center gap-4">
          <span className="font-headline-md text-headline-md font-bold text-on-surface dark:text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">token</span>
            Varun Sehgal Design System
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-surface-variant/20 transition-colors rounded text-on-surface"><span className="material-symbols-outlined">share</span></button>
          <button className="p-1 hover:bg-surface-variant/20 transition-colors rounded text-on-surface"><span className="material-symbols-outlined">play_arrow</span></button>
          <button className="p-1 hover:bg-surface-variant/20 transition-colors rounded text-on-surface"><span className="material-symbols-outlined">cloud_done</span></button>
        </div>
      </header>
      <div className="flex flex-1 pt-12">

        <aside className="bg-surface-container-low/80 dark:bg-surface-container-low/80 font-label-md text-label-md docked h-full w-64 border-r border-outline-variant/10 backdrop-blur-xl flat no-shadows fixed left-0 top-12 bottom-0 z-40 flex flex-col py-4 custom-scrollbar">
          <div className="px-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center border border-white/10">
                <span className="material-symbols-outlined text-primary">palette</span>
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface text-sm">Token Library</h2>
                <span className="font-caption text-caption text-on-surface-variant">Core Foundations</span>
              </div>
            </div>
          </div>
          <nav className="flex flex-col gap-1 px-2">
            <a className="flex items-center gap-3 py-2 text-tertiary font-bold border-l-2 border-tertiary pl-2 bg-surface-container-high/50 rounded-r transition-all" href="#">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: '\'FILL\' 1' }}>palette</span>
              <span>Colors</span>
            </a>

            <a className="flex items-center gap-3 py-2 text-on-surface-variant px-2 hover:text-on-surface hover:bg-surface-container-high transition-all rounded" href="#">
              <span className="material-symbols-outlined text-lg">text_fields</span>
              <span>Typography</span>
            </a>
            <a className="flex items-center gap-3 py-2 text-on-surface-variant px-2 hover:text-on-surface hover:bg-surface-container-high transition-all rounded" href="#">
              <span className="material-symbols-outlined text-lg">space_dashboard</span>
              <span>Components</span>
            </a>
            <a className="flex items-center gap-3 py-2 text-on-surface-variant px-2 hover:text-on-surface hover:bg-surface-container-high transition-all rounded" href="#">
              <span className="material-symbols-outlined text-lg">format_size</span>
              <span>Spacing</span>
            </a>
          </nav>
          <div className="mt-auto px-4">
            <button className="w-full py-2 bg-primary text-on-primary rounded font-label-md hover:bg-primary-fixed transition-colors font-bold">Sync Tokens</button>
          </div>
        </aside>

        <main className="flex-1 ml-64 p-8 pb-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surface-container-lowest via-background to-background min-h-screen">

          <header className="mb-16">
            <h1 className="font-display-lg text-6xl font-bold text-on-surface mb-2">Portfolio Design System</h1>
            <p className="font-body-lg text-xl text-on-surface-variant max-w-2xl mt-4 leading-relaxed">
              The visual language powering this interactive portfolio. Defined technical components, fluid typography scales, and foundational colors engineered for high-end creative interfaces.
            </p>
          </header>

          <div className="grid grid-cols-12 gap-8">

            <section className="col-span-12 xl:col-span-7 glass-panel rounded-xl p-8 border border-white/5 bg-surface-container/20">
              <div className="flex justify-between items-end mb-6">
                <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Color Palette</h2>
                <span className="font-label-md text-xs uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">Electric High-Contrast</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                <div className="space-y-3">
                  <div className="h-28 rounded-lg bg-primary border border-outline-variant/20 shadow-[0_4px_30px_rgba(var(--primary-rgb),0.2)]"></div>
                  <div className="flex flex-col">
                    <span className="font-bold text-on-surface">Primary</span>
                    <span className="text-xs font-mono text-on-surface-variant">var(--primary)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-28 rounded-lg bg-secondary border border-outline-variant/20 shadow-[0_4px_30px_rgba(var(--secondary-rgb),0.2)]"></div>
                  <div className="flex flex-col">
                    <span className="font-bold text-on-surface">Secondary</span>
                    <span className="text-xs font-mono text-on-surface-variant">var(--secondary)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-28 rounded-lg bg-tertiary border border-outline-variant/20 shadow-[0_4px_30px_rgba(var(--tertiary-rgb),0.2)]"></div>
                  <div className="flex flex-col">
                    <span className="font-bold text-on-surface">Tertiary</span>
                    <span className="text-xs font-mono text-on-surface-variant">var(--tertiary)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-28 rounded-lg bg-surface-container border border-outline-variant/20"></div>
                  <div className="flex flex-col">
                    <span className="font-bold text-on-surface">Surface</span>
                    <span className="text-xs font-mono text-on-surface-variant">var(--surface-container)</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="col-span-12 xl:col-span-5 glass-panel rounded-xl p-8 border border-white/5 bg-surface-container/20">
              <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
                <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Typography</h2>
                <span className="font-label-md text-xs uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-1 rounded">Inter & Plus Jakarta Sans</span>
              </div>
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Display Scale (Header Titles)</span>
                  <div className="font-display-lg text-5xl font-bold text-on-surface">Aa</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Headline Scale (Section Titles)</span>
                  <div className="font-headline-lg text-3xl font-bold text-on-surface">Ag</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Body Scale (Paragraphs & UI)</span>
                  <div className="font-body-md text-base text-on-surface-variant leading-relaxed">Sphinx of black quartz, judge my vow. The quick brown fox jumps over the lazy dog.</div>
                </div>
              </div>
            </section>

            <section className="col-span-12 glass-panel rounded-xl p-8 border border-white/5 bg-surface-container/20 relative">
              <div className="absolute top-6 right-6 font-label-md text-[10px] uppercase tracking-widest text-tertiary bg-tertiary/10 px-3 py-1 rounded border border-tertiary/20">
                Interactive State Layer
              </div>
              <h2 className="font-headline-lg text-3xl font-bold text-on-surface mb-8">Component Architecture</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                <div>
                  <h3 className="font-bold text-lg text-on-surface mb-4">Buttons</h3>
                  <div className="space-y-4">

                    <div className="flex flex-col p-4 border border-white/10 rounded-lg bg-[#0A0A0A] gap-4">
                      <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Primary Action</span>
                      <button className="bg-primary text-on-primary font-bold px-6 py-3 rounded-lg hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] self-start">View Project</button>
                    </div>

                    <div className="flex flex-col p-4 border border-white/10 rounded-lg bg-[#0A0A0A] gap-4">
                      <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Secondary Action</span>
                      <button className="bg-surface-variant text-on-surface hover:text-white font-bold px-6 py-3 rounded-lg border border-white/10 hover:border-white/30 transition-all self-start">Read Case Study</button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-on-surface mb-4">Inputs & Tokens</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-white/10 rounded-lg bg-[#0A0A0A]">
                      <label className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">Form Field</label>
                      <input className="w-full bg-surface-dim border border-white/10 rounded-md px-4 py-2 font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-on-surface-variant/50" placeholder="hello@varunsehgal.com" type="email" />
                    </div>
                    <div className="p-4 border border-white/10 rounded-lg bg-[#0A0A0A]">
                      <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-3 font-bold">Component Tags</span>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">Figma</span>
                        <span className="text-[10px] uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-1 rounded border border-secondary/20">React</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-on-surface mb-4">System Grid</h3>
                  <div className="grid grid-cols-4 gap-4 p-4 border border-white/10 rounded-lg bg-[#0A0A0A]">
                    <div className="aspect-square flex items-center justify-center bg-surface-variant/50 rounded-lg border border-white/5 hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined">layers</span></div>
                    <div className="aspect-square flex items-center justify-center bg-surface-variant/50 rounded-lg border border-white/5 hover:text-secondary transition-colors cursor-pointer"><span className="material-symbols-outlined">design_services</span></div>
                    <div className="aspect-square flex items-center justify-center bg-surface-variant/50 rounded-lg border border-white/5 hover:text-tertiary transition-colors cursor-pointer"><span className="material-symbols-outlined">code</span></div>
                    <div className="aspect-square flex items-center justify-center bg-surface-variant/50 rounded-lg border border-white/5 hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined">analytics</span></div>
                    <div className="aspect-square flex items-center justify-center bg-surface-variant/50 rounded-lg border border-white/5 hover:text-secondary transition-colors cursor-pointer"><span className="material-symbols-outlined">bolt</span></div>
                    <div className="aspect-square flex items-center justify-center bg-surface-variant/50 rounded-lg border border-white/5 hover:text-tertiary transition-colors cursor-pointer"><span className="material-symbols-outlined">speed</span></div>
                    <div className="aspect-square flex items-center justify-center bg-surface-variant/50 rounded-lg border border-white/5 hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined">verified</span></div>
                    <div className="aspect-square flex items-center justify-center bg-surface-variant/50 rounded-lg border border-white/5 hover:text-secondary transition-colors cursor-pointer"><span className="material-symbols-outlined">warning</span></div>
                  </div>
                </div>

              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
