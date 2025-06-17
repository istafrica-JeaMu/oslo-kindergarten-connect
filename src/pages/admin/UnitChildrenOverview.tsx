
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const UnitChildrenOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Unit Children Overview</h1>
          <p className="text-slate-600">Overview of children across all kindergarten units</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Children Overview Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will provide a comprehensive overview of children
            across all kindergarten units with filtering and reporting capabilities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitChildrenOverview;
