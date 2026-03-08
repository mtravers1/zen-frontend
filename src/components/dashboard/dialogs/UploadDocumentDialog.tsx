import { useState, useRef, DragEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, X } from "lucide-react";

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (doc: { name: string; account: string; type: string; file?: File }) => void;
}

const UploadDocumentDialog = ({ open, onOpenChange, onSubmit }: UploadDocumentDialogProps) => {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [type, setType] = useState("Tax Document");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    if (!name) setName(f.name.replace(/\.[^.]+$/, ""));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), account: account.trim(), type, file: file ?? undefined });
    setName(""); setAccount(""); setType("Tax Document"); setFile(null);
    onOpenChange(false);
  };

  const handleClose = () => {
    setName(""); setAccount(""); setType("Tax Document"); setFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>Upload Document</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <input ref={inputRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

          {file ? (
            <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
              <FileText className="w-8 h-8 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => setFile(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
              onClick={() => inputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to select a file or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, XLS, JPG up to 10MB</p>
            </div>
          )}

          <div className="space-y-2"><Label>Document Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter document name" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Account</Label><Input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Account name" /></div>
            <div className="space-y-2"><Label>Document Type</Label>
              <Select value={type} onValueChange={setType}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Tax Document">Tax Document</SelectItem><SelectItem value="Financial Statement">Financial Statement</SelectItem><SelectItem value="Contract">Contract</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select>
            </div>
          </div>
        </div>
        <DialogFooter><Button variant="outline" onClick={handleClose}>Cancel</Button><Button onClick={handleSubmit} disabled={!name.trim()}>Upload</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocumentDialog;
