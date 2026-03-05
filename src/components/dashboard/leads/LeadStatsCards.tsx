import { Users, UserPlus, Phone, UserCheck, Trophy, UserX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  lost: number;
}

interface LeadStatsCardsProps {
  stats: LeadStats;
  loading?: boolean;
}

const LeadStatsCards = ({ stats, loading }: LeadStatsCardsProps) => {
  const statCards = [
    {
      label: "Total Leads",
      value: stats.total,
      icon: Users,
      color: "text-foreground",
      bgColor: "bg-muted/50",
    },
    {
      label: "New",
      value: stats.new,
      icon: UserPlus,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Contacted",
      value: stats.contacted,
      icon: Phone,
      color: "text-sky-400",
      bgColor: "bg-sky-500/10",
    },
    {
      label: "Qualified",
      value: stats.qualified,
      icon: UserCheck,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "Converted",
      value: stats.converted,
      icon: Trophy,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Lost",
      value: stats.lost,
      icon: UserX,
      color: "text-muted-foreground",
      bgColor: "bg-muted/30",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="glass-effect border-border/50">
            <CardContent className="p-4">
              <div className="h-16 animate-pulse bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {statCards.map((stat) => (
        <Card key={stat.label} className="glass-effect border-border/50 hover:border-primary/30 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LeadStatsCards;
