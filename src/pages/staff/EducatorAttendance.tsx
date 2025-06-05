
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Search, 
  UserCheck, 
  UserX, 
  Clock,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  LogIn,
  LogOut,
  MapPin,
  Users,
  Undo2,
  Bell,
  Calendar
} from 'lucide-react';
import QuickStatsOverview from '@/components/educator/QuickStatsOverview';
import QuickActionButtons from '@/components/educator/QuickActionButtons';
import ChildListView from '@/components/educator/ChildListView';
import ActionLog from '@/components/educator/ActionLog';
import ChildDetailSheet from '@/components/educator/ChildDetailSheet';
import DailyRecapModal from '@/components/educator/DailyRecapModal';

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
  unreadMessages: number;
  missingConsents: string[];
  notes: string[];
  pickupDelegates: string[];
}

const EducatorAttendance = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [showDailyRecap, setShowDailyRecap] = useState(false);
  const [lastAction, setLastAction] = useState<any>(null);

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
      currentLocation: 'Playground',
      medicalAlerts: ['Allergy: Nuts'],
      unreadMessages: 2,
      missingConsents: [],
      notes: ['Had a great morning', 'Enjoyed painting activity'],
      pickupDelegates: ['Erik Larsen (Father)', 'Ingrid Hansen (Grandmother)']
    },
    {
      id: '2',
      name: 'Oliver Hansen',
      age: '4 years',
      department: 'Rainbow Group',
      guardian: 'Erik Hansen',
      phone: '+47 987 65 432',
      status: 'absent',
      currentLocation: 'N/A',
      medicalAlerts: [],
      unreadMessages: 0,
      missingConsents: ['Outdoor Activity Consent'],
      notes: [],
      pickupDelegates: ['Maria Hansen (Mother)']
    },
    {
      id: '3',
      name: 'Maja Andersen',
      age: '2 years',
      department: 'Star Class',
      guardian: 'Ingrid Andersen',
      phone: '+47 555 44 333',
      status: 'on-leave',
      checkInTime: '08:45',
      checkOutTime: '14:15',
      currentLocation: 'Home',
      medicalAlerts: ['Diabetes', 'Lactose Intolerant'],
      unreadMessages: 1,
      missingConsents: [],
      notes: ['Early pickup for doctor appointment'],
      pickupDelegates: ['Per Andersen (Father)']
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
      currentLocation: 'Art Room',
      medicalAlerts: [],
      unreadMessages: 0,
      missingConsents: ['Photo Consent'],
      notes: ['Excellent participation in group activities'],
      pickupDelegates: ['John Berg (Father)', 'Anna Berg (Aunt)']
    },
    {
      id: '5',
      name: 'Astrid Holm',
      age: '1 year',
      department: 'Baby Room',
      guardian: 'Per Holm',
      phone: '+47 666 55 444',
      status: 'absent',
      currentLocation: 'N/A',
      medicalAlerts: ['Food allergies'],
      unreadMessages: 3,
      missingConsents: ['Medical Information Form'],
      notes: [],
      pickupDelegates: ['Lisa Holm (Mother)']
    }
  ]);

  const handleQuickAction = (action: string, childId?: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    let actionLog = {
      id: Date.now().toString(),
      action,
      childId,
      timestamp,
      educator: user?.name || 'Staff'
    };

    switch (action) {
      case 'bulk-check-in':
        setChildren(prev => prev.map(child => 
          child.status === 'absent' 
            ? { ...child, status: 'present', checkInTime: timestamp, currentLocation: 'Classroom' }
            : child
        ));
        break;
      case 'bulk-check-out':
        setChildren(prev => prev.map(child => 
          child.status === 'present' 
            ? { ...child, status: 'on-leave', checkOutTime: timestamp, currentLocation: 'Home' }
            : child
        ));
        break;
      case 'check-in':
        if (childId) {
          setChildren(prev => prev.map(child => 
            child.id === childId 
              ? { ...child, status: 'present', checkInTime: timestamp, currentLocation: 'Classroom', checkOutTime: undefined }
              : child
          ));
        }
        break;
      case 'check-out':
        if (childId) {
          setChildren(prev => prev.map(child => 
            child.id === childId 
              ? { ...child, status: 'on-leave', checkOutTime: timestamp, currentLocation: 'Home' }
              : child
          ));
        }
        break;
      case 'mark-absent':
        if (childId) {
          setChildren(prev => prev.map(child => 
            child.id === childId 
              ? { ...child, status: 'absent', checkInTime: undefined, checkOutTime: undefined, currentLocation: 'N/A' }
              : child
          ));
        }
        break;
    }

    setLastAction(actionLog);
  };

  const undoLastAction = () => {
    // Simple undo logic - in a real app, this would be more sophisticated
    if (lastAction) {
      // Reset to previous state logic would go here
      setLastAction(null);
    }
  };

  const updateChildLocation = (childId: string, location: string) => {
    setChildren(prev => prev.map(child => 
      child.id === childId 
        ? { ...child, currentLocation: location }
        : child
    ));
  };

  const filteredChildren = children.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         child.guardian.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Daily Attendance
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {lastAction && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={undoLastAction}
              className="text-orange-600 border-orange-300"
            >
              <Undo2 className="w-4 h-4 mr-1" />
              Undo
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowDailyRecap(true)}
          >
            <Calendar className="w-4 h-4 mr-1" />
            Daily Recap
          </Button>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <QuickStatsOverview children={children} />

      {/* Quick Action Buttons */}
      <QuickActionButtons onAction={handleQuickAction} />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search children or guardians..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-lg"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Child List - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <ChildListView 
            children={filteredChildren}
            onChildSelect={setSelectedChild}
            onQuickAction={handleQuickAction}
            onLocationChange={updateChildLocation}
          />
        </div>

        {/* Action Log - Takes up 1 column */}
        <div>
          <ActionLog lastAction={lastAction} />
        </div>
      </div>

      {/* Child Detail Sheet */}
      <Sheet open={!!selectedChild} onOpenChange={() => setSelectedChild(null)}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Child Details</SheetTitle>
            <SheetDescription>
              Quick actions and information
            </SheetDescription>
          </SheetHeader>
          {selectedChild && (
            <ChildDetailSheet 
              child={selectedChild}
              onAction={handleQuickAction}
              onLocationChange={updateChildLocation}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* Daily Recap Modal */}
      {showDailyRecap && (
        <DailyRecapModal 
          children={children}
          onClose={() => setShowDailyRecap(false)}
        />
      )}
    </div>
  );
};

export default EducatorAttendance;
