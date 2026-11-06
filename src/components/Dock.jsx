import { 
  Compass, 
  Settings, 
  Trash2, 
  FileText
} from 'lucide-react';
import './Dock.css';

const FigmaLogo = () => (
  <svg width="18" height="26" viewBox="0 0 38 57" fill="none">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);

const FinderIcon = () => (
  <div className="dock-icon-inner finder-bg">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="9.5" r="1.5" fill="#ffffff" />
      <circle cx="16" cy="9.5" r="1.5" fill="#ffffff" />
      <path d="M7 14.5C8.5 17 15.5 17 17 14.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

const SafariIcon = () => (
  <div className="dock-icon-inner safari-bg">
    <Compass size={24} color="#ffffff" />
  </div>
);

const VsCodeIcon = () => (
  <div className="dock-icon-inner dark-bg">
    <span style={{ color: '#38bdf8', fontSize: '15px', fontWeight: '800', fontFamily: 'monospace' }}>
      &lt;&gt;
    </span>
  </div>
);

const FigmaDockIcon = () => (
  <div className="dock-icon-inner dark-bg">
    <FigmaLogo />
  </div>
);

const TerminalIcon = () => (
  <div className="dock-icon-inner dark-bg">
    <span style={{ color: '#4ade80', fontSize: '13px', fontWeight: '800', fontFamily: 'monospace' }}>
      &gt;_
    </span>
  </div>
);

const ResumeIcon = () => (
  <div className="dock-icon-inner orange-bg">
    <FileText size={22} color="#ffffff" />
  </div>
);

const SettingsIcon = () => (
  <div className="dock-icon-inner dark-bg">
    <Settings size={22} color="#d4d4d8" />
  </div>
);

const TrashDockIcon = () => (
  <div className="dock-icon-inner dark-bg">
    <Trash2 size={21} color="#d4d4d8" />
  </div>
);

const DOCK_ITEMS = [
  { id: 'finder', name: 'Finder', icon: FinderIcon },
  { id: 'safari', name: 'Safari', icon: SafariIcon },
  { id: 'vscode', name: 'VS Code', icon: VsCodeIcon },
  { id: 'figma', name: 'Figma', icon: FigmaDockIcon },
  { id: 'terminal', name: 'Terminal', icon: TerminalIcon },
  { id: 'resume', name: 'Resume', icon: ResumeIcon },
  { id: 'settings', name: 'Settings', icon: SettingsIcon },
  { id: 'separator', isSeparator: true },
  { id: 'trash', name: 'Trash', icon: TrashDockIcon }
];

const Dock = ({ openWindows = [], minimizedWindows = [], activeWindow, onAppClick }) => {
  return (
    <div className="dock-container">
      <div className="dock">
        {DOCK_ITEMS.map((item, idx) => {
          if (item.isSeparator) {
            return <div key={`sep-${idx}`} className="dock-separator" />;
          }

          const IconComponent = item.icon;
          const isOpen = openWindows.includes(item.id);
          const isMin = minimizedWindows.includes(item.id);
          const isActive = activeWindow === item.id && !isMin;

          return (
            <div 
              key={item.id} 
              data-app-id={item.id}
              className={`dock-item ${isMin ? 'minimized-app' : ''}`}
              onClick={() => onAppClick(item.id)}
            >
              <div className="dock-tooltip">{item.name}</div>
              <div className="dock-icon-wrapper">
                <IconComponent />
              </div>
              {isOpen && <div className={`dock-dot ${isActive ? 'active' : ''}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
