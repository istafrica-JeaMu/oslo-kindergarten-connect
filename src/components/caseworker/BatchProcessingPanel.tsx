
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Play, 
  Pause, 
  RotateCcw, 
  Filter, 
  Download,
  Calendar,
  Target,
  CheckCircle
} from 'lucide-react';

interface BatchProcessingProps {
  applications: any[];
  onBatchAction: (applicationIds: string[], action: string) => void;
}

const BatchProcessingPanel = ({ applications, onBatchAction }: BatchProcessingProps) => {
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [batchAction, setBatchAction] = useState('');
  const [processingType, setProcessingType] = useState('main_admission');
  const [simulationMode, setSimulationMode] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const batchActions = [
    { value: 'validate_all', label: 'Validate All Documents' },
    { value: 'prioritize_batch', label: 'Apply Priority Rules' },
    { value: 'run_placement', label: 'Run Placement Algorithm' },
    { value: 'generate_offers', label: 'Generate Offers' },
    { value: 'send_notifications', label: 'Send Notifications' }
  ];

  const admissionPeriods = [
    { value: 'main_admission', label: 'Main Admission Period (August)' },
    { value: 'continuous', label: 'Continuous Admission' },
    { value: 'emergency', label: 'Emergency Placements' }
  ];

  const toggleApplicationSelection = (applicationId: string) => {
    setSelectedApplications(prev => 
      prev.includes(applicationId) 
        ? prev.filter(id => id !== applicationId)
        : [...prev, applicationId]
    );
  };

  const selectAllApplications = () => {
    setSelectedApplications(applications.map(app => app.id));
  };

  const clearSelection = () => {
    setSelectedApplications([]);
  };

  const runBatchProcess = async () => {
    if (!batchAction || selectedApplications.length === 0) return;

    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate processing progress
    for (let i = 0; i <= 100; i += 10) {
      setProcessingProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    onBatchAction(selectedApplications, batchAction);
    setIsProcessing(false);
    setProcessingProgress(0);
  };

  const runSimulation = () => {
    setSimulationMode(!simulationMode);
  };

  const filteredApplications = applications.filter(app => {
    if (processingType === 'emergency') {
      return app.priority === 'high';
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Batch Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Batch Processing Controls
          </CardTitle>
          <CardDescription>
            Process multiple applications simultaneously
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select value={processingType} onValueChange={setProcessingType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {admissionPeriods.map(period => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={batchAction} onValueChange={setBatchAction}>
              <SelectTrigger>
                <SelectValue placeholder="Select batch action" />
              </SelectTrigger>
              <SelectContent>
                {batchActions.map(action => (
                  <SelectItem key={action.value} value={action.value}>
                    {action.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="simulation"
                checked={simulationMode}
                onCheckedChange={setSimulationMode}
              />
              <label htmlFor="simulation" className="text-sm">
                Simulation Mode (Preview Results)
              </label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={selectAllApplications}
              variant="outline"
              size="sm"
            >
              Select All ({filteredApplications.length})
            </Button>
            <Button 
              onClick={clearSelection}
              variant="outline"
              size="sm"
            >
              Clear Selection
            </Button>
            <Button 
              onClick={runSimulation}
              variant={simulationMode ? 'default' : 'outline'}
              size="sm"
            >
              <Target className="h-4 w-4 mr-2" />
              {simulationMode ? 'Exit Simulation' : 'Run Simulation'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Processing Progress */}
      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing {selectedApplications.length} applications...</span>
                <span>{processingProgress}%</span>
              </div>
              <Progress value={processingProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Application Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Application Selection</span>
            <Badge variant="secondary">
              {selectedApplications.length} of {filteredApplications.length} selected
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredApplications.map((app) => (
              <div 
                key={app.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedApplications.includes(app.id)}
                    onCheckedChange={() => toggleApplicationSelection(app.id)}
                  />
                  <div>
                    <div className="font-medium">{app.childName}</div>
                    <div className="text-sm text-gray-500">{app.id}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={app.priority === 'high' ? 'destructive' : 'secondary'}>
                    {app.priority}
                  </Badge>
                  <Badge variant="outline">
                    {app.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Execute Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Button 
              onClick={runBatchProcess}
              disabled={!batchAction || selectedApplications.length === 0 || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Execute Batch Action
                </>
              )}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Results */}
      {simulationMode && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Simulation Results</CardTitle>
            <CardDescription className="text-blue-600">
              Preview of batch processing outcomes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600">Successfully Placed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">12%</div>
                <div className="text-sm text-gray-600">Waitlisted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">3%</div>
                <div className="text-sm text-gray-600">Require Review</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BatchProcessingPanel;
