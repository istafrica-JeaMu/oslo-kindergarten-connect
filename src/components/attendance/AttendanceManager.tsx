import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Search, 
  UserCheck, 
  UserX, 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  LogIn,
  LogOut,
  Filter,
  FilterX
} from 'lucide-react';

interface Child {
  id: string;
  name: string;
  age: string;
  department: string;
  guardian: string;
  phone: string;
  status: 'present' | 'absent' | 'checked-out';
  checkInTime?: string;
  checkOutTime?: string;
  expectedPickupTime?: string;
  medicalAlerts: string[];
}

const AttendanceManager = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [children, setChildren] = useState<Child[]>([
    {
      id: '1',
      name: 'Emma Larsen',
      age: '3 years',
      department: 'Sunshine Room',
      guardian: 'Anna Larsen',
      phone: '+47 123 45 678',
      status: 'present',
      checkInTime: '08:30',
      expectedPickupTime: '15:30',
      medicalAlerts: ['Allergy: Nuts']
    },
    {
      id: '2',
      name: 'Oliver Hansen',
      age: '4 years',
      department: 'Rainbow Group',
      guardian: 'Erik Hansen',
      phone: '+47 987 65 432',
      status: 'absent',
      medicalAlerts: []
    },
    {
      id: '3',
      name: 'Maja Andersen',
      age: '2 years',
      department: 'Star Class',
      guardian: 'Ingrid Andersen',
      phone: '+47 555 44 333',
      status: 'checked-out',
      checkInTime: '08:45',
      checkOutTime: '14:15',
      medicalAlerts: ['Diabetes', 'Lactose Intolerant']
    },
    {
      id: '4',
      name: 'Lucas Berg',
      age: '5 years',
      department: 'Adventure Group',
      guardian: 'Maria Berg',
      phone: '+47 777 88 999',
      status: 'present',
      checkInTime: '09:00',
      expectedPickupTime: '16:00',
      medicalAlerts: []
    },
    {
      id: '5',
      name: 'Astrid Holm',
      age: '1 year',
      department: 'Baby Room',
      guardian: 'Per Holm',
      phone: '+47 666 55 444',
      status: 'absent',
      medicalAlerts: ['Food allergies']
    }
  ]);

  const handleCheckIn = (childId: string) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setChildren(prev => prev.map(child => 
      child.id === childId 
        ? { ...child, status: 'present', checkInTime: currentTime, checkOutTime: undefined }
        : child
    ));
  };

  const handleCheckOut = (childId: string) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setChildren(prev => prev.map(child => 
      child.id === childId 
        ? { ...child, status: 'checked-out', checkOutTime: currentTime }
        : child
    ));
  };

  const handleMarkAbsent = (childId: string) => {
    setChildren(prev => prev.map(child => 
      child.id === childId 
        ? { ...child, status: 'absent', checkInTime: undefined, checkOutTime: undefined }
        : child
    ));
  };

  const filteredChildren = children.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         child.guardian.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || child.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || child.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedChildren = filteredChildren.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterDepartment('all');
    setFilterStatus('all');
    setCurrentPage(1);
  };

  const getStatusBadge = (child: Child) => {
    switch (child.status) {
      case 'present':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Present
          </Badge>
        );
      case 'absent':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Absent
          </Badge>
        );
      case 'checked-out':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <LogOut className="w-3 h-3 mr-1" />
            Checked Out
          </Badge>
        );
      default:
        return <Badge variant="outline">{child.status}</Badge>;
    }
  };

  const getActionButtons = (child: Child) => {
    const baseClasses = "h-8 px-3 text-xs";
    
    switch (child.status) {
      case 'absent':
        return (
          <div className="flex gap-1">
            <Button 
              size="sm" 
              onClick={() => handleCheckIn(child.id)}
              className={`${baseClasses} bg-green-600 hover:bg-green-700`}
            >
              <LogIn className="w-3 h-3 mr-1" />
              Check In
            </Button>
          </div>
        );
      case 'present':
        return (
          <div className="flex gap-1">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleCheckOut(child.id)}
              className={`${baseClasses} border-blue-300 text-blue-700 hover:bg-blue-50`}
            >
              <LogOut className="w-3 h-3 mr-1" />
              Check Out
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleMarkAbsent(child.id)}
              className={`${baseClasses} border-red-300 text-red-700 hover:bg-red-50`}
            >
              <UserX className="w-3 h-3 mr-1" />
              Mark Absent
            </Button>
          </div>
        );
      case 'checked-out':
        return (
          <div className="flex gap-1">
            <Button 
              size="sm" 
              onClick={() => handleCheckIn(child.id)}
              className={`${baseClasses} bg-green-600 hover:bg-green-700`}
            >
              <LogIn className="w-3 h-3 mr-1" />
              Check In
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  // Calculate stats
  const stats = {
    present: children.filter(c => c.status === 'present').length,
    absent: children.filter(c => c.status === 'absent').length,
    checkedOut: children.filter(c => c.status === 'checked-out').length,
    total: children.length
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                <p className="text-sm text-gray-600">Present</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                <p className="text-sm text-gray-600">Absent</p>
              </div>
              <UserX className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.checkedOut}</p>
                <p className="text-sm text-gray-600">Checked Out</p>
              </div>
              <LogOut className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
              <Clock className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by child name or guardian..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Select value={filterDepartment} onValueChange={handleFilterChange(setFilterDepartment)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
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

              <Select value={filterStatus} onValueChange={handleFilterChange(setFilterStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="checked-out">Checked Out</SelectItem>
                </SelectContent>
              </Select>

              <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 per page</SelectItem>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
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

      {/* Attendance List */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Attendance Management</CardTitle>
          <CardDescription>
            Manage check-in and check-out for all children • Showing {startIndex + 1}-{Math.min(endIndex, filteredChildren.length)} of {filteredChildren.length} children
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isMobile ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Child</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Guardian</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check-in Time</TableHead>
                  <TableHead>Check-out Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedChildren.map((child) => (
                  <TableRow key={child.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {child.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{child.name}</p>
                          <p className="text-sm text-gray-600">{child.age}</p>
                          {child.medicalAlerts.length > 0 && (
                            <div className="flex items-center gap-1 mt-1">
                              <AlertTriangle className="w-3 h-3 text-red-500" />
                              <span className="text-xs text-red-600">Medical Alert</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{child.department}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{child.guardian}</p>
                        <p className="text-sm text-gray-600">{child.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(child)}</TableCell>
                    <TableCell>
                      {child.checkInTime ? (
                        <span className="text-green-700 font-medium">{child.checkInTime}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {child.checkOutTime ? (
                        <span className="text-blue-700 font-medium">{child.checkOutTime}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getActionButtons(child)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="space-y-4">
              {paginatedChildren.map((child) => (
                <Card key={child.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {child.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{child.name}</p>
                          <p className="text-sm text-gray-600">{child.age} • {child.department}</p>
                          <p className="text-xs text-gray-500">{child.guardian}</p>
                        </div>
                      </div>
                      {getStatusBadge(child)}
                    </div>
                    
                    {child.medicalAlerts.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Medical Alert
                        </Badge>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Check-in:</span> 
                        <span className="ml-1 text-green-700">
                          {child.checkInTime || '-'}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Check-out:</span> 
                        <span className="ml-1 text-blue-700">
                          {child.checkOutTime || '-'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      {getActionButtons(child)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredChildren.length)} of {filteredChildren.length} children
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current page
                    const shouldShow = 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1);
                    
                    if (!shouldShow && page === 2 && currentPage > 4) {
                      return (
                        <PaginationItem key="start-ellipsis">
                          <span className="px-3 py-2">...</span>
                        </PaginationItem>
                      );
                    }
                    
                    if (!shouldShow && page === totalPages - 1 && currentPage < totalPages - 3) {
                      return (
                        <PaginationItem key="end-ellipsis">
                          <span className="px-3 py-2">...</span>
                        </PaginationItem>
                      );
                    }
                    
                    if (!shouldShow) return null;
                    
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceManager;
