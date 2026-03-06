'use client'

import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Search, Download, Activity, User, FileText, Lock, Settings, LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";

const mockAuditLogs = [
  { id: 1, timestamp: "2024-01-20 14:32:05", user: "Michael Travers", action: "login", resource: "Auth", details: "Successful login via email", ip: "192.168.1.1", severity: "info" },
  { id: 2, timestamp: "2024-01-20 14:35:12", user: "Michael Travers", action: "update", resource: "User Roles", details: "Assigned 'account_manager' role to user@test.com", ip: "192.168.1.1", severity: "warning" },
  { id: 3, timestamp: "2024-01-20 14:40:00", user: "Jane Smith", action: "upload", resource: "Documents", details: "Uploaded 'W-2 Form 2024.pdf'", ip: "10.0.0.5", severity: "info" },
  { id: 4, timestamp: "2024-01-20 15:01:33", user: "System", action: "create", resource: "Invoice", details: "Auto-generated recurring invoice #1042", ip: "—", severity: "info" },
  { id: 5, timestamp: "2024-01-20 15:15:00", user: "user@test.com", action: "login_failed", resource: "Auth", details: "Failed login attempt (invalid password)", ip: "203.0.113.50", severity: "critical" },
  { id: 6, timestamp: "2024-01-20 15:20:45", user: "Michael Travers", action: "delete", resource: "Lead", details: "Deleted lead record #LD-1089", ip: "192.168.1.1", severity: "warning" },
  { id: 7, timestamp: "2024-01-20 15:30:00", user: "Jane Smith", action: "download", resource: "Documents", details: "Downloaded 'Tax Return 2023 FINAL.pdf'", ip: "10.0.0.5", severity: "info" },
  { id: 8, timestamp: "2024-01-20 16:00:00", user: "Michael Travers", action: "update", resource: "Settings", details: "Updated firm notification preferences", ip: "192.168.1.1", severity: "info" },
  { id: 9, timestamp: "2024-01-20 16:10:22", user: "user@test.com", action: "login", resource: "Auth", details: "Successful login via email", ip: "203.0.113.50", severity: "info" },
  { id: 10, timestamp: "2024-01-20 16:15:00", user: "user@test.com", action: "update", resource: "Profile", details: "Updated profile phone number", ip: "203.0.113.50", severity: "info" },
  { id: 11, timestamp: "2024-01-20 17:00:00", user: "System", action: "backup", resource: "Database", details: "Automated daily backup completed", ip: "—", severity: "info" },
  { id: 12, timestamp: "2024-01-20 17:30:00", user: "Michael Travers", action: "logout", resource: "Auth", details: "User logged out", ip: "192.168.1.1", severity: "info" },
];

const AuditLog = () => {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filtered = mockAuditLogs.filter(log => {
    const matchesSearch = !search || log.user.toLowerCase().includes(search.toLowerCase()) || log.details.toLowerCase().includes(search.toLowerCase()) || log.resource.toLowerCase().includes(search.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    return matchesSearch && matchesAction && matchesSeverity;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical": return <Badge variant="destructive" className="text-xs">Critical</Badge>;
      case "warning": return <Badge className="text-xs bg-yellow-500/10 text-yellow-600 border-yellow-300">Warning</Badge>;
      default: return <Badge variant="outline" className="text-xs">Info</Badge>;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "login": return <LogIn className="w-4 h-4 text-green-500" />;
      case "logout": return <LogOut className="w-4 h-4 text-muted-foreground" />;
      case "login_failed": return <Lock className="w-4 h-4 text-destructive" />;
      case "update": return <Settings className="w-4 h-4 text-blue-500" />;
      case "upload": case "download": return <FileText className="w-4 h-4 text-primary" />;
      case "delete": return <Activity className="w-4 h-4 text-destructive" />;
      default: return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader title="Audit Log" description="Security and compliance event tracking" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3"><Shield className="w-8 h-8 text-primary" /><div><p className="text-2xl font-bold">{mockAuditLogs.length}</p><p className="text-xs text-muted-foreground">Total Events</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><LogIn className="w-8 h-8 text-green-500" /><div><p className="text-2xl font-bold">{mockAuditLogs.filter(l => l.action === "login").length}</p><p className="text-xs text-muted-foreground">Logins</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Lock className="w-8 h-8 text-destructive" /><div><p className="text-2xl font-bold">{mockAuditLogs.filter(l => l.severity === "critical").length}</p><p className="text-xs text-muted-foreground">Critical Events</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><User className="w-8 h-8 text-blue-500" /><div><p className="text-2xl font-bold">{new Set(mockAuditLogs.map(l => l.user)).size}</p><p className="text-xs text-muted-foreground">Unique Users</p></div></CardContent></Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by user, resource, or details..." className="pl-9 h-9" />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-40 h-9"><SelectValue placeholder="Action" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="login">Login</SelectItem>
            <SelectItem value="logout">Logout</SelectItem>
            <SelectItem value="login_failed">Failed Login</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="upload">Upload</SelectItem>
            <SelectItem value="download">Download</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="backup">Backup</SelectItem>
          </SelectContent>
        </Select>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Severity" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severity</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={() => toast.success("Audit log exported")} className="h-9">
          <Download className="w-4 h-4 mr-2" />Export
        </Button>
      </div>

      {/* Table */}
      <Card className="border border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(log => (
                <TableRow key={log.id}>
                  <TableCell>{getActionIcon(log.action)}</TableCell>
                  <TableCell className="text-xs whitespace-nowrap font-mono">{log.timestamp}</TableCell>
                  <TableCell className="text-sm font-medium">{log.user}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs capitalize">{log.action.replace("_", " ")}</Badge></TableCell>
                  <TableCell className="text-sm">{log.resource}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{log.details}</TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">{log.ip}</TableCell>
                  <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">No audit events found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLog;
