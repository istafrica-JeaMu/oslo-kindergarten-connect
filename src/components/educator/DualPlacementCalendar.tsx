
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  MapPin,
  ArrowLeftRight
} from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

interface DualPlacementChild {
  id: string;
  name: string;
  age: number;
  primaryKindergarten: string;
  secondaryKindergarten: string;
  schedule: {
    monday: 'primary' | 'secondary' | 'none';
    tuesday: 'primary' | 'secondary' | 'none';
    wednesday: 'primary' | 'secondary' | 'none';
    thursday: 'primary' | 'secondary' | 'none';
    friday: 'primary' | 'secondary' | 'none';
  };
  attendanceToday?: 'present' | 'absent' | 'at-other-kindergarten' | 'unscheduled';
}

interface DualPlacementCalendarProps {
  kindergartenId: string;
  kindergartenName: string;
}

const DualPlacementCalendar = ({ kindergartenId, kindergartenName }: DualPlacementCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock data for dual placement children
  const dualPlacementChildren: DualPlacementChild[] = [
    {
      id: 'child-001',
      name: 'Erik Svendsen',
      age: 4,
      primaryKindergarten: 'Frogner Barnehage',
      secondaryKindergarten: 'Majorstuen Barnehage',
      schedule: {
        monday: 'primary',
        tuesday: 'primary',
        wednesday: 'secondary',
        thursday: 'secondary',
        friday: 'primary'
      },
      attendanceToday: 'present'
    },
    {
      id: 'child-002',
      name: 'Astrid Larsen',
      age: 3,
      primaryKindergarten: 'Majorstuen Barnehage',
      secondaryKindergarten: 'Sagene Barnehage',
      schedule: {
        monday: 'secondary',
        tuesday: 'primary',
        wednesday: 'primary',
        thursday: 'secondary',
        friday: 'primary'
      },
      attendanceToday: 'at-other-kindergarten'
    }
  ];

  const getDayOfWeek = (date: Date): keyof DualPlacementChild['schedule'] | 'weekend' => {
    const dayIndex = date.getDay();
    const days: (keyof DualPlacementChild['schedule'] | 'weekend')[] = ['weekend', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'weekend'];
    return days[dayIndex];
  };

  const getExpectedChildren = (date: Date) => {
    const dayOfWeek = getDayOfWeek(date);
    if (dayOfWeek === 'weekend') return [];
    
    return dualPlacementChildren.filter(child => {
      const scheduleForDay = child.schedule[dayOfWeek];
      return (kindergartenName === child.primaryKindergarten && scheduleForDay === 'primary') ||
             (kindergartenName === child.secondaryKindergarten && scheduleForDay === 'secondary');
    });
  };

  const getUnexpectedChildren = () => {
    return dualPlacementChildren.filter(child => {
      const dayOfWeek = getDayOfWeek(selectedDate);
      if (dayOfWeek === 'weekend') return false;
      
      const scheduleForDay = child.schedule[dayOfWeek];
      const isExpectedHere = (kindergartenName === child.primaryKindergarten && scheduleForDay === 'primary') ||
                            (kindergartenName === child.secondaryKindergarten && scheduleForDay === 'secondary');
      
      return !isExpectedHere && child.attendanceToday === 'unscheduled';
    });
  };

  const getAttendanceIcon = (status?: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'at-other-kindergarten':
        return <ArrowLeftRight className="h-4 w-4 text-blue-600" />;
      case 'unscheduled':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getAttendanceLabel = (status?: string) => {
    switch (status) {
      case 'present':
        return 'Present';
      case 'absent':
        return 'Absent';
      case 'at-other-kindergarten':
        return 'At Other Kindergarten';
      case 'unscheduled':
        return 'Unscheduled Attendance';
      default:
        return 'Not Logged';
    }
  };

  const expectedChildren = getExpectedChildren(selectedDate);
  const unexpectedChildren = getUnexpectedChildren();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Users className="h-6 w-6 text-oslo-blue" />
            Dual Placement Calendar - {kindergartenName}
          </CardTitle>
          <CardDescription>
            Daily attendance tracking for children with dual kindergarten placements
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Date Selection */}
      <div className="flex items-center gap-4">
        <Card className="flex-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{format(selectedDate, 'EEEE, MMMM do, yyyy')}</h3>
                <p className="text-sm text-gray-600">
                  {expectedChildren.length} dual placement children expected today
                </p>
              </div>
              <Calendar className="h-8 w-8 text-oslo-blue" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expected Children Today */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Expected Children ({expectedChildren.length})
          </CardTitle>
          <CardDescription>
            Children scheduled to attend this kindergarten today
          </CardDescription>
        </CardHeader>
        <CardContent>
          {expectedChildren.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No dual placement children expected today</p>
            </div>
          ) : (
            <div className="space-y-4">
              {expectedChildren.map((child) => (
                <div key={child.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-oslo-blue text-white">
                        {child.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{child.name}</h4>
                      <p className="text-sm text-gray-600">Age {child.age}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <ArrowLeftRight className="h-3 w-3 mr-1" />
                          Dual Placement
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Also attends: {child.primaryKindergarten === kindergartenName ? child.secondaryKindergarten : child.primaryKindergarten}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getAttendanceIcon(child.attendanceToday)}
                      <span className="text-sm font-medium">
                        {getAttendanceLabel(child.attendanceToday)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-300">
                        Present
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                        Absent
                      </Button>
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-300">
                        At Other KG
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Unexpected Attendance Alerts */}
      {unexpectedChildren.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertTriangle className="h-5 w-5" />
              Unscheduled Attendance ({unexpectedChildren.length})
            </CardTitle>
            <CardDescription>
              Children present today who are not scheduled for this kindergarten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unexpectedChildren.map((child) => (
                <div key={child.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-orange-200">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-orange-500 text-white">
                        {child.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{child.name}</h4>
                      <p className="text-sm text-gray-600">
                        Scheduled for: {child.primaryKindergarten === kindergartenName ? child.secondaryKindergarten : child.primaryKindergarten}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-green-600 border-green-300">
                      Accept Emergency
                    </Button>
                    <Button size="sm" variant="outline" className="text-blue-600 border-blue-300">
                      Contact Guardian
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Schedule Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Schedule Overview
          </CardTitle>
          <CardDescription>
            Dual placement children expected this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => {
              const date = addDays(startOfWeek(selectedDate, { weekStartsOn: 1 }), index);
              const expectedForDay = getExpectedChildren(date);
              
              return (
                <div key={day} className="text-center">
                  <h4 className="font-medium text-sm mb-2">{day}</h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-oslo-blue">{expectedForDay.length}</p>
                    <p className="text-xs text-gray-600">children</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DualPlacementCalendar;
