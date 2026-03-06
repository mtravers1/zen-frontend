import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["Tax", "Accounting", "Audit", "Payroll", "Advisory", "Consulting"];

interface NewServiceTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (service: { name: string; category: string; price: number }) => void;
}

const NewServiceTemplateDialog = ({ open, onOpenChange, onSubmit }: NewServiceTemplateDialogProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Tax");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), category, price: Number(price) || 0 });
    setName("");
    setCategory("Tax");
    setPrice("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Service Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Tax Preparation" />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Price ($)</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>Add Service</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewServiceTemplateDialog;
