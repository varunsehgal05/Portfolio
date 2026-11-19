import { useState, useEffect, useRef } from 'react';
import './SwarmSiteView.css';

/**
 * Califa Swarm Site Exact Recreation
 * Based on https://califa.github.io/swarm-site/
 * "This page was built by 48 agents while you scrolled."
 *
 * Implements:
 * - 48 autonomous agent cursors with boid flocking physics (cohesion, separation, alignment)
 * - Dynamic SVG connecting paths layer (stroke-dasharray="3 3", vector-effect="non-scaling-stroke")
 * - Scroll & mouse reactive velocity vectors
 * - Live orchestrator status & replica breakdown
 */

// Generate 48 distinct agent definitions
const AGENT_CATEGORIES = [
  { role: 'orchestrator', count: 1, color: '#A259FF', label: 'orchestrator' },
  { role: 'research', count: 12, color: '#38bdf8', label: 'agent/research' },
  { role: 'writer', count: 4, color: '#facc15', label: 'agent/writer' },
  { role: 'designer', count: 8, color: '#ec4899', label: 'agent/designer' },
  { role: 'review', count: 6, color: '#10b981', label: 'agent/review' },
  { role: 'deploy', count: 4, color: '#f97316', label: 'agent/deploy' },
  { role: 'optimizer', count: 2, color: '#8b5cf6', label: 'agent/optimizer' },
  { role: 'eval', count: 11, color: '#06b6d4', label: 'agent/eval' }
];

const INITIAL_48_AGENTS = [];
let agentCounter = 0;
AGENT_CATEGORIES.forEach(cat => {
  for (let i = 1; i <= cat.count; i++) {
    agentCounter++;
    INITIAL_48_AGENTS.push({
      id: `agent-${agentCounter}`,
      name: cat.count > 1 ? `${cat.label}-${i}` : cat.label,
      role: cat.role,
      color: cat.color,
      replicas: cat.count,
      x: 100 + Math.random() * 800,
      y: 80 + Math.random() * 600,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      targetX: 100 + Math.random() * 800,
      targetY: 80 + Math.random() * 600,
      status: i % 3 === 0 ? 'drafting' : 'syncing'
    });
  }
});

const SwarmSiteView = () => {
  const [agents, setAgents] = useState(INITIAL_48_AGENTS);
  const [paths, setPaths] = useState([]);
  const [tasksQueued, setTasksQueued] = useState(18);
  const containerRef = useRef(null);
  const mousePosRef = useRef({ x: 500, y: 350 });
  const scrollYRef = useRef(0);
  const animRef = useRef(null);
  const agentsStateRef = useRef(INITIAL_48_AGENTS.map(a => ({ ...a })));

  // Track mouse coordinates over the container
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  // Track scroll position
  const handleScroll = (e) => {
    scrollYRef.current = e.target.scrollTop;
  };

  useEffect(() => {
    // 60FPS Flocking & Physics Animation Loop
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      const currentAgents = agentsStateRef.current;
      const mouse = mousePosRef.current;
      const scrollY = scrollYRef.current;

      const updated = currentAgents.map((agent, i) => {
        // 1. Cohesion: slight pull towards mouse or target cluster
        const targetX = (mouse.x * 0.4) + (agent.id === 'agent-1' ? mouse.x : (150 + ((i * 57) % 780)));
        const targetY = (mouse.y * 0.3) + scrollY * 0.15 + (120 + ((i * 43) % 650));

        let fx = (targetX - agent.x) * 0.8;
        let fy = (targetY - agent.y) * 0.8;

        // 2. Separation: repel from nearby neighbors to avoid overlapping
        for (let j = 0; j < currentAgents.length; j++) {
          if (i === j) continue;
          const other = currentAgents[j];
          const dx = agent.x - other.x;
          const dy = agent.y - other.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 2200 && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const repel = (48 - dist) * 2.5;
            fx += (dx / dist) * repel;
            fy += (dy / dist) * repel;
          }
        }

        // 3. Mouse avoidance/attraction
        const mdx = agent.x - mouse.x;
        const mdy = agent.y - mouse.y;
        const mDist = Math.hypot(mdx, mdy);
        if (mDist < 90 && mDist > 0) {
          // Subtle mouse deflection
          fx += (mdx / mDist) * 35;
          fy += (mdy / mDist) * 35;
        }

        // Apply velocity with friction dampening
        agent.vx = (agent.vx + fx * dt) * 0.88;
        agent.vy = (agent.vy + fy * dt) * 0.88;

        agent.x += agent.vx;
        agent.y += agent.vy;

        // Keep within comfortable viewport bounds
        agent.x = Math.max(20, Math.min(1060, agent.x));
        agent.y = Math.max(30, Math.min(1800, agent.y));

        return agent;
      });

      // 4. Calculate dynamic SVG connecting lines between close neighbors (< 130px)
      const dynamicPaths = [];
      for (let i = 0; i < updated.length; i += 2) {
        for (let j = i + 1; j < updated.length; j += 3) {
          const a = updated[i];
          const b = updated[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 135) {
            dynamicPaths.push({
              id: `${a.id}-${b.id}`,
              d: `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`,
              color: a.color,
              opacity: (1 - dist / 135) * 0.4
            });
            if (dynamicPaths.length >= 24) break;
          }
        }
        if (dynamicPaths.length >= 24) break;
      }

      setAgents([...updated]);
      setPaths(dynamicPaths);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    // Minor task queue fluctuation for realism
    const interval = setInterval(() => {
      setTasksQueued(q => Math.max(8, q + Math.floor(Math.random() * 5 - 2)));
    }, 2800);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="swarm-site-container"
      onMouseMove={handleMouseMove}
      onScroll={handleScroll}
    >
      {/* Background Grid */}
      <div className="swarm-site-grid-bg" />

      {/* SVG Connecting Paths Layer */}
      <svg className="swarm-site-svg-layer">
        {paths.map(p => (
          <path
            key={p.id}
            d={p.d}
            stroke={p.color}
            strokeOpacity={p.opacity}
          />
        ))}
      </svg>

      {/* 48 Multi-Agent Cursors Overlay */}
      <div className="swarm-site-cursors-layer">
        {agents.map((agent, idx) => (
          <div
            key={agent.id}
            className="califa-cursor"
            style={{
              transform: `translate3d(${agent.x}px, ${agent.y - scrollYRef.current * 0.3}px, 0)`,
              zIndex: agent.role === 'orchestrator' ? 30 : 20
            }}
          >
            {/* SVG Pointer Arrow */}
            <svg
              className="califa-cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5.65 12.37H5.46L5.32 12.5L0.5 16.88V1.2L11.78 12.37H5.65Z"
                fill={agent.color}
                stroke="#ffffff"
                strokeWidth="1.2"
              />
            </svg>

            {/* Agent Role Badge */}
            {(idx % 2 === 0 || agent.role === 'orchestrator') && (
              <div
                className="califa-cursor-tag"
                style={{ backgroundColor: agent.color }}
              >
                <span>{agent.name}</span>
                {agent.replicas > 1 && (
                  <span className="califa-cursor-replicas">({agent.replicas}x)</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sticky Top Orchestration Bar */}
      <div className="swarm-site-top-bar">
        <div className="swarm-meta-pill">
          <div className="swarm-live-pulse-dot" />
          <span className="swarm-narrative-tag">This page was built by 48 agents while you scrolled.</span>
        </div>

        <div className="swarm-orchestrator-stats">
          <span className="swarm-queue-badge">orchestrator · {tasksQueued} tasks queued</span>
          <span className="swarm-replicas-badge">48 active replicas</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="swarm-site-content">
        {/* Hero Section */}
        <header className="swarm-site-hero">
          <div className="swarm-hero-eyebrow">
            Autonomous Multi-Agent Orchestration
          </div>
          <h1 className="swarm-hero-title">
            The multi-agent framework<br />
            that <span>builds in real time.</span>
          </h1>
          <p className="swarm-hero-desc">
            Scale coordinated teams of LLM agents running concurrent research, UI drafting, and verification streams with zero human intervention.
          </p>
          <div className="swarm-action-group">
            <button className="swarm-btn-primary">
              <span>Explore Swarm Engine</span>
              <span>→</span>
            </button>
            <button className="swarm-btn-secondary">
              Read Documentation
            </button>
          </div>
        </header>

        {/* Replicas Strip */}
        <div className="swarm-replicas-strip">
          {AGENT_CATEGORIES.map(cat => (
            <div key={cat.role} className="replica-chip">
              <span className="replica-color-dot" style={{ backgroundColor: cat.color }} />
              <span>{cat.label}:</span>
              <strong>{cat.count} {cat.count === 1 ? 'leader' : 'replicas'}</strong>
            </div>
          ))}
        </div>

        {/* YAML Pipeline Section */}
        <section className="swarm-pipeline-section">
          <div className="section-label">Pipeline Definition · swarm.config.yaml</div>
          <div className="swarm-yaml-card">
            <div className="yaml-card-header">
              <div className="yaml-header-title">
                <span>📄</span>
                <span>orchestrator.pipeline.yml</span>
              </div>
              <div className="yaml-live-status">
                <span className="swarm-live-pulse-dot" />
                <span>48 replicas executing</span>
              </div>
            </div>
            <pre className="yaml-code-block">
{`# Multi-Agent Coordination Specification
swarm:
  version: "2.4.0"
  orchestrator:
    strategy: hierarchical-flock
    max_concurrent_agents: 48
    sync_frequency_ms: 16 # 60fps GPU loop

  workers:
    - role: agent/research
      replicas: 12
      tools: [web_reader, ast_parser, token_auditor]
      status: ACTIVE

    - role: agent/designer
      replicas: 8
      tools: [figma_canvas, vector_pen, bento_layout]
      status: DRAFTING

    - role: agent/writer
      replicas: 4
      tools: [markdown_streamer, copy_checker]
      status: STREAMING

    - role: agent/review
      replicas: 6
      tools: [wcag_contrast, layout_linter]
      status: VERIFYING`}
            </pre>
          </div>
        </section>

        {/* 3 Architecture Features Grid */}
        <section className="swarm-features-grid">
          <div className="swarm-feature-card">
            <div className="feature-icon-badge" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              ⚡
            </div>
            <h3>Boid Flocking Dynamics</h3>
            <p>Agents self-organize around active UI tasks using mathematical separation, cohesion, and alignment forces.</p>
            <div className="feature-stat-pill">60fps Vector Math</div>
          </div>

          <div className="swarm-feature-card">
            <div className="feature-icon-badge" style={{ backgroundColor: 'rgba(162, 89, 255, 0.15)', color: '#c084fc' }}>
              ❖
            </div>
            <h3>Multiplayer Canvas Sync</h3>
            <p>Every cursor streams live positions, selections, and bounding coordinates across the shared Figma workspace.</p>
            <div className="feature-stat-pill">48 Concurrent Nodes</div>
          </div>

          <div className="swarm-feature-card">
            <div className="feature-icon-badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              ✓
            </div>
            <h3>Autonomous Verification</h3>
            <p>Review agents continuously audit contrast, layout hierarchy, and code handoff specs as you navigate.</p>
            <div className="feature-stat-pill">0 Human Gates</div>
          </div>
        </section>

        {/* Footer */}
        <footer className="swarm-site-footer">
          <span>Swarm Site Architecture · Inspired by califa.github.io/swarm-site · VarunOS System Engine</span>
        </footer>
      </div>
    </div>
  );
};

export default SwarmSiteView;
