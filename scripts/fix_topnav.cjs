const fs = require('fs');
let content = fs.readFileSync('src/components/TopNav.tsx', 'utf8');

// Replace the submenu with direct items
const searchStr = `<MenubarSub>
            <MenubarSubTrigger>Change Theme</MenubarSubTrigger>
            <MenubarSubContent className="border-white/10 bg-surface/95 backdrop-blur-md text-on-surface">
              <MenubarItem onClick={() => changeTheme('default')}>Default (Dark)</MenubarItem>
              <MenubarItem onClick={() => changeTheme('cyberpunk')}>Cyberpunk</MenubarItem>
              <MenubarItem onClick={() => changeTheme('ocean')}>Ocean</MenubarItem>
              <MenubarItem onClick={() => changeTheme('monochrome')}>Monochrome</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>`;

const replaceStr = `<MenubarItem disabled className="opacity-50 font-bold">Theme</MenubarItem>
          <MenubarItem onClick={() => changeTheme('default')}>Default (Dark)</MenubarItem>
          <MenubarItem onClick={() => changeTheme('cyberpunk')}>Cyberpunk</MenubarItem>
          <MenubarItem onClick={() => changeTheme('ocean')}>Ocean</MenubarItem>
          <MenubarItem onClick={() => changeTheme('monochrome')}>Monochrome</MenubarItem>`;

content = content.replace(searchStr, replaceStr);
fs.writeFileSync('src/components/TopNav.tsx', content, 'utf8');
