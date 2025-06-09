
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, CheckCircle, AlertCircle, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, subDays, addWeeks, subWeeks } from 'date-fns';
import { nb, enUS } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

const AttendanceTracking = () => {
  const { t, language } = useLanguage();
  const [selectedChild, setSelectedChild] = useState('oliver');
  const [selectedWeek, setSelectedWeek] = useState(0);
  
  const locale = language === 'nb' ? nb : enUS;
  
  // Mock data for multiple children
  const children = [
    {
      id: 'oliver',
      name: 'Oliver Hansen',
      kindergarten: 'Sinsen Kindergarten'
    },
    {
      id: 'emma',
      name: 'Emma Hansen',
      kindergarten: 'Løvenskiold Kindergarten'
    },
    {
      id: 'lucas',
      name: 'Lucas Hansen',
      kindergarten: 'Frogner Kindergarten'
    }
  ];

  // Mock attendance data for each child
  const attendanceData = {
    oliver: {
      today: {
        checkIn: '08:15',
        expectedCheckOut: '15:30',
        status: 'present',
        duration: '7h 15m'
      },
      weekly: [
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
      ]
    },
    emma: {
      today: {
        checkIn: null,
        expectedCheckOut: '16:00',
        status: 'not-arrived',
        duration: '-'
      },
      weekly: [
        {
          date: new Date(),
          checkIn: null,
          checkOut: null,
          status: 'absent',
          duration: '-'
        },
        {
          date: subDays(new Date(), 1),
          checkIn: '08:30',
          checkOut: '16:00',
          status: 'completed',
          duration: '7h 30m'
        },
        {
          date: subDays(new Date(), 2),
          checkIn: '08:20',
          checkOut: '15:45',
          status: 'completed',
          duration: '7h 25m'
        },
        {
          date: subDays(new Date(), 3),
          checkIn: '08:15',
          checkOut: '16:00',
          status: 'completed',
          duration: '7h 45m'
        },
        {
          date: subDays(new Date(), 4),
          checkIn: '08:35',
          checkOut: '15:30',
          status: 'completed',
          duration: '6h 55m'
        }
      ]
    },
    lucas: {
      today: {
        checkIn: null,
        expectedCheckOut: '15:30',
        status: 'absent',
        duration: '-'
      },
      weekly: [
        {
          date: new Date(),
          checkIn: null,
          checkOut: null,
          status: 'absent',
          duration: '-'
        },
        {
          date: subDays(new Date(), 1),
          checkIn: null,
          checkOut: null,
          status: 'absent',
          duration: '-'
        },
        {
          date: subDays(new Date(), 2),
          checkIn: '09:00',
          checkOut: '15:30',
          status: 'completed',
          duration: '6h 30m'
        },
        {
          date: subDays(new Date(), 3),
          checkIn: '08:45',
          checkOut: '15:15',
          status: 'completed',
          duration: '6h 30m'
        },
        {
          date: subDays(new Date(), 4),
          checkIn: '08:30',
          checkOut: '15:30',
          status: 'completed',
          duration: '7h 00m'
        }
      ]
    }
  };

  const currentChild = children.find(child => child.id === selectedChild);
  const currentData = attendanceData[selectedChild as keyof typeof attendanceData];

  const handlePreviousWeek = () => {
    setSelectedWeek(prev => prev - 1);
  };

  const handleNextWeek = () => {
    setSelectedWeek(prev => prev + 1);
  };

  const getWeekDateRange = () => {
    const startDate = addWeeks(subDays(new Date(), 4), selectedWeek);
    const endDate = addWeeks(new Date(), selectedWeek);
    return {
      start: format(startDate, 'MMM d', { locale }),
      end: format(endDate, 'MMM d, yyyy', { locale })
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('guardian.attendance.title')}</h1>
          <p className="text-slate-600 mt-2">{t('guardian.attendance.description')}</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select child" />
            </SelectTrigger>
            <SelectContent>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <div>
                      <p className="font-medium">{child.name}</p>
                      <p className="text-sm text-slate-500">{child.kindergarten}</p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Current Child Info */}
      {currentChild && (
        <Card className="border-l-4 border-l-oslo-blue">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-oslo-blue" />
              {currentChild.name}
            </CardTitle>
            <CardDescription>{currentChild.kindergarten}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Today's Status */}
      <Card className={`border-l-4 ${
        currentData.today.status === 'present' ? 'border-l-green-500' :
        currentData.today.status === 'not-arrived' ? 'border-l-yellow-500' :
        'border-l-red-500'
      }`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {currentData.today.status === 'present' ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : currentData.today.status === 'not-arrived' ? (
              <Clock className="w-5 h-5 text-yellow-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  currentData.today.checkIn ? 'bg-green-500' : 'bg-slate-400'
                }`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">{t('guardian.attendance.checkedInAt')}</p>
                  <p className="font-semibold text-lg">{currentData.today.checkIn || 'Not checked in'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-oslo-blue rounded-full flex items-center justify-center text-white">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">{t('guardian.attendance.expectedCheckout')}</p>
                  <p className="font-semibold text-lg">{currentData.today.expectedCheckOut}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <Badge className={
                  currentData.today.status === 'present' ? 'bg-green-500 text-lg px-4 py-2' :
                  currentData.today.status === 'not-arrived' ? 'bg-yellow-500 text-lg px-4 py-2' :
                  'bg-red-500 text-lg px-4 py-2'
                }>
                  {currentData.today.status === 'present' ? t('guardian.attendance.status.present') :
                   currentData.today.status === 'not-arrived' ? 'Not Arrived' :
                   'Absent'}
                </Badge>
                <p className="text-sm text-slate-600 mt-2">
                  {t('guardian.attendance.duration')}: {currentData.today.duration}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('guardian.attendance.weeklyOverview')}</CardTitle>
              <CardDescription>{getWeekDateRange().start} - {getWeekDateRange().end}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousWeek}
                className="px-3"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium px-3">
                {selectedWeek === 0 ? 'This Week' : 
                 selectedWeek === -1 ? 'Last Week' :
                 selectedWeek > 0 ? `${selectedWeek} weeks ahead` :
                 `${Math.abs(selectedWeek)} weeks ago`}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextWeek}
                className="px-3"
                disabled={selectedWeek >= 0}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentData.weekly.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {format(addWeeks(day.date, selectedWeek), 'EEEE d. MMMM', { locale })}
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
            <div className="text-2xl font-bold text-green-500">
              {selectedChild === 'oliver' ? '95%' : 
               selectedChild === 'emma' ? '88%' : '76%'}
            </div>
            <p className="text-sm text-slate-600">{t('guardian.attendance.stats.attendanceRate')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-oslo-blue">
              {selectedChild === 'oliver' ? '7h 25m' : 
               selectedChild === 'emma' ? '7h 15m' : '6h 45m'}
            </div>
            <p className="text-sm text-slate-600">{t('guardian.attendance.stats.averageDaily')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {selectedChild === 'oliver' ? '2' : 
               selectedChild === 'emma' ? '3' : '5'}
            </div>
            <p className="text-sm text-slate-600">{t('guardian.attendance.stats.absencesThisMonth')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceTracking;
