const fs = require('fs');
let content = fs.readFileSync('src/routes/index.tsx', 'utf8');

// 1. Add mobileMenuOpen state
content = content.replace(
  /const \[showAssets, setShowAssets\] = useState\(false\);/,
  `const [showAssets, setShowAssets] = useState(false);\n  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);`
);

// 2. Add hamburger menu to TopNav area
const oldNav = `<div className="flex items-center gap-6">
          <span className="font-headline-md text-headline-md font-bold text-primary">Varun Sehgal Portfolio</span>
          <div className="flex gap-4 hidden sm:flex">
            <TopNav />
          </div>
        </div>`;
const newNav = `<div className="flex items-center gap-4 sm:gap-6">
          <button className="md:hidden p-2 flex items-center justify-center text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
          <span className="font-headline-md text-headline-md font-bold text-primary hidden xs:inline-block">Varun Sehgal Portfolio</span>
          <span className="font-headline-md text-headline-md font-bold text-primary xs:hidden">Varun Sehgal</span>
          <div className="flex gap-4 hidden sm:flex">
            <TopNav />
          </div>
        </div>`;
content = content.replace(oldNav, newNav);

// 3. Make sidebar visible on mobile when menu is open
const oldSidebar = `<aside className="fixed left-0 top-16 h-[calc(100vh-64px)] z-40 flex-col py-6 bg-surface/80 text-primary font-label-md text-label-md w-64 backdrop-blur-xl border-r border-white/10 no-shadows hidden md:flex">`;
const newSidebar = `<aside className={\`fixed left-0 top-16 h-[calc(100vh-64px)] z-40 flex-col py-6 bg-surface/95 text-primary font-label-md text-label-md w-64 backdrop-blur-xl border-r border-white/10 no-shadows transition-transform duration-300 md:flex \${mobileMenuOpen ? 'translate-x-0 flex' : '-translate-x-full md:translate-x-0 hidden'}\`}>`;
content = content.replace(oldSidebar, newSidebar);

fs.writeFileSync('src/routes/index.tsx', content, 'utf8');
