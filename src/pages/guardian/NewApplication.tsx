import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FileText, User, Building2, Calendar, ArrowRight, CheckCircle, AlertCircle, Sparkles, Clock, Shield, Upload, Info, AlertTriangle, HelpCircle, Loader2, Database, ArrowLeftRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import GuardianInfoManager from '@/components/guardian/GuardianInfoManager';

const NewApplication = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [applicationType, setApplicationType] = useState('');
  const [fregLookupState, setFregLookupState] = useState({
    isLoading: false,
    isSuccess: false,
    error: null,
    hasAttempted: false
  });
  const [formData, setFormData] = useState({
    applicationType: '',
    childInfo: {
      firstName: '',
      lastName: '',
      birthDate: '',
      personalNumber: '',
      specialNeeds: false,
      siblings: false,
      statutoryRight: false
    },
    preferences: {
      kindergartens: [],
      startDate: '',
      fullTime: true,
      isDualPlacement: false,
      dualPlacementReason: ''
    },
    guardian: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      relationship: 'parent',
      idMethod: 'electronic'
    },
    documents: {
      disabilityProof: null,
      identityDocument: null,
      residenceProof: null
    }
  });

  // Debounced FREG lookup
  useEffect(() => {
    const delayedLookup = setTimeout(() => {
      if (formData.childInfo.personalNumber.length === 11 && !fregLookupState.hasAttempted) {
        performFregLookup(formData.childInfo.personalNumber);
      }
    }, 500);

    return () => clearTimeout(delayedLookup);
  }, [formData.childInfo.personalNumber]);

  const performFregLookup = async (birthNumber: string) => {
    setFregLookupState({ isLoading: true, isSuccess: false, error: null, hasAttempted: true });
    
    try {
      // Mock API call to FREG
      const response = await fetch(`/mock/freg/lookup?birthNumber=${birthNumber}`);
      
      if (response.ok) {
        const data = await response.json();
        
        // Auto-fill the form fields
        setFormData(prev => ({
          ...prev,
          childInfo: {
            ...prev.childInfo,
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate
          }
        }));
        
        setFregLookupState({ isLoading: false, isSuccess: true, error: null, hasAttempted: true });
      } else {
        const errorData = await response.json();
        setFregLookupState({ 
          isLoading: false, 
          isSuccess: false, 
          error: errorData.error || 'Could not retrieve from FREG', 
          hasAttempted: true 
        });
      }
    } catch (error) {
      // Mock success for prototype (since we don't have real API)
      const mockData = {
        firstName: 'Emma',
        lastName: 'Hansen',
        birthDate: '2022-03-15'
      };
      
      setFormData(prev => ({
        ...prev,
        childInfo: {
          ...prev.childInfo,
          firstName: mockData.firstName,
          lastName: mockData.lastName,
          birthDate: mockData.birthDate
        }
      }));
      
      setFregLookupState({ isLoading: false, isSuccess: true, error: null, hasAttempted: true });
    }
  };

  const handlePersonalNumberChange = (value: string) => {
    setFormData({
      ...formData,
      childInfo: { ...formData.childInfo, personalNumber: value }
    });
    
    // Reset FREG state when birth number changes
    if (value.length !== 11) {
      setFregLookupState({ isLoading: false, isSuccess: false, error: null, hasAttempted: false });
      // Clear auto-filled fields if birth number is modified
      if (fregLookupState.isSuccess) {
        setFormData(prev => ({
          ...prev,
          childInfo: {
            ...prev.childInfo,
            firstName: '',
            lastName: '',
            birthDate: ''
          }
        }));
      }
    }
  };

  const steps = [
    { id: 0, title: 'Application Type', icon: Calendar, description: 'Choose your application intent' },
    { id: 1, title: 'Child Information', icon: User, description: 'Basic details about your child' },
    { id: 2, title: 'Guardian Information', icon: Shield, description: 'Your contact and verification details' },
    { id: 3, title: 'Kindergarten Preferences', icon: Building2, description: 'Choose your preferred kindergartens' },
    { id: 4, title: 'Documents & Review', icon: FileText, description: 'Upload documents and review application' }
  ];

  const kindergartenOptions = [
    { id: 1, name: 'Løvenskiold Kindergarten', district: 'Frogner', capacity: 'High', rating: 4.8 },
    { id: 2, name: 'Sinsen Kindergarten', district: 'Grünerløkka', capacity: 'Medium', rating: 4.6 },
    { id: 3, name: 'Sagene Kindergarten', district: 'Sagene', capacity: 'Low', rating: 4.7 },
    { id: 4, name: 'Bjølsen Kindergarten', district: 'Sagene', capacity: 'High', rating: 4.5 }
  ];

  // Function to determine provisional recording period based on child's birthdate
  const getProvisionalRecordingPeriod = (birthDate: string) => {
    if (!birthDate) return null;
    
    const childBirthDate = new Date(birthDate);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Check if child turns 1 by August 31st of current year
    const august31 = new Date(currentYear, 7, 31); // Month is 0-indexed
    const november30 = new Date(currentYear, 10, 30);
    const march1 = new Date(currentYear, 2, 1);
    const august15 = new Date(currentYear, 7, 15);
    
    // Calculate when child turns 1
    const childTurns1 = new Date(childBirthDate.getFullYear() + 1, childBirthDate.getMonth(), childBirthDate.getDate());
    
    if (childTurns1 <= august31 && currentDate <= march1) {
      return {
        period: 'Main Recording Part 1',
        deadline: 'March 1st',
        description: 'Your child has statutory right to a kindergarten place'
      };
    } else if (childTurns1 <= november30 && currentDate <= august15) {
      return {
        period: 'Main Recording Part 2',
        deadline: 'August 15th',
        description: 'Second round of main applications'
      };
    } else {
      return {
        period: 'Ongoing Recording',
        deadline: 'No fixed deadline',
        description: 'Applications processed as places become available'
      };
    }
  };

  const provisionalPeriod = getProvisionalRecordingPeriod(formData.childInfo.birthDate);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              currentStep >= step.id 
                ? 'bg-gradient-to-br from-oslo-blue to-blue-700 shadow-lg' 
                : 'bg-slate-200 hover:bg-slate-300'
            }`}>
              <step.icon className={`w-5 h-5 ${currentStep >= step.id ? 'text-white' : 'text-slate-500'}`} />
              {currentStep > step.id && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="mt-2 text-center">
              <div className={`font-medium text-xs ${currentStep >= step.id ? 'text-oslo-blue' : 'text-slate-500'}`}>
                {step.title}
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-3 mt-[-20px] transition-colors duration-300 ${
              currentStep > step.id ? 'bg-gradient-to-r from-oslo-blue to-blue-600' : 'bg-slate-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderApplicationTypeSelection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-oslo-blue/5 to-blue-50 p-6 rounded-xl border border-oslo-blue/20">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-oslo-blue" />
          <h3 className="text-lg font-semibold text-slate-900">What type of application is this?</h3>
        </div>
        <p className="text-slate-600">Choose the option that best describes your situation. The system will automatically determine the appropriate processing period based on your child's age and submission date.</p>
      </div>

      <div className="grid gap-4">
        {[
          {
            id: 'new-admission',
            title: 'New Admission',
            icon: '🏫',
            description: 'For children without a current kindergarten placement',
            details: 'First-time application for kindergarten placement in Oslo',
            color: 'from-oslo-blue to-blue-700',
            recommended: true
          },
          {
            id: 'transfer-request',
            title: 'Transfer Request',
            icon: '🔄',
            description: 'For changing from one kindergarten to another',
            details: 'Moving your child from their current kindergarten to a new one',
            color: 'from-oslo-green to-green-600',
            recommended: false
          },
          {
            id: 'late-ongoing',
            title: 'Late/Ongoing Application',
            icon: '⏱️',
            description: 'For applying after main deadlines or under special circumstances',
            details: 'Applications submitted outside standard deadlines or for immediate placement needs',
            color: 'from-amber-500 to-orange-500',
            recommended: false
          }
        ].map((type) => (
          <Card 
            key={type.id} 
            className={`group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${
              formData.applicationType === type.id ? 'border-oslo-blue bg-oslo-blue/5' : 'hover:border-oslo-blue/30'
            }`}
            onClick={() => setFormData({...formData, applicationType: type.id})}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <span className="text-2xl">{type.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-slate-900 text-lg">{type.title}</h4>
                      {type.recommended && (
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 text-xs">
                          Most Common
                        </Badge>
                      )}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{type.details}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-slate-600 mb-2">{type.description}</p>
                    <p className="text-sm text-slate-500">{type.details}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  formData.applicationType === type.id 
                    ? 'bg-oslo-blue border-oslo-blue' 
                    : 'border-slate-300'
                }`}>
                  {formData.applicationType === type.id && (
                    <CheckCircle className="w-4 h-4 text-white m-0.5" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {formData.applicationType && (
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Processing Information</h4>
              <p className="text-blue-700 text-sm">
                The system will automatically determine which recording period (Main Part 1, Main Part 2, or Ongoing) 
                your application falls under based on your child's birthdate and when you submit the application. 
                This ensures your application is processed in the correct timeframe according to Oslo municipality guidelines.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderChildInformation = () => (
    <div className="space-y-6">
      {/* Personal Number with FREG Integration */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-slate-700">Personal Number (Birth Number) *</Label>
        <div className="relative">
          <Input 
            placeholder="11 digits (DDMMYYXXXXX)"
            value={formData.childInfo.personalNumber}
            onChange={(e) => handlePersonalNumberChange(e.target.value)}
            maxLength={11}
            className={`pr-10 ${fregLookupState.isSuccess ? 'border-emerald-300 bg-emerald-50' : ''}`}
          />
          {fregLookupState.isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="w-4 h-4 animate-spin text-oslo-blue" />
            </div>
          )}
          {fregLookupState.isSuccess && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Database className="w-4 h-4 text-emerald-600" />
            </div>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Enter the child's 11-digit birth number. If found in the national registry (FREG), we'll fill in the rest.
        </p>
        
        {/* FREG Status Messages */}
        {fregLookupState.isSuccess && (
          <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-200" role="status" aria-live="polite">
            <CheckCircle className="w-4 h-4" />
            <span>Auto-filled from FREG</span>
            <Badge variant="outline" className="ml-auto text-emerald-600 border-emerald-300 bg-emerald-50">
              Verified
            </Badge>
          </div>
        )}
        
        {fregLookupState.error && (
          <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200" role="alert" aria-live="assertive">
            <AlertTriangle className="w-4 h-4 mt-0.5" />
            <div>
              <p className="font-medium">Could not retrieve from FREG</p>
              <p className="text-xs mt-1">Please enter the information manually below.</p>
            </div>
          </div>
        )}
      </div>

      {/* Name Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">First Name *</Label>
          <div className="relative">
            <Input 
              placeholder="Enter child's first name"
              value={formData.childInfo.firstName}
              onChange={(e) => setFormData({
                ...formData,
                childInfo: { ...formData.childInfo, firstName: e.target.value }
              })}
              disabled={fregLookupState.isSuccess}
              className={fregLookupState.isSuccess ? 'bg-slate-50 border-slate-200' : ''}
            />
            {fregLookupState.isSuccess && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Database className="w-4 h-4 text-slate-400" />
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">Last Name *</Label>
          <div className="relative">
            <Input 
              placeholder="Enter child's last name"
              value={formData.childInfo.lastName}
              onChange={(e) => setFormData({
                ...formData,
                childInfo: { ...formData.childInfo, lastName: e.target.value }
              })}
              disabled={fregLookupState.isSuccess}
              className={fregLookupState.isSuccess ? 'bg-slate-50 border-slate-200' : ''}
            />
            {fregLookupState.isSuccess && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Database className="w-4 h-4 text-slate-400" />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Birth Date */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">Date of Birth *</Label>
          <div className="relative">
            <Input 
              type="date"
              value={formData.childInfo.birthDate}
              onChange={(e) => setFormData({
                ...formData,
                childInfo: { ...formData.childInfo, birthDate: e.target.value }
              })}
              disabled={fregLookupState.isSuccess}
              className={fregLookupState.isSuccess ? 'bg-slate-50 border-slate-200' : ''}
            />
            {fregLookupState.isSuccess && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Database className="w-4 h-4 text-slate-400" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Provisional Recording Period Hint */}
      {provisionalPeriod && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-800 mb-2">Provisional Processing Period</h4>
              <p className="text-emerald-700 mb-2">
                Based on your child's age and today's date, this application is likely to fall under 
                <span className="font-semibold"> {provisionalPeriod.period}</span>.
              </p>
              <div className="text-sm text-emerald-600">
                <p>• Deadline: {provisionalPeriod.deadline}</p>
                <p>• {provisionalPeriod.description}</p>
                <p className="mt-2 font-medium">This will be confirmed automatically when you submit your application.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
          <Switch 
            id="statutoryRight"
            checked={formData.childInfo.statutoryRight}
            onCheckedChange={(checked) => setFormData({
              ...formData,
              childInfo: { ...formData.childInfo, statutoryRight: checked }
            })}
          />
          <Label htmlFor="statutoryRight" className="text-sm font-medium text-slate-700">
            Child has statutory right to kindergarten place
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-oslo-blue/5 to-blue-50 rounded-xl border border-oslo-blue/20">
          <Switch 
            id="specialNeeds"
            checked={formData.childInfo.specialNeeds}
            onCheckedChange={(checked) => setFormData({
              ...formData,
              childInfo: { ...formData.childInfo, specialNeeds: checked }
            })}
          />
          <Label htmlFor="specialNeeds" className="text-sm font-medium text-slate-700">
            Child has special needs or requires additional support
          </Label>
        </div>
        
        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
          <Switch 
            id="siblings"
            checked={formData.childInfo.siblings}
            onCheckedChange={(checked) => setFormData({
              ...formData,
              childInfo: { ...formData.childInfo, siblings: checked }
            })}
          />
          <Label htmlFor="siblings" className="text-sm font-medium text-slate-700">
            Child has siblings already attending kindergarten in Oslo
          </Label>
        </div>
      </div>
    </div>
  );

  const renderGuardianInformation = () => (
    <GuardianInfoManager 
      formData={formData.guardian}
      setFormData={(data) => setFormData({...formData, guardian: data})}
      childPersonalNumber={formData.childInfo.personalNumber}
    />
  );

  const renderKindergartenPreferences = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-oslo-blue/5 to-blue-50 p-6 rounded-xl border border-oslo-blue/20">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-oslo-blue" />
          <h3 className="text-lg font-semibold text-slate-900">Choose Your Preferred Kindergartens</h3>
        </div>
        <p className="text-slate-600 mb-4">Select up to 3 kindergartens in order of preference. Higher priority choices have better placement chances.</p>
      </div>

      {/* Dual Placement Option */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex items-center space-x-3">
              <Switch 
                id="dualPlacement"
                checked={formData.preferences.isDualPlacement || false}
                onCheckedChange={(checked) => setFormData({
                  ...formData,
                  preferences: { ...formData.preferences, isDualPlacement: checked }
                })}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <ArrowLeftRight className="w-5 h-5 text-purple-600" />
                <Label htmlFor="dualPlacement" className="text-lg font-semibold text-purple-800">
                  Request Dual Placement
                </Label>
              </div>
              <p className="text-purple-700 text-sm mb-3">
                Dual placement allows your child to attend two different kindergartens according to a shared custody schedule or other special arrangements.
              </p>
              <div className="text-sm text-purple-600">
                <p>• Requires approval from both kindergartens</p>
                <p>• Schedule coordination will be arranged with caseworker</p>
                <p>• Additional documentation may be required</p>
              </div>
            </div>
          </div>
          
          {formData.preferences.isDualPlacement && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
              <Label className="text-sm font-semibold text-purple-700 mb-2 block">
                Reason for Dual Placement Request
              </Label>
              <Textarea
                placeholder="Please explain why you need dual placement (e.g., shared custody arrangement, special circumstances, etc.)"
                value={formData.preferences.dualPlacementReason || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  preferences: { ...formData.preferences, dualPlacementReason: e.target.value }
                })}
                className="min-h-[80px]"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {kindergartenOptions.map((kg, index) => (
          <Card key={kg.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-oslo-blue/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-oslo-blue/10 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Building2 className="w-6 h-6 text-oslo-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg group-hover:text-oslo-blue transition-colors">{kg.name}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-slate-600">{kg.district} District</span>
                      <Badge variant="outline" className={`text-xs ${
                        kg.capacity === 'High' ? 'text-emerald-600 border-emerald-300 bg-emerald-50' :
                        kg.capacity === 'Medium' ? 'text-amber-600 border-amber-300 bg-amber-50' :
                        'text-red-600 border-red-300 bg-red-50'
                      }`}>
                        {kg.capacity} Capacity
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-slate-700">★ {kg.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="hover:bg-oslo-blue hover:text-white">
                  Select as {formData.preferences.isDualPlacement && index < 2 ? 
                    (index === 0 ? 'Primary' : 'Secondary') : 
                    `Priority ${index + 1}`
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {formData.preferences.isDualPlacement && (
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">Dual Placement Process</h4>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• Select your Primary and Secondary kindergarten preferences above</li>
                <li>• Your application will be flagged for dual placement review</li>
                <li>• A caseworker will contact you to discuss scheduling arrangements</li>
                <li>• Both kindergartens must agree to the dual placement</li>
                <li>• Final schedule will be coordinated based on availability and your needs</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">Preferred Start Date *</Label>
          <Input 
            type="date"
            value={formData.preferences.startDate}
            onChange={(e) => setFormData({
              ...formData,
              preferences: { ...formData.preferences, startDate: e.target.value }
            })}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">Attendance Type *</Label>
          <Select 
            value={formData.preferences.fullTime ? 'full' : 'part'}
            onValueChange={(value) => setFormData({
              ...formData,
              preferences: { ...formData.preferences, fullTime: value === 'full' }
            })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full-time (7:30 - 17:00)</SelectItem>
              <SelectItem value="part">Part-time (8:00 - 14:00)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderDocumentsAndReview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
        <div className="flex items-center gap-3 mb-4">
          <Upload className="w-6 h-6 text-emerald-600" />
          <h3 className="text-lg font-semibold text-slate-900">Optional Documents</h3>
        </div>
        <p className="text-slate-600">Upload any supporting documents for your application.</p>
      </div>

      <div className="grid gap-4">
        {formData.childInfo.specialNeeds && (
          <Card className="border-2 border-dashed border-slate-300 hover:border-oslo-blue transition-colors">
            <CardContent className="p-6 text-center">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <h4 className="font-semibold text-slate-700 mb-2">Disability/Special Needs Proof</h4>
              <p className="text-sm text-slate-500 mb-4">Upload documentation for special needs support</p>
              <Button variant="outline" size="sm">Choose File</Button>
            </CardContent>
          </Card>
        )}

        {formData.guardian.idMethod === 'foreign' && (
          <Card className="border-2 border-dashed border-slate-300 hover:border-oslo-blue transition-colors">
            <CardContent className="p-6 text-center">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <h4 className="font-semibold text-slate-700 mb-2">Identity Document</h4>
              <p className="text-sm text-slate-500 mb-4">Upload passport, residence permit, or other ID</p>
              <Button variant="outline" size="sm">Choose File</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Review Section */}
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          Application Review
        </h3>
        
        <div className="grid gap-4">
          <Card className="border-2 border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-oslo-blue" />
                Application Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">
                {[
                  {
                    id: 'new-admission',
                    title: 'New Admission',
                  },
                  {
                    id: 'transfer-request',
                    title: 'Transfer Request',
                  },
                  {
                    id: 'late-ongoing',
                    title: 'Late/Ongoing Application',
                  }
                ].find(t => t.id === formData.applicationType)?.title || 'Not selected'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4 text-oslo-blue" />
                Child Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div><span className="font-medium">Name:</span> {formData.childInfo.firstName} {formData.childInfo.lastName}</div>
                <div><span className="font-medium">Birth Date:</span> {formData.childInfo.birthDate}</div>
                <div><span className="font-medium">Personal Number:</span> {formData.childInfo.personalNumber}</div>
                <div><span className="font-medium">Statutory Right:</span> {formData.childInfo.statutoryRight ? 'Yes' : 'No'}</div>
              </div>
              {fregLookupState.isSuccess && (
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50">
                    <Database className="w-3 h-3 mr-1" />
                    Verified with FREG
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-800 mb-2">Important Information</h4>
            <ul className="text-amber-700 text-sm space-y-1">
              <li>• Application will receive a unique ApplicationID upon submission</li>
              <li>• Status will be set to "Draft" initially, then updated based on admission round</li>
              <li>• Processing typically takes 4-6 weeks</li>
              <li>• You will receive email confirmation once submitted</li>
              <li>• Contact us if you need assistance: kindergarten@oslo.kommune.no</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-oslo-blue/5 via-transparent to-oslo-green/5 rounded-2xl"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-oslo-blue to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-oslo-blue to-blue-700 bg-clip-text text-transparent">
                New Kindergarten Application
              </h1>
              <p className="text-slate-600 text-lg mt-1">
                Apply for kindergarten placement in Oslo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          {renderStepIndicator()}
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-200/60">
          <CardTitle className="text-2xl text-slate-900">
            {steps[currentStep].title}
          </CardTitle>
          <CardDescription className="text-lg text-slate-600">
            {steps[currentStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          {currentStep === 0 && renderApplicationTypeSelection()}
          {currentStep === 1 && renderChildInformation()}
          {currentStep === 2 && renderGuardianInformation()}
          {currentStep === 3 && renderKindergartenPreferences()}
          {currentStep === 4 && renderDocumentsAndReview()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="hover:bg-slate-50"
        >
          Previous
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>

        <Button 
          onClick={handleNext}
          disabled={currentStep === 4}
          className="bg-gradient-to-r from-oslo-blue to-blue-700 hover:from-oslo-blue/90 hover:to-blue-700/90 shadow-lg"
        >
          {currentStep === 4 ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Application
            </>
          ) : (
            <>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewApplication;
