
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  UserX,
  Thermometer,
  Stethoscope,
  AlertTriangle,
  Calendar,
  Clock,
  CheckCircle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

const AbsenceReporting = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [timeType, setTimeType] = useState('full-day');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const absenceReasons = [
    { id: 'sick', label: 'Sykdom', icon: Thermometer, color: 'bg-red-100 text-red-700 border-red-200' },
    { id: 'doctor', label: 'Legetime', icon: Stethoscope, color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: 'emergency', label: 'Familienødstilfelle', icon: AlertTriangle, color: 'bg-orange-100 text-orange-700 border-orange-200' },
    { id: 'other', label: 'Annet', icon: UserX, color: 'bg-gray-100 text-gray-700 border-gray-200' },
  ];

  const timeOptions = [
    { id: 'full-day', label: 'Hele dagen' },
    { id: 'morning', label: 'Kun formiddag' },
    { id: 'afternoon', label: 'Kun ettermiddag' },
  ];

  // Mock reported absences
  const reportedAbsences = [
    {
      id: 1,
      date: '2024-03-15',
      reason: 'sick',
      timeType: 'full-day',
      description: 'Feber og vondt i halsen',
      status: 'confirmed',
      reportedAt: '2024-03-15T07:30:00'
    },
    {
      id: 2,
      date: '2024-03-20',
      reason: 'doctor',
      timeType: 'morning',
      description: 'Tannlegetime kl 10:00',
      status: 'pending',
      reportedAt: '2024-03-18T18:45:00'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason || !selectedDate) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Fravær rapportert",
      description: `Fraværet for ${format(new Date(selectedDate), 'd. MMMM yyyy', { locale: nb })} er registrert.`,
    });

    // Reset form
    setSelectedReason('');
    setDescription('');
    setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
    setTimeType('full-day');
    setIsSubmitting(false);
  };

  const getReasonDetails = (reasonId: string) => {
    return absenceReasons.find(r => r.id === reasonId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Fravær</h1>
          <p className="text-slate-600 mt-2">Rapporter når barnet ditt ikke kan møte i barnehagen</p>
        </div>
        <Badge variant="outline" className="bg-oslo-blue/5 text-oslo-blue border-oslo-blue/20">
          <UserX className="w-4 h-4 mr-2" />
          Fraværsrapportering
        </Badge>
      </div>

      {/* Quick Report Today */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-orange-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Rask rapportering - I dag
          </CardTitle>
          <CardDescription className="text-orange-700">
            Rapporter fravær for i dag med ett klikk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {absenceReasons.map((reason) => (
              <Button
                key={reason.id}
                variant="outline"
                className="h-20 flex-col gap-2 border-orange-200 hover:bg-orange-100"
                onClick={() => {
                  setSelectedReason(reason.id);
                  setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
                }}
              >
                <reason.icon className="w-6 h-6" />
                <span className="text-sm">{reason.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Absence Report Form */}
      <Card>
        <CardHeader>
          <CardTitle>Rapporter fravær</CardTitle>
          <CardDescription>
            Fyll ut detaljer for fraværet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="absence-date">Dato</Label>
              <Input
                id="absence-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
                max={format(addDays(new Date(), 30), 'yyyy-MM-dd')}
                required
              />
            </div>

            {/* Reason Selection */}
            <div className="space-y-3">
              <Label>Årsak til fravær</Label>
              <div className="grid grid-cols-2 gap-3">
                {absenceReasons.map((reason) => (
                  <button
                    key={reason.id}
                    type="button"
                    onClick={() => setSelectedReason(reason.id)}
                    className={`p-4 rounded-lg border transition-all flex items-center gap-3 ${
                      selectedReason === reason.id
                        ? 'border-oslo-blue bg-oslo-blue/5 ring-2 ring-oslo-blue/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <reason.icon className="w-5 h-5" />
                    <span className="font-medium">{reason.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Type Selection */}
            <div className="space-y-3">
              <Label>Varighet</Label>
              <div className="flex gap-3">
                {timeOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setTimeType(option.id)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      timeType === option.id
                        ? 'border-oslo-blue bg-oslo-blue text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Beskrivelse (valgfritt)</Label>
              <Textarea
                id="description"
                placeholder="Tilleggsinfo om fraværet..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!selectedReason || !selectedDate || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Rapporterer...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Rapporter fravær
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Reported Absences */}
      <Card>
        <CardHeader>
          <CardTitle>Rapporterte fravær</CardTitle>
          <CardDescription>
            Oversikt over tidligere og planlagte fravær
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportedAbsences.map((absence) => {
              const reasonDetails = getReasonDetails(absence.reason);
              return (
                <div
                  key={absence.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      {reasonDetails && <reasonDetails.icon className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {format(new Date(absence.date), 'd. MMMM yyyy', { locale: nb })}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {reasonDetails?.label} • {
                          absence.timeType === 'full-day' ? 'Hele dagen' :
                          absence.timeType === 'morning' ? 'Formiddag' : 'Ettermiddag'
                        }
                      </p>
                      {absence.description && (
                        <p className="text-sm text-slate-500 mt-1">{absence.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(absence.status)}>
                      {absence.status === 'confirmed' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Bekreftet
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 mr-1" />
                          Venter
                        </>
                      )}
                    </Badge>
                    
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
    </div>
  );
};

export default AbsenceReporting;
