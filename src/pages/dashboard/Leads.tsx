import { useState, useEffect, useMemo } from "react";
import { FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LeadStatsCards from "@/components/dashboard/leads/LeadStatsCards";
import LeadFilters from "@/components/dashboard/leads/LeadFilters";
import LeadListView from "@/components/dashboard/leads/LeadListView";
import LeadDetailPanel from "@/components/dashboard/leads/LeadDetailPanel";

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

const LeadsPage = () => {
  const { isManagerOrAbove } = useDashboardAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Tab and Filters
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("Failed to load leads");
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

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setDetailOpen(true);
  };

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Tab filter (status)
      const matchesTab = activeTab === "all" || lead.status === activeTab;

      // Search filter
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        lead.name.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.company?.toLowerCase().includes(searchLower);

      // Source filter
      const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;

      return matchesTab && matchesSearch && matchesSource;
    });
  }, [leads, activeTab, search, sourceFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter((l) => l.status === "new").length,
      contacted: leads.filter((l) => l.status === "contacted").length,
      qualified: leads.filter((l) => l.status === "qualified").length,
      converted: leads.filter((l) => l.status === "converted").length,
      lost: leads.filter((l) => l.status === "lost").length,
    };
  }, [leads]);

  return (
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Lead Management</h1>
        </div>
        <p className="text-muted-foreground">
          Track and manage all incoming leads from your contact forms
        </p>
      </div>

      <LeadStatsCards stats={stats} loading={loading} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList variant="pills" className="mb-4">
          <TabsTrigger variant="pills" value="all">
            All {stats.total > 0 && <span className="ml-1.5 text-xs">({stats.total})</span>}
          </TabsTrigger>
          <TabsTrigger variant="pills" value="new">
            New {stats.new > 0 && <span className="ml-1.5 text-xs">({stats.new})</span>}
          </TabsTrigger>
          <TabsTrigger variant="pills" value="contacted">
            Contacted {stats.contacted > 0 && <span className="ml-1.5 text-xs">({stats.contacted})</span>}
          </TabsTrigger>
          <TabsTrigger variant="pills" value="qualified">
            Qualified {stats.qualified > 0 && <span className="ml-1.5 text-xs">({stats.qualified})</span>}
          </TabsTrigger>
          <TabsTrigger variant="pills" value="converted">
            Converted {stats.converted > 0 && <span className="ml-1.5 text-xs">({stats.converted})</span>}
          </TabsTrigger>
          <TabsTrigger variant="pills" value="lost">
            Lost {stats.lost > 0 && <span className="ml-1.5 text-xs">({stats.lost})</span>}
          </TabsTrigger>
        </TabsList>

        <LeadFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter="all"
          onStatusFilterChange={() => {}}
          sourceFilter={sourceFilter}
          onSourceFilterChange={setSourceFilter}
          hideStatusFilter
        />

        {filteredLeads.length === 0 && !loading && (search || activeTab !== "all") && (
          <div className="text-center py-8 text-muted-foreground mb-4">
            No leads match your filters. Try adjusting your search.
          </div>
        )}

        <TabsContent value={activeTab} className="mt-0">
          <LeadListView
            leads={filteredLeads}
            loading={loading}
            updating={updating}
            canUpdate={isManagerOrAbove()}
            onStatusUpdate={updateStatus}
            onViewDetails={handleViewDetails}
          />
        </TabsContent>
      </Tabs>

      <LeadDetailPanel
        lead={selectedLead}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
  );
};

export default LeadsPage;
