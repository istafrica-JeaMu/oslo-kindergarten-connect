
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';

const UserTemplates = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UserCheck className="w-8 h-8 text-orange-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User & Role Templates</h1>
          <p className="text-slate-600">Manage system-wide user roles and permission templates</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Template Management Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain user role and permission template management tools
            for standardizing user access across all districts and kindergartens.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTemplates;
