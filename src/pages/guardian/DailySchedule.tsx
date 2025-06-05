
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Utensils, Moon } from 'lucide-react';
import { format } from 'date-fns';
import { nb, enUS } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

const DailySchedule = () => {
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const locale = language === 'nb' ? nb : enUS;
  
  // Mock schedule data
  const todaySchedule = [
    {
      time: '08:00',
      activity: t('guardian.dailySchedule.activities.arrival'),
      location: t('guardian.dailySchedule.locations.mainRoom'),
      icon: Users,
      status: 'completed'
    },
    {
      time: '08:30',
      activity: t('guardian.dailySchedule.activities.breakfast'),
      location: t('guardian.dailySchedule.locations.diningRoom'),
      icon: Utensils,
      status: 'completed'
    },
    {
      time: '09:30',
      activity: t('guardian.dailySchedule.activities.outdoorPlay'),
      location: t('guardian.dailySchedule.locations.playground'),
      icon: MapPin,
      status: 'current'
    },
    {
      time: '11:00',
      activity: t('guardian.dailySchedule.activities.learningTime'),
      location: t('guardian.dailySchedule.locations.classroom'),
      icon: Users,
      status: 'upcoming'
    },
    {
      time: '12:00',
      activity: t('guardian.dailySchedule.activities.lunch'),
      location: t('guardian.dailySchedule.locations.diningRoom'),
      icon: Utensils,
      status: 'upcoming'
    },
    {
      time: '13:00',
      activity: t('guardian.dailySchedule.activities.restTime'),
      location: t('guardian.dailySchedule.locations.restRoom'),
      icon: Moon,
      status: 'upcoming'
    },
    {
      time: '14:30',
      activity: t('guardian.dailySchedule.activities.pickup'),
      location: t('guardian.dailySchedule.locations.mainRoom'),
      icon: Users,
      status: 'upcoming'
    }
  ];

  const getCurrentActivity = () => {
    return todaySchedule.find(item => item.status === 'current');
  };

  const currentActivity = getCurrentActivity();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('guardian.dailySchedule.title')}</h1>
          <p className="text-slate-600 mt-2">{t('guardian.dailySchedule.description')}</p>
        </div>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          {t('guardian.dailySchedule.viewWeek')}
        </Button>
      </div>

      {/* Current Activity */}
      {currentActivity && (
        <Card className="border-l-4 border-l-oslo-blue bg-oslo-blue/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-oslo-blue" />
              {t('guardian.dailySchedule.currentActivity')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-oslo-blue rounded-full flex items-center justify-center text-white">
                <currentActivity.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{currentActivity.activity}</h3>
                <p className="text-slate-600">{currentActivity.time} - {currentActivity.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>{t('guardian.dailySchedule.schedule')}</CardTitle>
          <CardDescription>
            {format(selectedDate, 'EEEE d. MMMM yyyy', { locale })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaySchedule.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  item.status === 'current' ? 'bg-oslo-blue/10 border-oslo-blue' :
                  item.status === 'completed' ? 'bg-green-50 border-green-200' :
                  'bg-white border-slate-200'
                }`}
              >
                <div className="text-sm font-mono text-slate-600 w-16">
                  {item.time}
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.status === 'current' ? 'bg-oslo-blue text-white' :
                  item.status === 'completed' ? 'bg-green-500 text-white' :
                  'bg-slate-200 text-slate-600'
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.activity}</h3>
                  <p className="text-sm text-slate-600">{item.location}</p>
                </div>
                <Badge variant={
                  item.status === 'current' ? 'default' :
                  item.status === 'completed' ? 'outline' :
                  'secondary'
                }>
                  {t(`guardian.dailySchedule.status.${item.status}`)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailySchedule;
