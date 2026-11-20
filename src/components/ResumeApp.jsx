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
          {/* Tactile Grid Paper Canvas (Pixel-perfect match to user reference Image) */}
          <div className="tactile-resume-paper-sheet">
            {/* Metal binder clips at top edges */}
            <div className="binder-clip-top-left" />
            <div className="binder-clip-top-right" />

            {/* TOP ROW: Pinned ID Badge + Handwritten Note with Arrow */}
            <div className="tactile-resume-top-row">
              {/* 1. Left Pinned ID Card with Metal Paperclip */}
              <div className="tactile-id-badge-card">
                {/* Realistic SVG Metal Paperclip pinned on top left */}
                <div className="metal-paperclip-graphic">
                  <svg viewBox="0 0 32 64" fill="none">
                    <path
                      d="M 16,4 C 24,4 28,10 28,20 L 28,48 C 28,56 22,60 16,60 C 10,60 4,56 4,48 L 4,16 C 4,10 8,6 14,6 C 20,6 22,10 22,16 L 22,46 C 22,50 18,52 16,52 C 14,52 10,50 10,46 L 10,20"
                      stroke="#8e8e93"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Monochrome Photo with thin border */}
                <div className="id-photo-frame">
                  <img
                    src="/varun.jpg"
                    alt="Varun Sehgal"
                    className="id-photo-img"
                    onError={(e) => { e.currentTarget.src = '/profile/varun.jpg'; }}
                  />
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

                {/* Vertical red edge tag */}
                <div className="id-card-vertical-tag">
                  <span>PORTFOLIO</span>
                </div>
              </div>

              {/* 2. Top-Right Handwritten Callout with Sweeping Red Doodle Arrow */}
              <div className="tactile-handwritten-note">
                <div className="handwritten-script-text">
                  Please don't hesitate to<br />
                  <span className="handwritten-circle">reach me</span> if this resume<br />
                  doesn't provide enough<br />
                  clarification
                </div>

                {/* Curved swooping red arrow pointing towards contact links */}
                <div className="handwritten-arrow-container">
                  <svg className="handwritten-swoop-arrow" viewBox="0 0 240 110" fill="none">
                    <path
                      d="M 24,18 C 36,65 92,94 196,78"
                      stroke="#e11d48"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 172,61 L 199,78 L 170,95"
                      stroke="#e11d48"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>

                <div className="handwritten-contact-links">
                  <div className="handwritten-phone-row">
                    <span className="phone-icon-red">📞</span>
                    <span className="phone-text">+91 9399361193</span>
                  </div>
                  <div className="handwritten-linkedin-row">
                    <span className="linkedin-red-badge">in</span>
                    <a
                      href="https://linkedin.com/in/varunsehgal02"
                      target="_blank"
                      rel="noreferrer"
                      className="linkedin-link-text"
                    >
                      linkedin.com/in/varunsehgal02
                    </a>
                    <div className="linkedin-red-underline" />
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN 2-COLUMN GRID */}
            <div className="tactile-resume-grid">
              {/* LEFT COLUMN: Experience & Education Timeline */}
              <div className="tactile-column-left">
                <div className="tactile-timeline">
                  {/* Item 1 */}
                  <div className="tactile-timeline-item">
                    <div className="timeline-bullet-hollow" />
                    <div className="timeline-time-row">SEP 2024 — NOV 2024 • 6 MOS</div>
                    <h4 className="timeline-job-role">UI/UX Designer Intern</h4>
                    <div className="timeline-company-row">
                      <span className="company-name">UniEvent (EventFlow)</span>
                      <span className="company-dot">•</span>
                      <span className="badge-green-pill">Full-time</span>
                    </div>
                    <div className="timeline-loc-text">Bengaluru, Karnataka, India (Remote)</div>
                    <p className="timeline-bullet-desc">
                      Designed campus event ticketing platform (EventFlow). Slashed transaction drop-off by 30% across 4-step booking workflow across 50+ components.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="tactile-timeline-item">
                    <div className="timeline-bullet-hollow" />
                    <div className="timeline-time-row">AUG 2024 — JAN 2025 • 6 MOS</div>
                    <h4 className="timeline-job-role">Assistant Head of Operations / UI/UX Intern</h4>
                    <div className="timeline-company-row">
                      <span className="company-name">Assemble</span>
                      <span className="company-dot">•</span>
                      <span className="badge-green-pill">Full-time</span>
                    </div>
                    <div className="timeline-loc-text">Remote</div>
                    <p className="timeline-bullet-desc">
                      Designed collaborative creator workspace tools and interaction prototypes in Figma. Coordinated operations for multi-team competitions.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="tactile-timeline-item">
                    <div className="timeline-bullet-hollow" />
                    <div className="timeline-time-row">JUN 2024 — AUG 2024 • 3 MOS</div>
                    <h4 className="timeline-job-role">UI/UX Designer Intern</h4>
                    <div className="timeline-company-row">
                      <span className="company-name">Knaptix Ventures</span>
                      <span className="company-dot">•</span>
                      <span className="badge-green-pill">Internship</span>
                    </div>
                    <div className="timeline-loc-text">Remote</div>
                    <p className="timeline-bullet-desc">
                      Delivered brand identities and conversion-focused SaaS landing pages for 10+ tech startups with a 95% client retention rate.
                    </p>
                  </div>

                  {/* Education */}
                  <div className="tactile-timeline-item">
                    <div className="timeline-bullet-hollow" />
                    <div className="timeline-time-row">2023 — 2027</div>
                    <h4 className="timeline-job-role">Jaypee University of Engineering &amp; Technology</h4>
                    <div className="timeline-company-row">
                      <span className="company-name">B.Tech in Computer Science &amp; Engineering</span>
                      <span className="company-dot">•</span>
                      <span className="badge-green-pill">CGPA 8.5</span>
                    </div>
                    <div className="timeline-loc-text">Guna, Madhya Pradesh, India</div>
                  </div>

                  {/* Hackathons & Honors */}
                  <div className="tactile-timeline-item">
                    <div className="timeline-bullet-hollow" />
                    <div className="timeline-time-row">HACKATHONS &amp; HONORS</div>
                    <div className="timeline-honor-item">
                      <span className="honor-text">🏆 <strong>HACKeThor Winner</strong> (1st Place National Hackathon by Unstop)</span>
                    </div>
                    <div className="timeline-honor-item">
                      <span className="honor-text">CodeSrijan Organizer (Lead UI/UX for 200+ hackers)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Stickers Cluster + 4x2 Software Tiles */}
              <div className="tactile-column-right">
                {/* Tactile Stickers Cluster */}
                <div className="stickers-cluster-box">
                  {/* 1. Kraft Tape Banner */}
                  <div className="sticker-tape-kraft">
                    <span className="sticker-icon">📢</span>
                    <span>PROMOTIONAL DESIGN</span>
                  </div>

                  {/* 2. Green Ribbon Tape */}
                  <div className="sticker-torn-green">
                    <span>EDITORIAL &amp; DESIGN SYSTEMS</span>
                  </div>

                  {/* 3. Slanted Pink Triangle */}
                  <div className="sticker-triangle-container">
                    <div className="sticker-triangle-shape">
                      <span className="triangle-inner-pill">UI DESIGN</span>
                    </div>
                  </div>

                  {/* 4. Cyan Circle */}
                  <div className="sticker-circle-cyan">
                    <span>MOTION<br />GRAPHICS</span>
                  </div>

                  {/* 5. Soft Periwinkle Capsule */}
                  <div className="sticker-pill-indigo">
                    <span>✦ AI UX &amp; PROTOTYPING</span>
                  </div>
                </div>

                {/* 4x2 Software & Skills App Tiles (Matching Image) */}
                <div className="tactile-software-grid">
                  {/* 1. After Effects */}
                  <div className="software-app-tile">
                    <div className="software-tile-icon adobe-ae">
                      <span>Ae</span>
                    </div>
                    <span className="software-tile-name">After Effects</span>
                  </div>

                  {/* 2. Premiere Pro */}
                  <div className="software-app-tile">
                    <div className="software-tile-icon adobe-pr">
                      <span>Pr</span>
                    </div>
                    <span className="software-tile-name">Premiere Pro</span>
                  </div>

                  {/* 3. Photoshop */}
                  <div className="software-app-tile">
                    <div className="software-tile-icon adobe-ps">
                      <span>Ps</span>
                    </div>
                    <span className="software-tile-name">Photoshop</span>
                  </div>

                  {/* 4. Illustrator */}
                  <div className="software-app-tile">
                    <div className="software-tile-icon adobe-ai">
                      <span>Ai</span>
                    </div>
                    <span className="software-tile-name">Illustrator</span>
                  </div>

                  {/* 5. Figma */}
                  <div className="software-app-tile">
                    <div className="software-tile-icon figma-icon">
                      <svg width="18" height="26" viewBox="0 0 38 57" fill="none">
                        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
                        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
                        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
                        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
                        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
                      </svg>
                    </div>
                    <span className="software-tile-name">Figma</span>
                  </div>

                  {/* 6. React / Next */}
                  <div className="software-app-tile">
                    <div className="software-tile-icon react-icon">
                      <svg width="22" height="20" viewBox="0 0 115.3 100" fill="#00d8ff">
                        <ellipse cx="57.6" cy="50" rx="15" ry="46" transform="rotate(-60 57.6 50)" />
                        <ellipse cx="57.6" cy="50" rx="15" ry="46" />
                        <ellipse cx="57.6" cy="50" rx="15" ry="46" transform="rotate(60 57.6 50)" />
                        <circle cx="57.6" cy="50" r="10" fill="#00d8ff" />
                      </svg>
                    </div>
                    <span className="software-tile-name">React / Next</span>
                  </div>

                  {/* 7. Tailwind CSS */}
                  <div className="software-app-tile">
                    <div className="software-tile-icon tailwind-icon">
                      <svg width="24" height="16" viewBox="0 0 54 33" fill="#38bdf8">
                        <path d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
                      </svg>
                    </div>
                    <span className="software-tile-name">Tailwind CSS</span>
                  </div>

                  {/* 8. TypeScript */}
                  <div className="software-app-tile">
                    <div className="software-tile-icon ts-icon">
                      <span>TS</span>
                    </div>
                    <span className="software-tile-name">TypeScript</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Accent: Yellow Highlighter Band with Software Skills Text */}
            <div className="tactile-bottom-accent-band">
              <div className="bottom-yellow-highlighter-stripe" />
              <div className="bottom-script-headline">Software Skills</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeApp;
