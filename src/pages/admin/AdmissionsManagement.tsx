
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';

const AdmissionsManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UserCheck className="w-8 h-8 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admissions Management</h1>
          <p className="text-slate-600">Manage the admissions process and decisions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admissions Control Center</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for managing the entire admissions
            process, from application review to final placement decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdmissionsManagement;
