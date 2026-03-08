import { cn } from "@/lib/utils";

type Status = "success" | "warning" | "error" | "info" | "neutral" | "processing";

interface StatusPillProps {
  status: Status;
  label: string;
  pulse?: boolean;
  className?: string;
}

const statusStyles: Record<Status, string> = {
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  error: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-primary/10 text-primary border-primary/20",
  neutral: "bg-muted text-muted-foreground border-border",
  processing: "bg-primary/10 text-primary border-primary/20",
};

const StatusPill = ({ status, label, pulse, className }: StatusPillProps) => {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
      statusStyles[status],
      className
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        status === "success" && "bg-success",
        status === "warning" && "bg-warning",
        status === "error" && "bg-destructive",
        status === "info" && "bg-primary",
        status === "neutral" && "bg-muted-foreground",
        status === "processing" && "bg-primary",
        pulse && "animate-pulse-soft"
      )} />
      {label}
    </span>
  );
};

export default StatusPill;
