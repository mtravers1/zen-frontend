import { X, Mail, Phone, Building2, Calendar, MessageSquare, Tag, Globe } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

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

interface LeadDetailPanelProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
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

const LeadDetailPanel = ({ lead, open, onClose }: LeadDetailPanelProps) => {
  if (!lead) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-card border-border overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-xl">{lead.name}</SheetTitle>
              {lead.company && (
                <p className="text-sm text-muted-foreground mt-1">{lead.company}</p>
              )}
            </div>
            {getStatusBadge(lead.status)}
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Contact Information</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-primary">{lead.email}</p>
                </div>
              </a>
              {lead.phone && (
                <a
                  href={`tel:${lead.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{lead.phone}</p>
                  </div>
                </a>
              )}
              {lead.company && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Building2 className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Company</p>
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Lead Details */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Lead Details</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Interest</p>
                  <p className="text-sm font-medium">{lead.service_interest || "General"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="text-sm font-medium">{formatSource(lead.source)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 col-span-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm font-medium">
                    {format(new Date(lead.created_at), "MMMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          {lead.message && (
            <>
              <Separator className="bg-border" />
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </h4>
                <div className="p-4 rounded-lg bg-muted/30 border border-border">
                  <p className="text-sm whitespace-pre-wrap">{lead.message}</p>
                </div>
              </div>
            </>
          )}

          <Separator className="bg-border" />

          {/* Quick Actions */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h4>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="justify-start">
                <a href={`mailto:${lead.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </a>
              </Button>
              {lead.phone && (
                <Button asChild variant="outline" className="justify-start">
                  <a href={`tel:${lead.phone}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call Lead
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LeadDetailPanel;
