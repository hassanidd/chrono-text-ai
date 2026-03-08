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

const dotStyles: Record<Status, string> = {
  success: "bg-success shadow-[0_0_6px_hsl(152_60%_42%/0.5)]",
  warning: "bg-warning shadow-[0_0_6px_hsl(38_92%_50%/0.5)]",
  error: "bg-destructive shadow-[0_0_6px_hsl(0_72%_51%/0.5)]",
  info: "bg-primary shadow-[0_0_6px_hsl(238_70%_55%/0.5)]",
  neutral: "bg-muted-foreground",
  processing: "bg-primary shadow-[0_0_6px_hsl(238_70%_55%/0.5)]",
};

const StatusPill = ({ status, label, pulse, className }: StatusPillProps) => {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border tracking-wide",
      statusStyles[status],
      className
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        dotStyles[status],
        pulse && "animate-pulse-soft"
      )} />
      {label}
    </span>
  );
};

export default StatusPill;
