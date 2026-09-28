const fs = require('fs');
let content = fs.readFileSync('src/routes/index.tsx', 'utf8');

const oldEffect = `  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let isPanning = false;
    let startX = 0;
    let startY = 0;

    const onMouseDown = (e: MouseEvent) => {
      // Only pan if clicking on the background (not on a note or card)
      if (e.target === container || (e.target as HTMLElement).id === "canvas-wrapper") {
        isPanning = true;
        container.classList.add("cursor-grabbing");
        startX = e.pageX - pan.x;
        startY = e.pageY - pan.y;
      }
    };

    const onMouseUp = () => {
      isPanning = false;
      container.classList.remove("cursor-grabbing");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isPanning) {
        e.preventDefault();
        setPan({
          x: e.pageX - startX,
          y: e.pageY - startY
        });
      }
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [pan]);`;

const newEffect = `  const panRef = useRef({ x: 0, y: 0 });
  
  // Sync state to ref so mousedown can access latest without being in deps
  useEffect(() => {
    panRef.current = pan;
  }, [pan]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let isPanning = false;
    let startX = 0;
    let startY = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.target === container || (e.target as HTMLElement).id === "canvas-wrapper") {
        isPanning = true;
        container.classList.add("cursor-grabbing");
        startX = e.pageX - panRef.current.x;
        startY = e.pageY - panRef.current.y;
      }
    };

    const onMouseUp = () => {
      if (isPanning) {
        isPanning = false;
        container.classList.remove("cursor-grabbing");
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isPanning) {
        e.preventDefault();
        setPan({
          x: e.pageX - startX,
          y: e.pageY - startY
        });
      }
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);`;

content = content.replace(oldEffect, newEffect);
fs.writeFileSync('src/routes/index.tsx', content, 'utf8');
