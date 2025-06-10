import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  FileText, 
  UserCheck, 
  Shield, 
  Home, 
  FolderOpen, 
  Users,
  ArrowLeft,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ChildProfile = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  // Mock child data - in real app, this would come from API
  const childData = {
    id: childId,
    name: 'Emma Hansen',
    dateOfBirth: '2021-03-15',
    age: '3 years',
    status: 'placed',
    kindergarten: 'Løvenskiold Kindergarten',
    applicationDate: '2024-01-15',
    placementDate: '2024-08-15',
    primaryAddress: {
      street: 'Pilestredet 42',
      city: 'Oslo',
      postalCode: '0167'
    },
    guardians: [
      {
        name: 'Anna Hansen',
        relationship: 'Mother',
        phone: '+47 123 45 678',
        email: 'anna.hansen@email.com',
        primary: true
      },
      {
        name: 'Erik Hansen', 
        relationship: 'Father',
        phone: '+47 987 65 432',
        email: 'erik.hansen@email.com',
        primary: false
      }
    ],
    attendance: {
      thisWeek: { present: 4, absent: 1 },
      thisMonth: { present: 18, absent: 2 }
    },
    consents: [
      { type: 'Photo/Video', status: 'approved', date: '2024-08-15' },
      { type: 'Medical Treatment', status: 'approved', date: '2024-08-15' },
      { type: 'Field Trips', status: 'pending', date: '2024-08-20' }
    ],
    documents: [
      { name: 'Birth Certificate', type: 'pdf', uploadDate: '2024-01-15' },
      { name: 'Medical Records', type: 'pdf', uploadDate: '2024-01-20' },
      { name: 'Application Form', type: 'pdf', uploadDate: '2024-01-15' }
    ]
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'application', label: 'Application Details', icon: FileText },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'consents', label: 'Consents', icon: Shield },
    { id: 'living', label: 'Living Arrangements', icon: Home },
    { id: 'documents', label: 'Documents', icon: FolderOpen },
    { id: 'contacts', label: 'Contacts', icon: Users }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-oslo-blue to-blue-700 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{childData.name}</h2>
              <p className="text-slate-600">Child Profile Overview</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-slate-600">Date of Birth</p>
              <p className="text-lg font-semibold">{new Date(childData.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Age</p>
              <p className="text-lg font-semibold">{childData.age}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Status</p>
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <CheckCircle className="w-3 h-3 mr-1" />
                Placed
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Kindergarten</p>
              <p className="text-lg font-semibold">{childData.kindergarten}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>This Week Attendance</span>
              <Badge variant="outline">{childData.attendance.thisWeek.present}/5 days</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Pending Consents</span>
              <Badge variant="destructive">1 pending</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Documents</span>
              <Badge variant="outline">{childData.documents.length} files</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Primary Guardian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-oslo-blue/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-oslo-blue" />
                </div>
                <div>
                  <p className="font-semibold">{childData.guardians[0].name}</p>
                  <p className="text-sm text-slate-600">{childData.guardians[0].relationship}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>{childData.guardians[0].phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>{childData.guardians[0].email}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderApplicationDetails = () => (
    <Card>
      <CardHeader>
        <CardTitle>Application Details</CardTitle>
        <CardDescription>Complete application history and placement information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-600">Application Date</p>
              <p className="text-lg">{new Date(childData.applicationDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Placement Date</p>
              <p className="text-lg">{new Date(childData.placementDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Assigned Kindergarten</p>
              <p className="text-lg font-semibold">{childData.kindergarten}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-600">Application Type</p>
              <p className="text-lg">Regular Admission</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Priority Points</p>
              <p className="text-lg">15 points</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Start Date</p>
              <p className="text-lg">August 15, 2024</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-600">This Week</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-2xl font-bold text-green-600">{childData.attendance.thisWeek.present}</div>
                  <span className="text-slate-600">/ 5 days present</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">This Month</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-2xl font-bold text-green-600">{childData.attendance.thisMonth.present}</div>
                  <span className="text-slate-600">/ 20 days present</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-600">Absent This Week</p>
                <div className="text-2xl font-bold text-orange-600">{childData.attendance.thisWeek.absent} day</div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Absent This Month</p>
                <div className="text-2xl font-bold text-orange-600">{childData.attendance.thisMonth.absent} days</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConsents = () => (
    <Card>
      <CardHeader>
        <CardTitle>Consents & Permissions</CardTitle>
        <CardDescription>Manage permissions and consents for your child</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {childData.consents.map((consent, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="font-medium">{consent.type}</p>
                  <p className="text-sm text-slate-600">Submitted: {new Date(consent.date).toLocaleDateString()}</p>
                </div>
              </div>
              <Badge variant={consent.status === 'approved' ? 'default' : 'secondary'}>
                {consent.status === 'approved' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                {consent.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderLivingArrangements = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Living Arrangements</CardTitle>
            <CardDescription>Primary address and custody information</CardDescription>
          </div>
          <Link to="/guardian/living-arrangements">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              View More
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Primary Address</h4>
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <MapPin className="w-5 h-5 text-slate-500 mt-1" />
            <div>
              <p className="font-medium">{childData.primaryAddress.street}</p>
              <p className="text-slate-600">{childData.primaryAddress.postalCode} {childData.primaryAddress.city}</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Guardians</h4>
          <div className="space-y-3">
            {childData.guardians.map((guardian, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="font-medium">{guardian.name}</p>
                    <p className="text-sm text-slate-600">{guardian.relationship}</p>
                  </div>
                </div>
                {guardian.primary && <Badge>Primary</Badge>}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderDocuments = () => (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
        <CardDescription>Important documents and files</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {childData.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FolderOpen className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-slate-600">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderContacts = () => (
    <Card>
      <CardHeader>
        <CardTitle>Contacts</CardTitle>
        <CardDescription>Key contacts and staff members</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Kindergarten Staff</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <User className="w-5 h-5 text-slate-500" />
              <div>
                <p className="font-medium">Maria Johansen</p>
                <p className="text-sm text-slate-600">Lead Teacher</p>
                <p className="text-sm text-slate-600">maria.johansen@lovenskiold.no</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Emergency Contacts</h4>
          <div className="space-y-3">
            {childData.guardians.map((guardian, index) => (
              <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                <User className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="font-medium">{guardian.name}</p>
                  <p className="text-sm text-slate-600">{guardian.relationship}</p>
                  <p className="text-sm text-slate-600">{guardian.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'application': return renderApplicationDetails();
      case 'attendance': return renderAttendance();
      case 'consents': return renderConsents();
      case 'living': return renderLivingArrangements();
      case 'documents': return renderDocuments();
      case 'contacts': return renderContacts();
      default: return renderOverview();
    }
  };

  return (
    <div className="flex gap-6 h-full">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Card className="h-fit">
          <CardHeader className="pb-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/guardian')}
              className="justify-start p-0 h-auto font-normal"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <Separator />
            <CardTitle className="text-lg">Child Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 p-4 pt-0">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default ChildProfile;
