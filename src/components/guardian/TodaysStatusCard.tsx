
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Bell } from 'lucide-react';

const TodaysStatusCard = () => {
  // Mock data for demonstration
  const todayStatus = {
    attendance: 'checked-in',
    checkedInAt: '08:15',
    nextActivity: 'Outdoor Play',
    nextActivityTime: '10:30',
    pickupTime: '15:30',
    urgentNotifications: 1,
    childName: 'Oliver'
  };

  const getAttendanceStatus = () => {
    switch (todayStatus.attendance) {
      case 'checked-in':
        return (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-oslo-green" />
            <span className="text-oslo-green font-semibold">Checked In</span>
            <span className="text-slate-600 text-sm">at {todayStatus.checkedInAt}</span>
          </div>
        );
      case 'not-arrived':
        return (
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-600 font-semibold">Not Arrived</span>
          </div>
        );
      case 'absent':
        return (
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-slate-500" />
            <span className="text-slate-500 font-semibold">Absent</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-oslo-blue/5 to-oslo-green/5" />
      <CardHeader className="relative pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-oslo-blue/10 to-oslo-blue/20 rounded-xl flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-oslo-blue" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Today's Status</h3>
            <p className="text-sm text-slate-600 font-normal mt-0.5">{todayStatus.childName}'s current status</p>
          </div>
          {todayStatus.urgentNotifications > 0 && (
            <Badge className="ml-auto bg-red-500 text-white animate-pulse">
              <Bell className="w-3 h-3 mr-1" />
              {todayStatus.urgentNotifications}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-4">
        {/* Attendance Status */}
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800">Attendance</h4>
          {getAttendanceStatus()}
        </div>

        {/* Next Activity */}
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800">Coming Up</h4>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">{todayStatus.nextActivity}</p>
              <p className="text-sm text-slate-600">Starting at {todayStatus.nextActivityTime}</p>
            </div>
            <Clock className="w-5 h-5 text-slate-400" />
          </div>
        </div>

        {/* Pickup Time */}
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800">Pickup</h4>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-oslo-blue" />
            <span className="text-oslo-blue font-semibold">{todayStatus.pickupTime}</span>
            <span className="text-slate-600 text-sm">Regular pickup time</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysStatusCard;
