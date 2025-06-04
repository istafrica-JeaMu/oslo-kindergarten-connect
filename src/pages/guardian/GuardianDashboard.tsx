
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  MessageSquare, 
  CreditCard, 
  User, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Plus,
  Eye,
  DollarSign,
  Mail,
  Sparkles
} from 'lucide-react';

const GuardianDashboard = () => {
  const { t } = useTranslation();

  // Mock data for dashboard
  const dashboardData = {
    child: {
      name: 'Emma Hansen',
      age: 4,
      currentStatus: 'Application under review'
    },
    applications: [
      {
        id: 'APP-001',
        childName: 'Emma Hansen',
        status: 'under_review',
        submittedDate: '2024-03-15',
        lastUpdate: '2024-03-16'
      }
    ],
    upcomingDeadlines: [
      {
        title: 'Document submission deadline',
        date: '2024-04-01',
        type: 'document'
      }
    ],
    messages: {
      unread: 1,
      total: 5
    },
    payments: {
      nextDue: '2024-04-01',
      amount: 3330,
      status: 'upcoming'
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-oslo-blue/5 via-transparent to-oslo-green/5 rounded-3xl"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/60 shadow-xl">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-oslo-blue via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-oslo-blue to-blue-700 bg-clip-text text-transparent mb-2">
                Welcome back!
              </h1>
              <p className="text-xl text-slate-600 mb-4">
                Managing applications for <span className="font-semibold text-oslo-blue">{dashboardData.child.name}</span>
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 shadow-md">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {dashboardData.child.currentStatus}
                </Badge>
                <span className="text-sm text-slate-500">Age: {dashboardData.child.age} years</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Enhanced Design */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-oslo-blue to-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* New Application Card */}
          <Link to="/guardian/new-application" className="group">
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 group-hover:from-oslo-blue/5 group-hover:to-blue-100/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-oslo-blue to-blue-600"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-oslo-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Plus className="w-7 h-7 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-oslo-blue group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-oslo-blue transition-colors">
                  New Application
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Start new kindergarten application
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Application Status Card */}
          <Link to="/guardian/application-status" className="group">
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 group-hover:from-emerald-100/50 group-hover:to-green-100/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Application Status
                </CardTitle>
                <CardDescription className="text-slate-600">
                  View application progress
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Messages Card */}
          <Link to="/guardian/messages" className="group">
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 via-white to-purple-50/30 group-hover:from-purple-100/50 group-hover:to-violet-100/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    {dashboardData.messages.unread > 0 && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xs font-bold text-white">{dashboardData.messages.unread}</span>
                      </div>
                    )}
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Messages
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {dashboardData.messages.unread} unread messages
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Payments Card */}
          <Link to="/guardian/payments" className="group">
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 via-white to-amber-50/30 group-hover:from-amber-100/50 group-hover:to-orange-100/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="w-7 h-7 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Payments
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Invoices and fees
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Current Applications */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-oslo-blue to-blue-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              Current Applications
            </CardTitle>
            <CardDescription>Track your application progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.applications.map((app) => (
              <div key={app.id} className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/60">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-900">{app.childName}</h4>
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                    Under Review
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Application ID:</span>
                    <span className="font-medium">{app.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Submitted:</span>
                    <span>{app.submittedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Update:</span>
                    <span>{app.lastUpdate}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 hover:bg-oslo-blue/5">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines & Recent Activity */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardData.upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-amber-50 to-orange-50/50 rounded-xl border border-amber-200/60">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    <div>
                      <div className="font-semibold text-slate-900">{deadline.title}</div>
                      <div className="text-sm text-amber-600">{deadline.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Payment Info */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                Payment Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50/50 rounded-xl border border-emerald-200/60">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">Next Payment Due</span>
                  <span className="font-bold text-emerald-600">{dashboardData.payments.nextDue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Amount</span>
                  <span className="text-xl font-bold text-slate-900">{dashboardData.payments.amount} NOK</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GuardianDashboard;
