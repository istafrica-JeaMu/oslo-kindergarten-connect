
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
  ArrowRight
} from 'lucide-react';

const CaseWorkerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock dashboard data
  const stats = {
    newApplications: 23,
    urgentTasks: 5,
    averageProcessingDays: 12,
    completionRate: 87
  };

  const recentActivity = [
    {
      id: 1,
      type: 'application_submitted',
      description: 'New application submitted for Emma Larsen',
      time: '2 hours ago',
      priority: 'normal'
    },
    {
      id: 2,
      type: 'document_missing',
      description: 'Missing documents for Oliver Hansen application',
      time: '4 hours ago',
      priority: 'high'
    },
    {
      id: 3,
      type: 'placement_confirmed',
      description: 'Placement confirmed at Løvenskiold Kindergarten',
      time: '1 day ago',
      priority: 'normal'
    },
    {
      id: 4,
      type: 'message_received',
      description: 'Message received from guardian regarding application APP-125',
      time: '1 day ago',
      priority: 'normal'
    }
  ];

  const quickActions = [
    {
      title: t('caseworker.dashboard.reviewApplications'),
      description: 'Process pending applications',
      icon: FolderOpen,
      link: '/caseworker/review-queue',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: t('caseworker.dashboard.managePlacements'),
      description: 'Manage kindergarten placements',
      icon: Users,
      link: '/caseworker/placement-management',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: t('caseworker.dashboard.sendMessages'),
      description: 'Communicate with families',
      icon: MessageSquare,
      link: '/caseworker/messages',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: t('caseworker.dashboard.generateReports'),
      description: 'Create status reports',
      icon: BarChart3,
      link: '/caseworker/reports',
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
          {t('caseworker.dashboard.title')}
          <Badge variant="outline" className="text-purple-600 border-purple-300 bg-purple-50">
            {user?.district}
          </Badge>
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          {t('caseworker.dashboard.description')}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('caseworker.dashboard.newApplications')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.newApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('caseworker.dashboard.urgentTasks')}</p>
                <p className="text-2xl font-bold text-red-600">{stats.urgentTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('caseworker.dashboard.averageProcessing')}</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.averageProcessingDays}d</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('caseworker.dashboard.completionRate')}</p>
                <p className="text-2xl font-bold text-green-600">{stats.completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-oslo-blue" />
            </div>
            {t('caseworker.dashboard.quickActions')}
          </CardTitle>
          <CardDescription>
            {t('caseworker.reviewQueue.quickActionsDesc')}
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

      {/* Recent Activity */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            {t('caseworker.dashboard.recentActivity')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  activity.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    {activity.time}
                  </p>
                </div>
                {activity.priority === 'high' && (
                  <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">
                    Urgent
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

export default CaseWorkerDashboard;
