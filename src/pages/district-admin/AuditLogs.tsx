
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, Search, Download, Filter, Shield, User, FileText, Settings } from 'lucide-react';

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 14:32:15',
      user: 'Erik Johansen',
      userRole: 'Case Worker',
      action: 'User Login',
      resource: 'Authentication System',
      details: 'Successful login via Entra ID',
      ipAddress: '192.168.1.45',
      severity: 'Info'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:28:03',
      user: 'Kari Andersen',
      userRole: 'Kindergarten Director',
      action: 'Application Reviewed',
      resource: 'Application #APP-2024-0156',
      details: 'Application status changed from Pending to Approved',
      ipAddress: '192.168.1.23',
      severity: 'Info'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:15:22',
      user: 'System Admin',
      userRole: 'District Admin',
      action: 'User Permission Changed',
      resource: 'User: Lars Olsen',
      details: 'Added permission: Manage Capacity',
      ipAddress: '192.168.1.10',
      severity: 'Warning'
    },
    {
      id: 4,
      timestamp: '2024-01-15 13:45:18',
      user: 'Anonymous',
      userRole: 'Unknown',
      action: 'Failed Login Attempt',
      resource: 'Authentication System',
      details: 'Invalid credentials for user: test@oslo.kommune.no',
      ipAddress: '203.45.12.78',
      severity: 'Error'
    },
    {
      id: 5,
      timestamp: '2024-01-15 13:22:41',
      user: 'Erik Johansen',
      userRole: 'Case Worker',
      action: 'Data Export',
      resource: 'Applications Report',
      details: 'Exported 234 application records to CSV',
      ipAddress: '192.168.1.45',
      severity: 'Info'
    },
    {
      id: 6,
      timestamp: '2024-01-15 12:58:07',
      user: 'System',
      userRole: 'System',
      action: 'Policy Updated',
      resource: 'Placement Policy Configuration',
      details: 'Sibling priority distance changed from 1.5km to 2.0km',
      ipAddress: '127.0.0.1',
      severity: 'Warning'
    }
  ];

  const actionTypes = ['all', 'User Login', 'Application Reviewed', 'User Permission Changed', 'Failed Login Attempt', 'Data Export', 'Policy Updated'];
  const users = ['all', ...new Set(auditLogs.map(log => log.user))];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    const matchesUser = selectedUser === 'all' || log.user === selectedUser;
    return matchesSearch && matchesAction && matchesUser;
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Error':
        return <Shield className="w-4 h-4 text-red-600" />;
      case 'Warning':
        return <Shield className="w-4 h-4 text-orange-600" />;
      default:
        return <Shield className="w-4 h-4 text-blue-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      'Error': 'destructive',
      'Warning': 'default',
      'Info': 'secondary'
    } as const;
    return <Badge variant={variants[severity as keyof typeof variants] || 'secondary'}>{severity}</Badge>;
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Login')) return <User className="w-4 h-4" />;
    if (action.includes('Application')) return <FileText className="w-4 h-4" />;
    if (action.includes('Permission') || action.includes('Policy')) return <Settings className="w-4 h-4" />;
    return <Eye className="w-4 h-4" />;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Audit Logs</h1>
          <p className="text-slate-600 mt-2">
            Review system actions and compliance logs
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">1,247</p>
                <p className="text-sm text-slate-600">Total Events Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">1,203</p>
                <p className="text-sm text-slate-600">Info Events</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">37</p>
                <p className="text-sm text-slate-600">Warning Events</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">7</p>
                <p className="text-sm text-slate-600">Error Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search logs by user, action, or resource..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  {actionTypes.map((action) => (
                    <SelectItem key={action} value={action}>
                      {action === 'all' ? 'All Actions' : action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="w-48">
                  <User className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user} value={user}>
                      {user === 'all' ? 'All Users' : user}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {auditLogs.length} events
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-6 border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex items-center gap-2 mt-1">
                      {getSeverityIcon(log.severity)}
                      {getActionIcon(log.action)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-slate-900">{log.action}</h4>
                        {getSeverityBadge(log.severity)}
                        <span className="text-sm text-slate-500">{log.timestamp}</span>
                      </div>
                      <p className="text-sm text-slate-700 mb-1">{log.details}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>User: {log.user} ({log.userRole})</span>
                        <span>Resource: {log.resource}</span>
                        <span>IP: {log.ipAddress}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredLogs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Eye className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No audit logs found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AuditLogs;
