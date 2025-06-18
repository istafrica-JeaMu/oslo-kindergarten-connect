
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
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface Module {
  id: number;
  name: string;
  group: string;
  source: string;
  status: string;
  version: string;
}

interface ModuleGroup {
  id: number;
  name: string;
  modules: number;
  description: string;
  status: string;
}

interface ModuleGroupEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: ModuleGroup | null;
  availableModules: Module[];
  onSave: (group: ModuleGroup, selectedModules: Module[]) => void;
}

const ModuleGroupEditModal = ({ isOpen, onClose, group, availableModules, onSave }: ModuleGroupEditModalProps) => {
  const [editedGroup, setEditedGroup] = useState<ModuleGroup | null>(group);
  const [selectedModules, setSelectedModules] = useState<Module[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    if (group) {
      setEditedGroup(group);
      // Mock: Get modules that belong to this group
      const groupModules = availableModules.filter(module => module.group === group.name);
      setSelectedModules(groupModules);
    }
  }, [group, availableModules]);

  const handleModuleToggle = (module: Module, checked: boolean) => {
    setSelectedModules(prev => 
      checked 
        ? [...prev, module]
        : prev.filter(m => m.id !== module.id)
    );
  };

  const removeModule = (moduleId: number) => {
    setSelectedModules(prev => prev.filter(m => m.id !== moduleId));
  };

  const handleSave = () => {
    if (editedGroup) {
      const updatedGroup = {
        ...editedGroup,
        modules: selectedModules.length
      };
      onSave(updatedGroup, selectedModules);
      onClose();
    }
  };

  const filteredModules = availableModules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedModules.some(selected => selected.id === module.id)
  );

  if (!group || !editedGroup) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Module Group: {group.name}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                value={editedGroup.name}
                onChange={(e) => setEditedGroup(prev => prev ? {...prev, name: e.target.value} : null)}
              />
            </div>
            <div>
              <Label>Status</Label>
              <div className="mt-2">
                <Badge variant="outline" className="text-green-600">
                  {editedGroup.status}
                </Badge>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="groupDescription">Description</Label>
            <Textarea
              id="groupDescription"
              value={editedGroup.description}
              onChange={(e) => setEditedGroup(prev => prev ? {...prev, description: e.target.value} : null)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
            {/* Selected Modules */}
            <div className="border rounded-lg p-4 flex flex-col">
              <h3 className="font-medium mb-2">Selected Modules ({selectedModules.length})</h3>
              <div className="flex-1 overflow-y-auto space-y-2">
                {selectedModules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between p-2 bg-blue-50 rounded border">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{module.name}</p>
                      <p className="text-xs text-gray-500">{module.source} • v{module.version}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeModule(module.id)}
                      className="ml-2 h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Available Modules */}
            <div className="border rounded-lg p-4 flex flex-col">
              <div className="mb-2">
                <h3 className="font-medium mb-2">Available Modules</h3>
                <Input
                  placeholder="Search modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-8"
                />
              </div>
              <div className="flex-1 overflow-y-auto space-y-2">
                {filteredModules.map((module) => (
                  <div key={module.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                    <Checkbox
                      id={`module-${module.id}`}
                      onCheckedChange={(checked) => handleModuleToggle(module, checked === true)}
                    />
                    <div className="flex-1 min-w-0">
                      <Label htmlFor={`module-${module.id}`} className="font-medium text-sm cursor-pointer">
                        {module.name}
                      </Label>
                      <p className="text-xs text-gray-500">{module.source} • v{module.version}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModuleGroupEditModal;
