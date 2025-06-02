
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  User,
  Calendar,
  MapPin
} from 'lucide-react';

const ReviewQueue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Mock applications data
  const applications = [
    {
      id: 'APP-1247',
      childName: 'Emma Johnson',
      childAge: '2 years',
      guardianName: 'Sarah Johnson',
      guardianEmail: 'sarah.johnson@email.com',
      submittedDate: '2024-03-20',
      status: 'new',
      priority: 'high',
      district: 'Frogner',
      kindergartenPreference: 'Sunshine Kindergarten',
      missingDocuments: [],
      notes: 'Special dietary requirements mentioned'
    },
    {
      id: 'APP-1246',
      childName: 'Oliver Chen',
      childAge: '3 years',
      guardianName: 'Li Chen',
      guardianEmail: 'li.chen@email.com',
      submittedDate: '2024-03-19',
      status: 'under_review',
      priority: 'normal',
      district: 'Grünerløkka',
      kindergartenPreference: 'Little Explorers',
      missingDocuments: [],
      notes: 'Previous kindergarten experience documented'
    },
    {
      id: 'APP-1245',
      childName: 'Sophia Garcia',
      childAge: '1 year',
      guardianName: 'Maria Garcia',
      guardianEmail: 'maria.garcia@email.com',
      submittedDate: '2024-03-18',
      status: 'missing_documents',
      priority: 'normal',
      district: 'Sagene',
      kindergartenPreference: 'Rainbow Kids',
      missingDocuments: ['Birth Certificate', 'Vaccination Records'],
      notes: 'Family recently moved to Oslo'
    },
    {
      id: 'APP-1244',
      childName: 'Lucas Andersen',
      childAge: '4 years',
      guardianName: 'Erik Andersen',
      guardianEmail: 'erik.andersen@email.com',
      submittedDate: '2024-03-17',
      status: 'approved',
      priority: 'low',
      district: 'St. Hanshaugen',
      kindergartenPreference: 'Happy Learning Center',
      missingDocuments: [],
      notes: 'Application approved for August start'
    },
    {
      id: 'APP-1243',
      childName: 'Zara Ahmed',
      childAge: '2 years',
      guardianName: 'Fatima Ahmed',
      guardianEmail: 'fatima.ahmed@email.com',
      submittedDate: '2024-03-16',
      status: 'rejected',
      priority: 'normal',
      district: 'Bjerke',
      kindergartenPreference: 'Green Valley Kindergarten',
      missingDocuments: [],
      notes: 'No available spots, placed on waiting list'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      case 'under_review':
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case 'missing_documents':
        return <Badge className="bg-orange-100 text-orange-800">Missing Documents</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'normal':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.guardianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || app.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const queueStats = {
    total: applications.length,
    new: applications.filter(app => app.status === 'new').length,
    underReview: applications.filter(app => app.status === 'under_review').length,
    missingDocs: applications.filter(app => app.status === 'missing_documents').length,
    avgProcessingTime: 12
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Application Review Queue</h1>
        <p className="text-gray-600 mt-2">
          Review and process kindergarten applications
        </p>
      </div>

      {/* Queue Statistics */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="flex items-center p-4">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-semibold text-sm">Total Applications</h3>
              <p className="text-2xl font-bold text-blue-600">{queueStats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <Clock className="h-8 w-8 text-orange-600 mr-3" />
            <div>
              <h3 className="font-semibold text-sm">New</h3>
              <p className="text-2xl font-bold text-orange-600">{queueStats.new}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <Eye className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <h3 className="font-semibold text-sm">Under Review</h3>
              <p className="text-2xl font-bold text-yellow-600">{queueStats.underReview}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <h3 className="font-semibold text-sm">Missing Docs</h3>
              <p className="text-2xl font-bold text-red-600">{queueStats.missingDocs}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h3 className="font-semibold text-sm">Avg Processing</h3>
              <p className="text-2xl font-bold text-green-600">{queueStats.avgProcessingTime}d</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="missing_documents">Missing Documents</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="normal">Normal Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setPriorityFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
          <CardDescription>
            Click on an application to view details and take action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Child</TableHead>
                <TableHead>Guardian</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{app.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{app.childName}</p>
                      <p className="text-sm text-gray-600">{app.childAge}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{app.guardianName}</p>
                      <p className="text-sm text-gray-600">{app.guardianEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{app.submittedDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{app.district}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(app.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getPriorityIcon(app.priority)}
                      <span className="text-sm capitalize">{app.priority}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {app.status === 'new' && (
                        <Button size="sm" className="bg-oslo-blue hover:bg-blue-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      )}
                      {app.status === 'missing_documents' && (
                        <Button size="sm" variant="outline" className="text-orange-600">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Request Docs
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks for processing applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span>Bulk Review</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col">
              <AlertTriangle className="h-6 w-6 mb-2" />
              <span>Request Documents</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col">
              <CheckCircle className="h-6 w-6 mb-2" />
              <span>Approve Applications</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col">
              <User className="h-6 w-6 mb-2" />
              <span>Contact Guardians</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewQueue;
