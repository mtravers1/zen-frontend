import { useState, useEffect, useMemo } from "react";
import { MessageSquare, Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

interface ServiceInquiry {
  id: string; name: string; email: string; phone: string | null; message: string; status: string; created_at: string;
  service: { name: string } | null;
}

const InquiriesPage = () => {
  const { isStaff, isManagerOrAbove } = useAuth();
  const [inquiries, setInquiries] = useState<ServiceInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => { if (!isStaff()) return; fetchInquiries(); }, [isStaff]);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase.from("service_inquiries").select(`id, name, email, phone, message, status, created_at, service:services(name)`).order("created_at", { ascending: false });
      if (error) throw error;
      const transformedData = (data || []).map((item) => ({ ...item, service: Array.isArray(item.service) ? item.service[0] : item.service })) as ServiceInquiry[];
      setInquiries(transformedData);
    } catch (error) { console.error("Error fetching inquiries:", error); } finally { setLoading(false); }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    if (!isManagerOrAbove()) { toast.error("You don't have permission to update inquiries"); return; }
    setUpdating(id);
    try {
      const { error } = await supabase.from("service_inquiries").update({ status: newStatus }).eq("id", id);
      if (error) throw error;
      setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq)));
      toast.success("Status updated successfully");
    } catch (error) { console.error("Error updating status:", error); toast.error("Failed to update status"); } finally { setUpdating(null); }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new": return <Badge className="bg-accent/20 text-accent-foreground border-accent/30">New</Badge>;
      case "in_progress": return <Badge className="bg-primary/20 text-primary border-primary/30">In Progress</Badge>;
      case "closed": return <Badge className="bg-muted text-muted-foreground">Closed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesTab = activeTab === "all" || inq.status === activeTab;
      const matchesSearch = !searchValue || inq.name.toLowerCase().includes(searchValue.toLowerCase()) || inq.email.toLowerCase().includes(searchValue.toLowerCase()) || (inq.service?.name || "").toLowerCase().includes(searchValue.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [inquiries, activeTab, searchValue]);

  const counts = useMemo(() => ({ all: inquiries.length, new: inquiries.filter((i) => i.status === "new").length, in_progress: inquiries.filter((i) => i.status === "in_progress").length, closed: inquiries.filter((i) => i.status === "closed").length }), [inquiries]);

  if (!isStaff()) return null;

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10"><MessageSquare className="w-6 h-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">Service Inquiries</h1>
        </div>
        <p className="text-muted-foreground">Review and respond to service inquiries from clients</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList variant="pills">
            <TabsTrigger variant="pills" value="all">All {counts.all > 0 && <span className="ml-1.5 text-xs">({counts.all})</span>}</TabsTrigger>
            <TabsTrigger variant="pills" value="new">New {counts.new > 0 && <span className="ml-1.5 text-xs">({counts.new})</span>}</TabsTrigger>
            <TabsTrigger variant="pills" value="in_progress">In Progress {counts.in_progress > 0 && <span className="ml-1.5 text-xs">({counts.in_progress})</span>}</TabsTrigger>
            <TabsTrigger variant="pills" value="closed">Resolved {counts.closed > 0 && <span className="ml-1.5 text-xs">({counts.closed})</span>}</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search inquiries..." className="pl-9 h-9" />
        </div>
      </div>

      {loading ? (
        <Card className="border border-border shadow-sm"><CardContent className="p-6"><Skeleton className="h-64 w-full" /></CardContent></Card>
      ) : filteredInquiries.length === 0 ? (
        <Card className="border border-border shadow-sm"><CardContent className="p-6"><div className="text-center py-8 text-muted-foreground">No inquiries to display.</div></CardContent></Card>
      ) : (
        <Card className="border border-border shadow-sm"><CardContent className="p-6"><div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Service</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead>{isManagerOrAbove() && <TableHead>Actions</TableHead>}</TableRow></TableHeader>
            <TableBody>
              {filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell><div><p className="font-medium">{inquiry.name}</p><p className="text-xs text-muted-foreground">{inquiry.email}</p></div></TableCell>
                  <TableCell>{inquiry.service?.name || "N/A"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{format(new Date(inquiry.created_at), "MMM d, yyyy")}</TableCell>
                  <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                  {isManagerOrAbove() && (
                    <TableCell>
                      <Select value={inquiry.status} onValueChange={(value) => updateStatus(inquiry.id, value)} disabled={updating === inquiry.id}>
                        <SelectTrigger className="w-[120px]">{updating === inquiry.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <SelectValue />}</SelectTrigger>
                        <SelectContent><SelectItem value="new">New</SelectItem><SelectItem value="in_progress">In Progress</SelectItem><SelectItem value="closed">Closed</SelectItem></SelectContent>
                      </Select>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div></CardContent></Card>
      )}
    </>
  );
};

export default InquiriesPage;
