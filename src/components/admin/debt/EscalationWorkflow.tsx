
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Clock, AlertTriangle, Scale, FileText, Ban } from 'lucide-react';
import { DebtRecord, EscalationLevel, CollectionStrategy } from '@/types/debt';

interface EscalationWorkflowProps {
  debt: DebtRecord;
  onEscalate: (debtId: string, level: EscalationLevel, strategy: CollectionStrategy, notes: string) => void;
}

const EscalationWorkflow = ({ debt, onEscalate }: EscalationWorkflowProps) => {
  const [selectedLevel, setSelectedLevel] = useState<EscalationLevel>(debt.escalationLevel);
  const [selectedStrategy, setSelectedStrategy] = useState<CollectionStrategy>(debt.collectionStrategy);
  const [notes, setNotes] = useState('');

  const escalationSteps = [
    { level: 'early_warning', label: 'Early Warning', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    { level: 'first_notice', label: 'First Notice', icon: AlertTriangle, color: 'bg-orange-100 text-orange-800' },
    { level: 'final_notice', label: 'Final Notice', icon: AlertTriangle, color: 'bg-red-100 text-red-800' },
    { level: 'collection_agency', label: 'Collection Agency', icon: FileText, color: 'bg-purple-100 text-purple-800' },
    { level: 'legal_action', label: 'Legal Action', icon: Scale, color: 'bg-gray-100 text-gray-800' },
    { level: 'write_off', label: 'Write Off', icon: Ban, color: 'bg-gray-100 text-gray-600' }
  ];

  const strategies = [
    { value: 'gentle', label: 'Gentle Approach', description: 'Soft reminders, payment plan focus' },
    { value: 'standard', label: 'Standard Process', description: 'Regular collection procedures' },
    { value: 'aggressive', label: 'Aggressive Collection', description: 'Frequent contact, firm language' },
    { value: 'legal_only', label: 'Legal Only', description: 'Skip collection, proceed to legal' },
    { value: 'hardship_sensitive', label: 'Hardship Sensitive', description: 'Special consideration approach' }
  ];

  const getCurrentStepIndex = () => {
    return escalationSteps.findIndex(step => step.level === debt.escalationLevel);
  };

  const getNextStepIndex = () => {
    return escalationSteps.findIndex(step => step.level === selectedLevel);
  };

  const handleEscalate = () => {
    onEscalate(debt.id, selectedLevel, selectedStrategy, notes);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRight className="w-5 h-5" />
          Escalation Workflow
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Current Status</h3>
          <div className="flex items-center gap-4">
            <Badge className="bg-blue-100 text-blue-800">
              {escalationSteps.find(s => s.level === debt.escalationLevel)?.label}
            </Badge>
            <Badge variant="outline">
              {debt.collectionStrategy.replace('_', ' ').toUpperCase()}
            </Badge>
            <span className="text-sm text-slate-600">
              {debt.daysOverdue} days overdue
            </span>
          </div>
        </div>

        {/* Escalation Timeline */}
        <div>
          <h3 className="font-medium mb-3">Escalation Timeline</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {escalationSteps.map((step, index) => {
              const Icon = step.icon;
              const current = index === getCurrentStepIndex();
              const completed = index < getCurrentStepIndex();
              const next = index === getNextStepIndex();
              
              return (
                <div key={step.level} className="flex items-center gap-2">
                  <div className={`
                    p-2 rounded-full border-2 flex items-center gap-1 min-w-fit
                    ${current ? 'border-blue-500 bg-blue-50' : ''}
                    ${completed ? 'border-green-500 bg-green-50' : ''}
                    ${next && !current ? 'border-orange-500 bg-orange-50' : ''}
                    ${!current && !completed && !next ? 'border-slate-300 bg-slate-50' : ''}
                  `}>
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{step.label}</span>
                  </div>
                  {index < escalationSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Escalation Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Escalate to Level</label>
            <Select value={selectedLevel} onValueChange={(value) => setSelectedLevel(value as EscalationLevel)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {escalationSteps.map((step) => (
                  <SelectItem key={step.level} value={step.level}>
                    {step.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Collection Strategy</label>
            <Select value={selectedStrategy} onValueChange={(value) => setSelectedStrategy(value as CollectionStrategy)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {strategies.map((strategy) => (
                  <SelectItem key={strategy.value} value={strategy.value}>
                    <div>
                      <div className="font-medium">{strategy.label}</div>
                      <div className="text-xs text-slate-600">{strategy.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-medium text-green-900 mb-2">AI Recommendations</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Payment Likelihood:</span>
              <span className="font-medium">{debt.aiPredictions.paymentLikelihood}%</span>
            </div>
            <div className="flex justify-between">
              <span>Recommended Strategy:</span>
              <span className="font-medium capitalize">{debt.aiPredictions.recommendedStrategy.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span>Est. Recovery:</span>
              <span className="font-medium">{new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(debt.aiPredictions.estimatedRecoveryAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Time to Resolution:</span>
              <span className="font-medium">{debt.aiPredictions.timeToResolution} days</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium mb-2 block">Escalation Notes</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this escalation decision..."
            rows={3}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">
            Schedule for Later
          </Button>
          <Button 
            onClick={handleEscalate}
            disabled={selectedLevel === debt.escalationLevel && selectedStrategy === debt.collectionStrategy}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Execute Escalation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscalationWorkflow;
