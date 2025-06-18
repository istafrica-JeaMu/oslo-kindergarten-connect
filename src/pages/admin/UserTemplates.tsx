import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  UserCheck,
  UserMinus,
  Grid3X3,
  Package,
  Plus,
  Search,
  Download,
  Upload,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Settings,
  Users,
  Shield,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react';

// Import the new components
import RoleActionsModal from '@/components/admin/roles/RoleActionsModal';
import CreateLimitedRoleModal from '@/components/admin/roles/CreateLimitedRoleModal';
import ModuleGroupEditModal from '@/components/admin/roles/ModuleGroupEditModal';

// Mock data for demonstration
const mockRoles = [
  { id: 1, name: 'Super Administrator', description: 'Full system access', users: 2, status: 'Active', created: '2024-01-15' },
  { id: 2, name: 'District Manager', description: 'District level management', users: 8, status: 'Active', created: '2024-01-20' },
  { id: 3, name: 'Kindergarten Director', description: 'Kindergarten management', users: 15, status: 'Active', created: '2024-02-01' },
  { id: 4, name: 'Educator', description: 'Daily operations and child care', users: 45, status: 'Active', created: '2024-02-10' },
  { id: 5, name: 'Parent', description: 'Guardian access', users: 230, status: 'Active', created: '2024-02-15' },
];

const mockLimitedRoles = [
  { id: 1, name: 'Temporary Educator', baseRole: 'Educator', restrictions: ['Cannot delete records', 'View only reports'], users: 3 },
  { id: 2, name: 'Intern Administrator', baseRole: 'District Manager', restrictions: ['Cannot modify policies', 'Limited user management'], users: 1 },
  { id: 3, name: 'Substitute Teacher', baseRole: 'Educator', restrictions: ['Cannot access parent communications'], users: 8 },
];

const mockModuleGroups = [
  { id: 1, name: 'User Management', modules: 5, description: 'User and role management modules', status: 'Active' },
  { id: 2, name: 'Child Care Operations', modules: 12, description: 'Daily operations and attendance', status: 'Active' },
  { id: 3, name: 'Financial Management', modules: 8, description: 'Billing and payment processing', status: 'Active' },
  { id: 4, name: 'Reporting & Analytics', modules: 6, description: 'Reports and data analysis', status: 'Active' },
];

const mockModules = [
  { id: 1, name: 'User Registration', group: 'User Management', source: 'Core System', status: 'Active', version: '2.1.0' },
  { id: 2, name: 'Role Assignment', group: 'User Management', source: 'Core System', status: 'Active', version: '2.1.0' },
  { id: 3, name: 'Daily Attendance', group: 'Child Care Operations', source: 'Third Party', status: 'Active', version: '1.8.3' },
  { id: 4, name: 'Parent Communication', group: 'Child Care Operations', source: 'Core System', status: 'Active', version: '2.0.5' },
  { id: 5, name: 'Payment Processing', group: 'Financial Management', source: 'External API', status: 'Active', version: '3.2.1' },
  { id: 6, name: 'Monthly Reports', group: 'Reporting & Analytics', source: 'Core System', status: 'Active', version: '1.9.2' },
  { id: 7, name: 'Backup Management', group: 'User Management', source: 'Core System', status: 'Active', version: '1.5.0' },
  { id: 8, name: 'Security Audit', group: 'User Management', source: 'Third Party', status: 'Active', version: '2.3.1' },
];

const UserTemplates = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isCreateLimitedRoleOpen, setIsCreateLimitedRoleOpen] = useState(false);
  const [isModuleGroupEditOpen, setIsModuleGroupEditOpen] = useState(false);
  const [selectedModuleGroup, setSelectedModuleGroup] = useState(null);
  
  // Role actions modal state
  const [roleActionModal, setRoleActionModal] = useState({
    isOpen: false,
    role: null,
    action: null as 'view' | 'edit' | 'delete' | null
  });

  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleTypeFilter, setRoleTypeFilter] = useState('all');

  // Data states
  const [roles, setRoles] = useState(mockRoles);
  const [limitedRoles, setLimitedRoles] = useState(mockLimitedRoles);
  const [moduleGroups, setModuleGroups] = useState(mockModuleGroups);

  const activeTab = searchParams.get('tab') || 'roles';

  useEffect(() => {
    if (!searchParams.get('tab')) {
      setSearchParams({ tab: 'roles' });
    }
  }, [searchParams, setSearchParams]);

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
    setSearchTerm('');
    setCurrentPage(1);
    setSelectedItems([]);
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'roles': return 'User & Role Templates';
      case 'limited-roles': return 'Limited Roles';
      case 'module-groups': return 'Module Groups';
      case 'modules': return 'Modules';
      default: return 'User & Role Templates';
    }
  };

  const getPageIcon = () => {
    switch (activeTab) {
      case 'roles': return UserCheck;
      case 'limited-roles': return UserMinus;
      case 'module-groups': return Grid3X3;
      case 'modules': return Package;
      default: return UserCheck;
    }
  };

  // Role action handlers
  const handleRoleAction = (role: any, action: 'view' | 'edit' | 'delete') => {
    setRoleActionModal({
      isOpen: true,
      role,
      action
    });
  };

  const handleRoleSave = (updatedRole: any) => {
    setRoles(prev => prev.map(role => 
      role.id === updatedRole.id ? updatedRole : role
    ));
  };

  const handleRoleDelete = (roleId: number) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
  };

  const handleCreateLimitedRole = (newLimitedRole: any) => {
    setLimitedRoles(prev => [...prev, newLimitedRole]);
  };

  const handleModuleGroupEdit = (group: any) => {
    setSelectedModuleGroup(group);
    setIsModuleGroupEditOpen(true);
  };

  const handleModuleGroupSave = (updatedGroup: any, selectedModules: any[]) => {
    setModuleGroups(prev => prev.map(group => 
      group.id === updatedGroup.id ? updatedGroup : group
    ));
  };

  // Filter roles based on search and filters
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || role.status.toLowerCase() === statusFilter;
    const matchesType = roleTypeFilter === 'all' || 
                       (roleTypeFilter === 'admin' && role.name.toLowerCase().includes('admin')) ||
                       (roleTypeFilter === 'user' && !role.name.toLowerCase().includes('admin'));
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const PageIcon = getPageIcon();

  const renderRolesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={roleTypeFilter} onValueChange={setRoleTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          
          <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Roles</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">Select file to import</Label>
                  <Input id="file" type="file" accept=".csv,.xlsx" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsImportOpen(false)}>Cancel</Button>
                  <Button>Import</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roleName">Role Name</Label>
                    <Input id="roleName" placeholder="Enter role name" />
                  </div>
                  <div>
                    <Label htmlFor="roleType">Role Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Role description" />
                </div>
                <div>
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {['User Management', 'Child Care Operations', 'Financial Management', 'Reporting'].map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox id={permission} />
                        <Label htmlFor={permission}>{permission}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>Cancel</Button>
                  <Button>Create Role</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="text-gray-600">{role.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{role.users}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-600">
                      {role.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{role.created}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleRoleAction(role, 'view')}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleRoleAction(role, 'edit')}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleRoleAction(role, 'delete')}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );

  const renderLimitedRolesTab = () => (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockRoles.map((role) => (
                <div key={role.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium">{role.name}</p>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-7">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Limited Roles</CardTitle>
            <Button size="sm" onClick={() => setIsCreateLimitedRoleOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Limited Role
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Base Role</TableHead>
                  <TableHead>Restrictions</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {limitedRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.baseRole}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {role.restrictions.map((restriction, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {restriction}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{role.users}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderModuleGroupsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search module groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
        <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Module Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="groupName">Group Name</Label>
                <Input id="groupName" placeholder="Enter group name" />
              </div>
              <div>
                <Label htmlFor="groupDescription">Description</Label>
                <Textarea id="groupDescription" placeholder="Group description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateGroupOpen(false)}>Cancel</Button>
                <Button>Create Group</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Modules</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moduleGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell className="text-gray-600">{group.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{group.modules} modules</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-600">
                      {group.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleModuleGroupEdit(group)}>
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderModulesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="core">Core System</SelectItem>
              <SelectItem value="third-party">Third Party</SelectItem>
              <SelectItem value="external">External API</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module Name</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockModules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell className="font-medium">{module.name}</TableCell>
                  <TableCell>{module.group}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{module.source}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{module.version}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-600">
                      {module.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <EyeOff className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <PageIcon className="w-8 h-8 text-orange-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{getPageTitle()}</h1>
          <p className="text-slate-600">Manage system-wide user roles and permission templates</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="limited-roles" className="flex items-center gap-2">
            <UserMinus className="w-4 h-4" />
            Limited Roles
          </TabsTrigger>
          <TabsTrigger value="module-groups" className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4" />
            Module Groups
          </TabsTrigger>
          <TabsTrigger value="modules" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Modules
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          {renderRolesTab()}
        </TabsContent>

        <TabsContent value="limited-roles" className="space-y-4">
          {renderLimitedRolesTab()}
        </TabsContent>

        <TabsContent value="module-groups" className="space-y-4">
          {renderModuleGroupsTab()}
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          {renderModulesTab()}
        </TabsContent>
      </Tabs>

      {/* Role Actions Modal */}
      <RoleActionsModal
        role={roleActionModal.role}
        action={roleActionModal.action}
        isOpen={roleActionModal.isOpen}
        onClose={() => setRoleActionModal({ isOpen: false, role: null, action: null })}
        onSave={handleRoleSave}
        onDelete={handleRoleDelete}
      />

      {/* Create Limited Role Modal */}
      <CreateLimitedRoleModal
        isOpen={isCreateLimitedRoleOpen}
        onClose={() => setIsCreateLimitedRoleOpen(false)}
        onSave={handleCreateLimitedRole}
        baseRoles={mockRoles}
      />

      {/* Module Group Edit Modal */}
      <ModuleGroupEditModal
        isOpen={isModuleGroupEditOpen}
        onClose={() => setIsModuleGroupEditOpen(false)}
        group={selectedModuleGroup}
        availableModules={mockModules}
        onSave={handleModuleGroupSave}
      />
    </div>
  );
};

export default UserTemplates;
