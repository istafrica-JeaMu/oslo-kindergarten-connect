
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Download, Edit, Calendar, User, FileText, Phone, Mail, MapPin, AlertTriangle, CheckCircle, Clock, MessageSquare, FileCheck, Users, Star, Flag, Timer, Pencil, Send, Upload, Eye, Bell, ChevronLeft, ChevronRight, Settings, ArrowLeftRight } from 'lucide-react';
import { mockApplications } from '@/types/application';
import { format, isValid, parseISO, differenceInDays, addDays } from 'date-fns';
import { toast } from 'sonner';

const ApplicationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const application = mockApplications.find(app => app.id === id);
  const currentApplicationIndex = mockApplications.findIndex(app => app.id === id);
  const previousApplication = currentApplicationIndex > 0 ? mockApplications[currentApplicationIndex - 1] : null;
  const nextApplication = currentApplicationIndex < mockApplications.length - 1 ? mockApplications[currentApplicationIndex + 1] : null;
  
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

  // Calculate child age from application data
  const getChildAge = (childName: string) => {
    const ageMap: { [key: string]: number } = {
      'Lina Berg': 4,
      'Emma Nordahl': 3,
      'Oscar Hansen': 5,
      'Sofia Andersen': 3,
      'Noah Kristensen': 4,
      'Maja Olsen': 5,
      'Elias Pettersen': 3,
      'Isabella Johansen': 4,
      'Alexander Nilsen': 5,
      'Erik Svendsen': 4
    };
    return ageMap[childName] || 4;
  };

  // Calculate deadline and urgency
  const getDeadlineInfo = (application: any) => {
    const createdDate = parseISO(application.createdAt);
    const deadline = addDays(createdDate, 30); // 30 days to process
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
      draft: { 
        color: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: Edit,
        progress: 25,
        description: 'Application is being completed by guardian'
      },
      submitted: { 
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: CheckCircle,
        progress: 50,
        description: 'Application submitted and awaiting review'
      },
      flagged: { 
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: Flag,
        progress: 35,
        description: 'Application requires additional documentation or review'
      },
      approved: { 
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        progress: 100,
        description: 'Application approved and placement confirmed'
      },
      rejected: { 
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: AlertTriangle,
        progress: 100,
        description: 'Application rejected - review reasons provided'
      }
    };
    return configs[status as keyof typeof configs] || configs.draft;
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

  const formatDateLong = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, 'PPP');
      }
      return 'Invalid date';
    } catch {
      return 'Invalid date';
    }
  };

  const statusConfig = getStatusConfig(application.status);
  const priorityConfig = getPriorityConfig(application.priority);
  const deadlineInfo = getDeadlineInfo(application);
  const childAge = getChildAge(application.childName);
  const StatusIcon = statusConfig.icon;
  const PriorityIcon = priorityConfig.icon;

  const handleQuickAction = (action: string) => {
    toast.success(`${action} action initiated`);
  };

  const handleStatusUpdate = (newStatus: string) => {
    toast.success(`Application status updated to ${newStatus}`);
  };

  const handleNavigateApplication = (appId: string) => {
    navigate(`/caseworker/application/${appId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/20">
      {/* Enhanced Header with Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Link to="/caseworker" className="hover:text-oslo-blue">Dashboard</Link>
            <span className="mx-2">/</span>
            <Link to="/caseworker/review-queue" className="hover:text-oslo-blue">Review Queue</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Application Details</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Queue
              </Button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
                  {application.isDualPlacement && (
                    <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                      <ArrowLeftRight className="h-3 w-3 mr-1" />
                      Dual Placement
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">{application.id}</p>
              </div>
              
              {/* Application Navigation */}
              <div className="flex items-center gap-2 ml-8">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => previousApplication && handleNavigateApplication(previousApplication.id)}
                  disabled={!previousApplication}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-500 px-2">
                  {currentApplicationIndex + 1} of {mockApplications.length}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => nextApplication && handleNavigateApplication(nextApplication.id)}
                  disabled={!nextApplication}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Enhanced Action Bar */}
            <div className="flex gap-3">
              {application.isDualPlacement && (
                <Button 
                  variant="outline" 
                  className="gap-2 text-purple-600 border-purple-300 hover:bg-purple-50" 
                  onClick={() => navigate(`/caseworker/dual-placement-setup/${application.id}`)}
                >
                  <Settings className="h-4 w-4" />
                  Manage Dual Placement
                </Button>
              )}
              <Button variant="outline" className="gap-2" onClick={() => handleQuickAction('Contact Guardian')}>
                <MessageSquare className="h-4 w-4" />
                Contact Guardian
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => handleQuickAction('Request Documents')}>
                <Upload className="h-4 w-4" />
                Request Docs
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
              {application.status === 'submitted' && (
                <Button className="gap-2 bg-oslo-blue hover:bg-oslo-blue/90">
                  <FileCheck className="h-4 w-4" />
                  Start Review
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Hero Section */}
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
                            Created {formatDate(application.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            Oslo
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Badge className={`${statusConfig.color} font-medium flex items-center gap-1`}>
                            <StatusIcon className="h-3 w-3" />
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                          <Eye className="h-4 w-4 text-gray-400 cursor-help" />
                        </div>
                        <Badge className={`${priorityConfig.color} font-medium flex items-center gap-1`}>
                          <PriorityIcon className="h-3 w-3" />
                          {application.priority.toUpperCase()} Priority
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Enhanced Progress and Deadline */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">Processing Progress</span>
                        <span className="text-gray-500">{statusConfig.progress}%</span>
                      </div>
                      <Progress value={statusConfig.progress} className="h-2" />
                      
                      {/* Deadline Alert */}
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

                    {/* Special Indicators */}
                    <div className="flex gap-2 mt-4">
                      {application.applicationType === 'Emergency' && (
                        <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-50">
                          <Star className="h-3 w-3 mr-1" />
                          Emergency Application
                        </Badge>
                      )}
                      {application.applicationType === 'Transfer' && (
                        <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
                          <Users className="h-3 w-3 mr-1" />
                          Transfer Request
                        </Badge>
                      )}
                      {application.priority === 'high' && (
                        <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">
                          <Bell className="h-3 w-3 mr-1" />
                          High Priority
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dual Placement Information (if applicable) */}
            {application.isDualPlacement && (
              <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-purple-100/50">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50">
                  <CardTitle className="flex items-center gap-3 text-purple-700">
                    <ArrowLeftRight className="h-5 w-5" />
                    Dual Placement Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <h4 className="font-medium">Primary Kindergarten</h4>
                      </div>
                      <div className="pl-5 space-y-2">
                        <p className="font-semibold">{application.kindergartenPreference}</p>
                        <div className="text-sm text-gray-600">
                          <p>Days: Monday, Tuesday, Friday</p>
                          <p>Custody: 60%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <h4 className="font-medium">Secondary Kindergarten</h4>
                      </div>
                      <div className="pl-5 space-y-2">
                        <p className="font-semibold">{application.secondaryKindergartenPreference}</p>
                        <div className="text-sm text-gray-600">
                          <p>Days: Wednesday, Thursday</p>
                          <p>Custody: 40%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
                    <h5 className="font-medium text-purple-900 mb-2">Dual Placement Notes</h5>
                    <p className="text-sm text-purple-700">
                      Split custody arrangement - parents live in different districts. Approved based on custody agreement dated June 1st, 2024.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Guardian Information with Quick Contact */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50">
                <CardTitle className="flex items-center gap-3 text-oslo-blue">
                  <User className="h-5 w-5" />
                  Guardian Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Primary Guardian</label>
                      <p className="text-lg font-semibold text-gray-900">{application.guardianName}</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>+47 123 45 678</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{application.guardianName.toLowerCase().replace(' ', '.')}@email.com</span>
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
                      <Button variant="outline" size="sm" className="gap-2" onClick={() => handleQuickAction('Message')}>
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-900">Last Contact</div>
                      <div className="text-sm text-blue-700 mt-1">
                        Email sent 3 days ago
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium text-green-900">Response Time</div>
                      <div className="text-sm text-green-700 mt-1">
                        Usually responds within 24 hours
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Details with Inline Editing */}
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
                    <label className="text-sm font-medium text-gray-600">Kindergarten Preference</label>
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-sm">
                          #1
                        </Badge>
                        <span className="text-gray-900">{application.kindergartenPreference || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Application Type</label>
                    <p className="text-gray-900 mt-2">{application.applicationType}</p>
                  </div>
                </div>
                
                {/* Editable Notes Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-600">Caseworker Notes</label>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                    <p className="text-gray-900">{application.notes || 'No notes added yet.'}</p>
                  </div>
                </div>

                {/* Quick Status Update */}
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-3 block">Quick Status Update</label>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleStatusUpdate('In Review')}
                      disabled={application.status === 'submitted'}
                    >
                      Mark In Review
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleStatusUpdate('Approved')}
                      className="text-green-700 border-green-300 hover:bg-green-50"
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleStatusUpdate('Flagged')}
                      className="text-red-700 border-red-300 hover:bg-red-50"
                    >
                      Flag for Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication History */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50">
                <CardTitle className="flex items-center gap-3 text-purple-700">
                  <MessageSquare className="h-5 w-5" />
                  Communication History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Send className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-gray-900">Document Request Sent</div>
                        <div className="text-sm text-gray-500">3 days ago</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Requested vaccination records and birth certificate
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 bg-green-50 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-gray-900">Application Submitted</div>
                        <div className="text-sm text-gray-500">{formatDateLong(application.lastModified)}</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Complete application received from guardian
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Add Communication Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Priority Quick Actions */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-oslo-blue/5 to-oslo-green/5">
              <CardHeader>
                <CardTitle className="text-oslo-blue">Priority Actions</CardTitle>
                <CardDescription>Most common tasks for this application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {application.status === 'submitted' && (
                  <Button className="w-full justify-start gap-3 bg-oslo-blue hover:bg-oslo-blue/90" onClick={() => handleQuickAction('Start Review')}>
                    <FileCheck className="h-4 w-4" />
                    Start Review Process
                  </Button>
                )}
                {application.status === 'flagged' && (
                  <Button className="w-full justify-start gap-3 bg-red-600 hover:bg-red-700 text-white" onClick={() => handleQuickAction('Resolve Issues')}>
                    <AlertTriangle className="h-4 w-4" />
                    Resolve Flagged Issues
                  </Button>
                )}
                <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleQuickAction('Schedule Meeting')}>
                  <Calendar className="h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleQuickAction('Check Placement Availability')}>
                  <MapPin className="h-4 w-4" />
                  Check Placement Availability
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Status Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Status</span>
                    <Badge className={statusConfig.color}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Priority Level</span>
                    <Badge className={priorityConfig.color}>
                      {application.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Child Age</span>
                    <span className="text-sm font-medium">{childAge} years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Application Type</span>
                    <span className="text-sm font-medium">{application.applicationType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Created Date</span>
                    <span className="text-sm font-medium">{formatDate(application.createdAt)}</span>
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

export default ApplicationView;
