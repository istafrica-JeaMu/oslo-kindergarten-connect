
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  GraduationCap
} from 'lucide-react';

const GuardianDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
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
      kindergarten: 'Løvenskiold Kindergarten'
    },
    {
      id: 'APP-002',
      childName: 'Oliver Hansen',
      status: 'placed',
      submittedDate: '2024-02-20',
      kindergarten: 'Sinsen Kindergarten'
    }
  ];

  const messages = [
    {
      id: 1,
      from: 'Løvenskiold Kindergarten',
      subject: 'Welcome to our kindergarten',
      date: '2024-03-18',
      unread: true
    },
    {
      id: 2,
      from: 'Oslo Municipality',
      subject: 'Application status update',
      date: '2024-03-16',
      unread: false
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="outline" className="text-yellow-700 border-yellow-300 bg-yellow-50 font-medium">{t('common.status.submitted')}</Badge>;
      case 'placed':
        return <Badge variant="outline" className="text-oslo-green border-green-300 bg-green-50 font-medium">{t('common.status.placed')}</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-700 border-red-300 bg-red-50 font-medium">{t('common.status.rejected')}</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleNewApplication = () => {
    navigate('/guardian/new-application');
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-3">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-5 w-96" />
          </div>
          <Skeleton className="h-12 w-40" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <div className="grid lg:grid-cols-2 gap-6">
            <Skeleton className="h-80 w-full rounded-xl" />
            <Skeleton className="h-80 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-oslo-blue to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            {t('guardian.dashboard.welcome')}, {user?.name}
          </h1>
          <p className="text-slate-600 text-lg font-medium ml-15">
            {t('guardian.dashboard.overview')}
          </p>
          <Badge variant="outline" className="text-oslo-blue border-oslo-blue/30 bg-oslo-blue/5 font-medium ml-15">
            Guardian Account
          </Badge>
        </div>
        <Button 
          onClick={handleNewApplication}
          variant="default"
          size="lg"
          className="shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('guardian.dashboard.newApplication')}
        </Button>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/guardian/new-application" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-oslo-blue/30 cursor-pointer group-hover:scale-[1.02] h-full">
            <CardContent className="flex items-center p-6">
              <div className="w-14 h-14 bg-oslo-blue/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-oslo-blue/20 transition-colors">
                <FileText className="h-7 w-7 text-oslo-blue" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 group-hover:text-oslo-blue transition-colors text-lg">
                  {t('guardian.dashboard.newApplication')}
                </h3>
                <p className="text-sm text-slate-600 mt-1">{t('guardian.dashboard.newApplicationDesc')}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 ml-2 group-hover:text-oslo-blue transition-colors" />
            </CardContent>
          </Card>
        </Link>

        <Link to="/guardian/application-status" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-oslo-green/30 cursor-pointer group-hover:scale-[1.02] h-full">
            <CardContent className="flex items-center p-6">
              <div className="w-14 h-14 bg-oslo-green/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-oslo-green/20 transition-colors">
                <Clock className="h-7 w-7 text-oslo-green" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 group-hover:text-oslo-green transition-colors text-lg">
                  {t('guardian.dashboard.applicationStatus')}
                </h3>
                <p className="text-sm text-slate-600 mt-1">{t('guardian.dashboard.applicationStatusDesc')}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 ml-2 group-hover:text-oslo-green transition-colors" />
            </CardContent>
          </Card>
        </Link>

        <Link to="/guardian/messages" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300 cursor-pointer group-hover:scale-[1.02] h-full">
            <CardContent className="flex items-center p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors relative">
                <MessageSquare className="h-7 w-7 text-blue-600" />
                {messages.filter(m => m.unread).length > 0 && (
                  <span className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold shadow-md">
                    {messages.filter(m => m.unread).length}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-lg">
                  {t('guardian.dashboard.messages')}
                </h3>
                <p className="text-sm text-slate-600 mt-1">{messages.filter(m => m.unread).length} {t('guardian.dashboard.messagesDesc')}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 ml-2 group-hover:text-blue-600 transition-colors" />
            </CardContent>
          </Card>
        </Link>

        <Link to="/guardian/payments" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-purple-300 cursor-pointer group-hover:scale-[1.02] h-full">
            <CardContent className="flex items-center p-6">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                <CreditCard className="h-7 w-7 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors text-lg">
                  {t('guardian.dashboard.payments')}
                </h3>
                <p className="text-sm text-slate-600 mt-1">{t('guardian.dashboard.paymentsDesc')}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 ml-2 group-hover:text-purple-600 transition-colors" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Applications Overview */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-oslo-blue" />
            </div>
            {t('guardian.dashboard.myApplications')}
          </CardTitle>
          <CardDescription className="text-base ml-16">
            {t('guardian.dashboard.applicationsOverview')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-6 border-2 border-slate-200 rounded-xl hover:border-oslo-blue/30 hover:bg-oslo-gray/30 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
                    <User className="h-7 w-7 text-oslo-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xl">{app.childName}</h4>
                    <p className="text-slate-700 font-medium">{app.kindergarten}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4" />
                      Applied: {app.submittedDate}
                    </p>
                  </div>
                </div>
                {getStatusBadge(app.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Messages and Payments */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-4 text-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              {t('guardian.dashboard.recentMessages')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.slice(0, 3).map((message) => (
                <div key={message.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-oslo-gray/50 transition-colors cursor-pointer border border-slate-100">
                  <div className={`w-4 h-4 rounded-full mt-2 ${message.unread ? 'bg-blue-500' : 'bg-slate-300'}`} />
                  <div className="flex-1">
                    <h5 className="font-semibold text-slate-900">{message.subject}</h5>
                    <p className="text-sm text-slate-600 mt-1">{message.from}</p>
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {message.date}
                    </p>
                  </div>
                  {message.unread && (
                    <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50 font-medium">
                      New
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-4 text-2xl">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              {t('guardian.dashboard.paymentOverview')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.slice(0, 3).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 rounded-xl border-2 border-slate-200 hover:border-purple-200 hover:bg-purple-50/30 transition-colors">
                  <div className="flex items-center gap-4">
                    {payment.status === 'paid' ? 
                      <CheckCircle className="h-7 w-7 text-oslo-green" /> :
                      <AlertCircle className="h-7 w-7 text-yellow-500" />
                    }
                    <div>
                      <p className="font-semibold text-slate-900">{payment.child}</p>
                      <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        Due: {payment.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-slate-900">{payment.amount} kr</p>
                    <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'} className="mt-1">
                      {payment.status === 'paid' ? t('common.status.paid') : t('common.status.pending')}
                    </Badge>
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
