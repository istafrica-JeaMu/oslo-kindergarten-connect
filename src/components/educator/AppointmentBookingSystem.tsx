
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Clock,
  User,
  Video,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  MessageSquare,
  FileText,
  Bell
} from 'lucide-react';

interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
  bookedBy?: string;
  childName?: string;
  type: 'conference' | 'meeting' | 'consultation';
  virtual: boolean;
}

interface Appointment {
  id: string;
  guardianName: string;
  childName: string;
  date: string;
  time: string;
  duration: number;
  type: 'conference' | 'meeting' | 'consultation';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  virtual: boolean;
  agenda: string[];
  notes: string;
  reminderSent: boolean;
}

const AppointmentBookingSystem = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      guardianName: 'Anna Larsen',
      childName: 'Emma Larsen',
      date: '2024-01-20',
      time: '14:00',
      duration: 30,
      type: 'conference',
      status: 'confirmed',
      virtual: false,
      agenda: ['Discuss learning progress', 'Social development', 'Home activities'],
      notes: 'Parent requested focus on reading skills',
      reminderSent: true
    },
    {
      id: '2',
      guardianName: 'Maria Hansen',
      childName: 'Oliver Hansen',
      date: '2024-01-22',
      time: '15:30',
      duration: 20,
      type: 'meeting',
      status: 'scheduled',
      virtual: true,
      agenda: ['Behavioral observations', 'Upcoming activities'],
      notes: '',
      reminderSent: false
    }
  ]);

  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([
    {
      id: '1',
      date: '2024-01-25',
      startTime: '09:00',
      endTime: '09:30',
      available: true,
      type: 'conference',
      virtual: false
    },
    {
      id: '2',
      date: '2024-01-25',
      startTime: '10:00',
      endTime: '10:30',
      available: true,
      type: 'conference',
      virtual: true
    },
    {
      id: '3',
      date: '2024-01-25',
      startTime: '14:00',
      endTime: '14:20',
      available: false,
      bookedBy: 'Erik Hansen',
      childName: 'Lucas Berg',
      type: 'meeting',
      virtual: false
    }
  ]);

  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
    type: 'conference',
    virtual: false
  });

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const meetingTypes = [
    { value: 'conference', label: 'Parent-Teacher Conference', duration: 30, color: 'bg-blue-100 text-blue-800' },
    { value: 'meeting', label: 'Quick Meeting', duration: 20, color: 'bg-green-100 text-green-800' },
    { value: 'consultation', label: 'Special Consultation', duration: 45, color: 'bg-purple-100 text-purple-800' }
  ];

  const agendaTemplates = {
    conference: [
      'Review child\'s overall development',
      'Discuss learning milestones',
      'Social and emotional progress',
      'Home-school collaboration strategies',
      'Goals for next period'
    ],
    meeting: [
      'Quick progress update',
      'Address specific concerns',
      'Upcoming activities and events'
    ],
    consultation: [
      'Detailed assessment discussion',
      'Individual education plan review',
      'Special needs support',
      'Long-term development goals'
    ]
  };

  const handleCreateSlot = () => {
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) return;

    const slot: TimeSlot = {
      id: Date.now().toString(),
      date: newSlot.date,
      startTime: newSlot.startTime,
      endTime: newSlot.endTime,
      available: true,
      type: newSlot.type as TimeSlot['type'],
      virtual: newSlot.virtual
    };

    setAvailableSlots(prev => [...prev, slot]);
    setNewSlot({
      date: '',
      startTime: '',
      endTime: '',
      type: 'conference',
      virtual: false
    });
  };

  const handleConfirmAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'confirmed' as const }
        : apt
    ));
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'cancelled' as const }
        : apt
    ));
  };

  const handleSendReminder = (appointmentId: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, reminderSent: true }
        : apt
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Scheduled</Badge>;
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800"><Check className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800"><X className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeStyle = (type: string) => {
    return meetingTypes.find(t => t.value === type)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Guardian Appointment Booking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="schedule">My Schedule</TabsTrigger>
              <TabsTrigger value="create-slots">Create Slots</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="space-y-4">
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{appointment.guardianName}</h4>
                            <Badge variant="outline">{appointment.childName}</Badge>
                            {appointment.virtual && (
                              <Badge className="bg-purple-100 text-purple-800">
                                <Video className="w-3 h-3 mr-1" />
                                Virtual
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {appointment.time} ({appointment.duration} min)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeStyle(appointment.type)}>
                            {meetingTypes.find(t => t.value === appointment.type)?.label}
                          </Badge>
                          {getStatusBadge(appointment.status)}
                        </div>
                      </div>

                      {appointment.agenda.length > 0 && (
                        <div className="mb-3">
                          <h5 className="text-sm font-medium mb-1">Agenda:</h5>
                          <ul className="text-sm text-gray-600 list-disc list-inside">
                            {appointment.agenda.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {appointment.notes && (
                        <div className="mb-3">
                          <h5 className="text-sm font-medium mb-1">Notes:</h5>
                          <p className="text-sm text-gray-600">{appointment.notes}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {appointment.status === 'scheduled' && (
                          <Button size="sm" onClick={() => handleConfirmAppointment(appointment.id)}>
                            <Check className="w-3 h-3 mr-1" />
                            Confirm
                          </Button>
                        )}
                        {!appointment.reminderSent && (
                          <Button size="sm" variant="outline" onClick={() => handleSendReminder(appointment.id)}>
                            <Bell className="w-3 h-3 mr-1" />
                            Send Reminder
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => setSelectedAppointment(appointment)}>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Message
                        </Button>
                        {appointment.virtual && (
                          <Button size="sm" variant="outline">
                            <Video className="w-3 h-3 mr-1" />
                            Join Video
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="grid md:grid-cols-7 gap-2">
                {/* Simple calendar view */}
                {[...Array(7)].map((_, dayIndex) => {
                  const date = new Date();
                  date.setDate(date.getDate() + dayIndex);
                  const daySlots = availableSlots.filter(slot => slot.date === date.toISOString().split('T')[0]);
                  
                  return (
                    <Card key={dayIndex} className="p-3">
                      <div className="text-center mb-2">
                        <div className="font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="text-sm text-gray-600">{date.getDate()}</div>
                      </div>
                      <div className="space-y-1">
                        {daySlots.map((slot) => (
                          <div 
                            key={slot.id} 
                            className={`text-xs p-1 rounded ${
                              slot.available 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {slot.startTime}
                            {slot.virtual && <Video className="w-2 h-2 inline ml-1" />}
                          </div>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="create-slots" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create Available Time Slots</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Date</label>
                      <Input
                        type="date"
                        value={newSlot.date}
                        onChange={(e) => setNewSlot(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Start Time</label>
                      <Input
                        type="time"
                        value={newSlot.startTime}
                        onChange={(e) => setNewSlot(prev => ({ ...prev, startTime: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">End Time</label>
                      <Input
                        type="time"
                        value={newSlot.endTime}
                        onChange={(e) => setNewSlot(prev => ({ ...prev, endTime: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Meeting Type</label>
                      <Select 
                        value={newSlot.type} 
                        onValueChange={(value) => setNewSlot(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {meetingTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label} ({type.duration} min)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                      <input
                        type="checkbox"
                        checked={newSlot.virtual}
                        onChange={(e) => setNewSlot(prev => ({ ...prev, virtual: e.target.checked }))}
                      />
                      <label className="text-sm">Virtual meeting option</label>
                    </div>
                  </div>

                  <Button onClick={handleCreateSlot}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Time Slot
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Slots</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {availableSlots.map((slot) => (
                      <div key={slot.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{slot.date}</span>
                          <span>{slot.startTime} - {slot.endTime}</span>
                          <Badge className={getTypeStyle(slot.type)}>
                            {meetingTypes.find(t => t.value === slot.type)?.label}
                          </Badge>
                          {slot.virtual && (
                            <Badge className="bg-purple-100 text-purple-800">
                              <Video className="w-3 h-3 mr-1" />
                              Virtual
                            </Badge>
                          )}
                          {!slot.available && slot.bookedBy && (
                            <Badge className="bg-red-100 text-red-800">
                              Booked by {slot.bookedBy}
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(agendaTemplates).map(([type, agenda]) => (
                  <Card key={type}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {meetingTypes.find(t => t.value === type)?.label} Template
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 mb-4">
                        {agenda.map((item, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Button size="sm" variant="outline">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentBookingSystem;
