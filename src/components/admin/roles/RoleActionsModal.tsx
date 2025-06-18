
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, X } from 'lucide-react';

interface Role {
  id: number;
  name: string;
  description: string;
  users: number;
  status: string;
  created: string;
}

interface RoleActionsModalProps {
  role: Role | null;
  action: 'view' | 'edit' | 'delete' | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (role: Role) => void;
  onDelete?: (roleId: number) => void;
}

const RoleActionsModal = ({ role, action, isOpen, onClose, onSave, onDelete }: RoleActionsModalProps) => {
  const [editedRole, setEditedRole] = useState<Role | null>(role);
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    setEditedRole(role);
    setIsEditing(action === 'edit');
  }, [role, action]);

  const handleSave = () => {
    if (editedRole && onSave) {
      onSave(editedRole);
      onClose();
    }
  };

  const handleDelete = () => {
    if (role && onDelete) {
      onDelete(role.id);
      onClose();
    }
  };

  if (!role) return null;

  const getTitle = () => {
    switch (action) {
      case 'view': return 'View Role';
      case 'edit': return 'Edit Role';
      case 'delete': return 'Delete Role';
      default: return 'Role Details';
    }
  };

  const getIcon = () => {
    switch (action) {
      case 'view': return <Eye className="w-5 h-5" />;
      case 'edit': return <Edit className="w-5 h-5" />;
      case 'delete': return <Trash2 className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {getTitle()}
          </DialogTitle>
        </DialogHeader>
        
        {action === 'delete' ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete the role "<strong>{role.name}</strong>"? 
              This action cannot be undone and will affect {role.users} user(s).
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>Delete Role</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roleName">Role Name</Label>
                <Input
                  id="roleName"
                  value={editedRole?.name || ''}
                  onChange={(e) => setEditedRole(prev => prev ? {...prev, name: e.target.value} : null)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="roleStatus">Status</Label>
                <div className="mt-2">
                  <Badge variant="outline" className="text-green-600">
                    {editedRole?.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editedRole?.description || ''}
                onChange={(e) => setEditedRole(prev => prev ? {...prev, description: e.target.value} : null)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Users Assigned</Label>
                <div className="mt-2">
                  <Badge variant="secondary">{editedRole?.users}</Badge>
                </div>
              </div>
              <div>
                <Label>Created Date</Label>
                <div className="mt-2 text-sm text-gray-600">
                  {editedRole?.created}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                {isEditing ? 'Cancel' : 'Close'}
              </Button>
              {isEditing && (
                <Button onClick={handleSave}>Save Changes</Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RoleActionsModal;
