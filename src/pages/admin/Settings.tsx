
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cog } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Cog className="w-8 h-8 text-slate-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">System Settings</h1>
          <p className="text-slate-600">Configure system-wide settings and preferences</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for configuring system-wide settings,
            preferences, and administrative configurations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
