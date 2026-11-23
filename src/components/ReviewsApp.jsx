import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Mail, 
  ShieldCheck, 
  ShieldAlert, 
  Award, 
  MessageSquarePlus, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  User,
  Filter,
  X
} from 'lucide-react';

const LinkedInIcon = ({ size = 14, color = '#0a66c2' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32Z"/>
  </svg>
);
import { 
  checkContentSafety, 
  getStrikeStatus, 
  recordStrike, 
  isClientBanned, 
  getStoredReviews, 
  saveReview 
} from '../utils/contentModeration';
import './ReviewsApp.css';

const ReviewsApp = ({ onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'add'
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('all');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  
  // Status & Feedback
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [strikeInfo, setStrikeInfo] = useState({ strikes: 0, isBanned: false });

  // Load reviews and strike status on mount
  useEffect(() => {
    setReviews(getStoredReviews());
    setStrikeInfo(getStrikeStatus());
  }, []);

  const handleRatingClick = (val) => {
    setRating(val);
  };

  const handleRatingHover = (val) => {
    setHoverRating(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Check if client is already banned
    if (strikeInfo.isBanned || isClientBanned()) {
      setFormError('Submission restricted. Network security policy enforced.');
      return;
    }

    // Basic validation
    if (!name.trim()) {
      setFormError('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!text.trim() || text.trim().length < 10) {
      setFormError('Please share at least a short sentence (10+ characters) for your review.');
      return;
    }

    setIsSubmitting(true);

    // AI & Multi-Language 18+ Content Moderation Bot Check
    const safetyCheck = checkContentSafety(text, name, email, linkedIn);

    if (!safetyCheck.isSafe) {
      setIsSubmitting(false);
      // Violates 18+ / profanity policy -> DO NOT UPLOAD! Record strike.
      const newStrikeResult = recordStrike();
      setStrikeInfo(newStrikeResult);

      if (newStrikeResult.isBanned) {
        setFormError('Action blocked. Multiple violations detected. Connection restricted.');
      } else {
        setFormError(`⚠️ AutoMod Warning: 18+ or offensive language detected. Submission rejected. Strike ${newStrikeResult.strikes}/3 recorded.`);
      }
      return;
    }

    // Safe to upload
    setTimeout(() => {
      const created = saveReview({
        name,
        email,
        linkedIn,
        role: role || 'Peer Reviewer',
        rating,
        text
      });

      if (created) {
        setReviews(getStoredReviews());
        setFormSuccess(true);
        setName('');
        setEmail('');
        setLinkedIn('');
        setRole('');
        setRating(5);
        setText('');
        setTimeout(() => {
          setFormSuccess(false);
          setActiveTab('list');
        }, 1800);
      } else {
        setFormError('Could not save review. Please try again.');
      }
      setIsSubmitting(false);
    }, 450);
  };

  const filteredReviews = reviews.filter(r => {
    if (selectedRatingFilter === 'all') return true;
    return r.rating === Number(selectedRatingFilter);
  });

  const avgRating = (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / (reviews.length || 1)).toFixed(1);

  return (
    <div className="reviews-app-container">
      {/* Top Header Bar */}
      <header className="reviews-header">
        <div className="reviews-header-left">
          <div className="reviews-app-icon">
            <Star size={24} color="#f59e0b" fill="#f59e0b" />
          </div>
          <div>
            <h1 className="reviews-title">Reviews & Recommendations</h1>
            <p className="reviews-subtitle">Verified feedback from colleagues, clients & hackathon peers</p>
          </div>
        </div>

        <div className="reviews-header-actions">
          <button 
            className={`reviews-tab-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            All Reviews ({reviews.length})
          </button>
          <button 
            className={`reviews-tab-btn write-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <MessageSquarePlus size={15} />
            <span>Drop a Review</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="reviews-content-wrapper">
        {/* Banner Summary Metrics */}
        <section className="reviews-stats-banner">
          <div className="stat-pill">
            <span className="stat-num">{avgRating}</span>
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={14} color="#f59e0b" fill="#f59e0b" />
              ))}
            </div>
            <span className="stat-label">5.0 Star Average</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-pill">
            <span className="stat-num">{reviews.length}+</span>
            <span className="stat-label">Total Endorsements</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-pill">
            <div className="bot-status-badge">
              <ShieldCheck size={16} color="#10b981" />
              <span>AutoMod Active</span>
            </div>
            <span className="stat-label">Safe &amp; Verified Community</span>
          </div>
        </section>

        {activeTab === 'list' ? (
          /* TAB 1: ALL REVIEWS LIST */
          <div className="reviews-list-section">
            <div className="reviews-filter-bar">
              <div className="filter-group">
                <Filter size={14} color="#94a3b8" />
                <span className="filter-label">Filter:</span>
                <button 
                  className={`filter-chip ${selectedRatingFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedRatingFilter('all')}
                >
                  All ({reviews.length})
                </button>
                <button 
                  className={`filter-chip ${selectedRatingFilter === '5' ? 'active' : ''}`}
                  onClick={() => setSelectedRatingFilter('5')}
                >
                  5 Stars ⭐
                </button>
              </div>

              <span className="automod-disclaimer">
                🛡️ AI-moderated: 18+ content strictly filtered
              </span>
            </div>

            <div className="reviews-grid">
              {filteredReviews.map((rev) => (
                <div key={rev.id} className="review-card">
                  <div className="review-card-top">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        {rev.avatar ? (
                          <img src={rev.avatar} alt={rev.name} />
                        ) : (
                          <div className="avatar-placeholder">
                            {rev.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="reviewer-name-row">
                          <h4 className="reviewer-name">{rev.name}</h4>
                          {rev.verified && (
                            <span className="verified-pill" title="Verified Professional Endorsement">
                              <CheckCircle2 size={12} color="#10b981" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>
                        <p className="reviewer-role">{rev.role}{rev.company ? ` • ${rev.company}` : ''}</p>
                      </div>
                    </div>

                    <div className="review-rating-block">
                      <div className="stars-row">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star 
                            key={s} 
                            size={14} 
                            color={s <= rev.rating ? "#f59e0b" : "#475569"} 
                            fill={s <= rev.rating ? "#f59e0b" : "transparent"} 
                          />
                        ))}
                      </div>
                      <span className="review-date">{rev.date}</span>
                    </div>
                  </div>

                  <p className="review-text">"{rev.text}"</p>

                  <div className="review-card-footer">
                    {rev.linkedIn ? (
                      <a 
                        href={rev.linkedIn.startsWith('http') ? rev.linkedIn : `https://${rev.linkedIn}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="linkedin-badge"
                        title="View LinkedIn Profile"
                      >
                        <LinkedInIcon size={13} color="#0a66c2" />
                        <span>LinkedIn Profile</span>
                        <ExternalLink size={10} color="#94a3b8" />
                      </a>
                    ) : (
                      <span className="community-badge">Community Review</span>
                    )}

                    {rev.email && (
                      <span className="email-domain-tag">
                        {rev.email.split('@')[1] ? `@${rev.email.split('@')[1]}` : 'verified'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* TAB 2: DROP A REVIEW FORM */
          <div className="review-form-container">
            <div className="form-card">
              <div className="form-header">
                <div className="form-header-badge">
                  <Sparkles size={16} color="#f59e0b" />
                  <span>Leave Feedback</span>
                </div>
                <h3>Drop a Review for Varun Sehgal</h3>
                <p>Share your experience working with Varun across UI/UX design, design systems, or full-stack projects.</p>
              </div>

              {strikeInfo.isBanned ? (
                <div className="banned-lockout-notice">
                  <ShieldAlert size={36} color="#ef4444" />
                  <h4>Service Temporarily Unavailable</h4>
                  <p>Reviews submission is restricted by VarunOS system security policies.</p>
                </div>
              ) : formSuccess ? (
                <div className="form-success-message">
                  <CheckCircle2 size={44} color="#10b981" />
                  <h4>Thank You for Your Review!</h4>
                  <p>Your feedback has passed AutoMod verification and is now live on VarunOS.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="review-input-form">
                  {formError && (
                    <div className="form-error-alert">
                      <ShieldAlert size={16} color="#ef4444" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {strikeInfo.strikes > 0 && !strikeInfo.isBanned && (
                    <div className="strike-warning-banner">
                      <span>⚠️ Notice: {strikeInfo.strikes} of 3 community guideline warning(s) on record for this device.</span>
                    </div>
                  )}

                  <div className="form-row two-col">
                    <div className="form-group">
                      <label htmlFor="rev-name">Full Name *</label>
                      <input 
                        id="rev-name"
                        type="text" 
                        placeholder="e.g. Elena Rostova" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="rev-email">Work Email *</label>
                      <input 
                        id="rev-email"
                        type="email" 
                        placeholder="e.g. elena@company.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="form-row two-col">
                    <div className="form-group">
                      <label htmlFor="rev-linkedin">LinkedIn Profile URL</label>
                      <div className="input-with-icon">
                        <LinkedInIcon size={16} color="#0a66c2" className="input-icon" />
                        <input 
                          id="rev-linkedin"
                          type="text" 
                          placeholder="linkedin.com/in/username" 
                          value={linkedIn} 
                          onChange={(e) => setLinkedIn(e.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="rev-role">Role / Relationship</label>
                      <input 
                        id="rev-role"
                        type="text" 
                        placeholder="e.g. Product Designer, Client, Teammate" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* 5 Star Rating Picker */}
                  <div className="form-group rating-picker-group">
                    <label>Overall Rating *</label>
                    <div className="star-picker-row">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="star-btn"
                          onMouseEnter={() => handleRatingHover(s)}
                          onMouseLeave={() => handleRatingHover(0)}
                          onClick={() => handleRatingClick(s)}
                          disabled={isSubmitting}
                          title={`${s} Stars`}
                        >
                          <Star 
                            size={28} 
                            color={s <= (hoverRating || rating) ? "#f59e0b" : "#475569"} 
                            fill={s <= (hoverRating || rating) ? "#f59e0b" : "transparent"} 
                          />
                        </button>
                      ))}
                      <span className="rating-desc">
                        {((hoverRating || rating) === 5 && '5.0 — Exceptional') ||
                         ((hoverRating || rating) === 4 && '4.0 — Great Work') ||
                         ((hoverRating || rating) === 3 && '3.0 — Good') ||
                         ((hoverRating || rating) === 2 && '2.0 — Needs Improvement') ||
                         '1.0 — Poor'}
                      </span>
                    </div>
                  </div>

                  {/* Review Text Area */}
                  <div className="form-group">
                    <div className="label-with-meta">
                      <label htmlFor="rev-text">Your Review &amp; Recommendation *</label>
                      <span className="char-count">{text.length} / 500</span>
                    </div>
                    <textarea 
                      id="rev-text"
                      rows={4}
                      maxLength={500}
                      placeholder="Write your candid feedback on collaborating with Varun, his design skills, responsiveness, or project results..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* AutoMod Policy Badge */}
                  <div className="automod-security-badge">
                    <ShieldCheck size={16} color="#10b981" />
                    <span>
                      <strong>AI AutoMod Protection:</strong> All reviews are inspected for multi-language 18+ content and profanity. 3-strike policy applies.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="form-actions-row">
                    <button 
                      type="button" 
                      className="cancel-btn" 
                      onClick={() => setActiveTab('list')}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="submit-review-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Verifying with AutoMod...' : 'Submit Review ⭐'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsApp;
