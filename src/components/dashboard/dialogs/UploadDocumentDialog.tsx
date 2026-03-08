import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (doc: { name: string; account: string; type: string }) => void;
}

const UploadDocumentDialog = ({ open, onOpenChange, onSubmit }: UploadDocumentDialogProps) => {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [type, setType] = useState("Tax Document");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), account: account.trim(), type });
    setName(""); setAccount(""); setType("Tax Document");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Upload Document</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Click to select a file or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOC, XLS, JPG up to 10MB</p>
          </div>
          <div className="space-y-2"><Label>Document Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter document name" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Account</Label><Input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Account name" /></div>
            <div className="space-y-2"><Label>Document Type</Label>
              <Select value={type} onValueChange={setType}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Tax Document">Tax Document</SelectItem><SelectItem value="Financial Statement">Financial Statement</SelectItem><SelectItem value="Contract">Contract</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select>
            </div>
          </div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={handleSubmit} disabled={!name.trim()}>Upload</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocumentDialog;
