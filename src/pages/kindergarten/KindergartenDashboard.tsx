
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatedAvatar } from '@/components/ui/animated-avatar';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle,
  Building2,
  Calendar,
  AlertTriangle,
  TrendingUp,
  School,
  MessageSquare,
  Send,
  Plus
} from 'lucide-react';

const KindergartenDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Children',
      value: '124',
      change: '+8',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Available Spots',
      value: '12',
      change: '-3',
      trend: 'down',
      icon: School,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Waiting List',
      value: '34',
      change: '+5',
      trend: 'up',
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Staff Members',
      value: '18',
      change: '+1',
      trend: 'up',
      icon: FileText,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  // Mock recent messages for kindergarten dashboard
  const recentMessages = [
    {
      id: 1,
      sender: {
        name: 'Emma Hansen',
        role: 'Guardian',
        avatar: null,
        online: false
      },
      message: 'Hi, I wanted to discuss Emma\'s progress in the social activities...',
      timestamp: '2024-03-18T10:30:00',
      unread: true
    },
    {
      id: 2,
      sender: {
        name: 'Lars Andersen',
        role: 'Guardian',
        avatar: null,
        online: true
      },
      message: 'Thank you for the update on Oliver\'s behavior improvements.',
      timestamp: '2024-03-18T09:15:00',
      unread: false
    },
    {
      id: 3,
      sender: {
        name: 'Oslo Municipality',
        role: 'System',
        avatar: '/oslo-logo.svg',
        online: true
      },
      message: 'New guidelines for kindergarten safety protocols are available.',
      timestamp: '2024-03-17T14:20:00',
      unread: true
    }
  ];

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case 'system':
        return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 text-xs font-medium">System</Badge>;
      case 'guardian':
        return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs font-medium">Guardian</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50 text-xs font-medium">Staff</Badge>;
    }
  };

  const unreadCount = recentMessages.filter(msg => msg.unread).length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-slate-600 mt-2">
            Kindergarten Dashboard - {user?.organization}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={user?.role === 'staff' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-purple-100 text-purple-800 border-purple-200'}>
            <Building2 className="w-3 h-3 mr-1" />
            {user?.role === 'staff' ? 'Public Kindergarten' : 'Private Kindergarten'}
          </Badge>
          <Badge variant="outline">Microsoft Entra ID</Badge>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest updates and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { activity: 'New enrollment', child: 'Emma Larsen', status: 'Completed', time: '2 hours ago', type: 'success' },
                { activity: 'Parent meeting', child: 'Oliver Hansen', status: 'Scheduled', time: 'Tomorrow 10:00', type: 'info' },
                { activity: 'Health check', child: 'Maja Andersen', status: 'Pending', time: '1 day ago', type: 'warning' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                      item.type === 'success' ? 'bg-green-500' : 
                      item.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}>
                      {item.child.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{item.activity}</p>
                      <p className="text-sm text-slate-600">{item.child} • {item.time}</p>
                    </div>
                  </div>
                  <Badge variant={
                    item.type === 'success' ? 'default' : 
                    item.type === 'info' ? 'secondary' : 'outline'
                  }>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Recent Messages
                {unreadCount > 0 && (
                  <Badge className="bg-red-500 text-white text-xs ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </div>
            <CardDescription>
              Latest messages from guardians and staff
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                    message.unread ? 'bg-blue-50/50 border-blue-200' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <AnimatedAvatar
                      name={message.sender.name}
                      role={message.sender.role}
                      online={message.sender.online}
                      size="sm"
                      context="message"
                      enableAnimation={false}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h4 className={`text-sm font-semibold text-gray-900 truncate ${
                            message.unread ? 'text-blue-600' : ''
                          }`}>
                            {message.sender.name}
                          </h4>
                          {getRoleBadge(message.sender.role)}
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      
                      <p className={`text-sm text-gray-600 truncate leading-relaxed ${
                        message.unread ? 'font-semibold text-gray-800' : ''
                      }`}>
                        {message.message}
                      </p>
                      
                      {message.unread && (
                        <div className="flex justify-end mt-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/kindergarten/messages'}>
                <MessageSquare className="w-4 h-4 mr-2" />
                View All Messages
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-slate-900">Manage Children</p>
                    <p className="text-sm text-slate-600">124 enrolled</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-slate-900">Schedule Events</p>
                    <p className="text-sm text-slate-600">3 upcoming</p>
                  </div>
                </div>
              </button>
              
              <button 
                className="w-full p-3 text-left border rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors"
                onClick={() => window.location.href = '/kindergarten/messages'}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-slate-900">Messages</p>
                    <p className="text-sm text-slate-600">{unreadCount} unread</p>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Important Notices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm font-medium text-orange-800">Health Inspection</p>
                <p className="text-sm text-orange-700">Scheduled for next Friday</p>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">New Guidelines</p>
                <p className="text-sm text-blue-700">Updated safety protocols available</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KindergartenDashboard;
