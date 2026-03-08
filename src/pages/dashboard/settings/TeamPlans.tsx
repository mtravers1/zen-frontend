import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Users, Crown, UserPlus, Mail, Check, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TeamPlansPage = () => {
  const currentPlan = {
    name: "Professional",
    seats: 10,
    usedSeats: 6,
    price: "$49",
    period: "per user/month",
  };

  const teamMembers = [
    { id: 1, name: "John Smith", email: "john@firm.com", role: "Director", status: "active" },
    { id: 2, name: "Sarah Johnson", email: "sarah@firm.com", role: "Executive Manager", status: "active" },
    { id: 3, name: "Michael Chen", email: "michael@firm.com", role: "Account Manager", status: "active" },
    { id: 4, name: "Emily Davis", email: "emily@firm.com", role: "Executive Assistant", status: "active" },
    { id: 5, name: "David Wilson", email: "david@firm.com", role: "Account Manager", status: "pending" },
    { id: 6, name: "Lisa Brown", email: "lisa@firm.com", role: "Executive Assistant", status: "active" },
  ];

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <>
      <DashboardPageHeader
        title="Team & plans"
        description="Manage your team members and subscription"
        icon={<Users className="w-5 h-5 text-primary" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Current Plan */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                <CardTitle>Current Plan</CardTitle>
              </div>
              <Button variant="outline">Upgrade Plan</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold">{currentPlan.name}</span>
              <span className="text-muted-foreground">
                {currentPlan.price} {currentPlan.period}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Team seats used</p>
                <p className="text-2xl font-semibold">
                  {currentPlan.usedSeats} / {currentPlan.seats}
                </p>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(currentPlan.usedSeats / currentPlan.seats) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Team Member
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Resend Invitations
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage your team's access and permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    {member.status === "active" ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <Check className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default TeamPlansPage;

