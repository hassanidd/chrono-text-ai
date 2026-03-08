import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export type StepState = "completed" | "current" | "pending" | "paused";

interface Step {
  label: string;
  state: StepState;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  className?: string;
}

const StepIndicator = ({ steps, className }: StepIndicatorProps) => {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {steps.map((step, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <motion.div
              initial={false}
              animate={{
                scale: step.state === "current" ? 1.1 : 1,
              }}
              transition={{ type: "spring", bounce: 0.4 }}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                step.state === "completed" && "border-primary text-primary-foreground",
                step.state === "current" && "bg-primary/10 border-primary text-primary shadow-glow",
                step.state === "pending" && "bg-muted border-border text-muted-foreground",
                step.state === "paused" && "bg-warning/10 border-warning text-warning",
              )}
              style={step.state === "completed" ? { background: "var(--gradient-primary)" } : undefined}
            >
              {step.state === "completed" ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}>
                  <Check className="w-4 h-4" />
                </motion.div>
              ) : (
                i + 1
              )}
            </motion.div>
            <span className={cn(
              "text-[11px] mt-1.5 whitespace-nowrap font-medium transition-colors duration-200",
              step.state === "current" ? "text-primary" :
              step.state === "completed" ? "text-foreground" : "text-muted-foreground"
            )}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-3 mt-[-1rem] bg-border rounded-full overflow-hidden">
              <motion.div
                initial={false}
                animate={{ width: step.state === "completed" ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ background: "var(--gradient-primary)" }}
                className="h-full rounded-full"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
