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
  Send,
  LayoutGrid,
  Cloud,
  Rocket,
  ArrowUp,
  ArrowDown,
  GitBranch,
  Globe,
  KeyRound,
  Monitor,
  Smartphone
} from 'lucide-react';
import {
  getCMSData,
  saveCMSData,
  resetCMSData,
  exportCMSConfigJSON,
  importCMSConfigJSON,
  DEFAULT_CMS_DATA
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

// Admin Authentication Credentials
const ADMIN_USERNAME = 'Varun!';
const ADMIN_PASSWORD = 'V@run2Sehgal05!';

const APP_BADGE_COLORS = {
  finder: '#3b82f6',
  figma: '#a855f7',
  vscode: '#0ea5e9',
  terminal: '#22c55e',
  resume: '#ef4444',
  contact: '#06b6d4',
  reviews: '#f59e0b',
  coffee: '#f97316',
  settings: '#64748b',
  trash: '#71717a'
};

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
  // 'overview' | 'apps' | 'profile' | 'projects' | 'experience' | 'deploy' | 'reviews' | 'security' | 'backup'
  const [activeTab, setActiveTab] = useState('overview');

  // CMS State
  const [cms, setCms] = useState(getCMSData);
  const [toast, setToast] = useState(null); // { msg, type: 'success' | 'error' }

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

  // Cloud Deploy State
  const [isDeployingVercel, setIsDeployingVercel] = useState(false);
  const [isDeployingRender, setIsDeployingRender] = useState(false);

  // Backup Import State
  const [importJsonInput, setImportJsonInput] = useState('');

  // Toast Helper
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
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
    }, 350);
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('varunos_admin_auth');
    setIsAuthenticated(false);
  };

  // --- Apps & Workspace Handlers ---
  const handleAppFieldChange = (index, field, value) => {
    const updated = [...(cms.apps || [])];
    updated[index] = { ...updated[index], [field]: value };
    setCms((prev) => ({ ...prev, apps: updated }));
  };

  const handleMoveApp = (index, direction) => {
    const updated = [...(cms.apps || [])];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setCms((prev) => ({ ...prev, apps: updated }));
    saveCMSData({ apps: updated });
    showToast(`Moved ${temp.name} ${direction < 0 ? 'up' : 'down'}.`);
  };

  const handleSaveApps = () => {
    saveCMSData({ apps: cms.apps });
    showToast('Apps & Desktop layout saved live!');
  };

  const handleResetApps = () => {
    if (window.confirm('Reset all Desktop, Dock & Mobile apps to factory defaults?')) {
      const updated = saveCMSData({ apps: DEFAULT_CMS_DATA.apps });
      if (updated) setCms(updated);
      showToast('Apps restored to defaults.');
    }
  };

  // --- Profile Form Handlers ---
  const handleProfileFieldChange = (field, value) => {
    setCms((prev) => ({
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
      updated[index] = {
        ...updated[index],
        [field]: value.split(',').map((t) => t.trim()).filter(Boolean)
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setCms((prev) => ({ ...prev, projects: updated }));
  };

  const handleSaveProjects = () => {
    saveCMSData({ projects: cms.projects });
    showToast('Projects saved! Live site updated.');
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const filtered = cms.projects.filter((p) => p.id !== projectId);
      setCms((prev) => ({ ...prev, projects: filtered }));
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
    setCms((prev) => ({ ...prev, projects: updated }));
    saveCMSData({ projects: updated });
    showToast('New project created!');
  };

  // --- Experience Handlers ---
  const handleExperienceFieldChange = (index, field, value) => {
    const updated = [...cms.experiences];
    if (field === 'tags') {
      updated[index] = {
        ...updated[index],
        [field]: value.split(',').map((t) => t.trim()).filter(Boolean)
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setCms((prev) => ({ ...prev, experiences: updated }));
  };

  const handleSaveExperiences = () => {
    saveCMSData({ experiences: cms.experiences });
    showToast('Experience records saved live!');
  };

  const handleDeleteExperience = (expId) => {
    if (window.confirm('Delete this work experience entry?')) {
      const filtered = cms.experiences.filter((e) => e.id !== expId);
      setCms((prev) => ({ ...prev, experiences: filtered }));
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
    setCms((prev) => ({ ...prev, experiences: updated }));
    saveCMSData({ experiences: updated });
    showToast('New experience role added!');
  };

  // --- Cloud Deploy (Vercel + Render) Handlers ---
  const handleDeployFieldChange = (field, value) => {
    setCms((prev) => ({
      ...prev,
      deployments: {
        ...(prev.deployments || DEFAULT_CMS_DATA.deployments),
        [field]: value
      }
    }));
  };

  const handleSaveDeployConfig = () => {
    saveCMSData({ deployments: cms.deployments });
    showToast('Vercel & Render configuration saved!');
  };

  const triggerCloudDeploy = async (target) => {
    const deployments = cms.deployments || DEFAULT_CMS_DATA.deployments;
    const isVercel = target === 'vercel';
    const hookUrl = (isVercel ? deployments.vercelDeployHook : deployments.renderDeployHook || '').trim();
    const label = isVercel ? 'Vercel' : 'Render';

    if (!hookUrl) {
      showToast(`Paste your ${label} Deploy Hook URL first!`, 'error');
      return;
    }

    if (isVercel) setIsDeployingVercel(true);
    else setIsDeployingRender(true);

    try {
      await fetch(hookUrl, { method: 'POST', mode: 'no-cors' });
      const stamp = new Date().toLocaleString();
      const patch = isVercel ? { lastVercelDeploy: stamp } : { lastRenderDeploy: stamp };
      const updated = saveCMSData({ deployments: { ...deployments, ...patch } });
      if (updated) setCms(updated);
      showToast(`${label} deployment webhook triggered!`);
    } catch (err) {
      showToast(`Failed to reach ${label} webhook: ${err.message}`, 'error');
    } finally {
      if (isVercel) setIsDeployingVercel(false);
      else setIsDeployingRender(false);
    }
  };

  const handleDeployBoth = async () => {
    saveCMSData({ deployments: cms.deployments });
    const d = cms.deployments || DEFAULT_CMS_DATA.deployments;
    if (!d.vercelDeployHook?.trim() && !d.renderDeployHook?.trim()) {
      showToast('Add at least one Deploy Hook URL (Vercel or Render) to trigger cloud rebuild.', 'error');
      return;
    }
    if (d.vercelDeployHook?.trim()) await triggerCloudDeploy('vercel');
    if (d.renderDeployHook?.trim()) await triggerCloudDeploy('render');
  };

  const copyText = (text, label) => {
    navigator.clipboard?.writeText(text);
    showToast(`${label} copied to clipboard!`);
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
    } catch {
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
    navigator.clipboard?.writeText(exportCMSConfigJSON());
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
      showToast('Invalid JSON syntax — please check formatting and try again.', 'error');
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset ALL portfolio content and settings back to factory default?')) {
      resetCMSData();
      setCms(getCMSData());
      showToast('Reset to factory defaults.');
    }
  };

  const deployCfg = cms.deployments || DEFAULT_CMS_DATA.deployments;
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://varunsehgal.runs-on.dev';
  const normalizedVercelBase = (deployCfg.vercelUrl || '').replace(/\/+$/, '');
  const normalizedRenderBase = (deployCfg.renderUrl || '').replace(/\/+$/, '');

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
            <span className="admin-window-title">VarunOS Admin Console · /varun_admin</span>
          </div>

          <div className="admin-login-body">
            <div className="admin-shield-icon">
              <Shield size={38} className="shield-svg" />
              <Lock size={16} className="lock-svg" />
            </div>

            <h2 className="admin-title">VarunOS Portfolio Administration</h2>
            <p className="admin-subtitle">
              Sign in to manage desktop apps, live content, Gemini moderation, and Vercel + Render deployments.
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
                    onClick={() => setShowPassword((p) => !p)}
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

              <div className="admin-login-hint">
                <KeyRound size={12} />
                <span>Quick Access: <code>Ctrl+Alt+A</code> · <code>/varun_admin</code> · Terminal: <code>admin</code></span>
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
  const appsList = cms.apps || DEFAULT_CMS_DATA.apps;

  return (
    <div className="admin-portal-container">
      {/* Toast Notification */}
      {toast && (
        <div className={`admin-toast ${toast.type === 'error' ? 'toast-error' : ''}`}>
          {toast.type === 'error' ? (
            <ShieldAlert size={15} className="text-red-400" />
          ) : (
            <Check size={15} className="text-emerald-400" />
          )}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="admin-navbar">
        <div className="admin-nav-left">
          <div className="admin-brand-pill">
            <Shield size={16} className="text-amber-400" />
            <span className="brand-text">VarunOS Admin</span>
            <span className="version-tag">CMS v3.0</span>
          </div>
          <div className="admin-live-indicator">
            <span className="pulse-green-dot" />
            <span>Live Sync</span>
          </div>
        </div>

        <nav className="admin-nav-tabs" aria-label="Admin Navigation">
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
            className={`admin-nav-tab ${activeTab === 'apps' ? 'active' : ''}`}
            onClick={() => setActiveTab('apps')}
          >
            <LayoutGrid size={14} />
            <span>Apps ({appsList.length})</span>
          </button>
          <button
            type="button"
            className={`admin-nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={14} />
            <span>Profile</span>
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
            className={`admin-nav-tab ${activeTab === 'deploy' ? 'active' : ''}`}
            onClick={() => setActiveTab('deploy')}
          >
            <Cloud size={14} />
            <span>Vercel &amp; Render</span>
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
            <span>Security ({bannedList.length})</span>
          </button>
          <button
            type="button"
            className={`admin-nav-tab ${activeTab === 'backup' ? 'active' : ''}`}
            onClick={() => setActiveTab('backup')}
          >
            <Download size={14} />
            <span>JSON Backup</span>
          </button>
        </nav>

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
                <h2>Portfolio Control Center</h2>
                <p>Manage live desktop apps, CMS content, Gemini moderation, and Vercel + Render deployments.</p>
              </div>
              <div className="hero-action-buttons">
                <button type="button" className="btn-secondary" onClick={() => setActiveTab('apps')}>
                  <LayoutGrid size={14} />
                  <span>Edit Apps</span>
                </button>
                <button type="button" className="btn-primary" onClick={() => setActiveTab('deploy')}>
                  <Cloud size={14} />
                  <span>Vercel &amp; Render Sync</span>
                </button>
              </div>
            </div>

            {/* Admin Portal Access Quick Guide Banner */}
            <div className="admin-access-banner">
              <div className="access-banner-left">
                <div className="access-icon-pill">
                  <KeyRound size={18} />
                </div>
                <div>
                  <h4>How to Open This Admin Page Anytime</h4>
                  <p>
                    Route: <code>/varun_admin</code> or <code>?admin=true</code> • Shortcut: <code>Ctrl+Alt+A</code> • Terminal: <code>admin</code> • Settings: <strong>Open Admin Portal</strong>
                  </p>
                </div>
              </div>
              <div className="access-banner-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => copyText(`${currentOrigin}/varun_admin`, 'Admin URL')}
                >
                  <Copy size={13} />
                  <span>Copy Admin Link</span>
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="admin-stats-grid">
              <div className="stat-card clickable" onClick={() => setActiveTab('apps')}>
                <div className="stat-icon-wrap cyan">
                  <LayoutGrid size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-num">{appsList.length}</span>
                  <span className="stat-label">Configured OS Apps →</span>
                </div>
              </div>

              <div className="stat-card clickable" onClick={() => setActiveTab('projects')}>
                <div className="stat-icon-wrap amber">
                  <Briefcase size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-num">{cms.projects.length}</span>
                  <span className="stat-label">Featured Projects →</span>
                </div>
              </div>

              <div className="stat-card clickable" onClick={() => setActiveTab('reviews')}>
                <div className="stat-icon-wrap emerald">
                  <MessageSquare size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-num">{reviewsList.length}</span>
                  <span className="stat-label">Published Reviews →</span>
                </div>
              </div>

              <div className="stat-card clickable" onClick={() => setActiveTab('deploy')}>
                <div className="stat-icon-wrap purple">
                  <Cloud size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-num">2 Clouds</span>
                  <span className="stat-label">Vercel + Render Ready →</span>
                </div>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="admin-two-col">
              <div className="admin-card">
                <h3>Live Profile Snapshot</h3>
                <div className="profile-snapshot-list">
                  <div className="snapshot-row">
                    <span className="s-label">Display Name</span>
                    <span className="s-val font-semibold">{cms.profile.name}</span>
                  </div>
                  <div className="snapshot-row">
                    <span className="s-label">Role Title</span>
                    <span className="s-val">{cms.profile.title}</span>
                  </div>
                  <div className="snapshot-row">
                    <span className="s-label">Direct Email</span>
                    <span className="s-val text-sky-400">{cms.profile.email}</span>
                  </div>
                  <div className="snapshot-row">
                    <span className="s-label">Status Badge</span>
                    <span className="s-val text-emerald-400">● {cms.profile.statusBadge}</span>
                  </div>
                </div>
                <div className="card-footer-actions">
                  <button type="button" className="btn-secondary" onClick={() => setActiveTab('profile')}>
                    Edit Profile &amp; Bio →
                  </button>
                </div>
              </div>

              <div className="admin-card">
                <h3>Vercel &amp; Render Hosting Bridge</h3>
                <p className="card-desc">
                  Connected via <code>varunsehgal05/Portfolio</code> (<code>main</code>). SPA routing (<code>/varun_admin</code>) is configured for both <code>vercel.json</code> and Render (<code>render.yaml</code> &amp; <code>_redirects</code>).
                </p>
                <div className="deploy-mini-grid">
                  <div className="deploy-mini-pill">
                    <span className="dot-live" />
                    <span>Vercel: <strong>{deployCfg.vercelProjectName}</strong></span>
                  </div>
                  <div className="deploy-mini-pill">
                    <span className="dot-live" />
                    <span>Render: <strong>{deployCfg.renderServiceName}</strong></span>
                  </div>
                </div>
                <div className="hero-action-buttons mt-4">
                  <button type="button" className="btn-primary" onClick={() => setActiveTab('deploy')}>
                    <Rocket size={13} />
                    <span>Manage Vercel &amp; Render</span>
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => setActiveTab('security')}>
                    Security ({bannedList.length} banned)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: APPS & WORKSPACE EDITOR                            */}
        {/* ========================================================= */}
        {activeTab === 'apps' && (
          <div className="admin-tab-pane">
            <div className="pane-hero">
              <div>
                <h2>Desktop, Dock &amp; Mobile Apps Editor</h2>
                <p>Customize app names, window titlebars, external URLs, visibility, and icon order across Desktop, Dock, and iPad/Mobile.</p>
              </div>
              <div className="hero-action-buttons">
                <button type="button" className="btn-secondary" onClick={handleResetApps}>
                  <RotateCcw size={14} />
                  <span>Reset Apps</span>
                </button>
                <button type="button" className="btn-primary" onClick={handleSaveApps}>
                  <Check size={14} />
                  <span>Save Apps Live</span>
                </button>
              </div>
            </div>

            <div className="apps-editor-grid">
              {appsList.map((appItem, idx) => {
                const badgeColor = APP_BADGE_COLORS[appItem.id] || '#38bdf8';
                return (
                  <div key={appItem.id} className="admin-card app-edit-card">
                    <div className="app-card-top">
                      <div className="app-identity">
                        <span
                          className="app-color-dot"
                          style={{ background: badgeColor }}
                        >
                          {appItem.name?.slice(0, 2).toUpperCase()}
                        </span>
                        <div>
                          <h4>{appItem.name}</h4>
                          <span className="app-id-code">id: {appItem.id}</span>
                        </div>
                      </div>
                      <div className="app-order-btns">
                        <button
                          type="button"
                          className="icon-mini-btn"
                          onClick={() => handleMoveApp(idx, -1)}
                          disabled={idx === 0}
                          title="Move Up"
                        >
                          <ArrowUp size={13} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn"
                          onClick={() => handleMoveApp(idx, 1)}
                          disabled={idx === appsList.length - 1}
                          title="Move Down"
                        >
                          <ArrowDown size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="form-grid-two mt-3">
                      <div className="admin-field">
                        <label>Display Name (Icon &amp; Dock)</label>
                        <input
                          type="text"
                          value={appItem.name || ''}
                          onChange={(e) => handleAppFieldChange(idx, 'name', e.target.value)}
                        />
                      </div>

                      <div className="admin-field">
                        <label>Mobile / iPad Subtitle</label>
                        <input
                          type="text"
                          value={appItem.subtitle || ''}
                          onChange={(e) => handleAppFieldChange(idx, 'subtitle', e.target.value)}
                        />
                      </div>

                      <div className="admin-field full-width">
                        <label>Window Titlebar Label</label>
                        <input
                          type="text"
                          value={appItem.title || ''}
                          onChange={(e) => handleAppFieldChange(idx, 'title', e.target.value)}
                        />
                      </div>

                      <div className="admin-field full-width">
                        <label>Target URL / Link (Optional)</label>
                        <input
                          type="text"
                          placeholder="https://... or /resume.pdf"
                          value={appItem.url || ''}
                          onChange={(e) => handleAppFieldChange(idx, 'url', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="app-visibility-bar">
                      <label className="vis-toggle-chip">
                        <input
                          type="checkbox"
                          checked={Boolean(appItem.showOnDesktop)}
                          onChange={(e) => handleAppFieldChange(idx, 'showOnDesktop', e.target.checked)}
                        />
                        <Monitor size={12} />
                        <span>Desktop Icon</span>
                      </label>

                      <label className="vis-toggle-chip">
                        <input
                          type="checkbox"
                          checked={appItem.showInDock !== false}
                          onChange={(e) => handleAppFieldChange(idx, 'showInDock', e.target.checked)}
                        />
                        <LayoutGrid size={12} />
                        <span>macOS Dock</span>
                      </label>

                      <label className="vis-toggle-chip">
                        <input
                          type="checkbox"
                          checked={appItem.showOnDevice !== false}
                          onChange={(e) => handleAppFieldChange(idx, 'showOnDevice', e.target.checked)}
                        />
                        <Smartphone size={12} />
                        <span>iPad / Mobile</span>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="sticky-save-bar">
              <span className="text-xs text-zinc-400">
                Changes apply immediately to Desktop icons, Dock tooltips, Window titlebars, and iPad/Mobile Home Screen.
              </span>
              <button type="button" className="btn-primary" onClick={handleSaveApps}>
                <Check size={14} />
                <span>Save All Apps Live</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PROFILE & BIO CMS                                  */}
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
        {/* TAB 4: PROJECTS CMS                                       */}
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

            <div className="sticky-save-bar">
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
        {/* TAB 5: EXPERIENCE CMS                                     */}
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

            <div className="sticky-save-bar">
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
        {/* TAB 6: VERCEL & RENDER CLOUD CONNECTION BRIDGE            */}
        {/* ========================================================= */}
        {activeTab === 'deploy' && (
          <div className="admin-tab-pane">
            <div className="pane-hero">
              <div>
                <h2>Vercel &amp; Render Cloud Sync</h2>
                <p>Connect and trigger builds across both Vercel and Render from one place.</p>
              </div>
              <div className="hero-action-buttons">
                <button type="button" className="btn-secondary" onClick={handleSaveDeployConfig}>
                  <Check size={14} />
                  <span>Save Config</span>
                </button>
                <button type="button" className="btn-primary" onClick={handleDeployBoth}>
                  <Rocket size={14} />
                  <span>Deploy Both (Vercel + Render)</span>
                </button>
              </div>
            </div>

            {/* Unified Git Bridge Bar */}
            <div className="admin-card deploy-bridge-card">
              <div className="deploy-bridge-flow">
                <div className="bridge-node">
                  <GitBranch size={18} className="text-sky-400" />
                  <div>
                    <span className="bridge-title">GitHub Source Repo</span>
                    <span className="bridge-sub">varunsehgal05/Portfolio ({deployCfg.branch || 'main'})</span>
                  </div>
                </div>
                <span className="bridge-arrow">━━▶</span>
                <div className="bridge-node active-cloud">
                  <Globe size={18} className="text-emerald-400" />
                  <div>
                    <span className="bridge-title">Vercel Production</span>
                    <span className="bridge-sub">{deployCfg.vercelProjectName} · vercel.json ✓</span>
                  </div>
                </div>
                <span className="bridge-arrow">━━▶</span>
                <div className="bridge-node active-cloud">
                  <Cloud size={18} className="text-purple-400" />
                  <div>
                    <span className="bridge-title">Render Static Site</span>
                    <span className="bridge-sub">render.yaml + _redirects ✓</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-two-col">
              {/* VERCEL CARD */}
              <div className="admin-card cloud-provider-card">
                <div className="cloud-card-head">
                  <div className="cloud-logo-title">
                    <span className="cloud-badge vercel">▲ VERCEL</span>
                    <h3>{deployCfg.vercelProjectName || 'portfolio-site'}</h3>
                  </div>
                  <span className="cloud-status-tag">Rewrite Ready</span>
                </div>
                <p className="card-desc">
                  Project ID: <code>{deployCfg.vercelProjectId}</code> • SPA routing handled by <code>vercel.json</code>.
                </p>

                <div className="admin-field mb-3">
                  <label>Vercel Production URL</label>
                  <input
                    type="text"
                    placeholder="https://portfolio-site-xxxx.vercel.app"
                    value={deployCfg.vercelUrl || ''}
                    onChange={(e) => handleDeployFieldChange('vercelUrl', e.target.value)}
                  />
                </div>

                <div className="admin-field mb-3">
                  <label>Vercel Deploy Hook URL (Settings → Git → Deploy Hooks)</label>
                  <input
                    type="password"
                    placeholder="https://api.vercel.com/v1/integrations/deploy/..."
                    value={deployCfg.vercelDeployHook || ''}
                    onChange={(e) => handleDeployFieldChange('vercelDeployHook', e.target.value)}
                  />
                </div>

                {deployCfg.lastVercelDeploy && (
                  <p className="deploy-timestamp">Last triggered: {deployCfg.lastVercelDeploy}</p>
                )}

                <div className="cloud-card-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => triggerCloudDeploy('vercel')}
                    disabled={isDeployingVercel}
                  >
                    <Rocket size={13} />
                    <span>{isDeployingVercel ? 'Deploying...' : 'Trigger Vercel Deploy'}</span>
                  </button>
                  {normalizedVercelBase && (
                    <>
                      <a
                        href={normalizedVercelBase}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        <ExternalLink size={13} />
                        <span>Open Site</span>
                      </a>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => copyText(`${normalizedVercelBase}/varun_admin`, 'Vercel Admin Link')}
                      >
                        <Copy size={13} />
                        <span>Copy /varun_admin</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* RENDER CARD */}
              <div className="admin-card cloud-provider-card">
                <div className="cloud-card-head">
                  <div className="cloud-logo-title">
                    <span className="cloud-badge render">◆ RENDER</span>
                    <h3>{deployCfg.renderServiceName || 'Portfolio (Static Site)'}</h3>
                  </div>
                  <span className="cloud-status-tag">render.yaml ✓</span>
                </div>
                <p className="card-desc">
                  Static Publish Path: <code>dist</code> • SPA rewrite (<code>/* → /index.html</code>) enabled in <code>render.yaml</code> &amp; <code>public/_redirects</code> so <code>/varun_admin</code> never 404s.
                </p>

                <div className="admin-field mb-3">
                  <label>Render Live Static Site URL</label>
                  <input
                    type="text"
                    placeholder="https://portfolio-xxxx.onrender.com"
                    value={deployCfg.renderUrl || ''}
                    onChange={(e) => handleDeployFieldChange('renderUrl', e.target.value)}
                  />
                </div>

                <div className="admin-field mb-3">
                  <label>Render Deploy Hook URL (Service Settings → Deploy Hook)</label>
                  <input
                    type="password"
                    placeholder="https://api.render.com/deploy/srv-..."
                    value={deployCfg.renderDeployHook || ''}
                    onChange={(e) => handleDeployFieldChange('renderDeployHook', e.target.value)}
                  />
                </div>

                {deployCfg.lastRenderDeploy && (
                  <p className="deploy-timestamp">Last triggered: {deployCfg.lastRenderDeploy}</p>
                )}

                <div className="cloud-card-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => triggerCloudDeploy('render')}
                    disabled={isDeployingRender}
                  >
                    <Rocket size={13} />
                    <span>{isDeployingRender ? 'Deploying...' : 'Trigger Render Deploy'}</span>
                  </button>
                  {normalizedRenderBase && (
                    <>
                      <a
                        href={normalizedRenderBase}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        <ExternalLink size={13} />
                        <span>Open Site</span>
                      </a>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => copyText(`${normalizedRenderBase}/varun_admin`, 'Render Admin Link')}
                      >
                        <Copy size={13} />
                        <span>Copy /varun_admin</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Connection Checklist */}
            <div className="admin-card">
              <h3>Quick Connection Setup (GitHub → Vercel + Render Auto-Sync)</h3>
              <ol className="deploy-steps-list">
                <li>
                  <strong>Auto-Deploy on Push:</strong> Connect <code>github.com/varunsehgal05/Portfolio</code> (branch <code>main</code>) in both your <strong>Vercel</strong> (<code>portfolio-site</code>) and <strong>Render</strong> (<code>Portfolio</code> Static Site) dashboards. Every push now builds both automatically!
                </li>
                <li>
                  <strong>Render Settings:</strong> Build Command: <code>npm install &amp;&amp; npm run build</code> • Publish Directory: <code>dist</code> • Redirects/Rewrites are auto-handled by <code>render.yaml</code> &amp; <code>public/_redirects</code> (<code>/* → /index.html</code>).
                </li>
                <li>
                  <strong>One-Click Remote Rebuild:</strong> Paste your <strong>Vercel Deploy Hook</strong> and <strong>Render Deploy Hook</strong> above and click <em>Save Config</em> to trigger cloud rebuilds right from this portal.
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: REVIEWS & GEMINI MODERATION LAB                    */}
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
                Test any text in English, Hindi, Hinglish, Punjabi, Spanish, Russian, or evasion leetspeak. Gemini analyzes sexual intent, profanity, and offensive slang in real-time.
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
                    placeholder="Enter any text to evaluate with Gemini AI..."
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
        {/* TAB 8: IP BAN & SECURITY MONITOR                          */}
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
                            {item.userAgent ? `${item.userAgent.slice(0, 45)}...` : 'Browser Device'}
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
        {/* TAB 9: JSON BACKUP & CONFIG RESTORE                       */}
        {/* ========================================================= */}
        {activeTab === 'backup' && (
          <div className="admin-tab-pane">
            <div className="pane-hero">
              <div>
                <h2>JSON Configuration &amp; Backup</h2>
                <p>Export your entire CMS state (Apps, Profile, Projects, Experience, Cloud Deploy) as JSON or restore a backup.</p>
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
                <p className="card-desc">Paste a valid JSON configuration to restore apps, projects, profile, or deployment hooks.</p>
                <textarea
                  rows={14}
                  className="import-textarea"
                  placeholder="Paste JSON configuration here..."
                  value={importJsonInput}
                  onChange={(e) => setImportJsonInput(e.target.value)}
                />
                <div className="card-footer-actions">
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
                    className="btn-danger"
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
