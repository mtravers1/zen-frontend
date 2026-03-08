import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { BarChart2, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData: Record<string, Array<{ name: string; value: number }>> = {
  "7d": [
    { name: "Mon", value: 4200 }, { name: "Tue", value: 3800 }, { name: "Wed", value: 5100 },
    { name: "Thu", value: 4600 }, { name: "Fri", value: 5400 }, { name: "Sat", value: 2100 }, { name: "Sun", value: 1800 },
  ],
  "30d": [
    { name: "W1", value: 18200 }, { name: "W2", value: 21500 }, { name: "W3", value: 19800 }, { name: "W4", value: 24100 },
  ],
  "90d": [
    { name: "Jan", value: 38500 }, { name: "Feb", value: 42100 }, { name: "Mar", value: 45200 },
  ],
  "1y": [
    { name: "Q1", value: 125800 }, { name: "Q2", value: 138400 }, { name: "Q3", value: 142100 }, { name: "Q4", value: 155900 },
  ],
};

const clientData: Record<string, Array<{ name: string; value: number }>> = {
  "7d": [
    { name: "Mon", value: 5 }, { name: "Tue", value: 3 }, { name: "Wed", value: 8 },
    { name: "Thu", value: 4 }, { name: "Fri", value: 6 }, { name: "Sat", value: 1 }, { name: "Sun", value: 0 },
  ],
  "30d": [
    { name: "W1", value: 22 }, { name: "W2", value: 35 }, { name: "W3", value: 28 }, { name: "W4", value: 41 },
  ],
  "90d": [
    { name: "Jan", value: 95 }, { name: "Feb", value: 110 }, { name: "Mar", value: 130 },
  ],
  "1y": [
    { name: "Q1", value: 335 }, { name: "Q2", value: 420 }, { name: "Q3", value: 510 }, { name: "Q4", value: 580 },
  ],
};

const InsightsPage = () => {
  const [dateRange, setDateRange] = useState("30d");

  const stats = [
    { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", trend: "up", icon: DollarSign },
    { title: "Active Clients", value: "2,350", change: "+180", trend: "up", icon: Users },
    { title: "Growth Rate", value: "12.5%", change: "+2.1%", trend: "up", icon: TrendingUp },
    { title: "Avg. Revenue/Client", value: "$19.25", change: "-4.5%", trend: "down", icon: BarChart2 },
  ];

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader icon={<BarChart2 className="w-5 h-5 text-primary" />} title="Insights" description="Analytics and performance metrics for your firm" />
          <Tabs value={dateRange} onValueChange={setDateRange}>
            <TabsList><TabsTrigger value="7d">7D</TabsTrigger><TabsTrigger value="30d">30D</TabsTrigger><TabsTrigger value="90d">90D</TabsTrigger><TabsTrigger value="1y">1Y</TabsTrigger></TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs">
                  {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" /> : <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span className="text-muted-foreground ml-1">from last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Revenue Overview</CardTitle></CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData[dateRange]}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]} contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Client Acquisition</CardTitle></CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientData[dateRange]}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip formatter={(value: number) => [value, "New Clients"]} contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default InsightsPage;
