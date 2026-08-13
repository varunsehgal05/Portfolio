import React from 'react';
import { Artboard } from './Artboard';
import { Lightbulb, Network, View, Component, Star, ShoppingCart, Tv } from 'lucide-react';

export function CaseStudyScreen({ x, y }) {
  return (
    <Artboard id="projects_overview" x={x} y={y} width={1400} height={900} title="Case Study: Expense App">
      <div className="w-full h-full bg-[#121414] text-white p-16 overflow-y-auto relative font-inter flex gap-12">
        
        {/* Left Column: Problem & Flow */}
        <div className="flex-1 space-y-16">
           <header>
             <h1 className="text-[64px] font-bold mb-2 text-[#e2e2e2] tracking-tighter" style={{ fontFamily: 'Geist, sans-serif' }}>Expense App</h1>
             <span className="text-[#d8b9ff] font-jetbrains text-sm tracking-wider uppercase">/ Case Study</span>
           </header>

           <section>
             <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="text-[#7fd0ff]" size={28} />
                <h2 className="text-3xl font-bold text-[#e2e2e2]">Problem</h2>
             </div>
             <p className="text-[#a0a0a0] text-lg mb-4 max-w-lg leading-relaxed">Users find tracking daily expenses tedious and often abandon budgeting tools due to manual entry friction.</p>
             <p className="text-[#a0a0a0] text-lg max-w-lg leading-relaxed">Lack of visual clarity in spending categories makes it hard to identify areas for saving.</p>
           </section>

           <section>
             <div className="flex items-center gap-3 mb-6">
                <Network className="text-[#d8b9ff]" size={28} />
                <h2 className="text-3xl font-bold text-[#e2e2e2]">User Flow</h2>
             </div>
             <div className="flex gap-4 items-center flex-wrap">
                <div className="bg-[#1a1c1c] px-6 py-4 rounded-full border border-[#d8b9ff]/30 text-[#d8b9ff] font-jetbrains text-sm">Launch App</div>
                <div className="w-4 border-t border-white/20"></div>
                <div className="bg-[#1a1c1c] px-6 py-4 rounded-full border border-white/10 font-jetbrains text-sm">Dashboard Overview</div>
                <div className="w-4 border-t border-white/20"></div>
                <div className="bg-[#1a1c1c] px-4 py-3 rounded border border-white/10 font-jetbrains text-sm">Add Expense</div>
                <div className="w-4 border-t border-white/20"></div>
                <div className="bg-[#1a1c1c] px-4 py-3 rounded border border-white/10 font-jetbrains text-sm">View Insights</div>
             </div>
           </section>
        </div>

        {/* Middle Column: Wireframes & Components */}
        <div className="flex-1 space-y-16 mt-32">
           <section>
             <div className="flex items-center gap-3 mb-6">
                <View className="text-[#ffb5a1]" size={28} />
                <h2 className="text-3xl font-bold text-[#e2e2e2]">Wireframes</h2>
             </div>
             <div className="w-full h-48 bg-[#1a1c1c] border border-white/5 rounded-2xl shadow-xl flex items-center justify-center text-white/10">
                <span className="font-jetbrains">wireframe_render.png</span>
             </div>
           </section>

           <section>
             <div className="flex items-center gap-3 mb-6">
                <Component className="text-[#ffb5a1]/70" size={28} />
                <h2 className="text-3xl font-bold text-[#e2e2e2]">Components</h2>
             </div>
             <div className="space-y-8">
                <div>
                  <span className="font-jetbrains text-xs text-white/40 block mb-4 uppercase tracking-widest">Buttons</span>
                  <div className="flex gap-4">
                     <button className="bg-[#ffb5a1] text-black px-6 py-3 rounded-lg font-jetbrains text-sm font-bold w-max hover:opacity-80 transition-opacity">Primary Action</button>
                     <button className="border border-white/20 px-6 py-3 rounded-lg text-[#ffb5a1] font-jetbrains text-sm w-max bg-transparent hover:bg-white/5 transition-colors">Secondary Action</button>
                  </div>
                </div>
                <div>
                  <span className="font-jetbrains text-xs text-white/40 block mb-4 uppercase tracking-widest">Inputs</span>
                  <div className="flex items-center bg-[#1a1c1c] border border-white/10 rounded-lg p-3 w-64">
                     <span className="text-white/40 mr-2 font-jetbrains">$</span>
                     <div className="flex-1 h-4 bg-white/5 rounded"></div>
                  </div>
                </div>
             </div>
           </section>
        </div>

        {/* Right Column: Final UI */}
        <div className="w-[360px] space-y-16 shrink-0 mt-32">
           <section>
             <div className="flex items-center gap-3 mb-6">
                <Star className="text-[#7fd0ff]" size={28} />
                <h2 className="text-3xl font-bold text-[#e2e2e2]">Final UI</h2>
             </div>
             <div className="bg-[#161616]/80 rounded-[32px] border border-white/10 p-8 shadow-[0_32px_64px_rgba(0,0,0,0.4)] relative overflow-hidden backdrop-blur-2xl">
                <div className="mb-10">
                   <div className="text-white/40 font-jetbrains text-xs mb-2 tracking-widest uppercase">Total Balance</div>
                   <div className="text-4xl font-bold text-[#e2e2e2]">$12,450.00</div>
                </div>
                <div>
                   <h4 className="font-bold text-sm mb-6 text-white/80">Recent Transactions</h4>
                   <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg"><ShoppingCart size={18} className="text-[#7fd0ff]"/></div>
                            <div>
                               <div className="font-bold text-sm text-[#e2e2e2]">Groceries</div>
                               <div className="font-jetbrains text-[10px] text-white/40 mt-1">Today, 10:45 AM</div>
                            </div>
                         </div>
                         <div className="font-jetbrains text-sm text-[#ffb5a1]">-$84.20</div>
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg"><Tv size={18} className="text-[#d8b9ff]"/></div>
                            <div>
                               <div className="font-bold text-sm text-[#e2e2e2]">Design Software</div>
                               <div className="font-jetbrains text-[10px] text-white/40 mt-1">Yesterday</div>
                            </div>
                         </div>
                         <div className="font-jetbrains text-sm text-[#ffb5a1]">-$49.99</div>
                      </div>
                   </div>
                </div>
             </div>
           </section>
        </div>

        {/* Floating Annotations */}
        <div className="absolute left-[380px] top-[340px] bg-[#d8b9ff]/10 border border-[#d8b9ff]/30 p-4 rounded-xl font-jetbrains text-xs text-[#d8b9ff] max-w-[220px] backdrop-blur-md shadow-2xl rotate-[-3deg] z-20">
           Note: Validate these pain points with qualitative user interviews.
        </div>
        <div className="absolute right-[420px] top-[320px] bg-[#7fd0ff]/10 border border-[#7fd0ff]/30 p-4 rounded-xl font-jetbrains text-xs text-[#7fd0ff] max-w-[220px] backdrop-blur-md shadow-2xl rotate-[2deg] z-20">
           Glassmorphism applied to card to give depth without heavy shadows.
        </div>
      </div>
    </Artboard>
  );
}
