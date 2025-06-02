
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  User,
  Calendar
} from 'lucide-react';

const ReviewQueue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Mock application data
  const applications = [
    {
      id: 'APP-1247',
      childName: 'Lise Eriksen',
      childAge: 3,
      guardianName: 'Maria Eriksen',
      guardianPhone: '+47 999 88 777',
      submittedDate: '2024-03-20',
      status: 'new',
      priority: 'high',
      district: 'Søndre Nordstrand',
      kindergartenChoices: ['Vårtun Barnehage', 'Solbakken Barnehage', 'Blomstereng Barnehage'],
      specialNeeds: true,
      siblingInKindergarten: false,
      income: 450000,
      processingDeadline: '2024-04-05'
    },
    {
      id: 'APP-1246',
      childName: 'Noah Olsen',
      childAge: 4,
      guardianName: 'Anders Olsen',
      guardianPhone: '+47 987 65 432',
      submittedDate: '2024-03-19',
      status: 'review',
      priority: 'normal',
      district: 'Søndre Nordstrand',
      kindergartenChoices: ['Bjølsen Barnehage', 'Sagene Barnehage'],
      specialNeeds: false,
      siblingInKindergarten: true,
      income: 650000,
      processingDeadline: '2024-04-04'
    },
    {
      id: 'APP-1245',
      childName: 'Sara Ahmed',
      childAge: 2,
      guardianName: 'Fatima Ahmed',
      guardianPhone: '+47 876 54 321',
      submittedDate: '2024-03-18',
      status: 'pending_documents',
      priority: 'normal',
      district: 'Søndre Nordstrand',
      kindergartenChoices: ['Løvenskiold Barnehage', 'Sinsen Barnehage'],
      specialNeeds: false,
      siblingInKindergarten: false,
      income: null,
      processingDeadline: '2024-04-03'
    },
    {
      id: 'APP-1244',
      childName: 'Emil Hansen',
      childAge: 5,
      guardianName: 'Lars Hansen',
      guardianPhone: '+47 765 43 210',
      submittedDate: '2024-03-17',
      status: 'approved',
      priority: 'normal',
      district: 'Søndre Nordstrand',
      kindergartenChoices: ['Sagene Barnehage'],
      specialNeeds: false,
      siblingInKindergarten: false,
      income: 580000,
      processingDeadline: '2024-04-02'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800">Ny</Badge>;
      case 'review':
        return <Badge className="bg-yellow-100 text-yellow-800">Under behandling</Badge>;
      case 'pending_documents':
        return <Badge className="bg-orange-100 text-orange-800">Venter dokumenter</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Godkjent</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Avslått</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.guardianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || app.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleApprove = (applicationId: string) => {
    console.log('Approving application:', applicationId);
    // API call would go here
  };

  const handleReject = (applicationId: string) => {
    console.log('Rejecting application:', applicationId);
    // API call would go here
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Behandlingskø</h1>
        <p className="text-gray-600 mt-2">
          Oversikt over søknader som venter på behandling
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Søk etter navn, foresatte eller søknadsnummer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer etter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle statuser</SelectItem>
                <SelectItem value="new">Nye</SelectItem>
                <SelectItem value="review">Under behandling</SelectItem>
                <SelectItem value="pending_documents">Venter dokumenter</SelectItem>
                <SelectItem value="approved">Godkjent</SelectItem>
                <SelectItem value="rejected">Avslått</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer etter prioritet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle prioriteter</SelectItem>
                <SelectItem value="high">Høy prioritet</SelectItem>
                <SelectItem value="normal">Normal prioritet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Queue Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{applications.filter(a => a.status === 'new').length}</p>
            <p className="text-sm text-gray-600">Nye søknader</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{applications.filter(a => a.status === 'review').length}</p>
            <p className="text-sm text-gray-600">Under behandling</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{applications.filter(a => a.priority === 'high').length}</p>
            <p className="text-sm text-gray-600">Høy prioritet</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{applications.filter(a => isOverdue(a.processingDeadline)).length}</p>
            <p className="text-sm text-gray-600">Forfalt frist</p>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((app) => (
          <Card key={app.id} className={`${isOverdue(app.processingDeadline) ? 'border-l-4 border-l-red-500' : app.priority === 'high' ? 'border-l-4 border-l-yellow-500' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getPriorityIcon(app.priority)}
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {app.childName} ({app.childAge} år)
                      {getStatusBadge(app.status)}
                      {isOverdue(app.processingDeadline) && (
                        <Badge variant="destructive" className="text-xs">
                          Forfalt frist
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Søknad #{app.id} • Foresatt: {app.guardianName}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Se detaljer
                  </Button>
                  {app.status === 'new' || app.status === 'review' ? (
                    <>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(app.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Godkjenn
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReject(app.id)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Avslå
                      </Button>
                    </>
                  ) : null}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Kontaktinformasjon
                  </h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Foresatt:</strong> {app.guardianName}</p>
                    <p><strong>Telefon:</strong> {app.guardianPhone}</p>
                    <p><strong>Distrikt:</strong> {app.district}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Søknadsinformasjon
                  </h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Innsendt:</strong> {app.submittedDate}</p>
                    <p><strong>Frist:</strong> {app.processingDeadline}</p>
                    <p><strong>Spesielle behov:</strong> {app.specialNeeds ? 'Ja' : 'Nei'}</p>
                    <p><strong>Søsken i bhg:</strong> {app.siblingInKindergarten ? 'Ja' : 'Nei'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Barnehagepreferanser</h4>
                  <div className="text-sm space-y-1">
                    {app.kindergartenChoices.map((choice, index) => (
                      <p key={index}>{index + 1}. {choice}</p>
                    ))}
                  </div>
                </div>
              </div>

              {app.income && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Husholdningsinntekt:</strong> {app.income.toLocaleString()} kr
                    {app.income < 500000 && (
                      <Badge className="ml-2 bg-green-100 text-green-800">Kvalifiserer for redusert avgift</Badge>
                    )}
                  </p>
                </div>
              )}

              {app.status === 'pending_documents' && (
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-800">
                    <strong>Mangler dokumentasjon:</strong> Inntektsopplysninger for redusert betaling
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Ingen søknader funnet som matcher dine filtre</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReviewQueue;
