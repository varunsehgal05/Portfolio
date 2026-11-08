import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ExternalLink, 
  Play, 
  Share2, 
  Check, 
  Layers, 
  MessageSquare,
  Sparkles,
  MousePointer,
  Maximize2,
  ChevronRight,
  Code2,
  Activity,
  Cpu,
  Layers3,
  Sliders,
  Send
} from 'lucide-react';
import './FigmaApp.css';

const FigmaLogo = ({ size = 20 }) => (
  <svg 
    width={size} 
    height={size * 1.5} 
    viewBox="0 0 38 57" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);

// Figma style pointer arrow
const FigmaCursorPointer = ({ color = '#1ABCFE' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="figma-cursor-svg">
    <path
      d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
      fill={color}
      stroke="#ffffff"
      strokeWidth="1.5"
    />
  </svg>
);

const FIGMA_PROJECT_LINKS = [
  {
    name: 'AI Interview Prep System',
    url: 'https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1',
    desc: 'Interactive Figma design file with full component library',
    badge: 'UX Prototype'
  },
  {
    name: 'Movie Ticket Booking App',
    url: 'https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1',
    desc: 'High-fidelity mobile UX prototype & checkout flows',
    badge: 'Mobile App'
  },
  {
    name: 'Expensify - Budget Tracker',
    url: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1',
    desc: 'FinTech dashboard with micro-interactions',
    badge: 'FinTech'
  },
  {
    name: 'EventFlow Experience Platform',
    url: 'https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2&p=f&t=ucsh4jF84sBl50UA-0',
    desc: 'Event planning UI design system & ticketing',
    badge: 'Design System'
  }
];

const COLLAB_COLORS = ['#0ACF83', '#FF7262', '#F24E1E', '#FFC700', '#9747FF'];

const FigmaApp = ({ isInteracting = false, userName = 'Guest' }) => {
  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' | 'projects' | 'embed'
  const [selectedFrame, setSelectedFrame] = useState('frame-interview');
  const [copied, setCopied] = useState(false);
  const [isChatInputOpen, setIsChatInputOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [activeUserChat, setActiveUserChat] = useState('');
  const [chatTimer, setChatTimer] = useState(null);

  // Local user mouse coords inside canvas
  const [localMouse, setLocalMouse] = useState({ x: -100, y: -100, isInside: false });

  // Remote Collaborator "Varun Sehgal" autonomous state
  const [varunCursor, setVarunCursor] = useState({
    x: 420,
    y: 180,
    chat: `Hey ${userName}! Welcome to my Figma workspace 👋`,
    selectedId: 'frame-interview'
  });

  // Cross-tab remote cursors synced via BroadcastChannel
  const [remotePeers, setRemotePeers] = useState({});

  const canvasRef = useRef(null);
  const chatInputRef = useRef(null);
  const channelRef = useRef(null);
  const clientIdRef = useRef(Math.random().toString(36).substring(2, 9));
  const userColor = '#1ABCFE'; // Figma Cyan Blue for local user

  // Cross-tab BroadcastChannel setup
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel('varunos_figma_multiplayer');
        channelRef.current = bc;

        bc.onmessage = (event) => {
          const data = event.data;
          if (!data || data.senderId === clientIdRef.current) return;

          if (data.type === 'cursor_move') {
            setRemotePeers((prev) => ({
              ...prev,
              [data.senderId]: {
                x: data.x,
                y: data.y,
                userName: data.userName || 'Peer',
                chat: data.chat || '',
                color: data.color || '#0ACF83',
                selectedFrame: data.selectedFrame,
                lastSeen: Date.now()
              }
            }));
          } else if (data.type === 'peer_leave') {
            setRemotePeers((prev) => {
              const updated = { ...prev };
              delete updated[data.senderId];
              return updated;
            });
          }
        };

        const cleanupInterval = setInterval(() => {
          const now = Date.now();
          setRemotePeers((prev) => {
            let changed = false;
            const updated = {};
            for (const [id, peer] of Object.entries(prev)) {
              if (now - peer.lastSeen < 6000) {
                updated[id] = peer;
              } else {
                changed = true;
              }
            }
            return changed ? updated : prev;
          });
        }, 3000);

        const handleUnload = () => {
          try {
            bc.postMessage({ type: 'peer_leave', senderId: clientIdRef.current });
          } catch (e) {}
        };
        window.addEventListener('beforeunload', handleUnload);

        return () => {
          clearInterval(cleanupInterval);
          window.removeEventListener('beforeunload', handleUnload);
          try {
            bc.postMessage({ type: 'peer_leave', senderId: clientIdRef.current });
            bc.close();
          } catch (e) {}
        };
      }
    } catch (e) {
      // BroadcastChannel not available fallback
    }
  }, []);

  // Broadcast local cursor
  const broadcastCursor = useCallback((x, y, chatText = activeUserChat) => {
    if (channelRef.current) {
      try {
        channelRef.current.postMessage({
          type: 'cursor_move',
          senderId: clientIdRef.current,
          userName: userName || 'Guest',
          x,
          y,
          chat: chatText,
          selectedFrame,
          color: userColor
        });
      } catch (e) {}
    }
  }, [activeUserChat, selectedFrame, userColor, userName]);

  // Handle local mouse move inside canvas
  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLocalMouse({ x, y, isInside: true });
    broadcastCursor(x, y);
  };

  const handleMouseLeave = () => {
    setLocalMouse((prev) => ({ ...prev, isInside: false }));
  };

  // Autonomous animation for "Varun Sehgal" cursor
  useEffect(() => {
    if (activeTab !== 'canvas') return;

    const waypoints = [
      { x: 380, y: 150, chat: `Hey ${userName}! Welcome to my portfolio workspace 👋`, selectedId: 'frame-interview' },
      { x: 280, y: 310, chat: 'Inspecting AI Interview feedback algorithms 📐', selectedId: 'frame-interview' },
      { x: 690, y: 160, chat: 'Checking Nebula Cloud node telemetry ⚡', selectedId: 'frame-cloud' },
      { x: 820, y: 280, chat: 'Latency is down to 14ms across all regions 🚀', selectedId: 'frame-cloud' },
      { x: 340, y: 530, chat: 'Reviewing Stitch design tokens & color ramp 🎨', selectedId: 'frame-tokens' },
      { x: 740, y: 510, chat: 'Check out the webhook idempotency specs here 🛡️', selectedId: 'frame-krypton' },
      { x: 520, y: 340, chat: "Press '/' to chat with your live cursor! 💬", selectedId: null }
    ];

    let currentWaypoint = 0;
    let startTime = performance.now();
    let animId;

    const startPos = { x: waypoints[0].x, y: waypoints[0].y };
    const targetPos = { x: waypoints[1].x, y: waypoints[1].y };

    const animateVarun = (now) => {
      const elapsed = now - startTime;
      const legDuration = 4200; // 4.2s per waypoint
      const progress = Math.min(1, elapsed / legDuration);

      // Smooth easeInOutCubic
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const fromWp = waypoints[currentWaypoint];
      const toWp = waypoints[(currentWaypoint + 1) % waypoints.length];

      const currentX = fromWp.x + (toWp.x - fromWp.x) * ease;
      const currentY = fromWp.y + (toWp.y - fromWp.y) * ease;

      setVarunCursor({
        x: Math.round(currentX),
        y: Math.round(currentY),
        chat: progress > 0.35 && progress < 0.85 ? toWp.chat : fromWp.chat,
        selectedId: toWp.selectedId
      });

      if (progress >= 1) {
        currentWaypoint = (currentWaypoint + 1) % waypoints.length;
        startTime = now;
      }

      animId = requestAnimationFrame(animateVarun);
    };

    animId = requestAnimationFrame(animateVarun);
    return () => cancelAnimationFrame(animId);
  }, [activeTab, userName]);

  // Figma Cursor Chat keyboard shortcut: '/'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab !== 'canvas') return;
      if (e.key === '/' && !isChatInputOpen && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        setIsChatInputOpen(true);
        setTimeout(() => chatInputRef.current?.focus(), 50);
      } else if (e.key === 'Escape' && isChatInputOpen) {
        setIsChatInputOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, isChatInputOpen]);

  const handleSendChat = (e) => {
    e?.preventDefault?.();
    if (!chatMessage.trim()) {
      setIsChatInputOpen(false);
      return;
    }

    const text = chatMessage.trim();
    setActiveUserChat(text);
    setIsChatInputOpen(false);
    setChatMessage('');

    if (localMouse.isInside) {
      broadcastCursor(localMouse.x, localMouse.y, text);
    }

    if (chatTimer) clearTimeout(chatTimer);
    const timer = setTimeout(() => {
      setActiveUserChat('');
      if (localMouse.isInside) {
        broadcastCursor(localMouse.x, localMouse.y, '');
      }
    }, 7000);
    setChatTimer(timer);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Collaborators online calculation
  const totalCollaborators = 2 + Object.keys(remotePeers).length;

  return (
    <div className="figma-app-container">
      {/* Top Figma Toolbar */}
      <div className="figma-toolbar">
        <div className="figma-toolbar-left">
          <div className="figma-logo-wrapper" title="Figma Workspace" onClick={() => setActiveTab('canvas')}>
            <FigmaLogo size={14} />
          </div>

          <div className="figma-file-info">
            <span className="figma-filename">Varun Sehgal — Portfolio System</span>
            <span className="figma-status-badge">Multiplayer Live</span>
          </div>

          {/* Navigation View Switcher */}
          <div className="figma-tabs">
            <button
              className={`figma-tab-btn ${activeTab === 'canvas' ? 'active' : ''}`}
              onClick={() => setActiveTab('canvas')}
              title="Collaborative Design Canvas"
            >
              <Layers size={13} />
              <span>Canvas View</span>
            </button>
            <button
              className={`figma-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
              title="Direct Figma Project Files"
            >
              <ExternalLink size={13} />
              <span>Project Files</span>
            </button>
          </div>
        </div>

        <div className="figma-toolbar-right">
          {/* Cursor Chat Button */}
          <button 
            className={`figma-chat-trigger-btn ${isChatInputOpen || activeUserChat ? 'active' : ''}`}
            onClick={() => {
              setIsChatInputOpen(!isChatInputOpen);
              setTimeout(() => chatInputRef.current?.focus(), 50);
            }}
            title="Cursor Chat (Press '/')"
          >
            <MessageSquare size={13} />
            <span>Chat (/)</span>
          </button>

          {/* Collaborative Avatar Stack */}
          <div className="figma-presence-stack" title={`${totalCollaborators} collaborators active in this file`}>
            {/* Local User Avatar */}
            <div 
              className="figma-presence-avatar local-avatar" 
              style={{ borderColor: userColor }}
              title={`${userName} (You) — Active`}
            >
              <span>{userName.trim().slice(0, 2).toUpperCase() || 'U'}</span>
              <span className="presence-ring-badge" style={{ backgroundColor: userColor }} />
            </div>

            {/* Varun Sehgal Avatar */}
            <div 
              className="figma-presence-avatar owner-avatar" 
              style={{ borderColor: '#A259FF' }}
              title="Varun Sehgal (Owner) — Editing"
            >
              <span>VS</span>
              <span className="presence-ring-badge" style={{ backgroundColor: '#A259FF' }} />
            </div>

            {/* Simulated Teammate Sarah */}
            <div 
              className="figma-presence-avatar peer-avatar" 
              style={{ borderColor: '#FF7262' }}
              title="Sarah Lin (Design Systems) — Viewing"
            >
              <span>SL</span>
              <span className="presence-ring-badge" style={{ backgroundColor: '#FF7262' }} />
            </div>

            {/* Real Remote Browser Tabs if connected */}
            {Object.entries(remotePeers).map(([id, peer], idx) => (
              <div 
                key={id} 
                className="figma-presence-avatar remote-tab-avatar"
                style={{ borderColor: peer.color }}
                title={`${peer.userName} (Tab #${idx + 2})`}
              >
                <span>{peer.userName.slice(0, 2).toUpperCase()}</span>
                <span className="presence-ring-badge" style={{ backgroundColor: peer.color }} />
              </div>
            ))}

            <div className="figma-presence-count">
              <span className="count-dot" />
              <span>{totalCollaborators} live</span>
            </div>
          </div>

          <button 
            className="figma-share-btn" 
            title="Share Workspace Link" 
            onClick={handleCopyLink}
          >
            {copied ? <Check size={13} /> : <Share2 size={13} />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {activeTab === 'canvas' ? (
        <div 
          className="figma-canvas-viewport" 
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Subtle Grid Dots Background */}
          <div className="figma-canvas-grid" />

          {/* Floating Canvas Quick Tips */}
          <div className="figma-canvas-banner">
            <span className="banner-pill">⚡ Multiplayer Sync Active</span>
            <span className="banner-text">
              Collaborating as <strong style={{ color: userColor }}>{userName}</strong>. Open this page in another tab to see real-time cursor sync! Press <kbd>/</kbd> to chat.
            </span>
          </div>

          {/* Interactive Figma Frames / Artboards */}
          <div className="figma-artboards-grid">
            {/* Frame 1: Mobile App Prototype */}
            <div 
              className={`figma-frame-card ${selectedFrame === 'frame-interview' ? 'selected' : ''} ${varunCursor.selectedId === 'frame-interview' ? 'peer-selected' : ''}`}
              onClick={() => setSelectedFrame('frame-interview')}
            >
              <div className="frame-header-label">
                <span className="frame-title">📱 Frame 1: AI Interview Prep Prototype</span>
                <span className="frame-meta">380 × 520 • Auto-layout</span>
              </div>

              <div className="frame-inner-ui mobile-ui-mockup">
                <div className="mockup-top-bar">
                  <span className="mockup-time">9:41</span>
                  <div className="mockup-pill-status">● Live Session</div>
                </div>

                <div className="mockup-question-box">
                  <span className="mockup-badge">System Design Question</span>
                  <h4>Design a low-latency real-time cursor broadcast pipeline</h4>
                  <p>How would you scale WebSocket connections to 100k concurrent designers?</p>
                </div>

                <div className="mockup-waveform">
                  <div className="wave-bar h-3" />
                  <div className="wave-bar h-5" />
                  <div className="wave-bar h-8" />
                  <div className="wave-bar h-10 active" />
                  <div className="wave-bar h-7 active" />
                  <div className="wave-bar h-4" />
                  <div className="wave-bar h-6" />
                </div>

                <div className="mockup-score-card">
                  <div className="score-val">96%</div>
                  <div className="score-label">
                    <strong>Architecture Score</strong>
                    <span>Strong understanding of CRDT & OT protocols</span>
                  </div>
                </div>

                <div className="mockup-btn-row">
                  <button className="mockup-primary-btn">Accept Feedback</button>
                  <button className="mockup-secondary-btn">Next Question ➔</button>
                </div>
              </div>

              {/* Selection Border Handles */}
              {selectedFrame === 'frame-interview' && (
                <div className="figma-frame-handles local-handles">
                  <div className="f-handle tl" /><div className="f-handle tr" />
                  <div className="f-handle bl" /><div className="f-handle br" />
                  <div className="f-dimension-tag" style={{ backgroundColor: userColor }}>
                    {userName}: Frame 1 (Selected)
                  </div>
                </div>
              )}
            </div>

            {/* Frame 2: Cloud Telemetry Dashboard */}
            <div 
              className={`figma-frame-card ${selectedFrame === 'frame-cloud' ? 'selected' : ''} ${varunCursor.selectedId === 'frame-cloud' ? 'peer-selected' : ''}`}
              onClick={() => setSelectedFrame('frame-cloud')}
            >
              <div className="frame-header-label">
                <span className="frame-title">💻 Frame 2: Nebula Cloud Architecture</span>
                <span className="frame-meta">420 × 520 • Responsive Grid</span>
              </div>

              <div className="frame-inner-ui cloud-ui-mockup">
                <div className="cloud-stats-row">
                  <div className="cloud-stat-card">
                    <span className="stat-num">14.2 ms</span>
                    <span className="stat-sub">Global P99 Latency</span>
                  </div>
                  <div className="cloud-stat-card">
                    <span className="stat-num">99.99%</span>
                    <span className="stat-sub">SLA Uptime</span>
                  </div>
                </div>

                <div className="cloud-nodes-list">
                  <div className="cloud-node-item active">
                    <Activity size={14} className="node-icon green" />
                    <div>
                      <strong>us-east-1 (Primary Gateway)</strong>
                      <span>24 pods • 18% CPU • 0 packet drop</span>
                    </div>
                  </div>
                  <div className="cloud-node-item active">
                    <Activity size={14} className="node-icon green" />
                    <div>
                      <strong>eu-west-1 (Edge Ingress)</strong>
                      <span>16 pods • 22% CPU • Healthy</span>
                    </div>
                  </div>
                  <div className="cloud-node-item">
                    <Cpu size={14} className="node-icon purple" />
                    <div>
                      <strong>ap-south-1 (Multiplayer Mesh)</strong>
                      <span>12 pods • Auto-scaling active</span>
                    </div>
                  </div>
                </div>

                <div className="cloud-deploy-terminal">
                  <span className="term-prompt">$</span> git push origin main ➔ Automated canary deploy healthy.
                </div>
              </div>

              {selectedFrame === 'frame-cloud' && (
                <div className="figma-frame-handles local-handles">
                  <div className="f-handle tl" /><div className="f-handle tr" />
                  <div className="f-handle bl" /><div className="f-handle br" />
                  <div className="f-dimension-tag" style={{ backgroundColor: userColor }}>
                    {userName}: Frame 2 (Selected)
                  </div>
                </div>
              )}
            </div>

            {/* Frame 3: Design Tokens & Components */}
            <div 
              className={`figma-frame-card ${selectedFrame === 'frame-tokens' ? 'selected' : ''} ${varunCursor.selectedId === 'frame-tokens' ? 'peer-selected' : ''}`}
              onClick={() => setSelectedFrame('frame-tokens')}
            >
              <div className="frame-header-label">
                <span className="frame-title">🎨 Frame 3: Design Tokens & System</span>
                <span className="frame-meta">380 × 340 • Design Library</span>
              </div>

              <div className="frame-inner-ui tokens-ui-mockup">
                <div className="color-swatches-grid">
                  <div className="swatch" style={{ background: '#1ABCFE' }} title="Figma Cyan">
                    <span>#1ABCFE</span>
                  </div>
                  <div className="swatch" style={{ background: '#A259FF' }} title="Figma Purple">
                    <span>#A259FF</span>
                  </div>
                  <div className="swatch" style={{ background: '#0ACF83' }} title="Figma Green">
                    <span>#0ACF83</span>
                  </div>
                  <div className="swatch" style={{ background: '#FF7262' }} title="Figma Coral">
                    <span>#FF7262</span>
                  </div>
                </div>

                <div className="components-demo-list">
                  <button className="demo-btn-primary">Primary Action</button>
                  <button className="demo-btn-glass">Glass Pill</button>
                  <div className="demo-toggle-switch active">
                    <div className="toggle-thumb" />
                  </div>
                </div>
              </div>

              {selectedFrame === 'frame-tokens' && (
                <div className="figma-frame-handles local-handles">
                  <div className="f-handle tl" /><div className="f-handle tr" />
                  <div className="f-handle bl" /><div className="f-handle br" />
                  <div className="f-dimension-tag" style={{ backgroundColor: userColor }}>
                    {userName}: Frame 3 (Selected)
                  </div>
                </div>
              )}
            </div>

            {/* Frame 4: Krypton Webhooks */}
            <div 
              className={`figma-frame-card ${selectedFrame === 'frame-krypton' ? 'selected' : ''} ${varunCursor.selectedId === 'frame-krypton' ? 'peer-selected' : ''}`}
              onClick={() => setSelectedFrame('frame-krypton')}
            >
              <div className="frame-header-label">
                <span className="frame-title">💳 Frame 4: Krypton Idempotent Webhooks</span>
                <span className="frame-meta">420 × 340 • Backend Architecture</span>
              </div>

              <div className="frame-inner-ui krypton-ui-mockup">
                <div className="krypton-json-box">
                  <pre>
{`{
  "event": "payment.settled",
  "idempotency_key": "idemp_89231f8a",
  "status": "confirmed",
  "latency_ms": 11.4
}`}
                  </pre>
                </div>
                <div className="krypton-badge-pill">
                  <span>✓ 100% Guaranteed Deduplication</span>
                </div>
              </div>

              {selectedFrame === 'frame-krypton' && (
                <div className="figma-frame-handles local-handles">
                  <div className="f-handle tl" /><div className="f-handle tr" />
                  <div className="f-handle bl" /><div className="f-handle br" />
                  <div className="f-dimension-tag" style={{ backgroundColor: userColor }}>
                    {userName}: Frame 4 (Selected)
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* COLLABORATOR CURSORS LAYER */}
          <div className="figma-cursors-layer">
            {/* 1. Local User Cursor (Follows mouse inside canvas) */}
            {localMouse.isInside && (
              <div 
                className="figma-live-cursor user-cursor"
                style={{
                  transform: `translate3d(${localMouse.x}px, ${localMouse.y}px, 0)`
                }}
              >
                <FigmaCursorPointer color={userColor} />
                <div className="cursor-label-pill" style={{ backgroundColor: userColor }}>
                  <span>{userName} (You)</span>
                </div>

                {/* Floating User Cursor Chat Bubble */}
                {activeUserChat && (
                  <div className="figma-chat-bubble local-chat">
                    <span>{activeUserChat}</span>
                  </div>
                )}
              </div>
            )}

            {/* 2. Peer Collaborator "Varun Sehgal (Owner)" */}
            <div 
              className="figma-live-cursor peer-cursor varun-cursor"
              style={{
                transform: `translate3d(${varunCursor.x}px, ${varunCursor.y}px, 0)`
              }}
            >
              <FigmaCursorPointer color="#A259FF" />
              <div className="cursor-label-pill" style={{ backgroundColor: '#A259FF' }}>
                <span>Varun Sehgal (Owner)</span>
              </div>

              {varunCursor.chat && (
                <div className="figma-chat-bubble peer-chat">
                  <span>{varunCursor.chat}</span>
                </div>
              )}
            </div>

            {/* 3. Real Remote Tabs connected via BroadcastChannel */}
            {Object.entries(remotePeers).map(([id, peer]) => (
              <div
                key={id}
                className="figma-live-cursor peer-cursor remote-tab-cursor"
                style={{
                  transform: `translate3d(${peer.x}px, ${peer.y}px, 0)`
                }}
              >
                <FigmaCursorPointer color={peer.color} />
                <div className="cursor-label-pill" style={{ backgroundColor: peer.color }}>
                  <span>{peer.userName}</span>
                </div>

                {peer.chat && (
                  <div className="figma-chat-bubble remote-chat">
                    <span>{peer.chat}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Floating Figma Cursor Chat Input (triggered via '/' or toolbar button) */}
          {isChatInputOpen && (
            <div 
              className="figma-cursor-chat-overlay"
              style={{
                left: localMouse.isInside ? `${Math.min(localMouse.x + 20, window.innerWidth - 300)}px` : '40%',
                top: localMouse.isInside ? `${Math.min(localMouse.y - 15, window.innerHeight - 150)}px` : '45%'
              }}
            >
              <form onSubmit={handleSendChat} className="cursor-chat-form">
                <input 
                  ref={chatInputRef}
                  type="text"
                  className="cursor-chat-input"
                  placeholder="Say something with your cursor... (Enter to send)"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  maxLength={60}
                />
                <button type="submit" className="cursor-chat-submit" title="Send message">
                  <Send size={12} />
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        /* Projects List Tab */
        <div className="figma-projects-viewport">
          <div className="figma-projects-header">
            <h2>Varun Sehgal — Featured Figma Prototypes</h2>
            <p>Direct links to verified Figma design files and component libraries created by Varun.</p>
          </div>

          <div className="figma-direct-links-grid">
            {FIGMA_PROJECT_LINKS.map((proj, idx) => (
              <div key={idx} className="figma-project-card">
                <div className="proj-card-top">
                  <span className="proj-badge">{proj.badge}</span>
                  <a href={proj.url} target="_blank" rel="noreferrer" className="proj-link-icon">
                    <ExternalLink size={14} />
                  </a>
                </div>
                <h3>{proj.name}</h3>
                <p>{proj.desc}</p>
                <div className="proj-card-actions">
                  <a 
                    href={proj.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="proj-open-btn"
                  >
                    Open in Figma ➔
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FigmaApp;
