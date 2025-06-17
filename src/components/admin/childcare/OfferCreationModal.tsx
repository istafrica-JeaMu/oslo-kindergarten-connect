
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Building, Calendar, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Child } from '@/types/childcare';

interface OfferCreationData {
  childCivicNumber: string;
  childName: string;
  applicantName: string;
  coApplicant?: string;
  billRecipient: string;
  nativeLanguage: string;
  chosenUnit: string;
  department: string;
  operation: 'Barnehage' | 'Arbete';
  reasonType: string;
  ratecategory: string;
  averageTime: number;
  startDate: string;
  latestAnswerDate: string;
  queueDate: string;
  requestedAdmissionDate: string;
  paragraphSet: string;
  internalNote?: string;
  areaCode?: string;
  areaName?: string;
  cityDistrict?: string;
}

interface OfferCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  childData: Child;
  serviceType: 'childcare' | 'afterschool';
  onOfferCreated: (offer: OfferCreationData) => void;
}

const OfferCreationModal = ({ isOpen, onClose, childData, serviceType, onOfferCreated }: OfferCreationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OfferCreationData>({
    childCivicNumber: childData.civicNumber,
    childName: childData.fullName,
    applicantName: '',
    billRecipient: '',
    nativeLanguage: 'Svenska',
    chosenUnit: '',
    department: '',
    operation: 'Barnehage',
    reasonType: 'Arbete',
    ratecategory: '',
    averageTime: 40,
    startDate: '',
    latestAnswerDate: '',
    queueDate: new Date().toISOString().split('T')[0],
    requestedAdmissionDate: '',
    paragraphSet: 'Standard'
  });

  const totalSteps = 4;
  const stepProgress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof OfferCreationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleCreateOffer = () => {
    onOfferCreated(formData);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicOfferInfo formData={formData} onChange={updateFormData} serviceType={serviceType} />;
      case 2:
        return <PlacementConfiguration formData={formData} onChange={updateFormData} serviceType={serviceType} />;
      case 3:
        return <ScheduleConfiguration formData={formData} onChange={updateFormData} serviceType={serviceType} />;
      case 4:
        return <OfferReviewConfirmation formData={formData} serviceType={serviceType} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {serviceType === 'childcare' ? <Building className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
              <span>Create {serviceType === 'childcare' ? 'Childcare' : 'After-School'} Offer</span>
            </div>
            <Badge variant="outline" className="ml-auto">
              Step {currentStep} of {totalSteps}
            </Badge>
          </DialogTitle>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              Creating offer for: <span className="font-medium">{childData.fullName}</span> ({childData.civicNumber})
            </div>
            <Progress value={stepProgress} className="h-2" />
          </div>
        </DialogHeader>

        <div className="py-6">
          {renderStepContent()}
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Info className="h-4 w-4" />
            <span>All fields marked with * are required</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button onClick={handleCreateOffer} className="bg-green-600 hover:bg-green-700">
                Create Offer
              </Button>
            )}
            
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Step 1: Basic Offer Information
const BasicOfferInfo = ({ formData, onChange, serviceType }: any) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Child & Family Information
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Child Name *</label>
          <Input value={formData.childName} readOnly className="bg-gray-50" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Child Civic Number *</label>
          <Input value={formData.childCivicNumber} readOnly className="bg-gray-50" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Applicant *</label>
          <Input 
            value={formData.applicantName}
            onChange={(e) => onChange('applicantName', e.target.value)}
            placeholder="Enter applicant name"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Co-applicant</label>
          <Input 
            value={formData.coApplicant || ''}
            onChange={(e) => onChange('coApplicant', e.target.value)}
            placeholder="Enter co-applicant name"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Bill Recipient *</label>
          <Input 
            value={formData.billRecipient}
            onChange={(e) => onChange('billRecipient', e.target.value)}
            placeholder="Enter bill recipient"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Native Language</label>
          <Select value={formData.nativeLanguage} onValueChange={(value) => onChange('nativeLanguage', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Svenska">Svenska</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Arabic">Arabic</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Step 2: Placement Configuration
const PlacementConfiguration = ({ formData, onChange, serviceType }: any) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          {serviceType === 'childcare' ? 'Childcare' : 'After-School'} Placement Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Chosen Unit *</label>
            <Select value={formData.chosenUnit} onValueChange={(value) => onChange('chosenUnit', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Månadens förskola">Månadens förskola</SelectItem>
                <SelectItem value="Björnens Förskola">Björnens Förskola</SelectItem>
                <SelectItem value="Sunflower Preschool">Sunflower Preschool</SelectItem>
                <SelectItem value="Rainbow After-School">Rainbow After-School</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Department</label>
            <Select value={formData.department} onValueChange={(value) => onChange('department', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Småbarn">Småbarn (1-3 years)</SelectItem>
                <SelectItem value="Mellanålder">Mellanålder (3-5 years)</SelectItem>
                <SelectItem value="Förskolebarn">Förskolebarn (5-6 years)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Operation</label>
            <Select value={formData.operation} onValueChange={(value) => onChange('operation', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Barnehage">Barnehage</SelectItem>
                <SelectItem value="Arbete">Arbete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Reason Type</label>
            <Select value={formData.reasonType} onValueChange={(value) => onChange('reasonType', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arbete">Arbete</SelectItem>
                <SelectItem value="Studier">Studier</SelectItem>
                <SelectItem value="Annat">Annat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Rate Category *</label>
          <Select value={formData.ratecategory} onValueChange={(value) => onChange('ratecategory', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select rate category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Standard">Standard Rate</SelectItem>
              <SelectItem value="Reduced">Reduced Rate</SelectItem>
              <SelectItem value="Low Income">Low Income</SelectItem>
              <SelectItem value="Free">Free (Special Circumstances)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Step 3: Schedule Configuration
const ScheduleConfiguration = ({ formData, onChange, serviceType }: any) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Schedule & Timing Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Start Date *</label>
            <Input 
              type="date"
              value={formData.startDate}
              onChange={(e) => onChange('startDate', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Latest Answer Date *</label>
            <Input 
              type="date"
              value={formData.latestAnswerDate}
              onChange={(e) => onChange('latestAnswerDate', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Queue Date</label>
            <Input 
              type="date"
              value={formData.queueDate}
              onChange={(e) => onChange('queueDate', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Requested Admission Date</label>
            <Input 
              type="date"
              value={formData.requestedAdmissionDate}
              onChange={(e) => onChange('requestedAdmissionDate', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Average Time ({serviceType === 'childcare' ? 'Hours per week' : 'Hours per day'}) *
          </label>
          <Input 
            type="number"
            value={formData.averageTime}
            onChange={(e) => onChange('averageTime', parseInt(e.target.value))}
            min="1"
            max={serviceType === 'childcare' ? "50" : "12"}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Paragraph Set</label>
          <Select value={formData.paragraphSet} onValueChange={(value) => onChange('paragraphSet', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="Special Needs">Special Needs</SelectItem>
              <SelectItem value="Temporary">Temporary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Step 4: Review & Confirmation
const OfferReviewConfirmation = ({ formData, serviceType }: any) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Offer Summary & Confirmation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-3">Offer Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700 font-medium">Child:</span>
              <div>{formData.childName} ({formData.childCivicNumber})</div>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Applicant:</span>
              <div>{formData.applicantName}</div>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Unit:</span>
              <div>{formData.chosenUnit}</div>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Department:</span>
              <div>{formData.department}</div>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Start Date:</span>
              <div>{formData.startDate}</div>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Average Time:</span>
              <div>{formData.averageTime} {serviceType === 'childcare' ? 'hours/week' : 'hours/day'}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <div className="text-sm">
            <div className="font-medium text-yellow-800">Important Notice</div>
            <div className="text-yellow-700">
              Guardian will receive notification within 24 hours. Response deadline: {formData.latestAnswerDate}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default OfferCreationModal;
