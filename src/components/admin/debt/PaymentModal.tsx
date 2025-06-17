
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard, DollarSign } from 'lucide-react';
import { DebtRecord } from '@/types/debt';

interface PaymentModalProps {
  debt: DebtRecord;
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ debt, isOpen, onClose }: PaymentModalProps) => {
  const [paymentAmount, setPaymentAmount] = useState(debt.outstandingAmount);
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');

  const handleRecordPayment = () => {
    console.log('Recording payment:', {
      debtId: debt.id,
      amount: paymentAmount,
      method: paymentMethod,
      reference: referenceNumber,
      notes
    });
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK'
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Record Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Debt Info */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-medium text-slate-900 mb-2">Debt Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Guardian:</span>
                <span className="font-medium">{debt.guardian.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Child:</span>
                <span className="font-medium">{debt.child.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Outstanding:</span>
                <span className="font-medium text-red-600">{formatCurrency(debt.outstandingAmount)}</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Payment Amount (SEK)</label>
              <Input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                min="0"
                max={debt.outstandingAmount}
                step="0.01"
              />
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPaymentAmount(debt.outstandingAmount)}
                >
                  Full Amount
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPaymentAmount(debt.outstandingAmount / 2)}
                >
                  Half Amount
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Payment Method</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="direct_debit">Direct Debit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Reference Number</label>
              <Input
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Transaction reference or receipt number"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Notes</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes about this payment"
                rows={3}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-900 mb-2">Payment Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Payment Amount:</span>
                <span className="font-medium">{formatCurrency(paymentAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Remaining Balance:</span>
                <span className="font-medium">
                  {formatCurrency(debt.outstandingAmount - paymentAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleRecordPayment}
              className="bg-green-600 hover:bg-green-700"
              disabled={paymentAmount <= 0 || paymentAmount > debt.outstandingAmount}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
