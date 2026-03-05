import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string | number;
  variant?: "default" | "success" | "warning" | "danger";
}

interface PageStatsBarProps {
  stats: StatItem[];
  className?: string;
}

const PageStatsBar = ({ stats, className }: PageStatsBarProps) => {
  const getValueClassName = (variant?: StatItem["variant"]) => {
    switch (variant) {
      case "success":
        return "text-green-600 dark:text-green-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "danger":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-foreground";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4 md:gap-6 px-4 py-3 bg-muted/30 rounded-lg border border-border/50",
        className
      )}
    >
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {stat.label}:
          </span>
          <span
            className={cn(
              "text-sm font-semibold whitespace-nowrap",
              getValueClassName(stat.variant)
            )}
          >
            {stat.value}
          </span>
          {index < stats.length - 1 && (
            <span className="hidden md:block text-border ml-2">|</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default PageStatsBar;
