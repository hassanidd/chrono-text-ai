import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Outlet, useOutletContext } from "react-router-dom";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

interface PublicLayoutContext {
  setHero: (hero: { title: string; subtitle: string; stats?: { value: string; label: string }[] }) => void;
}

export function usePublicLayout() {
  return useOutletContext<PublicLayoutContext>();
}

import { useState, useEffect } from "react";

const PublicLayout = () => {
  const [hero, setHero] = useState({ title: "", subtitle: "", stats: undefined as { value: string; label: string }[] | undefined });

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12" style={{ background: "var(--gradient-sidebar)" }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-sidebar-border/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-sidebar-border/20" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-glow" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-sidebar-fg-active">VectorFlow</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10"
        >
          <h1 className="text-4xl font-bold text-sidebar-fg-active mb-4 leading-tight whitespace-pre-line">
            {hero.title}
          </h1>
          <p className="text-sidebar-fg text-sm leading-relaxed max-w-md">
            {hero.subtitle}
          </p>
          {hero.stats && hero.stats.length > 0 && (
            <div className="flex items-center gap-8 mt-8">
              {hero.stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                >
                  <p className="text-2xl font-bold text-sidebar-fg-active">{s.value}</p>
                  <p className="text-xs text-sidebar-fg">{s.label}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        <p className="text-xs text-sidebar-fg relative z-10">© 2026 VectorFlow. All rights reserved.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">VectorFlow</span>
          </div>
          <Outlet context={{ setHero } satisfies PublicLayoutContext} />
        </motion.div>
      </div>
    </div>
  );
};

export default PublicLayout;
