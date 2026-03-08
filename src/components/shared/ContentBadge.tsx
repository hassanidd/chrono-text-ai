import { cn } from "@/lib/utils";

type BadgeVariant = "text" | "table" | "ocr" | "image" | "mixed" | "transcript" | "default";

interface ContentBadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  text: "bg-primary/10 text-primary",
  table: "bg-success/10 text-success",
  ocr: "bg-warning/10 text-warning",
  image: "bg-accent text-accent-foreground",
  mixed: "bg-muted text-muted-foreground",
  transcript: "bg-primary/10 text-primary",
  default: "bg-muted text-muted-foreground",
};

const ContentBadge = ({ variant, className }: ContentBadgeProps) => {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
      variantStyles[variant],
      className
    )}>
      {variant}
    </span>
  );
};

export default ContentBadge;
