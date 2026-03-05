import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Globe, Palette, Layout, Eye, Smartphone, Monitor, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SiteBuilderPage = () => {
  const templates = [
    { id: 1, name: "Modern Clean", preview: "Clean and professional layout" },
    { id: 2, name: "Classic Corporate", preview: "Traditional business design" },
    { id: 3, name: "Bold & Dynamic", preview: "Energetic and engaging style" },
  ];

  return (
      <DashboardPageHeader
        title="Site builder"
        description="Customize your client-facing website"
        icon={<Globe className="w-5 h-5 text-primary" />}
      />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="design" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Design
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Domain Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Domain Settings</CardTitle>
              <CardDescription>Configure your client portal URL.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain</Label>
                <div className="flex items-center gap-2">
                  <Input id="subdomain" placeholder="yourfirm" className="max-w-xs" />
                  <span className="text-muted-foreground">.zentavos.app</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customDomain">Custom Domain</Label>
                <Input id="customDomain" placeholder="clients.yourfirm.com" className="max-w-md" />
                <p className="text-sm text-muted-foreground">
                  Point your domain's CNAME record to portal.zentavos.app
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Site Features */}
          <Card>
            <CardHeader>
              <CardTitle>Site Features</CardTitle>
              <CardDescription>Toggle features on your client portal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Document Portal</p>
                  <p className="text-sm text-muted-foreground">Allow clients to upload and download documents.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Online Payments</p>
                  <p className="text-sm text-muted-foreground">Enable invoice payments through the portal.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Appointment Booking</p>
                  <p className="text-sm text-muted-foreground">Let clients schedule meetings online.</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">Enable real-time chat support.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="space-y-6">
          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose a Template</CardTitle>
              <CardDescription>Select a base template for your client portal.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
                  >
                    <div className="aspect-video bg-secondary rounded mb-3 flex items-center justify-center">
                      <Layout className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-muted-foreground">{template.preview}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Branding */}
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>Customize colors and branding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex items-center gap-2">
                  <input type="color" defaultValue="#7c3aed" className="w-10 h-10 rounded cursor-pointer" />
                  <Input defaultValue="#7c3aed" className="max-w-32" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <p className="text-muted-foreground">Drop your logo here or click to upload</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Upload Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>See how your site looks to clients.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Smartphone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in New Tab
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Preview will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button>Save & Publish</Button>
      </div>
  );
};

export default SiteBuilderPage;
