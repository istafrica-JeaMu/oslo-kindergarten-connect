
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, User, Building2, Calendar, ArrowRight, CheckCircle, AlertCircle, Sparkles, Clock } from 'lucide-react';

const NewApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    childInfo: {
      firstName: '',
      lastName: '',
      birthDate: '',
      personalNumber: '',
      specialNeeds: false,
      siblings: false
    },
    preferences: {
      kindergartens: [],
      startDate: '',
      fullTime: true
    },
    guardian: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      relationship: 'parent'
    }
  });

  const steps = [
    { id: 1, title: 'Child Information', icon: User, description: 'Basic details about your child' },
    { id: 2, title: 'Kindergarten Preferences', icon: Building2, description: 'Choose your preferred kindergartens' },
    { id: 3, title: 'Guardian Information', icon: FileText, description: 'Your contact details' },
    { id: 4, title: 'Review & Submit', icon: CheckCircle, description: 'Review and submit your application' }
  ];

  const kindergartenOptions = [
    { id: 1, name: 'Løvenskiold Kindergarten', district: 'Frogner', capacity: 'High', rating: 4.8 },
    { id: 2, name: 'Sinsen Kindergarten', district: 'Grünerløkka', capacity: 'Medium', rating: 4.6 },
    { id: 3, name: 'Sagene Kindergarten', district: 'Sagene', capacity: 'Low', rating: 4.7 },
    { id: 4, name: 'Bjølsen Kindergarten', district: 'Sagene', capacity: 'High', rating: 4.5 }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              currentStep >= step.id 
                ? 'bg-gradient-to-br from-oslo-blue to-blue-700 shadow-lg' 
                : 'bg-slate-200 hover:bg-slate-300'
            }`}>
              <step.icon className={`w-6 h-6 ${currentStep >= step.id ? 'text-white' : 'text-slate-500'}`} />
              {currentStep > step.id && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="mt-3 text-center">
              <div className={`font-semibold text-sm ${currentStep >= step.id ? 'text-oslo-blue' : 'text-slate-500'}`}>
                {step.title}
              </div>
              <div className="text-xs text-slate-500 mt-1 max-w-24">{step.description}</div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-4 mt-[-20px] transition-colors duration-300 ${
              currentStep > step.id ? 'bg-gradient-to-r from-oslo-blue to-blue-600' : 'bg-slate-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderChildInformation = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">First Name *</label>
          <input 
            type="text"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-oslo-blue focus:outline-none transition-colors duration-200 bg-white"
            placeholder="Enter child's first name"
            value={formData.childInfo.firstName}
            onChange={(e) => setFormData({
              ...formData,
              childInfo: { ...formData.childInfo, firstName: e.target.value }
            })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Last Name *</label>
          <input 
            type="text"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-oslo-blue focus:outline-none transition-colors duration-200 bg-white"
            placeholder="Enter child's last name"
            value={formData.childInfo.lastName}
            onChange={(e) => setFormData({
              ...formData,
              childInfo: { ...formData.childInfo, lastName: e.target.value }
            })}
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Date of Birth *</label>
          <input 
            type="date"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-oslo-blue focus:outline-none transition-colors duration-200 bg-white"
            value={formData.childInfo.birthDate}
            onChange={(e) => setFormData({
              ...formData,
              childInfo: { ...formData.childInfo, birthDate: e.target.value }
            })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Personal Number *</label>
          <input 
            type="text"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-oslo-blue focus:outline-none transition-colors duration-200 bg-white"
            placeholder="11 digits (DDMMYYXXXXX)"
            value={formData.childInfo.personalNumber}
            onChange={(e) => setFormData({
              ...formData,
              childInfo: { ...formData.childInfo, personalNumber: e.target.value }
            })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-oslo-blue/5 to-blue-50 rounded-xl border border-oslo-blue/20">
          <input 
            type="checkbox"
            id="specialNeeds"
            className="w-5 h-5 text-oslo-blue focus:ring-oslo-blue border-slate-300 rounded"
            checked={formData.childInfo.specialNeeds}
            onChange={(e) => setFormData({
              ...formData,
              childInfo: { ...formData.childInfo, specialNeeds: e.target.checked }
            })}
          />
          <label htmlFor="specialNeeds" className="text-sm font-medium text-slate-700">
            Child has special needs or requires additional support
          </label>
        </div>
        
        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
          <input 
            type="checkbox"
            id="siblings"
            className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded"
            checked={formData.childInfo.siblings}
            onChange={(e) => setFormData({
              ...formData,
              childInfo: { ...formData.childInfo, siblings: e.target.checked }
            })}
          />
          <label htmlFor="siblings" className="text-sm font-medium text-slate-700">
            Child has siblings already attending kindergarten in Oslo
          </label>
        </div>
      </div>
    </div>
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

      <div className="grid gap-4">
        {kindergartenOptions.map((kg, index) => (
          <Card key={kg.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-oslo-blue/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-oslo-blue/10 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Building2 className="w-7 h-7 text-oslo-blue" />
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
                  Select as Priority {index + 1}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Preferred Start Date *</label>
          <input 
            type="date"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-oslo-blue focus:outline-none transition-colors duration-200 bg-white"
            value={formData.preferences.startDate}
            onChange={(e) => setFormData({
              ...formData,
              preferences: { ...formData.preferences, startDate: e.target.value }
            })}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Attendance Type *</label>
          <select 
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-oslo-blue focus:outline-none transition-colors duration-200 bg-white"
            value={formData.preferences.fullTime ? 'full' : 'part'}
            onChange={(e) => setFormData({
              ...formData,
              preferences: { ...formData.preferences, fullTime: e.target.value === 'full' }
            })}
          >
            <option value="full">Full-time (7:30 - 17:00)</option>
            <option value="part">Part-time (8:00 - 14:00)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderGuardianInformation = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">First Name *</label>
          <input 
            type="text"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-oslo-blue focus:outline-none transition-colors duration-200 bg-white"
            placeholder="Your first name"
            value={formData.guardian.firstName}
            onChange={(e) => setFormData({
              ...formData,
              guardian: { ...formData.guardian, firstName: e.target.value }
            })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Last Name *</label>
          <input 
            type="text"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-oslo-blue focus:outline-none transition-colors duration-200 bg-white"
            placeholder="Your last name"
            value={formData.guardian.lastName}
            onChange={(e) => setFormData({
              ...formData,
              guardian: { ...formData.guardian, lastName: e.target.value }
            })}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email Address *</label>
          <input 
            type="email"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-oslo-blue focus:outline-none transition-colors duration-200 bg-white"
            placeholder="your.email@example.com"
            value={formData.guardian.email}
            onChange={(e) => setFormData({
              ...formData,
              guardian: { ...formData.guardian, email: e.target.value }
            })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Phone Number *</label>
          <input 
            type="tel"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-oslo-blue focus:outline-none transition-colors duration-200 bg-white"
            placeholder="+47 xxx xx xxx"
            value={formData.guardian.phone}
            onChange={(e) => setFormData({
              ...formData,
              guardian: { ...formData.guardian, phone: e.target.value }
            })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Home Address *</label>
        <input 
          type="text"
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-oslo-blue focus:outline-none transition-colors duration-200 bg-white"
          placeholder="Street address, postal code, city"
          value={formData.guardian.address}
          onChange={(e) => setFormData({
            ...formData,
            guardian: { ...formData.guardian, address: e.target.value }
          })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Relationship to Child *</label>
        <select 
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-oslo-blue focus:outline-none transition-colors duration-200 bg-white"
          value={formData.guardian.relationship}
          onChange={(e) => setFormData({
            ...formData,
            guardian: { ...formData.guardian, relationship: e.target.value }
          })}
        >
          <option value="parent">Parent</option>
          <option value="guardian">Legal Guardian</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );

  const renderReviewSubmit = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
          <h3 className="text-lg font-semibold text-slate-900">Review Your Application</h3>
        </div>
        <p className="text-slate-600">Please review all information before submitting. You can make changes by going back to previous steps.</p>
      </div>

      {/* Review sections */}
      <div className="grid gap-6">
        <Card className="border-2 border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-oslo-blue" />
              Child Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Name:</span> {formData.childInfo.firstName} {formData.childInfo.lastName}</div>
              <div><span className="font-medium">Birth Date:</span> {formData.childInfo.birthDate}</div>
              <div><span className="font-medium">Personal Number:</span> {formData.childInfo.personalNumber}</div>
              <div><span className="font-medium">Special Needs:</span> {formData.childInfo.specialNeeds ? 'Yes' : 'No'}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-oslo-blue" />
              Kindergarten Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Start Date:</span> {formData.preferences.startDate}</div>
              <div><span className="font-medium">Attendance:</span> {formData.preferences.fullTime ? 'Full-time' : 'Part-time'}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-800 mb-2">Important Information</h4>
            <ul className="text-amber-700 text-sm space-y-1">
              <li>• Application processing typically takes 4-6 weeks</li>
              <li>• You will receive email confirmation once submitted</li>
              <li>• Changes can be made until the application deadline</li>
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
            {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription className="text-lg text-slate-600">
            {steps[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          {currentStep === 1 && renderChildInformation()}
          {currentStep === 2 && renderKindergartenPreferences()}
          {currentStep === 3 && renderGuardianInformation()}
          {currentStep === 4 && renderReviewSubmit()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="hover:bg-slate-50"
        >
          Previous
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">
            Step {currentStep} of {steps.length}
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
