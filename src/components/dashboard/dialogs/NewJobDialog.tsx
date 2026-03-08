import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (job: { name: string; account: string; assignee: string; pipeline: string; priority: string; startDate: string; dueDate: string }) => void;
}

const NewJobDialog = ({ open, onOpenChange, onSubmit }: NewJobDialogProps) => {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [assignee, setAssignee] = useState("");
  const [pipeline, setPipeline] = useState("Tax Returns");
  const [priority, setPriority] = useState("medium");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), account: account.trim(), assignee: assignee.trim() || "Unassigned", pipeline, priority, startDate: startDate || new Date().toISOString().split("T")[0], dueDate: dueDate || "" });
    setName(""); setAccount(""); setAssignee(""); setPipeline("Tax Returns"); setPriority("medium"); setStartDate(""); setDueDate("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>New Job</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Job Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter job name" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Account</Label><Input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Account name" /></div>
            <div className="space-y-2"><Label>Assignee</Label><Input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="Assignee name" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Pipeline</Label>
              <Select value={pipeline} onValueChange={setPipeline}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Tax Returns">Tax Returns</SelectItem><SelectItem value="Audits">Audits</SelectItem><SelectItem value="Bookkeeping">Bookkeeping</SelectItem><SelectItem value="Payroll">Payroll</SelectItem></SelectContent></Select>
            </div>
            <div className="space-y-2"><Label>Priority</Label>
              <Select value={priority} onValueChange={setPriority}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="high">High</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="low">Low</SelectItem></SelectContent></Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Start Date</Label><Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
            <div className="space-y-2"><Label>Due Date</Label><Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></div>
          </div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={handleSubmit} disabled={!name.trim()}>Create Job</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewJobDialog;
