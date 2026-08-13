import React from 'react';
import { Artboard } from '../Artboard';
import { BarChart3, Users, ArrowUpRight, Activity } from 'lucide-react';

export function DashboardTemplate({ id, x, y, title }) {
  return (
    <Artboard id={id} x={x} y={y} width={1200} height={800} title={title}>
      <div className="w-full h-full bg-[#0a0a0a] flex text-white font-inter">
         {/* Sidebar */}
         <div className="w-64 border-r border-white/5 bg-white/[0.02] p-6 flex flex-col gap-4">
            <div className="h-8 w-32 bg-white/10 rounded-md mb-8"></div>
            <div className="h-4 w-full bg-white/5 rounded"></div>
            <div className="h-4 w-5/6 bg-white/5 rounded"></div>
            <div className="h-4 w-4/6 bg-white/5 rounded"></div>
            <div className="mt-auto h-12 w-full bg-white/5 rounded-xl"></div>
         </div>
         {/* Main Content */}
         <div className="flex-1 p-10">
            <h1 className="text-3xl font-bold mb-8 text-white/90">{title}</h1>
            {/* Stats Row */}
            <div className="flex gap-6 mb-10">
               <div className="flex-1 p-6 rounded-2xl bg-surface-variant border border-white/5">
                  <Activity className="text-tertiary mb-4" size={24}/>
                  <div className="text-3xl font-jetbrains mb-1">24,592</div>
                  <div className="text-sm text-white/40 uppercase">Total Sessions</div>
               </div>
               <div className="flex-1 p-6 rounded-2xl bg-surface-variant border border-white/5">
                  <Users className="text-primary mb-4" size={24}/>
                  <div className="text-3xl font-jetbrains mb-1">8,401</div>
                  <div className="text-sm text-white/40 uppercase">Active Users</div>
               </div>
               <div className="flex-1 p-6 rounded-2xl bg-surface-variant border border-white/5">
                  <ArrowUpRight className="text-green-400 mb-4" size={24}/>
                  <div className="text-3xl font-jetbrains mb-1">+12.4%</div>
                  <div className="text-sm text-white/40 uppercase">Growth Rate</div>
               </div>
            </div>
            {/* Data Chart Area */}
            <div className="w-full h-64 rounded-2xl bg-surface-variant border border-white/5 p-6 flex flex-col justify-end gap-2 items-end relative overflow-hidden">
               <div className="w-full border-b border-white/5 border-dashed absolute left-0 top-1/2"></div>
               <div className="flex gap-4 w-full items-end h-full px-8 relative z-10">
                  <div className="w-12 bg-tertiary/20 h-[40%] rounded-t-sm"></div>
                  <div className="w-12 bg-tertiary/40 h-[60%] rounded-t-sm"></div>
                  <div className="w-12 bg-tertiary/60 h-[30%] rounded-t-sm"></div>
                  <div className="w-12 bg-tertiary/80 h-[90%] rounded-t-sm shadow-[0_0_24px_rgba(127,208,255,0.4)]"></div>
                  <div className="w-12 bg-tertiary/40 h-[50%] rounded-t-sm"></div>
               </div>
            </div>
         </div>
      </div>
    </Artboard>
  );
}
