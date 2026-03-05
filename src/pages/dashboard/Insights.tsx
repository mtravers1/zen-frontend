import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { BarChart2, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InsightsPage = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Clients",
      value: "2,350",
      change: "+180",
      trend: "up",
      icon: Users,
    },
    {
      title: "Growth Rate",
      value: "12.5%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Avg. Revenue/Client",
      value: "$19.25",
      change: "-4.5%",
      trend: "down",
      icon: BarChart2,
    },
  ];

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<BarChart2 className="w-5 h-5 text-primary" />}
          title="Insights"
          description="Analytics and performance metrics for your firm"
        />

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Placeholder for charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart placeholder - Revenue trends
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Client Acquisition</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart placeholder - Client growth
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default InsightsPage;
