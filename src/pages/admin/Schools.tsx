
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School } from 'lucide-react';

const Schools = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <School className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Schools</h1>
          <p className="text-slate-600">Manage school information and integration</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>School Management System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for managing school information,
            integration with school systems, and related administrative functions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Schools;
