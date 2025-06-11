
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Download, Calendar, User, FileText, Phone, Mail, MapPin, CheckCircle, Clock, MessageSquare, Flag, Timer, Edit, AlertTriangle, Star, Send, Upload, Eye } from 'lucide-react';
import { format, isValid, parseISO, differenceInDays, addDays } from 'date-fns';
import { toast } from 'sonner';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock application data - in real app this would come from API
  const applications = [
    {
      id: 'APP-2024-001',
      childName: 'Sofia Kristensen',
      parentName: 'Erik Kristensen',
      age: '3 years',
      appliedDate: '2024-01-15',
      desiredStartDate: '2024-02-01',
      status: 'pending',
      priority: 'high',
      notes: 'Urgent placement needed due to work requirements',
      documents: { complete: true, missing: [] },
      kindergartenPreference: 'Rainbow Kindergarten',
      applicationType: 'New Registration',
      createdAt: '2024-01-15',
      lastModified: '2024-01-15'
    },
    {
      id: 'APP-2024-002',
      childName: 'Noah Pettersen',
      parentName: 'Anna Pettersen',
      age: '4 years',
      appliedDate: '2024-01-14',
      desiredStartDate: '2024-02-15',
      status: 'under-review',
      priority: 'medium',
      notes: 'Previous kindergarten experience',
      documents: { complete: false, missing: ['Medical certificate'] },
      kindergartenPreference: 'Rainbow Kindergarten',
      applicationType: 'Transfer',
      createdAt: '2024-01-14',
      lastModified: '2024-01-14'
    },
    {
      id: 'APP-2024-003',
      childName: 'Liam Eriksen',
      parentName: 'Maria Eriksen',
      age: '2 years',
      appliedDate: '2024-01-13',
      desiredStartDate: '2024-03-01',
      status: 'pending',
      priority: 'low',
      notes: 'Flexible start date',
      documents: { complete: true, missing: [] },
      kindergartenPreference: 'Rainbow Kindergarten',
      applicationType: 'New Registration',
      createdAt: '2024-01-13',
      lastModified: '2024-01-13'
    },
    {
      id: 'APP-2024-004',
      childName: 'Emma Larsen',
      parentName: 'Jon Larsen',
      age: '5 years',
      appliedDate: '2024-01-12',
      desiredStartDate: '2024-02-01',
      status: 'accepted',
      priority: 'medium',
      notes: 'Approved for immediate placement',
      documents: { complete: true, missing: [] },
      kindergartenPreference: 'Rainbow Kindergarten',
      applicationType: 'New Registration',
      createdAt: '2024-01-12',
      lastModified: '2024-01-12'
    },
    {
      id: 'APP-2024-005',
      childName: 'Oliver Hansen',
      parentName: 'Kari Hansen',
      age: '3 years',
      appliedDate: '2024-01-10',
      desiredStartDate: '2024-02-01',
      status: 'rejected',
      priority: 'low',
      notes: 'No available spots for requested age group',
      documents: { complete: true, missing: [] },
      kindergartenPreference: 'Rainbow Kindergarten',
      applicationType: 'New Registration',
      createdAt: '2024-01-10',
      lastModified: '2024-01-10'
    }
  ];
  
  const application = applications.find(app => app.id === id);
  
  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Application Not Found</h2>
            <p className="text-gray-600 mb-4">The application you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getChildAge = (ageString: string) => {
    return parseInt(ageString.split(' ')[0]);
  };

  const getDeadlineInfo = (application: any) => {
    const createdDate = parseISO(application.createdAt);
    const deadline = addDays(createdDate, 30);
    const daysLeft = differenceInDays(deadline, new Date());
    
    return {
      deadline,
      daysLeft,
      isUrgent: daysLeft <= 7,
      isOverdue: daysLeft < 0
    };
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: { 
        color: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: Clock,
        progress: 25,
        description: 'Application pending review'
      },
      'under-review': { 
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Eye,
        progress: 50,
        description: 'Application under review'
      },
      accepted: { 
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        progress: 100,
        description: 'Application accepted'
      },
      rejected: { 
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: AlertTriangle,
        progress: 100,
        description: 'Application rejected'
      }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const getPriorityConfig = (priority: string) => {
    const configs = {
      low: { color: 'bg-gray-100 text-gray-700 border-gray-300', icon: Clock },
      medium: { color: 'bg-blue-100 text-blue-700 border-blue-300', icon: Clock },
      high: { color: 'bg-red-100 text-red-700 border-red-300', icon: AlertTriangle }
    };
    return configs[priority as keyof typeof configs] || configs.medium;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, 'MMM dd, yyyy');
      }
      return 'Invalid date';
    } catch {
      return 'Invalid date';
    }
  };

  const statusConfig = getStatusConfig(application.status);
  const priorityConfig = getPriorityConfig(application.priority);
  const deadlineInfo = getDeadlineInfo(application);
  const childAge = getChildAge(application.age);
  const StatusIcon = statusConfig.icon;
  const PriorityIcon = priorityConfig.icon;

  const handleQuickAction = (action: string) => {
    toast.success(`${action} action initiated`);
  };

  const handleStatusUpdate = (newStatus: string) => {
    toast.success(`Application status updated to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Link to="/kindergarten" className="hover:text-oslo-blue">Dashboard</Link>
            <span className="mx-2">/</span>
            <Link to="/kindergarten/applications" className="hover:text-oslo-blue">Applications</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Application Details</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Applications
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
                <p className="text-sm text-gray-500">{application.id}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="gap-2" onClick={() => handleQuickAction('Contact Parent')}>
                <MessageSquare className="h-4 w-4" />
                Contact Parent
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
              {(application.status === 'pending' || application.status === 'under-review') && (
                <Button className="gap-2 bg-oslo-blue hover:bg-oslo-blue/90">
                  <CheckCircle className="h-4 w-4" />
                  Review Application
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-r from-white via-blue-50/30 to-green-50/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-oslo-blue to-oslo-green text-white">
                      {application.childName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{application.childName}</h2>
                        <div className="flex items-center gap-4 text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            Age {childAge}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Applied {formatDate(application.appliedDate)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`${statusConfig.color} font-medium flex items-center gap-1`}>
                          <StatusIcon className="h-3 w-3" />
                          {application.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                        <Badge className={`${priorityConfig.color} font-medium flex items-center gap-1`}>
                          <PriorityIcon className="h-3 w-3" />
                          {application.priority.toUpperCase()} Priority
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">Processing Progress</span>
                        <span className="text-gray-500">{statusConfig.progress}%</span>
                      </div>
                      <Progress value={statusConfig.progress} className="h-2" />
                      
                      <div className={`flex items-center justify-between p-3 rounded-lg ${
                        deadlineInfo.isOverdue ? 'bg-red-50 border border-red-200' : 
                        deadlineInfo.isUrgent ? 'bg-yellow-50 border border-yellow-200' : 
                        'bg-blue-50 border border-blue-200'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Timer className={`h-4 w-4 ${
                            deadlineInfo.isOverdue ? 'text-red-600' : 
                            deadlineInfo.isUrgent ? 'text-yellow-600' : 'text-blue-600'
                          }`} />
                          <span className="text-sm font-medium">
                            {deadlineInfo.isOverdue ? 'Overdue' : 
                             deadlineInfo.isUrgent ? 'Due Soon' : 'Deadline'}
                          </span>
                        </div>
                        <div className="text-sm">
                          {deadlineInfo.isOverdue ? 
                            `${Math.abs(deadlineInfo.daysLeft)} days overdue` :
                            `${deadlineInfo.daysLeft} days remaining`
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parent Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50">
                <CardTitle className="flex items-center gap-3 text-oslo-blue">
                  <User className="h-5 w-5" />
                  Parent/Guardian Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Primary Guardian</label>
                      <p className="text-lg font-semibold text-gray-900">{application.parentName}</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>+47 123 45 678</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{application.parentName.toLowerCase().replace(' ', '.')}@email.com</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="gap-2" onClick={() => handleQuickAction('Call')}>
                        <Phone className="h-4 w-4" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2" onClick={() => handleQuickAction('Email')}>
                        <Mail className="h-4 w-4" />
                        Email
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {!application.documents.complete && (
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2 text-red-700 mb-2">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="font-medium">Missing Documents</span>
                        </div>
                        <ul className="text-sm text-red-600 list-disc list-inside">
                          {application.documents.missing.map((doc, index) => (
                            <li key={index}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-900">Desired Start Date</div>
                      <div className="text-sm text-blue-700 mt-1">
                        {formatDate(application.desiredStartDate)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50">
                <CardTitle className="flex items-center gap-3 text-oslo-green">
                  <FileText className="h-5 w-5" />
                  Application Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Application Type</label>
                    <p className="text-gray-900 mt-2">{application.applicationType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Kindergarten Preference</label>
                    <p className="text-gray-900 mt-2">{application.kindergartenPreference}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-3 block">Notes</label>
                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                    <p className="text-gray-900">{application.notes}</p>
                  </div>
                </div>

                {(application.status === 'pending' || application.status === 'under-review') && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-3 block">Quick Actions</label>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleStatusUpdate('Accepted')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept Application
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleStatusUpdate('Under Review')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Mark Under Review
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleStatusUpdate('Rejected')}
                        className="text-red-700 border-red-300 hover:bg-red-50"
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-oslo-blue">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-3" onClick={() => handleQuickAction('Schedule Visit')}>
                  <Calendar className="h-4 w-4" />
                  Schedule Visit
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleQuickAction('Request Documents')}>
                  <Upload className="h-4 w-4" />
                  Request Documents
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleQuickAction('Send Message')}>
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Application Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className={statusConfig.color}>
                      {application.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Priority</span>
                    <Badge className={priorityConfig.color}>
                      {application.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Child Age</span>
                    <span className="text-sm font-medium">{application.age}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Applied Date</span>
                    <span className="text-sm font-medium">{formatDate(application.appliedDate)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Documents</span>
                    <Badge className={application.documents.complete ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {application.documents.complete ? 'Complete' : 'Incomplete'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
