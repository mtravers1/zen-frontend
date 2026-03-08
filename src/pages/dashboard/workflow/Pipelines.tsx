import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { GitBranch, Plus, Store, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Pipeline = { id: number; name: string; stages: string[]; jobs: number };

const WorkflowPipelinesPage = () => {
  const router = useRouter();
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: 1, name: "CFO Client Workflow", jobs: 89,
      stages: ["Receive Client Documents", "Bookkeeping Transactions", "Journal Entries", "Account Reconciliations", "Monthly Reporting"],
    },
    {
      id: 2, name: "Tax Client Workflow", jobs: 156,
      stages: ["Receive Client Documents", "Prepare Tax File", "Prepare Tax Return", "Customer Review", "Adjustments", "Manager Review", "Final Delivery to Customer", "E-File Tax Return"],
    },
    {
      id: 3, name: "Audit Pipeline", jobs: 23,
      stages: ["Planning", "Fieldwork", "Draft Report", "Management Review", "Client Review", "Final Report", "Follow-up"],
    },
    {
      id: 4, name: "Payroll Pipeline", jobs: 45,
      stages: ["Collect Timesheets", "Process Payroll", "Review & Approve", "Distribute"],
    },
    {
      id: 5, name: "Advisory Pipeline", jobs: 12,
      stages: ["Initial Consultation", "Analysis", "Strategy Development", "Presentation", "Implementation", "Follow-up"],
    },
  ]);
  const [viewPipeline, setViewPipeline] = useState<Pipeline | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingPipeline, setEditingPipeline] = useState<Pipeline | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreate = () => {
    if (!newName.trim()) return;
    const id = Math.max(0, ...pipelines.map(p => p.id)) + 1;
    setPipelines(prev => [...prev, { id, name: newName.trim(), stages: ["Stage 1"], jobs: 0 }]);
    toast.success(`Pipeline "${newName.trim()}" created`);
    setNewName("");
    setNewOpen(false);
  };

  const handleEditSave = () => {
    if (!editingPipeline || !editName.trim()) return;
    setPipelines(prev => prev.map(p => p.id === editingPipeline.id ? { ...p, name: editName.trim() } : p));
    toast.success(`Pipeline renamed to "${editName.trim()}"`);
    setEditingPipeline(null);
  };

  return (
    <>
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<GitBranch className="w-5 h-5 text-primary" />}
          title="Pipelines"
          description="Manage workflow pipelines and stages"
        />

        <div className="flex items-center gap-2">
          <Button onClick={() => setNewOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New pipeline
          </Button>
          <Button variant="outline" onClick={() => router.push("/dashboard/templates/marketplace")}>
            <Store className="w-4 h-4 mr-2" />
            Get from Marketplace
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {pipelines.map((pipeline) => (
                <div
                  key={pipeline.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => setViewPipeline(pipeline)}
                >
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-primary hover:underline">
                        {pipeline.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {pipeline.stages.length} stages • {pipeline.jobs} active jobs
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" onClick={() => { setEditingPipeline(pipeline); setEditName(pipeline.name); }}>Edit</Button>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Detail Dialog */}
        <Dialog open={!!viewPipeline} onOpenChange={o => { if (!o) setViewPipeline(null); }}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader><DialogTitle className="flex items-center gap-2"><GitBranch className="w-5 h-5" />{viewPipeline?.name}</DialogTitle></DialogHeader>
            <div className="space-y-2 py-2">
              <p className="text-sm text-muted-foreground mb-4">{viewPipeline?.stages.length} stages • {viewPipeline?.jobs} active jobs</p>
              {viewPipeline?.stages.map((stage, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">{i + 1}</div>
                  <div className="flex-1 p-2 rounded-md bg-muted text-sm font-medium">{stage}</div>
                  {i < (viewPipeline.stages.length - 1) && <ChevronRight className="w-4 h-4 text-muted-foreground hidden" />}
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewPipeline(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>New Pipeline</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <Label>Pipeline Name</Label>
            <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Tax Return Pipeline" onKeyDown={e => e.key === "Enter" && handleCreate()} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!newName.trim()}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingPipeline} onOpenChange={o => { if (!o) setEditingPipeline(null); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Pipeline</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <Label>Pipeline Name</Label>
            <Input value={editName} onChange={e => setEditName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleEditSave()} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPipeline(null)}>Cancel</Button>
            <Button onClick={handleEditSave} disabled={!editName.trim()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkflowPipelinesPage;
