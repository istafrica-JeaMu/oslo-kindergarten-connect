import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Search, 
  Filter, 
  Users, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  StickyNote,
  DollarSign,
  FileCheck,
  UserCheck,
  AlertTriangle,
  Eye,
  FilterX
} from 'lucide-react';

const ChildrenManagement = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAgeGroup, setFilterAgeGroup] = useState('all');
  const [filterDocumentStatus, setFilterDocumentStatus] = useState('all');
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const getAgeGroup = (age: string) => {
    const ageNum = parseInt(age);
    if (ageNum <= 2) return 'Toddlers (0-2)';
    if (ageNum <= 4) return 'Preschool (3-4)';
    return 'Kindergarten (5+)';
  };

  const children = [
    {
      id: '1',
      name: 'Emma Larsen',
      age: '3 years',
      ageGroup: getAgeGroup('3'),
      department: 'Sunshine Room',
      guardian: 'Anna Larsen',
      phone: '+47 123 45 678',
      status: 'Present',
      address: 'Protected',
      medicalAlerts: ['Allergy: Nuts'],
      documents: { valid: 8, expired: 1, missing: 0 }
    },
    {
      id: '2',
      name: 'Oliver Hansen',
      age: '4 years',
      ageGroup: getAgeGroup('4'),
      department: 'Rainbow Group',
      guardian: 'Erik Hansen',
      phone: '+47 987 65 432',
      status: 'Absent',
      address: 'Storgata 15, 0184 Oslo',
      medicalAlerts: [],
      documents: { valid: 7, expired: 0, missing: 2 }
    },
    {
      id: '3',
      name: 'Maja Andersen',
      age: '2 years',
      ageGroup: getAgeGroup('2'),
      department: 'Star Class',
      guardian: 'Ingrid Andersen',
      phone: '+47 555 44 333',
      status: 'Present',
      address: 'Kirkegata 42, 0153 Oslo',
      medicalAlerts: ['Diabetes', 'Lactose Intolerant'],
      documents: { valid: 9, expired: 0, missing: 0 }
    },
    {
      id: '4',
      name: 'Lucas Berg',
      age: '5 years',
      ageGroup: getAgeGroup('5'),
      department: 'Adventure Group',
      guardian: 'Maria Berg',
      phone: '+47 777 88 999',
      status: 'Present',
      address: 'Holmenkollen 8, 0787 Oslo',
      medicalAlerts: [],
      documents: { valid: 6, expired: 2, missing: 1 }
    },
    {
      id: '5',
      name: 'Astrid Holm',
      age: '1 year',
      ageGroup: getAgeGroup('1'),
      department: 'Baby Room',
      guardian: 'Per Holm',
      phone: '+47 666 55 444',
      status: 'Absent',
      address: 'Grünerløkka 23, 0554 Oslo',
      medicalAlerts: ['Food allergies'],
      documents: { valid: 5, expired: 0, missing: 3 }
    }
  ];

  const filteredChildren = children.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         child.guardian.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || child.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || child.status === filterStatus;
    const matchesAgeGroup = filterAgeGroup === 'all' || child.ageGroup === filterAgeGroup;
    
    let matchesDocumentStatus = true;
    if (filterDocumentStatus === 'complete') {
      matchesDocumentStatus = child.documents.missing === 0 && child.documents.expired === 0;
    } else if (filterDocumentStatus === 'missing') {
      matchesDocumentStatus = child.documents.missing > 0;
    } else if (filterDocumentStatus === 'expired') {
      matchesDocumentStatus = child.documents.expired > 0;
    }
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesAgeGroup && matchesDocumentStatus;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setFilterDepartment('all');
    setFilterStatus('all');
    setFilterAgeGroup('all');
    setFilterDocumentStatus('all');
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'Present' ? 'default' : 'secondary'}>
        {status}
      </Badge>
    );
  };

  const getDocumentStatus = (docs: { valid: number; expired: number; missing: number }) => {
    if (docs.missing > 0) return <Badge variant="destructive">Missing: {docs.missing}</Badge>;
    if (docs.expired > 0) return <Badge variant="outline">Expired: {docs.expired}</Badge>;
    return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
  };

  const getAgeGroupBadge = (ageGroup: string) => {
    const colors = {
      'Toddlers (0-2)': 'bg-pink-100 text-pink-800 border-pink-200',
      'Preschool (3-4)': 'bg-blue-100 text-blue-800 border-blue-200',
      'Kindergarten (5+)': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    
    return (
      <Badge className={colors[ageGroup as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {ageGroup}
      </Badge>
    );
  };

  if (selectedChild) {
    const child = children.find(c => c.id === selectedChild);
    if (!child) return null;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedChild(null)}>
              ← Back to List
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{child.name}</h1>
              <p className="text-slate-600">{child.age} • {child.department}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {getStatusBadge(child.status)}
            {child.medicalAlerts.length > 0 && (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Medical Alert
              </Badge>
            )}
          </div>
        </div>

        {/* Child Detail Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            {user?.role === 'partner' && <TabsTrigger value="billing">Billing</TabsTrigger>}
            {user?.role === 'partner' && <TabsTrigger value="contract">Contract</TabsTrigger>}
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Full Name</label>
                    <p className="text-slate-900">{child.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Age</label>
                    <p className="text-slate-900">{child.age}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Department</label>
                    <p className="text-slate-900">{child.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Address</label>
                    <p className="text-slate-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {child.address}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Guardian Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Primary Guardian</label>
                    <p className="text-slate-900">{child.guardian}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Phone</label>
                    <p className="text-slate-900">{child.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Emergency Contact</label>
                    <p className="text-slate-900">Lars Larsen (+47 111 22 333)</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {child.medicalAlerts.length > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="w-5 h-5" />
                    Medical Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {child.medicalAlerts.map((alert, index) => (
                      <li key={index} className="text-red-700 font-medium">{alert}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Attendance Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Button className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      Mark Present
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      Mark Absent
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">87%</p>
                      <p className="text-sm text-slate-600">This Month</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">18</p>
                      <p className="text-sm text-slate-600">Present Days</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-red-600">3</p>
                      <p className="text-sm text-slate-600">Absent Days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Document Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg bg-green-50">
                      <p className="text-2xl font-bold text-green-600">{child.documents.valid}</p>
                      <p className="text-sm text-slate-600">Valid Documents</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-yellow-50">
                      <p className="text-2xl font-bold text-yellow-600">{child.documents.expired}</p>
                      <p className="text-sm text-slate-600">Expired Documents</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-red-50">
                      <p className="text-2xl font-bold text-red-600">{child.documents.missing}</p>
                      <p className="text-sm text-slate-600">Missing Documents</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Upload New Document</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StickyNote className="w-5 h-5" />
                  Internal Notes
                </CardTitle>
                <CardDescription>
                  Staff-only observations and notes (not visible to guardians)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">Add New Note</Button>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium">Good social interaction today</p>
                        <span className="text-xs text-slate-500">2024-01-15</span>
                      </div>
                      <p className="text-sm text-slate-600">Played well with others during group activity.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {user?.role === 'partner' && (
            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Billing Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Payment Status</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Current Month</span>
                          <Badge className="bg-green-100 text-green-800">Paid</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount</span>
                          <span>€850</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Special Rates</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Sibling Discount</span>
                          <span>10%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Municipal Subsidy</span>
                          <span>€200</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {user?.role === 'partner' && (
            <TabsContent value="contract" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5" />
                    Contract Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Contract Period</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Start Date</span>
                          <span>2024-01-01</span>
                        </div>
                        <div className="flex justify-between">
                          <span>End Date</span>
                          <span>2024-12-31</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Terms</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Notice Period</span>
                          <span>30 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status</span>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Children Management</h1>
          <p className="text-slate-600 mt-2">
            Manage children information, attendance, and documents
          </p>
        </div>
        <Badge variant="outline">
          {filteredChildren.length} of {children.length} children
        </Badge>
      </div>

      {/* Advanced Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by child name or guardian..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filter Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Sunshine Room">Sunshine Room</SelectItem>
                  <SelectItem value="Rainbow Group">Rainbow Group</SelectItem>
                  <SelectItem value="Star Class">Star Class</SelectItem>
                  <SelectItem value="Adventure Group">Adventure Group</SelectItem>
                  <SelectItem value="Baby Room">Baby Room</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterAgeGroup} onValueChange={setFilterAgeGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Age Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Age Groups</SelectItem>
                  <SelectItem value="Toddlers (0-2)">Toddlers (0-2)</SelectItem>
                  <SelectItem value="Preschool (3-4)">Preschool (3-4)</SelectItem>
                  <SelectItem value="Kindergarten (5+)">Kindergarten (5+)</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterDocumentStatus} onValueChange={setFilterDocumentStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Documents" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Documents</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                  <SelectItem value="missing">Missing Docs</SelectItem>
                  <SelectItem value="expired">Expired Docs</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <FilterX className="w-4 h-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Children Table/Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Children List
          </CardTitle>
          <CardDescription>
            Overview of all enrolled children
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          {!isMobile ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Child</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Age Group</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Guardian</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredChildren.map((child) => (
                    <TableRow key={child.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {child.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium">{child.name}</p>
                            {child.medicalAlerts.length > 0 && (
                              <div className="flex items-center gap-1 mt-1">
                                <AlertTriangle className="w-3 h-3 text-red-500" />
                                <span className="text-xs text-red-600">Medical Alert</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{child.age}</TableCell>
                      <TableCell>{getAgeGroupBadge(child.ageGroup)}</TableCell>
                      <TableCell>{child.department}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{child.guardian}</p>
                          <p className="text-sm text-slate-600">{child.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(child.status)}</TableCell>
                      <TableCell>{getDocumentStatus(child.documents)}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedChild(child.id)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            /* Mobile Card View */
            <div className="space-y-4">
              {filteredChildren.map((child) => (
                <Card key={child.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {child.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{child.name}</p>
                          <p className="text-sm text-slate-600">{child.age} • {child.department}</p>
                        </div>
                      </div>
                      {getStatusBadge(child.status)}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getAgeGroupBadge(child.ageGroup)}
                      {child.medicalAlerts.length > 0 && (
                        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Medical
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm"><span className="font-medium">Guardian:</span> {child.guardian}</p>
                      <p className="text-sm"><span className="font-medium">Documents:</span> {getDocumentStatus(child.documents)}</p>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedChild(child.id)}
                      className="w-full flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildrenManagement;
