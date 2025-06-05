
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  MessageSquare, 
  AlertTriangle,
  Download,
  Send
} from 'lucide-react';
import { Child } from '@/pages/staff/EducatorAttendance';

interface DailyRecapModalProps {
  children: Child[];
  onClose: () => void;
}

const DailyRecapModal = ({ children, onClose }: DailyRecapModalProps) => {
  const stats = {
    present: children.filter(c => c.status === 'present').length,
    absent: children.filter(c => c.status === 'absent').length,
    onLeave: children.filter(c => c.status === 'on-leave').length,
    total: children.length,
    totalMessages: children.reduce((sum, c) => sum + c.unreadMessages, 0),
    medicalAlerts: children.filter(c => c.medicalAlerts.length > 0).length,
    missingConsents: children.filter(c => c.missingConsents.length > 0).length
  };

  const presentChildren = children.filter(c => c.status === 'present');
  const absentChildren = children.filter(c => c.status === 'absent');
  const onLeaveChildren = children.filter(c => c.status === 'on-leave');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Daily Recap</CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              <p className="text-sm text-green-700">Present</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <UserX className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              <p className="text-sm text-red-700">Absent</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{stats.onLeave}</p>
              <p className="text-sm text-blue-700">On Leave</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Users className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>

          <Separator />

          {/* Detailed Lists */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Present Children */}
            <div>
              <h3 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Present Children ({stats.present})
              </h3>
              <div className="space-y-2">
                {presentChildren.map((child) => (
                  <div key={child.id} className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-sm">{child.name}</p>
                    <p className="text-xs text-green-600">
                      In: {child.checkInTime} • Location: {child.currentLocation}
                    </p>
                    {child.medicalAlerts.length > 0 && (
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 mt-1">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Medical Alert
                      </Badge>
                    )}
                  </div>
                ))}
                {presentChildren.length === 0 && (
                  <p className="text-sm text-gray-500">No children present</p>
                )}
              </div>
            </div>

            {/* Absent Children */}
            <div>
              <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                <UserX className="w-4 h-4" />
                Absent Children ({stats.absent})
              </h3>
              <div className="space-y-2">
                {absentChildren.map((child) => (
                  <div key={child.id} className="p-3 bg-red-50 rounded-lg">
                    <p className="font-medium text-sm">{child.name}</p>
                    <p className="text-xs text-red-600">Not present today</p>
                    {child.unreadMessages > 0 && (
                      <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200 mt-1">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {child.unreadMessages} messages
                      </Badge>
                    )}
                  </div>
                ))}
                {absentChildren.length === 0 && (
                  <p className="text-sm text-gray-500">No absent children</p>
                )}
              </div>
            </div>

            {/* On Leave Children */}
            <div>
              <h3 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                On Leave ({stats.onLeave})
              </h3>
              <div className="space-y-2">
                {onLeaveChildren.map((child) => (
                  <div key={child.id} className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-sm">{child.name}</p>
                    <p className="text-xs text-blue-600">
                      Out: {child.checkOutTime}
                    </p>
                  </div>
                ))}
                {onLeaveChildren.length === 0 && (
                  <p className="text-sm text-gray-500">No children on leave</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Items */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Action Items
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="font-medium text-orange-800 mb-2">
                  Communication Required
                </p>
                <p className="text-sm text-orange-600">
                  {stats.totalMessages} unread messages from guardians
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="font-medium text-yellow-800 mb-2">
                  Missing Consents
                </p>
                <p className="text-sm text-yellow-600">
                  {stats.missingConsents} children have missing consent forms
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <Send className="w-4 h-4 mr-2" />
              Send Summary to Admin
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyRecapModal;
