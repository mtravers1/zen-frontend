import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const colorOptions = [
  { label: "Red", value: "bg-red-500" },
  { label: "Blue", value: "bg-blue-500" },
  { label: "Green", value: "bg-green-500" },
  { label: "Yellow", value: "bg-yellow-500" },
  { label: "Purple", value: "bg-purple-500" },
  { label: "Orange", value: "bg-orange-500" },
  { label: "Emerald", value: "bg-emerald-500" },
  { label: "Pink", value: "bg-pink-500" },
];

interface NewTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (tag: { name: string; color: string }) => void;
}

const NewTagDialog = ({ open, onOpenChange, onSubmit }: NewTagDialogProps) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(colorOptions[0].value);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), color });
    setName("");
    setColor(colorOptions[0].value);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Tag</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Tag Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. VIP Client" />
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-8 h-8 rounded-full ${c.value} ${color === c.value ? "ring-2 ring-offset-2 ring-primary" : ""} transition-all`}
                  title={c.label}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>Create Tag</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewTagDialog;
