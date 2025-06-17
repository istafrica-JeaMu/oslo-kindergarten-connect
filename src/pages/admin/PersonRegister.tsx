
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const PersonRegister = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Person Register</h1>
          <p className="text-slate-600">Manage person registry and demographic data</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Person Registry Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for managing the person registry,
            demographic data, and related administrative functions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonRegister;
