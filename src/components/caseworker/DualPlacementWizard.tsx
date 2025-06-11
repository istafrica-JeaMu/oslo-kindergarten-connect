
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Calendar, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  MapPin,
  Clock,
  Upload,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { WeeklySchedule, DualPlacement } from '@/types/dualPlacement';
import { toast } from 'sonner';

interface DualPlacementWizardProps {
  applicationId: string;
  childName: string;
  onComplete: (placement: DualPlacement) => void;
  onCancel: () => void;
}

const DualPlacementWizard = ({ applicationId, childName, onComplete, onCancel }: DualPlacementWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [primaryKindergarten, setPrimaryKindergarten] = useState('');
  const [secondaryKindergarten, setSecondaryKindergarten] = useState('');
  const [primarySchedule, setPrimarySchedule] = useState<WeeklySchedule>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false
  });
  const [secondarySchedule, setSecondarySchedule] = useState<WeeklySchedule>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false
  });
  const [justification, setJustification] = useState('');
  const [documents, setDocuments] = useState<string[]>([]);

  const availableKindergartens = [
    { id: 'kg-001', name: 'Frogner Barnehage', district: 'Frogner', availableSpots: 3 },
    { id: 'kg-002', name: 'Majorstuen Barnehage', district: 'Frogner', availableSpots: 2 },
    { id: 'kg-003', name: 'Grünerløkka Barnehage', district: 'Grünerløkka', availableSpots: 1 },
    { id: 'kg-004', name: 'Sagene Barnehage', district: 'Sagene', availableSpots: 4 }
  ];

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' }
  ];

  const calculateCustodyPercentage = (schedule: WeeklySchedule) => {
    const activeDays = Object.values(schedule).filter(Boolean).length;
    return Math.round((activeDays / 5) * 100);
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return primaryKindergarten && Object.values(primarySchedule).some(Boolean);
      case 2:
        return secondaryKindergarten && Object.values(secondarySchedule).some(Boolean);
      case 3:
        const primaryPercentage = calculateCustodyPercentage(primarySchedule);
        const secondaryPercentage = calculateCustodyPercentage(secondarySchedule);
        return primaryPercentage + secondaryPercentage === 100;
      case 4:
        return justification.length > 10;
      default:
        return true;
    }
  };

  const handleScheduleChange = (
    schedule: WeeklySchedule, 
    setSchedule: (schedule: WeeklySchedule) => void,
    day: string, 
    checked: boolean
  ) => {
    const newSchedule = { ...schedule, [day]: checked };
    setSchedule(newSchedule);
    
    // Auto-update the other schedule to prevent conflicts
    if (checked) {
      const otherSchedule = schedule === primarySchedule ? secondarySchedule : primarySchedule;
      const setOtherSchedule = schedule === primarySchedule ? setSecondarySchedule : setPrimarySchedule;
      setOtherSchedule({ ...otherSchedule, [day]: false });
    }
  };

  const handleComplete = () => {
    const newPlacement: DualPlacement = {
      id: `DP-${Date.now()}`,
      childId: applicationId,
      primaryKindergarten: {
        id: primaryKindergarten,
        name: availableKindergartens.find(kg => kg.id === primaryKindergarten)?.name || '',
        schedule: primarySchedule,
        custodyPercentage: calculateCustodyPercentage(primarySchedule)
      },
      secondaryKindergarten: {
        id: secondaryKindergarten,
        name: availableKindergartens.find(kg => kg.id === secondaryKindergarten)?.name || '',
        schedule: secondarySchedule,
        custodyPercentage: calculateCustodyPercentage(secondarySchedule)
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
      justification,
      supportingDocuments: documents
    };

    onComplete(newPlacement);
    toast.success('Dual placement configuration completed');
  };

  const progressPercentage = (currentStep / 5) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Users className="h-6 w-6 text-oslo-blue" />
            Dual Placement Wizard - {childName}
          </CardTitle>
          <CardDescription>
            Configure dual kindergarten placement with weekly schedule allocation
          </CardDescription>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>Step {currentStep} of 5</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Step 1: Primary Kindergarten Selection */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Step 1: Choose Primary Kindergarten & Schedule
            </CardTitle>
            <CardDescription>
              Select the primary kindergarten and the days the child will attend
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Select value={primaryKindergarten} onValueChange={setPrimaryKindergarten}>
              <SelectTrigger>
                <SelectValue placeholder="Select primary kindergarten" />
              </SelectTrigger>
              <SelectContent>
                {availableKindergartens.map(kg => (
                  <SelectItem key={kg.id} value={kg.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{kg.name} - {kg.district}</span>
                      <Badge variant="outline" className="ml-2">
                        {kg.availableSpots} spots
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div>
              <h4 className="font-medium mb-3">Primary Schedule (Select days)</h4>
              <div className="grid grid-cols-5 gap-3">
                {days.map(day => (
                  <div key={day.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`primary-${day.key}`}
                      checked={primarySchedule[day.key as keyof WeeklySchedule]}
                      onCheckedChange={(checked) => 
                        handleScheduleChange(primarySchedule, setPrimarySchedule, day.key, checked as boolean)
                      }
                    />
                    <label htmlFor={`primary-${day.key}`} className="text-sm font-medium">
                      {day.label}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Custody percentage: {calculateCustodyPercentage(primarySchedule)}%
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Secondary Kindergarten Selection */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Step 2: Choose Secondary Kindergarten & Schedule
            </CardTitle>
            <CardDescription>
              Select the secondary kindergarten for remaining days
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Select value={secondaryKindergarten} onValueChange={setSecondaryKindergarten}>
              <SelectTrigger>
                <SelectValue placeholder="Select secondary kindergarten" />
              </SelectTrigger>
              <SelectContent>
                {availableKindergartens
                  .filter(kg => kg.id !== primaryKindergarten)
                  .map(kg => (
                    <SelectItem key={kg.id} value={kg.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{kg.name} - {kg.district}</span>
                        <Badge variant="outline" className="ml-2">
                          {kg.availableSpots} spots
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div>
              <h4 className="font-medium mb-3">Secondary Schedule (Remaining days)</h4>
              <div className="grid grid-cols-5 gap-3">
                {days.map(day => (
                  <div key={day.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`secondary-${day.key}`}
                      checked={secondarySchedule[day.key as keyof WeeklySchedule]}
                      disabled={primarySchedule[day.key as keyof WeeklySchedule]}
                      onCheckedChange={(checked) => 
                        handleScheduleChange(secondarySchedule, setSecondarySchedule, day.key, checked as boolean)
                      }
                    />
                    <label 
                      htmlFor={`secondary-${day.key}`} 
                      className={`text-sm font-medium ${
                        primarySchedule[day.key as keyof WeeklySchedule] ? 'text-gray-400' : ''
                      }`}
                    >
                      {day.label}
                      {primarySchedule[day.key as keyof WeeklySchedule] && ' (Primary)'}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Custody percentage: {calculateCustodyPercentage(secondarySchedule)}%
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Schedule Validation */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Step 3: Validate Schedule & Custody Allocation
            </CardTitle>
            <CardDescription>
              Review the weekly schedule and ensure 100% coverage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Primary Kindergarten</h4>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-medium">
                    {availableKindergartens.find(kg => kg.id === primaryKindergarten)?.name}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {calculateCustodyPercentage(primarySchedule)}% custody
                  </p>
                  <div className="space-y-1">
                    {days.map(day => (
                      <div key={day.key} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          primarySchedule[day.key as keyof WeeklySchedule] ? 'bg-blue-500' : 'bg-gray-200'
                        }`} />
                        <span className="text-sm">{day.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Secondary Kindergarten</h4>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-medium">
                    {availableKindergartens.find(kg => kg.id === secondaryKindergarten)?.name}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {calculateCustodyPercentage(secondarySchedule)}% custody
                  </p>
                  <div className="space-y-1">
                    {days.map(day => (
                      <div key={day.key} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          secondarySchedule[day.key as keyof WeeklySchedule] ? 'bg-green-500' : 'bg-gray-200'
                        }`} />
                        <span className="text-sm">{day.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Validation Alert */}
            <div className={`p-4 rounded-lg flex items-center gap-3 ${
              calculateCustodyPercentage(primarySchedule) + calculateCustodyPercentage(secondarySchedule) === 100
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              {calculateCustodyPercentage(primarySchedule) + calculateCustodyPercentage(secondarySchedule) === 100 ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-700 font-medium">
                    Schedule validated - Total coverage: 100%
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="text-red-700 font-medium">
                    Invalid schedule - Total coverage: {calculateCustodyPercentage(primarySchedule) + calculateCustodyPercentage(secondarySchedule)}%
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Justification */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Step 4: Provide Justification
            </CardTitle>
            <CardDescription>
              Explain the reason for dual placement and attach supporting documents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder="Provide detailed justification for dual placement (custody arrangement, logistical needs, etc.)"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className="min-h-[120px]"
            />

            <div>
              <h4 className="font-medium mb-3">Supporting Documents</h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload custody agreements, address verification, etc.</p>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Final Review */}
      {currentStep === 5 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Step 5: Final Review
            </CardTitle>
            <CardDescription>
              Review all details before submitting the dual placement configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Placement Summary</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Primary:</strong> {availableKindergartens.find(kg => kg.id === primaryKindergarten)?.name}</p>
                    <p><strong>Days:</strong> {days.filter(day => primarySchedule[day.key as keyof WeeklySchedule]).map(day => day.label).join(', ')}</p>
                    <p><strong>Custody:</strong> {calculateCustodyPercentage(primarySchedule)}%</p>
                  </div>
                  <div>
                    <p><strong>Secondary:</strong> {availableKindergartens.find(kg => kg.id === secondaryKindergarten)?.name}</p>
                    <p><strong>Days:</strong> {days.filter(day => secondarySchedule[day.key as keyof WeeklySchedule]).map(day => day.label).join(', ')}</p>
                    <p><strong>Custody:</strong> {calculateCustodyPercentage(secondarySchedule)}%</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Justification</h4>
                <p className="text-sm text-gray-700">{justification}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          {currentStep > 1 && (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          )}
        </div>
        
        <div>
          {currentStep < 5 ? (
            <Button 
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!validateStep(currentStep)}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              disabled={!validateStep(currentStep)}
              className="bg-oslo-blue hover:bg-oslo-blue/90"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Dual Placement
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DualPlacementWizard;
