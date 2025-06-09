import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  FileText, 
  User, 
  Baby, 
  MapPin, 
  Upload,
  AlertCircle,
  CheckCircle,
  Clock,
  Save,
  Printer,
  Download
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ManualApplicationData {
  applicationType: string;
  guardianFirstName: string;
  guardianLastName: string;
  guardianNationalId: string;
  guardianHasNationalId: boolean;
  guardianEmail: string;
  guardianPhone: string;
  guardianAddress: string;
  childFirstName: string;
  childLastName: string;
  childNationalId: string;
  childHasNationalId: boolean;
  childBirthDate: string;
  kindergartenPreference1: string;
  kindergartenPreference2: string;
  kindergartenPreference3: string;
  specialNeeds: string;
  additionalNotes: string;
}

const ManualApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tempGuardianId, setTempGuardianId] = useState('');
  const [tempChildId, setTempChildId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ManualApplicationData>({
    defaultValues: {
      applicationType: 'full-time',
      guardianHasNationalId: true,
      childHasNationalId: true,
    }
  });

  const generateTempId = (type: 'guardian' | 'child') => {
    const prefix = type === 'guardian' ? 'TEMP-GUARDIAN-' : 'TEMP-CHILD-';
    const randomId = Math.random().toString(36).substr(2, 4).toUpperCase();
    return prefix + randomId;
  };

  const saveDraft = async () => {
    setIsSavingDraft(true);
    
    try {
      // Simulate API call to save draft
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const draftData = {
        ...form.getValues(),
        status: 'draft',
        submittedBy: 'caseworker',
        manualEntry: true,
        lastSavedAt: new Date().toISOString(),
        tempIds: {
          guardian: !form.getValues('guardianHasNationalId') ? form.getValues('guardianNationalId') : null,
          child: !form.getValues('childHasNationalId') ? form.getValues('childNationalId') : null,
        }
      };
      
      console.log('Application draft saved:', draftData);
      
      toast({
        title: "Draft Saved",
        description: "Application draft has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "There was an error saving the draft. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSavingDraft(false);
    }
  };

  const onSubmit = async (data: ManualApplicationData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const submissionData = {
        ...data,
        submittedBy: 'caseworker',
        manualEntry: true,
        reviewed: true,
        submittedAt: new Date().toISOString(),
        tempIds: {
          guardian: !data.guardianHasNationalId ? data.guardianNationalId : null,
          child: !data.childHasNationalId ? data.childNationalId : null,
        }
      };
      
      console.log('Manual application submitted:', submissionData);
      
      toast({
        title: "Application Submitted Successfully",
        description: "The manual application has been submitted for processing.",
      });
      
      navigate('/caseworker/applications/submitted');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting the application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Application Type', icon: FileText },
    { number: 2, title: 'Guardian Information', icon: User },
    { number: 3, title: 'Child Information', icon: Baby },
    { number: 4, title: 'Preferences', icon: MapPin },
    { number: 5, title: 'Review & Submit', icon: CheckCircle }
  ];

  const getKindergartenName = (value: string) => {
    const kindergartens = {
      'lovenskiold': 'Løvenskiold Kindergarten',
      'sinsen': 'Sinsen Kindergarten',
      'torshov': 'Torshov Kindergarten'
    };
    return kindergartens[value as keyof typeof kindergartens] || value;
  };

  const getApplicationTypeName = (value: string) => {
    const types = {
      'full-time': 'Full-time placement',
      'part-time': 'Part-time placement',
      'emergency': 'Emergency placement'
    };
    return types[value as keyof typeof types] || value;
  };

  const renderStepIndicator = () => (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                currentStep >= step.number 
                  ? 'bg-oslo-blue border-oslo-blue text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <div className="ml-3 hidden md:block">
                <p className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-oslo-blue' : 'text-gray-400'
                }`}>
                  Step {step.number}
                </p>
                <p className={`text-xs ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.number ? 'bg-oslo-blue' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-oslo-blue" />
          Application Type
        </CardTitle>
        <CardDescription>
          Select the type of kindergarten application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="applicationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select application type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="full-time">Full-time placement</SelectItem>
                  <SelectItem value="part-time">Part-time placement</SelectItem>
                  <SelectItem value="emergency">Emergency placement</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <User className="h-6 w-6 text-oslo-blue" />
          Guardian Information
        </CardTitle>
        <CardDescription>
          Enter the guardian's personal details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="guardianFirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="guardianLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="guardianHasNationalId"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Has Norwegian National ID</FormLabel>
                <FormDescription>
                  Toggle off if guardian doesn't have a national ID
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      const tempId = generateTempId('guardian');
                      setTempGuardianId(tempId);
                      form.setValue('guardianNationalId', tempId);
                    } else {
                      setTempGuardianId('');
                      form.setValue('guardianNationalId', '');
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guardianNationalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {form.watch('guardianHasNationalId') ? 'National ID Number' : 'Temporary ID'}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={form.watch('guardianHasNationalId') ? "Enter national ID" : "Auto-generated temporary ID"} 
                  {...field}
                  disabled={!form.watch('guardianHasNationalId')}
                />
              </FormControl>
              {!form.watch('guardianHasNationalId') && (
                <FormDescription className="text-orange-600">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Temporary ID generated - verification documents required
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="guardianEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="guardianPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="guardianAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter full address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Baby className="h-6 w-6 text-oslo-blue" />
          Child Information
        </CardTitle>
        <CardDescription>
          Enter the child's personal details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="childFirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Child's First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter child's first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="childLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Child's Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter child's last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="childHasNationalId"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Child has Norwegian National ID</FormLabel>
                <FormDescription>
                  Toggle off if child doesn't have a national ID
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      const tempId = generateTempId('child');
                      setTempChildId(tempId);
                      form.setValue('childNationalId', tempId);
                    } else {
                      setTempChildId('');
                      form.setValue('childNationalId', '');
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="childNationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {form.watch('childHasNationalId') ? 'Child\'s National ID' : 'Temporary ID'}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={form.watch('childHasNationalId') ? "Enter child's national ID" : "Auto-generated temporary ID"} 
                    {...field}
                    disabled={!form.watch('childHasNationalId')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="childBirthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-oslo-blue" />
          Kindergarten Preferences
        </CardTitle>
        <CardDescription>
          Select preferred kindergartens and additional information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="kindergartenPreference1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Choice Kindergarten</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select first choice" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="lovenskiold">Løvenskiold Kindergarten</SelectItem>
                  <SelectItem value="sinsen">Sinsen Kindergarten</SelectItem>
                  <SelectItem value="torshov">Torshov Kindergarten</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kindergartenPreference2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Second Choice Kindergarten (Optional)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select second choice" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="lovenskiold">Løvenskiold Kindergarten</SelectItem>
                  <SelectItem value="sinsen">Sinsen Kindergarten</SelectItem>
                  <SelectItem value="torshov">Torshov Kindergarten</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specialNeeds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Needs or Requirements</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe any special needs, allergies, or requirements..." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any additional information for the application..." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );

  const renderStep5 = () => {
    const formData = form.watch();
    
    return (
      <div className="space-y-6">
        {/* Submission Notice */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-orange-600" />
              <div>
                <h3 className="font-semibold text-orange-800">Manual Submission Notice</h3>
                <p className="text-sm text-orange-700">
                  You are submitting this application on behalf of a guardian without digital ID.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-oslo-blue" />
              📋 Application Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Application Type</Label>
                <p className="text-sm">{getApplicationTypeName(formData.applicationType)}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Submission Method</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Manual Entry</Badge>
                  <span className="text-sm text-gray-600">Caseworker Assisted</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guardian Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <User className="h-5 w-5 text-oslo-blue" />
              👤 Guardian Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                <p className="text-sm">{formData.guardianFirstName} {formData.guardianLastName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Identification</Label>
                <div className="flex items-center gap-2">
                  <p className="text-sm">{formData.guardianNationalId}</p>
                  {!formData.guardianHasNationalId && (
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      Temporary ID
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Email</Label>
                <p className="text-sm">{formData.guardianEmail || 'Not provided'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Phone</Label>
                <p className="text-sm">{formData.guardianPhone || 'Not provided'}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Address</Label>
              <p className="text-sm">{formData.guardianAddress || 'Not provided'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Child Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Baby className="h-5 w-5 text-oslo-blue" />
              🧒 Child Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                <p className="text-sm">{formData.childFirstName} {formData.childLastName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Identification</Label>
                <div className="flex items-center gap-2">
                  <p className="text-sm">{formData.childNationalId}</p>
                  {!formData.childHasNationalId && (
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      Temporary ID
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Birth Date</Label>
                <p className="text-sm">{formData.childBirthDate || 'Not provided'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kindergarten Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-oslo-blue" />
              🏫 Kindergarten Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-600">First Choice</Label>
                <p className="text-sm">{getKindergartenName(formData.kindergartenPreference1) || 'Not selected'}</p>
              </div>
              {formData.kindergartenPreference2 && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Second Choice</Label>
                  <p className="text-sm">{getKindergartenName(formData.kindergartenPreference2)}</p>
                </div>
              )}
              {formData.specialNeeds && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Special Needs</Label>
                  <p className="text-sm">{formData.specialNeeds}</p>
                </div>
              )}
              {formData.additionalNotes && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Additional Notes</Label>
                  <p className="text-sm">{formData.additionalNotes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Documents Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Upload className="h-5 w-5 text-oslo-blue" />
              📎 Attached Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No documents uploaded</p>
              <p className="text-xs text-gray-400">Document upload feature coming soon</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              
              <div className="text-xs text-gray-500">
                Review all details carefully before submission
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manual Application Submission</h1>
              <p className="text-gray-600 mt-1">
                📋 Caseworker Submission Mode — No e-ID Guardian
              </p>
            </div>
            <Badge className="ml-auto bg-orange-100 text-orange-800 border-orange-300">
              Manual Entry Required
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}

          {/* Navigation Buttons */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                {currentStep > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={isSubmitting || isSavingDraft}
                  >
                    Previous
                  </Button>
                )}
                
                <div className="ml-auto flex gap-3">
                  {currentStep < 5 ? (
                    <Button 
                      type="button" 
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="bg-oslo-blue hover:bg-oslo-blue/90"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <>
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={saveDraft}
                        disabled={isSubmitting || isSavingDraft}
                      >
                        {isSavingDraft ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Draft
                          </>
                        )}
                      </Button>
                      <Button 
                        type="submit"
                        disabled={isSubmitting || isSavingDraft}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isSubmitting ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Submit Application
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default ManualApplicationForm;
