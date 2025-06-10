
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileCheck, 
  Users, 
  Target,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

interface WorkflowProps {
  application: any;
  onStatusChange: (applicationId: string, newStatus: string, reason?: string) => void;
}

const ApplicationWorkflow = ({ application, onStatusChange }: WorkflowProps) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [reasonCode, setReasonCode] = useState('');
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const workflowStages = {
    new: {
      title: 'Initial Review',
      icon: Clock,
      color: 'blue',
      actions: ['validate', 'prioritize', 'flag']
    },
    underReview: {
      title: 'Under Review',
      icon: FileCheck,
      color: 'yellow',
      actions: ['approve', 'reject', 'requestDocs', 'escalate']
    },
    missingDocuments: {
      title: 'Missing Documents',
      icon: AlertTriangle,
      color: 'red',
      actions: ['documentReceived', 'withdraw', 'extend']
    },
    validated: {
      title: 'Validated',
      icon: CheckCircle,
      color: 'green',
      actions: ['placement', 'waitlist']
    }
  };

  const actionLabels = {
    validate: 'Validate Documents',
    prioritize: 'Set Priority',
    flag: 'Flag for Review',
    approve: 'Approve Application',
    reject: 'Reject Application',
    requestDocs: 'Request Documents',
    escalate: 'Escalate to Supervisor',
    documentReceived: 'Documents Received',
    withdraw: 'Withdraw Application',
    extend: 'Extend Deadline',
    placement: 'Process Placement',
    waitlist: 'Add to Waitlist'
  };

  const reasonCodes = {
    approve: [
      'FIRST_CHOICE_AVAILABLE',
      'SIBLING_PRIORITY',
      'VULNERABLE_CHILD',
      'DISTRICT_RESIDENT'
    ],
    reject: [
      'INCOMPLETE_DOCUMENTATION',
      'OUTSIDE_CATCHMENT',
      'AGE_REQUIREMENT_NOT_MET',
      'DUPLICATE_APPLICATION'
    ],
    waitlist: [
      'NO_CAPACITY_PREFERRED',
      'WAITING_HIGHER_PRIORITY',
      'LATE_APPLICATION'
    ]
  };

  const priorityRules = [
    { id: 'sibling', label: 'Sibling Priority', weight: 5 },
    { id: 'vulnerable', label: 'Vulnerable Child', weight: 4 },
    { id: 'single_parent', label: 'Single Parent', weight: 3 },
    { id: 'district_resident', label: 'District Resident', weight: 2 },
    { id: 'employment', label: 'Both Parents Working', weight: 1 }
  ];

  const handleAction = () => {
    if (!selectedAction) return;
    
    setShowConfirmation(true);
  };

  const confirmAction = () => {
    onStatusChange(application.id, selectedAction, reasonCode);
    setShowConfirmation(false);
    setSelectedAction('');
    setReasonCode('');
    setNotes('');
  };

  const currentStage = workflowStages[application.status] || workflowStages.new;
  const StageIcon = currentStage.icon;

  return (
    <div className="space-y-6">
      {/* Current Stage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-${currentStage.color}-100`}>
              <StageIcon className={`h-5 w-5 text-${currentStage.color}-600`} />
            </div>
            Current Stage: {currentStage.title}
          </CardTitle>
          <CardDescription>
            Application ID: {application.id}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Priority Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Priority Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {priorityRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">{rule.label}</span>
                <Badge variant={application.specialNeeds && rule.id === 'vulnerable' ? 'default' : 'outline'}>
                  Weight: {rule.weight}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Validation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Document Validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {['Birth Certificate', 'Proof of Residence', 'Income Documentation', 'Employment Verification', 'Medical Records'].map((doc) => (
              <div key={doc} className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">{doc}</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            Available Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedAction} onValueChange={setSelectedAction}>
            <SelectTrigger>
              <SelectValue placeholder="Select an action" />
            </SelectTrigger>
            <SelectContent>
              {currentStage.actions.map((action) => (
                <SelectItem key={action} value={action}>
                  {actionLabels[action as keyof typeof actionLabels]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedAction && reasonCodes[selectedAction as keyof typeof reasonCodes] && (
            <Select value={reasonCode} onValueChange={setReasonCode}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason code" />
              </SelectTrigger>
              <SelectContent>
                {reasonCodes[selectedAction as keyof typeof reasonCodes].map((code) => (
                  <SelectItem key={code} value={code}>
                    {code.replace(/_/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Textarea
            placeholder="Add notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />

          <Button 
            onClick={handleAction}
            disabled={!selectedAction}
            className="w-full"
          >
            Execute Action
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800">Confirm Action</CardTitle>
            <CardDescription>
              Are you sure you want to {actionLabels[selectedAction as keyof typeof actionLabels]}?
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button onClick={confirmAction} variant="default">
              Confirm
            </Button>
            <Button onClick={() => setShowConfirmation(false)} variant="outline">
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationWorkflow;
