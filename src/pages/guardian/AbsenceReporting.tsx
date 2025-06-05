
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, AlertTriangle, Plus } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { nb, enUS } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

const AbsenceReporting = () => {
  const { t, language } = useLanguage();
  const [selectedReason, setSelectedReason] = useState('');
  
  const locale = language === 'nb' ? nb : enUS;
  
  // Mock absence data
  const recentAbsences = [
    {
      id: 1,
      date: '2024-03-15',
      reason: t('guardian.absence.reasons.sick'),
      status: 'approved',
      reportedAt: '2024-03-15T07:30:00'
    },
    {
      id: 2,
      date: '2024-03-10',
      reason: t('guardian.absence.reasons.doctor'),
      status: 'approved',
      reportedAt: '2024-03-09T16:45:00'
    }
  ];

  const absenceReasons = [
    { id: 'sick', label: t('guardian.absence.reasons.sick') },
    { id: 'doctor', label: t('guardian.absence.reasons.doctor') },
    { id: 'emergency', label: t('guardian.absence.reasons.emergency') },
    { id: 'other', label: t('guardian.absence.reasons.other') }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('guardian.absence.title')}</h1>
          <p className="text-slate-600 mt-2">{t('guardian.absence.description')}</p>
        </div>
      </div>

      {/* Quick Report Today */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            {t('guardian.absence.quickReport')}
          </CardTitle>
          <CardDescription>
            {format(new Date(), 'EEEE d. MMMM yyyy', { locale })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {absenceReasons.map((reason) => (
              <Button
                key={reason.id}
                variant={selectedReason === reason.id ? "default" : "outline"}
                onClick={() => setSelectedReason(reason.id)}
                className="h-auto py-3 px-4"
              >
                {reason.label}
              </Button>
            ))}
          </div>
          
          {selectedReason && (
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    {t('guardian.absence.additionalInfo')}
                  </label>
                  <textarea 
                    placeholder={t('guardian.absence.additionalInfoPlaceholder')}
                    className="w-full p-3 border rounded-lg resize-none h-20"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1">
                  {t('guardian.absence.reportAbsence')}
                </Button>
                <Button variant="outline" onClick={() => setSelectedReason('')}>
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Absence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {t('guardian.absence.scheduleAbsence')}
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              {t('guardian.absence.scheduleNew')}
            </Button>
          </CardTitle>
          <CardDescription>{t('guardian.absence.scheduleDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-7 gap-4">
            {Array.from({ length: 7 }, (_, i) => {
              const date = addDays(new Date(), i);
              return (
                <div key={i} className="border rounded-lg p-3 text-center hover:bg-slate-50 cursor-pointer">
                  <div className="text-xs text-slate-600 mb-1">
                    {format(date, 'EEE', { locale })}
                  </div>
                  <div className="font-semibold">
                    {format(date, 'd', { locale })}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {format(date, 'MMM', { locale })}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Absences */}
      <Card>
        <CardHeader>
          <CardTitle>{t('guardian.absence.recentAbsences')}</CardTitle>
          <CardDescription>{t('guardian.absence.recentDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAbsences.map((absence) => (
              <div key={absence.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {format(new Date(absence.date), 'EEEE d. MMMM', { locale })}
                    </h3>
                    <p className="text-sm text-slate-600">{absence.reason}</p>
                    <p className="text-xs text-slate-500">
                      {t('guardian.absence.reportedAt')}: {format(new Date(absence.reportedAt), 'HH:mm', { locale })}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-500">
                  {t('guardian.absence.status.approved')}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AbsenceReporting;
