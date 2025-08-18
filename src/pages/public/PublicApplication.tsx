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
    }, 200);
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
      shortTitle: 'Information'
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
    },
    {
      id: 'transfer_request',
      title: 'Transfer Request',
      subtitle: 'Change Kindergarten',
      description: 'For changing from one kindergarten to another',
      details: 'Moving your child from their current kindergarten to a new one',
      icon: ArrowUpDown,
    },
    {
      id: 'late_application',
      title: 'Late Application',
      subtitle: 'After Deadline',
      description: 'For applications submitted after the standard deadline',
      details: 'Applications submitted outside the normal application window',
      icon: Clock,
    },
  ];

  const currentStepValid = validateStep(currentStep);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-8 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-24 animate-fade-in">
            <div className="inline-flex items-center gap-4 bg-card/50 backdrop-blur-sm px-8 py-5 rounded-3xl border shadow-sm mb-10">
              <div className="relative">
                <FileText className="h-7 w-7 text-muted-foreground" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
              </div>
              <span className="text-lg font-medium text-foreground">Oslo Kindergarten Application</span>
              {autoSaving && (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Auto-saving...</span>
                </>
              )}
            </div>
            <h1 className="text-6xl font-bold text-foreground mb-8 tracking-tight">
              Apply for Kindergarten
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Complete your application with our streamlined form
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-24">
            <div className="flex items-center space-x-12 bg-card/30 backdrop-blur-sm px-16 py-8 rounded-3xl border shadow-sm">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div 
                    className={`relative flex items-center space-x-5 px-8 py-4 rounded-2xl cursor-pointer transition-all duration-700 hover:scale-105 ${
                      currentStep === step.number 
                        ? 'bg-primary/10 text-primary scale-110' 
                        : completedSteps.includes(step.number)
                        ? 'text-muted-foreground'
                        : 'text-muted-foreground/50'
                    }`}
                    onClick={() => handleStepChange(step.number)}
                  >
                    <div className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-700 ${
                      currentStep === step.number 
                        ? 'bg-primary text-primary-foreground scale-110' 
                        : completedSteps.includes(step.number)
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {completedSteps.includes(step.number) ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <step.icon className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-medium">{step.shortTitle}</span>
                    </div>
                    {currentStep === step.number && (
                      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 transition-all duration-700 ${
                      completedSteps.includes(step.number) 
                        ? 'bg-primary' 
                        : 'bg-border'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className={`transition-all duration-700 ease-out ${isAnimating ? 'opacity-0 transform translate-y-12' : 'opacity-100 transform translate-y-0'}`}>
            <Card className="border shadow-sm bg-card/30 backdrop-blur-sm">
              <CardContent className="p-20">
                
                {currentStep === 1 && (
                  <div className="space-y-16">
                    <div className="text-center">
                      <Brain className="h-20 w-20 text-primary mx-auto mb-8 animate-float" />
                      <h2 className="text-4xl font-bold text-foreground mb-6">Smart Application Form</h2>
                      <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
                        Our intelligent form adapts to your needs and provides smart suggestions
                      </p>
                    </div>

                    {/* Smart Suggestions */}
                    {smartSuggestions.length > 0 && (
                      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-12 animate-slide-up">
                        <div className="flex items-start gap-5">
                          <Lightbulb className="h-7 w-7 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-foreground mb-3 text-lg">Smart Suggestion</h4>
                            {smartSuggestions.map((suggestion, index) => (
                              <p key={index} className="text-muted-foreground leading-relaxed text-base">{suggestion}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Application Type Selection */}
                    <div className="space-y-8">
                      <Label className="text-2xl font-semibold text-foreground flex items-center gap-4">
                        <Sparkles className="h-7 w-7 text-primary" />
                        Application Type
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {applicationTypes.map((type) => (
                          <div
                            key={type.id}
                            className={`relative p-10 border rounded-3xl cursor-pointer transition-all duration-700 hover:shadow-lg hover:scale-105 ${
                              applicationData.applicationType === type.id
                                ? 'border-primary bg-primary/5 shadow-md scale-105'
                                : 'border-border bg-card/30 hover:border-primary/20'
                            }`}
                            onClick={() => updateField('applicationType', type.id)}
                          >
                            <div className="flex flex-col items-center text-center space-y-6">
                              <div className={`p-5 rounded-3xl transition-all duration-500 ${
                                applicationData.applicationType === type.id 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                <type.icon className="h-10 w-10" />
                              </div>
                              <div>
                                <h3 className={`font-semibold text-2xl mb-3 ${
                                  applicationData.applicationType === type.id ? 'text-primary' : 'text-foreground'
                                }`}>
                                  {type.title}
                                </h3>
                                <Badge variant="secondary" className="text-sm mb-4">
                                  {type.subtitle}
                                </Badge>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                  {type.description}
                                </p>
                              </div>
                            </div>
                            {applicationData.applicationType === type.id && (
                              <div className="absolute top-5 right-5 animate-scale-in">
                                <div className="bg-primary text-primary-foreground rounded-full p-2">
                                  <Check className="h-5 w-5" />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Child Information */}
                    <div className="bg-muted/20 rounded-3xl p-12 space-y-12">
                      <div className="flex items-center gap-5 mb-8">
                        <div className="p-4 bg-primary/10 rounded-2xl">
                          <User className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-foreground">Child Information</h3>
                          <p className="text-muted-foreground text-lg">Tell us about your child</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <Label htmlFor="childFirstName" className="flex items-center gap-4 text-lg font-medium">
                            <User className="h-6 w-6 text-primary" />
                            Child's First Name *
                          </Label>
                          <Input
                            id="childFirstName"
                            placeholder="Enter first name"
                            value={applicationData.childFirstName}
                            onChange={(e) => updateField('childFirstName', e.target.value)}
                            className="h-14 text-lg border-input focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="childLastName" className="flex items-center gap-4 text-lg font-medium">
                            <User className="h-6 w-6 text-primary" />
                            Child's Last Name *
                          </Label>
                          <Input
                            id="childLastName"
                            placeholder="Enter last name"
                            value={applicationData.childLastName}
                            onChange={(e) => updateField('childLastName', e.target.value)}
                            className="h-14 text-lg border-input focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="childBirthDate" className="flex items-center gap-4 text-lg font-medium">
                            <Calendar className="h-6 w-6 text-primary" />
                            Date of Birth *
                          </Label>
                          <Input
                            id="childBirthDate"
                            type="date"
                            value={applicationData.childBirthDate}
                            onChange={(e) => updateField('childBirthDate', e.target.value)}
                            className="h-14 text-lg border-input focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="childGender" className="flex items-center gap-4 text-lg font-medium">
                            <Users className="h-6 w-6 text-primary" />
                            Gender
                          </Label>
                          <select
                            id="childGender"
                            value={applicationData.childGender}
                            onChange={(e) => updateField('childGender', e.target.value)}
                            className="w-full h-14 text-lg border border-input rounded-md px-4 focus:border-primary focus:ring-primary bg-background"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Guardian Information */}
                    <div className="bg-muted/20 rounded-3xl p-12 space-y-12">
                      <div className="flex items-center gap-5 mb-8">
                        <div className="p-4 bg-primary/10 rounded-2xl">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-foreground">Guardian Information</h3>
                          <p className="text-muted-foreground text-lg">Primary guardian details</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <Label htmlFor="guardianFirstName" className="flex items-center gap-4 text-lg font-medium">
                            <User className="h-6 w-6 text-primary" />
                            First Name *
                          </Label>
                          <Input
                            id="guardianFirstName"
                            placeholder="Enter first name"
                            value={applicationData.guardianFirstName}
                            onChange={(e) => updateField('guardianFirstName', e.target.value)}
                            className="h-14 text-lg border-input focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="guardianLastName" className="flex items-center gap-4 text-lg font-medium">
                            <User className="h-6 w-6 text-primary" />
                            Last Name *
                          </Label>
                          <Input
                            id="guardianLastName"
                            placeholder="Enter last name"
                            value={applicationData.guardianLastName}
                            onChange={(e) => updateField('guardianLastName', e.target.value)}
                            className="h-14 text-lg border-input focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="guardianEmail" className="flex items-center gap-4 text-lg font-medium">
                            <Mail className="h-6 w-6 text-primary" />
                            Email *
                          </Label>
                          <Input
                            id="guardianEmail"
                            type="email"
                            placeholder="Enter email address"
                            value={applicationData.guardianEmail}
                            onChange={(e) => updateField('guardianEmail', e.target.value)}
                            className="h-14 text-lg border-input focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="guardianPhone" className="flex items-center gap-4 text-lg font-medium">
                            <Phone className="h-6 w-6 text-primary" />
                            Phone *
                          </Label>
                          <Input
                            id="guardianPhone"
                            type="tel"
                            placeholder="Enter phone number"
                            value={applicationData.guardianPhone}
                            onChange={(e) => updateField('guardianPhone', e.target.value)}
                            className="h-14 text-lg border-input focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="guardianPostalCode" className="flex items-center gap-4 text-lg font-medium">
                            <MapPin className="h-6 w-6 text-primary" />
                            Postal Code *
                            {isProcessingPostal && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                          </Label>
                          <Input
                            id="guardianPostalCode"
                            placeholder="Enter postal code"
                            value={applicationData.guardianPostalCode}
                            onChange={(e) => updateField('guardianPostalCode', e.target.value)}
                            className="h-14 text-lg border-input focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="guardianCity" className="flex items-center gap-4 text-lg font-medium">
                            <Globe className="h-6 w-6 text-primary" />
                            City
                          </Label>
                          <Input
                            id="guardianCity"
                            placeholder="City will auto-fill"
                            value={applicationData.guardianCity}
                            onChange={(e) => updateField('guardianCity', e.target.value)}
                            className="h-14 text-lg border-input focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="md:col-span-2 space-y-4">
                          <Label htmlFor="guardianAddress" className="flex items-center gap-4 text-lg font-medium">
                            <Home className="h-6 w-6 text-primary" />
                            Address
                          </Label>
                          <Input
                            id="guardianAddress"
                            placeholder="Enter full address"
                            value={applicationData.guardianAddress}
                            onChange={(e) => updateField('guardianAddress', e.target.value)}
                            className="h-14 text-lg border-input focus:border-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-12">
                    <div className="text-center">
                      <Star className="h-20 w-20 text-primary mx-auto mb-8 animate-float" />
                      <h2 className="text-4xl font-bold text-foreground mb-6">Arrange Kindergarten Priority</h2>
                      <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
                        Organize your selected kindergartens by preference order
                      </p>
                    </div>
                    <KindergartenPriorityManager />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-12">
                    <div className="text-center">
                      <CheckCircle className="h-20 w-20 text-primary mx-auto mb-8 animate-float" />
                      <h2 className="text-4xl font-bold text-foreground mb-6">Review & Submit</h2>
                      <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
                        Please review your application before submitting
                      </p>
                    </div>

                    <div className="space-y-10">
                      {/* Application Summary */}
                      <Card className="border shadow-sm bg-card/50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3 text-xl">
                            <FileText className="h-6 w-6 text-primary" />
                            Application Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="font-medium text-foreground mb-3">Application Type</h4>
                              <p className="text-muted-foreground">
                                {applicationTypes.find(t => t.id === applicationData.applicationType)?.title || 'Not selected'}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-3">Child</h4>
                              <p className="text-muted-foreground">
                                {applicationData.childFirstName} {applicationData.childLastName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Born: {applicationData.childBirthDate || 'Not provided'}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-3">Primary Guardian</h4>
                              <p className="text-muted-foreground">
                                {applicationData.guardianFirstName} {applicationData.guardianLastName}
                              </p>
                              <p className="text-sm text-muted-foreground">{applicationData.guardianEmail}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-3">Contact Information</h4>
                              <p className="text-muted-foreground">{applicationData.guardianPhone}</p>
                              <p className="text-sm text-muted-foreground">
                                {applicationData.guardianPostalCode} {applicationData.guardianCity}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Selected Kindergartens */}
                      <Card className="border shadow-sm bg-card/50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3 text-xl">
                            <Home className="h-6 w-6 text-primary" />
                            Selected Kindergartens ({selectedKindergartens.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {selectedKindergartens.map((k, index) => (
                              <div key={k.id} className="flex items-center gap-4 p-4 bg-muted/20 rounded-xl">
                                <Badge variant="outline" className="bg-primary/10 text-primary text-base px-3 py-1">
                                  Priority {index + 1}
                                </Badge>
                                <div className="flex-1">
                                  <p className="font-medium text-lg">{k.name}</p>
                                  <p className="text-base text-muted-foreground">{k.municipality}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Additional Information */}
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <Label htmlFor="additionalInfo" className="text-lg font-medium">Additional Information (Optional)</Label>
                          <Textarea
                            id="additionalInfo"
                            value={applicationData.additionalInfo}
                            onChange={(e) => updateField('additionalInfo', e.target.value)}
                            placeholder="Any additional information you'd like to include with your application"
                            rows={5}
                            className="text-lg border-input focus:border-primary resize-none"
                          />
                        </div>

                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
                          <div className="flex items-start gap-5">
                            <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-semibold text-primary mb-3 text-lg">Privacy & Data Protection</h4>
                              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                                Your information is protected under Norwegian privacy laws and GDPR. We only use your data for processing your kindergarten application and will not share it with third parties.
                              </p>
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  id="privacyConsent"
                                  required
                                  className="h-5 w-5 text-primary focus:ring-primary border-border/30 rounded"
                                />
                                <Label htmlFor="privacyConsent" className="text-base">
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

              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-border">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="h-16 px-10 text-lg disabled:opacity-50 transition-all duration-500 hover:scale-105"
              >
                <ArrowLeft className="h-6 w-6 mr-4" />
                Previous
              </Button>

              <div className="flex items-center space-x-8">
                <div className="flex space-x-4">
                  {steps.map((step) => (
                    <div
                      key={step.number}
                      className={`w-5 h-5 rounded-full transition-all duration-700 ${
                        currentStep === step.number
                          ? 'bg-primary scale-125'
                          : completedSteps.includes(step.number)
                          ? 'bg-primary/60'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg text-muted-foreground font-medium">
                  Step {currentStep} of {steps.length}
                </span>
              </div>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={!currentStepValid}
                  className="h-16 px-10 text-lg disabled:opacity-50 transition-all duration-500 hover:scale-105"
                >
                  {currentStep === 1 ? 'Arrange Priorities' : 'Review & Submit'}
                  <ArrowRight className="h-6 w-6 ml-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!currentStepValid}
                  className="h-16 px-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-500 disabled:opacity-50 hover:scale-105"
                >
                  <Zap className="h-6 w-6 mr-4" />
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicApplication;