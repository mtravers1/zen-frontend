import { Search, Filter, Download, Printer } from "lucide-react";
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
  showExport = false,
  onExportClick,
  showPrint = false,
  onPrintClick,
  className,
  children,
}: PageToolbarProps) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between",
        className
      )}
    >
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
            variant="outline"
            size="sm"
            onClick={onFilterClick}
            className="h-9"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
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
  );
};

export default PageToolbar;
