
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface FormConfigurationProps {
  form: any;
  onClose: () => void;
}

const FormConfiguration: React.FC<FormConfigurationProps> = ({ form, onClose }) => {
  const [config, setConfig] = useState({
    name: form?.name || '',
    header: form?.name || '',
    whoCanSubmit: 'all',
    canBeChangedBy: 'applicant-coapplicant',
    isAlwaysBillRecipient: false,
    manualApproval: 'all-applications',
    maxMonthsBeforeStart: '',
    minMonthsBeforeStart: '0',
    allowedDates: null as Date | null,
    numberOfApplications: 'one-per-child',
    applicationScope: 'unit',
    closeOptionFrom: null as Date | null,
    reopenOptionFrom: null as Date | null,
    warnWhenChangingFrom: null as Date | null,
    warnWhenChangingUntil: null as Date | null,
    mandatoryChoices: '1',
    possibleChoices: '3',
    reduceChoicesForAdmitted: '0',
    minPlacementAge: '12',
    maxPlacementAge: '',
    dontPublishOfferFrom: null as Date | null,
    dontPublishOfferUntil: null as Date | null,
    possibleToAttach: false,
    sameUnitNotSelectedTwice: true,
    homePhoneMandatory: false,
    workPhoneMandatory: false,
    mobilePhoneMandatory: false,
    emailMandatory: true,
    nativeLanguageMandatory: false,
    showNativeLanguage: true,
    rateCategoryMandatory: false,
    showRateCategory: false,
    priorityCategoryMandatory: false,
    showPriorityCategory: false,
    reasonTypeMandatory: false,
    showReasonType: true,
    showFieldForNote: false
  });

  const handleInputChange = (field: string, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: string, date: Date | undefined) => {
    setConfig(prev => ({ ...prev, [field]: date || null }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Form Configuration</h3>
          <p className="text-sm text-slate-600">Configure form settings and business rules</p>
        </div>
        <Button onClick={onClose} variant="outline" size="sm">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Settings</TabsTrigger>
          <TabsTrigger value="submission">Submission Rules</TabsTrigger>
          <TabsTrigger value="dates">Date Settings</TabsTrigger>
          <TabsTrigger value="fields">Field Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name (internal)</Label>
                  <Input
                    id="name"
                    value={config.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="header">Header</Label>
                  <Input
                    id="header"
                    value={config.header}
                    onChange={(e) => handleInputChange('header', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Who can submit an application</Label>
                <Select
                  value={config.whoCanSubmit}
                  onValueChange={(value) => handleInputChange('whoCanSubmit', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="guardians-only">Guardians only</SelectItem>
                    <SelectItem value="authorized-users">Authorized users</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Application can be changed by</Label>
                <Select
                  value={config.canBeChangedBy}
                  onValueChange={(value) => handleInputChange('canBeChangedBy', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applicant-coapplicant">Applicant and co-applicant</SelectItem>
                    <SelectItem value="applicant-only">Applicant only</SelectItem>
                    <SelectItem value="staff-only">Staff only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="billRecipient"
                  checked={config.isAlwaysBillRecipient}
                  onCheckedChange={(checked) => handleInputChange('isAlwaysBillRecipient', !!checked)}
                />
                <Label htmlFor="billRecipient">Applicant is always bill recipient</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Submission and Approval Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Application for manual approval</Label>
                <Select
                  value={config.manualApproval}
                  onValueChange={(value) => handleInputChange('manualApproval', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-applications">All applications</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="conditional">Conditional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxMonths">Max. months before requested startdate</Label>
                  <Input
                    id="maxMonths"
                    type="number"
                    value={config.maxMonthsBeforeStart}
                    onChange={(e) => handleInputChange('maxMonthsBeforeStart', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="minMonths">Minimum months before requested startdate</Label>
                  <Input
                    id="minMonths"
                    type="number"
                    value={config.minMonthsBeforeStart}
                    onChange={(e) => handleInputChange('minMonthsBeforeStart', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Number of allowed applications</Label>
                <Select
                  value={config.numberOfApplications}
                  onValueChange={(value) => handleInputChange('numberOfApplications', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-per-child">One per child</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                    <SelectItem value="custom">Custom limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Application scope</Label>
                <Select
                  value={config.applicationScope}
                  onValueChange={(value) => handleInputChange('applicationScope', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unit">Unit</SelectItem>
                    <SelectItem value="district">District</SelectItem>
                    <SelectItem value="municipality">Municipality</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Date and Time Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Close option to change application from</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !config.closeOptionFrom && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {config.closeOptionFrom ? format(config.closeOptionFrom, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={config.closeOptionFrom || undefined}
                        onSelect={(date) => handleDateChange('closeOptionFrom', date)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Reopen possibility to change application from</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !config.reopenOptionFrom && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {config.reopenOptionFrom ? format(config.reopenOptionFrom, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={config.reopenOptionFrom || undefined}
                        onSelect={(date) => handleDateChange('reopenOptionFrom', date)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mandatoryChoices">Mandatory number of choices</Label>
                  <Input
                    id="mandatoryChoices"
                    type="number"
                    value={config.mandatoryChoices}
                    onChange={(e) => handleInputChange('mandatoryChoices', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="possibleChoices">Number of possible choices</Label>
                  <Input
                    id="possibleChoices"
                    type="number"
                    value={config.possibleChoices}
                    onChange={(e) => handleInputChange('possibleChoices', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minAge">Minimum placement age in months</Label>
                  <Input
                    id="minAge"
                    type="number"
                    value={config.minPlacementAge}
                    onChange={(e) => handleInputChange('minPlacementAge', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="maxAge">Maximum placement age in months</Label>
                  <Input
                    id="maxAge"
                    type="number"
                    value={config.maxPlacementAge}
                    onChange={(e) => handleInputChange('maxPlacementAge', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fields" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Field Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="homePhone"
                        checked={config.homePhoneMandatory}
                        onCheckedChange={(checked) => handleInputChange('homePhoneMandatory', !!checked)}
                      />
                      <Label htmlFor="homePhone">Home phone number is mandatory</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="workPhone"
                        checked={config.workPhoneMandatory}
                        onCheckedChange={(checked) => handleInputChange('workPhoneMandatory', !!checked)}
                      />
                      <Label htmlFor="workPhone">Work phone is mandatory</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobilePhone"
                        checked={config.mobilePhoneMandatory}
                        onCheckedChange={(checked) => handleInputChange('mobilePhoneMandatory', !!checked)}
                      />
                      <Label htmlFor="mobilePhone">Mobile phone number is mandatory</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="email"
                        checked={config.emailMandatory}
                        onCheckedChange={(checked) => handleInputChange('emailMandatory', !!checked)}
                      />
                      <Label htmlFor="email">Email is mandatory</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Language and Categories</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showNative"
                        checked={config.showNativeLanguage}
                        onCheckedChange={(checked) => handleInputChange('showNativeLanguage', !!checked)}
                      />
                      <Label htmlFor="showNative">Show native language</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showRate"
                        checked={config.showRateCategory}
                        onCheckedChange={(checked) => handleInputChange('showRateCategory', !!checked)}
                      />
                      <Label htmlFor="showRate">Show rate category</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showPriority"
                        checked={config.showPriorityCategory}
                        onCheckedChange={(checked) => handleInputChange('showPriorityCategory', !!checked)}
                      />
                      <Label htmlFor="showPriority">Show priority category</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showReason"
                        checked={config.showReasonType}
                        onCheckedChange={(checked) => handleInputChange('showReasonType', !!checked)}
                      />
                      <Label htmlFor="showReason">Show Reason type</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sameUnit"
                    checked={config.sameUnitNotSelectedTwice}
                    onCheckedChange={(checked) => handleInputChange('sameUnitNotSelectedTwice', !!checked)}
                  />
                  <Label htmlFor="sameUnit">Same unit can not be selected more than once</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="attachments"
                    checked={config.possibleToAttach}
                    onCheckedChange={(checked) => handleInputChange('possibleToAttach', !!checked)}
                  />
                  <Label htmlFor="attachments">Possible to attach attachments?</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="noteField"
                    checked={config.showFieldForNote}
                    onCheckedChange={(checked) => handleInputChange('showFieldForNote', !!checked)}
                  />
                  <Label htmlFor="noteField">Show field for note</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-end gap-2 pt-4 border-t">
        <Button variant="outline">Change questions</Button>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default FormConfiguration;
