import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewRecurringInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (invoice: { account: string; name: string; amount: number; paymentMethod: string; frequency: string }) => void;
}

const NewRecurringInvoiceDialog = ({ open, onOpenChange, onSubmit }: NewRecurringInvoiceDialogProps) => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [frequency, setFrequency] = useState("Monthly");

  const handleSubmit = () => {
    if (!account.trim() || !name.trim() || !amount) return;
    onSubmit({ account: account.trim(), name: name.trim(), amount: parseFloat(amount), paymentMethod, frequency });
    setAccount(""); setName(""); setAmount(""); setPaymentMethod("Credit Card"); setFrequency("Monthly");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>New Recurring Invoice</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Account *</Label><Input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Account name" /></div>
            <div className="space-y-2"><Label>Invoice Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Monthly Retainer" /></div>
          </div>
          <div className="space-y-2"><Label>Amount *</Label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" min="0" step="0.01" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Credit Card">Credit Card</SelectItem><SelectItem value="ACH">ACH</SelectItem><SelectItem value="Invoice">Invoice</SelectItem><SelectItem value="Wire">Wire</SelectItem></SelectContent></Select>
            </div>
            <div className="space-y-2"><Label>Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Weekly">Weekly</SelectItem><SelectItem value="Monthly">Monthly</SelectItem><SelectItem value="Quarterly">Quarterly</SelectItem><SelectItem value="Yearly">Yearly</SelectItem></SelectContent></Select>
            </div>
          </div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={handleSubmit} disabled={!account.trim() || !name.trim() || !amount}>Create</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewRecurringInvoiceDialog;
