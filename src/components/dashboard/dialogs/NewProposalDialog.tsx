import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewProposalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (proposal: { account: string; name: string; paymentMethod: string; invoicing: string; packages: number }) => void;
}

const NewProposalDialog = ({ open, onOpenChange, onSubmit }: NewProposalDialogProps) => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [invoicing, setInvoicing] = useState("Monthly");
  const [packages, setPackages] = useState("1");

  const handleSubmit = () => {
    if (!account.trim() || !name.trim()) return;
    onSubmit({ account: account.trim(), name: name.trim(), paymentMethod, invoicing, packages: parseInt(packages) || 1 });
    setAccount(""); setName(""); setPaymentMethod("Credit Card"); setInvoicing("Monthly"); setPackages("1");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>New Proposal & EL</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Account *</Label><Input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Account name" /></div>
            <div className="space-y-2"><Label>Proposal Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Q1 Service Package" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Credit Card">Credit Card</SelectItem><SelectItem value="ACH">ACH</SelectItem><SelectItem value="Invoice">Invoice</SelectItem></SelectContent></Select>
            </div>
            <div className="space-y-2"><Label>Invoicing</Label>
              <Select value={invoicing} onValueChange={setInvoicing}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Monthly">Monthly</SelectItem><SelectItem value="Quarterly">Quarterly</SelectItem><SelectItem value="Annually">Annually</SelectItem></SelectContent></Select>
            </div>
          </div>
          <div className="space-y-2"><Label>Number of Packages</Label><Input type="number" value={packages} onChange={(e) => setPackages(e.target.value)} min="1" /></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={handleSubmit} disabled={!account.trim() || !name.trim()}>Create Proposal</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewProposalDialog;
