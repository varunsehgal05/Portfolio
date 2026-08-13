import React from 'react';
import { Artboard } from './Artboard';
import { useStore } from '../../store';
import { bespokePages } from '../../gridConfig';

export function SkillArsenalScreen({ x, y }) {
  const setTargetTransform = useStore(state => state.setTargetTransform);
  const setSelectedNode = useStore(state => state.setSelectedNode);

  const jumpToProject = () => {
     const targetPage = bespokePages.find(p => p.id === 'projects_overview');
     if (targetPage) {
        setSelectedNode(targetPage.id);
        setTargetTransform({
           x: -targetPage.x * 0.8 + window.innerWidth/2 - (targetPage.width || 1000) * 0.4,
           y: -targetPage.y * 0.8 + window.innerHeight/2 - (targetPage.height || 800) * 0.4,
           zoom: 0.8
        });
     }
  };

  const skillCategories = [
    {
      title: 'UI/UX Design',
      skills: ['Wireframing', 'Rapid Prototyping', 'User Research', 'Usability Testing', 'User Flows', 'Interaction Design', 'Design Systems', 'Information Architecture', 'Responsive Design']
    },
    {
      title: 'Design Tools',
      skills: ['Figma', 'Figma AI', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator']
    },
    {
      title: 'AI-Augmented Design',
      skills: ['Uizard', 'Galileo AI', 'Visily', 'Figma Magician Plugin', 'Figma Automator Plugin', 'ChatGPT / Claude (UX Writing & Research Synthesis)']
    }
  ];

  return (
    <Artboard id="skill_arsenal" x={x} y={y} width={1100} height={900} title="Skill Arsenal">
      <div className="w-full h-full bg-[#0a0a0a] p-12 text-white font-inter flex flex-col overflow-y-auto">
         <h2 className="text-3xl font-bold mb-8 text-[#ffb5a1]">Design Toolkit</h2>
         <div className="flex gap-8 flex-1">
            {skillCategories.map((category, idx) => (
               <div key={idx} className="flex-1">
                  <h3 className="text-lg font-semibold mb-4 text-white/80 uppercase tracking-widest font-jetbrains">{category.title}</h3>
                  <div className="space-y-2">
                     {category.skills.map((skill, i) => (
                        <div key={i} onClick={jumpToProject} className="bg-[#151515] hover:bg-[#1a1a1a] transition-all duration-300 border border-[#262626] rounded-xl px-4 py-3 text-center cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(255,181,161,0.1)] transform hover:-translate-y-1 hover:border-[#ffb5a1]/30">
                           <span className="text-white font-medium text-sm">{skill}</span>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
    </Artboard>
  );
}