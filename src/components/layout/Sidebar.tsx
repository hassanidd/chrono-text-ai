import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Database, FileText, Zap, Search, Cpu, HardDrive,
  Activity, Settings, Plus, LogOut, PanelLeftClose, PanelLeft,
  ChevronDown, Crown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navSections = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/" },
      { icon: Database, label: "Datasets", path: "/datasets" },
      { icon: FileText, label: "Documents", path: "/documents" },
    ],
  },
  {
    label: "Pipeline",
    items: [
      { icon: Zap, label: "Ingestions", path: "/ingestions", badge: 3 },
      { icon: Search, label: "Retrieval Test", path: "/retrieval" },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { icon: Cpu, label: "Models", path: "/models" },
      { icon: HardDrive, label: "Vector Store", path: "/vector-store" },
      { icon: Activity, label: "Activity", path: "/activity" },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [wsOpen, setWsOpen] = useState(false);

  const isActivePath = (path: string) =>
    location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  const NavItem = ({ item }: { item: { icon: any; label: string; path: string; badge?: number } }) => {
    const active = isActivePath(item.path);
    const Icon = item.icon;

    const btn = (
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate(item.path)}
        className={`
          relative w-full flex items-center gap-2.5 rounded-[10px] text-[13px] font-medium
          transition-colors duration-150 outline-none group
          ${collapsed ? "justify-center h-10 w-10 mx-auto" : "px-2.5 h-9"}
          ${active
            ? "text-sidebar-fg-active"
            : "text-sidebar-fg hover:text-sidebar-fg-active"
          }
        `}
      >
        {/* Active background */}
        {active && (
          <motion.div
            layoutId="nav-highlight"
            className="absolute inset-0 rounded-[10px]"
            style={{
              background: "hsl(var(--primary) / 0.12)",
              border: "1px solid hsl(var(--primary) / 0.15)",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}

        {/* Hover background */}
        <div className={`absolute inset-0 rounded-[10px] transition-opacity duration-150 ${active ? "opacity-0" : "opacity-0 group-hover:opacity-100"}`} style={{ background: "hsl(var(--sidebar-hover) / 0.5)" }} />

        <div className="relative z-10 flex-shrink-0">
          <Icon
            className={`w-[16px] h-[16px] transition-colors duration-150 ${
              active ? "text-primary" : ""
            }`}
            strokeWidth={active ? 2.2 : 1.8}
          />
        </div>

        {!collapsed && (
          <span className="relative z-10 truncate">{item.label}</span>
        )}

        {!collapsed && item.badge && (
          <div className="relative z-10 ml-auto flex items-center justify-center min-w-[18px] h-[18px] rounded-full text-[10px] font-bold bg-primary text-primary-foreground leading-none px-1">
            {item.badge}
          </div>
        )}

        {collapsed && item.badge && (
          <div className="absolute -top-0.5 -right-0.5 z-20 w-[7px] h-[7px] rounded-full bg-primary ring-2 ring-sidebar-bg" />
        )}
      </motion.button>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.path}>
          <TooltipTrigger asChild>{btn}</TooltipTrigger>
          <TooltipContent side="right" sideOffset={14} className="text-xs font-medium">
            {item.label}
            {item.badge && <span className="ml-1.5 text-primary">({item.badge})</span>}
          </TooltipContent>
        </Tooltip>
      );
    }

    return <div key={item.path}>{btn}</div>;
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="h-screen flex flex-col flex-shrink-0 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(228 28% 11%) 0%, hsl(228 24% 7%) 100%)",
      }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-4 right-4 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)" }} />

      {/* ─── Brand ─── */}
      <div className={`relative z-10 ${collapsed ? "px-2 pt-5 pb-3" : "px-3 pt-5 pb-3"}`}>
        <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3 px-1"}`}>
          <div
            className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(260 70% 60%))",
              boxShadow: "0 0 16px -4px hsl(var(--primary) / 0.4)",
            }}
          >
            <span className="text-[13px] font-black text-primary-foreground tracking-tight">V</span>
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 min-w-0"
            >
              <div className="text-[14px] font-bold text-sidebar-fg-active tracking-tight leading-none">
                VectorFlow
              </div>
              <div className="text-[10px] text-sidebar-fg/50 mt-1 leading-none">Data Pipeline</div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ─── Workspace ─── */}
      <div className={`relative z-10 ${collapsed ? "px-2" : "px-3"} mb-2`}>
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-full flex justify-center py-1.5 rounded-lg hover:bg-sidebar-hover/40 transition-colors">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-sidebar-fg-active" style={{ background: "hsl(var(--sidebar-hover))" }}>
                  A
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={14}>
              <p className="font-semibold text-xs">Acme Corp</p>
              <p className="text-[10px] text-muted-foreground">Enterprise</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <div>
            <button
              onClick={() => setWsOpen(!wsOpen)}
              className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-colors hover:bg-sidebar-hover/40 group"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-sidebar-fg-active flex-shrink-0" style={{ background: "hsl(var(--sidebar-hover))" }}>
                A
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-[12px] font-semibold text-sidebar-fg-active/80 truncate">Acme Corp</div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-medium uppercase tracking-wider text-primary/70 bg-primary/10 px-1.5 py-0.5 rounded">
                  <Crown className="w-2.5 h-2.5 inline -mt-px mr-0.5" />
                  Ent
                </span>
                <motion.div animate={{ rotate: wsOpen ? 180 : 0 }} transition={{ duration: 0.15 }}>
                  <ChevronDown className="w-3 h-3 text-sidebar-fg/30" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence>
              {wsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  <div className="mt-1 mx-1 rounded-lg p-1 space-y-0.5" style={{ background: "hsl(var(--sidebar-hover) / 0.4)", border: "1px solid hsl(var(--sidebar-border) / 0.5)" }}>
                    {[{ name: "Acme Corp", active: true }, { name: "Personal", active: false }].map((ws) => (
                      <button
                        key={ws.name}
                        className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[12px] hover:bg-sidebar-hover/60 transition-colors text-sidebar-fg-active/70"
                        onClick={() => setWsOpen(false)}
                      >
                        <div className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold" style={{ background: "hsl(var(--sidebar-hover))" }}>
                          {ws.name[0]}
                        </div>
                        {ws.name}
                        {ws.active && <div className="ml-auto w-1 h-1 rounded-full bg-primary" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ─── CTA ─── */}
      <div className={`relative z-10 ${collapsed ? "px-2" : "px-3"} mb-3`}>
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => navigate("/ingestions/new")}
                className="w-full flex items-center justify-center h-9 rounded-[10px] transition-all duration-200 group"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(260 70% 58%))",
                  boxShadow: "0 2px 12px -3px hsl(var(--primary) / 0.5)",
                }}
              >
                <Plus className="w-4 h-4 text-primary-foreground transition-transform duration-200 group-hover:rotate-90" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={14}>New Ingestion</TooltipContent>
          </Tooltip>
        ) : (
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/ingestions/new")}
            className="w-full flex items-center justify-center gap-2 h-9 rounded-[10px] text-[13px] font-semibold text-primary-foreground group"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(260 70% 58%))",
              boxShadow: "0 2px 12px -3px hsl(var(--primary) / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.1)",
            }}
          >
            <Plus className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
            <span>New Ingestion</span>
          </motion.button>
        )}
      </div>

      {/* ─── Navigation ─── */}
      <nav className={`flex-1 overflow-y-auto relative z-10 ${collapsed ? "px-2" : "px-3"}`}>
        {navSections.map((section, si) => (
          <div key={section.label} className={si > 0 ? "mt-4" : ""}>
            {!collapsed && (
              <div className="px-2.5 mb-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-sidebar-fg/25">
                  {section.label}
                </span>
              </div>
            )}
            {collapsed && si > 0 && (
              <div className="mx-2 mb-2 h-px" style={{ background: "hsl(var(--sidebar-border) / 0.3)" }} />
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ─── Bottom ─── */}
      <div className={`relative z-10 ${collapsed ? "px-2" : "px-3"} pb-2`}>
        {/* Settings */}
        <NavItem item={{ icon: Settings, label: "Settings", path: "/settings" }} />

        {/* Collapse */}
        <div className="mt-1">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onToggle}
                  className="w-full flex justify-center h-9 items-center rounded-[10px] text-sidebar-fg/30 hover:text-sidebar-fg/60 hover:bg-sidebar-hover/30 transition-colors"
                >
                  <PanelLeft className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={14}>Expand sidebar</TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={onToggle}
              className="w-full flex items-center gap-2.5 px-2.5 h-9 rounded-[10px] text-[13px] text-sidebar-fg/30 hover:text-sidebar-fg/60 hover:bg-sidebar-hover/30 transition-colors"
            >
              <PanelLeftClose className="w-4 h-4" />
              <span>Collapse</span>
            </button>
          )}
        </div>
      </div>

      {/* ─── User ─── */}
      <div className={`relative z-10 ${collapsed ? "px-2" : "px-3"} pb-3 pt-2`} style={{ borderTop: "1px solid hsl(var(--sidebar-border) / 0.3)" }}>
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-full flex justify-center py-1 group">
                <div className="relative">
                  <img
                    src="https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=6366f1&textColor=ffffff&fontSize=40"
                    alt="JD"
                    className="w-8 h-8 rounded-full ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
                  />
                  <div className="absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full ring-2" style={{ background: "hsl(var(--success))", ringColor: "hsl(228 28% 11%)" }} />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={14}>
              <p className="font-semibold text-xs">John Doe</p>
              <p className="text-[10px] text-muted-foreground">john@acme.com</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <button className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-sidebar-hover/30 transition-colors group text-left">
            <div className="relative flex-shrink-0">
              <img
                src="https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=6366f1&textColor=ffffff&fontSize=40"
                alt="JD"
                className="w-8 h-8 rounded-full"
              />
              <div className="absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full ring-2" style={{ background: "hsl(var(--success))", ringColor: "hsl(228 28% 11%)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-sidebar-fg-active truncate">John Doe</div>
              <div className="text-[10px] text-sidebar-fg/40 truncate">john@acme.com</div>
            </div>
            <LogOut className="w-3.5 h-3.5 text-sidebar-fg/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
