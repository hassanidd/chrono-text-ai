import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MobileSidebar from "./MobileSidebar";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

const AppLayout = ({ children, title, breadcrumbs, actions }: AppLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {isMobile ? (
        <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />
      ) : (
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      )}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopBar
          title={title}
          breadcrumbs={breadcrumbs}
          actions={actions}
          sidebarCollapsed={collapsed}
          onToggleSidebar={isMobile ? () => setMobileOpen(true) : () => setCollapsed(!collapsed)}
          isMobile={isMobile}
        />
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="p-4 md:p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
