import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Shield, Plus, Edit, Trash2, Save, X, Users } from 'lucide-react';

const RoleManagementPanel = () => {
  const { toast } = useToast();
  const [roles, setRoles] = useState([
    {
      id: 'director',
      name: 'Kindergarten Director',
      description: 'Full administrative access to kindergarten operations',
      permissions: ['manage_staff', 'view_reports', 'accept_applications', 'manage_finances', 'parent_communication'],
      userCount: 8
    },
    {
      id: 'educator',
      name: 'Educator',
      description: 'Daily childcare and educational responsibilities',
      permissions: ['daily_attendance', 'child_notes', 'parent_communication', 'activity_planning'],
      userCount: 45
    },
    {
      id: 'caseworker',
      name: 'Case Worker',
      description: 'Application processing and placement management',
      permissions: ['review_applications', 'placement_management', 'generate_reports', 'family_support'],
      userCount: 12
    }
  ]);

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const availablePermissions = [
    { id: 'manage_staff', label: 'Manage Staff', category: 'Administration' },
    { id: 'view_reports', label: 'View Reports', category: 'Reports' },
    { id: 'accept_applications', label: 'Accept Applications', category: 'Applications' },
    { id: 'manage_finances', label: 'Manage Finances', category: 'Administration' },
    { id: 'parent_communication', label: 'Parent Communication', category: 'Communication' },
    { id: 'daily_attendance', label: 'Daily Attendance', category: 'Operations' },
    { id: 'child_notes', label: 'Child Notes', category: 'Operations' },
    { id: 'activity_planning', label: 'Activity Planning', category: 'Operations' },
    { id: 'review_applications', label: 'Review Applications', category: 'Applications' },
    { id: 'placement_management', label: 'Placement Management', category: 'Applications' },
    { id: 'generate_reports', label: 'Generate Reports', category: 'Reports' },
    { id: 'family_support', label: 'Family Support', category: 'Communication' }
  ];

  const permissionCategories = [...new Set(availablePermissions.map(p => p.category))];

  const handleCreateRole = () => {
    if (!newRole.name.trim()) {
      toast({
        title: "Error",
        description: "Role name is required",
        variant: "destructive"
      });
      return;
    }

    const role = {
      id: newRole.name.toLowerCase().replace(/\s+/g, '_'),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      userCount: 0
    };

    setRoles(prev => [...prev, role]);
    setNewRole({ name: '', description: '', permissions: [] });
    setIsCreateModalOpen(false);

    toast({
      title: "Role Created",
      description: `${newRole.name} role has been created successfully.`
    });
  };

  const handlePermissionToggle = (permissionId: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const deleteRole = (roleId: string) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
    toast({
      title: "Role Deleted",
      description: "Role has been deleted successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Role Management</h2>
          <p className="text-slate-600">Configure roles and permissions for system users</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Create New Role
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role-name">Role Name *</Label>
                  <Input
                    id="role-name"
                    value={newRole.name}
                    onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Assistant Director"
                  />
                </div>
                <div>
                  <Label htmlFor="role-description">Description</Label>
                  <Input
                    id="role-description"
                    value={newRole.description}
                    onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the role"
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold">Permissions</Label>
                <Tabs defaultValue={permissionCategories[0]} className="mt-3">
                  <TabsList className="grid w-full grid-cols-4">
                    {permissionCategories.map((category) => (
                      <TabsTrigger key={category} value={category}>
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {permissionCategories.map((category) => (
                    <TabsContent key={category} value={category} className="mt-4">
                      <div className="grid grid-cols-2 gap-3">
                        {availablePermissions
                          .filter(p => p.category === category)
                          .map((permission) => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={permission.id}
                                checked={newRole.permissions.includes(permission.id)}
                                onCheckedChange={() => handlePermissionToggle(permission.id)}
                              />
                              <Label htmlFor={permission.id} className="text-sm">
                                {permission.label}
                              </Label>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleCreateRole}>
                  <Save className="w-4 h-4 mr-2" />
                  Create Role
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Existing Roles */}
      <div className="grid gap-4">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    {role.name}
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">{role.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900">{role.userCount}</p>
                    <p className="text-xs text-slate-600">Users</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteRole(role.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Permissions:</p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((permissionId) => {
                    const permission = availablePermissions.find(p => p.id === permissionId);
                    return (
                      <Badge key={permissionId} variant="outline" className="text-xs">
                        {permission?.label || permissionId}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleManagementPanel;
