
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Shield, Info, Save, RotateCcw } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  critical?: boolean;
}

interface PermissionMatrixProps {
  rolePermissions: string[];
  onPermissionChange: (permissions: string[]) => void;
  readOnly?: boolean;
}

const PermissionMatrix = ({ rolePermissions, onPermissionChange, readOnly = false }: PermissionMatrixProps) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(rolePermissions);

  const permissions: Permission[] = [
    // Administration
    { id: 'manage_staff', name: 'Manage Staff', description: 'Add, edit, and remove staff members', category: 'Administration', critical: true },
    { id: 'manage_finances', name: 'Manage Finances', description: 'Access financial data and billing', category: 'Administration', critical: true },
    { id: 'system_settings', name: 'System Settings', description: 'Configure system-wide settings', category: 'Administration', critical: true },
    
    // Applications
    { id: 'accept_applications', name: 'Accept Applications', description: 'Approve or reject kindergarten applications', category: 'Applications' },
    { id: 'review_applications', name: 'Review Applications', description: 'View and assess applications', category: 'Applications' },
    { id: 'placement_management', name: 'Placement Management', description: 'Manage child placements and transfers', category: 'Applications' },
    
    // Operations
    { id: 'daily_attendance', name: 'Daily Attendance', description: 'Mark attendance and track presence', category: 'Operations' },
    { id: 'child_notes', name: 'Child Notes', description: 'Add and view notes about children', category: 'Operations' },
    { id: 'activity_planning', name: 'Activity Planning', description: 'Plan and schedule activities', category: 'Operations' },
    
    // Reports
    { id: 'view_reports', name: 'View Reports', description: 'Access standard reports and analytics', category: 'Reports' },
    { id: 'generate_reports', name: 'Generate Reports', description: 'Create custom reports and exports', category: 'Reports' },
    { id: 'financial_reports', name: 'Financial Reports', description: 'Access financial reports and data', category: 'Reports', critical: true },
    
    // Communication
    { id: 'parent_communication', name: 'Parent Communication', description: 'Send messages to parents and guardians', category: 'Communication' },
    { id: 'family_support', name: 'Family Support', description: 'Provide support and guidance to families', category: 'Communication' },
    { id: 'bulletin_management', name: 'Bulletin Management', description: 'Manage announcements and notices', category: 'Communication' }
  ];

  const categories = [...new Set(permissions.map(p => p.category))];

  const handlePermissionToggle = (permissionId: string) => {
    if (readOnly) return;
    
    const newPermissions = selectedPermissions.includes(permissionId)
      ? selectedPermissions.filter(p => p !== permissionId)
      : [...selectedPermissions, permissionId];
    
    setSelectedPermissions(newPermissions);
  };

  const handleSave = () => {
    onPermissionChange(selectedPermissions);
  };

  const handleReset = () => {
    setSelectedPermissions(rolePermissions);
  };

  const hasChanges = JSON.stringify(selectedPermissions.sort()) !== JSON.stringify(rolePermissions.sort());

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <CardTitle>Permission Matrix</CardTitle>
          </div>
          {!readOnly && hasChanges && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="space-y-4">
                {permissions
                  .filter(p => p.category === category)
                  .map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                      <Checkbox
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={() => handlePermissionToggle(permission.id)}
                        disabled={readOnly}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <label 
                            htmlFor={permission.id} 
                            className="text-sm font-medium text-slate-900 cursor-pointer"
                          >
                            {permission.name}
                          </label>
                          {permission.critical && (
                            <Badge variant="destructive" className="text-xs">
                              Critical
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-600">{permission.description}</p>
                      </div>
                      <Info className="w-4 h-4 text-slate-400 mt-1" />
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {selectedPermissions.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Selected Permissions ({selectedPermissions.length})
            </h4>
            <div className="flex flex-wrap gap-1">
              {selectedPermissions.map((permId) => {
                const permission = permissions.find(p => p.id === permId);
                return permission ? (
                  <Badge key={permId} variant="outline" className="text-xs">
                    {permission.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PermissionMatrix;
