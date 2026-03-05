import { Mail, Phone, Eye, Loader2 } from "lucide-react";
import { format } from "date-fns";
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
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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

interface LeadListViewProps {
  leads: Lead[];
  loading: boolean;
  updating: string | null;
  canUpdate: boolean;
  onStatusUpdate: (id: string, status: string) => void;
  onViewDetails: (lead: Lead) => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "new":
      return <Badge className="bg-accent/20 text-accent border-accent/30">New</Badge>;
    case "contacted":
      return <Badge className="bg-sky-500/20 text-sky-400 border-sky-500/30">Contacted</Badge>;
    case "qualified":
      return <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30">Qualified</Badge>;
    case "converted":
      return <Badge className="bg-primary/20 text-primary border-primary/30">Converted</Badge>;
    case "lost":
      return <Badge className="bg-muted text-muted-foreground">Lost</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const formatSource = (source: string) => {
  return source
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const LeadListView = ({
  leads,
  loading,
  updating,
  canUpdate,
  onStatusUpdate,
  onViewDetails,
}: LeadListViewProps) => {
  if (loading) {
    return (
      <Card className="glass-effect border-border/50">
        <CardContent className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (leads.length === 0) {
    return (
      <Card className="glass-effect border-border/50">
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">
            No leads found. Leads submitted through the contact form will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-border/50">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Contact</TableHead>
                <TableHead className="text-muted-foreground">Interest</TableHead>
                <TableHead className="text-muted-foreground">Source</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="border-border/50 hover:bg-muted/30">
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
                    {formatSource(lead.source)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(lead.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>{getStatusBadge(lead.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 justify-end">
                      {canUpdate && (
                        <Select
                          value={lead.status}
                          onValueChange={(value) => onStatusUpdate(lead.id, value)}
                          disabled={updating === lead.id}
                        >
                          <SelectTrigger className="w-[110px] h-8 text-xs bg-card border-border">
                            {updating === lead.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <SelectValue />
                            )}
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="converted">Converted</SelectItem>
                            <SelectItem value="lost">Lost</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onViewDetails(lead)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadListView;
