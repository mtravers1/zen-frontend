import { useState } from "react";
import { Tag, Plus, Sparkles, Trash2 } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import NewTagDialog from "@/components/dashboard/dialogs/NewTagDialog";
import { toast } from "sonner";

const initialYourTags = [
  { id: 1, name: "VIP Client", color: "bg-yellow-500", count: 12 },
  { id: 2, name: "High Priority", color: "bg-red-500", count: 8 },
  { id: 3, name: "Referral Source", color: "bg-blue-500", count: 15 },
  { id: 4, name: "New Client", color: "bg-green-500", count: 6 },
];

const mockAITags = [
  { id: 101, name: "Likely to Churn", color: "bg-orange-500", count: 3 },
  { id: 102, name: "Upsell Opportunity", color: "bg-purple-500", count: 7 },
  { id: 103, name: "Engaged", color: "bg-emerald-500", count: 24 },
];

const TagsPage = () => {
  const [activeTab, setActiveTab] = useState("your");
  const [searchValue, setSearchValue] = useState("");
  const [yourTags, setYourTags] = useState(initialYourTags);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getTags = () => {
    switch (activeTab) {
      case "your": return yourTags;
      case "ai": return mockAITags;
      case "all": return [...yourTags, ...mockAITags];
      default: return [];
    }
  };

  const filteredTags = getTags().filter((tag) => tag.name.toLowerCase().includes(searchValue.toLowerCase()));

  const handleCreate = (data: { name: string; color: string }) => {
    const newId = Math.max(0, ...yourTags.map((t) => t.id)) + 1;
    setYourTags((prev) => [...prev, { id: newId, name: data.name, color: data.color, count: 0 }]);
    toast.success(`Tag "${data.name}" created`);
  };

  const handleDelete = (id: number) => {
    setYourTags((prev) => prev.filter((t) => t.id !== id));
    toast.success("Tag deleted");
  };

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader title="Tags" description="Organize and categorize your accounts with tags" icon={<Tag className="w-6 h-6" />} />
          <Button onClick={() => setDialogOpen(true)}><Plus className="w-4 h-4 mr-2" />New Tag</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="pills">
            <TabsTrigger value="your" variant="pills">Your tags ({yourTags.length})</TabsTrigger>
            <TabsTrigger value="ai" variant="pills"><Sparkles className="w-3 h-3 mr-1" />AI tags ({mockAITags.length})</TabsTrigger>
            <TabsTrigger value="all" variant="pills">All ({yourTags.length + mockAITags.length})</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <PageToolbar searchValue={searchValue} onSearchChange={setSearchValue} searchPlaceholder="Search tags..." />
          </div>

          <TabsContent value={activeTab} className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTags.map((tag) => (
                <Card key={tag.id} className="cursor-pointer hover:bg-muted/30 transition-colors group">
                  <CardContent className="py-4 px-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${tag.color}`} />
                        <span className="font-medium">{tag.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{tag.count}</Badge>
                        {activeTab !== "ai" && (
                          <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive" onClick={() => handleDelete(tag.id)}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredTags.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-4 bg-muted rounded-full mb-4"><Tag className="w-12 h-12 text-muted-foreground" /></div>
                  <h3 className="text-lg font-medium mb-2">No tags found</h3>
                  <p className="text-muted-foreground max-w-md">Create tags to organize and categorize your accounts.</p>
                  <Button className="mt-6" onClick={() => setDialogOpen(true)}><Plus className="w-4 h-4 mr-2" />Create Tag</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <NewTagDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleCreate} />
  );
};

export default TagsPage;
