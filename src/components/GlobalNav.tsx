import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";
import { toast } from "sonner";

export function GlobalNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Expose mobile menu toggle to the rest of the application via custom event
    useEffect(() => {
        const handleToggle = () => {
            setMobileMenuOpen(prev => !prev);
        };
        window.addEventListener("toggle-mobile-menu", handleToggle);
        return () => window.removeEventListener("toggle-mobile-menu", handleToggle);
    }, []);

    useEffect(() => {
        // Sync external state (like the sidebar) based on this internal state
        window.dispatchEvent(new CustomEvent("mobile-menu-state", { detail: mobileMenuOpen }));
    }, [mobileMenuOpen]);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 bg-background/60 text-primary font-body-md text-body-md backdrop-blur-3xl border-b border-white/10 no-shadows pointer-events-auto">
            <div className="flex items-center gap-4 sm:gap-6">
                <button className="md:hidden p-2 flex items-center justify-center text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
                </button>
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/50 shadow-[0_0_10px_rgba(99,102,241,0.3)] shrink-0 group-hover:scale-105 transition-transform bg-zinc-900">
                        <img
                            src="/varun.jpg"
                            alt="Varun Sehgal"
                            className="w-full h-full object-cover object-top"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/varun.jpeg'; }}
                        />
                    </div>
                    <span className="font-headline-md text-headline-md font-bold text-primary hidden sm:inline-block">Varun Sehgal Portfolio</span>
                    <span className="font-headline-md text-headline-md font-bold text-primary sm:hidden">Varun Sehgal</span>
                </Link>
                <div className="flex gap-4 hidden sm:flex">
                    <TopNav />
                </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
                <a href="mailto:varun.sehgal02@gmail.com" className="bg-primary text-on-primary hover:bg-primary/90 px-3 md:px-5 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] text-label-md font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                    <span className="hidden sm:inline">Email Me</span>
                    <span className="sm:hidden">Email</span>
                </a>
                <button onClick={() => { navigator.clipboard.writeText(window.location.origin); toast("Link copied!"); }} className="hidden sm:flex bg-surface-variant/50 hover:bg-surface-variant text-on-surface p-2 rounded-lg transition-colors" title="Share link">
                    <span className="material-symbols-outlined">share</span>
                </button>
                <a href="https://www.linkedin.com/in/varun-sehgal" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity" title="Varun Sehgal on LinkedIn">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 hover:border-primary transition-colors bg-zinc-900">
                        <img
                            src="/varun.jpg"
                            alt="Varun Sehgal"
                            className="w-full h-full object-cover object-top"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/varun.jpeg'; }}
                        />
                    </div>
                </a>
            </div>
        </nav>
    );
}
