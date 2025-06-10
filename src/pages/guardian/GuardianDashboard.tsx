import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  MessageSquare, 
  CreditCard, 
  Plus, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Calendar,
  User,
  GraduationCap,
  TrendingUp,
  Bell,
  Star,
  ChevronRight,
  Shield
} from 'lucide-react';
import TodaysStatusCard from '@/components/guardian/TodaysStatusCard';
import NoticeBoardPreviewCard from '@/components/guardian/NoticeBoardPreviewCard';
import QuickActionsCard from '@/components/guardian/QuickActionsCard';
import ApplicationsSummaryCard from '@/components/guardian/ApplicationsSummaryCard';

const GuardianDashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for demonstration
  const applications = [
    {
      id: 'APP-001',
      childName: 'Emma Hansen',
      status: 'submitted',
      submittedDate: '2024-03-15',
      kindergarten: 'Løvenskiold Kindergarten',
      priority: 'high'
    },
    {
      id: 'APP-002',
      childName: 'Oliver Hansen',
      status: 'placed',
      submittedDate: '2024-02-20',
      kindergarten: 'Sinsen Kindergarten',
      priority: 'normal'
    }
  ];

  const messages = [
    {
      id: 1,
      from: 'Løvenskiold Kindergarten',
      subject: 'Welcome to our kindergarten',
      date: '2024-03-18',
      unread: true,
      type: 'welcome'
    },
    {
      id: 2,
      from: 'Oslo Municipality',
      subject: 'Application status update',
      date: '2024-03-16',
      unread: false,
      type: 'update'
    }
  ];

  const payments = [
    {
      id: 1,
      amount: 3330,
      dueDate: '2024-04-01',
      status: 'paid',
      child: 'Oliver Hansen'
    },
    {
      id: 2,
      amount: 3330,
      dueDate: '2024-05-01',
      status: 'pending',
      child: 'Oliver Hansen'
    }
  ];

  const stats = [
    { label: 'Active Applications', value: '2', change: '+1', trend: 'up' },
    { label: 'Placed Children', value: '1', change: '0', trend: 'stable' },
    { label: 'Pending Payments', value: '1', change: '+1', trend: 'stable' },
    { label: 'Unread Messages', value: '1', change: '+1', trend: 'up' }
  ];

  // Add children data
  const children = [
    {
      id: 'emma-hansen',
      name: 'Emma Hansen',
      age: '3 years',
      kindergarten: 'Løvenskiold Kindergarten',
      status: 'placed'
    },
    {
      id: 'oliver-hansen',
      name: 'Oliver Hansen', 
      age: '5 years',
      kindergarten: 'Sinsen Kindergarten',
      status: 'placed'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return (
          <Badge className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300 font-semibold shadow-sm">
            <Clock className="w-3 h-3 mr-1" />
            {t('common.status.submitted', 'Submitted')}
          </Badge>
        );
      case 'placed':
        return (
          <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 font-semibold shadow-sm">
            <CheckCircle className="w-3 h-3 mr-1" />
            {t('common.status.placed', 'Placed')}
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300 font-semibold shadow-sm">
            <AlertCircle className="w-3 h-3 mr-1" />
            {t('common.status.rejected', 'Rejected')}
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleNewApplication = () => {
    navigate('/guardian/new-application');
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="space-y-4">
            <Skeleton className="h-12 w-96 bg-gradient-to-r from-slate-200 to-slate-300" />
            <Skeleton className="h-6 w-80 bg-gradient-to-r from-slate-200 to-slate-300" />
            <Skeleton className="h-5 w-32 bg-gradient-to-r from-slate-200 to-slate-300" />
          </div>
          <Skeleton className="h-14 w-48 bg-gradient-to-r from-oslo-blue/20 to-blue-300/20" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-12" />
                </div>
                <Skeleton className="h-12 w-12 rounded-xl" />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-14 w-14 rounded-xl" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Skeleton className="h-80 w-full rounded-xl" />
          <div className="grid lg:grid-cols-2 gap-6">
            <Skeleton className="h-96 w-full rounded-xl" />
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-oslo-blue/5 via-transparent to-oslo-green/5 rounded-3xl -z-10" />
        <div className="flex justify-between items-start p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-oslo-blue via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <GraduationCap className="w-9 h-9 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-oslo-green rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                  {t('guardian.dashboard.welcome', 'Welcome')}, {user?.name}
                </h1>
                <p className="text-slate-600 text-xl font-medium mt-2">
                  {t('guardian.dashboard.overview', 'Overview of your kindergarten applications and information')}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <Badge className="relative overflow-hidden bg-gradient-to-r from-slate-100 via-slate-50 to-white text-slate-700 border-2 border-slate-300 hover:border-oslo-blue/50 font-semibold px-3 py-1.5 shadow-md hover:shadow-lg transition-all duration-300 group cursor-default">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <Shield className="w-3.5 h-3.5 mr-2 text-slate-600 relative z-10 drop-shadow-sm" />
                    <span className="relative z-10 text-sm font-semibold tracking-wide">Guardian Account</span>
                  </Badge>
                  
                  <Badge className="relative overflow-hidden bg-gradient-to-r from-oslo-green via-green-500 to-green-600 text-white border-2 border-green-400 font-semibold px-4 py-1.5 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-default transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full animate-pulse shadow-md border border-yellow-300"></div>
                    <Star className="w-3.5 h-3.5 mr-2 relative z-10 drop-shadow-md text-yellow-100" />
                    <span className="relative z-10 text-sm font-semibold tracking-wide drop-shadow-sm">✓ Verified</span>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleNewApplication}
            size="lg"
            className="bg-gradient-to-r from-oslo-blue to-blue-700 hover:from-oslo-blue/90 hover:to-blue-700/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
          >
            <Plus className="h-6 w-6 mr-3" />
            {t('guardian.dashboard.newApplication', 'New Application')}
          </Button>
        </div>
      </div>

      {/* Priority Cards - Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6">
        {/* Today's Status */}
        <div className="xl:col-span-3">
          <TodaysStatusCard />
        </div>
        
        {/* Quick Actions */}
        <div className="xl:col-span-3">
          <QuickActionsCard />
        </div>
        
        {/* Notice Board - Takes full width on mobile/tablet, remaining space on xl screens */}
        <div className="md:col-span-2 xl:col-span-6">
          <NoticeBoardPreviewCard />
        </div>
      </div>

      {/* Secondary Priority Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications Summary */}
        <ApplicationsSummaryCard />

        {/* Children List */}
        <Card className="relative overflow-hidden border-0 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/30 to-green-100/20" />
          <CardHeader className="relative border-b border-slate-200/50">
            <CardTitle className="flex items-center gap-6 text-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                <User className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">My Children</h3>
                <p className="text-sm text-slate-600 font-normal mt-1">View detailed profiles</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative p-6">
            <div className="space-y-4">
              {children.map((child) => (
                <Link key={child.id} to={`/guardian/children/${child.id}`} className="group cursor-pointer block">
                  <div className="flex items-center justify-between p-6 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent transition-all duration-300 border border-transparent hover:border-green-200 hover:shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 group-hover:text-green-600 transition-colors text-lg">{child.name}</h5>
                        <p className="text-slate-600 font-medium">{child.age} • {child.kindergarten}</p>
                        <Badge className="bg-green-100 text-green-800 border-green-300 font-semibold mt-1">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {child.status}
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Recent Messages */}
        <Card className="relative overflow-hidden border-0 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20" />
          <CardHeader className="relative border-b border-slate-200/50">
            <CardTitle className="flex items-center gap-6 text-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <MessageSquare className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{t('guardian.dashboard.recentMessages', 'Recent Messages')}</h3>
                <p className="text-sm text-slate-600 font-normal mt-1">Latest updates and notifications</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative p-6">
            <div className="space-y-4">
              {messages.slice(0, 3).map((message) => (
                <Link key={message.id} to="/guardian/messages" className="group cursor-pointer block">
                  <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-300 border border-transparent hover:border-blue-200 hover:shadow-md">
                    <div className={`w-5 h-5 rounded-full mt-2 shadow-sm ${message.unread ? 'bg-gradient-to-br from-blue-500 to-blue-600 animate-pulse' : 'bg-slate-300'}`} />
                    <div className="flex-1 space-y-2">
                      <h5 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-lg">{message.subject}</h5>
                      <p className="text-slate-600 font-medium">{message.from}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {message.date}
                        </p>
                        {message.unread && (
                          <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300 font-semibold">
                            <Bell className="w-3 h-3 mr-1" />
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legacy Quick Actions - Now Hidden/Replaced */}
      {/* The old quick actions grid has been replaced by the new QuickActionsCard above */}
    </div>
  );
};

export default GuardianDashboard;
