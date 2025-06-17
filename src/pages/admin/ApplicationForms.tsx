
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const ApplicationForms = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Application Forms</h1>
          <p className="text-slate-600">Manage and configure application form templates</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Forms Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for creating, editing, and managing 
            application form templates and configurations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationForms;
