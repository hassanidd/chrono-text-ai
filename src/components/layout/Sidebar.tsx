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

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Database, label: "Datasets", path: "/datasets" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: Zap, label: "Ingestions", path: "/ingestions", badge: "3" },
  { icon: Search, label: "Retrieval Test", path: "/retrieval" },
  { icon: Cpu, label: "Models", path: "/models" },
  { icon: HardDrive, label: "Vector Store", path: "/vector-store" },
  { icon: Activity, label: "Activity", path: "/activity" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const workspaces = [
  { name: "Acme Corp", plan: "Enterprise" },
  { name: "Personal", plan: "Pro" },
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

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 248 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="h-screen flex flex-col border-r border-sidebar-border relative overflow-hidden flex-shrink-0"
      style={{ background: "var(--gradient-sidebar)" }}
    >
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Workspace Switcher */}
      <div className="p-3 relative z-10">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => !collapsed && setWsOpen(!wsOpen)}
                className="w-full flex items-center justify-center py-2.5 rounded-xl hover:bg-sidebar-hover transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-glow transition-transform duration-200 group-hover:scale-105" style={{ background: "var(--gradient-primary)" }}>
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              <p className="font-semibold">{workspaces[activeWs].name}</p>
              <p className="text-xs text-muted-foreground">{workspaces[activeWs].plan}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <>
            <button
              onClick={() => setWsOpen(!wsOpen)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sidebar-hover transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-glow transition-transform duration-200 group-hover:scale-105 flex-shrink-0" style={{ background: "var(--gradient-primary)" }}>
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-sm font-semibold text-sidebar-fg-active truncate">{workspaces[activeWs].name}</div>
                <div className="text-[11px] text-sidebar-fg truncate">{workspaces[activeWs].plan}</div>
              </div>
              <ChevronDown className={`w-4 h-4 text-sidebar-fg transition-transform duration-200 flex-shrink-0 ${wsOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {wsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-1 bg-sidebar-hover rounded-xl border border-sidebar-border overflow-hidden">
                    {workspaces.map((ws, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-sidebar-bg/50 transition-colors"
                        onClick={() => setWsOpen(false)}
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
                          {ws.name[0]}
                        </div>
                        <span className="text-sm text-sidebar-fg-active">{ws.name}</span>
                        {i === activeWs && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
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
      <div className="px-3 mb-3 relative z-10">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => navigate("/ingestions/new")}
                className="btn-primary w-full flex items-center justify-center !rounded-xl !px-0 !py-2.5"
              >
                <Plus className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              New Ingestion
            </TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={() => navigate("/ingestions/new")}
            className="btn-primary w-full flex items-center justify-center gap-2 !rounded-xl"
          >
            <Plus className="w-4 h-4 flex-shrink-0" />
            <span>New Ingestion</span>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto relative z-10">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          const button = (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center ${collapsed ? "justify-center" : ""} gap-3 ${collapsed ? "px-0 py-2.5" : "px-3 py-2"} rounded-xl text-[13px] font-medium transition-all duration-200 relative group ${
                isActive
                  ? "text-sidebar-fg-active"
                  : "text-sidebar-fg hover:text-sidebar-fg-active"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-sidebar-hover rounded-xl"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              {!isActive && (
                <div className="absolute inset-0 bg-sidebar-hover rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              )}
              <item.icon className={`w-[18px] h-[18px] relative z-10 transition-colors duration-200 flex-shrink-0 ${isActive ? "text-primary-glow" : ""}`} />
              {!collapsed && (
                <>
                  <span className="relative z-10 truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto relative z-10 text-[10px] font-bold bg-primary/20 text-primary-foreground px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-1 right-1 z-10 w-2 h-2 rounded-full bg-primary" />
              )}
            </button>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  {button}
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return button;
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="px-3 py-2 relative z-10">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sidebar-fg hover:text-sidebar-fg-active hover:bg-sidebar-hover transition-all duration-200 text-[13px]"
        >
          {collapsed ? (
            <ChevronsRight className="w-4 h-4 flex-shrink-0" />
          ) : (
            <>
              <ChevronsLeft className="w-4 h-4 flex-shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom - User */}
      <div className="p-3 border-t border-sidebar-border relative z-10">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center py-1 rounded-xl hover:bg-sidebar-hover transition-all duration-200 cursor-pointer">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground relative" style={{ background: "var(--gradient-primary)" }}>
                  JD
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-sidebar-bg" />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              <p className="font-semibold">John Doe</p>
              <p className="text-xs text-muted-foreground">john@acme.com</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-sidebar-hover transition-all duration-200 cursor-pointer group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground relative flex-shrink-0" style={{ background: "var(--gradient-primary)" }}>
              JD
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-sidebar-bg" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-sidebar-fg-active truncate">John Doe</div>
              <div className="text-[11px] text-sidebar-fg truncate">john@acme.com</div>
            </div>
            <LogOut className="w-4 h-4 text-sidebar-fg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
