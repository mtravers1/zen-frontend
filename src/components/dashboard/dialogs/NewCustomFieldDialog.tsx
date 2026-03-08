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
  initialValues?: { name: string; type: string; required: boolean };
  editMode?: boolean;
}

const NewCustomFieldDialog = ({ open, onOpenChange, onSubmit, initialValues, editMode }: NewCustomFieldDialogProps) => {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [type, setType] = useState(initialValues?.type ?? "Text");
  const [required, setRequired] = useState(initialValues?.required ?? false);

  // Sync with initialValues when dialog opens
  const handleOpenChange = (o: boolean) => {
    if (o && initialValues) {
      setName(initialValues.name);
      setType(initialValues.type);
      setRequired(initialValues.required);
    } else if (!o) {
      if (!initialValues) { setName(""); setType("Text"); setRequired(false); }
    }
    onOpenChange(o);
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), type, required });
    if (!initialValues) { setName(""); setType("Text"); setRequired(false); }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit Custom Field" : "Add Custom Field"}</DialogTitle>
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
          <Button onClick={handleSubmit} disabled={!name.trim()}>{editMode ? "Save Changes" : "Add Field"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCustomFieldDialog;
