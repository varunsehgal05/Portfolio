import { useEffect, useRef, useState } from "react";

interface AsciiLoaderProps {
  onComplete: () => void;
}

const CONFIG = {
  cols: 44, // ASCII grid width (characters)
  rows: 28, // ASCII grid height (characters)
  cellW: 11, // px per character, horizontal
  cellH: 15, // px per character, vertical
  fontSize: 14,
  spinSpeed: 1.2, // higher = faster spin
  bobAmplitude: 4, // px of vertical float
  loadDurationMs: 3200, // total time before reveal
  messages: [
    { at: 0, text: "INITIALIZING WORKSPACE..." },
    { at: 35, text: "LOADING ASSETS..." },
    { at: 68, text: "COMPILING CANVAS..." },
    { at: 92, text: "ALMOST READY..." },
  ],
  colors: {
    orange1: "#f24e1e",
    orange2: "#ff7262",
    purple: "#a259ff",
    blue: "#1abcfe",
    green: "#0acf83",
    text: "#ff9686",
    textDim: "#7a4a42",
    track: "#241210",
  },
};

export function AsciiLoader({ onComplete }: AsciiLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(CONFIG.messages[0].text);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // 3D Rotating ASCII Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { cols, rows, cellW, cellH, fontSize, colors, spinSpeed, bobAmplitude } = CONFIG;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = cols * cellW * dpr;
    canvas.height = rows * cellH * dpr;
    ctx.scale(dpr, dpr);
    ctx.font = `${fontSize}px 'Courier New', ui-monospace, Menlo, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const BLOBS = [
      { cx: -0.5, cy: 0.70, hw: 0.56, hh: 0.30, color: colors.orange1 },
      { cx: 0.5, cy: 0.70, hw: 0.56, hh: 0.30, color: colors.orange2 },
      { cx: -0.5, cy: 0.00, hw: 0.56, hh: 0.30, color: colors.purple },
      { cx: 0.5, cy: 0.00, hw: 0.56, hh: 0.30, color: colors.blue },
      { cx: 0.0, cy: -0.70, hw: 0.56, hh: 0.30, color: colors.green },
    ];

    function blobAt(nx: number, ny: number) {
      for (const b of BLOBS) {
        const dx = (nx - b.cx) / b.hw;
        const dy = (ny - b.cy) / b.hh;
        if (dx * dx + dy * dy <= 1) return b.color;
      }
      return null;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let animId: number;

    function renderFrame(now: number) {
      if (!ctx) return;
      const t = (now - start) / 1000;
      const spin = reduceMotion ? Math.PI / 8 : t * spinSpeed;
      const cosT = Math.cos(spin);
      const sinT = Math.sin(spin);
      const bob = reduceMotion ? 0 : Math.sin(t * 1.6) * bobAmplitude;

      ctx.clearRect(0, 0, cols * cellW, rows * cellH);

      const edgeOn = Math.abs(cosT) < 0.06;

      for (let r = 0; r < rows; r++) {
        const ny = -(((r + 0.5) / rows) * 2 - 1);
        for (let c = 0; c < cols; c++) {
          const screenX = ((c + 0.5) / cols) * 2 - 1;
          if (Math.abs(cosT) < 0.04) continue;
          const nx = screenX / cosT;
          if (nx < -1.1 || nx > 1.1) continue;

          const color = blobAt(nx, ny);
          if (!color) continue;

          const z = nx * sinT;
          let brightness = Math.max(0.28, Math.abs(cosT)) * 0.75 + 0.25 + Math.max(0, -z) * 0.15;
          brightness = Math.min(1, brightness);

          let ch = "@";
          if (brightness < 0.45) ch = ".";
          else if (brightness < 0.7) ch = "+";

          const px = c * cellW + cellW / 2;
          const py = r * cellH + cellH / 2 + bob;

          ctx.globalAlpha = brightness;
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 6 * brightness;
          ctx.fillText(ch, px, py);
        }
      }

      if (edgeOn) {
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 10;
        const cx = (cols / 2) * cellW;
        for (let r = 2; r < rows - 2; r++) {
          ctx.fillText("|", cx, r * cellH + cellH / 2 + bob);
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(renderFrame);
    }

    animId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  // Loading Sequence Progress
  useEffect(() => {
    const start = performance.now();
    let progressId: number;
    let finishTimeout: ReturnType<typeof setTimeout>;

    function tick(now: number) {
      const elapsed = now - start;
      let p = Math.min(1, elapsed / CONFIG.loadDurationMs);
      p = 1 - Math.pow(1 - p, 2); // ease-out
      const pct = Math.round(p * 100);

      setProgress(pct);

      let msg = CONFIG.messages[0].text;
      for (const m of CONFIG.messages) {
        if (pct >= m.at) msg = m.text;
      }
      setStatusText(msg);

      if (pct < 100) {
        progressId = requestAnimationFrame(tick);
      } else {
        finishTimeout = setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 500);
        }, 350);
      }
    }

    progressId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(progressId);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#020202] grid place-items-center transition-opacity duration-500 font-mono select-none ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ fontFamily: "'Courier New', ui-monospace, Menlo, monospace" }}
    >
      <div className="relative flex flex-col items-center gap-[30px]">
        {/* Soft Radial Ambient Glow */}
        <div
          className="absolute w-[420px] h-[420px] left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 blur-[10px]"
          style={{
            background: "radial-gradient(circle, rgba(242,78,30,0.12), transparent 65%)",
          }}
        />

        {/* 3D ASCII Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="block"
          style={{
            width: "min(80vw, 484px)",
            height: "auto",
          }}
        />

        {/* Status Line + Progress Bar */}
        <div className="flex flex-col items-center gap-[12px]" role="status" aria-live="polite">
          <div
            className="text-[13px] tracking-[2px] flex items-center gap-[3px]"
            style={{
              color: CONFIG.colors.text,
              textShadow: "0 0 6px rgba(255,150,134,0.5)",
            }}
          >
            <span>{statusText}</span>
            <span className="animate-pulse">█</span>
          </div>

          {/* Bar Track */}
          <div
            className="w-[220px] h-[3px] relative overflow-hidden rounded-[2px]"
            style={{ background: CONFIG.colors.track }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 transition-all duration-75 ease-out"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${CONFIG.colors.orange1}, ${CONFIG.colors.orange2})`,
                boxShadow: `0 0 10px ${CONFIG.colors.orange1}`,
              }}
            />
          </div>

          {/* Percentage */}
          <div
            className="text-[11px] tracking-[2px]"
            style={{ color: CONFIG.colors.textDim }}
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
