
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  Users, 
  MapPin,
  Edit,
  Trash2,
  Bell
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  type: 'activity' | 'meeting' | 'special' | 'maintenance';
  location: string;
  participants: string[];
  reminder: boolean;
}

const EducatorCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Morning Circle Time',
      description: 'Daily morning circle with songs and stories',
      date: '2024-03-20',
      time: '09:00',
      duration: '30 min',
      type: 'activity',
      location: 'Main Classroom',
      participants: ['All children'],
      reminder: true
    },
    {
      id: '2',
      title: 'Parent Meeting - Emma Larsen',
      description: 'Quarterly development discussion',
      date: '2024-03-20',
      time: '15:30',
      duration: '45 min',
      type: 'meeting',
      location: 'Meeting Room',
      participants: ['Anna Larsen'],
      reminder: true
    },
    {
      id: '3',
      title: 'Outdoor Play',
      description: 'Weather permitting outdoor activities',
      date: '2024-03-20',
      time: '10:30',
      duration: '60 min',
      type: 'activity',
      location: 'Playground',
      participants: ['All children'],
      reminder: false
    },
    {
      id: '4',
      title: 'Art Workshop',
      description: 'Spring-themed painting activity',
      date: '2024-03-21',
      time: '14:00',
      duration: '45 min',
      type: 'special',
      location: 'Art Room',
      participants: ['Group A'],
      reminder: true
    }
  ]);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'activity':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meeting':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'special':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTodaysEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date === today);
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events.filter(event => new Date(event.date) > today).slice(0, 5);
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const currentWeek = weekDays.map((day, index) => {
    const date = new Date();
    const monday = new Date(date.setDate(date.getDate() - date.getDay() + 1));
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + index);
    return {
      day,
      date: currentDate.toISOString().split('T')[0],
      displayDate: currentDate.getDate()
    };
  });

  const AddEventDialog = () => (
    <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Create a new calendar event or activity
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" placeholder="Enter event title" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Event description" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Event Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activity">Activity</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="special">Special Event</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classroom">Main Classroom</SelectItem>
                <SelectItem value="playground">Playground</SelectItem>
                <SelectItem value="art-room">Art Room</SelectItem>
                <SelectItem value="music-room">Music Room</SelectItem>
                <SelectItem value="meeting-room">Meeting Room</SelectItem>
                <SelectItem value="dining">Dining Area</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddEventOpen(false)}>
              Create Event
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Calendar & Scheduling</h1>
          <p className="text-slate-600 mt-1">Manage activities, meetings, and special events</p>
        </div>
        <AddEventDialog />
      </div>

      {/* Today's Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getTodaysEvents().length > 0 ? (
                getTodaysEvents()
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-600">{event.time}</p>
                          <p className="text-xs text-gray-500">{event.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{event.location}</span>
                            {event.reminder && (
                              <Badge variant="outline" className="text-xs">
                                <Bell className="w-3 h-3 mr-1" />
                                Reminder
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No events scheduled for today</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getUpcomingEvents().map((event) => (
                <div key={event.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-sm">{event.title}</h5>
                    <Badge className={`${getEventTypeColor(event.type)} text-xs`}>
                      {event.type}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.time} ({event.duration})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly View */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Schedule</CardTitle>
          <CardDescription>Overview of all scheduled activities and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {currentWeek.map((weekDay) => {
              const dayEvents = events.filter(event => event.date === weekDay.date);
              return (
                <div key={weekDay.day} className="border rounded-lg p-4">
                  <div className="text-center mb-3">
                    <h4 className="font-semibold">{weekDay.day}</h4>
                    <p className="text-sm text-gray-600">{weekDay.displayDate}</p>
                  </div>
                  <div className="space-y-2">
                    {dayEvents
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((event) => (
                        <div key={event.id} className="p-2 bg-gray-50 rounded text-xs">
                          <div className="font-medium">{event.time}</div>
                          <div className="text-gray-600 truncate">{event.title}</div>
                          <Badge className={`${getEventTypeColor(event.type)} text-xs mt-1`}>
                            {event.type}
                          </Badge>
                        </div>
                      ))}
                    {dayEvents.length === 0 && (
                      <div className="text-center text-gray-400 py-4">
                        <p className="text-xs">No events</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Event Templates</CardTitle>
          <CardDescription>Create events from pre-defined templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Morning Circle', type: 'activity', duration: '30 min', location: 'Classroom' },
              { title: 'Parent Meeting', type: 'meeting', duration: '45 min', location: 'Meeting Room' },
              { title: 'Outdoor Play', type: 'activity', duration: '60 min', location: 'Playground' },
              { title: 'Special Activity', type: 'special', duration: '90 min', location: 'Art Room' },
            ].map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">{template.title}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{template.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{template.location}</span>
                    </div>
                  </div>
                  <Badge className={`${getEventTypeColor(template.type)} text-xs mt-2`}>
                    {template.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducatorCalendar;
