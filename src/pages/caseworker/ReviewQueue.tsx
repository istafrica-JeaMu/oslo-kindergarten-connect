import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
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
  Play,
  Plus,
  FileDown,
  Mail,
  Star,
  TrendingUp,
  Zap,
  ArrowRight
} from 'lucide-react';

// Import the new workflow components
import ApplicationWorkflow from '@/components/caseworker/ApplicationWorkflow';
import BatchProcessingPanel from '@/components/caseworker/BatchProcessingPanel';
import PlacementDecisionPanel from '@/components/caseworker/PlacementDecisionPanel';

const ReviewQueue = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);
  const [placementDialogOpen, setPlacementDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('queue');
  const [isLoading, setIsLoading] = useState(false);

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
    toast.success('Filters cleared');
  };

  // Enhanced workflow handlers with loading states and feedback
  const handleStatusChange = async (applicationId: string, newStatus: string, reason?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Changing status for ${applicationId} to ${newStatus}`, reason);
      toast.success(`Application status updated to ${newStatus}`);
      setWorkflowDialogOpen(false);
    } catch (error) {
      toast.error('Failed to update application status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBatchAction = async (applicationIds: string[], action: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Batch action ${action} for applications:`, applicationIds);
      toast.success(`Batch action "${action}" completed for ${applicationIds.length} applications`);
    } catch (error) {
      toast.error('Failed to execute batch action');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlacementDecision = async (applicationId: string, decision: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Placement decision for ${applicationId}:`, decision);
      toast.success('Placement decision saved successfully');
      setPlacementDialogOpen(false);
    } catch (error) {
      toast.error('Failed to save placement decision');
    } finally {
      setIsLoading(false);
    }
  };

  const openWorkflowDialog = (application: any) => {
    setSelectedApplication(application);
    setWorkflowDialogOpen(true);
  };

  const openPlacementDialog = (application: any) => {
    setSelectedApplication(application);
    setPlacementDialogOpen(true);
  };

  // Enhanced Quick Action handlers
  const handleQuickAction = async (action: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      switch (action) {
        case 'review':
          toast.success('Redirecting to applications review...');
          break;
        case 'manage':
          toast.success('Opening placement management...');
          break;
        case 'message':
          toast.success('Opening message composer...');
          break;
        case 'report':
          toast.success('Generating reports...');
          break;
        default:
          toast.info(`Executing ${action}...`);
      }
    } catch (error) {
      toast.error(`Failed to execute ${action}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactGuardian = (app: any) => {
    toast.success(`Opening message to ${app.guardianName}...`);
    // Here you would typically navigate to the messages page with pre-filled recipient
  };

  const handleApplicationClick = (applicationId: string) => {
    navigate(`/caseworker/application/${applicationId}`);
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('caseworker.reviewQueue.title')}</h1>
            <p className="text-lg text-gray-600">{t('caseworker.reviewQueue.description')}</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => handleQuickAction('report')} 
              variant="outline"
              className="gap-2"
              disabled={isLoading}
            >
              <FileDown className="h-4 w-4" />
              Export Data
            </Button>
            <Button 
              onClick={() => handleQuickAction('message')} 
              className="gap-2"
              disabled={isLoading}
            >
              <Plus className="h-4 w-4" />
              New Action
            </Button>
          </div>
        </div>

        {/* Enhanced Quick Actions Panel */}
        <Card className="bg-gradient-to-r from-oslo-blue/5 to-oslo-green/5 border-oslo-blue/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-oslo-blue">
              <Zap className="h-5 w-5" />
              {t('caseworker.reviewQueue.quickActions')}
            </CardTitle>
            <CardDescription>
              {t('caseworker.reviewQueue.quickActionsDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                onClick={() => handleQuickAction('review')}
                variant="outline" 
                className="h-20 flex-col gap-2 hover:bg-oslo-blue/10 border-oslo-blue/20"
                disabled={isLoading}
              >
                <FileText className="h-6 w-6 text-oslo-blue" />
                <span className="text-sm font-medium">{t('caseworker.reviewQueue.bulkReview')}</span>
              </Button>
              <Button 
                onClick={() => handleQuickAction('manage')}
                variant="outline" 
                className="h-20 flex-col gap-2 hover:bg-oslo-green/10 border-oslo-green/20"
                disabled={isLoading}
              >
                <Users className="h-6 w-6 text-oslo-green" />
                <span className="text-sm font-medium">{t('caseworker.reviewQueue.requestDocuments')}</span>
              </Button>
              <Button 
                onClick={() => handleQuickAction('message')}
                variant="outline" 
                className="h-20 flex-col gap-2 hover:bg-purple-100 border-purple-200"
                disabled={isLoading}
              >
                <Mail className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-medium">{t('caseworker.reviewQueue.contactGuardians')}</span>
              </Button>
              <Button 
                onClick={() => handleQuickAction('report')}
                variant="outline" 
                className="h-20 flex-col gap-2 hover:bg-orange-100 border-orange-200"
                disabled={isLoading}
              >
                <TrendingUp className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-medium">{t('caseworker.reviewQueue.approveApplications')}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Statistics with Professional Design */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* Total Applications Card */}
        <Card className="relative overflow-hidden border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-blue-100/20" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.total}</div>
                <div className="text-sm font-medium text-slate-600">{t('caseworker.reviewQueue.totalApplications')}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Applications Card */}
        <Card className="relative overflow-hidden border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50/30 to-green-100/20" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.new}</div>
                <div className="text-sm font-medium text-slate-600">{t('caseworker.reviewQueue.new')}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-green-100 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(stats.new / stats.total) * 100}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Under Review Card */}
        <Card className="relative overflow-hidden border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50/30 to-yellow-100/20" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.underReview}</div>
                <div className="text-sm font-medium text-slate-600">{t('caseworker.reviewQueue.underReview')}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-yellow-100 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${(stats.underReview / stats.total) * 100}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Missing Documents Card */}
        <Card className="relative overflow-hidden border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-rose-50/30 to-red-100/20" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.missingDocs}</div>
                <div className="text-sm font-medium text-slate-600">{t('caseworker.reviewQueue.missingDocs')}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-red-100 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: `${(stats.missingDocs / stats.total) * 100}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Processing Card */}
        <Card className="relative overflow-hidden border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-violet-50/30 to-purple-100/20" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.avgProcessing}d</div>
                <div className="text-sm font-medium text-slate-600">{t('caseworker.reviewQueue.avgProcessing')}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-purple-100 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-14 bg-gray-100 p-1">
          <TabsTrigger value="queue" className="flex items-center gap-2 h-12 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <FileText className="h-4 w-4" />
            {t('caseworker.reviewQueue.applicationQueue')}
          </TabsTrigger>
          <TabsTrigger value="batch" className="flex items-center gap-2 h-12 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Users className="h-4 w-4" />
            {t('caseworker.reviewQueue.batchProcessing')}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 h-12 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <BarChart3 className="h-4 w-4" />
            {t('caseworker.reviewQueue.analytics')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          {/* Enhanced Filters */}
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

          {/* Enhanced Applications List */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5" />
                  {t('caseworker.reviewQueue.applications')} ({filteredApplications.length})
                </div>
                <Badge variant="outline" className="text-sm">
                  {filteredApplications.length} of {applications.length}
                </Badge>
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
                    className="group p-6 border border-gray-200 rounded-xl hover:border-oslo-blue/30 hover:bg-gray-50/50 transition-all hover:shadow-md cursor-pointer"
                    onClick={() => handleApplicationClick(app.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-oslo-blue/20 to-oslo-blue/10 rounded-xl flex items-center justify-center">
                          <User className="h-7 w-7 text-oslo-blue" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900 text-lg group-hover:text-oslo-blue transition-colors">{app.childName}</h4>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {app.childAge} years
                            </span>
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
                          <p className="text-gray-700 font-medium mb-1">{app.guardianName}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {app.submittedDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {app.district}
                            </span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">ID: {app.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-3">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(app.status)}
                          {getPriorityBadge(app.priority)}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              openWorkflowDialog(app);
                            }}
                            className="gap-2 hover:bg-oslo-blue hover:text-white transition-colors"
                            disabled={isLoading}
                          >
                            <Settings className="h-4 w-4" />
                            {t('caseworker.reviewQueue.workflow')}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              openPlacementDialog(app);
                            }}
                            className="gap-2 hover:bg-oslo-green hover:text-white transition-colors"
                            disabled={isLoading}
                          >
                            <Play className="h-4 w-4" />
                            {t('caseworker.reviewQueue.placement')}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleContactGuardian(app);
                            }}
                            className="gap-2 hover:bg-purple-600 hover:text-white transition-colors"
                            disabled={isLoading}
                          >
                            <MessageSquare className="h-4 w-4" />
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
