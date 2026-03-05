import { useEffect, useState } from "react";
import { FileText, Mail, Phone, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  service_interest: string | null;
  source: string;
  status: string;
  created_at: string;
}

const LeadsTable = () => {
  const { isStaff, isManagerOrAbove } = useDashboardAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (!isStaff()) return;
    fetchLeads();
  }, [isStaff]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    if (!isManagerOrAbove()) {
      toast.error("You don't have permission to update leads");
      return;
    }

    setUpdating(id);
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
      );
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-accent/20 text-accent-foreground border-accent/30">New</Badge>;
      case "contacted":
        return <Badge className="bg-secondary text-secondary-foreground border-border">Contacted</Badge>;
      case "qualified":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Qualified</Badge>;
      case "converted":
        return <Badge className="bg-primary text-primary-foreground">Converted</Badge>;
      case "lost":
        return <Badge className="bg-muted text-muted-foreground">Lost</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredLeads = filter === "all" 
    ? leads 
    : leads.filter((lead) => lead.status === filter);

  if (!isStaff()) return null;

  if (loading) {
    return (
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-primary" />
            Leads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-primary" />
            Leads
          </CardTitle>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredLeads.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No leads to display.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  {isManagerOrAbove() && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        {lead.company && (
                          <p className="text-xs text-muted-foreground">{lead.company}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </a>
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                          >
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {lead.service_interest || "General"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(lead.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    {isManagerOrAbove() && (
                      <TableCell>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => updateStatus(lead.id, value)}
                          disabled={updating === lead.id}
                        >
                          <SelectTrigger className="w-[120px]">
                            {updating === lead.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <SelectValue />
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="converted">Converted</SelectItem>
                            <SelectItem value="lost">Lost</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadsTable;
