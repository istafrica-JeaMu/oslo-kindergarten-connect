
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, User, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { nb, enUS } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

const ChildLocation = () => {
  const { t, language } = useLanguage();
  const [selectedView, setSelectedView] = useState('current');
  
  const locale = language === 'nb' ? nb : enUS;
  
  // Mock location data
  const currentLocation = {
    area: t('guardian.location.areas.playground'),
    building: t('guardian.location.buildings.main'),
    room: t('guardian.location.rooms.outdoor'),
    lastUpdate: new Date(),
    staff: 'Kari Andersen',
    staffPhone: '+47 123 45 678'
  };

  const locationHistory = [
    {
      time: '13:45',
      area: t('guardian.location.areas.playground'),
      activity: t('guardian.location.activities.outdoorPlay')
    },
    {
      time: '12:30',
      area: t('guardian.location.areas.diningRoom'),
      activity: t('guardian.location.activities.lunch')
    },
    {
      time: '11:00',
      area: t('guardian.location.areas.classroom'),
      activity: t('guardian.location.activities.learningTime')
    },
    {
      time: '09:30',
      area: t('guardian.location.areas.playground'),
      activity: t('guardian.location.activities.morningPlay')
    },
    {
      time: '08:15',
      area: t('guardian.location.areas.mainEntrance'),
      activity: t('guardian.location.activities.arrival')
    }
  ];

  const kindergartenMap = [
    { id: 'entrance', name: t('guardian.location.areas.mainEntrance'), x: 10, y: 80 },
    { id: 'classroom1', name: t('guardian.location.areas.classroom'), x: 30, y: 30 },
    { id: 'dining', name: t('guardian.location.areas.diningRoom'), x: 70, y: 30 },
    { id: 'playground', name: t('guardian.location.areas.playground'), x: 50, y: 70, current: true },
    { id: 'rest', name: t('guardian.location.areas.restRoom'), x: 30, y: 60 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('guardian.location.title')}</h1>
          <p className="text-slate-600 mt-2">{t('guardian.location.description')}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedView === 'current' ? 'default' : 'outline'}
            onClick={() => setSelectedView('current')}
          >
            {t('guardian.location.currentLocation')}
          </Button>
          <Button 
            variant={selectedView === 'history' ? 'default' : 'outline'}
            onClick={() => setSelectedView('history')}
          >
            {t('guardian.location.locationHistory')}
          </Button>
        </div>
      </div>

      {/* Current Location */}
      <Card className="border-l-4 border-l-oslo-blue">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-oslo-blue" />
            {t('guardian.location.currentLocation')}
          </CardTitle>
          <CardDescription>
            {t('guardian.location.lastUpdated')}: {format(currentLocation.lastUpdate, 'HH:mm', { locale })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-oslo-blue rounded-full flex items-center justify-center text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{currentLocation.area}</p>
                  <p className="text-sm text-slate-600">
                    {currentLocation.building} - {currentLocation.room}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">{t('guardian.location.responsibleStaff')}</p>
                  <p className="font-semibold">{currentLocation.staff}</p>
                </div>
              </div>

              <Button className="w-full mt-4">
                <Phone className="w-4 h-4 mr-2" />
                {t('guardian.location.contactStaff')}
              </Button>
            </div>
            
            {/* Simple Map View */}
            <div className="bg-slate-50 rounded-lg p-4 relative h-64">
              <div className="text-sm font-medium mb-2 text-center">
                {t('guardian.location.kindergartenMap')}
              </div>
              <div className="relative w-full h-48 bg-white rounded border">
                {kindergartenMap.map((location) => (
                  <div
                    key={location.id}
                    className={`absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
                      location.current ? 'bg-oslo-blue animate-pulse' : 'bg-slate-300'
                    }`}
                    style={{ 
                      left: `${location.x}%`, 
                      top: `${location.y}%` 
                    }}
                    title={location.name}
                  >
                    {location.current && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-oslo-blue text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {location.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location History */}
      {selectedView === 'history' && (
        <Card>
          <CardHeader>
            <CardTitle>{t('guardian.location.locationHistory')}</CardTitle>
            <CardDescription>{t('guardian.location.historyDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationHistory.map((entry, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="text-sm font-mono text-slate-600 w-16">
                    {entry.time}
                  </div>
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{entry.area}</h3>
                    <p className="text-sm text-slate-600">{entry.activity}</p>
                  </div>
                  {index === 0 && (
                    <Badge className="bg-oslo-blue">
                      {t('guardian.location.current')}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pickup Instructions */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Navigation className="w-5 h-5" />
            {t('guardian.location.pickupInstructions')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-green-800">
            <p>• {t('guardian.location.instructions.enterMain')}</p>
            <p>• {t('guardian.location.instructions.askStaff')}</p>
            <p>• {t('guardian.location.instructions.waitArea')}</p>
            <p>• {t('guardian.location.instructions.signOut')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildLocation;
