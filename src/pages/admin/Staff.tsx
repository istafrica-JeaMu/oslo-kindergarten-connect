
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const Staff = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Staff Management</h1>
          <p className="text-slate-600">Manage staff information and assignments</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Management System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for managing staff information,
            assignments, roles, and related administrative functions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Staff;
