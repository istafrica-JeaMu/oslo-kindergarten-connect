
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
      name: 'Vårtun Kindergarten',
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
      name: 'Solbakken Kindergarten',
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
      name: 'Blomstereng Kindergarten',
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
      kindergarten: 'Vårtun Kindergarten',
      placedDate: '2024-03-20',
      startDate: '2024-08-15',
      status: 'confirmed'
    },
    {
      id: 2,
      childName: 'Noah Hansen',
      kindergarten: 'Solbakken Kindergarten',
      placedDate: '2024-03-19',
      startDate: '2024-08-15',
      status: 'pending_acceptance'
    },
    {
      id: 3,
      childName: 'Lise Andersen',
      kindergarten: 'Vårtun Kindergarten',
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
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending_acceptance':
        return <Badge className="bg-yellow-100 text-yellow-800">Awaiting Response</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800">Declined</Badge>;
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
        <h1 className="text-3xl font-bold text-gray-900">Placement Management</h1>
        <p className="text-gray-600 mt-2">
          Overview of capacity and placements in your district
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <h3 className="font-semibold">Total Capacity</h3>
              <p className="text-2xl font-bold text-blue-600">{totalCapacity}</p>
              <p className="text-xs text-gray-600">{totalOccupied} occupied</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <h3 className="font-semibold">Available Spots</h3>
              <p className="text-2xl font-bold text-green-600">{totalAvailable}</p>
              <p className="text-xs text-gray-600">Available now</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <AlertCircle className="h-8 w-8 text-orange-600 mr-4" />
            <div>
              <h3 className="font-semibold">Waiting List</h3>
              <p className="text-2xl font-bold text-orange-600">{totalWaitingList}</p>
              <p className="text-xs text-gray-600">Active applicants</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <h3 className="font-semibold">Utilization Rate</h3>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round((totalOccupied / totalCapacity) * 100)}%
              </p>
              <p className="text-xs text-gray-600">Average</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kindergarten Capacity Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Capacity Overview - Søndre Nordstrand
          </CardTitle>
          <CardDescription>
            Detailed overview of available spots per kindergarten
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
                    <p className="text-sm text-gray-600">{kg.type} kindergarten</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getCapacityColor(occupancyPercentage)}`}>
                      {kg.capacity.available}
                    </p>
                    <p className="text-sm text-gray-600">available spots</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium mb-2">Total Capacity</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Occupied</span>
                        <span>{kg.capacity.occupied}/{kg.capacity.total}</span>
                      </div>
                      <Progress value={occupancyPercentage} className="h-2" />
                      <p className="text-xs text-gray-600">
                        {occupancyPercentage.toFixed(1)}% utilization
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Age Groups</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>1-2 years:</span>
                        <span>{kg.ageGroups['1-2'].available} available</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>3-5 years:</span>
                        <span>{kg.ageGroups['3-5'].available} available</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Waiting List</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Awaiting placement:</span>
                        <span>{kg.waitingList} children</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pending response:</span>
                        <span>{kg.pendingPlacements} offers</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit Capacity
                  </Button>
                  {kg.capacity.available > 0 && (
                    <Button size="sm" className="bg-oslo-blue hover:bg-blue-700">
                      Assign Placement
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
            Recent Placements
          </CardTitle>
          <CardDescription>
            Recent placement offers and their status
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
                    Placed: {placement.placedDate} • Start: {placement.startDate}
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
            Capacity Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Blomstereng Kindergarten:</strong> At full capacity. 25 children on waiting list.
            </p>
            <p className="text-sm">
              <strong>Vårtun Kindergarten:</strong> Only 6 available spots remaining for fall 2024.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlacementManagement;
