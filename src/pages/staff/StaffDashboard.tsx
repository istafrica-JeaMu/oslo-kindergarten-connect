
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle,
  Building2,
  Calendar,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

const StaffDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Active Applications',
      value: '34',
      change: '+5',
      trend: 'up',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Pending Reviews',
      value: '12',
      change: '-3',
      trend: 'down',
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Completed Today',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Available Spots',
      value: '23',
      change: '-1',
      trend: 'down',
      icon: Users,
      color: 'bg-purple-50 text-purple-600'
    }
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
            Staff Dashboard - {user?.organization}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Building2 className="w-3 h-3 mr-1" />
            Public Staff
          </Badge>
          {user?.authMethod === 'staff-login' && (
            <Badge variant="outline">Staff Portal</Badge>
          )}
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
        {/* Recent Applications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Applications
            </CardTitle>
            <CardDescription>
              Latest kindergarten applications requiring review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Emma Larsen', age: '3 years', status: 'Pending Review', priority: 'High', time: '2 hours ago' },
                { name: 'Oliver Hansen', age: '4 years', status: 'Documentation Required', priority: 'Medium', time: '4 hours ago' },
                { name: 'Maja Andersen', age: '2 years', status: 'Under Review', priority: 'Low', time: '1 day ago' },
              ].map((application, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {application.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{application.name}</p>
                      <p className="text-sm text-slate-600">{application.age} • {application.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      application.priority === 'High' ? 'destructive' : 
                      application.priority === 'Medium' ? 'default' : 'secondary'
                    }>
                      {application.priority}
                    </Badge>
                    <Badge variant="outline">{application.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Updates */}
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
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-slate-900">Review Applications</p>
                    <p className="text-sm text-slate-600">12 pending</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-slate-900">Schedule Visits</p>
                    <p className="text-sm text-slate-600">3 families waiting</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-slate-900">Manage Placements</p>
                    <p className="text-sm text-slate-600">Update availability</p>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm font-medium text-orange-800">Deadline Reminder</p>
                <p className="text-sm text-orange-700">Application deadline: March 15th</p>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">System Update</p>
                <p className="text-sm text-blue-700">Maintenance scheduled for weekend</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
