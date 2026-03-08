import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Database, FileText, Zap, Search, Cpu, HardDrive,
  Activity, Settings, ChevronDown, Plus, Sparkles, LogOut, ChevronsLeft, ChevronsRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mainNav = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Database, label: "Datasets", path: "/datasets" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: Zap, label: "Ingestions", path: "/ingestions", badge: "3" },
  { icon: Search, label: "Retrieval Test", path: "/retrieval" },
];

const systemNav = [
  { icon: Cpu, label: "Models", path: "/models" },
  { icon: HardDrive, label: "Vector Store", path: "/vector-store" },
  { icon: Activity, label: "Activity", path: "/activity" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const workspaces = [
  { name: "Acme Corp", plan: "Enterprise", color: "from-primary to-primary-glow" },
  { name: "Personal", plan: "Pro", color: "from-primary to-primary-glow" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [wsOpen, setWsOpen] = useState(false);
  const [activeWs] = useState(0);

  const renderNavItem = (item: typeof mainNav[0]) => {
    const isActive = location.pathname === item.path ||
      (item.path !== "/" && location.pathname.startsWith(item.path));

    const content = (
      <button
        key={item.path}
        onClick={() => navigate(item.path)}
        className={`w-full flex items-center ${collapsed ? "justify-center" : ""} gap-3 ${collapsed ? "px-0 py-2.5" : "px-3 py-[9px]"} rounded-lg text-[13px] font-medium transition-all duration-200 relative group`}
      >
        {isActive && (
          <motion.div
            layoutId="sidebar-active-pill"
            className="absolute inset-0 rounded-lg"
            style={{
              background: "linear-gradient(135deg, hsl(var(--sidebar-hover)), hsl(var(--sidebar-hover) / 0.6))",
              boxShadow: "inset 0 1px 0 0 hsl(0 0% 100% / 0.04), 0 0 0 1px hsl(0 0% 100% / 0.03)",
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        )}
        {!isActive && (
          <div className="absolute inset-0 rounded-lg bg-sidebar-hover opacity-0 group-hover:opacity-60 transition-opacity duration-150" />
        )}

        {/* Active indicator bar */}
        {isActive && !collapsed && (
          <motion.div
            layoutId="sidebar-active-bar"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-primary"
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        )}

        <div className={`relative z-10 flex items-center justify-center w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive ? "text-primary-foreground" : "text-sidebar-fg group-hover:text-sidebar-fg-active"}`}>
          <item.icon className={`w-[17px] h-[17px] ${isActive ? "text-primary-glow drop-shadow-[0_0_6px_hsl(var(--primary-glow)/0.5)]" : ""}`} />
        </div>

        {!collapsed && (
          <>
            <span className={`relative z-10 truncate transition-colors duration-200 ${isActive ? "text-sidebar-fg-active" : "text-sidebar-fg group-hover:text-sidebar-fg-active"}`}>
              {item.label}
            </span>
            {item.badge && (
              <span className={`ml-auto relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[20px] text-center ${isActive ? "bg-primary/30 text-primary-foreground" : "bg-sidebar-hover text-sidebar-fg"}`}>
                {item.badge}
              </span>
            )}
          </>
        )}
        {collapsed && item.badge && (
          <span className="absolute top-1.5 right-1.5 z-10 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.6)]" />
        )}
      </button>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.path}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" sideOffset={12} className="font-medium">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }
    return content;
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 252 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-screen flex flex-col relative overflow-hidden flex-shrink-0 border-r border-sidebar-border"
      style={{ background: "hsl(var(--sidebar-bg))" }}
    >
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-0 w-full h-48 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 0%, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(var(--sidebar-bg)) 0%, transparent 100%)" }} />

      {/* Logo / Workspace */}
      <div className="px-3 pt-4 pb-2 relative z-10">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="w-full flex items-center justify-center py-2 rounded-lg hover:bg-sidebar-hover/60 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 12px -2px hsl(var(--primary) / 0.3)" }}>
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={12}>
              <p className="font-semibold">{workspaces[activeWs].name}</p>
              <p className="text-xs text-muted-foreground">{workspaces[activeWs].plan}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <>
            <button
              onClick={() => setWsOpen(!wsOpen)}
              className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-sidebar-hover/60 transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105" style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 12px -2px hsl(var(--primary) / 0.3)" }}>
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-[13px] font-semibold text-sidebar-fg-active truncate leading-tight">{workspaces[activeWs].name}</div>
                <div className="text-[11px] text-sidebar-fg/70 truncate leading-tight mt-0.5">{workspaces[activeWs].plan}</div>
              </div>
              <motion.div animate={{ rotate: wsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-3.5 h-3.5 text-sidebar-fg/50 flex-shrink-0" />
              </motion.div>
            </button>

            <AnimatePresence>
              {wsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-1.5 rounded-lg overflow-hidden" style={{ background: "hsl(var(--sidebar-hover) / 0.5)", border: "1px solid hsl(var(--sidebar-border))" }}>
                    {workspaces.map((ws, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-sidebar-hover/80"
                        onClick={() => setWsOpen(false)}
                      >
                        <div className="w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-bold text-sidebar-fg-active flex-shrink-0" style={{ background: "hsl(var(--primary) / 0.15)" }}>
                          {ws.name[0]}
                        </div>
                        <span className="text-[13px] text-sidebar-fg-active">{ws.name}</span>
                        {i === activeWs && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.5)]" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* New Ingestion CTA */}
      <div className="px-3 mb-1 relative z-10">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => navigate("/ingestions/new")}
                className="w-full flex items-center justify-center py-2.5 rounded-lg transition-all duration-200 group"
                style={{ background: "var(--gradient-primary)", boxShadow: "0 2px 8px -2px hsl(var(--primary) / 0.4)" }}
              >
                <Plus className="w-4 h-4 text-primary-foreground transition-transform duration-200 group-hover:rotate-90" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={12}>
              New Ingestion
            </TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={() => navigate("/ingestions/new")}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 group hover:-translate-y-px"
            style={{ background: "var(--gradient-primary)", color: "hsl(var(--primary-foreground))", boxShadow: "0 2px 8px -2px hsl(var(--primary) / 0.4)" }}
          >
            <Plus className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:rotate-90" />
            <span>New Ingestion</span>
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="mx-3 my-2 relative z-10">
        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, hsl(var(--sidebar-border)), transparent)" }} />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto relative z-10">
        {!collapsed && (
          <div className="px-3 pt-1 pb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-sidebar-fg/40">Main</span>
          </div>
        )}
        <div className="space-y-0.5">
          {mainNav.map(renderNavItem)}
        </div>

        {/* Section divider */}
        <div className="my-3">
          <div className="h-px" style={{ background: "linear-gradient(to right, transparent, hsl(var(--sidebar-border) / 0.5), transparent)" }} />
        </div>

        {!collapsed && (
          <div className="px-3 pt-0.5 pb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-sidebar-fg/40">System</span>
          </div>
        )}
        <div className="space-y-0.5">
          {systemNav.map(renderNavItem)}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div className="px-3 py-1.5 relative z-10">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onToggle}
                className="w-full flex items-center justify-center py-2 rounded-lg text-sidebar-fg/50 hover:text-sidebar-fg-active hover:bg-sidebar-hover/60 transition-all duration-200"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={12}>Expand</TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={onToggle}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-fg/50 hover:text-sidebar-fg-active hover:bg-sidebar-hover/60 transition-all duration-200 text-[13px]"
          >
            <ChevronsLeft className="w-4 h-4 flex-shrink-0" />
            <span>Collapse</span>
          </button>
        )}
      </div>

      {/* User Profile */}
      <div className="p-3 relative z-10" style={{ borderTop: "1px solid hsl(var(--sidebar-border) / 0.5)" }}>
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-full flex items-center justify-center py-1 rounded-lg hover:bg-sidebar-hover/60 transition-all duration-200 group">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-primary-foreground relative transition-transform duration-200 group-hover:scale-110" style={{ background: "var(--gradient-primary)" }}>
                  JD
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2" style={{ background: "hsl(var(--success))", borderColor: "hsl(var(--sidebar-bg))" }} />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={12}>
              <p className="font-semibold">John Doe</p>
              <p className="text-xs text-muted-foreground">john@acme.com</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <button className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-sidebar-hover/60 transition-all duration-200 group text-left">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-primary-foreground relative flex-shrink-0" style={{ background: "var(--gradient-primary)" }}>
              JD
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2" style={{ background: "hsl(var(--success))", borderColor: "hsl(var(--sidebar-bg))" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-sidebar-fg-active truncate leading-tight">John Doe</div>
              <div className="text-[11px] text-sidebar-fg/60 truncate leading-tight mt-0.5">john@acme.com</div>
            </div>
            <LogOut className="w-3.5 h-3.5 text-sidebar-fg/30 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:text-sidebar-fg" />
          </button>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
