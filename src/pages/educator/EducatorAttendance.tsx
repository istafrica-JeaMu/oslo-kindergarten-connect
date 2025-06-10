import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MapPin,
  Search,
  LogIn,
  LogOut,
  Filter
} from 'lucide-react';
import ChildListView from '@/components/educator/ChildListView';
import QuickActionButtons from '@/components/educator/QuickActionButtons';

export interface Child {
  id: string;
  name: string;
  age: string;
  department: string;
  guardian: string;
  phone: string;
  status: 'present' | 'absent' | 'on-leave';
  checkInTime?: string;
  checkOutTime?: string;
  expectedPickupTime?: string;
  currentLocation: string;
  medicalAlerts: string[];
  missingConsents: string[];
  unreadMessages: number;
  notes: string[];
  pickupDelegates: string[];
}

const EducatorAttendance = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  const attendanceData: Child[] = [
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
      medicalAlerts: ['Nut allergy'],
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
      missingConsents: ['Photo consent'],
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
      medicalAlerts: ['Asthma'],
      missingConsents: [],
      unreadMessages: 0,
      notes: ['Early pickup for doctor appointment'],
      pickupDelegates: ['Per Andersen (Father)']
    }
  ];

  const filteredChildren = attendanceData.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         child.guardian.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || child.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    present: attendanceData.filter(child => child.status === 'present').length,
    absent: attendanceData.filter(child => child.status === 'absent').length,
    onLeave: attendanceData.filter(child => child.status === 'on-leave').length,
    total: attendanceData.length
  };

  const handleQuickAction = (action: string, childId?: string) => {
    console.log('Quick action:', action, 'for child:', childId);
    // Handle different quick actions
  };

  const handleChildSelect = (child: Child) => {
    setSelectedChild(child);
    console.log('Selected child:', child);
  };

  const handleLocationChange = (childId: string, location: string) => {
    console.log('Location change for', childId, 'to', location);
    // Update child location
  };

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Daily Attendance</h1>
          <p className="text-slate-600 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleBulkAction('check-in-all')} className="bg-green-600 hover:bg-green-700">
            <LogIn className="w-4 h-4 mr-2" />
            Bulk Check In
          </Button>
          <Button onClick={() => handleBulkAction('check-out-all')} className="bg-blue-600 hover:bg-blue-700">
            <LogOut className="w-4 h-4 mr-2" />
            Bulk Check Out
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserCheck className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-green-700">{stats.present}</p>
                <p className="text-sm text-green-600">Present</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserX className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-red-700">{stats.absent}</p>
                <p className="text-sm text-red-600">Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-orange-700">{stats.onLeave}</p>
                <p className="text-sm text-orange-600">On Leave</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
                <p className="text-sm text-blue-600">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Buttons */}
      <QuickActionButtons onAction={handleQuickAction} />

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Children</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
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
      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Attendance ({filteredChildren.length} children)</h2>
        <ChildListView 
          children={filteredChildren}
          onChildSelect={handleChildSelect}
          onQuickAction={handleQuickAction}
          onLocationChange={handleLocationChange}
        />
      </div>
    </div>
  );
};

export default EducatorAttendance;
