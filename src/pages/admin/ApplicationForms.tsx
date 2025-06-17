
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { FileText, Search, Plus, Edit, Settings, List } from 'lucide-react';
import FormTemplateBuilder from '@/components/admin/forms/FormTemplateBuilder';
import FormConfiguration from '@/components/admin/forms/FormConfiguration';

interface ApplicationForm {
  id: string;
  name: string;
  municipality: string;
  status: 'Active' | 'Draft' | 'Archived';
  lastModified: string;
  submissionCount: number;
}

const ApplicationForms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedForm, setSelectedForm] = useState<ApplicationForm | null>(null);
  const [isTemplateBuilderOpen, setIsTemplateBuilderOpen] = useState(false);
  const [isConfigurationOpen, setIsConfigurationOpen] = useState(false);

  // Mock data - in real implementation this would come from API
  const applicationForms: ApplicationForm[] = [
    {
      id: '1',
      name: 'Childcare application',
      municipality: 'Förskola',
      status: 'Active',
      lastModified: '2024-01-15',
      submissionCount: 245
    },
    {
      id: '2',
      name: 'Day care application',
      municipality: 'Fritidshem',
      status: 'Active',
      lastModified: '2024-01-12',
      submissionCount: 189
    },
    {
      id: '3',
      name: 'Special needs application',
      municipality: 'Förskola',
      status: 'Draft',
      lastModified: '2024-01-10',
      submissionCount: 0
    }
  ];

  const filteredForms = applicationForms.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.municipality.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleEditForm = (form: ApplicationForm) => {
    setSelectedForm(form);
    setIsConfigurationOpen(true);
  };

  const handleManageTemplate = (form: ApplicationForm) => {
    setSelectedForm(form);
    setIsTemplateBuilderOpen(true);
  };

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
                <CardTitle>Application Forms (Ansökningsformulär)</CardTitle>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Form
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search forms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="text-sm text-slate-600">
                  Sort Order: Name (Internal)
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-teal-600 hover:bg-teal-600">
                    <TableHead className="text-white font-medium">Namn (internt)</TableHead>
                    <TableHead className="text-white font-medium">Verksamhetstyp</TableHead>
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
          <FormTemplateBuilder />
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
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationForms;
