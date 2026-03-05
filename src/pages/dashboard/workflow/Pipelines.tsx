import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { GitBranch, Plus, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WorkflowPipelinesPage = () => {
  const pipelines = [
    { id: 1, name: "Tax Return Pipeline", stages: 5, jobs: 156 },
    { id: 2, name: "Audit Pipeline", stages: 7, jobs: 23 },
    { id: 3, name: "Bookkeeping Pipeline", stages: 4, jobs: 89 },
    { id: 4, name: "Payroll Pipeline", stages: 3, jobs: 45 },
    { id: 5, name: "Advisory Pipeline", stages: 6, jobs: 12 },
  ];

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<GitBranch className="w-5 h-5 text-primary" />}
          title="Pipelines"
          description="Manage workflow pipelines and stages"
        />

        <div className="flex items-center gap-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New pipeline
          </Button>
          <Button variant="outline">
            <Store className="w-4 h-4 mr-2" />
            Get from Marketplace
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {pipelines.map((pipeline) => (
                <div
                  key={pipeline.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-primary hover:underline">
                        {pipeline.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {pipeline.stages} stages • {pipeline.jobs} active jobs
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default WorkflowPipelinesPage;
