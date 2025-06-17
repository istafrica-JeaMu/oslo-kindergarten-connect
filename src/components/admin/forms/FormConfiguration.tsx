
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FormTemplateBuilder from './FormTemplateBuilder';
import { Settings, FileText, Users, Calendar } from 'lucide-react';

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

interface FormConfigurationProps {
  form: ApplicationForm;
  onClose: () => void;
}

const FormConfiguration: React.FC<FormConfigurationProps> = ({ form, onClose }) => {
  const [activeTab, setActiveTab] = useState('templates');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{form.name}</h2>
          <p className="text-slate-600">Configure form settings and templates</p>
        </div>
        <Badge variant={form.status === 'Active' ? 'default' : 'secondary'}>
          {form.status}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Access
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-6">
          <FormTemplateBuilder 
            form={form} 
            onClose={onClose}
          />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Basic Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Form Name:</span>
                      <div className="font-medium">{form.name}</div>
                    </div>
                    <div>
                      <span className="text-slate-600">Type:</span>
                      <div className="font-medium">{form.municipality}</div>
                    </div>
                    <div>
                      <span className="text-slate-600">Status:</span>
                      <div className="font-medium">{form.status}</div>
                    </div>
                    <div>
                      <span className="text-slate-600">Submissions:</span>
                      <div className="font-medium">{form.submissionCount}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Configure who can access and submit this form.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Set application periods and deadlines.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormConfiguration;
