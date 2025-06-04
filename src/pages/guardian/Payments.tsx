import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';
import FeeReductionModal from '@/components/FeeReductionModal';
import FeeReductionCalculator from '@/components/FeeReductionCalculator';
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
  ExternalLink,
  TrendingUp,
  Clock,
  AlertCircle,
  TrendingDown,
  Wallet,
  MoreHorizontal
} from 'lucide-react';

const Payments = () => {
  const { t } = useTranslation();
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showFeeReductionModal, setShowFeeReductionModal] = useState(false);
  const [timeUntilDue, setTimeUntilDue] = useState<{ days: number; hours: number; minutes: number }>({ days: 0, hours: 0, minutes: 0 });

  // Mock payment data
  const paymentSummary = {
    currentBalance: 4440, // Outstanding balance for unpaid invoices
    nextPaymentDue: '2024-05-01',
    monthlyFeeAfterReduction: 2220,
    originalMonthlyFee: 3330,
    totalSavedThisYear: 12210,
    reductionApproved: true,
    totalPaidThisYear: 6560
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

  const handlePaymentClick = (amount: number, type: string = 'full') => {
    toast({
      title: "Payment Initiated",
      description: `Redirecting to secure payment portal for ${formatCurrency(amount)}...`,
    });
    
    // Simulate redirect delay
    setTimeout(() => {
      toast({
        title: "Payment Portal",
        description: "This is a demo - payment functionality would redirect to your bank or payment provider.",
        variant: "default",
      });
    }, 2000);
  };

  const handleQuickPayment = (amount: number, type: string) => {
    toast({
      title: `${type} Payment Selected`,
      description: `Processing payment of ${formatCurrency(amount)}...`,
    });
  };

  const handleInvoiceView = (invoiceId: string) => {
    toast({
      title: "Opening Invoice",
      description: `Loading detailed view for ${invoiceId}...`,
    });
  };

  const handleInvoiceDownload = (invoiceId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading invoice ${invoiceId} as PDF...`,
    });
  };

  const handleExportAll = () => {
    toast({
      title: "Export Started",
      description: "Preparing payment history export. This may take a few moments...",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 font-medium">
            <CheckCircle className="h-3 w-3 mr-1" />
            {t('common.status.paid')}
          </Badge>
        );
      case 'due':
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 font-medium">
            <Clock className="h-3 w-3 mr-1" />
            {t('common.status.due')}
          </Badge>
        );
      case 'overdue':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 font-medium">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {t('common.status.overdue')}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 font-medium">
            <Calendar className="h-3 w-3 mr-1" />
            {t('common.status.pending')}
          </Badge>
        );
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nb-NO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate time until payment is due
  useEffect(() => {
    const calculateTimeUntilDue = () => {
      const dueDate = new Date(paymentSummary.nextPaymentDue);
      const now = new Date();
      const timeDiff = dueDate.getTime() - now.getTime();
      
      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeUntilDue({ days, hours, minutes });
      } else {
        setTimeUntilDue({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeUntilDue();
    const interval = setInterval(calculateTimeUntilDue, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [paymentSummary.nextPaymentDue]);

  const isOverdue = timeUntilDue.days === 0 && timeUntilDue.hours === 0 && timeUntilDue.minutes === 0;
  const isUrgent = timeUntilDue.days <= 3;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('guardian.payments.title')}</h1>
        <p className="text-gray-600 mt-2">{t('guardian.payments.description')}</p>
      </div>

      {/* Enhanced Outstanding Balance Card */}
      <Card className={`shadow-xl border-0 ${isOverdue ? 'bg-gradient-to-br from-red-100 to-red-200 border-red-300' : isUrgent ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200' : 'bg-gradient-to-br from-red-50 to-red-100 border-red-200'}`}>
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 ${isOverdue ? 'bg-red-200' : isUrgent ? 'bg-amber-100' : 'bg-red-100'} rounded-2xl flex items-center justify-center ring-4 ${isOverdue ? 'ring-red-100' : isUrgent ? 'ring-amber-50' : 'ring-red-50'}`}>
                <AlertCircle className={`h-8 w-8 ${isOverdue ? 'text-red-700' : isUrgent ? 'text-amber-600' : 'text-red-600'}`} />
              </div>
              <div>
                <p className={`text-sm ${isOverdue ? 'text-red-700' : isUrgent ? 'text-amber-600' : 'text-red-600'} font-medium mb-1 uppercase tracking-wide`}>
                  {isOverdue ? 'OVERDUE PAYMENT' : 'Outstanding Balance'}
                </p>
                <p className={`text-4xl font-bold ${isOverdue ? 'text-red-800' : isUrgent ? 'text-amber-700' : 'text-red-700'} mb-2`}>
                  {formatCurrency(paymentSummary.currentBalance)}
                </p>
                
                {/* Countdown Timer */}
                <div className={`flex items-center gap-3 text-sm ${isOverdue ? 'text-red-700' : isUrgent ? 'text-amber-600' : 'text-red-600'} mb-3`}>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Due: {formatDate(paymentSummary.nextPaymentDue)}</span>
                  </div>
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                  <span className="font-medium">2 unpaid invoices</span>
                </div>

                {!isOverdue && (
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${isUrgent ? 'bg-amber-200 text-amber-800' : 'bg-red-200 text-red-800'} text-sm font-medium`}>
                    <div className="flex items-center gap-1">
                      <span className="text-xs">Time left:</span>
                      <span className="font-bold">
                        {timeUntilDue.days}d {timeUntilDue.hours}h {timeUntilDue.minutes}m
                      </span>
                    </div>
                  </div>
                )}

                {isOverdue && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-200 text-red-800 text-sm font-bold animate-pulse">
                    <AlertTriangle className="h-4 w-4" />
                    PAYMENT OVERDUE
                  </div>
                )}
              </div>
            </div>
            
            {/* Payment Actions */}
            <div className="flex flex-col gap-3">
              <Button 
                size="lg" 
                className={`${isOverdue ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'} text-white px-8 shadow-lg hover:shadow-xl transition-all`}
                onClick={() => handlePaymentClick(paymentSummary.currentBalance, 'full')}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Pay Full Amount
              </Button>
              
              {/* Quick Payment Options */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-300 text-red-700 hover:bg-red-50"
                  onClick={() => handleQuickPayment(2220, 'Single Invoice')}
                >
                  Pay {formatCurrency(2220)}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-300 text-red-700 hover:bg-red-50"
                  onClick={() => handleQuickPayment(paymentSummary.currentBalance / 2, 'Half')}
                >
                  Pay Half
                </Button>
              </div>
              
              <p className="text-xs text-gray-600 text-center">
                Secure payment via bank transfer or card
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Left Column - Payment Overview */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Payment Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Summary Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Monthly Fee Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center ring-2 ring-blue-50">
                    <Wallet className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Monthly Fee</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-3xl font-bold text-blue-800">
                    {formatCurrency(paymentSummary.monthlyFeeAfterReduction)}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">{formatCurrency(paymentSummary.originalMonthlyFee)}</span>
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs px-2 py-1 font-medium">
                      {Math.round(((paymentSummary.originalMonthlyFee - paymentSummary.monthlyFeeAfterReduction) / paymentSummary.originalMonthlyFee) * 100)}% off
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Paid Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center ring-2 ring-emerald-50">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">Paid in 2024</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-3xl font-bold text-emerald-800">
                    {formatCurrency(paymentSummary.totalPaidThisYear)}
                  </p>
                  <p className="text-sm text-emerald-600 flex items-center gap-2">
                    <span>3 payments completed</span>
                    <CheckCircle className="h-4 w-4" />
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Total Saved Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center ring-2 ring-purple-50">
                    <TrendingDown className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider">Total Saved</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-3xl font-bold text-purple-800">
                    {formatCurrency(paymentSummary.totalSavedThisYear)}
                  </p>
                  <p className="text-sm text-purple-600">
                    Since fee reduction approval
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reduction Status */}
          {paymentSummary.reductionApproved && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <h4 className="text-green-800 font-semibold">{t('guardian.payments.reducedPayment')}</h4>
                <AlertDescription className="text-green-700">
                  {t('guardian.payments.applicationApproved')} You're saving {formatCurrency(paymentSummary.originalMonthlyFee - paymentSummary.monthlyFeeAfterReduction)} per month.
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* Payment Information */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-slate-100">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-slate-800">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Info className="h-4 w-4 text-slate-600" />
                </div>
                {t('guardian.payments.paymentInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-slate-700">
                {paymentInfo.map((info, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm leading-relaxed">{info}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Fee Reduction */}
        <div className="space-y-6">
          <FeeReductionCalculator
            onApplyClick={() => setShowFeeReductionModal(true)}
            currentFee={paymentSummary.originalMonthlyFee}
          />
        </div>
      </div>

      {/* Payment History - Enhanced Table */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
                <FileText className="h-5 w-5 text-oslo-blue" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Payment History</CardTitle>
                <CardDescription>Your complete invoice and payment records</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={handleExportAll}
              >
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700 px-6 py-4">Period</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-4 py-4">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-4 py-4">Due Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-4 py-4">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-4 py-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice, index) => (
                  <TableRow 
                    key={invoice.id} 
                    className={`
                      hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-b-0
                      ${invoice.status === 'due' ? 'bg-amber-50/30' : ''}
                      ${invoice.status === 'overdue' ? 'bg-red-50/30' : ''}
                    `}
                  >
                    <TableCell className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900">{invoice.month}</p>
                        <p className="text-xs text-gray-500 font-mono">{invoice.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div className="space-y-1">
                        <p className="font-semibold text-gray-900 text-lg">
                          {formatCurrency(invoice.amountDue)}
                        </p>
                        {invoice.reduction > 0 && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400 line-through">
                              {formatCurrency(invoice.originalAmount)}
                            </span>
                            <Badge className="bg-green-50 text-green-600 border-green-200 text-xs px-1.5 py-0.5">
                              -{formatCurrency(invoice.reduction)}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div className="space-y-1">
                        <p className="font-medium text-gray-700">{formatDate(invoice.dueDate)}</p>
                        {invoice.status === 'paid' && invoice.paidDate && (
                          <p className="text-xs text-green-600">Paid {formatDate(invoice.paidDate)}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      {getStatusBadge(invoice.status)}
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {invoice.status === 'due' && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md transition-all"
                            onClick={() => handlePaymentClick(invoice.amountDue, 'individual')}
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                            Pay Now
                          </Button>
                        )}
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            onClick={() => handleInvoiceView(invoice.id)}
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            onClick={() => handleInvoiceDownload(invoice.id)}
                          >
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
