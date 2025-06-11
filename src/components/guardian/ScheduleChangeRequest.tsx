
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Send,
  AlertCircle,
  CheckCircle,
  Upload,
  ArrowLeftRight,
  MapPin
} from 'lucide-react';
import { WeeklySchedule, DualPlacement, ScheduleChangeRequest as ScheduleChangeRequestType } from '@/types/dualPlacement';
import { mockDualPlacements } from '@/types/dualPlacement';
import { toast } from 'sonner';

interface ScheduleChangeRequestProps {
  dualPlacementId: string;
}

const ScheduleChangeRequest = ({ dualPlacementId }: ScheduleChangeRequestProps) => {
  const [requestType, setRequestType] = useState<'temporary' | 'permanent' | 'seasonal'>('permanent');
  const [reason, setReason] = useState('');
  const [newPrimarySchedule, setNewPrimarySchedule] = useState<WeeklySchedule>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false
  });
  const [newSecondarySchedule, setNewSecondarySchedule] = useState<WeeklySchedule>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false
  });

  const dualPlacement = mockDualPlacements.find(dp => dp.id === dualPlacementId);

  if (!dualPlacement) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Dual Placement Not Found</h3>
          <p className="text-gray-600">The dual placement configuration could not be found.</p>
        </CardContent>
      </Card>
    );
  }

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
      const otherSchedule = schedule === newPrimarySchedule ? newSecondarySchedule : newPrimarySchedule;
      const setOtherSchedule = schedule === newPrimarySchedule ? setNewSecondarySchedule : setNewPrimarySchedule;
      setOtherSchedule({ ...otherSchedule, [day]: false });
    }
  };

  const handleSubmitRequest = () => {
    const newRequest: ScheduleChangeRequestType = {
      id: `SCR-${Date.now()}`,
      dualPlacementId,
      requestType,
      proposedChanges: {
        primarySchedule: newPrimarySchedule,
        secondarySchedule: newSecondarySchedule,
        newCustodyPercentages: {
          primary: calculateCustodyPercentage(newPrimarySchedule),
          secondary: calculateCustodyPercentage(newSecondarySchedule)
        }
      },
      reason,
      requestedBy: 'Current Guardian',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    console.log('Schedule change request submitted:', newRequest);
    toast.success('Schedule change request submitted for review');
  };

  const isValidSchedule = () => {
    const totalPercentage = calculateCustodyPercentage(newPrimarySchedule) + calculateCustodyPercentage(newSecondarySchedule);
    return totalPercentage === 100 && reason.length > 10;
  };

  return (
    <div className="space-y-6">
      {/* Current Placement Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <ArrowLeftRight className="h-6 w-6 text-oslo-blue" />
            Current Dual Placement
          </CardTitle>
          <CardDescription>
            Current schedule and custody allocation for your child
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600">P</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{dualPlacement.primaryKindergarten.name}</h4>
                  <p className="text-sm text-gray-600">Primary Kindergarten</p>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium mb-2">{dualPlacement.primaryKindergarten.custodyPercentage}% custody</p>
                <div className="space-y-1">
                  {days.map(day => (
                    <div key={day.key} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        dualPlacement.primaryKindergarten.schedule[day.key as keyof WeeklySchedule] 
                          ? 'bg-blue-500' : 'bg-gray-200'
                      }`} />
                      <span className="text-sm">{day.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-green-100 text-green-600">S</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{dualPlacement.secondaryKindergarten.name}</h4>
                  <p className="text-sm text-gray-600">Secondary Kindergarten</p>
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium mb-2">{dualPlacement.secondaryKindergarten.custodyPercentage}% custody</p>
                <div className="space-y-1">
                  {days.map(day => (
                    <div key={day.key} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        dualPlacement.secondaryKindergarten.schedule[day.key as keyof WeeklySchedule] 
                          ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                      <span className="text-sm">{day.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Change Request Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Request Schedule Change
          </CardTitle>
          <CardDescription>
            Propose changes to your child's dual placement schedule
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Request Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Change Type
            </label>
            <Select value={requestType} onValueChange={(value: 'temporary' | 'permanent' | 'seasonal') => setRequestType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="permanent">Permanent Change</SelectItem>
                <SelectItem value="temporary">Temporary Change (up to 3 months)</SelectItem>
                <SelectItem value="seasonal">Seasonal Change (recurring)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* New Schedule Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium">Proposed New Schedule</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Primary Kindergarten New Schedule */}
              <div className="space-y-3">
                <h5 className="text-sm font-medium">Primary: {dualPlacement.primaryKindergarten.name}</h5>
                <div className="space-y-2">
                  {days.map(day => (
                    <div key={day.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`new-primary-${day.key}`}
                        checked={newPrimarySchedule[day.key as keyof WeeklySchedule]}
                        onCheckedChange={(checked) => 
                          handleScheduleChange(newPrimarySchedule, setNewPrimarySchedule, day.key, checked as boolean)
                        }
                      />
                      <label htmlFor={`new-primary-${day.key}`} className="text-sm">
                        {day.label}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  New custody: {calculateCustodyPercentage(newPrimarySchedule)}%
                </p>
              </div>

              {/* Secondary Kindergarten New Schedule */}
              <div className="space-y-3">
                <h5 className="text-sm font-medium">Secondary: {dualPlacement.secondaryKindergarten.name}</h5>
                <div className="space-y-2">
                  {days.map(day => (
                    <div key={day.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`new-secondary-${day.key}`}
                        checked={newSecondarySchedule[day.key as keyof WeeklySchedule]}
                        disabled={newPrimarySchedule[day.key as keyof WeeklySchedule]}
                        onCheckedChange={(checked) => 
                          handleScheduleChange(newSecondarySchedule, setNewSecondarySchedule, day.key, checked as boolean)
                        }
                      />
                      <label 
                        htmlFor={`new-secondary-${day.key}`} 
                        className={`text-sm ${
                          newPrimarySchedule[day.key as keyof WeeklySchedule] ? 'text-gray-400' : ''
                        }`}
                      >
                        {day.label}
                        {newPrimarySchedule[day.key as keyof WeeklySchedule] && ' (Primary)'}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  New custody: {calculateCustodyPercentage(newSecondarySchedule)}%
                </p>
              </div>
            </div>

            {/* Schedule Validation */}
            <div className={`p-4 rounded-lg flex items-center gap-3 ${
              calculateCustodyPercentage(newPrimarySchedule) + calculateCustodyPercentage(newSecondarySchedule) === 100
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              {calculateCustodyPercentage(newPrimarySchedule) + calculateCustodyPercentage(newSecondarySchedule) === 100 ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-700 font-medium">
                    Valid schedule - Total coverage: 100%
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-700 font-medium">
                    Invalid schedule - Total coverage: {calculateCustodyPercentage(newPrimarySchedule) + calculateCustodyPercentage(newSecondarySchedule)}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Reason for Change */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Reason for Schedule Change
            </label>
            <Textarea
              placeholder="Please explain why you need to change the schedule (e.g., change in work hours, custody arrangement modification, etc.)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Supporting Documents */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Supporting Documents (if applicable)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload updated custody agreements, work schedules, etc.</p>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
            </div>
          </div>

          <Separator />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmitRequest}
              disabled={!isValidSchedule()}
              className="bg-oslo-blue hover:bg-oslo-blue/90"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Change Request
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Processing Information</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Schedule change requests are typically reviewed within 5-7 business days</li>
                <li>• You will receive email notifications about the status of your request</li>
                <li>• Emergency changes can be processed faster - contact your caseworker directly</li>
                <li>• Both kindergartens will be notified if your request is approved</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleChangeRequest;
