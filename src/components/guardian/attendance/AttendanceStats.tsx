
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface AttendanceStatsProps {
  selectedChild: string;
}

const AttendanceStats = ({ selectedChild }: AttendanceStatsProps) => {
  const { t } = useLanguage();

  const getStatsForChild = (childId: string) => {
    switch (childId) {
      case 'oliver':
        return { attendanceRate: '95%', averageHours: '7h 25m', absences: '2' };
      case 'emma':
        return { attendanceRate: '88%', averageHours: '7h 15m', absences: '3' };
      default:
        return { attendanceRate: '76%', averageHours: '6h 45m', absences: '5' };
    }
  };

  const stats = getStatsForChild(selectedChild);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-green-500">
            {stats.attendanceRate}
          </div>
          <p className="text-sm text-slate-600">{t('guardian.attendance.stats.attendanceRate', 'Attendance Rate')}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-oslo-blue">
            {stats.averageHours}
          </div>
          <p className="text-sm text-slate-600">{t('guardian.attendance.stats.averageDaily', 'Average Daily Hours')}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-yellow-500">
            {stats.absences}
          </div>
          <p className="text-sm text-slate-600">{t('guardian.attendance.stats.absencesThisMonth', 'Absences This Month')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceStats;
