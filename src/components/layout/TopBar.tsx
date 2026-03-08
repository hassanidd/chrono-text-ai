import { Search, Bell, ChevronRight } from "lucide-react";

interface TopBarProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

const TopBar = ({ title, breadcrumbs, actions }: TopBarProps) => {
  return (
    <header className="h-14 min-h-[3.5rem] bg-card border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-1.5 text-sm">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                <span className={i === breadcrumbs.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground cursor-pointer"}>
                  {crumb.label}
                </span>
              </span>
            ))}
          </div>
        )}
        {!breadcrumbs && <h1 className="text-sm font-semibold">{title}</h1>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg text-sm text-muted-foreground w-64">
          <Search className="w-4 h-4" />
          <span>Search everything...</span>
          <kbd className="ml-auto text-xs bg-background px-1.5 py-0.5 rounded border">⌘K</kbd>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {actions}
      </div>
    </header>
  );
};

export default TopBar;
