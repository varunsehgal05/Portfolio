
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
        <MenubarTrigger className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface focus:bg-surface-variant/20 data-[state=open]:bg-surface-variant/20 cursor-pointer">Color</MenubarTrigger>
        <MenubarContent className="border-white/10 bg-surface/95 backdrop-blur-md text-on-surface">
          <MenubarItem disabled className="opacity-50 font-bold">Theme</MenubarItem>
          <MenubarItem onClick={() => changeTheme('default')}>Default (Dark)</MenubarItem>
          <MenubarItem onClick={() => changeTheme('cyberpunk')}>Cyberpunk</MenubarItem>
          <MenubarItem onClick={() => changeTheme('ocean')}>Ocean</MenubarItem>
          <MenubarItem onClick={() => changeTheme('monochrome')}>Monochrome</MenubarItem>
          <MenubarSeparator className="bg-white/10" />
          <MenubarItem onClick={() => window.dispatchEvent(new CustomEvent('reset-workspace'))}>Reset Workspace</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
