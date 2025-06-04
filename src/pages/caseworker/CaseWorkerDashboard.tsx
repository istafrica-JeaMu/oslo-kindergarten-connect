
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
  Zap
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
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      isPrimary: true,
      count: 23
    },
    {
      title: t('caseworker.dashboard.managePlacements'),
      description: 'Manage kindergarten placements',
      icon: Users,
      link: '/caseworker/placement-management',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      isPrimary: false,
      count: 8
    },
    {
      title: t('caseworker.dashboard.sendMessages'),
      description: 'Communicate with families',
      icon: MessageSquare,
      link: '/caseworker/messages',
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
      isPrimary: false,
      count: 12
    },
    {
      title: t('caseworker.dashboard.generateReports'),
      description: 'Create status reports',
      icon: BarChart3,
      link: '/caseworker/reports',
      color: 'bg-orange-50 border-orange-200',
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

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? ArrowUp : ArrowDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
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
      {/* Header Section */}
      <div className="bg-gradient-to-r from-oslo-blue to-oslo-blue/90 -mx-6 -mt-8 px-6 pt-8 pb-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              {t('caseworker.dashboard.title')}
              <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                {user?.district}
              </Badge>
            </h1>
            <p className="text-blue-100 mt-2 text-lg">
              {t('caseworker.dashboard.description')}
            </p>
          </div>
          <div className="flex gap-3">
            <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10">
              <Filter className="h-4 w-4 mr-2" />
              Quick Filters
            </Button>
            <Button size="lg" className="bg-white text-oslo-blue hover:bg-blue-50 shadow-lg font-semibold">
              <Star className="h-4 w-4 mr-2" />
              Priority View
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1">{t('caseworker.dashboard.newApplications')}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-4xl font-black text-gray-900">{stats.newApplications.value}</p>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getTrendColor(stats.newApplications.trend)} bg-white shadow-sm`}>
                      {stats.newApplications.trend === 'up' ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      <span>{stats.newApplications.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 group overflow-hidden relative border-l-4 border-l-red-500">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100/50"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform animate-pulse">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1">{t('caseworker.dashboard.urgentTasks')}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-4xl font-black text-red-600">{stats.urgentTasks.value}</p>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getTrendColor(stats.urgentTasks.trend)} bg-white shadow-sm`}>
                      {stats.urgentTasks.trend === 'up' ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      <span>{stats.urgentTasks.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100/50"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1">{t('caseworker.dashboard.averageProcessing')}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-4xl font-black text-yellow-600">{stats.averageProcessingDays.value}d</p>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getTrendColor(stats.averageProcessingDays.trend)} bg-white shadow-sm`}>
                      {stats.averageProcessingDays.trend === 'up' ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      <span>{stats.averageProcessingDays.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1">{t('caseworker.dashboard.completionRate')}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-4xl font-black text-green-600">{stats.completionRate.value}%</p>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getTrendColor(stats.completionRate.trend)} bg-white shadow-sm`}>
                      {stats.completionRate.trend === 'up' ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      <span>{stats.completionRate.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Quick Actions */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-oslo-blue" />
              </div>
              <div>
                <CardTitle>{t('caseworker.dashboard.quickActions')}</CardTitle>
                <CardDescription>
                  {t('caseworker.reviewQueue.quickActionsDesc')}
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search Tasks
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Primary Action */}
            {quickActions.filter(action => action.isPrimary).map((action, index) => (
              <Link key={index} to={action.link} className="group">
                <div className={`p-6 border-2 rounded-xl transition-all duration-300 hover:shadow-lg ${action.color} border-dashed hover:border-solid group-hover:scale-[1.02]`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md ${action.iconColor}`}>
                        <action.icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-oslo-blue transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                        <Badge className="mt-2 bg-white text-gray-700">
                          {action.count} pending
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="lg" className="shadow-md">
                        Start Review
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Secondary Actions */}
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {quickActions.filter(action => !action.isPrimary).map((action, index) => (
                <Link key={index} to={action.link} className="group">
                  <div className={`p-4 border rounded-xl transition-all duration-300 hover:shadow-md ${action.color} group-hover:scale-[1.02]`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center ${action.iconColor}`}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-oslo-blue transition-colors">
                          {action.title}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-600">{action.description}</p>
                          <Badge variant="outline" className="text-xs">
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
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>{t('caseworker.dashboard.recentActivity')}</CardTitle>
                <CardDescription>Latest updates requiring your attention</CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <Card key={activity.id} className={`transition-all duration-300 hover:shadow-md ${
                activity.priority === 'high' ? 'border-l-4 border-l-red-500 bg-red-50/30' : 
                activity.actionRequired ? 'border-l-4 border-l-amber-500 bg-amber-50/30' : 
                'border-l-4 border-l-gray-200'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                        {getPriorityBadge(activity.priority, activity.actionRequired)}
                      </div>
                      <p className="text-gray-700 mb-2">{activity.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {activity.time}
                        </span>
                        <span className="font-medium text-gray-700">
                          {activity.applicant}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {activity.actionRequired && (
                        <Button size="sm" variant="outline">
                          Take Action
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
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
