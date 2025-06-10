
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin,
  Users,
  Copy,
  Save
} from 'lucide-react';

interface ScheduleItem {
  id: string;
  time: string;
  endTime: string;
  activity: string;
  location: string;
  description: string;
  type: 'routine' | 'special' | 'meal' | 'rest';
  participants: string[];
}

interface DaySchedule {
  day: string;
  date: string;
  items: ScheduleItem[];
}

const WeeklyScheduleManager = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [editingEvent, setEditingEvent] = useState<ScheduleItem | null>(null);

  // Mock schedule data
  const [weeklySchedule, setWeeklySchedule] = useState<DaySchedule[]>([
    {
      day: 'Monday',
      date: '2024-03-18',
      items: [
        {
          id: '1',
          time: '08:00',
          endTime: '08:30',
          activity: 'Arrival & Free Play',
          location: 'Main Classroom',
          description: 'Children arrive and engage in free play activities',
          type: 'routine',
          participants: ['All children']
        },
        {
          id: '2',
          time: '09:00',
          endTime: '09:30',
          activity: 'Morning Circle',
          location: 'Circle Area',
          description: 'Daily morning circle with songs and calendar',
          type: 'routine',
          participants: ['All children']
        },
        {
          id: '3',
          time: '10:30',
          endTime: '11:30',
          activity: 'Outdoor Play',
          location: 'Playground',
          description: 'Weather permitting outdoor activities',
          type: 'routine',
          participants: ['All children']
        }
      ]
    },
    {
      day: 'Tuesday',
      date: '2024-03-19',
      items: [
        {
          id: '4',
          time: '09:00',
          endTime: '09:30',
          activity: 'Morning Circle',
          location: 'Circle Area',
          description: 'Daily morning circle with songs and calendar',
          type: 'routine',
          participants: ['All children']
        },
        {
          id: '5',
          time: '14:00',
          endTime: '15:00',
          activity: 'Art Workshop',
          location: 'Art Room',
          description: 'Spring-themed painting activity',
          type: 'special',
          participants: ['Group A']
        }
      ]
    },
    // Add more days...
  ]);

  const activityTypes = [
    { value: 'routine', label: 'Routine', color: 'bg-blue-100 text-blue-800' },
    { value: 'special', label: 'Special Activity', color: 'bg-purple-100 text-purple-800' },
    { value: 'meal', label: 'Meal Time', color: 'bg-green-100 text-green-800' },
    { value: 'rest', label: 'Rest Time', color: 'bg-orange-100 text-orange-800' }
  ];

  const locations = [
    'Main Classroom',
    'Circle Area',
    'Art Room',
    'Music Room',
    'Playground',
    'Dining Area',
    'Rest Room',
    'Library Corner'
  ];

  const getTypeColor = (type: string) => {
    const typeConfig = activityTypes.find(t => t.value === type);
    return typeConfig?.color || 'bg-gray-100 text-gray-800';
  };

  const handleAddEvent = (day: string) => {
    setSelectedDay(day);
    setEditingEvent(null);
    setIsAddEventOpen(true);
  };

  const handleEditEvent = (event: ScheduleItem, day: string) => {
    setSelectedDay(day);
    setEditingEvent(event);
    setIsAddEventOpen(true);
  };

  const handleDeleteEvent = (eventId: string, day: string) => {
    setWeeklySchedule(prev => prev.map(daySchedule => 
      daySchedule.day === day 
        ? { ...daySchedule, items: daySchedule.items.filter(item => item.id !== eventId) }
        : daySchedule
    ));
  };

  const copyDaySchedule = (fromDay: string, toDay: string) => {
    const sourceDay = weeklySchedule.find(d => d.day === fromDay);
    if (!sourceDay) return;

    setWeeklySchedule(prev => prev.map(daySchedule => 
      daySchedule.day === toDay 
        ? { 
            ...daySchedule, 
            items: sourceDay.items.map(item => ({ 
              ...item, 
              id: `${item.id}_copy_${Date.now()}` 
            }))
          }
        : daySchedule
    ));
  };

  const AddEventDialog = () => (
    <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingEvent ? 'Edit Activity' : 'Add New Activity'}
          </DialogTitle>
          <DialogDescription>
            {selectedDay && `Schedule activity for ${selectedDay}`}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="activity">Activity Name</Label>
            <Input 
              id="activity" 
              placeholder="Enter activity name" 
              defaultValue={editingEvent?.activity}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-time">Start Time</Label>
              <Input 
                id="start-time" 
                type="time" 
                defaultValue={editingEvent?.time}
              />
            </div>
            <div>
              <Label htmlFor="end-time">End Time</Label>
              <Input 
                id="end-time" 
                type="time" 
                defaultValue={editingEvent?.endTime}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Select defaultValue={editingEvent?.location}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Activity Type</Label>
            <Select defaultValue={editingEvent?.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Activity description"
              defaultValue={editingEvent?.description}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddEventOpen(false)}>
              {editingEvent ? 'Update' : 'Add'} Activity
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Weekly Schedule Manager</h2>
          <p className="text-slate-600 mt-1">Create and manage class schedules for guardians to view</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Template
          </Button>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Publish Schedule
          </Button>
        </div>
      </div>

      {/* Week Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                ← Previous Week
              </Button>
              <h3 className="font-semibold">
                Week of {selectedWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              <Button variant="outline" size="sm">
                Next Week →
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-2" />
              Copy from Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule Grid */}
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {weeklySchedule.map((daySchedule) => (
          <Card key={daySchedule.day} className="h-fit">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{daySchedule.day}</CardTitle>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleAddEvent(daySchedule.day)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-slate-600">{daySchedule.date}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {daySchedule.items.length > 0 ? (
                daySchedule.items
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((item) => (
                    <div 
                      key={item.id} 
                      className="p-3 border rounded-lg hover:bg-slate-50 group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-sm font-medium text-slate-900">
                          {item.time} - {item.endTime}
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleEditEvent(item, daySchedule.day)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDeleteEvent(item.id, daySchedule.day)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-sm mb-1">{item.activity}</h4>
                      
                      <div className="flex items-center gap-1 text-xs text-slate-600 mb-2">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>
                      
                      <Badge className={`${getTypeColor(item.type)} text-xs`}>
                        {activityTypes.find(t => t.value === item.type)?.label}
                      </Badge>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Calendar className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">No activities scheduled</p>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="mt-2"
                    onClick={() => handleAddEvent(daySchedule.day)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Activity
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <AddEventDialog />
    </div>
  );
};

export default WeeklyScheduleManager;
