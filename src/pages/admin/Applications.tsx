
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const Applications = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Applications</h1>
          <p className="text-slate-600">Manage all kindergarten applications</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain comprehensive tools for managing
            all kindergarten applications throughout their lifecycle.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Applications;
