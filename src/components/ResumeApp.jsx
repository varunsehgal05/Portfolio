import React, { useRef, useEffect, useState } from 'react';
import './ResumeApp.css';
import { 
  Download, 
  FileText, 
  ZoomIn, 
  ZoomOut,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Globe
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
  const handleZoomOut = () => setZoomLevel(prev => Math.max(70, prev - 10));
  const handleZoomReset = () => setZoomLevel(100);

  return (
    <div className="resume-container">
      {/* Top Preview Action Bar */}
      <div className="resume-top-bar">
        <div className="resume-top-left">
          <div className="preview-doc-badge">
            <FileText size={14} className="doc-icon" />
            <span className="doc-name">Varun_Sehgal_Resume_Creative.pdf</span>
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
            title="Download Varun's Resume (PDF)"
          >
            <Download size={13} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Centered Document Canvas Viewport */}
      <div className="resume-canvas-viewport" ref={scrollRef}>
        <div 
          className="resume-scale-wrapper"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Tactile Grid Paper Canvas (Matching Image 3) */}
          <div className="tactile-resume-paper-sheet">
            {/* Metal binder clips at top edges */}
            <div className="binder-clip-top-left" />
            <div className="binder-clip-top-right" />

            {/* TOP ROW: Pinned ID Badge + Handwritten Note */}
            <div className="tactile-resume-top-row">
              {/* 1. Left Pinned ID Card with Metal Paperclip */}
              <div className="tactile-id-badge-card">
                {/* SVG Metal Paperclip */}
                <div className="metal-paperclip-graphic">
                  <svg viewBox="0 0 32 64" fill="none">
                    <path
                      d="M 16,4 C 24,4 28,10 28,20 L 28,48 C 28,56 22,60 16,60 C 10,60 4,56 4,48 L 4,16 C 4,10 8,6 14,6 C 20,6 22,10 22,16 L 22,46 C 22,50 18,52 16,52 C 14,52 10,50 10,46 L 10,20"
                      stroke="#a1a1aa"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Yellow Photo Block */}
                <div className="id-photo-yellow-block">
                  <img
                    src="/varun.jpg"
                    alt="Varun Sehgal"
                    className="id-photo-img"
                    onError={(e) => { e.currentTarget.src = '/profile/varun.jpg'; }}
                  />
                </div>

                {/* ID Card Details */}
                <div className="id-card-details">
                  <h2 className="id-card-name">Varun Sehgal</h2>
                  <p className="id-card-tagline">
                    I craft friction-free product experiences from design systems to hi-fi interactive prototypes through user psychology and code.
                  </p>

                  <div className="id-card-meta-table">
                    <div className="meta-cell"><span className="meta-k">DOB:</span> <span className="meta-v">02.10.2003</span></div>
                    <div className="meta-cell"><span className="meta-k">LOC:</span> <span className="meta-v">Bengaluru / Remote</span></div>
                    <div className="meta-cell"><span className="meta-k">📞</span> <span className="meta-v">+91 9399361193</span></div>
                    <div className="meta-cell"><span className="meta-k">✉️</span> <a href="mailto:varun.sehgal02@gmail.com" className="meta-v">varun.sehgal02@gmail.com</a></div>
                    <div className="meta-cell full"><span className="meta-k">Portfolio:</span> <a href="https://varunsehgal.runs-on.dev" target="_blank" rel="noreferrer" className="meta-v">varunsehgal.runs-on.dev</a></div>
                    <div className="meta-cell full"><span className="meta-k">Lang:</span> <span className="meta-v">English (Fluent) • Hindi (Native)</span></div>
                  </div>
                </div>

                {/* QR Code with vertical label */}
                <div className="id-card-qr-box">
                  <div className="qr-vertical-tag">portfolio</div>
                  <img src="/qr.png" alt="Portfolio QR" className="id-qr-img" onError={(e) => { e.currentTarget.src = '/qr.png'; }} />
                </div>
              </div>

              {/* 2. Top-Right Playful Handwritten Note with Red Doodle Arrow */}
              <div className="tactile-handwritten-note">
                <p className="handwritten-script-text">
                  Please don't hesitate to <span className="handwritten-circle">reach me</span> if this resume doesn't provide enough clarification
                </p>

                {/* Hand-drawn doodle arrow SVG */}
                <svg className="handwritten-doodle-arrow" viewBox="0 0 100 50" fill="none">
                  <path d="M 10,10 Q 50,45 85,25" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M 75,18 L 86,25 L 78,34" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>

                <div className="handwritten-contact-links">
                  <div className="handwritten-item">
                    <span className="material-symbols-outlined text-[15px] text-red-500">call</span>
                    <span className="font-mono text-xs text-zinc-800 font-semibold">+91 9399361193</span>
                  </div>
                  <div className="handwritten-item underline-red">
                    <span className="text-red-500 font-bold font-mono text-xs">in</span>
                    <a href="https://linkedin.com/in/varunsehgal02" target="_blank" rel="noreferrer" className="text-xs font-mono text-zinc-800 font-semibold">
                      linkedin.com/in/varunsehgal02
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN 2-COLUMN GRID */}
            <div className="tactile-resume-grid">
              {/* LEFT COLUMN: Work Experiences & Education */}
              <div className="tactile-column-left">
                {/* SECTION 1: Work Experiences */}
                <div className="tactile-section">
                  <h3 className="highlighter-heading yellow-marker">
                    <span className="highlighter-text">Work Experiences</span>
                  </h3>

                  <div className="tactile-timeline">
                    {/* Job 1 */}
                    <div className="tactile-timeline-item">
                      <div className="timeline-bullet-hollow" />
                      <div className="timeline-time-row">Sep 2024 — Nov 2024 • 6 mos</div>
                      <h4 className="timeline-job-role">UI/UX Designer Intern</h4>
                      <div className="timeline-company-row">
                        <span className="font-bold text-zinc-900">UniEvent (EventFlow)</span>
                        <span className="text-zinc-500">•</span>
                        <span className="highlighter-badge-green">Full-time</span>
                      </div>
                      <div className="timeline-loc-text">Bengaluru, Karnataka, India (Remote)</div>
                      <p className="timeline-bullet-desc">
                        Designed campus event ticketing platform (EventFlow). Slashed transaction drop-off by 30% across 4-step booking workflow across 50+ components.
                      </p>
                    </div>

                    {/* Job 2 */}
                    <div className="tactile-timeline-item">
                      <div className="timeline-bullet-hollow" />
                      <div className="timeline-time-row">Aug 2024 — Jan 2025 • 6 mos</div>
                      <h4 className="timeline-job-role">Assistant Head of Operations / UI/UX Intern</h4>
                      <div className="timeline-company-row">
                        <span className="font-bold text-zinc-900">Assemble</span>
                        <span className="text-zinc-500">•</span>
                        <span className="highlighter-badge-green">Full-time</span>
                      </div>
                      <div className="timeline-loc-text">Remote</div>
                      <p className="timeline-bullet-desc">
                        Designed collaborative creator workspace tools and interaction prototypes in Figma. Coordinated operations for multi-team competitions.
                      </p>
                    </div>

                    {/* Job 3 */}
                    <div className="tactile-timeline-item">
                      <div className="timeline-bullet-hollow" />
                      <div className="timeline-time-row">Jun 2024 — Aug 2024 • 3 mos</div>
                      <h4 className="timeline-job-role">UI/UX Designer Intern</h4>
                      <div className="timeline-company-row">
                        <span className="font-bold text-zinc-900">Knaptix Ventures</span>
                        <span className="text-zinc-500">•</span>
                        <span className="highlighter-badge-green">Internship</span>
                      </div>
                      <div className="timeline-loc-text">Remote</div>
                      <p className="timeline-bullet-desc">
                        Delivered brand identities and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Education */}
                <div className="tactile-section mt-6">
                  <h3 className="highlighter-heading yellow-marker">
                    <span className="highlighter-text">Education</span>
                  </h3>

                  <div className="tactile-timeline">
                    <div className="tactile-timeline-item">
                      <div className="timeline-bullet-hollow" />
                      <div className="timeline-time-row">2023 — 2027</div>
                      <h4 className="timeline-job-role">Jaypee University of Engineering &amp; Technology</h4>
                      <div className="timeline-company-row">
                        <span className="font-bold text-zinc-900">B.Tech in Computer Science &amp; Engineering</span>
                        <span className="text-zinc-500">•</span>
                        <span className="highlighter-badge-green">CGPA 8.5</span>
                      </div>
                      <div className="timeline-loc-text">Guna, Madhya Pradesh, India</div>
                    </div>

                    <div className="tactile-timeline-item">
                      <div className="timeline-bullet-hollow" />
                      <div className="timeline-time-row">Hackathons &amp; Honors</div>
                      <h4 className="timeline-job-role">🏆 HACKeThor Winner (1st Place National Hackathon by Unstop)</h4>
                      <div className="timeline-company-row">
                        <span className="font-bold text-zinc-900">CodeSrijan Organizer (Lead UI/UX for 200+ hackers)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Area of Expertise (Stickers) & Software Skills */}
              <div className="tactile-column-right">
                {/* SECTION 3: Area of Expertise (Tilted Stickers) */}
                <div className="tactile-section">
                  <h3 className="highlighter-heading yellow-marker">
                    <span className="highlighter-text">Area of Expertise</span>
                  </h3>

                  <div className="stickers-cluster-box">
                    {/* Tape 1 */}
                    <div className="sticker-tape-kraft">
                      <span className="material-symbols-outlined text-[16px]">campaign</span>
                      <span>PROMOTIONAL DESIGN</span>
                    </div>

                    {/* Torn Paper 2 */}
                    <div className="sticker-torn-green">
                      <span>EDITORIAL &amp; DESIGN SYSTEMS</span>
                    </div>

                    {/* Red Triangle 3 */}
                    <div className="sticker-triangle-red">
                      <span className="triangle-inner-pill">UI DESIGN</span>
                    </div>

                    {/* Cyan Circle 4 */}
                    <div className="sticker-circle-cyan">
                      <div className="scribble-circle-lines" />
                      <span>MOTION GRAPHICS</span>
                    </div>

                    {/* Pill 5 */}
                    <div className="sticker-pill-indigo">
                      <span>⚡ AI UX &amp; PROTOTYPING</span>
                    </div>
                  </div>
                </div>

                {/* SECTION 4: Software Skills (Folders with Level Bars) */}
                <div className="tactile-section mt-8">
                  <h3 className="highlighter-heading yellow-marker">
                    <span className="highlighter-text">Software Skills</span>
                  </h3>

                  <div className="software-skills-grid">
                    <div className="skill-folder-card">
                      <div className="skill-folder-tab" style={{ background: '#300060' }}>
                        <span className="font-bold text-xs text-purple-200">Ae</span>
                      </div>
                      <span className="skill-folder-name">After Effects</span>
                      <div className="skill-battery-bar">
                        <div className="battery-fill" style={{ width: '85%', background: '#9333ea' }} />
                      </div>
                    </div>

                    <div className="skill-folder-card">
                      <div className="skill-folder-tab" style={{ background: '#00005b' }}>
                        <span className="font-bold text-xs text-indigo-200">Pr</span>
                      </div>
                      <span className="skill-folder-name">Premiere Pro</span>
                      <div className="skill-battery-bar">
                        <div className="battery-fill" style={{ width: '80%', background: '#6366f1' }} />
                      </div>
                    </div>

                    <div className="skill-folder-card">
                      <div className="skill-folder-tab" style={{ background: '#001e36' }}>
                        <span className="font-bold text-xs text-sky-200">Ps</span>
                      </div>
                      <span className="skill-folder-name">Photoshop</span>
                      <div className="skill-battery-bar">
                        <div className="battery-fill" style={{ width: '92%', background: '#0284c7' }} />
                      </div>
                    </div>

                    <div className="skill-folder-card">
                      <div className="skill-folder-tab" style={{ background: '#330000' }}>
                        <span className="font-bold text-xs text-orange-200">Ai</span>
                      </div>
                      <span className="skill-folder-name">Illustrator</span>
                      <div className="skill-battery-bar">
                        <div className="battery-fill" style={{ width: '88%', background: '#ea580c' }} />
                      </div>
                    </div>

                    <div className="skill-folder-card">
                      <div className="skill-folder-tab" style={{ background: '#1e1e1e' }}>
                        <span className="font-bold text-xs text-emerald-300">❖</span>
                      </div>
                      <span className="skill-folder-name">Figma</span>
                      <div className="skill-battery-bar">
                        <div className="battery-fill" style={{ width: '98%', background: '#10b981' }} />
                      </div>
                    </div>

                    <div className="skill-folder-card">
                      <div className="skill-folder-tab" style={{ background: '#082f49' }}>
                        <span className="font-bold text-xs text-cyan-300">⚛</span>
                      </div>
                      <span className="skill-folder-name">React / Next</span>
                      <div className="skill-battery-bar">
                        <div className="battery-fill" style={{ width: '90%', background: '#06b6d4' }} />
                      </div>
                    </div>

                    <div className="skill-folder-card">
                      <div className="skill-folder-tab" style={{ background: '#0c4a6e' }}>
                        <span className="font-bold text-xs text-teal-300">≈</span>
                      </div>
                      <span className="skill-folder-name">Tailwind CSS</span>
                      <div className="skill-battery-bar">
                        <div className="battery-fill" style={{ width: '95%', background: '#14b8a6' }} />
                      </div>
                    </div>

                    <div className="skill-folder-card">
                      <div className="skill-folder-tab" style={{ background: '#172554' }}>
                        <span className="font-bold text-xs text-blue-300">TS</span>
                      </div>
                      <span className="skill-folder-name">TypeScript</span>
                      <div className="skill-battery-bar">
                        <div className="battery-fill" style={{ width: '85%', background: '#3b82f6' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeApp;
