
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const Communications = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="w-8 h-8 text-cyan-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Communication Center</h1>
          <p className="text-slate-600">Manage system-wide communications and notifications</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Communication Management Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain communication tools for managing system-wide
            notifications, announcements, and communication templates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Communications;
