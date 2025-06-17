
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const GuaranteeList = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Guarantee List</h1>
          <p className="text-slate-600">Manage statutory guarantee rights and priority lists</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guarantee Rights Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for managing statutory guarantee rights,
            priority lists, and related administrative functions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuaranteeList;
