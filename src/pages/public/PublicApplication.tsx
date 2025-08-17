import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useKindergartenCart } from '@/contexts/KindergartenCartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import KindergartenPriorityManager from '@/components/KindergartenPriorityManager';
import { 
  User, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  FileText,
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  Heart,
  AlertCircle,
  GraduationCap,
  RefreshCw,
  Clock,
  Star,
  ArrowUpDown,
  Home,
  Sparkles,
  CheckCircle,
  X,
  Eye,
  Shield,
  Zap,
  Edit3,
  Brain,
  Lightbulb,
  Save,
  Loader2,
  Globe
} from 'lucide-react';

interface ApplicationData {
  applicationType: string;
  childFirstName: string;
  childLastName: string;
  childBirthDate: string;
  childGender: string;
  specialNeeds: string;
  medicalInfo: string;
  guardianFirstName: string;
  guardianLastName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianAddress: string;
  guardianPostalCode: string;
  guardianCity: string;
  hasSecondGuardian: boolean;
  secondGuardianFirstName: string;
  secondGuardianLastName: string;
  secondGuardianEmail: string;
  secondGuardianPhone: string;
  secondGuardianRelationship: string;
  preferredStartDate: string;
  additionalInfo: string;
}

const PublicApplication = () => {
  const { selectedKindergartens, clearCart } = useKindergartenCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [autoSaving, setAutoSaving] = useState(false);
  const [smartSuggestions, setSmartSuggestions] = useState<string[]>([]);
  const [isProcessingPostal, setIsProcessingPostal] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    applicationType: '',
    childFirstName: '',
    childLastName: '',
    childBirthDate: '',
    childGender: '',
    specialNeeds: '',
    medicalInfo: '',
    guardianFirstName: '',
    guardianLastName: '',
    guardianEmail: '',
    guardianPhone: '',
    guardianAddress: '',
    guardianPostalCode: '',
    guardianCity: '',
    hasSecondGuardian: false,
    secondGuardianFirstName: '',
    secondGuardianLastName: '',
    secondGuardianEmail: '',
    secondGuardianPhone: '',
    secondGuardianRelationship: '',
    preferredStartDate: '',
    additionalInfo: ''
  });

  useEffect(() => {
    if (selectedKindergartens.length === 0) {
      navigate('/kindergartens');
    }
  }, [selectedKindergartens, navigate]);

  useEffect(() => {
    const saved = localStorage.getItem('application-draft');
    if (saved) {
      try {
        setApplicationData(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load application draft:', error);
      }
    }
  }, []);

  // Auto-save with debouncing
  useEffect(() => {
    setAutoSaving(true);
    const timer = setTimeout(() => {
      localStorage.setItem('application-draft', JSON.stringify(applicationData));
      setAutoSaving(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [applicationData]);

  // Smart postal code processing
  const processPostalCode = useCallback(async (postalCode: string) => {
    if (postalCode.length === 4) {
      setIsProcessingPostal(true);
      // Simulate API call to get city from postal code
      setTimeout(() => {
        const osloPostalCodes: Record<string, string> = {
          '0150': 'Oslo',
          '0151': 'Oslo', 
          '0152': 'Oslo',
          '0153': 'Oslo',
          '0154': 'Oslo',
          '0155': 'Oslo',
          '0158': 'Oslo',
          '0159': 'Oslo',
          '0160': 'Oslo',
          '0161': 'Oslo',
          '0162': 'Oslo',
          '0163': 'Oslo',
          '0164': 'Oslo',
          '0165': 'Oslo',
          '0166': 'Oslo',
          '0167': 'Oslo',
          '0168': 'Oslo',
          '0169': 'Oslo',
          '0170': 'Oslo',
          '0171': 'Oslo',
          '0172': 'Oslo',
          '0173': 'Oslo',
          '0174': 'Oslo',
          '0175': 'Oslo',
          '0176': 'Oslo',
          '0177': 'Oslo',
          '0178': 'Oslo',
          '0179': 'Oslo',
          '0180': 'Oslo',
          '0181': 'Oslo',
          '0182': 'Oslo',
          '0183': 'Oslo',
          '0184': 'Oslo',
          '0185': 'Oslo',
          '0186': 'Oslo',
          '0187': 'Oslo',
          '0188': 'Oslo',
          '0189': 'Oslo',
          '0190': 'Oslo',
          '0191': 'Oslo',
          '0192': 'Oslo',
          '0193': 'Oslo',
          '0194': 'Oslo',
          '0195': 'Oslo',
          '0196': 'Oslo',
          '0197': 'Oslo',
          '0198': 'Oslo',
          '0212': 'Oslo',
          '0213': 'Oslo',
          '0214': 'Oslo',
          '0215': 'Oslo',
          '0216': 'Oslo',
          '0217': 'Oslo',
          '0218': 'Oslo',
          '0219': 'Oslo',
          '0220': 'Oslo',
          '0221': 'Oslo',
          '0222': 'Oslo',
          '0230': 'Oslo',
          '0240': 'Oslo',
          '0250': 'Oslo',
          '0251': 'Oslo',
          '0252': 'Oslo',
          '0253': 'Oslo',
          '0254': 'Oslo',
          '0255': 'Oslo',
          '0256': 'Oslo',
          '0257': 'Oslo',
          '0258': 'Oslo',
          '0259': 'Oslo',
          '0260': 'Oslo',
          '0261': 'Oslo',
          '0262': 'Oslo',
          '0263': 'Oslo',
          '0264': 'Oslo',
          '0265': 'Oslo',
          '0266': 'Oslo',
          '0267': 'Oslo',
          '0268': 'Oslo',
          '0270': 'Oslo',
          '0271': 'Oslo',
          '0272': 'Oslo',
          '0273': 'Oslo',
          '0274': 'Oslo',
          '0275': 'Oslo',
          '0276': 'Oslo',
          '0277': 'Oslo',
          '0278': 'Oslo',
          '0279': 'Oslo',
          '0280': 'Oslo',
          '0281': 'Oslo',
          '0282': 'Oslo',
          '0283': 'Oslo',
          '0284': 'Oslo',
          '0285': 'Oslo',
          '0286': 'Oslo',
          '0287': 'Oslo',
          '0288': 'Oslo',
          '0289': 'Oslo',
          '0290': 'Oslo',
          '0291': 'Oslo',
          '0292': 'Oslo',
          '0293': 'Oslo',
          '0294': 'Oslo',
          '0295': 'Oslo',
          '0296': 'Oslo',
          '0297': 'Oslo',
          '0298': 'Oslo',
          '0299': 'Oslo',
          '0301': 'Oslo',
          '0302': 'Oslo',
          '0303': 'Oslo',
          '0304': 'Oslo',
          '0305': 'Oslo',
          '0306': 'Oslo',
          '0307': 'Oslo',
          '0308': 'Oslo',
          '0309': 'Oslo',
          '0310': 'Oslo',
          '0311': 'Oslo',
          '0312': 'Oslo',
          '0313': 'Oslo',
          '0314': 'Oslo',
          '0315': 'Oslo',
          '0316': 'Oslo',
          '0317': 'Oslo',
          '0318': 'Oslo',
          '0319': 'Oslo',
          '0320': 'Oslo',
          '0321': 'Oslo',
          '0322': 'Oslo',
          '0323': 'Oslo',
          '0324': 'Oslo',
          '0325': 'Oslo',
          '0326': 'Oslo',
          '0327': 'Oslo',
          '0340': 'Oslo',
          '0341': 'Oslo',
          '0342': 'Oslo',
          '0343': 'Oslo',
          '0344': 'Oslo',
          '0345': 'Oslo',
          '0346': 'Oslo',
          '0347': 'Oslo',
          '0348': 'Oslo',
          '0349': 'Oslo',
          '0350': 'Oslo',
          '0351': 'Oslo',
          '0352': 'Oslo',
          '0353': 'Oslo',
          '0354': 'Oslo',
          '0355': 'Oslo',
          '0356': 'Oslo',
          '0357': 'Oslo',
          '0358': 'Oslo',
          '0359': 'Oslo',
          '0360': 'Oslo',
          '0361': 'Oslo',
          '0362': 'Oslo',
          '0363': 'Oslo',
          '0364': 'Oslo',
          '0365': 'Oslo',
          '0366': 'Oslo',
          '0367': 'Oslo',
          '0368': 'Oslo',
          '0369': 'Oslo',
          '0370': 'Oslo',
          '0371': 'Oslo',
          '0372': 'Oslo',
          '0373': 'Oslo',
          '0374': 'Oslo',
          '0375': 'Oslo',
          '0376': 'Oslo',
          '0377': 'Oslo',
          '0378': 'Oslo',
          '0379': 'Oslo',
          '0380': 'Oslo',
          '0381': 'Oslo',
          '0382': 'Oslo',
          '0383': 'Oslo',
          '0384': 'Oslo',
          '0385': 'Oslo',
          '0386': 'Oslo',
          '0387': 'Oslo',
          '0388': 'Oslo',
          '0389': 'Oslo',
          '0390': 'Oslo',
          '0391': 'Oslo',
          '0392': 'Oslo',
          '0393': 'Oslo',
          '0394': 'Oslo',
          '0395': 'Oslo',
          '0396': 'Oslo',
          '0397': 'Oslo',
          '0398': 'Oslo',
          '0399': 'Oslo',
        };
        
        const city = osloPostalCodes[postalCode];
        if (city && !applicationData.guardianCity) {
          setApplicationData(prev => ({ ...prev, guardianCity: city }));
          toast({
            title: "Smart Fill",
            description: `City automatically filled: ${city}`,
          });
        }
        setIsProcessingPostal(false);
      }, 800);
    }
  }, [applicationData.guardianCity]);

  // Smart application type detection
  const detectApplicationType = useCallback((birthDate: string) => {
    if (!birthDate || applicationData.applicationType) return;
    
    const birth = new Date(birthDate);
    const now = new Date();
    const ageInMonths = (now.getFullYear() - birth.getFullYear()) * 12 + 
                       (now.getMonth() - birth.getMonth());
    
    let suggestedType = '';
    let reason = '';
    
    if (ageInMonths >= 12 && ageInMonths <= 18) {
      suggestedType = 'new_admission';
      reason = 'Child is at typical kindergarten starting age';
    } else if (ageInMonths > 18 && ageInMonths <= 60) {
      suggestedType = 'transfer_request';
      reason = 'Child may be transferring from another kindergarten';
    } else if (ageInMonths > 60) {
      suggestedType = 'late_application';
      reason = 'Child is older than typical kindergarten age';
    }
    
    if (suggestedType) {
      setSmartSuggestions([`Based on your child's age, we recommend "${applicationTypes.find(t => t.id === suggestedType)?.title}". ${reason}`]);
    }
  }, [applicationData.applicationType]);

  const updateField = (field: keyof ApplicationData, value: string | boolean) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
    
    // Smart auto-processing
    if (field === 'guardianPostalCode' && typeof value === 'string') {
      processPostalCode(value);
    }
    
    if (field === 'childBirthDate' && typeof value === 'string') {
      detectApplicationType(value);
    }
  };

  const handleStepChange = (newStep: number) => {
    if (newStep === currentStep) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(newStep);
      setIsAnimating(false);
    }, 150);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      handleStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      handleStepChange(currentStep - 1);
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return applicationData.applicationType && 
               applicationData.childFirstName && 
               applicationData.childLastName && 
               applicationData.childBirthDate &&
               applicationData.guardianFirstName && 
               applicationData.guardianLastName && 
               applicationData.guardianEmail && 
               applicationData.guardianPhone &&
               applicationData.guardianPostalCode;
      case 2:
        return selectedKindergartens.length > 0;
      case 3:
        return true; // Review step, always valid
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    console.log('Submitting application:', {
      ...applicationData,
      selectedKindergartens: selectedKindergartens.map(k => k.id)
    });
    
    localStorage.removeItem('application-draft');
    clearCart();
    navigate('/application-success');
  };

  const steps = [
    { 
      number: 1, 
      title: 'Smart Form', 
      icon: Brain, 
      description: 'Intelligent application with auto-suggestions',
      shortTitle: 'Smart Form'
    },
    { 
      number: 2, 
      title: 'Kindergarten Priority', 
      icon: Star, 
      description: 'Arrange your kindergarten preferences',
      shortTitle: 'Priority'
    },
    { 
      number: 3, 
      title: 'Review & Submit', 
      icon: CheckCircle, 
      description: 'Final review and submission',
      shortTitle: 'Submit'
    }
  ];

  const applicationTypes = [
    {
      id: 'new_admission',
      title: 'New Admission',
      subtitle: 'Most Common',
      description: 'For children without a current kindergarten placement',
      details: 'First-time application for kindergarten placement in Oslo',
      icon: GraduationCap,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      accentColor: 'text-blue-600'
    },
    {
      id: 'transfer_request',
      title: 'Transfer Request',
      subtitle: 'Change Kindergarten',
      description: 'For changing from one kindergarten to another',
      details: 'Moving your child from their current kindergarten to a new one',
      icon: ArrowUpDown,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      accentColor: 'text-emerald-600'
    },
    {
      id: 'late_application',
      title: 'Late/Ongoing Application',
      subtitle: 'Special Circumstances',
      description: 'For applying after main deadlines or under special circumstances',
      details: 'Applications submitted outside standard deadlines or for immediate placement needs',
      icon: Clock,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      accentColor: 'text-orange-600'
    }
  ];

  if (selectedKindergartens.length === 0) {
    return null;
  }

  const currentStepValid = validateStep(currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-oslo-hero-bg via-background to-oslo-surface">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-border/20 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/kindergartens')}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Browse
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Kindergarten Application</h1>
                  <p className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Auto-save indicator */}
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/20 rounded-lg">
                {autoSaving ? (
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                ) : (
                  <Save className="h-4 w-4 text-green-500" />
                )}
                <span className="text-sm text-muted-foreground">
                  {autoSaving ? 'Saving...' : 'Saved'}
                </span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 rounded-lg">
                <Heart className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-foreground">
                  {selectedKindergartens.length} selected
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Progress Steps */}
          <div className="mb-8">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-border">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
              
              <div className="relative flex items-center justify-between">
                {steps.map((step) => {
                  const isCompleted = completedSteps.includes(step.number) || currentStep > step.number;
                  const isCurrent = currentStep === step.number;
                  const isAccessible = step.number <= currentStep || completedSteps.includes(step.number);
                  
                  return (
                    <div key={step.number} className="flex flex-col items-center">
                      <button
                        onClick={() => isAccessible && handleStepChange(step.number)}
                        disabled={!isAccessible}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isCompleted
                            ? 'bg-gradient-to-r from-primary to-secondary border-primary text-white shadow-lg' 
                            : isCurrent
                            ? 'border-primary bg-primary/10 text-primary shadow-md scale-110'
                            : isAccessible
                            ? 'border-muted-foreground/30 text-muted-foreground hover:border-primary/50 hover:text-primary cursor-pointer'
                            : 'border-muted text-muted cursor-not-allowed'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </button>
                      
                      <div className="mt-3 text-center max-w-24">
                        <p className={`text-xs font-medium transition-colors ${
                          isCurrent ? 'text-primary' : isCompleted ? 'text-secondary' : 'text-muted-foreground'
                        }`}>
                          {step.shortTitle}
                        </p>
                        <p className={`text-xs transition-colors hidden sm:block ${
                          isCurrent || isCompleted ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Kindergartens Summary */}
          <Card className="mb-6 border-border/20 bg-oslo-glass/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Selected Kindergartens
              </CardTitle>
              <CardDescription>Your application will be submitted to these kindergartens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {selectedKindergartens.map((k, index) => (
                  <div key={k.id} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/20">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      #{index + 1}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{k.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {k.municipality}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-muted-foreground">Priority {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card className="border-border/20 bg-oslo-glass/40 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                
                {/* Step 1: Smart Form (Combined Information) */}
                {currentStep === 1 && (
                  <div className="p-8 space-y-8">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">Smart Application Form</h2>
                      <p className="text-muted-foreground text-lg">We'll help you fill this out with intelligent suggestions</p>
                    </div>

                    {/* Smart Suggestions */}
                    {smartSuggestions.length > 0 && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-1">Smart Suggestion</h4>
                            {smartSuggestions.map((suggestion, index) => (
                              <p key={index} className="text-blue-700 text-sm">{suggestion}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Application Type Selection */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          Application Type
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {applicationTypes.map((type) => (
                            <div
                              key={type.id}
                              className={`relative rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg group ${
                                applicationData.applicationType === type.id 
                                  ? `${type.borderColor} bg-gradient-to-r ${type.bgGradient} shadow-md scale-[1.02]` 
                                  : 'border-border/20 bg-background/50 hover:border-border/40 hover:scale-[1.01]'
                              }`}
                              onClick={() => setApplicationData(prev => ({ ...prev, applicationType: type.id }))}
                            >
                              <div className="p-4">
                                <div className="flex items-start gap-4">
                                  <div className={`p-3 rounded-lg bg-gradient-to-r ${type.gradient} text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                    <type.icon className="h-5 w-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-foreground mb-1 truncate">{type.title}</h4>
                                    <p className="text-sm text-muted-foreground">{type.description}</p>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                      applicationData.applicationType === type.id 
                                        ? 'border-primary bg-primary scale-110' 
                                        : 'border-muted-foreground/30 group-hover:border-primary/50'
                                    }`}>
                                      {applicationData.applicationType === type.id && (
                                        <Check className="h-3 w-3 text-white" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Child Information Section */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                          <User className="h-5 w-5 text-primary" />
                          Child Information
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="childFirstName" className="text-base font-medium">Child's First Name *</Label>
                            <Input
                              id="childFirstName"
                              value={applicationData.childFirstName}
                              onChange={(e) => updateField('childFirstName', e.target.value)}
                              placeholder="Enter child's first name"
                              className="h-12 text-base border-border/20 focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="childLastName" className="text-base font-medium">Child's Last Name *</Label>
                            <Input
                              id="childLastName"
                              value={applicationData.childLastName}
                              onChange={(e) => updateField('childLastName', e.target.value)}
                              placeholder="Enter child's last name"
                              className="h-12 text-base border-border/20 focus:border-primary"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="childBirthDate" className="text-base font-medium">Date of Birth *</Label>
                            <Input
                              id="childBirthDate"
                              type="date"
                              value={applicationData.childBirthDate}
                              onChange={(e) => updateField('childBirthDate', e.target.value)}
                              className="h-12 text-base border-border/20 focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="childGender" className="text-base font-medium">Gender</Label>
                            <select
                              id="childGender"
                              value={applicationData.childGender}
                              onChange={(e) => updateField('childGender', e.target.value)}
                              className="w-full h-12 px-3 border border-border/20 rounded-md text-base focus:border-primary focus:outline-none bg-background"
                            >
                              <option value="">Select gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="specialNeeds" className="text-base font-medium">Special Needs or Allergies</Label>
                          <Textarea
                            id="specialNeeds"
                            value={applicationData.specialNeeds}
                            onChange={(e) => updateField('specialNeeds', e.target.value)}
                            placeholder="Please describe any special needs, allergies, or dietary requirements"
                            rows={3}
                            className="text-base border-border/20 focus:border-primary resize-none"
                          />
                        </div>
                      </div>

                      {/* Guardian Information Section */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          Guardian Information
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="guardianFirstName" className="text-base font-medium">Guardian's First Name *</Label>
                            <Input
                              id="guardianFirstName"
                              value={applicationData.guardianFirstName}
                              onChange={(e) => updateField('guardianFirstName', e.target.value)}
                              placeholder="Guardian's first name"
                              className="h-12 text-base border-border/20 focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="guardianLastName" className="text-base font-medium">Guardian's Last Name *</Label>
                            <Input
                              id="guardianLastName"
                              value={applicationData.guardianLastName}
                              onChange={(e) => updateField('guardianLastName', e.target.value)}
                              placeholder="Guardian's last name"
                              className="h-12 text-base border-border/20 focus:border-primary"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="guardianEmail" className="text-base font-medium">Email Address *</Label>
                            <Input
                              id="guardianEmail"
                              type="email"
                              value={applicationData.guardianEmail}
                              onChange={(e) => updateField('guardianEmail', e.target.value)}
                              placeholder="guardian@example.com"
                              className="h-12 text-base border-border/20 focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="guardianPhone" className="text-base font-medium">Phone Number *</Label>
                            <Input
                              id="guardianPhone"
                              type="tel"
                              value={applicationData.guardianPhone}
                              onChange={(e) => updateField('guardianPhone', e.target.value)}
                              placeholder="+47 123 45 678"
                              className="h-12 text-base border-border/20 focus:border-primary"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="guardianAddress" className="text-base font-medium">Address *</Label>
                          <Input
                            id="guardianAddress"
                            value={applicationData.guardianAddress}
                            onChange={(e) => updateField('guardianAddress', e.target.value)}
                            placeholder="Street address"
                            className="h-12 text-base border-border/20 focus:border-primary"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="guardianPostalCode" className="text-base font-medium flex items-center gap-2">
                              Postal Code *
                              {isProcessingPostal && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                            </Label>
                            <Input
                              id="guardianPostalCode"
                              value={applicationData.guardianPostalCode}
                              onChange={(e) => updateField('guardianPostalCode', e.target.value)}
                              placeholder="0123"
                              className="h-12 text-base border-border/20 focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="guardianCity" className="text-base font-medium flex items-center gap-2">
                              City *
                              {applicationData.guardianCity && applicationData.guardianPostalCode && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <Globe className="h-3 w-3 mr-1" />
                                  Auto-filled
                                </Badge>
                              )}
                            </Label>
                            <Input
                              id="guardianCity"
                              value={applicationData.guardianCity}
                              onChange={(e) => updateField('guardianCity', e.target.value)}
                              placeholder="Oslo"
                              className="h-12 text-base border-border/20 focus:border-primary"
                            />
                          </div>
                        </div>

                        {/* Second Guardian Option */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Switch
                              id="hasSecondGuardian"
                              checked={applicationData.hasSecondGuardian}
                              onCheckedChange={(checked) => updateField('hasSecondGuardian', checked)}
                            />
                            <Label htmlFor="hasSecondGuardian" className="text-base font-medium">
                              Add second guardian/co-applicant
                            </Label>
                          </div>

                          {applicationData.hasSecondGuardian && (
                            <div className="space-y-4 p-6 bg-muted/20 rounded-lg border border-border/20 animate-fade-in">
                              <h4 className="font-semibold text-lg">Second Guardian Information</h4>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="secondGuardianFirstName" className="text-base font-medium">First Name</Label>
                                  <Input
                                    id="secondGuardianFirstName"
                                    value={applicationData.secondGuardianFirstName}
                                    onChange={(e) => updateField('secondGuardianFirstName', e.target.value)}
                                    placeholder="Second guardian's first name"
                                    className="h-12 text-base border-border/20 focus:border-primary"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="secondGuardianLastName" className="text-base font-medium">Last Name</Label>
                                  <Input
                                    id="secondGuardianLastName"
                                    value={applicationData.secondGuardianLastName}
                                    onChange={(e) => updateField('secondGuardianLastName', e.target.value)}
                                    placeholder="Second guardian's last name"
                                    className="h-12 text-base border-border/20 focus:border-primary"
                                  />
                                </div>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="secondGuardianEmail" className="text-base font-medium">Email</Label>
                                  <Input
                                    id="secondGuardianEmail"
                                    type="email"
                                    value={applicationData.secondGuardianEmail}
                                    onChange={(e) => updateField('secondGuardianEmail', e.target.value)}
                                    placeholder="second@example.com"
                                    className="h-12 text-base border-border/20 focus:border-primary"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="secondGuardianPhone" className="text-base font-medium">Phone</Label>
                                  <Input
                                    id="secondGuardianPhone"
                                    type="tel"
                                    value={applicationData.secondGuardianPhone}
                                    onChange={(e) => updateField('secondGuardianPhone', e.target.value)}
                                    placeholder="+47 987 65 432"
                                    className="h-12 text-base border-border/20 focus:border-primary"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Kindergarten Priority Management */}
                {currentStep === 2 && (
                  <div className="p-8">
                    <KindergartenPriorityManager />
                  </div>
                )}

                {/* Step 3: Review & Submit */}
                {currentStep === 3 && (
                  <div className="p-8 space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">Guardian Information</h2>
                      <p className="text-muted-foreground text-lg">Primary guardian contact details</p>
                    </div>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="guardianFirstName" className="text-base font-medium">First Name *</Label>
                          <Input
                            id="guardianFirstName"
                            value={applicationData.guardianFirstName}
                            onChange={(e) => updateField('guardianFirstName', e.target.value)}
                            placeholder="Guardian's first name"
                            className="h-12 text-base border-border/20 focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="guardianLastName" className="text-base font-medium">Last Name *</Label>
                          <Input
                            id="guardianLastName"
                            value={applicationData.guardianLastName}
                            onChange={(e) => updateField('guardianLastName', e.target.value)}
                            placeholder="Guardian's last name"
                            className="h-12 text-base border-border/20 focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="guardianEmail" className="text-base font-medium">Email Address *</Label>
                          <Input
                            id="guardianEmail"
                            type="email"
                            value={applicationData.guardianEmail}
                            onChange={(e) => updateField('guardianEmail', e.target.value)}
                            placeholder="guardian@example.com"
                            className="h-12 text-base border-border/20 focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="guardianPhone" className="text-base font-medium">Phone Number *</Label>
                          <Input
                            id="guardianPhone"
                            type="tel"
                            value={applicationData.guardianPhone}
                            onChange={(e) => updateField('guardianPhone', e.target.value)}
                            placeholder="+47 123 45 678"
                            className="h-12 text-base border-border/20 focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="guardianAddress" className="text-base font-medium">Address *</Label>
                        <Input
                          id="guardianAddress"
                          value={applicationData.guardianAddress}
                          onChange={(e) => updateField('guardianAddress', e.target.value)}
                          placeholder="Street address"
                          className="h-12 text-base border-border/20 focus:border-primary"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="guardianPostalCode" className="text-base font-medium">Postal Code *</Label>
                          <Input
                            id="guardianPostalCode"
                            value={applicationData.guardianPostalCode}
                            onChange={(e) => updateField('guardianPostalCode', e.target.value)}
                            placeholder="0123"
                            className="h-12 text-base border-border/20 focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="guardianCity" className="text-base font-medium">City *</Label>
                          <Input
                            id="guardianCity"
                            value={applicationData.guardianCity}
                            onChange={(e) => updateField('guardianCity', e.target.value)}
                            placeholder="Oslo"
                            className="h-12 text-base border-border/20 focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Second Guardian Option */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="hasSecondGuardian"
                            checked={applicationData.hasSecondGuardian}
                            onChange={(e) => updateField('hasSecondGuardian', e.target.checked)}
                            className="h-4 w-4 text-primary focus:ring-primary border-border/30 rounded"
                          />
                          <Label htmlFor="hasSecondGuardian" className="text-base font-medium">
                            Add second guardian/co-applicant
                          </Label>
                        </div>

                        {applicationData.hasSecondGuardian && (
                          <div className="space-y-4 p-6 bg-muted/20 rounded-lg border border-border/20">
                            <h4 className="font-semibold text-lg">Second Guardian Information</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="secondGuardianFirstName" className="text-base font-medium">First Name</Label>
                                <Input
                                  id="secondGuardianFirstName"
                                  value={applicationData.secondGuardianFirstName}
                                  onChange={(e) => updateField('secondGuardianFirstName', e.target.value)}
                                  placeholder="Second guardian's first name"
                                  className="h-12 text-base border-border/20 focus:border-primary"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="secondGuardianLastName" className="text-base font-medium">Last Name</Label>
                                <Input
                                  id="secondGuardianLastName"
                                  value={applicationData.secondGuardianLastName}
                                  onChange={(e) => updateField('secondGuardianLastName', e.target.value)}
                                  placeholder="Second guardian's last name"
                                  className="h-12 text-base border-border/20 focus:border-primary"
                                />
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="secondGuardianEmail" className="text-base font-medium">Email</Label>
                                <Input
                                  id="secondGuardianEmail"
                                  type="email"
                                  value={applicationData.secondGuardianEmail}
                                  onChange={(e) => updateField('secondGuardianEmail', e.target.value)}
                                  placeholder="second@example.com"
                                  className="h-12 text-base border-border/20 focus:border-primary"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="secondGuardianPhone" className="text-base font-medium">Phone</Label>
                                <Input
                                  id="secondGuardianPhone"
                                  type="tel"
                                  value={applicationData.secondGuardianPhone}
                                  onChange={(e) => updateField('secondGuardianPhone', e.target.value)}
                                  placeholder="+47 987 65 432"
                                  className="h-12 text-base border-border/20 focus:border-primary"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Submit */}
                {currentStep === 3 && (
                  <div className="p-8 space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">Review & Submit</h2>
                      <p className="text-muted-foreground text-lg">Please review your application before submitting</p>
                    </div>

                    <div className="space-y-6">
                      {/* Application Summary */}
                      <Card className="border-border/20 bg-background/50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            Application Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Application Type</Label>
                              <p className="text-foreground">
                                {applicationTypes.find(t => t.id === applicationData.applicationType)?.title || 'Not selected'}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Child Name</Label>
                              <p className="text-foreground">
                                {applicationData.childFirstName} {applicationData.childLastName}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Date of Birth</Label>
                              <p className="text-foreground">{applicationData.childBirthDate}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Guardian</Label>
                              <p className="text-foreground">
                                {applicationData.guardianFirstName} {applicationData.guardianLastName}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Selected Kindergartens */}
                      <Card className="border-border/20 bg-background/50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Home className="h-5 w-5 text-primary" />
                            Selected Kindergartens ({selectedKindergartens.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {selectedKindergartens.map((k, index) => (
                              <div key={k.id} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                                <Badge variant="outline" className="bg-primary/10 text-primary">
                                  Priority {index + 1}
                                </Badge>
                                <div className="flex-1">
                                  <p className="font-medium">{k.name}</p>
                                  <p className="text-sm text-muted-foreground">{k.municipality}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Final Actions */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="additionalInfo" className="text-base font-medium">Additional Information (Optional)</Label>
                          <Textarea
                            id="additionalInfo"
                            value={applicationData.additionalInfo}
                            onChange={(e) => updateField('additionalInfo', e.target.value)}
                            placeholder="Any additional information you'd like to include with your application"
                            rows={4}
                            className="text-base border-border/20 focus:border-primary resize-none"
                          />
                        </div>

                        <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
                          <div className="flex items-start gap-4">
                            <Shield className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-semibold text-accent mb-2">Privacy & Data Protection</h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                Your information is protected under Norwegian privacy laws and GDPR. We only use your data for processing your kindergarten application and will not share it with third parties.
                              </p>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="privacyConsent"
                                  required
                                  className="h-4 w-4 text-primary focus:ring-primary border-border/30 rounded"
                                />
                                <Label htmlFor="privacyConsent" className="text-sm">
                                  I agree to the privacy policy and terms of service *
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="h-12 px-6 text-base"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!currentStepValid}
                className="h-12 px-6 text-base bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                {currentStep === 1 ? 'Arrange Priorities' : 'Review & Submit'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!currentStepValid}
                className="h-12 px-8 text-base bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90"
              >
                <Zap className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicApplication;