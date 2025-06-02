
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, Eye, AlertCircle, CheckCircle, FileText, Calculator } from 'lucide-react';

const Payments = () => {
  // Mock payment data
  const invoices = [
    {
      id: 'INV-2024-004',
      child: 'Oliver Hansen',
      kindergarten: 'Sinsen Barnehage',
      period: 'April 2024',
      amount: 3330,
      discountAmount: 830,
      originalAmount: 4160,
      dueDate: '2024-04-15',
      status: 'pending',
      issueDate: '2024-03-20'
    },
    {
      id: 'INV-2024-003',
      child: 'Oliver Hansen',
      kindergarten: 'Sinsen Barnehage',
      period: 'Mars 2024',
      amount: 3330,
      discountAmount: 830,
      originalAmount: 4160,
      dueDate: '2024-03-15',
      status: 'paid',
      issueDate: '2024-02-20',
      paidDate: '2024-03-10'
    },
    {
      id: 'INV-2024-002',
      child: 'Oliver Hansen',
      kindergarten: 'Sinsen Barnehage',
      period: 'Februar 2024',
      amount: 3330,
      discountAmount: 830,
      originalAmount: 4160,
      dueDate: '2024-02-15',
      status: 'paid',
      issueDate: '2024-01-20',
      paidDate: '2024-02-08'
    }
  ];

  const currentApplication = {
    status: 'approved',
    householdIncome: 450000,
    maxFee: 4160,
    reducedFee: 3330,
    discountPercent: 20,
    validUntil: '2024-12-31',
    appliedDate: '2024-01-15',
    renewalDate: '2025-01-01'
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Betalt</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Forfaller</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Forfalt</Badge>;
      default:
        return <Badge variant="outline">Ukjent</Badge>;
    }
  };

  const totalPaid = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const totalSaved = invoices.reduce((sum, inv) => sum + inv.discountAmount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Betalinger og avgifter</h1>
        <p className="text-gray-600 mt-2">
          Oversikt over fakturaer, betalinger og søknad om redusert betaling
        </p>
      </div>

      {/* Financial Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <CreditCard className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <h3 className="font-semibold">Totalt betalt i år</h3>
              <p className="text-2xl font-bold text-blue-600">{totalPaid.toLocaleString()} kr</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Calculator className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <h3 className="font-semibold">Spart med reduksjon</h3>
              <p className="text-2xl font-bold text-green-600">{totalSaved.toLocaleString()} kr</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <AlertCircle className="h-8 w-8 text-orange-600 mr-4" />
            <div>
              <h3 className="font-semibold">Åpne fakturaer</h3>
              <p className="text-2xl font-bold text-orange-600">
                {invoices.filter(inv => inv.status === 'pending').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reduced Fee Status */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Redusert betaling godkjent
          </CardTitle>
          <CardDescription>
            Din søknad om inntektsbasert reduksjon er godkjent
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge className="bg-green-100 text-green-800">Godkjent</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Husholdningsinntekt:</span>
                <span className="font-medium">{currentApplication.householdIncome.toLocaleString()} kr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Maks avgift:</span>
                <span className="font-medium line-through text-gray-500">{currentApplication.maxFee} kr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Din avgift:</span>
                <span className="font-bold text-green-600">{currentApplication.reducedFee} kr/mnd</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Reduksjon:</span>
                <span className="font-medium text-green-600">{currentApplication.discountPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gyldig til:</span>
                <span className="font-medium">{currentApplication.validUntil}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fornyelse:</span>
                <span className="font-medium">{currentApplication.renewalDate}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Automatisk fornyelse:</strong> Søknaden fornyes automatisk basert på 
              inntektsopplysninger fra Skatteetaten. Du trenger ikke å søke på nytt.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Fakturaer
          </CardTitle>
          <CardDescription>
            Oversikt over alle fakturaer for barnehageavgift
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">Faktura #{invoice.id}</h4>
                    <p className="text-sm text-gray-600">
                      {invoice.child} • {invoice.kindergarten} • {invoice.period}
                    </p>
                  </div>
                  {getStatusBadge(invoice.status)}
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-gray-600 text-sm">Opprinnelig beløp</span>
                    <p className="font-medium line-through text-gray-500">
                      {invoice.originalAmount} kr
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Reduksjon</span>
                    <p className="font-medium text-green-600">
                      -{invoice.discountAmount} kr
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Å betale</span>
                    <p className="font-bold text-lg">
                      {invoice.amount} kr
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Forfallsdato</span>
                    <p className="font-medium">
                      {invoice.dueDate}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="text-sm text-gray-600">
                    Utstedt: {invoice.issueDate}
                    {invoice.paidDate && ` • Betalt: ${invoice.paidDate}`}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Se
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Last ned PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Information Box */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Viktig informasjon om betaling</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Fakturaer sendes digitalt via Digipost eller per post</li>
                <li>• Betalingsfrist er 30 dager fra fakturaens utstedelsesdato</li>
                <li>• Ved betalingsproblemer, kontakt oss så tidlig som mulig</li>
                <li>• Redusert betaling fornyes automatisk hvert år basert på skattedata</li>
                <li>• Du kan søke om ekstraordinær reduksjon ved endrede forhold</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
