
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Clock,
  MapPin,
  Utensils,
  Play,
  Book,
  Bed,
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';
import { format, addDays, subDays, isToday } from 'date-fns';
import { nb } from 'date-fns/locale';

const DailySchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock schedule data
  const scheduleData = {
    '2024-03-18': [
      { time: '07:30', activity: 'Ankomst og fri lek', icon: Play, location: 'Hovedrom', type: 'arrival' },
      { time: '08:30', activity: 'Frokost', icon: Utensils, location: 'Spisesalen', type: 'meal' },
      { time: '09:00', activity: 'Samling og dagens aktivitet', icon: Book, location: 'Samlingssalen', type: 'activity' },
      { time: '10:30', activity: 'Uteliv', icon: Play, location: 'Utebygninger', type: 'outdoor' },
      { time: '11:30', activity: 'Lunsj', icon: Utensils, location: 'Spisesalen', type: 'meal' },
      { time: '12:30', activity: 'Hvil og ro', icon: Bed, location: 'Hvilerom', type: 'rest' },
      { time: '13:30', activity: 'Kreative aktiviteter', icon: Book, location: 'Ateliers', type: 'activity' },
      { time: '15:00', activity: 'Mellommåltid', icon: Utensils, location: 'Spisesalen', type: 'meal' },
      { time: '15:30', activity: 'Fri lek og henting', icon: Home, location: 'Hovedrom', type: 'departure' },
    ]
  };

  const getScheduleForDate = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return scheduleData[dateKey] || scheduleData['2024-03-18'];
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'meal': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'activity': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'outdoor': return 'bg-green-100 text-green-700 border-green-200';
      case 'rest': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'arrival': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'departure': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const currentSchedule = getScheduleForDate(selectedDate);
  const now = new Date();
  const currentTime = format(now, 'HH:mm');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dagsplan</h1>
          <p className="text-slate-600 mt-2">Se ditt barns daglige timeplan og aktiviteter</p>
        </div>
        <Badge variant="outline" className="bg-oslo-blue/5 text-oslo-blue border-oslo-blue/20">
          <Calendar className="w-4 h-4 mr-2" />
          Live timeplan
        </Badge>
      </div>

      {/* Date Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDate(subDays(selectedDate, 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="text-center">
              <CardTitle className="text-oslo-blue">
                {format(selectedDate, 'EEEE d. MMMM yyyy', { locale: nb })}
              </CardTitle>
              {isToday(selectedDate) && (
                <Badge className="mt-1 bg-green-500">I dag</Badge>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDate(addDays(selectedDate, 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Current Activity (Today Only) */}
      {isToday(selectedDate) && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Nå pågår
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const current = currentSchedule.find((item, index) => {
                const nextItem = currentSchedule[index + 1];
                return currentTime >= item.time && (!nextItem || currentTime < nextItem.time);
              });
              
              if (current) {
                return (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <current.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">{current.activity}</h3>
                      <p className="text-green-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {current.location}
                      </p>
                    </div>
                  </div>
                );
              }
              
              return <p className="text-green-600">Ingen aktivitet registrert nå</p>;
            })()}
          </CardContent>
        </Card>
      )}

      {/* Schedule Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Dagens timeplan</CardTitle>
          <CardDescription>
            Oversikt over alle aktiviteter og måltider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentSchedule.map((item, index) => {
              const isCurrentActivity = isToday(selectedDate) && 
                currentTime >= item.time && 
                (index === currentSchedule.length - 1 || currentTime < currentSchedule[index + 1].time);
              
              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    isCurrentActivity 
                      ? 'bg-green-50 border-green-200 shadow-md' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCurrentActivity ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="w-px h-6 bg-slate-200 mt-2"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-mono text-sm font-medium ${
                        isCurrentActivity ? 'text-green-600' : 'text-slate-500'
                      }`}>
                        {item.time}
                      </span>
                      <Badge variant="outline" className={getActivityTypeColor(item.type)}>
                        {item.type === 'meal' ? 'Måltid' : 
                         item.type === 'activity' ? 'Aktivitet' :
                         item.type === 'outdoor' ? 'Utebygninger' :
                         item.type === 'rest' ? 'Hvil' :
                         item.type === 'arrival' ? 'Ankomst' :
                         item.type === 'departure' ? 'Henting' : 'Annet'}
                      </Badge>
                    </div>
                    
                    <h3 className={`font-semibold ${
                      isCurrentActivity ? 'text-green-800' : 'text-slate-900'
                    }`}>
                      {item.activity}
                    </h3>
                    
                    <p className={`text-sm flex items-center gap-1 ${
                      isCurrentActivity ? 'text-green-600' : 'text-slate-600'
                    }`}>
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </p>
                  </div>
                  
                  {isCurrentActivity && (
                    <Badge className="bg-green-500">Pågår nå</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <Button variant="outline" className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Se hele uken
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Button variant="outline" className="w-full">
              <Clock className="w-4 h-4 mr-2" />
              Rapporter fravær
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailySchedule;
