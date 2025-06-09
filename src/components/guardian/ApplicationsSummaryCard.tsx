
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, ArrowRight, CheckCircle, Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ApplicationsSummaryCard = () => {
  // Mock data for demonstration
  const applications = {
    active: [
      {
        id: 'APP-001',
        childName: 'Emma Hansen',
        status: 'submitted',
        progress: 60,
        nextStep: 'Awaiting placement decision',
        kindergarten: 'Løvenskiold Kindergarten',
        priority: 'high'
      }
    ],
    completed: [
      {
        id: 'APP-002',
        childName: 'Oliver Hansen',
        status: 'placed',
        kindergarten: 'Sinsen Kindergarten'
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="w-3 h-3 mr-1" />
            Submitted
          </Badge>
        );
      case 'placed':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            Placed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-oslo-blue/5 to-oslo-blue/10" />
      <CardHeader className="relative pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-oslo-blue/10 to-oslo-blue/20 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-oslo-blue" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Applications</h3>
              <p className="text-sm text-slate-600 font-normal mt-0.5">Status and progress overview</p>
            </div>
          </div>
          <Link to="/guardian/applications">
            <Button variant="outline" size="sm" className="text-oslo-blue border-oslo-blue hover:bg-oslo-blue/10">
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-4">
        {/* Active Applications */}
        {applications.active.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              Active Applications
            </h4>
            {applications.active.map((app) => (
              <div key={app.id} className="p-4 border-2 border-yellow-200 rounded-lg bg-yellow-50/50">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h5 className="font-bold text-slate-900">{app.childName}</h5>
                    <p className="text-sm text-slate-600">{app.kindergarten}</p>
                  </div>
                  {getStatusBadge(app.status)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-semibold text-slate-900">{app.progress}%</span>
                  </div>
                  <Progress value={app.progress} className="h-2" />
                  <p className="text-sm text-slate-600 mt-2">{app.nextStep}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Applications */}
        {applications.completed.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Completed
            </h4>
            {applications.completed.map((app) => (
              <div key={app.id} className="p-3 border border-green-200 rounded-lg bg-green-50/50 flex items-center justify-between">
                <div>
                  <h5 className="font-semibold text-slate-900">{app.childName}</h5>
                  <p className="text-sm text-slate-600">{app.kindergarten}</p>
                </div>
                {getStatusBadge(app.status)}
              </div>
            ))}
          </div>
        )}

        {/* No Applications State */}
        {applications.active.length === 0 && applications.completed.length === 0 && (
          <div className="text-center py-6 space-y-3">
            <FileText className="w-12 h-12 text-slate-400 mx-auto" />
            <div>
              <h4 className="font-semibold text-slate-700">No Applications Yet</h4>
              <p className="text-sm text-slate-500">Start your first kindergarten application</p>
            </div>
            <Link to="/guardian/new-application">
              <Button className="bg-oslo-blue hover:bg-oslo-blue/90">
                <Plus className="w-4 h-4 mr-2" />
                New Application
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationsSummaryCard;
