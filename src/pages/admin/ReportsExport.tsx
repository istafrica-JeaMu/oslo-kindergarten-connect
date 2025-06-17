
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

const ReportsExport = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BarChart className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Report & Export Data</h1>
          <p className="text-slate-600">Generate reports and export system data</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reporting & Data Export</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for generating various reports
            and exporting system data in different formats.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsExport;
