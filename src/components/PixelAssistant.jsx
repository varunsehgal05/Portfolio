import { useState, useEffect, useRef } from 'react';
import { initAgent } from "clippyjs";
import { Clippy } from "clippyjs/agents";
import { Send, X, ExternalLink, Download, Folder, Sparkles, Volume2, VolumeX, Terminal, Code2, Compass, Mail, FileText, User } from 'lucide-react';
import './PixelAssistant.css';

const HINTS = [
  "Click me to ask anything about Varun's UI/UX work! 💬",
  "Press ALT + 1, 2, or 3 to change desktop wallpapers.",
  "Check out the interactive VS Code or Figma apps!",
  "Double click any desktop icon to open apps."
];

const SUGGESTION_CHIPS = [
  { label: "⚡ Vibecoding", query: "What vibecoded AI projects has Varun built?" },
  { label: "🛠️ Tech Skills", query: "What are Varun's design tools and tech stack?" },
  { label: "🚀 Projects", query: "Show me Varun's featured product design case studies" },
  { label: "💼 Experience", query: "Tell me about Varun's work experience and internships" },
  { label: "⭐ Why Hire Varun?", query: "Why should a company hire Varun Sehgal?" },
  { label: "🎓 Education", query: "Where did Varun study?" },
  { label: "📬 Contact & Hire", query: "How can I contact or hire Varun?" },
  { label: "📄 Resume PDF", query: "Can I download Varun's resume?" }
];

const getAIResponse = (query) => {
  const q = query.toLowerCase().trim();

  // 1. Greetings & Bot Identity
  if (/^(hi|hello|hey|yo|sup|greetings|good morning|good evening|howdy)/.test(q) || /who are you|what are you|what is clippy/.test(q)) {
    return {
      topic: "Clippy • Varun's AI Guide",
      answer: "Hey there! I am **Clippy**, your interactive AI assistant in VarunOS. I can answer any questions about Varun Sehgal's UI/UX design case studies, frontend engineering, vibecoded AI systems, work experience, or help you launch desktop apps directly.\n\nWhat would you like to explore?",
      path: "VarunOS > Interactive Assistant",
      suggestions: ["Show me featured projects", "What are Varun's skills?", "Open VS Code", "Why hire Varun?"],
      animation: "Greeting"
    };
  }

  // 2. Vibecoding & Generative AI Systems
  if (/vibe|vibecod|generative|agent|swarm|ast|prompt|ai-core/.test(q)) {
    return {
      topic: "Vibecoded Projects & AI Systems",
      answer: "Varun actively builds **vibecoded product ecosystems** leveraging autonomous LLMs, generative UI AST transformers, and cursor swarm engines:\n• **AI Interview & Prep Platform:** Automated grading modules and live audio telemetry.\n• **Prompt-to-UI Prototyping Engine:** Compiles natural language prompts into production React components and design tokens.\n• **Autonomous Multiplayer Swarm:** Multi-agent cursor collaboration synchronized across the desktop.\n• **Ollama Local LLM Microservice:** Offline quantized streaming inferences.",
      path: "VS Code App > vibecoded-projects",
      appId: "vscode",
      appName: "VS Code Workspace",
      actionText: "Open VS Code Projects",
      secondaryPath: "Figma App",
      secondaryAppId: "figma",
      suggestions: ["Show me frontend projects", "How can I hire Varun?", "Open Terminal"],
      animation: "GetTechy"
    };
  }

  // 3. Why Hire Varun
  if (/why hire|why should|value|strengths|hire you|hire varun|superpower|what sets you apart/.test(q)) {
    return {
      topic: "Why Hire Varun Sehgal?",
      answer: "Here is why Varun is a high-leverage addition to any high-growth product or design team:\n• **End-to-End Product Design:** From initial user research and wireframing to high-fidelity Figma components and design systems.\n• **Technical Fluency (Design Engineering):** Can build what he designs using React, Next.js, TypeScript, and Tailwind CSS.\n• **Measurable Business Impact:** Reduced checkout drop-off by 30% on EventFlow, and boosted user satisfaction by 40% at Knaptix.\n• **Vibecoding Speed:** Uses AI workflows (Uizard, Galileo, Figma Automator) to accelerate prototype cycles by 3-5x.",
      path: "Contact App & Resume App",
      appId: "contact",
      appName: "Contact App",
      actionText: "Hire / Contact Varun",
      secondaryAppId: "resume",
      suggestions: ["What projects has Varun built?", "Download Resume PDF", "Tell me about work experience"],
      animation: "Congratulate"
    };
  }

  // 4. Skills & Design Stack
  if (/skill|tech|stack|language|tool|figma|adobe|photoshop|illustrator|prototype|react|next|typescript|tailwind|wireframe/.test(q)) {
    return {
      topic: "Design Tools & Technical Stack",
      answer: "Varun bridges the gap between high-fidelity UI/UX design and frontend engineering:\n• **Design Tools:** Figma, Figma AI, Adobe XD, Photoshop, Illustrator, FigJam\n• **AI Prototyping:** Uizard, Galileo AI, Visily, Figma Magician, Figma Automator\n• **Core UX:** Wireframing, Rapid Prototyping, User Research, Usability Testing, Design Systems\n• **Frontend & Tech:** React.js, Next.js, TypeScript, Tailwind CSS, HTML5/CSS3, Git",
      path: "Finder App > Tech Stack (or Resume App)",
      appId: "finder",
      appName: "Finder App",
      actionText: "Explore in Finder",
      secondaryAppId: "resume",
      suggestions: ["Show me featured projects", "View work experience", "Open Figma"],
      animation: "GetTechy"
    };
  }

  // 5. Work Experience
  if (/experience|work|job|intern|career|unievent|assemble|knaptix|freelance|company|role/.test(q)) {
    return {
      topic: "Professional Work Experience",
      answer: "Varun has 3+ years experience delivering SaaS and AI products:\n• **UI/UX Designer Intern** at **UniEvent** (Jun 2026 – Nov 2026): Designed user-centric experiences.\n• **Assistant Head of Operations** at **Assemble** (Aug 2025 – Jan 2026): Esports tournament execution.\n• **UI/UX Designer Intern** at **Knaptix Ventures** (Jun 2025 – Aug 2025): 5+ UI/UX interfaces with 40% user satisfaction increase.\n• **Freelance UI/UX Designer** (Jan 2024 – Present): 10+ projects with 95% client retention.",
      path: "Resume App > PROFESSIONAL EXPERIENCE",
      appId: "resume",
      appName: "Resume App",
      actionText: "Open Resume App",
      suggestions: ["Show me projects", "How to contact Varun?", "Download Resume"],
      animation: "Explain"
    };
  }

  // 6. Projects & Case Studies
  if (/project|built|case study|eventflow|expensify|interview|codesrijan|portfolio|apps/.test(q)) {
    return {
      topic: "Featured Projects & Case Studies",
      answer: "Varun has architected high-impact web and mobile product designs:\n• **AI Interview & Prep Platform:** AI SaaS with security & grading modules.\n• **EventFlow (Event Ticketing SaaS):** 4-step flow reducing drop-off by 30% with 50+ component design system.\n• **Expensify (Budget Tracker):** 17+ screens optimized for under-5-second transaction logging.\n• **CodeSrijan Hackathon:** Complete digital platform and branding for 200+ participants.",
      path: "Figma App & VS Code App",
      appId: "figma",
      appName: "Figma App",
      actionText: "Open Figma Showcase",
      secondaryAppId: "vscode",
      suggestions: ["What are Varun's skills?", "Open VS Code", "Download Resume"],
      animation: "Congratulate"
    };
  }

  // 7. Education
  if (/education|college|university|degree|juet|jaypee|guna|school|study|btech|cse|graduat/.test(q)) {
    return {
      topic: "Education & Academics",
      answer: "Varun is pursuing his **Bachelor of Technology in Computer Science & Engineering (CSE)** at **Jaypee University of Engineering and Technology (JUET)** (Aug 2023 – May 2027) in Guna, India.",
      path: "Resume App > EDUCATION",
      appId: "resume",
      appName: "Resume App",
      actionText: "Open Resume App",
      suggestions: ["Show me skills", "What projects has Varun built?", "Why hire Varun?"],
      animation: "Writing"
    };
  }

  // 8. Contact & Hiring
  if (/contact|email|phone|hire|call|reach|message|linkedin|github|behance|rate|social|connect/.test(q)) {
    return {
      topic: "Contact & Connect",
      answer: "You can reach Varun directly:\n• **Email:** varun.sehgal02@gmail.com\n• **Phone:** +91 9399361193\n• **Location:** Gwalior, Madhya Pradesh, India\n• **GitHub:** github.com/varunsehgal05\n• **LinkedIn:** linkedin.com/in/varunsehgal02\n• **Behance:** behance.net/varunsehgal3\n• **Portfolio:** varunsehgal.runs-on.dev\nVarun is open for **Full-time UI/UX roles** and **Freelance projects**!",
      path: "Contact App (Mail compose client)",
      appId: "contact",
      appName: "Contact App",
      actionText: "Open Contact Form",
      suggestions: ["Download Resume PDF", "Tell me about experience", "Show featured projects"],
      animation: "SendMail"
    };
  }

  // 9. Resume & PDF
  if (/resume|cv|pdf|download|document/.test(q)) {
    return {
      topic: "Resume & CV",
      answer: "You can view Varun's complete interactive ATS-optimized resume right here on desktop, or download the official PDF directly.",
      path: "Resume > Varun_Sehgal_Resume.pdf",
      appId: "resume",
      appName: "Resume App",
      actionText: "Open Resume App",
      downloadUrl: "/Varun_Sehgal_Resume_Updated.pdf",
      suggestions: ["Show me tech skills", "How to contact Varun?", "Open Figma"],
      animation: "Save"
    };
  }

  // 10. Desktop Navigation & Shortcuts
  if (/wallpaper|theme|shortcut|background|alt|how to use|desktop|safari|terminal|vscode|finder/.test(q)) {
    return {
      topic: "VarunOS Desktop Navigation & Shortcuts",
      answer: "Here are some awesome tips for navigating VarunOS:\n• **Alt + 1 / 2 / 3**: Switch between macOS Monterey, Blue Abstract, and Big Sur wallpapers.\n• **Double-Click Titlebars**: Toggle full screen with native macOS zoom animations.\n• **Dock Click**: Bounces the app icon into view with genuine macOS physics.\n• **Apps:** VS Code, Figma, Safari, Terminal, Resume, Contact, and Settings.",
      path: "VarunOS > System Settings",
      appId: "settings",
      appName: "Settings App",
      actionText: "Open Settings",
      suggestions: ["Open Terminal", "Open Safari", "What are Varun's skills?"],
      animation: "GetWizardy"
    };
  }

  // 11. Intelligent Fallback
  return {
    topic: `VarunOS AI Guide: "${query}"`,
    answer: `Varun Sehgal is a **Lead UI/UX Designer & Product Designer** with 3+ years experience delivering SaaS platforms, design systems, and vibecoded AI tools. He is pursuing CSE at Jaypee University (JUET) and is open for **Full-Time Design Roles** and **Freelance Collaborations**.\n\nClick any topic below to dive deeper:`,
    path: "VarunOS > Navigation Hub",
    suggestions: ["Show me featured projects", "What are Varun's skills?", "Tell me about work experience", "How to contact Varun?"],
    appId: "finder",
    appName: "Finder App",
    actionText: "Browse Finder Portfolio",
    animation: "Explain"
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
  const dialogRef = useRef(null);
  const isChatOpenRef = useRef(false);

  // Sound State (Muted by default)
  const [isMuted, setIsMuted] = useState(true);
  const isMutedRef = useRef(true);

  // Dialog State & Multi-turn Message History
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
  }, [isChatOpen]);

  // Keyboard (Escape) and Outside Click to close dialog smoothly
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isChatOpen) {
        setIsChatOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (
        isChatOpen &&
        dialogRef.current &&
        !dialogRef.current.contains(e.target) &&
        !e.target.closest('.pixel-clippy') &&
        !e.target.closest('.clippy')
      ) {
        setIsChatOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
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

  // Auto-scroll dialog body when messages appear
  useEffect(() => {
    if (bodyRef.current) {
      setTimeout(() => {
        if (bodyRef.current) {
          bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
        }
      }, 50);
    }
  }, [messages, isThinking]);

  // Handle asking question with thinking simulation & animation
  const handleAsk = (queryText) => {
    if (!queryText || !queryText.trim()) return;
    const q = queryText.trim();
    
    // Append User Message
    const userMsgId = `user-${Date.now()}`;
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', content: q }]);
    setInputText("");
    setIsThinking(true);

    // Trigger Clippy's animation
    if (agentRef.current) {
      if (agentRef.current._balloon) {
        agentRef.current._balloon.hide(true);
      }
      agentRef.current.play("Thinking");
    }

    // Simulate smart thinking delay
    setTimeout(() => {
      const result = getAIResponse(q);
      const aiMsgId = `ai-${Date.now()}`;
      setMessages(prev => [...prev, { id: aiMsgId, role: 'assistant', data: result }]);
      setIsThinking(false);

      if (agentRef.current) {
        if (result.animation) {
          agentRef.current.play(result.animation);
        } else {
          agentRef.current.animate();
        }
      }
    }, 380);
  };

  useEffect(() => {
    let hintInterval = null;
    let isMounted = true;

    // Clean up any rogue clippy elements left in body
    document.querySelectorAll('.pixel-clippy, .clippy').forEach(el => el.remove());

    const loadClippy = async () => {
      try {
        const agent = await initAgent(Clippy);
        if (!isMounted) {
          agent.dispose();
          return;
        }

        agentRef.current = agent;

        // Mute all sounds by default
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

          if (agent._mouseDownHandle) {
            agent._el.removeEventListener('mousedown', agent._mouseDownHandle);
          }

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

        setTimeout(() => {
          if (agent._balloon) agent._balloon.reposition();
        }, 400);

        setTimeout(() => {
          if (!isMounted) return;
          agent.play("Greeting");
          agent.speak("Click me to ask anything about Varun! 💬");
        }, 1200);

        hintInterval = setInterval(() => {
          if (document.body.classList.contains('is-idle') || isChatOpenRef.current) return;
          if (Math.random() > 0.5) {
            agent.animate();
          } else {
            agent.play("GetAttention");
            agent.speak(HINTS[Math.floor(Math.random() * HINTS.length)]);
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
      setIsChatOpen(false);
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
      {/* Quick Sound Option Pill directly above Clippy - only when chat dialog is closed */}
      {!isChatOpen && (
        <div 
          className={`clippy-quick-sound-pill ${isMuted ? 'muted' : 'unmuted'}`} 
          onClick={toggleMute}
          title={isMuted ? "Bot Sound is Muted. Click to Unmute" : "Bot Sound is On. Click to Mute"}
        >
          {isMuted ? <VolumeX size={12} color="#f87171" /> : <Volume2 size={12} color="#34d399" />}
          <span>{isMuted ? "Sound: Muted" : "Sound: On"}</span>
        </div>
      )}

      {/* Interactive Clippy Ask Dialog */}
      {isChatOpen && (
        <div className="clippy-dialog-container" ref={dialogRef}>
          {/* Header */}
          <div className="clippy-dialog-header">
            <div className="clippy-dialog-title">
              <span className="clippy-title-emoji">📎</span>
              <span className="clippy-title-text">Clippy • Varun's AI Guide</span>
              <span className="clippy-dialog-badge">AI Online</span>
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
                title="Close Assistant (Esc)"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="clippy-chips-scroll">
            {SUGGESTION_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                className="clippy-chip"
                onClick={() => handleAsk(chip.query)}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Body / Answer Area with Multi-turn history */}
          <div className="clippy-dialog-body" ref={bodyRef}>
            {messages.length === 0 ? (
              <div className="clippy-welcome-msg">
                <div className="clippy-welcome-header">
                  <span className="clippy-welcome-avatar">👋</span>
                  <div className="clippy-welcome-heading">
                    <h4>What do you want to know about Varun?</h4>
                    <p>AI Assistant & System Navigator</p>
                  </div>
                </div>
                <p className="clippy-welcome-desc">
                  Ask about UI/UX skills, vibecoded AI projects, work experience, or how to contact him. I will answer and launch the exact desktop app for you!
                </p>
                <div className="clippy-welcome-hint">
                  <span>💡</span>
                  <span>Tap any suggestion chip above or ask anything below.</span>
                </div>
              </div>
            ) : (
              <div className="clippy-chat-thread">
                {messages.map((msg) => {
                  if (msg.role === 'user') {
                    return (
                      <div key={msg.id} className="clippy-user-query">
                        {msg.content}
                      </div>
                    );
                  }

                  const data = msg.data;
                  return (
                    <div key={msg.id} className="clippy-ans-box">
                      <div className="clippy-ans-header">
                        <Sparkles size={13} />
                        <span>{data.topic}</span>
                      </div>

                      <div className="clippy-ans-text">
                        {renderFormattedText(data.answer)}
                      </div>

                      {/* Path Recommendation Box */}
                      {data.path && (
                        <div className="clippy-path-card">
                          <div className="clippy-path-label">
                            <Folder size={12} />
                            <span>Recommended App on VarunOS:</span>
                          </div>
                          <div className="clippy-path-val">
                            {data.path}
                          </div>

                          <div className="clippy-actions-row">
                            {data.appId && onOpenApp && (
                              <button
                                className="clippy-action-btn"
                                onClick={() => {
                                  onOpenApp(data.appId);
                                  setIsChatOpen(false);
                                }}
                              >
                                <ExternalLink size={12} />
                                {data.actionText || `Open ${data.appName}`}
                              </button>
                            )}

                            {data.secondaryAppId && onOpenApp && (
                              <button
                                className="clippy-action-btn secondary"
                                onClick={() => {
                                  onOpenApp(data.secondaryAppId);
                                  setIsChatOpen(false);
                                }}
                              >
                                <ExternalLink size={12} />
                                Open Related App
                              </button>
                            )}

                            {data.downloadUrl && (
                              <a
                                href={data.downloadUrl}
                                download
                                className="clippy-action-btn"
                              >
                                <Download size={12} />
                                Download PDF
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Follow-up question chips */}
                      {data.suggestions && (
                        <div className="clippy-followups-row">
                          <span className="followup-label">Follow-up:</span>
                          {data.suggestions.map((sug, sIdx) => (
                            <button
                              key={sIdx}
                              className="clippy-followup-chip"
                              onClick={() => handleAsk(sug)}
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Thinking indicator */}
                {isThinking && (
                  <div className="clippy-thinking-bubble">
                    <span className="thinking-text">Clippy is thinking</span>
                    <span className="thinking-dot"></span>
                    <span className="thinking-dot"></span>
                    <span className="thinking-dot"></span>
                  </div>
                )}
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
              placeholder="Ask anything about Varun or type a command..."
              autoFocus
            />
            <button 
              type="submit" 
              className="clippy-send-btn" 
              disabled={!inputText.trim() || isThinking}
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