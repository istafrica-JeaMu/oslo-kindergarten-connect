
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Star, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Users,
  Calendar,
  Target
} from 'lucide-react';

interface PlacementDecisionProps {
  application: any;
  onPlacementDecision: (applicationId: string, decision: any) => void;
}

const PlacementDecisionPanel = ({ application, onPlacementDecision }: PlacementDecisionProps) => {
  const [selectedKindergarten, setSelectedKindergarten] = useState('');
  const [decisionType, setDecisionType] = useState('');
  const [reasonCode, setReasonCode] = useState('');
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState('');

  // Mock kindergarten data with availability
  const availableKindergartens = [
    {
      id: 'kg-001',
      name: 'Løvenskiold Kindergarten',
      district: 'Grünerløkka',
      availableSpots: 3,
      distance: 0.8,
      rating: 4.5,
      isPreferred: true
    },
    {
      id: 'kg-002',
      name: 'Sinsen Kindergarten',
      district: 'Grünerløkka',
      availableSpots: 1,
      distance: 1.2,
      rating: 4.3,
      isPreferred: true
    },
    {
      id: 'kg-003',
      name: 'Sagene Kindergarten',
      district: 'Sagene',
      availableSpots: 5,
      distance: 2.1,
      rating: 4.1,
      isPreferred: false
    }
  ];

  const decisionTypes = [
    { value: 'admitted_first_choice', label: 'Admitted - First Choice', color: 'green' },
    { value: 'admitted_alternative', label: 'Admitted - Alternative Choice', color: 'blue' },
    { value: 'waitlisted', label: 'Waitlisted', color: 'yellow' },
    { value: 'rejected', label: 'Rejected', color: 'red' },
    { value: 'redirect', label: 'Redirected to Alternative', color: 'purple' }
  ];

  const reasonCodes = {
    admitted_first_choice: ['SPOTS_AVAILABLE', 'HIGH_PRIORITY', 'SIBLING_PRIORITY'],
    admitted_alternative: ['FIRST_CHOICE_FULL', 'BETTER_MATCH', 'DISTANCE_FACTOR'],
    waitlisted: ['NO_CAPACITY', 'HIGHER_PRIORITY_APPLICANTS', 'LATE_APPLICATION'],
    rejected: ['OUTSIDE_CATCHMENT', 'INCOMPLETE_DOCS', 'AGE_REQUIREMENT'],
    redirect: ['CAPACITY_OPTIMIZATION', 'BETTER_ALTERNATIVE', 'DISTANCE_PREFERENCE']
  };

  const handlePlacementDecision = () => {
    const decision = {
      kindergarten: selectedKindergarten,
      decisionType,
      reasonCode,
      notes,
      startDate,
      timestamp: new Date().toISOString()
    };

    onPlacementDecision(application.id, decision);
  };

  const getDecisionColor = (type: string) => {
    const decision = decisionTypes.find(d => d.value === type);
    return decision?.color || 'gray';
  };

  return (
    <div className="space-y-6">
      {/* Application Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Placement Decision for {application.childName}
          </CardTitle>
          <CardDescription>
            Age: {application.childAge} years | Priority: {application.priority} | District: {application.district}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Kindergarten Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Available Kindergartens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {availableKindergartens.map((kg) => (
              <div 
                key={kg.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedKindergarten === kg.id 
                    ? 'border-oslo-blue bg-oslo-blue/5' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedKindergarten(kg.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{kg.name}</h4>
                      {kg.isPreferred && (
                        <Badge className="bg-blue-100 text-blue-800">
                          <Star className="h-3 w-3 mr-1" />
                          Preferred
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>District: {kg.district}</div>
                      <div>Distance: {kg.distance} km</div>
                      <div className="flex items-center gap-1">
                        Rating: {kg.rating}/5
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < Math.floor(kg.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      kg.availableSpots > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kg.availableSpots} spots
                    </div>
                    <div className="text-sm text-gray-500">available</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Decision Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Decision Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select value={decisionType} onValueChange={setDecisionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select decision type" />
              </SelectTrigger>
              <SelectContent>
                {decisionTypes.map(decision => (
                  <SelectItem key={decision.value} value={decision.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${decision.color}-500`} />
                      {decision.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {decisionType && reasonCodes[decisionType as keyof typeof reasonCodes] && (
              <Select value={reasonCode} onValueChange={setReasonCode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason code" />
                </SelectTrigger>
                <SelectContent>
                  {reasonCodes[decisionType as keyof typeof reasonCodes].map(code => (
                    <SelectItem key={code} value={code}>
                      {code.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {(decisionType === 'admitted_first_choice' || decisionType === 'admitted_alternative') && (
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Proposed Start Date
              </label>
              <input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          )}

          <Textarea
            placeholder="Additional notes for decision..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Decision Preview */}
      {decisionType && (
        <Card className={`border-${getDecisionColor(decisionType)}-200 bg-${getDecisionColor(decisionType)}-50`}>
          <CardHeader>
            <CardTitle className={`text-${getDecisionColor(decisionType)}-800`}>
              Decision Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {decisionType.includes('admitted') && <CheckCircle className="h-4 w-4 text-green-600" />}
                {decisionType === 'waitlisted' && <Clock className="h-4 w-4 text-yellow-600" />}
                {decisionType === 'rejected' && <XCircle className="h-4 w-4 text-red-600" />}
                {decisionType === 'redirect' && <AlertCircle className="h-4 w-4 text-purple-600" />}
                <strong>
                  {decisionTypes.find(d => d.value === decisionType)?.label}
                </strong>
              </div>
              {selectedKindergarten && (
                <div>
                  Kindergarten: {availableKindergartens.find(kg => kg.id === selectedKindergarten)?.name}
                </div>
              )}
              {reasonCode && (
                <div>Reason: {reasonCode.replace(/_/g, ' ')}</div>
              )}
              {startDate && (
                <div>Start Date: {new Date(startDate).toLocaleDateString()}</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          onClick={handlePlacementDecision}
          disabled={!decisionType || !reasonCode}
          className="flex-1"
        >
          Confirm Placement Decision
        </Button>
        <Button variant="outline">
          Save as Draft
        </Button>
      </div>
    </div>
  );
};

export default PlacementDecisionPanel;
