import { useState } from "react";
import { GitBranch, Plus, Store } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const PipelinesPage = () => {
  const [pipelines, setPipelines] = useState([
    { id: 1, name: "Client Onboarding", stages: 5 },
    { id: 2, name: "Tax Return Processing", stages: 8 },
    { id: 3, name: "Audit Workflow", stages: 6 },
    { id: 4, name: "Monthly Bookkeeping", stages: 4 },
  ]);

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader
            title="Pipelines"
            description="Design and manage workflow pipelines"
            icon={<GitBranch className="w-6 h-6" />}
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.info("Marketplace opening soon")}>
              <Store className="w-4 h-4 mr-2" />
              Get from Marketplace
            </Button>
            <Button onClick={() => toast.success("New pipeline creation coming soon")}>
              <Plus className="w-4 h-4 mr-2" />
              New Pipeline
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {pipelines.map((pipeline) => (
            <Card key={pipeline.id} className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardHeader className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <GitBranch className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{pipeline.name}</CardTitle>
                      <CardDescription>{pipeline.stages} stages</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toast.info(`Editing ${pipeline.name}`)}>Edit</Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
  );
};

export default PipelinesPage;
