import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface NewReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (report: { name: string; category: string; scheduled: boolean }) => void;
}

const NewReportDialog = ({ open, onOpenChange, onSubmit }: NewReportDialogProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Billing Reports");
  const [scheduled, setScheduled] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), category, scheduled });
    setName(""); setCategory("Billing Reports"); setScheduled(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Create Report</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Report Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter report name" /></div>
          <div className="space-y-2"><Label>Category</Label>
            <Select value={category} onValueChange={setCategory}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Billing Reports">Billing Reports</SelectItem><SelectItem value="Client Reports">Client Reports</SelectItem><SelectItem value="Productivity Reports">Productivity Reports</SelectItem><SelectItem value="Tax Reports">Tax Reports</SelectItem></SelectContent></Select>
          </div>
          <div className="flex items-center gap-2"><Switch checked={scheduled} onCheckedChange={setScheduled} /><Label>Schedule this report</Label></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={handleSubmit} disabled={!name.trim()}>Create Report</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewReportDialog;
