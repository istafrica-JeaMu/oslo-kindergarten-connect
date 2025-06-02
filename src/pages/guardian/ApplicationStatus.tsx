
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';

const ApplicationStatus = () => {
  // Mock application data
  const applications = [
    {
      id: 'APP-001',
      childName: 'Emma Hansen',
      status: 'submitted',
      submittedDate: '2024-03-15',
      kindergartens: [
        { name: 'Løvenskiold Barnehage', priority: 1, status: 'pending' },
        { name: 'Sinsen Barnehage', priority: 2, status: 'pending' },
        { name: 'Sagene Barnehage', priority: 3, status: 'pending' }
      ],
      lastUpdate: '2024-03-16',
      caseWorker: 'Erik Johansen',
      estimatedDecisionDate: '2024-04-15'
    },
    {
      id: 'APP-002',
      childName: 'Oliver Hansen',
      status: 'placed',
      submittedDate: '2024-02-20',
      kindergartens: [
        { name: 'Sinsen Barnehage', priority: 1, status: 'accepted' },
        { name: 'Bjølsen Barnehage', priority: 2, status: 'not_processed' }
      ],
      lastUpdate: '2024-03-10',
      placedKindergarten: 'Sinsen Barnehage',
      startDate: '2024-08-15'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'placed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Under behandling</Badge>;
      case 'placed':
        return <Badge variant="outline" className="text-green-600 border-green-300">Tildelt plass</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-300">Avslått</Badge>;
      default:
        return <Badge variant="outline">Ukjent status</Badge>;
    }
  };

  const getKindergartenStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-blue-600 border-blue-300">Venter</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="text-green-600 border-green-300">Godtatt</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-300">Avslått</Badge>;
      case 'not_processed':
        return <Badge variant="outline" className="text-gray-600 border-gray-300">Ikke behandlet</Badge>;
      default:
        return <Badge variant="outline">Ukjent</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Søknadsstatus</h1>
        <p className="text-gray-600 mt-2">
          Følg med på statusen til dine barnehagesøknader
        </p>
      </div>

      <div className="space-y-6">
        {applications.map((app) => (
          <Card key={app.id} className="border-l-4 border-l-oslo-blue">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(app.status)}
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {app.childName}
                      {getStatusBadge(app.status)}
                    </CardTitle>
                    <CardDescription>
                      Søknad #{app.id} • Sendt inn: {app.submittedDate}
                    </CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Se detaljer
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Application Timeline */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Behandlingsforløp</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Søknad mottatt - {app.submittedDate}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Under behandling - {app.lastUpdate}</span>
                  </div>
                  {app.status === 'placed' ? (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Plass tildelt - {app.lastUpdate}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Forventet avgjørelse: {app.estimatedDecisionDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Kindergarten Preferences */}
              <div>
                <h4 className="font-semibold mb-3">Barnehagepreferanser</h4>
                <div className="space-y-3">
                  {app.kindergartens.map((kg, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-oslo-blue text-white text-sm rounded-full flex items-center justify-center">
                          {kg.priority}
                        </span>
                        <span className="font-medium">{kg.name}</span>
                      </div>
                      {getKindergartenStatusBadge(kg.status)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Placement Information */}
              {app.status === 'placed' && app.placedKindergarten && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">🎉 Gratulerer! Plass tildelt</h4>
                  <p className="text-green-700">
                    <strong>{app.childName}</strong> har fått plass ved <strong>{app.placedKindergarten}</strong>
                  </p>
                  <p className="text-green-600 mt-1">
                    Oppstart: {app.startDate}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Aksepter plass
                    </Button>
                    <Button variant="outline" size="sm">
                      Last ned kontrakt
                    </Button>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  {app.caseWorker && (
                    <span>Saksbehandler: {app.caseWorker}</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Sist oppdatert: {app.lastUpdate}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Information Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Viktig informasjon</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Du vil motta e-post når statusen på søknaden endres</li>
                <li>• Ved tildeling av plass må du akseptere plassen innen 14 dager</li>
                <li>• Du kan endre preferanser frem til behandlingsfristen</li>
                <li>• Kontakt din saksbehandler ved spørsmål</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationStatus;
