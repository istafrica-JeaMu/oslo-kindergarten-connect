
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle,
  Building2,
  Calendar,
  AlertTriangle,
  TrendingUp,
  MapPin,
  School,
  Settings,
  Shield,
  UserCheck,
  ClipboardList,
  BarChart3,
  Eye
} from 'lucide-react';

const DistrictAdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Kindergartens',
      value: '23',
      change: '+2',
      trend: 'up',
      icon: School,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Total Children',
      value: '1,456',
      change: '+87',
      trend: 'up',
      icon: Users,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Pending Applications',
      value: '234',
      change: '-12',
      trend: 'down',
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Available Spots',
      value: '45',
      change: '+8',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  const adminModules = [
    {
      title: 'Kindergarten Management',
      description: 'Configure and manage all kindergartens in your district',
      icon: School,
      href: '/district-admin/kindergartens',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      title: 'User & Role Management',
      description: 'Manage staff accounts, roles and permissions',
      icon: UserCheck,
      href: '/district-admin/users',
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      title: 'Placement Calendar',
      description: 'Configure placement periods and application windows',
      icon: Calendar,
      href: '/district-admin/placement-calendar',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Policy Configuration',
      description: 'Set district policies and system parameters',
      icon: Settings,
      href: '/district-admin/policies',
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Self-Service Features',
      description: 'Enable/disable parent-facing features',
      icon: Shield,
      href: '/district-admin/self-service',
      color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'Monitoring & Analytics',
      description: 'View district-wide analytics and reports',
      icon: BarChart3,
      href: '/district-admin/analytics',
      color: 'bg-pink-50 hover:bg-pink-100 border-pink-200',
      iconColor: 'text-pink-600'
    },
    {
      title: 'Audit Logs',
      description: 'Review system actions and compliance logs',
      icon: Eye,
      href: '/district-admin/audit-logs',
      color: 'bg-slate-50 hover:bg-slate-100 border-slate-200',
      iconColor: 'text-slate-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            District System Administration
          </h1>
          <p className="text-slate-600 mt-2">
            Welcome back, {user?.name} - {user?.district}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
            <MapPin className="w-3 h-3 mr-1" />
            District Admin
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

      {/* Admin Modules */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Administration Modules</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((module, index) => (
            <Card key={index} className={`transition-all duration-200 hover:shadow-lg ${module.color}`}>
              <CardContent className="p-6">
                <Link to={module.href} className="block">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center ${module.iconColor}`}>
                      <module.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">{module.title}</h3>
                      <p className="text-sm text-slate-600 mb-4">{module.description}</p>
                      <Button variant="ghost" size="sm" className="text-slate-700 hover:text-slate-900">
                        Access Module →
                      </Button>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent District Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: 'New kindergarten added', user: 'System Admin', time: '2 hours ago', type: 'success' },
              { action: 'User permissions updated', user: 'Erik Johansen', time: '4 hours ago', type: 'info' },
              { action: 'Placement period configured', user: 'System Admin', time: '1 day ago', type: 'info' },
              { action: 'Policy settings modified', user: 'District Admin', time: '2 days ago', type: 'warning' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' : 
                    activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium text-slate-900">{activity.action}</p>
                    <p className="text-sm text-slate-600">by {activity.user}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500">{activity.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* District Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              District Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-medium text-red-800">Capacity Alert</p>
              <p className="text-sm text-red-700">3 kindergartens over capacity</p>
            </div>
            
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Placement Deadline</p>
              <p className="text-sm text-yellow-700">Spring 2025 applications close in 5 days</p>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">System Update</p>
              <p className="text-sm text-blue-700">Scheduled maintenance next Sunday</p>
            </div>

            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">Compliance Status</p>
              <p className="text-sm text-green-700">All kindergartens compliant</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DistrictAdminDashboard;
