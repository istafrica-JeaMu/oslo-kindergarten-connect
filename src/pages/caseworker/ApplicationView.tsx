
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Edit, Calendar, User, FileText } from 'lucide-react';
import { mockApplications } from '@/types/application';
import { format } from 'date-fns';

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

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'bg-amber-100 text-amber-800 border-amber-200',
      submitted: 'bg-green-100 text-green-800 border-green-200',
      flagged: 'bg-red-100 text-red-800 border-red-200',
      approved: 'bg-blue-100 text-blue-800 border-blue-200',
      rejected: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    return (
      <Badge className={`${variants[status as keyof typeof variants]} font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-red-100 text-red-700'
    };

    return (
      <Badge variant="outline" className={`${variants[priority as keyof typeof variants]}`}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Applications
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
              <p className="text-gray-600">{application.id}</p>
            </div>
          </div>
          <div className="flex gap-3">
            {application.status === 'draft' && (
              <Button asChild>
                <Link to={`/caseworker/manual-application/${application.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Resume Editing
                </Link>
              </Button>
            )}
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Status and Priority */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-semibold text-lg">Status & Priority</h3>
                  <div className="flex items-center gap-3 mt-2">
                    {getStatusBadge(application.status)}
                    {getPriorityBadge(application.priority)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Application Type</p>
                <Badge variant="outline" className="mt-1">
                  {application.applicationType}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Child Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Child Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600">Child Name</label>
                <p className="text-lg font-semibold text-gray-900">{application.childName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Guardian Name</label>
                <p className="text-lg font-semibold text-gray-900">{application.guardianName}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              Application Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600">Kindergarten Preference</label>
                <p className="text-gray-900">{application.kindergartenPreference || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Application Type</label>
                <p className="text-gray-900">{application.applicationType}</p>
              </div>
            </div>
            {application.notes && (
              <div>
                <label className="text-sm font-medium text-gray-600">Notes</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{application.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600">Created</label>
                <p className="text-gray-900">{format(new Date(application.createdAt), 'PPP')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Last Modified</label>
                <p className="text-gray-900">{format(new Date(application.lastModified), 'PPP')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationView;
