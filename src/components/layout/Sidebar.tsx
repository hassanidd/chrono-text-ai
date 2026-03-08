import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Database, FileText, Zap, Search, Cpu, HardDrive,
  Activity, Settings, Plus, MessageSquare, LogOut, Globe, ChevronRight, User,
  Sun, Moon, Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const navItems = [
  { icon: LayoutDashboard, labelKey: "nav.dashboard", path: "/" },
  { icon: Database, labelKey: "nav.datasets", path: "/datasets" },
  { icon: FileText, labelKey: "nav.documents", path: "/documents" },
  { type: "divider" as const },
  { icon: Zap, labelKey: "nav.ingestions", path: "/ingestions", badge: 3 },
  { icon: Search, labelKey: "nav.retrieval", path: "/retrieval" },
  { icon: MessageSquare, labelKey: "nav.playground", path: "/playground" },
  { type: "divider" as const },
  { icon: Cpu, labelKey: "nav.models", path: "/models" },
  { icon: HardDrive, labelKey: "nav.vectors", path: "/vector-store" },
  { icon: Activity, labelKey: "nav.activity", path: "/activity" },
] as const;

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [userOpen, setUserOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) =>
    location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <motion.aside
      animate={{ width: collapsed ? 60 : 220 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-screen flex flex-col flex-shrink-0 bg-sidebar-bg border-r border-sidebar-border overflow-hidden"
    >
      {/* Logo */}
      <div className={`flex items-center h-14 flex-shrink-0 ${collapsed ? "justify-center" : "px-4 gap-3"}`}>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--gradient-primary)" }}
        >
          <span className="text-[11px] font-black text-primary-foreground">V</span>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-sm font-bold text-sidebar-fg-active tracking-tight whitespace-nowrap overflow-hidden"
            >
              VectorFlow
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* New Ingestion */}
      <div className={`px-2 mb-1 ${collapsed ? "flex justify-center" : ""}`}>
        <button
          onClick={() => navigate("/ingestions/new")}
          className={`
            flex items-center gap-2 rounded-lg text-xs font-semibold text-primary-foreground transition-all
            ${collapsed ? "w-9 h-9 justify-center" : "w-full px-3 h-9"}
          `}
          style={{
            background: "var(--gradient-primary)",
            boxShadow: "0 2px 8px hsl(var(--primary) / 0.3)",
          }}
        >
          <Plus className="w-3.5 h-3.5 flex-shrink-0" />
          {!collapsed && <span>{t("nav.newIngestion")}</span>}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {navItems.map((item, i) => {
          if ("type" in item && item.type === "divider") {
            return (
              <div key={`d-${i}`} className="my-2 mx-2 h-px bg-sidebar-border/50" />
            );
          }

          if (!("path" in item)) return null;
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                relative w-full flex items-center rounded-lg transition-colors duration-150 outline-none
                ${collapsed ? "h-9 w-9 mx-auto justify-center" : "h-8 px-2.5 gap-2.5"}
                ${active
                  ? "bg-sidebar-hover text-sidebar-fg-active"
                  : "text-sidebar-fg hover:text-sidebar-fg-active hover:bg-sidebar-hover/50"
                }
              `}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-primary" : ""}`} strokeWidth={active ? 2 : 1.6} />
              {!collapsed && (
                <span className="text-[13px] font-medium truncate">{t(item.labelKey)}</span>
              )}
              {!collapsed && "badge" in item && item.badge && (
                <span className="ml-auto text-[10px] font-bold bg-primary text-primary-foreground rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {item.badge}
                </span>
              )}
              {collapsed && "badge" in item && item.badge && (
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom — User Popover */}
      <div className="px-2 pb-2">
        <div className="my-1.5 mx-2 h-px bg-sidebar-border/50" />
        <Popover open={userOpen} onOpenChange={setUserOpen}>
          <PopoverTrigger asChild>
            <button
              className={`
                w-full flex items-center rounded-lg transition-colors duration-150
                ${collapsed ? "h-9 w-9 mx-auto justify-center" : "h-10 px-2 gap-2.5"}
                text-sidebar-fg hover:text-sidebar-fg-active hover:bg-sidebar-hover/50
              `}
            >
              <div className="w-7 h-7 rounded-lg bg-sidebar-hover flex items-center justify-center flex-shrink-0 border border-sidebar-border">
                <span className="text-[10px] font-bold text-sidebar-fg-active">JD</span>
              </div>
              {!collapsed && (
                <>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-[12px] font-medium text-sidebar-fg-active truncate">John Doe</p>
                    <p className="text-[10px] text-sidebar-fg truncate">john.doe@vectorflow.ai</p>
                  </div>
                  <ChevronRight className="w-3 h-3 text-sidebar-fg flex-shrink-0" />
                </>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="right"
            align="end"
            sideOffset={8}
            className="w-56 p-0 overflow-hidden"
          >
            {/* User header */}
            <div className="px-3 py-3 border-b">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center border">
                  <span className="text-xs font-bold text-accent-foreground">JD</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">John Doe</p>
                  <p className="text-[11px] text-muted-foreground truncate">john.doe@vectorflow.ai</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="py-1.5">
              <button
                onClick={() => { setUserOpen(false); navigate("/settings"); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
                {t("nav.settings")}
              </button>
              <button
                onClick={() => { setUserOpen(false); navigate("/settings"); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              >
                <User className="w-4 h-4 text-muted-foreground" />
                Profile
              </button>
            </div>

            {/* Language */}
            <div className="border-t py-1.5">
              <div className="px-3 py-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Language</span>
              </div>
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-sm hover:bg-muted transition-colors ${
                    i18n.language === lang.code ? "text-primary font-medium" : "text-foreground"
                  }`}
                >
                  <span className="text-sm">{lang.flag}</span>
                  <span className="text-[13px]">{lang.label}</span>
                  {i18n.language === lang.code && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t py-1.5">
              <button
                onClick={() => { setUserOpen(false); navigate("/login"); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
