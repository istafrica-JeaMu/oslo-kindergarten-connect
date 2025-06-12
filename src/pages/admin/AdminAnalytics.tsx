
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="w-8 h-8 text-yellow-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="text-slate-600">Municipality-wide analytics and performance metrics</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analytics Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain comprehensive analytics tools for monitoring
            municipality-wide performance metrics, usage statistics, and operational insights.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
