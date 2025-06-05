
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users,
  UserPlus,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone,
  Mail,
  Edit,
  Trash2,
  Calendar,
  Camera
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

const PickupAuthorization = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [newPerson, setNewPerson] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    validFrom: format(new Date(), 'yyyy-MM-dd'),
    validTo: format(addDays(new Date(), 365), 'yyyy-MM-dd'),
    notes: ''
  });
  const { toast } = useToast();

  // Mock authorized persons
  const authorizedPersons = [
    {
      id: 1,
      name: 'Lars Andersen',
      relationship: 'Far',
      phone: '+47 987 65 432',
      email: 'lars@email.com',
      photo: null,
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      status: 'active',
      lastPickup: '2024-03-15'
    },
    {
      id: 2,
      name: 'Berit Hansen',
      relationship: 'Bestemor',
      phone: '+47 456 78 901',
      email: 'berit@email.com',
      photo: null,
      validFrom: '2024-01-15',
      validTo: '2024-06-15',
      status: 'active',
      lastPickup: '2024-03-10'
    },
    {
      id: 3,
      name: 'Kari Solberg',
      relationship: 'Venn',
      phone: '+47 123 45 678',
      email: null,
      photo: null,
      validFrom: '2024-03-01',
      validTo: '2024-03-31',
      status: 'temporary',
      lastPickup: null
    }
  ];

  // Mock emergency authorizations
  const emergencyAuthorizations = [
    {
      id: 1,
      date: '2024-03-20',
      person: 'Ole Nordmann',
      phone: '+47 555 66 777',
      reason: 'Akutt møte på jobb',
      status: 'pending',
      createdAt: '2024-03-18T14:30:00'
    }
  ];

  const handleAddPerson = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Person lagt til",
      description: `${newPerson.name} er nå autorisert for henting.`,
    });

    setNewPerson({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      validFrom: format(new Date(), 'yyyy-MM-dd'),
      validTo: format(addDays(new Date(), 365), 'yyyy-MM-dd'),
      notes: ''
    });
    setShowAddForm(false);
  };

  const handleEmergencyAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Nødautorisasjon sendt",
      description: "Barnehagen har mottatt din nødautorisasjon for henting.",
    });
    
    setShowEmergencyForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'temporary': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'expired': return 'bg-red-100 text-red-700 border-red-200';
      case 'pending': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Hentefullmakter</h1>
          <p className="text-slate-600 mt-2">Administrer hvem som kan hente barnet ditt</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-oslo-blue/5 text-oslo-blue border-oslo-blue/20">
            <Shield className="w-4 h-4 mr-2" />
            Sikker henting
          </Badge>
          <Button onClick={() => setShowEmergencyForm(true)} className="bg-orange-500 hover:bg-orange-600">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Nødautorisasjon
          </Button>
        </div>
      </div>

      {/* Emergency Authorization Form */}
      {showEmergencyForm && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Nødautorisasjon for henting
            </CardTitle>
            <CardDescription className="text-orange-700">
              Gi én gang autorisasjon for akutte situasjoner
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmergencyAuth} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergency-name">Fullt navn</Label>
                  <Input id="emergency-name" placeholder="Navn på person som skal hente" required />
                </div>
                <div>
                  <Label htmlFor="emergency-phone">Telefonnummer</Label>
                  <Input id="emergency-phone" type="tel" placeholder="+47 xxx xx xxx" required />
                </div>
              </div>
              
              <div>
                <Label htmlFor="emergency-reason">Årsak</Label>
                <Textarea id="emergency-reason" placeholder="Beskriv hvorfor denne personen må hente..." required />
              </div>
              
              <div className="flex gap-3">
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Send nødautorisasjon
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowEmergencyForm(false)}>
                  Avbryt
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Authorized Persons */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Autoriserte personer</CardTitle>
              <CardDescription>
                Personer som kan hente barnet ditt
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(true)} disabled={showAddForm}>
              <UserPlus className="w-4 h-4 mr-2" />
              Legg til person
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {authorizedPersons.map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-oslo-blue to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">{person.name}</h3>
                    <p className="text-sm text-slate-600">{person.relationship}</p>
                    
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Phone className="w-3 h-3" />
                        {person.phone}
                      </div>
                      {person.email && (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Mail className="w-3 h-3" />
                          {person.email}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(person.status)}>
                        {person.status === 'active' ? 'Aktiv' : 
                         person.status === 'temporary' ? 'Midlertidig' : 
                         person.status === 'expired' ? 'Utløpt' : 'Venter'}
                      </Badge>
                      
                      <span className="text-xs text-slate-500">
                        Gyldig til {format(new Date(person.validTo), 'd. MMM yyyy', { locale: nb })}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {person.lastPickup && (
                    <div className="text-right text-xs text-slate-500 mr-3">
                      <p>Siste henting:</p>
                      <p>{format(new Date(person.lastPickup), 'd. MMM', { locale: nb })}</p>
                    </div>
                  )}
                  
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Person Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Legg til ny autorisert person</CardTitle>
            <CardDescription>
              Fyll ut informasjon om personen som skal kunne hente barnet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddPerson} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Fullt navn *</Label>
                  <Input
                    id="name"
                    value={newPerson.name}
                    onChange={(e) => setNewPerson(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="relationship">Relasjon til barnet *</Label>
                  <Input
                    id="relationship"
                    value={newPerson.relationship}
                    onChange={(e) => setNewPerson(prev => ({ ...prev, relationship: e.target.value }))}
                    placeholder="f.eks. Bestemor, Onkel, Venn"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefonnummer *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={newPerson.phone}
                    onChange={(e) => setNewPerson(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+47 xxx xx xxx"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">E-post (valgfritt)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPerson.email}
                    onChange={(e) => setNewPerson(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="valid-from">Gyldig fra</Label>
                  <Input
                    id="valid-from"
                    type="date"
                    value={newPerson.validFrom}
                    onChange={(e) => setNewPerson(prev => ({ ...prev, validFrom: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="valid-to">Gyldig til</Label>
                  <Input
                    id="valid-to"
                    type="date"
                    value={newPerson.validTo}
                    onChange={(e) => setNewPerson(prev => ({ ...prev, validTo: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="photo">Profilbilde (anbefalt)</Label>
                <div className="mt-2">
                  <Button type="button" variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Last opp bilde
                  </Button>
                  <p className="text-xs text-slate-500 mt-1">
                    Hjelper barnehagen med identifikasjon
                  </p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Merknader (valgfritt)</Label>
                <Textarea
                  id="notes"
                  value={newPerson.notes}
                  onChange={(e) => setNewPerson(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Ekstra informasjon..."
                />
              </div>
              
              <div className="flex gap-3">
                <Button type="submit">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Legg til person
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Avbryt
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Emergency Authorizations */}
      {emergencyAuthorizations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Ventende nødautorisasjoner
            </CardTitle>
            <CardDescription>
              Autorisasjoner som venter på bekreftelse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyAuthorizations.map((auth) => (
                <div
                  key={auth.id}
                  className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{auth.person}</h3>
                    <p className="text-sm text-slate-600">
                      Henting: {format(new Date(auth.date), 'd. MMMM yyyy', { locale: nb })}
                    </p>
                    <p className="text-sm text-slate-600">{auth.reason}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(auth.status)}>
                      Venter bekreftelse
                    </Badge>
                    <div className="text-xs text-slate-500">
                      Sendt {format(new Date(auth.createdAt), 'HH:mm', { locale: nb })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Information */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Sikkerhetsinformasjon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-blue-700">
            <p>• Alle autoriserte personer må vise gyldig ID ved henting</p>
            <p>• Barnehagen bekrefter identitet før barnet utleveres</p>
            <p>• Du får varsel når barnet blir hentet av autorisert person</p>
            <p>• Nødautorisasjoner krever telefonbekreftelse</p>
            <p>• Autorisasjoner kan trekkes tilbake når som helst</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PickupAuthorization;
