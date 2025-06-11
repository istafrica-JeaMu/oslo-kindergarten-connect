
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserCheck, UserX, RotateCcw, X } from 'lucide-react';

interface BulkActionBarProps {
  selectedCount: number;
  onActivate: () => void;
  onDeactivate: () => void;
  onResetPasswords: () => void;
  onClearSelection: () => void;
}

const BulkActionBar = ({ 
  selectedCount, 
  onActivate, 
  onDeactivate, 
  onResetPasswords, 
  onClearSelection 
}: BulkActionBarProps) => {
  return (
    <Card className="border-blue-200 bg-blue-50 animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="default" className="bg-blue-600">
              {selectedCount} user{selectedCount !== 1 ? 's' : ''} selected
            </Badge>
            <span className="text-sm text-blue-700">
              Choose an action to apply to selected users
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={onActivate} className="bg-white">
              <UserCheck className="w-4 h-4 mr-2" />
              Activate
            </Button>
            <Button size="sm" variant="outline" onClick={onDeactivate} className="bg-white">
              <UserX className="w-4 h-4 mr-2" />
              Deactivate
            </Button>
            <Button size="sm" variant="outline" onClick={onResetPasswords} className="bg-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Passwords
            </Button>
            <Button size="sm" variant="ghost" onClick={onClearSelection}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkActionBar;
