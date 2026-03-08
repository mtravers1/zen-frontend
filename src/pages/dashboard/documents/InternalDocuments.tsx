import { useState, useRef } from "react";
import { FolderOpen, Upload, Plus, FileText, Folder, Download, Lock } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import NewFolderDialog from "@/components/dashboard/dialogs/NewFolderDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InternalDoc {
  id: string;
  name: string;
  type: "folder" | "document";
  docType?: string;
  date: string;
  fileUrl?: string;
  fileName?: string;
}

const initialDocs: InternalDoc[] = [
  { id: "1", name: "Audit Checklist 2024", type: "document", docType: "Checklist", date: "2024-03-15" },
  { id: "2", name: "Staff Handbook", type: "document", docType: "Policy", date: "2024-01-10" },
  { id: "3", name: "Fee Schedule Template", type: "document", docType: "Template", date: "2024-02-20" },
  { id: "4", name: "Internal Tax Notes", type: "document", docType: "Notes", date: "2024-04-01" },
  { id: "5", name: "Internal Procedures", type: "folder", date: "2024-01-05" },
];

const InternalDocumentsPage = () => {
  const [internalDocs, setInternalDocs] = useState<InternalDoc[]>(initialDocs);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = internalDocs.filter((item) => {
    const matchesSearch = !searchValue || item.name.toLowerCase().includes(searchValue.toLowerCase());
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDownload = (item: InternalDoc) => {
    if (item.fileUrl) {
      const a = document.createElement("a");
      a.href = item.fileUrl;
      a.download = item.fileName || item.name;
      a.click();
    } else {
      toast.error("No file available to download");
    }
  };

  const handleUpload = (data: { name: string; docType: string; file?: File }) => {
    let fileUrl: string | undefined;
    let fileName: string | undefined;
    if (data.file) {
      fileUrl = URL.createObjectURL(data.file);
      fileName = data.file.name;
    }
    const newDoc: InternalDoc = {
      id: Date.now().toString(),
      name: data.name,
      type: "document",
      docType: data.docType,
      date: new Date().toISOString().split("T")[0],
      fileUrl,
      fileName,
    };
    setInternalDocs((prev) => [newDoc, ...prev]);
    toast.success(`Document "${data.name}" uploaded`);
  };

  const handleAddFolder = (name: string) => {
    const newFolder: InternalDoc = {
      id: Date.now().toString(),
      name,
      type: "folder",
      date: new Date().toISOString().split("T")[0],
    };
    setInternalDocs((prev) => [newFolder, ...prev]);
    toast.success(`Folder "${name}" created`);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader
            title="Internal File Cabinet"
            description="Internal-only documents — not visible to clients"
            icon={<Lock className="w-6 h-6" />}
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setUploadOpen(true)}>
              <Upload className="w-4 h-4 mr-2" />Upload
            </Button>
            <Button onClick={() => setFolderOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />New Folder
            </Button>
          </div>
        </div>

        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search internal documents..."
          showFilter
          filterContent={
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px] h-8 bg-background">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="folder">Folders</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
              </SelectContent>
            </Select>
          }
        />

        {filtered.length === 0 && internalDocs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-muted rounded-full mb-4">
                <FolderOpen className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No internal documents yet</h3>
              <p className="text-muted-foreground max-w-md">
                Upload your first internal document or create a folder to get started.
              </p>
              <Button className="mt-6" onClick={() => setUploadOpen(true)}>
                <Upload className="w-4 h-4 mr-2" />Upload Document
              </Button>
            </CardContent>
          </Card>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No items match your search
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
                  >
                    {item.type === "folder" ? (
                      <Folder className="w-5 h-5 text-primary" />
                    ) : (
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.name}</span>
                        <Badge variant="destructive" className="text-xs px-1.5 py-0 h-5">
                          Internal Only
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.docType || "Folder"} • {item.date}
                      </div>
                    </div>
                    {item.type === "document" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => handleDownload(item)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <InternalUploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onSubmit={handleUpload}
      />

      <NewFolderDialog
        open={folderOpen}
        onOpenChange={setFolderOpen}
        onSubmit={(data) => handleAddFolder(data.name)}
      />
    </>
  );
};

// Inline upload dialog for internal docs
interface InternalUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; docType: string; file?: File }) => void;
}

const InternalUploadDialog = ({ open, onOpenChange, onSubmit }: InternalUploadDialogProps) => {
  const [name, setName] = useState("");
  const [docType, setDocType] = useState("Policy");
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    if (!name) setName(f.name.replace(/\.[^.]+$/, ""));
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), docType, file: file ?? undefined });
    setName("");
    setDocType("Policy");
    setFile(null);
    onOpenChange(false);
  };

  const handleClose = () => {
    setName("");
    setDocType("Policy");
    setFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Internal Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => inputRef.current?.click()}
          >
            {file ? (
              <div className="flex items-center gap-2 justify-center">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to select a file or drag and drop</p>
              </>
            )}
          </div>
          <div className="space-y-2">
            <Label>Document Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter document name"
            />
          </div>
          <div className="space-y-2">
            <Label>Document Type</Label>
            <Select value={docType} onValueChange={setDocType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Policy">Policy</SelectItem>
                <SelectItem value="Checklist">Checklist</SelectItem>
                <SelectItem value="Template">Template</SelectItem>
                <SelectItem value="Notes">Notes</SelectItem>
                <SelectItem value="Procedure">Procedure</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InternalDocumentsPage;
