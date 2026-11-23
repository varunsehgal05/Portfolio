import { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  User, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  ShieldAlert, 
  Sparkles, 
  Check, 
  Copy, 
  Download, 
  Upload, 
  RotateCcw, 
  Trash2, 
  Plus, 
  LogOut, 
  ExternalLink, 
  ArrowLeft,
  Activity,
  AlertTriangle,
  Send
} from 'lucide-react';
import { 
  getCMSData, 
  saveCMSData, 
  resetCMSData, 
  exportCMSConfigJSON, 
  importCMSConfigJSON 
} from '../utils/portfolioCMS';
import { 
  getStoredReviews, 
  deleteReview, 
  getBannedClients, 
  unbanClient, 
  manuallyBanIp, 
  clearAllBans, 
  getModerationLogs,
  checkContentSafetyWithGemini 
} from '../utils/contentModeration';
import './AdminPortal.css';

// Admin Authentication Credentials requested
const ADMIN_USERNAME = 'Varun!';
const ADMIN_PASSWORD = 'V@run2Sehgal05!';

export default function AdminPortal({ onExit }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('varunos_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin Section Tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'profile' | 'projects' | 'experience' | 'reviews' | 'security' | 'backup'

  // CMS State
  const [cms, setCms] = useState(getCMSData);
  const [toastMessage, setToastMessage] = useState(null);

  // Reviews State
  const [reviewsList, setReviewsList] = useState([]);

  // Security Monitor State
  const [bannedList, setBannedList] = useState([]);
  const [moderationLogs, setModerationLogs] = useState([]);
  const [manualIpInput, setManualIpInput] = useState('');
  const [manualReasonInput, setManualReasonInput] = useState('');

  // Gemini AI Tester State
  const [geminiTestText, setGeminiTestText] = useState('');
  const [geminiTestAuthor, setGeminiTestAuthor] = useState('Test Visitor');
  const [geminiTesting, setGeminiTesting] = useState(false);
  const [geminiTestResult, setGeminiTestResult] = useState(null);

  // Backup Import State
  const [importJsonInput, setImportJsonInput] = useState('');

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Refresh data on mount & tab switch
  const refreshData = () => {
    setCms(getCMSData());
    setReviewsList(getStoredReviews());
    setBannedList(getBannedClients());
    setModerationLogs(getModerationLogs());
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated, activeTab]);

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      if (loginUsername.trim() === ADMIN_USERNAME && loginPassword === ADMIN_PASSWORD) {
        sessionStorage.setItem('varunos_admin_auth', 'true');
        setIsAuthenticated(true);
        setLoginUsername('');
        setLoginPassword('');
      } else {
        setLoginError('Invalid Administrator ID or Password.');
      }
      setIsLoggingIn(false);
    }, 400);
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('varunos_admin_auth');
    setIsAuthenticated(false);
  };

  // --- Profile Form Handlers ---
  const handleProfileFieldChange = (field, value) => {
    setCms(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handleSaveProfile = () => {
    saveCMSData({ profile: cms.profile });
    showToast('Profile & Bio updated live on VarunOS!');
  };

  // --- Projects Handlers ---
  const handleProjectFieldChange = (index, field, value) => {
    const updated = [...cms.projects];
    if (field === 'tags') {
      updated[index][field] = value.split(',').map(t => t.trim()).filter(Boolean);
    } else {
      updated[index][field] = value;
    }
    setCms(prev => ({ ...prev, projects: updated }));
  };

  const handleSaveProjects = () => {
    saveCMSData({ projects: cms.projects });
    showToast('Projects saved! Live site updated.');
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const filtered = cms.projects.filter(p => p.id !== projectId);
      setCms(prev => ({ ...prev, projects: filtered }));
      saveCMSData({ projects: filtered });
      showToast('Project removed.');
    }
  };

  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: 'New Featured Project',
      category: 'UI/UX Design • Web App',
      desc: 'Enter detailed description of the design architecture, user flows, and metrics achieved.',
      date: 'Nov 2026',
      size: '10.0 MB',
      tags: ['Figma', 'React', 'UI UX'],
      link: 'https://figma.com',
      appId: 'figma'
    };
    const updated = [newProj, ...cms.projects];
    setCms(prev => ({ ...prev, projects: updated }));
    saveCMSData({ projects: updated });
    showToast('New project created!');
  };

  // --- Experience Handlers ---
  const handleExperienceFieldChange = (index, field, value) => {
    const updated = [...cms.experiences];
    if (field === 'tags') {
      updated[index][field] = value.split(',').map(t => t.trim()).filter(Boolean);
    } else {
      updated[index][field] = value;
    }
    setCms(prev => ({ ...prev, experiences: updated }));
  };

  const handleSaveExperiences = () => {
    saveCMSData({ experiences: cms.experiences });
    showToast('Experience records saved live!');
  };

  const handleDeleteExperience = (expId) => {
    if (window.confirm('Delete this work experience entry?')) {
      const filtered = cms.experiences.filter(e => e.id !== expId);
      setCms(prev => ({ ...prev, experiences: filtered }));
      saveCMSData({ experiences: filtered });
      showToast('Experience entry deleted.');
    }
  };

  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      title: 'Senior Product Designer',
      company: 'Tech Studio (Remote)',
      date: '2026 – Present',
      desc: 'Architected scalable design systems, customer journey maps, and high-fidelity interaction prototypes.',
      tags: ['Figma', 'Design Systems', 'Leadership']
    };
    const updated = [newExp, ...cms.experiences];
    setCms(prev => ({ ...prev, experiences: updated }));
    saveCMSData({ experiences: updated });
    showToast('New experience role added!');
  };

  // --- Reviews Handlers ---
  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(reviewId);
      setReviewsList(getStoredReviews());
      showToast('Review permanently deleted.');
    }
  };

  // --- Security & Ban Monitor Handlers ---
  const handleUnbanIp = (ip) => {
    unbanClient(ip);
    setBannedList(getBannedClients());
    setModerationLogs(getModerationLogs());
    showToast(`Pardoned IP ${ip}!`);
  };

  const handleManualBan = (e) => {
    e.preventDefault();
    if (!manualIpInput.trim()) return;
    manuallyBanIp(manualIpInput.trim(), manualReasonInput.trim() || 'Manual Admin Blacklist');
    setBannedList(getBannedClients());
    setModerationLogs(getModerationLogs());
    setManualIpInput('');
    setManualReasonInput('');
    showToast('IP manually blacklisted.');
  };

  const handleClearAllBans = () => {
    if (window.confirm('Clear all IP blacklists and reset client restrictions?')) {
      clearAllBans();
      setBannedList([]);
      setModerationLogs(getModerationLogs());
      showToast('All IP bans cleared.');
    }
  };

  // --- Gemini AI Moderation Tester ---
  const handleRunGeminiTest = async () => {
    if (!geminiTestText.trim()) return;
    setGeminiTesting(true);
    setGeminiTestResult(null);

    const start = performance.now();
    try {
      const res = await checkContentSafetyWithGemini(geminiTestText, geminiTestAuthor);
      const latency = Math.round(performance.now() - start);
      setGeminiTestResult({
        ...res,
        latency,
        checkedAt: new Date().toLocaleTimeString()
      });
    } catch (err) {
      setGeminiTestResult({
        isSafe: false,
        reason: 'Error connecting to Gemini API',
        latency: 0
      });
    }
    setGeminiTesting(false);
  };

  // --- Backup Handlers ---
  const handleCopyConfig = () => {
    navigator.clipboard.writeText(exportCMSConfigJSON());
    showToast('Complete CMS JSON copied to clipboard!');
  };

  const handleDownloadConfig = () => {
    const jsonStr = exportCMSConfigJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `varunos-portfolio-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup JSON downloaded!');
  };

  const handleApplyImportedJson = () => {
    if (!importJsonInput.trim()) return;
    const res = importCMSConfigJSON(importJsonInput.trim());
    if (res) {
      setCms(getCMSData());
      setImportJsonInput('');
      showToast('Configuration successfully restored!');
    } else {
      alert('Failed to parse JSON. Please check syntax.');
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset ALL portfolio content and settings back to factory default?')) {
      resetCMSData();
      setCms(getCMSData());
      showToast('Reset to factory defaults.');
    }
  };

  // -------------------------------------------------------------
  // VIEW A: AUTHENTICATION LOCK SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          {/* macOS window titlebar */}
          <div className="admin-window-titlebar">
            <div className="admin-mac-controls">
              <button 
                type="button" 
                className="admin-mac-btn close" 
                onClick={onExit} 
                title="Return to Portfolio" 
              />
              <span className="admin-mac-btn minimize" />
              <span className="admin-mac-btn maximize" />
            </div>
            <span className="admin-window-title">VarunOS Security Verification</span>
          </div>

          <div className="admin-login-body">
            <div className="admin-shield-icon">
              <Shield size={38} className="shield-svg" />
              <Lock size={16} className="lock-svg" />
            </div>

            <h2 className="admin-title">VarunOS Portfolio Administration</h2>
            <p className="admin-subtitle">
              Enter authorized administrator credentials to manage live content, review moderation, and security policies.
            </p>

            <form onSubmit={handleLoginSubmit} className="admin-login-form">
              {loginError && (
                <div className="admin-error-box">
                  <ShieldAlert size={15} />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="admin-form-group">
                <label htmlFor="adm-id">Administrator ID</label>
                <div className="admin-input-wrapper">
                  <User size={15} className="input-icon" />
                  <input 
                    id="adm-id"
                    type="text" 
                    placeholder="Enter Admin ID"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label htmlFor="adm-pass">Security Password</label>
                <div className="admin-input-wrapper">
                  <Lock size={15} className="input-icon" />
                  <input 
                    id="adm-pass"
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Enter Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(p => !p)}
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="admin-login-actions">
                <button 
                  type="button" 
                  className="admin-cancel-btn"
                  onClick={onExit}
                >
                  Return to Site
                </button>
                <button 
                  type="submit" 
                  className="admin-submit-btn"
                  disabled={isLoggingIn}
                >
                  <Unlock size={14} />
                  <span>{isLoggingIn ? 'Authenticating...' : 'Unlock Admin Portal'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW B: MAIN ADMIN CONSOLE & CMS DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="admin-portal-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast">
          <Check size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="admin-navbar">
        <div className="admin-nav-left">
          <div className="admin-brand-pill">
            <Shield size={16} className="text-amber-400" />
            <span className="brand-text">VarunOS Admin Portal</span>
            <span className="version-tag">CMS v2.5</span>
          </div>
          <div className="admin-live-indicator">
            <span className="pulse-green-dot" />
            <span>Live Sync Active</span>
          </div>
        </div>

        <div className="admin-nav-tabs">
          <button 
            type="button" 
            className={`admin-nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Activity size={14} />
            <span>Overview</span>
          </button>
          <button 
            type="button" 
            className={`admin-nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={14} />
            <span>Profile & Bio</span>
          </button>
          <button 
            type="button" 
            className={`admin-nav-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <Briefcase size={14} />
            <span>Projects ({cms.projects.length})</span>
          </button>
          <button 
            type="button" 
            className={`admin-nav-tab ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <FileText size={14} />
            <span>Experience</span>
          </button>
          <button 
            type="button" 
            className={`admin-nav-tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <MessageSquare size={14} />
            <span>Reviews ({reviewsList.length})</span>
          </button>
          <button 
            type="button" 
            className={`admin-nav-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <ShieldAlert size={14} />
            <span>IP Ban Monitor ({bannedList.length})</span>
          </button>
          <button 
            type="button" 
            className={`admin-nav-tab ${activeTab === 'backup' ? 'active' : ''}`}
            onClick={() => setActiveTab('backup')}
          >
            <Download size={14} />
            <span>JSON Backup</span>
          </button>
        </div>

        <div className="admin-nav-right">
          <button 
            type="button" 
            className="admin-view-site-btn"
            onClick={onExit}
            title="Open VarunOS Desktop"
          >
            <ArrowLeft size={13} />
            <span>Exit to Site</span>
          </button>
          <button 
            type="button" 
            className="admin-logout-btn"
            onClick={handleLogout}
            title="Sign out of Admin Portal"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Area */}
      <main className="admin-main-content">
        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW & SYSTEM METRICS                          */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="admin-tab-pane">
            <div className="pane-hero">
              <div>
                <h2>Portfolio Management Dashboard</h2>
                <p>Real-time control center for live portfolio content, Gemini 2.5 Flash AutoMod, and client security.</p>
              </div>
              <div className="hero-action-buttons">
                <button type="button" className="btn-primary" onClick={() => setActiveTab('projects')}>
                  <Plus size={14} />
                  <span>Add Project</span>
                </button>
                <button type="button" className="btn-secondary" onClick={() => setActiveTab('security')}>
                  <ShieldAlert size={14} />
                  <span>View Ban Monitor</span>
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="admin-stats-grid">
              <div className="stat-card">
                <div className="stat-icon-wrap amber">
                  <Briefcase size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-num">{cms.projects.length}</span>
                  <span className="stat-label">Live Featured Projects</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrap emerald">
                  <MessageSquare size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-num">{reviewsList.length}</span>
                  <span className="stat-label">Published Recommendations</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrap red">
                  <ShieldAlert size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-num">{bannedList.length}</span>
                  <span className="stat-label">Blacklisted Client IPs</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrap purple">
                  <Sparkles size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-num">Gemini 2.5</span>
                  <span className="stat-label">AI Multi-Lingual AutoMod</span>
                </div>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="admin-two-col">
              <div className="admin-card">
                <h3>Live Profile Snapshot</h3>
                <div className="profile-snapshot-list">
                  <div className="snapshot-row">
                    <span className="s-label">Display Name:</span>
                    <span className="s-val font-semibold">{cms.profile.name}</span>
                  </div>
                  <div className="snapshot-row">
                    <span className="s-label">Role Title:</span>
                    <span className="s-val">{cms.profile.title}</span>
                  </div>
                  <div className="snapshot-row">
                    <span className="s-label">Direct Email:</span>
                    <span className="s-val text-sky-400">{cms.profile.email}</span>
                  </div>
                  <div className="snapshot-row">
                    <span className="s-label">Status Badge:</span>
                    <span className="s-val text-emerald-400">● {cms.profile.statusBadge}</span>
                  </div>
                </div>
                <button type="button" className="btn-secondary mt-4" onClick={() => setActiveTab('profile')}>
                  Edit Profile &amp; Bio →
                </button>
              </div>

              <div className="admin-card">
                <h3>Security &amp; Gemini AutoMod Status</h3>
                <p className="card-desc">
                  Submissions are screened in real time via Gemini 2.5 Flash for 18+, sexual, or profane intent across English, Hindi, Hinglish, Spanish, and multi-lingual slang.
                </p>
                <div className="security-status-pill">
                  <Shield size={16} className="text-emerald-400" />
                  <span>Silent Ban Mode Active: Flagged users receive a generic connection timeout error.</span>
                </div>
                <div className="hero-action-buttons mt-4">
                  <button type="button" className="btn-secondary" onClick={() => setActiveTab('security')}>
                    Open IP Ban Monitor ({bannedList.length} banned)
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => setActiveTab('reviews')}>
                    Test Gemini AI Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PROFILE & BIO CMS                                  */}
        {/* ========================================================= */}
        {activeTab === 'profile' && (
          <div className="admin-tab-pane">
            <div className="pane-hero">
              <div>
                <h2>Profile &amp; Identity CMS</h2>
                <p>Customize your personal information, contact handles, bio, and availability badges.</p>
              </div>
              <button type="button" className="btn-primary" onClick={handleSaveProfile}>
                <Check size={14} />
                <span>Save Profile Changes</span>
              </button>
            </div>

            <div className="admin-card">
              <div className="form-grid-two">
                <div className="admin-field">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={cms.profile.name} 
                    onChange={(e) => handleProfileFieldChange('name', e.target.value)}
                  />
                </div>

                <div className="admin-field">
                  <label>Role / Title</label>
                  <input 
                    type="text" 
                    value={cms.profile.title} 
                    onChange={(e) => handleProfileFieldChange('title', e.target.value)}
                  />
                </div>

                <div className="admin-field full-width">
                  <label>Status Badge / Availability</label>
                  <input 
                    type="text" 
                    value={cms.profile.statusBadge} 
                    onChange={(e) => handleProfileFieldChange('statusBadge', e.target.value)}
                  />
                </div>

                <div className="admin-field full-width">
                  <label>Hero Tagline</label>
                  <input 
                    type="text" 
                    value={cms.profile.tagline} 
                    onChange={(e) => handleProfileFieldChange('tagline', e.target.value)}
                  />
                </div>

                <div className="admin-field full-width">
                  <label>About Me / Biography Description</label>
                  <textarea 
                    rows={4}
                    value={cms.profile.bio} 
                    onChange={(e) => handleProfileFieldChange('bio', e.target.value)}
                  />
                </div>

                <div className="admin-field">
                  <label>Direct Contact Email</label>
                  <input 
                    type="email" 
                    value={cms.profile.email} 
                    onChange={(e) => handleProfileFieldChange('email', e.target.value)}
                  />
                </div>

                <div className="admin-field">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    value={cms.profile.phone} 
                    onChange={(e) => handleProfileFieldChange('phone', e.target.value)}
                  />
                </div>

                <div className="admin-field">
                  <label>Location</label>
                  <input 
                    type="text" 
                    value={cms.profile.location} 
                    onChange={(e) => handleProfileFieldChange('location', e.target.value)}
                  />
                </div>

                <div className="admin-field">
                  <label>Portfolio URL</label>
                  <input 
                    type="text" 
                    value={cms.profile.portfolioUrl} 
                    onChange={(e) => handleProfileFieldChange('portfolioUrl', e.target.value)}
                  />
                </div>

                <div className="admin-field">
                  <label>LinkedIn URL</label>
                  <input 
                    type="text" 
                    value={cms.profile.linkedin} 
                    onChange={(e) => handleProfileFieldChange('linkedin', e.target.value)}
                  />
                </div>

                <div className="admin-field">
                  <label>GitHub URL</label>
                  <input 
                    type="text" 
                    value={cms.profile.github} 
                    onChange={(e) => handleProfileFieldChange('github', e.target.value)}
                  />
                </div>

                <div className="admin-field">
                  <label>Behance URL</label>
                  <input 
                    type="text" 
                    value={cms.profile.behance} 
                    onChange={(e) => handleProfileFieldChange('behance', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-actions-bar mt-6">
                <button type="button" className="btn-primary" onClick={handleSaveProfile}>
                  <Check size={14} />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PROJECTS CMS                                       */}
        {/* ========================================================= */}
        {activeTab === 'projects' && (
          <div className="admin-tab-pane">
            <div className="pane-hero">
              <div>
                <h2>Featured Projects &amp; Works CMS</h2>
                <p>Manage and customize the project cards displayed across Finder, VS Code, and Figma apps.</p>
              </div>
              <div className="hero-action-buttons">
                <button type="button" className="btn-secondary" onClick={handleAddProject}>
                  <Plus size={14} />
                  <span>Add Project</span>
                </button>
                <button type="button" className="btn-primary" onClick={handleSaveProjects}>
                  <Check size={14} />
                  <span>Save All Projects</span>
                </button>
              </div>
            </div>

            <div className="projects-editor-list">
              {cms.projects.map((proj, idx) => (
                <div key={proj.id || idx} className="admin-card project-edit-card">
                  <div className="project-card-header">
                    <div className="header-badge-title">
                      <span className="proj-index-badge">#{idx + 1}</span>
                      <h4>{proj.title}</h4>
                    </div>
                    <button 
                      type="button" 
                      className="delete-item-btn"
                      onClick={() => handleDeleteProject(proj.id)}
                      title="Delete Project"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div className="form-grid-two">
                    <div className="admin-field">
                      <label>Project Title</label>
                      <input 
                        type="text" 
                        value={proj.title} 
                        onChange={(e) => handleProjectFieldChange(idx, 'title', e.target.value)}
                      />
                    </div>

                    <div className="admin-field">
                      <label>Category / Badge</label>
                      <input 
                        type="text" 
                        value={proj.category} 
                        onChange={(e) => handleProjectFieldChange(idx, 'category', e.target.value)}
                      />
                    </div>

                    <div className="admin-field full-width">
                      <label>Description &amp; Impact</label>
                      <textarea 
                        rows={2}
                        value={proj.desc} 
                        onChange={(e) => handleProjectFieldChange(idx, 'desc', e.target.value)}
                      />
                    </div>

                    <div className="admin-field">
                      <label>Tags (Comma separated)</label>
                      <input 
                        type="text" 
                        value={Array.isArray(proj.tags) ? proj.tags.join(', ') : proj.tags} 
                        onChange={(e) => handleProjectFieldChange(idx, 'tags', e.target.value)}
                      />
                    </div>

                    <div className="admin-field">
                      <label>External URL / Figma Link</label>
                      <input 
                        type="text" 
                        value={proj.link} 
                        onChange={(e) => handleProjectFieldChange(idx, 'link', e.target.value)}
                      />
                    </div>

                    <div className="admin-field">
                      <label>App Launcher (figma | vscode | browser)</label>
                      <input 
                        type="text" 
                        value={proj.appId || 'figma'} 
                        onChange={(e) => handleProjectFieldChange(idx, 'appId', e.target.value)}
                      />
                    </div>

                    <div className="admin-field">
                      <label>Release Date</label>
                      <input 
                        type="text" 
                        value={proj.date} 
                        onChange={(e) => handleProjectFieldChange(idx, 'date', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" className="btn-secondary" onClick={handleAddProject}>
                <Plus size={14} />
                <span>Add Another Project</span>
              </button>
              <button type="button" className="btn-primary" onClick={handleSaveProjects}>
                <Check size={14} />
                <span>Save All Projects</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: EXPERIENCE CMS                                     */}
        {/* ========================================================= */}
        {activeTab === 'experience' && (
          <div className="admin-tab-pane">
            <div className="pane-hero">
              <div>
                <h2>Professional Experience CMS</h2>
                <p>Edit roles, companies, dates, and responsibilities featured on your live resume.</p>
              </div>
              <div className="hero-action-buttons">
                <button type="button" className="btn-secondary" onClick={handleAddExperience}>
                  <Plus size={14} />
                  <span>Add Role</span>
                </button>
                <button type="button" className="btn-primary" onClick={handleSaveExperiences}>
                  <Check size={14} />
                  <span>Save Experience</span>
                </button>
              </div>
            </div>

            <div className="experience-editor-list">
              {cms.experiences.map((exp, idx) => (
                <div key={exp.id || idx} className="admin-card project-edit-card">
                  <div className="project-card-header">
                    <div className="header-badge-title">
                      <span className="proj-index-badge">#{idx + 1}</span>
                      <h4>{exp.title} — {exp.company}</h4>
                    </div>
                    <button 
                      type="button" 
                      className="delete-item-btn"
                      onClick={() => handleDeleteExperience(exp.id)}
                      title="Delete Entry"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div className="form-grid-two">
                    <div className="admin-field">
                      <label>Role / Position Title</label>
                      <input 
                        type="text" 
                        value={exp.title} 
                        onChange={(e) => handleExperienceFieldChange(idx, 'title', e.target.value)}
                      />
                    </div>

                    <div className="admin-field">
                      <label>Company &amp; Location</label>
                      <input 
                        type="text" 
                        value={exp.company} 
                        onChange={(e) => handleExperienceFieldChange(idx, 'company', e.target.value)}
                      />
                    </div>

                    <div className="admin-field">
                      <label>Employment Duration (e.g. Jul 2026 – Nov 2026)</label>
                      <input 
                        type="text" 
                        value={exp.date} 
                        onChange={(e) => handleExperienceFieldChange(idx, 'date', e.target.value)}
                      />
                    </div>

                    <div className="admin-field">
                      <label>Skills / Tags (Comma separated)</label>
                      <input 
                        type="text" 
                        value={Array.isArray(exp.tags) ? exp.tags.join(', ') : exp.tags} 
                        onChange={(e) => handleExperienceFieldChange(idx, 'tags', e.target.value)}
                      />
                    </div>

                    <div className="admin-field full-width">
                      <label>Role Description &amp; Achievements</label>
                      <textarea 
                        rows={3}
                        value={exp.desc} 
                        onChange={(e) => handleExperienceFieldChange(idx, 'desc', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" className="btn-secondary" onClick={handleAddExperience}>
                <Plus size={14} />
                <span>Add Another Experience</span>
              </button>
              <button type="button" className="btn-primary" onClick={handleSaveExperiences}>
                <Check size={14} />
                <span>Save Experience</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: REVIEWS & GEMINI MODERATION LAB                    */}
        {/* ========================================================= */}
        {activeTab === 'reviews' && (
          <div className="admin-tab-pane">
            <div className="pane-hero">
              <div>
                <h2>Reviews &amp; Gemini AutoMod Intelligence</h2>
                <p>Review customer testimonials and test live multi-lingual 18+ content moderation.</p>
              </div>
            </div>

            {/* Gemini AI Moderation Test Lab */}
            <div className="admin-card mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-amber-400" />
                <h3 className="m-0">Gemini 2.5 Flash Multi-Lingual Moderation Lab</h3>
              </div>
              <p className="card-desc">
                Test any text in English, Hindi, Hinglish, Punjabi, Spanish, Russian, or evasion leetspeak. Gemini will analyze sexual intent, profanity, and offensive slang in real-time.
              </p>

              <div className="form-grid-two">
                <div className="admin-field">
                  <label>Author Name to Simulate</label>
                  <input 
                    type="text" 
                    value={geminiTestAuthor} 
                    onChange={(e) => setGeminiTestAuthor(e.target.value)}
                  />
                </div>
                <div className="admin-field full-width">
                  <label>Test Text / Comment to Screen</label>
                  <textarea 
                    rows={2}
                    placeholder="Enter any text to evaluate with Gemini AI (e.g. Hindi/English slang, leetspeak, or normal praise)..."
                    value={geminiTestText}
                    onChange={(e) => setGeminiTestText(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={handleRunGeminiTest}
                  disabled={geminiTesting || !geminiTestText.trim()}
                >
                  <Send size={13} />
                  <span>{geminiTesting ? 'Analyzing with Gemini...' : 'Run Gemini AI Safety Check'}</span>
                </button>
              </div>

              {geminiTestResult && (
                <div className={`gemini-test-result mt-4 ${geminiTestResult.isSafe ? 'safe' : 'flagged'}`}>
                  <div className="result-header">
                    <span className="result-status-tag">
                      {geminiTestResult.isSafe ? '✓ SAFE FOR PUBLICATION' : '⚠️ VIOLATION DETECTED (TRIGGER SILENT BAN)'}
                    </span>
                    <span className="result-latency">{geminiTestResult.latency}ms response</span>
                  </div>
                  {geminiTestResult.flaggedTerm && (
                    <div className="result-detail">
                      <strong>Flagged Term:</strong> <code>{geminiTestResult.flaggedTerm}</code>
                    </div>
                  )}
                  {geminiTestResult.reason && (
                    <div className="result-detail">
                      <strong>Reason:</strong> {geminiTestResult.reason}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Published Reviews List */}
            <div className="admin-card">
              <h3>Published Reviews ({reviewsList.length})</h3>
              <p className="card-desc">Manage reviews displayed in the Reviews &amp; Recommendations app.</p>

              <div className="reviews-admin-list mt-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="admin-review-item">
                    <div className="review-meta-row">
                      <div className="reviewer-info">
                        <strong>{rev.name}</strong>
                        <span className="reviewer-role">{rev.role} • {rev.company}</span>
                        {rev.email && <span className="reviewer-email">({rev.email})</span>}
                      </div>
                      <div className="review-stars">
                        {'★'.repeat(rev.rating || 5)}
                        <button 
                          type="button" 
                          className="delete-review-btn ml-3"
                          onClick={() => handleDeleteReview(rev.id)}
                          title="Delete Review"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                    <p className="review-body-text">"{rev.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: IP BAN & SECURITY MONITOR                          */}
        {/* ========================================================= */}
        {activeTab === 'security' && (
          <div className="admin-tab-pane">
            <div className="pane-hero">
              <div>
                <h2>IP Ban &amp; Security Monitor</h2>
                <p>Inspect banned client IP addresses, pardon users, or manually add blacklists.</p>
              </div>
              <div className="hero-action-buttons">
                {bannedList.length > 0 && (
                  <button type="button" className="btn-secondary text-red-400" onClick={handleClearAllBans}>
                    <Trash2 size={14} />
                    <span>Clear All Bans</span>
                  </button>
                )}
              </div>
            </div>

            {/* Manual IP Ban Form */}
            <div className="admin-card mb-6">
              <h3>Manual Client / IP Blacklist</h3>
              <form onSubmit={handleManualBan} className="manual-ban-form mt-3">
                <div className="form-grid-two">
                  <div className="admin-field">
                    <label>IP Address to Ban</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 192.168.1.105" 
                      value={manualIpInput}
                      onChange={(e) => setManualIpInput(e.target.value)}
                      required
                    />
                  </div>
                  <div className="admin-field">
                    <label>Reason for Ban</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Repeated spam or abusive feedback" 
                      value={manualReasonInput}
                      onChange={(e) => setManualReasonInput(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary mt-3">
                  <ShieldAlert size={14} />
                  <span>Blacklist IP Address</span>
                </button>
              </form>
            </div>

            {/* Active Banned IPs Table */}
            <div className="admin-card mb-6">
              <div className="flex items-center justify-between">
                <h3>Blacklisted Clients ({bannedList.length})</h3>
                <span className="text-xs text-zinc-400">All submissions from these IPs are silently dropped.</span>
              </div>

              {bannedList.length === 0 ? (
                <div className="empty-bans-notice">
                  <Shield size={32} className="text-emerald-400 mx-auto mb-2" />
                  <p>No client IPs are currently blacklisted. System is healthy and secure.</p>
                </div>
              ) : (
                <div className="banned-table-wrapper mt-4">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Client IP</th>
                        <th>Banned At</th>
                        <th>Reason</th>
                        <th>Device / User Agent</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bannedList.map((item, idx) => (
                        <tr key={item.ip || idx}>
                          <td>
                            <code className="ip-badge">{item.ip}</code>
                          </td>
                          <td className="text-xs text-zinc-400">
                            {item.bannedAt ? new Date(item.bannedAt).toLocaleString() : 'Recent'}
                          </td>
                          <td className="text-xs text-amber-300">
                            {item.reason || 'Flagged 18+ Content'}
                          </td>
                          <td className="text-xs text-zinc-400 truncate max-w-xs" title={item.userAgent}>
                            {item.userAgent ? item.userAgent.slice(0, 45) + '...' : 'Browser Device'}
                          </td>
                          <td>
                            <button 
                              type="button" 
                              className="unban-btn"
                              onClick={() => handleUnbanIp(item.ip)}
                            >
                              <RotateCcw size={12} />
                              <span>Pardon / Unban</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Moderation Audit Logs */}
            <div className="admin-card">
              <h3>Moderation Audit Trail</h3>
              <p className="card-desc">Recent security and auto-moderation decisions recorded by VarunOS.</p>

              {moderationLogs.length === 0 ? (
                <p className="text-xs text-zinc-500 mt-2">No audit logs recorded yet.</p>
              ) : (
                <div className="audit-logs-list mt-3">
                  {moderationLogs.map((log) => (
                    <div key={log.id} className="audit-log-item">
                      <div className="log-badge-action">
                        <span className={`log-badge ${log.action.includes('BAN') ? 'ban' : 'unban'}`}>
                          {log.action}
                        </span>
                        <code className="text-xs text-zinc-300">{log.ip}</code>
                      </div>
                      <span className="log-reason">{log.reason}</span>
                      <span className="log-time text-xs text-zinc-500">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: JSON BACKUP & CONFIG RESTORE                       */}
        {/* ========================================================= */}
        {activeTab === 'backup' && (
          <div className="admin-tab-pane">
            <div className="pane-hero">
              <div>
                <h2>JSON Configuration &amp; Backup</h2>
                <p>Export your entire CMS portfolio state as clean JSON or import a backup.</p>
              </div>
              <div className="hero-action-buttons">
                <button type="button" className="btn-secondary" onClick={handleCopyConfig}>
                  <Copy size={14} />
                  <span>Copy JSON</span>
                </button>
                <button type="button" className="btn-primary" onClick={handleDownloadConfig}>
                  <Download size={14} />
                  <span>Download Backup JSON</span>
                </button>
              </div>
            </div>

            <div className="admin-two-col">
              <div className="admin-card">
                <h3>Live Configuration Preview</h3>
                <p className="card-desc">Current in-memory CMS state for all apps and components.</p>
                <pre className="json-code-box">
                  {exportCMSConfigJSON()}
                </pre>
              </div>

              <div className="admin-card">
                <h3>Restore / Import JSON Config</h3>
                <p className="card-desc">Paste a valid JSON configuration to restore projects, profile, or settings.</p>
                <textarea 
                  rows={14}
                  className="import-textarea"
                  placeholder="Paste JSON configuration here..."
                  value={importJsonInput}
                  onChange={(e) => setImportJsonInput(e.target.value)}
                />
                <div className="mt-4 flex gap-3">
                  <button 
                    type="button" 
                    className="btn-primary" 
                    onClick={handleApplyImportedJson}
                    disabled={!importJsonInput.trim()}
                  >
                    <Upload size={14} />
                    <span>Apply Imported Config</span>
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary text-red-400"
                    onClick={handleResetDefaults}
                  >
                    <RotateCcw size={14} />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
