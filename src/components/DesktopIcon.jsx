import { Trash2, Mail } from 'lucide-react';
import './DesktopIcon.css';

const FigmaIcon = () => (
  <svg width="20" height="30" viewBox="0 0 38 57" fill="none">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);

const VsCodeIcon = () => (
  <span style={{ color: '#38bdf8', fontSize: '15px', fontWeight: '800', fontFamily: 'monospace' }}>
    &lt;/&gt;
  </span>
);

const PdfIcon = () => (
  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <svg width="22" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.75">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <line x1="10" y1="9" x2="8" y2="9"></line>
    </svg>
    <span style={{ 
      position: 'absolute', 
      bottom: '1px', 
      background: '#ef4444', 
      color: '#fff', 
      fontSize: '7px', 
      fontWeight: '800', 
      padding: '0 2px', 
      borderRadius: '2px', 
      letterSpacing: '0.2px' 
    }}>
      PDF
    </span>
  </div>
);

const ContactIcon = () => (
  <Mail size={22} color="#10b981" />
);

const TrashIcon = () => (
  <Trash2 size={21} color="#9ca3af" />
);

const IconMap = {
  figma: FigmaIcon,
  vscode: VsCodeIcon,
  resume: PdfIcon,
  contact: ContactIcon,
  trash: TrashIcon,
};

const DesktopIcon = ({ app, onDoubleClick, onClick }) => {
  const IconComponent = IconMap[app.icon] || IconMap.figma;

  return (
    <div 
      className="desktop-icon-container" 
      onClick={onClick || onDoubleClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="desktop-icon-image">
        <IconComponent />
      </div>
      <span className="desktop-icon-label">{app.name}</span>
    </div>
  );
};

export default DesktopIcon;
