
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FileText, Plus, Edit, Settings, List, MapPin } from 'lucide-react';
import FormTemplateBuilder from '@/components/admin/forms/FormTemplateBuilder';
import FormConfiguration from '@/components/admin/forms/FormConfiguration';
import TemplatePreview from '@/components/admin/forms/TemplatePreview';

interface District {
  id: string;
  name: string;
  municipality: string;
  formCount: number;
}

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

interface FormTemplate {
  id: string;
  title: string;
  description?: string;
  inputs: any[];
  order: number;
}

const ApplicationForms = () => {
  const [selectedForm, setSelectedForm] = useState<ApplicationForm | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [isTemplateBuilderOpen, setIsTemplateBuilderOpen] = useState(false);
  const [isConfigurationOpen, setIsConfigurationOpen] = useState(false);
  const [isTemplatePreviewOpen, setIsTemplatePreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<FormTemplate | null>(null);

  const districts: District[] = [
    {
      id: '1',
      name: 'Central District',
      municipality: 'Oslo Municipality',
      formCount: 2
    },
    {
      id: '2',
      name: 'Eastern District',
      municipality: 'Oslo Municipality',
      formCount: 2
    },
    {
      id: '3',
      name: 'Western District',
      municipality: 'Bergen Municipality',
      formCount: 2
    }
  ];

  // Mock data - Only Childcare and Preschool forms
  const applicationForms: ApplicationForm[] = [
    {
      id: '1',
      name: 'Childcare Application',
      municipality: 'Förskola',
      status: 'Active',
      lastModified: '2024-01-15',
      submissionCount: 245,
      districtId: '1',
      assignedTemplates: 3,
      totalTemplatesNeeded: 5
    },
    {
      id: '2',
      name: 'Preschool Application', 
      municipality: 'Fritidshem',
      status: 'Active',
      lastModified: '2024-01-12',
      submissionCount: 189,
      districtId: '1',
      assignedTemplates: 2,
      totalTemplatesNeeded: 4
    },
    {
      id: '3',
      name: 'Childcare Application',
      municipality: 'Förskola',
      status: 'Draft',
      lastModified: '2024-01-10',
      submissionCount: 0,
      districtId: '2',
      assignedTemplates: 1,
      totalTemplatesNeeded: 5
    },
    {
      id: '4',
      name: 'Preschool Application',
      municipality: 'Fritidshem',
      status: 'Active',
      lastModified: '2024-01-08',
      submissionCount: 156,
      districtId: '2',
      assignedTemplates: 4,
      totalTemplatesNeeded: 4
    }
  ];

  // Filter forms by selected district
  const filteredForms = applicationForms.filter(form => {
    return !selectedDistrict || form.districtId === selectedDistrict;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Draft':
        return 'secondary';
      case 'Archived':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getTemplateCompletionBadge = (assigned: number, total: number) => {
    const isComplete = assigned >= total;
    return (
      <Badge variant={isComplete ? "default" : "secondary"} className="text-xs">
        {assigned}/{total} Templates
      </Badge>
    );
  };

  const handleEditForm = (form: ApplicationForm) => {
    setSelectedForm(form);
    setIsConfigurationOpen(true);
  };

  const handleManageTemplate = (form: ApplicationForm) => {
    setSelectedForm(form);
    setIsTemplateBuilderOpen(true);
  };

  const handleDisplayTemplate = () => {
    // Mock template data for preview
    const mockTemplate: FormTemplate = {
      id: 'template-1',
      title: 'Basic Child Information',
      description: 'Essential information about the child',
      inputs: [
        {
          id: '1',
          question: 'Child\'s full name',
          titleInList: 'Full Name',
          type: 'open',
          mandatory: true,
          active: true,
          order: 1
        },
        {
          id: '2',
          question: 'Date of birth',
          titleInList: 'Birth Date',
          type: 'date',
          mandatory: true,
          active: true,
          order: 2
        }
      ],
      order: 1
    };
    
    setPreviewTemplate(mockTemplate);
    setIsTemplatePreviewOpen(true);
  };

  const selectedDistrictInfo = districts.find(d => d.id === selectedDistrict);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Application Forms</h1>
          <p className="text-slate-600">Manage kindergarten application forms and templates</p>
        </div>
      </div>

      <Tabs defaultValue="forms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="forms" className="flex items-center gap-2">
            <List className="w-4 h-4" />
            Application Forms
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Manage Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forms">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Application Forms (Ansökningsformulär)
                  {selectedDistrictInfo && (
                    <span className="text-base font-normal text-slate-600 ml-2">
                      - {selectedDistrictInfo.name}
                    </span>
                  )}
                </CardTitle>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Form
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Select District / Municipality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Districts</SelectItem>
                      {districts.map((district) => (
                        <SelectItem key={district.id} value={district.id}>
                          {district.name} - {district.municipality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-teal-600 hover:bg-teal-600">
                    <TableHead className="text-white font-medium">Namn (internt)</TableHead>
                    <TableHead className="text-white font-medium">Verksamhetstyp</TableHead>
                    <TableHead className="text-white font-medium">Templates</TableHead>
                    <TableHead className="text-white font-medium">Ändra</TableHead>
                    <TableHead className="text-white font-medium">Frågaformulär</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredForms.map((form) => (
                    <TableRow key={form.id} className="hover:bg-slate-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-blue-600">{form.name}</span>
                          <Badge variant={getStatusBadgeVariant(form.status)}>
                            {form.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-500">
                          Last modified: {form.lastModified} | {form.submissionCount} submissions
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-slate-700">{form.municipality}</span>
                      </TableCell>
                      <TableCell>
                        {getTemplateCompletionBadge(form.assignedTemplates, form.totalTemplatesNeeded)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditForm(form)}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleManageTemplate(form)}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <List className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <FormTemplateBuilder onDisplayTemplate={handleDisplayTemplate} />
        </TabsContent>
      </Tabs>

      {/* Form Configuration Dialog */}
      <Dialog open={isConfigurationOpen} onOpenChange={setIsConfigurationOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedForm ? `Configure: ${selectedForm.name}` : 'Form Configuration'}
            </DialogTitle>
            <DialogDescription>
              Manage form settings, business rules, and application parameters
            </DialogDescription>
          </DialogHeader>
          {selectedForm && (
            <FormConfiguration 
              form={selectedForm} 
              onClose={() => setIsConfigurationOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Template Builder Dialog */}
      <Dialog open={isTemplateBuilderOpen} onOpenChange={setIsTemplateBuilderOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedForm ? `Manage Template: ${selectedForm.name}` : 'Template Builder'}
            </DialogTitle>
            <DialogDescription>
              Build and customize form templates with drag-and-drop functionality
            </DialogDescription>
          </DialogHeader>
          {selectedForm && (
            <FormTemplateBuilder 
              form={selectedForm}
              onClose={() => setIsTemplateBuilderOpen(false)}
              onDisplayTemplate={handleDisplayTemplate}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Template Preview Dialog */}
      <TemplatePreview 
        isOpen={isTemplatePreviewOpen}
        onClose={() => setIsTemplatePreviewOpen(false)}
        template={previewTemplate}
      />
    </div>
  );
};

export default ApplicationForms;
