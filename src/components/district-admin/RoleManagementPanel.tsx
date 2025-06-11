import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Shield, Plus, Edit, Trash2, Save, X, Users, AlertTriangle } from 'lucide-react';
import PermissionMatrix from './PermissionMatrix';

const RoleManagementPanel = () => {
  const { toast } = useToast();
  const [roles, setRoles] = useState([
    {
      id: 'director',
      name: 'Kindergarten Director',
      description: 'Full administrative access to kindergarten operations',
      permissions: ['manage_staff', 'view_reports', 'accept_applications', 'manage_finances', 'parent_communication'],
      userCount: 8,
      isSystem: true
    },
    {
      id: 'educator',
      name: 'Educator',
      description: 'Daily childcare and educational responsibilities',
      permissions: ['daily_attendance', 'child_notes', 'parent_communication', 'activity_planning'],
      userCount: 45,
      isSystem: true
    },
    {
      id: 'caseworker',
      name: 'Case Worker',
      description: 'Application processing and placement management',
      permissions: ['review_applications', 'placement_management', 'generate_reports', 'family_support'],
      userCount: 12,
      isSystem: true
    }
  ]);

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const [editingRole, setEditingRole] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      userCount: 0,
      isSystem: false
    };

    setRoles(prev => [...prev, role]);
    setNewRole({ name: '', description: '', permissions: [] });
    setIsCreateModalOpen(false);

    toast({
      title: "Role Created",
      description: `${newRole.name} role has been created successfully.`
    });
  };

  const handleEditRole = (role: any) => {
    setEditingRole({ ...role });
    setIsEditModalOpen(true);
  };

  const handleUpdateRole = () => {
    setRoles(prev => prev.map(role => 
      role.id === editingRole.id ? editingRole : role
    ));
    setIsEditModalOpen(false);
    setEditingRole(null);

    toast({
      title: "Role Updated",
      description: `${editingRole.name} has been updated successfully.`
    });
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
    toast({
      title: "Role Deleted",
      description: "Role has been deleted successfully."
    });
  };

  const getRoleColor = (role: any) => {
    if (role.isSystem) {
      return 'bg-blue-50 border-blue-200';
    }
    return 'bg-slate-50 border-slate-200';
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
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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

              <PermissionMatrix
                rolePermissions={newRole.permissions}
                onPermissionChange={(permissions) => setNewRole(prev => ({ ...prev, permissions }))}
              />

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleCreateRole} disabled={!newRole.name.trim()}>
                  <Save className="w-4 h-4 mr-2" />
                  Create Role
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Existing Roles */}
      <div className="grid gap-6">
        {roles.map((role) => (
          <Card key={role.id} className={`${getRoleColor(role)} transition-all duration-200 hover:shadow-md`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-slate-600" />
                    <CardTitle className="text-xl">{role.name}</CardTitle>
                    {role.isSystem && (
                      <Badge variant="outline" className="text-xs">
                        System Role
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{role.description}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-500" />
                      <span className="text-2xl font-bold text-slate-900">{role.userCount}</span>
                    </div>
                    <p className="text-xs text-slate-600">Users</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditRole(role)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    {!role.isSystem && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                              <AlertTriangle className="w-5 h-5 text-red-500" />
                              Delete Role
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the "{role.name}" role? This action cannot be undone.
                              {role.userCount > 0 && (
                                <span className="block mt-2 text-red-600 font-medium">
                                  Warning: {role.userCount} user(s) are currently assigned to this role.
                                </span>
                              )}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteRole(role.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete Role
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">
                  Permissions ({role.permissions.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.slice(0, 6).map((permissionId) => (
                    <Badge key={permissionId} variant="outline" className="text-xs">
                      {permissionId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))}
                  {role.permissions.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{role.permissions.length - 6} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Role Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Role - {editingRole?.name}
            </DialogTitle>
          </DialogHeader>
          
          {editingRole && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-role-name">Role Name *</Label>
                  <Input
                    id="edit-role-name"
                    value={editingRole.name}
                    onChange={(e) => setEditingRole(prev => ({ ...prev, name: e.target.value }))}
                    disabled={editingRole.isSystem}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-role-description">Description</Label>
                  <Input
                    id="edit-role-description"
                    value={editingRole.description}
                    onChange={(e) => setEditingRole(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>

              <PermissionMatrix
                rolePermissions={editingRole.permissions}
                onPermissionChange={(permissions) => setEditingRole(prev => ({ ...prev, permissions }))}
                readOnly={editingRole.isSystem}
              />

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleUpdateRole} disabled={!editingRole.name.trim()}>
                  <Save className="w-4 h-4 mr-2" />
                  Update Role
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagementPanel;
