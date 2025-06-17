
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Send, ArrowUp, CreditCard, FileX, UserCheck } from 'lucide-react';

interface BulkDebtActionsProps {
  selectedCount: number;
  onBulkAction: (actionType: string, parameters?: any) => void;
}

const BulkDebtActions = ({ selectedCount, onBulkAction }: BulkDebtActionsProps) => {
  const [selectedAction, setSelectedAction] = useState('');

  const handleExecuteAction = () => {
    if (!selectedAction) return;
    
    onBulkAction(selectedAction);
    setSelectedAction('');
  };

  if (selectedCount === 0) return null;

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Users className="w-5 h-5" />
          Bulk Actions ({selectedCount} selected)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Select value={selectedAction} onValueChange={setSelectedAction}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select bulk action..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="send_notice">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Payment Notice
                </div>
              </SelectItem>
              <SelectItem value="escalate">
                <div className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4" />
                  Escalate Collection Level
                </div>
              </SelectItem>
              <SelectItem value="create_payment_plan">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Create Payment Plans
                </div>
              </SelectItem>
              <SelectItem value="assign_collector">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Assign Collector
                </div>
              </SelectItem>
              <SelectItem value="write_off">
                <div className="flex items-center gap-2">
                  <FileX className="w-4 h-4" />
                  Write Off (Admin Only)
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={handleExecuteAction}
            disabled={!selectedAction}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Execute Action
          </Button>

          <Button 
            variant="outline" 
            onClick={() => setSelectedAction('')}
            className="text-slate-600"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkDebtActions;
