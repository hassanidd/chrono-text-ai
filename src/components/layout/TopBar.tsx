import { Search, Bell, ChevronRight, Command } from "lucide-react";
import { motion } from "framer-motion";

interface TopBarProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

const TopBar = ({ title, breadcrumbs, actions }: TopBarProps) => {
  return (
    <header className="h-14 min-h-[3.5rem] bg-card/80 backdrop-blur-xl border-b flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5 text-sm"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />}
                <span className={`transition-colors duration-200 ${i === breadcrumbs.length - 1 ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground cursor-pointer"}`}>
                  {crumb.label}
                </span>
              </span>
            ))}
          </motion.div>
        )}
        {!breadcrumbs && <h1 className="text-sm font-semibold">{title}</h1>}
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="flex items-center gap-2.5 px-3 py-1.5 bg-muted/70 hover:bg-muted rounded-xl text-sm text-muted-foreground w-60 transition-colors duration-200 border border-transparent hover:border-border">
          <Search className="w-3.5 h-3.5" />
          <span className="text-[13px]">Search...</span>
          <kbd className="ml-auto text-[10px] bg-background/80 px-1.5 py-0.5 rounded-md border font-mono flex items-center gap-0.5">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-muted transition-all duration-200 group">
          <Bell className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-card" />
        </button>

        {actions}
      </div>
    </header>
  );
};

export default TopBar;
