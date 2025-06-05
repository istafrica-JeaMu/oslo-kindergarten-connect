
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Building,
  Calendar,
  Star,
  CheckCircle,
  MessageSquare,
  BarChart3,
  UserPlus,
  Settings
} from 'lucide-react';

const PrivateKindergartenDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Current Enrollment',
      value: '42',
      change: '+3 this month',
      icon: Users,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Available Capacity',
      value: '8',
      change: '84% occupancy',
      icon: Building,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Pending Applications',
      value: '12',
      change: '5 this week',
      icon: FileText,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Monthly Revenue',
      value: '€34,200',
      change: '+8% vs last month',
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Parent Satisfaction',
      value: '4.8/5',
      change: '24 reviews',
      icon: Star,
      color: 'bg-yellow-50 text-yellow-600'
    }
  ];

  const pendingApplications = [
    { name: 'Sofia Kristensen', age: '3 years', applied: '2024-01-15', priority: 'High', desiredStart: '2024-02-01' },
    { name: 'Noah Pettersen', age: '4 years', applied: '2024-01-14', priority: 'Medium', desiredStart: '2024-02-15' },
    { name: 'Liam Eriksen', age: '2 years', applied: '2024-01-13', priority: 'Low', desiredStart: '2024-03-01' }
  ];

  const recentActivities = [
    { activity: 'Application Accepted', child: 'Emma Larsen', time: '2 hours ago', type: 'success' },
    { activity: 'Payment Received', child: 'Oliver Hansen', time: '4 hours ago', type: 'info' },
    { activity: 'Document Required', child: 'Maja Andersen', time: '1 day ago', type: 'warning' }
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
            {user?.organization} • Private Kindergarten Management
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            <Building className="w-3 h-3 mr-1" />
            Private Kindergarten Staff
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Star className="w-3 h-3 mr-1" />
            Premium License
          </Badge>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-16 flex-col space-y-2">
              <UserPlus className="w-6 h-6" />
              <span>Review Applications (12)</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <Settings className="w-6 h-6" />
              <span>Update Capacity</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <BarChart3 className="w-6 h-6" />
              <span>Generate Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <MessageSquare className="w-6 h-6" />
              <span>Message Guardians</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Applications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Pending Applications
            </CardTitle>
            <CardDescription>
              Applications awaiting review and decision
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApplications.map((application, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {application.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{application.name}</p>
                      <p className="text-sm text-slate-600">{application.age} • Applied {application.applied}</p>
                      <p className="text-xs text-slate-500">Desired start: {application.desiredStart}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      application.priority === 'High' ? 'destructive' : 
                      application.priority === 'Medium' ? 'default' : 'secondary'
                    }>
                      {application.priority}
                    </Badge>
                    <div className="flex gap-1">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">Accept</Button>
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Business Insights & Recent Activities */}
        <div className="space-y-6">
          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Occupancy Rate</span>
                  <span className="font-medium">84%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Revenue Target</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Application Conversion</span>
                  <span className="font-medium">76%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
                      item.type === 'success' ? 'bg-green-500' : 
                      item.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}>
                      {item.child.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.activity}</p>
                      <p className="text-xs text-slate-600">{item.child} • {item.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivateKindergartenDashboard;
