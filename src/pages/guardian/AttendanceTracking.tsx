
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  TrendingUp,
  Bell,
  MapPin,
  Users
} from 'lucide-react';
import { format, subDays, isToday } from 'date-fns';
import { nb } from 'date-fns/locale';

const AttendanceTracking = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock attendance data
  const todayAttendance = {
    status: 'present',
    checkInTime: '08:15',
    expectedCheckOut: '15:30',
    actualCheckOut: null,
    duration: '7t 15m',
    location: 'Hovedrom - Avd. Blå'
  };

  const weeklyAttendance = [
    { date: '2024-03-18', status: 'present', checkIn: '08:15', checkOut: '15:30', duration: '7t 15m' },
    { date: '2024-03-17', status: 'present', checkIn: '08:00', checkOut: '16:00', duration: '8t 0m' },
    { date: '2024-03-16', status: 'present', checkIn: '08:30', checkOut: '15:00', duration: '6t 30m' },
    { date: '2024-03-15', status: 'absent', reason: 'Sykdom' },
    { date: '2024-03-14', status: 'present', checkIn: '08:10', checkOut: '15:45', duration: '7t 35m' },
  ];

  const monthlyStats = {
    presentDays: 18,
    absentDays: 2,
    totalDays: 20,
    averageDuration: '7t 22m',
    onTimeArrivals: 16
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-700 border-green-200';
      case 'absent': return 'bg-red-100 text-red-700 border-red-200';
      case 'late': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return CheckCircle;
      case 'absent': return XCircle;
      case 'late': return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Oppmøte</h1>
          <p className="text-slate-600 mt-2">Se når barnet ditt kommer og går fra barnehagen</p>
        </div>
        <Badge variant="outline" className="bg-oslo-blue/5 text-oslo-blue border-oslo-blue/20">
          <CheckCircle className="w-4 h-4 mr-2" />
          Live oppmøte
        </Badge>
      </div>

      {/* Current Status */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className={`border-2 ${todayAttendance.status === 'present' ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              Status i dag
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Status:</span>
                <Badge className="bg-green-500">
                  Til stede
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Ankomst:</span>
                <span className="font-mono font-semibold">{todayAttendance.checkInTime}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Forventet avgang:</span>
                <span className="font-mono text-slate-600">{todayAttendance.expectedCheckOut}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Tid til stede:</span>
                <span className="font-semibold text-green-700">{todayAttendance.duration}</span>
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>Plassering: {todayAttendance.location}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Varsler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Ankomst bekreftet</p>
                  <p className="text-xs text-blue-600">I dag kl. {todayAttendance.checkInTime}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">Henting påminnelse</span>
                </div>
                <span className="text-xs text-slate-500">15:00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Denne uken</CardTitle>
          <CardDescription>
            Oversikt over oppmøte de siste dagene
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyAttendance.map((day, index) => {
              const StatusIcon = getStatusIcon(day.status);
              const isCurrentDay = isToday(new Date(day.date));
              
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    isCurrentDay ? 'border-oslo-blue bg-oslo-blue/5' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      day.status === 'present' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <StatusIcon className={`w-5 h-5 ${
                        day.status === 'present' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">
                        {format(new Date(day.date), 'EEEE d. MMMM', { locale: nb })}
                        {isCurrentDay && <span className="text-oslo-blue ml-2">(I dag)</span>}
                      </h3>
                      
                      {day.status === 'present' ? (
                        <p className="text-sm text-slate-600">
                          {day.checkIn} - {day.checkOut} • {day.duration}
                        </p>
                      ) : (
                        <p className="text-sm text-red-600">{day.reason}</p>
                      )}
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(day.status)}>
                    {day.status === 'present' ? 'Til stede' : 'Fraværende'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Tilstedeværelse</p>
                <p className="text-xl font-bold text-green-600">
                  {Math.round((monthlyStats.presentDays / monthlyStats.totalDays) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Tilstede dager</p>
                <p className="text-xl font-bold">{monthlyStats.presentDays}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Gj.snitt tid</p>
                <p className="text-xl font-bold">{monthlyStats.averageDuration}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">I tide</p>
                <p className="text-xl font-bold">
                  {Math.round((monthlyStats.onTimeArrivals / monthlyStats.presentDays) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hurtighandlinger</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Påminnelser
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Henting-fullmakter
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Tidligere måneder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceTracking;
