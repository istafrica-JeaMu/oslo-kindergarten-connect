
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

const DebtManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <DollarSign className="w-8 h-8 text-red-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Debt Management</h1>
          <p className="text-slate-600">Manage outstanding debts and payment issues</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Debt Management System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for tracking, managing, and resolving
            outstanding debts and payment-related issues.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebtManagement;
