
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface District {
  id: string;
  name: string;
  municipality: string;
  formCount: number;
}

interface AddNewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  districts: District[];
}

const AddNewFormModal: React.FC<AddNewFormModalProps> = ({ 
  isOpen, 
  onClose, 
  districts 
}) => {
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formName || !formType || !selectedDistrict) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically make an API call to create the form
    console.log('Creating new form:', {
      name: formName,
      type: formType,
      districtId: selectedDistrict
    });

    toast({
      title: "Form Created",
      description: `${formName} has been created successfully.`,
    });

    // Reset form and close modal
    setFormName('');
    setFormType('');
    setSelectedDistrict('');
    onClose();
  };

  const handleClose = () => {
    setFormName('');
    setFormType('');
    setSelectedDistrict('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Application Form</DialogTitle>
          <DialogDescription>
            Create a new kindergarten application form for a specific district
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="formName">Form Name *</Label>
            <Input
              id="formName"
              placeholder="e.g., Childcare Application"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="formType">Form Type *</Label>
            <Select value={formType} onValueChange={setFormType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select form type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Förskola">Förskola (Childcare)</SelectItem>
                <SelectItem value="Fritidshem">Fritidshem (Preschool)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="district">District *</Label>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict} required>
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district.id} value={district.id}>
                    {district.name} - {district.municipality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Form
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewFormModal;
