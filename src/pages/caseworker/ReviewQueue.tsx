import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Filter, 
  FileText, 
  Eye, 
  MessageSquare, 
  Clock,
  User,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Users,
  BarChart3,
  Settings,
  Play
} from 'lucide-react';

// Import the new workflow components
import ApplicationWorkflow from '@/components/caseworker/ApplicationWorkflow';
import BatchProcessingPanel from '@/components/caseworker/BatchProcessingPanel';
import PlacementDecisionPanel from '@/components/caseworker/PlacementDecisionPanel';

const ReviewQueue = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);
  const [placementDialogOpen, setPlacementDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('queue');

  // Mock applications data
  const applications = [
    {
      id: 'APP-2024-001',
      childName: 'Emma Larsen',
      childAge: 3,
      guardianName: 'Maria Larsen',
      guardianEmail: 'maria.larsen@email.com',
      guardianPhone: '+47 123 45 678',
      submittedDate: '2024-03-18',
      district: 'Grünerløkka',
      status: 'new',
      priority: 'normal',
      kindergartenPreferences: ['Løvenskiold Kindergarten', 'Sinsen Kindergarten'],
      specialNeeds: false,
      siblingInKindergarten: false,
      lastUpdate: '2024-03-18'
    },
    {
      id: 'APP-2024-002',
      childName: 'Oliver Hansen',
      childAge: 4,
      guardianName: 'Anna Hansen',
      guardianEmail: 'anna.hansen@email.com',
      guardianPhone: '+47 987 65 432',
      submittedDate: '2024-03-15',
      district: 'Søndre Nordstrand',
      status: 'underReview',
      priority: 'high',
      kindergartenPreferences: ['Bjølsen Kindergarten', 'Sagene Kindergarten'],
      specialNeeds: true,
      siblingInKindergarten: true,
      lastUpdate: '2024-03-17'
    },
    {
      id: 'APP-2024-003',
      childName: 'Sofia Andersen',
      childAge: 2,
      guardianName: 'Erik Andersen',
      guardianEmail: 'erik.andersen@email.com',
      guardianPhone: '+47 456 78 901',
      submittedDate: '2024-03-10',
      district: 'Frogner',
      status: 'missingDocuments',
      priority: 'high',
      kindergartenPreferences: ['Vårtun Kindergarten'],
      specialNeeds: false,
      siblingInKindergarten: false,
      lastUpdate: '2024-03-12'
    }
  ];

  const stats = {
    total: applications.length,
    new: applications.filter(app => app.status === 'new').length,
    underReview: applications.filter(app => app.status === 'underReview').length,
    missingDocs: applications.filter(app => app.status === 'missingDocuments').length,
    avgProcessing: 12
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.guardianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || app.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">{t('caseworker.reviewQueue.new')}</Badge>;
      case 'underReview':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">{t('caseworker.reviewQueue.underReview')}</Badge>;
      case 'missingDocuments':
        return <Badge className="bg-red-100 text-red-800 border-red-300">{t('caseworker.reviewQueue.missingDocs')}</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-300">{t('caseworker.reviewQueue.highPriority')}</Badge>;
      case 'normal':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">{t('caseworker.reviewQueue.normalPriority')}</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-300">{t('caseworker.reviewQueue.lowPriority')}</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  // New workflow handlers
  const handleStatusChange = (applicationId: string, newStatus: string, reason?: string) => {
    console.log(`Changing status for ${applicationId} to ${newStatus}`, reason);
    // Here you would update the application status in your data store
    setWorkflowDialogOpen(false);
  };

  const handleBatchAction = (applicationIds: string[], action: string) => {
    console.log(`Batch action ${action} for applications:`, applicationIds);
    // Here you would process the batch action
  };

  const handlePlacementDecision = (applicationId: string, decision: any) => {
    console.log(`Placement decision for ${applicationId}:`, decision);
    // Here you would save the placement decision
    setPlacementDialogOpen(false);
  };

  const openWorkflowDialog = (application: any) => {
    setSelectedApplication(application);
    setWorkflowDialogOpen(true);
  };

  const openPlacementDialog = (application: any) => {
    setSelectedApplication(application);
    setPlacementDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('caseworker.reviewQueue.title')}</h1>
        <p className="text-gray-600 mt-2">{t('caseworker.reviewQueue.description')}</p>
      </div>

      {/* Statistics - keep existing code */}
      <div className="grid md:grid-cols-5 gap-6">
        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">{t('caseworker.reviewQueue.totalApplications')}</p>
              <p className="text-3xl font-bold text-oslo-blue">{stats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">{t('caseworker.reviewQueue.new')}</p>
              <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">{t('caseworker.reviewQueue.underReview')}</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.underReview}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">{t('caseworker.reviewQueue.missingDocs')}</p>
              <p className="text-3xl font-bold text-red-600">{stats.missingDocs}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">{t('caseworker.reviewQueue.avgProcessing')}</p>
              <p className="text-3xl font-bold text-green-600">{stats.avgProcessing}d</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="queue" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {t('caseworker.reviewQueue.applicationQueue')}
          </TabsTrigger>
          <TabsTrigger value="batch" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t('caseworker.reviewQueue.batchProcessing')}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {t('caseworker.reviewQueue.analytics')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          {/* Filters - keep existing code */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Filter className="h-5 w-5" />
                {t('caseworker.reviewQueue.filterApplications')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={t('caseworker.reviewQueue.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('caseworker.reviewQueue.allStatuses')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('caseworker.reviewQueue.allStatuses')}</SelectItem>
                    <SelectItem value="new">{t('caseworker.reviewQueue.new')}</SelectItem>
                    <SelectItem value="underReview">{t('caseworker.reviewQueue.underReview')}</SelectItem>
                    <SelectItem value="missingDocuments">{t('caseworker.reviewQueue.missingDocs')}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('caseworker.reviewQueue.allPriorities')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('caseworker.reviewQueue.allPriorities')}</SelectItem>
                    <SelectItem value="high">{t('caseworker.reviewQueue.highPriority')}</SelectItem>
                    <SelectItem value="normal">{t('caseworker.reviewQueue.normalPriority')}</SelectItem>
                    <SelectItem value="low">{t('caseworker.reviewQueue.lowPriority')}</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={clearFilters}>
                  {t('caseworker.reviewQueue.clearFilters')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Applications Table with Enhanced Actions */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-5 w-5" />
                {t('caseworker.reviewQueue.applications')} ({filteredApplications.length})
              </CardTitle>
              <CardDescription>
                {t('caseworker.reviewQueue.clickToView')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 border border-gray-200 rounded-xl hover:border-oslo-blue/30 hover:bg-gray-50/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
                          <User className="h-6 w-6 text-oslo-blue" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{app.childName}</h4>
                            <span className="text-sm text-gray-500">({app.childAge} years)</span>
                            {app.specialNeeds && (
                              <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-50">
                                Special Needs
                              </Badge>
                            )}
                            {app.siblingInKindergarten && (
                              <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
                                Sibling
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{app.guardianName}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {app.submittedDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {app.district}
                            </span>
                            <span>ID: {app.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(app.status)}
                          {getPriorityBadge(app.priority)}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openWorkflowDialog(app)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            {t('caseworker.reviewQueue.workflow')}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openPlacementDialog(app)}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            {t('caseworker.reviewQueue.placement')}
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {t('caseworker.reviewQueue.contact')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch">
          <BatchProcessingPanel 
            applications={filteredApplications}
            onBatchAction={handleBatchAction}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>{t('caseworker.reviewQueue.processingAnalytics')}</CardTitle>
              <CardDescription>
                {t('caseworker.reviewQueue.analyticsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>{t('caseworker.reviewQueue.analyticsComingSoon')}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Workflow Dialog */}
      <Dialog open={workflowDialogOpen} onOpenChange={setWorkflowDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('caseworker.reviewQueue.workflowManagement')}</DialogTitle>
            <DialogDescription>
              {t('caseworker.reviewQueue.workflowDescription', { childName: selectedApplication?.childName })}
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <ApplicationWorkflow
              application={selectedApplication}
              onStatusChange={handleStatusChange}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Placement Decision Dialog */}
      <Dialog open={placementDialogOpen} onOpenChange={setPlacementDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('caseworker.reviewQueue.placementDecision')}</DialogTitle>
            <DialogDescription>
              {t('caseworker.reviewQueue.placementDescription', { childName: selectedApplication?.childName })}
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <PlacementDecisionPanel
              application={selectedApplication}
              onPlacementDecision={handlePlacementDecision}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewQueue;
