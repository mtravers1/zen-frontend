import { useState } from "react";
import { Briefcase, Plus, Archive, RotateCcw } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import NewServiceTemplateDialog from "@/components/dashboard/dialogs/NewServiceTemplateDialog";
import { toast } from "sonner";

const initialServices = [
  { id: 1, name: "Tax Preparation", category: "Tax", price: 500, status: "active", clients: 45 },
  { id: 2, name: "Bookkeeping Monthly", category: "Accounting", price: 300, status: "active", clients: 32 },
  { id: 3, name: "Audit Services", category: "Audit", price: 2500, status: "active", clients: 12 },
  { id: 4, name: "Payroll Processing", category: "Payroll", price: 150, status: "archived", clients: 0 },
  { id: 5, name: "CFO Advisory", category: "Advisory", price: 1500, status: "active", clients: 8 },
];

const ServicesTemplatesPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchValue, setSearchValue] = useState("");
  const [services, setServices] = useState(initialServices);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredServices = services.filter((s) => {
    const matchesTab = s.status === activeTab;
    const matchesSearch = s.name.toLowerCase().includes(searchValue.toLowerCase()) || s.category.toLowerCase().includes(searchValue.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const activeCount = services.filter((s) => s.status === "active").length;
  const archivedCount = services.filter((s) => s.status === "archived").length;

  const handleAdd = (data: { name: string; category: string; price: number }) => {
    const newId = Math.max(0, ...services.map((s) => s.id)) + 1;
    setServices((prev) => [...prev, { id: newId, ...data, status: "active", clients: 0 }]);
    toast.success(`Service "${data.name}" added`);
  };

  const toggleArchive = (id: number) => {
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, status: s.status === "active" ? "archived" : "active" } : s));
    toast.success("Service status updated");
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader title="Services" description="Manage your service offerings and pricing" icon={<Briefcase className="w-6 h-6" />} />
          <Button onClick={() => setDialogOpen(true)}><Plus className="w-4 h-4 mr-2" />Add Service</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="pills">
            <TabsTrigger value="active" variant="pills">Active ({activeCount})</TabsTrigger>
            <TabsTrigger value="archived" variant="pills">Archived ({archivedCount})</TabsTrigger>
          </TabsList>
          <div className="mt-6"><PageToolbar searchValue={searchValue} onSearchChange={setSearchValue} searchPlaceholder="Search services..." showFilter /></div>
          <TabsContent value={activeTab} className="mt-4">
            <div className="border rounded-lg bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-center">Active Clients</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell><Badge variant="secondary">{service.category}</Badge></TableCell>
                      <TableCell className="text-right">${service.price.toLocaleString()}</TableCell>
                      <TableCell className="text-center">{service.clients}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleArchive(service.id)} title={service.status === "active" ? "Archive" : "Restore"}>
                          {service.status === "active" ? <Archive className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <NewServiceTemplateDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleAdd} />
    </>
  );
};

export default ServicesTemplatesPage;
