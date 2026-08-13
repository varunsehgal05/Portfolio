import React from 'react';
import { Artboard } from './Artboard';
import { useStore } from '../../store';
import { bespokePages } from '../../gridConfig';

export function HeroScreen({ x, y }) {
  const setTargetTransform = useStore(state => state.setTargetTransform);
  const setSelectedNode = useStore(state => state.setSelectedNode);

  const handleLaunch = () => {
     const page = bespokePages.find(p => p.id === 'recent_activity');
     if (page) {
        setSelectedNode(page.id);
        setTargetTransform({
           x: -page.x * 0.8 + window.innerWidth/2 - (page.width || 1100) * 0.4,
           y: -page.y * 0.8 + window.innerHeight/2 - (page.height || 900) * 0.4,
           zoom: 0.8
        });
     }
  };

  return (
    <Artboard id="hero" x={x} y={y} width={1100} height={700} title="Home / Hero">
      <div className="w-full h-full flex flex-col items-center justify-center font-inter text-white p-12">
         <div className="text-sm text-[#7fd0ff] mb-4 opacity-70 font-jetbrains">Varun Sehgal — Portfolio</div>
         <h1 className="text-6xl font-bold tracking-tighter mb-4 text-center text-white/90">
            UI/UX Designer
         </h1>
         <p className="text-xl text-white/60 mb-2">Product Designer · AI-Augmented Design</p>
         <p className="text-white/40 text-sm mb-12">Gwalior, Madhya Pradesh, India</p>

         <div className="flex gap-6 mb-12">
            <div className="text-center">
               <div className="text-3xl font-bold text-[#ffb5a1]">3+</div>
               <div className="text-xs text-white/40 uppercase tracking-widest">Years Experience</div>
            </div>
            <div className="w-px bg-white/10"></div>
            <div className="text-center">
               <div className="text-3xl font-bold text-[#ffb5a1]">10+</div>
               <div className="text-xs text-white/40 uppercase tracking-widest">Projects</div>
            </div>
            <div className="w-px bg-white/10"></div>
            <div className="text-center">
               <div className="text-3xl font-bold text-[#ffb5a1]">95%</div>
               <div className="text-xs text-white/40 uppercase tracking-widest">Client Retention</div>
            </div>
         </div>

         <button onClick={handleLaunch} className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Explore Workspace
         </button>

         <div className="flex gap-6 mt-8 text-sm text-white/40">
            <span>varun.sehgal02@gmail.com</span>
            <span>·</span>
            <span>+91-9399361193</span>
         </div>
      </div>
    </Artboard>
  );
}