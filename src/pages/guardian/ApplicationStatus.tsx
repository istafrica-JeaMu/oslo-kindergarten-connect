
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye, Calendar, User, FileCheck, Phone } from 'lucide-react';

const ApplicationStatus = () => {
  // Enhanced mock application data with new requirements
  const applications = [
    {
      id: 'APP-001',
      childName: 'Emma Hansen',
      status: 'under_review',
      submittedDate: '2024-03-15',
      admissionRound: 'main_part_1',
      deadline: '2024-03-01',
      statutoryRight: true,
      idVerificationStatus: 'verified',
      documentsStatus: 'pending_review',
      queuePosition: 234,
      kindergartens: [
        { name: 'Løvenskiold Kindergarten', priority: 1, status: 'pending' },
        { name: 'Sinsen Kindergarten', priority: 2, status: 'pending' },
        { name: 'Sagene Kindergarten', priority: 3, status: 'pending' }
      ],
      lastUpdate: '2024-03-16',
      caseWorker: 'Erik Johansen',
      estimatedDecisionDate: '2024-04-15',
      progressPercentage: 45,
      uploadedDocuments: [
        { name: 'Birth Certificate', status: 'verified', required: true },
        { name: 'Disability Documentation', status: 'pending', required: false }
      ]
    },
    {
      id: 'APP-002',
      childName: 'Oliver Hansen',
      status: 'placed',
      submittedDate: '2024-02-20',
      admissionRound: 'main_part_1',
      deadline: '2024-03-01',
      statutoryRight: false,
      idVerificationStatus: 'verified',
      documentsStatus: 'verified',
      kindergartens: [
        { name: 'Sinsen Kindergarten', priority: 1, status: 'accepted' },
        { name: 'Bjølsen Kindergarten', priority: 2, status: 'not_processed' }
      ],
      lastUpdate: '2024-03-10',
      placedKindergarten: 'Sinsen Kindergarten',
      startDate: '2024-08-15',
      progressPercentage: 100,
      uploadedDocuments: [
        { name: 'Birth Certificate', status: 'verified', required: true }
      ]
    }
  ];

  const getAdmissionRoundInfo = (round: string) => {
    switch (round) {
      case 'main_part_1':
        return {
          name: 'Main Recording Part 1',
          deadline: 'March 1, 2024',
          description: 'Children with statutory right or without place by Sept 30',
          priority: 'High Priority'
        };
      case 'main_part_2':
        return {
          name: 'Main Recording Part 2',
          deadline: 'August 15, 2024',
          description: 'Children turning one by November 31 without a place',
          priority: 'Standard Priority'
        };
      case 'ongoing':
        return {
          name: 'Ongoing Recording',
          deadline: 'Rolling basis',
          description: 'Applications for vacant places after main rounds',
          priority: 'Lower Priority'
        };
      default:
        return {
          name: 'Unknown',
          deadline: 'N/A',
          description: 'Application round not specified',
          priority: 'Unknown'
        };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'under_review':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'placed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'verification_pending':
        return <User className="h-5 w-5 text-orange-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'under_review':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Under Review</Badge>;
      case 'placed':
        return <Badge variant="outline" className="text-green-600 border-green-300">Placement Assigned</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-300">Rejected</Badge>;
      case 'verification_pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-300">Verification Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown Status</Badge>;
    }
  };

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="outline" className="text-green-600 border-green-300">Verified</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pending Review</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-300">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
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
          Track the status of your kindergarten applications across different recording periods
        </p>
      </div>

      <div className="space-y-6">
        {applications.map((app) => {
          const roundInfo = getAdmissionRoundInfo(app.admissionRound);
          
          return (
            <Card key={app.id} className="border-l-4 border-l-oslo-blue">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(app.status)}
                    <div>
                      <CardTitle className="flex items-center gap-2 flex-wrap">
                        {app.childName}
                        {getStatusBadge(app.status)}
                        {app.statutoryRight && (
                          <Badge className="bg-oslo-blue text-white">Statutory Right</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        Application #{app.id} • {roundInfo.name} • Submitted: {app.submittedDate}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
                
                {/* Application Round Info */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-800">{roundInfo.name}</span>
                    <Badge variant="outline" className="text-blue-600 border-blue-300">{roundInfo.priority}</Badge>
                  </div>
                  <p className="text-blue-700 text-sm">{roundInfo.description}</p>
                  <p className="text-blue-600 text-sm mt-1">Deadline: {roundInfo.deadline}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Application Progress</span>
                    <span className="text-sm text-gray-600">{app.progressPercentage}% Complete</span>
                  </div>
                  <Progress value={app.progressPercentage} className="h-2" />
                  {app.queuePosition && (
                    <p className="text-sm text-gray-600">Queue position: #{app.queuePosition}</p>
                  )}
                </div>

                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="verification">Verification</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="timeline" className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Processing Timeline</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Application received - {app.submittedDate}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Identity verification completed</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm">Document review in progress - {app.lastUpdate}</span>
                        </div>
                        {app.status === 'placed' ? (
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm">Placement assigned - {app.lastUpdate}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                            <span className="text-sm text-gray-500">Expected decision: {app.estimatedDecisionDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preferences" className="space-y-4">
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
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Documents</h4>
                      <div className="space-y-3">
                        {app.uploadedDocuments?.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileCheck className="h-4 w-4 text-gray-600" />
                              <div>
                                <span className="font-medium">{doc.name}</span>
                                {doc.required && (
                                  <Badge variant="outline" className="ml-2 text-xs">Required</Badge>
                                )}
                              </div>
                            </div>
                            {getDocumentStatusBadge(doc.status)}
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Upload Additional Documents
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="verification" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <User className="h-4 w-4 text-gray-600" />
                          <span>Identity Verification</span>
                        </div>
                        {getDocumentStatusBadge(app.idVerificationStatus)}
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileCheck className="h-4 w-4 text-gray-600" />
                          <span>Document Verification</span>
                        </div>
                        {getDocumentStatusBadge(app.documentsStatus)}
                      </div>
                      {app.idVerificationStatus !== 'verified' && (
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                          <p className="text-orange-800 text-sm mb-2">
                            <strong>Action Required:</strong> Additional verification needed
                          </p>
                          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact Support
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

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

                {/* Case Worker Information */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    {app.caseWorker && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Case Worker: {app.caseWorker}</span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <Phone className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    Last updated: {app.lastUpdate}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Information Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-3">Important Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Application Deadlines</h5>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Main Part 1: March 1 (Statutory right children)</li>
                    <li>• Main Part 2: August 15 (Late applications)</li>
                    <li>• Ongoing: Year-round for vacant places</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Important Notes</h5>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Accept placements within 14 days</li>
                    <li>• Update preferences before processing deadline</li>
                    <li>• Contact case worker for questions</li>
                    <li>• Email notifications for status changes</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-blue-700 text-sm mb-2">
                  <strong>Need Help?</strong> Contact Oslo Contact Center (OKK) for assistance with ID verification or manual submission.
                </p>
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact OKK Support
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationStatus;
