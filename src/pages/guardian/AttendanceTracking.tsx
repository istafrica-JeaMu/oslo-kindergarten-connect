
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, Calendar, User } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { nb, enUS } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

const AttendanceTracking = () => {
  const { t, language } = useLanguage();
  const [selectedWeek, setSelectedWeek] = useState(0);
  
  const locale = language === 'nb' ? nb : enUS;
  
  // Mock attendance data
  const todayAttendance = {
    checkIn: '08:15',
    expectedCheckOut: '15:30',
    status: 'present',
    duration: '7h 15m'
  };

  const weeklyAttendance = [
    {
      date: new Date(),
      checkIn: '08:15',
      checkOut: null,
      status: 'present',
      duration: '7h 15m (ongoing)'
    },
    {
      date: subDays(new Date(), 1),
      checkIn: '08:05',
      checkOut: '15:45',
      status: 'completed',
      duration: '7h 40m'
    },
    {
      date: subDays(new Date(), 2),
      checkIn: '08:25',
      checkOut: '15:30',
      status: 'completed',
      duration: '7h 5m'
    },
    {
      date: subDays(new Date(), 3),
      checkIn: null,
      checkOut: null,
      status: 'absent',
      duration: '-'
    },
    {
      date: subDays(new Date(), 4),
      checkIn: '08:10',
      checkOut: '16:00',
      status: 'completed',
      duration: '7h 50m'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('guardian.attendance.title')}</h1>
          <p className="text-slate-600 mt-2">{t('guardian.attendance.description')}</p>
        </div>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          {t('guardian.attendance.viewHistory')}
        </Button>
      </div>

      {/* Today's Status */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            {t('guardian.attendance.todayStatus')}
          </CardTitle>
          <CardDescription>
            {format(new Date(), 'EEEE d. MMMM yyyy', { locale })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">{t('guardian.attendance.checkedInAt')}</p>
                  <p className="font-semibold text-lg">{todayAttendance.checkIn}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-oslo-blue rounded-full flex items-center justify-center text-white">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">{t('guardian.attendance.expectedCheckout')}</p>
                  <p className="font-semibold text-lg">{todayAttendance.expectedCheckOut}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <Badge className="bg-green-500 text-lg px-4 py-2">
                  {t('guardian.attendance.status.present')}
                </Badge>
                <p className="text-sm text-slate-600 mt-2">
                  {t('guardian.attendance.duration')}: {todayAttendance.duration}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{t('guardian.attendance.weeklyOverview')}</CardTitle>
          <CardDescription>{t('guardian.attendance.weeklyDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyAttendance.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {format(day.date, 'EEEE d. MMMM', { locale })}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      {day.checkIn && (
                        <span>{t('guardian.attendance.in')}: {day.checkIn}</span>
                      )}
                      {day.checkOut && (
                        <span>{t('guardian.attendance.out')}: {day.checkOut}</span>
                      )}
                      {!day.checkIn && !day.checkOut && (
                        <span>{t('guardian.attendance.status.absent')}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={
                    day.status === 'present' ? 'bg-green-500' :
                    day.status === 'completed' ? 'bg-blue-500' :
                    'bg-red-500'
                  }>
                    {t(`guardian.attendance.status.${day.status}`)}
                  </Badge>
                  <p className="text-sm text-slate-600 mt-1">{day.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-500">95%</div>
            <p className="text-sm text-slate-600">{t('guardian.attendance.stats.attendanceRate')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-oslo-blue">7h 25m</div>
            <p className="text-sm text-slate-600">{t('guardian.attendance.stats.averageDaily')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-500">2</div>
            <p className="text-sm text-slate-600">{t('guardian.attendance.stats.absencesThisMonth')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceTracking;
