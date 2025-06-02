
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  FolderOpen, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  FileText,
  TrendingUp,
  Calendar
} from 'lucide-react';

const CaseWorkerDashboard = () => {
  const { user } = useAuth();

  // Mock statistics
  const stats = {
    totalApplications: 1247,
    pendingReview: 89,
    placementsThisMonth: 156,
    averageProcessingTime: 12,
    districtsManaged: 3,
    kindergartensInDistrict: 45
  };

  const recentApplications = [
    {
      id: 'APP-1247',
      childName: 'Lise Eriksen',
      guardianName: 'Maria Eriksen',
      submittedDate: '2024-03-20',
      status: 'new',
      priority: 'high',
      district: 'Søndre Nordstrand'
    },
    {
      id: 'APP-1246',
      childName: 'Noah Olsen',
      guardianName: 'Anders Olsen',
      submittedDate: '2024-03-19',
      status: 'review',
      priority: 'normal',
      district: 'Søndre Nordstrand'
    },
    {
      id: 'APP-1245',
      childName: 'Sara Ahmed',
      guardianName: 'Fatima Ahmed',
      submittedDate: '2024-03-18',
      status: 'pending_documents',
      priority: 'normal',
      district: 'Søndre Nordstrand'
    }
  ];

  const urgentTasks = [
    {
      id: 1,
      type: 'document_review',
      description: 'Missing documentation from 12 applicants',
      dueDate: '2024-03-22',
      count: 12
    },
    {
      id: 2,
      type: 'placement_offers',
      description: 'Placement offers expiring soon',
      dueDate: '2024-03-25',
      count: 8
    },
    {
      id: 3,
      type: 'appeals',
      description: 'Appeal cases awaiting review',
      dueDate: '2024-03-28',
      count: 4
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      case 'review':
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case 'pending_documents':
        return <Badge className="bg-orange-100 text-orange-800">Awaiting Documents</Badge>;
      case 'placed':
        return <Badge className="bg-green-100 text-green-800">Placed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Case Worker Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name} • {user?.district}
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/caseworker/review-queue">
            <Button className="bg-oslo-blue hover:bg-blue-700">
              <FolderOpen className="h-4 w-4 mr-2" />
              Review Queue
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <FileText className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <h3 className="font-semibold">Total Applications</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.totalApplications}</p>
              <p className="text-xs text-gray-600">This year</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-yellow-600 mr-4" />
            <div>
              <h3 className="font-semibold">Pending Review</h3>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingReview}</p>
              <p className="text-xs text-gray-600">Active applications</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <h3 className="font-semibold">Placements</h3>
              <p className="text-2xl font-bold text-green-600">{stats.placementsThisMonth}</p>
              <p className="text-xs text-gray-600">This month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <h3 className="font-semibold">Avg Processing Time</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.averageProcessingTime}</p>
              <p className="text-xs text-gray-600">Days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Tasks */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Urgent Tasks
          </CardTitle>
          <CardDescription>
            Tasks requiring your immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {urgentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg bg-red-50 border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-semibold text-sm">{task.count}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-900">{task.description}</h4>
                    <p className="text-sm text-red-700">Due: {task.dueDate}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                  Take Action
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Applications and Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Recent Applications
            </CardTitle>
            <CardDescription>
              Latest applications in your review queue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    {getPriorityIcon(app.priority)}
                    <div>
                      <h4 className="font-medium">{app.childName}</h4>
                      <p className="text-sm text-gray-600">{app.guardianName}</p>
                      <p className="text-xs text-gray-500">Application #{app.id} • {app.submittedDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(app.status)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link to="/caseworker/review-queue">
                <Button variant="outline" className="w-full">
                  View All Applications
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/caseworker/review-queue">
              <Button variant="outline" className="w-full justify-start">
                <FolderOpen className="h-4 w-4 mr-2" />
                Review Queue ({stats.pendingReview})
              </Button>
            </Link>
            
            <Link to="/caseworker/placement-management">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Placement Management
              </Button>
            </Link>

            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Capacity Overview
            </Button>

            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>

            <Link to="/caseworker/messages">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Internal Messages
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* District Overview */}
      <Card>
        <CardHeader>
          <CardTitle>District Overview - {user?.district}</CardTitle>
          <CardDescription>
            Status for kindergartens in your area of responsibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900">Total Kindergartens</h4>
              <p className="text-2xl font-bold text-blue-600">{stats.kindergartensInDistrict}</p>
              <p className="text-sm text-blue-700">32 municipal, 13 private</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900">Available Spots</h4>
              <p className="text-2xl font-bold text-green-600">127</p>
              <p className="text-sm text-green-700">Available from August</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-900">Waiting List</h4>
              <p className="text-2xl font-bold text-orange-600">89</p>
              <p className="text-sm text-orange-700">Active applicants</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseWorkerDashboard;
