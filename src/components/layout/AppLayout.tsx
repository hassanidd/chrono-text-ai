import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { motion } from "framer-motion";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

const AppLayout = ({ children, title, breadcrumbs, actions }: AppLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title={title} breadcrumbs={breadcrumbs} actions={actions} />
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
