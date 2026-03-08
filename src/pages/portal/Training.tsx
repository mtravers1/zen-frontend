import { useState, useEffect } from "react";
import ClientPortalLayout from "@/components/portal/ClientPortalLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, Clock, Search, GraduationCap, Video, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
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
}

const categories = [
  { value: "all", label: "All" },
  { value: "onboarding", label: "Onboarding" },
  { value: "documents", label: "Documents" },
  { value: "financial", label: "Financial" },
  { value: "tax", label: "Tax" },
  { value: "workflow", label: "Workflow" },
];

const PortalTraining = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [playingVideo, setPlayingVideo] = useState<TrainingVideo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [videosRes, progressRes] = await Promise.all([
        supabase.from("training_videos").select("*").eq("is_active", true).order("display_order"),
        user ? supabase.from("training_progress").select("video_id").eq("user_id", user.id) : Promise.resolve({ data: [] }),
      ]);
      setVideos((videosRes.data as TrainingVideo[]) || []);
      setCompletedIds(new Set((progressRes.data || []).map((p: any) => p.video_id)));
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const completedCount = videos.filter(v => completedIds.has(v.id)).length;
  const progress = videos.length ? Math.round((completedCount / videos.length) * 100) : 0;

  const filtered = videos.filter(v => {
    const matchesSearch = !search || v.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || v.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleWatch = async (video: TrainingVideo) => {
    setPlayingVideo(video);
    if (user && !completedIds.has(video.id)) {
      const { error } = await supabase.from("training_progress").insert({ user_id: user.id, video_id: video.id });
      if (!error) {
        setCompletedIds(prev => new Set([...prev, video.id]));
        toast.success("Video marked as completed!");
      }
    }
  };

  return (
    <ClientPortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-primary" />Training Center
          </h1>
          <p className="text-muted-foreground">Learn how to get the most out of Zentavos with video tutorials and guides.</p>
        </div>

        {/* Progress Card */}
        <Card className="border border-border bg-primary/5">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Your Progress</h3>
              <span className="text-sm text-muted-foreground">{completedCount}/{videos.length} completed</span>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">{progress}% complete — keep going!</p>
          </CardContent>
        </Card>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search videos..." className="pl-9 h-9" />
          </div>
          <Tabs value={category} onValueChange={setCategory}>
            <TabsList>
              {categories.map(c => (
                <TabsTrigger key={c.value} value={c.value} className="text-xs">{c.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading videos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(video => {
              const completed = completedIds.has(video.id);
              return (
                <Card key={video.id} className={`border border-border overflow-hidden hover:shadow-md transition-shadow ${completed ? "opacity-75" : ""}`}>
                  <div className="aspect-video bg-muted flex items-center justify-center relative">
                    {video.thumbnail_url ? (
                      <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                    ) : (
                      <Video className="w-10 h-10 text-muted-foreground" />
                    )}
                    {completed && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      </div>
                    )}
                    <Badge variant="secondary" className="absolute bottom-2 right-2 text-xs">
                      <Clock className="w-3 h-3 mr-1" />{video.duration}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground text-sm mb-1">{video.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
                    <Button size="sm" className="w-full" variant={completed ? "outline" : "default"} onClick={() => handleWatch(video)}>
                      {completed ? (
                        <><CheckCircle2 className="w-4 h-4 mr-2" />Rewatch</>
                      ) : (
                        <><Play className="w-4 h-4 mr-2" />Watch Now</>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Video className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No videos found.</p>
          </div>
        )}
      </div>

      {/* Video Player Dialog */}
      <Dialog open={!!playingVideo} onOpenChange={() => setPlayingVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {playingVideo && (
            <div>
              <video
                src={playingVideo.video_url}
                controls
                autoPlay
                className="w-full aspect-video bg-black"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-foreground">{playingVideo.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{playingVideo.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ClientPortalLayout>
  );
};

export default PortalTraining;
