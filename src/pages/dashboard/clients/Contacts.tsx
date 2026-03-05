import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Contact, Plus, Download, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ContactsPage = () => {
  const contacts = [
    {
      id: 1,
      name: "John Smith",
      initials: "JS",
      account: "Smith Corporation",
      role: "CEO",
      email: "john@smithcorp.com",
      phone: "(555) 123-4567",
      isPrimary: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      initials: "SJ",
      account: "Johnson LLC",
      role: "CFO",
      email: "sarah@johnsonllc.com",
      phone: "(555) 234-5678",
      isPrimary: true,
    },
    {
      id: 3,
      name: "Michael Brown",
      initials: "MB",
      account: "Brown & Associates",
      role: "Partner",
      email: "michael@brownassoc.com",
      phone: "(555) 345-6789",
      isPrimary: true,
    },
    {
      id: 4,
      name: "Emily Davis",
      initials: "ED",
      account: "Smith Corporation",
      role: "Controller",
      email: "emily@smithcorp.com",
      phone: "(555) 456-7890",
      isPrimary: false,
    },
    {
      id: 5,
      name: "Robert Wilson",
      initials: "RW",
      account: "Wilson Group",
      role: "Owner",
      email: "robert@wilsongroup.com",
      phone: "(555) 567-8901",
      isPrimary: true,
    },
  ];

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<Contact className="w-5 h-5 text-primary" />}
          title="Contacts"
          description="Manage client contacts and relationships"
        />

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {contacts.length} contacts
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Contact
            </Button>
          </div>
        </div>

        <PageToolbar
          onSearchChange={() => {}}
          searchPlaceholder="Search contacts..."
          showFilter={true}
        />

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Primary</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{contact.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{contact.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-primary hover:underline cursor-pointer">
                      {contact.account}
                    </TableCell>
                    <TableCell>{contact.role}</TableCell>
                    <TableCell className="text-muted-foreground">{contact.email}</TableCell>
                    <TableCell className="text-muted-foreground">{contact.phone}</TableCell>
                    <TableCell>
                      {contact.isPrimary && (
                        <Badge className="bg-primary/10 text-primary">Primary</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  );
};

export default ContactsPage;
