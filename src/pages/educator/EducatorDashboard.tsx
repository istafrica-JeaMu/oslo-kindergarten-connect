
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  MessageSquare, 
  ClipboardList,
  Calendar,
  Bell,
  AlertTriangle,
  MapPin,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EducatorDashboard = () => {
  const { user } = useAuth();

  // Mock data for today's overview
  const todayStats = {
    totalChildren: 24,
    present: 18,
    absent: 4,
    onLeave: 2,
    unreadMessages: 3,
    pendingTasks: 2,
    upcomingPickups: 5
  };

  const quickActions = [
    {
      title: 'Daily Attendance',
      description: 'Check-in/out children and manage attendance',
      icon: ClipboardList,
      href: '/educator/attendance',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Messages',
      description: 'Communicate with guardians',
      icon: MessageSquare,
      href: '/educator/messages',
      color: 'bg-green-500 hover:bg-green-600',
      badge: todayStats.unreadMessages > 0 ? todayStats.unreadMessages : null
    },
    {
      title: 'Children',
      description: 'View and manage child profiles',
      icon: Users,
      href: '/educator/children',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Reports',
      description: 'Generate attendance and activity reports',
      icon: Activity,
      href: '/educator/reports',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'check-in',
      message: 'Emma Larsen checked in at 08:30',
      time: '30 minutes ago',
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'message',
      message: 'New message from Anna Larsen',
      time: '1 hour ago',
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'check-out',
      message: 'Oliver Hansen checked out at 14:15',
      time: '2 hours ago',
      icon: UserX,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Good morning, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-slate-600 mt-1">
            {user?.organization} • {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {todayStats.pendingTasks > 0 && (
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {todayStats.pendingTasks} pending tasks
            </Badge>
          )}
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-1" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-700">{todayStats.present}</p>
                <p className="text-sm text-blue-600">Present Today</p>
              </div>
              <UserCheck className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-700">{todayStats.absent}</p>
                <p className="text-sm text-red-600">Absent</p>
              </div>
              <UserX className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-700">{todayStats.onLeave}</p>
                <p className="text-sm text-orange-600">On Leave</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-700">{todayStats.totalChildren}</p>
                <p className="text-sm text-green-600">Total Children</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Access your most used tools and features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.title} to={action.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      {action.badge && (
                        <Badge className="bg-red-100 text-red-800">
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-slate-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Upcoming */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <activity.icon className={`w-5 h-5 ${activity.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
            <div className="text-center pt-2">
              <Link to="/educator/attendance" className="text-sm text-blue-600 hover:text-blue-800">
                View all activities
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Pickups
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Emma Larsen</p>
                  <p className="text-sm text-slate-600">Expected: 15:30</p>
                </div>
                <Badge variant="outline">30 min</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Lucas Berg</p>
                  <p className="text-sm text-slate-600">Expected: 16:00</p>
                </div>
                <Badge variant="outline">1 hour</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Maja Andersen</p>
                  <p className="text-sm text-slate-600">Expected: 16:30</p>
                </div>
                <Badge variant="outline">1.5 hours</Badge>
              </div>
            </div>
            <div className="text-center pt-2">
              <Link to="/educator/children" className="text-sm text-blue-600 hover:text-blue-800">
                View all children
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EducatorDashboard;
