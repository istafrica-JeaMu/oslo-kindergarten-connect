
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface PlacementPeriod {
  id?: number;
  name: string;
  applicationDeadline: string;
  placementStart: string;
  status: string;
  applicationsReceived?: number;
  placementsConfirmed?: number;
}

interface PlacementPeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (period: PlacementPeriod) => void;
  period?: PlacementPeriod;
}

const PlacementPeriodModal = ({ isOpen, onClose, onSave, period }: PlacementPeriodModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PlacementPeriod>(
    period || {
      name: '',
      applicationDeadline: '',
      placementStart: '',
      status: 'Upcoming',
      applicationsReceived: 0,
      placementsConfirmed: 0
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.applicationDeadline || !formData.placementStart) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
    toast({
      title: "Success",
      description: period ? "Placement period updated successfully" : "Placement period created successfully"
    });
    onClose();
  };

  const handleChange = (field: keyof PlacementPeriod, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {period ? 'Edit Placement Period' : 'New Placement Period'}
          </DialogTitle>
          <DialogDescription>
            {period ? 'Update the placement period details below.' : 'Create a new placement period for kindergarten applications.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Period Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Spring 2025 Placement"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="applicationDeadline">Application Deadline</Label>
            <Input
              id="applicationDeadline"
              type="date"
              value={formData.applicationDeadline}
              onChange={(e) => handleChange('applicationDeadline', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="placementStart">Placement Start Date</Label>
            <Input
              id="placementStart"
              type="date"
              value={formData.placementStart}
              onChange={(e) => handleChange('placementStart', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {period ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlacementPeriodModal;
