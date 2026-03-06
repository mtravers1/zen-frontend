'use client'

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search, Video, GraduationCap, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { toast } from "sonner";

interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  video_url: string;
  thumbnail_url: string | null;
  is_free: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

const categories = [
  { value: "onboarding", label: "Onboarding" },
  { value: "documents", label: "Documents" },
  { value: "financial", label: "Financial" },
  { value: "tax", label: "Tax" },
  { value: "business", label: "Business" },
  { value: "workflow", label: "Workflow" },
  { value: "integrations", label: "Integrations" },
  { value: "communications", label: "Communications" },
  { value: "services", label: "Services" },
];

const emptyForm = {
  title: "",
  description: "",
  category: "onboarding",
  duration: "",
  is_free: false,
  is_active: true,
  display_order: 0,
};

const TrainingManager = () => {
  const { user } = useDashboardAuth();
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("training_videos")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      toast.error("Failed to load videos");
    } else {
      setVideos((data as TrainingVideo[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchVideos(); }, []);

  const uploadFile = async (file: File, folder: string) => {
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("training-videos").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("training-videos").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    if (!form.duration.trim()) { toast.error("Duration is required"); return; }
    setSaving(true);

    try {
      let video_url = "";
      let thumbnail_url: string | null = null;

      if (videoFile) {
        video_url = await uploadFile(videoFile, "videos");
      }
      if (thumbnailFile) {
        thumbnail_url = await uploadFile(thumbnailFile, "thumbnails");
      }

      if (editingId) {
        const updateData: Record<string, unknown> = {
          title: form.title,
          description: form.description,
          category: form.category,
          duration: form.duration,
          is_free: form.is_free,
          is_active: form.is_active,
          display_order: form.display_order,
        };
        if (video_url) updateData.video_url = video_url;
        if (thumbnail_url) updateData.thumbnail_url = thumbnail_url;

        const { error } = await supabase
          .from("training_videos")
          .update(updateData)
          .eq("id", editingId);
        if (error) throw error;
        toast.success("Video updated!");
      } else {
        if (!video_url && !videoFile) {
          toast.error("Please upload a video file");
          setSaving(false);
          return;
        }
        const { error } = await supabase.from("training_videos").insert({
          title: form.title,
          description: form.description,
          category: form.category,
          duration: form.duration,
          video_url,
          thumbnail_url,
          is_free: form.is_free,
          is_active: form.is_active,
          display_order: form.display_order,
          uploaded_by: user?.id,
        });
        if (error) throw error;
        toast.success("Video added!");
      }

      setDialogOpen(false);
      setEditingId(null);
      setForm(emptyForm);
      setVideoFile(null);
      setThumbnailFile(null);
      fetchVideos();
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (video: TrainingVideo) => {
    setEditingId(video.id);
    setForm({
      title: video.title,
      description: video.description,
      category: video.category,
      duration: video.duration,
      is_free: video.is_free,
      is_active: video.is_active,
      display_order: video.display_order,
    });
    setVideoFile(null);
    setThumbnailFile(null);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this training video?")) return;
    const { error } = await supabase.from("training_videos").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else { toast.success("Video deleted"); fetchVideos(); }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    const { error } = await supabase.from("training_videos").update({ is_active: !current }).eq("id", id);
    if (error) toast.error("Failed to update");
    else fetchVideos();
  };

  const filtered = videos.filter(v => {
    const matchSearch = !search || v.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "all" || v.category === filterCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-primary" /> Training Manager
          </h1>
          <p className="text-muted-foreground">Upload and manage training videos for clients.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditingId(null); setForm(emptyForm); setVideoFile(null); setThumbnailFile(null); } }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Add Video</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Video" : "Add Training Video"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label>Title *</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Getting Started with Zentavos" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description..." rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Duration *</Label>
                  <Input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="5:30" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Display Order</Label>
                  <Input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))} />
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <div className="flex items-center gap-2">
                    <Switch checked={form.is_free} onCheckedChange={v => setForm(f => ({ ...f, is_free: v }))} />
                    <Label>Free</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={form.is_active} onCheckedChange={v => setForm(f => ({ ...f, is_active: v }))} />
                    <Label>Active</Label>
                  </div>
                </div>
              </div>
              <div>
                <Label>Video File {!editingId && "*"}</Label>
                <Input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files?.[0] || null)} />
              </div>
              <div>
                <Label>Thumbnail (optional)</Label>
                <Input type="file" accept="image/*" onChange={e => setThumbnailFile(e.target.files?.[0] || null)} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update" : "Add Video"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search videos..." className="pl-9" />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Access</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  <Video className="w-8 h-8 mx-auto mb-2 opacity-50" />No training videos found.
                </TableCell></TableRow>
              ) : filtered.map(video => (
                <TableRow key={video.id}>
                  <TableCell className="font-medium">{video.title}</TableCell>
                  <TableCell><Badge variant="outline" className="capitalize">{video.category}</Badge></TableCell>
                  <TableCell>{video.duration}</TableCell>
                  <TableCell>
                    <Badge variant={video.is_free ? "default" : "secondary"}>
                      {video.is_free ? "Free" : "Pro"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleToggleActive(video.id, video.is_active)}>
                      {video.is_active ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(video)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(video.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingManager;
