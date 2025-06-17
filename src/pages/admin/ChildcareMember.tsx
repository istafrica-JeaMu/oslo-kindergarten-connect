
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Baby } from 'lucide-react';

const ChildcareMember = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Baby className="w-8 h-8 text-pink-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Childcare Member Management</h1>
          <p className="text-slate-600">Manage childcare members and their information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Childcare Members</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for managing childcare members,
            their profiles, and related information.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildcareMember;
