
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Shield, 
  Users,
  Building2,
  FileText,
  AlertTriangle,
  BarChart3,
  Database,
  Calendar,
  Globe,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  Lock,
  UserCheck,
  School,
  MapPin,
  Monitor,
  Flag,
  Briefcase,
  MessageSquare,
  FileCheck,
  Archive,
  Activity
} from 'lucide-react';

const MunicipalityAdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // System-wide statistics
  const systemStats = {
    totalDistricts: 15,
    totalKindergartens: 680,
    totalChildren: 34567,
    totalApplications: 2847,
    systemUptime: 99.94,
    activeUsers: 8429,
    pendingPlacements: 234,
    complianceScore: 96.8
  };

  // Administrative modules for Municipality-level management
  const adminModules = [
    {
      title: 'Global System Configuration',
      description: 'System-wide parameters, feature flags, and global settings',
      icon: Globe,
      href: '/admin/global-config',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      iconColor: 'text-blue-600',
      category: 'system'
    },
    {
      title: 'District Oversight',
      description: 'Monitor and manage all districts across the municipality',
      icon: MapPin,
      href: '/admin/districts',
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      iconColor: 'text-green-600',
      category: 'governance'
    },
    {
      title: 'Policy Management',
      description: 'Define municipality-wide policies and compliance rules',
      icon: Flag,
      href: '/admin/policies',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      iconColor: 'text-purple-600',
      category: 'governance'
    },
    {
      title: 'User & Role Templates',
      description: 'Manage system-wide user roles and permission templates',
      icon: UserCheck,
      href: '/admin/user-templates',
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
      iconColor: 'text-orange-600',
      category: 'security'
    },
    {
      title: 'Kindergarten Classification',
      description: 'Manage kindergarten types, services, and master data',
      icon: School,
      href: '/admin/kindergarten-types',
      color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
      iconColor: 'text-indigo-600',
      category: 'data'
    },
    {
      title: 'Placement Windows',
      description: 'Configure application periods and placement windows',
      icon: Calendar,
      href: '/admin/placement-windows',
      color: 'bg-pink-50 hover:bg-pink-100 border-pink-200',
      iconColor: 'text-pink-600',
      category: 'operations'
    },
    {
      title: 'Feature Control Center',
      description: 'Enable/disable features across all districts',
      icon: Monitor,
      href: '/admin/features',
      color: 'bg-teal-50 hover:bg-teal-100 border-teal-200',
      iconColor: 'text-teal-600',
      category: 'system'
    },
    {
      title: 'Security & Compliance',
      description: 'GDPR compliance, audit logs, and security monitoring',
      icon: Shield,
      href: '/admin/security',
      color: 'bg-red-50 hover:bg-red-100 border-red-200',
      iconColor: 'text-red-600',
      category: 'security'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Municipality-wide analytics and performance metrics',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
      iconColor: 'text-yellow-600',
      category: 'analytics'
    },
    {
      title: 'Data Integration',
      description: 'Manage external system integrations and data flows',
      icon: Database,
      href: '/admin/integrations',
      color: 'bg-slate-50 hover:bg-slate-100 border-slate-200',
      iconColor: 'text-slate-600',
      category: 'data'
    },
    {
      title: 'Communication Center',
      description: 'Manage system-wide communications and notifications',
      icon: MessageSquare,
      href: '/admin/communications',
      color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200',
      iconColor: 'text-cyan-600',
      category: 'operations'
    },
    {
      title: 'System Releases',
      description: 'Manage feature releases and system updates',
      icon: Activity,
      href: '/admin/releases',
      color: 'bg-violet-50 hover:bg-violet-100 border-violet-200',
      iconColor: 'text-violet-600',
      category: 'system'
    }
  ];

  const categoryFilters = [
    { key: 'all', label: 'All Modules', icon: Briefcase },
    { key: 'system', label: 'System Config', icon: Settings },
    { key: 'governance', label: 'Governance', icon: Shield },
    { key: 'security', label: 'Security', icon: Lock },
    { key: 'data', label: 'Data Management', icon: Database },
    { key: 'operations', label: 'Operations', icon: Clock },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredModules = selectedCategory === 'all' 
    ? adminModules 
    : adminModules.filter(module => module.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Municipality System Administration
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Oslo Municipality - Central System Management
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <Shield className="w-3 h-3 mr-1" />
            Municipality Admin
          </Badge>
          <Badge variant="outline">Microsoft Entra ID</Badge>
        </div>
      </div>

      {/* System-wide Statistics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Total Districts</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-slate-900">{systemStats.totalDistricts}</p>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">System Uptime</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-green-600">{systemStats.systemUptime}%</p>
                  <span className="text-sm font-medium text-green-600">+0.1%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Total Children</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-purple-600">{systemStats.totalChildren.toLocaleString()}</p>
                  <span className="text-sm font-medium text-green-600">+287</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Compliance Score</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-orange-600">{systemStats.complianceScore}%</p>
                  <span className="text-sm font-medium text-green-600">+2.1%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different management areas */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categoryFilters.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.key)}
                className="flex items-center gap-2"
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </Button>
            ))}
          </div>

          {/* Administrative Modules Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module, index) => (
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
                          Configure →
                        </Button>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flag className="w-5 h-5" />
                  Policy Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { policy: 'GDPR Compliance', status: 'Compliant', districts: 15, color: 'text-green-600' },
                  { policy: 'Data Retention', status: 'Compliant', districts: 15, color: 'text-green-600' },
                  { policy: 'Consent Management', status: 'Review Required', districts: 13, color: 'text-orange-600' },
                  { policy: 'Security Standards', status: 'Compliant', districts: 15, color: 'text-green-600' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{item.policy}</p>
                      <p className="text-sm text-slate-600">{item.districts}/15 districts compliant</p>
                    </div>
                    <Badge className={item.color}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  District Oversight
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { district: 'Bydel Sentrum', status: 'Active', kindergartens: 45, alerts: 0 },
                  { district: 'Søndre Nordstrand', status: 'Active', kindergartens: 52, alerts: 1 },
                  { district: 'Gamle Oslo', status: 'Active', kindergartens: 38, alerts: 0 },
                  { district: 'Frogner', status: 'Active', kindergartens: 41, alerts: 2 }
                ].map((district, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-900">{district.district}</p>
                      <p className="text-sm text-slate-600">{district.kindergartens} kindergartens</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {district.alerts > 0 && (
                        <Badge variant="outline" className="text-orange-600">
                          {district.alerts} alerts
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-green-600">
                        {district.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Current Placement Periods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { period: 'Spring 2025', deadline: '2024-12-15', status: 'Active', applications: 1245 },
                  { period: 'Fall 2025', deadline: '2025-04-01', status: 'Upcoming', applications: 0 },
                  { period: 'Emergency Placements', deadline: 'Ongoing', status: 'Active', applications: 67 }
                ].map((period, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{period.period}</p>
                      <p className="text-sm text-slate-600">Deadline: {period.deadline}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-900">{period.applications} apps</p>
                      <Badge variant={period.status === 'Active' ? 'default' : 'outline'}>
                        {period.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Feature Control Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { feature: 'Guardian Chat', enabled: true, districts: 15 },
                  { feature: 'Digital Bulletin Board', enabled: true, districts: 12 },
                  { feature: 'Electronic Consent', enabled: false, districts: 0 },
                  { feature: 'Mobile Notifications', enabled: true, districts: 15 },
                  { feature: 'Dual Placement', enabled: true, districts: 8 }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{feature.feature}</p>
                      <p className="text-sm text-slate-600">{feature.districts}/15 districts enabled</p>
                    </div>
                    <Badge variant={feature.enabled ? 'default' : 'outline'}>
                      {feature.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-800">High Priority</p>
                  <p className="text-sm text-red-700">Database connection timeout in District 3</p>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">Capacity Warning</p>
                  <p className="text-sm text-yellow-700">85% capacity reached in Bydel Sentrum</p>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">System Update</p>
                  <p className="text-sm text-blue-700">Scheduled maintenance this weekend</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { metric: 'Average Application Processing', value: '8.5 days', trend: 'down', change: '-1.2 days' },
                  { metric: 'System Response Time', value: '1.2s', trend: 'up', change: '+0.3s' },
                  { metric: 'User Satisfaction Score', value: '4.7/5', trend: 'up', change: '+0.2' },
                  { metric: 'Data Accuracy Rate', value: '99.1%', trend: 'up', change: '+0.5%' }
                ].map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{metric.metric}</p>
                      <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MunicipalityAdminDashboard;
