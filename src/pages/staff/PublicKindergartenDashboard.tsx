
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  UserCheck, 
  UserX, 
  FileText, 
  MessageSquare,
  Calendar,
  AlertTriangle,
  Clock,
  School,
  CheckCircle,
  Upload
} from 'lucide-react';

const PublicKindergartenDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Enrolled',
      value: '124',
      change: '+3 this week',
      icon: Users,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Present Today',
      value: '108',
      change: '87% attendance',
      icon: UserCheck,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Absent Today',
      value: '16',
      change: '3 unexcused',
      icon: UserX,
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'Pending Documents',
      value: '7',
      change: '2 urgent',
      icon: FileText,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Unread Messages',
      value: '4',
      change: '1 from district',
      icon: MessageSquare,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  const todaysSchedule = [
    { time: '08:00', activity: 'Morning Circle', department: 'All Groups' },
    { time: '09:30', activity: 'Outdoor Play', department: 'Sunshine Room' },
    { time: '10:15', activity: 'Story Time', department: 'Rainbow Group' },
    { time: '11:00', activity: 'Lunch Preparation', department: 'All Groups' },
    { time: '14:00', activity: 'Music Activity', department: 'Star Class' }
  ];

  const expectedArrivals = [
    { name: 'Emma Larsen', age: '3 years', expectedTime: '08:30', status: 'Expected' },
    { name: 'Oliver Hansen', age: '4 years', expectedTime: '09:00', status: 'Late' },
    { name: 'Maja Andersen', age: '2 years', expectedTime: '08:45', status: 'Arrived' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-slate-600 mt-2">
            Solsikken Kindergarten • District: {user?.district || 'Søndre Nordstrand'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <School className="w-3 h-3 mr-1" />
            Public Kindergarten Staff
          </Badge>
          <Badge variant="outline">Today: {new Date().toLocaleDateString('no-NO')}</Badge>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button className="h-16 flex-col space-y-2">
              <UserCheck className="w-6 h-6" />
              <span>Record Attendance</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <MessageSquare className="w-6 h-6" />
              <span>View Messages (4)</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <Upload className="w-6 h-6" />
              <span>Upload Document</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>
              Planned activities and events for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysSchedule.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-700">{item.time}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{item.activity}</p>
                      <p className="text-sm text-slate-600">{item.department}</p>
                    </div>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expected Arrivals & Alerts */}
        <div className="space-y-6">
          {/* Expected Arrivals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Expected Arrivals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {expectedArrivals.map((child, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{child.name}</p>
                    <p className="text-sm text-slate-600">{child.age} • {child.expectedTime}</p>
                  </div>
                  <Badge variant={
                    child.status === 'Arrived' ? 'default' : 
                    child.status === 'Late' ? 'destructive' : 'secondary'
                  }>
                    {child.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Important Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-800">Late Pickup Alert</p>
                <p className="text-sm text-red-700">3 children not picked up yet</p>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Document Reminder</p>
                <p className="text-sm text-yellow-700">7 pending medical certificates</p>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">District Message</p>
                <p className="text-sm text-blue-700">New safety guidelines available</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicKindergartenDashboard;
