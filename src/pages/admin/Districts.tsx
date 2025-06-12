
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const Districts = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MapPin className="w-8 h-8 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">District Oversight</h1>
          <p className="text-slate-600">Monitor and manage all districts across the municipality</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>District Management Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain district management tools for overseeing all districts,
            monitoring their performance, and managing district-level configurations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Districts;
