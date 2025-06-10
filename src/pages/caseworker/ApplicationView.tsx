
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Download, Edit, Calendar, User, FileText, Phone, Mail, MapPin, AlertTriangle, CheckCircle, Clock, MessageSquare, FileCheck, Users, Star, Flag } from 'lucide-react';
import { mockApplications } from '@/types/application';
import { format } from 'date-fns';
import { toast } from 'sonner';

const ApplicationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const application = mockApplications.find(app => app.id === id);
  
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

  const getStatusConfig = (status: string) => {
    const configs = {
      draft: { 
        color: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: Edit,
        progress: 25
      },
      submitted: { 
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: CheckCircle,
        progress: 50
      },
      flagged: { 
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: Flag,
        progress: 35
      },
      approved: { 
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        progress: 100
      },
      rejected: { 
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: AlertTriangle,
        progress: 100
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

  const statusConfig = getStatusConfig(application.status);
  const priorityConfig = getPriorityConfig(application.priority);
  const StatusIcon = statusConfig.icon;
  const PriorityIcon = priorityConfig.icon;

  const handleQuickAction = (action: string) => {
    toast.success(`${action} action initiated`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Queue
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
                <p className="text-sm text-gray-500">{application.id}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
              {application.status === 'draft' && (
                <Button className="gap-2">
                  <Edit className="h-4 w-4" />
                  Resume Editing
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
                            Age {application.childAge}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Submitted {format(new Date(application.submittedDate), 'MMM dd, yyyy')}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {application.district}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`${statusConfig.color} font-medium flex items-center gap-1`}>
                          <StatusIcon className="h-3 w-3" />
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                        <Badge className={`${priorityConfig.color} font-medium flex items-center gap-1`}>
                          <PriorityIcon className="h-3 w-3" />
                          {application.priority.toUpperCase()} Priority
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">Application Progress</span>
                        <span className="text-gray-500">{statusConfig.progress}%</span>
                      </div>
                      <Progress value={statusConfig.progress} className="h-2" />
                    </div>

                    {/* Special Indicators */}
                    <div className="flex gap-2 mt-4">
                      {application.specialNeeds && (
                        <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-50">
                          <Star className="h-3 w-3 mr-1" />
                          Special Needs
                        </Badge>
                      )}
                      {application.siblingInKindergarten && (
                        <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
                          <Users className="h-3 w-3 mr-1" />
                          Sibling Priority
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guardian Information */}
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
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm" className="gap-2" onClick={() => handleQuickAction('Call')}>
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
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Contact Information</div>
                      <div className="text-sm font-medium text-gray-900 mt-1">
                        Available in full application details
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
                    <label className="text-sm font-medium text-gray-600">Kindergarten Preferences</label>
                    <div className="mt-2 space-y-2">
                      {application.kindergartenPreferences?.map((pref, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge variant="outline" className="text-sm">
                            #{index + 1}
                          </Badge>
                          <span className="text-gray-900">{pref}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Application Type</label>
                    <p className="text-gray-900 mt-2">{application.applicationType}</p>
                  </div>
                </div>
                
                {application.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Additional Notes</label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                      <p className="text-gray-900">{application.notes}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50">
                <CardTitle className="flex items-center gap-3 text-purple-700">
                  <Clock className="h-5 w-5" />
                  Timeline & History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Application Submitted</div>
                      <div className="text-sm text-gray-600">{format(new Date(application.submittedDate), 'PPP')}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Last Updated</div>
                      <div className="text-sm text-gray-600">{format(new Date(application.lastModified), 'PPP')}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-oslo-blue/5 to-oslo-green/5">
              <CardHeader>
                <CardTitle className="text-oslo-blue">Quick Actions</CardTitle>
                <CardDescription>Manage this application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-3 bg-oslo-blue hover:bg-oslo-blue/90" onClick={() => handleQuickAction('Review')}>
                  <FileCheck className="h-4 w-4" />
                  Start Review Process
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleQuickAction('Request Documents')}>
                  <FileText className="h-4 w-4" />
                  Request Documents
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleQuickAction('Schedule Meeting')}>
                  <Calendar className="h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleQuickAction('Contact Guardian')}>
                  <MessageSquare className="h-4 w-4" />
                  Contact Guardian
                </Button>
              </CardContent>
            </Card>

            {/* Status Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className={statusConfig.color}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Priority</span>
                    <Badge className={priorityConfig.color}>
                      {application.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">District</span>
                    <span className="text-sm font-medium">{application.district}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="text-sm font-medium">{application.applicationType}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Next Steps</h4>
                  <p className="text-sm text-gray-600">
                    {application.status === 'new' && 'Begin initial review and verification'}
                    {application.status === 'submitted' && 'Continue processing and placement decisions'}
                    {application.status === 'flagged' && 'Address flagged issues and requirements'}
                    {application.status === 'approved' && 'Finalize placement and notify guardian'}
                    {application.status === 'rejected' && 'Review rejection reasons and provide feedback'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Documents Checklist */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Birth Certificate', 'Proof of Address', 'Medical Records', 'Guardian ID'].map((doc, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-gray-700">Income Verification</span>
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
