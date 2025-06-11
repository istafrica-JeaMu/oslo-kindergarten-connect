
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Settings, Clock, Users, CheckCircle } from 'lucide-react';

const PlacementCalendar = () => {
  const placementPeriods = [
    {
      id: 1,
      name: 'Spring 2025 Placement',
      applicationDeadline: '2024-12-15',
      placementStart: '2025-01-15',
      status: 'Active',
      applicationsReceived: 234,
      placementsConfirmed: 187
    },
    {
      id: 2,
      name: 'Fall 2025 Placement',
      applicationDeadline: '2025-06-15',
      placementStart: '2025-08-15',
      status: 'Upcoming',
      applicationsReceived: 0,
      placementsConfirmed: 0
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Placement Calendar</h1>
          <p className="text-slate-600 mt-2">
            Configure placement periods and application windows
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Placement Period
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">2</p>
                <p className="text-sm text-slate-600">Active Periods</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">234</p>
                <p className="text-sm text-slate-600">Total Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">187</p>
                <p className="text-sm text-slate-600">Placements Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Placement Periods */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Placement Periods</h2>
        {placementPeriods.map((period) => (
          <Card key={period.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{period.name}</h3>
                    <Badge variant={period.status === 'Active' ? 'default' : 'secondary'}>
                      {period.status}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Application Deadline: {period.applicationDeadline}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Placement Start: {period.placementStart}
                    </div>
                    <div>Applications: {period.applicationsReceived}</div>
                    <div>Confirmed: {period.placementsConfirmed}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlacementCalendar;
