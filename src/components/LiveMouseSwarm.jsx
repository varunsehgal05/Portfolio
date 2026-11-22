import React, { useEffect, useRef, useState } from 'react';
import './LiveMouseSwarm.css';

/**
 * Collaborative Swarm Live Mouse Flocking & App Assembly Engine
 * 
 * Features:
 * - 5 Elite collaborative agents (Varun Sehgal, Elena Rostova, Sarah Lin, Alex Chen, Marcus Vance)
 * - Fluid boids flocking algorithm following the mouse cursor
 * - Collaborative App Assembly: When any app opens, agents dash to the 4 window corners and titlebar,
 *   drawing dynamic blueprint bounding lines to assemble the window into existence.
 * - Dynamic SVG dashed connecting network lines
 * - Mouse movement, scroll wheel, and click reactive
 * - Smooth 60fps GPU transforms with zero lag
 * - 100% non-blocking (pointer-events: none)
 */

const ELITE_AGENTS = [
  { id: 'agent-varun', name: 'Varun Sehgal', role: 'Typing', color: '#A259FF', defaultAction: 'Designing' },
  { id: 'agent-elena', name: 'Elena Rostova', role: 'Layout', color: '#0D99FF', defaultAction: 'Drafting' },
  { id: 'agent-sarah', name: 'Sarah Lin', role: 'Stamping', color: '#EC4899', defaultAction: 'Auto-Layout' },
  { id: 'agent-alex', name: 'Alex Chen', role: 'Framing', color: '#10B981', defaultAction: 'Mounting' },
  { id: 'agent-marcus', name: 'Marcus Vance', role: 'Motion', color: '#F59E0B', defaultAction: 'Reviewing' }
];

const createInitialAgents = (count) => {
  const initialAgents = [];
  const actualCount = Math.max(1, Math.min(count || 5, 12));
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const h = typeof window !== 'undefined' ? window.innerHeight : 800;

  for (let i = 0; i < actualCount; i++) {
    const spec = ELITE_AGENTS[i % ELITE_AGENTS.length];
    const angle = (i / actualCount) * Math.PI * 2;
    const radius = 60 + (i % 3) * 35;

    initialAgents.push({
      id: `${spec.id}-${i}`,
      name: spec.name,
      role: spec.role,
      color: spec.color,
      action: spec.defaultAction,
      x: w / 2 + Math.cos(angle) * radius,
      y: h / 2 + Math.sin(angle) * radius,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      offsetX: Math.cos(angle) * radius,
      offsetY: Math.sin(angle) * radius,
      damping: 0.96,
      spring: 0.0035,
      separationDist: 60,
      wobblePhase: i * 1.25
    });
  }
  return initialAgents;
};

const LiveMouseSwarm = ({ isEnabled = false, isRebuildActive = false, agentCount = 5 }) => {
  const containerRef = useRef(null);
  const svgLinesRef = useRef(null);
  const animFrameRef = useRef(null);

  const [agentList] = useState(() => createInitialAgents(agentCount));
  const agentsRef = useRef(agentList);

  const mouseRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
    hasMoved: false,
    clickPulse: 0
  });

  const domNodesRef = useRef([]);
  const actionTextNodesRef = useRef([]);
  const linesDomRef = useRef([]);

  useEffect(() => {
    if (isRebuildActive || !isEnabled) return;

    // Global listener: Mouse movement
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.hasMoved = true;
    };

    // Global listener: Mouse wheel / trackpad scroll
    const handleWheel = (e) => {
      const scrollForce = Math.min(20, Math.max(-20, e.deltaY * 0.12));
      agentsRef.current.forEach((a) => {
        a.vy += scrollForce * 0.5;
        a.vx += (Math.random() - 0.5) * Math.abs(scrollForce) * 0.3;
      });
    };

    // Global listener: Click reaction
    const handleClick = (e) => {
      mouseRef.current.clickPulse = 1.0;
      agentsRef.current.forEach((a) => {
        const dx = a.x - e.clientX;
        const dy = a.y - e.clientY;
        const dist = Math.hypot(dx, dy) || 1;
        a.vx += (dx / dist) * 10;
        a.vy += (dy / dist) * 10;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleWheel, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // 60FPS Physics Loop
    let lastTime = performance.now();

    const updatePhysics = (now) => {
      const dt = Math.min(0.04, Math.max(0.005, (now - lastTime) / 1000));
      lastTime = now;

      const agents = agentsRef.current;
      const mouse = mouseRef.current;
      const lineCoords = [];

      if (mouse.clickPulse > 0) {
        mouse.clickPulse = Math.max(0, mouse.clickPulse - dt * 2.5);
      }

      // Normal Mode: Smooth Boids Mouse Flocking (Calm, graceful, not rushing)
      const targetX = mouse.x;
      const targetY = mouse.y;

      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];
        agent.action = agent.role;

        // 1. Goal Seeking: pull toward mouse with personal orbital offset (calm, slow drift)
        const orbitalTime = now * 0.0002;
        const currentTargetX = targetX + Math.cos(orbitalTime + agent.wobblePhase) * agent.offsetX;
        const currentTargetY = targetY + Math.sin(orbitalTime + agent.wobblePhase) * agent.offsetY;

        const seekFx = (currentTargetX - agent.x) * agent.spring;
        const seekFy = (currentTargetY - agent.y) * agent.spring;

        agent.vx = (agent.vx + seekFx) * agent.damping;
        agent.vy = (agent.vy + seekFy) * agent.damping;

        // 2. Separation: repel nearby agents gently to avoid stacking
        for (let j = i + 1; j < agents.length; j++) {
          const other = agents[j];
          const dx = other.x - agent.x;
          const dy = other.y - agent.y;
          const dist = Math.hypot(dx, dy);

          if (dist < agent.separationDist && dist > 0) {
            const force = (agent.separationDist - dist) / agent.separationDist;
            const pushX = (dx / dist) * force * 0.75;
            const pushY = (dy / dist) * force * 0.75;

            agent.vx -= pushX;
            agent.vy -= pushY;
            other.vx += pushX;
            other.vy += pushY;
          }

          // Connecting line between peers
          if (dist < 130 && lineCoords.length < 10 && isEnabled) {
            lineCoords.push({
              x1: agent.x,
              y1: agent.y,
              x2: other.x,
              y2: other.y,
              opacity: ((130 - dist) / 130) * 0.45,
              color: agent.color
            });
          }
        }

        agent.x += agent.vx;
        agent.y += agent.vy;

        const dom = domNodesRef.current[i];
        if (dom) {
          dom.style.transform = `translate3d(${agent.x.toFixed(1)}px, ${agent.y.toFixed(1)}px, 0)`;
        }
        const textDom = actionTextNodesRef.current[i];
        if (textDom && textDom.textContent !== agent.action) {
          textDom.textContent = agent.action;
        }
      }

      // Update SVG Lines (Direct DOM attribute updates)
      for (let j = 0; j < 12; j++) {
        const lineEl = linesDomRef.current[j];
        if (!lineEl) continue;
        if (j < lineCoords.length) {
          const l = lineCoords[j];
          lineEl.setAttribute('x1', l.x1.toFixed(1));
          lineEl.setAttribute('y1', l.y1.toFixed(1));
          lineEl.setAttribute('x2', l.x2.toFixed(1));
          lineEl.setAttribute('y2', l.y2.toFixed(1));
          lineEl.setAttribute('stroke', l.color);
          lineEl.setAttribute('stroke-opacity', l.opacity.toFixed(2));
        } else if (lineEl.getAttribute('stroke-opacity') !== '0') {
          lineEl.setAttribute('stroke-opacity', '0');
        }
      }

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleWheel);
      window.removeEventListener('click', handleClick);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isEnabled, isRebuildActive, agentCount]);

  if (isRebuildActive || !isEnabled) return null;

  return (
    <div 
      ref={containerRef} 
      className="live-mouse-swarm-overlay is-visible" 
      style={{
        opacity: 1,
        pointerEvents: 'none',
        transition: 'opacity 0.35s ease'
      }}
      aria-hidden="true"
    >
      {/* Dynamic SVG Dashed Network Layer */}
      <svg className="live-swarm-svg-canvas" ref={svgLinesRef}>
        {Array.from({ length: 12 }).map((_, idx) => (
          <line
            key={idx}
            ref={(el) => (linesDomRef.current[idx] = el)}
            strokeWidth="1.4"
            strokeDasharray="4 4"
            strokeOpacity="0"
          />
        ))}
      </svg>

      {/* Agents Layer (5 Elite Collaborative Agents) */}
      {agentList.map((agent, idx) => (
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

          {/* User Tag with Role Only */}
          <div className="live-swarm-tag" style={{ backgroundColor: agent.color }}>
            <span className="live-swarm-name">{agent.role || 'Agent'}</span>
          </div>
        </div>
      ))}

      {/* Subtle bottom badge indicating live swarm mode */}
      <div className="live-swarm-status-badge">
        <span className="live-swarm-pulse-dot" />
        <span>Swarm Active: 5 Collaborative Agents</span>
      </div>
    </div>
  );
};

export default LiveMouseSwarm;
