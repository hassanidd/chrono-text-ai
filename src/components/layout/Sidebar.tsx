import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Database, FileText, Zap, Search, Cpu, HardDrive,
  Activity, Settings, ChevronDown, Plus, Sparkles
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Database, label: "Datasets", path: "/datasets" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: Zap, label: "Ingestions", path: "/ingestions" },
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

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [wsOpen, setWsOpen] = useState(false);
  const [activeWs] = useState(0);

  return (
    <aside className="w-[240px] min-w-[240px] h-screen bg-sidebar-bg flex flex-col border-r border-sidebar-border">
      {/* Workspace Switcher */}
      <div className="p-3">
        <button
          onClick={() => setWsOpen(!wsOpen)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-hover transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-semibold text-sidebar-fg-active">{workspaces[activeWs].name}</div>
            <div className="text-xs text-sidebar-fg">{workspaces[activeWs].plan}</div>
          </div>
          <ChevronDown className="w-4 h-4 text-sidebar-fg" />
        </button>
        {wsOpen && (
          <div className="mt-1 bg-sidebar-hover rounded-lg border border-sidebar-border overflow-hidden">
            {workspaces.map((ws, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-sidebar-bg/50 transition-colors"
                onClick={() => setWsOpen(false)}
              >
                <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {ws.name[0]}
                </div>
                <span className="text-sm text-sidebar-fg-active">{ws.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* New Ingestion CTA */}
      <div className="px-3 mb-2">
        <button
          onClick={() => navigate("/ingestions/new")}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Ingestion
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-hover text-sidebar-fg-active"
                  : "text-sidebar-fg hover:bg-sidebar-hover hover:text-sidebar-fg-active"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.label === "Ingestions" && (
                <span className="ml-auto text-xs bg-primary/20 text-primary-foreground px-1.5 py-0.5 rounded-full">3</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold text-sidebar-fg-active">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-sidebar-fg-active truncate">John Doe</div>
            <div className="text-xs text-sidebar-fg truncate">john@acme.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
