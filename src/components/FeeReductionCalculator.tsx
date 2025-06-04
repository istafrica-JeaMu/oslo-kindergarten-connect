
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  TrendingDown, 
  DollarSign,
  Info,
  CheckCircle,
  Shield,
  Clock,
  Sparkles,
  ArrowRight,
  Loader2
} from 'lucide-react';

interface FeeReductionCalculatorProps {
  onApplyClick: () => void;
  currentFee: number;
}

const FeeReductionCalculator = ({ onApplyClick, currentFee }: FeeReductionCalculatorProps) => {
  const [income, setIncome] = useState('');
  const [isEligible, setIsEligible] = useState(false);
  const [calculatedFee, setCalculatedFee] = useState(0);
  const [monthlyReduction, setMonthlyReduction] = useState(0);
  const [annualSavings, setAnnualSavings] = useState(0);
  const [isApplying, setIsApplying] = useState(false);

  const calculateReduction = (householdIncome: number) => {
    // Norwegian kindergarten fee reduction calculation (simplified)
    // Fees are reduced based on income thresholds
    let newFee = currentFee;
    
    if (householdIncome <= 400000) {
      newFee = Math.max(1640, currentFee * 0.5); // 50% reduction, minimum 1640 NOK
    } else if (householdIncome <= 500000) {
      newFee = Math.max(1840, currentFee * 0.6); // 40% reduction
    } else if (householdIncome <= 600000) {
      newFee = Math.max(2220, currentFee * 0.7); // 30% reduction
    } else if (householdIncome <= 700000) {
      newFee = Math.max(2500, currentFee * 0.8); // 20% reduction
    }
    
    return Math.round(newFee);
  };

  const handleIncomeChange = (value: string) => {
    setIncome(value);
    
    if (value && !isNaN(Number(value))) {
      const householdIncome = Number(value);
      const newFee = calculateReduction(householdIncome);
      const reduction = currentFee - newFee;
      
      if (reduction > 0) {
        setIsEligible(true);
        setCalculatedFee(newFee);
        setMonthlyReduction(reduction);
        setAnnualSavings(reduction * 12);
      } else {
        setIsEligible(false);
        setCalculatedFee(currentFee);
        setMonthlyReduction(0);
        setAnnualSavings(0);
      }
    } else {
      setIsEligible(false);
      setCalculatedFee(0);
      setMonthlyReduction(0);
      setAnnualSavings(0);
    }
  };

  const handleApplyClick = async () => {
    setIsApplying(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsApplying(false);
      onApplyClick();
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: 'NOK',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-green-800">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <TrendingDown className="h-5 w-5 text-green-600" />
          </div>
          Fee Reduction Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="calculator-income" className="text-sm font-medium text-green-800">
            Total Household Income (NOK)
          </Label>
          <Input
            id="calculator-income"
            type="number"
            placeholder="e.g., 450000"
            value={income}
            onChange={(e) => handleIncomeChange(e.target.value)}
            className="border-green-200 focus:border-green-400 focus:ring-green-400"
          />
          <p className="text-xs text-green-600">
            Enter your annual household income before taxes to see potential savings
          </p>
        </div>

        {income && isEligible && (
          <div className="bg-white/60 rounded-xl p-4 space-y-4 border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">You may be eligible!</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-green-600">Current Fee:</p>
                <p className="font-bold text-gray-800">{formatCurrency(currentFee)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-green-600">Potential New Fee:</p>
                <p className="font-bold text-green-700">{formatCurrency(calculatedFee)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-green-600">Monthly Savings:</p>
                <p className="font-bold text-green-700">{formatCurrency(monthlyReduction)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-green-600">Annual Savings:</p>
                <p className="font-bold text-green-700">{formatCurrency(annualSavings)}</p>
              </div>
            </div>

            {/* Enhanced Apply Button */}
            <div className="space-y-3 mt-6">
              <Button 
                onClick={handleApplyClick}
                disabled={isApplying}
                className="w-full h-14 bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 hover:from-green-700 hover:via-green-800 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base font-semibold relative overflow-hidden group"
                size="lg"
              >
                {isApplying ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing Application...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">Apply for Reduction</div>
                        <div className="text-xs text-green-100">Save {formatCurrency(annualSavings)}/year</div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Button>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center gap-1 text-green-700 bg-green-50 rounded-lg p-2">
                  <Shield className="h-3 w-3" />
                  <span className="font-medium">Secure</span>
                </div>
                <div className="flex items-center gap-1 text-green-700 bg-green-50 rounded-lg p-2">
                  <Clock className="h-3 w-3" />
                  <span className="font-medium">5-7 days</span>
                </div>
                <div className="flex items-center gap-1 text-green-700 bg-green-50 rounded-lg p-2">
                  <CheckCircle className="h-3 w-3" />
                  <span className="font-medium">Free</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-green-100/60 rounded-lg p-3 border border-green-200">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-green-700 space-y-1">
                    <p className="font-medium">✓ Government verified process</p>
                    <p>✓ Automatic income verification with Tax Administration</p>
                    <p>✓ No paperwork required - all done digitally</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {income && !isEligible && (
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">No reduction available</span>
            </div>
            <p className="text-sm text-blue-700">
              Based on your income, you may not be eligible for a fee reduction at this time.
            </p>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <p className="text-xs text-blue-700">
            <Info className="h-4 w-4 inline mr-1" />
            Fee reductions are based on household income and updated annually. 
            This is an estimate - final decisions are made by the municipality.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeeReductionCalculator;
