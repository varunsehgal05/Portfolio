import React from 'react';
import { Artboard } from './Artboard';

export function ProjectsOverviewScreen({ x, y }) {
  const projects = [
    {
      title: 'AI Interview & Preparation Platform',
      category: 'SaaS',
      desc: 'Architected an AI-driven SaaS platform with Security and Grading modules. Streamlined dense analytical data into a clean dark-themed UI, enhancing dashboard scannability and user task efficiency by 25%.',
      dates: 'Jan 2026 — Apr 2026',
      img: 'bg-gradient-to-br from-[#7fd0ff]/20 to-[#121414]'
    },
    {
      title: 'EventFlow: Event Ticketing SaaS',
      category: 'SaaS',
      desc: 'Spearheaded a 4-step booking flow optimization that minimized user drop-off by 30% through simplified checkout psychology. Constructed a comprehensive design system with 50+ modular components.',
      dates: 'Oct 2025 — Jan 2026',
      img: 'bg-gradient-to-br from-[#ffb5a1]/20 to-[#121414]'
    },
    {
      title: 'Expensify: Budget Tracker App',
      category: 'Mobile',
      desc: 'Refined 17+ screens for real-time analytics, reducing the average "Add Expense" transaction time to under 5 seconds.',
      dates: 'May 2025 — Aug 2025',
      img: 'bg-gradient-to-br from-[#d8b9ff]/20 to-[#121414]'
    }
  ];

  return (
    <Artboard id="recent_activity" x={x} y={y} width={1100} height={900} title="Projects Overview">
      <div className="w-full h-full bg-[#121414] p-12 text-white font-inter flex flex-col">
         <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
            <div>
               <h1 className="text-4xl font-bold tracking-tight">Featured Projects</h1>
               <p className="text-white/50 mt-2">Selected case studies from recent work</p>
            </div>
         </div>
         <div className="grid grid-cols-3 gap-6 flex-1 overflow-y-auto">
            {projects.map((p, i) => (
               <div key={i} className="bg-[#1a1c1c] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col">
                  <div className={`h-48 w-full ${p.img} relative overflow-hidden flex items-center justify-center`}>
                     <div className="w-24 h-32 border-2 border-white/10 rounded-lg absolute bg-[#121212]/50 rotate-[-5deg] shadow-lg"></div>
                     <div className="w-24 h-32 border-2 border-white/10 rounded-lg absolute bg-[#121212]/80 rotate-[10deg] shadow-lg translate-x-12"></div>

                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                        <span className="px-5 py-2.5 bg-white text-black text-xs font-bold rounded-full shadow-xl">View Project</span>
                     </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                     <div className="text-[#ffb5a1] text-[10px] font-bold uppercase tracking-widest mb-2">{p.category} · {p.dates}</div>
                     <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                     <p className="text-white/50 text-sm font-medium leading-relaxed flex-1">{p.desc}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </Artboard>
  );
}