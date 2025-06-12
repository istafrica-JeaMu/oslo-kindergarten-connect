
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School } from 'lucide-react';

const KindergartenTypes = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <School className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Kindergarten Classification</h1>
          <p className="text-slate-600">Manage kindergarten types, services, and master data</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kindergarten Type Management Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain kindergarten classification tools for managing
            kindergarten types, service categories, and master data structures.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KindergartenTypes;
