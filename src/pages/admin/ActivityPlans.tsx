
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';

const ActivityPlans = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ClipboardList className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Activity Plans</h1>
          <p className="text-slate-600">Manage and coordinate activity plans across kindergartens</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Planning System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for creating, managing, and coordinating
            activity plans across different kindergarten units.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityPlans;
