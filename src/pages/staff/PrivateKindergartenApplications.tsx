import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Search, 
  Filter, 
  FileText, 
  User, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  FilterX,
  Star,
  Settings
} from 'lucide-react';

const PrivateKindergartenApplications = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  const applications = [
    {
      id: 'APP-2024-001',
      childName: 'Sofia Kristensen',
      parentName: 'Erik Kristensen',
      age: '3 years',
      appliedDate: '2024-01-15',
      desiredStartDate: '2024-02-01',
      status: 'pending',
      priority: 'high',
      notes: 'Urgent placement needed due to work requirements',
      documents: { complete: true, missing: [] }
    },
    {
      id: 'APP-2024-002',
      childName: 'Noah Pettersen',
      parentName: 'Anna Pettersen',
      age: '4 years',
      appliedDate: '2024-01-14',
      desiredStartDate: '2024-02-15',
      status: 'under-review',
      priority: 'medium',
      notes: 'Previous kindergarten experience',
      documents: { complete: false, missing: ['Medical certificate'] }
    },
    {
      id: 'APP-2024-003',
      childName: 'Liam Eriksen',
      parentName: 'Maria Eriksen',
      age: '2 years',
      appliedDate: '2024-01-13',
      desiredStartDate: '2024-03-01',
      status: 'pending',
      priority: 'low',
      notes: 'Flexible start date',
      documents: { complete: true, missing: [] }
    },
    {
      id: 'APP-2024-004',
      childName: 'Emma Larsen',
      parentName: 'Jon Larsen',
      age: '5 years',
      appliedDate: '2024-01-12',
      desiredStartDate: '2024-02-01',
      status: 'accepted',
      priority: 'medium',
      notes: 'Approved for immediate placement',
      documents: { complete: true, missing: [] }
    },
    {
      id: 'APP-2024-005',
      childName: 'Oliver Hansen',
      parentName: 'Kari Hansen',
      age: '3 years',
      appliedDate: '2024-01-10',
      desiredStartDate: '2024-02-01',
      status: 'rejected',
      priority: 'low',
      notes: 'No available spots for requested age group',
      documents: { complete: true, missing: [] }
    }
  ];

  const priorityCriteria = [
    { id: 1, name: 'Siblings already enrolled', weight: 10, active: true },
    { id: 2, name: 'Working parents', weight: 8, active: true },
    { id: 3, name: 'Single parent household', weight: 7, active: true },
    { id: 4, name: 'Special needs accommodation', weight: 9, active: true },
    { id: 5, name: 'Distance from kindergarten', weight: 5, active: false },
    { id: 6, name: 'Application date (first come)', weight: 3, active: true }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || app.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterPriority('all');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
      'under-review': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Eye },
      'accepted': { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      'rejected': { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon || Clock;
    
    return (
      <Badge className={config?.color || 'bg-gray-100 text-gray-800 border-gray-200'}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      'high': 'bg-red-100 text-red-800 border-red-200',
      'medium': 'bg-orange-100 text-orange-800 border-orange-200',
      'low': 'bg-green-100 text-green-800 border-green-200'
    };
    
    return (
      <Badge className={colors[priority as keyof typeof colors]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const handleAcceptApplication = (applicationId: string) => {
    console.log('Accepting application:', applicationId);
    // Implementation for accepting application
  };

  const handleRejectApplication = (applicationId: string) => {
    console.log('Rejecting application:', applicationId);
    // Implementation for rejecting application
  };

  const togglePriorityCriteria = (criteriaId: number) => {
    console.log('Toggling priority criteria:', criteriaId);
    // Implementation for toggling criteria
  };

  const updateCriteriaWeight = (criteriaId: number, newWeight: number) => {
    console.log('Updating criteria weight:', criteriaId, newWeight);
    // Implementation for updating weight
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    underReview: applications.filter(app => app.status === 'under-review').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  const handleViewApplication = (applicationId: string) => {
    navigate(`/kindergarten/applications/${applicationId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Applications Management</h1>
          <p className="text-slate-600 mt-1">Review and manage kindergarten placement applications</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">
            {filteredApplications.length} of {applications.length} applications
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-800">{stats.total}</p>
                <p className="text-sm text-blue-600">Total Applications</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
                <p className="text-sm text-yellow-600">Pending Review</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-800">{stats.underReview}</p>
                <p className="text-sm text-purple-600">Under Review</p>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-800">{stats.accepted}</p>
                <p className="text-sm text-green-600">Accepted</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-800">{stats.rejected}</p>
                <p className="text-sm text-red-600">Rejected</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="priority-criteria">Priority Criteria</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by child name, parent, or application ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="flex items-center gap-2"
                  >
                    <FilterX className="w-4 h-4" />
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Application Reviews
              </CardTitle>
              <CardDescription>
                Review and manage incoming kindergarten placement applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isMobile ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2">
                        <TableHead className="font-semibold">Application</TableHead>
                        <TableHead className="font-semibold">Child Details</TableHead>
                        <TableHead className="font-semibold">Parent/Guardian</TableHead>
                        <TableHead className="font-semibold">Dates</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Priority</TableHead>
                        <TableHead className="font-semibold text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((application) => (
                        <TableRow key={application.id} className="hover:bg-slate-50 transition-colors">
                          <TableCell>
                            <div>
                              <p className="font-medium text-slate-900">{application.id}</p>
                              <p className="text-sm text-slate-500">Applied: {application.appliedDate}</p>
                              {!application.documents.complete && (
                                <div className="flex items-center gap-1 mt-1">
                                  <AlertTriangle className="w-3 h-3 text-orange-500" />
                                  <span className="text-xs text-orange-600">Missing docs</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-slate-900">{application.childName}</p>
                              <p className="text-sm text-slate-600">{application.age}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-slate-900">{application.parentName}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="flex items-center gap-1 text-slate-600">
                                <Calendar className="w-3 h-3" />
                                <span>Start: {application.desiredStartDate}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(application.status)}</TableCell>
                          <TableCell>{getPriorityBadge(application.priority)}</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewApplication(application.id)}
                                className="gap-1"
                              >
                                <Eye className="w-3 h-3" />
                                View
                              </Button>
                              {application.status === 'pending' || application.status === 'under-review' ? (
                                <>
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleAcceptApplication(application.id)}
                                  >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-300 text-red-700 hover:bg-red-50"
                                    onClick={() => handleRejectApplication(application.id)}
                                  >
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              ) : null}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApplications.map((application) => (
                    <Card key={application.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-slate-900">{application.childName}</p>
                            <p className="text-sm text-slate-600">{application.age} • {application.parentName}</p>
                            <p className="text-xs text-slate-500">{application.id}</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            {getStatusBadge(application.status)}
                            {getPriorityBadge(application.priority)}
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm"><span className="font-medium">Applied:</span> {application.appliedDate}</p>
                          <p className="text-sm"><span className="font-medium">Desired Start:</span> {application.desiredStartDate}</p>
                          {application.notes && (
                            <p className="text-sm"><span className="font-medium">Notes:</span> {application.notes}</p>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleViewApplication(application.id)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          {application.status === 'pending' || application.status === 'under-review' ? (
                            <>
                              <Button
                                size="sm"
                                className="flex-1 bg-green-600 hover:bg-green-700"
                                onClick={() => handleAcceptApplication(application.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                                onClick={() => handleRejectApplication(application.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="priority-criteria" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Priority Criteria Configuration
              </CardTitle>
              <CardDescription>
                Configure automatic priority scoring for applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priorityCriteria.map((criteria) => (
                  <div key={criteria.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={criteria.active}
                          onChange={() => togglePriorityCriteria(criteria.id)}
                          className="w-4 h-4 text-purple-600 rounded"
                        />
                        <span className={`font-medium ${criteria.active ? 'text-slate-900' : 'text-slate-500'}`}>
                          {criteria.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">Weight:</span>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={criteria.weight}
                          onChange={(e) => updateCriteriaWeight(criteria.id, parseInt(e.target.value))}
                          className="w-16 h-8 text-center"
                          disabled={!criteria.active}
                        />
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {criteria.weight}/10
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrivateKindergartenApplications;
