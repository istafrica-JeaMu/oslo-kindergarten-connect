
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';

const ApplicationStatus = () => {
  // Mock application data
  const applications = [
    {
      id: 'APP-001',
      childName: 'Emma Hansen',
      status: 'submitted',
      submittedDate: '2024-03-15',
      kindergartens: [
        { name: 'Løvenskiold Kindergarten', priority: 1, status: 'pending' },
        { name: 'Sinsen Kindergarten', priority: 2, status: 'pending' },
        { name: 'Sagene Kindergarten', priority: 3, status: 'pending' }
      ],
      lastUpdate: '2024-03-16',
      caseWorker: 'Erik Johansen',
      estimatedDecisionDate: '2024-04-15'
    },
    {
      id: 'APP-002',
      childName: 'Oliver Hansen',
      status: 'placed',
      submittedDate: '2024-02-20',
      kindergartens: [
        { name: 'Sinsen Kindergarten', priority: 1, status: 'accepted' },
        { name: 'Bjølsen Kindergarten', priority: 2, status: 'not_processed' }
      ],
      lastUpdate: '2024-03-10',
      placedKindergarten: 'Sinsen Kindergarten',
      startDate: '2024-08-15'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'placed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Under Review</Badge>;
      case 'placed':
        return <Badge variant="outline" className="text-green-600 border-green-300">Placement Assigned</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-300">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown Status</Badge>;
    }
  };

  const getKindergartenStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-blue-600 border-blue-300">Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="text-green-600 border-green-300">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-300">Rejected</Badge>;
      case 'not_processed':
        return <Badge variant="outline" className="text-gray-600 border-gray-300">Not Processed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Application Status</h1>
        <p className="text-gray-600 mt-2">
          Track the status of your kindergarten applications
        </p>
      </div>

      <div className="space-y-6">
        {applications.map((app) => (
          <Card key={app.id} className="border-l-4 border-l-oslo-blue">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(app.status)}
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {app.childName}
                      {getStatusBadge(app.status)}
                    </CardTitle>
                    <CardDescription>
                      Application #{app.id} • Submitted: {app.submittedDate}
                    </CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Application Timeline */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Processing Timeline</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Application received - {app.submittedDate}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Under review - {app.lastUpdate}</span>
                  </div>
                  {app.status === 'placed' ? (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Placement assigned - {app.lastUpdate}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Expected decision: {app.estimatedDecisionDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Kindergarten Preferences */}
              <div>
                <h4 className="font-semibold mb-3">Kindergarten Preferences</h4>
                <div className="space-y-3">
                  {app.kindergartens.map((kg, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-oslo-blue text-white text-sm rounded-full flex items-center justify-center">
                          {kg.priority}
                        </span>
                        <span className="font-medium">{kg.name}</span>
                      </div>
                      {getKindergartenStatusBadge(kg.status)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Placement Information */}
              {app.status === 'placed' && app.placedKindergarten && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">🎉 Congratulations! Placement Assigned</h4>
                  <p className="text-green-700">
                    <strong>{app.childName}</strong> has been assigned a place at <strong>{app.placedKindergarten}</strong>
                  </p>
                  <p className="text-green-600 mt-1">
                    Start date: {app.startDate}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Accept Placement
                    </Button>
                    <Button variant="outline" size="sm">
                      Download Contract
                    </Button>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  {app.caseWorker && (
                    <span>Case Worker: {app.caseWorker}</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {app.lastUpdate}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Information Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Important Information</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• You will receive email notification when your application status changes</li>
                <li>• When offered a placement, you must accept within 14 days</li>
                <li>• You can update preferences until the processing deadline</li>
                <li>• Contact your case worker if you have questions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationStatus;
