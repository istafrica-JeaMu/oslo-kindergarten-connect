
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowLeftRight, Calendar, Clock, MapPin, User, Phone, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { mockApplications } from '@/types/application';
import { format, addDays, startOfWeek } from 'date-fns';

const DualPlacementManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const application = mockApplications.find(app => app.id === id && app.isDualPlacement);
  
  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Dual Placement Not Found</h2>
            <p className="text-gray-600 mb-4">The dual placement you're looking for doesn't exist.</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock schedule data for the dual placement
  const scheduleData = {
    monday: { kindergarten: 'primary', location: application.kindergartenPreference },
    tuesday: { kindergarten: 'primary', location: application.kindergartenPreference },
    wednesday: { kindergarten: 'secondary', location: application.secondaryKindergartenPreference },
    thursday: { kindergarten: 'secondary', location: application.secondaryKindergartenPreference },
    friday: { kindergarten: 'primary', location: application.kindergartenPreference }
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const currentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applications
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <ArrowLeftRight className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Dual Placement Management</h1>
          </div>
          <p className="text-gray-600">
            Manage {application.childName}'s dual kindergarten placement arrangement
          </p>
        </div>

        {/* Application Overview */}
        <Card className="mb-6 border-l-4 border-l-purple-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {application.childName}
                  <Badge variant="outline" className="text-purple-600 border-purple-300">
                    <ArrowLeftRight className="h-3 w-3 mr-1" />
                    Dual Placement
                  </Badge>
                  <Badge variant="outline" className={
                    application.status === 'submitted' ? 'text-blue-600 border-blue-300' :
                    application.status === 'approved' ? 'text-green-600 border-green-300' :
                    'text-yellow-600 border-yellow-300'
                  }>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Application #{application.id} • Dual Placement ID: {application.dualPlacementId}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Case Worker
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-blue-800">Primary Kindergarten</span>
                </div>
                <p className="font-medium text-blue-900">{application.kindergartenPreference}</p>
                <p className="text-sm text-blue-600 mt-1">Monday, Tuesday, Friday</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-800">Secondary Kindergarten</span>
                </div>
                <p className="font-medium text-green-900">{application.secondaryKindergartenPreference}</p>
                <p className="text-sm text-green-600 mt-1">Wednesday, Thursday</p>
              </div>
            </div>
            {application.notes && (
              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-purple-800">
                  <strong>Special Notes:</strong> {application.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="logistics">Logistics</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-6">
            {/* Current Week Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-oslo-blue" />
                  This Week's Schedule
                </CardTitle>
                <CardDescription>
                  {format(currentWeek, 'MMMM do')} - {format(addDays(currentWeek, 6), 'MMMM do, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {weekDays.map((day, index) => {
                    const dayKey = day.toLowerCase() as keyof typeof scheduleData;
                    const schedule = scheduleData[dayKey];
                    const isPrimary = schedule.kindergarten === 'primary';
                    
                    return (
                      <div 
                        key={day} 
                        className={`p-4 rounded-lg border-2 ${
                          isPrimary 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'bg-green-50 border-green-200'
                        }`}
                      >
                        <h4 className="font-semibold text-center mb-2">{day}</h4>
                        <div className="text-center">
                          <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                            isPrimary ? 'bg-blue-500' : 'bg-green-500'
                          }`}></div>
                          <p className={`text-sm font-medium ${
                            isPrimary ? 'text-blue-800' : 'text-green-800'
                          }`}>
                            {schedule.location}
                          </p>
                          <p className={`text-xs ${
                            isPrimary ? 'text-blue-600' : 'text-green-600'
                          }`}>
                            {isPrimary ? 'Primary' : 'Secondary'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Primary Kindergarten</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Secondary Kindergarten</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Changes */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule Changes & Requests</CardTitle>
                <CardDescription>
                  Request temporary changes to the dual placement schedule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No schedule change requests at this time</p>
                  <Button variant="outline">
                    Request Schedule Change
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logistics" className="space-y-6">
            {/* Transportation */}
            <Card>
              <CardHeader>
                <CardTitle>Transportation & Pickup</CardTitle>
                <CardDescription>
                  Manage pickup arrangements for both kindergartens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Primary Kindergarten</h4>
                    <p className="font-medium">{application.kindergartenPreference}</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>📍 Address: Frognerveien 12, 0266 Oslo</p>
                      <p>📞 Phone: +47 23 45 67 89</p>
                      <p>🚌 Distance: 0.8 km from home</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Secondary Kindergarten</h4>
                    <p className="font-medium">{application.secondaryKindergartenPreference}</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>📍 Address: Majorstugata 15, 0267 Oslo</p>
                      <p>📞 Phone: +47 23 45 67 90</p>
                      <p>🚌 Distance: 1.2 km from home</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Important Pickup Information</h4>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Ensure authorized pickup persons are registered at both kindergartens</li>
                        <li>• Notify both facilities of any schedule changes in advance</li>
                        <li>• Each kindergarten may have different pickup procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supplies & Belongings */}
            <Card>
              <CardHeader>
                <CardTitle>Supplies & Personal Belongings</CardTitle>
                <CardDescription>
                  Track items needed at each kindergarten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-800">Items at Primary Kindergarten</h4>
                    <div className="space-y-2">
                      {['Spare clothes', 'Indoor shoes', 'Blanket', 'Water bottle'].map((item, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-800">Items at Secondary Kindergarten</h4>
                    <div className="space-y-2">
                      {['Spare clothes', 'Indoor shoes', 'Comfort toy', 'Art supplies'].map((item, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Key contacts for your dual placement arrangement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Primary Kindergarten</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span><strong>Director:</strong> Anna Larsen</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>+47 23 45 67 89</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-gray-500" />
                        <span>anna.larsen@frogner.barnehage.oslo.no</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Secondary Kindergarten</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span><strong>Director:</strong> Erik Hansen</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>+47 23 45 67 90</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-gray-500" />
                        <span>erik.hansen@majorstuen.barnehage.oslo.no</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Case Worker</h4>
                  <div className="space-y-1 text-sm text-purple-700">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span><strong>Erik Johansen</strong> - Dual Placement Specialist</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>+47 21 80 21 80</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>erik.johansen@bfd.oslo.kommune.no</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Dual Placement Documents</CardTitle>
                <CardDescription>
                  Important documents related to your dual placement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Dual Placement Agreement', status: 'signed', date: '2024-06-01' },
                    { name: 'Custody Documentation', status: 'verified', date: '2024-06-01' },
                    { name: 'Transportation Plan', status: 'approved', date: '2024-06-02' },
                    { name: 'Emergency Contact Forms (Both KGs)', status: 'pending', date: 'Not submitted' }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">{doc.name}</span>
                        <p className="text-sm text-gray-500">{doc.date}</p>
                      </div>
                      <Badge variant="outline" className={
                        doc.status === 'signed' || doc.status === 'verified' || doc.status === 'approved'
                          ? 'text-green-600 border-green-300'
                          : 'text-yellow-600 border-yellow-300'
                      }>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    Upload Additional Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DualPlacementManagement;
