import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const fieldTypes = ["Text", "Date", "Dropdown", "Currency", "URL", "Number", "Checkbox"];

interface NewCustomFieldDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (field: { name: string; type: string; required: boolean }) => void;
}

const NewCustomFieldDialog = ({ open, onOpenChange, onSubmit }: NewCustomFieldDialogProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Text");
  const [required, setRequired] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), type, required });
    setName("");
    setType("Text");
    setRequired(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Custom Field</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Field Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Industry" />
          </div>
          <div className="space-y-2">
            <Label>Field Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                {fieldTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label>Required</Label>
            <Switch checked={required} onCheckedChange={setRequired} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>Add Field</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCustomFieldDialog;
