import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (account: { name: string; type: string; email: string; phone: string; assignee: string }) => void;
}

const NewAccountDialog = ({ open, onOpenChange, onSubmit }: NewAccountDialogProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Business");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [assignee, setAssignee] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), type, email: email.trim(), phone: phone.trim(), assignee: assignee.trim() || "Unassigned" });
    setName(""); setType("Business"); setEmail(""); setPhone(""); setAssignee("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>New Account</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Account Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter account name" /></div>
          <div className="space-y-2"><Label>Type</Label>
            <Select value={type} onValueChange={setType}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Business">Business</SelectItem><SelectItem value="Individual">Individual</SelectItem></SelectContent></Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Email</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" type="email" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 000-0000" /></div>
          </div>
          <div className="space-y-2"><Label>Account Manager</Label><Input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="Assignee name" /></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={handleSubmit} disabled={!name.trim()}>Create Account</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountDialog;
