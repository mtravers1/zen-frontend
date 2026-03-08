import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { FormInput, Plus, Database, BarChart3, Table2, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ReportDesignerPage = () => {
  const designerTools = [
    {
      title: "Data Sources",
      description: "Connect to your data sources and tables",
      icon: Database,
    },
    {
      title: "Charts",
      description: "Add bar charts, line charts, and more",
      icon: BarChart3,
    },
    {
      title: "Tables",
      description: "Display data in customizable tables",
      icon: Table2,
    },
    {
      title: "Visualizations",
      description: "Pie charts, gauges, and KPI cards",
      icon: PieChart,
    },
  ];

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<FormInput className="w-5 h-5 text-primary" />}
          title="Report designer"
          description="Build custom reports with drag-and-drop components"
        />

        {/* Designer Action */}
        <div className="flex justify-end">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Report
          </Button>
        </div>

        {/* Designer Tools Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {designerTools.map((tool) => (
            <Card key={tool.title} className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2">
                  <tool.icon className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-base">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty Canvas Placeholder */}
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="p-4 rounded-full bg-muted mb-4">
              <FormInput className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Start building your report</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
              Select a tool above to add components to your report canvas. 
              You can drag and drop elements to arrange them.
            </p>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add First Component
            </Button>
          </CardContent>
        </Card>
      </div>
  );
};

export default ReportDesignerPage;

