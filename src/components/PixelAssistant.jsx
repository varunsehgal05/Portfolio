import { useState, useEffect, useRef } from 'react';
import { initAgent } from "clippyjs";
import { Clippy } from "clippyjs/agents";
import { Send, X, ExternalLink, Download, Folder, Sparkles, Volume2, VolumeX } from 'lucide-react';
import './PixelAssistant.css';

const hints = [
  "Click me to ask anything about Varun! 💬",
  "Press ALT + 1, 2, or 3 to change the wallpaper.",
  "Check out my resume or projects!",
  "Double click any desktop icon to open apps."
];

const suggestionChips = [
  { label: "🛠️ Tech Skills", query: "What are Varun's technical skills and stack?" },
  { label: "💼 Work Experience", query: "Tell me about Varun's work experience" },
  { label: "🚀 Projects", query: "What projects has Varun built?" },
  { label: "🎓 Education", query: "Where did Varun study?" },
  { label: "📬 Contact & Hire", query: "How can I contact or hire Varun?" },
  { label: "📄 Resume PDF", query: "Can I download Varun's resume?" }
];

const getAnswerForQuery = (query) => {
  const q = query.toLowerCase().trim();

  if (/skill|tech|stack|language|figma|design|ui|ux|prototype|react|next|typescript|tailwind/.test(q)) {
    return {
      topic: "Skills & Design Stack",
      answer: "Varun specializes in UI/UX & Product Design with modern prototyping workflows:\n• **Design Tools:** Figma, Figma AI, Adobe XD, Photoshop, Illustrator, FigJam\n• **AI Tools:** Uizard, Galileo AI, Visily, Figma Magician, Figma Automator\n• **Core UX:** Wireframing, Rapid Prototyping, User Research, Usability Testing, Design Systems\n• **Frontend & Tech:** React.js, Next.js, TypeScript, Tailwind CSS, HTML5/CSS3, Git",
      path: "Resume > SKILLS",
      appId: "resume",
      appName: "Resume App",
      actionText: "Open Resume App",
      animation: "GetTechy"
    };
  }

  if (/experience|work|job|intern|unievent|assemble|knaptix|career|freelance/.test(q)) {
    return {
      topic: "Work Experience",
      answer: "Varun has 3+ years experience delivering SaaS and AI products:\n• **UI/UX Designer Intern** at **UniEvent** (Jun 2026 – Nov 2026): Designed user-centric experiences.\n• **Assistant Head of Operations** at **Assemble** (Aug 2025 – Jan 2026): Esports tournament execution.\n• **UI/UX Designer Intern** at **Knaptix Ventures** (Jun 2025 – Aug 2025): 5+ UI/UX interfaces with 40% user satisfaction increase.\n• **Freelance UI/UX Designer** (Jan 2024 – Present): 10+ projects with 95% retention.",
      path: "Resume > PROFESSIONAL EXPERIENCE",
      appId: "resume",
      appName: "Resume App",
      actionText: "Open Resume App",
      animation: "Explain"
    };
  }

  if (/project|built|portfolio|app|figma|interview|eventflow|expensify|codesrijan/.test(q)) {
    return {
      topic: "Featured Projects",
      answer: "Varun has designed several high-impact product interfaces:\n• **AI Interview & Prep Platform:** AI SaaS with security & evaluation grading modules.\n• **EventFlow (Event Ticketing SaaS):** 4-step flow reducing drop-off by 30% with 50+ component design system.\n• **Expensify (Budget Tracker):** 17+ screens optimized for under-5-second transaction logging.\n• **CodeSrijan Hackathon:** Complete digital platform and branding for 200+ participants.",
      path: "Figma App & Finder App",
      appId: "figma",
      appName: "Figma App",
      actionText: "Open Figma Showcase",
      secondaryPath: "Resume > DESIGN PROJECTS",
      secondaryAppId: "resume",
      animation: "Congratulate"
    };
  }

  if (/education|college|degree|juet|jaypee|study|university|school|btech|graduat/.test(q)) {
    return {
      topic: "Education",
      answer: "Varun is pursuing his **Bachelor of Technology in Computer Science & Engineering (CSE)** at **Jaypee University of Engineering and Technology (JUET)** (Aug 2023 – May 2027) in Guna, India.",
      path: "Resume > EDUCATION",
      appId: "resume",
      appName: "Resume App",
      actionText: "Open Resume App",
      animation: "Writing"
    };
  }

  if (/contact|email|phone|hire|call|reach|message|linkedin|github|behance|social|freelance|collaborat/.test(q)) {
    return {
      topic: "Contact & Connect",
      answer: "You can reach Varun directly:\n• **Email:** varun.sehgal02@gmail.com\n• **Phone:** +91 9399361193\n• **Location:** Gwalior, Madhya Pradesh, India\n• **GitHub:** github.com/varunsehgal05\n• **LinkedIn:** linkedin.com/in/varunsehgal02\n• **Behance:** behance.net/varunsehgal3\n• **Portfolio:** varunsehgal.runs-on.dev\nVarun is open for **Full-time UI/UX roles** and **Freelance projects**!",
      path: "Contact > compose_message.exe",
      appId: "contact",
      appName: "Contact App",
      actionText: "Open Contact Form",
      animation: "SendMail"
    };
  }

  if (/resume|cv|pdf|download/.test(q)) {
    return {
      topic: "Resume & CV",
      answer: "You can view Varun's complete interactive ATS-optimized resume right here, or download the official PDF directly.",
      path: "Resume > Varun_Sehgal_Resume.pdf",
      appId: "resume",
      appName: "Resume App",
      actionText: "Open Resume App",
      downloadUrl: "/Varun_Sehgal_Resume_Updated.pdf",
      animation: "Save"
    };
  }

  if (/wallpaper|theme|shortcut|background|alt/.test(q)) {
    return {
      topic: "Desktop Shortcuts & Wallpapers",
      answer: "Here are some cool shortcuts in VarunOS:\n• **Alt + 1**: macOS Monterey Wallpaper\n• **Alt + 2**: Abstract Blue Wallpaper\n• **Alt + 3**: Big Sur Abstract Wallpaper\n• **Drag Clippy**: Click & drag me anywhere on the screen!",
      path: "VarunOS > Desktop Settings (Alt + 1 / 2 / 3)",
      animation: "GetWizardy"
    };
  }

  // Default / About Varun
  return {
    topic: "About Varun",
    answer: "Varun Sehgal is a **UI/UX Designer & Product Designer** with 3+ years experience delivering SaaS and AI product experiences. He studies CSE at Jaypee University of Engineering and Technology (JUET) and has designed platforms including AI Interview Prep, EventFlow, and Expensify.\n\nWhat would you like to explore?",
    path: "Resume App & Contact App",
    appId: "resume",
    appName: "Resume App",
    actionText: "Explore Resume",
    secondaryAppId: "contact",
    animation: "Greeting"
  };
};

const renderFormattedText = (text) => {
  if (!text) return null;
  return text.split('\n').map((line, idx) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <div key={idx} style={{ minHeight: '1.25em' }}>
        {parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={pIdx} style={{ color: '#ffffff' }}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </div>
    );
  });
};

const PixelAssistant = ({ isIdle, onOpenApp }) => {
  const agentRef = useRef(null);
  const isFirstMount = useRef(true);
  const bodyRef = useRef(null);
  const isChatOpenRef = useRef(false);

  // Sound State (Muted by default)
  const [isMuted, setIsMuted] = useState(true);
  const isMutedRef = useRef(true);

  // Dialog State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [activeQnA, setActiveQnA] = useState(null);

  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
  }, [isChatOpen]);

  const toggleMute = (e) => {
    e?.stopPropagation?.();
    setIsMuted(prev => {
      const next = !prev;
      isMutedRef.current = next;
      if (agentRef.current && agentRef.current._animator) {
        const sounds = agentRef.current._animator._sounds || {};
        Object.values(sounds).forEach(audio => {
          if (audio) {
            audio.muted = next;
            audio.volume = next ? 0 : 0.8;
          }
        });
      }
      if (!next && agentRef.current) {
        agentRef.current.play("Congratulate");
        agentRef.current.speak("Sound unmuted! 🔊");
      } else if (next && agentRef.current) {
        agentRef.current.speak("Sound muted 🔇");
      }
      return next;
    });
  };

  // Auto-scroll dialog body when an answer appears
  useEffect(() => {
    if (activeQnA && bodyRef.current) {
      setTimeout(() => {
        if (bodyRef.current) {
          bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
        }
      }, 50);
    }
  }, [activeQnA]);

  // Handle asking question
  const handleAsk = (queryText) => {
    if (!queryText || !queryText.trim()) return;
    const q = queryText.trim();
    const result = getAnswerForQuery(q);
    setActiveQnA({
      query: q,
      ...result
    });
    setInputText("");

    // Trigger Clippy's corresponding animation
    if (agentRef.current) {
      if (agentRef.current._balloon) {
        agentRef.current._balloon.hide(true);
      }
      if (result.animation) {
        agentRef.current.play(result.animation);
      } else {
        agentRef.current.animate();
      }
    }
  };

  useEffect(() => {
    let hintInterval = null;
    let isMounted = true;

    // Clean up any rogue clippy elements left in body from previous mounts or HMR
    document.querySelectorAll('.pixel-clippy, .clippy').forEach(el => el.remove());

    const loadClippy = async () => {
      try {
        const agent = await initAgent(Clippy);
        if (!isMounted) {
          agent.dispose();
          return;
        }

        agentRef.current = agent;

        // Immediately mute all sounds by default
        if (agent._animator) {
          const originalPlaySound = agent._animator._playSound;
          agent._animator._playSound = function() {
            if (isMutedRef.current) return;
            originalPlaySound?.call(this);
          };

          const sounds = agent._animator._sounds || {};
          Object.values(sounds).forEach((audio) => {
            if (audio) {
              audio.muted = true;
              audio.volume = 0;
            }
          });
        }

        // Apply custom class for fixed bottom-right position & styling
        if (agent._el) {
          agent._el.classList.add('pixel-clippy');

          // Detach clippyjs's built-in mousedown/drag handler to avoid drifting/stranding
          if (agent._mouseDownHandle) {
            agent._el.removeEventListener('mousedown', agent._mouseDownHandle);
          }

          // Single click toggles chat assistant dialog
          agent._el.addEventListener('click', (e) => {
            e.stopPropagation();
            setIsChatOpen((prev) => {
              const next = !prev;
              if (next && agentRef.current) {
                agentRef.current.play("GetAttention");
                if (agentRef.current._balloon) {
                  agentRef.current._balloon.hide(true);
                }
              }
              return next;
            });
          });
        }

        agent.show(true);

        // Reposition balloon after load so it sits directly above Clippy
        setTimeout(() => {
          if (agent._balloon) {
            agent._balloon.reposition();
          }
        }, 400);

        // Friendly greeting after short delay
        setTimeout(() => {
          if (!isMounted) return;
          agent.play("Greeting");
          agent.speak("Click me to ask anything about Varun! 💬");
        }, 1200);

        // Periodic hints when active and dialog closed
        hintInterval = setInterval(() => {
          if (document.body.classList.contains('is-idle') || isChatOpenRef.current) return;

          if (Math.random() > 0.5) {
            agent.animate();
          } else {
            agent.play("GetAttention");
            agent.speak(hints[Math.floor(Math.random() * hints.length)]);
          }
        }, 25000);

      } catch (err) {
        console.error("Failed to load Clippy", err);
      }
    };

    loadClippy();

    return () => {
      isMounted = false;
      if (hintInterval) clearInterval(hintInterval);
      if (agentRef.current) {
        agentRef.current.hide();
        agentRef.current.dispose();
        agentRef.current = null;
      }
    };
  }, []);

  // Handle Idle / ScreenSaver transition
  useEffect(() => {
    const agent = agentRef.current;
    if (!agent || !agent._el) return;

    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (isIdle) {
      document.body.classList.add('is-idle');
      setIsChatOpen(false); // Close dialog on idle
      agent.play("Searching");
      agent.speak("Are you still there? When are you coming back?");
    } else {
      document.body.classList.remove('is-idle');
      agent.play("Greeting");
      agent.speak("Finally! You are back!");
      if (agent._balloon) agent._balloon.reposition();
    }
  }, [isIdle]);

  return (
    <>
      {/* Quick Sound Option Pill directly above Clippy */}
      <div 
        className={`clippy-quick-sound-pill ${isMuted ? 'muted' : 'unmuted'}`} 
        onClick={toggleMute}
        title={isMuted ? "Bot Sound is Muted. Click to Unmute" : "Bot Sound is On. Click to Mute"}
      >
        {isMuted ? <VolumeX size={12} color="#f87171" /> : <Volume2 size={12} color="#34d399" />}
        <span>{isMuted ? "Sound: Muted" : "Sound: On"}</span>
      </div>

      {/* Interactive Clippy Ask Dialog */}
      {isChatOpen && (
        <div className="clippy-dialog-container">
          {/* Header */}
          <div className="clippy-dialog-header">
            <div className="clippy-dialog-title">
              <span>📎</span>
              <span>Clippy • Varun's Guide</span>
              <span className="clippy-dialog-badge">Online</span>
            </div>

            <div className="clippy-header-actions">
              <button 
                type="button"
                className={`clippy-sound-toggle-btn ${isMuted ? 'muted' : 'unmuted'}`}
                onClick={toggleMute}
                title={isMuted ? "Click to Unmute Bot Sound" : "Click to Mute Bot Sound"}
              >
                {isMuted ? <VolumeX size={13} color="#f87171" /> : <Volume2 size={13} color="#34d399" />}
                <span>{isMuted ? "Unmute" : "Mute"}</span>
              </button>
              <button 
                className="clippy-close-btn" 
                onClick={() => setIsChatOpen(false)}
                title="Close Assistant"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="clippy-chips-scroll">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                className="clippy-chip"
                onClick={() => handleAsk(chip.query)}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Body / Answer Area */}
          <div className="clippy-dialog-body" ref={bodyRef}>
            {!activeQnA ? (
              <div className="clippy-welcome-msg">
                <p>
                  <strong>What do you want to know about Varun?</strong>
                </p>
                <p style={{ marginTop: '6px' }}>
                  Ask about skills, projects, work experience, education, or how to reach out. I will answer and show you the exact desktop path to explore more!
                </p>
              </div>
            ) : (
              <div className="clippy-qa-card">
                {/* User Query Bubble */}
                <div className="clippy-user-query">
                  {activeQnA.query}
                </div>

                {/* Clippy Answer Box */}
                <div className="clippy-ans-box">
                  <div className="clippy-ans-header">
                    <Sparkles size={13} />
                    <span>{activeQnA.topic}</span>
                  </div>

                  <div className="clippy-ans-text">
                    {renderFormattedText(activeQnA.answer)}
                  </div>

                  {/* Path Recommendation Box */}
                  <div className="clippy-path-card">
                    <div className="clippy-path-label">
                      <Folder size={12} />
                      <span>Where to find more on VarunOS:</span>
                    </div>
                    <div className="clippy-path-val">
                      {activeQnA.path}
                    </div>

                    {/* Action Buttons to open the related app directly */}
                    <div className="clippy-actions-row">
                      {activeQnA.appId && onOpenApp && (
                        <button
                          className="clippy-action-btn"
                          onClick={() => {
                            onOpenApp(activeQnA.appId);
                            setIsChatOpen(false);
                          }}
                        >
                          <ExternalLink size={12} />
                          {activeQnA.actionText || `Open ${activeQnA.appName}`}
                        </button>
                      )}

                      {activeQnA.secondaryAppId && onOpenApp && (
                        <button
                          className="clippy-action-btn secondary"
                          onClick={() => {
                            onOpenApp(activeQnA.secondaryAppId);
                            setIsChatOpen(false);
                          }}
                        >
                          <ExternalLink size={12} />
                          Open App
                        </button>
                      )}

                      {activeQnA.downloadUrl && (
                        <a
                          href={activeQnA.downloadUrl}
                          download
                          className="clippy-action-btn"
                        >
                          <Download size={12} />
                          Download PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form 
            className="clippy-input-bar" 
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(inputText);
            }}
          >
            <input
              type="text"
              className="clippy-text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about Varun..."
              autoFocus
            />
            <button 
              type="submit" 
              className="clippy-send-btn" 
              disabled={!inputText.trim()}
              title="Send question"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default PixelAssistant;
