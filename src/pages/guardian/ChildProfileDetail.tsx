
import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, User, FileText, Calendar, CheckCircle, Home as HomeIcon, FileCheck, Users, MapPin, Phone, Mail, Clock, ExternalLink, Eye, Download, Edit } from 'lucide-react';

const ChildProfileDetail = () => {
  const { childId } = useParams();
  const location = useLocation();
  
  // Get current tab from URL
  const currentPath = location.pathname;
  const getCurrentTab = () => {
    if (currentPath.includes('/application-details')) return 'application-details';
    if (currentPath.includes('/attendance')) return 'attendance';
    if (currentPath.includes('/consents')) return 'consents';
    if (currentPath.includes('/living-arrangements')) return 'living-arrangements';
    if (currentPath.includes('/documents')) return 'documents';
    if (currentPath.includes('/contacts')) return 'contacts';
    return 'overview';
  };

  // Mock child data
  const child = {
    id: childId,
    name: childId === 'emma' ? 'Emma Hansen' : 'Lucas Hansen',
    age: childId === 'emma' ? 4 : 3,
    group: childId === 'emma' ? 'Blue Group' : 'Red Group',
    status: 'Active',
    avatar: '',
    kindergarten: 'Rainbow Kindergarten',
    birthDate: childId === 'emma' ? '2020-03-15' : '2021-07-22',
    startDate: childId === 'emma' ? '2023-08-15' : '2024-01-10',
    applicationNumber: childId === 'emma' ? 'APP-2023-001234' : 'APP-2024-005678'
  };

  const navigationItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: User,
      path: `/guardian/child-profile/${childId}`
    },
    {
      id: 'application-details', 
      label: 'Application Details',
      icon: FileText,
      path: `/guardian/child-profile/${childId}/application-details`
    },
    {
      id: 'attendance',
      label: 'Attendance', 
      icon: Calendar,
      path: `/guardian/child-profile/${childId}/attendance`
    },
    {
      id: 'consents',
      label: 'Consents',
      icon: CheckCircle,
      path: `/guardian/child-profile/${childId}/consents`
    },
    {
      id: 'living-arrangements',
      label: 'Living Arrangements', 
      icon: HomeIcon,
      path: `/guardian/child-profile/${childId}/living-arrangements`
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileCheck,
      path: `/guardian/child-profile/${childId}/documents`
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: Users,
      path: `/guardian/child-profile/${childId}/contacts`
    }
  ];

  const renderOverviewContent = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Child's basic details and kindergarten information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <p className="text-sm text-gray-900">{child.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Age</label>
                <p className="text-sm text-gray-900">{child.age} years old</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Birth Date</label>
                <p className="text-sm text-gray-900">{child.birthDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Start Date</label>
                <p className="text-sm text-gray-900">{child.startDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Group</label>
                <p className="text-sm text-gray-900">{child.group}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Badge variant="secondary">{child.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Recent activity and attendance summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Attendance This Month</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Documents Completed</span>
                <span>7/8</span>
              </div>
              <Progress value={87.5} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Consents Signed</span>
                <span>3/4</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Living Arrangements Summary</CardTitle>
          <CardDescription>Primary address and guardian information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Primary Address</label>
              <p className="text-sm text-gray-900 mt-1">Pilestredet 42, 0167 Oslo</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Primary Guardians</label>
              <div className="space-y-2 mt-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">Anna Hansen (Mother)</span>
                  <Badge variant="outline">Primary</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">Erik Hansen (Father)</span>
                  <Badge variant="outline">Secondary</Badge>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <Button variant="outline" asChild>
            <Link to="/living-arrangements">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Complete Living Arrangements
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderApplicationDetailsContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Information</CardTitle>
          <CardDescription>Details about the kindergarten application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Application Number</label>
              <p className="text-sm text-gray-900">{child.applicationNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Application Date</label>
              <p className="text-sm text-gray-900">2023-06-15</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Desired Start Date</label>
              <p className="text-sm text-gray-900">{child.startDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Application Status</label>
              <Badge className="bg-green-100 text-green-700">Approved & Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences & Requirements</CardTitle>
          <CardDescription>Selected preferences during application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Preferred Kindergarten</label>
            <p className="text-sm text-gray-900">Rainbow Kindergarten (1st choice)</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Special Requirements</label>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline">Allergy - Nuts</Badge>
              <Badge variant="outline">Dietary - Vegetarian</Badge>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Priority Points</label>
            <p className="text-sm text-gray-900">15 points (Sibling bonus: 5, Distance: 10)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAttendanceContent = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">4/5</div>
            <p className="text-sm text-gray-600">Days attended</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">17/20</div>
            <p className="text-sm text-gray-600">Days attended</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Average Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">7.5h</div>
            <p className="text-sm text-gray-600">Per day</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
          <CardDescription>Last 7 days attendance record</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2024-03-18', status: 'Present', checkIn: '08:15', checkOut: '15:30', hours: '7h 15m' },
              { date: '2024-03-17', status: 'Present', checkIn: '08:20', checkOut: '15:45', hours: '7h 25m' },
              { date: '2024-03-16', status: 'Absent', checkIn: '-', checkOut: '-', hours: '-' },
              { date: '2024-03-15', status: 'Present', checkIn: '08:10', checkOut: '16:00', hours: '7h 50m' },
              { date: '2024-03-14', status: 'Present', checkIn: '08:25', checkOut: '15:30', hours: '7h 5m' },
            ].map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium">{record.date}</div>
                  <Badge variant={record.status === 'Present' ? 'default' : 'secondary'}>
                    {record.status}
                  </Badge>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>In: {record.checkIn}</span>
                  <span>Out: {record.checkOut}</span>
                  <span>Hours: {record.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConsentsContent = () => (
    <div className="space-y-6">
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Action Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700 mb-4">1 consent form requires your signature</p>
          <Button className="bg-yellow-600 hover:bg-yellow-700">Complete Pending Consents</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Consent Forms</CardTitle>
          <CardDescription>All consent forms and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: 'Photo Permission', status: 'Signed', date: '2023-08-15', expires: '2024-08-15', icon: '📸' },
              { type: 'Medical Treatment', status: 'Signed', date: '2023-08-15', expires: '2025-08-15', icon: '🏥' },
              { type: 'Field Trip Authorization', status: 'Expires Soon', date: '2023-08-15', expires: '2024-04-01', icon: '🚌' },
              { type: 'Data Processing Consent', status: 'Pending', date: null, expires: null, icon: '📋' },
            ].map((consent, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{consent.icon}</div>
                  <div>
                    <h3 className="font-medium">{consent.type}</h3>
                    {consent.date && (
                      <p className="text-sm text-gray-600">
                        Signed: {consent.date} • Expires: {consent.expires}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={consent.status === 'Signed' ? 'default' : 
                            consent.status === 'Expires Soon' ? 'destructive' : 'secondary'}
                  >
                    {consent.status}
                  </Badge>
                  <div className="flex gap-1">
                    {consent.status === 'Pending' ? (
                      <Button size="sm">Sign</Button>
                    ) : (
                      <>
                        <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLivingArrangementsContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Primary Residence</CardTitle>
          <CardDescription>Main living arrangement details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Address</label>
              <p className="text-sm text-gray-900">Pilestredet 42, 0167 Oslo</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Custody Arrangement</label>
              <p className="text-sm text-gray-900">Joint custody</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Primary Guardian</label>
              <p className="text-sm text-gray-900">Anna Hansen (Mother)</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
              <p className="text-sm text-gray-900">Erik Hansen (Father)</p>
            </div>
          </div>
          <Separator className="my-4" />
          <Button asChild>
            <Link to="/living-arrangements">
              <ExternalLink className="h-4 w-4 mr-2" />
              View More Details
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alternative Arrangements</CardTitle>
          <CardDescription>Other custody and living arrangements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Weekend Custody</h3>
                <Badge variant="outline">Every other weekend</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-gray-700">Guardian</label>
                  <p className="text-gray-900">Erik Hansen (Father)</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Address</label>
                  <p className="text-gray-900">Storgata 15, 0155 Oslo</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDocumentsContent = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-gray-600">Available documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-gray-600">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-sm text-gray-600">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Categories</CardTitle>
          <CardDescription>Organized by document type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { category: 'Medical Records', count: 6, color: 'bg-blue-100 text-blue-700' },
              { category: 'Educational Reports', count: 8, color: 'bg-green-100 text-green-700' },
              { category: 'Legal Documents', count: 4, color: 'bg-purple-100 text-purple-700' },
              { category: 'Photos & Activities', count: 6, color: 'bg-orange-100 text-orange-700' },
            ].map((cat, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{cat.category}</span>
                </div>
                <Badge className={cat.color}>{cat.count} files</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>Latest uploads and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Development Report - March 2024', type: 'PDF', date: '2024-03-15', size: '2.1 MB' },
              { name: 'Health Certificate', type: 'PDF', date: '2024-03-10', size: '890 KB' },
              { name: 'Activity Photos - Week 11', type: 'ZIP', date: '2024-03-08', size: '15.2 MB' },
              { name: 'Vaccination Record Update', type: 'PDF', date: '2024-03-05', size: '645 KB' },
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-gray-600">{doc.type} • {doc.size} • {doc.date}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContactsContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Primary Contacts</CardTitle>
          <CardDescription>Main guardians and emergency contacts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: 'Anna Hansen',
                role: 'Mother (Primary Guardian)',
                phone: '+47 123 45 678',
                email: 'anna.hansen@email.com',
                relationship: 'Mother',
                canPickup: true
              },
              {
                name: 'Erik Hansen',
                role: 'Father (Secondary Guardian)',
                phone: '+47 987 65 432',
                email: 'erik.hansen@email.com',
                relationship: 'Father',
                canPickup: true
              }
            ].map((contact, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.role}</p>
                  </div>
                  <Badge variant="outline">Primary</Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{contact.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <span className="text-gray-600">Pickup authorized:</span>
                  <Badge variant={contact.canPickup ? 'default' : 'secondary'}>
                    {contact.canPickup ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
          <CardDescription>Additional emergency contact persons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: 'Grandma Astrid',
                phone: '+47 456 78 901',
                relationship: 'Grandmother',
                canPickup: true
              },
              {
                name: 'Uncle Lars',
                phone: '+47 234 56 789',
                relationship: 'Uncle',
                canPickup: false
              }
            ].map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{contact.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Pickup:</span>
                  <Badge variant={contact.canPickup ? 'default' : 'secondary'}>
                    {contact.canPickup ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kindergarten Staff</CardTitle>
          <CardDescription>Primary educators and support staff</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Maria Eriksen', role: 'Lead Educator - Blue Group', phone: '+47 555 12 34' },
              { name: 'Thomas Berg', role: 'Assistant Educator', phone: '+47 555 56 78' },
              { name: 'Lisa Andersen', role: 'Kindergarten Manager', phone: '+47 555 90 12' }
            ].map((staff, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{staff.name}</h4>
                  <p className="text-sm text-gray-600">{staff.role}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{staff.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    const currentTab = getCurrentTab();
    
    switch (currentTab) {
      case 'overview':
        return renderOverviewContent();
      case 'application-details':
        return renderApplicationDetailsContent();
      case 'attendance':
        return renderAttendanceContent();
      case 'consents':
        return renderConsentsContent();
      case 'living-arrangements':
        return renderLivingArrangementsContent();
      case 'documents':
        return renderDocumentsContent();
      case 'contacts':
        return renderContactsContent();
      default:
        return renderOverviewContent();
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center space-x-2">
        <Link to="/guardian/children" className="flex items-center space-x-2 text-oslo-blue hover:text-oslo-blue/80">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Children</span>
        </Link>
      </div>

      {/* Child Header */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={child.avatar} alt={child.name} />
            <AvatarFallback className="bg-oslo-blue text-white text-xl">
              {child.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold">{child.name}</h1>
            <p className="text-gray-600">{child.group} • Age {child.age}</p>
            <Badge className="mt-1">{child.status}</Badge>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Child Profile</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = getCurrentTab() === item.id;
                  
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-oslo-blue text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ChildProfileDetail;
