import React from 'react';
import { Artboard } from './Artboard';

export function AboutMeScreen({ x, y }) {
  return (
    <Artboard id="about" x={x} y={y} width={1200} height={800} title="About Me">
      <div className="w-full h-full bg-[#121414] p-16 text-white flex flex-col justify-between font-inter">
        <div>
          <h2 className="text-6xl font-bold tracking-tight mb-8">Varun Sehgal</h2>
          <p className="text-2xl text-white/70 leading-relaxed max-w-3xl mb-16">
            UI/UX Designer with 3+ years of experience delivering high-impact SaaS and AI product design. Skilled in user research, wireframing, rapid prototyping, and design systems, with proven results including a 45% increase in user engagement and a 30% reduction in drop-off rates. Uses AI-augmented design tools to accelerate research synthesis, wireframing, and prototyping without compromising design quality.
          </p>
        </div>

        <div className="flex gap-12">
          <div className="flex-1 bg-[#1a1c1c]/80 p-8 rounded-2xl border border-[#5B4039]/20 shadow-2xl backdrop-blur-[20px]">
            <h3 className="text-xl font-bold text-[#ffb5a1] mb-6">UI/UX Designer Intern @ Knaptix Ventures Private Limited (Jun 2025 - Aug 2025)</h3>
            <ul className="list-disc list-inside space-y-4 text-white/60 text-lg">
              <li>Conceptualized 5+ high-fidelity UI/UX interfaces for web/mobile, achieving a 40% increase in user satisfaction scores during testing phases.</li>
              <li>Accelerated wireframe-to-prototype turnaround by leveraging AI-assisted Figma plugins (Magician, Automator), cutting early-stage design time by 45%.</li>
              <li>Facilitated design-to-engineering hand-offs, reducing implementation friction and technical errors by 15%.</li>
            </ul>
          </div>

          <div className="flex-1 bg-[#1a1c1c]/80 p-8 rounded-2xl border border-[#5B4039]/20 shadow-2xl backdrop-blur-[20px]">
            <h3 className="text-xl font-bold text-[#7fd0ff] mb-6">Freelance UI/UX Designer (Jan 2024 - Present)</h3>
            <ul className="list-disc list-inside space-y-4 text-white/60 text-lg">
              <li>Executed 10+ end-to-end UI/UX design projects for tech startups, maintaining a 95% client retention rate through iterative, human-centered delivery.</li>
              <li>Redesigned product interfaces for 4 early-stage companies using AI-assisted prototyping tools (Uizard, Galileo AI) to speed up concept iteration and improve usability.</li>
            </ul>
          </div>
        </div>
      </div>
    </Artboard>
  );
}