
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileCheck, Camera, MapPin, Stethoscope, Clock, Download, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

const Consents = () => {
  const { t } = useLanguage();

  // Mock consents data
  const consents = [
    {
      id: 1,
      type: 'photo',
      title: t('guardian.consents.types.photo.title'),
      description: t('guardian.consents.types.photo.description'),
      status: 'active',
      signed: '2024-01-15',
      expires: '2024-12-31',
      icon: Camera
    },
    {
      id: 2,
      type: 'medical',
      title: t('guardian.consents.types.medical.title'),
      description: t('guardian.consents.types.medical.description'),
      status: 'active',
      signed: '2024-01-15',
      expires: '2025-01-15',
      icon: Stethoscope
    },
    {
      id: 3,
      type: 'trips',
      title: t('guardian.consents.types.trips.title'),
      description: t('guardian.consents.types.trips.description'),
      status: 'expires_soon',
      signed: '2024-01-15',
      expires: '2024-04-01',
      icon: MapPin
    },
    {
      id: 4,
      type: 'data',
      title: t('guardian.consents.types.data.title'),
      description: t('guardian.consents.types.data.description'),
      status: 'pending',
      signed: null,
      expires: null,
      icon: FileCheck
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'expires_soon': return 'bg-yellow-100 text-yellow-700';
      case 'expired': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    return t(`guardian.consents.status.${status}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('guardian.consents.title')}</h1>
          <p className="text-slate-600 mt-2">{t('guardian.consents.description')}</p>
        </div>
        <Badge variant="outline" className="bg-oslo-blue/5 text-oslo-blue border-oslo-blue/20">
          <FileCheck className="w-4 h-4 mr-2" />
          {t('guardian.consents.badge')}
        </Badge>
      </div>

      {/* Pending Consents Alert */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {t('guardian.consents.actionsRequired')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700 mb-4">
            {t('guardian.consents.pendingMessage')}
          </p>
          <Button className="bg-yellow-600 hover:bg-yellow-700">
            {t('guardian.consents.completeMissing')}
          </Button>
        </CardContent>
      </Card>

      {/* Consents List */}
      <Card>
        <CardHeader>
          <CardTitle>{t('guardian.consents.allConsents')}</CardTitle>
          <CardDescription>{t('guardian.consents.consentOverview')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {consents.map((consent) => (
              <div key={consent.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <consent.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{consent.title}</h3>
                    <p className="text-sm text-slate-600">{consent.description}</p>
                    {consent.signed && (
                      <p className="text-xs text-slate-500 mt-1">
                        {t('guardian.consents.signed')}: {format(new Date(consent.signed), 'd. MMM yyyy', { locale: nb })}
                        {consent.expires && (
                          <> • {t('guardian.consents.expires')}: {format(new Date(consent.expires), 'd. MMM yyyy', { locale: nb })}</>
                        )}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(consent.status)}>
                    {getStatusText(consent.status)}
                  </Badge>
                  
                  <div className="flex gap-1">
                    {consent.status === 'pending' ? (
                      <Button size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        {t('guardian.consents.sign')}
                      </Button>
                    ) : (
                      <>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Information */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">{t('guardian.consents.importantInfo')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• {t('guardian.consents.info.legally')}</p>
            <p>• {t('guardian.consents.info.reminder')}</p>
            <p>• {t('guardian.consents.info.participation')}</p>
            <p>• {t('guardian.consents.info.digital')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Consents;
