
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Users,
  MessageSquare,
  BarChart3,
  FolderOpen,
  CheckCircle,
  Calendar,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Filter,
  Search,
  Eye,
  Star,
  Zap,
  GraduationCap,
  Shield
} from 'lucide-react';

const CaseWorkerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced mock dashboard data with trends
  const stats = {
    newApplications: { value: 23, trend: 'up', change: '+5' },
    urgentTasks: { value: 5, trend: 'down', change: '-2' },
    averageProcessingDays: { value: 12, trend: 'down', change: '-1' },
    completionRate: { value: 87, trend: 'up', change: '+3%' }
  };

  const recentActivity = [
    {
      id: 1,
      type: 'application_submitted',
      title: 'New Application',
      description: 'Emma Larsen submitted kindergarten application',
      applicant: 'Emma Larsen',
      time: '2 hours ago',
      priority: 'normal',
      actionRequired: false
    },
    {
      id: 2,
      type: 'document_missing',
      title: 'Missing Documents',
      description: 'Oliver Hansen application requires additional documentation',
      applicant: 'Oliver Hansen',
      time: '4 hours ago',
      priority: 'high',
      actionRequired: true
    },
    {
      id: 3,
      type: 'placement_confirmed',
      title: 'Placement Confirmed',
      description: 'Successful placement at Løvenskiold Kindergarten',
      applicant: 'Sofia Nielsen',
      time: '1 day ago',
      priority: 'normal',
      actionRequired: false
    },
    {
      id: 4,
      type: 'message_received',
      title: 'Guardian Message',
      description: 'Question about application APP-125 status',
      applicant: 'Maria Olsen',
      time: '1 day ago',
      priority: 'normal',
      actionRequired: true
    }
  ];

  const quickActions = [
    {
      title: t('caseworker.dashboard.reviewApplications'),
      description: 'Process pending applications',
      icon: FolderOpen,
      link: '/caseworker/review-queue',
      color: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      isPrimary: true,
      count: 23
    },
    {
      title: t('caseworker.dashboard.managePlacements'),
      description: 'Manage kindergarten placements',
      icon: Users,
      link: '/caseworker/placement-management',
      color: 'bg-gradient-to-br from-green-50 to-green-100',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      isPrimary: false,
      count: 8
    },
    {
      title: t('caseworker.dashboard.sendMessages'),
      description: 'Communicate with families',
      icon: MessageSquare,
      link: '/caseworker/messages',
      color: 'bg-gradient-to-br from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      isPrimary: false,
      count: 12
    },
    {
      title: t('caseworker.dashboard.generateReports'),
      description: 'Create status reports',
      icon: BarChart3,
      link: '/caseworker/reports',
      color: 'bg-gradient-to-br from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      iconColor: 'text-orange-600',
      isPrimary: false,
      count: 3
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

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
  };

  const getPriorityBadge = (priority: string, actionRequired: boolean) => {
    if (priority === 'high') {
      return (
        <Badge className="bg-red-100 text-red-700 border-red-300 animate-pulse">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Urgent
        </Badge>
      );
    }
    if (actionRequired) {
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-300">
          Action Required
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Clean Header Section - matching Guardian design */}
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-oslo-blue to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome, {user?.name}
                  </h1>
                  <p className="text-lg text-gray-600">
                    Manage applications and support families in their kindergarten journey
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-oslo-blue text-white border-0 font-semibold">
                    <Shield className="w-3 h-3 mr-1" />
                    Case Worker Account
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    ✓ Verified
                  </Badge>
                  <Badge variant="outline" className="text-oslo-blue border-oslo-blue/30 font-semibold">
                    {user?.district || 'Oslo District'}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" variant="outline" className="font-semibold">
                <Filter className="h-4 w-4 mr-2" />
                Quick Filters
              </Button>
              <Button size="lg" className="font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <FolderOpen className="h-4 w-4 mr-2" />
                Review Applications
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/80"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${getTrendColor(stats.newApplications.trend)}`}>
                {stats.newApplications.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span>{stats.newApplications.change}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">{t('caseworker.dashboard.newApplications')}</p>
              <p className="text-5xl font-black text-gray-900 leading-none">{stats.newApplications.value}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1 border-l-4 border-l-red-500">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/80"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse">
                <AlertTriangle className="h-7 w-7 text-white" />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${getTrendColor(stats.urgentTasks.trend)}`}>
                {stats.urgentTasks.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span>{stats.urgentTasks.change}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">{t('caseworker.dashboard.urgentTasks')}</p>
              <p className="text-5xl font-black text-red-600 leading-none">{stats.urgentTasks.value}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/80"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${getTrendColor(stats.averageProcessingDays.trend)}`}>
                {stats.averageProcessingDays.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span>{stats.averageProcessingDays.change}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">{t('caseworker.dashboard.averageProcessing')}</p>
              <p className="text-5xl font-black text-yellow-600 leading-none">{stats.averageProcessingDays.value}d</p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/80"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${getTrendColor(stats.completionRate.trend)}`}>
                {stats.completionRate.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span>{stats.completionRate.change}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">{t('caseworker.dashboard.completionRate')}</p>
              <p className="text-5xl font-black text-green-600 leading-none">{stats.completionRate.value}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Quick Actions */}
      <Card className="shadow-xl border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-oslo-blue/5 to-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-oslo-blue to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{t('caseworker.dashboard.quickActions')}</CardTitle>
                  <CardDescription className="text-base">
                    {t('caseworker.reviewQueue.quickActionsDesc')}
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" size="lg" className="hover:bg-oslo-blue hover:text-white transition-all duration-200">
                <Search className="h-4 w-4 mr-2" />
                Search Tasks
              </Button>
            </div>
          </CardHeader>
        </div>
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Primary Action */}
            {quickActions.filter(action => action.isPrimary).map((action, index) => (
              <Link key={index} to={action.link} className="group block">
                <div className={`p-8 border-2 rounded-2xl transition-all duration-300 hover:shadow-2xl ${action.color} ${action.borderColor} border-dashed hover:border-solid group-hover:scale-[1.02] transform`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl ${action.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 group-hover:text-oslo-blue transition-colors mb-2">
                          {action.title}
                        </h4>
                        <p className="text-gray-600 mb-3">{action.description}</p>
                        <Badge className="bg-white text-gray-700 shadow-md font-semibold">
                          {action.count} pending items
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button size="lg" className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                        Start Review
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Secondary Actions */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {quickActions.filter(action => !action.isPrimary).map((action, index) => (
                <Link key={index} to={action.link} className="group">
                  <div className={`p-6 border-2 rounded-xl transition-all duration-300 hover:shadow-lg ${action.color} ${action.borderColor} group-hover:scale-[1.02] transform hover:border-solid`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md ${action.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 group-hover:text-oslo-blue transition-colors mb-1">
                          {action.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600">{action.description}</p>
                          <Badge variant="outline" className="font-semibold">
                            {action.count}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Recent Activity */}
      <Card className="shadow-xl border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{t('caseworker.dashboard.recentActivity')}</CardTitle>
                  <CardDescription className="text-base">Latest updates requiring your attention</CardDescription>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="hover:bg-purple-100 transition-colors">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="lg" className="hover:bg-indigo-100 transition-colors">
                  View All
                </Button>
              </div>
            </div>
          </CardHeader>
        </div>
        <CardContent className="p-8">
          <div className="grid gap-6">
            {recentActivity.map((activity) => (
              <Card key={activity.id} className={`transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                activity.priority === 'high' ? 'border-l-4 border-l-red-500 bg-gradient-to-r from-red-50/50 to-white' : 
                activity.actionRequired ? 'border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50/50 to-white' : 
                'border-l-4 border-l-gray-200 bg-gradient-to-r from-gray-50/50 to-white'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h4 className="font-bold text-lg text-gray-900">{activity.title}</h4>
                        {getPriorityBadge(activity.priority, activity.actionRequired)}
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">{activity.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                          <Calendar className="h-3 w-3" />
                          {activity.time}
                        </span>
                        <span className="font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                          {activity.applicant}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3 ml-6">
                      {activity.actionRequired && (
                        <Button size="lg" className="shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                          Take Action
                        </Button>
                      )}
                      <Button size="lg" variant="outline" className="hover:bg-gray-100 transition-colors">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseWorkerDashboard;
