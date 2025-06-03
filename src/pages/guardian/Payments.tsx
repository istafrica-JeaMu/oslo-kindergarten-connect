
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTranslation } from 'react-i18next';
import { 
  CreditCard, 
  Download, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  DollarSign,
  FileText,
  Info
} from 'lucide-react';

const Payments = () => {
  const { t } = useTranslation();
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // Mock payment data
  const paymentSummary = {
    totalPaidThisYear: 36630,
    savedWithReduction: 12210,
    openInvoices: 2,
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
      invoiceDate: '2024-03-01'
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
      invoiceDate: '2024-04-01'
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
      invoiceDate: '2024-05-01'
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

      {/* Payment Summary */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('guardian.payments.totalPaid')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(paymentSummary.totalPaidThisYear)}
                </p>
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
                  {formatCurrency(paymentSummary.savedWithReduction)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('guardian.payments.openInvoices')}</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {paymentSummary.openInvoices}
                </p>
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
                  {formatCurrency(2220)}
                </p>
                <p className="text-xs text-gray-500">After reduction</p>
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

      {/* Invoices */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
              <FileText className="h-5 w-5 text-oslo-blue" />
            </div>
            {t('guardian.payments.invoices')}
          </CardTitle>
          <CardDescription>
            {t('guardian.payments.invoicesDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="p-4 border border-gray-200 rounded-xl hover:border-oslo-blue/30 hover:bg-gray-50/50 transition-all cursor-pointer"
                onClick={() => setSelectedInvoice(invoice)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-oslo-blue/10 rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-oslo-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{invoice.month}</h4>
                      <p className="text-gray-600">{invoice.child} • {invoice.kindergarten}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {t('guardian.payments.dueDate')}: {invoice.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusBadge(invoice.status)}
                    </div>
                    {invoice.reduction > 0 && (
                      <div className="text-sm text-gray-500 mb-1">
                        <span className="line-through">{formatCurrency(invoice.originalAmount)}</span>
                        <span className="text-green-600 ml-2">-{formatCurrency(invoice.reduction)}</span>
                      </div>
                    )}
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(invoice.amountDue)}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        {t('guardian.payments.view')}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        {t('guardian.payments.downloadPdf')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
    </div>
  );
};

export default Payments;
