import { useState } from "react";
import ClientPortalLayout from "@/components/portal/ClientPortalLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitBranch, CheckCircle2, Clock, ArrowRight, Circle } from "lucide-react";

const mockWorkflows = [
  {
    id: 1, name: "2024 Tax Return", pipeline: "Tax Returns", status: "in_progress", progress: 75,
    stages: [
      { name: "Document Collection", status: "completed" },
      { name: "Data Entry", status: "completed" },
      { name: "In Review", status: "current" },
      { name: "Client Approval", status: "pending" },
      { name: "Filed", status: "pending" },
    ],
    lastUpdate: "2 hours ago", assignee: "John D.",
  },
  {
    id: 2, name: "Q1 Bookkeeping", pipeline: "Bookkeeping", status: "in_progress", progress: 40,
    stages: [
      { name: "Bank Reconciliation", status: "completed" },
      { name: "Transaction Review", status: "current" },
      { name: "Adjustments", status: "pending" },
      { name: "Report Generation", status: "pending" },
    ],
    lastUpdate: "1 day ago", assignee: "Sarah M.",
  },
  {
    id: 3, name: "Business Formation - LLC", pipeline: "Formation", status: "completed", progress: 100,
    stages: [
      { name: "Consultation", status: "completed" },
      { name: "Document Prep", status: "completed" },
      { name: "State Filing", status: "completed" },
      { name: "EIN Obtained", status: "completed" },
    ],
    lastUpdate: "1 week ago", assignee: "Mike R.",
  },
];

const PortalWorkflow = () => {
  const [activeTab, setActiveTab] = useState("active");

  const filtered = mockWorkflows.filter(w => activeTab === "all" || (activeTab === "active" ? w.status === "in_progress" : w.status === "completed"));

  const getStageIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "current": return <Clock className="w-4 h-4 text-primary animate-pulse" />;
      default: return <Circle className="w-4 h-4 text-muted-foreground/40" />;
    }
  };

  return (
    <>
    <ClientPortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3"><GitBranch className="w-6 h-6 text-primary" />Workflow Status</h1>
          <p className="text-muted-foreground">Track the progress of your active jobs and projects.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList><TabsTrigger value="active">Active</TabsTrigger><TabsTrigger value="completed">Completed</TabsTrigger><TabsTrigger value="all">All</TabsTrigger></TabsList>
        </Tabs>

        <div className="space-y-4">
          {filtered.map(workflow => (
            <Card key={workflow.id} className="border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{workflow.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{workflow.pipeline} • Assigned to {workflow.assignee}</p>
                  </div>
                  <Badge className={workflow.status === "completed" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}>
                    {workflow.status === "completed" ? "Completed" : "In Progress"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">{workflow.progress}%</span>
                  </div>
                  <Progress value={workflow.progress} className="h-2" />
                </div>

                <div className="space-y-2">
                  {workflow.stages.map((stage, i) => (
                    <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${stage.status === "current" ? "bg-primary/5 border border-primary/20" : ""}`}>
                      {getStageIcon(stage.status)}
                      <span className={`text-sm ${stage.status === "completed" ? "text-muted-foreground line-through" : stage.status === "current" ? "font-medium" : "text-muted-foreground"}`}>
                        {stage.name}
                      </span>
                      {stage.status === "current" && <Badge variant="outline" className="ml-auto text-xs">Current Stage</Badge>}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mt-3">Last updated: {workflow.lastUpdate}</p>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <Card className="border border-border"><CardContent className="py-12 text-center text-muted-foreground">No workflows to display.</CardContent></Card>
          )}
        </div>
      </div>
    </ClientPortalLayout>
    </>
  );
};

export default PortalWorkflow;
