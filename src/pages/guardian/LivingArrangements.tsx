
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Home,
  CalendarRange,
  Users,
  Edit,
  Save,
  Clock,
  MapPin,
  Phone,
  FileUp,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LivingArrangements = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Mock data
  const livingArrangement = {
    type: 'shared',
    primaryAddress: {
      street: 'Trondheimsveien 235',
      postalCode: '0586',
      city: 'Oslo',
      resident: 'Mor (Anna Hansen)',
      schedule: 'Mandag-Torsdag'
    },
    secondaryAddress: {
      street: 'Colbjørnsens gate 12',
      postalCode: '0256',
      city: 'Oslo',
      resident: 'Far (Lars Andersen)',
      schedule: 'Fredag-Søndag'
    },
    custodyDocument: 'custody-agreement.pdf',
    specialNotes: 'Annenhver ferie hos mor/far etter avtale.'
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Boordning oppdatert",
      description: "Endringene er lagret og delt med barnehagen.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Boordning</h1>
          <p className="text-slate-600 mt-2">Administrer hvor barnet ditt bor og hentes fra</p>
        </div>
        <Badge variant="outline" className="bg-oslo-blue/5 text-oslo-blue border-oslo-blue/20">
          <Home className="w-4 h-4 mr-2" />
          Boordning
        </Badge>
      </div>

      {/* Living Arrangement Type */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Type boordning</CardTitle>
            {!isEditing && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Endre
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className={`grid grid-cols-3 gap-3 ${isEditing ? 'opacity-100' : 'opacity-60'}`}>
              <div className="border rounded-lg p-4 flex flex-col items-center text-center gap-2 bg-oslo-blue/5 border-oslo-blue">
                <Home className="w-6 h-6 text-oslo-blue" />
                <p className="font-medium">Delt bosted</p>
                <Badge className="bg-oslo-blue">Valgt</Badge>
              </div>
              
              <div className="border rounded-lg p-4 flex flex-col items-center text-center gap-2">
                <Home className="w-6 h-6" />
                <p className="font-medium">Fast bosted</p>
                <span className="text-xs text-slate-500">Ett hjem</span>
              </div>
              
              <div className="border rounded-lg p-4 flex flex-col items-center text-center gap-2">
                <Home className="w-6 h-6" />
                <p className="font-medium">Annen ordning</p>
                <span className="text-xs text-slate-500">Spesiell avtale</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Primary Address */}
      <Card>
        <CardHeader>
          <CardTitle>Primær adresse</CardTitle>
          <CardDescription>
            Hovedadresse for barnet
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="street1">Gateadresse</Label>
                  <Input
                    id="street1"
                    defaultValue={livingArrangement.primaryAddress.street}
                  />
                </div>
                <div>
                  <Label htmlFor="postal1">Postnummer</Label>
                  <Input
                    id="postal1"
                    defaultValue={livingArrangement.primaryAddress.postalCode}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city1">Sted</Label>
                  <Input
                    id="city1"
                    defaultValue={livingArrangement.primaryAddress.city}
                  />
                </div>
                <div>
                  <Label htmlFor="resident1">Beboer</Label>
                  <Input
                    id="resident1"
                    defaultValue={livingArrangement.primaryAddress.resident}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="schedule1">Tidsskjema</Label>
                <Input
                  id="schedule1"
                  defaultValue={livingArrangement.primaryAddress.schedule}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-oslo-blue/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-oslo-blue" />
                </div>
                <div>
                  <h3 className="font-semibold">{livingArrangement.primaryAddress.street}</h3>
                  <p className="text-sm text-slate-600">
                    {livingArrangement.primaryAddress.postalCode} {livingArrangement.primaryAddress.city}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{livingArrangement.primaryAddress.resident}</h3>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                  <CalendarRange className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">{livingArrangement.primaryAddress.schedule}</h3>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Secondary Address */}
      <Card>
        <CardHeader>
          <CardTitle>Sekundær adresse</CardTitle>
          <CardDescription>
            Alternativ adresse for barnet
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="street2">Gateadresse</Label>
                  <Input
                    id="street2"
                    defaultValue={livingArrangement.secondaryAddress.street}
                  />
                </div>
                <div>
                  <Label htmlFor="postal2">Postnummer</Label>
                  <Input
                    id="postal2"
                    defaultValue={livingArrangement.secondaryAddress.postalCode}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city2">Sted</Label>
                  <Input
                    id="city2"
                    defaultValue={livingArrangement.secondaryAddress.city}
                  />
                </div>
                <div>
                  <Label htmlFor="resident2">Beboer</Label>
                  <Input
                    id="resident2"
                    defaultValue={livingArrangement.secondaryAddress.resident}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="schedule2">Tidsskjema</Label>
                <Input
                  id="schedule2"
                  defaultValue={livingArrangement.secondaryAddress.schedule}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{livingArrangement.secondaryAddress.street}</h3>
                  <p className="text-sm text-slate-600">
                    {livingArrangement.secondaryAddress.postalCode} {livingArrangement.secondaryAddress.city}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{livingArrangement.secondaryAddress.resident}</h3>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                  <CalendarRange className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-medium">{livingArrangement.secondaryAddress.schedule}</h3>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custody Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Foreldreansvar og dokumentasjon</CardTitle>
          <CardDescription>
            Last opp juridiske dokumenter om foreldreansvar eller boordning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {livingArrangement.custodyDocument ? (
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <FileUp className="w-5 h-5 text-slate-600" />
                  <div>
                    <h3 className="font-medium">{livingArrangement.custodyDocument}</h3>
                    <p className="text-sm text-slate-600">Avtale om delt omsorg</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Last ned
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center p-8 bg-slate-50 rounded-lg border border-dashed">
                <Button variant="outline">
                  <FileUp className="w-4 h-4 mr-2" />
                  Last opp dokumenter
                </Button>
              </div>
            )}
            
            {isEditing && (
              <div>
                <Label htmlFor="notes">Spesielle merknader</Label>
                <Textarea
                  id="notes"
                  defaultValue={livingArrangement.specialNotes}
                  rows={3}
                />
              </div>
            )}
            
            {!isEditing && livingArrangement.specialNotes && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-2">Spesielle merknader</h3>
                <p className="text-sm text-blue-700">{livingArrangement.specialNotes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Avbryt
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Lagre endringer
          </Button>
        </div>
      )}

      {/* Information Box */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Check className="w-5 h-5" />
            Viktig informasjon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• Boordning påvirker automatisk hvor beskjeder og fakturaer sendes</p>
            <p>• Henting og levering følger boordningskalendaren</p>
            <p>• All endring av foreldreansvar må dokumenteres med offisielle papirer</p>
            <p>• Ved endringer kan det ta 1-2 virkedager før alle systemer er oppdatert</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivingArrangements;
