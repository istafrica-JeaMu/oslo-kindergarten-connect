
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  MessageSquare, 
  AlertTriangle,
  LogIn,
  LogOut,
  UserX,
  MapPin
} from 'lucide-react';
import { Child } from '@/pages/staff/EducatorAttendance';

interface ChildListViewProps {
  children: Child[];
  onChildSelect: (child: Child) => void;
  onQuickAction: (action: string, childId: string) => void;
  onLocationChange: (childId: string, location: string) => void;
}

const ChildListView = ({ children, onChildSelect, onQuickAction, onLocationChange }: ChildListViewProps) => {
  const locations = [
    'Classroom',
    'Playground',
    'Art Room',
    'Music Room',
    'Nap Room',
    'Dining Area',
    'Library',
    'Outdoor Area'
  ];

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
      case 'on-leave':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            On Leave
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
          <Button 
            size="sm" 
            onClick={() => onQuickAction('check-in', child.id)}
            className={`${baseClasses} bg-green-600 hover:bg-green-700`}
          >
            <LogIn className="w-3 h-3 mr-1" />
            Check In
          </Button>
        );
      case 'present':
        return (
          <div className="flex gap-1">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onQuickAction('check-out', child.id)}
              className={`${baseClasses} border-blue-300 text-blue-700 hover:bg-blue-50`}
            >
              <LogOut className="w-3 h-3 mr-1" />
              Check Out
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onQuickAction('mark-absent', child.id)}
              className={`${baseClasses} border-red-300 text-red-700 hover:bg-red-50`}
            >
              <UserX className="w-3 h-3 mr-1" />
              Absent
            </Button>
          </div>
        );
      case 'on-leave':
        return (
          <Button 
            size="sm" 
            onClick={() => onQuickAction('check-in', child.id)}
            className={`${baseClasses} bg-green-600 hover:bg-green-700`}
          >
            <LogIn className="w-3 h-3 mr-1" />
            Check In
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="space-y-2 p-4">
          {children.map((child) => (
            <Card 
              key={child.id} 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-slate-200"
              onClick={() => onChildSelect(child)}
            >
              <div className="space-y-3">
                {/* Header Row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-lg">{child.name}</p>
                      <p className="text-sm text-gray-600">{child.age} • {child.guardian}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {child.unreadMessages > 0 && (
                      <Badge className="bg-orange-100 text-orange-800">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {child.unreadMessages}
                      </Badge>
                    )}
                    {getStatusBadge(child)}
                  </div>
                </div>

                {/* Alerts Row */}
                {(child.medicalAlerts.length > 0 || child.missingConsents.length > 0) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {child.medicalAlerts.length > 0 && (
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Medical Alert
                      </Badge>
                    )}
                    {child.missingConsents.length > 0 && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                        Missing Consent ({child.missingConsents.length})
                      </Badge>
                    )}
                  </div>
                )}

                {/* Info and Actions Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    {child.status === 'present' && (
                      <>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-500" />
                          <Select 
                            value={child.currentLocation} 
                            onValueChange={(value) => onLocationChange(child.id, value)}
                          >
                            <SelectTrigger className="h-7 w-32 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="text-gray-600">
                          In: {child.checkInTime} • Expected: {child.expectedPickupTime}
                        </div>
                      </>
                    )}
                    {child.status === 'on-leave' && child.checkOutTime && (
                      <div className="text-gray-600">
                        Out: {child.checkOutTime}
                      </div>
                    )}
                  </div>

                  <div onClick={(e) => e.stopPropagation()}>
                    {getActionButtons(child)}
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {children.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No children found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChildListView;
