"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { documentFilterSchema, DocumentFilterValues } from "@/lib/dashboard-schemas";

const CLIENTS = [
  "Smith Corporation",
  "Johnson LLC",
  "Brown & Associates",
  "Wilson Group",
  "Davis Industries",
  "Emily Davis",
];

const FOLDERS = [
  "General",
  "Tax Returns",
  "Financial Statements",
  "Contracts",
  "Invoices",
  "Reports",
  "Organizers",
];

const DOCUMENT_TYPES = [
  "Tax Return",
  "Financial Statement",
  "Contract",
  "Invoice",
  "Report",
  "Organizer",
  "Other",
];

interface DocumentFilterPanelProps {
  onApply?: (filters: DocumentFilterValues) => void;
  onReset?: () => void;
  activeFilterCount?: number;
}

const DocumentFilterPanel = ({ onApply, onReset, activeFilterCount = 0 }: DocumentFilterPanelProps) => {
  const form = useForm<DocumentFilterValues>({
    resolver: zodResolver(documentFilterSchema),
    defaultValues: {
      type: "",
      client: "",
      folder: "",
      dateFrom: "",
      dateTo: "",
    },
  });

  const handleApply = (values: DocumentFilterValues) => {
    onApply?.(values);
  };

  const handleReset = () => {
    form.reset();
    onReset?.();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 relative">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filter
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[320px] sm:w-[380px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filter Documents
          </SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleApply)}
            className="flex flex-col gap-5 mt-6 flex-1"
          >
            {/* Document Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      {DOCUMENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Client */}
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="All clients" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All clients</SelectItem>
                      {CLIENTS.map((client) => (
                        <SelectItem key={client} value={client}>
                          {client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Folder */}
            <FormField
              control={form.control}
              name="folder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folder</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="All folders" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All folders</SelectItem>
                      {FOLDERS.map((folder) => (
                        <SelectItem key={folder} value={folder}>
                          {folder}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Date Range */}
            <div className="space-y-2">
              <FormLabel>Date Range (Uploaded)</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="dateFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">From</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">To</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <SheetFooter className="flex-col gap-2 mt-auto pt-4">
              <Button type="submit" className="w-full">
                Apply Filters
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleReset}
              >
                <X className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default DocumentFilterPanel;
