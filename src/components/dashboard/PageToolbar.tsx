import { useState } from "react";
import { Search, Filter, Download, Printer, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PresetOption {
  value: string;
  label: string;
}

interface PageToolbarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  presets?: PresetOption[];
  selectedPreset?: string;
  onPresetChange?: (value: string) => void;
  showFilter?: boolean;
  onFilterClick?: () => void;
  filterOpen?: boolean;
  filterContent?: React.ReactNode;
  showExport?: boolean;
  onExportClick?: () => void;
  showPrint?: boolean;
  onPrintClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const PageToolbar = ({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  presets,
  selectedPreset,
  onPresetChange,
  showFilter = false,
  onFilterClick,
  filterOpen,
  filterContent,
  showExport = false,
  onExportClick,
  showPrint = false,
  onPrintClick,
  className,
  children,
}: PageToolbarProps) => {
  const [internalFilterOpen, setInternalFilterOpen] = useState(false);
  const isFilterOpen = filterOpen !== undefined ? filterOpen : internalFilterOpen;

  const handleFilterClick = () => {
    if (onFilterClick) {
      onFilterClick();
    } else if (filterContent) {
      setInternalFilterOpen(!internalFilterOpen);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {presets && presets.length > 0 && (
            <Select value={selectedPreset} onValueChange={onPresetChange}>
              <SelectTrigger className="w-[140px] h-9 bg-background">
                <SelectValue placeholder="Presets" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                {presets.map((preset) => (
                  <SelectItem key={preset.value} value={preset.value}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {showFilter && (
            <Button
              variant={isFilterOpen ? "default" : "outline"}
              size="sm"
              onClick={handleFilterClick}
              className="h-9"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
              {filterContent && (isFilterOpen ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />)}
            </Button>
          )}

          {children}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onSearchChange && (
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="pl-9 h-9"
              />
            </div>
          )}

          {showExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExportClick}
              className="h-9"
            >
              <Download className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          )}

          {showPrint && (
            <Button
              variant="outline"
              size="sm"
              onClick={onPrintClick}
              className="h-9"
            >
              <Printer className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Print</span>
            </Button>
          )}
        </div>
      </div>

      {showFilter && filterContent && isFilterOpen && (
        <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
          {filterContent}
        </div>
      )}
    </div>
  );
};

export default PageToolbar;
