
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTranslation } from 'react-i18next';
import FeeReductionModal from '@/components/FeeReductionModal';
import { 
  CreditCard, 
  Download, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  DollarSign,
  FileText,
  Info,
  Plus,
  ExternalLink
} from 'lucide-react';

const Payments = () => {
  const { t } = useTranslation();
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showFeeReductionModal, setShowFeeReductionModal] = useState(false);

  // Mock payment data
  const paymentSummary = {
    currentBalance: 4440, // Outstanding balance for unpaid invoices
    nextPaymentDue: '2024-05-01',
    monthlyFeeAfterReduction: 2220,
    totalSavedThisYear: 12210,
    reductionApproved: true
  };

  const invoices = [
    {
      id: 'INV-2024-003',
      month: 'March 2024',
      child: 'Oliver Hansen',
      kindergarten: 'Sinsen Kindergarten',
      originalAmount: 3330,
      reduction: 1110,
      amountDue: 2220,
      dueDate: '2024-04-01',
      status: 'paid',
      paidDate: '2024-03-28',
      invoiceDate: '2024-03-01',
      paymentMethod: 'Bank Transfer',
      referenceNumber: 'REF-240328-001'
    },
    {
      id: 'INV-2024-004',
      month: 'April 2024',
      child: 'Oliver Hansen',
      kindergarten: 'Sinsen Kindergarten',
      originalAmount: 3330,
      reduction: 1110,
      amountDue: 2220,
      dueDate: '2024-05-01',
      status: 'due',
      invoiceDate: '2024-04-01',
      paymentMethod: '-',
      referenceNumber: 'INV-2024-004'
    },
    {
      id: 'INV-2024-005',
      month: 'May 2024',
      child: 'Oliver Hansen',
      kindergarten: 'Sinsen Kindergarten',
      originalAmount: 3330,
      reduction: 1110,
      amountDue: 2220,
      dueDate: '2024-06-01',
      status: 'pending',
      invoiceDate: '2024-05-01',
      paymentMethod: '-',
      referenceNumber: 'INV-2024-005'
    }
  ];

  const paymentInfo = [
    'Payment is due by the 1st of each month',
    'Late payments may result in additional fees',
    'Income-based reductions are reviewed annually',
    'Contact us immediately if you cannot make payment',
    'Electronic invoices are sent via Altinn'
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-300">{t('common.status.paid')}</Badge>;
      case 'due':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">{t('common.status.due')}</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-300">{t('common.status.overdue')}</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">{t('common.status.pending')}</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('guardian.payments.title')}</h1>
        <p className="text-gray-600 mt-2">{t('guardian.payments.description')}</p>
      </div>

      {/* Enhanced Payment Summary */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0 bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-red-600 font-medium">Outstanding Balance</p>
                <p className="text-2xl font-bold text-red-700">
                  {formatCurrency(paymentSummary.currentBalance)}
                </p>
                <p className="text-xs text-red-600">Due: {paymentSummary.nextPaymentDue}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Fee</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(paymentSummary.monthlyFeeAfterReduction)}
                </p>
                <p className="text-xs text-gray-500">After reduction</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('guardian.payments.savedReduction')}</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(paymentSummary.totalSavedThisYear)}
                </p>
                <p className="text-xs text-gray-500">This year</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Due Date</p>
                <p className="text-lg font-bold text-gray-900">
                  {paymentSummary.nextPaymentDue}
                </p>
                <p className="text-xs text-gray-500">5 days remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reduction Approved Alert */}
      {paymentSummary.reductionApproved && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <h4 className="text-green-800 font-semibold">{t('guardian.payments.reducedPayment')}</h4>
            <AlertDescription className="text-green-700">
              {t('guardian.payments.applicationApproved')}
            </AlertDescription>
          </div>
        </Alert>
      )}

      {/* Fee Reduction Application */}
      {!paymentSummary.reductionApproved && (
        <Card className="shadow-lg border-0 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-blue-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                Apply for Fee Reduction
              </div>
              <Button
                onClick={() => setShowFeeReductionModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Apply Now
              </Button>
            </CardTitle>
            <CardDescription className="text-blue-700">
              You may be eligible for income-based fee reduction. Submit your household income for automatic verification.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Payment History Table */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
              <FileText className="h-5 w-5 text-oslo-blue" />
            </div>
            Payment History
          </CardTitle>
          <CardDescription>
            Complete overview of all invoices and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Original Amount</TableHead>
                <TableHead>Final Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.month}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="line-through text-gray-500 text-sm">
                        {formatCurrency(invoice.originalAmount)}
                      </span>
                      {invoice.reduction > 0 && (
                        <span className="text-green-600 text-xs">
                          -{formatCurrency(invoice.reduction)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(invoice.amountDue)}
                  </TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="font-mono text-sm">{invoice.referenceNumber}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {invoice.status === 'due' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Pay Now
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card className="shadow-lg border-0 bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-800">
            <Info className="h-5 w-5" />
            {t('guardian.payments.paymentInfo')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-blue-700">
            {paymentInfo.map((info, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span className="text-sm">{info}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <FeeReductionModal
        open={showFeeReductionModal}
        onOpenChange={setShowFeeReductionModal}
      />
    </div>
  );
};

export default Payments;
