
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

const SuggestedAdmissions = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UserPlus className="w-8 h-8 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Suggested Admissions</h1>
          <p className="text-slate-600">Review system-generated admission suggestions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admission Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for reviewing and managing
            system-generated admission suggestions and recommendations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuggestedAdmissions;
