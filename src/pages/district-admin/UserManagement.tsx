
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import AddUserModal from '@/components/district-admin/AddUserModal';
import EditUserModal from '@/components/district-admin/EditUserModal';
import ViewUserModal from '@/components/district-admin/ViewUserModal';
import RoleManagementPanel from '@/components/district-admin/RoleManagementPanel';
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
  AlertCircle,
  Download,
  Filter,
  MoreHorizontal,
  Trash2,
  UserX
} from 'lucide-react';

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedKindergarten, setSelectedKindergarten] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [users, setUsers] = useState([
    {
      id: 'user-001',
      name: 'Kari Andersen',
      email: 'kari.andersen@oslo.kommune.no',
      phone: '+47 123 45 678',
      role: 'Kindergarten Director',
      kindergarten: 'Sentrum Barnehage',
      kindergartens: ['Sentrum Barnehage'],
      status: 'Active',
      lastLogin: '2024-01-15 09:30',
      permissions: ['Manage Staff', 'View Reports', 'Accept Applications'],
      authMethod: 'Entra ID'
    },
    {
      id: 'user-002',
      name: 'Lars Olsen',
      email: 'lars.olsen@oslo.kommune.no',
      phone: '+47 987 65 432',
      role: 'Educator',
      kindergarten: 'Nordre Barnehage',
      kindergartens: ['Nordre Barnehage'],
      status: 'Active',
      lastLogin: '2024-01-15 08:15',
      permissions: ['Daily Attendance', 'Child Notes', 'Parent Communication'],
      authMethod: 'Entra ID'
    },
    {
      id: 'user-003',
      name: 'Erik Johansen',
      email: 'erik.johansen@oslo.kommune.no',
      phone: '+47 555 12 345',
      role: 'Case Worker',
      kindergarten: 'District Office',
      kindergartens: ['District Office'],
      status: 'Active',
      lastLogin: '2024-01-15 10:45',
      permissions: ['Review Applications', 'Placement Management', 'Generate Reports'],
      authMethod: 'Entra ID'
    },
    {
      id: 'user-004',
      name: 'Silje Nordahl',
      email: 'silje.nordahl@privbarnehage.no',
      phone: '+47 777 88 999',
      role: 'Private Kindergarten Staff',
      kindergarten: 'Private Kids AS',
      kindergartens: ['Private Kids AS'],
      status: 'Inactive',
      lastLogin: '2024-01-10 14:20',
      permissions: ['View Applications', 'Manage Capacity'],
      authMethod: 'Entra ID'
    }
  ]);

  const roleOptions = ['all', 'Kindergarten Director', 'Educator', 'Case Worker', 'Private Kindergarten Staff', 'Administrator'];
  const statusOptions = ['all', 'Active', 'Inactive', 'Suspended'];
  const kindergartenOptions = ['all', 'Sentrum Barnehage', 'Nordre Barnehage', 'Søndre Barnehage', 'Private Kids AS', 'District Office'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.kindergarten.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesKindergarten = selectedKindergarten === 'all' || user.kindergarten === selectedKindergarten;
    return matchesSearch && matchesRole && matchesStatus && matchesKindergarten;
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
      case 'Administrator':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const handleUserAdded = (newUser: any) => {
    setUsers(prev => [...prev, newUser]);
  };

  const handleUserUpdated = (updatedUser: any) => {
    setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleResetPassword = (user: any) => {
    toast({
      title: "Password Reset",
      description: `Password reset email sent to ${user.email}`,
    });
  };

  const handleToggleUserStatus = (user: any) => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    const updatedUser = { ...user, status: newStatus };
    handleUserUpdated(updatedUser);
    
    toast({
      title: "User Status Updated",
      description: `${user.name} is now ${newStatus.toLowerCase()}`,
    });
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No Users Selected",
        description: "Please select users to perform bulk actions.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bulk Action",
      description: `${action} applied to ${selectedUsers.length} user(s)`,
    });
    
    setSelectedUsers([]);
  };

  const handleUserSelect = (userId: string, checked: boolean) => {
    setSelectedUsers(prev => 
      checked 
        ? [...prev, userId]
        : prev.filter(id => id !== userId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedUsers(checked ? filteredUsers.map(user => user.id) : []);
  };

  const exportUsers = () => {
    const dataStr = JSON.stringify(filteredUsers, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'users_export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast({
      title: "Export Complete",
      description: `${filteredUsers.length} users exported successfully.`
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="users" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">User & Role Management</h1>
            <p className="text-slate-600 mt-2">Manage staff accounts, roles and permissions across your district</p>
          </div>
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="users" className="space-y-6">
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

          {/* Filters and Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
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
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role === 'all' ? 'All Roles' : role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status === 'all' ? 'All Status' : status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedKindergarten} onValueChange={setSelectedKindergarten}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Kindergarten" />
                      </SelectTrigger>
                      <SelectContent>
                        {kindergartenOptions.map((kg) => (
                          <SelectItem key={kg} value={kg}>
                            {kg === 'all' ? 'All Kindergartens' : kg}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={exportUsers}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button onClick={() => setShowAddModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedUsers.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {selectedUsers.length} user(s) selected
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('Activate')}>
                      Activate
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('Deactivate')}>
                      Deactivate
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('Reset Password')}>
                      Reset Passwords
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Users List */}
          <div className="space-y-1">
            {/* Header Row */}
            <div className="flex items-center p-4 bg-slate-50 rounded-lg font-medium text-sm text-slate-600">
              <div className="flex items-center gap-3 flex-1">
                <Checkbox
                  checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                  onCheckedChange={handleSelectAll}
                />
                <span>User</span>
              </div>
              <div className="w-32">Role</div>
              <div className="w-24">Status</div>
              <div className="w-40">Last Login</div>
              <div className="w-32">Actions</div>
            </div>

            {/* User Rows */}
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked) => handleUserSelect(user.id, checked as boolean)}
                      />
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-slate-900">{user.name}</h3>
                        </div>
                        <div className="text-sm text-slate-600">
                          <p className="flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </p>
                          <p className="flex items-center gap-2 mt-1">
                            <Shield className="w-3 h-3" />
                            {user.kindergarten}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-32">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                    
                    <div className="w-24">
                      <div className="flex items-center gap-2">
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="w-40 text-sm text-slate-600">
                      {user.lastLogin}
                    </div>
                    
                    <div className="w-32 flex items-center gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleViewUser(user)}>
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleResetPassword(user)}>
                        <RotateCcw className="w-3 h-3" />
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
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <RoleManagementPanel />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddUserModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onUserAdded={handleUserAdded}
      />

      <EditUserModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        user={selectedUser}
        onUserUpdated={handleUserUpdated}
      />

      <ViewUserModal
        open={showViewModal}
        onOpenChange={setShowViewModal}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagement;
