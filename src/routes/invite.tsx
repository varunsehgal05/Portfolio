import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute('/invite')({
  head: () => ({
    meta: [
      { title: 'Invite to Collaborate - Varun Sehgal' },
      { name: "description", content: 'Invite teammates to collaborate on the workspace draft file.' },
      { property: "og:title", content: 'Invite to Collaborate - Varun Sehgal' },
      { property: "og:description", content: 'Invite teammates to collaborate on the workspace draft file.' },
    ],
  }),
  component: Invite,
});

function Invite() {
  return (
    <div className="min-h-screen bg-grid flex items-center justify-center p-4 relative">
      <div  className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      
      <div  className="absolute top-[20%] left-[15%] cursor-float opacity-40">
      <svg  fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path  d="M4.5 3L20.5 11.5L13 14L9 21.5L4.5 3Z" fill="#ffb5a1" stroke="#ffb5a1" strokeLinejoin="round" strokeWidth="1.5" />
      </svg><div  className="mt-2 ml-4 font-label-md text-label-md text-primary bg-primary/10 px-2 py-1 rounded inline-block backdrop-blur-sm">Sarah_D</div>
      </div>
      
      <div  className="absolute top-[60%] right-[15%] cursor-float-delay opacity-40">
      <svg  fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path  d="M4.5 3L20.5 11.5L13 14L9 21.5L4.5 3Z" fill="#7fd0ff" stroke="#7fd0ff" strokeLinejoin="round" strokeWidth="1.5" />
      </svg><div  className="mt-2 ml-4 font-label-md text-label-md text-tertiary bg-tertiary/10 px-2 py-1 rounded inline-block backdrop-blur-sm">Mike_Dev</div>
      </div>
      
      <div  className="absolute top-[30%] right-[25%] cursor-float opacity-30 glass-panel p-3 rounded-lg flex items-start gap-2 max-w-[200px]">
      <span  className="material-symbols-outlined text-secondary text-sm">chat_bubble</span>
      <span  className="font-caption text-caption text-on-surface-variant">Can we review this modal design?</span>
      </div>
      </div>
      
      <main  className="relative z-10 w-full max-w-lg glass-panel rounded-xl shadow-2xl overflow-hidden flex flex-col glow-hover transition-all duration-300">
      
      <header  className="p-[32px] pb-[24px] border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/50">
      <div>
      <h1  className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
      <span  className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '\'FILL\' 1' }}>group_add</span>
                          Invite to Collaborate
                      </h1>
      <p  className="font-body-md text-body-md text-on-surface-variant mt-2">Share 'Workspace_Draft_v2.fig' with your team.</p>
      </div>
      <button  className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 rounded-full transition-colors group">
      <span  className="material-symbols-outlined group-hover:rotate-90 transition-transform duration-300">close</span>
      </button>
      </header>
      
      <div  className="p-[32px] flex flex-col gap-[24px]">
      
      <div  className="flex flex-col gap-2">
      <label  className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2" htmlFor="invite-email">
      <span  className="material-symbols-outlined text-[16px]">mail</span> Email Address
                      </label>
      <div  className="relative">
      <input  className="w-full input-glass rounded-lg py-3 px-4 font-body-md text-body-md text-on-surface placeholder:text-outline-variant/50 focus:ring-0" id="invite-email" placeholder="colleague@domain.com, designer@studio.io..." type="email" />
      <button  className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface-variant/50 hover:bg-surface-variant text-on-surface font-label-md text-label-md px-3 py-1.5 rounded transition-colors border border-outline-variant/20">
                              Add
                          </button>
      </div>
      </div>
      
      <div  className="flex flex-col gap-2">
      <label  className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
      <span  className="material-symbols-outlined text-[16px]">admin_panel_settings</span> Access Level
                      </label>
      <div  className="flex gap-2 p-1 bg-surface-container rounded-lg border border-outline-variant/10">
      <button  className="flex-1 py-2 font-label-md text-label-md rounded bg-surface-bright text-on-surface shadow-sm transition-all border border-outline-variant/20">
                              Can edit
                          </button>
      <button  className="flex-1 py-2 font-label-md text-label-md rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-all">
                              Can view
                          </button>
      </div>
      </div>
      
      <div  className="flex flex-col gap-2 pt-4 border-t border-outline-variant/10">
      <label  className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
      <span  className="material-symbols-outlined text-[16px]">link</span> Include Social Profiles (Optional)
                      </label>
      <div  className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div  className="relative group">
      <span  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-tertiary transition-colors text-[18px]">work</span>
      <input  className="w-full input-glass rounded-lg py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline-variant/50 focus:ring-0" placeholder="LinkedIn URL" type="url" />
      </div>
      <div  className="relative group">
      <span  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-[18px]">brush</span>
      <input  className="w-full input-glass rounded-lg py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline-variant/50 focus:ring-0" placeholder="Behance URL" type="url" />
      </div>
      <div  className="relative group md:col-span-2">
      <span  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-secondary transition-colors text-[18px]">code</span>
      <input  className="w-full input-glass rounded-lg py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline-variant/50 focus:ring-0" placeholder="GitHub URL" type="url" />
      </div>
      </div>
      </div>
      
      <div  className="flex flex-col gap-2 pt-2">
      <label  className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2" htmlFor="invite-message">
      <span  className="material-symbols-outlined text-[16px]">notes</span> Personal Message
                      </label>
      <textarea  className="w-full input-glass rounded-lg py-3 px-4 font-body-md text-body-md text-on-surface placeholder:text-outline-variant/50 focus:ring-0 resize-none" id="invite-message" placeholder="Hey, please check out the latest design iterations..." rows={3}></textarea>
      </div>
      </div>
      
      <footer  className="p-[24px] px-[32px] border-t border-outline-variant/10 bg-surface-container-lowest/50 flex justify-between items-center gap-4">
      <button  className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface flex items-center gap-2 transition-colors">
      <span  className="material-symbols-outlined text-[18px]">link</span> Copy Link
                  </button>
      <div  className="flex gap-3">
      <button  className="px-6 py-2.5 rounded border border-outline-variant/20 hover:border-outline-variant/50 font-label-md text-label-md text-on-surface transition-colors bg-transparent hover:bg-surface-variant/20">
                          Cancel
                      </button>
      <button  className="px-6 py-2.5 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-md text-label-md font-bold transition-all shadow-[0_0_15px_rgba(216,185,255,0.2)] hover:shadow-[0_0_25px_rgba(216,185,255,0.4)] flex items-center gap-2">
                          Send Invitation <span  className="material-symbols-outlined text-[18px]">send</span>
      </button>
      </div>
      </footer>
      </main>
      
      <div  className="fixed bottom-8 left-8 glass-panel p-4 rounded-xl hidden md:flex flex-col gap-3 z-0 opacity-80">
      <h3  className="font-label-md text-label-md text-on-surface-variant">Active in File</h3>
      <div  className="flex -space-x-3">
      <div  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-label-md text-on-primary border-2 border-[#121414] text-xs">SD</div>
      <div  className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center font-label-md text-on-tertiary border-2 border-[#121414] text-xs">MD</div>
      <div  className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center font-label-md text-on-surface-variant border-2 border-[#121414] text-xs">+3</div>
      </div>
      </div>
      
    </div>
  );
}
