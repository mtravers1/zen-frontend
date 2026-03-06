import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const templates = ["Tax Organizer", "Quarterly Review", "Onboarding Checklist", "Audit Preparation", "Year-End Docs"];

interface NewOrganizerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (organizer: { name: string; account: string; template: string }) => void;
}

const NewOrganizerDialog = ({ open, onOpenChange, onSubmit }: NewOrganizerDialogProps) => {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [template, setTemplate] = useState(templates[0]);

  const handleSubmit = () => {
    if (!name.trim() || !account.trim()) return;
    onSubmit({ name: name.trim(), account: account.trim(), template });
    setName("");
    setAccount("");
    setTemplate(templates[0]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Organizer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Organizer Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. 2024 Tax Organizer" />
          </div>
          <div className="space-y-2">
            <Label>Account</Label>
            <Input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="e.g. Acme Corp" />
          </div>
          <div className="space-y-2">
            <Label>Template</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                {templates.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!name.trim() || !account.trim()}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrganizerDialog;
