import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CalendarPage = () => {
  const events = [
    {
      id: 1,
      title: "Tax Return Due - Smith Corp",
      date: "2024-01-15",
      type: "deadline",
    },
    {
      id: 2,
      title: "Client Meeting - Johnson LLC",
      date: "2024-01-16",
      type: "meeting",
    },
    {
      id: 3,
      title: "Quarterly Review",
      date: "2024-01-17",
      type: "task",
    },
    {
      id: 4,
      title: "Audit Start - Brown & Associates",
      date: "2024-01-20",
      type: "job",
    },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case "deadline":
        return "bg-red-500";
      case "meeting":
        return "bg-blue-500";
      case "task":
        return "bg-yellow-500";
      case "job":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<CalendarIcon className="w-5 h-5 text-primary" />}
          title="Calendar"
          description="View deadlines, meetings, and scheduled tasks"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>January 2024</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  Today
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid Placeholder */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const dayNum = i - 1; // Start from -1 for offset
                  const isCurrentMonth = dayNum >= 0 && dayNum < 31;
                  const displayNum = isCurrentMonth ? dayNum + 1 : "";
                  const hasEvent = [15, 16, 17, 20].includes(dayNum + 1);
                  
                  return (
                    <div
                      key={i}
                      className={`p-2 min-h-[60px] text-sm border rounded-lg ${
                        isCurrentMonth
                          ? "hover:bg-muted cursor-pointer"
                          : "text-muted-foreground/30"
                      } ${dayNum + 1 === 15 ? "bg-primary/10" : ""}`}
                    >
                      <div className="font-medium">{displayNum}</div>
                      {hasEvent && isCurrentMonth && (
                        <div className="mt-1">
                          <div className="w-2 h-2 rounded-full bg-primary mx-auto"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className={`w-3 h-3 rounded-full mt-1 ${getEventColor(event.type)}`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{event.title}</div>
                    <div className="text-xs text-muted-foreground">{event.date}</div>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default CalendarPage;
