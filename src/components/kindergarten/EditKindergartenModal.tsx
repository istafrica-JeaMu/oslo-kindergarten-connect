
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Edit, Loader2, AlertTriangle } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface EditKindergartenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kindergarten: any;
  onKindergartenUpdated: (updatedKindergarten: any) => void;
}

const EditKindergartenModal = ({ open, onOpenChange, kindergarten, onKindergartenUpdated }: EditKindergartenModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    director: '',
    capacity: {
      total: '',
      ageGroup1to2: '',
      ageGroup3to5: ''
    },
    services: [] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const availableServices = [
    'Extended Hours',
    'Meals',
    'Special Needs',
    'Language Programs',
    'Outdoor Activities',
    'Music Programs'
  ];

  useEffect(() => {
    if (kindergarten && open) {
      setFormData({
        name: kindergarten.name || '',
        address: kindergarten.address || '',
        director: kindergarten.director || '',
        capacity: {
          total: kindergarten.capacity?.total?.toString() || '',
          ageGroup1to2: kindergarten.capacity?.ageGroup1to2?.toString() || '',
          ageGroup3to5: kindergarten.capacity?.ageGroup3to5?.toString() || ''
        },
        services: [...(kindergarten.services || [])]
      });
      setHasUnsavedChanges(false);
    }
  }, [kindergarten, open]);

  const checkForChanges = (newFormData: any) => {
    if (!kindergarten) return false;
    
    const originalData = {
      name: kindergarten.name,
      address: kindergarten.address,
      director: kindergarten.director,
      capacity: {
        total: kindergarten.capacity.total.toString(),
        ageGroup1to2: kindergarten.capacity.ageGroup1to2.toString(),
        ageGroup3to5: kindergarten.capacity.ageGroup3to5.toString()
      },
      services: kindergarten.services
    };

    return JSON.stringify(originalData) !== JSON.stringify(newFormData);
  };

  const updateFormData = (updates: any) => {
    const newFormData = { ...formData, ...updates };
    setFormData(newFormData);
    setHasUnsavedChanges(checkForChanges(newFormData));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.director.trim()) newErrors.director = 'Director name is required';
    
    const total = parseInt(formData.capacity.total) || 0;
    const age1to2 = parseInt(formData.capacity.ageGroup1to2) || 0;
    const age3to5 = parseInt(formData.capacity.ageGroup3to5) || 0;
    
    if (total <= 0) newErrors.capacity = 'Total capacity must be greater than 0';
    if (age1to2 + age3to5 !== total) {
      newErrors.capacity = 'Age group capacities must sum to total capacity';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedKindergarten = {
        ...kindergarten,
        name: formData.name,
        address: formData.address,
        director: formData.director,
        capacity: {
          ...kindergarten.capacity,
          total: parseInt(formData.capacity.total),
          ageGroup1to2: parseInt(formData.capacity.ageGroup1to2),
          ageGroup3to5: parseInt(formData.capacity.ageGroup3to5)
        },
        services: formData.services
      };
      
      onKindergartenUpdated(updatedKindergarten);
      onOpenChange(false);
      setHasUnsavedChanges(false);
      
      toast({
        title: "Kindergarten Updated",
        description: `${formData.name} has been successfully updated.`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update kindergarten. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedDialog(true);
    } else {
      onOpenChange(false);
    }
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    const newServices = checked 
      ? [...formData.services, service]
      : formData.services.filter(s => s !== service);
    
    updateFormData({ services: newServices });
  };

  if (!kindergarten) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Kindergarten
              {hasUnsavedChanges && (
                <span className="text-sm text-amber-600 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Unsaved changes
                </span>
              )}
            </DialogTitle>
            <DialogDescription>
              Make changes to kindergarten information. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Kindergarten Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                placeholder="e.g., Sentrum Barnehage"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-address">Address *</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) => updateFormData({ address: e.target.value })}
                placeholder="e.g., Storgata 123, Oslo"
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-director">Director Name *</Label>
              <Input
                id="edit-director"
                value={formData.director}
                onChange={(e) => updateFormData({ director: e.target.value })}
                placeholder="e.g., Kari Andersen"
                className={errors.director ? 'border-red-500' : ''}
              />
              {errors.director && <p className="text-sm text-red-600">{errors.director}</p>}
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-total-capacity">Total Capacity *</Label>
                <Input
                  id="edit-total-capacity"
                  type="number"
                  min="1"
                  value={formData.capacity.total}
                  onChange={(e) => updateFormData({ 
                    capacity: { ...formData.capacity, total: e.target.value }
                  })}
                  placeholder="125"
                  className={errors.capacity ? 'border-red-500' : ''}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-age1to2">Age 1-2 Spots *</Label>
                <Input
                  id="edit-age1to2"
                  type="number"
                  min="0"
                  value={formData.capacity.ageGroup1to2}
                  onChange={(e) => updateFormData({ 
                    capacity: { ...formData.capacity, ageGroup1to2: e.target.value }
                  })}
                  placeholder="45"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-age3to5">Age 3-5 Spots *</Label>
                <Input
                  id="edit-age3to5"
                  type="number"
                  min="0"
                  value={formData.capacity.ageGroup3to5}
                  onChange={(e) => updateFormData({ 
                    capacity: { ...formData.capacity, ageGroup3to5: e.target.value }
                  })}
                  placeholder="80"
                />
              </div>
            </div>
            {errors.capacity && <p className="text-sm text-red-600">{errors.capacity}</p>}
            
            <div className="space-y-3">
              <Label>Services Offered</Label>
              <div className="grid grid-cols-2 gap-3">
                {availableServices.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-${service}`}
                      checked={formData.services.includes(service)}
                      onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                    />
                    <Label htmlFor={`edit-${service}`} className="text-sm font-normal">
                      {service}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading || !hasUnsavedChanges}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to close without saving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Editing</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowUnsavedDialog(false);
              onOpenChange(false);
              setHasUnsavedChanges(false);
            }}>
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditKindergartenModal;
