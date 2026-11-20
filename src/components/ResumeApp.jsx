import React, { useRef, useEffect, useState } from 'react';
import './ResumeApp.css';
import { 
  Download, 
  FileText, 
  Mail, 
  Phone, 
  Globe, 
  Briefcase, 
  ExternalLink, 
  Award, 
  Sparkles,
  MapPin,
  GraduationCap,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';

const ResumeApp = () => {
  const scrollRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Guarantee that on mount/open, scroll position is reset to top
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(130, prev + 10));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(80, prev - 10));
  const handleZoomReset = () => setZoomLevel(100);

  return (
    <div className="resume-container">
      {/* Top Preview Action Bar */}
      <div className="resume-top-bar">
        <div className="resume-top-left">
          <div className="preview-doc-badge">
            <FileText size={14} className="doc-icon" />
            <span className="doc-name">Varun_Sehgal_Resume.pdf</span>
          </div>
          <span className="page-pill">Page 1 / 1</span>
        </div>

        <div className="resume-top-center">
          <span className="format-label">Role:</span>
          <span className="format-value">UI/UX Designer | Product Designer</span>
        </div>

        <div className="resume-top-right">
          <div className="resume-zoom-controls">
            <button className="zoom-btn" onClick={handleZoomOut} title="Zoom Out (–)">
              <ZoomOut size={13} />
            </button>
            <span className="zoom-text" onClick={handleZoomReset} title="Reset Zoom">
              {zoomLevel}%
            </span>
            <button className="zoom-btn" onClick={handleZoomIn} title="Zoom In (+)">
              <ZoomIn size={13} />
            </button>
          </div>

          <a 
            href="/Varun_Sehgal_Resume_Updated.pdf" 
            download="Varun_Sehgal_Resume.pdf" 
            className="resume-btn primary" 
            title="Download Varun's ATS Resume (PDF)"
          >
            <Download size={13} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Centered Document Canvas */}
      <div className="resume-canvas-viewport" ref={scrollRef}>
        <div 
          className="resume-document-sheet"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Left Sidebar */}
          <aside className="resume-sidebar">
            {/* Contact Section */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">
                <span className="hash">#</span> CONTACT
              </h3>
              <ul className="contact-list">
                <li>
                  <Phone size={13} className="contact-icon" /> 
                  <span>+91 9399361193</span>
                </li>
                <li>
                  <Mail size={13} className="contact-icon" /> 
                  <a href="mailto:varun.sehgal02@gmail.com">varun.sehgal02@gmail.com</a>
                </li>
                <li>
                  <MapPin size={13} className="contact-icon" /> 
                  <span>Gwalior, MP, India</span>
                </li>
                <li>
                  <Globe size={13} className="contact-icon" /> 
                  <a href="https://varunsehgal.runs-on.dev" target="_blank" rel="noreferrer">varunsehgal.runs-on.dev</a>
                </li>
                <li>
                  <Briefcase size={13} className="contact-icon" /> 
                  <a href="https://linkedin.com/in/varunsehgal02" target="_blank" rel="noreferrer">linkedin.com/in/varunsehgal02</a>
                </li>
                <li>
                  <Layers size={13} className="contact-icon" /> 
                  <a href="https://behance.net/varunsehgal3" target="_blank" rel="noreferrer">behance.net/varunsehgal3</a>
                </li>
                <li>
                  <FileText size={13} className="contact-icon" /> 
                  <a href="https://github.com/varunsehgal05" target="_blank" rel="noreferrer">github.com/varunsehgal05</a>
                </li>
              </ul>
            </div>

            {/* Education Section */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">
                <span className="hash">#</span> EDUCATION
              </h3>
              <div className="education-item">
                <div className="edu-school">Jaypee University of Eng. & Tech.</div>
                <div className="edu-degree">B.Tech in Computer Science & Eng.</div>
                <div className="edu-date">Aug 2023 – May 2027 • Guna, India</div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">
                <span className="hash">#</span> SKILLS
              </h3>
              
              <div className="skill-category">
                <div className="skill-title">UI/UX Design:</div>
                <div className="skill-tags">
                  <span>Wireframing</span>
                  <span>Prototyping</span>
                  <span>User Research</span>
                  <span>Usability Testing</span>
                  <span>Design Systems</span>
                  <span>Information Architecture</span>
                </div>
              </div>

              <div className="skill-category">
                <div className="skill-title">UI/UX Design Tools:</div>
                <div className="skill-tags">
                  <span>Figma</span>
                  <span>Framer</span>
                  <span>FigJam</span>
                  <span>ProtoPie</span>
                  <span>Webflow</span>
                  <span>Design Systems</span>
                </div>
              </div>

              <div className="skill-category">
                <div className="skill-title">AI-Augmented Design:</div>
                <div className="skill-tags">
                  <span>Uizard</span>
                  <span>Galileo AI</span>
                  <span>Visily</span>
                  <span>Figma Magician</span>
                  <span>Figma Automator</span>
                </div>
              </div>

              <div className="skill-category">
                <div className="skill-title">Tech & Prototyping:</div>
                <div className="skill-tags">
                  <span>React.js</span>
                  <span>Next.js</span>
                  <span>TypeScript</span>
                  <span>Tailwind CSS</span>
                  <span>HTML5/CSS3</span>
                  <span>Git</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="resume-main">
            {/* Candidate Header */}
            <header className="resume-header">
              <div className="header-top-row">
                <h1 className="resume-name">Varun Sehgal</h1>
                <div className="ats-badge">ATS-Optimized</div>
              </div>
              <h2 className="resume-roles">UI/UX Designer • Product Designer • Frontend Engineer</h2>
              <p className="resume-summary">
                UI/UX & Product Designer with 3+ years of experience delivering high-impact SaaS and AI product experiences. Skilled in user research, wireframing, rapid prototyping, and design systems, with proven results including a 45% increase in user engagement and a 30% reduction in drop-off rates.
              </p>
            </header>

            {/* Work Experience */}
            <section className="main-section">
              <h3 className="section-heading">
                <span className="icon">💼</span> WORK EXPERIENCE
              </h3>
              
              <div className="experience-item">
                <div className="exp-header">
                  <div className="exp-title-company">
                    <strong>UI/UX Designer Intern</strong> <span className="separator">—</span> UniEvent (Remote)
                  </div>
                  <div className="exp-date">Jun 2024 – Nov 2024</div>
                </div>
                <ul className="exp-bullets">
                  <li>Designed user-focused digital experiences and translated complex business requirements into clear, consistent interfaces for campus event ticketing platform (EventFlow). Completed internship in early November 2024.</li>
                  <li>Architected 4-step booking flow optimization, slashing transaction drop-off by 30% across 50+ modular components.</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="exp-header">
                  <div className="exp-title-company">
                    <strong>Assistant Head of Operations</strong> <span className="separator">—</span> Assemble (Remote)
                  </div>
                  <div className="exp-date">Aug 2024 – Jan 2025</div>
                </div>
                <ul className="exp-bullets">
                  <li>Assisted in the planning and smooth execution of CODM tournaments and esports events, driving operational excellence and cross-functional coordination.</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="exp-header">
                  <div className="exp-title-company">
                    <strong>UI/UX Designer Intern</strong> <span className="separator">—</span> Knaptix Ventures (Remote)
                  </div>
                  <div className="exp-date">Jun 2024 – Aug 2024</div>
                </div>
                <ul className="exp-bullets">
                  <li>Conceptualized 5+ high-fidelity UI/UX interfaces for web/mobile, achieving a 40% increase in user satisfaction scores during testing phases.</li>
                  <li>Accelerated wireframe-to-prototype turnaround by leveraging AI-assisted Figma plugins (Magician, Automator), cutting early-stage design time by 45%.</li>
                  <li>Facilitated design-to-engineering hand-offs, reducing implementation friction and technical errors by 15%.</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="exp-header">
                  <div className="exp-title-company">
                    <strong>Freelance UI/UX Designer</strong> <span className="separator">—</span> Self-Employed (Remote)
                  </div>
                  <div className="exp-date">Jan 2024 – Present</div>
                </div>
                <ul className="exp-bullets">
                  <li>Executed 10+ end-to-end UI/UX design projects for tech startups, maintaining a 95% client retention rate through human-centered delivery.</li>
                  <li>Redesigned product interfaces for 4 early-stage companies, utilizing AI-assisted prototyping tools to speed concept iteration.</li>
                </ul>
              </div>
            </section>

            {/* Design Projects */}
            <section className="main-section">
              <h3 className="section-heading">
                <span className="icon">📁</span> DESIGN PROJECTS
              </h3>

              <div className="project-item">
                <div className="proj-header">
                  <div className="proj-title">AI Interview & Preparation Platform</div>
                  <div className="proj-status">
                    <a 
                      href="https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="figma-link-btn"
                    >
                      Figma Showcase <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
                <div className="proj-stack">Stack: Figma, SaaS Design, AI Security & Grading UX</div>
                <ul className="exp-bullets">
                  <li>Architected an AI-driven SaaS platform, integrating specialized "Security" and "Grading" modules to automate candidate evaluation processes.</li>
                  <li>Streamlined dense analytical data into a clean dark-themed UI, enhancing dashboard scannability and user task efficiency by 25%.</li>
                </ul>
              </div>
              
              <div className="project-item">
                <div className="proj-header">
                  <div className="proj-title">EventFlow: Event Ticketing SaaS</div>
                  <div className="proj-status">
                    <a 
                      href="https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="figma-link-btn"
                    >
                      Figma Showcase <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
                <div className="proj-stack">Stack: Figma, Design Systems, Modular Components</div>
                <ul className="exp-bullets">
                  <li>Spearheaded a 4-step booking flow optimization that minimized user drop-off by 30% through simplified checkout psychology.</li>
                  <li>Constructed a comprehensive design system with 50+ modular components to ensure cross-platform visual consistency.</li>
                </ul>
              </div>

              <div className="project-item">
                <div className="proj-header">
                  <div className="proj-title">Expensify: Budget Tracker App</div>
                  <div className="proj-status">
                    <a 
                      href="https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="figma-link-btn"
                    >
                      Figma Showcase <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
                <div className="proj-stack">Stack: Mobile UX, Real-time Analytics, Micro-interactions</div>
                <ul className="exp-bullets">
                  <li>Refined 17+ screens for real-time analytics, reducing the average "Add Expense" transaction time to under 5 seconds.</li>
                </ul>
              </div>
            </section>

            {/* Hackathons & Leadership */}
            <section className="main-section">
              <h3 className="section-heading">
                <span className="icon">🏆</span> HACKATHONS & LEADERSHIP
              </h3>
              
              <div className="experience-item">
                <div className="exp-header">
                  <div className="exp-title-company">
                    <strong>Co-Organizer & Lead Designer</strong> <span className="separator">—</span> CodeSrijan Hackathon (JUET)
                  </div>
                  <div className="proj-status">
                    <a 
                      href="https://lnkd.in/p/dUXQYx92" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="figma-link-btn"
                    >
                      LinkedIn Post <ExternalLink size={10} />
                    </a>
                  </div>
                  <div className="exp-date">Apr 2024</div>
                </div>
                <ul className="exp-bullets">
                  <li>Directed complete visual identity and design system for a 72-hour hackathon with 200+ participants; designed official event merchandise, participant ID cards, certificates, and marketing creatives.</li>
                  <li>Architected the digital platform UI covering team formation, submission portals, and real-time mentor evaluation under 72h high-pressure conditions. Boosted event registrations by 20% YoY.</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="exp-header">
                  <div className="exp-title-company">
                    <strong>2nd Runner-up (Team Pixel_Codes)</strong> <span className="separator">—</span> Code Conquerors Hackathon (JUET)
                  </div>
                  <div className="proj-status">
                    <a 
                      href="https://www.linkedin.com/posts/pushkar-chaturvedi-a83778284_hackathon2025-codeconquerors-aiineducation-activity-7335535096017375236-DBk_" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="figma-link-btn"
                    >
                      LinkedIn Post <ExternalLink size={10} />
                    </a>
                  </div>
                  <div className="exp-date">Apr 2024</div>
                </div>
                <ul className="exp-bullets">
                  <li>Led frontend development and UI design in a 12-hour offline hackathon (150+ participants), building an AI-powered quiz generator using Next.js and Tailwind CSS.</li>
                  <li>Engineered interactive question builder workflows and dynamic answer-key verification interfaces consuming Ollama local LLM APIs, securing 2nd Runner-up among 40+ teams.</li>
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResumeApp;
