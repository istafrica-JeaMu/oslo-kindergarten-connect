
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  MessageSquare, 
  AlertTriangle,
  MapPin
} from 'lucide-react';
import { Child } from '@/pages/staff/EducatorAttendance';

interface QuickStatsOverviewProps {
  children: Child[];
}

const QuickStatsOverview = ({ children }: QuickStatsOverviewProps) => {
  const stats = {
    present: children.filter(c => c.status === 'present').length,
    absent: children.filter(c => c.status === 'absent').length,
    onLeave: children.filter(c => c.status === 'on-leave').length,
    total: children.length,
    unreadMessages: children.reduce((sum, c) => sum + c.unreadMessages, 0),
    medicalAlerts: children.filter(c => c.medicalAlerts.length > 0).length,
    missingConsents: children.filter(c => c.missingConsents.length > 0).length
  };

  const locations = children
    .filter(c => c.status === 'present')
    .reduce((acc, child) => {
      acc[child.currentLocation] = (acc[child.currentLocation] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="space-y-4">
      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                <p className="text-sm text-green-700">Present</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                <p className="text-sm text-red-700">Absent</p>
              </div>
              <UserX className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.onLeave}</p>
                <p className="text-sm text-blue-700">On Leave</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
              <Users className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Attention Required
            </h3>
            <div className="space-y-2">
              {stats.unreadMessages > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Unread Messages</span>
                  <Badge className="bg-orange-100 text-orange-800">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {stats.unreadMessages}
                  </Badge>
                </div>
              )}
              {stats.medicalAlerts > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Medical Alerts</span>
                  <Badge className="bg-red-100 text-red-800">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {stats.medicalAlerts}
                  </Badge>
                </div>
              )}
              {stats.missingConsents > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Missing Consents</span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {stats.missingConsents}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              Current Locations
            </h3>
            <div className="space-y-2">
              {Object.entries(locations).map(([location, count]) => (
                <div key={location} className="flex items-center justify-between">
                  <span className="text-sm">{location}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))}
              {Object.keys(locations).length === 0 && (
                <p className="text-sm text-gray-500">No children present</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickStatsOverview;
