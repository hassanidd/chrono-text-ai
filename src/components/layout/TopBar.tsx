import { Search, Bell, ChevronRight, Command, PanelLeftClose, PanelLeftOpen, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  isMobile?: boolean;
}

const TopBar = ({ title, breadcrumbs, actions, sidebarCollapsed, onToggleSidebar, isMobile }: TopBarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <header className="h-14 min-h-[3.5rem] bg-card/80 backdrop-blur-xl border-b flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors duration-150 text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            {isMobile ? (
              <Menu className="w-4 h-4" />
            ) : sidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        )}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5 text-sm min-w-0 overflow-hidden"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5 min-w-0">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0" />}
                <span
                  onClick={() => crumb.href && navigate(crumb.href)}
                  className={`transition-colors duration-200 truncate ${i === breadcrumbs.length - 1 ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground cursor-pointer"}`}
                >
                  {crumb.label}
                </span>
              </span>
            ))}
          </motion.div>
        )}
        {!breadcrumbs && <h1 className="text-sm font-semibold truncate">{title}</h1>}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Search - hidden on mobile */}
        <button className="hidden md:flex items-center gap-2.5 px-3 py-1.5 bg-muted/70 hover:bg-muted rounded-xl text-sm text-muted-foreground w-60 transition-colors duration-200 border border-transparent hover:border-border">
          <Search className="w-3.5 h-3.5" />
          <span className="text-[13px]">{t("common.search")}</span>
          <kbd className="ml-auto text-[10px] bg-background/80 px-1.5 py-0.5 rounded-md border font-mono flex items-center gap-0.5">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </button>

        {/* Search icon on mobile */}
        <button className="md:hidden p-2 rounded-xl hover:bg-muted transition-all duration-200 text-muted-foreground hover:text-foreground">
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-muted transition-all duration-200 group">
          <Bell className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-card" />
        </button>

        <div className="hidden sm:contents">{actions}</div>
      </div>
    </header>
  );
};

export default TopBar;
