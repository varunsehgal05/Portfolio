import React, { useState, useEffect, useMemo } from 'react';
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
  X,
  Quote,
  Building2,
  Check,
  Search,
  ThumbsUp
} from 'lucide-react';

const LinkedInIcon = ({ size = 13, color = '#0a66c2' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ color, flexShrink: 0 }}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32Z"/>
  </svg>
);

import { 
  checkContentSafety,
  checkContentSafetyWithGemini,
  banClient,
  recordStrike, 
  isClientBanned, 
  getStoredReviews, 
  saveReview 
} from '../utils/contentModeration';
import './ReviewsApp.css';

// Contextual storytelling helper linking reviews to verified portfolio milestones
const getReviewHighlight = (rev) => {
  const textLower = (rev.text || '').toLowerCase();
  const companyLower = (rev.company || '').toLowerCase();
  const roleLower = (rev.role || '').toLowerCase();

  if (rev.id === 'seed-2' || companyLower.includes('codesrijan') || textLower.includes('codesrijan')) {
    return {
      label: 'CodeSrijan Hackathon Portal',
      metric: '200+ Hackers • Zero-to-Production',
      category: 'hackathon',
      badgeClass: 'highlight-cyan',
      icon: '🚀'
    };
  }
  if (rev.id === 'seed-4' || textLower.includes('hackethor') || companyLower.includes('unstop')) {
    return {
      label: 'National HACKeThor Hackathon',
      metric: '🥈 1st Runner-Up (2nd Place)',
      category: 'hackathon',
      badgeClass: 'highlight-amber',
      icon: '🏆'
    };
  }
  if (rev.id === 'seed-3' || companyLower.includes('knaptix') || textLower.includes('saas') || textLower.includes('conversion')) {
    return {
      label: 'SaaS Growth & Conversion',
      metric: '10+ Tech Startups • 95% Retention',
      category: 'saas',
      badgeClass: 'highlight-emerald',
      icon: '⚡'
    };
  }
  if (rev.id === 'seed-1' || companyLower.includes('assemble') || textLower.includes('design system') || textLower.includes('figma')) {
    return {
      label: 'Esports Broadcast & Figma Tokens',
      metric: 'Component Architecture & 60 FPS UX',
      category: 'design',
      badgeClass: 'highlight-purple',
      icon: '🎨'
    };
  }
  return {
    label: rev.company || 'Peer Endorsement',
    metric: 'Verified Industry Collaboration',
    category: 'general',
    badgeClass: 'highlight-blue',
    icon: '✦'
  };
};

const ReviewsApp = ({ onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'add'
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'hackathon' | 'saas' | 'design' | '5stars'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  
  // Status & Feedback
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load reviews on mount and when updated from Admin Portal
  useEffect(() => {
    const refreshReviews = () => setReviews(getStoredReviews());
    refreshReviews();
    window.addEventListener('varunos-reviews-updated', refreshReviews);
    return () => window.removeEventListener('varunos-reviews-updated', refreshReviews);
  }, []);

  const handleRatingClick = (val) => {
    setRating(val);
  };

  const handleRatingHover = (val) => {
    setHoverRating(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Check if client is already banned
    if (isClientBanned()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setFormError('Message failed to send. Please check your connection and try again.');
      }, 700);
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

    // AI & Multi-Language Content Moderation Check powered by Gemini 2.5 Flash
    const safetyCheck = await checkContentSafetyWithGemini(text, name, email, linkedIn);

    if (!safetyCheck.isSafe) {
      // Violates 18+ / profanity policy -> Silently ban client IP & device
      banClient(null, `AI Moderation violation: ${safetyCheck.flaggedTerm || safetyCheck.reason}`);

      setTimeout(() => {
        setIsSubmitting(false);
        setFormError('Message failed to send. Please check your connection and try again.');
      }, 750);
      return;
    }

    // Safe to upload
    setTimeout(() => {
      const created = saveReview({
        name,
        email,
        linkedIn,
        role: role || 'Peer Reviewer',
        company: company || 'Tech Community',
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
        setCompany('');
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

  // Filter reviews by Category and Search Query
  const filteredReviews = useMemo(() => {
    return reviews.filter(rev => {
      const highlight = getReviewHighlight(rev);

      // Category filter
      if (categoryFilter === 'hackathon' && highlight.category !== 'hackathon') return false;
      if (categoryFilter === 'saas' && highlight.category !== 'saas') return false;
      if (categoryFilter === 'design' && highlight.category !== 'design') return false;
      if (categoryFilter === '5stars' && rev.rating !== 5) return false;

      // Text search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = (rev.name || '').toLowerCase().includes(q);
        const matchesRole = (rev.role || '').toLowerCase().includes(q);
        const matchesCompany = (rev.company || '').toLowerCase().includes(q);
        const matchesText = (rev.text || '').toLowerCase().includes(q);
        const matchesHighlight = highlight.label.toLowerCase().includes(q) || highlight.metric.toLowerCase().includes(q);
        if (!matchesName && !matchesRole && !matchesCompany && !matchesText && !matchesHighlight) {
          return false;
        }
      }

      return true;
    });
  }, [reviews, categoryFilter, searchQuery]);

  const avgRating = (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / (reviews.length || 1)).toFixed(1);

  return (
    <div className="reviews-app-container">
      {/* Sleek Ultra-Glass macOS Toolbar Header */}
      <header className="reviews-header">
        <div className="reviews-header-left">
          <div className="reviews-title-wrap">
            <div className="reviews-title-row">
              <h1 className="reviews-title">Recommendations</h1>
              <span className="reviews-rating-pill">
                <Star size={11} color="#f59e0b" fill="#f59e0b" />
                <span>{avgRating}</span>
                <span className="pill-dot">•</span>
                <span>{reviews.length} Verified</span>
              </span>
            </div>
            <p className="reviews-subtitle">
              Feedback from hackathon teammates, design leads &amp; founders
            </p>
          </div>
        </div>

        <div className="reviews-header-actions">
          {activeTab === 'list' ? (
            <button 
              className="reviews-cta-btn"
              onClick={() => setActiveTab('add')}
              title="Add a new recommendation for Varun Sehgal"
            >
              <MessageSquarePlus size={14} />
              <span>Write a Review</span>
            </button>
          ) : (
            <button 
              className="reviews-back-btn"
              onClick={() => setActiveTab('list')}
            >
              <X size={14} />
              <span>Back to Reviews</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="reviews-content-wrapper">
        {activeTab === 'list' ? (
          <>
            {/* Minimal Filter & Search Bar */}
            <div className="reviews-filter-bar">
              <div className="filter-chips-row">
                <button 
                  className={`filter-chip ${categoryFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setCategoryFilter('all')}
                >
                  <span>All ({reviews.length})</span>
                </button>
                <button 
                  className={`filter-chip ${categoryFilter === 'hackathon' ? 'active' : ''}`}
                  onClick={() => setCategoryFilter('hackathon')}
                >
                  <span>Hackathons</span>
                </button>
                <button 
                  className={`filter-chip ${categoryFilter === 'saas' ? 'active' : ''}`}
                  onClick={() => setCategoryFilter('saas')}
                >
                  <span>SaaS</span>
                </button>
                <button 
                  className={`filter-chip ${categoryFilter === 'design' ? 'active' : ''}`}
                  onClick={() => setCategoryFilter('design')}
                >
                  <span>Design Systems</span>
                </button>
              </div>

              <div className="search-input-wrap">
                <Search size={13} className="search-icon" />
                <input 
                  type="text"
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Reviews Grid */}
            {filteredReviews.length === 0 ? (
              <div className="reviews-empty-state">
                <Quote size={28} style={{ opacity: 0.25 }} />
                <h3>No recommendations found</h3>
                <p>Try searching for another keyword or clearing the filter.</p>
                <button 
                  className="reset-filter-btn"
                  onClick={() => { setCategoryFilter('all'); setSearchQuery(''); }}
                >
                  View All Reviews
                </button>
              </div>
            ) : (
              <div className="reviews-grid">
                {filteredReviews.map((rev) => {
                  const highlight = getReviewHighlight(rev);
                  return (
                    <article key={rev.id} className="review-card">
                      {/* Top Header: Context Tag & Rating */}
                      <div className="card-header-meta">
                        {highlight.label && (
                          <span className="card-context-tag">
                            {highlight.label}
                          </span>
                        )}

                        <div className="review-rating-block">
                          <div className="card-stars-row">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star 
                                key={s} 
                                size={12} 
                                color={s <= rev.rating ? "#f59e0b" : "#334155"} 
                                fill={s <= rev.rating ? "#f59e0b" : "transparent"} 
                              />
                            ))}
                          </div>
                          <span className="review-date">• {rev.date}</span>
                        </div>
                      </div>

                      {/* Main Quote Content */}
                      <div className="review-text-wrap">
                        <p className="review-text">"{rev.text}"</p>
                      </div>

                      {/* Reviewer Profile Footer */}
                      <div className="review-card-footer">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">
                            {rev.avatar ? (
                              <img src={rev.avatar} alt={rev.name} loading="lazy" />
                            ) : (
                              <div className="avatar-placeholder">
                                {rev.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="reviewer-meta">
                            <div className="reviewer-name-row">
                              <h4 className="reviewer-name">{rev.name}</h4>
                              {rev.verified && (
                                <CheckCircle2 size={13} className="verified-icon" title="Verified Endorsement" />
                              )}
                            </div>
                            <p className="reviewer-role">
                              <span>{rev.role}</span>
                              {rev.company && <span className="company-suffix"> • {rev.company}</span>}
                            </p>
                          </div>
                        </div>

                        {rev.linkedIn && (
                          <a 
                            href={rev.linkedIn.startsWith('http') ? rev.linkedIn : `https://${rev.linkedIn}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="clean-linkedin-link"
                            title={`View ${rev.name}'s LinkedIn Profile`}
                          >
                            <LinkedInIcon size={12} color="#94a3b8" />
                            <span>LinkedIn</span>
                            <ExternalLink size={10} className="link-arrow" />
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* TAB 2: DROP A REVIEW FORM */
          <div className="review-form-container">
            <div className="form-card">
              <div className="form-header">
                <div className="form-header-badge">
                  <Sparkles size={13} color="#f59e0b" />
                  <span>Verified Endorsement</span>
                </div>
                <h3>Drop a Recommendation for Varun Sehgal</h3>
                <p>
                  Share your authentic collaboration experience across UI/UX product design, interactive prototypes, or design engineering.
                </p>
              </div>

              {formSuccess ? (
                <div className="form-success-message">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={44} color="#10b981" />
                  </div>
                  <h4>Thank You for Your Endorsement!</h4>
                  <p>Your recommendation passed safety verification and is now live on VarunOS.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="review-input-form">
                  {formError && (
                    <div className="form-error-alert">
                      <ShieldAlert size={16} color="#ef4444" />
                      <span>{formError}</span>
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
                        <LinkedInIcon size={14} color="#0a66c2" />
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
                      <label htmlFor="rev-role">Role &amp; Organization</label>
                      <input 
                        id="rev-role"
                        type="text" 
                        placeholder="e.g. Product Manager at Tech Corp" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* 5 Star Rating Picker */}
                  <div className="form-group rating-picker-group">
                    <label>Overall Experience Rating *</label>
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
                        {((hoverRating || rating) === 5 && '5.0 — Exceptional Craftsmanship & Collaboration') ||
                         ((hoverRating || rating) === 4 && '4.0 — Great Product Impact') ||
                         ((hoverRating || rating) === 3 && '3.0 — Good Execution') ||
                         ((hoverRating || rating) === 2 && '2.0 — Needs Improvement') ||
                         '1.0 — Poor'}
                      </span>
                    </div>
                  </div>

                  {/* Review Text Area */}
                  <div className="form-group">
                    <div className="label-with-meta">
                      <label htmlFor="rev-text">Your Recommendation &amp; Feedback *</label>
                      <span className="char-count">{text.length} / 500</span>
                    </div>
                    <textarea 
                      id="rev-text"
                      rows={4}
                      maxLength={500}
                      placeholder="Share your authentic experience collaborating with Varun: design systems, prototyping speed, micro-interactions, rubric evaluation, or team synergy..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Community Verification Badge */}
                  <div className="automod-security-badge">
                    <ShieldCheck size={16} color="#10b981" />
                    <span>
                      <strong>Verified Community:</strong> Submissions are checked in real-time by Gemini AI moderation for authentic peer recommendations.
                    </span>
                  </div>

                  {/* Submit Actions */}
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
                      {isSubmitting ? 'Verifying & Posting...' : 'Post Recommendation ⭐'}
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
