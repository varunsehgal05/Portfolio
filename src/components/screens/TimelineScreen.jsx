import React from 'react';
import { Artboard } from './Artboard';

export function TimelineScreen({ x, y }) {
  return (
    <Artboard id="trajectory" x={x} y={y} width={736} height={600} title="Experience Timeline">
      <div className="w-full h-full bg-[#121414] p-12 border border-[#5B4039]/20 shadow-2xl relative overflow-y-auto">
         <h1 className="text-[48px] font-semibold leading-[57.6px] tracking-[-0.96px] text-[#e2e2e2] mb-12" style={{ fontFamily: 'Geist, sans-serif' }}>
            Career Trajectory
         </h1>

         <div className="pl-8 border-l border-white/10 space-y-12 pb-12">

            {/* Job 1 - Freelance */}
            <div className="relative">
               <div className="absolute top-2 -left-[38px] w-3 h-3 rounded-full bg-[#ffb5a1] ring-4 ring-[#121414]"></div>
               <div className="font-jetbrains text-[14px] font-medium tracking-[0.7px] text-[#ffb5a1] mb-1">Jan 2024 — Present</div>
               <h3 className="text-[24px] font-medium leading-[33.6px] text-[#e2e2e2] mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>Freelance UI/UX Designer</h3>
               <p className="font-inter text-[16px] leading-[25.6px] max-w-lg text-[#e4beb4]">
                  Executed 10+ end-to-end UI/UX design projects for tech startups, maintaining a 95% client retention rate. Redesigned product interfaces for 4 early-stage companies using AI-assisted prototyping tools (Uizard, Galileo AI).
               </p>
               <div className="flex gap-2 mt-4">
                  <span className="px-2 py-1 bg-[#333535]/50 rounded-[2px] font-jetbrains text-[12px] font-medium tracking-[0.6px] text-[#7fd0ff]">Figma</span>
                  <span className="px-2 py-1 bg-[#333535]/50 rounded-[2px] font-jetbrains text-[12px] font-medium tracking-[0.6px] text-[#7fd0ff]">Uizard</span>
                  <span className="px-2 py-1 bg-[#333535]/50 rounded-[2px] font-jetbrains text-[12px] font-medium tracking-[0.6px] text-[#7fd0ff]">Galileo AI</span>
               </div>
            </div>

            {/* Job 2 - Internship */}
            <div className="relative">
               <div className="absolute top-2 -left-[38px] w-3 h-3 rounded-full bg-[#d8b9ff] ring-4 ring-[#121414]"></div>
               <div className="font-jetbrains text-[14px] font-medium tracking-[0.7px] text-[#d8b9ff] mb-1">Jun 2025 — Aug 2025</div>
               <h3 className="text-[24px] font-medium leading-[33.6px] text-[#e2e2e2] mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>UI/UX Designer Intern @ Knaptix Ventures</h3>
               <p className="font-inter text-[16px] leading-[25.6px] max-w-lg text-[#e4beb4]">
                  Conceptualized 5+ high-fidelity UI/UX interfaces for web/mobile, achieving a 40% increase in user satisfaction scores. Accelerated wireframe-to-prototype turnaround using AI-assisted Figma plugins, cutting early-stage design time by 45%.
               </p>
               <div className="flex gap-2 mt-4">
                  <span className="px-2 py-1 bg-[#333535]/50 rounded-[2px] font-jetbrains text-[12px] font-medium tracking-[0.6px] text-[#7fd0ff]">Figma</span>
                  <span className="px-2 py-1 bg-[#333535]/50 rounded-[2px] font-jetbrains text-[12px] font-medium tracking-[0.6px] text-[#7fd0ff]">Magician</span>
                  <span className="px-2 py-1 bg-[#333535]/50 rounded-[2px] font-jetbrains text-[12px] font-medium tracking-[0.6px] text-[#7fd0ff]">Automator</span>
               </div>
            </div>

            {/* Hackathon */}
            <div className="relative">
               <div className="absolute top-2 -left-[38px] w-3 h-3 rounded-full bg-[#e4beb4] ring-4 ring-[#121414]"></div>
               <div className="font-jetbrains text-[14px] font-medium tracking-[0.7px] text-[#e4beb4] mb-1">Apr 2026</div>
               <h3 className="text-[24px] font-medium leading-[33.6px] text-[#e2e2e2] mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>Co-Organizer & Lead Designer — CodeSrijan Hackathon</h3>
               <p className="font-inter text-[16px] leading-[25.6px] max-w-lg text-[#e4beb4]">
                  Led UX design and event experience planning for a 72-hour hackathon with 200+ participants. Boosted event registrations by 20% year-over-year through improved digital user experience.
               </p>
            </div>

         </div>
      </div>
    </Artboard>
  );
}