import React, { useEffect, useRef } from 'react';
import './LiveMouseSwarm.css';

/**
 * Califa Swarm Site Live Mouse Following Engine
 * Recreates the exact multi-agent cursor flocking from https://califa.github.io/swarm-site/
 * 
 * Features:
 * - Autonomous agent cursors following the mouse with boid flocking physics
 * - Dynamic SVG dashed connecting network lines (stroke-dasharray="3 3")
 * - Scroll and interaction reactive
 * - Zero CPU waste / 60fps GPU transforms (direct DOM ref manipulation)
 * - 100% non-blocking (pointer-events: none)
 */

const AGENT_SPECS = [
  { label: 'orchestrator', color: '#A259FF', count: 1 },
  { label: 'agent/designer', color: '#EC4899', count: 6 },
  { label: 'agent/research', color: '#0D99FF', count: 8 },
  { label: 'agent/eval', color: '#06B6D4', count: 6 },
  { label: 'agent/writer', color: '#FACC15', count: 4 },
  { label: 'agent/review', color: '#10B981', count: 4 },
  { label: 'agent/deploy', color: '#F97316', count: 3 }
];

const LiveMouseSwarm = ({ isEnabled = true, agentCount = 32 }) => {
  const containerRef = useRef(null);
  const svgLinesRef = useRef(null);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
    hasMoved: false,
    clickPulse: 0
  });

  const agentsRef = useRef([]);
  const domNodesRef = useRef([]);

  useEffect(() => {
    if (!isEnabled) return;

    // Initialize agents
    const initialAgents = [];
    let counter = 0;
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (const spec of AGENT_SPECS) {
      for (let i = 1; i <= spec.count; i++) {
        if (initialAgents.length >= agentCount) break;
        counter++;
        const angle = (counter / agentCount) * Math.PI * 2;
        const radius = 60 + Math.random() * 140;

        initialAgents.push({
          id: `live-agent-${counter}`,
          name: spec.count > 1 ? `${spec.label}-${i}` : spec.label,
          color: spec.color,
          x: w / 2 + Math.cos(angle) * radius,
          y: h / 2 + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          offsetX: Math.cos(angle) * radius,
          offsetY: Math.sin(angle) * radius,
          damping: 0.88 + Math.random() * 0.06,
          spring: 0.045 + Math.random() * 0.035,
          separationDist: 48,
          wobblePhase: Math.random() * Math.PI * 2
        });
      }
    }
    agentsRef.current = initialAgents;

    // Global listeners for mouse, scroll, and click
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.hasMoved = true;
    };

    const handleScroll = () => {
      // Small velocity kick when page scrolls
      agentsRef.current.forEach((a) => {
        a.vy += (Math.random() - 0.5) * 4;
      });
    };

    const handleClick = (e) => {
      mouseRef.current.clickPulse = 1.0;
      // Scatter briefly on click then swarm back
      agentsRef.current.forEach((a) => {
        const dx = a.x - e.clientX;
        const dy = a.y - e.clientY;
        const dist = Math.hypot(dx, dy) || 1;
        a.vx += (dx / dist) * 12;
        a.vy += (dy / dist) * 12;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // 60FPS Physics Loop using Boids algorithm (Califa swarm-site behavior)
    let lastTime = performance.now();

    const updatePhysics = (now) => {
      const dt = Math.min(0.04, Math.max(0.005, (now - lastTime) / 1000));
      lastTime = now;

      const agents = agentsRef.current;
      const mouse = mouseRef.current;
      const targetX = mouse.x;
      const targetY = mouse.y;

      if (mouse.clickPulse > 0) {
        mouse.clickPulse = Math.max(0, mouse.clickPulse - dt * 2.5);
      }

      const lineCoords = [];

      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];

        // 1. Cohesion / Goal Seeking: pull toward mouse + personal orbital offset
        const orbitalTime = now * 0.0015;
        const currentTargetX = targetX + Math.cos(orbitalTime + agent.wobblePhase) * agent.offsetX;
        const currentTargetY = targetY + Math.sin(orbitalTime + agent.wobblePhase) * agent.offsetY;

        const seekFx = (currentTargetX - agent.x) * agent.spring;
        const seekFy = (currentTargetY - agent.y) * agent.spring;

        agent.vx = (agent.vx + seekFx) * agent.damping;
        agent.vy = (agent.vy + seekFy) * agent.damping;

        // 2. Separation: repel nearby agents to prevent overlapping
        for (let j = i + 1; j < agents.length; j++) {
          const other = agents[j];
          const dx = other.x - agent.x;
          const dy = other.y - agent.y;
          const dist = Math.hypot(dx, dy);

          if (dist < agent.separationDist && dist > 0) {
            const force = (agent.separationDist - dist) / agent.separationDist;
            const pushX = (dx / dist) * force * 1.8;
            const pushY = (dy / dist) * force * 1.8;

            agent.vx -= pushX;
            agent.vy -= pushY;
            other.vx += pushX;
            other.vy += pushY;
          }

          // Connecting line between close peers (Califa swarm-site signature)
          if (dist < 110 && lineCoords.length < 24) {
            lineCoords.push({
              x1: agent.x,
              y1: agent.y,
              x2: other.x,
              y2: other.y,
              opacity: ((110 - dist) / 110) * 0.45,
              color: agent.color
            });
          }
        }

        // Apply velocities
        agent.x += agent.vx;
        agent.y += agent.vy;

        // Direct DOM update for 60fps performance
        const dom = domNodesRef.current[i];
        if (dom) {
          dom.style.transform = `translate3d(${agent.x.toFixed(1)}px, ${agent.y.toFixed(1)}px, 0)`;
        }
      }

      // Update SVG dashed network lines
      if (svgLinesRef.current) {
        svgLinesRef.current.innerHTML = lineCoords
          .map(
            (l) =>
              `<line x1="${l.x1.toFixed(1)}" y1="${l.y1.toFixed(1)}" x2="${l.x2.toFixed(1)}" y2="${l.y2.toFixed(1)}" stroke="${l.color}" stroke-opacity="${l.opacity.toFixed(2)}" stroke-width="1.2" stroke-dasharray="3 3" />`
          )
          .join('');
      }

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isEnabled, agentCount]);

  if (!isEnabled) return null;

  const agents = agentsRef.current.length > 0 ? agentsRef.current : [];

  return (
    <div ref={containerRef} className="live-mouse-swarm-overlay" aria-hidden="true">
      {/* Dynamic SVG Dashed Network Layer */}
      <svg className="live-swarm-svg-canvas" ref={svgLinesRef} />

      {/* Agents Layer */}
      {agents.map((agent, idx) => (
        <div
          key={agent.id}
          ref={(el) => (domNodesRef.current[idx] = el)}
          className="live-swarm-agent"
          style={{
            transform: `translate3d(${agent.x}px, ${agent.y}px, 0)`,
            '--agent-color': agent.color
          }}
        >
          {/* Authentic Califa / Figma Pointer */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="live-swarm-pointer-svg">
            <path
              d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
              fill={agent.color}
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </svg>

          {/* User Tag */}
          <div className="live-swarm-tag" style={{ backgroundColor: agent.color }}>
            <span className="live-swarm-name">{agent.name}</span>
          </div>
        </div>
      ))}

      {/* Subtle bottom badge indicating live swarm mode */}
      <div className="live-swarm-status-badge">
        <span className="live-swarm-pulse-dot" />
        <span>Live Swarm Engine Active ({agents.length} agents)</span>
      </div>
    </div>
  );
};

export default LiveMouseSwarm;
