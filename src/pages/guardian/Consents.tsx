
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileCheck, Camera, MapPin, Stethoscope, Clock, Download, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

const Consents = () => {
  // Mock consents data
  const consents = [
    {
      id: 1,
      type: 'photo',
      title: 'Foto- og videokonsent',
      description: 'Tillatelse til å ta og publisere bilder av barnet',
      status: 'active',
      signed: '2024-01-15',
      expires: '2024-12-31',
      icon: Camera
    },
    {
      id: 2,
      type: 'medical',
      title: 'Medisinsk behandling',
      description: 'Akutt medisinsk behandling ved skade eller sykdom',
      status: 'active',
      signed: '2024-01-15',
      expires: '2025-01-15',
      icon: Stethoscope
    },
    {
      id: 3,
      type: 'trips',
      title: 'Utflukter og turer',
      description: 'Delta på utflukter utenfor barnehagens område',
      status: 'expires_soon',
      signed: '2024-01-15',
      expires: '2024-04-01',
      icon: MapPin
    },
    {
      id: 4,
      type: 'data',
      title: 'Databehandling',
      description: 'Behandling av personopplysninger og kommunikasjon',
      status: 'pending',
      signed: null,
      expires: null,
      icon: FileCheck
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'expires_soon': return 'bg-yellow-100 text-yellow-700';
      case 'expired': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'expires_soon': return 'Utløper snart';
      case 'expired': return 'Utløpt';
      case 'pending': return 'Venter signatur';
      default: return 'Ukjent';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Samtykker og skjemaer</h1>
          <p className="text-slate-600 mt-2">Administrer tillatelser og nødvendige skjemaer</p>
        </div>
        <Badge variant="outline" className="bg-oslo-blue/5 text-oslo-blue border-oslo-blue/20">
          <FileCheck className="w-4 h-4 mr-2" />
          Digitale samtykker
        </Badge>
      </div>

      {/* Pending Consents Alert */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Handlinger påkrevd
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700 mb-4">
            Du har 1 samtykke som venter på signatur og 1 som utløper snart.
          </p>
          <Button className="bg-yellow-600 hover:bg-yellow-700">
            Fullfør manglende samtykker
          </Button>
        </CardContent>
      </Card>

      {/* Consents List */}
      <Card>
        <CardHeader>
          <CardTitle>Alle samtykker</CardTitle>
          <CardDescription>Oversikt over samtykker og skjemaer for barnet ditt</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {consents.map((consent) => (
              <div key={consent.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <consent.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{consent.title}</h3>
                    <p className="text-sm text-slate-600">{consent.description}</p>
                    {consent.signed && (
                      <p className="text-xs text-slate-500 mt-1">
                        Signert: {format(new Date(consent.signed), 'd. MMM yyyy', { locale: nb })}
                        {consent.expires && (
                          <> • Utløper: {format(new Date(consent.expires), 'd. MMM yyyy', { locale: nb })}</>
                        )}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(consent.status)}>
                    {getStatusText(consent.status)}
                  </Badge>
                  
                  <div className="flex gap-1">
                    {consent.status === 'pending' ? (
                      <Button size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Signer
                      </Button>
                    ) : (
                      <>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Information */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Viktig informasjon om samtykker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• Alle samtykker er juridisk bindende og kan trekkes tilbake når som helst</p>
            <p>• Du får påminnelse 30 dager før samtykker utløper</p>
            <p>• Manglende samtykker kan påvirke barnets deltakelse i aktiviteter</p>
            <p>• Digital signatur har samme gyldighet som håndskrift</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Consents;
