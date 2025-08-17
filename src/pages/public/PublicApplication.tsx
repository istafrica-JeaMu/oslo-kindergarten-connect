import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useKindergartenCart } from '@/contexts/KindergartenCartContext';
import { useNavigate } from 'react-router-dom';
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
  Zap
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

  useEffect(() => {
    localStorage.setItem('application-draft', JSON.stringify(applicationData));
  }, [applicationData]);

  const updateField = (field: keyof ApplicationData, value: string | boolean) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
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
    if (currentStep < 4) {
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
        return applicationData.applicationType !== '';
      case 2:
        return applicationData.childFirstName && applicationData.childLastName && applicationData.childBirthDate;
      case 3:
        return applicationData.guardianFirstName && applicationData.guardianLastName && 
               applicationData.guardianEmail && applicationData.guardianPhone;
      case 4:
        return selectedKindergartens.length > 0;
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
      title: 'Application Type', 
      icon: Calendar, 
      description: 'Choose your application intent',
      shortTitle: 'Type'
    },
    { 
      number: 2, 
      title: 'Child Information', 
      icon: User, 
      description: 'Personal details',
      shortTitle: 'Child'
    },
    { 
      number: 3, 
      title: 'Guardian Information', 
      icon: Users, 
      description: 'Contact information',
      shortTitle: 'Guardian'
    },
    { 
      number: 4, 
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
                
                {/* Step 1: Application Type */}
                {currentStep === 1 && (
                  <div className="p-8 space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">Application Type</h2>
                      <p className="text-muted-foreground text-lg">Choose the option that best describes your situation</p>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Important Information</h3>
                          <p className="text-muted-foreground">
                            The system will automatically determine the appropriate processing period based on your child's age and submission date. Most applications are processed within 4-6 weeks.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
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
                          <div className="p-6">
                            <div className="flex items-start gap-6">
                              <div className={`p-4 rounded-xl bg-gradient-to-r ${type.gradient} text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                <type.icon className="h-6 w-6" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-xl font-bold text-foreground">{type.title}</h3>
                                  <Badge variant="outline" className="bg-background/80 text-xs">
                                    {type.subtitle}
                                  </Badge>
                                </div>
                                <p className="text-foreground/80 mb-3 text-lg">{type.description}</p>
                                <p className="text-muted-foreground">{type.details}</p>
                              </div>
                              <div className="flex-shrink-0">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                  applicationData.applicationType === type.id 
                                    ? 'border-primary bg-primary scale-110' 
                                    : 'border-muted-foreground/30 group-hover:border-primary/50'
                                }`}>
                                  {applicationData.applicationType === type.id && (
                                    <Check className="h-3.5 w-3.5 text-white" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Child Information */}
                {currentStep === 2 && (
                  <div className="p-8 space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">Child Information</h2>
                      <p className="text-muted-foreground text-lg">Tell us about your child</p>
                    </div>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="childFirstName" className="text-base font-medium">First Name *</Label>
                          <Input
                            id="childFirstName"
                            value={applicationData.childFirstName}
                            onChange={(e) => updateField('childFirstName', e.target.value)}
                            placeholder="Enter child's first name"
                            className="h-12 text-base border-border/20 focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="childLastName" className="text-base font-medium">Last Name *</Label>
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
                          rows={4}
                          className="text-base border-border/20 focus:border-primary resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="medicalInfo" className="text-base font-medium">Medical Information</Label>
                        <Textarea
                          id="medicalInfo"
                          value={applicationData.medicalInfo}
                          onChange={(e) => updateField('medicalInfo', e.target.value)}
                          placeholder="Any relevant medical information we should know about"
                          rows={4}
                          className="text-base border-border/20 focus:border-primary resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Guardian Information */}
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

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
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

            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!currentStepValid}
                className="h-12 px-6 text-base bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                Next Step
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