import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { Search, Frame } from 'lucide-react';
import { bespokePages } from '../gridConfig';

export function CommandPalette() {
  const isOpen = useStore(state => state.isCommandPaletteOpen);
  const setOpen = useStore(state => state.setCommandPaletteOpen);
  const setTargetTransform = useStore(state => state.setTargetTransform);
  const setSelectedNode = useStore(state => state.setSelectedNode);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = bespokePages.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (page) => {
    setSelectedNode(page.id);
    setTargetTransform({ 
       x: -page.x * 0.8 + window.innerWidth/2 - (page.width || 1000) * 0.4, 
       y: -page.y * 0.8 + window.innerHeight/2 - (page.height || 800) * 0.4, 
       zoom: 0.8 
    });
    setOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
       <div className="w-[600px] bg-[#1e1e1e] border border-[#3c3c3c] rounded-xl shadow-[0_32px_64px_rgba(0,0,0,0.8)] overflow-hidden font-inter transform scale-100 animate-[fadeIn_0.1s_ease-out]" onClick={e => e.stopPropagation()}>
          <div className="flex items-center px-4 h-14 border-b border-[#3c3c3c]">
             <Search size={20} className="text-[#ffb5a1] mr-3" />
             <input 
               ref={inputRef}
               className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-white/20"
               placeholder="Search for a frame, layer, or command (e.g. 'About')..."
               value={query}
               onChange={e => setQuery(e.target.value)}
             />
             <div className="flex gap-1">
                <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-jetbrains text-white/40">ESC</kbd>
             </div>
          </div>
          <div className="max-h-[400px] overflow-y-auto p-2">
             {results.map((page, i) => (
                <div 
                  key={page.id} 
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg transition-colors ${i === 0 ? 'bg-[#ffb5a1]/20 text-[#ffb5a1]' : 'hover:bg-white/5 text-white/80'}`}
                  onClick={() => handleSelect(page)}
                >
                   <Frame size={18} className={i === 0 ? 'text-[#ffb5a1]' : 'text-white/40'} />
                   <span className="font-medium">{page.title}</span>
                   <div className="flex-1"></div>
                   <kbd className="hidden group-hover:block bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-jetbrains text-white/40">↵</kbd>
                </div>
             ))}
             {results.length === 0 && (
                <div className="px-4 py-12 text-center text-white/40 flex flex-col items-center gap-2">
                   <Search size={32} className="opacity-20" />
                   No results found for "{query}"
                </div>
             )}
          </div>
       </div>
    </div>
  );
}
