import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
    head: () => ({
        meta: [
            { title: "Start a Project - Varun Sehgal" },
            { name: "description", content: "Project inquiry and contact form." },
        ],
    }),
    component: StartProject,
});

function StartProject() {
    const [inquiryType, setInquiryType] = useState("Product Design");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Inquiry sent successfully. I'll be in touch soon.");
    };

    return (
        <div className="bg-background text-on-background min-h-screen font-body-md selection:bg-primary-container selection:text-on-primary-container flex flex-col pt-16">

            <main className="flex-1 flex flex-col md:flex-row relative">
                {/* Left Side - Context */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative border-r border-white/5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surface-container-lowest via-background to-background">
                    <div className="max-w-md mx-auto relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-surface-variant flex items-center justify-center mb-8 border border-white/10 shadow-2xl">
                            <span className="material-symbols-outlined text-primary text-[32px]">handshake</span>
                        </div>

                        <h1 className="font-display-lg text-5xl font-bold text-on-surface mb-6 tracking-tight">Let's build something exceptional.</h1>
                        <p className="font-body-lg text-lg text-on-surface-variant mb-8 leading-relaxed">
                            I partner with founders and product teams to design zero-to-one SaaS applications, robust design systems, and high-conversion interfaces.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                                    <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
                                </div>
                                <div>
                                    <h3 className="font-headline-md font-bold text-on-surface">Rapid Prototyping</h3>
                                    <p className="font-body-md text-on-surface-variant text-sm mt-1">From concept to interactive high-fidelity in days, not weeks.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20 shrink-0">
                                    <span className="material-symbols-outlined text-secondary text-[18px]">token</span>
                                </div>
                                <div>
                                    <h3 className="font-headline-md font-bold text-on-surface">Scalable Systems</h3>
                                    <p className="font-body-md text-on-surface-variant text-sm mt-1">Rigorous component libraries engineered for engineering handoff.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center bg-surface-container-lowest">
                    <div className="max-w-md w-full">
                        <div className="glass-panel rounded-2xl p-8 border border-white/10 shadow-2xl bg-[#0A0A0A]">
                            <h2 className="font-headline-lg font-bold text-on-surface mb-6">Project Inquiry</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div className="space-y-2">
                                    <label className="font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Inquiry Type</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["Product Design", "UI/UX Design", "Design System", "UX Audit"].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setInquiryType(type)}
                                                className={`py-2 px-3 rounded-lg font-label-md text-xs transition-all border ${inquiryType === type ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]' : 'bg-surface-dim border-white/5 text-on-surface-variant hover:bg-surface-variant'}`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="name" className="font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Name</label>
                                    <input type="text" id="name" required className="w-full bg-surface-dim border border-white/10 rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/30" placeholder="Jane Doe" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Email</label>
                                    <input type="email" id="email" required className="w-full bg-surface-dim border border-white/10 rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/30" placeholder="jane@company.com" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="details" className="font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Project Details</label>
                                    <textarea id="details" required rows={4} className="w-full bg-surface-dim border border-white/10 rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/30 custom-scrollbar resize-none" placeholder="Tell me about your timeline, budget, and goals..."></textarea>
                                </div>

                                <button type="submit" className="w-full bg-primary text-on-primary font-bold py-4 rounded-lg hover:bg-primary-fixed hover:-translate-y-1 transition-transform shadow-[0_4px_20px_rgba(var(--primary-rgb),0.3)] mt-2">
                                    Submit Inquiry
                                </button>

                            </form>
                        </div>

                        <div className="mt-8 flex justify-center gap-6">
                            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-label-md text-sm">
                                X <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                            </a>
                            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-label-md text-sm">
                                LinkedIn <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                            </a>
                            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-label-md text-sm">
                                Layers <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                            </a>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
