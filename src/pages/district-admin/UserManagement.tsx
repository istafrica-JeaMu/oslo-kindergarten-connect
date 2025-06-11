
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Users, 
  Search, 
  Plus, 
  UserCheck, 
  Mail, 
  Shield, 
  Edit, 
  RotateCcw,
  Eye,
  AlertCircle
} from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const users = [
    {
      id: 'user-001',
      name: 'Kari Andersen',
      email: 'kari.andersen@oslo.kommune.no',
      role: 'Kindergarten Director',
      kindergarten: 'Sentrum Barnehage',
      status: 'Active',
      lastLogin: '2024-01-15 09:30',
      permissions: ['Manage Staff', 'View Reports', 'Accept Applications'],
      authMethod: 'Entra ID'
    },
    {
      id: 'user-002',
      name: 'Lars Olsen',
      email: 'lars.olsen@oslo.kommune.no',
      role: 'Educator',
      kindergarten: 'Nordre Barnehage',
      status: 'Active',
      lastLogin: '2024-01-15 08:15',
      permissions: ['Daily Attendance', 'Child Notes', 'Parent Communication'],
      authMethod: 'Entra ID'
    },
    {
      id: 'user-003',
      name: 'Erik Johansen',
      email: 'erik.johansen@oslo.kommune.no',
      role: 'Case Worker',
      kindergarten: 'District Office',
      status: 'Active',
      lastLogin: '2024-01-15 10:45',
      permissions: ['Review Applications', 'Placement Management', 'Generate Reports'],
      authMethod: 'Entra ID'
    },
    {
      id: 'user-004',
      name: 'Silje Nordahl',
      email: 'silje.nordahl@privbarnehage.no',
      role: 'Private Kindergarten Staff',
      kindergarten: 'Private Kids AS',
      status: 'Inactive',
      lastLogin: '2024-01-10 14:20',
      permissions: ['View Applications', 'Manage Capacity'],
      authMethod: 'Entra ID'
    }
  ];

  const roleOptions = ['all', 'Kindergarten Director', 'Educator', 'Case Worker', 'Private Kindergarten Staff'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.kindergarten.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Kindergarten Director':
        return 'bg-blue-100 text-blue-800';
      case 'Educator':
        return 'bg-green-100 text-green-800';
      case 'Case Worker':
        return 'bg-purple-100 text-purple-800';
      case 'Private Kindergarten Staff':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User & Role Management</h1>
          <p className="text-slate-600 mt-2">Manage staff accounts, roles and permissions across your district</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{users.length}</p>
                <p className="text-sm text-slate-600">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{users.filter(u => u.status === 'Active').length}</p>
                <p className="text-sm text-slate-600">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{users.filter(u => u.status === 'Inactive').length}</p>
                <p className="text-sm text-slate-600">Inactive Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{new Set(users.map(u => u.role)).size}</p>
                <p className="text-sm text-slate-600">Unique Roles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search users by name, email, or kindergarten..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {roleOptions.map((role) => (
                <Button 
                  key={role}
                  variant={selectedRole === role ? 'default' : 'outline'} 
                  onClick={() => setSelectedRole(role)}
                  size="sm"
                >
                  {role === 'all' ? 'All Roles' : role}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{user.name}</h3>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        {user.kindergarten} • {user.authMethod}
                      </p>
                      <p>Last login: {user.lastLogin}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium text-slate-700 mb-2">Permissions:</p>
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 mr-4">
                    <span className="text-sm text-slate-600">Active</span>
                    <Switch checked={user.status === 'Active'} />
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No users found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or add a new user.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserManagement;
