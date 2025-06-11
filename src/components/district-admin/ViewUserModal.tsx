
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Download, Printer, Mail, Phone, Shield, Clock, Calendar, MapPin } from 'lucide-react';

interface ViewUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

const ViewUserModal = ({ open, onOpenChange, user }: ViewUserModalProps) => {
  if (!user) return null;

  const handleExport = () => {
    const dataStr = JSON.stringify(user, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${user.name.replace(/\s+/g, '_')}_profile.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const permissions = [
    'Manage Staff',
    'View Reports', 
    'Accept Applications',
    'Daily Attendance',
    'Child Notes',
    'Parent Communication',
    'Review Applications',
    'Placement Management',
    'Generate Reports'
  ];

  const activityLog = [
    { date: '2024-01-15 09:30', action: 'Logged in', details: 'Successful login from 192.168.1.100' },
    { date: '2024-01-15 09:35', action: 'Updated child record', details: 'Modified attendance for Emma Larsen' },
    { date: '2024-01-15 10:15', action: 'Sent message', details: 'Contacted parent about pickup time' },
    { date: '2024-01-14 16:45', action: 'Generated report', details: 'Monthly attendance summary' },
    { date: '2024-01-14 08:30', action: 'Logged in', details: 'Successful login from 192.168.1.100' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              User Details - {user.name}
            </DialogTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-xl">
                  {user.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-900">{user.name}</h3>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </p>
                    {user.phone && (
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {user.phone}
                      </p>
                    )}
                    <p className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {user.role} • {user.authMethod}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Last login: {user.lastLogin}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role and Permissions */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Role & Permissions
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Primary Role</p>
                  <Badge className="text-sm">{user.role}</Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-2">Assigned Kindergartens</p>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(user.kindergartens) ? user.kindergartens.map((kg: string) => (
                      <Badge key={kg} variant="outline" className="text-xs">{kg}</Badge>
                    )) : (
                      <Badge variant="outline" className="text-xs">{user.kindergarten}</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-slate-600 mb-3">Current Permissions</p>
                <div className="grid grid-cols-3 gap-2">
                  {permissions.slice(0, user.role === 'Case Worker' ? 3 : user.role === 'Educator' ? 6 : 9).map((permission) => (
                    <div key={permission} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-800">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Account Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">User ID</p>
                  <p className="font-medium">{user.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Authentication Method</p>
                  <p className="font-medium">{user.authMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Account Created</p>
                  <p className="font-medium">{user.createdAt || '2024-01-01'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Last Password Change</p>
                  <p className="font-medium">2024-01-01</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {activityLog.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <span className="text-xs text-slate-500">{activity.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserModal;
