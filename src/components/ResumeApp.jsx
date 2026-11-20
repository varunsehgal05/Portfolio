import React, { useRef, useEffect, useState } from 'react';
import KittuResumeApp from './KittuResumeApp';
import './ResumeApp.css';
import {
  Download,
  FileText,
  ZoomIn,
  ZoomOut
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
            <span className="doc-name">Varun_Sehgal_Resume_Kittu.pdf</span>
          </div>
          <span className="page-pill">kittu.pro</span>
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
          <KittuResumeApp />
        </div>
      </div>
    </div>
  );
};

export default ResumeApp;
