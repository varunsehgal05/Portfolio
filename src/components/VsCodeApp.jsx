import React, { useState } from 'react';
import { 
  Files, 
  Search, 
  GitBranch, 
  Play, 
  Package, 
  Settings, 
  User, 
  ChevronRight, 
  ChevronDown, 
  ExternalLink, 
  Code, 
  FileCode, 
  FileText, 
  Sparkles,
  Terminal,
  Copy,
  Check,
  CheckCircle2,
  Cpu,
  Layers
} from 'lucide-react';
import './VsCodeApp.css';

const PROJECTS_DATA = {
  'ai-interview-platform.tsx': {
    name: 'ai-interview-platform.tsx',
    category: 'Vibecoded Projects',
    badge: 'Vibecoded • AI SaaS',
    icon: 'tsx',
    path: 'vibecoded > ai-interview-platform.tsx',
    title: 'AI Interview & Prep Platform',
    desc: 'Autonomous AI candidate evaluation engine with security grading and real-time audio/code assessment modules.',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Ollama Local LLM'],
    liveUrl: 'https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842',
    githubUrl: 'https://github.com/varunsehgal05',
    code: `// ========================================================
// AI Interview & Prep Platform — Autonomous Assessment Core
// Architect: Varun Sehgal (UI/UX & Product Engineer)
// ========================================================

import { useState, useEffect } from 'react';
import { LLMClient, CandidateStream } from '@varun/ai-core';

interface AssessmentState {
  candidateId: string;
  interviewType: 'System Design' | 'Frontend Architecture' | 'Product UX';
  evalScore: number;
  securityVerdict: 'VERIFIED_HUMAN' | 'FLAGGED_ANOMALY';
}

export const AIInterviewWorkspace: React.FC<{ sessionToken: string }> = ({ sessionToken }) => {
  const [assessment, setAssessment] = useState<AssessmentState>({
    candidateId: 'cand_9841',
    interviewType: 'System Design',
    evalScore: 94.8,
    securityVerdict: 'VERIFIED_HUMAN',
  });

  const [transcriptionStream, setTranscriptionStream] = useState<string[]>([]);
  const [isGrading, setIsGrading] = useState<boolean>(false);

  // Autonomous telemetry grading loop
  useEffect(() => {
    const stream = new CandidateStream({ sessionToken });
    stream.on('audioChunk', async (audioBuffer) => {
      const response = await LLMClient.evaluateCandidateResponse({
        audio: audioBuffer,
        rubric: 'FAANG_L5_ARCHITECT',
        temperature: 0.2
      });
      setTranscriptionStream((prev) => [...prev, response.transcription]);
    });

    return () => stream.disconnect();
  }, [sessionToken]);

  return (
    <div className="interview-hud-grid p-6 bg-zinc-950 text-white rounded-xl">
      <header className="flex justify-between border-b border-zinc-800 pb-4">
        <h1 className="text-xl font-bold text-sky-400">AI Interview Evaluator</h1>
        <span className="badge-grade bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
          Grade: {assessment.evalScore}% • {assessment.securityVerdict}
        </span>
      </header>
      {/* Real-time telemetry & question graph */}
    </div>
  );
};

export default AIInterviewWorkspace;`
  },

  'prompt-to-ui-engine.ts': {
    name: 'prompt-to-ui-engine.ts',
    category: 'Vibecoded Projects',
    badge: 'Vibecoded • Generative Agent',
    icon: 'ts',
    path: 'vibecoded > prompt-to-ui-engine.ts',
    title: 'Prompt-to-UI Prototyping Engine',
    desc: 'Self-assembling UI agent that converts natural language design specs into production Tailwind and React components.',
    tags: ['TypeScript', 'Generative UI', 'AST Transformer', 'Design Tokens'],
    liveUrl: 'https://github.com/varunsehgal05',
    githubUrl: 'https://github.com/varunsehgal05',
    code: `// ========================================================
// Prompt-to-UI Engine — Generative Agent AST Compiler
// Author: Varun Sehgal
// ========================================================

export interface DesignTokens {
  surfaceBg: string;
  accentPrimary: string;
  borderRadius: string;
  glassBlur: string;
}

export class PromptToUICompiler {
  private baseTokens: DesignTokens = {
    surfaceBg: 'rgba(18, 22, 30, 0.94)',
    accentPrimary: '#38bdf8',
    borderRadius: '16px',
    glassBlur: '28px'
  };

  /**
   * Synthesize natural language prompt into reactive Component tree
   */
  public async compilePromptToReact(prompt: string): Promise<{ jsxCode: string; cssVariables: Record<string, string> }> {
    console.log('[Compiler] Parsing prompt intent:', prompt);
    
    const AST = await this.generateComponentAST(prompt);
    const optimizedTree = this.applyDesignSystemTokens(AST, this.baseTokens);
    
    return {
      jsxCode: this.renderASTToString(optimizedTree),
      cssVariables: {
        '--mac-blur': this.baseTokens.glassBlur,
        '--mac-accent': this.baseTokens.accentPrimary
      }
    };
  }

  private async generateComponentAST(spec: string) {
    // LLM generative code synthesis logic
    return { type: 'WindowContainer', children: ['ActivityBar', 'CodeEditor', 'StatusBar'] };
  }

  private applyDesignSystemTokens(ast: any, tokens: DesignTokens) {
    return { ...ast, appliedTheme: tokens };
  }

  private renderASTToString(ast: any): string {
    return \`<div className="vibecoded-preview">\${JSON.stringify(ast)}</div>\`;
  }
}`
  },

  'eventflow-ticketing.tsx': {
    name: 'eventflow-ticketing.tsx',
    category: 'Frontend Projects',
    badge: 'Frontend • SaaS Checkout',
    icon: 'tsx',
    path: 'frontend > eventflow-ticketing.tsx',
    title: 'EventFlow: Event Ticketing SaaS',
    desc: 'Frictionless 4-step event ticketing checkout flow reducing checkout abandon rate by 30% with 50+ component design tokens.',
    tags: ['React.js', 'Figma Tokens', 'Stripe Elements', 'Motion UX'],
    liveUrl: 'https://www.figma.com/design/29nTBBWxZfoOKdFnOaQWbq/EventFlow?node-id=2-2',
    githubUrl: 'https://github.com/varunsehgal05',
    code: `// ========================================================
// EventFlow — 4-Step High-Conversion Checkout Pipeline
// UX Architect: Varun Sehgal
// Impact: Reduced user drop-off by 30%
// ========================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type CheckoutStep = 'SELECTION' | 'SEAT_MAP' | 'PAYMENT' | 'TICKET_PASS';

export const EventFlowCheckout: React.FC<{ eventId: string }> = ({ eventId }) => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('SELECTION');
  const [selectedTier, setSelectedTier] = useState<string>('VIP_ACCESS');
  const [subtotal, setSubtotal] = useState<number>(149.00);

  const proceedToNextStep = () => {
    const sequence: CheckoutStep[] = ['SELECTION', 'SEAT_MAP', 'PAYMENT', 'TICKET_PASS'];
    const nextIdx = sequence.indexOf(currentStep) + 1;
    if (nextIdx < sequence.length) {
      setCurrentStep(sequence[nextIdx]);
    }
  };

  return (
    <div className="eventflow-container max-w-4xl mx-auto p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
      <div className="step-progress-indicator flex justify-between mb-8">
        {['Select Tier', 'Choose Seats', 'Payment', 'Instant Pass'].map((label, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="step-circle bg-sky-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
              {idx + 1}
            </span>
            <span className="step-label text-sm font-medium text-zinc-300">{label}</span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Step Dynamic Content with sub-5 second checkout optimization */}
          <button onClick={proceedToNextStep} className="btn-primary bg-sky-600 hover:bg-sky-500 px-6 py-3 rounded-xl font-bold">
            Continue to {currentStep === 'PAYMENT' ? 'Complete Order' : 'Next Step'}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};`
  },

  'expensify-fintech.jsx': {
    name: 'expensify-fintech.jsx',
    category: 'Frontend Projects',
    badge: 'Mobile UX • Fintech',
    icon: 'jsx',
    path: 'frontend > expensify-fintech.jsx',
    title: 'Expensify: Budget Tracker App',
    desc: '17+ mobile screens refined for rapid expense logging in under 5 seconds with real-time financial telemetry.',
    tags: ['React Native', 'Tailwind', 'Chart.js', 'Fintech UI'],
    liveUrl: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318',
    githubUrl: 'https://github.com/varunsehgal05',
    code: `// ========================================================
// Expensify Budget Tracker — Sub-5-Second Expense Ledger
// Designer & Lead: Varun Sehgal
// ========================================================

import React, { useState } from 'react';

export const QuickExpenseLogger = ({ onLogExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Workspace');
  const [currency, setCurrency] = useState('USD');

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;

    onLogExpense({
      amount: parseFloat(amount),
      category,
      timestamp: new Date().toISOString(),
      latencyMs: performance.now()
    });
    setAmount('');
  };

  return (
    <form onSubmit={handleQuickSubmit} className="expense-quick-dock bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/10">
      <div className="flex items-center gap-3">
        <span className="text-2xl text-emerald-400 font-bold">$</span>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="text-3xl font-mono bg-transparent border-none text-white outline-none w-full"
          autoFocus
        />
        <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-xl font-bold">
          Log
        </button>
      </div>
    </form>
  );
};`
  },

  'codesrijan-hackathon.tsx': {
    name: 'codesrijan-hackathon.tsx',
    category: 'Frontend Projects',
    badge: 'Hackathon Platform • 200+ Devs',
    icon: 'tsx',
    path: 'frontend > codesrijan-hackathon.tsx',
    title: 'CodeSrijan Hackathon Ecosystem',
    desc: 'Full digital platform, live judging scoreboards, and registration portals for 200+ participants.',
    tags: ['React.js', 'Node.js', 'WebSocket', 'Branding'],
    liveUrl: 'https://lnkd.in/p/dUXQYx92',
    githubUrl: 'https://github.com/varunsehgal05',
    code: `// ========================================================
// CodeSrijan Hackathon — Live Evaluation & Leaderboard Hub
// Lead UI/UX & Operations: Varun Sehgal
// Scale: 200+ Participants across 72 Hours
// ========================================================

import React, { useEffect, useState } from 'react';

export const LiveLeaderboard: React.FC = () => {
  const [teams, setTeams] = useState([
    { rank: 1, name: 'NeuralNomads', project: 'AI Health Diagnostics', score: 98.4 },
    { rank: 2, name: 'ByteCrafters', project: 'DeFi Micro-Lending', score: 96.1 },
    { rank: 3, name: 'SyntaxSorcerers', project: 'Green Supply Chain', score: 94.7 },
  ]);

  return (
    <div className="leaderboard-card p-6 bg-zinc-950 border border-purple-500/20 rounded-2xl">
      <h2 className="text-xl font-extrabold text-purple-400 mb-4">🏆 CodeSrijan Finalists</h2>
      <div className="space-y-3">
        {teams.map((t) => (
          <div key={t.rank} className="flex justify-between items-center p-3 bg-zinc-900 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg text-amber-400">#{t.rank}</span>
              <div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-xs text-zinc-400">{t.project}</p>
              </div>
            </div>
            <span className="text-emerald-400 font-mono font-bold">{t.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};`
  },

  'ollama-local-llm-service.py': {
    name: 'ollama-local-llm-service.py',
    category: 'Backend & AI',
    badge: 'Backend • Local LLM API',
    icon: 'py',
    path: 'backend > ollama-local-llm-service.py',
    title: 'Ollama Local LLM Integration Service',
    desc: 'Local microservice streaming quantized Llama-3 and Mistral inferences for instant offline question generation.',
    tags: ['Python 3.11', 'FastAPI', 'Ollama', 'LangChain', 'Docker'],
    liveUrl: 'https://github.com/varunsehgal05',
    githubUrl: 'https://github.com/varunsehgal05',
    code: `# ========================================================
# Ollama Local LLM Telemetry API
# Backend Architecture: Varun Sehgal
# ========================================================

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import json

app = FastAPI(title="VarunOS Local LLM Microservice", version="2.4.0")

class PromptRequest(BaseModel):
    model: str = "llama3:8b"
    prompt: str
    temperature: float = 0.2

@app.post("/api/v1/generate")
async def generate_response(req: PromptRequest):
    """Stream quantized local LLM responses without external API latency"""
    ollama_url = "http://localhost:11434/api/generate"
    payload = {
        "model": req.model,
        "prompt": req.prompt,
        "stream": False,
        "options": {
            "temperature": req.temperature,
            "top_p": 0.9
        }
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            resp = await client.post(ollama_url, json=payload)
            data = resp.json()
            return {
                "status": "success",
                "model": req.model,
                "response": data.get("response", ""),
                "eval_duration_ms": data.get("eval_duration", 0) / 1e6
            }
        except httpx.ConnectError:
            raise HTTPException(status_code=503, detail="Local Ollama instance unreachable")`
  },

  'README.md': {
    name: 'README.md',
    category: 'Root',
    badge: 'Overview • Varun Sehgal',
    icon: 'md',
    path: 'varun-portfolio > README.md',
    title: 'Varun Sehgal — UI/UX Designer & Software Engineer',
    desc: 'Portfolio workspace featuring vibecoded tools, interactive design systems, and frontend/backend software architecture.',
    tags: ['UI/UX', 'Product Design', 'Vibecoding', 'Full-Stack'],
    liveUrl: 'https://varunsehgal.runs-on.dev',
    githubUrl: 'https://github.com/varunsehgal05/Portfolio',
    code: `# Varun Sehgal 🚀
**UI/UX Designer & Software Engineer**
*B.Tech in Computer Science & Engineering @ JUET (2023 - 2027)*

> Designing intuitive digital experiences, high-converting SaaS interfaces, and vibecoded product ecosystems.

---

### 🌟 Project Categories Inside This VS Code Workspace:
- **⚡ Vibecoded Projects:**
  - \`ai-interview-platform.tsx\` — AI Candidate Evaluation SaaS
  - \`prompt-to-ui-engine.ts\` — Generative Agent AST Compiler
- **🎨 Frontend Projects:**
  - \`eventflow-ticketing.tsx\` — 4-Step Checkout Flow (30% drop-off reduction)
  - \`expensify-fintech.jsx\` — Rapid Expense Ledger App
  - \`codesrijan-hackathon.tsx\` — 200+ Developer Live Event Portal
- **🛠️ Backend & AI Architecture:**
  - \`ollama-local-llm-service.py\` — Offline Quantized LLM Microservice

---

### 📬 Connect & Collaborate:
- **Email:** varun.sehgal02@gmail.com
- **LinkedIn:** [linkedin.com/in/varunsehgal02](https://linkedin.com/in/varunsehgal02)
- **Behance:** [behance.net/varunsehgal3](https://behance.net/varunsehgal3)
- **GitHub:** [github.com/varunsehgal05](https://github.com/varunsehgal05)`
  }
};

const VsCodeApp = () => {
  const [activeFile, setActiveFile] = useState('README.md');
  const [openTabs, setOpenTabs] = useState(['README.md', 'ai-interview-platform.tsx', 'eventflow-ticketing.tsx']);
  const [copied, setCopied] = useState(false);

  // Folder open/closed state
  const [foldersOpen, setFoldersOpen] = useState({
    vibecoded: true,
    frontend: true,
    backend: true
  });

  const toggleFolder = (folderKey) => {
    setFoldersOpen(prev => ({ ...prev, [folderKey]: !prev[folderKey] }));
  };

  const handleSelectFile = (fileName) => {
    if (!openTabs.includes(fileName)) {
      setOpenTabs(prev => [...prev, fileName]);
    }
    setActiveFile(fileName);
  };

  const handleCloseTab = (e, fileName) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== fileName);
    setOpenTabs(newTabs);
    if (activeFile === fileName && newTabs.length > 0) {
      setActiveFile(newTabs[newTabs.length - 1]);
    }
  };

  const currentProject = PROJECTS_DATA[activeFile] || PROJECTS_DATA['README.md'];

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(currentProject.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper for file icons
  const renderFileIcon = (iconType) => {
    switch (iconType) {
      case 'tsx':
      case 'jsx':
        return <span className="vsc-icon-tsx">⚛</span>;
      case 'ts':
        return <span className="vsc-icon-ts">TS</span>;
      case 'py':
        return <span className="vsc-icon-py">🐍</span>;
      case 'md':
        return <span className="vsc-icon-md">ℹ</span>;
      default:
        return <FileCode size={14} className="vsc-icon-default" />;
    }
  };

  return (
    <div className="vscode-root-container">
      {/* 1. Left Activity Bar */}
      <div className="vscode-activity-bar">
        <div className="activity-top">
          <button className="activity-btn active" title="Explorer (Ctrl+Shift+E)">
            <Files size={18} />
          </button>
          <button className="activity-btn" title="Search">
            <Search size={18} />
          </button>
          <button className="activity-btn with-badge" title="Source Control">
            <GitBranch size={18} />
            <span className="activity-badge">3</span>
          </button>
          <button className="activity-btn" title="Run and Debug">
            <Play size={18} />
          </button>
          <button className="activity-btn" title="Extensions">
            <Package size={18} />
          </button>
        </div>
        <div className="activity-bottom">
          <button className="activity-btn" title="Accounts">
            <User size={18} />
          </button>
          <button className="activity-btn" title="Settings">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* 2. Explorer Sidebar */}
      <div className="vscode-sidebar">
        <div className="sidebar-header">
          <span>EXPLORER</span>
          <span className="sidebar-menu-dots">•••</span>
        </div>

        <div className="sidebar-tree">
          {/* Root Project Accordion */}
          <div className="tree-root-label">
            <ChevronDown size={14} />
            <span className="font-semibold">VARUN-PORTFOLIO</span>
          </div>

          {/* Folder: Vibecoded Projects */}
          <div className="tree-folder">
            <div className="folder-label" onClick={() => toggleFolder('vibecoded')}>
              {foldersOpen.vibecoded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <span className="folder-name">⚡ vibecoded-projects</span>
            </div>
            {foldersOpen.vibecoded && (
              <div className="folder-contents">
                <div 
                  className={`tree-file ${activeFile === 'ai-interview-platform.tsx' ? 'active' : ''}`}
                  onClick={() => handleSelectFile('ai-interview-platform.tsx')}
                >
                  {renderFileIcon('tsx')}
                  <span>ai-interview-platform.tsx</span>
                </div>
                <div 
                  className={`tree-file ${activeFile === 'prompt-to-ui-engine.ts' ? 'active' : ''}`}
                  onClick={() => handleSelectFile('prompt-to-ui-engine.ts')}
                >
                  {renderFileIcon('ts')}
                  <span>prompt-to-ui-engine.ts</span>
                </div>
              </div>
            )}
          </div>

          {/* Folder: Frontend Projects */}
          <div className="tree-folder">
            <div className="folder-label" onClick={() => toggleFolder('frontend')}>
              {foldersOpen.frontend ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <span className="folder-name">🎨 frontend-apps</span>
            </div>
            {foldersOpen.frontend && (
              <div className="folder-contents">
                <div 
                  className={`tree-file ${activeFile === 'eventflow-ticketing.tsx' ? 'active' : ''}`}
                  onClick={() => handleSelectFile('eventflow-ticketing.tsx')}
                >
                  {renderFileIcon('tsx')}
                  <span>eventflow-ticketing.tsx</span>
                </div>
                <div 
                  className={`tree-file ${activeFile === 'expensify-fintech.jsx' ? 'active' : ''}`}
                  onClick={() => handleSelectFile('expensify-fintech.jsx')}
                >
                  {renderFileIcon('jsx')}
                  <span>expensify-fintech.jsx</span>
                </div>
                <div 
                  className={`tree-file ${activeFile === 'codesrijan-hackathon.tsx' ? 'active' : ''}`}
                  onClick={() => handleSelectFile('codesrijan-hackathon.tsx')}
                >
                  {renderFileIcon('tsx')}
                  <span>codesrijan-hackathon.tsx</span>
                </div>
              </div>
            )}
          </div>

          {/* Folder: Backend & AI */}
          <div className="tree-folder">
            <div className="folder-label" onClick={() => toggleFolder('backend')}>
              {foldersOpen.backend ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <span className="folder-name">🛠️ backend-architecture</span>
            </div>
            {foldersOpen.backend && (
              <div className="folder-contents">
                <div 
                  className={`tree-file ${activeFile === 'ollama-local-llm-service.py' ? 'active' : ''}`}
                  onClick={() => handleSelectFile('ollama-local-llm-service.py')}
                >
                  {renderFileIcon('py')}
                  <span>ollama-local-llm-service.py</span>
                </div>
              </div>
            )}
          </div>

          {/* Root Level Files */}
          <div 
            className={`tree-file root-item ${activeFile === 'README.md' ? 'active' : ''}`}
            onClick={() => handleSelectFile('README.md')}
          >
            {renderFileIcon('md')}
            <span>README.md</span>
          </div>
        </div>
      </div>

      {/* 3. Main Editor Column */}
      <div className="vscode-editor-pane">
        {/* Editor Tabs Bar */}
        <div className="editor-tabs-bar">
          <div className="tabs-scroll-area">
            {openTabs.map((fileName) => {
              const fileData = PROJECTS_DATA[fileName] || {};
              const isActive = activeFile === fileName;
              return (
                <div
                  key={fileName}
                  className={`editor-tab ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFile(fileName)}
                >
                  {renderFileIcon(fileData.icon)}
                  <span className="tab-title">{fileName}</span>
                  <button 
                    className="tab-close-btn" 
                    onClick={(e) => handleCloseTab(e, fileName)}
                    title="Close"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          <div className="tab-actions-right">
            <button className="tab-action-btn" onClick={handleCopyCode} title="Copy Code">
              {copied ? <Check size={13} color="#4ade80" /> : <Copy size={13} />}
            </button>
            <a 
              href={currentProject.githubUrl || 'https://github.com/varunsehgal05'} 
              target="_blank" 
              rel="noreferrer"
              className="tab-action-btn"
              title="Open in GitHub"
            >
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Breadcrumb Row */}
        <div className="editor-breadcrumbs">
          <span className="crumb-segment">varun-portfolio</span>
          <span className="crumb-sep">›</span>
          <span className="crumb-segment">{currentProject.category}</span>
          <span className="crumb-sep">›</span>
          <span className="crumb-segment current">{currentProject.name}</span>

          <div className="project-badge-pill">
            <Sparkles size={11} />
            <span>{currentProject.badge}</span>
          </div>
        </div>

        {/* Project Header Info Banner */}
        <div className="project-banner">
          <div className="project-banner-info">
            <h2 className="project-banner-title">{currentProject.title}</h2>
            <p className="project-banner-desc">{currentProject.desc}</p>
            <div className="project-banner-tags">
              {currentProject.tags?.map((t, idx) => (
                <span key={idx} className="banner-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="project-banner-cta">
            {currentProject.liveUrl && (
              <a 
                href={currentProject.liveUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="vscode-btn-preview"
              >
                <ExternalLink size={13} />
                <span>Live Showcase</span>
              </a>
            )}
            <a 
              href={currentProject.githubUrl || 'https://github.com/varunsehgal05'} 
              target="_blank" 
              rel="noreferrer" 
              className="vscode-btn-github"
            >
              <Code size={13} />
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>

        {/* Code Editor View */}
        <div className="editor-code-container">
          <div className="editor-code-body">
            <div className="line-numbers">
              {currentProject.code.split('\n').map((_, idx) => (
                <div key={idx} className="line-no">{idx + 1}</div>
              ))}
            </div>
            <pre className="code-pre">
              <code>{currentProject.code}</code>
            </pre>
          </div>

          {/* Mini-map representation */}
          <div className="editor-minimap">
            {currentProject.code.split('\n').slice(0, 45).map((line, idx) => (
              <div 
                key={idx} 
                className="minimap-line"
                style={{ width: `${Math.min(100, Math.max(15, line.length * 1.8))}%` }}
              />
            ))}
          </div>
        </div>

        {/* 4. VS Code Status Bar */}
        <div className="vscode-status-bar">
          <div className="status-left">
            <span className="status-item git-item">
              <GitBranch size={11} />
              <span>main*</span>
            </span>
            <span className="status-item">
              <CheckCircle2 size={11} color="#4ade80" />
              <span>0 errors</span>
            </span>
          </div>
          <div className="status-right">
            <span className="status-item">Ln {currentProject.code.split('\n').length}, Col 1</span>
            <span className="status-item">Spaces: 2</span>
            <span className="status-item">UTF-8</span>
            <span className="status-item">TypeScript React</span>
            <span className="status-item prettier-item">Prettier: ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VsCodeApp;