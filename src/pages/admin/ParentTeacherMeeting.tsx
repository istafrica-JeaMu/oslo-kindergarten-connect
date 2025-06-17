
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const ParentTeacherMeeting = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="w-8 h-8 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Parent Teacher Meeting</h1>
          <p className="text-slate-600">Schedule and manage parent-teacher meetings</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meeting Management System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain tools for scheduling, managing, and coordinating
            parent-teacher meetings across the kindergarten system.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentTeacherMeeting;
