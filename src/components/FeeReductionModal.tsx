
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, X } from 'lucide-react';

interface FeeReductionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FeeReductionModal = ({ open, onOpenChange }: FeeReductionModalProps) => {
  const { t } = useTranslation();
  const [income, setIncome] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitting fee reduction application with income:', income);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setIncome('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Apply for Fee Reduction
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Income-based fee reduction application. Your income will be verified with the Tax Administration.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="income" className="text-sm font-medium text-gray-700">
              Total Household Income (NOK)
            </Label>
            <Input
              id="income"
              type="number"
              placeholder="e.g., 450000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full"
              required
            />
            <p className="text-xs text-gray-500">
              Annual household income before taxes
            </p>
          </div>

          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700 text-sm">
              Your income will be automatically verified with the Tax Administration. 
              You will receive a decision within 5-7 business days.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeeReductionModal;
