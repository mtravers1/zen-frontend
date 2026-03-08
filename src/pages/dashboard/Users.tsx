import { useState } from "react";
import { Users, UserCog, Activity, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const teamMembers = [
  { name: "John Director", email: "john@zentavos.com", role: "Director", initials: "JD" },
  { name: "Sarah Manager", email: "sarah@zentavos.com", role: "Executive Manager", initials: "SM" },
  { name: "Mike Account", email: "mike@zentavos.com", role: "Account Manager", initials: "MA" },
  { name: "Lisa Assistant", email: "lisa@zentavos.com", role: "Executive Assistant", initials: "LA" },
  { name: "Tom Analyst", email: "tom@zentavos.com", role: "Relationship Manager", initials: "TA" },
];

const activityLog = [
  { user: "John Director", action: "Logged in", time: "2 minutes ago", type: "login" },
  { user: "Sarah Manager", action: "Updated role for Mike Account", time: "15 minutes ago", type: "role_change" },
  { user: "Mike Account", action: "Created new client account", time: "1 hour ago", type: "account" },
  { user: "Lisa Assistant", action: "Logged in", time: "2 hours ago", type: "login" },
  { user: "Tom Analyst", action: "Password changed", time: "3 hours ago", type: "security" },
  { user: "John Director", action: "Invited new team member", time: "Yesterday", type: "account" },
];

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [teamSearch, setTeamSearch] = useState("");

  const filteredMembers = teamMembers.filter(m =>
    !teamSearch || m.name.toLowerCase().includes(teamSearch.toLowerCase()) || m.email.toLowerCase().includes(teamSearch.toLowerCase()) || m.role.toLowerCase().includes(teamSearch.toLowerCase())
  );

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "login": return <Badge variant="secondary">Login</Badge>;
      case "role_change": return <Badge className="bg-blue-500/10 text-blue-500">Role Change</Badge>;
      case "account": return <Badge className="bg-green-500/10 text-green-500">Account</Badge>;
      case "security": return <Badge className="bg-yellow-500/10 text-yellow-600">Security</Badge>;
      default: return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10"><Users className="w-6 h-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>
        <p className="text-muted-foreground">Manage user accounts and role assignments</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList variant="pills" className="mb-6">
          <TabsTrigger variant="pills" value="team">Team Members</TabsTrigger>
          <TabsTrigger variant="pills" value="roles">Roles</TabsTrigger>
          <TabsTrigger variant="pills" value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="team">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Team Members</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input value={teamSearch} onChange={e => setTeamSearch(e.target.value)} placeholder="Search team..." className="pl-9 h-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMembers.map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border">
                    <div className="flex items-center gap-3">
                      <Avatar><AvatarFallback className="bg-primary/10 text-primary">{member.initials}</AvatarFallback></Avatar>
                      <div><p className="font-medium">{member.name}</p><p className="text-sm text-muted-foreground">{member.email}</p></div>
                    </div>
                    <Badge variant="outline">{member.role}</Badge>
                  </div>
                ))}
                {filteredMembers.length === 0 && <p className="text-center text-muted-foreground py-4">No team members match your search</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card className="border border-border shadow-sm">
            <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><UserCog className="w-5 h-5 text-primary" />Role Management</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { role: "Super Admin", permissions: "Full system access", count: 1 },
                  { role: "Director", permissions: "Manage all operations", count: 2 },
                  { role: "Executive Manager", permissions: "Team & client management", count: 3 },
                  { role: "Account Manager", permissions: "Client account management", count: 5 },
                  { role: "Client", permissions: "View own services", count: 124 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border">
                    <div><p className="font-medium">{item.role}</p><p className="text-sm text-muted-foreground">{item.permissions}</p></div>
                    <Badge variant="secondary">{item.count} users</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="border border-border shadow-sm">
            <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Activity className="w-5 h-5 text-primary" />Recent Activity</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activityLog.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border">
                    <div className="flex items-center gap-3">
                      {getActivityBadge(entry.type)}
                      <div><p className="font-medium">{entry.user}</p><p className="text-sm text-muted-foreground">{entry.action}</p></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{entry.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default UsersPage;
