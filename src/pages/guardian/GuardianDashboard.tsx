
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FileText, Clock, MessageSquare, CreditCard, Plus, CheckCircle, AlertCircle } from 'lucide-react';

const GuardianDashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  // Mock data for demonstration
  const applications = [
    {
      id: 'APP-001',
      childName: 'Emma Hansen',
      status: 'submitted',
      submittedDate: '2024-03-15',
      kindergarten: 'Løvenskiold Barnehage'
    },
    {
      id: 'APP-002',
      childName: 'Oliver Hansen',
      status: 'placed',
      submittedDate: '2024-02-20',
      kindergarten: 'Sinsen Barnehage'
    }
  ];

  const messages = [
    {
      id: 1,
      from: 'Løvenskiold Barnehage',
      subject: 'Welcome to our kindergarten',
      date: '2024-03-18',
      unread: true
    },
    {
      id: 2,
      from: 'Oslo Kommune',
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
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Under behandling</Badge>;
      case 'placed':
        return <Badge variant="outline" className="text-green-600 border-green-300">Tildelt plass</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-300">Avslått</Badge>;
      default:
        return <Badge variant="outline">Ukjent</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('guardian.dashboard.welcome')}, {user?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Oversikt over dine barnehagesøknader og informasjon
          </p>
        </div>
        <Link to="/guardian/new-application">
          <Button className="bg-oslo-blue hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Ny søknad
          </Button>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/guardian/new-application">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-6">
              <FileText className="h-8 w-8 text-oslo-blue mr-4" />
              <div>
                <h3 className="font-semibold">Ny søknad</h3>
                <p className="text-sm text-gray-600">Start ny barnehagesøknad</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/guardian/application-status">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-6">
              <Clock className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <h3 className="font-semibold">Søknadsstatus</h3>
                <p className="text-sm text-gray-600">Se status på søknader</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/guardian/messages">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-6">
              <MessageSquare className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold">Meldinger</h3>
                <p className="text-sm text-gray-600">{messages.filter(m => m.unread).length} uleste</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/guardian/payments">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-6">
              <CreditCard className="h-8 w-8 text-purple-600 mr-4" />
              <div>
                <h3 className="font-semibold">Betalinger</h3>
                <p className="text-sm text-gray-600">Fakturaer og avgifter</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Applications Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Mine søknader
          </CardTitle>
          <CardDescription>
            Oversikt over alle dine barnehagesøknader
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-oslo-blue/10 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-oslo-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{app.childName}</h4>
                    <p className="text-sm text-gray-600">{app.kindergarten}</p>
                    <p className="text-xs text-gray-500">Søkt: {app.submittedDate}</p>
                  </div>
                </div>
                {getStatusBadge(app.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Messages and Payments */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Siste meldinger
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {messages.slice(0, 3).map((message) => (
                <div key={message.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${message.unread ? 'bg-blue-500' : 'bg-gray-300'}`} />
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{message.subject}</h5>
                    <p className="text-xs text-gray-600">{message.from}</p>
                    <p className="text-xs text-gray-500">{message.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Betalingsoversikt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payments.slice(0, 3).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {payment.status === 'paid' ? 
                      <CheckCircle className="h-5 w-5 text-green-500" /> :
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    }
                    <div>
                      <p className="font-medium text-sm">{payment.child}</p>
                      <p className="text-xs text-gray-600">Forfaller: {payment.dueDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{payment.amount} kr</p>
                    <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'}>
                      {payment.status === 'paid' ? 'Betalt' : 'Venter'}
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
