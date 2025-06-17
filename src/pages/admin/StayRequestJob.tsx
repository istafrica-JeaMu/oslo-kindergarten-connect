
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

const StayRequestJob = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Briefcase className="w-8 h-8 text-teal-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Stay Request Job</h1>
          <p className="text-slate-600">Manage stay request processing jobs and workflows</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stay Request Job Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for managing stay request processing
            jobs, automated workflows, and related administrative tasks.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StayRequestJob;
