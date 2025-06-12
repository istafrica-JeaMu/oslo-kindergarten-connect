
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const PlacementWindows = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="w-8 h-8 text-pink-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Placement Windows</h1>
          <p className="text-slate-600">Configure application periods and placement windows</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Placement Window Configuration Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain placement window management tools for configuring
            application periods, deadlines, and placement scheduling across all districts.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlacementWindows;
