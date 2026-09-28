import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute('/files')({
  head: () => ({
    meta: [
      { title: 'File Browser - Varun Sehgal' },
      { name: "description", content: 'Browse recent design files, drafts and team projects in the Aether workspace.' },
      { property: "og:title", content: 'File Browser - Varun Sehgal' },
      { property: "og:description", content: 'Browse recent design files, drafts and team projects in the Aether workspace.' },
    ],
  }),
  component: Files,
});

function Files() {
  return (
    <div className="bg-background text-on-surface font-body-main text-body-main h-screen w-screen flex overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
      <nav  className="w-panel-width h-full bg-surface-container border-r border-outline-variant flex flex-col flex-shrink-0 z-10">
      <div  className="h-toolbar-height flex items-center px-4 mb-2 group cursor-pointer hover:bg-surface-container-highest transition-colors">
      <div  className="w-6 h-6 rounded bg-primary-container text-on-primary-container flex items-center justify-center font-label-caps text-label-caps mr-3">V</div>
      <div  className="flex-1 truncate font-headline-panel text-headline-panel">Varun Sehgal</div>
      <span  className="material-symbols-outlined text-[16px] text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">unfold_more</span>
      </div>
      <div  className="px-4 mb-4">
      <div  className="relative">
      <span  className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">search</span>
      <input  className="w-full bg-surface border border-outline-variant rounded h-8 pl-8 pr-3 font-body-main text-body-main text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="Search files..." type="text" />
      </div>
      </div>
      <div  className="flex flex-col gap-0.5 px-2">
      <a  className="flex items-center px-3 py-1.5 rounded-DEFAULT text-primary bg-primary-container/10 border-l-2 border-primary -ml-2 pl-[10px]" href="#">
      <span  className="material-symbols-outlined text-[18px] mr-3">schedule</span>
      <span>Recent</span>
      </a>
      <a  className="flex items-center px-3 py-1.5 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors duration-200" href="#">
      <span  className="material-symbols-outlined text-[18px] mr-3">draft</span>
      <span>Drafts</span>
      </a>
      </div>
      <div  className="mt-6">
      <div  className="px-4 font-label-caps text-label-caps text-on-surface-variant/70 mb-2 uppercase tracking-wider flex justify-between items-center group cursor-pointer">
      <span>Community</span>
      <span  className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity">add</span>
      </div>
      <div  className="flex flex-col gap-0.5 px-2">
      <a  className="flex items-center px-3 py-1.5 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors duration-200" href="#">
      <span  className="material-symbols-outlined text-[18px] mr-3">public</span>
      <span>Explore Community</span>
      </a>
      </div>
      </div>
      <div  className="mt-6 flex-1 overflow-y-auto">
      <div  className="px-4 font-label-caps text-label-caps text-on-surface-variant/70 mb-2 uppercase tracking-wider flex justify-between items-center group cursor-pointer">
      <span>Teams</span>
      <span  className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity">add</span>
      </div>
      <div  className="flex flex-col gap-0.5 px-2">
      <a  className="flex items-center px-3 py-1.5 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors duration-200" href="#">
      <div  className="w-4 h-4 rounded-sm bg-tertiary-container/30 border border-tertiary/30 mr-3"></div>
      <span  className="truncate">Aether Design Studio</span>
      </a>
      <a  className="flex items-center px-3 py-1.5 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors duration-200" href="#">
      <div  className="w-4 h-4 rounded-sm bg-secondary-container/30 border border-secondary/30 mr-3"></div>
      <span  className="truncate">Client Projects</span>
      </a>
      </div>
      </div>
      <div  className="p-4 border-t border-outline-variant mt-auto">
      <div  className="flex items-center justify-between text-on-surface-variant hover:text-on-surface cursor-pointer transition-colors">
      <span  className="font-body-main text-body-main">Settings</span>
      <span  className="material-symbols-outlined text-[18px]">settings</span>
      </div>
      </div>
      </nav>
      <main  className="flex-1 flex flex-col h-full bg-surface min-w-0">
      <header  className="h-toolbar-height min-h-[48px] flex justify-between items-center px-6 w-full border-b border-outline-variant bg-surface flex-shrink-0">
      <div  className="flex items-center gap-4">
      <h1  className="font-headline-panel text-headline-panel text-on-surface">Recent Files</h1>
      <div  className="h-4 w-px bg-outline-variant"></div>
      <div  className="flex items-center text-on-surface-variant text-[12px] gap-1 cursor-pointer hover:text-on-surface transition-colors">
      <span>Any owner</span>
      <span  className="material-symbols-outlined text-[14px]">expand_more</span>
      </div>
      </div>
      <div  className="flex items-center gap-3">
      <div  className="flex bg-surface-container rounded border border-outline-variant overflow-hidden mr-2">
      <button  className="w-8 h-8 flex items-center justify-center bg-surface-container-highest text-primary">
      <span  className="material-symbols-outlined text-[18px]">grid_view</span>
      </button>
      <button  className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">
      <span  className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
      </button>
      </div>
      <button  className="bg-primary text-on-primary font-headline-panel text-headline-panel rounded px-4 h-8 flex items-center gap-2 hover:bg-primary-fixed transition-colors active:scale-95 duration-100">
      <span  className="material-symbols-outlined text-[18px]">add</span>
                          New Design File
                      </button>
      </div>
      </header>
      <div  className="flex-1 overflow-y-auto p-8">
      <div  className="max-w-[1600px] mx-auto">
      <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div  className="group relative flex flex-col bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden hover:border-primary/50 hover:shadow-[0_0_0_1px_rgba(255,181,161,0.5)] transition-all duration-200 cursor-pointer">
      <div  className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
      <button  className="w-7 h-7 rounded bg-surface/80 backdrop-blur border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary transition-colors">
      <span  className="material-symbols-outlined text-[16px]">more_horiz</span>
      </button>
      </div>
      <div  className="absolute top-2 left-2 z-10">
      <div  className="w-6 h-6 rounded bg-surface/80 backdrop-blur border border-outline-variant flex items-center justify-center text-primary shadow-sm">
      <span  className="material-symbols-outlined fill text-[14px]">push_pin</span>
      </div>
      </div>
      <div  className="aspect-[4/3] bg-surface-container-high relative overflow-hidden border-b border-outline-variant">
      <div  className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-[1.02] transition-transform duration-300"  style={{ backgroundImage: 'url(\'https://lh3.googleusercontent.com/aida-public/AB6AXuCVFV0S8ZUyrD1Sxw0jyV2l5vFHHIqSSpaVUJqVZ9hba-p5oxn_xh5am-zVdHITyyfL66fg7lne-Rbp-CfeSck4hq_-I1U0D42eBDR8fXa7fFyVrTEGWzsiAbpVwfC8c5ymOoqxJ35WeV4Ky3e-6cMILCjpLwmVIPYwCI11vynl1uy2KPs-GNmceR3lhj0wCeSwMRLQbVRGMLhE8-HZG2dEGOiwZN5N46ldqEnhZ-dwxNhsIQeFabnQ\')' }}></div>
      </div>
      <div  className="p-3 flex items-start gap-3">
      <div  className="mt-0.5">
      <span  className="material-symbols-outlined text-[20px] text-tertiary">design_services</span>
      </div>
      <div  className="flex-1 min-w-0">
      <h3  className="font-headline-panel text-headline-panel text-on-surface truncate group-hover:text-primary transition-colors">Varun_Sehgal_Portfolio.fig</h3>
      <p  className="font-body-main text-body-main text-on-surface-variant truncate text-[12px] mt-0.5">Edited 12m ago • Personal</p>
      </div>
      </div>
      </div>
      <div  className="group relative flex flex-col bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden hover:border-primary/50 hover:shadow-[0_0_0_1px_rgba(255,181,161,0.5)] transition-all duration-200 cursor-pointer">
      <div  className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
      <button  className="w-7 h-7 rounded bg-surface/80 backdrop-blur border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary transition-colors">
      <span  className="material-symbols-outlined text-[16px]">more_horiz</span>
      </button>
      </div>
      <div  className="aspect-[4/3] bg-surface-container-high relative overflow-hidden border-b border-outline-variant">
      <div  className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-[1.02] transition-transform duration-300"  style={{ backgroundImage: 'url(\'https://lh3.googleusercontent.com/aida-public/AB6AXuCguNzSQgH0oOYrWM_cft82bpkpLt1OaFsP-wX0dvx73rM4hqxPzaOobIeBzGzveGg-cWxO2jxaYaMK2AapcGsZty7rp69o3ksbijDa3rkuZK68sn_zyHylegFaNHjv05g4to1S_iB-pUVSc1yXiXXGwxojTiZ-VkOpgBTa30At-t_aMldQptvCMHfVH8U_9UnAB5qFedwfAxQEaxVG8nJZSHX2_VyqNc7N9LGhqhnWN5kYgzWvRYUM\')' }}></div>
      </div>
      <div  className="p-3 flex items-start gap-3">
      <div  className="mt-0.5">
      <span  className="material-symbols-outlined text-[20px] text-secondary">smartphone</span>
      </div>
      <div  className="flex-1 min-w-0">
      <h3  className="font-headline-panel text-headline-panel text-on-surface truncate group-hover:text-primary transition-colors">Expense_App_Case_Study.fig</h3>
      <p  className="font-body-main text-body-main text-on-surface-variant truncate text-[12px] mt-0.5">Edited 2h ago • Aether Design Studio</p>
      </div>
      </div>
      </div>
      <div  className="group relative flex flex-col bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden hover:border-primary/50 hover:shadow-[0_0_0_1px_rgba(255,181,161,0.5)] transition-all duration-200 cursor-pointer">
      <div  className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
      <button  className="w-7 h-7 rounded bg-surface/80 backdrop-blur border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary transition-colors">
      <span  className="material-symbols-outlined text-[16px]">more_horiz</span>
      </button>
      </div>
      <div  className="aspect-[4/3] bg-surface-container-high relative overflow-hidden border-b border-outline-variant">
      <div  className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-[1.02] transition-transform duration-300"  style={{ backgroundImage: 'url(\'https://lh3.googleusercontent.com/aida-public/AB6AXuAGXH07KjKs0Wo6UIw08zWOC-Ve3K4GTxQ0dKeSWMcLUeCiUjWbqp4RvYLCTCr0GaLICPC0V7wM5XvLPTwpDISn0L_-_PggKMG9PRjdoe9jBkrD439BPwn7kYdJDFd8Nz3-A2HVMkMs9ufieU-SFY8m0HKds3EgCYqeJSEruhjN0XLOf1M0P3jzC4GGiwtU5Cqu5qfji95wENNMcSbs7pNDD5ClsoltAfceNAawJSRw087_ZyVRCCc0\')' }}></div>
      </div>
      <div  className="p-3 flex items-start gap-3">
      <div  className="mt-0.5">
      <span  className="material-symbols-outlined text-[20px] text-primary">layers</span>
      </div>
      <div  className="flex-1 min-w-0">
      <h3  className="font-headline-panel text-headline-panel text-on-surface truncate group-hover:text-primary transition-colors">Spectral_Chroma_UI_Kit.fig</h3>
      <p  className="font-body-main text-body-main text-on-surface-variant truncate text-[12px] mt-0.5">Edited yesterday • Library</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </main>
      
    </div>
  );
}
