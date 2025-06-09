
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import { nb, enUS } from 'date-fns/locale';

interface TodayData {
  checkIn: string | null;
  expectedCheckOut: string;
  status: 'present' | 'not-arrived' | 'absent';
  duration: string;
}

interface TodayStatusCardProps {
  todayData: TodayData;
}

const TodayStatusCard = ({ todayData }: TodayStatusCardProps) => {
  const { t, language } = useLanguage();
  const locale = language === 'nb' ? nb : enUS;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'present':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-500',
          borderColor: 'border-l-green-500',
          label: t('guardian.attendance.status.present', 'Present')
        };
      case 'not-arrived':
        return {
          icon: Clock,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500',
          borderColor: 'border-l-yellow-500',
          label: t('guardian.attendance.status.notArrived', 'Not Arrived')
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-500',
          borderColor: 'border-l-red-500',
          label: t('guardian.attendance.status.absent', 'Absent')
        };
    }
  };

  const statusConfig = getStatusConfig(todayData.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className={`border-l-4 ${statusConfig.borderColor}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
          {t('guardian.attendance.todayStatus', 'Today\'s Status')}
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
                todayData.checkIn ? 'bg-green-500' : 'bg-slate-400'
              }`}>
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-600">{t('guardian.attendance.checkedInAt', 'Checked in at')}</p>
                <p className="font-semibold text-lg">{todayData.checkIn || t('guardian.attendance.notCheckedIn', 'Not checked in')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-oslo-blue rounded-full flex items-center justify-center text-white">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-600">{t('guardian.attendance.expectedCheckout', 'Expected checkout')}</p>
                <p className="font-semibold text-lg">{todayData.expectedCheckOut}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="text-center">
              <Badge className={`${statusConfig.bgColor} text-lg px-4 py-2`}>
                {statusConfig.label}
              </Badge>
              <p className="text-sm text-slate-600 mt-2">
                {t('guardian.attendance.duration', 'Duration')}: {todayData.duration}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayStatusCard;
