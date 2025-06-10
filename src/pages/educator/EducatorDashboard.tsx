
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle,
  Calendar,
  MapPin,
  Activity,
  MessageSquare,
  Bell,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EducatorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data for dashboard
  const todayStats = {
    totalChildren: 24,
    present: 18,
    absent: 4,
    onLeave: 2,
    unreadMessages: 5,
    pendingTasks: 3
  };

  const recentActivities = [
    { time: '10:30', activity: 'Morning Circle completed', location: 'Main Classroom' },
    { time: '11:15', activity: 'Outdoor Play started', location: 'Playground' },
    { time: '12:00', activity: 'Lunch Time', location: 'Dining Area' },
  ];

  const quickActions = [
    {
      title: 'Attendance',
      description: 'Mark attendance & check-in/out',
      icon: Users,
      color: 'bg-blue-600 hover:bg-blue-700',
      route: '/educator/attendance'
    },
    {
      title: 'Location Tracker',
      description: 'Track children locations & activities',
      icon: MapPin,
      color: 'bg-green-600 hover:bg-green-700',
      route: '/educator/location-tracker'
    },
    {
      title: 'Weekly Schedule',
      description: 'Manage class schedules & activities',
      icon: Calendar,
      color: 'bg-purple-600 hover:bg-purple-700',
      route: '/educator/calendar'
    },
    {
      title: 'Messages',
      description: 'Communicate with guardians',
      icon: MessageSquare,
      color: 'bg-orange-600 hover:bg-orange-700',
      route: '/educator/messages'
    }
  ];

  const pendingTasks = [
    { task: 'Update Emma\'s daily notes', priority: 'high', due: '2:00 PM' },
    { task: 'Prepare art supplies for tomorrow', priority: 'medium', due: 'End of day' },
    { task: 'Send weekly report to guardians', priority: 'high', due: 'Friday' }
  ];

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-slate-600 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/educator/calendar')}>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button onClick={() => navigate('/educator/attendance')}>
            <Users className="w-4 h-4 mr-2" />
            Attendance
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Children</p>
                <p className="text-3xl font-bold text-slate-900">{todayStats.totalChildren}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Present Today</p>
                <p className="text-3xl font-bold text-green-600">{todayStats.present}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Absent</p>
                <p className="text-3xl font-bold text-red-600">{todayStats.absent}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Messages</p>
                <p className="text-3xl font-bold text-orange-600">{todayStats.unreadMessages}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Access your most used tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={() => navigate(action.route)}
                className={`h-24 flex-col space-y-2 text-white ${action.color}`}
                size="lg"
              >
                <action.icon className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Today's Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-mono bg-white px-2 py-1 rounded border">
                    {activity.time}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.activity}</p>
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {activity.location}
                    </p>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/educator/location-tracker')}
              >
                <MapPin className="w-4 h-4 mr-2" />
                View Full Location Tracker
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Pending Tasks
              {todayStats.pendingTasks > 0 && (
                <Badge className="bg-red-100 text-red-800">
                  {todayStats.pendingTasks}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium">{task.task}</p>
                    <Badge 
                      variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-600">
                    <Clock className="w-3 h-3" />
                    Due: {task.due}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-sm">
                View All Tasks
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Schedule Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              This Week's Schedule
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/educator/calendar')}
            >
              Manage Schedule
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
              <div key={day} className="text-center">
                <h4 className="font-medium text-sm mb-2">{day}</h4>
                <div className="space-y-1">
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    9:00 Circle Time
                  </div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    10:30 Outdoor
                  </div>
                  <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    2:00 Art
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducatorDashboard;
