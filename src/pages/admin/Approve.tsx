
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Users, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Approve = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-8 h-8 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Approval Management</h1>
          <p className="text-slate-600">Access placement management and approval workflows</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Placement Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              Manage placement approvals, timetables, and bulk operations.
            </p>
            <Link to="/admin/placement-management">
              <Button className="w-full">
                Access Placement Management
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Quick Approval Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              Fast-track approval interface for urgent applications.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
              <Calendar className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Approve;
