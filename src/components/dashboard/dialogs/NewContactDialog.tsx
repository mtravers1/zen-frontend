import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NewContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (contact: { name: string; account: string; role: string; email: string; phone: string; isPrimary: boolean }) => void;
}

const NewContactDialog = ({ open, onOpenChange, onSubmit }: NewContactDialogProps) => {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) return;
    onSubmit({ name: name.trim(), account: account.trim(), role: role.trim(), email: email.trim(), phone: phone.trim(), isPrimary });
    setName(""); setAccount(""); setRole(""); setEmail(""); setPhone(""); setIsPrimary(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>New Contact</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" /></div>
            <div className="space-y-2"><Label>Account</Label><Input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Account name" /></div>
          </div>
          <div className="space-y-2"><Label>Role</Label><Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. CEO, CFO" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Email *</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@example.com" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 000-0000" /></div>
          </div>
          <div className="flex items-center gap-2"><Switch checked={isPrimary} onCheckedChange={setIsPrimary} /><Label>Primary Contact</Label></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={handleSubmit} disabled={!name.trim() || !email.trim()}>Create Contact</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewContactDialog;
