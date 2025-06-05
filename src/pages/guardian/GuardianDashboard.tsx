import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MinimalNoticeBoard from '@/components/guardian/MinimalNoticeBoard';
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

const GuardianDashboard = () => {
  const { t } = useTranslation();
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
    { label: 'Pending Payments', value: '1', change: '0', trend: 'stable' },
    { label: 'Unread Messages', value: '1', change: '+1', trend: 'up' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return (
          <Badge className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300 font-semibold shadow-sm">
            <Clock className="w-3 h-3 mr-1" />
            {t('common.status.submitted')}
          </Badge>
        );
      case 'placed':
        return (
          <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 font-semibold shadow-sm">
            <CheckCircle className="w-3 h-3 mr-1" />
            {t('common.status.placed')}
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300 font-semibold shadow-sm">
            <AlertCircle className="w-3 h-3 mr-1" />
            {t('common.status.rejected')}
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
      {/* Compact Header with Notice Board */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Compact Welcome */}
        <div className="lg:col-span-1">
          <Card className="relative overflow-hidden border-0 shadow-lg h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-oslo-blue/5 via-transparent to-oslo-blue/10" />
            <CardContent className="relative p-6 flex flex-col justify-center h-full">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-oslo-blue via-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-oslo-green rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-900">
                      {t('guardian.dashboard.welcome')}, {user?.name}
                    </h1>
                    <p className="text-slate-600 text-sm mt-1">
                      {t('guardian.dashboard.overview')}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-slate-100 to-white text-slate-700 border border-slate-300 font-medium px-3 py-1">
                    <Shield className="w-3 h-3 mr-1" />
                    Guardian Account
                  </Badge>
                  <Badge className="bg-gradient-to-r from-oslo-green to-green-600 text-white border border-green-400 font-medium px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    ✓ Verified
                  </Badge>
                </div>

                <Button 
                  onClick={handleNewApplication}
                  className="w-full bg-gradient-to-r from-oslo-blue to-blue-700 hover:from-oslo-blue/90 hover:to-blue-700/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('guardian.dashboard.newApplication')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Notice Board */}
        <div className="lg:col-span-2">
          <MinimalNoticeBoard />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100" />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    {stat.change !== '0' && (
                      <span className={`text-sm font-semibold flex items-center ${
                        stat.trend === 'up' ? 'text-oslo-green' : 'text-oslo-blue'
                      }`}>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.change}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                  index === 0 ? 'bg-gradient-to-br from-oslo-blue/10 to-oslo-blue/20' :
                  index === 1 ? 'bg-gradient-to-br from-oslo-green/10 to-oslo-green/20' :
                  index === 2 ? 'bg-gradient-to-br from-purple-100 to-purple-200' :
                  'bg-gradient-to-br from-blue-100 to-blue-200'
                }`}>
                  {index === 0 && <FileText className="h-7 w-7 text-oslo-blue" />}
                  {index === 1 && <CheckCircle className="h-7 w-7 text-oslo-green" />}
                  {index === 2 && <CreditCard className="h-7 w-7 text-purple-600" />}
                  {index === 3 && <Bell className="h-7 w-7 text-blue-600" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/guardian/new-application" className="group">
          <Card className="relative overflow-hidden h-full bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-oslo-blue/3 via-transparent to-oslo-blue/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-oslo-blue/10 to-transparent rounded-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
            <CardContent className="relative p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-oslo-blue/15 to-oslo-blue/25 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <FileText className="h-6 w-6 text-oslo-blue" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-oslo-blue group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-oslo-blue transition-colors duration-300">
                    New Application
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Start new kindergarten application
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/guardian/application-status" className="group">
          <Card className="relative overflow-hidden h-full bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-oslo-green/3 via-transparent to-oslo-green/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-oslo-green/10 to-transparent rounded-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
            <CardContent className="relative p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-oslo-green/15 to-oslo-green/25 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <Clock className="h-6 w-6 text-oslo-green" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-oslo-green group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-oslo-green transition-colors duration-300">
                    Application Status
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    View application progress
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/guardian/messages" className="group">
          <Card className="relative overflow-hidden h-full bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-transparent to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/50 to-transparent rounded-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
            <CardContent className="relative p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                  <div className="relative w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                    {messages.filter(m => m.unread).length > 0 && (
                      <span className="absolute -top-2 -right-2 h-5 w-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full text-xs text-white flex items-center justify-center font-bold shadow-md animate-pulse">
                        {messages.filter(m => m.unread).length}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors duration-300">
                    Messages
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {messages.filter(m => m.unread).length} unread messages
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/guardian/payments" className="group">
          <Card className="relative overflow-hidden h-full bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 via-transparent to-purple-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100/50 to-transparent rounded-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
            <CardContent className="relative p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <CreditCard className="h-6 w-6 text-purple-600" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-purple-600 transition-colors duration-300">
                    Payments
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Invoices and fees
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Applications Overview */}
      <Card className="relative overflow-hidden border-0 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-oslo-gray/30" />
        <CardHeader className="relative pb-6 border-b border-slate-200/50">
          <CardTitle className="flex items-center gap-6 text-3xl">
            <div className="w-14 h-14 bg-gradient-to-br from-oslo-blue/10 to-oslo-blue/20 rounded-2xl flex items-center justify-center">
              <FileText className="h-7 w-7 text-oslo-blue" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{t('guardian.dashboard.myApplications')}</h2>
              <p className="text-base text-slate-600 font-normal mt-1">{t('guardian.dashboard.applicationsOverview')}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative p-8">
          <div className="space-y-6">
            {applications.map((app, index) => (
              <div key={app.id} className="group cursor-pointer">
                <div className="flex items-center justify-between p-8 border-2 border-slate-200 rounded-2xl hover:border-oslo-blue/40 hover:bg-gradient-to-r hover:from-oslo-blue/5 hover:to-transparent transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-oslo-blue/10 to-oslo-blue/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <User className="h-8 w-8 text-oslo-blue" />
                      </div>
                      {app.priority === 'high' && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900 text-2xl group-hover:text-oslo-blue transition-colors">{app.childName}</h4>
                      <p className="text-slate-700 font-semibold text-lg">{app.kindergarten}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Applied: {app.submittedDate}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="font-medium">ID: {app.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(app.status)}
                    <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-oslo-blue group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Recent Messages and Payments */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="relative overflow-hidden border-0 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20" />
          <CardHeader className="relative border-b border-slate-200/50">
            <CardTitle className="flex items-center gap-6 text-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <MessageSquare className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{t('guardian.dashboard.recentMessages')}</h3>
                <p className="text-sm text-slate-600 font-normal mt-1">Latest updates and notifications</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative p-6">
            <div className="space-y-4">
              {messages.slice(0, 3).map((message) => (
                <div key={message.id} className="group cursor-pointer">
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20" />
          <CardHeader className="relative border-b border-slate-200/50">
            <CardTitle className="flex items-center gap-6 text-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                <CreditCard className="h-7 w-7 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{t('guardian.dashboard.paymentOverview')}</h3>
                <p className="text-sm text-slate-600 font-normal mt-1">Upcoming and recent payments</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative p-6">
            <div className="space-y-4">
              {payments.slice(0, 3).map((payment) => (
                <div key={payment.id} className="group cursor-pointer">
                  <div className="flex items-center justify-between p-6 rounded-xl border-2 border-slate-200 hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-transparent transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 ${
                        payment.status === 'paid' 
                          ? 'bg-gradient-to-br from-oslo-green/10 to-oslo-green/20' 
                          : 'bg-gradient-to-br from-yellow-100 to-yellow-200'
                      }`}>
                        {payment.status === 'paid' ? 
                          <CheckCircle className="h-8 w-8 text-oslo-green" /> :
                          <AlertCircle className="h-8 w-8 text-yellow-600" />
                        }
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-slate-900 text-lg group-hover:text-purple-600 transition-colors">{payment.child}</p>
                        <p className="text-sm text-slate-600 flex items-center gap-2 font-medium">
                          <Calendar className="h-4 w-4" />
                          Due: {payment.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-bold text-2xl text-slate-900">{payment.amount} kr</p>
                      <Badge 
                        className={payment.status === 'paid' 
                          ? 'bg-gradient-to-r from-oslo-green/10 to-oslo-green/20 text-oslo-green border-oslo-green/30 font-semibold' 
                          : 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 border-yellow-300 font-semibold'
                        }
                      >
                        {payment.status === 'paid' ? t('common.status.paid') : t('common.status.pending')}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuardianDashboard;
