
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar as CalendarIcon, 
  Clock,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bell
} from 'lucide-react';
import { useState } from 'react';

const EducatorCalendar = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    {
      id: '1',
      title: 'Art Class',
      time: '09:00 - 10:30',
      location: 'Art Room',
      type: 'activity',
      participants: 12
    },
    {
      id: '2',
      title: 'Parent Meeting - Anna Larsen',
      time: '14:00 - 14:30',
      location: 'Meeting Room',
      type: 'meeting',
      participants: 2
    },
    {
      id: '3',
      title: 'Outdoor Play',
      time: '10:45 - 11:45',
      location: 'Playground',
      type: 'activity',
      participants: 18
    },
    {
      id: '4',
      title: 'Story Time',
      time: '15:00 - 15:30',
      location: 'Reading Corner',
      type: 'activity',
      participants: 15
    }
  ];

  const upcomingEvents = [
    {
      date: 'Tomorrow',
      title: 'Field Trip to Museum',
      time: '09:00 - 15:00',
      type: 'special'
    },
    {
      date: 'Friday',
      title: 'Monthly Safety Drill',
      time: '10:00 - 10:30',
      type: 'mandatory'
    },
    {
      date: 'Next Week',
      title: 'Parent-Teacher Conference',
      time: '14:00 - 17:00',
      type: 'meeting'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'activity': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meeting': return 'bg-green-100 text-green-800 border-green-200';
      case 'special': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'mandatory': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Calendar & Schedule</h1>
          <p className="text-slate-600 mt-1">
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Calendar Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Today's Schedule & Upcoming Events */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your activities and meetings for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-slate-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-slate-900">{event.title}</h3>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.time}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {event.location}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {event.participants}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Important events coming up</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-slate-900">{event.title}</h3>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>{event.date}</span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.time}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Remind Me
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common calendar and scheduling tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Schedule Meeting', icon: CalendarIcon, description: 'Book parent meetings' },
              { title: 'Add Activity', icon: Plus, description: 'Plan learning activities' },
              { title: 'Set Reminder', icon: Bell, description: 'Create reminders' },
              { title: 'View All Events', icon: Users, description: 'See full calendar' }
            ].map((action, index) => (
              <Button key={index} variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <action.icon className="w-6 h-6" />
                <div className="text-center">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-xs text-slate-500">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducatorCalendar;
