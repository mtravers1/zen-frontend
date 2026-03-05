import { FolderOpen, Upload, Plus } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ClientDocumentsPage = () => {
  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader
            title="Client Documents"
            description="Manage and organize client files and documents"
            icon={<FolderOpen className="w-6 h-6" />}
          />
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Folder
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Document Management</CardTitle>
            <CardDescription>
              This feature is coming soon. You'll be able to upload, organize, and share documents with clients.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-muted rounded-full mb-4">
                <FolderOpen className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No documents yet</h3>
              <p className="text-muted-foreground max-w-md">
                Upload your first document or create a folder to get started organizing your client files.
              </p>
              <Button className="mt-6">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default ClientDocumentsPage;
