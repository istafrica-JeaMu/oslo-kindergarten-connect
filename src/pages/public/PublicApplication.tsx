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
  AlertCircle
} from 'lucide-react';

interface ApplicationData {
  // Child Information
  childFirstName: string;
  childLastName: string;
  childBirthDate: string;
  childGender: string;
  specialNeeds: string;
  medicalInfo: string;
  
  // Guardian Information
  guardianFirstName: string;
  guardianLastName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianAddress: string;
  guardianPostalCode: string;
  guardianCity: string;
  
  // Secondary Guardian (optional)
  hasSecondGuardian: boolean;
  secondGuardianFirstName: string;
  secondGuardianLastName: string;
  secondGuardianEmail: string;
  secondGuardianPhone: string;
  
  // Preferences
  preferredStartDate: string;
  additionalInfo: string;
}

const PublicApplication = () => {
  const { selectedKindergartens, clearCart } = useKindergartenCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
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
    preferredStartDate: '',
    additionalInfo: ''
  });

  // Redirect if no kindergartens selected
  useEffect(() => {
    if (selectedKindergartens.length === 0) {
      navigate('/kindergartens');
    }
  }, [selectedKindergartens, navigate]);

  // Load saved data from localStorage
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

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('application-draft', JSON.stringify(applicationData));
  }, [applicationData]);

  const updateField = (field: keyof ApplicationData, value: string | boolean) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Here you would submit to your backend
    console.log('Submitting application:', {
      ...applicationData,
      selectedKindergartens: selectedKindergartens.map(k => k.id)
    });
    
    // Clear saved data
    localStorage.removeItem('application-draft');
    clearCart();
    
    // Navigate to success page
    navigate('/application-success');
  };

  const steps = [
    { number: 1, title: 'Child Information', icon: User },
    { number: 2, title: 'Guardian Details', icon: Users },
    { number: 3, title: 'Preferences & Submit', icon: FileText }
  ];

  if (selectedKindergartens.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/kindergartens')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Browse
              </Button>
              <div className="h-6 w-px bg-slate-300" />
              <h1 className="text-xl font-bold text-slate-900">Kindergarten Application</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-slate-700">
                {selectedKindergartens.length} kindergarten{selectedKindergartens.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-slate-300 text-slate-400'
                  }`}>
                    {currentStep > step.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-blue-600' : 'text-slate-400'
                    }`}>
                      Step {step.number}
                    </p>
                    <p className={`text-xs ${
                      currentStep >= step.number ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-slate-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Kindergartens Summary */}
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Selected Kindergartens</CardTitle>
              <CardDescription>Your application will be submitted to these kindergartens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {selectedKindergartens.map((k, index) => (
                  <div key={k.id} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium text-slate-900">{k.name}</p>
                      <p className="text-sm text-slate-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {k.municipality}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card>
            <CardContent className="p-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Child Information</h2>
                    <p className="text-slate-600">Please provide details about your child</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="childFirstName">First Name *</Label>
                      <Input
                        id="childFirstName"
                        value={applicationData.childFirstName}
                        onChange={(e) => updateField('childFirstName', e.target.value)}
                        placeholder="Enter child's first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="childLastName">Last Name *</Label>
                      <Input
                        id="childLastName"
                        value={applicationData.childLastName}
                        onChange={(e) => updateField('childLastName', e.target.value)}
                        placeholder="Enter child's last name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="childBirthDate">Date of Birth *</Label>
                      <Input
                        id="childBirthDate"
                        type="date"
                        value={applicationData.childBirthDate}
                        onChange={(e) => updateField('childBirthDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="childGender">Gender</Label>
                      <select
                        id="childGender"
                        value={applicationData.childGender}
                        onChange={(e) => updateField('childGender', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialNeeds">Special Needs or Allergies</Label>
                    <Textarea
                      id="specialNeeds"
                      value={applicationData.specialNeeds}
                      onChange={(e) => updateField('specialNeeds', e.target.value)}
                      placeholder="Please describe any special needs, allergies, or dietary requirements"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="medicalInfo">Medical Information</Label>
                    <Textarea
                      id="medicalInfo"
                      value={applicationData.medicalInfo}
                      onChange={(e) => updateField('medicalInfo', e.target.value)}
                      placeholder="Any relevant medical information we should know about"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Guardian Information</h2>
                    <p className="text-slate-600">Primary guardian contact details</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="guardianFirstName">First Name *</Label>
                      <Input
                        id="guardianFirstName"
                        value={applicationData.guardianFirstName}
                        onChange={(e) => updateField('guardianFirstName', e.target.value)}
                        placeholder="Guardian's first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="guardianLastName">Last Name *</Label>
                      <Input
                        id="guardianLastName"
                        value={applicationData.guardianLastName}
                        onChange={(e) => updateField('guardianLastName', e.target.value)}
                        placeholder="Guardian's last name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="guardianEmail">Email *</Label>
                      <Input
                        id="guardianEmail"
                        type="email"
                        value={applicationData.guardianEmail}
                        onChange={(e) => updateField('guardianEmail', e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="guardianPhone">Phone Number *</Label>
                      <Input
                        id="guardianPhone"
                        type="tel"
                        value={applicationData.guardianPhone}
                        onChange={(e) => updateField('guardianPhone', e.target.value)}
                        placeholder="+47 123 45 678"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="guardianAddress">Address *</Label>
                    <Input
                      id="guardianAddress"
                      value={applicationData.guardianAddress}
                      onChange={(e) => updateField('guardianAddress', e.target.value)}
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="guardianPostalCode">Postal Code *</Label>
                      <Input
                        id="guardianPostalCode"
                        value={applicationData.guardianPostalCode}
                        onChange={(e) => updateField('guardianPostalCode', e.target.value)}
                        placeholder="0123"
                      />
                    </div>
                    <div>
                      <Label htmlFor="guardianCity">City *</Label>
                      <Input
                        id="guardianCity"
                        value={applicationData.guardianCity}
                        onChange={(e) => updateField('guardianCity', e.target.value)}
                        placeholder="Oslo"
                      />
                    </div>
                  </div>

                  {/* Secondary Guardian Section */}
                  <div className="border-t pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="checkbox"
                        id="hasSecondGuardian"
                        checked={applicationData.hasSecondGuardian}
                        onChange={(e) => updateField('hasSecondGuardian', e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="hasSecondGuardian" className="font-medium">
                        Add second guardian/parent
                      </Label>
                    </div>

                    {applicationData.hasSecondGuardian && (
                      <div className="space-y-4 pl-6 border-l-2 border-slate-200">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="secondGuardianFirstName">First Name</Label>
                            <Input
                              id="secondGuardianFirstName"
                              value={applicationData.secondGuardianFirstName}
                              onChange={(e) => updateField('secondGuardianFirstName', e.target.value)}
                              placeholder="Second guardian's first name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="secondGuardianLastName">Last Name</Label>
                            <Input
                              id="secondGuardianLastName"
                              value={applicationData.secondGuardianLastName}
                              onChange={(e) => updateField('secondGuardianLastName', e.target.value)}
                              placeholder="Second guardian's last name"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="secondGuardianEmail">Email</Label>
                            <Input
                              id="secondGuardianEmail"
                              type="email"
                              value={applicationData.secondGuardianEmail}
                              onChange={(e) => updateField('secondGuardianEmail', e.target.value)}
                              placeholder="second.guardian@example.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="secondGuardianPhone">Phone Number</Label>
                            <Input
                              id="secondGuardianPhone"
                              type="tel"
                              value={applicationData.secondGuardianPhone}
                              onChange={(e) => updateField('secondGuardianPhone', e.target.value)}
                              placeholder="+47 123 45 678"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Final Details</h2>
                    <p className="text-slate-600">Complete your application</p>
                  </div>

                  <div>
                    <Label htmlFor="preferredStartDate">Preferred Start Date *</Label>
                    <Input
                      id="preferredStartDate"
                      type="date"
                      value={applicationData.preferredStartDate}
                      onChange={(e) => updateField('preferredStartDate', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      value={applicationData.additionalInfo}
                      onChange={(e) => updateField('additionalInfo', e.target.value)}
                      placeholder="Any additional information you'd like to share"
                      rows={4}
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-900 mb-1">Required Documents</h3>
                        <p className="text-sm text-blue-800 mb-2">
                          After submitting this application, you'll receive an email with instructions for uploading:
                        </p>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Child's birth certificate</li>
                          <li>• Proof of residence</li>
                          <li>• Medical certificates (if applicable)</li>
                          <li>• Income documentation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button
                    onClick={() => setCurrentStep(prev => Math.min(3, prev + 1))}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Submit Application
                    <Check className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicApplication;