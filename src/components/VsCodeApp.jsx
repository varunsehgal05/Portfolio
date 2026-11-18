import React, { useState, useRef, useEffect } from 'react';
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
  Layers,
  Trash2,
  Maximize2,
  Minimize2,
  X,
  AlertCircle,
  Folder,
  FolderOpen
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

// ========================================================
// Realistic File Execution Outputs for Integrated Terminal
// ========================================================
const FILE_EXECUTION_LOGS = {
  'ai-interview-platform.tsx': [
    { type: 'info', text: '[ai-core] Initializing Autonomous Candidate Assessment Engine...' },
    { type: 'info', text: '[ai-core] Connecting to CandidateStream (session: cand_9841)' },
    { type: 'success', text: '[telemetry] FAANG L5 System Design rubric loaded (target evalScore: 94.8%)' },
    { type: 'success', text: '[security] Facial & Audio biometrics: VERIFIED_HUMAN (confidence: 99.4%)' },
    { type: 'info', text: '[evaluator] Streaming 18 audio frames to Ollama Local LLM inference server...' },
    { type: 'success', text: '✓ Assessment workspace active on http://localhost:8080 (38ms)' }
  ],
  'prompt-to-ui-engine.ts': [
    { type: 'info', text: '[Compiler] Parsing design prompt intent: "Build reactive Glass UI with fluid motion"' },
    { type: 'info', text: '[AST Generator] Synthesizing Component tree with design system tokens...' },
    { type: 'info', text: '[DesignTokens] Applied: surfaceBg="rgba(18,22,30,0.94)", glassBlur="28px"' },
    { type: 'success', text: '[Compiler] Generated 14 React components with Tailwind CSS in 48ms.' },
    { type: 'success', text: '✓ AST output compiled to dist/bundle.js (18.4 kB)' }
  ],
  'eventflow-ticketing.tsx': [
    { type: 'prompt', text: '> eventflow-ticketing@1.0.0 dev' },
    { type: 'info', text: 'VITE v5.2.8 ready in 190 ms' },
    { type: 'success', text: '➜ Local:   http://localhost:3001/' },
    { type: 'info', text: '[SeatMap] 3D SVG Auditorium geometry cached (1,450 seats ready)' },
    { type: 'success', text: '[Payment] Stripe Webhooks verified: /api/webhooks/stripe' }
  ],
  'expensify-fintech.jsx': [
    { type: 'info', text: '[FinTech Engine] Parsing transaction ledger (1,240 records)...' },
    { type: 'info', text: '[Budget AI] Calculated breakdown: Housing (38%), Cloud (11%), Food (10%), Savings (41%)' },
    { type: 'success', text: '[Analytics] Month-over-month burn rate reduced by 14.2%' },
    { type: 'success', text: '✓ Sync completed with Plaid & Banking APIs (0 errors)' }
  ],
  'codesrijan-hackathon.tsx': [
    { type: 'prompt', text: '▲ Next.js 14.2.3 dev server running' },
    { type: 'success', text: '- Local:        http://localhost:3002' },
    { type: 'info', text: '✓ Compiled /portal/teams in 310ms (822 modules)' },
    { type: 'success', text: '[Database] Connected to PostgreSQL (JUET Hackathon cluster: 840 participants)' },
    { type: 'info', text: '[Leaderboard] Real-time WebSocket scoring pipeline active.' }
  ],
  'ollama-local-llm-service.py': [
    { type: 'info', text: '[INFO] FastAPI 0.110.0 starting on http://127.0.0.1:11434' },
    { type: 'info', text: '[INFO] Loading local model weights: llama3:8b-instruct-q4_K_M' },
    { type: 'success', text: '[INFO] GPU acceleration: Apple Metal / CUDA enabled (14 layers offloaded)' },
    { type: 'success', text: '[INFO] Health check: OK (latency: 18ms)' },
    { type: 'prompt', text: '[INFO] POST /api/generate - 200 OK (38.4 tokens/sec)' }
  ],
  'README.md': [
    { type: 'info', text: '# Varun Sehgal — UI/UX Designer & Software Engineer' },
    { type: 'prompt', text: 'Undergraduate at Jaypee University Of Engineering And Technology (2023–2027)' },
    { type: 'success', text: 'Specialties: Vibecoded AI SaaS, Frontend Architecture, Design Systems' },
    { type: 'info', text: 'GitHub: https://github.com/varunsehgal05 | Email: varun.sehgal02@gmail.com' }
  ]
};

const EXTENSIONS_LIST = [
  { name: 'Tailwind CSS IntelliSense', publisher: 'Tailwind Labs', version: 'v0.10.5', icon: '🎨', desc: 'Intelligent Tailwind CSS tooling for VS Code.' },
  { name: 'Prettier - Code formatter', publisher: 'Prettier', version: 'v10.4.0', icon: '✨', desc: 'Code formatter using prettier.' },
  { name: 'Python', publisher: 'Microsoft', version: 'v2024.4.0', icon: '🐍', desc: 'Python language support with syntax highlighting and linting.' },
  { name: 'ESLint', publisher: 'Microsoft', version: 'v3.0.8', icon: '🛡️', desc: 'Integrates ESLint JavaScript into VS Code.' },
  { name: 'GitHub Copilot', publisher: 'GitHub', version: 'v1.180.0', icon: '🤖', desc: 'Your AI pair programmer.' }
];

const VsCodeApp = () => {
  const [activeFile, setActiveFile] = useState('README.md');
  const [openTabs, setOpenTabs] = useState(['README.md', 'ai-interview-platform.tsx', 'eventflow-ticketing.tsx']);
  const [copied, setCopied] = useState(false);
  const [activeActivity, setActiveActivity] = useState('explorer'); // 'explorer' | 'search' | 'git' | 'debug' | 'extensions'

  // Editable files state
  const [editedCodes, setEditedCodes] = useState({});
  const [unsavedFiles, setUnsavedFiles] = useState([]);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  // Terminal state
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalTab, setTerminalTab] = useState('terminal'); // 'terminal' | 'output' | 'problems' | 'debug'
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [isRunningCode, setIsRunningCode] = useState(false);

  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'VarunOS VS Code Developer Environment [Version 3.2.0]' },
    { type: 'system', text: 'Type "help" or click a Quick Run chip to execute scripts.' },
    { type: 'prompt', text: 'varun@macbook:~/varun-portfolio $ npm run dev' },
    { type: 'success', text: '[vite v5.2.0] ready in 180 ms. Local: http://localhost:3000/' }
  ]);

  // Search view state
  const [searchQuery, setSearchQuery] = useState('');

  // Source control view state
  const [commitMessage, setCommitMessage] = useState('');
  const [commitToast, setCommitToast] = useState(false);

  // Run & debug view state
  const [debugConfig, setDebugConfig] = useState('Launch Active File');

  const terminalBodyRef = useRef(null);
  const editorTextareaRef = useRef(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory, terminalOpen, terminalTab]);

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
  const currentCode = editedCodes[activeFile] !== undefined 
    ? editedCodes[activeFile] 
    : (currentProject.code || '');

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCodeChange = (e) => {
    const val = e.target.value;
    setEditedCodes(prev => ({ ...prev, [activeFile]: val }));
    if (!unsavedFiles.includes(activeFile)) {
      setUnsavedFiles(prev => [...prev, activeFile]);
    }
    updateCaretPos(e.target);
  };

  const updateCaretPos = (textarea) => {
    if (!textarea) return;
    const selStart = textarea.selectionStart || 0;
    const textBefore = textarea.value.substring(0, selStart);
    const lines = textBefore.split('\n');
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    });
  };

  const handleEditorKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      setUnsavedFiles(prev => prev.filter(f => f !== activeFile));
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;
      const newVal = val.substring(0, start) + '  ' + val.substring(end);
      setEditedCodes(prev => ({ ...prev, [activeFile]: newVal }));
      if (!unsavedFiles.includes(activeFile)) {
        setUnsavedFiles(prev => [...prev, activeFile]);
      }
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
        updateCaretPos(textarea);
      }, 0);
    }
  };

  // Run Code in Integrated Terminal
  const handleRunCode = () => {
    setTerminalOpen(true);
    setTerminalTab('terminal');
    setIsRunningCode(true);

    const fileName = activeFile;
    const runCmd = fileName.endsWith('.tsx') || fileName.endsWith('.ts')
      ? `tsx ${fileName}`
      : fileName.endsWith('.py')
      ? `python ${fileName}`
      : fileName.endsWith('.jsx')
      ? `node ${fileName}`
      : `cat ${fileName}`;

    setTerminalHistory(prev => [
      ...prev,
      { type: 'prompt', text: `varun@macbook:~/varun-portfolio $ ${runCmd}` },
      { type: 'info', text: `[Runner] Executing ${fileName}...` }
    ]);

    setTimeout(() => {
      const logs = FILE_EXECUTION_LOGS[fileName] || [
        { type: 'success', text: `[Runner] Process finished with exit code 0` }
      ];
      setTerminalHistory(prev => [...prev, ...logs]);
      setIsRunningCode(false);
    }, 450);
  };

  const executeTerminalCommand = (rawCmd) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    if (cmd === 'clear') {
      setTerminalHistory([]);
      return;
    }

    if (cmd === 'run-active' || cmd === 'run') {
      handleRunCode();
      return;
    }

    setTerminalHistory(prev => [
      ...prev,
      { type: 'prompt', text: `varun@macbook:~/varun-portfolio $ ${cmd}` }
    ]);

    if (cmd === 'help') {
      setTerminalHistory(prev => [
        ...prev,
        { type: 'system', text: 'Available commands:' },
        { type: 'info', text: '  run               Run currently open file' },
        { type: 'info', text: '  node <file>       Execute with Node.js' },
        { type: 'info', text: '  python <file>     Execute Python service' },
        { type: 'info', text: '  npm run dev       Start Vite dev server' },
        { type: 'info', text: '  ls / dir          List workspace projects' },
        { type: 'info', text: '  cat <file>        Print file content' },
        { type: 'info', text: '  git status        Show Git working tree' },
        { type: 'info', text: '  clear             Clear terminal screen' },
        { type: 'info', text: '  whoami            Show user identity' }
      ]);
      return;
    }

    if (cmd === 'ls' || cmd === 'dir') {
      setTerminalHistory(prev => [
        ...prev,
        { type: 'info', text: '⚡ vibecoded-projects/   🎨 frontend-apps/   🛠️ backend-architecture/   📄 README.md' }
      ]);
      return;
    }

    if (cmd.startsWith('node ') || cmd.startsWith('tsx ') || cmd.startsWith('python ')) {
      const target = cmd.split(' ')[1];
      const match = Object.keys(FILE_EXECUTION_LOGS).find(k => k.includes(target));
      if (match) {
        setTerminalHistory(prev => [
          ...prev,
          { type: 'info', text: `[Runner] Executing ${match}...` },
          ...(FILE_EXECUTION_LOGS[match] || [])
        ]);
        return;
      }
    }

    if (cmd === 'npm run dev' || cmd === 'npm start') {
      setTerminalHistory(prev => [
        ...prev,
        { type: 'prompt', text: '> varun-portfolio@3.0.0 dev' },
        { type: 'info', text: 'VITE v5.2.0 ready in 140 ms' },
        { type: 'success', text: '➜ Local: http://localhost:3000/' }
      ]);
      return;
    }

    if (cmd === 'git status') {
      setTerminalHistory(prev => [
        ...prev,
        { type: 'info', text: 'On branch main' },
        { type: 'info', text: 'Your branch is up to date with origin/main.' },
        { type: 'success', text: 'nothing to commit, working tree clean' }
      ]);
      return;
    }

    if (cmd === 'whoami') {
      setTerminalHistory(prev => [
        ...prev,
        { type: 'success', text: 'varun (UI/UX Designer & Product Software Engineer)' }
      ]);
      return;
    }

    if (cmd === 'pwd') {
      setTerminalHistory(prev => [
        ...prev,
        { type: 'info', text: '/Users/varun/portfolio/varun-portfolio' }
      ]);
      return;
    }

    setTerminalHistory(prev => [
      ...prev,
      { type: 'info', text: `[Shell] Executed: ${cmd} (exit code 0)` }
    ]);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;
    setTerminalInput('');
    executeTerminalCommand(cmd);
  };

  const handleCommit = (e) => {
    e.preventDefault();
    if (!commitMessage.trim()) return;
    setCommitToast(true);
    setTimeout(() => {
      setCommitToast(false);
      setCommitMessage('');
    }, 2200);
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

  // Filter projects for search
  const searchResults = searchQuery.trim() === '' ? [] : Object.entries(PROJECTS_DATA).filter(([key, val]) => {
    return key.toLowerCase().includes(searchQuery.toLowerCase()) || 
           val.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           val.code.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="vscode-root-container">
      {/* 1. Left Activity Bar */}
      <div className="vscode-activity-bar">
        <div className="activity-top">
          <button 
            className={`activity-btn ${activeActivity === 'explorer' ? 'active' : ''}`}
            onClick={() => setActiveActivity('explorer')}
            title="Explorer (Ctrl+Shift+E)"
          >
            <Files size={18} />
          </button>
          <button 
            className={`activity-btn ${activeActivity === 'search' ? 'active' : ''}`}
            onClick={() => setActiveActivity('search')}
            title="Search (Ctrl+Shift+F)"
          >
            <Search size={18} />
          </button>
          <button 
            className={`activity-btn with-badge ${activeActivity === 'git' ? 'active' : ''}`}
            onClick={() => setActiveActivity('git')}
            title="Source Control (Ctrl+Shift+G)"
          >
            <GitBranch size={18} />
            <span className="activity-badge">{unsavedFiles.length > 0 ? unsavedFiles.length : 3}</span>
          </button>
          <button 
            className={`activity-btn ${activeActivity === 'debug' ? 'active' : ''}`}
            onClick={() => setActiveActivity('debug')}
            title="Run and Debug (Ctrl+Shift+D)"
          >
            <Play size={18} />
          </button>
          <button 
            className={`activity-btn ${activeActivity === 'extensions' ? 'active' : ''}`}
            onClick={() => setActiveActivity('extensions')}
            title="Extensions (Ctrl+Shift+X)"
          >
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

      {/* 2. Dynamic Activity Sidebar */}
      <div className="vscode-sidebar">
        {/* VIEW: Explorer */}
        {activeActivity === 'explorer' && (
          <>
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
                      {unsavedFiles.includes('ai-interview-platform.tsx') && <span className="dirty-indicator">●</span>}
                    </div>
                    <div 
                      className={`tree-file ${activeFile === 'prompt-to-ui-engine.ts' ? 'active' : ''}`}
                      onClick={() => handleSelectFile('prompt-to-ui-engine.ts')}
                    >
                      {renderFileIcon('ts')}
                      <span>prompt-to-ui-engine.ts</span>
                      {unsavedFiles.includes('prompt-to-ui-engine.ts') && <span className="dirty-indicator">●</span>}
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
                      {unsavedFiles.includes('eventflow-ticketing.tsx') && <span className="dirty-indicator">●</span>}
                    </div>
                    <div 
                      className={`tree-file ${activeFile === 'expensify-fintech.jsx' ? 'active' : ''}`}
                      onClick={() => handleSelectFile('expensify-fintech.jsx')}
                    >
                      {renderFileIcon('jsx')}
                      <span>expensify-fintech.jsx</span>
                      {unsavedFiles.includes('expensify-fintech.jsx') && <span className="dirty-indicator">●</span>}
                    </div>
                    <div 
                      className={`tree-file ${activeFile === 'codesrijan-hackathon.tsx' ? 'active' : ''}`}
                      onClick={() => handleSelectFile('codesrijan-hackathon.tsx')}
                    >
                      {renderFileIcon('tsx')}
                      <span>codesrijan-hackathon.tsx</span>
                      {unsavedFiles.includes('codesrijan-hackathon.tsx') && <span className="dirty-indicator">●</span>}
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
                      {unsavedFiles.includes('ollama-local-llm-service.py') && <span className="dirty-indicator">●</span>}
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
                {unsavedFiles.includes('README.md') && <span className="dirty-indicator">●</span>}
              </div>
            </div>
          </>
        )}

        {/* VIEW: Search */}
        {activeActivity === 'search' && (
          <div className="sidebar-search-panel">
            <div className="sidebar-header">
              <span>SEARCH</span>
              <span className="sidebar-menu-dots">•••</span>
            </div>
            <div className="search-input-box">
              <Search size={14} className="search-icon-inside" />
              <input 
                type="text" 
                className="vsc-search-input"
                placeholder="Search code (e.g. AI, Next.js, Ollama)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button className="search-clear-btn" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>
            <div className="search-results-info">
              {searchQuery.trim() === '' ? (
                <span>Type to search files and code</span>
              ) : (
                <span>{searchResults.length} result{searchResults.length === 1 ? '' : 's'} in workspace</span>
              )}
            </div>
            <div className="search-results-list">
              {searchResults.map(([fileKey, item]) => (
                <div 
                  key={fileKey} 
                  className="search-result-row"
                  onClick={() => handleSelectFile(fileKey)}
                >
                  <div className="search-res-title">
                    {renderFileIcon(item.icon)}
                    <span className="search-res-name">{item.name}</span>
                  </div>
                  <div className="search-res-match">{item.title}</div>
                  <div className="search-res-sub">{item.badge}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: Source Control (Git) */}
        {activeActivity === 'git' && (
          <div className="sidebar-git-panel">
            <div className="sidebar-header">
              <span>SOURCE CONTROL: GIT</span>
              <span className="sidebar-menu-dots">•••</span>
            </div>
            <div className="git-branch-banner">
              <GitBranch size={13} />
              <span className="font-semibold">main*</span>
              <span className="git-sync-chip">Synchronized</span>
            </div>
            <form className="git-commit-form" onSubmit={handleCommit}>
              <textarea 
                className="git-commit-input"
                rows={2}
                placeholder="Commit message (Ctrl+Enter to commit)"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    handleCommit(e);
                  }
                }}
              />
              <button 
                type="submit" 
                className="git-commit-btn"
                disabled={!commitMessage.trim()}
              >
                <Check size={13} />
                <span>Commit & Push</span>
              </button>
              {commitToast && (
                <div className="git-commit-success">
                  <CheckCircle2 size={13} color="#4ade80" />
                  <span>Pushed to origin/main successfully!</span>
                </div>
              )}
            </form>

            <div className="git-changes-header">
              <span>STAGED & MODIFIED CHANGES ({unsavedFiles.length + 3})</span>
            </div>
            <div className="git-changes-list">
              {unsavedFiles.map(f => (
                <div key={f} className="git-change-item" onClick={() => handleSelectFile(f)}>
                  <span className="git-badge-m">M</span>
                  <span className="git-change-name">{f}</span>
                  <span className="git-change-status">Unsaved</span>
                </div>
              ))}
              <div className="git-change-item" onClick={() => handleSelectFile('ai-interview-platform.tsx')}>
                <span className="git-badge-m">M</span>
                <span className="git-change-name">ai-interview-platform.tsx</span>
                <span className="git-change-status">Modified</span>
              </div>
              <div className="git-change-item" onClick={() => handleSelectFile('prompt-to-ui-engine.ts')}>
                <span className="git-badge-m">M</span>
                <span className="git-change-name">prompt-to-ui-engine.ts</span>
                <span className="git-change-status">Modified</span>
              </div>
              <div className="git-change-item" onClick={() => handleSelectFile('ollama-local-llm-service.py')}>
                <span className="git-badge-a">A</span>
                <span className="git-change-name">ollama-local-llm-service.py</span>
                <span className="git-change-status">Added</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: Run and Debug */}
        {activeActivity === 'debug' && (
          <div className="sidebar-debug-panel">
            <div className="sidebar-header">
              <span>RUN AND DEBUG</span>
              <span className="sidebar-menu-dots">•••</span>
            </div>
            <div className="debug-launch-box">
              <select 
                className="debug-config-select"
                value={debugConfig}
                onChange={(e) => setDebugConfig(e.target.value)}
              >
                <option value="Launch Active File">▶ Launch: {activeFile}</option>
                <option value="Launch Vite Dev Server">▶ Launch: Vite Dev Server</option>
                <option value="Debug Python LLM Service">▶ Launch: Python Service</option>
              </select>
              <button className="debug-play-btn" onClick={handleRunCode} title="Start Debugging (F5)">
                <Play size={13} fill="#4ade80" color="#4ade80" />
                <span>Start Debugging</span>
              </button>
            </div>

            <div className="debug-section-label">WATCH EXPRESSIONS</div>
            <div className="debug-watch-list">
              <div className="debug-watch-row">
                <span className="watch-key">process.env.NODE_ENV:</span>
                <span className="watch-val">"production"</span>
              </div>
              <div className="debug-watch-row">
                <span className="watch-key">activeCandidate:</span>
                <span className="watch-val">"cand_9841"</span>
              </div>
              <div className="debug-watch-row">
                <span className="watch-key">gpuAcceleration:</span>
                <span className="watch-val">"Metal (14 layers)"</span>
              </div>
            </div>

            <div className="debug-section-label">BREAKPOINTS</div>
            <div className="debug-breakpoints-list">
              <div className="debug-bp-row" onClick={() => handleSelectFile('ai-interview-platform.tsx')}>
                <span className="bp-dot red">●</span>
                <span>ai-interview-platform.tsx:75</span>
              </div>
              <div className="debug-bp-row" onClick={() => handleSelectFile('ollama-local-llm-service.py')}>
                <span className="bp-dot red">●</span>
                <span>ollama-local-llm-service.py:42</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: Extensions */}
        {activeActivity === 'extensions' && (
          <div className="sidebar-ext-panel">
            <div className="sidebar-header">
              <span>EXTENSIONS</span>
              <span className="sidebar-menu-dots">•••</span>
            </div>
            <div className="ext-search-box">
              <Search size={14} className="search-icon-inside" />
              <input 
                type="text" 
                className="vsc-search-input"
                placeholder="Search Extensions in Marketplace..."
              />
            </div>
            <div className="ext-section-label">INSTALLED (5)</div>
            <div className="ext-list">
              {EXTENSIONS_LIST.map((ext, idx) => (
                <div key={idx} className="ext-item">
                  <div className="ext-icon">{ext.icon}</div>
                  <div className="ext-info">
                    <div className="ext-title-row">
                      <span className="ext-name">{ext.name}</span>
                      <span className="ext-version">{ext.version}</span>
                    </div>
                    <div className="ext-desc">{ext.desc}</div>
                    <div className="ext-meta">
                      <span className="ext-pub">{ext.publisher}</span>
                      <span className="ext-installed-badge">Installed</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Main Editor Column */}
      <div className="vscode-editor-pane">
        {/* Editor Tabs Bar */}
        <div className="editor-tabs-bar">
          <div className="tabs-scroll-area">
            {openTabs.map((fileName) => {
              const fileData = PROJECTS_DATA[fileName] || {};
              const isActive = activeFile === fileName;
              const isDirty = unsavedFiles.includes(fileName);
              return (
                <div
                  key={fileName}
                  className={`editor-tab ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFile(fileName)}
                >
                  {renderFileIcon(fileData.icon)}
                  <span className="tab-title">{fileName}</span>
                  {isDirty && <span className="tab-dirty-dot" title="Unsaved changes">●</span>}
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
            <button 
              className="tab-run-code-btn" 
              onClick={handleRunCode}
              title="Run Code in Terminal (Ctrl+F5)"
              disabled={isRunningCode}
            >
              <Play size={12} fill="#4ade80" color="#4ade80" />
              <span>{isRunningCode ? 'Running...' : 'Run Code'}</span>
            </button>
            <button 
              className={`tab-action-btn ${terminalOpen ? 'active' : ''}`}
              onClick={() => setTerminalOpen(!terminalOpen)}
              title="Toggle Integrated Terminal (Ctrl+`)"
            >
              <Terminal size={13} />
            </button>
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
            <button 
              className="vscode-btn-preview run-accent"
              onClick={handleRunCode}
              title="Execute active project in terminal"
            >
              <Play size={13} fill="#ffffff" />
              <span>Run Code</span>
            </button>
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
              {currentCode.split('\n').map((_, idx) => (
                <div key={idx} className="line-no">{idx + 1}</div>
              ))}
            </div>
            <div className="code-editor-wrapper">
              <textarea
                ref={editorTextareaRef}
                className="code-editor-textarea"
                rows={Math.max(30, currentCode.split('\n').length + 5)}
                value={currentCode}
                onChange={handleCodeChange}
                onKeyDown={handleEditorKeyDown}
                onClick={(e) => updateCaretPos(e.target)}
                onKeyUp={(e) => updateCaretPos(e.target)}
                spellCheck="false"
                autoCapitalize="off"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Mini-map representation */}
          <div className="editor-minimap">
            {currentCode.split('\n').slice(0, 45).map((line, idx) => (
              <div 
                key={idx} 
                className="minimap-line"
                style={{ width: `${Math.min(100, Math.max(15, line.length * 1.8))}%` }}
              />
            ))}
          </div>
        </div>

        {/* Integrated Terminal Panel */}
        {terminalOpen && (
          <div 
            className={`vscode-terminal-panel ${isTerminalMaximized ? 'maximized' : ''}`}
            style={{ height: isTerminalMaximized ? '65%' : '230px' }}
          >
            <div className="terminal-header-bar">
              <div className="terminal-tabs-left">
                <button 
                  className={`terminal-tab-btn ${terminalTab === 'problems' ? 'active' : ''}`}
                  onClick={() => setTerminalTab('problems')}
                >
                  PROBLEMS <span className="term-badge">0</span>
                </button>
                <button 
                  className={`terminal-tab-btn ${terminalTab === 'output' ? 'active' : ''}`}
                  onClick={() => setTerminalTab('output')}
                >
                  OUTPUT
                </button>
                <button 
                  className={`terminal-tab-btn ${terminalTab === 'debug' ? 'active' : ''}`}
                  onClick={() => setTerminalTab('debug')}
                >
                  DEBUG CONSOLE
                </button>
                <button 
                  className={`terminal-tab-btn ${terminalTab === 'terminal' ? 'active' : ''}`}
                  onClick={() => setTerminalTab('terminal')}
                >
                  TERMINAL <span className="term-badge-blue">bash</span>
                </button>
              </div>

              <div className="terminal-actions-right">
                <button 
                  className="term-action-btn term-run-btn"
                  onClick={handleRunCode}
                  title="Run Active File"
                  disabled={isRunningCode}
                >
                  <Play size={11} fill="#4ade80" color="#4ade80" />
                  <span>{isRunningCode ? 'Running...' : 'Run'}</span>
                </button>
                <button 
                  className="term-action-btn"
                  onClick={() => setTerminalHistory([])}
                  title="Clear Terminal"
                >
                  <Trash2 size={13} />
                </button>
                <button 
                  className="term-action-btn"
                  onClick={() => setIsTerminalMaximized(!isTerminalMaximized)}
                  title={isTerminalMaximized ? "Restore Size" : "Maximize Size"}
                >
                  {isTerminalMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
                <button 
                  className="term-action-btn"
                  onClick={() => setTerminalOpen(false)}
                  title="Close Terminal Panel"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* Quick Chips Bar */}
            {terminalTab === 'terminal' && (
              <div className="terminal-chips-bar">
                <span className="chips-label">Quick Run:</span>
                <button className="term-chip primary" onClick={handleRunCode}>
                  ▶ Run active ({activeFile})
                </button>
                <button className="term-chip" onClick={() => executeTerminalCommand('npm run dev')}>
                  npm run dev
                </button>
                <button className="term-chip" onClick={() => executeTerminalCommand('git status')}>
                  git status
                </button>
                <button className="term-chip" onClick={() => executeTerminalCommand('ls')}>
                  ls
                </button>
                <button className="term-chip" onClick={() => executeTerminalCommand('node -v')}>
                  node -v
                </button>
                <button className="term-chip" onClick={() => executeTerminalCommand('whoami')}>
                  whoami
                </button>
                <button className="term-chip" onClick={() => executeTerminalCommand('help')}>
                  help
                </button>
                <button className="term-chip" onClick={() => setTerminalHistory([])}>
                  clear
                </button>
              </div>
            )}

            {/* Terminal Body */}
            <div className="terminal-scroll-body" ref={terminalBodyRef}>
              {terminalTab === 'problems' && (
                <div className="terminal-tab-empty">
                  <CheckCircle2 size={18} color="#4ade80" />
                  <span>No problems have been detected in the workspace.</span>
                </div>
              )}

              {terminalTab === 'output' && (
                <div className="terminal-tab-empty text-left font-mono">
                  <p className="text-zinc-400">[Vite HMR] connected to http://localhost:5173</p>
                  <p className="text-zinc-500">[Language Server] TypeScript 5.4.2 active. 0 diagnostics reported.</p>
                  <p className="text-zinc-500">[Tailwind CSS] IntelliSense active on 8 workspace files.</p>
                </div>
              )}

              {terminalTab === 'debug' && (
                <div className="terminal-tab-empty text-left font-mono">
                  <p className="text-emerald-400">&gt; Debugger listening on ws://127.0.0.1:9229</p>
                  <p className="text-zinc-400">&gt; For help, see: https://nodejs.org/en/docs/inspector</p>
                  <p className="text-zinc-500">&gt; Debugger attached to process {activeFile}.</p>
                </div>
              )}

              {terminalTab === 'terminal' && (
                <div className="terminal-log-flow">
                  {terminalHistory.map((line, idx) => (
                    <div key={idx} className={`term-line term-${line.type}`}>
                      {line.type === 'prompt' && <span className="term-prompt-prefix">❯ </span>}
                      <span>{line.text}</span>
                    </div>
                  ))}

                  {/* Interactive Prompt Line */}
                  <form className="term-prompt-line" onSubmit={handleTerminalSubmit}>
                    <span className="term-prompt-user">varun@macbook:~/varun-portfolio $</span>
                    <input 
                      type="text"
                      className="term-interactive-input"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="type command (e.g. 'run', 'npm run dev', 'git status', 'ls', 'help')..."
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. VS Code Status Bar */}
        <div className="vscode-status-bar">
          <div className="status-left">
            <span 
              className="status-item git-item clickable" 
              onClick={() => setActiveActivity('git')}
              title="Source Control"
            >
              <GitBranch size={11} />
              <span>main*</span>
            </span>
            <span 
              className="status-item clickable" 
              onClick={() => { setTerminalOpen(true); setTerminalTab('problems'); }}
              title="Problems"
            >
              <CheckCircle2 size={11} color="#4ade80" />
              <span>0 errors</span>
            </span>
            <button 
              className={`status-item status-term-btn ${terminalOpen ? 'active' : ''}`}
              onClick={() => setTerminalOpen(!terminalOpen)}
              title="Toggle Terminal"
            >
              <Terminal size={11} />
              <span>Terminal</span>
            </button>
          </div>
          <div className="status-right">
            <span className="status-item">Ln {cursorPos.line}, Col {cursorPos.col}</span>
            <span className="status-item">Spaces: 2</span>
            <span className="status-item">UTF-8</span>
            <span className="status-item">
              {activeFile.endsWith('.tsx') ? 'TypeScript React' : 
               activeFile.endsWith('.ts') ? 'TypeScript' :
               activeFile.endsWith('.py') ? 'Python' :
               activeFile.endsWith('.jsx') ? 'JavaScript React' : 'Markdown'}
            </span>
            <span className="status-item prettier-item">Prettier: ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VsCodeApp;