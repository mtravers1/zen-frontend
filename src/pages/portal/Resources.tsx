import { useState } from "react";
import ClientPortalLayout from "@/components/portal/ClientPortalLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, BookOpen, Library, FileText, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const resources = [
  { id: 1, title: "New Client Onboarding Checklist", category: "onboarding", type: "PDF", description: "Everything you need before your first meeting.", icon: "📋" },
  { id: 2, title: "Tax Preparation Document List", category: "tax", type: "PDF", description: "Documents needed for personal and business tax returns.", icon: "📄" },
  { id: 3, title: "Business Entity Comparison Guide", category: "business", type: "Guide", description: "Compare LLC, S-Corp, C-Corp structures.", icon: "🏢" },
  { id: 4, title: "Quarterly Financial Review Template", category: "financial", type: "Template", description: "Template for quarterly business financial reviews.", icon: "📊" },
  { id: 5, title: "Expense Categorization Guide", category: "tax", type: "Guide", description: "Properly categorize business expenses for taxes.", icon: "🧾" },
  { id: 6, title: "Cash Flow Management Handbook", category: "financial", type: "eBook", description: "Strategies for improving business cash flow.", icon: "💰" },
  { id: 7, title: "Employee vs Contractor Checklist", category: "compliance", type: "PDF", description: "Determine proper worker classification.", icon: "👥" },
  { id: 8, title: "Year-End Tax Planning Guide", category: "tax", type: "Guide", description: "Strategies to minimize tax liability.", icon: "📅" },
  { id: 9, title: "Data Security Best Practices", category: "compliance", type: "PDF", description: "How we protect your data.", icon: "🔒" },
  { id: 10, title: "QuickBooks Integration Setup", category: "integrations", type: "Guide", description: "Connect QuickBooks to Zentavos step by step.", icon: "🔗" },
  { id: 11, title: "Platform Configuration Documentation", category: "onboarding", type: "PDF", description: "Your custom configuration details and settings.", icon: "⚙️" },
  { id: 12, title: "Webinar: 2024 Tax Law Updates", category: "webinar", type: "Recording", description: "Recent tax law changes that may affect your business.", icon: "🎥" },
];

const categories = [
  { value: "all", label: "All" },
  { value: "onboarding", label: "Onboarding" },
  { value: "tax", label: "Tax" },
  { value: "financial", label: "Financial" },
  { value: "compliance", label: "Compliance" },
  { value: "webinar", label: "Webinars" },
];

const PortalResources = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = resources.filter(r => {
    const matchesSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || r.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <ClientPortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Library className="w-6 h-6 text-primary" />Resource Center
          </h1>
          <p className="text-muted-foreground">Guides, templates, and educational materials to support your business.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources..." className="pl-9 h-9" />
          </div>
          <Tabs value={category} onValueChange={setCategory}>
            <TabsList>
              {categories.map(c => (
                <TabsTrigger key={c.value} value={c.value} className="text-xs">{c.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-3">
          {filtered.map(resource => (
            <Card key={resource.id} className="border border-border hover:shadow-sm transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="text-3xl shrink-0">{resource.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm">{resource.title}</h3>
                    <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{resource.description}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => toast.success(`Downloading "${resource.title}"...`)}>
                  <Download className="w-4 h-4 mr-2" />Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No resources found.</p>
          </div>
        )}
      </div>
    </ClientPortalLayout>
  );
};

export default PortalResources;
