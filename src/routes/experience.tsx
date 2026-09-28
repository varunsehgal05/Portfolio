import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ZoomWidget } from "../components/ZoomWidget";

const certsData = [
  { id: 'hackethor', title: "HAckeThor", issuer: "Unstop", date: "Apr 2025", link: "https://www.linkedin.com/in/varunsehgal02/details/certifications/", desc: "Participated in the competitive hackathon demonstrating robust problem solving mechanics." },
  { id: 'udemyux', title: "UX Design - Learn UI UX...", issuer: "Udemy", date: "Jan 2025", link: "https://www.linkedin.com/in/varunsehgal02/overlay/Certifications/16703438/treasury/?profileId=ACoAAEUrSyIBXGpH3kdd2egh1Ky40zSDrosE86o", desc: "Mastered fundamental UI/UX paradigms, user psychology, and modern app scaling mechanics." },
  { id: 'udemyfigma', title: "UI/UX design with Figma", issuer: "Udemy", date: "Jan 2025", link: "https://www.linkedin.com/in/varunsehgal02/overlay/Certifications/2055496611/treasury/?profileId=ACoAAEUrSyIBXGpH3kdd2egh1Ky40zSDrosE86o", desc: "Developed comprehensive real-world prototypes utilizing advanced Figma pipelines." },
  { id: 'imagine', title: "Imagine Hackathon", issuer: "Unstop", date: "Dec 2024", link: "https://www.linkedin.com/in/varunsehgal02/overlay/Certifications/1631302139/treasury/?profileId=ACoAAEUrSyIBXGpH3kdd2egh1Ky40zSDrosE86o", desc: "Demonstrated creative digital workflows and team problem-solving under pressure." },
  { id: 'python', title: "Python (Basic)", issuer: "HackerRank", date: "Jun 2024", link: "https://www.linkedin.com/in/varunsehgal02/overlay/Certifications/856048096/treasury/?profileId=ACoAAEUrSyIBXGpH3kdd2egh1Ky40zSDrosE86o", desc: "Validated core Python programming paradigms including data structures and logic scaling." },
  { id: 'iosux', title: "UI and UX for IOS", issuer: "Infosys Springboard", date: "Jun 2024", link: "https://www.linkedin.com/in/varunsehgal02/overlay/Certifications/363949724/treasury/?profileId=ACoAAEUrSyIBXGpH3kdd2egh1Ky40zSDrosE86o", desc: "Explored human interface guidelines specific to Apple iOS ecosystems." }
];

function Experience() {
  const [selectedNode, setSelectedNode] = useState<string>('unievent');
  const [activeTab, setActiveTab] = useState<'layers' | 'certificates'>('layers');
  const canvasAreaRef = useRef<HTMLElement | null>(null);
  const canvasContentRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startY: 0, translateX: 0, translateY: 0 });
  const [currentScale, setCurrentScale] = useState(1);

  const navigateToNode = (id: string, smooth = true, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedNode(id);
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
        canvasContentRef.current.style.transform = `translate(${newTx}px, ${newTy}px) scale(${currentScale})`;
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

  const handleTabChange = (tab: 'layers' | 'certificates') => {
    setActiveTab(tab);
    const targetNode = tab === 'layers' ? 'unievent' : 'hackethor';
    setSelectedNode(targetNode);

    // Reset canvas position completely so the box stays centered on screen
    dragState.current.translateX = 0;
    dragState.current.translateY = 0;

    if (canvasContentRef.current) {
      canvasContentRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      canvasContentRef.current.style.transform = `translate(0px, 0px) scale(${currentScale})`;
      setTimeout(() => {
        if (canvasContentRef.current) canvasContentRef.current.style.transition = 'transform 75ms ease-out';
      }, 600);
    }
  };

  // Re-apply scale whenever scale changes
  useEffect(() => {
    if (canvasContentRef.current) {
      canvasContentRef.current.style.transform = `translate(${dragState.current.translateX}px, ${dragState.current.translateY}px) scale(${currentScale})`;
    }
  }, [currentScale]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasAreaRef.current || e.target === canvasContentRef.current || (e.target as HTMLElement).closest('.canvas-clickable-bg')) {
      setIsDragging(true);
      dragState.current.startX = e.clientX - dragState.current.translateX;
      dragState.current.startY = e.clientY - dragState.current.translateY;
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
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

  const activeCert = certsData.find(c => c.id === selectedNode);

  return (
    <div className="bg-background text-on-background h-screen w-screen overflow-hidden flex flex-col font-body-md text-body-md">

      <div className="flex flex-1 mt-16 h-[calc(100vh-64px)] w-full">
        <aside className="fixed left-0 top-16 bottom-0 w-64 z-40 flex flex-col p-4 bg-surface dark:bg-surface-container-low border-r border-outline-variant/10 backdrop-blur-2xl bg-surface/80 flat no shadows font-label-md text-label-md font-body-md text-body-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">work</span>
            </div>
            <div>
              <div className="font-bold text-primary dark:text-primary">Experience</div>
              <div className="text-caption font-caption text-on-surface-variant">Career Timeline</div>
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <div onClick={() => handleTabChange('layers')} className={`flex-1 flex flex-col items-center justify-center py-2 font-bold rounded-lg cursor-pointer transition-colors ${activeTab === 'layers' ? 'text-primary bg-primary-container/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10'}`}>
              <span className="material-symbols-outlined text-[20px] mb-1">layers</span>
              <div className="text-[10px] uppercase tracking-wider font-semibold">Layers</div>
            </div>
            <div onClick={() => handleTabChange('certificates')} className={`flex-1 flex flex-col items-center justify-center py-2 font-bold rounded-lg cursor-pointer transition-colors ${activeTab === 'certificates' ? 'text-secondary bg-secondary-container/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/10'}`}>
              <span className="material-symbols-outlined text-[20px] mb-1">workspace_premium</span>
              <div className="text-[10px] uppercase tracking-wider font-semibold">Certs</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'layers' ? (
              <>
                <div className="py-1 px-2 mb-2 rounded flex items-center gap-2 text-on-surface-variant font-bold">
                  <span className="material-symbols-outlined text-[16px]">tag</span> <span>Experience Stack</span>
                </div>

                <div
                  onClick={(e) => navigateToNode('unievent', true, e)}
                  className={`pl-6 py-1.5 px-2 rounded cursor-pointer flex items-center gap-2 transition-colors ${selectedNode === 'unievent' ? 'bg-primary/20 text-primary' : 'hover:bg-surface-variant/10 text-on-surface'}`}
                >
                  <span className="material-symbols-outlined text-[16px]">check_box_outline_blank</span> <span>UniEvent (Jun 2026 — Nov 2026)</span>
                </div>

                <div
                  onClick={(e) => navigateToNode('knaptix', true, e)}
                  className={`pl-6 py-1.5 px-2 rounded cursor-pointer flex items-center gap-2 transition-colors ${selectedNode === 'knaptix' ? 'bg-primary/20 text-primary' : 'hover:bg-surface-variant/10 text-on-surface'}`}
                >
                  <span className="material-symbols-outlined text-[16px]">check_box_outline_blank</span> <span>Knaptix Ventures (Jun 2025 — Aug 2025)</span>
                </div>

                <div
                  onClick={(e) => navigateToNode('assemble', true, e)}
                  className={`pl-6 py-1.5 px-2 rounded cursor-pointer flex items-center gap-2 transition-colors ${selectedNode === 'assemble' ? 'bg-primary/20 text-primary' : 'hover:bg-surface-variant/10 text-on-surface'}`}
                >
                  <span className="material-symbols-outlined text-[16px]">check_box_outline_blank</span> <span>Assemble (Aug 2025 — Jan 2026)</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="py-1 px-2 mb-1 rounded flex items-center gap-2 text-on-surface-variant font-bold">
                  <span className="material-symbols-outlined text-[16px]">workspace_premium</span> <span>Licenses & Certifications</span>
                </div>

                {certsData.map((cert) => (
                  <div key={cert.id} onClick={(e) => navigateToNode(cert.id, true, e)} className={`group flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${selectedNode === cert.id ? 'bg-secondary/10 border-secondary/50' : 'bg-surface-container/50 border-white/5 hover:border-secondary/30'}`}>
                    <div className="w-8 h-8 shrink-0 rounded bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-sm truncate ${selectedNode === cert.id ? 'text-secondary' : 'text-on-surface'}`}>{cert.title}</div>
                      <div className="text-[10px] text-on-surface-variant tracking-widest">{cert.issuer} • {cert.date}</div>
                    </div>
                    <a href={cert.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="material-symbols-outlined text-on-surface-variant hover:text-secondary transition-colors text-sm bg-white/5 rounded p-1 hover:bg-white/10">open_in_new</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        <main
          ref={canvasAreaRef as any}
          className="flex-1 ml-64 mr-80 figma-canvas relative overflow-hidden bg-[#0A0A0A] canvas-bg select-none cursor-grab active:cursor-grabbing"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div ref={canvasContentRef} className="absolute top-0 left-0 w-full flex justify-center items-start pt-32 pb-32 transition-transform duration-75 origin-center canvas-clickable-bg">
            <div className="bg-[#0A0A0A] w-[900px] min-h-[650px] relative shadow-[0_30px_100px_-20px_rgba(0,0,0,1)] border border-white/10 p-12 fade-in animate-in duration-500 canvas-clickable-bg pointer-events-auto">

              {activeTab === 'layers' ? (
                <>
                  <div className="absolute top-4 left-6 text-on-surface-variant font-label-md text-label-md tracking-widest uppercase pointer-events-none">Experience Timeline</div>
                  <h1 className="font-display-md text-5xl text-on-surface mb-12 mt-8 font-bold pointer-events-none">Career Details</h1>

                  <div className="relative pl-8 border-l-2 border-white/10 pb-16">
                    <div
                      data-id="unievent"
                      className={`mb-16 relative group cursor-pointer transition-opacity timeline-node ${selectedNode === 'unievent' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                      onMouseEnter={() => setSelectedNode('unievent')}
                    >
                      <div className={`absolute w-4 h-4 rounded-full -left-[41px] top-1.5 transition-all ${selectedNode === 'unievent' ? 'bg-tertiary shadow-[0_0_15px_rgba(var(--tertiary-rgb),0.8)] scale-125' : 'bg-surface-variant border-2 border-white/20'}`}></div>
                      <div className="font-label-md text-sm text-tertiary mb-2 uppercase tracking-widest">Jun 2026 — Nov 2026</div>
                      <h3 className="font-headline-lg text-3xl text-on-surface mb-1 font-bold">UI/UX Designer Intern</h3>
                      <h4 className="font-headline-md text-xl text-on-surface-variant mb-4">UniEvent</h4>
                      <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                        Designing user-focused digital experiences and translating business requirements into clear, consistent interfaces.
                      </p>
                    </div>

                    <div
                      data-id="knaptix"
                      className={`mb-16 relative group cursor-pointer transition-opacity timeline-node ${selectedNode === 'knaptix' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                      onMouseEnter={() => setSelectedNode('knaptix')}
                    >
                      <div className={`absolute w-4 h-4 rounded-full -left-[41px] top-1.5 transition-all ${selectedNode === 'knaptix' ? 'bg-secondary shadow-[0_0_15px_rgba(var(--secondary-rgb),0.8)] scale-125' : 'bg-surface-variant border-2 border-white/20'}`}></div>
                      <div className="font-label-md text-sm text-secondary mb-2 uppercase tracking-widest">Jun 2025 — Aug 2025</div>
                      <h3 className="font-headline-lg text-3xl text-on-surface mb-1 font-bold">UI/UX Designer Intern</h3>
                      <h4 className="font-headline-md text-xl text-on-surface-variant mb-4">Knaptix Ventures</h4>
                      <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                        Led the interface design optimization for early-stage tech ventures, accelerating development handoff and creating high-quality aesthetic solutions that proved rapid ROI.
                      </p>
                    </div>

                    <div
                      data-id="assemble"
                      className={`relative group cursor-pointer transition-opacity timeline-node ${selectedNode === 'assemble' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                      onMouseEnter={() => setSelectedNode('assemble')}
                    >
                      <div className={`absolute w-4 h-4 rounded-full -left-[41px] top-1.5 transition-all ${selectedNode === 'assemble' ? 'bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)] scale-125' : 'bg-surface-variant border-2 border-white/20'}`}></div>
                      <div className="font-label-md text-sm text-primary mb-2 uppercase tracking-widest">Aug 2025 — Jan 2026</div>
                      <h3 className="font-headline-lg text-3xl text-on-surface mb-1 font-bold">Assistant Head of Operations</h3>
                      <h4 className="font-headline-md text-xl text-on-surface-variant mb-4">Assemble</h4>
                      <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                        Assisted in the planning and smooth execution of CODM tournaments and esports events, driving operational excellence.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute top-4 left-6 text-on-surface-variant font-label-md text-label-md tracking-widest uppercase pointer-events-none">Certifications Vault</div>
                  <h1 className="font-display-md text-5xl text-on-surface mb-12 mt-8 font-bold pointer-events-none">Educational Milestones</h1>

                  <div className="relative pl-8 border-l-2 border-white/10 pb-16">
                    {certsData.map((cert) => (
                      <div
                        key={cert.id}
                        data-id={cert.id}
                        className={`mb-16 relative group cursor-pointer transition-opacity timeline-node ${selectedNode === cert.id ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                        onMouseEnter={() => setSelectedNode(cert.id)}
                      >
                        <div className={`absolute w-4 h-4 rounded-full -left-[41px] top-1.5 transition-all ${selectedNode === cert.id ? 'bg-secondary shadow-[0_0_15px_rgba(var(--secondary-rgb),0.8)] scale-125' : 'bg-surface-variant border-2 border-white/20'}`}></div>
                        <div className="font-label-md text-sm text-secondary mb-2 uppercase tracking-widest">{cert.date}</div>
                        <h3 className="font-headline-lg text-3xl text-on-surface mb-1 font-bold">{cert.title}</h3>
                        <h4 className="font-headline-md text-xl text-on-surface-variant mb-4">{cert.issuer}</h4>
                        <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                          {cert.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <ZoomWidget
            scale={currentScale}
            onZoomIn={() => setCurrentScale(s => Math.min(Number((s + 0.1).toFixed(2)), 2))}
            onZoomOut={() => setCurrentScale(s => Math.max(Number((s - 0.1).toFixed(2)), 0.2))}
            onFitAll={() => {
              setCurrentScale(1);
              dragState.current.translateX = 0;
              dragState.current.translateY = 0;
              if (canvasContentRef.current) {
                canvasContentRef.current.style.transform = `translate(0px, 0px) scale(1)`;
              }
            }}
            x={-dragState.current.translateX}
            y={-dragState.current.translateY}
            className="bottom-28 right-6 z-[110]"
          />
        </main>

        <aside className="fixed right-0 top-16 bottom-0 w-80 z-40 flex flex-col pt-4 bg-surface dark:bg-surface-container-low border-l border-outline-variant/10 backdrop-blur-2xl bg-surface/80 flat no shadows font-body-md text-body-md">
          <div className="flex items-center gap-3 mb-6 px-4">
            <div>
              <div className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Properties</div>
              <div className="font-bold text-on-surface uppercase">{activeTab === 'layers' ? 'Role Properties' : 'Cert Properties'}</div>
            </div>
          </div>
          <div className="flex gap-4 border-b border-white/10 mb-2 px-4 pb-2">
            <div className="text-primary font-bold border-b-2 border-primary -mb-[10px] pb-2 cursor-pointer flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">info</span> Inspect
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">

            {selectedNode === 'assemble' && activeTab === 'layers' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-surface-container/30 border border-white/10 rounded-xl p-4 flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Role</span>
                    <span className="text-primary font-medium">Assistant Head of Operations</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Company</span>
                    <span className="text-on-surface font-medium">Assemble</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Duration</span>
                    <span className="text-on-surface font-medium">Aug 2025 — Jan 2026</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">Attachments</span>
                    <a href="https://www.linkedin.com/in/varunsehgal02/overlay/Position/2709119892/treasury/?profileId=ACoAAEUrSyIBXGpH3kdd2egh1Ky40zSDrosE86o" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 bg-white/5 border border-white/10 rounded-lg hover:border-primary/50 transition-colors group cursor-pointer pointer-events-auto">
                      <span className="material-symbols-outlined text-primary text-[20px]">link</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-on-surface truncate pr-2">View Experience on LinkedIn</div>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant text-[16px] group-hover:text-primary transition-colors">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {selectedNode === 'unievent' && activeTab === 'layers' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-surface-container/30 border border-white/10 rounded-xl p-4 flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Role</span>
                    <span className="text-tertiary font-medium">UI/UX Designer Intern</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Company</span>
                    <span className="text-on-surface font-medium">UniEvent</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Type</span>
                    <span className="text-on-surface font-medium">Remote Internship</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Duration</span>
                    <span className="text-on-surface font-medium">Jun 2026 — Nov 2026</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">Focus</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-on-surface">UI/UX Design</span>
                      <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-on-surface">User Experience</span>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">Attachments</span>
                    <a href="https://www.linkedin.com/in/varunsehgal02/overlay/Position/3016751558/treasury/?profileId=ACoAAEUrSyIBXGpH3kdd2egh1Ky40zSDrosE86o" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 bg-white/5 border border-white/10 rounded-lg hover:border-tertiary/50 transition-colors group cursor-pointer pointer-events-auto">
                      <span className="material-symbols-outlined text-tertiary text-[20px]">link</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-on-surface truncate pr-2">View Experience on LinkedIn</div>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant text-[16px] group-hover:text-tertiary transition-colors">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {selectedNode === 'knaptix' && activeTab === 'layers' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-surface-container/30 border border-white/10 rounded-xl p-4 flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Role</span>
                    <span className="text-secondary font-medium">UI/UX Designer Intern</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Company</span>
                    <span className="text-on-surface font-medium">Knaptix Ventures</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Duration</span>
                    <span className="text-on-surface font-medium">Jun 2025 — Aug 2025</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">Attachments</span>
                    <a href="https://www.linkedin.com/in/varunsehgal02/overlay/Position/2682375275/treasury/?profileId=ACoAAEUrSyIBXGpH3kdd2egh1Ky40zSDrosE86o" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 bg-white/5 border border-white/10 rounded-lg hover:border-secondary/50 transition-colors group cursor-pointer pointer-events-auto">
                      <span className="material-symbols-outlined text-secondary text-[20px]">link</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-on-surface truncate pr-2">View Experience on LinkedIn</div>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant text-[16px] group-hover:text-secondary transition-colors">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeCert && activeTab === 'certificates' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-surface-container/30 border border-white/10 rounded-xl p-4 flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Title</span>
                    <span className="text-secondary font-medium">{activeCert.title}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Issuing Organization</span>
                    <span className="text-on-surface font-medium">{activeCert.issuer}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 font-bold">Issue Date</span>
                    <span className="text-on-surface font-medium">{activeCert.date}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">Attachment</span>
                    <a href={activeCert.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 bg-white/5 border border-white/10 rounded-lg hover:border-secondary/50 transition-colors group cursor-pointer pointer-events-auto">
                      <span className="material-symbols-outlined text-secondary text-[20px]">link</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-on-surface truncate pr-2">View Credential on LinkedIn</div>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant text-[16px] group-hover:text-secondary transition-colors">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>
        </aside>
      </div>

    </div>
  );
}

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Varun_Sehgal_Portfolio.fig - Experience Timeline" },
      { name: "description", content: "Career trajectory and professional experience timeline presented in a Figma-style canvas." },
      { property: "og:title", content: "Varun_Sehgal_Portfolio.fig - Experience Timeline" },
      { property: "og:description", content: "Career trajectory and professional experience timeline presented in a Figma-style canvas." },
    ],
  }),
  component: Experience,
});
