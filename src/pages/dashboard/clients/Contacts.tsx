import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import NewContactForm from "@/components/dashboard/forms/NewContactForm";
import ClientFilterPanel from "@/components/dashboard/forms/ClientFilterPanel";
import { Contact, Download, Mail, Phone } from "lucide-react";
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
import { NewContactFormValues, ClientFilterValues } from "@/lib/dashboard-schemas";

interface ContactRecord {
  id: number;
  name: string;
  initials: string;
  account: string;
  role: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

const INITIAL_CONTACTS: ContactRecord[] = [
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

const ContactsPage = () => {
  const [contacts, setContacts] = useState<ContactRecord[]>(INITIAL_CONTACTS);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<ClientFilterValues>({});
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const handleNewContact = (values: NewContactFormValues) => {
    const fullName = `${values.firstName} ${values.lastName}`;
    const initials = `${values.firstName[0]}${values.lastName[0]}`.toUpperCase();
    const newContact: ContactRecord = {
      id: contacts.length + 1,
      name: fullName,
      initials,
      account: values.account,
      role: values.role,
      email: values.email,
      phone: values.phone,
      isPrimary: values.isPrimary,
    };
    setContacts((prev) => [newContact, ...prev]);
  };

  const handleFilterApply = (newFilters: ClientFilterValues) => {
    setFilters(newFilters);
    const count = Object.values(newFilters).filter(
      (v) => v && v !== "all" && v !== ""
    ).length;
    setActiveFilterCount(count);
  };

  const handleFilterReset = () => {
    setFilters({});
    setActiveFilterCount(0);
  };

  const filteredContacts = contacts.filter((contact) => {
    if (searchValue) {
      const q = searchValue.toLowerCase();
      const matchesSearch =
        contact.name.toLowerCase().includes(q) ||
        contact.email.toLowerCase().includes(q) ||
        contact.account.toLowerCase().includes(q) ||
        contact.role.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (filters.assignee && filters.assignee !== "all" && contact.account !== filters.assignee)
      return false;

    return true;
  });

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={<Contact className="w-5 h-5 text-primary" />}
        title="Contacts"
        description="Manage client contacts and relationships"
      />

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredContacts.length} of {contacts.length} contacts
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <NewContactForm onSubmit={handleNewContact} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <PageToolbar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            searchPlaceholder="Search contacts by name, email, account, or role..."
          />
        </div>
        <ClientFilterPanel
          onApply={handleFilterApply}
          onReset={handleFilterReset}
          activeFilterCount={activeFilterCount}
        />
      </div>

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
              {filteredContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No contacts found. Try adjusting your search or filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts.map((contact) => (
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
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactsPage;
