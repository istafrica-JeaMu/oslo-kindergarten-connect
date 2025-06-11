import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye, Calendar, User, FileCheck, Phone, Plus, Bell, MessageCircle, Upload, ExternalLink, MapPin, Calculator, ArrowLeftRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockApplications } from '@/types/application';

const ApplicationStatus = () => {
  // Use applications from the centralized mock data
  const applications = mockApplications.filter(app => 
    // Filter to show applications that would belong to a guardian
    ['APP-2024-001', 'APP-2024-002', 'APP-2024-010'].includes(app.id)
  ).map(app => ({
    ...app,
    submittedDate: app.createdAt,
    admissionRound: 'main_part_1' as const,
    deadline: '2024-03-01',
    statutoryRight: app.priority === 'high',
    idVerificationStatus: 'verified' as const,
    documentsStatus: app.status === 'draft' ? 'pending_review' as const : 'verified' as const,
    queuePosition: app.status === 'submitted' ? 234 : undefined,
    kindergartens: [
      { 
        name: app.kindergartenPreference || 'Unknown Kindergarten', 
        priority: 1, 
        status: app.status === 'submitted' ? 'pending' as const : 'not_processed' as const, 
        distance: '0.8 km' 
      },
      ...(app.secondaryKindergartenPreference ? [{
        name: app.secondaryKindergartenPreference,
        priority: 2,
        status: app.status === 'submitted' ? 'pending' as const : 'not_processed' as const,
        distance: '1.2 km'
      }] : [])
    ],
    lastUpdate: app.lastModified,
    caseWorker: 'Erik Johansen',
    estimatedDecisionDate: '2024-04-15',
    progressPercentage: app.status === 'draft' ? 25 : app.status === 'submitted' ? 65 : 100,
    uploadedDocuments: [
      { name: 'Birth Certificate', status: 'verified' as const, required: true },
      ...(app.notes ? [{ name: 'Additional Notes', status: 'pending' as const, required: false }] : [])
    ],
    notifications: app.status === 'draft' ? 1 : 0,
    urgentActions: app.status === 'draft' ? 1 : 0
  }));

  // Progress stepper stages
  const getProgressStages = (status: string, progressPercentage: number) => {
    const stages = [
      { name: 'Application Submitted', status: 'completed', percentage: 25 },
      { name: 'Under Review', status: progressPercentage >= 50 ? 'completed' : 'current', percentage: 50 },
      { name: 'Decision Made', status: progressPercentage >= 75 ? 'completed' : 'pending', percentage: 75 },
      { name: 'Placement Assigned', status: status === 'approved' ? 'completed' : 'pending', percentage: 100 }
    ];
    return stages;
  };

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
      case 'draft':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'submitted':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'flagged':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Draft</Badge>;
      case 'submitted':
        return <Badge variant="outline" className="text-blue-600 border-blue-300">Submitted</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-300">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-300">Rejected</Badge>;
      case 'flagged':
        return <Badge variant="outline" className="text-orange-600 border-orange-300">Needs Follow-up</Badge>;
      default:
        return <Badge variant="outline">Unknown Status</Badge>;
    }
  };

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="outline" className="text-green-600 border-green-300">Verified</Badge>;
      case 'pending':
      case 'pending_review':
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

  const totalNotifications = applications.reduce((sum, app) => sum + app.notifications, 0);
  const totalUrgentActions = applications.reduce((sum, app) => sum + app.urgentActions, 0);

  return (
    <div className="space-y-8">
      {/* Enhanced Header with Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Application Status</h1>
          <p className="text-gray-600 mt-2">
            Track the status of your kindergarten applications across different recording periods
          </p>
        </div>
        
        {/* Call-to-Action and Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {totalNotifications > 0 && (
            <Button variant="outline" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                {totalNotifications}
              </Badge>
            </Button>
          )}
          
          <Link to="/guardian/new-application">
            <Button className="bg-oslo-blue hover:bg-oslo-blue/90 shadow-lg hover:shadow-xl transition-all duration-200">
              <Plus className="h-4 w-4 mr-2" />
              New Application
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Actions Panel */}
      {totalUrgentActions > 0 && (
        <Card className="border-l-4 border-l-red-500 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-red-800 mb-2">Urgent Actions Required</h4>
                <p className="text-red-700 text-sm mb-3">
                  You have {totalUrgentActions} urgent action(s) that need your attention.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                    <Upload className="h-3 w-3 mr-1" />
                    Upload Documents
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                    <Phone className="h-3 w-3 mr-1" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {applications.map((app) => {
          const roundInfo = getAdmissionRoundInfo(app.admissionRound);
          const progressStages = getProgressStages(app.status, app.progressPercentage);
          
          return (
            <Card key={app.id} className="border-l-4 border-l-oslo-blue shadow-lg hover:shadow-xl transition-all duration-200">
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
                        {app.isDualPlacement && (
                          <Badge variant="outline" className="text-purple-600 border-purple-300">
                            <ArrowLeftRight className="h-3 w-3 mr-1" />
                            Dual Placement
                          </Badge>
                        )}
                        {app.notifications > 0 && (
                          <Badge variant="outline" className="text-blue-600 border-blue-300">
                            <Bell className="h-3 w-3 mr-1" />
                            {app.notifications} new
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        Application #{app.id} • {roundInfo.name} • Submitted: {app.submittedDate}
                        {app.isDualPlacement && app.dualPlacementId && (
                          <span className="block text-purple-600 font-medium mt-1">
                            Dual Placement ID: {app.dualPlacementId}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {app.isDualPlacement && (
                      <Link to={`/guardian/dual-placement/${app.id}`}>
                        <Button variant="outline" size="sm" className="text-purple-600 border-purple-300">
                          <ArrowLeftRight className="h-4 w-4 mr-2" />
                          Manage Schedule
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
                
                {/* Enhanced Progress Stepper */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-800">Application Progress</h4>
                    <span className="text-sm text-gray-600">{app.progressPercentage}% Complete</span>
                  </div>
                  
                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      {progressStages.map((stage, index) => (
                        <div key={index} className="flex flex-col items-center text-center flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                            stage.status === 'completed' 
                              ? 'bg-green-500 text-white' 
                              : stage.status === 'current'
                              ? 'bg-oslo-blue text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            {stage.status === 'completed' ? <CheckCircle className="h-4 w-4" /> : index + 1}
                          </div>
                          <span className={`text-xs font-medium ${
                            stage.status === 'completed' || stage.status === 'current'
                              ? 'text-slate-900'
                              : 'text-gray-500'
                          }`}>
                            {stage.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Progress value={app.progressPercentage} className="h-2" />
                  </div>
                  
                  {app.queuePosition && (
                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                      <span>Queue position: #{app.queuePosition}</span>
                      <span>Est. decision: {app.estimatedDecisionDate}</span>
                    </div>
                  )}
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

                {/* Dual Placement Special Info */}
                {app.isDualPlacement && (
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowLeftRight className="h-4 w-4 text-purple-600" />
                      <span className="font-semibold text-purple-800">Dual Placement Arrangement</span>
                    </div>
                    <p className="text-purple-700 text-sm mb-2">
                      Your child will attend two kindergartens according to a shared custody schedule.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <span className="text-xs font-medium text-purple-600">Primary Kindergarten</span>
                        <p className="font-medium text-purple-800">{app.kindergartenPreference}</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <span className="text-xs font-medium text-purple-600">Secondary Kindergarten</span>
                        <p className="font-medium text-purple-800">{app.secondaryKindergartenPreference}</p>
                      </div>
                    </div>
                    {app.notes && (
                      <p className="text-purple-600 text-sm mt-2">
                        <strong>Notes:</strong> {app.notes}
                      </p>
                    )}
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="verification">Verification</TabsTrigger>
                    <TabsTrigger value="tools">Tools</TabsTrigger>
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
                        {app.status === 'approved' ? (
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
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">Kindergarten Preferences</h4>
                        <Button variant="outline" size="sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          View Map
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {app.kindergartens.map((kg, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 bg-oslo-blue text-white text-sm rounded-full flex items-center justify-center">
                                {kg.priority}
                              </span>
                              <div>
                                <span className="font-medium">{kg.name}</span>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {kg.distance}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getKindergartenStatusBadge(kg.status)}
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
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

                  <TabsContent value="tools" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Helpful Tools</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                          <div className="flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
                            <span className="font-medium">Fee Calculator</span>
                          </div>
                          <span className="text-sm text-gray-500">Calculate expected fees</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="font-medium">Distance Calculator</span>
                          </div>
                          <span className="text-sm text-gray-500">Check commute times</span>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

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
