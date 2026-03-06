import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const initialEvents = [
  { id: 1, title: "Tax Return Due - Smith Corp", day: 15, month: 0, year: 2024, type: "deadline" },
  { id: 2, title: "Client Meeting - Johnson LLC", day: 16, month: 0, year: 2024, type: "meeting" },
  { id: 3, title: "Quarterly Review", day: 17, month: 0, year: 2024, type: "task" },
  { id: 4, title: "Audit Start - Brown & Associates", day: 20, month: 0, year: 2024, type: "job" },
];

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(2024);
  const [events, setEvents] = useState(initialEvents);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("task");

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); } else setCurrentMonth((m) => m - 1); };
  const nextMonth = () => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); } else setCurrentMonth((m) => m + 1); };
  const goToday = () => { const now = new Date(); setCurrentMonth(now.getMonth()); setCurrentYear(now.getFullYear()); };

  const monthEvents = events.filter((e) => e.month === currentMonth && e.year === currentYear);
  const dayEvents = selectedDay !== null ? monthEvents.filter((e) => e.day === selectedDay) : [];

  const getEventColor = (type: string) => {
    const colors: Record<string, string> = { deadline: "bg-red-500", meeting: "bg-blue-500", task: "bg-yellow-500", job: "bg-green-500" };
    return colors[type] || "bg-gray-500";
  };

  const handleAddEvent = () => {
    if (!newTitle.trim() || selectedDay === null) return;
    const newId = Math.max(0, ...events.map((e) => e.id)) + 1;
    setEvents((prev) => [...prev, { id: newId, title: newTitle.trim(), day: selectedDay, month: currentMonth, year: currentYear, type: newType }]);
    toast.success(`Event "${newTitle}" added`);
    setNewTitle(""); setNewType("task"); setAddOpen(false);
  };

  return (
      <div className="space-y-6">
        <DashboardPageHeader icon={<CalendarIcon className="w-5 h-5 text-primary" />} title="Calendar" description="View deadlines, meetings, and scheduled tasks" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{monthNames[currentMonth]} {currentYear}</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" onClick={goToday}>Today</Button>
                <Button variant="outline" size="icon" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-sm font-medium text-muted-foreground">{day}</div>
                ))}
                {Array.from({ length: 42 }, (_, i) => {
                  const dayNum = i - firstDayOfWeek + 1;
                  const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
                  const hasEvent = monthEvents.some((e) => e.day === dayNum);
                  const isSelected = dayNum === selectedDay;
                  return (
                    <div key={i} onClick={() => isCurrentMonth && setSelectedDay(dayNum)}
                      className={`p-2 min-h-[60px] text-sm border rounded-lg ${isCurrentMonth ? "hover:bg-muted cursor-pointer" : "text-muted-foreground/30"} ${isSelected ? "bg-primary/10 border-primary" : ""}`}>
                      <div className="font-medium">{isCurrentMonth ? dayNum : ""}</div>
                      {hasEvent && isCurrentMonth && <div className="mt-1"><div className="w-2 h-2 rounded-full bg-primary mx-auto" /></div>}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{selectedDay ? `Events on ${monthNames[currentMonth]} ${selectedDay}` : "Upcoming Events"}</CardTitle>
                {selectedDay && <Button size="sm" variant="outline" onClick={() => setAddOpen(true)}><Plus className="w-3 h-3 mr-1" />Add</Button>}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {(selectedDay ? dayEvents : monthEvents).map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className={`w-3 h-3 rounded-full mt-1 ${getEventColor(event.type)}`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{event.title}</div>
                    <div className="text-xs text-muted-foreground">{monthNames[currentMonth]} {event.day}, {currentYear}</div>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">{event.type}</Badge>
                </div>
              ))}
              {(selectedDay ? dayEvents : monthEvents).length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No events</p>}
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Event on {monthNames[currentMonth]} {selectedDay}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Title</Label><Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Event title" /></div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={newType} onValueChange={setNewType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="task">Task</SelectItem><SelectItem value="meeting">Meeting</SelectItem><SelectItem value="deadline">Deadline</SelectItem><SelectItem value="job">Job</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button><Button onClick={handleAddEvent} disabled={!newTitle.trim()}>Add Event</Button></DialogFooter>
        </DialogContent>
      </Dialog>
  );
};

export default CalendarPage;
