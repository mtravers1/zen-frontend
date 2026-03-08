import { useState } from "react";
import { FolderOpen, Upload, Plus, FileText, Folder } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import UploadDocumentDialog from "@/components/dashboard/dialogs/UploadDocumentDialog";
import NewFolderDialog from "@/components/dashboard/dialogs/NewFolderDialog";

const ClientDocumentsPage = () => {
  const [items, setItems] = useState<{ id: number; name: string; type: "folder" | "document"; docType?: string; date: string }[]>([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = items.filter(item => {
    const matchesSearch = !searchValue || item.name.toLowerCase().includes(searchValue.toLowerCase());
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader title="Client Documents" description="Manage and organize client files and documents" icon={<FolderOpen className="w-6 h-6" />} />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setUploadOpen(true)}><Upload className="w-4 h-4 mr-2" />Upload</Button>
            <Button onClick={() => setFolderOpen(true)}><Plus className="w-4 h-4 mr-2" />New Folder</Button>
          </div>
        </div>

        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search documents..."
          showFilter
          filterContent={
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px] h-8 bg-background"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="folder">Folders</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
              </SelectContent>
            </Select>
          }
        />

        {filtered.length === 0 && items.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-muted rounded-full mb-4"><FolderOpen className="w-12 h-12 text-muted-foreground" /></div>
              <h3 className="text-lg font-medium mb-2">No documents yet</h3>
              <p className="text-muted-foreground max-w-md">Upload your first document or create a folder to get started organizing your client files.</p>
              <Button className="mt-6" onClick={() => setUploadOpen(true)}><Upload className="w-4 h-4 mr-2" />Upload Document</Button>
            </CardContent>
          </Card>
        ) : filtered.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">No items match your search</CardContent></Card>
        ) : (
          <Card><CardContent className="p-0"><div className="divide-y divide-border">
            {filtered.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                {item.type === "folder" ? <Folder className="w-5 h-5 text-primary" /> : <FileText className="w-5 h-5 text-muted-foreground" />}
                <div className="flex-1"><div className="font-medium">{item.name}</div><div className="text-sm text-muted-foreground">{item.docType || "Folder"} • {item.date}</div></div>
              </div>
            ))}
          </div></CardContent></Card>
        )}
      </div>
      <UploadDocumentDialog open={uploadOpen} onOpenChange={setUploadOpen} onSubmit={(data) => {
        setItems(prev => [...prev, { id: Date.now(), name: data.name, type: "document", docType: data.type, date: new Date().toLocaleDateString() }]);
        toast.success(`Document "${data.name}" uploaded`);
      }} />
      <NewFolderDialog open={folderOpen} onOpenChange={setFolderOpen} onSubmit={(data) => {
        setItems(prev => [...prev, { id: Date.now(), name: data.name, type: "folder", date: new Date().toLocaleDateString() }]);
        toast.success(`Folder "${data.name}" created`);
      }} />
  );
};

export default ClientDocumentsPage;
