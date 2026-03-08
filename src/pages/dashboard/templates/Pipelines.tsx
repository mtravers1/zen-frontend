import { useState } from "react";
import { useRouter } from "next/navigation";
import { GitBranch, Plus, Store } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const PipelinesPage = () => {
  const router = useRouter();
  const [pipelines, setPipelines] = useState([
    { id: 1, name: "Client Onboarding", stages: 5 },
    { id: 2, name: "Tax Return Processing", stages: 8 },
    { id: 3, name: "Audit Workflow", stages: 6 },
    { id: 4, name: "Monthly Bookkeeping", stages: 4 },
  ]);
  const [newOpen, setNewOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingPipeline, setEditingPipeline] = useState<{ id: number; name: string } | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreate = () => {
    if (!newName.trim()) return;
    const id = Math.max(0, ...pipelines.map(p => p.id)) + 1;
    setPipelines(prev => [...prev, { id, name: newName.trim(), stages: 1 }]);
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
        <div className="flex items-center justify-between">
          <DashboardPageHeader
            title="Pipelines"
            description="Design and manage workflow pipelines"
            icon={<GitBranch className="w-6 h-6" />}
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/dashboard/templates/marketplace")}>
              <Store className="w-4 h-4 mr-2" />
              Get from Marketplace
            </Button>
            <Button onClick={() => setNewOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Pipeline
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {pipelines.map((pipeline) => (
            <Card key={pipeline.id} className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardHeader className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <GitBranch className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{pipeline.name}</CardTitle>
                      <CardDescription>{pipeline.stages} stages</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => { setEditingPipeline(pipeline); setEditName(pipeline.name); }}>Edit</Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>New Pipeline</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <Label>Pipeline Name</Label>
            <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Client Onboarding" onKeyDown={e => e.key === "Enter" && handleCreate()} />
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

export default PipelinesPage;
