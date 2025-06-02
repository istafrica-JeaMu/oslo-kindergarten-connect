
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
  Bell,
  Calendar,
  User
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
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50">{t('common.status.submitted')}</Badge>;
      case 'placed':
        return <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">{t('common.status.placed')}</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">{t('common.status.rejected')}</Badge>;
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
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="grid lg:grid-cols-2 gap-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            {t('guardian.dashboard.welcome')}, {user?.name}
            <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">
              Guardian Account
            </Badge>
          </h1>
          <p className="text-gray-600 text-lg">
            {t('guardian.dashboard.overview')}
          </p>
        </div>
        <Button 
          onClick={handleNewApplication}
          className="bg-oslo-blue hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-6"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('guardian.dashboard.newApplication')}
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/guardian/new-application" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-oslo-blue/20 cursor-pointer group-hover:scale-[1.02]">
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-oslo-blue/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-oslo-blue/20 transition-colors">
                <FileText className="h-6 w-6 text-oslo-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-oslo-blue transition-colors">{t('guardian.dashboard.newApplication')}</h3>
                <p className="text-sm text-gray-600">{t('guardian.dashboard.newApplicationDesc')}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-oslo-blue transition-colors" />
            </CardContent>
          </Card>
        </Link>

        <Link to="/guardian/application-status" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-green-200 cursor-pointer group-hover:scale-[1.02]">
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">{t('guardian.dashboard.applicationStatus')}</h3>
                <p className="text-sm text-gray-600">{t('guardian.dashboard.applicationStatusDesc')}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-green-600 transition-colors" />
            </CardContent>
          </Card>
        </Link>

        <Link to="/guardian/messages" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200 cursor-pointer group-hover:scale-[1.02]">
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors relative">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                {messages.filter(m => m.unread).length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {messages.filter(m => m.unread).length}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{t('guardian.dashboard.messages')}</h3>
                <p className="text-sm text-gray-600">{messages.filter(m => m.unread).length} {t('guardian.dashboard.messagesDesc')}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-blue-600 transition-colors" />
            </CardContent>
          </Card>
        </Link>

        <Link to="/guardian/payments" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-purple-200 cursor-pointer group-hover:scale-[1.02]">
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{t('guardian.dashboard.payments')}</h3>
                <p className="text-sm text-gray-600">{t('guardian.dashboard.paymentsDesc')}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-purple-600 transition-colors" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Applications Overview */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
              <FileText className="h-5 w-5 text-oslo-blue" />
            </div>
            {t('guardian.dashboard.myApplications')}
          </CardTitle>
          <CardDescription className="text-base">
            {t('guardian.dashboard.applicationsOverview')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-oslo-blue/30 hover:bg-gray-50/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
                    <User className="h-6 w-6 text-oslo-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{app.childName}</h4>
                    <p className="text-gray-600">{app.kindergarten}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
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
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              {t('guardian.dashboard.recentMessages')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.slice(0, 3).map((message) => (
                <div key={message.id} className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className={`w-3 h-3 rounded-full mt-2 ${message.unread ? 'bg-blue-500' : 'bg-gray-300'}`} />
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{message.subject}</h5>
                    <p className="text-sm text-gray-600">{message.from}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {message.date}
                    </p>
                  </div>
                  {message.unread && (
                    <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
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
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
              {t('guardian.dashboard.paymentOverview')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.slice(0, 3).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50/30 transition-colors">
                  <div className="flex items-center gap-3">
                    {payment.status === 'paid' ? 
                      <CheckCircle className="h-6 w-6 text-green-500" /> :
                      <AlertCircle className="h-6 w-6 text-yellow-500" />
                    }
                    <div>
                      <p className="font-medium text-gray-900">{payment.child}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Due: {payment.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-gray-900">{payment.amount} kr</p>
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
