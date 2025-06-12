
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';

const Integrations = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Database className="w-8 h-8 text-slate-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Data Integration</h1>
          <p className="text-slate-600">Manage external system integrations and data flows</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Integration Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain data integration tools for managing external system
            connections, API integrations, and data synchronization processes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integrations;
