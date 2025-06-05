
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin,
  Clock,
  Navigation,
  Phone,
  Users,
  Home,
  TreePine,
  Utensils,
  BookOpen,
  Bed,
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

const ChildLocation = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock location data
  const currentLocation = {
    area: 'Hovedrom - Avd. Blå',
    specific: 'Lesehjørnet',
    activity: 'Fri lek og lesing',
    staff: 'Kari Andersen',
    staffPhone: '+47 123 45 678',
    children: 8,
    since: '13:45',
    nextScheduled: {
      time: '15:00',
      area: 'Spisesalen',
      activity: 'Mellommåltid'
    }
  };

  const locationHistory = [
    { time: '13:45', area: 'Hovedrom - Avd. Blå', activity: 'Fri lek og lesing', icon: BookOpen },
    { time: '13:00', area: 'Hvilerom', activity: 'Hvil og ro', icon: Bed },
    { time: '11:30', area: 'Spisesalen', activity: 'Lunsj', icon: Utensils },
    { time: '10:30', area: 'Utebygninger', activity: 'Uteliv', icon: TreePine },
    { time: '09:00', area: 'Samlingssalen', activity: 'Samling og dagens aktivitet', icon: Users },
    { time: '08:15', area: 'Hovedrom - Avd. Blå', activity: 'Ankomst og fri lek', icon: Home },
  ];

  const kindergartenMap = {
    areas: [
      { id: 'main-blue', name: 'Hovedrom - Avd. Blå', x: 20, y: 30, current: true },
      { id: 'dining', name: 'Spisesalen', x: 60, y: 20 },
      { id: 'rest', name: 'Hvilerom', x: 80, y: 40 },
      { id: 'gathering', name: 'Samlingssalen', x: 40, y: 60 },
      { id: 'outdoor', name: 'Utebygninger', x: 20, y: 80 },
      { id: 'activity', name: 'Aktivitetsrom', x: 70, y: 70 },
    ]
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Barnets plassering</h1>
          <p className="text-slate-600 mt-2">Se hvor barnet ditt befinner seg i barnehagen</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-oslo-blue/5 text-oslo-blue border-oslo-blue/20">
            <MapPin className="w-4 h-4 mr-2" />
            Live plassering
          </Badge>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Oppdater
          </Button>
        </div>
      </div>

      {/* Current Location */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Nåværende plassering
          </CardTitle>
          <CardDescription className="text-green-700">
            Sist oppdatert: {format(lastUpdated, 'HH:mm', { locale: nb })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-green-800 text-lg">{currentLocation.area}</h3>
                <p className="text-green-700">{currentLocation.specific}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Siden kl. {currentLocation.since}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{currentLocation.activity}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{currentLocation.children} barn i området</span>
                </div>
              </div>

              <div className="pt-3 border-t border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Ansvarlig personal</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{currentLocation.staff}</span>
                  <Button variant="outline" size="sm" className="text-green-700 border-green-300">
                    <Phone className="w-4 h-4 mr-1" />
                    Ring
                  </Button>
                </div>
              </div>
            </div>

            {/* Next Location */}
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-3">Neste planlagte aktivitet</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">Kl. {currentLocation.nextScheduled.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">{currentLocation.nextScheduled.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">{currentLocation.nextScheduled.activity}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kindergarten Map */}
      <Card>
        <CardHeader>
          <CardTitle>Barnehagekart</CardTitle>
          <CardDescription>
            Oversikt over barnehagens områder og barnet ditt sin plassering
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative bg-slate-50 rounded-lg p-6 h-80">
            {/* Map areas */}
            {kindergartenMap.areas.map((area) => (
              <div
                key={area.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  area.current 
                    ? 'bg-green-500 text-white shadow-lg ring-4 ring-green-200' 
                    : 'bg-white border-2 border-slate-300 text-slate-700'
                } rounded-lg px-3 py-2 text-sm font-medium cursor-pointer hover:shadow-md transition-all`}
                style={{ left: `${area.x}%`, top: `${area.y}%` }}
              >
                {area.current && <MapPin className="w-4 h-4 inline mr-1" />}
                {area.name}
              </div>
            ))}
            
            {/* Current location indicator */}
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Barnet ditt
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Nåværende plassering</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border-2 border-slate-300 rounded"></div>
              <span>Andre områder</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location History */}
      <Card>
        <CardHeader>
          <CardTitle>Dagens bevegelser</CardTitle>
          <CardDescription>
            Tidslinje over hvor barnet har vært i dag
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {locationHistory.map((location, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  index === 0 ? 'bg-green-50 border border-green-200' : 'border border-slate-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <location.icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium">
                      {location.time}
                    </span>
                    {index === 0 && (
                      <Badge className="bg-green-500 text-xs">Nå</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold">{location.area}</h3>
                  <p className="text-sm text-slate-600">{location.activity}</p>
                </div>
                
                <div className="w-px h-8 bg-slate-200"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pickup Assistance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Hentehjelp
          </CardTitle>
          <CardDescription>
            Praktisk informasjon for henting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Rute til barnet</h4>
              <p className="text-sm text-slate-600">
                Hovedinngang → Gang høyre → {currentLocation.area}
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Estimert tid</h4>
              <p className="text-sm text-slate-600">
                Ca. 2 minutter å gå til barnet
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Kontakt personal</h4>
              <Button variant="outline" size="sm" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Ring {currentLocation.staff}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildLocation;
