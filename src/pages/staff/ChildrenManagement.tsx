
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
  FilterX,
  Mail,
  MessageSquare,
  Plus
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
      email: 'anna.larsen@email.com',
      status: 'Present',
      address: 'Protected',
      medicalAlerts: ['Allergy: Nuts'],
      documents: { valid: 8, expired: 1, missing: 0 },
      checkInTime: '08:30',
      expectedPickup: '15:30'
    },
    {
      id: '2',
      name: 'Oliver Hansen',
      age: '4 years',
      ageGroup: getAgeGroup('4'),
      department: 'Rainbow Group',
      guardian: 'Erik Hansen',
      phone: '+47 987 65 432',
      email: 'erik.hansen@email.com',
      status: 'Absent',
      address: 'Storgata 15, 0184 Oslo',
      medicalAlerts: [],
      documents: { valid: 7, expired: 0, missing: 2 },
      expectedPickup: '16:00'
    },
    {
      id: '3',
      name: 'Maja Andersen',
      age: '2 years',
      ageGroup: getAgeGroup('2'),
      department: 'Star Class',
      guardian: 'Ingrid Andersen',
      phone: '+47 555 44 333',
      email: 'ingrid.andersen@email.com',
      status: 'Present',
      address: 'Kirkegata 42, 0153 Oslo',
      medicalAlerts: ['Diabetes', 'Lactose Intolerant'],
      documents: { valid: 9, expired: 0, missing: 0 },
      checkInTime: '09:15',
      expectedPickup: '16:00'
    },
    {
      id: '4',
      name: 'Lucas Berg',
      age: '5 years',
      ageGroup: getAgeGroup('5'),
      department: 'Adventure Group',
      guardian: 'Maria Berg',
      phone: '+47 777 88 999',
      email: 'maria.berg@email.com',
      status: 'Present',
      address: 'Holmenkollen 8, 0787 Oslo',
      medicalAlerts: [],
      documents: { valid: 6, expired: 2, missing: 1 },
      checkInTime: '08:45',
      expectedPickup: '17:00'
    },
    {
      id: '5',
      name: 'Astrid Holm',
      age: '1 year',
      ageGroup: getAgeGroup('1'),
      department: 'Baby Room',
      guardian: 'Per Holm',
      phone: '+47 666 55 444',
      email: 'per.holm@email.com',
      status: 'Absent',
      address: 'Grünerløkka 23, 0554 Oslo',
      medicalAlerts: ['Food allergies'],
      documents: { valid: 5, expired: 0, missing: 3 },
      expectedPickup: '15:00'
    }
  ];

  const filteredChildren = children.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         child.guardian.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         child.department.toLowerCase().includes(searchTerm.toLowerCase());
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

  const stats = {
    total: children.length,
    present: children.filter(c => c.status === 'Present').length,
    absent: children.filter(c => c.status === 'Absent').length,
    withAlerts: children.filter(c => c.medicalAlerts.length > 0).length,
    missingConsents: children.filter(c => c.documents.missing > 0).length
  };

  const getStatusBadge = (status: string) => {
    const isPresent = status === 'Present';
    return (
      <Badge 
        variant={isPresent ? 'default' : 'secondary'} 
        className={isPresent ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}
      >
        <div className={`w-2 h-2 rounded-full mr-2 ${isPresent ? 'bg-green-500' : 'bg-gray-400'}`} />
        {status}
      </Badge>
    );
  };

  const getDocumentStatusBadge = (docs: { valid: number; expired: number; missing: number }) => {
    if (docs.missing > 0) {
      return <Badge variant="destructive" className="text-xs">Missing ({docs.missing})</Badge>;
    }
    if (docs.expired > 0) {
      return <Badge variant="outline" className="text-xs border-orange-300 text-orange-700 bg-orange-50">Expired ({docs.expired})</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Complete</Badge>;
  };

  const getAgeGroupColor = (ageGroup: string) => {
    const colors = {
      'Toddlers (0-2)': 'bg-pink-100 text-pink-800 border-pink-200',
      'Preschool (3-4)': 'bg-blue-100 text-blue-800 border-blue-200',
      'Kindergarten (5+)': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[ageGroup as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (selectedChild) {
    const child = children.find(c => c.id === selectedChild);
    if (!child) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSelectedChild(null)} className="px-3">
              ← Back to Children List
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {child.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{child.name}</h1>
                <p className="text-slate-600">{child.age} • {child.department}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(child.status)}
            {child.medicalAlerts.length > 0 && (
              <Badge variant="destructive" className="text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Medical Alert
              </Badge>
            )}
          </div>
        </div>

        {/* Child Detail Content */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile content - simplified for brevity */}
            <Card>
              <CardHeader>
                <CardTitle>Child Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Guardian</label>
                      <p className="text-slate-900">{child.guardian}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Phone</label>
                      <p className="text-slate-900">{child.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Email</label>
                      <p className="text-slate-900">{child.email}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Department</label>
                      <p className="text-slate-900">{child.department}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Age Group</label>
                      <Badge className={getAgeGroupColor(child.ageGroup)}>{child.ageGroup}</Badge>
                    </div>
                    {child.checkInTime && (
                      <div>
                        <label className="text-sm font-medium text-slate-600">Check-in Time</label>
                        <p className="text-slate-900">{child.checkInTime}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Attendance tracking features would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Document Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg bg-green-50">
                    <p className="text-2xl font-bold text-green-600">{child.documents.valid}</p>
                    <p className="text-sm text-slate-600">Valid</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-orange-50">
                    <p className="text-2xl font-bold text-orange-600">{child.documents.expired}</p>
                    <p className="text-sm text-slate-600">Expired</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-red-50">
                    <p className="text-2xl font-bold text-red-600">{child.documents.missing}</p>
                    <p className="text-sm text-slate-600">Missing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Notes & Observations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Notes and observations would be managed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
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
          <p className="text-slate-600 mt-1">Manage children information, attendance, and documents</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">
            {filteredChildren.length} of {children.length} children
          </Badge>
          <Button className="bg-oslo-blue hover:bg-oslo-blue/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Child
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-800">{stats.total}</p>
                <p className="text-sm text-blue-600">Total Children</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-800">{stats.present}</p>
                <p className="text-sm text-green-600">Present Today</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-800">{stats.absent}</p>
                <p className="text-sm text-red-600">Absent Today</p>
              </div>
              <Users className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-800">{stats.withAlerts}</p>
                <p className="text-sm text-orange-600">Medical Alerts</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-800">{stats.missingConsents}</p>
                <p className="text-sm text-purple-600">Missing Docs</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by child name, guardian, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
                  <SelectItem value="all">All Ages</SelectItem>
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
                className="flex items-center gap-2 col-span-2 sm:col-span-1"
              >
                <FilterX className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Children Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Children Overview
          </CardTitle>
          <CardDescription>
            Complete overview of all enrolled children with their current status and information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isMobile ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2">
                    <TableHead className="font-semibold">Child</TableHead>
                    <TableHead className="font-semibold">Age Group</TableHead>
                    <TableHead className="font-semibold">Department</TableHead>
                    <TableHead className="font-semibold">Guardian Contact</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Time</TableHead>
                    <TableHead className="font-semibold">Documents</TableHead>
                    <TableHead className="font-semibold text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredChildren.map((child) => (
                    <TableRow key={child.id} className="hover:bg-slate-50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {child.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{child.name}</p>
                            <p className="text-sm text-slate-500">{child.age}</p>
                            {child.medicalAlerts.length > 0 && (
                              <div className="flex items-center gap-1 mt-1">
                                <AlertTriangle className="w-3 h-3 text-red-500" />
                                <span className="text-xs text-red-600 font-medium">Medical Alert</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getAgeGroupColor(child.ageGroup)} variant="outline">
                          {child.ageGroup}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-slate-700">{child.department}</span>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-slate-900">{child.guardian}</p>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone className="w-3 h-3" />
                            <span>{child.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail className="w-3 h-3" />
                            <span>{child.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(child.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {child.checkInTime && (
                            <div className="flex items-center gap-1 text-green-600">
                              <Calendar className="w-3 h-3" />
                              <span>In: {child.checkInTime}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-slate-600 mt-1">
                            <Calendar className="w-3 h-3" />
                            <span>Pick: {child.expectedPickup}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getDocumentStatusBadge(child.documents)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedChild(child.id)}
                            className="flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="flex items-center gap-1"
                          >
                            <MessageSquare className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            // Mobile Card View
            <div className="space-y-4">
              {filteredChildren.map((child) => (
                <Card key={child.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {child.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{child.name}</p>
                          <p className="text-sm text-slate-600">{child.age} • {child.department}</p>
                        </div>
                      </div>
                      {getStatusBadge(child.status)}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getAgeGroupColor(child.ageGroup)} variant="outline">
                        {child.ageGroup}
                      </Badge>
                      {child.medicalAlerts.length > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Medical
                        </Badge>
                      )}
                      {getDocumentStatusBadge(child.documents)}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm"><span className="font-medium">Guardian:</span> {child.guardian}</p>
                      <p className="text-sm"><span className="font-medium">Phone:</span> {child.phone}</p>
                      {child.checkInTime && (
                        <p className="text-sm"><span className="font-medium">Check-in:</span> {child.checkInTime}</p>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedChild(child.id)}
                        className="flex-1 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </Button>
                    </div>
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
