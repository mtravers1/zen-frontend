import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { HelpCircle, BarChart2, LayoutTemplate, Bell, PlayCircle, FileText, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HowItWorksPage = () => {
  const guides = [
    {
      title: "Getting Started with Reports",
      description: "Learn how to create and customize reports for your firm",
      icon: FileText,
      duration: "5 min read",
    },
    {
      title: "Building Custom Dashboards",
      description: "Create personalized dashboards with KPIs and charts",
      icon: LayoutTemplate,
      duration: "7 min read",
    },
    {
      title: "Setting Up Alerts",
      description: "Configure notifications for important metrics",
      icon: Bell,
      duration: "3 min read",
    },
    {
      title: "Using the Report Designer",
      description: "Master the drag-and-drop report builder",
      icon: BarChart2,
      duration: "10 min read",
    },
  ];

  const videos = [
    {
      title: "Reporting Overview",
      thumbnail: "Introduction to the reporting module",
      duration: "4:32",
    },
    {
      title: "Creating Your First Dashboard",
      thumbnail: "Step-by-step dashboard creation",
      duration: "6:15",
    },
    {
      title: "Advanced Analytics",
      thumbnail: "Deep dive into analytics features",
      duration: "8:45",
    },
  ];

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<HelpCircle className="w-5 h-5 text-primary" />}
          title="How it works"
          description="Learn how to use the reporting features effectively"
        />

        {/* Quick Start Guide */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Quick Start Guide</h3>
              <p className="text-muted-foreground max-w-md">
                New to reporting? Start here to learn the basics and create your first report in minutes.
              </p>
            </div>
            <Button size="lg">
              <PlayCircle className="w-5 h-5 mr-2" />
              Watch Overview
            </Button>
          </CardContent>
        </Card>

        {/* Documentation Cards */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Documentation</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {guides.map((guide) => (
              <Card key={guide.title} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <guide.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{guide.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {guide.description}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {guide.duration}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Video Tutorials */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Video Tutorials</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {videos.map((video) => (
              <Card key={video.title} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <Video className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mb-1">{video.title}</h4>
                  <p className="text-sm text-muted-foreground">{video.duration}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
  );
};

export default HowItWorksPage;

