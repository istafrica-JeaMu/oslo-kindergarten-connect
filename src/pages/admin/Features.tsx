
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor } from 'lucide-react';

const Features = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Monitor className="w-8 h-8 text-teal-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Feature Control Center</h1>
          <p className="text-slate-600">Enable/disable features across all districts</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feature Control Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain feature flag management tools for enabling or disabling
            system features across all districts and controlling feature rollouts.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Features;
