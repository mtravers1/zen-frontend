import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Mail, Send, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CommunicationsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const communications = [
    {
      id: 1,
      type: "Email",
      subject: "Tax Return Reminder",
      recipient: "John Smith",
      status: "sent",
      date: "2024-01-15",
    },
    {
      id: 2,
      type: "SMS",
      subject: "Appointment Confirmation",
      recipient: "Sarah Johnson",
      status: "delivered",
      date: "2024-01-15",
    },
    {
      id: 3,
      type: "Email",
      subject: "Invoice #1234",
      recipient: "Michael Brown",
      status: "pending",
      date: "2024-01-14",
    },
    {
      id: 4,
      type: "Email",
      subject: "Document Request",
      recipient: "Emily Davis",
      status: "failed",
      date: "2024-01-14",
    },
    {
      id: 5,
      type: "SMS",
      subject: "Payment Received",
      recipient: "Robert Wilson",
      status: "delivered",
      date: "2024-01-13",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Send className="w-3 h-3" />
            Sent
          </Badge>
        );
      case "delivered":
        return (
          <Badge className="bg-green-500/10 text-green-500 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Delivered
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<Mail className="w-5 h-5 text-primary" />}
          title="Communications"
          description="Manage client emails, SMS, and notifications"
        />

        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="sms">SMS</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button>
              <Send className="w-4 h-4 mr-2" />
              New Message
            </Button>
          </div>
        </div>

        <PageToolbar
          onSearchChange={() => {}}
          searchPlaceholder="Search communications..."
          showFilter={true}
        />

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {communications
                  .filter((c) => activeTab === "all" || c.type.toLowerCase() === activeTab)
                  .map((comm) => (
                    <TableRow key={comm.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <Badge variant="outline">{comm.type}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{comm.subject}</TableCell>
                      <TableCell>{comm.recipient}</TableCell>
                      <TableCell>{getStatusBadge(comm.status)}</TableCell>
                      <TableCell className="text-muted-foreground">{comm.date}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  );
};

export default CommunicationsPage;
