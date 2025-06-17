
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const ModifiedApplications = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="w-8 h-8 text-orange-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Modified Applications</h1>
          <p className="text-slate-600">Track and manage applications that have been modified</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Modified Applications Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for tracking applications that have been
            modified after submission and managing the review process.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModifiedApplications;
