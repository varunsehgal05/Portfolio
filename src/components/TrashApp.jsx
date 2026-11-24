import React, { useState, useEffect, useRef } from 'react';
import { 
  Trash2, 
  RotateCcw, 
  Search, 
  LayoutGrid, 
  List, 
  FileCode, 
  FileText, 
  Archive, 
  AlertTriangle, 
  Flame, 
  Ghost, 
  ExternalLink, 
  X, 
  Sparkles,
  Check,
  FolderOpen,
  Coffee,
  Bot,
  MousePointer2,
  Briefcase,
  FileCheck,
  Send,
  ShieldAlert,
  ArrowRight,
  Paperclip
} from 'lucide-react';
import './TrashApp.css';

const INITIAL_TRASH_ITEMS = [
  {
    id: 'trash-1',
    name: 'final_v2_FINAL_DEFINITELY_FINAL_v4_for_client.fig',
    type: 'Figma Design File',
    size: '148.2 MB',
    dateDeleted: 'Today at 3:42 PM',
    tag: '#client-revision',
    tagColor: '#ec4899',
    icon: 'figma',
    preview: {
      title: 'Client Revision Hell (v4.2.9)',
      notes: [
        '• "Can we make the logo 400% bigger and also somehow take up less space?"',
        '• "We really love the clean white minimalism, but can you make it colorful and flash neon?"',
        '• "Let\'s revert back to v1 from 3 weeks ago that we rejected."'
      ],
      verdict: 'Dumped into trash to preserve sanity.'
    }
  },
  {
    id: 'trash-2',
    name: 'node_modules.tar.gz',
    type: 'Heaviest Object in the Universe',
    size: '847.4 GB',
    dateDeleted: 'Yesterday at 11:20 PM',
    tag: '#black-hole',
    tagColor: '#a855f7',
    icon: 'archive',
    preview: {
      title: 'The Great node_modules Singularity',
      notes: [
        '• Contains 42,918 nested dependencies including left-pad and is-odd.',
        '• Consumes more mass than Jupiter and slows the Earth\'s orbital rotation by 2 milliseconds.',
        '• `rm -rf node_modules` took 14 minutes and sounded like an airplane takeoff.'
      ],
      verdict: 'Incinerated to free up disk space.'
    }
  },
  {
    id: 'trash-3',
    name: 'imposter_syndrome.exe',
    type: 'Toxic Malicious Executable',
    size: '0 KB',
    dateDeleted: 'Permanent Delete',
    tag: '#shredded',
    tagColor: '#10b981',
    icon: 'ghost',
    preview: {
      title: 'Imposter Syndrome (Quarantined & Shredded)',
      notes: [
        '• Tried to whisper: "Are you really qualified to architect full-scale design systems?"',
        '• Counter-evidence: 3+ years experience, 50+ components, -30% drop-off rate, 800+ hackathon developers.',
        '• Result: Executable permanently wiped. Confidence restored.'
      ],
      verdict: 'Zero trace remaining.'
    }
  },
  {
    id: 'trash-4',
    name: 'bootstrap_v3_glyphicons.css',
    type: 'Legacy Stylesheet (2014)',
    size: '2.4 MB',
    dateDeleted: '3 days ago',
    tag: '#nostalgia',
    tagColor: '#f59e0b',
    icon: 'code',
    preview: {
      title: 'CSS Archaeology: The Float Era',
      notes: [
        '• Remember `.col-xs-12 .col-md-6 .col-lg-4` and `.clearfix` everywhere?',
        '• Glyphicons before SVGs were cool.',
        '• Thrown away in favor of Tailwind CSS and modern CSS Grid.'
      ],
      verdict: 'Honorable discharge to the museum of web history.'
    }
  },
  {
    id: 'trash-5',
    name: 'lorem_ipsum_generator.js',
    type: 'Lazy Copy Script',
    size: '42 KB',
    dateDeleted: 'Last week',
    tag: '#ux-design',
    tagColor: '#0ea5e9',
    icon: 'text',
    preview: {
      title: 'Death of Lorem Ipsum',
      notes: [
        '• Real UX designers write intentional, context-rich product copy.',
        '• No user ever signed up because of "Dolor sit amet consectetur adipiscing elit".',
        '• Replaced with real conversion copywriting.'
      ],
      verdict: 'Replaced by actual user-tested microcopy.'
    }
  },
  {
    id: 'trash-6',
    name: 'unrealistic_deadline_spec.pdf',
    type: 'Delusional Management Brief',
    size: '1.2 MB',
    dateDeleted: 'Last Monday',
    tag: '#impossible',
    tagColor: '#ef4444',
    icon: 'warning',
    preview: {
      title: 'The "We Need Uber for Cats by Tomorrow Morning" Brief',
      notes: [
        '• Scope: Full mobile app, web dashboard, AI algorithm, payment gateway, and patent application.',
        '• Budget: $0 ("Great exposure and equity in an idea!").',
        '• Timeline: 48 hours.'
      ],
      verdict: 'Politely declined and sent directly to the shredder.'
    }
  },
  {
    id: 'trash-7',
    name: 'create-react-app_template.zip',
    type: 'Deprecated Build Boilerplate',
    size: '380 MB',
    dateDeleted: '2 weeks ago',
    tag: '#rip-cra',
    tagColor: '#64748b',
    icon: 'archive',
    preview: {
      title: 'Rest in Peace: Create React App',
      notes: [
        '• Cold boot time: 45 seconds.',
        '• Memory usage: 100% of fans spinning at maximum RPM.',
        '• Replaced by Vite 6: Instant 80ms HMR and lightning-fast builds.'
      ],
      verdict: 'Upgraded to Vite.'
    }
  },
  {
    id: 'trash-8',
    name: 'internet_explorer_6_compatibility_hacks.css',
    type: 'Trauma Artifact',
    size: '512 KB',
    dateDeleted: 'May it never return',
    tag: '#nightmare',
    tagColor: '#f43f5e',
    icon: 'code',
    preview: {
      title: 'ActiveX and Conditional Comments Trauma',
      notes: [
        '• `*html body { zoom: 1; }`',
        '• PNG transparency fix via DirectX AlphaImageLoader filter.',
        '• Double-margin float bugs.'
      ],
      verdict: 'Permanently deleted. Modern web standards won.'
    }
  }
];

// Helper: Procedural mechanical mouse click sound
const playMechanicalClick = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    
    // High crisp snap
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(1850, now);
    osc1.frequency.exponentialRampToValueAtTime(750, now + 0.035);
    gain1.gain.setValueAtTime(0.35, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.035);

    // Subtle tactile switch rebound
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(260, now + 0.015);
    osc2.frequency.exponentialRampToValueAtTime(80, now + 0.05);
    gain2.gain.setValueAtTime(0.2, now + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.015);
    osc2.stop(now + 0.05);
  } catch {}
};

// Helper: Clippy retro chime
const playAIChime = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.08, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.22);
    });
  } catch {}
};

const TrashApp = ({ onClose, onOpenApp }) => {
  const [items, setItems] = useState(INITIAL_TRASH_ITEMS);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [activePreviewItem, setActivePreviewItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isShredding, setIsShredding] = useState(false);
  const [bannerNotice, setBannerNotice] = useState(null);

  // Clippy Assistant & Auto-Close States
  const [aiCountdown, setAiCountdown] = useState(6);
  const [isAICountdownCancelled, setIsAICountdownCancelled] = useState(false);
  const countdownTimerRef = useRef(null);

  // 1. Initial Mount: Clippy welcomes user & auto-close countdown is initiated
  useEffect(() => {
    playAIChime();
    const msg = "It looks like you opened the Trash! 📎 You are not here to see my trash! 👀 You're here to explore my portfolio and hire me! Auto-closing in 6s...";
    window.dispatchEvent(new CustomEvent('varunos-clippy-speak', {
      detail: {
        text: msg,
        animation: "GetAttention",
        highlightDuration: 6000,
        hold: false,
        actions: [
          { label: "View Portfolio (Figma) →", primary: true, appId: "figma" },
          { label: "View Resume", appId: "resume" }
        ]
      }
    }));
    return () => {
      if (countdownTimerRef.current) clearTimeout(countdownTimerRef.current);
      window.dispatchEvent(new CustomEvent('varunos-clippy-hide'));
    };
  }, []);

  // 2. Auto-close countdown effect: ticks down from 6s to 0s, then redirects to portfolio
  useEffect(() => {
    if (isAICountdownCancelled) {
      if (countdownTimerRef.current) clearTimeout(countdownTimerRef.current);
      return;
    }

    if (aiCountdown <= 0) {
      if (countdownTimerRef.current) clearTimeout(countdownTimerRef.current);
      handleAutoClose();
      return;
    }

    countdownTimerRef.current = setTimeout(() => {
      setAiCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (countdownTimerRef.current) clearTimeout(countdownTimerRef.current);
    };
  }, [aiCountdown, isAICountdownCancelled]);

  const handleAutoClose = () => {
    playAIChime();
    window.dispatchEvent(new CustomEvent('varunos-clippy-speak', {
      detail: {
        text: "Closing Trash! Let's explore Varun's real work in Figma and Projects! 📎",
        animation: "Explain",
        highlightDuration: 4000,
        hold: false
      }
    }));
    if (onClose) {
      onClose();
    }
    setTimeout(() => {
      if (onOpenApp) {
        onOpenApp('figma');
      }
    }, 300);
  };

  const cancelAICountdown = () => {
    if (countdownTimerRef.current) clearTimeout(countdownTimerRef.current);
    setIsAICountdownCancelled(true);
  };

  const resumeAICountdown = () => {
    setIsAICountdownCancelled(false);
    setAiCountdown(6);
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedItem = items.find(i => i.id === selectedItemId);

  // Procedural Web Audio Trash Shredding Sound
  const playTrashSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const bufferSize = ctx.sampleRate * 0.25;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(2, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.24);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    } catch {}
  };

  // Empty Trash Action
  const handleEmptyTrash = () => {
    if (items.length === 0) return;
    setIsShredding(true);
    playTrashSound();

    setTimeout(() => {
      setItems([]);
      setSelectedItemId(null);
      setIsShredding(false);
      setBannerNotice('All items permanently shredded! Clean workspace restored.');
      setTimeout(() => setBannerNotice(null), 4000);
    }, 600);
  };

  // Restore Trash Action
  const handleRestoreAll = () => {
    playTrashSound();
    setItems(INITIAL_TRASH_ITEMS);
    setBannerNotice('All humorous artifacts restored to the Trash bin!');
    setTimeout(() => setBannerNotice(null), 3000);
  };

  const handleItemClick = (item) => {
    setSelectedItemId(item.id);
  };

  // Opening File: View Item Modal
  const handleItemDoubleClick = (item) => {
    setActivePreviewItem(item);
    playAIChime();
    window.dispatchEvent(new CustomEvent('varunos-clippy-speak', {
      detail: {
        text: `Inspecting ${item.name}! 📎 You're here to explore my portfolio and hire me!`,
        animation: "Explain",
        highlightDuration: 6000,
        hold: false,
        actions: [
          { label: "Open Portfolio (Figma) →", primary: true, appId: "figma" },
          { label: "Open Resume", appId: "resume" }
        ]
      }
    }));
  };

  // Clippy close sequence
  const startClippyCloseSequence = handleAutoClose;

  const renderItemIcon = (type, color) => {
    switch (type) {
      case 'figma':
        return (
          <div className="trash-icon-wrap" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' }}>
            <span style={{ fontWeight: 800, fontSize: '13px' }}>F</span>
          </div>
        );
      case 'archive':
        return (
          <div className="trash-icon-wrap" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
            <Archive size={18} />
          </div>
        );
      case 'ghost':
        return (
          <div className="trash-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <Ghost size={18} />
          </div>
        );
      case 'warning':
        return (
          <div className="trash-icon-wrap" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
            <AlertTriangle size={18} />
          </div>
        );
      case 'text':
        return (
          <div className="trash-icon-wrap" style={{ background: 'rgba(14, 165, 233, 0.15)', color: '#0ea5e9' }}>
            <FileText size={18} />
          </div>
        );
      case 'code':
      default:
        return (
          <div className="trash-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
            <FileCode size={18} />
          </div>
        );
    }
  };

  return (
    <div className="trash-app-container">
      {/* Top Toolbar */}
      <header className="trash-toolbar">
        <div className="trash-toolbar-left">
          <div className="trash-title-badge">
            <Trash2 size={14} className="text-zinc-400" />
            <span className="trash-title-text">Trash</span>
            <span className="trash-count-pill">{items.length} items</span>
          </div>

          {/* View Mode Toggle */}
          <div className="trash-view-toggle">
            <button
              type="button"
              className={`trash-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid size={13} />
            </button>
            <button
              type="button"
              className={`trash-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List size={13} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="trash-search-wrap">
          <Search size={12} className="trash-search-icon" />
          <input
            type="text"
            className="trash-search-input"
            placeholder="Search discarded files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button type="button" className="trash-search-clear" onClick={() => setSearchQuery('')}>
              ×
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="trash-toolbar-right">
          {items.length > 0 ? (
            <button
              type="button"
              className="trash-action-btn empty-btn"
              onClick={handleEmptyTrash}
              disabled={isShredding}
            >
              <Flame size={13} />
              <span>{isShredding ? 'Shredding...' : 'Empty Trash'}</span>
            </button>
          ) : (
            <button
              type="button"
              className="trash-action-btn restore-btn"
              onClick={handleRestoreAll}
            >
              <RotateCcw size={13} />
              <span>Restore Humor Items</span>
            </button>
          )}
        </div>
      </header>

      {/* Clippy Takeover Auto-Close Countdown Bar */}
      <div className="clippy-takeover-bar">
        <div className="clippy-takeover-info">
          <Paperclip size={13} className={!isAICountdownCancelled ? "text-amber-400 animate-bounce" : "text-zinc-500"} />
          {!isAICountdownCancelled ? (
            <span>
              Clippy auto-closing Trash in <strong>{aiCountdown}s</strong> to redirect to portfolio...
            </span>
          ) : (
            <span className="text-zinc-400">Auto-close paused. Take your time browsing!</span>
          )}
        </div>
        <div className="clippy-takeover-btns">
          {!isAICountdownCancelled ? (
            <button
              type="button"
              className="clippy-pause-btn"
              onClick={cancelAICountdown}
              title="Pause auto-close countdown"
            >
              Keep Browsing
            </button>
          ) : (
            <button
              type="button"
              className="clippy-pause-btn"
              onClick={resumeAICountdown}
              title="Resume auto-close countdown"
            >
              Resume Auto-Close
            </button>
          )}
          <button
            type="button"
            className="clippy-close-now-btn"
            onClick={handleAutoClose}
            title="Close Trash now and open Portfolio"
          >
            📎 Close Now
          </button>
        </div>
      </div>

      {/* Temporary Notice Banner */}
      {bannerNotice && (
        <div className="trash-banner-notice">
          <Sparkles size={13} className="text-amber-400" />
          <span>{bannerNotice}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="trash-body">
        {filteredItems.length > 0 ? (
          viewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="trash-grid">
              {filteredItems.map((item) => {
                const isSelected = selectedItemId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`trash-grid-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleItemClick(item)}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                    title="Double-click to open file"
                  >
                    <div className="trash-card-icon-area">
                      {renderItemIcon(item.icon, item.tagColor)}
                      <span className="trash-card-tag" style={{ borderColor: item.tagColor, color: item.tagColor }}>
                        {item.tag}
                      </span>
                    </div>

                    <div className="trash-card-details">
                      <span className="trash-card-name" title={item.name}>{item.name}</span>
                      <div className="trash-card-sub">
                        <span>{item.size}</span>
                        <span className="dot-sep">•</span>
                        <span>{item.type}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="trash-list-table">
              <div className="trash-list-header">
                <span className="col-name">Name</span>
                <span className="col-tag">Tag</span>
                <span className="col-date">Date Deleted</span>
                <span className="col-size">Size</span>
              </div>
              <div className="trash-list-rows">
                {filteredItems.map((item) => {
                  const isSelected = selectedItemId === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`trash-list-row ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleItemClick(item)}
                      onDoubleClick={() => handleItemDoubleClick(item)}
                      title="Double-click to open file"
                    >
                      <div className="col-name cell-name">
                        {renderItemIcon(item.icon, item.tagColor)}
                        <span className="list-item-name">{item.name}</span>
                      </div>
                      <div className="col-tag">
                        <span className="trash-card-tag" style={{ borderColor: item.tagColor, color: item.tagColor }}>
                          {item.tag}
                        </span>
                      </div>
                      <div className="col-date">{item.dateDeleted}</div>
                      <div className="col-size">{item.size}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        ) : (
          /* EMPTY STATE */
          <div className="trash-empty-showcase">
            <div className="trash-empty-sparkle-circle">
              <Sparkles size={32} className="sparkle-gold" />
            </div>
            <h3 className="empty-headline">Trash is Pristine Clean</h3>
            <p className="empty-sub">
              Zero clutter, zero tech debt. Varun writes 100% modular, performant code.
            </p>
            <div className="trash-empty-buttons-row">
              <button
                type="button"
                className="trash-restore-empty-btn"
                onClick={handleRestoreAll}
              >
                <RotateCcw size={13} />
                <span>Spawn Hilarious Developer Artifacts</span>
              </button>
              <button
                type="button"
                className="trash-coffee-empty-btn"
                onClick={() => window.dispatchEvent(new CustomEvent('varunos-open-coffee-modal'))}
              >
                <Coffee size={13} />
                <span>Fuel Varun with Coffee ☕</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Statusbar */}
      <footer className="trash-statusbar">
        <span className="status-hint">💡 Double-click any file to inspect details</span>
        {selectedItem && (
          <span className="status-selected">
            Selected: <strong>{selectedItem.name}</strong> ({selectedItem.size})
          </span>
        )}
      </footer>

      {/* QUICK LOOK MODAL */}
      {activePreviewItem && (
        <div className="trash-modal-backdrop" onClick={() => setActivePreviewItem(null)}>
          <div className="trash-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Standard Modal File Header */}
            <div className="trash-modal-header">
              <div className="modal-title-left">
                {renderItemIcon(activePreviewItem.icon, activePreviewItem.tagColor)}
                <div>
                  <h4 className="modal-item-name">{activePreviewItem.name}</h4>
                  <span className="modal-item-meta">{activePreviewItem.type} • {activePreviewItem.size}</span>
                </div>
              </div>
              <button 
                type="button" 
                className="trash-modal-close"
                onClick={() => setActivePreviewItem(null)}
                title="Close Preview"
              >
                <X size={14} />
              </button>
            </div>

            {/* Modal Body with developer joke notes */}
            <div className="trash-modal-body">
              <div className="modal-preview-box">
                <h5 className="preview-box-title">{activePreviewItem.preview.title}</h5>
                <ul className="preview-notes-list">
                  {activePreviewItem.preview.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
                <div className="preview-verdict">
                  <strong>Verdict:</strong> {activePreviewItem.preview.verdict}
                </div>
              </div>
            </div>

            <div className="trash-modal-footer">
              <div className="modal-footer-left">
                <span className="modal-tag-pill" style={{ borderColor: activePreviewItem.tagColor, color: activePreviewItem.tagColor }}>
                  {activePreviewItem.tag}
                </span>

                {/* Sleek Auto-Close Countdown Pill */}
                <div className="modal-autoclose-pill">
                  <Paperclip size={12} className={!isAICountdownCancelled ? "text-amber-400 animate-bounce" : "text-zinc-500"} />
                  {!isAICountdownCancelled ? (
                    <span className="autoclose-text">
                      Auto-closing in <strong>{aiCountdown}s</strong>
                    </span>
                  ) : (
                    <span className="autoclose-text paused">Auto-close paused</span>
                  )}
                  {!isAICountdownCancelled ? (
                    <button
                      type="button"
                      className="modal-autoclose-toggle"
                      onClick={cancelAICountdown}
                      title="Pause auto-close countdown"
                    >
                      Keep Open
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="modal-autoclose-toggle resume"
                      onClick={resumeAICountdown}
                      title="Resume auto-close countdown"
                    >
                      Resume
                    </button>
                  )}
                </div>
              </div>

              <div className="modal-footer-right">
                <button
                  type="button"
                  className="modal-clippy-now-btn"
                  onClick={handleAutoClose}
                  title="Close Trash with Clippy"
                >
                  <Paperclip size={12} />
                  <span>Close Now</span>
                </button>
                <button 
                  type="button" 
                  className="modal-done-btn"
                  onClick={() => {
                    cancelAICountdown();
                    setActivePreviewItem(null);
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrashApp;
