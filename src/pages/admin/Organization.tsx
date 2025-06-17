
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

const Organization = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Building2 className="w-8 h-8 text-slate-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Organization</h1>
          <p className="text-slate-600">Manage organizational structure and hierarchy</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for managing the organizational
            structure, hierarchy, and administrative units.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Organization;
