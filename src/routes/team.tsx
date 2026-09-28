import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ZoomWidget } from "../components/ZoomWidget";
export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team / Collaborators - Spectral Chroma" },
      { name: "description", content: "Collaborate live with your team on Spectral Chroma projects, share and manage access." },
      { property: "og:title", content: "Team / Collaborators - Spectral Chroma" },
      { property: "og:description", content: "Collaborate live with your team on Spectral Chroma projects, share and manage access." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentScale, setCurrentScale] = useState(1);
  const [sarahPos, setSarahPos] = useState({ left: 30, top: 40 });
  const [alexPos, setAlexPos] = useState({ left: 65, top: 60 });

  useEffect(() => {
    let raf: number;
    let timeout: ReturnType<typeof setTimeout>;
    function jiggle() {
      setSarahPos((p) => ({ left: p.left + (Math.random() - 0.5) * 0.5, top: p.top + (Math.random() - 0.5) * 0.5 }));
      setAlexPos((p) => ({ left: p.left + (Math.random() - 0.5) * 0.5, top: p.top + (Math.random() - 0.5) * 0.5 }));
      raf = requestAnimationFrame(jiggle);
    }
    timeout = setTimeout(() => {
      raf = requestAnimationFrame(jiggle);
    }, 1000);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="antialiased overflow-hidden selection:bg-primary selection:text-on-primary">
      {/* TopNavBar (Shared Component) */}
      
      {/* SideNavBar (Left) (Shared Component) */}
      <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 z-40 flex-col p-4 bg-surface dark:bg-surface-container-low border-r border-outline-variant/10 backdrop-blur-2xl bg-surface/80">
        <div className="mb-8 px-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary">folder_open</span>
          </div>
          <div>
            <h3 className="font-label-md text-label-md font-bold text-primary">Project Alpha</h3>
            <p className="font-caption text-caption text-on-surface-variant">Creative Portfolio</p>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded-lg font-label-md text-label-md" href="#">
            <span className="material-symbols-outlined text-[20px]">layers</span>
            Layers
          </a>
          <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded-lg font-label-md text-label-md" href="#">
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            Assets
          </a>
          <a className="flex items-center gap-3 px-3 py-2 text-primary font-bold bg-primary-container/10 rounded-lg font-label-md text-label-md translate-x-1 transition-transform" href="#">
            <span className="material-symbols-outlined text-[20px]">description</span>
            Pages
          </a>
          <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10 transition-colors rounded-lg font-label-md text-label-md" href="#">
            <span className="material-symbols-outlined text-[20px]">history</span>
            History
          </a>
        </nav>
        <button className="mt-auto w-full border border-primary text-primary hover:bg-primary/10 px-4 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Layer
        </button>
      </aside>
      {/* SideNavBar (Right) (Shared Component) */}
      <aside className="hidden xl:flex fixed right-0 top-16 bottom-0 w-72 z-40 flex-col p-4 bg-surface dark:bg-surface-container-low border-l border-outline-variant/10 backdrop-blur-2xl bg-surface/80">
        <div className="mb-6 border-b border-outline-variant/20 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-label-md text-label-md font-bold text-primary">Properties</h3>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">tune</span>
          </div>
          <p className="font-caption text-caption text-on-surface-variant">Selection context</p>
        </div>
        <div className="flex border-b border-outline-variant/20 mb-6">
          <button className="flex-1 pb-2 font-label-md text-label-md text-primary font-bold border-b-2 border-primary flex flex-col items-center gap-1 scale-[0.99] transition-transform">
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Design
          </button>
          <button className="flex-1 pb-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            Prototype
          </button>
          <button className="flex-1 pb-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">code</span>
            Inspect
          </button>
        </div>
        {/* Dummy Properties Content */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          <div>
            <h4 className="font-label-md text-label-md text-on-surface mb-3 flex items-center justify-between">Layout <span className="material-symbols-outlined text-[16px] text-on-surface-variant">add</span></h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-surface p-2 rounded border border-outline-variant/20 flex items-center justify-between">
                <span className="font-label-md text-caption text-on-surface-variant">W</span>
                <span className="font-label-md text-caption text-on-surface">1440</span>
              </div>
              <div className="bg-surface p-2 rounded border border-outline-variant/20 flex items-center justify-between">
                <span className="font-label-md text-caption text-on-surface-variant">H</span>
                <span className="font-label-md text-caption text-on-surface">900</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-on-surface mb-3 flex items-center justify-between">Fill <span className="material-symbols-outlined text-[16px] text-on-surface-variant">add</span></h4>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 rounded bg-[#121414] border border-outline-variant/50"></div>
              <span className="font-label-md text-caption text-on-surface">121414</span>
              <span className="font-label-md text-caption text-on-surface-variant ml-auto">100%</span>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Canvas Area */}
      <main className="relative pt-16 md:pl-64 xl:pr-72 min-h-screen bg-background overflow-hidden flex items-center justify-center p-8">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
        {/* The Artboard */}
        <div
          className="relative z-10 w-full max-w-4xl aspect-[16/10] bg-surface-container-low rounded-xl border border-outline-variant/20 shadow-2xl overflow-hidden glass-panel transition-transform duration-150 origin-center"
          style={{ transform: `scale(${currentScale})` }}
        >
          {/* Artboard Header/Toolbar */}
          <div className="absolute top-0 left-0 right-0 h-12 border-b border-outline-variant/10 flex items-center px-4 bg-surface-container/50 backdrop-blur-md">
            <span className="font-label-md text-label-md text-on-surface-variant">Hero_Section_v2.fig</span>
            <div className="ml-auto flex gap-2">
              <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
              <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
              <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
            </div>
          </div>
          {/* Mock Artboard Content */}
          <div className="pt-12 p-8 h-full flex flex-col relative">
            <div className="w-2/3 h-32 rounded-lg bg-surface border border-outline-variant/20 mb-6 flex items-center justify-center" data-alt="A sleek, dark mode hero banner graphic featuring abstract glowing red and orange geometric waves on a deep black background, minimalist and high-tech corporate aesthetic." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEKL2aq8BkFx-bnsHlq2ebwKAa6kTELm1Ws-gDC3_q5RQnJfupO6bCnGERiRYnIaVZx2Hoizuf9mfcn6PCIiSxYLmhXtbqJhCLWeOdhytQxm6reyK8d-1ET3-ljrMhtv1PqpTGNo7hpC91JnlmYKycHt5Phkod8zJnoL8zA7uUQjH3GxIS3sB8tNNyhlSGsTA3XSeXO5SNuXkw6_U173YCu9Y9BdXaO8NsQ4N48D4KiTml7P2fIDmZ')" }}>
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold opacity-50">Hero Content</h1>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="h-48 rounded-lg bg-surface border border-outline-variant/20 relative group">
                {/* Targeting box for Sarah */}
                <div className="absolute inset-0 border-2 border-transparent transition-colors" id="target-sarah"></div>
                <div className="p-4">
                  <div className="w-full h-24 rounded bg-surface-variant/50 mb-3" data-alt="A placeholder abstract image of a softly glowing UI card component in dark mode, featuring a subtle purple glassmorphism effect." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1aMSb15i-Lsi6-U9NU8svfl-Vh2SJikXDm9caMXcFq48fDE5cS_CX4LQpBeUlF9Rtwo9PX8nS19WWqNDU_qDU9JVcR0OQiWTS-jjm-n_qmvyKDi-FFpE1l8qDbbPteyciwvqqx-F8jNWWaS0rXxHJE9wcoPgAiOuIeqBPja25jFfN36de00_Sr0s70BDgBgo3jOIzaJzUz5qKjZvakVnLvqBYQyEJkfN8DLPbF6lm-Xz3xO0TgcSo')" }}></div>
                  <div className="h-3 w-3/4 bg-surface-variant rounded mb-2"></div>
                  <div className="h-3 w-1/2 bg-surface-variant rounded"></div>
                </div>
              </div>
              <div className="h-48 rounded-lg bg-surface border border-outline-variant/20 relative">
                {/* Targeting box for Alex */}
                <div className="absolute inset-0 border-2 border-transparent transition-colors" id="target-alex"></div>
                <div className="p-4">
                  <div className="w-full h-24 rounded bg-surface-variant/50 mb-3" data-alt="A placeholder abstract image of a softly glowing UI card component in dark mode, featuring a subtle blue glassmorphism effect." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-7ONgJQe8mGikUABiDiNnLPDOP7MHpSBCR6lzXyhrRq7PbIMjRe_ieT2CmrMuxLu22xGKDGQxJ2eX7phFDA8ANvGcFo8oxRHLFLkl4EckaQprDmJwFoUbtMqGpC_JAOHOi3eUibj5olX77ocW-eqAn02ZGnWfD-DQNALoSmyLVFCyKPREd3uv2Go3oI5YHPtz5q1oYi3JKhcdYk77PH7cXSAeQ4QbWVu7H9teqOGpJKLPigMTwkqt')" }}></div>
                  <div className="h-3 w-3/4 bg-surface-variant rounded mb-2"></div>
                  <div className="h-3 w-1/2 bg-surface-variant rounded"></div>
                </div>
              </div>
              <div className="h-48 rounded-lg bg-surface border border-outline-variant/20 p-4">
                <div className="w-full h-24 rounded bg-surface-variant/50 mb-3"></div>
                <div className="h-3 w-3/4 bg-surface-variant rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-surface-variant rounded"></div>
              </div>
            </div>
          </div>
          {/* Multiplayer Cursors */}
          {/* Cursor 1: Sarah J. (PM) - Pink/Tertiary */}
          <svg className="cursor-svg" fill="none" style={{ left: `${sarahPos.left}%`, top: `${sarahPos.top}%`, ["--cursor-color" as any]: "#7fd0ff" }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.65376 21.3283L2.4344 2.87186C2.20392 1.5501 3.5501 0.203923 4.87186 0.434404L23.3283 3.65376C24.7738 3.90595 25.1098 5.79589 23.8643 6.66782L17.2023 11.3322C16.8837 11.5552 16.6617 11.8906 16.5866 12.28L15.1979 19.4735C14.9458 20.7797 13.1971 21.1444 12.3853 20.0631L5.65376 21.3283Z" fill="#7fd0ff" stroke="white" strokeLinejoin="round" strokeWidth="1.5"></path>
          </svg>
          <div className="cursor-label" style={{ left: `${sarahPos.left}%`, top: `${sarahPos.top}%`, ["--cursor-color" as any]: "#7fd0ff" }}>Sarah J. - PM</div>
          {/* Cursor 2: Alex P. (Dev) - Purple/Secondary */}
          <svg className="cursor-svg" fill="none" style={{ left: `${alexPos.left}%`, top: `${alexPos.top}%`, ["--cursor-color" as any]: "#d8b9ff" }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.65376 21.3283L2.4344 2.87186C2.20392 1.5501 3.5501 0.203923 4.87186 0.434404L23.3283 3.65376C24.7738 3.90595 25.1098 5.79589 23.8643 6.66782L17.2023 11.3322C16.8837 11.5552 16.6617 11.8906 16.5866 12.28L15.1979 19.4735C14.9458 20.7797 13.1971 21.1444 12.3853 20.0631L5.65376 21.3283Z" fill="#d8b9ff" stroke="white" strokeLinejoin="round" strokeWidth="1.5"></path>
          </svg>
          <div className="cursor-label" style={{ left: `${alexPos.left}%`, top: `${alexPos.top}%`, ["--cursor-color" as any]: "#d8b9ff" }}>Alex P. - Developer</div>
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
      </main>
      {/* Share Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${modalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} id="shareModal" onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
        <div className={`glass-panel w-full max-w-md rounded-xl shadow-2xl p-6 border border-outline-variant/30 transform transition-transform duration-300 ${modalOpen ? "scale-100" : "scale-95"}`} id="shareModalContent">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Share Project</h2>
            <button className="text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-full hover:bg-surface-variant/30" id="closeModal" onClick={() => setModalOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          {/* Invite Input */}
          <div className="flex gap-2 mb-6">
            <div className="flex-1 relative">
              <input className="w-full bg-surface border border-outline-variant/30 rounded-lg px-4 py-2 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Add email or team..." type="text" />
            </div>
            <button className="bg-surface-variant text-on-surface px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-surface-variant/80 transition-colors border border-outline-variant/20">
              Invite
            </button>
          </div>
          <hr className="border-outline-variant/20 mb-6" />
          {/* Collaborators List */}
          <div className="space-y-4 mb-6">
            <h3 className="font-label-md text-label-md text-on-surface-variant mb-2">People with access</h3>
            {/* Owner */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center font-label-md text-primary font-bold">You</div>
                <div>
                  <p className="font-body-md text-body-md text-on-surface font-medium leading-none mb-1">Spectral User</p>
                  <p className="font-caption text-caption text-on-surface-variant leading-none">user@spectral.design</p>
                </div>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">Owner</span>
            </div>
            {/* Collaborator 1 */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover" data-alt="A small circular avatar portrait of a young female project manager with short dark hair, wearing minimal glasses, softly lit in a neon-tinged cyberpunk aesthetic, dark mode background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNp6TM_PdTfpD7nDu2X-OJQknqXrEkV8FIBliMgVbqstK-bgTB8j02rDYcrpKJG3aE419l2ZBCFmMsTmhRaQCp5k4_UKfsYRepJw0XePU3NAELUcmw6VWRuJLDT1zzFJ9XhQKQ2W-2dpmf21aazumnEYYfyHrrd6tqu9G_iD9AtYL3eG4hpUnC_52APbitTM917pZC5V6zNl2DCPtL-_tkrlZX-zBJnzsW1G-ECLBXyF7Jm-SPZ_9e" />
                <div>
                  <p className="font-body-md text-body-md text-on-surface font-medium leading-none mb-1">Sarah J.</p>
                  <p className="font-caption text-caption text-on-surface-variant leading-none">sarah@spectral.design</p>
                </div>
              </div>
              <select className="bg-transparent border-none text-on-surface-variant font-label-md text-label-md focus:ring-0 cursor-pointer hover:text-primary pr-8 appearance-none text-right" defaultValue="edit">
                <option value="edit">Can Edit</option>
                <option value="view">Can View</option>
                <option value="remove">Remove</option>
              </select>
            </div>
            {/* Collaborator 2 */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover" data-alt="A small circular avatar portrait of a male developer with a beard, wearing a dark hoodie, illuminated by cool blue screen light, minimalist dark UI aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFVkvx9V4BRilxZMg8ys4Ujp0UZhGLwCM1EYcVmb1UmxhmWFYuLQhUGycm4qu0pyk6yf7ajp0FUYLwy_k1cfvyI4vlnG3f_9gnfCcfu4sc_rUBLoeg2VMHkK7SipbtFVqnSJX3f36gMOSVd5L48AqLos6rjD1VXz4pS5ceo5Dz24QNDvWYHVIsiRvgPv9-z2Tol1PBgdbbkaU4ai1XHHpre8t01Z6hoWW_JkSaBVP2ofdXGhABkHfh" />
                <div>
                  <p className="font-body-md text-body-md text-on-surface font-medium leading-none mb-1">Alex P.</p>
                  <p className="font-caption text-caption text-on-surface-variant leading-none">alex@spectral.design</p>
                </div>
              </div>
              <select className="bg-transparent border-none text-on-surface-variant font-label-md text-label-md focus:ring-0 cursor-pointer hover:text-primary pr-8 appearance-none text-right" defaultValue="view">
                <option value="edit">Can Edit</option>
                <option value="view">Can View</option>
                <option value="remove">Remove</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center bg-surface p-3 rounded-lg border border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">link</span>
              <span className="font-body-md text-body-md text-on-surface">Anyone with the link</span>
            </div>
            <button className="text-primary font-label-md text-label-md hover:underline">Copy link</button>
          </div>
        </div>
      </div>
          
    </div>
  );
}
