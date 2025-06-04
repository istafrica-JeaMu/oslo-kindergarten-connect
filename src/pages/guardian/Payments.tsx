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
  MoreHorizontal,
  ChevronDown,
  Shield,
  Zap
} from 'lucide-react';

const Payments = () => {
  const { t } = useTranslation();
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showFeeReductionModal, setShowFeeReductionModal] = useState(false);
  const [showQuickPayOptions, setShowQuickPayOptions] = useState(false);
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
      <Card className={`shadow-xl border-0 overflow-hidden ${isOverdue ? 'bg-gradient-to-br from-red-50 to-red-100' : isUrgent ? 'bg-gradient-to-br from-amber-50 to-amber-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
        <CardContent className="p-6 sm:p-8">
          {/* Status Banner */}
          {(isOverdue || isUrgent) && (
            <div className={`mb-6 flex items-center gap-3 p-4 rounded-xl ${isOverdue ? 'bg-red-100 border border-red-200' : 'bg-amber-100 border border-amber-200'}`}>
              <div className={`p-2 rounded-lg ${isOverdue ? 'bg-red-200' : 'bg-amber-200'}`}>
                <AlertTriangle className={`h-5 w-5 ${isOverdue ? 'text-red-700' : 'text-amber-700'}`} />
              </div>
              <div>
                <h3 className={`font-bold ${isOverdue ? 'text-red-800' : 'text-amber-800'}`}>
                  {isOverdue ? 'Payment Overdue' : 'Payment Due Soon'}
                </h3>
                <p className={`text-sm ${isOverdue ? 'text-red-700' : 'text-amber-700'}`}>
                  {isOverdue ? 'Late fees may apply' : `${timeUntilDue.days} days remaining`}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Payment Info Section */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isOverdue ? 'bg-red-200' : isUrgent ? 'bg-amber-200' : 'bg-blue-200'}`}>
                  <AlertCircle className={`h-8 w-8 ${isOverdue ? 'text-red-700' : isUrgent ? 'text-amber-700' : 'text-blue-700'}`} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isOverdue ? 'text-red-700' : isUrgent ? 'text-amber-700' : 'text-blue-700'} uppercase tracking-wide mb-1`}>
                    Outstanding Balance
                  </p>
                  <h2 className={`text-4xl font-bold ${isOverdue ? 'text-red-800' : isUrgent ? 'text-amber-800' : 'text-blue-800'} leading-tight`}>
                    {formatCurrency(paymentSummary.currentBalance)}
                  </h2>
                </div>
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {formatDate(paymentSummary.nextPaymentDue)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>2 unpaid invoices</span>
                </div>
              </div>

              {/* Countdown Timer */}
              {!isOverdue && (
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${isUrgent ? 'bg-amber-200 text-amber-800' : 'bg-blue-200 text-blue-800'} text-sm font-medium`}>
                  <Clock className="h-4 w-4" />
                  <span>{timeUntilDue.days}d {timeUntilDue.hours}h remaining</span>
                </div>
              )}
            </div>
            
            {/* Payment Actions */}
            <div className="flex flex-col gap-3 min-w-[300px]">
              {/* Primary CTA */}
              <Button 
                size="lg" 
                className={`h-16 ${isOverdue ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 shadow-lg hover:shadow-xl transition-all duration-200 text-base font-semibold group relative overflow-hidden`}
                onClick={() => handlePaymentClick(paymentSummary.currentBalance, 'full')}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">Pay Full Amount</div>
                      <div className="text-sm opacity-90">{formatCurrency(paymentSummary.currentBalance)}</div>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Button>
              
              {/* Secondary Options with fixed hover */}
              <Button 
                variant="outline" 
                className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                onClick={() => setShowQuickPayOptions(!showQuickPayOptions)}
              >
                <span>More Payment Options</span>
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showQuickPayOptions ? 'rotate-180' : ''}`} />
              </Button>

              {/* Expandable Quick Options */}
              {showQuickPayOptions && (
                <div className="space-y-2 animate-fade-in">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-between text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                    onClick={() => handleQuickPayment(2220, 'Single Invoice')}
                  >
                    <span>Pay Single Invoice</span>
                    <span className="font-semibold">{formatCurrency(2220)}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-between text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                    onClick={() => handleQuickPayment(paymentSummary.currentBalance / 2, 'Partial')}
                  >
                    <span>Pay Partial Amount</span>
                    <span className="font-semibold">{formatCurrency(paymentSummary.currentBalance / 2)}</span>
                  </Button>
                </div>
              )}
              
              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Shield className="h-3 w-3" />
                  <span>Bank Secured</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <CheckCircle className="h-3 w-3" />
                  <span>SSL Protected</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
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

      {/* Payment Information - Moved to bottom */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Info className="h-4 w-4 text-slate-600" />
            </div>
            Important Payment Information
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

      <FeeReductionModal
        open={showFeeReductionModal}
        onOpenChange={setShowFeeReductionModal}
      />
    </div>
  );
};

export default Payments;
