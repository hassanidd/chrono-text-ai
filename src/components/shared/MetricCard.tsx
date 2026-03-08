import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  className?: string;
  delay?: number;
}

const MetricCard = ({ label, value, change, changeType = "neutral", icon: Icon, className, delay = 0 }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={cn("card-glow p-5 group", className)}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold mt-1.5 text-foreground tracking-tight">{value}</p>
          {change && (
            <p className={cn(
              "text-xs font-medium mt-1.5",
              changeType === "positive" && "text-success",
              changeType === "negative" && "text-destructive",
              changeType === "neutral" && "text-muted-foreground",
            )}>
              {changeType === "positive" && "↑ "}{changeType === "negative" && "↓ "}{change}
            </p>
          )}
        </div>
        <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="w-5 h-5 text-accent-foreground" />
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
