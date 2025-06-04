
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
  CheckCircle
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

            <Button 
              onClick={onApplyClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
              size="lg"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Apply for Reduction
            </Button>
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
