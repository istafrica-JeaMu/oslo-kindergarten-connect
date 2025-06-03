
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Settings, 
  Users,
  Building,
  FileText,
  AlertTriangle,
  TrendingUp,
  Database,
  Shield,
  Calendar,
  ArrowRight
} from 'lucide-react';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock admin dashboard data
  const systemStats = {
    totalApplications: 2847,
    activeKindergartens: 680,
    totalChildren: 34567,
    systemUptime: 99.94,
    pendingApplications: 234,
    placementRate: 92.3,
    avgProcessingTime: 8.5,
    userSessions: 1423
  };

  const recentActivity = [
    {
      id: 1,
      type: 'system',
      message: 'System backup completed successfully',
      time: '5 minutes ago',
      severity: 'info'
    },
    {
      id: 2,
      type: 'security',
      message: 'Multiple failed login attempts detected',
      time: '1 hour ago',
      severity: 'warning'
    },
    {
      id: 3,
      type: 'application',
      message: '45 new applications submitted today',
      time: '2 hours ago',
      severity: 'info'
    },
    {
      id: 4,
      type: 'capacity',
      message: 'Løvenskiold Kindergarten reached full capacity',
      time: '4 hours ago',
      severity: 'warning'
    }
  ];

  const quickActions = [
    {
      title: t('admin.reports.title'),
      description: 'Generate system reports and analytics',
      icon: BarChart3,
      link: '/admin/reports',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: t('admin.settings.title'),
      description: 'Configure system parameters',
      icon: Settings,
      link: '/admin/settings',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: Users,
      link: '/admin/users',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'System Logs',
      description: 'View system and security logs',
      icon: Shield,
      link: '/admin/logs',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          {t('admin.dashboard.title')}
          <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">
            Administrator
          </Badge>
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          {t('admin.dashboard.description')}
        </p>
      </div>

      {/* System Statistics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{systemStats.totalApplications.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Kindergartens</p>
                <p className="text-2xl font-bold text-green-600">{systemStats.activeKindergartens}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Children</p>
                <p className="text-2xl font-bold text-purple-600">{systemStats.totalChildren.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">System Uptime</p>
                <p className="text-2xl font-bold text-orange-600">{systemStats.systemUptime}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Pending Applications</p>
              <p className="text-3xl font-bold text-yellow-600">{systemStats.pendingApplications}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Placement Rate</p>
              <p className="text-3xl font-bold text-green-600">{systemStats.placementRate}%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Avg Processing (days)</p>
              <p className="text-3xl font-bold text-blue-600">{systemStats.avgProcessingTime}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Active Sessions</p>
              <p className="text-3xl font-bold text-purple-600">{systemStats.userSessions}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
              <Settings className="h-5 w-5 text-oslo-blue" />
            </div>
            Administrative Tools
          </CardTitle>
          <CardDescription>
            Common administrative tasks and system management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link} className="group">
                <div className="p-4 border border-gray-200 rounded-xl hover:border-oslo-blue/30 hover:bg-gray-50/50 transition-all cursor-pointer group-hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-oslo-blue transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-oslo-blue transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent System Activity */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Database className="h-5 w-5 text-green-600" />
            </div>
            Recent System Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  activity.severity === 'warning' ? 'bg-yellow-500' : 
                  activity.severity === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    {activity.time}
                  </p>
                </div>
                {activity.severity === 'warning' && (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50">
                    Warning
                  </Badge>
                )}
                {activity.severity === 'error' && (
                  <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">
                    Error
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
