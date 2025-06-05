
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { 
  UserCheck, 
  UserX, 
  Calendar,
  Search,
  Filter,
  Download,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

const KindergartenAttendance = () => {
  const { user } = useAuth();

  const attendanceStats = [
    {
      title: 'Present Today',
      value: '108',
      total: '124',
      percentage: '87%',
      icon: UserCheck,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Absent Today',
      value: '16',
      total: '124',
      percentage: '13%',
      icon: UserX,
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'Late Arrivals',
      value: '5',
      total: '108',
      percentage: '5%',
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Early Pickups',
      value: '3',
      total: '108',
      percentage: '3%',
      icon: AlertTriangle,
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  const todaysAttendance = [
    { 
      name: 'Emma Larsen', 
      age: '3 years', 
      group: 'Sunshine Room',
      arrivalTime: '08:30', 
      status: 'Present',
      notes: ''
    },
    { 
      name: 'Oliver Hansen', 
      age: '4 years', 
      group: 'Rainbow Group',
      arrivalTime: '09:15', 
      status: 'Late',
      notes: 'Traffic delay'
    },
    { 
      name: 'Maja Andersen', 
      age: '2 years', 
      group: 'Star Class',
      arrivalTime: '-', 
      status: 'Absent',
      notes: 'Sick leave'
    },
    { 
      name: 'Sofia Kristensen', 
      age: '3 years', 
      group: 'Sunshine Room',
      arrivalTime: '08:45', 
      status: 'Present',
      notes: ''
    },
    { 
      name: 'Noah Pettersen', 
      age: '4 years', 
      group: 'Rainbow Group',
      arrivalTime: '08:20', 
      status: 'Present',
      notes: ''
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />{status}</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />{status}</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="w-3 h-3 mr-1" />{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Attendance Management
          </h1>
          <p className="text-slate-600 mt-2">
            Track and manage daily attendance • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={user?.role === 'staff' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-purple-100 text-purple-800 border-purple-200'}>
            {user?.role === 'staff' ? 'Public Kindergarten' : 'Private Kindergarten'}
          </Badge>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attendanceStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <span className="text-sm text-slate-500">/ {stat.total}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700 mt-1">{stat.percentage}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-16 flex-col space-y-2">
              <UserCheck className="w-6 h-6" />
              <span>Mark Present</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <UserX className="w-6 h-6" />
              <span>Mark Absent</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <Clock className="w-6 h-6" />
              <span>Late Arrival</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <Calendar className="w-6 h-6" />
              <span>View History</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Today's Attendance */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Attendance
              </CardTitle>
              <CardDescription>
                Current attendance status for all enrolled children
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <Input placeholder="Search children..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaysAttendance.map((child, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {child.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{child.name}</p>
                    <p className="text-sm text-slate-600">{child.age} • {child.group}</p>
                    {child.notes && <p className="text-xs text-slate-500 mt-1">{child.notes}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">
                      {child.arrivalTime !== '-' ? `Arrived: ${child.arrivalTime}` : 'Not arrived'}
                    </p>
                  </div>
                  {getStatusBadge(child.status)}
                  <Button size="sm" variant="outline">
                    Edit
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

export default KindergartenAttendance;
