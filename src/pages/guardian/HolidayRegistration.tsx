
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar,
  Check,
  AlertTriangle,
  CalendarRange,
  Plus,
  Save,
  CheckCircle,
  Edit,
  Trash2,
  Flag
} from 'lucide-react';
import { format, addDays, isAfter } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

const HolidayRegistration = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const today = new Date();
  const twoWeeksLater = addDays(today, 14);

  // Mock data
  const registeredHolidays = [
    {
      id: 1,
      type: 'vacation',
      startDate: '2024-06-24',
      endDate: '2024-07-15',
      description: 'Sommerferie til Vestlandet',
      status: 'confirmed',
      submittedDate: '2024-03-01'
    },
    {
      id: 2,
      type: 'travel',
      startDate: '2024-04-10',
      endDate: '2024-04-16',
      description: 'Påskeferie hos besteforeldre i Bergen',
      status: 'pending',
      submittedDate: '2024-03-15'
    }
  ];

  const holidayTypes = [
    { id: 'vacation', label: 'Ferie' },
    { id: 'travel', label: 'Reise' },
    { id: 'family', label: 'Familiebesøk' },
    { id: 'absence', label: 'Annet fravær' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Feriefravær registrert",
      description: "Barnehagen er informert om fraværet.",
    });
    
    setIsSubmitting(false);
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Bekreftet';
      case 'pending': return 'Venter godkjenning';
      case 'rejected': return 'Avvist';
      default: return 'Ukjent';
    }
  };

  const isDateTooClose = (dateStr: string) => {
    const date = new Date(dateStr);
    return !isAfter(date, twoWeeksLater);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Ferieregistrering</h1>
          <p className="text-slate-600 mt-2">Registrer fravær for ferier og spesielle perioder</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-oslo-blue/5 text-oslo-blue border-oslo-blue/20">
            <Calendar className="w-4 h-4 mr-2" />
            Ferieplanlegging
          </Badge>
          <Button onClick={() => setShowForm(true)} disabled={showForm}>
            <Plus className="w-4 h-4 mr-2" />
            Registrer fravær
          </Button>
        </div>
      </div>

      {/* Upcoming Important Dates Alert */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Viktige frister
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-yellow-200">
              <Calendar className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Sommerferie</p>
                <p className="text-sm text-yellow-700">Frist for registrering: 15. april 2024</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-yellow-200">
              <Calendar className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Juleferie</p>
                <p className="text-sm text-yellow-700">Frist for registrering: 1. november 2024</p>
              </div>
            </div>
            
            <p className="text-sm text-yellow-700 pt-2">
              <span className="font-semibold">NB:</span> Feriefravær må registreres minimum 14 dager i forveien.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Registration Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Registrer fravær</CardTitle>
            <CardDescription>
              Fyll ut informasjon om planlagt fravær
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label>Type fravær</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {holidayTypes.map((type) => (
                    <div
                      key={type.id}
                      className="border rounded-lg p-3 flex items-center justify-center text-center hover:border-oslo-blue hover:bg-oslo-blue/5 cursor-pointer transition-colors"
                    >
                      <span className="font-medium">{type.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date">Første fraværsdag</Label>
                  <Input
                    id="start-date"
                    type="date"
                    min={format(twoWeeksLater, 'yyyy-MM-dd')}
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Må være minst 14 dager fra i dag
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="end-date">Siste fraværsdag</Label>
                  <Input
                    id="end-date"
                    type="date"
                    min={format(twoWeeksLater, 'yyyy-MM-dd')}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Beskrivelse (valgfritt)</Label>
                <Textarea
                  id="description"
                  placeholder="F.eks. 'Familieferie til Spania'..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="contact">Kontaktinformasjon under fravær (valgfritt)</Label>
                <Input
                  id="contact"
                  placeholder="Telefon eller e-post hvis annerledes enn vanlig"
                />
              </div>
              
              <div className="flex gap-3">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Sender...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Registrer fravær
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Avbryt
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Registered Holidays */}
      <Card>
        <CardHeader>
          <CardTitle>Registrerte fravær</CardTitle>
          <CardDescription>
            Oversikt over planlagte ferier og fravær
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {registeredHolidays.map((holiday) => {
              const startDate = new Date(holiday.startDate);
              const endDate = new Date(holiday.endDate);
              const isTooClose = isDateTooClose(holiday.startDate);
              
              return (
                <div
                  key={holiday.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                      <CalendarRange className="w-6 h-6 text-slate-600" />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">{format(startDate, 'd. MMM', { locale: nb })} - {format(endDate, 'd. MMM yyyy', { locale: nb })}</h3>
                      <p className="text-sm text-slate-600">
                        {holiday.description}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Registrert: {format(new Date(holiday.submittedDate), 'd. MMM yyyy', { locale: nb })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(holiday.status)}>
                      {getStatusText(holiday.status)}
                    </Badge>
                    
                    {isTooClose && holiday.status === 'pending' && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Mindre enn 14d
                      </Badge>
                    )}
                    
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Kindergarten Holiday Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="w-5 h-5" />
            Barnehagens feriekalender 2024
          </CardTitle>
          <CardDescription>
            Oversikt over stengte dager og spesielle perioder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-slate-50">
              <div>
                <p className="font-medium">Påskestengt</p>
                <p className="text-sm text-slate-600">28. mars - 1. april 2024</p>
              </div>
              <Badge>Barnehagen stengt</Badge>
            </div>
            
            <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-slate-50">
              <div>
                <p className="font-medium">Sommerstengt</p>
                <p className="text-sm text-slate-600">15. juli - 29. juli 2024</p>
              </div>
              <Badge>Barnehagen stengt</Badge>
            </div>
            
            <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-slate-50">
              <div>
                <p className="font-medium">Planleggingsdag</p>
                <p className="text-sm text-slate-600">29. august 2024</p>
              </div>
              <Badge>Barnehagen stengt</Badge>
            </div>
            
            <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-slate-50">
              <div>
                <p className="font-medium">Julestengt</p>
                <p className="text-sm text-slate-600">24. desember - 1. januar 2025</p>
              </div>
              <Badge>Barnehagen stengt</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policy Information */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Check className="w-5 h-5" />
            Retningslinjer for feriefravær
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• Minimum 14 dagers varsel for alle typer feriefravær</p>
            <p>• Sommerferie må registreres innen 15. april</p>
            <p>• Juleferie må registreres innen 1. november</p>
            <p>• Barnehagen kan gi dispensasjon for kortere varsel i spesielle tilfeller</p>
            <p>• Registrerte ferier bidrar til planlegging av bemanning og aktiviteter</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HolidayRegistration;
