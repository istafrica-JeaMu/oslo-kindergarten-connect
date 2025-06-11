
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Plus, Loader2 } from 'lucide-react';

interface CreateKindergartenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onKindergartenCreated: (kindergarten: any) => void;
}

const CreateKindergartenModal = ({ open, onOpenChange, onKindergartenCreated }: CreateKindergartenModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    address: '',
    director: '',
    capacity: {
      total: '',
      ageGroup1to2: '',
      ageGroup3to5: ''
    },
    type: 'Municipal',
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.id.trim()) newErrors.id = 'Kindergarten ID is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.director.trim()) newErrors.director = 'Director name is required';
    if (!formData.capacity.total || parseInt(formData.capacity.total) <= 0) {
      newErrors.capacity = 'Total capacity must be greater than 0';
    }
    
    const total = parseInt(formData.capacity.total) || 0;
    const age1to2 = parseInt(formData.capacity.ageGroup1to2) || 0;
    const age3to5 = parseInt(formData.capacity.ageGroup3to5) || 0;
    
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
      
      const newKindergarten = {
        id: formData.id,
        name: formData.name,
        address: formData.address,
        type: formData.type,
        director: formData.director,
        capacity: {
          total: parseInt(formData.capacity.total),
          occupied: 0,
          ageGroup1to2: parseInt(formData.capacity.ageGroup1to2),
          ageGroup3to5: parseInt(formData.capacity.ageGroup3to5)
        },
        status: 'Active',
        acceptingApplications: true,
        services: formData.services
      };
      
      onKindergartenCreated(newKindergarten);
      onOpenChange(false);
      
      toast({
        title: "Kindergarten Created",
        description: `${formData.name} has been successfully created.`,
      });
      
      // Reset form
      setFormData({
        name: '',
        id: '',
        address: '',
        director: '',
        capacity: { total: '', ageGroup1to2: '', ageGroup3to5: '' },
        type: 'Municipal',
        services: []
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create kindergarten. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Kindergarten
          </DialogTitle>
          <DialogDescription>
            Add a new kindergarten to your district. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Kindergarten Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Sentrum Barnehage"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="id">Kindergarten ID *</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                placeholder="e.g., KG-001"
                className={errors.id ? 'border-red-500' : ''}
              />
              {errors.id && <p className="text-sm text-red-600">{errors.id}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="e.g., Storgata 123, Oslo"
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="director">Director Name *</Label>
            <Input
              id="director"
              value={formData.director}
              onChange={(e) => setFormData(prev => ({ ...prev, director: e.target.value }))}
              placeholder="e.g., Kari Andersen"
              className={errors.director ? 'border-red-500' : ''}
            />
            {errors.director && <p className="text-sm text-red-600">{errors.director}</p>}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total-capacity">Total Capacity *</Label>
              <Input
                id="total-capacity"
                type="number"
                min="1"
                value={formData.capacity.total}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  capacity: { ...prev.capacity, total: e.target.value }
                }))}
                placeholder="125"
                className={errors.capacity ? 'border-red-500' : ''}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age1to2">Age 1-2 Spots *</Label>
              <Input
                id="age1to2"
                type="number"
                min="0"
                value={formData.capacity.ageGroup1to2}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  capacity: { ...prev.capacity, ageGroup1to2: e.target.value }
                }))}
                placeholder="45"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age3to5">Age 3-5 Spots *</Label>
              <Input
                id="age3to5"
                type="number"
                min="0"
                value={formData.capacity.ageGroup3to5}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  capacity: { ...prev.capacity, ageGroup3to5: e.target.value }
                }))}
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
                    id={service}
                    checked={formData.services.includes(service)}
                    onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                  />
                  <Label htmlFor={service} className="text-sm font-normal">
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
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Kindergarten'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateKindergartenModal;
