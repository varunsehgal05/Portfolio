import React from 'react';
import { Artboard } from '../Artboard';

export function FormTemplate({ id, x, y, title }) {
  return (
    <Artboard id={id} x={x} y={y} width={800} height={900} title={title}>
      <div className="w-full h-full bg-[#0e0e0e] p-16 text-white font-inter overflow-y-auto">
         <h1 className="text-4xl font-bold mb-4">{title}</h1>
         <p className="text-white/40 mb-12">Configure application preferences and security settings.</p>
         
         <div className="space-y-12">
            <section>
               <h2 className="text-lg font-semibold border-b border-white/10 pb-4 mb-6">Profile Settings</h2>
               <div className="space-y-6">
                  <div>
                     <label className="text-xs text-white/40 uppercase font-jetbrains mb-2 block">Username</label>
                     <input type="text" value="admin_user" readOnly className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none" />
                  </div>
                  <div>
                     <label className="text-xs text-white/40 uppercase font-jetbrains mb-2 block">Email Address</label>
                     <input type="email" value="admin@aether.io" readOnly className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none" />
                  </div>
               </div>
            </section>

            <section>
               <h2 className="text-lg font-semibold border-b border-white/10 pb-4 mb-6">Security (Toggles)</h2>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                     <div>
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-white/40">Require 2FA for all logins.</div>
                     </div>
                     <div className="w-12 h-6 rounded-full bg-primary relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full"></div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                     <div>
                        <div className="font-medium">API Access</div>
                        <div className="text-sm text-white/40">Allow external integrations.</div>
                     </div>
                     <div className="w-12 h-6 rounded-full bg-white/10 relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full"></div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </div>
    </Artboard>
  );
}
