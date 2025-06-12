
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

const Releases = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Activity className="w-8 h-8 text-violet-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">System Releases</h1>
          <p className="text-slate-600">Manage feature releases and system updates</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Release Management Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain release management tools for coordinating
            system updates, feature releases, and deployment scheduling.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Releases;
