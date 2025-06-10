
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Clock,
  Phone,
  Mail,
  MessageSquare,
  AlertTriangle,
  FileText,
  MapPin,
  Calendar,
  Activity
} from 'lucide-react';
import { Child } from './EducatorAttendance';

const EducatorChildren = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  const children: Child[] = [
    {
      id: '1',
      name: 'Emma Larsen',
      age: '4 years',
      department: 'Sunshine Room',
      guardian: 'Anna Larsen',
      phone: '+47 123 45 678',
      status: 'present',
      checkInTime: '08:30',
      expectedPickupTime: '15:30',
      currentLocation: 'Classroom',
      medicalAlerts: ['Nut allergy', 'Requires EpiPen'],
      missingConsents: [],
      unreadMessages: 0,
      notes: ['Had a great morning playing with blocks'],
      pickupDelegates: ['Erik Larsen (Father)', 'Ingrid Hansen (Grandmother)']
    },
    {
      id: '2',
      name: 'Oliver Hansen',
      age: '5 years',
      department: 'Rainbow Group',
      guardian: 'Maria Hansen',
      phone: '+47 987 65 432',
      status: 'absent',
      expectedPickupTime: '16:00',
      currentLocation: '',
      medicalAlerts: [],
      missingConsents: ['Photo consent', 'Field trip consent'],
      unreadMessages: 1,
      notes: [],
      pickupDelegates: ['Erik Hansen (Father)']
    },
    {
      id: '3',
      name: 'Lucas Berg',
      age: '3 years',
      department: 'Star Class',
      guardian: 'Thomas Berg',
      phone: '+47 555 44 333',
      status: 'present',
      checkInTime: '09:00',
      expectedPickupTime: '16:00',
      currentLocation: 'Playground',
      medicalAlerts: [],
      missingConsents: [],
      unreadMessages: 0,
      notes: ['Enjoyed outdoor play activities'],
      pickupDelegates: ['Maria Berg (Mother)', 'Anna Berg (Aunt)']
    },
    {
      id: '4',
      name: 'Maja Andersen',
      age: '4 years',
      department: 'Adventure Group',
      guardian: 'Kari Andersen',
      phone: '+47 777 88 999',
      status: 'on-leave',
      checkOutTime: '12:30',
      expectedPickupTime: '16:30',
      currentLocation: '',
      medicalAlerts: ['Asthma', 'Inhaler required'],
      missingConsents: [],
      unreadMessages: 0,
      notes: ['Early pickup for doctor appointment'],
      pickupDelegates: ['Per Andersen (Father)']
    }
  ];

  const filteredChildren = children.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         child.guardian.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || child.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: children.length,
    present: children.filter(c => c.status === 'present').length,
    absent: children.filter(c => c.status === 'absent').length,
    withAlerts: children.filter(c => c.medicalAlerts.length > 0).length,
    missingConsents: children.filter(c => c.missingConsents.length > 0).length
  };

  const ChildDetailView = ({ child }: { child: Child }) => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {child.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-xl">{child.name}</h3>
            <p className="text-sm text-gray-600">{child.age} • Guardian: {child.guardian}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="consents">Consents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Current Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <Badge className={
                        child.status === 'present' ? 'bg-green-100 text-green-800' :
                        child.status === 'absent' ? 'bg-red-100 text-red-800' :
                        'bg-orange-100 text-orange-800'
                      }>
                        {child.status === 'present' && <UserCheck className="w-3 h-3 mr-1" />}
                        {child.status === 'absent' && <UserX className="w-3 h-3 mr-1" />}
                        {child.status === 'on-leave' && <Clock className="w-3 h-3 mr-1" />}
                        {child.status}
                      </Badge>
                    </div>
                    {child.checkInTime && (
                      <div className="flex items-center justify-between">
                        <span>Check-in:</span>
                        <span className="font-medium">{child.checkInTime}</span>
                      </div>
                    )}
                    {child.currentLocation && (
                      <div className="flex items-center justify-between">
                        <span>Location:</span>
                        <span className="font-medium flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {child.currentLocation}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span>Expected pickup:</span>
                      <span className="font-medium">{child.expectedPickupTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Guardian
                    </Button>
                    <Button className="w-full justify-start" size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Guardian
                    </Button>
                    <Button className="w-full justify-start" size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Attendance History (Last 7 days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...Array(7)].map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const isPresent = Math.random() > 0.2; // 80% attendance rate
                    return (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-sm">{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        <Badge variant={isPresent ? 'default' : 'secondary'} className="text-xs">
                          {isPresent ? 'Present' : 'Absent'}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Medical Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {child.medicalAlerts.length > 0 ? (
                  <div className="space-y-2">
                    {child.medicalAlerts.map((alert, index) => (
                      <Badge key={index} variant="destructive" className="mr-2">
                        {alert}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No medical alerts</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Missing Consents</CardTitle>
              </CardHeader>
              <CardContent>
                {child.missingConsents.length > 0 ? (
                  <div className="space-y-2">
                    {child.missingConsents.map((consent, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-yellow-50 rounded border">
                        <span className="text-sm font-medium">{consent}</span>
                        <Button size="sm" variant="outline">
                          Request
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-green-600">All consents received</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recent Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Today, 10:30</span>
                      <Badge variant="outline" className="text-xs">Behavior</Badge>
                    </div>
                    <p className="text-sm">Played well with others during outdoor time. Showed great sharing skills.</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Yesterday, 14:15</span>
                      <Badge variant="outline" className="text-xs">Learning</Badge>
                    </div>
                    <p className="text-sm">Completed puzzle activity independently. Excellent problem-solving skills.</p>
                  </div>
                </div>
                <Button className="w-full mt-4" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Add New Note
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Children Management</h1>
          <p className="text-slate-600 mt-1">View and manage all children in your care</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Children</p>
              </div>
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-green-600">{stats.present}</p>
                <p className="text-sm text-gray-600">Present</p>
              </div>
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-red-600">{stats.absent}</p>
                <p className="text-sm text-gray-600">Absent</p>
              </div>
              <UserX className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-orange-600">{stats.withAlerts}</p>
                <p className="text-sm text-gray-600">Med Alerts</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-purple-600">{stats.missingConsents}</p>
                <p className="text-sm text-gray-600">Missing Consent</p>
              </div>
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Find Children</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by child or guardian name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Children</SelectItem>
                <SelectItem value="present">Present Only</SelectItem>
                <SelectItem value="absent">Absent Only</SelectItem>
                <SelectItem value="on-leave">On Leave Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Children List */}
      <Card>
        <CardHeader>
          <CardTitle>Children List ({filteredChildren.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredChildren.map((child) => (
              <div key={child.id}>
                <div 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedChild(selectedChild?.id === child.id ? null : child)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold">{child.name}</h3>
                      <p className="text-sm text-gray-600">{child.age} • {child.guardian}</p>
                      {child.currentLocation && (
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {child.currentLocation}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {child.medicalAlerts.length > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Medical Alert
                      </Badge>
                    )}
                    {child.missingConsents.length > 0 && (
                      <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                        Missing Consent ({child.missingConsents.length})
                      </Badge>
                    )}
                    {child.unreadMessages > 0 && (
                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {child.unreadMessages}
                      </Badge>
                    )}
                    <Badge className={
                      child.status === 'present' ? 'bg-green-100 text-green-800' :
                      child.status === 'absent' ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'
                    }>
                      {child.status}
                    </Badge>
                  </div>
                </div>
                {selectedChild?.id === child.id && (
                  <ChildDetailView child={child} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducatorChildren;
