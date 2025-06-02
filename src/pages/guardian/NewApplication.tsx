
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Send, 
  User, 
  Baby, 
  Building, 
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewApplication = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const totalSteps = 4;

  // Form state
  const [formData, setFormData] = useState({
    // Child information
    childName: '',
    childBirthDate: '',
    childNationalId: '',
    
    // Guardian information
    guardianName: 'Anna Hansen', // Pre-filled from user context
    guardianEmail: 'guardian@example.com',
    guardianPhone: '',
    
    // Kindergarten preferences
    preferredKindergartens: [] as string[],
    startDate: '',
    
    // Additional information
    specialNeeds: false,
    specialNeedsDescription: '',
    siblingInKindergarten: false,
    siblingKindergarten: ''
  });

  const kindergartens = [
    { id: 'k1', name: 'Løvenskiold Kindergarten', district: 'Frogner', type: 'Municipal' },
    { id: 'k2', name: 'Sinsen Kindergarten', district: 'Grünerløkka', type: 'Municipal' },
    { id: 'k3', name: 'Sagene Kindergarten', district: 'Sagene', type: 'Municipal' },
    { id: 'k4', name: 'Vårtun Kindergarten', district: 'Søndre Nordstrand', type: 'Private' },
    { id: 'k5', name: 'Bjølsen Kindergarten', district: 'Sagene', type: 'Municipal' }
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when field is updated
    if (validationErrors[field]) {
      setValidationErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const validateStep = (step: number) => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.childName.trim()) errors.childName = t('common.validation.nameRequired');
        if (!formData.childBirthDate) errors.childBirthDate = t('common.validation.birthDateRequired');
        if (!formData.childNationalId.trim()) {
          errors.childNationalId = t('common.validation.nationalIdRequired');
        } else if (formData.childNationalId.length !== 11) {
          errors.childNationalId = t('common.validation.nationalIdLength');
        }
        break;
      case 2:
        if (!formData.guardianPhone.trim()) errors.guardianPhone = t('common.validation.phoneRequired');
        break;
      case 3:
        if (formData.preferredKindergartens.length === 0) {
          errors.preferredKindergartens = t('common.validation.kindergartenRequired');
        }
        if (!formData.startDate) errors.startDate = t('common.validation.startDateRequired');
        break;
      case 4:
        if (formData.specialNeeds && !formData.specialNeedsDescription.trim()) {
          errors.specialNeedsDescription = t('common.validation.specialNeedsRequired');
        }
        if (formData.siblingInKindergarten && !formData.siblingKindergarten) {
          errors.siblingKindergarten = t('common.validation.siblingKindergartenRequired');
        }
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addKindergarten = (kindergartenId: string) => {
    if (formData.preferredKindergartens.length < 5 && !formData.preferredKindergartens.includes(kindergartenId)) {
      updateFormData('preferredKindergartens', [...formData.preferredKindergartens, kindergartenId]);
    }
  };

  const removeKindergarten = (kindergartenId: string) => {
    updateFormData('preferredKindergartens', formData.preferredKindergartens.filter(id => id !== kindergartenId));
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Draft saved:', formData);
      // Show success message (you could use toast here)
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Submitting application:', formData);
      
      // Show success and navigate
      alert('Application submitted successfully! You will receive a confirmation email.');
      navigate('/guardian/application-status');
    } catch (error) {
      console.error('Failed to submit application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <Baby className="h-5 w-5" />;
      case 2: return <User className="h-5 w-5" />;
      case 3: return <Building className="h-5 w-5" />;
      case 4: return <FileText className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Baby className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{t('guardian.newApplication.childInformation.title')}</h3>
                <p className="text-gray-600">{t('guardian.newApplication.childInformation.description')}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="childName" className="text-sm font-medium">{t('guardian.newApplication.childInformation.childName')} *</Label>
                <Input
                  id="childName"
                  value={formData.childName}
                  onChange={(e) => updateFormData('childName', e.target.value)}
                  placeholder={t('guardian.newApplication.childInformation.childNamePlaceholder')}
                  className={`h-12 ${validationErrors.childName ? 'border-red-500' : ''}`}
                  required
                />
                {validationErrors.childName && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {validationErrors.childName}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="childBirthDate" className="text-sm font-medium">{t('guardian.newApplication.childInformation.birthDate')} *</Label>
                <Input
                  id="childBirthDate"
                  type="date"
                  value={formData.childBirthDate}
                  onChange={(e) => updateFormData('childBirthDate', e.target.value)}
                  className={`h-12 ${validationErrors.childBirthDate ? 'border-red-500' : ''}`}
                  required
                />
                {validationErrors.childBirthDate && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {validationErrors.childBirthDate}
                  </p>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="childNationalId" className="text-sm font-medium">{t('guardian.newApplication.childInformation.nationalId')} *</Label>
                <Input
                  id="childNationalId"
                  value={formData.childNationalId}
                  onChange={(e) => updateFormData('childNationalId', e.target.value)}
                  placeholder={t('guardian.newApplication.childInformation.nationalIdPlaceholder')}
                  maxLength={11}
                  className={`h-12 ${validationErrors.childNationalId ? 'border-red-500' : ''}`}
                  required
                />
                {validationErrors.childNationalId && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {validationErrors.childNationalId}
                  </p>
                )}
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {t('guardian.newApplication.childInformation.nationalIdNote')}
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{t('guardian.newApplication.guardianInformation.title')}</h3>
                <p className="text-gray-600">{t('guardian.newApplication.guardianInformation.description')}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="guardianName" className="text-sm font-medium">{t('guardian.newApplication.guardianInformation.fullName')} *</Label>
                <Input
                  id="guardianName"
                  value={formData.guardianName}
                  onChange={(e) => updateFormData('guardianName', e.target.value)}
                  disabled
                  className="bg-gray-50 h-12"
                />
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {t('guardian.newApplication.guardianInformation.autoFilled')}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="guardianEmail" className="text-sm font-medium">{t('guardian.newApplication.guardianInformation.email')} *</Label>
                <Input
                  id="guardianEmail"
                  type="email"
                  value={formData.guardianEmail}
                  onChange={(e) => updateFormData('guardianEmail', e.target.value)}
                  disabled
                  className="bg-gray-50 h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="guardianPhone" className="text-sm font-medium">{t('guardian.newApplication.guardianInformation.phone')} *</Label>
                <Input
                  id="guardianPhone"
                  type="tel"
                  value={formData.guardianPhone}
                  onChange={(e) => updateFormData('guardianPhone', e.target.value)}
                  placeholder={t('guardian.newApplication.guardianInformation.phonePlaceholder')}
                  className={`h-12 ${validationErrors.guardianPhone ? 'border-red-500' : ''}`}
                />
                {validationErrors.guardianPhone && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {validationErrors.guardianPhone}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{t('guardian.newApplication.kindergartenPreferences.title')}</h3>
                <p className="text-gray-600">{t('guardian.newApplication.kindergartenPreferences.description')}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium">{t('guardian.newApplication.kindergartenPreferences.startDate')} *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateFormData('startDate', e.target.value)}
                  className={`h-12 ${validationErrors.startDate ? 'border-red-500' : ''}`}
                  required
                />
                {validationErrors.startDate && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {validationErrors.startDate}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">{t('guardian.newApplication.kindergartenPreferences.preferences')} *</Label>
                  <p className="text-sm text-gray-600 mb-3">
                    {t('guardian.newApplication.kindergartenPreferences.preferencesDesc')}
                  </p>
                  {validationErrors.preferredKindergartens && (
                    <p className="text-sm text-red-600 flex items-center gap-1 mb-3">
                      <AlertCircle className="h-4 w-4" />
                      {validationErrors.preferredKindergartens}
                    </p>
                  )}
                </div>
                
                {/* Selected kindergartens */}
                {formData.preferredKindergartens.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">{t('guardian.newApplication.kindergartenPreferences.selected')}</h4>
                    <div className="space-y-2">
                      {formData.preferredKindergartens.map((id, index) => {
                        const kg = kindergartens.find(k => k.id === id);
                        return (
                          <div key={id} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 bg-blue-600 text-white text-sm rounded-lg flex items-center justify-center font-medium">
                                {index + 1}
                              </span>
                              <div>
                                <span className="font-medium text-gray-900">{kg?.name}</span>
                                <span className="text-sm text-gray-600 ml-2">({kg?.district}, {kg?.type})</span>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeKindergarten(id)}
                              className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                            >
                              {t('guardian.newApplication.kindergartenPreferences.remove')}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Available kindergartens */}
                {formData.preferredKindergartens.length < 5 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">{t('guardian.newApplication.kindergartenPreferences.available')}</h4>
                    <div className="border rounded-xl max-h-60 overflow-y-auto">
                      {kindergartens.filter(kg => !formData.preferredKindergartens.includes(kg.id)).map((kg) => (
                        <div key={kg.id} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50">
                          <div>
                            <h5 className="font-medium text-gray-900">{kg.name}</h5>
                            <p className="text-sm text-gray-600">{kg.district} • {kg.type}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addKindergarten(kg.id)}
                            className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                          >
                            {t('guardian.newApplication.kindergartenPreferences.select')}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{t('guardian.newApplication.additionalInformation.title')}</h3>
                <p className="text-gray-600">{t('guardian.newApplication.additionalInformation.description')}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 border rounded-xl">
                  <Checkbox
                    id="specialNeeds"
                    checked={formData.specialNeeds}
                    onCheckedChange={(checked) => updateFormData('specialNeeds', checked)}
                    className="mt-1"
                  />
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="specialNeeds" className="text-sm font-medium cursor-pointer">
                      {t('guardian.newApplication.additionalInformation.specialNeeds')}
                    </Label>
                    <p className="text-sm text-gray-600">
                      {t('guardian.newApplication.additionalInformation.specialNeedsDesc')}
                    </p>
                  </div>
                </div>

                {formData.specialNeeds && (
                  <div className="space-y-2 ml-8">
                    <Label htmlFor="specialNeedsDescription" className="text-sm font-medium">
                      Describe Special Needs *
                    </Label>
                    <textarea
                      id="specialNeedsDescription"
                      className={`w-full min-h-24 px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-oslo-blue focus:border-transparent ${validationErrors.specialNeedsDescription ? 'border-red-500' : 'border-gray-300'}`}
                      value={formData.specialNeedsDescription}
                      onChange={(e) => updateFormData('specialNeedsDescription', e.target.value)}
                      placeholder={t('guardian.newApplication.additionalInformation.specialNeedsPlaceholder')}
                    />
                    {validationErrors.specialNeedsDescription && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {validationErrors.specialNeedsDescription}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-start space-x-3 p-4 border rounded-xl">
                  <Checkbox
                    id="siblingInKindergarten"
                    checked={formData.siblingInKindergarten}
                    onCheckedChange={(checked) => updateFormData('siblingInKindergarten', checked)}
                    className="mt-1"
                  />
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="siblingInKindergarten" className="text-sm font-medium cursor-pointer">
                      {t('guardian.newApplication.additionalInformation.sibling')}
                    </Label>
                    <p className="text-sm text-gray-600">
                      {t('guardian.newApplication.additionalInformation.siblingDesc')}
                    </p>
                  </div>
                </div>

                {formData.siblingInKindergarten && (
                  <div className="space-y-2 ml-8">
                    <Label htmlFor="siblingKindergarten" className="text-sm font-medium">
                      {t('guardian.newApplication.additionalInformation.siblingKindergarten')} *
                    </Label>
                    <Select 
                      value={formData.siblingKindergarten} 
                      onValueChange={(value) => updateFormData('siblingKindergarten', value)}
                    >
                      <SelectTrigger className={`h-12 ${validationErrors.siblingKindergarten ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder={t('guardian.newApplication.additionalInformation.siblingSelect')} />
                      </SelectTrigger>
                      <SelectContent>
                        {kindergartens.map((kg) => (
                          <SelectItem key={kg.id} value={kg.id}>
                            {kg.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.siblingKindergarten && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {validationErrors.siblingKindergarten}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('guardian.newApplication.title')}
        </h1>
        <p className="text-gray-600 text-lg">
          {t('guardian.newApplication.description')}
        </p>
      </div>

      {/* Progress indicator */}
      <Card className="shadow-lg border-0">
        <CardContent className="pt-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-gray-900">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% {t('common.complete')}</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-3 mb-6" />
          
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className={`flex flex-col items-center ${currentStep >= step ? 'text-oslo-blue' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 mb-2 ${
                  currentStep >= step 
                    ? 'bg-oslo-blue border-oslo-blue text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {getStepIcon(step)}
                </div>
                <span className="text-xs font-medium text-center">
                  {step === 1 && t('guardian.newApplication.steps.childInfo')}
                  {step === 2 && t('guardian.newApplication.steps.guardianInfo')}
                  {step === 3 && t('guardian.newApplication.steps.preferences')}
                  {step === 4 && t('guardian.newApplication.steps.additional')}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form content */}
      <Card className="shadow-lg border-0">
        <CardContent className="pt-8">
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2 h-12 px-6"
        >
          <ChevronLeft className="h-4 w-4" />
          {t('common.previous')}
        </Button>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleSaveDraft}
            disabled={isSaving || isSubmitting}
            className="flex items-center gap-2 h-12 px-6"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t('common.saving')}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {t('common.saveDraft')}
              </>
            )}
          </Button>

          {currentStep === totalSteps ? (
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || isSaving}
              className="bg-oslo-blue hover:bg-blue-700 flex items-center gap-2 h-12 px-6 shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('common.submitting')}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {t('common.submit')}
                </>
              )}
            </Button>
          ) : (
            <Button 
              onClick={nextStep} 
              className="bg-oslo-blue hover:bg-blue-700 flex items-center gap-2 h-12 px-6 shadow-lg"
            >
              {t('common.next')}
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewApplication;
