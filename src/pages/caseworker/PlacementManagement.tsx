
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, MapPin, Calendar, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const PlacementManagement = () => {
  // Mock data for kindergartens and capacity
  const kindergartens = [
    {
      id: 'k1',
      name: 'Vårtun Barnehage',
      district: 'Søndre Nordstrand',
      type: 'Private',
      capacity: {
        total: 84,
        occupied: 78,
        available: 6
      },
      ageGroups: {
        '1-2': { total: 24, occupied: 22, available: 2 },
        '3-5': { total: 60, occupied: 56, available: 4 }
      },
      pendingPlacements: 3,
      waitingList: 12
    },
    {
      id: 'k2',
      name: 'Solbakken Barnehage',
      district: 'Søndre Nordstrand',
      type: 'Municipal',
      capacity: {
        total: 96,
        occupied: 89,
        available: 7
      },
      ageGroups: {
        '1-2': { total: 30, occupied: 28, available: 2 },
        '3-5': { total: 66, occupied: 61, available: 5 }
      },
      pendingPlacements: 5,
      waitingList: 18
    },
    {
      id: 'k3',
      name: 'Blomstereng Barnehage',
      district: 'Søndre Nordstrand',
      type: 'Municipal',
      capacity: {
        total: 72,
        occupied: 72,
        available: 0
      },
      ageGroups: {
        '1-2': { total: 24, occupied: 24, available: 0 },
        '3-5': { total: 48, occupied: 48, available: 0 }
      },
      pendingPlacements: 0,
      waitingList: 25
    }
  ];

  const recentPlacements = [
    {
      id: 1,
      childName: 'Emma Larsen',
      kindergarten: 'Vårtun Barnehage',
      placedDate: '2024-03-20',
      startDate: '2024-08-15',
      status: 'confirmed'
    },
    {
      id: 2,
      childName: 'Noah Hansen',
      kindergarten: 'Solbakken Barnehage',
      placedDate: '2024-03-19',
      startDate: '2024-08-15',
      status: 'pending_acceptance'
    },
    {
      id: 3,
      childName: 'Lise Andersen',
      kindergarten: 'Vårtun Barnehage',
      placedDate: '2024-03-18',
      startDate: '2024-08-15',
      status: 'confirmed'
    }
  ];

  const getCapacityColor = (percentage: number) => {
    if (percentage >= 95) return 'text-red-600';
    if (percentage >= 85) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Bekreftet</Badge>;
      case 'pending_acceptance':
        return <Badge className="bg-yellow-100 text-yellow-800">Venter svar</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800">Avslått</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalCapacity = kindergartens.reduce((sum, kg) => sum + kg.capacity.total, 0);
  const totalOccupied = kindergartens.reduce((sum, kg) => sum + kg.capacity.occupied, 0);
  const totalAvailable = kindergartens.reduce((sum, kg) => sum + kg.capacity.available, 0);
  const totalWaitingList = kindergartens.reduce((sum, kg) => sum + kg.waitingList, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Plasshåndtering</h1>
        <p className="text-gray-600 mt-2">
          Oversikt over kapasitet og plasseringer i ditt distrikt
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <h3 className="font-semibold">Total kapasitet</h3>
              <p className="text-2xl font-bold text-blue-600">{totalCapacity}</p>
              <p className="text-xs text-gray-600">{totalOccupied} opptatt</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <h3 className="font-semibold">Ledige plasser</h3>
              <p className="text-2xl font-bold text-green-600">{totalAvailable}</p>
              <p className="text-xs text-gray-600">Tilgjengelig nå</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <AlertCircle className="h-8 w-8 text-orange-600 mr-4" />
            <div>
              <h3 className="font-semibold">Venteliste</h3>
              <p className="text-2xl font-bold text-orange-600">{totalWaitingList}</p>
              <p className="text-xs text-gray-600">Aktive søkere</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <h3 className="font-semibold">Utnyttelsesgrad</h3>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round((totalOccupied / totalCapacity) * 100)}%
              </p>
              <p className="text-xs text-gray-600">Gjennomsnitt</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kindergarten Capacity Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Kapasitetsoversikt - Søndre Nordstrand
          </CardTitle>
          <CardDescription>
            Detaljert oversikt over ledige plasser per barnehage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {kindergartens.map((kg) => {
            const occupancyPercentage = (kg.capacity.occupied / kg.capacity.total) * 100;
            
            return (
              <div key={kg.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{kg.name}</h3>
                    <p className="text-sm text-gray-600">{kg.type} barnehage</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getCapacityColor(occupancyPercentage)}`}>
                      {kg.capacity.available}
                    </p>
                    <p className="text-sm text-gray-600">ledige plasser</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium mb-2">Total kapasitet</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Opptatt</span>
                        <span>{kg.capacity.occupied}/{kg.capacity.total}</span>
                      </div>
                      <Progress value={occupancyPercentage} className="h-2" />
                      <p className="text-xs text-gray-600">
                        {occupancyPercentage.toFixed(1)}% utnyttelse
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Aldersgrupper</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>1-2 år:</span>
                        <span>{kg.ageGroups['1-2'].available} ledige</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>3-5 år:</span>
                        <span>{kg.ageGroups['3-5'].available} ledige</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Venteliste</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Venter plass:</span>
                        <span>{kg.waitingList} barn</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Avventer svar:</span>
                        <span>{kg.pendingPlacements} tilbud</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    Se detaljer
                  </Button>
                  <Button variant="outline" size="sm">
                    Rediger kapasitet
                  </Button>
                  {kg.capacity.available > 0 && (
                    <Button size="sm" className="bg-oslo-blue hover:bg-blue-700">
                      Tildel plass
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recent Placements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Siste plasseringer
          </CardTitle>
          <CardDescription>
            Nylige plasseringstilbud og deres status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPlacements.map((placement) => (
              <div key={placement.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{placement.childName}</h4>
                  <p className="text-sm text-gray-600">{placement.kindergarten}</p>
                  <p className="text-xs text-gray-500">
                    Plassert: {placement.placedDate} • Start: {placement.startDate}
                  </p>
                </div>
                <div className="text-right">
                  {getStatusBadge(placement.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Capacity Alerts */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            Kapasitetsvarsel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Blomstereng Barnehage:</strong> Full kapasitet. 25 barn på venteliste.
            </p>
            <p className="text-sm">
              <strong>Vårtun Barnehage:</strong> Kun 6 ledige plasser igjen for høsten 2024.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlacementManagement;
