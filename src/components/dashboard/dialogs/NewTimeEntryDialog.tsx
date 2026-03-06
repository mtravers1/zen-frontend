import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NewTimeEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (entry: { name: string; assignee: string; service: string; duration: string; date: string; billable: boolean }) => void;
}

const NewTimeEntryDialog = ({ open, onOpenChange, onSubmit }: NewTimeEntryDialogProps) => {
  const [name, setName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [service, setService] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [billable, setBillable] = useState(true);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), assignee: assignee.trim() || "Unassigned", service: service.trim() || "General", duration: duration || "0:00", date: date || new Date().toISOString().split("T")[0], billable });
    setName(""); setAssignee(""); setService(""); setDuration(""); setDate(""); setBillable(true);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>New Time Entry</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Description *</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="What did you work on?" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Assignee</Label><Input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="Name" /></div>
            <div className="space-y-2"><Label>Service</Label><Input value={service} onChange={(e) => setService(e.target.value)} placeholder="e.g. Consulting" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Duration (h:mm)</Label><Input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="1:30" /></div>
            <div className="space-y-2"><Label>Date</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
          </div>
          <div className="flex items-center gap-2"><Switch checked={billable} onCheckedChange={setBillable} /><Label>Billable</Label></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={handleSubmit} disabled={!name.trim()}>Add Entry</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewTimeEntryDialog;
