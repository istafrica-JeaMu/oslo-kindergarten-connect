
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';

interface ApplicationForm {
  id: string;
  name: string;
  municipality: string;
  status: 'Active' | 'Draft' | 'Archived';
  lastModified: string;
  submissionCount: number;
  districtId: string;
  assignedTemplates: number;
  totalTemplatesNeeded: number;
}

interface ApplicationSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: ApplicationForm | null;
}

const ApplicationSummaryModal: React.FC<ApplicationSummaryModalProps> = ({
  isOpen,
  onClose,
  form
}) => {
  if (!form) return null;

  const configurationFields = [
    { label: 'Name (internal)', value: form.name },
    { label: 'Header', value: form.name },
    { label: 'Who can submit an application', value: 'All' },
    { label: 'Application can be changed by', value: 'Applicant and co applicant' },
    { label: 'Applicant is always bill recipient', value: 'No' },
    { label: 'Application for manual approval', value: 'All applications' },
    { label: 'Max. (number of months) before desired startdate', value: '' },
    { label: 'Minimum months before requested startdate', value: '0' },
    { label: 'Allowed dates for requested admissionstart', value: '' },
    { label: 'Number of allowed applications', value: 'One per child' },
    { label: 'Application scope', value: 'Unit' },
    { label: 'Close option to change application fr o m', value: '' },
    { label: 'Reopen possibility to change application fr o m', value: '' },
    { label: 'Warn when changing application from', value: '' },
    { label: 'Warn when changing application until', value: '' },
    { label: 'Mandatory number of choices', value: '1' },
    { label: 'Number of possible choices', value: '3' },
    { label: 'Reduce number of choices for children with admission', value: '0' },
    { label: 'Show native language', value: 'Yes' },
    { label: 'Native language is mandatory', value: 'No' },
    { label: 'Show Reasontype', value: 'Yes' },
    { label: 'Reason type is mandatory?', value: 'No' },
    { label: 'Show rate category', value: 'No' },
    { label: 'Rate category is mandatory', value: 'No' },
    { label: 'Show priority category', value: 'No' },
    { label: 'Priority category is mandatory', value: 'No' },
    { label: 'Show field for note', value: 'No' },
    { label: 'Home phone number is mandatory', value: 'No' },
    { label: 'Work phone is mandatory', value: 'No' },
    { label: 'Mobile phonenumber is mandatory', value: 'No' },
    { label: 'Email is mandatory', value: 'Yes' },
    { label: 'Minimum placement age in months', value: '12' },
    { label: 'Maximum placement age in months', value: '' },
    { label: 'Dont publish offer created from', value: '' },
    { label: 'Dont publish offer created until', value: '' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">Application forms</DialogTitle>
              <DialogDescription>
                Form for {form.municipality.toLowerCase()} application
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="application-form" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="application-form">Application form</TabsTrigger>
            <TabsTrigger value="show-application-form">Show application form</TabsTrigger>
          </TabsList>

          <TabsContent value="application-form" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {configurationFields.map((field, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 py-2 border-b border-slate-100 last:border-b-0">
                      <div className="text-sm font-medium text-slate-700">
                        {field.label}
                      </div>
                      <div className="text-sm text-slate-900">
                        {field.value || '-'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="show-application-form" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Form Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-8 bg-slate-50 rounded-lg">
                    <p className="text-slate-600">Application form preview will be displayed here</p>
                    <p className="text-sm text-slate-500 mt-2">
                      This shows how the form appears to applicants
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationSummaryModal;
