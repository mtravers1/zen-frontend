import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddFundsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (amount: number) => void;
}

const AddFundsDialog = ({ open, onOpenChange, onSubmit }: AddFundsDialogProps) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    const num = Number(amount);
    if (num <= 0) return;
    onSubmit(num);
    setAmount("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Funds</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Amount ($)</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100.00" min="1" step="0.01" />
          </div>
          <div className="flex gap-2">
            {[50, 100, 250, 500].map((v) => (
              <Button key={v} variant="outline" size="sm" onClick={() => setAmount(String(v))}>${v}</Button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!amount || Number(amount) <= 0}>Add Funds</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFundsDialog;
