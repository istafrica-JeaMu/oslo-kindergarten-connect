
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks } from 'lucide-react';

const ManageChildinfoCategories = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ListChecks className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Child Info Categories</h1>
          <p className="text-slate-600">Configure child information categories and classifications</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Child Information Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for creating and managing
            child information categories, classifications, and related metadata.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageChildinfoCategories;
