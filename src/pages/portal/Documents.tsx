import { useState } from "react";
import ClientPortalLayout from "@/components/portal/ClientPortalLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderOpen, Upload, Download, FileText, Search, File, Image } from "lucide-react";
import { toast } from "sonner";

type DocEntry = { id: number; name: string; type: string; size: string; date: string; uploadedBy: string; file?: File };

const mockDocuments: DocEntry[] = [
  { id: 1, name: "W-2 Form 2024.pdf", type: "Tax Document", size: "245 KB", date: "2024-01-20", uploadedBy: "Your Team" },
  { id: 2, name: "Quarterly Report Q4.pdf", type: "Financial Report", size: "1.2 MB", date: "2024-01-15", uploadedBy: "Your Team" },
  { id: 3, name: "Bank Statement Dec.pdf", type: "Bank Statement", size: "890 KB", date: "2024-01-10", uploadedBy: "You" },
  { id: 4, name: "Business License.png", type: "Legal Document", size: "2.1 MB", date: "2023-12-15", uploadedBy: "You" },
  { id: 5, name: "Tax Return 2023 FINAL.pdf", type: "Completed Return", size: "3.4 MB", date: "2023-04-14", uploadedBy: "Your Team" },
];

const PortalDocuments = () => {
  const [searchValue, setSearchValue] = useState("");
  const [documents, setDocuments] = useState<DocEntry[]>(mockDocuments);

  const filtered = documents.filter(d => !searchValue || d.name.toLowerCase().includes(searchValue.toLowerCase()) || d.type.toLowerCase().includes(searchValue.toLowerCase()));

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        Array.from(files).forEach(file => {
          setDocuments(prev => [{ id: Date.now() + Math.random(), name: file.name, type: "Uploaded", size: `${(file.size / 1024).toFixed(0)} KB`, date: new Date().toISOString().split("T")[0], uploadedBy: "You", file }, ...prev]);
        });
        toast.success(`${files.length} file(s) uploaded successfully`);
      }
    };
    input.click();
  };

  const handleDownload = (doc: DocEntry) => {
    if (doc.file) {
      const url = URL.createObjectURL(doc.file);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.name;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // For mock/server documents, generate a placeholder
      const content = `Document: ${doc.name}\nType: ${doc.type}\nDate: ${doc.date}\nUploaded by: ${doc.uploadedBy}\n\n[This document was provided by your firm. Contact your accountant to receive the actual file.]`;
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.name.replace(/\.[^.]+$/, "") + ".txt";
      a.click();
      URL.revokeObjectURL(url);
    }
    toast.success(`Downloading "${doc.name}"`);
  };

  const getFileIcon = (name: string) => {
    if (name.match(/\.(png|jpg|jpeg|gif)$/i)) return <Image className="w-5 h-5 text-pink-500" />;
    if (name.match(/\.pdf$/i)) return <FileText className="w-5 h-5 text-red-500" />;
    return <File className="w-5 h-5 text-blue-500" />;
  };

  return (
    <>
    <ClientPortalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3"><FolderOpen className="w-6 h-6 text-primary" />Documents</h1>
            <p className="text-muted-foreground">Upload, download, and manage your files securely.</p>
          </div>
          <Button onClick={handleUpload}><Upload className="w-4 h-4 mr-2" />Upload Files</Button>
        </div>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Search documents..." className="pl-9 h-9" />
        </div>

        <Card className="border border-border">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filtered.map(doc => (
                <div key={doc.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                  {getFileIcon(doc.name)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.type} • {doc.size} • Uploaded by {doc.uploadedBy}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{doc.date}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleDownload(doc)}><Download className="w-4 h-4" /></Button>
                </div>
              ))}
              {filtered.length === 0 && <div className="p-8 text-center text-muted-foreground">No documents found</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientPortalLayout>
    </>
  );
};

export default PortalDocuments;
