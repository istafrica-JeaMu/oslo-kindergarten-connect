
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import UserCard from '@/components/district-admin/UserCard';
import UserStatsCards from '@/components/district-admin/UserStatsCards';
import BulkActionBar from '@/components/district-admin/BulkActionBar';
import { 
  Users, 
  Search, 
  Plus, 
  Download,
  Filter,
  AlertTriangle,
  Shield
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
    <div className="space-y-8">
      <Tabs defaultValue="users" className="w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">User & Role Management</h1>
            <p className="text-slate-600 mt-2">Manage staff accounts, roles and permissions across your district</p>
          </div>
          <TabsList className="bg-white shadow-sm border">
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="roles" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <Shield className="w-4 h-4 mr-2" />
              Roles
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="users" className="space-y-8">
          {/* Statistics */}
          <UserStatsCards users={users} />

          {/* Filters and Actions */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        placeholder="Search users by name, email, or kindergarten..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-11 h-11"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-48 h-11">
                        <Filter className="w-4 h-4 mr-2" />
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
                      <SelectTrigger className="w-36 h-11">
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
                      <SelectTrigger className="w-52 h-11">
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
                <div className="flex gap-3">
                  <Button variant="outline" onClick={exportUsers} className="h-11">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button onClick={() => setShowAddModal(true)} className="h-11">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <BulkActionBar
              selectedCount={selectedUsers.length}
              onActivate={() => handleBulkAction('Activate')}
              onDeactivate={() => handleBulkAction('Deactivate')}
              onResetPasswords={() => handleBulkAction('Reset Password')}
              onClearSelection={() => setSelectedUsers([])}
            />
          )}

          {/* Select All */}
          {filteredUsers.length > 0 && (
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                    onCheckedChange={handleSelectAll}
                    id="select-all"
                  />
                  <label htmlFor="select-all" className="text-sm font-medium">
                    Select all {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
                  </label>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Users List */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isSelected={selectedUsers.includes(user.id)}
                onSelect={(checked) => handleUserSelect(user.id, checked)}
                onView={() => handleViewUser(user)}
                onEdit={() => handleEditUser(user)}
                onResetPassword={() => handleResetPassword(user)}
                onToggleStatus={() => handleToggleUserStatus(user)}
              />
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <Card className="shadow-sm">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No users found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your search criteria or add a new user.</p>
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First User
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="roles" className="space-y-8">
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
