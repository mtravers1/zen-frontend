import { useState } from "react";
import { LayoutTemplate, Plus, Copy, X, Sparkles } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import NewTemplateDialog from "@/components/dashboard/dialogs/NewTemplateDialog";
import { toast } from "sonner";

const templateTabs = [
  { value: "proposals", label: "Proposals & ELs" },
  { value: "jobs", label: "Jobs" },
  { value: "statuses", label: "Client-facing job statuses" },
  { value: "tasks", label: "Tasks" },
  { value: "organizers", label: "Organizers" },
  { value: "requests", label: "Client requests" },
  { value: "chats", label: "Chats" },
  { value: "emails", label: "Emails" },
  { value: "sms", label: "SMS" },
  { value: "invoices", label: "Invoices" },
  { value: "recurring", label: "Recurring invoices" },
  { value: "signatures", label: "Signatures" },
  { value: "folders", label: "Folders" },
];

const initialTemplates: Record<string, Array<{ id: number; name: string; description: string; lastModified: string }>> = {
  proposals: [
    { id: 1, name: "Standard Proposal", description: "Basic service proposal template", lastModified: "2024-01-15" },
    { id: 2, name: "Enterprise Package", description: "Multi-tier enterprise proposal", lastModified: "2024-01-10" },
  ],
  jobs: [
    { id: 1, name: "Tax Return Job", description: "Standard tax return workflow", lastModified: "2024-01-18" },
    { id: 2, name: "Audit Preparation", description: "Annual audit prep template", lastModified: "2024-01-12" },
  ],
  emails: [
    { id: 1, name: "Welcome Email", description: "New client onboarding email", lastModified: "2024-01-20" },
    { id: 2, name: "Invoice Reminder", description: "Payment reminder template", lastModified: "2024-01-14" },
  ],
};

const FirmTemplatesPage = () => {
  const [activeTab, setActiveTab] = useState("proposals");
  const [searchValue, setSearchValue] = useState("");
  const [showBanner, setShowBanner] = useState(true);
  const [templates, setTemplates] = useState(initialTemplates);
  const [dialogOpen, setDialogOpen] = useState(false);

  const currentTemplates = templates[activeTab] || [];
  const filteredTemplates = currentTemplates.filter((t) =>
    t.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    t.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader
            title="Firm Templates"
            description="Manage reusable templates for your firm"
            icon={<LayoutTemplate className="w-6 h-6" />}
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.info("Copying from library...")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy from Library
            </Button>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>
        </div>

        {showBanner && (
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Tiered Package Templates</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create proposals with multiple service tiers to give clients flexible pricing options.
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowBanner(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto">
            <TabsList variant="underline" className="w-max">
              {templateTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} variant="underline">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="mt-6">
            <PageToolbar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              searchPlaceholder="Search templates..."
            />
          </div>

          {templateTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-4">
              <div className="border rounded-lg bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Last Modified</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTemplates.length > 0 ? (
                      filteredTemplates.map((template) => (
                        <TableRow key={template.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell className="text-muted-foreground">{template.description}</TableCell>
                          <TableCell>{template.lastModified}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                          No templates found. Create one to get started.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <NewTemplateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        categories={templateTabs.map(t => ({ value: t.value, label: t.label }))}
        defaultCategory={activeTab}
        onSubmit={(data) => {
          setTemplates(prev => ({
            ...prev,
            [data.category]: [...(prev[data.category] || []), { id: Date.now(), name: data.name, description: data.description, lastModified: new Date().toISOString().split("T")[0] }],
          }));
          toast.success(`Template "${data.name}" created`);
        }}
      />
  );
};

export default FirmTemplatesPage;
