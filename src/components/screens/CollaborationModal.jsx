import React, { useState } from 'react';
import { Artboard } from './Artboard';
import { Mail, Globe, Briefcase, CheckCircle2, Loader2 } from 'lucide-react';

export function CollaborationModal({ x, y }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
     e.preventDefault();
     if (isSuccess) return;
     setIsSubmitting(true);
     setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
     }, 1500);
  };

  return (
    <Artboard id="contact" x={x} y={y} width={700} height={500} title="Invite to Collaborate (Contact)">
      <div className="w-full h-full flex items-center justify-center bg-[#050505]">
        
        <div className="w-[500px] glass-panel p-8 shadow-[0_0_80px_rgba(127,208,255,0.05)] border-[#3c3c3c]">
           <h3 className="text-xl font-bold text-white mb-2">Invite to Workspace</h3>
           <p className="text-white/50 text-sm mb-6">Send an invitation to collaborate on a project.</p>
           
           <div className="space-y-4 mb-8">
              <div>
                 <label htmlFor="invite-email" className="text-[10px] text-white/40 uppercase font-jetbrains mb-2 block">Email Address</label>
                 <input 
                   id="invite-email"
                   type="email" 
                   placeholder="hello@example.com"
                   className="w-full bg-[#121212] border border-[#3c3c3c] rounded-lg p-3 text-white focus:outline-none focus:border-[#7fd0ff] focus:ring-1 focus:ring-[#7fd0ff] transition-all font-inter"
                 />
              </div>
              <div>
                 <label htmlFor="invite-message" className="text-[10px] text-white/40 uppercase font-jetbrains mb-2 block">Message (Optional)</label>
                 <textarea 
                   id="invite-message"
                   rows={3}
                   placeholder="Hey, let's build something..."
                   className="w-full bg-[#121212] border border-[#3c3c3c] rounded-lg p-3 text-white focus:outline-none focus:border-[#7fd0ff] focus:ring-1 focus:ring-[#7fd0ff] transition-all resize-none font-inter"
                 />
              </div>
           </div>

           <div className="flex justify-between items-center pt-6 border-t border-[#3c3c3c]">
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer text-white/60 hover:text-white transition-colors"><Globe size={16}/></div>
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer text-white/60 hover:text-white transition-colors"><Briefcase size={16}/></div>
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer text-white/60 hover:text-white transition-colors"><Mail size={16}/></div>
              </div>
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting || isSuccess}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${isSuccess ? 'bg-green-500 text-white' : 'bg-[#7fd0ff] text-black hover:bg-[#68aade]'}`}
              >
                 {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                 {isSuccess && <CheckCircle2 size={16} />}
                 {isSubmitting ? 'Sending...' : isSuccess ? 'Invite Sent' : 'Send Invite'}
              </button>
           </div>
        </div>

      </div>
    </Artboard>
  );
}
