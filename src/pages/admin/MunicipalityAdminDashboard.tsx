
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Shield, 
  Users, 
  Building2,
  Database,
  BarChart3,
  Globe,
  Calendar,
  FileShield,
  Bell,
  MapPin,
  Server,
  UserCheck,
  School,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';

const MunicipalityAdminDashboard = () => {
  const { user } = useAuth();

  const systemStats = [
    {
      title: 'Active Districts',
      value: '12',
      change: '+1',
      trend: 'up',
      icon: MapPin,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Total Kindergartens',
      value: '287',
      change: '+15',
      trend: 'up',
      icon: School,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'System Users',
      value: '4,523',
      change: '+234',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'System Uptime',
      value: '99.8%',
      change: '+0.1%',
      trend: 'up',
      icon: Server,
      color: 'bg-emerald-50 text-emerald-600'
    }
  ];

  const adminModules = [
    {
      category: 'System-Wide Configuration',
      modules: [
        {
          title: 'Global System Settings',
          description: 'Configure system-wide parameters and feature flags',
          icon: Settings,
          href: '/admin/global-settings',
          color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
          iconColor: 'text-blue-600'
        },
        {
          title: 'Feature Management',
          description: 'Enable/disable features across all districts',
          icon: Globe,
          href: '/admin/feature-management',
          color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
          iconColor: 'text-indigo-600'
        },
        {
          title: 'Policy Configuration',
          description: 'Set municipality-wide policies and rules',
          icon: FileShield,
          href: '/admin/policy-config',
          color: 'bg-violet-50 hover:bg-violet-100 border-violet-200',
          iconColor: 'text-violet-600'
        }
      ]
    },
    {
      category: 'District & User Management',
      modules: [
        {
          title: 'District Oversight',
          description: 'Manage and monitor all districts',
          icon: MapPin,
          href: '/admin/districts',
          color: 'bg-green-50 hover:bg-green-100 border-green-200',
          iconColor: 'text-green-600'
        },
        {
          title: 'Municipality User Management',
          description: 'Manage super admins and municipality staff',
          icon: UserCheck,
          href: '/admin/users',
          color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
          iconColor: 'text-emerald-600'
        },
        {
          title: 'Role Templates',
          description: 'Define role templates for all districts',
          icon: Shield,
          href: '/admin/role-templates',
          color: 'bg-teal-50 hover:bg-teal-100 border-teal-200',
          iconColor: 'text-teal-600'
        }
      ]
    },
    {
      category: 'Kindergarten & Data Management',
      modules: [
        {
          title: 'Kindergarten Registry',
          description: 'Central kindergarten classification and master data',
          icon: School,
          href: '/admin/kindergarten-registry',
          color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
          iconColor: 'text-orange-600'
        },
        {
          title: 'Data Integration',
          description: 'Configure system integrations and APIs',
          icon: Database,
          href: '/admin/integrations',
          color: 'bg-amber-50 hover:bg-amber-100 border-amber-200',
          iconColor: 'text-amber-600'
        },
        {
          title: 'Placement Windows',
          description: 'Define national application and placement timelines',
          icon: Calendar,
          href: '/admin/placement-windows',
          color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
          iconColor: 'text-yellow-600'
        }
      ]
    },
    {
      category: 'Monitoring & Compliance',
      modules: [
        {
          title: 'System Analytics',
          description: 'Municipality-wide analytics and reporting',
          icon: BarChart3,
          href: '/admin/analytics',
          color: 'bg-pink-50 hover:bg-pink-100 border-pink-200',
          iconColor: 'text-pink-600'
        },
        {
          title: 'Security & Audit',
          description: 'Security settings and compliance monitoring',
          icon: Eye,
          href: '/admin/security-audit',
          color: 'bg-red-50 hover:bg-red-100 border-red-200',
          iconColor: 'text-red-600'
        },
        {
          title: 'System Health',
          description: 'Monitor system performance and availability',
          icon: Server,
          href: '/admin/system-health',
          color: 'bg-slate-50 hover:bg-slate-100 border-slate-200',
          iconColor: 'text-slate-600'
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Municipality System Administration
          </h1>
          <p className="text-slate-600 mt-2">
            Welcome back, {user?.name} - Oslo Municipality System Administrator
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <Shield className="w-3 h-3 mr-1" />
            Municipality Admin
          </Badge>
          <Badge variant="outline">System-Wide Access</Badge>
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
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

      {/* Administration Modules */}
      <div className="space-y-8">
        {adminModules.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{category.category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.modules.map((module, moduleIndex) => (
                <Card key={moduleIndex} className={`transition-all duration-200 hover:shadow-lg ${module.color}`}>
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
        ))}
      </div>

      {/* System Alerts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent System Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: 'New district onboarded', detail: 'Bydel Ullern added to system', time: '2 hours ago', type: 'success' },
              { action: 'Feature flag updated', detail: 'Dual placement enabled district-wide', time: '4 hours ago', type: 'info' },
              { action: 'Policy updated', detail: 'Maximum placements per child set to 3', time: '1 day ago', type: 'info' },
              { action: 'Security alert resolved', detail: 'Failed login attempts blocked', time: '2 days ago', type: 'warning' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' : 
                    activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium text-slate-900">{activity.action}</p>
                    <p className="text-sm text-slate-600">{activity.detail}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500">{activity.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              System Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">System Health</p>
              <p className="text-sm text-green-700">All systems operational - 99.8% uptime</p>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Scheduled Maintenance</p>
              <p className="text-sm text-blue-700">System update planned for next Sunday 2-4 AM</p>
            </div>
            
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Compliance Review</p>
              <p className="text-sm text-yellow-700">Annual GDPR compliance audit due in 30 days</p>
            </div>

            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm font-medium text-orange-800">Capacity Alert</p>
              <p className="text-sm text-orange-700">5 districts approaching capacity limits</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MunicipalityAdminDashboard;
