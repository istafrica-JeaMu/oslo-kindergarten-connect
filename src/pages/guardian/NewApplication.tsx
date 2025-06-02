
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Save, Send } from 'lucide-react';

const NewApplication = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
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
    { id: 'k1', name: 'Løvenskiold Barnehage', district: 'Frogner', type: 'Municipal' },
    { id: 'k2', name: 'Sinsen Barnehage', district: 'Grünerløkka', type: 'Municipal' },
    { id: 'k3', name: 'Sagene Barnehage', district: 'Sagene', type: 'Municipal' },
    { id: 'k4', name: 'Vårtun Barnehage', district: 'Søndre Nordstrand', type: 'Private' },
    { id: 'k5', name: 'Bjølsen Barnehage', district: 'Sagene', type: 'Municipal' }
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting application:', formData);
    // Here you would typically make an API call
    alert('Søknad sendt inn! Du vil motta en bekreftelse på e-post.');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Barnets informasjon</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="childName">Barnets navn *</Label>
                  <Input
                    id="childName"
                    value={formData.childName}
                    onChange={(e) => updateFormData('childName', e.target.value)}
                    placeholder="Skriv inn barnets fulle navn"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="childBirthDate">Fødselsdato *</Label>
                  <Input
                    id="childBirthDate"
                    type="date"
                    value={formData.childBirthDate}
                    onChange={(e) => updateFormData('childBirthDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="childNationalId">Fødselsnummer *</Label>
                  <Input
                    id="childNationalId"
                    value={formData.childNationalId}
                    onChange={(e) => updateFormData('childNationalId', e.target.value)}
                    placeholder="11 siffer"
                    maxLength={11}
                    required
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Informasjonen blir hentet fra Folkeregisteret
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Foresattes informasjon</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guardianName">Navn *</Label>
                  <Input
                    id="guardianName"
                    value={formData.guardianName}
                    onChange={(e) => updateFormData('guardianName', e.target.value)}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Automatisk utfylt fra din profil
                  </p>
                </div>
                <div>
                  <Label htmlFor="guardianEmail">E-post *</Label>
                  <Input
                    id="guardianEmail"
                    type="email"
                    value={formData.guardianEmail}
                    onChange={(e) => updateFormData('guardianEmail', e.target.value)}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="guardianPhone">Telefonnummer</Label>
                  <Input
                    id="guardianPhone"
                    type="tel"
                    value={formData.guardianPhone}
                    onChange={(e) => updateFormData('guardianPhone', e.target.value)}
                    placeholder="+47 xxx xx xxx"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Barnehagepreferanser</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="startDate">Ønsket oppstartsdato *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => updateFormData('startDate', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label>Foretrukne barnehager (maks 5)</Label>
                  <p className="text-sm text-gray-600 mb-3">
                    Velg opptil 5 barnehager i prioritert rekkefølge
                  </p>
                  
                  {/* Selected kindergartens */}
                  {formData.preferredKindergartens.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Valgte barnehager:</h4>
                      <div className="space-y-2">
                        {formData.preferredKindergartens.map((id, index) => {
                          const kg = kindergartens.find(k => k.id === id);
                          return (
                            <div key={id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <div>
                                <span className="font-medium text-sm">{index + 1}. {kg?.name}</span>
                                <span className="text-xs text-gray-600 ml-2">({kg?.district}, {kg?.type})</span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeKindergarten(id)}
                              >
                                Fjern
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Available kindergartens */}
                  <div className="border rounded-lg max-h-60 overflow-y-auto">
                    {kindergartens.filter(kg => !formData.preferredKindergartens.includes(kg.id)).map((kg) => (
                      <div key={kg.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                        <div>
                          <h4 className="font-medium">{kg.name}</h4>
                          <p className="text-sm text-gray-600">{kg.district} • {kg.type}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addKindergarten(kg.id)}
                          disabled={formData.preferredKindergartens.length >= 5}
                        >
                          Velg
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Tilleggsinformasjon</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="specialNeeds"
                    checked={formData.specialNeeds}
                    onCheckedChange={(checked) => updateFormData('specialNeeds', checked)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="specialNeeds">Barnet har spesielle behov</Label>
                    <p className="text-sm text-gray-600">
                      Kryss av hvis barnet har behov for spesiell oppfølging
                    </p>
                  </div>
                </div>

                {formData.specialNeeds && (
                  <div>
                    <Label htmlFor="specialNeedsDescription">Beskriv spesielle behov</Label>
                    <textarea
                      id="specialNeedsDescription"
                      className="w-full min-h-20 px-3 py-2 border rounded-md"
                      value={formData.specialNeedsDescription}
                      onChange={(e) => updateFormData('specialNeedsDescription', e.target.value)}
                      placeholder="Beskriv barnets spesielle behov..."
                    />
                  </div>
                )}

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="siblingInKindergarten"
                    checked={formData.siblingInKindergarten}
                    onCheckedChange={(checked) => updateFormData('siblingInKindergarten', checked)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="siblingInKindergarten">Søsken i barnehage</Label>
                    <p className="text-sm text-gray-600">
                      Kryss av hvis barnet har søsken som går i barnehage
                    </p>
                  </div>
                </div>

                {formData.siblingInKindergarten && (
                  <div>
                    <Label htmlFor="siblingKindergarten">Hvilken barnehage?</Label>
                    <Select value={formData.siblingKindergarten} onValueChange={(value) => updateFormData('siblingKindergarten', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Velg barnehage" />
                      </SelectTrigger>
                      <SelectContent>
                        {kindergartens.map((kg) => (
                          <SelectItem key={kg.id} value={kg.id}>
                            {kg.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t('guardian.newApplication.title')}
        </h1>
        <p className="text-gray-600 mt-2">
          Fyll ut informasjonen nedenfor for å søke om barnehageplass
        </p>
      </div>

      {/* Progress indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Steg {currentStep} av {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% fullført</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          
          <div className="flex justify-between mt-4 text-xs text-gray-600">
            <span className={currentStep >= 1 ? 'text-oslo-blue font-medium' : ''}>Barnets info</span>
            <span className={currentStep >= 2 ? 'text-oslo-blue font-medium' : ''}>Foresattes info</span>
            <span className={currentStep >= 3 ? 'text-oslo-blue font-medium' : ''}>Barnehagevalg</span>
            <span className={currentStep >= 4 ? 'text-oslo-blue font-medium' : ''}>Tilleggsinfo</span>
          </div>
        </CardContent>
      </Card>

      {/* Form content */}
      <Card>
        <CardContent className="pt-6">
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          {t('common.previous')}
        </Button>

        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Lagre kladd
          </Button>

          {currentStep === totalSteps ? (
            <Button onClick={handleSubmit} className="bg-oslo-blue hover:bg-blue-700 flex items-center gap-2">
              <Send className="h-4 w-4" />
              {t('common.submit')}
            </Button>
          ) : (
            <Button onClick={nextStep} className="bg-oslo-blue hover:bg-blue-700 flex items-center gap-2">
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
