import { useState } from "react";
import { Users, UserCog, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("team");

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>
        <p className="text-muted-foreground">
          Manage user accounts and role assignments
        </p>
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
              <CardTitle className="text-lg">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Director", email: "john@zentavos.com", role: "Director", initials: "JD" },
                  { name: "Sarah Manager", email: "sarah@zentavos.com", role: "Executive Manager", initials: "SM" },
                  { name: "Mike Account", email: "mike@zentavos.com", role: "Account Manager", initials: "MA" },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{member.role}</Badge>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Full team management features coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserCog className="w-5 h-5 text-primary" />
                Role Management
              </CardTitle>
            </CardHeader>
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
                    <div>
                      <p className="font-medium">{item.role}</p>
                      <p className="text-sm text-muted-foreground">{item.permissions}</p>
                    </div>
                    <Badge variant="secondary">{item.count} users</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Activity tracking coming soon. This will show:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>User login history</li>
                <li>Role changes</li>
                <li>Account modifications</li>
                <li>Security events</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersPage;
