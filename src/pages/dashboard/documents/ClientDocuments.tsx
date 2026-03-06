import { useState } from "react";
import { FolderOpen, Download, FileText, FileSpreadsheet, File } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import NewDocumentForm from "@/components/dashboard/forms/NewDocumentForm";
import DocumentFilterPanel from "@/components/dashboard/forms/DocumentFilterPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewDocumentFormValues, DocumentFilterValues } from "@/lib/dashboard-schemas";

interface DocumentRecord {
  id: number;
  name: string;
  type: string;
  client: string;
  folder: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  status: "active" | "archived";
}

const INITIAL_DOCUMENTS: DocumentRecord[] = [
  {
    id: 1,
    name: "Q4 2024 Tax Return",
    type: "Tax Return",
    client: "Smith Corporation",
    folder: "Tax Returns",
    size: "2.4 MB",
    uploadedBy: "John Doe",
    uploadedAt: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "Annual Financial Statements",
    type: "Financial Statement",
    client: "Johnson LLC",
    folder: "Financial Statements",
    size: "1.1 MB",
    uploadedBy: "Jane Smith",
    uploadedAt: "2024-01-18",
    status: "active",
  },
  {
    id: 3,
    name: "Service Agreement 2024",
    type: "Contract",
    client: "Brown & Associates",
    folder: "Contracts",
    size: "540 KB",
    uploadedBy: "Mike Johnson",
    uploadedAt: "2024-01-10",
    status: "active",
  },
  {
    id: 4,
    name: "Q3 Invoice #1042",
    type: "Invoice",
    client: "Wilson Group",
    folder: "Invoices",
    size: "128 KB",
    uploadedBy: "Sarah Wilson",
    uploadedAt: "2024-01-05",
    status: "active",
  },
  {
    id: 5,
    name: "2023 Year-End Report",
    type: "Report",
    client: "Davis Industries",
    folder: "Reports",
    size: "3.2 MB",
    uploadedBy: "John Doe",
    uploadedAt: "2023-12-20",
    status: "archived",
  },
];

const getDocumentIcon = (type: string) => {
  if (type === "Financial Statement" || type === "Report") {
    return <FileSpreadsheet className="w-4 h-4 text-green-600" />;
  }
  if (type === "Tax Return" || type === "Contract") {
    return <FileText className="w-4 h-4 text-blue-600" />;
  }
  return <File className="w-4 h-4 text-muted-foreground" />;
};

const ClientDocumentsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [documents, setDocuments] = useState<DocumentRecord[]>(INITIAL_DOCUMENTS);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<DocumentFilterValues>({});
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const handleNewDocument = (values: NewDocumentFormValues) => {
    const newDoc: DocumentRecord = {
      id: documents.length + 1,
      name: values.name,
      type: values.type,
      client: values.client,
      folder: values.folder,
      size: "—",
      uploadedBy: "You",
      uploadedAt: new Date().toISOString().split("T")[0],
      status: "active",
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleFilterApply = (newFilters: DocumentFilterValues) => {
    setFilters(newFilters);
    const count = Object.values(newFilters).filter(
      (v) => v && v !== "all" && v !== ""
    ).length;
    setActiveFilterCount(count);
  };

  const handleFilterReset = () => {
    setFilters({});
    setActiveFilterCount(0);
  };

  const filteredDocuments = documents.filter((doc) => {
    if (activeTab !== "all" && doc.status !== activeTab) return false;

    if (searchValue) {
      const q = searchValue.toLowerCase();
      const matchesSearch =
        doc.name.toLowerCase().includes(q) ||
        doc.client.toLowerCase().includes(q) ||
        doc.type.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (filters.type && filters.type !== "all" && doc.type !== filters.type) return false;
    if (filters.client && filters.client !== "all" && doc.client !== filters.client) return false;
    if (filters.folder && filters.folder !== "all" && doc.folder !== filters.folder) return false;

    return true;
  });

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Client Documents"
        description="Manage and organize client files and documents"
        icon={<FolderOpen className="w-5 h-5 text-primary" />}
      />

      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="active">
              Active ({documents.filter((d) => d.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="archived">
              Archived ({documents.filter((d) => d.status === "archived").length})
            </TabsTrigger>
            <TabsTrigger value="all">All ({documents.length})</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <NewDocumentForm onSubmit={handleNewDocument} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <PageToolbar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            searchPlaceholder="Search documents by name, client, or type..."
          />
        </div>
        <DocumentFilterPanel
          onApply={handleFilterApply}
          onReset={handleFilterReset}
          activeFilterCount={activeFilterCount}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Folder</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No documents found. Try adjusting your search or filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getDocumentIcon(doc.type)}
                        <span className="font-medium text-primary hover:underline">
                          {doc.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.type}</Badge>
                    </TableCell>
                    <TableCell className="text-primary hover:underline cursor-pointer">
                      {doc.client}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{doc.folder}</TableCell>
                    <TableCell className="text-muted-foreground">{doc.size}</TableCell>
                    <TableCell className="text-muted-foreground">{doc.uploadedBy}</TableCell>
                    <TableCell className="text-muted-foreground">{doc.uploadedAt}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDocumentsPage;
