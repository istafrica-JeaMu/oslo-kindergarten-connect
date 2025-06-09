import { Application } from '@/types/application';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Play, Download, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ApplicationTableProps {
  applications: Application[];
  showActions?: boolean;
}

const ApplicationTable = ({ applications, showActions = true }: ApplicationTableProps) => {
  const navigate = useNavigate();

  const handleView = (application: Application) => {
    navigate(`/caseworker/application/${application.id}/view`);
  };

  const handleResume = (application: Application) => {
    // Navigate to the standard wizard with prefilled data
    navigate('/caseworker/manual-application', {
      state: {
        prefillData: application,
        isResuming: true
      }
    });
  };

  const handleDownload = (application: Application) => {
    // Simulate PDF download
    toast.success(`Downloading PDF for ${application.childName}...`);
    console.log('Downloading PDF for application:', application.id);
  };

  const handleReview = (application: Application) => {
    navigate(`/caseworker/application/${application.id}/view`);
  };

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'draft':
        return <Clock className="h-4 w-4 text-amber-600" />;
      case 'submitted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'flagged':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Application['status']) => {
    const variants = {
      draft: 'bg-amber-100 text-amber-800 border-amber-200',
      submitted: 'bg-green-100 text-green-800 border-green-200',
      flagged: 'bg-red-100 text-red-800 border-red-200',
      approved: 'bg-blue-100 text-blue-800 border-blue-200',
      rejected: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    return (
      <Badge className={`${variants[status]} font-medium`}>
        <span className="flex items-center gap-1">
          {getStatusIcon(status)}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </Badge>
    );
  };

  const getPriorityBadge = (priority: Application['priority']) => {
    const variants = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-red-100 text-red-700'
    };

    return (
      <Badge variant="outline" className={`${variants[priority]} text-xs`}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  const getActionButtons = (application: Application) => {
    switch (application.status) {
      case 'draft':
        return (
          <>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 gap-1"
              onClick={() => handleResume(application)}
              title="Resume editing this application"
            >
              <Play className="h-3 w-3" />
              Resume
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 gap-1"
              onClick={() => handleView(application)}
              title="View application details"
            >
              <Eye className="h-3 w-3" />
              View
            </Button>
          </>
        );
      case 'submitted':
        return (
          <>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 gap-1"
              onClick={() => handleDownload(application)}
              title="Download PDF of submitted application"
            >
              <Download className="h-3 w-3" />
              PDF
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 gap-1"
              onClick={() => handleView(application)}
              title="View application details"
            >
              <Eye className="h-3 w-3" />
              View
            </Button>
          </>
        );
      case 'flagged':
        return (
          <>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 gap-1"
              onClick={() => handleReview(application)}
              title="Review flagged application"
            >
              <AlertCircle className="h-3 w-3" />
              Review
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 gap-1"
              onClick={() => handleView(application)}
              title="View application details"
            >
              <Eye className="h-3 w-3" />
              View
            </Button>
          </>
        );
      default:
        return (
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 gap-1"
            onClick={() => handleView(application)}
            title="View application details"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
        );
    }
  };

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12 text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            {getStatusIcon('draft')}
          </div>
          <p className="text-lg font-medium mb-2">No applications found</p>
          <p>No applications match the current criteria.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Child Name</TableHead>
              <TableHead>Guardian</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Kindergarten</TableHead>
              {showActions && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div>
                    <div className="font-semibold text-slate-900">{application.childName}</div>
                    <div className="text-xs text-slate-500">{application.id}</div>
                  </div>
                </TableCell>
                <TableCell>{application.guardianName}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {application.applicationType}
                  </Badge>
                </TableCell>
                <TableCell>{getPriorityBadge(application.priority)}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{format(new Date(application.createdAt), 'MMM dd, yyyy')}</div>
                    <div className="text-xs text-slate-500">
                      Modified: {format(new Date(application.lastModified), 'MMM dd')}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell>
                  <div className="text-sm text-slate-600">
                    {application.kindergartenPreference || 'Not specified'}
                  </div>
                </TableCell>
                {showActions && (
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      {getActionButtons(application)}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ApplicationTable;
