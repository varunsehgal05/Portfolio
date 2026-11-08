import React, { useState, useEffect } from 'react';
import { ArrowRight, User, Sparkles, Laptop } from 'lucide-react';
import './MacBootScreen.css';

const MacBootScreen = ({ onComplete }) => {
  const [stage, setStage] = useState('progress'); // 'progress' | 'name-prompt'
  const [progress, setProgress] = useState(0);
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Apple boot progress bar simulation
  useEffect(() => {
    if (stage !== 'progress') return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStage('name-prompt');
          }, 350);
          return 100;
        }
        // Realistic non-linear Apple boot loading
        const increment = prev < 40 ? 5 : prev < 75 ? 8 : prev < 90 ? 4 : 10;
        return Math.min(100, prev + increment);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [stage]);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const finalName = userName.trim() || 'Guest';
    try {
      localStorage.setItem('varunos_user_name', finalName);
    } catch (err) {
      // ignore
    }

    // Smooth exit transition
    setTimeout(() => {
      if (onComplete) {
        onComplete(finalName);
      }
    }, 450);
  };

  const handleQuickPick = (name) => {
    setUserName(name);
  };

  return (
    <div className={`mac-boot-container ${isSubmitting ? 'fade-out' : ''}`}>
      {stage === 'progress' && (
        <div className="mac-boot-apple-stage">
          {/* Authentic Apple Logo */}
          <div className="mac-apple-logo">
            <svg width="68" height="82" viewBox="0 0 170 170" fill="none">
              <path
                d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.73-7.98-12.1-14.7-5.99-9.17-10.79-19.64-14.41-31.41-3.63-11.77-5.45-23.01-5.45-33.72 0-14.03 3.66-25.59 10.98-34.68 7.33-9.09 16.48-13.72 27.46-13.88 5.01 0 10.41 1.29 16.19 3.86 5.78 2.58 9.53 3.91 11.26 4 2.12-.18 6.07-1.57 11.86-4.17 5.79-2.6 11.06-3.83 15.81-3.7 11.64.49 20.89 4.63 27.76 12.43-10.15 6.18-15.11 14.86-14.87 26.04.24 8.7 3.53 15.96 9.87 21.78 6.34 5.82 13.8 9.17 22.37 10.05-1.91 5.99-4.37 12.03-7.38 18.11zM119.22 33.15c0-6.98 2.54-13.62 7.62-19.92 5.08-6.3 11.45-10.5 19.11-12.61.12 1.09.18 1.95.18 2.58 0 6.86-2.67 13.52-8 19.99-5.33 6.47-11.77 10.45-19.33 11.94-.48-.61-.75-1.27-.75-1.98z"
                fill="#ffffff"
              />
            </svg>
          </div>

          {/* Apple Boot Progress Bar */}
          <div className="mac-boot-bar-track">
            <div
              className="mac-boot-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {stage === 'name-prompt' && (
        <div className="mac-setup-stage">
          <div className="mac-setup-card">
            {/* User Icon Badge */}
            <div className="mac-setup-avatar-wrap">
              <div className="mac-setup-avatar">
                {userName.trim() ? (
                  <span className="avatar-initials">
                    {userName.trim().slice(0, 2).toUpperCase()}
                  </span>
                ) : (
                  <User size={34} color="#f4f4f5" />
                )}
              </div>
              <div className="avatar-status-dot"></div>
            </div>

            <h1 className="mac-setup-title">Welcome to VarunOS</h1>
            <p className="mac-setup-subtitle">
              Enter your name to personalize your workspace & collaborate live in Figma.
            </p>

            <form onSubmit={handleSubmit} className="mac-setup-form">
              <div className="mac-input-wrapper">
                <input
                  type="text"
                  className="mac-setup-input"
                  placeholder="Enter your name..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  autoFocus
                  maxLength={24}
                />
                <button
                  type="submit"
                  className="mac-setup-submit-btn"
                  title="Continue to Desktop"
                >
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Quick suggestion chips */}
              <div className="mac-quick-chips">
                <span className="chips-label">Quick select:</span>
                {['Designer', 'Recruiter', 'Alex', 'Guest'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className={`mac-chip ${userName === chip ? 'active' : ''}`}
                    onClick={() => handleQuickPick(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <div className="mac-setup-footer">
                <button
                  type="button"
                  className="mac-skip-link"
                  onClick={handleSubmit}
                >
                  Continue as Guest ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MacBootScreen;
