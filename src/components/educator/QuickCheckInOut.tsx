
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Zap, 
  Search, 
  UserCheck, 
  UserX, 
  CheckCircle, 
  XCircle,
  Users
} from 'lucide-react';
import { Child } from '@/pages/educator/EducatorAttendance';

interface QuickCheckInOutProps {
  children: Child[];
  onQuickAction: (action: string, childId?: string) => void;
}

const QuickCheckInOut = ({ children, onQuickAction }: QuickCheckInOutProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChild = (childId: string, checked: boolean) => {
    if (checked) {
      setSelectedChildren(prev => [...prev, childId]);
    } else {
      setSelectedChildren(prev => prev.filter(id => id !== childId));
    }
  };

  const handleSelectAll = () => {
    if (selectedChildren.length === filteredChildren.length) {
      setSelectedChildren([]);
    } else {
      setSelectedChildren(filteredChildren.map(child => child.id));
    }
  };

  const handleBulkAction = (action: 'mark-present' | 'mark-absent') => {
    selectedChildren.forEach(childId => {
      if (action === 'mark-present') {
        onQuickAction('check-in', childId);
      } else {
        onQuickAction('mark-absent', childId);
      }
    });
    setSelectedChildren([]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
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
      default:
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Bulk Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Check-In/Out
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search children..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Bulk Actions */}
          {selectedChildren.length > 0 && (
            <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-lg">
              <span className="text-sm font-medium">
                {selectedChildren.length} children selected
              </span>
              <div className="flex gap-2 ml-auto">
                <Button 
                  size="sm" 
                  onClick={() => handleBulkAction('mark-present')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <UserCheck className="w-4 h-4 mr-1" />
                  Mark Present ({selectedChildren.length})
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleBulkAction('mark-absent')}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <UserX className="w-4 h-4 mr-1" />
                  Mark Absent ({selectedChildren.length})
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Children Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedChildren.length === filteredChildren.length && filteredChildren.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Child</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Expected Pickup</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChildren.map((child) => (
                <TableRow 
                  key={child.id}
                  className={`${
                    selectedChildren.includes(child.id) 
                      ? 'bg-blue-50 border-l-4 border-l-oslo-blue' 
                      : ''
                  }`}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedChildren.includes(child.id)}
                      onCheckedChange={(checked) => handleSelectChild(child.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {child.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{child.name}</p>
                        <p className="text-sm text-slate-600">{child.guardian}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{child.age}</TableCell>
                  <TableCell>{getStatusBadge(child.status)}</TableCell>
                  <TableCell className="text-sm">
                    {child.checkInTime || '-'}
                  </TableCell>
                  <TableCell className="text-sm">
                    {child.expectedPickupTime || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      {child.status === 'absent' ? (
                        <Button 
                          size="sm" 
                          onClick={() => onQuickAction('check-in', child.id)}
                          className="h-8 px-3 text-xs bg-green-600 hover:bg-green-700"
                        >
                          <UserCheck className="w-3 h-3 mr-1" />
                          Check In
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => onQuickAction('mark-absent', child.id)}
                          className="h-8 px-3 text-xs bg-red-600 hover:bg-red-700"
                        >
                          <UserX className="w-3 h-3 mr-1" />
                          Mark Absent
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredChildren.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No children found</h3>
              <p className="text-slate-600">Try adjusting your search terms</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickCheckInOut;
