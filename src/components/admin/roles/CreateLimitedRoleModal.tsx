
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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CreateLimitedRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (limitedRole: any) => void;
  baseRoles: any[];
}

const CreateLimitedRoleModal = ({ isOpen, onClose, onSave, baseRoles }: CreateLimitedRoleModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    baseRole: '',
    restrictions: [] as string[]
  });

  const availableRestrictions = [
    'Cannot delete records',
    'View only reports',
    'Cannot modify policies',
    'Limited user management',
    'Cannot access parent communications',
    'Cannot process payments',
    'Cannot export data',
    'Cannot modify system settings'
  ];

  const handleRestrictionChange = (restriction: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      restrictions: checked 
        ? [...prev.restrictions, restriction]
        : prev.restrictions.filter(r => r !== restriction)
    }));
  };

  const handleSave = () => {
    const newLimitedRole = {
      id: Date.now(),
      name: formData.name,
      baseRole: formData.baseRole,
      restrictions: formData.restrictions,
      users: 0,
      description: formData.description
    };
    
    onSave(newLimitedRole);
    setFormData({ name: '', description: '', baseRole: '', restrictions: [] });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Limited Role</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="limitedRoleName">Limited Role Name</Label>
              <Input
                id="limitedRoleName"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                placeholder="e.g., Temporary Educator"
              />
            </div>
            <div>
              <Label htmlFor="baseRole">Base Role</Label>
              <Select value={formData.baseRole} onValueChange={(value) => setFormData(prev => ({...prev, baseRole: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select base role" />
                </SelectTrigger>
                <SelectContent>
                  {baseRoles.map((role) => (
                    <SelectItem key={role.id} value={role.name}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="limitedDescription">Description</Label>
            <Textarea
              id="limitedDescription"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
              placeholder="Describe the purpose of this limited role"
            />
          </div>
          
          <div>
            <Label>Restrictions</Label>
            <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
              {availableRestrictions.map((restriction) => (
                <div key={restriction} className="flex items-center space-x-2">
                  <Checkbox
                    id={restriction}
                    checked={formData.restrictions.includes(restriction)}
                    onCheckedChange={(checked) => handleRestrictionChange(restriction, checked === true)}
                  />
                  <Label htmlFor={restriction} className="text-sm">{restriction}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={!formData.name || !formData.baseRole}>
              Create Limited Role
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLimitedRoleModal;
