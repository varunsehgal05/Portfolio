import { Link } from "@tanstack/react-router";

const primaryLinks = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/projects", label: "Work", icon: "dashboard" },
  { to: "/experience", label: "Experience", icon: "work" },
  { to: "/about", label: "About", icon: "person" },
  { to: "/resume", label: "Resume", icon: "description" },
] as const;

const workspaceLinks = [
  { to: "/design-system", label: "System", icon: "palette" },
  { to: "/process", label: "Process", icon: "account_tree" },
  { to: "/plugins", label: "Plugins", icon: "extension" },
] as const;

export function WorkspaceNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-[100] -translate-x-1/2 glass-panel rounded-xl px-2 py-2 flex items-center gap-4 overflow-x-auto max-w-[95vw] shadow-2xl bg-surface-container/60 backdrop-blur-xl border border-white/10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex items-center gap-1">
        {primaryLinks.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-label-md text-caption uppercase tracking-widest text-on-surface-variant transition-colors hover:bg-primary/10 hover:text-primary whitespace-nowrap"
            activeProps={{ className: "bg-primary/20 text-primary font-bold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]" }}
            activeOptions={{ exact: l.to === "/" }}
          >
            <span className="material-symbols-outlined text-[18px]">{l.icon}</span>
            {l.label}
          </Link>
        ))}
      </div>

      <div className="w-[1px] h-6 bg-white/20 rounded-full"></div>

      <div className="flex items-center gap-1">
        {workspaceLinks.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-label-md text-caption uppercase tracking-widest text-on-surface-variant/50 transition-colors hover:bg-surface-container-high hover:text-on-surface whitespace-nowrap"
            activeProps={{ className: "bg-surface-container-highest text-on-surface" }}
          >
            <span className="material-symbols-outlined text-[16px]">{l.icon}</span>
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
