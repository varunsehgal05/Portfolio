const fs = require('fs');
let content = fs.readFileSync('src/routes/index.tsx', 'utf8');

// 1. Add isPinned to floatingShapes type
content = content.replace(
  /setFloatingShapes = useState<\{id: number, x: number, y: number, color: string, text: string\}\[]> \(\[\]\);/g,
  `setFloatingShapes = useState<{id: number, x: number, y: number, color: string, text: string, isPinned?: boolean}[]>([])`
);
content = content.replace(
  /const \[floatingShapes, setFloatingShapes\] = useState<\{id: number, x: number, y: number, color: string, text: string\}\[]> \(\[\]\);/g,
  `const [floatingShapes, setFloatingShapes] = useState<{id: number, x: number, y: number, color: string, text: string, isPinned?: boolean}[]>([])`
);
content = content.replace(
  /useState<\{id: number, x: number, y: number, color: string, text: string\}\[]> \(\[\]\)/g,
  `useState<{id: number, x: number, y: number, color: string, text: string, isPinned?: boolean}[]>([])`
);
content = content.replace(
  /useState<\{id: number, x: number, y: number, color: string, text: string\}\[]>(\[\])/g,
  `useState<{id: number, x: number, y: number, color: string, text: string, isPinned?: boolean}[]>([])`
);

// Actually, I can just replace `text: string}` with `text: string, isPinned: boolean}`
content = content.replace(/text: string\}\[]>/g, 'text: string, isPinned: boolean}[]>');

// 2. Add isPinned to the addStickyNote function
content = content.replace(
  /text: randomText\n    }\]/g,
  `text: randomText,\n      isPinned: false\n    }]`
);

// 3. Update the handleNotePointerDown function to prevent dragging if pinned
const oldPointerDown = `  const handleNotePointerDown = (e: React.PointerEvent, id: number) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDraggingNoteId(id);
  };`;

const newPointerDown = `  const handleNotePointerDown = (e: React.PointerEvent, id: number, isPinned: boolean) => {
    e.stopPropagation();
    if (isPinned) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDraggingNoteId(id);
  };
  
  const togglePin = (id: number) => {
    setFloatingShapes(prev => prev.map(s => s.id === id ? { ...s, isPinned: !s.isPinned } : s));
  };`;

content = content.replace(oldPointerDown, newPointerDown);

// 4. Update the sticky note JSX to handle pinning
const oldJsx = `              <div 
                key={shape.id} 
                className={\`absolute w-48 h-48 rounded shadow-2xl p-4 flex flex-col cursor-move \${shape.color} hover:scale-105 transition-transform shadow-black/50\`} 
                style={{ top: shape.y, left: shape.x, zIndex: draggingNoteId === shape.id ? 100 : 50 }}
                onPointerDown={(e) => handleNotePointerDown(e, shape.id)}
                onPointerMove={(e) => handleNotePointerMove(e, shape.id)}
                onPointerUp={handleNotePointerUp}
              >
                <div className="w-full flex justify-between items-center border-b border-black/10 pb-2 mb-2 cursor-move pointer-events-none">
                  <span className="text-xs font-bold opacity-50 uppercase tracking-widest">Note</span>
                  <span className="material-symbols-outlined text-[14px] opacity-50">push_pin</span>
                </div>`;

const newJsx = `              <div 
                key={shape.id} 
                className={\`absolute w-48 h-48 rounded shadow-2xl p-4 flex flex-col \${shape.isPinned ? 'cursor-default' : 'cursor-move hover:scale-105'} \${shape.color} transition-transform shadow-black/50\`} 
                style={{ top: shape.y, left: shape.x, zIndex: draggingNoteId === shape.id ? 100 : 50 }}
                onPointerDown={(e) => handleNotePointerDown(e, shape.id, shape.isPinned)}
                onPointerMove={(e) => handleNotePointerMove(e, shape.id)}
                onPointerUp={handleNotePointerUp}
              >
                <div className="w-full flex justify-between items-center border-b border-black/10 pb-2 mb-2">
                  <span className="text-xs font-bold opacity-50 uppercase tracking-widest pointer-events-none">Note</span>
                  <span 
                    className={\`material-symbols-outlined text-[16px] cursor-pointer hover:opacity-100 transition-opacity \${shape.isPinned ? 'opacity-100 text-black' : 'opacity-30'}\`}
                    onPointerDown={(e) => { e.stopPropagation(); togglePin(shape.id); }}
                  >
                    push_pin
                  </span>
                </div>`;

content = content.replace(oldJsx, newJsx);

fs.writeFileSync('src/routes/index.tsx', content, 'utf8');
