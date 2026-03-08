import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
              step.state === "completed" && "bg-primary border-primary text-primary-foreground",
              step.state === "current" && "bg-primary/10 border-primary text-primary",
              step.state === "pending" && "bg-muted border-border text-muted-foreground",
              step.state === "paused" && "bg-warning/10 border-warning text-warning",
            )}>
              {step.state === "completed" ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={cn(
              "text-xs mt-1.5 whitespace-nowrap font-medium",
              step.state === "current" ? "text-primary" : 
              step.state === "completed" ? "text-foreground" : "text-muted-foreground"
            )}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn(
              "flex-1 h-0.5 mx-3 mt-[-1rem]",
              step.state === "completed" ? "bg-primary" : "bg-border"
            )} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
