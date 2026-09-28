import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "Varun_Sehgal_Portfolio.fig - Recent Activity" },
      {
        name: "description",
        content: "Recent activity log tracking changes across Varun Sehgal's portfolio file.",
      },
      { property: "og:title", content: "Varun_Sehgal_Portfolio.fig - Recent Activity" },
      {
        property: "og:description",
        content: "Recent activity log tracking changes across Varun Sehgal's portfolio file.",
      },
    ],
  }),
  component: Activity,
});

function Activity() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col relative">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-14 bg-background/60 dark:bg-background/60 backdrop-blur-3xl border-b border-white/10">
        <div className="flex items-center gap-6">
          <div className="font-label-md text-label-md font-bold text-on-surface dark:text-on-surface">
            Varun_Sehgal_Portfolio.fig
          </div>
          
        </div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-on-surface transition-colors scale-102 active:scale-98">
            <span className="material-symbols-outlined">play_arrow</span>
          </button>
          <button className="text-on-surface-variant hover:text-on-surface transition-colors scale-102 active:scale-98">
            <span className="material-symbols-outlined">zoom_in</span>
          </button>
          <button className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded scale-102 active:scale-98 transition-transform duration-200 hover:shadow-[0_0_32px_rgba(255,181,161,0.3)]">
            Share
          </button>
        </div>
      </header>
      {/* SideNavBar */}
      <aside className="hidden md:flex fixed top-14 left-0 h-[calc(100vh-56px)] w-64 z-40 flex-col py-4 bg-surface-container-low/80 dark:bg-surface-container-low/80 backdrop-blur-xl border-r border-white/5">
        <div className="px-6 pb-6 border-b border-white/5 mb-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Workspace</h2>
          <p className="font-body-md text-body-md text-on-surface-variant opacity-70">Pro Plan</p>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          <a className="flex items-center gap-3 px-6 py-2 text-on-surface-variant dark:text-on-surface-variant pl-4 hover:text-primary dark:hover:text-primary transition-all scale-102 active:scale-98" href="#">
            <span className="material-symbols-outlined">layers</span>
            <span className="font-label-md text-label-md">Layers</span>
          </a>
          <a className="flex items-center gap-3 px-6 py-2 text-on-surface-variant dark:text-on-surface-variant pl-4 hover:text-primary dark:hover:text-primary transition-all scale-102 active:scale-98" href="#">
            <span className="material-symbols-outlined">grid_view</span>
            <span className="font-label-md text-label-md">Assets</span>
          </a>
          <a className="flex items-center gap-3 px-6 py-2 text-on-surface-variant dark:text-on-surface-variant pl-4 hover:text-primary dark:hover:text-primary transition-all scale-102 active:scale-98" href="#">
            <span className="material-symbols-outlined">description</span>
            <span className="font-label-md text-label-md">Pages</span>
          </a>
          <a className="flex items-center gap-3 px-6 py-2 text-primary dark:text-primary border-l-2 border-primary pl-4 scale-102 active:scale-98 bg-white/5" href="#">
            <span className="material-symbols-outlined">history</span>
            <span className="font-label-md text-label-md">History</span>
          </a>
        </nav>
        <div className="px-6 mt-auto">
          <button className="w-full py-2 border border-white/10 text-on-surface font-label-md text-label-md rounded hover:bg-white/5 transition-colors">
            Upgrade
          </button>
        </div>
      </aside>
      {/* Main Canvas */}
      <main className="flex-1 md:ml-64 mt-14 p-margin-mobile md:p-margin-desktop overflow-y-auto">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Recent Activity</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Tracking changes across Varun_Sehgal_Portfolio.fig</p>
          </div>
          {/* Activity Log */}
          <div className="relative before:absolute before:inset-0 before:ml-[23px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {/* Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-background bg-surface-container-high text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-panel rounded-xl p-6 hover-glow transition-all duration-300">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="font-label-md text-label-md text-primary font-bold">2m ago</span>
                    <span className="bg-primary/10 text-primary font-label-md text-caption px-2 py-1 rounded">Design</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface"><span className="font-bold">Varun S.</span> updated <span className="text-on-surface-variant">Hero Section</span></p>
                  <p className="font-caption text-caption text-on-surface-variant opacity-70">Adjusted typography scale and added spectral glow effects.</p>
                </div>
              </div>
            </div>
            {/* Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-background bg-surface-container-high text-secondary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-panel rounded-xl p-6 hover-glow transition-all duration-300">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="font-label-md text-label-md text-secondary font-bold">1h ago</span>
                    <span className="bg-secondary/10 text-secondary font-label-md text-caption px-2 py-1 rounded">Feedback</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface"><span className="font-bold">Client A.</span> added a comment on <span className="text-on-surface-variant">Case Study</span></p>
                  <div className="mt-2 pl-4 border-l-2 border-secondary/30">
                    <p className="font-caption text-caption text-on-surface-variant italic">&quot;Love the glassmorphism approach here. Can we make the CTA slightly more prominent?&quot;</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Item 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-background bg-surface-container-high text-tertiary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                <span className="material-symbols-outlined text-[20px]">publish</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-panel rounded-xl p-6 hover-glow transition-all duration-300">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="font-label-md text-label-md text-tertiary font-bold">4h ago</span>
                    <span className="bg-tertiary/10 text-tertiary font-label-md text-caption px-2 py-1 rounded">System</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface"><span className="font-bold">System</span> published <span className="text-on-surface-variant">Design System tokens</span></p>
                  <p className="font-caption text-caption text-on-surface-variant opacity-70">Version 2.4.1 deployed successfully. 12 variables updated.</p>
                </div>
              </div>
            </div>
            {/* Item 4 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-background bg-surface-container-high text-on-surface-variant shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                <span className="material-symbols-outlined text-[20px]">group_add</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-panel rounded-xl p-6 hover-glow transition-all duration-300">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="font-label-md text-label-md text-on-surface-variant font-bold">Yesterday</span>
                    <span className="bg-surface-variant/30 text-on-surface-variant font-label-md text-caption px-2 py-1 rounded">Access</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface"><span className="font-bold">Varun S.</span> invited <span className="text-on-surface-variant">Developer Team</span> to view</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full z-50 h-8 flex justify-between items-center px-4 bg-surface-container-lowest dark:bg-surface-container-lowest border-t border-white/5">
        <div className="font-label-md text-label-md text-on-surface">
          Varun Sehgal © 2024 • Made with Spectral Chroma
        </div>
        <div className="flex gap-4">
          <a className="font-caption text-caption text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors" href="#">Feedback</a>
          <a className="font-caption text-caption text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors" href="#">Shortcuts</a>
          <a className="font-caption text-caption text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors" href="#">System Status</a>
        </div>
      </footer>
          
    </div>
  );
}
