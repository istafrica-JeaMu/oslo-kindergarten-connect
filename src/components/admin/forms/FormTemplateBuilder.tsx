import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  Trash2,
  Edit,
  GripVertical,
  Type,
  CheckSquare,
  Circle,
  Calendar,
  Upload,
  Hash,
  Mail,
  Phone,
  MapPin,
  X,
  ArrowRight,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Eye
} from 'lucide-react';
import TemplatePreview from './TemplatePreview';

interface QuestionInput {
  id: string;
  question: string;
  titleInList: string;
  type: 'open' | 'single' | 'multiple' | 'date' | 'file' | 'number' | 'email' | 'phone' | 'address';
  mandatory: boolean;
  active: boolean;
  order: number;
  options?: string[];
}

interface FormTemplate {
  id: string;
  title: string;
  description?: string;
  inputs: QuestionInput[];
  order: number;
}

interface FormTemplateBuilderProps {
  form?: any;
  onClose?: () => void;
  onDisplayTemplate?: () => void;
}

const FormTemplateBuilder: React.FC<FormTemplateBuilderProps> = ({ 
  form, 
  onClose 
}) => {
  const [availableTemplates, setAvailableTemplates] = useState<FormTemplate[]>([
    {
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
    }
  ]);

  const [selectedTemplates, setSelectedTemplates] = useState<FormTemplate[]>([]);
  const [isNewTemplateOpen, setIsNewTemplateOpen] = useState(false);
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false);
  const [isNewQuestionOpen, setIsNewQuestionOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<FormTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState({ title: '', description: '' });
  const [newQuestion, setNewQuestion] = useState<Partial<QuestionInput>>({
    type: 'open',
    mandatory: false,
    active: true
  });
  const [isTemplatePreviewOpen, setIsTemplatePreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<FormTemplate | null>(null);

  const questionTypeIcons = {
    open: Type,
    single: Circle,
    multiple: CheckSquare,
    date: Calendar,
    file: Upload,
    number: Hash,
    email: Mail,
    phone: Phone,
    address: MapPin
  };

  const moveToSelected = (template: FormTemplate) => {
    setSelectedTemplates([...selectedTemplates, { ...template, order: selectedTemplates.length + 1 }]);
    setAvailableTemplates(availableTemplates.filter(t => t.id !== template.id));
  };

  const moveToAvailable = (template: FormTemplate) => {
    setAvailableTemplates([...availableTemplates, { ...template, order: availableTemplates.length + 1 }]);
    setSelectedTemplates(selectedTemplates.filter(t => t.id !== template.id));
  };

  const moveTemplateUp = (templateId: string, isSelected: boolean) => {
    const templates = isSelected ? selectedTemplates : availableTemplates;
    const setTemplates = isSelected ? setSelectedTemplates : setAvailableTemplates;
    
    const index = templates.findIndex(t => t.id === templateId);
    if (index > 0) {
      const newTemplates = [...templates];
      [newTemplates[index - 1], newTemplates[index]] = [newTemplates[index], newTemplates[index - 1]];
      setTemplates(newTemplates);
    }
  };

  const moveTemplateDown = (templateId: string, isSelected: boolean) => {
    const templates = isSelected ? selectedTemplates : availableTemplates;
    const setTemplates = isSelected ? setSelectedTemplates : setAvailableTemplates;
    
    const index = templates.findIndex(t => t.id === templateId);
    if (index < templates.length - 1) {
      const newTemplates = [...templates];
      [newTemplates[index], newTemplates[index + 1]] = [newTemplates[index + 1], newTemplates[index]];
      setTemplates(newTemplates);
    }
  };

  const handleCreateTemplate = () => {
    if (newTemplate.title) {
      const template: FormTemplate = {
        id: Date.now().toString(),
        title: newTemplate.title,
        description: newTemplate.description,
        inputs: [],
        order: availableTemplates.length + 1
      };
      
      setAvailableTemplates([...availableTemplates, template]);
      setNewTemplate({ title: '', description: '' });
      setIsNewTemplateOpen(false);
    }
  };

  const handleEditTemplate = (template: FormTemplate) => {
    setEditingTemplate(template);
    setIsEditTemplateOpen(true);
  };

  const handleAddQuestionToTemplate = () => {
    if (newQuestion.question && newQuestion.titleInList && editingTemplate) {
      const question: QuestionInput = {
        ...newQuestion,
        id: Date.now().toString(),
        order: editingTemplate.inputs.length + 1
      } as QuestionInput;
      
      const updatedTemplate = {
        ...editingTemplate,
        inputs: [...editingTemplate.inputs, question]
      };
      
      setEditingTemplate(updatedTemplate);
      
      // Update in the appropriate list
      const isInSelected = selectedTemplates.find(t => t.id === editingTemplate.id);
      if (isInSelected) {
        setSelectedTemplates(selectedTemplates.map(t => 
          t.id === editingTemplate.id ? updatedTemplate : t
        ));
      } else {
        setAvailableTemplates(availableTemplates.map(t => 
          t.id === editingTemplate.id ? updatedTemplate : t
        ));
      }
      
      setNewQuestion({ type: 'open', mandatory: false, active: true });
      setIsNewQuestionOpen(false);
    }
  };

  const removeQuestionFromTemplate = (questionId: string) => {
    if (editingTemplate) {
      const updatedTemplate = {
        ...editingTemplate,
        inputs: editingTemplate.inputs.filter(input => input.id !== questionId)
      };
      
      setEditingTemplate(updatedTemplate);
      
      // Update in the appropriate list
      const isInSelected = selectedTemplates.find(t => t.id === editingTemplate.id);
      if (isInSelected) {
        setSelectedTemplates(selectedTemplates.map(t => 
          t.id === editingTemplate.id ? updatedTemplate : t
        ));
      } else {
        setAvailableTemplates(availableTemplates.map(t => 
          t.id === editingTemplate.id ? updatedTemplate : t
        ));
      }
    }
  };

  const handleDisplayTemplate = (template: FormTemplate) => {
    setPreviewTemplate(template);
    setIsTemplatePreviewOpen(true);
  };

  const TemplateCard = ({ template, isSelected }: { template: FormTemplate; isSelected: boolean }) => (
    <div className="border rounded-lg p-3 bg-white hover:bg-slate-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-slate-400 cursor-move" />
          <span className="font-medium text-sm">{template.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => moveTemplateUp(template.id, isSelected)}
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => moveTemplateDown(template.id, isSelected)}
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEditTemplate(template)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          {isSelected ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => moveToAvailable(template)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => moveToSelected(template)}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      {template.description && (
        <p className="text-xs text-slate-500 mb-2">{template.description}</p>
      )}
      <div className="text-xs text-slate-600">
        {template.inputs.length} input{template.inputs.length !== 1 ? 's' : ''}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Manage Templates</h3>
          <p className="text-sm text-slate-600">Build and customize your application form templates</p>
        </div>
        {onClose && (
          <Button onClick={onClose} variant="outline" size="sm">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Available Templates */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Not selected templates</CardTitle>
              <Dialog open={isNewTemplateOpen} onOpenChange={setIsNewTemplateOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add new template
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New Template</DialogTitle>
                    <DialogDescription>
                      Create a new form template
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="templateTitle">Template Title</Label>
                      <Input
                        id="templateTitle"
                        placeholder="Enter template title..."
                        value={newTemplate.title}
                        onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="templateDescription">Description (Optional)</Label>
                      <Textarea
                        id="templateDescription"
                        placeholder="Brief description of this template..."
                        value={newTemplate.description}
                        onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => setIsNewTemplateOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateTemplate}>
                      Create Template
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {availableTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} isSelected={false} />
            ))}
          </CardContent>
        </Card>

        {/* Selected Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Selected templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} isSelected={true} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Template Editor Dialog */}
      <Dialog open={isEditTemplateOpen} onOpenChange={setIsEditTemplateOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit Template: {editingTemplate?.title}
            </DialogTitle>
            <DialogDescription>
              Manage inputs for this template
            </DialogDescription>
          </DialogHeader>

          {editingTemplate && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Template Inputs</h4>
                <Dialog open={isNewQuestionOpen} onOpenChange={setIsNewQuestionOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Input
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>New Input</DialogTitle>
                      <DialogDescription>
                        Add a new input to this template
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="question">Question</Label>
                        <Textarea
                          id="question"
                          placeholder="Enter your question here..."
                          value={newQuestion.question || ''}
                          onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="titleInList">Title in lists</Label>
                        <Input
                          id="titleInList"
                          placeholder="Short title for lists"
                          value={newQuestion.titleInList || ''}
                          onChange={(e) => setNewQuestion({...newQuestion, titleInList: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label>Settings</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mandatory"
                              checked={newQuestion.mandatory}
                              onCheckedChange={(checked) => setNewQuestion({...newQuestion, mandatory: !!checked})}
                            />
                            <Label htmlFor="mandatory">Mandatory</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="active"
                              checked={newQuestion.active}
                              onCheckedChange={(checked) => setNewQuestion({...newQuestion, active: !!checked})}
                            />
                            <Label htmlFor="active">Active</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Type of question</Label>
                        <RadioGroup
                          value={newQuestion.type}
                          onValueChange={(value) => setNewQuestion({...newQuestion, type: value as any})}
                          className="flex flex-wrap gap-4 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="open" id="open" />
                            <Label htmlFor="open">Open</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="single" id="single" />
                            <Label htmlFor="single">Single</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="multiple" id="multiple" />
                            <Label htmlFor="multiple">Multiple</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="date" id="date" />
                            <Label htmlFor="date">Date</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    
                    <DialogFooter className="gap-2">
                      <Button variant="outline" onClick={() => setIsNewQuestionOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddQuestionToTemplate}>
                        Add Input
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-2">
                {editingTemplate.inputs.map((input) => {
                  const IconComponent = questionTypeIcons[input.type];
                  return (
                    <div
                      key={input.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-blue-50 border-blue-200"
                    >
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-slate-400 cursor-move" />
                        <IconComponent className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-medium text-sm">{input.titleInList}</div>
                          <div className="flex items-center gap-2">
                            <Badge variant={input.mandatory ? "default" : "secondary"} className="text-xs">
                              {input.mandatory ? "Mandatory" : "Optional"}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {input.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeQuestionFromTemplate(input.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Template Preview Dialog */}
      <TemplatePreview 
        isOpen={isTemplatePreviewOpen}
        onClose={() => setIsTemplatePreviewOpen(false)}
        template={previewTemplate}
      />

      <div className="flex items-center justify-between pt-4 border-t">
        <Button 
          variant="outline" 
          onClick={() => {
            if (selectedTemplates.length > 0) {
              handleDisplayTemplate(selectedTemplates[0]);
            }
          }}
          className="flex items-center gap-2"
          disabled={selectedTemplates.length === 0}
        >
          <Eye className="w-4 h-4" />
          Preview Selected Templates
        </Button>
        <div className="flex gap-2">
          {onClose && <Button variant="outline" onClick={onClose}>Cancel</Button>}
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default FormTemplateBuilder;
