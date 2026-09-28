import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ZoomWidget } from "../components/ZoomWidget";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Varun Sehgal Portfolio - About Me" },
      { name: "description", content: "About Varun Sehgal, UI/UX Designer | Product Designer." },
      { property: "og:title", content: "Varun Sehgal Portfolio - About Me" },
      { property: "og:description", content: "About Varun Sehgal, UI/UX Designer | Product Designer." },
    ],
  }),
  component: About,
});

type NodeId = 'profile' | 'identity' | 'status' | 'toolkit' | 'music';

const nodeSpecs: Record<NodeId, {
  name: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  colorHex: string;
  tag: string;
}> = {
  profile: { name: 'Varun Sehgal (Core)', type: 'Master Component', x: 680, y: 240, w: 440, h: 660, colorHex: '#6366f1', tag: 'Core Master' },
  identity: { name: 'Identity & Metrics', type: 'Component Instance', x: 70, y: 50, w: 450, h: 500, colorHex: '#818cf8', tag: 'Spec 01' },
  status: { name: 'Current Status', type: 'Status Component', x: 1280, y: 50, w: 450, h: 480, colorHex: '#5abcb9', tag: 'Spec 02' },
  toolkit: { name: 'Toolkit Engine', type: 'Skills Component', x: 70, y: 690, w: 450, h: 480, colorHex: '#e0a96d', tag: 'Spec 03' },
  music: { name: 'Spotify & Craft', type: 'Audio Widget', x: 1280, y: 690, w: 450, h: 480, colorHex: '#1DB954', tag: 'Spec 04' },
};

type VariantType = 'Product Designer' | 'UI/UX Specialist' | 'Design System Lead';

function About() {
  const [selectedNode, setSelectedNode] = useState<NodeId>('profile');
  const [variant, setVariant] = useState<VariantType>('Product Designer');

  // Lo-Fi Audio Player State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState("3:24");
  const [audioCurrentTime, setAudioCurrentTime] = useState("0:00");

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const toggleMusic = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 1;
    setAudioProgress((cur / dur) * 100);
    setAudioCurrentTime(formatTime(cur));
  };

  const onLoadedMetadata = () => {
    if (!audioRef.current) return;
    setAudioDuration(formatTime(audioRef.current.duration));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    const val = parseFloat(e.target.value);
    const dur = audioRef.current.duration || 1;
    audioRef.current.currentTime = (val / 100) * dur;
    setAudioProgress(val);
  };

  const canvasAreaRef = useRef<HTMLElement | null>(null);
  const canvasContentRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const dragState = useRef({ startX: 0, startY: 0, translateX: 0, translateY: 0 });
  const [currentScale, setCurrentScale] = useState(0.66);

  const navigateToNode = (id: NodeId, smooth = true, targetScale?: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setHasInteracted(true);
    setSelectedNode(id);
    const newScale = targetScale || currentScale;
    if (targetScale) setCurrentScale(targetScale);
    const el = document.querySelector(`[data-id="${id}"]`);
    if (el && canvasAreaRef.current) {
      const containerRect = canvasAreaRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      const elCenterScreenY = elRect.top + elRect.height / 2;
      const elCenterScreenX = elRect.left + elRect.width / 2;

      const targetScreenY = containerRect.top + containerRect.height / 2;
      const targetScreenX = containerRect.left + containerRect.width / 2;

      let newTx = dragState.current.translateX + (targetScreenX - elCenterScreenX);
      let newTy = dragState.current.translateY + (targetScreenY - elCenterScreenY);

      dragState.current.translateX = newTx;
      dragState.current.translateY = newTy;

      if (canvasContentRef.current) {
        if (smooth) canvasContentRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        canvasContentRef.current.style.transform = `translate(${newTx}px, ${newTy}px) scale(${newScale})`;
        if (smooth) {
          setTimeout(() => {
            if (canvasContentRef.current) canvasContentRef.current.style.transition = 'transform 75ms ease-out';
          }, 600);
        }
      }
      if (canvasAreaRef.current) {
        if (smooth) canvasAreaRef.current.style.transition = 'background-position 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        canvasAreaRef.current.style.backgroundPosition = `${newTx}px ${newTy}px`;
        if (smooth) {
          setTimeout(() => {
            if (canvasAreaRef.current) canvasAreaRef.current.style.transition = 'none';
          }, 600);
        }
      }
    }
  };

  const fitToOverview = (smooth = true) => {
    if (smooth) setHasInteracted(true);
    setSelectedNode('profile');
    if (canvasAreaRef.current) {
      const rect = canvasAreaRef.current.getBoundingClientRect();
      const scaleX = (rect.width - 60) / 1800;
      const scaleY = (rect.height - 60) / 1260;
      const fit = Math.min(Math.max(Math.min(scaleX, scaleY), 0.62), 0.88);
      const roundedFit = Number(fit.toFixed(2));
      setCurrentScale(roundedFit);
      dragState.current.translateX = 0;
      dragState.current.translateY = 0;
      if (canvasContentRef.current) {
        if (smooth) canvasContentRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        canvasContentRef.current.style.transform = `translate(0px, 0px) scale(${roundedFit})`;
        if (smooth) {
          setTimeout(() => {
            if (canvasContentRef.current) canvasContentRef.current.style.transition = 'transform 75ms ease-out';
          }, 600);
        }
      }
      if (canvasAreaRef.current) {
        if (smooth) canvasAreaRef.current.style.transition = 'background-position 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        canvasAreaRef.current.style.backgroundPosition = `0px 0px`;
        if (smooth) {
          setTimeout(() => {
            if (canvasAreaRef.current) canvasAreaRef.current.style.transition = 'none';
          }, 600);
        }
      }
    }
  };

  useEffect(() => {
    if (canvasContentRef.current) {
      canvasContentRef.current.style.transform = `translate(${dragState.current.translateX}px, ${dragState.current.translateY}px) scale(${currentScale})`;
    }
  }, [currentScale]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fitToOverview(false);
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasAreaRef.current || e.target === canvasContentRef.current || (e.target as HTMLElement).closest('.canvas-clickable-bg')) {
      setIsDragging(true);
      dragState.current.startX = e.clientX - dragState.current.translateX;
      dragState.current.startY = e.clientY - dragState.current.translateY;
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setHasInteracted(true);
    let translateX = e.clientX - dragState.current.startX;
    let translateY = e.clientY - dragState.current.startY;
    dragState.current.translateX = translateX;
    dragState.current.translateY = translateY;

    if (canvasContentRef.current) {
      canvasContentRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    }
    if (canvasAreaRef.current) {
      canvasAreaRef.current.style.backgroundPosition = `${translateX}px ${translateY}px`;
    }
  };

  const onMouseUp = () => setIsDragging(false);

  // Variant helper for Identity title
  const getVariantTitle = () => {
    if (variant === 'UI/UX Specialist') return "UI/UX & Product Specialist";
    if (variant === 'Design System Lead') return "Design Systems & Tokens Lead";
    return "UI/UX & Product Designer";
  };

  return (
    <div className="bg-background text-on-background h-screen w-screen overflow-hidden flex flex-col font-body-md text-body-md">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/lofi.mp3"
        loop
        preload="auto"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
      />

      <div className="flex flex-1 mt-16 h-[calc(100vh-64px)] w-full relative">

        {/* LEFT SIDEBAR */}
        <aside className="absolute left-0 top-0 bottom-0 w-64 z-40 flex flex-col pt-4 bg-surface dark:bg-surface-container-low border-r border-outline-variant/10 backdrop-blur-2xl bg-surface/80 flat no shadows font-label-md text-label-md">
          <div className="px-6 mb-6 flex flex-col gap-1.5">
            <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-bold">Design Canvas</span>
            <span className="font-caption text-caption text-on-surface-variant">Radial Architecture V4</span>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <div className="flex items-center justify-between py-2 text-on-surface px-4 border-l-2 border-primary bg-surface-variant/20 mb-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">layers</span>
                <span className="font-bold text-xs uppercase tracking-widest">Artboard Layers</span>
              </div>
              <button
                onClick={() => fitToOverview(true)}
                title="Fit All on Screen"
                className="text-[10px] text-primary hover:underline font-mono"
              >
                Fit All
              </button>
            </div>

            <div onClick={(e) => navigateToNode('profile', true, 0.85, e)} className={`flex items-center gap-3 py-2 cursor-pointer transition-colors pl-8 border-l-2 ${selectedNode === 'profile' ? 'border-primary text-primary bg-primary/10' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'}`}>
              <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
              <span className="font-semibold text-xs">Varun Sehgal (Center Master)</span>
            </div>
            <div onClick={(e) => navigateToNode('identity', true, 0.85, e)} className={`flex items-center gap-3 py-2 cursor-pointer transition-colors pl-8 border-l-2 ${selectedNode === 'identity' ? 'border-primary text-primary bg-primary/10' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'}`}>
              <span className="material-symbols-outlined text-[16px]">account_circle</span>
              <span className="text-xs">Identity &amp; Metrics</span>
            </div>
            <div onClick={(e) => navigateToNode('status', true, 0.85, e)} className={`flex items-center gap-3 py-2 cursor-pointer transition-colors pl-8 border-l-2 ${selectedNode === 'status' ? 'border-tertiary text-tertiary bg-tertiary/10' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'}`}>
              <span className="material-symbols-outlined text-[16px]">psychiatry</span>
              <span className="text-xs">Current Status</span>
            </div>
            <div onClick={(e) => navigateToNode('toolkit', true, 0.85, e)} className={`flex items-center gap-3 py-2 cursor-pointer transition-colors pl-8 border-l-2 ${selectedNode === 'toolkit' ? 'border-secondary text-secondary bg-secondary/10' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'}`}>
              <span className="material-symbols-outlined text-[16px]">construction</span>
              <span className="text-xs">Toolkit Engine</span>
            </div>
            <div onClick={(e) => navigateToNode('music', true, 0.85, e)} className={`flex items-center gap-3 py-2 cursor-pointer transition-colors pl-8 border-l-2 ${selectedNode === 'music' ? 'border-green-400 text-green-400 bg-green-400/10' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'}`}>
              <span className="material-symbols-outlined text-[16px]">graphic_eq</span>
              <span className="text-xs">Spotify &amp; Craft</span>
            </div>
          </div>

          {/* Auto-Zoom Interaction Floating Hint On Sidebar */}
          <div className={`absolute top-[380px] ml-[7rem] pb-12 w-[240px] transform -rotate-12 transition-all duration-[1500ms] pointer-events-none ease-in-out z-[999] ${hasInteracted ? 'translate-y-[100vh] opacity-0 rotate-90 scale-90' : 'opacity-100'}`}>
            <div className="font-serif italic text-[22px] leading-tight text-primary/80 font-medium whitespace-nowrap relative">
              <span className="material-symbols-outlined absolute -top-8 -left-5 text-[36px] text-primary/60 rotate-[-15deg]">north_west</span>
              Click here for<br />auto-zoom to focus<br />like in Figma!
            </div>
          </div>

          <div className="px-6 mt-auto mb-4 flex flex-col gap-2">
            <button onClick={() => fitToOverview(true)} className="w-full py-2 rounded-lg border border-primary/40 bg-primary/10 hover:bg-primary/20 text-center transition-all text-primary font-mono text-xs font-semibold flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px]">fit_screen</span>
              Overview View
            </button>
          </div>
        </aside>

        {/* MAIN CANVAS */}
        <main
          ref={canvasAreaRef as any}
          className="flex-1 ml-64 mr-60 figma-canvas relative overflow-hidden bg-[#0A0A0A] canvas-bg select-none cursor-grab active:cursor-grabbing"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div ref={canvasContentRef} className="absolute top-0 left-0 w-full flex justify-center items-start transition-transform duration-75 origin-center canvas-clickable-bg">
            <div className="relative w-[1800px] h-[1260px] pointer-events-none mt-12 scale-90 md:scale-100">

              <div className="absolute -top-10 left-10 flex items-center gap-2 text-on-surface-variant font-label-md text-label-md pointer-events-none">
                <span className="material-symbols-outlined text-[16px]">crop</span>
                <span>About Context Board</span>
                <span className="text-surface-variant">1800 x 1260</span>
              </div>

              <div className="artboard-frame w-[1800px] h-[1260px] rounded-xl relative p-16 overflow-hidden canvas-clickable-bg pointer-events-auto border border-white/10 shadow-[0_30px_100px_-20px_rgba(0,0,0,1)] bg-[#0C0C0C]">

                <style>
                  {`
                    @keyframes floatCursor1 {
                      0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
                      25% { transform: translate(35px, -20px) rotate(5deg); }
                      50% { transform: translate(50px, 15px) rotate(-5deg); }
                      75% { transform: translate(15px, 35px) rotate(3deg); }
                    }
                    @keyframes floatCursor2 {
                      0%, 100% { transform: translate(0px, 0px); }
                      33% { transform: translate(-40px, 20px); }
                      66% { transform: translate(20px, -15px); }
                    }
                    @keyframes wireDash {
                      to { stroke-dashoffset: -28; }
                    }
                    @keyframes musicWave {
                      0%, 100% { height: 4px; }
                      50% { height: 18px; }
                    }
                    .animate-float-cursor-1 { animation: floatCursor1 10s infinite ease-in-out; }
                    .animate-float-cursor-2 { animation: floatCursor2 14s infinite ease-in-out; }
                    .animate-wire-dash { stroke-dasharray: 6 6; animation: wireDash 1.4s linear infinite; }
                    .animate-music-bar-1 { animation: musicWave 0.9s ease-in-out infinite; }
                    .animate-music-bar-2 { animation: musicWave 1.2s ease-in-out 0.2s infinite; }
                    .animate-music-bar-3 { animation: musicWave 0.7s ease-in-out 0.4s infinite; }
                    .animate-music-bar-4 { animation: musicWave 1.0s ease-in-out 0.1s infinite; }
                  `}
                </style>

                {/* SVG CONNECTORS (Radiating directly from Center Master Photo to Surrounding Nodes) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="wireGradient1" x1="1" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.5" />
                    </linearGradient>
                    <linearGradient id="wireGradient2" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor="#5abcb9" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.5" />
                    </linearGradient>
                    <linearGradient id="wireGradient3" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e0a96d" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.5" />
                    </linearGradient>
                    <linearGradient id="wireGradient4" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1DB954" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#4ade80" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>

                  {/* Wire 1: Center Photo -> Identity (Top-Left) */}
                  <path className="stroke-primary/20 stroke-[6] fill-none blur-[2px]" d="M 680 370 C 580 370, 600 295, 520 295" />
                  <path className="stroke-[url(#wireGradient1)] stroke-2 fill-none animate-wire-dash" d="M 680 370 C 580 370, 600 295, 520 295" />
                  <circle cx="680" cy="370" r="5" fill="#6366f1" className="stroke-[#0c0c0c] stroke-2" />
                  <circle cx="520" cy="295" r="5" fill="#818cf8" className="stroke-[#0c0c0c] stroke-2" />
                  <rect x="545" y="315" width="120" height="26" rx="13" fill="#18181b" className="stroke-primary/40 stroke" />
                  <text x="605" y="332" fill="#c7d2fe" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">identity &amp; spec ➔</text>

                  {/* Wire 2: Center Photo -> Status (Top-Right) */}
                  <path className="stroke-[#5abcb9]/20 stroke-[6] fill-none blur-[2px]" d="M 1120 370 C 1210 370, 1190 285, 1280 285" />
                  <path className="stroke-[url(#wireGradient2)] stroke-2 fill-none animate-wire-dash" d="M 1120 370 C 1210 370, 1190 285, 1280 285" />
                  <circle cx="1120" cy="370" r="5" fill="#5abcb9" className="stroke-[#0c0c0c] stroke-2" />
                  <circle cx="1280" cy="285" r="5" fill="#2dd4bf" className="stroke-[#0c0c0c] stroke-2" />
                  <rect x="1145" y="315" width="120" height="26" rx="13" fill="#18181b" className="stroke-[#5abcb9]/40 stroke" />
                  <text x="1205" y="332" fill="#5abcb9" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">current focus ➔</text>

                  {/* Wire 3: Center Photo -> Toolkit (Bottom-Left) */}
                  <path className="stroke-[#e0a96d]/20 stroke-[6] fill-none blur-[2px]" d="M 680 590 C 580 590, 600 820, 520 820" />
                  <path className="stroke-[url(#wireGradient3)] stroke-2 fill-none animate-wire-dash" d="M 680 590 C 580 590, 600 820, 520 820" />
                  <circle cx="680" cy="590" r="5" fill="#e0a96d" className="stroke-[#0c0c0c] stroke-2" />
                  <circle cx="520" cy="820" r="5" fill="#fbbf24" className="stroke-[#0c0c0c] stroke-2" />
                  <rect x="545" y="695" width="116" height="26" rx="13" fill="#18181b" className="stroke-[#e0a96d]/40 stroke" />
                  <text x="603" y="712" fill="#fbbf24" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">crafted with ➔</text>

                  {/* Wire 4: Center Photo -> Music / Philosophy (Bottom-Right) */}
                  <path className="stroke-[#1DB954]/20 stroke-[6] fill-none blur-[2px]" d="M 1120 590 C 1210 590, 1190 820, 1280 820" />
                  <path className="stroke-[url(#wireGradient4)] stroke-2 fill-none animate-wire-dash" d="M 1120 590 C 1210 590, 1190 820, 1280 820" />
                  <circle cx="1120" cy="590" r="5" fill="#1DB954" className="stroke-[#0c0c0c] stroke-2" />
                  <circle cx="1280" cy="820" r="5" fill="#4ade80" className="stroke-[#0c0c0c] stroke-2" />
                  <rect x="1145" y="695" width="116" height="26" rx="13" fill="#18181b" className="stroke-[#1DB954]/40 stroke" />
                  <text x="1203" y="712" fill="#4ade80" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">soundtrack ➔</text>
                </svg>

                {/* MULTIPLAYER CURSOR (Comment on Board) */}
                <div className="absolute top-[60px] left-[560px] z-50 pointer-events-none animate-float-cursor-2">
                  <svg className="drop-shadow-lg" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 3L19.5 10.5L12 12.5L9 20L5.5 3Z" fill="#009bd3" stroke="white" strokeLinejoin="round" strokeWidth="1.5"></path>
                  </svg>
                  <div className="bg-[#009bd3] text-white px-3 py-2 rounded-lg text-xs shadow-2xl mt-3 relative min-w-[210px]">
                    <div className="absolute -top-1 left-2 w-3 h-3 bg-[#009bd3] rotate-45"></div>
                    <div className="font-bold mb-1 opacity-80 uppercase tracking-widest text-[9px] relative z-10">Sarah (Design Lead)</div>
                    <span className="relative z-10">Love the central node architecture! Connecting all specs cleanly.</span>
                    <div className="w-1 h-3 bg-white/80 animate-pulse inline-block ml-1 align-middle relative z-10"></div>
                  </div>
                </div>

                {/* PERIPHERAL ARTIFACT: Yellow Sticky Note (Shifted safely above status card) */}
                <div className="absolute top-[50px] left-[1060px] z-10 bg-[#FBF3A1] text-black w-52 h-40 p-4 shadow-xl rotate-[2.5deg] pointer-events-none border border-black/10">
                  <div className="w-8 h-2 bg-red-400/50 absolute -top-1 left-1/2 -translate-x-1/2 rotate-[-4deg]"></div>
                  <div className="font-bold text-xs mb-1.5 opacity-80 uppercase tracking-widest font-mono">CodeSrijan Sprint</div>
                  <div className="font-mono text-xs leading-relaxed opacity-90">72h Hackathon at JUET: 200+ builders, finalized design systems &amp; live tokens! 🚀</div>
                </div>

                {/* ============================================================== */}
                {/* 1. CENTER MASTER COMPONENT (VARUN SEHGAL HERO PHOTO & BIO)   */}
                {/* ============================================================== */}
                <div
                  data-id="profile"
                  onMouseEnter={() => setSelectedNode('profile')}
                  className={`absolute top-[240px] left-[680px] z-30 cursor-pointer transition-all duration-300 ${selectedNode === 'profile' ? 'scale-105 z-40' : 'scale-100 hover:scale-[1.02]'}`}
                >
                  <div className={`relative w-[440px] rounded-2xl p-6 bg-gradient-to-b from-[#18181c] to-[#101013] border-2 transition-all duration-300 shadow-[0_30px_90px_rgba(0,0,0,0.85)] ${selectedNode === 'profile' ? 'border-primary shadow-[0_0_70px_rgba(99,102,241,0.28)]' : 'border-white/10 hover:border-white/25'}`}>
                    
                    {/* Visual Connector Socket Pins matching the radiating wires */}
                    <div className="absolute top-[130px] -left-3 -translate-y-1/2 flex items-center justify-center pointer-events-none" title="Connected to Identity & Metrics">
                      <span className="w-6 h-6 rounded-full bg-[#18181c] border-2 border-[#6366f1] flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.6)]">
                        <span className="w-2 h-2 rounded-full bg-[#818cf8]"></span>
                      </span>
                    </div>
                    <div className="absolute top-[350px] -left-3 -translate-y-1/2 flex items-center justify-center pointer-events-none" title="Connected to Toolkit Engine">
                      <span className="w-6 h-6 rounded-full bg-[#18181c] border-2 border-[#e0a96d] flex items-center justify-center shadow-[0_0_12px_rgba(224,169,109,0.6)]">
                        <span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span>
                      </span>
                    </div>
                    <div className="absolute top-[130px] -right-3 -translate-y-1/2 flex items-center justify-center pointer-events-none" title="Connected to Current Status">
                      <span className="w-6 h-6 rounded-full bg-[#18181c] border-2 border-[#5abcb9] flex items-center justify-center shadow-[0_0_12px_rgba(90,188,185,0.6)]">
                        <span className="w-2 h-2 rounded-full bg-[#2dd4bf]"></span>
                      </span>
                    </div>
                    <div className="absolute top-[350px] -right-3 -translate-y-1/2 flex items-center justify-center pointer-events-none" title="Connected to Spotify & Craft">
                      <span className="w-6 h-6 rounded-full bg-[#18181c] border-2 border-[#1DB954] flex items-center justify-center shadow-[0_0_12px_rgba(29,185,84,0.6)]">
                        <span className="w-2 h-2 rounded-full bg-[#4ade80]"></span>
                      </span>
                    </div>
                    
                    {/* Top Bar / Master Component Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold bg-primary/15 text-primary border border-primary/30">
                          <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
                          Core Master Component
                        </span>
                        <span className="text-xs font-mono text-white/50 uppercase tracking-widest">v3.2</span>
                      </div>
                      <span className={`material-symbols-outlined text-[20px] ${selectedNode === 'profile' ? 'text-primary' : 'text-on-surface-variant'}`}>push_pin</span>
                    </div>

                    {/* Featured Photo Frame */}
                    <div className="relative w-full h-[320px] rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-950 mb-5 group">
                      <img
                        src="/varun.jpg"
                        alt="Varun Sehgal"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/varun.jpeg'; }}
                      />
                      {/* Gradient overlay for text protection */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"></div>

                      {/* Floating status badges on the image */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-green-500/40 text-green-400 text-xs font-mono font-bold shadow-lg">
                          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
                          Open to Work
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono shadow-lg">
                          <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                          Gwalior, India
                        </div>
                      </div>
                    </div>

                    {/* Name & Title */}
                    <div className="pointer-events-none mb-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black text-white tracking-tight">Varun Sehgal</h2>
                        <span className="text-xs font-mono text-primary font-bold px-2.5 py-1 rounded bg-primary/10 border border-primary/20">Lead Spec</span>
                      </div>
                      <p className="text-base font-bold text-primary font-mono mt-1">UI/UX Designer | Product Designer</p>
                      <p className="text-sm text-zinc-300 leading-relaxed mt-2.5">
                        Delivering high-impact SaaS &amp; AI product design with +45% engagement lift and 30% drop-off reduction. B.Tech CS &amp; Engineering at JUET.
                      </p>
                    </div>

                    {/* Contact & Links Bar */}
                    <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-sm font-mono text-zinc-300">
                        <span className="flex items-center gap-2 truncate">
                          <span className="material-symbols-outlined text-[16px] text-primary">mail</span>
                          varun.sehgal02@gmail.com
                        </span>
                        <span className="flex items-center gap-1.5 shrink-0">
                          <span className="material-symbols-outlined text-[16px] text-primary">call</span>
                          +91-9399361193
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 mt-1">
                        <a
                          href="/resume.pdf"
                          download="Varun_Sehgal_Resume.pdf"
                          className="flex-1 py-2.5 px-3.5 rounded-lg bg-primary text-black font-bold text-sm font-mono flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                        >
                          <span className="material-symbols-outlined text-[16px]">download</span>
                          Download Resume
                        </a>
                        <a
                          href="mailto:varun.sehgal02@gmail.com"
                          className="py-2.5 px-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white font-mono text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">send</span>
                          Get In Touch
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ============================================================== */}
                {/* 2. TOP-LEFT NODE: IDENTITY & TRACK RECORD                      */}
                {/* ============================================================== */}
                <div
                  data-id="identity"
                  onMouseEnter={() => setSelectedNode('identity')}
                  className={`absolute top-[50px] left-[70px] z-20 cursor-pointer transition-all duration-300 ${selectedNode === 'identity' ? 'scale-105 z-30' : 'scale-100 hover:scale-[1.02]'}`}
                >
                  <div className={`sticky-note bg-surface-container-high border w-[450px] p-6 rounded-xl rotate-[-1deg] transition-colors shadow-2xl ${selectedNode === 'identity' ? 'border-primary/50 shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)]' : 'border-white/10'}`}>
                    <div className="flex justify-between items-start mb-3.5">
                      <span className="font-label-md text-label-md text-primary bg-primary/10 px-2.5 py-1 rounded border border-primary/20 flex gap-2 items-center"><span className="material-symbols-outlined text-[16px]">token</span> Component</span>
                      <span className={`material-symbols-outlined text-[20px] ${selectedNode === 'identity' ? 'text-primary' : 'text-on-surface-variant'}`}>push_pin</span>
                    </div>
                    <div className="mb-3.5 pointer-events-none">
                      <div className="text-xs text-primary font-mono uppercase tracking-widest font-bold mb-1">Variant • {variant}</div>
                      <h2 className="text-3xl text-white font-black leading-tight">{getVariantTitle()}</h2>
                      <p className="text-sm text-zinc-400 mt-1 font-mono">Gwalior, MP, India • Remote Worldwide</p>
                    </div>

                    <div className="flex flex-col gap-2.5 pointer-events-none">
                      <div className="flex items-start gap-3.5 bg-black/30 py-2.5 px-3.5 rounded-lg border border-white/5">
                        <span className="material-symbols-outlined text-primary text-[24px] mt-0.5">verified</span>
                        <div>
                          <div className="font-bold text-base text-white">3+ Years SaaS &amp; AI Design</div>
                          <div className="text-sm text-zinc-300 mt-0.5 leading-normal">Proven metrics: +45% user engagement &amp; 30% drop-off reduction.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5 bg-black/30 py-2.5 px-3.5 rounded-lg border border-white/5">
                        <span className="material-symbols-outlined text-primary text-[24px] mt-0.5">rocket_launch</span>
                        <div>
                          <div className="font-bold text-base text-white">10+ Shipped Startup Projects</div>
                          <div className="text-sm text-zinc-300 mt-0.5 leading-normal">95% client retention rate through human-centered, iterative delivery.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5 bg-black/30 py-2.5 px-3.5 rounded-lg border border-white/5">
                        <span className="material-symbols-outlined text-primary text-[24px] mt-0.5">psychology</span>
                        <div>
                          <div className="font-bold text-base text-white">AI-Augmented Prototyping</div>
                          <div className="text-sm text-zinc-300 mt-0.5 leading-normal">Figma AI, Uizard &amp; Galileo AI cutting early-stage design turnaround by 45%.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5 bg-black/30 py-2.5 px-3.5 rounded-lg border border-white/5">
                        <span className="material-symbols-outlined text-primary text-[24px] mt-0.5">handshake</span>
                        <div>
                          <div className="font-bold text-base text-white">Seamless Dev Handoffs</div>
                          <div className="text-sm text-zinc-300 mt-0.5 leading-normal">Reduced implementation friction &amp; technical errors by 15% via tokens.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* 3. TOP-RIGHT NODE: CURRENT STATUS & VENTURES                  */}
                {/* ============================================================== */}
                <div
                  data-id="status"
                  onMouseEnter={() => setSelectedNode('status')}
                  className={`absolute top-[50px] left-[1280px] z-20 cursor-pointer transition-all duration-300 ${selectedNode === 'status' ? 'scale-105 z-30' : 'scale-100 hover:scale-[1.02]'}`}
                >
                  <div className={`sticky-note bg-surface-container border w-[450px] p-6 rounded-xl rotate-[1.5deg] transition-colors shadow-2xl ${selectedNode === 'status' ? 'border-tertiary/50 shadow-[0_0_50px_rgba(var(--tertiary-rgb),0.2)]' : 'border-white/10'}`}>
                    <div className="flex justify-between items-start mb-3.5">
                      <span className="font-label-md text-label-md text-tertiary bg-tertiary/10 px-2.5 py-1 rounded border border-tertiary/20 flex gap-2 items-center"><span className="material-symbols-outlined text-[16px]">psychiatry</span> Status</span>
                      <span className={`material-symbols-outlined text-[20px] ${selectedNode === 'status' ? 'text-tertiary' : 'text-on-surface-variant'}`}>push_pin</span>
                    </div>

                    <div className="pointer-events-none">
                      <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-green-500/20 mb-3.5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        Open to Opportunities
                      </div>
                      <h3 className="text-3xl text-white mb-1 font-black">Product &amp; UI/UX Designer</h3>
                      <div className="text-sm text-tertiary font-mono font-semibold mb-4">Knaptix Ventures Intern • CodeSrijan Lead</div>

                      <div className="space-y-2.5">
                        <div className="flex gap-3.5 items-start bg-black/30 py-2.5 px-3.5 rounded-lg border border-white/5">
                          <span className="material-symbols-outlined text-[22px] text-tertiary mt-0.5">business_center</span>
                          <div>
                            <span className="text-white font-bold text-base">Knaptix Ventures Private Limited</span>
                            <p className="text-sm text-zinc-300 mt-0.5 leading-normal">UI/UX Designer Intern (Remote) • 5+ high-fidelity interfaces with 40% satisfaction boost.</p>
                          </div>
                        </div>
                        <div className="flex gap-3.5 items-start bg-black/30 py-2.5 px-3.5 rounded-lg border border-white/5">
                          <span className="material-symbols-outlined text-[22px] text-tertiary mt-0.5">school</span>
                          <div>
                            <span className="text-white font-bold text-base">B.Tech in Computer Science &amp; Engineering</span>
                            <p className="text-sm text-zinc-300 mt-0.5 leading-normal">Jaypee University of Engineering and Technology, Guna (2023 – 2027).</p>
                          </div>
                        </div>
                        <div className="flex gap-3.5 items-start bg-black/30 py-2.5 px-3.5 rounded-lg border border-white/5">
                          <span className="material-symbols-outlined text-[22px] text-tertiary mt-0.5">trophy</span>
                          <div>
                            <span className="text-white font-bold text-base">CodeSrijan Hackathon Lead Designer</span>
                            <p className="text-sm text-zinc-300 mt-0.5 leading-normal">Co-organizer for 72h event with 200+ participants (+20% YoY registration growth).</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* 4. BOTTOM-LEFT NODE: TOOLKIT & FRAMEWORKS                      */}
                {/* ============================================================== */}
                <div
                  data-id="toolkit"
                  onMouseEnter={() => setSelectedNode('toolkit')}
                  className={`absolute top-[690px] left-[70px] z-20 cursor-pointer transition-all duration-300 ${selectedNode === 'toolkit' ? 'scale-105 z-30' : 'scale-100 hover:scale-[1.02]'}`}
                >
                  <div className={`sticky-note bg-surface-container border w-[450px] p-6 rounded-xl rotate-[-1.5deg] transition-colors shadow-2xl ${selectedNode === 'toolkit' ? 'border-secondary/50 shadow-[0_0_50px_rgba(var(--secondary-rgb),0.2)]' : 'border-white/10'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-label-md text-label-md text-secondary bg-secondary/10 px-2.5 py-1 rounded border border-secondary/20 flex gap-2 items-center"><span className="material-symbols-outlined text-[16px]">construction</span> Frameworks &amp; Skills</span>
                      <span className={`material-symbols-outlined text-[20px] ${selectedNode === 'toolkit' ? 'text-secondary' : 'text-on-surface-variant'}`}>push_pin</span>
                    </div>

                    <div className="pointer-events-none space-y-3.5">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-primary font-bold mb-2 border-b border-white/10 pb-1 font-mono">UI/UX Design Craft</div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3.5 py-1.5 bg-surface-variant/60 border border-white/10 rounded-lg text-sm text-zinc-200 font-mono">Figma Auto-Layout</span>
                          <span className="px-3.5 py-1.5 bg-surface-variant/60 border border-white/10 rounded-lg text-sm text-zinc-200 font-mono">Design Systems</span>
                          <span className="px-3.5 py-1.5 bg-surface-variant/60 border border-white/10 rounded-lg text-sm text-zinc-200 font-mono">Wireframing</span>
                          <span className="px-3.5 py-1.5 bg-surface-variant/60 border border-white/10 rounded-lg text-sm text-zinc-200 font-mono">Rapid Prototyping</span>
                          <span className="px-3.5 py-1.5 bg-surface-variant/60 border border-white/10 rounded-lg text-sm text-zinc-200 font-mono">User Research</span>
                          <span className="px-3.5 py-1.5 bg-surface-variant/60 border border-white/10 rounded-lg text-sm text-zinc-200 font-mono">Usability Testing</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-[#fbbf24] font-bold mb-2 border-b border-white/10 pb-1 font-mono">AI-Augmented &amp; Creative Tools</div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3.5 py-1.5 bg-primary/15 text-primary border border-primary/30 rounded-lg text-sm font-mono font-bold">Figma AI</span>
                          <span className="px-3.5 py-1.5 bg-primary/15 text-primary border border-primary/30 rounded-lg text-sm font-mono font-bold">Uizard</span>
                          <span className="px-3.5 py-1.5 bg-primary/15 text-primary border border-primary/30 rounded-lg text-sm font-mono font-bold">Galileo AI</span>
                          <span className="px-3.5 py-1.5 bg-surface-variant/60 border border-white/10 rounded-lg text-sm text-zinc-200 font-mono">Adobe XD</span>
                          <span className="px-3.5 py-1.5 bg-surface-variant/60 border border-white/10 rounded-lg text-sm text-zinc-200 font-mono">Photoshop</span>
                          <span className="px-3.5 py-1.5 bg-surface-variant/60 border border-white/10 rounded-lg text-sm text-zinc-200 font-mono">Magician &amp; Automator</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-secondary font-bold mb-2 border-b border-white/10 pb-1 font-mono">Engineering &amp; Code Foundations</div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3.5 py-1.5 bg-secondary/15 text-secondary border border-secondary/30 rounded-lg text-sm font-mono font-bold">React 19</span>
                          <span className="px-3.5 py-1.5 bg-secondary/15 text-secondary border border-secondary/30 rounded-lg text-sm font-mono font-bold">Next.js</span>
                          <span className="px-3.5 py-1.5 bg-secondary/15 text-secondary border border-secondary/30 rounded-lg text-sm font-mono font-bold">Tailwind CSS</span>
                          <span className="px-3.5 py-1.5 bg-surface-variant/60 border border-white/10 rounded-lg text-sm text-zinc-200 font-mono">TypeScript</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* 5. BOTTOM-RIGHT NODE: MUSIC & DESIGN PHILOSOPHY                */}
                {/* ============================================================== */}
                <div
                  data-id="music"
                  onMouseEnter={() => setSelectedNode('music')}
                  className={`absolute top-[690px] left-[1280px] z-20 cursor-pointer transition-all duration-300 ${selectedNode === 'music' ? 'scale-105 z-30' : 'scale-100 hover:scale-[1.02]'}`}
                >
                  <div className={`sticky-note bg-surface-container border w-[450px] p-6 rounded-xl rotate-[1.5deg] transition-colors shadow-2xl flex flex-col gap-4 ${selectedNode === 'music' ? 'border-[#1DB954]/50 shadow-[0_0_50px_rgba(29,185,84,0.2)]' : 'border-white/10'}`}>
                    
                    {/* Interactive Playable Spotify Player */}
                    <div className="bg-[#121212] border border-white/15 rounded-xl p-4 shadow-xl flex flex-col gap-3.5">
                      <div className="flex items-center gap-3.5">
                        {/* Spinning Vinyl / Album Art */}
                        <div
                          onClick={toggleMusic}
                          className="w-14 h-14 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-700 border-2 border-white/20 flex items-center justify-center relative overflow-hidden shrink-0 cursor-pointer group shadow-lg"
                          title={isPlaying ? "Click to Pause" : "Click to Play"}
                        >
                          <div className={`w-full h-full rounded-full flex items-center justify-center ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                            {/* Vinyl Grooves */}
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                              <div className="w-6 h-6 rounded-full border border-white/20 bg-black flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#1DB954]"></div>
                              </div>
                            </div>
                          </div>
                          {/* Hover Play/Pause overlay */}
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 flex items-center justify-center transition-colors">
                            <span className="material-symbols-outlined text-[26px] text-white">
                              {isPlaying ? 'pause' : 'play_arrow'}
                            </span>
                          </div>
                        </div>

                        {/* Track Info */}
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center justify-between mb-0.5">
                            <div className="text-[10px] uppercase tracking-widest text-[#1DB954] font-bold flex items-center gap-1.5 font-mono">
                              {isPlaying ? (
                                <div className="flex items-end gap-0.5 h-3">
                                  <span className="w-0.5 bg-[#1DB954] rounded-full animate-music-bar-1"></span>
                                  <span className="w-0.5 bg-[#1DB954] rounded-full animate-music-bar-2"></span>
                                  <span className="w-0.5 bg-[#1DB954] rounded-full animate-music-bar-3"></span>
                                  <span className="w-0.5 bg-[#1DB954] rounded-full animate-music-bar-4"></span>
                                </div>
                              ) : (
                                <span className="material-symbols-outlined text-[13px]">graphic_eq</span>
                              )}
                              <span>{isPlaying ? 'Now Playing' : 'Currently Vibing'}</span>
                            </div>
                            {/* Mute button */}
                            <button
                              onClick={toggleMute}
                              className="text-zinc-400 hover:text-white transition-colors p-1"
                              title={isMuted ? "Unmute" : "Mute"}
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                {isMuted ? 'volume_off' : 'volume_up'}
                              </span>
                            </button>
                          </div>
                          <div className="font-bold text-base text-white truncate">Lo-Fi Beats to Design To</div>
                          <div className="text-sm text-zinc-400 truncate">Chillhop &amp; Ambient • Creative Flow</div>
                        </div>
                      </div>

                      {/* Music Controls & Progress Bar */}
                      <div className="flex flex-col gap-1.5 pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={toggleMusic}
                            className="w-8 h-8 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center transition-transform hover:scale-105 shadow-md shadow-[#1DB954]/20 shrink-0"
                            title={isPlaying ? "Pause" : "Play"}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {isPlaying ? 'pause' : 'play_arrow'}
                            </span>
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={audioProgress}
                            onChange={handleSeek}
                            className="flex-1 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
                          />
                        </div>
                        <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400 px-1">
                          <span>{audioCurrentTime}</span>
                          <span>{audioDuration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Design Craft & Philosophy Card */}
                    <div className="bg-black/30 rounded-xl p-4 border border-white/5 pointer-events-none">
                      <div className="text-xs uppercase tracking-widest text-primary font-bold mb-1.5 font-mono">Design Philosophy</div>
                      <h4 className="text-base font-bold text-white mb-1.5">Human-Centered × AI-Accelerated</h4>
                      <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                        Bridging rigorous user discovery with automated design systems, translating pure Figma tokens into production-ready frontends without friction.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="px-2.5 py-1 bg-green-500/15 text-green-400 rounded-md border border-green-500/30 font-bold">+45% Speed</span>
                        <span className="px-2.5 py-1 bg-primary/15 text-primary rounded-md border border-primary/30 font-bold">50+ UI Tokens</span>
                        <span className="px-2.5 py-1 bg-secondary/15 text-secondary rounded-md border border-secondary/30 font-bold">10+ Startups</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ZOOM WIDGET (Positioned cleanly floating above bottom workspace dock) */}
          <ZoomWidget
            scale={currentScale}
            onZoomIn={() => setCurrentScale(s => Math.min(Number((s + 0.1).toFixed(2)), 2))}
            onZoomOut={() => setCurrentScale(s => Math.max(Number((s - 0.1).toFixed(2)), 0.2))}
            onFitAll={() => fitToOverview(true)}
            x={-dragState.current.translateX}
            y={-dragState.current.translateY}
            className="bottom-28 right-6 z-[110]"
          />
        </main>

        {/* RIGHT SIDEBAR (FIGMA PROPERTIES PANEL PRECISE MATCH) */}
        <aside className="absolute right-0 top-0 bottom-0 w-[240px] z-40 flex flex-col bg-[#1A1A1A] border-l border-[#2E2E2E] font-mono text-[13px] select-none overflow-y-auto overflow-x-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2E2E2E]">
            <div className="flex items-center gap-2">
              <span className="text-[#F2F2F2] font-bold text-sm tracking-wide">Design</span>
              <span className="text-[#FFB1A3]/80 text-[10px] uppercase font-bold tracking-wider">(Spec)</span>
            </div>
            <span className="text-[10px] text-white/40 uppercase font-mono">{nodeSpecs[selectedNode].tag}</span>
          </div>

          <div className="flex flex-col">

            {/* Component Header & Coordinates */}
            <div className="px-5 py-5 border-b border-[#2E2E2E]">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: nodeSpecs[selectedNode].colorHex }}></span>
                <div className="min-w-0">
                  <div className="text-white font-bold text-[12px] tracking-wide truncate">
                    {nodeSpecs[selectedNode].name}
                  </div>
                  <div className="text-[10px] text-white/40 font-mono">
                    {nodeSpecs[selectedNode].type}
                  </div>
                </div>
              </div>

              {/* X, Y, W, H Grid */}
              <div className="grid grid-cols-2 gap-x-2.5 gap-y-2">
                <div className="flex items-center bg-[#252525] rounded border border-transparent hover:border-[#3E3E3E] transition-colors h-7 px-2">
                  <span className="text-[#FFB1A3]/70 font-bold text-[11px] w-4">X</span>
                  <span className="text-white font-bold text-[11px] flex-1 text-right">{nodeSpecs[selectedNode].x}</span>
                </div>
                <div className="flex items-center bg-[#252525] rounded border border-transparent hover:border-[#3E3E3E] transition-colors h-7 px-2">
                  <span className="text-[#FFB1A3]/70 font-bold text-[11px] w-4">Y</span>
                  <span className="text-white font-bold text-[11px] flex-1 text-right">{nodeSpecs[selectedNode].y}</span>
                </div>
                <div className="flex items-center bg-[#252525] rounded border border-transparent hover:border-[#3E3E3E] transition-colors h-7 px-2">
                  <span className="text-[#FFB1A3]/70 font-bold text-[11px] w-4">W</span>
                  <span className="text-white font-bold text-[11px] flex-1 text-right">{nodeSpecs[selectedNode].w}</span>
                </div>
                <div className="flex items-center bg-[#252525] rounded border border-transparent hover:border-[#3E3E3E] transition-colors h-7 px-2">
                  <span className="text-[#FFB1A3]/70 font-bold text-[11px] w-4">H</span>
                  <span className="text-white font-bold text-[11px] flex-1 text-right">{nodeSpecs[selectedNode].h}</span>
                </div>
              </div>
            </div>

            {/* Variant Switcher (Interactive - Product Designer, UI/UX Specialist, Design System Lead) */}
            <div className="px-5 py-4 border-b border-[#2E2E2E]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold text-[12px] tracking-wide">Variant</span>
                <span className="text-[10px] text-primary font-mono">active</span>
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                {(['Product Designer', 'UI/UX Specialist', 'Design System Lead'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`text-left px-2.5 py-1.5 rounded text-[11px] font-mono transition-all flex items-center justify-between ${variant === v ? 'bg-primary/20 text-primary border border-primary/40 font-bold' : 'bg-[#252525] text-white/70 hover:bg-white/5 border border-transparent'}`}
                  >
                    <span>{v}</span>
                    {variant === v && <span className="material-symbols-outlined text-[14px]">check</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Fill Swatch */}
            <div className="px-5 py-4 border-b border-[#2E2E2E]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-bold text-[12px] tracking-wide">Fill</span>
                <span className="text-white/40 text-[11px]">100%</span>
              </div>
              <div className="flex items-center justify-between bg-[#252525] p-2 rounded border border-[#303030]">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-[3px] border border-white/20" style={{ backgroundColor: nodeSpecs[selectedNode].colorHex }}></div>
                  <span className="text-white font-bold text-[11px] tracking-widest">{nodeSpecs[selectedNode].colorHex.toUpperCase()}</span>
                </div>
                <span className="text-white/50 text-[10px]">Solid</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-5 py-4 border-b border-[#2E2E2E]">
              <span className="text-white font-bold text-[12px] tracking-wide block mb-3">Quick Navigation</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => navigateToNode('profile', true, 0.85)}
                  className="p-2 rounded bg-[#252525] hover:bg-primary/20 hover:text-primary transition-colors text-[10px] text-center border border-white/5"
                >
                  Focus Center
                </button>
                <button
                  onClick={() => fitToOverview(true)}
                  className="p-2 rounded bg-[#252525] hover:bg-primary/20 hover:text-primary transition-colors text-[10px] text-center border border-white/5"
                >
                  Fit Canvas
                </button>
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}
