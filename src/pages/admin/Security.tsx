
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const Security = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-red-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Security & Compliance</h1>
          <p className="text-slate-600">GDPR compliance, audit logs, and security monitoring</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security & Compliance Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            This module will contain security and compliance tools for GDPR compliance,
            audit logging, security monitoring, and data protection management.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;
