'use client'

import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, BookOpen, FileText, GraduationCap, Video, ExternalLink, Download, Lightbulb } from "lucide-react";
import { toast } from "sonner";

const adminGuides = [
  { id: 1, title: "Admin Dashboard Overview", description: "Complete guide to the admin dashboard layout, navigation, and key features.", category: "Getting Started" },
  { id: 2, title: "Managing User Roles & Permissions", description: "How to assign roles, manage access levels, and audit user permissions.", category: "User Management" },
  { id: 3, title: "Configuring Firm Settings", description: "Set up your firm name, branding, notification preferences, and defaults.", category: "Configuration" },
  { id: 4, title: "Invoice & Billing Management", description: "Create, edit, and manage invoices, recurring billing, and payment tracking.", category: "Billing" },
  { id: 5, title: "Workflow & Pipeline Setup", description: "Configure job pipelines, task templates, and workflow automation.", category: "Workflow" },
  { id: 6, title: "Document Management Best Practices", description: "Organize client documents, set retention policies, and manage access.", category: "Documents" },
  { id: 7, title: "Integration Setup Guide", description: "Connect QuickBooks, payment processors, and other third-party tools.", category: "Integrations" },
  { id: 8, title: "Reporting & Analytics Guide", description: "Build custom reports, set up dashboards, and configure alert rules.", category: "Reporting" },
];

const endUserDocs = [
  { id: 1, title: "Client Portal User Guide", description: "Help your clients navigate the portal for documents, billing, and messaging." },
  { id: 2, title: "Document Upload Instructions", description: "Step-by-step guide for clients to upload documents securely." },
  { id: 3, title: "Invoice Payment Guide", description: "How clients can view and pay invoices through the portal." },
  { id: 4, title: "Messaging & Support Guide", description: "How clients communicate with your team through secure messaging." },
  { id: 5, title: "Mobile App Quick Start", description: "Getting started with the Zentavos mobile application." },
];

const trainerMaterials = [
  { id: 1, title: "Train-the-Trainer Program Guide", type: "PDF", description: "Comprehensive curriculum for training team members on the platform." },
  { id: 2, title: "Onboarding Presentation Deck", type: "PPTX", description: "Slide deck for new employee onboarding sessions." },
  { id: 3, title: "Feature Walkthrough Scripts", type: "PDF", description: "Step-by-step scripts for demonstrating key features." },
  { id: 4, title: "Webinar: Advanced Workflow Setup", type: "Recording", description: "Recorded webinar on advanced workflow configuration." },
  { id: 5, title: "Assessment Quiz Template", type: "PDF", description: "Quiz template to verify team member comprehension." },
  { id: 6, title: "Client Onboarding Webinar Kit", type: "Bundle", description: "Complete kit for running client onboarding webinars." },
];

const faqs = [
  { q: "How do I reset a client's password?", a: "Navigate to Users, find the client, and click 'Reset Password'. An email will be sent to the client with instructions." },
  { q: "How do I change a user's role?", a: "Go to Users, select the team member, and use the role dropdown to assign a new role. Changes take effect immediately." },
  { q: "How do I export data from a report?", a: "Open the report, click the Export button in the top-right corner, and choose CSV or PDF format." },
  { q: "How do I set up recurring invoices?", a: "Go to Billing > Recurring Invoices, click 'New Recurring Invoice', configure the schedule and line items." },
  { q: "Where can I find the audit log?", a: "Navigate to the Audit Log page under the Security section in the admin sidebar." },
];

const HelpCenter = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("admin");

  return (
    <div className="space-y-6">
      <DashboardPageHeader title="Help Center" description="Training guides, documentation, and support materials" />

      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search help articles, guides, and FAQs..." className="pl-9" />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="admin"><BookOpen className="w-4 h-4 mr-2" />Admin Guides</TabsTrigger>
          <TabsTrigger value="enduser"><FileText className="w-4 h-4 mr-2" />End-User Docs</TabsTrigger>
          <TabsTrigger value="trainer"><GraduationCap className="w-4 h-4 mr-2" />Trainer Materials</TabsTrigger>
          <TabsTrigger value="faq"><Lightbulb className="w-4 h-4 mr-2" />FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="admin" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adminGuides.filter(g => !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.description.toLowerCase().includes(search.toLowerCase())).map(guide => (
              <Card key={guide.id} className="border border-border hover:shadow-sm transition-shadow">
                <CardContent className="p-5">
                  <Badge variant="outline" className="text-xs mb-2">{guide.category}</Badge>
                  <h3 className="font-semibold text-foreground mb-1">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                  <Button size="sm" variant="outline" onClick={() => toast.success(`Opening "${guide.title}"`)}>
                    <ExternalLink className="w-4 h-4 mr-2" />Read Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enduser" className="mt-6">
          <div className="space-y-3">
            {endUserDocs.filter(d => !search || d.title.toLowerCase().includes(search.toLowerCase())).map(doc => (
              <Card key={doc.id} className="border border-border">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{doc.title}</h3>
                    <p className="text-xs text-muted-foreground">{doc.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast.success(`Downloading "${doc.title}"`)}>
                      <Download className="w-4 h-4 mr-2" />Download
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => toast.success(`Opening "${doc.title}"`)}>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trainer" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainerMaterials.filter(m => !search || m.title.toLowerCase().includes(search.toLowerCase())).map(material => (
              <Card key={material.id} className="border border-border hover:shadow-sm transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    {material.type === "Recording" ? <Video className="w-4 h-4 text-primary" /> : <FileText className="w-4 h-4 text-primary" />}
                    <Badge variant="outline" className="text-xs">{material.type}</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{material.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{material.description}</p>
                  <Button size="sm" variant="outline" onClick={() => toast.success(`Accessing "${material.title}"`)}>
                    <Download className="w-4 h-4 mr-2" />{material.type === "Recording" ? "Watch" : "Download"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="mt-6">
          <Card className="border border-border">
            <CardContent className="p-6">
              <Accordion type="single" collapsible>
                {faqs.filter(f => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())).map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-sm font-medium">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpCenter;
