import { useState } from "react";
import { FormInput, Plus, Grip } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data
const mockAccountFields = [
  { id: 1, name: "Industry", type: "Dropdown", required: true },
  { id: 2, name: "Annual Revenue", type: "Currency", required: false },
  { id: 3, name: "Fiscal Year End", type: "Date", required: true },
  { id: 4, name: "Tax ID", type: "Text", required: true },
];

const mockContactFields = [
  { id: 1, name: "Preferred Contact Method", type: "Dropdown", required: false },
  { id: 2, name: "Birthday", type: "Date", required: false },
  { id: 3, name: "LinkedIn URL", type: "URL", required: false },
];

const CustomFieldsPage = () => {
  const [activeTab, setActiveTab] = useState("account");

  const fields = activeTab === "account" ? mockAccountFields : mockContactFields;

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader
            title="Custom Fields"
            description="Define custom data fields for accounts and contacts"
            icon={<FormInput className="w-6 h-6" />}
          />
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Field
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="pills">
            <TabsTrigger value="account" variant="pills">
              Account ({mockAccountFields.length})
            </TabsTrigger>
            <TabsTrigger value="contact" variant="pills">
              Contact ({mockContactFields.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-3">
              {fields.map((field) => (
                <Card key={field.id} className="cursor-pointer hover:bg-muted/30 transition-colors">
                  <CardContent className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <Grip className="w-4 h-4 text-muted-foreground cursor-grab" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{field.name}</span>
                          {field.required && (
                            <Badge variant="secondary" className="text-xs">Required</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{field.type}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {fields.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="p-4 bg-muted rounded-full mb-4">
                      <FormInput className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No custom fields</h3>
                    <p className="text-muted-foreground max-w-md">
                      Add custom fields to capture additional information for your {activeTab}s.
                    </p>
                    <Button className="mt-6">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Field
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
};

export default CustomFieldsPage;
