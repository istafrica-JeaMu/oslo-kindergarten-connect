
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

const GlobalConfig = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Globe className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Global System Configuration</h1>
          <p className="text-slate-600">System-wide parameters, feature flags, and global settings</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Configuration Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain system-wide configuration settings, feature flags, 
            and global parameters that affect all districts and kindergartens.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalConfig;
