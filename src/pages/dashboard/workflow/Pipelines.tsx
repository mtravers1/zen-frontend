import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { GitBranch, Plus, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const WorkflowPipelinesPage = () => {
  const router = useRouter();
  const [pipelines, setPipelines] = useState([
    { id: 1, name: "Tax Return Pipeline", stages: 5, jobs: 156 },
    { id: 2, name: "Audit Pipeline", stages: 7, jobs: 23 },
    { id: 3, name: "Bookkeeping Pipeline", stages: 4, jobs: 89 },
    { id: 4, name: "Payroll Pipeline", stages: 3, jobs: 45 },
    { id: 5, name: "Advisory Pipeline", stages: 6, jobs: 12 },
  ]);
  const [newOpen, setNewOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingPipeline, setEditingPipeline] = useState<{ id: number; name: string } | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreate = () => {
    if (!newName.trim()) return;
    const id = Math.max(0, ...pipelines.map(p => p.id)) + 1;
    setPipelines(prev => [...prev, { id, name: newName.trim(), stages: 1, jobs: 0 }]);
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
                >
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-primary hover:underline">
                        {pipeline.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {pipeline.stages} stages • {pipeline.jobs} active jobs
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => { setEditingPipeline(pipeline); setEditName(pipeline.name); }}>Edit</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
