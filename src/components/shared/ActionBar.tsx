import { cn } from "@/lib/utils";

interface ActionBarProps {
  children: React.ReactNode;
  className?: string;
}

const ActionBar = ({ children, className }: ActionBarProps) => {
  return (
    <div className={cn("action-bar", className)}>
      {children}
    </div>
  );
};

export default ActionBar;
