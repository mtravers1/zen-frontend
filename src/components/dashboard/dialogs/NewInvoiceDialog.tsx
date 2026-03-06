import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NewInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (invoice: { account: string; amount: number; dueDate: string; assignee: string }) => void;
}

const NewInvoiceDialog = ({ open, onOpenChange, onSubmit }: NewInvoiceDialogProps) => {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");

  const handleSubmit = () => {
    if (!account.trim() || !amount) return;
    onSubmit({ account: account.trim(), amount: parseFloat(amount), dueDate: dueDate || new Date().toISOString().split("T")[0], assignee: assignee.trim() || "Unassigned" });
    setAccount(""); setAmount(""); setDueDate(""); setAssignee("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>New Invoice</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Account *</Label><Input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Account name" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Amount *</Label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" min="0" step="0.01" /></div>
            <div className="space-y-2"><Label>Due Date</Label><Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></div>
          </div>
          <div className="space-y-2"><Label>Assignee</Label><Input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="Assignee name" /></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={handleSubmit} disabled={!account.trim() || !amount}>Create Invoice</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewInvoiceDialog;
