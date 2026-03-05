import { cn } from "@/lib/utils";

interface Category {
  id: string;
  label: string;
}

const categories: Category[] = [
  { id: "all", label: "All Solutions" },
  { id: "digital", label: "Digital Tools" },
  { id: "cfo", label: "CFO Services" },
  { id: "formation", label: "Business Formation" },
  { id: "tax", label: "Tax Services" },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300",
            activeCategory === category.id
              ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
              : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50 hover:border-accent/30"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
