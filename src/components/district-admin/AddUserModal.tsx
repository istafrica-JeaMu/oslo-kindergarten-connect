
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Building, Shield, Save, X } from 'lucide-react';

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserAdded: (user: any) => void;
}

const AddUserModal = ({ open, onOpenChange, onUserAdded }: AddUserModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    kindergartens: [] as string[],
    sendWelcomeEmail: true,
    autoGeneratePassword: true
  });

  const roles = [
    'Kindergarten Director',
    'Educator',
    'Case Worker',
    'Private Kindergarten Staff',
    'Administrator'
  ];

  const kindergartens = [
    'Sentrum Barnehage',
    'Nordre Barnehage',
    'Søndre Barnehage',
    'Østre Barnehage',
    'Private Kids AS',
    'District Office'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser = {
        id: `user-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        kindergartens: formData.kindergartens,
        status: 'Active',
        lastLogin: 'Never',
        authMethod: 'Entra ID',
        createdAt: new Date().toISOString()
      };

      onUserAdded(newUser);
      
      toast({
        title: "User Created Successfully",
        description: `${formData.name} has been added to the system${formData.sendWelcomeEmail ? ' and will receive a welcome email' : ''}.`
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        kindergartens: [],
        sendWelcomeEmail: true,
        autoGeneratePassword: true
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKindergartenToggle = (kindergarten: string) => {
    setFormData(prev => ({
      ...prev,
      kindergartens: prev.kindergartens.includes(kindergarten)
        ? prev.kindergartens.filter(k => k !== kindergarten)
        : [...prev.kindergartens, kindergarten]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Add New User
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    placeholder="user@oslo.kommune.no"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+47 123 45 678"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Primary Role *</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kindergarten Assignment */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Kindergarten Assignment</h3>
              <div className="grid grid-cols-2 gap-2">
                {kindergartens.map((kindergarten) => (
                  <div key={kindergarten} className="flex items-center space-x-2">
                    <Checkbox
                      id={kindergarten}
                      checked={formData.kindergartens.includes(kindergarten)}
                      onCheckedChange={() => handleKindergartenToggle(kindergarten)}
                    />
                    <Label htmlFor={kindergarten} className="text-sm">
                      {kindergarten}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Account Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="welcomeEmail"
                    checked={formData.sendWelcomeEmail}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sendWelcomeEmail: checked as boolean }))}
                  />
                  <Label htmlFor="welcomeEmail">Send welcome email with login instructions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoPassword"
                    checked={formData.autoGeneratePassword}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, autoGeneratePassword: checked as boolean }))}
                  />
                  <Label htmlFor="autoPassword">Auto-generate secure password</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.name || !formData.email || !formData.role}>
              {loading ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-transparent border-t-white" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create User
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
