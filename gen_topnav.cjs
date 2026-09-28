const fs = require('fs');
const content = `
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar";
import { toast } from "sonner";

export function TopNav() {
  const handleDownloadResume = () => {
    toast("Downloading resume...");
  };

  const changeTheme = (theme) => {
    document.documentElement.classList.remove('theme-cyberpunk', 'theme-ocean', 'theme-monochrome');
    if (theme !== 'default') {
      document.documentElement.classList.add('theme-' + theme);
    }
    toast("Theme updated!");
  };

  return (
    <Menubar className="border-none bg-transparent h-8 p-0 space-x-0">
      <MenubarMenu>
        <MenubarTrigger className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface focus:bg-surface-variant/20 data-[state=open]:bg-surface-variant/20 cursor-pointer">File</MenubarTrigger>
        <MenubarContent className="border-white/10 bg-surface/95 backdrop-blur-md text-on-surface">
          <MenubarItem onClick={handleDownloadResume}>
            Download Resume <MenubarShortcut>?D</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator className="bg-white/10" />
          <MenubarItem onClick={() => window.open('https://github.com/varunsehgal05', '_blank')}>
            View Source Code
          </MenubarItem>
          <MenubarItem onClick={() => window.print()}>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface focus:bg-surface-variant/20 data-[state=open]:bg-surface-variant/20 cursor-pointer">Edit</MenubarTrigger>
        <MenubarContent className="border-white/10 bg-surface/95 backdrop-blur-md text-on-surface">
          <MenubarSub>
            <MenubarSubTrigger>Change Theme</MenubarSubTrigger>
            <MenubarSubContent className="border-white/10 bg-surface/95 backdrop-blur-md text-on-surface">
              <MenubarItem onClick={() => changeTheme('default')}>Default (Dark)</MenubarItem>
              <MenubarItem onClick={() => changeTheme('cyberpunk')}>Cyberpunk</MenubarItem>
              <MenubarItem onClick={() => changeTheme('ocean')}>Ocean</MenubarItem>
              <MenubarItem onClick={() => changeTheme('monochrome')}>Monochrome</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator className="bg-white/10" />
          <MenubarItem onClick={() => window.dispatchEvent(new CustomEvent('reset-workspace'))}>Reset Workspace</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface focus:bg-surface-variant/20 data-[state=open]:bg-surface-variant/20 cursor-pointer">View</MenubarTrigger>
        <MenubarContent className="border-white/10 bg-surface/95 backdrop-blur-md text-on-surface">
          <MenubarItem onClick={() => document.documentElement.classList.toggle('dark')}>
            Toggle Dark Mode
          </MenubarItem>
          <MenubarItem onClick={() => {
            if (document.fullscreenElement) document.exitFullscreen();
            else document.documentElement.requestFullscreen();
          }}>
            Toggle Fullscreen <MenubarShortcut>F11</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface focus:bg-surface-variant/20 data-[state=open]:bg-surface-variant/20 cursor-pointer">Help</MenubarTrigger>
        <MenubarContent className="border-white/10 bg-surface/95 backdrop-blur-md text-on-surface">
          <MenubarItem onClick={() => window.location.href = "mailto:hello@varunsehgal.com"}>
            Contact Me
          </MenubarItem>
          <MenubarItem onClick={() => toast("All systems operational.")}>
            System Status
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
`;
fs.writeFileSync('src/components/TopNav.tsx', content, 'utf8');
