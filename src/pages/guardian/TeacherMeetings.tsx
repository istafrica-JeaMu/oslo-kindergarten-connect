
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, BookOpen, Plus, Edit, Trash2 } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { nb } from 'date-fns/locale';

const TeacherMeetings = () => {
  const [selectedDate, setSelectedDate] = useState('');
  
  // Mock meetings data
  const upcomingMeetings = [
    {
      id: 1,
      date: '2024-03-25',
      time: '14:00',
      teacher: 'Kari Andersen',
      type: 'Utviklingssamtale',
      duration: 30,
      status: 'confirmed',
      agenda: 'Diskutere Emmas sosiale utvikling og læring'
    },
    {
      id: 2,
      date: '2024-04-02',
      time: '15:30',
      teacher: 'Lars Eriksen',
      type: 'Bekymringssamtale',
      duration: 45,
      status: 'pending',
      agenda: 'Oppfølging etter incident på lekeplassen'
    }
  ];

  const availableSlots = [
    { date: '2024-03-20', times: ['09:00', '10:00', '14:00', '15:00'] },
    { date: '2024-03-21', times: ['09:30', '11:00', '13:30'] },
    { date: '2024-03-22', times: ['10:00', '14:30', '15:30'] },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Lærersamtaler</h1>
          <p className="text-slate-600 mt-2">Book møter med barnets lærere og pedagoger</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Book ny samtale
        </Button>
      </div>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <CardTitle>Kommende møter</CardTitle>
          <CardDescription>Dine planlagte lærersamtaler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-oslo-blue rounded-full flex items-center justify-center text-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{meeting.type}</h3>
                    <p className="text-sm text-slate-600">
                      {format(new Date(meeting.date), 'EEEE d. MMMM', { locale: nb })} kl. {meeting.time}
                    </p>
                    <p className="text-sm text-slate-600">Med {meeting.teacher}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={meeting.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}>
                    {meeting.status === 'confirmed' ? 'Bekreftet' : 'Venter'}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle>Ledige tider</CardTitle>
          <CardDescription>Velg en ledig tid for ny samtale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {availableSlots.map((slot, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">
                  {format(new Date(slot.date), 'EEEE d. MMM', { locale: nb })}
                </h3>
                <div className="space-y-2">
                  {slot.times.map((time) => (
                    <Button key={time} variant="outline" size="sm" className="w-full">
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherMeetings;
