import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Database, FileText, Zap, Search, Cpu, HardDrive,
  Activity, Settings, Plus, MessageSquare, LogOut, Globe, User
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";

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

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileSidebar = ({ open, onOpenChange }: MobileSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isActive = (path: string) =>
    location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  const handleNav = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[260px] p-0 bg-sidebar-bg border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="flex items-center h-14 px-4 gap-3 border-b border-sidebar-border">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--gradient-primary)" }}
          >
            <span className="text-[11px] font-black text-primary-foreground">V</span>
          </div>
          <span className="text-sm font-bold text-sidebar-fg-active tracking-tight">
            VectorFlow
          </span>
        </div>

        {/* New Ingestion */}
        <div className="px-3 pt-3 pb-1">
          <button
            onClick={() => handleNav("/ingestions/new")}
            className="flex items-center gap-2 rounded-lg text-xs font-semibold text-primary-foreground w-full px-3 h-9 transition-all"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "0 2px 8px hsl(var(--primary) / 0.3)",
            }}
          >
            <Plus className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{t("nav.newIngestion")}</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          {navItems.map((item, i) => {
            if ("type" in item && item.type === "divider") {
              return <div key={`d-${i}`} className="my-2 mx-2 h-px bg-sidebar-border/50" />;
            }
            if (!("path" in item)) return null;
            const active = isActive(item.path);
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`
                  relative w-full flex items-center rounded-lg transition-colors duration-150 outline-none h-9 px-2.5 gap-2.5
                  ${active
                    ? "bg-sidebar-hover text-sidebar-fg-active"
                    : "text-sidebar-fg hover:text-sidebar-fg-active hover:bg-sidebar-hover/50"
                  }
                `}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-primary" />
                )}
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-primary" : ""}`} strokeWidth={active ? 2 : 1.6} />
                <span className="text-[13px] font-medium truncate">{t(item.labelKey)}</span>
                {"badge" in item && item.badge && (
                  <span className="ml-auto text-[10px] font-bold bg-primary text-primary-foreground rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom — User section */}
        <div className="border-t border-sidebar-border px-3 py-3 space-y-2">
          {/* Language selector */}
          <div className="flex items-center gap-1.5 flex-wrap px-1 mb-1">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={`text-sm px-1.5 py-0.5 rounded transition-colors ${
                  i18n.language === lang.code
                    ? "bg-sidebar-hover text-sidebar-fg-active"
                    : "text-sidebar-fg hover:text-sidebar-fg-active"
                }`}
              >
                {lang.flag}
              </button>
            ))}
          </div>

          {/* User card */}
          <div className="flex items-center gap-2.5 px-1">
            <div className="w-8 h-8 rounded-lg bg-sidebar-hover flex items-center justify-center border border-sidebar-border flex-shrink-0">
              <span className="text-[10px] font-bold text-sidebar-fg-active">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-sidebar-fg-active truncate">John Doe</p>
              <p className="text-[10px] text-sidebar-fg truncate">john.doe@vectorflow.ai</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-1">
            <button
              onClick={() => handleNav("/settings")}
              className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-sidebar-fg hover:text-sidebar-fg-active hover:bg-sidebar-hover/50 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">{t("nav.settings")}</span>
            </button>
            <button
              onClick={() => handleNav("/login")}
              className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">Log out</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
