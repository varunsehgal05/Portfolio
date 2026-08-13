import React from 'react';
import { Artboard } from './Artboard';
import { Search, ChevronDown, Plus, Clock, File, Compass, Users, LayoutGrid, List, PenTool, Smartphone, Layers } from 'lucide-react';
import { useStore } from '../../store';

export function FileBrowserScreen({ x, y, standalone = false }) {
  const setAppPhase = useStore(state => state.setAppPhase);

  const content = (
    <div className={`w-full h-full bg-[#0e0e0e] text-white flex font-inter overflow-hidden ${standalone ? '' : 'rounded-2xl'}`}>
        
        {/* Sidebar */}
        <div className="w-[260px] h-full bg-[#161616] border-r border-white/5 flex flex-col flex-shrink-0 z-10 p-4">
          
          {/* Top Profile */}
          <div className="flex items-center p-2 hover:bg-white/5 rounded-lg cursor-pointer group mb-6 transition-colors">
            <div className="w-6 h-6 rounded bg-[#ffb5a1]/20 text-[#ffb5a1] flex items-center justify-center mr-3 text-xs font-bold font-jetbrains">
              V
            </div>
            <div className="flex-1 truncate text-sm font-medium">Varun Sehgal</div>
            <ChevronDown size={16} className="text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffb5a1]/50"
            />
          </div>

          {/* Nav Links */}
          <div className="space-y-1 flex-1">
            <div className="flex items-center px-2 py-1.5 bg-white/10 rounded-lg text-sm text-white cursor-pointer group">
              <Clock size={18} className="mr-3 text-white/70" />
              <span className="flex-1">Recent</span>
            </div>
            <div className="flex items-center px-2 py-1.5 hover:bg-white/5 rounded-lg text-sm text-white/70 cursor-pointer group transition-colors">
              <File size={18} className="mr-3" />
              <span className="flex-1">Drafts</span>
            </div>
            
            <div className="my-4 border-t border-white/5 pt-4"></div>
            
            <div className="flex items-center px-2 py-1.5 hover:bg-white/5 rounded-lg text-sm text-white/70 cursor-pointer group transition-colors">
              <Compass size={18} className="mr-3" />
              <span className="flex-1">Explore Community</span>
            </div>

            <div className="my-4 border-t border-white/5 pt-4"></div>

            <div className="flex items-center px-2 py-1.5 text-xs font-bold text-white/40 uppercase tracking-wider mb-2 group">
               <span className="flex-1">Teams</span>
               <Plus size={14} className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white" />
            </div>
            <div className="flex items-center px-2 py-1.5 hover:bg-white/5 rounded-lg text-sm text-white/70 cursor-pointer group transition-colors">
              <Users size={18} className="mr-3" />
              <span className="flex-1">Aether Studios</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 flex flex-col bg-[#121414] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-semibold text-white/90">Recent Files</h1>
            <div className="flex items-center gap-2 text-white/40">
              <div className="p-1.5 hover:bg-white/10 rounded-md cursor-pointer"><LayoutGrid size={18}/></div>
              <div className="p-1.5 hover:bg-white/10 rounded-md cursor-pointer"><List size={18}/></div>
              <div className="w-px h-4 bg-white/10 mx-2"></div>
              <div className="p-1.5 hover:bg-white/10 rounded-md cursor-pointer"><Plus size={18}/></div>
            </div>
          </div>

          {/* File Grid */}
          <div className="grid grid-cols-2 gap-6">
            
            {/* File 1 - The Portfolio File */}
            <div className="group cursor-pointer" onDoubleClick={() => standalone && setAppPhase('workspace')}>
              <div className="aspect-[4/3] bg-[#1a1c1c] rounded-xl border border-white/5 group-hover:border-[#ffb5a1]/50 transition-colors mb-3 flex items-center justify-center">
                 <PenTool size={48} className="text-[#7fd0ff]/20 group-hover:text-[#7fd0ff]/40 transition-colors" />
              </div>
              <div className="flex items-start gap-3 px-1">
                <PenTool size={20} className="text-[#7fd0ff] flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white/90 truncate group-hover:text-[#ffb5a1] transition-colors">Varun_Sehgal_Portfolio.fig</div>
                  <div className="text-xs text-white/40 truncate mt-0.5">Edited 12m ago • you</div>
                </div>
              </div>
            </div>

            {/* File 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-[#1a1c1c] rounded-xl border border-white/5 group-hover:border-white/20 transition-colors mb-3 flex items-center justify-center">
                 <Smartphone size={48} className="text-[#d8b9ff]/20 group-hover:text-[#d8b9ff]/40 transition-colors" />
              </div>
              <div className="flex items-start gap-3 px-1">
                <Smartphone size={20} className="text-[#d8b9ff] flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white/90 truncate group-hover:text-[#ffb5a1] transition-colors">Expense_App_Case_Study.fig</div>
                  <div className="text-xs text-white/40 truncate mt-0.5">Edited 2h ago • Aether Team</div>
                </div>
              </div>
            </div>

            {/* File 3 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-[#1a1c1c] rounded-xl border border-white/5 group-hover:border-white/20 transition-colors mb-3 flex items-center justify-center">
                 <Layers size={48} className="text-[#ffb5a1]/20 group-hover:text-[#ffb5a1]/40 transition-colors" />
              </div>
              <div className="flex items-start gap-3 px-1">
                <Layers size={20} className="text-[#ffb5a1] flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white/90 truncate group-hover:text-[#ffb5a1] transition-colors">Global_Design_System.fig</div>
                  <div className="text-xs text-white/40 truncate mt-0.5">Edited yesterday • you</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
  );

  if (standalone) return <div className="absolute inset-0 z-40 bg-[#0e0e0e]">{content}</div>;

  return (
    <Artboard id="file_browser" x={x} y={y} width={1000} height={800} title="Portfolio File Browser">
      {content}
    </Artboard>
  );
}
