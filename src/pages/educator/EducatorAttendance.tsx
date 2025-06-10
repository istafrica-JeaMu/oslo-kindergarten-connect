
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MapPin
} from 'lucide-react';

const EducatorAttendance = () => {
  const { user } = useAuth();

  const attendanceData = [
    {
      id: '1',
      name: 'Emma Larsen',
      status: 'present',
      checkInTime: '08:30',
      room: 'Sunshine Room'
    },
    {
      id: '2',
      name: 'Oliver Hansen',
      status: 'absent',
      room: 'Rainbow Group'
    },
    {
      id: '3',
      name: 'Lucas Berg',
      status: 'present',
      checkInTime: '09:00',
      room: 'Adventure Group'
    }
  ];

  const stats = {
    present: attendanceData.filter(child => child.status === 'present').length,
    absent: attendanceData.filter(child => child.status === 'absent').length,
    total: attendanceData.length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Daily Attendance</h1>
          <p className="text-slate-600 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Button>
          <CheckCircle className="w-4 h-4 mr-2" />
          Mark All Present
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserCheck className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-green-700">{stats.present}</p>
                <p className="text-sm text-green-600">Present</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserX className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-red-700">{stats.absent}</p>
                <p className="text-sm text-red-600">Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
                <p className="text-sm text-blue-600">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance List */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
          <CardDescription>Check-in and manage daily attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceData.map((child) => (
              <div key={child.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    child.status === 'present' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-slate-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {child.room}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {child.checkInTime && (
                    <span className="text-sm text-slate-600">
                      Checked in: {child.checkInTime}
                    </span>
                  )}
                  <Badge variant={child.status === 'present' ? 'default' : 'destructive'}>
                    {child.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    {child.status === 'present' ? 'Check Out' : 'Check In'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducatorAttendance;
