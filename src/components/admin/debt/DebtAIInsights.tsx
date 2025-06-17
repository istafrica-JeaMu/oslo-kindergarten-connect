
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, TrendingUp, Shield, AlertTriangle, Target, Clock } from 'lucide-react';
import { DebtRecord } from '@/types/debt';

interface DebtAIInsightsProps {
  debt: DebtRecord;
}

const DebtAIInsights = ({ debt }: DebtAIInsightsProps) => {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getPaymentLikelihoodColor = (likelihood: number) => {
    if (likelihood >= 80) return 'text-green-600';
    if (likelihood >= 60) return 'text-yellow-600';
    if (likelihood >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI-Powered Debt Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Prediction */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <h3 className="font-medium">Payment Likelihood</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Probability</span>
                  <span className={`font-bold ${getPaymentLikelihoodColor(debt.aiPredictions.paymentLikelihood)}`}>
                    {debt.aiPredictions.paymentLikelihood}%
                  </span>
                </div>
                <Progress value={debt.aiPredictions.paymentLikelihood} className="h-2" />
                <div className="text-xs text-slate-500">
                  Based on payment history, guardian behavior, and debt characteristics
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <h3 className="font-medium">Recovery Estimate</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Expected Amount</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(debt.aiPredictions.estimatedRecoveryAmount)}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {Math.round((debt.aiPredictions.estimatedRecoveryAmount / debt.outstandingAmount) * 100)}% of outstanding amount
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-orange-600" />
                <h3 className="font-medium">Fraud Risk</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Risk Score</span>
                  <Badge className={getRiskColor(debt.guardian.fraudRiskScore)}>
                    {debt.guardian.fraudRiskScore}/100
                  </Badge>
                </div>
                <Progress value={debt.guardian.fraudRiskScore} className="h-2" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-purple-600" />
                <h3 className="font-medium">Hardship Risk</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Risk Score</span>
                  <Badge className={getRiskColor(debt.aiPredictions.hardshipRisk)}>
                    {debt.aiPredictions.hardshipRisk}/100
                  </Badge>
                </div>
                <Progress value={debt.aiPredictions.hardshipRisk} className="h-2" />
              </div>
            </div>
          </div>

          {/* Timing Recommendations */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-blue-600" />
              <h3 className="font-medium text-blue-900">Optimal Contact Strategy</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-800 font-medium">Best Contact Time:</span>
                <div className="text-blue-700">{debt.aiPredictions.optimalContactTime}</div>
              </div>
              <div>
                <span className="text-blue-800 font-medium">Recommended Strategy:</span>
                <div className="text-blue-700 capitalize">
                  {debt.aiPredictions.recommendedStrategy.replace('_', ' ')}
                </div>
              </div>
              <div>
                <span className="text-blue-800 font-medium">Time to Resolution:</span>
                <div className="text-blue-700">{debt.aiPredictions.timeToResolution} days</div>
              </div>
              <div>
                <span className="text-blue-800 font-medium">Payment Behavior:</span>
                <div className="text-blue-700 capitalize">
                  {debt.guardian.paymentBehaviorPattern.replace('_', ' ')}
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Alerts */}
          {debt.complianceFlags.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Compliance Alerts
              </h3>
              {debt.complianceFlags.map((flag) => (
                <Alert key={flag.id} className="border-red-200">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{flag.description}</div>
                        <div className="text-xs text-slate-600 mt-1">
                          Flagged: {new Date(flag.flaggedDate).toLocaleDateString('sv-SE')}
                        </div>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        {flag.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          {/* Guardian Risk Profile */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Guardian Risk Profile</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Overall Risk Score:</span>
                <div className="font-medium">{debt.guardian.riskScore}/100</div>
              </div>
              <div>
                <span className="text-slate-600">Payment History:</span>
                <div className="font-medium">{debt.guardian.paymentHistory.length} transactions</div>
              </div>
              <div>
                <span className="text-slate-600">Hardship Status:</span>
                <Badge variant="outline" className="capitalize">
                  {debt.guardian.hardshipStatus || 'None'}
                </Badge>
              </div>
              <div>
                <span className="text-slate-600">Last Contact:</span>
                <div className="font-medium">
                  {debt.guardian.lastContactDate ? 
                    new Date(debt.guardian.lastContactDate).toLocaleDateString('sv-SE') : 
                    'Never'
                  }
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebtAIInsights;
