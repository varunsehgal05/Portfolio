import React from 'react';
import { Artboard } from './Artboard';

export function EducationScreen({ x, y }) {
  return (
    <Artboard id="education" x={x} y={y} width={800} height={600} title="Education">
      <div className="w-full h-full bg-[#121414]/80 p-12 text-white font-inter backdrop-blur-[20px] border border-[#ffb5a1]/30 rounded-2xl shadow-[0_0_80px_rgba(255,181,161,0.05)]">
         <h1 className="text-4xl font-bold tracking-tight mb-12 border-b border-white/10 pb-6 text-[#ffb5a1]">Education.</h1>

         <div className="mb-8">
            <h3 className="text-3xl font-bold mb-2">B.Tech in Computer Science and Engineering</h3>
            <div className="flex gap-4 text-lg text-white/60 font-jetbrains">
               <span>Jaypee University Of Engineering And Technology</span>
               <span>&mdash;</span>
               <span>Guna, India</span>
               <span>&mdash;</span>
               <span className="text-[#ffb5a1]">Aug 2023 — May 2027</span>
            </div>
         </div>

         <div className="flex gap-12">
            <div className="flex-1">
               <h4 className="text-sm uppercase tracking-widest text-white/40 mb-4 font-jetbrains">Key Areas</h4>
               <div className="flex flex-wrap gap-2">
                  {['Human-Computer Interaction', 'Software Engineering', 'UX Research'].map(tag => (
                     <span key={tag} className="px-3 py-1.5 bg-white/5 rounded border border-white/10 text-sm">
                        {tag}
                     </span>
                  ))}
               </div>
            </div>

            <div className="flex-1">
               <h4 className="text-sm uppercase tracking-widest text-white/40 mb-4 font-jetbrains">Leadership</h4>
               <div className="bg-[#1a1c1c] p-4 rounded-lg border border-white/5 text-white/80">
                  Co-Organizer & Lead Designer — CodeSrijan Hackathon
               </div>
            </div>
         </div>

      </div>
    </Artboard>
  );
}