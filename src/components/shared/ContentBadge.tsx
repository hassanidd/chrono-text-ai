import { cn } from "@/lib/utils";

type BadgeVariant = "text" | "table" | "ocr" | "image" | "mixed" | "transcript" | "default";

interface ContentBadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  text: "bg-primary/8 text-primary border-primary/15",
  table: "bg-success/8 text-success border-success/15",
  ocr: "bg-warning/8 text-warning border-warning/15",
  image: "bg-accent text-accent-foreground border-accent-foreground/10",
  mixed: "bg-muted text-muted-foreground border-border",
  transcript: "bg-primary/8 text-primary border-primary/15",
  default: "bg-muted text-muted-foreground border-border",
};

const ContentBadge = ({ variant, className }: ContentBadgeProps) => {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border",
      variantStyles[variant],
      className
    )}>
      {variant}
    </span>
  );
};

export default ContentBadge;
