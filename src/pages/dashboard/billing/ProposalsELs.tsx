import { useState } from "react";
import { FileCheck, Plus, X, Sparkles } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import NewProposalDialog from "@/components/dashboard/dialogs/NewProposalDialog";

const initialProposals = [
  { id: 1, account: "Acme Corp", name: "Q1 Service Package", status: "sent", paymentMethod: "Credit Card", auth: true, invoicing: "Monthly", packages: 2, date: "2024-01-20", signed: false },
  { id: 2, account: "Tech Solutions", name: "Annual Retainer", status: "signed", paymentMethod: "ACH", auth: true, invoicing: "Quarterly", packages: 3, date: "2024-01-18", signed: true },
  { id: 3, account: "Global Industries", name: "Enterprise Deal", status: "draft", paymentMethod: "-", auth: false, invoicing: "-", packages: 5, date: "2024-01-22", signed: false },
  { id: 4, account: "StartUp Inc", name: "Starter Plan", status: "viewed", paymentMethod: "Credit Card", auth: true, invoicing: "Monthly", packages: 1, date: "2024-01-21", signed: false },
];

const presetOptions = [
  { value: "all", label: "All Proposals" }, { value: "pending", label: "Pending Signature" }, { value: "signed", label: "Signed" }, { value: "draft", label: "Drafts" },
];

const ProposalsELsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("all");
  const [showBanner, setShowBanner] = useState(true);
  const [proposals, setProposals] = useState(initialProposals);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getStatusBadge = (s: string) => { switch(s) { case "signed": return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Signed</Badge>; case "sent": return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Sent</Badge>; case "viewed": return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Viewed</Badge>; default: return <Badge variant="secondary">Draft</Badge>; } };

  const filtered = proposals.filter(p => {
    const matchesPreset = selectedPreset === "all" || (selectedPreset === "signed" && p.signed) || (selectedPreset === "draft" && p.status === "draft") || (selectedPreset === "pending" && !p.signed && p.status !== "draft");
    const matchesSearch = !searchValue || p.account.toLowerCase().includes(searchValue.toLowerCase()) || p.name.toLowerCase().includes(searchValue.toLowerCase());
    return matchesPreset && matchesSearch;
  });

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader title="Proposals & Engagement Letters" description="Create and manage client proposals" icon={<FileCheck className="w-6 h-6" />} />
          <Button onClick={() => setDialogOpen(true)}><Plus className="w-4 h-4 mr-2" />New Proposal & EL</Button>
        </div>
        {showBanner && (
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20"><CardContent className="p-4"><div className="flex items-start justify-between"><div className="flex items-start gap-3"><div className="p-2 bg-primary/10 rounded-lg"><Sparkles className="w-5 h-5 text-primary" /></div><div><h3 className="font-semibold text-foreground">Tiered Packages Available</h3><p className="text-sm text-muted-foreground mt-1">Create professional proposals with tiered pricing options.</p></div></div><Button variant="ghost" size="icon" onClick={() => setShowBanner(false)}><X className="w-4 h-4" /></Button></div></CardContent></Card>
        )}
        <PageToolbar searchValue={searchValue} onSearchChange={setSearchValue} searchPlaceholder="Search proposals..." presets={presetOptions} selectedPreset={selectedPreset} onPresetChange={setSelectedPreset} showFilter />
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader><TableRow><TableHead>Account</TableHead><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead>Payment Method</TableHead><TableHead className="text-center">Auth</TableHead><TableHead>Invoicing</TableHead><TableHead className="text-center">Packages</TableHead><TableHead>Date</TableHead><TableHead className="text-center">Signed</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id} className="cursor-pointer hover:bg-muted/50"><TableCell className="font-medium">{p.account}</TableCell><TableCell>{p.name}</TableCell><TableCell>{getStatusBadge(p.status)}</TableCell><TableCell>{p.paymentMethod}</TableCell><TableCell className="text-center">{p.auth ? "✓" : "-"}</TableCell><TableCell>{p.invoicing}</TableCell><TableCell className="text-center">{p.packages}</TableCell><TableCell>{p.date}</TableCell><TableCell className="text-center">{p.signed ? <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Yes</Badge> : <span className="text-muted-foreground">-</span>}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <NewProposalDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={(data) => {
        setProposals(prev => [...prev, { id: Date.now(), ...data, status: "draft", auth: false, date: new Date().toISOString().split("T")[0], signed: false }]);
        toast.success(`Proposal "${data.name}" created`);
      }} />
  );
};

export default ProposalsELsPage;
