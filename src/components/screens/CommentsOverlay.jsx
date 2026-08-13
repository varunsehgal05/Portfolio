import React, { useState } from 'react';

export function CommentsOverlay() {
  const [openId, setOpenId] = useState(null);

  const comments = [
    { id: 1, x: 200, y: -800, author: 'Recruiter', initials: 'R', color: '#ffb5a1', text: 'This design system architecture is incredible. Are you open to Lead roles?', time: '2h ago' },
    { id: 2, x: 1200, y: 3200, author: 'Lead Engineer', initials: 'LE', color: '#7fd0ff', text: 'Love the glassmorphic implementation on this mobile card.', time: '5h ago' },
    { id: 3, x: -1400, y: 1700, author: 'Design Director', initials: 'DD', color: '#d8b9ff', text: 'The spatial layout of these nodes tells a great story. Very Apple-esque.', time: '1d ago' },
  ];

  return (
    <>
      {comments.map(c => (
         <div key={c.id} className="absolute z-50 pointer-events-auto" style={{ left: c.x, top: c.y }}>
            {/* Figma-style Comment Marker */}
            <div 
              className={`w-8 h-8 rounded-full border-2 border-[#121212] flex items-center justify-center text-black cursor-pointer shadow-lg transform transition-transform hover:scale-110 ${openId === c.id ? 'scale-110 ring-4' : ''}`}
              style={{ backgroundColor: c.color, ringColor: `${c.color}40` }}
              onClick={(e) => { e.stopPropagation(); setOpenId(openId === c.id ? null : c.id); }}
            >
               <span className="font-bold text-[10px] font-jetbrains">{c.initials}</span>
               {/* Unread notification dot */}
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#121212]"></div>
            </div>

            {/* Expanded Comment Thread */}
            {openId === c.id && (
               <div className="absolute top-10 left-0 w-64 bg-[#2c2c2c]/95 backdrop-blur-xl border border-[#3c3c3c] rounded-xl shadow-[0_32px_64px_rgba(0,0,0,0.8)] p-4 font-inter text-sm text-white transform origin-top-left animate-[fadeIn_0.1s_ease-out]">
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-bold" style={{ color: c.color }}>{c.author}</span>
                     <span className="text-white/40 text-[10px] font-jetbrains">{c.time}</span>
                  </div>
                  <p className="text-white/80 leading-relaxed text-xs">{c.text}</p>
                  <div className="mt-4 pt-3 border-t border-[#3c3c3c] flex">
                     <input type="text" placeholder="Reply to thread..." className="w-full bg-transparent border-none outline-none text-white/90 placeholder-white/30 text-xs" />
                  </div>
               </div>
            )}
         </div>
      ))}
    </>
  );
}
