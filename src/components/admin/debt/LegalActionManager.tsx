
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Scale, FileText, Calendar, DollarSign, User, Download, Upload } from 'lucide-react';
import { DebtRecord, LegalActionType } from '@/types/debt';

interface LegalActionManagerProps {
  debt: DebtRecord;
  onInitiateLegalAction: (debtId: string, actionType: LegalActionType, details: any) => void;
}

const LegalActionManager = ({ debt, onInitiateLegalAction }: LegalActionManagerProps) => {
  const [actionType, setActionType] = useState<LegalActionType>('court_filing');
  const [lawyer, setLawyer] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [notes, setNotes] = useState('');

  const actionTypes = [
    { value: 'court_filing', label: 'Court Filing', description: 'Initial court filing for debt recovery' },
    { value: 'enforcement', label: 'Enforcement', description: 'Court-ordered enforcement action' },
    { value: 'wage_garnishment', label: 'Wage Garnishment', description: 'Garnish wages for debt recovery' },
    { value: 'asset_seizure', label: 'Asset Seizure', description: 'Seize assets to satisfy debt' },
    { value: 'bankruptcy', label: 'Bankruptcy', description: 'File for bankruptcy proceedings' }
  ];

  const availableLawyers = [
    'Advokatfirma Nordström AB',
    'Juridik & Inkasso Stockholm',
    'Legal Services Göteborg',
    'Malmö Rättstjänst AB'
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK'
    }).format(amount);
  };

  const handleInitiate = () => {
    onInitiateLegalAction(debt.id, actionType, {
      lawyer,
      estimatedCost: parseFloat(estimatedCost) || 0,
      notes
    });
  };

  const getLegalCostThreshold = () => {
    // Simple logic: if debt is less than 5000 SEK, legal action might not be cost-effective
    return debt.outstandingAmount >= 5000;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5" />
            Legal Action Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cost-Benefit Analysis */}
          <div className={`p-4 rounded-lg ${getLegalCostThreshold() ? 'bg-green-50' : 'bg-yellow-50'}`}>
            <h3 className="font-medium mb-2">Cost-Benefit Analysis</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Outstanding Amount:</span>
                <div className="font-medium">{formatCurrency(debt.outstandingAmount)}</div>
              </div>
              <div>
                <span className="text-slate-600">Estimated Legal Costs:</span>
                <div className="font-medium">2,500 - 5,000 SEK</div>
              </div>
              <div>
                <span className="text-slate-600">Cost-Effectiveness:</span>
                <Badge className={getLegalCostThreshold() ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {getLegalCostThreshold() ? 'Recommended' : 'Consider Alternatives'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Current Legal Status */}
          {debt.legalAction && (
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Current Legal Status</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Action Type:</span>
                  <div className="font-medium capitalize">{debt.legalAction.actionType.replace('_', ' ')}</div>
                </div>
                <div>
                  <span className="text-slate-600">Filing Date:</span>
                  <div className="font-medium">{new Date(debt.legalAction.filingDate).toLocaleDateString('sv-SE')}</div>
                </div>
                <div>
                  <span className="text-slate-600">Court Reference:</span>
                  <div className="font-medium">{debt.legalAction.courtReference || 'Pending'}</div>
                </div>
                <div>
                  <span className="text-slate-600">Status:</span>
                  <Badge variant="outline" className="capitalize">
                    {debt.legalAction.outcome || 'Pending'}
                  </Badge>
                </div>
                <div>
                  <span className="text-slate-600">Legal Costs:</span>
                  <div className="font-medium">{formatCurrency(debt.legalAction.actualCost || debt.legalAction.estimatedCost)}</div>
                </div>
                <div>
                  <span className="text-slate-600">Recovered Amount:</span>
                  <div className="font-medium">{formatCurrency(debt.legalAction.recoveredAmount || 0)}</div>
                </div>
              </div>
              
              {/* Legal Documents */}
              {debt.legalAction.documents.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Legal Documents</h4>
                  <div className="space-y-2">
                    {debt.legalAction.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm capitalize">{doc.documentType.replace('_', ' ')}</span>
                          <Badge variant="outline" className="text-xs">
                            {doc.filedWithCourt ? 'Filed' : 'Draft'}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Initiate New Legal Action */}
          {!debt.legalAction && (
            <div className="space-y-4">
              <h3 className="font-medium">Initiate Legal Action</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Action Type</label>
                  <Select value={actionType} onValueChange={(value) => setActionType(value as LegalActionType)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {actionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-xs text-slate-600">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Legal Representative</label>
                  <Select value={lawyer} onValueChange={setLawyer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lawyer/firm" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLawyers.map((firm) => (
                        <SelectItem key={firm} value={firm}>
                          {firm}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Estimated Legal Costs (SEK)</label>
                <Input
                  type="number"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                  placeholder="Enter estimated costs"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Legal Action Notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this legal action..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
                <Button 
                  onClick={handleInitiate}
                  disabled={!lawyer || !estimatedCost}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Scale className="w-4 h-4 mr-2" />
                  Initiate Legal Action
                </Button>
              </div>
            </div>
          )}

          {/* Legal Action Timeline */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-3">Legal Process Timeline</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Court Filing:</span>
                <span className="font-medium">1-2 weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Court Review:</span>
                <span className="font-medium">4-6 weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Judgment:</span>
                <span className="font-medium">6-12 weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Enforcement:</span>
                <span className="font-medium">2-4 weeks</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalActionManager;
