
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addWeeks } from 'date-fns';
import { nb, enUS } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeeklyAttendance {
  date: Date;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'completed' | 'absent';
  duration: string;
}

interface WeeklyOverviewProps {
  weeklyData: WeeklyAttendance[];
  selectedWeek: number;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  getWeekDateRange: () => { start: string; end: string };
}

const WeeklyOverview = ({ 
  weeklyData, 
  selectedWeek, 
  onPreviousWeek, 
  onNextWeek, 
  getWeekDateRange 
}: WeeklyOverviewProps) => {
  const { t, language } = useLanguage();
  const locale = language === 'nb' ? nb : enUS;
  const weekRange = getWeekDateRange();

  const getWeekLabel = () => {
    if (selectedWeek === 0) return t('guardian.attendance.thisWeek', 'This Week');
    if (selectedWeek === -1) return t('guardian.attendance.lastWeek', 'Last Week');
    if (selectedWeek > 0) return t('guardian.attendance.weeksAhead', `${selectedWeek} weeks ahead`);
    return t('guardian.attendance.weeksAgo', `${Math.abs(selectedWeek)} weeks ago`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('guardian.attendance.weeklyOverview', 'Weekly Overview')}</CardTitle>
            <CardDescription>{weekRange.start} - {weekRange.end}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviousWeek}
              className="px-3"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium px-3">
              {getWeekLabel()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onNextWeek}
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
          {weeklyData.map((day, index) => (
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
                      <span>{t('guardian.attendance.in', 'In')}: {day.checkIn}</span>
                    )}
                    {day.checkOut && (
                      <span>{t('guardian.attendance.out', 'Out')}: {day.checkOut}</span>
                    )}
                    {!day.checkIn && !day.checkOut && (
                      <span>{t('guardian.attendance.status.absent', 'Absent')}</span>
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
                  {t(`guardian.attendance.status.${day.status}`, 
                    day.status === 'present' ? 'Present' :
                    day.status === 'completed' ? 'Completed' :
                    'Absent'
                  )}
                </Badge>
                <p className="text-sm text-slate-600 mt-1">{day.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyOverview;
