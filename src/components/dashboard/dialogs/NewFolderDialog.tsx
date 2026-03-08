import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NewFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (folder: { name: string }) => void;
}

const NewFolderDialog = ({ open, onOpenChange, onSubmit }: NewFolderDialogProps) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim() });
    setName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle>New Folder</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Folder Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter folder name" autoFocus /></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={handleSubmit} disabled={!name.trim()}>Create Folder</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewFolderDialog;
